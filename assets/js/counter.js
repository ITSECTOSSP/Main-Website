document.addEventListener("DOMContentLoaded", () => {
    const viewCountElement = document.getElementById("viewCount");

    // Check if 'viewCount' is in localStorage
    if (localStorage.getItem("viewCount")) {
        // Parse the value to an integer and increment by 1
        let viewCount = parseInt(localStorage.getItem("viewCount")) + 1;
        localStorage.setItem("viewCount", viewCount);
        viewCountElement.textContent = viewCount;
    } else {
        // If 'viewCount' is not in localStorage, set it to 1
        localStorage.setItem("viewCount", 1);
        viewCountElement.textContent = 1;
    }
});