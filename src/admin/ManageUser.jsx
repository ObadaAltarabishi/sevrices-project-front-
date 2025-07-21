import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { FaUserCog, FaBan, FaBell, FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// بيانات وهمية (مثال لـ 20 يوزر)
const dummyUsers = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  status: 'active',
}));

const USERS_PER_PAGE = 10;

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState([]);

  const handleBlock = (user) => {
    toast.error(`${user.name} has been blocked!`);
    const userData = localStorage.getItem('user');

    axios.get('http://127.0.0.1:8000/api/admin/users/' + user.id + '/block', {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {

    }).catch((err) => {
      setError(err.response.data.message)
    })
  };
  useEffect(() => {
    try {
      axios.post('http://127.0.0.1:8000/api/admin/show_users', { 'search': searchTerm },
      ).then((res) => {
        console.log(res.data.data)
        setVisibleCount(res.data.data)
      }).catch((err) => {
      })
    } catch (err) {
    }
  }, [searchTerm])

  const handleWarn = (user) => {
    toast.warning(`A warning was sent to ${user.name}`);
    const userData = localStorage.getItem('user');

    axios.post('http://127.0.0.1:8000/api/admin/users/' + user.id + '/increase-reports', {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {

    }).catch((err) => {
      setError(err.response.data.message)
    })
  };

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const visibleUsers = filteredUsers.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + USERS_PER_PAGE);
  };

  return (
    <AdminLayout>
      <div className="bg-[#FEF8E7] p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <FaUserCog className="text-[#FD7924] text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-[#262626]">Manage Users</h2>
        </div>

        <div className="mb-6 relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full px-4 py-2 border border-[#F7E9CC] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(USERS_PER_PAGE); // إعادة التعيين عند البحث
            }}
          />
          <FaSearch className="absolute right-3 top-2.5 text-[#FD7924]" />
        </div>

        <div className="space-y-4">
          {visibleCount.length > 0 ? (
            visibleCount.map((user) => (
              <div
                key={user.id}
                className="bg-[#FBF6E3] border border-[#F7E9CC] p-4 rounded-md shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#262626]">{user.name}</h3>
                  <p className="text-sm text-[#262626]">{user.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleBlock(user)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    <FaBan /> Block
                  </button>
                  <button
                    onClick={() => handleWarn(user)}
                    className="flex items-center gap-1 bg-[#FD7924] hover:bg-[#e5661b] text-white px-3 py-1 rounded"
                  >
                    <FaBell /> Warn
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#262626] text-center">No users found.</p>
          )}
        </div>

        {/* Show More Button */}
        {visibleCount < filteredUsers.length && (
          <div className="mt-6 text-center">
            <button
              onClick={handleShowMore}
              className="px-4 py-2 bg-[#FD7924] text-white rounded hover:bg-[#e5661b]"
            >
              Show More
            </button>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;