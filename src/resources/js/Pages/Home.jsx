import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { Link, router } from '@inertiajs/react';

export default function Home({ categories, entries }) {
  const handleDelete = (id) => {
    if (confirm('このエントリを削除しますか？')) {
      router.delete(`/entries/${id}`);
    }
  };

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>家計簿一覧</Typography>

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
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={entry.category?.name ?? '不明'}
                        size="small"
                        sx={{
                          backgroundColor: entry.category?.color ?? '#888',
                          color: '#fff',
                        }}
                      />
                      {entry.claim_flag && (
                        <Chip
                          label="精算"
                          size="small"
                          color="warning"
                        />
                      )}
                    </Stack>
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

                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      component={Link}
                      href={`/entries/${entry.id}/edit`}
                      size="small"
                      variant="outlined"
                      fullWidth
                    >
                      編集
                    </Button>
                    <Button
                      onClick={() => handleDelete(entry.id)}
                      size="small"
                      variant="outlined"
                      color="error"
                      fullWidth
                    >
                      削除
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

Home.layout = (page) => <DashboardLayout children={page} />;
