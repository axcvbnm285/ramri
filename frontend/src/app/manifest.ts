import type { MetadataRoute } from "next";

import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | Fashion for Every You`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/shop",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#db2777",
    icons: [
      {
        src: "/logo.png",
        sizes: "1254x1254",
        type: "image/png",
      },
    ],
  };
}
