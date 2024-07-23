// Function to parse date string into Date object
export function parseDate(dateString) {
    if (!dateString) return null;

    // Attempt to parse the date using different methods
    let parsedDate = null;

    // Handle the Google Sheets date format
    const match = dateString.match(/Date\((\d+),(\d+),(\d+)\)/);
    if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);
        parsedDate = new Date(year, month, day);
    } else {
        // Try to parse the date using the standard JavaScript Date constructor
        parsedDate = new Date(dateString);
    }

    return parsedDate;
}

//Fetch Proposed/Approved Measure Data
export async function fetchDataProposed() {
    const id = '1EDT5BAlpd5Ns1Y25xJEPSlljgF3Tu-SoQdge0Xfltko';
    const gid = '111842730';
    const url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;

    try {
        const response = await fetch(url);
        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));

        // Extract rows from the JSON response
        const rows = json.table.rows;
        const items = rows.map(row => {
            const cells = row.c;
            return {
                proposed: cells[0] ? cells[0].v : "No Data",
                title: cells[1] ? cells[1].v : "No Data",
                introducer: cells[2] ? cells[2].v : "No Data",
                dockdate: parseDate(cells[3] ? cells[3].v : null),
                status: cells[4] ? cells[4].v : "No Data",
                spno: cells[5] ? cells[5].v : "No Data",
                FrReading: cells[6] ? cells[6].v : "No Data",
                FrDate: parseDate(cells[7] ? cells[7].v : null),
                FrRemarks: cells[8] ? cells[8].v : "No Data",
                ScndReading: cells[9] ? cells[9].v : "No Data",
                ScndDate: parseDate(cells[10] ? cells[10].v : null),
                ScndRemarks: cells[11] ? cells[11].v : "No Data",
                ThReading: cells[12] ? cells[12].v : "No Data",
                ThDate: parseDate(cells[13] ? cells[13].v : null),
                ThRemarks: cells[14] ? cells[14].v : "No Data",
                Pdflink: cells[15] ? cells[15].v : "No Data",
                Pages: cells[16] ? cells[16].v : "No Data",
                Title: cells[17] ? cells[17].v : "No Data",
                Year: cells[18] ? cells[18].v : "No Data",
            };
        });

        return items;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export async function fetchDataAgenda() {
    const id = '1B8AAG12k6wT4aSrKHrAVvDZJh3pL7N22qNaZDAq-fro';
    const gid = '837868776';
    const url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;

    try {
        const response = await fetch(url);
        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));

        // Extract rows from the JSON response
        const rows = json.table.rows;
        const items = rows.map(row => {
            const cells = row.c;
            return {
                fname: cells[0] ? cells[0].v : "No Data",
                dateuploaded: parseDate(cells[1] ? cells[1].v : null),
                durl: cells[2] ? cells[2].v : "No Data",
                rname: cells[3] ? cells[3].v : "No Data",
                sessdate: parseDate(cells[4] ? cells[4].v : null),
                typesess: cells[5] ? cells[5].v : "No Data",
            };
        });

        return items;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

//Fetch Committee Data
export async function fetchCommitteeData() {
    const id = '1EDT5BAlpd5Ns1Y25xJEPSlljgF3Tu-SoQdge0Xfltko';
    const gid = '1231708625';
    const url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const committeeData = rows.map(row => {
            const cells = row.c;
            return {
                proposedcomm: cells[0] ? cells[0].v : 'No Data',
                commref: cells[1] ? cells[1].v : 'No Data',
                commrep: cells[2] ? cells[2].v : 'No Data',
                commdate: parseDate(cells[3] ? cells[3].v : null)
            };
        });

        return committeeData;
    } catch (error) {
        console.error('Error fetching committee data:', error);
        return []; // Return an empty array or handle the error as per your application's logic
    }
}

    // Fetch Councilors Data
export async function fetchCouncilorsData() {
    const id = '1DthV16mfES_GY_688M_w11ow0PWhUIGEyioYA08Afx4';
    const gid = '0';
    const url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;

    try {
        console.log('Fetching councilor data from:', url); // Log the URL being fetched
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.text();
        console.log('Raw data received:', data.substring(47).slice(0, -2)); // Log the raw data

        const json = JSON.parse(data.substring(47).slice(0, -2));
        const rows = json.table.rows;

        const CouncilorData = rows.map(row => {
            const cells = row.c;
            return {
                idcoun: cells[0] ? cells[0].v : 'No Data',
                counName: cells[1] ? cells[1].v : 'No Data',
                council: cells[2] ? cells[2].v : 'No Data',
                District: cells[3] ? cells[3].v : 'No Data',
            };
        });

        console.log('Fetched councilor data:', CouncilorData); // Log the data
        return CouncilorData;
    } catch (error) {
        console.error('Error fetching councilor data:', error);
        return []; // Return an empty array or handle the error as per your application's logic
    }
}

    // Fetch CommitteeChair Data
    export async function fetchCommitteeChairData() {
        const id = '1DthV16mfES_GY_688M_w11ow0PWhUIGEyioYA08Afx4';
        const gid = '1299120487';
        const url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?tqx=out:json&tq&gid=' + gid;
    
        try {
            console.log('Fetching councilor data from:', url); // Log the URL being fetched
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.text();
            console.log('Raw data received:', data.substring(47).slice(0, -2)); // Log the raw data
    
            const json = JSON.parse(data.substring(47).slice(0, -2));
            const rows = json.table.rows;
    
            const CommChairData = rows.map(row => {
                const cells = row.c;
                return {
                    idchar: cells[0] ? cells[0].v : 'No Data',
                    committeeName: cells[1] ? cells[1].v : 'No Data',
                    committeeChair: cells[2] ? cells[2].v : 'No Data',
                };
            });
    
            console.log('Fetched councilor data:', CommChairData); // Log the data
            return CommChairData;
        } catch (error) {
            console.error('Error fetching councilor data:', error);
            return []; // Return an empty array or handle the error as per your application's logic
        }
    }



