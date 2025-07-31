import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { FaClipboardList, FaCheck, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ManageOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'Alice', service: 'Logo Design', price: 50, status: 'Pending' },
    { id: 2, user: 'Bob', service: 'Web Development', price: 200, status: 'Pending' },
    { id: 3, user: 'Charlie', service: 'SEO Optimization', price: 120, status: 'Pending' },
  ]);
  const [services, setServices] = useState([]);

  async function fetchData() {
    const userData = localStorage.getItem('user');

    axios.get('http://127.0.0.1:8000/api/admin/orders/rejected', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      console.log(res.data.data)
      setServices(res.data.data)

    }).catch((err) => {
      console.log(err)
    })

  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleStatusChange = (id) => {
    const userData = localStorage.getItem('user');

    axios.get('http://127.0.0.1:8000/api/admin/orders/' + id + '/canReject', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      fetchData()
    }).catch((err) => {
      console.log(err)
    })
  };
  const handleCancelChange = (id) => {
    const userData = localStorage.getItem('user');

    axios.get('http://127.0.0.1:8000/api/admin/orders/' + id + '/approveCancel', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      fetchData()
    }).catch((err) => {
      console.log(err)
    })
  };


  return (
    <AdminLayout>
      <div className="bg-[#FEF8E7] p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FaClipboardList className="text-[#FD7924] text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-[#262626]">Manage Orders</h2>
        </div>

        <div className="space-y-3">
          {services.map((order) => (
            <div
              key={order.id}
              className="bg-[#FBF6E3] border border-[#F7E9CC] p-4 rounded-md shadow flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#262626]">
                  {order.service.name} - <span className="font-normal">by {order.user.name}</span>
                </h3>
                <p className="text-sm text-[#555]">
                  Price: ${order.service.price} |Buyer Email: {order.user.email}
                </p>
              </div>

              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => handleStatusChange(order.id)}
                  disabled={order.status !== 'canceled'}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-white ${order.status === 'canceled' ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  <FaCheck /> Complete
                </button>
                <button
                  onClick={() => handleCancelChange(order.id)}
                  disabled={order.status !== 'canceled'}
                  className={`flex items-center gap-1 px-3 py-1 rounded text-white ${order.status === 'canceled' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'
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