__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[18]).useNavigation)(),
          { user: o } = (0, r(d[19]).useAuth)(),
          { colors: M } = (0, r(d[20]).useTheme)(),
          { t: F } = (0, r(d[21]).useLanguage)(),
          { showToast: R } = (0, r(d[22]).useToast)(),
          C = (0, s.useMemo)(() => O(M), [M]),
          [P, E] = (0, s.useState)([]),
          [k, H] = (0, s.useState)([]),
          [I, L] = (0, s.useState)([]),
          [B, V] = (0, s.useState)(!0),
          [J, N] = (0, s.useState)(!1),
          [W, z] = (0, s.useState)(null),
          [A, G] = (0, s.useState)(null),
          [D, U] = (0, s.useState)(''),
          [$, Q] = (0, s.useState)('live'),
          [Y, q] = (0, s.useState)(() => Date.now()),
          [K, X] = (0, s.useState)(!0),
          [Z, ee] = (0, s.useState)(0),
          [te, ae] = (0, s.useState)(!1),
          se = (0, s.useRef)(null),
          re = (0, s.useMemo)(() => P.map(t => t.id), [P]),
          ne = P[0] ?? null,
          le = (0, s.useCallback)(async () => {
            if (!o?.id) return;
            const t = (await (0, r(d[23]).fetchMyOwnedVendors)(o.id)).data ?? [];
            if ((E(t), t[0] && X(!1 !== t[0].is_open), !t.length)) return (H([]), void L([]));
            const s = t.map(t => t.id),
              [{ data: n }, { data: l }, { data: u }] = await Promise.all([
                (0, r(d[23]).fetchVendorFoodJobs)(s),
                (0, r(d[23]).fetchVendorFoodJobHistory)(s, {
                  sinceIso: (0, r(d[24]).startOfWeek)().toISOString(),
                }),
                (0, r(d[25]).fetchWallet)(),
              ]);
            (H(n ?? []), L(l ?? []), ee(Number(u?.balance_ghs ?? 0)));
          }, [o?.id]);
        ((0, s.useEffect)(() => {
          le().finally(() => V(!1));
        }, [le]),
          (0, s.useEffect)(() => {
            if (re.length)
              return (0, r(d[23]).subscribeVendorJobs)(re, () => {
                le();
              });
          }, [re, le]),
          (0, s.useEffect)(() => {
            const t = setInterval(() => q(Date.now()), 3e4);
            return () => clearInterval(t);
          }, []));
        const oe = (0, s.useMemo)(() => k.filter(t => 'pending' === t.status).length, [k]);
        (0, s.useEffect)(() => {
          if (B) return;
          const t = se.current;
          ((se.current = oe),
            null == t ||
              oe <= t ||
              ((0, r(d[26]).triggerHaptic)('heavy'),
              R({
                type: 'info',
                title: F('eats.newOrderTitle'),
                message: F('eats.newOrderMsg', { count: oe }),
              })));
        }, [oe, B, R, F]);
        const ie = (0, s.useMemo)(() => (0, r(d[24]).summarizeVendorSales)(I), [I]),
          de = (0, s.useMemo)(
            () =>
              I.filter(
                t =>
                  (0, r(d[27]).vendorPayoutFromJob)(t) > 0 &&
                  ['wallet', 'momo'].includes(t.payment_method)
              ),
            [I]
          ),
          ue = (0, s.useMemo)(
            () => de.reduce((t, s) => t + (0, r(d[27]).vendorPayoutFromJob)(s), 0),
            [de]
          ),
          ce = (0, s.useMemo)(
            () =>
              Object.fromEntries(
                Object.entries(T).map(([t, s]) => [t, k.filter(t => s.includes(t.status)).length])
              ),
            [k]
          ),
          pe = (0, s.useMemo)(() => k.filter(t => (T[$] ?? T.live).includes(t.status)), [k, $]),
          ge = async t => {
            const s = _[t.status];
            if (!s) return;
            z(t.id);
            const { error: n } = await (0, r(d[23]).vendorAdvanceFoodJob)(t.id, s);
            (z(null),
              n
                ? R({ type: 'error', title: F('eats.advanceFailed'), message: n.message })
                : ((0, r(d[26]).triggerHaptic)('medium'),
                  R({
                    type: 'success',
                    title: F('eats.orderUpdated'),
                    message: s.replace(/_/g, ' '),
                  }),
                  le()));
          },
          me = async (t, s) => {
            z(t.id);
            const n = (t.prep_eta_minutes || 20) + s,
              { error: l } = await (0, r(d[23]).vendorSetPrepEta)(t.id, n);
            (z(null),
              l
                ? R({ type: 'error', title: F('eats.advanceFailed'), message: l.message })
                : (R({ type: 'success', title: F('eats.prepEtaSet'), message: `${n} min` }), le()));
          },
          fe = (0, s.useMemo)(
            () => ({
              status: {
                pending: F('eats.statusPending'),
                accepted_by_vendor: F('eats.statusAccepted'),
                preparing: F('eats.statusPreparing'),
                ready_for_pickup: F('eats.statusReady'),
                assigned: F('eats.statusCourier'),
                picked_up: F('eats.statusCourier'),
                in_transit: F('eats.statusInTransit'),
              },
              waiting: ({ minutes: t }) => F('eats.waitingMinutes', { minutes: t }),
              foodOrder: F('eats.foodOrder'),
              prepEta: F('eats.prepEta'),
              orderTotal: F('eats.orderTotal'),
              needMoreTime: F('eats.needMoreTime'),
              withCourier: F('eats.withCourier'),
              reject: F('eats.rejectOrder'),
            }),
            [F]
          );
        if (B)
          return (0, S.jsx)(p.default, {
            title: F('eats.ordersTitle'),
            subtitle: F('eats.ordersSub'),
            scroll: !0,
            children: (0, S.jsx)(n.default, { color: M.primary, style: { marginTop: 40 } }),
          });
        if (!P.length)
          return (0, S.jsx)(p.default, {
            title: F('eats.ordersTitle'),
            subtitle: F('eats.ordersSub'),
            scroll: !0,
            children: (0, S.jsxs)(f.default, {
              elevated: !0,
              children: [
                (0, S.jsx)(u.default, { style: C.empty, children: F('eats.createStoreHint') }),
                (0, S.jsx)(u.default, {
                  style: [C.hint, { marginTop: r(d[17]).spacing.sm }],
                  children: F('eats.createStoreHint2'),
                }),
                (0, S.jsx)(y.default, {
                  title: F('appMode.createStoreCta'),
                  onPress: () => (0, r(d[29]).navigateToMainTab)(t, r(d[30]).ROUTES.VENDOR_PROFILE),
                  style: { marginTop: r(d[17]).spacing.md },
                }),
              ],
            }),
          });
        return (0, S.jsxs)(p.default, {
          title: F('eats.ordersTitle'),
          subtitle: F('eats.ordersSub'),
          scroll: !0,
          refreshControl: (0, S.jsx)(l.default, {
            refreshing: J,
            onRefresh: async () => {
              (N(!0), await le(), N(!1));
            },
            tintColor: M.primary,
          }),
          children: [
            (0, S.jsx)(b.default, {
              shopName: ne?.name,
              badgeLabel: F('eats.partnerBadge'),
              ratingLine: F('eats.heroRating', {
                rating: Number(ne?.food_rating_avg || 0).toFixed(1),
                count: ne?.food_rating_count || 0,
                hygiene: ne?.hygiene_badge ?? '\u2014',
              }),
              isOpen: K,
              onToggleOpen: async t => {
                if (!ne) return;
                X(t);
                const { error: s } = await (0, r(d[23]).vendorUpdateProfile)({
                  vendorId: ne.id,
                  isOpen: t,
                });
                if (s)
                  return (
                    X(!t),
                    void R({ type: 'error', title: F('eats.saveFailed'), message: s.message })
                  );
                R({
                  type: 'info',
                  title: F(t ? 'eats.shopOpened' : 'eats.shopClosed'),
                  message: F(t ? 'eats.openShopHint' : 'eats.closeShopHint'),
                });
              },
              openLabel: F('eats.openForOrders'),
              closedLabel: F('eats.closedForOrders'),
              openHint: F('eats.closeShopHint'),
              closedHint: F('eats.openShopHint'),
              stats: [
                { label: F('eats.statLiveOrders'), value: String(ce.live ?? 0) },
                { label: F('eats.statTodayOrders'), value: String(ie.todayOrders) },
                {
                  label: F('eats.statTodaySales'),
                  value: (0, r(d[28]).formatGhs)(ie.todayRevenue),
                  gold: !0,
                },
              ],
            }),
            (0, S.jsx)(u.default, { style: C.sectionTitle, children: F('eats.orderQueue') }),
            (0, S.jsx)(j.default, {
              value: $,
              onChange: Q,
              options: [
                { value: 'live', label: F('eats.filterLive'), count: ce.live },
                { value: 'new', label: F('eats.filterNew'), count: ce.new },
                { value: 'preparing', label: F('eats.filterPreparing'), count: ce.preparing },
                { value: 'ready', label: F('eats.filterReady'), count: ce.ready },
                { value: 'courier', label: F('eats.filterCourier'), count: ce.courier },
              ],
            }),
            (0, S.jsx)(c.default, {
              style: { marginTop: r(d[17]).spacing.md },
              children:
                0 === pe.length
                  ? (0, S.jsxs)(c.default, {
                      style: C.emptyState,
                      children: [
                        (0, S.jsx)(r(d[31]).Ionicons, {
                          name: 'receipt-outline',
                          size: 34,
                          color: M.textMuted,
                        }),
                        (0, S.jsx)(u.default, {
                          style: C.emptyTitle,
                          children: F('eats.noOrders'),
                        }),
                        (0, S.jsx)(u.default, {
                          style: C.emptyMsg,
                          children: F('eats.ordersHint'),
                        }),
                      ],
                    })
                  : pe.map(t => {
                      return (0, S.jsx)(
                        x.default,
                        {
                          job: t,
                          now: Y,
                          labels: fe,
                          nextLabel:
                            ((s = t.status),
                            'pending' === s
                              ? F('eats.acceptOrder')
                              : 'accepted_by_vendor' === s
                                ? F('eats.startPreparing')
                                : 'preparing' === s
                                  ? F('eats.markReady')
                                  : null),
                          busy: W === t.id,
                          onAdvance: ge,
                          onBumpEta: me,
                          onReject:
                            'pending' === t.status || 'accepted_by_vendor' === t.status
                              ? t => {
                                  (G(t), U(''));
                                }
                              : null,
                        },
                        t.id
                      );
                      var s;
                    }),
            }),
            (0, S.jsx)(w.default, {
              title: F('eats.bestSellers'),
              topItems: ie.topItems,
              soldLabel: ({ count: t }) => F('eats.soldThisWeek', { count: t }),
              emptyLabel: F('eats.noSalesYet'),
            }),
            (0, S.jsxs)(f.default, {
              elevated: !0,
              style: C.walletCard,
              children: [
                (0, S.jsxs)(c.default, {
                  style: C.walletRow,
                  children: [
                    (0, S.jsx)(r(d[31]).Ionicons, {
                      name: 'wallet-outline',
                      size: 26,
                      color: M.goldDeep ?? M.gold,
                    }),
                    (0, S.jsxs)(c.default, {
                      style: { flex: 1 },
                      children: [
                        (0, S.jsx)(u.default, {
                          style: C.sectionTitle,
                          children: F('wallet.modeVendorWalletTitle'),
                        }),
                        (0, S.jsx)(u.default, {
                          style: C.walletBalance,
                          children: (0, r(d[28]).formatGhs)(Z),
                        }),
                        (0, S.jsx)(u.default, {
                          style: C.hint,
                          children: F('wallet.modeVendorWalletHint'),
                        }),
                      ],
                    }),
                  ],
                }),
                ue > 0
                  ? (0, S.jsx)(y.default, {
                      title: F('wallet.vendorMoveSales', { amount: (0, r(d[28]).formatGhs)(ue) }),
                      loading: te,
                      onPress: async () => {
                        if (!o?.id || !de.length || te) return;
                        ae(!0);
                        let t = 0,
                          s = 0;
                        for (const n of de) {
                          const l = (0, r(d[27]).vendorPayoutFromJob)(n);
                          if (l <= 0) continue;
                          const { error: o } = await (0, r(d[25]).creditEarningsToWallet)(
                            l,
                            `vendor-earn-${n.id}`,
                            { source: 'vendor_earnings', job_id: n.id, kind: 'food' }
                          );
                          o || ((t += 1), (s += l));
                        }
                        (ae(!1),
                          0 !== t
                            ? ((0, r(d[26]).triggerHaptic)('medium'),
                              R({
                                type: 'success',
                                title: F('wallet.vendorClaimSuccess'),
                                message: F('wallet.vendorClaimSuccessMsg', {
                                  amount: (0, r(d[28]).formatGhs)(s),
                                  count: t,
                                }),
                              }),
                              le())
                            : R({
                                type: 'info',
                                title: F('wallet.vendorClaimNone'),
                                message: F('wallet.vendorClaimNoneMsg'),
                              }));
                      },
                    })
                  : null,
                (0, S.jsx)(y.default, {
                  title: F('wallet.openWallet'),
                  variant: 'secondary',
                  onPress: () =>
                    (0, r(d[29]).navigateToRootScreen)(t, r(d[30]).ROUTES.PROFILE_WALLET),
                }),
              ],
            }),
            (0, S.jsx)(f.default, {
              elevated: !0,
              style: { marginTop: r(d[17]).spacing.md },
              children: (0, S.jsx)(u.default, {
                style: C.hint,
                children: F('eats.weekSummary', {
                  orders: ie.weekOrders,
                  revenue: (0, r(d[28]).formatGhs)(ie.weekRevenue),
                  average: (0, r(d[28]).formatGhs)(ie.avgOrder),
                }),
              }),
            }),
            (0, S.jsxs)(v.default, {
              visible: Boolean(A),
              title: F('eats.rejectOrder'),
              subtitle: F('eats.rejectReason'),
              onClose: () => G(null),
              confirmTitle: null,
              showCancelButton: !1,
              children: [
                (0, S.jsx)(h.default, {
                  label: F('eats.rejectReason'),
                  value: D,
                  onChangeText: U,
                  placeholder: F('eats.rejectPlaceholder'),
                }),
                (0, S.jsx)(y.default, {
                  title: F('eats.rejectOrder'),
                  loading: W === A?.id,
                  onPress: async () => {
                    if (!A) return;
                    z(A.id);
                    const { error: t } = await (0, r(d[23]).vendorRejectFoodJob)(
                      A.id,
                      D.trim() || null
                    );
                    (z(null),
                      G(null),
                      U(''),
                      t
                        ? R({ type: 'error', title: F('eats.rejectFailed'), message: t.message })
                        : (R({ type: 'info', title: F('eats.orderRejected') }), le()));
                  },
                }),
                (0, S.jsx)(y.default, {
                  title: F('common.cancel'),
                  variant: 'ghost',
                  onPress: () => G(null),
                }),
              ],
            }),
          ],
        });
      }));
    var s = r(d[1]),
      n = t(r(d[2])),
      l = t(r(d[3])),
      o = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      p = t(r(d[7])),
      f = t(r(d[8])),
      y = t(r(d[9])),
      h = t(r(d[10])),
      v = t(r(d[11])),
      b = t(r(d[12])),
      j = t(r(d[13])),
      x = t(r(d[14])),
      w = t(r(d[15])),
      S = r(d[16]);
    const _ = {
        pending: 'accepted_by_vendor',
        accepted_by_vendor: 'preparing',
        preparing: 'ready_for_pickup',
      },
      T = {
        live: ['pending', 'accepted_by_vendor', 'preparing', 'ready_for_pickup'],
        new: ['pending'],
        preparing: ['accepted_by_vendor', 'preparing'],
        ready: ['ready_for_pickup'],
        courier: ['assigned', 'picked_up', 'in_transit'],
      },
      O = t =>
        o.default.create({
          empty: Object.assign({}, r(d[17]).typography.body, { color: t.textMuted }),
          hint: Object.assign({}, r(d[17]).typography.caption, {
            marginBottom: r(d[17]).spacing.md,
          }),
          sectionTitle: {
            fontFamily: r(d[17]).fontFamily.semiBold,
            fontSize: 13,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: t.textMuted,
            marginTop: r(d[17]).spacing.lg,
            marginBottom: r(d[17]).spacing.sm,
          },
          emptyState: {
            alignItems: 'center',
            paddingVertical: r(d[17]).spacing.xxl,
            gap: r(d[17]).spacing.sm,
          },
          emptyTitle: {
            fontFamily: r(d[17]).fontFamily.semiBold,
            fontSize: 16,
            color: t.textPrimary,
          },
          emptyMsg: Object.assign({}, r(d[17]).typography.caption, {
            color: t.textMuted,
            textAlign: 'center',
          }),
          walletCard: { marginTop: r(d[17]).spacing.lg, gap: r(d[17]).spacing.sm },
          walletRow: { flexDirection: 'row', alignItems: 'center', gap: r(d[17]).spacing.md },
          walletBalance: { fontFamily: r(d[17]).fontFamily.bold, fontSize: 24, color: t.success },
        });
  },
  1479,
  [
    1, 5, 373, 105, 26, 161, 19, 1510, 684, 672, 679, 1515, 1728, 1727, 1817, 1820, 183, 377, 382,
    501, 381, 1381, 1386, 1717, 1819, 1491, 674, 1669, 691, 1488, 682, 578,
  ]
);
__d(
  function (g, r, i, a, _m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        job: t,
        now: n,
        labels: f,
        nextLabel: x,
        onAdvance: y,
        onReject: h,
        onBumpEta: b,
        busy: j = !1,
      }) {
        const { colors: w } = (0, r(d[9]).useTheme)(),
          T = (0, o.useMemo)(() => p(w), [w]),
          R = Array.isArray(t.order_items) ? t.order_items : [],
          z = (0, r(d[10]).orderUrgency)(t, n),
          C = (0, r(d[10]).minutesSince)(t.created_at, n),
          _ = ['pending', 'accepted_by_vendor', 'preparing'].includes(t.status),
          B = ['assigned', 'picked_up', 'in_transit'].includes(t.status),
          S =
            'late' === z
              ? (w.error ?? w.destructive)
              : 'due' === z
                ? (w.warning ?? w.incoming)
                : 'ok' === z
                  ? (w.gold ?? w.primary)
                  : (w.success ?? w.greenAccent),
          I =
            'late' === z
              ? (w.incomingAlpha18 ?? w.surface)
              : 'due' === z
                ? (w.goldAlpha12 ?? w.surface)
                : (w.primaryAlpha06 ?? w.surface),
          F =
            'late' === z
              ? (w.error ?? w.destructive)
              : 'due' === z
                ? (w.warning ?? w.incoming)
                : w.textSecondary;
        return (0, u.jsxs)(c.default, {
          style: T.card,
          children: [
            (0, u.jsx)(c.default, { style: [T.accent, { backgroundColor: S }] }),
            (0, u.jsxs)(c.default, {
              style: T.header,
              children: [
                (0, u.jsx)(m.default, { status: t.status, label: f.status?.[t.status] }),
                (0, u.jsxs)(c.default, {
                  style: [T.timerPill, { backgroundColor: I }],
                  children: [
                    (0, u.jsx)(r(d[11]).Ionicons, { name: 'time-outline', size: 12, color: F }),
                    (0, u.jsx)(s.default, {
                      style: [T.timerText, { color: F }],
                      children: f.waiting({ minutes: C }),
                    }),
                  ],
                }),
              ],
            }),
            R.length
              ? R.map((t, o) => {
                  const l = (t.modifiers ?? []).map(t => t.label || t.id).filter(Boolean);
                  return (0, u.jsxs)(
                    c.default,
                    {
                      style: T.itemRow,
                      children: [
                        (0, u.jsxs)(s.default, { style: T.qty, children: [t.qty ?? 1, '\xd7'] }),
                        (0, u.jsxs)(c.default, {
                          style: { flex: 1 },
                          children: [
                            (0, u.jsx)(s.default, { style: T.itemName, children: t.name }),
                            l.length
                              ? (0, u.jsx)(s.default, {
                                  style: T.itemMeta,
                                  children: l.join(' \xb7 '),
                                })
                              : null,
                            t.note
                              ? (0, u.jsxs)(s.default, {
                                  style: T.itemMeta,
                                  children: ['\u201c', t.note, '\u201d'],
                                })
                              : null,
                          ],
                        }),
                      ],
                    },
                    `${t.name}-${o}`
                  );
                })
              : (0, u.jsx)(s.default, { style: T.itemName, children: f.foodOrder }),
            (0, u.jsx)(c.default, { style: T.divider }),
            (0, u.jsxs)(c.default, {
              style: T.metaRow,
              children: [
                (0, u.jsx)(r(d[11]).Ionicons, {
                  name: 'location-outline',
                  size: 15,
                  color: w.textMuted,
                }),
                (0, u.jsx)(s.default, { style: T.metaText, numberOfLines: 2, children: t.dropoff }),
              ],
            }),
            t.prep_eta_minutes
              ? (0, u.jsxs)(c.default, {
                  style: T.metaRow,
                  children: [
                    (0, u.jsx)(r(d[11]).Ionicons, {
                      name: 'hourglass-outline',
                      size: 15,
                      color: w.textMuted,
                    }),
                    (0, u.jsxs)(s.default, {
                      style: T.metaText,
                      children: [f.prepEta, ': ', t.prep_eta_minutes, ' min'],
                    }),
                  ],
                })
              : null,
            t.customer_note || t.notes
              ? (0, u.jsxs)(c.default, {
                  style: T.noteBox,
                  children: [
                    (0, u.jsx)(r(d[11]).Ionicons, {
                      name: 'chatbubble-ellipses-outline',
                      size: 15,
                      color: w.goldDeep,
                    }),
                    (0, u.jsx)(s.default, {
                      style: T.noteText,
                      children: t.customer_note || t.notes,
                    }),
                  ],
                })
              : null,
            (0, u.jsxs)(c.default, {
              style: T.totalRow,
              children: [
                (0, u.jsx)(s.default, { style: T.totalLabel, children: f.orderTotal }),
                (0, u.jsx)(s.default, {
                  style: T.total,
                  children: (0, r(d[12]).formatGhs)(t.fare_breakdown?.total ?? 0),
                }),
              ],
            }),
            _
              ? (0, u.jsxs)(c.default, {
                  style: T.etaRow,
                  children: [
                    (0, u.jsx)(s.default, { style: T.etaLabel, children: f.needMoreTime }),
                    [5, 10, 15].map(o =>
                      (0, u.jsx)(
                        l.default,
                        {
                          style: [T.etaChip, j && T.disabled],
                          disabled: j,
                          onPress: () => b(t, o),
                          children: (0, u.jsxs)(s.default, {
                            style: T.etaChipText,
                            children: ['+', o],
                          }),
                        },
                        o
                      )
                    ),
                  ],
                })
              : null,
            B
              ? (0, u.jsxs)(c.default, {
                  style: T.courierRow,
                  children: [
                    (0, u.jsx)(r(d[11]).Ionicons, {
                      name: 'bicycle-outline',
                      size: 18,
                      color: w.success,
                    }),
                    (0, u.jsx)(s.default, { style: T.metaText, children: f.withCourier }),
                  ],
                })
              : null,
            (0, u.jsxs)(c.default, {
              style: T.actions,
              children: [
                x
                  ? (0, u.jsxs)(l.default, {
                      style: [T.primaryBtn, j && T.disabled],
                      disabled: j,
                      onPress: () => y(t),
                      children: [
                        (0, u.jsx)(r(d[11]).Ionicons, {
                          name: 'arrow-forward-circle',
                          size: 20,
                          color: w.onPrimary,
                        }),
                        (0, u.jsx)(s.default, { style: T.primaryText, children: x }),
                      ],
                    })
                  : null,
                h
                  ? (0, u.jsx)(l.default, {
                      style: T.ghostBtn,
                      disabled: j,
                      onPress: () => h(t),
                      children: (0, u.jsx)(s.default, { style: T.ghostText, children: f.reject }),
                    })
                  : null,
              ],
            }),
          ],
        });
      }));
    var o = r(d[1]),
      l = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      m = t(r(d[6])),
      u = r(d[7]);
    const p = t =>
      n.default.create({
        card: {
          borderRadius: r(d[8]).radius.lg,
          borderWidth: 1,
          borderColor: t.borderSoft ?? t.border,
          backgroundColor: t.surfaceElevated ?? t.surface,
          padding: r(d[8]).spacing.lg,
          marginBottom: r(d[8]).spacing.md,
          overflow: 'hidden',
        },
        accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: r(d[8]).spacing.sm,
          marginBottom: r(d[8]).spacing.md,
        },
        timerPill: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: r(d[8]).spacing.sm,
          paddingVertical: 3,
          borderRadius: r(d[8]).radius.pill,
        },
        timerText: { fontFamily: r(d[8]).fontFamily.semiBold, fontSize: 12 },
        itemRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[8]).spacing.sm,
          marginBottom: r(d[8]).spacing.xs,
        },
        qty: {
          minWidth: 26,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: r(d[8]).radius.sm,
          backgroundColor: t.primaryAlpha08 ?? t.surface,
          textAlign: 'center',
          fontFamily: r(d[8]).fontFamily.bold,
          fontSize: 13,
          color: t.textPrimary,
          overflow: 'hidden',
        },
        itemName: {
          flex: 1,
          fontFamily: r(d[8]).fontFamily.semiBold,
          fontSize: 15,
          lineHeight: 21,
          color: t.textPrimary,
        },
        itemMeta: Object.assign({}, r(d[8]).typography.caption, {
          color: t.textMuted,
          fontSize: 13,
        }),
        divider: {
          height: n.default.hairlineWidth,
          backgroundColor: t.borderSoft ?? t.border,
          marginVertical: r(d[8]).spacing.md,
        },
        metaRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[8]).spacing.sm,
          marginBottom: r(d[8]).spacing.xs,
        },
        metaText: Object.assign({ flex: 1 }, r(d[8]).typography.caption, {
          color: t.textSecondary,
        }),
        noteBox: {
          flexDirection: 'row',
          gap: r(d[8]).spacing.sm,
          padding: r(d[8]).spacing.md,
          borderRadius: r(d[8]).radius.md,
          backgroundColor: t.goldAlpha12 ?? t.surface,
          marginTop: r(d[8]).spacing.sm,
        },
        noteText: Object.assign({ flex: 1 }, r(d[8]).typography.caption, {
          color: t.textSecondary,
        }),
        totalRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: r(d[8]).spacing.md,
        },
        totalLabel: Object.assign({}, r(d[8]).typography.caption, {
          color: t.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          fontSize: 11,
        }),
        total: { fontFamily: r(d[8]).fontFamily.bold, fontSize: 22, color: t.gold ?? t.primary },
        etaRow: {
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: r(d[8]).spacing.xs,
          marginTop: r(d[8]).spacing.md,
        },
        etaLabel: Object.assign({}, r(d[8]).typography.caption, {
          color: t.textMuted,
          marginRight: r(d[8]).spacing.xs,
        }),
        etaChip: {
          paddingHorizontal: r(d[8]).spacing.md,
          paddingVertical: 6,
          borderRadius: r(d[8]).radius.pill,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        etaChipText: {
          fontFamily: r(d[8]).fontFamily.semiBold,
          fontSize: 13,
          color: t.textPrimary,
        },
        actions: { marginTop: r(d[8]).spacing.lg, gap: r(d[8]).spacing.sm },
        primaryBtn: {
          minHeight: 52,
          borderRadius: r(d[8]).radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: r(d[8]).spacing.sm,
          backgroundColor: t.primary,
        },
        primaryText: { fontFamily: r(d[8]).fontFamily.bold, fontSize: 16, color: t.onPrimary },
        ghostBtn: { alignItems: 'center', paddingVertical: r(d[8]).spacing.sm },
        ghostText: {
          fontFamily: r(d[8]).fontFamily.semiBold,
          fontSize: 14,
          color: t.error ?? t.destructive,
        },
        courierRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[8]).spacing.sm,
          marginTop: r(d[8]).spacing.md,
        },
        disabled: { opacity: 0.5 },
      });
  },
  1817,
  [1, 5, 326, 26, 161, 19, 1818, 183, 377, 381, 1819, 578, 691]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ status: n, label: l }) {
        const { colors: _ } = (0, r(d[7]).useTheme)(),
          y = (0, t.useMemo)(() => f(_), [_]),
          b = p(n, _);
        return (0, s.jsxs)(o.default, {
          style: [y.chip, { borderColor: b }],
          children: [
            (0, s.jsx)(r(d[8]).Ionicons, { name: u[n] ?? 'ellipse-outline', size: 12, color: b }),
            (0, s.jsx)(c.default, {
              style: [y.text, { color: b }],
              children: l ?? String(n).replace(/_/g, ' '),
            }),
          ],
        });
      }));
    var t = r(d[1]),
      l = n(r(d[2])),
      c = n(r(d[3])),
      o = n(r(d[4])),
      s = r(d[5]);
    const u = {
      pending: 'ellipse-outline',
      accepted_by_vendor: 'checkmark-circle-outline',
      preparing: 'flame-outline',
      ready_for_pickup: 'bag-check-outline',
      assigned: 'bicycle-outline',
      picked_up: 'bicycle-outline',
      in_transit: 'navigate-outline',
      delivered: 'checkmark-done-outline',
    };
    function p(n, t) {
      return 'pending' === n
        ? (t.incoming ?? t.warning)
        : 'preparing' === n
          ? t.warning
          : 'ready_for_pickup' === n
            ? (t.gold ?? t.warning)
            : ['assigned', 'picked_up', 'in_transit', 'delivered'].includes(n)
              ? (t.success ?? t.greenAccent)
              : t.textSecondary;
    }
    const f = n =>
      l.default.create({
        chip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          alignSelf: 'flex-start',
          paddingHorizontal: r(d[6]).spacing.sm,
          paddingVertical: 4,
          borderRadius: r(d[6]).radius.pill,
          borderWidth: 1,
          backgroundColor: n.surface,
        },
        text: {
          fontFamily: r(d[6]).fontFamily.semiBold,
          fontSize: 11,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        },
      });
  },
  1818,
  [1, 5, 26, 161, 19, 183, 377, 381, 578]
);
__d(
  function (g, r, i, _a, m, e, _d) {
    function t(t = new Date()) {
      const n = new Date(t);
      return (n.setHours(0, 0, 0, 0), n);
    }
    function n(n = new Date()) {
      const o = t(n),
        a = o.getDay(),
        s = 0 === a ? 6 : a - 1;
      return (o.setDate(o.getDate() - s), o);
    }
    function o(t) {
      const n = t?.fare_breakdown ?? {},
        o = Number(n.vendorPayoutGhs ?? n.vendorEarnings ?? 0);
      if (o > 0) return o;
      const a = n.foodSubtotal ?? n.total ?? 0;
      return Number(a) || 0;
    }
    function a(t) {
      return Math.round(100 * (Number(t) || 0)) / 100;
    }
    function s(t, n = Date.now()) {
      const o = new Date(t ?? 0).getTime();
      return !o || Number.isNaN(o) ? 0 : Math.max(0, Math.floor((n - o) / 6e4));
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.minutesSince = s),
      (e.orderUrgency = function (t, n = Date.now()) {
        if (!['pending', 'accepted_by_vendor', 'preparing'].includes(t?.status)) return 'none';
        const o = s(t?.created_at, n),
          a = 'pending' === t?.status ? 3 : Number(t?.prep_eta_minutes ?? 20);
        return o >= 1.5 * a ? 'late' : o >= a ? 'due' : 'ok';
      }),
      (e.startOfToday = t),
      (e.startOfWeek = n),
      (e.summarizeVendorSales = function (s = [], u = new Date()) {
        const c = t(u).getTime(),
          d = n(u).getTime();
        let f = 0,
          y = 0,
          _ = 0,
          b = 0;
        const p = new Map();
        for (const t of s) {
          const n = new Date(t?.created_at ?? 0).getTime();
          if (Number.isNaN(n)) continue;
          const a = o(t);
          if ((n >= d && ((y += a), (b += 1)), n >= c && ((f += a), (_ += 1)), n >= d)) {
            const n = Array.isArray(t?.order_items) ? t.order_items : [];
            for (const t of n) {
              const n = t?.name?.trim();
              if (!n) continue;
              const o = Number(t?.qty ?? 1) || 1,
                a = Number(t?.price_ghs ?? t?.price ?? 0) || 0,
                s = p.get(n) ?? { name: n, qty: 0, revenue: 0 };
              ((s.qty += o), (s.revenue += a * o), p.set(n, s));
            }
          }
        }
        const w = [...p.values()].sort((t, n) => n.qty - t.qty).slice(0, 3);
        return {
          todayRevenue: a(f),
          weekRevenue: a(y),
          todayOrders: _,
          weekOrders: b,
          avgOrder: b ? a(y / b) : 0,
          topItems: w,
        };
      }));
  },
  1819,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ title: t, topItems: l = [], soldLabel: y, emptyLabel: p }) {
        const { colors: h } = (0, r(d[7]).useTheme)(),
          b = (0, o.useMemo)(() => f(h), [h]);
        return (0, c.jsxs)(s.default, {
          style: b.card,
          children: [
            (0, c.jsxs)(s.default, {
              style: b.header,
              children: [
                (0, c.jsx)(r(d[8]).Ionicons, {
                  name: 'stats-chart',
                  size: 16,
                  color: h.goldDeep ?? h.gold,
                }),
                (0, c.jsx)(n.default, { style: b.title, children: t }),
              ],
            }),
            l.length
              ? l.map((t, o) =>
                  (0, c.jsxs)(
                    s.default,
                    {
                      style: b.row,
                      children: [
                        (0, c.jsx)(s.default, {
                          style: b.rank,
                          children: (0, c.jsx)(r(d[8]).Ionicons, {
                            name: u[o] ?? 'ribbon-outline',
                            size: 14,
                            color: h.goldDeep ?? h.gold,
                          }),
                        }),
                        (0, c.jsxs)(s.default, {
                          style: { flex: 1 },
                          children: [
                            (0, c.jsx)(n.default, {
                              style: b.name,
                              numberOfLines: 1,
                              children: t.name,
                            }),
                            (0, c.jsx)(n.default, { style: b.qty, children: y({ count: t.qty }) }),
                          ],
                        }),
                        t.revenue > 0
                          ? (0, c.jsx)(n.default, {
                              style: b.revenue,
                              children: (0, r(d[9]).formatGhs)(t.revenue),
                            })
                          : null,
                      ],
                    },
                    t.name
                  )
                )
              : (0, c.jsx)(n.default, { style: b.empty, children: p }),
          ],
        });
      }));
    var o = r(d[1]),
      l = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = r(d[5]);
    const u = ['trophy', 'ribbon-outline', 'ribbon-outline'],
      f = t =>
        l.default.create({
          card: {
            borderRadius: r(d[6]).radius.lg,
            borderWidth: 1,
            borderColor: t.borderSoft ?? t.border,
            backgroundColor: t.surfaceElevated ?? t.surface,
            padding: r(d[6]).spacing.lg,
            marginTop: r(d[6]).spacing.lg,
          },
          header: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: r(d[6]).spacing.sm,
            marginBottom: r(d[6]).spacing.md,
          },
          title: {
            fontFamily: r(d[6]).fontFamily.semiBold,
            fontSize: 13,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: t.textMuted,
          },
          row: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: r(d[6]).spacing.md,
            paddingVertical: r(d[6]).spacing.sm,
          },
          rank: {
            width: 26,
            height: 26,
            borderRadius: 13,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: t.goldAlpha12 ?? t.surface,
          },
          name: {
            flex: 1,
            fontFamily: r(d[6]).fontFamily.semiBold,
            fontSize: 15,
            color: t.textPrimary,
          },
          qty: Object.assign({}, r(d[6]).typography.caption, { color: t.textSecondary }),
          revenue: {
            fontFamily: r(d[6]).fontFamily.bold,
            fontSize: 15,
            color: t.gold ?? t.primary,
          },
          empty: Object.assign({}, r(d[6]).typography.caption, { color: t.textMuted }),
        });
  },
  1820,
  [1, 5, 26, 161, 19, 183, 377, 381, 578, 691]
);
