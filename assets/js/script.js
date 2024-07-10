function updateDateTime() {
            const now = new Date();

            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayOfWeek = days[now.getDay()];
            
            const day = String(now.getDate()).padStart(2, '0');
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = months[now.getMonth()];
            const year = now.getFullYear();
            
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            const formattedHours = String(hours).padStart(2, '0');
            
            const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
            const formattedTime = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
            
            document.getElementById('datetime').textContent = `${formattedDate} ${formattedTime}`;
        }

        // Update the date and time every second
        setInterval(updateDateTime, 1000);

        // Initial call to display the date and time immediately
        updateDateTime();