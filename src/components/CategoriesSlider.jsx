import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  FaThLarge
} from 'react-icons/fa';

// const categories = [
//   { name: 'All', icon: <FaThLarge /> },
//   { name: 'Design', icon: <FaPaintBrush /> },
//   { name: 'Writing', icon: <FaPenNib /> },
//   { name: 'Marketing', icon: <FaBullhorn /> },
//   { name: 'Programming', icon: <FaCode /> },
//   { name: 'Video', icon: <FaVideo /> },
//   { name: 'Audio', icon: <FaMusic /> },
//   { name: 'Business', icon: <FaBriefcase /> },
//   { name: 'Lifestyle', icon: <FaHeart /> },
//   { name: 'Translation', icon: <FaLanguage /> }
// ];

export default function CategoriesSlider({ onCategorySelect }) {
  const scrollRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0);
  const [categories, setCategories] = useState([{ name: 'All' }]);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });

  const handleSelect = (category, index) => {
    setActiveIndex(index);
    onCategorySelect(category.name);
    console.log(category.name)
  };

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      axios.get('http://127.0.0.1:8000/api/categories').then((res) => {

        setCategories([{ name: 'All' }, ...res.data.data]);
      }).catch((err) => {
      })
    } catch (err) {
    }
  }

  return (
    <div className="flex items-center gap-2 px-6 py-4" style={{ backgroundColor: '#FBF6E3' }}>
      <button onClick={scrollLeft} style={{ color: '#FD7924' }}>
        <FaChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing"
      >
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleSelect(cat, i)}
            className="min-w-[130px] flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-md shadow text-center cursor-pointer transition-colors duration-200"
            style={{
              backgroundColor: activeIndex === i ? '#FD7924' : '#F7E9CC',
              color: activeIndex === i ? '#FBF6E3' : '#262626',
              fontWeight: '500'
            }}
          >
            <div className="text-xl">{cat.icon}</div>
            <span className="text-sm">{cat.name}</span>
          </div>
        ))}
      </div>

      <button onClick={scrollRight} style={{ color: '#FD7924' }}>
        <FaChevronRight size={24} />
      </button>
    </div>
  );
}