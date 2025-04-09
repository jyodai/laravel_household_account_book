import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from '@mui/material';

export default function Calculator({ open, onClose, onCalculate, initialValue = '' }) {
  const [input, setInput] = useState('');

  // 🚀 初期値を受け取ったら、ダイアログが開いたときにセットする！
  useEffect(() => {
    if (open) {
      setInput(initialValue.toString());
    }
  }, [open, initialValue]);

  const handleInput = (value) => () => {
    setInput((prev) => prev + value);
  };

  const deleteLastChar = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      const result = eval(input);
      if (result !== undefined) {
        onCalculate(Math.floor(result)); // 金額なので整数
      }
      setInput('');
      onClose();
    } catch (error) {
      alert('無効な式です');
      setInput('');
    }
  };

  const buttonRows = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['00', '0', '.', '+'],
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>金額入力</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            value={input}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        {/* 最上段：Cと←ボタン */}
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Button variant="outlined" color="error" fullWidth sx={{ py: 2 }} onClick={() => setInput('')}>
              C
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" color="warning" fullWidth sx={{ py: 2 }} onClick={deleteLastChar}>
              ←
            </Button>
          </Grid>
        </Grid>

        {/* 数字・演算子ボタン */}
        {buttonRows.map((row, idx) => (
          <Grid container spacing={1} key={idx} sx={{ mb: 1 }}>
            {row.map((char) => (
              <Grid item xs={3} key={char}>
                <Button variant="contained" fullWidth sx={{ py: 2 }} onClick={handleInput(char)}>
                  {char}
                </Button>
              </Grid>
            ))}
          </Grid>
        ))}

        {/* =ボタン */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ fontSize: '1.5rem', py: 2 }}
              onClick={calculateResult}
            >
              ＝
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

