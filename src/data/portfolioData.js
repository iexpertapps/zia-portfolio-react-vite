// Shared data module for Portfolio and Resume pages
export const PROFILE = {
  name: "Syed Zia ur Rehman",
  title: "Mobile Tech Lead | iOS & Flutter Specialist | Product Architect",
  location: "Islamabad, Pakistan",
  photoUrl: "./profile.jpg",
};

export const experienceSeed = [
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

export const educationSeed = [
  {
    degree: "Bachelor of Science - BS Software Engineering, Computer Science",
    school: "Bahria University",
    period: "2011 – 2015",
    location: "Islamabad, Pakistan",
  },
];

export const skillsSeed = {
  languages: ["Swift", "Objective-C", "Dart"],
  frameworks: ["SwiftUI", "UIKit", "Flutter"],
  communication: ["MQTT", "BLE", "WebSockets", "Firebase", "REST APIs"],
  devTools: ["Xcode", "VS Code", "Android Studio", "Git", "Postman"],
  infrastructure: ["Docker", "Railway", "Vercel", "Firebase Console", "AWS IoT Core"],
  databases: ["PostgreSQL", "Firestore", "SQLite"],
  architecture: ["Clean Architecture", "MVC", "MVVM", "Modular Design"],
  uxPrinciples: [
    "Accessibility-first",
    "Multilingual support",
    "Trauma-aware and spiritually conscious design",
  ],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/iexpertapps", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-zia-ur-rehman12/", icon: "Linkedin" },
  { label: "Email", href: "mailto:syed.iosdeveloper@gmail.com", icon: "Mail" },
  { label: "Phone", href: "tel:+923347134557", icon: "Phone" },
];

// Helper function for formatting periods
export function formatPeriod(p) {
  if (typeof p === "string") return p;
  const end = p.end === "Present" ? "Present" : ymToMonYear(p.end);
  return `${ymToMonYear(p.start)} – ${end}`;
}

function ymToMonYear(ym) {
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

