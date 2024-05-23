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
            const searchInput = document.querySelector('.search.form-control');
            const pagination = document.querySelector('.pagination');

            // Constants for pagination
            const itemsPerPage = 10;
            let currentPage = 1;

            // Function to display data for the current page
            const displayData = (pageNumber) => {
                const startIndex = (pageNumber - 1) * itemsPerPage;
                const endIndex = pageNumber * itemsPerPage;
                const paginatedData = data.slice(startIndex, endIndex);

                tableBody.innerHTML = ''; // Clear table body
                paginatedData.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${startIndex + index + 1}</th>
                        <td>${item.Sp}</td>
                        <td>${item.Title}</td>
                        <td>
                            <a href="${item.Iframe}/edit" target="_blank" class="btn btn-success" style="margin-left: 5px;" type="button">
                                <i class="glyphicon glyphicon-link" style="font-size: 30px;"></i>
                            </a>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            };

            // Function to generate pagination controls
            const generatePagination = () => {
                pagination.innerHTML = ''; // Clear pagination
                const pageCount = Math.ceil(data.length / itemsPerPage);
                for (let i = 1; i <= pageCount; i++) {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="#" class="page-link">${i}</a>`;
                    if (i === currentPage) {
                        listItem.classList.add('active');
                    }
                    listItem.addEventListener('click', () => {
                        currentPage = i;
                        displayData(currentPage);
                        generatePagination();
                    });
                    pagination.appendChild(listItem);
                }
            };

            // Initial display of data and pagination
            displayData(currentPage);
            generatePagination();

            // Function to filter table rows based on search input
            const filterTable = () => {
                const searchText = searchInput.value.toLowerCase();
                const filteredData = data.filter(item => item.Sp.toLowerCase().includes(searchText) || item.Title.toLowerCase().includes(searchText));
                displayData(1); // Reset to first page
                generatePagination(); // Update pagination controls
            };

            // Add event listener to search input
            searchInput.addEventListener('input', filterTable);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
