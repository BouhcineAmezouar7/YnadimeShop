import React from "react";
import Carousel from "./Carousel";
import DayOffer from "./DayOffer";
import Card from "./Card";
import ThisMonth from "./ThisMonth";
import Publicite from "./Publicite";
import PlusServices from "./PlusServices";
import Featured from "./Featured";
import OurProducts from "./OurProducts";
import Categories from "./Categories";
import ElectronicsSpotlight from "./ElectronicsSpotlight";

const Content = React.memo(function Content() {
  return (
    <div className="w-full min-w-0 bg-white">
      <Carousel />
      <div className="flex flex-col pb-12">
        <section className="min-w-0">
          <DayOffer />
          <Card />
        </section>
        <Categories />
        <ThisMonth />
        <ElectronicsSpotlight />
        <Publicite />
        <OurProducts />
        <Featured />
        <PlusServices />
      </div>
    </div>
  );
});

export default Content;
