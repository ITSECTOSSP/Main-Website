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
            data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
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
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
