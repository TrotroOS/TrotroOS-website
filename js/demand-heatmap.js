(function () {
  const POLL_MS = 30_000;
  const DEMAND_HIGH = 8;
  const DEMAND_MEDIUM = 4;

  const LEVEL_COLORS = {
    high: '#E04A00',
    medium: '#C9A227',
    low: '#14B8A6',
  };

  /** Approximate positions on kumasi-corridor.svg (viewBox 1200×600). */
  const HUB_POSITIONS = {
    'tech junction': { x: 120, y: 500 },
    kejetia: { x: 220, y: 420 },
    knust: { x: 320, y: 460 },
    'knust campus': { x: 320, y: 460 },
    ayeduase: { x: 1050, y: 500 },
    adum: { x: 180, y: 380 },
    asokwa: { x: 520, y: 480 },
    santasi: { x: 720, y: 460 },
    bantama: { x: 400, y: 440 },
  };

  const FALLBACK_ROUTES = [
    { origin: 'Tech Junction', destination: 'Ayeduase', waiting_count: 6 },
    { origin: 'Kejetia', destination: 'KNUST Campus', waiting_count: 4 },
    { origin: 'Tech Junction', destination: 'KNUST Campus', waiting_count: 3 },
    { origin: 'Ayeduase', destination: 'Tech Junction', waiting_count: 2 },
  ];

  function normalizePlace(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  function hubPosition(place) {
    const key = normalizePlace(place);
    for (const [token, pos] of Object.entries(HUB_POSITIONS)) {
      if (key.includes(token) || token.includes(key)) return pos;
    }
    return null;
  }

  function demandLevel(count) {
    if (count >= DEMAND_HIGH) return 'high';
    if (count >= DEMAND_MEDIUM) return 'medium';
    return 'low';
  }

  function routeLabel(route) {
    const waiting = Number(route.waiting_count ?? route.waiting ?? 0);
    return `${route.origin} → ${route.destination} · ${waiting} waiting`;
  }

  function buildHeatPoints(routes) {
    const hubs = new Map();

    routes.forEach(route => {
      const waiting = Number(route.waiting_count ?? route.waiting ?? 0);
      if (waiting <= 0) return;

      [route.origin, route.destination].forEach(place => {
        const pos = hubPosition(place);
        if (!pos) return;

        const key = `${pos.x}:${pos.y}`;
        const existing = hubs.get(key) ?? {
          x: pos.x,
          y: pos.y,
          label: place,
          waiting: 0,
        };
        existing.waiting += waiting;
        hubs.set(key, existing);
      });
    });

    const points = [...hubs.values()];
    const maxWaiting = Math.max(...points.map(point => point.waiting), 1);

    return points
      .map(point => ({
        ...point,
        level: demandLevel(point.waiting),
        intensity: point.waiting / maxWaiting,
      }))
      .sort((a, b) => b.waiting - a.waiting);
  }

  function renderSvg(svg, points) {
    if (!svg) return;
    svg.innerHTML = '';

    points.forEach(point => {
      const color = LEVEL_COLORS[point.level] ?? LEVEL_COLORS.low;
      const radius = 18 + point.intensity * 42;
      const fillOpacity = 0.14 + point.intensity * 0.28;
      const strokeOpacity = 0.35 + point.intensity * 0.4;

      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      group.setAttribute('role', 'presentation');

      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', String(point.x));
      pulse.setAttribute('cy', String(point.y));
      pulse.setAttribute('r', String(radius + 10));
      pulse.setAttribute('fill', 'none');
      pulse.setAttribute('stroke', color);
      pulse.setAttribute('stroke-width', '1.5');
      pulse.setAttribute('opacity', String(strokeOpacity * 0.45));
      pulse.classList.add('demand-pulse');

      const fill = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      fill.setAttribute('cx', String(point.x));
      fill.setAttribute('cy', String(point.y));
      fill.setAttribute('r', String(radius));
      fill.setAttribute('fill', color);
      fill.setAttribute('fill-opacity', String(fillOpacity));
      fill.setAttribute('stroke', color);
      fill.setAttribute('stroke-width', '2');
      fill.setAttribute('stroke-opacity', String(strokeOpacity));

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', String(point.x));
      label.setAttribute('y', String(point.y - radius - 8));
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('fill', '#fff');
      label.setAttribute('font-size', '12');
      label.setAttribute('font-weight', '600');
      label.textContent = String(point.waiting);

      group.appendChild(pulse);
      group.appendChild(fill);
      group.appendChild(label);
      svg.appendChild(group);
    });
  }

  function renderRouteList(listEl, routes, limit) {
    if (!listEl) return;
    listEl.innerHTML = '';

    routes.slice(0, limit).forEach(route => {
      const waiting = Number(route.waiting_count ?? route.waiting ?? 0);
      const level = demandLevel(waiting);
      const li = document.createElement('li');
      li.className = `demand-route demand-route--${level}`;
      li.innerHTML = `<span>${route.origin} → ${route.destination}</span><span class="demand-route__count">${waiting}</span>`;
      listEl.appendChild(li);
    });
  }

  function renderTicker(tickerEl, routes) {
    if (!tickerEl) return;
    tickerEl.innerHTML = '';

    routes.slice(0, 5).forEach(route => {
      const li = document.createElement('li');
      li.textContent = routeLabel(route);
      tickerEl.appendChild(li);
    });
  }

  async function fetchDemand() {
    const cfg = window.__TROTROOS_PUBLIC__;
    if (!cfg?.supabaseUrl || !cfg?.supabaseAnonKey) {
      return { routes: FALLBACK_ROUTES, live: false };
    }

    const url = `${cfg.supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/get_public_queue_demand`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: cfg.supabaseAnonKey,
        Authorization: `Bearer ${cfg.supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    });

    if (!res.ok) throw new Error(`Demand fetch failed (${res.status})`);

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { routes: FALLBACK_ROUTES, live: false };
    }

    return {
      routes: data.sort((a, b) => Number(b.waiting_count ?? 0) - Number(a.waiting_count ?? 0)),
      live: true,
    };
  }

  function setStatus(statusEl, liveEl, live, routeCount) {
    if (statusEl) {
      statusEl.textContent = live
        ? `${routeCount} corridor${routeCount === 1 ? '' : 's'} with passengers waiting`
        : 'Sample demand — open the app for live counts';
    }
    if (liveEl) liveEl.hidden = !live;
  }

  async function refresh() {
    const svg = document.querySelector('[data-demand-svg]');
    const routesEl = document.querySelector('[data-demand-routes]');
    const tickerEl = document.querySelector('[data-corridor-ticker]');
    const statusEl = document.querySelector('[data-demand-status]');
    const liveEl = document.querySelector('[data-demand-live]');

    try {
      const { routes, live } = await fetchDemand();
      const points = buildHeatPoints(routes);
      renderSvg(svg, points);
      renderRouteList(routesEl, routes, 8);
      renderTicker(tickerEl, routes);
      setStatus(statusEl, liveEl, live, routes.length);
    } catch {
      const points = buildHeatPoints(FALLBACK_ROUTES);
      renderSvg(svg, points);
      renderRouteList(routesEl, FALLBACK_ROUTES, 8);
      renderTicker(tickerEl, FALLBACK_ROUTES);
      setStatus(statusEl, liveEl, false, FALLBACK_ROUTES.length);
    }
  }

  const panel = document.querySelector('[data-demand-panel]');
  if (!panel) return;

  refresh();
  window.setInterval(refresh, POLL_MS);
})();
