'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 text-center">
      <div className="max-w-xl space-y-4">
        <h2 className="text-3xl font-semibold">Something went wrong</h2>
        <p className="text-base text-gray-600">
          An unexpected error occurred while loading this page.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}