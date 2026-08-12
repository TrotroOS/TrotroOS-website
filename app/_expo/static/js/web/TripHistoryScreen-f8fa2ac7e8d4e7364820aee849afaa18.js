__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[18]).useNavigation)(),
          { user: n } = (0, r(d[19]).useAuth)(),
          {
            history: C,
            loading: I,
            deleteHistory: v,
            refresh: P,
          } = (0, r(d[20]).useReservations)(n?.id),
          { showToast: B } = (0, r(d[21]).useToast)(),
          { colors: z } = (0, r(d[22]).useTheme)(),
          A = R(z),
          [D, O] = (0, o.useState)('all'),
          [F, M] = (0, o.useState)('all'),
          [_, H] = (0, o.useState)(''),
          [k, E] = (0, o.useState)(null),
          [W, L] = (0, o.useState)(null),
          [N, Y] = (0, o.useState)(!1),
          V = (0, o.useMemo)(() => (0, r(d[23]).aggregateTripHistoryStats)(C), [C]),
          U = (0, o.useMemo)(
            () => (0, r(d[23]).filterTripHistory)(C, { query: _, filter: 'all' !== F ? F : D }),
            [C, _, D, F]
          ),
          G = o => {
            t.navigate('MainTabs', {
              screen: r(d[24]).ROUTES.PASSENGER_FIND_RIDE,
              params: {
                presetOrigin: o.origin ?? o.pickupPoint,
                presetDestination: o.destination,
                presetTransportMode:
                  'trotroride' === o.tripType
                    ? r(d[25]).TRANSPORT_MODES.TROTRORIDE
                    : 'trotro' === o.tripType
                      ? r(d[25]).TRANSPORT_MODES.TROTRO
                      : r(d[25]).TRANSPORT_MODES.ALL,
              },
            });
          };
        if (I)
          return (0, S.jsx)(p.default, {
            title: 'Trip History',
            subtitle: 'All completed and past trips',
            children: (0, S.jsx)(r(d[26]).SkeletonList, { count: 3 }),
          });
        return (0, S.jsxs)(p.default, {
          title: 'Trip History',
          subtitle: 'All completed and past trips',
          children: [
            (0, S.jsxs)(c.default, {
              style: A.hero,
              children: [
                (0, S.jsx)(r(d[17]).Ionicons, { name: 'time', size: 28, color: z.primary }),
                (0, S.jsxs)(c.default, {
                  style: A.heroText,
                  children: [
                    (0, S.jsx)(l.default, { style: A.heroTitle, children: 'Your ride log' }),
                    (0, S.jsx)(l.default, {
                      style: A.heroBody,
                      children: r(d[27]).TRIP_HISTORY_INTRO,
                    }),
                  ],
                }),
              ],
            }),
            C.length > 0
              ? (0, S.jsxs)(c.default, {
                  style: A.statsRow,
                  children: [
                    (0, S.jsxs)(c.default, {
                      style: A.statChip,
                      children: [
                        (0, S.jsx)(r(d[17]).Ionicons, {
                          name: 'bus-outline',
                          size: 14,
                          color: z.primary,
                        }),
                        (0, S.jsxs)(l.default, {
                          style: A.statText,
                          children: [V.total, ' trips'],
                        }),
                      ],
                    }),
                    (0, S.jsxs)(c.default, {
                      style: A.statChip,
                      children: [
                        (0, S.jsx)(r(d[17]).Ionicons, {
                          name: 'cash-outline',
                          size: 14,
                          color: z.primary,
                        }),
                        (0, S.jsxs)(l.default, {
                          style: A.statText,
                          children: [V.totalSpentLabel, ' spent'],
                        }),
                      ],
                    }),
                    V.totalSavings > 0
                      ? (0, S.jsxs)(c.default, {
                          style: A.statChip,
                          children: [
                            (0, S.jsx)(r(d[17]).Ionicons, {
                              name: 'trending-down-outline',
                              size: 14,
                              color: z.primary,
                            }),
                            (0, S.jsxs)(l.default, {
                              style: A.statText,
                              children: [V.totalSavingsLabel, ' saved'],
                            }),
                          ],
                        })
                      : null,
                    V.unrated > 0
                      ? (0, S.jsxs)(c.default, {
                          style: A.statChip,
                          children: [
                            (0, S.jsx)(r(d[17]).Ionicons, {
                              name: 'star-outline',
                              size: 14,
                              color: z.warning ?? z.primary,
                            }),
                            (0, S.jsxs)(l.default, {
                              style: A.statText,
                              children: [V.unrated, ' unrated'],
                            }),
                          ],
                        })
                      : null,
                  ],
                })
              : null,
            0 === C.length
              ? (0, S.jsx)(h.default, {
                  icon: 'time-outline',
                  title: 'No trip history yet',
                  message: 'Your completed reservations and rides will appear here.',
                  actionLabel: 'Find a ride',
                  onAction: () =>
                    t.navigate('MainTabs', { screen: r(d[24]).ROUTES.PASSENGER_FIND_RIDE }),
                })
              : (0, S.jsxs)(S.Fragment, {
                  children: [
                    (0, S.jsxs)(u.default, {
                      title: 'Filter trips',
                      children: [
                        (0, S.jsx)(c.default, {
                          style: A.filterRow,
                          children: (0, S.jsx)(j.default, {
                            options: r(d[27]).TRIP_HISTORY_FILTERS,
                            value: D,
                            onChange: t => {
                              (O(t), M('all'));
                            },
                          }),
                        }),
                        (0, S.jsx)(c.default, {
                          style: A.modeRow,
                          children: [
                            { id: 'all', label: 'All modes' },
                            { id: 'trotro', label: 'Trotro' },
                            { id: 'trotroride', label: 'TrotroRide' },
                          ].map(t => {
                            const o = F === t.id;
                            return (0, S.jsx)(
                              s.default,
                              {
                                style: [A.modeChip, o && A.modeChipActive],
                                onPress: () => M(t.id),
                                children: (0, S.jsx)(l.default, {
                                  style: [A.modeChipText, o && A.modeChipTextActive],
                                  children: t.label,
                                }),
                              },
                              t.id
                            );
                          }),
                        }),
                        (0, S.jsx)(y.default, {
                          label: 'Search corridors',
                          value: _,
                          onChangeText: H,
                          placeholder: 'Tech Junction, Ayeduase, mate name\u2026',
                        }),
                      ],
                    }),
                    (0, S.jsx)(u.default, {
                      title: `Trips (${U.length})`,
                      children:
                        0 === U.length
                          ? (0, S.jsx)(l.default, {
                              style: A.emptyFilter,
                              children: 'No trips match this filter.',
                            })
                          : U.map(t =>
                              (0, S.jsx)(
                                w,
                                {
                                  trip: t,
                                  styles: A,
                                  colors: z,
                                  onBookAgain: G,
                                  onRemove: E,
                                  onViewReceipt: L,
                                },
                                t.id
                              )
                            ),
                    }),
                  ],
                }),
            (0, S.jsxs)(f.default, {
              elevated: !0,
              children: [
                (0, S.jsx)(l.default, {
                  style: [A.heroTitle, { fontSize: 15, marginBottom: r(d[16]).spacing.sm }],
                  children: 'Why trip history?',
                }),
                r(d[27]).TRIP_HISTORY_USES.map(t =>
                  (0, S.jsxs)(
                    c.default,
                    {
                      style: A.useRow,
                      children: [
                        (0, S.jsx)(r(d[17]).Ionicons, { name: t.icon, size: 16, color: z.primary }),
                        (0, S.jsx)(l.default, { style: A.useText, children: t.text }),
                      ],
                    },
                    t.text
                  )
                ),
                (0, S.jsx)(x.default, {
                  title: 'Open My Trips',
                  variant: 'secondary',
                  compact: !0,
                  onPress: () =>
                    t.navigate('MainTabs', { screen: r(d[24]).ROUTES.PASSENGER_MY_TRIPS }),
                }),
                V.unrated > 0
                  ? (0, S.jsxs)(s.default, {
                      style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: r(d[16]).spacing.xs,
                        marginTop: r(d[16]).spacing.sm,
                      },
                      onPress: () => {
                        (O('unrated'), M('all'));
                      },
                      children: [
                        (0, S.jsx)(r(d[17]).Ionicons, {
                          name: 'star-half-outline',
                          size: 16,
                          color: z.primary,
                        }),
                        (0, S.jsxs)(l.default, {
                          style: [A.badgeText, { fontSize: 13 }],
                          children: ['Show ', V.unrated, ' unrated trip', V.unrated > 1 ? 's' : ''],
                        }),
                      ],
                    })
                  : null,
              ],
            }),
            (0, S.jsx)(f.default, {
              elevated: !0,
              children: r(d[27]).TRIP_HISTORY_TIPS.map(t =>
                (0, S.jsxs)(
                  c.default,
                  {
                    style: A.tipRow,
                    children: [
                      (0, S.jsx)(r(d[17]).Ionicons, {
                        name: 'information-circle-outline',
                        size: 16,
                        color: z.primary,
                      }),
                      (0, S.jsx)(l.default, { style: A.tipText, children: t }),
                    ],
                  },
                  t
                )
              ),
            }),
            (0, S.jsx)(b.default, {
              visible: Boolean(k),
              title: 'Delete trip from history?',
              message: 'This removes the trip from your history. It cannot be undone.',
              confirmLabel: 'Delete',
              destructive: !0,
              loading: N,
              onConfirm: async () => {
                if (!k) return;
                Y(!0);
                const { error: t } = await v(k);
                (Y(!1),
                  E(null),
                  t
                    ? B({ type: 'error', title: 'Could not delete', message: t.message })
                    : (B({
                        type: 'info',
                        title: 'Removed',
                        message: 'Trip removed from your history.',
                      }),
                      P()));
              },
              onCancel: () => E(null),
            }),
            (0, S.jsx)(T.default, { visible: Boolean(W), trip: W, onClose: () => L(null) }),
          ],
        });
      }));
    var o = r(d[1]),
      s = t(r(d[2])),
      n = t(r(d[3])),
      l = t(r(d[4])),
      c = t(r(d[5])),
      p = t(r(d[6])),
      u = t(r(d[7])),
      f = t(r(d[8])),
      x = t(r(d[9])),
      y = t(r(d[10])),
      h = t(r(d[11])),
      b = t(r(d[12])),
      j = t(r(d[13])),
      T = t(r(d[14])),
      S = r(d[15]);
    const R = t =>
      n.default.create({
        hero: {
          flexDirection: 'row',
          gap: r(d[16]).spacing.md,
          padding: r(d[16]).spacing.md,
          borderRadius: r(d[16]).radius.md,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
          borderWidth: 1,
          borderColor: t.border,
          marginBottom: r(d[16]).spacing.lg,
        },
        heroText: { flex: 1 },
        heroTitle: {
          fontFamily: r(d[16]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: r(d[16]).spacing.xs,
        },
        heroBody: Object.assign({}, r(d[16]).typography.caption, { lineHeight: 18 }),
        statsRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[16]).spacing.sm,
          marginBottom: r(d[16]).spacing.lg,
        },
        statChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[16]).spacing.xs,
          paddingHorizontal: r(d[16]).spacing.sm,
          paddingVertical: r(d[16]).spacing.xs,
          borderRadius: r(d[16]).radius.sm,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
        },
        statText: { fontFamily: r(d[16]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        filterRow: { marginBottom: r(d[16]).spacing.md },
        modeRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[16]).spacing.sm,
          marginBottom: r(d[16]).spacing.md,
        },
        modeChip: {
          paddingHorizontal: r(d[16]).spacing.sm,
          paddingVertical: r(d[16]).spacing.xs,
          borderRadius: r(d[16]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        modeChipActive: {
          borderColor: t.primary,
          backgroundColor: t.primaryAlpha12 ?? t.surfaceSoft,
        },
        modeChipText: {
          fontFamily: r(d[16]).fontFamily.medium,
          fontSize: 12,
          color: t.textSecondary,
        },
        modeChipTextActive: { color: t.primary },
        tripCard: {
          borderRadius: r(d[16]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
          padding: r(d[16]).spacing.md,
          marginBottom: r(d[16]).spacing.sm,
        },
        tripHeader: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[16]).spacing.md,
          marginBottom: r(d[16]).spacing.sm,
        },
        tripIcon: {
          width: 40,
          height: 40,
          borderRadius: r(d[16]).radius.sm,
          backgroundColor: t.primaryAlpha12 ?? t.surfaceSoft,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tripTitle: { fontFamily: r(d[16]).fontFamily.semiBold, fontSize: 15, color: t.textPrimary },
        tripMeta: Object.assign({}, r(d[16]).typography.caption, { marginTop: 2 }),
        badgeRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[16]).spacing.xs,
          marginBottom: r(d[16]).spacing.sm,
        },
        badge: {
          paddingHorizontal: r(d[16]).spacing.sm,
          paddingVertical: 2,
          borderRadius: r(d[16]).radius.sm,
          backgroundColor: t.surfaceSoft,
          borderWidth: 1,
          borderColor: t.border,
        },
        badgeSuccess: {
          backgroundColor: t.successAlpha12 ?? t.surfaceSoft,
          borderColor: t.success ?? t.border,
        },
        badgeWarning: {
          backgroundColor: t.warningAlpha12 ?? t.surfaceSoft,
          borderColor: t.warning ?? t.border,
        },
        badgeSavings: {
          backgroundColor: t.primaryAlpha12 ?? t.surfaceSoft,
          borderColor: t.primary,
        },
        badgeText: { fontFamily: r(d[16]).fontFamily.medium, fontSize: 11, color: t.textSecondary },
        badgeTextSuccess: { color: t.success ?? t.primary },
        badgeTextSavings: { color: t.primary },
        fareRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[16]).spacing.sm,
        },
        fare: { fontFamily: r(d[16]).fontFamily.bold, fontSize: 16, color: t.primary },
        ratingRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          marginBottom: r(d[16]).spacing.sm,
        },
        actionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: r(d[16]).spacing.sm },
        actionBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[16]).spacing.xs,
          paddingHorizontal: r(d[16]).spacing.sm,
          paddingVertical: r(d[16]).spacing.xs,
          borderRadius: r(d[16]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        actionBtnPrimary: { backgroundColor: t.primary, borderColor: t.primary },
        actionText: { fontFamily: r(d[16]).fontFamily.semiBold, fontSize: 12, color: t.primary },
        actionTextPrimary: { color: t.onPrimary },
        useRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[16]).spacing.sm,
          marginBottom: r(d[16]).spacing.sm,
        },
        useText: Object.assign({}, r(d[16]).typography.caption, { flex: 1, lineHeight: 18 }),
        tipRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[16]).spacing.sm,
          marginBottom: r(d[16]).spacing.sm,
        },
        tipText: Object.assign({}, r(d[16]).typography.caption, { flex: 1, lineHeight: 18 }),
        emptyFilter: Object.assign({}, r(d[16]).typography.caption, {
          textAlign: 'center',
          paddingVertical: r(d[16]).spacing.md,
        }),
      });
    function w({ trip: t, styles: o, colors: n, onBookAgain: p, onRemove: u, onViewReceipt: f }) {
      const x = t.statusMeta.tone;
      return (0, S.jsxs)(c.default, {
        style: o.tripCard,
        children: [
          (0, S.jsxs)(c.default, {
            style: o.tripHeader,
            children: [
              (0, S.jsx)(c.default, {
                style: o.tripIcon,
                children: (0, S.jsx)(r(d[17]).Ionicons, {
                  name: t.modeMeta.icon,
                  size: 20,
                  color: n.primary,
                }),
              }),
              (0, S.jsxs)(c.default, {
                style: { flex: 1 },
                children: [
                  (0, S.jsx)(l.default, { style: o.tripTitle, children: t.route }),
                  (0, S.jsxs)(l.default, {
                    style: o.tripMeta,
                    children: [t.relativeDate, ' \xb7 ', t.formattedDate],
                  }),
                  (0, S.jsx)(l.default, { style: o.tripMeta, children: t.operatorLabel }),
                ],
              }),
              (0, S.jsx)(s.default, {
                onPress: () => u(t),
                hitSlop: 8,
                children: (0, S.jsx)(r(d[17]).Ionicons, {
                  name: 'trash-outline',
                  size: 18,
                  color: n.destructive ?? n.error,
                }),
              }),
            ],
          }),
          (0, S.jsxs)(c.default, {
            style: o.badgeRow,
            children: [
              (0, S.jsx)(c.default, {
                style: [
                  o.badge,
                  'success' === x && o.badgeSuccess,
                  'warning' === x && o.badgeWarning,
                ],
                children: (0, S.jsx)(l.default, {
                  style: [o.badgeText, 'success' === x && o.badgeTextSuccess],
                  children: t.statusMeta.label,
                }),
              }),
              t.savingsLabel
                ? (0, S.jsx)(c.default, {
                    style: [o.badge, o.badgeSavings],
                    children: (0, S.jsx)(l.default, {
                      style: [o.badgeText, o.badgeTextSavings],
                      children: t.savingsLabel,
                    }),
                  })
                : null,
              t.isCompleted && !t.isRated
                ? (0, S.jsx)(c.default, {
                    style: [o.badge, o.badgeWarning],
                    children: (0, S.jsx)(l.default, { style: o.badgeText, children: 'Unrated' }),
                  })
                : null,
            ],
          }),
          (0, S.jsxs)(c.default, {
            style: o.fareRow,
            children: [
              (0, S.jsx)(l.default, { style: o.fare, children: t.fareLabel }),
              t.paymentMethod
                ? (0, S.jsx)(l.default, { style: o.tripMeta, children: t.paymentMethod })
                : null,
            ],
          }),
          t.isRated
            ? (0, S.jsxs)(c.default, {
                style: o.ratingRow,
                children: [
                  [1, 2, 3, 4, 5].map(o =>
                    (0, S.jsx)(
                      r(d[17]).Ionicons,
                      {
                        name: o <= t.ratingScore ? 'star' : 'star-outline',
                        size: 14,
                        color: n.warning ?? n.primary,
                      },
                      o
                    )
                  ),
                  (0, S.jsxs)(l.default, {
                    style: [o.tripMeta, { marginLeft: r(d[16]).spacing.xs }],
                    children: ['You rated ', t.ratingScore, '/5'],
                  }),
                ],
              })
            : null,
          (0, S.jsxs)(c.default, {
            style: o.actionRow,
            children: [
              (0, S.jsxs)(s.default, {
                style: o.actionBtn,
                onPress: () => f(t),
                children: [
                  (0, S.jsx)(r(d[17]).Ionicons, {
                    name: 'receipt-outline',
                    size: 14,
                    color: n.primary,
                  }),
                  (0, S.jsx)(l.default, { style: o.actionText, children: 'Receipt' }),
                ],
              }),
              t.isCompleted
                ? (0, S.jsxs)(s.default, {
                    style: [o.actionBtn, o.actionBtnPrimary],
                    onPress: () => p(t),
                    children: [
                      (0, S.jsx)(r(d[17]).Ionicons, {
                        name: 'search',
                        size: 14,
                        color: n.onPrimary,
                      }),
                      (0, S.jsx)(l.default, {
                        style: [o.actionText, o.actionTextPrimary],
                        children: 'Book again',
                      }),
                    ],
                  })
                : null,
            ],
          }),
        ],
      });
    }
  },
  1456,
  [
    1, 5, 326, 26, 161, 19, 1710, 1667, 684, 672, 679, 1534, 1645, 1535, 1795, 183, 377, 578, 382,
    501, 1665, 1386, 381, 1716, 682, 940, 1617, 1797,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ visible: l, trip: s = null, onClose: v }) {
        const { colors: h } = (0, r(d[10]).useTheme)(),
          x = (0, t.useMemo)(() => y(h), [h]),
          j = (0, t.useMemo)(() => (s ? (0, r(d[11]).enrichTripHistoryItem)(s) : null), [s]);
        if (!j) return null;
        const T = [
          { label: 'Route', value: j.route },
          { label: 'Date', value: j.formattedDate },
          { label: 'Status', value: j.statusMeta.label },
          { label: 'Service', value: j.modeMeta.label },
          j.operatorName ? { label: 'Operator', value: j.operatorName } : null,
          j.plateNumber ? { label: 'Vehicle', value: j.plateNumber } : null,
          j.origin || j.pickupPoint ? { label: 'Pickup', value: j.origin ?? j.pickupPoint } : null,
          j.destination ? { label: 'Drop-off', value: j.destination } : null,
          { label: 'Fare', value: j.fareLabel },
          j.paymentMethod ? { label: 'Payment', value: j.paymentMethod } : null,
          j.momoReference || j.paymentReference
            ? { label: 'Reference', value: j.momoReference ?? j.paymentReference }
            : null,
          j.savingsLabel ? { label: 'Savings', value: j.savingsLabel } : null,
        ].filter(Boolean);
        return (0, b.jsxs)(p.default, {
          visible: l,
          title: 'Trip receipt',
          subtitle: 'Share fare, route, and payment details from this trip.',
          confirmTitle: null,
          showCancelButton: !1,
          onClose: v,
          children: [
            (0, b.jsxs)(c.default, {
              style: x.receiptCard,
              children: [
                (0, b.jsxs)(c.default, {
                  style: x.receiptHeader,
                  children: [
                    (0, b.jsx)(r(d[13]).Ionicons, {
                      name: 'receipt-outline',
                      size: 22,
                      color: h.primary,
                    }),
                    (0, b.jsx)(u.default, { style: x.receiptTitle, children: 'TrotroOS' }),
                  ],
                }),
                T.map(l =>
                  (0, b.jsxs)(
                    c.default,
                    {
                      style: x.row,
                      children: [
                        (0, b.jsx)(u.default, { style: x.label, children: l.label }),
                        (0, b.jsx)(u.default, { style: x.value, children: l.value }),
                      ],
                    },
                    l.label
                  )
                ),
              ],
            }),
            (0, b.jsx)(f.default, {
              title: 'Share receipt',
              onPress: async () => {
                if (s)
                  try {
                    await n.default.share({
                      message: (0, r(d[12], '../../utils/tripReceipt').buildTripReceiptText)(s),
                      title: 'TrotroOS trip receipt',
                    });
                  } catch {
                    o.default.alert('Could not share', 'Try again in a moment.');
                  }
              },
            }),
            (0, b.jsx)(f.default, { title: 'Close', variant: 'ghost', onPress: v }),
          ],
        });
      }));
    var t = r(d[1]),
      o = l(r(d[2])),
      n = l(r(d[3])),
      s = l(r(d[4])),
      u = l(r(d[5])),
      c = l(r(d[6])),
      p = l(r(d[7])),
      f = l(r(d[8])),
      b = r(d[9]);
    const y = l =>
      s.default.create({
        receiptCard: {
          borderRadius: r(d[14]).radius.lg,
          borderWidth: 1,
          borderColor: l.border,
          backgroundColor: l.surface,
          padding: r(d[14]).spacing.md,
          marginBottom: r(d[14]).spacing.md,
          gap: r(d[14]).spacing.sm,
        },
        receiptHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.xs,
        },
        receiptTitle: { fontFamily: r(d[14]).fontFamily.bold, fontSize: 16, color: l.textPrimary },
        row: { flexDirection: 'row', justifyContent: 'space-between', gap: r(d[14]).spacing.md },
        label: Object.assign({}, r(d[14]).typography.caption, { color: l.textMuted }),
        value: {
          flex: 1,
          textAlign: 'right',
          fontFamily: r(d[14]).fontFamily.medium,
          fontSize: 13,
          color: l.textPrimary,
        },
      });
  },
  1795,
  [1, 5, 678, 1517, 26, 161, 19, 1515, 672, 183, 381, 1716, 1796, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildTripReceiptText = function (t = {}) {
        const o = (0, r(d[0]).enrichTripHistoryItem)(t),
          p = [
            'TrotroOS trip receipt',
            '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
            `Route: ${o.route ?? 'Trip'}`,
            `Date: ${o.formattedDate || '\u2014'}`,
            `Status: ${o.statusMeta?.label ?? o.status ?? '\u2014'}`,
            `Service: ${o.modeMeta?.label ?? 'Ride'}`,
          ];
        (o.operatorName || o.operatorLabel) &&
          p.push(`Operator: ${o.operatorName ?? o.operatorLabel}`);
        o.plateNumber && p.push(`Vehicle: ${o.plateNumber}`);
        (o.origin || o.pickupPoint) && p.push(`Pickup: ${o.origin ?? o.pickupPoint}`);
        o.destination && p.push(`Drop-off: ${o.destination}`);
        (p.push(`Fare: ${o.fareLabel}`), o.paymentMethod && p.push(`Payment: ${o.paymentMethod}`));
        (o.momoReference || o.paymentReference) &&
          p.push(`Reference: ${o.momoReference ?? o.paymentReference}`);
        null != o.platformFee &&
          Number(o.platformFee) > 0 &&
          p.push(`Platform fee: GHS ${Number(o.platformFee).toFixed(2)}`);
        o.savingsLabel && p.push(o.savingsLabel);
        o.isRated && p.push(`Your rating: ${o.ratingScore}/5`);
        return (
          p.push(
            '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'
          ),
          p.push('Thank you for riding with TrotroOS.'),
          p.join('\n')
        );
      }));
  },
  1796,
  [1716]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TRIP_HISTORY_USES =
        e.TRIP_HISTORY_TIPS =
        e.TRIP_HISTORY_INTRO =
        e.TRIP_HISTORY_FILTERS =
          void 0));
    ((e.TRIP_HISTORY_INTRO =
      'Every trotro seat and TrotroRide you have taken. Filter, review fares, and book the same corridor again.'),
      (e.TRIP_HISTORY_FILTERS = [
        { id: 'all', label: 'All' },
        { id: 'completed', label: 'Completed' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'unrated', label: 'Unrated' },
      ]),
      (e.TRIP_HISTORY_USES = [
        { icon: 'cash-outline', text: 'See what you spent and estimated savings vs Bolt' },
        { icon: 'star-outline', text: 'Spot trips you have not rated yet' },
        { icon: 'search-outline', text: 'Book the same corridor again in one tap' },
        { icon: 'document-text-outline', text: 'Remove entries you no longer need locally' },
      ]),
      (e.TRIP_HISTORY_TIPS = [
        'Completed and cancelled reservations appear here automatically.',
        'Rate drivers and mates from My Trips right after boarding.',
        'Deleting history only hides it on this device \u2014 it does not cancel active trips.',
        'Use filters to find unrated trips you still want to score.',
      ]));
  },
  1797,
  []
);
