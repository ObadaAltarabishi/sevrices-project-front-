import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FaClipboardList, FaCheck, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'Alice', service: 'Logo Design', price: 50, status: 'Pending' },
    { id: 2, user: 'Bob', service: 'Web Development', price: 200, status: 'Pending' },
    { id: 3, user: 'Charlie', service: 'SEO Optimization', price: 120, status: 'Pending' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    if (newStatus === 'Completed') {
      toast.success('Order marked as completed!');
    } else if (newStatus === 'Canceled') {
      toast.error('Order has been canceled.');
    }
  };

  return (
    <AdminLayout>
      <div className="bg-[#FEF8E7] p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FaClipboardList className="text-[#FD7924] text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-[#262626]">Manage Orders</h2>
        </div>

        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#FBF6E3] border border-[#F7E9CC] p-4 rounded-md shadow flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#262626]">
                  {order.service} - <span className="font-normal">by {order.user}</span>
                </h3>
                <p className="text-sm text-[#555]">
                  Price: ${order.price} | Status: <span className="font-semibold">{order.status}</span>
                </p>
              </div>

              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => handleStatusChange(order.id, 'Completed')}
                  disabled={order.status !== 'Pending'}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                    order.status === 'Pending' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaCheck /> Complete
                </button>
                <button
                  onClick={() => handleStatusChange(order.id, 'Canceled')}
                  disabled={order.status !== 'Pending'}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                    order.status === 'Pending' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <FaTimes /> Cancel
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

export default ManageOrders;