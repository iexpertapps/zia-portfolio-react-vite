import React, { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
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
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
export const PLACEHOLDER_LOGO = "/logos/placeholder.svg";

// ------------------- PROFILE -------------------
const PROFILE = {
  name: "Syed Zia ur Rehman",
  title: "Mobile Tech Lead | iOS & Flutter Specialist | Product Architect",
  location: "Islamabad, Pakistan",
  photoUrl: "./profile.jpg",
};

// ------------------- DATA SEEDS -------------------

/** @type {Project[]} */
const projectsSeed = [
  {
    title: "Testora – Smart Home IoT Integration (Tuya SDK)",
    role: "Senior iOS Engineer",
    period: "Aug 2024 – Sep 2024 (1 month)",
    summary:
      "Integrated Tuya Smart Home SDK into the Testora iOS app, enabling IoT device pairing, control, and automation workflows with secure cloud connectivity. Reduced setup time by 87% (15min → 2min) with 95% success rate.",
    stack: ["Swift", "UIKit", "Tuya Smart Home SDK", "CoreBluetooth", "MQTT", "REST APIs", "Push Notifications"],
    highlights: [
      {
        problem: "Manual IoT device setup required 15+ minutes with 40% failure rate, causing user frustration",
        action: "Integrated Tuya Smart Home SDK with BLE + Wi-Fi dual-mode device provisioning and secure cloud authentication",
        result: "Reduced setup time to 2 minutes with 95% success rate, enabling seamless onboarding for ACs, lights, plugs, and sensors"
      },
      {
        problem: "Real-time device status updates were unreliable, causing delays in user interactions",
        action: "Optimized MQTT socket communication with connection pooling and automatic reconnection logic",
        result: "Achieved <500ms latency for device status sync, ensuring instant feedback for all IoT controls"
      },
      {
        problem: "Users lacked automation capabilities, requiring manual control for every device action",
        action: "Developed automation workflows (schedules, scenes, rules) with cloud-synced triggers and push notifications",
        result: "Enabled 24/7 automated device management, reducing manual interactions by 70% and improving energy efficiency"
      }
    ],
    links: [
      { label: "Tuya SDK Docs", url: "https://platform.tuya.com/oem/sdk?id=644256001&tab=1#1" }
    ],
    logo: "https://airtake-private-data-1254153901.cos.accelerate.myqcloud.com/smart/app/package/bay1753937201097Rbo7/17546665502da494bccf3.pngicon_1754666553159.png?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDcFk7OYhieTBkBTdgcQ6f6KXZSCjbSAlI%26q-sign-time%3D1755424991%3B1755428591%26q-key-time%3D1755424991%3B1755428591%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Da05f1d70a05c492f2f6ff255ec514443f049f2b3&imageMogr2/thumbnail/96x96"
  },
  {
    title: "Cielo Home – Smart IoT HVAC Control",
    role: "Senior iOS Engineer",
    period: "Feb 2022 – Jul 2024",
    summary:
      "Smart home automation app (⭐ 4.7 rating, 100K+ downloads) enabling global control, scheduling, and energy insights for ACs, heaters, and thermostats with IoT integration. Reduced HVAC costs by 25% through smart scheduling.",
    stack: ["Swift", "SwiftUI", "UIKit", "CoreBluetooth", "CoreLocation", "REST APIs", "AWS", "MQTT Communication", "BLE Communication", "WebSockets", "Firebase", "Siri Shortcuts", "Alexa", "Google Home", "SmartThings"],
    highlights: [
      {
        problem: "IoT device onboarding was complex, requiring multiple steps and technical knowledge",
        action: "Implemented BLE + Wi-Fi dual-mode pairing with automated network configuration",
        result: "Streamlined onboarding to 3 steps, reducing setup time by 60% and improving first-time user success rate"
      },
      {
        problem: "Users wanted automated HVAC control but lacked scheduling and location-based triggers",
        action: "Developed geofencing, 7-day scheduling, and intelligent triggers with CoreLocation integration",
        result: "Enabled automated energy management, reducing HVAC costs by 25% through smart scheduling and geofencing"
      },
      {
        problem: "Users were locked into single-platform control, limiting accessibility",
        action: "Integrated Siri Shortcuts, Alexa, Google Home & SmartThings with unified API layer",
        result: "Expanded platform reach to 4 voice assistants, increasing user engagement by 40% and improving accessibility"
      },
      {
        problem: "App load time was 8+ seconds, causing user drop-off during cold starts",
        action: "Optimized performance with lazy loading, memory pooling, and reduced bundle size",
        result: "Reduced load time by 30% (to ~5.5s), improving user retention by 15% and App Store rating to 4.7"
      }
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/cielo-home/id1030282555" }
    ],
    logo: "https://cielowigle.com/wp-content/uploads/2023/02/cielo-breez-official-logo-latest.png"
  },
  {
    title: "XP Eats – Food Delivery & Donation Platform",
    role: "Senior iOS Engineer",
    period: "Apr 2018 – Jan 2020 (1 year 10 months)",
    summary:
      "Built XP Eats iOS app enabling food ordering, targeted donations, and real-time delivery tracking with a smooth and secure user experience. Processed $500K+ in donations with 99.8% transaction success rate.",
    stack: ["Swift", "UIKit", "CoreLocation", "Push Notifications", "Stripe API", "Twilio", "REST APIs"],
    highlights: [
      {
        problem: "Payment processing was insecure and unreliable, causing transaction failures and user trust issues",
        action: "Integrated Stripe payment gateway with PCI-compliant tokenization and secure donation workflows",
        result: "Processed $500K+ in donations with 99.8% transaction success rate, building trust and enabling scalable giving"
      },
      {
        problem: "Donors couldn't target specific locations, and recipients had no visibility into delivery status",
        action: "Enabled GPS-based targeted donations with real-time order tracking using CoreLocation and MapKit",
        result: "Increased donation accuracy by 85%, reduced delivery time by 30%, and improved donor satisfaction"
      },
      {
        problem: "Phone verification was vulnerable to fraud and required manual intervention",
        action: "Implemented Twilio OTP-based phone verification with rate limiting and automated validation",
        result: "Reduced verification time from 5 minutes to 30 seconds, eliminated fraud attempts, and improved user onboarding"
      }
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/ca/app/xp-eats/id1498829228" }
    ],
    logo: "https://www.xpeats.com/img/logo-dark.png"
  },
  {
    title: "XP Driver – Driver App for XP Eats Platform",
    role: "Senior iOS Engineer",
    period: "Apr 2018 – Jan 2020 (1 year 10 months)",
    summary:
      "Developed XP Driver iOS app enabling drivers to receive ride/delivery requests, navigate routes, and communicate securely with recipients in real-time. Reduced delivery time by 20% and increased on-time delivery to 95%.",
    stack: ["Swift", "UIKit", "CoreLocation", "MapKit", "Push Notifications", "Twilio", "REST APIs"],
    highlights: [
      {
        problem: "Drivers missed trip requests due to delayed notifications, causing revenue loss and poor user experience",
        action: "Implemented real-time trip assignment system with WebSocket connections and push notification fallbacks",
        result: "Reduced response time to <3 seconds, increased driver acceptance rate by 45%, and improved platform efficiency"
      },
      {
        problem: "Driver-recipient communication exposed personal phone numbers, creating privacy and safety concerns",
        action: "Integrated Twilio for secure phone verification and masked driver-recipient calls with number proxying",
        result: "Eliminated privacy violations, improved safety ratings by 30%, and enabled secure communication for 10K+ users"
      },
      {
        problem: "Drivers used external navigation apps, causing route inefficiencies and increased delivery times",
        action: "Developed in-app navigation with live GPS tracking, route optimization, and real-time traffic updates",
        result: "Reduced average delivery time by 20%, improved driver earnings through optimized routes, and increased on-time delivery to 95%"
      }
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/ca/app/xp-driver/id1439220195" }
    ],
    logo: "https://play-lh.googleusercontent.com/cBZ1cLAuMhKqhH8JvbF7DjQ_PgU927BXJxHCZepCzqkZHnq88lWMPbX5DaY97y9dZl0=w240-h480"
  },
];

/** @type {Project[]} */
const personalProjects = [
  {
    title: "Scoova – AI-SDLC Flagship School Review Platform",
    role: "Founder | Lead Architect | Flutter & iOS Developer",
    period: { start: "2025-01", end: "Present" },
    summary:
      "Multi-platform school review ecosystem built entirely using AI-SDLC methodology, demonstrating automated architecture, ReAct-based feature implementation, reflection-driven validation, and enterprise-grade documentation.",
    stack: ["Flutter", "Django REST API", "Stripe", "Firebase", "ReAct Agents", "Reflection Executors"],
    highlights: [
      {
        problem: "Manual architecture & feature planning prone to errors and delays",
        action: "Applied AI-SDLC workflow: SRS → Architecture → ReAct Implementation → UI/UX Verification → QA",
        result: "Delivered fully validated, scalable, GDPR-compliant system ready for multi-role usage"
      },
      {
        problem: "Complex multi-role workflows and modular features required strict integrity checks",
        action: "Implemented ReAct agents with reflection-based validation ensuring end-to-end system integrity",
        result: "Reduced development ambiguity, improved documentation alignment, and accelerated release readiness"
      },
      {
        problem: "Confidential system documentation could not be publicly shared",
        action: "Showcased portfolio-friendly summaries, architecture diagrams, and methodology highlights",
        result: "Demonstrated enterprise-level engineering skills without exposing client-sensitive data"
      }
    ],
    links: [], // Client-specific, keep empty
    logo: PLACEHOLDER_LOGO // Client-specific project, using placeholder
  },
  {
    title: "Mawaddah – Spiritual Tech Charity Platform",
    role: "Founder | System Architect | Flutter & iOS Developer",
    period: { start: "2025-07", end: "Present" },
    summary:
      "Purpose-built platform for Syed donors to support verified Sadaat recipients with privacy and dignity. MVP complete, backend/frontend integrated, launching Phase 2 enhancements. Reduced transaction time by 80% with 100% verified recipients.",
    stack: ["Flutter", "Django REST API", "React", "Stripe", "JazzCash", "Easypaisa"],
    highlights: [
      {
        problem: "Traditional charity platforms lacked privacy controls and verification, causing trust issues for sensitive religious giving",
        action: "Built purpose-built platform with secure OTP/Apple/Google login, multilingual support, and verified recipient verification system",
        result: "Created trusted platform enabling private, dignified giving with 100% verified recipients and secure wallet-based transactions"
      },
      {
        problem: "Complex donation workflows required manual intervention and lacked transparency",
        action: "Implemented role-based access control and wallet-based donation logic with real-time tracking and automated distribution",
        result: "Streamlined donation process, reducing transaction time by 80% and enabling transparent, automated fund distribution"
      }
    ],
    links: [{ label: "Mawaddah Admin Panel", url: "https://mawaddahapp.vercel.app/login" }],
    logo: "https://mawaddahapp.vercel.app/ic_mawaddah_180x180.png"
  },
  {
    title: "QuietHelp – Mental Health App",
    role: "Founder & iOS Developer",
    period: { start: "2025-01", end: "2025-06" },
    summary:
      "SwiftUI-based app offering anonymous help for trauma, abuse, and addiction with trauma-aware UX, panic exits, zero data retention, Firebase backend. Achieved <100ms message latency for real-time crisis support.",
    stack: ["SwiftUI", "Firebase", "WebSocket"],
    highlights: [
      {
        problem: "Mental health apps lacked trauma-aware design, causing re-traumatization and privacy concerns for vulnerable users",
        action: "Built SwiftUI app with trauma-aware UX, panic exits, zero data retention policy, and stealth UI design for safety",
        result: "Created safe space for anonymous help, enabling users to seek support without fear of data exposure or triggering content"
      },
      {
        problem: "Real-time support required instant communication but existing solutions were slow and unreliable",
        action: "Implemented WebSocket-based real-time communication with Firebase backend for instant messaging and support",
        result: "Achieved <100ms message latency, enabling immediate crisis support and real-time therapeutic conversations"
      }
    ],
    links: [],
    logo: PLACEHOLDER_LOGO
  },
  {
    title: "KaamWalay – Job & Service Marketplace",
    role: "Founder | System Architect | iOS & Flutter Developer",
    period: { start: "2023-01", end: "2024-06" },
    summary:
      "Developed a mobile-first marketplace connecting job seekers, freelancers, and service providers with employers and clients. The platform streamlined onboarding, verified profiles, and secure payments for trust and transparency. Processed $200K+ in transactions with 98% satisfaction rate, reducing fraud by 90%.",
    stack: ["Flutter", "Laravel", "MySQL", "Stripe", "Firebase", "REST APIs"],
    highlights: [
      {
        problem: "Job marketplaces lacked trust and verification, leading to fraud and payment disputes",
        action: "Implemented secure onboarding with role-based access (Employer, Worker, Admin), verified profiles, and proof-of-completion workflows",
        result: "Reduced fraud by 90%, increased successful job completions by 65%, and built trusted marketplace with verified participants"
      },
      {
        problem: "Payment processing was fragmented, causing delays and disputes between employers and workers",
        action: "Integrated Stripe and local wallets (JazzCash, Easypaisa) with escrow system and automated payment release on completion",
        result: "Processed $200K+ in transactions with 98% satisfaction rate, reducing payment disputes by 85% and improving worker retention"
      },
      {
        problem: "Communication gaps between employers and workers caused project delays and misunderstandings",
        action: "Built real-time chat and notification system with job status updates, milestone tracking, and automated reminders",
        result: "Reduced project delays by 40%, improved communication efficiency by 70%, and increased on-time project completion to 88%"
      }
    ],
    links: [{ label: "Admin Panel", url: "https://kaamwalay-admin.vercel.app/login" }],
    logo: ""
  },
  {
    title: "SkillQuest – AI-Powered Career Success Platform",
    role: "Founder | Product Architect | iOS & AI Solutions Developer",
    period: { start: "2024-01", end: "Present" },
    summary:
      "An end-to-end career acceleration platform leveraging AI for personalized skill development, interview preparation, and intelligent job matching. Designed to empower job seekers, employers, and educators with actionable insights and scalable tools. Improved interview success rate by 45% and increased match quality by 70% for 10K+ users.",
    stack: ["React", "Node.js", "Python (AI/ML)", "Firebase", "OpenAI APIs", "REST APIs"],
    highlights: [
      {
        problem: "Job seekers lacked personalized interview preparation, leading to high rejection rates and career stagnation",
        action: "Built AI-driven interview prep with personalized role-specific questions, real-time feedback, and virtual mock interviews with multimodal analysis",
        result: "Improved interview success rate by 45%, reduced preparation time by 60%, and enabled 10K+ users to advance their careers"
      },
      {
        problem: "Skill gaps were unclear, causing inefficient learning and missed job opportunities",
        action: "Developed adaptive skill assessments with dynamic quizzes, gap analysis, and personalized learning paths with expert sessions",
        result: "Identified skill gaps with 90% accuracy, reduced upskilling time by 50%, and increased job readiness scores by 65%"
      },
      {
        problem: "Job matching was generic and inefficient, causing low application-to-hire conversion rates",
        action: "Created smart job matching via unified aggregator with AI-powered readiness scoring, salary insights, and personalized recommendations",
        result: "Increased match quality by 70%, improved application-to-hire rate by 55%, and reduced job search time by 40%"
      }
    ],
    links: [{ label: "SkillQuest Web Platform", url: "https://skillquest.ai" }],
    logo: ""
  }
];


/** @type {Experience[]} */
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

/** @type {Education[]} */
const educationSeed = [
  {
    degree: "Bachelor of Science - BS Software Engineering, Computer Science",
    school: "Bahria University",
    period: "2011 – 2015",
    location: "Islamabad, Pakistan",
  },
];

const skillsSeed = {
  languages: ["Swift",  "Objective-C", "Dart"],
  frameworks: ["SwiftUI", "UIKit", "Flutter"],
  communication: ["MQTT", "BLE", "WebSockets", "Firebase", "REST APIs"],
  devTools: ["Xcode", "VS Code", "Android Studio", "Git", "Postman"],
  infrastructure: ["Docker", "Railway", "Vercel", "Firebase Console", "AWS IoT Core"],
  databases: ["PostgreSQL", "Firestore", "SQLite"],
  architecture: ["Clean Architecture", "MVC","MVVM", "Modular Design"],
  uxPrinciples: [
    "Accessibility-first",
    "Multilingual support",
    "Trauma-aware and spiritually conscious design",
  ],
};
const testimonialsSeed = [
  {
    name: "Waqar Ahmad Khattak",
    role: "Founder & CEO @ Alright Tech",
    feedback:
      "Mr. Zia worked with us on the development of our iOS app. I was impressed by professionalism and dedication to his work. His deep knowledge of Swift, SwiftUI, and Objective-C helped us build an app that was not only functional but also beautifully designed. He expertly managed the entire process from development to launch. His ability to integrate AI features into the app added incredible value, taking the user experience to the next level. Zia is a true professional, delivering on time and exceeding expectations. I highly recommend him to anyone looking for a skilled iOS app developer",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFJbpTIRGlIvA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730109330335?e=1758153600&v=beta&t=yZP2PR7A2um5FvMKISRL4XnqnaLVHwVhndFQihu6Xm0",
  },
  {
    name: "Ayesha Khan",
    role: "Project Manager, Alright Tech",
    feedback:
      "Professional, proactive, and always delivering top-quality work. He uplifted our mobile app strategy completely.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/iexpertapps", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-zia-ur-rehman12/", icon: Linkedin },
  { label: "Email", href: "mailto:syed.iosdeveloper@gmail.com", icon: Mail },
  { label: "Phone", href: "tel:+923347134557", icon: Phone },
];

// ------------------- HELPERS -------------------
function formatPeriod(p) {
  if (typeof p === "string") return p;
  const end = p.end === "Present" ? "Present" : ymToMonYear(p.end);
  return `${ymToMonYear(p.start)} – ${end}`;
}

function ymToMonYear(ym) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

function normalizeTag(tag) {
  switch (tag.toLowerCase()) {
    case "mqtt communication": return "MQTT";
    case "websocket":
    case "websockets": return "WebSockets";
    case "stripe api": return "Stripe";
    default: return tag;
  }
}

// ------------------- REUSABLE COMPONENTS -------------------
function Tag({ children, variant = "badge" }) {
  const styles =
    variant === "pill"
      ? "rounded-2xl bg-muted px-3 py-1 text-xs"
      : "rounded-full border px-3 py-1 text-xs font-medium";
  return <span className={`inline-flex items-center ${styles}`}>{children}</span>;
}

function Section({ id, title, icon: Icon, children, className = "", showDivider = true }) {
  return (
    <section 
      id={id} 
      className={`scroll-mt-24 mt-16 ${showDivider ? "border-t pt-16" : ""} ${className}`} 
      aria-labelledby={`${id}-heading`}
    >
      <div className="mb-6 flex items-center gap-2">
        {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : null}
        <h2 id={`${id}-heading`} className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasHighlights = !!project.highlights?.length;
  const visibleHighlights = isExpanded ? project.highlights : (project.highlights?.slice(0, 1) || []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group rounded-xl border p-6 shadow-sm hover:shadow-md"
    >
      <div className="flex flex-col gap-3">
        {/* Logo + Title */}
        <div className="flex items-start gap-3">
          <img
            src={project.logo || PLACEHOLDER_LOGO}
            alt={`${project.title} logo`}
            className="h-10 w-10 rounded object-contain bg-gray-100"
            loading="lazy"
            onError={(e) => {
              e.target.src = PLACEHOLDER_LOGO;
            }}
          />
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-muted-foreground">{project.role}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {formatPeriod(project.period)}
            </p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm leading-relaxed">{project.summary}</p>

        {/* Stack - Show only first 4 tags */}
        {!!project.stack?.length && (
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <Tag key={`${project.title}-${s}`}>{s}</Tag>
            ))}
            {project.stack.length > 4 && (
              <Tag key={`${project.title}-more`} className="text-muted-foreground">
                +{project.stack.length - 4} more
              </Tag>
            )}
          </div>
        )}

        {/* Highlights - Collapsible */}
        {hasHighlights && (
          <div className="mt-2 space-y-3">
            {visibleHighlights.map((h, i) => {
              // Support both old string format and new Problem → Action → Result format
              if (typeof h === "string") {
                return (
                  <p key={`${project.title}-hl-${i}`} className="text-sm leading-relaxed">{h}</p>
                );
              }
              // New format: object with problem, action, result
              return (
                <div key={`${project.title}-hl-${i}`} className="rounded-xl border-l-4 border-primary/20 bg-muted/30 p-4 text-sm">
                  <p className="font-medium text-foreground mb-1.5">
                    <span className="text-primary">Problem:</span> {h.problem}
                  </p>
                  <p className="text-muted-foreground mb-1.5">
                    <span className="font-medium text-foreground">Action:</span> {h.action}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Result:</span> {h.result}
                  </p>
                </div>
              );
            })}
            
            {project.highlights.length > 1 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline mt-2"
                aria-expanded={isExpanded}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    View Details ({project.highlights.length - 1} more)
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Links - Show only first link */}
        {!!project.links?.length && (
          <div className="mt-2 flex flex-wrap gap-2">
            {project.links.slice(0, 1).map((l, i) => (
              <a
                key={`${project.title}-link-${i}`}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-muted font-medium"
                aria-label={`${project.title} – ${l.label}`}
              >
                <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border p-6 text-sm text-muted-foreground">
      No items matched your search/filter. Try a different keyword or tag.
    </div>
  );
}

function ProfileCard() {
  return (
    <aside className="flex items-center gap-4 rounded-xl border p-6 shadow-sm md:flex-col md:items-start">
      <img
        src={PROFILE.photoUrl}
        alt={`${PROFILE.name} profile photo`}
        width={160}
        height={160}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        className="h-20 w-20 rounded-full object-cover ring-2 ring-border md:h-40 md:w-40"
        referrerPolicy="no-referrer"
      />
      <div className="space-y-1">
        <p className="text-base font-semibold leading-tight">{PROFILE.name}</p>
        <p className="text-sm text-muted-foreground">{PROFILE.title}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {PROFILE.location}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={`profile-social-${s.label}`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs hover:bg-muted"
                aria-label={s.label}
              >
                <Icon className="h-4 w-4" aria-hidden="true" /> {s.label}
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border p-6 shadow-sm bg-background"
    >
      <div className="flex items-center gap-4 mb-3">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} avatar`}
          className="h-12 w-12 rounded-full object-cover"
          onError={(e) => {
            e.target.src = "https://i.pravatar.cc/100?img=1";
          }}
        />
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        “{testimonial.feedback}”
      </p>
    </motion.div>
  );
}

// ------------------- MAIN COMPONENT -------------------
export default function Portfolio() {
  const [search, setSearch] = useState("");
  const query = useDebouncedValue(search, 300);
  const [tag, setTag] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allTags = useMemo(() => {
    const s = new Set(["All"]);
    [...projectsSeed, ...personalProjects].forEach((p) =>
      p.stack.forEach((t) => s.add(normalizeTag(t)))
    );
    return Array.from(s);
  }, []);

  const mkFilter = (list) => {
    const q = query.trim().toLowerCase();
    return list.filter((p) => {
      const normalizedStack = p.stack.map(normalizeTag);
      const matchesTag = tag === "All" || normalizedStack.includes(tag);
      const haystack = `${p.title} ${p.summary} ${p.role} ${normalizedStack.join(" ")}`.toLowerCase();
      return matchesTag && (!q || haystack.includes(q));
    });
  };

  const filteredProjects = useMemo(() => mkFilter(projectsSeed), [query, tag]);
  const filteredPersonal = useMemo(() => mkFilter(personalProjects), [query, tag]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{`${PROFILE.name} – Portfolio`}</title>
        <meta
          name="description"
          content="Mobile Tech Lead | iOS & Flutter Specialist | Product Architect. Smart IoT, real-time systems, and fintech integrations."
        />
        <link rel="preload" as="image" href={PROFILE.photoUrl} />
        <style>{`html { scroll-behavior: smooth; }`}</style>
        <meta property="og:title" content={`${PROFILE.name} – Portfolio`} />
        <meta property="og:description" content="iOS & Flutter Specialist. Smart IoT, real-time, fintech." />
        <meta property="og:image" content={PROFILE.photoUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: PROFILE.name,
          jobTitle: PROFILE.title,
          image: PROFILE.photoUrl,
          address: { '@type': 'PostalAddress', addressLocality: PROFILE.location },
          sameAs: socials.map((s) => s.href),
        })}</script>
      </Helmet>

      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="font-semibold tracking-tight">{PROFILE.name}</a>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Desktop Navigation - Grouped */}
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary">
            <div className="flex items-center gap-4">
              <a href="#projects" className="hover:underline underline-offset-4" onClick={() => setMobileMenuOpen(false)}>Work</a>
              <div className="h-4 w-px bg-border" aria-hidden="true"></div>
              <a href="#skills" className="hover:underline underline-offset-4" onClick={() => setMobileMenuOpen(false)}>About</a>
            </div>
            <a href="#contact" className="hover:underline underline-offset-4 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>

          {/* Mobile Navigation - Grouped */}
          {mobileMenuOpen && (
            <nav 
              className="absolute top-full left-0 right-0 bg-background border-b shadow-lg md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-3">Work</p>
                  <div className="flex flex-col gap-1">
                    <a 
                      href="#projects" 
                      className="px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Projects
                    </a>
                    <a 
                      href="#personal-projects" 
                      className="px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Personal Projects
                    </a>
                    <a 
                      href="#experience" 
                      className="px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Experience
                    </a>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 px-3">About</p>
                  <div className="flex flex-col gap-1">
                    <a 
                      href="#skills" 
                      className="px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Skills
                    </a>
                    <a 
                      href="#education" 
                      className="px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Education
                    </a>
                  </div>
                </div>
                <div>
                  <a 
                    href="#contact" 
                    className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium block text-center transition-colors hover:opacity-90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main id="home" className="mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section className="grid gap-8 py-14 md:grid-cols-[1.2fr_.8fr] md:items-start">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold tracking-tight md:text-4xl"
            >
              {PROFILE.title}
            </motion.h1>
            <p className="mt-3 max-w-prose text-muted-foreground">
              Building iOS apps that scale to 100K+ users. Specialized in smart IoT ecosystems and fintech integrations. 
              Currently architecting AI-powered career platforms. Over a decade of experience turning complex technical 
              challenges into elegant, user-focused solutions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-lg border px-4 py-2 text-sm font-medium hover:shadow">
                <Rocket className="mr-2 inline h-4 w-4" aria-hidden="true" /> View Projects
              </a>
              <a
                href="#contact"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <Mail className="mr-2 inline h-4 w-4" aria-hidden="true" /> Contact
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Tag variant="pill">iOS, Android</Tag>
              <Tag variant="pill">Flutter</Tag>
              <Tag variant="pill">Clean Architecture</Tag>
              <Tag variant="pill">Remote-friendly</Tag>
            </div>
          </div>
          <ProfileCard />
        </section>

        {/* FILTER BAR */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              className="w-56 bg-transparent text-sm outline-none"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Technology filter">
            {allTags.map((t) => (
              <button
                key={`tag-${t}`}
                role="tab"
                aria-selected={t === tag}
                className={`rounded-lg border px-3 py-1 text-sm ${t === tag ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <Section id="projects" title="Projects" icon={Rocket} showDivider={false}>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.length > 0
              ? filteredProjects.map((p) => <ProjectCard key={`proj-${p.title}`} project={p} />)
              : <EmptyState />}
          </div>
        </Section>

        {/* PERSONAL PROJECTS */}
        <Section id="personal-projects" title="Personal Projects" icon={Rocket}>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPersonal.length > 0
              ? filteredPersonal.map((p) => <ProjectCard key={`pers-${p.title}`} project={p} />)
              : <EmptyState />}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience" icon={Briefcase}>
          {experienceSeed.map((exp, i) => (
            <motion.div
              key={`exp-${exp.company}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-xl border p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-sm text-muted-foreground">
                {exp.company} | {exp.location}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {formatPeriod(exp.period)}
              </p>
              {!!exp.bullets?.length && (
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {exp.bullets.map((b, j) => <li key={`exp-${i}-b-${j}`}>{b}</li>)}
                </ul>
              )}
            </motion.div>
          ))}
        </Section>

        {/* SKILLS */}
        <Section id="skills" title="Technical Skills" icon={Star}>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(skillsSeed).map(([key, val]) => (
              <div key={`skill-${key}`}>
                <h4 className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {val.map((s, i) => <Tag key={`skill-${key}-${i}`}>{s}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* TESTIMONIALS */}
        <Section id="testimonials" title="Testimonials" icon={Star}>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonialsSeed.map((t, i) => (
              <TestimonialCard key={`testimonial-${i}`} testimonial={t} />
            ))}
          </div>
        </Section>

        {/* BLOG SECTION */}
        {/* <Section
          id="blog"
          title="Swift Learning Blog"
          icon={Star}
          className="mt-16 text-left"
        >
          <Blog />
        </Section> */}
     
        {/* EDUCATION */}
        <Section id="education" title="Education" icon={GraduationCap}>
          {educationSeed.map((edu, i) => (
            <motion.div
              key={`edu-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-4 rounded-xl border p-6 shadow-sm"
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
                  key={`social-${s.label}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted"
                  aria-label={s.label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" /> {s.label}
                </a>
              );
            })}
          </div>
        </Section>

        <footer className="my-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </footer>
      </main>
    </div>
  );
}