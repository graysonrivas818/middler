"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useWindowSize } from "@react-hook/window-size";
import { AsYouType, getCountries } from "libphonenumber-js";
import { AnimatePresence, motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Script from 'next/script';

//// REDUCERS
import { login } from "../_redux/features/authSlice";
import {
  addObjectToArray,
  changeEstimatorValue,
  changeObjectValue,
} from "../_redux/features/estimatorSlice";
import {
  changeEdit,
  changePaintEstimator,
  changePopup,
  changePopupType,
} from "../_redux/features/navigationSlice";
import { changeUserValue, resetUser } from "../_redux/features/userSlice";

//// COMPONENTS
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import EmailType from "@/components/modals/emailType";
import GiftCard from "@/components/modals/giftCard";
import SignUp from "@/components/modals/signUp";
import Progress from "@/components/ui/Progress";

///// STEPS
import Preview from "@/components/layouts/preview";
import CabinetConditions from "@/components/paintEstimator/CabinetConditions";
import CabinetDetail from "@/components/paintEstimator/CabinetDetail";
import CabinetPaint from "@/components/paintEstimator/CabinetPaint";
import CabinetsPainting from "@/components/paintEstimator/CabinetsPainting";
import ExteriorCondition from "@/components/paintEstimator/ExteriorCondition";
import ExteriorDetail from "@/components/paintEstimator/ExteriorDetail";
import ExteriorIndividualItems from "@/components/paintEstimator/ExteriorIndividualItems";
import ExteriorItems from "@/components/paintEstimator/ExteriorItems";
import ExteriorPaint from "@/components/paintEstimator/ExteriorPaint";
import ExteriorSquareFeet from "@/components/paintEstimator/ExteriorSquareFeet";
import InsideCabinet from "@/components/paintEstimator/InsideCabinet";
import InteriorCondition from "@/components/paintEstimator/InteriorCondition";
import InteriorDetail from "@/components/paintEstimator/InteriorDetail";
import InteriorIndividualItems from "@/components/paintEstimator/InteriorIndividualItems";
import InteriorItems from "@/components/paintEstimator/InteriorItems";
import InteriorPaint from "@/components/paintEstimator/InteriorPaint";
import InteriorSquareFeet from "@/components/paintEstimator/InteriorSquareFeet";
import PaintBrand from "@/components/paintEstimator/PaintBrand";
import PropertyAddress from "@/components/paintEstimator/PropertyAddress";

///// LIBS
import { useAnalyticsEvent } from "@/helpers/analytics";
import { paintEstimateFieldsRequired } from "@/helpers/main_forms";
import { paintEstimateSteps } from "../constants";

//// MUTATIONS
import GET_CALCULATIONS from "../_mutations/getCalculations";

///// QUERIES
import GET_USER from "../_queries/fetchUser";

import Confirmation from "@/components/modals/Confirmation";
import GiftPopup from "@/components/modals/GiftPopup";
import { validateEmail, validateNumber, validatePrice } from "@/helpers/forms";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import StepSync from "./StepSync";



const allCountries = getCountries();

// Paint Estimator Product Schema
const paintEstimatorProductSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Free Paint Estimate Cost Calculator",
  "image": "https://middler.com/images/modals/3.webp",
  "description": "Free paint cost calculator to estimate interior & exterior house painting costs per square foot instantly. Get accurate painting estimates with our comprehensive tool.",
  "brand": {
    "@type": "Brand",
    "name": "Middler"
  }
};

const PaintEstimator = ({ }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const businessEmailRef = useRef();
  const termsRef = useRef(null);
  const previewRef = useRef(null);
  const { event } = useAnalyticsEvent();
  const [width, height] = useWindowSize();
  const [windowWidth, setWindowWidth] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [country, setCountry] = useState("US");
  const [countries, setCountries] = useState(allCountries);
  const [view, setView] = useState("");
  const [popup, setPopup] = useState("");
  const [popupType, setPopupType] = useState("");
  const [edit, setEdit] = useState("");
  const [requiredFields, setRequired] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [warning, setWarning] = useState("");
  const [showBottomButtons, setShowBottomButtons] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "user",
    "view",
    "address",
  ]);
  const navigation = useSelector((state) => state.navigationReducer);
  const estimator = useSelector((state) => state.estimatorReducer);
  const user = useSelector((state) => state.userReducer.value);

  //// MUTATIONS
  const [
    getCalculations,
    { dataGetCalculations, loadingGetCalculations, errorGetCalculations },
  ] = useMutation(GET_CALCULATIONS);

  //// QUERIES
  const dataUser = useQuery(GET_USER, {
    variables: {
      id: cookies.user ? cookies.user.id : "unknown",
      token: cookies.token ? cookies.token : "unknown",
    },
  });

  useEffect(() => {
    if (dataUser.error) {
      console.log("ERROR", dataUser.error);
    }

    if (dataUser.data && dataUser.data.user) {
      dispatch(
        changeUserValue({
          value: cookies.pending_businessLogo
            ? cookies.pending_businessLogo
            : dataUser.data.user.businessLogo,
          type: "businessLogo",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: cookies.pending_businessLogo
            ? cookies.pending_businessLogo
            : dataUser.data.user.businessLogo,
          type: "businessLogo",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessName,
          type: "businessName",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.estimatorName,
          type: "estimatorName",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessAddress,
          type: "businessAddress",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessLicenseNumber,
          type: "businessLicenseNumber",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessEmail,
          type: "businessEmail",
        })
      );
      dispatch(
        changeEstimatorValue({
          value: dataUser.data.user.businessPhone,
          type: "businessPhone",
        })
      );
    }
  }, [dataUser]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setWindowWidth(width);
  }, [width]);

  useEffect(() => {
    if (country && estimator.value.businessPhone.length > 0) {
      const asYouType = new AsYouType(country);
      asYouType.input(estimator.value.businessPhone);

      if (asYouType.getNumber()) {
        let number = asYouType.getNumber().nationalNumber; // Use national number only

        // Extract digits only
        number = number.replace(/\D/g, "");

        // Format the number to (XXX) XXX-XXXX
        const formattedNumber = number.replace(
          /^(\d{3})(\d{3})(\d{4})$/,
          "($1) $2-$3"
        );

        dispatch(
          changeEstimatorValue({
            value: formattedNumber,
            type: "businessPhone",
          })
        );
      }
    }
  }, [estimator.value.businessPhone]);

  useEffect(() => {
    if (country && estimator.value.clientPhone.length > 0) {
      const asYouType = new AsYouType(country);
      asYouType.input(estimator.value.clientPhone);

      if (asYouType.getNumber()) {
        let number = asYouType.getNumber().nationalNumber; // Use national number only

        // Extract digits only
        number = number.replace(/\D/g, "");

        // Format the number to (XXX) XXX-XXXX
        const formattedNumber = number.replace(
          /^(\d{3})(\d{3})(\d{4})$/,
          "($1) $2-$3"
        );

        dispatch(
          changeEstimatorValue({ value: formattedNumber, type: "clientPhone" })
        );
      }
    }
  }, [estimator.value.clientPhone]);

  useEffect(() => {
    setView(navigation.value.view);
    setPopup(navigation.value.popup);
    setPopupType(navigation.value.popupType);
    setEdit(navigation.value.edit);
  }, [navigation]);

  useEffect(() => {
    setRequired("");
  }, [estimator.value]);

  const previewEstimate = async () => {
    setLoading("getCalculations");

    try {
      const response = await getCalculations({
        variables: {
          estimate: {
            businessName: estimator.value.businessName,
            estimatorName: estimator.value.estimatorName,
            businessAddress: estimator.value.businessAddress,
            businessPhone: estimator.value.businessPhone,
            businessEmail: estimator.value.businessEmail,
            businessWebsite: estimator.value.businessWebsite,
            businessLicenseNumber: estimator.value.businessLicenseNumber,
            businessInstagram: estimator.value.businessInstagram,
            clientName: estimator.value.clientName,
            clientPhone: estimator.value.clientPhone,
            clientPropertyAddress: estimator.value.clientPropertyAddress,
            clientEmail: estimator.value.clientEmail,
            clientZipCode: estimator.value.clientZipCode,
            interiorSquareFeet: estimator.value.interiorSquareFeet,
            interiorCondition: estimator.value.interiorCondition,
            interiorDetail: estimator.value.interiorDetail,
            interiorItems: estimator.value.interiorItems,
            interiorIndividualItems: estimator.value.interiorIndividualItems,
            doorsAndDrawers: estimator.value.doorsAndDrawers,
            insideCabinet:
              estimator.value.insideCabinet == "yes" ? true : false,
            cabinetCondition: estimator.value.cabinetCondition,
            cabinetDetail: estimator.value.cabinetDetail,
            exteriorSquareFeet: estimator.value.exteriorSquareFeet,
            exteriorCondition: estimator.value.exteriorCondition,
            exteriorDetail: estimator.value.exteriorDetail,
            exteriorItems: estimator.value.exteriorItems,
            exteriorIndividualItems: estimator.value.exteriorIndividualItems,
            painters: estimator.value.painters,
            hoursPerDay: estimator.value.hoursPerDay,
            days: estimator.value.days,
            paintBrand: estimator.value.paintBrand,
            paintQuality: estimator.value.paintQuality,
            warranty: estimator.value.warranty,
            payments: estimator.value.payments,
            deposit: estimator.value.deposit,
            depositType: estimator.value.depositType,
            painterTapeRolls: estimator.value.painterTapeRolls,
            plasticRolls: estimator.value.plasticRolls,
            dropCloths: estimator.value.dropCloths,
          },
        },
      });

      if (response.data.getCalculations.estimate) {
        Object.keys(response.data.getCalculations.estimate).forEach((key) => {
          if (response.data.getCalculations.estimate[key]) {
            dispatch(
              changeEstimatorValue({
                value: response.data.getCalculations.estimate[key],
                type: key,
              })
            );
          }
        });
      }

      setLoading("");
      dispatch(changePaintEstimator(5));
    } catch (error) {
      console.log(error);
      setLoading("");
      if (error) setMessage(error.message);
    }
  };

  useEffect(() => {
    if (cookies.user && cookies.token) {
      dispatch(changeUserValue({ value: cookies.user.id, type: "id" }));
      dispatch(login());
    }
  }, [cookies]);

  const handlePlaceSelection = async (placeId) => {
    try {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const zipCodeComponent = place.address_components.find((component) =>
            component.types.includes("postal_code")
          );

          // Remove Country from Address
          let formattedAddress = place.formatted_address; // Full address
          let addressParts = formattedAddress.split(","); // Split by comma

          if (addressParts.length > 1) {
            addressParts.pop(); // Remove the last part (Country)
          }

          const updatedAddress = addressParts.join(", "); // Reassemble without the country

          // Update Estimator
          dispatch(
            changeEstimatorValue({
              value: updatedAddress,
              type: "clientPropertyAddress",
            })
          );
          dispatch(
            changeEstimatorValue({
              value: zipCodeComponent.long_name,
              type: "clientZipCode",
            })
          );
        }
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(() => {
    if (+navigation.value.paintEstimator == 1) {
      localStorage.removeItem("signupDismissed");
      localStorage.removeItem("giftCardDismissed");
    }

    const signupDismissed = localStorage.getItem("signupDismissed");

    if (
      !signupDismissed &&
      popup === "" &&
      +navigation.value.paintEstimator === 5
    ) {
      const timer = setTimeout(() => {
        dispatch(changePopup("signup"));
      }, 5000);

      return () => clearTimeout(timer);
    }

    const giftCardDismissed = localStorage.getItem("giftCardDismissed");

    if (
      signupDismissed &&
      !giftCardDismissed &&
      popup === "" &&
      +navigation.value.paintEstimator === 5
    ) {
      const timer = setTimeout(() => {
        dispatch(changePopup("giftCard"));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [popup, navigation.value.paintEstimator]);

  const trackFormEvents = (action, label, value) => {
    event({
      action: action,
      category: "estimate",
      label: label,
      value: value,
    });
  };

  useEffect(() => {
    if (cookies.address) {
      try {
        if (cookies.address.formattedAddress && cookies.address.zipCode) {
          dispatch(
            changeEstimatorValue({
              value: cookies.address.formattedAddress,
              type: "clientPropertyAddress",
            })
          );
          dispatch(
            changeEstimatorValue({
              value: cookies.address.zipCode,
              type: "clientZipCode",
            })
          );
          removeCookie("address");
        }
      } catch (err) {
        console.error("Invalid address cookie format", err);
      }
    }
  }, [cookies]);

  useEffect(() => {
    if (+navigation.value.paintEstimator == 4) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowBottomButtons(entry.isIntersecting);
        },
        {
          root: null,
          threshold: 0.1,
        }
      );

      const current = termsRef.current;
      if (current) observer.observe(current);

      return () => {
        if (current) observer.unobserve(current);
      };
    }
  }, [navigation.value.paintEstimator]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (+navigation.value.paintEstimator == 5) {
      setShowBottomButtons(true);
    }
  }, [+navigation.value.paintEstimator]);

  useEffect(() => {
    // console.log("NODE", process.env.NODE_ENV);
    // console.log("GRAPHQL", process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_ENDPOINT);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [lastModal, setLastModal] = useState("");
  const [blurPage, setBlurPage] = useState(false);

  const orderedSteps = [
    "1",
    "2",
    "2.1",
    "2.2",
    "2.3",
    "2.4",
    "2.5",
    "3",
    "3.1",
    "3.2",
    "3.3",
    "3.4",
    "4",
    "4.1",
    "4.2",
    "4.3",
    "4.4",
    "4.5",
    "4.6",
    "5",
  ];

  const goBack = () => {
    const current = String(navigation.value.paintEstimator);
    const idx = orderedSteps.indexOf(current);
    if (idx <= 0) return;
    const prev = orderedSteps[idx - 1];
    dispatch(changePaintEstimator(prev));
    const url = new URL(window.location.href);
    url.searchParams.set("step", prev);
    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    if (popup === "") {
      setBlurPage(lastModal === "emailType");
    } else {
      setBlurPage(false);
      setLastModal(popup);
    }
  }, [popup, lastModal]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <Script
        id="paint-estimator-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paintEstimatorProductSchema) }}
      />

      <main
        className={`min-h-dvh h-full overflow-hidden w-full p-5 lg:p-3 xl:p-6 xl:py-5 bg-cover bg-no-repeat bg-center bg-[url('/images/modals/bg_1.webp')]`}
      >
        <div className="grid size-full min-h-[calc(100dvh_-_40px)] lg:min-h-[calc(100dvh_-_32px)] xl:min-h-[calc(100dvh_-_40px)] lg:grid-rows-1 xl:grid-cols-[0.3fr_1fr_0.3fr] 3xl:grid-cols-[0.23fr_1fr_0.23fr] gap-5 lg:gap-8 3xl:gap-10">
          {navigation.value.paintEstimator != "5" && (
            <>
              <div className="max-lg:hidden mt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/images/modals/1.webp')] rounded-2xl" />
              <div
                className={`w-full flex items-center flex-col justify-between gap-5 2xl:gap-4`}
              >
                <Navbar />
                <Progress />

                <div className="lg:hidden">
                  <Image
                    src="/images/modals/team.webp"
                    alt="Team"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <div
                  className={`${navigation.value.paintEstimator == "2.2"
                    ? "px-0"
                    : "lg:px-5"
                    } w-full`}
                >
                  <div className="px-4 lg:px-11 xl:px-2 py-[30px] lg:py-6 flex flex-col items-center justify-center gap-[30px] bg-white shadow-[0_6px_46px] shadow-black/20 rounded-3xl lg:rounded-[31px] relative">
                    {/* <button
                      onClick={goBack}
                      disabled={String(navigation.value.paintEstimator) === orderedSteps[0]}
                      className="absolute top-1.5 left-1.5 lg:top-2 lg:left-2 rounded-full disabled:cursor-not-allowed not-disabled:cursor-pointer bg-neutral-100 border disabled:border-neutral-400 disabled:text-neutral-500 text-black border-neutral-500 p-1.5 max-lg:text-base lg:p-2.5 not-disabled:hover:bg-black not-disabled:hover:text-white transition-all duration-300 ease-in-out not-disabled:hover:shadow-[0_0_20px] shadow-black/30"
                    >
                      <FaArrowLeft />
                    </button> */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className={`lg:px-5 2xl:min-h-[190px] w-full flex flex-col items-center justify-center gap-[30px] lg:gap-4 bg-white shadow[0_6px_46px_rgba(0,0,0,0.2)] rounded-3xl lg:rounded-4xl qsnre`}
                      >
                        {navigation.value.paintEstimator == "1" && (
                          <PropertyAddress
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2" && (
                          <InteriorPaint
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.1" && (
                          <InteriorSquareFeet
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.2" && (
                          <InteriorItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.3" && (
                          <InteriorCondition
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.4" && (
                          <InteriorDetail
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "2.5" && (
                          <InteriorIndividualItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                            changeObjectValue={changeObjectValue}
                            addObjectToArray={addObjectToArray}
                          />
                        )}
                        {navigation.value.paintEstimator == "3" && (
                          <CabinetPaint
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.1" && (
                          <CabinetsPainting
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.2" && (
                          <InsideCabinet
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.3" && (
                          <CabinetConditions
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "3.4" && (
                          <CabinetDetail
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4" && (
                          <ExteriorPaint
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.1" && (
                          <ExteriorSquareFeet
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.2" && (
                          <ExteriorItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.3" && (
                          <ExteriorCondition
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.4" && (
                          <ExteriorDetail
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.5" && (
                          <ExteriorIndividualItems
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                            changeObjectValue={changeObjectValue}
                            addObjectToArray={addObjectToArray}
                          />
                        )}
                        {navigation.value.paintEstimator == "4.6" && (
                          <PaintBrand
                            estimator={estimator}
                            dispatch={dispatch}
                            changeEstimatorValue={changeEstimatorValue}
                            dropdown={dropdown}
                            setDropdown={setDropdown}
                            loading={loading}
                            setLoading={setLoading}
                            setCookie={setCookie}
                            warning={warning}
                            setWarning={setWarning}
                            navigation={navigation}
                            changePaintEstimator={changePaintEstimator}
                            changePopup={changePopup}
                            previewEstimate={previewEstimate}
                            trackFormEvents={trackFormEvents}
                            changeEdit={changeEdit}
                            paintEstimateSteps={paintEstimateSteps}
                            paintEstimateFieldsRequired={
                              paintEstimateFieldsRequired
                            }
                            requiredFields={requiredFields}
                            setRequired={setRequired}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div
                  className={`max-lg:hidden w-full h-auto max-h-[220px] 2xl:max-h-[280px] ${navigation.value.paintEstimator == "3.1" ||
                    navigation.value.paintEstimator == "3.2"
                    ? "3xl:max-h-[280px]"
                    : " 3xl:max-h-[310px]"
                    } rounded-2xl`}
                >
                  <Image
                    src="/images/modals/3.webp"
                    alt="Main modal"
                    width={800}
                    height={600}
                    className="w-full object-fill 2xl:object-cover object-top h-full rounded-2xl"
                  />
                </div>

                <div className="lg:hidden grid w-full grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Image
                      src="/images/modals/wmn_laugh.webp"
                      alt="Woman laughing"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <Image
                      src="/images/modals/car.webp"
                      alt="Car"
                      width={300}
                      height={200}
                      className="w-full h-auto"
                    />
                  </div>
                  <div>
                    <Image
                      src="/images/modals/five_star.webp"
                      alt="Five star"
                      width={300}
                      height={200}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="max-lg:hidden mt-[64px] bg-cover bg-center bg-no-repeat bg-[url('/images/modals/2.webp')] rounded-2xl" />
            </>
          )}
          {navigation.value.paintEstimator == "5" && (
            <Preview
              navigation={navigation}
              estimator={estimator.value}
              dispatch={dispatch}
              changeEstimatorValue={changeEstimatorValue}
              changePaintEstimator={changePaintEstimator}
              changeObjectValue={changeObjectValue}
              addObjectToArray={addObjectToArray}
              changeEdit={changeEdit}
              changePopup={changePopup}
              changePopupType={changePopupType}
              dropdown={dropdown}
              setDropdown={setDropdown}
              setCountry={setCountry}
              countries={countries}
              validateNumber={validateNumber}
              validatePrice={validatePrice}
              requiredFields={requiredFields}
              cookies={cookies}
              businessEmailRef={businessEmailRef}
              previewRef={previewRef}
            />
          )}
          

        </div>
        
        {/* Paint Estimator Content Section - Home Page Style */}
        <section className="relative pt-16 lg:py-20">
          <div className="container">
            <div className="row justify-center">
              <div className="lg:w-7/12 max-lg:px-8">
                <div className="flex flex-col items-center gap-2.5 lg:gap-4">
                  <div className="inline-flex items-center justify-center px-4 py-2 bg-primary/10 text-primary-800 text-sm font-medium rounded-full mb-4">
                    Paint Estimator Guide
                  </div>
                  <h1 className="font-bold text-[26px] lg:text-[50px] text-center">
                    <span className="text-primary-800">Paint Estimator Tool</span> – A Complete Guide for Accurate Painting Cost Planning
                  </h1>
                  <p className="text-base lg:text-2xl leading-6 lg:leading-snug text-center max-w-4xl">
                    Painting your home can feel confusing when you don't know how much it will cost or how much paint you need. A paint estimator tool makes this easy by helping you plan the whole project with clear numbers. It removes guesswork and helps you stay within your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Is a Paint Estimator Tool */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="row justify-center gap-y-10">
              <div className="lg:w-7/12 max-lg:px-8">
                <div className="flex flex-col items-center gap-2.5 lg:gap-4">
                  <h2 className="font-bold text-[22px] lg:text-[50px] text-center">
                    What Is a <span className="text-primary-800">Paint Estimator Tool</span>?
                  </h2>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col lg:gap-7 max-lg:*:px-5 py-10 lg:py-[60px] items-center text-center bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px] lg:*:px-[130px] lg:*:py-5 *:w-full">
                  <div className="pb-0!">
                    <p className="text-[11px] lg:text-[22px] leading-relaxed">
                      This tool helps you understand the amount of paint required for any wall, room, or full house. It uses measurements and simple formulas to give quick results. You can use it before starting any painting project to avoid mistakes.
                    </p>
                    <p className="text-[11px] lg:text-[22px] mt-3 lg:mt-5 leading-relaxed">
                      A paint estimator is built to handle painting calculations, which include wall size, number of coats, and paint type. It gives you a simple estimate so you can prepare without stress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Use a Painting Cost Calculator */}
        <section className="mb-20 overflow-hidden">
          <div className="container">
            <div className="row justify-center gap-y-10">
              <div className="lg:w-7/12 max-lg:px-8">
                <div className="flex flex-col items-center gap-2.5 lg:gap-4">
                  <h2 className="font-bold text-[22px] lg:text-[50px] text-center">
                    Why Use a <span className="text-primary-800">Painting Cost Calculator</span>?
                  </h2>
                </div>
              </div>
              <div className="w-full">
                <div className="grid w-full max-lg:grid-cols-1 max-lg:gap-y-6 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4 text-base lg:text-xl leading-relaxed">
                    <p>
                      A painting cost calculator helps you see the expected expenses before the work begins. It shows you the cost breakdown in an easy way. This helps you plan your painting budget wisely.
                    </p>
                    <p>
                      Using a painting cost calculator also helps avoid surprise expenses. It turns confusing numbers into clear, understandable results so you can make better decisions for your home.
                    </p>
                  </div>
                  <div className="bg-primary/10 p-6 lg:p-8 rounded-3xl">
                    <h3 className="text-lg lg:text-2xl font-semibold text-primary-800 mb-4">Benefits:</h3>
                    <ul className="space-y-3 text-sm lg:text-lg">
                      <li className="flex items-center gap-[7.5px]">
                        <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[18px] text-[8px] flex-shrink-0">
                          <FaCheck />
                        </span>
                        Clear budget planning
                      </li>
                      <li className="flex items-center gap-[7.5px]">
                        <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[18px] text-[8px] flex-shrink-0">
                          <FaCheck />
                        </span>
                        No surprise costs
                      </li>
                      <li className="flex items-center gap-[7.5px]">
                        <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[18px] text-[8px] flex-shrink-0">
                          <FaCheck />
                        </span>
                        Easy decision making
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exterior and Interior Painting Costs */}
        <section className="lg:py-20">
          <div className="container">
            <div className="row justify-center">
              <div className="w-full">
                <div className="flex flex-col lg:gap-7 max-lg:*:px-5 py-10 lg:py-[60px] items-center text-center bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px] lg:*:px-[130px] lg:*:py-5 *:w-full">
                  <div className="pb-0!">
                    <h2 className="font-bold text-[22px] lg:text-[50px] text-center mb-6">
                      <span className="text-primary-800">Exterior and Interior</span> Painting Costs
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 lg:pt-0!">
                    <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm">
                      <h3 className="text-lg lg:text-2xl font-semibold mb-4">Exterior Painting</h3>
                      <p className="text-[11px] lg:text-[18px] mb-4">
                        The cost to paint exterior of house depends on the size of your home, the material of the walls, and the weather conditions.
                      </p>
                      <div className="text-[10px] lg:text-[16px] text-left">
                        <p className="font-medium mb-2">Factors affecting cost:</p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[16px] text-[6px] lg:size-[18px] lg:text-[8px] flex-shrink-0">
                              <FaCheck />
                            </span>
                            Home size and stories
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[16px] text-[6px] lg:size-[18px] lg:text-[8px] flex-shrink-0">
                              <FaCheck />
                            </span>
                            Surface material
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[16px] text-[6px] lg:size-[18px] lg:text-[8px] flex-shrink-0">
                              <FaCheck />
                            </span>
                            Weather conditions
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm">
                      <h3 className="text-lg lg:text-2xl font-semibold mb-4">Interior Painting</h3>
                      <p className="text-[11px] lg:text-[18px] mb-4">
                        The cost to paint interior of house is based on room height, wall condition, and the number of coats you want.
                      </p>
                      <div className="text-[10px] lg:text-[16px] text-left">
                        <p className="font-medium mb-2">Factors affecting cost:</p>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[16px] text-[6px] lg:size-[18px] lg:text-[8px] flex-shrink-0">
                              <FaCheck />
                            </span>
                            Room height and size
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[16px] text-[6px] lg:size-[18px] lg:text-[8px] flex-shrink-0">
                              <FaCheck />
                            </span>
                            Wall condition
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[16px] text-[6px] lg:size-[18px] lg:text-[8px] flex-shrink-0">
                              <FaCheck />
                            </span>
                            Number of coats needed
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="lg:pt-0! mt-4">
                    <p className="text-[11px] lg:text-[22px]">
                      Painting inside and outside the house can have different price ranges. Many things can change the final cost. A paint estimator helps you compare these costs easily.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interior Paint Cost Breakdown */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="row justify-center gap-y-10">
              <div className="lg:w-7/12 max-lg:px-8">
                <div className="flex flex-col items-center gap-2.5 lg:gap-4">
                  <h2 className="font-bold text-[22px] lg:text-[50px] text-center">
                    <span className="text-primary-800">Interior Paint Cost</span> Breakdown Made Simple
                  </h2>
                  <p className="text-base lg:text-2xl leading-6 lg:leading-snug text-center">
                    Most homeowners want to know how much painting a room or full interior will cost. These tools help break down every small detail. This gives you a clear starting point for budgeting.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-primary/5 border-l-4 border-primary p-6 lg:p-8 rounded-3xl">
                  <h3 className="text-lg lg:text-2xl font-semibold text-primary-800 mb-4">Cost Components Include:</h3>
                  <p className="text-sm lg:text-xl">
                    An interior painting cost calculator helps you check paint amount, labor, and finishing cost. When understanding the cost to paint a room, the tool looks at room size, paint brand, and surface make. This helps you get a realistic interior painting cost before you hire anyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Square Foot Calculations */}
        <section className="mb-20 overflow-hidden">
          <div className="container">
            <div className="row justify-center gap-y-10">
              <div className="lg:w-7/12 max-lg:px-8">
                <div className="flex flex-col items-center gap-2.5 lg:gap-4">
                  <h2 className="font-bold text-[22px] lg:text-[50px] text-center">
                    <span className="text-primary-800">Square Foot Calculations</span> for Accurate Estimates
                  </h2>
                  <p className="text-base lg:text-2xl leading-6 lg:leading-snug text-center">
                    Square footage is one of the most important parts of painting costs. Accurate measurements help avoid buying too much or too little paint. A good estimator makes this part simple.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                  <div className="bg-white p-6 lg:p-8 rounded-3xl border shadow-sm">
                    <h3 className="text-lg lg:text-2xl font-semibold mb-4">Paint Calculator</h3>
                    <p className="text-sm lg:text-lg">
                      A paint calculator square feet option lets you add the wall size and quickly see how much paint you need.
                    </p>
                  </div>
                  <div className="bg-white p-6 lg:p-8 rounded-3xl border shadow-sm">
                    <h3 className="text-lg lg:text-2xl font-semibold mb-4">Estimate Calculator</h3>
                    <p className="text-sm lg:text-lg">
                      A painting estimate calculator then uses total area, paint type, and labor to give you an accurate final estimate.
                    </p>
                  </div>
                </div>
                <p className="text-base lg:text-xl text-center mt-6">
                  This helps you plan your full project confidently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full House Painting Costs */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="row justify-center gap-y-10">
              <div className="lg:w-7/12 max-lg:px-8">
                <div className="flex flex-col items-center gap-2.5 lg:gap-4">
                  <h2 className="font-bold text-[22px] lg:text-[50px] text-center">
                    <span className="text-primary-800">Full House</span> Painting Costs
                  </h2>
                  <p className="text-base lg:text-2xl leading-6 lg:leading-snug text-center">
                    People often worry about how much it will cost for the whole home. A paint estimator helps break it down room by room. This makes the planning easier for big projects.
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="bg-primary/10 p-6 lg:p-8 rounded-3xl">
                  <h3 className="text-lg lg:text-2xl font-semibold text-primary-800 mb-4 text-center">Cost Calculation Process:</h3>
                  <div className="space-y-3 text-sm lg:text-lg text-center">
                    <p>• The painting cost per square foot helps you see the cost based on surface area</p>
                    <p>• When calculating the cost of painting a house, the estimator checks all walls, ceilings, and trims</p>
                    <p>• This makes the cost to paint a house much clearer and easier to understand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Extra Home Improvement Ideas */}
        <section className="lg:py-20">
          <div className="container">
            <div className="row justify-center">
              <div className="w-full">
                <div className="flex flex-col lg:gap-7 max-lg:*:px-5 py-10 lg:py-[60px] items-center text-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl lg:rounded-[40px] lg:*:px-[130px] lg:*:py-5 *:w-full">
                  <div className="pb-0!">
                    <h2 className="font-bold text-[22px] lg:text-[50px] text-center mb-6">
                      <span className="text-primary-800">Extra Home Improvement</span> Ideas
                    </h2>
                    <p className="text-[11px] lg:text-[22px] mb-3 lg:mb-5">
                      After painting, many homeowners like to refresh their home décor. Simple additions can make your space feel new.
                    </p>
                    <p className="text-[11px] lg:text-[22px]">
                      One idea is adding decorative items to match your new colors. This is where premium gift baskets can add warmth to your freshly painted home. They also make great housewarming gifts after a renovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-16 lg:py-20">
          <div className="container">
            <div className="row justify-center">
              <div className="w-full max-w-4xl">
                <div className="flex flex-col items-center text-center gap-8 px-5 py-10 lg:py-[60px] bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px]">
                  <h2 className="font-bold text-[22px] lg:text-[50px]">
                    <span className="text-primary-800">Conclusion</span>
                  </h2>
                  <p className="text-[11px] lg:text-[22px] leading-relaxed max-w-3xl">
                    A paint calculator is one of the easiest tools for planning any painting job. It helps you estimate paint, labor, and total cost without confusion. With clear numbers, you can start your project with confidence and stay within budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <StepSync />
      </Suspense>
      <>
        {popup == "emailType" && (
          <EmailType
            dispatch={dispatch}
            changeUserValue={changeUserValue}
            resetUser={resetUser}
            user={user}
            changePopup={changePopup}
            changePopupType={changePopupType}
            navigation={navigation}
            estimator={estimator}
            validateEmail={validateEmail}
            login={login}
            paintEstimateFieldsRequired={paintEstimateFieldsRequired}
            changePaintEstimator={changePaintEstimator}
            changeEstimatorValue={changeEstimatorValue}
            paintEstimateSteps={paintEstimateSteps}
            setRequired={setRequired}
            previewEstimate={previewEstimate}
            trackFormEvents={trackFormEvents}
            changeEdit={changeEdit}
          />
        )}
        {popup == "signup" && (
          <SignUp
            dispatch={dispatch}
            changeUserValue={changeUserValue}
            resetUser={resetUser}
            user={user}
            changePopup={changePopup}
            changePopupType={changePopupType}
            navigation={navigation}
            estimator={estimator}
            validateEmail={validateEmail}
            login={login}
            paintEstimateFieldsRequired={paintEstimateFieldsRequired}
            changePaintEstimator={changePaintEstimator}
            changeEstimatorValue={changeEstimatorValue}
            paintEstimateSteps={paintEstimateSteps}
            setRequired={setRequired}
            previewEstimate={previewEstimate}
            trackFormEvents={trackFormEvents}
            changeEdit={changeEdit}
            setIsConfirmOpen={setIsConfirmOpen}
          />
        )}

        {isConfirmOpen && (
          <Confirmation
            isConfirmOpen={isConfirmOpen}
            setIsConfirmOpen={setIsConfirmOpen}
          />
        )}
        {popup == "giftCard" && (
          <GiftPopup
            dispatch={dispatch}
            changePopup={changePopup}
            showPopUp={true}
            isMainPage={false}
          />
        )}
      </>
    </>
  );
};

export default PaintEstimator;
