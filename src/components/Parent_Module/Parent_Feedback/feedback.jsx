import React, { useState } from 'react';
import { TextField, Button, Modal, Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Parent_Sidebar from '../Parent_Sidebar/Sidebar';
import Topbar from '../../../scenes/global/Topbar';

const FeedbackForm = (props) => {
  const [feedback, setFeedback] = useState('');
  const [isSidebar, setIsSidebar] = useState(true);
  const Father_Email = props.Email;
console.log(props)
  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const history = useNavigate();

  const saveData = async (event) => {
    event.preventDefault();
    let respons;
    let formField = new FormData();
    formField.append('Feedback_msg', feedback);
    formField.append('Father_Email', Father_Email);
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/saveFeedback',
      data: formField,
    })
      .then((response) => {
        respons = response.status;
        console.log(respons);
      })
      .catch((error) => {
        console.error(error);
      });

    if (respons === 200) {
        history("/Parent_Dashboard", { replace: true });
    }
  };

  return (
    <>
    <div className="app">
    <Parent_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Feedback Form
          </Typography>
          <form onSubmit={saveData}>
            <TextField
              label="Feedback"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={handleInputChange}
              style={{ marginBottom: '1rem' }}required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
    </main>
    </div>
    </>
  );
};

export default FeedbackForm;
