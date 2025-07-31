import { useNavigate, useParams } from 'react-router-dom';
// import { allServices } from '../components/ServiceList';
import { FaUser, FaTags, FaClock, FaDollarSign, FaShoppingCart, FaEnvelope, FaList } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ServiceDetails() {
  const { id } = useParams();
  const serviceId = parseInt(id, 10);
  // const service = allServices.find((s) => s.id === serviceId);
  const [service, setService] = useState(null);
  const [user, setUser] = useState(null);
  const [myService, setMyService] = useState([]);
  const [showAlert, setShowAlert] = useState(null);
  const [showExAlert, setShowExAlert] = useState(null);
  const [exchange_service, setExchange_service] = useState(null);
  const [smilerServices, setSmilerServices] = useState([]);

  // async function fetchData() {
  //   try {
  //     axios.get('http://127.0.0.1:8000/api/services/' + id).then((res) => {
  //       console.log(res.data)
  //       setService(res.data)
  //     }).catch((err) => {
  //       console.log(err)
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/services/' + id).then((res) => {
      setService(res.data)
      axios.get('http://127.0.0.1:8000/api/services', {
        params: {
          name: res.data.category.id,
          search: ''
        }
      }).then((res) => {
        setSmilerServices(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
      const userData = localStorage.getItem('user');

      axios.get('http://127.0.0.1:8000/api/profiles/' + JSON.parse(userData).user.profile.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },

      }).then((res) => {
        console.log(res.data.user.services)
        setMyService(res.data.user.services)
        setUser(res.data.user)
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem('user')
        navigate('/')
      })
      // const userData = localStorage.getItem('user');

      // axios.get('http://127.0.0.1:8000/api/profiles/' + res.data.user.id, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      //   },

      // }).then((res) => {
      //   console.log(res.data)

      // }).catch((err) => {
      //   console.log(err)
      //   localStorage.removeItem('user')
      //   navigate('/')
      // })
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })


  }, [])
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = localStorage.getItem('user');
    if (!JSON.parse(userData)) {
      navigate('/login')
      return
    }
    axios.post('http://127.0.0.1:8000/api/orders', { service_id: service.id }, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      setShowAlert(false)
      navigate('/my-orders')
    }).catch((err) => {
    })
  }
  if (!service) {
    return (
      <div className="min-h-screen bg-[#FBF6E3] flex items-center justify-center">
        <p className="p-6 text-red-600 text-lg font-semibold">Service not found.</p>
      </div>
    );
  }
  const handleSubmitExchange = (e) => {
    e.preventDefault();
    const userData = localStorage.getItem('user');

    axios.post('http://127.0.0.1:8000/api/orders', { service_id: service.id, provided_service_id: exchange_service }, {
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
      },
    }).then((res) => {
      setShowExAlert(false)
      navigate('/my-orders')
    }).catch((err) => {
    })
  }
  if (!service) {
    return (
      <div className="min-h-screen bg-[#FBF6E3] flex items-center justify-center">
        <p className="p-6 text-red-600 text-lg font-semibold">Service not found.</p>
      </div>
    );
  }

  // const similarServices = allServices.filter(
  //   (s) => s.category === service.category && s.id !== service.id
  // );

  // const sameSellerServices = allServices.filter(
  //   (s) => s.seller === service.seller && s.id !== service.id
  // );

  return (
    <div className="min-h-screen bg-[#FBF6E3] py-10 px-4 text-[#262626]">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 border border-[#FD7924]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div>
            <img
              src={service.images[0].url}
              alt={service.name}
              className="w-full h-72 object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#FD7924]">{service.name}</h1>

            <div className="flex items-center text-[#FD7924] text-sm gap-2">
              <FaUser className="inline text-[#FD7924]" />
              <span className="font-semibold">Seller:</span> {service.user.name}
            </div>
            {user ? (<><div className="flex items-center text-[#FD7924] text-sm gap-2">
              <FaUser className="inline text-[#FD7924]" />
              <span className="font-semibold">Phone:</span> {user.phone_number}
            </div>
              <div className="flex items-center text-[#FD7924] text-sm gap-2">
                <FaUser className="inline text-[#FD7924]" />
                <span className="font-semibold">Email:</span> {user.email}
              </div></>) : (null)}


            <div className="flex flex-wrap gap-6 text-[#FD7924] text-sm">
              <div className="flex items-center gap-1">
                <FaTags className="text-[#FD7924]" />
                <span className="font-semibold">Category:</span> {service.category.name}
              </div>
              <div className="flex items-center gap-1">
                <FaClock className="text-[#FD7924]" />
                <span className="font-semibold">Duration:</span> {service.exchange_time} Hours
              </div>
              <div className="flex items-center gap-1">
                <FaDollarSign className="text-[#FD7924]" />
                <span className="font-semibold">Price:</span>  ${service.price}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#FD7924] mt-4 mb-2">About this service</h2>
              <p className="leading-relaxed text-[#262626]">
                {service.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <>
                <button
                  onClick={() => setShowAlert(true)}
                  className="px-5 py-2 bg-[#FD7924] text-white rounded-full hover:bg-[#e66e00] transition flex items-center gap-2"
                >
                  <FaShoppingCart /> Order this service
                </button>

                {showAlert && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                      <p className="mb-4">Are you sure you want to order this service?</p>
                      <p className="mb-5 text-red-500 ">If you order it you can't cancel it.</p>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
              {service.exchange_with_category ? (
                <>
                  <button
                    onClick={() => setShowExAlert(true)}
                    className="px-5 py-2 bg-[#FD7924] text-white rounded-full hover:bg-[#e66e00] transition flex items-center gap-2"
                  >
                    <FaShoppingCart /> Service By Service
                  </button>

                  {showExAlert && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white p-6 rounded shadow-lg text-center">
                        <label className="block text-sm font-semibold mb-1">Exchange with category <span>(Not Required)</span></label>
                        <span className="absolute left-4 top-11 text-[#FD7924]"><FaList /></span>
                        <select
                          name="exchange_with_category_id"
                          value={exchange_service}
                          onChange={(e) => setExchange_service(e.target.value)}
                          className="appearance-none my-4 w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
                          required
                        >
                          <option value='0'>Select Your Service</option>
                          {myService.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>

                        <button
                          onClick={handleSubmitExchange}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
              ) : (null)}

              {/* <button className="px-5 py-2 border border-[#FD7924] text-[#FD7924] rounded-full hover:bg-[#FEF8E7] transition flex items-center gap-2">
                <FaEnvelope /> Contact seller
              </button> */}
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#FD7924] mb-4">Similar services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smilerServices.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="bg-[#FEF8E7] rounded-lg p-4 shadow-sm hover:shadow-md transition border border-[#FD7924]"
              >
                <img
                  src={s.images[0].url}
                  alt={s.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-lg text-[#262626]">{s.name}</h3>
                <p className="text-sm text-[#FD7924]">{s.category.name}</p>
                <p className="text-sm text-[#262626] mt-1">
                  ${s.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#FD7924] mb-4">More from this seller</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sameSellerServices.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="bg-[#FEF8E7] rounded-lg p-4 shadow-sm hover:shadow-md transition border border-[#FD7924]"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h3 className="font-semibold text-lg text-[#262626]">{s.name}</h3>
                <p className="text-sm text-[#FD7924]">{s.category}</p>
                <p className="text-sm text-[#262626] mt-1">
                  ${s.price.min} - ${s.price.max}
                </p>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </div >
  );
}