
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
// const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalWork = document.getElementById("modalWork");
const liveLink = document.getElementById("liveLink");
const githubLink = document.getElementById("githubLink");
const closeBtn = document.querySelector(".close");

portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    modal.classList.add("active");

    modalImg.src = item.dataset.img || "";
    modalTitle.textContent = item.dataset.title || "";
    modalDesc.textContent = item.dataset.desc || "";
    modalTech.textContent = item.dataset.tech || "";

    liveLink.href = item.dataset.live || "#";
    githubLink.href = item.dataset.github || "#";

    modalWork.innerHTML = "";
    if (item.dataset.work) {
      item.dataset.work.split("|").forEach((point) => {
        const li = document.createElement("li");
        li.textContent = point;
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
  }, 1200);
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
