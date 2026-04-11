async function loadSubmissions() {
    const email = document.getElementById('email-input').value.trim();
    const list = document.getElementById('submissions-list');
    if (!email) { list.innerHTML = '<p class="alert-error">Please enter your email.</p>'; return; }
  
    list.innerHTML = '<p class="loading">Loading...</p>';
    const data = await apiFetch(`/api/submissions/my?email=${encodeURIComponent(email)}`);
  
    if (!data.length) { list.innerHTML = '<p class="muted">No submissions found for this email.</p>'; return; }
  
    list.innerHTML = data.map(s => `
      <div class="card" style="margin-bottom:1rem">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>${s.title}</strong>
          ${statusBadge(s.status)}
        </div>
        <p class="muted" style="margin:6px 0">${s.category} — ${s.description.slice(0, 80)}...</p>
        <div style="display:flex;gap:1rem">
          <span class="muted" style="font-size:12px">File: ${s.fileName}</span>
          <span class="muted" style="font-size:12px">Submitted: ${formatDate(s.createdAt)}</span>
        </div>
      </div>`).join('');
  }