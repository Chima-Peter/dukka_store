import { format } from "date-fns";

const addOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`; // Covers 11th to 19th
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
};

const formatCustomDate = (date: Date) => {
  const day = addOrdinalSuffix(parseInt(format(date, "d"))); // Get day with suffix
  return `${day} ${format(date, "MMMM, yyyy. h:mma")}`; // Format the rest
};

export default formatCustomDate