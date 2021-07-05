import React from "react";
// import "../CSS/item.css";

export default function Item({
  photo,
  name,
  timeline,
  showChart,
  activephoto,
}) {
  return (
    <div className={`${activephoto} itemInfo`} onClick={showChart}>
      <img src={photo} alt={name} />

      <h2> {name}</h2>
      <h3>{`${timeline[timeline.length - 1].price} €`}</h3>
    </div>
  );
}
