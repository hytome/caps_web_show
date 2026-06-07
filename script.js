const slides = Array.from(document.querySelectorAll(".slide"));
const progressBar = document.getElementById("progressBar");
const slideCount = document.getElementById("slideCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;

function activeSlide() {
  return slides[index];
}

function resetFragments(slide) {
  if (slide?.dataset.fragment === "market-year") {
    slide.classList.remove("is-2026");
  }
  if (slide?.dataset.fragment === "app-focus") {
    slide.dataset.appStep = "garmin";
    slide.classList.add("is-focus-garmin");
    slide.classList.remove("is-focus-strava", "is-focus-nrc");
  }
  if (slide?.dataset.fragment === "injury-coach") {
    slide.classList.remove("is-care");
  }
}

function showSlide(nextIndex) {
  index = Math.max(0, Math.min(slides.length - 1, nextIndex));

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
    if (slideIndex !== index) resetFragments(slide);
  });

  const progress = ((index + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
  slideCount.textContent = `${index + 1} / ${slides.length}`;
}

function next() {
  const slide = activeSlide();
  if (slide?.dataset.fragment === "market-year" && !slide.classList.contains("is-2026")) {
    slide.classList.add("is-2026");
    return;
  }
  if (slide?.dataset.fragment === "app-focus" && slide.dataset.appStep === "garmin") {
    slide.dataset.appStep = "strava";
    slide.classList.remove("is-focus-garmin");
    slide.classList.add("is-focus-strava");
    return;
  }
  if (slide?.dataset.fragment === "app-focus" && slide.dataset.appStep === "strava") {
    slide.dataset.appStep = "nrc";
    slide.classList.remove("is-focus-strava");
    slide.classList.add("is-focus-nrc");
    return;
  }
  if (slide?.dataset.fragment === "injury-coach" && !slide.classList.contains("is-care")) {
    slide.classList.add("is-care");
    return;
  }
  showSlide(index + 1);
}

function prev() {
  const slide = activeSlide();
  if (slide?.dataset.fragment === "market-year" && slide.classList.contains("is-2026")) {
    slide.classList.remove("is-2026");
    return;
  }
  if (slide?.dataset.fragment === "app-focus" && slide.dataset.appStep === "nrc") {
    slide.dataset.appStep = "strava";
    slide.classList.add("is-focus-strava");
    slide.classList.remove("is-focus-nrc");
    return;
  }
  if (slide?.dataset.fragment === "app-focus" && slide.dataset.appStep === "strava") {
    slide.dataset.appStep = "garmin";
    slide.classList.add("is-focus-garmin");
    slide.classList.remove("is-focus-strava");
    return;
  }
  if (slide?.dataset.fragment === "injury-coach" && slide.classList.contains("is-care")) {
    slide.classList.remove("is-care");
    return;
  }
  showSlide(index - 1);
}

document.addEventListener("keydown", (event) => {
  const forward = ["ArrowRight", "ArrowDown", " ", "PageDown", "Enter"];
  const backward = ["ArrowLeft", "ArrowUp", "PageUp", "Backspace"];

  if (forward.includes(event.key)) {
    event.preventDefault();
    next();
  }

  if (backward.includes(event.key)) {
    event.preventDefault();
    prev();
  }

  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
});

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);

let touchStartX = 0;
document.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(delta) < 48) return;
  if (delta < 0) next();
  if (delta > 0) prev();
});

showSlide(0);
