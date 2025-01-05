import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen">
      <h2>Gallery</h2>

      <div className="grid grid-cols-4">
        <Image src="/gallery/1.jpg" width={1920} height={1080}></Image>
      </div>
    </div>
  );
};

export default page;
