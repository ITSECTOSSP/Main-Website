// Get the modals
var modals = {
  "isscertap": document.getElementById("popup-isscertap"),
  "phtctc": document.getElementById("popup-phtctc"),
  "ctcrecf": document.getElementById("popup-ctcrecf")
};

// Get the buttons that open the modals
var buttons = {
  "isscertap": document.getElementById("issapp-popup"),
  "phtctc": document.getElementById("phtctc-popup"),
  "ctcrecf": document.getElementById("ctcrecf-popup")
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
