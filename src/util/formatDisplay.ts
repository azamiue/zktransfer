export function formatDisplay(
  value: number,
  opts: Partial<{
    decimalToShow: number;
    locale: string;
    minimumDecimalToShow?: number;
    disableSmall?: boolean;
  }>
) {
  const decimalToShow = opts.decimalToShow ?? 5;
  const formatter = new Intl.NumberFormat(opts.locale || "en-US", {
    maximumFractionDigits: decimalToShow,
    minimumFractionDigits: opts?.minimumDecimalToShow ?? 0,
  });

  if (opts.disableSmall) {
    return formatter.format(value);
  }

  if (value > 0 && value < Math.pow(10, -decimalToShow)) {
    return `< ${formatter.format(Math.pow(10, -decimalToShow))}`;
  }

  return formatter.format(value);
}

export function renderShortAddress(address: string, chars = 4) {
  if (!address) {
    return address;
  }

  if (address.length < 4) {
    return address;
  }

  return `${address.slice(0, chars)}...${address.slice(
    address.length - chars
  )}`;
}

export function formatDisplayFloor(
  value: number,
  opts: Partial<{
    decimalToShow: number;
    locale: string;
    minimumDecimalToShow?: number;
    disableSmall?: boolean;
  }>
) {
  const decimalToShow = opts.decimalToShow ?? 5;
  const formatter = new Intl.NumberFormat(opts.locale || "en-US", {
    maximumFractionDigits: decimalToShow,
    minimumFractionDigits: opts?.minimumDecimalToShow ?? 0,
    roundingMode: "floor",
  } as any);

  return formatter.format(value);
}

export const formatAddress = (rawAddress: string) => {
  return renderShortAddress(rawAddress).toLowerCase();
};

export function numberFloor(number: number) {
  if (!number) {
    return 0;
  }

  return Math.floor(number * 100) / 100;
}
