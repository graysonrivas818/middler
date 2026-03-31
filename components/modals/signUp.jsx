"use client";
import { useMutation } from "@apollo/client";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Image from "next/image";

import SAVE_ESTIMATE from "@/app/_mutations/saveEstimate";
import InputFieldText2 from "../form/InputFieldText2";

const SignUp = ({
  dispatch,
  changeUserValue,
  resetUser,
  user,
  changePopup,
  changePopupType,
  navigation,
  estimator,
  validateEmail,
  login,
  paintEstimateFieldsRequired,
  changePaintEstimator,
  changeEstimatorValue,
  paintEstimateSteps,
  setRequired,
  previewEstimate,
  trackFormEvents,
  changeEdit,
  setIsConfirmOpen,
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [loading, setLoading] = useState("");
  const [loadingColor, setLoadingColor] = useState("white");
  const [cookies, setCookie, removeCookie] = useCookies([
    "email",
    "token",
    "user",
    "pending_businessLogo",
    "estimateID",
  ]);

  const [
    saveEstimate,
    { dataSaveEstimate, loadingSaveEstimate, errorSaveEstimate },
  ] = useMutation(SAVE_ESTIMATE);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const submitSaveEstimate = async () => {
    setMessage("");

    if (!estimator.value.businessEmail)
      return setMessage("Your email address is required");
    setLoading("sendEstimate");

    try {
      // const response = await saveEstimate({
      //   variables: {
      //     email: estimator.value.businessEmail.toLowerCase(),
      //     estimateID: cookies.estimateID,
      //   },
      // });

      const response = await saveEstimate({
        variables: {
          email: estimator.value.businessEmail.toLowerCase(),
          estimateID: cookies.estimateID,
          estimate: {
            adjustment: estimator.value.adjustment,
            businessLogo: estimator.value.businessLogo,
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
              estimator.value.insideCabinet === "yes"
                ? true
                : !!estimator.value.insideCabinet,
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
            notesAndDisclosure: estimator.value.notesAndDisclosure,
            userType: estimator.value.userType,
          },
        },
      });

      setLoading("");
      localStorage.setItem("signupDismissed", "true");
      router.replace(`${window.location.pathname}?success=2`);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "estimate_success",
        step: 2,
      });
      dispatch(changePopup(""));
      setMessage(response.data.saveEstimate.message);
    } catch (error) {
      console.log(error);
      setLoading("");

      if (
        error?.graphQLErrors &&
        error.graphQLErrors[0]?.extensions?.code === "ACCOUNT_EXISTS"
      ) {
        localStorage.setItem("signupDismissed", "true");
        router.replace(`${window.location.pathname}?success=2`);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "estimate_signup_success",
          step: 2,
        });
        dispatch(changePopup(""));
      } else {
        setMessage(error.message || "Something went wrong.");
      }
    }
  };

  return (
    <AnimatePresence>
     
    </AnimatePresence>
  );
};

export default SignUp;

