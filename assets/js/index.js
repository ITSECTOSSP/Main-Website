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
      if (window.innerWidth <= 800) {
          visibleCards = 1; // Mobile view
      } else if (window.innerWidth <= 1200) {
          visibleCards = 2; // Mobile view
      } else if (window.innerWidth <= 1600) {
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
      if (window.innerWidth <= 800) {
          visibleCards = 1;
      } else if (window.innerWidth <= 1200) {
          visibleCards = 2;
      } else if (window.innerWidth <= 1600) {
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

// Logo
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


//Calendar
var calendar = document.getElementById("calendar-table");
var gridTable = document.getElementById("table-body");
var currentDate = new Date();
var selectedDate = currentDate;
var selectedDayBlock = null;
var globalEventObj = {};

var sidebar = document.getElementById("sidebar");

function createCalendar(date, side) {
   var currentDate = date;
   var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

   var monthTitle = document.getElementById("month-name");
   var monthName = currentDate.toLocaleString("en-US", {
      month: "long"
   });
   var yearNum = currentDate.toLocaleString("en-US", {
      year: "numeric"
   });
   monthTitle.innerHTML = `${monthName} ${yearNum}`;

   if (side == "left") {
      gridTable.className = "animated fadeOutRight";
   } else {
      gridTable.className = "animated fadeOutLeft";
   }

   setTimeout(() => {
      gridTable.innerHTML = " ";

      var newTr = document.createElement("div");
      newTr.className = "row";
      var currentTr = gridTable.appendChild(newTr);

      for (let i = 1; i < (startDate.getDay() || 7); i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      lastDay = lastDay.getDate();

      for (let i = 1; i <= lastDay; i++) {
         if (currentTr.children.length >= 7) {
            currentTr = gridTable.appendChild(addNewRow());
         }
         let currentDay = document.createElement("div");
         currentDay.className = "col";
         if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

            document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
               month: "long",
               day: "numeric",
               year: "numeric"
            });

            selectedDayBlock = currentDay;
            setTimeout(() => {
               currentDay.classList.add("blue");
               currentDay.classList.add("lighten-3");
            }, 900);
         }
         currentDay.innerHTML = i;

         //show marks
         if (globalEventObj[new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()]) {
            let eventMark = document.createElement("div");
            eventMark.className = "day-mark";
            currentDay.appendChild(eventMark);
         }

         currentTr.appendChild(currentDay);
      }

      for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      if (side == "left") {
         gridTable.className = "animated fadeInLeft";
      } else {
         gridTable.className = "animated fadeInRight";
      }

      function addNewRow() {
         let node = document.createElement("div");
         node.className = "row";
         return node;
      }

   }, !side ? 0 : 270);
}

createCalendar(currentDate);

var todayDayName = document.getElementById("todayDayName");
todayDayName.innerHTML = "Today is " + currentDate.toLocaleString("en-US", {
   weekday: "long",
   day: "numeric",
   month: "short"
});

var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

prevButton.onclick = function changeMonthPrev() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
   createCalendar(currentDate, "left");
}
nextButton.onclick = function changeMonthNext() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
   createCalendar(currentDate, "right");
}

function addEvent(title, desc) {
   if (!globalEventObj[selectedDate.toDateString()]) {
      globalEventObj[selectedDate.toDateString()] = {};
   }
   globalEventObj[selectedDate.toDateString()][title] = desc;
}

function showEvents() {
   let sidebarEvents = document.getElementById("sidebarEvents");
   let objWithDate = globalEventObj[selectedDate.toDateString()];

   sidebarEvents.innerHTML = "";

   if (objWithDate) {
      let eventsCount = 0;
      for (key in globalEventObj[selectedDate.toDateString()]) {
         let eventContainer = document.createElement("div");
         eventContainer.className = "eventCard";

         let eventHeader = document.createElement("div");
         eventHeader.className = "eventCard-header";

         let eventDescription = document.createElement("div");
         eventDescription.className = "eventCard-description";

         eventHeader.appendChild(document.createTextNode(key));
         eventContainer.appendChild(eventHeader);

         eventDescription.appendChild(document.createTextNode(objWithDate[key]));
         eventContainer.appendChild(eventDescription);

         let markWrapper = document.createElement("div");
         markWrapper.className = "eventCard-mark-wrapper";
         let mark = document.createElement("div");
         mark.classList = "eventCard-mark";
         markWrapper.appendChild(mark);
         eventContainer.appendChild(markWrapper);

         sidebarEvents.appendChild(eventContainer);

         eventsCount++;
      }
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = `${eventsCount} events now`;
   } else {
      let emptyMessage = document.createElement("div");
      emptyMessage.className = "empty-message";
      emptyMessage.innerHTML = "Sorry, no events to selected date";
      sidebarEvents.appendChild(emptyMessage);
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = "No events now";
   }
}

gridTable.onclick = function (e) {

   if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
      return;
   }

   if (selectedDayBlock) {
      if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
         selectedDayBlock.classList.remove("blue");
         selectedDayBlock.classList.remove("lighten-3");
      }
   }
   selectedDayBlock = e.target;
   selectedDayBlock.classList.add("blue");
   selectedDayBlock.classList.add("lighten-3");

   selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));

   showEvents();

   document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
   });

}

var changeFormButton = document.getElementById("changeFormButton");
var addForm = document.getElementById("addForm");
changeFormButton.onclick = function (e) {
   addForm.style.top = 0;
}

var cancelAdd = document.getElementById("cancelAdd");
cancelAdd.onclick = function (e) {
   addForm.style.top = "100%";
   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }
}

var addEventButton = document.getElementById("addEventButton");
addEventButton.onclick = function (e) {
   let title = document.getElementById("eventTitleInput").value.trim();
   let desc = document.getElementById("eventDescInput").value.trim();

   if (!title || !desc) {
      document.getElementById("eventTitleInput").value = "";
      document.getElementById("eventDescInput").value = "";
      let labels = addForm.getElementsByTagName("label");
      for (let i = 0; i < labels.length; i++) {
         labels[i].className = "";
      }
      return;
   }

   addEvent(title, desc);
   showEvents();

   if (!selectedDayBlock.querySelector(".day-mark")) {
      selectedDayBlock.appendChild(document.createElement("div")).className = "day-mark";
   }

   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }

}

