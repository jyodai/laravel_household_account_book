import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AddCategory() {
  const [form, setForm] = useState({
    name: '',
    type: 0,
    color: '#FFFFFF',
    memo: '',
    sort: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === 'number' ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post('/categories', form);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">カテゴリ追加</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="カテゴリ名" className="w-full border px-2 py-1" />

        <select name="type" value={form.type} onChange={handleChange} className="w-full border px-2 py-1">
          <option value={0}>支出</option>
          <option value={1}>収入</option>
        </select>

        <input type="color" name="color" value={form.color} onChange={handleChange} className="w-full" />

        <input type="text" name="memo" value={form.memo} onChange={handleChange} placeholder="メモ" className="w-full border px-2 py-1" />

        <input type="number" name="sort" value={form.sort} onChange={handleChange} placeholder="表示順" className="w-full border px-2 py-1" />

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">登録</button>
      </form>
    </div>
  );
}

