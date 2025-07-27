import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBirthdayCake,
  FaBriefcase,
  FaInfoCircle,
  FaTools,
  FaSave,
  FaUserEdit,
} from 'react-icons/fa';
import axios from 'axios';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    experience: 0,
    description: '',
    location: '',
  });
  // const navigate = useNavigate();
  const [image, setImage] = useState('https://via.placeholder.com/150');


  async function fetchData() {
    try {
      const userData = localStorage.getItem('user');
      axios.get('http://127.0.0.1:8000/api/profiles/' + JSON.parse(userData).user.profile.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },
      }).then((res) => {
        console.log(res.data)
        setImage(res.data.picture_url)
        setFormData({ name: res.data.user.name, age: res.data.age, experience: res.data.experience_years, description: res.data.description, location: res.data.location })
      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()

  }, [])

  const [profileImage, setProfileImage] = useState(
    'https://i.pinimg.com/736x/9a/37/2e/9a372e8a3d61f2755b6a9a564bcd98c2.jpg'
  );

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    // const file = e.target.files[0];
    // if (!file) return;
    const file = e.target.files[0];
    setSelectedImage(file);
    setImage(URL.createObjectURL(file));

  };

  const handleSave = async (e) => {
    e.preventDefault();

    const formDataImg = new FormData();
    formDataImg.append('image', selectedImage);
    formDataImg.append('age', formData.age);
    formDataImg.append('description', formData.description);
    formDataImg.append('location', formData.location);
    formDataImg.append('experience_years', formData.experience);

    try {
      const userData = localStorage.getItem('user');
      formDataImg.append('_method', 'PATCH');
      axios.post(
        'http://127.0.0.1:8000/api/profiles/' + JSON.parse(userData).user.profile.id,
        formDataImg,
        {
          headers: {
            'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
          },
        }
      ).then((res) => {

        navigate('/profile')
      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
    // try {
    // const profileData = {
    //   ...formData,
    //   image: profileImage,
    // };

    console.log('Data to send:', profileData);
    // مثال إرسال البيانات:
    /*
    const res = await fetch('https://your-api.com/profile/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    */

    // navigate('/profile');
    // } catch (err) {
    //   console.error('Save failed', err);
    // }
  };

  const InputWithIcon = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">
        <Icon />
      </span>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-full bg-white text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-50 text-orange-900 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* النموذج */}
        <div className="bg-white rounded-lg shadow-md p-8 flex-1 border border-orange-200">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaUserEdit className="text-orange-600" /> Edit Your Profile
          </h2>

          <form className="space-y-6" onSubmit={handleSave}>
            <InputWithIcon
              icon={FaUser}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <div className="flex gap-4">
              <InputWithIcon
                icon={FaBirthdayCake}
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
              />
              <InputWithIcon
                icon={FaBriefcase}
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience (years)"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-orange-500">
                <FaInfoCircle />
              </span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="About You"
                rows="3" className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-md bg-white text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-3 text-orange-500">
                <FaTools />
              </span>
              <textarea
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="location "
                rows="2"
                className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-md bg-white text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-500 transition flex items-center justify-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </form>
        </div>

        {/* صورة البروفايل */}
        <div className="bg-orange-100 rounded-lg shadow-md p-8 flex flex-col items-center text-orange-900 flex-[0.45] border border-orange-200">
          <h3 className="text-2xl font-semibold mb-6">My Information</h3>

          <div
            onClick={handleImageClick}
            className="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-600 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={image}
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
          />

          <p className="mt-4 text-center italic text-orange-800/80">
            Click the photo to upload your profile picture
          </p>
        </div>
      </div>
    </div>
  );
}