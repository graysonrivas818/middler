'use client';

import './globals.css';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center px-5 text-center">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-semibold">Application error</h2>
            <p className="text-base text-gray-600">
              A critical error occurred while rendering the application.
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
      </body>
    </html>
  );
}