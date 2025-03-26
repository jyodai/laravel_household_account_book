import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CategoryList({ categories }) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setForm({ ...cat });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    router.put(`/categories/${editingId}`, form);
  };

  const handleDelete = (id) => {
    if (confirm('本当に削除しますか？')) {
      router.delete(`/categories/${id}`);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-lg font-bold mb-4">カテゴリ一覧</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>名前</th>
            <th>タイプ</th>
            <th>色</th>
            <th>並び順</th>
            <th>メモ</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>
                {editingId === cat.id ? (
                  <input name="name" value={form.name} onChange={handleChange} />
                ) : cat.name}
              </td>
              <td>
                {editingId === cat.id ? (
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value={0}>支出</option>
                    <option value={1}>収入</option>
                  </select>
                ) : (cat.type === 0 ? '支出' : '収入')}
              </td>
              <td>
                {editingId === cat.id ? (
                  <input name="color" type="color" value={form.color} onChange={handleChange} />
                ) : (
                  <span style={{ backgroundColor: cat.color }} className="inline-block w-5 h-5 rounded" />
                )}
              </td>
              <td>
                {editingId === cat.id ? (
                  <input name="sort" type="number" value={form.sort} onChange={handleChange} />
                ) : cat.sort}
              </td>
              <td>
                {editingId === cat.id ? (
                  <input name="memo" value={form.memo} onChange={handleChange} />
                ) : cat.memo}
              </td>
              <td>
                {editingId === cat.id ? (
                  <>
                    <button onClick={handleUpdate} className="text-blue-600 mr-2">保存</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500">キャンセル</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(cat)} className="text-blue-600 mr-2">編集</button>
                    <button onClick={() => handleDelete(cat.id)} className="text-red-600">削除</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

