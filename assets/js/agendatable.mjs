import { fetchDataAgenda } from './source.mjs';

// Function to format date as MM/DD/YYYY
function formatDate(dateString) {
    if (!dateString || dateString === 'No Data') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    });
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const data = await fetchDataAgenda();
        console.log('Fetched data:', data);
        const tableBody = document.getElementById('table-body');

        // Sort items by dateuploaded from new to old
        data.sort((a, b) => {
            if (!a.sessdate || !b.sessdate) return 0; // Handle null or undefined values
            return new Date(b.sessdate).getTime() - new Date(a.sessdate).getTime();
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
                    <td data-cell="Session">${item.rname}</td>
                    <td data-cell="Date">${formatDate(item.sessdate)}</td>
                    <td data-cell="Type">${item.typesess}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle table-button" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                                <a class="dropdown-item" href="${item.durl}" target="_blank">
                                    <svg class="icon icon-tabler" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">
                                        <path d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z" fill="currentColor"></path>
                                        <path d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z" fill="currentColor"></path>
                                    </svg> View Document
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
        displayData(data, currentPage);
        generatePagination(data);

        // Search functionality
        const searchInput = document.querySelector('.input');
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            const filteredSearchData = data.filter(item =>
                item.rname.toLowerCase().includes(searchText) ||
                item.typesess.toLowerCase().includes(searchText) 
            );
            currentPage = 1; // Reset to first page
            displayData(filteredSearchData, currentPage);
            generatePagination(filteredSearchData);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
