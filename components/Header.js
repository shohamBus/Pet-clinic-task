import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className=" text-center justify-center xs:text-center bg-[#F1F1E8] m-0 w-full ">
      <Image
        src={"/PetsClinic.png"}
        width={200}
        height={150}
        alt="pets"
      ></Image>
    </div>
  );
}
