import Image from "next/image";
import Link from "next/link";
import { montserrat } from "@/app/fonts";
import PlusServices from "@/components/HomePage/PlusServices";
import TeamSection from "@/components/About/TeamSection";
import StatusSection from "@/components/About/StatusSection";

const values = [
  {
    number: "01",
    title: "Quality first",
    description:
      "Carefully selected products that bring quality and value to your everyday life.",
  },
  {
    number: "02",
    title: "Customer focused",
    description:
      "Your experience matters to us, from discovering a product to receiving your order.",
  },
  {
    number: "03",
    title: "Simple shopping",
    description:
      "A straightforward shopping experience that makes finding what you need effortless.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 py-6 text-sm"
        >
          <Link
            href="/"
            className="text-neutral-500 transition-colors hover:text-[#DB4444]"
          >
            Home
          </Link>

          <span className="text-neutral-300">/</span>

          <span aria-current="page" className="font-medium text-neutral-900">
            About
          </span>
        </nav>

        {/* Page heading */}
        <header className="border-b border-neutral-200 pb-10 pt-8 lg:pb-14 lg:pt-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
            About YnadimeShop
          </span>

          <h1
            className={`${montserrat.className} mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-neutral-950 sm:text-5xl lg:text-7xl`}
          >
            More than just
            <span className="block text-neutral-400">shopping.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Bringing quality, style and technology together to make everyday
            shopping a better experience.
          </p>
        </header>

        {/* Our story */}
        <section className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-20 lg:py-20">
          {/* Story content */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
              01 / Our story
            </span>

            <h2
              className={`${montserrat.className} mt-4 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl`}
            >
              Built around you.
            </h2>

            <div className="mt-6 max-w-xl space-y-5 text-sm leading-8 text-neutral-500 sm:text-base">
              <p>
                YnadimeShop was created with a simple idea: shopping should be
                enjoyable, accessible, and effortless.
              </p>

              <p>
                From modern fashion and timeless accessories to innovative
                electronics, we bring together a collection of products designed
                to complement your everyday life.
              </p>

              <p>
                Our goal is to create a shopping experience where quality,
                convenience, and customer satisfaction come together.
              </p>
            </div>

            <Link
              href="/store"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-4 rounded-lg bg-[#DB4444] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c33b3b]"
            >
              Explore our store
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 transition-transform group-hover:translate-x-1"
              >
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* Story image */}
          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 lg:aspect-[5/4]">
            <Image
              src="/about/b.jpg"
              alt="YnadimeShop shopping experience"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
          </div>
        </section>

        {/* Our mission */}
        <section className="overflow-hidden rounded-2xl bg-[#141414] px-6 py-10 text-white sm:p-10 lg:p-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#DB4444]">
                02 / Our mission
              </span>

              <h2
                className={`${montserrat.className} mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl`}
              >
                Making everyday shopping better.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-neutral-400 sm:text-base lg:justify-self-end">
              We aim to make quality products more accessible while creating a
              seamless experience built around the needs of our customers.
            </p>
          </div>

          {/* Our values */}
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-10 lg:mt-14">
            {values.map((value) => (
              <div key={value.number}>
                <span className="text-xs font-medium text-[#DB4444]">
                  / {value.number}
                </span>

                <h3
                  className={`${montserrat.className} mt-4 text-xl font-semibold tracking-tight`}
                >
                  {value.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-7 text-neutral-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Store statistics */}
      <section className="py-8 lg:py-12">
        <StatusSection />
      </section>

      {/* Team */}
      <section className="border-t border-neutral-100 py-8 lg:py-12">
        <TeamSection />
      </section>

      {/* Customer services */}
      <PlusServices />
    </main>
  );
}
