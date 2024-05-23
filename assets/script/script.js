document.addEventListener('DOMContentLoaded', () => {
    fetch('https://itsectossp.github.io/jsonapi/csvjson.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cards-container');

            data.forEach(item => {
                // Create card element
                const card = document.createElement('div');
                card.className = 'card measure-card-search';

                // Create card body
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body measure-card-body-search';

                // Create row for docket
                const rowDock = document.createElement('div');
                rowDock.className = 'row row-dock-meas';
                const colDock = document.createElement('div');
                colDock.className = 'col col-dock-meas';
                const docket = document.createElement('h4');
                docket.className = 'docket';
                docket.style.textAlign = 'center';
                docket.innerText = item.Type;
                const dockDate = document.createElement('h6');
                dockDate.className = 'dock-date';
                dockDate.innerText = item['Date Enact/Adopt'];
                colDock.appendChild(docket);
                colDock.appendChild(dockDate);
                rowDock.appendChild(colDock);

                // Create row for title
                const rowTitle = document.createElement('div');
                rowTitle.className = 'row row-title-meas';
                const colTitle = document.createElement('div');
                colTitle.className = 'col';
                colTitle.style.textAlign = 'justify';
                const title = document.createElement('p');
                title.className = 'title';
                title.innerText = item.Title;
                colTitle.appendChild(title);
                rowTitle.appendChild(colTitle);

                // Create row for button
                const rowLink = document.createElement('div');
                rowLink.className = 'row row-link-meas';
                const colLink = document.createElement('div');
                colLink.className = 'col';
                const button = document.createElement('button');
                button.className = 'btn link-btn';
                button.type = 'button';
                button.style.borderStyle = 'none';
                button.innerText = 'READ MORE';
                button.addEventListener('click', () => {
                    window.open(item.Iframe, '_blank');
                });
                colLink.appendChild(button);
                rowLink.appendChild(colLink);

                // Append rows to card body
                cardBody.appendChild(rowDock);
                cardBody.appendChild(rowTitle);
                cardBody.appendChild(rowLink);

                // Append card body to card
                card.appendChild(cardBody);

                // Append card to container
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});