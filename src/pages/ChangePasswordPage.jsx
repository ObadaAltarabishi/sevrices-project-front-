import { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isTyping, setIsTyping] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    console.log('Password changed:', { currentPassword, newPassword });

    setMessage('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF6E3] py-10 px-4 flex items-center justify-center">
      <div className="bg-[#F7E9CC] rounded-lg shadow-md p-8 w-full max-w-md border border-[#FD7924]">
        <h2 className="text-3xl font-bold text-center text-[#262626] mb-8 mt-12">
          Change Password
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Current Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-[#FD7924]" />
            <input
              type={showCurrent ? 'text' : 'password'}
              placeholder="Current Password"
              className="w-full pl-10 pr-10 py-3 border border-[#FD7924] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924] text-[#262626] bg-white placeholder-[#FD7924]"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setIsTyping(true);
              }}
              required
            />
            <span
              className="absolute top-3.5 right-4 text-[#FD7924] cursor-pointer"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-[#FD7924]" />
            <input
              type={showNew ? 'text' : 'password'}
              placeholder="New Password"
              className="w-full pl-10 pr-10 py-3 border border-[#FD7924] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924] text-[#262626] bg-white placeholder-[#FD7924]"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setIsTyping(true);
              }}
              required
            />
            <span
              className="absolute top-3.5 right-4 text-[#FD7924] cursor-pointer"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute top-3.5 left-4 text-[#FD7924]" />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm New Password"
              className="w-full pl-10 pr-10 py-3 border border-[#FD7924] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924] text-[#262626] bg-white placeholder-[#FD7924]"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsTyping(true);
              }}
              required
            />
            <span
              className="absolute top-3.5 right-4 text-[#FD7924] cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FD7924] text-white rounded-full hover:bg-[#e7671b] transition"
          >
            Save
          </button>
        </form>

        {message && (
          <p className="text-center mt-6 text-[#262626] font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}