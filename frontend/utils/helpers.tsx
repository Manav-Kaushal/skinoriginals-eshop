export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const convertToINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export const cls = (input) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond) => typeof cond === "string")
    .join(" ")
    .trim();

export const reducer = (array, keys) =>
  array.map((o) =>
    keys.reduce((acc, curr) => {
      acc[curr] = o[curr];
      return acc;
    }, {})
  );
