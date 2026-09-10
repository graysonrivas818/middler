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

const ROLE_OPTIONS = [
  {
    label: "Homeowner",
    description: "Looking for\npainting services?",
    image: "/images/modals/homeowner.jpeg",
    value: "homeowner",
  },
  {
    label: "Pro",
    description: "Painter, contractor, handyman , etc",
    image: "/images/modals/pro.jpeg",
    value: "pro",
  },
];

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
  const [loading, setLoading] = useState("");
  const [flowStep, setFlowStep] = useState("calculating");
  const [selectedUserType, setSelectedUserType] = useState("");
  const [stage, setStage] = useState(0);
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

  const steps = [
    "🔍 Gathering room size & details…",
    "📈 Analyzing market rates & trends…",
    "🛠️ Computing labor & material cost…",
    "✅ Finalizing transparent pricing…",
  ];

  useEffect(() => {
    dispatch(changePopupType(""));
    setFlowStep("calculating");
    setSelectedUserType("");
    setMessage("");
    setStage(0);

    flowTimerRef.current = setTimeout(() => {
      dispatch(changePopupType("email"));
      setFlowStep("role");
      flowTimerRef.current = null;
    }, 4500);

    return () => {
      if (flowTimerRef.current) clearTimeout(flowTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (flowStep !== "calculating") return;
    const id = setInterval(() => {
      setStage((s) => {
        if (s >= steps.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [flowStep, steps.length]);

  const submitSendEstimate = async (userType) => {
    if (isSubmitting || !userType) return;

    setMessage("");
    setLoading("sendEstimate");
    setSelectedUserType(userType);

    try {
      dispatch(
        changeEstimatorValue({
          value: userType,
          type: "userType",
        })
      );

      const clientEmail = (estimator.value.clientEmail || "").trim();
      const clientPhone = (estimator.value.clientPhone || "").trim();
      const phoneDigits = clientPhone.replace(/\D/g, "");

      if (!clientEmail || !validateEmail(clientEmail)) {
        setLoading("");
        setMessage("Please enter a valid email address.");
        return;
      }

      if (phoneDigits.length > 0 && phoneDigits.length < 10) {
        setLoading("");
        setMessage("Please enter a valid phone number (at least 10 digits).");
        return;
      }

      const sanitizeObjectArray = (value) =>
        Array.isArray(value)
          ? value.map((item) => {
              if (!item || typeof item !== "object") return item;
              const { __typename, ...rest } = item;
              return rest;
            })
          : [];

      const normalizedEstimate = {
        ...estimator.value,
        userType,
        clientEmail,
        clientPhone,
        interiorItems: sanitizeObjectArray(estimator.value.interiorItems),
        interiorIndividualItems: sanitizeObjectArray(
          estimator.value.interiorIndividualItems
        ),
        exteriorItems: sanitizeObjectArray(estimator.value.exteriorItems),
        exteriorIndividualItems: sanitizeObjectArray(
          estimator.value.exteriorIndividualItems
        ),
        paintBrand:
          typeof estimator.value.paintBrand === "string"
            ? estimator.value.paintBrand
            : "",
        paintQuality:
          typeof estimator.value.paintQuality === "string"
            ? estimator.value.paintQuality
            : "",
      };

      const normalizedInsideCabinet =
        normalizedEstimate.insideCabinet === true ||
        normalizedEstimate.insideCabinet === "yes";

      const response = await quickEstimate({
        variables: {
          estimate: {
            adjustment: normalizedEstimate.adjustment,
            businessName: normalizedEstimate.businessName,
            businessLogo: normalizedEstimate.businessLogo,
            estimatorName: normalizedEstimate.estimatorName,
            businessAddress: normalizedEstimate.businessAddress,
            businessPhone: normalizedEstimate.businessPhone,
            businessEmail: normalizedEstimate.businessEmail,
            businessWebsite: normalizedEstimate.businessWebsite,
            businessLicenseNumber: normalizedEstimate.businessLicenseNumber,
            businessInstagram: normalizedEstimate.businessInstagram,
            clientName: normalizedEstimate.clientName,
            clientPhone: normalizedEstimate.clientPhone,
            clientPropertyAddress: normalizedEstimate.clientPropertyAddress,
            clientEmail: normalizedEstimate.clientEmail,
            clientZipCode: normalizedEstimate.clientZipCode,
            interiorSquareFeet: normalizedEstimate.interiorSquareFeet,
            interiorCondition: normalizedEstimate.interiorCondition,
            interiorDetail: normalizedEstimate.interiorDetail,
            interiorItems: normalizedEstimate.interiorItems,
            interiorIndividualItems: normalizedEstimate.interiorIndividualItems,
            interiorAdjusted: normalizedEstimate.interiorAdjusted,
            doorsAndDrawers: normalizedEstimate.doorsAndDrawers,
            insideCabinet: normalizedInsideCabinet,
            cabinetCondition: normalizedEstimate.cabinetCondition,
            cabinetDetail: normalizedEstimate.cabinetDetail,
            cabinetAdjusted: normalizedEstimate.cabinetAdjusted,
            exteriorSquareFeet: normalizedEstimate.exteriorSquareFeet,
            exteriorCondition: normalizedEstimate.exteriorCondition,
            exteriorDetail: normalizedEstimate.exteriorDetail,
            exteriorItems: normalizedEstimate.exteriorItems,
            exteriorIndividualItems: normalizedEstimate.exteriorIndividualItems,
            exteriorAdjusted: normalizedEstimate.exteriorAdjusted,
            painters: normalizedEstimate.painters,
            hoursPerDay: normalizedEstimate.hoursPerDay,
            days: normalizedEstimate.days,
            paintBrand: normalizedEstimate.paintBrand,
            paintQuality: normalizedEstimate.paintQuality,
            warranty: normalizedEstimate.warranty,
            payments: normalizedEstimate.payments,
            deposit: normalizedEstimate.deposit,
            depositType: normalizedEstimate.depositType,
            painterTapeRolls: normalizedEstimate.painterTapeRolls,
            plasticRolls: normalizedEstimate.plasticRolls,
            dropCloths: normalizedEstimate.dropCloths,
            userType: userType,
          },
        },
      });

      const quickEstimateResult = response?.data?.quickEstimateClient;
      if (!quickEstimateResult?.id) {
        setLoading("");
        setMessage(
          quickEstimateResult?.message || "Unable to generate estimate right now."
        );
        return;
      }

      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + 365 * 24 * 60 * 60 * 1000
      );

      setCookie("estimateID", quickEstimateResult.id, {
        expires: expirationDate,
        path: "/",
        sameSite: "lax",
      });

      setLoading("");
      setMessage(quickEstimateResult.message);

      localStorage.setItem("giftCardDismissed", "true");
      sessionStorage.setItem("openSignupAfterSuccess", "1");

      router.replace(`${window.location.pathname}?success=1`);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "estimate_success",
        step: 1,
        userType: userType,
        estimateID: quickEstimateResult.id || null,
      });

      dispatch(changePopup(""));
    } catch (error) {
      console.log(error);
      setLoading("");
      const gqlMessage = error?.graphQLErrors?.[0]?.message;
      const networkGqlMessage =
        error?.networkError?.result?.errors?.[0]?.message ||
        error?.networkError?.result?.message;
      setMessage(
        gqlMessage ||
          networkGqlMessage ||
          error?.message ||
          "Failed to submit estimate."
      );
    }
  };

  const handleSelectRole = (userType) => {
    if (isSubmitting) return;
    setSelectedUserType(userType);
    setMessage("");
    dispatch(
      changeEstimatorValue({
        value: userType,
        type: "userType",
      })
    );
    dispatch(changePopupType("email"));
    setFlowStep("email");
  };

  const showCalculating = flowStep === "calculating";
  const showRole = flowStep === "role";
  const showEmail = flowStep === "email";

  return (
    <AnimatePresence>
      {showCalculating && (
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
            <h2 className="text-center font-bold text-[22px] lg:text-[34px] leading-[1.2] text-primary">
              One last Step
            </h2>

            <h3 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.2]">
              Calculating&nbsp;Your Custom&nbsp;Prices
            </h3>

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

      {!showCalculating && (showRole || showEmail) && (
        <motion.div
          key="role-modal"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => {
            if (isSubmitting) return;
            dispatch(changePopup(""));
          }}
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
            className={
              showEmail
                ? "w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[768px] rounded-xl bg-gradient-to-b from-[#EAF5FF] to-[#FAFAFA] text-black px-6 sm:px-10 py-6 sm:py-8 lg:py-12 shadow-lg flex flex-col items-center gap-4 sm:gap-6 lg:gap-7 relative"
                : "w-[90%] max-w-[650px] rounded-xl bg-gradient-to-b from-[#EAF5FF] to-[#FAFAFA] text-primary px-6 sm:px-8 lg:px-10 py-8 lg:py-12 shadow-lg space-y-6 lg:space-y-7 relative"
            }
          >
            <button
              type="button"
              onClick={() => {
                if (isSubmitting) return;
                dispatch(changePopup(""));
              }}
              className="absolute right-4 top-4 text-[#043DD7] text-xl font-bold cursor-pointer z-10"
              aria-label="Close"
            >
              ×
            </button>

            {showRole ? (
              <>
                <h2 className="text-center text-[#043DD7] font-bold text-[22px] sm:text-[26px] lg:text-[40px] leading-[1.2]">
                  Please tell us who you are?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6 w-full">
                  {ROLE_OPTIONS.map((item) => {
                    const isSelected = selectedUserType === item.value;
                    return (
                      <button
                        type="button"
                        key={item.value}
                        disabled={isSubmitting}
                        aria-pressed={isSelected}
                        className={`group relative w-full h-[340px] lg:h-[320px] rounded-2xl overflow-hidden border-2 shadow-[0_12px_32px_rgba(4,61,215,0.2)] transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${
                          isSelected
                            ? "border-[#043DD7] ring-4 ring-[#043DD7]/30"
                            : "border-white/70"
                        }`}
                        onClick={() => handleSelectRole(item.value)}
                      >
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          className="object-cover pointer-events-none"
                          sizes="(max-width: 768px) 90vw, 320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A173A]/85 via-[#0A173A]/25 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 text-white text-center pointer-events-none">
                          <h3 className="text-[32px] lg:text-[38px] font-bold leading-none">
                            {item.label}
                          </h3>
                          <p className="mt-2 text-sm lg:text-lg whitespace-pre-line leading-snug text-white/95">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (isSubmitting) return;
                    setFlowStep("role");
                    setMessage("");
                  }}
                  className="self-start text-[#043DD7] font-bold"
                >
                  ← Back
                </button>

                <Image
                  src="/images/fav.webp"
                  alt="Favicon"
                  width={40}
                  height={40}
                  className="max-w-20 lg:max-w-24"
                />

                <h2 className="text-center font-bold text-[22px] lg:text-[24px] leading-[1.3] text-black">
                  Save your estimate
                </h2>
                <p className="text-black text-[22px] lg:text-2xl text-center">
                  Enter your email address to save this estimate.
                </p>

                <div className="w-full overflow-hidden flex flex-col items-center gap-6 lg:gap-7">
                  <div className="relative w-full p-2">
                    <input
                      id="clientEmail"
                      type="email"
                      placeholder="Enter your email address"
                      value={estimator.value.clientEmail || ""}
                      onChange={(e) =>
                        dispatch(
                          changeEstimatorValue({
                            value: e.target.value,
                            type: "clientEmail",
                          })
                        )
                      }
                      className="w-full bg-white px-5 py-5 text-black rounded-full outline-none border border-primary focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_0_10px] shadow-primary/20"
                    />
                  </div>

                  <div className="relative w-full p-2">
                    <input
                      id="clientPhone"
                      type="tel"
                      placeholder="Enter your phone number (optional)"
                      value={estimator.value.clientPhone || ""}
                      onChange={(e) =>
                        dispatch(
                          changeEstimatorValue({
                            value: e.target.value,
                            type: "clientPhone",
                          })
                        )
                      }
                      className="w-full bg-white px-5 py-5 text-black rounded-full outline-none border border-primary focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_0_10px] shadow-primary/20"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        !isSubmitting &&
                        selectedUserType &&
                        submitSendEstimate(selectedUserType)
                      }
                      className="bg-gradient-to-r from-primary to-[#6E7EFF] text-white uppercase rounded-xl py-3 px-4 min-w-[150px] cursor-pointer hover:to-primary transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Save Estimate
                    </button>
                  </div>
                </div>

                <p className="text-black text-[22px] lg:text-2xl text-center">
                  We have <span className="font-semibold">HUGE DISCOUNTS</span>{" "}
                  for everything in the painting world and we&apos;ll hook you up
                  with those as well!
                </p>
              </>
            )}

            {message && (
              <p className="text-center text-red-600 text-sm font-medium">
                {message}
              </p>
            )}

            {isSubmitting && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute z-[2] inset-0 size-full bg-black/10 backdrop-blur-xs rounded-xl"
              >
                <div className="flex items-center justify-center size-full">
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
