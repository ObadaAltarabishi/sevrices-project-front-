import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaBriefcase,
  FaInfoCircle,
  FaTools
} from 'react-icons/fa';

export default function FullPageRegister() {
  const [image, setImage] = useState('https://via.placeholder.com/150');
  const fileInputRef = useRef();
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (agreed) {
      navigate('/confirm-email');
    }
  };

  const InputWithIcon = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FD7924]">
        <Icon />
      </span>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 border border-[#FD7924] bg-[#F7E9CC] text-[#262626] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#FBF6E3] text-[#262626] relative overflow-hidden">
      {/* اليسار: النموذج */}
      <div className="w-[65%] flex flex-col justify-center px-20 py-10 space-y-6 z-10">
        <h2 className="text-4xl font-bold text-[#FD7924]">Create Your Account</h2>
        <form className="space-y-4" onSubmit={handleNext}>
          <InputWithIcon icon={FaUser} type="text" placeholder="Full Name" />
          <InputWithIcon icon={FaPhone} type="tel" placeholder="Phone Number" />
          <InputWithIcon icon={FaEnvelope} type="email" placeholder="Email" />
          <InputWithIcon icon={FaLock} type="password" placeholder="Password" />

          <div className="flex gap-4">
            <div className="w-1/2">
              <InputWithIcon icon={FaBirthdayCake} type="number" placeholder="Age" />
            </div>
            <div className="w-1/2">
              <InputWithIcon icon={FaBriefcase} type="text" placeholder="Experience (years)" />
            </div>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3 text-[#FD7924]">
              <FaInfoCircle />
            </span>
            <textarea
              placeholder="About You"
              rows="3"
              className="w-full pl-10 pr-4 py-3 border border-[#FD7924] bg-[#F7E9CC] text-[#262626] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3 text-[#FD7924]">
              <FaTools />
            </span>
            <textarea
              placeholder="Services you can offer"
              rows="2"
              className="w-full pl-10 pr-4 py-3 border border-[#FD7924] bg-[#F7E9CC] text-[#262626] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
            />
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="privacy"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4 accent-[#FD7924]"
            />
            <label htmlFor="privacy" className="text-sm">
              I agree to the&nbsp;
              <a href="/privacy" target="_blank" className="text-[#FD7924] underline hover:text-[#e56e1c]">
                Privacy Policy
              </a>
            </label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className={`px-6 py-2 rounded-full text-white font-semibold transition-colors ${
                agreed ? 'bg-[#FD7924] hover:bg-[#e56e1c]' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!agreed}>
              Next
            </button>
          </div>
        </form>
      </div>

      {/* فاصل تمويجي */}
      <div className="absolute top-0 bottom-0 left-[65%] w-[80px] z-0">
        <svg viewBox="0 0 80 1000" preserveAspectRatio="none" className="w-full h-full">
          <path d="M 80 0 Q 40 500 80 1000 L 0 1000 L 0 0 Z" fill="#FD7924" opacity="0.1" />
        </svg>
      </div>

      {/* اليمين: صورة البروفايل */}
      <div className="w-[35%] bg-[#F7E9CC] text-[#262626] flex flex-col justify-center items-center px-10 py-16 space-y-8 z-10">
        <h3 className="text-3xl font-semibold">My Information</h3>
        <div className="flex flex-col items-center space-y-4">
          <div
            className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#FD7924] shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={handleImageClick}
          >
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageChange}
          />
          <p className="text-sm text-[#262626]/80 italic text-center">
            Click the photo to upload your profile picture (optional)
          </p>
        </div>
      </div>
    </div>
  );
}