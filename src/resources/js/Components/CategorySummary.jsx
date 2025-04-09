import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

export default function CategorySummary({ title, entries }) {
  const grouped = entries.reduce((acc, entry) => {
    const catName = entry.category?.name || '不明';
    acc[catName] = (acc[catName] || 0) + entry.amount;
    return acc;
  }, {});

  const summary = Object.entries(grouped).map(([name, total]) => ({
    name,
    total,
  }));

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <List>
        {summary.map((item, i) => (
          <React.Fragment key={i}>
            <ListItem disablePadding>
              <ListItemText
                primary={item.name}
                secondary={`${item.total.toLocaleString()} 円`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

