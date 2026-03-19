"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
      toastStyle={{
        backgroundColor: '#ffffff',
        color: '#1f2937',
        border: '1px solid #e5e7eb'
      }}
      progressStyle={{
        backgroundColor: '#275ff6'
      }}
    />
  );
}
