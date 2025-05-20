// src/components/CommentSection.js
import React, { useState } from 'react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';

const CommentForm = ({ onSubmit, placeholder = "Add a comment..." }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder={placeholder}
        rows="3"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const CommentReply = ({ reply, author }) => {
  const formattedDate = format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a');

  return (
    <div className="pl-6 mt-2 border-l-2 border-gray-200">
      <div className="flex items-center mb-1">
        <span className="font-medium text-primary-700 hover:text-primary-500 cursor-pointer">
          {author?.name}
        </span>
        <span className="text-xs text-gray-500 ml-2">• {formattedDate}</span>
      </div>
      <p className="text-gray-700">{reply.content}</p>
    </div>
  );
};

const Comment = ({ comment, strategyId, users }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { addReply } = useApp();
  const author = users.find(user => user.id === comment.authorId);
  const formattedDate = format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a');

  const handleReply = (content) => {
    addReply(strategyId, comment.id, content);
    setShowReplyForm(false);
  };

  return (
    <div className="mb-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <span 
          className="font-medium text-primary-700 hover:text-primary-500 cursor-pointer"
        >
          {author?.name}
        </span>
        <span className="text-xs text-gray-500 ml-2">• {formattedDate}</span>
      </div>
      <p className="text-gray-700 mb-2">{comment.content}</p>
      
      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="text-sm text-primary-600 hover:text-primary-800"
      >
        {showReplyForm ? 'Cancel' : 'Reply'}
      </button>
      
      {showReplyForm && (
        <div className="mt-2">
          <CommentForm onSubmit={handleReply} placeholder="Write a reply..." />
        </div>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map(reply => (
            <CommentReply 
              key={reply.id} 
              reply={reply} 
              author={users.find(user => user.id === reply.authorId)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ strategyId, comments }) => {
  const { addComment, users } = useApp();
  
  const handleAddComment = (content) => {
    addComment(strategyId, content);
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <CommentForm onSubmit={handleAddComment} />
      
      {comments && comments.length > 0 ? (
        <div>
          {comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              strategyId={strategyId} 
              users={users} 
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentSection;
export { CommentForm };
