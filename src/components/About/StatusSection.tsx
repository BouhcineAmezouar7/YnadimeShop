import React from "react";

const Status = [
  {
    id: 1,
    number: "10.5K",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        width="39"
        height="39"
        className="text-white group-hover:text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
    ),
    description: "Sallers active our site",
  },
  {
    id: 2,
    number: "33K",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        fill="currentColor"
        className="text-white group-hover:text-black"
        viewBox="0 0 256 256"
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-68a28,28,0,0,1-28,28h-4v8a8,8,0,0,1-16,0v-8H104a8,8,0,0,1,0-16h36a12,12,0,0,0,0-24H116a28,28,0,0,1,0-56h4V72a8,8,0,0,1,16,0v8h16a8,8,0,0,1,0,16H116a12,12,0,0,0,0,24h24A28,28,0,0,1,168,148Z"></path>
      </svg>
    ),
    description: "Mopnthly Product Sale",
  },
  {
    id: 3,
    number: "45.5K",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        width="39"
        height="39"
        className="text-white group-hover:text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    ),
    description: "Customers active on our site",
  },
  {
    id: 4,
    number: "25K",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        fill="currentColor"
        className="text-white group-hover:text-black"
        viewBox="0 0 256 256"
      >
        <path d="M184,48.81V32a16,16,0,0,0-16-16H88A16,16,0,0,0,72,32V48.81A40.05,40.05,0,0,0,40,88V200a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V88A40.05,40.05,0,0,0,184,48.81ZM168,48H152V32h16Zm-48,0V32h16V48ZM104,32V48H88V32Zm96,168a24,24,0,0,1-24,24H80a24,24,0,0,1-24-24V88A24,24,0,0,1,80,64h96a24,24,0,0,1,24,24Zm-40-40a24,24,0,0,1-24,24v8a8,8,0,0,1-16,0v-8h-8a8,8,0,0,1,0-16h24a8,8,0,0,0,0-16H120a24,24,0,0,1,0-48V96a8,8,0,0,1,16,0v8h8a8,8,0,0,1,0,16H120a8,8,0,0,0,0,16h16A24,24,0,0,1,160,160Z"></path>
      </svg>
    ),
    description: "Anual gross sale in our site",
  },
];
export default function StatusSection() {
  return (
    <>
      <div className="container mx-auto sm:px-6 lg:px-0 py-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
          {Status.map((status) => (
            <div
              key={status.id}
              className="border border-neutral-300 flex flex-col items-center rounded-sm p-10 mt-6 hover:bg-[#DB4444] hover:text-white transition-colors duration-300 cursor-pointer group"
            >
              <div className="bg-neutral-500 group-hover:bg-gray-300 px-2 py-2 rounded-full text-lg font-semibold transition-colors duration-300">
                <div className="bg-black group-hover:bg-white text-white px-3 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
                  {status.icon}
                </div>
              </div>
              <h2 className="text-3xl font-bold mt-4">{status.number}</h2>
              <div className="mt-3">
                <h1 className="font-medium">{status.description}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
