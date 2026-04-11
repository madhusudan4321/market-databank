async function submitData() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value;
    const email = document.getElementById('email').value.trim();
    const file = document.getElementById('file').files[0];
    const msg = document.getElementById('form-message');
    const btn = document.getElementById('submit-btn');
  
    if (!title || !description || !category || !file) {
      msg.innerHTML = '<div class="alert-error">Please fill all required fields and select a file.</div>';
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('contributorEmail', email);
    formData.append('file', file);
  
    btn.disabled = true;
    btn.textContent = 'Submitting...';
  
    try {
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      msg.innerHTML = `<div class="alert-success">${data.message}</div>`;
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('category').value = '';
      document.getElementById('email').value = '';
      document.getElementById('file').value = '';
    } catch (err) {
      msg.innerHTML = `<div class="alert-error">${err.message}</div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit Dataset';
    }
  }