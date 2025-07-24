import React from "react";
import Carousel from "./Carousel";
import DayOffer from "./DayOffer";
import Card from "./Card";
import Categories from "./Categories";
import ThisMonth from "./ThisMonth";
import Publicite from "./Publicite";
import PlusServices from "./PlusServices";
import Featured from "./Featured";
import OurProducts from "./OurProducts";
import Footer from "./Footer";

export default function Content() {
  return (
    <>
      <div className="container mx-auto px-4">
        <Carousel />
        <DayOffer />
        <Card />
        <div className="container mx-auto border-b border-gray-200 my-8"></div>
        <Categories />
        <div className="container mx-auto border-b border-gray-200 mb-10 "></div>
        <ThisMonth />
        <Publicite />
        <OurProducts />
        <Featured />
        <PlusServices />
      </div>
      <Footer />
    </>
  );
}
