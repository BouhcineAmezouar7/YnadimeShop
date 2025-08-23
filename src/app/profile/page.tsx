"use client";
import { useEffect, useState } from "react";
import { auth } from "@/utils/auth";
import Link from "next/link";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import ProfileForm from "@/components/Profile/ProfileForm";

export default function page() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await auth.getUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>No user info found. Please log in.</p>;

  return (
    <>
      <div className="container mx-auto px-5 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-8 text-sm md:text-base">
              <span className="text-neutral-400"><Link href="/">Home</Link></span>
              <span className="text-neutral-400">/</span>
              <span>My Account</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-600 mb-8">
              Welcome!, <span className="text-[#DB4444]">{user.name}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[50px lg:m-24] mt-6">
          <ProfileSidebar />

          <div className="bg-white p-6 rounded-lg shadow-md w-full ">
            <ProfileForm />
          </div>
        </div>
      </div>
    </>
  );
}
