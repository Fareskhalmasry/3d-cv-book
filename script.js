function saveData() {
  const fields = [
    "name",
    "job",
    "about",
    "education",
    "experience",
    "skills",
    "services",
    "project",
    "email",
    "phone",
    "facebook",
    "instagram",
    "linkedin",
    "github",
  ];

  fields.forEach((field) => {
    localStorage.setItem(field, document.getElementById(field).value);
  });

  const profilePhoto = document.getElementById("photo").files[0];
  const projectImage = document.getElementById("project-image").files[0];

  if (profilePhoto) {
    const reader = new FileReader();
    reader.onload = function () {
      localStorage.setItem("photo", reader.result);
      saveProjectImage(projectImage);
    };

    reader.readAsDataURL(profilePhoto);
  } else {
    saveProjectImage(projectImage);
  }
}

function saveProjectImage(file) {
  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      localStorage.setItem("projectImage", reader.result);
      window.location.href = "cv.html";
    };

    reader.readAsDataURL(file);
  } else {
    localStorage.removeItem("projectImage");
    window.location.href = "cv.html";
  }
}

const spreads = document.querySelectorAll(".spread");
let currentSpread = 0;
let isTurning = false;

function showSpread() {
  spreads.forEach((spread, index) => {
    spread.style.display = index === currentSpread ? "flex" : "none";
    spread.style.zIndex = "";
  });
}

function nextSpread() {
  if (currentSpread < spreads.length - 1 && !isTurning) {
    isTurning = true;

    const current = spreads[currentSpread];
    const next = spreads[currentSpread + 1];
    const rightPage = current.querySelector(".right");

    next.style.display = "flex";
    next.style.zIndex = "1";
    current.style.zIndex = "2";

    rightPage.classList.add("turning");

    setTimeout(() => {
      rightPage.classList.remove("turning");
      currentSpread++;
      showSpread();
      isTurning = false;
    }, 950);
  }
}

function prevSpread() {
  if (currentSpread > 0 && !isTurning) {
    isTurning = true;

    const current = spreads[currentSpread];
    const prev = spreads[currentSpread - 1];
    const leftPage = current.querySelector(".left");

    prev.style.display = "flex";
    prev.style.zIndex = "1";
    current.style.zIndex = "2";

    leftPage.classList.add("turning-back");

    setTimeout(() => {
      leftPage.classList.remove("turning-back");
      currentSpread--;
      showSpread();
      isTurning = false;
    }, 950);
  }
}

function fillCV() {
  setText("cv-name", "name");
  setText("cv-job", "job");
  setText("cv-about", "about");
  setText("cv-education", "education");
  setText("cv-experience", "experience");
  setText("cv-project", "project");
  setText("cv-email", "email");
  setText("cv-phone", "phone");

  const photo = document.getElementById("cv-photo");

  if (photo) {
    photo.src = localStorage.getItem("photo") || "";
  }

  fillList("cv-skills", "skills", "skill");
  fillList("cv-services", "services", "card");
  fillSocialLinks();
  fillProjectImage();
}

function setText(id, key) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = localStorage.getItem(key) || "";
  }
}

function fillSocialLinks() {
  const box = document.getElementById("social-links");

  if (!box) {
    return;
  }

  const socials = [
    { key: "facebook", icon: "fa-brands fa-facebook-f" },
    { key: "instagram", icon: "fa-brands fa-instagram" },
    { key: "linkedin", icon: "fa-brands fa-linkedin-in" },
    { key: "github", icon: "fa-brands fa-github" },
  ];

  box.innerHTML = "";

  socials.forEach((social) => {
    const link = localStorage.getItem(social.key);

    if (link) {
      const a = document.createElement("a");

      a.href = link;
      a.target = "_blank";
      a.innerHTML = `<i class="${social.icon}"></i>`;

      box.appendChild(a);
    }
  });
}

function fillList(id, key, className) {
  const box = document.getElementById(id);

  if (!box) {
    return;
  }

  const icons = {
    html: "fa-brands fa-html5",
    html5: "fa-brands fa-html5",
    css: "fa-brands fa-css3-alt",
    css3: "fa-brands fa-css3-alt",
    javascript: "fa-brands fa-js",
    js: "fa-brands fa-js",
    vue: "fa-brands fa-vuejs",
    "vue.js": "fa-brands fa-vuejs",
    react: "fa-brands fa-react",
    angular: "fa-brands fa-angular",
    bootstrap: "fa-brands fa-bootstrap",
    php: "fa-brands fa-php",
    python: "fa-brands fa-python",
    java: "fa-brands fa-java",
    node: "fa-brands fa-node-js",
    github: "fa-brands fa-github",
    git: "fa-brands fa-git-alt",

    web: "fa-solid fa-globe",
    website: "fa-solid fa-globe",
    "web development": "fa-solid fa-code",
    frontend: "fa-solid fa-laptop-code",
    backend: "fa-solid fa-server",
    programming: "fa-solid fa-code",
    "mobile app": "fa-solid fa-mobile-screen",

    design: "fa-solid fa-palette",
    "graphic design": "fa-solid fa-pen-nib",
    "ui ux": "fa-solid fa-object-group",
    figma: "fa-brands fa-figma",
    "video editing": "fa-solid fa-video",
    photography: "fa-solid fa-camera",

    marketing: "fa-solid fa-chart-line",
    "digital marketing": "fa-solid fa-chart-line",
    seo: "fa-solid fa-magnifying-glass-chart",
    "social media": "fa-solid fa-hashtag",
    "content writing": "fa-solid fa-pen",

    education: "fa-solid fa-graduation-cap",
    teacher: "fa-solid fa-chalkboard-user",
    translation: "fa-solid fa-language",

    finance: "fa-solid fa-coins",
    accounting: "fa-solid fa-calculator",
    management: "fa-solid fa-briefcase",

    engineering: "fa-solid fa-helmet-safety",
    "civil engineering": "fa-solid fa-road",
    "electrical engineering": "fa-solid fa-bolt",

    medical: "fa-solid fa-user-doctor",
    doctor: "fa-solid fa-user-doctor",
    nursing: "fa-solid fa-kit-medical",

    برمجة: "fa-solid fa-code",
    "تطوير ويب": "fa-solid fa-code",
    موقع: "fa-solid fa-globe",
    تصميم: "fa-solid fa-palette",
    "تصميم جرافيك": "fa-solid fa-pen-nib",
    "تصميم واجهات": "fa-solid fa-object-group",
    تصوير: "fa-solid fa-camera",
    مونتاج: "fa-solid fa-video",
    تسويق: "fa-solid fa-chart-line",
    "تسويق رقمي": "fa-solid fa-chart-line",
    سيو: "fa-solid fa-magnifying-glass-chart",
    "كتابة محتوى": "fa-solid fa-pen",
    تعليم: "fa-solid fa-graduation-cap",
    تدريس: "fa-solid fa-chalkboard-user",
    ترجمة: "fa-solid fa-language",
    إدارة: "fa-solid fa-briefcase",
    "إدارة مشاريع": "fa-solid fa-diagram-project",
    محاسبة: "fa-solid fa-calculator",
    هندسة: "fa-solid fa-helmet-safety",
    "هندسة مدنية": "fa-solid fa-road",
    "هندسة كهربائية": "fa-solid fa-bolt",
    طب: "fa-solid fa-user-doctor",
    صيدلة: "fa-solid fa-prescription-bottle-medical",
    قانون: "fa-solid fa-scale-balanced",
    رياضة: "fa-solid fa-dumbbell",
    طبخ: "fa-solid fa-utensils",
  };

  box.innerHTML = "";

  const items = (localStorage.getItem(key) || "").split(",");

  items.forEach((item) => {
    item = item.trim();

    if (!item) {
      return;
    }

    const icon = icons[item.toLowerCase()] || "fa-solid fa-star";
    const div = document.createElement("div");

    div.className = className;

    div.innerHTML = `
            <i class="${icon} service-icon"></i>
            <h4>${item}</h4>
            <button>Read More</button>
        `;

    box.appendChild(div);
  });
}

fillCV();
showSpread();

function fillProjectImage() {
  const box = document.getElementById("project-img");
  const image = localStorage.getItem("projectImage");

  if (!box || !image) {
    return;
  }

  box.innerHTML = `<img src="${image}" alt="Project Image">`;
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("portrait", "px", "a4");
  const oldSpread = currentSpread;

  for (let i = 0; i < spreads.length; i++) {
    currentSpread = i;
    showSpread();

    await new Promise((resolve) => setTimeout(resolve, 300));

    const pages = spreads[i].querySelectorAll(".page");

    for (let j = 0; j < pages.length; j++) {
      const canvas = await html2canvas(pages[j], {
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");

      const pageWidth = pdf.internal.pageSize.getWidth();

      const pageHeight = pdf.internal.pageSize.getHeight();

      if (i > 0 || j > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    }
  }

  currentSpread = oldSpread;
  showSpread();

  const userName = (localStorage.getItem("name") || "My-CV")
    .trim()
    .replace(/\s+/g, "-");

  pdf.save(`${userName}-CV-Book.pdf`);
}
