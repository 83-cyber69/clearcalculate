import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

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
          backgroundColor: "#ffffff",
          borderRadius: 128
        }}
      >
        <div
          style={{
            width: 420,
            height: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 120,
            backgroundColor: "#fff7f0",
            border: "10px solid rgba(255, 106, 0, 0.18)"
          }}
        >
          <div
            style={{
              fontSize: 300,
              fontWeight: 800,
              lineHeight: 1,
              color: "#ff6a00",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji"
            }}
          >
            C
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
