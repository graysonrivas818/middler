"use client"
import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from 'cookies-next';

const initialState = {
  value: {
    loggedIn: getCookie('user') ? true : false
  }
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        value: {
          loggedIn: true
        }
      }
    },
    logout: (state, action) => {

      deleteCookie('user')
      deleteCookie('token')

      return {
        value: {
          loggedIn: false
        }
      }
    },
    logoutAdmin: (state, action) => {

      deleteCookie('admin')
      deleteCookie('adminToken')

      return {
        value: {
          loggedIn: false
        }
      }
    }
  }
})

export const { login, logout, logoutAdmin } = auth.actions
export default auth.reducer
