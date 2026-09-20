import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };

export const contentType = "image/png";

// Misma instancia que app/opengraph-image.tsx (Syne a peso 800: la variable
// original se queda en la instancia por defecto y saldría en regular).
const syneExtraBold = await readFile(
  join(process.cwd(), "assets", "Syne-ExtraBold.ttf"),
);

// Mismo logo que el navbar (components/navbar.tsx): "JI" en blanco y la "B"
// en red-500, sobre el fondo oscuro del sitio, para que la pestaña del
// navegador sea reconociblemente la misma marca en vez del triángulo por
// defecto de Next.js.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          fontFamily: "Syne",
          fontSize: 24,
          color: "#ffffff",
        }}
      >
        JI
        <span style={{ color: "#ef4444" }}>B</span>
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
