"use client";
import { useMutation } from "@apollo/client";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { BiLoaderCircle } from "react-icons/bi";
import Image from "next/image";

//// MUTATIONS
import QUICK_ESTIMATE from "../../app/_mutations/quickEstimateClient";
import InputFieldText from "../form/inputFieldText";

const EmailType = ({
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
}) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [dropdown, setDropdown] = useState("");
  const [loading, setLoading] = useState("");
  const [loadingColor, setLoadingColor] = useState("white");
  const [userType, setUserType] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [flowStep, setFlowStep] = useState("role");
  const [selectedUserType, setSelectedUserType] = useState("");
  const flowTimerRef = useRef(null);
  const isSubmitting = loading === "sendEstimate";
  const [cookies, setCookie, removeCookie] = useCookies([
    "email",
    "token",
    "user",
    "pending_businessLogo",
    "estimateID",
  ]);

  ///// MUTATIONS
  const [
    quickEstimate,
    { dataQuickEstimate, loadingQuickEstimate, errorQuickEstimate },
  ] = useMutation(QUICK_ESTIMATE);

  useEffect(() => {
    dispatch(changePopupType("email"));
    setFlowStep("role");
    setSelectedUserType("");
    setUserType("");
    setShowOtherInput(false);
    setMessage("");
    setStage(0);
  }, []);

  useEffect(() => {
    // Disable body scroll when popup is active
    document.body.style.overflow = "hidden";

    // Re-enable on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    return () => {
      if (flowTimerRef.current) clearTimeout(flowTimerRef.current);
    };
  }, []);

  const startEmailCaptureFlow = (nextUserType) => {
    if (isSubmitting) return;
    if (flowTimerRef.current) clearTimeout(flowTimerRef.current);

    setMessage("");
    setSelectedUserType(nextUserType);
    setFlowStep("calculating");
    setStage(0);
    dispatch(changePopupType(""));

    flowTimerRef.current = setTimeout(() => {
      dispatch(changePopupType("email"));
      setFlowStep("email");
      flowTimerRef.current = null;
    }, 4500);
  };

  const submitSendEstimate = async (userType) => {
    if (isSubmitting) return;

    setMessage("");
    setLoading("sendEstimate");

    try {
      const clientEmail = (estimator.value.clientEmail || "").trim();
      if (!validateEmail(clientEmail)) {
        setLoading("");
        setMessage("Client email is required.");
        return;
      }

      const response = await quickEstimate({
        variables: {
          estimate: {
            adjustment: estimator.value.adjustment,
            businessName: estimator.value.businessName,
            businessLogo: estimator.value.businessLogo,
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
            clientEmail: clientEmail,
            clientZipCode: estimator.value.clientZipCode,
            interiorSquareFeet: estimator.value.interiorSquareFeet,
            interiorCondition: estimator.value.interiorCondition,
            interiorDetail: estimator.value.interiorDetail,
            interiorItems: estimator.value.interiorItems,
            interiorIndividualItems: estimator.value.interiorIndividualItems,
            interiorAdjusted: estimator.value.interiorAdjusted,
            doorsAndDrawers: estimator.value.doorsAndDrawers,
            insideCabinet:
              estimator.value.insideCabinet === "yes"
                ? true
                : !!estimator.value.insideCabinet,
            cabinetCondition: estimator.value.cabinetCondition,
            cabinetDetail: estimator.value.cabinetDetail,
            cabinetAdjusted: estimator.value.cabinetAdjusted,
            exteriorSquareFeet: estimator.value.exteriorSquareFeet,
            exteriorCondition: estimator.value.exteriorCondition,
            exteriorDetail: estimator.value.exteriorDetail,
            exteriorItems: estimator.value.exteriorItems,
            exteriorIndividualItems: estimator.value.exteriorIndividualItems,
            exteriorAdjusted: estimator.value.exteriorAdjusted,
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
            userType: userType,
          },
        },
      });

      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + 365 * 24 * 60 * 60 * 1000
      );

      setCookie("estimateID", response.data.quickEstimateClient.id, {
        expires: expirationDate,
        path: "/",
        sameSite: "lax",
      });

      setLoading("");
      setMessage(response.data.quickEstimateClient.message);

      router.replace(`${window.location.pathname}?success=1`);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "estimate_success",
        step: 1,
        userType: userType,
        estimateID: response.data.quickEstimateClient.id || null,
      });

      dispatch(changePopup(""));
    } catch (error) {
      console.log(error);
      setLoading("");
      const gqlMessage = error?.graphQLErrors?.[0]?.message;
      setMessage(gqlMessage || error?.message || "Failed to submit estimate.");
    }
  };

  const [stage, setStage] = useState(0);
  const steps = [
    "🔍 Gathering room size & details…",
    "📈 Analyzing market rates & trends…",
    "🛠️ Computing labor & material cost…",
    "✅ Finalizing transparent pricing…",
  ];

  useEffect(() => {
    if (flowStep !== "calculating") return;
    const id = setInterval(() => {
      setStage((s) => {
        if (s === steps.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [flowStep, steps.length]);

  return (
    <AnimatePresence>
      {navigation.value.popupType == "" && (
        <motion.div
          key="loader"
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
            className="w-auto max-w-[360px] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-gradient-to-b from-[#EAF5FF] to-[#FAFAFA] text-black px-10 py-8 shadow-lg space-y-6 lg:space-y-7"
          >
            <h2 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.2]">
              Calculating&nbsp;Your Custom&nbsp;Prices
            </h2>

            <p className="text-center text-sm lg:text-xl text-black">
              Middler does&nbsp;
              <span className="text-red-400 font-semibold">NOT</span>
              &nbsp;adjust prices to benefit painters or homeowners.
            </p>

            <div className="h-3 lg:h-4 w-full bg-[#EAF5FF] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r bg-primary"
                animate={{ width: `${(stage / steps.length) * 100}%` }}
                transition={{ ease: "linear", duration: 0.3 }}
              />
            </div>

            <ul className="space-y-1 text-sm lg:text-base">
              {steps.map((txt, i) => (
                <li
                  key={i}
                  className={`flex items-center gap-1.5 ${
                    i < stage ? "text-black" : "text-neutral-500"
                  }`}
                >
                  {txt}
                </li>
              ))}

              {stage === steps.length && (
                <li className="text-[26px] lg:text-4xl text-center font-extrabold text-black mt-6 lg:mt-7">
                  🎉Your pricing breakdown is ready!
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
      {navigation.value.popupType == "email" && (
        <motion.div
          key="role-modal"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => !isSubmitting && dispatch(changePopup(""))}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-auto max-w-[360px] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-gradient-to-b from-[#EAF5FF] to-[#FAFAFA] text-primary px-10 py-8 lg:py-12 shadow-lg space-y-6 lg:space-y-7 relative"
          >
            <button
              type="button"
              onClick={() => !isSubmitting && dispatch(changePopup(""))}
              className="absolute right-4 top-4 text-[#043DD7] text-xl font-bold cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>

            {flowStep === "role" ? (
              <>
                <h2 className="text-center text-[#043DD7] font-bold text-[22px] sm:text-[26px] lg:text-[40px] leading-[1.2]">
                  Who Are You?
                </h2>

                <div className="grid grid-cols-2 sm:grid-rows-2 *:max-lg:h-24 gap-3 lg:gap-7">
                  {[
                    {
                      label: "Homeowner",
                      icon: "home.webp",
                      value: "homeowner",
                    },
                    {
                      label: "Painter",
                      icon: "painter.webp",
                      value: "painter",
                    },
                    {
                      label: "Handyman",
                      icon: "handyman.webp",
                      value: "handyman",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="w-full"
                      onClick={() => {
                        startEmailCaptureFlow(item.value);
                      }}
                    >
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="w-full py-5 px-8 lg:py-8 cursor-pointer bg-primary text-white gap-2 lg:gap-4 flex flex-col items-center rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Image
                          src={`/images/icons/${item.icon}`}
                          alt={item.label}
                          width={56}
                          height={56}
                          className="max-h-8 lg:max-h-14"
                        />
                        <span className="text-xs lg:text-xl tracking-wider font-bold uppercase">
                          {item.label}
                        </span>
                      </button>
                    </div>
                  ))}

                  {!showOtherInput ? (
                    <div
                      className="w-full"
                      onClick={() => !isSubmitting && setShowOtherInput(true)}
                    >
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="w-full py-5 px-8 lg:py-8 cursor-pointer bg-primary text-white gap-2 lg:gap-4 flex flex-col items-center rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Image
                          src="/images/icons/others.webp"
                          alt="Other"
                          width={56}
                          height={56}
                          className="max-h-8 lg:max-h-14"
                        />
                        <span className="text-xs lg:text-xl tracking-wider font-bold uppercase">
                          Other
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-between lg:justify-end w-full lg:gap-6">
                      <InputFieldText
                        inputType={"text"}
                        placeholder={"Your role"}
                        value={userType}
                        dispatch={() => {}}
                        changeValue={({ value }) => setUserType(value)}
                        type={"userType"}
                        dropdown={""}
                        setDropdown={setDropdown}
                        required={!userType}
                        id={"userType"}
                        validation={false}
                        readOnly={false}
                        edit={true}
                        changeEdit={() => {}}
                      />
                      <div
                        onClick={() => {
                          if (isSubmitting) return;
                          const trimmed = userType.trim();
                          if (!trimmed) {
                            setMessage("Role is required.");
                            return;
                          }
                          startEmailCaptureFlow(trimmed);
                        }}
                      >
                        <button
                          type="button"
                          disabled={isSubmitting}
                          className="w-full py-3 px-8 lg:py-6 cursor-pointer bg-primary hover:bg-primary-800 transition-all duration-300 text-white gap-2 lg:gap-4 flex flex-col items-center rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <span className="text-xs lg:text-lg font-bold uppercase">
                            Next
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      if (isSubmitting) return;
                      setFlowStep("role");
                      setMessage("");
                    }}
                    className="text-[#043DD7] font-bold"
                  >
                    ← Back
                  </button>
                  <div className="flex-1" />
                </div>

                <h2 className="text-center text-[#043DD7] font-bold text-[22px] sm:text-[26px] lg:text-[40px] leading-[1.2]">
                  Enter Your Email
                </h2>
                <h3 className="text-center text-[#1F2937] font-bold text-[14px] sm:text-[14px]">
                  We’ll save your estimate and send a copy
                </h3>

                <div className="w-full flex flex-col gap-4">
                  <InputFieldText
                    inputType={"email"}
                    placeholder={"Your email"}
                    value={estimator.value.clientEmail}
                    dispatch={dispatch}
                    changeValue={changeEstimatorValue}
                    type={"clientEmail"}
                    dropdown={""}
                    setDropdown={setDropdown}
                    required={!estimator.value.clientEmail}
                    id={"clientEmail"}
                    validation={false}
                    readOnly={false}
                    edit={true}
                    changeEdit={() => {}}
                  />

                  <div
                    onClick={() =>
                      !isSubmitting &&
                      selectedUserType &&
                      submitSendEstimate(selectedUserType)
                    }
                  >
                    <button
                      type="button"
                      disabled={isSubmitting}
                      className="w-full py-3 px-8 lg:py-6 cursor-pointer bg-primary hover:bg-primary-800 transition-all duration-300 text-white gap-2 lg:gap-4 flex flex-col items-center rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="text-xs lg:text-lg font-bold uppercase">
                        Submit
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {message && (
              <p className="text-center text-red-600 text-sm font-medium">
                {message}
              </p>
            )}

            <div className="h-3 lg:h-4 w-full bg-primary rounded-full overflow-hidden">
              <div className="h-full bg-primary" />
            </div>

            <h3 className="text-center text-[#043DD7] font-bold text-[22px] sm:text-[26px] leading-[1.2]">
              🎉Your Free Estimate is one step away!
            </h3>

            {loading == "sendEstimate" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute z-[2] inset-0 size-full bg-black/10 backdrop-blur-xs rounded-xl"
              >
                <div className={`flex items-center justify-center size-full`}>
                  <span className="text-7xl animate-spin text-black">
                    <BiLoaderCircle />
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailType;
