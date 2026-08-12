__d(
  function (g, _r, _i, a, _m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function () {
        const e = (0, _r(d[17]).useNavigation)(),
          o = (0, _r(d[17]).useRoute)(),
          b = o.params?.vendor,
          P = o.params?.vendorId ?? b?.id,
          { user: _ } = (0, _r(d[18]).useAuth)(),
          { prefs: L } = (0, _r(d[19]).useUserPreferences)(_?.id),
          { showToast: w } = (0, _r(d[20]).useToast)(),
          { colors: E } = (0, _r(d[21]).useTheme)(),
          { t: N } = (0, _r(d[22]).useLanguage)(),
          O = (0, i.useMemo)(() => v(E), [E]),
          [q, I] = (0, i.useState)(b ?? null),
          [F, B] = (0, i.useState)([]),
          [A, R] = (0, i.useState)(!0),
          [k, z] = (0, i.useState)(() => T(o.params?.initialCart ?? [])),
          [D, M] = (0, i.useState)(null),
          [G, W] = (0, i.useState)([]),
          [V, $] = (0, i.useState)(''),
          [K, U] = (0, i.useState)(1),
          [H, J] = (0, i.useState)(!1),
          Q =
            o.params?.deliverToLabel ?? L.myLocation?.label ?? L.myLocation?.name ?? 'My location',
          [X, Y] = (0, i.useState)(Q),
          [Z, ee] = (0, i.useState)(() => ({
            latitude: o.params?.deliverToLat ?? L.myLocation?.latitude ?? 6.6745,
            longitude: o.params?.deliverToLng ?? L.myLocation?.longitude ?? -1.5712,
          })),
          te = Z.latitude,
          ie = Z.longitude;
        (0, i.useEffect)(() => {
          o.params?.deliverToLabel &&
            (Y(o.params.deliverToLabel),
            ee(e => ({
              latitude: o.params.deliverToLat ?? e.latitude,
              longitude: o.params.deliverToLng ?? e.longitude,
            })));
        }, [o.params?.deliverToLabel, o.params?.deliverToLat, o.params?.deliverToLng]);
        const re = (0, i.useCallback)(
          e => {
            Y(e);
            const t = (0, _r(d[23]).resolveLocationCoords)(e, L.myLocation);
            t && ee({ latitude: t.latitude, longitude: t.longitude });
          },
          [L.myLocation]
        );
        ((0, i.useEffect)(() => {
          Array.isArray(o.params?.initialCart) &&
            o.params.initialCart.length &&
            z(T(o.params.initialCart));
        }, [o.params?.initialCart]),
          (0, i.useEffect)(() => {
            P
              ? (0, _r(d[24]).fetchMenu)(P).then(({ data: e }) => {
                  (B(e ?? []), R(!1));
                })
              : R(!1);
          }, [P, q]),
          (0, i.useEffect)(() => {
            b && I(b);
          }, [b]));
        const ae = e =>
            Array.isArray(e?.modifiers) && e.modifiers.length
              ? e.modifiers
              : _r(d[25]).EATS_DEFAULT_MODIFIERS,
          se = (0, i.useMemo)(() => Object.values(k), [k]),
          oe = se.reduce((e, t) => e + t.unitPrice * t.qty, 0),
          ne =
            'trusted' === q?.hygiene_badge
              ? _r(d[25]).EATS_VENDOR_COMMISSION_TRUSTED_PERCENT
              : _r(d[25]).EATS_VENDOR_COMMISSION_PERCENT,
          le = q ? (0, _r(d[24]).haversineKm)(q.latitude, q.longitude, te, ie) : 5,
          de = (0, _r(d[24]).quoteFood)({
            distanceKm: le,
            itemsSubtotal: oe,
            vendorCommissionPercent: ne,
            tipGhs: 0,
          }),
          ce = e => {
            (M(e), W([]), $(''), U(1));
          },
          ue = (e, i) => {
            z(r => {
              if (i <= 0) {
                return (0, t.default)(r, [e].map(j));
              }
              const s = r[e];
              return s ? Object.assign({}, r, { [e]: Object.assign({}, s, { qty: i }) }) : r;
            });
          },
          me = se.map(e => ({
            id: e.id,
            name: e.name,
            qty: e.qty,
            price_ghs: e.unitPrice,
            modifiers: e.modifiers,
            note: e.note,
          }));
        if (A)
          return (0, x.jsx)(u.default, {
            title: N('eats.menuBrowse'),
            subtitle: '\u2026',
            children: (0, x.jsx)(r.default, { color: E.primary, style: { marginTop: 40 } }),
          });
        if (!P)
          return (0, x.jsx)(u.default, {
            title: N('eats.menuBrowse'),
            subtitle: '',
            children: (0, x.jsx)(m.default, {
              elevated: !0,
              children: (0, x.jsx)(n.default, { style: O.meta, children: N('eats.noVendors') }),
            }),
          });
        return (0, x.jsxs)(u.default, {
          title: q?.name ?? N('eats.menuBrowse'),
          subtitle: q?.address ?? '',
          children: [
            (0, x.jsx)(s.default, {
              onPress: () => e.goBack(),
              style: { marginBottom: _r(d[16]).spacing.sm },
              children: (0, x.jsxs)(n.default, {
                style: { color: E.primary, fontFamily: _r(d[16]).fontFamily.semiBold },
                children: ['\u2190 ', N('eats.homeTitle')],
              }),
            }),
            (0, x.jsxs)(m.default, {
              elevated: !0,
              style: { marginBottom: _r(d[16]).spacing.sm },
              children: [
                (0, x.jsx)(n.default, { style: O.meta, children: N('eats.deliverTo') }),
                (0, x.jsx)(n.default, { style: O.itemName, children: X }),
              ],
            }),
            (0, x.jsx)(m.default, {
              elevated: !0,
              children: F.map(e => {
                const t = (0, _r(d[26]).allergenWarnings)(e.tags, L.eats ?? {});
                return (0, x.jsxs)(
                  s.default,
                  {
                    style: O.itemRow,
                    onPress: () => ce(e),
                    children: [
                      e.photo_url
                        ? (0, x.jsx)(c.default, {
                            source: { uri: e.photo_url },
                            style: O.thumb,
                            recyclingKey: e.id,
                          })
                        : (0, x.jsx)(l.default, { style: O.thumb }),
                      (0, x.jsxs)(l.default, {
                        style: { flex: 1 },
                        children: [
                          (0, x.jsx)(n.default, { style: O.itemName, children: e.name }),
                          e.description
                            ? (0, x.jsx)(n.default, {
                                style: O.meta,
                                numberOfLines: 2,
                                children: e.description,
                              })
                            : null,
                          (0, x.jsx)(n.default, {
                            style: O.meta,
                            children: (0, _r(d[27]).formatGhs)(e.price_ghs),
                          }),
                          t.length
                            ? (0, x.jsxs)(n.default, {
                                style: O.warn,
                                children: [N('eats.dietaryWarn'), ': ', t.join(', ')],
                              })
                            : null,
                        ],
                      }),
                      (0, x.jsx)(_r(d[28]).Ionicons, {
                        name: 'add-circle',
                        size: 26,
                        color: E.primary,
                      }),
                    ],
                  },
                  e.id
                );
              }),
            }),
            se.length > 0
              ? (0, x.jsxs)(l.default, {
                  style: O.footer,
                  children: [
                    (0, x.jsx)(m.default, {
                      elevated: !0,
                      children: se.map(e =>
                        (0, x.jsxs)(
                          l.default,
                          {
                            style: O.cartLine,
                            children: [
                              (0, x.jsxs)(l.default, {
                                style: { flex: 1 },
                                children: [
                                  (0, x.jsxs)(n.default, {
                                    style: O.itemName,
                                    children: [e.qty, '\xd7 ', e.name],
                                  }),
                                  (0, x.jsx)(n.default, {
                                    style: O.meta,
                                    children: (0, _r(d[27]).formatGhs)(e.unitPrice * e.qty),
                                  }),
                                ],
                              }),
                              (0, x.jsxs)(l.default, {
                                style: O.cartActions,
                                children: [
                                  (0, x.jsx)(s.default, {
                                    onPress: () => ue(e.key, e.qty - 1),
                                    hitSlop: 8,
                                    children: (0, x.jsx)(_r(d[28]).Ionicons, {
                                      name: 'remove-circle-outline',
                                      size: 22,
                                      color: E.primary,
                                    }),
                                  }),
                                  (0, x.jsx)(s.default, {
                                    onPress: () => ue(e.key, e.qty + 1),
                                    hitSlop: 8,
                                    children: (0, x.jsx)(_r(d[28]).Ionicons, {
                                      name: 'add-circle-outline',
                                      size: 22,
                                      color: E.primary,
                                    }),
                                  }),
                                  (0, x.jsx)(s.default, {
                                    onPress: () => ue(e.key, 0),
                                    hitSlop: 8,
                                    children: (0, x.jsx)(_r(d[28]).Ionicons, {
                                      name: 'trash-outline',
                                      size: 20,
                                      color: E.destructive ?? E.error,
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          e.key
                        )
                      ),
                    }),
                    (0, x.jsxs)(n.default, {
                      style: O.total,
                      children: [
                        se.reduce((e, t) => e + t.qty, 0),
                        ' items \xb7 ',
                        (0, _r(d[27]).formatGhs)(de.total),
                      ],
                    }),
                    (0, x.jsxs)(n.default, {
                      style: O.meta,
                      children: [
                        N('eats.foodSubtotal'),
                        ' ',
                        (0, _r(d[27]).formatGhs)(de.itemsSubtotal),
                        ' + ',
                        N('eats.deliveryFee'),
                        ' ',
                        (0, _r(d[27]).formatGhs)(de.deliveryFee),
                      ],
                    }),
                    (0, x.jsx)(f.default, { title: N('eats.checkout'), onPress: () => J(!0) }),
                  ],
                })
              : null,
            (0, x.jsx)(p.default, {
              visible: Boolean(D),
              title: D?.name ?? '',
              subtitle: D ? (0, _r(d[27]).formatGhs)(D.price_ghs) : '',
              onClose: () => M(null),
              confirmTitle: null,
              showCancelButton: !1,
              children: D
                ? (0, x.jsxs)(l.default, {
                    children: [
                      (0, x.jsx)(n.default, {
                        style: [O.meta, { marginBottom: _r(d[16]).spacing.sm }],
                        children: N('eats.customize'),
                      }),
                      (0, x.jsx)(l.default, {
                        style: { flexDirection: 'row', flexWrap: 'wrap' },
                        children: ae(D).map(e => {
                          const t = G.includes(e.id);
                          return (0, x.jsx)(
                            s.default,
                            {
                              style: [O.modChip, t && O.modChipOn],
                              onPress: () => {
                                return (
                                  (t = e.id),
                                  void W(e => (e.includes(t) ? e.filter(e => e !== t) : [...e, t]))
                                );
                                var t;
                              },
                              children: (0, x.jsxs)(n.default, {
                                style: [O.modText, t && O.modTextOn],
                                children: [
                                  e.label,
                                  Number(e.price_ghs) > 0
                                    ? ` (+${(0, _r(d[27]).formatGhs)(e.price_ghs)})`
                                    : '',
                                ],
                              }),
                            },
                            e.id
                          );
                        }),
                      }),
                      (0, x.jsx)(y.default, {
                        label: N('eats.specialInstructions'),
                        value: V,
                        onChangeText: $,
                        placeholder: 'e.g. no onions',
                      }),
                      (0, x.jsxs)(l.default, {
                        style: O.qtyRow,
                        children: [
                          (0, x.jsx)(s.default, {
                            onPress: () => U(e => Math.max(1, e - 1)),
                            hitSlop: 8,
                            children: (0, x.jsx)(_r(d[28]).Ionicons, {
                              name: 'remove-circle-outline',
                              size: 28,
                              color: E.primary,
                            }),
                          }),
                          (0, x.jsx)(n.default, { style: O.qtyText, children: K }),
                          (0, x.jsx)(s.default, {
                            onPress: () => U(e => e + 1),
                            hitSlop: 8,
                            children: (0, x.jsx)(_r(d[28]).Ionicons, {
                              name: 'add-circle-outline',
                              size: 28,
                              color: E.primary,
                            }),
                          }),
                        ],
                      }),
                      (0, x.jsx)(f.default, {
                        title: `${N('eats.addToCart')} \xb7 ${(0, _r(d[27]).formatGhs)(
                          C(
                            D,
                            ae(D).filter(e => G.includes(e.id))
                          ) * K
                        )}`,
                        onPress: () => {
                          if (!D) return;
                          const e = ae(D).filter(e => G.includes(e.id)),
                            t = S(D.id, G),
                            i = C(D, e);
                          (z(r => {
                            const s = r[t];
                            return Object.assign({}, r, {
                              [t]: {
                                key: t,
                                id: D.id,
                                name: D.name,
                                qty: (s?.qty ?? 0) + K,
                                unitPrice: i,
                                price_ghs: i,
                                modifiers: e,
                                note: V.trim() || null,
                                tags: D.tags ?? [],
                              },
                            });
                          }),
                            M(null),
                            w({ type: 'success', title: N('eats.addedToCart'), message: D.name }));
                        },
                        style: { marginTop: _r(d[16]).spacing.md },
                      }),
                    ],
                  })
                : null,
            }),
            (0, x.jsx)(h.default, {
              visible: H,
              onClose: () => J(!1),
              onOrdered: () => {
                (z({}), J(!1));
              },
              vendor: q,
              orderItems: me,
              distanceKm: le,
              dropoff: X,
              onDropoffChange: re,
              dropLat: Number(te),
              dropLng: Number(ie),
              commissionPercent: ne,
            }),
          ],
        });
      }));
    var t = e(_r(d[1])),
      i = _r(d[2]),
      r = e(_r(d[3])),
      s = e(_r(d[4])),
      o = e(_r(d[5])),
      n = e(_r(d[6])),
      l = e(_r(d[7])),
      c = e(_r(d[8])),
      u = e(_r(d[9])),
      m = e(_r(d[10])),
      f = e(_r(d[11])),
      y = e(_r(d[12])),
      p = e(_r(d[13])),
      h = e(_r(d[14])),
      x = _r(d[15]);
    function j(e) {
      var t = b(e, 'string');
      return 'symbol' == typeof t ? t : t + '';
    }
    function b(e, t) {
      if ('object' != typeof e || !e) return e;
      var i = e[Symbol.toPrimitive];
      if (void 0 !== i) {
        var r = i.call(e, t || 'default');
        if ('object' != typeof r) return r;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return ('string' === t ? String : Number)(e);
    }
    const v = e =>
      o.default.create({
        itemRow: {
          flexDirection: 'row',
          gap: _r(d[16]).spacing.sm,
          paddingVertical: _r(d[16]).spacing.sm,
          borderBottomWidth: o.default.hairlineWidth,
          borderBottomColor: e.border,
        },
        thumb: {
          width: 56,
          height: 56,
          borderRadius: _r(d[16]).radius.sm,
          backgroundColor: e.surfaceElevated,
        },
        itemName: { fontFamily: _r(d[16]).fontFamily.semiBold, color: e.textPrimary },
        meta: Object.assign({}, _r(d[16]).typography.caption),
        warn: {
          fontFamily: _r(d[16]).fontFamily.medium,
          fontSize: 11,
          color: e.warning ?? e.destructive,
          marginTop: 2,
        },
        footer: { marginTop: _r(d[16]).spacing.md, gap: _r(d[16]).spacing.sm },
        total: { fontFamily: _r(d[16]).fontFamily.bold, fontSize: 22, color: e.textPrimary },
        modChip: {
          paddingHorizontal: _r(d[16]).spacing.sm,
          paddingVertical: 6,
          borderRadius: _r(d[16]).radius.sm,
          borderWidth: 1,
          borderColor: e.border,
          marginRight: _r(d[16]).spacing.xs,
          marginBottom: _r(d[16]).spacing.xs,
        },
        modChipOn: {
          borderColor: e.primary,
          backgroundColor: e.primaryAlpha12 ?? e.surfaceElevated,
        },
        modText: {
          fontFamily: _r(d[16]).fontFamily.semiBold,
          fontSize: 12,
          color: e.textSecondary,
        },
        modTextOn: { color: e.primary },
        qtyRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[16]).spacing.md,
          marginTop: _r(d[16]).spacing.md,
        },
        qtyText: {
          fontFamily: _r(d[16]).fontFamily.bold,
          minWidth: 24,
          textAlign: 'center',
          color: e.textPrimary,
        },
        cartLine: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: _r(d[16]).spacing.sm,
          paddingVertical: _r(d[16]).spacing.xs,
        },
        cartActions: { flexDirection: 'row', alignItems: 'center', gap: _r(d[16]).spacing.sm },
      });
    function T(e = []) {
      const t = {};
      return (
        e.forEach((e, i) => {
          const r = Array.isArray(e.modifiers) ? e.modifiers : [],
            s = r.map(e => e.id).filter(Boolean),
            o = S(e.id ?? `seed-${i}`, s),
            n = Number(e.price_ghs ?? e.unitPrice ?? 0);
          t[o] = {
            key: o,
            id: e.id,
            name: e.name,
            qty: Number(e.qty ?? 1) || 1,
            unitPrice: n,
            price_ghs: n,
            modifiers: r,
            note: e.note ?? null,
            tags: e.tags ?? [],
          };
        }),
        t
      );
    }
    function S(e, t = []) {
      return `${e}:${[...t].sort().join(',')}`;
    }
    function C(e, t) {
      return (
        (Number(e.price_ghs) || 0) + (t ?? []).reduce((e, t) => e + Number(t.price_ghs || 0), 0)
      );
    }
  },
  1474,
  [
    1, 4, 5, 373, 326, 26, 161, 19, 1672, 1710, 684, 672, 679, 1515, 1811, 183, 377, 382, 501, 1614,
    1386, 381, 1381, 1507, 1492, 508, 1717, 691, 578,
  ]
);
__d(
  function (g, r, _i, a, _m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        onClose: l,
        onOrdered: v,
        vendor: b,
        orderItems: x = [],
        distanceKm: j = 5,
        dropoff: M,
        onDropoffChange: T,
        dropLat: O,
        dropLng: E,
        commissionPercent: S,
      }) {
        const C = (0, r(d[12]).useNavigation)(),
          { user: P } = (0, r(d[13]).useAuth)(),
          { colors: L } = (0, r(d[14]).useTheme)(),
          { t: w } = (0, r(d[15]).useLanguage)(),
          { showToast: _ } = (0, r(d[16]).useToast)(),
          A = (0, s.useMemo)(() => h(L), [L]),
          [N, D] = (0, s.useState)('10'),
          [F, G] = (0, s.useState)(''),
          [H, k] = (0, s.useState)(''),
          [q, I] = (0, s.useState)(M || ''),
          [R, W] = (0, s.useState)(!1),
          [Y, B] = (0, s.useState)(!1),
          [$, K] = (0, s.useState)(null);
        (0, s.useEffect)(() => {
          t && I(M || '');
        }, [t, M]);
        const V = x.reduce((t, s) => t + Number(s.price_ghs || 0) * Number(s.qty || 1), 0),
          z =
            'custom' === N
              ? Math.max(0, Number(F) || 0)
              : Math.round(V * (Number(N) / 100) * 100) / 100,
          U = (0, r(d[17]).quoteFood)({
            distanceKm: j,
            itemsSubtotal: V,
            vendorCommissionPercent: S,
            tipGhs: z,
          }),
          J = t => {
            (v?.(),
              l?.(),
              (0, r(d[18]).navigateToRootScreen)(C, r(d[19]).ROUTES.DELIVERY_TRACKING, {
                jobId: t,
              }));
          },
          Q = async t => {
            if (!P?.id || !b)
              return (
                _({ type: 'info', title: 'Sign in required', message: 'Sign in to order food.' }),
                null
              );
            if (!x.length)
              return (
                _({ type: 'error', title: 'Empty cart', message: 'Add at least one item.' }),
                null
              );
            const s = (q || M || '').trim();
            if (!s)
              return (
                _({
                  type: 'error',
                  title: w('eats.dropoffLabel'),
                  message: w('eats.dropoffRequired'),
                }),
                null
              );
            const l = (0, r(d[20]).resolveLocationCoords)(s),
              o = l?.latitude ?? O,
              i = l?.longitude ?? E;
            W(!0);
            const { data: n, error: u } = await (0, r(d[17]).requestFoodOrder)({
              vendorId: b.id,
              pickup: b.address || b.name,
              dropoff: l?.label ?? s,
              pickupLat: b.latitude,
              pickupLng: b.longitude,
              dropoffLat: o,
              dropoffLng: i,
              orderItems: x,
              notes: H.trim() || null,
              paymentMethod: t,
              distanceKm: j,
              fareBreakdown: U,
            });
            return (
              W(!1),
              u ? (_({ type: 'error', title: 'Order failed', message: u.message }), null) : n
            );
          },
          X = async t => {
            if (t === r(d[21]).PAYMENT_METHODS.WALLET) {
              const { data: t } = await (0, r(d[22]).fetchWallet)();
              if (Number(t?.balance_ghs ?? 0) < U.total)
                return void _({
                  type: 'info',
                  title: 'Insufficient wallet',
                  message: 'Top up or pay with MoMo / COD.',
                });
            }
            const s = await Q(t);
            if (s) {
              if (t === r(d[21]).PAYMENT_METHODS.WALLET) {
                const t = await (0, r(d[17]).payDeliveryWithWallet)(s.id);
                return t.error
                  ? (_({ type: 'error', title: 'Payment failed', message: t.error.message }),
                    void J(s.id))
                  : (_({ type: 'success', title: 'Order placed', message: b.name }), void J(s.id));
              }
              if (t === r(d[21]).PAYMENT_METHODS.MOMO) return (K(s.id), void B(!0));
              (_({ type: 'success', title: 'Order placed', message: b.name }), J(s.id));
            }
          };
        return (0, p.jsxs)(p.Fragment, {
          children: [
            (0, p.jsxs)(n.default, {
              visible: t && !Y,
              title: w('eats.checkout'),
              subtitle: b?.name,
              onClose: l,
              confirmTitle: null,
              showCancelButton: !1,
              children: [
                x.map((t, s) =>
                  (0, p.jsxs)(
                    o.default,
                    {
                      style: A.line,
                      children: [
                        t.qty,
                        '\xd7 ',
                        t.name,
                        (t.modifiers ?? []).length
                          ? ` (${t.modifiers.map(t => t.label).join(', ')})`
                          : '',
                        t.note ? ` \u2014 ${t.note}` : '',
                        ' \xb7 ',
                        (0, r(d[23]).formatGhs)(t.price_ghs * t.qty),
                      ],
                    },
                    `${t.id}-${s}`
                  )
                ),
                (0, p.jsxs)(i.default, {
                  style: { marginTop: r(d[11]).spacing.md },
                  children: [
                    (0, p.jsxs)(i.default, {
                      style: A.row,
                      children: [
                        (0, p.jsx)(o.default, { style: A.label, children: w('eats.foodSubtotal') }),
                        (0, p.jsx)(o.default, {
                          style: A.value,
                          children: (0, r(d[23]).formatGhs)(U.itemsSubtotal),
                        }),
                      ],
                    }),
                    (0, p.jsxs)(i.default, {
                      style: A.row,
                      children: [
                        (0, p.jsx)(o.default, { style: A.label, children: w('eats.deliveryFee') }),
                        (0, p.jsx)(o.default, {
                          style: A.value,
                          children: (0, r(d[23]).formatGhs)(U.deliveryFee),
                        }),
                      ],
                    }),
                    (0, p.jsxs)(i.default, {
                      style: A.row,
                      children: [
                        (0, p.jsx)(o.default, { style: A.label, children: w('eats.serviceFee') }),
                        (0, p.jsx)(o.default, {
                          style: A.value,
                          children: (0, r(d[23]).formatGhs)(U.serviceFee),
                        }),
                      ],
                    }),
                    (0, p.jsxs)(i.default, {
                      style: A.row,
                      children: [
                        (0, p.jsx)(o.default, { style: A.label, children: w('eats.tip') }),
                        (0, p.jsx)(o.default, {
                          style: A.value,
                          children: (0, r(d[23]).formatGhs)(U.tipGhs),
                        }),
                      ],
                    }),
                    (0, p.jsx)(o.default, {
                      style: A.total,
                      children: (0, r(d[23]).formatGhs)(U.total),
                    }),
                  ],
                }),
                (0, p.jsx)(c.default, {
                  label: w('eats.dropoffLabel'),
                  value: q,
                  onChangeText: t => {
                    (I(t), T?.(t));
                  },
                  placeholder: w('eats.useMyLocation'),
                }),
                (0, p.jsx)(o.default, {
                  style: [A.label, { marginBottom: r(d[11]).spacing.xs }],
                  children: w('eats.tip'),
                }),
                (0, p.jsx)(m.default, { options: y, value: N, onChange: D }),
                'custom' === N
                  ? (0, p.jsx)(c.default, {
                      label: w('eats.customTip'),
                      value: F,
                      onChangeText: G,
                      keyboardType: 'decimal-pad',
                      placeholder: 'GHS',
                    })
                  : null,
                (0, p.jsx)(c.default, {
                  label: w('eats.orderNote'),
                  value: H,
                  onChangeText: k,
                  placeholder: 'Gate code, meet at door\u2026',
                }),
                (0, p.jsxs)(i.default, {
                  style: A.actions,
                  children: [
                    (0, p.jsx)(u.default, {
                      title: w('eats.payWallet'),
                      loading: R,
                      onPress: () => X(r(d[21]).PAYMENT_METHODS.WALLET),
                    }),
                    (0, p.jsx)(u.default, {
                      title: w('eats.payMomo'),
                      variant: 'secondary',
                      loading: R,
                      onPress: () => X(r(d[21]).PAYMENT_METHODS.MOMO),
                    }),
                    (0, p.jsx)(u.default, {
                      title: w('eats.payCod'),
                      variant: 'ghost',
                      loading: R,
                      onPress: () => X(r(d[21]).PAYMENT_METHODS.COD),
                    }),
                  ],
                }),
              ],
            }),
            (0, p.jsx)(f.default, {
              visible: Y,
              amount: U.total,
              merchantCode: r(d[21]).PLATFORM_MOMO_MERCHANT_CODE,
              reference: $ ? `EATS-${$.slice(0, 8)}` : void 0,
              onPaid: async ({ reference: t }) => {
                $ &&
                  (await (0, r(d[17]).markDeliveryPaidMomo)($, t),
                  B(!1),
                  _({ type: 'success', title: 'Order placed', message: 'MoMo payment recorded.' }),
                  J($));
              },
              onClose: () => {
                (B(!1),
                  $ &&
                    (_({
                      type: 'info',
                      title: w('eats.paymentPending'),
                      message: w('eats.paymentPendingMsg'),
                    }),
                    J($)));
              },
            }),
          ],
        });
      }));
    var s = r(d[1]),
      l = t(r(d[2])),
      o = t(r(d[3])),
      i = t(r(d[4])),
      n = t(r(d[5])),
      u = t(r(d[6])),
      c = t(r(d[7])),
      m = t(r(d[8])),
      f = t(r(d[9])),
      p = r(d[10]);
    const y = [
        { value: '0', label: '0%' },
        { value: '10', label: '10%' },
        { value: '15', label: '15%' },
        { value: 'custom', label: 'Custom' },
      ],
      h = t =>
        l.default.create({
          row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: r(d[11]).spacing.xs,
          },
          label: Object.assign({}, r(d[11]).typography.caption),
          value: { fontFamily: r(d[11]).fontFamily.semiBold, color: t.textPrimary },
          total: {
            fontFamily: r(d[11]).fontFamily.bold,
            fontSize: 24,
            color: t.textPrimary,
            marginVertical: r(d[11]).spacing.sm,
          },
          line: Object.assign({}, r(d[11]).typography.caption, { marginBottom: 4 }),
          actions: { gap: r(d[11]).spacing.sm, marginTop: r(d[11]).spacing.md },
        });
  },
  1811,
  [
    1, 5, 26, 161, 19, 1515, 672, 679, 1535, 1525, 183, 377, 382, 501, 381, 1381, 1386, 1492, 1488,
    682, 1507, 508, 1491, 691,
  ]
);
