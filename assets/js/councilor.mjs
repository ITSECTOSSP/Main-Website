import { fetchCouncilorsData, fetchCommitteeChairData } from './source.mjs';

// Function to display district information on resource.html
async function displayDistrictInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const dist = urlParams.get('district');

    const districtElement = document.getElementById('district-id');
    if (districtElement) {
        districtElement.textContent = dist;
    } else {
        console.error('Element with ID "district-id" not found.');
    }
}

// Function to display committee information on resource.html
async function displayCouncilorInfo() {
    const councilorList = document.getElementById('councilor-content');
    if (!councilorList) {
        console.error('Element with ID "card-councilor-content" not found.');
        return;
    }

    try {
        // Fetch councilor data and committee chair data
        const councilorData = await fetchCouncilorsData();
        const committeeChairData = await fetchCommitteeChairData();

        console.log('Councilor Data:', councilorData);
        console.log('Committee Chair Data:', committeeChairData);

        // Clear previous content
        councilorList.innerHTML = '';

        // Get the proposed value from district-id
        const distID = document.getElementById('district-id').textContent;

        // Filter committee data based on proposed value
        const filteredData = councilorData.filter(item => item.District === distID && item.council === '22ND');

        console.log('Filtered Data:', filteredData);

        // Create a mapping of committeeChair to committeeName for easy lookup
        const committeeMap = new Map(committeeChairData.map(item => [item.committeeChair, item.committeeName]));

        console.log('Committee Map:', Array.from(committeeMap.entries()));

        // Display committee data
        filteredData.forEach(item => {
            const coundiv = document.createElement('div');
            coundiv.classList.add('card-councilor-wrapper');
            coundiv.dataset.idcoun = item.idcoun;

            const alink = document.createElement('a');
            alink.href = `councilorinfo.html?idcoun=${item.idcoun}`; // Set the href to councilorinfo.html with idcoun as a query parameter
            coundiv.appendChild(alink);
            alink.classList.add('card-councilor');
            coundiv.appendChild(alink);

            const counName = document.createElement('p');
            counName.classList.add('councilor-name');
            counName.textContent = `HON. ${item.counName}`;
            alink.appendChild(counName);

            const commChair = document.createElement('p');
            commChair.classList.add('councilor-name');
            
            // Find the committee name based on committeeChair
            const committeeName = committeeMap.get(item.idcoun) || 'No Data';
            commChair.textContent = `Chairperson: ${committeeName}`;
            alink.appendChild(commChair);

            const goCorner = document.createElement('div');
            goCorner.classList.add('go-corner');
            alink.appendChild(goCorner);

            const goArrow = document.createElement('div');
            goArrow.classList.add('go-arrow');
            goArrow.textContent = `→`;
            alink.appendChild(goArrow);

            councilorList.appendChild(coundiv);
        });
    } catch (error) {
        console.error('Error fetching committee data:', error);
    }
}

// Trigger functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function() {
    await Promise.all([
        displayDistrictInfo(),
        displayCouncilorInfo()
    ]);
});
