// HomePage.jsx
import { useState } from 'react';
import CategoriesSlider from '../components/CategoriesSlider';
import ServiceList from '../components/ServiceList';
import Header from '../components/Header';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');

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
      <ServiceList
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        priceFilter={priceFilter}
        durationFilter={durationFilter}
      />
    </div>
  );
}