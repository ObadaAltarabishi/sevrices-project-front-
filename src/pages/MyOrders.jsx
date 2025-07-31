import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FaClipboardList,
  FaUserTie,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from 'react-icons/fa';

// const dummyOrders = [
//   {
//     id: 1,
//     serviceName: 'Logo Design',
//     date: '2025-06-01',
//     status: 'In Progress',
//     price: '$50',
//     seller: 'John Doe',
//     description: 'Professional logo design with 3 revisions.',
//   },
//   {
//     id: 2,
//     serviceName: 'Social Media Management',
//     date: '2025-05-28',
//     status: 'Completed',
//     price: '$120',
//     seller: 'Sarah Smith',
//     description: '30-day social media strategy and content creation.',
//   },
//   {
//     id: 3,
//     serviceName: 'Website Audit',
//     date: '2025-05-25',
//     status: 'Cancelled',
//     price: '$80',
//     seller: 'Ali Hassan',
//     description: 'Comprehensive website audit report with recommendations.',
//   },
// ];

export default function MyOrders() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [dummyOrders, setDummyOrders] = useState([]);
  const [userId, setUserId] = useState(0);
  const [serviceId, setServiceId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);

  const filteredOrders =
    filterStatus === 'All'
      ? dummyOrders
      : dummyOrders.filter((order) => order.status === filterStatus);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'accepted':
        return <FaCheckCircle className="inline text-green-600 mr-1" />;
      case 'rejected':
        return <FaTimesCircle className="inline text-red-600 mr-1" />;
      default:
        return <FaHourglassHalf className="inline text-yellow-600 mr-1" />;
    }
  };
  const handle = (result, id) => {
    const userData = localStorage.getItem('user');
    console.log(id)
    axios.patch('http://127.0.0.1:8000/api/orders/' + id, { status: result }, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      setUserId(JSON.parse(userData).user.id)
      axios.get('http://127.0.0.1:8000/api/orders', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },
      }).then((res) => {
        setDummyOrders(res.data.data)
        console.log(res.data.data)
      }).catch((err) => {
        console.log(err)
      })

    }).catch((err) => {
    })
  }
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    setUserId(JSON.parse(userData).user.id)
    axios.get('http://127.0.0.1:8000/api/orders', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      setDummyOrders(res.data.data)
      console.log(res.data.data)
    }).catch((err) => {
      console.log(err)
    })


  }, [selectedImage])

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For UI preview, if you need it:
    setSelectedImage(file);
    // setPreviewUrl(URL.createObjectURL(file));

    // Build the FormData with the fresh `file` reference
    const formData = new FormData();
    formData.append('path', file);
    formData.append('receiver_id', receiverId);

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await axios.post(
        `http://127.0.0.1:8000/api/orders/${serviceId}/files`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${userData.access_token}`,
            // Let axios set multipart boundary automatically
          },
        }
      )
      res.then((res) => {
        // setUserId(JSON.parse(userData).user.id)
        axios.get('http://127.0.0.1:8000/api/orders', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
          },
        }).then((res) => {
          setDummyOrders(res.data.data)
          console.log(res.data.data)
        }).catch((err) => {
          console.log(err)
        })
      }
      );

      // Success feedback
      setShowSuccess(true);
      setTimeout(() => {
        setUserId(JSON.parse(userData).user.id)
        axios.get('http://127.0.0.1:8000/api/orders', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
          },
        }).then((res) => {
          setDummyOrders(res.data.data)
          console.log(res.data.data)
        }).catch((err) => {
          console.log(err)
        })
        setShowSuccess(false)
      }
        , 3000);

      // Reset your form fields
      setFormData({
        name: '',
        price: '',
        exchange_time: new Date().toISOString().split('T')[0],
        provider: '',
        category_id: 0,
        path: null,
        imagePreview: '',
        description: '',
      });

    } catch (err) {
      console.error('Upload failed', err);
      // handle or display error
    }
  };
  const handleSubmit = (id) => {
    const userData = localStorage.getItem('user');

    axios.post('http://127.0.0.1:8000/api/orders/' + id, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      setShowAlert(false)
      setUserId(JSON.parse(userData).user.id)
      axios.get('http://127.0.0.1:8000/api/orders', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },
      }).then((res) => {
        setDummyOrders(res.data.data)
        console.log(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
    }).catch((err) => {
      console.log(err)
    })
  }
  const [showAlert, setShowAlert] = useState(null);

  return (
    <div className="min-h-screen bg-[#FBF6E3] text-[#262626] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-2">
          <FaClipboardList className="text-[#FD7924]" />
          My Orders
        </h1>
        {/* Filter */}
        <div className="flex justify-center mb-8 gap-4 flex-wrap">
          {['All', 'In Progress', 'accepted', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full border transition ${filterStatus === status
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
            <>
              {
                userId != order.user_id ? (
                  < div
                    key={order.id}
                    className="bg-[#f2d18f] rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-[#FD7924] shadow-sm"
                  >
                    <div>
                      <h2 className="text-xl font-semibold flex items-center gap-2 mb-1">
                        <FaClipboardList className="text-[#FD7924]" />
                        {order.service.name}
                      </h2>
                      <p className="text-sm flex items-center gap-1">
                        <FaUserTie className="text-[#FD7924]" />
                        Ordered from: <span className="font-medium">{order.user.name}</span>
                      </p>
                      {order.provided_service ? (
                        <>
                          <p className="text-sm flex items-center gap-1 font-bold" >
                            <FaCalendarAlt className="text-[#FD7924]" />
                            Exchange Service Name: {order.provided_service.name}
                          </p>
                          <p className="text-sm flex items-center gap-1 font-bold">
                            <FaCalendarAlt className="text-[#FD7924]" />
                            Description: {order.provided_service.description}
                          </p>
                          <p className="text-sm flex items-center gap-1 font-bold">
                            <FaCalendarAlt className="text-[#FD7924]" />
                            Exchange Time: {order.provided_service.exchange_time}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm flex items-center gap-1">
                          <FaCalendarAlt className="text-[#FD7924]" />
                          Price: {order.service.price} $
                        </p>
                      )}

                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                      {order.status == 'pending' ? (
                        <>
                          <button
                            type="button"
                            className="w-full py-3 px-3 bg-[#32fd24] text-white rounded-full  transition" onClick={() => handle('accepted', order.id)}
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            className="w-full py-3 px-3 bg-[#d85252] text-white rounded-full hover:bg-[#e7671b] transition" onClick={() => handle('rejected', order.id)}
                          >
                            Refuse
                          </button>
                        </>
                      ) : (
                        <>
                          <div className=' flex'>
                            {
                              order.status == 'accepted' ? (
                                <>
                                  <input
                                    type="file"
                                    onClick={() => { setServiceId(order.id); setReceiverId(order.user_id) }}
                                    onChange={handleImageChange}
                                    className="block w-full text-[#262626]"
                                    required
                                  />
                                  <button
                                    type="button"
                                    disabled={!Boolean(order.files?.[0])}
                                    className="w-full mx-5 py-3 px-3 bg-[#32fd24] text-white rounded-full  transition" onClick={() => handle('completed', order.id)}
                                  >
                                    Complete
                                  </button>
                                </>
                              ) : (null)
                            }
                            < span
                              className={` text-sm px-3 py-1 flex rounded-full font-medium  items-center ${order.status === 'accepted'
                                ? 'bg-green-200 text-green-900'
                                : order.status === 'rejected'
                                  ? 'bg-red-400 text-red-900'
                                  : 'bg-yellow-200 text-yellow-900'
                                }`
                              }
                            >
                              {renderStatusIcon(order.status)} {order.status}
                            </span>
                          </div>

                        </>
                      )}

                    </div>
                  </div >
                ) : (

                  < div
                    key={order.id}
                    className="bg-[#F7E9CC] rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-[#FD7924] shadow-sm"
                  >
                    <div>
                      <h2 className="text-xl font-semibold flex items-center gap-2 mb-1">
                        <FaClipboardList className="text-[#FD7924]" />
                        {order.service.name}
                      </h2>
                      <p className="text-sm flex items-center gap-1">
                        <FaUserTie className="text-[#FD7924]" />
                        Ordered from: <span className="font-medium">{order.sallerName}</span>
                      </p>
                      <p className="text-sm flex items-center gap-1">
                        <FaCalendarAlt className="text-[#FD7924]" />
                        Price: {order.service.price} $
                      </p>
                    </div>

                    <div className=" flex flex-col items-start md:items-end gap-2 mt-4 md:mt-0">
                      <div
                        className={`text-sm px-3 py-1 rounded-full font-medium flex items-center ${order.status === 'accepted'
                          ? 'bg-green-200 text-green-900'
                          : order.status === 'rejected'
                            ? 'bg-red-400 text-red-900'
                            : 'bg-yellow-200 text-yellow-900'
                          }`}
                      >
                        {renderStatusIcon(order.status)} {order.status}
                      </div>
                      <div className='flex'>
                        <>
                          {order.status === 'completed' && order.files[0] ? (

                            <div className='flex'>
                              <>
                                <button
                                  onClick={() => setShowAlert(true)}
                                  className="px-5 py-2 bg-[#fd2424] text-white rounded-full hover:bg-[#e66e00] transition flex items-center gap-2"
                                >
                                  Report
                                </button>

                                {showAlert && (
                                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-white p-6 rounded shadow-lg text-center">
                                      <p className="mb-4">Are you sure you want Report this order?</p>
                                      <p className="mb-5 text-red-500 ">If you Report it you can't cancel it.</p>
                                      <button
                                        onClick={() => handleSubmit(order.id)}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                      >
                                        Submit
                                      </button>
                                      <button
                                        onClick={() => { setShowAlert(false) }}
                                        className="px-4 py-2 mx-3 bg-gray-400 text-white rounded"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </>
                              <a
                                href={order.files[0].path}
                                download
                                className="w-full  mx-4 px-3 bg-[#2436fd] text-white rounded-full transition inline-block text-center"
                              >
                                Download File
                              </a>
                            </div>
                          ) : (null)}
                        </>

                      </div>
                    </div></div>
                )
              }
            </>
          ))}

          {filteredOrders.length === 0 && (
            <p className="text-center text-[#262626] font-medium mt-10">No orders found.</p>
          )}
        </div>
      </div>
    </div >
  );
}