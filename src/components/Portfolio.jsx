import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Link as LinkIcon,
  Rocket,
  Briefcase,
  GraduationCap,
  Clock,
  Star,
  Search,
} from "lucide-react";

// ------------------- DATA SEEDS -------------------

const projectsSeed = [
  {
    title: "Testora – Smart Home IoT Integration (Tuya SDK)",
    role: "iOS Developer",
    period: "Aug 2025 – Aug 2025 (1 month)",
    summary:
      "Integrated Tuya Smart Home SDK into the Testora iOS app, enabling IoT device pairing, control, and automation workflows with secure cloud connectivity.",
    stack: ["Swift", "UIKit", "Tuya Smart Home SDK", "CoreBluetooth", "MQTT", "REST APIs", "Push Notifications"],
    highlights: [
      "Integrated Tuya Smart Home SDK for IoT device onboarding, pairing, and cloud control",
      "Enabled device management (ACs, lights, plugs, sensors) with real-time status sync",
      "Implemented BLE + Wi-Fi dual-mode device provisioning for smooth onboarding",
      "Built secure user authentication and token-based session handling with Tuya Cloud",
      "Developed automation workflows (schedules, scenes, rules) inside the app",
      "Optimized MQTT socket communication for stable real-time updates",
      "Configured push notifications for device alerts and automation triggers"
    ],
    links: [
      {
        label: "Tuya SDK Docs",
        url: "https://platform.tuya.com/oem/sdk?id=644256001&tab=1#1"
      }
    ],
  },

  {
    title: "Cielo Home – Smart IoT HVAC Control",
    role: "Senior iOS Engineer",
    period: "Feb 2022 – Jul 2024",
    summary:
      "Smart home automation app (⭐ 4.7 rating, 100K+ downloads) enabling global control, scheduling, and energy insights for ACs, heaters, and thermostats with IoT integration.",
    stack: ["Swift", "SwiftUI", "UIKit", "CoreBluetooth", "CoreLocation", "REST APIs", "AWS", "MQTT Communication", "BLE Communication", "WebSockets", "Firebase", "Siri Shortcuts", "Alexa", "Google Home", "SmartThings"],
    highlights: [
      "Implemented BLE + Wi-Fi pairing for seamless IoT device onboarding",
      "Developed geofencing, 7-day scheduling, and intelligent triggers",
      "Integrated Siri Shortcuts, Alexa, Google Home & SmartThings",
      "Optimized performance and memory usage, reducing load time by ~30%",
      "Enhanced security by migrating away from social logins to compliant authentication"
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/cielo-home/id1030282555"
      }
    ],
  }, 
  {
    title: "XP Eats – Food Delivery & Donation Platform",
    role: "iOS Developer",
    period: "Apr 2018 – Jan 2020 (1 year 10 months)",
    summary:
      "Built XP Eats iOS app enabling food ordering, targeted donations, and real-time delivery tracking with a smooth and secure user experience.",
    stack: ["Swift", "UIKit", "CoreLocation", "Push Notifications", "Stripe API", "Twilio", "REST APIs"],
    highlights: [
      "Integrated Stripe for secure in-app payments and donations",
      "Enabled GPS-based targeted donations & real-time order tracking",
      "Implemented Twilio for OTP-based phone verification",
      "Developed push notification system for order and donation updates",
      "Optimized UI/UX for seamless food ordering and donor-recipient flows"
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/ca/app/xp-eats/id1498829228"
      }
    ],
  },
  {
    title: "XP Driver – Driver App for XP Eats Platform",
    role: "iOS Developer",
    period: "Apr 2018 – Jan 2020 (1 year 10 months)",
    summary:
      "Developed XP Driver iOS app enabling drivers to receive ride/delivery requests, navigate routes, and communicate securely with recipients in real-time.",
    stack: ["Swift", "UIKit", "CoreLocation", "MapKit", "Push Notifications", "Twilio", "REST APIs"],
    highlights: [
      "Implemented real-time trip assignment and order management system",
      "Integrated Twilio for secure phone verification & masked driver-recipient calls",
      "Developed in-app navigation and live GPS tracking for optimized routes",
      "Built push notification system for trip requests, cancellations, and earnings updates",
      "Optimized background location tracking for battery efficiency"
    ],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/ca/app/xp-driver/id1439220195"
      }
    ],
  },
];

const personalProjects = [ 
  {
    title: "Mawaddah – Spiritual Tech Charity Platform",
    role: "Founder | System Architect | Flutter & iOS Developer",
    period: "Jul 2025 – Present",
    summary:
      "Purpose-built platform for Syed donors to support verified Sadaat recipients with privacy and dignity. MVP complete, backend/frontend integrated, launching Phase 2 enhancements.",
    stack: ["Flutter", "Django REST API", "React", "Stripe", "JazzCash", "Easypaisa"],
    highlights: [
      "Secure login (OTP, Apple, Google), multilingual support",
      "Role-based access & wallet-based donation logic",
      "Fully documented SDLC: SRS, user flows, API specs, layered backend, DevOps pipelines",
    ],
    links: [
      {
        label: "Mawaddah Admin Panel",
        url: "https://mawaddahapp.vercel.app/login"
      }
    ],
  },
  {
    title: "QuietHelp – Mental Health App",
    role: "Founder & iOS Developer",
    period: "Jan 2025 – Jun 2025",
    summary:
      "SwiftUI-based app offering anonymous help for trauma, abuse, and addiction with trauma-aware UX, panic exits, zero data retention, Firebase backend.",
    stack: ["SwiftUI", "Firebase", "WebSocket"],
    highlights: [
      "Solo execution from ideation to App Store deployment",
      "Real-time WebSocket support",
      "Privacy-first, stealth UI design",
    ],
    links: [],
  },
  {
  title: "KaamWalay – Job & Service Marketplace",
  role: "Founder | System Architect | iOS & Flutter Developer",
  period: "Jan 2023 – Jun 2024",
  summary:
    "Developed a mobile-first marketplace connecting job seekers, freelancers, and service providers with employers and clients. The platform streamlined onboarding, verified profiles, and secure payments for trust and transparency.",
  stack: ["Flutter", "Laravel", "MySQL", "Stripe", "Firebase", "REST APIs"],
  highlights: [
    "Implemented secure user onboarding with role-based access (Employer, Worker, Admin)",
    "Integrated Stripe & local wallets for service payments and job transactions",
    "Developed job posting, bidding, and hiring workflows with proof-of-completion",
    "Built real-time chat & notification system for job updates and employer-worker communication",
    "Optimized UX for multi-language support and inclusive accessibility"
  ],
  links: [
    {
      label: "Admin Panel",
      url: "https://kaamwalay-admin.vercel.app/login"
    }
  ],
},
{
  title: "SkillQuest – AI-Powered Career Success Platform",
  role: "Founder | Product Architect | iOS & AI Solutions Developer",
  period: "Jan 2024 – Present",
  summary:
    "An end-to-end career acceleration platform leveraging AI for personalized skill development, interview preparation, and intelligent job matching. Designed to empower job seekers, employers, and educators with actionable insights and scalable tools.",
  stack: ["React", "Node.js", "Python (AI/ML)", "Firebase", "OpenAI APIs", "REST APIs"],
  highlights: [
    "AI-driven interview preparation with personalized role-specific questions & real-time feedback",
    "Adaptive skill assessments with dynamic quizzes and gap analysis for upskilling",
    "Smart job matching via unified job aggregator, readiness scoring, and salary insights",
    "Virtual mock interviews with multimodal feedback on verbal & non-verbal cues",
    "Skill enhancement hub with curated learning paths and live expert sessions",
    "Collaborative community features: peer networking, forums, and group mock interviews"
  ],
  links: [
    {
      label: "SkillQuest Web Platform",
      url: "https://skillquest.ai"
    }
  ],
},

];

const experienceSeed = [
  {
    company: "iExpert Apps",
    role: "Senior iOS Developer",
    period: "Mar 2024 – Dec 2024 (10 months)",
    location: "Islāmābād, Pakistan",
    bullets: [
      "Founded and led iExpert Apps, delivering multiple iOS solutions for clients",
      "Developed apps using Swift, SwiftUI, and Flutter with backend integrations",
      "Mentored junior developers and managed complete SDLC from concept to deployment",
    ],
  },
  {
    company: "Alright Tech Private Limited",
    role: "Senior Information Technology Project Manager",
    period: "Aug 2024 – Nov 2024 (4 months)",
    location: "Rawalpindi, Punjab, Pakistan",
    bullets: [
      "Delivered high-performance E-Commerce app and Fleet Management System",
      "Coordinated cross-functional teams; reduced delays by 15%",
      "Implemented Agile/Scrum for CRM and PMS solutions; +20% team productivity",
      "Mentored junior developers and project managers",
      "Automated CI/CD pipelines reducing build times by 40%",
      "Implemented data encryption and secure storage (GDPR/HIPAA compliance)",
      "Integrated Firebase Analytics and ran A/B tests (+15% conversions, +20% retention)",
    ],
  },
  {
    company: "Cielo WiGle Inc.",
    role: "Senior iOS Developer",
    period: "Feb 2022 – Jul 2024 (2 years 6 months)",
    location: "Islamabad, Pakistan",
    bullets: [
      "Developed and maintained Cielo Home App (⭐ 4.7 rating, 100K+ downloads)",
      "Implemented BLE + Wi-Fi device pairing for smart HVAC IoT devices",
      "Built geofencing, scheduling, and intelligent triggers for energy efficiency",
      "Integrated Siri Shortcuts, Alexa, Google Home & SmartThings",
      "Optimized app performance, reducing load time by ~30%",
      "Migrated away from social logins, ensuring GDPR-compliant authentication",
    ],
  },
  {
    company: "CILE",
    role: "Senior iOS Developer",
    period: "Feb 2021 – Jun 2024 (3 years 5 months)",
    location: "Islamabad, Pakistan",
    bullets: [
      "Led development of scalable iOS apps with MVVM architecture",
      "Integrated complex third-party APIs to enhance product features",
      "Collaborated with UI/UX designers to deliver modern and user-friendly experiences",
      "Mentored junior developers to improve coding practices and delivery timelines",
    ],
  },
  {
    company: "WelldoneApp",
    role: "iPhone App Developer",
    period: "Apr 2011 – Apr 2014 (3 years 1 month)",
    location: "Islamabad, Pakistan",
    bullets: [
      "Developed multiple custom iOS apps from scratch for client projects",
      "Integrated Twilio for phone verification and Stripe for secure payments",
      "Implemented real-time messaging with WebSocket and GPS-based features",
      "Collaborated with teams to deliver full software lifecycle projects on time",
    ],
  },
];

const educationSeed = [
  {
    degree: "Bachelor of Science - BS Software Engineering, Computer Science",
    school: "Bahria University",
    period: "2011 – 2015",
    location: "Islamabad, Pakistan",
  },
];

const skillsSeed = {
  languages: ["Swift", "Dart", "Python", "TypeScript", "JavaScript"],
  frameworks: ["SwiftUI", "UIKit", "Flutter", "Django REST", "React"],
  communication: ["MQTT", "BLE", "WebSockets", "Firebase", "REST APIs"],
  devTools: ["Xcode", "VS Code", "Android Studio", "Git", "Postman"],
  infrastructure: ["Docker", "Railway", "Vercel", "Firebase Console", "AWS IoT Core"],
  databases: ["PostgreSQL", "Firestore", "SQLite"],
  architecture: ["Clean Architecture", "Riverpod", "Modular Design", "RBAC"],
  uxPrinciples: [
    "Accessibility-first",
    "Multilingual support",
    "Trauma-aware and spiritually conscious design",
  ],
};

const socials = [
  { label: "GitHub", href: "https://github.com/iexpertapps", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-zia-ur-rehman12/", icon: Linkedin },
  { label: "Email", href: "mailto:syed.iosdeveloper@gmail.com", icon: Mail },
  { label: "Phone", href: "tel:+923347134557", icon: Phone },
];

// ------------------- REUSABLE COMPONENTS -------------------

function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">{children}</span>;
}

function Pill({ children }) {
  return <span className="inline-flex items-center rounded-2xl bg-muted px-3 py-1 text-xs">{children}</span>;
}

function Section({ id, title, icon: Icon, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="mb-6 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5" /> : null}
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl border p-5 shadow-sm hover:shadow-md"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.role}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {project.period}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed">{project.summary}</p>

        {Array.isArray(project.stack) && project.stack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        )}

        {Array.isArray(project.highlights) && project.highlights.length > 0 && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {Array.isArray(project.links) && project.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.links.map((l) => (
              <a
                key={`${project.title}-${l.label}-${l.url}`}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-muted"
              >
                <LinkIcon className="h-3.5 w-3.5" />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ------------------- MAIN COMPONENT -------------------

export default function Portfolio() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  const allTags = useMemo(() => {
    const s = new Set(["All"]);
    [...projectsSeed, ...personalProjects].forEach((p) => p.stack.forEach((t) => s.add(t)));
    return Array.from(s);
  }, []);

  const mkFilter = (list) => {
    const q = query.trim().toLowerCase();
    return list.filter((p) => {
      const matchesTag = tag === "All" || p.stack.includes(tag);
      const haystack = `${p.title} ${p.summary} ${p.role} ${p.stack.join(" ")}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      return matchesTag && matchesQuery;
    });
  };

  const filteredProjects = useMemo(() => mkFilter(projectsSeed), [query, tag]);
  const filteredPersonal = useMemo(() => mkFilter(personalProjects), [query, tag]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="font-semibold tracking-tight">Syed Zia ur Rehman</a>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#projects" className="hover:underline underline-offset-4">Projects</a>
            <a href="#personal-projects" className="hover:underline underline-offset-4">Personal Projects</a>
            <a href="#experience" className="hover:underline underline-offset-4">Experience</a>
            <a href="#skills" className="hover:underline underline-offset-4">Skills</a>
            <a href="#education" className="hover:underline underline-offset-4">Education</a>
            <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main id="home" className="mx-auto max-w-6xl px-4">
        <section className="grid gap-8 py-14 md:grid-cols-[1.2fr_.8fr] md:items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold tracking-tight md:text-4xl"
            >
              Mobile Tech Lead | iOS & Flutter Specialist | Product Architect
            </motion.h1>
            <p className="mt-3 max-w-prose text-muted-foreground">
              Seasoned mobile technologist with over a decade of experience designing, building, and scaling high-performance iOS and cross-platform applications. Focused on smart IoT ecosystems, real-time systems, fintech integrations, and spiritually-driven digital products.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-2xl border px-4 py-2 text-sm font-medium hover:shadow">
                <Rocket className="mr-2 inline h-4 w-4" /> View Projects
              </a>
              <a href="#contact" className="rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                <Mail className="mr-2 inline h-4 w-4" /> Contact
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Pill>iOS, Android</Pill>
              <Pill>Flutter</Pill>
              <Pill>Clean Architecture</Pill>
              <Pill>Remote-friendly</Pill>
            </div>
          </div>
        </section>

        {/* FILTER BAR (shared) */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
            <Search className="h-4 w-4" />
            <input
              className="w-56 bg-transparent text-sm outline-none"
              placeholder="Search projects..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                className={`rounded-xl border px-3 py-1 text-sm ${t === tag ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <Section id="projects" title="Projects" icon={Rocket}>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p) => <ProjectCard key={p.title} project={p} />)
            ) : (
              <EmptyState />
            )}
          </div>
        </Section>

        {/* PERSONAL PROJECTS */}
        <Section id="personal-projects" title="Personal Projects" icon={Rocket}>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPersonal.length > 0 ? (
              filteredPersonal.map((p) => <ProjectCard key={p.title} project={p} />)
            ) : (
              <EmptyState />
            )}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience" icon={Briefcase}>
          {experienceSeed.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.role}-${exp.period}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-xl border p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-sm text-muted-foreground">
                {exp.company} | {exp.location}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {exp.period}
              </p>
              {exp.bullets?.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </Section>

        {/* SKILLS */}
        <Section id="skills" title="Technical Skills" icon={Star}>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(skillsSeed).map(([key, val]) => (
              <div key={key}>
                <h4 className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {val.map((s) => (
                    <Badge key={`${key}-${s}`}>{s}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" title="Education" icon={GraduationCap}>
          {educationSeed.map((edu) => (
            <motion.div
              key={`${edu.school}-${edu.degree}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-4 rounded-xl border p-4 shadow-sm"
            >
              <h4 className="font-semibold">{edu.degree}</h4>
              <p className="text-sm text-muted-foreground">
                {edu.school} | {edu.location}
              </p>
              <p className="text-xs text-muted-foreground">{edu.period}</p>
            </motion.div>
          ))}
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact" icon={Mail}>
          <div className="flex flex-col gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-muted"
                >
                  <Icon className="h-5 w-5" /> {s.label}
                </a>
              );
            })}
          </div>
        </Section>
      </main>
    </div>
  );
}

/** Small helper for empty search states */
function EmptyState() {
  return (
    <div className="rounded-xl border p-6 text-sm text-muted-foreground">
      No items matched your search/filter. Try a different keyword or tag.
    </div>
  );
}
