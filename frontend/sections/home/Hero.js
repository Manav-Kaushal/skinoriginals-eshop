import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <Image
        src="https://res.cloudinary.com/skinoriginals/image/upload/v1631813562/Sample-1-web-poster.jpg"
        alt="Hero Banner SkinOriginals"
        width={3840}
        height={1008}
      />
    </div>
  );
};

export default Hero;
