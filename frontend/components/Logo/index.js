import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Logo = ({ desktop, mobile }) => {
  return (
    <>
      {mobile && (
        <div className="lg:hidden">
          <Link href="/" passHref>
            <div className="relative w-32 h-12">
              <Image
                src="https://res.cloudinary.com/skinoriginals/image/upload/v1633850784/Logo-Skinorignals.png"
                alt="SkinOriginals Logo"
                layout="fill"
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>
      )}
      {desktop && (
        <div className="hidden lg:flex lg:items-center">
          <Link href="/" passHref>
            <div className="relative w-32 h-12">
              <Image
                src="https://res.cloudinary.com/skinoriginals/image/upload/v1633850784/Logo-Skinorignals.png"
                alt="SkinOriginals Logo"
                layout="fill"
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};
