import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import mascotAsset from "@/assets/benny-landing.png.asset.json";
import { CREAM, CREAM_CARD, SAGE, FOREST, FOREST_MID, MOSS, SAND, TEXT1, TEXT2, SURF } from "@/voyagio/theme";
import { Blob, SafeThemeProvider, RemoveBlackFilter } from "@/voyagio/shared";

const mascotImg = mascotAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voyagio — Plan group trips with an AI travel assistant" },
      { name: "description", content: "Voyagio keeps your group's route, budget, votes and tasks in one place, with an AI assistant that plans the trip with you." },
      { property: "og:title", content: "Voyagio — Plan group trips with an AI travel assistant" },
      { property: "og:description", content: "Route, budget, votes and tasks in one shared space for groups of friends." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

// ─── Floating photo card ──────────────────────────────────────────────────────
function FloatingPhoto({
  photoId, label, rotate, sx,
}: {
  photoId: string; label: string; rotate: number;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: 130,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: `0 12px 32px ${alpha(FOREST, 0.18)}`,
        transform: `rotate(${rotate}deg)`,
        animation: `floatY${rotate > 0 ? "A" : "B"} 5s ease-in-out infinite`,
        bgcolor: SURF,
        border: `1px solid ${alpha(FOREST, 0.07)}`,
        "@keyframes floatYA": {
          "0%,100%": { transform: `rotate(${rotate}deg) translateY(0px)` },
          "50%": { transform: `rotate(${rotate}deg) translateY(-10px)` },
        },
        "@keyframes floatYB": {
          "0%,100%": { transform: `rotate(${rotate}deg) translateY(0px)` },
          "50%": { transform: `rotate(${rotate}deg) translateY(10px)` },
        },
        ...sx,
      }}
    >
      <Box
        component="img"
        src={`https://images.unsplash.com/${photoId}?w=260&h=180&fit=crop&auto=format`}
        alt={label}
        sx={{ width: "100%", height: 90, objectFit: "cover", display: "block" }}
      />
      <Box sx={{ px: 1.25, py: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
          <LocationOnOutlinedIcon sx={{ fontSize: 11, color: TEXT2 }} />
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 600, color: TEXT2, lineHeight: 1 }}>
            {label}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

// ─── Product preview mock ─────────────────────────────────────────────────────
function ProductPreview() {
  const items = [
    { day: "Day 1", label: "Arrival & dinner at El Xampanyet", done: true },
    { day: "Day 2", label: "Sagrada Família morning tour", done: false, active: true },
    { day: "Day 3", label: "Park Güell & Gràcia neighbourhood", done: false },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${alpha(FOREST, 0.1)}`,
        borderRadius: "24px",
        overflow: "hidden",
        width: "100%",
        maxWidth: 420,
        bgcolor: SURF,
        boxShadow: `0 24px 60px ${alpha(FOREST, 0.14)}`,
        mx: "auto",
      }}
    >
      {/* header */}
      <Box sx={{ px: 3, pt: 3, pb: 2.5, borderBottom: `1px solid ${alpha(FOREST, 0.07)}`, bgcolor: CREAM_CARD }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: TEXT2 }}>
              Current Trip
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.3, lineHeight: 1.25, color: TEXT1 }}>
              Barcelona, Sept. 2025
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: TEXT2, mt: 0.2 }}>
              6 Travellers · 7 Days
            </Typography>
          </Box>
          <Box sx={{ width: 44, height: 44, borderRadius: 3, bgcolor: alpha(FOREST, 0.08), display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FlightTakeoffIcon sx={{ fontSize: 20, color: FOREST }} />
          </Box>
        </Stack>
      </Box>

      {/* itinerary */}
      <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${alpha(FOREST, 0.07)}` }}>
        <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: TEXT2, mb: 1.5, display: "block" }}>
          Itinerary
        </Typography>
        <Stack spacing={1}>
          {items.map((item) => (
            <Stack
              key={item.day}
              direction="row"
              alignItems="center"
              gap={1.5}
              sx={{
                px: 1.5, py: 1.1, borderRadius: "12px",
                bgcolor: item.active ? alpha(MOSS, 0.1) : "transparent",
                border: item.active ? `1px solid ${alpha(MOSS, 0.3)}` : "1px solid transparent",
              }}
            >
              {item.done
                ? <CheckCircleIcon sx={{ fontSize: 17, color: MOSS, flexShrink: 0 }} />
                : <RadioButtonUncheckedIcon sx={{ fontSize: 17, color: item.active ? FOREST : alpha(FOREST, 0.22), flexShrink: 0 }} />
              }
              <Box>
                <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: TEXT2 }}>
                  {item.day}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", color: item.done ? TEXT2 : TEXT1, textDecoration: item.done ? "line-through" : "none", lineHeight: 1.3 }}>
                  {item.label}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* budget */}
      <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${alpha(FOREST, 0.07)}` }}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={1}>
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: TEXT2 }}>
            Group Budget
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: FOREST }}>
            2.840 € / 3.000 €
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={94.7} />
        <Typography sx={{ fontSize: "0.7rem", color: TEXT2, mt: 0.75 }}>
          €160 remaining · split across 6 people
        </Typography>
      </Box>

      {/* vote */}
      <Box sx={{ px: 3, py: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: TEXT2 }}>
            Group Vote
          </Typography>
          <Chip label="4 / 6 voted" size="small" sx={{ height: 20, fontSize: "0.67rem", bgcolor: alpha(MOSS, 0.12), color: FOREST_MID }} />
        </Stack>
        <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: "0.875rem", color: TEXT1 }}>
          Day 4: Beach or Mountains?
        </Typography>
        {[{ label: "🏖  Beach", pct: 67, votes: 4 }, { label: "🏔  Mountains", pct: 33, votes: 2 }].map((o) => (
          <Stack key={o.label} direction="row" alignItems="center" gap={1.5} mb={0.75}>
            <Typography sx={{ width: 100, fontSize: "0.8rem", flexShrink: 0 }}>{o.label}</Typography>
            <Box sx={{ flex: 1, height: 6, borderRadius: 100, bgcolor: alpha(FOREST, 0.07), overflow: "hidden" }}>
              <Box sx={{ height: "100%", width: `${o.pct}%`, bgcolor: FOREST, borderRadius: 100 }} />
            </Box>
            <Typography sx={{ width: 12, textAlign: "right", fontSize: "0.8rem", color: TEXT2 }}>{o.votes}</Typography>
          </Stack>
        ))}
      </Box>
    </Paper>
  );
}

// ─── Email CTA ────────────────────────────────────────────────────────────────
function EmailCta({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ width: "100%", maxWidth: 480 }}>
      <TextField
        id={id}
        type="email"
        label="Your email address"
        variant="outlined"
        size="medium"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ flex: 1 }}
        inputProps={{ "aria-label": "Email address for early access" }}
      />
      <Button color="primary" size="large" sx={{ flexShrink: 0 }}>
        Get Early Access
      </Button>
    </Stack>
  );
}

// ─── Benefit card ─────────────────────────────────────────────────────────────
function BenefitCard({
  icon, title, body, photoId, photoAlt,
}: {
  icon: React.ReactNode; title: string; body: string; photoId: string; photoAlt: string;
}) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* photo header */}
      <Box sx={{ height: 180, overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
        <Box
          component="img"
          src={`https://images.unsplash.com/${photoId}?w=600&h=360&fit=crop&auto=format`}
          alt={photoAlt}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease", ".MuiCard-root:hover &": { transform: "scale(1.04)" } }}
        />
      </Box>

      <CardContent sx={{ p: { xs: 3, md: 3.5 }, flex: 1, "&:last-child": { pb: { xs: 3, md: 3.5 } } }}>
        <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: alpha(MOSS, 0.12), display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h6" component="h3" sx={{ mb: 1, fontSize: "1.05rem", color: TEXT1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: TEXT2, lineHeight: 1.7 }}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ─── Step ─────────────────────────────────────────────────────────────────────
function Step({ n, title, body, photoId }: { n: string; title: string; body: string; photoId: string }) {
  return (
    <Stack gap={3} sx={{ flex: 1 }}>
      <Stack direction="row" alignItems="flex-start" gap={2.5}>
        {/* circle number */}
        <Box sx={{
          width: 48, height: 48, borderRadius: "50%",
          bgcolor: FOREST, color: SURF,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          boxShadow: `0 4px 14px ${alpha(FOREST, 0.25)}`,
        }}>
          <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>{n}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" component="h3" sx={{ mb: 0.75, fontSize: "1.05rem", color: TEXT1 }}>{title}</Typography>
          <Typography variant="body2" sx={{ color: TEXT2, lineHeight: 1.7 }}>{body}</Typography>
        </Box>
      </Stack>
      {/* destination photo */}
      <Box sx={{
        height: 140, borderRadius: "16px", overflow: "hidden",
        boxShadow: `0 4px 20px ${alpha(FOREST, 0.1)}`,
      }}>
        <Box
          component="img"
          src={`https://images.unsplash.com/${photoId}?w=520&h=280&fit=crop&auto=format`}
          alt={title}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </Box>
    </Stack>
  );
}

// ─── Mascot widget ────────────────────────────────────────────────────────────
function MascotWidget() {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1300,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {/* Speech bubble */}
      {open && (
        <Paper
          elevation={0}
          sx={{
            mb: 0.5,
            p: 2.5,
            width: 224,
            borderRadius: "20px 20px 4px 20px",
            border: `1px solid ${alpha(FOREST, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(FOREST, 0.14)}`,
            bgcolor: SURF,
            position: "relative",
            transformOrigin: "bottom right",
            animation: "bubblePop 0.38s cubic-bezier(.34,1.56,.64,1) both",
            "@keyframes bubblePop": {
              "0%":   { opacity: 0, transform: "scale(0.65) translateY(14px)" },
              "100%": { opacity: 1, transform: "scale(1)    translateY(0)" },
            },
          }}
        >
          <IconButton
            size="small"
            aria-label="Close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute", top: 8, right: 8,
              width: 22, height: 22,
              bgcolor: alpha(FOREST, 0.06),
              "&:hover": { bgcolor: alpha(FOREST, 0.12) },
            }}
          >
            <CloseIcon sx={{ fontSize: 13, color: TEXT2 }} />
          </IconButton>

          <Typography sx={{ fontWeight: 700, fontSize: "0.875rem", color: TEXT1, mb: 0.75, pr: 2.5, lineHeight: 1.3 }}>
            Hi! I'm Benny 👋
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: TEXT2, lineHeight: 1.55, mb: 2 }}>
            Ready to plan your next trip? I'll help your group every step of the way!
          </Typography>
          <Button component={Link} to="/plan" size="small" sx={{ fontSize: "0.78rem", px: 2, py: 0.75, width: "100%" }}>
            Start Planning
          </Button>
        </Paper>
      )}

      {/*
        Outer box — hip sway pivoting from feet (transformOrigin bottom-center).
        Gives the "butt wiggle" effect.
      */}
      <Box
        onClick={() => setOpen((v) => !v)}
        sx={{
          cursor: "pointer",
          width: 140,
          transformOrigin: "bottom center",
          animation: "bennyHip 1.9s ease-in-out infinite",
          "@keyframes bennyHip": {
            "0%,100%": { transform: "rotate(0deg)"  },
            "18%":     { transform: "rotate(-7deg)" },
            "36%":     { transform: "rotate(9deg)"  },
            "54%":     { transform: "rotate(-6deg)" },
            "72%":     { transform: "rotate(5deg)"  },
            "88%":     { transform: "rotate(-2deg)" },
          },
          "&:hover": { "& *": { animationPlayState: "paused" } },
        }}
      >
        {/*
          Inner box — vertical bounce + tiny squash-stretch.
          Runs at a different period to the hip sway so the
          combined motion stays unpredictable and lively.
          The already-raised paw in the image + the rotation
          of the outer box creates a convincing wave effect.
        */}
        <Box
          sx={{
            transformOrigin: "bottom center",
            animation: "bennyBounce 1.3s ease-in-out infinite",
            "@keyframes bennyBounce": {
              "0%,100%": { transform: "translateY(0px)  scale(1,1)"      },
              "25%":     { transform: "translateY(-11px) scale(1.03,1.04)" },
              "50%":     { transform: "translateY(-4px)  scale(0.99,0.98)" },
              "75%":     { transform: "translateY(-9px)  scale(1.02,1.03)" },
            },
          }}
        >
          <Box
            component="img"
            src={mascotImg}
            alt="Benny, your trip-planning assistant"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              /* Remove black background: A_out = 3R+3G+3B−0.12
                 black(0,0,0)→0  dark-teal(0.10,0.24,0.19)→1.41→1 */
              filter: `url(#remove-black) drop-shadow(0 14px 28px ${alpha(FOREST, 0.22)})`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function LandingPage() {
  return (
    <SafeThemeProvider>
      <CssBaseline />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <AppBar position="sticky" elevation={0} component="header">
        <Toolbar sx={{ minHeight: { xs: 62, sm: 70 }, px: { xs: 2.5, sm: 5 } }}>
          <Typography
            variant="h6"
            component="a"
            href="/"
            aria-label="Voyagio home"
            sx={{ textDecoration: "none", color: TEXT1, fontWeight: 800, letterSpacing: "-0.04em", fontSize: { xs: "1.15rem", sm: "1.25rem" }, flex: 1 }}
          >
            Voyagio
          </Typography>
          <Button component={Link} to="/plan" size="medium" sx={{ px: 3 }}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main">

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <Box
          component="section"
          aria-labelledby="hero-heading"
          sx={{ position: "relative", overflow: "hidden", pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 }, bgcolor: CREAM }}
        >
          {/* background blobs */}
          <Blob color={SAGE} sx={{ width: 700, top: -120, right: -200, opacity: 0.7 }} />
          <Blob color={alpha(SAND, 0.45)} sx={{ width: 400, bottom: -80, left: -100 }} />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 8, md: 8 },
              alignItems: "center",
            }}>
              {/* copy */}
              <Box>
                <Chip
                  label="Coming this summer"
                  size="small"
                  sx={{ mb: 3.5, bgcolor: alpha(FOREST, 0.08), color: FOREST, fontWeight: 700, fontSize: "0.8rem", height: 30, letterSpacing: "-0.01em" }}
                />
                <Typography
                  id="hero-heading"
                  variant="h1"
                  component="h1"
                  sx={{ fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4rem" }, color: TEXT1, mb: 2.5 }}
                >
                  Plan your trip.<br />
                  Not the chat.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: TEXT2, mb: 5, maxWidth: 430, fontSize: { xs: "1rem", md: "1.09rem" }, lineHeight: 1.7 }}
                >
                  Organisation, clarity and shared ownership — for groups who'd rather enjoy their trip than coordinate it.
                </Typography>
                <EmailCta id="hero-email" />

                {/* social proof avatars */}
                <Stack direction="row" alignItems="center" gap={1.5} mt={4}>
                  <Stack direction="row" sx={{ "& > *:not(:first-of-type)": { ml: -1 } }}>
                    {["#6DAA72", "#2D5C40", "#1A3829", "#MOSS"].map((c, i) => (
                      <Box key={i} sx={{
                        width: 32, height: 32, borderRadius: "50%",
                        bgcolor: i === 0 ? "#6DAA72" : i === 1 ? "#2D5C40" : i === 2 ? "#8BAF7A" : "#C4D9A8",
                        border: `2px solid ${CREAM}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <PeopleOutlinedIcon sx={{ fontSize: 14, color: SURF }} />
                      </Box>
                    ))}
                  </Stack>
                  <Typography sx={{ fontSize: "0.82rem", color: TEXT2 }}>
                    <Box component="span" sx={{ fontWeight: 700, color: TEXT1 }}>12,000+</Box> groups planning their next adventure
                  </Typography>
                </Stack>
              </Box>

              {/* hero visual */}
              <Box sx={{ position: "relative", display: "flex", justifyContent: { xs: "center", md: "flex-end" }, minHeight: { xs: "auto", md: 520 }, alignItems: "center" }}>
                {/* floating photos — visible on md+ */}
                <FloatingPhoto
                  photoId="photo-1529156069898-49953e39b3ac"
                  label="Friends trip"
                  rotate={-4}
                  sx={{ display: { xs: "none", md: "block" }, top: 16, left: -24, zIndex: 2 }}
                />
                <FloatingPhoto
                  photoId="photo-1507525428034-b723cf961d3e"
                  label="Beach, Maldives"
                  rotate={3}
                  sx={{ display: { xs: "none", md: "block" }, bottom: 24, right: -20, zIndex: 2 }}
                />

                {/* product card */}
                <Box sx={{ position: "relative", zIndex: 3, width: "100%", maxWidth: 420 }}>
                  <ProductPreview />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ── Benefits ───────────────────────────────────────────────────────── */}
        <Box
          component="section"
          aria-labelledby="benefits-heading"
          sx={{ py: { xs: 9, md: 13 }, bgcolor: SURF, borderTop: `1px solid ${alpha(FOREST, 0.06)}`, borderBottom: `1px solid ${alpha(FOREST, 0.06)}` }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mb: { xs: 6, md: 9 }, maxWidth: 520 }}>
              <Typography
                id="benefits-heading"
                variant="h2"
                component="h2"
                sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" }, color: TEXT1, mb: 1.5 }}
              >
                Group travel without the chaos
              </Typography>
              <Typography variant="body1" sx={{ color: TEXT2 }}>
                Route in Google Docs. Budget in a spreadsheet. Tickets by email. Votes on WhatsApp. Voyagio brings it all into one place.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 3 }}>
              <BenefitCard
                icon={<MapOutlinedIcon sx={{ fontSize: 24, color: FOREST }} />}
                title="One place for everything"
                body="Route, budget, tasks and decisions — at a glance, instead of scattered across Docs, spreadsheets and group chats."
                photoId="photo-1488646953014-85cb44e25828"
                photoAlt="Travel planning with a map"
              />
              <BenefitCard
                icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 24, color: FOREST }} />}
                title="An AI assistant that actually helps"
                body="Builds your itinerary, suggests alternatives, optimises the budget, sets reminders and prepares checklists. Less effort, less stress."
                photoId="photo-1467269204594-9661b134dd2b"
                photoAlt="City exploration"
              />
              <BenefitCard
                icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: 24, color: FOREST }} />}
                title="Everyone stays in the loop"
                body="Plan routes together, vote fairly, split costs and share tasks — so one person isn't carrying the whole trip on their shoulders."
                photoId="photo-1539635278303-d4002c07eae3"
                photoAlt="Group of friends travelling"
              />
            </Box>
          </Container>
        </Box>

        {/* ── How it works ───────────────────────────────────────────────────── */}
        <Box
          component="section"
          aria-labelledby="how-heading"
          sx={{ py: { xs: 9, md: 13 }, bgcolor: SAGE, position: "relative", overflow: "hidden" }}
        >
          {/* subtle blob decoration */}
          <Blob color={alpha(FOREST, 0.04)} sx={{ width: 600, top: -150, right: -180 }} />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ mb: { xs: 6, md: 9 }, maxWidth: 480 }}>
              <Typography
                id="how-heading"
                variant="h2"
                component="h2"
                sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" }, color: TEXT1, mb: 1.5 }}
              >
                How it works
              </Typography>
              <Typography variant="body1" sx={{ color: TEXT2 }}>
                From the first message to the last day of your trip — in three steps.
              </Typography>
            </Box>

            {/* steps grid */}
            <Box sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: { xs: 5, md: 5 },
            }}>
              <Step
                n="01"
                title="Create your trip"
                body="Set a destination, dates and budget, then invite your friends. Voyagio builds a shared space for everyone instantly."
                photoId="photo-1472214103451-9374bd1c798e"
              />
              <Step
                n="02"
                title="Plan together"
                body="Itinerary, budget, votes and tasks — all in one place. Everyone contributes, no one gets left out."
                photoId="photo-1529156069898-49953e39b3ac"
              />
              <Step
                n="03"
                title="Enjoy the trip"
                body="Less organising. More experiencing."
                photoId="photo-1507525428034-b723cf961d3e"
              />
            </Box>
          </Container>
        </Box>

        {/* ── Final CTA ──────────────────────────────────────────────────────── */}
        <Box
          component="section"
          aria-labelledby="cta-heading"
          sx={{
            py: { xs: 11, md: 16 },
            position: "relative",
            overflow: "hidden",
            bgcolor: CREAM,
            borderTop: `1px solid ${alpha(FOREST, 0.07)}`,
          }}
        >
          <Blob color={alpha(SAND, 0.5)} sx={{ width: 500, top: -120, left: -100 }} />
          <Blob color={alpha(SAGE, 0.8)} sx={{ width: 420, bottom: -100, right: -80 }} />

          <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
            <Stack alignItems="center" textAlign="center" spacing={3.5}>
              <Typography
                id="cta-heading"
                variant="h2"
                component="h2"
                sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, color: TEXT1 }}
              >
                Your next trip starts here
              </Typography>
              <Typography variant="body1" sx={{ color: TEXT2, maxWidth: 370 }}>
                Plan together — and leave the coordination chaos behind for good.
              </Typography>
              <EmailCta id="cta-email" />
            </Stack>
          </Container>
        </Box>
      </Box>

      {/* ── Footer ─────────────────────────────────────────────────────────────── */}
      <Box
        component="footer"
        sx={{ bgcolor: FOREST, py: { xs: 4, md: 5 }, px: { xs: 2.5, sm: 5 } }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            gap={2.5}
          >
            <Typography sx={{ fontWeight: 800, letterSpacing: "-0.04em", color: SURF, fontSize: "1.15rem" }}>
              Voyagio
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: alpha(SURF, 0.45) }}>
              © 2026 Voyagio. All rights reserved.
            </Typography>
            <Stack direction="row" gap={3.5}>
              {["Privacy", "Terms"].map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href="#"
                  sx={{ fontSize: "0.8rem", color: alpha(SURF, 0.5), textDecoration: "none", "&:hover": { color: SURF }, transition: "color 0.15s" }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
      <RemoveBlackFilter />

      <MascotWidget />
    </SafeThemeProvider>
  );
}
