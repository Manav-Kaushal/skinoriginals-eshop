export const prod = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const company = {
  name: "SkinOriginals",
  url: "https://skingoriginals.in",
};

export const cloudinary = {
  cloudName: "skinoriginals",
  apiBaseDeliveryUrl: "https://res.cloudinary.com/skinoriginals/image/upload",
  baseParameters: "fl_lossy,q_auto",
};

export const defaultSEO = {
  robots: prod ? "index,follow" : "noindex,nofollow",
};
