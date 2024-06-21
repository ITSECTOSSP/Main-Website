// Get the modals
var modals = {
  "dept-head-id": document.getElementById("dept-head"),
  "exe-ass-id": document.getElementById("exe-ass"),
  "asst-sec-id": document.getElementById("asst-sec"),
  "admin-div-id": document.getElementById("admin-div"),
  "jour-min-div-id": document.getElementById("jour-min-div"),
  "leg-serv-div-id": document.getElementById("leg-serv-div"),
  "rec-corr-id": document.getElementById("rec-corr"),
  "fin-acc-id": document.getElementById("fin-acc"),
  "prnsl-id": document.getElementById("prnsl"),
  "gen-srv-id": document.getElementById("gen-srv"),
  "journ-tr-id": document.getElementById("journ-tr"),
  "mins-id": document.getElementById("mins"),
  "comm-aff-id": document.getElementById("comm-aff"),
  "spc-comm-id": document.getElementById("spc-comm"),
  "ord-res-id": document.getElementById("ord-res"),
  "research-id": document.getElementById("research"),
  "agnd-brf-id": document.getElementById("agnd-brf"),
  "refe-archv-id": document.getElementById("refe-archv")
};

// Get the buttons that open the modals
var buttons = {
  "dept-head-id": document.getElementById("popup-dept-head"),
 "exe-ass-id": document.getElementById("popup-exe-ass"),
  "asst-sec-id": document.getElementById("popup-asst-sec"),
  "admin-div-id": document.getElementById("popup-admin-div"),
  "jour-min-div-id": document.getElementById("popup-jour-min-div"),
  "leg-serv-div-id": document.getElementById("popup-leg-serv-div"),
  "rec-corr-id": document.getElementById("popup-rec-corr"),
  "fin-acc-id": document.getElementById("popup-fin-acc"),
  "prnsl-id": document.getElementById("popup-prnsl"),
  "gen-srv-id": document.getElementById("popup-gen-srv"),
  "journ-tr-id": document.getElementById("popup-journ-tr"),
  "mins-id": document.getElementById("popup-mins"),
  "comm-aff-id": document.getElementById("popup-comm-aff"),
  "spc-comm-id": document.getElementById("popup-spc-comm"),
  "ord-res-id": document.getElementById("popup-ord-res"),
  "research-id": document.getElementById("popup-research"),
  "agnd-brf-id": document.getElementById("popup-agnd-brf"),
  "refe-archv-id": document.getElementById("popup-refe-archv")
};

// Get all <span> elements that close the modals
var spans = document.getElementsByClassName("close");

// When the user clicks a button, open the corresponding modal
for (const key in buttons) {
  buttons[key].onclick = function() {
    modals[key].style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = function() {
    for (const key in modals) {
      modals[key].style.display = "none";
    }
  }
}

// When the user clicks anywhere outside of a modal, close it
window.onclick = function(event) {
  for (const key in modals) {
    if (event.target == modals[key]) {
      modals[key].style.display = "none";
    }
  }
}


/*
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

*/
