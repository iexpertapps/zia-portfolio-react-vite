#!/bin/bash

# Script to help replace the placeholder resume PDF
# Usage: ./replace-resume-pdf.sh /path/to/your/resume.pdf

if [ $# -eq 0 ]; then
    echo "❌ Error: Please provide the path to your resume PDF file"
    echo ""
    echo "Usage: ./replace-resume-pdf.sh /path/to/your/resume.pdf"
    echo ""
    echo "Example: ./replace-resume-pdf.sh ~/Documents/MyResume.pdf"
    exit 1
fi

RESUME_PATH="$1"
TARGET_PATH="public/resume.pdf"

# Check if source file exists
if [ ! -f "$RESUME_PATH" ]; then
    echo "❌ Error: File not found: $RESUME_PATH"
    exit 1
fi

# Check if it's actually a PDF
FILE_TYPE=$(file -b "$RESUME_PATH")
if [[ ! "$FILE_TYPE" =~ "PDF" ]]; then
    echo "⚠️  Warning: File doesn't appear to be a PDF"
    echo "   Detected type: $FILE_TYPE"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get file size
FILE_SIZE=$(stat -f%z "$RESUME_PATH" 2>/dev/null || stat -c%s "$RESUME_PATH" 2>/dev/null)
FILE_SIZE_MB=$(echo "scale=2; $FILE_SIZE / 1024 / 1024" | bc)

# Check file size (warn if > 2MB)
if (( $(echo "$FILE_SIZE_MB > 2" | bc -l) )); then
    echo "⚠️  Warning: File size is ${FILE_SIZE_MB}MB (recommended: < 2MB)"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Backup existing file if it exists
if [ -f "$TARGET_PATH" ]; then
    BACKUP_PATH="${TARGET_PATH}.backup.$(date +%Y%m%d_%H%M%S)"
    cp "$TARGET_PATH" "$BACKUP_PATH"
    echo "✅ Backed up existing file to: $BACKUP_PATH"
fi

# Copy the file
cp "$RESUME_PATH" "$TARGET_PATH"
echo "✅ Copied resume PDF to: $TARGET_PATH"

# Verify the copy
if [ -f "$TARGET_PATH" ]; then
    NEW_SIZE=$(stat -f%z "$TARGET_PATH" 2>/dev/null || stat -c%s "$TARGET_PATH" 2>/dev/null)
    NEW_SIZE_MB=$(echo "scale=2; $NEW_SIZE / 1024 / 1024" | bc)
    NEW_TYPE=$(file -b "$TARGET_PATH")
    
    echo ""
    echo "📄 File Details:"
    echo "   Location: $TARGET_PATH"
    echo "   Size: ${NEW_SIZE_MB}MB"
    echo "   Type: $NEW_TYPE"
    echo ""
    echo "✅ Resume PDF replaced successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Test locally: npm run dev (then visit http://localhost:5173/resume)"
    echo "2. Commit the file: git add public/resume.pdf"
    echo "3. Commit: git commit -m 'chore: Replace placeholder with actual resume PDF'"
    echo "4. Push: git push"
else
    echo "❌ Error: Failed to copy file"
    exit 1
fi

