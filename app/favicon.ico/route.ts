import { NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import React from "react";

export const dynamic = "force-static";

export async function GET() {
  const response = new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff"
        }
      },
      React.createElement(
        "div",
        {
          style: {
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9,
            backgroundColor: "#fff7f0",
            border: "2px solid rgba(255, 106, 0, 0.22)"
          }
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: 20,
              fontWeight: 900,
              lineHeight: 1,
              color: "#ff6a00",
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji"
            }
          },
          "C"
        )
      )
    ),
    {
      width: 32,
      height: 32
    }
  );

  const arrayBuffer = await response.arrayBuffer();
  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
