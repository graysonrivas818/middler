"use client";
import { useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../../helpers/forms";
import Image from "next/image";


//// COMPONENTS

//// REDUCERS
import { changeUserValue } from "../_redux/features/userSlice";

///// MUTATIONS
import CONTACT_MIDDLER from "../_mutations/contactMiddler";

import InputFieldText from "@/components/form/inputFieldText";
import InputTextArea from "@/components/form/inputTextArea";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";



const page = () => {
  const [dropdown, setDropdown] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();

  //// MUTATIONS
  const [
    contactMiddler,
    { dataContactMiddler, loadingContactMiddler, errorContactMiddler },
  ] = useMutation(CONTACT_MIDDLER);

  const submitSendMessage = async () => {
    setError("");
    setMessage("");

    if (user.email) {
      if (!validateEmail(user.email)) {
        return setMessage("Email is not valid");
      }
    }

    if (user.message.length > 10000) {
      return setError("Message is too long");
    }

    setLoading("sendMessage");

    try {
      const response = await contactMiddler({
        variables: {
          email: user.email.toLowerCase(),
          message: user.message,
        },
      });

      setLoading("");
      setMessage(response.data.contactMiddler.message);
      dispatch(changeUserValue({ value: "", type: "email" }));
      dispatch(changeUserValue({ value: "", type: "message" }));
    } catch (error) {
      console.log(error);
      setLoading("");
      if (error) setError(error.message);
    }
  };

  return (
    <>
      <Header />

      <section className="relative mt-14 lg:mt-20 pt-12 lg:pt-20 pb-10 px-0 lg:px-10 overflow-hidden">
        <div className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.webp')] lg:bg-[url('/images/hero_el.webp')] bg-contain"></div>
        <div className="container">
          <div className="row gap-y-14 lg:gap-y-8 gap-x-5 justify-center xl:gap-x-20 items-center max-lg:text-center">
            <div className="lg:w-6/12 xl:w-5/12 max-lg:order-1">
              <div className="flex flex-col max-lg:px-5">
                <h1 className="font-bold text-[40px] leading-14 lg:text-6xl lg:leading-[1.2] mb-5">
                  <span className="text-primary">Get In Touch</span>
                </h1>
                <p className="text-base lg:text-2xl leading-6 lg:leading-snug">
                  Questions about your Real Price® estimate or going
                  Middler-Certified? <br /> Our experts reply within one
                  business day—clear, data-backed help, zero stress.
                </p>
              </div>
            </div>
            <div className="lg:w-6/12 max-lg:hidden">
              <div className="relative size-full text-right">
                <Image
                  src="/images/hero_img.webp"
                  alt="Hero"
                  width={500}
                  height={350}
                  className="inline-block rounded-2xl object-contain max-h-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10 lg:py-20">
        <div className="container">
          <div className="row">
            <div className="w-full">
              <div className="bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px] p-10">
                <div className="flex flex-wrap items-center justify-between max-lg:gap-y-10">
                  <div className="lg:w-2/5 max-lg:text-center">
                    <h2 className="text-black font-bold text-[22px] lg:text-5xl mb-2 lg:mb-5">
                      Email
                    </h2>
                    <a
                      href="mailto:support@middler.com"
                      className="text-neutral-600 font-medium text-2xl mb-2 block hover:text-primary transition-all duration-300 ease-in-out"
                    >
                      support@middler.com
                    </a>
                    <p className="text-black text-xs">
                      One of our expert Middler representatives will reach out
                      to you within 1 business day *
                    </p>
                  </div>
                  <div className="lg:w-1/2 w-full">
                    <Heading
                      heading="Contact Our Team"
                      highlight="contact"
                      oh
                      className="lg:text-left w-full text-2xl"
                    />
                    <div className="mt-5">
                      <div className="flex flex-col gap-4 *:w-full *:relative">
                        <InputFieldText
                          inputType={"text"}
                          placeholder={"Your Email *"}
                          value={user.email}
                          dispatch={dispatch}
                          changeValue={changeUserValue}
                          type={"email"}
                          dropdown={""}
                          setDropdown={setDropdown}
                          id={"email"}
                          className="w-full bg-white rounded-xl px-3 py-5 outline-none border border-white focus:border-primary focus:shadow-[0_0_10px] shadow-primary/20 shadow-none transition-all duration-300 ease-in-out"
                        />
                        <InputTextArea
                          dispatch={dispatch}
                          changeValue={changeUserValue}
                          value={user.message}
                          placeholder="Start typing here..."
                          type="message"
                        />
                        <span className="px-3 -mt-4 mb-2 inline-block text-[12px] text-gray-500">
                          10000 word count
                        </span>
                        {message && (
                          <div className="text-[14px] text-color-1 -mt-3 px-3">
                            {message.substring(0, 120)}
                          </div>
                        )}
                        {error && (
                          <div className="text-[14px] text-red-400 -mt-3 px-3">
                            {error.substring(0, 120)}
                          </div>
                        )}
                        <div className="max-lg:flex justify-center">
                          <button
                            onClick={() => submitSendMessage()}
                            disabled={loading}
                            className={`bg-primary hover:bg-primary-900 text-white text-sm font-semibold rounded-xl px-12 py-4 transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-4`}
                          >
                            <span>
                              {loading ? "Sending..." : "Send Message"}
                            </span>
                            {loading && (
                              <span className="text-2xl animate-spin">
                                <ImSpinner2 />
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default page;
