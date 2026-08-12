__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[13]).useNavigation)(),
          { user: n, profile: w } = (0, r(d[14]).useAuth)(),
          { activeRole: T } = (0, r(d[15]).useAppMode)(),
          { showToast: S } = (0, r(d[16]).useToast)(),
          { colors: C } = (0, r(d[17]).useTheme)(),
          { t: v } = (0, r(d[18]).useLanguage)(),
          O = (0, l.useMemo)(() => b(C), [C]),
          M = (0, l.useMemo)(() => (0, r(d[19]).getWalletModeConfig)(T, v), [T, v]),
          [B, F] = (0, l.useState)({ balance_ghs: 0 }),
          [A, R] = (0, l.useState)([]),
          [D, U] = (0, l.useState)([]),
          [_, P] = (0, l.useState)(!0),
          [z, H] = (0, l.useState)(!1),
          [L, E] = (0, l.useState)(null),
          [I, q] = (0, l.useState)('20'),
          [N, k] = (0, l.useState)(''),
          [G, W] = (0, l.useState)(''),
          [V, J] = (0, l.useState)(!1),
          K = Number(B?.balance_ghs ?? 0),
          Q = (0, l.useCallback)(async () => {
            if (!n?.id) return;
            const [{ data: t }, { data: l }, { data: o }] = await Promise.all([
              (0, r(d[20]).fetchWallet)(),
              (0, r(d[20]).fetchWalletTransactions)({ limit: 40 }),
              (0, r(d[20]).fetchPayoutRequests)({ limit: 10 }),
            ]);
            (t && F(t), R(l ?? []), U(o ?? []));
          }, [n?.id]);
        (0, l.useEffect)(() => {
          n?.id ? (W(w?.phone_number ?? ''), Q().finally(() => P(!1))) : P(!1);
        }, [n?.id, w?.phone_number, Q]);
        const X = (0, l.useCallback)(async () => {
          (H(!0), await Q(), H(!1));
        }, [Q]);
        if (_)
          return (0, x.jsx)(p.default, {
            title: M.title,
            subtitle: M.subtitle,
            children: (0, x.jsx)(o.default, { color: C.primary, style: { marginTop: 40 } }),
          });
        return (0, x.jsxs)(p.default, {
          title: M.title,
          subtitle: M.subtitle,
          refreshControl: (0, x.jsx)(s.default, {
            refreshing: z,
            onRefresh: X,
            tintColor: C.primary,
          }),
          children: [
            (0, x.jsxs)(f.default, {
              elevated: !0,
              style: O.hero,
              children: [
                M.isEarner
                  ? (0, x.jsxs)(u.default, {
                      style: O.modeBadge,
                      children: [
                        (0, x.jsx)(r(d[22]).Ionicons, {
                          name: 'briefcase-outline',
                          size: 12,
                          color: C.goldDeep ?? C.gold,
                        }),
                        (0, x.jsx)(c.default, {
                          style: O.modeBadgeText,
                          children: v('wallet.earnerBadge'),
                        }),
                      ],
                    })
                  : null,
                (0, x.jsx)(c.default, { style: O.heroLabel, children: v('wallet.balance') }),
                (0, x.jsx)(c.default, { style: O.balance, children: (0, r(d[21]).formatGhs)(K) }),
                (0, x.jsx)(c.default, { style: O.heroMeta, children: M.balanceHint }),
              ],
            }),
            (0, x.jsxs)(u.default, {
              style: O.actions,
              children: [
                M.showTopUp
                  ? (0, x.jsx)(u.default, {
                      style: O.actionFlex,
                      children: (0, x.jsx)(h.default, {
                        title: v('wallet.topUp'),
                        onPress: () => E('topup'),
                        compact: !0,
                      }),
                    })
                  : null,
                M.showCashOut
                  ? (0, x.jsx)(u.default, {
                      style: [O.actionFlex, !M.showTopUp && { flex: 1 }],
                      children: (0, x.jsx)(h.default, {
                        title: v('wallet.cashOut'),
                        variant: M.showTopUp ? 'secondary' : 'primary',
                        onPress: () => {
                          (k(K >= 5 ? String(K.toFixed(2)) : ''), E('cashout'));
                        },
                        compact: !0,
                      }),
                    })
                  : null,
              ],
            }),
            M.isEarner && !M.showTopUp
              ? (0, x.jsx)(c.default, {
                  style: O.operatorHint,
                  children: v('wallet.operatorTopUpHint'),
                })
              : null,
            M.showEarningsLink && M.earningsRoute
              ? (0, x.jsxs)(f.default, {
                  elevated: !0,
                  style: O.earningsCard,
                  children: [
                    (0, x.jsx)(r(d[22]).Ionicons, {
                      name: 'trending-up-outline',
                      size: 24,
                      color: C.goldDeep ?? C.gold,
                    }),
                    (0, x.jsx)(c.default, { style: O.earningsText, children: M.balanceHint }),
                    (0, x.jsx)(h.default, {
                      title: M.earningsLink,
                      variant: 'secondary',
                      compact: !0,
                      noMargin: !0,
                      onPress: () => (0, r(d[23]).navigateToMainTab)(t, M.earningsRoute),
                    }),
                  ],
                })
              : null,
            D.some(t => 'pending' === t.status || 'processing' === t.status)
              ? (0, x.jsx)(f.default, {
                  elevated: !0,
                  children: D.filter(t => 'pending' === t.status || 'processing' === t.status)
                    .slice(0, 3)
                    .map(t =>
                      (0, x.jsxs)(
                        u.default,
                        {
                          style: O.payoutChip,
                          children: [
                            (0, x.jsx)(r(d[22]).Ionicons, {
                              name: 'time-outline',
                              size: 18,
                              color: C.warning ?? C.primary,
                            }),
                            (0, x.jsxs)(c.default, {
                              style: O.payoutText,
                              children: [
                                (0, r(d[21]).formatGhs)(t.amount),
                                ' ',
                                v('wallet.payoutTo'),
                                ' ',
                                t.momo_number,
                                ' \xb7 ',
                                t.status,
                                ' \xb7',
                                ' ',
                                v('wallet.cashOutEta'),
                              ],
                            }),
                          ],
                        },
                        t.id
                      )
                    ),
                })
              : null,
            (0, x.jsx)(c.default, { style: O.sectionTitle, children: v('wallet.activity') }),
            0 === A.length
              ? (0, x.jsx)(f.default, {
                  elevated: !0,
                  children: (0, x.jsx)(c.default, { style: O.empty, children: M.emptyActivity }),
                })
              : A.map(t => {
                  const l = 'credit' === t.direction;
                  return (0, x.jsxs)(
                    f.default,
                    {
                      elevated: !0,
                      style: { marginBottom: r(d[12]).spacing.sm },
                      children: [
                        (0, x.jsxs)(u.default, {
                          style: O.txRow,
                          children: [
                            (0, x.jsx)(c.default, {
                              style: O.txTitle,
                              children: (0, r(d[20]).formatWalletTxLabel)(t, v),
                            }),
                            (0, x.jsxs)(c.default, {
                              style: l ? O.txAmountCredit : O.txAmountDebit,
                              children: [l ? '+' : '\u2212', (0, r(d[21]).formatGhs)(t.amount)],
                            }),
                          ],
                        }),
                        (0, x.jsx)(c.default, {
                          style: O.txMeta,
                          children: [t.status, t.reference, j(t.created_at)]
                            .filter(Boolean)
                            .join(' \xb7 '),
                        }),
                      ],
                    },
                    t.id
                  );
                }),
            (0, x.jsx)(y.default, {
              visible: 'topup' === L,
              mode: 'topup',
              topUpAmount: I,
              onTopUpAmountChange: q,
              merchantCode: r(d[24]).PLATFORM_MOMO_MERCHANT_CODE,
              onConfirmTopUp: async ({ amount: t, reference: l }) => {
                if (!t || t < 1)
                  return void S({
                    type: 'error',
                    title: v('wallet.invalidAmountTitle'),
                    message: v('wallet.invalidAmountMin'),
                  });
                if (!l)
                  return void S({
                    type: 'error',
                    title: v('wallet.referenceRequiredTitle'),
                    message: v('wallet.referenceRequiredMsg'),
                  });
                J(!0);
                const { error: o } = await (0, r(d[20]).confirmTopUp)(t, l);
                (J(!1),
                  o
                    ? S({ type: 'error', title: v('wallet.topUpFailed'), message: o.message })
                    : (E(null),
                      S({
                        type: 'success',
                        title: v('wallet.topUpSuccess'),
                        message: v('wallet.topUpSuccessMsg', {
                          amount: (0, r(d[21]).formatGhs)(t),
                        }),
                      }),
                      await Q()));
              },
              loading: V,
              onClose: () => E(null),
            }),
            (0, x.jsx)(y.default, {
              visible: 'cashout' === L,
              mode: 'cashout',
              cashOutAmount: N,
              onCashOutAmountChange: k,
              momoNumber: G,
              onMomoNumberChange: W,
              maxCashOut: K,
              onConfirmCashOut: async ({ amount: t, momoNumber: l }) => {
                if (!t || t < 5)
                  return void S({
                    type: 'error',
                    title: v('wallet.invalidAmountTitle'),
                    message: v('wallet.cashOutMin'),
                  });
                if (!l || l.replace(/\D/g, '').length < 9)
                  return void S({
                    type: 'error',
                    title: v('wallet.momoRequiredTitle'),
                    message: v('wallet.momoRequiredMsg'),
                  });
                J(!0);
                const { error: o } = await (0, r(d[20]).requestCashOut)(t, l);
                (J(!1),
                  o
                    ? S({ type: 'error', title: v('wallet.cashOutFailed'), message: o.message })
                    : (E(null),
                      S({
                        type: 'success',
                        title: v('wallet.cashOutSuccess'),
                        message: v('wallet.cashOutSuccessMsg'),
                      }),
                      await Q()));
              },
              loading: V,
              onClose: () => E(null),
            }),
          ],
        });
      }));
    var l = r(d[1]),
      o = t(r(d[2])),
      s = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      f = t(r(d[8])),
      h = t(r(d[9])),
      y = t(r(d[10])),
      x = r(d[11]);
    const b = t =>
      n.default.create({
        hero: { marginBottom: r(d[12]).spacing.md },
        heroLabel: Object.assign({}, r(d[12]).typography.label, {
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          marginBottom: r(d[12]).spacing.xs,
        }),
        balance: {
          fontFamily: r(d[12]).fontFamily.bold,
          fontSize: 40,
          color: t.textPrimary,
          letterSpacing: -0.5,
        },
        heroMeta: Object.assign({}, r(d[12]).typography.body, {
          color: t.textSecondary,
          marginTop: r(d[12]).spacing.xs,
        }),
        modeBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          alignSelf: 'flex-start',
          marginBottom: r(d[12]).spacing.sm,
          paddingHorizontal: r(d[12]).spacing.sm,
          paddingVertical: 4,
          borderRadius: r(d[12]).radius.pill,
          backgroundColor: t.goldAlpha12 ?? t.surface,
        },
        modeBadgeText: {
          fontFamily: r(d[12]).fontFamily.semiBold,
          fontSize: 11,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: t.goldDeep ?? t.gold,
        },
        actions: {
          flexDirection: 'row',
          gap: r(d[12]).spacing.sm,
          marginBottom: r(d[12]).spacing.md,
        },
        actionFlex: { flex: 1 },
        earningsCard: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[12]).spacing.md,
          marginBottom: r(d[12]).spacing.md,
        },
        earningsText: Object.assign({ flex: 1 }, r(d[12]).typography.body, {
          color: t.textSecondary,
          lineHeight: 22,
        }),
        operatorHint: Object.assign({}, r(d[12]).typography.caption, {
          color: t.textMuted,
          marginBottom: r(d[12]).spacing.md,
          lineHeight: 18,
        }),
        sectionTitle: {
          fontFamily: r(d[12]).fontFamily.semiBold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: r(d[12]).spacing.sm,
          marginTop: r(d[12]).spacing.sm,
        },
        txRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: r(d[12]).spacing.sm,
          marginBottom: r(d[12]).spacing.xs,
        },
        txTitle: {
          fontFamily: r(d[12]).fontFamily.semiBold,
          fontSize: 15,
          color: t.textPrimary,
          flex: 1,
        },
        txAmountCredit: { fontFamily: r(d[12]).fontFamily.bold, fontSize: 15, color: t.success },
        txAmountDebit: { fontFamily: r(d[12]).fontFamily.bold, fontSize: 15, color: t.textPrimary },
        txMeta: Object.assign({}, r(d[12]).typography.caption),
        empty: Object.assign({}, r(d[12]).typography.body, { color: t.textSecondary }),
        payoutChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[12]).spacing.sm,
          marginBottom: r(d[12]).spacing.sm,
        },
        payoutText: Object.assign({}, r(d[12]).typography.caption, { flex: 1, lineHeight: 18 }),
      });
    function j(t) {
      if (!t) return '';
      try {
        return new Date(t).toLocaleString(void 0, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        return '';
      }
    }
  },
  1459,
  [
    1, 5, 373, 105, 26, 161, 19, 1710, 684, 672, 1525, 183, 377, 382, 501, 1484, 1386, 381, 1381,
    1669, 1491, 691, 578, 1488, 508,
  ]
);
