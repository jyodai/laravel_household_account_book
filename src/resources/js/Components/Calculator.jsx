import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';

export default function Calculator({ open, onClose, onCalculate, initialValue = '' }) {
  const [input, setInput] = useState('');
  const textFieldRef = useRef(null);

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
      textFieldRef.current?.blur(); // フォーカスを明示的に外す
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
            inputRef={textFieldRef}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>

        {/* 最上段：Cと←ボタン */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{ py: 2, fontSize: '1.2rem' }}
              onClick={() => setInput('')}
            >
              C
            </Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              sx={{ py: 2, fontSize: '1.2rem' }}
              onClick={deleteLastChar}
            >
              ←
            </Button>
          </Box>
        </Box>

        {/* 数字・演算子ボタン */}
        {buttonRows.map((row, idx) => (
          <Box key={idx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            {row.map((char) => (
              <Box key={char} sx={{ flex: 1 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ py: 2 }}
                  onClick={handleInput(char)}
                >
                  {char}
                </Button>
              </Box>
            ))}
          </Box>
        ))}

        {/* =ボタン */}
        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontSize: '1.5rem', py: 2 }}
            onClick={calculateResult}
          >
            ＝
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

