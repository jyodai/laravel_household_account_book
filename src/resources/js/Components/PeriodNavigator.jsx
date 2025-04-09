import React from 'react';
import { Box, Button } from '@mui/material';
import { router } from '@inertiajs/react';

export default function PeriodNavigator({ mode, startDate, routeName }) {
  const movePeriod = (diff) => {
    const baseDate = new Date(startDate);

    let newDate;
    if (mode === 'month') {
      // 月単位で移動
      newDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + diff, 1);
    } else {
      // 週単位で移動
      newDate = new Date(baseDate);
      newDate.setDate(baseDate.getDate() + (7 * diff));
    }

    const formatted = newDate.toISOString().slice(0, 10);
    router.get(routeName, { startDate: formatted });
  };

  const moveToday = () => {
    router.get(routeName);
  };

  return (
    <Box display="flex" justifyContent="center" gap={2} mb={3}>
      <Button variant="outlined" onClick={() => movePeriod(-1)}>
        {mode === 'month' ? '前月' : '前週'}
      </Button>
      <Button variant="outlined" onClick={moveToday}>
        {mode === 'month' ? '今月' : '今週'}
      </Button>
      <Button variant="outlined" onClick={() => movePeriod(1)}>
        {mode === 'month' ? '次月' : '次週'}
      </Button>
    </Box>
  );
}

