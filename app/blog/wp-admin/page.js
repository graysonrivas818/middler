'use client';
import { useEffect } from 'react';

export default function WordPressAdmin() {
  useEffect(() => {
    window.location.href = 'https://primary-production-bf78.up.railway.app/wp-admin/';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to WordPress Admin...</p>
    </div>
  );
}