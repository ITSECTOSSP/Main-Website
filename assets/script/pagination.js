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
            const itemsPerPage = 50;
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
                               <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style="color: var(--ossp-blue);font-size: 30px;">
                                            <path d="M14.8284 12L16.2426 13.4142L19.071 10.5858C20.6331 9.02365 20.6331 6.49099 19.071 4.9289C17.509 3.3668 14.9763 3.3668 13.4142 4.9289L10.5858 7.75732L12 9.17154L14.8284 6.34311C15.6095 5.56206 16.8758 5.56206 17.6568 6.34311C18.4379 7.12416 18.4379 8.39049 17.6568 9.17154L14.8284 12Z" fill="currentColor"></path>
                                            <path d="M12 14.8285L13.4142 16.2427L10.5858 19.0711C9.02372 20.6332 6.49106 20.6332 4.92896 19.0711C3.36686 17.509 3.36686 14.9764 4.92896 13.4143L7.75739 10.5858L9.1716 12L6.34317 14.8285C5.56212 15.6095 5.56212 16.8758 6.34317 17.6569C7.12422 18.4379 8.39055 18.4379 9.1716 17.6569L12 14.8285Z" fill="currentColor"></path>
                                            <path d="M14.8285 10.5857C15.219 10.1952 15.219 9.56199 14.8285 9.17147C14.4379 8.78094 13.8048 8.78094 13.4142 9.17147L9.1716 13.4141C8.78107 13.8046 8.78107 14.4378 9.1716 14.8283C9.56212 15.2188 10.1953 15.2188 10.5858 14.8283L14.8285 10.5857Z" fill="currentColor"></path>
                                </svg>
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

                // Create First button
                const firstItem = document.createElement('li');
                firstItem.innerHTML = `<a href="#" class="page-link">First</a>`;
                firstItem.addEventListener('click', () => {
                    currentPage = 1;
                    displayData(currentPage);
                    generatePagination();
                });
                pagination.appendChild(firstItem);

                // Determine start and end page numbers
                let startPage = Math.max(currentPage - 2, 1);
                let endPage = Math.min(startPage + 4, pageCount);

                if (endPage - startPage < 4) {
                    startPage = Math.max(endPage - 4, 1);
                }

                // Create page number buttons
                for (let i = startPage; i <= endPage; i++) {
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

                // Create Last button
                const lastItem = document.createElement('li');
                lastItem.innerHTML = `<a href="#" class="page-link">Last</a>`;
                lastItem.addEventListener('click', () => {
                    currentPage = pageCount;
                    displayData(currentPage);
                    generatePagination();
                });
                pagination.appendChild(lastItem);
            };

            // Initial display of data and pagination
            displayData(currentPage);
            generatePagination();

            // Function to filter table rows based on search input
            const filterTable = () => {
                const searchText = searchInput.value.toLowerCase();
                const filteredData = data.filter(item => item.Sp.toLowerCase().includes(searchText) || item.Title.toLowerCase().includes(searchText));
                data = filteredData; // Update data with filtered data
                currentPage = 1; // Reset to first page
                displayData(currentPage); // Display first page of filtered data
                generatePagination(); // Update pagination controls
            };

            // Add event listener to search input
            searchInput.addEventListener('input', filterTable);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
