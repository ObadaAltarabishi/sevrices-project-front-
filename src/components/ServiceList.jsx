import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaPaintBrush,
  FaPenNib,
  FaBullhorn,
  FaCode,
  FaVideo,
  FaMusic,
  FaBriefcase,
  FaHeart,
  FaLanguage,
  FaThLarge,
} from 'react-icons/fa';

export const allServices = [
  {
    id: 1,
    name: 'Logo Design',
    category: 'Design',
    duration: 2,
    seller: 'John Doe',
    price: { min: 50, max: 100 },
    image: 'https://via.placeholder.com/300x200?text=Logo+Design',
  },
  {
    id: 2,
    name: 'Website Development',
    category: 'Programming',
    duration: 5,
    seller: 'Jane Smith',
    price: { min: 200, max: 500 },
    image: 'https://via.placeholder.com/300x200?text=Web+Dev',
  },
   {
    id: 3,
    name: 'Social Media Management',
    category: 'Marketing',
    duration: 3,
    seller: 'Ali Hassan',
    price: { min: 100, max: 250 },
    image: 'https://via.placeholder.com/300x200?text=Social+Media',
  },
  {
    id: 4,
    name: 'Voice Over',
    category: 'Audio',
    duration: 1,
    seller: 'Sara Ahmed',
    price: { min: 30, max: 80 },
    image: 'https://via.placeholder.com/300x200?text=Voice+Over',
  },
  {
    id: 5,
    name: 'Video Editing',
    category: 'Video',
    duration: 4,
    seller: 'Michael Brown',
    price: { min: 150, max: 300 },
    image: 'https://via.placeholder.com/300x200?text=Video+Editing',
  },
  {
    id: 6,
    name: 'Business Card Design',
    category: 'Design',
    duration: 1,
    seller: 'Emily Clark',
    price: { min: 25, max: 60 },
    image: 'https://via.placeholder.com/300x200?text=Business+Card',
  },
  {
    id: 7,
    name: 'App UI/UX Design',
    category: 'Design',
    duration: 3,
    seller: 'Adam Lee',
    price: { min: 120, max: 200 },
    image: 'https://via.placeholder.com/300x200?text=App+UI+Design',
  },
  {
    id: 8,
    name: 'SEO Optimization',
    category: 'Marketing',
    duration: 4,
    seller: 'Lina Morgan',
    price: { min: 90, max: 180 },
    image: 'https://via.placeholder.com/300x200?text=SEO+Optimization',
  },
  {
    id: 9,
    name: 'Content Writing',
    category: 'Writing',
    duration: 2,
    seller: 'Omar Farouk',
    price: { min: 40, max: 100 },
    image: 'https://via.placeholder.com/300x200?text=Content+Writing',
  },
  {
    id: 10,
    name: 'Translation Service',
    category: 'Writing',
    duration: 1,
    seller: 'Nora White',
    price: { min: 20, max: 50 },
    image: 'https://via.placeholder.com/300x200?text=Translation',
  },
  {
    id: 11,
    name: 'Personalized Meal Plan',
    category: 'Lifestyle',
    duration: 1,
    seller: 'Maya Nour',
    price: { min: 20, max: 60 },
    image: 'https://via.placeholder.com/300x200?text=Meal+Plan',

  },
  {
     id: 12,
    name: 'Translation Novel',
    category: 'Translation',
    duration: 1,
    seller: 'Maya Khalil',
    price: { min: 20, max: 60 },
    image: 'https://via.placeholder.com/300x200?text=translation',

  },
  // أضف باقي الخدمات هنا...
];

const categoryIcons = {
  Design: <FaPaintBrush className="inline mr-1" />,
  Writing: <FaPenNib className="inline mr-1" />,
  Marketing: <FaBullhorn className="inline mr-1" />,
  Programming: <FaCode className="inline mr-1" />,
  Video: <FaVideo className="inline mr-1" />,
  Audio: <FaMusic className="inline mr-1" />,
  Business: <FaBriefcase className="inline mr-1" />,
  Lifestyle: <FaHeart className="inline mr-1" />,
  Translation: <FaLanguage className="inline mr-1" />,
  All: <FaThLarge className="inline mr-1" />,
};

export default function ServiceList({
  selectedCategory,
  searchTerm,
  priceFilter,
  durationFilter,
}) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredServices = allServices
    .filter(
      (service) =>
        selectedCategory === 'All' || service.category === selectedCategory
    )
    .filter((service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (priceFilter === 'low') return a.price.min - b.price.min;
      else if (priceFilter === 'high') return b.price.max - a.price.max;
      return 0;
    })
    .sort((a, b) => {
      if (durationFilter === 'short') return a.duration - b.duration;
      else if (durationFilter === 'long') return b.duration - a.duration;
      return 0;
    });

  const visibleServices = filteredServices.slice(0, visibleCount);

  return (
    <div className="px-6 py-8 min-h-screen" style={{ backgroundColor: '#FBF6E3' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#262626' }}>
        Available Services
      </h2>

      {visibleServices.length === 0 && (
  <div className="flex justify-center items-center h-40 rounded-lg" style={{ backgroundColor: '#FBF6E3' }}>
    <p className="text-[#262626] text-lg">No matching services found.</p>
  </div>
)}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleServices.map((service) => (
          <div
            key={service.id}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition border"
            onClick={() => navigate(`/services/${service.id}`)}
            style={{ backgroundColor: '#F7E9CC', borderColor: '#FD7924' }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#262626' }}>
                {service.name}
              </h3>
              <p className="text-sm mb-1 text-[#262626]">
                <span className="text-[#FD7924]">
                  {categoryIcons[service.category] || <FaThLarge className="inline mr-1" />}
                </span>
                Category: {service.category}
              </p>
              <p className="text-sm mb-1 text-[#262626]">
                Duration: {service.duration} day(s)
              </p>
              <p className="text-sm mb-1 text-[#262626]">
                Seller: {service.seller}
              </p>
              <p className="text-sm font-medium text-[#FD7924]">
                Price: ${service.price.min} - ${service.price.max}
              </p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredServices.length && (
        <div className="text-center mt-6"> 
        <button
            className="px-4 py-2 rounded transition font-semibold"
            style={{
              backgroundColor: '#FD7924',
              color: '#FBF6E3',
              border: 'none',
            }}
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}