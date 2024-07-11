import { fetchDataProposed } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event triggered. Fetching data...');

    const items = await fetchDataProposed();

    if (!items) {
        console.error('No items returned from fetchData.');
        return;
    }

    console.log('Items fetched:', items);

    // Filter items to only include those where spno is not "No Data"
    const filteredItems = items.filter(item => item.spno !== "No Data");

    console.log('Filtered items:', filteredItems);

    displayApproved(filteredItems);

    function displayApproved(items) {
        const container = document.getElementById("app-container");
        if (!container) {
            console.error('Card container not found');
            return;
        }
        console.log('Card container found:', container);

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'details-card';
            if (index === 0) card.classList.add('active'); // Show the first card initially
            card.innerHTML = `
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
            `;
            console.log('Created card:', card);
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
        console.log('Cards found:', cards);

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