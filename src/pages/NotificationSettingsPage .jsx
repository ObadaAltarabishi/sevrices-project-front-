import { useState } from 'react';

export default function NotificationSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [message, setMessage] = useState('');

  const handleSave = (e) => {
    e.preventDefault();

    // هنا ممكن تضيف ارسال البيانات للباك اند لاحقاً
    console.log('Saved settings:', {
      emailNotifications,
      smsNotifications,
      marketingEmails,
    });

    setMessage('Notification settings saved successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to right, #F7E9CC, #FBF6E3)', padding: '1rem' }}>
      <div
        className="p-8 rounded-md shadow-md w-full max-w-md"
        style={{
          backgroundColor: '#FBF6E3',
          border: '1px solid #FD7924',
          color: '#262626',
        }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: '#262626' }}
        >
          Notification Settings
        </h2>

        <form onSubmit={handleSave} className="space-y-5">
          <label className="flex items-center justify-between font-medium" style={{ color: '#262626' }}>
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              style={{ width: '20px', height: '20px', accentColor: '#FD7924' }}
            />
          </label>

          <label className="flex items-center justify-between font-medium" style={{ color: '#262626' }}>
            <span>SMS Notifications</span>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={() => setSmsNotifications(!smsNotifications)}
              style={{ width: '20px', height: '20px', accentColor: '#FD7924' }}
            />
          </label>

          <label className="flex items-center justify-between font-medium" style={{ color: '#262626' }}>
            <span>Marketing Emails</span>
            <input
              type="checkbox"
              checked={marketingEmails}
              onChange={() => setMarketingEmails(!marketingEmails)}
              style={{ width: '20px', height: '20px', accentColor: '#FD7924' }}
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded transition"
            style={{
              backgroundColor: '#FD7924',
              color: '#FBF6E3',
              fontWeight: '600',
              border: 'none',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#e06b1e'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#FD7924'}
          >
            Save
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-semibold" style={{ color: '#262626' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}