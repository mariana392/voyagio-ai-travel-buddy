import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import { CREAM, FOREST, MOSS, SAND, TEXT1, TEXT2, SURF } from "@/voyagio/theme";
import { SafeThemeProvider } from "@/voyagio/shared";

import bennyWave from "@/assets/benny-wave.png.asset.json";
import bennyTips from "@/assets/benny-tips.png.asset.json";
import bennyCalm from "@/assets/benny-calm.png.asset.json";
import bennyGo from "@/assets/benny-go.png.asset.json";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Voyagio" },
      {
        name: "description",
        content:
          "Log in to Voyagio: Apple, Google or email, secure verification, password reset and back to your trip dashboard.",
      },
      { property: "og:title", content: "Log in — Voyagio" },
      {
        property: "og:description",
        content: "A demo walkthrough of the Voyagio log-in experience, from credentials to trip dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const LABEL = {
  fontSize: "0.68rem",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: TEXT2,
};

const STEPS = ["Log in", "Verification", "Welcome back"] as const;
type Step = 0 | 1 | 2;

function SectionCard({ children, sx }: { children: React.ReactNode; sx?: object }) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: SURF,
        border: `1px solid ${alpha(FOREST, 0.09)}`,
        borderRadius: "24px",
        p: { xs: 2.5, md: 3.25 },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

function Mascot({ src, alt, width, sx }: { src: string; alt: string; width: number | object; sx?: object }) {
  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width,
        height: "auto",
        display: "block",
        filter: `drop-shadow(0 12px 24px ${alpha(FOREST, 0.16)})`,
        ...sx,
      }}
    />
  );
}

function StepHead({
  label,
  title,
  text,
  mascot,
  alt,
}: {
  label: string;
  title: string;
  text: string;
  mascot: string;
  alt: string;
}) {
  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2} mb={2.5}>
      <Box>
        <Typography sx={LABEL}>{label}</Typography>
        <Typography variant="h6" sx={{ color: TEXT1, mt: 0.4, fontSize: "1.15rem" }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: "0.85rem", color: TEXT2, mt: 0.5, maxWidth: 400, lineHeight: 1.6 }}>
          {text}
        </Typography>
      </Box>
      <Mascot src={mascot} alt={alt} width={{ xs: 78, sm: 104 }} sx={{ flexShrink: 0, mt: -1 }} />
    </Stack>
  );
}

function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      gap={1}
      sx={{
        px: 2,
        py: 1.4,
        borderRadius: "16px",
        bgcolor: alpha(SAND, 0.55),
        border: `1px solid ${alpha(FOREST, 0.12)}`,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 18, color: FOREST, mt: "1px" }} />
      <Typography sx={{ fontSize: "0.82rem", color: TEXT1, lineHeight: 1.55 }}>{children}</Typography>
    </Stack>
  );
}

function OptionRow({
  icon,
  title,
  hint,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.6,
        cursor: "pointer",
        borderRadius: "18px",
        border: `1px solid ${alpha(FOREST, 0.14)}`,
        bgcolor: SURF,
        transition: "all 0.2s ease",
        "&:hover": { borderColor: FOREST, bgcolor: alpha(MOSS, 0.1) },
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          flexShrink: 0,
          borderRadius: "12px",
          bgcolor: alpha(FOREST, 0.07),
          color: FOREST,
          display: "grid",
          placeItems: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: TEXT1 }}>{title}</Typography>
        {hint ? <Typography sx={{ fontSize: "0.78rem", color: TEXT2 }}>{hint}</Typography> : null}
      </Box>
    </Box>
  );
}

function LoginPage() {
  const [step, setStep] = useState<Step>(0);
  const [method, setMethod] = useState<string | null>(null);
  const [email, setEmail] = useState("alex@voyagio.app");
  const [password, setPassword] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [code, setCode] = useState("");
  const [resends, setResends] = useState(0);
  const [reset, setReset] = useState<"none" | "sent" | "done">("none");
  const [newPassword, setNewPassword] = useState("");

  const go = (s: Step) => setStep(s);
  const unknownEmail = email.trim().toLowerCase() === "unknown@voyagio.app";
  const wrongPassword = attempted && password.length > 0 && password !== "voyagio";
  const codeInvalid = code.length > 0 && code !== "4821";

  return (
    <SafeThemeProvider>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: CREAM }}>
        <AppBar position="sticky" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ minHeight: { xs: 62, md: 70 }, gap: 1.5 }}>
              <IconButton component={Link} to="/" size="small" sx={{ color: FOREST }} aria-label="Back to home">
                <ArrowBackIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: FOREST, letterSpacing: "-0.02em" }}>
                Voyagio
              </Typography>
              <Chip
                label="Log in"
                size="small"
                sx={{ bgcolor: alpha(MOSS, 0.16), color: FOREST, fontSize: "0.72rem", height: 24 }}
              />
              <Box sx={{ flex: 1 }} />
              <Typography sx={{ fontSize: "0.78rem", color: TEXT2, display: { xs: "none", sm: "block" } }}>
                Step {step + 1} of {STEPS.length} · {STEPS[step]}
              </Typography>
            </Toolbar>
          </Container>
          <LinearProgress variant="determinate" value={((step + 1) / STEPS.length) * 100} />
        </AppBar>

        <Container maxWidth="md" sx={{ py: { xs: 3.5, md: 6 } }}>
          <Stack spacing={2.5}>
            {/* Step map */}
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {STEPS.map((s, i) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  onClick={() => go(i as Step)}
                  sx={{
                    borderRadius: 100,
                    fontSize: "0.72rem",
                    height: 26,
                    cursor: "pointer",
                    bgcolor: i === step ? FOREST : i < step ? alpha(MOSS, 0.16) : alpha(FOREST, 0.05),
                    color: i === step ? SURF : i < step ? FOREST : TEXT2,
                  }}
                />
              ))}
            </Stack>

            {/* 0 — Log in */}
            {step === 0 && (
              <SectionCard>
                <StepHead
                  label="Log in"
                  title="Welcome back to Voyagio"
                  text="Use the same method you signed up with. Apple and Google log you in instantly; email asks for your password."
                  mascot={bennyWave.url}
                  alt="Benny waving hello"
                />

                <Stack spacing={1.25}>
                  <OptionRow
                    icon={<AppleIcon sx={{ fontSize: 19 }} />}
                    title="Continue with Apple"
                    hint="Works with the private relay address you used before"
                    onClick={() => {
                      setMethod("Apple");
                      go(1);
                    }}
                  />
                  <OptionRow
                    icon={<GoogleIcon sx={{ fontSize: 19 }} />}
                    title="Continue with Google"
                    hint="One tap — no password needed"
                    onClick={() => {
                      setMethod("Google");
                      go(1);
                    }}
                  />
                </Stack>

                <Divider sx={{ my: 2.25 }}>
                  <Typography sx={{ fontSize: "0.74rem", color: TEXT2 }}>or with email</Typography>
                </Divider>

                <Stack spacing={1.5}>
                  <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setAttempted(false);
                    }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setAttempted(false);
                    }}
                    helperText="Demo password: voyagio"
                  />

                  {unknownEmail && attempted ? (
                    <ErrorNote>
                      We can't find an account for this email. Create one instead — it takes a minute.
                    </ErrorNote>
                  ) : null}
                  {!unknownEmail && wrongPassword ? (
                    <ErrorNote>That password doesn't match. Try again or reset it — we'll send a link.</ErrorNote>
                  ) : null}
                  {reset === "sent" ? (
                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      gap={1}
                      sx={{
                        px: 2,
                        py: 1.4,
                        borderRadius: "16px",
                        bgcolor: alpha(MOSS, 0.14),
                        border: `1px solid ${alpha(FOREST, 0.12)}`,
                      }}
                    >
                      <MailOutlineIcon sx={{ fontSize: 18, color: FOREST, mt: "1px" }} />
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: "0.82rem", color: TEXT1, lineHeight: 1.55 }}>
                          Reset link sent to {email}. Open it and choose a new password.
                        </Typography>
                        <Stack direction="row" gap={1.25} alignItems="center" mt={1.25}>
                          <TextField
                            label="New password"
                            type="password"
                            size="small"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <Button
                            size="small"
                            disabled={newPassword.length < 6}
                            onClick={() => {
                              setPassword(newPassword);
                              setReset("done");
                              setAttempted(false);
                            }}
                          >
                            Save password
                          </Button>
                        </Stack>
                        <Typography sx={{ fontSize: "0.74rem", color: TEXT2, mt: 0.75 }}>
                          At least 6 characters. The link expires in 30 minutes.
                        </Typography>
                      </Box>
                    </Stack>
                  ) : null}
                  {reset === "done" ? (
                    <Stack direction="row" alignItems="center" gap={1}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 18, color: MOSS }} />
                      <Typography sx={{ fontSize: "0.82rem", color: TEXT1 }}>
                        Password updated. You can log in with it now.
                      </Typography>
                    </Stack>
                  ) : null}

                  <Stack direction="row" gap={1.25} flexWrap="wrap" alignItems="center">
                    <Button
                      size="large"
                      startIcon={<LockOutlinedIcon />}
                      disabled={email.trim().length === 0 || password.length === 0}
                      onClick={() => {
                        setAttempted(true);
                        setMethod("Email");
                        if (!unknownEmail && password === "voyagio") go(1);
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => {
                        setReset("sent");
                        setNewPassword("");
                      }}
                    >
                      Forgot password?
                    </Button>
                    <Box sx={{ flex: 1 }} />
                    <Button
                      component={Link}
                      to="/signup"
                      variant="outlined"
                      color="primary"
                      startIcon={<PersonAddAltOutlinedIcon />}
                    >
                      Create account
                    </Button>
                  </Stack>

                  <Typography sx={{ fontSize: "0.74rem", color: TEXT2, lineHeight: 1.6 }}>
                    By logging in you agree to the Terms and the Privacy Policy. We never post anything on your behalf.
                  </Typography>
                </Stack>
              </SectionCard>
            )}

            {/* 1 — Verification */}
            {step === 1 && (
              <SectionCard>
                <StepHead
                  label="Verification"
                  title={method === "Email" ? "Confirm it's you" : `${method} sign-in confirmed`}
                  text={
                    method === "Email"
                      ? "We sent a 6-hour valid code to your email. Enter it to finish logging in on this device."
                      : "The provider confirmed your identity. One quick check that this is a device you trust."
                  }
                  mascot={bennyTips.url}
                  alt="Benny with a tip"
                />

                {method === "Email" ? (
                  <Stack spacing={1.5}>
                    <TextField
                      label="Verification code"
                      size="small"
                      fullWidth
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      helperText="Demo code: 4821"
                    />
                    {codeInvalid ? <ErrorNote>That code isn't right. Check the email or send a new one.</ErrorNote> : null}
                    <Stack direction="row" gap={1.25} flexWrap="wrap">
                      <Button size="large" disabled={code !== "4821"} onClick={() => go(2)}>
                        Verify and continue
                      </Button>
                      <Button variant="outlined" color="primary" onClick={() => setResends((r) => r + 1)}>
                        Resend code{resends > 0 ? ` (${resends})` : ""}
                      </Button>
                      <Button variant="text" color="primary" onClick={() => go(0)}>
                        Use another method
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Stack spacing={1.5}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 20, color: MOSS }} />
                      <Typography sx={{ fontSize: "0.88rem", color: TEXT1 }}>
                        Signed in with {method}. Session secured on this device.
                      </Typography>
                    </Stack>
                    <Stack direction="row" gap={1.25} flexWrap="wrap">
                      <Button size="large" onClick={() => go(2)}>
                        Continue
                      </Button>
                      <Button variant="text" color="primary" onClick={() => go(0)}>
                        Use another method
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </SectionCard>
            )}

            {/* 2 — Welcome back */}
            {step === 2 && (
              <Stack spacing={2.5}>
                <SectionCard sx={{ textAlign: "center", py: { xs: 4, md: 5 } }}>
                  <Mascot
                    src={bennyCalm.url}
                    alt="Benny relaxed"
                    width={{ xs: 140, md: 175 }}
                    sx={{ mx: "auto", mb: 2 }}
                  />
                  <Typography sx={LABEL}>Welcome back</Typography>
                  <Typography variant="h6" sx={{ color: TEXT1, mt: 0.6, fontSize: "1.3rem" }}>
                    You're logged in, Alex
                  </Typography>
                  <Typography sx={{ fontSize: "0.88rem", color: TEXT2, mt: 1, maxWidth: 430, mx: "auto", lineHeight: 1.65 }}>
                    Logged in with {method ?? "email"}. Your trips, votes and tasks are exactly where you left them.
                  </Typography>
                </SectionCard>

                <SectionCard>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
                    <Box>
                      <Typography sx={LABEL}>Your trips</Typography>
                      <Stack spacing={1.25} mt={1.25}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <DashboardOutlinedIcon sx={{ fontSize: 18, color: FOREST }} />
                          <Typography sx={{ fontSize: "0.88rem", color: TEXT1 }}>
                            Barcelona, Sept. 2025 · 6 travellers
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <GroupsOutlinedIcon sx={{ fontSize: 18, color: FOREST }} />
                          <Typography sx={{ fontSize: "0.88rem", color: TEXT1 }}>
                            2 open votes · 3 tasks waiting for you
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                    <Mascot src={bennyGo.url} alt="Benny ready to go" width={{ xs: 78, sm: 100 }} sx={{ flexShrink: 0 }} />
                  </Stack>

                  <Stack direction="row" gap={1.25} flexWrap="wrap" mt={2.5}>
                    <Button component={Link} to="/plan" size="large">
                      Open trip dashboard
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => go(0)}>
                      Log out
                    </Button>
                  </Stack>
                </SectionCard>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </SafeThemeProvider>
  );
}
