// Analytics utility for tracking user interactions
// Supports Google Analytics 4 (gtag) and fallback logging

/**
 * Track resume download event
 * @param {string} location - Where the download was triggered ('hero' or 'bottom')
 */
export function trackResumeDownload(location) {
  try {
    // Google Analytics 4 event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download', {
        event_category: 'Resume',
        event_label: location,
        value: 1
      });
    }
    
    // Fallback: console log for development/debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Resume download tracked: ${location}`);
    }
    
    // Optional: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ event: 'resume_download', location })
    // }).catch(console.error);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Resume download tracking error:', error);
    }
  }
}

/**
 * Track page view
 * @param {string} path - Page path
 */
export function trackPageView(path) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      // Get GA Measurement ID from environment variable or use default
      const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      
      if (gaId) {
        window.gtag('config', gaId, {
          page_path: path
        });
      } else {
        // Fallback: Use page_path in event if no GA ID configured
        window.gtag('event', 'page_view', {
          page_path: path
        });
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Page view tracking error:', error);
    }
  }
}

/**
 * Track contact link click
 * @param {string} method - Contact method ('email', 'phone', 'linkedin', 'github')
 */
export function trackContactClick(method) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_click', {
        event_category: 'Contact',
        event_label: method,
        value: 1
      });
    }
    
    // Fallback: console log for development/debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Contact click tracked: ${method}`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Contact click tracking error:', error);
    }
  }
}

