import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaClock, FaEdit, FaList, FaSave } from 'react-icons/fa';
import axios from 'axios';

export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const location = useLocation();
  const service = location.state?.service;

  console.log('Received service:', service);
  // بيانات وهمية (لاحقاً تجيبها من API)
  const mockService = {
    id,
    title: 'Logo Design',
    price: 50,
    category_id: 'Design',
    exchange_time: '2 days',
    image: 'https://via.placeholder.com/100?text=Logo',
  };

  const [formData, setFormData] = useState({
    id: service.id,
    name: service.name,
    price: service.price,
    category: service.category_id,
    exchange_time: service.exchange_time,
    image: service.images.url,
  });
  const [categories, setCategories] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // setFormData(mockService);
    axios.get('http://127.0.0.1:8000/api/categories').then((res) => {

      setCategories(res.data.data);
      console.log(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageURL,
      }));
      setSelectedFile(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState('https://via.placeholder.com/150');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formDataToSend = new FormData();
    // formDataToSend.append('name', formData.name);
    // formDataToSend.append('price', formData.price);
    // formDataToSend.append('category_id', formData.category);
    // formDataToSend.append('exchange_time', formData.exchange_time);

    // if (selectedFile) {
    //   formDataToSend.append('image', selectedImage);
    // }
    try {
      const userData = localStorage.getItem('user');
      // formDataToSend.append('_method', 'PATCH');
      axios.patch(
        'http://127.0.0.1:8000/api/services/' + service.id,
        formData,
        {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
          },
        }
      ).then((res) => {

        navigate('/profile');
      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
    // try {
    //   // غيّر الرابط حسب API الباك عندك
    //   const response = await fetch(`https://your-api.com/services/${id}/update`, {
    //     method: 'POST',
    //     body: formDataToSend,
    //   });

    //   if (response.ok) {
    //     alert('Service updated successfully!');
    //     navigate('/profile');
    //   } else {
    //     alert('Failed to update service.');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    //   alert('An error occurred');
    // }
  };
  const handleImageUpload = async (e) => {
    // const file = e.target.files[0];
    // if (!file) return;
    const file = e.target.files[0];
    setSelectedImage(file);
    setImage(URL.createObjectURL(file));

  };

  return (
    <div className="min-h-screen py-10 px-4" style={{ backgroundColor: '#FBF6E3' }}>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3" style={{ color: '#FD7924' }}>
          <FaEdit /> Edit Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium" style={{ color: '#262626' }}>Service Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-full border focus:outline-none"
              style={{ borderColor: '#FD7924', backgroundColor: '#FBF6E3' }}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium" style={{ color: '#262626' }}>Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-full border focus:outline-none"
              style={{ borderColor: '#FD7924', backgroundColor: '#FBF6E3' }}
              required
            />
          </div>

          {/* Category */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Category</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaList /></span>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="appearance-none w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
              required
            >
              <option value='0'>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className='relative'>
            <label className="block text-sm font-semibold mb-1">Duration ( Hours )</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaClock /></span>
            <input
              type="number"
              name="exchange_time"
              value={formData.exchange_time}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"

            />
          </div>

          {/* Image Upload */}
          <div className="text-center ">
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <img
              src={formData.image}
              alt="Click to Upload"
              onClick={handleImageClick}
              className="w-32 h-32 object-cover rounded-lg mx-auto border cursor-pointer hover:opacity-80 transition"
              style={{ borderColor: '#FD7924' }}
            /> */}
            {/* <div
              onClick={handleImageClick}
              className="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-600 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={formData.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            /> */}
            <p className="text-sm mt-2" style={{ color: '#262626' }}>Click the image to upload a new one</p>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 rounded-full font-semibold shadow flex items-center gap-2 justify-center mx-auto"
              style={{ backgroundColor: '#FD7924', color: '#FBF6E3' }}
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}