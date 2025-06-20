import React, { useState } from 'react';
import {
  FaClipboardList,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from 'react-icons/fa';

const dummyOrders = [
  {
    id: 1,
    serviceName: 'Logo Design',
    date: '2025-06-01',
    status: 'In Progress',
    price: '$50',
    seller: 'John Doe',
    description: 'Professional logo design with 3 revisions.',
  },
  {
    id: 2,
    serviceName: 'Social Media Management',
    date: '2025-05-28',
    status: 'Completed',
    price: '$120',
    seller: 'Sarah Smith',
    description: '30-day social media strategy and content creation.',
  },
  {
    id: 3,
    serviceName: 'Website Audit',
    date: '2025-05-25',
    status: 'Cancelled',
    price: '$80',
    seller: 'Ali Hassan',
    description: 'Comprehensive website audit report with recommendations.',
  },
];

export default function MyOrders() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders =
    filterStatus === 'All'
      ? dummyOrders
      : dummyOrders.filter((order) => order.status === filterStatus);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <FaCheckCircle className="inline text-green-600 mr-1" />;
      case 'Cancelled':
        return <FaTimesCircle className="inline text-red-600 mr-1" />;
      default:
        return <FaHourglassHalf className="inline text-yellow-600 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6E3] text-[#262626] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-2">
          <FaClipboardList className="text-[#FD7924]" />
          My Orders
        </h1>

        {/* Filter */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {['All', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full border transition ${
                filterStatus === status
                  ? 'bg-[#FD7924] text-white border-[#FD7924]'
                  : 'bg-white border-[#FD7924] text-[#FD7924] hover:bg-[#F7E9CC]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#F7E9CC] rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-[#FD7924] shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-1">
                  <FaClipboardList className="text-[#FD7924]" />
                  {order.serviceName}
                </h2>
                <p className="text-sm flex items-center gap-1">
                  <FaUserTie className="text-[#FD7924]" />
                  Ordered from: <span className="font-medium">{order.seller}</span>
                </p>
                <p className="text-sm flex items-center gap-1">
                  <FaCalendarAlt className="text-[#FD7924]" />
                  Date: {order.date}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium flex items-center ${
                    order.status === 'Completed'
                      ? 'bg-green-200 text-green-900'
                      : order.status === 'Cancelled'
                      ? 'bg-red-200 text-red-900'
                      : 'bg-yellow-200 text-yellow-900'
                  }`}
                >
                  {renderStatusIcon(order.status)} {order.status}
                </span>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <p className="text-center text-[#262626] font-medium mt-10">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}