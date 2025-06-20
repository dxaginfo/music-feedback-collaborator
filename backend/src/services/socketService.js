/**
 * Socket.io service for real-time communication
 */
module.exports = (io) => {
  // Map to keep track of connected users
  const connectedUsers = new Map();

  // Socket.io connection handler
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // User authentication
    socket.on('authenticate', (userId) => {
      console.log(`User ${userId} authenticated`);
      connectedUsers.set(userId, socket.id);

      // Join user-specific room
      socket.join(`user:${userId}`);
    });

    // Join project room
    socket.on('joinProject', (projectId) => {
      console.log(`Socket ${socket.id} joined project room ${projectId}`);
      socket.join(`project:${projectId}`);
    });

    // Join song room
    socket.on('joinSong', (songId) => {
      console.log(`Socket ${socket.id} joined song room ${songId}`);
      socket.join(`song:${songId}`);
    });

    // Join version room
    socket.on('joinVersion', (versionId) => {
      console.log(`Socket ${socket.id} joined version room ${versionId}`);
      socket.join(`version:${versionId}`);
    });

    // Handle comments
    socket.on('commentAdded', (data) => {
      console.log('New comment added:', data.commentId);
      socket.to(`version:${data.versionId}`).emit('newComment', data);
    });

    // Handle replies
    socket.on('replyAdded', (data) => {
      console.log('New reply added:', data.replyId);
      socket.to(`version:${data.versionId}`).emit('newReply', data);
    });

    // Handle new version uploads
    socket.on('versionAdded', (data) => {
      console.log('New version added:', data.versionId);
      socket.to(`song:${data.songId}`).emit('newVersion', data);
    });

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      
      // Remove user from connectedUsers map
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          break;
        }
      }
    });
  });

  // Helper functions for other parts of the application to use
  return {
    // Notify a specific user
    notifyUser: (userId, event, data) => {
      if (connectedUsers.has(userId)) {
        io.to(`user:${userId}`).emit(event, data);
      }
    },
    
    // Notify all users in a project
    notifyProject: (projectId, event, data) => {
      io.to(`project:${projectId}`).emit(event, data);
    },
    
    // Notify all users viewing a song
    notifySong: (songId, event, data) => {
      io.to(`song:${songId}`).emit(event, data);
    },
    
    // Notify all users viewing a version
    notifyVersion: (versionId, event, data) => {
      io.to(`version:${versionId}`).emit(event, data);
    }
  };
};