const services = [
  {
    id: 1,
    title: "Free & fast delivery",
    description: "Delivered straight to your door.",
    icon: (
      <>
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
  },
  {
    id: 2,
    title: "24/7 customer support",
    description: "We're always here to help.",
    icon: (
      <>
        <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
        <rect x="3" y="12" width="5" height="8" rx="2" />
        <rect x="16" y="12" width="5" height="8" rx="2" />
        <path d="M21 18v1a3 3 0 0 1-3 3h-4" />
      </>
    ),
  },
  {
    id: 3,
    title: "Money-back guarantee",
    description: "Easy returns within 30 days.",
    icon: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

export default function PlusServices() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 divide-y divide-neutral-200 border-y border-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {services.map((service) => (
          <div
            key={service.id}
            className="group flex flex-col items-center gap-4 px-6 py-8 text-center lg:py-10"
          >
            {/* Service icon */}
            <div className="flex size-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 transition-colors duration-300 group-hover:bg-[#DB4444]/10 group-hover:text-[#DB4444]">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-7"
              >
                {service.icon}
              </svg>
            </div>

            {/* Service information */}
            <div>
              <h3 className="text-base font-semibold tracking-tight text-neutral-900">
                {service.title}
              </h3>

              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
