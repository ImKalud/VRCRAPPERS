const params = new URLSearchParams(location.search);
const id = params.get("id");

async function loadSinger() {
  try {
    const res = await fetch('data/singers.json');
    const data = await res.json();
    const singer = data.find(s => String(s.id) === String(id));
    if (!singer) {
      document.getElementById('profile').textContent = 'Singer not found.';
      return;
    }

    const profile = document.getElementById('profile');
    profile.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'profile-inner';

    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = singer.photo || 'assets/images/1.png';
    img.alt = singer.name || 'avatar';

    const info = document.createElement('div');
    info.className = 'profile-info';

    const h1 = document.createElement('h1');
    h1.textContent = singer.name || '';

    const org = document.createElement('p');
    org.innerHTML = '<strong>Organization：</strong>' + (singer.company || '—');

    const socialP = document.createElement('p');
    if (singer.social && Object.keys(singer.social).length) {
      const entries = Object.entries(singer.social);
      entries.forEach(( [k, v], idx) => {
        const a = document.createElement('a');
        a.href = v;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = k;
        socialP.appendChild(a);
        if (idx < entries.length - 1) socialP.appendChild(document.createTextNode(' · '));
      });
    } else {
      socialP.textContent = 'No social links.';
      socialP.style.color = 'var(--muted)';
    }

    info.appendChild(h1);
    info.appendChild(org);
    info.appendChild(socialP);

    container.appendChild(img);
    container.appendChild(info);
    profile.appendChild(container);
  } catch (err) {
    console.error(err);
    document.getElementById('profile').textContent = 'Loading singer failed.';
  }
}

loadSinger();
