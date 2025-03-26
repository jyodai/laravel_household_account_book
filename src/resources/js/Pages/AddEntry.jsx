import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function AddEntry({ entry = null, categories }) {
  const [form, setForm] = useState({
    date: entry ? entry.date.slice(0, 16) : new Date().toISOString().slice(0, 16),
    category_id: entry?.category_id || categories[0]?.id || '',
    amount: entry?.amount || '',
    store: entry?.store || '',
    memo: entry?.memo || '',
    claim_flag: entry?.claim_flag || false,
    claim_amount: entry?.claim_amount || '',
  });

  const isEdit = !!entry;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      router.put(`/entries/${entry.id}`, form);
    } else {
      router.post('/entries', form);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">{isEdit ? 'エントリ編集' : 'エントリ追加'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="datetime-local" name="date" value={form.date} onChange={handleChange} className="w-full border px-2 py-1" />

        <select name="category_id" value={form.category_id} onChange={handleChange} className="w-full border px-2 py-1">
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="金額" className="w-full border px-2 py-1" />

        <input type="text" name="store" value={form.store} onChange={handleChange} placeholder="店舗名" className="w-full border px-2 py-1" />

        <input type="text" name="memo" value={form.memo} onChange={handleChange} placeholder="メモ" className="w-full border px-2 py-1" />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="claim_flag" checked={form.claim_flag} onChange={handleChange} />
          <span>精算あり</span>
        </label>

        {form.claim_flag && (
          <input type="number" name="claim_amount" value={form.claim_amount} onChange={handleChange} placeholder="精算金額" className="w-full border px-2 py-1" />
        )}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? '更新' : '登録'}
        </button>
      </form>
    </div>
  );
}

