__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[24]).useNavigation)(),
          u = (0, r(d[24]).useRoute)(),
          _ = (0, r(d[25]).useSafeAreaInsets)(),
          { user: E, profile: I, updateProfile: F } = (0, r(d[26]).useAuth)(),
          M = Boolean(I?.is_station_admin),
          z = I?.role === r(d[27]).USER_ROLES.MATE,
          O = I?.station_id ?? null,
          [L, N] = (0, n.useState)(O),
          [$, H] = (0, n.useState)(null),
          [q, V] = (0, n.useState)(null),
          [W, Q] = (0, n.useState)(!1),
          [U, K] = (0, n.useState)(!1),
          [J, Y] = (0, n.useState)(!1),
          G = (0, n.useRef)(new Set()),
          { showToast: X } = (0, r(d[28]).useToast)(),
          Z = M ? L : (L ?? O),
          ee = z ? E?.id : null,
          {
            station: te,
            stations: ae,
            trips: ie,
            demand: ne,
            waiting: se,
            stats: oe,
            analytics: le,
            feedbackAnalytics: re,
            completedHistory: de,
            loading: ce,
            refreshing: ue,
            error: ge,
            refresh: fe,
          } = (0, r(d[29]).useStationMaster)(Z, ee);
        (0, n.useEffect)(() => {
          !L && ae.length && (I?.station_id ? N(I.station_id) : (z || M) && N(ae[0].id));
        }, [ae, I?.station_id, z, M, L]);
        const pe = ae.find(t => t.id === I?.station_id) ?? null,
          me = te ?? ae.find(t => t.id === Z) ?? null,
          he = (0, n.useMemo)(
            () =>
              me?.name
                ? `${me.name} \xb7 ${me.city ?? 'Kumasi'}`
                : M
                  ? 'Network overview \xb7 select a station below'
                  : z
                    ? 'Your station departures, demand, and waiting passengers'
                    : 'Live departures and route demand \xb7 Kumasi',
            [me, M, z]
          ),
          ye = (0, n.useMemo)(() => ($ ? (0, r(d[30]).eligibleDispatchTrips)(ie, $) : []), [$, ie]);
        ((0, n.useEffect)(() => {
          if (!M || !E?.id) return;
          const t = new Set(se.map(t => t.id));
          (se.forEach(t => {
            G.current.has(t.id) ||
              (0, r(d[31]).notifyStationAdminQueueAlert)({
                userId: E.id,
                origin: t.origin,
                destination: t.destination,
                waitingCount: se.length,
                queueId: t.id,
              }).catch(() => {});
          }),
            (G.current = t));
        }, [se, M, E?.id]),
          (0, n.useEffect)(() => {
            const t = u.params?.queueId;
            if (!t || !M) return;
            const n = se.find(n => n.id === t);
            n && H(n);
          }, [u.params?.queueId, se, M]));
        const xe = async t => {
          if (!M) return;
          V(t.id);
          const { error: n } = await (0, r(d[30]).adminCancelQueueEntry)(t.id);
          (V(null),
            n
              ? X({ type: 'error', title: 'Could not remove', message: n.message ?? 'Try again.' })
              : (X({
                  type: 'success',
                  title: 'Removed from queue',
                  message: `${t.origin} \u2192 ${t.destination}`,
                }),
                fe()));
        };
        return (0, P.jsxs)(p.default, {
          style: D.root,
          testID: 'station-master-screen',
          children: [
            (0, P.jsxs)(c.default, {
              contentContainerStyle: {
                paddingTop: _.top + r(d[33]).spacing.lg,
                paddingBottom: _.bottom + r(d[33]).spacing.xxxl,
                paddingHorizontal: r(d[33]).spacing.lg,
              },
              refreshControl: (0, P.jsx)(l.default, {
                refreshing: ue,
                onRefresh: fe,
                tintColor: h.default.primary,
              }),
              showsVerticalScrollIndicator: !1,
              children: [
                (0, P.jsxs)(p.default, {
                  style: D.headerRow,
                  children: [
                    (0, P.jsx)(o.default, {
                      style: D.backButton,
                      onPress: () => t.goBack(),
                      hitSlop: 12,
                      children: (0, P.jsx)(r(d[34]).Ionicons, {
                        name: 'chevron-back',
                        size: 22,
                        color: h.default.greenAccent,
                      }),
                    }),
                    (0, P.jsxs)(p.default, {
                      style: D.headerText,
                      children: [
                        (0, P.jsxs)(p.default, {
                          style: D.titleRow,
                          children: [
                            (0, P.jsx)(f.default, { style: D.title, children: 'Station Master' }),
                            (0, P.jsx)(C.default, { active: !0, variant: 'inline' }),
                          ],
                        }),
                        (0, P.jsx)(f.default, { style: D.subtitle, children: he }),
                      ],
                    }),
                  ],
                }),
                (M || z) &&
                  (0, P.jsxs)(p.default, {
                    style: D.roleBadge,
                    children: [
                      (0, P.jsx)(r(d[34]).Ionicons, {
                        name: M ? 'shield-checkmark' : 'bus-outline',
                        size: 14,
                        color: h.default.greenAccent,
                      }),
                      (0, P.jsx)(f.default, {
                        style: D.roleBadgeText,
                        children: M ? 'Station admin' : 'Mate operator',
                      }),
                      M
                        ? (0, P.jsx)(o.default, {
                            style: D.guideLink,
                            onPress: () => K(!0),
                            hitSlop: 8,
                            children: (0, P.jsx)(f.default, {
                              style: D.guideLinkText,
                              children: 'Setup guide',
                            }),
                          })
                        : null,
                    ],
                  }),
                z && !M
                  ? (0, P.jsxs)(R.default, {
                      elevated: !0,
                      glow: !0,
                      style: D.operatorCard,
                      children: [
                        (0, P.jsx)(f.default, {
                          style: D.operatorTitle,
                          children: 'Mate operator',
                        }),
                        (0, P.jsx)(f.default, {
                          style: D.operatorBody,
                          children: pe
                            ? `Home station: ${pe.name}`
                            : `Viewing ${me?.name ?? 'Tech Junction Station'}. Set your home station in Edit profile.`,
                        }),
                        (0, P.jsxs)(p.default, {
                          style: D.operatorActions,
                          children: [
                            (0, P.jsx)(k.default, {
                              title: 'Dashboard',
                              variant: 'secondary',
                              compact: !0,
                              onPress: () =>
                                t.navigate('MainTabs', { screen: r(d[35]).ROUTES.MATE_DASHBOARD }),
                            }),
                            (0, P.jsx)(k.default, {
                              title: 'Active trip',
                              compact: !0,
                              onPress: () =>
                                t.navigate('MainTabs', {
                                  screen: r(d[35]).ROUTES.MATE_ACTIVE_TRIP,
                                }),
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
                (M || z) && ae.length > 0
                  ? (0, P.jsx)(c.default, {
                      horizontal: !0,
                      showsHorizontalScrollIndicator: !1,
                      style: D.stationPicker,
                      children: (0, P.jsxs)(p.default, {
                        style: D.stationChipRow,
                        children: [
                          M
                            ? (0, P.jsx)(A.default, {
                                label: 'All stations',
                                selected: !L,
                                onPress: () => N(null),
                              })
                            : null,
                          ae.map(t =>
                            (0, P.jsx)(
                              A.default,
                              {
                                label: t.name.split(' ')[0],
                                selected: Z === t.id,
                                onPress: () => N(t.id),
                              },
                              t.id
                            )
                          ),
                        ],
                      }),
                    })
                  : null,
                ge
                  ? (0, P.jsx)(R.default, {
                      elevated: !0,
                      style: D.errorCard,
                      children: (0, P.jsxs)(f.default, {
                        style: D.errorText,
                        children: ['Sync issue \u2014 live data unavailable. ', ge],
                      }),
                    })
                  : null,
                ce
                  ? (0, P.jsx)(r(d[36]).SkeletonList, { count: 3 })
                  : (0, P.jsxs)(P.Fragment, {
                      children: [
                        (0, P.jsx)(y.default, { stats: oe }),
                        M
                          ? (0, P.jsxs)(P.Fragment, {
                              children: [
                                (0, P.jsx)(T.default, {
                                  analytics: le
                                    ? Object.assign({}, le, {
                                        highDemandRoutes: oe.highDemandRoutes,
                                      })
                                    : null,
                                  history: de,
                                  isAdmin: M,
                                }),
                                (0, P.jsx)(v.default, { feedback: re, isAdmin: M }),
                              ],
                            })
                          : null,
                        (0, P.jsxs)(f.default, {
                          style: D.sectionTitle,
                          children: ['Active departures (', ie.length, ')'],
                        }),
                        0 === ie.length
                          ? (0, P.jsx)(R.default, {
                              elevated: !0,
                              children: (0, P.jsx)(f.default, {
                                style: D.empty,
                                children:
                                  'No active trips at this station. Mates start trips from the Dashboard tab.',
                              }),
                            })
                          : ie.map(t => (0, P.jsx)(x.default, { trip: t }, t.id)),
                        (0, P.jsx)(f.default, { style: D.sectionTitle, children: 'Route demand' }),
                        0 === ne.length
                          ? (0, P.jsx)(R.default, {
                              elevated: !0,
                              children: (0, P.jsx)(f.default, {
                                style: D.empty,
                                children: 'No demand data for this station yet.',
                              }),
                            })
                          : ne.map(t =>
                              (0, P.jsx)(
                                j.default,
                                {
                                  row: t,
                                  canDispatch: M,
                                  onDispatch: t => {
                                    const n = se.find(
                                      n =>
                                        `${n.origin} \u2192 ${n.destination}` === t.route_label ||
                                        (n.origin === t.origin && n.destination === t.destination)
                                    );
                                    n
                                      ? H(n)
                                      : X({
                                          type: 'info',
                                          title: 'No waiting passenger',
                                          message:
                                            'Open Waiting passengers below when someone joins this corridor.',
                                        });
                                  },
                                },
                                t.id ?? t.route_label
                              )
                            ),
                        (0, P.jsxs)(f.default, {
                          style: D.sectionTitle,
                          children: ['Waiting passengers (', se.length, ')'],
                        }),
                        0 === se.length
                          ? (0, P.jsx)(R.default, {
                              elevated: !0,
                              children: (0, P.jsx)(f.default, {
                                style: D.empty,
                                children:
                                  'No passengers in queue. Passengers join from Find Ride when no vehicles match.',
                              }),
                            })
                          : se
                              .slice(0, 8)
                              .map(t =>
                                (0, P.jsx)(
                                  w.default,
                                  {
                                    row: t,
                                    canDispatch: M,
                                    onDispatch: H,
                                    onCancel: xe,
                                    dispatchLoading: W && $?.id === t.id,
                                    cancelLoading: q === t.id,
                                  },
                                  t.id
                                )
                              ),
                        M ? (0, P.jsx)(b.default, { enabled: M }) : null,
                      ],
                    }),
                ce || ue
                  ? null
                  : (0, P.jsxs)(p.default, {
                      style: D.footerNote,
                      children: [
                        (0, P.jsx)(s.default, { size: 'small', color: h.default.greenAccent }),
                        (0, P.jsx)(f.default, {
                          style: D.footerText,
                          children: 'Live updates \xb7 refreshes automatically',
                        }),
                      ],
                    }),
              ],
            }),
            (0, P.jsx)(S.default, {
              visible: Boolean($),
              queueRow: $,
              trips: ye,
              loading: W,
              onSelectTrip: async t => {
                if (!$) return;
                Q(!0);
                const { error: n } = await (0, r(d[30]).adminDispatchQueueToTrip)($, t);
                (Q(!1),
                  H(null),
                  n
                    ? X({
                        type: 'error',
                        title: 'Dispatch failed',
                        message: n.message ?? 'Try again.',
                      })
                    : (X({
                        type: 'success',
                        title: 'Passenger invited',
                        message: `Ride request sent via ${t.profiles?.full_name ?? 'mate'}'s trip.`,
                      }),
                      fe()));
              },
              onClose: () => H(null),
            }),
            M
              ? (0, P.jsx)(B.default, {
                  visible: U,
                  pushLoading: J,
                  onEnablePush: async () => {
                    if (!E?.id) return;
                    Y(!0);
                    const { token: t } = await (0, r(d[31]).registerForPushNotifications)();
                    (t
                      ? (await F(E.id, { expo_push_token: t }).catch(() => {}),
                        await (0, r(d[32]).pushNotificationPrefsToCloud)(E.id, {
                          stationAdminAlerts: !0,
                        }).catch(() => {}),
                        X({
                          type: 'success',
                          title: 'Push enabled',
                          message: 'Queue alerts will reach this device.',
                        }))
                      : X({
                          type: 'info',
                          title: 'Permission needed',
                          message: 'Allow notifications in phone settings.',
                        }),
                      Y(!1));
                  },
                  onOpenStationMaster: () => K(!1),
                  onComplete: () => K(!1),
                })
              : null,
          ],
        });
      }));
    var n = r(d[1]),
      s = t(r(d[2])),
      o = t(r(d[3])),
      l = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = t(r(d[7])),
      p = t(r(d[8])),
      h = t(r(d[9])),
      y = t(r(d[10])),
      x = t(r(d[11])),
      j = t(r(d[12])),
      b = t(r(d[13])),
      w = t(r(d[14])),
      S = t(r(d[15])),
      T = t(r(d[16])),
      v = t(r(d[17])),
      B = t(r(d[18])),
      C = t(r(d[19])),
      R = t(r(d[20])),
      A = t(r(d[21])),
      k = t(r(d[22])),
      P = r(d[23]);
    const D = u.default.create({
      root: { flex: 1, backgroundColor: h.default.background },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: r(d[33]).spacing.lg,
        gap: r(d[33]).spacing.md,
      },
      backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: h.default.surfaceElevated,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: h.default.borderSoft,
      },
      headerText: { flex: 1 },
      titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[33]).spacing.sm,
        marginBottom: r(d[33]).spacing.xs,
      },
      title: {
        fontFamily: r(d[33]).fontFamily.bold,
        fontSize: 28,
        letterSpacing: -0.5,
        color: h.default.textPrimary,
      },
      subtitle: Object.assign({}, r(d[33]).typography.body),
      roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[33]).spacing.sm,
        alignSelf: 'flex-start',
        backgroundColor: h.default.surfaceElevated,
        borderRadius: r(d[33]).radius.sm,
        paddingHorizontal: r(d[33]).spacing.md,
        paddingVertical: r(d[33]).spacing.sm,
        marginBottom: r(d[33]).spacing.md,
        borderWidth: u.default.hairlineWidth,
        borderColor: h.default.border,
      },
      roleBadgeText: {
        fontFamily: r(d[33]).fontFamily.medium,
        fontSize: 12,
        color: h.default.textSecondary,
      },
      guideLink: {
        marginLeft: r(d[33]).spacing.sm,
        paddingHorizontal: r(d[33]).spacing.sm,
        paddingVertical: 2,
        borderRadius: r(d[33]).radius.pill,
        backgroundColor: h.default.surfaceElevated,
      },
      guideLinkText: {
        fontFamily: r(d[33]).fontFamily.semiBold,
        fontSize: 11,
        color: h.default.primaryLight,
      },
      operatorCard: { marginBottom: r(d[33]).spacing.lg },
      operatorTitle: {
        fontFamily: r(d[33]).fontFamily.semiBold,
        fontSize: 16,
        color: h.default.textPrimary,
        marginBottom: r(d[33]).spacing.xs,
      },
      operatorBody: Object.assign({}, r(d[33]).typography.body, {
        marginBottom: r(d[33]).spacing.md,
      }),
      operatorActions: { flexDirection: 'row', gap: r(d[33]).spacing.sm },
      stationPicker: { marginBottom: r(d[33]).spacing.lg, maxHeight: 48 },
      stationChipRow: { flexDirection: 'row', paddingRight: r(d[33]).spacing.lg },
      errorCard: { marginBottom: r(d[33]).spacing.md, borderColor: h.default.warning },
      errorText: Object.assign({}, r(d[33]).typography.caption, { color: h.default.warning }),
      sectionTitle: {
        fontFamily: r(d[33]).fontFamily.semiBold,
        fontSize: 13,
        color: h.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        marginBottom: r(d[33]).spacing.md,
        marginTop: r(d[33]).spacing.lg,
      },
      empty: Object.assign({}, r(d[33]).typography.body),
      waitCard: { marginBottom: r(d[33]).spacing.sm },
      waitRoute: {
        fontFamily: r(d[33]).fontFamily.semiBold,
        fontSize: 14,
        color: h.default.textPrimary,
        marginBottom: 4,
      },
      waitMeta: Object.assign({}, r(d[33]).typography.caption),
      footerNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: r(d[33]).spacing.sm,
        marginTop: r(d[33]).spacing.xl,
      },
      footerText: Object.assign({}, r(d[33]).typography.caption),
    });
  },
  1451,
  [
    1, 5, 373, 326, 105, 106, 26, 161, 19, 379, 1774, 1775, 1776, 1777, 1779, 1780, 1781, 1782, 947,
    752, 684, 1783, 672, 183, 382, 572, 501, 508, 1386, 1784, 1785, 760, 561, 377, 578, 682, 1617,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ stats: t }) {
        return (0, u.jsxs)(r(d[6]).LinearGradient, {
          colors: [s.default.surfaceElevated, s.default.surfaceSoft],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          style: f.row,
          children: [
            (0, u.jsx)(c, {
              label: 'Active',
              value: t.activeTrips ?? 0,
              accent: s.default.primaryLight,
            }),
            (0, u.jsx)(l.default, { style: f.divider }),
            (0, u.jsx)(c, {
              label: 'Seats open',
              value: t.availableSeats ?? 0,
              accent: s.default.greenAccent,
            }),
            (0, u.jsx)(l.default, { style: f.divider }),
            (0, u.jsx)(c, { label: 'Waiting', value: t.waitingPassengers ?? 0 }),
            (0, u.jsx)(l.default, { style: f.divider }),
            (0, u.jsx)(c, { label: 'Fill rate', value: `${t.fillRate ?? 0}%` }),
          ],
        });
      }));
    var l = t(r(d[1])),
      n = t(r(d[2])),
      o = t(r(d[3])),
      s = t(r(d[4])),
      u = r(d[5]);
    function c({ label: t, value: o, accent: s }) {
      return (0, u.jsxs)(l.default, {
        style: f.tile,
        children: [
          (0, u.jsx)(n.default, { style: [f.value, s && { color: s }], children: o }),
          (0, u.jsx)(n.default, { style: f.label, children: t }),
        ],
      });
    }
    const f = o.default.create({
      row: {
        flexDirection: 'row',
        borderRadius: r(d[7]).radius.xl,
        borderWidth: 1,
        borderColor: s.default.border,
        paddingVertical: r(d[7]).spacing.lg,
        marginBottom: r(d[7]).spacing.lg,
      },
      tile: { flex: 1, alignItems: 'center' },
      value: {
        fontFamily: r(d[7]).fontFamily.bold,
        fontSize: 20,
        color: s.default.textPrimary,
        marginBottom: 4,
      },
      label: {
        fontFamily: r(d[7]).fontFamily.medium,
        fontSize: 11,
        color: s.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.4,
      },
      divider: { width: 1, backgroundColor: s.default.borderSoft },
    });
  },
  1774,
  [1, 19, 161, 26, 379, 183, 1707, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ trip: t }) {
        const o = t.total_seats ?? 0,
          p = t.seats_available ?? t.available_seats ?? 0,
          y = o ? Math.round(((o - p) / o) * 100) : 0;
        return (0, c.jsxs)(u.default, {
          elevated: !0,
          style: h.card,
          children: [
            (0, c.jsxs)(l.default, {
              style: h.header,
              children: [
                (0, c.jsx)(l.default, {
                  style: h.iconWrap,
                  children: (0, c.jsx)(r(d[7]).Ionicons, {
                    name: 'bus',
                    size: 18,
                    color: n.default.primaryLight,
                  }),
                }),
                (0, c.jsxs)(l.default, {
                  style: h.headerText,
                  children: [
                    (0, c.jsx)(s.default, { style: h.route, children: t.route_label }),
                    (0, c.jsxs)(s.default, {
                      style: h.meta,
                      children: [
                        t.profiles?.full_name ?? 'Mate',
                        ' \xb7',
                        ' ',
                        t.plate_number ?? t.profiles?.vehicle_registration ?? '\u2014',
                      ],
                    }),
                  ],
                }),
                (0, c.jsx)(l.default, {
                  style: [h.statusPill, 0 === p && h.statusFull],
                  children: (0, c.jsx)(s.default, {
                    style: h.statusText,
                    children: 0 === p ? 'FULL' : 'OPEN',
                  }),
                }),
              ],
            }),
            (0, c.jsx)(l.default, {
              style: h.barTrack,
              children: (0, c.jsx)(l.default, {
                style: [h.barFill, { width: `${y}%`, backgroundColor: f(p, o) }],
              }),
            }),
            (0, c.jsxs)(l.default, {
              style: h.footer,
              children: [
                (0, c.jsxs)(s.default, {
                  style: h.footerText,
                  children: [
                    p,
                    '/',
                    o,
                    ' seats \xb7 GHS ',
                    Number(t.fare_per_seat ?? 0).toFixed(2),
                  ],
                }),
                t.stations?.name
                  ? (0, c.jsx)(s.default, { style: h.station, children: t.stations.name })
                  : null,
              ],
            }),
          ],
        });
      }));
    var l = t(r(d[1])),
      s = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      u = t(r(d[5])),
      c = r(d[6]);
    function f(t, l) {
      const s = l ? t / l : 0;
      return s <= 0
        ? n.default.seatsFull
        : s <= 0.2
          ? n.default.seatsAlmostFull
          : s <= 0.5
            ? n.default.seatsFilling
            : n.default.seatsAvailable;
    }
    const h = o.default.create({
      card: { marginBottom: r(d[8]).spacing.sm },
      header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: r(d[8]).spacing.md },
      iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: n.default.primaryAlpha12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: r(d[8]).spacing.sm,
      },
      headerText: { flex: 1 },
      route: {
        fontFamily: r(d[8]).fontFamily.semiBold,
        fontSize: 15,
        color: n.default.textPrimary,
        marginBottom: 2,
      },
      meta: Object.assign({}, r(d[8]).typography.caption),
      statusPill: {
        backgroundColor: n.default.greenAlpha12,
        paddingHorizontal: r(d[8]).spacing.sm,
        paddingVertical: 4,
        borderRadius: r(d[8]).radius.pill,
      },
      statusFull: { backgroundColor: n.default.seatsAlmostFull },
      statusText: {
        fontFamily: r(d[8]).fontFamily.bold,
        fontSize: 10,
        color: n.default.greenAccent,
        letterSpacing: 0.5,
      },
      barTrack: {
        height: 6,
        borderRadius: 3,
        backgroundColor: n.default.borderSoft,
        overflow: 'hidden',
        marginBottom: r(d[8]).spacing.sm,
      },
      barFill: { height: '100%', borderRadius: 3 },
      footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      footerText: Object.assign({}, r(d[8]).typography.caption),
      station: Object.assign({}, r(d[8]).typography.caption, { color: n.default.primaryLight }),
    });
  },
  1775,
  [1, 19, 161, 26, 379, 684, 183, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ row: t, onDispatch: n, canDispatch: s = !1 }) {
        const x = t.demand_level ?? 'low',
          w = t.waiting_count ?? 0;
        return (0, f.jsxs)(c.default, {
          elevated: !0,
          style: y.card,
          children: [
            (0, f.jsxs)(l.default, {
              style: y.row,
              children: [
                (0, f.jsxs)(l.default, {
                  style: y.info,
                  children: [
                    (0, f.jsx)(o.default, { style: y.route, children: t.route_label }),
                    (0, f.jsxs)(o.default, {
                      style: y.meta,
                      children: [
                        w,
                        ' waiting \xb7 ',
                        x,
                        ' demand',
                        'live' === t.source ? ' \xb7 live' : '',
                      ],
                    }),
                  ],
                }),
                (0, f.jsx)(o.default, { style: y.count, children: w }),
              ],
            }),
            (0, f.jsx)(l.default, {
              style: y.track,
              children: (0, f.jsx)(l.default, { style: [y.fill, h(x), { width: p(x, w) }] }),
            }),
            s && w > 0 && n
              ? (0, f.jsx)(l.default, {
                  style: y.dispatchBtn,
                  children: (0, f.jsx)(u.default, {
                    title: 'Dispatch waiting',
                    compact: !0,
                    noMargin: !0,
                    onPress: () => n(t),
                  }),
                })
              : null,
          ],
        });
      }));
    var l = t(r(d[1])),
      o = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = r(d[7]);
    function h(t) {
      return 'high' === t ? y.fillHigh : 'medium' === t ? y.fillMedium : y.fillLow;
    }
    function p(t, l) {
      return 'high' === t ? '100%' : 'medium' === t ? '66%' : l >= 2 ? '45%' : '28%';
    }
    const y = n.default.create({
      card: { marginBottom: r(d[8]).spacing.sm },
      row: { flexDirection: 'row', alignItems: 'center', marginBottom: r(d[8]).spacing.sm },
      info: { flex: 1 },
      route: {
        fontFamily: r(d[8]).fontFamily.semiBold,
        fontSize: 15,
        color: s.default.textPrimary,
        marginBottom: 2,
      },
      meta: Object.assign({}, r(d[8]).typography.caption, { textTransform: 'capitalize' }),
      count: { fontFamily: r(d[8]).fontFamily.bold, fontSize: 22, color: s.default.primaryLight },
      track: {
        height: 6,
        borderRadius: r(d[8]).radius.pill,
        backgroundColor: s.default.borderSoft,
        overflow: 'hidden',
      },
      fill: { height: '100%', borderRadius: r(d[8]).radius.pill },
      fillHigh: { backgroundColor: s.default.primary },
      fillMedium: { backgroundColor: s.default.warning },
      fillLow: { backgroundColor: s.default.greenAccent },
      dispatchBtn: { marginTop: r(d[8]).spacing.sm },
    });
  },
  1776,
  [1, 19, 161, 26, 379, 684, 672, 183, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ enabled: t = !0 }) {
        const [o, j] = (0, l.useState)([]),
          [v, w] = (0, l.useState)(!0),
          [S, R] = (0, l.useState)(null),
          b = (0, l.useCallback)(async () => {
            if (!t) return (j([]), void w(!1));
            w(!0);
            const { data: l } = await (0, r(d[10]).fetchOpenSafetyReports)(12);
            (j(l ?? []), w(!1));
          }, [t]);
        (0, l.useEffect)(() => {
          if ((b(), !t)) return;
          const l = setInterval(b, 3e4);
          return () => clearInterval(l);
        }, [b, t]);
        const T = async (t, l) => {
          (R(t), await (0, r(d[10]).updateSafetyReportStatus)(t, l), R(null), b());
        };
        return t
          ? (0, y.jsxs)(p.default, {
              style: h.wrap,
              children: [
                (0, y.jsxs)(p.default, {
                  style: h.header,
                  children: [
                    (0, y.jsx)(r(d[11]).Ionicons, {
                      name: 'shield-half-outline',
                      size: 18,
                      color: c.default.warning,
                    }),
                    (0, y.jsxs)(s.default, {
                      style: h.title,
                      children: ['Safety ops (', o.length, ')'],
                    }),
                    (0, y.jsx)(n.default, {
                      onPress: b,
                      hitSlop: 8,
                      children: (0, y.jsx)(r(d[11]).Ionicons, {
                        name: 'refresh',
                        size: 18,
                        color: c.default.textMuted,
                      }),
                    }),
                  ],
                }),
                v
                  ? (0, y.jsx)(u.default, {
                      elevated: !0,
                      children: (0, y.jsx)(s.default, {
                        style: h.empty,
                        children: 'Loading safety reports\u2026',
                      }),
                    })
                  : 0 === o.length
                    ? (0, y.jsx)(u.default, {
                        elevated: !0,
                        children: (0, y.jsx)(s.default, {
                          style: h.empty,
                          children:
                            'No open safety alerts. Trip Guardian reports appear here for triage.',
                        }),
                      })
                    : o.map(t =>
                        (0, y.jsxs)(
                          u.default,
                          {
                            elevated: !0,
                            style: h.reportCard,
                            children: [
                              (0, y.jsxs)(p.default, {
                                style: h.reportHeader,
                                children: [
                                  (0, y.jsx)(s.default, {
                                    style: h.reportType,
                                    children: (0, r(d[10]).safetyReportTypeLabel)(t.report_type),
                                  }),
                                  (0, y.jsx)(x, { status: t.status }),
                                ],
                              }),
                              (0, y.jsx)(s.default, {
                                style: h.reportRoute,
                                children: t.route || 'Route not specified',
                              }),
                              (0, y.jsxs)(s.default, {
                                style: h.reportMeta,
                                children: [
                                  t.reporter_role ?? 'passenger',
                                  ' \xb7 ',
                                  (0, r(d[10]).formatSafetyReportWhen)(t.created_at),
                                ],
                              }),
                              (0, y.jsxs)(p.default, {
                                style: h.actions,
                                children: [
                                  'open' === t.status
                                    ? (0, y.jsx)(f.default, {
                                        title: 'Mark reviewing',
                                        variant: 'secondary',
                                        compact: !0,
                                        loading: S === t.id,
                                        onPress: () => T(t.id, 'reviewing'),
                                      })
                                    : null,
                                  (0, y.jsx)(f.default, {
                                    title: 'Close',
                                    variant: 'ghost',
                                    compact: !0,
                                    loading: S === t.id,
                                    onPress: () => T(t.id, 'closed'),
                                  }),
                                ],
                              }),
                            ],
                          },
                          t.id
                        )
                      ),
              ],
            })
          : null;
      }));
    var l = r(d[1]),
      n = t(r(d[2])),
      o = t(r(d[3])),
      s = t(r(d[4])),
      p = t(r(d[5])),
      c = t(r(d[6])),
      u = t(r(d[7])),
      f = t(r(d[8])),
      y = r(d[9]);
    function x({ status: t }) {
      const l = 'open' === t;
      return (0, y.jsx)(p.default, {
        style: [h.pill, l ? h.pillOpen : h.pillReview],
        children: (0, y.jsx)(s.default, {
          style: [h.pillText, l ? h.pillTextOpen : h.pillTextReview],
          children: 'reviewing' === t ? 'Reviewing' : 'Open',
        }),
      });
    }
    const h = o.default.create({
      wrap: { marginTop: r(d[12]).spacing.lg },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[12]).spacing.sm,
        marginBottom: r(d[12]).spacing.md,
      },
      title: {
        flex: 1,
        fontFamily: r(d[12]).fontFamily.semiBold,
        fontSize: 13,
        color: c.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
      },
      empty: Object.assign({}, r(d[12]).typography.body),
      reportCard: { marginBottom: r(d[12]).spacing.sm },
      reportHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: r(d[12]).spacing.xs,
      },
      reportType: {
        fontFamily: r(d[12]).fontFamily.bold,
        fontSize: 15,
        color: c.default.textPrimary,
      },
      reportRoute: {
        fontFamily: r(d[12]).fontFamily.medium,
        fontSize: 14,
        color: c.default.textSecondary,
        marginBottom: 4,
      },
      reportMeta: Object.assign({}, r(d[12]).typography.caption, {
        marginBottom: r(d[12]).spacing.sm,
      }),
      actions: { flexDirection: 'row', gap: r(d[12]).spacing.sm },
      pill: {
        paddingHorizontal: r(d[12]).spacing.sm,
        paddingVertical: 3,
        borderRadius: r(d[12]).radius.pill,
      },
      pillOpen: { backgroundColor: c.default.primaryAlpha12 },
      pillReview: { backgroundColor: c.default.warning + '22' },
      pillText: { fontFamily: r(d[12]).fontFamily.semiBold, fontSize: 11 },
      pillTextOpen: { color: c.default.primaryLight },
      pillTextReview: { color: c.default.warning },
    });
  },
  1777,
  [1, 5, 326, 26, 161, 19, 379, 684, 672, 183, 1778, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.fetchOpenSafetyReports = async function (t = 20) {
        const n = (0, r(d[0]).getSupabase)();
        if (!n) return { data: [], error: new Error('Supabase not initialized') };
        try {
          const { data: o, error: s } = await n
            .from('safety_reports')
            .select(
              'id, ride_id, trip_id, reporter_id, reporter_role, route, latitude, longitude, report_type, status, created_at'
            )
            .in('status', ['open', 'reviewing'])
            .order('created_at', { ascending: !1 })
            .limit(t);
          return s && (0, r(d[1], './db').isMissingTableError)(s)
            ? { data: [], error: null }
            : { data: o ?? [], error: s };
        } catch (t) {
          return { data: [], error: t };
        }
      }),
      (e.formatSafetyReportWhen = function (t) {
        return t
          ? new Date(t).toLocaleString('en-GH', { dateStyle: 'medium', timeStyle: 'short' })
          : 'Unknown time';
      }),
      (e.safetyReportTypeLabel = function (t) {
        return (
          {
            feel_unsafe: 'Feel unsafe',
            harassment: 'Harassment',
            reckless_driving: 'Reckless driving',
            vehicle_issue: 'Vehicle issue',
            other: 'Other',
          }[t] ??
          t ??
          'Safety alert'
        );
      }),
      (e.updateSafetyReportStatus = async function (t, n) {
        if (!t || !n) return { error: new Error('Missing report') };
        const o = (0, r(d[0]).getSupabase)();
        if (!o) return { error: new Error('Supabase not initialized') };
        const { data: s, error: u } = await o
          .from('safety_reports')
          .update({ status: n })
          .eq('id', t)
          .select()
          .maybeSingle();
        return { data: s, error: u };
      }));
  },
  1778,
  [502, 558]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        row: t,
        onDispatch: s,
        onCancel: y,
        dispatchLoading: x = !1,
        cancelLoading: j = !1,
        canDispatch: b = !0,
      }) {
        return (0, u.jsxs)(l.default, {
          style: h.card,
          children: [
            (0, u.jsxs)(l.default, {
              style: h.header,
              children: [
                (0, u.jsx)(l.default, {
                  style: h.iconWrap,
                  children: (0, u.jsx)(r(d[8]).Ionicons, {
                    name: 'person',
                    size: 16,
                    color: c.default.primaryLight,
                  }),
                }),
                (0, u.jsxs)(l.default, {
                  style: h.headerText,
                  children: [
                    (0, u.jsxs)(o.default, {
                      style: h.route,
                      children: [t.origin, ' \u2192 ', t.destination],
                    }),
                    (0, u.jsxs)(o.default, {
                      style: h.meta,
                      children: [
                        t.profiles?.full_name ?? 'Passenger',
                        ' \xb7 waiting ',
                        p(t.created_at),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            b
              ? (0, u.jsxs)(l.default, {
                  style: h.actions,
                  children: [
                    (0, u.jsx)(f.default, {
                      title: 'Assign to trip',
                      compact: !0,
                      onPress: () => s?.(t),
                      loading: x,
                      disabled: x || j,
                    }),
                    (0, u.jsx)(f.default, {
                      title: 'Remove',
                      variant: 'ghost',
                      compact: !0,
                      onPress: () => y?.(t),
                      loading: j,
                      disabled: x || j,
                    }),
                  ],
                })
              : (0, u.jsx)(n.default, {
                  style: h.readOnlyHint,
                  onPress: () => y?.(t),
                  children: (0, u.jsx)(o.default, {
                    style: h.readOnlyText,
                    children: 'View only \xb7 admin can assign or remove',
                  }),
                }),
          ],
        });
      }));
    var n = t(r(d[1])),
      s = t(r(d[2])),
      o = t(r(d[3])),
      l = t(r(d[4])),
      c = t(r(d[5])),
      f = t(r(d[6])),
      u = r(d[7]);
    function p(t) {
      if (!t) return '\u2014';
      return `${Math.max(1, Math.floor((Date.now() - new Date(t).getTime()) / 6e4))} min`;
    }
    const h = s.default.create({
      card: {
        marginBottom: r(d[9]).spacing.sm,
        padding: r(d[9]).spacing.md,
        borderRadius: r(d[9]).radius.lg,
        backgroundColor: c.default.surfaceElevated,
        borderWidth: 1,
        borderColor: c.default.borderSoft,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: r(d[9]).spacing.sm,
        marginBottom: r(d[9]).spacing.sm,
      },
      iconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: c.default.primaryAlpha08,
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: { flex: 1 },
      route: {
        fontFamily: r(d[9]).fontFamily.semiBold,
        fontSize: 14,
        color: c.default.textPrimary,
        marginBottom: 2,
      },
      meta: Object.assign({}, r(d[9]).typography.caption),
      actions: { flexDirection: 'row', gap: r(d[9]).spacing.sm },
      readOnlyHint: { paddingVertical: r(d[9]).spacing.xs },
      readOnlyText: Object.assign({}, r(d[9]).typography.caption),
    });
  },
  1779,
  [1, 326, 26, 161, 19, 379, 672, 183, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        queueRow: n,
        trips: b = [],
        loading: x = !1,
        onSelectTrip: j,
        onClose: v,
      }) {
        const R = (0, r(d[10]).useSafeAreaInsets)();
        return t
          ? (0, h.jsxs)(l.default, {
              visible: !0,
              transparent: !0,
              animationType: 'slide',
              onRequestClose: v,
              children: [
                (0, h.jsx)(s.default, { style: y.overlay, onPress: v }),
                (0, h.jsxs)(u.default, {
                  style: [y.sheet, { paddingBottom: R.bottom + r(d[11]).spacing.md }],
                  children: [
                    (0, h.jsx)(u.default, { style: y.handle }),
                    (0, h.jsx)(c.default, { style: y.title, children: 'Assign to active trip' }),
                    (0, h.jsx)(c.default, {
                      style: y.subtitle,
                      children: n
                        ? `${n.origin} \u2192 ${n.destination} \xb7 ${n.profiles?.full_name ?? 'Passenger'}`
                        : 'Select a departing trip with seats',
                    }),
                    (0, h.jsx)(o.default, {
                      style: y.list,
                      showsVerticalScrollIndicator: !1,
                      children:
                        0 === b.length
                          ? (0, h.jsx)(c.default, {
                              style: y.empty,
                              children:
                                'No active trips with seats match this route. Start a trip from Mate Dashboard first.',
                            })
                          : b.map(t => {
                              const l = t.seats_available ?? t.available_seats ?? 0;
                              return (0, h.jsxs)(
                                s.default,
                                {
                                  style: y.tripRow,
                                  onPress: () => j?.(t),
                                  disabled: x,
                                  children: [
                                    (0, h.jsx)(u.default, {
                                      style: y.tripIcon,
                                      children: (0, h.jsx)(r(d[12]).Ionicons, {
                                        name: 'bus',
                                        size: 18,
                                        color: p.default.primaryLight,
                                      }),
                                    }),
                                    (0, h.jsxs)(u.default, {
                                      style: y.tripText,
                                      children: [
                                        (0, h.jsx)(c.default, {
                                          style: y.tripRoute,
                                          children: t.route_label ?? t.route,
                                        }),
                                        (0, h.jsxs)(c.default, {
                                          style: y.tripMeta,
                                          children: [
                                            t.profiles?.full_name ?? 'Mate',
                                            ' \xb7 ',
                                            l,
                                            ' seats \xb7 GHS',
                                            ' ',
                                            Number(t.fare_per_seat ?? 0).toFixed(0),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, h.jsx)(r(d[12]).Ionicons, {
                                      name: 'chevron-forward',
                                      size: 18,
                                      color: p.default.textMuted,
                                    }),
                                  ],
                                },
                                t.id
                              );
                            }),
                    }),
                    (0, h.jsx)(f.default, {
                      title: 'Cancel',
                      variant: 'ghost',
                      onPress: v,
                      compact: !0,
                    }),
                  ],
                }),
              ],
            })
          : null;
      }));
    var l = t(r(d[1])),
      s = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      f = t(r(d[8])),
      h = r(d[9]);
    const y = n.default.create({
      overlay: { flex: 1, backgroundColor: p.default.overlay },
      sheet: {
        backgroundColor: p.default.surfaceElevated,
        borderTopLeftRadius: r(d[11]).radius.xl,
        borderTopRightRadius: r(d[11]).radius.xl,
        paddingHorizontal: r(d[11]).spacing.lg,
        paddingTop: r(d[11]).spacing.sm,
        maxHeight: '70%',
      },
      handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: p.default.border,
        alignSelf: 'center',
        marginBottom: r(d[11]).spacing.md,
      },
      title: {
        fontFamily: r(d[11]).fontFamily.bold,
        fontSize: 18,
        color: p.default.textPrimary,
        marginBottom: r(d[11]).spacing.xs,
      },
      subtitle: Object.assign({}, r(d[11]).typography.caption, {
        marginBottom: r(d[11]).spacing.md,
        lineHeight: 18,
      }),
      list: { marginBottom: r(d[11]).spacing.sm },
      empty: Object.assign({}, r(d[11]).typography.body, { marginBottom: r(d[11]).spacing.md }),
      tripRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[11]).spacing.sm,
        paddingVertical: r(d[11]).spacing.md,
        borderBottomWidth: n.default.hairlineWidth,
        borderBottomColor: p.default.borderSoft,
      },
      tripIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: p.default.primaryAlpha08,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tripText: { flex: 1 },
      tripRoute: {
        fontFamily: r(d[11]).fontFamily.semiBold,
        fontSize: 14,
        color: p.default.textPrimary,
      },
      tripMeta: Object.assign({}, r(d[11]).typography.caption),
    });
  },
  1780,
  [1, 948, 326, 106, 26, 161, 19, 379, 672, 183, 572, 377, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ analytics: t, history: s = [], isAdmin: x = !1 }) {
        return x && t
          ? (0, u.jsxs)(l.default, {
              style: y.wrap,
              children: [
                (0, u.jsx)(n.default, { style: y.sectionTitle, children: '7-day analytics' }),
                (0, u.jsxs)(c.default, {
                  elevated: !0,
                  style: y.card,
                  children: [
                    (0, u.jsxs)(l.default, {
                      style: y.grid,
                      children: [
                        (0, u.jsx)(f, {
                          label: 'Trips today',
                          value: t.completedToday ?? 0,
                          accent: o.default.primaryLight,
                        }),
                        (0, u.jsx)(f, { label: 'Trips (7d)', value: t.completedWeek ?? 0 }),
                        (0, u.jsx)(f, {
                          label: 'Pax today',
                          value: t.passengersToday ?? 0,
                          accent: o.default.greenAccent,
                        }),
                        (0, u.jsx)(f, { label: 'Pax (7d)', value: t.passengersWeek ?? 0 }),
                      ],
                    }),
                    (0, u.jsxs)(l.default, {
                      style: y.grid,
                      children: [
                        (0, u.jsx)(f, {
                          label: 'GHS today',
                          value: (t.revenueToday ?? 0).toFixed(0),
                          accent: o.default.primaryLight,
                        }),
                        (0, u.jsx)(f, {
                          label: 'GHS (7d)',
                          value: (t.revenueWeek ?? 0).toFixed(0),
                        }),
                        (0, u.jsx)(f, { label: 'Avg fill', value: `${t.avgFillWeek ?? 0}%` }),
                        (0, u.jsx)(f, {
                          label: 'Hot routes',
                          value: t.highDemandRoutes ?? '\u2014',
                        }),
                      ],
                    }),
                  ],
                }),
                s.length > 0
                  ? (0, u.jsxs)(u.Fragment, {
                      children: [
                        (0, u.jsx)(n.default, {
                          style: y.sectionTitle,
                          children: 'Recent completed',
                        }),
                        s.map(t =>
                          (0, u.jsxs)(
                            c.default,
                            {
                              elevated: !0,
                              style: y.historyCard,
                              children: [
                                (0, u.jsx)(n.default, { style: y.route, children: t.route }),
                                (0, u.jsxs)(n.default, {
                                  style: y.meta,
                                  children: [
                                    t.boarded,
                                    ' pax \xb7 GHS ',
                                    (t.earnings ?? 0).toFixed(2),
                                    t.endedAt
                                      ? ` \xb7 ${new Date(t.endedAt).toLocaleDateString()}`
                                      : '',
                                  ],
                                }),
                              ],
                            },
                            t.id
                          )
                        ),
                      ],
                    })
                  : null,
              ],
            })
          : null;
      }));
    var l = t(r(d[1])),
      n = t(r(d[2])),
      s = t(r(d[3])),
      o = t(r(d[4])),
      c = t(r(d[5])),
      u = r(d[6]);
    function f({ label: t, value: s, accent: o }) {
      return (0, u.jsxs)(l.default, {
        style: y.metric,
        children: [
          (0, u.jsx)(n.default, { style: [y.value, o ? { color: o } : null], children: s }),
          (0, u.jsx)(n.default, { style: y.label, children: t }),
        ],
      });
    }
    const y = s.default.create({
      wrap: { marginBottom: r(d[7]).spacing.md },
      sectionTitle: {
        fontFamily: r(d[7]).fontFamily.semiBold,
        fontSize: 13,
        color: o.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        marginBottom: r(d[7]).spacing.md,
        marginTop: r(d[7]).spacing.lg,
      },
      card: { marginBottom: r(d[7]).spacing.sm },
      grid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: r(d[7]).spacing.sm },
      metric: { width: '50%', paddingVertical: r(d[7]).spacing.sm },
      value: {
        fontFamily: r(d[7]).fontFamily.bold,
        fontSize: 20,
        color: o.default.textPrimary,
        marginBottom: 2,
      },
      label: {
        fontFamily: r(d[7]).fontFamily.medium,
        fontSize: 11,
        color: o.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
      },
      historyCard: { marginBottom: r(d[7]).spacing.sm },
      route: {
        fontFamily: r(d[7]).fontFamily.semiBold,
        fontSize: 14,
        color: o.default.textPrimary,
        marginBottom: 4,
      },
      meta: Object.assign({}, r(d[7]).typography.caption),
    });
  },
  1781,
  [1, 19, 161, 26, 379, 684, 183, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ feedback: l, isAdmin: n = !1 }) {
        if (!n || !l) return null;
        const x = l.npsResponsesWeek > 0 ? `${l.npsScore >= 0 ? '+' : ''}${l.npsScore}` : '\u2014';
        return (0, u.jsxs)(t.default, {
          style: p.wrap,
          children: [
            (0, u.jsx)(s.default, { style: p.sectionTitle, children: 'Passenger feedback (7d)' }),
            (0, u.jsxs)(o.default, {
              elevated: !0,
              style: p.card,
              children: [
                (0, u.jsxs)(t.default, {
                  style: p.grid,
                  children: [
                    (0, u.jsx)(f, { label: 'NPS score', value: x, accent: c.default.primaryLight }),
                    (0, u.jsx)(f, { label: 'NPS responses', value: l.npsResponsesWeek ?? 0 }),
                    (0, u.jsx)(f, {
                      label: 'Quick feedback',
                      value: l.quickFeedbackWeek ?? 0,
                      accent: c.default.greenAccent,
                    }),
                    (0, u.jsx)(f, {
                      label: 'Avg quick rating',
                      value: `${l.avgQuickScoreWeek ?? 0}/5`,
                    }),
                  ],
                }),
                (0, u.jsxs)(t.default, {
                  style: p.grid,
                  children: [
                    (0, u.jsx)(f, { label: 'NPS today', value: l.npsResponsesToday ?? 0 }),
                    (0, u.jsx)(f, { label: 'Quick today', value: l.quickFeedbackToday ?? 0 }),
                    (0, u.jsx)(f, { label: 'Avg NPS (0\u201310)', value: l.avgNpsScoreWeek ?? 0 }),
                  ],
                }),
              ],
            }),
          ],
        });
      }));
    var t = l(r(d[1])),
      s = l(r(d[2])),
      n = l(r(d[3])),
      c = l(r(d[4])),
      o = l(r(d[5])),
      u = r(d[6]);
    function f({ label: l, value: n, accent: c }) {
      return (0, u.jsxs)(t.default, {
        style: p.metric,
        children: [
          (0, u.jsx)(s.default, { style: [p.value, c ? { color: c } : null], children: n }),
          (0, u.jsx)(s.default, { style: p.label, children: l }),
        ],
      });
    }
    const p = n.default.create({
      wrap: { marginBottom: r(d[7]).spacing.md },
      sectionTitle: {
        fontFamily: r(d[7]).fontFamily.semiBold,
        fontSize: 13,
        color: c.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        marginBottom: r(d[7]).spacing.md,
        marginTop: r(d[7]).spacing.lg,
      },
      card: { marginBottom: r(d[7]).spacing.sm },
      grid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: r(d[7]).spacing.sm },
      metric: { width: '50%', paddingVertical: r(d[7]).spacing.sm },
      value: {
        fontFamily: r(d[7]).fontFamily.bold,
        fontSize: 20,
        color: c.default.textPrimary,
        marginBottom: 2,
      },
      label: {
        fontFamily: r(d[7]).fontFamily.medium,
        fontSize: 11,
        color: c.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
      },
    });
  },
  1782,
  [1, 19, 161, 26, 379, 684, 183, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ label: t, onPress: c, selected: u = !1 }) {
        const { colors: p } = (0, r(d[6]).useTheme)(),
          f = s(p);
        return (0, l.jsx)(o.default, {
          style: [f.chip, u && f.chipSelected],
          onPress: c,
          children: (0, l.jsx)(n.default, { style: [f.text, u && f.textSelected], children: t }),
        });
      }));
    var o = t(r(d[1])),
      n = t(r(d[2])),
      c = t(r(d[3])),
      l = r(d[4]);
    const s = t =>
      c.default.create({
        chip: {
          backgroundColor: t.surfaceSoft,
          borderRadius: r(d[5]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          paddingHorizontal: r(d[5]).spacing.lg,
          paddingVertical: r(d[5]).spacing.sm + 2,
          marginRight: r(d[5]).spacing.sm,
          marginBottom: r(d[5]).spacing.sm,
          minHeight: 40,
          justifyContent: 'center',
        },
        chipSelected: {
          backgroundColor: t.chipSelectedBg,
          borderColor: t.primary,
          marginRight: r(d[5]).spacing.sm,
          marginBottom: r(d[5]).spacing.sm,
        },
        text: { fontFamily: r(d[5]).fontFamily.medium, fontSize: 14, color: t.textSecondary },
        textSelected: { color: t.primary, fontFamily: r(d[5]).fontFamily.bold },
      });
  },
  1783,
  [1, 326, 161, 26, 183, 377, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useStationMaster = function (s, n = null) {
        const [l, c] = (0, t.useState)(null),
          [o, u] = (0, t.useState)([]),
          [S, f] = (0, t.useState)([]),
          [h, b] = (0, t.useState)([]),
          [y, p] = (0, t.useState)({
            activeTrips: 0,
            totalSeats: 0,
            availableSeats: 0,
            fillRate: 0,
            waitingPassengers: 0,
            highDemandRoutes: 0,
          }),
          [k, w] = (0, t.useState)([]),
          [A, v] = (0, t.useState)(null),
          [C, P] = (0, t.useState)(null),
          [T, _] = (0, t.useState)([]),
          [D, E] = (0, t.useState)(!0),
          [F, M] = (0, t.useState)(!1),
          [R, j] = (0, t.useState)(null),
          H = (0, t.useCallback)(t => {
            (c(t.station ?? null),
              u(t.trips ?? []),
              f(t.demand ?? []),
              b(t.waiting ?? []),
              p(t.stats ?? {}),
              j(t.error?.message ?? null));
          }, []),
          O = (0, t.useCallback)(async () => {
            M(!0);
            const [t, l, c, o] = await Promise.all([
              (0, r(d[1]).fetchStationDashboard)(s, n),
              (0, r(d[1]).fetchStationAnalytics)(s, 7),
              (0, r(d[1]).fetchStationCompletedTrips)(s, 6),
              (0, r(d[2]).fetchFeedbackAnalytics)(7),
            ]);
            (H(t), v(l.data), P(o.data), _(c.data ?? []), E(!1), M(!1));
          }, [s, n, H]);
        return (
          (0, t.useEffect)(() => {
            (0, r(d[1]).fetchStations)().then(({ data: t }) => w(t ?? []));
          }, []),
          (0, t.useEffect)(() => {
            E(!0);
            return (0, r(d[1]).subscribeToStationDashboard)(
              s,
              async t => {
                H(t);
                const [n, l, c] = await Promise.all([
                  (0, r(d[1]).fetchStationAnalytics)(s, 7),
                  (0, r(d[1]).fetchStationCompletedTrips)(s, 6),
                  (0, r(d[2]).fetchFeedbackAnalytics)(7),
                ]);
                (v(n.data), P(c.data), _(l.data ?? []), E(!1), M(!1));
              },
              n
            );
          }, [s, n, H]),
          {
            station: l,
            stations: k,
            trips: o,
            demand: S,
            waiting: h,
            stats: y,
            analytics: A,
            feedbackAnalytics: C,
            completedHistory: T,
            loading: D,
            refreshing: F,
            error: R,
            refresh: O,
          }
        );
      }));
    var t = r(d[0]);
  },
  1784,
  [5, 685, 1646]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      const t = (0, r(d[0]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function n(t) {
      const n = String(t ?? '');
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(n);
    }
    function s(t) {
      return t
        ? {
            id: t.id,
            dbId: t.id,
            route: t.route_label ?? t.route ?? `${t.origin} \u2192 ${t.destination}`,
            origin: t.origin,
            destination: t.destination,
            seatsAvailable: t.seats_available ?? t.available_seats ?? 0,
            totalSeats: t.total_seats ?? 0,
            farePerSeat: Number(t.fare_per_seat ?? 0),
            vehicleType: t.vehicle_type ?? 'Trotro',
            mateId: t.mate_id,
            trackShareToken: t.track_share_token ?? null,
          }
        : null;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.adminCancelQueueEntry = async function (s) {
        if (!n(s)) return { data: { queue_id: s, status: 'cancelled' }, error: null };
        const { supabase: o, error: u } = t();
        if (u) return { data: null, error: u };
        const { data: l, error: c } = await o.rpc('admin_cancel_queue', { p_queue_id: s });
        if (c && ((0, r(d[1]).isMissingTableError)(c) || (0, r(d[1]).isRlsError)(c)))
          return {
            data: null,
            error: new Error(
              'Admin cancel requires migration 010_station_admin_queue_dispatch.sql'
            ),
          };
        return { data: l, error: c };
      }),
      (e.adminDispatchQueueToTrip = async function (o, u, l = '') {
        if (!o?.id || !u?.id) return { data: null, error: new Error('Missing queue or trip') };
        const c = s(u);
        if ((c.seatsAvailable ?? 0) <= 0)
          return { data: null, error: new Error('Selected trip has no seats available') };
        if (!n(o.id) || String(u.id).startsWith('demo-')) {
          const t = o.passenger_id ?? o.passengerId ?? null;
          if (t && c.mateId) {
            const n = await (0, r(d[2]).sendMatePassengerRequest)({
              mateId: c.mateId,
              passengerId: t,
              queueId: o.id,
              trip: c,
              mateProfile: u.profiles ?? {},
              waitingPassenger: o,
              message: l,
            });
            return {
              data: {
                invite_id: n.data?.inviteId ?? `local-admin-${Date.now()}`,
                queue_id: o.id,
                trip_id: u.id,
                passenger_id: t,
                localOnly: !0,
              },
              error: n.error,
            };
          }
          return {
            data: {
              invite_id: `local-admin-${Date.now()}`,
              queue_id: o.id,
              trip_id: u.id,
              localOnly: !0,
            },
            error: null,
          };
        }
        const { supabase: _, error: p } = t();
        if (p) return { data: null, error: p };
        const { data: f, error: b } = await _.rpc('admin_dispatch_queue_to_trip', {
          p_queue_id: o.id,
          p_trip_id: u.id,
          p_message: l ?? '',
        });
        if (b)
          return (0, r(d[1]).isMissingTableError)(b)
            ? {
                data: null,
                error: new Error(
                  'Admin dispatch requires migration 010_station_admin_queue_dispatch.sql'
                ),
              }
            : { data: null, error: b };
        const h = f?.passenger_id ?? o.passenger_id;
        h &&
          (0, r(d[3]).notifyQueueInvite)({
            origin: o.origin,
            destination: o.destination,
            mateName: u.profiles?.full_name ?? 'Station dispatch',
            userId: h,
          }).catch(() => {});
        return { data: f, error: null };
      }),
      (e.eligibleDispatchTrips = function (t = [], n) {
        const s = (n?.origin ?? '').trim().toLowerCase(),
          o = (n?.destination ?? '').trim().toLowerCase();
        return t.filter(t => {
          if ((t.seats_available ?? t.available_seats ?? 0) <= 0) return !1;
          if (String(t.id).startsWith('demo-')) return !0;
          const n = (t.origin ?? '').trim().toLowerCase(),
            u = (t.destination ?? '').trim().toLowerCase();
          return !s || !o || n.includes(s) || s.includes(n) || u.includes(o) || o.includes(u);
        });
      }),
      (e.mapStationTripToDispatchTrip = s));
  },
  1785,
  [502, 558, 1702, 760]
);
