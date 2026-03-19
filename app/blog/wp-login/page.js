'use client';
import { useEffect } from 'react';

export default function WordPressLogin() {
  useEffect(() => {
    window.location.href = 'https://primary-production-bf78.up.railway.app/wp-login.php';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to WordPress Login...</p>
    </div>
  );
}