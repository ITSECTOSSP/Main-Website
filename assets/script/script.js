document.addEventListener('DOMContentLoaded', () => {
    fetch('https://itsectossp.github.io/jsonapi/csvjson.json')
        .then(response => response.json())
        .then(data => {
            // Assuming the JSON data is an array of objects, use the first item for the card
            const item = data[0];

            // Update the card elements with JSON data
            document.querySelector('.docket').innerText = item.Type;
            document.querySelector('.dock-date').innerText = item['Date Enact/Adopt'];
            document.querySelector('.title').innerText = item.Title;

            // Update the button link if needed (assuming you want to use the Iframe link)
            const button = document.querySelector('.link-btn');
            button.addEventListener('click', () => {
                window.open(item.Iframe, '_blank');
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
