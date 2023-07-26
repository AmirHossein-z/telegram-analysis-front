// source: https://stackblitz.com/edit/js-frh6gd?file=formatNumber.js

const formatNumber = (num: number, precision = 2) => {
  const map = [
    { suffix: "T", threshold: 1e12 }, // 1e12 -> 1_000_000_000_000
    { suffix: "B", threshold: 1e9 }, // 1e9 -> 1_000_000_000
    { suffix: "M", threshold: 1e6 }, // 1e6 -> 1_000_000
    { suffix: "K", threshold: 1e3 }, // 1e3 -> 1000
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
};

export default formatNumber;
