import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Badge } from '@mui/material';
import { Reply, CheckCircleOutline } from '@mui/icons-material';

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  timestamp: number;
  content: string;
  createdAt: string;
  resolved: boolean;
  replies?: Reply[];
}

interface Reply {
  id: string;
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  content: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
  onCommentClick: (commentId: string, timestamp: number) => void;
  onReplyClick: (commentId: string) => void;
  onResolveClick: (commentId: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onCommentClick,
  onReplyClick,
  onResolveClick,
}) => {
  const formatTime = (timestamp: number) => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (comments.length === 0) {
    return (
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No comments yet. Be the first to add a comment!
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
      {comments.map((comment) => (
        <Paper key={comment.id} elevation={1} sx={{ mb: 2, p: 2 }}>
          <ListItem
            alignItems="flex-start"
            button
            onClick={() => onCommentClick(comment.id, comment.timestamp)}
            sx={{ px: 0, pt: 0 }}
          >
            <ListItemAvatar>
              <Avatar src={comment.author.profilePicture} alt={comment.author.name}>
                {comment.author.name.charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" component="span">
                    {comment.author.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Badge color="secondary" variant="dot" invisible={comment.resolved}>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(comment.timestamp)}
                      </Typography>
                    </Badge>
                    <IconButton
                      size="small"
                      color={comment.resolved ? 'success' : 'default'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onResolveClick(comment.id);
                      }}
                    >
                      <CheckCircleOutline fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              }
              secondary={
                <>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {formatDate(comment.createdAt)}
                  </Typography>
                </>
              }
            />
          </ListItem>

          {comment.replies && comment.replies.length > 0 && (
            <List sx={{ pl: 4 }}>
              {comment.replies.map((reply) => (
                <ListItem key={reply.id} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={reply.author.profilePicture}
                      alt={reply.author.name}
                      sx={{ width: 32, height: 32 }}
                    >
                      {reply.author.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" component="span">
                        {reply.author.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          {reply.content}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {formatDate(reply.createdAt)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onReplyClick(comment.id);
              }}
            >
              <Reply fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                Reply
              </Typography>
            </IconButton>
          </Box>
        </Paper>
      ))}
    </List>
  );
};

export default CommentList;