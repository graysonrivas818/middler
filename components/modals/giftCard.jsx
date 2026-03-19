"use client";
import { buyWhere, buyWhy } from "@/app/constants";
import { useMutation } from "@apollo/client";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import InputFieldText2 from "../form/InputFieldText2";
import InputFieldText3 from "../form/InputFieldText3";

//// MUTATIONS
import APPLY_GIFT_CARD from "@/app/_mutations/applyGiftCard";

const GiftCard = ({
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
  const [whereType, setWhereType] = useState("");
  const [whyType, setWhyType] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [priceOtherInput, setPriceOtherInput] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "email",
    "token",
    "user",
    "pending_businessLogo",
    "estimateID",
  ]);

  ///// MUTATIONS
  const [
    applyGiftCard,
    { dataApplyGiftCard, loadingApplyGiftCard, errorApplyGiftCard },
  ] = useMutation(APPLY_GIFT_CARD);

  useEffect(() => {
    // Disable body scroll when popup is active
    document.body.style.overflow = "hidden";

    // Re-enable on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const submitGiftCard = async () => {
    setMessage("");

    if (!estimator.value.where) return setMessage("Please select where");
    if (!estimator.value.why) return setMessage("Please select why");
    if (!estimator.value.businessEmail)
      return setMessage("Your email address is required");
    setLoading("sendGiftCard");

    try {
      const response = await applyGiftCard({
        variables: {
          email: estimator.value.businessEmail.toLowerCase(),
          estimateID: cookies.estimateID,
          where: estimator.value.where,
          why: estimator.value.why,
        },
      });

      setLoading("");
      localStorage.setItem("giftCardDismissed", "true");
      router.replace(`${window.location.pathname}?success=3`);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "estimate_giftcard_success",
        step: 3,
      });
      dispatch(changePopup(""));
      setMessage(response.data.applyGiftCard.message);
    } catch (error) {
      console.log(error);
      setLoading("");
      return setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="survey"
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
          className="w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[800px] rounded-xl bg-[#052F46] text-white px-10 py-8 shadow-lg flex flex-col items-center gap-6 lg:gap-5"
        >
          <p className="text-white text-[22px] lg:text-2xl text-center">
            Tell us where you like to buy your stuff and why to win a
          </p>

          <h2 className="text-center font-bold text-[26px] lg:text-[40px] leading-[1.3]">
            $500 Gift Card!
          </h2>

          <div className="grid grid-cols-2 gap-3 lg:gap-14">
            <div className="flex flex-col items-center gap-3 uppercase">
              <span className="text-white/80 font-semibold text-xl">WHERE</span>
              {buyWhere.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowOtherInput(false),
                      dispatch(
                        changeEstimatorValue({
                          value: item.type,
                          type: "where",
                        })
                      );
                  }}
                  className={
                    `rounded-lg min-w-[135px] w-full text-black p-2.5 border-2 border-white font-semibold transition-all duration-200 ease-in-out uppercase ` +
                    (estimator.value.where == item.type
                      ? "  bg-primary text-white "
                      : " hover:bg-primary hover:text-white bg-white")
                  }
                >
                  {item.title}
                </button>
              ))}
              {!showOtherInput ? (
                <button
                  onClick={() => (
                    setShowOtherInput(true),
                    dispatch(changeEstimatorValue({ value: "", type: "where" }))
                  )}
                  className={`rounded-lg min-w-[135px] w-full text-black p-2.5 border-2 border-white font-semibold transition-all duration-200 ease-in-out uppercase `}
                >
                  Other
                </button>
              ) : (
                <InputFieldText3
                  inputType={"text"}
                  value={estimator.value.where}
                  dispatch={() => {}}
                  changeValue={({ value }) =>
                    dispatch(
                      changeEstimatorValue({
                        value: value,
                        type: "where",
                      })
                    )
                  }
                  type={"where"}
                  placeholder="Please enter other"
                  dropdown={""}
                  setDropdown={setDropdown}
                  required={""}
                  id={"where"}
                  validation={false}
                  readOnly={false}
                  edit={true}
                  changeEdit={() => {}}
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-3 uppercase">
              <span className="text-white/80 font-semibold text-xl">WHERE</span>
              {buyWhy.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowOtherInput(false),
                      dispatch(
                        changeEstimatorValue({
                          value: item.type,
                          type: "why",
                        })
                      );
                  }}
                  className={
                    `rounded-lg min-w-[135px] w-full text-black p-2.5 border-2 border-white font-semibold transition-all duration-200 ease-in-out uppercase ` +
                    (estimator.value.why == item.type
                      ? "  bg-primary text-white "
                      : " hover:bg-primary hover:text-white bg-white")
                  }
                >
                  {item.title}
                </button>
              ))}
              {!priceOtherInput ? (
                <button
                  onClick={() => (
                    setPriceOtherInput(true),
                    dispatch(changeEstimatorValue({ value: "", type: "why" }))
                  )}
                  className={`rounded-lg min-w-[135px] w-full text-black p-2.5 border-2 border-white font-semibold transition-all duration-200 ease-in-out uppercase `}
                >
                  Other
                </button>
              ) : (
                <InputFieldText3
                  inputType={"text"}
                  value={estimator.value.why}
                  dispatch={() => {}}
                  changeValue={({ value }) =>
                    dispatch(
                      changeEstimatorValue({
                        value: value,
                        type: "why",
                      })
                    )
                  }
                  type={"why"}
                  placeholder="Please enter other"
                  dropdown={""}
                  setDropdown={setDropdown}
                  required={""}
                  id={"why"}
                  validation={false}
                  readOnly={false}
                  edit={true}
                  changeEdit={() => {}}
                />
              )}
            </div>
          </div>
          <p className="text-white text-xl lg:text-2xl text-center font-medium">
            Please enter the email where we could send your gift card
          </p>

          <div className="w-full overflow-hidden flex flex-col items-center gap-5">
            <InputFieldText2
              inputType={"text"}
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
              onClick={() => submitGiftCard()}
            >
              <button
                onClick={() => (href ? router.push(href) : null)}
                className="bg-primary text-white uppercase rounded-xl py-3 px-4 min-w-[150px] cursor-pointer hover:bg-primary-800 transition-all duration-300 ease-in-out"
              >
                send
              </button>
            </div>
          </div>
          <button
            onClick={() => (
              localStorage.setItem("giftCardDismissed", "true"),
              dispatch(changePopup(""))
            )}
            className="text-white/70 text-lg lg:text-xl leading-[22px] lg:leading-7 underline hover:text-white transition-all duration-200 ease-in-out"
          >
            No Thanks
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GiftCard;
