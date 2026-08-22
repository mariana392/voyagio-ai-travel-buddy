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
import Switch from "@mui/material/Switch";
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
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LinkIcon from "@mui/icons-material/Link";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { CREAM, SAGE, FOREST, MOSS, SAND, SEAFOAM, TEXT1, TEXT2, SURF } from "@/voyagio/theme";
import { SafeThemeProvider } from "@/voyagio/shared";

import bennyWave from "@/assets/benny-wave.png.asset.json";
import bennyIdea from "@/assets/benny-idea.png.asset.json";
import bennyTips from "@/assets/benny-tips.png.asset.json";
import bennyGo from "@/assets/benny-go.png.asset.json";
import bennyCalm from "@/assets/benny-calm.png.asset.json";
import bennyRoute from "@/assets/benny-route.png.asset.json";
import bennyBudget from "@/assets/benny-budget.png.asset.json";

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
  "AI introduction",
  "AI preferences",
  "What's next?",
  "Notifications",
  "Dashboard",
] as const;

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

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

function GroupLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Stack direction="row" alignItems="center" gap={0.75} mb={1}>
      {icon}
      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1 }}>{children}</Typography>
    </Stack>
  );
}

function SignupPage() {
  const [step, setStep] = useState<Step>(0);
  const [inviteFirst, setInviteFirst] = useState(false);
  const [method, setMethod] = useState<string | null>(null);
  const [email, setEmail] = useState("alex@voyagio.app");
  const [code, setCode] = useState("");
  const [resends, setResends] = useState(0);
  const [name, setName] = useState("Alex");
  const [language, setLanguage] = useState("English · CET");
  const [styles, setStyles] = useState<string[]>(["Comfort"]);
  const [budget, setBudget] = useState("€€ · balanced");
  const [interests, setInterests] = useState<string[]>(["Food", "Sea"]);
  const [pace, setPace] = useState("Balanced days");
  const [constraints, setConstraints] = useState<string[]>([]);
  const [tone, setTone] = useState("Concise");
  const [aiSkipped, setAiSkipped] = useState(false);
  const [next, setNext] = useState<"create" | "join" | null>(null);
  const [tripName, setTripName] = useState("Barcelona with the crew");
  const [startDate, setStartDate] = useState("2026-09-12");
  const [endDate, setEndDate] = useState("2026-09-15");
  const [invite, setInvite] = useState("");
  const [notifications, setNotifications] = useState<"on" | "later" | null>(null);
  const [categories, setCategories] = useState<string[]>([
    "Trip changes",
    "Votes",
    "Tasks",
    "Mentions",
    "AI reminders",
  ]);
  const [marketing, setMarketing] = useState(false);

  const go = (s: Step) => setStep(s);
  const emailTaken = email.trim().toLowerCase() === "taken@voyagio.app";
  const codeInvalid = code.length > 0 && code !== "4821";
  const tripNameMissing = next === "create" && tripName.trim().length === 0;
  const datesInvalid =
    next === "create" && startDate.length > 0 && endDate.length > 0 && endDate < startDate;
  const inviteValid = invite.trim().toUpperCase() === "VOYAGIO-2431";
  const canContinueChoice =
    next === "create" ? !tripNameMissing && !datesInvalid : next === "join" ? inviteValid : false;

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

                {inviteFirst && (
                  <Box
                    sx={{
                      mt: 3,
                      mx: "auto",
                      maxWidth: 440,
                      textAlign: "left",
                      px: 2.25,
                      py: 2,
                      borderRadius: "20px",
                      bgcolor: SEAFOAM,
                      border: `1px solid ${alpha(FOREST, 0.1)}`,
                    }}
                  >
                    <Typography sx={LABEL}>Invite preview</Typography>
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: TEXT1, mt: 0.5 }}>
                      Barcelona with the crew
                    </Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: TEXT1, mt: 0.4, lineHeight: 1.6 }}>
                      Organiser: Maria · 12–15 September · 4 travellers. You see the trip before signing in — the
                      invite is kept while you create your account.
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: TEXT2, mt: 0.8 }}>
                      Only the organiser sees your email; nothing is shared with the group.
                    </Typography>
                  </Box>
                )}

                <Stack direction={{ xs: "column", sm: "row" }} gap={1.25} justifyContent="center" mt={3}>
                  <Button size="large" color="primary" onClick={() => go(1)}>
                    Get started
                  </Button>
                  <Button size="large" variant="outlined" color="primary" onClick={() => { setMethod("Log in"); go(1); }}>
                    Log in
                  </Button>
                </Stack>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    setInviteFirst((v) => !v);
                    if (!inviteFirst) {
                      setNext("join");
                      setInvite("VOYAGIO-2431");
                    }
                  }}
                  sx={{ mt: 1.5 }}
                >
                  {inviteFirst ? "Hide the invite preview" : "I opened an invite link"}
                </Button>
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
                    <>
                      <ErrorNote>
                        This email already exists. Log in instead, or reset your password — we'll send a link.
                      </ErrorNote>
                      <Stack direction={{ xs: "column", sm: "row" }} gap={1.25}>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ flex: 1 }}
                          onClick={() => { setMethod("Log in"); go(2); }}
                        >
                          Log in instead
                        </Button>
                        <Button variant="outlined" color="primary" sx={{ flex: 1 }} onClick={() => { setMethod("Reset"); go(2); }}>
                          Reset password
                        </Button>
                      </Stack>
                    </>
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
                  <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center", lineHeight: 1.6 }}>
                    By continuing you accept the Terms and the Privacy Policy. Apple private relay addresses work too.
                  </Typography>
                  {inviteFirst && (
                    <Typography sx={{ fontSize: "0.75rem", color: FOREST, textAlign: "center" }}>
                      Your invite to “Barcelona with the crew” is saved and waiting.
                    </Typography>
                  )}
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
                      <Button variant="outlined" color="primary" onClick={() => { setCode(""); setResends((r) => r + 1); }}>
                        Send a new code
                      </Button>
                      <Button variant="outlined" color="primary" onClick={() => setCode("4821")}>
                        Use the email link instead
                      </Button>
                    </Stack>
                    <Typography sx={{ fontSize: "0.75rem", color: TEXT2 }}>
                      {resends > 0
                        ? `New code sent (${resends}). You can ask again in 30 seconds.`
                        : "Nothing arrived? Check spam, then send a new code."}
                    </Typography>
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
                {method !== "Apple" && method !== "Google" && code !== "4821" && (
                  <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center", mt: 1.25 }}>
                    Continue unlocks once the code is confirmed.
                  </Typography>
                )}
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
                  <TextField label="Surname — optional" size="small" fullWidth />
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
                    <Typography sx={{ fontSize: "0.75rem", color: TEXT2, mt: 0.8 }}>
                      Prefilled from your device — change it any time.
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(2)}>
                    Back
                  </Button>
                  <Button
                    color="primary"
                    sx={{ flex: 1 }}
                    startIcon={<PersonOutlineIcon />}
                    disabled={name.trim().length === 0}
                    onClick={() => go(4)}
                  >
                    Save and continue
                  </Button>
                </Stack>
                {name.trim().length === 0 && (
                  <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center", mt: 1.25 }}>
                    Add a display name so your group knows who you are.
                  </Typography>
                )}
              </SectionCard>
            )}

            {/* 4 — AI introduction */}
            {step === 4 && (
              <SectionCard>
                <StepHead
                  label="AI introduction"
                  title="Meet Benny, your travel assistant"
                  text="A few answers make the first suggestions much sharper — routes, budget splits and reminders that fit your group. Nothing here blocks the app."
                  mascot={bennyBudget.url}
                  alt="Benny with a budget"
                />
                <Stack spacing={1.25} mb={2.5}>
                  {[
                    "Ideas that match your pace and budget",
                    "Reminders before votes and deadlines",
                    "Everything editable later in Settings",
                  ].map((b) => (
                    <Stack
                      key={b}
                      direction="row"
                      alignItems="center"
                      gap={1.25}
                      sx={{ px: 2, py: 1.4, borderRadius: "18px", bgcolor: SAGE }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: 18, color: FOREST }} />
                      <Typography sx={{ fontSize: "0.86rem", color: TEXT1 }}>{b}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => { setAiSkipped(true); go(6); }}>
                    Skip
                  </Button>
                  <Button
                    color="primary"
                    sx={{ flex: 1 }}
                    startIcon={<AutoAwesomeOutlinedIcon />}
                    onClick={() => { setAiSkipped(false); go(5); }}
                  >
                    Personalise assistant
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 5 — AI preferences */}
            {step === 5 && (
              <SectionCard>
                <StepHead
                  label="AI preferences"
                  title="Teach Benny your taste"
                  text="Pick what fits — every answer is optional and editable later in Settings."
                  mascot={bennyIdea.url}
                  alt="Benny thinking"
                />
                <Stack spacing={2.5} mb={2.5}>
                  <Box>
                    <GroupLabel icon={<ExploreOutlinedIcon sx={{ fontSize: 17, color: FOREST }} />}>
                      Travel style
                    </GroupLabel>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Chill", "Comfort", "Adventure", "City break"].map((s) => (
                        <Chip key={s} label={s} onClick={() => toggle(styles, s, setStyles)} sx={pill(styles.includes(s))} />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <GroupLabel icon={<AccountBalanceWalletOutlinedIcon sx={{ fontSize: 17, color: FOREST }} />}>
                      Budget comfort
                    </GroupLabel>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["€ · light", "€€ · balanced", "€€€ · treat us"].map((b) => (
                        <Chip key={b} label={b} onClick={() => setBudget(b)} sx={pill(budget === b)} />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <GroupLabel icon={<FavoriteBorderIcon sx={{ fontSize: 17, color: FOREST }} />}>
                      Interests
                    </GroupLabel>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Food", "Sea", "Culture", "Nature", "Nightlife", "Wellness", "Family"].map((i) => (
                        <Chip
                          key={i}
                          label={i}
                          onClick={() => toggle(interests, i, setInterests)}
                          sx={pill(interests.includes(i))}
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <GroupLabel icon={<ScheduleOutlinedIcon sx={{ fontSize: 17, color: FOREST }} />}>
                      Pace and time — optional
                    </GroupLabel>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Early start", "Late start", "Balanced days", "Lots of free time"].map((p) => (
                        <Chip key={p} label={p} onClick={() => setPace(p)} sx={pill(pace === p)} />
                      ))}
                    </Stack>
                  </Box>
                  <Box>
                    <GroupLabel icon={<AccessibilityNewOutlinedIcon sx={{ fontSize: 17, color: FOREST }} />}>
                      Constraints — optional
                    </GroupLabel>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Accessibility", "Dietary", "Mobility"].map((c) => (
                        <Chip
                          key={c}
                          label={c}
                          onClick={() => toggle(constraints, c, setConstraints)}
                          sx={pill(constraints.includes(c))}
                        />
                      ))}
                    </Stack>
                    <Typography sx={{ fontSize: "0.75rem", color: TEXT2, mt: 0.8 }}>
                      Used only to filter suggestions — never shared with your group.
                    </Typography>
                  </Box>
                  <Box>
                    <GroupLabel icon={<ChatBubbleOutlineIcon sx={{ fontSize: 17, color: FOREST }} />}>
                      AI tone
                    </GroupLabel>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Concise", "Detailed", "Proactive", "On request"].map((t) => (
                        <Chip key={t} label={t} onClick={() => setTone(t)} sx={pill(tone === t)} />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => { setAiSkipped(true); go(6); }}>
                    Skip for now
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} startIcon={<AutoAwesomeOutlinedIcon />} onClick={() => go(6)}>
                    Save preferences
                  </Button>
                </Stack>
                <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center", mt: 1.5 }}>
                  AI personalisation can be skipped and completed later in Profile settings.
                </Typography>
              </SectionCard>
            )}

            {/* 6 — What's next */}
            {step === 6 && (
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
                    hint="Only a name is required — dates can wait"
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
                    <TextField
                      label="Trip name"
                      size="small"
                      fullWidth
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      error={tripNameMissing}
                      helperText={tripNameMissing ? "Add a trip name" : "Destination and travellers can be added later"}
                    />
                    <Stack direction={{ xs: "column", sm: "row" }} gap={1.5}>
                      <TextField
                        label="Start — optional"
                        type="date"
                        size="small"
                        fullWidth
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label="End — optional"
                        type="date"
                        size="small"
                        fullWidth
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        error={datesInvalid}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Stack>
                    {datesInvalid && <ErrorNote>End date must be after start date.</ErrorNote>}
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
                    {invite.trim().length > 0 && !inviteValid ? (
                      <ErrorNote>
                        Invalid or expired invite. Ask for a new code, or create your own trip instead.
                      </ErrorNote>
                    ) : inviteValid ? (
                      <Box sx={{ px: 2, py: 1.6, borderRadius: "16px", bgcolor: SEAFOAM }}>
                        <Stack direction="row" alignItems="center" gap={1.25}>
                          <CheckCircleOutlineIcon sx={{ color: FOREST, fontSize: 19 }} />
                          <Typography sx={{ fontSize: "0.85rem", color: TEXT1 }}>
                            Barcelona with the crew · organiser Maria · 12–15 September · 4 travellers.
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: "0.75rem", color: TEXT2, mt: 0.6 }}>
                          Joining shares your display name with the group — nothing else.
                        </Typography>
                      </Box>
                    ) : null}
                  </Stack>
                )}

                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(aiSkipped ? 4 : 5)}>
                    Back
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} disabled={!canContinueChoice} onClick={() => go(7)}>
                    {next === "join" ? "Join trip" : "Create trip"}
                  </Button>
                </Stack>
                {!canContinueChoice && (
                  <Typography sx={{ fontSize: "0.75rem", color: TEXT2, textAlign: "center", mt: 1.25 }}>
                    {next === "join"
                      ? "Enter a valid invite — the demo code is VOYAGIO-2431."
                      : next === "create"
                        ? "Fix the highlighted field to continue."
                        : "Pick create or join to continue."}
                  </Typography>
                )}
              </SectionCard>
            )}

            {/* 7 — Notifications */}
            {step === 7 && (
              <SectionCard>
                <StepHead
                  label="Notifications"
                  title="Want Benny to nudge the group?"
                  text="We ask only now that you've seen the value: reminders for deadlines, votes and payments — nothing else. The system prompt appears only after you tap Enable."
                  mascot={bennyCalm.url}
                  alt="Benny calm"
                />
                <Stack spacing={1.25} mb={2.5}>
                  <OptionRow
                    icon={<NotificationsNoneIcon sx={{ fontSize: 19 }} />}
                    title="Enable notifications"
                    hint="Only trip updates from your own group"
                    selected={notifications === "on"}
                    onClick={() => setNotifications("on")}
                  />
                  <OptionRow
                    icon={<LockOutlinedIcon sx={{ fontSize: 19 }} />}
                    title="Not now"
                    hint="Nothing is lost — you can enable them any time in settings"
                    selected={notifications === "later"}
                    onClick={() => setNotifications("later")}
                  />
                </Stack>

                {notifications === "on" && (
                  <Box sx={{ mb: 2.5 }}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1, mb: 1 }}>
                      What you'll hear about
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {["Trip changes", "Votes", "Tasks", "Mentions", "AI reminders"].map((c) => (
                        <Chip
                          key={c}
                          label={c}
                          onClick={() => toggle(categories, c, setCategories)}
                          sx={pill(categories.includes(c))}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  sx={{ px: 2, py: 1.2, borderRadius: "18px", border: `1px solid ${alpha(FOREST, 0.12)}`, mb: 2.5 }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "0.86rem", fontWeight: 600, color: TEXT1 }}>
                      Product news and offers
                    </Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: TEXT2 }}>
                      Separate from trip alerts and off by default.
                    </Typography>
                  </Box>
                  <Switch checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                </Stack>

                <Stack direction="row" gap={1.25}>
                  <Button variant="outlined" color="primary" onClick={() => go(6)}>
                    Back
                  </Button>
                  <Button color="primary" sx={{ flex: 1 }} disabled={!notifications} onClick={() => go(8)}>
                    Continue
                  </Button>
                </Stack>
              </SectionCard>
            )}

            {/* 8 — Dashboard */}
            {step === 8 && (
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
                        {next === "join" ? "Joined a trip" : "Trip created"} ·{" "}
                        {aiSkipped ? "AI personalisation skipped" : `${budget} · ${styles.join(", ") || "no style yet"}`}
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
                      {
                        t: next === "join" ? "Barcelona with the crew · 12–15 September" : `${tripName || "Your trip"} · dates optional`,
                        s: next === "join" ? "4 travellers · you just joined" : "Add destination, dates and travellers any time",
                      },
                      { t: "Shared tasks", s: "3 open — flights, stay, dinner spot" },
                      {
                        t: "Benny's tips",
                        s: aiSkipped ? "Personalise the assistant later in Settings" : `${tone} tone · ${pace.toLowerCase()}`,
                      },
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
                    <Button color="primary" sx={{ flex: 1 }} startIcon={<PersonAddAltOutlinedIcon />}>
                      {next === "join" ? "Say hi to the group" : "Invite friends"}
                    </Button>
                    <Button component={Link} to="/plan" variant="outlined" color="primary" sx={{ flex: 1 }}>
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
