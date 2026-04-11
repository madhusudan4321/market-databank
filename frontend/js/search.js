let debounceTimer;

async function runSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const q = document.getElementById('search-input').value.trim();
    const category = document.getElementById('cat-filter').value;
    const grid = document.getElementById('results-grid');
    const count = document.getElementById('result-count');

    let url = '/api/search?';
    if (q) url += `q=${encodeURIComponent(q)}&`;
    if (category) url += `category=${encodeURIComponent(category)}`;

    grid.innerHTML = '<p class="loading">Searching...</p>';
    const results = await apiFetch(url);
    count.textContent = `${results.length} dataset${results.length !== 1 ? 's' : ''} found`;

    if (!results.length) {
      grid.innerHTML = '<p class="muted">No datasets match your search.</p>';
      return;
    }
    grid.innerHTML = results.map(d => datasetCard(d)).join('');
  }, 300);
}

runSearch();