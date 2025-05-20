// src/data/mockData.js
export const users = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    karma: 1250,
    followers: 124,
    following: 56,
  },
  {
    id: 2,
    name: "Sam Wilson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    karma: 870,
    followers: 89,
    following: 32,
  },
  {
    id: 3,
    name: "Jamie Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    karma: 2340,
    followers: 213,
    following: 67,
  },
  {
    id: 4,
    name: "Taylor Chen",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    karma: 560,
    followers: 45,
    following: 23,
  },
];

export const strategies = [
  {
    id: 1,
    title: "Mean Reversion with Bollinger Bands",
    description: "This strategy uses Bollinger Bands to identify potential reversal points in price action. When price touches the lower band, it signals a potential buy opportunity, while touching the upper band signals a potential sell opportunity. I've optimized this for 15-minute charts on major forex pairs with success rates approaching 68% when combined with RSI confirmation.",
    authorId: 1,
    visibility: "public",
    createdAt: "2025-05-01T14:32:00Z",
    likes: 42,
    comments: [
      {
        id: 101,
        authorId: 2,
        content: "I've been using a similar approach but with different parameters. What width do you use for your bands?",
        createdAt: "2025-05-02T09:12:00Z",
        replies: [
          {
            id: 1011,
            authorId: 1,
            content: "I use 2 standard deviations, but I'm experimenting with 2.5 for more volatile markets.",
            createdAt: "2025-05-02T10:45:00Z",
          }
        ]
      },
      {
        id: 102,
        authorId: 3,
        content: "Have you backtested this across different market conditions? I'm curious about the performance during high volatility periods.",
        createdAt: "2025-05-03T11:23:00Z",
        replies: []
      }
    ]
  },
  {
    id: 2,
    title: "Momentum Trading with MACD Crossover",
    description: "This strategy capitalizes on strong market trends using the MACD indicator. Entry signals are generated when the MACD line crosses above the signal line, indicating bullish momentum. Exit signals occur when the MACD line crosses below the signal line. I've found particular success applying this to daily charts of tech stocks, with position sizing based on ATR.",
    authorId: 3,
    visibility: "public",
    createdAt: "2025-05-05T08:47:00Z",
    likes: 29,
    comments: [
      {
        id: 201,
        authorId: 4,
        content: "What parameters do you use for your MACD? The standard 12, 26, 9?",
        createdAt: "2025-05-05T10:30:00Z",
        replies: [
          {
            id: 2011,
            authorId: 3,
            content: "Yes, I stick with the standard parameters but I've found adding a volume filter improves performance significantly.",
            createdAt: "2025-05-05T11:15:00Z",
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Breakout Trading with Fibonacci Retracement",
    description: "This strategy identifies potential breakout points using key Fibonacci retracement levels. I look for consolidation patterns and then place entry orders above resistance or below support. The magic happens when price retraces to a Fibonacci level (particularly 0.618 or 0.786) before continuing the trend - these make excellent entry points with tight stop losses.",
    authorId: 2,
    visibility: "public",
    createdAt: "2025-05-10T16:23:00Z",
    likes: 36,
    comments: [
      {
        id: 301,
        authorId: 1,
        content: "Fibonacci has always been hit or miss for me. How do you determine your swing high/low points?",
        createdAt: "2025-05-11T09:17:00Z",
        replies: []
      }
    ]
  },
  {
    id: 4,
    title: "Adaptive RSI Divergence Strategy",
    description: "This strategy uses RSI divergence with an adaptive period based on market volatility. When price makes a new high but RSI fails to make a new high (bearish divergence), it signals a potential reversal. The same applies for bullish divergence. The key innovation is adjusting the RSI period dynamically - lower periods in low volatility and higher periods in high volatility.",
    authorId: 4,
    visibility: "public",
    createdAt: "2025-05-15T11:08:00Z",
    likes: 18,
    comments: []
  },
];

// Helper function to find user by ID
export const findUserById = (id) => {
  return users.find(user => user.id === id);
};

// Helper function to find strategy by ID
export const findStrategyById = (id) => {
  return strategies.find(strategy => strategy.id === id);
};
