import { fetchCouncilorsData } from './source.mjs';

// Function to display district information on resource.html
async function displayDistrictInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const dist = urlParams.get('council');

    const districtElement = document.getElementById('council-id');
    if (districtElement) {
        districtElement.textContent = dist;

        // Create a new h1 element with the text "CITY COUNCIL"
        const cityCouncilHeading = document.createElement('h1');
        cityCouncilHeading.textContent = "CITY COUNCIL";

         // Add some margin to the heading for spacing
         cityCouncilHeading.style.marginLeft = "3px"; // Adjust the value as needed

        // Insert the new h1 after the districtElement
        districtElement.parentNode.insertBefore(cityCouncilHeading, districtElement.nextSibling);
    } else {
        console.error('Element with ID "council-id" not found.');
    }
}

// Function to display councilor information on resource.html
async function displayCouncilorInfo() {
    const councilorList = document.getElementById('councilor-content');
    if (!councilorList) {
        console.error('Element with ID "councilor-content" not found.');
        return;
    }

    try {
        // Fetch councilor data
        const councilorData = await fetchCouncilorsData();

        console.log('Councilor Data:', councilorData);

        // Clear previous content
        councilorList.innerHTML = '';

        // Get the council ID from council-id
        const councilID = document.getElementById('council-id').textContent;

        // Filter councilor data based on the council ID
        const filteredData = councilorData.filter(item => item.council === councilID);

        console.log('Filtered Data:', filteredData);

        // Display councilor data
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

            const district = document.createElement('p');
            district.classList.add('councilor-district'); // Adjust class name if needed
            district.textContent = item.District;
            alink.appendChild(district);

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
        console.error('Error fetching councilor data:', error);
    }
}

// Trigger functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function() {
    await Promise.all([
        displayDistrictInfo(),
        displayCouncilorInfo()
    ]);
});
