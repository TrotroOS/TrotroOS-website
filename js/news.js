(function () {
  const FALLBACK_URL = '/data/news-fallback.json';

  function getPublicConfig() {
    const cfg = window.__TROTROOS_PUBLIC__ || {};
    return {
      supabaseUrl: (cfg.supabaseUrl || '').replace(/\/$/, ''),
      supabaseAnonKey: cfg.supabaseAnonKey || '',
    };
  }

  function formatDate(iso) {
    if (!iso) return '';
    try {
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso.slice(0, 10);
    }
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function fetchFromSupabase(limit) {
    const { supabaseUrl, supabaseAnonKey } = getPublicConfig();
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase public config missing');
    }

    const params = new URLSearchParams({
      select: 'slug,title,summary,tags,published_at,body',
      published: 'eq.true',
      order: 'published_at.desc',
    });
    if (limit) params.set('limit', String(limit));

    const res = await fetch(`${supabaseUrl}/rest/v1/site_news?${params}`, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Supabase news fetch failed (${res.status})`);
    }

    return res.json();
  }

  async function fetchFallback(limit) {
    const res = await fetch(FALLBACK_URL);
    if (!res.ok) throw new Error('Fallback news unavailable');
    const items = await res.json();
    return limit ? items.slice(0, limit) : items;
  }

  async function loadNews(limit) {
    try {
      return await fetchFromSupabase(limit);
    } catch (err) {
      console.warn('[TrotroOS news]', err.message, '— using fallback JSON');
      return fetchFallback(limit);
    }
  }

  function renderTags(tags) {
    if (!tags?.length) return '';
    return `<div class="news-tags">${tags
      .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join('')}</div>`;
  }

  function renderHomeItem(item) {
    const date = formatDate(item.published_at);
    const iso = item.published_at ? item.published_at.slice(0, 10) : '';
    return `
      <article class="news-item">
        <time datetime="${escapeHtml(iso)}">${escapeHtml(date)}</time>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </article>`;
  }

  function renderFullItem(item) {
    const date = formatDate(item.published_at);
    const iso = item.published_at ? item.published_at.slice(0, 10) : '';
    const body =
      item.body && item.body.trim()
        ? `<div class="news-body">${escapeHtml(item.body)}</div>`
        : '';
    return `
      <article class="news-card" id="${escapeHtml(item.slug)}">
        <time class="news-date" datetime="${escapeHtml(iso)}">${escapeHtml(date)}</time>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        ${body}
        ${renderTags(item.tags)}
      </article>`;
  }

  function setStatus(container, message, isError) {
    container.innerHTML = `<p class="news-status${isError ? ' news-status--error' : ''}">${escapeHtml(message)}</p>`;
  }

  async function mountFeed(container) {
    const limit = container.dataset.newsLimit
      ? Number.parseInt(container.dataset.newsLimit, 10)
      : null;
    const layout = container.dataset.newsLayout || 'home';

    setStatus(container, 'Loading updates…', false);

    try {
      const items = await loadNews(limit);
      if (!items.length) {
        setStatus(container, 'No updates published yet. Check back soon.', false);
        return;
      }

      const html =
        layout === 'full'
          ? items.map(renderFullItem).join('')
          : items.map(renderHomeItem).join('');

      container.innerHTML = html;
      container.classList.add('is-loaded');
    } catch (err) {
      setStatus(container, 'Could not load updates right now. Please try again later.', true);
      console.error('[TrotroOS news]', err);
    }
  }

  document.querySelectorAll('[data-news-feed]').forEach(mountFeed);
})();
