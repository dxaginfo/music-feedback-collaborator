import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material';
import { MusicNote, AccessTime, Comment, Notifications } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  // Mock data - in a real application, this would come from your Redux store or API calls
  const recentProjects = [
    { id: '1', name: 'Summer Album', songsCount: 5, lastUpdated: '2 hours ago' },
    { id: '2', name: 'Acoustic EP', songsCount: 3, lastUpdated: '1 day ago' },
    { id: '3', name: 'Demo Tracks', songsCount: 2, lastUpdated: '3 days ago' },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'comment',
      user: 'Sarah Johnson',
      content: 'Added a comment on "Bass Line Mix"',
      time: '30 minutes ago',
      projectId: '1',
      songId: '101',
    },
    {
      id: '2',
      type: 'version',
      user: 'Mike Williams',
      content: 'Uploaded a new version of "Vocal Take 3"',
      time: '2 hours ago',
      projectId: '1',
      songId: '102',
    },
    {
      id: '3',
      type: 'project',
      user: 'You',
      content: 'Created project "Demo Tracks"',
      time: '3 days ago',
      projectId: '3',
    },
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      projectName: 'Summer Album',
      task: 'Final Mix Approval',
      date: '2025-06-25',
      daysLeft: 5,
      projectId: '1',
    },
    {
      id: '2',
      projectName: 'Acoustic EP',
      task: 'Mastering',
      date: '2025-07-05',
      daysLeft: 15,
      projectId: '2',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MusicNote color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Active Projects</Typography>
                </Box>
                <Typography variant="h3" align="center">
                  3
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={RouterLink}
                  to="/projects"
                  size="small"
                  color="primary"
                  sx={{ ml: 'auto' }}
                >
                  View All
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Comment color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Recent Comments</Typography>
                </Box>
                <Typography variant="h3" align="center">
                  12
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" sx={{ ml: 'auto' }}>
                  View All
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTime color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Upcoming Deadlines</Typography>
                </Box>
                <Typography variant="h3" align="center">
                  2
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" sx={{ ml: 'auto' }}>
                  View All
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Recent Projects */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Recent Projects
              </Typography>
              <List>
                {recentProjects.map((project, index) => (
                  <React.Fragment key={project.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      button
                      component={RouterLink}
                      to={`/projects/${project.id}`}
                      sx={{ py: 1.5 }}
                    >
                      <ListItemText
                        primary={project.name}
                        secondary={`${project.songsCount} songs · Last updated ${project.lastUpdated}`}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <Button
                component={RouterLink}
                to="/projects"
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
              >
                See All Projects
              </Button>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      button
                      component={RouterLink}
                      to={
                        activity.songId
                          ? `/projects/${activity.projectId}/songs/${activity.songId}`
                          : `/projects/${activity.projectId}`
                      }
                      sx={{ py: 1.5 }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1">{activity.content}</Typography>
                            <Chip
                              size="small"
                              label={activity.type}
                              color={
                                activity.type === 'comment'
                                  ? 'primary'
                                  : activity.type === 'version'
                                  ? 'secondary'
                                  : 'default'
                              }
                              sx={{ height: 20 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="body2">{activity.user}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
                component={RouterLink}
                to="/activity"
              >
                View All Activity
              </Button>
            </Paper>
          </Grid>

          {/* Upcoming Deadlines */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Deadlines
              </Typography>
              <List>
                {upcomingDeadlines.map((deadline, index) => {
                  const progress = Math.min(100, Math.max(0, (deadline.daysLeft / 30) * 100));
                  return (
                    <React.Fragment key={deadline.id}>
                      {index > 0 && <Divider />}
                      <ListItem sx={{ py: 1.5 }}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body1">
                                {deadline.task} - {deadline.projectName}
                              </Typography>
                              <Typography variant="body2" color={deadline.daysLeft < 7 ? 'error' : 'text.secondary'}>
                                {deadline.daysLeft} days left
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={100 - progress}
                                color={deadline.daysLeft < 7 ? 'error' : 'primary'}
                              />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                                <Typography variant="caption">
                                  Due: {new Date(deadline.date).toLocaleDateString()}
                                </Typography>
                                <Button
                                  component={RouterLink}
                                  to={`/projects/${deadline.projectId}`}
                                  size="small"
                                >
                                  View Project
                                </Button>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    </React.Fragment>
                  );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;