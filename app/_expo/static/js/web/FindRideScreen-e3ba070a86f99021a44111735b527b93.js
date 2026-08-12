__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[34]).useNavigation)(),
          u = (0, r(d[34]).useRoute)(),
          { user: H, profile: G } = (0, r(d[35]).useAuth)(),
          { colors: V } = (0, r(d[36]).useTheme)(),
          { t: W } = (0, r(d[37]).useLanguage)(),
          K = (0, o.useMemo)(() => z(V), [V]),
          { prefs: Y, patch: U } = (0, r(d[38]).useUserPreferences)(H?.id),
          { showToast: Q } = (0, r(d[39]).useToast)(),
          { showOnboardingBanners: J, dismissTips: X } = (0, r(d[40]).useTransportFeedTips)(H),
          { isOffline: Z } = (0, r(d[41]).useNetworkStatus)(),
          ee = (0, o.useRef)(new c.default.Value(1)).current,
          [te, oe] = (0, o.useState)(''),
          [ie, re] = (0, o.useState)(''),
          [se, ne] = (0, o.useState)(!1),
          {
            trotroTrips: ae,
            trotroRideTrips: le,
            loading: de,
            refresh: ue,
            fromFallback: ce,
            error: me,
          } = (0, r(d[42]).useLiveTrips)({ enabled: se }),
          [pe, ge] = (0, o.useState)(r(d[33]).TRANSPORT_MODES.ALL),
          [fe, ye] = (0, o.useState)(!1),
          [Te, Re] = (0, o.useState)(null),
          [he, Se] = (0, o.useState)(null),
          [Oe, ve] = (0, o.useState)(!1),
          [xe, De] = (0, o.useState)(!1),
          [je, Me] = (0, o.useState)(!1),
          [Ee, Pe] = (0, o.useState)(!1),
          [Ae, be] = (0, o.useState)(!1),
          [Ce, we] = (0, o.useState)(!1),
          [Le, Be] = (0, o.useState)('list');
        (0, o.useEffect)(() => {
          (u.params?.presetOrigin && (oe(u.params.presetOrigin), ne(!1)),
            u.params?.presetDestination && (re(u.params.presetDestination), ne(!1)),
            u.params?.presetTransportMode && ge(u.params.presetTransportMode));
        }, [u.params?.presetOrigin, u.params?.presetDestination, u.params?.presetTransportMode]);
        const Ie = (0, o.useMemo)(() => (0, r(d[43]).calculateTrustScoreFromProfile)(G), [G]),
          {
            queueEntry: ke,
            inQueue: _e,
            matchesRoute: Ne,
            refresh: qe,
            leaveQueue: Fe,
          } = (0, r(d[44]).usePassengerQueue)(H?.id, te, ie, Ie),
          {
            locations: $e,
            allLocations: ze,
            loading: He,
            error: Ge,
          } = (0, r(d[45]).useDriverLocations)(te, ie, { enabled: se }),
          Ve = (0, o.useMemo)(
            () =>
              (0, r(d[46]).resolvePassengerPickupCoords)({
                originLabel: te,
                myLocation: Y.myLocation,
              }),
            [te, Y.myLocation]
          ),
          We = Y.myLocation?.label?.split(',')[0]?.trim() ?? null,
          Ke = te && ie ? `${te} \u2192 ${ie}` : '',
          Ye = (0, o.useMemo)(() => (0, r(d[46]).resolveLocationCoords)(ie), [ie]),
          Ue = (0, o.useMemo)(
            () =>
              se && Ve && Ye
                ? [
                    Object.assign({}, Ve, { type: 'pickup' }),
                    Object.assign({}, Ye, { type: 'dropoff' }),
                  ]
                : [],
            [se, Ve, Ye]
          ),
          Qe = (0, w.default)(Ue, { corridor: Ke || void 0 }),
          Je = (0, o.useMemo)(
            () =>
              null != Qe.summary?.distanceKm
                ? {
                    distanceKm: Math.round(10 * Qe.summary.distanceKm) / 10,
                    timeMin: Qe.summary.durationMin ?? Qe.summary.timeMin ?? 25,
                  }
                : (0, r(d[47]).resolveRouteMetrics)(te, ie),
            [Qe.summary, te, ie]
          );
        (0, o.useEffect)(() => {
          se &&
            (ee.setValue(0),
            c.default.timing(ee, { toValue: 1, duration: 220, useNativeDriver: !0 }).start());
        }, [pe, Je.distanceKm, Je.timeMin, se, ee]);
        const Xe = (0, o.useMemo)(() => {
            if (!se || !te.trim() || !ie.trim()) return '';
            const t = (0, r(d[47]).compareCorridorPricing)(te, ie, { routeMetrics: Je }),
              o = (0, r(d[48]).calculateParcelDeliveryFare)(t.distanceKm, 'small');
            switch (pe) {
              case r(d[33]).TRANSPORT_MODES.TROTRO:
                return `Trotro \xb7 GHS ${t.trotroSeat.toFixed(2)} seat \xb7 ${t.distanceKm} km \xb7 reserve or join queue`;
              case r(d[33]).TRANSPORT_MODES.TROTRORIDE:
                return `TrotroRide \xb7 GHS ${t.trotroRideSeat.toFixed(2)}/seat \xb7 live ETA \xb7 optional fare boost`;
              case r(d[33]).TRANSPORT_MODES.DELIVERY:
                return `Delivery \xb7 parcel from GHS ${o.deliveryFee.toFixed(2)} \xb7 ${t.distanceKm} km corridor`;
              default:
                return `${t.distanceKm} km \xb7 ~${t.timeMin} min \xb7 save vs ride-hail from GHS ${t.bestTrotroOs.toFixed(2)}`;
            }
          }, [se, te, ie, pe, Je]),
          Ze = (0, o.useMemo)(() => {
            const t = new Set(Y.favoriteRouteIds ?? []);
            return r(d[49])
              .TROTRO_ROUTES.filter(o => t.has(o.id))
              .map(t => ({
                id: t.id,
                origin: t.origin,
                destination: t.destination,
                fare: Math.round(t.baseFare),
              }));
          }, [Y.favoriteRouteIds]),
          et = (0, o.useCallback)(
            async ({ origin: t = te, destination: o = ie, transportMode: s = pe } = {}) => {
              if (!H?.id) return;
              const n = (0, r(d[50]).addRecentDestination)(Y.recentDestinations ?? [], {
                origin: t,
                destination: o,
                transportMode: s,
              });
              await U({ recentDestinations: n });
            },
            [H?.id, te, ie, pe, Y.recentDestinations, U]
          ),
          tt = (0, o.useCallback)(
            async t => {
              const o = (0, r(d[50]).removeRecentDestination)(Y.recentDestinations ?? [], t);
              (await U({ recentDestinations: o }),
                Q({ type: 'info', title: 'Removed', message: 'Recent destination removed.' }));
            },
            [Y.recentDestinations, U, Q]
          ),
          ot = (0, o.useMemo)(
            () =>
              (0, r(d[51]).filterBookableTrips)([
                ...ae.map(t =>
                  Object.assign({}, t, {
                    transportMode: t.transportMode ?? r(d[33]).TRANSPORT_MODES.TROTRO,
                  })
                ),
                ...le.map(t =>
                  Object.assign({}, t, {
                    transportMode: t.transportMode ?? r(d[33]).TRANSPORT_MODES.TROTRORIDE,
                  })
                ),
              ]).filter(r(d[52]).isBookableLiveTrip),
            [ae, le]
          ),
          it = (0, o.useMemo)(() => (0, r(d[53]).filterTripsByRoute)(ot, te, ie), [ot, te, ie]),
          rt = (0, o.useMemo)(
            () => (pe === r(d[33]).TRANSPORT_MODES.DELIVERY ? [] : it.filter(t => F(t, pe))),
            [it, pe]
          ),
          st = (0, o.useMemo)(
            () => (0, r(d[54]).mergeMapLocations)($e, (0, r(d[54]).tripsToMapLocations)(rt)),
            [$e, rt]
          ),
          nt = (0, o.useMemo)(() => {
            if (!se) return [];
            if (pe !== r(d[33]).TRANSPORT_MODES.ALL)
              return 0 === rt.length
                ? []
                : [{ key: pe, title: (0, r(d[33]).getTransportSectionTitle)(pe), data: rt }];
            const t = new Map();
            return (
              rt.forEach(o => {
                const s = o.transportMode ?? o.type ?? 'other';
                (t.has(s) || t.set(s, []), t.get(s).push(o));
              }),
              [...t.entries()].map(([t, o]) => ({
                key: t,
                title: (0, r(d[33]).getTransportSectionTitle)(t),
                data: o,
              }))
            );
          }, [rt, pe, se]),
          at = pe === r(d[33]).TRANSPORT_MODES.DELIVERY,
          lt = at || nt.length > 0,
          dt = (0, o.useCallback)(
            t =>
              Z
                ? (Q({
                    type: 'error',
                    title: 'Offline',
                    message: 'Connect to the internet to book a ride.',
                  }),
                  !1)
                : !!(0, r(d[52]).isBookableLiveTrip)(t) ||
                  (Q({
                    type: 'info',
                    title: 'Not available live',
                    message: ce
                      ? 'Live trips are loading. Pull to refresh when mates are online.'
                      : 'This vehicle is not available for booking right now.',
                  }),
                  !1),
            [Z, ce, Q]
          ),
          ut = async t => {
            if (
              (t?.origin && oe(t.origin),
              t?.destination && re(t.destination),
              t?.transportMode && 'queue' !== t.transportMode
                ? ge(t.transportMode)
                : 'request_trotroride' === t?.suggestedAction &&
                  ge(r(d[33]).TRANSPORT_MODES.TROTRORIDE),
              'request_trotroride' === t?.suggestedAction)
            ) {
              const o = t.origin ?? te,
                s = t.destination ?? ie;
              return (
                o && oe(o),
                s && re(s),
                ge(r(d[33]).TRANSPORT_MODES.TROTRORIDE),
                ne(!0),
                void (await mt(null, t.fareBoostGhs ?? 0, { origin: o, destination: s }))
              );
            }
            if ('join_shared' === t?.suggestedAction)
              return (
                ge(r(d[33]).TRANSPORT_MODES.TROTRORIDE),
                t?.origin && oe(t.origin),
                t?.destination && re(t.destination),
                ne(!0),
                ue(),
                void Q({
                  type: 'info',
                  title: 'Shared rides',
                  message: 'Look for "Join shared ride" cards below to split the fare.',
                })
              );
            (t?.origin &&
              t?.destination &&
              (ne(!0),
              ue(),
              Q({
                type: 'success',
                title: 'Route ready',
                message:
                  t.fareBoostGhs > 0
                    ? `${t.origin} \u2192 ${t.destination} (+GHS ${t.fareBoostGhs} boost suggested)`
                    : `${t.origin} \u2192 ${t.destination}`,
              })),
              ('join_queue' !== t?.suggestedAction && 'queue' !== t?.transportMode) ||
                (await gt('queue' !== t?.transportMode ? t.transportMode : null)));
          },
          ct = (0, r(d[55]).resolvePublicPassengerName)(G, Y.privacy),
          mt = async (o, s = 0, n = null) => {
            const l = n?.origin ?? te,
              u = n?.destination ?? ie;
            if (!H?.id)
              return void Q({
                type: 'info',
                title: 'Sign in required',
                message: 'Please sign in to request a ride.',
              });
            if (!l.trim() || !u.trim())
              return void Q({
                type: 'info',
                title: 'Pick your route',
                message: 'Choose where you are and where you are going.',
              });
            if (Z)
              return void Q({
                type: 'error',
                title: 'Offline',
                message: 'Connect to the internet to request a ride.',
              });
            const { data: c, error: p } = await (0, r(d[56]).requestTrotroRide)({
              passengerId: H.id,
              passengerName: ct,
              trip: o,
              pickup: l,
              dropoff: u,
              fareBoostGhs: s,
            });
            if ((De(!1), Se(null), p))
              return void Q({ type: 'error', title: 'Request failed', message: p.message });
            const f = s > 0 ? ` (+GHS ${s} boost for faster match)` : '',
              y = `${l} \u2192 ${u}`,
              T = o
                ? (0, r(d[57]).resolvePickupEta)({
                    trip: o,
                    pickupCoords: Ve,
                    driverLocations: ze,
                    myLocation: Y.myLocation,
                    originLabel: te,
                  })
                : null;
            (await (0, r(d[58]).notifyBookingConfirmed)(
              o?.route ?? y,
              T?.etaMin ?? o?.pickupEta ?? 5,
              H?.id
            ),
              Q({
                type: 'success',
                title: 'Ride requested',
                message: c?.assigned_driver_id
                  ? `Driver notified for ${y}${f}. Check My Trips.`
                  : `Request sent for ${y}${f}. A driver will accept shortly.`,
              }),
              await et({
                origin: l,
                destination: u,
                transportMode: r(d[33]).TRANSPORT_MODES.TROTRORIDE,
              }),
              await ue(),
              (0, r(d[59]).navigateToRootScreen)(t, r(d[49]).ROUTES.TR_PASSENGER_RIDE));
          },
          pt = async () => {
            te.trim() && ie.trim()
              ? (ge(r(d[33]).TRANSPORT_MODES.TROTRORIDE), await mt(null, 0))
              : Q({
                  type: 'info',
                  title: 'Pick your route',
                  message: 'Choose where you are and where you are going.',
                });
          },
          gt = (0, o.useCallback)(
            async (t = null) => {
              if (!Ee)
                if (H?.id)
                  if (te.trim() && ie.trim() && te.trim() !== ie.trim())
                    if (Z)
                      Q({
                        type: 'error',
                        title: 'Offline',
                        message: 'Connect to the internet to join the waiting queue.',
                      });
                    else if (_e && Ne)
                      Q({
                        type: 'info',
                        title: 'Already in queue',
                        message: `You're already waiting for ${ke?.route ?? Ke}.`,
                      });
                    else {
                      Pe(!0);
                      try {
                        if (_e && !Ne) {
                          const { error: t } = await Fe();
                          if (t)
                            return void Q({
                              type: 'error',
                              title: 'Could not switch queue',
                              message: t.message,
                            });
                        }
                        const { data: o, error: s } = await (0,
                        r(d[60], '../../services/queues').joinWaitingQueue)(H.id, te, ie, {
                          transportMode: t,
                          trustScore: Ie,
                        });
                        if (s)
                          return void Q({
                            type: 'error',
                            title: 'Queue error',
                            message: s.message,
                          });
                        (await qe(),
                          await (0, r(d[58]).notifyQueueJoined)(te, ie, H?.id),
                          Q({
                            type: 'success',
                            title: 'Joined queue',
                            message: o?.queue_position
                              ? `You are #${o.queue_position} in line for ${Ke}.`
                              : `We will notify you when a ride is available for ${Ke}.`,
                          }));
                      } catch (t) {
                        Q({
                          type: 'error',
                          title: 'Queue error',
                          message: t?.message ?? 'Could not join the queue. Try again.',
                        });
                      } finally {
                        Pe(!1);
                      }
                    }
                  else
                    Q({
                      type: 'info',
                      title: 'Pick your route',
                      message: 'Choose where you are and where you are going.',
                    });
                else
                  Q({
                    type: 'info',
                    title: 'Sign in required',
                    message: 'Sign in to join the waiting queue.',
                  });
            },
            [Ee, H?.id, te, ie, Z, _e, Ne, ke?.route, Ke, Ie, Fe, qe, Q]
          ),
          ft = async () => {
            if (je) return;
            Me(!0);
            const { error: t } = await Fe();
            (Me(!1),
              t
                ? Q({ type: 'error', title: 'Could not leave queue', message: t.message })
                : (await qe(),
                  Q({
                    type: 'info',
                    title: 'Left queue',
                    message: 'You are no longer waiting for this route.',
                  })));
          },
          yt = (0, q.jsx)(p.default, {
            queueEntry: ke,
            trustScore: Ie,
            onLeaveQueue: ft,
            onViewTrips: () =>
              (0, r(d[59]).navigateToMainTab)(t, r(d[49]).ROUTES.PASSENGER_MY_TRIPS),
            leaving: je,
            routeMismatch: _e && !Ne,
          }),
          Tt = (0, o.useCallback)(
            async t => {
              await gt(t.transportMode ?? t.type ?? null);
            },
            [gt]
          ),
          Rt = (0, o.useCallback)(
            t => {
              dt(t) && (Re(t), ve(!0));
            },
            [dt]
          ),
          ht = (0, o.useCallback)(
            t => {
              dt(t) &&
                (Z
                  ? Q({
                      type: 'error',
                      title: 'Offline',
                      message: 'Connect to the internet to request a ride.',
                    })
                  : (Se(t), De(!0)));
            },
            [dt, Z, Q]
          ),
          St = (0, o.useCallback)(
            t => {
              const o = $(t);
              return 'trotro' === o
                ? (0, q.jsx)(O.default, {
                    trip: t,
                    pickupCoords: Ve,
                    driverLocations: ze,
                    myLocation: Y.myLocation,
                    originLabel: te,
                    onReserve: Rt,
                  })
                : 'trotroride' === o
                  ? (0, q.jsx)(v.default, {
                      trip: t,
                      pickupCoords: Ve,
                      driverLocations: ze,
                      myLocation: Y.myLocation,
                      originLabel: te,
                      onBook: ht,
                    })
                  : (0, q.jsx)(x.default, {
                      trip: t,
                      pickupCoords: Ve,
                      driverLocations: ze,
                      myLocation: Y.myLocation,
                      originLabel: te,
                      onBook: Tt,
                    });
            },
            [Ve, ze, Y.myLocation, te, Rt, ht, Tt]
          );
        return (0, q.jsxs)(y.default, {
          noPadding: !0,
          gradientHeader: !0,
          testID: 'passenger-find-ride',
          children: [
            se
              ? (0, q.jsxs)(n.default, {
                  style: K.resultsBody,
                  children: [
                    (0, q.jsxs)(n.default, {
                      style: K.resultsToolbar,
                      children: [
                        (0, q.jsxs)(n.default, {
                          style: K.resultsRouteCol,
                          children: [
                            (0, q.jsx)(s.default, {
                              style: K.resultsKicker,
                              children: 'Your route',
                            }),
                            (0, q.jsx)(s.default, {
                              style: K.resultsRoute,
                              numberOfLines: 1,
                              children: Ke,
                            }),
                          ],
                        }),
                        (0, q.jsxs)(l.default, {
                          style: K.changeRouteBtn,
                          onPress: () => {
                            ne(!1);
                          },
                          hitSlop: 8,
                          children: [
                            (0, q.jsx)(s.default, { style: K.changeRouteText, children: 'Change' }),
                            (0, q.jsx)(r(d[61]).Ionicons, {
                              name: 'chevron-forward',
                              size: 14,
                              color: V.primaryLight,
                            }),
                          ],
                        }),
                        (0, q.jsx)(l.default, {
                          style: K.aiFab,
                          onPress: () => be(!0),
                          hitSlop: 8,
                          children: (0, q.jsx)(r(d[61]).Ionicons, {
                            name: 'sparkles',
                            size: 18,
                            color: V.onGold ?? '#000000',
                          }),
                        }),
                      ],
                    }),
                    (0, q.jsxs)(n.default, {
                      style: K.modeToolbar,
                      children: [
                        (0, q.jsx)(j.default, { value: pe, onChange: ge, compact: !0 }),
                        (0, q.jsxs)(l.default, {
                          style: K.moreModesBtn,
                          onPress: () => ye(t => !t),
                          hitSlop: 8,
                          children: [
                            (0, q.jsx)(s.default, {
                              style: K.moreModesText,
                              children: fe ? 'Hide other modes' : 'Other transport modes',
                            }),
                            (0, q.jsx)(r(d[61]).Ionicons, {
                              name: fe ? 'chevron-up' : 'chevron-down',
                              size: 14,
                              color: V.primaryLight,
                            }),
                          ],
                        }),
                      ],
                    }),
                    Xe
                      ? (0, q.jsx)(c.default.View, {
                          style: [K.modeSummaryWrap, { opacity: ee }],
                          children: (0, q.jsx)(s.default, {
                            style: K.modeSummaryText,
                            children: Xe,
                          }),
                        })
                      : null,
                    fe ? (0, q.jsx)(D.default, { value: pe, onChange: ge, compact: !0 }) : null,
                    (0, q.jsx)(n.default, {
                      style: K.viewToggle,
                      children: (0, q.jsx)(_.default, {
                        options: [
                          { label: 'List', value: 'list' },
                          { label: 'Map', value: 'map' },
                        ],
                        value: Le,
                        onChange: Be,
                      }),
                    }),
                    (0, q.jsxs)(c.default.View, {
                      style: { opacity: ee },
                      children: [
                        J && Ke && pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                          ? (0, q.jsxs)(S.default, {
                              elevated: !0,
                              style: K.trTipsCard,
                              children: [
                                (0, q.jsxs)(n.default, {
                                  style: K.trTipsHeader,
                                  children: [
                                    (0, q.jsx)(s.default, {
                                      style: K.trTipsTitle,
                                      children: 'TrotroRide tips',
                                    }),
                                    (0, q.jsxs)(n.default, {
                                      style: K.trTipsActions,
                                      children: [
                                        (0, q.jsxs)(l.default, {
                                          onPress: () => we(!0),
                                          style: K.trTipsAiBtn,
                                          hitSlop: 8,
                                          children: [
                                            (0, q.jsx)(r(d[61]).Ionicons, {
                                              name: 'sparkles',
                                              size: 16,
                                              color: V.goldDeep ?? V.gold ?? '#A6851A',
                                            }),
                                            (0, q.jsx)(s.default, {
                                              style: K.trTipsAiText,
                                              children: 'Ask AI',
                                            }),
                                          ],
                                        }),
                                        (0, q.jsx)(l.default, {
                                          onPress: X,
                                          hitSlop: 10,
                                          accessibilityLabel: 'Dismiss tips',
                                          children: (0, q.jsx)(r(d[61]).Ionicons, {
                                            name: 'close',
                                            size: 20,
                                            color: V.textMuted,
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                r(d[64]).PASSENGER_TROTRORIDE_TIPS.map(t =>
                                  (0, q.jsxs)(
                                    s.default,
                                    { style: K.trTipLine, children: ['\xb7 ', t] },
                                    t
                                  )
                                ),
                              ],
                            })
                          : null,
                        J && Ke
                          ? (0, q.jsx)(B.default, {
                              origin: te,
                              destination: ie,
                              mode: pe,
                              routeMetrics: Je,
                              onDismiss: X,
                            })
                          : null,
                        at && Ke
                          ? (0, q.jsxs)(S.default, {
                              elevated: !0,
                              style: { marginBottom: r(d[63]).spacing.md },
                              children: [
                                (0, q.jsx)(s.default, {
                                  style: K.resultsKicker,
                                  children: W('delivery.deliveryCardTitle'),
                                }),
                                (0, q.jsx)(s.default, {
                                  style: [K.resultsRoute, { marginBottom: r(d[63]).spacing.sm }],
                                  children: W('delivery.deliveryCardBody'),
                                }),
                                (0, q.jsx)(s.default, {
                                  style: [K.modeSummaryText, { marginBottom: r(d[63]).spacing.sm }],
                                  children: Xe,
                                }),
                                (0, q.jsx)(h.default, {
                                  title: W('delivery.orderFood'),
                                  onPress: () =>
                                    (0, r(d[59]).navigateToRootScreen)(
                                      t,
                                      r(d[49]).ROUTES.FOOD_VENDORS
                                    ),
                                  compact: !0,
                                }),
                                (0, q.jsx)(n.default, { style: { height: r(d[63]).spacing.sm } }),
                                (0, q.jsx)(h.default, {
                                  title: W('delivery.sendParcel'),
                                  variant: 'secondary',
                                  onPress: () =>
                                    (0, r(d[59]).navigateToRootScreen)(
                                      t,
                                      r(d[49]).ROUTES.SEND_PARCEL
                                    ),
                                  compact: !0,
                                }),
                              ],
                            })
                          : null,
                      ],
                    }),
                    _e ? yt : null,
                    (0, q.jsx)(C.default, { fromFallback: ce, error: me, onRetry: ue }),
                    'map' === Le
                      ? (0, q.jsx)(b.default, {
                          origin: te,
                          destination: ie,
                          height: 360,
                          locations: st,
                          loading: He,
                          error: Ge,
                          routeCoordinates: Qe.coordinates,
                          routeSummary: Qe.summary,
                          pickupCoordinate: Ve,
                          destinationCoordinate: Ye,
                        })
                      : null,
                    'list' !== Le || !de || lt || at
                      ? 'list' === Le && lt && !at
                        ? (0, q.jsx)(N.default, {
                            style: K.tripList,
                            sections: nt,
                            renderTrip: St,
                            contentContainerStyle: K.listContent,
                          })
                        : 'list' !== Le || at
                          ? null
                          : (0, q.jsx)(n.default, {
                              style: K.emptyWrap,
                              children: (0, q.jsx)(A.default, {
                                icon: _e ? 'people-outline' : 'navigate-outline',
                                title: _e
                                  ? 'Waiting in queue'
                                  : pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                                    ? 'No TrotroRide drivers listed'
                                    : pe === r(d[33]).TRANSPORT_MODES.TROTRO
                                      ? 'No trotro seats listed'
                                      : 'No rides on this corridor',
                                message: _e
                                  ? `You're queued for ${ke?.route ?? Ke}. Mates see your demand and can invite you when a seat opens.`
                                  : pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                                    ? `No shared rides for ${Ke}. Send a request \u2014 drivers see live ETA and can accept with optional fare boost.`
                                    : pe === r(d[33]).TRANSPORT_MODES.TROTRO
                                      ? `No mates listed on ${Ke}. Reserve when a vehicle appears, or join the station queue for the next departure.`
                                      : `No vehicles free on ${Ke}. Join this corridor queue \u2014 mates fill seats from demand, not by chance.`,
                                actionLabel: _e
                                  ? je
                                    ? 'Leaving\u2026'
                                    : 'Leave queue'
                                  : pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                                    ? 'Request TrotroRide'
                                    : Ee
                                      ? 'Joining\u2026'
                                      : 'Join this corridor queue',
                                actionLoading: !_e && Ee,
                                onAction: _e
                                  ? ft
                                  : pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                                    ? pt
                                    : () => gt(pe !== r(d[33]).TRANSPORT_MODES.ALL ? pe : null),
                                actionTestID: 'passenger-join-queue',
                                secondaryActionLabel:
                                  _e || pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                                    ? null
                                    : 'Or request TrotroRide',
                                onSecondaryAction:
                                  _e || pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE ? null : pt,
                                children:
                                  _e || pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                                    ? null
                                    : (0, q.jsx)(f.default, {
                                        origin: te,
                                        destination: ie,
                                        passengerId: H?.id,
                                        trustScore: Ie,
                                        navigation: t,
                                        onVerifyPress: () =>
                                          (0, r(d[59]).navigateToMainTab)(
                                            t,
                                            r(d[49]).ROUTES.PASSENGER_PROFILE
                                          ),
                                      }),
                              }),
                            })
                      : (0, q.jsx)(n.default, {
                          style: K.skeletonWrap,
                          children: (0, q.jsx)(r(d[65]).SkeletonList, { count: 4 }),
                        }),
                  ],
                })
              : (0, q.jsxs)(n.default, {
                  style: K.planningBody,
                  children: [
                    (0, q.jsx)(T.default, {
                      subtitle: 'Trotro & TrotroRide \xb7 Kumasi corridors',
                    }),
                    (0, q.jsxs)(l.default, {
                      style: K.aiButton,
                      onPress: () => be(!0),
                      children: [
                        (0, q.jsx)(r(d[61]).Ionicons, {
                          name: 'sparkles',
                          size: 18,
                          color: V.onGold ?? '#000000',
                        }),
                        (0, q.jsx)(s.default, {
                          style: K.aiButtonText,
                          children: 'Ask AI where to go',
                        }),
                      ],
                    }),
                    (0, q.jsx)(R.default, { label: r(d[62]).DEFAULT_LIVE_CORRIDOR }),
                    (0, q.jsx)(L.default, {
                      selectedOrigin: te.trim(),
                      selectedDestination: ie.trim(),
                      onSelectRoute: ({ origin: t, destination: o }) => {
                        (oe(t), re(o), ne(!1));
                      },
                    }),
                    pe === r(d[33]).TRANSPORT_MODES.TROTRORIDE
                      ? (0, q.jsxs)(l.default, {
                          style: K.trAiButton,
                          onPress: () => we(!0),
                          children: [
                            (0, q.jsx)(r(d[61]).Ionicons, {
                              name: 'car-sport',
                              size: 18,
                              color: V.goldDeep ?? V.gold ?? '#A6851A',
                            }),
                            (0, q.jsx)(s.default, {
                              style: K.trAiButtonText,
                              children: 'Ask TrotroRide AI',
                            }),
                          ],
                        })
                      : null,
                    pe === r(d[33]).TRANSPORT_MODES.DELIVERY
                      ? (0, q.jsxs)(S.default, {
                          elevated: !0,
                          style: { marginBottom: r(d[63]).spacing.md },
                          children: [
                            (0, q.jsx)(s.default, {
                              style: K.resultsKicker,
                              children: W('delivery.deliveryCardTitle'),
                            }),
                            (0, q.jsx)(s.default, {
                              style: [K.resultsRoute, { marginBottom: r(d[63]).spacing.sm }],
                              children: W('delivery.deliveryCardBody'),
                            }),
                            (0, q.jsx)(h.default, {
                              title: W('delivery.orderFood'),
                              onPress: () =>
                                (0, r(d[59]).navigateToRootScreen)(t, r(d[49]).ROUTES.FOOD_VENDORS),
                              compact: !0,
                            }),
                            (0, q.jsx)(n.default, { style: { height: r(d[63]).spacing.sm } }),
                            (0, q.jsx)(h.default, {
                              title: W('delivery.sendParcel'),
                              variant: 'secondary',
                              onPress: () =>
                                (0, r(d[59]).navigateToRootScreen)(t, r(d[49]).ROUTES.SEND_PARCEL),
                              compact: !0,
                            }),
                          ],
                        })
                      : null,
                    (0, q.jsx)(M.default, {
                      origin: te,
                      destination: ie,
                      onOriginChange: t => {
                        (oe(t), t.trim() || re(''), ne(!1));
                      },
                      onDestinationChange: t => {
                        (re(t), ne(!1));
                      },
                      onSwap: () => {
                        (oe(ie), re(te), ne(!1));
                      },
                      onSearch: () => {
                        te.trim() && ie.trim() && te !== ie
                          ? (ne(!0), ue())
                          : Q({
                              type: 'info',
                              title: 'Pick your route',
                              message: 'Choose where you are and where you are going.',
                            });
                      },
                      transportMode: pe,
                      onTransportModeChange: ge,
                      onRequestTrotroRide: pt,
                      onQuickRoute: () => {
                        (ne(!0), ue());
                      },
                      myLocationLabel: We,
                      savedPlaces: Y.savedPlaces,
                      favoriteRoutes: Ze,
                      favoriteRouteIds: Y.favoriteRouteIds ?? [],
                      recentDestinations: Y.recentDestinations ?? [],
                      onRemoveFavorite: async t => {
                        const o = (Y.favoriteRouteIds ?? []).filter(o => o !== t);
                        (await U({ favoriteRouteIds: o }),
                          Q({
                            type: 'info',
                            title: 'Removed',
                            message: 'Route removed from your favourites.',
                          }));
                      },
                      onRemoveRecentDestination: tt,
                    }),
                    _e ? yt : null,
                  ],
                }),
            (0, q.jsx)(E.default, {
              visible: Oe,
              trip: Te,
              passengerId: H?.id,
              passengerName: ct,
              onClose: () => {
                (ve(!1), Re(null));
              },
              onReserved: async () => {
                (await et({ transportMode: r(d[33]).TRANSPORT_MODES.TROTRO }), ue());
              },
            }),
            (0, q.jsx)(P.default, {
              visible: xe,
              trip: he,
              origin: te,
              destination: ie,
              onClose: () => {
                (De(!1), Se(null));
              },
              onConfirm: async (t = {}) => {
                const o = he;
                if (H?.id) {
                  if ('shared_ride' === o?.listingType && (o?.rideId ?? o?.dbId)) {
                    const { data: t, error: s } = await (0, r(d[56]).joinTrotroRide)({
                      passengerId: H.id,
                      passengerName: ct,
                      trip: o,
                      pickup: te,
                      dropoff: ie,
                    });
                    return (
                      De(!1),
                      Se(null),
                      s
                        ? void Q({
                            type: 'error',
                            title: 'Could not join ride',
                            message: s.message,
                          })
                        : (Q({
                            type: 'success',
                            title: 'Joined shared ride',
                            message: `You're on ${Ke}. Check My Trips for pickup updates.`,
                          }),
                          await et(),
                          void ue())
                    );
                  }
                  await mt(o, t.fareBoostGhs ?? 0);
                }
              },
            }),
            (0, q.jsx)(I.default, { visible: Ae, onClose: () => be(!1), onApplyPlan: ut }),
            (0, q.jsx)(k.default, {
              visible: Ce,
              onClose: () => we(!1),
              onApplyPlan: ut,
              origin: te,
              destination: ie,
            }),
          ],
        });
      }));
    var o = r(d[1]),
      s = t(r(d[2])),
      n = t(r(d[3])),
      l = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      p = t(r(d[7])),
      f = t(r(d[8])),
      y = t(r(d[9])),
      T = t(r(d[10])),
      R = t(r(d[11])),
      h = t(r(d[12])),
      S = t(r(d[13])),
      O = t(r(d[14])),
      v = t(r(d[15])),
      x = t(r(d[16])),
      D = t(r(d[17])),
      j = t(r(d[18])),
      M = t(r(d[19])),
      E = t(r(d[20])),
      P = t(r(d[21])),
      A = t(r(d[22])),
      b = t(r(d[23])),
      C = t(r(d[24])),
      w = t(r(d[25])),
      L = t(r(d[26])),
      B = t(r(d[27])),
      I = t(r(d[28])),
      k = t(r(d[29])),
      _ = t(r(d[30])),
      N = t(r(d[31])),
      q = r(d[32]);
    function F(t, o) {
      if (o === r(d[33]).TRANSPORT_MODES.ALL) return !0;
      return (t.transportMode ?? t.type) === o;
    }
    function $(t) {
      const o = t.transportMode ?? t.type;
      return o === r(d[33]).TRANSPORT_MODES.TROTRO || 'trotro' === t.type
        ? 'trotro'
        : o === r(d[33]).TRANSPORT_MODES.TROTRORIDE || 'trotroride' === t.type
          ? 'trotroride'
          : 'african';
    }
    const z = t =>
      u.default.create({
        planningBody: { flex: 1 },
        aiButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: r(d[63]).spacing.sm,
          marginHorizontal: r(d[63]).layout.screenPadding,
          marginBottom: r(d[63]).spacing.md,
          paddingVertical: r(d[63]).spacing.sm,
          paddingHorizontal: r(d[63]).spacing.md,
          borderRadius: r(d[63]).radius.md,
          backgroundColor: t.gold ?? '#C9A227',
        },
        aiButtonText: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 15,
          color: t.onGold ?? '#000000',
        },
        trAiButton: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: r(d[63]).spacing.sm,
          marginHorizontal: r(d[63]).layout.screenPadding,
          marginBottom: r(d[63]).spacing.md,
          paddingVertical: r(d[63]).spacing.sm,
          paddingHorizontal: r(d[63]).spacing.md,
          borderRadius: r(d[63]).radius.md,
          borderWidth: 1,
          borderColor: t.gold ?? '#C9A227',
          backgroundColor: t.goldAlpha12 ?? 'rgba(201, 162, 39, 0.14)',
        },
        trAiButtonText: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 14,
          color: t.goldDeep ?? t.gold ?? '#A6851A',
        },
        trTipsCard: {
          marginHorizontal: r(d[63]).layout.screenPadding,
          marginBottom: r(d[63]).spacing.sm,
        },
        trTipsHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[63]).spacing.sm,
        },
        trTipsActions: { flexDirection: 'row', alignItems: 'center', gap: r(d[63]).spacing.sm },
        trTipsTitle: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 14,
          color: t.textPrimary,
        },
        trTipsAiBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
        trTipsAiText: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 13,
          color: t.goldDeep ?? t.gold ?? '#A6851A',
        },
        trTipLine: Object.assign({}, r(d[63]).typography.caption, {
          lineHeight: 20,
          marginBottom: r(d[63]).spacing.xs,
        }),
        aiFab: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: t.gold ?? '#C9A227',
          alignItems: 'center',
          justifyContent: 'center',
        },
        resultsBody: { flex: 1 },
        tripList: { flex: 1 },
        resultsToolbar: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: r(d[63]).layout.screenPadding,
          paddingTop: r(d[63]).spacing.sm,
          paddingBottom: r(d[63]).spacing.md,
          borderBottomWidth: u.default.hairlineWidth,
          borderBottomColor: t.borderSoft,
          marginBottom: r(d[63]).spacing.sm,
          gap: r(d[63]).spacing.md,
        },
        modeToolbar: {
          paddingHorizontal: r(d[63]).layout.screenPadding,
          marginBottom: r(d[63]).spacing.sm,
          gap: r(d[63]).spacing.sm,
        },
        modeSummaryWrap: {
          paddingHorizontal: r(d[63]).layout.screenPadding,
          marginBottom: r(d[63]).spacing.sm,
        },
        modeSummaryText: {
          fontFamily: r(d[63]).fontFamily.medium,
          fontSize: 13,
          lineHeight: 18,
          color: t.textSecondary,
        },
        viewToggle: {
          marginHorizontal: r(d[63]).layout.screenPadding,
          marginBottom: r(d[63]).spacing.md,
        },
        moreModesBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: 4,
          paddingVertical: r(d[63]).spacing.xs,
        },
        moreModesText: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 14,
          color: t.accentText,
        },
        resultsRouteCol: { flex: 1, minWidth: 0 },
        resultsKicker: Object.assign({}, r(d[63]).typography.label, { marginBottom: 2 }),
        resultsRoute: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 17,
          letterSpacing: -0.2,
          color: t.textPrimary,
        },
        changeRouteBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
          paddingVertical: r(d[63]).spacing.xs,
        },
        changeRouteText: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 14,
          color: t.accentText,
        },
        listContent: {
          paddingHorizontal: r(d[63]).layout.screenPadding,
          paddingTop: r(d[63]).spacing.xs,
          paddingBottom: r(d[63]).tabBar.height + r(d[63]).spacing.xl,
        },
        sectionHeaderWrap: { paddingTop: r(d[63]).spacing.md, paddingBottom: r(d[63]).spacing.sm },
        sectionHeader: {
          fontFamily: r(d[63]).fontFamily.semiBold,
          fontSize: 14,
          color: t.textSecondary,
          letterSpacing: 0.2,
          textTransform: 'uppercase',
        },
        emptyWrap: { flex: 1, paddingHorizontal: r(d[63]).layout.screenPadding },
        skeletonWrap: {
          paddingHorizontal: r(d[63]).layout.screenPadding,
          paddingTop: r(d[63]).spacing.xs,
        },
      });
  },
  1437,
  [
    1, 5, 161, 19, 326, 26, 7, 1729, 1730, 1510, 1731, 1732, 672, 684, 1618, 1733, 1734, 1735, 1736,
    1737, 1738, 1739, 1534, 1740, 1620, 1490, 1742, 1743, 1744, 1745, 1535, 1746, 183, 940, 382,
    501, 381, 1381, 1614, 1386, 1748, 563, 1621, 936, 1750, 1615, 1507, 1509, 756, 682, 1751, 1619,
    688, 1616, 1741, 1518, 1622, 1512, 760, 1488, 1503, 578, 1624, 377, 1641, 1617,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        queueEntry: t,
        trustScore: s = null,
        onLeaveQueue: f,
        onViewTrips: h,
        leaving: x = !1,
        routeMismatch: j = !1,
      }) {
        const { colors: b } = (0, r(d[8]).useTheme)(),
          v = (0, o.useMemo)(() => y(b), [b]);
        if (!t) return null;
        const w = t.transportMode
            ? (0, r(d[9]).getTransportLabel)(t.transportMode)
            : 'Any transport',
          B = 'invited' === t.status,
          P = (0, r(d[10]).formatWaitDuration)(t.createdAt),
          T = t.othersWaiting ?? 0,
          W = t.waitingOnRoute ?? T + 1,
          L = null != s ? (0, r(d[11]).getTrustTier)(s) : null,
          R = null != s ? (0, r(d[11]).getTrustQueuePriorityBoost)(s) : 0;
        return (0, p.jsx)(l.default, {
          style: v.wrap,
          children: (0, p.jsxs)(u.default, {
            elevated: !0,
            style: [v.card, B && v.cardInvited],
            children: [
              (0, p.jsxs)(l.default, {
                style: v.headerRow,
                children: [
                  (0, p.jsx)(l.default, {
                    style: [v.iconWrap, B && v.iconWrapInvited],
                    children: (0, p.jsx)(r(d[12]).Ionicons, {
                      name: B ? 'notifications' : 'people-outline',
                      size: 18,
                      color: B ? b.warning : b.primaryLight,
                    }),
                  }),
                  (0, p.jsxs)(l.default, {
                    style: v.headerText,
                    children: [
                      (0, p.jsx)(n.default, {
                        style: v.title,
                        children: B ? 'Mate invited you to board' : 'You are in the corridor queue',
                      }),
                      (0, p.jsx)(n.default, { style: v.route, children: t.route }),
                    ],
                  }),
                ],
              }),
              (0, p.jsxs)(l.default, {
                style: v.metaRow,
                children: [
                  (0, p.jsxs)(l.default, {
                    style: v.metaPill,
                    children: [
                      (0, p.jsx)(n.default, { style: v.metaLabel, children: 'Mode' }),
                      (0, p.jsx)(n.default, { style: v.metaValue, children: w }),
                    ],
                  }),
                  t.queuePosition
                    ? (0, p.jsxs)(l.default, {
                        style: v.metaPill,
                        children: [
                          (0, p.jsx)(n.default, { style: v.metaLabel, children: 'Position' }),
                          (0, p.jsxs)(n.default, {
                            style: v.metaValue,
                            children: ['#', t.queuePosition],
                          }),
                        ],
                      })
                    : null,
                  P
                    ? (0, p.jsxs)(l.default, {
                        style: v.metaPill,
                        children: [
                          (0, p.jsx)(n.default, { style: v.metaLabel, children: 'Wait' }),
                          (0, p.jsx)(n.default, {
                            style: v.metaValue,
                            children: P.replace(' waiting', ''),
                          }),
                        ],
                      })
                    : null,
                  L
                    ? (0, p.jsxs)(l.default, {
                        style: v.metaPill,
                        children: [
                          (0, p.jsx)(n.default, { style: v.metaLabel, children: 'Trust' }),
                          (0, p.jsx)(n.default, { style: v.metaValue, children: L.tier }),
                        ],
                      })
                    : null,
                ],
              }),
              !j && W > 0
                ? (0, p.jsxs)(l.default, {
                    style: v.activityRow,
                    children: [
                      (0, p.jsx)(r(d[12]).Ionicons, {
                        name: 'pulse-outline',
                        size: 14,
                        color: b.greenAccent,
                      }),
                      (0, p.jsxs)(n.default, {
                        style: v.activityText,
                        children: [
                          W,
                          ' passenger',
                          1 === W ? '' : 's',
                          ' waiting on this route',
                          T > 0 ? ` \xb7 ${T} ahead of you in line` : '',
                        ],
                      }),
                    ],
                  })
                : null,
              R > 0 && !B
                ? (0, p.jsxs)(n.default, {
                    style: v.trustBoost,
                    children: [
                      L?.tier,
                      ' priority moved you up ',
                      R,
                      ' spot',
                      1 === R ? '' : 's',
                      ' in this queue.',
                    ],
                  })
                : null,
              (0, p.jsx)(n.default, {
                style: v.message,
                children: j
                  ? 'You are waiting on a different route. Leave the queue to search or join another route.'
                  : B
                    ? 'A mate sent you a ride request. Open My Trips to accept or decline before it expires.'
                    : 'Queue position updates live as others join or leave. We will notify you when a vehicle is available.',
              }),
              (0, p.jsxs)(l.default, {
                style: v.actions,
                children: [
                  h
                    ? (0, p.jsx)(c.default, {
                        title: B ? 'Respond in My Trips' : 'View in My Trips',
                        variant: B ? 'primary' : 'secondary',
                        onPress: h,
                        compact: !0,
                      })
                    : null,
                  (0, p.jsx)(c.default, {
                    title: x ? 'Leaving\u2026' : 'Leave queue',
                    variant: 'ghost',
                    onPress: f,
                    disabled: x,
                    compact: !0,
                  }),
                ],
              }),
            ],
          }),
        });
      }));
    var o = r(d[1]),
      l = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      p = r(d[7]);
    const y = t =>
      s.default.create({
        wrap: {
          paddingHorizontal: r(d[13]).layout.screenPadding,
          marginBottom: r(d[13]).spacing.md,
        },
        card: { marginBottom: 0, borderColor: t.primaryAlpha18 },
        cardInvited: { borderColor: t.warning },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[13]).spacing.md,
          marginBottom: r(d[13]).spacing.md,
        },
        iconWrap: {
          width: 36,
          height: 36,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.primaryAlpha08,
        },
        iconWrapInvited: { backgroundColor: 'rgba(212, 168, 67, 0.16)' },
        headerText: { flex: 1, minWidth: 0 },
        title: {
          fontFamily: r(d[13]).fontFamily.semiBold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: 2,
        },
        route: Object.assign({}, r(d[13]).typography.bodyStrong, {
          fontSize: 14,
          color: t.textSecondary,
        }),
        metaRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[13]).spacing.sm,
          marginBottom: r(d[13]).spacing.md,
        },
        metaPill: {
          flexGrow: 1,
          flexBasis: '30%',
          backgroundColor: t.surfaceElevated,
          borderRadius: r(d[13]).radius.md,
          paddingHorizontal: r(d[13]).spacing.sm,
          paddingVertical: r(d[13]).spacing.xs,
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderStrong,
        },
        metaLabel: Object.assign({}, r(d[13]).typography.label, {
          color: t.textSecondary,
          marginBottom: 2,
        }),
        metaValue: { fontFamily: r(d[13]).fontFamily.semiBold, fontSize: 13, color: t.textPrimary },
        activityRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[13]).spacing.sm,
          marginBottom: r(d[13]).spacing.md,
          padding: r(d[13]).spacing.sm,
          borderRadius: r(d[13]).radius.md,
          backgroundColor: t.greenAlpha12,
        },
        activityText: Object.assign({ flex: 1 }, r(d[13]).typography.caption, {
          lineHeight: 18,
          color: t.textSecondary,
        }),
        trustBoost: {
          fontFamily: r(d[13]).fontFamily.semiBold,
          fontSize: 13,
          color: t.greenAccent,
          marginBottom: r(d[13]).spacing.sm,
        },
        message: Object.assign({}, r(d[13]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[13]).spacing.md,
        }),
        actions: { gap: r(d[13]).spacing.xs },
      });
  },
  1729,
  [1, 5, 19, 161, 26, 684, 672, 183, 381, 940, 1502, 936, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        origin: t,
        destination: l,
        passengerId: p,
        trustScore: h,
        onVerifyPress: b,
        navigation: x,
      }) {
        const { colors: P } = (0, r(d[8]).useTheme)(),
          S = (0, o.useMemo)(() => y(P), [P]),
          [j, w] = (0, o.useState)(null),
          [v, I] = (0, o.useState)(!1);
        (0, o.useEffect)(() => {
          let o = !1;
          const n = String(t ?? '').trim(),
            s = String(l ?? '').trim();
          if (n && s && n !== s)
            return (
              I(!0),
              (0, r(d[9]).previewQueuePosition)(n, s, p, h)
                .then(({ data: t }) => {
                  o || w(t);
                })
                .catch(() => {
                  o || w(null);
                })
                .finally(() => {
                  o || I(!1);
                }),
              () => {
                o = !0;
              }
            );
          w(null);
        }, [t, l, p, h]);
        const L = (0, r(d[10]).getTrustTier)(h ?? 0),
          z = j && j.boost > 0 && j.boostedPosition < j.rawPosition;
        return (0, f.jsxs)(n.default, {
          style: S.wrap,
          children: [
            v && !j ? (0, f.jsx)(u.default, { size: 'small', color: P.primaryLight }) : null,
            j
              ? (0, f.jsxs)(n.default, {
                  style: S.card,
                  children: [
                    (0, f.jsxs)(n.default, {
                      style: S.row,
                      children: [
                        (0, f.jsx)(r(d[11]).Ionicons, {
                          name: 'people-outline',
                          size: 16,
                          color: P.primaryLight,
                        }),
                        (0, f.jsx)(s.default, {
                          style: S.body,
                          children:
                            0 === j.waitingCount
                              ? 'Be first in this corridor queue'
                              : `${j.waitingCount} waiting \xb7 you\u2019d be #${j.boostedPosition}`,
                        }),
                      ],
                    }),
                    z
                      ? (0, f.jsxs)(s.default, {
                          style: S.boost,
                          children: [
                            L.tier,
                            ' priority \xb7 ~#',
                            j.boostedPosition,
                            ' instead of #',
                            j.rawPosition,
                          ],
                        })
                      : (0, f.jsxs)(s.default, {
                          style: S.boostMuted,
                          children: [L.tier, ' trust \xb7 verify ID for Gold/Platinum queue boost'],
                        }),
                    'Gold' !== L.tier && 'Platinum' !== L.tier
                      ? (0, f.jsx)(c.default, {
                          onPress: () => {
                            b ? b() : x?.navigate?.(r(d[12]).ROUTES.PASSENGER_PROFILE);
                          },
                          hitSlop: 8,
                          children: (0, f.jsx)(s.default, {
                            style: S.verifyLink,
                            children: 'Improve trust for faster matching \u2192',
                          }),
                        })
                      : null,
                  ],
                })
              : null,
          ],
        });
      }));
    var o = r(d[1]),
      n = t(r(d[2])),
      s = t(r(d[3])),
      l = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      f = r(d[7]);
    const y = t =>
      l.default.create({
        wrap: {
          width: '100%',
          maxWidth: 320,
          marginBottom: r(d[13]).spacing.md,
          alignItems: 'center',
        },
        card: {
          width: '100%',
          borderRadius: r(d[13]).radius.md,
          borderWidth: 1,
          borderColor: t.primaryAlpha18,
          backgroundColor: t.primaryAlpha08,
          padding: r(d[13]).spacing.md,
          gap: r(d[13]).spacing.xs,
        },
        row: { flexDirection: 'row', alignItems: 'center', gap: r(d[13]).spacing.sm },
        body: Object.assign({}, r(d[13]).typography.bodyStrong, {
          flex: 1,
          color: t.textPrimary,
          fontSize: 14,
        }),
        boost: { fontFamily: r(d[13]).fontFamily.semiBold, fontSize: 13, color: t.greenAccent },
        boostMuted: Object.assign({}, r(d[13]).typography.caption, { color: t.textSecondary }),
        verifyLink: {
          fontFamily: r(d[13]).fontFamily.semiBold,
          fontSize: 13,
          color: t.primaryLight,
          marginTop: r(d[13]).spacing.xs,
        },
      });
  },
  1730,
  [1, 5, 19, 161, 26, 373, 326, 183, 381, 1503, 936, 578, 682, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ subtitle: t = 'Kumasi \xb7 Trotro & TrotroRide' }) {
        const { colors: s } = (0, r(d[5]).useTheme)(),
          u = c(s);
        return (0, l.jsxs)(o.default, {
          style: u.wrap,
          children: [
            (0, l.jsx)(n.default, { style: u.brand, children: r(d[6]).APP_NAME }),
            t ? (0, l.jsx)(n.default, { style: u.subtitle, children: t }) : null,
          ],
        });
      }));
    var o = t(r(d[1])),
      n = t(r(d[2])),
      s = t(r(d[3])),
      l = r(d[4]);
    const c = t =>
      s.default.create({
        wrap: {
          paddingHorizontal: r(d[7]).layout.screenPadding,
          paddingTop: r(d[7]).spacing.md,
          marginBottom: r(d[7]).spacing.md,
        },
        brand: Object.assign({}, r(d[7]).typography.hero, { color: t.textPrimary }),
        subtitle: Object.assign({}, r(d[7]).typography.body, {
          color: t.textSecondary,
          marginTop: r(d[7]).spacing.xs,
        }),
      });
  },
  1731,
  [1, 19, 161, 26, 183, 381, 508, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ label: t }) {
        const { colors: c } = (0, r(d[5]).useTheme)(),
          u = (0, o.useMemo)(() => s(c), [c]);
        return (0, l.jsxs)(n.default, {
          style: u.text,
          numberOfLines: 1,
          children: ['Default corridor \xb7 ', t],
        });
      }));
    var o = r(d[1]),
      n = t(r(d[2])),
      c = t(r(d[3])),
      l = r(d[4]);
    const s = t =>
      c.default.create({
        text: Object.assign({}, r(d[6]).typography.caption, {
          paddingHorizontal: r(d[6]).layout.screenPadding,
          marginBottom: r(d[6]).spacing.md,
          color: t.textMuted,
        }),
      });
  },
  1732,
  [1, 5, 161, 26, 183, 381, 377]
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
      p = t(r(d[7])),
      f = t(r(d[8])),
      b = r(d[9]);
    const y = t =>
      n.default.create({
        topRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: r(d[10]).spacing.sm,
          marginBottom: r(d[10]).spacing.xs,
        },
        routeTitle: {
          fontFamily: r(d[10]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          flex: 1,
        },
        badgeRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[10]).spacing.xs,
          marginBottom: r(d[10]).spacing.sm,
        },
        badge: {
          paddingHorizontal: r(d[10]).spacing.sm,
          paddingVertical: 3,
          borderRadius: r(d[10]).radius.sm,
          backgroundColor: t.surfaceSoft,
          borderWidth: n.default.hairlineWidth,
          borderColor: t.border,
        },
        badgeLive: {
          backgroundColor: t.greenBold ?? t.greenAccent,
          borderColor: t.greenBold ?? t.greenAccent,
        },
        badgeSavings: {
          backgroundColor: t.primaryAlpha12 ?? t.surfaceSoft,
          borderColor: t.primary,
        },
        badgeText: { fontFamily: r(d[10]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        badgeTextLive: { color: '#FFFFFF' },
        badgeTextSavings: { color: t.accentText ?? t.primary },
        subtitle: Object.assign({}, r(d[10]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[10]).spacing.md,
        }),
        row: { flexDirection: 'row', alignItems: 'center', marginBottom: r(d[10]).spacing.sm },
        pill: {
          backgroundColor: t.surfaceSoft,
          borderRadius: r(d[10]).radius.pill,
          borderWidth: 1,
          borderColor: t.border,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginLeft: r(d[10]).spacing.sm,
        },
        pillText: { fontFamily: r(d[10]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        shared: Object.assign({}, r(d[10]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[10]).spacing.md,
        }),
        footerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: r(d[10]).spacing.md,
        },
        fare: { fontFamily: r(d[10]).fontFamily.bold, fontSize: 20, color: t.textPrimary },
        perSeat: Object.assign({}, r(d[10]).typography.caption, {
          color: t.textSecondary,
          marginTop: 2,
        }),
        duration: { fontFamily: r(d[10]).fontFamily.regular, fontSize: 13, color: t.textSecondary },
        coPassenger: Object.assign({}, r(d[10]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[10]).spacing.sm,
          fontStyle: 'italic',
        }),
      });
    e.default = (0, o.memo)(function ({
      trip: t,
      onBook: n,
      pickupCoords: x,
      driverLocations: h = [],
      myLocation: j,
      originLabel: v,
    }) {
      const { colors: S } = (0, r(d[11]).useTheme)(),
        L = y(S),
        T = (0, o.useMemo)(
          () =>
            (0, r(d[12]).enrichTrotroRideListing)(t, { origin: v, destination: t?.destination }),
          [t, v]
        ),
        F = ((0, r(d[13]).getAvailableSeats)(t), (0, r(d[13]).isTripBookable)(t)),
        w = 'online_driver' === t.listingType,
        C = (0, o.useMemo)(
          () =>
            (0, r(d[14]).resolvePickupEta)({
              trip: t,
              pickupCoords: x,
              driverLocations: h,
              myLocation: j,
              originLabel: v,
            }),
          [t, x, h, j, v]
        );
      return (0, b.jsxs)(c.default, {
        elevated: !0,
        children: [
          (0, b.jsxs)(l.default, {
            style: L.topRow,
            children: [
              (0, b.jsx)(s.default, { style: L.routeTitle, children: T.routeLabel }),
              (0, b.jsx)(r(d[15]).Ionicons, {
                name: 'car-sport-outline',
                size: 20,
                color: S.primary,
              }),
            ],
          }),
          (0, b.jsxs)(l.default, {
            style: L.badgeRow,
            children: [
              (0, b.jsx)(l.default, {
                style: [L.badge, w && L.badgeLive],
                children: (0, b.jsx)(s.default, {
                  style: [L.badgeText, w && L.badgeTextLive],
                  children: T.listingLabel,
                }),
              }),
              T.savingsLabel
                ? (0, b.jsx)(l.default, {
                    style: [L.badge, L.badgeSavings],
                    children: (0, b.jsx)(s.default, {
                      style: [L.badgeText, L.badgeTextSavings],
                      children: T.savingsLabel,
                    }),
                  })
                : null,
              (0, b.jsx)(l.default, {
                style: L.badge,
                children: (0, b.jsx)(s.default, { style: L.badgeText, children: 'Trip Guardian' }),
              }),
            ],
          }),
          (0, b.jsxs)(s.default, {
            style: L.subtitle,
            children: [
              t.vehicleModel,
              ' \xb7 ',
              t.driverName,
              w ? ' \xb7 Available now' : ` \xb7 ${T.seatsLabel}`,
            ],
          }),
          (0, b.jsxs)(l.default, {
            style: L.row,
            children: [
              (0, b.jsx)(p.default, {
                score: t.trustScore,
                compact: !0,
                variant: t.trustScore >= 80 ? 'success' : 'primary',
              }),
              (0, b.jsx)(l.default, {
                style: L.pill,
                children: (0, b.jsx)(s.default, { style: L.pillText, children: t.plateNumber }),
              }),
            ],
          }),
          t.coPassenger
            ? (0, b.jsxs)(s.default, {
                style: L.coPassenger,
                children: [
                  'Co-passenger: ',
                  t.coPassenger.name,
                  ' (',
                  t.coPassenger.rating,
                  '\u2605)',
                ],
              })
            : null,
          (0, b.jsx)(f.default, {
            label: C.label,
            isLive: C.isLive,
            precise: C.precise,
            size: 'large',
          }),
          (0, b.jsxs)(l.default, {
            style: L.footerRow,
            children: [
              (0, b.jsxs)(l.default, {
                children: [
                  (0, b.jsx)(s.default, { style: L.fare, children: T.fareLabel }),
                  (0, b.jsx)(s.default, { style: L.perSeat, children: 'per seat \xb7 shared' }),
                ],
              }),
              (0, b.jsxs)(s.default, {
                style: L.duration,
                children: ['~', t.tripDuration ?? t.eta ?? 20, ' min'],
              }),
            ],
          }),
          (0, b.jsx)(u.default, {
            title: F ? (w ? 'Request ride' : 'Join ride') : 'Full',
            onPress: () => n(t),
            disabled: !F,
            compact: !0,
          }),
        ],
      });
    });
  },
  1733,
  [1, 5, 19, 161, 26, 684, 672, 1486, 1511, 183, 377, 381, 1625, 1619, 1512, 578]
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
      f = t(r(d[7])),
      p = t(r(d[8])),
      y = r(d[9]);
    function x(t, o) {
      return t >= 5
        ? o.seatsPlenty
        : t >= 2
          ? o.seatsFilling
          : 1 === t
            ? o.seatsAlmostFull
            : o.seatsFull;
    }
    const b = t =>
      n.default.create({
        modeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[10]).spacing.sm,
          marginBottom: 4,
        },
        modeBadge: {
          fontFamily: r(d[10]).fontFamily.semiBold,
          fontSize: 11,
          color: t.accentText ?? t.primary,
          backgroundColor: t.primaryAlpha12,
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: r(d[10]).radius.pill,
          overflow: 'hidden',
        },
        destination: {
          fontFamily: r(d[10]).fontFamily.bold,
          fontSize: 18,
          color: t.textPrimary,
          flex: 1,
        },
        route: Object.assign({}, r(d[10]).typography.caption, {
          color: t.textSecondary,
          marginBottom: r(d[10]).spacing.md,
        }),
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[10]).spacing.md,
        },
        meta: { fontFamily: r(d[10]).fontFamily.medium, fontSize: 15, color: t.textPrimary },
        pillRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: r(d[10]).spacing.md },
        pill: {
          backgroundColor: t.surfaceSoft,
          borderRadius: r(d[10]).radius.pill,
          borderWidth: 1,
          borderColor: t.border,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginRight: r(d[10]).spacing.sm,
          marginBottom: r(d[10]).spacing.sm,
        },
        pillText: { fontFamily: r(d[10]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        typeBadge: {
          backgroundColor: t.surface,
          borderRadius: r(d[10]).radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginRight: r(d[10]).spacing.sm,
          marginBottom: r(d[10]).spacing.sm,
        },
        typeText: { fontFamily: r(d[10]).fontFamily.regular, fontSize: 12, color: t.textSecondary },
        seatBadge: {
          borderRadius: r(d[10]).radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginBottom: r(d[10]).spacing.sm,
        },
        seatText: { fontFamily: r(d[10]).fontFamily.semiBold, fontSize: 12, color: t.onPrimary },
        seatsPlenty: { backgroundColor: t.seatsAvailable },
        seatsFilling: { backgroundColor: t.seatsFilling },
        seatsAlmostFull: { backgroundColor: t.seatsAlmostFull },
        seatsFull: { backgroundColor: t.seatsFull },
        footerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: r(d[10]).spacing.md,
        },
        fare: { fontFamily: r(d[10]).fontFamily.bold, fontSize: 20, color: t.textPrimary },
        eta: Object.assign({}, r(d[10]).typography.caption, { color: t.textSecondary }),
      });
    e.default = (0, o.memo)(function ({
      trip: t,
      onBook: n,
      pickupCoords: j,
      driverLocations: F = [],
      myLocation: B,
      originLabel: S,
    }) {
      const { colors: w } = (0, r(d[11]).useTheme)(),
        v = (0, o.useMemo)(() => b(w), [w]),
        C = (0, r(d[12]).getAvailableSeats)(t),
        R = t.totalSeats ?? t.maxPassengers ?? 1,
        k = t.operatorName ?? t.mateName ?? t.driverName ?? 'Operator',
        z = t.fare ?? t.farePerSeat ?? 0,
        P = (0, r(d[13]).getTransportLabel)(t.transportMode ?? t.type),
        L = (0, o.useMemo)(
          () =>
            (0, r(d[14]).resolvePickupEta)({
              trip: t,
              pickupCoords: j,
              driverLocations: F,
              myLocation: B,
              originLabel: S,
            }),
          [t, j, F, B, S]
        );
      return (0, y.jsxs)(c.default, {
        elevated: !0,
        children: [
          (0, y.jsxs)(l.default, {
            style: v.modeRow,
            children: [
              (0, y.jsx)(s.default, { style: v.modeBadge, children: P }),
              (0, y.jsx)(s.default, { style: v.destination, children: t.destination }),
            ],
          }),
          (0, y.jsx)(s.default, { style: v.route, children: t.route }),
          (0, y.jsxs)(l.default, {
            style: v.row,
            children: [
              (0, y.jsx)(s.default, { style: v.meta, children: k }),
              (0, y.jsx)(f.default, { score: t.trustScore ?? 72, compact: !0 }),
            ],
          }),
          (0, y.jsxs)(l.default, {
            style: v.pillRow,
            children: [
              (0, y.jsx)(l.default, {
                style: v.pill,
                children: (0, y.jsx)(s.default, { style: v.pillText, children: t.plateNumber }),
              }),
              (0, y.jsx)(l.default, {
                style: v.typeBadge,
                children: (0, y.jsx)(s.default, { style: v.typeText, children: t.vehicleType }),
              }),
              (0, y.jsx)(l.default, {
                style: [v.seatBadge, x(C, v)],
                children: (0, y.jsx)(s.default, { style: v.seatText, children: h(C, R) }),
              }),
            ],
          }),
          C > 0
            ? (0, y.jsx)(p.default, { label: L.label, isLive: L.isLive, precise: L.precise })
            : null,
          (0, y.jsxs)(l.default, {
            style: v.footerRow,
            children: [
              (0, y.jsxs)(s.default, { style: v.fare, children: ['GHS ', Number(z).toFixed(2)] }),
              (0, y.jsx)(s.default, {
                style: v.eta,
                children: C > 0 ? L.shortLabel : 'No departure',
              }),
            ],
          }),
          (0, y.jsx)(u.default, { title: 'Join queue', onPress: () => n(t), compact: !0 }),
        ],
      });
    });
    function h(t, o) {
      return 0 === t
        ? 'Full'
        : 1 === t && 1 === o
          ? '1 rider'
          : 1 === t
            ? '1 seat left'
            : `${t} seats left`;
    }
  },
  1734,
  [1, 5, 19, 161, 26, 684, 672, 1486, 1511, 183, 377, 381, 1619, 940, 1512]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ value: o, onChange: s, compact: h = !1 }) {
        const { colors: f } = (0, r(d[7]).useTheme)(),
          b = (0, t.useMemo)(() => u(f), [f]);
        return (0, p.jsx)(l.default, {
          horizontal: !0,
          showsHorizontalScrollIndicator: !1,
          style: h ? b.scrollCompact : void 0,
          contentContainerStyle: [b.row, h && b.rowCompact],
          children: r(d[8]).TRANSPORT_MODE_OPTIONS.map(t => {
            const l = o === t.id;
            return (0, p.jsxs)(
              n.default,
              {
                onPress: () => s(t.id),
                style: [b.chip, h && b.chipCompact, l && b.chipActive],
                children: [
                  (0, p.jsx)(r(d[9]).Ionicons, {
                    name: t.icon,
                    size: h ? 13 : 16,
                    color: l ? f.primaryLight : f.textMuted,
                  }),
                  (0, p.jsx)(c.default, {
                    style: [b.label, h && b.labelCompact, l && b.labelActive],
                    children: t.label,
                  }),
                ],
              },
              t.id
            );
          }),
        });
      }));
    var t = r(d[1]),
      l = o(r(d[2])),
      n = o(r(d[3])),
      c = o(r(d[4])),
      s = o(r(d[5])),
      p = r(d[6]);
    const u = o =>
      s.default.create({
        scrollCompact: { flexGrow: 0, marginBottom: r(d[10]).spacing.sm },
        row: {
          paddingHorizontal: r(d[10]).layout.screenPadding,
          paddingBottom: r(d[10]).spacing.md,
          gap: r(d[10]).spacing.sm,
          alignItems: 'center',
        },
        rowCompact: { paddingBottom: r(d[10]).spacing.xs, gap: 6 },
        chip: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: r(d[10]).spacing.md,
          paddingVertical: r(d[10]).spacing.sm,
          borderRadius: r(d[10]).radius.pill,
          borderWidth: s.default.hairlineWidth,
          borderColor: o.borderSoft,
          backgroundColor: o.surface,
          gap: r(d[10]).spacing.sm,
        },
        chipCompact: {
          paddingHorizontal: r(d[10]).spacing.sm,
          paddingVertical: 4,
          minHeight: 30,
          gap: 4,
          borderRadius: r(d[10]).radius.sm,
        },
        chipActive: { borderColor: o.primaryAlpha35, backgroundColor: o.primaryAlpha08 },
        label: { fontFamily: r(d[10]).fontFamily.medium, fontSize: 14, color: o.textSecondary },
        labelCompact: { fontSize: 12, lineHeight: 16, includeFontPadding: !1 },
        labelActive: { fontFamily: r(d[10]).fontFamily.semiBold, color: o.textPrimary },
      });
  },
  1735,
  [1, 5, 106, 326, 161, 26, 183, 381, 940, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ value: t, onChange: c, compact: u = !1, style: b }) {
        const { colors: y } = (0, r(d[6]).useTheme)(),
          f = p(y, u);
        return (0, s.jsx)(o.default, {
          style: [f.row, b],
          children: r(d[7]).PRIMARY_TRANSPORT_MODE_OPTIONS.map(o => {
            const p = t === o.id;
            return (0, s.jsxs)(
              l.default,
              {
                onPress: () => c(o.id),
                style: [f.chip, p && f.chipActive],
                accessibilityRole: 'button',
                accessibilityState: { selected: p },
                children: [
                  (0, s.jsx)(r(d[8]).Ionicons, {
                    name: o.icon,
                    size: u ? 16 : 18,
                    color: p ? y.primaryLight : y.textMuted,
                  }),
                  (0, s.jsx)(n.default, {
                    style: [f.label, p && f.labelActive],
                    numberOfLines: 1,
                    children: o.label,
                  }),
                ],
              },
              o.id
            );
          }),
        });
      }));
    var o = t(r(d[1])),
      l = t(r(d[2])),
      n = t(r(d[3])),
      c = t(r(d[4])),
      s = r(d[5]);
    const p = (t, o) =>
      c.default.create({
        row: { flexDirection: 'row', gap: r(d[9]).spacing.sm },
        chip: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: r(d[9]).spacing.xs,
          minHeight: o ? 40 : 48,
          paddingHorizontal: o ? r(d[9]).spacing.sm : r(d[9]).spacing.md,
          paddingVertical: o ? r(d[9]).spacing.sm : r(d[9]).spacing.md,
          borderRadius: r(d[9]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        chipActive: { borderColor: t.primaryAlpha35, backgroundColor: t.primaryAlpha08 },
        label: Object.assign({}, r(d[9]).typography.bodyStrong, {
          fontSize: o ? 14 : 15,
          color: t.textSecondary,
        }),
        labelActive: { fontFamily: r(d[9]).fontFamily.bold, color: t.textPrimary },
      });
  },
  1736,
  [1, 19, 326, 161, 26, 183, 381, 940, 578, 377]
);
__d(
  function (g, _r, i, a, m, e, d) {
    var t = _r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        origin: t,
        destination: s,
        onOriginChange: c,
        onDestinationChange: f,
        onSwap: T,
        onSearch: C,
        transportMode: w = _r(d[17]).TRANSPORT_MODES.ALL,
        onTransportModeChange: v = () => {},
        onRequestTrotroRide: F,
        myLocationLabel: L,
        savedPlaces: k = [],
        favoriteRoutes: B = [],
        favoriteRouteIds: P = [],
        recentDestinations: M = [],
        onRemoveFavorite: D,
        onRemoveRecentDestination: O,
        onQuickRoute: W,
      }) {
        const { colors: z } = (0, _r(d[18]).useTheme)(),
          I = (0, o.useMemo)(() => j(z), [z]),
          [H, $] = (0, o.useState)(null),
          A = (0, o.useMemo)(() => (0, _r(d[16]).buildKumasiLocationPool)(k), [k]),
          q = (0, o.useMemo)(() => (0, _r(d[19]).mergeQuickRoutes)(B), [B]),
          E = (0, o.useMemo)(() => new Set(P), [P]),
          _ = Boolean(t?.trim()),
          N = (0, o.useMemo)(
            () => ('origin' === H ? (0, _r(d[16]).searchLocations)(A, t) : []),
            [H, A, t]
          ),
          V = (0, o.useMemo)(
            () => ('destination' === H ? (0, _r(d[16]).searchLocations)(A, s) : []),
            [H, A, s]
          ),
          K = Boolean(_ && s?.trim() && t.trim() !== s.trim()),
          Q = q.find(o => o.origin === t?.trim() && o.destination === s?.trim())?.id,
          U = (0, _r(d[17]).getTransportLabel)(w),
          G = K
            ? w === _r(d[17]).TRANSPORT_MODES.TROTRORIDE
              ? `Find TrotroRide \xb7 ${t.trim()} \u2192 ${s.trim()}`
              : w === _r(d[17]).TRANSPORT_MODES.TROTRO
                ? `Show Trotro \xb7 ${t.trim()} \u2192 ${s.trim()}`
                : w === _r(d[17]).TRANSPORT_MODES.ALL
                  ? `Show rides \xb7 ${t.trim()} \u2192 ${s.trim()}`
                  : `Show ${U} \xb7 ${t.trim()} \u2192 ${s.trim()}`
            : 'Select your route',
          J = t => {
            (c(t.origin), f(t.destination), W?.(t));
          },
          X = t => {
            (c(t.origin), f(t.destination), t.transportMode && v(t.transportMode), W?.(t));
          };
        return (0, b.jsx)(h.default, {
          behavior: void 0,
          style: I.flex,
          children: (0, b.jsxs)(u.default, {
            style: I.flex,
            contentContainerStyle: I.container,
            keyboardShouldPersistTaps: 'handled',
            showsVerticalScrollIndicator: !1,
            children: [
              (0, b.jsxs)(n.default, {
                style: I.card,
                children: [
                  (0, b.jsx)(r.default, {
                    style: I.modeTitle,
                    children: 'How do you want to travel?',
                  }),
                  (0, b.jsx)(x.default, { value: w, onChange: v, style: I.modePicker }),
                  (0, b.jsx)(R, {
                    label: 'From',
                    value: t,
                    placeholder: 'Where are you now?',
                    focused: 'origin' === H,
                    onFocus: () => $('origin'),
                    onBlur: () => setTimeout(() => $(t => ('origin' === t ? null : t)), 220),
                    onChangeText: c,
                    suggestions: N,
                    showSimilarHeader: (0, _r(d[16]).hasSimilarMatches)(N),
                    query: t,
                    onSelect: c,
                    dotColor: z.success,
                    ringColor: z.successSoft,
                    styles: I,
                    colors: z,
                  }),
                  (0, b.jsxs)(n.default, {
                    style: I.betweenFields,
                    children: [
                      (0, b.jsx)(n.default, { style: [I.fieldDivider, { marginLeft: S }] }),
                      _ && s?.trim()
                        ? (0, b.jsx)(l.default, {
                            style: I.swapBtn,
                            onPress: T,
                            hitSlop: 8,
                            children: (0, b.jsx)(_r(d[15]).Ionicons, {
                              name: 'swap-vertical',
                              size: 16,
                              color: z.textSecondary,
                            }),
                          })
                        : null,
                    ],
                  }),
                  (0, b.jsx)(R, {
                    label: 'To',
                    value: s,
                    placeholder: _ ? 'Where are you going?' : 'Pick departure first',
                    disabled: !_,
                    focused: 'destination' === H,
                    onFocus: () => $('destination'),
                    onBlur: () => setTimeout(() => $(t => ('destination' === t ? null : t)), 220),
                    onChangeText: f,
                    suggestions: V,
                    showSimilarHeader: (0, _r(d[16]).hasSimilarMatches)(V),
                    query: s,
                    onSelect: f,
                    dotColor: z.primary,
                    ringColor: z.primaryAlpha12,
                    styles: I,
                    colors: z,
                  }),
                ],
              }),
              L
                ? (0, b.jsxs)(l.default, {
                    style: I.myLoc,
                    onPress: () => c(L),
                    children: [
                      (0, b.jsx)(_r(d[15]).Ionicons, {
                        name: 'locate-outline',
                        size: 15,
                        color: z.greenAccent,
                      }),
                      (0, b.jsxs)(r.default, {
                        style: I.myLocText,
                        children: ['Use saved location \xb7 ', L],
                      }),
                    ],
                  })
                : null,
              M.length > 0
                ? (0, b.jsxs)(b.Fragment, {
                    children: [
                      (0, b.jsx)(r.default, {
                        style: I.quickTitle,
                        children: 'Recent destinations',
                      }),
                      (0, b.jsx)(u.default, {
                        horizontal: !0,
                        showsHorizontalScrollIndicator: !1,
                        contentContainerStyle: I.recentScroll,
                        keyboardShouldPersistTaps: 'handled',
                        children: M.map(t =>
                          (0, b.jsxs)(
                            n.default,
                            {
                              style: I.recentChip,
                              children: [
                                (0, b.jsxs)(l.default, {
                                  style: I.recentChipMain,
                                  onPress: () => X(t),
                                  accessibilityRole: 'button',
                                  accessibilityLabel: `Use recent destination ${t.destination}`,
                                  children: [
                                    (0, b.jsx)(_r(d[15]).Ionicons, {
                                      name: 'time-outline',
                                      size: 15,
                                      color: z.primaryLight,
                                    }),
                                    (0, b.jsxs)(n.default, {
                                      style: I.recentTextWrap,
                                      children: [
                                        (0, b.jsx)(r.default, {
                                          style: I.recentDestination,
                                          numberOfLines: 1,
                                          children: t.destination,
                                        }),
                                        (0, b.jsxs)(r.default, {
                                          style: I.recentRoute,
                                          numberOfLines: 1,
                                          children: [t.origin, ' \u2192 ', t.destination],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                O
                                  ? (0, b.jsx)(l.default, {
                                      style: I.recentRemoveBtn,
                                      hitSlop: 8,
                                      accessibilityRole: 'button',
                                      accessibilityLabel: `Remove ${t.destination} from recent destinations`,
                                      onPress: () => O(t),
                                      children: (0, b.jsx)(_r(d[15]).Ionicons, {
                                        name: 'close',
                                        size: 15,
                                        color: z.textSecondary,
                                      }),
                                    })
                                  : null,
                              ],
                            },
                            t.id ?? `${t.origin}-${t.destination}`
                          )
                        ),
                      }),
                    ],
                  })
                : null,
              (0, b.jsx)(r.default, { style: I.quickTitle, children: 'Quick routes' }),
              (0, b.jsx)(u.default, {
                horizontal: !0,
                showsHorizontalScrollIndicator: !1,
                contentContainerStyle: I.quickScroll,
                keyboardShouldPersistTaps: 'handled',
                children: q.map(t =>
                  (0, b.jsx)(
                    p.default,
                    {
                      route: t,
                      selected: Q === t.id,
                      onPress: () => J(t),
                      showRemove: E.has(t.id),
                      onRemove: D ? () => D(t.id) : void 0,
                    },
                    t.id ?? `${t.origin}-${t.destination}`
                  )
                ),
              }),
              (0, b.jsx)(y.default, { title: G, onPress: C, disabled: !K }),
              K && w === _r(d[17]).TRANSPORT_MODES.TROTRORIDE && F
                ? (0, b.jsx)(y.default, {
                    title: 'Request TrotroRide now',
                    variant: 'secondary',
                    onPress: F,
                  })
                : null,
            ],
          }),
        });
      }));
    var o = _r(d[1]),
      n = t(_r(d[2])),
      r = t(_r(d[3])),
      l = t(_r(d[4])),
      s = t(_r(d[5])),
      c = t(_r(d[6])),
      u = t(_r(d[7])),
      f = t(_r(d[8])),
      h = t(_r(d[9])),
      p = (t(_r(d[10])), t(_r(d[11]))),
      y = t(_r(d[12])),
      x = t(_r(d[13])),
      b = _r(d[14]);
    const S = 32;
    function R({
      label: t,
      value: s,
      placeholder: u,
      disabled: h,
      focused: p,
      onPress: y,
      onFocus: x,
      onBlur: S,
      onChangeText: R,
      suggestions: j,
      onSelect: T,
      dotColor: C,
      ringColor: w,
      showSimilarHeader: v = !1,
      query: F = '',
      styles: L,
      colors: k,
    }) {
      const B = (0, o.useRef)(null);
      return (0, b.jsxs)(n.default, {
        style: L.fieldBlock,
        children: [
          (0, b.jsxs)(l.default, {
            style: [L.fieldRow, h && L.fieldDisabled, p && L.fieldFocused],
            onPress: () => {
              h || (y?.(), x?.(), B.current?.focus());
            },
            children: [
              (0, b.jsx)(n.default, {
                style: [L.dotRing, { backgroundColor: w }],
                children: (0, b.jsx)(n.default, { style: [L.dot, { backgroundColor: C }] }),
              }),
              (0, b.jsxs)(n.default, {
                style: L.inputWrap,
                children: [
                  (0, b.jsx)(r.default, { style: L.fieldLabelSmall, children: t }),
                  (0, b.jsx)(c.default, {
                    ref: B,
                    style: [L.input, h && L.inputDisabled],
                    value: s,
                    onChangeText: R,
                    placeholder: u,
                    placeholderTextColor: k.textMuted,
                    onFocus: x,
                    onBlur: S,
                    editable: !h,
                    returnKeyType: 'done',
                    autoCorrect: !1,
                    autoCapitalize: 'words',
                    pointerEvents: h ? 'none' : 'auto',
                  }),
                ],
              }),
              (0, b.jsx)(_r(d[15]).Ionicons, {
                name: 'chevron-down',
                size: 18,
                color: h ? k.textMuted : k.textSecondary,
                style: L.chevron,
              }),
            ],
          }),
          p && !h && j.length > 0
            ? (0, b.jsxs)(n.default, {
                style: L.suggestions,
                children: [
                  v
                    ? (0, b.jsx)(r.default, {
                        style: L.suggestionsHeader,
                        children: 'Similar places',
                      })
                    : null,
                  j.map((t, o) => {
                    const s = (0, _r(d[16]).getMatchHighlight)(t.label, F);
                    return (0, b.jsxs)(
                      l.default,
                      {
                        style: [L.suggestionRow, o === j.length - 1 && L.suggestionRowLast],
                        onPress: () => {
                          (T(t.label), f.default.dismiss());
                        },
                        children: [
                          (0, b.jsx)(_r(d[15]).Ionicons, {
                            name: 'location-outline',
                            size: 16,
                            color: k.greenAccent,
                          }),
                          (0, b.jsxs)(n.default, {
                            style: L.suggestionTextWrap,
                            children: [
                              (0, b.jsx)(r.default, {
                                style: L.suggestionText,
                                children: s.match
                                  ? (0, b.jsxs)(b.Fragment, {
                                      children: [
                                        s.before,
                                        (0, b.jsx)(r.default, {
                                          style: L.suggestionMatch,
                                          children: s.match,
                                        }),
                                        s.after,
                                      ],
                                    })
                                  : t.label,
                              }),
                              'similar' === t.matchKind
                                ? (0, b.jsx)(r.default, {
                                    style: L.suggestionHint,
                                    children:
                                      ((c = t.matchKind), 'similar' === c ? 'Did you mean?' : null),
                                  })
                                : null,
                            ],
                          }),
                        ],
                      },
                      `${t.label}-${o}`
                    );
                    var c;
                  }),
                ],
              })
            : null,
        ],
      });
    }
    const j = t =>
      s.default.create({
        flex: { flex: 1 },
        container: {
          paddingHorizontal: _r(d[20]).layout.screenPadding,
          paddingBottom: _r(d[20]).spacing.xxxl,
        },
        card: {
          backgroundColor: t.surfaceElevated,
          borderRadius: _r(d[20]).radius.lg,
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderSoft,
          padding: _r(d[20]).spacing.lg,
          marginBottom: _r(d[20]).spacing.lg,
        },
        modeTitle: Object.assign({}, _r(d[20]).typography.label, {
          marginBottom: _r(d[20]).spacing.sm,
        }),
        modePicker: { marginBottom: _r(d[20]).spacing.lg },
        fieldBlock: { marginBottom: 0 },
        fieldRow: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 52,
          borderRadius: _r(d[20]).radius.md,
          paddingVertical: _r(d[20]).spacing.xs,
          paddingRight: _r(d[20]).spacing.xs,
        },
        fieldFocused: { backgroundColor: t.surfaceSoft },
        fieldDisabled: { opacity: 0.72 },
        dotRing: {
          width: 20,
          height: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: _r(d[20]).spacing.md,
          flexShrink: 0,
        },
        dot: { width: 8, height: 8, borderRadius: 4 },
        inputWrap: { flex: 1, minWidth: 0, justifyContent: 'center' },
        fieldLabelSmall: Object.assign({}, _r(d[20]).typography.label, {
          marginBottom: 2,
          fontSize: 11,
        }),
        input: {
          fontFamily: _r(d[20]).fontFamily.semiBold,
          fontSize: 16,
          letterSpacing: -0.2,
          color: t.textPrimary,
          paddingVertical: 0,
          minHeight: 24,
        },
        inputDisabled: { color: t.textMuted, fontFamily: _r(d[20]).fontFamily.regular },
        chevron: { marginLeft: _r(d[20]).spacing.sm, flexShrink: 0 },
        betweenFields: {
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: _r(d[20]).spacing.xs,
          minHeight: 28,
        },
        fieldDivider: { flex: 1, height: s.default.hairlineWidth, backgroundColor: t.borderSoft },
        swapBtn: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: t.surfaceSoft,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderSoft,
          marginLeft: _r(d[20]).spacing.sm,
          flexShrink: 0,
        },
        suggestions: {
          marginLeft: S,
          marginTop: _r(d[20]).spacing.xs,
          backgroundColor: t.surfaceSoft,
          borderRadius: _r(d[20]).radius.md,
          borderWidth: 1,
          borderColor: t.borderStrong,
          overflow: 'hidden',
        },
        suggestionsHeader: {
          fontFamily: _r(d[20]).fontFamily.medium,
          fontSize: 11,
          color: t.textMuted,
          paddingHorizontal: _r(d[20]).spacing.md,
          paddingTop: _r(d[20]).spacing.sm,
          paddingBottom: _r(d[20]).spacing.xs,
          textTransform: 'uppercase',
          letterSpacing: 0.4,
        },
        suggestionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[20]).spacing.sm,
          paddingHorizontal: _r(d[20]).spacing.md,
          paddingVertical: _r(d[20]).spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: t.borderSoft,
        },
        suggestionRowLast: { borderBottomWidth: 0 },
        suggestionTextWrap: { flex: 1 },
        suggestionText: {
          fontFamily: _r(d[20]).fontFamily.medium,
          fontSize: 14,
          color: t.textPrimary,
        },
        suggestionMatch: { fontFamily: _r(d[20]).fontFamily.bold, color: t.primaryLight },
        suggestionHint: {
          fontFamily: _r(d[20]).fontFamily.regular,
          fontSize: 11,
          color: t.primaryLight,
          marginTop: 1,
        },
        myLoc: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[20]).spacing.sm,
          marginBottom: _r(d[20]).spacing.lg,
        },
        myLocText: {
          fontFamily: _r(d[20]).fontFamily.medium,
          fontSize: 13,
          color: t.greenAccent,
          flex: 1,
        },
        quickTitle: Object.assign({}, _r(d[20]).typography.label, {
          marginBottom: _r(d[20]).spacing.sm,
        }),
        quickScroll: { paddingBottom: _r(d[20]).spacing.lg },
        recentScroll: { paddingBottom: _r(d[20]).spacing.md, gap: _r(d[20]).spacing.sm },
        recentChip: {
          width: 190,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: _r(d[20]).radius.md,
          backgroundColor: t.surfaceElevated,
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderSoft,
          overflow: 'hidden',
        },
        recentChipMain: {
          flex: 1,
          minWidth: 0,
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[20]).spacing.sm,
          padding: _r(d[20]).spacing.sm,
        },
        recentRemoveBtn: {
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.surfaceSoft,
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderSoft,
        },
        recentTextWrap: { flex: 1, minWidth: 0 },
        recentDestination: {
          fontFamily: _r(d[20]).fontFamily.semiBold,
          fontSize: 13,
          color: t.textPrimary,
        },
        recentRoute: {
          fontFamily: _r(d[20]).fontFamily.regular,
          fontSize: 11,
          color: t.textSecondary,
          marginTop: 2,
        },
      });
  },
  1737,
  [
    1, 5, 19, 161, 326, 26, 255, 106, 316, 681, 14, 1623, 672, 1736, 183, 578, 1626, 940, 381, 1624,
    377,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        trip: u,
        passengerId: p,
        passengerName: x,
        onClose: T,
        onConfirmMoMo: M,
        onReserved: R,
      }) {
        const k = (0, r(d[15]).useNavigation)(),
          { colors: C } = (0, r(d[16]).useTheme)(),
          { profile: E } = (0, r(d[17]).useAuth)(),
          { showToast: _ } = (0, r(d[18]).useToast)(),
          B = (0, l.useMemo)(() => w(C), [C]),
          I = (0, l.useMemo)(() => (0, r(d[19]).calculateTrustScoreFromProfile)(E), [E]),
          D = (0, l.useRef)(!1),
          [N, H] = (0, l.useState)('review'),
          [A, z] = (0, l.useState)(!1),
          [L, V] = (0, l.useState)(null),
          [O, G] = (0, l.useState)(null),
          [$, W] = (0, l.useState)('29:59'),
          [Y, Q] = (0, l.useState)(0),
          q = (0, l.useState)(new c.default.Value(0))[0],
          K = (0, l.useMemo)(() => `TOS-${Date.now()}`, [t, u?.id]);
        if (
          ((0, l.useEffect)(() => {
            if (!t)
              return (H('review'), z(!1), V(null), G(null), (D.current = !1), void q.setValue(0));
            let l = !1;
            return (
              (async () => {
                const { data: t } = await (0, r(d[20]).fetchWallet)();
                l || Q(Number(t?.balance_ghs ?? 0));
              })(),
              () => {
                l = !0;
              }
            );
          }, [t, q]),
          (0, l.useEffect)(() => {
            if ('success' !== N || !O?.expires_at) return;
            const t = () => W((0, r(d[21]).formatCountdownTo)(O.expires_at));
            t();
            const l = setInterval(t, 1e3);
            return () => clearInterval(l);
          }, [N, O?.expires_at]),
          (0, l.useEffect)(() => {
            'success' === N &&
              c.default.spring(q, { toValue: 1, friction: 5, useNativeDriver: !0 }).start();
          }, [N, q]),
          !u)
        )
          return null;
        const U = u.mateName ?? u.driverName ?? 'Mate',
          X = u.matePhone ?? u.driverPhone ?? null,
          J =
            null != u.availableSeats && null != u.totalSeats
              ? `${u.availableSeats} of ${u.totalSeats} seats open`
              : null != u.availableSeats
                ? `${u.availableSeats} seats open`
                : null,
          Z = `Hi ${U}, I reserved a seat on ${u.route}.`,
          ee =
            'trotroride' === u.type
              ? r(d[22]).TR_COMMISSION_PERCENT
              : r(d[22]).PLATFORM_FEE_PERCENT,
          te = Number(u.fare ?? u.farePerSeat ?? 0),
          ae = 'trotroride' === u.type ? te : (0, r(d[19]).applyTrustFareDiscount)(te, I),
          re =
            'trotroride' === u.type
              ? Math.round(ae * (ee / 100) * 100) / 100
              : (0, r(d[23]).computePlatformFee)(te, ee, I),
          le = ae + re,
          oe = `${u.origin} main stop`,
          ie = () => {
            A || (H('review'), V(null), G(null), T?.());
          },
          se = t =>
            'seat_unavailable' === t?.code || t?.message?.includes('just taken')
              ? 'Sorry, this seat was just taken. Try another vehicle.'
              : (t?.message ?? 'Could not reserve seat.'),
          ne = async (t, { alreadyExists: l = !1 } = {}) => {
            (l && _({ type: 'info', message: r(d[24]).RESERVATION_ALREADY_EXISTS_MESSAGE }),
              z(!1),
              (D.current = !1),
              G(t),
              H('success'),
              await (0, r(d[25]).scheduleReservationReminder)({
                route: u.route,
                expiresAt: t?.expires_at,
                userId: p,
              }),
              R?.(t));
          },
          de = async (t = r(d[22]).PAYMENT_METHODS.PAY_ON_BOARD, l = null) => {
            if (D.current || A) return;
            if (!p) return (V('Please sign in to reserve a seat.'), void H('error'));
            ((D.current = !0), z(!0), V(null), H('loading'));
            const {
              data: o,
              error: s,
              alreadyExists: n,
            } = await (0, r(d[24]).createReservation)(u.dbId ?? u.id, p, x ?? 'Passenger', oe, u);
            if (s) return (z(!1), (D.current = !1), V(se(s)), void H('error'));
            (l &&
              o?.id &&
              (await (0, r(d[23]).markReservationPaid)(o.id, l, t),
              await (0, r(d[23]).recordPayment)({
                reservationId: o.id,
                payerId: p,
                payeeId: u.mateId,
                amount: re,
                method: t,
                reference: l,
              })),
              await ne(o, { alreadyExists: n }));
          },
          ue = 'loading' !== N && 'success' !== N;
        return (0, j.jsxs)(f.default, {
          visible: t,
          title:
            {
              review: 'Reserve seat',
              payment: 'Choose payment',
              momo: 'Pay with MoMo / GhQR',
              loading: 'Reserving seat',
              success: 'Seat reserved',
              error: 'Reservation failed',
            }[N] ?? 'Reserve seat',
          subtitle:
            'success' === N || 'review' === N ? u.route : `GHS ${re.toFixed(2)} platform fee`,
          onClose: ie,
          confirmTitle: null,
          showCancelButton: !1,
          children: [
            (0, j.jsxs)(y.default, {
              bounces: !1,
              showsVerticalScrollIndicator: !1,
              keyboardShouldPersistTaps: 'handled',
              contentContainerStyle: B.scrollContent,
              children: [
                'review' === N
                  ? (0, j.jsxs)(j.Fragment, {
                      children: [
                        (0, j.jsx)(v, {
                          trip: u,
                          operatorName: U,
                          pickupPoint: oe,
                          baseFare: ae,
                          seatsLabel: J,
                          styles: B,
                        }),
                        (0, j.jsx)(F, {
                          label: 'Platform fee',
                          value: `GHS ${re.toFixed(2)} (${ee}%)`,
                          styles: B,
                        }),
                        (0, j.jsxs)(s.default, {
                          style: B.totalRow,
                          children: [
                            (0, j.jsx)(n.default, { style: B.totalLabel, children: 'Trip total' }),
                            (0, j.jsxs)(n.default, {
                              style: B.totalValue,
                              children: ['GHS ', le.toFixed(2)],
                            }),
                          ],
                        }),
                        (0, j.jsxs)(s.default, {
                          style: B.totalRow,
                          children: [
                            (0, j.jsx)(n.default, {
                              style: B.totalLabel,
                              children: 'Due now (platform fee)',
                            }),
                            (0, j.jsxs)(n.default, {
                              style: B.totalValue,
                              children: ['GHS ', re.toFixed(2)],
                            }),
                          ],
                        }),
                        (0, j.jsx)(n.default, {
                          style: B.hint,
                          children: 'Seat fare is paid on board. Platform fee is due now.',
                        }),
                        (0, j.jsxs)(n.default, {
                          style: B.sectionLabel,
                          children: ['Contact your ', 'trotroride' === u.type ? 'driver' : 'mate'],
                        }),
                        (0, j.jsx)(b.default, { phone: X, operatorName: U, message: Z }),
                        (0, j.jsx)(n.default, {
                          style: B.hint,
                          children: 'Seat held for 30 minutes after confirmation.',
                        }),
                        (0, j.jsx)(s.default, {
                          style: B.actions,
                          children: (0, j.jsx)(S.default, {
                            title: 'Continue to payment',
                            onPress: () => H('payment'),
                          }),
                        }),
                      ],
                    })
                  : null,
                'payment' === N
                  ? (0, j.jsxs)(j.Fragment, {
                      children: [
                        (0, j.jsx)(v, {
                          trip: u,
                          operatorName: U,
                          pickupPoint: oe,
                          baseFare: ae,
                          seatsLabel: J,
                          showFare: !1,
                          styles: B,
                        }),
                        (0, j.jsxs)(s.default, {
                          style: B.paymentSummary,
                          children: [
                            (0, j.jsxs)(s.default, {
                              style: B.paymentSummaryRow,
                              children: [
                                (0, j.jsx)(n.default, {
                                  style: B.paymentSummaryLabel,
                                  children: 'Seat fare (on board)',
                                }),
                                (0, j.jsxs)(n.default, {
                                  style: B.paymentSummaryValue,
                                  children: ['GHS ', ae.toFixed(2)],
                                }),
                              ],
                            }),
                            (0, j.jsxs)(s.default, {
                              style: B.paymentSummaryRow,
                              children: [
                                (0, j.jsx)(n.default, {
                                  style: B.paymentSummaryLabelStrong,
                                  children: 'Platform fee (due now)',
                                }),
                                (0, j.jsxs)(n.default, {
                                  style: B.paymentSummaryValueStrong,
                                  children: ['GHS ', re.toFixed(2)],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, j.jsx)(n.default, {
                          style: B.paymentIntro,
                          children:
                            'Pay the platform fee from your wallet or MoMo/GhQR, or confirm and pay everything on board.',
                        }),
                        (0, j.jsxs)(s.default, {
                          style: B.actions,
                          children: [
                            (0, j.jsx)(S.default, {
                              title:
                                Y >= re
                                  ? `Pay with wallet (GHS ${Y.toFixed(2)})`
                                  : `Wallet (GHS ${Y.toFixed(2)}) \u2014 top up needed`,
                              loading: A,
                              disabled: A || Y < re,
                              onPress: async () => {
                                if (D.current || A) return;
                                if (!p)
                                  return (V('Please sign in to reserve a seat.'), void H('error'));
                                if (Y < re)
                                  return (
                                    V(
                                      `Wallet balance GHS ${Y.toFixed(2)} is below the GHS ${re.toFixed(2)} fee. Top up or pay with MoMo.`
                                    ),
                                    void H('error')
                                  );
                                ((D.current = !0), z(!0), V(null), H('loading'));
                                const {
                                  data: t,
                                  error: l,
                                  alreadyExists: o,
                                } = await (0, r(d[24]).createReservation)(
                                  u.dbId ?? u.id,
                                  p,
                                  x ?? 'Passenger',
                                  oe,
                                  u
                                );
                                if (l) return (z(!1), (D.current = !1), V(se(l)), void H('error'));
                                const { error: s } = await (0, r(d[20]).payWithWallet)(re, t.id);
                                if (s)
                                  return (
                                    z(!1),
                                    (D.current = !1),
                                    G(t),
                                    V(
                                      s.message ??
                                        'Wallet payment failed. You can pay from My Trips.'
                                    ),
                                    void H('error')
                                  );
                                (Q(t => Math.max(0, t - re)), await ne(t, { alreadyExists: o }));
                              },
                            }),
                            (0, j.jsx)(S.default, {
                              title: 'Pay fee with MoMo / GhQR',
                              variant: 'secondary',
                              disabled: A,
                              onPress: () => {
                                M ? M({ trip: u, platformFee: re, baseFare: ae }) : H('momo');
                              },
                            }),
                            (0, j.jsx)(S.default, {
                              title: 'Confirm reservation',
                              variant: 'ghost',
                              loading: A,
                              disabled: A,
                              onPress: () => de(r(d[22]).PAYMENT_METHODS.PAY_ON_BOARD),
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
                'momo' === N
                  ? (0, j.jsxs)(j.Fragment, {
                      children: [
                        (0, j.jsx)(v, {
                          trip: u,
                          operatorName: U,
                          pickupPoint: oe,
                          baseFare: ae,
                          seatsLabel: J,
                          showFare: !1,
                          styles: B,
                        }),
                        (0, j.jsx)(r(d[28]).MoMoPaymentBody, {
                          amount: re,
                          seatFare: ae,
                          platformFee: re,
                          merchantCode: u.momoMerchantCode,
                          ghqrPayload: u.ghqrPayload,
                          reference: K,
                          onPaid: async ({ method: t, reference: l }) => {
                            await de(t, l);
                          },
                          onPayOnBoard: async () => {
                            await de(r(d[22]).PAYMENT_METHODS.PAY_ON_BOARD);
                          },
                        }),
                        (0, j.jsx)(s.default, {
                          style: B.actions,
                          children: (0, j.jsx)(S.default, {
                            title: 'Back to payment options',
                            variant: 'ghost',
                            onPress: () => H('payment'),
                          }),
                        }),
                      ],
                    })
                  : null,
                'loading' === N || A
                  ? (0, j.jsxs)(s.default, {
                      style: B.centerBlock,
                      children: [
                        (0, j.jsx)(o.default, { color: C.primary, size: 'large' }),
                        (0, j.jsx)(n.default, {
                          style: B.loadingText,
                          children: 'Holding your seat...',
                        }),
                      ],
                    })
                  : null,
                'success' === N && O
                  ? (0, j.jsxs)(s.default, {
                      style: B.centerBlock,
                      children: [
                        (0, j.jsx)(c.default.View, {
                          style: { transform: [{ scale: q }] },
                          children: (0, j.jsx)(P, { styles: B }),
                        }),
                        (0, j.jsx)(n.default, {
                          style: B.successTitle,
                          children: 'Seat reserved!',
                        }),
                        (0, j.jsxs)(n.default, {
                          style: B.countdownLabel,
                          children: ['Expires in ', $],
                        }),
                        (0, j.jsxs)(n.default, {
                          style: B.hint,
                          children: ['Head to ', oe, '. Your mate has been notified.'],
                        }),
                        (0, j.jsx)(h.default, {
                          trip: {
                            id: O.id,
                            tripId: O.trip_id ?? u.dbId ?? u.id,
                            route: u.route,
                            tripType: 'trotroride' === u.type ? 'trotroride' : 'trotro',
                            bookingKind: 'reservation',
                            trackShareToken: u.trackShareToken ?? u.track_share_token,
                            createdAt: O.created_at ?? new Date().toISOString(),
                            latitude: u.latitude,
                            longitude: u.longitude,
                          },
                          forceShow: !0,
                        }),
                        (0, j.jsxs)(s.default, {
                          style: B.successDetails,
                          children: [
                            (0, j.jsx)(n.default, {
                              style: B.successDetailText,
                              children: u.route,
                            }),
                            (0, j.jsxs)(n.default, {
                              style: B.successDetailText,
                              children: [
                                u.vehicleType ?? u.vehicleModel ?? 'Vehicle',
                                ' \xb7 ',
                                u.plateNumber,
                              ],
                            }),
                            (0, j.jsxs)(n.default, {
                              style: B.successDetailText,
                              children: [U, ' \xb7 Pickup: ', oe],
                            }),
                          ],
                        }),
                        (0, j.jsx)(b.default, {
                          phone: X,
                          operatorName: U,
                          message: Z,
                          compact: !0,
                        }),
                        (0, j.jsx)(S.default, {
                          title: 'View My Reservation',
                          onPress: () => {
                            (ie(),
                              (0, r(d[26]).navigateToMainTab)(
                                k,
                                r(d[27]).ROUTES.PASSENGER_MY_TRIPS
                              ));
                          },
                        }),
                      ],
                    })
                  : null,
                'error' === N
                  ? (0, j.jsxs)(s.default, {
                      style: B.centerBlock,
                      children: [
                        (0, j.jsx)(n.default, { style: B.errorText, children: L }),
                        (0, j.jsx)(s.default, {
                          style: B.actions,
                          children: (0, j.jsx)(S.default, {
                            title: 'Try again',
                            disabled: A,
                            loading: A,
                            onPress: () => H('payment'),
                          }),
                        }),
                      ],
                    })
                  : null,
              ],
            }),
            ue
              ? (0, j.jsx)(S.default, {
                  title: 'Cancel',
                  variant: 'ghost',
                  onPress: ie,
                  noMargin: !0,
                })
              : null,
          ],
        });
      }));
    var l = r(d[1]),
      o = t(r(d[2])),
      s = t(r(d[3])),
      n = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      y = t(r(d[7])),
      f = t(r(d[8])),
      p = t(r(d[9])),
      x = t(r(d[10])),
      h = t(r(d[11])),
      S = t(r(d[12])),
      b = t(r(d[13])),
      j = r(d[14]);
    function F({ label: t, value: l, children: o, styles: u }) {
      return (0, j.jsxs)(s.default, {
        style: u.detailRow,
        children: [
          (0, j.jsx)(n.default, { style: u.detailLabel, children: t }),
          o ?? (0, j.jsx)(n.default, { style: u.detailValue, children: l }),
        ],
      });
    }
    function v({
      trip: t,
      operatorName: l,
      pickupPoint: o,
      baseFare: u,
      seatsLabel: c,
      showFare: y = !0,
      styles: f,
    }) {
      const h = 'trotroride' === t.type,
        S = h ? 'Driver' : 'Mate',
        b = t.vehicleType ?? t.vehicleModel ?? (h ? 'Shared car' : 'Trotro'),
        v = t.origin ?? t.route?.split('\u2192')?.[0]?.trim(),
        P = t.destination ?? t.route?.split('\u2192')?.[1]?.trim(),
        w = t.departureTime
          ? String(t.departureTime).toLowerCase().includes('depart')
            ? t.departureTime
            : `Departed ${t.departureTime}`
          : null != t.pickupEta
            ? `Pickup ~${t.pickupEta} min`
            : null != t.eta
              ? `Trip ~${t.eta} min`
              : null;
      return (0, j.jsxs)(p.default, {
        inset: !0,
        padding: 'compact',
        style: f.tripSummaryCard,
        children: [
          (0, j.jsx)(n.default, { style: f.routeTitle, children: t.route }),
          v && P
            ? (0, j.jsxs)(n.default, { style: f.routeSub, children: [v, ' \u2192 ', P] })
            : null,
          (0, j.jsxs)(s.default, {
            style: f.summaryGrid,
            children: [
              (0, j.jsx)(F, { label: 'Vehicle', value: b, styles: f }),
              (0, j.jsx)(F, { label: 'Plate', value: t.plateNumber ?? '\u2014', styles: f }),
              (0, j.jsx)(F, {
                label: S,
                styles: f,
                children: (0, j.jsxs)(s.default, {
                  style: f.mateRow,
                  children: [
                    (0, j.jsx)(n.default, { style: f.detailValue, children: l }),
                    null != t.trustScore
                      ? (0, j.jsx)(s.default, {
                          style: f.trustWrap,
                          children: (0, j.jsx)(x.default, { score: t.trustScore, compact: !0 }),
                        })
                      : null,
                  ],
                }),
              }),
              c ? (0, j.jsx)(F, { label: 'Seats', value: c, styles: f }) : null,
              w
                ? (0, j.jsx)(F, { label: h ? 'Pickup ETA' : 'Departure', value: w, styles: f })
                : null,
              (0, j.jsx)(F, { label: 'Pickup', value: o, styles: f }),
              y
                ? (0, j.jsx)(F, {
                    label: 'Seat fare',
                    value: `GHS ${u.toFixed(2)} (pay on board)`,
                    styles: f,
                  })
                : null,
            ],
          }),
        ],
      });
    }
    function P({ styles: t }) {
      return (0, j.jsx)(s.default, {
        style: t.checkCircle,
        children: (0, j.jsx)(n.default, { style: t.checkMark, children: '\u2713' }),
      });
    }
    const w = t =>
      u.default.create({
        scrollContent: { paddingBottom: r(d[29]).spacing.sm },
        tripSummaryCard: { marginBottom: r(d[29]).spacing.md },
        routeTitle: {
          fontFamily: r(d[29]).fontFamily.bold,
          fontSize: 17,
          color: t.textPrimary,
          marginBottom: r(d[29]).spacing.xs,
        },
        routeSub: {
          fontFamily: r(d[29]).fontFamily.regular,
          fontSize: 13,
          color: t.textSecondary,
          marginBottom: r(d[29]).spacing.sm,
        },
        summaryGrid: { gap: r(d[29]).spacing.xs },
        detailRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: r(d[29]).spacing.sm,
        },
        detailLabel: {
          fontFamily: r(d[29]).fontFamily.semiBold,
          fontSize: 13,
          lineHeight: 18,
          color: t.textSecondary,
          flex: 1,
        },
        detailValue: {
          fontFamily: r(d[29]).fontFamily.medium,
          fontSize: 14,
          color: t.textPrimary,
          textAlign: 'right',
          flex: 1.2,
        },
        mateRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1.2,
        },
        trustWrap: { marginLeft: r(d[29]).spacing.sm },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: r(d[29]).spacing.md,
        },
        label: Object.assign({}, r(d[29]).typography.caption, { color: t.textSecondary }),
        value: { fontFamily: r(d[29]).fontFamily.medium, fontSize: 14, color: t.textPrimary },
        totalRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderTopWidth: 1,
          borderTopColor: t.border,
          paddingTop: r(d[29]).spacing.md,
          marginBottom: r(d[29]).spacing.md,
        },
        totalLabel: {
          fontFamily: r(d[29]).fontFamily.semiBold,
          fontSize: 16,
          color: t.textPrimary,
        },
        totalValue: { fontFamily: r(d[29]).fontFamily.bold, fontSize: 18, color: t.textPrimary },
        hint: {
          fontFamily: r(d[29]).fontFamily.regular,
          fontSize: 14,
          lineHeight: 20,
          color: t.textSecondary,
          marginBottom: r(d[29]).spacing.sm,
        },
        sectionLabel: {
          fontFamily: r(d[29]).fontFamily.semiBold,
          fontSize: 14,
          color: t.textPrimary,
          marginBottom: r(d[29]).spacing.xs,
        },
        successDetails: { alignItems: 'center', marginBottom: r(d[29]).spacing.sm },
        successDetailText: {
          fontFamily: r(d[29]).fontFamily.medium,
          fontSize: 14,
          lineHeight: 20,
          color: t.textSecondary,
          textAlign: 'center',
        },
        paymentSummary: {
          backgroundColor: t.surfaceSoft,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: t.borderSoft ?? t.border,
          padding: r(d[29]).spacing.md,
          marginBottom: r(d[29]).spacing.md,
          gap: r(d[29]).spacing.sm,
        },
        paymentSummaryRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        paymentSummaryLabel: {
          fontFamily: r(d[29]).fontFamily.medium,
          fontSize: 14,
          color: t.textSecondary,
        },
        paymentSummaryLabelStrong: {
          fontFamily: r(d[29]).fontFamily.semiBold,
          fontSize: 14,
          color: t.textPrimary,
        },
        paymentSummaryValue: {
          fontFamily: r(d[29]).fontFamily.medium,
          fontSize: 14,
          color: t.textPrimary,
        },
        paymentSummaryValueStrong: {
          fontFamily: r(d[29]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
        },
        paymentIntro: {
          fontFamily: r(d[29]).fontFamily.regular,
          fontSize: 15,
          lineHeight: 22,
          color: t.textSecondary,
          marginBottom: r(d[29]).spacing.lg,
        },
        actions: { gap: r(d[29]).spacing.sm, marginTop: r(d[29]).spacing.sm },
        centerBlock: { alignItems: 'center', paddingVertical: r(d[29]).spacing.lg },
        loadingText: {
          fontFamily: r(d[29]).fontFamily.medium,
          fontSize: 15,
          lineHeight: 22,
          marginTop: r(d[29]).spacing.md,
          color: t.textPrimary,
        },
        checkCircle: {
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: t.success,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: r(d[29]).spacing.lg,
        },
        checkMark: {
          fontFamily: r(d[29]).fontFamily.bold,
          fontSize: 36,
          color: t.onPrimary ?? '#FFFFFF',
        },
        successTitle: {
          fontFamily: r(d[29]).fontFamily.bold,
          fontSize: 22,
          color: t.textPrimary,
          marginBottom: r(d[29]).spacing.sm,
        },
        countdownLabel: {
          fontFamily: r(d[29]).fontFamily.bold,
          fontSize: 28,
          color: t.textPrimary,
          marginBottom: r(d[29]).spacing.md,
        },
        errorText: {
          fontFamily: r(d[29]).fontFamily.medium,
          fontSize: 15,
          color: t.error,
          textAlign: 'center',
          marginBottom: r(d[29]).spacing.lg,
          lineHeight: 22,
        },
      });
  },
  1738,
  [
    1, 5, 373, 19, 161, 26, 7, 106, 1515, 684, 1486, 1516, 672, 1520, 183, 382, 381, 501, 1386, 936,
    1491, 1521, 508, 1522, 1523, 760, 1488, 682, 1525, 377,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: o,
        trip: l,
        origin: h,
        destination: x,
        onClose: j,
        onConfirm: S,
      }) {
        const { colors: F } = (0, r(d[10]).useTheme)(),
          w = y(F),
          [_, k] = (0, t.useState)(0);
        (0, t.useEffect)(() => {
          o && k(0);
        }, [o, l?.id]);
        const v = (0, t.useMemo)(
          () => (l && h && x ? (0, r(d[11]).compareCorridorPricing)(h, x, { trip: l }) : null),
          [h, x, l]
        );
        if (!l) return null;
        const { lines: B, farePerSeat: C } = b(l),
          P = 'online_driver' === l.listingType,
          T = 'shared_ride' === l.listingType,
          R = (0, r(d[11]).applyFareBoost)(C, _);
        return (0, p.jsxs)(u.default, {
          visible: o,
          title: P ? 'Request TrotroRide' : T ? 'Join shared ride' : 'Book TrotroRide',
          subtitle: `${l.vehicleModel} \xb7 ${l.plateNumber}`,
          onClose: j,
          onConfirm: () => {
            S?.({ fareBoostGhs: _, adjustedFarePerSeat: R });
          },
          confirmTitle: P ? 'Send request' : T ? 'Join ride' : 'Confirm booking',
          children: [
            (0, p.jsxs)(n.default, {
              style: w.driverRow,
              children: [
                (0, p.jsx)(s.default, { style: w.driverName, children: l.driverName }),
                (0, p.jsx)(f.default, {
                  score: l.trustScore,
                  compact: !0,
                  variant: l.trustScore >= 80 ? 'success' : 'primary',
                }),
              ],
            }),
            v
              ? (0, p.jsxs)(n.default, {
                  style: w.compareBox,
                  children: [
                    (0, p.jsx)(s.default, { style: w.sectionTitle, children: 'vs Bolt / Uber' }),
                    (0, p.jsxs)(n.default, {
                      style: w.compareRow,
                      children: [
                        (0, p.jsx)(s.default, {
                          style: w.compareLabel,
                          children: 'Private ride-hail est.',
                        }),
                        (0, p.jsxs)(s.default, {
                          style: w.compareStrike,
                          children: ['GHS ', v.rideHailAvg.toFixed(2)],
                        }),
                      ],
                    }),
                    (0, p.jsxs)(n.default, {
                      style: w.compareRow,
                      children: [
                        (0, p.jsx)(s.default, {
                          style: w.compareLabel,
                          children: 'Your TrotroRide seat',
                        }),
                        (0, p.jsxs)(s.default, {
                          style: w.compareSave,
                          children: ['GHS ', R.toFixed(2)],
                        }),
                      ],
                    }),
                    (0, p.jsxs)(s.default, {
                      style: w.boostHint,
                      children: [
                        'Save ~GHS ',
                        (v.rideHailAvg - R).toFixed(0),
                        ' on this corridor \u2014 plus shared ride and Trip Guardian.',
                      ],
                    }),
                  ],
                })
              : null,
            (0, p.jsx)(s.default, { style: w.sectionTitle, children: 'Fare breakdown' }),
            B.map(o =>
              (0, p.jsxs)(
                n.default,
                {
                  style: w.breakdownRow,
                  children: [
                    (0, p.jsx)(s.default, { style: w.breakdownLabel, children: o.label }),
                    null != o.amount
                      ? (0, p.jsxs)(s.default, {
                          style: w.breakdownAmount,
                          children: ['GHS ', Number(o.amount).toFixed(2)],
                        })
                      : null,
                  ],
                },
                o.label
              )
            ),
            P
              ? (0, p.jsxs)(p.Fragment, {
                  children: [
                    (0, p.jsx)(s.default, {
                      style: [w.sectionTitle, { marginTop: r(d[9]).spacing.md }],
                      children: 'Boost fare (faster match)',
                    }),
                    (0, p.jsx)(s.default, {
                      style: w.boostHint,
                      children:
                        'Like Bolt Kumasi \u2014 add a top-up so drivers accept sooner when demand is high.',
                    }),
                    (0, p.jsx)(n.default, {
                      style: w.boostRow,
                      children: r(d[12]).FARE_BOOST_OPTIONS_GHS.map(o => {
                        const t = _ === o;
                        return (0, p.jsx)(
                          c.default,
                          {
                            style: [w.boostChip, t && w.boostChipActive],
                            onPress: () => k(o),
                            children: (0, p.jsx)(s.default, {
                              style: [w.boostChipText, t && w.boostChipTextActive],
                              children: 0 === o ? 'Standard' : `+GHS ${o}`,
                            }),
                          },
                          o
                        );
                      }),
                    }),
                  ],
                })
              : null,
            _ > 0
              ? (0, p.jsxs)(n.default, {
                  style: w.breakdownRow,
                  children: [
                    (0, p.jsx)(s.default, { style: w.breakdownLabel, children: 'Fare boost' }),
                    (0, p.jsxs)(s.default, {
                      style: w.breakdownAmount,
                      children: ['+ GHS ', _.toFixed(2)],
                    }),
                  ],
                })
              : null,
            (0, p.jsxs)(n.default, {
              style: w.yourFareRow,
              children: [
                (0, p.jsx)(s.default, { style: w.yourFareLabel, children: 'Your fare' }),
                (0, p.jsxs)(s.default, {
                  style: w.yourFareValue,
                  children: ['GHS ', R.toFixed(2)],
                }),
              ],
            }),
            (0, p.jsx)(s.default, {
              style: w.coPassenger,
              children: l.coPassenger
                ? `1 co-passenger (${l.coPassenger.name}, ${l.coPassenger.rating} stars)`
                : 'No co-passengers yet',
            }),
          ],
        });
      }));
    var t = r(d[1]),
      n = o(r(d[2])),
      s = o(r(d[3])),
      l = o(r(d[4])),
      c = o(r(d[5])),
      u = o(r(d[6])),
      f = o(r(d[7])),
      p = r(d[8]);
    function b(o) {
      const t = o?.fareBreakdown ?? {},
        n = t.fareEngine ?? {},
        s = n.fare_breakdown ?? t,
        l = n.route_summary?.distance_km ?? t.distanceKm ?? t.distance_km ?? 8.2,
        c =
          (t.timeMin ?? t.time_min,
          o?.farePerSeat ?? t.farePerPassenger ?? n.fare_per_rider_ghs ?? 0),
        u = n.ride_mode ?? t.rideMode ?? 'Private';
      if (null != s.base_rate_share || null != s.base_rate) {
        return {
          lines: [
            { label: `${u} \xb7 base share`, amount: s.base_rate_share ?? s.base_rate ?? 0 },
            {
              label: `Distance share (${l} km)`,
              amount: s.distance_charge_share ?? s.distance_charge ?? 0,
            },
            { label: 'Booking fee', amount: s.booking_fee ?? s.platform_fees ?? 2 },
          ],
          farePerSeat: c,
        };
      }
      return null != t.subtotal || null != t.totalFare
        ? {
            lines: [
              { label: 'Subtotal', amount: t.subtotal ?? t.totalFare },
              { label: `${u} fixed fare`, amount: null },
            ],
            farePerSeat: c,
          }
        : { lines: [{ label: `${l} km \xb7 ${u}`, amount: c }], farePerSeat: c };
    }
    const y = o =>
      l.default.create({
        driverRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[9]).spacing.lg,
        },
        driverName: { fontFamily: r(d[9]).fontFamily.semiBold, fontSize: 16, color: o.textPrimary },
        sectionTitle: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 15,
          color: o.textPrimary,
          marginBottom: r(d[9]).spacing.sm,
        },
        breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
        breakdownLabel: Object.assign({}, r(d[9]).typography.caption, {
          flex: 1,
          paddingRight: r(d[9]).spacing.sm,
          color: o.textSecondary,
        }),
        breakdownAmount: {
          fontFamily: r(d[9]).fontFamily.medium,
          fontSize: 13,
          color: o.textPrimary,
        },
        yourFareRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: r(d[9]).spacing.md,
          marginBottom: r(d[9]).spacing.md,
          paddingTop: r(d[9]).spacing.md,
          borderTopWidth: 1,
          borderTopColor: o.border,
        },
        yourFareLabel: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 16,
          color: o.textPrimary,
        },
        yourFareValue: { fontFamily: r(d[9]).fontFamily.bold, fontSize: 18, color: o.primary },
        coPassenger: Object.assign({}, r(d[9]).typography.caption, {
          marginBottom: r(d[9]).spacing.sm,
          color: o.textMuted,
        }),
        compareBox: {
          backgroundColor: o.surface,
          borderRadius: r(d[9]).radius.md,
          borderWidth: 1,
          borderColor: o.border,
          padding: r(d[9]).spacing.md,
          marginBottom: r(d[9]).spacing.md,
        },
        compareRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
        compareLabel: Object.assign({}, r(d[9]).typography.caption, { color: o.textSecondary }),
        compareStrike: {
          fontFamily: r(d[9]).fontFamily.medium,
          fontSize: 13,
          color: o.textMuted,
          textDecorationLine: 'line-through',
        },
        compareSave: { fontFamily: r(d[9]).fontFamily.semiBold, fontSize: 13, color: o.primary },
        boostRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[9]).spacing.sm,
          marginBottom: r(d[9]).spacing.md,
        },
        boostChip: {
          paddingHorizontal: r(d[9]).spacing.md,
          paddingVertical: r(d[9]).spacing.sm,
          borderRadius: r(d[9]).radius.sm,
          borderWidth: 1,
          borderColor: o.border,
          backgroundColor: o.surface,
        },
        boostChipActive: { borderColor: o.primary, backgroundColor: o.primary },
        boostChipText: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 13,
          color: o.textPrimary,
        },
        boostChipTextActive: { color: o.onPrimary },
        boostHint: Object.assign({}, r(d[9]).typography.caption, {
          marginBottom: r(d[9]).spacing.sm,
          color: o.textMuted,
        }),
      });
  },
  1739,
  [1, 5, 19, 161, 26, 326, 1515, 1486, 183, 377, 381, 1509, 676]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = r(d[1]),
      n = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      p = t(r(d[7])),
      h = t(r(d[8])),
      f = t(r(d[9])),
      y = t(r(d[10])),
      x = r(d[11]);
    function j({ coordinate: t, colors: n }) {
      const s = (0, o.useRef)(new l.default.Value(0)).current;
      (0, o.useEffect)(() => {
        const t = l.default.loop(
          l.default.sequence([
            l.default.timing(s, { toValue: 1, duration: 1200, useNativeDriver: !0 }),
            l.default.timing(s, { toValue: 0, duration: 0, useNativeDriver: !0 }),
          ])
        );
        return (t.start(), () => t.stop());
      }, [s]);
      const u = s.interpolate({ inputRange: [0, 1], outputRange: [0.8, 2.6] }),
        c = s.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });
      return (0, x.jsx)(r(d[12]).Marker, {
        coordinate: t,
        anchor: { x: 0.5, y: 0.5 },
        title: 'Your pickup',
        children: (0, x.jsxs)(h.default, {
          style: v.markerWrap,
          children: [
            (0, x.jsx)(l.default.View, {
              style: [
                v.locationPulse,
                { backgroundColor: n.mateBlue, opacity: c, transform: [{ scale: u }] },
              ],
            }),
            (0, x.jsx)(h.default, {
              style: [v.locationDot, { backgroundColor: n.mateBlue, borderColor: n.onPrimary }],
            }),
          ],
        }),
      });
    }
    function b({ coordinate: t, type: o, colors: n }) {
      const l = 'destination' === o;
      return (0, x.jsx)(r(d[12]).Marker, {
        coordinate: t,
        anchor: { x: 0.5, y: 0.5 },
        title: l ? 'Destination' : 'Pickup',
        children: (0, x.jsx)(h.default, {
          style: [
            v.stopPin,
            { backgroundColor: l ? n.primary : n.greenAccent, borderColor: n.onPrimary },
          ],
          children: (0, x.jsx)(p.default, {
            style: [v.stopPinText, { color: n.onPrimary }],
            children: l ? 'B' : 'A',
          }),
        }),
      });
    }
    function C({
      origin: t = '',
      destination: l = '',
      height: c = 200,
      locations: C = [],
      loading: v = !1,
      error: P = null,
      routeCoordinates: R = [],
      routeSummary: w = null,
      pickupCoordinate: M = null,
      destinationCoordinate: W = null,
    }) {
      const { colors: F } = (0, r(d[13]).useTheme)(),
        $ = (0, o.useMemo)(() => k(F), [F]),
        z = v
          ? '\u2026'
          : 0 === C.length
            ? 'No vehicles'
            : `${C.length} vehicle${1 === C.length ? '' : 's'}`,
        B = (0, o.useMemo)(
          () =>
            (0, r(d[14]).mergeMapLocations)(C).map((t, o) => ({
              key: `${t.vehicleKind ?? 'trotro'}-${t.mateId ?? 'm'}-${t.tripId ?? 't'}-${o}`,
              coordinate: { latitude: t.latitude, longitude: t.longitude },
              heading: t.heading,
              title: t.mateName,
              description: t.route,
            })),
          [C]
        ),
        A = (0, o.useMemo)(() => {
          const t = [...(R ?? []), M, W, ...B.map(t => t.coordinate)].filter(
            t => null != t?.latitude && null != t?.longitude
          );
          return t.length >= 2 ? (0, r(d[15]).regionForCoordinates)(t) : null;
        }, [R, M, W, B]),
        I = w
          ? `${w.durationMin} min \xb7 ${w.distanceKm.toFixed(1)} km`
          : t && l
            ? `${t} \u2192 ${l}`
            : null,
        S = W ?? M;
      return (0, x.jsxs)(h.default, {
        style: [$.container, { height: c }],
        children: [
          (0, x.jsxs)(h.default, {
            style: $.header,
            children: [
              (0, x.jsx)(p.default, { style: $.title, children: 'Route map' }),
              (0, x.jsxs)(h.default, {
                style: $.headerActions,
                children: [
                  (0, x.jsx)(p.default, { style: $.count, children: z }),
                  S
                    ? (0, x.jsx)(u.default, {
                        style: $.navigateBtn,
                        onPress: () => {
                          const t = (0, r(d[16]).getExternalNavigationUrl)(
                            S?.latitude,
                            S?.longitude
                          );
                          t && s.default.openURL(t);
                        },
                        children: (0, x.jsx)(p.default, {
                          style: $.navigateText,
                          children: 'Navigate',
                        }),
                      })
                    : null,
                ],
              }),
            ],
          }),
          (0, x.jsx)(h.default, {
            style: $.mapWrap,
            children: v
              ? (0, x.jsx)(h.default, {
                  style: $.loading,
                  children: (0, x.jsx)(n.default, { color: F.primary }),
                })
              : (0, x.jsxs)(f.default, {
                  style: $.map,
                  showsUserLocation: !1,
                  region: A,
                  children: [
                    R?.length >= 2
                      ? (0, x.jsx)(r(d[12]).Polyline, {
                          coordinates: R,
                          strokeColor: F.primaryLight ?? F.primary,
                          strokeWidth: 5,
                          lineCap: 'round',
                          lineJoin: 'round',
                          zIndex: 1,
                        })
                      : null,
                    M ? (0, x.jsx)(j, { coordinate: M, colors: F }) : null,
                    W ? (0, x.jsx)(b, { coordinate: W, type: 'destination', colors: F }) : null,
                    B.map(t =>
                      (0, x.jsx)(
                        y.default,
                        {
                          coordinate: t.coordinate,
                          heading: t.heading,
                          title: t.title,
                          description: t.description,
                        },
                        t.key
                      )
                    ),
                  ],
                }),
          }),
          I ? (0, x.jsx)(p.default, { style: $.routeMeta, children: I }) : null,
          P
            ? (0, x.jsx)(p.default, { style: $.error, children: (0, r(d[17]).errorMessage)(P) })
            : null,
          v || 0 !== C.length
            ? null
            : (0, x.jsx)(p.default, { style: $.hint, children: 'No vehicles on this route yet.' }),
        ],
      });
    }
    e.default = (0, o.memo)(C);
    const k = t =>
        c.default.create({
          container: {
            marginHorizontal: r(d[18]).layout.screenPadding,
            marginBottom: r(d[18]).spacing.md,
            borderRadius: r(d[18]).radius.lg,
            overflow: 'hidden',
            borderWidth: c.default.hairlineWidth,
            borderColor: t.borderSoft,
            backgroundColor: t.surface,
          },
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: r(d[18]).spacing.md,
            paddingVertical: r(d[18]).spacing.sm + 2,
            borderBottomWidth: c.default.hairlineWidth,
            borderBottomColor: t.borderSoft,
          },
          title: { fontFamily: r(d[18]).fontFamily.medium, fontSize: 14, color: t.textPrimary },
          count: Object.assign({}, r(d[18]).typography.caption),
          headerActions: { flexDirection: 'row', alignItems: 'center', gap: r(d[18]).spacing.sm },
          navigateBtn: {
            paddingHorizontal: r(d[18]).spacing.sm,
            paddingVertical: 5,
            borderRadius: r(d[18]).radius.pill,
            backgroundColor: t.primary,
          },
          navigateText: {
            fontFamily: r(d[18]).fontFamily.semiBold,
            fontSize: 12,
            color: t.onPrimary,
          },
          mapWrap: { flex: 1, minHeight: 140 },
          map: { flex: 1 },
          loading: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: t.backgroundAlt,
          },
          hint: Object.assign({}, r(d[18]).typography.caption, {
            padding: r(d[18]).spacing.sm,
            textAlign: 'center',
          }),
          error: {
            fontFamily: r(d[18]).fontFamily.regular,
            fontSize: 12,
            color: t.error,
            padding: r(d[18]).spacing.xs,
            textAlign: 'center',
          },
          routeMeta: Object.assign({}, r(d[18]).typography.caption, {
            paddingHorizontal: r(d[18]).spacing.sm,
            paddingTop: r(d[18]).spacing.sm,
            textAlign: 'center',
            color: t.textSecondary,
          }),
        }),
      v = c.default.create({
        markerWrap: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
        locationPulse: { position: 'absolute', width: 18, height: 18, borderRadius: 9 },
        locationDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 3 },
        stopPin: {
          width: 26,
          height: 26,
          borderRadius: 13,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
        },
        stopPinText: { fontFamily: r(d[18]).fontFamily.bold, fontSize: 12 },
      });
  },
  1740,
  [1, 5, 373, 7, 667, 326, 26, 161, 19, 745, 751, 183, 747, 381, 1741, 1487, 749, 557, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      return !t?.isLive || t.isDemo || null == t.latitude || null == t.longitude
        ? null
        : {
            mateId: t.mateId ?? t.driverId ?? t.id,
            tripId: t.dbId ?? t.id,
            route: t.route ?? `${t.origin} \u2192 ${t.destination}`,
            latitude: t.latitude,
            longitude: t.longitude,
            heading: t.heading ?? 0,
            speedKmh: t.speedKmh ?? 0,
            mateName: t.mateName ?? t.driverName ?? 'Driver',
            plateNumber: t.plateNumber ?? '',
            vehicleKind: 'trotroride' === t.type ? 'trotroride' : 'trotro',
          };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.mergeMapLocations = function (...t) {
        const n = new Set(),
          o = [];
        return (
          t.flat().forEach(t => {
            if (!t || null == t.latitude || null == t.longitude) return;
            const u = `${t.vehicleKind ?? 'trotro'}-${t.mateId ?? t.tripId ?? `${t.latitude},${t.longitude}`}`;
            n.has(u) || (n.add(u), o.push(t));
          }),
          o
        );
      }),
      (e.tripToMapLocation = t),
      (e.tripsToMapLocations = function (n = []) {
        return n.map(t).filter(Boolean);
      }));
  },
  1741,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ onSelectRoute: t, selectedOrigin: s, selectedDestination: y }) {
        const { colors: x } = (0, r(d[9]).useTheme)(),
          j = (0, n.useMemo)(() => f(x), [x]),
          [b, S] = (0, n.useState)([]),
          [w, z] = (0, n.useState)(!1),
          [T, v] = (0, n.useState)(null);
        (0, n.useEffect)(() => {
          const t = ({ routes: t, live: n }) => {
            (S(t ?? []), z(Boolean(n)), v(Date.now()));
          };
          return (
            (0, r(d[10]).fetchQueueDemandRoutes)().then(({ data: n }) => {
              t({ routes: n ?? [], live: !0 });
            }),
            (0, r(d[10]).subscribeToQueueDemand)(t)
          );
        }, []);
        const F = (0, n.useMemo)(() => b.slice(0, 6), [b]);
        return 0 === F.length
          ? null
          : (0, h.jsxs)(u.default, {
              style: j.wrap,
              children: [
                (0, h.jsxs)(u.default, {
                  style: j.header,
                  children: [
                    (0, h.jsxs)(u.default, {
                      style: j.headerTop,
                      children: [
                        (0, h.jsx)(c.default, { style: j.title, children: 'Popular routes' }),
                        w ? (0, h.jsx)(p.default, { active: !0, variant: 'inline' }) : null,
                      ],
                    }),
                    (0, h.jsx)(c.default, {
                      style: j.subtitle,
                      children: 'Passengers waiting on these corridors',
                    }),
                  ],
                }),
                (0, h.jsx)(l.default, {
                  horizontal: !0,
                  showsHorizontalScrollIndicator: !1,
                  contentContainerStyle: j.scroll,
                  children: F.map((n, l) => {
                    const p = n.origin === s && n.destination === y;
                    return (0, h.jsxs)(
                      o.default,
                      {
                        style: [j.chip, p && j.chipSelected],
                        onPress: () =>
                          t?.({ origin: n.origin, destination: n.destination, route: n.route }),
                        children: [
                          (0, h.jsxs)(c.default, {
                            style: j.chipRoute,
                            numberOfLines: 2,
                            children: [n.origin, ' \u2192 ', n.destination],
                          }),
                          (0, h.jsxs)(c.default, {
                            style: j.chipMeta,
                            children: [n.waiting ?? 0, ' waiting'],
                          }),
                          p
                            ? (0, h.jsxs)(u.default, {
                                style: j.selectedRow,
                                children: [
                                  (0, h.jsx)(r(d[11]).Ionicons, {
                                    name: 'checkmark-circle',
                                    size: 14,
                                    color: x.primaryLight,
                                  }),
                                  (0, h.jsx)(c.default, {
                                    style: j.selectedText,
                                    children: 'Selected',
                                  }),
                                ],
                              })
                            : null,
                        ],
                      },
                      n.id ?? `${n.origin}-${n.destination}`
                    );
                  }),
                }),
                T
                  ? (0, h.jsxs)(c.default, {
                      style: j.updated,
                      children: [
                        'Updated',
                        ' ',
                        new Date(T).toLocaleTimeString('en-GH', {
                          hour: '2-digit',
                          minute: '2-digit',
                        }),
                      ],
                    })
                  : null,
              ],
            });
      }));
    var n = r(d[1]),
      o = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      h = r(d[8]);
    const f = t =>
      s.default.create({
        wrap: { marginBottom: r(d[12]).spacing.lg },
        header: {
          marginBottom: r(d[12]).spacing.sm,
          paddingHorizontal: r(d[12]).layout?.screenPadding ?? r(d[12]).spacing.lg,
          gap: 2,
        },
        headerTop: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: r(d[12]).spacing.md,
        },
        title: {
          fontFamily: r(d[12]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: 2,
        },
        subtitle: Object.assign({}, r(d[12]).typography.caption, { lineHeight: 18, maxWidth: 260 }),
        scroll: { paddingHorizontal: r(d[12]).spacing.lg, gap: r(d[12]).spacing.sm },
        chip: {
          width: 168,
          padding: r(d[12]).spacing.md,
          borderRadius: r(d[12]).radius.md,
          backgroundColor: t.surfaceElevated,
          borderWidth: s.default.hairlineWidth,
          borderColor: t.borderStrong,
        },
        chipSelected: { borderColor: t.primary, backgroundColor: t.chipSelectedBg },
        chipRoute: {
          fontFamily: r(d[12]).fontFamily.semiBold,
          fontSize: 13,
          lineHeight: 18,
          color: t.textPrimary,
          marginBottom: r(d[12]).spacing.xs,
        },
        chipMeta: {
          fontFamily: r(d[12]).fontFamily.regular,
          fontSize: 11,
          color: t.textMuted,
          lineHeight: 16,
        },
        selectedRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          marginTop: r(d[12]).spacing.xs,
        },
        selectedText: {
          fontFamily: r(d[12]).fontFamily.medium,
          fontSize: 11,
          color: t.textSecondary,
        },
        updated: Object.assign({}, r(d[12]).typography.caption, {
          textAlign: 'center',
          marginTop: r(d[12]).spacing.sm,
        }),
      });
  },
  1742,
  [1, 5, 326, 106, 26, 161, 19, 752, 183, 381, 1503, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var l = t(r(d[1])),
      s = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      c = r(d[5]),
      u = r(d[6]);
    const f = t =>
      o.default.create({
        card: {
          backgroundColor: t.surfaceElevated,
          borderRadius: r(d[7]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          padding: r(d[7]).spacing.md,
          marginBottom: r(d[7]).spacing.md,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: r(d[7]).spacing.sm,
          gap: r(d[7]).spacing.sm,
        },
        title: { fontFamily: r(d[7]).fontFamily.bold, fontSize: 15, color: t.textPrimary, flex: 1 },
        dismissBtn: { padding: 4, marginLeft: r(d[7]).spacing.xs },
        savingsBadge: {
          backgroundColor: t.primary,
          paddingHorizontal: r(d[7]).spacing.sm,
          paddingVertical: 4,
          borderRadius: r(d[7]).radius.sm,
        },
        savingsText: { fontFamily: r(d[7]).fontFamily.bold, fontSize: 12, color: t.onPrimary },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 4,
        },
        label: Object.assign({}, r(d[7]).typography.caption, { flex: 1 }),
        value: { fontFamily: r(d[7]).fontFamily.semiBold, fontSize: 14, color: t.textPrimary },
        trotroValue: { fontFamily: r(d[7]).fontFamily.bold, fontSize: 15, color: t.primary },
        competitorValue: {
          fontFamily: r(d[7]).fontFamily.medium,
          fontSize: 14,
          color: t.textMuted,
          textDecorationLine: 'line-through',
        },
        footer: Object.assign({}, r(d[7]).typography.caption, {
          marginTop: r(d[7]).spacing.sm,
          lineHeight: 18,
          color: t.textSecondary,
        }),
        modeKicker: {
          fontFamily: r(d[7]).fontFamily.medium,
          fontSize: 12,
          color: t.textMuted,
          marginBottom: r(d[7]).spacing.xs,
          textTransform: 'uppercase',
          letterSpacing: 0.4,
        },
      });
    function y(t) {
      switch (t) {
        case r(d[8]).TRANSPORT_MODES.TROTRO:
          return 'Trotro seats & station queues';
        case r(d[8]).TRANSPORT_MODES.TROTRORIDE:
          return 'Shared rides \xb7 live ETA & fare boost';
        case r(d[8]).TRANSPORT_MODES.DELIVERY:
          return 'Delivery on this corridor';
        case r(d[8]).TRANSPORT_MODES.ALL:
        default:
          return 'Why TrotroOS beats ride-hail here';
      }
    }
    function R({ mode: t, pricing: l, deliveryQuote: o, styles: n }) {
      const c = `${l.distanceKm} km \xb7 ~${l.timeMin} min`,
        f = (0, r(d[9]).applyFareBoost)(l.trotroRideSeat, 3);
      return t === r(d[8]).TRANSPORT_MODES.TROTRO
        ? (0, u.jsxs)(s.default, {
            style: n.footer,
            children: [
              c,
              '. Reserve a seat ahead, join the station queue digitally, and pay on board or with MoMo \u2014 public transport from GHS ',
              l.trotroSeat.toFixed(2),
              '.',
            ],
          })
        : t === r(d[8]).TRANSPORT_MODES.TROTRORIDE
          ? (0, u.jsxs)(s.default, {
              style: n.footer,
              children: [
                c,
                '. Shared TrotroRide from GHS ',
                l.trotroRideSeat.toFixed(2),
                ' per seat \xb7 boost to ~GHS ',
                f.toFixed(2),
                ' in peak hours \xb7 live pickup ETA & Trip Guardian included.',
              ],
            })
          : t === r(d[8]).TRANSPORT_MODES.DELIVERY
            ? (0, u.jsxs)(s.default, {
                style: n.footer,
                children: [
                  c,
                  '. Motorbike parcel from GHS ',
                  o.deliveryFee.toFixed(2),
                  ' (small). Order food or send a parcel \u2014 couriers route on the same corridor.',
                ],
              })
            : (0, u.jsxs)(s.default, {
                style: n.footer,
                children: [
                  'Same ',
                  c,
                  ". TrotroOS adds seat reservation, station queues, MoMo/GhQR, and Trip Guardian \u2014 features private ride-hail doesn't offer on trotro routes.",
                ],
              });
    }
    e.default = (0, c.memo)(function ({
      origin: t,
      destination: o,
      mode: c = r(d[8]).TRANSPORT_MODES.ALL,
      routeMetrics: x = null,
      compact: T = !1,
      onDismiss: h = null,
    }) {
      const { colors: S } = (0, r(d[10]).useTheme)(),
        O = f(S);
      if (!t?.trim() || !o?.trim()) return null;
      const p = (0, r(d[9]).compareCorridorPricing)(t, o, { routeMetrics: x }),
        j = (0, r(d[11]).calculateParcelDeliveryFare)(p.distanceKm, 'small'),
        v = (0, r(d[9]).applyFareBoost)(p.trotroRideSeat, 3),
        b = h
          ? (0, u.jsx)(n.default, {
              onPress: h,
              style: O.dismissBtn,
              hitSlop: 10,
              accessibilityRole: 'button',
              accessibilityLabel: 'Dismiss tips',
              children: (0, u.jsx)(r(d[12]).Ionicons, {
                name: 'close',
                size: 20,
                color: S.textMuted,
              }),
            })
          : null;
      if (c === r(d[8]).TRANSPORT_MODES.DELIVERY)
        return (0, u.jsxs)(l.default, {
          style: O.card,
          children: [
            (0, u.jsxs)(l.default, {
              style: O.headerRow,
              children: [
                (0, u.jsx)(r(d[12]).Ionicons, { name: 'cube-outline', size: 20, color: S.primary }),
                (0, u.jsx)(s.default, { style: O.title, children: y(c) }),
                b,
              ],
            }),
            (0, u.jsxs)(s.default, {
              style: O.modeKicker,
              children: [t.trim(), ' \u2192 ', o.trim()],
            }),
            (0, u.jsxs)(l.default, {
              style: O.row,
              children: [
                (0, u.jsx)(s.default, { style: O.label, children: 'Small parcel (motorbike)' }),
                (0, u.jsxs)(s.default, {
                  style: O.trotroValue,
                  children: ['GHS ', j.deliveryFee.toFixed(2)],
                }),
              ],
            }),
            (0, u.jsxs)(l.default, {
              style: O.row,
              children: [
                (0, u.jsx)(s.default, { style: O.label, children: 'Medium parcel estimate' }),
                (0, u.jsxs)(s.default, {
                  style: O.value,
                  children: [
                    'GHS ',
                    (0, r(d[11]).calculateParcelDeliveryFare)(
                      p.distanceKm,
                      'medium'
                    ).deliveryFee.toFixed(2),
                  ],
                }),
              ],
            }),
            (0, u.jsxs)(l.default, {
              style: O.row,
              children: [
                (0, u.jsx)(s.default, {
                  style: O.label,
                  children: 'Passenger ride-hail (reference)',
                }),
                (0, u.jsxs)(s.default, {
                  style: O.competitorValue,
                  children: ['GHS ', p.rideHailAvg.toFixed(2)],
                }),
              ],
            }),
            (0, u.jsx)(R, { mode: c, pricing: p, deliveryQuote: j, styles: O }),
          ],
        });
      if (T)
        return (0, u.jsx)(l.default, {
          style: O.card,
          children: (0, u.jsxs)(l.default, {
            style: O.headerRow,
            children: [
              (0, u.jsx)(r(d[12]).Ionicons, { name: 'trending-down', size: 18, color: S.primary }),
              (0, u.jsxs)(s.default, {
                style: O.title,
                children: ['Save ~', p.savingsPercent, '% vs Bolt/Uber'],
              }),
              (0, u.jsx)(l.default, {
                style: O.savingsBadge,
                children: (0, u.jsxs)(s.default, {
                  style: O.savingsText,
                  children: ['GHS ', p.savingsVsBolt.toFixed(0)],
                }),
              }),
              b,
            ],
          }),
        });
      const D = c === r(d[8]).TRANSPORT_MODES.ALL,
        E = c === r(d[8]).TRANSPORT_MODES.TROTRO || D,
        F = c === r(d[8]).TRANSPORT_MODES.TROTRORIDE || D;
      return (0, u.jsxs)(l.default, {
        style: O.card,
        children: [
          (0, u.jsxs)(l.default, {
            style: O.headerRow,
            children: [
              (0, u.jsx)(r(d[12]).Ionicons, {
                name: c === r(d[8]).TRANSPORT_MODES.TROTRORIDE ? 'car-sport' : 'flash',
                size: 20,
                color: S.primary,
              }),
              (0, u.jsx)(s.default, { style: O.title, children: y(c) }),
              p.savingsPercent > 0 && c !== r(d[8]).TRANSPORT_MODES.TROTRORIDE
                ? (0, u.jsx)(l.default, {
                    style: O.savingsBadge,
                    children: (0, u.jsxs)(s.default, {
                      style: O.savingsText,
                      children: ['\u2212', p.savingsPercent, '%'],
                    }),
                  })
                : null,
              b,
            ],
          }),
          (0, u.jsxs)(s.default, {
            style: O.modeKicker,
            children: [
              t.trim(),
              ' \u2192 ',
              o.trim(),
              ' \xb7 ',
              p.distanceKm,
              ' km \xb7 ~',
              p.timeMin,
              ' min',
            ],
          }),
          E
            ? (0, u.jsxs)(l.default, {
                style: O.row,
                children: [
                  (0, u.jsx)(s.default, {
                    style: O.label,
                    children:
                      c === r(d[8]).TRANSPORT_MODES.TROTRO
                        ? 'Station seat (reserve ahead)'
                        : 'Trotro seat (reserve ahead)',
                  }),
                  (0, u.jsxs)(s.default, {
                    style: O.trotroValue,
                    children: ['GHS ', p.trotroSeat.toFixed(2)],
                  }),
                ],
              })
            : null,
          F
            ? (0, u.jsxs)(u.Fragment, {
                children: [
                  (0, u.jsxs)(l.default, {
                    style: O.row,
                    children: [
                      (0, u.jsx)(s.default, {
                        style: O.label,
                        children: 'Shared TrotroRide (per seat)',
                      }),
                      (0, u.jsxs)(s.default, {
                        style: O.trotroValue,
                        children: ['GHS ', p.trotroRideSeat.toFixed(2)],
                      }),
                    ],
                  }),
                  c === r(d[8]).TRANSPORT_MODES.TROTRORIDE
                    ? (0, u.jsxs)(l.default, {
                        style: O.row,
                        children: [
                          (0, u.jsx)(s.default, {
                            style: O.label,
                            children: 'With GHS 3 fare boost (peak)',
                          }),
                          (0, u.jsxs)(s.default, {
                            style: O.value,
                            children: ['GHS ', v.toFixed(2)],
                          }),
                        ],
                      })
                    : null,
                ],
              })
            : null,
          D || c === r(d[8]).TRANSPORT_MODES.TROTRO || c === r(d[8]).TRANSPORT_MODES.TROTRORIDE
            ? (0, u.jsxs)(l.default, {
                style: O.row,
                children: [
                  (0, u.jsx)(s.default, { style: O.label, children: 'Bolt / Uber estimate' }),
                  (0, u.jsxs)(s.default, {
                    style: O.competitorValue,
                    children: ['GHS ', p.rideHailAvg.toFixed(2)],
                  }),
                ],
              })
            : null,
          (0, u.jsx)(R, { mode: c, pricing: p, deliveryQuote: j, styles: O }),
        ],
      });
    });
  },
  1743,
  [1, 19, 161, 26, 326, 5, 183, 377, 940, 1509, 381, 756, 578]
);
__d(
  function (g, r, i, a, _m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ visible: t, onClose: u, onApplyPlan: T }) {
        const C = (0, r(d[16]).useSafeAreaInsets)(),
          { colors: w } = (0, r(d[17]).useTheme)(),
          { language: H } = (0, r(d[18]).useLanguage)(),
          v = S(w),
          [z, B] = (0, o.useState)(''),
          [k, P] = (0, o.useState)(!1),
          [I, R] = (0, o.useState)([
            {
              id: 'welcome',
              role: 'assistant',
              text: 'Hi \u2014 ask me to plan a trip or anything about TrotroOS. Example: "Tech Junction to Kejetia, cheapest" or "How do I schedule a ride?"',
              plan: null,
            },
          ]),
          [W, F] = (0, o.useState)(null),
          [A, D] = (0, o.useState)(!1),
          M = (0, o.useCallback)(
            async t => {
              const o = String(t ?? '').trim();
              if (!o || k) return;
              const n = { id: `u-${Date.now()}`, role: 'user', text: o };
              (R(t => [...t, n]), B(''), P(!0));
              const s = I.filter(t => 'welcome' !== t.id)
                .slice(-6)
                .map(t => ({ role: t.role, text: t.text }));
              if ((0, r(d[19]).isAppHelpQuestion)(o)) {
                const { answer: t, error: n } = await (0, r(d[20]).askGeminiSupport)(o, H, s, {
                  appMode: 'passenger',
                  screen: 'Find Ride',
                });
                P(!1);
                const l = n?.message ?? t ?? 'Something went wrong. Try again.';
                return void R(t => [
                  ...t,
                  { id: `a-${Date.now()}`, role: 'assistant', text: l, plan: null },
                ]);
              }
              const { plan: l, reply: p, error: c } = await (0, r(d[20]).planRideWithGemini)(o, s);
              P(!1);
              const u = c?.message ?? p ?? 'Something went wrong. Try again.',
                m = { id: `a-${Date.now()}`, role: 'assistant', text: u, plan: c ? null : l };
              (R(t => [...t, m]), !c && l?.origin && l?.destination && F(l));
            },
            [H, k, I]
          ),
          G = (0, r(d[21]).isGeminiConfigured)();
        return (0, y.jsxs)(l.default, {
          visible: t,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: u,
          children: [
            (0, y.jsxs)(s.default, {
              style: v.overlay,
              behavior: void 0,
              children: [
                (0, y.jsx)(p.default, { style: v.backdrop, onPress: u }),
                (0, y.jsxs)(f.default, {
                  style: [v.sheet, { paddingBottom: C.bottom + r(d[15]).spacing.md }],
                  children: [
                    (0, y.jsxs)(f.default, {
                      style: v.header,
                      children: [
                        (0, y.jsx)(r(d[22]).Ionicons, {
                          name: 'sparkles',
                          size: 22,
                          color: w.goldDeep ?? w.gold ?? '#A6851A',
                        }),
                        (0, y.jsx)(m.default, { style: v.title, children: 'TrotroOS AI' }),
                        (0, y.jsx)(p.default, {
                          style: v.voiceBtn,
                          onPress: () => D(!0),
                          disabled: !G,
                          hitSlop: 8,
                          children: (0, y.jsx)(r(d[22]).Ionicons, {
                            name: 'mic',
                            size: 20,
                            color: w.primary,
                          }),
                        }),
                        (0, y.jsx)(p.default, {
                          onPress: u,
                          hitSlop: 12,
                          children: (0, y.jsx)(r(d[22]).Ionicons, {
                            name: 'close',
                            size: 24,
                            color: w.textMuted,
                          }),
                        }),
                      ],
                    }),
                    (0, y.jsx)(m.default, {
                      style: v.subtitle,
                      children: 'Powered by Gemini \xb7 Kumasi ride planner',
                    }),
                    G
                      ? null
                      : (0, y.jsx)(m.default, {
                          style: v.warning,
                          children: 'Add GEMINI_API_KEY to .env and restart Expo to enable AI.',
                        }),
                    (0, y.jsxs)(c.default, {
                      style: v.messages,
                      keyboardShouldPersistTaps: 'handled',
                      children: [
                        I.map(t =>
                          (0, y.jsxs)(
                            f.default,
                            {
                              style: [
                                v.bubble,
                                'user' === t.role ? v.userBubble : v.assistantBubble,
                              ],
                              children: [
                                (0, y.jsx)(m.default, {
                                  style: 'user' === t.role ? v.userText : v.assistantText,
                                  children: t.text,
                                }),
                                t.plan?.origin && t.plan?.destination
                                  ? (0, y.jsxs)(f.default, {
                                      style: v.planCard,
                                      children: [
                                        (0, y.jsxs)(m.default, {
                                          style: v.planMeta,
                                          children: [t.plan.origin, ' \u2192 ', t.plan.destination],
                                        }),
                                        t.plan.pricing
                                          ? (0, y.jsxs)(m.default, {
                                              style: v.planMeta,
                                              children: [
                                                'Trotro ~GHS ',
                                                t.plan.pricing.trotroSeat.toFixed(2),
                                                ' \xb7 Bolt est. ~GHS',
                                                ' ',
                                                t.plan.pricing.rideHailAvg.toFixed(2),
                                              ],
                                            })
                                          : null,
                                      ],
                                    })
                                  : null,
                              ],
                            },
                            t.id
                          )
                        ),
                        k
                          ? (0, y.jsx)(n.default, {
                              color: w.primary,
                              style: { marginBottom: r(d[15]).spacing.sm },
                            })
                          : null,
                      ],
                    }),
                    (0, y.jsx)(f.default, {
                      style: v.chips,
                      children: j.map(t =>
                        (0, y.jsx)(
                          p.default,
                          {
                            style: v.chip,
                            onPress: () => M(t),
                            children: (0, y.jsx)(m.default, { style: v.chipText, children: t }),
                          },
                          t
                        )
                      ),
                    }),
                    W?.origin && W?.destination
                      ? (0, y.jsx)(f.default, {
                          style: v.applyWrap,
                          children: (0, y.jsx)(h.default, {
                            title: `Use route: ${W.origin} \u2192 ${W.destination}`,
                            onPress: () => {
                              W && (T?.(W), F(null), u?.());
                            },
                          }),
                        })
                      : null,
                    (0, y.jsxs)(f.default, {
                      style: v.inputRow,
                      children: [
                        (0, y.jsx)(b.default, {
                          style: v.input,
                          placeholder: 'Where do you want to go?',
                          placeholderTextColor: w.textMuted,
                          value: z,
                          onChangeText: B,
                          multiline: !0,
                          editable: !k && G,
                          onSubmitEditing: () => M(z),
                        }),
                        (0, y.jsx)(p.default, {
                          style: [v.sendBtn, (!z.trim() || k || !G) && v.sendDisabled],
                          onPress: () => M(z),
                          disabled: !z.trim() || k || !G,
                          children: (0, y.jsx)(r(d[22]).Ionicons, {
                            name: 'send',
                            size: 18,
                            color: w.onPrimary,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, y.jsx)(x.default, {
              visible: A,
              onClose: () => D(!1),
              mode: 'ride',
              title: 'Ride voice chat',
            }),
          ],
        });
      }));
    var o = r(d[1]),
      n = t(r(d[2])),
      s = t(r(d[3])),
      l = t(r(d[4])),
      p = (t(r(d[5])), t(r(d[6]))),
      c = t(r(d[7])),
      u = t(r(d[8])),
      m = t(r(d[9])),
      b = t(r(d[10])),
      f = t(r(d[11])),
      h = t(r(d[12])),
      x = t(r(d[13])),
      y = r(d[14]);
    const j = [
        'Tech Junction to Ayeduase, cheapest',
        'KNUST to Kejetia before 8am',
        'How is TrotroOS different from Bolt?',
      ],
      S = t =>
        u.default.create({
          overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: t.overlay },
          backdrop: { flex: 1 },
          sheet: {
            backgroundColor: t.surfaceElevated,
            borderTopLeftRadius: r(d[15]).radius.lg,
            borderTopRightRadius: r(d[15]).radius.lg,
            borderWidth: 1,
            borderColor: t.border,
            borderBottomWidth: 0,
            maxHeight: '88%',
          },
          header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: r(d[15]).spacing.lg,
            paddingTop: r(d[15]).spacing.md,
            paddingBottom: r(d[15]).spacing.sm,
            gap: r(d[15]).spacing.sm,
          },
          title: {
            flex: 1,
            fontFamily: r(d[15]).fontFamily.bold,
            fontSize: 18,
            color: t.textPrimary,
          },
          subtitle: Object.assign({}, r(d[15]).typography.caption, {
            paddingHorizontal: r(d[15]).spacing.lg,
            marginBottom: r(d[15]).spacing.sm,
          }),
          messages: { paddingHorizontal: r(d[15]).spacing.lg, maxHeight: 320 },
          bubble: {
            borderRadius: r(d[15]).radius.md,
            padding: r(d[15]).spacing.md,
            marginBottom: r(d[15]).spacing.sm,
            maxWidth: '92%',
          },
          userBubble: { alignSelf: 'flex-end', backgroundColor: t.primary },
          assistantBubble: {
            alignSelf: 'flex-start',
            backgroundColor: t.surface,
            borderWidth: 1,
            borderColor: t.border,
          },
          userText: {
            color: t.onPrimary,
            fontFamily: r(d[15]).fontFamily.medium,
            fontSize: 14,
            lineHeight: 20,
          },
          assistantText: {
            color: t.textPrimary,
            fontFamily: r(d[15]).fontFamily.regular,
            fontSize: 14,
            lineHeight: 20,
          },
          planCard: {
            marginTop: r(d[15]).spacing.sm,
            padding: r(d[15]).spacing.sm,
            borderRadius: r(d[15]).radius.sm,
            backgroundColor: t.background,
            borderWidth: 1,
            borderColor: t.border,
          },
          planMeta: Object.assign({}, r(d[15]).typography.caption, { marginTop: 2 }),
          chips: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: r(d[15]).spacing.sm,
            paddingHorizontal: r(d[15]).spacing.lg,
            marginBottom: r(d[15]).spacing.sm,
          },
          chip: {
            paddingHorizontal: r(d[15]).spacing.md,
            paddingVertical: r(d[15]).spacing.xs,
            borderRadius: r(d[15]).radius.sm,
            borderWidth: 1,
            borderColor: t.border,
            backgroundColor: t.surface,
          },
          chipText: {
            fontFamily: r(d[15]).fontFamily.medium,
            fontSize: 12,
            color: t.textSecondary,
          },
          inputRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: r(d[15]).spacing.sm,
            paddingHorizontal: r(d[15]).spacing.lg,
            paddingTop: r(d[15]).spacing.sm,
            borderTopWidth: 1,
            borderTopColor: t.border,
          },
          input: {
            flex: 1,
            minHeight: 44,
            maxHeight: 100,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: r(d[15]).radius.md,
            paddingHorizontal: r(d[15]).spacing.md,
            paddingVertical: r(d[15]).spacing.sm,
            fontFamily: r(d[15]).fontFamily.regular,
            fontSize: 15,
            color: t.textPrimary,
            backgroundColor: t.surface,
          },
          sendBtn: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: t.primary,
            alignItems: 'center',
            justifyContent: 'center',
          },
          sendDisabled: { opacity: 0.5 },
          voiceBtn: {
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: t.primary,
            backgroundColor: t.primaryAlpha06 ?? t.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          applyWrap: { paddingHorizontal: r(d[15]).spacing.lg, paddingTop: r(d[15]).spacing.sm },
          warning: Object.assign({}, r(d[15]).typography.caption, {
            color: t.warning ?? t.primary,
            paddingHorizontal: r(d[15]).spacing.lg,
            marginBottom: r(d[15]).spacing.sm,
          }),
        });
  },
  1744,
  [
    1, 5, 373, 681, 948, 14, 326, 106, 26, 161, 255, 19, 672, 1627, 183, 377, 572, 381, 1381, 1642,
    1638, 1637, 578,
  ]
);
__d(
  function (g, r, i, a, _m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        onClose: p,
        onApplyPlan: w,
        origin: R = '',
        destination: C = '',
      }) {
        const S = (0, r(d[16]).useSafeAreaInsets)(),
          { colors: B } = (0, r(d[17]).useTheme)(),
          { language: H } = (0, r(d[18]).useLanguage)(),
          v = T(B),
          [A, P] = (0, o.useState)(''),
          [k, z] = (0, o.useState)(!1),
          [I, F] = (0, o.useState)([
            {
              id: 'welcome',
              role: 'assistant',
              text:
                R && C
                  ? `Planning TrotroRide for ${R} \u2192 ${C}. Ask about price vs Bolt, fare boosts, or say "request now".`
                  : 'Hi \u2014 I can plan a shared TrotroRide in Kumasi. Try "Tech Junction to Ayeduase" or "request with boost".',
              plan: null,
            },
          ]),
          [G, W] = (0, o.useState)(null),
          [$, q] = (0, o.useState)(!1);
        (0, o.useEffect)(() => {
          t &&
            (W(null),
            P(''),
            F([
              {
                id: 'welcome',
                role: 'assistant',
                text:
                  R && C
                    ? `Planning TrotroRide for ${R} \u2192 ${C}. Ask about price vs Bolt, fare boosts, or say "request now".`
                    : 'Hi \u2014 I can plan a shared TrotroRide in Kumasi. Try "Tech Junction to Ayeduase" or "request with boost".',
                plan: null,
              },
            ]));
        }, [t, R, C]);
        const _ = (0, o.useCallback)(
            async t => {
              const o = String(t ?? '').trim();
              if (!o || k) return;
              const n = { id: `u-${Date.now()}`, role: 'user', text: o };
              (F(t => [...t, n]), P(''), z(!0));
              const s = I.filter(t => 'welcome' !== t.id)
                  .slice(-6)
                  .map(t => ({ role: t.role, text: t.text })),
                l = R && C && !o.includes('\u2192') ? `${o} (current route: ${R} \u2192 ${C})` : o;
              if ((0, r(d[19]).isAppHelpQuestion)(o)) {
                const { answer: t, error: n } = await (0, r(d[20]).askGeminiSupport)(o, H, s, {
                  appMode: 'passenger',
                  screen: 'Find Ride \xb7 TrotroRide',
                });
                z(!1);
                const l = n?.message ?? t ?? 'Something went wrong. Try again.';
                return void F(t => [
                  ...t,
                  { id: `a-${Date.now()}`, role: 'assistant', text: l, plan: null },
                ]);
              }
              const {
                plan: c,
                reply: u,
                error: p,
              } = await (0, r(d[20]).planTrotroRideWithGemini)(l, s);
              z(!1);
              const m = p?.message ?? u ?? 'Something went wrong. Try again.',
                h = { id: `a-${Date.now()}`, role: 'assistant', text: m, plan: p ? null : c };
              (F(t => [...t, h]),
                !p && c?.origin && c?.destination
                  ? W(c)
                  : !p &&
                    'request_trotroride' === c?.suggestedAction &&
                    R &&
                    C &&
                    W(
                      Object.assign({}, c, {
                        origin: c.origin ?? R,
                        destination: c.destination ?? C,
                      })
                    ));
            },
            [H, k, I, R, C]
          ),
          D = (t = 'search') => {
            G && (w?.(Object.assign({}, G, { suggestedAction: t })), W(null), p?.());
          },
          M = (0, r(d[21]).isGeminiConfigured)(),
          E = G?.origin && G?.destination;
        return (0, x.jsxs)(l.default, {
          visible: t,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: p,
          children: [
            (0, x.jsxs)(s.default, {
              style: v.overlay,
              behavior: void 0,
              children: [
                (0, x.jsx)(c.default, { style: v.backdrop, onPress: p }),
                (0, x.jsxs)(b.default, {
                  style: [v.sheet, { paddingBottom: S.bottom + r(d[15]).spacing.md }],
                  children: [
                    (0, x.jsxs)(b.default, {
                      style: v.header,
                      children: [
                        (0, x.jsx)(r(d[22]).Ionicons, {
                          name: 'car-sport',
                          size: 22,
                          color: B.goldDeep ?? B.gold ?? '#A6851A',
                        }),
                        (0, x.jsx)(m.default, { style: v.title, children: 'TrotroRide AI' }),
                        (0, x.jsx)(c.default, {
                          style: v.voiceBtn,
                          onPress: () => q(!0),
                          disabled: !M,
                          hitSlop: 8,
                          children: (0, x.jsx)(r(d[22]).Ionicons, {
                            name: 'mic',
                            size: 20,
                            color: B.primary,
                          }),
                        }),
                        (0, x.jsx)(c.default, {
                          onPress: p,
                          hitSlop: 12,
                          children: (0, x.jsx)(r(d[22]).Ionicons, {
                            name: 'close',
                            size: 24,
                            color: B.textMuted,
                          }),
                        }),
                      ],
                    }),
                    (0, x.jsx)(m.default, {
                      style: v.subtitle,
                      children: 'Powered by Gemini \xb7 shared car planner',
                    }),
                    M
                      ? null
                      : (0, x.jsx)(m.default, {
                          style: v.warning,
                          children: 'Add GEMINI_API_KEY to .env and restart Expo to enable AI.',
                        }),
                    (0, x.jsxs)(u.default, {
                      style: v.messages,
                      keyboardShouldPersistTaps: 'handled',
                      children: [
                        I.map(t =>
                          (0, x.jsxs)(
                            b.default,
                            {
                              style: [
                                v.bubble,
                                'user' === t.role ? v.userBubble : v.assistantBubble,
                              ],
                              children: [
                                (0, x.jsx)(m.default, {
                                  style: 'user' === t.role ? v.userText : v.assistantText,
                                  children: t.text,
                                }),
                                t.plan?.origin && t.plan?.destination
                                  ? (0, x.jsxs)(b.default, {
                                      style: v.planCard,
                                      children: [
                                        (0, x.jsxs)(m.default, {
                                          style: v.planMeta,
                                          children: [t.plan.origin, ' \u2192 ', t.plan.destination],
                                        }),
                                        t.plan.pricing
                                          ? (0, x.jsxs)(m.default, {
                                              style: v.planMeta,
                                              children: [
                                                'TrotroRide ~GHS ',
                                                t.plan.pricing.trotroRideSeat.toFixed(2),
                                                ' \xb7 Bolt ~GHS',
                                                ' ',
                                                t.plan.pricing.rideHailAvg.toFixed(2),
                                              ],
                                            })
                                          : null,
                                        t.plan.fareBoostGhs > 0
                                          ? (0, x.jsxs)(m.default, {
                                              style: v.planMeta,
                                              children: ['Boost: +GHS ', t.plan.fareBoostGhs],
                                            })
                                          : null,
                                      ],
                                    })
                                  : null,
                              ],
                            },
                            t.id
                          )
                        ),
                        k
                          ? (0, x.jsx)(n.default, {
                              color: B.primary,
                              style: { marginBottom: r(d[15]).spacing.sm },
                            })
                          : null,
                      ],
                    }),
                    (0, x.jsx)(b.default, {
                      style: v.chips,
                      children: j.map(t =>
                        (0, x.jsx)(
                          c.default,
                          {
                            style: v.chip,
                            onPress: () => _(t),
                            children: (0, x.jsx)(m.default, { style: v.chipText, children: t }),
                          },
                          t
                        )
                      ),
                    }),
                    E
                      ? (0, x.jsxs)(b.default, {
                          style: v.applyWrap,
                          children: [
                            (0, x.jsx)(f.default, {
                              title: `Find TrotroRide \xb7 ${G.origin} \u2192 ${G.destination}`,
                              onPress: () => D('search'),
                            }),
                            'join_shared' === G.suggestedAction
                              ? (0, x.jsx)(f.default, {
                                  title: 'Browse shared rides',
                                  variant: 'secondary',
                                  onPress: () => D('join_shared'),
                                })
                              : (0, x.jsx)(f.default, {
                                  title:
                                    G.fareBoostGhs > 0
                                      ? `Request now (+GHS ${G.fareBoostGhs} boost)`
                                      : 'Request TrotroRide now',
                                  variant: 'secondary',
                                  onPress: () => D('request_trotroride'),
                                }),
                          ],
                        })
                      : null,
                    (0, x.jsxs)(b.default, {
                      style: v.inputRow,
                      children: [
                        (0, x.jsx)(h.default, {
                          style: v.input,
                          placeholder: 'Ask about TrotroRide\u2026',
                          placeholderTextColor: B.textMuted,
                          value: A,
                          onChangeText: P,
                          multiline: !0,
                          editable: !k && M,
                          onSubmitEditing: () => _(A),
                        }),
                        (0, x.jsx)(c.default, {
                          style: [v.sendBtn, (!A.trim() || k || !M) && v.sendDisabled],
                          onPress: () => _(A),
                          disabled: !A.trim() || k || !M,
                          children: (0, x.jsx)(r(d[22]).Ionicons, {
                            name: 'send',
                            size: 18,
                            color: B.onPrimary,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, x.jsx)(y.default, {
              visible: $,
              onClose: () => q(!1),
              mode: 'trotroride',
              title: 'TrotroRide voice',
            }),
          ],
        });
      }));
    var o = r(d[1]),
      n = t(r(d[2])),
      s = t(r(d[3])),
      l = t(r(d[4])),
      c = (t(r(d[5])), t(r(d[6]))),
      u = t(r(d[7])),
      p = t(r(d[8])),
      m = t(r(d[9])),
      h = t(r(d[10])),
      b = t(r(d[11])),
      f = t(r(d[12])),
      y = t(r(d[13])),
      x = r(d[14]);
    const j = [
        'Tech Junction to Ayeduase on TrotroRide',
        'Cheapest shared car to KNUST now',
        'Request TrotroRide with GHS 5 boost',
        'How much vs Bolt to Kejetia?',
      ],
      T = t =>
        p.default.create({
          overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: t.overlay },
          backdrop: { flex: 1 },
          sheet: {
            backgroundColor: t.surfaceElevated,
            borderTopLeftRadius: r(d[15]).radius.lg,
            borderTopRightRadius: r(d[15]).radius.lg,
            borderWidth: 1,
            borderColor: t.border,
            borderBottomWidth: 0,
            maxHeight: '88%',
          },
          header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: r(d[15]).spacing.lg,
            paddingTop: r(d[15]).spacing.md,
            paddingBottom: r(d[15]).spacing.sm,
            gap: r(d[15]).spacing.sm,
          },
          title: {
            flex: 1,
            fontFamily: r(d[15]).fontFamily.bold,
            fontSize: 18,
            color: t.textPrimary,
          },
          subtitle: Object.assign({}, r(d[15]).typography.caption, {
            paddingHorizontal: r(d[15]).spacing.lg,
            marginBottom: r(d[15]).spacing.sm,
          }),
          messages: { paddingHorizontal: r(d[15]).spacing.lg, maxHeight: 320 },
          bubble: {
            borderRadius: r(d[15]).radius.md,
            padding: r(d[15]).spacing.md,
            marginBottom: r(d[15]).spacing.sm,
            maxWidth: '92%',
          },
          userBubble: { alignSelf: 'flex-end', backgroundColor: t.primary },
          assistantBubble: {
            alignSelf: 'flex-start',
            backgroundColor: t.surface,
            borderWidth: 1,
            borderColor: t.border,
          },
          userText: {
            color: t.onPrimary,
            fontFamily: r(d[15]).fontFamily.medium,
            fontSize: 14,
            lineHeight: 20,
          },
          assistantText: {
            color: t.textPrimary,
            fontFamily: r(d[15]).fontFamily.regular,
            fontSize: 14,
            lineHeight: 20,
          },
          planCard: {
            marginTop: r(d[15]).spacing.sm,
            padding: r(d[15]).spacing.sm,
            borderRadius: r(d[15]).radius.sm,
            backgroundColor: t.background,
            borderWidth: 1,
            borderColor: t.border,
          },
          planMeta: Object.assign({}, r(d[15]).typography.caption, { marginTop: 2 }),
          chips: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: r(d[15]).spacing.sm,
            paddingHorizontal: r(d[15]).spacing.lg,
            marginBottom: r(d[15]).spacing.sm,
          },
          chip: {
            paddingHorizontal: r(d[15]).spacing.md,
            paddingVertical: r(d[15]).spacing.xs,
            borderRadius: r(d[15]).radius.sm,
            borderWidth: 1,
            borderColor: t.border,
            backgroundColor: t.surface,
          },
          chipText: {
            fontFamily: r(d[15]).fontFamily.medium,
            fontSize: 12,
            color: t.textSecondary,
          },
          inputRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: r(d[15]).spacing.sm,
            paddingHorizontal: r(d[15]).spacing.lg,
            paddingTop: r(d[15]).spacing.sm,
            borderTopWidth: 1,
            borderTopColor: t.border,
          },
          input: {
            flex: 1,
            minHeight: 44,
            maxHeight: 100,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: r(d[15]).radius.md,
            paddingHorizontal: r(d[15]).spacing.md,
            paddingVertical: r(d[15]).spacing.sm,
            fontFamily: r(d[15]).fontFamily.regular,
            fontSize: 15,
            color: t.textPrimary,
            backgroundColor: t.surface,
          },
          sendBtn: {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: t.primary,
            alignItems: 'center',
            justifyContent: 'center',
          },
          sendDisabled: { opacity: 0.5 },
          voiceBtn: {
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: t.primary,
            backgroundColor: t.primaryAlpha06 ?? t.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          applyWrap: {
            paddingHorizontal: r(d[15]).spacing.lg,
            paddingTop: r(d[15]).spacing.sm,
            gap: r(d[15]).spacing.sm,
          },
          warning: Object.assign({}, r(d[15]).typography.caption, {
            color: t.warning ?? t.primary,
            paddingHorizontal: r(d[15]).spacing.lg,
            marginBottom: r(d[15]).spacing.sm,
          }),
        });
  },
  1745,
  [
    1, 5, 373, 681, 948, 14, 326, 106, 26, 161, 255, 19, 672, 1627, 183, 377, 572, 381, 1381, 1642,
    1638, 1637, 578,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var n = r(d[1]),
      o = t(r(d[2])),
      s = t(r(d[3])),
      l = t(r(d[4])),
      p = r(d[5]);
    function c({ title: t }) {
      const { colors: n } = (0, r(d[6]).useTheme)();
      return (0, p.jsx)(l.default, {
        style: y.headerWrap,
        children: (0, p.jsx)(s.default, {
          style: [y.headerText, { color: n.textSecondary }],
          children: t,
        }),
      });
    }
    const T = (0, n.memo)(c);
    function u({
      sections: t,
      renderTrip: o,
      ListHeaderComponent: s,
      ListEmptyComponent: l,
      contentContainerStyle: c,
      style: u,
    }) {
      const y = (0, n.useMemo)(() => (0, r(d[7]).flattenTripSections)(t), [t]),
        S = (0, n.useCallback)(
          ({ item: t }) => ('header' === t._type ? (0, p.jsx)(T, { title: t.title }) : o(t.trip)),
          [o]
        ),
        _ = (0, n.useCallback)((t, n) => {
          t.size =
            'header' === n._type
              ? r(d[8]).SECTION_HEADER_HEIGHT
              : r(d[8]).TRIP_CARD_ESTIMATED_HEIGHT;
        }, []);
      return (0, p.jsx)(r(d[9]).FlashList, {
        data: y,
        renderItem: S,
        keyExtractor: t => t.id,
        getItemType: r(d[7]).tripFeedItemType,
        estimatedItemSize: r(d[8]).TRIP_CARD_ESTIMATED_HEIGHT,
        overrideItemLayout: _,
        ListHeaderComponent: s,
        ListEmptyComponent: l,
        contentContainerStyle: c,
        style: u,
        drawDistance: r(d[8]).FLASH_LIST_DEFAULTS.drawDistance,
        removeClippedSubviews: r(d[8]).FLASH_LIST_DEFAULTS.removeClippedSubviews,
      });
    }
    e.default = (0, n.memo)(u);
    const y = o.default.create({
      headerWrap: { paddingTop: r(d[10]).spacing.sm, paddingBottom: r(d[10]).spacing.xs },
      headerText: {
        fontFamily: r(d[10]).fontFamily.semiBold,
        fontSize: 13,
        letterSpacing: 0.3,
        textTransform: 'uppercase',
      },
    });
  },
  1746,
  [1, 5, 26, 161, 19, 183, 381, 1747, 1536, 1537, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.flattenTripSections = function (t = []) {
        const n = [];
        return (
          t.forEach(t => {
            t?.data?.length &&
              (n.push({ _type: 'header', id: `header-${t.key}`, title: t.title }),
              t.data.forEach((p, o) => {
                n.push({
                  _type: 'trip',
                  id: String(p.id ?? p.dbId ?? `${t.key}-${o}`),
                  trip: p,
                  sectionKey: t.key,
                });
              }));
          }),
          n
        );
      }),
      (e.tripFeedItemType = function (t) {
        return t?._type ?? 'trip';
      }));
  },
  1747,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useTransportFeedTips = function (t) {
        const [n, o] = (0, s.useState)(!1),
          [u, c] = (0, s.useState)(!1);
        (0, s.useEffect)(() => {
          let s = !1;
          return (
            (async () => {
              const t = await (0, r(d[1]).getHasDismissedTransportTips)();
              s || (o(t), c(!0));
            })(),
            () => {
              s = !0;
            }
          );
        }, []);
        const p = (0, s.useCallback)(async () => {
          (o(!0), await (0, r(d[1]).setHasDismissedTransportTips)(!0));
        }, []);
        return { showOnboardingBanners: u && !t && !n, dismissTips: p, tipsLoaded: u };
      }));
    var s = r(d[0]);
  },
  1748,
  [5, 1749]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.getHasDismissedTransportTips = async function () {
        try {
          return 'true' === (await s.default.getItem(n));
        } catch {
          return !1;
        }
      }),
      (e.setHasDismissedTransportTips = async function (t = !0) {
        try {
          await s.default.setItem(n, t ? 'true' : 'false');
        } catch {}
      }));
    var s = t(r(d[1]));
    const n = '@trotroos/has_dismissed_transport_tips';
  },
  1749,
  [1, 503]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.usePassengerQueue = function (n, l = '', s = '', c = null) {
        const [o, f] = (0, t.useState)(null),
          [v, P] = (0, t.useState)(null),
          [Q, y] = (0, t.useState)(!1),
          [h, S] = (0, t.useState)(null),
          b = (0, t.useCallback)(async () => {
            if (!n) return (f(null), void P(null));
            y(!0);
            const [t, u] = await Promise.all([
              (0, r(d[1]).fetchPassengerActiveQueue)(n, l, s, c),
              (0, r(d[1]).fetchPassengerActiveQueue)(n, null, null, c),
            ]);
            (f(t.data), P(u.data), S(Date.now()), y(!1));
          }, [n, l, s, c]);
        ((0, t.useEffect)(() => {
          b();
        }, [b]),
          (0, t.useEffect)(() => {
            if (n)
              return (0, r(d[1]).subscribeToPassengerQueue)(
                n,
                async ({ entry: t, updatedAt: u }) => {
                  if (!t) return (f(null), P(null), void S(u));
                  const [o, v] = await Promise.all([
                    (0, r(d[1]).fetchPassengerActiveQueue)(n, l, s, c),
                    (0, r(d[1]).fetchPassengerActiveQueue)(n, null, null, c),
                  ]);
                  (f(o.data), P(v.data ?? t), S(u));
                }
              );
          }, [n, l, s, c]));
        const w = o ?? v,
          A = (0, t.useMemo)(() => u(w, l, s), [w, l, s]),
          E = (0, t.useCallback)(async () => {
            const t = o ?? v;
            if (!t?.id || !n) return { data: null, error: new Error('No queue entry') };
            const u = await (0, r(d[1]).cancelQueueEntry)(t.id, n);
            return (u.error || (f(null), P(null)), u);
          }, [o, v, n]);
        return {
          queueEntry: w,
          inQueue: Boolean(w),
          matchesRoute: A,
          loading: Q,
          lastUpdated: h,
          refresh: b,
          leaveQueue: E,
        };
      }));
    var t = r(d[0]);
    function u(t, u, n) {
      if (!t) return !1;
      const l = String(u ?? '').trim(),
        s = String(n ?? '').trim();
      return !l || !s || (t.origin === l && t.destination === s);
    }
  },
  1750,
  [5, 1503]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addRecentDestination = function (n = [], u, c = t) {
        const l = s(u);
        if (!l) return n;
        const f = o(l.origin, l.destination),
          w = (n ?? []).filter(t => o(t.origin, t.destination) !== f);
        return [l, ...w].slice(0, c);
      }),
      (e.createRecentDestination = s),
      (e.removeRecentDestination = function (t = [], n) {
        if (!n) return t;
        const s = n.id,
          u = o(n.origin, n.destination);
        return (t ?? []).filter(t => (!s || t.id !== s) && o(t.origin, t.destination) !== u);
      }));
    const t = 8;
    function n(t) {
      return String(t ?? '').trim();
    }
    function o(t, o) {
      return `${n(t).toLowerCase()}\u2192${n(o).toLowerCase()}`;
    }
    function s({ origin: t, destination: o, transportMode: s = null }) {
      const u = n(t),
        c = n(o);
      if (!u || !c || u.toLowerCase() === c.toLowerCase()) return null;
      const l = (0, r(d[0]).resolveLocationCoords)(c);
      return {
        id: `recent-${Date.now()}`,
        origin: u,
        destination: c,
        transportMode: s,
        latitude: l?.latitude ?? null,
        longitude: l?.longitude ?? null,
        updatedAt: new Date().toISOString(),
      };
    }
  },
  1751,
  [1507]
);
