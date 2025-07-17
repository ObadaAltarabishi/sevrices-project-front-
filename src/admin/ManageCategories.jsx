import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FaTags, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Design' },
    { id: 2, name: 'Development' },
    { id: 3, name: 'Marketing' },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  // إضافة فئة جديدة
  const handleAdd = () => {
    if (!newCategory.trim()) return toast.warning('Please enter a category name');
    const newId = categories.length + 1;
    setCategories([...categories, { id: newId, name: newCategory }]);
    toast.success(`Category "${newCategory}" added!`);
    setNewCategory('');
  };

  // حذف فئة
  const handleDelete = (id) => {
    const updated = categories.filter(cat => cat.id !== id);
    setCategories(updated);
    toast.error('Category deleted!');
  };

  // بدء التعديل
  const startEdit = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  // حفظ التعديل
  const saveEdit = (id) => {
    const updated = categories.map(cat =>
      cat.id === id ? { ...cat, name: editCategoryName } : cat
    );
    setCategories(updated);
    toast.info('Category updated!');
    setEditCategoryId(null);
    setEditCategoryName('');
  };

  return (
    <AdminLayout>
      <div className="bg-[#FEF8E7] p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FaTags className="text-[#FD7924] text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-[#262626]">Manage Categories</h2>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            className="p-2 rounded border border-[#F7E9CC] w-64"
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 bg-[#FD7924] hover:bg-[#e5661b] text-white px-3 py-2 rounded"
          >
            <FaPlus /> Add
          </button>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-[#FBF6E3] border border-[#F7E9CC] p-4 rounded-md shadow flex justify-between items-center"
            >
              {editCategoryId === category.id ? (
                <input
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  onBlur={() => saveEdit(category.id)}
                  className="p-2 border border-gray-300 rounded w-full max-w-xs"
                  autoFocus
                />
              ) : (
                <h3 className="text-lg font-semibold text-[#262626]">{category.name}</h3>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    editCategoryId === category.id
                      ? saveEdit(category.id)
                      : startEdit(category)
                  }
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  <FaEdit /> {editCategoryId === category.id ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      </AdminLayout>
  );
};

export default ManageCategories;