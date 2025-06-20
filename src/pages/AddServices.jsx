import { useState } from 'react';
import {
  FaTag, FaDollarSign, FaClock, FaUser, FaList, FaImage, FaAlignLeft
} from 'react-icons/fa';

export default function AddServicePage() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    duration: '',
    provider: '',
    category: '',
    imageFile: null,
    imagePreview: '',
    description: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    'Graphic Design',
    'Writing & Translation',
    'Digital Marketing',
    'Programming',
    'Video & Animation',
    'Music & Audio',
    'Business',
    'Lifestyle',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({
      title: '',
      price: '',
      duration: '',
      provider: '',
      category: '',
      imageFile: null,
      imagePreview: '',
      description: '',
    });
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
          {/* Title */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Service Title</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaTag /></span>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              <label className="block text-sm font-semibold mb-1">Duration (minutes)</label>
              <span className="absolute left-4 top-11 text-[#FD7924]"><FaClock /></span>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
                required
              />
            </div>
          </div>

          {/* Provider */}
          <div className="relative"> <label className="block text-sm font-semibold mb-1">Provider Name</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaUser /></span>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
              required
            />
          </div>

          {/* Category */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Category</label>
            <span className="absolute left-4 top-11 text-[#FD7924]"><FaList /></span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="appearance-none w-full pl-10 pr-4 py-3 rounded-full border border-[#FD7924] bg-[#FBF6E3] text-[#262626] focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
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
      </div>

      {/* Animation style */}
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
    </div>
  );
}