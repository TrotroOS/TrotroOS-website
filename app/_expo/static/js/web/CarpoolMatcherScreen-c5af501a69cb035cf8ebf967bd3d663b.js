__d(
  function (g, _r, i, a, m, e, d) {
    var t = _r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, _r(d[18]).useRoute)(),
          { colors: n } = (0, _r(d[19]).useTheme)(),
          { t: v } = (0, _r(d[20]).useLanguage)(),
          { user: F } = (0, _r(d[21]).useAuth)(),
          { prefs: I } = (0, _r(d[22]).useUserPreferences)(F?.id),
          { showToast: R } = (0, _r(d[23]).useToast)(),
          { compact: P } = (0, _r(d[24]).useCompactLayout)(),
          B = (0, o.useMemo)(() => L(n, P), [n, P]),
          [O, E] = (0, o.useState)('find'),
          [_, w] = (0, o.useState)(''),
          [A, D] = (0, o.useState)(''),
          [H, z] = (0, o.useState)(''),
          [U, N] = (0, o.useState)([]),
          [q, G] = (0, o.useState)([]),
          [Y, $] = (0, o.useState)([]),
          [K, Q] = (0, o.useState)(!1),
          [W, V] = (0, o.useState)(!1),
          [J, X] = (0, o.useState)(!1),
          [Z, ee] = (0, o.useState)(null),
          [te, oe] = (0, o.useState)('1'),
          [le, ae] = (0, o.useState)(''),
          [re, se] = (0, o.useState)(!1),
          [ie, ne] = (0, o.useState)(''),
          [ce, de] = (0, o.useState)(''),
          [ue, pe] = (0, o.useState)(k()),
          [ge, fe] = (0, o.useState)('08:00'),
          [me, he] = (0, o.useState)('3'),
          [xe, ye] = (0, o.useState)('5'),
          [be, je] = (0, o.useState)(''),
          Te = (0, o.useMemo)(
            () => (0, _r(d[25]).mergeQuickRoutes)(I?.favoriteRoutes ?? []),
            [I?.favoriteRoutes]
          );
        (0, o.useEffect)(() => {
          (t.params?.presetOrigin && w(t.params.presetOrigin),
            t.params?.presetDestination && D(t.params.presetDestination));
        }, [t.params?.presetOrigin, t.params?.presetDestination]);
        const Se = (0, o.useCallback)(async () => {
            if (!_.trim() || !A.trim())
              return void R({
                type: 'error',
                title: v('carpool.missingRouteTitle'),
                message: v('carpool.missingRouteMessage'),
              });
            Q(!0);
            const t = await (0, _r(d[26]).searchCarpoolRides)(_, A, H || void 0);
            (N(t.data ?? []),
              X(Boolean(t.localOnly)),
              Q(!1),
              t.error &&
                R({
                  type: 'error',
                  title: v('carpool.searchFailed'),
                  message: (0, _r(d[27]).errorMessage)(t.error),
                }));
          }, [_, A, H, R, v]),
          Ce = (0, o.useCallback)(async () => {
            if (!F?.id) return;
            V(!0);
            const [t, o] = await Promise.all([
              (0, _r(d[26]).getMyCarpoolBookings)(F.id),
              (0, _r(d[26]).getMyCarpoolOffers)(F.id),
            ]);
            (t.error || G(t.data ?? []),
              o.error || $(o.data ?? []),
              X(l => l || Boolean(t.localOnly || o.localOnly)),
              V(!1));
          }, [F?.id]);
        ((0, o.useEffect)(() => {
          Ce();
        }, [Ce]),
          (0, o.useEffect)(() => {
            const t = (0, _r(d[26]).subscribeToCarpoolRides)(() => {
                _ && A && Se();
              }),
              o = F?.id ? (0, _r(d[26]).subscribeToMyCarpoolBookings)(F.id, () => Ce()) : () => {};
            return () => {
              ('function' == typeof t && t(), 'function' == typeof o && o());
            };
          }, [_, A, Se, Ce, F?.id]));
        const ke = t => {
            (w(t.origin),
              D(t.destination),
              'offer' === O &&
                (ne(t.origin),
                de(t.destination),
                ye(
                  String(
                    t.fare ?? (0, _r(d[26]).suggestedCarpoolPrice)(t.origin, t.destination, Te)
                  )
                )));
          },
          Me = t => {
            (ee(t), oe('1'), ae(_.trim() || t.origin));
          },
          Le = async t => {
            se(!0);
            const o = await (0, _r(d[26]).cancelCarpoolBooking)(t);
            (se(!1),
              o.error
                ? R({
                    type: 'error',
                    title: v('carpool.cancelFailed'),
                    message: (0, _r(d[27]).errorMessage)(o.error),
                  })
                : (R({
                    type: 'success',
                    title: v('carpool.cancelledTitle'),
                    message: v('carpool.cancelledMessage'),
                  }),
                  Ce(),
                  Se()));
          },
          ve = async t => {
            se(!0);
            const o = await (0, _r(d[26]).cancelCarpoolRide)(t);
            (se(!1),
              o.error
                ? R({
                    type: 'error',
                    title: v('carpool.cancelFailed'),
                    message: (0, _r(d[27]).errorMessage)(o.error),
                  })
                : (R({
                    type: 'success',
                    title: v('carpool.offerCancelledTitle'),
                    message: v('carpool.offerCancelledMessage'),
                  }),
                  Ce()));
          },
          Fe = (0, o.useMemo)(() => q.filter(t => 'confirmed' === t.status), [q]),
          Ie = (0, o.useCallback)(
            ({ item: t }) =>
              (0, C.jsx)(S.default, {
                ride: t,
                onBook: Me,
                bookLabel: v('carpool.bookSeat'),
                loading: re,
              }),
            [Me, re, v]
          ),
          Re = (0, o.useCallback)(
            ({ item: t }) =>
              (0, C.jsx)(S.default, {
                ride: Object.assign({}, t.ride, {
                  seatsBooked: t.seatsBooked,
                  driverPhone: t.ride?.driverPhone,
                }),
                mode: 'booking',
                cancelLabel: v('carpool.cancelBooking'),
                onCancel: () => Le(t.id),
                loading: re,
              }),
            [Le, re, v]
          ),
          Pe = (0, o.useCallback)(
            ({ item: t }) =>
              (0, C.jsx)(S.default, {
                ride: t,
                mode: 'offer',
                cancelLabel: v('carpool.cancelOffer'),
                onCancel: () => ve(t.id),
                loading: re,
              }),
            [ve, re, v]
          ),
          Be = (0, o.useCallback)(t => t.id, []),
          Oe = (0, o.useCallback)(t => t.id, []),
          Ee = (0, o.useCallback)(t => t.id, []);
        return (0, C.jsxs)(h.default, {
          title: v('carpool.title'),
          subtitle: v('carpool.subtitle'),
          testID: 'passenger-carpool',
          scroll: !0,
          refreshControl: (0, C.jsx)(f.default, {
            refreshing: K || W,
            onRefresh: () => {
              'find' === O ? Se() : Ce();
            },
            tintColor: n.primary,
          }),
          children: [
            J ? (0, C.jsx)(j.default, { fromFallback: !0 }) : null,
            (0, C.jsx)(x.default, {
              options: [
                { label: v('carpool.tabFind'), value: 'find' },
                { label: v('carpool.tabBookings'), value: 'bookings' },
                { label: v('carpool.tabOffer'), value: 'offer' },
              ],
              value: O,
              onChange: E,
              compact: P,
              style: { marginBottom: _r(d[28]).spacing.lg },
            }),
            'find' === O
              ? (0, C.jsxs)(C.Fragment, {
                  children: [
                    (0, C.jsx)(r.default, { style: B.lead, children: v('carpool.findLead') }),
                    (0, C.jsx)(p.default, {
                      horizontal: !0,
                      showsHorizontalScrollIndicator: !1,
                      style: B.quickScroll,
                      children: Te.slice(0, 8).map(t =>
                        (0, C.jsx)(
                          T.default,
                          {
                            route: t,
                            selected: _ === t.origin && A === t.destination,
                            onPress: () => ke(t),
                          },
                          `${t.origin}-${t.destination}`
                        )
                      ),
                    }),
                    (0, C.jsx)(r.default, { style: B.label, children: v('carpool.originLabel') }),
                    (0, C.jsx)(s.default, {
                      style: B.input,
                      value: _,
                      onChangeText: w,
                      placeholder: v('carpool.originPlaceholder'),
                      placeholderTextColor: n.textMuted,
                    }),
                    (0, C.jsx)(r.default, {
                      style: B.label,
                      children: v('carpool.destinationLabel'),
                    }),
                    (0, C.jsx)(s.default, {
                      style: B.input,
                      value: A,
                      onChangeText: D,
                      placeholder: v('carpool.destinationPlaceholder'),
                      placeholderTextColor: n.textMuted,
                    }),
                    (0, C.jsx)(r.default, { style: B.label, children: v('carpool.dateLabel') }),
                    (0, C.jsx)(s.default, {
                      style: B.input,
                      value: H,
                      onChangeText: z,
                      placeholder: v('carpool.datePlaceholder'),
                      placeholderTextColor: n.textMuted,
                    }),
                    (0, C.jsx)(y.default, {
                      title: v('carpool.searchCta'),
                      onPress: Se,
                      loading: K,
                    }),
                    K && !U.length ? (0, C.jsx)(_r(d[29]).SkeletonList, { count: 3 }) : null,
                    !K && 0 === U.length && _ && A
                      ? (0, C.jsx)(b.default, {
                          icon: 'car-outline',
                          title: v('carpool.noRidesTitle'),
                          message: v('carpool.noRidesMessage'),
                          actionLabel: v('carpool.tabOffer'),
                          onAction: () => E('offer'),
                        })
                      : null,
                    U.length > 0
                      ? (0, C.jsx)(
                          _r(d[30]).FlashList,
                          Object.assign(
                            {
                              data: U,
                              keyExtractor: Be,
                              renderItem: Ie,
                              estimatedItemSize: _r(d[31]).TRIP_CARD_ESTIMATED_HEIGHT,
                              scrollEnabled: !1,
                            },
                            _r(d[31]).FLASH_LIST_DEFAULTS
                          )
                        )
                      : null,
                  ],
                })
              : null,
            'bookings' === O
              ? (0, C.jsxs)(C.Fragment, {
                  children: [
                    (0, C.jsx)(r.default, {
                      style: B.sectionTitle,
                      children: v('carpool.myBookingsTitle'),
                    }),
                    W && !q.length ? (0, C.jsx)(_r(d[29]).SkeletonList, { count: 2 }) : null,
                    W || 0 !== Fe.length
                      ? null
                      : (0, C.jsx)(b.default, {
                          icon: 'ticket-outline',
                          title: v('carpool.noBookingsTitle'),
                          message: v('carpool.noBookingsMessage'),
                          actionLabel: v('carpool.tabFind'),
                          onAction: () => E('find'),
                        }),
                    Fe.length > 0
                      ? (0, C.jsx)(
                          _r(d[30]).FlashList,
                          Object.assign(
                            {
                              data: Fe,
                              keyExtractor: Oe,
                              renderItem: Re,
                              estimatedItemSize: _r(d[31]).TRIP_CARD_ESTIMATED_HEIGHT,
                              scrollEnabled: !1,
                            },
                            _r(d[31]).FLASH_LIST_DEFAULTS
                          )
                        )
                      : null,
                    (0, C.jsx)(r.default, {
                      style: [B.sectionTitle, { marginTop: _r(d[28]).spacing.lg }],
                      children: v('carpool.myOffersTitle'),
                    }),
                    0 === Y.length
                      ? (0, C.jsx)(r.default, {
                          style: B.emptyHint,
                          children: v('carpool.noOffersHint'),
                        })
                      : (0, C.jsx)(
                          _r(d[30]).FlashList,
                          Object.assign(
                            {
                              data: Y,
                              keyExtractor: Ee,
                              renderItem: Pe,
                              estimatedItemSize: _r(d[31]).TRIP_CARD_ESTIMATED_HEIGHT,
                              scrollEnabled: !1,
                            },
                            _r(d[31]).FLASH_LIST_DEFAULTS
                          )
                        ),
                  ],
                })
              : null,
            'offer' === O
              ? (0, C.jsxs)(C.Fragment, {
                  children: [
                    (0, C.jsx)(r.default, { style: B.lead, children: v('carpool.offerLead') }),
                    (0, C.jsx)(p.default, {
                      horizontal: !0,
                      showsHorizontalScrollIndicator: !1,
                      style: B.quickScroll,
                      children: _r(d[25]).KUMASI_QUICK_ROUTES.map(t =>
                        (0, C.jsx)(
                          T.default,
                          {
                            route: t,
                            selected: ie === t.origin && ce === t.destination,
                            onPress: () => ke(t),
                          },
                          t.id
                        )
                      ),
                    }),
                    (0, C.jsx)(r.default, { style: B.label, children: v('carpool.originLabel') }),
                    (0, C.jsx)(s.default, {
                      style: B.input,
                      value: ie,
                      onChangeText: t => {
                        (ne(t), ye(String((0, _r(d[26]).suggestedCarpoolPrice)(t, ce, Te))));
                      },
                      placeholder: v('carpool.originPlaceholder'),
                      placeholderTextColor: n.textMuted,
                    }),
                    (0, C.jsx)(r.default, {
                      style: B.label,
                      children: v('carpool.destinationLabel'),
                    }),
                    (0, C.jsx)(s.default, {
                      style: B.input,
                      value: ce,
                      onChangeText: t => {
                        (de(t), ye(String((0, _r(d[26]).suggestedCarpoolPrice)(ie, t, Te))));
                      },
                      placeholder: v('carpool.destinationPlaceholder'),
                      placeholderTextColor: n.textMuted,
                    }),
                    (0, C.jsxs)(l.default, {
                      style: B.row2,
                      children: [
                        (0, C.jsxs)(l.default, {
                          style: B.half,
                          children: [
                            (0, C.jsx)(r.default, {
                              style: B.label,
                              children: v('carpool.dateLabel'),
                            }),
                            (0, C.jsx)(s.default, {
                              style: B.input,
                              value: ue,
                              onChangeText: pe,
                              placeholder: 'YYYY-MM-DD',
                              placeholderTextColor: n.textMuted,
                            }),
                          ],
                        }),
                        (0, C.jsxs)(l.default, {
                          style: B.half,
                          children: [
                            (0, C.jsx)(r.default, {
                              style: B.label,
                              children: v('carpool.timeLabel'),
                            }),
                            (0, C.jsx)(s.default, {
                              style: B.input,
                              value: ge,
                              onChangeText: fe,
                              placeholder: '08:00',
                              placeholderTextColor: n.textMuted,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, C.jsxs)(l.default, {
                      style: B.row2,
                      children: [
                        (0, C.jsxs)(l.default, {
                          style: B.half,
                          children: [
                            (0, C.jsx)(r.default, {
                              style: B.label,
                              children: v('carpool.seatsLabel'),
                            }),
                            (0, C.jsx)(s.default, {
                              style: B.input,
                              value: me,
                              onChangeText: he,
                              keyboardType: 'number-pad',
                              placeholderTextColor: n.textMuted,
                            }),
                          ],
                        }),
                        (0, C.jsxs)(l.default, {
                          style: B.half,
                          children: [
                            (0, C.jsx)(r.default, {
                              style: B.label,
                              children: v('carpool.priceLabel'),
                            }),
                            (0, C.jsx)(s.default, {
                              style: B.input,
                              value: xe,
                              onChangeText: ye,
                              keyboardType: 'decimal-pad',
                              placeholderTextColor: n.textMuted,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, C.jsx)(r.default, { style: B.label, children: v('carpool.noteLabel') }),
                    (0, C.jsx)(s.default, {
                      style: B.input,
                      value: be,
                      onChangeText: je,
                      placeholder: v('carpool.notePlaceholder'),
                      placeholderTextColor: n.textMuted,
                    }),
                    (0, C.jsx)(y.default, {
                      title: v('carpool.publishOffer'),
                      onPress: async () => {
                        if (!F?.id)
                          return void R({
                            type: 'error',
                            title: v('carpool.signInTitle'),
                            message: v('carpool.signInMessage'),
                          });
                        if (!ie.trim() || !ce.trim())
                          return void R({
                            type: 'error',
                            title: v('carpool.missingRouteTitle'),
                            message: v('carpool.missingRouteMessage'),
                          });
                        const t = Math.max(1, Math.min(6, Number(me) || 1)),
                          o = Math.max(0, Number(xe) || 0),
                          l = M(ue || k(), ge);
                        se(!0);
                        const r = await (0, _r(d[26]).createCarpoolRide)({
                          driverId: F.id,
                          origin: ie,
                          destination: ce,
                          departureTime: l,
                          totalSeats: t,
                          pricePerSeat: o,
                          vehicleNote: be.trim() || null,
                        });
                        (se(!1),
                          r.error
                            ? R({
                                type: 'error',
                                title: v('carpool.offerFailedTitle'),
                                message: (0, _r(d[27]).errorMessage)(r.error),
                              })
                            : (R({
                                type: 'success',
                                title: v('carpool.offerSuccessTitle'),
                                message: r.localOnly
                                  ? v('carpool.offerSuccessLocal')
                                  : v('carpool.offerSuccessMessage'),
                              }),
                              je(''),
                              Ce(),
                              E('bookings')));
                      },
                      loading: re,
                    }),
                  ],
                })
              : null,
            (0, C.jsx)(c.default, {
              visible: !!Z,
              animationType: 'slide',
              transparent: !0,
              onRequestClose: () => ee(null),
              children: (0, C.jsx)(l.default, {
                style: B.modalBackdrop,
                children: (0, C.jsxs)(l.default, {
                  style: B.modalSheet,
                  children: [
                    (0, C.jsxs)(l.default, {
                      style: B.modalHeader,
                      children: [
                        (0, C.jsx)(r.default, {
                          style: B.modalTitle,
                          children: v('carpool.bookModalTitle'),
                        }),
                        (0, C.jsx)(u.default, {
                          onPress: () => ee(null),
                          hitSlop: 12,
                          children: (0, C.jsx)(_r(d[32]).Ionicons, {
                            name: 'close',
                            size: 24,
                            color: n.textSecondary,
                          }),
                        }),
                      ],
                    }),
                    Z
                      ? (0, C.jsxs)(C.Fragment, {
                          children: [
                            (0, C.jsx)(r.default, { style: B.modalRoute, children: Z.routeLabel }),
                            (0, C.jsxs)(r.default, {
                              style: B.modalMeta,
                              children: [
                                'GH\u20b5 ',
                                Number(Z.pricePerSeat).toFixed(2),
                                ' \xb7 ',
                                Z.availableSeats,
                                ' ',
                                'seats left',
                              ],
                            }),
                            (0, C.jsx)(r.default, {
                              style: B.label,
                              children: v('carpool.seatsBookLabel'),
                            }),
                            (0, C.jsx)(l.default, {
                              style: B.seatRow,
                              children: ['1', '2', '3'].map(t =>
                                (0, C.jsx)(
                                  u.default,
                                  {
                                    style: [B.seatChip, te === t && B.seatChipActive],
                                    onPress: () => oe(t),
                                    children: (0, C.jsx)(r.default, {
                                      style: [B.seatChipText, te === t && B.seatChipTextActive],
                                      children: t,
                                    }),
                                  },
                                  t
                                )
                              ),
                            }),
                            (0, C.jsx)(r.default, {
                              style: B.label,
                              children: v('carpool.pickupLabel'),
                            }),
                            (0, C.jsx)(s.default, {
                              style: B.input,
                              value: le,
                              onChangeText: ae,
                              placeholder: Z.origin,
                              placeholderTextColor: n.textMuted,
                            }),
                            (0, C.jsx)(y.default, {
                              title: v('carpool.confirmBook'),
                              onPress: async () => {
                                if (!F?.id || !Z)
                                  return void R({
                                    type: 'error',
                                    title: v('carpool.signInTitle'),
                                    message: v('carpool.signInMessage'),
                                  });
                                const t = Math.max(1, Math.min(4, Number(te) || 1));
                                se(!0);
                                const o = await (0, _r(d[26]).bookCarpoolSeat)(
                                  Z.id,
                                  F.id,
                                  t,
                                  le.trim()
                                );
                                if ((se(!1), o.error)) {
                                  const t = (0, _r(d[27]).errorMessage)(o.error);
                                  return void R({
                                    type: 'error',
                                    title: v('carpool.bookFailedTitle'),
                                    message: t.includes('already_booked')
                                      ? v('carpool.alreadyBooked')
                                      : v('carpool.bookFailedMessage'),
                                  });
                                }
                                (R({
                                  type: 'success',
                                  title: v('carpool.bookSuccessTitle'),
                                  message: o.localOnly
                                    ? v('carpool.bookSuccessLocal')
                                    : v('carpool.bookSuccessMessage'),
                                }),
                                  ee(null),
                                  Se(),
                                  Ce(),
                                  E('bookings'));
                              },
                              loading: re,
                            }),
                          ],
                        })
                      : null,
                  ],
                }),
              }),
            }),
          ],
        });
      }));
    var o = _r(d[1]),
      l = t(_r(d[2])),
      r = t(_r(d[3])),
      s = t(_r(d[4])),
      n = t(_r(d[5])),
      c = t(_r(d[6])),
      u = t(_r(d[7])),
      p = t(_r(d[8])),
      f = t(_r(d[9])),
      h = t(_r(d[10])),
      x = t(_r(d[11])),
      y = t(_r(d[12])),
      b = t(_r(d[13])),
      j = t(_r(d[14])),
      T = t(_r(d[15])),
      S = t(_r(d[16])),
      C = _r(d[17]);
    function k() {
      return new Date().toISOString().slice(0, 10);
    }
    function M(t, o = '08:00') {
      return new Date(`${t}T${o}:00`).toISOString();
    }
    const L = (t, o = !1) =>
      n.default.create({
        lead: Object.assign({}, _r(d[28]).typography.body, {
          fontSize: o ? 14 : _r(d[28]).typography.body.fontSize,
          color: t.textSecondary,
          marginBottom: _r(d[28]).spacing.md,
        }),
        quickScroll: { marginBottom: _r(d[28]).spacing.md, maxHeight: 100 },
        label: {
          fontFamily: _r(d[28]).fontFamily.medium,
          color: t.textSecondary,
          marginBottom: _r(d[28]).spacing.xs,
          marginTop: _r(d[28]).spacing.sm,
        },
        input: {
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: _r(d[28]).radius.md,
          paddingHorizontal: _r(d[28]).spacing.md,
          paddingVertical: _r(d[28]).spacing.sm,
          color: t.textPrimary,
          fontFamily: _r(d[28]).fontFamily.regular,
          backgroundColor: t.surface,
        },
        sectionTitle: {
          fontFamily: _r(d[28]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: _r(d[28]).spacing.sm,
        },
        emptyHint: Object.assign({}, _r(d[28]).typography.caption, {
          color: t.textMuted,
          marginBottom: _r(d[28]).spacing.md,
        }),
        row2: { flexDirection: 'row', gap: _r(d[28]).spacing.sm },
        half: { flex: 1 },
        modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
        modalSheet: {
          backgroundColor: t.background,
          borderTopLeftRadius: _r(d[28]).radius.xl,
          borderTopRightRadius: _r(d[28]).radius.xl,
          padding: _r(d[28]).spacing.lg,
        },
        modalHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: _r(d[28]).spacing.md,
        },
        modalTitle: Object.assign({}, _r(d[28]).typography.title, { color: t.textPrimary }),
        modalRoute: {
          fontFamily: _r(d[28]).fontFamily.semibold,
          fontSize: 16,
          color: t.textPrimary,
        },
        modalMeta: Object.assign({}, _r(d[28]).typography.caption, {
          color: t.textSecondary,
          marginBottom: _r(d[28]).spacing.md,
        }),
        seatRow: {
          flexDirection: 'row',
          gap: _r(d[28]).spacing.sm,
          marginBottom: _r(d[28]).spacing.sm,
        },
        seatChip: {
          width: 44,
          height: 44,
          borderRadius: _r(d[28]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          alignItems: 'center',
          justifyContent: 'center',
        },
        seatChipActive: { borderColor: t.accent, backgroundColor: t.accentMuted ?? t.surface },
        seatChipText: { fontFamily: _r(d[28]).fontFamily.semibold, color: t.textPrimary },
        seatChipTextActive: { color: t.accent },
      });
  },
  1441,
  [
    1, 5, 19, 161, 255, 26, 948, 326, 106, 105, 1510, 1535, 672, 1534, 1620, 1623, 1759, 183, 382,
    381, 1381, 501, 1614, 1386, 1671, 1624, 1649, 557, 377, 1617, 1537, 1536, 578,
  ]
);
__d(
  function (g, r, i, a, m, e, _d) {
    var t = r(_d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = r(_d[1]),
      l = t(r(_d[2])),
      n = t(r(_d[3])),
      s = t(r(_d[4])),
      d = t(r(_d[5])),
      c = t(r(_d[6])),
      u = t(r(_d[7])),
      f = t(r(_d[8])),
      p = r(_d[9]);
    function x(t) {
      if (!t) return '\u2014';
      return new Date(t).toLocaleString(void 0, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    e.default = (0, o.memo)(function ({
      ride: t,
      onBook: s,
      mode: h = 'search',
      onCancel: j,
      loading: b = !1,
      cancelLabel: v = 'Cancel booking',
      bookLabel: S = 'Book seat',
    }) {
      const { colors: w } = (0, r(_d[10]).useTheme)(),
        k = (0, o.useMemo)(() => y(w), [w]),
        P = t.availableSeats ?? 0,
        F = P <= 0 && 'search' === h,
        B = 'booking' === h,
        T = 'offer' === h;
      return (0, p.jsxs)(d.default, {
        elevated: !0,
        style: k.card,
        children: [
          (0, p.jsxs)(l.default, {
            style: k.header,
            children: [
              (0, p.jsxs)(l.default, {
                style: k.routeBlock,
                children: [
                  (0, p.jsx)(n.default, { style: k.route, children: t.routeLabel }),
                  (0, p.jsx)(n.default, { style: k.time, children: x(t.departureTime) }),
                ],
              }),
              (0, p.jsx)(u.default, { score: t.trustScore, compact: !0 }),
            ],
          }),
          (0, p.jsxs)(l.default, {
            style: k.metaRow,
            children: [
              (0, p.jsxs)(l.default, {
                style: k.pill,
                children: [
                  (0, p.jsx)(r(_d[11]).Ionicons, {
                    name: 'person-outline',
                    size: 14,
                    color: w.textSecondary,
                  }),
                  (0, p.jsx)(n.default, { style: k.pillText, children: t.driverName }),
                ],
              }),
              t.vehicleRegistration
                ? (0, p.jsx)(l.default, {
                    style: k.pill,
                    children: (0, p.jsx)(n.default, {
                      style: k.pillText,
                      children: t.vehicleRegistration,
                    }),
                  })
                : null,
              (0, p.jsx)(l.default, {
                style: [k.seatPill, P <= 1 && !B && k.seatLow],
                children: (0, p.jsx)(n.default, {
                  style: k.seatText,
                  children: B
                    ? `${t.seatsBooked ?? 1} seat(s) booked`
                    : T
                      ? `${P}/${t.totalSeats ?? P} open`
                      : `${P} left`,
                }),
              }),
            ],
          }),
          t.vehicleNote ? (0, p.jsx)(n.default, { style: k.note, children: t.vehicleNote }) : null,
          (0, p.jsxs)(l.default, {
            style: k.footer,
            children: [
              (0, p.jsxs)(l.default, {
                children: [
                  (0, p.jsxs)(n.default, {
                    style: k.price,
                    children: ['GH\u20b5 ', Number(t.pricePerSeat ?? 0).toFixed(2)],
                  }),
                  (0, p.jsx)(n.default, { style: k.perSeat, children: 'per seat' }),
                ],
              }),
              B && t.driverPhone
                ? (0, p.jsx)(f.default, {
                    phone: t.driverPhone,
                    operatorName: t.driverName,
                    compact: !0,
                  })
                : null,
              'search' === h && s
                ? (0, p.jsx)(c.default, {
                    title: F ? 'Full' : S,
                    onPress: () => s(t),
                    disabled: F || b,
                    compact: !0,
                  })
                : null,
              (B || T) && j
                ? (0, p.jsx)(c.default, {
                    title: v,
                    variant: 'secondary',
                    onPress: j,
                    loading: b,
                    compact: !0,
                  })
                : null,
            ],
          }),
        ],
      });
    });
    const y = t =>
      s.default.create({
        card: { marginBottom: r(_d[12]).spacing.md, width: '100%' },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: r(_d[12]).spacing.sm,
        },
        routeBlock: { flex: 1, paddingRight: r(_d[12]).spacing.sm },
        route: { fontFamily: r(_d[12]).fontFamily.bold, fontSize: 17, color: t.textPrimary },
        time: Object.assign({}, r(_d[12]).typography.caption, {
          color: t.textSecondary,
          marginTop: 2,
        }),
        metaRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(_d[12]).spacing.sm,
          marginBottom: r(_d[12]).spacing.sm,
        },
        pill: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          backgroundColor: t.surfaceSoft,
          borderRadius: r(_d[12]).radius.pill,
          paddingHorizontal: r(_d[12]).spacing.sm,
          paddingVertical: 4,
        },
        pillText: { fontFamily: r(_d[12]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        seatPill: {
          backgroundColor: t.seatsAvailable ?? t.successMuted,
          borderRadius: r(_d[12]).radius.pill,
          paddingHorizontal: r(_d[12]).spacing.sm,
          paddingVertical: 4,
        },
        seatLow: { backgroundColor: t.seatsAlmostFull ?? t.warningMuted },
        seatText: {
          fontFamily: r(_d[12]).fontFamily.semibold,
          fontSize: 12,
          color: t.onPrimary ?? t.textPrimary,
        },
        note: Object.assign({}, r(_d[12]).typography.caption, {
          color: t.textMuted,
          marginBottom: r(_d[12]).spacing.sm,
        }),
        footer: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: r(_d[12]).spacing.sm,
          gap: r(_d[12]).spacing.sm,
        },
        price: { fontFamily: r(_d[12]).fontFamily.bold, fontSize: 20, color: t.textPrimary },
        perSeat: { fontSize: 11, color: t.textMuted },
      });
  },
  1759,
  [1, 5, 19, 161, 26, 684, 672, 1486, 1520, 183, 381, 578, 377]
);
