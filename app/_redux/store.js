"use client";
import authReducer from '@/app/_redux/features/authSlice';
import estimatorReducer from '@/app/_redux/features/estimatorSlice';
import navigationReducer from '@/app/_redux/features/navigationSlice';
import timeEstimatorReducer from '@/app/_redux/features/timeEstimatorSlice';
import userReducer from '@/app/_redux/features/userSlice';
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    navigationReducer,
    estimatorReducer,
    timeEstimatorReducer
  },
})
