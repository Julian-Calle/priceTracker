import React, { useState } from "react";
import PriceChart from "./PriceChart";
import "../CSS/itemContainer.css";

export default function ItemContainer() {
  const [activeChart, setActiveChart] = useState("hide");
  const [activephoto, setActivePhoto] = useState("");

  const showChart = () => {
    setActiveChart("");
    setActivePhoto("hide");
  };

  const hideChart = () => {
    console.log("hola");
    setActiveChart("hide");
    setActivePhoto("");
  };
  return (
    <div className="singleItem">
      <img
        className={activephoto}
        onClick={showChart}
        src="https://source.unsplash.com/random/600x400"
        alt="item"
      />
      <PriceChart optionClass={activeChart} hideChart={hideChart} />
      <div className="itemInformation">
        <h1> nombre del item</h1>
        <h3>Precio actual: 400$</h3>
      </div>
    </div>
  );
}
