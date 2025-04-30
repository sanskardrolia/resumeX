# Resume Builder 📄

A modern, ATS-friendly resume builder with real-time preview, PDF export powered by `pdf-lib`, and a "Fill Sample Data" feature for quick testing. The PDF output is enhanced with **30% larger fonts**, **spaced entries**, and **darkened designations** for optimal readability.

---

## ✨ Features

- **Comprehensive Resume Sections**: Edit Personal Details, Professional Summary, Skills, Work Experience, Extracurricular Activities, Education, Personal Projects, and Hobbies.
- **Real-Time Preview**: See your resume update instantly as you type.
- **Enhanced PDF Export**:
  - Font sizes increased by 30% (Name: 20.8pt, Titles: 15.6pt, Body: 13pt).
  - 8pt spacing between entries in Work Experience, Education, Extracurricular Activities, and Projects.
  - Darkened designations in Work Experience for better visibility.
- **Fill Sample Data**: Auto-populate the form with professional, ATS-friendly sample data.
- **Responsive Design**: Seamless experience on mobile and desktop.
- **ATS-Friendly**: Clean layout with standard Helvetica fonts for Applicant Tracking Systems.
- **Dynamic Entries**: Add multiple entries with intuitive "Add" buttons.
- **Word Count Limit**: Professional Summary capped at 30 words with a live counter.

---

## 🛠 Tech Stack

- **Frontend**: HTML, CSS (Tailwind CSS), Vanilla JavaScript, `pdf-lib`
- **Backend**: Node.js, Express.js
- **Deployment**: Vercel
- **Version Control**: Git, GitHub

---

## 📂 Project Structure

```plaintext
resume-builder/
├── server/
│   ├── package.json
│   ├── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── pdf-lib.min.js
├── README.md
├── vercel.json (optional)
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v16+)
- Git
- A modern web browser

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/resume-builder.git
   cd resume-builder
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Download `pdf-lib.min.js`**:
   ```bash
   cd ../public
   curl -o pdf-lib.min.js https://unpkg.com/pdf-lib/dist/pdf-lib.min.js
   ```

4. **Start the Server**:
   ```bash
   cd ../server
   npm start
   ```

5. **Access the App**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

Host your resume builder on Vercel with automatic deployments from GitHub.

### Step 1: Push to GitHub
1. Initialize Git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/resume-builder.git
   git push -u origin main
   ```

2. Create a GitHub repository at [github.com/new](https://github.com/new) and push your code.

### Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com) and click **New Project** > **Import Git Repository**.
2. Select your `resume-builder` repository.
3. Configure settings:
   - **Framework Preset**: Other
   - **Root Directory**: `resume-builder/`
   - **Build Command**: Leave blank
   - **Output Directory**: Leave blank
   - **Install Command**: `npm install`
   - **Development Command**: `npm start`
4. Click **Deploy**.

### Step 3: Add `vercel.json` (Recommended)
Create `resume-builder/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server/server.js"
    }
  ]
}
```

Commit and push:
```bash
git add vercel.json
git commit -m "Add vercel.json for Vercel deployment"
git push origin main
```

### Step 4: Access Your App
- Vercel provides a live URL (e.g., `https://resume-builder-abc123.vercel.app`).
- Push changes to `main` for automatic redeployments.

---

## 🎮 Usage

1. **Edit Resume**:
   - Fill the form manually or click **Fill Sample Data** for pre-filled professional data.
2. **Preview**:
   - View real-time updates in the left pane.
3. **Download PDF**:
   - Click **Download PDF** to save your resume with enhanced fonts, spacing, and designations.
4. **Add Entries**:
   - Use **Add** buttons for multiple Work Experience, Extracurricular Activities, Education, or Projects.
5. **Word Count**:
   - Keep Professional Summary under 30 words (live counter).

---

## 🔧 Customizing Font Sizes

Adjust PDF font sizes for a personalized look:

1. Open `public/script.js` in a text editor.
2. Find the `downloadBtn.addEventListener('click', ...)` section.
3. Modify `drawText` font sizes:
   ```javascript
   drawText(data.name, font, 22, true); // Name (default: 20.8)
   drawText('Skills', font, 16, true); // Section titles (default: 15.6)
   drawText(data.hardSkills, font, 14); // Body text (default: 13)
   ```
4. Update `lineHeight` to match body text size (e.g., `1.3 * body_font_size`):
   ```javascript
   const lineHeight = 18.2; // Adjust (e.g., 18.2 for body text 14)
   ```
5. Save, commit, and push:
   ```bash
   git add public/script.js
   git commit -m "Update PDF font sizes"
   git push origin main
   ```
6. Test the PDF output locally or on Vercel.

---

## 🐛 Troubleshooting

- **PDF Download Fails**:
  - Ensure `pdf-lib.min.js` is in `public/`.
  - Check console for errors (`Ctrl+Shift+J` in browser).
  - Verify `<script src="pdf-lib.min.js"></script>` in `index.html`.
- **PDF Content Cut Off**:
  - Reduce font sizes or content in `script.js`.
  - Add multi-page support:
    ```javascript
    if (yPosition < margin) {
        page = pdfDoc.addPage([595, 842]);
        yPosition = height - margin;
    }
    ```
- **Text Overlap**:
  - Increase `lineHeight` in `script.js` (e.g., `18.2` to `20`).
- **Vercel Deployment Fails**:
  - Check Vercel logs in the Dashboard.
  - Ensure `package.json` includes:
    ```json
    "dependencies": {
      "express": "^4.18.2",
      "cors": "^2.8.5"
    }
    ```
  - Verify `vercel.json` routes to `server/server.js`.
- **CORS Issues**:
  - Serve `pdf-lib.min.js` locally in `public/`.
- **Sample Data Not Filling**:
  - Check `fill-sample` event listener in `script.js`.
- **Blank PDF**:
  - Use **Fill Sample Data** and retry.
  - Debug `data` object in `script.js`.

---

## 🌟 Notes

- **ATS Compatibility**: Uses Helvetica and a clean layout for ATS parsing.
- **Single-Page PDF**: Fits sample data in one A4 page. Add multi-page support for longer resumes.
- **Enhanced PDF**: 30% larger fonts, 8pt entry spacing, and bold black designations.
- **Vercel**: Automatic deployments on Git pushes. Use Vercel CLI (`npm i -g vercel`) for local deployments.
- **Performance**: Fast PDF generation with `pdf-lib` and scalable hosting on Vercel.
- **Custom Domains**: Configure in Vercel Dashboard > Settings > Domains.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request on GitHub.

---

## 📜 License

MIT License

---

Built with 💻 by Sanskar. Star ⭐ the repo if you find it useful!
