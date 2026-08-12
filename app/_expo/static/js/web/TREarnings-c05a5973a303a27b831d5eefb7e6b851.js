__d(
  function (g, r, i, a, m, e, _d) {
    var t = r(_d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(_d[8]).useNavigation)(),
          { user: f, profile: T } = (0, r(_d[9]).useAuth)(),
          { todayStats: h } = (0, r(_d[10]).useTRDriverRide)(),
          { colors: p } = (0, r(_d[11]).useTheme)(),
          { showToast: w } = (0, r(_d[12]).useToast)(),
          [b, v] = (0, o.useState)(!1),
          [E, _] = (0, o.useState)(null),
          [D, M] = (0, o.useState)(!0),
          [R, S] = (0, o.useState)(!1),
          [k, L] = (0, o.useState)('week'),
          [O, I] = (0, o.useState)(null),
          N = (0, o.useCallback)(async () => {
            if (!f?.id) return;
            const { data: t } = await (0, r(_d[13]).fetchDriverEarnings)(f.id);
            _(t);
          }, [f?.id]);
        (0, o.useEffect)(() => {
          f?.id ? N().finally(() => M(!1)) : M(!1);
        }, [f?.id, N]);
        const C = (0, o.useCallback)(async () => {
            (S(!0), await N(), S(!1));
          }, [N]),
          A = (0, r(_d[14]).estimateDriverNetFromGross)(h.earned ?? 0),
          P = Boolean(T?.momo_merchant_code),
          $ = (0, o.useMemo)(() => {
            if (!E)
              return { net: A.net, gross: A.gross, trips: h.rides ?? 0, eyebrow: 'This week' };
            if ('today' === k) {
              return {
                net: Math.max(E.todayNet ?? 0, A.net),
                gross: Math.max(E.todayGross ?? 0, A.gross),
                trips: Math.max(E.todayTrips ?? 0, h.rides ?? 0),
                eyebrow: 'Today',
              };
            }
            return 'month' === k
              ? {
                  net: E.monthNet ?? 0,
                  gross: E.monthGross ?? 0,
                  trips: E.monthTrips ?? 0,
                  eyebrow: 'Last 30 days',
                }
              : {
                  net: E.weekNet ?? 0,
                  gross: E.weekGross ?? 0,
                  trips: E.weekTrips ?? 0,
                  eyebrow: 'This week',
                };
          }, [E, k, A.net, A.gross, h.rides]),
          x = (0, o.useMemo)(
            () => (O && 'week' === k ? ((E?.weekDays ?? []).find(t => t.key === O) ?? null) : null),
            [O, k, E?.weekDays]
          ),
          G = x ? x.amount : $.net,
          j = x ? x.tripCount : $.trips,
          B = x ? (x.isToday ? 'Today' : x.label) : $.eyebrow,
          K = (0, o.useMemo)(() => {
            if (x) {
              const t = x.amount,
                o =
                  t > 0
                    ? Math.round((t / (1 - r(_d[15]).TR_COMMISSION_PERCENT / 100)) * 100) / 100
                    : 0;
              return (0, r(_d[14]).formatDriverEarnings)({ gross: o, net: t });
            }
            return (0, r(_d[14]).formatDriverEarnings)({ gross: $.gross, net: $.net });
          }, [x, $.gross, $.net]),
          F = (0, o.useMemo)(() => {
            let t = E?.recentTrips ?? [];
            if ('today' === k) {
              const o = (0, r(_d[16]).toLocalDateKey)(new Date());
              t = (0, r(_d[16]).filterActivityByDay)(t, o, t => t.ended_at);
            } else
              'week' === k && O && (t = (0, r(_d[16]).filterActivityByDay)(t, O, t => t.ended_at));
            return t.map(t => ({
              id: t.id,
              title: t.route_label || 'TrotroRide',
              subtitle: [
                null != t.passenger_count ? `${t.passenger_count} pax` : null,
                (0, r(_d[16]).formatActivityTime)(t.ended_at),
              ]
                .filter(Boolean)
                .join(' \xb7 '),
              amountLabel: (0, r(_d[16]).formatGhs)(t.earnings),
            }));
          }, [E?.recentTrips, k, O]),
          H = x ? 0 : Number($.net ?? 0),
          U =
            'today' === k
              ? (0, r(_d[16]).toLocalDateKey)(new Date())
              : 'month' === k
                ? (0, r(_d[16]).toLocalDateKey)(new Date()).slice(0, 7)
                : (E?.weekDays?.[0]?.key ?? (0, r(_d[16]).toLocalDateKey)(new Date()));
        if (D)
          return (0, c.jsx)(l.default, {
            title: 'Earnings',
            scroll: !0,
            gradientHeader: !0,
            children: (0, c.jsx)(s.default, { color: p.primary, style: { marginTop: 40 } }),
          });
        return (0, c.jsx)(l.default, {
          title: 'Earnings',
          subtitle: r(_d[19]).TROTRORIDE_COMMISSION_LABEL,
          scroll: !0,
          gradientHeader: !0,
          refreshControl: (0, c.jsx)(n.default, {
            refreshing: R,
            onRefresh: C,
            tintColor: p.primary,
          }),
          children: (0, c.jsx)(u.default, {
            period: k,
            onPeriodChange: t => {
              (L(t), 'week' !== t && I(null));
            },
            headlineAmount: G,
            headlineEyebrow: B,
            metaLine: `${j} ride${1 === j ? '' : 's'} \xb7 net after ${r(_d[15]).TR_COMMISSION_PERCENT}%`,
            takeHomeLine: `Gross ${K.grossLabel}`,
            weekDays: E?.weekDays ?? [],
            selectedDayKey: O,
            onSelectDay: I,
            cashOut: {
              ready: H > 0,
              label: H > 0 ? 'Net earnings ready for wallet' : 'No claimable net in this period',
              available: H,
              hint: 'Move available net to your wallet, then cash out to your personal MoMo number (24\u201348h).',
              ctaTitle: b ? 'Moving\u2026' : H > 0 ? 'Move available to wallet' : 'Open wallet',
              onCta:
                H > 0
                  ? async () => {
                      if (!f?.id || H <= 0 || b) return;
                      v(!0);
                      const o = y(f.id, k, U),
                        { error: s } = await (0, r(_d[17]).creditEarningsToWallet)(H, o, {
                          source: 'trotroride_earnings',
                          period: k,
                          periodKey: U,
                        });
                      (v(!1),
                        s
                          ? w({
                              type: 'error',
                              title: 'Could not move earnings',
                              message: s.message,
                            })
                          : (w({
                              type: 'success',
                              title: 'Moved to wallet',
                              message: `${(0, r(_d[16]).formatGhs)(H)} is ready to cash out.`,
                            }),
                            t.navigate(r(_d[18]).ROUTES.PROFILE_WALLET)));
                    }
                  : () => t.navigate(r(_d[18]).ROUTES.PROFILE_WALLET),
              secondaryCta: {
                label: P
                  ? `Merchant ${T.momo_merchant_code} \xb7 Edit profile`
                  : 'Add MoMo merchant code for receiving fares',
                onPress: () => t.navigate(r(_d[18]).ROUTES.PROFILE_EDIT),
              },
            },
            breakdown: [
              { label: 'Trip fares (gross)', value: K.grossLabel },
              {
                label: `Platform commission (${r(_d[15]).TR_COMMISSION_PERCENT}%)`,
                value: `- ${K.commissionLabel}`,
                tone: 'fee',
              },
              { label: 'Your net', value: K.netLabel, tone: 'net' },
            ],
            activity: F,
            emptyActivityText:
              'Go online and complete shared rides to see trip-by-trip earnings here.',
            tips: [...r(_d[19]).EARNINGS_TIPS, ...r(_d[19]).DRIVER_TIPS.slice(0, 2)],
            footer: (0, c.jsx)(d.default, {
              title: 'Back to dashboard',
              variant: 'secondary',
              compact: !0,
              onPress: () =>
                (0, r(_d[20]).navigateToMainTab)(t, r(_d[18]).ROUTES.TR_DRIVER_DASHBOARD),
            }),
          }),
        });
      }));
    var o = r(_d[1]),
      s = t(r(_d[2])),
      n = t(r(_d[3])),
      l = t(r(_d[4])),
      d = t(r(_d[5])),
      u = t(r(_d[6])),
      c = r(_d[7]);
    function y(t, o, s) {
      return `earn-tr-${t}-${o}-${s}`;
    }
  },
  1449,
  [
    1, 5, 373, 105, 1510, 672, 1706, 183, 382, 501, 1450, 381, 1386, 1773, 1625, 508, 691, 1491,
    682, 1641, 1488,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      const t = (0, r(d[1]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function n(t) {
      return Number(t?.total_earnings ?? 0);
    }
    function s(t) {
      return t <= 0 ? 0 : Math.round((t / (1 - r(d[4]).TR_COMMISSION_PERCENT / 100)) * 100) / 100;
    }
    function o(t) {
      const s = n(t);
      return {
        id: t.id,
        route_label: t.corridor || 'TrotroRide',
        earnings: s,
        passenger_count: t.passenger_count ?? 0,
        ended_at: t.ended_at,
      };
    }
    function u(t) {
      const o = Math.round(100 * (t ?? []).reduce((t, s) => t + n(s), 0)) / 100,
        u = s(o);
      return {
        net: o,
        gross: u,
        commission: Math.round(100 * (u - o)) / 100,
        trips: t?.length ?? 0,
      };
    }
    function c(t, { monday: s, todayKey: c }) {
      const l = s.getTime(),
        f = t.filter(t => (0, r(d[5]).toLocalDateKey)(t.ended_at) === c),
        b = t.filter(t => (t.ended_at ? new Date(t.ended_at).getTime() : 0) >= l),
        p = u(f),
        _ = u(b),
        y = u(t),
        P = (0, r(d[5]).buildWeekDayBuckets)(
          b,
          t => n(t),
          t => t.ended_at
        );
      return {
        todayNet: p.net,
        todayGross: p.gross,
        todayTrips: p.trips,
        weekNet: _.net,
        weekGross: _.gross,
        weekTrips: _.trips,
        monthGross: y.gross,
        monthCommission: y.commission,
        monthNet: y.net,
        monthTrips: y.trips,
        weekDays: P,
        recentTrips: t.slice(0, 20).map(o),
      };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'acceptRide', {
        enumerable: !0,
        get: function () {
          return r(d[0]).acceptRide;
        },
      }),
      Object.defineProperty(e, 'addCoPassenger', {
        enumerable: !0,
        get: function () {
          return r(d[0]).addCoPassenger;
        },
      }),
      Object.defineProperty(e, 'buildFareBreakdown', {
        enumerable: !0,
        get: function () {
          return r(d[0]).buildFareBreakdown;
        },
      }),
      Object.defineProperty(e, 'cancelPassengerRequest', {
        enumerable: !0,
        get: function () {
          return r(d[0]).cancelPassengerRequest;
        },
      }),
      (e.completeDriverRide = async function (t) {
        return (0, r(d[0]).completeRide)(t);
      }),
      Object.defineProperty(e, 'completeRide', {
        enumerable: !0,
        get: function () {
          return r(d[0]).completeRide;
        },
      }),
      (e.createDriverRide = async function (n, s, o) {
        const u = (0, r(d[2]).calculateTrotroRideCommission)(s.farePerSeat * s.maxPassengers),
          c = {
            driver_id: n,
            origin: s.origin,
            destination: s.destination,
            route_label: `${s.origin} \u2192 ${s.destination} (Shared Car)`,
            vehicle_model: o?.vehicle_type ?? s.vehicleModel,
            plate_number: o?.vehicle_registration,
            max_passengers: s.maxPassengers ?? 3,
            seats_available: s.seatsAvailable ?? 3,
            fare_per_seat: s.farePerSeat,
            current_passengers: 0,
            pickup_eta_min: s.pickupEta ?? 5,
            trip_duration_min: s.tripDuration ?? 20,
            status: 'active',
            fare_breakdown: s.fareBreakdown ?? {},
            started_at: new Date().toISOString(),
          },
          { supabase: l, error: f } = t();
        if (f) return { data: null, error: f };
        try {
          const { data: t, error: n } = await l
            .from('trotroride_trips')
            .insert(c)
            .select()
            .single();
          return n && (0, r(d[3], './db').isMissingTableError)(n)
            ? {
                data: Object.assign({}, c, {
                  id: `local-ride-${Date.now()}`,
                  localOnly: !0,
                  fareSplit: u,
                }),
                error: null,
              }
            : { data: Object.assign({}, t, { fareSplit: u }), error: n };
        } catch {
          return {
            data: Object.assign({}, c, {
              id: `local-ride-${Date.now()}`,
              localOnly: !0,
              fareSplit: u,
            }),
            error: null,
          };
        }
      }),
      Object.defineProperty(e, 'declineRide', {
        enumerable: !0,
        get: function () {
          return r(d[0]).declineRide;
        },
      }),
      (e.estimateTrotroRideFarePerSeat = function (t, n, s = 5) {
        return (0, r(d[2]).estimateFarePerSeat)(s);
      }),
      Object.defineProperty(e, 'fetchActiveRide', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchActiveRide;
        },
      }),
      (e.fetchDriverActiveRide = async function (t) {
        return (0, r(d[0]).fetchActiveRide)(t);
      }),
      (e.fetchDriverEarnings = async function (n) {
        const { supabase: s, error: o } = t();
        if (o) return { data: null, error: o };
        const u = {
          todayNet: 0,
          todayGross: 0,
          todayTrips: 0,
          weekNet: 0,
          weekGross: 0,
          weekTrips: 0,
          monthGross: 0,
          monthCommission: 0,
          monthNet: 0,
          monthTrips: 0,
          weekDays: [],
          recentTrips: [],
        };
        if (!n) return { data: u, error: null };
        try {
          const t = new Date();
          t.setHours(0, 0, 0, 0);
          const { monday: o } = (0, r(d[5], '../utils/earningsHub').getWeekRange)(),
            l = new Date(Date.now() - 2592e6).toISOString(),
            f = (0, r(d[5], '../utils/earningsHub').toLocalDateKey)(t),
            { data: b, error: p } = await s
              .from('trotroride_rides')
              .select('id, corridor, passenger_count, total_earnings, ended_at')
              .eq('driver_id', n)
              .eq('status', 'completed')
              .gte('ended_at', l)
              .order('ended_at', { ascending: !1 });
          if (p && (0, r(d[3], './db').isMissingTableError)(p)) {
            const t = await s
              .from('trotroride_trips')
              .select('id, route_label, fare_per_seat, current_passengers, ended_at')
              .eq('driver_id', n)
              .eq('status', 'completed')
              .gte('ended_at', l)
              .order('ended_at', { ascending: !1 });
            return {
              data: c(
                (t.data ?? []).map(t => {
                  const n = Number(t.fare_per_seat) * Number(t.current_passengers ?? 1),
                    s = n * (r(d[4]).TR_COMMISSION_PERCENT / 100);
                  return {
                    id: t.id,
                    corridor: t.route_label,
                    passenger_count: t.current_passengers ?? 0,
                    total_earnings: n - s,
                    ended_at: t.ended_at,
                  };
                }),
                { monday: o, todayKey: f }
              ),
              error: null,
            };
          }
          return p
            ? { data: u, error: null }
            : { data: c(b ?? [], { monday: o, todayKey: f }), error: null };
        } catch {
          return { data: u, error: null };
        }
      }),
      Object.defineProperty(e, 'fetchDriverStatus', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchDriverStatus;
        },
      }),
      Object.defineProperty(e, 'fetchDriverTodayStats', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchDriverTodayStats;
        },
      }),
      Object.defineProperty(e, 'fetchOnlineDrivers', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchOnlineDrivers;
        },
      }),
      Object.defineProperty(e, 'fetchOpenRides', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchOpenRides;
        },
      }),
      Object.defineProperty(e, 'fetchPassengerActiveRequest', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchPassengerActiveRequest;
        },
      }),
      Object.defineProperty(e, 'fetchPassengerActiveRide', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchPassengerActiveRide;
        },
      }),
      Object.defineProperty(e, 'fetchPendingRequest', {
        enumerable: !0,
        get: function () {
          return r(d[0]).fetchPendingRequest;
        },
      }),
      Object.defineProperty(e, 'goOffline', {
        enumerable: !0,
        get: function () {
          return r(d[0]).goOffline;
        },
      }),
      Object.defineProperty(e, 'goOnline', {
        enumerable: !0,
        get: function () {
          return r(d[0]).goOnline;
        },
      }),
      Object.defineProperty(e, 'requestRide', {
        enumerable: !0,
        get: function () {
          return r(d[0]).requestRide;
        },
      }),
      Object.defineProperty(e, 'subscribeToPassengerTrips', {
        enumerable: !0,
        get: function () {
          return r(d[0]).subscribeToPassengerTrips;
        },
      }),
      Object.defineProperty(e, 'subscribeToRideRequests', {
        enumerable: !0,
        get: function () {
          return r(d[0]).subscribeToRideRequests;
        },
      }),
      Object.defineProperty(e, 'subscribeToRideUpdates', {
        enumerable: !0,
        get: function () {
          return r(d[0]).subscribeToRideUpdates;
        },
      }),
      Object.defineProperty(e, 'updatePassengerStatus', {
        enumerable: !0,
        get: function () {
          return r(d[0]).updatePassengerStatus;
        },
      }));
  },
  1773,
  [754, 502, 756, 558, 508, 691]
);
