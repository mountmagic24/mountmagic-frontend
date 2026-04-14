'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#1a1a1a',
        },
        success: {
          style: {
            background: '#06A77D',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#E63946',
            color: '#fff',
          },
        },
      }}
    />
  );
}
