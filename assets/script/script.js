document.addEventListener('DOMContentLoaded', function() {
    fetch('https://itsectossp.github.io/jsonapi/csvjson.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched JSON data:', data);
            const tableBody = document.getElementById('table-body');

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
                        <td scope="row" style="display:none;">${start + index + 1}</td>
                        <td>${item.Sp}</td>
                        <td>${item["PO No"]}</td>
                        <td>${item.Title}</td>
                        <td>

                        
                            <button id="btn-measure-linked"class="btn btn-success " type="button" data-link="${item.Iframe}/edit">
                            <svg class="bi bi-link-45deg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" style="font-size: 30px;">
                            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"></path>
                            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"></path>
                        </svg>
                            </button>
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
            const searchInput = document.querySelector('.search.form-control');
            searchInput.addEventListener('input', function() {
                const searchText = this.value.toLowerCase();
                const filteredData = data.filter(item =>
                    item.Sp.toLowerCase().includes(searchText) ||
                    item.Title.toLowerCase().includes(searchText) ||
                    item["PO No"].toLowerCase().includes(searchText)
                );
                currentPage = 1; // Reset to first page
                displayData(filteredData, currentPage);
                generatePagination(filteredData);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
