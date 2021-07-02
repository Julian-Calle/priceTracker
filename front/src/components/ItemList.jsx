import React, { useEffect, useState } from "react";
import "../CSS/itemList.css";
import ItemContainer from "./ItemContainer";
import { getItems } from "../https/request.js";

export default function ItemList() {
  const [itemsInfo, setItemsInfo] = useState([]);
  useEffect(() => {
    const getItemsInfo = async () => {
      const ItemList = await getItems();
      // console.log(ItemList.data);
      console.log(ItemList);
      setItemsInfo(ItemList);
    };
    getItemsInfo();
  }, []);
  return (
    <div className="charContainer">
      {itemsInfo?.length &&
        itemsInfo.map((item) => {
          console.log(item);
          return (
            <ItemContainer
              key={item.id}
              name={item.name}
              photo={item.photo}
              timeline={item.timeline}
            />
          );
        })}
    </div>
  );
}
