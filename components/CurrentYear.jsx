"use client";

import { useEffect, useState } from "react";

/**
 * The copyright year.
 *
 * Pages are statically pre-rendered, so a build-time `new Date()` would freeze
 * the year until the next deploy — a site built in December still says the old
 * year every January. Rendered from the build on the server for crawlers, then
 * corrected on the client if the year has since rolled over.
 */
export function CurrentYear({ buildYear = new Date().getFullYear() }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    const current = new Date().getFullYear();
    if (current !== buildYear) setYear(current);
  }, [buildYear]);

  return <span suppressHydrationWarning>{year}</span>;
}
