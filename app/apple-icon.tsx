import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <div
          style={{
            width: 156,
            height: 156,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 44,
            backgroundColor: "#fff7f0",
            border: "6px solid rgba(255, 106, 0, 0.18)"
          }}
        >
          <div
            style={{
              fontSize: 112,
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
