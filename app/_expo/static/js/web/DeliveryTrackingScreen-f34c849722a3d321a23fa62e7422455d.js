__d(
  function (g, r, i, a, _m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[12]).useRoute)(),
          n = t.params?.jobId,
          { user: x } = (0, r(d[13]).useAuth)(),
          { colors: _ } = (0, r(d[14]).useTheme)(),
          { t: k } = (0, r(d[15]).useLanguage)(),
          F = (0, s.useMemo)(() => b(_), [_]),
          { showToast: T } = (0, r(d[16]).useToast)(),
          [D, w] = (0, s.useState)(null),
          [S, A] = (0, s.useState)(!0),
          [P, G] = (0, s.useState)(!1),
          [R, B] = (0, s.useState)(!1),
          L = (0, s.useCallback)(async () => {
            if (!n) return;
            const { data: t } = await (0, r(d[17]).fetchDeliveryJob)(n);
            if ((w(t), 'food' === t?.kind && 'delivered' === t?.status && x?.id)) {
              const t = await (0, r(d[18]).fetchFoodRatingForJob)(n, x.id);
              (B(Boolean(t.data)), t.data || G(!0));
            }
          }, [n, x?.id]);
        if (
          ((0, s.useEffect)(() => {
            L().finally(() => A(!1));
            return (0, r(d[17]).subscribeDeliveryJob)(n, t => {
              t?.new ? w(t.new) : L();
            });
          }, [n, L]),
          S)
        )
          return (0, y.jsx)(c.default, {
            title: k('delivery.trackTitle'),
            subtitle: k('common.loading'),
            children: (0, y.jsx)(l.default, { color: _.primary, style: { marginTop: 40 } }),
          });
        if (!D)
          return (0, y.jsx)(c.default, {
            title: k('delivery.trackTitle'),
            subtitle: k('delivery.notFound'),
            children: (0, y.jsx)(m.default, {
              elevated: !0,
              children: (0, y.jsx)(o.default, {
                style: F.meta,
                children: k('delivery.notFoundBody'),
              }),
            }),
          });
        const C = 'food' === D.kind ? v : h,
          I = C.indexOf(D.status),
          J = ['cancelled', 'expired', 'delivered'].includes(D.status),
          M = D.fare_breakdown || {},
          O = Array.isArray(D.order_items) ? D.order_items : [],
          $ = 'food' === D.kind ? j(D, k) : null;
        return (0, y.jsxs)(c.default, {
          title: 'food' === D.kind ? k('eats.homeTitle') : k('delivery.parcelLabel'),
          subtitle: D.status.replace(/_/g, ' '),
          children: [
            (0, y.jsxs)(m.default, {
              elevated: !0,
              children: [
                (0, y.jsx)(o.default, { style: F.status, children: D.status.replace(/_/g, ' ') }),
                $ ? (0, y.jsx)(o.default, { style: F.meta, children: $ }) : null,
                (0, y.jsxs)(o.default, {
                  style: F.meta,
                  children: [k('delivery.from'), ': ', D.pickup],
                }),
                (0, y.jsxs)(o.default, {
                  style: F.meta,
                  children: [k('delivery.to'), ': ', D.dropoff],
                }),
                (0, y.jsxs)(o.default, {
                  style: F.meta,
                  children: [
                    (0, r(d[19]).formatGhs)(M.total ?? 0),
                    ' \xb7 ',
                    D.payment_status,
                    ' (',
                    D.payment_method,
                    ')',
                  ],
                }),
                'food' === D.kind && O.length
                  ? (0, y.jsxs)(u.default, {
                      style: { marginTop: r(d[11]).spacing.sm },
                      children: [
                        (0, y.jsx)(o.default, {
                          style: [F.meta, { fontFamily: r(d[11]).fontFamily.semiBold }],
                          children: k('eats.orderItems'),
                        }),
                        O.map((t, s) =>
                          (0, y.jsxs)(
                            o.default,
                            {
                              style: F.meta,
                              children: [
                                t.qty ?? 1,
                                '\xd7 ',
                                t.name,
                                (t.modifiers ?? []).length
                                  ? ` (${t.modifiers.map(t => t.label || t.id).join(', ')})`
                                  : '',
                              ],
                            },
                            `${t.id ?? s}-${s}`
                          )
                        ),
                      ],
                    })
                  : null,
                'food' === D.kind
                  ? (0, y.jsxs)(u.default, {
                      style: { marginTop: r(d[11]).spacing.sm },
                      children: [
                        (0, y.jsxs)(o.default, {
                          style: F.meta,
                          children: [
                            k('eats.foodSubtotal'),
                            ' ',
                            (0, r(d[19]).formatGhs)(M.itemsSubtotal ?? 0),
                          ],
                        }),
                        (0, y.jsxs)(o.default, {
                          style: F.meta,
                          children: [
                            k('eats.deliveryFee'),
                            ' ',
                            (0, r(d[19]).formatGhs)(M.deliveryFee ?? 0),
                          ],
                        }),
                        Number(M.serviceFee || 0) > 0
                          ? (0, y.jsxs)(o.default, {
                              style: F.meta,
                              children: [
                                k('eats.serviceFee'),
                                ' ',
                                (0, r(d[19]).formatGhs)(M.serviceFee),
                              ],
                            })
                          : null,
                        Number(M.tipGhs || D.tip_ghs || 0) > 0
                          ? (0, y.jsxs)(o.default, {
                              style: F.meta,
                              children: [
                                k('eats.tip'),
                                ' ',
                                (0, r(d[19]).formatGhs)(M.tipGhs ?? D.tip_ghs),
                              ],
                            })
                          : null,
                      ],
                    })
                  : null,
                (0, y.jsx)(u.default, {
                  style: { marginTop: r(d[11]).spacing.lg },
                  children: C.map((t, s) => {
                    const l = I > s || 'delivered' === D.status,
                      n = D.status === t;
                    return (0, y.jsxs)(
                      u.default,
                      {
                        style: F.stepRow,
                        children: [
                          (0, y.jsx)(u.default, {
                            style: [F.stepDot, l && F.stepDotDone, n && F.stepDotActive],
                          }),
                          (0, y.jsx)(o.default, {
                            style: [F.stepLabel, (l || n) && F.stepLabelActive],
                            children: t.replace(/_/g, ' '),
                          }),
                        ],
                      },
                      t
                    );
                  }),
                }),
                'food' !== D.kind || 'delivered' !== D.status || R
                  ? null
                  : (0, y.jsx)(p.default, {
                      title: k('eats.rateTitle'),
                      onPress: () => G(!0),
                      style: { marginTop: r(d[11]).spacing.md },
                    }),
                J
                  ? null
                  : (0, y.jsx)(p.default, {
                      title: k('delivery.cancel'),
                      variant: 'ghost',
                      onPress: async () => {
                        const { error: t } = await (0, r(d[17]).advanceDeliveryJob)(
                          D.id,
                          'cancelled'
                        );
                        t
                          ? T({
                              type: 'error',
                              title: k('delivery.cancelFailed'),
                              message: t.message,
                            })
                          : (T({
                              type: 'info',
                              title: k('delivery.cancelled'),
                              message: k('delivery.cancelledMsg'),
                            }),
                            L());
                      },
                    }),
              ],
            }),
            (0, y.jsx)(f.default, {
              visible: P,
              jobId: D.id,
              onClose: () => G(!1),
              onSubmitted: () => B(!0),
            }),
          ],
        });
      }));
    var s = r(d[1]),
      l = t(r(d[2])),
      n = t(r(d[3])),
      o = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      m = t(r(d[7])),
      p = t(r(d[8])),
      f = t(r(d[9])),
      y = r(d[10]);
    const h = ['pending', 'assigned', 'picked_up', 'in_transit', 'delivered'],
      v = [
        'pending',
        'accepted_by_vendor',
        'preparing',
        'ready_for_pickup',
        'assigned',
        'picked_up',
        'in_transit',
        'delivered',
      ],
      b = t =>
        n.default.create({
          status: {
            fontFamily: r(d[11]).fontFamily.bold,
            fontSize: 20,
            color: t.textPrimary,
            marginBottom: r(d[11]).spacing.sm,
          },
          meta: Object.assign({}, r(d[11]).typography.body, { marginBottom: r(d[11]).spacing.xs }),
          stepRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: r(d[11]).spacing.sm,
            marginBottom: r(d[11]).spacing.sm,
          },
          stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: t.border },
          stepDotActive: { backgroundColor: t.primary },
          stepDotDone: { backgroundColor: t.success },
          stepLabel: {
            fontFamily: r(d[11]).fontFamily.medium,
            color: t.textSecondary,
            textTransform: 'capitalize',
          },
          stepLabelActive: { color: t.textPrimary, fontFamily: r(d[11]).fontFamily.bold },
        });
    function j(t, s) {
      return 'pending' === t.status
        ? s('delivery.hintPending')
        : 'accepted_by_vendor' === t.status || 'preparing' === t.status
          ? t.prep_eta_minutes
            ? s('delivery.hintPreparingEta', { minutes: t.prep_eta_minutes })
            : s('delivery.hintPreparing')
          : 'ready_for_pickup' === t.status
            ? s('delivery.hintReady')
            : 'assigned' === t.status
              ? s('delivery.hintAssigned')
              : 'picked_up' === t.status || 'in_transit' === t.status
                ? s('delivery.hintInTransit')
                : 'cancelled' === t.status && t.reject_reason
                  ? s('delivery.hintRejected', { reason: t.reject_reason })
                  : null;
    }
  },
  1475,
  [
    1, 5, 373, 26, 161, 19, 1710, 684, 672, 1812, 183, 377, 382, 501, 381, 1381, 1386, 1492, 1717,
    691,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ visible: t, jobId: l, onClose: o, onSubmitted: u }) {
        const { colors: x } = (0, r(d[12]).useTheme)(),
          { t: v } = (0, r(d[13]).useLanguage)(),
          { showToast: S } = (0, r(d[14]).useToast)(),
          C = (0, s.useMemo)(() => b(x), [x]),
          [T, F] = (0, s.useState)(5),
          [O, P] = (0, s.useState)(5),
          [w, B] = (0, s.useState)(''),
          [_, D] = (0, s.useState)(null),
          [I, M] = (0, s.useState)(!1);
        return (0, p.jsxs)(c.default, {
          visible: t,
          title: v('eats.rateTitle'),
          subtitle: 'Food and delivery',
          onClose: o,
          confirmTitle: null,
          showCancelButton: !1,
          children: [
            (0, p.jsx)(n.default, { style: C.label, children: v('eats.rateFood') }),
            (0, p.jsx)(j, { value: T, onChange: F, styles: C }),
            (0, p.jsx)(n.default, { style: C.label, children: v('eats.rateDelivery') }),
            (0, p.jsx)(j, { value: O, onChange: P, styles: C }),
            (0, p.jsx)(h.default, {
              label: v('eats.rateComment'),
              value: w,
              onChangeText: B,
              placeholder: 'Optional',
            }),
            (0, p.jsx)(y.default, {
              label: v('eats.ratePhoto'),
              value: _,
              onChange: D,
              folder: 'ratings',
              disabled: I,
            }),
            (0, p.jsx)(f.default, {
              title: v('eats.rateSubmit'),
              loading: I,
              onPress: async () => {
                if (!l) return;
                M(!0);
                const { error: t } = await (0, r(d[15]).submitFoodRatings)({
                  jobId: l,
                  foodScore: T,
                  deliveryScore: O,
                  comment: w.trim() || null,
                  photoUrl: _ || null,
                });
                (M(!1),
                  t
                    ? S({ type: 'error', title: 'Rating failed', message: t.message })
                    : (S({ type: 'success', title: v('eats.rateThanks') }), u?.(), o?.()));
              },
            }),
          ],
        });
      }));
    var s = r(d[1]),
      l = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      f = t(r(d[7])),
      h = t(r(d[8])),
      y = t(r(d[9])),
      p = r(d[10]);
    const b = t =>
      o.default.create({
        label: {
          fontFamily: r(d[11]).fontFamily.semiBold,
          color: t.textPrimary,
          marginBottom: r(d[11]).spacing.xs,
          marginTop: r(d[11]).spacing.sm,
        },
        stars: {
          flexDirection: 'row',
          gap: r(d[11]).spacing.sm,
          marginBottom: r(d[11]).spacing.sm,
        },
        star: { fontSize: 28, color: t.border },
        starOn: { color: t.gold ?? t.primary },
        hint: Object.assign({}, r(d[11]).typography.caption),
      });
    function j({ value: t, onChange: s, styles: o }) {
      return (0, p.jsx)(u.default, {
        style: o.stars,
        children: [1, 2, 3, 4, 5].map(u =>
          (0, p.jsx)(
            l.default,
            {
              onPress: () => s(u),
              hitSlop: 6,
              children: (0, p.jsx)(n.default, {
                style: [o.star, u <= t && o.starOn],
                children: u <= t ? '\u2605' : '\u2606',
              }),
            },
            u
          )
        ),
      });
    }
  },
  1812,
  [1, 5, 326, 26, 161, 19, 1515, 672, 679, 1718, 183, 377, 381, 1381, 1386, 1717]
);
