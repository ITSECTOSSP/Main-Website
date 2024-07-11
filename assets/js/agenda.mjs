import { fetchDataAgenda } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event triggered. Fetching data...');

    const items = await fetchDataAgenda();

    if (!items) {
        console.error('No items returned from fetchDataAgenda.');
        return;
    }

    console.log('Data fetched successfully:', items);

    // Sort items by dateuploaded from new to old
    items.sort((a, b) => {
        if (!a.dateuploaded || !b.dateuploaded) return 0; // Handle null or undefined values
        return b.dateuploaded.getTime() - a.dateuploaded.getTime();
    });

    console.log('Sorted items by dateuploaded (new to old):', items);

    const agendaItems = document.getElementById('agenda-items');

    if (!agendaItems) {
        console.error('Element with ID "agenda-items" not found.');
        return;
    }

    let agendaItemsCount = 0;

    items.forEach(item => {
        if (agendaItemsCount < 5) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.durl; // Use the 'durl' property for the link
            a.textContent = item.rname;
            a.target = item.durl; // Open link in a new tab
            li.appendChild(a);
            agendaItems.appendChild(li);
            agendaItemsCount++;
        }
    });

    console.log(`Displayed ${agendaItemsCount} items in "agenda-items".`);
});
