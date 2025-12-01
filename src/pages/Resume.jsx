import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Download, Mail, Phone, MapPin, Github, Linkedin, Briefcase, GraduationCap, Star, Loader2, FileText, Printer } from "lucide-react";
import { PROFILE, experienceSeed, educationSeed, skillsSeed, socials } from "../data/portfolioData";
import { Link, useNavigate } from "react-router-dom";
import { trackResumeDownload, trackPageView, trackContactClick } from "../utils/analytics";

// NOTE: Replace public/resume.pdf with your actual resume PDF file
// Current file is a placeholder text file
const RESUME_PDF_PATH = "/resume.pdf";

export default function Resume() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const timeoutRef = useRef(null);

  // Track page view on mount
  useEffect(() => {
    trackPageView('/resume');
    
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDownload = async (e, location = 'hero') => {
    // Prevent multiple clicks during download
    if (isDownloading) {
      e.preventDefault();
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);
    trackResumeDownload(location);
    
    try {
      // Verify file exists before allowing download
      const response = await fetch(RESUME_PDF_PATH, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Resume PDF not found');
      }
      
      // Reset loading state after a delay (download starts)
      timeoutRef.current = setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Resume download error:', error);
      setIsDownloading(false);
      setDownloadError('Resume PDF is currently unavailable. Please contact me directly via email or phone.');
      e.preventDefault();
    }
  };

  const handleContactClick = () => {
    trackContactClick('button');
    navigate('/');
    // Scroll to contact section after navigation
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSocialClick = (method) => {
    trackContactClick(method.toLowerCase());
  };

  const handlePrintPDF = () => {
    // Track the print action
    trackResumeDownload('print');
    // Trigger browser print dialog (users can save as PDF)
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white">
      <Helmet>
        <title>{`${PROFILE.name} – Professional Resume | ${PROFILE.title}`}</title>
        <meta
          name="description"
          content={`Professional resume of ${PROFILE.name} - ${PROFILE.title}. ${PROFILE.location}. Download PDF resume or view online. Available for new opportunities.`}
        />
        <meta name="keywords" content={`${PROFILE.name}, iOS Developer, Mobile Developer, Flutter Developer, Resume, CV, ${PROFILE.location}`} />
        <meta property="og:title" content={`${PROFILE.name} – Professional Resume`} />
        <meta property="og:description" content={`Professional resume of ${PROFILE.name} - ${PROFILE.title}. Available for new opportunities.`} />
        <meta property="og:type" content="profile" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Accessibility: Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isDownloading && 'Downloading resume PDF'}
        {downloadError && downloadError}
      </div>

      {/* Hero Section with CTA */}
      <section className="bg-gradient-to-b from-primary/10 to-background border-b print:hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {PROFILE.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                {PROFILE.title}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <a 
                    href="mailto:syed.iosdeveloper@gmail.com" 
                    className="hover:text-primary hover:underline transition-colors"
                    onClick={() => handleSocialClick('email')}
                  >
                    syed.iosdeveloper@gmail.com
                  </a>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <a 
                    href="tel:+923347134557" 
                    className="hover:text-primary hover:underline transition-colors"
                    onClick={() => handleSocialClick('phone')}
                  >
                    +92 334 713 4557
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Primary CTA - Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <div className="flex flex-col items-center">
                <a
                  href={RESUME_PDF_PATH}
                  download={`${PROFILE.name.replace(/\s+/g, '_')}_Resume.pdf`}
                  onClick={(e) => handleDownload(e, 'hero')}
                  aria-label="Download Syed Zia ur Rehman's resume in PDF format"
                  aria-busy={isDownloading}
                  className={`inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity shadow-lg ${
                    isDownloading 
                      ? 'opacity-50 cursor-not-allowed pointer-events-none' 
                      : 'hover:opacity-90 cursor-pointer'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" aria-hidden="true" />
                      Download Resume PDF
                    </>
                  )}
                </a>
                {downloadError && (
                  <p className="text-sm text-red-600 mt-2 max-w-md text-center" role="alert">
                    {downloadError}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={handlePrintPDF}
                  aria-label="Print or save resume page as PDF"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary bg-background px-6 py-3 text-base font-semibold text-primary hover:bg-primary/10 transition-colors shadow-sm"
                  title="Opens print dialog - choose 'Save as PDF' to download"
                >
                  <Printer className="h-5 w-5" aria-hidden="true" />
                  Print / Save as PDF
                </button>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  Opens print dialog
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-medium hover:bg-muted transition-colors"
              >
                View Portfolio
              </Link>
            </motion.div>

            {/* Contact Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4 print:hidden"
            >
              {socials.map((s) => {
                const IconComponent = s.icon === "Github" ? Github : s.icon === "Linkedin" ? Linkedin : s.icon === "Mail" ? Mail : Phone;
                const method = s.label.toLowerCase().replace(/\s+/g, '');
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick(method)}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted transition-colors"
                    aria-label={s.label}
                  >
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                    {s.label}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 print:max-w-full print:px-4 print:py-4">
        {/* Header for Print */}
        <div className="print:mb-4 print:pb-2 print:border-b print:border-gray-300">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight print:text-2xl print:mb-1">
            {PROFILE.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground print:text-base print:text-gray-700 print:mb-1">
            {PROFILE.title}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground print:text-xs print:text-gray-600 print:mt-1">
            <span>{PROFILE.location}</span>
            <span className="print:hidden">•</span>
            <a href="mailto:syed.iosdeveloper@gmail.com" className="hover:text-primary print:text-gray-600 print:no-underline">
              syed.iosdeveloper@gmail.com
            </a>
            <span className="print:hidden">•</span>
            <a href="tel:+923347134557" className="hover:text-primary print:text-gray-600 print:no-underline">
              +92 334 713 4557
            </a>
            <span className="print:hidden">•</span>
            <a href="https://www.linkedin.com/in/syed-zia-ur-rehman12/" target="_blank" rel="noopener noreferrer" className="hover:text-primary print:text-gray-600 print:no-underline">
              linkedin.com/in/syed-zia-ur-rehman12
            </a>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-12 print:mb-6 print:mt-4">
          <h2 className="text-2xl font-bold mb-4 print:mb-2 print:text-base print:font-bold">Professional Summary</h2>
          <p className="text-muted-foreground leading-relaxed print:text-foreground print:text-sm print:leading-normal">
            Experienced Mobile Tech Lead and iOS Specialist with over a decade of expertise in building scalable mobile applications. 
            Proven track record of delivering iOS apps that scale to 100K+ users, specializing in smart IoT ecosystems and fintech integrations. 
            Currently architecting AI-powered career platforms. Expert in turning complex technical challenges into elegant, user-focused solutions 
            with a focus on performance, security, and user experience. Strong background in team leadership, mentoring, and end-to-end product development.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-12 print:mb-6">
          <div className="flex items-center gap-2 mb-6 print:mb-3">
            <Briefcase className="h-5 w-5 print:hidden" aria-hidden="true" />
            <h2 className="text-2xl font-bold print:text-base print:font-bold print:mb-2">Professional Experience</h2>
          </div>
          <div className="space-y-6 print:space-y-4">
            {experienceSeed.map((exp, i) => (
              <motion.div
                key={`exp-${exp.company}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="border-l-4 border-primary pl-6 pb-6 last:pb-0 print:border-l-2 print:pl-4 print:pb-3 print:mb-3"
              >
                <h3 className="text-xl font-semibold mb-1 print:text-sm print:font-semibold print:mb-0.5">{exp.role}</h3>
                <p className="text-lg text-muted-foreground mb-1 print:text-xs print:text-gray-700 print:mb-0.5">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-muted-foreground mb-3 print:text-xs print:text-gray-600 print:mb-2">{exp.period}</p>
                {exp.bullets && (
                  <ul className="list-disc pl-5 space-y-1 text-sm print:pl-4 print:space-y-0.5 print:text-xs print:leading-relaxed">
                    {exp.bullets.map((bullet, j) => (
                      <li key={`exp-${i}-bullet-${j}`} className="text-muted-foreground print:text-gray-700 print:mb-0.5">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12 print:mb-6">
          <div className="flex items-center gap-2 mb-6 print:mb-3">
            <Star className="h-5 w-5 print:hidden" aria-hidden="true" />
            <h2 className="text-2xl font-bold print:text-base print:font-bold print:mb-2">Technical Skills</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 print:grid-cols-2 print:gap-3">
            {Object.entries(skillsSeed).map(([key, val]) => (
              <div key={`skill-${key}`} className="print:mb-2">
                <h3 className="text-lg font-semibold mb-2 capitalize print:text-xs print:font-semibold print:mb-1 print:text-gray-900">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <div className="flex flex-wrap gap-2 print:gap-1">
                  {val.map((skill, i) => (
                    <span
                      key={`skill-${key}-${i}`}
                      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium print:px-2 print:py-0.5 print:text-xs print:border-gray-400 print:bg-transparent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12 print:mb-6">
          <div className="flex items-center gap-2 mb-6 print:mb-3">
            <GraduationCap className="h-5 w-5 print:hidden" aria-hidden="true" />
            <h2 className="text-2xl font-bold print:text-base print:font-bold print:mb-2">Education</h2>
          </div>
          <div className="space-y-4 print:space-y-2">
            {educationSeed.map((edu, i) => (
              <motion.div
                key={`edu-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="border-l-4 border-primary pl-6 print:border-l-2 print:pl-4"
              >
                <h3 className="text-xl font-semibold mb-1 print:text-sm print:font-semibold print:mb-0.5">{edu.degree}</h3>
                <p className="text-muted-foreground mb-1 print:text-xs print:text-gray-700 print:mb-0.5">
                  {edu.school} • {edu.location}
                </p>
                <p className="text-sm text-muted-foreground print:text-xs print:text-gray-600">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Information for Recruiters */}
        <section className="mt-12 pt-8 border-t print:border-t print:border-gray-300 print:pt-3 print:mt-6 print:mb-4">
          <h2 className="text-2xl font-bold mb-4 print:mb-2 print:text-base print:font-bold">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-2 print:text-xs">
            <div className="flex items-center gap-3 print:gap-2">
              <Mail className="h-5 w-5 text-primary print:hidden" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground print:text-gray-600 print:font-medium print:mb-0.5">Email</p>
                <a 
                  href="mailto:syed.iosdeveloper@gmail.com" 
                  className="text-foreground hover:text-primary hover:underline transition-colors print:text-xs print:text-gray-900 print:no-underline"
                  onClick={() => handleSocialClick('email')}
                >
                  syed.iosdeveloper@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 print:gap-2">
              <Phone className="h-5 w-5 text-primary print:hidden" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground print:text-gray-600 print:font-medium print:mb-0.5">Phone</p>
                <a 
                  href="tel:+923347134557" 
                  className="text-foreground hover:text-primary hover:underline transition-colors print:text-xs print:text-gray-900 print:no-underline"
                  onClick={() => handleSocialClick('phone')}
                >
                  +92 334 713 4557
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 print:gap-2">
              <MapPin className="h-5 w-5 text-primary print:hidden" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground print:text-gray-600 print:font-medium print:mb-0.5">Location</p>
                <p className="text-foreground print:text-xs print:text-gray-900">{PROFILE.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 print:gap-2">
              <Linkedin className="h-5 w-5 text-primary print:hidden" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground print:text-gray-600 print:font-medium print:mb-0.5">LinkedIn</p>
                <a 
                  href="https://www.linkedin.com/in/syed-zia-ur-rehman12/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary hover:underline transition-colors print:text-xs print:text-gray-900 print:no-underline"
                  onClick={() => handleSocialClick('linkedin')}
                >
                  linkedin.com/in/syed-zia-ur-rehman12
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary CTA */}
        <section className="mt-16 pt-12 border-t text-center print:hidden">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Next Mobile App?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm actively seeking new opportunities and available for immediate discussions. Let's connect to discuss how I can help bring your mobile app vision to life with scalable, high-performance solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col items-center">
              <a
                href={RESUME_PDF_PATH}
                download={`${PROFILE.name.replace(/\s+/g, '_')}_Resume.pdf`}
                onClick={(e) => handleDownload(e, 'bottom')}
                aria-label="Download full resume PDF file"
                aria-busy={isDownloading}
                className={`inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity ${
                  isDownloading 
                    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
                    : 'hover:opacity-90 cursor-pointer'
                }`}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" aria-hidden="true" />
                    Download Resume PDF
                  </>
                )}
              </a>
              {downloadError && (
                <p className="text-sm text-red-600 mt-2 max-w-md text-center" role="alert">
                  {downloadError}
                </p>
              )}
            </div>
            <button
              onClick={handlePrintPDF}
              aria-label="Print or save resume page as PDF"
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-background px-6 py-3 text-base font-semibold text-primary hover:bg-primary/10 transition-colors"
              title="Opens print dialog - choose 'Save as PDF' to download"
            >
              <Printer className="h-5 w-5" aria-hidden="true" />
              Print / Save as PDF
            </button>
            <button
              onClick={handleContactClick}
              aria-label="Navigate to contact section"
              className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-base font-medium hover:bg-muted transition-colors"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Schedule a Call / Email Me
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t mt-16 py-6 text-center text-xs text-muted-foreground print:hidden">
        <Link to="/" className="hover:underline">
          ← Back to Portfolio
        </Link>
      </footer>
    </div>
  );
}

