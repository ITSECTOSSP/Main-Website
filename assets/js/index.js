  //Animation on page load of index.html
  const observ = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
      console.log(entry)

      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      } 

    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observ.observe(el));


  // Loop slides after the last slide
const observer = new IntersectionObserver(entries => {
  // Loop over the entries
  entries.forEach(entry => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class
      entry.target.classList.add('ban-animation');
    }
  });
});

const viewbox = document.querySelectorAll('.banner-content');
viewbox.forEach(div => {
  observer.observe(div);
});

let slideIndex = 1;
let slideInterval;

// Show slides function
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("ban-parent");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  resetSlideTimer();
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Automatic slide show
function autoShowSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

// Reset the slide timer
function resetSlideTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(autoShowSlides, 60000); // Change image every 30 seconds
}

// Initial setup
showSlides(slideIndex);
slideInterval = setInterval(autoShowSlides, 60000); // Change image every 30 seconds

document.addEventListener("DOMContentLoaded", () => {
  const containerCard = document.getElementById("containerCard");
  const artCards = Array.from(containerCard.children);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function updateCards() {
      let visibleCards;
      if (window.innerWidth <= 700) {
          visibleCards = 1; // Mobile view
      } else if (window.innerWidth <= 900) {
          visibleCards = 2; // Mobile view
      } else if (window.innerWidth <= 1000) {
          visibleCards = 3; // Mobile view
      } else {
          visibleCards = 4; // Desktop view
      }

      artCards.forEach((card, index) => {
          if (index >= currentIndex && index < currentIndex + visibleCards) {
              card.style.display = "flex";
          } else {
              card.style.display = "none";
          }
      });

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex + visibleCards >= artCards.length;
  }

  function handleResize() {
      updateCards();
  }

  prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateCards();
      }
  });

  nextBtn.addEventListener("click", () => {
      let visibleCards;
      if (window.innerWidth <= 600) {
          visibleCards = 1;
      } else if (window.innerWidth <= 800) {
          visibleCards = 2;
      } else if (window.innerWidth <= 900) {
          visibleCards = 3;
      } else {
          visibleCards = 4;
      }

      if (currentIndex + visibleCards < artCards.length) {
          currentIndex++;
          updateCards();
      }
  });

  window.addEventListener("resize", handleResize);

  // Initial display
  updateCards();
});

// About Link
document.addEventListener("DOMContentLoaded", () => {
  const servicesWrapper = document.querySelector('.services-wrapper');
  const servicesContents = Array.from(servicesWrapper.querySelectorAll('.services-content'));

  let currentIndex = 0;

  function showServiceContent(index) {
      servicesContents.forEach((content, i) => {
          content.style.display = i === index ? 'block' : 'none';
      });
  }

  function startLoop() {
      showServiceContent(currentIndex);
      setInterval(() => {
          currentIndex = (currentIndex + 1) % servicesContents.length;
          showServiceContent(currentIndex);
      }, 10000);
  }

  // Initialize the loop
  startLoop();
});


document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.col-f');
  const logos = Array.from(container.querySelectorAll('.logo-set'));
  const totalLogos = logos.length;

  let currentIndex = 0;
  let visibleLogos = totalLogos;
  let cycleInterval;

  function createNavCircles() {
      const navContainer = document.createElement('div');
      navContainer.id = 'navCircles';
      navContainer.classList.add('nav-circles-container');

      for (let i = 0; i < totalLogos; i++) {
          const circle = document.createElement('span');
          circle.classList.add('nav-circle');
          circle.dataset.index = i;
          circle.addEventListener('click', () => {
              currentIndex = parseInt(circle.dataset.index);
              updateLogos();
          });
          navContainer.appendChild(circle);
      }

      container.parentElement.appendChild(navContainer);
  }

  function updateNavCircles() {
      const circles = document.querySelectorAll('.nav-circle');
      circles.forEach((circle, index) => {
          circle.classList.toggle('active', index === currentIndex);
      });
  }

  function updateLogos() {
      logos.forEach((logo, index) => {
          logo.style.display = 'none';
      });

      for (let i = 0; i < visibleLogos; i++) {
          const index = (currentIndex + i) % totalLogos;
          logos[index].style.display = 'inline';
      }

      updateNavCircles();
  }

  function handleResize() {
      const width = window.innerWidth;

      if (width <= 430) {
          visibleLogos = 1;
      } 
      else if (width <= 700) {
        visibleLogos = 2;
      }
      else if (width <= 900) {
        visibleLogos = 3;
    }
      else if (width <= 1260) {
          visibleLogos = 4;
      } else {
          visibleLogos = totalLogos;
      }

      if (width <= 1250) {
          if (!cycleInterval) {
              cycleInterval = setInterval(() => {
                  currentIndex = (currentIndex + 1) % totalLogos;
                  updateLogos();
              }, 20000);
          }
      } else {
          if (cycleInterval) {
              clearInterval(cycleInterval);
              cycleInterval = null;
          }
      }

      updateLogos();
  }

  createNavCircles();
  handleResize();
  window.addEventListener('resize', handleResize);
});
