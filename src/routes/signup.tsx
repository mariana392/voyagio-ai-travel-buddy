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
import LoginIcon from "@mui/icons-material/Login";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LinkIcon from "@mui/icons-material/Link";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { CREAM, SAGE, FOREST, MOSS, SAND, SEAFOAM, TEXT1, TEXT2, SURF } from "@/voyagio/theme";
import { SafeThemeProvider } from "@/voyagio/shared";

import bennyWave from "@/assets/benny-wave.png.asset.json";
import bennyIdea from "@/assets/benny-idea.png.asset.json";
import bennyTips from "@/assets/benny-tips.png.asset.json";
import bennyGo from "@/assets/benny-go.png.asset.json";
import bennyCalm from "@/assets/benny-calm.png.asset.json";
import bennyRoute from "@/assets/benny-route.png.asset.json";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Registration flow — Voyagio" },
      {
        name: "description",
        content:
          "Walk through the Voyagio sign-up experience: welcome, sign up or log in, verification, profile, AI personalisation and your first trip.",
      },
      { property: "og:title", content: "Registration flow — Voyagio" },
      {
        property: "og:description",
        content: "A demo walkthrough of the Voyagio registration UX: from welcome to trip dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

const LABEL = {
  fontSize: "0.68rem",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: TEXT2,
};

const STEPS = [
  "Welcome",
  "Sign up / Log in",
  "Verification",
  "Profile",
  "AI personalisation",
  "What's next?",
  "Notifications",
  "Dashboard",
] as const;

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

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

function OptionRow({
  icon,
  title,
  hint,
  onClick,
  selected,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
  onClick: () => void;
  selected?: boolean;
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
        border: `1px solid ${selected ? FOREST : alpha(FOREST, 0.14)}`,
        bgcolor: selected ? alpha(MOSS, 0.14) : SURF,
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

function SignupPage() {
  const [step, setStep] = useState<Step>(0);
  const [method, setMethod] = useState<string | null>(null);
  const [email, setEmail] = useState("alex@voyagio.app");
  const [code, setCode] = useState("");
  const [name, setName] = useState("Alex");
  const [language, setLanguage] = useState("English · CET");
  const [styles, setStyles] = useState<string[]>(["Comfort"]);
  const [budget, setBudget] = useState("€€ · balanced");
  const [interests, setInterests] = useState<string[]>(["Food", "Sea"]);
  const [next, setNext] = useState<"create" | "join" | null>(null);
  const [invite, setInvite] = useState("");
  const [notifications, setNotifications] = useState<"on" | "later" | null>(null);

  const go = (s: Step) => setStep(s);
  const emailTaken = email.trim().toLowerCase() === "taken@voyagio.app";
  const codeInvalid = code.length > 0 && code !== "4821";

  const toggle = (list: string[], value: string, set: (v: string[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const pill = (active: boolean) => ({
    borderRadius: 100,
    height: 34,
    px: 0.5,
    cursor: "pointer",
    bgcolor: active ? FOREST : SURF,
    color: active ? SURF : TEXT1,
    border: `1px solid ${active ? FOREST : alpha(FOREST, 0.16)}`,
    "&:hover": { bgcolor: active ? FOREST : alpha(MOSS, 0.12) },
  });

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
                label="Registration"
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

            {/* 0 — Welcome */}
            {step === 0 && (
              <SectionCard sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>
                <Mascot
                  src={bennyWave.url}
                  alt="Benny waving hello"
                  width={{ xs: 150, md: 190 }}
                  sx={{ mx: "auto", mb: 2.5 }}
                />
                <Typography sx={LABEL}>Welcome</Typography>
                <Typography variant="h6" sx={{ color: TEXT1, fontSize: { xs: "1.3rem", md: "1.5rem" }, mt: 0.6 }}>
                  Plan trips together, without the group-chat chaos
                </Typography>
                <Typography sx={{ fontSize: "0.9rem", color: TEXT2, mt: 1.2, maxWidth: 420, mx: "auto", lineHeight: 1.65 }}>
                  Three short steps and Benny is ready to help your group with routes, budget and shared tasks.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.25} justifyContent="center" mt={3}>
                  <Button size="large" color="primary" onClick={() => go(1)}>
                    Get started
                  </Button>
                  <Button size="large" variant="outlined" color="primary" onClick={() => { setMethod("Log in"); go(2); }}>
                    I already have an account
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 1 — Sign up / Log in */}
            {step === 1 && (
              <SectionCard>
                <StepHead
                  label="Sign up / Log in"
                  title="Choose how you want to join"
                  text="One tap with Apple or Google, or a classic email and password. Same account either way."
                  mascot={bennyIdea.url}
                  alt="Benny with an idea"
                />
                <Stack spacing={1.25}>
                  <OptionRow
                    icon={<AppleIcon sx={{ fontSize: 19 }} />}
                    title="Continue with Apple"
                    hint="Fastest — no password to remember"
                    selected={method === "Apple"}
                    onClick={() => { setMethod("Apple"); go(2); }}
                  />
                  <OptionRow
                    icon={<GoogleIcon sx={{ fontSize: 18 }} />}
                    title="Continue with Google"
                    hint="Fastest — no password to remember"
                    selected={method === "Google"}
                    onClick={() => { setMethod("Google"); go(2); }}
                  />
                  <Divider sx={{ my: 0.5 }}>
                    <Typography sx={{ fontSize: "0.72rem", color: TEXT2 }}>or</Typography>
                  </Divider>
                  <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField label="Password" type="password" size="small" fullWidth defaultValue="demo-password" />
                  {emailTaken && (
                    <ErrorNote>
                      This email already exists. Log in instead, or reset your password — we'll send a link.
                    </ErrorNote>
                  )}
                  <Stack direction={{ xs: "column", sm: "row" }} gap={1.25}>
                    <Button
                      color="primary"
                      onClick={() => { setMethod("Email"); if (!emailTaken) go(2); }}
                      sx={{ flex: 1 }}
                      startIcon={<MailOutlineIcon />}
                    >
                      Create account
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => { setMethod("Log in"); go(2); }}
                      sx={{ flex: 1 }}
                      startIcon={<LoginIcon />}
                    >
                      Log in
                    </Button>
                  </Stack>
                  <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center" }}>
                    Try <b>taken@voyagio.app</b> to see the “email already exists” state.
                  </Typography>
                </Stack>
              </SectionCard>
            )}

            {/* 2 — Verification */}
            {step === 2 && (
              <SectionCard>
                <StepHead
                  label="Verification"
                  title="Confirm it's really you"
                  text={
                    method === "Apple" || method === "Google"
                      ? "Signed in with your provider — we only confirm the address, nothing else."
                      : "We sent a 6-hour valid code and a magic link to your email. Enter the code or just tap the link."
                  }
                  mascot={bennyCalm.url}
                  alt="Benny staying calm"
                />
                {method === "Apple" || method === "Google" ? (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1.25}
                    sx={{
                      px: 2,
                      py: 1.6,
                      borderRadius: "18px",
                      bgcolor: SAGE,
                      border: `1px solid ${alpha(FOREST, 0.1)}`,
                      mb: 2.5,
                    }}
                  >
                    <CheckCircleOutlineIcon sx={{ color: FOREST, fontSize: 20 }} />
                    <Typography sx={{ fontSize: "0.88rem", color: TEXT1 }}>
                      {method} sign-in confirmed — you're verified.
                    </Typography>
                  </Stack>
                ) : (
                  <Stack spacing={1.5} mb={2.5}>
                    <TextField
                      label="6-digit code"
                      size="small"
                      fullWidth
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="4821"
                    />
                    {codeInvalid && (
                      <ErrorNote>
                        Invalid or expired code. Check the last email or ask for a new one — the demo code is 4821.
                      </ErrorNote>
                    )}
                    <Stack direction="row" gap={1.25} flexWrap="wrap">
                      <Button variant="outlined" color="primary" onClick={() => setCode("")}>
                        Resend code
                      </Button>
                      <Button variant="outlined" color="primary" onClick={() => setCode("4821")}>
                        Use the email link instead
                      </Button>
                    </Stack>
                  </Stack>
                )}
                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(1)}>
                    Back
                  </Button>
                  <Button
                    color="primary"
                    sx={{ flex: 1 }}
                    disabled={method !== "Apple" && method !== "Google" && code !== "4821"}
                    onClick={() => go(3)}
                  >
                    Continue
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 3 — Profile */}
            {step === 3 && (
              <SectionCard>
                <StepHead
                  label="Profile"
                  title="How should your group see you?"
                  text="Only a name is required. The photo is optional and you can change everything later."
                  mascot={bennyTips.url}
                  alt="Benny giving tips"
                />
                <Stack spacing={1.75} mb={2.5}>
                  <TextField
                    label="Name or nickname"
                    size="small"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <OptionRow
                    icon={<PhotoCameraOutlinedIcon sx={{ fontSize: 19 }} />}
                    title="Add a photo — optional"
                    hint="Skip it and Benny gives you a colour avatar"
                    onClick={() => {}}
                  />
                  <Box>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1, mb: 1 }}>
                      Language & time zone
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["English · CET", "Українська · EET", "Español · CET"].map((l) => (
                        <Chip
                          key={l}
                          label={l}
                          icon={<LanguageIcon sx={{ fontSize: 16 }} />}
                          onClick={() => setLanguage(l)}
                          sx={pill(language === l)}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(2)}>
                    Back
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} startIcon={<PersonOutlineIcon />} onClick={() => go(4)}>
                    Save and continue
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 4 — AI personalisation */}
            {step === 4 && (
              <SectionCard>
                <StepHead
                  label="AI personalisation"
                  title="Teach Benny your taste"
                  text="Three quick questions make the first suggestions much sharper. You can skip and finish it later in Profile settings."
                  mascot={bennyIdea.url}
                  alt="Benny thinking"
                />
                <Stack spacing={2.5} mb={2.5}>
                  <Box>
                    <Stack direction="row" alignItems="center" gap={0.75} mb={1}>
                      <ExploreOutlinedIcon sx={{ fontSize: 17, color: FOREST }} />
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1 }}>Travel style</Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Chill", "Comfort", "Adventure", "City break"].map((s) => (
                        <Chip key={s} label={s} onClick={() => toggle(styles, s, setStyles)} sx={pill(styles.includes(s))} />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row" alignItems="center" gap={0.75} mb={1}>
                      <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 17, color: FOREST }} />
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1 }}>Budget</Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["€ · light", "€€ · balanced", "€€€ · treat us"].map((b) => (
                        <Chip key={b} label={b} onClick={() => setBudget(b)} sx={pill(budget === b)} />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <Stack direction="row" alignItems="center" gap={0.75} mb={1}>
                      <FavoriteBorderIcon sx={{ fontSize: 17, color: FOREST }} />
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1 }}>Interests</Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Food", "Sea", "Hiking", "Museums", "Nightlife", "Photo spots"].map((i) => (
                        <Chip
                          key={i}
                          label={i}
                          onClick={() => toggle(interests, i, setInterests)}
                          sx={pill(interests.includes(i))}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(5)}>
                    Skip for now
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} startIcon={<AutoAwesomeOutlinedIcon />} onClick={() => go(5)}>
                    Save preferences
                  </Button>
                </Stack>
                <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center", mt: 1.5 }}>
                  AI personalisation can be skipped and completed later in Profile settings.
                </Typography>
              </SectionCard>
            )}

            {/* 5 — What's next */}
            {step === 5 && (
              <SectionCard>
                <StepHead
                  label="What's next?"
                  title="Create a trip or join your friends"
                  text="Both paths lead to the same dashboard — pick whichever fits your group right now."
                  mascot={bennyRoute.url}
                  alt="Benny with a route"
                />
                <Stack spacing={1.25} mb={2.5}>
                  <OptionRow
                    icon={<LuggageOutlinedIcon sx={{ fontSize: 19 }} />}
                    title="Create a trip"
                    hint="Name → dates → participants"
                    selected={next === "create"}
                    onClick={() => setNext("create")}
                  />
                  <OptionRow
                    icon={<GroupsOutlinedIcon sx={{ fontSize: 19 }} />}
                    title="Join a trip"
                    hint="Invite link or code → preview → join"
                    selected={next === "join"}
                    onClick={() => setNext("join")}
                  />
                </Stack>

                {next === "create" && (
                  <Stack spacing={1.5} mb={2.5}>
                    <TextField label="Trip name" size="small" fullWidth defaultValue="Barcelona with the crew" />
                    <TextField label="Dates" size="small" fullWidth defaultValue="12–15 September" />
                    <TextField label="Participants" size="small" fullWidth defaultValue="4 travellers" />
                  </Stack>
                )}

                {next === "join" && (
                  <Stack spacing={1.5} mb={2.5}>
                    <TextField
                      label="Invite link or code"
                      size="small"
                      fullWidth
                      placeholder="VOYAGIO-2431"
                      value={invite}
                      onChange={(e) => setInvite(e.target.value)}
                      InputProps={{ startAdornment: <LinkIcon sx={{ fontSize: 17, color: TEXT2, mr: 1 }} /> }}
                    />
                    {invite.trim().length > 0 && invite.trim().toUpperCase() !== "VOYAGIO-2431" ? (
                      <ErrorNote>
                        Invalid or expired invite. Ask for a new code, or create your own trip instead.
                      </ErrorNote>
                    ) : invite.trim().length > 0 ? (
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={1.25}
                        sx={{ px: 2, py: 1.4, borderRadius: "16px", bgcolor: SEAFOAM }}
                      >
                        <CheckCircleOutlineIcon sx={{ color: FOREST, fontSize: 19 }} />
                        <Typography sx={{ fontSize: "0.85rem", color: TEXT1 }}>
                          Barcelona · 12–15 September · 4 travellers — preview before you join.
                        </Typography>
                      </Stack>
                    ) : null}
                  </Stack>
                )}

                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(4)}>
                    Back
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} disabled={!next} onClick={() => go(6)}>
                    Continue
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 6 — Notifications */}
            {step === 6 && (
              <SectionCard>
                <StepHead
                  label="Notifications"
                  title="Want Benny to nudge the group?"
                  text="We ask only now that you've seen the value: reminders for deadlines, votes and payments — nothing else."
                  mascot={bennyCalm.url}
                  alt="Benny calm"
                />
                <Stack spacing={1.25} mb={2.5}>
                  <OptionRow
                    icon={<NotificationsNoneIcon sx={{ fontSize: 19 }} />}
                    title="Turn notifications on"
                    hint="Only trip updates from your own group"
                    selected={notifications === "on"}
                    onClick={() => setNotifications("on")}
                  />
                  <OptionRow
                    icon={<LockOutlinedIcon sx={{ fontSize: 19 }} />}
                    title="Not now"
                    hint="You can enable them any time in settings"
                    selected={notifications === "later"}
                    onClick={() => setNotifications("later")}
                  />
                </Stack>
                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(5)}>
                    Back
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} disabled={!notifications} onClick={() => go(7)}>
                    Continue
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 7 — Dashboard */}
            {step === 7 && (
              <Stack spacing={2.5}>
                <SectionCard sx={{ bgcolor: SAGE, border: `1px solid ${alpha(FOREST, 0.1)}` }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                    <Box>
                      <Chip
                        label="You're all set"
                        size="small"
                        sx={{ bgcolor: alpha(SURF, 0.75), color: FOREST, fontSize: "0.72rem", height: 26, mb: 1.5 }}
                      />
                      <Typography variant="h6" sx={{ color: TEXT1, fontSize: { xs: "1.2rem", md: "1.4rem" }, lineHeight: 1.25 }}>
                        Welcome aboard, {name || "traveller"}
                      </Typography>
                      <Typography sx={{ fontSize: "0.87rem", color: TEXT2, mt: 0.6 }}>
                        {next === "join" ? "Joined a trip" : "Trip created"} · {budget} · {styles.join(", ") || "no style yet"}
                      </Typography>
                    </Box>
                    <Mascot src={bennyGo.url} alt="Benny ready to go" width={{ xs: 82, md: 118 }} sx={{ flexShrink: 0 }} />
                  </Stack>
                </SectionCard>

                <SectionCard>
                  <Stack direction="row" alignItems="center" gap={1.25} mb={2}>
                    <DashboardOutlinedIcon sx={{ fontSize: 19, color: FOREST }} />
                    <Typography sx={LABEL}>Home / trip dashboard</Typography>
                  </Stack>
                  <Stack spacing={1.25}>
                    {[
                      { t: "Barcelona · 12–15 September", s: "4 travellers · draft plan ready" },
                      { t: "Shared tasks", s: "3 open — flights, stay, dinner spot" },
                      { t: "Benny's tips", s: "Fresh ideas every morning of the trip" },
                    ].map((r) => (
                      <Stack
                        key={r.t}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderRadius: "18px",
                          border: `1px solid ${alpha(FOREST, 0.1)}`,
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontSize: "0.9rem", fontWeight: 600, color: TEXT1 }}>{r.t}</Typography>
                          <Typography sx={{ fontSize: "0.78rem", color: TEXT2 }}>{r.s}</Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} gap={1.25} mt={2.5}>
                    <Button component={Link} to="/plan" color="primary" sx={{ flex: 1 }}>
                      Open the planner
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => go(0)}>
                      Restart the flow
                    </Button>
                  </Stack>
                </SectionCard>
              </Stack>
            )}

            <Stack direction="row" alignItems="center" gap={0.75} justifyContent="center">
              <LockOutlinedIcon sx={{ fontSize: 13, color: TEXT2 }} />
              <Typography sx={{ fontSize: "0.72rem", color: TEXT2 }}>
                Demo only — no account is created and nothing is stored.
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </SafeThemeProvider>
  );
}
