const circle = document.querySelector('.circle');

document.addEventListener('mousemove', e => {
  circle.style.left = e.pageX + 'px';
  circle.style.top = e.pageY + 'px';
});
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nav = document.querySelector('.slider-nav');
const prevBtn = document.createElement('button');
const nextBtn = document.createElement('button');
let slideWidth = slides[0].clientWidth;
let slideIndex = 0;

// Set up slider navigation
prevBtn.classList.add('prev');
prevBtn.textContent = 'Prev';
nextBtn.classList.add('next');
nextBtn.textContent = 'Next';
nav.appendChild(prevBtn);
nav.appendChild(nextBtn);

// Set up slide positions
slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Handle click on prev button
prevBtn.addEventListener('click', () => {
  if (slideIndex > 0) {
    slideIndex--;
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    setActiveButton();
  }
});

// Handle click on next button
nextBtn.addEventListener('click', () => {
  if (slideIndex < slides.length - 1) {
    slideIndex++;
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    setActiveButton();
  }
});

// Set active button based on current slide
function setActiveButton() {
  const buttons = nav.querySelectorAll('button');
  buttons.forEach((button, index) => {
    if (index === slideIndex) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Handle swipe gesture
let touchStartX = 0;
let touchEndX = 0;
slider.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
slider.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) {
    nextBtn.click();
  } else if (touchStartX - touchEndX < -50
