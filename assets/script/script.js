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
                        <button class="btn btn-success" style="margin-left: 5px;" type="button" data-link="${item.Iframe}/edit">
                            <i class="glyphicon glyphicon-link" style="font-size: 30px;"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.btn-success').forEach(button => {
                button.addEventListener('click', function() {
                    const link = this.getAttribute('data-link');
                    const iframe = document.createElement('iframe');
                    iframe.src = link;
                    iframe.width = '100%';
                    iframe.height = '500px';
                    document.body.appendChild(iframe);
                });
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
