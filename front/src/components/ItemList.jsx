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
      setItemsInfo(ItemList.data);
    };
    getItemsInfo();
  }, []);
  return (
    <div className="charContainer">
      {itemsInfo?.length &&
        setItemsInfo.map((item) => {
          <ItemContainer key={item} />;
        })}
    </div>
  );
}
