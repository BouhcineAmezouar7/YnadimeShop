"use client";
import React from "react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-5 py-10">
      {/* Breadcrumb */}
      <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-8 text-sm md:text-base">
        <span className="text-neutral-400">Home</span>
        <span className="text-neutral-400">/</span>
        <span>Contact</span>
      </h2>

      {/* Contact Info + Form */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-[50px lg:m-24">
        {/* Left - Contact Info */}
        <div className="flex flex-col gap-10 w-full lg:w-[40%]">
          {/* Call To Us */}
          <div className="flex flex-col gap-6">
            <h1 className="text-lg font-bold flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                fill="currentColor"
                className="bg-[#DB4444] p-2 rounded-full text-white"
                viewBox="0 0 256 256"
              >
                <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path>
              </svg>
              Call To Us
            </h1>
            <div className="text-sm font-medium text-gray-700 flex flex-col gap-2">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>

          <div className="border-b border-gray-400"></div>

          {/* Write To Us */}
          <div className="flex flex-col gap-6">
            <h1 className="text-lg font-bold flex items-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                fill="currentColor"
                className="bg-[#DB4444] p-2 rounded-full text-white"
                viewBox="0 0 256 256"
              >
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
              </svg>
              Write To Us
            </h1>
            <div className="text-sm font-medium text-gray-700 flex flex-col gap-2">
              <p>
                Fill out our form and we will contact <br /> you within 24
                hours.
              </p>
              <p>Email: support@example.com</p>
              <p>Email: support@example.com</p>
            </div>
          </div>
        </div>

        {/* Right - Contact Form */}
        <div className="w-full lg:w-[60%]">
          <form className="flex flex-col gap-8">
            {/* Input Group */}
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="bg-neutral-100 text-base p-3 rounded-md w-full font-serif"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-neutral-100 text-base p-3 rounded-md w-full font-serif"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your phone"
                  className="bg-neutral-100 text-base p-3 rounded-md w-full font-serif"
                />
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Your message"
                className="bg-neutral-100 text-base p-3 rounded-md w-full h-40 resize-none font-serif"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button className="bg-[#DB4444] text-white px-8 py-3 rounded-sm font-semibold hover:bg-[#c33b3b] transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
