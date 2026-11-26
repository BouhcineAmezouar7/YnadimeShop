import Link from "next/link";
import { notFound } from "next/navigation";

const content: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
  privacy: { title: "Privacy Policy", sections: [{ heading: "Your information", text: "This frontend demo stores account, cart, favorites, and order information only in your browser local storage." }, { heading: "Your control", text: "You can clear your browser storage at any time to remove all demo information." }] },
  terms: { title: "Terms & Conditions", sections: [{ heading: "Demo storefront", text: "YnadimeShop is a frontend demonstration. No real purchase, payment, shipment, or commercial transaction is performed." }, { heading: "Product information", text: "Product names, pricing, stock, and delivery information are sample content for demonstration purposes." }] },
  faq: { title: "Frequently Asked Questions", sections: [{ heading: "Do I need a backend?", text: "No. The demo account, cart, wishlist, checkout, and orders work using browser storage." }, { heading: "Are payments real?", text: "No. Card and cash-on-delivery choices demonstrate the checkout interface only." }, { heading: "Where can I find my orders?", text: "Open My Account and select All Orders, or use the Orders link in the footer." }] },
};
export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = content[slug];
  if (!page) notFound();
  return <main className="container mx-auto min-h-[60vh] max-w-4xl px-5 py-12"><div className="flex gap-2 text-sm font-semibold"><Link href="/" className="text-neutral-400">Home</Link><span>/</span><span>{page.title}</span></div><h1 className="mt-10 text-4xl font-semibold">{page.title}</h1><div className="mt-10 space-y-8">{page.sections.map((section) => <section key={section.heading}><h2 className="text-xl font-semibold">{section.heading}</h2><p className="mt-3 leading-7 text-gray-600">{section.text}</p></section>)}</div></main>;
}
