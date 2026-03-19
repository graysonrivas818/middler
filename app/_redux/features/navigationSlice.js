"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const initialState = {
  value: {
    view: getCookie('view') ? getCookie('view') : 'dashboard',
    popup: '',
    popupType: 'signup',
    viewType: '',
    edit: '',
    paintEstimator: '1',
    error: '',
    emailType: ''
  }
}

export const navigation = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    changeView: (state, action) => {

      setCookie('view', action.payload);

      return {
        ...state,
        value: {
          ...state.value,
          view: action.payload
        }
      }
    },
    changePopup: (state, action) => {

      setCookie('popup', action.payload);

      return {
        ...state,
        value: {
          ...state.value,
          popup: action.payload
        }
      }
    },
    changePopupType: (state, action) => {

      return {
        ...state,
        value: {
          ...state.value,
          popupType: action.payload
        }
      }
    },
    changePaintEstimator: (state, action) => {

      return {
        ...state,
        value: {
          ...state.value,
          paintEstimator: action.payload
        }
      }
    },
    changeEdit: (state, action) => {

      setCookie('edit', action.payload);

      return {
        ...state,
        value: {
          ...state.value,
          edit: action.payload
        }
      }
    }
  }
})

export const { changeView, changePopup, changePopupType, changePaintEstimator, changeEdit } = navigation.actions
export default navigation.reducer
