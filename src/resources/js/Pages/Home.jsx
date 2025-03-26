import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
} from '@mui/material';
import { Link } from '@inertiajs/react';

export default function Home({ categories, entries }) {
  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>
        家計簿一覧
      </Typography>

      <Grid container spacing={2}>
        {entries.map((entry) => {
          const isIncome = entry.category?.type === 1;
          return (
            <Grid item xs={12} sm={6} md={4} key={entry.id}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle2" color="text.secondary">
                      {entry.date}
                    </Typography>
                    <Chip
                      label={entry.category?.name ?? '不明'}
                      size="small"
                      sx={{
                        backgroundColor: entry.category?.color ?? '#888',
                        color: '#fff',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{ color: isIncome ? 'success.main' : 'error.main', mt: 1 }}
                  >
                    {entry.amount.toLocaleString()} 円
                  </Typography>

                  {entry.store && (
                    <Typography variant="body2" color="text.secondary">
                      店舗: {entry.store}
                    </Typography>
                  )}

                  {entry.memo && (
                    <Typography variant="body2" color="text.secondary">
                      メモ: {entry.memo}
                    </Typography>
                  )}

                  <Box mt={2}>
                    <Button
                      component={Link}
                      href={`/entries/${entry.id}/edit`}
                      size="small"
                      variant="outlined"
                    >
                      編集
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

