import { fetchCommitteeChairData } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event triggered. Fetching committee data...');

    const committeeDataDiv = document.getElementById('committees-data');

    if (!committeeDataDiv) {
        console.error('Element with ID "committee-data" not found.');
        return;
    }

    // Fetch and display committee data
    fetchCommitteeData(); // Call the function to fetch and display committee data
});

// Function to fetch and display committee data
async function fetchCommitteeData() {
    try {
        const committeeData = await fetchCommitteeChairData();
        const committeeDataDiv = document.getElementById('committees-data');

        // Clear Content
        committeeDataDiv.innerHTML = '';

        if (committeeData.length === 0) {
            committeeDataDiv.textContent = 'No committees data available.';
            return;
        }

        committeeData.forEach(data => {
            const a = document.createElement('a');
            a.classList.add('commi-reg-btn');
            a.textContent = `${data.committeeName}`;
            a.href = `committeeinfo.html?id=${encodeURIComponent(data.idchar)}`;
            a.style.display = 'block'; // Display each link on a new line
            committeeDataDiv.appendChild(a);

        });
    } catch (error) {
        console.error('Error fetching committee data:', error);
    }
}
