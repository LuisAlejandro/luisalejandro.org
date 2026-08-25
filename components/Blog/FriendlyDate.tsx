"use client";

import { format, parseISO } from "date-fns";
import { useSyncExternalStore } from "react";

export default function FriendlyDate({ dateString }: any) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const date = parseISO(dateString);

  if (!mounted) {
    return <time dateTime={dateString}></time>;
  }

  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
}
