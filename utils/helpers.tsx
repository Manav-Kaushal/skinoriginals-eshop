export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const convertToINR = (value: number | bigint) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);

export const cls = (input: string) =>
  input
    .replace(/\s+/gm, " ")
    .split(" ")
    .filter((cond) => typeof cond === "string")
    .join(" ")
    .trim();

export const reducer = (array: any[], keys: any[]) =>
  array.map((o) =>
    keys.reduce((acc, curr) => {
      acc[curr] = o[curr];
      return acc;
    }, {})
  );
