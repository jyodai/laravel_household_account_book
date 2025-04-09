import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { router } from '@inertiajs/react';

export default function AddCategory() {
  const [form, setForm] = useState({
    name: '',
    type: 0,
    color: '#FFFFFF',
    memo: '',
    sort: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/categories', form);
  };

  return (
    <Box maxWidth="sm" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          カテゴリ追加
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="カテゴリ名"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            select
            label="タイプ"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={0}>支出</MenuItem>
            <MenuItem value={1}>収入</MenuItem>
          </TextField>

          <TextField
            type="color"
            label="カラー"
            name="color"
            value={form.color}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="メモ"
            name="memo"
            value={form.memo}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="表示順"
            name="sort"
            type="number"
            value={form.sort}
            onChange={handleChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            登録する
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

AddCategory.layout = (page) => <DashboardLayout children={page} />;
