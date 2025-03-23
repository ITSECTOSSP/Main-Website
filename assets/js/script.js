document.addEventListener("DOMContentLoaded", () => {
    // View count functionality
    const viewCountElement = document.getElementById("viewCount");
    if (localStorage.getItem("viewCount")) {
        let viewCount = parseInt(localStorage.getItem("viewCount")) + 1;
        localStorage.setItem("viewCount", viewCount);
        viewCountElement.textContent = viewCount;
    } else {
        localStorage.setItem("viewCount", 1);
        viewCountElement.textContent = 1;
    }

    // Date and time update functionality
    function updateDateTime() {
        const now = new Date();

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = days[now.getDay()];
        
        const day = String(now.getDate()).padStart(2, '0');
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const formattedHours = String(hours).padStart(2, '0');
        
        const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
        const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
        
        document.getElementById('datetime').textContent = `${formattedDate} ${formattedTime}`;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Set href for districtI link
    var districtILink = document.getElementById('dis1');
    var encodedDistrictI = encodeURIComponent('DISTRICT I');
    districtILink.href = 'councilors.html?district=' + encodedDistrictI;

    // Set href for districtII link
    var districtILink = document.getElementById('dis2');
    var encodedDistrictII = encodeURIComponent('DISTRICT II');
    districtILink.href = 'councilors.html?district=' + encodedDistrictII;

    // Set href for districtIII link
    var districtILink = document.getElementById('dis3');
    var encodedDistrictIII = encodeURIComponent('DISTRICT III');
    districtILink.href = 'councilors.html?district=' + encodedDistrictIII;

    // Set href for districtIV link
    var districtILink = document.getElementById('dis4');
    var encodedDistrictIV = encodeURIComponent('DISTRICT IV');
    districtILink.href = 'councilors.html?district=' + encodedDistrictIV;

    // Set href for districtV link
    var districtILink = document.getElementById('dis5');
    var encodedDistrictV = encodeURIComponent('DISTRICT V');
    districtILink.href = 'councilors.html?district=' + encodedDistrictV;

    // Set href for districtVI link
    var districtILink = document.getElementById('dis6');
    var encodedDistrictVI = encodeURIComponent('DISTRICT VI');
    districtILink.href = 'councilors.html?district=' + encodedDistrictVI;

    // Set href for districtEXOFF link
    var districtILink = document.getElementById('exoff');
    var encodedExOff = encodeURIComponent('EX-OFFICIO');
    districtILink.href = 'councilors.html?district=' + encodedExOff;

    // Set href for districtEXOFF link
    var councilILink = document.getElementById('21st-council');
    var encodedCouncil = encodeURIComponent('21ST');
    councilILink.href = 'councilorspred.html?council=' + encodedCouncil;
    
});

// Sticky navbar and scroll to top button functionality
window.onscroll = function() {
    myFunction();
    scrollFunction();
};

var navbar = document.getElementById("nav-nav-a");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

let mybutton = document.getElementById("scroll-up");

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
