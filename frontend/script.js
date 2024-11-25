async function fetchData() {
    try{
        const response = await fetch("http://localhost:8000/medicines");
        if(!response.ok) {
            throw new Error("Failed to fetch data")
        }
        const data = await response.json();
        displayData(data.medicines);
    } catch (error){
        console.error("Error fetching data:", error);

    }

    function displayData(data) {
        const tblBody = document.getElementById("medicine-body");
        tblBody.innerHTML = "";
        data.forEach((medicine) => {
            const row = document.createElement("tr");
            const name = document.createElement("td");
            name.textContent = medicine.name || "N/A";
            row.appendChild(name);
            const price = document.createElement("td");
            price.textContent = medicine.price !== null ? `$${medicine.price.toFixed(2)}` : "N/A";
            row.appendChild(price)
            tblBody.appendChild(row);

        });
    }

}

fetchData();

document.getElementById("medicine-entry-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const form = new FormData(event.target);
    const feedback = document.getElementById("feedback");


    try {
        const response = await fetch("http://localhost:8000/create", {
            method: "POST",
            body: form,
        })
        if (!response.ok) {
            throw new Error(`Could not add medicine: ${response.statusText}` )
        }

        event.target.reset();
        feedback.textContent = "Success! Refresh the page";
        feedback.style.color = "green";

    }catch (error) {
        console.error("Error", error);
        showFeedback("Error!", "error");
    }

    feedback.style.display = "block";

});

