"use client";

import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export default function FriendlyDate({ dateString }: any) {
  const [mounted, setMounted] = useState(false);
  const date = parseISO(dateString);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <time dateTime={dateString}></time>;
  }

  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
}
