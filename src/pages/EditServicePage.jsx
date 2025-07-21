import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaSave } from 'react-icons/fa';

export default function EditServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // بيانات وهمية (لاحقاً تجيبها من API)
  const mockService = {
    id,
    title: 'Logo Design',
    price: 50,
    category: 'Design',
    duration: '2 days',
    image: 'https://via.placeholder.com/100?text=Logo',
  };

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    duration: '',
    image: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setFormData(mockService);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('duration', formData.duration);

    if (selectedFile) {
      formDataToSend.append('image', selectedFile);
    }

    try {
      // غيّر الرابط حسب API الباك عندك
      const response = await fetch(`https://your-api.com/services/${id}/update`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Service updated successfully!');
        navigate('/profile');
      } else {
        alert('Failed to update service.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
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
              name="title"
              value={formData.title}
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
          <div>
            <label className="block mb-1 font-medium" style={{ color: '#262626' }}>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-full border focus:outline-none"
              style={{ borderColor: '#FD7924', backgroundColor: '#FBF6E3' }}
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 font-medium" style={{ color: '#262626' }}>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 rounded-full border focus:outline-none"
              style={{ borderColor: '#FD7924', backgroundColor: '#FBF6E3' }}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="text-center">
            <input
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
            />
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