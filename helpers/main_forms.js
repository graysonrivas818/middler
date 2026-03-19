export const paintEstimateFieldsRequired = (step, values, dispatch, changePaintEstimator, changeEstimatorValue, paintEstimateSteps, setRequired, changePopup, previewEstimate, trackFormEvents, navigation, changeEdit, type) => {

  if (step == 1) {
    // const zipCodeRequired = [
    //   'clientPropertyAddress',
    // ]

    // let notFilled = []

    trackFormEvents(`client_property_address`)

    // zipCodeRequired.map((item) => !values[item] ? notFilled.push(item) : null )

    // if(notFilled.length > 0) return setRequired(notFilled)

    return dispatch(changePaintEstimator((step + 1)))

  }

  // if(step == 2){
  //   const interiorSquareFeetRequired = [
  //     'interiorSquareFeet',
  //   ]

  //   let notFilled = []

  //   interiorSquareFeetRequired.map((item) => !values[item] ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  if (step == 2) {

    trackFormEvents(`boolean_interior_paint`)

    if (type) {

      dispatch(changeEstimatorValue({ value: 'yes', type: 'interiorPaint' }))
      return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    }

    if (!type) {

      dispatch(changeEstimatorValue({ value: 'no', type: 'interiorPaint' }))
      return dispatch(changePaintEstimator((step + .5)))

    }

  }

  if (step == 2.1) {

    const interiorSquareFeetRequired = [
      'interiorSquareFeet',
    ]

    let notFilled = []

    interiorSquareFeetRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 2.1) {

    trackFormEvents(`interior_square_feet`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 2.2) {

    const interiorItemsRequired = [
      'interiorItems',
    ]

    let notFilled = []

    interiorItemsRequired.map((item) => values[item].length == 0 ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 2.2) {

    trackFormEvents(`interior_items`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 2.3) {

    const interiorConditionRequired = [
      'interiorCondition',
    ]

    let notFilled = []

    interiorConditionRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 2.3) {

    trackFormEvents(`interior_condition`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 2.4) {

    const interiorDetailRequired = [
      'interiorDetail',
    ]

    let notFilled = []

    interiorDetailRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 2.4) {

    trackFormEvents(`interior_detail`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 2.5) {

    const items = values['interiorIndividualItems'];

    if (Array.isArray(items)) {
      const filtered = items.filter(
        (item) =>
          item.title.trim() !== '' || item.price.trim() !== ''
      );

      dispatch(changeEstimatorValue({ value: filtered, type: 'interiorIndividualItems' }));
    }

    trackFormEvents(`interiorIndividualItems`)

    return dispatch(changePaintEstimator((Math.ceil(step))))

  }

  if (step == 3) {

    trackFormEvents(`boolean_cabinet_paint`)

    if (type) {

      dispatch(changeEstimatorValue({ value: 'yes', type: 'cabinetPaint' }))
      return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    }

    if (!type) {

      dispatch(changeEstimatorValue({ value: 'no', type: 'cabinetPaint' }))
      return dispatch(changePaintEstimator((step + 1)))

    }

  }

  if (step == 3.1) {

    const doorsAndDrawersRequired = [
      'doorsAndDrawers',
    ]

    let notFilled = []

    doorsAndDrawersRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 3.1) {

    trackFormEvents(`how_many_cabinets`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 3.2) {

    trackFormEvents(`boolean_inside_cabinet`)

    if (type) {

      dispatch(changeEstimatorValue({ value: 'yes', type: 'insideCabinet' }))
      return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    }

    if (!type) {

      dispatch(changeEstimatorValue({ value: 'no', type: 'insideCabinet' }))
      return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    }

  }

  if (step == 3.3) {

    const cabinetConditionRequired = [
      'cabinetCondition',
    ]

    let notFilled = []

    cabinetConditionRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 3.3) {

    trackFormEvents(`cabinet_condition`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 3.4) {

    const cabinetDetailRequired = [
      'cabinetDetail',
    ]

    let notFilled = []

    cabinetDetailRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 3.4) {

    trackFormEvents(`cabinet_detail`)

    return dispatch(changePaintEstimator((Math.ceil(step))))

  }

  if (step == 4) {

    trackFormEvents(`boolean_exterior_paint`)

    if (type) {

      dispatch(changeEstimatorValue({ value: 'yes', type: 'exteriorPaint' }))
      return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    }

    if (!type) {

      dispatch(changeEstimatorValue({ value: 'no', type: 'exteriorPaint' }))

      return dispatch(changePaintEstimator((step + .5)))

    }

  }

  if (step == 4.1) {

    const exteriorSquareFeetRequired = [
      'exteriorSquareFeet',
    ]

    let notFilled = []

    exteriorSquareFeetRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 4.1) {

    trackFormEvents(`exterior_square_feet`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 4.2) {

    const interiorItemsRequired = [
      'exteriorItems',
    ]

    let notFilled = []

    interiorItemsRequired.map((item) => values[item].length == 0 ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 4.2) {

    trackFormEvents(`exterior_items`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 4.3) {

    const interiorConditionRequired = [
      'exteriorCondition',
    ]

    let notFilled = []

    interiorConditionRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 4.3) {

    trackFormEvents(`exterior_condition`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 4.4) {

    const interiorDetailRequired = [
      'exteriorDetail',
    ]

    let notFilled = []

    interiorDetailRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }

  if (step == 4.4) {

    trackFormEvents(`exterior_detail`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    // if(values.interiorPaint == 'yes'){

    //   return dispatch(changePaintEstimator((step + .1).toFixed(1)))

    // }

    // if(values.interiorPaint == 'no'){

    //   return dispatch(changePaintEstimator((step + .2).toFixed(1)))

    // }

  }

  if (step == 4.5) {

    const items = values['exteriorIndividualItems'];

    if (Array.isArray(items)) {
      const filtered = items.filter(
        (item) =>
          item.title.trim() !== '' || item.price.trim() !== ''
      );

      dispatch(changeEstimatorValue({ value: filtered, type: 'exteriorIndividualItems' }));
    }

    trackFormEvents(`exteriorIndividualItems`)

    return dispatch(changePaintEstimator((step + .1).toFixed(1)))

  }

  if (step == 4.6) {

    const paintBrandRequired = [
      'paintBrand',
    ]

    let notFilled = []

    paintBrandRequired.map((item) => !values[item] ? notFilled.push(item) : null)

    if (notFilled.length > 0) return setRequired(notFilled)

  }


  if (step == 4.6) {

    trackFormEvents(`paint_brand`)

    localStorage.removeItem('signupDismissed');

    if (navigation.value && navigation.value.popup !== 'emailType') {
      dispatch(changePopup('emailType'))
      dispatch(changeEdit(''))
      window.scrollTo({ top: 0, behavior: 'smooth' })
      previewEstimate()
    }

    if (navigation.value && navigation.value.popup == 'emailType') {

      window.scrollTo({ top: 0, behavior: 'smooth' })

    }

  }

  // if(step == 2.1){

  //   const interiorConditionRequired = [
  //     'interiorCondition',
  //   ]

  //   let notFilled = []

  //   interiorConditionRequired.map((item) => !values[item] ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 2.1){

  //   trackFormEvents(`quick_estimate_interior_condition`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 2.2){

  //   const interiorDetailRequired = [
  //     'interiorDetail',
  //   ]

  //   let notFilled = []

  //   interiorDetailRequired.map((item) => !values[item] ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 2.2){

  //   trackFormEvents(`quick_estimate_interior_detail`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 2.3){

  //   const interiorItemsRequired = [
  //     'interiorItems',
  //   ]

  //   let notFilled = []

  //   interiorItemsRequired.map((item) => values[item].length == 0 ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 2.3){

  //   trackFormEvents(`quick_estimate_interior_items`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 2.4){

  //   trackFormEvents(`quick_estimate_interior_individual_items`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 2.5){

  //   trackFormEvents(`quick_estimate_cabinets`)

  //   dispatch(changePaintEstimator(3))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == 3).title, type: 'title' }))

  // }

  // if(step == 3){
  //   const exteriorSquareFeetRequired = [
  //     'exteriorSquareFeet',
  //   ]

  //   let notFilled = []

  //   exteriorSquareFeetRequired.map((item) => !values[item] ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 3){

  //   trackFormEvents(`quick_estimate_exterior_sqft`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))
  // }

  // if(step == 3.1){

  //   const exteriorConditionRequired = [
  //     'exteriorCondition',
  //   ]

  //   let notFilled = []

  //   exteriorConditionRequired.map((item) => !values[item] ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 3.1){

  //   trackFormEvents(`quick_estimate_exterior_condition`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 3.2){

  //   const exteriorDetailRequired = [
  //     'exteriorDetail',
  //   ]

  //   let notFilled = []

  //   exteriorDetailRequired.map((item) => !values[item] ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 3.2){

  //   trackFormEvents(`quick_estimate_exterior_detail`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 3.3){

  //   const interiorItemsRequired = [
  //     'exteriorItems',
  //   ]

  //   let notFilled = []

  //   interiorItemsRequired.map((item) => values[item].length == 0 ? notFilled.push(item) : null )

  //   if(notFilled.length > 0) return setRequired(notFilled)

  // }

  // if(step == 3.3){

  //   trackFormEvents(`quick_estimate_exterior_items`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 3.4){

  //   trackFormEvents(`quick_estimate_exterior_individual_items`)

  //   dispatch(changePaintEstimator((step + .1).toFixed(1)))
  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  //   // dispatch(changePaintEstimator(4))
  //   // return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == 4).title, type: 'title' }))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == (step + .1).toFixed(1)).title, type: 'title' }))

  // }

  // if(step == 3.5){

  //   trackFormEvents(`quick_estimate_terms`)

  //   window.scrollTo({ top: 0, behavior: 'smooth' })
  //   dispatch(changePaintEstimator(4))
  //   return dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == 4).title, type: 'title' }))

  // }

  // if(step == 4){

  //   const summaryRequired = [
  //     'clientPropertyAddress',
  //     'interiorSquareFeet',
  //     'exteriorSquareFeet',
  //     'paintBrand'
  //   ];

  //   let notFilled = [];

  //   // Check base required fields
  //   summaryRequired.map((item) => {
  //     if (!values[item]) {
  //       notFilled.push(item);
  //     }
  //   });

  //   // Conditional checks for interiorSquareFeet
  //   if (values['interiorSquareFeet']) {
  //     if (!values['interiorCondition']) notFilled.push('interiorCondition');
  //     if (!values['interiorDetail']) notFilled.push('interiorDetail');
  //     if (values['interiorItems'].length == 0) notFilled.push('interiorItems');
  //   }

  //   // Conditional checks for exteriorSquareFeet
  //   if (values['exteriorSquareFeet']) {
  //     if (!values['exteriorCondition']) notFilled.push('exteriorCondition');
  //     if (!values['exteriorDetail']) notFilled.push('exteriorDetail');
  //     if (values['exteriorItems'].length == 0) notFilled.push('exteriorItems');
  //   }

  //   // Conditional checks for cabinets
  //   if (values['doorsAndDrawers']) {
  //     if (!values['cabinetCondition']) notFilled.push('cabinetCondition')
  //     // if (!values['insideCabinet']) notFilled.push('insideCabinet')
  //     if (!values['cabinetDetail']) notFilled.push('cabinetDetail')
  //   }

  //   if (notFilled.length > 0) return setRequired(notFilled);

  // }

  // if (step === 4) {
  //   const notFilled = [];

  //   // Always required
  //   if (!values['clientPropertyAddress']) notFilled.push('clientPropertyAddress');
  //   if (!values['paintBrand']) notFilled.push('paintBrand');

  //   // Check if user has filled out each type
  //   const hasInterior =
  //     values['interiorSquareFeet'] &&
  //     Array.isArray(values['interiorItems']) &&
  //     values['interiorItems'].length > 0;

  //   const hasExterior =
  //     values['exteriorSquareFeet'] &&
  //     Array.isArray(values['exteriorItems']) &&
  //     values['exteriorItems'].length > 0;

  //   const hasCabinets = values['doorsAndDrawers'];

  //   // If none are present, block
  //   if (!hasInterior && !hasExterior && !hasCabinets) {
  //     // Interior fields
  //     if (!values['interiorSquareFeet']) notFilled.push('interiorSquareFeet');
  //     if (!values['interiorItems'] || values['interiorItems'].length === 0)
  //       notFilled.push('interiorItems');

  //     // Exterior fields
  //     if (!values['exteriorSquareFeet']) notFilled.push('exteriorSquareFeet');
  //     if (!values['exteriorItems'] || values['exteriorItems'].length === 0)
  //       notFilled.push('exteriorItems');

  //     // Cabinets (at least number must be set)
  //     if (!values['doorsAndDrawers']) notFilled.push('doorsAndDrawers');
  //   }

  //   // Interior validation if present
  //   if (hasInterior) {
  //     if (!values['interiorCondition']) notFilled.push('interiorCondition');
  //     if (!values['interiorDetail']) notFilled.push('interiorDetail');
  //   }

  //   // Exterior validation if present
  //   if (hasExterior) {
  //     if (!values['exteriorCondition']) notFilled.push('exteriorCondition');
  //     if (!values['exteriorDetail']) notFilled.push('exteriorDetail');
  //   }

  //   // Cabinet validation if present
  //   if (hasCabinets) {
  //     if (!values['cabinetCondition']) notFilled.push('cabinetCondition');
  //     if (!values['cabinetDetail']) notFilled.push('cabinetDetail');
  //     // Optionally validate insideCabinet
  //     // if (!values['insideCabinet']) notFilled.push('insideCabinet');
  //   }

  //   if (notFilled.length > 0) {
  //     return setRequired(notFilled);
  //   }

  //   localStorage.removeItem('signupDismissed');
  // }

  // if(step == 4){

  //   if(navigation.value && navigation.value.popup !== 'emailType'){
  //     dispatch(changePopup('emailType'))
  //     dispatch(changeEdit(''))
  //     window.scrollTo({ top: 0, behavior: 'smooth' })
  //     previewEstimate()
  //   }

  //   if(navigation.value && navigation.value.popup == 'emailType'){

  //     trackFormEvents(`quick_estimate_summary`)

  //     window.scrollTo({ top: 0, behavior: 'smooth' })

  //   }

  // }

  // if(step !== 5){

  //   dispatch(changePaintEstimator(step + 1)),
  //   dispatch(changeEstimatorValue({ value: paintEstimateSteps.find((item) => +item.step == step + 1).title, type: 'title' }))
  //   window.scrollTo({ top: 0, behavior: 'smooth' })

  // }

}

export const totalEstimate = (estimate) => {

  if (!+estimate.interiorEstimate && !+estimate.cabinetEstimate && !+estimate.exteriorEstimate) return '0'

  let total = 0

  total = +estimate.interiorEstimate + +estimate.cabinetEstimate + +estimate.exteriorEstimate

  return total.toFixed(2)

}

export const totalEstimateAdjustedNewEstimate = (estimate) => {

  let total = 0

  total = +estimate.interiorAdjusted.replace('$', '') + +estimate.cabinetAdjusted.replace('$', '') + +estimate.exteriorAdjusted.replace('$', '')

  return total.toFixed(2)

}
