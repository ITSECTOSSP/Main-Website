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

const viewbox = document.querySelectorAll('.personnel-content');
viewbox.forEach(div => {
  observer.observe(div);
});

let slideIndex = 1;
let slideInterval;

// Show slides function
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("personnel-card-child");
  const dots = document.getElementsByClassName("dot-cards");
  const secondarySlides = document.getElementsByClassName("div-personnel-parent");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  for (i = 0; i < secondarySlides.length; i++) {
    secondarySlides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  secondarySlides[slideIndex - 1].style.display = "block";

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
  slideInterval = setInterval(autoShowSlides, 10000000); // Change image every 10 seconds
}

// Initial setup
showSlides(slideIndex);
slideInterval = setInterval(autoShowSlides, 10000000); // Change image every 10 seconds

document.addEventListener('DOMContentLoaded', function() {
  var parentDivs = document.querySelectorAll('.section-wrapper');
  
  parentDivs.forEach(function(parentDiv) {
      parentDiv.addEventListener('click', function() {
          var childDiv = parentDiv.querySelector('.section-text');
          
          if (childDiv.classList.contains('unexpanded-inf')) {
              childDiv.classList.remove('unexpanded-inf');
              childDiv.classList.add('expanded-inf');
              parentDiv.classList.remove('parent-unex');
              parentDiv.classList.add('parent-expa');
          } else {
              childDiv.classList.remove('expanded-inf');
              childDiv.classList.add('unexpanded-inf');
              parentDiv.classList.remove('parent-expa');
              parentDiv.classList.add('parent-unex');
          }
      });
  });
});
