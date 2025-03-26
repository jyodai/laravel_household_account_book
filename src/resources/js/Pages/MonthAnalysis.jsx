import React from 'react';

export default function MonthAnalysis({ startDate, endDate, summary, entries }) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">月次分析</h2>
      <p className="mb-4 text-sm">対象期間: {startDate} 〜 {endDate}</p>

      <h3 className="text-lg font-semibold mt-6 mb-2">カテゴリ別集計</h3>
      <ul className="mb-6">
        {summary.map((item, index) => (
          <li key={index} className="flex justify-between border-b py-1">
            <span>{item.category_name}</span>
            <span>{item.total.toLocaleString()} 円</span>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">詳細一覧</h3>
      <table className="w-full border table-auto text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">日付</th>
            <th className="border p-2">カテゴリ</th>
            <th className="border p-2">金額</th>
            <th className="border p-2">店舗</th>
            <th className="border p-2">メモ</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td className="border p-2">{entry.date}</td>
              <td className="border p-2">{entry.category?.name ?? '不明'}</td>
              <td className="border p-2">{entry.amount.toLocaleString()}</td>
              <td className="border p-2">{entry.store}</td>
              <td className="border p-2">{entry.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

