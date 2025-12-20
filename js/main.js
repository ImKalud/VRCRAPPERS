async function loadList() {
  try {
    const res = await fetch('data/singers.json');
    const data = await res.json();

    const list = document.getElementById('list');
    const search = document.getElementById('search');

    function createCard(s) {
      const a = document.createElement('a');
      a.className = 'card';
      a.href = `singer.html?id=${encodeURIComponent(s.id)}`;
      a.setAttribute('aria-label', s.name || 'singer');

      const img = document.createElement('img');
      img.src = s.photo || 'assets/images/1.png';
      img.alt = s.name || '';

      const h2 = document.createElement('h2');
      h2.textContent = s.name || '';

      const p = document.createElement('p');
      p.textContent = s.company || '';

      a.appendChild(img);
      a.appendChild(h2);
      a.appendChild(p);
      return a;
    }

    function render(items) {
      list.innerHTML = '';
      const frag = document.createDocumentFragment();
      items.forEach(s => frag.appendChild(createCard(s)));
      list.appendChild(frag);
    }

    render(data);

    search.addEventListener('input', () => {
      const v = search.value.trim().toLowerCase();
      if (!v) return render(data);
      render(data.filter(s => (s.name || '').toLowerCase().includes(v)));
    });

  } catch (err) {
    console.error('Failed to load singers', err);
    const list = document.getElementById('list');
    if (list) list.textContent = 'Failed to load singers.';
  }
}

loadList();
