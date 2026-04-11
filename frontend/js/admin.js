const token = localStorage.getItem('adminToken');
if (!token) window.location.href = 'login.html';
document.getElementById('admin-name').textContent = localStorage.getItem('adminName') || 'Admin';

let currentTab = 'pending';

function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminName');
  window.location.href = 'login.html';
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  loadQueue();
}

async function loadQueue() {
  const list = document.getElementById('queue-list');
  list.innerHTML = '<p class="loading">Loading...</p>';
  const endpoint = currentTab === 'pending' ? '/api/admin/submissions/pending' : '/api/admin/submissions/all';

  try {
    const res = await fetch('https://market-databank-1aws.onrender.com' + endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    if (!data.length) { list.innerHTML = '<p class="muted">No submissions here.</p>'; return; }

    list.innerHTML = data.map(s => `
      <div class="admin-card" id="card-${s._id}">
        <div class="admin-card-header">
          <div>
            <strong>${s.title}</strong>
            <span class="tag" style="margin-left:8px">${s.category}</span>
            ${statusBadge(s.status)}
          </div>
          <span class="muted" style="font-size:12px">${formatDate(s.createdAt)}</span>
        </div>
        <p class="muted">${s.description}</p>
        <div class="meta-row">
          <span class="muted">File: ${s.fileName}</span>
          <span class="muted">Size: ${formatSize(s.fileSize)}</span>
          <span class="muted">Email: ${s.contributorEmail || 'N/A'}</span>
        </div>
        ${s.status === 'pending' ? `
        <div class="admin-actions">
          <input type="text" placeholder="Tags (comma separated)" id="tags-${s._id}" style="flex:1"/>
          <textarea placeholder="Feedback (required if rejecting)" id="feedback-${s._id}" rows="2"></textarea>
          <div style="display:flex;gap:8px">
            <button class="btn-success" onclick="review('${s._id}', 'approved')">Approve</button>
            <button class="btn-danger" onclick="review('${s._id}', 'rejected')">Reject</button>
          </div>
        </div>` : ''}
      </div>`).join('');
  } catch (err) {
    list.innerHTML = `<p class="alert-error">${err.message}</p>`;
  }
}

async function review(id, decision) {
  const feedback = document.getElementById(`feedback-${id}`)?.value || '';
  const tagsRaw = document.getElementById(`tags-${id}`)?.value || '';
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  if (decision === 'rejected' && !feedback) {
    alert('Please provide feedback before rejecting.');
    return;
  }

  try {
    const res = await fetch(`https://market-databank-1aws.onrender.com/api/admin/submissions/${id}/review`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ decision, feedback, tags })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    loadQueue();
  } catch (err) {
    alert(err.message);
  }
}

loadQueue();