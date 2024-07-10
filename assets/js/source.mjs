export async function fetchDataProposed() {
    var id = '1EDT5BAlpd5Ns1Y25xJEPSlljgF3Tu-SoQdge0Xfltko';
    var gid = '111842730';
    var url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;

    console.log('Fetching data from Google Sheets...');

    try {
        const response = await fetch(url);
        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));
        console.log('Fetched data:', json);

        // Extract rows from the JSON response
        const rows = json.table.rows;
        const items = rows.map(row => {
            const cells = row.c;
            return {
                proposed: cells[0] ? cells[0].v : "No Data",
                title: cells[1] ? cells[1].v : "No Data",
                introducer: cells[2] ? cells[2].v : "No Data",
                pdf: cells[3] ? cells[3].v : "No Data",
                spno: cells[4] ? cells[4].v : "No Data",
                year: cells[5] ? cells[5].v : "No Data",
                FrReading: cells[6] ? cells[6].v : "No Data",
                FrDate: parseDate(cells[7] ? cells[7].v : null),
                FrRemarks: cells[8] ? cells[8].v : "No Data",
                ScndReading: cells[9] ? cells[9].v : "No Data",
                ScndDate: parseDate(cells[10] ? cells[10].v : null),
                ScndRemarks: cells[11] ? cells[11].v : "No Data",
                ThReading: cells[12] ? cells[12].v : "No Data",
                ThDate: parseDate(cells[13] ? cells[13].v : null),
                ThRemarks: cells[14] ? cells[14].v : "No Data",
            };
        });

        console.log('Processed items:', items);

        return items;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    // Function to parse date string into Date object
    function parseDate(dateString) {
        if (!dateString) return null;
        const match = dateString.match(/Date\((\d+),(\d+),(\d+)\)/);
        if (match) {
            const year = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1;
            const day = parseInt(match[3], 10);
            return new Date(year, month, day);
        }
        return null;
    }
}

export async function fetchDataAgenda() {
    var id = '1B8AAG12k6wT4aSrKHrAVvDZJh3pL7N22qNaZDAq-fro';
    var gid = '0';
    var url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;

    console.log('Fetching data from Google Sheets...');

    try {
        const response = await fetch(url);
        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));
        console.log('Fetched data:', json);

        // Extract rows from the JSON response
        const rows = json.table.rows;
        const items = rows.map(row => {
            const cells = row.c;
            return {
                fname: cells[0] ? cells[0].v : "No Data",
                Prntfolder: cells[1] ? cells[1].v : "No Data",
                datecreated: parseDate(cells[2] ? cells[2].v : null),
                dateuploaded: parseDate(cells[3] ? cells[3].v : null),
                durl: cells[4] ? cells[4].v : "No Data"
            };
        });

        console.log('Processed items:', items);

        return items;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    // Function to parse date string into Date object
    function parseDate(dateString) {
        if (!dateString) return null;
        const match = dateString.match(/Date\((\d+),(\d+),(\d+)\)/);
        if (match) {
            const year = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1;
            const day = parseInt(match[3], 10);
            return new Date(year, month, day);
        }
        return null;
    }
}
