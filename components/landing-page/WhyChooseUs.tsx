"use client";
import React from "react";
import { motion, Variants, easeOut } from "framer-motion";
import { Shield, Zap, Users, TrendingUp, MapPin, Award } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description:
        "Every property on our platform is thoroughly verified to eliminate fraud and ensure authentic listings.",
      color: "bg-[#C77D01]",
    },
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description:
        "Our intelligent algorithm matches you with properties that perfectly fit your criteria and budget.",
      color: "bg-[#C77D01]",
    },
    {
      icon: MapPin,
      title: "Proximity-Based Services",
      description:
        "Find properties with detailed neighborhood insights and proximity to essential amenities.",
      color: "bg-[#C77D01]",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Market Data",
      description:
        "Access up-to-date market trends, pricing insights, and investment opportunities.",
      color: "bg-[#C77D01]",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut }, // ✅ Fixed
    },
  };

  return (
    <section className="py-20 px-4 bg-[#F4E8E1] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C77D01] to-[#565248] text-white text-sm font-semibold rounded-full mb-4 shadow-lg">
              Why Alive Home
            </span>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Nigeria's Most Trusted
            <br />
            <span className="bg-gradient-to-r from-[#C77D01] to-[#565248] bg-clip-text text-transparent">
              Real Estate Platform
            </span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of property discovery with our AI-driven
            ecosystem that connects, protects, and empowers your real estate
            journey.
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-[1100px] mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: easeOut },
              }}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className={`absolute -inset-1 ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-300`}
              />
              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-200">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </motion.h3>

                <motion.p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="absolute bottom-6 right-6 text-gray-300 group-hover:text-gray-500 transition-all duration-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          rotate: -360,
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl"
      />
    </section>
  );
}


// "use client";
// import { motion } from "framer-motion";
// import { Shield, Sparkles, Clock, ThumbsUp } from "lucide-react";

// export default function WhyChooseUs() {
//   const reasons = [
//     {
//       icon: <Shield className="w-10 h-10 text-[#C77D01]" />,
//       title: "Trusted & Secure",
//       desc: "We prioritize your safety with top-notch security and reliability you can count on.",
//     },
//     {
//       icon: <Sparkles className="w-10 h-10 text-[#C77D01]" />,
//       title: "Modern Design",
//       desc: "Experience sleek, user-friendly interfaces that enhance usability and style.",
//     },
//     {
//       icon: <Clock className="w-10 h-10 text-[#C77D01]" />,
//       title: "Time Efficient",
//       desc: "Save time with fast, optimized solutions designed for convenience.",
//     },
//     {
//       icon: <ThumbsUp className="w-10 h-10 text-[#C77D01]" />,
//       title: "Customer Satisfaction",
//       desc: "We’re committed to ensuring every client walks away happy and confident.",
//     },
//   ];

//   return (
//     <section className="relative py-20 bg-[#F4E8E1]" id="why-choose-us">
//       <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
//         >
//           Why Choose Us
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           viewport={{ once: true }}
//           className="text-gray-600 max-w-2xl mx-auto mb-12"
//         >
//           We blend innovation, reliability, and customer-first values to deliver
//           solutions that make a difference.
//         </motion.p>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {reasons.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: i * 0.2 }}
//               viewport={{ once: true }}
//               className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
//             >
//               <div className="flex justify-center mb-4">{item.icon}</div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 text-sm">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }