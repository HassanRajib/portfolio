
// projects
// FILTER LOGIC
const filterButtons = document.querySelectorAll(".button-group button");
const portfolioItems = document.querySelectorAll(".portfolio-item");

// FILTER
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioItems.forEach((item) => {
      item.classList.toggle(
        "hide",
        filter !== "*" && !item.classList.contains(filter)
      );
    });
  });
});

// MODAL
const modal = document.getElementById("portfolioModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalWork = document.getElementById("modalWork");
const liveLink = document.getElementById("liveLink");
const githubLink = document.getElementById("githubLink");
const closeBtn = document.querySelector(".close");

document.querySelector(".modal-content").addEventListener("click", (e) => {
  e.stopPropagation();
});

portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    modal.classList.add("active");
    modalTitle.textContent = item.dataset.title || "";
    modalDesc.textContent = item.dataset.desc || "";
    modalTech.textContent = item.dataset.tech || "";

    // Live link (always visible)
    liveLink.href = item.dataset.live || "#";
    liveLink.style.display = item.dataset.live ? "inline-block" : "none";
    liveLink.addEventListener("click", (e) => e.stopPropagation());

    // GitHub link (ONLY show if exists)
    if (item.dataset.github) {
      githubLink.href = item.dataset.github;
      githubLink.style.display = "inline-block";
    } else {
      githubLink.style.display = "none";
    }
    githubLink.addEventListener("click", (e) => e.stopPropagation());

    modal.addEventListener("click", () => {
  modal.classList.remove("active");
});

    // Work list
    modalWork.innerHTML = "";
    if (item.dataset.work) {
      item.dataset.work.split("|").forEach((point) => {
        const li = document.createElement("li");
        li.textContent = point.trim();
        modalWork.appendChild(li);
      });
    }
  });
});

closeBtn.onclick = () => modal.classList.remove("active");
modal.onclick = (e) => e.target === modal && modal.classList.remove("active");


// preloader function
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");
  }, 1000);
});

// back to top function
document.addEventListener("DOMContentLoaded", () => {
  const progressWrap = document.getElementById("scrollUp");
  const progressPath = progressWrap.querySelector("path");

  const pathLength = progressPath.getTotalLength();

  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = pathLength - (scrollTop * pathLength) / docHeight;

    progressPath.style.strokeDashoffset = progress;

    progressWrap.classList.toggle("active", scrollTop > 100);
  };

  window.addEventListener("scroll", updateProgress);
  updateProgress();

  progressWrap.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// carousel

const track = document.querySelector(".skills-track");

track.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

track.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});

// test

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

const resizeCanvas = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "アカサタナハマヤラワ0123456789";
const fontSize = 16;
let columns;
let drops;

const initMatrix = () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
};

initMatrix();

const drawMatrix = () => {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
};

drawMatrix();

