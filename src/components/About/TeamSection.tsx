import React from "react";
import Image from "next/image";

const TeamMembers = [
  {
    id: 1,
    name: "Antonio Roberto",
    position: "Founder",
    image: "/about/team/mc1.jpg",
    social: {
      twitter: "https://twitter.com/antonio",
      linkedin: "https://linkedin.com/in/antonio",
      instagram: "https://instagram.com/antonio",
    },
  },
  {
    id: 2,
    name: "Patricia Angely",
    position: "Co-Founder",
    image: "/about/team/mc1.jpg",
    social: {
      twitter: "https://twitter.com/patricia",
      linkedin: "https://linkedin.com/in/patricia",
      instagram: "https://instagram.com/patricia",
    },
  },
  {
    id: 3,
    name: "Jerom Bell",
    position: "Chairman",
    image: "/about/team/mc1.jpg",
    social: {
      twitter: "https://twitter.com/jerom",
      linkedin: "https://linkedin.com/in/jerom",
      instagram: "https://instagram.com/jerom",
    },
  },
  {
    id: 4,
    name: "Yasmine Tano",
    position: "CEO",
    image: "/about/team/mc1.jpg",
    social: {
      twitter: "https://twitter.com/yasmine",
      linkedin: "https://linkedin.com/in/yasmine",
      instagram: "https://instagram.com/yasmine",
    },
  },
  {
    id: 5,
    name: "Martin Darbys",
    position: "Product Manager",
    image: "/about/team/mc1.jpg",
    social: {
      twitter: "https://twitter.com/martin",
      linkedin: "https://linkedin.com/in/martin",
      instagram: "https://instagram.com/martin",
    },
  },
];
export default function TeamSection() {
  return (
    <>
      <div className="container mx-auto px-5 py-10 mt-10 mb-25">
        <div className="">
          <div className="mb-20">
            <h2 className="text-5xl font-semibold px-5">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {TeamMembers.map((member) => (
              <div key={member.id} className="block group text-center">
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    alt={`${member.name} image`}
                    width={900}
                    height={900}
                    className="w-50 h-50 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-[#DB4444]"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2 capitalize text-center transition-all duration-500 group-hover:text-[#DB4444]">
                  {member.name}
                </h4>
                <span className="text-gray-500 text-center block transition-all duration-500 group-hover:text-gray-900">
                  {member.position}
                </span>
                {/* social links */}
                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 hover:bg-[#1DA1F2] rounded-full flex items-center justify-center transition-colors duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 hover:bg-[#0077B5] rounded-full flex items-center justify-center transition-colors duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 rounded-full flex items-center justify-center transition-colors duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.897 3.708 13.746 3.708 12.449s.49-2.448 1.297-3.323C5.898 8.254 7.049 7.764 8.347 7.764s2.448.49 3.323 1.297c.893.893 1.383 2.044 1.383 3.341s-.49 2.448-1.297 3.323c-.893.893-2.044 1.383-3.341 1.383zm7.83-9.085h-1.48V6.421h1.48v1.482zm0 0" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
