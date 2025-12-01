# Replace Resume PDF - Step-by-Step Instructions

## Quick Start

### Option 1: Using the Helper Script (Recommended)

1. **Run the script:**
   ```bash
   ./replace-resume-pdf.sh /path/to/your/resume.pdf
   ```
   
   Example:
   ```bash
   ./replace-resume-pdf.sh ~/Documents/Syed_Zia_Resume.pdf
   ```

2. **The script will:**
   - Verify the file is a PDF
   - Check file size (warns if > 2MB)
   - Backup existing file
   - Copy your PDF to `public/resume.pdf`
   - Show file details

3. **Then commit and push:**
   ```bash
   git add public/resume.pdf
   git commit -m "chore: Replace placeholder with actual resume PDF"
   git push
   ```

---

### Option 2: Manual Replacement

1. **Copy your resume PDF:**
   ```bash
   cp /path/to/your/resume.pdf public/resume.pdf
   ```
   
   Or drag and drop your PDF file into the `public/` folder using Finder/File Explorer.

2. **Verify the file:**
   ```bash
   file public/resume.pdf
   ls -lh public/resume.pdf
   ```
   
   Should show:
   - File type: PDF document
   - File size: Ideally under 2MB

3. **Test locally (optional but recommended):**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:5173/resume
   - Click "Get My Resume Now" button
   - Verify PDF downloads correctly

4. **Commit and push:**
   ```bash
   git add public/resume.pdf
   git commit -m "chore: Replace placeholder with actual resume PDF"
   git push
   ```

---

## PDF Requirements Checklist

Before replacing, ensure your PDF meets these requirements:

### File Format
- [ ] File is a valid PDF (.pdf extension)
- [ ] File size is under 2MB (recommended)
- [ ] File opens correctly in PDF readers

### Content Quality
- [ ] Contact information is complete (name, email, phone, location, LinkedIn)
- [ ] Professional summary is included
- [ ] Work experience is complete with dates
- [ ] Technical skills are listed
- [ ] Education information is included
- [ ] No typos or grammatical errors

### ATS-Friendly Format
- [ ] Uses standard fonts (Arial, Times New Roman, Calibri)
- [ ] Simple, clean layout (no complex graphics)
- [ ] Standard section headings
- [ ] Text is selectable (not just images)
- [ ] 1-2 pages maximum

---

## Verification Steps

After replacing the PDF:

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   - Visit http://localhost:5173/resume
   - Test download button (hero section)
   - Test download button (bottom section)
   - Verify PDF opens correctly
   - Check file name: Should be `Syed_Zia_ur_Rehman_Resume.pdf`

2. **Production Testing:**
   - Wait for Vercel deployment (usually 1-2 minutes)
   - Visit https://syedzia-portfolio.vercel.app/resume
   - Test download functionality
   - Verify PDF downloads correctly
   - Check PDF content is correct

3. **Print Testing:**
   - Press Cmd/Ctrl + P on the resume page
   - Verify print preview looks professional
   - Check contact information prints correctly

---

## Troubleshooting

### PDF doesn't download
- Check file exists: `ls -lh public/resume.pdf`
- Verify file is PDF: `file public/resume.pdf`
- Check browser console for errors
- Verify file is committed and pushed

### PDF is too large
- Use PDF compression tool
- Remove unnecessary images
- Optimize file size to under 2MB

### PDF doesn't open correctly
- Verify it's a valid PDF (not corrupted)
- Try opening in different PDF readers
- Re-export from source document

### File not updating on production
- Clear browser cache
- Wait for Vercel deployment to complete
- Check Vercel deployment logs
- Verify file was committed and pushed

---

## Git Commands Reference

```bash
# Check current status
git status

# Add the PDF file
git add public/resume.pdf

# Commit with descriptive message
git commit -m "chore: Replace placeholder with actual resume PDF"

# Push to remote
git push

# Verify file is in repository
git ls-files public/resume.pdf
```

---

## Notes

- The PDF file is served statically from the `public/` folder
- No build step required - just replace the file
- File will be available at `/resume.pdf` URL path
- Download will use filename: `Syed_Zia_ur_Rehman_Resume.pdf`
- File is automatically included in Vercel deployment

---

## Need Help?

If you encounter issues:
1. Check the file exists and is a valid PDF
2. Verify file size is reasonable (< 5MB)
3. Test locally before pushing
4. Check browser console for errors
5. Verify Vercel deployment completed successfully

