import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

export default function MonthAnalysis({ startDate, endDate, summary, entries }) {
  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>
        月次分析
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        対象期間：{startDate} ～ {endDate}
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          カテゴリ別集計
        </Typography>
        <List>
          {summary.map((item, i) => (
            <React.Fragment key={i}>
              <ListItem disablePadding>
                <ListItemText
                  primary={item.category_name}
                  secondary={`${item.total.toLocaleString()} 円`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          詳細一覧
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell>カテゴリ</TableCell>
              <TableCell align="right">金額</TableCell>
              <TableCell>店舗</TableCell>
              <TableCell>メモ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.category?.name ?? '不明'}</TableCell>
                <TableCell align="right">{entry.amount.toLocaleString()} 円</TableCell>
                <TableCell>{entry.store}</TableCell>
                <TableCell>{entry.memo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

