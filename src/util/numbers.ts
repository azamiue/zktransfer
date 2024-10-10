export function formatNumber(number: number) {
  if (number >= 1e9) {
    return {
      value: Math.floor(number / 1e9),
      value2: Math.floor(
        Number(((number / 1e9) % Math.floor(number / 1e9)) * 100)
      ),
      text: "B",
    };
  }

  if (number >= 1e6) {
    return {
      value: Math.floor(number / 1e6),
      value2: Math.floor(
        Number(((number / 1e6) % Math.floor(number / 1e6)) * 100)
      ),
      text: "M",
    };
  }

  return {
    value: Math.floor(number),
    value2: Math.floor(Number((number % Math.floor(number)) * 10)),
    text: "",
  };
}
