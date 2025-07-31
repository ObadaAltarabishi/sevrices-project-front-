// HomePage.jsx
import { useEffect, useState } from 'react';
import CategoriesSlider from '../components/CategoriesSlider';
// import ServiceList, { allServices } from '../components/ServiceList';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [allServices, setAllServices] = useState([]);

  async function fetchData() {
    try {
      axios.get('http://127.0.0.1:8000/api/services', {
        params: {
          name: selectedCategory,
          search: searchTerm,
          sort_price: priceFilter
        }
      }).then((res) => {

        setAllServices(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [selectedCategory, searchTerm, priceFilter])
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(100);

  const filteredServices = allServices
    .filter(
      (service) =>
        selectedCategory === 'All' || service.category.name === selectedCategory
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
    <div className="min-h-screen flex flex-col bg-purple-50 text-gray-800">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        durationFilter={durationFilter}
        setDurationFilter={setDurationFilter}
      />

      {/* Categories */}
      <CategoriesSlider onCategorySelect={setSelectedCategory} />

      {/* Services */}
      {/* <ServiceList
        selectedCategory={'selectedCategory'}
        searchTerm={searchTerm}
        priceFilter={priceFilter}
        durationFilter={durationFilter}
      /> */}

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
                src={service.images[0].url}
                alt={service.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#262626' }}>
                  {service.name}
                </h3>
                <p className="text-sm mb-1 text-[#262626]">
                  Seller Name: {service.user.name}
                </p>
                <p className="text-sm mb-1 text-[#262626]">
                  <span className="text-[#FD7924]">
                    {categoryIcons[service.category] || <FaThLarge className="inline mr-1" />}
                  </span>
                  Category: {service.category.name}
                </p>
                <p className="text-sm mb-1 text-[#262626]">
                  Deadline: {service.exchange_time} Hour(s)
                </p>

                <p className="text-sm font-medium text-[#FD7924]">
                  Price: ${service.price}
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
    </div>
  );
}