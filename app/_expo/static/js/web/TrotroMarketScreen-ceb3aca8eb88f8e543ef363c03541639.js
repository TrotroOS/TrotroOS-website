__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[22]).useNavigation)(),
          { user: c } = (0, r(d[23]).useAuth)(),
          { colors: u } = (0, r(d[24]).useTheme)(),
          { t: T } = (0, r(d[25]).useLanguage)(),
          { isOffline: R } = (0, r(d[26]).useNetworkStatus)(),
          { showToast: F } = (0, r(d[27]).useToast)(),
          { compact: B } = (0, r(d[28]).useCompactLayout)(),
          I = (0, l.useMemo)(() => P(u, B), [u, B]),
          [A, O] = (0, l.useState)('browse'),
          [L, H] = (0, l.useState)([]),
          [E, _] = (0, l.useState)([]),
          [z, W] = (0, l.useState)([]),
          [N, D] = (0, l.useState)(''),
          [V, G] = (0, l.useState)(''),
          [U, K] = (0, l.useState)('newest'),
          [q, J] = (0, l.useState)(!0),
          [Q, X] = (0, l.useState)(!1),
          [Y, Z] = (0, l.useState)(!1),
          [$, ee] = (0, l.useState)(!1),
          [te, ae] = (0, l.useState)(null),
          [ie, le] = (0, l.useState)(0),
          [re, se] = (0, l.useState)([]),
          [oe, ne] = (0, l.useState)(!1),
          ce = (0, l.useMemo)(() => new Set(re.map(t => t.id)), [re]),
          de = (0, l.useMemo)(() => re.reduce((t, l) => t + Number(l.price ?? 0), 0), [re]),
          me = (0, l.useCallback)(async () => {
            if (!c?.id) return void se([]);
            const t = await (0, r(d[29]).getMarketCart)(c.id);
            se(t);
          }, [c?.id]),
          ue = (0, l.useMemo)(
            () => ({ search: N.trim() || void 0, category: V || void 0, sort: U, limit: 40 }),
            [N, V, U]
          ),
          ge = (0, l.useCallback)(async () => {
            J(!0);
            const t = await (0, r(d[30]).getMarketListings)(ue);
            (t.error ||
              (H((t.data ?? []).map(t => Object.assign({}, t, { isOwn: t.sellerId === c?.id }))),
              X(Boolean(t.localOnly))),
              J(!1));
          }, [ue, c?.id]),
          pe = (0, l.useCallback)(async () => {
            if (!c?.id) return;
            J(!0);
            const [t, l, s] = await Promise.all([
              (0, r(d[30]).getMyMarketListings)(c.id),
              (0, r(d[30]).getUserPurchases)(c.id),
              (0, r(d[31]).fetchWallet)(),
            ]);
            (t.error || _((t.data ?? []).map(t => Object.assign({}, t, { isOwn: !0 }))),
              l.error || W(l.data ?? []),
              s.error || le(Number(s.data?.balance_ghs ?? 0)),
              X(s => s || Boolean(t.localOnly || l.localOnly)),
              J(!1));
          }, [c?.id]);
        ((0, l.useEffect)(() => {
          'browse' === A ? ge() : pe();
        }, [A, ge, pe]),
          (0, l.useEffect)(() => {
            'browse' === A && ge();
          }, [V, U, A, ge]),
          (0, l.useEffect)(() => {
            (0, r(d[31]).fetchWallet)().then(t => {
              t.error || le(Number(t.data?.balance_ghs ?? 0));
            });
          }, [c?.id]),
          (0, l.useEffect)(() => {
            me();
          }, [me]),
          (0, l.useEffect)(() => {
            const t = (0, r(d[30]).subscribeToMarketListings)(() => {
                'browse' === A ? ge() : pe();
              }),
              l = c?.id ? (0, r(d[30]).subscribeToMyMarketPurchases)(c.id, () => pe()) : () => {};
            return () => {
              (t(), l());
            };
          }, [A, ge, pe, c?.id]));
        const he = async t => {
            if (!c?.id)
              return void F({
                type: 'error',
                title: T('market.signInTitle'),
                message: T('market.signInMessage'),
              });
            if (t.sellerId === c.id || t.isOwn) return;
            const l = await (0, r(d[29]).addToMarketCart)(c.id, t);
            if (l.error) {
              const t = (0, r(d[32]).errorMessage)(l.error);
              return void F({
                type: 'info',
                title: t.includes('already_in_cart')
                  ? T('market.alreadyInCart')
                  : T('market.buyFailedTitle'),
                message: t.includes('already_in_cart') ? T('market.alreadyInCart') : t,
              });
            }
            (se(l.data ?? []),
              F({ type: 'success', title: T('market.addedToCart'), message: t.title }));
          },
          fe = async t => {
            Z(!0);
            const l = await (0, r(d[30]).cancelMarketListing)(t.id);
            (Z(!1),
              l.error
                ? F({
                    type: 'error',
                    title: T('market.cancelFailed'),
                    message: (0, r(d[32]).errorMessage)(l.error),
                  })
                : (F({
                    type: 'success',
                    title: T('market.cancelledTitle'),
                    message: T('market.cancelledMessage'),
                  }),
                  pe(),
                  ge()));
          },
          ye = (0, l.useCallback)(
            ({ item: t }) =>
              (0, w.jsx)(C.default, {
                listing: t,
                t: T,
                onPress: ae,
                onBuy: ae,
                onAddToCart: he,
                inCart: ce.has(t.id),
                buyLabel: T('market.buyNow'),
                addToCartLabel: T('market.addToCart'),
                loading: Y,
              }),
            [T, Y, he, ce]
          );
        return (0, w.jsxs)(y.default, {
          title: T('market.title'),
          subtitle: T('market.subtitle'),
          testID: 'passenger-market',
          scroll: !1,
          headerRight: (0, w.jsx)(p.default, {
            onPress: () => ee(!0),
            hitSlop: 8,
            style: I.headerBtn,
            children: (0, w.jsx)(r(d[19]).Ionicons, {
              name: 'add-circle-outline',
              size: 26,
              color: u.accent,
            }),
          }),
          children: [
            Q ? (0, w.jsx)(j.default, { fromFallback: !0 }) : null,
            (0, w.jsx)(x.default, {
              options: [
                { label: T('market.tabBrowse'), value: 'browse' },
                { label: T('market.tabMine'), value: 'mine' },
              ],
              value: A,
              onChange: O,
              compact: B,
              style: {
                marginHorizontal: B ? r(d[33]).spacing.sm : r(d[33]).spacing.md,
                marginBottom: r(d[33]).spacing.md,
              },
            }),
            'browse' === A
              ? (0, w.jsxs)(w.Fragment, {
                  children: [
                    (0, w.jsxs)(s.default, {
                      style: I.searchRow,
                      children: [
                        (0, w.jsx)(r(d[19]).Ionicons, {
                          name: 'search',
                          size: 18,
                          color: u.textMuted,
                        }),
                        (0, w.jsx)(n.default, {
                          style: I.searchInput,
                          value: N,
                          onChangeText: D,
                          placeholder: T('market.searchPlaceholder'),
                          placeholderTextColor: u.textMuted,
                          onSubmitEditing: ge,
                        }),
                      ],
                    }),
                    (0, w.jsxs)(h.default, {
                      horizontal: !0,
                      showsHorizontalScrollIndicator: !1,
                      style: I.categoryScroll,
                      children: [
                        (0, w.jsx)(p.default, {
                          style: [I.catChip, !V && I.catChipActive],
                          onPress: () => G(''),
                          children: (0, w.jsx)(o.default, {
                            style: [I.catChipText, !V && I.catChipTextActive],
                            children: T('market.allCategories'),
                          }),
                        }),
                        r(d[18]).MARKET_CATEGORIES.map(t =>
                          (0, w.jsx)(
                            p.default,
                            {
                              style: [I.catChip, V === t.id && I.catChipActive],
                              onPress: () => G(t.id),
                              children: (0, w.jsx)(o.default, {
                                style: [I.catChipText, V === t.id && I.catChipTextActive],
                                children: (0, r(d[18]).categoryLabel)(t.id, T),
                              }),
                            },
                            t.id
                          )
                        ),
                      ],
                    }),
                    (0, w.jsx)(s.default, {
                      style: I.sortRow,
                      children: r(d[18]).MARKET_SORT_OPTIONS.map(t =>
                        (0, w.jsx)(
                          p.default,
                          {
                            style: [I.sortChip, U === t.id && I.sortChipActive],
                            onPress: () => K(t.id),
                            children: (0, w.jsx)(o.default, {
                              style: [I.sortText, U === t.id && I.sortTextActive],
                              children: t.label,
                            }),
                          },
                          t.id
                        )
                      ),
                    }),
                  ],
                })
              : null,
            (0, w.jsx)(r(d[34]).FlashList, {
              data: 'browse' === A ? L : [],
              keyExtractor: t => t.id,
              renderItem: ye,
              estimatedItemSize: r(d[35]).MARKET_CARD_ESTIMATED_HEIGHT,
              drawDistance: 400,
              removeClippedSubviews: !0,
              ListHeaderComponent:
                'mine' === A
                  ? (0, w.jsxs)(s.default, {
                      style: I.mineSection,
                      children: [
                        (0, w.jsx)(o.default, {
                          style: I.sectionTitle,
                          children: T('market.myListingsTitle'),
                        }),
                        q && !E.length ? (0, w.jsx)(r(d[36]).SkeletonList, { count: 2 }) : null,
                        q || E.length
                          ? E.map(t =>
                              (0, w.jsx)(
                                C.default,
                                {
                                  listing: t,
                                  t: T,
                                  compact: !0,
                                  onPress: ae,
                                  onCancel: fe,
                                  cancelLabel: T('market.removeListing'),
                                  loading: Y,
                                },
                                t.id
                              )
                            )
                          : (0, w.jsx)(o.default, {
                              style: I.emptyHint,
                              children: T('market.noListingsHint'),
                            }),
                        (0, w.jsx)(o.default, {
                          style: [I.sectionTitle, { marginTop: r(d[33]).spacing.lg }],
                          children: T('market.myPurchasesTitle'),
                        }),
                        z.length
                          ? z.map(t =>
                              (0, w.jsx)(
                                C.default,
                                {
                                  listing: Object.assign({}, t.listing, {
                                    title: t.listing?.title ?? T('market.purchaseItem'),
                                    price: t.purchasePrice,
                                    status: 'completed' === t.status ? 'sold' : 'reserved',
                                    sellerPhone: t.listing?.sellerPhone,
                                  }),
                                  t: T,
                                  compact: !0,
                                  showSeller: !0,
                                  onPress: () => t.listing && ae(t.listing),
                                },
                                t.id
                              )
                            )
                          : (0, w.jsx)(k.default, {
                              icon: 'bag-outline',
                              title: T('market.noPurchasesTitle'),
                              message: T('market.noPurchasesMessage'),
                              actionLabel: T('market.tabBrowse'),
                              onAction: () => O('browse'),
                            }),
                      ],
                    })
                  : null,
              ListEmptyComponent:
                'browse' !== A || q
                  ? q && 'browse' === A
                    ? (0, w.jsx)(r(d[36]).SkeletonList, { count: 4 })
                    : null
                  : (0, w.jsx)(k.default, {
                      icon: 'storefront-outline',
                      title: T('market.noResultsTitle'),
                      message: T('market.noResultsMessage'),
                      actionLabel: T('market.publishListing'),
                      onAction: () => ee(!0),
                    }),
              contentContainerStyle: [
                I.listContent,
                re.length && 'browse' === A ? I.listContentWithCart : null,
              ],
              refreshControl: (0, w.jsx)(f.default, {
                refreshing: q,
                onRefresh: () => ('browse' === A ? ge() : pe()),
                tintColor: u.primary,
              }),
            }),
            re.length && 'browse' === A
              ? (0, w.jsxs)(s.default, {
                  style: I.cartBar,
                  children: [
                    (0, w.jsxs)(s.default, {
                      style: I.cartBarInfo,
                      children: [
                        (0, w.jsx)(o.default, {
                          style: I.cartBarCount,
                          children: T('market.cartItems', { count: re.length }),
                        }),
                        (0, w.jsxs)(o.default, {
                          style: I.cartBarTotal,
                          children: ['GH\u20b5 ', de.toFixed(2)],
                        }),
                      ],
                    }),
                    (0, w.jsx)(b.default, {
                      title: T('market.viewCart'),
                      compact: !0,
                      onPress: () => ne(!0),
                    }),
                  ],
                })
              : null,
            (0, w.jsx)(S, {
              visible: $,
              onClose: () => ee(!1),
              onSubmit: async t => {
                if (!c?.id)
                  return void F({
                    type: 'error',
                    title: T('market.signInTitle'),
                    message: T('market.signInMessage'),
                  });
                Z(!0);
                const l = await (0, r(d[30]).createMarketListing)(
                  Object.assign({}, t, { sellerId: c.id })
                );
                (Z(!1),
                  l.error
                    ? F({
                        type: 'error',
                        title: T('market.createFailed'),
                        message: (0, r(d[32]).errorMessage)(l.error),
                      })
                    : (F({
                        type: 'success',
                        title: T('market.createSuccessTitle'),
                        message: l.localOnly
                          ? T('market.createSuccessLocal')
                          : T('market.createSuccessMessage'),
                      }),
                      ee(!1),
                      O('mine'),
                      pe(),
                      ge()));
              },
              submitting: Y,
              t: T,
              colors: u,
              styles: I,
            }),
            (0, w.jsx)(v, {
              visible: !!te,
              listing: te,
              onClose: () => ae(null),
              onPurchase: async (t, l = 'wallet') => {
                if (!c?.id)
                  return void F({
                    type: 'error',
                    title: T('market.signInTitle'),
                    message: T('market.signInMessage'),
                  });
                if (R && !Q)
                  return void F({
                    type: 'error',
                    title: T('market.offlineTitle'),
                    message: T('market.offlineMessage'),
                  });
                Z(!0);
                const s = await (0, r(d[30]).purchaseMarketListing)(t.id, c.id, l);
                if ((Z(!1), s.error)) {
                  const t = (0, r(d[32]).errorMessage)(s.error);
                  return void F({
                    type: 'error',
                    title: T('market.buyFailedTitle'),
                    message: t.includes('insufficient_balance')
                      ? T('market.insufficientBalance')
                      : T('market.buyFailedMessage'),
                  });
                }
                (F({
                  type: 'success',
                  title: T('market.buySuccessTitle'),
                  message: T(
                    'cash_meetup' === l ? 'market.buySuccessCash' : 'market.buySuccessWallet'
                  ),
                }),
                  ae(null),
                  ge(),
                  pe(),
                  (0, r(d[31]).fetchWallet)().then(t => {
                    t.error || le(Number(t.data?.balance_ghs ?? 0));
                  }),
                  O('mine'));
              },
              onAddToCart: he,
              inCart: !!te && ce.has(te.id),
              walletBalance: ie,
              localOnly: Q,
              submitting: Y,
              userId: c?.id,
              t: T,
              colors: u,
              styles: I,
              navigation: t,
            }),
            (0, w.jsx)(M, {
              visible: oe,
              cart: re,
              onClose: () => ne(!1),
              onRemove: async t => {
                if (!c?.id) return;
                const l = await (0, r(d[29]).removeFromMarketCart)(c.id, t);
                se(l);
              },
              onCheckout: async (t = 'wallet') => {
                if (!c?.id || !re.length) return;
                if (R && !Q && 'wallet' === t)
                  return void F({
                    type: 'error',
                    title: T('market.offlineTitle'),
                    message: T('market.offlineMessage'),
                  });
                Z(!0);
                const l = [];
                let s = 0;
                for (const o of re)
                  (await (0, r(d[30]).purchaseMarketListing)(o.id, c.id, t)).error
                    ? l.push(o)
                    : (s += 1);
                if (l.length) {
                  await (0, r(d[29]).clearMarketCart)(c.id);
                  for (const t of l) await (0, r(d[29]).addToMarketCart)(c.id, t);
                  (se(await (0, r(d[29]).getMarketCart)(c.id)),
                    F({
                      type: s ? 'info' : 'error',
                      title: T('market.checkoutPartialTitle'),
                      message: T('market.checkoutPartialMessage'),
                    }));
                } else
                  (await (0, r(d[29]).clearMarketCart)(c.id),
                    se([]),
                    ne(!1),
                    F({
                      type: 'success',
                      title: T('market.checkoutSuccessTitle'),
                      message: T('market.checkoutSuccessMessage'),
                    }));
                (Z(!1),
                  ge(),
                  pe(),
                  (0, r(d[31]).fetchWallet)().then(t => {
                    t.error || le(Number(t.data?.balance_ghs ?? 0));
                  }),
                  s && O('mine'));
              },
              walletBalance: ie,
              localOnly: Q,
              submitting: Y,
              t: T,
              colors: u,
              styles: I,
              navigation: t,
            }),
          ],
        });
      }));
    var l = r(d[1]),
      s = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      h = t(r(d[8])),
      f = t(r(d[9])),
      y = t(r(d[10])),
      x = t(r(d[11])),
      b = t(r(d[12])),
      k = t(r(d[13])),
      j = t(r(d[14])),
      C = t(r(d[15])),
      T = t(r(d[16])),
      w = r(d[17]);
    function S({ visible: t, onClose: c, onSubmit: f, submitting: y, t: x, colors: k, styles: j }) {
      const [C, T] = (0, l.useState)(''),
        [S, v] = (0, l.useState)(''),
        [M, P] = (0, l.useState)(r(d[18]).MARKET_CATEGORIES[0].id),
        [R, F] = (0, l.useState)('good'),
        [B, I] = (0, l.useState)(''),
        [A, O] = (0, l.useState)('');
      return (0, w.jsx)(u.default, {
        visible: t,
        animationType: 'slide',
        transparent: !0,
        onRequestClose: c,
        children: (0, w.jsx)(s.default, {
          style: j.modalBackdrop,
          children: (0, w.jsxs)(s.default, {
            style: j.modalSheet,
            children: [
              (0, w.jsxs)(s.default, {
                style: j.modalHeader,
                children: [
                  (0, w.jsx)(o.default, { style: j.modalTitle, children: x('market.createTitle') }),
                  (0, w.jsx)(p.default, {
                    onPress: c,
                    hitSlop: 12,
                    children: (0, w.jsx)(r(d[19]).Ionicons, {
                      name: 'close',
                      size: 24,
                      color: k.textSecondary,
                    }),
                  }),
                ],
              }),
              (0, w.jsxs)(h.default, {
                keyboardShouldPersistTaps: 'handled',
                children: [
                  (0, w.jsx)(o.default, { style: j.label, children: x('market.fieldTitle') }),
                  (0, w.jsx)(n.default, {
                    style: j.input,
                    value: C,
                    onChangeText: T,
                    placeholderTextColor: k.textMuted,
                  }),
                  (0, w.jsx)(o.default, { style: j.label, children: x('market.fieldDescription') }),
                  (0, w.jsx)(n.default, {
                    style: [j.input, j.textArea],
                    value: S,
                    onChangeText: v,
                    multiline: !0,
                    placeholderTextColor: k.textMuted,
                  }),
                  (0, w.jsx)(o.default, { style: j.label, children: x('market.fieldCategory') }),
                  (0, w.jsx)(s.default, {
                    style: j.chipRow,
                    children: r(d[18]).MARKET_CATEGORIES.map(t =>
                      (0, w.jsx)(
                        p.default,
                        {
                          style: [j.chip, M === t.id && j.chipActive],
                          onPress: () => P(t.id),
                          children: (0, w.jsx)(o.default, {
                            style: [j.chipText, M === t.id && j.chipTextActive],
                            children: (0, r(d[18]).categoryLabel)(t.id, x),
                          }),
                        },
                        t.id
                      )
                    ),
                  }),
                  (0, w.jsx)(o.default, { style: j.label, children: x('market.fieldCondition') }),
                  (0, w.jsx)(s.default, {
                    style: j.chipRow,
                    children: r(d[18]).MARKET_CONDITIONS.map(t =>
                      (0, w.jsx)(
                        p.default,
                        {
                          style: [j.chip, R === t.id && j.chipActive],
                          onPress: () => F(t.id),
                          children: (0, w.jsx)(o.default, {
                            style: [j.chipText, R === t.id && j.chipTextActive],
                            children: t.label,
                          }),
                        },
                        t.id
                      )
                    ),
                  }),
                  (0, w.jsx)(o.default, { style: j.label, children: x('market.fieldPrice') }),
                  (0, w.jsx)(n.default, {
                    style: j.input,
                    value: B,
                    onChangeText: I,
                    keyboardType: 'decimal-pad',
                    placeholderTextColor: k.textMuted,
                  }),
                  (0, w.jsx)(o.default, { style: j.label, children: x('market.fieldLocation') }),
                  (0, w.jsx)(n.default, {
                    style: j.input,
                    value: A,
                    onChangeText: O,
                    placeholderTextColor: k.textMuted,
                  }),
                  (0, w.jsx)(b.default, {
                    title: x('market.publishListing'),
                    onPress: () => {
                      f({
                        title: C,
                        description: S,
                        category: M,
                        condition: R,
                        price: Number(B),
                        location: A,
                      });
                    },
                    loading: y,
                    disabled: !C || !B,
                  }),
                  (0, w.jsx)(b.default, {
                    title: x('common.cancel'),
                    variant: 'secondary',
                    onPress: () => {
                      (T(''),
                        v(''),
                        P(r(d[18]).MARKET_CATEGORIES[0].id),
                        F('good'),
                        I(''),
                        O(''),
                        c());
                    },
                  }),
                ],
              }),
            ],
          }),
        }),
      });
    }
    function v({
      visible: t,
      listing: l,
      onClose: n,
      onPurchase: c,
      onAddToCart: f,
      inCart: y,
      walletBalance: x,
      localOnly: k,
      submitting: j,
      userId: C,
      t: S,
      colors: v,
      styles: M,
      navigation: P,
    }) {
      if (!l) return null;
      const R = l.sellerId === C,
        F = 'active' === l.status;
      return (0, w.jsx)(u.default, {
        visible: t,
        animationType: 'slide',
        transparent: !0,
        onRequestClose: n,
        children: (0, w.jsx)(s.default, {
          style: M.modalBackdrop,
          children: (0, w.jsxs)(s.default, {
            style: M.modalSheet,
            children: [
              (0, w.jsxs)(s.default, {
                style: M.modalHeader,
                children: [
                  (0, w.jsx)(o.default, { style: M.modalTitle, children: l.title }),
                  (0, w.jsx)(p.default, {
                    onPress: n,
                    hitSlop: 12,
                    children: (0, w.jsx)(r(d[19]).Ionicons, {
                      name: 'close',
                      size: 24,
                      color: v.textSecondary,
                    }),
                  }),
                ],
              }),
              (0, w.jsxs)(h.default, {
                children: [
                  (0, w.jsxs)(o.default, {
                    style: M.detailPrice,
                    children: ['GH\u20b5 ', Number(l.price).toFixed(2)],
                  }),
                  (0, w.jsxs)(o.default, {
                    style: M.detailMeta,
                    children: [
                      (0, r(d[18]).categoryLabel)(l.category, S),
                      ' \xb7 ',
                      l.condition,
                      ' \xb7',
                      ' ',
                      l.location ?? S('market.locationTbd'),
                    ],
                  }),
                  (0, w.jsx)(o.default, { style: M.detailDescription, children: l.description }),
                  (0, w.jsx)(o.default, {
                    style: M.detailSeller,
                    children: S('market.soldBy', { name: l.sellerName }),
                  }),
                  l.sellerPhone
                    ? (0, w.jsx)(T.default, {
                        phone: l.sellerPhone,
                        operatorName: l.sellerName,
                        compact: !0,
                      })
                    : null,
                  F && !R
                    ? (0, w.jsxs)(w.Fragment, {
                        children: [
                          f
                            ? (0, w.jsx)(b.default, {
                                title: S(y ? 'market.addedToCart' : 'market.addToCart'),
                                variant: 'secondary',
                                onPress: () => f(l),
                                disabled: y || j,
                              })
                            : null,
                          k
                            ? (0, w.jsx)(o.default, {
                                style: M.walletHint,
                                children: S('market.offlineCashOnly'),
                              })
                            : (0, w.jsxs)(w.Fragment, {
                                children: [
                                  (0, w.jsx)(o.default, {
                                    style: M.walletHint,
                                    children: S('market.walletBalance', {
                                      amount: Number(x).toFixed(2),
                                    }),
                                  }),
                                  (0, w.jsx)(b.default, {
                                    title: S('market.buyWithWallet'),
                                    onPress: () => c(l, 'wallet'),
                                    loading: j,
                                    disabled: x < l.price,
                                  }),
                                  x < l.price
                                    ? (0, w.jsx)(p.default, {
                                        onPress: () =>
                                          (0, r(d[20]).navigateToRootScreen)(
                                            P,
                                            r(d[21]).ROUTES.PROFILE_WALLET
                                          ),
                                        children: (0, w.jsx)(o.default, {
                                          style: M.topUpLink,
                                          children: S('market.topUpWallet'),
                                        }),
                                      })
                                    : null,
                                ],
                              }),
                          (0, w.jsx)(b.default, {
                            title: S('market.buyCashMeetup'),
                            variant: k ? 'primary' : 'secondary',
                            onPress: () => c(l, 'cash_meetup'),
                            loading: j,
                          }),
                        ],
                      })
                    : null,
                  (0, w.jsx)(b.default, { title: S('common.back'), variant: 'ghost', onPress: n }),
                ],
              }),
            ],
          }),
        }),
      });
    }
    function M({
      visible: t,
      cart: l,
      onClose: n,
      onRemove: c,
      onCheckout: f,
      walletBalance: y,
      localOnly: x,
      submitting: k,
      t: j,
      colors: C,
      styles: T,
      navigation: S,
    }) {
      const v = l.reduce((t, l) => t + Number(l.price ?? 0), 0);
      return (0, w.jsx)(u.default, {
        visible: t,
        animationType: 'slide',
        transparent: !0,
        onRequestClose: n,
        children: (0, w.jsx)(s.default, {
          style: T.modalBackdrop,
          children: (0, w.jsxs)(s.default, {
            style: T.modalSheet,
            children: [
              (0, w.jsxs)(s.default, {
                style: T.modalHeader,
                children: [
                  (0, w.jsx)(o.default, { style: T.modalTitle, children: j('market.cartTitle') }),
                  (0, w.jsx)(p.default, {
                    onPress: n,
                    hitSlop: 12,
                    children: (0, w.jsx)(r(d[19]).Ionicons, {
                      name: 'close',
                      size: 24,
                      color: C.textSecondary,
                    }),
                  }),
                ],
              }),
              (0, w.jsxs)(h.default, {
                children: [
                  l.length
                    ? l.map(t =>
                        (0, w.jsxs)(
                          s.default,
                          {
                            style: T.cartRow,
                            children: [
                              (0, w.jsxs)(s.default, {
                                style: T.cartRowBody,
                                children: [
                                  (0, w.jsx)(o.default, {
                                    style: T.cartRowTitle,
                                    numberOfLines: 2,
                                    children: t.title,
                                  }),
                                  (0, w.jsxs)(o.default, {
                                    style: T.cartRowPrice,
                                    children: ['GH\u20b5 ', Number(t.price).toFixed(2)],
                                  }),
                                ],
                              }),
                              (0, w.jsx)(b.default, {
                                title: j('market.removeFromCart'),
                                variant: 'ghost',
                                compact: !0,
                                onPress: () => c(t.id),
                              }),
                            ],
                          },
                          t.id
                        )
                      )
                    : (0, w.jsx)(o.default, {
                        style: T.emptyHint,
                        children: j('market.cartEmpty'),
                      }),
                  l.length
                    ? (0, w.jsxs)(w.Fragment, {
                        children: [
                          (0, w.jsx)(o.default, {
                            style: T.cartTotal,
                            children: j('market.cartTotal', { amount: v.toFixed(2) }),
                          }),
                          x
                            ? (0, w.jsx)(o.default, {
                                style: T.walletHint,
                                children: j('market.offlineCashOnly'),
                              })
                            : (0, w.jsxs)(w.Fragment, {
                                children: [
                                  (0, w.jsx)(o.default, {
                                    style: T.walletHint,
                                    children: j('market.walletBalance', {
                                      amount: Number(y).toFixed(2),
                                    }),
                                  }),
                                  (0, w.jsx)(b.default, {
                                    title: j('market.buyWithWallet'),
                                    onPress: () => f('wallet'),
                                    loading: k,
                                    disabled: y < v,
                                  }),
                                  y < v
                                    ? (0, w.jsx)(p.default, {
                                        onPress: () =>
                                          (0, r(d[20]).navigateToRootScreen)(
                                            S,
                                            r(d[21]).ROUTES.PROFILE_WALLET
                                          ),
                                        children: (0, w.jsx)(o.default, {
                                          style: T.topUpLink,
                                          children: j('market.topUpWallet'),
                                        }),
                                      })
                                    : null,
                                ],
                              }),
                          (0, w.jsx)(b.default, {
                            title: j('market.buyCashMeetup'),
                            variant: x ? 'primary' : 'secondary',
                            onPress: () => f('cash_meetup'),
                            loading: k,
                          }),
                        ],
                      })
                    : null,
                  (0, w.jsx)(b.default, { title: j('common.back'), variant: 'ghost', onPress: n }),
                ],
              }),
            ],
          }),
        }),
      });
    }
    const P = (t, l = !1) =>
      c.default.create({
        headerBtn: { padding: r(d[33]).spacing.xs },
        searchRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[33]).spacing.sm,
          marginHorizontal: l ? r(d[33]).spacing.sm : r(d[33]).spacing.md,
          marginBottom: r(d[33]).spacing.sm,
          paddingHorizontal: r(d[33]).spacing.md,
          paddingVertical: r(d[33]).spacing.sm,
          backgroundColor: t.surface,
          borderRadius: r(d[33]).radius.md,
          borderWidth: c.default.hairlineWidth,
          borderColor: t.border,
        },
        searchInput: { flex: 1, fontFamily: r(d[33]).fontFamily.regular, color: t.textPrimary },
        categoryScroll: {
          maxHeight: 44,
          marginBottom: r(d[33]).spacing.sm,
          paddingHorizontal: r(d[33]).spacing.md,
        },
        catChip: {
          paddingHorizontal: r(d[33]).spacing.md,
          paddingVertical: r(d[33]).spacing.sm,
          borderRadius: r(d[33]).radius.pill,
          borderWidth: 1,
          borderColor: t.border,
          marginRight: r(d[33]).spacing.sm,
        },
        catChipActive: { backgroundColor: t.primary, borderColor: t.primary },
        catChipText: {
          fontFamily: r(d[33]).fontFamily.medium,
          fontSize: 13,
          color: t.textSecondary,
        },
        catChipTextActive: { color: t.onPrimary },
        sortRow: {
          flexDirection: 'row',
          gap: r(d[33]).spacing.sm,
          paddingHorizontal: r(d[33]).spacing.md,
          marginBottom: r(d[33]).spacing.md,
        },
        sortChip: {
          paddingHorizontal: r(d[33]).spacing.sm,
          paddingVertical: 6,
          borderRadius: r(d[33]).radius.sm,
          backgroundColor: t.surfaceSoft,
        },
        sortChipActive: { backgroundColor: t.accentMuted ?? t.surface },
        sortText: { fontSize: 12, fontFamily: r(d[33]).fontFamily.medium, color: t.textMuted },
        sortTextActive: { color: t.accent },
        listContent: {
          paddingHorizontal: r(d[33]).spacing.md,
          paddingBottom: r(d[33]).spacing.xxxl,
        },
        listContentWithCart: { paddingBottom: r(d[33]).spacing.xxxl + 72 },
        cartBar: {
          position: 'absolute',
          left: r(d[33]).spacing.md,
          right: r(d[33]).spacing.md,
          bottom: r(d[33]).spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: r(d[33]).spacing.md,
          paddingHorizontal: r(d[33]).spacing.md,
          paddingVertical: r(d[33]).spacing.sm,
          borderRadius: r(d[33]).radius.lg,
          backgroundColor: t.surface,
          borderWidth: c.default.hairlineWidth,
          borderColor: t.border,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 4,
        },
        cartBarInfo: { flex: 1 },
        cartBarCount: { fontFamily: r(d[33]).fontFamily.semibold, color: t.textPrimary },
        cartBarTotal: Object.assign({}, r(d[33]).typography.caption, {
          color: t.accent,
          marginTop: 2,
        }),
        cartRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: r(d[33]).spacing.sm,
          paddingVertical: r(d[33]).spacing.sm,
          borderBottomWidth: c.default.hairlineWidth,
          borderBottomColor: t.border,
        },
        cartRowBody: { flex: 1 },
        cartRowTitle: { fontFamily: r(d[33]).fontFamily.semibold, color: t.textPrimary },
        cartRowPrice: { fontFamily: r(d[33]).fontFamily.bold, color: t.accent, marginTop: 2 },
        cartTotal: {
          fontFamily: r(d[33]).fontFamily.bold,
          fontSize: 18,
          color: t.textPrimary,
          marginVertical: r(d[33]).spacing.md,
        },
        mineSection: { paddingBottom: r(d[33]).spacing.lg },
        sectionTitle: {
          fontFamily: r(d[33]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: r(d[33]).spacing.sm,
        },
        emptyHint: Object.assign({}, r(d[33]).typography.caption, {
          color: t.textMuted,
          marginBottom: r(d[33]).spacing.md,
        }),
        modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
        modalSheet: {
          backgroundColor: t.background,
          borderTopLeftRadius: r(d[33]).radius.xl,
          borderTopRightRadius: r(d[33]).radius.xl,
          padding: r(d[33]).spacing.lg,
          maxHeight: '90%',
        },
        modalHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[33]).spacing.md,
        },
        modalTitle: Object.assign({}, r(d[33]).typography.title, {
          color: t.textPrimary,
          flex: 1,
          paddingRight: r(d[33]).spacing.sm,
        }),
        label: {
          fontFamily: r(d[33]).fontFamily.medium,
          color: t.textSecondary,
          marginBottom: r(d[33]).spacing.xs,
          marginTop: r(d[33]).spacing.sm,
        },
        input: {
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: r(d[33]).radius.md,
          paddingHorizontal: r(d[33]).spacing.md,
          paddingVertical: r(d[33]).spacing.sm,
          color: t.textPrimary,
          fontFamily: r(d[33]).fontFamily.regular,
          backgroundColor: t.surface,
        },
        textArea: { minHeight: 80, textAlignVertical: 'top' },
        chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: r(d[33]).spacing.sm },
        chip: {
          paddingHorizontal: r(d[33]).spacing.md,
          paddingVertical: r(d[33]).spacing.sm,
          borderRadius: r(d[33]).radius.pill,
          borderWidth: 1,
          borderColor: t.border,
        },
        chipActive: { borderColor: t.accent, backgroundColor: t.accentMuted ?? t.surface },
        chipText: { fontFamily: r(d[33]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        chipTextActive: { color: t.accent },
        detailPrice: { fontFamily: r(d[33]).fontFamily.bold, fontSize: 28, color: t.accent },
        detailMeta: Object.assign({}, r(d[33]).typography.caption, {
          color: t.textSecondary,
          marginVertical: r(d[33]).spacing.sm,
        }),
        detailDescription: Object.assign({}, r(d[33]).typography.body, {
          color: t.textPrimary,
          marginBottom: r(d[33]).spacing.md,
        }),
        detailSeller: {
          fontFamily: r(d[33]).fontFamily.semibold,
          color: t.textPrimary,
          marginBottom: r(d[33]).spacing.sm,
        },
        walletHint: Object.assign({}, r(d[33]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[33]).spacing.sm,
        }),
        topUpLink: {
          fontFamily: r(d[33]).fontFamily.medium,
          color: t.accent,
          textAlign: 'center',
          marginVertical: r(d[33]).spacing.sm,
        },
      });
  },
  1442,
  [
    1, 5, 19, 161, 255, 26, 948, 326, 106, 105, 1510, 1535, 672, 1534, 1620, 1760, 1520, 183, 1761,
    578, 1488, 682, 382, 501, 381, 1381, 563, 1386, 1671, 1652, 1651, 1491, 557, 377, 1537, 1536,
    1617,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var s = r(d[1]),
      l = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = t(r(d[7])),
      y = t(r(d[8])),
      p = t(r(d[9])),
      x = r(d[10]);
    function b(t, s) {
      return 'sold' === t
        ? s.statusSold
        : 'reserved' === t
          ? s.statusReserved
          : 'active' === t
            ? s.statusActive
            : s.statusMuted;
    }
    e.default = (0, s.memo)(function ({
      listing: t,
      onPress: c,
      onBuy: j,
      onAddToCart: v,
      onCancel: w,
      buyLabel: C = 'Buy',
      addToCartLabel: S = 'Add to cart',
      cancelLabel: P = 'Remove',
      inCart: R = !1,
      showSeller: T = !0,
      compact: k = !1,
      loading: F = !1,
      t: M,
    }) {
      const { colors: z } = (0, r(d[11]).useTheme)(),
        A = (0, s.useMemo)(() => h(z), [z]),
        D = t.images?.[0],
        L = 'sold' === t.status,
        O = t.isOwn;
      return (0, x.jsx)(n.default, {
        onPress: () => c?.(t),
        children: (0, x.jsxs)(u.default, {
          elevated: !0,
          style: [A.card, k && A.cardCompact],
          children: [
            (0, x.jsxs)(l.default, {
              style: A.row,
              children: [
                D
                  ? (0, x.jsx)(p.default, {
                      source: D,
                      style: A.thumb,
                      contentFit: 'cover',
                      recyclingKey: t.id,
                    })
                  : (0, x.jsx)(l.default, {
                      style: [A.thumb, A.thumbPlaceholder],
                      children: (0, x.jsx)(r(d[12]).Ionicons, {
                        name: 'storefront-outline',
                        size: 28,
                        color: z.textMuted,
                      }),
                    }),
                (0, x.jsxs)(l.default, {
                  style: A.body,
                  children: [
                    (0, x.jsxs)(l.default, {
                      style: A.titleRow,
                      children: [
                        (0, x.jsx)(o.default, {
                          style: A.title,
                          numberOfLines: 2,
                          children: t.title,
                        }),
                        (0, x.jsx)(l.default, {
                          style: [A.statusChip, b(t.status, A)],
                          children: (0, x.jsx)(o.default, {
                            style: A.statusText,
                            children:
                              'sold' === t.status
                                ? (M?.('market.statusSold') ?? 'Sold')
                                : 'reserved' === t.status
                                  ? (M?.('market.statusReserved') ?? 'Reserved')
                                  : (M?.('market.statusAvailable') ?? 'Available'),
                          }),
                        }),
                      ],
                    }),
                    (0, x.jsxs)(o.default, {
                      style: A.price,
                      children: ['GH\u20b5 ', Number(t.price).toFixed(2)],
                    }),
                    (0, x.jsxs)(o.default, {
                      style: A.meta,
                      children: [
                        (0, r(d[13]).categoryLabel)(t.category, M),
                        t.location ? ` \xb7 ${t.location}` : '',
                      ],
                    }),
                    T
                      ? (0, x.jsxs)(l.default, {
                          style: A.sellerRow,
                          children: [
                            (0, x.jsx)(o.default, { style: A.seller, children: t.sellerName }),
                            (0, x.jsx)(y.default, { score: t.trustScore, compact: !0 }),
                          ],
                        })
                      : null,
                  ],
                }),
              ],
            }),
            !k && t.description
              ? (0, x.jsx)(o.default, {
                  style: A.description,
                  numberOfLines: 2,
                  children: t.description,
                })
              : null,
            (0, x.jsxs)(l.default, {
              style: A.actions,
              children: [
                c
                  ? (0, x.jsx)(f.default, {
                      title: M?.('market.viewDetails') ?? 'Details',
                      variant: 'ghost',
                      compact: !0,
                      onPress: () => c(t),
                    })
                  : null,
                L || O || !v
                  ? null
                  : (0, x.jsx)(f.default, {
                      title: R ? (M?.('market.addedToCart') ?? 'In cart') : S,
                      variant: 'secondary',
                      compact: !0,
                      onPress: () => v(t),
                      loading: F,
                      disabled: R,
                    }),
                L || O || !j
                  ? null
                  : (0, x.jsx)(f.default, {
                      title: C,
                      compact: !0,
                      onPress: () => j(t),
                      loading: F,
                    }),
                O && 'active' === t.status && w
                  ? (0, x.jsx)(f.default, {
                      title: P,
                      variant: 'secondary',
                      compact: !0,
                      onPress: () => w(t),
                      loading: F,
                    })
                  : null,
              ],
            }),
          ],
        }),
      });
    });
    const h = t =>
      c.default.create({
        card: { marginBottom: r(d[14]).spacing.md, width: '100%' },
        cardCompact: { marginBottom: r(d[14]).spacing.sm },
        row: { flexDirection: 'row', gap: r(d[14]).spacing.md },
        thumb: { width: 88, height: 88, borderRadius: r(d[14]).radius.md },
        thumbPlaceholder: {
          backgroundColor: t.surfaceSoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        body: { flex: 1 },
        titleRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: r(d[14]).spacing.sm,
        },
        title: {
          flex: 1,
          fontFamily: r(d[14]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
        },
        price: {
          fontFamily: r(d[14]).fontFamily.bold,
          fontSize: 18,
          color: t.accent,
          marginTop: 4,
        },
        meta: Object.assign({}, r(d[14]).typography.caption, {
          color: t.textSecondary,
          marginTop: 2,
        }),
        sellerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: r(d[14]).spacing.xs,
        },
        seller: { fontFamily: r(d[14]).fontFamily.medium, fontSize: 13, color: t.textSecondary },
        description: Object.assign({}, r(d[14]).typography.caption, {
          color: t.textMuted,
          marginTop: r(d[14]).spacing.sm,
        }),
        statusChip: {
          paddingHorizontal: r(d[14]).spacing.sm,
          paddingVertical: 2,
          borderRadius: r(d[14]).radius.pill,
        },
        statusText: {
          fontSize: 10,
          fontFamily: r(d[14]).fontFamily.semibold,
          color: t.textPrimary,
        },
        statusActive: { backgroundColor: t.successMuted ?? '#dcfce7' },
        statusSold: { backgroundColor: t.surfaceMuted },
        statusReserved: { backgroundColor: t.warningMuted ?? '#fef3c7' },
        statusMuted: { backgroundColor: t.surfaceSoft },
        actions: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: r(d[14]).spacing.sm,
          marginTop: r(d[14]).spacing.sm,
        },
      });
  },
  1760,
  [1, 5, 19, 161, 326, 26, 684, 672, 1486, 1672, 183, 381, 578, 1761, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.MARKET_SORT_OPTIONS = e.MARKET_CONDITIONS = e.MARKET_CATEGORIES = void 0),
      (e.categoryLabel = function (o, c) {
        const n = `market.category_${o}`,
          b = c?.(n);
        return b && b !== n ? b : (l.find(l => l.id === o)?.label ?? o);
      }));
    const l = (e.MARKET_CATEGORIES = [
      { id: 'electronics', label: 'Electronics' },
      { id: 'fashion', label: 'Fashion' },
      { id: 'food', label: 'Food & produce' },
      { id: 'books', label: 'Books & notes' },
      { id: 'home', label: 'Home & furniture' },
      { id: 'services', label: 'Services' },
      { id: 'other', label: 'Other' },
    ]);
    ((e.MARKET_CONDITIONS = [
      { id: 'new', label: 'New' },
      { id: 'like_new', label: 'Like new' },
      { id: 'good', label: 'Good' },
      { id: 'fair', label: 'Fair' },
    ]),
      (e.MARKET_SORT_OPTIONS = [
        { id: 'newest', label: 'Newest' },
        { id: 'price_asc', label: 'Price \u2191' },
        { id: 'price_desc', label: 'Price \u2193' },
      ]));
  },
  1761,
  []
);
