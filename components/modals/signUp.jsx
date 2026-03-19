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
      dispatch(changePopup("giftCard"));
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
        dispatch(changePopup("giftCard"));
      } else {
        setMessage(error.message || "Something went wrong.");
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="newsletter"
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-gradient-to-b from-[#EAF5FF] to-[#FAFAFA] text-black px-6 sm:px-10 py-6 sm:py-8 lg:py-12 shadow-lg flex flex-col items-center gap-4 sm:gap-6 lg:gap-7"
        >
          <Image
            src="/images/fav.webp"
            alt="Favicon"
            width={96}
            height={96}
            className="max-w-20 lg:max-w-24"
          />
          <h2 className="text-center font-bold text-[22px] lg:text-[24px] leading-[1.3] text-black">
            Enter your email to receive your estimate
            {/* &amp; we'll keep it sent to your email as well */}
            {/* Keep These Prices &amp; Get Details of This Project Sent To Your Email */}
          </h2>

          <div className="w-full overflow-hidden flex flex-col items-center gap-6 lg:gap-7">
            <InputFieldText2
              inputType={"text"}
              placeholder="Enter your email address"
              value={estimator.value.businessEmail}
              dispatch={dispatch}
              changeValue={changeEstimatorValue}
              type={"businessEmail"}
              dropdown=""
              setDropdown={setDropdown}
              id="businessEmail"
            />
            <div
              className="flex items-center justify-center"
              onClick={() => submitSaveEstimate()}
            >
              <button className="bg-gradient-to-r from-primary to-[#6E7EFF] text-white uppercase rounded-xl py-3 px-4 min-w-[150px] cursor-pointer hover:to-primary transition-all duration-300 ease-in-out">
                Get Estimate
              </button>
            </div>
          </div>
          <p className="text-black text-[22px] lg:text-2xl text-center">
            We have <span className="font-semibold">HUGE DISCOUNTS</span> for
            everything in the painting world and we’ll hook you up with those as
            well!
          </p>
          {message && (
            <div className="relative max-w-md mx-auto bg-blue-100 text-blue-700 border-blue-300 rounded-lg shadow-md text-sm text-center py-2 px-4 animate-fade-in">
              {message.substring(0, 200)}
              <div
                className="bg-black flex items-center justify-center h-[15px] w-[15px] rounded-full absolute top-0 right-0 hover:cursor-pointer"
                onClick={() => setMessage("")}
              ></div>
            </div>
          )}
          <a
            onClick={() => setIsConfirmOpen(true)}
            className="text-neutral-500 underline-offset-4 text-lg lg:text-xl leading-[22px] lg:leading-7 underline hover:text-primary transition-all duration-200 ease-in-out cursor-pointer"
          >
            No Thanks
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUp;
