"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: '',
    emailDestination: '',
    password: '',
    estimatorName: '',
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    clientName: '',
    clientPropertyAddress: '',
    clientPhone: '',
    clientEmail: '',
    zipCode: '',
    chargePerHour: '',
    painters: '',
    hoursPerDay: '',
    days: '',
    totalLabor: '',
    paintBrand: '',
    gallons: '',
    paintCost: '',
    totalPaintCost: '',
    materials: '',
    painterTapeRolls: '',
    plasticRolls: '',
    dropCloths: '',
    workersPerHour: '',
    percentageFee: '',
    workersNeeded: '',
    notes: '',
    totalEstimate: '',
    formType: ''
  }
}

export const timeEstimator = createSlice({
  name: 'timeEstimator',
  initialState,
  reducers: {
    changeTimeEstimatorValue: (state, action) => {

      const { value, type } = action.payload;

      return {
        ...state,
        value: {
          ...state.value,
          [type]: value
        }
      }
    },
    changeTimeEstimatorArray: (state, action) => {

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
    editTimeEstimator: (state, action) => {

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
    changeTimeObjectValue: (state, action) => {
      const { idx, value, index, items, type } = action.payload;
      // console.log(idx, value, index, items, type)
      // Create a new copy of the items array
      const newItems = [...items];

      // Create a new copy of the object at idx
      const newItem = { ...newItems[idx] };

      // Update the value at the specified index
      newItem[index] = value;

      // Replace the old item with the new item
      newItems[idx] = newItem;

      return {
        ...state,
        value: {
          ...state.value,
          [type]: newItems
        }
      };

    },
    addTimeObjectToArray: (state, action) => {
      const { newObject, items, type, index } = action.payload;

      let newItems = []
      let list = []

      if (items[index]) {
        list = items.filter((item, idx) => idx !== index)
        newItems = [...list]
      } else {
        newItems = [...items]
        newItems.push(newObject)
      }

      return {
        ...state,
        value: {
          ...state.value,
          [type]: newItems
        }
      };

    },
    resetTimeEstimator: () => {
      return {
        ...initialState
      }
    }
  }
})

export const { changeTimeEstimatorValue, changeTimeEstimatorArray, editTimeEstimator, changeTimeObjectValue, resetTimeEstimator, addTimeObjectToArray } = timeEstimator.actions
export default timeEstimator.reducer
