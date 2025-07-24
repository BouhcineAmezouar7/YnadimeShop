import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 space-y-10 m-10">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Exclusive</h2>
            <p className="font-semibold">Subscribe</p>
            <p className="text-sm text-gray-400">
              Get 10% off your first order
            </p>
            <div className="flex border border-gray-600 rounded overflow-hidden mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-black text-white px-4 py-2 text-sm flex-1 focus:outline-none"
              />
              <button className="px-3 hover:text-gray-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Support</h2>
            <p className="text-sm text-gray-400">
              111 Bijoy Sarani, Dhaka,
              <br />
              DH 1515, Bangladesh
            </p>
            <p className="text-sm text-gray-400">exclusive@gmail.com</p>
            <p className="text-sm text-gray-400">+880 123 456 789</p>
          </div>

          {/* Account Section */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Account</h2>
            {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map(
              (item) => (
                <a
                  href="#"
                  key={item}
                  className="hover:underline text-sm text-gray-300"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            {["Privacy Policy", "Terms & Conditions", "FAQ", "Contact Us"].map(
              (item) => (
                <a
                  href="#"
                  key={item}
                  className="hover:underline text-sm text-gray-300"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* App Download */}
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Download App</h2>
            <p className="text-sm text-gray-400">
              Get our app for the best experience
            </p>
            <div className="flex gap-3">
              <Image
                src="/QrCode.png"
                alt="QR Code"
                width={90}
                height={90}
                className="cursor-pointer"
              />
              <div className="flex flex-col gap-2">
                <Image
                  src="/playStore.png"
                  alt="Play Store"
                  width={120}
                  height={40}
                  className="cursor-pointer"
                />
                <Image
                  src="/appStore.png"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4">
              {/* 👉 Add your SVG social icons inside these <a> tags */}
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="41"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
        {/* Divider */}
        <div className="border-t border-gray-800 mt-10"></div>

        {/* Bottom Copyright */}
        <p className="text-center text-sm text-gray-500 mt-5">
          © {new Date().getFullYear()} YnadimeShop. All rights reserved.
        </p>
    </footer>
  );
}
