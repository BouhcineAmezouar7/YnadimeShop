export type ProductColor = {
  name: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  shortName: string;
  category: "Clothing" | "Accessories" | "Electronics";
  brand: string;
  color: string;
  colors: ProductColor[];
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
  description: string;
  sizes: string[];
  sizeLabel: string;
  features: string[];
  specifications: Array<{ label: string; value: string }>;
};

const sneakerImages = [
  "/product/Sneakers/avenue-court-white.png",
  "/product/Sneakers/motion-air-runner-black.png",
  "/product/Sneakers/avenue-retro-runner-sand.png",
  "/product/Sneakers/northstar-canvas-high-white.png",
  "/product/Sneakers/northstar-varsity-mid-red.png",
  "/product/Sneakers/motion-cloud-slip-charcoal.png",
  "/product/Sneakers/terra-ridge-trail-olive.png",
  "/product/Sneakers/avenue-pastel-court.png",
  "/product/Sneakers/motion-sculpt-runner-grey.png",
  "/product/Sneakers/avenue-skate-low-black.png",
];

const shoeSizes = ["39", "40", "41", "42", "43", "44"];

const clothingProducts: Product[] = [
  {
    id: "avenue-court-white",
    name: "Avenue Court Leather Sneaker",
    shortName: "Court Leather Sneaker",
    category: "Clothing",
    brand: "Avenue",
    color: "Optic White",
    colors: [{ name: "Optic White", value: "#f5f5f2" }],
    price: 89,
    originalPrice: 119,
    rating: 4.8,
    reviews: 126,
    inStock: true,
    image: sneakerImages[0],
    description: "A clean everyday court sneaker made with a smooth easy-care upper, padded collar and a flexible cupsole for all-day comfort.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Soft padded collar", "Cushioned foam footbed", "Flexible rubber cupsole"],
    specifications: [
      { label: "Upper", value: "Premium synthetic leather" },
      { label: "Lining", value: "Breathable textile" },
      { label: "Sole", value: "Non-marking rubber" },
      { label: "Fit", value: "True to size" },
    ],
  },
  {
    id: "motion-air-runner-black",
    name: "Motion Air Runner",
    shortName: "Air Runner",
    category: "Clothing",
    brand: "Motion",
    color: "Triple Black",
    colors: [{ name: "Triple Black", value: "#171717" }],
    price: 99,
    originalPrice: 139,
    rating: 4.7,
    reviews: 208,
    inStock: true,
    image: sneakerImages[1],
    description: "A lightweight road runner with an engineered mesh upper and responsive cushioning designed for daily miles and active commutes.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Ventilated mesh upper", "Responsive foam midsole", "High-grip rubber zones"],
    specifications: [
      { label: "Upper", value: "Engineered performance mesh" },
      { label: "Drop", value: "8 mm" },
      { label: "Weight", value: "268 g" },
      { label: "Use", value: "Road running" },
    ],
  },
  {
    id: "avenue-retro-runner-sand",
    name: "Avenue Retro Runner",
    shortName: "Retro Runner",
    category: "Clothing",
    brand: "Avenue",
    color: "Sandstone",
    colors: [{ name: "Sandstone", value: "#c6ad8b" }],
    price: 84,
    originalPrice: 109,
    rating: 4.6,
    reviews: 84,
    inStock: true,
    image: sneakerImages[2],
    description: "Vintage running lines meet modern comfort in this neutral suede-and-mesh sneaker with a softly cushioned everyday sole.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Suede-effect overlays", "Breathable mesh panels", "Shock-absorbing midsole"],
    specifications: [
      { label: "Upper", value: "Microfibre suede and mesh" },
      { label: "Lining", value: "Recycled textile" },
      { label: "Sole", value: "EVA and rubber" },
      { label: "Fit", value: "Regular" },
    ],
  },
  {
    id: "northstar-canvas-high-white",
    name: "Northstar Canvas High",
    shortName: "Canvas High",
    category: "Clothing",
    brand: "Northstar",
    color: "White & Black",
    colors: [{ name: "White & Black", value: "#f3f3f1" }],
    price: 69,
    originalPrice: 89,
    rating: 4.5,
    reviews: 173,
    inStock: true,
    image: sneakerImages[3],
    description: "A timeless high-top built from durable canvas with contrast piping, metal eyelets and a vulcanised rubber sole.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Durable cotton canvas", "Reinforced rubber toe", "Classic vulcanised construction"],
    specifications: [
      { label: "Upper", value: "Heavy cotton canvas" },
      { label: "Fastening", value: "Seven-eyelet lace-up" },
      { label: "Sole", value: "Vulcanised rubber" },
      { label: "Profile", value: "High top" },
    ],
  },
  {
    id: "northstar-varsity-mid-red",
    name: "Northstar Varsity Mid",
    shortName: "Varsity Mid",
    category: "Clothing",
    brand: "Northstar",
    color: "Red, White & Grey",
    colors: [{ name: "Red, White & Grey", value: "#c83232" }],
    price: 119,
    originalPrice: 159,
    rating: 4.9,
    reviews: 241,
    inStock: true,
    image: sneakerImages[4],
    description: "A bold basketball-inspired mid-top with layered panels, ankle support and a stable cushioned sole for street-ready comfort.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Supportive padded ankle", "Perforated toe box", "Pivot-point rubber outsole"],
    specifications: [
      { label: "Upper", value: "Panelled synthetic leather" },
      { label: "Lining", value: "Padded mesh" },
      { label: "Sole", value: "Stitched rubber cupsole" },
      { label: "Profile", value: "Mid top" },
    ],
  },
  {
    id: "motion-cloud-slip-charcoal",
    name: "Motion Cloud Slip-On",
    shortName: "Cloud Slip-On",
    category: "Clothing",
    brand: "Motion",
    color: "Charcoal",
    colors: [{ name: "Charcoal", value: "#44464a" }],
    price: 74,
    originalPrice: 99,
    rating: 4.6,
    reviews: 117,
    inStock: true,
    image: sneakerImages[5],
    description: "A flexible knit slip-on that feels light from morning to night, with a stretch collar and softly contoured footbed.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Stretch-knit construction", "Easy pull-on heel loop", "Ultra-light flexible sole"],
    specifications: [
      { label: "Upper", value: "Breathable stretch knit" },
      { label: "Closure", value: "Slip-on" },
      { label: "Sole", value: "Lightweight EVA" },
      { label: "Fit", value: "Sock-like" },
    ],
  },
  {
    id: "terra-trail-olive",
    name: "Terra Ridge Trail Shoe",
    shortName: "Ridge Trail Shoe",
    category: "Clothing",
    brand: "Terra",
    color: "Olive",
    colors: [{ name: "Olive", value: "#62633d" }],
    price: 129,
    originalPrice: 169,
    rating: 4.8,
    reviews: 194,
    inStock: true,
    image: sneakerImages[6],
    description: "A protective trail shoe with durable overlays, secure lacing and deep multi-directional lugs for confident off-road grip.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Protective toe guard", "Stability cage", "Aggressive trail outsole"],
    specifications: [
      { label: "Upper", value: "Abrasion-resistant mesh" },
      { label: "Drop", value: "6 mm" },
      { label: "Sole", value: "High-traction rubber" },
      { label: "Use", value: "Trail and hiking" },
    ],
  },
  {
    id: "avenue-pastel-court",
    name: "Avenue Pastel Court",
    shortName: "Pastel Court",
    category: "Clothing",
    brand: "Avenue",
    color: "Sky Blue & Blush",
    colors: [{ name: "Sky Blue & Blush", value: "#a9cce5" }],
    price: 94,
    originalPrice: 124,
    rating: 4.7,
    reviews: 96,
    inStock: true,
    image: sneakerImages[7],
    description: "A playful low-top court sneaker with soft pastel panels and a clean platform sole that pairs easily with everyday looks.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Colour-block upper", "Comfort foam insole", "Durable platform cupsole"],
    specifications: [
      { label: "Upper", value: "Smooth synthetic leather" },
      { label: "Lining", value: "Soft textile" },
      { label: "Sole", value: "Rubber platform" },
      { label: "Fit", value: "True to size" },
    ],
  },
  {
    id: "motion-sculpt-runner-grey",
    name: "Motion Sculpt Runner",
    shortName: "Sculpt Runner",
    category: "Clothing",
    brand: "Motion",
    color: "Silver Grey",
    colors: [{ name: "Silver Grey", value: "#a7a8aa" }],
    price: 109,
    originalPrice: 149,
    rating: 4.8,
    reviews: 152,
    inStock: true,
    image: sneakerImages[8],
    description: "A fashion-forward chunky runner balancing layered mesh, sculpted cushioning and a stable wide base.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Layered technical upper", "Sculpted dual-density sole", "Padded tongue and collar"],
    specifications: [
      { label: "Upper", value: "Mesh and microfibre panels" },
      { label: "Midsole", value: "Dual-density EVA" },
      { label: "Sole", value: "Rubber traction pods" },
      { label: "Fit", value: "Regular" },
    ],
  },
  {
    id: "avenue-skate-low-black",
    name: "Avenue Skate Low",
    shortName: "Skate Low",
    category: "Clothing",
    brand: "Avenue",
    color: "Black & Gum",
    colors: [{ name: "Black & Gum", value: "#1f1f1f" }],
    price: 79,
    originalPrice: 105,
    rating: 4.6,
    reviews: 138,
    inStock: true,
    image: sneakerImages[9],
    description: "A low-profile skate sneaker with a soft-touch upper, reinforced panels and a grippy gum outsole for board feel and daily wear.",
    sizes: shoeSizes,
    sizeLabel: "EU size",
    features: ["Reinforced high-wear panels", "Cushioned tongue", "Grippy gum rubber tread"],
    specifications: [
      { label: "Upper", value: "Synthetic suede" },
      { label: "Lining", value: "Padded textile" },
      { label: "Sole", value: "Gum rubber cupsole" },
      { label: "Profile", value: "Low top" },
    ],
  },
];

const watchProducts: Product[] = [
  ["nova-active-smartwatch", "Nova Active Smartwatch", "Active Smartwatch", "Nova", "Midnight Black", 199, 249, 4.8, 316, "/product/Watches/black-smartwatch.png", "A streamlined fitness smartwatch with bright touch display, activity tracking and everyday phone notifications.", ["40 mm", "44 mm"], ["Heart-rate and activity tracking", "Up to 7 days of battery", "Water resistant to 50 m"], [["Display", "AMOLED touch display"], ["Connectivity", "Bluetooth 5.3"], ["Case", "Aluminium"], ["Compatibility", "iOS and Android"]]],
  ["chronos-white-chronograph", "Chronos Alpine Chronograph", "Alpine Chronograph", "Chronos", "White & Silver", 179, 229, 4.7, 121, "/product/Watches/white-chronograph.png", "A crisp white chronograph with polished steel details, three functional subdials and a sporty silicone strap.", ["S/M", "M/L"], ["Functional chronograph", "Luminous hands", "Water resistant to 100 m"], [["Movement", "Precision quartz"], ["Case", "Stainless steel, 42 mm"], ["Crystal", "Mineral glass"], ["Strap", "White silicone"]]],
  ["mariner-blue-diver", "Mariner Cobalt Diver", "Cobalt Diver", "Mariner", "Cobalt Blue", 219, 279, 4.9, 188, "/product/Watches/silver-blue-diver.png", "A capable steel dive watch with a vivid blue bezel, high-contrast dial and robust water resistance.", ["One size"], ["Unidirectional dive bezel", "Luminous markers", "Water resistant to 200 m"], [["Movement", "Automatic"], ["Case", "Stainless steel, 41 mm"], ["Crystal", "Sapphire-coated mineral"], ["Bracelet", "Solid-link steel"]]],
  ["aster-skyline-steel", "Aster Skyline Steel", "Skyline Steel", "Aster", "Ice Blue", 189, 239, 4.7, 94, "/product/Watches/silver-blue-watch.png", "A refined everyday steel watch with a sunray blue dial, clean markers and an integrated bracelet.", ["One size"], ["Sunray dial finish", "Date window", "Water resistant to 50 m"], [["Movement", "Japanese quartz"], ["Case", "Stainless steel, 40 mm"], ["Crystal", "Hardened mineral"], ["Bracelet", "Adjustable steel"]]],
  ["fieldworks-rugged-digital", "Fieldworks Terrain Digital", "Terrain Digital", "Fieldworks", "Graphite", 99, 129, 4.6, 267, "/product/Watches/rugged-digital-watch.png", "A shock-resistant outdoor digital watch with an easy-read display, multiple alarms and practical timer functions.", ["S/M", "M/L"], ["Shock-resistant body", "Stopwatch and countdown timer", "Water resistant to 100 m"], [["Display", "Backlit digital"], ["Case", "Reinforced resin, 46 mm"], ["Battery", "Approx. 3 years"], ["Strap", "Textured resin"]]],
  ["aster-noir-leather", "Aster Noir Classic", "Noir Classic", "Aster", "Black", 139, 179, 4.7, 82, "/product/Watches/black-leather-watch.png", "A minimal dress watch pairing a deep black dial with a supple leather strap and slim polished case.", ["S/M", "M/L"], ["Slim dress profile", "Quick-release strap", "Water resistant to 30 m"], [["Movement", "Swiss-part quartz"], ["Case", "Polished steel, 38 mm"], ["Crystal", "Domed mineral"], ["Strap", "Genuine leather"]]],
  ["mariner-onyx-diver", "Mariner Onyx Diver", "Onyx Diver", "Mariner", "Black & Steel", 209, 269, 4.8, 145, "/product/Watches/silver-black-diver.png", "A versatile black-dial dive watch with a precise rotating bezel and a solid stainless-steel bracelet.", ["One size"], ["Unidirectional timing bezel", "Screw-down crown", "Water resistant to 200 m"], [["Movement", "Automatic"], ["Case", "Stainless steel, 41 mm"], ["Crystal", "Sapphire-coated mineral"], ["Bracelet", "Solid-link steel"]]],
  ["chronos-gold-chronograph", "Chronos Regent Gold", "Regent Gold", "Chronos", "Champagne Gold", 229, 289, 4.9, 109, "/product/Watches/gold-chronograph.png", "A statement chronograph in warm gold tones, finished with a detailed multi-register dial and polished bracelet.", ["One size"], ["Functional chronograph", "Tachymeter scale", "Water resistant to 50 m"], [["Movement", "Precision quartz"], ["Case", "Gold-tone steel, 42 mm"], ["Crystal", "Mineral glass"], ["Bracelet", "Gold-tone steel"]]],
  ["aster-forest-leather", "Aster Forest Heritage", "Forest Heritage", "Aster", "Forest Green", 149, 189, 4.6, 73, "/product/Watches/green-leather-watch.png", "A heritage-inspired watch with a rich green dial, warm leather strap and understated polished markers.", ["S/M", "M/L"], ["Textured heritage dial", "Quick-release strap", "Water resistant to 50 m"], [["Movement", "Japanese quartz"], ["Case", "Stainless steel, 39 mm"], ["Crystal", "Hardened mineral"], ["Strap", "Brown genuine leather"]]],
  ["chronos-rose-elegance", "Chronos Rose Elegance", "Rose Elegance", "Chronos", "Rose Gold", 199, 249, 4.8, 132, "/product/Watches/rose-gold-watch.png", "An elegant rose-gold watch with a softly detailed dial, slim profile and polished bracelet for day-to-evening wear.", ["One size"], ["Slim jewellery profile", "Mother-of-pearl effect dial", "Water resistant to 30 m"], [["Movement", "Precision quartz"], ["Case", "Rose-gold steel, 36 mm"], ["Crystal", "Mineral glass"], ["Bracelet", "Adjustable rose-gold steel"]]],
].map((item) => {
  const [id, name, shortName, brand, color, price, originalPrice, rating, reviews, image, description, sizes, features, specs] = item as [string, string, string, string, string, number, number, number, number, string, string, string[], string[], string[][]];
  return {
    id,
    name,
    shortName,
    category: "Accessories" as const,
    brand,
    color,
    colors: [{ name: color, value: color.includes("Black") || color === "Graphite" ? "#262626" : color.includes("Blue") || color.includes("Cobalt") ? "#315f93" : color.includes("Green") ? "#40513b" : color.includes("Rose") ? "#b76e79" : color.includes("Gold") ? "#c7a15a" : "#d9dde2" }],
    price,
    originalPrice,
    rating,
    reviews,
    inStock: true,
    image,
    description,
    sizes,
    sizeLabel: "Strap size",
    features,
    specifications: specs.map(([label, value]) => ({ label, value })),
  } satisfies Product;
});

const electronicsProducts: Product[] = [
  ["orion-air-laptop", "Orion Air 14 Laptop", "Air 14 Laptop", "Orion", "Space Grey", 999, 1199, 4.8, 214, "/product/Electronics/orion-air-laptop.png", "A slim performance laptop with a vivid 14-inch display, all-day battery life and a quiet aluminium design built for work and creativity.", "Storage", ["512 GB", "1 TB"], ["High-resolution 14-inch display", "Up to 18 hours of battery life", "Backlit keyboard and precision trackpad"], [["Processor", "8-core performance processor"], ["Memory", "16 GB unified memory"], ["Display", "14-inch 2.5K IPS"], ["Ports", "2 × USB-C, USB-A, audio"]]],
  ["sonic-hush-headphones", "Sonic Hush ANC Headphones", "Hush ANC Headphones", "Sonic", "Matte Black", 249, 299, 4.9, 471, "/product/Electronics/sonic-hush-headphones.png", "Immersive over-ear wireless headphones with adaptive noise cancellation, plush memory-foam cushions and detailed spatial sound.", "Edition", ["Standard"], ["Adaptive active noise cancellation", "Up to 40 hours of listening", "Multipoint Bluetooth connection"], [["Drivers", "40 mm dynamic"], ["Connectivity", "Bluetooth 5.3 and 3.5 mm"], ["Charging", "USB-C fast charge"], ["Weight", "254 g"]]],
  ["sonic-roam-speaker", "Sonic Roam Bluetooth Speaker", "Roam Speaker", "Sonic", "Carbon Black", 89, 119, 4.6, 328, "/product/Electronics/sonic-roam-speaker.png", "A rugged portable speaker delivering clear, room-filling sound with simple controls and a travel-ready wrist loop.", "Edition", ["Standard"], ["360-degree balanced sound", "Up to 16 hours of playback", "Dustproof and waterproof design"], [["Output", "30 W stereo"], ["Connectivity", "Bluetooth 5.3"], ["Protection", "IP67"], ["Charging", "USB-C"]]],
  ["vector-rgb-gaming-mouse", "Vector Pulse RGB Mouse", "Pulse RGB Mouse", "Vector", "Black", 59, 79, 4.6, 164, "/product/Electronics/vector-rgb-gaming-mouse.png", "An ergonomic wired gaming mouse with a precise optical sensor, programmable controls and customisable edge lighting.", "Handedness", ["Right hand"], ["Adjustable precision sensor", "Seven programmable buttons", "Customisable RGB lighting"], [["Sensor", "16,000 DPI optical"], ["Polling rate", "1,000 Hz"], ["Connection", "Braided USB cable"], ["Weight", "92 g"]]],
  ["vector-dial-mechanical-keyboard", "Vector Dial 75 Keyboard", "Dial 75 Keyboard", "Vector", "Graphite & White", 129, 159, 4.8, 203, "/product/Electronics/vector-dial-mechanical-keyboard.png", "A compact mechanical keyboard with tactile switches, durable keycaps and a programmable rotary control for a focused desktop setup.", "Switch", ["Tactile", "Linear"], ["Compact 75% layout", "Hot-swappable mechanical switches", "Programmable control dial"], [["Connection", "USB-C and Bluetooth"], ["Keycaps", "Double-shot PBT"], ["Battery", "4,000 mAh"], ["Compatibility", "Windows, macOS and Linux"]]],
  ["luma-mirrorless-camera", "Luma M5 Mirrorless Camera", "M5 Mirrorless Camera", "Luma", "Black", 899, 1099, 4.9, 147, "/product/Electronics/luma-mirrorless-camera.png", "A compact interchangeable-lens camera combining fast autofocus, detailed stills and stabilised 4K video for creators on the move.", "Kit", ["Body only", "28–70 mm kit"], ["Fast subject-detection autofocus", "Five-axis image stabilisation", "Oversampled 4K video"], [["Sensor", "26 MP APS-C"], ["Video", "4K up to 60 fps"], ["Viewfinder", "2.36M-dot OLED"], ["Connectivity", "Wi-Fi and Bluetooth"]]],
  ["sonic-pods-earbuds", "Sonic Pods Pro", "Pods Pro", "Sonic", "Pearl White", 149, 189, 4.8, 519, "/product/Electronics/sonic-pods-earbuds.png", "Compact true-wireless earbuds with active noise cancellation, natural transparency mode and a pocket-sized wireless charging case.", "Fit", ["S/M/L tips"], ["Active noise cancellation", "Adaptive transparency mode", "Up to 30 hours with charging case"], [["Drivers", "11 mm dynamic"], ["Connectivity", "Bluetooth 5.3"], ["Protection", "IP54 sweat resistance"], ["Charging", "USB-C and wireless"]]],
].map((item) => {
  const [id, name, shortName, brand, color, price, originalPrice, rating, reviews, image, description, sizeLabel, sizes, features, specs] = item as [string, string, string, string, string, number, number, number, number, string, string, string, string[], string[], string[][]];
  return {
    id,
    name,
    shortName,
    category: "Electronics" as const,
    brand,
    color,
    colors: [{ name: color, value: color.includes("White") ? "#eeeeec" : color.includes("Grey") || color === "Graphite" ? "#55575b" : "#202124" }],
    price,
    originalPrice,
    rating,
    reviews,
    inStock: true,
    image,
    description,
    sizes,
    sizeLabel,
    features,
    specifications: specs.map(([label, value]) => ({ label, value })),
  } satisfies Product;
});

export const products: Product[] = [...clothingProducts, ...watchProducts, ...electronicsProducts];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}

export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function getDiscount(product: Product) {
  return Math.round((1 - product.price / product.originalPrice) * 100);
}
