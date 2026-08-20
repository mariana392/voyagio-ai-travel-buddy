import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

// ─── Organic blob SVG ─────────────────────────────────────────────────────────
export function Blob({ color, sx }: { color: string; sx?: object }) {
  // Background blobs disabled by request — keep API for existing call sites.
  void color;
  void sx;
  void Box;
  return null;
}

// ─── SafeThemeProvider — absorbs Figma inspector data-* props ────────────────
export function SafeThemeProvider({ children, ...rest }: { children: React.ReactNode; [k: string]: unknown }) {
  void rest;
  return React.createElement(ThemeProvider, { theme }, children);
}

// ─── SVG filter — removes solid black background from the mascot PNG ─────────
export function RemoveBlackFilter() {
  return (
    <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <filter id="remove-black" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    3 3 3 0 -0.12"
          />
        </filter>
      </defs>
    </svg>
  );
}
