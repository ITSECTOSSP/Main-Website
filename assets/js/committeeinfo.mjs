import { fetchCommitteeChairData, fetchCouncilorsData } from './source.mjs';

async function displayCommitteeInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const idcoun = Number(urlParams.get('id')); // Convert idcoun to a number

    console.log('idcoun parameter (as number):', idcoun); // Log the idcoun parameter

    const committeeNameEl = document.getElementById('committee-name');
    const chairCommEl = document.getElementById('chair-comm');
    const viceChairEl = document.getElementById('vice-chair');
    const commMembersEl = document.getElementById('comm-members');
    const exOfficioEl = document.getElementById('exofficio');

    if (!committeeNameEl || !chairCommEl || !viceChairEl || !commMembersEl || !exOfficioEl) {
        console.error('One or more elements with the specified IDs were not found.');
        return;
    }

    try {
        // Fetch committee chair and councilor data
        const [committeeChairData, councilorData] = await Promise.all([fetchCommitteeChairData(), fetchCouncilorsData()]);
        console.log('Fetched committee chair data:', committeeChairData); // Log the fetched committee chair data
        console.log('Fetched councilor data:', councilorData); // Log the fetched councilor data

        const committee = committeeChairData.find(item => Number(item.idchar) === idcoun); // Convert item.idchar to number

        if (committee) {
            committeeNameEl.textContent = `Committee on ${committee.committeeName}`;

            // Find the chair's name using the councilor data and chair's idcoun
            const chair = councilorData.find(item => Number(item.idcoun) === Number(committee.committeeChair));
            if (chair) {
                const link = document.createElement('a');
                link.href = `councilorinfo.html?idcoun=${encodeURIComponent(chair.idcoun)}`; // Change this URL as needed
                link.textContent = chair.counName;
                link.target = '_blank'; // Optional: open link in a new tab
                chairCommEl.innerHTML = ''; // Clear previous content
                chairCommEl.appendChild(link);
            } else {
                chairCommEl.textContent = 'No matching councilor found for chair';
            }

            // Display vice chairs
            const viceChairs = committee.committeeViceChair ? committee.committeeViceChair.split(',') : [];
            viceChairEl.innerHTML = ''; // Clear previous content
            viceChairs.forEach(viceChair => {
                const trimmedViceChair = viceChair.trim();
                const viceChairInfo = councilorData.find(item => Number(item.idcoun) === Number(trimmedViceChair));
                if (viceChairInfo) {
                    const link = document.createElement('a');
                    link.href = `councilorinfo.html?idcoun=${encodeURIComponent(viceChairInfo.idcoun)}`; // Change this URL as needed
                    link.textContent = viceChairInfo.counName;
                    link.target = '_blank'; // Optional: open link in a new tab
                    viceChairEl.appendChild(link);
                    viceChairEl.appendChild(document.createElement('br')); // Optional: Add line breaks between names
                }
            });

            // Display committee members
            const members = committee.committeeMember ? committee.committeeMember.split(',') : [];
            commMembersEl.innerHTML = ''; // Clear previous content
            members.forEach(member => {
                const trimmedMember = member.trim();
                const memberInfo = councilorData.find(item => Number(item.idcoun) === Number(trimmedMember));
                if (memberInfo) {
                    const link = document.createElement('a');
                    link.href = `councilorinfo.html?idcoun=${encodeURIComponent(memberInfo.idcoun)}`; // Change this URL as needed
                    link.textContent = memberInfo.counName;
                    link.target = '_blank'; // Optional: open link in a new tab
                    commMembersEl.appendChild(link);
                    commMembersEl.appendChild(document.createElement('br')); // Optional: Add line breaks between names
                }
            });

            // Display ex officio members
            const exOfficios = committee.committeeEXOff ? committee.committeeEXOff.split(',') : [];
            exOfficioEl.innerHTML = ''; // Clear previous content
            exOfficios.forEach(exOfficio => {
                const trimmedExOfficio = exOfficio.trim();
                const exOfficioInfo = councilorData.find(item => Number(item.idcoun) === Number(trimmedExOfficio));
                if (exOfficioInfo) {
                    const link = document.createElement('a');
                    link.href = `councilorinfo.html?idcoun=${encodeURIComponent(exOfficioInfo.idcoun)}`; // Change this URL as needed
                    link.textContent = exOfficioInfo.counName;
                    link.target = '_blank'; // Optional: open link in a new tab
                    exOfficioEl.appendChild(link);
                    exOfficioEl.appendChild(document.createElement('br')); // Optional: Add line breaks between names
                }
            });

        } else {
            committeeNameEl.textContent = 'No matching committee found';
            chairCommEl.textContent = 'No matching committee chair found';
            viceChairEl.textContent = 'No matching committee vice chair found';
            commMembersEl.textContent = 'No matching committee members found';
            exOfficioEl.textContent = 'No matching ex officio members found';
        }
    } catch (error) {
        console.error('Error fetching committee or councilor data:', error);
        committeeNameEl.textContent = 'Error fetching committee data';
        chairCommEl.textContent = 'Error fetching committee chair data';
        viceChairEl.textContent = 'Error fetching committee vice chair data';
        commMembersEl.textContent = 'Error fetching committee members data';
        exOfficioEl.textContent = 'Error fetching ex officio members data';
    }
}

document.addEventListener('DOMContentLoaded', displayCommitteeInfo);
