const counters = document.querySelectorAll(".number");

const runCounter = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    let current = 0;

    const increment = () => {
      if (current < target) {
        current++;
        counter.textContent = current;
        setTimeout(increment, 120);
      } else {
        counter.textContent = target;
      }
    };

    increment();
  });
};

window.addEventListener("load", runCounter);

// projects
// FILTER LOGIC
const filterButtons = document.querySelectorAll(".button-group button");
const portfolioItems = document.querySelectorAll(".portfolio-item");

// FILTER
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
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

portfolioItems.forEach(item => {
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
      item.dataset.work.split("|").forEach(point => {
        const li = document.createElement("li");
        li.textContent = point;
        modalWork.appendChild(li);
      });
    }
  });
});

closeBtn.onclick = () => modal.classList.remove("active");
modal.onclick = e => e.target === modal && modal.classList.remove("active");


// preloader function
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 1000);
  }, 1200);
});

// back to top function
document.addEventListener("DOMContentLoaded", () => {
  const progressWrap = document.getElementById("scrollUp");
  const progressPath = progressWrap.querySelector("path");

  const pathLength = progressPath.getTotalLength();

  // Initialize stroke
  progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.style.transition = "stroke-dashoffset 0.1s linear";

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = pathLength - (scrollTop * pathLength) / docHeight;

    progressPath.style.strokeDashoffset = progress;

    // Toggle visibility
    if (scrollTop > 50) {
      progressWrap.classList.add("active");
    } else {
      progressWrap.classList.remove("active");
    }
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress);

  // Scroll to top on click
  progressWrap.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
