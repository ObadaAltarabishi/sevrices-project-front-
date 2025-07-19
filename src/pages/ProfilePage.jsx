import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaCalendarAlt,
  FaBriefcase,
  FaCheckCircle,
  FaTag,
  FaClock,
  FaDollarSign,
  FaEdit,
  FaKey,
} from 'react-icons/fa';
import axios from 'axios';

export default function ProfilePage() {

  const [profile, setProfile] = useState(null);


  async function fetchData() {
    try {
      const userData = localStorage.getItem('user');
      axios.get('http://127.0.0.1:8000/api/profiles/' + JSON.parse(userData).user.profile.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },

      }).then((res) => {
        console.log(res.data)
        setProfile(res.data)
        setUser(res.data.user)
        setServices(res.data.user.services)

      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const mockUser = {
    id: 'user123',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+12345678',
    age: '29',
    memberSince: 'March 2025',
    image: 'https://via.placeholder.com/150',
  };

  const mockServices = [
    {
      id: 1,
      title: 'Logo Design',
      price: 50,
      category: 'Design',
      duration: '2 days',
      image: 'https://via.placeholder.com/100?text=Logo',
    },
    {
      id: 2,
      title: 'Social Media Posts',
      price: 30,
      category: 'Marketing',
      duration: '5 days',
      image: 'https://via.placeholder.com/100?text=Social',
    },
    {
      id: 3,
      title: 'Flyer Design',
      price: 40,
      category: 'Print',
      duration: '2 days',
      image: 'https://via.placeholder.com/100?text=Flyer',
    },
  ];

  const [user, setUser] = useState(null);
  const [image, setImage] = useState();
  const [services, setServices] = useState([]);

  // useEffect(() => {
  //   // setUser(mockUser);
  //   // setServices(mockServices);
  // }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: '#FBF6E3' }}>
      <div className="max-w-5xl mx-auto rounded-2xl shadow-lg p-8" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-8 mb-8" style={{ borderColor: '#FD7924' }}>
          <img
            src={profile.picture_url}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4"
            style={{ borderColor: '#FD7924' }}
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold flex items-center gap-2" style={{ color: '#FD7924' }}>
              <FaUser className="text-xl" /> {user.name}
            </h2>
            <p className="text-sm mt-1 flex items-center gap-2" style={{ color: '#262626' }}>
              <FaEnvelope /> {user.email}
            </p>
            <p className="text-sm mt-1 flex items-center gap-2" style={{ color: '#262626' }}>
              <FaPhone /> {user.phone_number}
            </p>
            <p className="text-sm mt-1 flex items-center gap-2" style={{ color: '#262626' }}>
              <FaBirthdayCake /> Age: {profile.age}
            </p>
            <p className="text-xs mt-1 italic flex items-center gap-2" style={{ color: '#9A9A9A' }}>
              <FaCalendarAlt /> Member since {profile.created_at}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="rounded-xl p-6 shadow-md text-center" style={{ backgroundColor: '#FBF6E3' }}>
            <FaBriefcase className="text-3xl mb-2" style={{ color: '#FD7924' }} />
            <p className="text-4xl font-extrabold" style={{ color: '#262626' }}>{services.length}</p>
            <p className="mt-1 font-medium" style={{ color: '#262626' }}>Services Offered</p>
          </div>
          <div className="rounded-xl p-6 shadow-md text-center" style={{ backgroundColor: '#FBF6E3' }}>
            <FaCheckCircle className="text-3xl mb-2" style={{ color: '#FD7924' }} />
            <p className="text-4xl font-extrabold" style={{ color: '#262626' }}>2</p>
            <p className="mt-1 font-medium" style={{ color: '#262626' }}>Orders Completed</p>
          </div>
        </div>

        {/* About */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 border-b pb-2" style={{ color: '#FD7924', borderColor: '#FD7924' }}>
            About Me
          </h3>
          <p className="text-lg leading-relaxed" style={{ color: '#262626' }}>
            {profile.description}
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 border-b pb-2" style={{ color: '#FD7924', borderColor: '#FD7924' }}>
            My Services
          </h3>
          {services.length === 0 ? (
            <p style={{ color: '#9A9A9A' }}>You haven't added any services yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
                  style={{ backgroundColor: '#FBF6E3' }}
                >
                  <img
                    src={service.images[0].url}
                    alt={service.title}
                    className="w-28 h-28 object-cover rounded-lg mb-4 border"
                    style={{ borderColor: '#FD7924' }}
                  />
                  <h4 className="text-lg font-bold" style={{ color: '#FD7924' }}>{service.name}</h4>
                  <p className="mt-1 flex items-center gap-1" style={{ color: '#262626' }}>
                    <FaDollarSign /> ${service.price}
                  </p>
                  <p className="mt-1 flex items-center gap-1" style={{ color: '#262626' }}>
                    <FaTag /> {service.category.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1" style={{ color: '#262626' }}>
                    <FaClock /> {service.exchange_time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            to="/edit-profile"
            className="px-6 py-3 rounded-full shadow transition font-semibold flex items-center gap-2"
            style={{ backgroundColor: '#FD7924', color: '#FBF6E3' }}
          >
            <FaEdit /> Edit Profile
          </Link>
          {/* <Link
            to="/change-password"
            className="px-6 py-3 rounded-full shadow transition font-semibold flex items-center gap-2"
            style={{ backgroundColor: '#FBF6E3', color: '#FD7924' }}
          >
            <FaKey /> Change Password
          </Link> */}
        </div>
      </div>
    </div>
  );
}