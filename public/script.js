document.addEventListener('DOMContentLoaded', () => {
  // Shared functionality for both pages
  const toggleThemeBtn = document.getElementById('toggle-theme');
  const shareButton = document.getElementById('share-button');
  const shareToast = document.getElementById('share-toast');
  const shareToastClose = document.getElementById('share-toast-close');
  const body = document.body;

  // Theme initialization
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  if (toggleThemeBtn) {
    toggleThemeBtn.innerHTML = savedTheme === 'light' ? '☾' : '☼';
    toggleThemeBtn.setAttribute('title', savedTheme === 'light' ? 'Dark Mode' : 'Light Mode');
  }

  // Theme toggle
  const toggleTheme = () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    if (toggleThemeBtn) {
      toggleThemeBtn.innerHTML = newTheme === 'light' ? '☾' : '☼';
      toggleThemeBtn.setAttribute('title', newTheme === 'light' ? 'Dark Mode' : 'Light Mode');
    }
  };

  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener('click', toggleTheme);
  }

  // Reusable toast display function
  const showToast = (toastElement, duration) => {
    if (!toastElement) {
      console.error('Toast element not found');
      return;
    }
    try {
      toastElement.classList.remove('hidden');
      toastElement.classList.add('show');
      let timeout = setTimeout(() => {
        toastElement.classList.remove('show');
        setTimeout(() => {
          toastElement.classList.add('hidden');
        }, 500); // Match CSS transition duration
      }, duration);

      // Handle close button
      const closeButton = toastElement.querySelector('.toast-close');
      if (closeButton) {
        const closeHandler = () => {
          clearTimeout(timeout);
          toastElement.classList.remove('show');
          setTimeout(() => {
            toastElement.classList.add('hidden');
          }, 500);
          closeButton.removeEventListener('click', closeHandler);
        };
        closeButton.addEventListener('click', closeHandler);
      }
    } catch (error) {
      console.error('Error displaying toast:', error);
    }
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: 'Fresher Resume Builder',
      text: 'Build ATS-friendly resumes for freshers for FREE',
      url: 'https://fresher-resume.vercel.app'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        const shareText = `${shareData.text}: ${shareData.url}`;
        await navigator.clipboard.writeText(shareText);
        showToast(shareToast, 3000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Copy to clipboard
      const shareText = `${shareData.text}: ${shareData.url}`;
      await navigator.clipboard.writeText(shareText);
      showToast(shareToast, 3000);
    }
  };

  if (shareButton) {
    shareButton.addEventListener('click', handleShare);
  }

  // Homepage-specific logic
  if (window.location.pathname === '/') {
    // Add smooth scroll for homepage CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/builder';
      });
    });
  }

  // Resume Builder-specific logic
  if (window.location.pathname === '/builder') {
    const toast = document.getElementById('toast');
    const toastClose = document.getElementById('toast-close');
    const form = document.getElementById('resume-form');
    const preview = document.getElementById('resume-preview');
    const downloadBtn = document.getElementById('download-pdf');
    const fillSampleBtn = document.getElementById('fill-sample');
    const fontSmallBtn = document.getElementById('font-small');
    const fontMediumBtn = document.getElementById('font-medium');
    const fontLargeBtn = document.getElementById('font-large');
    const professionalSummary = document.getElementById('professional-summary');
    const wordCountDisplay = document.getElementById('word-count');

    // Add builder class to body for CSS scoping
    document.body.classList.add('builder');

    // Toast Message on page load
    if (toast) {
      showToast(toast, 10000);
    }

    // Font size state
    let fontSize = localStorage.getItem('fontSize') || 'medium';

    // Font size handling
    const updateFontSize = (size) => {
      fontSize = size;
      localStorage.setItem('fontSize', size);
      preview.classList.remove('font-small', 'font-medium', 'font-large');
      preview.classList.add(`font-${size}`);
      fontSmallBtn.classList.toggle('active', size === 'small');
      fontMediumBtn.classList.toggle('active', size === 'medium');
      fontLargeBtn.classList.toggle('active', size === 'large');
      updatePreview();
    };

    updateFontSize(fontSize);

    fontSmallBtn.addEventListener('click', () => updateFontSize('small'));
    fontMediumBtn.addEventListener('click', () => updateFontSize('medium'));
    fontLargeBtn.addEventListener('click', () => updateFontSize('large'));

    // Real-time update
    form.addEventListener('input', updatePreview);
    form.addEventListener('change', updatePreview);

    // Word count for Professional Summary
    professionalSummary.addEventListener('input', () => {
      const words = professionalSummary.value.trim().split(/\s+/).filter(word => word.length > 0);
      wordCountDisplay.textContent = `${words.length}/30 words`;
      if (words.length > 30) {
        wordCountDisplay.classList.add('text-red-600');
        wordCountDisplay.classList.remove('text-gray-600', 'text-gray-400');
      } else {
        wordCountDisplay.classList.remove('text-red-600');
        wordCountDisplay.classList.add(body.getAttribute('data-theme') === 'dark' ? 'text-gray-400' : 'text-gray-600');
      }
    });

    // Add work experience
    document.getElementById('add-work').addEventListener('click', () => {
      const workDiv = document.createElement('div');
      workDiv.className = 'work-entry mb-2';
      workDiv.innerHTML = `
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 company-name bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="text" placeholder="Designation" class="w-full p-2 border rounded mb-2 designation bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="month" placeholder="Start Date" class="w-full p-2 border rounded mb-2 start-date bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="month" placeholder="End Date" class="w-full p-2 border rounded mb-2 end-date bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <label class="text-gray-900"><input type="checkbox" class="present"> Present</label>
        <textarea placeholder="Contributions" class="w-full p-2 border rounded contributions bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3"></textarea>
        <button type="button" class="text-red-600 mt-2 remove-work hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('work-experience').appendChild(workDiv);
      workDiv.querySelector('.remove-work').addEventListener('click', () => {
        workDiv.remove();
        updatePreview();
      });
      updatePreview();
    });

    // Add extracurricular activity
    document.getElementById('add-extra').addEventListener('click', () => {
      const extraDiv = document.createElement('div');
      extraDiv.className = 'extra-entry mb-2';
      extraDiv.innerHTML = `
        <input type="text" placeholder="Activity Name" class="w-full p-2 border rounded mb-2 activity-name bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3"></textarea>
        <button type="button" class="text-red-600 mt-2 remove-extra hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('extracurricular').appendChild(extraDiv);
      extraDiv.querySelector('.remove-extra').addEventListener('click', () => {
        extraDiv.remove();
        updatePreview();
      });
      updatePreview();
    });

    // Add education
    document.getElementById('add-edu').addEventListener('click', () => {
      const eduDiv = document.createElement('div');
      eduDiv.className = 'edu-entry mb-2';
      eduDiv.innerHTML = `
        <input type="text" placeholder="Course and Branch" class="w-full p-2 border rounded mb-2 course bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="text" placeholder="College Name" class="w-full p-2 border rounded mb-2 college bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="text" placeholder="CGPA/Percentage" class="w-full p-2 border rounded mb-2 marks bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="number" placeholder="Graduation Year" class="w-full p-2 border rounded mb-2 grad-year bg-gray-50 text-gray-900 border-gray-300 transition-colors" min="1900" max="2030">
        <button type="button" class="text-red-600 mt-2 remove-edu hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('education').appendChild(eduDiv);
      eduDiv.querySelector('.remove-edu').addEventListener('click', () => {
        eduDiv.remove();
        updatePreview();
      });
      updatePreview();
    });

    // Add certificate
    document.getElementById('add-cert').addEventListener('click', () => {
      const certDiv = document.createElement('div');
      certDiv.className = 'cert-entry mb-2';
      certDiv.innerHTML = `
        <input type="text" placeholder="Certificate Title" class="w-full p-2 border rounded mb-2 cert-title bg-gray-50 text-gray-900 border-gray-300 transition-colors" required>
        <input type="month" placeholder="Date" class="w-full p-2 border rounded mb-2 cert-date bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="url" placeholder="Certificate Link" class="w-full p-2 border rounded mb-2 cert-link bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <button type="button" class="text-red-600 mt-2 remove-cert hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('certificates').appendChild(certDiv);
      certDiv.querySelector('.remove-cert').addEventListener('click', () => {
        certDiv.remove();
        updatePreview();
      });
      updatePreview();
    });

    // Add project
    document.getElementById('add-project').addEventListener('click', () => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-entry mb-2';
      projectDiv.innerHTML = `
        <input type="text" placeholder="Project Name" class="w-full p-2 border rounded mb-2 project-name bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <input type="url" placeholder="Project URL" class="w-full p-2 border rounded mb-2 project-url bg-gray-50 text-gray-900 border-gray-300 transition-colors">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3"></textarea>
        <button type="button" class="text-red-600 mt-2 remove-project hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('projects').appendChild(projectDiv);
      projectDiv.querySelector('.remove-project').addEventListener('click', () => {
        projectDiv.remove();
        updatePreview();
      });
      updatePreview();
    });

    // Fill sample data
    fillSampleBtn.addEventListener('click', () => {
      document.getElementById('work-experience').innerHTML = '';
      document.getElementById('extracurricular').innerHTML = '';
      document.getElementById('education').innerHTML = '';
      document.getElementById('certificates').innerHTML = '';
      document.getElementById('projects').innerHTML = '';

      document.getElementById('name').value = 'John Doe';
      document.getElementById('profile-summary').value = 'Software Engineer skilled in JavaScript and Python';
      document.getElementById('location').value = 'San Francisco, CA';
      document.getElementById('mobile').value = '(123) 456-7890';
      document.getElementById('linkedin').value = 'https://linkedin.com/in/johndoe';
      document.getElementById('portfolio').value = 'https://johndoeportfolio.com';
      document.getElementById('professional-summary').value = 'Skilled in full-stack development, leading teams, and delivering high-quality code. Proficient in JavaScript, Python, and cloud technologies.';
      document.getElementById('hard-skills').value = 'JavaScript, Python, React, Node.js';
      document.getElementById('tools').value = 'Git, Docker, AWS, VS Code';
      document.getElementById('additional-skills').value = 'Agile Methodology, Problem Solving, Team Leadership';
      document.getElementById('hobbies').value = 'Reading, Hiking, Coding';

      // Sample Work Experience
      const workDiv1 = document.createElement('div');
      workDiv1.className = 'work-entry mb-2';
      workDiv1.innerHTML = `
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 company-name bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Tech Corp">
        <input type="text" placeholder="Designation" class="w-full p-2 border rounded mb-2 designation bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Senior Software Engineer">
        <input type="month" placeholder="Start Date" class="w-full p-2 border rounded mb-2 start-date bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2020-06">
        <input type="month" placeholder="End Date" class="w-full p-2 border rounded mb-2 end-date bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2023-12">
        <label class="text-gray-900"><input type="checkbox" class="present"> Present</label>
        <textarea placeholder="Contributions" class="w-full p-2 border rounded contributions bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3">Developed scalable web applications, led a team of 5 developers, and improved system performance by 30%.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-work hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('work-experience').appendChild(workDiv1);
      workDiv1.querySelector('.remove-work').addEventListener('click', () => {
        workDiv1.remove();
        updatePreview();
      });

      const workDiv2 = document.createElement('div');
      workDiv2.className = 'work-entry mb-2';
      workDiv2.innerHTML = `
        <input type="text" placeholder="Company Name" class="w-full p-2 border rounded mb-2 company-name bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Startup Inc">
        <input type="text" placeholder="Designation" class="w-full p-2 border rounded mb-2 designation bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Software Engineer">
        <input type="month" placeholder="Start Date" class="w-full p-2 border rounded mb-2 start-date bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2018-01">
        <input type="month" placeholder="End Date" class="w-full p-2 border rounded mb-2 end-date bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2020-05">
        <label class="text-gray-900"><input type="checkbox" class="present"> Present</label>
        <textarea placeholder="Contributions" class="w-full p-2 border rounded contributions bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3">Built RESTful APIs and integrated third-party services, enhancing user experience.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-work hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('work-experience').appendChild(workDiv2);
      workDiv2.querySelector('.remove-work').addEventListener('click', () => {
        workDiv2.remove();
        updatePreview();
      });

      // Sample Extracurricular Activity
      const extraDiv = document.createElement('div');
      extraDiv.className = 'extra-entry mb-2';
      extraDiv.innerHTML = `
        <input type="text" placeholder="Activity Name" class="w-full p-2 border rounded mb-2 activity-name bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Open Source Contributor">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3">Contributed to open-source projects on GitHub, focusing on web development frameworks.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-extra hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('extracurricular').appendChild(extraDiv);
      extraDiv.querySelector('.remove-extra').addEventListener('click', () => {
        extraDiv.remove();
        updatePreview();
      });

      // Sample Education
      const eduDiv = document.createElement('div');
      eduDiv.className = 'edu-entry mb-2';
      eduDiv.innerHTML = `
        <input type="text" placeholder="Course and Branch" class="w-full p-2 border rounded mb-2 course bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="B.S. Computer Science">
        <input type="text" placeholder="College Name" class="w-full p-2 border rounded mb-2 college bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="University of California">
        <input type="text" placeholder="CGPA/Percentage" class="w-full p-2 border rounded mb-2 marks bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="3.8/4.0">
        <input type="number" placeholder="Graduation Year" class="w-full p-2 border rounded mb-2 grad-year bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2023">
        <button type="button" class="text-red-600 mt-2 remove-edu hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('education').appendChild(eduDiv);
      eduDiv.querySelector('.remove-edu').addEventListener('click', () => {
        eduDiv.remove();
        updatePreview();
      });

      // Sample Certificates
      const certDiv1 = document.createElement('div');
      certDiv1.className = 'cert-entry mb-2';
      certDiv1.innerHTML = `
        <input type="text" placeholder="Certificate Title" class="w-full p-2 border rounded mb-2 cert-title bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="AWS Certified Developer" required>
        <input type="month" placeholder="Date" class="w-full p-2 border rounded mb-2 cert-date bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2023-06">
        <input type="url" placeholder="Certificate Link" class="w-full p-2 border rounded mb-2 cert-link bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="https://aws.amazon.com/certification">
        <button type="button" class="text-red-600 mt-2 remove-cert hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('certificates').appendChild(certDiv1);
      certDiv1.querySelector('.remove-cert').addEventListener('click', () => {
        certDiv1.remove();
        updatePreview();
      });

      const certDiv2 = document.createElement('div');
      certDiv2.className = 'cert-entry mb-2';
      certDiv2.innerHTML = `
        <input type="text" placeholder="Certificate Title" class="w-full p-2 border rounded mb-2 cert-title bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Google UX Design Certificate" required>
        <input type="month" placeholder="Date" class="w-full p-2 border rounded mb-2 cert-date bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="2022-09">
        <input type="url" placeholder="Certificate Link" class="w-full p-2 border rounded mb-2 cert-link bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="https://coursera.org">
        <button type="button" class="text-red-600 mt-2 remove-cert hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('certificates').appendChild(certDiv2);
      certDiv2.querySelector('.remove-cert').addEventListener('click', () => {
        certDiv2.remove();
        updatePreview();
      });

      // Sample Project
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-entry mb-2';
      projectDiv.innerHTML = `
        <input type="text" placeholder="Project Name" class="w-full p-2 border rounded mb-2 project-name bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="Task Management App">
        <input type="url" placeholder="Project URL" class="w-full p-2 border rounded mb-2 project-url bg-gray-50 text-gray-900 border-gray-300 transition-colors" value="https://github.com/johndoe/task-app">
        <textarea placeholder="Brief Description" class="w-full p-2 border rounded description bg-gray-50 text-gray-900 border-gray-300 transition-colors" rows="3">Developed a full-stack task management app using React and Node.js, deployed on AWS.</textarea>
        <button type="button" class="text-red-600 mt-2 remove-project hover:text-red-700 transition-colors">Remove</button>
      `;
      document.getElementById('projects').appendChild(projectDiv);
      projectDiv.querySelector('.remove-project').addEventListener('click', () => {
        projectDiv.remove();
        updatePreview();
      });

      // Update word count
      const words = professionalSummary.value.trim().split(/\s+/).filter(word => word.length > 0);
      wordCountDisplay.textContent = `${words.length}/30 words`;
      if (words.length > 30) {
        wordCountDisplay.classList.add('text-red-600');
      } else {
        wordCountDisplay.classList.add(body.getAttribute('data-theme') === 'dark' ? 'text-gray-400' : 'text-gray-600');
      }
      updatePreview();
    });

    // Update resume preview
    function updatePreview() {
      const data = {
        name: document.getElementById('name').value,
        profileSummary: document.getElementById('profile-summary').value,
        location: document.getElementById('location').value,
        mobile: document.getElementById('mobile').value,
        linkedin: document.getElementById('linkedin').value,
        portfolio: document.getElementById('portfolio').value,
        professionalSummary: document.getElementById('professional-summary').value,
        hardSkills: document.getElementById('hard-skills').value.split(',').map(s => s.trim()).filter(s => s),
        tools: document.getElementById('tools').value.split(',').map(s => s.trim()).filter(s => s),
        additionalSkills: document.getElementById('additional-skills').value.split(',').map(s => s.trim()).filter(s => s),
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
          marks: entry.querySelector('.marks').value,
          gradYear: entry.querySelector('.grad-year').value
        })),
        certificates: Array.from(document.querySelectorAll('.cert-entry')).map(entry => ({
          title: entry.querySelector('.cert-title').value,
          date: entry.querySelector('.cert-date').value,
          link: entry.querySelector('.cert-link').value
        })),
        projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
          name: entry.querySelector('.project-name').value,
          url: entry.querySelector('.project-url').value,
          description: entry.querySelector('.description').value
        })),
        hobbies: document.getElementById('hobbies').value.split(',').map(s => s.trim()).filter(s => s)
      };

      preview.innerHTML = `
        <h1 class="text-2xl font-bold">${data.name || 'Your Name'}</h1>
        <p class="text-sm">${data.location || 'Location'} | ${data.mobile || 'Mobile'} | 
          <a href="${data.linkedin || '#'}" class="text-blue-600">${data.linkedin || 'LinkedIn'}</a> | 
          <a href="${data.portfolio || '#'}" class="text-blue-600">${data.portfolio || 'Portfolio'}</a></p>
        <p class="mt-2 text-sm">${data.profileSummary || 'Major Skill (e.g., Software Engineer)'}</p>
        <h2 class="text-xl font-semibold mt-4">Professional Summary</h2>
        <p class="text-sm">${data.professionalSummary || 'Your professional summary'}</p>
        <h2 class="text-xl font-semibold mt-4">Skills</h2>
        <ul class="list-disc ml-5 text-sm">
          <li><strong>Hard Skills:</strong> ${data.hardSkills.join(', ') || 'None'}</li>
          <li><strong>Tools:</strong> ${data.tools.join(', ') || 'None'}</li>
          <li><strong>Additional Skills:</strong> ${data.additionalSkills.join(', ') || 'None'}</li>
        </ul>
        <h2 class="text-xl font-semibold mt-4">Work Experience</h2>
        ${data.workExperience.map(exp => `
          <div class="mb-2">
            <p class="text-sm"><strong>${exp.company || 'Company'}</strong> - ${exp.designation || 'Designation'}</p>
            <p class="text-sm">${exp.startDate || 'Start'} - ${exp.endDate || 'End'}</p>
            <p class="text-sm">${exp.contributions || 'Contributions'}</p>
          </div>
        `).join('')}
        <h2 class="text-xl font-semibold mt-4">Extracurricular Activities</h2>
        ${data.extracurricular.map(act => `
          <div class="mb-2">
            <p class="text-sm"><strong>${act.name || 'Activity'}</strong></p>
            <p class="text-sm">${act.description || 'Description'}</p>
          </div>
        `).join('')}
        <h2 class="text-xl font-semibold mt-4">Education</h2>
        ${data.education.map(edu => `
          <div class="mb-2">
            <p class="text-sm"><strong>${edu.course || 'Course'}</strong> - ${edu.college || 'College'}${edu.gradYear ? ', ' + edu.gradYear : ''}</p>
            <p class="text-sm">${edu.marks || 'Marks'}</p>
          </div>
        `).join('')}
        <h2 class="text-xl font-semibold mt-4">Certificates</h2>
        ${data.certificates.map(cert => `
          <div class="mb-2">
            <p class="text-sm">${cert.title || 'Certificate'} - ${cert.date || 'Date'} (<a href="${cert.link || '#'}" class="text-blue-600">${cert.link || 'Link'}</a>)</p>
          </div>
        `).join('')}
        <h2 class="text-xl font-semibold mt-4">Personal Projects</h2>
        ${data.projects.map(proj => `
          <div class="mb-2">
            <p class="text-sm"><strong><a href="${proj.url || '#'}" class="text-blue-600">${proj.name || 'Project'}</a></strong></p>
            <p class="text-sm">${proj.description || 'Description'}</p>
          </div>
        `).join('')}
        <h2 class="text-xl font-semibold mt-4">Hobbies and Interests</h2>
        <p class="text-sm">${data.hobbies.join(' | ') || 'None'}</p>
      `;
    }

    // Download PDF
    downloadBtn.addEventListener('click', async () => {
      try {
        const { PDFDocument, StandardFonts, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        let page = pdfDoc.addPage([595, 842]); // A4 size in points
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        let yPosition = height - 40;
        const margin = 40;
        const baseLineHeight = 18.2;
        const maxWidth = width - 2 * margin;
        const entrySpacing = 8;
        const separatorLineThickness = 0.5;
        const separatorLineColor = rgb(0.5, 0.5, 0.5);

        const fontScales = { small: 0.8, medium: 1.0, large: 1.2 }; 
        const fontScale = fontScales[fontSize];
        const lineHeight = baseLineHeight * fontScale;

        const checkPageOverflow = (requiredHeight) => {
          if (yPosition - requiredHeight < margin) {
            page = pdfDoc.addPage([595, 842]);
            yPosition = height - margin;
          }
        };

        const drawText = (text, font, size, isBold = false, x = margin, color = rgb(0, 0, 0)) => {
          const scaledSize = size * fontScale;
          const lines = text.split('\n');
          const selectedFont = isBold ? boldFont : font;
          for (const line of lines) {
            const words = line.split(' ');
            let currentLine = '';
            for (const word of words) {
              const testLine = currentLine ? `${currentLine} ${word}` : word;
              const textWidth = selectedFont.widthOfTextAtSize(testLine, scaledSize);
              if (textWidth > maxWidth) {
                checkPageOverflow(lineHeight);
                page.drawText(currentLine, { x, y: yPosition, size: scaledSize, font: selectedFont, color });
                yPosition -= lineHeight;
                currentLine = word;
              } else {
                currentLine = testLine;
              }
            }
            if (currentLine) {
              checkPageOverflow(lineHeight);
              page.drawText(currentLine, { x, y: yPosition, size: scaledSize, font: selectedFont, color });
              yPosition -= lineHeight;
            }
          }
          yPosition -= 4 * fontScale;
        };

        const drawSeparatorLine = () => {
          checkPageOverflow(separatorLineThickness + 16);
          page.drawLine({
            start: { x: margin, y: yPosition },
            end: { x: width - margin, y: yPosition },
            thickness: separatorLineThickness,
            color: separatorLineColor,
            opacity: 0.5,
          });
          yPosition -= 16;
        };

        const data = {
          name: document.getElementById('name').value || 'Your Name',
          contact: [
            document.getElementById('location').value || 'Location',
            document.getElementById('mobile').value || 'Mobile',
            document.getElementById('linkedin').value || 'LinkedIn',
            document.getElementById('portfolio').value || 'Portfolio'
          ].filter(Boolean).join(' | '),
          profileSummary: document.getElementById('profile-summary').value || 'Major Skill (e.g., Software Engineer)',
          professionalSummary: document.getElementById('professional-summary').value || 'Your professional summary',
          hardSkills: `Hard Skills: ${document.getElementById('hard-skills').value.split(',').map(s => s.trim()).filter(s => s).join(', ') || 'None'}`,
          tools: `Tools: ${document.getElementById('tools').value.split(',').map(s => s.trim()).filter(s => s).join(', ') || 'None'}`,
          additionalSkills: `Additional Skills: ${document.getElementById('additional-skills').value.split(',').map(s => s.trim()).filter(s => s).join(', ') || 'None'}`,
          workExperience: Array.from(document.querySelectorAll('.work-entry')).map(entry => ({
            company: entry.querySelector('.company-name').value,
            designation: entry.querySelector('.designation').value,
            startDate: entry.querySelector('.start-date').value,
            endDate: entry.querySelector('.present').checked ? 'Present' : entry.querySelector('.end-date').value,
            contributions: entry.querySelector('.contributions').value
          })).filter(exp => exp.company || exp.designation || exp.startDate || exp.endDate || exp.contributions),
          extracurricular: Array.from(document.querySelectorAll('.extra-entry')).map(entry => ({
            name: entry.querySelector('.activity-name').value,
            description: entry.querySelector('.description').value
          })).filter(act => act.name || act.description),
          education: Array.from(document.querySelectorAll('.edu-entry')).map(entry => ({
            course: entry.querySelector('.course').value,
            college: entry.querySelector('.college').value,
            marks: entry.querySelector('.marks').value,
            gradYear: entry.querySelector('.grad-year').value
          })).filter(edu => edu.course || edu.college || edu.marks || edu.gradYear),
          certificates: Array.from(document.querySelectorAll('.cert-entry')).map(entry => ({
            title: entry.querySelector('.cert-title').value,
            date: entry.querySelector('.cert-date').value,
            link: entry.querySelector('.cert-link').value
          })).filter(cert => cert.title),
          projects: Array.from(document.querySelectorAll('.project-entry')).map(entry => ({
            name: entry.querySelector('.project-name').value,
            url: entry.querySelector('.project-url').value,
            description: entry.querySelector('.description').value
          })).filter(proj => proj.name || proj.url || proj.description),
          hobbies: document.getElementById('hobbies').value.split(',').map(s => s.trim()).filter(s => s).join(' | ') || 'None'
        };

        // Name
        drawText(data.name, boldFont, 20, true);

        // Contact
        drawText(data.contact, font, 13);
        yPosition -= 4 * fontScale;

        // Profile Summary
        drawText(data.profileSummary, font, 13);
        drawSeparatorLine();

        // Professional Summary
        drawText('Professional Summary', boldFont, 14, true);
        drawText(data.professionalSummary, font, 13);
        yPosition -= entrySpacing;
        drawSeparatorLine();

        // Skills
        drawText('Skills', boldFont, 14, true);
        drawText(data.hardSkills, font, 13);
        drawText(data.tools, font, 13);
        drawText(data.additionalSkills, font, 13);
        yPosition -= entrySpacing;
        drawSeparatorLine();

        // Work Experience
        if (data.workExperience.length > 0) {
          drawText('Work Experience', boldFont, 14, true);
          data.workExperience.forEach(exp => {
            drawText(`${exp.company || 'Company'} - ${exp.designation || 'Designation'}`, boldFont, 13);
            drawText(`${exp.startDate || 'Start'} - ${exp.endDate || 'End'}`, font, 13);
            drawText(exp.contributions || 'Contributions', font, 13);
            yPosition -= entrySpacing;
          });
          drawSeparatorLine();
        }

        // Extracurricular Activities
        if (data.extracurricular.length > 0) {
          drawText('Extracurricular Activities', boldFont, 14, true);
          data.extracurricular.forEach(act => {
            drawText(act.name || 'Activity', boldFont, 13);
            drawText(act.description || 'Description', font, 13);
            yPosition -= entrySpacing;
          });
          drawSeparatorLine();
        }

        // Education
        if (data.education.length > 0) {
          drawText('Education', boldFont, 14, true);
          data.education.forEach(edu => {
            drawText(`${edu.course || 'Course'} - ${edu.college || 'College'}${edu.gradYear ? ', ' + edu.gradYear : ''}`, boldFont, 13);
            drawText(edu.marks || 'Marks', font, 13);
            yPosition -= entrySpacing;
          });
          drawSeparatorLine();
        }

        // Certificates
        if (data.certificates.length > 0) {
          drawText('Certificates', boldFont, 14, true);
          data.certificates.forEach(cert => {
            drawText(`${cert.title || 'Certificate'} - ${cert.date || 'Date'} (${cert.link || 'Link'})`, font, 13);
            yPosition -= entrySpacing;
          });
          drawSeparatorLine();
        }

        // Personal Projects
        if (data.projects.length > 0) {
          drawText('Personal Projects', boldFont, 14, true);
          data.projects.forEach(proj => {
            drawText(proj.name || 'Project', boldFont, 13);
            if (proj.url) drawText(proj.url, font, 13);
            drawText(proj.description || 'Description', font, 13);
            yPosition -= entrySpacing;
          });
          drawSeparatorLine();
        }

        // Hobbies and Interests
        drawText('Hobbies and Interests', boldFont, 14, true);
        drawText(data.hobbies, font, 13);

        // Save and download PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${data.name || 'resume'}.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    });
  }
});