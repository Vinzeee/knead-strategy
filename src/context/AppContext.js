// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { strategies as initialStrategies, users as initialUsers } from '../data/mockData';

// Initial state
const initialState = {
  strategies: [],
  users: [],
  currentUser: { id: 1, name: "Alex Johnson" }, // Mock logged-in user
  followingMap: {},
  likedStrategies: {},
};

// Action types
const ActionTypes = {
  INIT_DATA: 'INIT_DATA',
  ADD_STRATEGY: 'ADD_STRATEGY',
  TOGGLE_LIKE_STRATEGY: 'TOGGLE_LIKE_STRATEGY',
  ADD_COMMENT: 'ADD_COMMENT',
  ADD_REPLY: 'ADD_REPLY',
  TOGGLE_FOLLOW: 'TOGGLE_FOLLOW',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.INIT_DATA:
      return {
        ...state,
        strategies: action.payload.strategies,
        users: action.payload.users,
      };
    
    case ActionTypes.ADD_STRATEGY:
      return {
        ...state,
        strategies: [action.payload, ...state.strategies],
      };
    
    case ActionTypes.TOGGLE_LIKE_STRATEGY:
      return {
        ...state,
        likedStrategies: {
          ...state.likedStrategies,
          [action.payload]: !state.likedStrategies[action.payload]
        },
        strategies: state.strategies.map(strategy => 
          strategy.id === action.payload 
            ? { 
                ...strategy, 
                likes: state.likedStrategies[action.payload] 
                  ? strategy.likes - 1 
                  : strategy.likes + 1 
              }
            : strategy
        ),
      };
    
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        strategies: state.strategies.map(strategy => 
          strategy.id === action.payload.strategyId 
            ? {
                ...strategy,
                comments: [...strategy.comments, action.payload.comment]
              }
            : strategy
        ),
      };
    
    case ActionTypes.ADD_REPLY:
      return {
        ...state,
        strategies: state.strategies.map(strategy => 
          strategy.id === action.payload.strategyId 
            ? {
                ...strategy,
                comments: strategy.comments.map(comment =>
                  comment.id === action.payload.commentId
                    ? {
                        ...comment,
                        replies: [...comment.replies, action.payload.reply]
                      }
                    : comment
                )
              }
            : strategy
        ),
      };
    
    case ActionTypes.TOGGLE_FOLLOW:
      return {
        ...state,
        followingMap: {
          ...state.followingMap,
          [action.payload]: !state.followingMap[action.payload]
        },
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize data when component mounts
  useEffect(() => {
    dispatch({
      type: ActionTypes.INIT_DATA,
      payload: {
        strategies: initialStrategies,
        users: initialUsers,
      },
    });
  }, []);

  // Action creators
  const addStrategy = (strategy) => {
    dispatch({
      type: ActionTypes.ADD_STRATEGY,
      payload: {
        ...strategy,
        id: state.strategies.length > 0 ? Math.max(...state.strategies.map(s => s.id)) + 1 : 1,
        authorId: state.currentUser.id,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      },
    });
  };

  const toggleLikeStrategy = (strategyId) => {
    dispatch({
      type: ActionTypes.TOGGLE_LIKE_STRATEGY,
      payload: strategyId,
    });
  };

  const addComment = (strategyId, content) => {
    const comment = {
      id: Math.floor(Math.random() * 10000),
      authorId: state.currentUser.id,
      content,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    dispatch({
      type: ActionTypes.ADD_COMMENT,
      payload: { strategyId, comment },
    });
  };

  const addReply = (strategyId, commentId, content) => {
    const reply = {
      id: Math.floor(Math.random() * 10000),
      authorId: state.currentUser.id,
      content,
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: ActionTypes.ADD_REPLY,
      payload: { strategyId, commentId, reply },
    });
  };

  const toggleFollow = (userId) => {
    dispatch({
      type: ActionTypes.TOGGLE_FOLLOW,
      payload: userId,
    });
  };

  const isFollowing = (userId) => {
    return !!state.followingMap[userId];
  };

  const isLiked = (strategyId) => {
    return !!state.likedStrategies[strategyId];
  };

  // Value to be provided
  const value = {
    strategies: state.strategies,
    users: state.users,
    currentUser: state.currentUser,
    addStrategy,
    toggleLikeStrategy,
    addComment,
    addReply,
    toggleFollow,
    isFollowing,
    isLiked,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
