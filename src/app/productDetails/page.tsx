import { redirect } from "next/navigation";
import { products } from "@/data/products";

export default function ProductDetailsPage() {
  redirect(`/productDetails/${products[0].id}`);
}
