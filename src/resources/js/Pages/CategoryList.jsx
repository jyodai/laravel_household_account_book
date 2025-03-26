import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { router } from '@inertiajs/react';

export default function CategoryList({ categories }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setForm({ ...cat });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'number' ? Number(value) : value });
  };

  const handleSave = () => {
    router.put(`/categories/${editingId}`, form);
  };

  const handleDelete = (id) => {
    if (confirm('このカテゴリを削除しますか？')) {
      router.delete(`/categories/${id}`);
    }
  };

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>カテゴリ一覧</Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>タイプ</TableCell>
            <TableCell>色</TableCell>
            <TableCell>並び順</TableCell>
            <TableCell>メモ</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map(cat => (
            <TableRow key={cat.id}>
              <TableCell>
                {editingId === cat.id
                  ? <TextField name="name" value={form.name} onChange={handleChange} size="small" />
                  : cat.name}
              </TableCell>
              <TableCell>
                {editingId === cat.id ? (
                  <TextField
                    select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value={0}>支出</MenuItem>
                    <MenuItem value={1}>収入</MenuItem>
                  </TextField>
                ) : (
                  <Chip
                    label={cat.type === 1 ? '収入' : '支出'}
                    color={cat.type === 1 ? 'success' : 'error'}
                    size="small"
                  />
                )}
              </TableCell>
              <TableCell>
                {editingId === cat.id
                  ? <TextField type="color" name="color" value={form.color} onChange={handleChange} size="small" />
                  : <Box sx={{ width: 24, height: 24, backgroundColor: cat.color, borderRadius: '4px' }} />}
              </TableCell>
              <TableCell>
                {editingId === cat.id
                  ? <TextField type="number" name="sort" value={form.sort} onChange={handleChange} size="small" />
                  : cat.sort}
              </TableCell>
              <TableCell>
                {editingId === cat.id
                  ? <TextField name="memo" value={form.memo} onChange={handleChange} size="small" />
                  : cat.memo}
              </TableCell>
              <TableCell align="center">
                {editingId === cat.id ? (
                  <>
                    <Tooltip title="保存"><IconButton onClick={handleSave}><SaveIcon /></IconButton></Tooltip>
                    <Tooltip title="キャンセル"><IconButton onClick={cancelEdit}><CancelIcon /></IconButton></Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="編集"><IconButton onClick={() => startEdit(cat)}><EditIcon /></IconButton></Tooltip>
                    <Tooltip title="削除"><IconButton onClick={() => handleDelete(cat.id)}><DeleteIcon color="error" /></IconButton></Tooltip>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

