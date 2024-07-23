import { fetchDataProposed } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event triggered. Fetching data...');

    const items = await fetchDataProposed();

    if (!items) {
        console.error('No items returned from fetchData.');
        return;
    }

    // Filter items to only include those where spno is not "No Data"
    const filteredItems = items.filter(item => item.spno !== "No Data");

    displayApproved(filteredItems);

    function displayApproved(items) {
        const container = document.getElementById("app-container");
        if (!container) {
            console.error('Card container not found');
            return;
        }

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'details-card';
            if (index === 0) card.classList.add('active'); // Show the first card initially
            card.innerHTML = `
           <a href="resourceapp.html?spno=${encodeURIComponent(item.spno)}&year=${item.Year}&proposed=${encodeURIComponent(item.proposed)}&title=${encodeURIComponent(item.Title)}&introducer=${encodeURIComponent(item.introducer)}&frDate=${encodeURIComponent(item.FrDate)}&frReading=${encodeURIComponent(item.FrReading)}&srDate=${encodeURIComponent(item.ScndDate)}&srReading=${encodeURIComponent(item.ScndReading)}&trDate=${encodeURIComponent(item.ThDate)}&trReading=${encodeURIComponent(item.ThReading)} &trReading=${encodeURIComponent(item.ThReading)}&pdflink=${encodeURIComponent(item.Pdflink)}">
                <div class="art-card-container">
                    <div class="card-container-inner">
                        <h1 id="sp-num" class="ban-animation">${item.spno}</h1>
                        <hr />
                        <h2 id="propo-num" class="ban-animation">${item.proposed}</h2>
                        <span>Introducer</span>
                        <span id="introducer-name" class="ban-animation">${item.introducer}</span>
                    </div>
                </div>
                <div class="art-card-div">
                    <span>Legislation Spotlight</span>
                </div>
                <div class="date-card ban-animation">
                    <span id="date-app">Date Approved: ${formatDate(item.postingd)}</span>
                </div>
                <div class="title-card">
                    <span>Title</span>
                    <p id="title-meas" class="ban-animation">
                        <span style="color: rgb(0, 0, 0);">${item.title}</span><br /><br />
                    </p>
                </div>
                </a>
            `;
            container.appendChild(card);
        });

        console.log('All cards created');

        // Cycle through the cards
        cycleCards();
    }

    function cycleCards() {
        const cards = document.querySelectorAll('.details-card');
        if (!cards.length) {
            console.error('No cards found to cycle through');
            return;
        }

        let currentIndex = 0;
        setInterval(() => {
            cards[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % cards.length;
            cards[currentIndex].classList.add('active');
        }, 5000); // Change the interval to 5000ms (5 seconds)
    }

    function formatDate(dateStr) {
        if (!dateStr) return "No Date";
        const date = new Date(dateStr);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
});