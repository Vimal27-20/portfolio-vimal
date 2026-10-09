import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-IE", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Dublin" });

/** Local time in Ireland, where Vimal works from; ticks once a minute. */
export function useDublinTime() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}
