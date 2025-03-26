import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { router } from '@inertiajs/react';

export default function AddEntry({ entry = null, categories }) {
  const isEdit = !!entry;

  const [form, setForm] = useState({
    date: entry ? entry.date.slice(0, 16) : new Date().toISOString().slice(0, 16),
    category_id: entry?.category_id || categories[0]?.id || '',
    amount: entry?.amount || '',
    store: entry?.store || '',
    memo: entry?.memo || '',
    claim_flag: entry?.claim_flag || false,
    claim_amount: entry?.claim_amount || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      router.put(`/entries/${entry.id}`, form);
    } else {
      router.post('/entries', form);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {isEdit ? 'エントリ編集' : 'エントリ追加'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="datetime-local"
            label="日付"
            name="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            select
            label="カテゴリ"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="number"
            label="金額"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="店舗名"
            name="store"
            value={form.store}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="メモ"
            name="memo"
            value={form.memo}
            onChange={handleChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                name="claim_flag"
                checked={form.claim_flag}
                onChange={handleChange}
              />
            }
            label="精算あり"
          />

          {form.claim_flag && (
            <TextField
              type="number"
              label="精算金額"
              name="claim_amount"
              value={form.claim_amount}
              onChange={handleChange}
              fullWidth
            />
          )}

          <Button type="submit" variant="contained" color="primary">
            {isEdit ? '更新する' : '登録する'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
