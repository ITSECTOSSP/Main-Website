import { fetchCommitteeData } from './source.mjs';

// Function to format date as Month Day, Year
function formatDate(dateString) {
    if (!dateString || dateString === 'No Data') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    });
}

// Function to display legislative information on resource.html
async function displayLegislativeInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const spno = urlParams.get('spno');
    const year = urlParams.get('year');
    const proposed = urlParams.get('proposed');
    const title = urlParams.get('title');
    const introducer = urlParams.get('introducer');
    const frDate = urlParams.get('frDate');
    const frReading = urlParams.get('frReading');
    const srDate = urlParams.get('srDate');
    const srReading = urlParams.get('srReading');
    const trDate = urlParams.get('trDate');
    const trReading = urlParams.get('trReading');
    const pdfLink = urlParams.get('pdflink');

    // Combine spno and year
    const combinedSpnoYear = `${spno || ''}, S-${year || ''}`.trim();

    document.getElementById('sp-no').textContent = combinedSpnoYear;
    document.getElementById('info-matter').textContent = proposed;

    const pdfLinkElement = document.getElementById('pdf-link');
    pdfLinkElement.href = pdfLink;
    pdfLinkElement.textContent = "View PDF";

    document.getElementById('title-resource').textContent = title;
    document.getElementById('introducer-resource').textContent = introducer;
    document.getElementById('fr-date-resource').textContent = formatDate(frDate);
    document.getElementById('fr-infor-resource').textContent = frReading;
    document.getElementById('sr-date-resource').textContent = formatDate(srDate);
    document.getElementById('sr-infor-resource').textContent = srReading;
    document.getElementById('tr-date-resource').textContent = formatDate(trDate);
    document.getElementById('tr-infor-resource').textContent = trReading;
}

// Function to display committee information on resource.html
async function displayCommitteeInfo() {
    const committeeList = document.getElementById('committee-listing');
    if (!committeeList) {
        console.error('Element with ID "committee-listing" not found.');
        return;
    }

    try {
        // Fetch committee data
        const committeeData = await fetchCommitteeData();

        // Clear previous content
        committeeList.innerHTML = '';

        // Get the proposed value from info-matter
        const proposed = document.getElementById('info-matter').textContent.trim();

        // Filter committee data based on proposed value
        const filteredData = committeeData.filter(item => item.proposedcomm.trim() === proposed);

        // Display committee data
        filteredData.forEach(item => {
            const col = document.createElement('div');
            col.classList.add('col');

            const p1 = document.createElement('p');
            p1.textContent = `${item.commref}`;
            col.appendChild(p1);

            const p3 = document.createElement('p');
            p3.textContent = `Date: ${formatDate(item.commdate)}`;
            col.appendChild(p3);

            committeeList.appendChild(col);
        });
    } catch (error) {
        console.error('Error fetching committee data:', error);
    }
}

// Trigger functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function() {
    await Promise.all([
        displayLegislativeInfo(),
        displayCommitteeInfo()
    ]);
});
