import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import CategorySummary from '@/Components/CategorySummary';
import PeriodNavigator from '@/Components/PeriodNavigator';

export default function MonthAnalysis({ startDate, endDate, expenseEntries, incomeEntries }) {
  const totalExpense = expenseEntries.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = incomeEntries.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <Box maxWidth="lg" mx="auto" p={3}>
      <Typography variant="h5" gutterBottom>月次分析</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        対象期間：{startDate} ～ {endDate}
      </Typography>

      <PeriodNavigator mode="month" startDate={startDate} routeName="analysis.month" />

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>合計</Typography>
        <Typography>支出合計: {totalExpense.toLocaleString()} 円</Typography>
        <Typography>収入合計: {totalIncome.toLocaleString()} 円</Typography>
        <Typography sx={{ fontWeight: 'bold', color: balance >= 0 ? 'success.main' : 'error.main' }}>
          収支: {balance.toLocaleString()} 円
        </Typography>
      </Paper>

      <CategorySummary title="支出" entries={expenseEntries} />
      <CategorySummary title="収入" entries={incomeEntries} />

      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>詳細一覧</Typography>
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
            {expenseEntries.concat(incomeEntries).map((entry) => (
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

MonthAnalysis.layout = (page) => <DashboardLayout children={page} />;
