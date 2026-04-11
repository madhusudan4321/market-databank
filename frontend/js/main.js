const API = 'http://localhost:5000';

async function apiFetch(endpoint) {
  try {
    const res = await fetch(API + endpoint);
    return await res.json();
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

function formatSize(bytes) {
  if (!bytes) return 'N/A';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusBadge(status) {
  const map = { pending: 'badge-warning', approved: 'badge-success', rejected: 'badge-error' };
  return `<span class="badge ${map[status] || ''}">${status}</span>`;
}

function datasetCard(d) {
  return `
    <div class="dataset-card" onclick="window.location='dataset.html?id=${d._id}'">
      <div class="card-top">
        <span class="tag">${d.category}</span>
        <span class="muted" style="font-size:12px">${formatDate(d.createdAt)}</span>
      </div>
      <h3>${d.title}</h3>
      <p class="muted">${d.description.slice(0, 100)}${d.description.length > 100 ? '...' : ''}</p>
      <div class="card-footer">
        <span class="muted">${d.fileName}</span>
        <span class="muted">${d.downloads} downloads</span>
      </div>
    </div>`;
}