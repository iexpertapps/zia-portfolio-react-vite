# Analytics Setup Instructions

## Google Analytics 4 Integration

The resume page includes analytics tracking for download events. To enable Google Analytics:

### Option 1: Google Analytics 4 (Recommended)

1. **Get your GA4 Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a property or use existing one
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add Google Analytics to your site:**
   
   Add this script to `index.html` before the closing `</head>` tag:

   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

   Replace `G-XXXXXXXXXX` with your actual Measurement ID.

3. **Set Environment Variable (Optional but Recommended):**
   
   Create a `.env` file in the project root:
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   
   Replace `G-XXXXXXXXXX` with your actual Measurement ID.
   
   This allows the analytics utility to use the correct ID for page view tracking.

3. **Verify tracking:**
   - Open browser console
   - Click download button
   - Check for `[Analytics] Resume download tracked: hero` log
   - Check Google Analytics Real-Time reports

### Option 2: Custom Analytics Endpoint

If you prefer a custom analytics solution:

1. **Update `src/utils/analytics.js`:**
   - Uncomment the fetch call in `trackResumeDownload()`
   - Update the endpoint URL
   - Implement your analytics backend

### Events Tracked

- **resume_download**: Fired when resume PDF is downloaded
  - Event label: `'hero'` or `'bottom'` (location of download button)
  - Event category: `'Resume'`
  - Value: `1`

### Testing

In development mode, analytics events are logged to console:
```
[Analytics] Resume download tracked: hero
```

### Privacy Note

Ensure compliance with GDPR/CCPA if tracking users in EU/California.
Consider adding cookie consent banner if required.

