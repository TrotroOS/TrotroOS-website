__d(
  function (g, _r, _i, _a, _m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function () {
        const e = (0, _r(d[29]).useNavigation)(),
          l = (0, _r(d[29]).useRoute)(),
          b = (0, _r(d[30]).useSafeAreaInsets)(),
          {
            activeTrip: j,
            mateLocation: R,
            boardPassenger: F,
            undoBoardPassenger: W,
            boardReservation: H,
            acceptReservation: D,
            declineReservation: N,
            cancelReservation: M,
            acceptWaitingPassenger: L,
            declineWaitingPassenger: O,
            invitePassenger: q,
            inviteAllWaitingPassengers: _,
            withdrawPassengerRequest: V,
            endTrip: $,
            refreshDemand: G,
          } = (0, _r(d[31]).useMateTrip)(),
          { profile: U } = (0, _r(d[32]).useAuth)(),
          { colors: Y } = (0, _r(d[24]).useTheme)(),
          { compact: Q } = (0, _r(d[33]).useCompactLayout)(),
          K = (0, t.useMemo)(() => E(Y, Q), [Y, Q]),
          [X, J] = (0, t.useState)('passengers'),
          [Z, ee] = (0, t.useState)(0),
          [te, ie] = (0, t.useState)(!1),
          [ae, re] = (0, t.useState)(''),
          [ne, oe] = (0, t.useState)(!1),
          [se, le] = (0, t.useState)(null),
          [de, ce] = (0, t.useState)(null),
          [ue, ge] = (0, t.useState)(!1),
          [me, fe] = (0, t.useState)(null),
          [pe, ye] = (0, t.useState)(!1),
          [xe, he] = (0, t.useState)(!1),
          [be, Se] = (0, t.useState)('pending'),
          [ve, we] = (0, t.useState)(!1),
          [Te, Ce] = (0, t.useState)(!1),
          [je, Be] = (0, t.useState)(!1),
          [Pe, ke] = (0, t.useState)(!1),
          Re = (0, t.useRef)(new i.default.Value(-80)).current,
          Fe = (0, t.useRef)(new i.default.Value(0)).current,
          Ae = (0, t.useRef)(null),
          ze = (0, t.useRef)(new i.default.Value(1)).current,
          Ie = (0, t.useRef)(0),
          Ee = (0, t.useRef)(null),
          We = (0, t.useRef)(new Set()),
          { showToast: He } = (0, _r(d[34]).useToast)(),
          De = (0, t.useCallback)(() => {
            (ce(null),
              ie(!1),
              oe(!1),
              le(null),
              fe(null),
              we(!1),
              ke(!1),
              Re.setValue(-80),
              Fe.setValue(0),
              Ae.current && (clearTimeout(Ae.current), (Ae.current = null)));
          }, [Re, Fe]);
        ((0, t.useEffect)(() => {
          const e = j?.dbId ?? j?.id ?? null;
          e !== Ee.current &&
            ((Ie.current = 0), (We.current = new Set()), (Ee.current = e), e || De());
        }, [j?.dbId, j?.id, De]),
          (0, t.useEffect)(() => {
            l.params?.justDeparted && (we(!0), e.setParams({ justDeparted: void 0 }));
          }, [l.params?.justDeparted, e]),
          (0, t.useEffect)(() => {
            if (!(
              j?.waitingPassengers?.some(e => 'invited' === e.status) ||
              j?.reservations?.some(e => e.expiresAt)
            ))
              return;
            const e = setInterval(() => ee(e => e + 1), 1e3);
            return () => clearInterval(e);
          }, [j?.waitingPassengers, j?.reservations]),
          (0, _r(d[29]).useFocusEffect)(
            (0, t.useCallback)(() => {
              je || G();
            }, [G, je])
          ),
          (0, t.useEffect)(() => {
            if (!j || je) return;
            const e = j.reservations.filter(P),
              t = e.length;
            if (t > Ie.current) {
              const a = e[e.length - 1];
              if (a?.id && !We.current.has(a.id)) {
                (We.current.add(a.id),
                  re(a?.passengerName ?? 'Passenger'),
                  ce(a ?? null),
                  ie(!0),
                  i.default.spring(Re, { toValue: 0, useNativeDriver: !0 }).start());
                const e = setTimeout(() => {
                  i.default
                    .timing(Re, { toValue: -80, duration: 300, useNativeDriver: !0 })
                    .start(() => {
                      ie(!1);
                    });
                }, 3e3);
                return ((Ie.current = t), () => clearTimeout(e));
              }
            }
            Ie.current = t;
          }, [j?.reservations, Re, je]));
        const Ne = (0, t.useCallback)(() => {
            e.setParams({ justDeparted: void 0 });
          }, [e]),
          Me = (0, t.useMemo)(() => (j ? C(j.startedAt) : '00:00:00'), [j, Z]),
          Le = (0, t.useCallback)(
            async e => {
              const { error: t } = await L(e);
              He(
                t
                  ? { type: 'error', title: 'Could not accept', message: t.message ?? 'Try again.' }
                  : {
                      type: 'success',
                      title: 'Passenger accepted',
                      message: 'Added to your confirmed list.',
                    }
              );
            },
            [L, He]
          ),
          Oe = (0, t.useCallback)(
            async e => {
              (await O(e),
                He({
                  type: 'info',
                  title: 'Request dismissed',
                  message: 'Removed from your waiting list.',
                }));
            },
            [O, He]
          ),
          qe = (0, t.useCallback)(
            async e => {
              const { error: t } = await V(e);
              He(
                t
                  ? {
                      type: 'error',
                      title: 'Could not withdraw',
                      message: t.message ?? 'Try again.',
                    }
                  : {
                      type: 'info',
                      title: 'Request withdrawn',
                      message: 'You can send a new request anytime.',
                    }
              );
            },
            [V, He]
          ),
          Ve = (0, t.useCallback)(e => {
            fe(e);
          }, []),
          $e = (0, t.useCallback)(() => {
            (ze.setValue(0),
              i.default.timing(ze, { toValue: 1, duration: 240, useNativeDriver: !0 }).start());
          }, [ze]),
          Ge = (0, t.useCallback)(
            e => {
              e !== be && (Se(e), $e());
            },
            [be, $e]
          ),
          Ue = (0, t.useCallback)(
            async e => {
              ge(!0);
              const { error: t } = await D(e);
              (ge(!1),
                t
                  ? He({
                      type: 'error',
                      title: 'Could not accept',
                      message: t.message ?? 'Try again.',
                    })
                  : (ce(t => (t?.id === e ? null : t)),
                    Se('accepted'),
                    $e(),
                    He({
                      type: 'success',
                      title: 'Seat accepted',
                      message: 'Passenger gets a pickup verification code in My Trips.',
                    })));
            },
            [D, He, $e]
          ),
          Ye = (0, t.useCallback)(
            async e => {
              ge(!0);
              const { error: t } = await N(e);
              (ge(!1),
                t
                  ? He({
                      type: 'error',
                      title: 'Could not decline',
                      message: t.message ?? 'Try again.',
                    })
                  : (ce(t => (t?.id === e ? null : t)),
                    He({
                      type: 'info',
                      title: 'Request declined',
                      message: 'Seat released for other passengers.',
                    })));
            },
            [N, He]
          ),
          Qe = (0, t.useCallback)(
            e => {
              (s.default.vibrate(20), H(e));
            },
            [H]
          ),
          Ke = (0, t.useCallback)(e => {
            le(e);
          }, []),
          Xe = (0, t.useCallback)(
            ({ item: e }) =>
              (0, T.jsx)(I, {
                reservation: e,
                onAccept: Ue,
                onDecline: Ye,
                onBoard: Qe,
                onNoShow: Ke,
                compact: Q,
              }),
            [Ue, Ye, Qe, Ke, Q]
          ),
          Je = (0, t.useCallback)(e => e.id, []),
          Ze = (0, t.useCallback)(
            ({ item: e }) =>
              (0, T.jsx)(z, {
                passenger: e,
                onSendRequest: Ve,
                onAccept: Le,
                onDecline: Oe,
                onWithdraw: qe,
                compact: Q,
              }),
            [Ve, Le, Oe, qe, Q]
          ),
          et = (0, t.useCallback)(e => e.id, []),
          tt = (0, t.useMemo)(
            () =>
              (0, T.jsx)(r.default, {
                style: K.emptyPanel,
                children: 'No passengers waiting on your route right now.',
              }),
            []
          ),
          it = (0, t.useMemo)(
            () => ({
              rideId: j?.dbId ?? j?.id,
              tripId: j?.dbId ?? j?.id,
              driverId: U?.id,
              route: j?.route,
              driverName: U?.full_name ?? 'Mate',
              vehicleModel: j?.vehicleType,
              plateNumber: U?.vehicle_plate ?? U?.plate_number,
              latitude: R?.latitude ?? null,
              longitude: R?.longitude ?? null,
              trackShareToken: j?.trackShareToken ?? null,
              isLive: null != R?.latitude,
            }),
            [j, U, R]
          );
        (0, t.useEffect)(
          () => () => {
            Ae.current && clearTimeout(Ae.current);
          },
          []
        );
        const at = (0, t.useCallback)(() => {
            (Ae.current && clearTimeout(Ae.current),
              ke(!0),
              Fe.setValue(0),
              i.default.timing(Fe, { toValue: 1, duration: 180, useNativeDriver: !0 }).start(),
              (Ae.current = setTimeout(() => {
                i.default
                  .timing(Fe, { toValue: 0, duration: 280, useNativeDriver: !0 })
                  .start(({ finished: e }) => {
                    e && ke(!1);
                  });
              }, 2e3)));
          }, [Fe]),
          rt = (0, t.useMemo)(
            () => j?.reservations?.filter(e => 'boarded' !== e.status) ?? [],
            [j?.reservations]
          ),
          nt = (0, t.useMemo)(
            () => j?.reservations?.filter(e => 'boarded' === e.status) ?? [],
            [j?.reservations]
          ),
          ot = (0, t.useMemo)(() => rt.filter(P), [rt]),
          st = (0, t.useMemo)(() => rt.filter(k), [rt]),
          lt = (0, t.useMemo)(() => ('accepted' === be ? st : ot), [be, st, ot]),
          dt = (0, t.useMemo)(
            () =>
              [...(j?.waitingPassengers ?? [])].sort((e, t) => {
                const i = Number(e.trustScore ?? 0),
                  a = Number(t.trustScore ?? 0);
                if (a !== i) return a - i;
                return ('waiting' === e.status ? 0 : 1) - ('waiting' === t.status ? 0 : 1);
              }),
            [j?.waitingPassengers]
          ),
          ct = (0, t.useMemo)(
            () => (j ? (0, _r(d[35]).computeActiveTripMetrics)(j, j.reservations) : null),
            [j]
          ),
          {
            boardedCount: ut,
            seatsLeftForBooking: gt,
            seatsLeftPill: mt,
            earnedSoFar: ft,
            fullPotential: pt,
            fillPercent: yt,
            boardingClosed: xt,
          } = ct ?? {
            boardedCount: 0,
            seatsLeftForBooking: 0,
            seatsLeftPill: 0,
            earnedSoFar: 0,
            fullPotential: 0,
            fillPercent: 0,
            boardingClosed: !1,
          };
        if (!j)
          return (0, T.jsx)(f.default, {
            icon: 'bus-outline',
            title: 'No active trip',
            message:
              'Start a trip from the Dashboard to broadcast your route and accept passengers.',
            actionLabel: 'Start new trip',
            onAction: () => e.navigate(_r(d[36]).ROUTES.MATE_DASHBOARD),
          });
        const ht = _r(d[37]).ROUTE_COORDINATES[j.route] ?? _r(d[37]).ROUTE_COORDINATES.default,
          bt = R ?? ht[0],
          St = ht[ht.length - 1] ?? bt,
          vt = [
            { value: 'pending', label: Q ? `Pending ${ot.length}` : `Pending (${ot.length})` },
            { value: 'accepted', label: Q ? `Accepted ${st.length}` : `Accepted (${st.length})` },
          ],
          wt =
            'accepted' === be
              ? Q
                ? `Accepted (${st.length})`
                : `Accepted reserved seats (${st.length})`
              : Q
                ? `Requests (${ot.length})`
                : `Passenger requests (${ot.length})`,
          Tt =
            'accepted' === be
              ? (0, T.jsx)(r.default, {
                  style: K.emptyPanel,
                  children:
                    'No accepted reserved seats yet. Accept passenger requests to confirm pickups.',
                })
              : (0, T.jsx)(r.default, {
                  style: K.emptyPanel,
                  children: 'No pending requests. Passengers who reserve a seat will appear here.',
                }),
          Ct = j.waitingPassengers.filter(e => 'waiting' === e.status).length;
        return (0, T.jsxs)(n.default, {
          style: [K.container, { backgroundColor: Y.background }],
          testID: 'mate-active-trip',
          children: [
            (0, T.jsxs)(o.default, {
              style: [K.backBar, { paddingTop: b.top + _r(d[39]).spacing.sm }],
              onPress: () => e.navigate(_r(d[36]).ROUTES.MATE_DASHBOARD),
              hitSlop: 8,
              children: [
                (0, T.jsx)(_r(d[27]).Ionicons, {
                  name: 'arrow-back',
                  size: 20,
                  color: Y.primaryLight,
                }),
                (0, T.jsx)(r.default, { style: K.backBarText, children: 'Back to Dashboard' }),
              ],
            }),
            Pe
              ? (0, T.jsxs)(i.default.View, {
                  pointerEvents: 'none',
                  style: [
                    K.onboardOverlay,
                    {
                      opacity: Fe,
                      transform: [
                        { scale: Fe.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) },
                      ],
                    },
                  ],
                  children: [
                    (0, T.jsx)(r.default, {
                      style: K.onboardOverlayTitle,
                      children: '+1 PASSENGER ONBOARDED',
                    }),
                    (0, T.jsxs)(r.default, {
                      style: K.onboardOverlayText,
                      children: [ut, ' aboard \xb7 GHS ', ft.toFixed(2), ' earned'],
                    }),
                  ],
                })
              : null,
            te
              ? (0, T.jsxs)(i.default.View, {
                  style: [K.newBanner, { transform: [{ translateY: Re }] }],
                  children: [
                    (0, T.jsx)(r.default, {
                      style: K.newBannerTitle,
                      children: 'NEW PASSENGER REQUEST',
                    }),
                    (0, T.jsxs)(r.default, {
                      style: K.newBannerText,
                      children: [ae, ' booked a seat'],
                    }),
                  ],
                })
              : null,
            (0, T.jsxs)(n.default, {
              style: [
                K.topSection,
                { backgroundColor: Y.surfaceElevated, borderBottomColor: Y.border },
              ],
              children: [
                (0, T.jsxs)(n.default, {
                  style: K.liveBroadcastRow,
                  children: [
                    (0, T.jsxs)(n.default, {
                      style: K.liveBroadcastPill,
                      children: [
                        (0, T.jsx)(n.default, { style: K.liveBroadcastDot }),
                        (0, T.jsx)(r.default, {
                          style: K.liveBroadcastText,
                          children: 'Broadcasting live',
                        }),
                      ],
                    }),
                    (0, T.jsxs)(n.default, {
                      style: K.liveBroadcastRight,
                      children: [
                        (0, T.jsx)(r.default, {
                          style: K.vehicleType,
                          numberOfLines: 1,
                          children: j.vehicleType ?? 'Trotro',
                        }),
                        (0, T.jsx)(v.TripGuardianShield, {
                          onPress: () => Ce(!0),
                          size: Q ? 32 : 36,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, T.jsx)(r.default, { style: K.route, numberOfLines: 2, children: j.route }),
                (0, T.jsx)(n.default, {
                  style: K.fillTrack,
                  children: (0, T.jsx)(n.default, { style: [K.fillBar, { width: `${yt}%` }] }),
                }),
                (0, T.jsxs)(r.default, {
                  style: K.fillLabel,
                  numberOfLines: 2,
                  children: [ut, ' boarded \xb7 ', gt, ' of ', j.totalSeats, ' seats left'],
                }),
                (0, T.jsxs)(n.default, {
                  style: K.topMetaRow,
                  children: [
                    (0, T.jsx)(n.default, {
                      style: [K.seatBadgeLarge, B(mt, K)],
                      children: (0, T.jsxs)(r.default, {
                        style: K.seatBadgeLargeText,
                        children: [mt, ' left'],
                      }),
                    }),
                    (0, T.jsxs)(r.default, {
                      style: K.fare,
                      children: ['GHS ', j.farePerSeat.toFixed(2), '/seat'],
                    }),
                  ],
                }),
                (0, T.jsxs)(n.default, {
                  style: K.topMetaRow,
                  children: [
                    (0, T.jsx)(r.default, { style: K.timer, children: Me }),
                    (0, T.jsxs)(r.default, {
                      style: K.reservedCount,
                      numberOfLines: 2,
                      children: [rt.length, ' reserved \xb7 ', Ct, ' in queue'],
                    }),
                  ],
                }),
                (0, T.jsxs)(n.default, {
                  style: K.topMetaRow,
                  children: [
                    (0, T.jsxs)(r.default, {
                      style: K.earnings,
                      children: ['GHS ', ft.toFixed(2), ' earned'],
                    }),
                    pt > 0
                      ? (0, T.jsxs)(r.default, {
                          style: K.potentialText,
                          children: ['+GHS ', pt.toFixed(2), ' if full'],
                        })
                      : null,
                  ],
                }),
                xt
                  ? (0, T.jsx)(r.default, {
                      style: K.boardingClosedLabel,
                      children: 'Boarding closed \u2014 tap TRIP FULL to close trip',
                    })
                  : null,
              ],
            }),
            (0, T.jsx)(S.default, {
              visible: ve,
              waitingCount: Ct,
              onInviteWaiting: async () => {
                if ((we(!1), Ct <= 0))
                  return void He({
                    type: 'info',
                    title: 'No queue passengers',
                    message: 'Waiting passengers will appear here when they join the route queue.',
                  });
                he(!0);
                const { data: e, error: t } = await _('');
                (he(!1),
                  He(
                    !t || e?.invited
                      ? {
                          type: 'success',
                          title: 'Invites sent',
                          message: `Sent ride requests to ${e?.invited ?? 0} passenger${1 === e?.invited ? '' : 's'}.`,
                        }
                      : {
                          type: 'error',
                          title: 'Could not invite passengers',
                          message: t.message ?? 'Try again.',
                        }
                  ));
              },
              inviteLoading: xe,
              onDismiss: () => we(!1),
            }),
            (0, T.jsx)(n.default, {
              style: K.toggleRow,
              children: (0, T.jsx)(m.default, {
                options: [
                  { value: 'passengers', label: 'Passengers' },
                  { value: 'map', label: 'Map' },
                ],
                value: X,
                onChange: J,
                compact: Q,
              }),
            }),
            (0, T.jsx)(n.default, {
              style: K.middleSection,
              children:
                'passengers' === X
                  ? (0, T.jsxs)(n.default, {
                      style: K.passengersPanel,
                      children: [
                        (0, T.jsxs)(n.default, {
                          style: K.reservationsSection,
                          children: [
                            (0, T.jsx)(r.default, {
                              style: K.reservationsSectionTitle,
                              children: wt,
                            }),
                            (0, T.jsx)(n.default, {
                              style: K.reservationFilterRow,
                              children: (0, T.jsx)(m.default, {
                                options: vt,
                                value: be,
                                onChange: Ge,
                                compact: Q,
                              }),
                            }),
                            !j?.localOnly && j?.dbId
                              ? (0, T.jsx)(y.default, {
                                  tripId: j.dbId,
                                  tripKind: j.tripKind ?? 'trip',
                                  onAccepted: () => G(),
                                })
                              : null,
                            (0, T.jsx)(i.default.View, {
                              style: [
                                K.reservationsListWrap,
                                {
                                  opacity: ze,
                                  transform: [
                                    {
                                      translateY: ze.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [6, 0],
                                      }),
                                    },
                                  ],
                                },
                              ],
                              children: (0, T.jsx)(
                                _r(d[40]).FlashList,
                                Object.assign(
                                  {
                                    data: lt,
                                    keyExtractor: Je,
                                    renderItem: Xe,
                                    style: K.reservationsScroll,
                                    contentContainerStyle: K.reservationsScrollContent,
                                    ListEmptyComponent: Tt,
                                    estimatedItemSize: _r(d[41]).PASSENGER_ROW_ESTIMATED_HEIGHT,
                                  },
                                  _r(d[41]).FLASH_LIST_DEFAULTS,
                                  A
                                ),
                                be
                              ),
                            }),
                          ],
                        }),
                        nt.length > 0
                          ? (0, T.jsxs)(n.default, {
                              style: K.boardedSection,
                              children: [
                                (0, T.jsxs)(r.default, {
                                  style: K.boardedSectionTitle,
                                  children: ['Onboard (', nt.length, ')'],
                                }),
                                nt.map(e =>
                                  (0, T.jsxs)(
                                    n.default,
                                    {
                                      style: K.boardedCard,
                                      children: [
                                        (0, T.jsx)(r.default, {
                                          style: K.boardedName,
                                          children: e.passengerName,
                                        }),
                                        (0, T.jsx)(r.default, {
                                          style: K.boardedPickup,
                                          children: e.pickup,
                                        }),
                                      ],
                                    },
                                    e.id
                                  )
                                ),
                              ],
                            })
                          : null,
                        (0, T.jsxs)(n.default, {
                          style: K.onboardControls,
                          children: [
                            (0, T.jsx)(o.default, {
                              style: [K.onboardButton, xt && K.onboardButtonDisabled],
                              onPress: async () => {
                                if (ct?.boardingClosed)
                                  return void He({
                                    type: 'info',
                                    title: 'Boarding closed',
                                    message: 'This trip is marked full.',
                                  });
                                if ((ct?.seatsLeftForBooking ?? 0) <= 0)
                                  return void He({
                                    type: 'error',
                                    title: 'Trip full',
                                    message: 'No seats remaining.',
                                  });
                                s.default.vibrate(20);
                                const { error: e } = await F();
                                e
                                  ? He({
                                      type: 'error',
                                      title: 'Could not board',
                                      message: e.message ?? 'Try again.',
                                    })
                                  : at();
                              },
                              disabled: xt,
                              children: (0, T.jsx)(r.default, {
                                style: K.onboardButtonText,
                                children: Q ? '+1 ONBOARDED' : '+1 PASSENGER ONBOARDED',
                              }),
                            }),
                            (0, T.jsxs)(n.default, {
                              style: K.undoRow,
                              children: [
                                (0, T.jsx)(o.default, {
                                  style: K.undoButton,
                                  onPress: async () => {
                                    const { error: e } = await W();
                                    e &&
                                      He({
                                        type: 'error',
                                        title: 'Could not undo',
                                        message: e.message ?? 'Try again.',
                                      });
                                  },
                                  disabled: ut <= 0,
                                  children: (0, T.jsx)(r.default, {
                                    style: K.undoText,
                                    children: '-1 Undo',
                                  }),
                                }),
                                (0, T.jsx)(o.default, {
                                  style: K.fullButton,
                                  onPress: async () => {
                                    if (!j || je) return;
                                    const t = j;
                                    (De(),
                                      Ne(),
                                      Be(!0),
                                      e.navigate(_r(d[36]).ROUTES.MATE_DASHBOARD));
                                    const i = await $(t);
                                    (Be(!1),
                                      i ||
                                        He({
                                          type: 'error',
                                          title: 'Could not close trip',
                                          message:
                                            'Database may need migration 021 (complete_mate_trip). Run remote-setup.sql in Supabase SQL Editor, then retry.',
                                        }));
                                  },
                                  disabled: je,
                                  children: (0, T.jsx)(r.default, {
                                    style: K.fullButtonText,
                                    children: 'TRIP FULL',
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, T.jsxs)(n.default, {
                          style: K.waitingSection,
                          children: [
                            (0, T.jsxs)(n.default, {
                              style: K.waitingSectionHeader,
                              children: [
                                (0, T.jsx)(r.default, {
                                  style: K.waitingSectionTitle,
                                  children: Q
                                    ? `Waiting (${j.waitingPassengers.length})`
                                    : `Nearby waiting passengers (${j.waitingPassengers.length})`,
                                }),
                                Ct > 0 && gt > 0 && !xt
                                  ? (0, T.jsx)(o.default, {
                                      style: K.inviteAllBtn,
                                      onPress: async () => {
                                        if (xt || gt <= 0) return;
                                        he(!0);
                                        const { data: e, error: t } = await _('');
                                        (he(!1),
                                          He(
                                            !t || e?.invited
                                              ? {
                                                  type: 'success',
                                                  title: 'Queue invites sent',
                                                  message: `${e?.invited ?? 0} of ${Math.min(Ct, gt)} waiting passengers invited.`,
                                                }
                                              : {
                                                  type: 'error',
                                                  title: 'Could not invite all',
                                                  message: t.message ?? 'Try again.',
                                                }
                                          ));
                                      },
                                      disabled: xe,
                                      children: (0, T.jsx)(r.default, {
                                        style: K.inviteAllBtnText,
                                        children: xe
                                          ? 'Sending\u2026'
                                          : `Invite all (${Math.min(Ct, gt)})`,
                                      }),
                                    })
                                  : null,
                              ],
                            }),
                            (0, T.jsx)(
                              _r(d[40]).FlashList,
                              Object.assign(
                                {
                                  data: dt,
                                  keyExtractor: et,
                                  renderItem: Ze,
                                  style: K.waitingScroll,
                                  contentContainerStyle: K.waitingScrollContent,
                                  ListEmptyComponent: tt,
                                  estimatedItemSize: _r(d[41]).PASSENGER_ROW_ESTIMATED_HEIGHT,
                                },
                                _r(d[41]).FLASH_LIST_DEFAULTS,
                                A
                              )
                            ),
                          ],
                        }),
                      ],
                    })
                  : (0, T.jsxs)(n.default, {
                      style: K.mapNavWrap,
                      children: [
                        (0, T.jsxs)(c.default, {
                          style: K.map,
                          initialRegion: _r(d[37]).KUMASI_MAP_REGION,
                          children: [
                            (0, T.jsx)(_r(d[42]).Polyline, {
                              coordinates: ht,
                              strokeColor: Y.primary,
                              strokeWidth: 4,
                            }),
                            (0, T.jsx)(w.default, { coordinate: bt, type: 'mate', title: 'You' }),
                            j.reservations.map(e =>
                              (0, T.jsx)(
                                w.default,
                                {
                                  coordinate: {
                                    latitude: e.latitude ?? bt.latitude,
                                    longitude: e.longitude ?? bt.longitude,
                                  },
                                  type: 'passenger',
                                  title: e.passengerName,
                                },
                                e.id
                              )
                            ),
                            j.waitingPassengers
                              .filter(e => 'waiting' === e.status)
                              .map(e =>
                                (0, T.jsx)(
                                  w.default,
                                  {
                                    coordinate: {
                                      latitude: e.latitude ?? bt.latitude,
                                      longitude: e.longitude ?? bt.longitude,
                                    },
                                    type: 'trotroride',
                                    title: 'Waiting passenger',
                                  },
                                  e.id
                                )
                              ),
                          ],
                        }),
                        (0, T.jsxs)(o.default, {
                          style: K.mapNavigateBtn,
                          onPress: () => {
                            const e = (0, _r(d[38]).getExternalNavigationUrl)(
                              St?.latitude,
                              St?.longitude
                            );
                            e && a.default.openURL(e);
                          },
                          children: [
                            (0, T.jsx)(_r(d[27]).Ionicons, {
                              name: 'navigate',
                              size: 16,
                              color: Y.onPrimary,
                            }),
                            (0, T.jsx)(r.default, {
                              style: K.mapNavigateText,
                              children: 'Navigate route',
                            }),
                          ],
                        }),
                      ],
                    }),
            }),
            (0, T.jsx)(n.default, {
              style: K.bottomSection,
              children: (0, T.jsx)(p.default, {
                title: je ? 'Ending trip\u2026' : 'End trip',
                variant: 'secondary',
                onPress: () => oe(!0),
                loading: je,
                disabled: je,
              }),
            }),
            (0, T.jsx)(x.default, {
              visible: Boolean(me),
              passenger: me,
              trip: j,
              mateProfile: U,
              loading: pe,
              onClose: () => fe(null),
              onSend: async e => {
                if (!me) return;
                const t = me.passengerName ?? 'passenger';
                ye(!0);
                const { error: i } = await q(me.id, e);
                (ye(!1),
                  i
                    ? He({
                        type: 'error',
                        title: 'Could not send request',
                        message: i.message ?? 'Try again.',
                      })
                    : (fe(null),
                      He({
                        type: 'success',
                        title: 'Ride request sent',
                        message: `Waiting up to ${_r(d[28]).MATE_INVITE_EXPIRY_MINUTES} min for ${t} to respond.`,
                      })));
              },
            }),
            (0, T.jsx)(h.default, {
              request: de,
              tripRoute: j.route,
              farePerSeat: j.farePerSeat,
              loading: ue,
              onAccept: () => de && Ue(de.id),
              onDecline: () => de && Ye(de.id),
            }),
            (0, T.jsx)(u.default, {
              visible: ne,
              title: 'End trip?',
              message: `You've earned GHS ${ft.toFixed(2)}. ${gt} seats remaining.`,
              confirmLabel: 'End Trip',
              destructive: !0,
              onConfirm: async () => {
                if (!j) return;
                const t = j;
                (oe(!1), De(), Ne(), Be(!0));
                const i = await $(t);
                (Be(!1),
                  i
                    ? (He({
                        type: 'success',
                        title: 'Trip completed',
                        message: `${i.route} \xb7 GHS ${Number(i.earnings ?? 0).toFixed(2)} collected \xb7 ${i.boarded ?? 0} boarded`,
                      }),
                      e.navigate(_r(d[36]).ROUTES.MATE_DASHBOARD))
                    : He({
                        type: 'error',
                        title: 'Could not end trip',
                        message:
                          'Database may need migration 021 (complete_mate_trip). Run remote-setup.sql in Supabase SQL Editor, then retry.',
                      }));
              },
              onCancel: () => oe(!1),
            }),
            (0, T.jsx)(u.default, {
              visible: Boolean(se),
              title: 'Mark no-show?',
              message: 'This frees the seat for other passengers.',
              confirmLabel: 'No-show',
              destructive: !0,
              onConfirm: () => {
                (se && M(se), le(null));
              },
              onCancel: () => le(null),
            }),
            (0, T.jsx)(v.default, { visible: Te, onClose: () => Ce(!1), role: 'driver', trip: it }),
          ],
        });
      }));
    var t = _r(d[1]),
      i = e(_r(d[2])),
      a = e(_r(d[3])),
      r = (e(_r(d[4])), e(_r(d[5]))),
      n = e(_r(d[6])),
      o = e(_r(d[7])),
      s = e(_r(d[8])),
      l = e(_r(d[9])),
      c = e(_r(d[10])),
      u = e(_r(d[11])),
      m = e(_r(d[12])),
      f = e(_r(d[13])),
      p = e(_r(d[14])),
      y = e(_r(d[15])),
      x = e(_r(d[16])),
      h = e(_r(d[17])),
      b = e(_r(d[18])),
      S = e(_r(d[19])),
      v = (function (e, t) {
        if ('function' == typeof WeakMap)
          var i = new WeakMap(),
            a = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var r,
            n,
            o = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return o;
          if ((r = t ? a : i)) {
            if (r.has(e)) return r.get(e);
            r.set(e, o);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((n = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (n.get || n.set)
                ? r(o, t, n)
                : (o[t] = e[t]));
          return o;
        })(e, t);
      })(_r(d[20])),
      w = e(_r(d[21])),
      T = _r(d[22]);
    function C(e) {
      const t = Math.floor((Date.now() - e) / 1e3),
        i = Math.floor(t / 3600),
        a = Math.floor((t % 3600) / 60),
        r = t % 60;
      return `${String(i).padStart(2, '0')}:${String(a).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
    }
    function j(e, t) {
      const i = (0, _r(d[23]).getCountdownColor)(e);
      return 'expired' === i
        ? t.countdownExpired
        : 'critical' === i
          ? t.countdownCritical
          : 'warning' === i
            ? t.countdownWarning
            : t.countdownOk;
    }
    function B(e, t) {
      return e >= 5
        ? t.seatsPlenty
        : e >= 2
          ? t.seatsFilling
          : 1 === e
            ? t.seatsAlmostFull
            : t.seatsFull;
    }
    function P(e) {
      return 'pending' === e.status || 'active' === e.status;
    }
    function k(e) {
      return 'confirmed' === e.status;
    }
    function R(e, t) {
      return 'pending' === e
        ? { label: 'Awaiting approval', pillStyle: t.statusPending, textStyle: t.statusPendingText }
        : 'active' === e
          ? { label: 'Seat reserved', pillStyle: t.statusReserved, textStyle: t.statusReservedText }
          : 'confirmed' === e
            ? { label: 'Confirmed', pillStyle: t.statusConfirmed, textStyle: t.statusConfirmedText }
            : 'boarded' === e
              ? { label: 'Onboard', pillStyle: t.statusBoarded, textStyle: t.statusBoardedText }
              : { label: 'Reserved', pillStyle: t.statusReserved, textStyle: t.statusReservedText };
    }
    function F(e) {
      if (!e) return 'Just sent';
      const t = Math.max(0, Math.floor((Date.now() - e) / 6e4));
      return t < 1 ? 'Sent just now' : `Sent ${t} min ago`;
    }
    const A = {
        nestedScrollEnabled: !0,
        showsVerticalScrollIndicator: !1,
        keyboardShouldPersistTaps: 'handled',
        decelerationRate: 'normal',
        scrollEventThrottle: 16,
        bounces: !0,
        overScrollMode: 'always',
        removeClippedSubviews: !1,
      },
      z = (0, t.memo)(function ({
        passenger: e,
        onSendRequest: a,
        onAccept: s,
        onDecline: l,
        onWithdraw: c,
        compact: u = !1,
      }) {
        const { colors: m } = (0, _r(d[24]).useTheme)(),
          f = (0, t.useMemo)(() => E(m, u), [m, u]),
          p = 'invited' === e.status,
          y = (0, t.useRef)(new i.default.Value(0.5)).current;
        ((0, _r(d[25]).useLiveTick)(p ? 1e3 : 15e3),
          (0, t.useEffect)(() => {
            if (!p) return;
            const e = i.default.loop(
              i.default.sequence([
                i.default.timing(y, { toValue: 1, duration: 800, useNativeDriver: !0 }),
                i.default.timing(y, { toValue: 0.45, duration: 800, useNativeDriver: !0 }),
              ])
            );
            return (e.start(), () => e.stop());
          }, [p, y]));
        const x = (0, _r(d[26]).formatWaitMinutes)(e.createdAt, e.waitMin),
          h = (0, _r(d[26]).getInviteExpiresAt)(e),
          S = h ? (0, _r(d[23]).formatCountdownTo)(h) : null;
        return (0, T.jsxs)(n.default, {
          style: f.waitingCard,
          children: [
            (0, T.jsxs)(n.default, {
              style: f.waitingHeader,
              children: [
                (0, T.jsx)(n.default, {
                  style: f.waitingAvatar,
                  children: (0, T.jsx)(_r(d[27]).Ionicons, {
                    name: 'person',
                    size: 18,
                    color: m.primaryLight,
                  }),
                }),
                (0, T.jsxs)(n.default, {
                  style: f.waitingHeaderText,
                  children: [
                    (0, T.jsx)(r.default, {
                      style: f.waitingName,
                      children: e.passengerName ?? 'Passenger',
                    }),
                    (0, T.jsxs)(r.default, {
                      style: f.waitingRoute,
                      children: [e.pickup, ' \u2192 ', e.destination],
                    }),
                    null != e.trustScore
                      ? (0, T.jsxs)(r.default, {
                          style: f.waitingTrust,
                          children: [
                            Number(e.trustScore) >= 85
                              ? 'Platinum'
                              : Number(e.trustScore) >= 70
                                ? 'Gold'
                                : Number(e.trustScore) >= 50
                                  ? 'Silver'
                                  : 'Bronze',
                            ' \xb7 ',
                            Number(e.trustScore),
                            ' trust',
                          ],
                        })
                      : null,
                  ],
                }),
                p
                  ? (0, T.jsxs)(n.default, {
                      style: f.sentPillLive,
                      children: [
                        (0, T.jsx)(i.default.View, { style: [f.sentPillDot, { opacity: y }] }),
                        (0, T.jsx)(r.default, { style: f.sentPillText, children: 'Awaiting' }),
                      ],
                    })
                  : (0, T.jsx)(n.default, {
                      style: f.queuePill,
                      children: (0, T.jsx)(r.default, {
                        style: f.queuePillText,
                        children: 'In queue',
                      }),
                    }),
              ],
            }),
            e.scheduledFor
              ? (0, T.jsxs)(r.default, {
                  style: f.waitingMeta,
                  children: [
                    'Scheduled \xb7',
                    ' ',
                    new Date(e.scheduledFor).toLocaleString('en-GH', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }),
                  ],
                })
              : (0, T.jsxs)(r.default, {
                  style: f.waitingMeta,
                  children: ['Waiting ', x, ' min \xb7 updated live'],
                }),
            e.notes ? (0, T.jsx)(r.default, { style: f.waitingNotes, children: e.notes }) : null,
            e.passengerPhone
              ? (0, T.jsx)(b.default, {
                  phone: e.passengerPhone,
                  operatorName: e.passengerName ?? 'Passenger',
                  compact: !0,
                })
              : null,
            p
              ? (0, T.jsxs)(n.default, {
                  style: f.invitedBlock,
                  children: [
                    (0, T.jsxs)(r.default, {
                      style: f.invitedStatus,
                      children: [
                        F(e.invitedAt),
                        S
                          ? ` \xb7 Respond in ${S}`
                          : ` \xb7 Expires in ${_r(d[28]).MATE_INVITE_EXPIRY_MINUTES} min`,
                      ],
                    }),
                    e.inviteMessage
                      ? (0, T.jsxs)(r.default, {
                          style: f.inviteMessagePreview,
                          children: ['\u201c', e.inviteMessage, '\u201d'],
                        })
                      : null,
                    (0, T.jsx)(o.default, {
                      style: f.withdrawButton,
                      onPress: () => c(e.id),
                      children: (0, T.jsx)(r.default, {
                        style: f.withdrawText,
                        children: 'Withdraw request',
                      }),
                    }),
                  ],
                })
              : (0, T.jsxs)(T.Fragment, {
                  children: [
                    (0, T.jsxs)(o.default, {
                      style: f.sendRequestButtonPrimary,
                      onPress: () => a(e),
                      testID: 'mate-send-ride-request',
                      children: [
                        (0, T.jsx)(_r(d[27]).Ionicons, {
                          name: 'paper-plane',
                          size: 18,
                          color: m.onPrimary,
                        }),
                        (0, T.jsx)(r.default, {
                          style: f.sendRequestPrimaryText,
                          children: 'Send ride request',
                        }),
                      ],
                    }),
                    (0, T.jsxs)(n.default, {
                      style: f.quickActionsRow,
                      children: [
                        (0, T.jsx)(o.default, {
                          style: f.quickAccept,
                          onPress: () => s(e.id),
                          children: (0, T.jsx)(r.default, {
                            style: f.quickAcceptText,
                            children: 'Add now',
                          }),
                        }),
                        (0, T.jsx)(o.default, {
                          style: f.quickPass,
                          onPress: () => l(e.id),
                          children: (0, T.jsx)(r.default, {
                            style: f.quickPassText,
                            children: 'Pass',
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
          ],
        });
      }),
      I = (0, t.memo)(function ({
        reservation: e,
        onAccept: i,
        onDecline: a,
        onBoard: s,
        onNoShow: l,
        compact: c = !1,
      }) {
        const { colors: u } = (0, _r(d[24]).useTheme)(),
          m = (0, t.useMemo)(() => E(u, c), [u, c]);
        (0, _r(d[25]).useLiveTick)();
        const f = (0, _r(d[23]).formatCountdownTo)(e.expiresAt),
          p = j(e.expiresAt, m),
          y = R(e.status, m),
          x = P(e),
          h = k(e);
        return (0, T.jsxs)(n.default, {
          style: [m.reservationCard, h && m.reservationCardAccepted],
          children: [
            (0, T.jsxs)(n.default, {
              style: m.reservationHeader,
              children: [
                (0, T.jsx)(r.default, { style: m.passengerName, children: e.passengerName }),
                (0, T.jsx)(n.default, {
                  style: [m.statusPill, y.pillStyle],
                  children: (0, T.jsx)(r.default, {
                    style: [m.statusPillText, y.textStyle],
                    children: y.label,
                  }),
                }),
              ],
            }),
            (0, T.jsx)(r.default, { style: m.pickup, children: e.pickup }),
            e.passengerPhone
              ? (0, T.jsx)(b.default, {
                  phone: e.passengerPhone,
                  operatorName: e.passengerName ?? 'Passenger',
                  compact: !0,
                })
              : null,
            x
              ? (0, T.jsxs)(r.default, {
                  style: [m.countdown, p],
                  children: ['Hold expires in ', f],
                })
              : h
                ? (0, T.jsx)(r.default, {
                    style: m.readyToBoardText,
                    children: 'Ready for pickup \xb7 tap BOARD when they arrive',
                  })
                : null,
            h && e.verificationCode
              ? (0, T.jsxs)(n.default, {
                  style: m.verifyCodeBox,
                  children: [
                    (0, T.jsx)(r.default, { style: m.verifyCodeLabel, children: 'Pickup code' }),
                    (0, T.jsx)(r.default, {
                      style: m.verifyCodeValue,
                      children: e.verificationCode,
                    }),
                    (0, T.jsx)(r.default, {
                      style: m.verifyCodeHint,
                      children: 'Ask passenger to show this code if there is a dispute',
                    }),
                  ],
                })
              : null,
            x
              ? (0, T.jsxs)(n.default, {
                  style: m.reservationActions,
                  children: [
                    (0, T.jsxs)(o.default, {
                      style: m.acceptReservedButton,
                      onPress: () => i(e.id),
                      children: [
                        (0, T.jsx)(_r(d[27]).Ionicons, {
                          name: 'checkmark-circle',
                          size: c ? 16 : 18,
                          color: u.onPrimary,
                        }),
                        (0, T.jsx)(r.default, {
                          style: m.acceptReservedText,
                          numberOfLines: 2,
                          children: c
                            ? 'Accept'
                            : 'active' === e.status
                              ? 'Accept reserved seat'
                              : 'Accept request',
                        }),
                      ],
                    }),
                    (0, T.jsx)(o.default, {
                      style: m.declineButton,
                      onPress: () => a(e.id),
                      children: (0, T.jsx)(r.default, {
                        style: m.declineText,
                        children: 'DECLINE',
                      }),
                    }),
                  ],
                })
              : null,
            h
              ? (0, T.jsxs)(n.default, {
                  style: m.reservationActions,
                  children: [
                    (0, T.jsx)(o.default, {
                      style: m.boardButton,
                      onPress: () => s(e.id),
                      children: (0, T.jsx)(r.default, {
                        style: m.boardButtonText,
                        children: 'BOARD',
                      }),
                    }),
                    (0, T.jsx)(o.default, {
                      style: m.noShowButton,
                      onPress: () => l(e.id),
                      children: (0, T.jsx)(r.default, { style: m.noShowText, children: 'NO-SHOW' }),
                    }),
                  ],
                })
              : null,
          ],
        });
      });
    const E = (e, t = !1) =>
      l.default.create({
        container: { flex: 1, backgroundColor: e.background },
        backBar: {
          flexShrink: 0,
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[39]).spacing.sm,
          paddingHorizontal: t ? _r(d[39]).spacing.md : _r(d[39]).spacing.lg,
          paddingBottom: _r(d[39]).spacing.sm,
        },
        backBarText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 15,
          color: e.primaryLight,
        },
        newBanner: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: e.primary,
          paddingVertical: _r(d[39]).spacing.md,
          paddingHorizontal: _r(d[39]).spacing.lg,
          alignItems: 'center',
        },
        newBannerTitle: {
          fontFamily: _r(d[39]).fontFamily.bold,
          fontSize: 13,
          color: e.onPrimary,
          letterSpacing: 1,
        },
        newBannerText: {
          fontFamily: _r(d[39]).fontFamily.medium,
          fontSize: 14,
          color: e.onPrimary,
          marginTop: 2,
        },
        emptyContainer: {
          flex: 1,
          backgroundColor: e.background,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        },
        emptyTitle: {
          fontFamily: _r(d[39]).fontFamily.bold,
          color: e.textPrimary,
          fontSize: 22,
          marginBottom: _r(d[39]).spacing.sm,
        },
        emptySubtitle: {
          fontFamily: _r(d[39]).fontFamily.regular,
          color: e.textSecondary,
          fontSize: 15,
          marginBottom: _r(d[39]).spacing.lg,
        },
        emptyButton: {
          backgroundColor: e.primary,
          borderRadius: _r(d[39]).radius.md,
          minHeight: 48,
          paddingHorizontal: _r(d[39]).spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        emptyButtonText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          color: e.onPrimary,
          fontSize: 15,
        },
        topSection: {
          flexShrink: 0,
          padding: t ? _r(d[39]).spacing.md : _r(d[39]).spacing.lg,
          backgroundColor: e.surfaceElevated,
          borderBottomWidth: 1,
          borderBottomColor: e.border,
        },
        liveBroadcastRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: _r(d[39]).spacing.xs,
          marginBottom: _r(d[39]).spacing.sm,
        },
        liveBroadcastRight: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[39]).spacing.sm,
        },
        liveBroadcastPill: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: _r(d[39]).spacing.sm,
          paddingVertical: 4,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.greenAlpha12,
        },
        liveBroadcastDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: e.greenAccent },
        liveBroadcastText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 11,
          color: e.greenAccent,
          textTransform: 'uppercase',
          letterSpacing: 0.3,
        },
        vehicleType: { fontFamily: _r(d[39]).fontFamily.medium, fontSize: 12, color: e.textMuted },
        fillTrack: {
          height: 6,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.borderSoft,
          overflow: 'hidden',
          marginBottom: _r(d[39]).spacing.xs,
        },
        fillBar: {
          height: '100%',
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.primary,
        },
        fillLabel: {
          fontFamily: _r(d[39]).fontFamily.medium,
          fontSize: 12,
          color: e.textMuted,
          marginBottom: _r(d[39]).spacing.sm,
        },
        boardingClosedLabel: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 13,
          color: e.seatsFull,
          marginTop: _r(d[39]).spacing.xs,
        },
        onboardOverlay: {
          position: 'absolute',
          top: '38%',
          left: _r(d[39]).spacing.lg,
          right: _r(d[39]).spacing.lg,
          zIndex: 20,
          backgroundColor: e.primary,
          borderRadius: _r(d[39]).radius.lg,
          paddingVertical: _r(d[39]).spacing.xl,
          paddingHorizontal: _r(d[39]).spacing.lg,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 8,
        },
        onboardOverlayTitle: {
          fontFamily: _r(d[39]).fontFamily.bold,
          fontSize: 20,
          color: e.onPrimary,
          textAlign: 'center',
        },
        onboardOverlayText: {
          fontFamily: _r(d[39]).fontFamily.medium,
          fontSize: 14,
          color: e.onPrimary,
          marginTop: _r(d[39]).spacing.sm,
          opacity: 0.92,
          textAlign: 'center',
        },
        potentialText: {
          fontFamily: _r(d[39]).fontFamily.medium,
          fontSize: 13,
          color: e.textSecondary,
        },
        route: {
          color: e.textPrimary,
          fontSize: t ? 18 : 22,
          fontWeight: '700',
          marginBottom: _r(d[39]).spacing.sm,
        },
        topMetaRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: _r(d[39]).spacing.xs,
          marginBottom: t ? 6 : 8,
        },
        seatBadgeLarge: {
          borderRadius: 20,
          paddingHorizontal: t ? 10 : 14,
          paddingVertical: t ? 6 : 8,
        },
        seatBadgeLargeText: { color: e.onPrimary, fontSize: t ? 14 : 16, fontWeight: '700' },
        seatsPlenty: { backgroundColor: e.seatsAvailable },
        seatsFilling: { backgroundColor: e.seatsFilling },
        seatsAlmostFull: { backgroundColor: e.seatsAlmostFull },
        seatsFull: { backgroundColor: e.seatsFull },
        fare: { color: e.textSecondary, fontSize: t ? 13 : 15, flexShrink: 1, textAlign: 'right' },
        timer: { color: e.textPrimary, fontSize: t ? 16 : 18, fontWeight: '600' },
        earnings: { color: e.primary, fontSize: t ? 14 : 16, fontWeight: '700', flexShrink: 1 },
        reservedCount: {
          color: e.primaryLight,
          fontSize: t ? 12 : 14,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          flexShrink: 1,
          textAlign: 'right',
        },
        toggleRow: { flexShrink: 0, flexDirection: 'row', padding: t ? _r(d[39]).spacing.sm : 12 },
        toggleButton: {
          flex: 1,
          backgroundColor: e.surfaceElevated,
          borderRadius: _r(d[39]).radius.md,
          borderWidth: 1,
          borderColor: e.border,
          minHeight: 48,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 4,
        },
        toggleActive: { backgroundColor: e.primary },
        toggleText: { color: e.textSecondary, fontSize: 12, fontWeight: '700' },
        toggleTextActive: { color: e.onPrimary },
        middleSection: { flex: 1, minHeight: 0 },
        passengersPanel: { flex: 1, minHeight: 0 },
        reservationsSection: {
          flex: 1,
          minHeight: 0,
          paddingHorizontal: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.lg,
          paddingTop: _r(d[39]).spacing.sm,
          borderBottomWidth: l.default.hairlineWidth,
          borderBottomColor: e.borderSoft,
        },
        reservationsSectionTitle: {
          color: e.textPrimary,
          fontSize: t ? 15 : 16,
          fontWeight: '700',
          marginBottom: _r(d[39]).spacing.sm,
        },
        reservationFilterRow: { marginBottom: _r(d[39]).spacing.sm },
        reservationsListWrap: { flex: 1, minHeight: 120 },
        reservationsScroll: { flex: 1 },
        reservationsScrollContent: { paddingBottom: _r(d[39]).spacing.sm },
        boardedSection: {
          flexShrink: 0,
          paddingHorizontal: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.lg,
          paddingVertical: _r(d[39]).spacing.sm,
          borderBottomWidth: l.default.hairlineWidth,
          borderBottomColor: e.borderSoft,
        },
        boardedSectionTitle: {
          color: e.textPrimary,
          fontSize: 14,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          marginBottom: _r(d[39]).spacing.xs,
        },
        boardedCard: {
          backgroundColor: e.surfaceElevated,
          borderRadius: _r(d[39]).radius.md,
          borderWidth: 1,
          borderColor: e.border,
          paddingHorizontal: _r(d[39]).spacing.md,
          paddingVertical: _r(d[39]).spacing.sm,
          marginBottom: _r(d[39]).spacing.xs,
        },
        boardedName: {
          color: e.textPrimary,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 14,
        },
        boardedPickup: { color: e.textSecondary, fontSize: 12, marginTop: 2 },
        onboardControls: {
          flexShrink: 0,
          paddingHorizontal: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.lg,
          paddingVertical: _r(d[39]).spacing.sm,
          borderBottomWidth: l.default.hairlineWidth,
          borderBottomColor: e.borderSoft,
        },
        waitingSection: {
          flex: 1,
          minHeight: 0,
          paddingHorizontal: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.lg,
          borderTopWidth: l.default.hairlineWidth,
          borderTopColor: e.borderSoft,
          paddingTop: _r(d[39]).spacing.sm,
        },
        waitingSectionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: _r(d[39]).spacing.sm,
          marginBottom: _r(d[39]).spacing.sm,
        },
        waitingSectionTitle: {
          color: e.textPrimary,
          fontSize: t ? 14 : 16,
          fontWeight: '700',
          flex: 1,
          minWidth: 140,
        },
        inviteAllBtn: {
          paddingHorizontal: _r(d[39]).spacing.sm,
          paddingVertical: 6,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.primaryAlpha12 ?? e.primaryAlpha08,
          borderWidth: 1,
          borderColor: e.primaryAlpha35 ?? e.primary,
        },
        inviteAllBtnText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 12,
          color: e.primaryLight,
        },
        waitingScroll: { flex: 1, minHeight: 120 },
        waitingScrollContent: { paddingBottom: _r(d[39]).spacing.md },
        panelTitle: {
          color: e.textPrimary,
          fontSize: 16,
          fontWeight: '700',
          marginBottom: 10,
          marginTop: 8,
        },
        emptyPanel: { color: e.textSecondary, fontSize: 14, marginBottom: 16 },
        reservationCard: {
          backgroundColor: e.surfaceElevated,
          borderRadius: _r(d[39]).radius.lg,
          borderWidth: 1,
          borderColor: e.border,
          padding: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.md,
          marginBottom: _r(d[39]).spacing.sm,
        },
        reservationCardAccepted: {
          borderColor: e.success ?? e.seatsAvailable,
          borderLeftWidth: 4,
          borderLeftColor: e.success ?? e.seatsAvailable,
        },
        reservationHeader: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: _r(d[39]).spacing.xs,
          marginBottom: 2,
        },
        statusPill: {
          borderRadius: _r(d[39]).radius.pill,
          paddingHorizontal: _r(d[39]).spacing.sm,
          paddingVertical: 4,
        },
        statusPillText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 10,
          textTransform: 'uppercase',
        },
        statusPending: { backgroundColor: e.primaryAlpha18 },
        statusPendingText: { color: e.primaryLight },
        statusReserved: { backgroundColor: 'rgba(251, 191, 36, 0.15)' },
        statusReservedText: { color: e.warning },
        statusConfirmed: { backgroundColor: 'rgba(52, 211, 153, 0.15)' },
        statusConfirmedText: { color: e.success },
        statusBoarded: { backgroundColor: 'rgba(52, 211, 153, 0.2)' },
        statusBoardedText: { color: e.success },
        passengerName: {
          flex: 1,
          flexShrink: 1,
          minWidth: 0,
          color: e.textPrimary,
          fontSize: t ? 14 : 15,
          fontWeight: '600',
        },
        pickup: { color: e.textSecondary, fontSize: t ? 12 : 13, marginTop: 4 },
        countdown: {
          fontSize: 13,
          marginTop: 4,
          marginBottom: 8,
          fontFamily: _r(d[39]).fontFamily.semiBold,
        },
        countdownOk: { color: e.seatsAvailable },
        countdownWarning: { color: e.seatsFilling },
        countdownCritical: { color: e.seatsAlmostFull },
        countdownExpired: { color: e.seatsFull },
        boardedLabel: {
          color: e.success,
          fontSize: 14,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          marginTop: 4,
          marginBottom: 4,
        },
        readyToBoardText: {
          color: e.success ?? e.seatsAvailable,
          fontSize: 13,
          fontFamily: _r(d[39]).fontFamily.medium,
          marginTop: _r(d[39]).spacing.xs,
          marginBottom: _r(d[39]).spacing.sm,
        },
        verifyCodeBox: {
          marginTop: _r(d[39]).spacing.sm,
          marginBottom: _r(d[39]).spacing.sm,
          padding: _r(d[39]).spacing.sm,
          borderRadius: _r(d[39]).radius.md,
          backgroundColor: e.accentMuted ?? e.surfaceSoft,
          borderWidth: l.default.hairlineWidth,
          borderColor: e.border,
        },
        verifyCodeLabel: Object.assign({}, _r(d[39]).typography.caption, {
          color: e.textSecondary,
          marginBottom: 2,
        }),
        verifyCodeValue: {
          fontFamily: _r(d[39]).fontFamily.bold,
          fontSize: t ? 22 : 26,
          letterSpacing: 4,
          color: e.accent,
        },
        verifyCodeHint: Object.assign({}, _r(d[39]).typography.caption, {
          color: e.textMuted,
          marginTop: _r(d[39]).spacing.xs,
        }),
        reservationActions: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: t ? _r(d[39]).spacing.xs : _r(d[39]).spacing.sm,
          marginTop: _r(d[39]).spacing.sm,
        },
        acceptButton: {
          flex: 1,
          minWidth: t ? '46%' : void 0,
          backgroundColor: e.greenAccent,
          borderRadius: 8,
          minHeight: t ? 40 : 44,
          alignItems: 'center',
          justifyContent: 'center',
        },
        acceptReservedButton: {
          flex: 1,
          flexGrow: 1,
          minWidth: t ? '100%' : 120,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: _r(d[39]).spacing.xs,
          backgroundColor: e.primary,
          borderRadius: _r(d[39]).radius.md,
          minHeight: t ? 40 : 44,
          paddingHorizontal: t ? _r(d[39]).spacing.xs : _r(d[39]).spacing.sm,
        },
        acceptReservedText: {
          color: e.onPrimary,
          fontSize: t ? 11 : 12,
          fontFamily: _r(d[39]).fontFamily.bold,
          textAlign: 'center',
          flexShrink: 1,
        },
        acceptText: { color: e.onPrimary, fontSize: 13, fontFamily: _r(d[39]).fontFamily.bold },
        declineButton: {
          flex: 1,
          minWidth: t ? '46%' : void 0,
          borderWidth: 1,
          borderColor: e.error,
          borderRadius: 8,
          minHeight: t ? 40 : 44,
          alignItems: 'center',
          justifyContent: 'center',
        },
        declineText: { color: e.error, fontSize: 13, fontFamily: _r(d[39]).fontFamily.semiBold },
        requestOverlay: { flex: 1, backgroundColor: e.overlay, justifyContent: 'flex-end' },
        requestCard: {
          backgroundColor: e.surfaceElevated,
          borderTopLeftRadius: _r(d[39]).radius.xl,
          borderTopRightRadius: _r(d[39]).radius.xl,
          padding: _r(d[39]).spacing.xl,
          borderWidth: 1,
          borderColor: e.border,
        },
        requestTitle: {
          fontFamily: _r(d[39]).fontFamily.bold,
          fontSize: 20,
          color: e.textPrimary,
          marginBottom: _r(d[39]).spacing.sm,
        },
        requestName: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 18,
          color: e.primaryLight,
          marginBottom: _r(d[39]).spacing.xs,
        },
        requestPickup: {
          fontFamily: _r(d[39]).fontFamily.medium,
          fontSize: 15,
          color: e.textSecondary,
          marginBottom: _r(d[39]).spacing.md,
        },
        requestHint: {
          fontFamily: _r(d[39]).fontFamily.regular,
          fontSize: 13,
          color: e.textMuted,
          marginBottom: _r(d[39]).spacing.lg,
          lineHeight: 18,
        },
        boardButton: {
          flex: 1,
          backgroundColor: e.seatsAvailable,
          borderRadius: 8,
          minHeight: 40,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        noShowButton: {
          flex: 1,
          borderWidth: 1,
          borderColor: e.seatsAlmostFull,
          borderRadius: 8,
          minHeight: 40,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
        },
        boardButtonText: { color: e.onPrimary, fontSize: 13, fontWeight: '700' },
        noShowText: { color: e.seatsAlmostFull, fontSize: 13, fontWeight: '600' },
        onboardButton: {
          backgroundColor: e.primary,
          borderRadius: 8,
          minHeight: t ? 52 : 64,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
          marginBottom: 12,
          paddingHorizontal: _r(d[39]).spacing.sm,
        },
        onboardButtonDisabled: { opacity: 0.45 },
        onboardButtonText: {
          color: e.onPrimary,
          fontSize: t ? 15 : 17,
          fontWeight: '700',
          textAlign: 'center',
        },
        undoRow: {
          flexDirection: 'row',
          gap: t ? _r(d[39]).spacing.xs : 8,
          marginBottom: t ? _r(d[39]).spacing.sm : 16,
        },
        undoButton: {
          flex: 1,
          backgroundColor: e.surface,
          borderRadius: 8,
          minHeight: t ? 44 : 48,
          alignItems: 'center',
          justifyContent: 'center',
        },
        undoText: { color: e.textPrimary, fontSize: t ? 13 : 15, fontWeight: '600' },
        fullButton: {
          flex: 1,
          backgroundColor: e.seatsFull,
          borderRadius: 8,
          minHeight: t ? 44 : 48,
          alignItems: 'center',
          justifyContent: 'center',
        },
        fullButtonText: { color: e.onPrimary, fontSize: t ? 12 : 14, fontWeight: '700' },
        waitingCard: {
          backgroundColor: e.surfaceElevated,
          borderRadius: _r(d[39]).radius.lg,
          borderWidth: 1,
          borderColor: e.border,
          padding: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.md,
          marginBottom: _r(d[39]).spacing.sm,
        },
        waitingHeader: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: t ? _r(d[39]).spacing.sm : _r(d[39]).spacing.md,
          marginBottom: _r(d[39]).spacing.sm,
        },
        waitingAvatar: {
          width: t ? 36 : 40,
          height: t ? 36 : 40,
          borderRadius: t ? 18 : 20,
          backgroundColor: e.primaryAlpha12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        waitingHeaderText: { flex: 1, minWidth: 0 },
        waitingName: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: t ? 14 : 16,
          color: e.textPrimary,
          marginBottom: 2,
        },
        waitingRoute: {
          fontFamily: _r(d[39]).fontFamily.medium,
          fontSize: t ? 12 : 13,
          color: e.textSecondary,
          lineHeight: t ? 16 : 18,
        },
        waitingTrust: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 12,
          color: e.greenAccent,
          marginTop: 2,
        },
        sentPill: {
          paddingHorizontal: _r(d[39]).spacing.sm,
          paddingVertical: 4,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.primaryAlpha18,
        },
        sentPillLive: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: _r(d[39]).spacing.sm,
          paddingVertical: 4,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.primaryAlpha18,
        },
        sentPillDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: e.warning },
        queuePill: {
          paddingHorizontal: _r(d[39]).spacing.sm,
          paddingVertical: 4,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.surfaceInset,
          borderWidth: 1,
          borderColor: e.borderSoft,
        },
        queuePillText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 11,
          color: e.textMuted,
          textTransform: 'uppercase',
        },
        sentPillText: {
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 11,
          color: e.primaryLight,
          textTransform: 'uppercase',
        },
        waitingMeta: { color: e.textSecondary, fontSize: 13, marginBottom: _r(d[39]).spacing.xs },
        waitingNotes: {
          color: e.textMuted,
          fontSize: 12,
          marginBottom: _r(d[39]).spacing.sm,
          fontStyle: 'italic',
        },
        invitedBlock: {
          marginTop: _r(d[39]).spacing.sm,
          paddingTop: _r(d[39]).spacing.sm,
          borderTopWidth: 1,
          borderTopColor: e.borderSoft,
        },
        invitedStatus: {
          color: e.warning,
          fontSize: 13,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          marginBottom: _r(d[39]).spacing.xs,
        },
        inviteMessagePreview: {
          color: e.textSecondary,
          fontSize: 13,
          fontStyle: 'italic',
          marginBottom: _r(d[39]).spacing.sm,
          lineHeight: 18,
        },
        withdrawButton: { alignSelf: 'flex-start', paddingVertical: _r(d[39]).spacing.xs },
        withdrawText: {
          color: e.textMuted,
          fontSize: 13,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          textDecorationLine: 'underline',
        },
        sendRequestButtonPrimary: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: _r(d[39]).spacing.sm,
          minHeight: t ? 44 : 48,
          borderRadius: _r(d[39]).radius.lg,
          backgroundColor: e.primary,
          marginTop: _r(d[39]).spacing.sm,
          marginBottom: _r(d[39]).spacing.sm,
          paddingHorizontal: _r(d[39]).spacing.sm,
        },
        sendRequestPrimaryText: {
          color: e.onPrimary,
          fontSize: t ? 13 : 15,
          fontFamily: _r(d[39]).fontFamily.bold,
        },
        quickActionsRow: { flexDirection: 'row', gap: _r(d[39]).spacing.sm },
        quickAccept: {
          flex: 1,
          minHeight: 40,
          borderRadius: _r(d[39]).radius.md,
          backgroundColor: e.greenAlpha12,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: e.greenAlpha25,
        },
        quickAcceptText: {
          color: e.greenAccent,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 13,
        },
        quickPass: {
          flex: 1,
          minHeight: 40,
          borderRadius: _r(d[39]).radius.md,
          backgroundColor: e.surfaceInset,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: e.borderSoft,
        },
        quickPassText: {
          color: e.textMuted,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 13,
        },
        map: { flex: 1 },
        mapNavWrap: { flex: 1, position: 'relative' },
        mapNavigateBtn: {
          position: 'absolute',
          left: _r(d[39]).spacing.md,
          right: _r(d[39]).spacing.md,
          bottom: _r(d[39]).spacing.md,
          minHeight: 44,
          borderRadius: _r(d[39]).radius.pill,
          backgroundColor: e.primary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: _r(d[39]).spacing.sm,
        },
        mapNavigateText: {
          color: e.onPrimary,
          fontFamily: _r(d[39]).fontFamily.semiBold,
          fontSize: 14,
        },
        bottomSection: { flexShrink: 0, padding: 16, backgroundColor: e.background },
        endTripButton: {
          borderWidth: 2,
          borderColor: e.seatsAlmostFull,
          borderRadius: 8,
          minHeight: 50,
          alignItems: 'center',
          justifyContent: 'center',
        },
        endTripText: { color: e.seatsAlmostFull, fontSize: 16, fontWeight: '700' },
      });
  },
  1444,
  [
    1, 5, 7, 667, 14, 161, 19, 326, 675, 26, 746, 1645, 1535, 1534, 672, 1766, 1767, 1768, 1520,
    1770, 1653, 751, 183, 1521, 381, 1769, 1701, 578, 508, 382, 572, 1482, 501, 1671, 1386, 1703,
    682, 1508, 749, 377, 1537, 1536, 747,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ tripId: t, tripKind: c = 'trip', onAccepted: f }) {
        const { colors: y } = (0, r(d[8]).useTheme)(),
          { t: x } = (0, r(d[9]).useLanguage)(),
          { showToast: h } = (0, r(d[10]).useToast)(),
          j = (0, s.useMemo)(() => b(y), [y]),
          [T, F] = (0, s.useState)([]),
          [_, B] = (0, s.useState)(!0),
          [S, w] = (0, s.useState)(null),
          k = (0, s.useCallback)(async () => {
            if (!t) return;
            B(!0);
            const s = await (0, r(d[11]).getBidsForTrip)(c, t);
            (s.error || F(s.data ?? []), B(!1));
          }, [t, c]);
        (0, s.useEffect)(() => {
          if ((k(), t)) return (0, r(d[11]).subscribeToTripBids)(c, t, () => k());
        }, [t, c, k]);
        const D = async t => {
            w(t.id);
            const s = await (0, r(d[11]).acceptBid)(t.id);
            (w(null),
              s.error
                ? h({
                    type: 'error',
                    title: x('bid.mateAcceptFailed'),
                    message: (0, r(d[12]).errorMessage)(s.error),
                  })
                : (h({
                    type: 'success',
                    title: x('bid.mateAcceptedTitle'),
                    message: x('bid.mateAcceptedMessage', {
                      name: t.bidder_name ?? 'Passenger',
                      amount: Number(t.bid_amount).toFixed(2),
                    }),
                  }),
                  f?.(s.data),
                  k()));
          },
          P = async t => {
            w(t);
            const s = await (0, r(d[11]).declineBid)(t);
            (w(null),
              s.error
                ? h({
                    type: 'error',
                    title: x('bid.mateDeclineFailed'),
                    message: (0, r(d[12]).errorMessage)(s.error),
                  })
                : k());
          };
        if (!t) return null;
        if (_ && !T.length)
          return (0, p.jsx)(n.default, {
            style: j.wrap,
            children: (0, p.jsx)(u.default, { color: y.accent }),
          });
        return T.length
          ? (0, p.jsxs)(n.default, {
              style: j.wrap,
              children: [
                (0, p.jsx)(l.default, { style: j.title, children: x('bid.mateSectionTitle') }),
                (0, p.jsx)(l.default, { style: j.sub, children: x('bid.mateSectionSub') }),
                T.map(t =>
                  (0, p.jsxs)(
                    n.default,
                    {
                      style: j.card,
                      children: [
                        (0, p.jsxs)(n.default, {
                          style: j.cardTop,
                          children: [
                            (0, p.jsxs)(n.default, {
                              children: [
                                (0, p.jsx)(l.default, {
                                  style: j.name,
                                  children: t.bidder_name ?? 'Passenger',
                                }),
                                (0, p.jsx)(l.default, {
                                  style: j.pickup,
                                  children: t.pickup_point ?? x('bid.pickupTbd'),
                                }),
                              ],
                            }),
                            (0, p.jsxs)(l.default, {
                              style: j.amount,
                              children: ['GH\u20b5 ', Number(t.bid_amount).toFixed(2)],
                            }),
                          ],
                        }),
                        t.base_fare
                          ? (0, p.jsx)(l.default, {
                              style: j.vsList,
                              children: x('bid.vsListFare', {
                                list: Number(t.base_fare).toFixed(2),
                                delta: (Number(t.bid_amount) - Number(t.base_fare)).toFixed(2),
                              }),
                            })
                          : null,
                        (0, p.jsxs)(n.default, {
                          style: j.actions,
                          children: [
                            (0, p.jsx)(o.default, {
                              style: [j.acceptBtn, S === t.id && j.btnDisabled],
                              onPress: () => D(t),
                              disabled: !!S,
                              children: (0, p.jsx)(l.default, {
                                style: j.acceptText,
                                children: x('bid.mateAccept'),
                              }),
                            }),
                            (0, p.jsx)(o.default, {
                              style: [j.declineBtn, S === t.id && j.btnDisabled],
                              onPress: () => P(t.id),
                              disabled: !!S,
                              children: (0, p.jsx)(l.default, {
                                style: j.declineText,
                                children: x('bid.mateDecline'),
                              }),
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
    var s = r(d[1]),
      n = t(r(d[2])),
      l = t(r(d[3])),
      o = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = r(d[7]);
    const b = t =>
      c.default.create({
        wrap: { marginTop: r(d[13]).spacing.lg, marginBottom: r(d[13]).spacing.md },
        title: { fontFamily: r(d[13]).fontFamily.bold, fontSize: 16, color: t.textPrimary },
        sub: Object.assign({}, r(d[13]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[13]).spacing.sm,
        }),
        card: {
          backgroundColor: t.surface,
          borderRadius: r(d[13]).radius.lg,
          borderWidth: c.default.hairlineWidth,
          borderColor: t.border,
          padding: r(d[13]).spacing.md,
          marginBottom: r(d[13]).spacing.sm,
        },
        cardTop: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
        name: { fontFamily: r(d[13]).fontFamily.semibold, color: t.textPrimary },
        pickup: Object.assign({}, r(d[13]).typography.caption, {
          color: t.textSecondary,
          marginTop: 2,
        }),
        amount: { fontFamily: r(d[13]).fontFamily.bold, fontSize: 18, color: t.accent },
        vsList: Object.assign({}, r(d[13]).typography.caption, {
          color: t.textMuted,
          marginTop: r(d[13]).spacing.xs,
        }),
        actions: { flexDirection: 'row', gap: r(d[13]).spacing.sm, marginTop: r(d[13]).spacing.md },
        acceptBtn: {
          flex: 1,
          backgroundColor: t.accent,
          borderRadius: r(d[13]).radius.md,
          paddingVertical: r(d[13]).spacing.sm,
          alignItems: 'center',
        },
        acceptText: { fontFamily: r(d[13]).fontFamily.semibold, color: t.onAccent ?? '#fff' },
        declineBtn: {
          flex: 1,
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: r(d[13]).radius.md,
          paddingVertical: r(d[13]).spacing.sm,
          alignItems: 'center',
        },
        declineText: { fontFamily: r(d[13]).fontFamily.medium, color: t.textSecondary },
        btnDisabled: { opacity: 0.6 },
      });
  },
  1766,
  [1, 5, 19, 161, 326, 26, 373, 183, 381, 1381, 1386, 1647, 557, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        passenger: u,
        trip: v,
        mateProfile: S,
        loading: C = !1,
        onClose: T,
        onSend: P,
      }) {
        const B = (0, r(d[13]).useSafeAreaInsets)(),
          [I, F] = (0, l.useState)('');
        if (
          ((0, l.useEffect)(() => {
            t && F('');
          }, [t, u?.id]),
          !u || !v)
        )
          return null;
        const k = u.passengerName ?? 'Passenger',
          R = u.pickup ?? u.origin ?? v.origin,
          _ = u.destination ?? v.destination,
          L = S?.vehicle_registration,
          z = v.vehicleType ?? S?.vehicle_type ?? 'Trotro';
        return (0, y.jsx)(o.default, {
          visible: t,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: T,
          children: (0, y.jsx)(s.default, {
            style: j.overlay,
            onPress: T,
            children: (0, y.jsxs)(s.default, {
              style: [j.sheet, { paddingBottom: B.bottom + r(d[14]).spacing.lg }],
              onPress: t => t.stopPropagation?.(),
              children: [
                (0, y.jsx)(p.default, { style: j.handle }),
                (0, y.jsxs)(n.default, {
                  showsVerticalScrollIndicator: !1,
                  keyboardShouldPersistTaps: 'handled',
                  children: [
                    (0, y.jsx)(c.default, { style: j.kicker, children: 'Send ride request' }),
                    (0, y.jsx)(c.default, { style: j.title, children: k }),
                    (0, y.jsx)(c.default, {
                      style: j.subtitle,
                      children:
                        'Invite this passenger to join your active trip. They can accept or decline in My Trips.',
                    }),
                    (0, y.jsxs)(p.default, {
                      style: j.summaryCard,
                      children: [
                        (0, y.jsx)(b, {
                          icon: 'navigate-outline',
                          label: 'Passenger route',
                          value: `${R} \u2192 ${_}`,
                        }),
                        (0, y.jsx)(p.default, { style: j.divider }),
                        (0, y.jsx)(b, { icon: 'bus-outline', label: 'Your trip', value: v.route }),
                        (0, y.jsx)(p.default, { style: j.divider }),
                        (0, y.jsx)(b, {
                          icon: 'cash-outline',
                          label: 'Fare per seat',
                          value: `GHS ${Number(v.farePerSeat ?? 0).toFixed(2)}`,
                        }),
                        (0, y.jsx)(p.default, { style: j.divider }),
                        (0, y.jsx)(b, {
                          icon: 'people-outline',
                          label: 'Seats available',
                          value: `${v.seatsAvailable} of ${v.totalSeats}`,
                        }),
                        L
                          ? (0, y.jsxs)(y.Fragment, {
                              children: [
                                (0, y.jsx)(p.default, { style: j.divider }),
                                (0, y.jsx)(b, {
                                  icon: 'car-outline',
                                  label: 'Vehicle',
                                  value: `${z} \xb7 ${L}`,
                                }),
                              ],
                            })
                          : null,
                      ],
                    }),
                    (0, y.jsx)(c.default, { style: j.fieldLabel, children: 'Optional message' }),
                    (0, y.jsx)(f.default, {
                      style: j.messageInput,
                      placeholder: "e.g. I'm 3 min away at the main stop",
                      placeholderTextColor: x.default.textMuted,
                      value: I,
                      onChangeText: F,
                      maxLength: 120,
                      multiline: !0,
                    }),
                    (0, y.jsxs)(c.default, {
                      style: j.hint,
                      children: [
                        'Request expires in ',
                        r(d[15]).MATE_INVITE_EXPIRY_MINUTES,
                        ' minutes if the passenger does not respond.',
                      ],
                    }),
                    (0, y.jsx)(h.default, {
                      title: 'Send ride request',
                      onPress: () => P(I.trim()),
                      loading: C,
                      style: j.sendButton,
                      testID: 'mate-send-request-confirm',
                    }),
                    (0, y.jsx)(h.default, {
                      title: 'Cancel',
                      variant: 'ghost',
                      onPress: T,
                      disabled: C,
                    }),
                  ],
                }),
              ],
            }),
          }),
        });
      }));
    var l = r(d[1]),
      o = t(r(d[2])),
      s = t(r(d[3])),
      n = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      f = t(r(d[7])),
      p = t(r(d[8])),
      x = t(r(d[9])),
      h = t(r(d[10])),
      y = r(d[11]);
    function b({ icon: t, label: l, value: o }) {
      return (0, y.jsxs)(p.default, {
        style: j.detailRow,
        children: [
          (0, y.jsx)(r(d[12]).Ionicons, { name: t, size: 18, color: x.default.primaryLight }),
          (0, y.jsxs)(p.default, {
            style: j.detailTextCol,
            children: [
              (0, y.jsx)(c.default, { style: j.detailLabel, children: l }),
              (0, y.jsx)(c.default, { style: j.detailValue, children: o }),
            ],
          }),
        ],
      });
    }
    const j = u.default.create({
      overlay: { flex: 1, backgroundColor: x.default.overlay, justifyContent: 'flex-end' },
      sheet: {
        backgroundColor: x.default.surfaceElevated,
        borderTopLeftRadius: r(d[14]).radius.xxl,
        borderTopRightRadius: r(d[14]).radius.xxl,
        paddingHorizontal: r(d[14]).spacing.xl,
        paddingTop: r(d[14]).spacing.md,
        maxHeight: '88%',
        borderWidth: 1,
        borderColor: x.default.border,
      },
      handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: x.default.borderStrong,
        alignSelf: 'center',
        marginBottom: r(d[14]).spacing.lg,
      },
      kicker: Object.assign({}, r(d[14]).typography.label, {
        color: x.default.primaryLight,
        marginBottom: r(d[14]).spacing.xs,
      }),
      title: {
        fontFamily: r(d[14]).fontFamily.bold,
        fontSize: 24,
        color: x.default.textPrimary,
        marginBottom: r(d[14]).spacing.xs,
      },
      subtitle: Object.assign({}, r(d[14]).typography.body, {
        marginBottom: r(d[14]).spacing.lg,
        lineHeight: 22,
      }),
      summaryCard: {
        backgroundColor: x.default.surfaceInset,
        borderRadius: r(d[14]).radius.xl,
        borderWidth: 1,
        borderColor: x.default.borderSoft,
        padding: r(d[14]).spacing.lg,
        marginBottom: r(d[14]).spacing.lg,
      },
      detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: r(d[14]).spacing.md },
      detailTextCol: { flex: 1 },
      detailLabel: {
        fontFamily: r(d[14]).fontFamily.medium,
        fontSize: 11,
        color: x.default.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.35,
        marginBottom: 2,
      },
      detailValue: {
        fontFamily: r(d[14]).fontFamily.semiBold,
        fontSize: 15,
        color: x.default.textPrimary,
        lineHeight: 20,
      },
      divider: {
        height: 1,
        backgroundColor: x.default.borderSoft,
        marginVertical: r(d[14]).spacing.md,
      },
      fieldLabel: {
        fontFamily: r(d[14]).fontFamily.semiBold,
        fontSize: 14,
        color: x.default.textPrimary,
        marginBottom: r(d[14]).spacing.sm,
      },
      messageInput: {
        backgroundColor: x.default.surface,
        borderRadius: r(d[14]).radius.lg,
        borderWidth: 1,
        borderColor: x.default.borderSoft,
        padding: r(d[14]).spacing.md,
        minHeight: 88,
        color: x.default.textPrimary,
        fontFamily: r(d[14]).fontFamily.regular,
        fontSize: 15,
        textAlignVertical: 'top',
        marginBottom: r(d[14]).spacing.sm,
      },
      hint: Object.assign({}, r(d[14]).typography.caption, {
        marginBottom: r(d[14]).spacing.lg,
        lineHeight: 18,
      }),
      sendButton: { marginBottom: r(d[14]).spacing.sm },
    });
  },
  1767,
  [1, 5, 948, 326, 106, 26, 161, 255, 19, 379, 672, 183, 578, 572, 377, 508]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        request: t,
        tripRoute: c,
        farePerSeat: b,
        onAccept: w,
        onDecline: j,
        loading: T = !1,
      }) {
        const B = (0, r(d[11]).useSafeAreaInsets)(),
          { colors: v } = (0, r(d[12]).useTheme)(),
          C = (0, n.useMemo)(() => h(v), [v]),
          k = (0, n.useRef)(new o.default.Value(320)).current;
        if (
          ((0, r(d[13]).useLiveTick)(),
          (0, n.useEffect)(() => {
            t &&
              (k.setValue(320),
              o.default
                .spring(k, { toValue: 0, useNativeDriver: !0, damping: 18, stiffness: 180 })
                .start());
          }, [t?.id, k]),
          !t)
        )
          return null;
        const S = t.expiresAt ?? Date.now() + 9e5,
          R = (0, r(d[10]).formatCountdownTo)(S),
          z = 'expired' === (0, r(d[10]).getCountdownColor)(S);
        return (0, x.jsx)(l.default, {
          visible: !0,
          transparent: !0,
          animationType: 'fade',
          statusBarTranslucent: !0,
          children: (0, x.jsx)(f.default, {
            style: C.overlay,
            children: (0, x.jsxs)(o.default.View, {
              style: [
                C.sheet,
                {
                  paddingBottom: Math.max(B.bottom, r(d[14]).spacing.lg) + r(d[14]).spacing.md,
                  transform: [{ translateY: k }],
                },
              ],
              children: [
                (0, x.jsxs)(f.default, {
                  style: C.alertBanner,
                  children: [
                    (0, x.jsx)(y, { styles: C }),
                    (0, x.jsx)(r(d[15]).Ionicons, {
                      name: 'notifications',
                      size: 18,
                      color: v.onIncoming ?? '#FFF',
                    }),
                    (0, x.jsx)(u.default, {
                      style: C.alertBannerText,
                      children: 'Incoming passenger request',
                    }),
                  ],
                }),
                (0, x.jsx)(u.default, { style: C.name, children: t.passengerName ?? 'Passenger' }),
                (0, x.jsx)(u.default, { style: C.pickup, children: t.pickup ?? 'Pickup nearby' }),
                c ? (0, x.jsx)(u.default, { style: C.metaText, children: c }) : null,
                null != b
                  ? (0, x.jsxs)(u.default, {
                      style: C.metaText,
                      children: ['GHS ', Number(b).toFixed(2), ' / seat'],
                    })
                  : null,
                (0, x.jsx)(u.default, {
                  style: [C.countdown, F(S, C)],
                  children: z ? 'Request expired' : `Respond in ${R}`,
                }),
                t.passengerPhone
                  ? (0, x.jsx)(p.default, {
                      phone: t.passengerPhone,
                      operatorName: t.passengerName ?? 'Passenger',
                      compact: !0,
                    })
                  : null,
                (0, x.jsxs)(s.default, {
                  style: [C.acceptButton, (T || z) && C.acceptDisabled],
                  onPress: w,
                  disabled: T || z,
                  children: [
                    (0, x.jsx)(r(d[15]).Ionicons, {
                      name: 'checkmark-circle',
                      size: 20,
                      color: '#FFFFFF',
                    }),
                    (0, x.jsx)(u.default, {
                      style: C.acceptText,
                      children: T ? 'Accepting\u2026' : 'Accept request',
                    }),
                  ],
                }),
                (0, x.jsx)(s.default, {
                  style: C.declineButton,
                  onPress: j,
                  disabled: T,
                  children: (0, x.jsx)(u.default, { style: C.declineText, children: 'Decline' }),
                }),
              ],
            }),
          }),
        });
      }));
    var n = r(d[1]),
      o = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = t(r(d[7])),
      p = t(r(d[8])),
      x = r(d[9]);
    function y({ styles: t }) {
      const l = (0, n.useRef)(new o.default.Value(0.4)).current;
      return (
        (0, n.useEffect)(() => {
          const t = o.default.loop(
            o.default.sequence([
              o.default.timing(l, { toValue: 1, duration: 900, useNativeDriver: !0 }),
              o.default.timing(l, { toValue: 0.35, duration: 900, useNativeDriver: !0 }),
            ])
          );
          return (t.start(), () => t.stop());
        }, [l]),
        (0, x.jsx)(o.default.View, {
          style: [t.pulseRing, { opacity: l, transform: [{ scale: l }] }],
        })
      );
    }
    function F(t, n) {
      const o = (0, r(d[10]).getCountdownColor)(t);
      return 'expired' === o
        ? n.countdownExpired
        : 'critical' === o
          ? n.countdownCritical
          : 'warning' === o
            ? n.countdownWarning
            : n.countdownOk;
    }
    const h = t =>
      c.default.create({
        overlay: { flex: 1, backgroundColor: t.overlay, justifyContent: 'flex-end' },
        sheet: {
          backgroundColor: t.surfaceElevated,
          borderTopLeftRadius: r(d[14]).radius.xl,
          borderTopRightRadius: r(d[14]).radius.xl,
          paddingHorizontal: r(d[14]).spacing.lg,
          paddingTop: r(d[14]).spacing.md,
          borderWidth: 1,
          borderColor: t.border,
        },
        alertBanner: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.sm,
          backgroundColor: t.incoming ?? '#FF5500',
          borderRadius: r(d[14]).radius.md,
          paddingHorizontal: r(d[14]).spacing.md,
          paddingVertical: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.lg,
          overflow: 'hidden',
        },
        pulseRing: {
          position: 'absolute',
          left: 8,
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: t.incomingSoft ?? '#FF7733',
        },
        alertBannerText: {
          flex: 1,
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 13,
          color: t.onIncoming ?? '#FFFFFF',
          letterSpacing: 0.2,
        },
        name: {
          fontFamily: r(d[14]).fontFamily.bold,
          fontSize: 22,
          color: t.textPrimary,
          textAlign: 'center',
          marginBottom: r(d[14]).spacing.xs,
        },
        pickup: Object.assign({}, r(d[14]).typography.body, {
          color: t.textSecondary,
          textAlign: 'center',
          marginBottom: r(d[14]).spacing.md,
        }),
        metaText: {
          fontFamily: r(d[14]).fontFamily.medium,
          fontSize: 14,
          color: t.textSecondary,
          textAlign: 'center',
        },
        countdown: {
          fontFamily: r(d[14]).fontFamily.bold,
          fontSize: 15,
          textAlign: 'center',
          marginTop: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.sm,
        },
        countdownOk: { color: t.success },
        countdownWarning: { color: t.warning },
        countdownCritical: { color: t.error },
        countdownExpired: { color: t.textMuted },
        acceptButton: {
          marginTop: r(d[14]).spacing.md,
          minHeight: 56,
          borderRadius: r(d[14]).radius.md,
          backgroundColor: t.success ?? '#00A86B',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: r(d[14]).spacing.sm,
        },
        acceptDisabled: { opacity: 0.5 },
        acceptText: { fontFamily: r(d[14]).fontFamily.bold, fontSize: 16, color: '#FFFFFF' },
        declineButton: { alignItems: 'center', paddingVertical: r(d[14]).spacing.md },
        declineText: {
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 15,
          color: t.textSecondary,
        },
      });
  },
  1768,
  [1, 5, 7, 948, 326, 26, 161, 19, 1520, 183, 1521, 572, 381, 1769, 377, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useLiveTick = function (n = 1e3) {
        const [, u] = (0, t.useState)(0);
        return void (0, t.useEffect)(() => {
          const t = setInterval(() => u(t => t + 1), n);
          return () => clearInterval(t);
        }, [n]);
      }));
    var t = r(d[0]);
  },
  1769,
  [5]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        waitingCount: s = 0,
        onInviteWaiting: n,
        inviteLoading: o = !1,
        onDismiss: h,
      }) {
        const { colors: v } = (0, r(d[10]).useTheme)(),
          j = x(v);
        return t
          ? (0, f.jsxs)(u.default, {
              style: j.card,
              children: [
                (0, f.jsxs)(u.default, {
                  style: j.liveRow,
                  children: [
                    (0, f.jsx)(y, { color: v.success ?? v.greenAccent }),
                    (0, f.jsx)(c.default, { style: j.liveTitle, children: 'Trip is live' }),
                  ],
                }),
                (0, f.jsx)(c.default, {
                  style: j.highlight,
                  children:
                    s > 0
                      ? `${s} passenger${1 === s ? '' : 's'} waiting on this route \u2014 invite them first for a quick fill.`
                      : 'Your route is visible to passengers. Reservations and queue invites will appear below.',
                }),
                r(d[11]).MATE_POST_DEPART_STEPS.map((t, s) =>
                  (0, f.jsxs)(
                    u.default,
                    {
                      style: j.stepRow,
                      children: [
                        (0, f.jsx)(u.default, {
                          style: j.stepNum,
                          children: (0, f.jsx)(c.default, {
                            style: j.stepNumText,
                            children: s + 1,
                          }),
                        }),
                        (0, f.jsx)(c.default, { style: j.stepText, children: t }),
                      ],
                    },
                    t
                  )
                ),
                (0, f.jsxs)(u.default, {
                  style: j.actions,
                  children: [
                    s > 0
                      ? (0, f.jsx)(p.default, {
                          title: o ? 'Sending invites\u2026' : `Invite all waiting (${s})`,
                          onPress: n,
                          loading: o,
                          disabled: o,
                          compact: !0,
                          noMargin: !0,
                        })
                      : null,
                    (0, f.jsx)(p.default, {
                      title: 'Got it',
                      variant: 'secondary',
                      onPress: h,
                      compact: !0,
                      noMargin: !0,
                    }),
                  ],
                }),
                s > 0
                  ? (0, f.jsx)(l.default, {
                      style: j.dismiss,
                      onPress: h,
                      children: (0, f.jsx)(c.default, {
                        style: j.dismissText,
                        children: 'Dismiss guide',
                      }),
                    })
                  : null,
              ],
            })
          : null;
      }));
    var s = r(d[1]),
      n = t(r(d[2])),
      l = t(r(d[3])),
      o = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      f = r(d[8]);
    const h = { width: 10, height: 10, borderRadius: 5 };
    function y({ color: t }) {
      const l = (0, s.useRef)(new n.default.Value(0.5)).current;
      return (
        (0, s.useEffect)(() => {
          const t = n.default.loop(
            n.default.sequence([
              n.default.timing(l, { toValue: 1, duration: 800, useNativeDriver: !0 }),
              n.default.timing(l, { toValue: 0.45, duration: 800, useNativeDriver: !0 }),
            ])
          );
          return (t.start(), () => t.stop());
        }, [l]),
        (0, f.jsx)(n.default.View, { style: [h, { backgroundColor: t, opacity: l }] })
      );
    }
    const x = t =>
      o.default.create({
        card: {
          marginHorizontal: r(d[9]).spacing.lg,
          marginBottom: r(d[9]).spacing.md,
          padding: r(d[9]).spacing.md,
          borderRadius: r(d[9]).radius.lg,
          borderWidth: 1,
          borderColor: t.primaryAlpha35 ?? t.primary,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
        },
        liveRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[9]).spacing.sm,
          marginBottom: r(d[9]).spacing.sm,
        },
        liveTitle: { fontFamily: r(d[9]).fontFamily.bold, fontSize: 15, color: t.textPrimary },
        highlight: Object.assign({}, r(d[9]).typography.caption, {
          marginBottom: r(d[9]).spacing.md,
          lineHeight: 18,
          color: t.textSecondary,
        }),
        stepRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[9]).spacing.sm,
          marginBottom: r(d[9]).spacing.sm,
        },
        stepNum: {
          width: 22,
          height: 22,
          borderRadius: 11,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.primaryAlpha12 ?? t.surfaceSoft,
        },
        stepNumText: { fontFamily: r(d[9]).fontFamily.bold, fontSize: 11, color: t.primaryLight },
        stepText: Object.assign({ flex: 1 }, r(d[9]).typography.caption, {
          lineHeight: 18,
          color: t.textSecondary,
        }),
        actions: { flexDirection: 'row', gap: r(d[9]).spacing.sm, marginTop: r(d[9]).spacing.sm },
        dismiss: {
          alignSelf: 'center',
          marginTop: r(d[9]).spacing.sm,
          paddingVertical: r(d[9]).spacing.xs,
        },
        dismissText: { fontFamily: r(d[9]).fontFamily.medium, fontSize: 13, color: t.textMuted },
      });
  },
  1770,
  [1, 5, 7, 326, 26, 161, 19, 672, 183, 377, 381, 1705]
);
