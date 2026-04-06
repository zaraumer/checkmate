"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Crown,
  Eye,
  Heart,
  Info,
  MessageCircleQuestion,
  MoveRight,
  ShieldCheck,
  Sparkles,
  Type,
  Wrench,
  Contrast,
  Accessibility,
  CircleHelp,
  Volume2,
  Droplets,
  Sword,
  Shield,
} from "lucide-react";

// Types
type FlowLevel = "Light" | "Medium" | "Heavy";
type LogEntry = { id: number; date: string; flow: FlowLevel; symptoms: string[]; };
type ProcedureSection = { overview: string; checksFor: string[]; tools: { name: string; purpose: string }[]; steps: string[]; feeling: string; comfortTips: string[]; questions: string[]; followUp: string[]; };
type Procedure = { id: string; name: string; short: string; missionLine: string; standard: ProcedureSection; simple: ProcedureSection; resources: { title: string; source: string; href: string; type: "Video" | "Guide" | "Resources"; }[]; };
type Concern = { id: string; title: string; response: string; actions: string[]; };

const procedures: Procedure[] = [
  {
    id: "pap-smear",
    name: "Pap Smear",
    short: "A screening used to check cervical cells for abnormal changes.",
    missionLine: "This helps catch cervical cell changes early, often before they become more serious.",
    standard: {
      overview: "A Pap smear, also called a Pap test, collects cells from the cervix so they can be checked for abnormal changes. It is often part of cervical cancer screening.",
      checksFor: ["Abnormal cervical cell changes", "Signs that may need follow-up testing", "Sometimes cervical screening is paired with HPV testing"],
      tools: [
        { name: "Speculum", purpose: "Used to gently open the vaginal canal so the cervix can be seen clearly." },
        { name: "Small brush or swab", purpose: "Used to collect a quick sample of cervical cells." },
        { name: "Exam table and stirrups", purpose: "Help position the body so the provider can perform the screening safely." },
      ],
      steps: [
        "You change into a gown or undress from the waist down.",
        "You lie back on the exam table with your feet supported.",
        "A provider gently inserts a speculum so they can see the cervix.",
        "A small brush or swab collects a quick sample of cells.",
        "The sample is sent to a lab for review.",
      ],
      feeling: "You may feel pressure, stretching, or a brief pinch. It can feel uncomfortable, but it is usually very short.",
      comfortTips: ["Ask the provider to explain each step before it happens.", "Request a smaller speculum if needed.", "Take slow breaths and try to relax your shoulders and pelvic muscles."],
      questions: ["Can you walk me through each step before you do it?", "When will I get my results?", "Will this include HPV testing too?"],
      followUp: ["Results may be normal, unclear, or show changes that need follow-up.", "If follow-up is needed, your provider may explain next steps such as repeat testing or other exams."],
    },
    simple: {
      overview: "A Pap smear is a quick screening that checks the cervix for cell changes.",
      checksFor: ["Cell changes in the cervix", "Whether more follow-up is needed"],
      tools: [{ name: "Speculum", purpose: "Helps the provider see the cervix." }, { name: "Brush or swab", purpose: "Collects a small sample of cells." }],
      steps: ["You get into position on the table.", "A provider uses a speculum to see the cervix.", "A quick sample of cells is collected."],
      feeling: "It can feel like pressure or a short cramp, but it passes quickly.",
      comfortTips: ["Ask to go slowly.", "Ask questions before the test starts.", "Remember you can speak up if you need a pause."],
      questions: ["Can you tell me what you are doing as you go?", "How long will this take?"],
      followUp: ["Your provider will explain your results and whether anything else is needed."],
    },
    resources: [
      { title: "Pap smear overview", source: "Mayo Clinic", href: "https://www.mayoclinic.org/tests-procedures/pap-smear/about/pac-20394841", type: "Guide" },
      { title: "Cervical cancer screening video", source: "ACOG", href: "https://www.acog.org/womens-health/videos/cervical-cancer-screening", type: "Video" },
    ],
  },
  {
    id: "pelvic-exam",
    name: "Pelvic Exam",
    short: "An exam used to assess reproductive and pelvic health.",
    missionLine: "This helps providers assess pelvic and reproductive health especially when symptoms are present.",
    standard: {
      overview: "A pelvic exam checks the health of the reproductive organs. A provider may recommend it as part of care or when symptoms such as pelvic pain or unusual discharge need evaluation.",
      checksFor: ["Signs of tenderness, swelling, or unusual changes", "Concerns involving the uterus, ovaries, or vagina", "Symptoms such as pelvic pain or discharge"],
      tools: [{ name: "Gloves", purpose: "Used for a safe and hygienic exam." }, { name: "Speculum", purpose: "Used if the provider needs to look inside the vagina." }, { name: "Exam table", purpose: "Helps position the body for the exam." }],
      steps: ["You get positioned on the table.", "The provider performs an external check.", "If needed, a speculum is used for an internal view.", "The provider checks for tenderness with gloved fingers."],
      feeling: "You may feel pressure or fullness. You can say if anything feels painful.",
      comfortTips: ["Empty your bladder beforehand.", "Tell your provider if anything feels sharp.", "Ask them to explain what they are checking for."],
      questions: ["What part of the exam are we doing right now?", "What are you checking for?", "Can you pause for a second?"],
      followUp: ["Your provider may tell you findings right away.", "If they notice something, they may recommend further tests."],
    },
    simple: {
      overview: "A pelvic exam helps a provider check your pelvic health.",
      checksFor: ["Pain, tenderness, or changes", "General organ health"],
      tools: [{ name: "Gloves", purpose: "Used during the exam." }, { name: "Speculum", purpose: "Helps the provider see inside." }],
      steps: ["Checking the outside first.", "Checking the inside if needed.", "Feeling for any changes with a gloved hand."],
      feeling: "It feels like pressure. You can say if it hurts.",
      comfortTips: ["Take deep breaths.", "Ask questions as you go.", "Tell them if you are nervous."],
      questions: ["Can you explain the next step?", "Is everything okay?"],
      followUp: ["The doctor will tell you if they need more tests."],
    },
    resources: [{ title: "Pelvic exam overview", source: "Mayo Clinic", href: "https://www.mayoclinic.org/tests-procedures/pelvic-exam/about/pac-20385135", type: "Guide" }],
  },
  {
    id: "mammogram",
    name: "Mammogram",
    short: "An X-ray screening used to look for changes in breast tissue.",
    missionLine: "This helps detect breast changes early and supports screening care.",
    standard: {
      overview: "A mammogram is an X-ray of the breast used to screen for breast cancer or to look closely at breast-related concerns.",
      checksFor: ["Breast tissue changes", "Early signs of breast cancer", "Areas needing follow-up imaging"],
      tools: [{ name: "Mammography machine", purpose: "Takes low-dose X-ray images." }, { name: "Compression plates", purpose: "Briefly flattens the breast for a clear image." }],
      steps: ["You stand in front of the machine.", "The breast is positioned on a flat plate.", "Another plate presses the breast briefly for an image.", "Images are taken from different angles."],
      feeling: "It feels like firm pressure or squeezing for a few seconds at a time.",
      comfortTips: ["Tell the tech if it's too much pressure.", "Wear a two-piece outfit.", "Schedule when breasts are less tender."],
      questions: ["How many images will be taken?", "When should I expect results?", "What if something needs follow-up?"],
      followUp: ["Many results are normal.", "If more imaging is needed, it means the doctor wants a closer look."],
    },
    simple: {
      overview: "A mammogram is a breast X-ray.",
      checksFor: ["Changes in the breast", "Areas that need a closer look"],
      tools: [{ name: "Mammogram machine", purpose: "Takes the X-ray." }, { name: "Plates", purpose: "Hold the breast for clear images." }],
      steps: ["Positioning the breast.", "A quick squeeze.", "Taking the picture."],
      feeling: "A tight squeeze for a moment, but very quick.",
      comfortTips: ["Take a breath during the squeeze.", "Tell the technician if you're uncomfortable."],
      questions: ["Is it almost done?", "When will I hear back?"],
      followUp: ["Your doctor will call you with results."],
    },
    resources: [{ title: "Mammogram overview", source: "Mayo Clinic", href: "https://www.mayoclinic.org/tests-procedures/mammogram/about/pac-20384806", type: "Guide" }],
  },
];

const concerns: Concern[] = [
  { id: "pain", title: "I’m worried it will hurt", response: "Many people feel this way. Some procedures feel like pressure or a quick cramp. Knowing what tools are used and asking for slower pacing can help you feel in control.", actions: ["Ask for a smaller speculum.", "Ask to explain each step.", "Tell them if it hurts."] },
  { id: "tools", title: "I don’t know what the tools are", response: "Unfamiliar tools can be scary. Checkmate explains what each tool is and why it's used so nothing is a surprise during your visit.", actions: ["Read the 'Tools Used' tab.", "Ask to see the tool first.", "Ask what the tool checks for."] },
  { id: "awkward", title: "I feel embarrassed or awkward", response: "This is a very common feeling. Clear communication and knowing what to expect can make the process feel much more manageable.", actions: ["Ask for step-by-step narration.", "Ask for a pause if you need one.", "Focus on your breathing."] },
];

// FIXED cn FUNCTION TO PREVENT RED LINES
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}

function SectionCard({ title, icon, children, vibrant = false }: { title: string; icon: ReactNode; children: ReactNode; vibrant?: boolean; }) {
  return (
    <div className={cn("cute-card p-8 transition-all bg-white", vibrant ? "bg-gradient-to-br from-white to-pink-50 border-pink-100" : "border-slate-100 shadow-sm")}>
      <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-slate-800">
        <span className="rounded-xl bg-pink-100 p-2 text-pink-600">{icon}</span>
        {title}
      </h3>
      <div className="text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

export default function Page() {
  const [view, setView] = useState<"home" | "procedures" | "concerns" | "tracker">("home");
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(null);
  const [procedureTab, setProcedureTab] = useState<"overview" | "checks" | "tools" | "steps" | "comfort" | "questions" | "resources">("overview");
  const [selectedConcernId, setSelectedConcernId] = useState<string>("pain");
  const [simpleLanguage, setSimpleLanguage] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Tracker State
  const [date, setDate] = useState("");
  const [flow, setFlow] = useState<FlowLevel>("Medium");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([{ id: 1, date: "2026-04-02", flow: "Medium", symptoms: ["Cramps", "Fatigue"] }]);

  const symptomOptions = ["Cramps", "Fatigue", "Headache", "Mood changes", "Bloating"];

  const selectedProcedure = useMemo(() => procedures.find((p) => p.id === selectedProcedureId) ?? null, [selectedProcedureId]);
  const selectedConcern = useMemo(() => concerns.find((c) => c.id === selectedConcernId) ?? concerns[0], [selectedConcernId]);
  const activeContent = useMemo(() => {
    if (!selectedProcedure) return null;
    return simpleLanguage ? selectedProcedure.simple : selectedProcedure.standard;
  }, [selectedProcedure, simpleLanguage]);

  const addLog = () => {
    if (!date) return;
    setLogs([{ id: Date.now(), date, flow, symptoms }, ...logs]);
    setDate(""); setSymptoms([]);
  };

  return (
    <div className={cn("min-h-screen transition-all duration-500", highContrast ? "high-contrast-mode" : "bg-[#fffafa]", largeText ? "text-xl" : "text-base")}>
      
      {/* Subtle Chess Decoration */}
      {!highContrast && (
        <>
          <Crown className="chess-piece text-pink-300 top-20 left-10" size={140} />
          <Sword className="chess-piece text-purple-300 bottom-20 right-10" size={110} />
          <Shield className="chess-piece text-blue-300 top-1/2 left-[10%]" size={90} />
        </>
      )}

      <nav className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <button onClick={() => { setView("home"); setSelectedProcedureId(null); }} className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-indigo-400 text-white shadow-lg">
            <Crown size={24} />
          </div>
          <p className="text-2xl font-black tracking-tight text-slate-800">Checkmate</p>
        </button>
        <div className="flex gap-2 rounded-2xl bg-white/70 p-1.5 shadow-sm border border-white/50 backdrop-blur-md">
          {["home", "procedures", "concerns", "tracker"].map((item) => (
            <button
              key={item}
              onClick={() => { setView(item as any); setSelectedProcedureId(null); }}
              className={cn("rounded-xl px-5 py-2 text-sm font-bold capitalize transition-all", view === item ? "bg-slate-800 text-white" : "text-slate-600 hover:bg-white")}
            >
              {item === "tracker" ? "Flow Tracker" : item === "concerns" ? "Concerns Hub" : item}
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-4">
        {/* Accessibility Panel */}
        <div className="mb-10 rounded-[2rem] border-2 border-white/80 bg-white/40 p-6 backdrop-blur-sm shadow-sm flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-slate-700">
            <Accessibility size={20} className="text-indigo-500" />
            <span className="font-bold">Comfort Controls</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Simple Language", active: simpleLanguage, action: () => setSimpleLanguage(!simpleLanguage), icon: <Volume2 size={16} /> },
              { label: "Large Text", active: largeText, action: () => setLargeText(!largeText), icon: <Type size={16} /> },
              { label: "High Contrast", active: highContrast, action: () => setHighContrast(!highContrast), icon: <Contrast size={16} /> },
              { label: "Reduced Motion", active: reducedMotion, action: () => setReducedMotion(!reducedMotion), icon: <Sparkles size={16} /> },
            ].map((toggle) => (
              <button
                key={toggle.label}
                onClick={toggle.action}
                className={cn("flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all border-2", toggle.active ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-white text-slate-600 shadow-sm")}
              >
                {toggle.icon} {toggle.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.section key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-12">
              <h1 className="mb-6 max-w-4xl text-6xl md:text-7xl font-black text-slate-800 leading-tight">
                Make your next move <br/>
                <span className="bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">with confidence.</span>
              </h1>
              <p className="mb-10 max-w-2xl text-lg text-slate-600 font-medium leading-relaxed">
                Reproductive health prep, simplified. Checkmate helps you move from fear to readiness with plain-language explainers, tool breakdowns, and a period flow tracker.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setView("procedures")} className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-slate-800 text-white font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-slate-200">
                  Explore Procedures <MoveRight />
                </button>
                <button onClick={() => setView("tracker")} className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-white text-slate-800 border-2 border-slate-100 font-bold text-lg hover:bg-pink-50 transition-colors">
                  Open Flow Tracker <Calendar />
                </button>
              </div>
            </motion.section>
          )}

          {view === "procedures" && !selectedProcedure && (
            <motion.section key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-8 md:grid-cols-3">
              {procedures.map((p) => (
                <button key={p.id} onClick={() => setSelectedProcedureId(p.id)} className="cute-card p-8 text-left bg-white transition-all hover:-translate-y-2 group">
                  <div className="mb-6 h-14 w-14 flex items-center justify-center bg-pink-50 text-pink-500 rounded-2xl group-hover:scale-110 transition-transform"><Eye size={28} /></div>
                  <h3 className="text-2xl font-black text-slate-800 mb-3">{p.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">{p.short}</p>
                  <span className="flex items-center gap-2 font-bold text-pink-600 text-sm">Open Guide <ChevronRight size={18} /></span>
                </button>
              ))}
            </motion.section>
          )}

          {view === "procedures" && selectedProcedure && activeContent && (
            <motion.section key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
               <button onClick={() => setSelectedProcedureId(null)} className="mb-8 flex items-center gap-2 font-bold text-slate-500 hover:text-pink-600 transition-colors"><ArrowLeft size={18} /> Back to all procedures</button>
               <div className="cute-card p-10 bg-white mb-8 border-none shadow-xl shadow-pink-50">
                 <h2 className="text-5xl font-black text-slate-800 mb-8 tracking-tight">{selectedProcedure.name}</h2>
                 <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 rounded-2xl">
                    {["overview", "checks", "tools", "steps", "comfort", "questions", "resources"].map(tab => (
                      <button key={tab} onClick={() => setProcedureTab(tab as any)} className={cn("px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all", procedureTab === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600")}>
                        {tab}
                      </button>
                    ))}
                 </div>
               </div>

               <div className="grid gap-6">
                 {procedureTab === "overview" && <SectionCard title="Analysis" icon={<Info />} vibrant>{activeContent.overview}</SectionCard>}
                 {procedureTab === "checks" && <SectionCard title="Checks For" icon={<Eye />} vibrant><ul className="space-y-4">{activeContent.checksFor.map(c => <li key={c} className="flex gap-3 font-medium"><CheckCircle2 className="text-pink-500 shrink-0" /> {c}</li>)}</ul></SectionCard>}
                 {procedureTab === "tools" && <div className="grid gap-6 md:grid-cols-2">{activeContent.tools.map(t => <SectionCard key={t.name} title={t.name} icon={<Wrench />}>{t.purpose}</SectionCard>)}</div>}
                 {procedureTab === "steps" && <SectionCard title="Maneuvers" icon={<ShieldCheck />}><div className="space-y-8">{activeContent.steps.map((s, i) => <div key={i} className="flex gap-6"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600 font-black text-lg">{i+1}</span><p className="pt-1.5 font-medium">{s}</p></div>)}</div></SectionCard>}
                 {procedureTab === "comfort" && <SectionCard title="Defense & Comfort" icon={<Heart />} vibrant><ul className="space-y-4">{activeContent.comfortTips.map(t => <li key={t} className="flex gap-3"><Sparkles className="text-pink-400 shrink-0" /> {t}</li>)}</ul></SectionCard>}
                 {procedureTab === "questions" && <SectionCard title="Strategic Questions" icon={<MessageCircleQuestion />} vibrant><ul className="space-y-4">{activeContent.questions.map(q => <li key={q} className="flex gap-3"><Sparkles className="text-pink-500 shrink-0" /> {q}</li>)}</ul></SectionCard>}
                 {procedureTab === "resources" && (
                   <div className="grid gap-6 md:grid-cols-2">
                     {selectedProcedure.resources.map(r => (
                       <a key={r.href} href={r.href} target="_blank" className="p-8 bg-white border-2 rounded-[2rem] hover:border-pink-300 transition-all shadow-sm">
                         <p className="font-bold text-slate-800 text-lg mb-2">{r.title}</p>
                         <div className="flex items-center justify-between">
                            <span className="text-sm font-black uppercase tracking-widest text-pink-500">{r.source}</span>
                            <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold">{r.type}</span>
                         </div>
                       </a>
                     ))}
                   </div>
                 )}
               </div>
            </motion.section>
          )}

          {view === "concerns" && (
            <motion.section key="concerns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-slate-800 mb-6">Concerns Hub</h2>
                {concerns.map(c => (
                  <button key={c.id} onClick={() => setSelectedConcernId(c.id)} className={cn("w-full p-6 text-left rounded-3xl border-2 transition-all font-bold", selectedConcernId === c.id ? "border-pink-300 bg-pink-50 text-pink-700 shadow-inner" : "border-white bg-white/60 text-slate-500")}>
                    {c.title}
                  </button>
                ))}
              </div>
              <div className="lg:col-span-2">
                <div className="cute-card p-12 bg-white h-full shadow-xl shadow-pink-50/50">
                   <h3 className="text-4xl font-black text-slate-800 mb-8">{selectedConcern.title}</h3>
                   <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">{selectedConcern.response}</p>
                   <div className="space-y-4 mb-12">
                      <p className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4">Counter-Moves</p>
                      {selectedConcern.actions.map(a => <div key={a} className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 font-bold text-slate-700 shadow-sm"><CheckCircle2 className="text-indigo-500" /> {a}</div>)}
                   </div>
                   <button onClick={() => setView("procedures")} className="px-10 py-5 bg-slate-800 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-transform">See Related Guides</button>
                </div>
              </div>
            </motion.section>
          )}

          {view === "tracker" && (
            <motion.section key="tracker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-8 lg:grid-cols-2">
              <div className="cute-card p-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl">
                <h2 className="text-4xl font-black mb-10 flex items-center gap-3"><Calendar /> Log Entry</h2>
                <div className="space-y-8">
                  <div>
                    <label className="block font-bold mb-3 text-sm tracking-widest uppercase opacity-80">Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-5 rounded-2xl bg-white/20 border border-white/30 text-white outline-none focus:bg-white/30" />
                  </div>
                  <div>
                    <label className="block font-bold mb-3 text-sm tracking-widest uppercase opacity-80">Intensity</label>
                    <div className="flex gap-2">{["Light", "Medium", "Heavy"].map(f => <button key={f} onClick={() => setFlow(f as any)} className={cn("flex-1 py-4 rounded-2xl font-black uppercase text-xs transition-all", flow === f ? "bg-white text-indigo-600" : "bg-white/10 hover:bg-white/20")}>{f}</button>)}</div>
                  </div>
                  <div>
                    <label className="block font-bold mb-3 text-sm tracking-widest uppercase opacity-80">Symptoms</label>
                    <div className="flex flex-wrap gap-2">
                      {symptomOptions.map(s => (
                        <button key={s} onClick={() => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} className={cn("px-5 py-2.5 rounded-full text-xs font-black uppercase border-2", symptoms.includes(s) ? "bg-white border-white text-indigo-600" : "bg-transparent border-white/30 text-white")}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={addLog} className="w-full py-6 bg-white text-indigo-600 font-black rounded-3xl shadow-xl hover:scale-105 transition-transform text-lg">Save to Tactical Log</button>
                </div>
              </div>
              <div className="space-y-6">
                 <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3"><Droplets className="text-pink-500" /> Logged Patterns</h3>
                 {logs.map(log => (
                   <div key={log.id} className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-50 flex justify-between items-center shadow-sm">
                     <div>
                       <p className="font-black text-xl text-slate-800">{log.date}</p>
                       <p className="text-sm font-black text-pink-500 uppercase tracking-widest mt-1">{log.flow} Flow</p>
                       {log.symptoms.length > 0 && <p className="text-sm font-medium text-slate-400 mt-2">{log.symptoms.join(" • ")}</p>}
                     </div>
                     <Heart className="text-pink-200" size={32} />
                   </div>
                 ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* MEDICAL DISCLAIMER */}
        <div className="mt-24 rounded-[3rem] border-2 border-amber-200 bg-amber-50/40 p-10 text-center backdrop-blur-sm">
           <div className="flex justify-center mb-4"><Shield className="text-amber-500" size={32} /></div>
           <p className="text-sm font-black text-amber-700 uppercase tracking-[0.2em] mb-4">Notice</p>
           <p className="max-w-3xl mx-auto text-amber-900 font-medium leading-relaxed">
             Checkmate is an educational and support tool designed for preparation and empowerment. It is <strong>not a medical device</strong> and does not diagnose conditions or provide medical advice. Always consult with a <strong>healthcare professional</strong> regarding specific symptoms or care plans.
           </p>
        </div>
      </main>
    </div>
  );
}