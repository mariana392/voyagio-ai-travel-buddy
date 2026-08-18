import { createTheme, alpha } from "@mui/material/styles";

// ─── Palette — Voyagio brand palette ─────────────────────────────────────────
export const CREAM      = "#FAF7F2";   // Off White — main background
export const CREAM_CARD = "#FAF7F2";   // card tint
export const SAGE       = "#E6EFE6";   // Sage Green — alt-section surface
export const FOREST     = "#163B2E";   // Forest Green — primary brand
export const FOREST_MID = "#2D5C40";   // hover state
export const MOSS       = "#71A577";   // Leaf Green — accent
export const SAND       = "#EADDB8";   // Warm Sand
export const SEAFOAM    = "#CFE0DA";   // Seafoam Blue
export const TEXT1      = "#1A2B22";   // Dark Charcoal
export const TEXT2      = "#6B7280";   // Mid Gray
export const LIGHT_GRAY = "#F1F3F2";
export const SURF       = "#FFFFFF";

// ─── Grain noise overlay (SVG feTurbulence) ───────────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: FOREST, light: FOREST_MID, dark: "#0E2019", contrastText: SURF },
    background: { default: CREAM, paper: SURF },
    text: { primary: TEXT1, secondary: TEXT2 },
    divider: alpha(FOREST, 0.08),
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, lineHeight: 1.14, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body": { backgroundColor: CREAM },
        "body::after": {
          content: '""',
          position: "fixed",
          inset: 0,
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.028,
          pointerEvents: "none",
          zIndex: 9999,
        },
      },
    },
    MuiButton: {
      defaultProps: { variant: "contained", disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          borderRadius: 100,
          fontSize: "0.9375rem",
          transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
          "&:hover": { transform: "translateY(-2px)" },
        },
        sizeLarge: { padding: "14px 34px", fontSize: "1.0rem" },
        containedPrimary: {
          backgroundColor: FOREST,
          boxShadow: `0 2px 10px ${alpha(FOREST, 0.22)}`,
          "&:hover": {
            backgroundColor: FOREST_MID,
            boxShadow: `0 6px 20px ${alpha(FOREST, 0.3)}`,
          },
        },
        outlinedPrimary: {
          borderColor: alpha(FOREST, 0.22),
          color: FOREST,
          backgroundColor: SURF,
          "&:hover": { borderColor: FOREST, backgroundColor: SURF },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 100,
            backgroundColor: SURF,
            "& fieldset": { borderColor: alpha(FOREST, 0.16) },
            "&:hover fieldset": { borderColor: alpha(FOREST, 0.32) },
            "&.Mui-focused fieldset": { borderColor: FOREST, borderWidth: 1.5 },
          },
          "& .MuiInputLabel-root.Mui-focused": { color: FOREST },
          "& .MuiOutlinedInput-input": { color: TEXT1, paddingLeft: "20px" },
          "& .MuiInputLabel-outlined": { paddingLeft: "8px" },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink": { paddingLeft: 0 },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: SURF,
          boxShadow: "none",
          border: `1px solid ${alpha(FOREST, 0.08)}`,
          borderRadius: 20,
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          "&:hover": {
            boxShadow: `0 12px 40px ${alpha(FOREST, 0.1)}`,
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: `0 1px 0 ${alpha(FOREST, 0.07)}`,
          backgroundColor: CREAM,
          color: TEXT1,
        },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, letterSpacing: "-0.01em" } },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 100, height: 6, backgroundColor: alpha(FOREST, 0.08) },
        bar: { borderRadius: 100, backgroundColor: MOSS },
      },
    },
  },
});
