import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Berlin En Salsa - Salsa-Festival in Berlin";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation - using same content as opengraph-image.tsx
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#ff1200", // bes-red
          backgroundImage: "linear-gradient(to bottom right, #ff1200, #8a0600)",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background pattern elements would go here */}
        </div>

        {/* Logo and text container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* We'll use text for the logo since we can't fetch external images in edge runtime */}
          <div
            style={{
              fontSize: 100,
              fontWeight: "bold",
              color: "#ffdfa8", // bes-amber
              marginBottom: 20,
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            BERLIN EN SALSA
          </div>

          <div
            style={{
              fontSize: 42,
              fontWeight: "medium",
              color: "#ffffff",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            Salsa-Festival in Berlin
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#ffdfa8", // bes-amber
              marginTop: 30,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Musik • Tanz • Kultur
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: "medium",
              color: "#ffffff",
            }}
          >
            berlinensalsa.de
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
