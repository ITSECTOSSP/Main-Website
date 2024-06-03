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
  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("ban-parent");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

  let slideIndexing = 0;
showSliders();

  function showSliders() {
    let i;
    let slides = document.getElementsByClassName("ban-parent");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndexing++;
    if (slideIndexing > slides.length) {slideIndexing = 1}
    slides[slideIndexing-1].style.display = "block";
    setTimeout(showSliders, 10000); // Change image every 2 seconds
  }

  const observ = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
      console.log(entry)

      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }

    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observ.observe(el));