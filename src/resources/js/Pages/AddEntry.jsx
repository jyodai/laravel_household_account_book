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
import DashboardLayout from '@/Layouts/DashboardLayout';
import Calculator from '@/Components/Calculator'; // 電卓追加

export default function AddEntry({ entry = null, categories }) {
  const isEdit = !!entry;

  const [form, setForm] = useState({
    date: entry ? entry.date.slice(0, 16) : new Date().toISOString().slice(0, 16),
    type: entry?.category?.type ?? 0,
    category_id: entry?.category_id || '',
    amount: entry?.amount || '',
    store: entry?.store || '',
    memo: entry?.memo || '',
    claim_flag: entry?.claim_flag || false,
    claim_amount: entry?.claim_amount || '',
  });

  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [targetField, setTargetField] = useState('amount'); // どのフィールドを操作するか

  const filteredCategories = categories.filter(cat => cat.type === form.type);

  const openCalculatorFor = (field) => {
    setTargetField(field);
    setCalculatorOpen(true);
  };

  const handleCalculatorSubmit = (value) => {
    setForm({
      ...form,
      [targetField]: value.toString(),
    });
    setCalculatorOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setForm({
      ...form,
      [name]: inputType === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...form,
      amount: parseInt(form.amount || 0, 10),
      claim_amount: form.claim_amount ? parseInt(form.claim_amount, 10) : null,
    };
    if (isEdit) {
      router.put(`/entries/${entry.id}`, submitData);
    } else {
      router.post('/entries', submitData);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* タイプ選択 */}
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

          {/* 日付 */}
          <TextField
            type="datetime-local"
            label="日付"
            name="date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* カテゴリ */}
          <TextField
            select
            label="カテゴリ"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            fullWidth
          >
            {filteredCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          {/* 金額（電卓で入力） */}
          <TextField
            label="金額"
            name="amount"
            value={form.amount}
            onClick={() => openCalculatorFor('amount')}
            fullWidth
            InputProps={{ readOnly: true }}
          />

          {/* 店舗名 */}
          <TextField
            label="店舗名"
            name="store"
            value={form.store}
            onChange={handleChange}
            fullWidth
          />

          {/* メモ */}
          <TextField
            label="メモ"
            name="memo"
            value={form.memo}
            onChange={handleChange}
            fullWidth
          />

          {/* 精算あり */}
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

          {/* 精算金額（電卓で入力） */}
          {form.claim_flag && (
            <TextField
              label="精算金額"
              name="claim_amount"
              value={form.claim_amount}
              onClick={() => openCalculatorFor('claim_amount')}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          )}

          <Button type="submit" variant="contained" color="primary">
            {isEdit ? '更新する' : '登録する'}
          </Button>
        </Box>
      </Paper>

      {/* 電卓モーダル */}
      <Calculator
        open={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onCalculate={handleCalculatorSubmit}
        initialValue={form[targetField]}
      />
    </Box>
  );
}

AddEntry.layout = (page) => <DashboardLayout children={page} />;

