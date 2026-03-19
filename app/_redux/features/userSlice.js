"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    email: '',
    bio: '',
    membershipID: '',
    emailVerified: '',
    role: '',
    paymentPlanSelect: 'yearly',
    clientSecret: '',
    applyCode: '',
    subscriptionID: '',
    subscriptionID: '',
    termsAndConditions: false,
    keepLoggedIn: false,
    paintCard: '',
    message: '',
    confirmDisable: '',
    businessLogo: ''
  }
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserValue: (state, action) => {

      const { value, type } = action.payload;

      return {
        ...state,
        value: {
          ...state.value,
          [type]: value
        }
      }
    },
    changeUserArray: (state, action) => {

      const { item, type } = action.payload;

      let savedArray = [...state.value[type]]

      if (savedArray.find((obj) => obj.id == item.id)) {
        savedArray = savedArray.filter((service) => service.id !== item.id)
      } else {
        savedArray = [...savedArray, item]
      }

      return {
        ...state,
        value: {
          ...state.value,
          [type]: savedArray
        }
      }
    },
    editUser: (state, action) => {

      const { id, items } = action.payload;

      let foundItem = items.find(item => item.id === id)

      return {
        ...state,
        value: {
          ...state.value,
          ...foundItem
        }
      }

    },
    resetUser: () => {
      return {
        ...initialState
      }
    }
  }
})

export const { changeUserValue, changeUserArray, editUser, resetUser } = user.actions
export default user.reducer
