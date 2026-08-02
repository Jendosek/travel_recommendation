fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {

        document.getElementById('searchBtn').addEventListener('click', () => {
            const input = document.getElementById('searchInput').value.trim().toLowerCase();
            let results = [];

            if (input === 'beach' || input === 'beaches') {
                results = data.beaches;
            } else if (input === 'temple' || input === 'temples') {
                results = data.temples;
            } else if (input === 'country' || input === 'countries') {
                data.countries.forEach(country => {
                    results = [...results, ...country.cities];
                });
            } else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(input)) {
                        results = [...results, ...country.cities];
                    }
                });
            }

            document.querySelector('.hero').classList.add('hidden');
            displayResults(results);
        });

        document.getElementById('clearBtn').addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            document.getElementById('resultsContainer').innerHTML = '';
            document.querySelector('.hero').classList.remove('hidden');
        });

    })
    .catch(error => console.error('Error:', error));


function displayResults(results) {
    const container = document.getElementById('resultsContainer');

    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">No results found.</p>';
        return;
    }

    container.innerHTML = `
        <h2 class="results-title">Search Results</h2>
        <div class="results-grid">
            ${results.map(item => `
                <div class="result-card">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="result-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
