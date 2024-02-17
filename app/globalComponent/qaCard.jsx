import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const QACard = ({ question, answer }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Question
        </Typography>
        <Typography variant="h5" component="h2">
          {question}
        </Typography>
        <Divider sx={{ marginY: 1.5 }} />
        <Typography color="textSecondary">
          Answer
        </Typography>
        <Typography variant="body2" component="p">
          {answer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QACard;
