import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import axios from 'axios';

const FeedbackView = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedbackList();
  }, []);

  const fetchFeedbackList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/saveFeedback');
      setFeedbackList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h4">Feedback List</Typography>
          {feedbackList.length > 0 ? (
            <List>
              {feedbackList.map((feedback) => (
                <ListItem key={feedback.id}>
                  <ListItemText primary={feedback.Feedback_msg} secondary={`Submitted by: ${feedback.Father_Email}`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No feedback available.</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FeedbackView;
