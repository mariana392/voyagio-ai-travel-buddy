import React from "react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

// ─── Organic blob SVG ─────────────────────────────────────────────────────────
export function Blob({ color, sx }: { color: string; sx?: object }) {
  return (
    <Box component="svg" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg"
      sx={{ position: "absolute", pointerEvents: "none", ...sx }}
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M300,50 C420,20 560,120 560,250 C560,380 440,470 300,460 C160,450 40,370 40,250 C40,130 180,80 300,50Z"
      />
    </Box>
  );
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
