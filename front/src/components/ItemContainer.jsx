import React, { useState } from "react";
import PriceChart from "./PriceChart";
import "../CSS/itemContainer.css";

export default function ItemContainer({ name, photo, timeline }) {
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
  console.log(timeline[timeline.length - 1]);
  return (
    <div className="singleItem">
      <img className={activephoto} onClick={showChart} src={photo} alt="item" />
      <PriceChart optionClass={activeChart} hideChart={hideChart} />
      <div className="itemInformation">
        <h1> {name}</h1>
        <h3>{`${timeline[timeline.length - 1].price} €`}</h3>
      </div>
    </div>
  );
}
