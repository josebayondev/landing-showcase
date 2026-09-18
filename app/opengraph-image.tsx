import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — Software Developer`;

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

// Syne instanciada a peso 800 (la variable original no sirve: el renderer de
// ImageResponse se queda con la instancia por defecto y el nombre saldría
// en regular). Licencia OFL en assets/OFL.txt.
const syneExtraBold = await readFile(
  join(process.cwd(), "assets", "Syne-ExtraBold.ttf"),
);

// Mismos colores que la web en oscuro: fondo #0a0a0a, texto blanco y la "ó"
// en red-500, para que la tarjeta que se ve en LinkedIn o Slack sea
// reconociblemente la misma página.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "64px 72px",
          fontFamily: "Syne",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a1a1aa",
          }}
        >
          Software Developer
        </div>

        {/* Syne ExtraBold es muy ancha: "Jose Ignacio" no cabe en los 1056px
            útiles por encima de ~72px. Sin nowrap el renderer lo parte en dos
            líneas que empujan el resto de la tarjeta fuera del lienzo. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.05,
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ display: "flex", fontSize: 72 }}>Jose Ignacio</div>
          <div style={{ display: "flex", fontSize: 72 }}>
            <span>Bay</span>
            <span style={{ color: "#ef4444" }}>ó</span>
            <span>n</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "2px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            fontSize: 22,
            lineHeight: 1.4,
            color: "#a1a1aa",
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: syneExtraBold,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
}
