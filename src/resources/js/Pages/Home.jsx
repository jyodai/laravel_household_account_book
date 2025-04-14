import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Link, router } from '@inertiajs/react';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home({ categories, entries }) {
  const handleDelete = (id) => {
    if (confirm('このエントリを削除しますか？')) {
      router.delete(`/entries/${id}`);
    }
  };

  const handleCardClick = (id) => {
    router.get(`/entries/${id}/edit`);
  };

  // 日付ごとにグループ化
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = entry.date.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {});

  return (
    <Box maxWidth="md">
      {Object.entries(groupedEntries).map(([date, entriesForDate]) => (
        <Box key={date} mb={5}>
          <Typography variant="h6" gutterBottom>{date}</Typography>

          <Stack spacing={2}>
            {entriesForDate.map((entry) => {
              const isIncome = entry.category?.type === 1;
              return (
                <Card
                  key={entry.id}
                  variant="outlined"
                  sx={{
                    width: '100%',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                  onClick={() => handleCardClick(entry.id)}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
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

                      <Tooltip title="削除">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation(); // カードクリックをキャンセル
                            handleDelete(entry.id);
                          }}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{ color: isIncome ? 'success.main' : 'error.main' }}
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
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}

Home.layout = (page) => <DashboardLayout children={page} />;

