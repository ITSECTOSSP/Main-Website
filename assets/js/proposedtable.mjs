import { fetchDataProposed } from './source.mjs';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const data = await fetchDataProposed();
        console.log('Fetched data:', data);
        const tableBody = document.getElementById('table-body');

        // Filter out rows where "spno" is "No Data"
        const filteredData = data.filter(item => item.spno === "No Data");

            // Sort data by "docket" from newest to oldest
            const sortedData = filteredData.sort((a, b) => {
                const dateA = new Date(a.ThDate);
                const dateB = new Date(b.ThDate);
                return dateB - dateA;
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
                    <td data-cell="PROPOSED">${item.proposed}</td>
                    <td data-cell="First Reading">${item.FrReading}</td>
                    <td data-cell="Second Reading">${item.ScndReading}</td>
                    <td data-cell="Third Reading">${item.ThReading}</td>
                    <td data-cell="TITLE">${item.title}</td>
                    <td data-cell="AUTHOR">${item.introducer}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle table-button" type="button" id="dropdownMenuButton${index}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Actions
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton${index}">
                                <a class="dropdown-item" href="resource.html?proposed=${encodeURIComponent(item.proposed)}&title=${encodeURIComponent(item.title)}&introducer=${encodeURIComponent(item.introducer)}&frDate=${encodeURIComponent(item.FrDate)}&frReading=${encodeURIComponent(item.FrReading)}&srDate=${encodeURIComponent(item.ScndDate)}&srReading=${encodeURIComponent(item.ScndReading)}&trDate=${encodeURIComponent(item.ThDate)}&trReading=${encodeURIComponent(item.ThReading)}">
                                     <svg class="icon icon-tabler" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clip, document, attachment, paperclip, attach</title><path d="M12.76,19.94A5.49,5.49,0,0,1,5,12.18l8.76-8.75A3.72,3.72,0,0,1,20.1,6.06,3.68,3.68,0,0,1,19,8.68L10.67,17A1.36,1.36,0,0,1,8.75,15.1l8.34-8.34L15.67,5.35,7.33,13.69a3.36,3.36,0,0,0,4.75,4.75l8.35-8.34A5.72,5.72,0,0,0,12.34,2L3.58,10.77A7.49,7.49,0,0,0,14.17,21.36l7.92-7.93L20.68,12Z"/>
                                    </svg> View Details
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
                item.title.toLowerCase().includes(searchText) ||
                item.proposed.toLowerCase().includes(searchText) ||
                item.introducer.toLowerCase().includes(searchText)
            );
            currentPage = 1; // Reset to first page
            displayData(filteredSearchData, currentPage);
            generatePagination(filteredSearchData);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
