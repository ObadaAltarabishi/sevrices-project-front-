import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FBF6E3] text-[#262626] py-12 px-6 md:px-20">
      <h1 className="text-4xl font-bold mb-6 text-[#FD7924]">Privacy Policy</h1>

      <p className="mb-4">
        We take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#FD7924]">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Personal details you provide during registration (name, email, phone, etc.)</li>
        <li>Profile and service information you share</li>
        <li>Technical data like browser type, device, and IP address</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#FD7924]">How We Use Your Information</h2>
      <p className="mb-4">
        We use the collected information to provide and improve our services, personalize your experience, and communicate with you regarding your account.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#FD7924]">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information at any time.
      </p>

      <p className="text-sm text-[#9A9A9A] mt-10">Last updated: April 2025</p>
    </div>
  );
}