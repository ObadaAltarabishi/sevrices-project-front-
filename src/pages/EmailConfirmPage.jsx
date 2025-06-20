import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmailConfirmationPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const inputRefs = useRef([]);
  const expectedCode = '123456'; // Temporary hardcoded code

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleConfirm = () => {
    const enteredCode = code.join('');
    if (enteredCode === expectedCode) {
      navigate('/home');
    } else {
      setError('Incorrect code. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleResend = () => {
    setSuccessMessage('A new verification code has been sent to your email.');
    setError('');
  };

  const handleChangeEmail = () => {
    navigate('/register');
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div
      className="flex items-center justify-center h-screen px-4"
      style={{ backgroundColor: '#FBF6E3' }}
    >
      <div
        className="p-10 rounded-xl shadow-lg w-full max-w-md text-center"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: '#FD7924' }}
        >
          Email Verification
        </h1>
        <p
          className="mb-4"
          style={{ color: '#262626' }}
        >
          Enter the 6-digit code sent to your email address.
        </p>

        {/* Verification code inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-12 text-center text-xl rounded border"
              style={{
                borderColor: '#FD7924',
                backgroundColor: '#FFFFFF',
                color: '#262626',
                outlineColor: '#FD7924',
              }}
            />
          ))}
        </div>

        {/* Messages */}
        {error && (
          <p className="text-sm mb-4" style={{ color: '#9A9A9A' }}>
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-sm mb-4" style={{ color: '#9A9A9A' }}>
            {successMessage}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="px-6 py-2 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: '#FD7924',
              color: '#FBF6E3',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e96e1f')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FD7924')}
          >
            Confirm
          </button>

          <button
            onClick={handleResend}
            className="hover:underline text-sm"
            style={{ color: '#FD7924' }}
          >
            Resend Code
          </button>

          <button
            onClick={handleChangeEmail}
            className="hover:underline text-sm"
            style={{ color: '#FD7924' }}
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmationPage;