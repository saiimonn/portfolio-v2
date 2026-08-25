import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background: "#121212",
          color: "#FFFFF0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, opacity: 0.6 }}>saiimonn.vercel.app</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>
            Simon Gabriel Gementiza
          </div>
          <div style={{ display: "flex", fontSize: 40, opacity: 0.7, marginTop: 20 }}>
            Full-Stack Developer — Web Development • Machine Learning
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
