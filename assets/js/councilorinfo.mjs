import { fetchCouncilorsData, fetchCommitteeChairData, fetchDataProposed } from './source.mjs';

// Function to normalize strings by trimming, normalizing Unicode, and removing special characters
function normalizeString(str) {
    return str ? str.trim().normalize('NFKC').toLowerCase().replace(/[\s'"“”]+/g, ' ') : '';
}

// Helper function to check if introducerName is in any of the item.introducer names
function isIntroducerInItem(introducer, itemIntroducer) {
    const normalizedIntroducer = normalizeString(introducer);
    // Split by comma and normalize each name
    const introducers = itemIntroducer.split(',').map(name => normalizeString(name));
    return introducers.some(name => name.includes(normalizedIntroducer));
}

// Function to display councilor information based on idcoun parameter
async function displayDistrictInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const idcoun = urlParams.get('idcoun');

    console.log('idcoun parameter (as string):', idcoun); // Log the idcoun parameter

    const councilorEl = document.getElementById('coun-info');
    const locationEl = document.getElementById('coun-loc');
    const emailEl = document.getElementById('coun-mail');
    const contactEl = document.getElementById('coun-cont');
    const committeeChairEl = document.getElementById('comm-chair');

    if (!councilorEl || !locationEl || !emailEl || !contactEl || !committeeChairEl) {
        console.error('One or more elements with the specified IDs were not found.');
        return;
    }

    try {
        const [councilorData, committeeChairData] = await Promise.all([fetchCouncilorsData(), fetchCommitteeChairData()]);
        console.log('Fetched councilor data:', councilorData); // Log the fetched councilor data
        console.log('Fetched committee chair data:', committeeChairData); // Log the fetched committee chair data

        const numericIdcoun = Number(idcoun); // Convert idcoun to a number
        console.log('idcoun parameter (as number):', numericIdcoun); // Log the idcoun parameter as a number

        const councilor = councilorData.find(item => item.idcoun === numericIdcoun);
        console.log('Matching councilor:', councilor); // Log the matching councilor

        if (councilor) {
            // Create a new h1 element with content "HON."
            const honorHeading = document.createElement('h1');
            honorHeading.textContent = "HON.";
            
            // Add some margin to the heading for spacing
            honorHeading.style.marginRight = "3px"; // Adjust the value as needed

            // Insert the new h1 before the councilorEl
            councilorEl.parentNode.insertBefore(honorHeading, councilorEl);

            // Update the councilorEl with the councilor's name
            councilorEl.textContent = councilor.counName;
            locationEl.textContent = councilor.address;
            emailEl.textContent = councilor.email;
            contactEl.textContent = councilor.contact;

            const committeeChair = committeeChairData.find(item => item.committeeChair === numericIdcoun);
            if (committeeChair) {
                committeeChairEl.textContent = `Chairperson, Committee on ${committeeChair.committeeName}`;
            } else {
                committeeChairEl.textContent = 'No matching committee chair found';
            }
        } else {
            councilorEl.textContent = 'No matching councilor found';
            locationEl.textContent = 'No matching councilor found';
            emailEl.textContent = 'No matching councilor found';
            contactEl.textContent = 'No matching councilor found';
            committeeChairEl.textContent = 'No matching committee chair found';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        councilorEl.textContent = 'Error fetching councilor data';
        locationEl.textContent = 'Error fetching councilor data';
        emailEl.textContent = 'Error fetching councilor data';
        contactEl.textContent = 'Error fetching councilor data';
        committeeChairEl.textContent = 'Error fetching committee chair data';
    }
}

// Function to display proposed measures based on councilor data
async function displayProposedMeasures() {
    // Get the elements for ordinance and resolution listings
    const ordinanceList = document.getElementById('ordinance-listing');
    const resolutionList = document.getElementById('resolution-listing');
    const councilorInfoEl = document.getElementById('coun-info');

    if (!ordinanceList || !resolutionList || !councilorInfoEl) {
        console.error('One or more elements with the specified IDs were not found.');
        return;
    }

    try {
        // Fetch data
        const [councilorData, proposedData] = await Promise.all([fetchCouncilorsData(), fetchDataProposed()]);
        
        // Extract introducer names from councilor data
        const introducerNames = councilorInfoEl.textContent.split(',').map(name => normalizeString(name).trim()); // Get and normalize all introducer names

        // Filter proposed data for ordinances and resolutions
        const filteredOrdinanceData = proposedData.filter(item => 
            introducerNames.some(introducerName => isIntroducerInItem(introducerName, item.introducer)) &&
            item.spno !== "No Data" &&
            item.Type === "ORDINANCE"
        );

        const filteredResolutionData = proposedData.filter(item => 
            introducerNames.some(introducerName => isIntroducerInItem(introducerName, item.introducer)) &&
            item.spno !== "No Data" &&
            item.Type === "RESOLUTION"
        );

        // Function to create a clickable link for each item
        function createListItem(item) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `resourceapp.html?spno=${encodeURIComponent(item.spno)}&year=${encodeURIComponent(item.Year)}&proposed=${encodeURIComponent(item.proposed)}&title=${encodeURIComponent(item.Title)}&introducer=${encodeURIComponent(item.introducer)}&frDate=${encodeURIComponent(item.FrDate)}&frReading=${encodeURIComponent(item.FrReading)}&srDate=${encodeURIComponent(item.ScndDate)}&srReading=${encodeURIComponent(item.ScndReading)}&trDate=${encodeURIComponent(item.ThDate)}&trReading=${encodeURIComponent(item.ThReading)}&pdflink=${encodeURIComponent(item.Pdflink)}`;
            link.textContent = `${item.spno}, S-${item.Year}`;
            link.target = '_blank'; // Optional: open link in a new tab
            listItem.appendChild(link);
            return listItem;
        }

        // Display filtered ordinance data
        filteredOrdinanceData.forEach(item => {
            const listItem = createListItem(item);
            ordinanceList.appendChild(listItem);
        });
        
        if (filteredOrdinanceData.length === 0) {
            const noDataItem = document.createElement('li');
            noDataItem.textContent = 'No matching ordinance measures found';
            ordinanceList.appendChild(noDataItem);
        }

        // Display filtered resolution data
        filteredResolutionData.forEach(item => {
            const listItem = createListItem(item);
            resolutionList.appendChild(listItem);
        });
        
        if (filteredResolutionData.length === 0) {
            const noDataItem = document.createElement('li');
            noDataItem.textContent = 'No matching resolution measures found';
            resolutionList.appendChild(noDataItem);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        if (ordinanceList) {
            const errorItem = document.createElement('li');
            errorItem.textContent = 'Error fetching ordinance measures data';
            ordinanceList.appendChild(errorItem);
        }
        if (resolutionList) {
            const errorItem = document.createElement('li');
            errorItem.textContent = 'Error fetching resolution measures data';
            resolutionList.appendChild(errorItem);
        }
    }
}

// Trigger functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async function() {
    await displayDistrictInfo();
    await displayProposedMeasures();
});
