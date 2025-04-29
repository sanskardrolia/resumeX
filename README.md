Resume Builder - ATS-Friendly with Enhanced PDF
A web-based resume builder that creates ATS-friendly resumes with real-time preview, PDF download using the pdf-lib library, and a "Fill Sample Data" feature for quick testing. The PDF output features 30% larger font sizes, additional spacing between entries, and darkened designation text for improved readability.
Features

Resume Sections: Create and edit resumes with sections for Personal Details, Professional Summary, Skills, Work Experience, Extracurricular Activities, Education, Personal Projects, and Hobbies.
Real-Time Preview: View resume updates instantly as you edit the form.
PDF Download: Generate a downloadable PDF using pdf-lib with enhanced readability:
Font sizes increased by 30% (e.g., name: 20.8, section titles: 15.6, body text: 13).
Extra spacing (8 points) between entries in Work Experience, Education, Extracurricular Activities, and Personal Projects.
Darkened designation text in Work Experience for better visibility.


Fill Sample Data: Automatically populate the form with professional, ATS-friendly sample data for testing.
Responsive Design: Works seamlessly on mobile and desktop devices.
ATS-Friendly: Clean, structured layout with standard Helvetica fonts for compatibility with Applicant Tracking Systems.
Dynamic Entries: Add multiple entries for Work Experience, Extracurricular Activities, Education, and Personal Projects with "Add" buttons.
Word Count Limit: Professional Summary capped at 30 words with a live counter.

Tech Stack

Frontend: HTML, CSS (Tailwind CSS), Vanilla JavaScript, pdf-lib
Backend: Node.js, Express.js
Deployment: Vercel (optional, for hosting)
Version Control: Git, GitHub

Project Structure
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
├── vercel.json (optional, for Vercel deployment)

Setup Instructions (Local)

Clone the Repository:
git clone https://github.com/your-username/resume-builder.git
cd resume-builder


Install Backend Dependencies:
cd server
npm install


Download pdf-lib.min.js:

Place the pdf-lib library in the public folder:cd ../public
curl -o pdf-lib.min.js https://unpkg.com/pdf-lib/dist/pdf-lib.min.js


Verify pdf-lib.min.js is in public/.


Start the Server:
cd ../server
npm start


Access the Application:

Open http://localhost:3000 in your browser.



Deployment on Vercel
To host the resume builder on Vercel with automatic deployments from GitHub:

Push to GitHub:

Initialize a Git repository if not already done:git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/resume-builder.git
git push -u origin main




Import to Vercel:

Log in to Vercel and click New Project > Import Git Repository.
Select your resume-builder repository and grant Vercel access to GitHub if prompted.


Configure Vercel Settings:

Framework Preset: Select Other.
Root Directory: Set to the root (resume-builder/) or adjust if needed.
Build Command: Leave blank (no build step required).
Output Directory: Leave blank.
Install Command: Leave as default (npm install).
Development Command: Set to npm start.
Click Deploy.


Add vercel.json (Optional):

Create resume-builder/vercel.json to ensure Vercel serves the Node.js/Express app:{
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


Commit and push:git add vercel.json
git commit -m "Add vercel.json for deployment"
git push origin main




Access Live URL:

After deployment, Vercel provides a URL (e.g., https://resume-builder-abc123.vercel.app).
Test the application at this URL.


Automatic Redeployments:

Push changes to the main branch to trigger automatic redeployments.



Usage

Edit Resume: Fill in the form on the right manually or click Fill Sample Data to populate with professional sample data.
Preview: See real-time updates in the preview pane on the left.
Download PDF: Click Download PDF to generate and save the resume as a PDF with enhanced font sizes, spacing, and darkened designations.
Add Entries: Use the Add buttons to include multiple Work Experience, Extracurricular Activities, Education, or Personal Project entries.
Word Count: Ensure the Professional Summary stays within 30 words (live counter provided).

Customizing Font Sizes
To adjust PDF font sizes:

Open public/script.js.
Locate the downloadBtn.addEventListener('click', ...) section.
Modify font sizes in drawText calls:
Name: drawText(data.name, font, 20.8, true); (e.g., change 20.8 to 22).
Section Titles: drawText('Skills', font, 15.6, true); (e.g., change 15.6 to 16).
Body Text: drawText(data.hardSkills, font, 13); (e.g., change 13 to 14).


Adjust lineHeight (currently 18.2) to match body text size (e.g., 1.3 * body_font_size).
Save, commit, and push changes:git add public/script.js
git commit -m "Update PDF font sizes"
git push origin main


Test the PDF output locally or on Vercel.

Troubleshooting

PDF Download Fails:
Ensure pdf-lib.min.js is in public/.
Check browser console for errors (e.g., "PDFLib is not defined").
Verify index.html includes <script src="pdf-lib.min.js"></script>.


PDF Content Cut Off:
Reduce font sizes or content length in script.js.
Add multi-page support by modifying drawText to create new pages when yPosition < margin (see script.js comments).


Text Overlap:
Increase lineHeight in script.js (e.g., from 18.2 to 20).
Adjust font sizes to balance readability and page fit.


Vercel Deployment Fails:
Check Vercel logs in the Dashboard for dependency or runtime errors.
Ensure server/package.json includes all dependencies (express, cors).
Verify vercel.json routes requests to server/server.js.


CORS Issues:
Serve pdf-lib.min.js locally from public/ to avoid CORS errors.


Sample Data Not Filling:
Check the fill-sample button event listener in script.js.
Inspect console for JavaScript errors.


Blank PDF:
Use Fill Sample Data to populate the form, then download.
Log the data object in script.js to debug missing fields.



Notes

ATS Compatibility: The PDF uses standard Helvetica fonts and a clean layout, ensuring compatibility with Applicant Tracking Systems.
Single-Page PDF: The current implementation generates a single A4 page. For multi-page support, modify script.js to add new pages when yPosition nears the page bottom.
Font Enhancements: Font sizes are 30% larger (name: 20.8, titles: 15.6, body: 13), with lineHeight of 18.2 and 8-point spacing between entries for readability.
Darkened Designations: Work Experience designations are bold and black (rgb(0, 0, 0)) for visibility.
Vercel Hosting: Deployments are automatic on GitHub pushes. Use Vercel CLI (npm i -g vercel) for local deployments if preferred.
Performance: pdf-lib generates PDFs quickly, and Vercel’s scaling ensures fast load times.
Custom Domains: Add a custom domain in Vercel’s Dashboard (Project > Settings > Domains).

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request on GitHub.

License
MIT License
