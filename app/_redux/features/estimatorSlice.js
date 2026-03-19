"use client"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: '',
    title: 'Property Information',
    adjustment: false,
    autoPopulateBusinessInformation: false,
    businessName: '',
    estimatorName: '',
    businessAddress: '',
    businessLogo: '',
    businessPhone: '',
    businessEmail: '',
    businessWebsite: '',
    businessLicenseNumber: '',
    businessInstagram: '',
    autoPopulateClientInformation: false,
    clientName: '',
    clientPhone: '',
    clientPropertyAddress: '',
    clientEmail: '',
    autoPopulateClientPropertyInformation: false,
    clientZipCode: '',
    interiorPaint: '',
    interiorSquareFeet: '',
    interiorCondition: '',
    interiorDetail: '',
    interiorItems: [],
    interiorIndividualItems: [],
    interiorEstimate: '',
    interiorAdjusted: '',
    cabinetPaint: '',
    doorsAndDrawers: '',
    insideCabinet: '',
    cabinetCondition: '',
    cabinetDetail: '',
    cabinetEstimate: '',
    cabinetAdjusted: '',
    exteriorPaint: '',
    exteriorSquareFeet: '',
    exteriorCondition: '',
    exteriorDetail: '',
    exteriorItems: [],
    exteriorIndividualItems: [],
    exteriorEstimate: '',
    exteriorAdjusted: '',
    painters: '',
    hoursPerDay: '',
    days: '',
    notesAndDisclosure: '',
    paintBrand: '',
    paintQuality: '',
    painterTapeRolls: '',
    plasticRolls: '',
    dropCloths: '',
    depositType: 'dollar',
    deposit: '',
    warranty: '',
    payments: '',
    interiorAdjusted: '',
    cabinetAdjusted: '',
    exteriorAdjusted: '',
    format: 'short',
    emailDestination: '',
    userType: '',
    where: '',
    why: ''
  }
}

export const estimator = createSlice({
  name: 'estimator',
  initialState,
  reducers: {
    changeEstimatorValue: (state, action) => {

      const { value, type } = action.payload;

      return {
        ...state,
        value: {
          ...state.value,
          [type]: value
        }
      }
    },
    changeEstimatorArray: (state, action) => {

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
    editEstimator: (state, action) => {

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
    changeObjectValue: (state, action) => {
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
    addObjectToArray: (state, action) => {
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
    resetEstimator: () => {
      return {
        ...initialState
      }
    }
  }
})

export const { changeEstimatorValue, changeEstimatorArray, editEstimator, changeObjectValue, resetEstimator, addObjectToArray } = estimator.actions
export default estimator.reducer
