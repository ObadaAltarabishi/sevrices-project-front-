import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  FaTag, FaDollarSign, FaClock, FaUser, FaList, FaImage, FaAlignLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AddServicePage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    exchange_time: 0,
    provider: '',
    category_id: 0,
    exchange_with_category_id: 0,
    path: null,
    imagePreview: '',
    description: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [categories, setCategories] = useState([false]);

  // const categories = [
  //   'Graphic Design',
  //   'Writing & Translation',
  //   'Digital Marketing',
  //   'Programming',
  //   'Video & Animation',
  //   'Music & Audio',
  //   'Business',
  //   'Lifestyle',
  // ];
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    try {
      axios.get('http://127.0.0.1:8000/api/categories').then((res) => {

        setCategories(res.data.data);
      }).catch((err) => {
      })
    } catch (err) {
    }
  }, [])
  const handleImageChange = (e) => {

    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));

  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    setShowSuccess(true);
    try {
      const userData = localStorage.getItem('user');


      const form = new FormData();
      form.append('path', selectedImage);
      form.append('name', formData.name);
      form.append('price', formData.price);
      form.append('exchange_time', formData.exchange_time);
      form.append('category_id', formData.category_id);
      form.append('description', formData.description);
      // formData.append('image', formData.);
      axios.post('http://127.0.0.1:8000/api/services', form, {
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },
      }).then((res) => {
        // setTimeout(() =>
        setShowSuccess(false)
        // , 3000);
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
      }).catch((err) => {
        setError(err.response.data.message)
        localStorage.removeItem('user')
        navigate('')
      })
    }
    catch (err) {
      setError(err.response.data.message)
    }

  };

  return (
    <div className="min-h-screen bg-[#FBF6E3] py-10 px-4 text-[#262626]">
      <div className="max-w-4xl mx-auto bg-[#F7E9CC] p-8 rounded-2xl shadow-md border border-[#FD7924]">
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Service</h2>

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-[#FD7924] text-white px-6 py-3 rounded-lg shadow-lg animate-fadeInOut">
              Service added successfully!
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* name */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Service name</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaTag /></span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Logo Design"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
              required
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-semibold mb-1">Price ($)</label>
              <span className="absolute left-4 top-11 text-[#FD7924]"><FaDollarSign /></span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold mb-1">Duration (Hours)</label>
              <span className="absolute left-4 top-11 text-[#FD7924]"><FaClock /></span>
              <input
                type="number"
                name="exchange_time"
                value={formData.exchange_time}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"

              />
            </div>
          </div>

          {/* Provider */}
          <div className="relative">
            {/* <label className="block text-sm font-semibold mb-1">Provider Name</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaUser /></span>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"

            /> */}
            <label className="block text-sm font-semibold mb-1">Exchange with category <span>(Not Required)</span></label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaList /></span>
            <select
              name="exchange_with_category_id"
              value={formData.exchange_with_category_id}
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

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold mb-2">Upload Image <FaImage className="inline text-[#FD7924] ml-2" /></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-[#262626]"
              required
            />
            {formData.imagePreview && (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="mt-4 max-h-48 rounded-full border border-[#FD7924] object-contain shadow"
              />
            )}
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Description</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaAlignLeft /></span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your service in detail..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924] resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#FD7924] hover:bg-orange-500 text-white font-semibold shadow transition"
            >
              Submit Service
            </button>
          </div>
        </form>
      </div >

      {/* Animation style */}
      < style > {`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style >
    </div >
  );
}