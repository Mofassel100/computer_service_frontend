"use client";
import Image from "next/image";
import Notimage from "@/assats/image/404-image.png";

const NotFound = () => {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={Notimage} width={500} alt="404-image" />
    </div>
  );
};

export default NotFound;
