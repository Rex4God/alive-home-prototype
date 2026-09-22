"use client";
import { ArrowDown, ArrowUp, MessageSquare } from "lucide-react";
import { faqData } from "@/utils/FaqData";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Faq() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="px-4 py-14 pb-20 lg:px-6 lg:py-20 lg:pb-32 bg-[#F8F8F8]">
      <div className="text-center max-w-sm md:max-w-[750px] mx-auto">
        <h2 className="font-bold text-4xl md:text-5xl px-6 lg:px-10 bg-gradient-to-r from-[#C77D01] to-[#565248] bg-clip-text text-transparent leading-tight">
          Frequently Asked Questions (FAQs)
        </h2>
        <p className="font-medium md:font-semibold text-2xl mt-3 text-[#4A4A4A]">
          Any questions? We got you.
        </p>
      </div>

      <div className="md:flex space-y-14 md:justify-between max-w-6xl  lg:gap-20 md:space-y-0 md:space-x-4 lg:space-x-0 mx-auto px-2 md:px-6 items-center">
        <div className="bg-white border-[1.3px] border-[#404040] rounded-2xl md:w-[50%] lg:w-[65%] mt-12  md:mt-16 shadow-[5px_5px_0px_0px_rgba(38,38,38,0.7)]">
          {faqData.map((faq, index) => (
            <div
              key={index}
              onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              className={`${
                activeFaq === index
                  ? "mt-0 bg-white rounded-t-2xl"
                  : "mt-0 lg:py-8"
              } flex text-[#4a4a4a] ${
                index !== faqData.length - 1
                  ? "border-b-[0.5px] border-[#404040]"
                  : "rounded-b-2xl"
              } p-4 md:p-8 lg:px-6 justify-between cursor-pointer`}
            >
              <div>
                <p className="text-base lg:text-xl font-medium mr-3 text-[#011512]">
                  <span>{faq.question}</span>
                </p>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    activeFaq === index
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm lg:text-base mt-4">{faq.answer}</p>
                </motion.div>
              </div>
              <div>
                {activeFaq === index ? (
                  <div className="bg-[#C77D01] p-1 rounded-full cursor-pointer text-white">
                    <ArrowDown className="size-3 md:size-4" />
                  </div>
                ) : (
                  <div className="bg-[#C77D01] p-1 rounded-full cursor-pointer text-white">
                    <ArrowUp className="size-3 md:size-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white px-10 rounded-2xl flex flex-col justify-center items-center text-center p-3 py-10 md:w-[40%] lg:w-[35%] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MessageSquare className="text-[#C77D01] md:size-24 size-20 mx-auto" />
          <p className="font-bold text-2xl md:text-3xl mt-8 text-[#161616] ">
            Do you have more questions?
          </p>
          <p className="mt-6 mb-12 text-[#4A4A4A]">
            Check out our FAQ or contact us directly.
          </p>
          <div>
            <a
              href="mailto:support@aliveHome.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C77D01] hover:bg-[#C77D01]/90 text-white flex items-center justify-between gap-4 p-4 rounded-md cursor-pointer font-medium"
            >
              Send an email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
