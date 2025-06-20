# Music Feedback Collaborator

A web application for structured music feedback with commenting and version tracking features. This platform streamlines collaboration between musicians, producers, and other stakeholders in the music creation process.

## 🎵 Features

### Audio Waveform Visualization and Playback
- Upload audio files and see visual waveform representation
- Play, pause, and seek through audio using the waveform
- Real-time playback position tracking

### Timestamped Comments
- Add comments at specific points in the audio
- View all comments with their timestamps
- Jump to comment positions in the audio

### Version Control
- Upload multiple versions of a song
- Compare different versions side by side
- Track changes between versions
- Organize versions chronologically

### User Management
- Create an account and manage profile
- Invite collaborators to projects
- Set different permission levels for collaborators

### Project Organization
- Create and manage multiple projects
- Organize songs within projects
- Set deadlines and track progress

### Notification System
- Receive notifications for new comments
- Receive notifications for new versions
- Manage notification preferences

### Export and Sharing
- Export feedback as documents or spreadsheets
- Share viewable links with non-registered users
- Control what shared users can see or edit

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Redux with Redux Toolkit
- Material-UI
- Web Audio API, Wavesurfer.js
- Socket.io client

### Backend
- Node.js with Express
- JWT authentication with OAuth 2.0
- MongoDB for data storage
- AWS S3 for file storage
- Socket.io for real-time communication

### DevOps & Deployment
- Docker
- GitHub Actions (CI/CD)
- AWS (EC2, ELB, S3)
- New Relic or Datadog for monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB
- AWS account (for S3)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/music-feedback-collaborator.git
cd music-feedback-collaborator
```

2. Install dependencies for the frontend
```bash
cd frontend
npm install
```

3. Install dependencies for the backend
```bash
cd ../backend
npm install
```

4. Set up environment variables
```bash
# Create .env files in both frontend and backend directories
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Update the .env files with your configuration
```

5. Start the development servers
```bash
# In the backend directory
npm run dev

# In the frontend directory (in a separate terminal)
npm start
```

6. Open your browser and visit `http://localhost:3000`

## 🏗️ Project Structure

```
music-feedback-collaborator/
├── frontend/                # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux state management
│   │   ├── services/        # API services
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx          # Main App component
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Node.js backend application
│   ├── src/                 # Source code
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── app.js           # Express app setup
│   └── package.json         # Backend dependencies
│
├── .github/                 # GitHub configuration
│   └── workflows/           # CI/CD workflows
│
├── docker/                  # Docker configuration
│   ├── frontend/            # Frontend Dockerfile
│   └── backend/             # Backend Dockerfile
│
├── docker-compose.yml       # Docker Compose configuration
└── README.md                # Project documentation
```

## 📝 API Documentation

The API documentation is available at `/api/docs` when running the server locally.

## 🔄 Database Schema

The application uses MongoDB with the following collections:

- Users
- Projects
- Songs
- Versions
- Comments
- Notifications

See the project documentation for detailed schema information.

## 🔐 Security Considerations

- HTTPS for all communications
- JWT authentication with refresh tokens
- Encrypted data at rest and in transit
- Regular security audits and dependency updates
- Rate limiting and protection against common attacks

## 📱 Mobile Responsiveness

- Responsive design using CSS Grid and Flexbox
- Touch-optimized controls for mobile devices
- Progressive Web App (PWA) capabilities
- Adaptive audio quality based on device capabilities

## 🔌 Integration Capabilities

- Music streaming platforms (Spotify, SoundCloud)
- DAW plugin support for direct export/import
- Social media sharing
- Calendar integration for deadline management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Project Link: [https://github.com/dxaginfo/music-feedback-collaborator](https://github.com/dxaginfo/music-feedback-collaborator)