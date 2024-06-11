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

//article-cards
document.addEventListener("DOMContentLoaded", () => {
  const containerCard = document.getElementById("containerCard");
  const artCards = Array.from(containerCard.children);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function updateCards() {
      let visibleCards;
      if (window.innerWidth <= 600) {
          visibleCards = 1; // Mobile view
      } else {
          visibleCards = 3; // Desktop view
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
      let visibleCards = window.innerWidth <= 600 ? 1 : 3;
      if (currentIndex + visibleCards < artCards.length) {
          currentIndex++;
          updateCards();
      }
  });

  window.addEventListener("resize", handleResize);

  // Initial display
  updateCards();
});
