import React from "react";

export default function ProfileForm() {
  return (
    <>
      <div className="m-4">
        <h1 className="text-[#DB4444] font-semibold text-xl">
          Edite Your Profile
        </h1>
        {/* Form */}
        <form action="">
          <div className="flex gap-10">
            <div className="mt-7 w-full">
              <label className="block text-md font-semibold text-gray-700 mb-3">
                First Name
              </label>
              <input
                type="text"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="Enter your first name"
              />
            </div>
            <div className="mt-7 w-full">
              <label className="block text-md font-semibold text-gray-700 mb-3">
                Last Name
              </label>
              <input
                type="text"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mt-7 w-full">
              <label className="block text-md font-semibold text-gray-700 mb-3">
                Email
              </label>
              <input
                type="text"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-7 w-full">
              <label className="block text-md font-semibold text-gray-700 mb-3">
                Address
              </label>
              <input
                type="text"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="Enter your address"
              />
            </div>
          </div>
          {/* password changes */}
          <div className="mt-7 w-full">
            <label className="block text-md font-semibold text-gray-700 mb-3">
              Password Changes
            </label>
            <div className="flex flex-col gap-5">
              <input
                type="password"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="Current Password"
              />
              <input
                type="password"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="New Password"
              />
              <input
                type="password"
                className="bg-neutral-100 text-base p-3 rounded-md w-full "
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <div className="mt-7 flex justify-end gap-5">
            <button>Cancel</button>
            <button className="bg-[#DB4444] text-white px-8 py-3 rounded-md hover:bg-[#c33a3a] transition-colors" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
