import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="lg:text-center justify-center  bg-[#F1F1E8] m-0 ">
      <Image
        src={"/PetsClinic.png"}
        width={200}
        height={150}
        alt="pets"
      ></Image>
    </div>
  );
}
