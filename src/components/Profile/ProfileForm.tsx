"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { montserrat } from "@/app/fonts";
import { auth } from "@/utils/auth";

const inputClass =
  "min-h-12 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#DB4444] focus:ring-2 focus:ring-[#DB4444]/10 disabled:opacity-60";

const initialProfile = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
};

const initialPasswords = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const profileFields = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "Enter your first name",
    autoComplete: "given-name",
    type: "text",
    required: true,
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Enter your last name",
    autoComplete: "family-name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    autoComplete: "email",
    type: "email",
    required: true,
  },
  {
    name: "address",
    label: "Street address",
    placeholder: "Enter your address",
    autoComplete: "street-address",
    type: "text",
    required: false,
  },
] as const;

type ProfileFormProps = {
  onSaved?: (name: string) => void;
};

type PasswordFieldProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function PasswordField({
  name,
  label,
  value,
  placeholder,
  autoComplete,
  required,
  disabled,
  minLength,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-neutral-800"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          required={required}
          disabled={disabled}
          minLength={minLength}
          className={`${inputClass} pr-12`}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />

            {visible && <path d="m3 3 18 18" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ProfileForm({ onSaved }: ProfileFormProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [originalProfile, setOriginalProfile] = useState(initialProfile);

  const [passwords, setPasswords] = useState(initialPasswords);

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();

    if (user) {
      const data = {
        firstName: user.name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        address: user.address || "",
      };

      setProfile(data);
      setOriginalProfile(data);
    }
  }, []);

  const hasProfileChanges = Object.keys(profile).some(
    (key) =>
      profile[key as keyof typeof profile] !==
      originalProfile[key as keyof typeof originalProfile],
  );

  const hasPasswordChanges = Object.values(passwords).some(
    (value) => value.length > 0,
  );

  const hasChanges = hasProfileChanges || hasPasswordChanges;

  function clearFeedback() {
    setSaved(false);
    setError("");
  }

  function handleProfileChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    clearFeedback();
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));

    clearFeedback();
  }

  function handleCancel() {
    setProfile(originalProfile);
    setPasswords(initialPasswords);
    clearFeedback();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving || !hasChanges) return;

    clearFeedback();

    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (hasPasswordChanges) {
      if (!currentPassword) {
        setError("Please enter your current password.");
        return;
      }

      if (newPassword.length < 8) {
        setError("Your new password must contain at least 8 characters.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Your new passwords do not match.");
        return;
      }
    }

    setIsSaving(true);

    let passwordChanged = false;

    try {
      if (hasPasswordChanges) {
        await auth.changePassword(currentPassword, newPassword);

        passwordChanged = true;
        setPasswords(initialPasswords);
      }

      if (hasProfileChanges) {
        await auth.updateUser({
          name: profile.firstName.trim(),
          last_name: profile.lastName.trim(),
          email: profile.email.trim(),
          address: profile.address.trim(),
        });

        const updatedProfile = {
          firstName: profile.firstName.trim(),
          lastName: profile.lastName.trim(),
          email: profile.email.trim(),
          address: profile.address.trim(),
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);

        onSaved?.(updatedProfile.firstName);

        window.localStorage.setItem(
          "ynadime_profile",
          JSON.stringify(updatedProfile),
        );
      }

      setSaved(true);
    } catch (reason) {
      const message =
        reason instanceof Error
          ? reason.message
          : "Unable to save your changes.";

      setError(
        passwordChanged
          ? `Password changed successfully, but another update failed. ${message}`
          : message,
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal information */}
      <section className="rounded-xl border border-neutral-200 bg-white">
        <header className="flex items-start justify-between gap-4 border-b border-neutral-200 p-6 sm:p-7">
          <div>
            <h2
              className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-950`}
            >
              Personal information
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Update your personal and contact details.
            </p>
          </div>

          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
            </svg>
          </div>
        </header>

        <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-7">
          {profileFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                {field.label}
              </label>

              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={profile[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                disabled={isSaving}
                onChange={handleProfileChange}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Password settings */}
      <section className="rounded-xl border border-neutral-200 bg-white">
        <header className="flex items-start justify-between gap-4 border-b border-neutral-200 p-6 sm:p-7">
          <div>
            <h2
              className={`${montserrat.className} text-xl font-semibold tracking-tight text-neutral-950`}
            >
              Password &amp; security
            </h2>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Keep your account protected by updating your password.
            </p>
          </div>

          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3" />
            </svg>
          </div>
        </header>

        <div className="space-y-5 p-6 sm:p-7">
          <PasswordField
            name="currentPassword"
            label="Current password"
            value={passwords.currentPassword}
            placeholder="Enter current password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            disabled={isSaving}
            required={hasPasswordChanges}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <PasswordField
              name="newPassword"
              label="New password"
              value={passwords.newPassword}
              placeholder="Enter new password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              disabled={isSaving}
              required={hasPasswordChanges}
              minLength={8}
            />

            <PasswordField
              name="confirmPassword"
              label="Confirm password"
              value={passwords.confirmPassword}
              placeholder="Confirm new password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              disabled={isSaving}
              required={hasPasswordChanges}
              minLength={8}
            />
          </div>

          <div className="rounded-lg bg-neutral-50 p-4">
            <p className="text-xs leading-6 text-neutral-500">
              Your password must contain at least 8 characters. Leave these
              fields empty if you don&apos;t want to change your password.
            </p>
          </div>
        </div>
      </section>

      {/* Success feedback */}
      {saved && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5 shrink-0"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12 3 3 5-6" />
          </svg>
          Your changes have been saved successfully.
        </div>
      )}

      {/* Error feedback */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
        >
          {error}
        </div>
      )}

      {/* Form actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
        <p aria-live="polite" className="text-xs text-neutral-500">
          {hasChanges ? "You have unsaved changes." : "No unsaved changes."}
        </p>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving || !hasChanges}
            className="flex-1 cursor-pointer rounded-lg border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving || !hasChanges}
            className="flex-1 cursor-pointer rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
