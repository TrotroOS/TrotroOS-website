__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const { colors: l, isDark: o } = (0, r(d[12]).useTheme)(),
          { t: h } = (0, r(d[13]).useLanguage)(),
          k = (0, t.useMemo)(() => b(l), [l]),
          { showToast: F } = (0, r(d[14]).useToast)(),
          { activeJob: j, advanceJob: S, loading: _ } = (0, r(d[15]).useDeliveryCourier)(),
          T = j ? x(j.status, h) : null,
          M = (0, t.useMemo)(
            () => ({
              assigned: h('delivery.courierStatusAssigned'),
              picked_up: h('delivery.courierStatusPickedUp'),
              in_transit: h('delivery.courierStatusInTransit'),
              delivered: h('delivery.courierStatusDelivered'),
            }),
            [h]
          );
        if (!j)
          return (0, v.jsx)(c.default, {
            title: h('delivery.courierActiveTitle'),
            subtitle: h('delivery.courierActiveSubEmpty'),
            scroll: !0,
            children: (0, v.jsx)(p.default, {
              icon: 'cube-outline',
              title: h('delivery.courierActiveEmpty'),
              message: h('delivery.courierActiveEmptyMsg'),
            }),
          });
        const A = j.fare_breakdown?.courierEarnings ?? j.fare_breakdown?.total ?? 0,
          L = o ? ['#1A1810', '#111111'] : ['#FFFBF2', '#FFFFFF'];
        return (0, v.jsxs)(c.default, {
          title: h('delivery.courierActiveTitle'),
          subtitle: 'food' === j.kind ? h('delivery.courierFoodOrder') : h('delivery.parcelLabel'),
          scroll: !0,
          children: [
            (0, v.jsx)(s.default, {
              style: k.earnShell,
              children: (0, v.jsx)(r(d[16]).LinearGradient, {
                colors: L,
                start: { x: 0, y: 0 },
                end: { x: 1, y: 1 },
                children: (0, v.jsxs)(s.default, {
                  style: k.earnInner,
                  children: [
                    (0, v.jsx)(n.default, {
                      style: k.earnLabel,
                      children: h('delivery.yourEarnings'),
                    }),
                    (0, v.jsx)(n.default, {
                      style: k.earnValue,
                      children: (0, r(d[17]).formatGhs)(A),
                    }),
                  ],
                }),
              }),
            }),
            (0, v.jsxs)(s.default, {
              style: k.timelineCard,
              children: [
                (0, v.jsx)(n.default, {
                  style: k.timelineTitle,
                  children: h('delivery.courierProgress'),
                }),
                (0, v.jsx)(f.default, { status: j.status, labels: M }),
              ],
            }),
            (0, v.jsx)(y.default, {
              pickup: j.pickup,
              dropoff: j.dropoff,
              pickupLabel: h('delivery.pickup'),
              dropoffLabel: h('delivery.dropoff'),
              kind: j.kind,
              kindLabel:
                'food' === j.kind ? h('delivery.courierFoodOrder') : h('delivery.parcelLabel'),
            }),
            j.recipient_phone
              ? (0, v.jsxs)(n.default, {
                  style: k.meta,
                  children: [h('delivery.recipientPhone'), ': ', j.recipient_phone],
                })
              : null,
            j.notes ? (0, v.jsx)(n.default, { style: k.meta, children: j.notes }) : null,
            (0, v.jsxs)(s.default, {
              style: k.actions,
              children: [
                T
                  ? (0, v.jsx)(u.default, {
                      title: T.label,
                      loading: _,
                      onPress: async () => {
                        if (!T) return;
                        const { error: l } = await S(T.next);
                        F(
                          l
                            ? {
                                type: 'error',
                                title: h('delivery.courierUpdateFailed'),
                                message: l.message,
                              }
                            : {
                                type: 'success',
                                title:
                                  'delivered' === T.next
                                    ? h('delivery.courierDelivered')
                                    : h('delivery.courierUpdated'),
                                message:
                                  'delivered' === T.next
                                    ? h('delivery.courierDeliveredMsg')
                                    : h('delivery.courierUpdatedMsg', {
                                        status: T.next.replace(/_/g, ' '),
                                      }),
                              }
                        );
                      },
                    })
                  : null,
                (0, v.jsx)(u.default, {
                  title: h('delivery.courierCancelJob'),
                  variant: 'ghost',
                  loading: _,
                  onPress: async () => {
                    const { error: l } = await S('cancelled');
                    l &&
                      F({ type: 'error', title: h('delivery.cancelFailed'), message: l.message });
                  },
                }),
              ],
            }),
          ],
        });
      }));
    var t = r(d[1]),
      o = l(r(d[2])),
      n = l(r(d[3])),
      s = l(r(d[4])),
      c = l(r(d[5])),
      u = l(r(d[6])),
      p = l(r(d[7])),
      y = l(r(d[8])),
      f = l(r(d[9])),
      v = r(d[10]);
    const b = l =>
      o.default.create({
        earnShell: {
          borderRadius: r(d[11]).radius.xl,
          overflow: 'hidden',
          marginBottom: r(d[11]).spacing.lg,
          borderWidth: 1,
          borderColor: l.goldAlpha25 ?? 'rgba(201, 162, 39, 0.28)',
        },
        earnInner: { padding: r(d[11]).spacing.lg },
        earnLabel: {
          fontFamily: r(d[11]).fontFamily.medium,
          fontSize: 12,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: l.textMuted,
        },
        earnValue: {
          fontFamily: r(d[11]).fontFamily.bold,
          fontSize: 32,
          color: l.gold ?? '#C9A227',
          marginTop: 4,
        },
        timelineCard: {
          borderRadius: r(d[11]).radius.lg,
          borderWidth: 1,
          borderColor: l.borderSoft ?? l.border,
          backgroundColor: l.surfaceElevated ?? l.surface,
          padding: r(d[11]).spacing.lg,
          marginBottom: r(d[11]).spacing.lg,
        },
        timelineTitle: {
          fontFamily: r(d[11]).fontFamily.semiBold,
          fontSize: 13,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: l.textMuted,
          marginBottom: r(d[11]).spacing.md,
        },
        meta: Object.assign({}, r(d[11]).typography.body, {
          color: l.textSecondary,
          marginTop: r(d[11]).spacing.md,
        }),
        actions: { gap: r(d[11]).spacing.sm, marginTop: r(d[11]).spacing.lg },
      });
    function x(l, t) {
      return 'assigned' === l
        ? { label: t('delivery.courierMarkPickedUp'), next: 'picked_up' }
        : 'picked_up' === l
          ? { label: t('delivery.courierStartDelivery'), next: 'in_transit' }
          : 'in_transit' === l
            ? { label: t('delivery.courierMarkDelivered'), next: 'delivered' }
            : null;
    }
  },
  1477,
  [1, 5, 26, 161, 19, 1510, 672, 1534, 1489, 1816, 183, 377, 381, 1381, 1386, 1483, 1707, 691]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ status: o, labels: l }) {
        const { colors: h } = (0, r(d[7]).useTheme)(),
          p = (0, t.useMemo)(() => f(h), [h]),
          x = b(o);
        return (0, s.jsx)(c.default, {
          children: u.map((o, t) => {
            const f = t < x,
              b = t === x,
              y = t === u.length - 1;
            return (0, s.jsxs)(
              c.default,
              {
                style: p.row,
                children: [
                  (0, s.jsxs)(c.default, {
                    style: p.rail,
                    children: [
                      (0, s.jsx)(c.default, {
                        style: [p.stepDot, f && p.stepDotDone, b && p.stepDotActive],
                        children: f
                          ? (0, s.jsx)(r(d[8]).Ionicons, {
                              name: 'checkmark',
                              size: 14,
                              color: h.success ?? h.greenAccent,
                            })
                          : b
                            ? (0, s.jsx)(c.default, {
                                style: {
                                  width: 8,
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: h.gold ?? '#C9A227',
                                },
                              })
                            : null,
                      }),
                      y
                        ? null
                        : (0, s.jsx)(c.default, { style: [p.connector, f && p.connectorDone] }),
                    ],
                  }),
                  (0, s.jsx)(c.default, {
                    style: [p.labels, y && { paddingBottom: 0 }],
                    children: (0, s.jsx)(n.default, {
                      style: [p.label, f && p.labelDone, b && p.labelActive],
                      children: l[o] ?? o.replace(/_/g, ' '),
                    }),
                  }),
                ],
              },
              o
            );
          }),
        });
      }));
    var t = r(d[1]),
      l = o(r(d[2])),
      n = o(r(d[3])),
      c = o(r(d[4])),
      s = r(d[5]);
    const u = ['assigned', 'picked_up', 'in_transit', 'delivered'],
      f = o =>
        l.default.create({
          row: { flexDirection: 'row', alignItems: 'flex-start', gap: r(d[6]).spacing.md },
          rail: { alignItems: 'center', width: 28 },
          stepDot: {
            width: 28,
            height: 28,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: o.borderSoft ?? o.border,
            backgroundColor: o.surface,
          },
          stepDotDone: {
            borderColor: o.success ?? o.greenAccent,
            backgroundColor: o.greenAlpha12 ?? o.successSoft,
          },
          stepDotActive: {
            borderColor: o.gold ?? '#C9A227',
            backgroundColor: o.goldAlpha12 ?? 'rgba(201, 162, 39, 0.14)',
          },
          connector: {
            width: 2,
            flex: 1,
            minHeight: 24,
            backgroundColor: o.borderSoft ?? o.border,
            marginVertical: 4,
          },
          connectorDone: { backgroundColor: o.success ?? o.greenAccent },
          labels: { flex: 1, paddingBottom: r(d[6]).spacing.lg },
          label: { fontFamily: r(d[6]).fontFamily.medium, fontSize: 14, color: o.textMuted },
          labelDone: { color: o.textSecondary },
          labelActive: { fontFamily: r(d[6]).fontFamily.bold, fontSize: 15, color: o.textPrimary },
        });
    function b(o) {
      const t = u.indexOf(o);
      return t >= 0 ? t : 0;
    }
  },
  1816,
  [1, 5, 26, 161, 19, 183, 377, 381, 578]
);
