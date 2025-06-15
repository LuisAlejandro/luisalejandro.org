import { format, parseISO } from "date-fns";

export default function FriendlyDate({ dateString }: any) {
  const date = parseISO(dateString);

  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
}
