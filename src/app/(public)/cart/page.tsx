"use client";
import CartService from "@/components/CartDetail/CartService";
import { useEffect, useState } from "react";
const Cart = () => {
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    // Fetch or load your data and dispatch actions to set the state
    const storedServiceCart = localStorage.getItem("service-cart");
    if (storedServiceCart) {
      const parsedServiceCart = JSON.parse(storedServiceCart);
      setServiceData(parsedServiceCart);
    }
  }, [serviceData]);

  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {<CartService serviceData={serviceData}></CartService>}
    </div>
  );
};

export default Cart;
