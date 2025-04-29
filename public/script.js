document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const preview = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-pdf');
    const fillSampleBtn = document.getElementById('fill-sample');
    const professionalSummary = document.getElementById('professional-summary');
    const wordCountDisplay = document.getElementById('word-count');
  
    // Real-time update
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);
  
    // Word count for professional summary
    professionalSummary.addEventListener('input', () => {
      const words = professionalSummary.value.trim().split(/\s+/).filter(word => word.length > 0);
      wordCountDisplay.textContent = `${words.length}/30 words`;
      if (words.length > 30) {
        wordCountDisplay.classList.add('text-red-600');
      } else {
        wordCountDisplay.classList.remove('text-red-600');
      }
    });
  
    // Add work experience
    document.getElementById('add-work').addEventListener('click', () => {
      const workDiv = document.createElement('div');
      workDiv.className = 'work-entry mb-2';
      workDiv.innerHTML = `
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 company-name">
        <input type="text" placeholder="Designation" class="w-full p-2 border rounded mb-2 designation">
        <input type="month" placeholder="Start Date" class="w-full p-2 border rounded mb-2 start-date">
        <input type="month" placeholder="End Date" class="w-full p-2 border rounded mb-2 end-date">
        <label><input type="checkbox" class="present"> Present</label>
        <textarea placeholder="Contributions" class="w-full p-2 border rounded contributions" rows="3"></textarea>
        <button type="button" class="text-red-600 mt-2 remove-work">Remove</button>
      `;
      document.getElementById('work-experience').appendChild(workDiv);
      workDiv.querySelector('.remove-work').addEventListener('click', () => workDiv.remove());
      updatePreview();
    });
  
    // Add extracurricular activity
    document.getElementById('add-extra').addEventListener('click', () => {
      const extraDiv = document.createElement('div');
      extraDiv.className = 'extra-entry mb-2';
      extraDiv.innerHTML = `
        <input type="text" placeholder="Activity Name" class="w-full p-2 border rounded mb-2 activity-name">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description" rows="3"></textarea>
        <button type="button" class="text-red-600 mt-2 remove-extra">Remove</button>
      `;
      document.getElementById('extracurricular').appendChild(extraDiv);
      extraDiv.querySelector('.remove-extra').addEventListener('click', () => extraDiv.remove());
      updatePreview();
    });
  
    // Add education
    document.getElementById('add-edu').addEventListener('click', () => {
      const eduDiv = document.createElement('div');
      eduDiv.className = 'edu-entry mb-2';
      eduDiv.innerHTML = `
        <input type="text" placeholder="Course and Branch" class="w-full p-2 border rounded mb-2 course">
        <input type="text" placeholder="College Name" class="w-full p-2 border rounded mb-2 college">
        <input type="text" placeholder="CGPA/Percentage" class="w-full p-2 border rounded marks">
        <button type="button" class="text-red-600 mt-2 remove-edu">Remove</button>
      `;
      document.getElementById('education').appendChild(eduDiv);
      eduDiv.querySelector('.remove-edu').addEventListener('click', () => eduDiv.remove());
      updatePreview();
    });
  
    // Add project
    document.getElementById('add-project').addEventListener('click', () => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-entry mb-2';
      projectDiv.innerHTML = `
        <input type="text" placeholder="Project Name" class="w-full p-2 border rounded mb-2 project-name">
        <input type="url" placeholder="Project URL" class="w-full p-2 border rounded mb-2 project-url">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description" rows="3"></textarea>
        <button type="button" class="text-red-600 mt-2 remove-project">Remove</button>
      `;
      document.getElementById('projects').appendChild(projectDiv);
      projectDiv.querySelector('.remove-project').addEventListener('click', () => projectDiv.remove());
      updatePreview();
    });
  
    // Fill sample data
    fillSampleBtn.addEventListener('click', () => {
      // Clear existing entries
      document.getElementById('work-experience').innerHTML = '';
      document.getElementById('extracurricular').innerHTML = '';
      document.getElementById('education').innerHTML = '';
      document.getElementById('projects').innerHTML = '';
  
      // Personal Details
      document.getElementById('name').value = 'John Doe';
      document.getElementById('profile-summary').value = 'Results-driven software engineer with expertise in web development and a passion for building scalable applications.';
      document.getElementById('location').value = 'San Francisco, CA';
      document.getElementById('mobile').value = '(123) 456-7890';
      document.getElementById('linkedin').value = 'https://linkedin.com/in/johndoe';
      document.getElementById('portfolio').value = 'https://johndoeportfolio.com';
  
      // Professional Summary
      document.getElementById('professional-summary').value = 'Skilled in full-stack development, leading teams, and delivering high-quality code. Proficient in JavaScript, Python, and cloud technologies.';
  
      // Skills
      document.getElementById('hard-skills').value = 'JavaScript, Python, React, Node.js';
      document.getElementById('tools').value = 'Git, Docker, AWS, VS Code';
      document.getElementById('additional-skills').value = 'Agile Methodology, Problem Solving, Team Leadership';
  
      // Work Experience
      const workDiv1 = document.createElement('div');
      workDiv1.className = 'work-entry mb-2';
      workDiv1.innerHTML = `
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 company-name" value="Tech Corp">
        <input type="text" placeholder="Designation" class="w-full p-2 border rounded mb-2 designation" value="Senior Software Engineer">
        <input type="month" placeholder="Start Date" class="w-full p-2 border rounded mb-2 start-date" value="2020-06">
        <input type="month" placeholder="End Date" class="w-full p-2 border rounded mb-2 end-date" value="2023-12">
        <label><input type="checkbox" class="present"> Present</label>
        <textarea placeholder="Contributions" class="w-full p-2 border rounded contributions" rows="3">Developed scalable web applications, led a team of 5 developers, and improved system performance by 30%.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-work">Remove</button>
      `;
      document.getElementById('work-experience').appendChild(workDiv1);
      workDiv1.querySelector('.remove-work').addEventListener('click', () => workDiv1.remove());
  
      const workDiv2 = document.createElement('div');
      workDiv2.className = 'work-entry mb-2';
      workDiv2.innerHTML = `
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 company-name" value="Startup Inc">
        <input type="text" placeholder="Designation" class="w-full p-2 border rounded mb-2 designation" value="Software Engineer">
        <input type="month" placeholder="Start Date" class="w-full p-2 border rounded mb-2 start-date" value="2018-01">
        <input type="month" placeholder="End Date" class="w-full p-2 border rounded mb-2 end-date" value="2020-05">
        <label><input type="checkbox" class="present"> Present</label>
        <textarea placeholder="Contributions" class="w-full p-2 border rounded contributions" rows="3">Built RESTful APIs and integrated third-party services, enhancing user experience.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-work">Remove</button>
      `;
      document.getElementById('work-experience').appendChild(workDiv2);
      workDiv2.querySelector('.remove-work').addEventListener('click', () => workDiv2.remove());
  
      // Extracurricular Activities
      const extraDiv = document.createElement('div');
      extraDiv.className = 'extra-entry mb-2';
      extraDiv.innerHTML = `
        <input type="text" placeholder="Activity Name" class="w-full p-2 border rounded mb-2 activity-name" value="Open Source Contributor">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description" rows="3">Contributed to open-source projects on GitHub, focusing on web development frameworks.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-extra">Remove</button>
      `;
      document.getElementById('extracurricular').appendChild(extraDiv);
      extraDiv.querySelector('.remove-extra').addEventListener('click', () => extraDiv.remove());
  
      // Education
      const eduDiv = document.createElement('div');
      eduDiv.className = 'edu-entry mb-2';
      eduDiv.innerHTML = `
        <input type="text" placeholder="Course and Branch" class="w-full p-2 border rounded mb-2 course" value="B.S. Computer Science">
        <input type="text" placeholder="College Name" class="w-full p-2 border rounded mb-2 college" value="University of California">
        <input type="text" placeholder="CGPA/Percentage" class="w-full p-2 border rounded marks" value="3.8/4.0">
        <button type="button" class="text-red-600 mt-2 remove-edu">Remove</button>
      `;
      document.getElementById('education').appendChild(eduDiv);
      eduDiv.querySelector('.remove-edu').addEventListener('click', () => eduDiv.remove());
  
      // Personal Projects
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-entry mb-2';
      projectDiv.innerHTML = `
        <input type="text" placeholder="Project Name" class="w-full p-2 border rounded mb-2 project-name" value="Task Management App">
        <input type="url" placeholder="Project URL" class="w-full p-2 border rounded mb-2 project-url" value="https://github.com/johndoe/task-app">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description" rows="3">Developed a full-stack task management app using React and Node.js, deployed on AWS.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-project">Remove</button>
      `;
      document.getElementById('projects').appendChild(projectDiv);
      projectDiv.querySelector('.remove-project').addEventListener('click', () => projectDiv.remove());
  
      // Hobbies
      document.getElementById('hobbies').value = 'Reading, Hiking, Coding';
  
      // Update word count and preview
      const words = professionalSummary.value.trim().split(/\s+/).filter(word => word.length > 0);
      wordCountDisplay.textContent = `${words.length}/30 words`;
      updatePreview();
    });
  
    function updatePreview() {
      const data = {
        name: document.getElementById('name').value,
        profileSummary: document.getElementById('profile-summary').value,
        location: document.getElementById('location').value,
        mobile: document.getElementById('mobile').value,
        linkedin: document.getElementById('linkedin').value,
        portfolio: document.getElementById('portfolio').value,
        professionalSummary: document.getElementById('professional-summary').value,
        hardSkills: document.getElementById('hard-skills').value.split(',').map(s => s.trim()),
        tools: document.getElementById('tools').value.split(',').map(s => s.trim()),
        additionalSkills: document.getElementById('additional-skills').value.split(',').map(s => s.trim()),
        workExperience: Array.from(document.querySelectorAll('.work-entry')).map(entry => ({
          company: entry.querySelector('.company-name').value,
          designation: entry.querySelector('.designation').value,
          startDate: entry.querySelector('.start-date').value,
          endDate: entry.querySelector('.present').checked ? 'Present' : entry.querySelector('.end-date').value,
          contributions: entry.querySelector('.contributions').value
        })),
        extracurricular: Array.from(document.querySelectorAll('.extra-entry')).map(entry => ({
          name: entry.querySelector('.activity-name').value,
          description: entry.querySelector('.description').value
        })),
        education: Array.from(document.querySelectorAll('.edu-entry')).map(entry => ({
          course: entry.querySelector('.course').value,
          college: entry.querySelector('.college').value,
          marks: entry.querySelector('.marks').value
        })),
        projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
          name: entry.querySelector('.project-name').value,
          url: entry.querySelector('.project-url').value,
          description: entry.querySelector('.description').value
        })),
        hobbies: document.getElementById('hobbies').value.split(',').map(s => s.trim())
      };
  
      preview.innerHTML = `
        <h1 class="text-2xl font-bold">${data.name || 'Your Name'}</h1>
        <p>${data.location || 'Location'} | ${data.mobile || 'Mobile'} | 
          <a href="${data.linkedin || '#'}" class="text-blue-600">LinkedIn</a> | 
          <a href="${data.portfolio || '#'}" class="text-blue-600">Portfolio</a></p>
        <p class="mt-2">${data.profileSummary || 'Profile Summary'}</p>
  
        <h2 class="text-xl font-semibold mt-4">Professional Summary</h2>
        <p>${data.professionalSummary || 'Your professional summary'}</p>
  
        <h2 class="text-xl font-semibold mt-4">Skills</h2>
        <ul class="list-disc ml-5">
          <li><strong>Hard Skills:</strong> ${data.hardSkills.join(', ') || 'None'}</li>
          <li><strong>Tools:</strong> ${data.tools.join(', ') || 'None'}</li>
          <li><strong>Additional Skills:</strong> ${data.additionalSkills.join(', ') || 'None'}</li>
        </ul>
  
        <h2 class="text-xl font-semibold mt-4">Work Experience</h2>
        ${data.workExperience.map(exp => `
          <div class="mb-2">
            <p><strong>${exp.company || 'Company'}</strong> - ${exp.designation || 'Designation'}</p>
            <p>${exp.startDate || 'Start'} - ${exp.endDate || 'End'}</p>
            <p>${exp.contributions || 'Contributions'}</p>
          </div>
        `).join('')}
  
        <h2 class="text-xl font-semibold mt-4">Extracurricular Activities</h2>
        ${data.extracurricular.map(act => `
          <div class="mb-2">
            <p><strong>${act.name || 'Activity'}</strong></p>
            <p>${act.description || 'Description'}</p>
          </div>
        `).join('')}
  
        <h2 class="text-xl font-semibold mt-4">Education</h2>
        ${data.education.map(edu => `
          <div class="mb-2">
            <p><strong>${edu.course || 'Course'}</strong> - ${edu.college || 'College'}</p>
            <p>${edu.marks || 'Marks'}</p>
          </div>
        `).join('')}
  
        <h2 class="text-xl font-semibold mt-4">Personal Projects</h2>
        ${data.projects.map(proj => `
          <div class="mb-2">
            <p><strong><a href="${proj.url || '#'}" class="text-blue-600">${proj.name || 'Project'}</a></strong></p>
            <p>${proj.description || 'Description'}</p>
          </div>
        `).join('')}
  
        <h2 class="text-xl font-semibold mt-4">Hobbies and Interests</h2>
        <p>${data.hobbies.join(' | ') || 'None'}</p>
      `;
    }
  
    // Download PDF using pdf-lib
    downloadBtn.addEventListener('click', async () => {
      try {
        const { PDFDocument, StandardFonts, rgb } = PDFLib;
  
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size in points
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        let yPosition = height - 40; // Start from top with margin
        const margin = 40;
        const lineHeight = 18.2; // Increased by 30% from 14
        const maxWidth = width - 2 * margin;
        const entrySpacing = 8; // Extra spacing between entries
  
        // Function to draw text and update yPosition
        const drawText = (text, font, size, isBold = false, x = margin, color = rgb(0, 0, 0)) => {
          const lines = text.split('\n');
          const selectedFont = isBold ? boldFont : font;
          for (const line of lines) {
            const words = line.split(' ');
            let currentLine = '';
            for (const word of words) {
              const testLine = currentLine ? `${currentLine} ${word}` : word;
              const textWidth = selectedFont.widthOfTextAtSize(testLine, size);
              if (textWidth > maxWidth) {
                page.drawText(currentLine, { x, y: yPosition, size, font: selectedFont, color });
                yPosition -= lineHeight;
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            }
            if (currentLine) {
              page.drawText(currentLine, { x, y: yPosition, size, font: selectedFont, color });
              yPosition -= lineHeight;
            }
          }
          yPosition -= 4; // Extra spacing after section
        };
  
        // Collect form data
        const data = {
          name: document.getElementById('name').value || 'Your Name',
          contact: `${document.getElementById('location').value || 'Location'} | ${document.getElementById('mobile').value || 'Mobile'} | ${document.getElementById('linkedin').value || 'LinkedIn'} | ${document.getElementById('portfolio').value || 'Portfolio'}`,
          profileSummary: document.getElementById('profile-summary').value || 'Profile Summary',
          professionalSummary: document.getElementById('professional-summary').value || 'Your professional summary',
          hardSkills: `Hard Skills: ${document.getElementById('hard-skills').value.split(',').map(s => s.trim()).join(', ') || 'None'}`,
          tools: `Tools: ${document.getElementById('tools').value.split(',').map(s => s.trim()).join(', ') || 'None'}`,
          additionalSkills: `Additional Skills: ${document.getElementById('additional-skills').value.split(',').map(s => s.trim()).join(', ') || 'None'}`,
          workExperience: Array.from(document.querySelectorAll('.work-entry'))
            .map(entry => {
              const company = entry.querySelector('.company-name').value || 'Company';
              const designation = entry.querySelector('.designation').value || 'Designation';
              const startDate = entry.querySelector('.start-date').value || 'Start';
              const endDate = entry.querySelector('.present').checked ? 'Present' : entry.querySelector('.end-date').value || 'End';
              const contributions = entry.querySelector('.contributions').value || 'Contributions';
              return { company, designation, period: `${startDate} - ${endDate}`, contributions };
            }),
          extracurricular: Array.from(document.querySelectorAll('.extra-entry'))
            .map(entry => {
              const name = entry.querySelector('.activity-name').value || 'Activity';
              const description = entry.querySelector('.description').value || 'Description';
              return `${name}\n${description}`;
            }),
          education: Array.from(document.querySelectorAll('.edu-entry'))
            .map(entry => {
              const course = entry.querySelector('.course').value || 'Course';
              const college = entry.querySelector('.college').value || 'College';
              const marks = entry.querySelector('.marks').value || 'Marks';
              return `${course} - ${college}\n${marks}`;
            }),
          projects: Array.from(document.querySelectorAll('.project-entry'))
            .map(entry => {
              const name = entry.querySelector('.project-name').value || 'Project';
              const url = entry.querySelector('.project-url').value || 'URL';
              const description = entry.querySelector('.description').value || 'Description';
              return `${name} (${url})\n${description}`;
            }),
          hobbies: document.getElementById('hobbies').value.split(',').map(s => s.trim()).join(' | ') || 'None'
        };
  
        // Draw resume content
        drawText(data.name, font, 20.8, true); // 16 * 1.3
        drawText(data.contact, font, 13); // 10 * 1.3
        drawText(data.profileSummary, font, 13);
        drawText('Professional Summary', font, 15.6, true); // 12 * 1.3
        drawText(data.professionalSummary, font, 13);
        drawText('Skills', font, 15.6, true);
        drawText(data.hardSkills, font, 13);
        drawText(data.tools, font, 13);
        drawText(data.additionalSkills, font, 13);
        drawText('Work Experience', font, 15.6, true);
        data.workExperience.forEach((exp, index) => {
          drawText(`${exp.company} - ${exp.designation}`, boldFont, 13, true, margin, rgb(0, 0, 0)); // Darkened designation
          drawText(exp.period, font, 13);
          drawText(exp.contributions, font, 13);
          if (index < data.workExperience.length - 1) {
            yPosition -= entrySpacing; // Add spacing between entries
          }
        });
        drawText('Extracurricular Activities', font, 15.6, true);
        data.extracurricular.forEach((act, index) => {
          drawText(act, font, 13);
          if (index < data.extracurricular.length - 1) {
            yPosition -= entrySpacing;
          }
        });
        drawText('Education', font, 15.6, true);
        data.education.forEach((edu, index) => {
          drawText(edu, font, 13);
          if (index < data.education.length - 1) {
            yPosition -= entrySpacing;
          }
        });
        drawText('Personal Projects', font, 15.6, true);
        data.projects.forEach((proj, index) => {
          drawText(proj, font, 13);
          if (index < data.projects.length - 1) {
            yPosition -= entrySpacing;
          }
        });
        drawText('Hobbies and Interests', font, 15.6, true);
        drawText(data.hobbies, font, 13);
  
        // Save and download PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.pdf';
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    });
  
    // Initial preview
    updatePreview();
  });