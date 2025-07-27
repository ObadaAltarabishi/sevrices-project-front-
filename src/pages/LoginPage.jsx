import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import Loogo from '../assets/Loogo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();

    try {

      axios.post('http://127.0.0.1:8000/api/login', { 'email': email, 'password': password }).then((res) => {
        console.log(res.data)
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate('/home');
      }).catch((err) => {
        console.log(err.response.data.message)
        setError(err.response.data.message)
      })
    }
    catch (err) {
      setError(err.response.data.message)
    }
    // navigate('/home'); // Navigate to home page
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#FBF6E3] text-[#262626]">
      {/* خلفيات تجميلية */}
      <div className="absolute top-10 right-10 w-60 h-60 bg-[#FD7924] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F7E9CC] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FBF6E3] via-white to-[#d2b781] z-0" />

      {/* القسم الأيسر */}
      <div className="w-[60%] flex flex-col justify-center px-20 py-12 space-y-8 z-10">
        <h2 className="text-4xl font-bold text-[#FD7924]">Log In</h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          {/* البريد الإلكتروني */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FD7924]">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-[#FD7924] bg-[#F7E9CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* كلمة المرور */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FD7924]">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-[#FD7924] bg-[#F7E9CC] rounded-full focus:outline-none focus:ring-2 focus:ring-[#FD7924]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            className="w-full bg-[#FD7924] hover:bg-orange-500 text-white font-semibold py-3 rounded-full transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className='text-red-600'>
          {error}
        </div>
        <div className="text-sm text-[#262626]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#FD7924] hover:underline">
            Create one
          </Link>
        </div>
      </div>

      {/* القسم الأيمن */}
      <div className="w-[40%] flex  items-center justify-center z-10 mx-5">
        {/* <h1 className="text-5xl font-bold text-[#FD7924] tracking-wider">ServEx</h1> */}
        <img
          src={Loogo}
          alt='logo'
          className="w-full   rounded-full"
        />
      </div>
    </div>
  );
}