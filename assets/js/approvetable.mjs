import { fetchDataProposed } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const data = await fetchDataProposed();
        console.log('Fetched data:', data);
        const tableBody = document.getElementById('table-body');

        // Filter out rows where "spno" is "No Data"
        const filteredData = data.filter(item => item.spno !== "No Data");

        // Sort data by "proposed" from oldest to newest
        const sortedData = filteredData.sort((a, b) => {
            const dateA = new Date(a.proposed);
            const dateB = new Date(b.proposed);
            return dateA - dateB;
        });

        // Pagination variables
        const itemsPerPage = 50;
        let currentPage = 1;

        // Function to display data
        const displayData = (data, page) => {
            tableBody.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = page * itemsPerPage;
            const paginatedItems = data.slice(start, end);

            

            paginatedItems.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="column" style="display:none;">${start + index + 1}</th>
                    <td data-cell="SP">${item.spno}, S-${item.Year}</td>
                    <td data-cell="PROPOSED">${item.proposed}</td>
                    <td data-cell="TITLE">${item.Title}</td>
                    <td data-cell="AUTHOR">${item.introducer}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle table-button" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">

                            <a class="dropdown-item" href="resourceapp.html?spno=${encodeURIComponent(item.spno)}
                            &year=${item.Year}
                            &proposed=${encodeURIComponent(item.proposed)}
                            &title=${encodeURIComponent(item.Title)}
                            &introducer=${encodeURIComponent(item.introducer)}
                            &frDate=${encodeURIComponent(item.FrDate)}
                            &frReading=${encodeURIComponent(item.FrReading)}
                            &srDate=${encodeURIComponent(item.ScndDate)}
                            &srReading=${encodeURIComponent(item.ScndReading)}
                            &trDate=${encodeURIComponent(item.ThDate)}
                            &trReading=${encodeURIComponent(item.ThReading)}
                            &trReading=${encodeURIComponent(item.ThReading)}
                            &pdflink=${encodeURIComponent(item.Pdflink)}">
                                    <svg class="icon icon-tabler" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clip, document, attachment, paperclip, attach</title><path d="M12.76,19.94A5.49,5.49,0,0,1,5,12.18l8.76-8.75A3.72,3.72,0,0,1,20.1,6.06,3.68,3.68,0,0,1,19,8.68L10.67,17A1.36,1.36,0,0,1,8.75,15.1l8.34-8.34L15.67,5.35,7.33,13.69a3.36,3.36,0,0,0,4.75,4.75l8.35-8.34A5.72,5.72,0,0,0,12.34,2L3.58,10.77A7.49,7.49,0,0,0,14.17,21.36l7.92-7.93L20.68,12Z"/>
                                    </svg>
                                    View Details
                                </a>

                                <a class="dropdown-item" href="${item.Pdflink}" target="_blank">
                                    <svg class="icon icon-tabler" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                                        <path d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z" fill="currentColor"></path>
                                        <path d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z" fill="currentColor"></path>
                                    </svg> View Document
                                </a>

                                <a class="dropdown-item request-copy" data-pages="${item.Pages}" data-title="${item.title}">
                                    <svg class="icon icon-tabler icon-tabler-certificate" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                        <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
                                        <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73"></path>
                                        <path d="M6 9l12 0"></path>
                                        <path d="M6 12l3 0"></path>
                                        <path d="M6 15l2 0"></path>
                                    </svg> Request Certified Copy
                                </a>

                            </div>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.btn-success').forEach(button => {
                button.addEventListener('click', function() {
                    const link = this.getAttribute('data-link');
                    window.open(link, '_blank');
                });
            });
        };

        // Function to generate pagination
        const generatePagination = (data) => {
            const pagination = document.querySelector('.pagination');
            pagination.innerHTML = '';
            const pageCount = Math.ceil(data.length / itemsPerPage);

            const createPageItem = (page, label = page) => {    
                const listItem = document.createElement('li');
                listItem.className = 'page-item';
                listItem.innerHTML = `<a href="#" class="page-link">${label}</a>`;
                if (page === currentPage) {
                    listItem.classList.add('active');
                }
                listItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = page;
                    displayData(data, currentPage);
                    generatePagination(data);
                });
                return listItem;
            };

            // First page button
            pagination.appendChild(createPageItem(1, 'First'));

            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(pageCount, currentPage + 2);

            if (currentPage <= 3) {
                endPage = Math.min(5, pageCount);
            } else if (currentPage >= pageCount - 2) {
                startPage = Math.max(1, pageCount - 4);
            }

            for (let i = startPage; i <= endPage; i++) {
                pagination.appendChild(createPageItem(i));
            }

            // Last page button
            pagination.appendChild(createPageItem(pageCount, 'Last'));
        };

        // Initial display and pagination
        displayData(sortedData, currentPage);
        generatePagination(sortedData);

        // Search functionality
        const searchInput = document.querySelector('.input');
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            const filteredSearchData = sortedData.filter(item =>
                item.spno.toLowerCase().includes(searchText) ||
                item.Title.toLowerCase().includes(searchText) ||
                item.proposed.toLowerCase().includes(searchText) ||
                item.introducer.toLowerCase().includes(searchText)
            );
            currentPage = 1; // Reset to first page
            displayData(filteredSearchData, currentPage);
            generatePagination(filteredSearchData);
        });

        // Event listener for "Request Certified Copy" buttons
        document.addEventListener('click', function(event) {
            if (event.target && event.target.classList.contains('request-copy')) {
                const pages = parseInt(event.target.getAttribute('data-pages'));
                const title = event.target.getAttribute('data-title');
                document.getElementById('popupPages').textContent = pages;
                document.getElementById('popupTitle').textContent = title;

                // Calculate and display the value of pages * copies * 50
                let copies = 1;
                const popupCopies = document.getElementById('popupCopies');
                popupCopies.textContent = copies;

                document.getElementById('btnAddCopy').addEventListener('click', function() {
                    copies++;
                    popupCopies.textContent = copies;
                    updateCalculatedValue(pages, copies);
                });

                document.getElementById('btnMinusCopy').addEventListener('click', function() {
                    if (copies > 1) {
                        copies--;
                        popupCopies.textContent = copies;
                        updateCalculatedValue(pages, copies);
                    }
                });

                // Initial calculation
                updateCalculatedValue(pages, copies);

                // Show the popup
                document.getElementById('certifiedCopyPopup').style.display = 'block';
            }
        });

        // Function to update the calculated value
        const updateCalculatedValue = (pages, copies) => {
            const calculatedValue = pages * copies * 50;
            document.getElementById('popupCalculatedValue').textContent = calculatedValue;
        };

        // Event listener for closing the popup
        document.querySelector('.popup-legs .close').addEventListener('click', function() {
            document.getElementById('certifiedCopyPopup').style.display = 'none';
        });

        // Hide the popup when clicking outside of the popup content
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('certifiedCopyPopup')) {
                document.getElementById('certifiedCopyPopup').style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});