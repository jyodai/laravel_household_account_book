import React from 'react';
import { Link } from '@inertiajs/react';

export default function Home({ categories, entries }) {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">家計簿一覧</h1>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">日付</th>
            <th className="border p-2">カテゴリ</th>
            <th className="border p-2">金額</th>
            <th className="border p-2">店舗</th>
            <th className="border p-2">メモ</th>
            <th className="border p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td className="border p-2">{entry.date}</td>
              <td className="border p-2">{entry.category?.name ?? '不明'}</td>
              <td className="border p-2">{entry.amount.toLocaleString()} 円</td>
              <td className="border p-2">{entry.store}</td>
              <td className="border p-2">{entry.memo}</td>
              <td className="border p-2 text-center">
                <Link
                  href={`/entries/${entry.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  編集
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

