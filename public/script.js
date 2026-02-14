async function loadBreeds() {
    const listElement = document.getElementById('breed-list');
    try {
        const response = await fetch('/get_dogs');
        if (!response.ok) throw new Error("could not get dogs");
        const breeds = await response.json();

        listElement.innerHTML ="";

        breeds.forEach(dog => {
            const li = document.createElement("li");
            li.textContent = dog.attributes.name;

            li.addEventListener("click", () => {
                showDetails(dog.id);
            });

            listElement.appendChild(li);
        });
    } catch (err) {
        listElement.innerHTML = `<p class="error">Error: ${err.message}</p>`;
    }
}
async function showDetails(id) {
    const contentArea = document.getElementById('breed-content');
    contentArea.innerHTML = "<h3>Fetching puppy profile...</h3>";

    try {
        const response = await fetch(`/api/dog/${id}`);
        if (!response.ok) throw new Error("Could not load breed details.");

        const dog = await response.json();

        contentArea.innerHTML = `
            <h2 style="color: #ff6600">${dog.name}</h2>
            <p><strong>Description:</strong> ${dog.description}</p>
            <hr>
            <p><strong>Life Span:</strong> ${dog.life.min} - ${dog.life.max} years</p>
            <p><strong>Weight (M):</strong> ${dog.male_weight.min}kg - ${dog.male_weight.max}kg</p>
        `;
    } catch (err) {
        contentArea.innerHTML = `<p class="error">${err.message}</p>`;
    }
}
async function loadGroups() {
    const listElement = document.getElementById('breed-list');
    listElement.innerHTML = "<li>Loading Groups...</li>";

    try {
        const response = await fetch('/get_groups');
        const groups = await response.json();

        listElement.innerHTML = "";
        groups.forEach(group => {
            const li = document.createElement("li");
            li.textContent = group.attributes.name;

            li.addEventListener("click", () => {
                document.getElementById('breed-content').innerHTML = `
                    <h2>${group.attributes.name}</h2>
                    <p>This is a specific category of dog breeds recognized by the Dog API.</p>
                `;
            });
            listElement.appendChild(li);
        });
    } catch (err) {
        listElement.innerHTML = "<li>Error loading groups.</li>";
    }
}


async function loadFacts() {
    const contentArea = document.getElementById('breed-content');
    contentArea.innerHTML = "<h3>Gathering trivia...</h3>";

    try {
        const response = await fetch('/get_facts');
        const facts = await response.json();

        let html = "<h2>Random Dog Facts</h2><ul>";
        facts.forEach(fact => {
            html += `<li>${fact.attributes.body}</li>`;
        });
        html += "</ul>";

        contentArea.innerHTML = html;
    } catch (err) {
        contentArea.innerHTML = "<h3>Couldn't find any facts right now.</h3>";
    }
}
loadBreeds();