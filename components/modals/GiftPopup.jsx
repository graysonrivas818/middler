"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import Image from "next/image";

const GiftPopup = ({
  dispatch,
  changePopup,
  setShowPopUp,
  isMainPage,
  showPopUp,
}) => {
  const INITIAL_SECONDS = 9 * 60 + 20;
  const [openInput, setOpenInput] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const deadlineRef = useRef(null);

  const handleClose = () => {
    if (!isMainPage) {
      try {
        localStorage.setItem("giftCardDismissed", "true");
      } catch {}
      dispatch(changePopup(""));
    } else {
      setShowPopUp(false);
    }
  };

  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem("giftCounterDeadline");
    } catch {}
    let deadline = stored ? parseInt(stored, 10) : NaN;
    const now = Date.now();
    if (!deadline || Number.isNaN(deadline) || deadline <= now) {
      deadline = now + INITIAL_SECONDS * 1000;
      try {
        localStorage.setItem("giftCounterDeadline", String(deadline));
      } catch {}
    }
    deadlineRef.current = deadline;

    const tick = () => {
      const now = Date.now();
      const remaining = Math.max(
        0,
        Math.floor((deadlineRef.current - now) / 1000)
      );
      setSecondsLeft(remaining);
      if (remaining === 0) {
        const next = now + INITIAL_SECONDS * 1000;
        deadlineRef.current = next;
        setSecondsLeft(INITIAL_SECONDS);
        try {
          localStorage.setItem("giftCounterDeadline", String(next));
        } catch {}
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    const vis = () => tick();
    document.addEventListener("visibilitychange", vis);
    window.addEventListener("focus", vis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("focus", vis);
    };
  }, []);

  useEffect(() => {
    if (!showPopUp) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPopUp]);

  useEffect(() => {
    if (!showPopUp) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showPopUp]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const getGraphQLEndpoint = () => {
    if (typeof window === "undefined")
      return process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_ENDPOINT;
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    return isLocal
      ? process.env.NEXT_PUBLIC_GRAPHQL_DEVELOPMENT_ENDPOINT
      : process.env.NEXT_PUBLIC_GRAPHQL_PRODUCTION_ENDPOINT;
  };

  const SEND_THANK_YOU_MUTATION = `
    mutation SendThankYouEmail($email: String!) {
      sendThankYouEmail(email: $email) { message }
    }
  `;

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.*");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.*");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const query = `
    mutation {
      subscribeUser(email: "${email}") 
    }
  `;
      const res = await fetch(getGraphQLEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.errors) {
        const msg = json?.errors?.[0]?.message || "Failed to send email";
        throw new Error(msg);
      }
      setSent(true);
    } catch (e) {
      toast.error(e.message || "Failed to send email");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {showPopUp && (
        <motion.div
          key="survey"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-auto max-w-[90%] sm:max-w-[320px] lg:max-w-[800px] xl:max-w-[1024px] rounded-xl bg-white text-black shadow-lg grid lg:grid-cols-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              layout
              className="py-3 sm:py-5 px-10 flex flex-col gap-2.5 items-center text-center relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-5 left-4 text-lg lg:text-xl p-0.5 lg:p-1 border-2 border-black flex items-center justify-center rounded-full hover:text-white hover:bg-black transition-all duration-300 ease-in-out cursor-pointer"
              >
                <IoMdClose />
              </button>

              <div className="flex flex-col items-center relative gap-[15px] text-center">
                <Image
                  src="/images/logo.webp"
                  alt="Company logo"
                  width={128}
                  height={60}
                  className="max-w-[124px] lg:max-w-[128px] mb-1 sm:mb-5"
                />
                <Image
                  src="/images/tag.webp"
                  alt="Company tag"
                  width={65}
                  height={40}
                  className="max-w-[40px] sm:max-w-[65px]"
                />
                <h1 className="text-[#003058] text-2xl sm:text-4xl lg:text-[30px] font-bold lg:leading-[30px] uppercase">
                  10% Off Five Star Painting
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-[#0B0B0B] sm:mb-4 lg:leading-[22px]">
                  Book now and save on your first completed service up to $500
                </p>

                <div className="flex items-center gap-2.5">
                  <span className="text-[#0B0B0B] text-sm lg:text-base leading-[22px]">
                    Hurry! offer expire in
                  </span>
                  <div className=" flex items-center gap-[5px]">
                    <div className="p-[5px] size-8 flex items-center justify-center rounded-sm bg-[#E9EEF1] text-[#0B0B0B] lg:text-base lg:leading-[22px]">
                      {mm}
                    </div>
                    <span>:</span>
                    <div className="p-[5px] size-8 flex items-center justify-center rounded-sm bg-[#E9EEF1] text-[#0B0B0B] lg:text-base lg:leading-[22px]">
                      {ss}
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  {openInput ? (
                    <div className="w-full">
                      {!sent ? (
                        <motion.div
                          key="form"
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className={`w-full relative bg-[#f3f3f3] border rounded-lg flex items-center justify-center p-1 transition-colors duration-200 flex-col sm:flex-row  gap-2  ${
                            error ? "border-red-500" : "border-stone-300"
                          }`}
                        >
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (error) setError("");
                            }}
                            onBlur={() => {
                              if (email && !validateEmail(email))
                                setError(
                                  "Please enter a valid email address.*"
                                );
                            }}
                            className="flex-1 w-full bg-transparent text-black outline-none! shadow-none! grow pl-5"
                            aria-invalid={!!error}
                            disabled={submitting}
                          />
                          <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            aria-busy={submitting}
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out py-2 px-4 rounded-md align-middle text-white"
                          >
                            {submitting ? "Sending..." : "Get Offer"}
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sent"
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="w-full relative bg-[#f3f3f3] border border-stone-300 rounded-lg p-4 text-left"
                        >
                          <p className="text-sm sm:text-base">
                            Thanks! We sent you an eamil with your discount.
                          </p>
                        </motion.div>
                      )}

                      <AnimatePresence>
                        {error && !sent && (
                          <motion.p
                            key="error"
                            layout
                            initial={{ opacity: 0, height: 0, y: -4 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="text-red-600 text-xs text-left mt-1 pl-1"
                            aria-live="polite"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      key="cta"
                      layout
                      type="button"
                      onClick={() => {
                        setOpenInput(true);
                        setError("");
                      }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#F13F0E] hover:bg-red-700 transition-all duration-300 ease-in-out py-2.5 px-3 rounded-md text-xl lg:leading-[50px] align-middle text-white w-full"
                    >
                      Get Offer
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <p className="text-[12px] sm:text-[15px] leading-[22px]">
                Cannot be combined wth other offers
              </p>
            </motion.div>

            <div className="w-full sm:size-full bg-[url('/images/modals/gift.webp')] bg-cover bg-no-repeat sm:scale-y-[1.02] aspect-[16/9] sm:min-h-[215px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftPopup;
