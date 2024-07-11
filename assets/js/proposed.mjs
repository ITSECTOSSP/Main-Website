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
        return b.FrDate.getTime() - a.FrDate.getTime();
    });

    console.log('Sorted items by FrDate (new to old):', items);

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
        if (firstReadingCount < 10 && item.FrReading !== "No Data" && item.ScndReading === "No Data" && item.ThReading === "No Data") {
            const li = document.createElement('li');
            li.textContent = item.proposed;
            firstReadingList.appendChild(li);
            firstReadingCount++;
        }

        if (secondReadingCount < 10 && item.FrReading !== "No Data" && item.ScndReading !== "No Data" && item.ThReading === "No Data") {
            const li = document.createElement('li');
            li.textContent = item.proposed;
            secondReadingList.appendChild(li);
            secondReadingCount++;
        }

        if (thirdReadingCount < 10 && item.FrReading !== "No Data" && item.ScndReading !== "No Data" && item.ThReading !== "No Data" && item.spno === "No Data") {
            const li = document.createElement('li');
            li.textContent = item.proposed;
            thirdReadingList.appendChild(li);
            thirdReadingCount++;
        }
    });

    console.log(`Displayed ${firstReadingCount} items in "first-reading".`);
    console.log(`Displayed ${secondReadingCount} items in "second-reading".`);
    console.log(`Displayed ${thirdReadingCount} items in "third-reading".`);
});
