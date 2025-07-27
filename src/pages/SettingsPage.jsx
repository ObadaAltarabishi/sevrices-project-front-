import axios from 'axios';
import { useState } from 'react';
import { FaTrashAlt, FaEnvelope, FaPhoneAlt, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleDeleteAccount = (e) => {
    e.preventDefault();

    try {
      const userData = localStorage.getItem('user');

      axios.post('http://127.0.0.1:8000/api/update_user', { 'phone_number': phone }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(userData).access_token,
        },
      }).then((res) => {
        setPhone('')
      }).catch((err) => {
        console.log(err.response.data.message)
      })
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6E3] text-[#262626] px-6 py-10 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6 border border-[#FD7924]">
        <h2 className="text-3xl font-bold text-center text-[#FD7924]">Settings</h2>

        {/* Email */}
        {/* <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <div className="flex items-center border rounded-full px-4 py-2 bg-[#FEF8E7] border-[#FD7924]">
            <FaEnvelope className="mr-2 text-[#FD7924]" />
            <input
              type="email"
              placeholder="example@mail.com"
              className="bg-transparent w-full outline-none text-[#262626]"
            />
          </div>
        </div> */}

        {/* Phone */}
        <form onSubmit={handleDeleteAccount} className="space-y-6">

          <div>

            <label className="block text-sm font-semibold mb-1">Change Phone Number</label>
            <div className="flex items-center border rounded-full px-4 py-2 bg-[#FEF8E7] border-[#FD7924]">
              <FaPhoneAlt className="mr-2 text-[#FD7924]" />
              <input
                type="tel"
                placeholder="+1 234 567 890"
                className="bg-transparent w-full outline-none text-[#262626]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <button
            type='submit'
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-yellow-500 hover:bg-yellow-700 text-white font-semibold transition"
          >
            Save
          </button>
        </form>
        {/* Change Password */}
        <button
          onClick={() => navigate('/change-password')}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#FD7924] hover:bg-[#e66e00] text-white font-semibold transition"
        >
          <FaLock />
          Change Password
        </button>


      </div>
    </div>
  );
}