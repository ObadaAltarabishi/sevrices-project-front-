import { useParams } from 'react-router-dom';
import { allServices } from '../components/ServiceList';
import { FaUser, FaTags, FaClock, FaDollarSign, FaShoppingCart, FaEnvelope } from 'react-icons/fa';

export default function ServiceDetails() {
  const { id } = useParams();
  const serviceId = parseInt(id, 10);
  const service = allServices.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FBF6E3] flex items-center justify-center">
        <p className="p-6 text-red-600 text-lg font-semibold">Service not found.</p>
      </div>
    );
  }

  const similarServices = allServices.filter(
    (s) => s.category === service.category && s.id !== service.id
  );

  const sameSellerServices = allServices.filter(
    (s) => s.seller === service.seller && s.id !== service.id
  );

  return (
    <div className="min-h-screen bg-[#FBF6E3] py-10 px-4 text-[#262626]">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 border border-[#FD7924]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div>
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-72 object-cover rounded-lg shadow-sm"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#FD7924]">{service.name}</h1>

            <div className="flex items-center text-[#FD7924] text-sm gap-2">
              <FaUser className="inline text-[#FD7924]" />
              <span className="font-semibold">Seller:</span> {service.seller || 'Mohammed Ahmad'}
            </div>

            <div className="flex flex-wrap gap-6 text-[#FD7924] text-sm">
              <div className="flex items-center gap-1">
                <FaTags className="text-[#FD7924]" />
                <span className="font-semibold">Category:</span> {service.category}
              </div>
              <div className="flex items-center gap-1">
                <FaClock className="text-[#FD7924]" />
                <span className="font-semibold">Duration:</span> {service.duration} days
              </div>
              <div className="flex items-center gap-1">
                <FaDollarSign className="text-[#FD7924]" />
                <span className="font-semibold">Price:</span> Between ${service.price.min} and ${service.price.max}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#FD7924] mt-4 mb-2">About this service</h2>
              <p className="leading-relaxed text-[#262626]">
                This is a premium service delivered with high quality and attention to detail.
                It’s ideal for building your brand, boosting your business, or fulfilling personal goals.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-5 py-2 bg-[#FD7924] text-white rounded-full hover:bg-[#e66e00] transition flex items-center gap-2">
                <FaShoppingCart /> Order this service
              </button>
              <button className="px-5 py-2 border border-[#FD7924] text-[#FD7924] rounded-full hover:bg-[#FEF8E7] transition flex items-center gap-2">
                <FaEnvelope /> Contact seller
              </button>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#FD7924] mb-4">Similar services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarServices.slice(0, 3).map((s) => (
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
        </section>

        <section className="mt-12">
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
        </section>
      </div>
    </div>
  );
}