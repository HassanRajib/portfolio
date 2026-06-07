gsap.registerPlugin();

const cards = gsap.utils.toArray(".cards li");

let active = 3; // center card

const positions = [
  {
    x: -450,
    scale: 0.35,
    opacity: 0.15,
    zIndex: 1,
    rotateY: 45
  },
  {
    x: -280,
    scale: 0.65,
    opacity: 0.5,
    zIndex: 2,
    rotateY: 25
  },
  {
    x: -150,
    scale: 0.85,
    opacity: 0.8,
    zIndex: 3,
    rotateY: 15
  },
  {
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 5,
    rotateY: 0
  },
  {
    x: 150,
    scale: 0.85,
    opacity: 0.8,
    zIndex: 3,
    rotateY: -15
  },
  {
    x: 280,
    scale: 0.65,
    opacity: 0.5,
    zIndex: 2,
    rotateY: -25
  },
  {
    x: 450,
    scale: 0.35,
    opacity: 0.15,
    zIndex: 1,
    rotateY: -45
  }
];

function updateCarousel() {
  cards.forEach((card, i) => {
    let offset = i - active;

    while (offset < -3) offset += cards.length;
    while (offset > 3) offset -= cards.length;

    let posIndex = offset + 3;

    if (positions[posIndex]) {
      gsap.to(card, {
        duration: 0.8,
        ease: "power3.inOut",
        ...positions[posIndex]
      });
    } else {
      gsap.set(card, {
        opacity: 0,
        scale: 0
      });
    }
  });
}

// function nextCard() {
//   active++;

//   if (active >= cards.length) {
//     active = 0;
//   }

//   updateCarousel();
// }

// function prevCard() {
//   active--;

//   if (active < 0) {
//     active = cards.length - 1;
//   }

//   updateCarousel();
// }

// document.querySelector(".next").addEventListener("click", nextCard);
// document.querySelector(".prev").addEventListener("click", prevCard);

updateCarousel();

// autoplay
gsap.ticker.add(() => {});

setInterval(() => {
  active = (active + 1) % cards.length;
  updateCarousel();
}, 2500);