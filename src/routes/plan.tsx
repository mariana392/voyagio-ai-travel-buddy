import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

import { CREAM, SAGE, FOREST, MOSS, SAND, SEAFOAM, TEXT1, TEXT2, SURF } from "@/voyagio/theme";
import { Blob, SafeThemeProvider } from "@/voyagio/shared";
import {
  BUDGET, CHAT_INTRO, CHAT_SCRIPT, DEFAULT_MEMBERS, FALLBACK_REPLY,
  ITINERARY, TASKS, TRAVEL_STYLES, type ChatMsg, type TravelStyle,
} from "@/voyagio/data";

import bennyTips from "@/assets/benny-tips.png.asset.json";
import bennyIdea from "@/assets/benny-idea.png.asset.json";
import bennyBudget from "@/assets/benny-budget.png.asset.json";
import bennyRoute from "@/assets/benny-route.png.asset.json";
import bennyGo from "@/assets/benny-go.png.asset.json";
import bennyWave from "@/assets/benny-wave.png.asset.json";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Plan a group trip with Benny — Voyagio" },
      { name: "description", content: "Describe your trip, add your group, pick a style — and Benny turns it into a day-by-day route, a rough budget and shared tasks." },
      { property: "og:title", content: "Plan a group trip with Benny — Voyagio" },
      { property: "og:description", content: "A demo of the Voyagio AI assistant: route, budget and task split for your group." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanPage,
});

const LABEL = {
  fontSize: "0.68rem",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: TEXT2,
};

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

// ─── Brief form ───────────────────────────────────────────────────────────────
function Brief({ onGenerate, generating }: { onGenerate: () => void; generating: boolean }) {
  const [destination, setDestination] = useState("Barcelona, Spain");
  const [dates, setDates] = useState("12–15 September");
  const [wishes, setWishes] = useState("Sea, good food, not too packed. One day outside the city.");
  const [style, setStyle] = useState<TravelStyle>("Comfort");
  const [days, setDays] = useState(4);
  const [members, setMembers] = useState<string[]>(DEFAULT_MEMBERS);
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    const label = newMember.trim() || `Traveller ${members.length + 1}`;
    setMembers((m) => [...m, label]);
    setNewMember("");
  };

  return (
    <Stack spacing={2.5}>
      <SectionCard>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2} mb={2.5}>
          <Box>
            <Typography sx={LABEL}>Trip brief</Typography>
            <Typography variant="h6" sx={{ color: TEXT1, mt: 0.4, fontSize: "1.15rem" }}>
              Tell Benny what your group needs
            </Typography>
            <Typography sx={{ fontSize: "0.85rem", color: TEXT2, mt: 0.5, maxWidth: 380, lineHeight: 1.6 }}>
              Destination, dates, group size and wishes — that's all. Everything is pre-filled with a sensible default.
            </Typography>
          </Box>
          <Mascot src={bennyTips.url} alt="Benny giving travel tips" width={{ xs: 78, sm: 104 }} sx={{ flexShrink: 0, mt: -1 }} />
        </Stack>

        <Stack spacing={1.75}>
          <TextField label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} fullWidth size="small" />
          <TextField label="Dates" value={dates} onChange={(e) => setDates(e.target.value)} fullWidth size="small" />
          <TextField
            label="Wishes for the trip"
            value={wishes}
            onChange={(e) => setWishes(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px" }, "& .MuiOutlinedInput-input": { paddingLeft: "8px" } }}
          />
        </Stack>
      </SectionCard>

      <SectionCard>
        <Typography sx={LABEL}>Your group</Typography>
        <Typography sx={{ fontSize: "0.82rem", color: TEXT2, mt: 0.6, mb: 1.75, lineHeight: 1.6 }}>
          Add people as nicknames only — no emails, no documents, no payment details.
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
          {members.map((m, i) => (
            <Chip
              key={`${m}-${i}`}
              label={m}
              onDelete={i === 0 ? undefined : () => setMembers((list) => list.filter((_, idx) => idx !== i))}
              deleteIcon={<CloseIcon sx={{ fontSize: 15 }} />}
              sx={{
                bgcolor: i === 0 ? alpha(FOREST, 0.09) : alpha(MOSS, 0.14),
                color: i === 0 ? FOREST : "#2D5C40",
                borderRadius: 100,
                height: 32,
                fontSize: "0.8rem",
              }}
            />
          ))}
        </Stack>

        <Stack direction="row" gap={1}>
          <TextField
            size="small"
            placeholder="Nickname (e.g. Traveller 5)"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMember(); } }}
            sx={{ flex: 1 }}
          />
          <Button variant="outlined" color="primary" onClick={addMember} sx={{ px: 2.5, flexShrink: 0 }}>
            <AddIcon sx={{ fontSize: 18, mr: 0.5 }} /> Add
          </Button>
        </Stack>
      </SectionCard>

      <SectionCard>
        <Typography sx={LABEL}>Personalisation</Typography>
        <Typography sx={{ fontSize: "0.82rem", color: TEXT2, mt: 0.6, mb: 2, lineHeight: 1.6 }}>
          Benny already picked a smart default — change it only if you want.
        </Typography>

        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1, mb: 1 }}>Travel style</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mb={2.5}>
          {TRAVEL_STYLES.map((s) => (
            <Chip
              key={s}
              label={s}
              onClick={() => setStyle(s)}
              sx={{
                borderRadius: 100,
                height: 34,
                px: 0.5,
                cursor: "pointer",
                bgcolor: style === s ? FOREST : SURF,
                color: style === s ? SURF : TEXT1,
                border: `1px solid ${style === s ? FOREST : alpha(FOREST, 0.16)}`,
                "&:hover": { bgcolor: style === s ? FOREST : alpha(MOSS, 0.12) },
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1, mb: 1 }}>Duration</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} mb={2.5}>
          {[3, 4, 5, 7].map((d) => (
            <Chip
              key={d}
              label={`${d} days`}
              onClick={() => setDays(d)}
              sx={{
                borderRadius: 100,
                height: 34,
                cursor: "pointer",
                bgcolor: days === d ? FOREST : SURF,
                color: days === d ? SURF : TEXT1,
                border: `1px solid ${days === d ? FOREST : alpha(FOREST, 0.16)}`,
                "&:hover": { bgcolor: days === d ? FOREST : alpha(MOSS, 0.12) },
              }}
            />
          ))}
        </Stack>

        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: TEXT1, mb: 1 }}>Group size</Typography>
        <Typography sx={{ fontSize: "0.85rem", color: TEXT2, mb: 3 }}>
          {members.length} travellers — taken from your group above.
        </Typography>

        <Button
          fullWidth
          size="large"
          color="primary"
          onClick={onGenerate}
          disabled={generating}
          startIcon={<AutoAwesomeOutlinedIcon />}
        >
          {generating ? "Benny is thinking…" : "Build the plan"}
        </Button>

        <Stack direction="row" alignItems="center" gap={0.75} justifyContent="center" mt={1.75}>
          <LockOutlinedIcon sx={{ fontSize: 13, color: TEXT2 }} />
          <Typography sx={{ fontSize: "0.72rem", color: TEXT2 }}>
            Demo only — nothing is sent, stored or booked.
          </Typography>
        </Stack>
      </SectionCard>
    </Stack>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────
function EmptyResult() {
  return (
    <SectionCard sx={{ textAlign: "center", py: { xs: 5, md: 7 } }}>
      <Mascot src={bennyIdea.url} alt="Benny waiting for your brief" width={{ xs: 150, md: 190 }} sx={{ mx: "auto", mb: 2.5 }} />
      <Typography variant="h6" sx={{ color: TEXT1, fontSize: "1.1rem" }}>
        Your plan will appear here
      </Typography>
      <Typography sx={{ fontSize: "0.87rem", color: TEXT2, mt: 1, maxWidth: 330, mx: "auto", lineHeight: 1.65 }}>
        Fill the brief on the left and hit “Build the plan” — route, rough budget and task split, all in one go.
      </Typography>
    </SectionCard>
  );
}

function ResultBlock() {
  return (
    <Stack spacing={2.5}>
      {/* summary */}
      <SectionCard sx={{ bgcolor: SAGE, border: `1px solid ${alpha(FOREST, 0.1)}` }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Box>
            <Chip
              label="Draft plan · you can change everything"
              size="small"
              sx={{ bgcolor: alpha(SURF, 0.75), color: FOREST, fontSize: "0.72rem", height: 26, mb: 1.5 }}
            />
            <Typography variant="h6" sx={{ color: TEXT1, fontSize: { xs: "1.2rem", md: "1.4rem" }, lineHeight: 1.25 }}>
              Barcelona · 12–15 September
            </Typography>
            <Typography sx={{ fontSize: "0.87rem", color: TEXT2, mt: 0.6 }}>
              4 travellers · 4 days · comfort style · ~€430 per person
            </Typography>
          </Box>
          <Mascot src={bennyGo.url} alt="Benny excited about the trip" width={{ xs: 82, md: 118 }} sx={{ flexShrink: 0 }} />
        </Stack>
      </SectionCard>

      {/* itinerary */}
      <SectionCard>
        <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
          <Mascot src={bennyRoute.url} alt="Benny showing the route" width={54} />
          <Box>
            <Typography sx={LABEL}>Route</Typography>
            <Typography variant="h6" sx={{ color: TEXT1, fontSize: "1.05rem" }}>Day by day</Typography>
          </Box>
        </Stack>

        <Stack spacing={1.5}>
          {ITINERARY.map((d) => (
            <Box
              key={d.day}
              sx={{
                borderRadius: "18px",
                border: `1px solid ${alpha(FOREST, 0.09)}`,
                p: 2,
                bgcolor: CREAM,
              }}
            >
              <Stack direction="row" alignItems="baseline" gap={1.25} mb={1.25}>
                <Chip label={d.day} size="small" sx={{ bgcolor: FOREST, color: SURF, height: 22, fontSize: "0.68rem" }} />
                <Typography sx={{ fontWeight: 700, fontSize: "0.92rem", color: TEXT1 }}>{d.title}</Typography>
              </Stack>
              <Stack spacing={0.85}>
                {d.items.map((it) => (
                  <Stack key={it.time} direction="row" gap={1.5} alignItems="flex-start">
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: MOSS, width: 46, flexShrink: 0 }}>
                      {it.time}
                    </Typography>
                    <Typography sx={{ fontSize: "0.85rem", color: TEXT1, lineHeight: 1.45 }}>{it.text}</Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack direction="row" gap={1} alignItems="flex-start" mt={1.5}>
                <PlaceOutlinedIcon sx={{ fontSize: 15, color: TEXT2, mt: "1px" }} />
                <Typography sx={{ fontSize: "0.78rem", color: TEXT2, fontStyle: "italic", lineHeight: 1.5 }}>
                  {d.tip}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>
      </SectionCard>

      {/* budget */}
      <SectionCard>
        <Stack direction="row" alignItems="center" gap={1.5} mb={2.5}>
          <Mascot src={bennyBudget.url} alt="Benny holding a coin" width={54} />
          <Box>
            <Typography sx={LABEL}>Budget</Typography>
            <Typography variant="h6" sx={{ color: TEXT1, fontSize: "1.05rem" }}>
              ~{BUDGET.currency}{BUDGET.totalPerPerson} per person
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1.75}>
          {BUDGET.lines.map((l) => (
            <Box key={l.label}>
              <Stack direction="row" justifyContent="space-between" alignItems="baseline" mb={0.6}>
                <Typography sx={{ fontSize: "0.85rem", color: TEXT1 }}>{l.label}</Typography>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: FOREST }}>
                  {BUDGET.currency}{l.perPerson}
                </Typography>
              </Stack>
              <LinearProgress variant="determinate" value={l.pct * 3} />
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2.25 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography sx={{ fontSize: "0.85rem", color: TEXT2 }}>Group total (4 travellers)</Typography>
          <Typography sx={{ fontWeight: 800, color: TEXT1 }}>
            {BUDGET.currency}{BUDGET.totalPerPerson * 4}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: "0.75rem", color: TEXT2, mt: 1.25, lineHeight: 1.55 }}>
          {BUDGET.note}
        </Typography>
      </SectionCard>

      {/* tasks */}
      <SectionCard>
        <Typography sx={LABEL}>Tasks</Typography>
        <Typography variant="h6" sx={{ color: TEXT1, fontSize: "1.05rem", mt: 0.4, mb: 2 }}>
          Shared between the group
        </Typography>

        <Stack spacing={1.25}>
          {TASKS.map((t) => (
            <Stack
              key={t.task}
              direction="row"
              alignItems="center"
              gap={1.5}
              sx={{
                borderRadius: "16px",
                border: `1px solid ${alpha(FOREST, 0.09)}`,
                bgcolor: SURF,
                p: 1.75,
              }}
            >
              <Box
                sx={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  bgcolor: SEAFOAM, color: FOREST,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.8rem",
                }}
              >
                {t.owner.slice(0, 1)}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: "0.87rem", color: TEXT1, fontWeight: 600, lineHeight: 1.4 }}>
                  {t.task}
                </Typography>
                <Typography sx={{ fontSize: "0.76rem", color: TEXT2, mt: 0.2 }}>{t.owner}</Typography>
              </Box>
              <Chip label={t.due} size="small" sx={{ bgcolor: alpha(SAND, 0.5), color: "#5b4a1f", height: 24, fontSize: "0.7rem" }} />
            </Stack>
          ))}
        </Stack>
      </SectionCard>
    </Stack>
  );
}

// ─── Chat ─────────────────────────────────────────────────────────────────────
function Chat() {
  const [messages, setMessages] = useState<ChatMsg[]>([CHAT_INTRO]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [used, setUsed] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, typing]);

  const ask = (text: string) => {
    if (!text.trim() || typing) return;
    const hit = CHAT_SCRIPT.find((s) => s.prompt === text);
    setMessages((m) => [...m, { from: "you", text }]);
    setInput("");
    if (hit) setUsed((u) => [...u, hit.prompt]);
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, hit ? hit.reply : FALLBACK_REPLY]);
      setTyping(false);
    }, 900);
  };

  const suggestions = CHAT_SCRIPT.filter((s) => !used.includes(s.prompt)).map((s) => s.prompt);

  return (
    <SectionCard sx={{ p: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* header */}
      <Stack direction="row" alignItems="center" gap={1.5} sx={{ px: 2.5, py: 2, bgcolor: SAGE, borderBottom: `1px solid ${alpha(FOREST, 0.09)}` }}>
        <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: SURF, overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <Box component="img" src={bennyWave.url} alt="Benny" sx={{ width: 40, height: 40, objectFit: "contain" }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, color: TEXT1, fontSize: "0.95rem" }}>Benny</Typography>
          <Typography sx={{ fontSize: "0.75rem", color: TEXT2 }}>Your group travel assistant</Typography>
        </Box>
        <Chip label="Demo" size="small" sx={{ bgcolor: alpha(SURF, 0.8), color: FOREST, height: 24, fontSize: "0.7rem" }} />
      </Stack>

      {/* messages */}
      <Box sx={{ px: 2.5, py: 2.5, flex: 1, minHeight: 300, maxHeight: 460, overflowY: "auto", bgcolor: CREAM }}>
        <Stack spacing={1.5}>
          {messages.map((m, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: m.from === "you" ? "flex-end" : "flex-start",
                maxWidth: "86%",
                bgcolor: m.from === "you" ? FOREST : SURF,
                color: m.from === "you" ? SURF : TEXT1,
                border: m.from === "you" ? "none" : `1px solid ${alpha(FOREST, 0.09)}`,
                borderRadius: m.from === "you" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                px: 2, py: 1.5,
              }}
            >
              <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.55 }}>{m.text}</Typography>
              {m.bullets && (
                <Stack component="ul" spacing={0.5} sx={{ pl: 2.25, mt: 1, mb: 0 }}>
                  {m.bullets.map((b) => (
                    <Typography component="li" key={b} sx={{ fontSize: "0.82rem", lineHeight: 1.5, color: m.from === "you" ? SURF : TEXT2 }}>
                      {b}
                    </Typography>
                  ))}
                </Stack>
              )}
            </Box>
          ))}

          {typing && (
            <Box sx={{ alignSelf: "flex-start", bgcolor: SURF, border: `1px solid ${alpha(FOREST, 0.09)}`, borderRadius: "18px 18px 18px 4px", px: 2, py: 1.4 }}>
              <Stack direction="row" gap={0.6}>
                {[0, 1, 2].map((d) => (
                  <Box
                    key={d}
                    sx={{
                      width: 6, height: 6, borderRadius: "50%", bgcolor: MOSS,
                      animation: "bennyDot 1s ease-in-out infinite",
                      animationDelay: `${d * 0.16}s`,
                      "@keyframes bennyDot": {
                        "0%,100%": { opacity: 0.3, transform: "translateY(0)" },
                        "50%": { opacity: 1, transform: "translateY(-3px)" },
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
          <div ref={endRef} />
        </Stack>
      </Box>

      {/* suggestions + input */}
      <Box sx={{ px: 2.5, py: 2, borderTop: `1px solid ${alpha(FOREST, 0.09)}`, bgcolor: SURF }}>
        {suggestions.length > 0 && (
          <Stack direction="row" flexWrap="wrap" gap={0.75} mb={1.5}>
            {suggestions.map((s) => (
              <Chip
                key={s}
                label={s}
                onClick={() => ask(s)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 100,
                  height: 30,
                  fontSize: "0.76rem",
                  bgcolor: alpha(MOSS, 0.13),
                  color: "#2D5C40",
                  "&:hover": { bgcolor: alpha(MOSS, 0.22) },
                }}
              />
            ))}
          </Stack>
        )}

        <Stack direction="row" gap={1}>
          <TextField
            size="small"
            fullWidth
            placeholder="Ask Benny anything about the trip…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); ask(input); } }}
          />
          <IconButton
            aria-label="Send message"
            onClick={() => ask(input)}
            sx={{ bgcolor: FOREST, color: SURF, width: 40, height: 40, flexShrink: 0, "&:hover": { bgcolor: "#2D5C40" } }}
          >
            <SendIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>

        <Typography sx={{ fontSize: "0.7rem", color: TEXT2, mt: 1.25, lineHeight: 1.5 }}>
          Benny gives rough suggestions — not bookings, and never a decision made for your group.
        </Typography>
      </Box>
    </SectionCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function PlanPage() {
  const [generating, setGenerating] = useState(false);
  const [ready, setReady] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReady(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }, 1100);
  };

  return (
    <SafeThemeProvider>
      <CssBaseline />

      <AppBar position="sticky" elevation={0} component="header">
        <Toolbar sx={{ minHeight: { xs: 62, sm: 70 }, px: { xs: 2, sm: 5 }, gap: 1.5 }}>
          <Button
            component={Link}
            to="/"
            variant="text"
            sx={{ color: TEXT1, px: 1, minWidth: 0 }}
            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
          >
            Back
          </Button>
          <Typography
            variant="h6"
            sx={{ color: TEXT1, fontWeight: 800, letterSpacing: "-0.04em", fontSize: { xs: "1.1rem", sm: "1.25rem" }, flex: 1 }}
          >
            Voyagio
          </Typography>
          <Chip
            label="AI assistant"
            size="small"
            sx={{ bgcolor: alpha(FOREST, 0.08), color: FOREST, height: 28, fontSize: "0.75rem" }}
          />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ position: "relative", overflow: "hidden", bgcolor: CREAM, py: { xs: 4, md: 6 } }}>
        <Blob color={SAGE} sx={{ width: 620, top: -180, right: -220, opacity: 0.65 }} />
        <Blob color={alpha(SAND, 0.4)} sx={{ width: 420, bottom: -140, left: -150 }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 620, mb: { xs: 4, md: 5 } }}>
            <Typography variant="h1" component="h1" sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, color: TEXT1, mb: 1.5 }}>
              Let's plan it together
            </Typography>
            <Typography sx={{ color: TEXT2, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.7 }}>
              You're the organiser. Give Benny the basics, and get a route, a rough budget and a fair task split your group can react to.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 400px) minmax(0, 1fr)" },
              gap: { xs: 2.5, md: 3.5 },
              alignItems: "start",
            }}
          >
            <Box sx={{ position: { md: "sticky" }, top: { md: 90 } }}>
              <Brief onGenerate={generate} generating={generating} />
            </Box>

            <Stack spacing={2.5} ref={resultRef}>
              {ready ? <ResultBlock /> : <EmptyResult />}
              <Chat />
            </Stack>
          </Box>
        </Container>
      </Box>
    </SafeThemeProvider>
  );
}
