import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Music Feedback Collaborator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Streamline your music collaboration process with structured feedback and version tracking.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/" color="inherit">
                Home
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/projects" color="inherit">
                Projects
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/about" color="inherit">
                About
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/contact" color="inherit">
                Contact
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/terms" color="inherit">
                Terms of Service
              </Link>
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              <Link href="/privacy" color="inherit">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' Music Feedback Collaborator. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;