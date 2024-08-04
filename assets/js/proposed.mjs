import { fetchDataProposed } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event triggered. Fetching data...');

    const items = await fetchDataProposed();

    if (!items) {
        console.error('No items returned from fetchData.');
        return;
    }

    console.log('Data fetched successfully:', items);

    // Sort items by FrDate from new to old
    items.sort((a, b) => {
        if (!a.FrDate || !b.FrDate) return 0; // Handle null or undefined values
        return new Date(b.FrDate) - new Date(a.FrDate);
    });

    const firstReadingList = document.getElementById('first-reading');
    const secondReadingList = document.getElementById('second-reading');
    const thirdReadingList = document.getElementById('third-reading');

    if (!firstReadingList || !secondReadingList || !thirdReadingList) {
        console.error('Element with ID "first-reading", "second-reading", or "third-reading" not found.');
        return;
    }

    let firstReadingCount = 0;
    let secondReadingCount = 0;
    let thirdReadingCount = 0;

    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.proposed;
        a.href = `resource.html?proposed=${encodeURIComponent(item.proposed)}&title=${encodeURIComponent(item.title)}&introducer=${encodeURIComponent(item.introducer)}&frDate=${encodeURIComponent(item.FrDate)}&frReading=${encodeURIComponent(item.FrReading)}&srDate=${encodeURIComponent(item.ScndDate)}&srReading=${encodeURIComponent(item.ScndReading)}&trDate=${encodeURIComponent(item.ThDate)}&trReading=${encodeURIComponent(item.ThReading)}`;
        li.appendChild(a);

        if (firstReadingCount < 10 && item.FrReading !== "No Data" && item.ScndReading === "No Data" && item.ThReading === "No Data") {
            firstReadingList.appendChild(li);
            firstReadingCount++;
        }

        if (secondReadingCount < 10 && item.FrReading !== "No Data" && item.ScndReading !== "No Data" && item.ThReading === "No Data") {
            secondReadingList.appendChild(li);
            secondReadingCount++;
        }

        if (thirdReadingCount < 10 && item.FrReading !== "No Data" && item.ScndReading !== "No Data" && item.ThReading !== "No Data" && item.spno === "No Data") {
            thirdReadingList.appendChild(li);
            thirdReadingCount++;
        }
    });

});
