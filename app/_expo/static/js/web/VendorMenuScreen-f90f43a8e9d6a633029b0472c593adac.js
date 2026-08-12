__d(
  function (g, _r, i, a, m, e, d) {
    var t = _r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const { user: t } = (0, _r(d[19]).useAuth)(),
          { colors: u } = (0, _r(d[20]).useTheme)(),
          { t: O } = (0, _r(d[21]).useLanguage)(),
          { showToast: M } = (0, _r(d[22]).useToast)(),
          k = (0, l.useMemo)(() => T(u), [u]),
          [I, P] = (0, l.useState)(null),
          [_, L] = (0, l.useState)([]),
          [F, R] = (0, l.useState)(!0),
          [V, A] = (0, l.useState)(!1),
          [B, D] = (0, l.useState)(!1),
          [z, E] = (0, l.useState)(!1),
          [H, U] = (0, l.useState)(''),
          [W, q] = (0, l.useState)('all'),
          [G, N] = (0, l.useState)(''),
          [$, Q] = (0, l.useState)(''),
          [J, K] = (0, l.useState)(''),
          [X, Y] = (0, l.useState)(''),
          [Z, ee] = (0, l.useState)(null),
          [te, ae] = (0, l.useState)(null),
          [le, se] = (0, l.useState)(!1),
          oe = (0, l.useCallback)(async () => {
            if (!t?.id) return;
            const l = await (0, _r(d[23]).fetchMyOwnedVendors)(t.id),
              s = l.data?.[0] ?? null;
            if ((P(s), !s)) return void L([]);
            const { data: o } = await (0, _r(d[23]).fetchEatsMenu)(s.id, {
              includeUnavailable: !0,
            });
            L(o ?? []);
          }, [t?.id]);
        (0, l.useEffect)(() => {
          oe().finally(() => R(!1));
        }, [oe]);
        const re = () => {
            (ae(null), N(''), Q(''), K(''), Y(''), ee(null), se(!1));
          },
          ne = t => {
            (ae(t.id),
              N(t.name ?? ''),
              Q(String(t.price_ghs ?? '')),
              K(null != t.stock_qty ? String(t.stock_qty) : ''),
              Y((t.tags ?? []).join(', ')),
              ee(t.photo_url ?? null),
              se(t.sold_out ?? !1),
              E(!0));
          },
          ie = (0, l.useMemo)(
            () =>
              X.split(',')
                .map(t => t.trim().toLowerCase())
                .filter(Boolean),
            [X]
          ),
          de = t => {
            const l = ie.includes(t) ? ie.filter(l => l !== t) : [...ie, t];
            Y(l.join(', '));
          },
          ue = async t => {
            const { error: l } = await (0, _r(d[23]).vendorSetStock)(t.id, {
              soldOut: !t.sold_out,
            });
            l
              ? M({ type: 'error', title: O('eats.saveFailed'), message: l.message })
              : ((0, _r(d[24]).triggerHaptic)('light'), oe());
          },
          ce = t => {
            o.default.alert(
              O('eats.deleteItem'),
              O('eats.deleteItemConfirm').replace('{name}', t.name),
              [
                { text: O('common.cancel'), style: 'cancel' },
                {
                  text: O('eats.deleteItem'),
                  style: 'destructive',
                  onPress: async () => {
                    const { error: l } = await (0, _r(d[23]).vendorDeleteMenuItem)(t.id);
                    l
                      ? M({ type: 'error', title: O('eats.deleteFailed'), message: l.message })
                      : (M({ type: 'info', title: O('eats.itemDeleted') }), oe());
                  },
                },
              ]
            );
          },
          me = (0, l.useMemo)(() => _.filter(t => t.sold_out).length, [_]),
          ge = (0, l.useMemo)(() => {
            if (!_.length) return 0;
            return _.reduce((t, l) => t + (Number(l.price_ghs) || 0), 0) / _.length;
          }, [_]),
          fe = (0, l.useMemo)(() => {
            const t = H.trim().toLowerCase();
            return _.filter(l => {
              if ('available' === W && l.sold_out) return !1;
              if ('soldOut' === W && !l.sold_out) return !1;
              if (!t) return !0;
              return `${l.name ?? ''} ${(l.tags ?? []).join(' ')}`.toLowerCase().includes(t);
            });
          }, [_, H, W]);
        if (F)
          return (0, w.jsx)(p.default, {
            title: O('eats.menuTitle'),
            subtitle: O('eats.menuSub'),
            scroll: !0,
            children: (0, w.jsx)(s.default, { color: u.primary, style: { marginTop: 40 } }),
          });
        if (!I)
          return (0, w.jsx)(p.default, {
            title: O('eats.menuTitle'),
            subtitle: O('eats.menuSub'),
            scroll: !0,
            children: (0, w.jsx)(h.default, {
              elevated: !0,
              children: (0, w.jsx)(c.default, {
                style: k.empty,
                children: O('eats.createStoreHint'),
              }),
            }),
          });
        return (0, w.jsxs)(p.default, {
          title: O('eats.menuTitle'),
          subtitle: I.name,
          scroll: !0,
          refreshControl: (0, w.jsx)(r.default, {
            refreshing: V,
            onRefresh: async () => {
              (A(!0), await oe(), A(!1));
            },
            tintColor: u.primary,
          }),
          children: [
            (0, w.jsxs)(f.default, {
              style: k.statsRow,
              children: [
                (0, w.jsxs)(f.default, {
                  style: k.stat,
                  children: [
                    (0, w.jsx)(c.default, { style: k.statValue, children: _.length }),
                    (0, w.jsx)(c.default, { style: k.statLabel, children: O('eats.statDishes') }),
                  ],
                }),
                (0, w.jsxs)(f.default, {
                  style: k.stat,
                  children: [
                    (0, w.jsx)(c.default, { style: k.statValue, children: me }),
                    (0, w.jsx)(c.default, { style: k.statLabel, children: O('eats.statSoldOut') }),
                  ],
                }),
                (0, w.jsxs)(f.default, {
                  style: k.stat,
                  children: [
                    (0, w.jsx)(c.default, {
                      style: [k.statValue, k.statValueGold],
                      children: (0, _r(d[25]).formatGhs)(ge),
                    }),
                    (0, w.jsx)(c.default, { style: k.statLabel, children: O('eats.statAvgPrice') }),
                  ],
                }),
              ],
            }),
            (0, w.jsx)(y.default, {
              title: O('eats.addItem'),
              onPress: () => {
                (re(), E(!0));
              },
            }),
            me > 0
              ? (0, w.jsx)(y.default, {
                  title: O('eats.restockAll'),
                  variant: 'secondary',
                  onPress: async () => {
                    const t = _.filter(t => t.sold_out);
                    if (!t.length) return;
                    const l = (
                      await Promise.all(
                        t.map(t => (0, _r(d[23]).vendorSetStock)(t.id, { soldOut: !1 }))
                      )
                    ).find(t => t.error);
                    (M(
                      l
                        ? { type: 'error', title: O('eats.saveFailed'), message: l.error.message }
                        : { type: 'success', title: O('eats.restockedAll', { count: t.length }) }
                    ),
                      oe());
                  },
                })
              : null,
            (0, w.jsx)(f.default, {
              style: k.searchWrap,
              children: (0, w.jsx)(x.default, {
                value: H,
                onChangeText: U,
                placeholder: O('eats.menuSearchPlaceholder'),
              }),
            }),
            (0, w.jsx)(S.default, {
              value: W,
              onChange: q,
              options: [
                { value: 'all', label: O('eats.filterAllItems'), count: _.length },
                { value: 'available', label: O('eats.filterAvailable'), count: _.length - me },
                { value: 'soldOut', label: O('eats.filterSoldOut'), count: me },
              ],
            }),
            (0, w.jsx)(f.default, {
              style: { marginTop: _r(d[18]).spacing.md },
              children:
                0 === fe.length
                  ? (0, w.jsxs)(f.default, {
                      style: k.emptyState,
                      children: [
                        (0, w.jsx)(_r(d[26]).Ionicons, {
                          name: 'restaurant-outline',
                          size: 34,
                          color: u.textMuted,
                        }),
                        (0, w.jsx)(c.default, {
                          style: k.emptyTitle,
                          children: _.length ? O('eats.noMenuMatches') : O('eats.noMenuItems'),
                        }),
                        (0, w.jsx)(c.default, {
                          style: k.emptyMsg,
                          children: O('eats.menuEmptyHint'),
                        }),
                      ],
                    })
                  : fe.map(t =>
                      (0, w.jsx)(
                        v.default,
                        {
                          item: t,
                          onEdit: ne,
                          onToggleSoldOut: ue,
                          onDelete: ce,
                          soldOutLabel: O('eats.soldOut'),
                          unlimitedLabel: O('eats.stockUnlimitedShort'),
                          stockLabel: ({ count: t }) => O('eats.stockCount', { count: t }),
                        },
                        t.id
                      )
                    ),
            }),
            (0, w.jsxs)(b.default, {
              visible: z,
              title: O(te ? 'eats.editItem' : 'eats.addItem'),
              subtitle: O('eats.menuEditorSub'),
              onClose: () => E(!1),
              confirmTitle: null,
              showCancelButton: !1,
              children: [
                (0, w.jsxs)(n.default, {
                  style: k.formScroll,
                  keyboardShouldPersistTaps: 'handled',
                  showsVerticalScrollIndicator: !1,
                  children: [
                    (0, w.jsx)(x.default, { label: O('eats.itemName'), value: G, onChangeText: N }),
                    (0, w.jsx)(x.default, {
                      label: O('eats.itemPrice'),
                      value: $,
                      onChangeText: Q,
                      keyboardType: 'decimal-pad',
                    }),
                    (0, w.jsx)(x.default, {
                      label: O('eats.itemStock'),
                      value: J,
                      onChangeText: K,
                      keyboardType: 'number-pad',
                      placeholder: O('eats.stockUnlimited'),
                    }),
                    (0, w.jsx)(x.default, { label: O('eats.itemTags'), value: X, onChangeText: Y }),
                    (0, w.jsx)(f.default, {
                      style: k.tagRow,
                      children: C.map(t => {
                        const l = ie.includes(t);
                        return (0, w.jsx)(
                          c.default,
                          {
                            onPress: () => de(t),
                            style: [k.tagChip, k.tagText, l && k.tagChipOn, l && k.tagTextOn],
                            children: t,
                          },
                          t
                        );
                      }),
                    }),
                    (0, w.jsx)(j.default, {
                      label: O('eats.menuPhoto'),
                      value: Z,
                      onChange: ee,
                      folder: 'menu',
                      disabled: B,
                    }),
                    (0, w.jsxs)(f.default, {
                      style: k.switchRow,
                      children: [
                        (0, w.jsx)(c.default, {
                          style: k.switchLabel,
                          children: O('eats.markSoldOutLabel'),
                        }),
                        (0, w.jsx)(y.default, {
                          title: O(le ? 'eats.soldOut' : 'eats.available'),
                          variant: 'secondary',
                          compact: !0,
                          noMargin: !0,
                          onPress: () => se(t => !t),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, w.jsx)(y.default, {
                  title: O('eats.saveItem'),
                  loading: B,
                  onPress: async () => {
                    if (!I || !G.trim() || !$.trim())
                      return void M({
                        type: 'error',
                        title: O('eats.menuRequired'),
                        message: O('eats.menuRequiredMsg'),
                      });
                    D(!0);
                    const { error: t } = await (0, _r(d[23]).vendorUpsertMenuItem)({
                      itemId: te || null,
                      vendorId: I.id,
                      name: G.trim(),
                      priceGhs: Number($),
                      stockQty: '' === J.trim() ? null : Number(J),
                      tags: ie,
                      photoUrl: Z || null,
                      available: !0,
                      soldOut: le,
                    });
                    (D(!1),
                      t
                        ? M({ type: 'error', title: O('eats.saveFailed'), message: t.message })
                        : ((0, _r(d[24]).triggerHaptic)('medium'),
                          E(!1),
                          re(),
                          M({ type: 'success', title: O('eats.itemSaved') }),
                          oe()));
                  },
                }),
                (0, w.jsx)(y.default, {
                  title: O('common.cancel'),
                  variant: 'ghost',
                  onPress: () => {
                    (E(!1), re());
                  },
                }),
              ],
            }),
          ],
        });
      }));
    var l = _r(d[1]),
      s = t(_r(d[2])),
      o = t(_r(d[3])),
      r = t(_r(d[4])),
      n = t(_r(d[5])),
      u = t(_r(d[6])),
      c = t(_r(d[7])),
      f = t(_r(d[8])),
      p = t(_r(d[9])),
      h = t(_r(d[10])),
      y = t(_r(d[11])),
      x = t(_r(d[12])),
      b = t(_r(d[13])),
      j = t(_r(d[14])),
      S = t(_r(d[15])),
      v = t(_r(d[16])),
      w = _r(d[17]);
    const C = ['spicy', 'vegetarian', 'groundnuts', 'seafood', 'combo'],
      T = t =>
        u.default.create({
          empty: Object.assign({}, _r(d[18]).typography.body, { color: t.textMuted }),
          statsRow: {
            flexDirection: 'row',
            gap: _r(d[18]).spacing.sm,
            marginBottom: _r(d[18]).spacing.lg,
          },
          stat: {
            flex: 1,
            padding: _r(d[18]).spacing.md,
            borderRadius: _r(d[18]).radius.lg,
            borderWidth: 1,
            borderColor: t.borderSoft ?? t.border,
            backgroundColor: t.surfaceElevated ?? t.surface,
          },
          statValue: { fontFamily: _r(d[18]).fontFamily.bold, fontSize: 20, color: t.textPrimary },
          statValueGold: { color: t.gold ?? t.primary },
          statLabel: Object.assign({}, _r(d[18]).typography.caption, {
            fontSize: 12,
            color: t.textSecondary,
            marginTop: 2,
          }),
          searchWrap: { marginBottom: _r(d[18]).spacing.xs },
          emptyState: {
            alignItems: 'center',
            paddingVertical: _r(d[18]).spacing.xxl,
            gap: _r(d[18]).spacing.sm,
          },
          emptyTitle: {
            fontFamily: _r(d[18]).fontFamily.semiBold,
            fontSize: 16,
            color: t.textPrimary,
          },
          emptyMsg: Object.assign({}, _r(d[18]).typography.caption, {
            color: t.textMuted,
            textAlign: 'center',
          }),
          tagRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: _r(d[18]).spacing.xs,
            marginBottom: _r(d[18]).spacing.sm,
          },
          tagChip: {
            paddingHorizontal: _r(d[18]).spacing.md,
            paddingVertical: 6,
            borderRadius: _r(d[18]).radius.pill,
            borderWidth: 1,
            borderColor: t.border,
          },
          tagChipOn: {
            borderColor: t.gold ?? t.primary,
            backgroundColor: t.goldAlpha12 ?? t.surface,
          },
          tagText: {
            fontFamily: _r(d[18]).fontFamily.medium,
            fontSize: 13,
            color: t.textSecondary,
          },
          tagTextOn: { color: t.goldDeep ?? t.gold },
          switchRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: _r(d[18]).spacing.sm,
          },
          switchLabel: {
            fontFamily: _r(d[18]).fontFamily.semiBold,
            fontSize: 15,
            color: t.textPrimary,
          },
          formScroll: { maxHeight: 380, marginBottom: _r(d[18]).spacing.sm },
        });
  },
  1480,
  [
    1, 5, 373, 678, 105, 106, 26, 161, 19, 1510, 684, 672, 679, 1515, 1718, 1727, 1821, 183, 377,
    501, 381, 1381, 1386, 1717, 674, 691, 578,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = r(d[1]),
      l = t(r(d[2])),
      s = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = r(d[7]);
    const h = t =>
      s.default.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[8]).spacing.md,
          padding: r(d[8]).spacing.md,
          borderRadius: r(d[8]).radius.lg,
          borderWidth: 1,
          borderColor: t.borderSoft ?? t.border,
          backgroundColor: t.surfaceElevated ?? t.surface,
          marginBottom: r(d[8]).spacing.sm,
        },
        rowSoldOut: { opacity: 0.65 },
        thumb: {
          width: 56,
          height: 56,
          borderRadius: r(d[8]).radius.md,
          backgroundColor: t.surface,
        },
        thumbEmpty: {
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderSoft ?? t.border,
        },
        name: { fontFamily: r(d[8]).fontFamily.semiBold, fontSize: 16, color: t.textPrimary },
        price: {
          fontFamily: r(d[8]).fontFamily.bold,
          fontSize: 15,
          color: t.gold ?? t.primary,
          marginTop: 2,
        },
        meta: Object.assign({}, r(d[8]).typography.caption, {
          color: t.textMuted,
          fontSize: 12,
          marginTop: 2,
        }),
        badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 },
        badge: {
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: r(d[8]).radius.sm,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
        },
        badgeText: { fontFamily: r(d[8]).fontFamily.medium, fontSize: 11, color: t.textSecondary },
        soldOutBadge: { backgroundColor: t.incomingAlpha18 ?? t.surface },
        soldOutText: { color: t.error ?? t.destructive, fontFamily: r(d[8]).fontFamily.semiBold },
        actions: { alignItems: 'center', gap: r(d[8]).spacing.sm },
        iconBtn: {
          width: 36,
          height: 36,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.surface,
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderSoft ?? t.border,
        },
      });
    e.default = (0, o.memo)(function ({
      item: t,
      onEdit: s,
      onToggleSoldOut: b,
      onDelete: y,
      soldOutLabel: x,
      unlimitedLabel: p,
      stockLabel: j,
    }) {
      const { colors: _ } = (0, r(d[9]).useTheme)(),
        O = (0, o.useMemo)(() => h(_), [_]),
        S = t.tags ?? [];
      return (0, f.jsxs)(c.default, {
        style: [O.row, t.sold_out && O.rowSoldOut],
        children: [
          t.photo_url
            ? (0, f.jsx)(u.default, {
                source: { uri: t.photo_url },
                style: O.thumb,
                recyclingKey: t.id,
              })
            : (0, f.jsx)(c.default, {
                style: [O.thumb, O.thumbEmpty],
                children: (0, f.jsx)(r(d[10]).Ionicons, {
                  name: 'fast-food-outline',
                  size: 22,
                  color: _.textMuted,
                }),
              }),
          (0, f.jsxs)(l.default, {
            style: { flex: 1 },
            onPress: () => s(t),
            children: [
              (0, f.jsx)(n.default, { style: O.name, numberOfLines: 1, children: t.name }),
              (0, f.jsx)(n.default, {
                style: O.price,
                children: (0, r(d[11]).formatGhs)(t.price_ghs),
              }),
              (0, f.jsx)(n.default, {
                style: O.meta,
                children: null != t.stock_qty ? j({ count: t.stock_qty }) : p,
              }),
              S.length || t.sold_out
                ? (0, f.jsxs)(c.default, {
                    style: O.badges,
                    children: [
                      t.sold_out
                        ? (0, f.jsx)(c.default, {
                            style: [O.badge, O.soldOutBadge],
                            children: (0, f.jsx)(n.default, {
                              style: [O.badgeText, O.soldOutText],
                              children: x,
                            }),
                          })
                        : null,
                      S.slice(0, 3).map(t =>
                        (0, f.jsx)(
                          c.default,
                          {
                            style: O.badge,
                            children: (0, f.jsx)(n.default, { style: O.badgeText, children: t }),
                          },
                          t
                        )
                      ),
                    ],
                  })
                : null,
            ],
          }),
          (0, f.jsxs)(c.default, {
            style: O.actions,
            children: [
              (0, f.jsx)(l.default, {
                style: O.iconBtn,
                onPress: () => s(t),
                children: (0, f.jsx)(r(d[10]).Ionicons, {
                  name: 'create-outline',
                  size: 18,
                  color: _.textPrimary,
                }),
              }),
              (0, f.jsx)(l.default, {
                style: O.iconBtn,
                onPress: () => b(t),
                children: (0, f.jsx)(r(d[10]).Ionicons, {
                  name: t.sold_out ? 'refresh-outline' : 'close-circle-outline',
                  size: 18,
                  color: t.sold_out ? _.success : _.warning,
                }),
              }),
              (0, f.jsx)(l.default, {
                style: O.iconBtn,
                onPress: () => y(t),
                children: (0, f.jsx)(r(d[10]).Ionicons, {
                  name: 'trash-outline',
                  size: 18,
                  color: _.error ?? _.destructive,
                }),
              }),
            ],
          }),
        ],
      });
    });
  },
  1821,
  [1, 5, 326, 26, 161, 19, 1672, 183, 377, 381, 578, 691]
);
