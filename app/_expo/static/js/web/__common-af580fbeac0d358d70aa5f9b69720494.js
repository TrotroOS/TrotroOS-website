__d(
  function (g, _r, _i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.TRDriverRideProvider = function ({ children: s }) {
        const { user: u, profile: o } = (0, _r(d[4]).useAuth)(),
          [c, l] = (0, e.useState)(!1),
          [p, f] = (0, e.useState)({ rides: 0, earned: 0 }),
          [_, k] = (0, e.useState)(null),
          [b, h] = (0, e.useState)(null),
          [R, w] = (0, e.useState)(null),
          [v, O] = (0, e.useState)(_r(d[5]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC),
          [y, E] = (0, e.useState)(!1),
          [I, C] = (0, e.useState)('Tech Junction \u2192 Ayeduase'),
          S = (0, e.useRef)(null),
          T = (0, e.useRef)(null),
          P = (0, e.useRef)(null),
          D = (0, e.useRef)(null),
          j = (0, e.useRef)(!1),
          M = (0, e.useRef)(0),
          A = (0, e.useRef)('Tech Junction \u2192 Ayeduase');
        (0, e.useEffect)(() => {
          T.current = _;
        }, [_]);
        const N = (0, e.useCallback)(e => {
            if (!e)
              return (
                (D.current = null),
                (P.current = null),
                (j.current = !1),
                void O(_r(d[5]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC)
              );
            D.current !== e &&
              ((D.current = e),
              (P.current = (0, _r(d[6]).createIncomingRequestDeadline)(
                _r(d[5]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC
              )),
              (j.current = !1),
              O((0, _r(d[6]).secondsUntilIncomingDeadline)(P.current)));
          }, []),
          L = (0, e.useCallback)(async () => {
            if (j.current) return;
            j.current = !0;
            const e = T.current;
            ((D.current = null),
              (P.current = null),
              k(null),
              O(_r(d[5]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC),
              e?.id &&
                u?.id &&
                (String(e.id).startsWith('local-') ||
                  (await (0, _r(d[7]).expireRequestForDriver)(e.id, u.id).catch(() => {}))));
          }, [u?.id]),
          q = (0, e.useCallback)(async () => {
            if (!u?.id) return;
            const { data: e } = await (0, _r(d[7]).fetchDriverTodayStats)(u.id);
            e && f(e);
          }, [u?.id]),
          U = (0, e.useCallback)(async () => {
            if (!u?.id) return;
            const { data: e } = await (0, _r(d[7]).fetchActiveRide)(u.id);
            h(e ? Object.assign({}, e, { passengers: i(e) }) : null);
          }, [u?.id]);
        function F(e) {
          return !!e && !e.fare_breakdown?.driverInitiatedOffer;
        }
        function x(e) {
          const r = (e.current_passengers ?? 0) + 1,
            n = Number(e.distance_km ?? 8.2),
            t = Number(e.time_min ?? 25),
            i = e.fare_breakdown ?? (0, _r(d[7]).buildFareBreakdown)(n, t, r),
            s = (0, _r(d[3]).coordsFromPlaceLabel)(e.pickup),
            u = (0, _r(d[3]).coordsFromPlaceLabel)(e.dropoff);
          return Object.assign({}, e, {
            passenger_name: e.passenger_name ?? 'Passenger',
            passenger_rating: e.passenger_rating ?? 4.7,
            passenger_phone: e.passenger_phone ?? e.phone_number ?? null,
            pickup_lat: e.pickup_lat ?? s?.latitude ?? 6.6738,
            pickup_lng: e.pickup_lng ?? s?.longitude ?? -1.5647,
            dropoff_lat: e.dropoff_lat ?? u?.latitude ?? 6.682,
            dropoff_lng: e.dropoff_lng ?? u?.longitude ?? -1.552,
            fare: i,
            seatsFilled: e.current_passengers ?? 0,
            coPassengerNote:
              (e.current_passengers ?? 0) > 0
                ? `+${e.current_passengers} passenger along route`
                : null,
          });
        }
        ((0, e.useEffect)(() => {
          u?.id &&
            ((0, _r(d[7]).fetchDriverStatus)(u.id).then(({ data: e }) => {
              e &&
                ('online' === e.status &&
                  (l(!0), (A.current = e.corridor || A.current), C(e.corridor || A.current)),
                null != e.latitude &&
                  null != e.longitude &&
                  w({ latitude: e.latitude, longitude: e.longitude }));
            }),
            q(),
            U());
        }, [u?.id, q, U]),
          (0, e.useEffect)(() => {
            if (!c || !u?.id || b) return;
            const e = (0, _r(d[7]).subscribeToRideRequests)(u.id, e => {
              if (!e?.id) return;
              if ('pending' !== e.status)
                return void (T.current?.id === e.id && (N(null), k(null)));
              if (!F(e)) return;
              const r = e?.scheduled_for ?? e?.fare_breakdown?.scheduledFor;
              if (('scheduled' === e?.request_kind || Boolean(r)) && r && new Date(r) > new Date())
                return;
              const n = x(e);
              (T.current?.id !== e.id && N(e.id), k(n));
            });
            return (
              (0, _r(d[7]).fetchPendingRequest)(u.id).then(({ data: e }) => {
                if ('pending' === e?.status && F(e)) {
                  const r = x(e);
                  (T.current?.id !== e.id && N(e.id), k(r));
                } else T.current?.id || (N(null), k(null));
              }),
              () => {
                e();
              }
            );
          }, [c, u?.id, b]),
          (0, e.useEffect)(() => {
            if (!b?.id) return;
            return (0, _r(d[7]).subscribeToRideUpdates)(b.id, e => {
              h(Object.assign({}, e, { passengers: i(e) }));
            });
          }, [b?.id]),
          (0, e.useEffect)(() => {
            if (!_?.id) return;
            const e = () => {
              const e = P.current;
              if (!e || T.current?.id !== D.current) return;
              const r = (0, _r(d[6]).secondsUntilIncomingDeadline)(e);
              (O(r), (0, _r(d[6]).hasIncomingDeadlineElapsed)(e) && L());
            };
            (e(), (S.current = setInterval(e, 500)));
            const r = setInterval(() => {
              if (!u?.id) return;
              const e = T.current;
              e?.id &&
                (String(e.id).startsWith('local-') ||
                  (0, _r(d[7]).fetchPendingRequest)(u.id).then(({ data: r }) => {
                    const n = T.current;
                    n?.id &&
                      n.id === e.id &&
                      r &&
                      r.id === n.id &&
                      ['cancelled', 'expired', 'declined', 'accepted'].includes(String(r.status)) &&
                      (N(null), k(null));
                  }));
            }, 5e3);
            return () => {
              (S.current && clearInterval(S.current), clearInterval(r));
            };
          }, [_?.id, u?.id, L, N]));
        const W = (0, e.useCallback)(
            async (e = A.current) => {
              if (!u?.id) return { error: new Error('Sign in required') };
              E(!0);
              let n = { latitude: 6.6735, longitude: -1.5645 };
              try {
                const { status: e } = await r.requestForegroundPermissionsAsync();
                if ('granted' === e) {
                  const e = await r.getCurrentPositionAsync({});
                  n = { latitude: e.coords.latitude, longitude: e.coords.longitude };
                }
              } catch {}
              const t = e || 'Tech Junction \u2192 Ayeduase';
              ((A.current = t), C(t));
              const { error: i } = await (0, _r(d[7]).goOnline)(u.id, n, t);
              if (i) return (E(!1), { error: i });
              try {
                await _r(d[8], '../services/location').locationService.startTracking(
                  u.id,
                  null,
                  e,
                  e => {
                    w({
                      latitude: e.latitude,
                      longitude: e.longitude,
                      heading: e.heading ?? 0,
                      speedKmh: e.speed_kmh ?? 0,
                    });
                    const r = Date.now();
                    r - M.current > 1e4 &&
                      ((M.current = r),
                      (0, _r(d[7]).updateDriverLocation)(u.id, e.latitude, e.longitude).catch(
                        () => {}
                      ));
                  }
                );
              } catch (e) {
                return (await (0, _r(d[7]).goOffline)(u.id), E(!1), { error: e });
              }
              return (w(n), l(!0), E(!1), { error: null });
            },
            [u?.id]
          ),
          G = (0, e.useCallback)(async () => {
            u?.id &&
              (E(!0),
              await _r(d[8]).locationService.stopTracking(u.id),
              await (0, _r(d[7]).goOffline)(u.id),
              l(!1),
              N(null),
              k(null),
              E(!1));
          }, [u?.id, N]),
          J = (0, e.useCallback)(async () => {
            if (!_ || !u?.id) return null;
            E(!0);
            const { data: e, error: r } = await (0, _r(d[7]).acceptRide)(_.id, u.id, _);
            if ((E(!1), r)) return { error: r };
            const n = e?.ride;
            return (
              N(null),
              k(null),
              R || w({ latitude: _.pickup_lat ?? 6.6735, longitude: _.pickup_lng ?? -1.5645 }),
              h(
                Object.assign({}, n, {
                  corridor: n.corridor ?? _.corridor ?? 'Tech Junction \u2192 Ayeduase',
                  passengers: i(n),
                })
              ),
              { data: n, error: null }
            );
          }, [_, u?.id, R, N]),
          Q = (0, e.useCallback)(async () => {
            _ && u?.id && (await (0, _r(d[7]).declineRide)(_.id, u.id), N(null), k(null));
          }, [_, u?.id, N]),
          V = (0, e.useCallback)(
            async e => {
              const r = b?.passengers?.find(r => r.id === e);
              (h(r => {
                if (!r) return r;
                const n = r.passengers.map(r =>
                  r.id === e ? Object.assign({}, r, { status: 'arrived' }) : r
                );
                return Object.assign({}, r, { passengers: n });
              }),
                await (0, _r(d[7]).markDriverArrived)(e, {
                  passengerId: r?.passengerId,
                  pickup: r?.pickup,
                  driverName: o?.full_name,
                }));
            },
            [b?.passengers, o?.full_name]
          ),
          B = (0, e.useCallback)(
            async e => {
              const r = b?.passengers?.find(r => r.id === e);
              (h(r => {
                if (!r) return r;
                const n = r.passengers.map(r =>
                  r.id === e ? Object.assign({}, r, { status: 'in_ride' }) : r
                );
                return Object.assign({}, r, { passengers: n });
              }),
                await (0, _r(d[7]).startPassengerTrip)(e, b?.id, {
                  passengerId: r?.passengerId,
                  dropoff: r?.dropoff,
                }));
            },
            [b?.id, b?.passengers]
          ),
          K = (0, e.useCallback)(
            async e => {
              (h(r => {
                if (!r) return r;
                const n = r.passengers.map(r =>
                    r.id === e ? Object.assign({}, r, { status: 'dropped_off' }) : r
                  ),
                  t = n.filter(e => 'dropped_off' === e.status).reduce((e, r) => e + r.fare, 0);
                return Object.assign({}, r, { passengers: n, liveEarnings: t });
              }),
                await (0, _r(d[7]).updatePassengerStatus)(e, 'dropped_off'));
              const r = b?.passengers?.find(r => r.id === e);
              r?.passengerId &&
                (0, _r(d[9]).notifyTrotroRideTripCompleted)(r.passengerId, {
                  fare: r.fare,
                  route: b?.corridor,
                }).catch(() => {});
            },
            [b?.passengers, b?.corridor]
          ),
          $ = (0, e.useCallback)(async () => {
            if (!b?.id) return null;
            const e = b.corridor ?? A.current;
            E(!0);
            const { data: r, error: n } = await (0, _r(d[7]).completeRide)(b.id);
            return (
              E(!1),
              n
                ? { error: n }
                : (h(null),
                  await q(),
                  c &&
                    (await (0, _r(d[7]).goOnline)(
                      u.id,
                      R ?? { latitude: 6.6735, longitude: -1.5645 },
                      e
                    )),
                  { data: r, error: null })
            );
          }, [b?.id, b?.corridor, c, u?.id, R, q]),
          z = (0, e.useCallback)(async () => {
            if (!b?.id || !u?.id) return { error: new Error('No active ride') };
            E(!0);
            const { data: e, error: r } = await (0, _r(d[7]).cancelActiveRideAsDriver)(b.id, u.id);
            return (
              E(!1),
              r
                ? { error: r }
                : (h(null),
                  c &&
                    (await (0, _r(d[7]).goOnline)(
                      u.id,
                      R ?? { latitude: 6.6735, longitude: -1.5645 },
                      A.current || I
                    )),
                  { data: e, error: null })
            );
          }, [b?.id, c, u?.id, R, I]),
          H = (0, e.useCallback)(
            async e => {
              const r = b?.passengers?.find(r => r.id === e);
              if (!r || !['pending_pickup', 'arrived'].includes(r.status))
                return { error: new Error('Passenger is not waiting at pickup') };
              const n = (b?.passengers ?? []).map(r =>
                r.id === e ? Object.assign({}, r, { status: 'cancelled' }) : r
              );
              (h(e => (e ? Object.assign({}, e, { passengers: n }) : e)),
                await (0, _r(d[7]).markPassengerNoShow)(e, {
                  passengerId: r.passengerId,
                  pickup: r.pickup,
                  route: b?.corridor,
                }));
              if (
                0 === n.filter(e => !['dropped_off', 'cancelled'].includes(e.status)).length &&
                b?.id &&
                u?.id
              ) {
                const e = await z();
                return Object.assign({}, e, { rideEnded: !e.error });
              }
              return { error: null, rideEnded: !1 };
            },
            [b?.passengers, b?.corridor, b?.id, u?.id, z]
          ),
          X = (0, e.useMemo)(() => {
            if (!b?.passengers?.length) return !1;
            const e = b.passengers.filter(e => 'cancelled' !== e.status);
            return !!e.length && e.every(e => 'dropped_off' === e.status);
          }, [b?.passengers]),
          Y = (0, e.useMemo)(
            () =>
              b?.passengers?.length
                ? b.passengers
                    .filter(e => !['pending_pickup', 'cancelled'].includes(e.status))
                    .reduce((e, r) => e + r.fare, 0)
                : 0,
            [b?.passengers]
          ),
          Z = (0, e.useMemo)(() => (0, _r(d[10]).getPeakDemandContext)(), []),
          ee = (0, e.useMemo)(
            () => ({
              isOnline: c,
              todayStats: p,
              pendingRequest: _,
              activeRide: b,
              driverLocation: R,
              requestCountdown: v,
              loading: y,
              allDroppedOff: X,
              rideEarnings: Y,
              profile: o,
              user: u,
              selectedCorridor: I,
              peakContext: Z,
              setSelectedCorridor: C,
              goOnline: W,
              goOffline: G,
              acceptRequest: J,
              declineRequest: Q,
              arriveAtPickup: V,
              startPassengerTrip: B,
              pickupPassenger: B,
              dropoffPassenger: K,
              markPassengerNoShow: H,
              endRide: $,
              cancelActiveRide: z,
              refreshActiveRide: U,
              refreshStats: q,
            }),
            [c, p, _, b, R, v, y, X, Y, o, u, I, Z, W, G, J, Q, V, B, K, H, $, z, U, q]
          );
        return (0, n.jsx)(t.Provider, { value: ee, children: s });
      }),
      (_e.useTRDriverRide = function () {
        const r = (0, e.useContext)(t);
        if (!r) throw new Error('useTRDriverRide must be used within TRDriverRideProvider');
        return r;
      }));
    var e = _r(d[0]),
      r = (function (e, r) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            t = new WeakMap();
        return (function (e, r) {
          if (!r && e && e.__esModule) return e;
          var i,
            s,
            u = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return u;
          if ((i = r ? t : n)) {
            if (i.has(e)) return i.get(e);
            i.set(e, u);
          }
          for (const r in e)
            'default' !== r &&
              {}.hasOwnProperty.call(e, r) &&
              ((s = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, r)) &&
              (s.get || s.set)
                ? i(u, r, s)
                : (u[r] = e[r]));
          return u;
        })(e, r);
      })(_r(d[1])),
      n = _r(d[2]);
    const t = (0, e.createContext)(null);
    function i(e) {
      if (!e) return [];
      return (e.passengers ?? e.trotroride_ride_passengers ?? []).map(e => {
        const r = (0, _r(d[3]).coordsFromPlaceLabel)(e.pickup) ?? {
            latitude: 6.6738,
            longitude: -1.5647,
          },
          n = (0, _r(d[3]).coordsFromPlaceLabel)(e.dropoff) ?? {
            latitude: 6.682,
            longitude: -1.552,
          },
          t = Array.isArray(e.profiles) ? e.profiles[0]?.phone_number : e.profiles?.phone_number;
        return {
          id: e.id,
          passengerId: e.passenger_id,
          name: e.passenger_name ?? 'Passenger',
          phone: e.passenger_phone ?? t ?? null,
          rating: (e.trust_score ?? 72) / 20,
          pickup: e.pickup,
          dropoff: e.dropoff,
          pickupLat: e.pickup_lat ?? e.pickupLat ?? r.latitude,
          pickupLng: e.pickup_lng ?? e.pickupLng ?? r.longitude,
          dropoffLat: e.dropoff_lat ?? e.dropoffLat ?? n.latitude,
          dropoffLng: e.dropoff_lng ?? e.dropoffLng ?? n.longitude,
          fare: Number(e.fare ?? 0),
          status: e.status ?? 'pending_pickup',
        };
      });
    }
  },
  1450,
  [5, 1493, 183, 759, 501, 508, 1500, 754, 1501, 760, 758]
);
__d(
  function (g, _r, _i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.MateTripProvider = function ({ children: l }) {
        const { user: p, profile: f } = (0, _r(d[6]).useAuth)(),
          [b, v] = (0, t.useState)(null),
          [w, I] = (0, t.useState)([]),
          [_, P] = (0, t.useState)(null),
          [h, T] = (0, t.useState)(!1),
          [E, S] = (0, t.useState)([]),
          [A, k] = (0, t.useState)({ trips: 0, earned: 0 }),
          [y, M] = (0, t.useState)(null),
          [C, O] = (0, t.useState)(!1),
          R = (0, t.useRef)(0),
          N = (0, t.useRef)(0),
          j = (0, t.useRef)(!1),
          D = (0, t.useCallback)(async () => {
            if (!p?.id) return;
            await (0, _r(d[7]).getHiddenRecentTripIds)(p.id);
            const { data: t } = await (0, _r(d[2]).fetchCompletedMateTrips)(p.id, 10);
            S(t?.length ? t : []);
          }, [p?.id]),
          x = (0, t.useCallback)(async () => {
            if (!p?.id) return;
            if (Date.now() < N.current) return;
            if (j.current) return;
            let t = 'trip',
              { data: r } = await (0, _r(d[2]).getActiveTrip)(p.id);
            if (!r) {
              const { data: i } = await (0, _r(d[8]).fetchActiveMateTrip)(p.id);
              i && ((r = (0, _r(d[2]).normalizeTripRow)(i)), (t = 'mate_trip'));
            }
            if (!r) return;
            const [{ data: i }, { data: n }, s] = await Promise.all([
                (0, _r(d[9]).getReservationsForTrip)(r.id),
                (0, _r(d[10]).fetchWaitingPassengers)(r.origin, r.destination),
                (0, _r(d[7]).getLocalTripReservations)(r.id),
              ]),
              o = u(i ?? [], s ?? []);
            j.current || Date.now() < N.current || (v(c(r, o, n, t)), (R.current = o.length));
          }, [p?.id]),
          q = (0, t.useCallback)(async () => {
            if (!p?.id) return;
            const { data: t } = await (0, _r(d[2]).fetchMateTodayStats)(p.id);
            t && k(t);
          }, [p?.id]),
          L = (0, t.useCallback)(t => {
            (I(
              (t?.routes ?? [] ?? []).map((t, r) => ({
                id: t.id ?? `demand-${r}`,
                route: t.route,
                origin: t.origin,
                destination: t.destination,
                waiting: t.waiting,
                level: t.level,
                recentJoins: t.recentJoins ?? 0,
                longestWaitMin: t.longestWaitMin ?? 0,
              }))
            ),
              P(t?.updatedAt ?? Date.now()),
              T(Boolean(t?.live)));
          }, []);
        ((0, t.useEffect)(() => (0, _r(d[10]).subscribeToQueueDemand)(L), [L]),
          (0, t.useEffect)(() => {
            if (!p?.id) return;
            let t = !1;
            return (
              (async () => {
                let { data: r } = await (0, _r(d[2]).getActiveTrip)(p.id);
                if (!r) {
                  const { data: t } = await (0, _r(d[8]).fetchActiveMateTrip)(p.id);
                  t && (r = (0, _r(d[2]).normalizeTripRow)(t));
                }
                if (!t) {
                  if (r)
                    ((j.current = !1),
                      await (0, _r(d[7]).setMateSkipActiveTripHydration)(p.id, !1),
                      await x());
                  else {
                    const t = await (0, _r(d[7]).getMateSkipActiveTripHydration)(p.id);
                    j.current = t;
                  }
                  (await D(), await q());
                }
              })(),
              () => {
                t = !0;
              }
            );
          }, [p?.id, x, D, q]),
          (0, t.useEffect)(() => {
            if (b?.origin && b?.destination)
              return (0, _r(d[10]).subscribeToRouteWaitingPassengers)(
                b.origin,
                b.destination,
                ({ passengers: t }) => {
                  v(r => {
                    if (!r) return r;
                    if (t.length > 0) {
                      const i = s(t);
                      return Object.assign({}, r, {
                        waitingPassengers: (0, _r(d[11]).mergeWaitingPassengerLists)(
                          r.waitingPassengers,
                          i
                        ),
                      });
                    }
                    if (h) {
                      const t = (r.waitingPassengers ?? []).filter(
                        t => 'invited' === t.status && !(0, _r(d[11]).isInviteExpired)(t)
                      );
                      return Object.assign({}, r, { waitingPassengers: t });
                    }
                    return r;
                  });
                },
                { pollMs: _r(d[12]).ACTIVE_TRIP_QUEUE_POLL_MS }
              );
          }, [b?.origin, b?.destination, b?.id, h]),
          (0, t.useEffect)(() => {
            p?.id && b?.dbId && (0, _r(d[13]).expireStaleMateInvites)(p.id).catch(() => {});
          }, [p?.id, b?.dbId]),
          (0, t.useEffect)(() => {
            if (!p?.id || !b?.origin || !b?.destination) return;
            return (0, _r(d[13]).subscribeToMateInvites)(p.id, b.dbId, async () => {
              const [{ data: t }, { data: r }] = await Promise.all([
                  (0, _r(d[10]).fetchWaitingPassengers)(b.origin, b.destination),
                  (0, _r(d[13]).fetchMateOutgoingInvites)(p.id, b.dbId),
                ]),
                i = n(r ?? []);
              v(r => {
                if (!r) return r;
                const n = s((t ?? []).filter(t => !i.has(t.id)));
                return Object.assign({}, r, {
                  waitingPassengers: (0, _r(d[11]).mergeWaitingPassengerLists)(
                    r.waitingPassengers,
                    n
                  ).filter(t => !i.has(t.id)),
                });
              });
            });
          }, [p?.id, b?.dbId, b?.origin, b?.destination]),
          (0, t.useEffect)(() => {
            if (b?.dbId && !b.localOnly)
              return (0, _r(d[2]).subscribeToActiveTrip)(b.dbId, t => {
                v(r => i(r, t));
              });
          }, [b?.dbId, b?.localOnly]),
          (0, t.useEffect)(() => {
            if (!b?.dbId || b.localOnly) return;
            return (0, _r(d[9]).subscribeToReservations)(b.dbId, async t => {
              const r = u(t ?? [], (await (0, _r(d[7]).getLocalTripReservations)(b.dbId)) ?? []);
              if (r.length > R.current) {
                const t = r[r.length - 1];
                (0, _r(d[14]).notifyMateNewReservation)({
                  passengerName: t.passengerName,
                  pickupPoint: t.pickup,
                  route: b.route,
                  userId: p?.id,
                }).catch(() => {});
              }
              ((R.current = r.length),
                v(t => {
                  if (!t) return t;
                  const i = t.reservations.filter(t => 'boarded' === t.status),
                    n = new Set(r.map(t => t.id)),
                    s = i.filter(t => !n.has(t.id)),
                    o = u(r, s);
                  return Object.assign({}, t, { reservations: o });
                }));
            });
          }, [b?.dbId, b?.localOnly, b?.route, p?.id]),
          (0, t.useEffect)(() => {
            if (!b?.dbId) return;
            const t = async () => {
              const t = await (0, _r(d[7]).getLocalTripReservations)(b.dbId);
              v(r => {
                if (!r) return r;
                const i = r.reservations.filter(t => 'boarded' === t.status),
                  n = u(t, i);
                if (n.length > R.current) {
                  const t = n[n.length - 1];
                  (0, _r(d[14]).notifyMateNewReservation)({
                    passengerName: t.passengerName,
                    pickupPoint: t.pickup,
                    route: r.route,
                    userId: p?.id,
                  }).catch(() => {});
                }
                if (((R.current = n.length), r.localOnly || String(r.dbId).startsWith('local-')))
                  return Object.assign({}, r, { reservations: n });
                const s = new Set(r.reservations.map(t => t.id)),
                  o = n.filter(t => !s.has(t.id));
                return 0 === o.length
                  ? r
                  : Object.assign({}, r, { reservations: u(r.reservations, o) });
              });
            };
            t();
            const r = setInterval(t, 12e3);
            return () => clearInterval(r);
          }, [b?.dbId, p?.id]));
        const W = (0, t.useCallback)(
          async t => {
            const r = b?.waitingPassengers?.find(r => r.id === t);
            if (!r) return { error: new Error('Passenger not found') };
            const i = r.passengerId ?? r.passenger_id ?? null;
            return (
              await (0, _r(d[15]).withdrawMatePassengerRequest)({
                mateId: p?.id,
                passengerId: i,
                queueId: t,
                inviteId: r.inviteId ?? null,
              }),
              H(r =>
                Object.assign({}, r, {
                  waitingPassengers: r.waitingPassengers.map(r =>
                    r.id === t
                      ? Object.assign({}, r, {
                          status: 'waiting',
                          inviteId: null,
                          inviteMessage: null,
                          invitedAt: null,
                          inviteExpiresAt: null,
                        })
                      : r
                  ),
                })
              ),
              { error: null }
            );
          },
          [b, H, p?.id]
        );
        ((0, t.useEffect)(() => {
          const t =
            b?.waitingPassengers?.filter(t => 'invited' === t.status && t.inviteExpiresAt) ?? [];
          if (!t.length) return;
          const r = t => {
            (0, _r(d[11]).isInviteExpired)(t) && W(t.id).catch(() => {});
          };
          t.forEach(r);
          const i = t.map(t => {
            const i = Math.max(500, new Date(t.inviteExpiresAt).getTime() - Date.now());
            return setTimeout(() => r(t), i);
          });
          return () => i.forEach(clearTimeout);
        }, [b?.waitingPassengers, W]),
          (0, t.useEffect)(() => {
            if (
              b?.dbId &&
              p?.id &&
              !b.localOnly &&
              (!_r(d[16]).locationService.isTracking() ||
                _r(d[16]).locationService.currentTripId !== b.dbId)
            )
              return (
                _r(d[16])
                  .locationService.startTracking(p.id, b.dbId, b.route, t => {
                    M({ latitude: t.latitude, longitude: t.longitude });
                  })
                  .catch(() => {}),
                () => {
                  p?.id && _r(d[16]).locationService.stopTracking(p.id);
                }
              );
          }, [b?.dbId, b?.route, b?.localOnly, p?.id]),
          (0, t.useEffect)(
            () => () => {
              p?.id &&
                _r(d[16]).locationService.isTracking() &&
                _r(d[16]).locationService.stopTracking(p.id);
            },
            [p?.id]
          ));
        const U = (0, t.useCallback)(async () => {
            O(!0);
            const t = !j.current,
              [{ data: r }] = await Promise.all([
                (0, _r(d[10]).fetchQueueDemandRoutes)(),
                t ? x() : Promise.resolve(),
                D(),
              ]);
            (L({ routes: r ?? [], updatedAt: Date.now(), live: h }), O(!1));
          }, [x, D, L, h]),
          V = (0, t.useCallback)(t => {
            t && !j.current && v(r => r ?? t);
          }, []),
          $ = (0, t.useCallback)(
            async t => {
              if (!p?.id) return { data: null, error: new Error('Sign in again to start a trip.') };
              ((j.current = !1),
                (N.current = 0),
                await (0, _r(d[7]).setMateSkipActiveTripHydration)(p.id, !1));
              const r = `${t.origin} \u2192 ${t.destination}`;
              try {
                let i = f?.station_id ?? null;
                if (!f) {
                  const { data: t, error: r } = await (0, _r(d[17]).ensureProfileFromAuthUser)(p);
                  if (r || !t)
                    return {
                      data: null,
                      error: r ?? new Error('Set up your mate profile before departing.'),
                    };
                  i = t.station_id ?? null;
                }
                const { data: n, error: s } = await (0, _r(d[2]).createTrip)(
                  p.id,
                  r,
                  t.origin,
                  t.destination,
                  t.totalSeats,
                  t.farePerSeat,
                  t.vehicleType,
                  i
                );
                if (s) return { data: null, error: s };
                try {
                  await _r(d[16]).locationService.startTracking(p.id, n.id, r, t => {
                    M({ latitude: t.latitude, longitude: t.longitude });
                  });
                } catch (r) {
                  const { data: i } = await (0, _r(d[10]).fetchWaitingPassengers)(
                      t.origin,
                      t.destination
                    ),
                    s = c(n, [], i ?? [], 'trip');
                  return (
                    v(s),
                    (R.current = 0),
                    {
                      data: s,
                      error: null,
                      gpsWarning: r?.message ?? 'Location tracking unavailable.',
                    }
                  );
                }
                const { data: o } = await (0, _r(d[10]).fetchWaitingPassengers)(
                    t.origin,
                    t.destination
                  ),
                  l = c(n, [], o ?? [], 'trip');
                return (v(l), (R.current = 0), { data: l, error: null });
              } catch (t) {
                return { data: null, error: t };
              }
            },
            [p, f?.station_id]
          ),
          B = (0, t.useCallback)(
            async t => {
              const r = t ?? b;
              if (!r || !p?.id) return null;
              const i = r.dbId ?? r.id,
                n = {
                  route: r.route,
                  earnings: r.earnings,
                  seatsRemaining: r.seatsAvailable,
                  boarded: r.boardedCount,
                };
              ((N.current = Date.now() + 2e4),
                (R.current = 0),
                v(null),
                M(null),
                await _r(d[16]).locationService.stopTracking(p.id));
              const { error: s } = await (0, _r(d[2]).endTrip)(i, p.id, n);
              if (s)
                return (
                  (N.current = 0),
                  (j.current = !1),
                  await (0, _r(d[7]).setMateSkipActiveTripHydration)(p.id, !1),
                  v(r),
                  null
                );
              ((j.current = !0), await (0, _r(d[7]).setMateSkipActiveTripHydration)(p.id, !0));
              const o = { id: r.id, route: r.route, earnings: r.earnings, time: 'Just now' };
              return (
                S(t => [o, ...t.filter(t => t.id !== o.id)].slice(0, 10)),
                await Promise.all([D(), q()]),
                n
              );
            },
            [b, p?.id, D, q]
          ),
          F = (0, t.useCallback)(async t => {
            t?.dbId &&
              !t.localOnly &&
              (await (0, _r(d[2]).updateAvailableSeats)(t.dbId, t.seatsAvailable));
          }, []),
          H = (0, t.useCallback)(
            t => {
              v(r => {
                if (!r) return r;
                const i = 'function' == typeof t ? t(r) : Object.assign({}, r, t);
                return (F(i), i);
              });
            },
            [F]
          ),
          z = (0, t.useCallback)(async () => {
            if (!b) return { error: new Error('No active trip') };
            const { seatsLeftForBooking: t, boardingClosed: r } = (0,
            _r(d[18]).computeActiveTripMetrics)(b, b.reservations);
            if (r) return { error: new Error('Boarding is closed for this trip') };
            if (t <= 0) return { error: new Error('No seats remaining') };
            if (b.dbId && !b.localOnly) {
              const { data: t, error: r } = await (0, _r(d[2]).adjustTripBoardedCount)(b.dbId, 1);
              return r
                ? { error: r }
                : (t?.ok && v(r => i(r, Object.assign({ id: b.dbId }, t))), { error: null });
            }
            return (
              v(t => {
                if (!t) return t;
                const r = (t.boardedCount ?? 0) + 1,
                  i = Number(t.farePerSeat ?? 0);
                return Object.assign({}, t, {
                  seatsAvailable: Math.max(0, (t.seatsAvailable ?? 0) - 1),
                  boardedCount: r,
                  earnings: Math.round(r * i * 100) / 100,
                });
              }),
              { error: null }
            );
          }, [b]),
          K = (0, t.useCallback)(async () => {
            if (!b) return { error: new Error('No active trip') };
            if ((b.boardedCount ?? 0) <= 0) return { error: new Error('No passengers to undo') };
            if (b.dbId && !b.localOnly) {
              const { data: t, error: r } = await (0, _r(d[2]).adjustTripBoardedCount)(b.dbId, -1);
              return r
                ? { error: r }
                : (t?.ok && v(r => i(r, Object.assign({ id: b.dbId }, t))), { error: null });
            }
            return (
              v(t => {
                if (!t || (t.boardedCount ?? 0) <= 0) return t;
                const r = t.boardedCount - 1,
                  i = Number(t.farePerSeat ?? 0);
                return Object.assign({}, t, {
                  seatsAvailable: Math.min(t.totalSeats, (t.seatsAvailable ?? 0) + 1),
                  boardedCount: r,
                  earnings: Math.max(0, Math.round(r * i * 100) / 100),
                  boardingClosed: !1,
                  tripStatus: 'active',
                });
              }),
              { error: null }
            );
          }, [b]),
          Q = (0, t.useCallback)(async () => {
            if (!b) return { data: null, error: new Error('No active trip') };
            const t = b,
              r = t.waitingPassengers?.filter(t => 'invited' === t.status) ?? [];
            if (t.dbId && !t.localOnly) {
              const { data: r, error: i } = await (0, _r(d[2]).markTripBoardingFull)(t.dbId);
              if (i) return { data: null, error: i };
              r?.ok &&
                v(t =>
                  t
                    ? Object.assign({}, t, {
                        seatsAvailable: 0,
                        tripStatus: 'full',
                        boardingClosed: !0,
                      })
                    : t
                );
            } else
              v(t =>
                t
                  ? Object.assign({}, t, {
                      seatsAvailable: 0,
                      tripStatus: 'full',
                      boardingClosed: !0,
                    })
                  : t
              );
            return (
              await Promise.all(r.map(t => W(t.id).catch(() => {}))),
              v(t =>
                t
                  ? Object.assign({}, t, {
                      waitingPassengers: (t.waitingPassengers ?? []).filter(
                        t => 'invited' !== t.status
                      ),
                    })
                  : t
              ),
              { data: { status: 'full' }, error: null }
            );
          }, [b, W]),
          X = (0, t.useCallback)(
            async (t, r) => {
              b?.dbId && (await (0, _r(d[7]).updateLocalTripReservation)(b.dbId, t, r));
            },
            [b?.dbId]
          ),
          Y = (0, t.useCallback)(
            async t => {
              if (b) {
                if (b.dbId && !b.localOnly) {
                  const { error: r } = await (0, _r(d[9]).boardPassenger)(t, b.dbId);
                  if (r) return;
                } else await X(t, { status: 'boarded' });
                H(r =>
                  Object.assign({}, r, {
                    boardedCount: r.boardedCount + 1,
                    earnings: r.earnings + r.farePerSeat,
                    reservations: r.reservations.map(r =>
                      r.id === t ? Object.assign({}, r, { status: 'boarded' }) : r
                    ),
                  })
                );
              }
            },
            [b, X, H]
          ),
          J = (0, t.useCallback)(
            async t => {
              if (!b) return { error: new Error('No active trip') };
              if (b.dbId && !b.localOnly) {
                const { data: r, error: i } = await (0, _r(d[9]).acceptReservation)(t, b.dbId);
                if (i) return { error: i };
                const n =
                  r?.verification_code ??
                  r?.verificationCode ??
                  (0, _r(d[19]).generateVerificationCode)();
                return (
                  H(r =>
                    Object.assign({}, r, {
                      reservations: r.reservations.map(r =>
                        r.id === t
                          ? Object.assign({}, r, { status: 'confirmed', verificationCode: n })
                          : r
                      ),
                    })
                  ),
                  { error: null, data: { verificationCode: n } }
                );
              }
              const r = (0, _r(d[19]).generateVerificationCode)();
              return (
                await X(t, { status: 'confirmed', verification_code: r }),
                H(i =>
                  Object.assign({}, i, {
                    reservations: i.reservations.map(i =>
                      i.id === t
                        ? Object.assign({}, i, { status: 'confirmed', verificationCode: r })
                        : i
                    ),
                  })
                ),
                { error: null, data: { verificationCode: r } }
              );
            },
            [b, X, H]
          ),
          G = (0, t.useCallback)(
            async t => {
              if (!b) return { error: new Error('No active trip') };
              if (b.dbId && !b.localOnly) {
                const { error: r } = await (0, _r(d[9]).cancelReservation)(t, b.dbId);
                if (r) return { error: r };
              } else await (0, _r(d[7]).removeLocalTripReservation)(b.dbId, t);
              return (
                H(r =>
                  Object.assign({}, r, {
                    seatsAvailable: Math.min(r.totalSeats, r.seatsAvailable + 1),
                    reservations: r.reservations.filter(r => r.id !== t),
                  })
                ),
                { error: null }
              );
            },
            [b, H]
          ),
          Z = (0, t.useCallback)(
            async t => {
              if (b) {
                if (b.dbId && !b.localOnly) {
                  const { error: r } = await (0, _r(d[9]).cancelReservation)(t, b.dbId);
                  if (r) return;
                } else await (0, _r(d[7]).removeLocalTripReservation)(b.dbId, t);
                H(r =>
                  Object.assign({}, r, {
                    seatsAvailable: Math.min(r.totalSeats, r.seatsAvailable + 1),
                    reservations: r.reservations.filter(r => r.id !== t),
                  })
                );
              }
            },
            [b, H]
          ),
          ee = (0, t.useCallback)(
            async t => {
              const r = b?.waitingPassengers?.find(r => r.id === t);
              if (!r) return { error: new Error('Passenger not found') };
              if ((b?.seatsAvailable ?? 0) <= 0) return { error: new Error('No seats available') };
              const i = {
                id: `queue-res-${t}-${Date.now()}`,
                passengerName: r.passengerName ?? 'Passenger',
                pickup: r.pickup ?? r.origin ?? '',
                expiresAt: Date.now() + 60 * _r(d[5]).RESERVATION_HOLD_MINUTES * 1e3,
                status: 'confirmed',
                latitude: r.latitude,
                longitude: r.longitude,
              };
              return (
                b?.dbId &&
                  (await (0, _r(d[7]).upsertLocalTripReservation)(b.dbId, {
                    id: i.id,
                    trip_id: b.dbId,
                    passenger_name: i.passengerName,
                    pickup_point: i.pickup,
                    status: i.status,
                    expires_at: new Date(i.expiresAt).toISOString(),
                    latitude: i.latitude,
                    longitude: i.longitude,
                    localOnly: !0,
                  })),
                H(r =>
                  Object.assign({}, r, {
                    seatsAvailable: r.seatsAvailable - 1,
                    reservations: [...r.reservations, i],
                    waitingPassengers: r.waitingPassengers.filter(r => r.id !== t),
                  })
                ),
                { error: null }
              );
            },
            [b, H]
          ),
          te = (0, t.useCallback)(
            async t => (
              H(r =>
                Object.assign({}, r, {
                  waitingPassengers: r.waitingPassengers.filter(r => r.id !== t),
                })
              ),
              { error: null }
            ),
            [H]
          ),
          ae = (0, t.useCallback)(
            async (t, r = '') => {
              const i = b?.waitingPassengers?.find(r => r.id === t);
              if (!i) return { error: new Error('Passenger not found') };
              const n = i.passengerId ?? i.passenger_id ?? null,
                { data: s, error: o } = await (0, _r(d[15]).sendMatePassengerRequest)({
                  mateId: p?.id,
                  passengerId: n,
                  queueId: t,
                  trip: b,
                  mateProfile: f,
                  waitingPassenger: i,
                  message: r,
                });
              if (o) return { error: o };
              const l = Date.now(),
                u = l + 60 * _r(d[5]).MATE_INVITE_EXPIRY_MINUTES * 1e3;
              return (
                H(i =>
                  Object.assign({}, i, {
                    waitingPassengers: i.waitingPassengers.map(i =>
                      i.id === t
                        ? Object.assign({}, i, {
                            status: 'invited',
                            inviteId: s?.inviteId ?? s?.remoteInvite?.id ?? null,
                            inviteMessage: r,
                            invitedAt: l,
                            inviteExpiresAt: u,
                          })
                        : i
                    ),
                  })
                ),
                { data: s, error: null }
              );
            },
            [b, p?.id, f, H]
          ),
          re = (0, t.useCallback)(
            async (t = '') => {
              const r = (b?.waitingPassengers ?? []).filter(t => 'waiting' === t.status),
                i = b?.seatsAvailable ?? 0;
              if (!r.length)
                return { data: { invited: 0 }, error: new Error('No passengers waiting in queue') };
              if (i <= 0) return { data: { invited: 0 }, error: new Error('No seats available') };
              const n = r.slice(0, i),
                s = Date.now(),
                o = s + 60 * _r(d[5]).MATE_INVITE_EXPIRY_MINUTES * 1e3,
                l = new Map();
              let u = null;
              for (const r of n) {
                const i = r.passengerId ?? r.passenger_id ?? null,
                  { data: n, error: c } = await (0, _r(d[15]).sendMatePassengerRequest)({
                    mateId: p?.id,
                    passengerId: i,
                    queueId: r.id,
                    trip: b,
                    mateProfile: f,
                    waitingPassenger: r,
                    message: t,
                  });
                if (c) {
                  u = c;
                  break;
                }
                l.set(r.id, {
                  inviteId: n?.inviteId ?? n?.remoteInvite?.id ?? null,
                  inviteMessage: t,
                  invitedAt: s,
                  inviteExpiresAt: o,
                });
              }
              return (
                l.size > 0 &&
                  H(t =>
                    Object.assign({}, t, {
                      waitingPassengers: t.waitingPassengers.map(t => {
                        const r = l.get(t.id);
                        return r ? Object.assign({}, t, { status: 'invited' }, r) : t;
                      }),
                    })
                  ),
                { data: { invited: l.size, attempted: n.length }, error: u }
              );
            },
            [b, p?.id, f, H]
          ),
          ie = (0, t.useCallback)(
            async t => {
              if (!t?.id || !p?.id) return { error: new Error('Missing trip') };
              const { error: r } = await (0, _r(d[2]).deleteMateRecentTrip)(t.id, p.id);
              return r ? { error: r } : (S(r => r.filter(r => r.id !== t.id)), { error: null });
            },
            [p?.id]
          ),
          ne = (0, t.useMemo)(
            () => ({
              activeTrip: b,
              demandRoutes: w,
              demandUpdatedAt: _,
              demandLive: h,
              recentTrips: E,
              todayStats: A,
              mateLocation: y,
              refreshing: C,
              refreshDemand: U,
              startTrip: $,
              ensureActiveTrip: V,
              endTrip: B,
              boardPassenger: z,
              undoBoardPassenger: K,
              markTripFull: Q,
              boardReservation: Y,
              acceptReservation: J,
              declineReservation: G,
              cancelReservation: Z,
              acceptWaitingPassenger: ee,
              declineWaitingPassenger: te,
              invitePassenger: ae,
              inviteAllWaitingPassengers: re,
              withdrawPassengerRequest: W,
              deleteRecentTrip: ie,
            }),
            [b, w, _, h, E, A, y, C, U, $, V, B, z, K, Q, Y, J, G, Z, ee, te, ae, re, W, ie]
          );
        return (0, r.jsx)(o.Provider, { value: ne, children: l });
      }),
      (e.useMateTrip = function () {
        const r = (0, t.useContext)(o);
        if (!r) throw new Error('useMateTrip must be used within MateTripProvider');
        return r;
      }));
    var t = _r(d[0]),
      r = _r(d[1]);
    function i(t, r) {
      if (!t || !r) return t;
      const i = (0, _r(d[2]).normalizeTripRow)(r),
        n = i.boarded_count ?? t.boardedCount ?? 0,
        s = Number(i.fare_per_seat ?? t.farePerSeat ?? 0),
        o = i.total_seats ?? t.totalSeats ?? 0,
        l = i.status ?? t.tripStatus ?? 'active';
      return Object.assign({}, t, {
        boardedCount: n,
        seatsAvailable: i.available_seats ?? i.seats_available ?? t.seatsAvailable,
        totalSeats: o,
        farePerSeat: s,
        earnings: (0, _r(d[3]).computeMateTripEarnings)({
          boardedCount: n,
          farePerSeat: s,
          totalSeats: o,
          availableSeats: i.available_seats ?? i.seats_available,
          storedEarnings: null,
        }),
        tripStatus: l,
        boardingClosed: 'full' === l,
      });
    }
    function n(t = []) {
      return new Set(
        t
          .filter(t => ['accepted', 'declined', 'withdrawn', 'expired'].includes(t.status))
          .map(t => t.queueId ?? t.queue_id)
          .filter(Boolean)
      );
    }
    function s(t) {
      return t?.length
        ? t
            .filter(t => (0, _r(d[4]).isQueueEntryVisibleNow)(t))
            .map((t, r) => {
              const i =
                'invited' === t.status && t.updated_at
                  ? new Date(t.updated_at).getTime()
                  : (t.invitedAt ?? null);
              return {
                id: t.id ?? `w-${r}`,
                origin: t.origin,
                destination: t.destination,
                pickup: t.origin,
                passengerName: t.profiles?.full_name ?? t.passengerName ?? 'Passenger',
                passengerPhone: t.profiles?.phone_number ?? t.passengerPhone ?? null,
                trustScore: t.profiles?.trust_score ?? null,
                waitMin: t.created_at
                  ? Math.max(1, Math.floor((Date.now() - new Date(t.created_at).getTime()) / 6e4))
                  : (t.waitMin ?? 0),
                status: t.status ?? 'waiting',
                latitude: t.latitude,
                longitude: t.longitude,
                scheduledFor: t.scheduled_for ?? t.scheduledFor ?? null,
                notes: t.notes ?? null,
                requestKind: t.request_kind ?? t.requestKind ?? 'queue',
                passengerId: t.passenger_id ?? t.passengerId ?? null,
                invitedAt: i,
                inviteExpiresAt: i
                  ? i + 60 * _r(d[5]).MATE_INVITE_EXPIRY_MINUTES * 1e3
                  : (t.inviteExpiresAt ?? null),
                createdAt: t.created_at ?? t.createdAt ?? null,
              };
            })
        : [];
    }
    const o = (0, t.createContext)(null);
    function l(t) {
      if (!t) return null;
      const r = t.profiles ?? {};
      return {
        id: t.id,
        passengerName: t.passenger_name ?? r.full_name ?? t.passengerName ?? 'Passenger',
        passengerPhone: r.phone_number ?? t.passengerPhone ?? null,
        trustScore: r.trust_score ?? null,
        pickup: t.pickup_point ?? t.pickup ?? '',
        expiresAt: new Date(t.expires_at ?? t.expiresAt ?? Date.now()).getTime(),
        status: t.status ?? 'pending',
        verificationCode: t.verification_code ?? t.verificationCode ?? null,
        latitude: t.latitude ?? t.trip_snapshot?.latitude ?? null,
        longitude: t.longitude ?? t.trip_snapshot?.longitude ?? null,
      };
    }
    function u(t = [], r = []) {
      const i = new Map();
      return (
        t.forEach(t => {
          const r = l(t);
          r && i.set(r.id, r);
        }),
        r.forEach(t => {
          const r = l(t);
          if (!r) return;
          const n = i.get(r.id);
          'boarded' !== n?.status
            ? i.set(r.id, r)
            : i.set(r.id, Object.assign({}, r, { status: 'boarded' }));
        }),
        Array.from(i.values())
      );
    }
    function c(t, r = [], i = [], n = 'trip') {
      if (!t) return null;
      const s = (0, _r(d[2]).normalizeTripRow)(t),
        o = i.length > 0 ? i : [];
      return {
        id: s.id,
        dbId: s.id,
        tripKind: n,
        localOnly: s.localOnly,
        route: s.route ?? s.route_label ?? `${s.origin} \u2192 ${s.destination}`,
        origin: s.origin,
        destination: s.destination,
        vehicleType: s.vehicle_type,
        totalSeats: s.total_seats,
        seatsAvailable: s.available_seats ?? s.seats_available,
        farePerSeat: Number(s.fare_per_seat ?? s.fare ?? 0),
        trackShareToken: s.track_share_token ?? null,
        boardedCount: s.boarded_count ?? 0,
        earnings: (0, _r(d[3]).computeMateTripEarnings)({
          boardedCount: s.boarded_count ?? 0,
          farePerSeat: Number(s.fare_per_seat ?? s.fare ?? 0),
          totalSeats: s.total_seats ?? 0,
          availableSeats: s.available_seats ?? s.seats_available,
          storedEarnings: null,
        }),
        tripStatus: s.status ?? 'active',
        boardingClosed: 'full' === s.status,
        startedAt: s.created_at
          ? new Date(s.created_at).getTime()
          : s.started_at
            ? new Date(s.started_at).getTime()
            : Date.now(),
        reservations: u([], r),
        waitingPassengers: o.length
          ? o.map((t, r) => {
              const i =
                'invited' === t.status && t.updated_at
                  ? new Date(t.updated_at).getTime()
                  : (t.invitedAt ?? null);
              return {
                id: t.id ?? `w-${r}`,
                origin: t.origin,
                destination: t.destination,
                pickup: t.origin,
                passengerName: t.profiles?.full_name ?? 'Passenger',
                passengerPhone: t.profiles?.phone_number ?? null,
                trustScore: t.profiles?.trust_score ?? null,
                waitMin: t.created_at
                  ? Math.max(1, Math.floor((Date.now() - new Date(t.created_at).getTime()) / 6e4))
                  : 0,
                status: t.status ?? 'waiting',
                latitude: t.latitude,
                longitude: t.longitude,
                scheduledFor: t.scheduled_for ?? null,
                notes: t.notes ?? null,
                requestKind: t.request_kind ?? 'queue',
                passengerId: t.passenger_id ?? t.passengerId ?? null,
                invitedAt: i,
                inviteExpiresAt: i ? i + 60 * _r(d[5]).MATE_INVITE_EXPIRY_MINUTES * 1e3 : null,
                createdAt: t.created_at ?? null,
              };
            })
          : [],
      };
    }
  },
  1482,
  [
    5, 183, 687, 686, 1504, 508, 501, 692, 1700, 1523, 1503, 1701, 938, 937, 760, 1702, 1501, 556,
    1703, 1524,
  ]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.DeliveryCourierProvider = function ({
        children: i,
        vehicleKind: u = 'bike',
        enabled: c = !0,
      }) {
        const { user: o } = (0, _r(d[3]).useAuth)(),
          [s, l] = (0, e.useState)(!1),
          [f, y] = (0, e.useState)(null),
          [b, E] = (0, e.useState)(null),
          [_, v] = (0, e.useState)({ count: 0, earned: 0 }),
          [C, w] = (0, e.useState)(!1),
          [p, I] = (0, e.useState)(_r(d[4]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC),
          S = (0, e.useRef)(u),
          D = (0, e.useRef)(new Set()),
          R = (0, e.useRef)(null),
          O = (0, e.useRef)(null),
          h = (0, e.useRef)(null),
          k = (0, e.useRef)(null),
          J = (0, e.useRef)(!1);
        (0, e.useEffect)(() => {
          R.current = f;
        }, [f]);
        const P = (0, e.useCallback)(e => {
            if (!e)
              return (
                (k.current = null),
                (h.current = null),
                (J.current = !1),
                void I(_r(d[4]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC)
              );
            k.current !== e &&
              ((k.current = e),
              (h.current = (0, _r(d[5]).createIncomingRequestDeadline)(
                _r(d[4]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC
              )),
              (J.current = !1),
              I((0, _r(d[5]).secondsUntilIncomingDeadline)(h.current)));
          }, []),
          M = (0, e.useCallback)(async () => {
            if (J.current) return;
            J.current = !0;
            const e = R.current;
            ((k.current = null),
              (h.current = null),
              y(null),
              I(_r(d[4]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC),
              e?.id && (await O.current?.(e.id).catch(() => {})));
          }, []);
        (0, e.useEffect)(() => {
          S.current = u;
        }, [u]);
        const T = (0, e.useCallback)(async () => {
            if (!o?.id) return;
            const { data: e } = await (0, _r(d[6]).fetchCourierEarningsSummary)(o.id);
            e && v({ count: e.count, earned: e.today });
          }, [o?.id]),
          N = (0, e.useCallback)(async () => {
            if (!o?.id) return;
            const [{ data: e }, { data: r }] = await Promise.all([
              (0, _r(d[6]).fetchActiveDeliveryForCourier)(o.id),
              (0, _r(d[6]).fetchPendingDeliveryForCourier)(o.id),
            ]);
            (E(e ?? null),
              e && ['picked_up', 'in_transit'].includes(e.status)
                ? (P(null), y(null))
                : r &&
                    !D.current.has(r.id) &&
                    (['assigned', 'ready_for_pickup'].includes(r.status) ||
                      ('pending' === r.status && 'parcel' === r.kind && !r.assigned_courier_id))
                  ? (R.current?.id !== r.id && P(r.id), y(r))
                  : (R.current?.id && P(null), y(null)));
          }, [o?.id, P]);
        (0, e.useEffect)(() => {
          if (!c || !o?.id) return (l(!1), y(null), void E(null));
          let e = !1;
          (async () => {
            const { data: r } = await (0, _r(d[6]).fetchCourierPresence)(o.id);
            e || (('online' !== r?.status && 'busy' !== r?.status) || l(!0), await N(), await T());
          })();
          const r = (0, _r(d[6]).subscribeDeliveryJobsForCourier)(o.id, () => {
              N();
            }),
            n = setInterval(() => {
              N();
            }, 2e4);
          return () => {
            ((e = !0), r(), clearInterval(n));
          };
        }, [c, o?.id, N, T]);
        const U = (0, e.useCallback)(
            async (e = {}) => {
              if (!o?.id) return { error: new Error('Sign in required') };
              w(!0);
              let n = e;
              try {
                const { status: t } = await r.requestForegroundPermissionsAsync();
                if ('granted' === t) {
                  const t = await r.getCurrentPositionAsync({});
                  n = Object.assign(
                    { latitude: t.coords.latitude, longitude: t.coords.longitude },
                    e
                  );
                }
              } catch {}
              const { data: t, error: i } = await (0, _r(d[6]).setCourierPresence)({
                status: 'online',
                latitude: n.latitude,
                longitude: n.longitude,
                corridor: e.corridor,
                vehicleKind: e.vehicleKind ?? S.current,
                acceptsParcels: e.acceptsParcels ?? !0,
                acceptsFood: e.acceptsFood ?? !0,
              });
              return (w(!1), i || l(!0), { data: t, error: i });
            },
            [o?.id]
          ),
          j = (0, e.useCallback)(async () => {
            if (!o?.id) return { error: new Error('Sign in required') };
            w(!0);
            const { data: e, error: r } = await (0, _r(d[6]).setCourierPresence)({
              status: 'offline',
              vehicleKind: S.current,
            });
            return (w(!1), r || (l(!1), P(null), y(null)), { data: e, error: r });
          }, [o?.id, P]),
          x = (0, e.useCallback)(
            async e => {
              w(!0);
              const { data: r, error: n } = await (0, _r(d[6]).acceptDeliveryJob)(e ?? f?.id);
              return (w(!1), !n && r && (P(null), y(null), E(r)), { data: r, error: n });
            },
            [f?.id, P]
          ),
          F = (0, e.useCallback)(
            async e => {
              const r = e ?? f?.id;
              if ('ready_for_pickup' === f?.status && !f?.assigned_courier_id)
                return (r && D.current.add(r), P(null), y(null), { data: f, error: null });
              w(!0);
              const { data: n, error: t } = await (0, _r(d[6]).declineDeliveryJob)(r);
              return (
                w(!1),
                t || (r && D.current.add(r), P(null), y(null), await N()),
                { data: n, error: t }
              );
            },
            [f, N, P]
          );
        ((0, e.useEffect)(() => {
          O.current = F;
        }, [F]),
          (0, e.useEffect)(() => {
            if (!f?.id || !s || b) return;
            const e = () => {
              const e = h.current;
              if (!e || R.current?.id !== k.current) return;
              const r = (0, _r(d[5]).secondsUntilIncomingDeadline)(e);
              (I(r), (0, _r(d[5]).hasIncomingDeadlineElapsed)(e) && M());
            };
            e();
            const r = setInterval(e, 500);
            return () => clearInterval(r);
          }, [f?.id, s, b?.id, M]));
        const G = (0, e.useCallback)(
            async e => {
              if (!b?.id) return { data: null, error: new Error('No active delivery') };
              w(!0);
              const { data: r, error: n } = await (0, _r(d[6]).advanceDeliveryJob)(b.id, e);
              if ((w(!1), n)) return { data: null, error: n };
              if ('delivered' === e && r) {
                const e = Number(r.fare_breakdown?.courierEarnings ?? 0);
                (e > 0 &&
                  o?.id &&
                  (await (0, _r(d[7]).creditEarningsToWallet)(e, `delivery-earn-${r.id}`, {
                    source: 'delivery',
                    kind: r.kind ?? 'parcel',
                    job_id: r.id,
                  })),
                  E(null),
                  await T());
              } else E(r);
              return { data: r, error: null };
            },
            [b?.id, o?.id, T]
          ),
          Q = (0, e.useMemo)(
            () => ({
              isOnline: s,
              pendingJob: f,
              activeJob: b,
              todayStats: _,
              loading: C,
              jobCountdown: p,
              goOnline: U,
              goOffline: j,
              acceptJob: x,
              declineJob: F,
              advanceJob: G,
              refreshJobs: N,
              refreshStats: T,
              setPendingJob: y,
            }),
            [s, f, b, _, C, p, U, j, x, F, G, N, T]
          );
        return (0, n.jsx)(t.Provider, { value: Q, children: i });
      }),
      (_e.useDeliveryCourier = function () {
        const r = (0, e.useContext)(t);
        if (!r)
          return {
            isOnline: !1,
            pendingJob: null,
            activeJob: null,
            todayStats: { count: 0, earned: 0 },
            loading: !1,
            jobCountdown: _r(d[4]).INCOMING_DRIVER_REQUEST_TIMEOUT_SEC,
            goOnline: async () => ({ error: new Error('Delivery courier context missing') }),
            goOffline: async () => ({ error: new Error('Delivery courier context missing') }),
            acceptJob: async () => ({ error: new Error('Delivery courier context missing') }),
            declineJob: async () => ({ error: new Error('Delivery courier context missing') }),
            advanceJob: async () => ({ error: new Error('Delivery courier context missing') }),
            refreshJobs: async () => {},
            refreshStats: async () => {},
            setPendingJob: () => {},
          };
        return r;
      }));
    var e = _r(d[0]),
      r = (function (e, r) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            t = new WeakMap();
        return (function (e, r) {
          if (!r && e && e.__esModule) return e;
          var i,
            u,
            c = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return c;
          if ((i = r ? t : n)) {
            if (i.has(e)) return i.get(e);
            i.set(e, c);
          }
          for (const r in e)
            'default' !== r &&
              {}.hasOwnProperty.call(e, r) &&
              ((u = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, r)) &&
              (u.get || u.set)
                ? i(c, r, u)
                : (c[r] = e[r]));
          return c;
        })(e, r);
      })(_r(d[1])),
      n = _r(d[2]);
    const t = (0, e.createContext)(null);
  },
  1483,
  [5, 1493, 183, 501, 508, 1500, 1492, 1491]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useAppMode = function () {
        const { user: o, profile: u, updateProfile: l } = (0, r(d[1]).useAuth)(),
          [n, s] = (0, t.useState)(null),
          [c, p] = (0, t.useState)(!1);
        (0, t.useEffect)(() => {
          let t = !1;
          return o?.id
            ? (p(!1),
              (async () => {
                if (u?.role)
                  return (
                    t || (s(u.role), p(!0)),
                    void (await (0, r(d[2]).setItem)((0, r(d[2]).appModeCacheKey)(o.id), u.role))
                  );
                const l = await (0, r(d[2]).getItem)((0, r(d[2]).appModeCacheKey)(o.id));
                t || (s(l || r(d[3]).USER_ROLES.PASSENGER), p(!0));
              })(),
              () => {
                t = !0;
              })
            : (s(null), void p(!0));
        }, [o?.id, u?.role]);
        const S = u?.role ?? n ?? r(d[3]).USER_ROLES.PASSENGER,
          f = (0, t.useCallback)(
            async t => {
              if (
                (s(t),
                o?.id && (await (0, r(d[2]).setItem)((0, r(d[2]).appModeCacheKey)(o.id), t)),
                !o?.id)
              )
                return { error: null };
              const { error: u } = await l(o.id, { role: t });
              return { error: u };
            },
            [o?.id, l]
          );
        return { activeRole: S, setAppMode: f, ready: c };
      }));
    var t = r(d[0]);
  },
  1484,
  [5, 501, 559, 508]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function ({
        waypoints: e = [],
        corridor: i = 'Tech Junction \u2192 Ayeduase',
        driverCoord: x,
        heading: b = 0,
        speedKmh: v = 0,
        nextStop: j = null,
        followDriver: C = !1,
        fitRoute: k = !1,
        compact: M = !1,
        showCorridor: w = !0,
        showNavBanner: F = !0,
        style: P,
      }) {
        const { colors: N } = (0, _r(d[12]).useTheme)(),
          R = (0, t.useRef)(null),
          {
            coordinates: _,
            summary: D,
            loading: E,
            fromFallback: I,
          } = (0, f.default)(e, { corridor: i, vehicleHeading: b }),
          O = (0, t.useMemo)(() => (0, _r(d[15]).corridorCoords)(i), [i]),
          T = (0, _r(d[16]).getTrafficColor)(v || 28),
          z = N.primaryLight ?? N.primary ?? T,
          B = C && x ? x : null,
          S = (0, t.useMemo)(() => (_.length >= 2 ? _ : O.length >= 2 ? O : []), [_, O]),
          W = (0, t.useMemo)(() => {
            if (null != x?.latitude && null != x?.longitude) return x;
            const t = (0, _r(d[15]).corridorCoords)(i)[0];
            if (t) return t;
            const n = e.find(e => 'pickup' === e.type);
            return null != n?.latitude ? { latitude: n.latitude, longitude: n.longitude } : null;
          }, [x, i, e]),
          $ = (0, t.useMemo)(() => e.filter(e => 'pickup' === e.type || 'dropoff' === e.type), [e]),
          L = (0, t.useMemo)(() => {
            const t = [...(S.length ? S : O), ...e];
            return (W && t.unshift(W), t.filter(e => null != e?.latitude && null != e?.longitude));
          }, [S, O, e, W]);
        (0, t.useEffect)(() => {
          if (!R.current || L.length < 2) return;
          if (k)
            return void R.current.fitToCoordinates(L, {
              edgePadding: {
                top: M ? 48 : 72,
                right: 32,
                bottom: F ? (M ? 96 : 148) : 48,
                left: 32,
              },
              animated: !0,
            });
          if (C || M) return;
          const e = (0, _r(d[17]).regionForCoordinates)(L);
          e && R.current.animateToRegion(e, 500);
        }, [L, C, k, M, _.length, F]);
        const A = (0, t.useMemo)(() => {
          if (k && L.length >= 2) return (0, _r(d[17]).regionForCoordinates)(L) ?? u.KUMASI_REGION;
          const e = W ?? L[0];
          return e
            ? {
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: M ? 0.04 : 0.06,
                longitudeDelta: M ? 0.04 : 0.06,
              }
            : ((0, _r(d[17]).regionForCoordinates)(L) ?? u.KUMASI_REGION);
        }, [W, M, L, k]);
        return (0, p.jsxs)(s.default, {
          style: [h.wrap, M && h.wrapCompact, P],
          children: [
            (0, p.jsxs)(u.default, {
              mapRef: R,
              style: h.map,
              initialRegion: A,
              followCoordinate: B,
              scrollEnabled: !M,
              zoomEnabled: !M,
              rotateEnabled: !M,
              children: [
                w
                  ? (0, p.jsx)(_r(d[13]).Polyline, {
                      coordinates: O,
                      strokeColor: N.borderStrong ?? N.border,
                      strokeWidth: 3,
                      lineDashPattern: [8, 6],
                    })
                  : null,
                S.length >= 2
                  ? (0, p.jsx)(_r(d[13]).Polyline, {
                      coordinates: S,
                      strokeColor: z,
                      strokeWidth: M ? 5 : 7,
                      lineCap: 'round',
                      lineJoin: 'round',
                      zIndex: 2,
                    })
                  : null,
                W
                  ? (0, p.jsx)(c.default, {
                      coordinate: W,
                      type: 'trotroride',
                      title: 'You',
                      heading: b,
                    })
                  : null,
                $.map((e, t) =>
                  (0, p.jsx)(
                    y,
                    {
                      coordinate: { latitude: e.latitude, longitude: e.longitude },
                      type: e.type,
                      isNext: j
                        ? j.latitude === e.latitude && j.longitude === e.longitude
                        : 0 === t,
                      title: e.label ?? ('pickup' === e.type ? 'Pickup' : 'Drop-off'),
                    },
                    `${e.type}-${e.id ?? t}-${e.latitude}`
                  )
                ),
              ],
            }),
            E
              ? (0, p.jsxs)(s.default, {
                  style: [h.loadingBadge, { backgroundColor: N.surfaceElevated }],
                  children: [
                    (0, p.jsx)(n.default, { size: 'small', color: N.primary }),
                    (0, p.jsx)(l.default, {
                      style: [h.loadingText, { color: N.textSecondary }],
                      children: 'Loading route\u2026',
                    }),
                  ],
                })
              : null,
            F && (D || S.length >= 2)
              ? (0, p.jsxs)(s.default, {
                  style: [
                    h.navBanner,
                    { backgroundColor: N.surfaceElevated, borderColor: N.border },
                  ],
                  children: [
                    (0, p.jsxs)(s.default, {
                      style: h.navBannerMain,
                      children: [
                        (0, p.jsxs)(l.default, {
                          style: [h.navEta, { color: N.textPrimary }],
                          children: [D?.durationMin ?? '\u2014', ' min'],
                        }),
                        (0, p.jsxs)(l.default, {
                          style: [h.navMeta, { color: N.textSecondary }],
                          children: [
                            D ? D.distanceKm.toFixed(1) : '\u2014',
                            ' km',
                            D?.trafficDelayMin > 0 ? ` \xb7 +${D.trafficDelayMin} min traffic` : '',
                            I ? ' \xb7 estimated route' : ' \xb7 live route',
                          ],
                        }),
                        j
                          ? (0, p.jsxs)(l.default, {
                              style: [h.navNext, { color: N.accentText ?? N.primary }],
                              numberOfLines: 1,
                              children: [
                                'Next:',
                                ' ',
                                'arrived' === j.phase
                                  ? `Waiting for ${j.passengerName ?? 'passenger'} at pickup`
                                  : `${'pickup' === j.type ? 'Pick up' : 'Drop off'}${j.passengerName ? ` ${j.passengerName}` : ''} \xb7 ${j.label}`,
                              ],
                            })
                          : null,
                      ],
                    }),
                    (0, p.jsx)(r.default, {
                      style: [h.navOpenBtn, { backgroundColor: N.primary }],
                      onPress: () => {
                        const e = j ?? $[$.length - 1] ?? W,
                          t = (0, _r(d[18]).getExternalNavigationUrl)(e?.latitude, e?.longitude);
                        t && o.default.openURL(t);
                      },
                      accessibilityLabel: 'Open turn-by-turn navigation',
                      children: (0, p.jsx)(_r(d[14]).Ionicons, {
                        name: 'navigate',
                        size: 18,
                        color: N.onPrimary,
                      }),
                    }),
                  ],
                })
              : null,
          ],
        });
      }));
    var t = _r(d[1]),
      n = e(_r(d[2])),
      o = e(_r(d[3])),
      r = e(_r(d[4])),
      i = e(_r(d[5])),
      l = e(_r(d[6])),
      s = e(_r(d[7])),
      u = (function (e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            o = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var r,
            i,
            l = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return l;
          if ((r = t ? o : n)) {
            if (r.has(e)) return r.get(e);
            r.set(e, l);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((i = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (i.get || i.set)
                ? r(l, t, i)
                : (l[t] = e[t]));
          return l;
        })(e, t);
      })(_r(d[8])),
      c = e(_r(d[9])),
      f = e(_r(d[10])),
      p = _r(d[11]);
    function y({ coordinate: e, type: t, isNext: n, title: o }) {
      const { colors: r } = (0, _r(d[12]).useTheme)(),
        i = 'pickup' === t,
        l = i ? r.greenAccent : r.warning;
      return (0, p.jsx)(_r(d[13]).Marker, {
        coordinate: e,
        title: o,
        anchor: { x: 0.5, y: 0.5 },
        children: (0, p.jsx)(s.default, {
          style: [
            h.pin,
            { backgroundColor: l, borderColor: n ? r.textPrimary : 'transparent' },
            n && h.pinNext,
          ],
          children: (0, p.jsx)(_r(d[14]).Ionicons, {
            name: i ? 'person' : 'flag',
            size: n ? 14 : 12,
            color: r.onPrimary ?? '#FFF',
          }),
        }),
      });
    }
    const h = i.default.create({
      wrap: { flex: 1, position: 'relative' },
      wrapCompact: { flex: 0, height: 180, borderRadius: _r(d[19]).radius.lg, overflow: 'hidden' },
      map: { flex: 1 },
      pin: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
      },
      pinNext: { width: 34, height: 34, borderRadius: 17, borderWidth: 3 },
      loadingBadge: {
        position: 'absolute',
        top: _r(d[19]).spacing.sm,
        left: _r(d[19]).spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: _r(d[19]).spacing.xs,
        paddingHorizontal: _r(d[19]).spacing.sm,
        paddingVertical: 6,
        borderRadius: _r(d[19]).radius.pill,
      },
      loadingText: { fontFamily: _r(d[19]).fontFamily.medium, fontSize: 12 },
      navBanner: {
        position: 'absolute',
        left: _r(d[19]).spacing.sm,
        right: _r(d[19]).spacing.sm,
        bottom: _r(d[19]).spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        padding: _r(d[19]).spacing.md,
        borderRadius: _r(d[19]).radius.lg,
        borderWidth: 1,
        gap: _r(d[19]).spacing.sm,
      },
      navBannerMain: { flex: 1, minWidth: 0 },
      navEta: { fontFamily: _r(d[19]).fontFamily.bold, fontSize: 22 },
      navMeta: { fontFamily: _r(d[19]).fontFamily.medium, fontSize: 13, marginTop: 2 },
      navNext: { fontFamily: _r(d[19]).fontFamily.semiBold, fontSize: 13, marginTop: 4 },
      navOpenBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  },
  1485,
  [1, 5, 373, 667, 326, 26, 161, 19, 745, 751, 1490, 183, 381, 747, 578, 759, 756, 1487, 749, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ score: t = 0, compact: n = !1, variant: f = 'primary' }) {
        const { colors: y } = (0, r(d[6]).useTheme)(),
          b = (0, o.useMemo)(() => u(y), [y]),
          h = 'success' === f ? y.textPrimary : (0, r(d[7]).getTrustTier)(t).color;
        if (n)
          return (0, s.jsx)(l.default, {
            style: [b.compactBadge, { borderColor: h }],
            children: (0, s.jsx)(c.default, { style: b.compactScore, children: t }),
          });
        return (0, s.jsxs)(l.default, {
          style: [b.badge, { borderColor: h }],
          children: [
            (0, s.jsx)(l.default, {
              style: [b.scoreCircle, { borderColor: h }],
              children: (0, s.jsx)(c.default, { style: b.score, children: t }),
            }),
            (0, s.jsx)(c.default, {
              style: b.label,
              children: t >= 70 ? 'Trusted' : t >= 50 ? 'Good' : 'Fair',
            }),
          ],
        });
      }));
    var o = r(d[1]),
      l = t(r(d[2])),
      c = t(r(d[3])),
      n = t(r(d[4])),
      s = r(d[5]);
    const u = t =>
      n.default.create({
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: t.surfaceElevated,
          borderRadius: 999,
          padding: 8,
          paddingRight: 14,
          borderWidth: 2,
        },
        scoreCircle: {
          width: 44,
          height: 44,
          borderRadius: 22,
          borderWidth: 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.surface,
          marginRight: 10,
        },
        score: { fontFamily: r(d[8]).fontFamily.bold, color: t.textPrimary, fontSize: 16 },
        label: { fontFamily: r(d[8]).fontFamily.medium, color: t.textPrimary, fontSize: 15 },
        compactBadge: {
          width: 36,
          height: 36,
          borderRadius: 18,
          borderWidth: 2,
          backgroundColor: t.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
        },
        compactScore: { fontFamily: r(d[8]).fontFamily.bold, color: t.textPrimary, fontSize: 12 },
      });
  },
  1486,
  [1, 5, 19, 161, 26, 183, 381, 936, 377]
);
__d(
  function (g, r, _i, _a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildActiveRideWaypoints = function (t, o = [], i = 'Tech Junction \u2192 Ayeduase') {
        const u = [];
        if (n(t)) u.push(Object.assign({}, t, { type: 'driver' }));
        else {
          const t = (0, r(d[0]).corridorCoords)(i)[0];
          t && u.push(Object.assign({}, t, { type: 'driver' }));
        }
        return (
          o
            .filter(t => !['dropped_off', 'cancelled'].includes(t.status))
            .forEach((t, n) => {
              if (['pending_pickup', 'arrived'].includes(t.status)) {
                const o = s(
                  t.pickupLat ?? t.pickup_lat,
                  t.pickupLng ?? t.pickup_lng,
                  t.pickup,
                  i,
                  n
                );
                o &&
                  u.push(
                    Object.assign({}, o, { type: 'pickup', label: t.pickup, id: `${t.id}-pickup` })
                  );
              }
            }),
          o
            .filter(t => !['dropped_off', 'cancelled'].includes(t.status))
            .forEach((t, n) => {
              const o = s(
                t.dropoffLat ?? t.dropoff_lat,
                t.dropoffLng ?? t.dropoff_lng,
                t.dropoff,
                i,
                n + 1
              );
              o &&
                u.push(
                  Object.assign({}, o, { type: 'dropoff', label: t.dropoff, id: `${t.id}-dropoff` })
                );
            }),
          u
        );
      }),
      (e.buildRequestPreviewWaypoints = function (t, o) {
        const i = t.corridor ?? 'Tech Junction \u2192 Ayeduase',
          u = s(t.pickup_lat, t.pickup_lng, t.pickup, i, 0),
          a = s(t.dropoff_lat, t.dropoff_lng, t.dropoff, i, 1),
          l = Object.assign({}, u, { type: 'pickup', label: t.pickup }),
          c = Object.assign({}, a, { type: 'dropoff', label: t.dropoff }),
          p = [];
        if (n(o)) p.push(Object.assign({}, o, { type: 'driver' }));
        else {
          const t = (0, r(d[0]).corridorCoords)(i)[0];
          t && p.push(Object.assign({}, t, { type: 'driver' }));
        }
        return (p.push(l, c), p);
      }),
      (e.buildRoutePreview = function (t, o = {}) {
        const u = o.corridor ?? 'Tech Junction \u2192 Ayeduase',
          a = (t ?? []).filter(n);
        if (a.length < 2)
          return { coordinates: (0, r(d[0]).corridorCoords)(u), summary: null, fromFallback: !0 };
        return { coordinates: i(a, u), summary: l(a), fromFallback: !0 };
      }),
      (e.fetchTomTomRoute = async function (u, c = {}) {
        const { corridor: s = 'Tech Junction \u2192 Ayeduase', vehicleHeading: p = null } = c,
          f = (u ?? []).filter(n);
        if (f.length < 2)
          return {
            coordinates: (0, r(d[0]).corridorCoords)(s),
            summary: null,
            fromFallback: !0,
            error: null,
          };
        if (!r(d[1]).USE_TOMTOM)
          return { coordinates: i(f, s), summary: l(f), fromFallback: !0, error: null };
        const h = f.map(o).join(':'),
          M = new URLSearchParams({
            key: r(d[1]).TOMTOM_API_KEY,
            traffic: 'true',
            travelMode: 'car',
            routeType: 'fastest',
            sectionType: 'traffic',
          });
        null != p && Number.isFinite(p) && M.set('vehicleHeading', String(Math.round(p)));
        const k = `${t}/${encodeURIComponent(h)}/json?${M.toString()}`;
        try {
          const t = await fetch(k);
          if (!t.ok) throw new Error(`TomTom routing HTTP ${t.status}`);
          const n = await t.json(),
            o = a(n),
            i = n?.routes?.[0]?.summary ?? null;
          if (o.length < 2) throw new Error('Empty route geometry');
          return {
            coordinates: o,
            summary: i
              ? {
                  distanceKm: (i.lengthInMeters ?? 0) / 1e3,
                  durationMin: Math.max(1, Math.round((i.travelTimeInSeconds ?? 0) / 60)),
                  trafficDelayMin: Math.round((i.trafficDelayInSeconds ?? 0) / 60),
                }
              : l(f),
            fromFallback: !1,
            error: null,
          };
        } catch (t) {
          return { coordinates: i(f, s), summary: l(f), fromFallback: !0, error: t };
        }
      }),
      (e.getNextRideStop = function (t = [], n = 'Tech Junction \u2192 Ayeduase') {
        const o = t.find(t => 'pending_pickup' === t.status);
        if (o) {
          const t = s(o.pickupLat ?? o.pickup_lat, o.pickupLng ?? o.pickup_lng, o.pickup, n, 0);
          return {
            type: 'pickup',
            label: o.pickup,
            latitude: t?.latitude,
            longitude: t?.longitude,
            passengerName: o.name,
            phase: 'en_route',
          };
        }
        const i = t.find(t => 'arrived' === t.status);
        if (i) {
          const t = s(i.pickupLat ?? i.pickup_lat, i.pickupLng ?? i.pickup_lng, i.pickup, n, 0);
          return {
            type: 'pickup',
            label: i.pickup,
            latitude: t?.latitude,
            longitude: t?.longitude,
            passengerName: i.name,
            phase: 'arrived',
          };
        }
        const u = t.find(t => 'in_ride' === t.status);
        if (u) {
          const t = s(
            u.dropoffLat ?? u.dropoff_lat,
            u.dropoffLng ?? u.dropoff_lng,
            u.dropoff,
            n,
            1
          );
          return {
            type: 'dropoff',
            label: u.dropoff,
            latitude: t?.latitude,
            longitude: t?.longitude,
            passengerName: u.name,
            phase: 'in_ride',
          };
        }
        return null;
      }),
      (e.regionForCoordinates = function (t, n = 1.35) {
        if (!t?.length) return null;
        let o = t[0].latitude,
          i = t[0].latitude,
          u = t[0].longitude,
          a = t[0].longitude;
        t.forEach(t => {
          ((o = Math.min(o, t.latitude)),
            (i = Math.max(i, t.latitude)),
            (u = Math.min(u, t.longitude)),
            (a = Math.max(a, t.longitude)));
        });
        const l = Math.max((i - o) * n, 0.012),
          c = Math.max((a - u) * n, 0.012);
        return {
          latitude: (o + i) / 2,
          longitude: (u + a) / 2,
          latitudeDelta: l,
          longitudeDelta: c,
        };
      }));
    const t = 'https://api.tomtom.com/routing/1/calculateRoute';
    function n(t) {
      return t && Number.isFinite(t.latitude) && Number.isFinite(t.longitude);
    }
    function o(t) {
      return `${t.latitude},${t.longitude}`;
    }
    function i(t, n) {
      const o = (0, r(d[0]).corridorCoords)(n),
        i = [];
      for (let n = 0; n < t.length - 1; n += 1) {
        const u = t[n],
          a = t[n + 1],
          l = 12;
        for (let t = 0; t <= l; t += 1) {
          const n = t / l,
            c = u.latitude + (a.latitude - u.latitude) * n,
            s = u.longitude + (a.longitude - u.longitude) * n,
            p = o[Math.min(Math.floor(n * (o.length - 1)), o.length - 1)];
          i.push({
            latitude: 0.85 * c + 0.15 * p.latitude,
            longitude: 0.85 * s + 0.15 * p.longitude,
          });
        }
      }
      return u(i);
    }
    function u(t) {
      if (t.length <= 1) return t;
      const n = [t[0]];
      for (let o = 1; o < t.length; o += 1) {
        const i = n[n.length - 1],
          u = t[o];
        (Math.abs(i.latitude - u.latitude) > 1e-5 || Math.abs(i.longitude - u.longitude) > 1e-5) &&
          n.push(u);
      }
      return n;
    }
    function a(t) {
      const n = t?.routes?.[0];
      if (!n) return [];
      const o = (n.legs ?? []).flatMap(t => t.points ?? []);
      return o.length
        ? o.map(t => ({ latitude: t.latitude, longitude: t.longitude }))
        : n.sections?.length
          ? n.sections.flatMap(t =>
              (t.points ?? []).map(t => ({ latitude: t.latitude, longitude: t.longitude }))
            )
          : [];
    }
    function l(t) {
      let n = 0;
      for (let o = 0; o < t.length - 1; o += 1) n += c(t[o], t[o + 1]);
      return {
        distanceKm: Math.round(10 * n) / 10,
        durationMin: Math.max(1, Math.round(3.5 * n)),
        trafficDelayMin: 0,
      };
    }
    function c(t, n) {
      const o = ((n.latitude - t.latitude) * Math.PI) / 180,
        i = ((n.longitude - t.longitude) * Math.PI) / 180,
        u = (t.latitude * Math.PI) / 180,
        a = (n.latitude * Math.PI) / 180,
        l = Math.sin(o / 2) ** 2 + Math.cos(u) * Math.cos(a) * Math.sin(i / 2) ** 2;
      return 12742 * Math.asin(Math.sqrt(l));
    }
    function s(t, o, i, u, a = 0) {
      if (n({ latitude: t, longitude: o })) return { latitude: t, longitude: o };
      const l = (0, r(d[0]).coordsFromPlaceLabel)(i);
      if (l) return l;
      const c = (0, r(d[0]).corridorCoords)(u);
      return c[Math.min(a, c.length - 1)] ?? c[0] ?? null;
    }
  },
  1487,
  [759, 749]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.navigateToMainTab = function (E, S, T) {
        if (!E?.navigate || !S) return;
        if ((E.getState?.()?.routeNames ?? []).includes(S)) return void E.navigate(S, T);
        if (R.has(S)) return void E.navigate('MainTabs', { screen: S, params: T });
        E.navigate(S, T);
      }),
      (e.navigateToRootScreen = function (R, E, S) {
        if (!R?.navigate || !E) return;
        let T = R;
        for (; T;) {
          if ((T.getState?.()?.routeNames ?? []).includes(E)) return void T.navigate(E, S);
          T = T.getParent?.() ?? null;
        }
        R.navigate(E, S);
      }));
    const R = new Set([
      r(d[0]).ROUTES.PASSENGER_FIND_RIDE,
      r(d[0]).ROUTES.PASSENGER_MY_TRIPS,
      r(d[0]).ROUTES.BID_AND_RIDE,
      r(d[0]).ROUTES.CARPOOL_MATCHER,
      r(d[0]).ROUTES.TROTRO_MARKET,
      r(d[0]).ROUTES.PASSENGER_PROFILE,
      r(d[0]).ROUTES.MATE_DASHBOARD,
      r(d[0]).ROUTES.MATE_ACTIVE_TRIP,
      r(d[0]).ROUTES.MATE_EARNINGS,
      r(d[0]).ROUTES.TR_DRIVER_DASHBOARD,
      r(d[0]).ROUTES.TR_RIDE,
      r(d[0]).ROUTES.TR_EARNINGS,
      r(d[0]).ROUTES.COURIER_DASHBOARD,
      r(d[0]).ROUTES.COURIER_ACTIVE,
      r(d[0]).ROUTES.COURIER_EARNINGS,
      r(d[0]).ROUTES.VENDOR_ORDERS,
      r(d[0]).ROUTES.VENDOR_MENU,
      r(d[0]).ROUTES.VENDOR_PROFILE,
    ]);
  },
  1488,
  [682]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        pickup: t,
        dropoff: o,
        pickupLabel: f,
        dropoffLabel: p,
        kind: x,
        kindLabel: h,
        fare: b,
        compact: y = !1,
      }) {
        const { colors: j } = (0, r(d[7]).useTheme)(),
          k = (0, l.useMemo)(() => u(j), [j]),
          S = 'food' === x ? 'restaurant-outline' : 'cube-outline';
        return (0, c.jsxs)(s.default, {
          style: [k.card, y && { padding: r(d[6]).spacing.md }],
          children: [
            (0, c.jsxs)(s.default, {
              style: k.header,
              children: [
                (0, c.jsxs)(s.default, {
                  style: k.kindPill,
                  children: [
                    (0, c.jsx)(r(d[8]).Ionicons, { name: S, size: 14, color: j.textSecondary }),
                    (0, c.jsx)(n.default, { style: k.kindText, children: h }),
                  ],
                }),
                null != b
                  ? (0, c.jsx)(n.default, { style: k.fare, children: (0, r(d[9]).formatGhs)(b) })
                  : null,
              ],
            }),
            (0, c.jsxs)(s.default, {
              style: k.route,
              children: [
                (0, c.jsxs)(s.default, {
                  style: k.rail,
                  children: [
                    (0, c.jsx)(s.default, { style: k.dotPickup }),
                    (0, c.jsx)(s.default, { style: k.line }),
                    (0, c.jsx)(s.default, { style: k.dotDrop }),
                  ],
                }),
                (0, c.jsxs)(s.default, {
                  style: k.stops,
                  children: [
                    (0, c.jsxs)(s.default, {
                      children: [
                        (0, c.jsx)(n.default, { style: k.stopLabel, children: f }),
                        (0, c.jsx)(n.default, { style: k.stopText, numberOfLines: 2, children: t }),
                      ],
                    }),
                    (0, c.jsxs)(s.default, {
                      children: [
                        (0, c.jsx)(n.default, { style: k.stopLabel, children: p }),
                        (0, c.jsx)(n.default, { style: k.stopText, numberOfLines: 2, children: o }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }));
    var l = r(d[1]),
      o = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = r(d[5]);
    const u = t =>
      o.default.create({
        card: {
          borderRadius: r(d[6]).radius.lg,
          borderWidth: 1,
          borderColor: t.borderSoft ?? t.border,
          backgroundColor: t.surfaceElevated ?? t.surface,
          padding: r(d[6]).spacing.lg,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[6]).spacing.md,
        },
        kindPill: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: r(d[6]).spacing.sm,
          paddingVertical: 4,
          borderRadius: r(d[6]).radius.pill,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
        },
        kindText: {
          fontFamily: r(d[6]).fontFamily.semiBold,
          fontSize: 12,
          color: t.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        },
        fare: { fontFamily: r(d[6]).fontFamily.bold, fontSize: 20, color: t.gold ?? t.success },
        route: { flexDirection: 'row', gap: r(d[6]).spacing.md },
        rail: { alignItems: 'center', paddingTop: 4 },
        dotPickup: {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: t.greenAccent ?? t.success,
        },
        line: {
          flex: 1,
          width: 2,
          minHeight: 28,
          marginVertical: 4,
          backgroundColor: t.borderStrong ?? t.border,
          borderRadius: 1,
        },
        dotDrop: {
          width: 10,
          height: 10,
          borderRadius: 2,
          backgroundColor: t.incoming ?? t.warning,
        },
        stops: { flex: 1, gap: r(d[6]).spacing.lg },
        stopLabel: Object.assign({}, r(d[6]).typography.caption, {
          color: t.textMuted,
          marginBottom: 2,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          fontSize: 11,
        }),
        stopText: {
          fontFamily: r(d[6]).fontFamily.semiBold,
          fontSize: 15,
          lineHeight: 21,
          color: t.textPrimary,
        },
      });
  },
  1489,
  [1, 5, 26, 161, 19, 183, 377, 381, 578, 691]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function (n, u = {}) {
        const c = u.corridor ?? 'Tech Junction \u2192 Ayeduase',
          s = u.vehicleHeading ?? null,
          l = (0, o.useMemo)(() => t(n), [n]),
          f = (0, o.useMemo)(() => (0, r(d[1]).buildRoutePreview)(n, { corridor: c }), [l, c]),
          [y, b] = (0, o.useState)(() => ({
            coordinates: f.coordinates,
            summary: f.summary,
            loading: !1,
            fromFallback: !0,
          }));
        return (
          (0, o.useEffect)(() => {
            if (!n || n.length < 2)
              return void b({
                coordinates: f.coordinates,
                summary: f.summary,
                loading: !1,
                fromFallback: !0,
              });
            b({ coordinates: f.coordinates, summary: f.summary, loading: !0, fromFallback: !0 });
            let o = !1;
            return (
              (0, r(d[1]).fetchTomTomRoute)(n, { corridor: c, vehicleHeading: s }).then(t => {
                o ||
                  b({
                    coordinates: t.coordinates?.length >= 2 ? t.coordinates : f.coordinates,
                    summary: t.summary ?? f.summary,
                    loading: !1,
                    fromFallback: Boolean(t.fromFallback),
                  });
              }),
              () => {
                o = !0;
              }
            );
          }, [l, c, s, f.coordinates, f.summary]),
          y
        );
      }));
    var o = r(d[0]);
    function t(o) {
      return (o ?? [])
        .map(o => `${o.type ?? 'stop'}:${o.latitude?.toFixed(5)},${o.longitude?.toFixed(5)}`)
        .join('|');
    }
  },
  1490,
  [5, 1487]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      const t = (0, r(d[0]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function n(t) {
      return t
        ? (0, r(d[1]).isRpcMissingError)(t) || (0, r(d[1]).isMissingTableError)(t)
          ? new Error('Wallet is not set up yet. Apply migration 025_wallets.sql in Supabase.')
          : new Error((0, r(d[2]).errorMessage)(t) || 'Wallet request failed')
        : null;
    }
    async function l() {
      const { supabase: l, error: o } = t();
      if (o) return { data: null, error: o };
      const { data: u, error: s } = await l.rpc('ensure_wallet');
      return s ? { data: null, error: n(s) } : { data: u, error: null };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.confirmTopUp = async function (l, o) {
        const { supabase: u, error: s } = t();
        if (s) return { data: null, error: s };
        const { data: c, error: p } = await u.rpc('wallet_topup_confirm', {
          p_amount: Number(l),
          p_reference: String(o ?? '').trim(),
        });
        return p ? { data: null, error: n(p) } : { data: c, error: null };
      }),
      (e.creditEarningsToWallet = async function (l, o, u = {}) {
        const { supabase: s, error: c } = t();
        if (c) return { data: null, error: c };
        const { data: p, error: _ } = await s.rpc('wallet_credit_earnings', {
          p_amount: Number(l),
          p_reference: String(o ?? '').trim(),
          p_meta: u ?? {},
        });
        return _ ? { data: null, error: n(_) } : { data: p, error: null };
      }),
      (e.ensureWallet = l),
      (e.fetchPayoutRequests = async function ({ limit: l = 20 } = {}) {
        const { supabase: o, error: u } = t();
        if (u) return { data: [], error: u };
        const { data: s, error: c } = await o
          .from('payout_requests')
          .select('id, amount, momo_number, status, wallet_tx_id, created_at, updated_at')
          .order('created_at', { ascending: !1 })
          .limit(l);
        if (c)
          return (0, r(d[1]).isMissingTableError)(c)
            ? { data: [], error: null }
            : { data: [], error: n(c) };
        return { data: s ?? [], error: null };
      }),
      (e.fetchWallet = async function () {
        const { supabase: o, error: u } = t();
        if (u) return { data: null, error: u };
        const s = await l();
        if (s.error) return s;
        const { data: c, error: p } = await o
          .from('wallets')
          .select('user_id, balance_ghs, updated_at, created_at')
          .maybeSingle();
        if (p)
          return (0, r(d[1]).isMissingTableError)(p)
            ? { data: { balance_ghs: 0 }, error: null }
            : { data: null, error: n(p) };
        return { data: c ?? s.data ?? { balance_ghs: 0 }, error: null };
      }),
      (e.fetchWalletTransactions = async function ({ limit: l = 30 } = {}) {
        const { supabase: o, error: u } = t();
        if (u) return { data: [], error: u };
        const { data: s, error: c } = await o
          .from('wallet_transactions')
          .select(
            'id, type, amount, direction, status, reference, reservation_id, meta, created_at'
          )
          .order('created_at', { ascending: !1 })
          .limit(l);
        if (c)
          return (0, r(d[1]).isMissingTableError)(c)
            ? { data: [], error: null }
            : { data: [], error: n(c) };
        return { data: s ?? [], error: null };
      }),
      (e.formatWalletTxLabel = function (t, n) {
        const l = t?.meta ?? {},
          o = l.source ?? l.method ?? null,
          u = l.kind ?? null;
        if ('function' == typeof n) {
          if ('mate_earnings' === o) return n('wallet.txEarningMate');
          if ('trotroride_earnings' === o) return n('wallet.txEarningDriver');
          if ('delivery' === o) return n('wallet.txEarningCourier');
          if ('vendor_earnings' === o) return n('wallet.txEarningVendor');
          if (l.delivery_job_id)
            return n('food' === u ? 'wallet.txFoodOrder' : 'wallet.txDeliveryPay');
          const s = t?.type;
          return 'topup' === s
            ? n('wallet.txTopUp')
            : 'trip_pay' === s
              ? n('wallet.txTripPay')
              : 'earning_credit' === s
                ? n('wallet.txEarningCredit')
                : 'cashout' === s
                  ? n('wallet.txCashOut')
                  : 'market' === o
                    ? n('wallet.txMarket')
                    : 'market_pay' === s
                      ? n('wallet.txMarketPay')
                      : 'market_sale' === s
                        ? n('wallet.txMarketSale')
                        : 'refund' === s
                          ? n('wallet.txRefund')
                          : (s ?? n('wallet.txGeneric'));
        }
        if ('mate_earnings' === o) return 'Mate earnings';
        if ('trotroride_earnings' === o) return 'TrotroRide earnings';
        if ('delivery' === o) return 'Delivery earnings';
        if ('vendor_earnings' === o) return 'Trotro Eats sales';
        if (l.delivery_job_id) return 'food' === u ? 'Food order' : 'Delivery payment';
        const s = t?.type;
        return 'topup' === s
          ? 'Top-up'
          : 'trip_pay' === s
            ? 'Trip payment'
            : 'earning_credit' === s
              ? 'Earnings to wallet'
              : 'cashout' === s
                ? 'Cash out'
                : 'market' === o
                  ? 'Marketplace'
                  : 'market_pay' === s
                    ? 'Market purchase'
                    : 'market_sale' === s
                      ? 'Market sale'
                      : 'refund' === s
                        ? 'Refund'
                        : (s ?? 'Transaction');
      }),
      (e.payWithWallet = async function (l, o, u = null) {
        const { supabase: s, error: c } = t();
        if (c) return { data: null, error: c };
        const p = { p_amount: Number(l), p_reservation_id: o };
        u && (p.p_reference = String(u));
        const { data: _, error: f } = await s.rpc('wallet_pay', p);
        return f ? { data: null, error: n(f) } : { data: _, error: null };
      }),
      (e.requestCashOut = async function (l, o) {
        const { supabase: u, error: s } = t();
        if (s) return { data: null, error: s };
        const { data: c, error: p } = await u.rpc('wallet_request_cashout', {
          p_amount: Number(l),
          p_momo_number: String(o ?? '').trim(),
        });
        return p ? { data: null, error: n(p) } : { data: c, error: null };
      }));
  },
  1491,
  [502, 558, 557]
);
__d(
  function (g, r, i, _a, m, e, _d) {
    function a() {
      const a = (0, r(_d[0]).getSupabase)();
      return a
        ? { supabase: a, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function t(a) {
      return a
        ? (0, r(_d[1]).isRpcMissingError)(a) || (0, r(_d[1]).isMissingTableError)(a)
          ? new Error(
              'Delivery is not set up yet. Apply migrations 026_delivery.sql and 027_trotro_eats.sql in Supabase.'
            )
          : new Error((0, r(_d[2]).errorMessage)(a) || 'Delivery request failed')
        : null;
    }
    function n({ distanceKm: a = 5, size: t = 'small' } = {}) {
      return (0, r(_d[3]).calculateParcelDeliveryFare)(a, t);
    }
    function o({
      distanceKm: a = 5,
      itemsSubtotal: t = 0,
      vendorCommissionPercent: n,
      tipGhs: o = 0,
    } = {}) {
      return (0, r(_d[3]).calculateFoodDeliveryFare)(a, t, {
        vendorCommissionPercent: n,
        tipGhs: o,
      });
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.acceptDeliveryJob = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('accept_delivery_job', { p_job_id: n });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.advanceDeliveryJob = async function (n, o) {
        const { supabase: l, error: s } = a();
        if (s) return { data: null, error: s };
        const { data: u, error: d } = await l.rpc('advance_delivery_job', {
          p_job_id: n,
          p_next_status: o,
        });
        return d ? { data: null, error: t(d) } : { data: u, error: null };
      }),
      (e.declineDeliveryJob = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('decline_delivery_job', { p_job_id: n });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.fetchActiveDeliveryForCourier = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        if (!n) return { data: null, error: null };
        const { data: s, error: u } = await o
          .from('delivery_jobs')
          .select('*')
          .eq('assigned_courier_id', n)
          .in('status', ['assigned', 'picked_up', 'in_transit'])
          .order('updated_at', { ascending: !1 })
          .limit(1)
          .maybeSingle();
        if (u)
          return (0, r(_d[1]).isMissingTableError)(u)
            ? { data: null, error: null }
            : { data: null, error: t(u) };
        return { data: s, error: null };
      }),
      (e.fetchCourierEarningsSummary = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: { today: 0, week: 0, count: 0 }, error: l };
        if (!n) return { data: { today: 0, week: 0, count: 0 }, error: null };
        const s = new Date();
        s.setDate(s.getDate() - 7);
        const { data: u, error: d } = await o
          .from('delivery_jobs')
          .select('id, fare_breakdown, delivered_at, status')
          .eq('assigned_courier_id', n)
          .eq('status', 'delivered')
          .gte('delivered_at', s.toISOString());
        if (d)
          return (0, r(_d[1]).isMissingTableError)(d)
            ? { data: { today: 0, week: 0, count: 0 }, error: null }
            : { data: { today: 0, week: 0, count: 0 }, error: t(d) };
        const c = new Date().toISOString().slice(0, 10);
        let p = 0,
          _ = 0;
        return (
          (u ?? []).forEach(a => {
            const t = Number(
              a.fare_breakdown?.courierEarnings ?? a.fare_breakdown?.deliveryFee ?? 0
            );
            ((_ += t), (a.delivered_at ?? '').slice(0, 10) === c && (p += t));
          }),
          {
            data: {
              today: Math.round(100 * p) / 100,
              week: Math.round(100 * _) / 100,
              count: (u ?? []).length,
            },
            error: null,
          }
        );
      }),
      (e.fetchCourierPresence = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        if (!n) return { data: null, error: null };
        const { data: s, error: u } = await o
          .from('delivery_couriers')
          .select('*')
          .eq('user_id', n)
          .maybeSingle();
        if (u)
          return (0, r(_d[1]).isMissingTableError)(u)
            ? { data: null, error: null }
            : { data: null, error: t(u) };
        return { data: s, error: null };
      }),
      (e.fetchDeliveryJob = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        if (!n) return { data: null, error: null };
        const { data: s, error: u } = await o
          .from('delivery_jobs')
          .select('*')
          .eq('id', n)
          .maybeSingle();
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.fetchMenu = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: [], error: l };
        if (!n) return { data: [], error: null };
        const { data: s, error: u } = await o
          .from('delivery_menu_items')
          .select(
            'id, vendor_id, name, description, price_ghs, available, stock_qty, sold_out, tags, photo_url, prep_minutes, category, modifiers'
          )
          .eq('vendor_id', n)
          .eq('available', !0)
          .order('name');
        if (u)
          return (0, r(_d[1]).isMissingTableError)(u)
            ? { data: [], error: null }
            : { data: [], error: t(u) };
        return { data: (s ?? []).filter(a => !a.sold_out), error: null };
      }),
      (e.fetchMyDeliveryJobs = async function (n, { limit: o = 40 } = {}) {
        const { supabase: l, error: s } = a();
        if (s) return { data: [], error: s };
        if (!n) return { data: [], error: null };
        const { data: u, error: d } = await l
          .from('delivery_jobs')
          .select('*')
          .eq('sender_id', n)
          .order('created_at', { ascending: !1 })
          .limit(o);
        if (d)
          return (0, r(_d[1]).isMissingTableError)(d)
            ? { data: [], error: null }
            : { data: [], error: t(d) };
        return { data: u ?? [], error: null };
      }),
      (e.fetchPendingDeliveryForCourier = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        if (!n) return { data: null, error: null };
        const { data: s, error: u } = await o
          .from('delivery_jobs')
          .select('*')
          .eq('assigned_courier_id', n)
          .eq('status', 'assigned')
          .order('created_at', { ascending: !1 })
          .limit(1)
          .maybeSingle();
        if (u)
          return (0, r(_d[1]).isMissingTableError)(u)
            ? { data: null, error: null }
            : { data: null, error: t(u) };
        if (s) return { data: s, error: null };
        const { data: d, error: c } = await o
          .from('delivery_jobs')
          .select('*')
          .eq('kind', 'food')
          .eq('status', 'ready_for_pickup')
          .is('assigned_courier_id', null)
          .order('ready_at', { ascending: !0 })
          .limit(1)
          .maybeSingle();
        if (c)
          return (0, r(_d[1]).isMissingTableError)(c)
            ? { data: null, error: null }
            : { data: null, error: t(c) };
        if (d) return { data: d, error: null };
        const { data: p, error: _ } = await o
          .from('delivery_jobs')
          .select('*')
          .eq('kind', 'parcel')
          .eq('status', 'pending')
          .is('assigned_courier_id', null)
          .order('created_at', { ascending: !0 })
          .limit(1)
          .maybeSingle();
        if (_)
          return (0, r(_d[1]).isMissingTableError)(_)
            ? { data: null, error: null }
            : { data: null, error: t(_) };
        return { data: p, error: null };
      }),
      (e.fetchVendors = async function () {
        const { supabase: n, error: o } = a();
        if (o) return { data: [], error: o };
        const { data: l, error: s } = await n
          .from('delivery_vendors')
          .select(
            'id, name, category, address, latitude, longitude, phone, meta, story, hygiene_badge, food_rating_avg, food_rating_count, prep_minutes_default, is_open, owner_photo_url'
          )
          .eq('is_active', !0)
          .order('name');
        if (s)
          return (0, r(_d[1]).isMissingTableError)(s)
            ? { data: [], error: null }
            : { data: [], error: t(s) };
        return { data: l ?? [], error: null };
      }),
      (e.haversineKm = function (a, t, n, o) {
        if ([a, t, n, o].some(a => null == a || Number.isNaN(Number(a)))) return 5;
        const l = a => (Number(a) * Math.PI) / 180,
          s = l(n - a),
          u = l(o - t),
          d = Math.sin(s / 2) ** 2 + Math.cos(l(a)) * Math.cos(l(n)) * Math.sin(u / 2) ** 2;
        return Math.round(12742 * Math.asin(Math.sqrt(d)) * 100) / 100;
      }),
      (e.markDeliveryPaidMomo = async function (n, o) {
        const { supabase: l, error: s } = a();
        if (s) return { data: null, error: s };
        const { data: u, error: d } = await l
          .from('delivery_jobs')
          .update({
            payment_method: 'momo',
            payment_status: 'paid',
            payment_reference: o,
            updated_at: new Date().toISOString(),
          })
          .eq('id', n)
          .select()
          .single();
        return d ? { data: null, error: t(d) } : { data: u, error: null };
      }),
      (e.payDeliveryWithWallet = async function (n) {
        const { supabase: o, error: l } = a();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('pay_delivery_with_wallet', { p_job_id: n });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.quoteFood = o),
      (e.quoteParcel = n),
      (e.requestFoodOrder = async function (n) {
        const { supabase: l, error: s } = a();
        if (s) return { data: null, error: s };
        const u = n.orderItems ?? [],
          d = u.reduce((a, t) => a + Number(t.price_ghs ?? t.price ?? 0) * Number(t.qty ?? 1), 0),
          c = n.fareBreakdown ?? o({ distanceKm: n.distanceKm, itemsSubtotal: d }),
          { data: p, error: _ } = await l.rpc('request_delivery_job', {
            p_kind: 'food',
            p_pickup: n.pickup,
            p_dropoff: n.dropoff,
            p_pickup_lat: n.pickupLat ?? null,
            p_pickup_lng: n.pickupLng ?? null,
            p_dropoff_lat: n.dropoffLat ?? null,
            p_dropoff_lng: n.dropoffLng ?? null,
            p_size: 'small',
            p_notes: n.notes ?? null,
            p_recipient_phone: n.recipientPhone ?? null,
            p_vendor_id: n.vendorId ?? null,
            p_order_items: u,
            p_fare_breakdown: c,
            p_payment_method: n.paymentMethod ?? 'cash',
            p_distance_km: c.distanceKm ?? n.distanceKm ?? null,
          });
        return _ ? { data: null, error: t(_) } : { data: p, error: null };
      }),
      (e.requestParcel = async function (o) {
        const { supabase: l, error: s } = a();
        if (s) return { data: null, error: s };
        const u = o.fareBreakdown ?? n({ distanceKm: o.distanceKm, size: o.size }),
          { data: d, error: c } = await l.rpc('request_delivery_job', {
            p_kind: 'parcel',
            p_pickup: o.pickup,
            p_dropoff: o.dropoff,
            p_pickup_lat: o.pickupLat ?? null,
            p_pickup_lng: o.pickupLng ?? null,
            p_dropoff_lat: o.dropoffLat ?? null,
            p_dropoff_lng: o.dropoffLng ?? null,
            p_size: o.size ?? 'small',
            p_notes: o.notes ?? null,
            p_recipient_phone: o.recipientPhone ?? null,
            p_vendor_id: null,
            p_order_items: [],
            p_fare_breakdown: u,
            p_payment_method: o.paymentMethod ?? 'cash',
            p_distance_km: u.distanceKm ?? o.distanceKm ?? null,
          });
        return c ? { data: null, error: t(c) } : { data: d, error: null };
      }),
      (e.setCourierPresence = async function ({
        status: n,
        latitude: o,
        longitude: l,
        corridor: s,
        vehicleKind: u,
        acceptsParcels: d = !0,
        acceptsFood: c = !0,
      } = {}) {
        const { supabase: p, error: _ } = a();
        if (_) return { data: null, error: _ };
        const { data: f, error: b } = await p.rpc('set_delivery_courier_presence', {
          p_status: n,
          p_latitude: o ?? null,
          p_longitude: l ?? null,
          p_corridor: s ?? null,
          p_vehicle_kind: u ?? null,
          p_accepts_parcels: d,
          p_accepts_food: c,
        });
        return b ? { data: null, error: t(b) } : { data: f, error: null };
      }),
      (e.subscribeDeliveryJob = function (t, n) {
        const { supabase: o } = a();
        if (!o || !t) return () => {};
        const l = o
          .channel(`delivery-job-${t}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'delivery_jobs', filter: `id=eq.${t}` },
            a => n?.(a)
          )
          .subscribe();
        return () => {
          o.removeChannel(l);
        };
      }),
      (e.subscribeDeliveryJobsForCourier = function (t, n) {
        const { supabase: o } = a();
        if (!o || !t) return () => {};
        const l = o
          .channel(`delivery-courier-${t}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'delivery_jobs',
              filter: `assigned_courier_id=eq.${t}`,
            },
            a => n?.(a)
          )
          .subscribe();
        return () => {
          o.removeChannel(l);
        };
      }));
  },
  1492,
  [502, 558, 557, 756]
);
__d(
  function (g, r, i, a, m, e, d) {
    Object.defineProperty(e, '__esModule', { value: !0 });
    var t = {
      PermissionStatus: !0,
      EventEmitter: !0,
      _getCurrentWatchId: !0,
      installWebGeolocationPolyfill: !0,
      Accuracy: !0,
      ActivityType: !0,
      GeofencingEventType: !0,
      GeofencingRegionState: !0,
    };
    (Object.defineProperty(e, 'Accuracy', {
      enumerable: !0,
      get: function () {
        return r(d[0]).LocationAccuracy;
      },
    }),
      Object.defineProperty(e, 'ActivityType', {
        enumerable: !0,
        get: function () {
          return r(d[0]).LocationActivityType;
        },
      }),
      Object.defineProperty(e, 'EventEmitter', {
        enumerable: !0,
        get: function () {
          return r(d[1]).LocationEventEmitter;
        },
      }),
      Object.defineProperty(e, 'GeofencingEventType', {
        enumerable: !0,
        get: function () {
          return r(d[0]).LocationGeofencingEventType;
        },
      }),
      Object.defineProperty(e, 'GeofencingRegionState', {
        enumerable: !0,
        get: function () {
          return r(d[0]).LocationGeofencingRegionState;
        },
      }),
      Object.defineProperty(e, 'PermissionStatus', {
        enumerable: !0,
        get: function () {
          return r(d[2]).PermissionStatus;
        },
      }),
      Object.defineProperty(e, '_getCurrentWatchId', {
        enumerable: !0,
        get: function () {
          return r(d[3])._getCurrentWatchId;
        },
      }),
      Object.defineProperty(e, 'installWebGeolocationPolyfill', {
        enumerable: !0,
        get: function () {
          return r(d[4]).installWebGeolocationPolyfill;
        },
      }),
      Object.keys(r(d[5])).forEach(function (n) {
        'default' !== n &&
          '__esModule' !== n &&
          (Object.prototype.hasOwnProperty.call(t, n) ||
            (n in e && e[n] === r(d[5])[n]) ||
            Object.defineProperty(e, n, {
              enumerable: !0,
              get: function () {
                return r(d[5])[n];
              },
            }));
      }),
      Object.keys(r(d[0])).forEach(function (n) {
        'default' !== n &&
          '__esModule' !== n &&
          (Object.prototype.hasOwnProperty.call(t, n) ||
            (n in e && e[n] === r(d[0])[n]) ||
            Object.defineProperty(e, n, {
              enumerable: !0,
              get: function () {
                return r(d[0])[n];
              },
            }));
      }));
  },
  1493,
  [1494, 1495, 339, 1496, 1498, 1499]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n, t, o, c;
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.LocationGeofencingRegionState =
        e.LocationGeofencingEventType =
        e.LocationActivityType =
        e.LocationAccuracy =
          void 0),
      (function (n) {
        ((n[(n.Lowest = 1)] = 'Lowest'),
          (n[(n.Low = 2)] = 'Low'),
          (n[(n.Balanced = 3)] = 'Balanced'),
          (n[(n.High = 4)] = 'High'),
          (n[(n.Highest = 5)] = 'Highest'),
          (n[(n.BestForNavigation = 6)] = 'BestForNavigation'));
      })(n || (e.LocationAccuracy = n = {})),
      (function (n) {
        ((n[(n.Other = 1)] = 'Other'),
          (n[(n.AutomotiveNavigation = 2)] = 'AutomotiveNavigation'),
          (n[(n.Fitness = 3)] = 'Fitness'),
          (n[(n.OtherNavigation = 4)] = 'OtherNavigation'),
          (n[(n.Airborne = 5)] = 'Airborne'));
      })(t || (e.LocationActivityType = t = {})),
      (function (n) {
        ((n[(n.Enter = 1)] = 'Enter'), (n[(n.Exit = 2)] = 'Exit'));
      })(o || (e.LocationGeofencingEventType = o = {})),
      (function (n) {
        ((n[(n.Unknown = 0)] = 'Unknown'),
          (n[(n.Inside = 1)] = 'Inside'),
          (n[(n.Outside = 2)] = 'Outside'));
      })(c || (e.LocationGeofencingRegionState = c = {})));
  },
  1494,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.LocationEventEmitter = void 0));
    e.LocationEventEmitter = new (r(d[0]).EventEmitter)();
  },
  1495,
  [339]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.LocationSubscriber = e.LocationErrorSubscriber = e.HeadingSubscriber = void 0),
      (e._getCurrentWatchId = function () {
        return c;
      }));
    var n = t(r(d[1]));
    let c = 0;
    class s {
      callbacks = {};
      eventSubscription = null;
      constructor(t, n) {
        ((this.eventName = t), (this.eventDataField = n));
      }
      maybeInitializeSubscription() {
        this.eventSubscription ||
          (this.eventSubscription = r(d[2]).LocationEventEmitter.addListener(this.eventName, t =>
            this.trigger(t)
          ));
      }
      registerCallback(t) {
        this.maybeInitializeSubscription();
        const n = ++c;
        return ((this.callbacks[n] = t), n);
      }
      registerCallbackForId(t, n) {
        this.maybeInitializeSubscription();
        const c = t;
        return ((this.callbacks[c] = n), c);
      }
      unregisterCallback(t) {
        this.callbacks[t] &&
          (delete this.callbacks[t],
          n.default.removeWatchAsync(t),
          0 === Object.keys(this.callbacks).length &&
            this.eventSubscription &&
            (r(d[2]).LocationEventEmitter.removeSubscription(this.eventSubscription),
            (this.eventSubscription = null)));
      }
      trigger(t) {
        const c = t.watchId,
          s = this.callbacks[c];
        s ? s(t[this.eventDataField]) : n.default.removeWatchAsync(c);
      }
    }
    ((e.LocationSubscriber = new s('Expo.locationChanged', 'location')),
      (e.HeadingSubscriber = new s('Expo.headingChanged', 'heading')),
      (e.LocationErrorSubscriber = new s('Expo.locationError', 'reason')));
  },
  1496,
  [1, 1497, 1495]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    class n extends Error {
      constructor() {
        (super('Geocoder service is not available for this device.'),
          (this.code = 'E_NO_GEOCODER'));
      }
    }
    function t(n) {
      const { coords: t, timestamp: s } = n;
      return {
        coords: {
          latitude: t.latitude,
          longitude: t.longitude,
          altitude: t.altitude,
          accuracy: t.accuracy,
          altitudeAccuracy: t.altitudeAccuracy,
          heading: t.heading,
          speed: t.speed,
        },
        timestamp: s,
      };
    }
    function s(n, t) {
      const s = 'number' == typeof t.maxAge ? t.maxAge : 1 / 0,
        o = 'number' == typeof t.requiredAccuracy ? t.requiredAccuracy : 1 / 0,
        c = n.coords.accuracy ?? 1 / 0;
      return Date.now() - n.timestamp <= s && c <= o;
    }
    async function o(n = !1) {
      if (!navigator?.permissions?.query)
        throw new (r(d[0]).UnavailabilityError)(
          'expo-location',
          'navigator.permissions API is not available'
        );
      const t = await navigator.permissions.query({ name: 'geolocation' });
      return 'granted' === t.state
        ? { status: r(d[0]).PermissionStatus.GRANTED, granted: !0, canAskAgain: !0, expires: 0 }
        : 'denied' === t.state
          ? { status: r(d[0]).PermissionStatus.DENIED, granted: !1, canAskAgain: !0, expires: 0 }
          : n
            ? new Promise(n => {
                navigator.geolocation.getCurrentPosition(
                  () => {
                    n({
                      status: r(d[0]).PermissionStatus.GRANTED,
                      granted: !0,
                      canAskAgain: !0,
                      expires: 0,
                    });
                  },
                  t => {
                    t.code !== t.PERMISSION_DENIED
                      ? n({
                          status: r(d[0]).PermissionStatus.GRANTED,
                          granted: !1,
                          canAskAgain: !0,
                          expires: 0,
                        })
                      : n({
                          status: r(d[0]).PermissionStatus.DENIED,
                          granted: !1,
                          canAskAgain: !0,
                          expires: 0,
                        });
                  }
                );
              })
            : {
                status: r(d[0]).PermissionStatus.UNDETERMINED,
                granted: !1,
                canAskAgain: !0,
                expires: 0,
              };
    }
    let c = null;
    e.default = {
      getProviderStatusAsync: async () => ({ locationServicesEnabled: 'geolocation' in navigator }),
      getLastKnownPositionAsync: async (n = {}) => (c && s(c, n) ? c : null),
      getCurrentPositionAsync: async n =>
        new Promise((s, o) => {
          navigator.geolocation.getCurrentPosition(
            n => {
              ((c = t(n)), s(c));
            },
            o,
            Object.assign(
              {
                maximumAge: 1 / 0,
                enableHighAccuracy: (n.accuracy ?? 0) > r(d[1]).LocationAccuracy.Balanced,
              },
              n
            )
          );
        }),
      async removeWatchAsync(n) {
        navigator.geolocation.clearWatch(n);
      },
      async watchDeviceHeading(n) {
        console.warn('Location.watchDeviceHeading: is not supported on web');
      },
      hasServicesEnabledAsync: async () => 'geolocation' in navigator,
      async geocodeAsync() {
        throw new n();
      },
      async reverseGeocodeAsync() {
        throw new n();
      },
      watchPositionImplAsync: async (n, s) =>
        new Promise(o => {
          o(
            (n = navigator.geolocation.watchPosition(
              s => {
                ((c = t(s)),
                  r(d[2]).LocationEventEmitter.emit('Expo.locationChanged', {
                    watchId: n,
                    location: c,
                  }));
              },
              void 0,
              s
            ))
          );
        }),
      requestForegroundPermissionsAsync: async () => o(!0),
      requestBackgroundPermissionsAsync: async () => o(!0),
      getForegroundPermissionsAsync: async () => o(),
      getBackgroundPermissionsAsync: async () => o(),
    };
  },
  1497,
  [339, 1494, 1495]
);
__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.installWebGeolocationPolyfill = function () {}));
    l(r(d[1]));
  },
  1498,
  [1, 1497]
);
__d(
  function (g, r, i, a, m, _e, d) {
    var n = r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.enableNetworkProviderAsync = async function () {}),
      (_e.geocodeAsync = async function (n) {
        if ('string' != typeof n)
          throw new TypeError(`Address to geocode must be a string. Got ${n} instead.`);
        return [];
      }),
      (_e.getBackgroundPermissionsAsync = y),
      (_e.getCurrentPositionAsync = async function (n = {}) {
        return e.default.getCurrentPositionAsync(n);
      }),
      (_e.getForegroundPermissionsAsync = c),
      (_e.getHeadingAsync = async function () {
        return new Promise(async (n, e) => {
          let t,
            o = 0;
          try {
            t = await s(
              e => {
                e.accuracy > 1 || o > 5 ? (t?.remove(), n(e)) : (o += 1);
              },
              n => {
                (t?.remove(), e(n));
              }
            );
          } catch (n) {
            e(n);
          }
        });
      }),
      (_e.getLastKnownPositionAsync = async function (n = {}) {
        return e.default.getLastKnownPositionAsync(n);
      }),
      (_e.getProviderStatusAsync = o),
      (_e.hasServicesEnabledAsync = async function () {
        return await e.default.hasServicesEnabledAsync();
      }),
      (_e.hasStartedGeofencingAsync = async function (n) {
        return (f(n), e.default.hasStartedGeofencingAsync(n));
      }),
      (_e.hasStartedLocationUpdatesAsync = async function (n) {
        return (f(n), e.default.hasStartedLocationUpdatesAsync(n));
      }),
      (_e.isBackgroundLocationAvailableAsync = async function () {
        return (await o()).backgroundModeEnabled;
      }),
      (_e.requestBackgroundPermissionsAsync = l),
      (_e.requestForegroundPermissionsAsync = u),
      (_e.reverseGeocodeAsync = async function (n) {
        if ('number' != typeof n.latitude || 'number' != typeof n.longitude)
          throw new TypeError(
            'Location to reverse-geocode must be an object with number properties `latitude` and `longitude`.'
          );
        return [];
      }),
      (_e.startGeofencingAsync = async function (n, t = []) {
        (f(n), b(t), await e.default.startGeofencingAsync(n, { regions: t }));
      }),
      (_e.startLocationUpdatesAsync = async function (
        n,
        t = { accuracy: r(d[5]).LocationAccuracy.Balanced }
      ) {
        (f(n), await e.default.startLocationUpdatesAsync(n, t));
      }),
      (_e.stopGeofencingAsync = async function (n) {
        (f(n), await e.default.stopGeofencingAsync(n));
      }),
      (_e.stopLocationUpdatesAsync = async function (n) {
        (f(n), await e.default.stopLocationUpdatesAsync(n));
      }),
      (_e.useForegroundPermissions = _e.useBackgroundPermissions = void 0),
      (_e.watchHeadingAsync = s),
      (_e.watchPositionAsync = async function (n, t, o) {
        const s = r(d[2]).LocationSubscriber.registerCallback(t);
        return (
          o && r(d[2]).LocationErrorSubscriber.registerCallbackForId(s, o),
          await e.default.watchPositionImplAsync(s, n),
          {
            remove() {
              (r(d[2]).LocationSubscriber.unregisterCallback(s),
                o && r(d[2]).LocationErrorSubscriber.unregisterCallback(s));
            },
          }
        );
      }));
    var e = n(r(d[1]));
    let t = !1;
    async function o() {
      return e.default.getProviderStatusAsync();
    }
    async function s(n, t) {
      const o = r(d[2]).HeadingSubscriber.registerCallback(n);
      return (
        t && r(d[2]).LocationErrorSubscriber.registerCallbackForId(o, t),
        await e.default.watchDeviceHeading(o),
        {
          remove() {
            (r(d[2]).HeadingSubscriber.unregisterCallback(o),
              t && r(d[2]).LocationErrorSubscriber.unregisterCallback(o));
          },
        }
      );
    }
    async function c() {
      return await e.default.getForegroundPermissionsAsync();
    }
    async function u() {
      return await e.default.requestForegroundPermissionsAsync();
    }
    _e.useForegroundPermissions = (0, r(d[3]).createPermissionHook)({
      getMethod: c,
      requestMethod: u,
    });
    async function y() {
      return await e.default.getBackgroundPermissionsAsync();
    }
    async function l() {
      return await e.default.requestBackgroundPermissionsAsync();
    }
    _e.useBackgroundPermissions = (0, r(d[3]).createPermissionHook)({
      getMethod: y,
      requestMethod: l,
    });
    function f(n) {
      if (!n || 'string' != typeof n)
        throw new Error(`\`taskName\` must be a non-empty string. Got ${n} instead.`);
      if ((0, r(d[4]).isRunningInExpoGo)() && !t) {
        const n =
          'Background location is limited in Expo Go:\nOn Android, it is not available at all.\nOn iOS, it works when running in the Simulator.\nYou can use this API, and all others, in a development build. Learn more: https://expo.fyi/dev-client.';
        (console.warn(n), (t = !0));
      }
    }
    function b(n) {
      if (!n || 0 === n.length)
        throw new Error(
          'Regions array cannot be empty. Use `stopGeofencingAsync` if you want to stop geofencing all regions'
        );
      for (const e of n) {
        if ('number' != typeof e.latitude)
          throw new TypeError(`Region's latitude must be a number. Got '${e.latitude}' instead.`);
        if ('number' != typeof e.longitude)
          throw new TypeError(`Region's longitude must be a number. Got '${e.longitude}' instead.`);
        if ('number' != typeof e.radius)
          throw new TypeError(`Region's radius must be a number. Got '${e.radius}' instead.`);
      }
    }
  },
  1499,
  [1, 1497, 1496, 339, 901, 1494]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.createIncomingRequestDeadline = function (n) {
        return Date.now() + 1e3 * Math.max(1, Number(n) || 1);
      }),
      (e.hasIncomingDeadlineElapsed = function (n) {
        return !n || Date.now() >= n;
      }),
      (e.secondsUntilIncomingDeadline = function (n) {
        return n ? Math.max(0, Math.ceil((n - Date.now()) / 1e3)) : 0;
      }));
  },
  1500,
  []
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var t = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.getCurrentPosition = async function () {
        if (!(await s())) return { data: null, error: new Error('Location permission denied') };
        try {
          return {
            data: await e.getCurrentPositionAsync({ accuracy: e.Accuracy.Balanced }),
            error: null,
          };
        } catch (t) {
          return { data: null, error: t };
        }
      }),
      (_e.isGpsBroadcasting = function () {
        return c.isTracking();
      }),
      (_e.locationService = void 0),
      (_e.requestLocationPermission = s),
      (_e.startGpsBroadcast = async function (t) {
        try {
          return (
            await c.requestPermissions(),
            c.watchSubscription && c.watchSubscription.remove(),
            (c.onLocationUpdate = e => {
              t?.({
                coords: {
                  latitude: e.latitude,
                  longitude: e.longitude,
                  speed: e.speed_kmh / 3.6,
                  heading: e.heading,
                  accuracy: e.accuracy,
                },
              });
            }),
            (c.watchSubscription = await e.watchPositionAsync(
              { accuracy: e.Accuracy.Balanced, distanceInterval: 10, timeInterval: 5e3 },
              t => {
                c.onLocationUpdate?.({
                  mate_id: c.currentMateId,
                  trip_id: c.currentTripId,
                  route: '',
                  latitude: t.coords.latitude,
                  longitude: t.coords.longitude,
                  accuracy: t.coords.accuracy || 10,
                  speed_kmh: 3.6 * (t.coords.speed || 0),
                  heading: t.coords.heading || 0,
                  timestamp: new Date().toISOString(),
                });
              }
            )),
            { data: { broadcasting: !0 }, error: null }
          );
        } catch (t) {
          return { data: null, error: t };
        }
      }),
      (_e.stopGpsBroadcast = function () {
        c.watchSubscription && (c.watchSubscription.remove(), (c.watchSubscription = null));
        c.flushTimer && (clearTimeout(c.flushTimer), (c.flushTimer = null));
        c.onLocationUpdate = null;
      }));
    var e = (function (t, e) {
        if ('function' == typeof WeakMap)
          var i = new WeakMap(),
            r = new WeakMap();
        return (function (t, e) {
          if (!e && t && t.__esModule) return t;
          var n,
            c,
            s = { __proto__: null, default: t };
          if (null === t || ('object' != typeof t && 'function' != typeof t)) return s;
          if ((n = e ? r : i)) {
            if (n.has(t)) return n.get(t);
            n.set(t, s);
          }
          for (const e in t)
            'default' !== e &&
              {}.hasOwnProperty.call(t, e) &&
              ((c = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(t, e)) &&
              (c.get || c.set)
                ? n(s, e, c)
                : (s[e] = t[e]));
          return s;
        })(t, e);
      })(_r(d[1])),
      i = t(_r(d[2]));
    const r = '@trotroos/location_batch';
    function n(t) {
      if (!t) return !1;
      const e = String(t);
      return (
        !(e.startsWith('local-') || e.startsWith('trip-') || e.startsWith('tr-online-')) &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)
      );
    }
    const c = (_e.locationService = new (class {
      constructor() {
        ((this.watchSubscription = null),
          (this.batch = []),
          (this.flushTimer = null),
          (this.currentTripId = null),
          (this.currentMateId = null),
          (this.onLocationUpdate = null));
      }
      async requestPermissions() {
        const { status: t } = await e.requestForegroundPermissionsAsync();
        if ('granted' !== t) throw new Error('Location permission denied');
        return t;
      }
      async startTracking(t, i, r, n) {
        ((this.currentTripId = i),
          (this.currentMateId = t),
          (this.onLocationUpdate = n ?? null),
          await this.requestPermissions(),
          await this.processOfflineQueue(),
          this.watchSubscription &&
            (this.watchSubscription.remove(), (this.watchSubscription = null)),
          (this.watchSubscription = await e.watchPositionAsync(
            { accuracy: e.Accuracy.BestForNavigation, timeInterval: 2e3, distanceInterval: 5 },
            e => {
              const n = {
                mate_id: t,
                trip_id: i,
                route: r,
                latitude: e.coords.latitude,
                longitude: e.coords.longitude,
                accuracy: e.coords.accuracy || 10,
                speed_kmh: 3.6 * (e.coords.speed || 0),
                heading: e.coords.heading || 0,
                timestamp: new Date().toISOString(),
              };
              (this.onLocationUpdate && this.onLocationUpdate(n), this.addToBatch(n));
            }
          )));
      }
      addToBatch(t) {
        (this.batch.push(t),
          this.flushTimer || (this.flushTimer = setTimeout(() => this.flushBatch(), 5e3)));
      }
      async flushBatch() {
        if (0 === this.batch.length) return void (this.flushTimer = null);
        const t = [...this.batch];
        ((this.batch = []), (this.flushTimer = null));
        const e = t[t.length - 1];
        if (!n(e.trip_id)) return;
        const i = (0, _r(d[3]).getSupabase)();
        if (i)
          try {
            const { error: t } = await i
              .from('driver_locations')
              .upsert(
                {
                  mate_id: e.mate_id,
                  trip_id: e.trip_id,
                  route: e.route,
                  latitude: e.latitude,
                  longitude: e.longitude,
                  heading: e.heading,
                  speed_kmh: e.speed_kmh,
                  accuracy_meters: e.accuracy,
                  updated_at: e.timestamp,
                },
                { onConflict: 'mate_id' }
              );
            if (t) throw t;
          } catch (e) {
            await this.cacheBatch(t);
          }
        else await this.cacheBatch(t);
      }
      async cacheBatch(t) {
        try {
          const e = JSON.parse((await i.default.getItem(r)) || '[]');
          (e.push(...t), await i.default.setItem(r, JSON.stringify(e)));
        } catch (t) {}
      }
      async stopTracking(t) {
        (this.flushTimer && (clearTimeout(this.flushTimer), (this.flushTimer = null)),
          this.watchSubscription &&
            (this.watchSubscription.remove(), (this.watchSubscription = null)),
          await this.flushBatch());
        const e = (0, _r(d[3]).getSupabase)();
        if (e && t)
          try {
            await e.from('driver_locations').delete().eq('mate_id', t);
          } catch (t) {}
        ((this.currentTripId = null), (this.currentMateId = null), (this.onLocationUpdate = null));
      }
      async processOfflineQueue() {
        const t = (0, _r(d[3]).getSupabase)();
        if (t)
          try {
            const e = JSON.parse((await i.default.getItem(r)) || '[]');
            if (0 === e.length) return;
            const c = e[e.length - 1];
            if (!n(c.trip_id)) return void (await i.default.removeItem(r));
            const { error: s } = await t
              .from('driver_locations')
              .upsert(
                {
                  mate_id: c.mate_id,
                  trip_id: c.trip_id,
                  route: c.route,
                  latitude: c.latitude,
                  longitude: c.longitude,
                  heading: c.heading,
                  speed_kmh: c.speed_kmh,
                  accuracy_meters: c.accuracy,
                  updated_at: c.timestamp,
                },
                { onConflict: 'mate_id' }
              );
            if (s) throw s;
            await i.default.removeItem(r);
          } catch (t) {}
      }
      isTracking() {
        return null !== this.watchSubscription;
      }
    })());
    async function s() {
      try {
        return (await c.requestPermissions(), !0);
      } catch {
        return !1;
      }
    }
  },
  1501,
  [1, 1493, 503, 502]
);
__d(
  function (g, r, i, _a, m, e, d) {
    function t(t) {
      return t >= r(d[0]).QUEUE_DEMAND_HIGH
        ? 'high'
        : t >= r(d[0]).QUEUE_DEMAND_MEDIUM
          ? 'medium'
          : 'low';
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.demandLevelFromCount = t),
      (e.formatRelativeUpdated = function (t) {
        if (!t) return 'Updating\u2026';
        const n = Date.now() - t;
        if (n < 1e4) return 'Updated just now';
        if (n < 6e4) return `Updated ${Math.max(1, Math.floor(n / 1e3))}s ago`;
        const o = Math.floor(n / 6e4);
        return o < 60 ? `Updated ${o}m ago` : `Updated ${Math.floor(o / 60)}h ago`;
      }),
      (e.formatWaitDuration = function (t) {
        if (!t) return null;
        const n = Date.now() - new Date(t).getTime();
        if (n < 6e4) return 'Just joined';
        const o = Math.max(1, Math.floor(n / 6e4));
        if (o < 60) return `${o} min waiting`;
        const a = Math.floor(o / 60),
          u = o % 60;
        return u > 0 ? `${a}h ${u}m waiting` : `${a}h waiting`;
      }),
      (e.mapDemandRoutesFromRows = function (n) {
        const o = Date.now(),
          a = {};
        return (
          (n ?? []).forEach(t => {
            const n = String(t.origin ?? '').trim(),
              u = String(t.destination ?? '').trim();
            if (!n || !u) return;
            const c = `${n}\u2192${u}`;
            (a[c] ||
              (a[c] = { origin: n, destination: u, count: 0, recentJoins: 0, longestWaitMin: 0 }),
              (a[c].count += 1));
            const s = t.created_at ? new Date(t.created_at).getTime() : o;
            o - s <= r(d[0]).QUEUE_RECENT_WINDOW_MS && (a[c].recentJoins += 1);
            const l = Math.max(0, Math.floor((o - s) / 6e4));
            a[c].longestWaitMin = Math.max(a[c].longestWaitMin, l);
          }),
          Object.values(a)
            .sort((t, n) => n.count - t.count)
            .slice(0, 8)
            .map((n, o) => ({
              id: `demand-${n.origin}-${n.destination}-${o}`,
              route: `${n.origin} \u2192 ${n.destination}`,
              origin: n.origin,
              destination: n.destination,
              waiting: n.count,
              level: t(n.count),
              recentJoins: n.recentJoins,
              longestWaitMin: n.longestWaitMin,
            }))
        );
      }),
      (e.summarizeQueueActivity = function (t) {
        const n = t.reduce((t, n) => t + (n.waiting ?? 0), 0),
          o = t.reduce((t, n) => t + (n.recentJoins ?? 0), 0),
          a = t.filter(t => 'high' === t.level).length,
          u = t[0]?.route ?? '\u2014',
          c = Math.max(...t.map(t => t.waiting ?? 0), 1);
        return { totalWaiting: n, recentJoins: o, highPriority: a, topRoute: u, maxWaiting: c };
      }));
  },
  1502,
  [938]
);
__d(
  function (g, _r, i, a, m, e, d) {
    function t() {
      const t = (0, _r(d[0]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function r(t, r) {
      return { origin: String(t ?? '').trim(), destination: String(r ?? '').trim() };
    }
    async function n(t, r, n, s = null) {
      const { data: u } = await c(t, r),
        o = u ?? [],
        l = o.findIndex(t => t.passenger_id === n),
        f = l >= 0 ? l + 1 : Math.max(1, o.length + 1);
      return null != s ? (0, _r(d[1]).applyTrustQueueBoost)(f, s) : f;
    }
    async function s(t, r) {
      if (t && r)
        try {
          await t
            .from('waiting_queues')
            .update({ status: 'cancelled' })
            .eq('passenger_id', r)
            .in('status', ['waiting', 'invited']);
        } catch {}
    }
    async function u(t, r, n, s, u = {}) {
      const o = Object.assign(
        { passenger_id: r, origin: n, destination: s, status: 'waiting' },
        u.scheduledFor ? { scheduled_for: u.scheduledFor } : {},
        u.transportMode ? { transport_mode: u.transportMode } : {},
        u.notes ? { notes: u.notes } : {},
        u.requestKind ? { request_kind: u.requestKind } : {}
      );
      let { data: l, error: c } = await t.from('waiting_queues').insert(o).select().single();
      if (
        c &&
        ((0, _r(d[2]).isMissingTableError)(c) ||
          (0, _r(d[2]).isRlsError)(c) ||
          (0, _r(d[2]).isMissingColumnError)(c))
      ) {
        const u = { passenger_id: r, origin: n, destination: s, status: 'waiting' };
        ({ data: l, error: c } = await t.from('waiting_queues').insert(u).select().single());
      }
      return { data: l, error: c };
    }
    async function o(t, r, n, o, l = {}) {
      const c = {
          p_origin: n,
          p_destination: o,
          p_transport_mode: l.transportMode ?? null,
          p_notes: l.notes ?? null,
          p_request_kind: l.requestKind ?? 'queue',
          p_scheduled_for: l.scheduledFor ?? null,
        },
        { data: f, error: p } = await t.rpc('join_waiting_queue', c);
      return !p && f
        ? { data: f, error: null }
        : !p || (0, _r(d[2]).isRpcMissingError)(p) || (0, _r(d[2]).isMissingTableError)(p)
          ? (await s(t, r), u(t, r, n, o, l))
          : { data: null, error: p };
    }
    async function l(s, u = null, o = null, l = null) {
      if (!s) return { data: null, error: null };
      const { origin: f, destination: p } = r(u, o),
        w = await (0, _r(d[3]).getLocalActiveQueues)(s, f || null, p || null);
      let _ = null,
        h = !1;
      const { supabase: b, error: q } = t();
      if (b)
        try {
          let t = b
            .from('waiting_queues')
            .select('*')
            .eq('passenger_id', s)
            .in('status', ['waiting', 'invited'])
            .order('created_at', { ascending: !1 })
            .limit(1);
          (f && (t = t.eq('origin', f)), p && (t = t.eq('destination', p)));
          const { data: r, error: n } = await t;
          n || ((h = !0), r?.length && (_ = r[0]));
        } catch {}
      else if (q && 0 === w.length) return { data: null, error: q };
      if (h && !_)
        return (
          await (0, _r(d[3]).cancelAllLocalWaitingQueues)(s).catch(() => {}),
          { data: null, error: null }
        );
      const y = _ ?? w[0] ?? null;
      if (!y) return { data: null, error: null };
      const v = await n(y.origin, y.destination, s, l),
        { data: E } = await c(y.origin, y.destination),
        M = E?.length ?? 0,
        Q = Math.max(0, M - 1),
        T = y.created_at
          ? Math.max(0, Math.floor((Date.now() - new Date(y.created_at).getTime()) / 6e4))
          : null;
      return {
        data: Object.assign(
          {},
          (0, _r(d[8]).queueToMyTrip)(
            Object.assign({}, y, {
              queue_position: v,
              transport_mode: y.transport_mode ?? y.transportMode,
            })
          ),
          { othersWaiting: Q, waitMinutes: T, waitingOnRoute: M }
        ),
        error: null,
      };
    }
    async function c(r, n) {
      const { supabase: s, error: u } = t();
      if (u) return { data: [], error: u };
      const o = async t => {
        let u = s
          .from('waiting_queues')
          .select(t ? '*, profiles:passenger_id(full_name, phone_number)' : '*')
          .in('status', ['waiting', 'invited'])
          .order('created_at', { ascending: !0 })
          .limit(20);
        return (
          r && (u = u.ilike('origin', `%${r}%`)),
          n && (u = u.ilike('destination', `%${n}%`)),
          u
        );
      };
      try {
        let { data: t, error: r } = await o(!0);
        return (
          r &&
            ((0, _r(d[2]).isMissingTableError)(r) || (0, _r(d[2]).isRelationshipSelectError)(r)) &&
            ({ data: t, error: r } = await o(!1)),
          r && (0, _r(d[2]).isMissingTableError)(r)
            ? { data: [], error: null }
            : { data: (0, _r(d[5]).filterVisibleQueueRows)(t ?? []), error: r }
        );
      } catch {
        return { data: [], error: null };
      }
    }
    async function f() {
      const { supabase: r, error: n } = t();
      if (n) return { data: [], error: n };
      try {
        const { data: t, error: n } = await r
          .from('waiting_queues')
          .select('origin, destination, created_at')
          .eq('status', 'waiting');
        return n && (0, _r(d[2]).isMissingTableError)(n)
          ? { data: [], error: null }
          : n
            ? { data: [], error: n }
            : {
                data: (0, _r(d[9], '../utils/queueActivity').mapDemandRoutesFromRows)(t),
                error: null,
              };
      } catch {
        return { data: [], error: null };
      }
    }
    function p(t) {
      const r = String(t ?? '').trim();
      if (!r) return !1;
      if (r.startsWith('queue-') || r.startsWith('w-') || r.startsWith('demo-')) return !0;
      if (/^w\d+$/i.test(r)) return !0;
      return !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(r);
    }
    function w(t, r) {
      return { data: { id: t, status: 'invited', passenger_id: r }, error: null };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.cancelQueueEntry = async function (r, n) {
        if (!r || !n) return { data: null, error: new Error('Missing queue entry') };
        if (String(r).startsWith('queue-')) {
          const t = await (0, _r(d[3]).cancelLocalQueue)(r, n);
          return (t.error || (await (0, _r(d[4]).invalidatePassengerTripsCache)(n)), t);
        }
        const { supabase: s, error: u } = t();
        let o = !1;
        if (s) {
          const { error: t } = await s
            .from('waiting_queues')
            .update({ status: 'cancelled' })
            .eq('id', r)
            .eq('passenger_id', n);
          if (t) {
            if (!(0, _r(d[2]).isMissingTableError)(t) && !(0, _r(d[2]).isRlsError)(t))
              return { data: null, error: t };
          } else o = !0;
        } else if (u) return (0, _r(d[3]).cancelAllLocalWaitingQueues)(n);
        if (!(await (0, _r(d[3]).cancelLocalQueue)(r, n)).error)
          return (
            await (0, _r(d[4]).invalidatePassengerTripsCache)(n),
            { data: { id: r, status: 'cancelled' }, error: null }
          );
        const l = await (0, _r(d[3]).cancelAllLocalWaitingQueues)(n);
        if (!l.error || o)
          return (
            await (0, _r(d[4]).invalidatePassengerTripsCache)(n),
            { data: { id: r, status: 'cancelled' }, error: null }
          );
        return l;
      }),
      (e.fetchPassengerActiveQueue = l),
      (e.fetchQueueDemandRoutes = f),
      (e.fetchWaitingPassengers = c),
      (e.invitePassengerFromQueue = async function (r, n, s = null) {
        if (p(r)) return w(r, s);
        const { supabase: u } = t();
        if (!u) return w(r, s);
        try {
          const { data: t, error: n } = await u
            .from('waiting_queues')
            .update({ status: 'invited', updated_at: new Date().toISOString() })
            .eq('id', r)
            .eq('status', 'waiting')
            .select('*, profiles:passenger_id(full_name)')
            .maybeSingle();
          return n && ((0, _r(d[2]).isMissingTableError)(n) || (0, _r(d[2]).isRlsError)(n))
            ? w(r, s)
            : n
              ? { data: null, error: n }
              : t
                ? { data: t, error: null }
                : {
                    data: null,
                    error: new Error('This passenger is no longer in the waiting queue.'),
                  };
        } catch {
          return w(r, s);
        }
      }),
      (e.joinWaitingQueue = async function (s, u, l, c = {}) {
        const { origin: f, destination: p } = r(u, l);
        if (!s || !f || !p)
          return {
            data: null,
            error: new Error('Route and sign-in are required to join the queue.'),
          };
        const { supabase: w, error: _ } = t();
        let h = null,
          b = null;
        if (w)
          try {
            const { data: t, error: r } = await o(w, s, f, p, c);
            !r || (0, _r(d[2]).isMissingTableError)(r) || (0, _r(d[2]).isRlsError)(r)
              ? r || (h = t)
              : (b = r);
          } catch (t) {
            b = t;
          }
        else b = _;
        if (b && !(0, _r(d[2]).isMissingTableError)(b) && !(0, _r(d[2]).isRlsError)(b))
          return { data: null, error: new Error((0, _r(d[2]).formatQueueJoinError)(b)) };
        await (0, _r(d[3]).cancelAllLocalWaitingQueues)(s);
        const q = await (0, _r(d[3]).saveLocalQueueEntry)({
            passengerId: s,
            origin: f,
            destination: p,
            transportMode: c.transportMode ?? null,
            remoteId: h?.id ?? null,
            scheduledFor: c.scheduledFor ?? h?.scheduled_for ?? null,
            notes: c.notes ?? h?.notes ?? null,
            requestKind: c.requestKind ?? h?.request_kind ?? 'queue',
          }),
          y = await n(f, p, s, c.trustScore ?? null),
          v = Object.assign({}, q, h, {
            queue_position: y,
            transport_mode: c.transportMode ?? h?.transport_mode ?? null,
          });
        await (0, _r(d[4]).invalidatePassengerTripsCache)(s);
        if (
          'scheduled' !== c.requestKind ||
          !c.scheduledFor ||
          (0, _r(d[5]).filterVisibleQueueRows)([{ scheduled_for: c.scheduledFor }]).length
        )
          try {
            const { supabase: r } = t();
            if (r) {
              const { data: t } = await r
                  .from('trips')
                  .select('mate_id')
                  .eq('status', 'active')
                  .ilike('origin', f)
                  .ilike('destination', p)
                  .limit(8),
                { notifyMateQueueDemand: n } = await _r(d[7])(d[6], d.paths);
              await Promise.all(
                [...new Set((t ?? []).map(t => t.mate_id).filter(Boolean))]
                  .filter(t => t !== s)
                  .map(t =>
                    n({ mateId: t, origin: f, destination: p, waitingCount: y }).catch(() => {})
                  )
              );
            }
          } catch {}
        return { data: v, error: null };
      }),
      (e.previewQueuePosition = async function (t, n, s = null, u = null) {
        const { origin: o, destination: l } = r(t, n);
        if (!o || !l)
          return { data: null, error: new Error('Origin and destination are required') };
        const { data: f } = await c(o, l),
          p = f ?? [],
          w = s ? p.findIndex(t => t.passenger_id === s) : -1,
          _ = w >= 0 ? w + 1 : Math.max(1, p.length + (w >= 0 ? 0 : 1)),
          h = (0, _r(d[1]).getTrustQueuePriorityBoost)(u ?? 0),
          b = (0, _r(d[1]).applyTrustQueueBoost)(_, u ?? 0),
          q = (0, _r(d[1]).getTrustTier)(u ?? 0);
        return {
          data: {
            waitingCount: p.length,
            rawPosition: _,
            boostedPosition: b,
            boost: h,
            tier: q.tier,
            route: `${o} \u2192 ${l}`,
          },
          error: null,
        };
      }),
      (e.restoreQueueToWaiting = async function (r) {
        if (p(r)) return { data: { id: r, status: 'waiting' }, error: null };
        const { supabase: n } = t();
        if (!n) return { data: { id: r, status: 'waiting' }, error: null };
        try {
          const { data: t, error: s } = await n
            .from('waiting_queues')
            .update({ status: 'waiting', updated_at: new Date().toISOString() })
            .eq('id', r)
            .eq('status', 'invited')
            .select('id, status')
            .maybeSingle();
          return s && ((0, _r(d[2]).isMissingTableError)(s) || (0, _r(d[2]).isRlsError)(s))
            ? { data: { id: r, status: 'waiting' }, error: null }
            : { data: t ?? { id: r, status: 'waiting' }, error: s ?? null };
        } catch {
          return { data: { id: r, status: 'waiting' }, error: null };
        }
      }),
      (e.subscribeToPassengerQueue = function (t, r) {
        if (!t) return () => {};
        let n = !1,
          s = null;
        const u = async () => {
          const { data: s } = await l(t);
          n || r({ entry: s, updatedAt: Date.now() });
        };
        (u(), (s = setInterval(u, _r(d[10]).QUEUE_POLL_MS)));
        const o = (0, _r(d[0]).getSupabase)();
        if (!o)
          return () => {
            ((n = !0), s && clearInterval(s));
          };
        const c = `passenger-queue-${t}-${Date.now()}`;
        let f = null;
        try {
          f = o
            .channel(c)
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'waiting_queues',
                filter: `passenger_id=eq.${t}`,
              },
              u
            )
            .subscribe();
        } catch {}
        return () => {
          ((n = !0), s && clearInterval(s), f && o.removeChannel(f).catch(() => {}));
        };
      }),
      (e.subscribeToQueueDemand = function (t) {
        let r = !1,
          n = null;
        const s = async () => {
          const { data: n } = await f();
          r ||
            t({
              routes: n ?? [],
              updatedAt: Date.now(),
              live: Boolean((0, _r(d[0]).getSupabase)()),
            });
        };
        (s(), (n = setInterval(s, _r(d[10]).QUEUE_POLL_MS)));
        const u = (0, _r(d[0]).getSupabase)();
        if (!u)
          return () => {
            ((r = !0), n && clearInterval(n));
          };
        const o = `queue-demand-${Date.now()}`;
        let l = null;
        try {
          l = u
            .channel(o)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'waiting_queues' }, s)
            .subscribe();
        } catch (t) {}
        return () => {
          ((r = !0), n && clearInterval(n), l && u.removeChannel(l).catch(() => {}));
        };
      }),
      (e.subscribeToRouteWaitingPassengers = function (t, r, n, s = {}) {
        if (!t || !r) return () => {};
        const u = s.pollMs ?? _r(d[10]).QUEUE_POLL_MS;
        let o = !1,
          l = null;
        const f = async () => {
          const { data: s } = await c(t, r);
          o ||
            n({
              passengers: s ?? [],
              updatedAt: Date.now(),
              live: Boolean((0, _r(d[0]).getSupabase)()),
            });
        };
        (f(), (l = setInterval(f, u)));
        const p = (0, _r(d[0]).getSupabase)();
        if (!p)
          return () => {
            ((o = !0), l && clearInterval(l));
          };
        const w = `route-waiting-${Date.now()}`;
        let _ = null;
        try {
          _ = p
            .channel(w)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'waiting_queues' }, f)
            .subscribe();
        } catch {}
        return () => {
          ((o = !0), l && clearInterval(l), _ && p.removeChannel(_).catch(() => {}));
        };
      }));
  },
  1503,
  {
    0: 502,
    1: 936,
    2: 558,
    3: 935,
    4: 755,
    5: 1504,
    6: 760,
    7: 942,
    8: 939,
    9: 1502,
    10: 938,
    paths: {},
  }
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t, n = r(d[0]).REMINDER_LEAD_MINUTES) {
      const o = t?.scheduled_for ?? t?.scheduledFor ?? null;
      if (!o) return !0;
      const s = new Date(o);
      if (Number.isNaN(s.getTime())) return !0;
      const u = s.getTime() - 60 * n * 1e3;
      return Date.now() >= u;
    }
    function n(t) {
      return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
    }
    function o(t) {
      return `${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}`;
    }
    function s(t, n) {
      return r(d[1]).TROTRO_ROUTES.find(o => o.origin === t && o.destination === n);
    }
    function u(t) {
      const n = t.getTime() - Date.now();
      if (n <= 0) return null;
      const o = Math.floor(n / 6e4),
        s = Math.floor(o / 60),
        u = Math.floor(s / 24);
      return u > 0
        ? `In ${u} day${u > 1 ? 's' : ''}`
        : s > 0
          ? `In ${s} hr${s > 1 ? 's' : ''}`
          : o > 0
            ? `In ${o} min`
            : 'Leaving soon';
    }
    function l(t) {
      const n = (0, r(d[2]).parseScheduledDateTime)(t.date, t.time),
        o = !!n && n <= new Date(),
        l = s(t.origin, t.destination),
        c = (0, r(d[3]).compareCorridorPricing)(t.origin, t.destination);
      return Object.assign({}, t, {
        scheduledAt: n,
        isPast: o,
        isUpcoming: Boolean(n && !o),
        formattedWhen: (0, r(d[2]).formatScheduledDateTime)(t.date, t.time),
        countdownLabel: n && !o ? u(n) : null,
        routeMatch: l,
        fareLabel: l ? `GHS ${l.baseFare.toFixed(2)}` : `~GHS ${c.bestTrotroOs.toFixed(2)}`,
        metaLabel: l
          ? `~${l.avgTimeMin} min \xb7 ${l.distanceKm} km`
          : `~${c.timeMin} min \xb7 ${c.distanceKm} km`,
        savingsLabel:
          c.savingsVsBolt > 0 ? `Save ~GHS ${c.savingsVsBolt.toFixed(0)} vs Bolt` : null,
        driverStatus:
          ((f = t.driverRequest),
          f?.status
            ? 'sent' === f.status
              ? {
                  label: f.localOnly
                    ? 'Saved locally \xb7 drivers notified when online'
                    : 'Sent to drivers',
                  tone: 'success',
                }
              : { label: `Driver request ${f.status}`, tone: 'warning' }
            : { label: 'Not sent to drivers', tone: 'muted' }),
        hasReminder: Boolean(t.reminderId),
      });
      var f;
    }
    function c(t, { ascending: n = !0 } = {}) {
      return [...t].sort((t, o) => {
        const s = (0, r(d[2]).parseScheduledDateTime)(t.date, t.time)?.getTime() ?? 0,
          u = (0, r(d[2]).parseScheduledDateTime)(o.date, o.time)?.getTime() ?? 0;
        return n ? s - u : u - s;
      });
    }
    function f({ offsetDays: t = 0, weekday: s = null, hour: u = 7, minute: l = 30 }) {
      const c = new Date();
      if (null != s) {
        let t = (s - c.getDay() + 7) % 7;
        (0 === t && (t = 7), c.setDate(c.getDate() + t));
      } else c.setDate(c.getDate() + t);
      return (
        c.setHours(u, l, 0, 0),
        c <= new Date() && c.setDate(c.getDate() + (null != s ? 7 : 1)),
        { date: n(c), time: o(c) }
      );
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.applyQuickTemplate = function (t) {
        return Object.assign({ origin: t.origin, destination: t.destination }, f(t));
      }),
      (e.buildDateTimeFromTemplate = f),
      (e.countUpcomingThisWeek = function (t = []) {
        const n = new Date(),
          o = new Date(n);
        return (
          o.setDate(o.getDate() + 7),
          t.filter(t => {
            const s = (0, r(d[2]).parseScheduledDateTime)(t.date, t.time);
            return s && s > n && s <= o;
          }).length
        );
      }),
      (e.createScheduleEntry = function ({
        origin: t,
        destination: n,
        date: o,
        time: u,
        notes: l = '',
        routeId: c = null,
      }) {
        const f = String(t ?? '').trim(),
          S = String(n ?? '').trim(),
          h = c ? r(d[1]).TROTRO_ROUTES.find(t => t.id === c) : s(f, S);
        return {
          id: `sched-${Date.now()}`,
          origin: f,
          destination: S,
          routeId: h?.id ?? c ?? null,
          route: `${f} \u2192 ${S}`,
          date: String(o ?? '').trim(),
          time: String(u ?? '').trim(),
          notes: String(l ?? '').trim(),
          createdAt: new Date().toISOString(),
          driverRequest: null,
          reminderId: null,
        };
      }),
      (e.enrichScheduledRide = l),
      (e.filterVisibleQueueRows = function (n = [], o = r(d[0]).REMINDER_LEAD_MINUTES) {
        return (n ?? []).filter(n => t(n, o));
      }),
      (e.isQueueEntryVisibleNow = t),
      (e.matchKnownRoute = s),
      (e.partitionScheduledRides = function (t = []) {
        const n = t.map(l);
        return {
          upcoming: c(n.filter(t => t.isUpcoming)),
          past: c(
            n.filter(t => t.isPast),
            { ascending: !1 }
          ),
        };
      }),
      (e.rideToFormValues = function (t) {
        return {
          origin: t.origin ?? '',
          destination: t.destination ?? '',
          date: t.date ?? '',
          time: t.time ?? '',
          notes: t.notes ?? '',
        };
      }),
      (e.sortScheduledRides = c),
      (e.toScheduleDateString = n),
      (e.toScheduleTimeString = o),
      (e.validateScheduleInput = function ({ origin: t, destination: n, date: o, time: s }) {
        const u = String(t ?? '').trim(),
          l = String(n ?? '').trim();
        if (!u || !l) return { valid: !1, message: 'Enter where you are and where you are going.' };
        if (u === l) return { valid: !1, message: 'Origin and destination must be different.' };
        if (!String(o ?? '').trim() || !String(s ?? '').trim())
          return { valid: !1, message: 'Enter both date and time.' };
        const c = (0, r(d[2]).parseScheduledDateTime)(o, s);
        if (!c) return { valid: !1, message: 'Enter a valid date and time.' };
        if (c <= new Date()) return { valid: !1, message: 'Scheduled time must be in the future.' };
        return { valid: !0, scheduledAt: c };
      }));
  },
  1504,
  [1505, 682, 1506, 1509]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.SCHEDULED_RIDES_USES =
        e.SCHEDULED_RIDES_TIPS =
        e.SCHEDULED_RIDES_INTRO =
        e.REMINDER_LEAD_MINUTES =
        e.QUICK_SCHEDULE_TEMPLATES =
        e.MAX_SCHEDULED_RIDES =
          void 0));
    ((e.SCHEDULED_RIDES_INTRO =
      'Plan trotro trips ahead. We remind you 30 minutes before departure and can notify mates and TrotroRide drivers.'),
      (e.MAX_SCHEDULED_RIDES = 12),
      (e.REMINDER_LEAD_MINUTES = 30),
      (e.QUICK_SCHEDULE_TEMPLATES = [
        {
          id: 'tomorrow-morning',
          label: 'Tomorrow morning',
          description: '7:30 AM \xb7 Tech \u2192 Ayeduase',
          icon: 'sunny-outline',
          origin: 'Tech Junction',
          destination: 'Ayeduase',
          offsetDays: 1,
          hour: 7,
          minute: 30,
        },
        {
          id: 'monday-campus',
          label: 'Monday campus',
          description: '7:00 AM \xb7 Kejetia \u2192 KNUST',
          icon: 'school-outline',
          origin: 'Kejetia',
          destination: 'KNUST Campus',
          weekday: 1,
          hour: 7,
          minute: 0,
        },
        {
          id: 'friday-evening',
          label: 'Friday evening',
          description: '6:00 PM \xb7 Ayeduase \u2192 Kejetia',
          icon: 'moon-outline',
          origin: 'Ayeduase',
          destination: 'Kejetia',
          weekday: 5,
          hour: 18,
          minute: 0,
        },
      ]),
      (e.SCHEDULED_RIDES_USES = [
        { icon: 'alarm-outline', text: 'Local reminder 30 minutes before you need to leave' },
        { icon: 'people-outline', text: 'Optional request to trotro mates and TrotroRide drivers' },
        { icon: 'heart-outline', text: 'Prefill from favourite routes and saved places' },
        { icon: 'search-outline', text: 'Jump to Find Ride when it is time to book a seat' },
      ]),
      (e.SCHEDULED_RIDES_TIPS = [
        'Schedule at least 1 hour ahead so drivers can plan their queue.',
        'Turn on Scheduled ride reminders in Notifications for the 30-minute alert.',
        'Add pickup notes like \u201cnear main gate\u201d so mates know where to wait.',
        'Past schedules stay here for reference \u2014 remove them anytime.',
      ]));
  },
  1505,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t, n) {
      const o = String(t ?? '').trim(),
        u = String(n ?? '').trim();
      if (!o || !u) return null;
      const s = /^\d{1,2}:\d{2}$/.test(u) ? `${u}:00` : u,
        l = new Date(`${o}T${s}`);
      return Number.isNaN(l.getTime()) ? null : l;
    }
    function n(t, n) {
      const o = r(d[0]).TROTRO_ROUTES.find(o => o.origin === t && o.destination === n);
      return o
        ? { distanceKm: o.distanceKm, timeMin: o.avgTimeMin }
        : { distanceKm: 8.2, timeMin: 25 };
    }
    async function o(t, n) {
      if (!t || !n) return { error: null };
      const o = [];
      return (
        n.queueId && o.push((0, r(d[1]).cancelQueueEntry)(n.queueId, t).catch(() => {})),
        n.trotrorideRequestId &&
          o.push(
            (0, r(d[2]).cancelPassengerRequest)(n.trotrorideRequestId, t, {
              reason: 'schedule_cancelled',
            }).catch(() => {})
          ),
        await Promise.all(o),
        { error: null }
      );
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.cancelScheduledRideDriverRequests = o),
      (e.formatScheduledDateTime = function (n, o) {
        const u = t(n, o);
        return u
          ? u.toLocaleString('en-GH', { dateStyle: 'medium', timeStyle: 'short' })
          : `${n} ${o}`.trim();
      }),
      (e.parseScheduledDateTime = t),
      (e.sendScheduledRideToDrivers = async function (u, s, l = {}) {
        if (!u) return { data: null, error: new Error('Sign in to send requests to drivers.') };
        const c = String(s?.origin ?? '').trim(),
          f = String(s?.destination ?? '').trim();
        if (!c || !f) return { data: null, error: new Error('Route is required.') };
        const p = t(s.date, s.time);
        if (!p) return { data: null, error: new Error('Enter a valid future date and time.') };
        if (p <= new Date())
          return { data: null, error: new Error('Scheduled time must be in the future.') };
        const S = (0, r(d[3]).resolveLocationCoords)(c),
          h = (0, r(d[3]).resolveLocationCoords)(f),
          { distanceKm: q, timeMin: R } = n(c, f),
          v = p.toISOString();
        l.priorDriverRequest && (await o(u, l.priorDriverRequest));
        const [w, y] = await Promise.all([
            (0, r(d[1]).joinWaitingQueue)(u, c, f, {
              transportMode: s.transportMode ?? null,
              scheduledFor: v,
              notes: s.notes ?? '',
              requestKind: 'scheduled',
            }),
            (0, r(d[2]).requestScheduledRide)(u, {
              pickup: c,
              dropoff: f,
              pickupLat: S?.latitude,
              pickupLng: S?.longitude,
              dropoffLat: h?.latitude,
              dropoffLng: h?.longitude,
              distanceKm: q,
              timeMin: R,
              passengerName: l.passengerName ?? 'Passenger',
              scheduledFor: v,
              notes: s.notes ?? '',
            }),
          ]),
          D = Boolean(w.data),
          O = Boolean(y.data);
        if (!D && !O)
          return { data: null, error: w.error ?? y.error ?? new Error('Could not reach drivers.') };
        return {
          data: {
            status: 'sent',
            sentAt: new Date().toISOString(),
            scheduledFor: v,
            queueId: w.data?.id ?? null,
            trotrorideRequestId: y.data?.id ?? null,
            localOnly: Boolean(w.data?.localOnly || y.data?.localOnly),
          },
          error: null,
        };
      }));
  },
  1506,
  [682, 1503, 754, 1507]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.resolveLocationCoords = u),
      (e.resolvePassengerPickupCoords = function ({
        originLabel: t,
        pickupPoint: l,
        myLocation: n,
      }) {
        if (null != n?.latitude && null != n?.longitude)
          return {
            latitude: n.latitude,
            longitude: n.longitude,
            label: n.label ?? t ?? l ?? 'Your location',
            precise: !0,
          };
        return u(l ?? t, n);
      }));
    const t = {
      bantama: { latitude: 6.696, longitude: -1.628, label: 'Bantama' },
      adum: { latitude: 6.69, longitude: -1.621, label: 'Adum' },
      suame: { latitude: 6.704, longitude: -1.615, label: 'Suame' },
      asafo: { latitude: 6.688, longitude: -1.605, label: 'Asafo' },
      tafo: { latitude: 6.712, longitude: -1.598, label: 'Tafo' },
      'airport roundabout': { latitude: 6.714, longitude: -1.59, label: 'Airport Roundabout' },
      kejetia: { latitude: 6.672, longitude: -1.567, label: 'Kejetia' },
      'tech junction': { latitude: 6.6735, longitude: -1.5645, label: 'Tech Junction' },
      ayeduase: { latitude: 6.682, longitude: -1.552, label: 'Ayeduase' },
      'knust campus': { latitude: 6.675, longitude: -1.562, label: 'KNUST Campus' },
    };
    function l(t) {
      return String(t ?? '')
        .trim()
        .toLowerCase();
    }
    function n(n) {
      const o = l(n);
      if (!o) return null;
      const s = r(d[0]).TROTRORIDE_HOT_ZONES.find(t => {
        const n = l(t.label);
        return o.includes(n) || n.includes(o);
      });
      if (s) return { latitude: s.latitude, longitude: s.longitude, label: s.label };
      const c = Object.keys(t).find(t => o.includes(t) || t.includes(o));
      if (c) return t[c];
      const b = r(d[1]).TROTRO_ROUTES.find(t => {
        const n = l(t.origin),
          u = l(t.destination);
        return o.includes(n) || o.includes(u) || n.includes(o) || u.includes(o);
      });
      if (b) {
        return u(o.includes(l(b.origin)) ? b.origin : b.destination);
      }
      return null;
    }
    function u(t, l = null) {
      if (null != l?.latitude && null != l?.longitude)
        return {
          latitude: l.latitude,
          longitude: l.longitude,
          label: l.label ?? t ?? 'Your location',
          precise: !0,
        };
      const u = n(t);
      return u
        ? Object.assign({}, u, { precise: !1 })
        : t?.trim()
          ? {
              latitude: r(d[2]).KUMASI_MAP_REGION.latitude,
              longitude: r(d[2]).KUMASI_MAP_REGION.longitude,
              label: t.trim(),
              approximate: !0,
            }
          : null;
    }
  },
  1507,
  [759, 682, 1508]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ROUTE_COORDINATES = e.KUMASI_MAP_REGION = void 0));
    ((e.KUMASI_MAP_REGION = {
      latitude: 6.6735,
      longitude: -1.5645,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }),
      (e.ROUTE_COORDINATES = {
        'Tech Junction \u2192 Ayeduase': [
          { latitude: 6.6735, longitude: -1.5645 },
          { latitude: 6.678, longitude: -1.558 },
          { latitude: 6.682, longitude: -1.552 },
        ],
        default: [
          { latitude: 6.6735, longitude: -1.5645 },
          { latitude: 6.676, longitude: -1.56 },
          { latitude: 6.679, longitude: -1.556 },
        ],
      }));
  },
  1508,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      return Math.round(100 * t) / 100;
    }
    function n(t) {
      return String(t ?? '')
        .trim()
        .toLowerCase();
    }
    function o(t, o, s = null) {
      if (null != s?.fareBreakdown?.distanceKm)
        return {
          distanceKm: s.fareBreakdown.distanceKm ?? s.fareBreakdown.distance_km ?? 8,
          timeMin: s.fareBreakdown.timeMin ?? s.fareBreakdown.time_min ?? s.tripDuration ?? 25,
        };
      if (null != s?.distanceKm)
        return { distanceKm: s.distanceKm, timeMin: s.timeMin ?? s.tripDuration ?? 25 };
      const c = n(t),
        u = n(o),
        l = r(d[0]).TROTRO_ROUTES.find(
          t =>
            (n(t.origin) === c && n(t.destination) === u) ||
            (n(t.origin) === u && n(t.destination) === c)
        );
      return l
        ? { distanceKm: l.distanceKm, timeMin: l.avgTimeMin }
        : { distanceKm: 8, timeMin: 25 };
    }
    function s(n, o, s = {}) {
      const c = s.competitor ?? 'BOLT',
        u = r(d[1]).COMPETITOR_APPS[c] ?? r(d[1]).COMPETITOR_APPS.BOLT,
        l = Math.min(s.demandMultiplier ?? 1.15, u.surgeCap),
        M = 5 + 2.15 * n + 0.38 * o + 1.5,
        f = M * l;
      return {
        competitor: u.name,
        subtotal: t(M),
        demandMultiplier: l,
        total: t(f),
        commissionPercent: u.commissionPercent,
      };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.applyFareBoost = function (n, o = 0) {
        const s = Math.max(0, Number(o) || 0);
        return t(Number(n ?? 0) + s);
      }),
      (e.compareCorridorPricing = function (n, c, u = {}) {
        const { distanceKm: l, timeMin: M } = u.routeMetrics ?? o(n, c, u.trip),
          f = u.passengers ?? 3,
          P = (0, r(d[2]).calculateFare)(l),
          T = (0, r(d[2]).calculateTrotroRideFare)(l, M, f),
          p = s(l, M, { competitor: 'BOLT' }),
          O = s(l, M, { competitor: 'UBER' }),
          R = t((p.total + O.total) / 2),
          _ = P.total,
          E = T.farePerPassenger,
          B = Math.min(_, E),
          K = t(Math.max(0, p.total - B)),
          C = R > 0 ? Math.round((K / R) * 100) : 0;
        return {
          distanceKm: l,
          timeMin: M,
          trotroSeat: _,
          trotroRideSeat: E,
          bestTrotroOs: B,
          boltEstimate: p.total,
          uberEstimate: O.total,
          rideHailAvg: R,
          savingsVsBolt: K,
          savingsPercent: Math.min(C, 75),
          platformFeePercent: r(d[3]).PLATFORM_FEE_PERCENT,
          trotrorideCommissionPercent: r(d[3]).TR_COMMISSION_PERCENT,
        };
      }),
      (e.estimateRideHailFare = s),
      (e.resolveRouteMetrics = o));
  },
  1509,
  [682, 676, 756, 508]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        title: t,
        subtitle: s,
        children: h,
        scroll: f = !1,
        headerRight: y,
        noPadding: b = !1,
        refreshControl: x,
        testID: p,
      }) {
        const j = (0, r(d[7]).useSafeAreaInsets)(),
          { colors: I } = (0, r(d[8]).useTheme)(),
          C = u(I),
          T = b ? C.contentInnerFlush : C.contentInner,
          k = f
            ? (0, c.jsx)(n.default, {
                contentContainerStyle: [
                  C.scrollContent,
                  { paddingBottom: j.bottom + r(d[6]).spacing.xxl },
                ],
                showsVerticalScrollIndicator: !1,
                keyboardShouldPersistTaps: 'handled',
                keyboardDismissMode: 'on-drag',
                refreshControl: x,
                children: (0, c.jsx)(l.default, { style: T, children: h }),
              })
            : (0, c.jsx)(l.default, {
                style: [C.body, { paddingBottom: j.bottom + r(d[6]).spacing.lg }],
                children: (0, c.jsx)(l.default, { style: [T, { flex: 1 }], children: h }),
              });
        return (0, c.jsxs)(l.default, {
          style: C.root,
          testID: p,
          children: [
            t || s
              ? (0, c.jsx)(l.default, {
                  style: [C.header, { paddingTop: j.top + r(d[6]).spacing.lg }],
                  children: (0, c.jsxs)(l.default, {
                    style: C.headerInner,
                    children: [
                      (0, c.jsxs)(l.default, {
                        style: C.headerText,
                        children: [
                          t ? (0, c.jsx)(o.default, { style: C.title, children: t }) : null,
                          s ? (0, c.jsx)(o.default, { style: C.subtitle, children: s }) : null,
                        ],
                      }),
                      y,
                    ],
                  }),
                })
              : null,
            t || s
              ? k
              : (0, c.jsx)(l.default, { style: [C.body, { paddingTop: j.top }], children: k }),
          ],
        });
      }));
    var n = t(r(d[1])),
      o = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = r(d[5]);
    const u = t =>
      s.default.create({
        root: { flex: 1, backgroundColor: t.background },
        header: {
          borderBottomWidth: s.default.hairlineWidth,
          borderBottomColor: t.borderStrong,
          backgroundColor: t.backgroundAlt,
          paddingBottom: r(d[6]).spacing.md,
        },
        headerInner: Object.assign({}, r(d[6]).contentFrame, {
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          paddingHorizontal: r(d[6]).layout.screenPadding,
        }),
        headerText: { flex: 1 },
        title: Object.assign({}, r(d[6]).typography.title, { color: t.textPrimary }),
        subtitle: Object.assign({}, r(d[6]).typography.body, {
          color: t.textSecondary,
          marginTop: r(d[6]).spacing.xs,
        }),
        body: { flex: 1 },
        scrollContent: { flexGrow: 1, alignItems: 'center' },
        contentInner: Object.assign({}, r(d[6]).contentFrame, {
          paddingHorizontal: r(d[6]).layout.screenPadding,
        }),
        contentInnerFlush: Object.assign({}, r(d[6]).contentFrame),
      });
  },
  1510,
  [1, 106, 161, 19, 26, 183, 377, 572, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        label: l,
        isLive: o = !1,
        precise: f = !1,
        size: u = 'default',
        style: x,
      }) {
        const { colors: y } = (0, r(d[5]).useTheme)();
        if (!l) return null;
        const b = 'large' === u;
        return (0, s.jsxs)(t.default, {
          style: [c.badge, b && c.badgeLarge, x],
          children: [
            (0, s.jsx)(r(d[6]).Ionicons, {
              name: o ? 'navigate-outline' : 'time-outline',
              size: b ? 16 : 14,
              color: o ? y.greenAccentSoft : y.textSecondary,
            }),
            (0, s.jsxs)(t.default, {
              style: c.textWrap,
              children: [
                (0, s.jsxs)(t.default, {
                  style: c.labelRow,
                  children: [
                    o
                      ? (0, s.jsxs)(t.default, {
                          style: [c.liveChip, { backgroundColor: y.bannerLive ?? y.greenDeep }],
                          children: [
                            (0, s.jsx)(t.default, {
                              style: [c.liveDot, { backgroundColor: y.greenAccentSoft }],
                            }),
                            (0, s.jsx)(n.default, {
                              style: [c.livePrefix, { color: y.onPrimary }],
                              children: 'Live',
                            }),
                          ],
                        })
                      : null,
                    (0, s.jsx)(n.default, {
                      style: [
                        c.label,
                        b && c.labelLarge,
                        o && c.labelLive,
                        { color: o ? y.textPrimary : y.textSecondary },
                      ],
                      numberOfLines: 2,
                      children: l,
                    }),
                  ],
                }),
                f
                  ? (0, s.jsx)(n.default, {
                      style: [c.sub, { color: y.textSecondary }],
                      children: 'Based on your saved location',
                    })
                  : null,
              ],
            }),
          ],
        });
      }));
    var t = l(r(d[1])),
      n = l(r(d[2])),
      o = l(r(d[3])),
      s = r(d[4]);
    const c = o.default.create({
      badge: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: r(d[7]).spacing.sm,
        alignSelf: 'flex-start',
        marginBottom: r(d[7]).spacing.sm,
      },
      badgeLarge: { width: '100%', paddingVertical: r(d[7]).spacing.xs },
      textWrap: { flex: 1 },
      labelRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: r(d[7]).spacing.sm,
      },
      liveChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: r(d[7]).radius.sm,
      },
      liveDot: { width: 5, height: 5, borderRadius: 2.5 },
      livePrefix: { fontFamily: r(d[7]).fontFamily.medium, fontSize: 12 },
      label: { fontFamily: r(d[7]).fontFamily.medium, fontSize: 13, flexShrink: 1 },
      labelLarge: { fontSize: 14 },
      labelLive: { fontFamily: r(d[7]).fontFamily.medium },
      sub: { fontFamily: r(d[7]).fontFamily.regular, fontSize: 12, marginTop: 2 },
    });
  },
  1511,
  [1, 19, 161, 26, 183, 381, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t, o = []) {
      if (!t || !o.length) return null;
      const n = t.dbId ?? t.tripId ?? t.rideId ?? t.id,
        u = t.mateId ?? t.driverId;
      return o.find(t => (n && t.tripId === n) || (u && t.mateId === u)) ?? null;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.findDriverLocation = t),
      (e.resolvePickupCoordsFromLabel = function (t, o) {
        return (0, r(d[0]).resolveLocationCoords)(t, o);
      }),
      (e.resolvePickupEta = function ({
        trip: o,
        pickupCoords: n,
        driverLocations: u = [],
        originLabel: l,
        destinationLabel: c,
        pickupPoint: s,
        myLocation: p,
      }) {
        const f =
            n ??
            (0, r(d[0]).resolvePassengerPickupCoords)({
              originLabel: l,
              pickupPoint: s,
              myLocation: p,
            }),
          k = o?.pickupEta ?? o?.eta ?? 12,
          L = t(o, u);
        if (null != L?.latitude && null != f?.latitude) {
          const t = (0, r(d[1]).computePickupEtaMinutes)(
            L.latitude,
            L.longitude,
            L.speedKmh,
            f.latitude,
            f.longitude
          );
          return {
            etaMin: t,
            distanceKm: (0, r(d[1]).haversineKm)(L.latitude, L.longitude, f.latitude, f.longitude),
            isLive: !0,
            precise: Boolean(f.precise),
            label: (0, r(d[1]).formatPickupEta)(t, !0),
            shortLabel: (0, r(d[1]).formatPickupEtaShort)(t, !0),
          };
        }
        if (null != o?.latitude && null != f?.latitude) {
          const t = (0, r(d[1]).computePickupEtaMinutes)(
            o.latitude,
            o.longitude,
            22,
            f.latitude,
            f.longitude
          );
          return {
            etaMin: t,
            isLive: !1,
            precise: Boolean(f.precise),
            label: (0, r(d[1]).formatPickupEta)(t, !1),
            shortLabel: (0, r(d[1]).formatPickupEtaShort)(t, !1),
          };
        }
        return {
          etaMin: k,
          isLive: !1,
          precise: !1,
          label: (0, r(d[1]).formatPickupEta)(k, !1),
          shortLabel: (0, r(d[1]).formatPickupEtaShort)(k, !1),
        };
      }));
  },
  1512,
  [1507, 1513]
);
__d(
  function (g, r, i, _a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.computePickupEtaMinutes = function (u, o, a, l, s) {
        const c = n(u, o, l, s);
        if (null == c) return null;
        return t(c, a > 8 ? a : 22);
      }),
      (e.estimateEtaMinutes = t),
      (e.formatPickupEta = function (n, t = !1) {
        return null == n
          ? null
          : n <= 2
            ? t
              ? 'Arriving at you now'
              : '~2 min to you'
            : t
              ? `Arrives at you in ${n} min`
              : `~${n} min to you`;
      }),
      (e.formatPickupEtaShort = function (n, t = !1) {
        return null == n ? null : n <= 2 ? (t ? 'Now' : '~2 min') : t ? `${n} min` : `~${n} min`;
      }),
      (e.haversineKm = n));
    function n(n, t, u, o) {
      if ([n, t, u, o].some(n => null == n || Number.isNaN(Number(n)))) return null;
      const a = n => (n * Math.PI) / 180,
        l = a(u - n),
        s = a(o - t),
        c = Math.sin(l / 2) ** 2 + Math.cos(a(n)) * Math.cos(a(u)) * Math.sin(s / 2) ** 2;
      return 12742 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
    }
    function t(n, t = 22) {
      return null == n || n <= 0 ? null : Math.max(2, Math.round((n / t) * 60));
    }
  },
  1513,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TROTROOS_SUPPORT = e.KUMASI_LOCATIONS = e.EMERGENCY_SERVICES = void 0));
    ((e.EMERGENCY_SERVICES = [
      {
        id: 'national',
        name: 'National Emergency',
        phone: '112',
        icon: 'alert-circle-outline',
        description: 'All emergencies \xb7 Ghana & many African countries',
      },
      {
        id: 'police',
        name: 'Police',
        phone: '191',
        icon: 'shield-outline',
        description: 'Ghana Police Service',
      },
      {
        id: 'fire',
        name: 'Fire Service',
        phone: '192',
        icon: 'flame-outline',
        description: 'Fire & rescue',
      },
      {
        id: 'ambulance',
        name: 'Ambulance',
        phone: '193',
        icon: 'medkit-outline',
        description: 'Medical emergency',
      },
      {
        id: 'road',
        name: 'Road Safety (NRSA)',
        phone: '0501611611',
        icon: 'car-outline',
        description: 'Road accidents & hazards',
      },
      {
        id: 'gender',
        name: 'Domestic Violence Helpline',
        phone: '0800111222',
        icon: 'heart-outline',
        description: '24/7 support line',
      },
    ]),
      (e.TROTROOS_SUPPORT = {
        name: 'TrotroOS Support',
        phone: r(d[0]).SUPPORT_EMAIL,
        email: !0,
        icon: 'mail-outline',
        description: 'Safety reports & trip issues',
      }),
      (e.KUMASI_LOCATIONS = [
        'Tech Junction',
        'Ayeduase',
        'KNUST Campus',
        'Kejetia',
        'Bantama',
        'Adum',
        'Suame',
        'Asafo',
        'Tafo',
        'Airport Roundabout',
      ]));
  },
  1514,
  [508]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        title: s,
        subtitle: h,
        onClose: p,
        onConfirm: y,
        confirmTitle: x = 'Confirm',
        confirmTestID: C,
        confirmLoading: j = !1,
        showCancelButton: v = !0,
        children: T,
      }) {
        const B = (0, r(d[9]).useSafeAreaInsets)(),
          { colors: R, typography: k } = (0, r(d[10]).useTheme)(),
          P = b(R, k);
        return (0, f.jsx)(l.default, {
          visible: t,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: p,
          children: (0, f.jsxs)(o.default, {
            style: P.overlay,
            children: [
              (0, f.jsx)(u.default, {
                style: P.backdrop,
                onPress: p,
                accessibilityRole: 'button',
                accessibilityLabel: 'Close',
              }),
              (0, f.jsxs)(o.default, {
                style: [P.sheet, { paddingBottom: B.bottom + r(d[8]).spacing.lg }],
                children: [
                  s ? (0, f.jsx)(n.default, { style: P.title, children: s }) : null,
                  h ? (0, f.jsx)(n.default, { style: P.subtitle, children: h }) : null,
                  T,
                  y && null !== x
                    ? (0, f.jsx)(c.default, {
                        title: x ?? 'Confirm',
                        onPress: y,
                        testID: C,
                        loading: j,
                        disabled: j,
                      })
                    : null,
                  v
                    ? (0, f.jsx)(c.default, {
                        title: 'Cancel',
                        variant: 'ghost',
                        onPress: p,
                        disabled: j,
                      })
                    : null,
                ],
              }),
            ],
          }),
        });
      }));
    var l = t(r(d[1])),
      o = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      f = r(d[7]);
    const b = (t, l) =>
      s.default.create({
        overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: t.overlay },
        backdrop: { flex: 1, width: '100%' },
        sheet: {
          backgroundColor: t.surfaceElevated,
          borderTopLeftRadius: r(d[8]).radius.lg,
          borderTopRightRadius: r(d[8]).radius.lg,
          borderWidth: 1,
          borderColor: t.border,
          borderBottomWidth: 0,
          paddingHorizontal: r(d[8]).spacing.xl,
          paddingTop: r(d[8]).spacing.lg,
          maxHeight: '92%',
        },
        title: Object.assign({}, l.heading, { marginBottom: r(d[8]).spacing.xs }),
        subtitle: {
          fontFamily: r(d[8]).fontFamily.medium,
          fontSize: 15,
          lineHeight: 21,
          color: t.textSecondary,
          marginBottom: r(d[8]).spacing.lg,
        },
      });
  },
  1515,
  [1, 948, 19, 161, 26, 326, 672, 183, 377, 572, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        trip: t,
        privacyPrefs: l = {},
        forceShow: S = !1,
        onShared: j,
        onDismiss: w,
      }) {
        const { colors: b } = (0, r(d[10]).useTheme)(),
          v = (0, s.useMemo)(() => x(b), [b]),
          [T, D] = (0, s.useState)(S),
          [A, C] = (0, s.useState)(!1),
          M = (0, s.useRef)(!1),
          P = (0, r(d[11]).canShareTripStatus)(l ?? {});
        if (
          ((0, s.useEffect)(() => {
            if (S) return void D(!0);
            if (!t?.id || M.current) return;
            const s = t.createdAt ? new Date(t.createdAt).getTime() : Date.now(),
              o = Math.max(0, y - (Date.now() - s)),
              n = setTimeout(() => {
                ((M.current = !0), D(!0));
              }, o);
            return () => clearTimeout(n);
          }, [t?.id, t?.createdAt, S]),
          !T || !t || !P)
        )
          return null;
        return (0, h.jsxs)(p.default, {
          elevated: !0,
          style: v.card,
          children: [
            (0, h.jsxs)(o.default, {
              style: v.row,
              children: [
                (0, h.jsx)(o.default, {
                  style: v.iconWrap,
                  children: (0, h.jsx)(r(d[13]).Ionicons, {
                    name: 'shield-checkmark',
                    size: 20,
                    color: b.success,
                  }),
                }),
                (0, h.jsxs)(o.default, {
                  style: v.textCol,
                  children: [
                    (0, h.jsx)(n.default, { style: v.title, children: 'Share live trip' }),
                    (0, h.jsx)(n.default, {
                      style: v.body,
                      children:
                        'Send a Trip Guardian link so family can follow your ride in the browser.',
                    }),
                  ],
                }),
                (0, h.jsx)(u.default, {
                  onPress: () => {
                    (D(!1), w?.(t));
                  },
                  hitSlop: 10,
                  accessibilityLabel: 'Dismiss',
                  children: (0, h.jsx)(r(d[13]).Ionicons, {
                    name: 'close',
                    size: 18,
                    color: b.textMuted,
                  }),
                }),
              ],
            }),
            (0, h.jsx)(f.default, {
              title: A ? 'Opening\u2026' : 'Share on WhatsApp',
              onPress: async () => {
                C(!0);
                try {
                  const s = 'trotroride' === t.tripType ? 'trotroride_rides' : 'trips',
                    { message: o } = await (0,
                    r(d[12], '../../services/tripGuardian').prepareTripShare)(t, { table: s });
                  (await c.default.share({ message: o, title: 'Share live trip' }), j?.(t), D(!1));
                } catch {
                } finally {
                  C(!1);
                }
              },
              loading: A,
              compact: !0,
              noMargin: !0,
            }),
          ],
        });
      }));
    var s = r(d[1]),
      o = t(r(d[2])),
      n = t(r(d[3])),
      l = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = t(r(d[7])),
      p = t(r(d[8])),
      h = r(d[9]);
    const y = 18e4;
    const x = t =>
      l.default.create({
        card: { marginBottom: r(d[14]).spacing.md, borderColor: t.success },
        row: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.md,
        },
        iconWrap: {
          width: 36,
          height: 36,
          borderRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.greenAlpha12,
        },
        textCol: { flex: 1 },
        title: {
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 15,
          color: t.textPrimary,
          marginBottom: 2,
        },
        body: Object.assign({}, r(d[14]).typography.caption, { color: t.textSecondary }),
      });
  },
  1516,
  [1, 5, 19, 161, 26, 1517, 326, 672, 684, 183, 381, 1518, 1519, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var s = t(r(d[1]));
    e.default = class {
      static share(t, o) {
        return (
          void 0 === o && (o = {}),
          (0, s.default)(
            'object' == typeof t && null !== t,
            'Content to share must be a valid object'
          ),
          (0, s.default)(
            'string' == typeof t.url || 'string' == typeof t.message,
            'At least one of URL and message is required'
          ),
          (0, s.default)('object' == typeof o && null !== o, 'Options must be a valid object'),
          (0, s.default)(
            !t.title || 'string' == typeof t.title,
            'Invalid title: title should be a string.'
          ),
          void 0 !== window.navigator.share
            ? window.navigator.share({ title: t.title, text: t.message, url: t.url })
            : Promise.reject(new Error('Share is not supported in this browser'))
        );
      }
      static get sharedAction() {
        return 'sharedAction';
      }
      static get dismissedAction() {
        return 'dismissedAction';
      }
    };
  },
  1517,
  [1, 100]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.canShareTripStatus = function (n) {
        return !1 !== n?.shareTripStatus;
      }),
      (e.resolvePublicPassengerName = function (n, t, s = 'Passenger') {
        const o = !0 === t?.showProfileToCoPassengers,
          u = String(n?.full_name ?? '').trim();
        if (o && u) return u;
        if (u) {
          return u.split(/\s+/)[0] || s;
        }
        return s;
      }),
      (e.shouldSharePreciseLocation = function (n) {
        return !1 !== n?.shareLocationWithDriver;
      }));
  },
  1518,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t, n, u, o = null) {
      return (0, r(d[0]).buildTrackShareUrl)(t, n, u, o);
    }
    function n(t, n, u, o = null) {
      return (0, r(d[0]).buildTrackDeepLink)(t, n, u, o);
    }
    function u(u) {
      const o = u.rideId ?? u.tripId ?? u.id,
        l = u.trackShareToken ?? u.track_share_token ?? null,
        s = t(o, u.latitude, u.longitude, l),
        p = n(o, u.latitude, u.longitude, l),
        c = u.driverName ?? u.passengerName ?? 'My trip',
        k = [
          `Track my trip live on TrotroOS: ${u.route ?? 'Kumasi'}`,
          `${c} \xb7 ETA ${u.etaMin ?? '\u2014'} min`,
          s,
        ];
      return (p !== s && k.push(`Open in app: ${p}`), k.join('\n'));
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildShareAppLink = n),
      (e.buildShareMessage = u),
      (e.buildShareTripLink = t),
      (e.prepareTripShare = async function (t, { table: n = 'trips' } = {}) {
        if (!t) return { trip: null, message: '', token: null };
        const o = t.rideId ?? t.tripId ?? t.id;
        let l = t.trackShareToken ?? t.track_share_token ?? null;
        if (!l && o) {
          const { data: t } = await (0, r(d[1]).ensureTrackShareToken)(o, { table: n });
          l = t;
        }
        const s = Object.assign({}, t, { trackShareToken: l, track_share_token: l });
        return { trip: s, message: u(s), token: l };
      }),
      (e.reportUnsafeTrip = async function ({
        rideId: t,
        tripId: n,
        userId: u,
        role: o,
        latitude: l,
        longitude: s,
        route: p,
      }) {
        const c = (0, r(d[2]).getSupabase)(),
          k = t ?? n;
        c &&
          k &&
          u &&
          (await c
            .from('safety_reports')
            .insert({
              ride_id: t ?? null,
              trip_id: n ?? null,
              reporter_id: u,
              reporter_role: o,
              route: p ?? '',
              latitude: l,
              longitude: s,
              status: 'open',
              report_type: 'feel_unsafe',
            })
            .catch(() => {}));
        return (
          await (0, r(d[3]).notifySafetyTeamAlert)(u).catch(() => {}),
          { data: { reported: !0 }, error: null }
        );
      }));
  },
  1519,
  [944, 687, 502, 760]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.callOperator = h),
      (e.default = function ({
        phone: t,
        operatorName: o = 'Mate',
        message: n = '',
        compact: c = !1,
      }) {
        const { colors: p } = (0, r(d[9]).useTheme)(),
          C = x(p),
          T = b(t);
        if (!T)
          return (0, f.jsx)(s.default, {
            style: C.unavailable,
            children: 'Contact number not shared yet. Your mate will be notified in the app.',
          });
        return (0, f.jsxs)(u.default, {
          style: [C.row, c && C.rowCompact],
          children: [
            (0, f.jsxs)(l.default, {
              style: C.action,
              onPress: () => h(T, o),
              accessibilityRole: 'button',
              accessibilityLabel: `Call ${o}`,
              children: [
                (0, f.jsx)(r(d[10]).Ionicons, {
                  name: 'call-outline',
                  size: 18,
                  color: p.accentText ?? p.primary,
                }),
                (0, f.jsx)(s.default, { style: C.actionText, children: 'Call' }),
              ],
            }),
            (0, f.jsxs)(l.default, {
              style: C.action,
              onPress: () => y(T, n, o),
              accessibilityRole: 'button',
              accessibilityLabel: `Text ${o}`,
              children: [
                (0, f.jsx)(r(d[10]).Ionicons, {
                  name: 'chatbubble-outline',
                  size: 18,
                  color: p.accentText ?? p.primary,
                }),
                (0, f.jsx)(s.default, { style: C.actionText, children: 'Text' }),
              ],
            }),
            (0, f.jsx)(s.default, { style: C.phone, children: T }),
          ],
        });
      }),
      (e.formatPhoneDisplay = b),
      (e.textOperator = y));
    var o = t(r(d[1])),
      n = t(r(d[2])),
      l = t(r(d[3])),
      c = t(r(d[4])),
      s = t(r(d[5])),
      u = t(r(d[6])),
      f = r(d[7]);
    function p(t) {
      return String(t ?? '')
        .replace(/\s/g, '')
        .trim();
    }
    function b(t) {
      return p(t) || null;
    }
    function h(t, l = 'operator') {
      const c = p(t);
      c
        ? n.default.openURL(`tel:${c}`).catch(() => {
            o.default.alert('Cannot dial', `Unable to call ${l}.`);
          })
        : o.default.alert('No phone number', `${l} has not added a contact number yet.`);
    }
    function y(t, l = '', c = 'operator') {
      const s = p(t);
      if (!s)
        return void o.default.alert('No phone number', `${c} has not added a contact number yet.`);
      const u = l ? `?body=${encodeURIComponent(l)}` : '';
      n.default.openURL(`sms:${s}${u}`).catch(() => {
        o.default.alert('Cannot send text', `Unable to message ${c}.`);
      });
    }
    const x = t =>
      c.default.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[8]).spacing.sm,
          marginTop: r(d[8]).spacing.sm,
          marginBottom: r(d[8]).spacing.md,
          padding: r(d[8]).spacing.sm,
          borderRadius: r(d[8]).radius.md,
          backgroundColor: t.surfaceSoft,
          borderWidth: c.default.hairlineWidth,
          borderColor: t.border,
        },
        rowCompact: { marginBottom: r(d[8]).spacing.sm },
        action: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingVertical: r(d[8]).spacing.xs,
          paddingHorizontal: r(d[8]).spacing.sm,
          borderRadius: r(d[8]).radius.sm,
          backgroundColor: t.surfaceElevated,
          borderWidth: c.default.hairlineWidth,
          borderColor: t.borderStrong,
        },
        actionText: {
          fontFamily: r(d[8]).fontFamily.medium,
          fontSize: 13,
          color: t.accentText ?? t.primary,
        },
        phone: {
          flex: 1,
          fontFamily: r(d[8]).fontFamily.medium,
          fontSize: 13,
          color: t.textPrimary,
          textAlign: 'right',
        },
        unavailable: {
          fontFamily: r(d[8]).fontFamily.regular,
          fontSize: 14,
          lineHeight: 20,
          color: t.textSecondary,
          marginTop: r(d[8]).spacing.sm,
          marginBottom: r(d[8]).spacing.md,
        },
      });
  },
  1520,
  [1, 678, 667, 326, 26, 161, 19, 183, 377, 381, 578]
);
__d(
  function (g, r, i, a, _m, e, d) {
    function t(t) {
      const n = Math.max(0, t),
        o = Math.floor(n / 6e4),
        u = Math.floor((n % 6e4) / 1e3);
      return `${String(o).padStart(2, '0')}:${String(u).padStart(2, '0')}`;
    }
    function n(t) {
      const n = (t - Date.now()) / 6e4;
      return n <= 0 ? 'expired' : n < 5 ? 'critical' : n < 15 ? 'warning' : 'ok';
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.countdownStyleKey = function (t) {
        return n(t);
      }),
      (e.formatCountdownMs = t),
      (e.formatCountdownTo = function (n) {
        return t(('number' == typeof n ? n : new Date(n).getTime()) - Date.now());
      }),
      (e.getCountdownColor = n));
  },
  1521,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      const t = (0, r(d[0]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildGhqrPayload = function (t, n, o) {
        return t ? `GHQR|${t}|${n.toFixed(2)}|GHS|${o}` : null;
      }),
      (e.buildMomoDeepLink = function (t, n) {
        return t ? `momochi://pay?merchant=${encodeURIComponent(t)}&amount=${n.toFixed(2)}` : null;
      }),
      (e.computePlatformFee = function (t, n = r(d[1]).PLATFORM_FEE_PERCENT, o = null) {
        const s = (0, r(d[2]).applyTrustFareDiscount)(t, o);
        return Math.round(Number(s ?? 0) * (n / 100) * 100) / 100;
      }),
      (e.markReservationPaid = async function (n, o, s) {
        const { supabase: u, error: l } = t();
        if (l) return { data: null, error: l };
        if (String(n).startsWith('local-'))
          return { data: { id: n, payment_status: 'paid' }, error: null };
        const { data: p, error: c } = await u
          .from('reservations')
          .update({ payment_status: 'paid', payment_reference: o, payment_method: s })
          .eq('id', n)
          .select()
          .single();
        if (c && (0, r(d[3]).isMissingTableError)(c))
          return { data: { id: n, payment_status: 'paid' }, error: null };
        return { data: p, error: c };
      }),
      (e.markReservationPaymentPending = async function (n, o, s) {
        const { supabase: u, error: l } = t();
        if (l) return { data: null, error: l };
        if (String(n).startsWith('local-'))
          return {
            data: { id: n, payment_status: 'pending', payment_reference: o, payment_method: s },
            error: null,
          };
        const { data: p, error: c } = await u
          .from('reservations')
          .update({ payment_status: 'pending', payment_reference: o, payment_method: s })
          .eq('id', n)
          .select()
          .single();
        if (c && (0, r(d[3]).isMissingTableError)(c))
          return {
            data: { id: n, payment_status: 'pending', payment_reference: o, payment_method: s },
            error: null,
          };
        return { data: p, error: c };
      }),
      (e.recordPayment = async function ({
        reservationId: n,
        payerId: o,
        payeeId: s,
        amount: u,
        method: l,
        reference: p,
      }) {
        const { supabase: c, error: y } = t();
        if (y) return { data: null, error: y };
        try {
          const { data: t, error: y } = await c
            .from('trip_payments')
            .insert({
              reservation_id: n,
              payer_id: o,
              payee_id: s,
              amount: u,
              method: l,
              reference: p,
              status: 'completed',
            })
            .select()
            .single();
          return y && (0, r(d[3], './db').isMissingTableError)(y)
            ? { data: { reference: p, localOnly: !0 }, error: null }
            : { data: t, error: y };
        } catch {
          return { data: { reference: p, localOnly: !0 }, error: null };
        }
      }),
      (e.resolvePaymentPhase = function (t) {
        const n = String(t?.paymentStatus ?? t?.payment_status ?? 'pending').toLowerCase();
        if ('paid' === n) return 'paid';
        return (t?.paymentReference ?? t?.payment_reference ?? null) ? 'pending_confirm' : 'unpaid';
      }));
  },
  1522,
  [502, 508, 936, 558]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.RESERVATION_ALREADY_EXISTS_MESSAGE = void 0),
      (e.acceptReservation = async function (t, s) {
        const { supabase: n, error: o } = l();
        if (o) return { data: null, error: o };
        if ((0, r(d[2]).isLocalPassengerId)(t)) {
          return {
            data: {
              id: t,
              status: 'confirmed',
              verification_code: (0, r(d[8]).generateVerificationCode)(),
            },
            error: null,
          };
        }
        const { data: u, error: c } = await n.rpc('accept_trip_reservation', {
          p_reservation_id: t,
          p_trip_id: s ?? null,
        });
        if (!c && u) return { data: u, error: null };
        const _ = (0, r(d[8]).generateVerificationCode)(),
          { data: p, error: f } = await n
            .from('reservations')
            .update({ status: 'confirmed', verification_code: _ })
            .eq('id', t)
            .or(S(s))
            .in('status', ['pending', 'active'])
            .select()
            .single();
        if (f && (0, r(d[1]).isMissingColumnError)(f)) {
          const o = await n
            .from('reservations')
            .update({ status: 'confirmed' })
            .eq('id', t)
            .or(S(s))
            .in('status', ['pending', 'active'])
            .select()
            .single();
          return !o.error && o.data
            ? { data: Object.assign({}, o.data, { verification_code: _ }), error: null }
            : o;
        }
        return { data: p, error: f };
      }),
      (e.boardPassenger = async function (t, s) {
        const { supabase: n, error: o } = l();
        if (o) return { data: null, error: o };
        if (String(t).startsWith('local-'))
          return { data: { id: t, status: 'boarded' }, error: null };
        const { data: u, error: c } = await n
          .from('reservations')
          .update({ status: 'boarded', boarded_at: new Date().toISOString() })
          .eq('id', t)
          .or(S(s))
          .in('status', ['confirmed', 'active'])
          .select()
          .single();
        return { data: u, error: c };
      }),
      (e.cancelReservation = q),
      (e.cancelReservationAsPassenger = async function (t, s, n, o = {}) {
        if ((0, r(d[2]).isLocalPassengerId)(t)) return (0, r(d[2]).cancelLocalReservation)(t, n);
        const { supabase: u, error: c } = l();
        if (c) return { data: null, error: c };
        const { data: _ } = await u
          .from('reservations')
          .select('trip_id, mate_trip_id, trotroride_trip_id, trip_type, passenger_id')
          .eq('id', t)
          .maybeSingle();
        if (_ && _.passenger_id !== n) return { data: null, error: new Error('Not authorized') };
        const p =
          'trotroride' === _?.trip_type
            ? (_.trotroride_trip_id ?? s)
            : (s ?? _?.trip_id ?? _?.mate_trip_id);
        if (!p && !(0, r(d[2]).isLocalPassengerId)(t))
          return { data: null, error: new Error('Missing trip for this reservation') };
        const f = await q(t, p);
        f.error ||
          (await (0, r(d[2]).cancelLocalReservation)(t, n).catch(() => {}),
          await (0, r(d[4]).invalidateLiveTripsCache)());
        return f;
      }),
      (e.completeReservation = async function (t, s, n, o) {
        if ((0, r(d[2]).isLocalPassengerId)(t))
          return (0, r(d[2]).completeLocalReservation)(t, s, n);
        const { supabase: u, error: c } = l();
        if (c) return { data: null, error: c };
        const { data: _, error: p } = await u
          .from('reservations')
          .update({ status: 'completed', completed_at: new Date().toISOString() })
          .eq('id', t)
          .eq('passenger_id', s)
          .select()
          .single();
        if (p) return { data: null, error: p };
        n &&
          o &&
          (await u
            .from('trip_ratings')
            .insert({ reservation_id: t, rater_id: s, rated_id: o, score: n }),
          await u.rpc('refresh_profile_trust_score', { profile_uuid: o }));
        return { data: _, error: null };
      }),
      (e.createReservation = async function (s, n, o, c, w = null) {
        const { supabase: E, error: S } = l();
        if (S) return { data: null, error: S };
        if (String(s).startsWith('local-')) {
          const t = await (0, r(d[2]).saveLocalReservation)({
            passengerId: n,
            passengerName: o,
            pickupPoint: c,
            trip: w ?? { id: s, dbId: s },
          });
          return { data: t, error: null, alreadyExists: Boolean(t?.alreadyExists) };
        }
        const { data: T, error: q } = await f(E, s, n);
        if (q) return { data: null, error: new Error(_(q)) };
        if (T) return { data: T, error: null, alreadyExists: !0 };
        try {
          const { data: l, error: u } = await E.rpc('reserve_trip_seat', {
            p_trip_id: s,
            p_passenger_id: n,
            p_passenger_name: o,
            p_pickup_point: c,
          });
          if (!u && l) return { data: l, error: null, alreadyExists: !1 };
          if (u) {
            if ((0, r(d[1]).isUniqueViolationError)(u)) {
              const { data: o } = await f(E, s, n);
              return o
                ? { data: o, error: null, alreadyExists: !0 }
                : { data: null, error: new Error(t), alreadyExists: !0 };
            }
            if (
              u.message?.includes('reservation_rate_limited') ||
              u.message?.includes('too_many_active_reservations') ||
              u.message?.includes('not_authorized')
            )
              return { data: null, error: new Error(_(u)) };
          }
        } catch {}
        const { data: R, error: M } = await h(E, s);
        let x = R,
          I = 'trips';
        if (!x) {
          const t = await p(E, s);
          if (t.error && !(0, r(d[1]).isMissingTableError)(t.error))
            return { data: null, error: new Error(_(t.error)) };
          t.data && ((x = t.data), (I = 'mate_trips'));
        }
        if (M && !x && !(0, r(d[1]).isMissingTableError)(M))
          return { data: null, error: new Error(_(M)) };
        if (!x)
          return {
            data: null,
            error: new Error('This trip is no longer available. Refresh rides and try again.'),
          };
        if ('active' !== x.status || (x.available_seats ?? 0) < 1)
          return { data: null, error: u() };
        const O = new Date(Date.now() + 60 * r(d[3]).RESERVATION_HOLD_MINUTES * 1e3).toISOString(),
          k = Number(w?.fare ?? w?.farePerSeat ?? x.fare_per_seat ?? 0),
          L = {
            passenger_id: n,
            passenger_name: o,
            pickup_point: c,
            expires_at: O,
            trip_type: 'trotro',
            fare: k,
            platform_fee: 0,
            total_amount: k,
            payment_method: 'pay_on_board',
          },
          P =
            'mate_trips' === I
              ? [
                  Object.assign({}, L, { mate_trip_id: s, trip_id: null, status: 'active' }),
                  Object.assign({}, L, { mate_trip_id: s, trip_id: null, status: 'pending' }),
                  Object.assign({}, L, { mate_trip_id: s, trip_id: null, status: 'confirmed' }),
                  {
                    passenger_id: n,
                    mate_trip_id: s,
                    trip_id: null,
                    trip_type: 'trotro',
                    status: 'pending',
                    expires_at: O,
                    fare: k,
                    total_amount: k,
                    pickup_point: c,
                    passenger_name: o,
                  },
                ]
              : [
                  Object.assign({}, L, { trip_id: s, status: 'pending' }),
                  Object.assign({}, L, { trip_id: s, status: 'active' }),
                  {
                    passenger_id: n,
                    trip_id: s,
                    trip_type: 'trotro',
                    status: 'pending',
                    expires_at: O,
                  },
                ],
          { data: C, error: j, alreadyExists: A } = await v(E, P);
        if (j)
          return {
            data: null,
            error: new Error(_(j)),
            alreadyExists: (0, r(d[1]).isUniqueViolationError)(j),
          };
        if (A) return { data: C, error: null, alreadyExists: !0 };
        if ('mate_trips' === I)
          return (await b(E, s, C.id, o, c, O), { data: C, error: null, alreadyExists: !1 });
        const V = (x.available_seats ?? 0) - 1,
          D = await y(E, s, V, { markFull: V <= 0 });
        if (D) {
          await E.from('reservations').delete().eq('id', C.id);
          const t = (0, r(d[1]).isRlsError)(D)
            ? 'Seat hold requires the reserve_trip_seat database function. Apply Supabase migration 019, then try again.'
            : _(D);
          return { data: null, error: new Error(t), alreadyExists: !1 };
        }
        return { data: C, error: null, alreadyExists: !1 };
      }),
      (e.deleteHistoryTrip = async function (t, s) {
        if (!t || !s) return { data: null, error: new Error('Missing trip') };
        if ((0, r(d[2]).isLocalPassengerId)(t)) return (0, r(d[2]).deleteLocalHistoryTrip)(t, s);
        const { supabase: n, error: o } = l();
        if (o)
          return (
            await (0, r(d[2]).hideHistoryTripId)(s, t),
            { data: { id: t, hidden: !0 }, error: null }
          );
        const { data: u, error: c } = await n
          .from('reservations')
          .delete()
          .eq('id', t)
          .eq('passenger_id', s)
          .select()
          .maybeSingle();
        if (c || !u)
          return (
            await (0, r(d[2]).hideHistoryTripId)(s, t),
            { data: { id: t, hidden: !0 }, error: null }
          );
        return { data: u, error: null };
      }),
      (e.fetchMateReservationsForTrip = async function (t) {
        return M(t);
      }),
      (e.fetchPassengerReservations = async function (t) {
        const { data: s, error: n } = await x(t);
        return n
          ? { data: [], error: n }
          : { data: [...(s?.active ?? []), ...(s?.history ?? [])], error: null };
      }),
      (e.getMyReservations = x),
      (e.getReservationsForTrip = M),
      (e.subscribeToReservations = function (t, s) {
        const n = (0, r(d[0]).getSupabase)();
        if (!t || String(t).startsWith('local-')) return () => {};
        const o = async () => {
          const { data: n } = await M(t);
          s(n ?? []);
        };
        if (!n)
          return (0, r(d[5]).subscribeWithPollFallback)({
            pollMs: r(d[6]).RESERVATION_POLL_MS,
            onRefresh: o,
            bindChannel: () => null,
          });
        const l = `trip-reservations-${t}`;
        return (0, r(d[5]).subscribeWithPollFallback)({
          pollMs: r(d[6]).RESERVATION_POLL_MS,
          onRefresh: o,
          bindChannel: (s, o) => {
            const u = n
              .channel(l)
              .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'reservations', filter: `trip_id=eq.${t}` },
                s
              )
              .on(
                'postgres_changes',
                {
                  event: '*',
                  schema: 'public',
                  table: 'reservations',
                  filter: `mate_trip_id=eq.${t}`,
                },
                s
              )
              .subscribe(o);
            return {
              remove: () => {
                n.removeChannel(u).catch(() => {});
              },
            };
          },
        });
      }));
    const t = (e.RESERVATION_ALREADY_EXISTS_MESSAGE =
        'You already have an active reservation for this trip'),
      s = ['pending', 'confirmed', 'active'],
      n =
        '\n  *,\n  trips (\n    id, route, origin, destination, fare_per_seat, vehicle_type, status, mate_id,\n    plate_number, vehicle_model, track_share_token,\n    profiles!mate_id ( id, full_name, phone_number, vehicle_registration, vehicle_type, trust_score, momo_merchant_code )\n  ),\n  mate_trips (\n    id, route_label, origin, destination, plate_number, status, fare_per_seat, mate_id,\n    track_share_token,\n    profiles:mate_id ( id, full_name, phone_number, vehicle_registration, vehicle_type, trust_score, momo_merchant_code )\n  ),\n  trotroride_trips (\n    id, route_label, origin, destination, plate_number, status, fare_per_seat, vehicle_model, driver_id,\n    track_share_token,\n    profiles:driver_id ( id, full_name, phone_number, vehicle_registration, vehicle_type, trust_score, momo_merchant_code )\n  )\n',
      o =
        '\n  *,\n  mate_trips (\n    id, route_label, origin, destination, plate_number, status,\n    profiles:mate_id ( full_name, trust_score )\n  ),\n  trotroride_trips (\n    id, route_label, origin, destination, plate_number, status,\n    profiles:driver_id ( full_name, trust_score )\n  )\n';
    function l() {
      const t = (0, r(d[0]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function u() {
      const t = new Error('Sorry, this seat was just taken. Try another vehicle.');
      return ((t.code = 'seat_unavailable'), t);
    }
    function c(t) {
      const s = t?.message ?? '';
      return s.includes('seat_unavailable') || s.includes('just taken');
    }
    function _(s) {
      if (!s) return 'Could not reserve seat. Try again.';
      const n = s.message ?? '';
      return c(s)
        ? 'Sorry, this seat was just taken. Try another vehicle.'
        : n.includes('reservation_rate_limited')
          ? 'Too many reservation attempts this hour. Wait a few minutes and try again.'
          : n.includes('too_many_active_reservations')
            ? 'You already have several active reservations. Cancel one before booking another seat.'
            : n.includes('not_authorized')
              ? 'Permission denied. Sign out and sign back in, then try again.'
              : (0, r(d[1]).isForeignKeyError)(s)
                ? 'This trip is no longer available. Refresh rides and try another vehicle.'
                : (0, r(d[1]).isUniqueViolationError)(s)
                  ? t
                  : (0, r(d[1]).isRlsError)(s)
                    ? 'Permission denied. Sign out and sign back in, then try again.'
                    : (0, r(d[1]).isMissingTableError)(s)
                      ? 'Seat reservations require the latest Supabase migrations.'
                      : n.includes('null value in column "trip_id"')
                        ? 'Reservations need database migration 019 (mate trip seats). Run supabase db push, then try again.'
                        : n || 'Could not reserve seat. Try again.';
    }
    async function p(t, s) {
      const { data: n, error: o } = await t
        .from('mate_trips')
        .select('seats_available, total_seats, status, fare_per_seat')
        .eq('id', s)
        .maybeSingle();
      return o
        ? (0, r(d[1]).isMissingTableError)(o)
          ? { data: null, error: null }
          : { data: null, error: o }
        : n
          ? {
              data: Object.assign(
                {},
                (0, r(d[1]).normalizeTripSeatFields)({
                  available_seats: n.seats_available,
                  total_seats: n.total_seats,
                  status: n.status,
                }),
                { fare_per_seat: n.fare_per_seat, source: 'mate_trips' }
              ),
              error: null,
            }
          : { data: null, error: null };
    }
    async function f(t, n, o) {
      const l = new Date().toISOString(),
        { data: u, error: c } = await t
          .from('reservations')
          .select('*')
          .eq('passenger_id', o)
          .or(`trip_id.eq.${n},mate_trip_id.eq.${n}`)
          .in('status', s)
          .or(`expires_at.is.null,expires_at.gt.${l}`)
          .order('created_at', { ascending: !1 })
          .limit(1)
          .maybeSingle();
      return c && !(0, r(d[1]).isMissingTableError)(c)
        ? { data: null, error: c }
        : { data: u ?? null, error: null };
    }
    async function v(t, s) {
      let n = null;
      for (const o of s) {
        const { data: s, error: l } = await t.from('reservations').insert(o).select().single();
        if (!l) return { data: s, error: null, alreadyExists: !1 };
        if (((n = l), (0, r(d[1]).isUniqueViolationError)(l))) {
          const s = o.trip_id ?? o.mate_trip_id,
            { data: n } = await f(t, s, o.passenger_id);
          if (n) return { data: n, error: null, alreadyExists: !0 };
          break;
        }
        if (!(0, r(d[1]).isMissingColumnError)(l) && !(0, r(d[1]).isForeignKeyError)(l)) break;
      }
      return { data: null, error: n, alreadyExists: !1 };
    }
    async function b(t, s, n, o, l, u) {
      try {
        await t
          .from('mate_trip_reservations')
          .insert({
            mate_trip_id: s,
            reservation_id: n,
            passenger_name: o,
            pickup: l,
            expires_at: u,
            status: 'pending',
          });
      } catch {}
    }
    async function h(t, s) {
      let { data: n, error: o } = await t
        .from('trips')
        .select('available_seats, total_seats, status, fare_per_seat')
        .eq('id', s)
        .maybeSingle();
      return (
        o &&
          (0, r(d[1]).isMissingColumnError)(o) &&
          ({ data: n, error: o } = await t
            .from('trips')
            .select('seats_available, seats_total, status, fare')
            .eq('id', s)
            .maybeSingle()),
        o
          ? { data: null, error: o }
          : n
            ? { data: (0, r(d[1]).normalizeTripSeatFields)(n), error: null }
            : { data: null, error: null }
      );
    }
    async function y(t, s, n, { markFull: o = !1 } = {}) {
      const l = o || 0 === n ? 'full' : void 0,
        u = Object.assign({ available_seats: n }, l ? { status: l } : {});
      let { error: c } = await t.from('trips').update(u).eq('id', s);
      if (c && (0, r(d[1]).isMissingColumnError)(c)) {
        const o = Object.assign({ seats_available: n }, l ? { status: l } : {});
        ({ error: c } = await t.from('trips').update(o).eq('id', s));
      }
      return c;
    }
    async function w(t, s, n) {
      const o = Math.min(n.total_seats ?? n.seats_total ?? 0, (n.available_seats ?? 0) + 1),
        l = 'full' === n.status && o > 0 ? 'active' : n.status;
      let { error: u } = await t
        .from('trips')
        .update({ available_seats: o, status: l })
        .eq('id', s);
      return (
        u &&
          (0, r(d[1]).isMissingColumnError)(u) &&
          ({ error: u } = await t
            .from('trips')
            .update({ seats_available: o, status: l })
            .eq('id', s)),
        u
      );
    }
    async function E(t, s, n) {
      const o = Math.min(n.total_seats ?? 0, (n.available_seats ?? 0) + 1),
        l = 'full' === n.status && o > 0 ? 'active' : n.status,
        { error: u } = await t
          .from('mate_trips')
          .update({ seats_available: o, status: l })
          .eq('id', s);
      return u;
    }
    function S(t) {
      return `trip_id.eq.${t},mate_trip_id.eq.${t}`;
    }
    async function T(t, s) {
      if (!s) return null;
      const { data: n } = await h(t, s);
      if (n) return w(t, s, n);
      const o = await p(t, s);
      return o.data ? E(t, s, o.data) : null;
    }
    async function q(t, s) {
      const { supabase: n, error: o } = l();
      if (o) return { data: null, error: o };
      if ((0, r(d[2]).isLocalPassengerId)(t))
        return { data: { id: t, status: 'cancelled' }, error: null };
      const { data: u, error: c } = await n
        .from('reservations')
        .select('trip_id, mate_trip_id, trotroride_trip_id, trip_type, seats')
        .eq('id', t)
        .maybeSingle();
      if (c) return { data: null, error: c };
      const _ = 'trotroride' === u?.trip_type || u?.trotroride_trip_id,
        p = _ ? (u?.trotroride_trip_id ?? s) : (s ?? u?.trip_id ?? u?.mate_trip_id);
      if (_ && p) {
        const { data: s, error: o } = await n
          .from('reservations')
          .update({ status: 'cancelled' })
          .eq('id', t)
          .select()
          .single();
        if (o) return { data: null, error: o };
        const { data: l } = await n
          .from('trotroride_trips')
          .select('seats_available, max_passengers, current_passengers')
          .eq('id', p)
          .maybeSingle();
        if (l) {
          const t = u?.seats ?? 1;
          await n
            .from('trotroride_trips')
            .update({
              seats_available: Math.min(l.max_passengers ?? 3, (l.seats_available ?? 0) + t),
              current_passengers: Math.max(0, (l.current_passengers ?? 0) - t),
            })
            .eq('id', p);
        }
        return (await (0, r(d[4]).invalidateLiveTripsCache)(), { data: s, error: null });
      }
      try {
        const { data: s, error: o } = await n.rpc('cancel_trip_reservation', {
          p_reservation_id: t,
          p_trip_id: p,
        });
        if (!o && s) return { data: s, error: null };
      } catch {}
      const { data: f, error: v } = await n
        .from('reservations')
        .update({ status: 'cancelled' })
        .eq('id', t)
        .select()
        .single();
      return v
        ? { data: null, error: v }
        : (await T(n, p), await (0, r(d[4]).invalidateLiveTripsCache)(), { data: f, error: null });
    }
    const R = '\n  *,\n  profiles:passenger_id ( full_name, phone_number, trust_score )\n';
    async function M(t) {
      const { supabase: s, error: n } = l();
      if (n) return { data: [], error: n };
      const o = new Date().toISOString();
      let { data: u, error: c } = await s
        .from('reservations')
        .select(R)
        .or(S(t))
        .in('status', ['pending', 'confirmed', 'active'])
        .gt('expires_at', o)
        .order('created_at', { ascending: !0 });
      return (
        c &&
          (0, r(d[1]).isRelationshipSelectError)(c) &&
          ({ data: u, error: c } = await s
            .from('reservations')
            .select('*')
            .or(S(t))
            .in('status', ['pending', 'confirmed', 'active'])
            .gt('expires_at', o)
            .order('created_at', { ascending: !0 })),
        c && (0, r(d[1]).isMissingTableError)(c)
          ? { data: [], error: null }
          : { data: u ?? [], error: c }
      );
    }
    async function x(t) {
      let s = [],
        u = [],
        c = null;
      const _ = await (0, r(d[2]).getHiddenHistoryIds)(t),
        { supabase: p, error: f } = l();
      if (!f && p) {
        const l = new Date().toISOString(),
          { data: f, error: v } = await p
            .from('reservations')
            .select(n)
            .eq('passenger_id', t)
            .in('status', ['pending', 'active', 'confirmed'])
            .or(`expires_at.is.null,expires_at.gt.${l}`)
            .order('created_at', { ascending: !1 });
        if (
          (v && !(0, r(d[1]).isMissingTableError)(v)
            ? (c = v)
            : (s = (f ?? []).map(r(d[7]).reservationToMyTrip)),
          !c)
        ) {
          const { data: s, error: n } = await p
            .from('reservations')
            .select(o)
            .eq('passenger_id', t)
            .in('status', ['boarded', 'completed', 'cancelled', 'expired', 'no_show'])
            .order('created_at', { ascending: !1 })
            .limit(50);
          n && !(0, r(d[1]).isMissingTableError)(n)
            ? (c = n)
            : (u = (s ?? []).map(r(d[7]).reservationToMyTrip).filter(t => !_.has(t.id)));
        }
      }
      const v = await (0, r(d[2]).getLocalPassengerTrips)(t),
        b = new Set(s.map(t => t.id));
      v.active.forEach(t => {
        if (b.has(t.id)) return;
        (t.localOnly || String(t.id).startsWith('local-')) && s.unshift(t);
      });
      const h = new Set(u.map(t => t.id));
      return (
        v.history.forEach(t => {
          h.has(t.id) || _.has(t.id) || u.unshift(t);
        }),
        { data: { active: s, history: u }, error: c }
      );
    }
  },
  1523,
  [502, 558, 935, 508, 755, 689, 938, 939, 1524]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.generateVerificationCode = function () {
        const n = 1e5,
          t = 9e5,
          o = 'undefined' != typeof crypto ? crypto : null;
        if (o?.getRandomValues) {
          const u = new Uint32Array(1);
          return (o.getRandomValues(u), String(n + (u[0] % t)));
        }
        return String(n + Math.floor(Math.random() * t));
      }));
  },
  1524,
  []
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.MoMoPaymentBody = y),
      (_e.default = function ({
        visible: e,
        mode: o = 'trip',
        amount: t,
        seatFare: n = null,
        platformFee: r = null,
        merchantCode: l,
        ghqrPayload: i,
        reference: s,
        onPaid: u,
        onPayOnBoard: c,
        onClose: M,
        topUpAmount: j,
        onTopUpAmountChange: S,
        onConfirmTopUp: C,
        cashOutAmount: w,
        onCashOutAmountChange: T,
        momoNumber: F,
        onMomoNumberChange: P,
        maxCashOut: O = 0,
        onConfirmCashOut: k,
        loading: A = !1,
      }) {
        const H = r ?? t ?? 0,
          L = null != n && null != r,
          R =
            'topup' === o
              ? 'Top up wallet'
              : 'cashout' === o
                ? 'Cash out to MoMo'
                : 'Pay with MoMo / GhQR',
          v =
            'topup' === o
              ? 'MoMo credit \u2192 in-app GHS wallet'
              : 'cashout' === o
                ? 'Usually 24\u201348 hours'
                : L
                  ? `GHS ${H.toFixed(2)} platform fee due now`
                  : `GHS ${H.toFixed(2)} platform fee`;
        return (0, p.jsxs)(f.default, {
          visible: e,
          title: R,
          subtitle: v,
          onClose: M,
          confirmTitle: null,
          showCancelButton: !1,
          children: [
            'topup' === o
              ? (0, p.jsx)(x, {
                  amount: j,
                  onAmountChange: S,
                  merchantCode: l || _r(d[15]).PLATFORM_MOMO_MERCHANT_CODE,
                  onConfirm: C,
                  loading: A,
                })
              : null,
            'cashout' === o
              ? (0, p.jsx)(b, {
                  amount: w,
                  onAmountChange: T,
                  momoNumber: F,
                  onMomoNumberChange: P,
                  maxAmount: O,
                  onConfirm: k,
                  loading: A,
                })
              : null,
            'trip' === o
              ? (0, p.jsx)(y, {
                  amount: t,
                  seatFare: n,
                  platformFee: r,
                  merchantCode: l,
                  ghqrPayload: i,
                  reference: s,
                  onPaid: u,
                  onPayOnBoard: c,
                })
              : null,
            (0, p.jsx)(h.default, { title: 'Close', variant: 'ghost', onPress: M }),
          ],
        });
      }));
    var o = _r(d[1]),
      t = e(_r(d[2])),
      n = e(_r(d[3])),
      r = e(_r(d[4])),
      l = e(_r(d[5])),
      i = e(_r(d[6])),
      s = e(_r(d[7])),
      u = e(_r(d[8])),
      c = (function (e, o) {
        if ('function' == typeof WeakMap)
          var t = new WeakMap(),
            n = new WeakMap();
        return (function (e, o) {
          if (!o && e && e.__esModule) return e;
          var r,
            l,
            i = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return i;
          if ((r = o ? n : t)) {
            if (r.has(e)) return r.get(e);
            r.set(e, i);
          }
          for (const o in e)
            'default' !== o &&
              {}.hasOwnProperty.call(e, o) &&
              ((l = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, o)) &&
              (l.get || l.set)
                ? r(i, o, l)
                : (i[o] = e[o]));
          return i;
        })(e, o);
      })(_r(d[9])),
      f = e(_r(d[10])),
      h = e(_r(d[11])),
      p = _r(d[12]);
    function y({
      amount: e,
      seatFare: r = null,
      platformFee: l = null,
      merchantCode: f,
      ghqrPayload: y,
      reference: x,
      onPaid: b,
      onPayOnBoard: j,
      requireReference: S = !1,
      confirmTitle: C = 'I have paid',
      hidePayOnBoard: w = !1,
    }) {
      const { colors: T } = (0, _r(d[13]).useTheme)(),
        F = M(T),
        [P, O] = (0, o.useState)(!1),
        [k, A] = (0, o.useState)(x ?? ''),
        H = l ?? e ?? 0,
        L = (S ? k : (x ?? `TOS-${Date.now()}`)).trim(),
        R = y ?? (0, _r(d[14]).buildGhqrPayload)(f, H, L || `TOS-${Date.now()}`),
        v = (0, _r(d[14]).buildMomoDeepLink)(f, H),
        B = null != r && null != l;
      (0, o.useEffect)(() => {
        x && !S && A(x);
      }, [x, S]);
      return (0, p.jsxs)(p.Fragment, {
        children: [
          B
            ? (0, p.jsxs)(t.default, {
                style: F.breakdown,
                children: [
                  (0, p.jsxs)(t.default, {
                    style: F.breakdownRow,
                    children: [
                      (0, p.jsx)(n.default, {
                        style: F.breakdownLabel,
                        children: 'Seat fare (on board)',
                      }),
                      (0, p.jsxs)(n.default, {
                        style: F.breakdownValue,
                        children: ['GHS ', Number(r).toFixed(2)],
                      }),
                    ],
                  }),
                  (0, p.jsxs)(t.default, {
                    style: F.breakdownRow,
                    children: [
                      (0, p.jsx)(n.default, {
                        style: F.breakdownLabelStrong,
                        children: 'Platform fee (pay now)',
                      }),
                      (0, p.jsxs)(n.default, {
                        style: F.breakdownValueStrong,
                        children: ['GHS ', Number(l).toFixed(2)],
                      }),
                    ],
                  }),
                  (0, p.jsxs)(t.default, {
                    style: [F.breakdownRow, F.breakdownTotal],
                    children: [
                      (0, p.jsx)(n.default, {
                        style: F.breakdownLabelStrong,
                        children: 'Trip total',
                      }),
                      (0, p.jsxs)(n.default, {
                        style: F.breakdownValueStrong,
                        children: ['GHS ', (Number(r) + Number(l)).toFixed(2)],
                      }),
                    ],
                  }),
                ],
              })
            : null,
          (0, p.jsxs)(t.default, {
            style: F.qrBox,
            children: [
              (0, p.jsx)(_r(d[16]).Ionicons, {
                name: 'qr-code-outline',
                size: 64,
                color: T.accentText ?? T.primary,
              }),
              (0, p.jsx)(n.default, { style: F.qrHint, children: 'GhQR universal payment' }),
              f
                ? (0, p.jsxs)(n.default, { style: F.merchant, children: ['Merchant: ', f] })
                : (0, p.jsx)(n.default, {
                    style: F.merchantMuted,
                    children:
                      'Merchant code not set yet \u2014 use MoMo to the number shown in support, then enter your reference.',
                  }),
              R ? (0, p.jsx)(n.default, { style: F.payload, numberOfLines: 3, children: R }) : null,
            ],
          }),
          S
            ? (0, p.jsxs)(t.default, {
                style: F.refBlock,
                children: [
                  (0, p.jsx)(n.default, {
                    style: F.refLabel,
                    children: 'MoMo transaction reference',
                  }),
                  (0, p.jsx)(u.default, {
                    style: F.refInput,
                    value: k,
                    onChangeText: A,
                    placeholder: 'e.g. 1234567890',
                    placeholderTextColor: T.textMuted,
                    autoCapitalize: 'characters',
                  }),
                ],
              })
            : null,
          (0, p.jsxs)(t.default, {
            style: F.actions,
            children: [
              (0, p.jsx)(h.default, {
                title: P ? 'Copied' : 'Copy GhQR payload',
                variant: 'secondary',
                onPress: async () => {
                  R && (await c.setStringAsync(R), O(!0), setTimeout(() => O(!1), 2e3));
                },
              }),
              (0, p.jsx)(h.default, {
                title: 'Open MoMo app',
                onPress: async () => {
                  if (!v)
                    return void s.default.alert(
                      'MoMo',
                      'Scan the GhQR code or pay using the merchant code below.'
                    );
                  (await i.default.canOpenURL(v))
                    ? await i.default.openURL(v)
                    : s.default.alert(
                        'MTN MoMo',
                        'Open your MoMo app and pay using the merchant code below.'
                      );
                },
              }),
              (0, p.jsx)(h.default, {
                title: C,
                onPress: () => {
                  !S || L
                    ? b?.({ method: _r(d[15]).PAYMENT_METHODS.MOMO, reference: L })
                    : s.default.alert(
                        'Reference required',
                        'Enter the MoMo transaction ID from your SMS.'
                      );
                },
              }),
              w
                ? null
                : (0, p.jsx)(h.default, {
                    title: 'Pay on board instead',
                    variant: 'ghost',
                    onPress: () => j?.({ method: _r(d[15]).PAYMENT_METHODS.PAY_ON_BOARD }),
                  }),
            ],
          }),
        ],
      });
    }
    function x({ amount: e, onAmountChange: r, merchantCode: l, onConfirm: c, loading: f }) {
      const { colors: y } = (0, _r(d[13]).useTheme)(),
        x = M(y),
        [b, j] = (0, o.useState)(''),
        S = Number(e) || 0,
        C = l || _r(d[15]).PLATFORM_MOMO_MERCHANT_CODE,
        w = S > 0 ? (0, _r(d[14]).buildGhqrPayload)(C, S, b || `TOPUP-${Date.now()}`) : null,
        T = S > 0 ? (0, _r(d[14]).buildMomoDeepLink)(C, S) : null;
      return (0, p.jsxs)(t.default, {
        style: x.actions,
        children: [
          (0, p.jsx)(n.default, {
            style: x.modeHint,
            children:
              'Send MoMo to the TrotroOS wallet merchant, then confirm with your transaction ID.',
          }),
          (0, p.jsx)(n.default, { style: x.refLabel, children: 'Amount (GHS)' }),
          (0, p.jsx)(u.default, {
            style: x.refInput,
            value: e,
            onChangeText: r,
            keyboardType: 'decimal-pad',
            placeholder: 'e.g. 20',
            placeholderTextColor: y.textMuted,
          }),
          (0, p.jsxs)(t.default, {
            style: x.qrBox,
            children: [
              (0, p.jsx)(_r(d[16]).Ionicons, {
                name: 'wallet-outline',
                size: 48,
                color: y.primary,
              }),
              C
                ? (0, p.jsxs)(n.default, { style: x.merchant, children: ['Merchant: ', C] })
                : (0, p.jsx)(n.default, {
                    style: x.merchantMuted,
                    children:
                      'Ask support for the wallet top-up MoMo number, then paste your reference below.',
                  }),
              w ? (0, p.jsx)(n.default, { style: x.payload, numberOfLines: 3, children: w }) : null,
            ],
          }),
          (0, p.jsx)(n.default, { style: x.refLabel, children: 'MoMo transaction reference' }),
          (0, p.jsx)(u.default, {
            style: x.refInput,
            value: b,
            onChangeText: j,
            placeholder: 'From your MoMo SMS',
            placeholderTextColor: y.textMuted,
            autoCapitalize: 'characters',
          }),
          (0, p.jsx)(h.default, {
            title: 'Open MoMo app',
            variant: 'secondary',
            onPress: async () => {
              if (!T)
                return void s.default.alert(
                  'MoMo',
                  'Enter an amount first, then pay with your MoMo app.'
                );
              (await i.default.canOpenURL(T))
                ? await i.default.openURL(T)
                : s.default.alert('MTN MoMo', 'Open MoMo and send to the merchant code below.');
            },
          }),
          (0, p.jsx)(h.default, {
            title: 'Confirm top-up',
            loading: f,
            onPress: () => c?.({ amount: S, reference: b.trim() }),
          }),
        ],
      });
    }
    function b({
      amount: e,
      onAmountChange: o,
      momoNumber: l,
      onMomoNumberChange: i,
      maxAmount: s = 0,
      onConfirm: c,
      loading: f,
    }) {
      const { colors: y } = (0, _r(d[13]).useTheme)(),
        x = M(y),
        b = Number(e) || 0;
      return (0, p.jsxs)(t.default, {
        style: x.actions,
        children: [
          (0, p.jsxs)(n.default, {
            style: x.modeHint,
            children: [
              'Cash-outs usually arrive in 24\u201348 hours. Available balance: GHS',
              ' ',
              Number(s).toFixed(2),
              '.',
            ],
          }),
          (0, p.jsx)(n.default, { style: x.refLabel, children: 'Amount (GHS)' }),
          (0, p.jsx)(u.default, {
            style: x.refInput,
            value: e,
            onChangeText: o,
            keyboardType: 'decimal-pad',
            placeholder: 'Min 5',
            placeholderTextColor: y.textMuted,
          }),
          (0, p.jsx)(r.default, {
            onPress: () => o?.(String(Number(s).toFixed(2))),
            children: (0, p.jsx)(n.default, { style: x.maxLink, children: 'Use full balance' }),
          }),
          (0, p.jsx)(n.default, { style: x.refLabel, children: 'MoMo number' }),
          (0, p.jsx)(u.default, {
            style: x.refInput,
            value: l,
            onChangeText: i,
            keyboardType: 'phone-pad',
            placeholder: '024XXXXXXX',
            placeholderTextColor: y.textMuted,
          }),
          (0, p.jsx)(h.default, {
            title: 'Request cash out',
            loading: f,
            onPress: () => c?.({ amount: b, momoNumber: String(l ?? '').trim() }),
          }),
        ],
      });
    }
    const M = e =>
      l.default.create({
        qrBox: {
          alignItems: 'center',
          backgroundColor: e.surfaceSoft,
          borderRadius: _r(d[17]).radius.lg,
          borderWidth: 1,
          borderColor: e.borderStrong,
          padding: _r(d[17]).spacing.xl,
          marginBottom: _r(d[17]).spacing.lg,
        },
        qrHint: {
          fontFamily: _r(d[17]).fontFamily.medium,
          fontSize: 14,
          lineHeight: 20,
          color: e.textSecondary,
          marginTop: _r(d[17]).spacing.sm,
        },
        merchant: {
          fontFamily: _r(d[17]).fontFamily.semiBold,
          color: e.textPrimary,
          fontSize: 16,
          marginTop: _r(d[17]).spacing.md,
        },
        merchantMuted: {
          fontFamily: _r(d[17]).fontFamily.medium,
          fontSize: 14,
          lineHeight: 20,
          color: e.textSecondary,
          marginTop: _r(d[17]).spacing.md,
          textAlign: 'center',
        },
        payload: {
          fontFamily: _r(d[17]).fontFamily.regular,
          fontSize: 13,
          lineHeight: 18,
          color: e.textSecondary,
          marginTop: _r(d[17]).spacing.sm,
          textAlign: 'center',
        },
        actions: { gap: _r(d[17]).spacing.sm },
        breakdown: {
          backgroundColor: e.surfaceSoft,
          borderRadius: _r(d[17]).radius.lg,
          borderWidth: 1,
          borderColor: e.borderStrong,
          padding: _r(d[17]).spacing.md,
          marginBottom: _r(d[17]).spacing.md,
          gap: _r(d[17]).spacing.sm,
        },
        breakdownRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        breakdownLabel: {
          fontFamily: _r(d[17]).fontFamily.medium,
          fontSize: 14,
          color: e.textSecondary,
        },
        breakdownLabelStrong: {
          fontFamily: _r(d[17]).fontFamily.semiBold,
          fontSize: 14,
          color: e.textPrimary,
        },
        breakdownValue: {
          fontFamily: _r(d[17]).fontFamily.semiBold,
          fontSize: 14,
          color: e.textPrimary,
        },
        breakdownValueStrong: {
          fontFamily: _r(d[17]).fontFamily.bold,
          fontSize: 16,
          color: e.textPrimary,
        },
        breakdownTotal: {
          marginTop: _r(d[17]).spacing.xs,
          paddingTop: _r(d[17]).spacing.sm,
          borderTopWidth: l.default.hairlineWidth,
          borderTopColor: e.borderStrong,
        },
        refBlock: { marginBottom: _r(d[17]).spacing.md, gap: _r(d[17]).spacing.xs },
        refLabel: {
          fontFamily: _r(d[17]).fontFamily.semiBold,
          fontSize: 13,
          color: e.textSecondary,
        },
        refInput: {
          fontFamily: _r(d[17]).fontFamily.medium,
          fontSize: 16,
          color: e.textPrimary,
          borderWidth: 1,
          borderColor: e.borderStrong,
          borderRadius: _r(d[17]).radius.md,
          paddingHorizontal: _r(d[17]).spacing.md,
          paddingVertical: _r(d[17]).spacing.sm,
          backgroundColor: e.surface,
        },
        modeHint: {
          fontFamily: _r(d[17]).fontFamily.regular,
          fontSize: 14,
          lineHeight: 20,
          color: e.textSecondary,
          marginBottom: _r(d[17]).spacing.sm,
        },
        maxLink: {
          fontFamily: _r(d[17]).fontFamily.semiBold,
          fontSize: 13,
          color: e.primary,
          marginBottom: _r(d[17]).spacing.sm,
        },
      });
  },
  1525,
  [1, 5, 19, 161, 326, 26, 667, 678, 255, 1526, 1515, 672, 183, 381, 1522, 508, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    Object.defineProperty(e, '__esModule', { value: !0 });
    var n = {
      getStringAsync: !0,
      setStringAsync: !0,
      setString: !0,
      hasStringAsync: !0,
      getUrlAsync: !0,
      setUrlAsync: !0,
      hasUrlAsync: !0,
      getImageAsync: !0,
      setImageAsync: !0,
      hasImageAsync: !0,
      addClipboardListener: !0,
      removeClipboardListener: !0,
      isPasteButtonAvailable: !0,
      ClipboardPasteButton: !0,
    };
    (Object.defineProperty(e, 'ClipboardPasteButton', {
      enumerable: !0,
      get: function () {
        return r(d[1]).ClipboardPasteButton;
      },
    }),
      (e.addClipboardListener = function (t) {
        return s.default.addListener(c, n => {
          const s = Object.assign({}, n, {
            get content() {
              return (
                console.warn(
                  "The 'content' property of the clipboard event is deprecated. Use 'getStringAsync()' instead to get clipboard content"
                ),
                ''
              );
            },
          });
          t(s);
        });
      }),
      (e.getImageAsync = async function (t) {
        if (!s.default.getImageAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'getImageAsync');
        return await s.default.getImageAsync(t);
      }),
      (e.getStringAsync = async function (t = {}) {
        if (!s.default.getStringAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'getStringAsync');
        return await s.default.getStringAsync(t);
      }),
      (e.getUrlAsync = async function () {
        if (!s.default.getUrlAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'getUrlAsync');
        return await s.default.getUrlAsync();
      }),
      (e.hasImageAsync = async function () {
        if (!s.default.hasImageAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'hasImageAsync');
        return s.default.hasImageAsync();
      }),
      (e.hasStringAsync = function () {
        if (!s.default.hasStringAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'hasStringAsync');
        return s.default.hasStringAsync();
      }),
      (e.hasUrlAsync = async function () {
        if (!s.default.hasUrlAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'hasUrlAsync');
        return await s.default.hasUrlAsync();
      }),
      (e.isPasteButtonAvailable = void 0),
      (e.removeClipboardListener = function (t) {
        t.remove();
      }),
      (e.setImageAsync = async function (t) {
        if (!s.default.setImageAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'setImageAsync');
        return s.default.setImageAsync(t);
      }),
      (e.setString = function (t) {
        return s.default.setString(t);
      }),
      (e.setStringAsync = async function (t, n = {}) {
        if (!s.default.setStringAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'setStringAsync');
        return s.default.setStringAsync(t, n);
      }),
      (e.setUrlAsync = async function (t) {
        if (!s.default.setUrlAsync)
          throw new (r(d[4]).UnavailabilityError)('Clipboard', 'setUrlAsync');
        return s.default.setUrlAsync(t);
      }));
    var s = t(r(d[2]));
    Object.keys(r(d[3])).forEach(function (t) {
      'default' !== t &&
        '__esModule' !== t &&
        (Object.prototype.hasOwnProperty.call(n, t) ||
          (t in e && e[t] === r(d[3])[t]) ||
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return r(d[3])[t];
            },
          }));
    });
    const c = 'onClipboardChanged';
    e.isPasteButtonAvailable = !1;
  },
  1526,
  [1, 1527, 1529, 1532, 339]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ClipboardPasteButton = function (t) {
        let { onPress: l } = t,
          f = (0, n.default)(t, o);
        if (!s.default) return null;
        return (0, u.jsx)(
          s.default,
          Object.assign(
            {
              onPastePressed: ({ nativeEvent: t }) => {
                l(t);
              },
            },
            f
          )
        );
      }));
    var n = t(r(d[1])),
      s = (t(r(d[2])), t(r(d[3]))),
      u = r(d[4]);
    const o = ['onPress'];
  },
  1527,
  [1, 4, 5, 1528, 183]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    o(r(d[1]));
    e.default = void 0;
  },
  1528,
  [1, 14]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'default', {
        enumerable: !0,
        get: function () {
          return n.default;
        },
      }));
    var n = t(r(d[1]));
  },
  1529,
  [1, 1530]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    e.default = {
      async getStringAsync(t) {
        if (!navigator.clipboard) throw new (r(d[0]).ClipboardUnavailableException)();
        try {
          if (t.preferredFormat === r(d[1], '../Clipboard.types').StringFormat.HTML) {
            const t = await navigator.clipboard.read(),
              o = await (0, r(d[2]).findHtmlInClipboardAsync)(t);
            return o ? await new Response(o).text() : await navigator.clipboard.readText();
          }
          {
            let t = await navigator.clipboard.readText();
            if (!t || '' === t) {
              const o = await navigator.clipboard.read(),
                n = await (0, r(d[2]).findHtmlInClipboardAsync)(o),
                c = await n?.text();
              t = (0, r(d[2]).htmlToPlainText)(c ?? '');
            }
            return t;
          }
        } catch (t) {
          if (
            ('object' == typeof t && 'NotAllowedError' === t?.name) ||
            (await (0, r(d[2]).isClipboardPermissionDeniedAsync)())
          )
            throw new (r(d[0]).NoPermissionException)();
          try {
            return window.clipboardData.getData('Text');
          } catch {
            return Promise.reject(new Error('Unable to retrieve item from clipboard'));
          }
        }
      },
      setString(t) {
        const o = document.createElement('textarea');
        ((o.textContent = t), document.body.appendChild(o), o.select());
        try {
          return (document.execCommand('copy'), !0);
        } catch {
          return !1;
        } finally {
          document.body.removeChild(o);
        }
      },
      async setStringAsync(t, o) {
        if (o.inputFormat === r(d[1]).StringFormat.HTML) {
          if (!navigator.clipboard) throw new (r(d[0]).ClipboardUnavailableException)();
          try {
            const o =
              ((n = t),
              new ClipboardItem({
                'text/html': new Blob([n], { type: 'text/html' }),
                'text/plain': new Blob([(0, r(d[2]).htmlToPlainText)(n)], { type: 'text/plain' }),
              }));
            return (await navigator.clipboard.write([o]), !0);
          } catch (t) {
            if (
              ('object' == typeof t && 'NotAllowedError' === t?.name) ||
              (await (0, r(d[2]).isClipboardPermissionDeniedAsync)())
            )
              throw new (r(d[0]).NoPermissionException)();
            throw new (r(d[0]).CopyFailureException)(t.message);
          }
        }
        try {
          if (!navigator.clipboard) throw new Error();
          return (await navigator.clipboard.writeText(t), !0);
        } catch {
          return this.setString(t);
        }
        var n;
      },
      hasStringAsync: async () => await t(['text/plain', 'text/html']),
      async getImageAsync(t) {
        if (!navigator.clipboard) throw new (r(d[0]).ClipboardUnavailableException)();
        try {
          const t = await navigator.clipboard.read(),
            o = await (0, r(d[2]).findImageInClipboardAsync)(t);
          if (!o) return null;
          const [n, c] = await Promise.all([
            (0, r(d[2]).blobToBase64Async)(o),
            (0, r(d[2]).getImageSizeFromBlobAsync)(o),
          ]);
          return { data: n, size: c };
        } catch (t) {
          if (
            ('object' == typeof t && 'NotAllowedError' === t?.name) ||
            (await (0, r(d[2]).isClipboardPermissionDeniedAsync)())
          )
            throw new (r(d[0]).NoPermissionException)();
          throw new (r(d[0]).PasteFailureException)(t.message);
        }
      },
      async setImageAsync(t) {
        if (!navigator.clipboard) throw new (r(d[0]).ClipboardUnavailableException)();
        try {
          const o = (0, r(d[2]).base64toBlob)(t, 'image/png');
          await navigator.clipboard.write([new ClipboardItem({ [o.type]: o })]);
        } catch (t) {
          throw new (r(d[0]).CopyFailureException)(t.message);
        }
      },
      hasImageAsync: async () => await t(['image/png', 'image/jpeg']),
      addClipboardListener() {},
      removeClipboardListener() {},
    };
    async function t(t) {
      if (!navigator.clipboard) throw new (r(d[0]).ClipboardUnavailableException)();
      try {
        return (await navigator.clipboard.read()).flatMap(t => t.types).some(o => t.includes(o));
      } catch (t) {
        if (
          ('object' == typeof t && 'NotAllowedError' === t?.name) ||
          (await (0, r(d[2]).isClipboardPermissionDeniedAsync)())
        )
          throw new (r(d[0]).NoPermissionException)();
        throw t;
      }
    }
  },
  1530,
  [1531, 1532, 1533]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.PasteFailureException =
        e.NoPermissionException =
        e.CopyFailureException =
        e.ClipboardUnavailableException =
          void 0));
    class o extends r(d[0]).CodedError {
      constructor() {
        super(
          'ERR_CLIPBOARD_UNAVAILABLE',
          "The 'AsyncClipboard' API is not available on this browser"
        );
      }
    }
    e.ClipboardUnavailableException = o;
    class s extends r(d[0]).CodedError {
      constructor(o) {
        super('ERR_COPY_FAILURE', `Failed to copy to clipboard: ${o}`);
      }
    }
    e.CopyFailureException = s;
    class t extends r(d[0]).CodedError {
      constructor(o) {
        super('ERR_COPY_FAILURE', `Failed to paste from clipboard: ${o}`);
      }
    }
    e.PasteFailureException = t;
    class c extends r(d[0]).CodedError {
      constructor() {
        super('ERR_NO_PERMISSION', 'User denied permission to access clipboard');
      }
    }
    e.NoPermissionException = c;
  },
  1531,
  [339]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t, n;
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.StringFormat = e.ContentType = void 0),
      (function (t) {
        ((t.PLAIN_TEXT = 'plain-text'), (t.HTML = 'html'), (t.IMAGE = 'image'), (t.URL = 'url'));
      })(t || (e.ContentType = t = {})),
      (function (t) {
        ((t.PLAIN_TEXT = 'plainText'), (t.HTML = 'html'));
      })(n || (e.StringFormat = n = {})));
  },
  1532,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.base64toBlob = function (n, t) {
        t = t || '';
        const o = 1024,
          i = atob(n),
          s = i.length,
          c = Math.ceil(s / o),
          l = new Array(c);
        for (let n = 0; n < c; ++n) {
          const t = n * o,
            c = Math.min(t + o, s),
            u = new Array(c - t);
          for (let n = t, o = 0; n < c; ++o, ++n) u[o] = i[n].charCodeAt(0);
          l[n] = new Uint8Array(u);
        }
        return new Blob(l, { type: t });
      }),
      (e.blobToBase64Async = function (n) {
        return new Promise((t, o) => {
          const i = new FileReader();
          ((i.onloadend = () => t(i.result)), i.readAsDataURL(n));
        });
      }),
      (e.findHtmlInClipboardAsync = async function (n) {
        for (const t of n)
          if (t.types.some(n => 'text/html' === n)) return await t.getType('text/html');
        return null;
      }),
      (e.findImageInClipboardAsync = async function (n) {
        for (const t of n) {
          if (t.types.some(n => 'image/png' === n)) return await t.getType('image/png');
          if (t.types.some(n => 'image/jpeg' === n)) return await t.getType('image/jpeg');
        }
        return null;
      }),
      (e.getImageSizeFromBlobAsync = function (n) {
        return new Promise((t, o) => {
          const i = URL.createObjectURL(n),
            s = document.createElement('img');
          ((s.src = i),
            (s.onload = function () {
              t({ width: s.width, height: s.height });
            }));
        });
      }),
      (e.htmlToPlainText = function (n) {
        const t = document.createElement('div');
        return ((t.innerHTML = n), t.textContent || t.innerText || '');
      }),
      (e.isClipboardPermissionDeniedAsync = async function () {
        return 'denied' === (await navigator.permissions.query({ name: 'clipboard-read' })).state;
      }));
  },
  1533,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        icon: t = 'bus-outline',
        title: l,
        message: y,
        actionLabel: p,
        onAction: x,
        actionLoading: f = !1,
        actionTestID: h,
        children: j,
        secondaryActionLabel: b,
        onSecondaryAction: A,
      }) {
        const { colors: I } = (0, r(d[7]).useTheme)(),
          P = u(I);
        return (0, c.jsxs)(n.default, {
          style: P.container,
          children: [
            (0, c.jsx)(n.default, {
              style: P.iconWrap,
              children: (0, c.jsx)(r(d[8]).Ionicons, { name: t, size: 32, color: I.onPrimary }),
            }),
            (0, c.jsx)(o.default, { style: P.title, children: l }),
            y ? (0, c.jsx)(o.default, { style: P.message, children: y }) : null,
            j,
            p && x
              ? (0, c.jsx)(s.default, {
                  title: p,
                  onPress: x,
                  compact: !0,
                  noMargin: !0,
                  loading: f,
                  disabled: f,
                  testID: h,
                })
              : null,
            b && A
              ? (0, c.jsx)(n.default, {
                  style: P.secondary,
                  children: (0, c.jsx)(s.default, {
                    title: b,
                    onPress: A,
                    variant: 'ghost',
                    compact: !0,
                    noMargin: !0,
                  }),
                })
              : null,
          ],
        });
      }));
    var n = t(r(d[1])),
      o = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = r(d[5]);
    const u = t =>
      l.default.create({
        container: {
          alignItems: 'center',
          paddingVertical: r(d[6]).spacing.xxxl,
          paddingHorizontal: r(d[6]).spacing.xl,
        },
        iconWrap: {
          width: 72,
          height: 72,
          borderRadius: r(d[6]).radius.md,
          backgroundColor: t.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: r(d[6]).spacing.lg,
        },
        title: {
          fontFamily: r(d[6]).fontFamily.bold,
          fontSize: 20,
          color: t.textPrimary,
          textAlign: 'center',
          marginBottom: r(d[6]).spacing.sm,
        },
        message: Object.assign({}, r(d[6]).typography.body, {
          color: t.textSecondary,
          textAlign: 'center',
          marginBottom: r(d[6]).spacing.lg,
          maxWidth: 300,
        }),
        secondary: { marginTop: r(d[6]).spacing.sm },
      });
  },
  1534,
  [1, 19, 161, 26, 672, 183, 377, 381, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ options: t, value: o, onChange: f, compact: b = !1 }) {
        const { colors: v } = (0, r(d[7]).useTheme)(),
          y = u(v, b);
        return (0, c.jsx)(s.default, {
          style: y.track,
          children: t.map(t => {
            const s = o === t.value;
            return (0, c.jsx)(
              n.default,
              {
                style: [y.segment, s && y.segmentActive],
                onPress: () => f(t.value),
                children: (0, c.jsx)(l.default, {
                  style: [y.label, s && y.labelActive],
                  numberOfLines: 1,
                  children: t.label,
                }),
              },
              t.value
            );
          }),
        });
      }));
    var n = t(r(d[1])),
      o = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = r(d[5]);
    const u = (t, n = !1) =>
      o.default.create({
        track: {
          flexDirection: 'row',
          backgroundColor: t.surface,
          borderRadius: r(d[6]).radius.md,
          padding: 3,
          borderWidth: 1,
          borderColor: t.border,
        },
        segment: {
          flex: 1,
          minHeight: n ? 36 : 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: r(d[6]).radius.sm,
          paddingHorizontal: n ? r(d[6]).spacing.xs : r(d[6]).spacing.sm,
        },
        segmentActive: { backgroundColor: t.primary },
        label: { fontFamily: r(d[6]).fontFamily.medium, fontSize: n ? 12 : 14, color: t.textMuted },
        labelActive: { fontFamily: r(d[6]).fontFamily.bold, color: t.onPrimary },
      });
  },
  1535,
  [1, 326, 26, 161, 19, 183, 377, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TRIP_CARD_ESTIMATED_HEIGHT =
        e.SECTION_HEADER_HEIGHT =
        e.PASSENGER_ROW_ESTIMATED_HEIGHT =
        e.MARKET_CARD_ESTIMATED_HEIGHT =
        e.FLAT_LIST_DEFAULTS =
        e.FLASH_LIST_DEFAULTS =
          void 0),
      (e.fixedGetItemLayout = function (T) {
        return (E, _) => ({ length: T, offset: T * _, index: _ });
      }));
    const T = (e.TRIP_CARD_ESTIMATED_HEIGHT = 248);
    ((e.SECTION_HEADER_HEIGHT = 44),
      (e.MARKET_CARD_ESTIMATED_HEIGHT = 120),
      (e.PASSENGER_ROW_ESTIMATED_HEIGHT = 88),
      (e.FLASH_LIST_DEFAULTS = {
        estimatedItemSize: T,
        drawDistance: 400,
        removeClippedSubviews: !0,
      }),
      (e.FLAT_LIST_DEFAULTS = {
        initialNumToRender: 8,
        maxToRenderPerBatch: 5,
        windowSize: 5,
        removeClippedSubviews: !0,
        updateCellsBatchingPeriod: 50,
      }));
  },
  1536,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    if (
      (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.LayoutCommitObserver =
        e.useFlashListContext =
        e.Cancellable =
        e.autoScroll =
        e.JSFPSMonitor =
        e.useMappingHelper =
        e.useRecyclingState =
        e.useLayoutState =
        e.useFlatListBenchmark =
        e.useDataMultiplier =
        e.useBenchmark =
        e.AnimatedFlashList =
        e.RenderTargetOptions =
        e.FlashList =
          void 0),
      Object.defineProperty(e, 'FlashList', {
        enumerable: !0,
        get: function () {
          return r(d[0]).FlashList;
        },
      }),
      Object.defineProperty(e, 'RenderTargetOptions', {
        enumerable: !0,
        get: function () {
          return r(d[1]).RenderTargetOptions;
        },
      }),
      Object.defineProperty(e, 'AnimatedFlashList', {
        enumerable: !0,
        get: function () {
          return r(d[2]).__importDefault(r(d[3])).default;
        },
      }),
      Object.defineProperty(e, 'useBenchmark', {
        enumerable: !0,
        get: function () {
          return r(d[4]).useBenchmark;
        },
      }),
      Object.defineProperty(e, 'useDataMultiplier', {
        enumerable: !0,
        get: function () {
          return r(d[5]).useDataMultiplier;
        },
      }),
      Object.defineProperty(e, 'useFlatListBenchmark', {
        enumerable: !0,
        get: function () {
          return r(d[6]).useFlatListBenchmark;
        },
      }),
      Object.defineProperty(e, 'useLayoutState', {
        enumerable: !0,
        get: function () {
          return r(d[7]).useLayoutState;
        },
      }),
      Object.defineProperty(e, 'useRecyclingState', {
        enumerable: !0,
        get: function () {
          return r(d[8]).useRecyclingState;
        },
      }),
      Object.defineProperty(e, 'useMappingHelper', {
        enumerable: !0,
        get: function () {
          return r(d[9]).useMappingHelper;
        },
      }),
      Object.defineProperty(e, 'JSFPSMonitor', {
        enumerable: !0,
        get: function () {
          return r(d[10]).JSFPSMonitor;
        },
      }),
      Object.defineProperty(e, 'autoScroll', {
        enumerable: !0,
        get: function () {
          return r(d[11]).autoScroll;
        },
      }),
      Object.defineProperty(e, 'Cancellable', {
        enumerable: !0,
        get: function () {
          return r(d[11]).Cancellable;
        },
      }),
      Object.defineProperty(e, 'useFlashListContext', {
        enumerable: !0,
        get: function () {
          return r(d[12]).useFlashListContext;
        },
      }),
      Object.defineProperty(e, 'LayoutCommitObserver', {
        enumerable: !0,
        get: function () {
          return r(d[13]).LayoutCommitObserver;
        },
      }),
      !(0, r(d[14]).isNewArch)())
    )
      throw new Error(r(d[15]).ErrorMessages.flashListV2OnlySupportsNewArchitecture);
  },
  1537,
  [1538, 1602, 518, 1603, 1604, 1608, 1609, 1570, 1610, 1611, 1606, 1605, 1571, 1612, 1613, 1576]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.FlashList = void 0),
      Object.defineProperty(e, 'FlashList', {
        enumerable: !0,
        get: function () {
          return r(d[0]).RecyclerView;
        },
      }));
  },
  1538,
  [1539]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RecyclerView = void 0));
    var t = r(d[0]).__importStar(r(d[1])),
      n = function (n, o) {
        var l,
          u = n.horizontal,
          s = n.renderItem,
          c = n.data,
          f = n.extraData,
          h = n.onLoad,
          v = n.CellRendererComponent,
          y = n.overrideProps,
          C =
            (n.refreshing,
            n.onRefresh,
            n.progressViewOffset,
            n.ListEmptyComponent,
            n.ListHeaderComponent,
            n.ListHeaderComponentStyle,
            n.ListFooterComponent,
            n.ListFooterComponentStyle,
            n.ItemSeparatorComponent),
          p = (n.renderScrollComponent, n.style),
          L = n.stickyHeaderIndices,
          w = n.maintainVisibleContentPosition,
          R = n.onCommitLayoutEffect,
          S = r(d[0]).__rest(n, [
            'horizontal',
            'renderItem',
            'data',
            'extraData',
            'onLoad',
            'CellRendererComponent',
            'overrideProps',
            'refreshing',
            'onRefresh',
            'progressViewOffset',
            'ListEmptyComponent',
            'ListHeaderComponent',
            'ListHeaderComponentStyle',
            'ListFooterComponent',
            'ListFooterComponentStyle',
            'ItemSeparatorComponent',
            'renderScrollComponent',
            'style',
            'stickyHeaderIndices',
            'maintainVisibleContentPosition',
            'onCommitLayoutEffect',
          ]),
          E = r(d[0]).__read(
            (0, t.useState)(function () {
              return new (r(d[2]).RenderTimeTracker)();
            }),
            1
          )[0];
        E.startTracking();
        var V = (0, t.useRef)(null),
          M = (0, t.useRef)(null),
          _ = (0, t.useRef)(null),
          x = (0, t.useRef)(void 0),
          I = (0, t.useRef)(new Set()).current,
          k = (0, t.useRef)(new (r(d[3]).Animated.Value)(0)).current,
          D = (0, t.useRef)(null),
          P = (0, t.useRef)(null),
          H = r(d[0]).__read((0, r(d[4]).useLayoutState)(0), 2),
          b = (H[0], H[1]),
          O = r(d[0]).__read((0, t.useState)(0), 2),
          F = (O[0], O[1]),
          z = (0, t.useMemo)(function () {
            return new Map();
          }, []),
          A = (0, r(d[5]).useRecyclerViewManager)(n),
          T = A.recyclerViewManager,
          N = A.velocityTracker,
          W = (0, r(d[6]).useRecyclerViewController)(T, o, V, P),
          B = W.applyOffsetCorrection,
          j = W.computeFirstVisibleIndexForOffsetCorrection,
          q = W.applyInitialScrollIndex,
          G = W.handlerMethods,
          Y = (0, t.useRef)(null);
        (0, r(d[7]).useOnListLoad)(T, h);
        var J = (0, r(d[8]).useBoundDetection)(T, V).checkBounds,
          K = r(d[3]).I18nManager.isRTL && u;
        ((0, t.useLayoutEffect)(function () {
          if (M.current && _.current) {
            var t = (0, r(d[9]).measureParentSize)(M.current),
              n = (0, r(d[9]).measureFirstChildLayout)(_.current, M.current);
            x.current = t;
            var o = u ? n.x - t.x : n.y - t.y;
            T.updateLayoutParams(
              { width: u ? t.width : n.width, height: u ? n.height : t.height },
              K && T.hasLayout() ? o - T.getChildContainerDimensions().width : o
            );
          }
        }),
          (0, t.useLayoutEffect)(function () {
            var t, n;
            if (!(I.size > 0)) {
              var o = Array.from(z, function (t) {
                  var n = r(d[0]).__read(t, 2),
                    o = n[0],
                    l = n[1];
                  return {
                    index: o,
                    dimensions: (0, r(d[9]).measureItemLayout)(l.current, T.tryGetLayout(o)),
                  };
                }),
                l = E.hasExceededMaxRendersWithoutCommit();
              (l && console.warn(r(d[10]).WarningMessages.exceededMaxRendersWithoutCommit),
                T.modifyChildrenLayout(
                  o,
                  null !== (t = null == c ? void 0 : c.length) && void 0 !== t ? t : 0
                ) && !l
                  ? F(function (t) {
                      return t + 1;
                    })
                  : (null === (n = Y.current) || void 0 === n || n.commitLayout(), B()));
            }
          }));
        var Q = (0, t.useCallback)(
            function (t) {
              var n, o, l;
              if (!T.ignoreScrollEvents) {
                var s = u ? t.nativeEvent.contentOffset.x : t.nativeEvent.contentOffset.y;
                (K &&
                  (s = (0, r(d[11]).adjustOffsetForRTL)(
                    s,
                    t.nativeEvent.contentSize.width,
                    t.nativeEvent.layoutMeasurement.width
                  )),
                  N.computeVelocity(
                    s,
                    T.getAbsoluteLastScrollOffset(),
                    Boolean(u),
                    function (t, n) {
                      if (!T.ignoreScrollEvents) {
                        if (n) {
                          if ((j(), !T.isOffsetProjectionEnabled)) return;
                          T.resetVelocityCompute();
                        }
                        T.updateScrollOffset(s, t) &&
                          F(function (t) {
                            return t + 1;
                          });
                      }
                    }
                  ),
                  null === (n = D.current) || void 0 === n || n.reportScrollEvent(t.nativeEvent),
                  J(),
                  T.recordInteraction(),
                  T.computeItemViewability(),
                  null === (l = (o = T.props).onScroll) || void 0 === l || l.call(o, t));
              }
            },
            [J, j, u, K, T, N]
          ),
          U = (0, r(d[12]).useRecyclerViewContext)(),
          X = (0, t.useId)(),
          Z = (0, t.useMemo)(
            function () {
              return {
                layout: function () {
                  b(function (t) {
                    return t + 1;
                  });
                },
                getRef: function () {
                  return T.isDisposed ? null : G;
                },
                getParentRef: function () {
                  var t;
                  return null !== (t = null == U ? void 0 : U.getRef()) && void 0 !== t ? t : null;
                },
                getParentScrollViewRef: function () {
                  var t;
                  return null !== (t = null == U ? void 0 : U.getScrollViewRef()) && void 0 !== t
                    ? t
                    : null;
                },
                getScrollViewRef: function () {
                  return V.current;
                },
                markChildLayoutAsPending: function (t) {
                  I.add(t);
                },
                unmarkChildLayoutAsPending: function (t) {
                  I.has(t) && (I.delete(t), Z.layout());
                },
              };
            },
            [G, U, I, T.isDisposed, b]
          ),
          $ = (0, t.useCallback)(
            function (t, n) {
              var o,
                l,
                u,
                s,
                c = T.getLayout(t),
                f = Math.max(
                  Math.min(c.width, null !== (o = c.maxWidth) && void 0 !== o ? o : 1 / 0),
                  null !== (l = c.minWidth) && void 0 !== l ? l : 0
                ),
                h = Math.max(
                  Math.min(c.height, null !== (u = c.maxHeight) && void 0 !== u ? u : 1 / 0),
                  null !== (s = c.minHeight) && void 0 !== s ? s : 0
                );
              ((0, r(d[9]).areDimensionsNotEqual)(f, n.width) ||
                (0, r(d[9]).areDimensionsNotEqual)(h, n.height)) &&
                Z.layout();
            },
            [Z, T]
          ),
          ee = (0, r(d[13]).useSecondaryProps)(n),
          te = ee.refreshControl,
          ne = ee.renderHeader,
          oe = ee.renderFooter,
          re = ee.renderEmpty,
          ie = ee.CompatScrollView;
        !T.getIsFirstLayoutComplete() &&
          T.getDataLength() > 0 &&
          (null == U || U.markChildLayoutAsPending(X));
        var ae = (0, t.useMemo)(
            function () {
              if (c && c.length > 0 && L && L.length > 0) {
                if (u)
                  throw new Error(r(d[14]).ErrorMessages.stickyHeadersNotSupportedForHorizontal);
                return t.default.createElement(r(d[15]).StickyHeaders, {
                  stickyHeaderIndices: L,
                  data: c,
                  renderItem: s,
                  scrollY: k,
                  stickyHeaderRef: D,
                  recyclerViewManager: T,
                  extraData: f,
                });
              }
              return null;
            },
            [c, L, s, k, u, T, f]
          ),
          le = (0, t.useMemo)(
            function () {
              return ae
                ? r(d[3]).Animated.event([{ nativeEvent: { contentOffset: { y: k } } }], {
                    useNativeDriver: !0,
                    listener: Q,
                  })
                : Q;
            },
            [Q, k, ae]
          ),
          ue = T.shouldMaintainVisibleContentPosition(),
          se = (0, t.useMemo)(
            function () {
              if (ue) return r(d[0]).__assign(r(d[0]).__assign({}, w), { minIndexForVisible: 0 });
            },
            [w, ue]
          ),
          de =
            T.getDataLength() > 0 &&
            null !== (l = null == w ? void 0 : w.startRenderingFromBottom) &&
            void 0 !== l &&
            l,
          ce = (0, t.useMemo)(
            function () {
              return t.default.createElement(r(d[16]).CompatView, {
                style: { height: u ? void 0 : 0, width: u ? 0 : void 0 },
                ref: _,
              });
            },
            [u]
          ),
          fe = (0, t.useMemo)(
            function () {
              return ue
                ? t.default.createElement(r(d[17]).ScrollAnchor, {
                    horizontal: Boolean(u),
                    scrollAnchorRef: P,
                  })
                : null;
            },
            [u, ue]
          );
        return t.default.createElement(
          r(d[12]).RecyclerViewContextProvider,
          { value: Z },
          t.default.createElement(
            r(d[16]).CompatView,
            {
              style: r(d[0]).__assign({ flex: u ? void 0 : 1, overflow: 'hidden' }, p),
              ref: M,
              collapsable: !1,
              onLayout: function (t) {
                var n, o, l, u;
                ((0, r(d[9]).areDimensionsNotEqual)(
                  t.nativeEvent.layout.width,
                  null !== (o = null === (n = x.current) || void 0 === n ? void 0 : n.width) &&
                    void 0 !== o
                    ? o
                    : 0
                ) ||
                  (0, r(d[9]).areDimensionsNotEqual)(
                    t.nativeEvent.layout.height,
                    null !== (u = null === (l = x.current) || void 0 === l ? void 0 : l.height) &&
                      void 0 !== u
                      ? u
                      : 0
                  )) &&
                  Z.layout();
              },
            },
            t.default.createElement(
              ie,
              r(d[0]).__assign(
                {},
                S,
                {
                  horizontal: u,
                  ref: V,
                  onScroll: le,
                  maintainVisibleContentPosition: se,
                  refreshControl: te,
                },
                y
              ),
              fe,
              K && ce,
              ne,
              !K && ce,
              t.default.createElement(r(d[18]).ViewHolderCollection, {
                viewHolderCollectionRef: Y,
                data: c,
                horizontal: u,
                renderStack: T.getRenderStack(),
                getLayout: function (t) {
                  return T.getLayout(t);
                },
                getAdjustmentMargin: function () {
                  if (!de || !T.hasLayout()) return 0;
                  var t = u ? T.getWindowSize().width : T.getWindowSize().height,
                    n = u
                      ? T.getChildContainerDimensions().width
                      : T.getChildContainerDimensions().height;
                  return Math.max(0, t - n - T.firstItemOffset);
                },
                refHolder: z,
                onSizeChanged: $,
                renderItem: s,
                extraData: f,
                onCommitLayoutEffect: function () {
                  (q(), null == U || U.unmarkChildLayoutAsPending(X), null == R || R());
                },
                onCommitEffect: function () {
                  (E.markRenderComplete(),
                    T.updateAverageRenderTime(E.getAverageRenderTime()),
                    q(),
                    J(),
                    T.computeItemViewability(),
                    (T.animationOptimizationsEnabled = !1));
                },
                CellRendererComponent: v,
                ItemSeparatorComponent: C,
                getChildContainerLayout: function () {
                  return T.hasLayout() ? T.getChildContainerDimensions() : void 0;
                },
              }),
              re,
              oe
            ),
            ae
          )
        );
      };
    n.displayName = 'FlashList';
    var o = t.default.memo((0, t.forwardRef)(n));
    e.RecyclerView = o;
  },
  1539,
  [
    518, 5, 1540, 1543, 1570, 1572, 1587, 1592, 1593, 1583, 1591, 1590, 1571, 1594, 1576, 1598,
    1595, 1600, 1601,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RenderTimeTracker = void 0));
    var t = (function () {
      function t() {
        ((this.renderTimeAvgWindow = new (r(d[0]).AverageWindow)(5)),
          (this.lastTimerStartedAt = -1),
          (this.maxRenderTime = 32),
          (this.defaultRenderTime = 16),
          (this.rendersWithoutCommit = 0),
          (this.maxRendersWithoutCommit = 40));
      }
      return (
        (t.prototype.startTracking = function () {
          (this.rendersWithoutCommit++,
            r(d[1]).PlatformConfig.trackAverageRenderTimeForOffsetProjection &&
              -1 === this.lastTimerStartedAt &&
              (this.lastTimerStartedAt = Date.now()));
        }),
        (t.prototype.markRenderComplete = function () {
          ((this.rendersWithoutCommit = 0),
            r(d[1]).PlatformConfig.trackAverageRenderTimeForOffsetProjection &&
              -1 !== this.lastTimerStartedAt &&
              (this.renderTimeAvgWindow.addValue(Date.now() - this.lastTimerStartedAt),
              (this.lastTimerStartedAt = -1)));
        }),
        (t.prototype.hasExceededMaxRendersWithoutCommit = function () {
          return this.rendersWithoutCommit >= this.maxRendersWithoutCommit;
        }),
        (t.prototype.getRawValue = function () {
          return this.renderTimeAvgWindow.currentValue;
        }),
        (t.prototype.getAverageRenderTime = function () {
          return r(d[1]).PlatformConfig.trackAverageRenderTimeForOffsetProjection
            ? Math.min(
                this.maxRenderTime,
                Math.max(Math.round(this.renderTimeAvgWindow.currentValue), 16)
              )
            : this.defaultRenderTime;
        }),
        t
      );
    })();
    e.RenderTimeTracker = t;
  },
  1540,
  [1541, 1542]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.MultiTypeAverageWindow = e.AverageWindow = void 0));
    var t = (function () {
      function t(t, n) {
        ((this.nextIndex = 0),
          (this.inputValues = new Array(Math.max(1, t))),
          (this.currentAverage = null != n ? n : 0),
          (this.currentCount = void 0 === n ? 0 : 1),
          (this.nextIndex = this.currentCount),
          (this.inputValues[0] = n));
      }
      return (
        Object.defineProperty(t.prototype, 'currentValue', {
          get: function () {
            return this.currentAverage;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.addValue = function (t) {
          var n = this.getNextIndex(),
            u = this.inputValues[n],
            o = void 0 === u ? this.currentCount + 1 : this.currentCount;
          ((this.inputValues[n] = t),
            (this.currentAverage =
              this.currentAverage * (this.currentCount / o) + (t - (null != u ? u : 0)) / o),
            (this.currentCount = o));
        }),
        (t.prototype.getNextIndex = function () {
          var t = this.nextIndex;
          return ((this.nextIndex = (this.nextIndex + 1) % this.inputValues.length), t);
        }),
        t
      );
    })();
    e.AverageWindow = t;
    var n = (function () {
      function n(t, n) {
        ((this.averageWindows = new Map()), (this.windowSize = t), (this.defaultValue = n));
      }
      return (
        (n.prototype.addValue = function (n, u) {
          var o = this.averageWindows.get(u);
          (o || ((o = new t(this.windowSize)), this.averageWindows.set(u, o)), o.addValue(n));
        }),
        (n.prototype.getCurrentValue = function (t) {
          var n,
            u,
            o = this.averageWindows.get(t);
          return null !==
            (u =
              null !== (n = null == o ? void 0 : o.currentValue) && void 0 !== n
                ? n
                : this.defaultValue) && void 0 !== u
            ? u
            : 0;
        }),
        (n.prototype.reset = function () {
          this.averageWindows.clear();
        }),
        n
      );
    })();
    e.MultiTypeAverageWindow = n;
  },
  1541,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.PlatformConfig = void 0));
    e.PlatformConfig = {
      defaultDrawDistance: 500,
      supportsOffsetCorrection: !1,
      trackAverageRenderTimeForOffsetProjection: !1,
    };
  },
  1542,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'AccessibilityInfo', {
        enumerable: !0,
        get: function () {
          return b.default;
        },
      }),
      Object.defineProperty(e, 'ActivityIndicator', {
        enumerable: !0,
        get: function () {
          return _.default;
        },
      }),
      Object.defineProperty(e, 'Alert', {
        enumerable: !0,
        get: function () {
          return p.default;
        },
      }),
      Object.defineProperty(e, 'Animated', {
        enumerable: !0,
        get: function () {
          return y.default;
        },
      }),
      Object.defineProperty(e, 'AppRegistry', {
        enumerable: !0,
        get: function () {
          return O.default;
        },
      }),
      Object.defineProperty(e, 'AppState', {
        enumerable: !0,
        get: function () {
          return j.default;
        },
      }),
      Object.defineProperty(e, 'Appearance', {
        enumerable: !0,
        get: function () {
          return P.default;
        },
      }),
      Object.defineProperty(e, 'BackHandler', {
        enumerable: !0,
        get: function () {
          return s.default;
        },
      }),
      Object.defineProperty(e, 'Button', {
        enumerable: !0,
        get: function () {
          return R.default;
        },
      }),
      Object.defineProperty(e, 'CheckBox', {
        enumerable: !0,
        get: function () {
          return D.default;
        },
      }),
      Object.defineProperty(e, 'Clipboard', {
        enumerable: !0,
        get: function () {
          return h.default;
        },
      }),
      Object.defineProperty(e, 'DeviceEventEmitter', {
        enumerable: !0,
        get: function () {
          return de.default;
        },
      }),
      Object.defineProperty(e, 'Dimensions', {
        enumerable: !0,
        get: function () {
          return v.default;
        },
      }),
      Object.defineProperty(e, 'Easing', {
        enumerable: !0,
        get: function () {
          return A.default;
        },
      }),
      Object.defineProperty(e, 'FlatList', {
        enumerable: !0,
        get: function () {
          return F.default;
        },
      }),
      Object.defineProperty(e, 'I18nManager', {
        enumerable: !0,
        get: function () {
          return S.default;
        },
      }),
      Object.defineProperty(e, 'Image', {
        enumerable: !0,
        get: function () {
          return H.default;
        },
      }),
      Object.defineProperty(e, 'ImageBackground', {
        enumerable: !0,
        get: function () {
          return K.default;
        },
      }),
      Object.defineProperty(e, 'InteractionManager', {
        enumerable: !0,
        get: function () {
          return I.default;
        },
      }),
      Object.defineProperty(e, 'Keyboard', {
        enumerable: !0,
        get: function () {
          return B.default;
        },
      }),
      Object.defineProperty(e, 'KeyboardAvoidingView', {
        enumerable: !0,
        get: function () {
          return W.default;
        },
      }),
      Object.defineProperty(e, 'LayoutAnimation', {
        enumerable: !0,
        get: function () {
          return k.default;
        },
      }),
      Object.defineProperty(e, 'Linking', {
        enumerable: !0,
        get: function () {
          return w.default;
        },
      }),
      Object.defineProperty(e, 'LogBox', {
        enumerable: !0,
        get: function () {
          return ce.default;
        },
      }),
      Object.defineProperty(e, 'Modal', {
        enumerable: !0,
        get: function () {
          return z.default;
        },
      }),
      Object.defineProperty(e, 'NativeEventEmitter', {
        enumerable: !0,
        get: function () {
          return x.default;
        },
      }),
      Object.defineProperty(e, 'NativeModules', {
        enumerable: !0,
        get: function () {
          return c.default;
        },
      }),
      Object.defineProperty(e, 'PanResponder', {
        enumerable: !0,
        get: function () {
          return C.default;
        },
      }),
      Object.defineProperty(e, 'Picker', {
        enumerable: !0,
        get: function () {
          return U.default;
        },
      }),
      Object.defineProperty(e, 'PixelRatio', {
        enumerable: !0,
        get: function () {
          return L.default;
        },
      }),
      Object.defineProperty(e, 'Platform', {
        enumerable: !0,
        get: function () {
          return T.default;
        },
      }),
      Object.defineProperty(e, 'Pressable', {
        enumerable: !0,
        get: function () {
          return Y.default;
        },
      }),
      Object.defineProperty(e, 'ProgressBar', {
        enumerable: !0,
        get: function () {
          return q.default;
        },
      }),
      Object.defineProperty(e, 'RefreshControl', {
        enumerable: !0,
        get: function () {
          return G.default;
        },
      }),
      Object.defineProperty(e, 'SafeAreaView', {
        enumerable: !0,
        get: function () {
          return J.default;
        },
      }),
      Object.defineProperty(e, 'ScrollView', {
        enumerable: !0,
        get: function () {
          return Q.default;
        },
      }),
      Object.defineProperty(e, 'SectionList', {
        enumerable: !0,
        get: function () {
          return X.default;
        },
      }),
      Object.defineProperty(e, 'Share', {
        enumerable: !0,
        get: function () {
          return E.default;
        },
      }),
      Object.defineProperty(e, 'StatusBar', {
        enumerable: !0,
        get: function () {
          return Z.default;
        },
      }),
      Object.defineProperty(e, 'StyleSheet', {
        enumerable: !0,
        get: function () {
          return M.default;
        },
      }),
      Object.defineProperty(e, 'Switch', {
        enumerable: !0,
        get: function () {
          return $.default;
        },
      }),
      Object.defineProperty(e, 'Text', {
        enumerable: !0,
        get: function () {
          return ee.default;
        },
      }),
      Object.defineProperty(e, 'TextInput', {
        enumerable: !0,
        get: function () {
          return te.default;
        },
      }),
      Object.defineProperty(e, 'Touchable', {
        enumerable: !0,
        get: function () {
          return ne.default;
        },
      }),
      Object.defineProperty(e, 'TouchableHighlight', {
        enumerable: !0,
        get: function () {
          return re.default;
        },
      }),
      Object.defineProperty(e, 'TouchableNativeFeedback', {
        enumerable: !0,
        get: function () {
          return ue.default;
        },
      }),
      Object.defineProperty(e, 'TouchableOpacity', {
        enumerable: !0,
        get: function () {
          return fe.default;
        },
      }),
      Object.defineProperty(e, 'TouchableWithoutFeedback', {
        enumerable: !0,
        get: function () {
          return ae.default;
        },
      }),
      Object.defineProperty(e, 'UIManager', {
        enumerable: !0,
        get: function () {
          return V.default;
        },
      }),
      Object.defineProperty(e, 'Vibration', {
        enumerable: !0,
        get: function () {
          return N.default;
        },
      }),
      Object.defineProperty(e, 'View', {
        enumerable: !0,
        get: function () {
          return ie.default;
        },
      }),
      Object.defineProperty(e, 'VirtualizedList', {
        enumerable: !0,
        get: function () {
          return oe.default;
        },
      }),
      Object.defineProperty(e, 'YellowBox', {
        enumerable: !0,
        get: function () {
          return le.default;
        },
      }),
      Object.defineProperty(e, 'findNodeHandle', {
        enumerable: !0,
        get: function () {
          return u.default;
        },
      }),
      Object.defineProperty(e, 'processColor', {
        enumerable: !0,
        get: function () {
          return f.default;
        },
      }),
      Object.defineProperty(e, 'render', {
        enumerable: !0,
        get: function () {
          return o.default;
        },
      }),
      Object.defineProperty(e, 'unmountComponentAtNode', {
        enumerable: !0,
        get: function () {
          return l.default;
        },
      }),
      Object.defineProperty(e, 'unstable_createElement', {
        enumerable: !0,
        get: function () {
          return n.default;
        },
      }),
      Object.defineProperty(e, 'useColorScheme', {
        enumerable: !0,
        get: function () {
          return be.default;
        },
      }),
      Object.defineProperty(e, 'useLocaleContext', {
        enumerable: !0,
        get: function () {
          return ge.default;
        },
      }),
      Object.defineProperty(e, 'useWindowDimensions', {
        enumerable: !0,
        get: function () {
          return me.default;
        },
      }));
    var n = t(r(d[1])),
      u = t(r(d[2])),
      f = t(r(d[3])),
      o = t(r(d[4])),
      l = t(r(d[5])),
      c = t(r(d[6])),
      b = t(r(d[7])),
      p = t(r(d[8])),
      y = t(r(d[9])),
      P = t(r(d[10])),
      O = t(r(d[11])),
      j = t(r(d[12])),
      s = t(r(d[13])),
      h = t(r(d[14])),
      v = t(r(d[15])),
      A = t(r(d[16])),
      S = t(r(d[17])),
      B = t(r(d[18])),
      I = t(r(d[19])),
      k = t(r(d[20])),
      w = t(r(d[21])),
      x = t(r(d[22])),
      C = t(r(d[23])),
      L = t(r(d[24])),
      T = t(r(d[25])),
      E = t(r(d[26])),
      M = t(r(d[27])),
      V = t(r(d[28])),
      N = t(r(d[29])),
      _ = t(r(d[30])),
      R = t(r(d[31])),
      D = t(r(d[32])),
      F = t(r(d[33])),
      H = t(r(d[34])),
      K = t(r(d[35])),
      W = t(r(d[36])),
      z = t(r(d[37])),
      U = t(r(d[38])),
      Y = t(r(d[39])),
      q = t(r(d[40])),
      G = t(r(d[41])),
      J = t(r(d[42])),
      Q = t(r(d[43])),
      X = t(r(d[44])),
      Z = t(r(d[45])),
      $ = t(r(d[46])),
      ee = t(r(d[47])),
      te = t(r(d[48])),
      ne = t(r(d[49])),
      re = t(r(d[50])),
      ue = t(r(d[51])),
      fe = t(r(d[52])),
      ae = t(r(d[53])),
      ie = t(r(d[54])),
      oe = t(r(d[55])),
      le = t(r(d[56])),
      ce = t(r(d[57])),
      de = t(r(d[58])),
      be = t(r(d[59])),
      ge = t(r(d[60])),
      me = t(r(d[61]));
  },
  1543,
  [
    1, 20, 224, 37, 925, 922, 511, 1544, 678, 7, 1545, 921, 323, 1392, 1546, 107, 179, 307, 316,
    114, 1547, 667, 353, 1549, 153, 14, 1517, 26, 82, 675, 373, 1552, 1554, 17, 151, 1555, 681, 948,
    1556, 326, 1558, 105, 1559, 106, 157, 317, 253, 161, 255, 1560, 608, 295, 1553, 1564, 19, 1565,
    1566, 1567, 187, 1568, 1569, 671,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n = r(d[0]);
    function t() {
      return new Promise((n, t) => {
        n(!0);
      });
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o =
      n(r(d[1])).default && 'function' == typeof window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    var u = {},
      c = {
        isScreenReaderEnabled: t,
        isReduceMotionEnabled: function () {
          return new Promise((n, t) => {
            n(!o || o.matches);
          });
        },
        fetch: t,
        addEventListener: function (n, t) {
          if ('reduceMotionChanged' === n) {
            if (!o) return;
            var s = n => {
              t(n.matches);
            };
            ((v = s),
              null != o &&
                (null != o.addEventListener ? o.addEventListener('change', v) : o.addListener(v)),
              (u[t] = s));
          }
          var v;
          return { remove: () => c.removeEventListener(n, t) };
        },
        setAccessibilityFocus: function (n) {},
        announceForAccessibility: function (n) {},
        removeEventListener: function (n, t) {
          if ('reduceMotionChanged' === n) {
            var c = u[t];
            if (!c || !o) return;
            ((s = c),
              null != o &&
                (null != o.removeEventListener
                  ? o.removeEventListener('change', s)
                  : o.removeListener(s)));
          }
          var s;
        },
      };
    e.default = c;
  },
  1544,
  [1, 27]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var l =
        t(r(d[1])).default && null != window.matchMedia
          ? window.matchMedia('(prefers-color-scheme: dark)')
          : null,
      n = new WeakMap(),
      o = {
        getColorScheme: () => (l && l.matches ? 'dark' : 'light'),
        addChangeListener(t) {
          var o = n.get(t);
          return (
            o ||
              ((o = l => {
                var n = l.matches;
                t({ colorScheme: n ? 'dark' : 'light' });
              }),
              n.set(t, o)),
            l && l.addListener(o),
            {
              remove: function () {
                var o = n.get(t);
                (l && o && l.removeListener(o), n.delete(t));
              },
            }
          );
        },
      };
    e.default = o;
  },
  1545,
  [1, 27]
);
__d(
  function (g, r, i, a, m, _e, d) {
    var e;
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    _e.default = class {
      static isAvailable() {
        return (
          void 0 === e &&
            (e =
              'function' == typeof document.queryCommandSupported &&
              document.queryCommandSupported('copy')),
          e
        );
      }
      static getString() {
        return Promise.resolve('');
      }
      static setString(e) {
        var t = !1,
          o = document.body;
        if (o) {
          var n = document.createElement('span');
          ((n.textContent = e),
            (n.style.opacity = '0'),
            (n.style.position = 'absolute'),
            (n.style.whiteSpace = 'pre-wrap'),
            (n.style.userSelect = 'auto'),
            o.appendChild(n));
          var c = window.getSelection();
          c.removeAllRanges();
          var l = document.createRange();
          (l.selectNodeContents(n), c.addRange(l));
          try {
            (document.execCommand('copy'), (t = !0));
          } catch (e) {}
          (c.removeAllRanges(), o.removeChild(n));
        }
        return t;
      }
    };
  },
  1546,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var u = t(r(d[1]));
    e.default = u.default;
  },
  1547,
  [1, 1548]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var n = t(r(d[1])),
      s = t(r(d[2]));
    function o(t, o) {
      n.default.isTesting ||
        s.default.configureNextLayoutAnimation(t, null != o ? o : function () {}, function () {});
    }
    function p(t, n, s) {
      return {
        duration: t,
        create: { type: n, property: s },
        update: { type: n },
        delete: { type: n, property: s },
      };
    }
    var u = {
        easeInEaseOut: p(300, 'easeInEaseOut', 'opacity'),
        linear: p(500, 'linear', 'opacity'),
        spring: {
          duration: 700,
          create: { type: 'linear', property: 'opacity' },
          update: { type: 'spring', springDamping: 0.4 },
          delete: { type: 'linear', property: 'opacity' },
        },
      },
      l = {
        configureNext: o,
        create: p,
        Types: Object.freeze({
          spring: 'spring',
          linear: 'linear',
          easeInEaseOut: 'easeInEaseOut',
          easeIn: 'easeIn',
          easeOut: 'easeOut',
          keyboard: 'keyboard',
        }),
        Properties: Object.freeze({
          opacity: 'opacity',
          scaleX: 'scaleX',
          scaleY: 'scaleY',
          scaleXY: 'scaleXY',
        }),
        checkConfig() {
          console.error('LayoutAnimation.checkConfig(...) has been disabled.');
        },
        Presets: u,
        easeInEaseOut: o.bind(null, u.easeInEaseOut),
        linear: o.bind(null, u.linear),
        spring: o.bind(null, u.spring),
      };
    e.default = l;
  },
  1548,
  [1, 14, 82]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var u = t(r(d[1]));
    e.default = u.default;
  },
  1549,
  [1, 1550]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var n = o(r(d[1])),
      t = o(r(d[2])),
      u = t.default.currentCentroidXOfTouchesChangedAfter,
      s = t.default.currentCentroidYOfTouchesChangedAfter,
      c = t.default.previousCentroidXOfTouchesChangedAfter,
      l = t.default.previousCentroidYOfTouchesChangedAfter,
      p = t.default.currentCentroidX,
      v = t.default.currentCentroidY,
      h = {
        _initializeGestureState(o) {
          ((o.moveX = 0),
            (o.moveY = 0),
            (o.x0 = 0),
            (o.y0 = 0),
            (o.dx = 0),
            (o.dy = 0),
            (o.vx = 0),
            (o.vy = 0),
            (o.numberActiveTouches = 0),
            (o._accountsForMovesUpTo = 0));
        },
        _updateGestureStateOnMove(o, n) {
          ((o.numberActiveTouches = n.numberActiveTouches),
            (o.moveX = u(n, o._accountsForMovesUpTo)),
            (o.moveY = s(n, o._accountsForMovesUpTo)));
          var t = o._accountsForMovesUpTo,
            p = c(n, t),
            v = u(n, t),
            h = l(n, t),
            S = s(n, t),
            R = o.dx + (v - p),
            T = o.dy + (S - h),
            C = n.mostRecentTimeStamp - o._accountsForMovesUpTo;
          ((o.vx = (R - o.dx) / C),
            (o.vy = (T - o.dy) / C),
            (o.dx = R),
            (o.dy = T),
            (o._accountsForMovesUpTo = n.mostRecentTimeStamp));
        },
        create(o) {
          var t = { handle: null, shouldCancelClick: !1, timeout: null },
            u = {
              stateID: Math.random(),
              moveX: 0,
              moveY: 0,
              x0: 0,
              y0: 0,
              dx: 0,
              dy: 0,
              vx: 0,
              vy: 0,
              numberActiveTouches: 0,
              _accountsForMovesUpTo: 0,
            };
          return {
            panHandlers: {
              onStartShouldSetResponder: n =>
                null != o.onStartShouldSetPanResponder && o.onStartShouldSetPanResponder(n, u),
              onMoveShouldSetResponder: n =>
                null != o.onMoveShouldSetPanResponder && o.onMoveShouldSetPanResponder(n, u),
              onStartShouldSetResponderCapture: n => (
                1 === n.nativeEvent.touches.length && h._initializeGestureState(u),
                (u.numberActiveTouches = n.touchHistory.numberActiveTouches),
                null != o.onStartShouldSetPanResponderCapture &&
                  o.onStartShouldSetPanResponderCapture(n, u)
              ),
              onMoveShouldSetResponderCapture(n) {
                var t = n.touchHistory;
                return (
                  u._accountsForMovesUpTo !== t.mostRecentTimeStamp &&
                  (h._updateGestureStateOnMove(u, t),
                  !!o.onMoveShouldSetPanResponderCapture &&
                    o.onMoveShouldSetPanResponderCapture(n, u))
                );
              },
              onResponderGrant: s => (
                t.handle || (t.handle = n.default.createInteractionHandle()),
                t.timeout && R(t),
                (t.shouldCancelClick = !0),
                (u.x0 = p(s.touchHistory)),
                (u.y0 = v(s.touchHistory)),
                (u.dx = 0),
                (u.dy = 0),
                o.onPanResponderGrant && o.onPanResponderGrant(s, u),
                null == o.onShouldBlockNativeResponder || o.onShouldBlockNativeResponder(s, u)
              ),
              onResponderReject(n) {
                S(t, o.onPanResponderReject, n, u);
              },
              onResponderRelease(n) {
                (S(t, o.onPanResponderRelease, n, u), T(t), h._initializeGestureState(u));
              },
              onResponderStart(n) {
                var t = n.touchHistory;
                ((u.numberActiveTouches = t.numberActiveTouches),
                  o.onPanResponderStart && o.onPanResponderStart(n, u));
              },
              onResponderMove(n) {
                var t = n.touchHistory;
                u._accountsForMovesUpTo !== t.mostRecentTimeStamp &&
                  (h._updateGestureStateOnMove(u, t),
                  o.onPanResponderMove && o.onPanResponderMove(n, u));
              },
              onResponderEnd(n) {
                var s = n.touchHistory;
                ((u.numberActiveTouches = s.numberActiveTouches), S(t, o.onPanResponderEnd, n, u));
              },
              onResponderTerminate(n) {
                (S(t, o.onPanResponderTerminate, n, u), T(t), h._initializeGestureState(u));
              },
              onResponderTerminationRequest: n =>
                null == o.onPanResponderTerminationRequest ||
                o.onPanResponderTerminationRequest(n, u),
              onClickCapture: o => {
                !0 === t.shouldCancelClick && (o.stopPropagation(), o.preventDefault());
              },
            },
            getInteractionHandle: () => t.handle,
          };
        },
      };
    function S(o, t, u, s) {
      (o.handle && (n.default.clearInteractionHandle(o.handle), (o.handle = null)), t && t(u, s));
    }
    function R(o) {
      clearTimeout(o.timeout);
    }
    function T(o) {
      o.timeout = setTimeout(() => {
        o.shouldCancelClick = !1;
      }, 250);
    }
    e.default = h;
  },
  1550,
  [1, 114, 1551]
);
__d(
  function (g, r, _i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var n = {
      centroidDimension: function (t, i, o, u) {
        var c = t.touchBank,
          f = 0,
          s = 0,
          v = 1 === t.numberActiveTouches ? t.touchBank[t.indexOfSingleActiveTouch] : null;
        if (null !== v)
          v.touchActive &&
            v.currentTimeStamp > i &&
            ((f +=
              u && o
                ? v.currentPageX
                : u && !o
                  ? v.currentPageY
                  : !u && o
                    ? v.previousPageX
                    : v.previousPageY),
            (s = 1));
        else
          for (var h = 0; h < c.length; h++) {
            var l = c[h];
            if (null != l && l.touchActive && l.currentTimeStamp >= i) {
              ((f +=
                u && o
                  ? l.currentPageX
                  : u && !o
                    ? l.currentPageY
                    : !u && o
                      ? l.previousPageX
                      : l.previousPageY),
                s++);
            }
          }
        return s > 0 ? f / s : n.noCentroid;
      },
      currentCentroidXOfTouchesChangedAfter: function (t, i) {
        return n.centroidDimension(t, i, !0, !0);
      },
      currentCentroidYOfTouchesChangedAfter: function (t, i) {
        return n.centroidDimension(t, i, !1, !0);
      },
      previousCentroidXOfTouchesChangedAfter: function (t, i) {
        return n.centroidDimension(t, i, !0, !1);
      },
      previousCentroidYOfTouchesChangedAfter: function (t, i) {
        return n.centroidDimension(t, i, !1, !1);
      },
      currentCentroidX: function (t) {
        return n.centroidDimension(t, 0, !0, !0);
      },
      currentCentroidY: function (t) {
        return n.centroidDimension(t, 0, !1, !0);
      },
      noCentroid: -1,
    };
    e.default = n;
  },
  1551,
  []
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var t = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            o = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var n,
            l,
            i = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return i;
          if ((n = t ? o : r)) {
            if (n.has(e)) return n.get(e);
            n.set(e, i);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((l = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (l.get || l.set)
                ? n(i, t, l)
                : (i[t] = e[t]));
          return i;
        })(e, t);
      })(_r(d[1])),
      r = e(_r(d[2])),
      o = e(_r(d[3])),
      n = e(_r(d[4]));
    var l = t.forwardRef((e, r) => {
      var l = e.accessibilityLabel,
        f = e.color,
        u = e.disabled,
        s = e.onPress,
        c = e.testID,
        b = e.title;
      return t.createElement(
        o.default,
        {
          accessibilityLabel: l,
          accessibilityRole: 'button',
          disabled: u,
          focusable: !u,
          onPress: s,
          ref: r,
          style: [i.button, f && { backgroundColor: f }, u && i.buttonDisabled],
          testID: c,
        },
        t.createElement(n.default, { style: [i.text, u && i.textDisabled] }, b)
      );
    });
    l.displayName = 'Button';
    var i = r.default.create({
      button: { backgroundColor: '#2196F3', borderRadius: 2 },
      text: {
        color: '#fff',
        fontWeight: '500',
        padding: 8,
        textAlign: 'center',
        textTransform: 'uppercase',
      },
      buttonDisabled: { backgroundColor: '#dfdfdf' },
      textDisabled: { color: '#a1a1a1' },
    });
    _e.default = l;
  },
  1552,
  [1, 5, 26, 1553, 161]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var t = e(_r(d[1])),
      n = e(_r(d[2])),
      s = (function (e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            s = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var r,
            o,
            l = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return l;
          if ((r = t ? s : n)) {
            if (r.has(e)) return r.get(e);
            r.set(e, l);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((o = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (o.get || o.set)
                ? r(l, t, o)
                : (l[t] = e[t]));
          return l;
        })(e, t);
      })(_r(d[3])),
      r = s,
      o = e(_r(d[4])),
      l = e(_r(d[5])),
      i = e(_r(d[6])),
      u = e(_r(d[7]));
    var c = [
      'activeOpacity',
      'delayPressIn',
      'delayPressOut',
      'delayLongPress',
      'disabled',
      'focusable',
      'onLongPress',
      'onPress',
      'onPressIn',
      'onPressOut',
      'rejectResponderTermination',
      'style',
    ];
    function f(e, i) {
      var f = e.activeOpacity,
        p = e.delayPressIn,
        P = e.delayPressOut,
        b = e.delayLongPress,
        v = e.disabled,
        O = e.focusable,
        _ = e.onLongPress,
        k = e.onPress,
        h = e.onPressIn,
        j = e.onPressOut,
        w = e.rejectResponderTermination,
        L = e.style,
        M = (0, n.default)(e, c),
        C = (0, s.useRef)(null),
        R = (0, o.default)(i, C),
        S = (0, s.useState)('0s'),
        D = S[0],
        E = S[1],
        I = (0, s.useState)(null),
        T = I[0],
        W = I[1],
        N = (0, s.useCallback)(
          (e, t) => {
            (W(e), E(t ? t / 1e3 + 's' : '0s'));
          },
          [W, E]
        ),
        x = (0, s.useCallback)(
          e => {
            N(null != f ? f : 0.2, e);
          },
          [f, N]
        ),
        A = (0, s.useCallback)(
          e => {
            N(null, e);
          },
          [N]
        ),
        G = (0, s.useMemo)(
          () => ({
            cancelable: !w,
            disabled: v,
            delayLongPress: b,
            delayPressStart: p,
            delayPressEnd: P,
            onLongPress: _,
            onPress: k,
            onPressStart(e) {
              var t =
                null != e.dispatchConfig
                  ? 'onResponderGrant' === e.dispatchConfig.registrationName
                  : 'keydown' === e.type;
              (x(t ? 0 : 150), null != h && h(e));
            },
            onPressEnd(e) {
              (A(250), null != j && j(e));
            },
          }),
          [b, p, P, v, _, k, h, j, w, x, A]
        ),
        q = (0, l.default)(C, G);
      return r.createElement(
        u.default,
        (0, t.default)({}, M, q, {
          accessibilityDisabled: v,
          focusable: !v && !1 !== O,
          pointerEvents: v ? 'box-none' : void 0,
          ref: R,
          style: [
            y.root,
            !v && y.actionable,
            L,
            null != T && { opacity: T },
            { transitionDuration: D },
          ],
        })
      );
    }
    var y = i.default.create({
        root: { transitionProperty: 'opacity', transitionDuration: '0.15s', userSelect: 'none' },
        actionable: { cursor: 'pointer', touchAction: 'manipulation' },
      }),
      p = r.memo(r.forwardRef(f));
    p.displayName = 'TouchableOpacity';
    _e.default = p;
  },
  1553,
  [1, 16, 4, 5, 87, 331, 26, 19]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var r = e(_r(d[1])),
      o = e(_r(d[2])),
      t = e(_r(d[3])),
      l = (function (e, r) {
        if ('function' == typeof WeakMap)
          var o = new WeakMap(),
            t = new WeakMap();
        return (function (e, r) {
          if (!r && e && e.__esModule) return e;
          var l,
            n,
            c = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return c;
          if ((l = r ? t : o)) {
            if (l.has(e)) return l.get(e);
            l.set(e, c);
          }
          for (const r in e)
            'default' !== r &&
              {}.hasOwnProperty.call(e, r) &&
              ((n = (l = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, r)) &&
              (n.get || n.set)
                ? l(c, r, n)
                : (c[r] = e[r]));
          return c;
        })(e, r);
      })(_r(d[4])),
      n = e(_r(d[5])),
      c = e(_r(d[6])),
      i = e(_r(d[7]));
    var u = [
        'aria-readonly',
        'color',
        'disabled',
        'onChange',
        'onValueChange',
        'readOnly',
        'style',
        'value',
      ],
      C = l.forwardRef((e, r) => {
        var c = e['aria-readonly'],
          C = e.color,
          y = e.disabled,
          b = e.onChange,
          f = e.onValueChange,
          s = e.readOnly,
          I = e.style,
          v = e.value,
          k = (0, t.default)(e, u);
        var h = l.createElement(i.default, {
            style: [
              M.fakeControl,
              v && M.fakeControlChecked,
              v && C && { backgroundColor: C, borderColor: C },
              y && M.fakeControlDisabled,
              v && y && M.fakeControlCheckedAndDisabled,
            ],
          }),
          z = (0, n.default)('input', {
            checked: v,
            disabled: y,
            onChange: function (e) {
              var r = e.nativeEvent.target.checked;
              ((e.nativeEvent.value = r), b && b(e), f && f(r));
            },
            readOnly: !0 === s || !0 === c || !0 === k.accessibilityReadOnly,
            ref: r,
            style: [M.nativeControl, M.cursorInherit],
            type: 'checkbox',
          });
        return l.createElement(
          i.default,
          (0, o.default)({}, k, {
            'aria-disabled': y,
            'aria-readonly': c,
            style: [M.root, I, y && M.cursorDefault],
          }),
          h,
          z
        );
      });
    C.displayName = 'CheckBox';
    var M = c.default.create({
      root: { cursor: 'pointer', height: 16, userSelect: 'none', width: 16 },
      cursorDefault: { cursor: 'default' },
      cursorInherit: { cursor: 'inherit' },
      fakeControl: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#657786',
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 2,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      },
      fakeControlChecked: {
        backgroundColor: '#009688',
        backgroundImage:
          'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K")',
        backgroundRepeat: 'no-repeat',
        borderColor: '#009688',
      },
      fakeControlDisabled: { borderColor: '#CCD6DD' },
      fakeControlCheckedAndDisabled: { backgroundColor: '#AAB8C2', borderColor: '#AAB8C2' },
      nativeControl: (0, r.default)(
        (0, r.default)({}, c.default.absoluteFillObject),
        {},
        { height: '100%', margin: 0, appearance: 'none', padding: 0, width: '100%' }
      ),
    });
    _e.default = C;
  },
  1554,
  [1, 9, 16, 4, 5, 20, 26, 19]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var t = e(_r(d[1])),
      r = e(_r(d[2])),
      l = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            l = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var f,
            n,
            i = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return i;
          if ((f = t ? l : r)) {
            if (f.has(e)) return f.get(e);
            f.set(e, i);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((n = (f = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (n.get || n.set)
                ? f(i, t, n)
                : (i[t] = e[t]));
          return i;
        })(e, t);
      })(_r(d[3])),
      f = l,
      n = e(_r(d[4])),
      i = e(_r(d[5])),
      u = e(_r(d[6]));
    var o = ['children', 'style', 'imageStyle', 'imageRef'],
      c = {},
      s = (0, l.forwardRef)((e, l) => {
        var s = e.children,
          y = e.style,
          p = void 0 === y ? c : y,
          h = e.imageStyle,
          _ = e.imageRef,
          v = (0, r.default)(e, o),
          w = i.default.flatten(p),
          b = w.height,
          M = w.width;
        return f.createElement(
          u.default,
          { ref: l, style: p },
          f.createElement(
            n.default,
            (0, t.default)({}, v, {
              ref: _,
              style: [{ width: M, height: b, zIndex: -1 }, i.default.absoluteFill, h],
            })
          ),
          s
        );
      });
    s.displayName = 'ImageBackground';
    _e.default = s;
  },
  1555,
  [1, 16, 4, 5, 151, 26, 19]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var t = e(_r(d[1])),
      n = e(_r(d[2])),
      l = (function (e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            l = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var r,
            u,
            f = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return f;
          if ((r = t ? l : n)) {
            if (r.has(e)) return r.get(e);
            r.set(e, f);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((u = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (u.get || u.set)
                ? r(f, t, u)
                : (f[t] = e[t]));
          return f;
        })(e, t);
      })(_r(d[3])),
      r = e(_r(d[4])),
      u = e(_r(d[5])),
      f = e(_r(d[6])),
      i = e(_r(d[7])),
      o = e(_r(d[8]));
    var c = [
        'children',
        'enabled',
        'onValueChange',
        'selectedValue',
        'style',
        'testID',
        'itemStyle',
        'mode',
        'prompt',
      ],
      s = l.forwardRef((e, i) => {
        var o = e.children,
          s = e.enabled,
          v = e.onValueChange,
          y = e.selectedValue,
          _ = e.style,
          h = e.testID,
          b = (e.itemStyle, e.mode, e.prompt, (0, n.default)(e, c)),
          w = l.useRef(null);
        var I = (0, t.default)(
            {
              children: o,
              disabled: !1 === s || void 0,
              onChange: function (e) {
                var t = e.target,
                  n = t.selectedIndex,
                  l = t.value;
                v && v(l, n);
              },
              style: [p.initial, _],
              testID: h,
              value: y,
            },
            b
          ),
          M = (0, f.default)(I),
          O = (0, u.default)(w, M, i);
        return ((I.ref = O), (0, r.default)('select', I));
      });
    s.Item = i.default;
    var p = o.default.create({ initial: { fontFamily: 'System', fontSize: 'inherit', margin: 0 } });
    _e.default = s;
  },
  1556,
  [1, 9, 4, 5, 20, 87, 89, 1557, 26]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function (t) {
        var o = t.color,
          u = t.label,
          n = t.testID,
          c = t.value,
          v = { color: o };
        return (0, l.default)('option', { children: u, style: v, testID: n, value: c });
      }));
    var l = t(r(d[1]));
  },
  1557,
  [1, 20]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var r = e(_r(d[1])),
      t = e(_r(d[2])),
      n = (function (e, r) {
        if ('function' == typeof WeakMap)
          var t = new WeakMap(),
            n = new WeakMap();
        return (function (e, r) {
          if (!r && e && e.__esModule) return e;
          var o,
            i,
            l = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return l;
          if ((o = r ? n : t)) {
            if (o.has(e)) return o.get(e);
            o.set(e, l);
          }
          for (const r in e)
            'default' !== r &&
              {}.hasOwnProperty.call(e, r) &&
              ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, r)) &&
              (i.get || i.set)
                ? o(l, r, i)
                : (l[r] = e[r]));
          return l;
        })(e, r);
      })(_r(d[3])),
      o = e(_r(d[4])),
      i = e(_r(d[5]));
    var l = ['color', 'indeterminate', 'progress', 'trackColor', 'style'],
      u = n.forwardRef((e, o) => {
        var u = e.color,
          s = void 0 === u ? '#1976D2' : u,
          c = e.indeterminate,
          p = void 0 !== c && c,
          v = e.progress,
          y = void 0 === v ? 0 : v,
          _ = e.trackColor,
          k = void 0 === _ ? 'transparent' : _,
          h = e.style,
          w = (0, t.default)(e, l),
          b = 100 * y,
          C = p ? '25%' : b + '%';
        return n.createElement(
          i.default,
          (0, r.default)({}, w, {
            'aria-valuemax': 100,
            'aria-valuemin': 0,
            'aria-valuenow': p ? null : b,
            ref: o,
            role: 'progressbar',
            style: [f.track, h, { backgroundColor: k }],
          }),
          n.createElement(i.default, {
            style: [{ backgroundColor: s, width: C }, f.progress, p && f.animation],
          })
        );
      });
    u.displayName = 'ProgressBar';
    var f = o.default.create({
      track: {
        forcedColorAdjust: 'none',
        height: 5,
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 0,
      },
      progress: { forcedColorAdjust: 'none', height: '100%', zIndex: -1 },
      animation: {
        animationDuration: '1s',
        animationKeyframes: [
          { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(400%)' } },
        ],
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      },
    });
    _e.default = u;
  },
  1558,
  [1, 16, 4, 5, 26, 19]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var t = e(_r(d[1])),
      r = e(_r(d[2])),
      n = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            n = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var o,
            f,
            i = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return i;
          if ((o = t ? n : r)) {
            if (o.has(e)) return o.get(e);
            o.set(e, i);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((f = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (f.get || f.set)
                ? o(i, t, f)
                : (i[t] = e[t]));
          return i;
        })(e, t);
      })(_r(d[3])),
      o = e(_r(d[4])),
      f = e(_r(d[5])),
      i = e(_r(d[6]));
    var s = ['style'],
      u =
        i.default &&
        window.CSS &&
        window.CSS.supports &&
        window.CSS.supports('top: constant(safe-area-inset-top)')
          ? 'constant'
          : 'env',
      p = n.forwardRef((e, o) => {
        var i = e.style,
          u = (0, r.default)(e, s);
        return n.createElement(f.default, (0, t.default)({}, u, { ref: o, style: [l.root, i] }));
      });
    p.displayName = 'SafeAreaView';
    var l = o.default.create({
      root: {
        paddingTop: u + '(safe-area-inset-top)',
        paddingRight: u + '(safe-area-inset-right)',
        paddingBottom: u + '(safe-area-inset-bottom)',
        paddingLeft: u + '(safe-area-inset-left)',
      },
    });
    _e.default = p;
  },
  1559,
  [1, 16, 4, 5, 26, 19, 27]
);
__d(
  function (g, r, i, a, m, _e, d) {
    'use strict';
    var t = r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var e = t(r(d[1])),
      o = t(r(d[2])),
      s = t(r(d[3])),
      E = t(r(d[4])),
      n = t(r(d[5])),
      l = t(r(d[6])),
      h = t(r(d[7])),
      u = t(r(d[8])),
      R = t(r(d[9])),
      c = t => {
        var e = t.touches,
          o = t.changedTouches,
          s = e && e.length > 0,
          E = o && o.length > 0;
        return !s && E ? o[0] : s ? e[0] : t;
      },
      _ = 'NOT_RESPONDER',
      S = 'RESPONDER_INACTIVE_PRESS_IN',
      T = 'RESPONDER_INACTIVE_PRESS_OUT',
      P = 'RESPONDER_ACTIVE_PRESS_IN',
      D = 'RESPONDER_ACTIVE_PRESS_OUT',
      N = 'RESPONDER_ACTIVE_LONG_PRESS_IN',
      b = 'RESPONDER_ACTIVE_LONG_PRESS_OUT',
      O = 'ERROR',
      A = {
        NOT_RESPONDER: !1,
        RESPONDER_INACTIVE_PRESS_IN: !1,
        RESPONDER_INACTIVE_PRESS_OUT: !1,
        RESPONDER_ACTIVE_PRESS_IN: !1,
        RESPONDER_ACTIVE_PRESS_OUT: !1,
        RESPONDER_ACTIVE_LONG_PRESS_IN: !1,
        RESPONDER_ACTIVE_LONG_PRESS_OUT: !1,
        ERROR: !1,
      },
      p = (0, o.default)(
        (0, o.default)({}, A),
        {},
        { RESPONDER_ACTIVE_PRESS_OUT: !0, RESPONDER_ACTIVE_PRESS_IN: !0 }
      ),
      f = (0, o.default)(
        (0, o.default)({}, A),
        {},
        {
          RESPONDER_INACTIVE_PRESS_IN: !0,
          RESPONDER_ACTIVE_PRESS_IN: !0,
          RESPONDER_ACTIVE_LONG_PRESS_IN: !0,
        }
      ),
      v = (0, o.default)((0, o.default)({}, A), {}, { RESPONDER_ACTIVE_LONG_PRESS_IN: !0 }),
      L = 'DELAY',
      I = 'RESPONDER_GRANT',
      y = 'RESPONDER_RELEASE',
      C = 'RESPONDER_TERMINATED',
      G = 'ENTER_PRESS_RECT',
      H = 'LEAVE_PRESS_RECT',
      V = 'LONG_PRESS_DETECTED',
      M = {
        NOT_RESPONDER: {
          DELAY: O,
          RESPONDER_GRANT: S,
          RESPONDER_RELEASE: O,
          RESPONDER_TERMINATED: O,
          ENTER_PRESS_RECT: O,
          LEAVE_PRESS_RECT: O,
          LONG_PRESS_DETECTED: O,
        },
        RESPONDER_INACTIVE_PRESS_IN: {
          DELAY: P,
          RESPONDER_GRANT: O,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: S,
          LEAVE_PRESS_RECT: T,
          LONG_PRESS_DETECTED: O,
        },
        RESPONDER_INACTIVE_PRESS_OUT: {
          DELAY: D,
          RESPONDER_GRANT: O,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: S,
          LEAVE_PRESS_RECT: T,
          LONG_PRESS_DETECTED: O,
        },
        RESPONDER_ACTIVE_PRESS_IN: {
          DELAY: O,
          RESPONDER_GRANT: O,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: P,
          LEAVE_PRESS_RECT: D,
          LONG_PRESS_DETECTED: N,
        },
        RESPONDER_ACTIVE_PRESS_OUT: {
          DELAY: O,
          RESPONDER_GRANT: O,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: P,
          LEAVE_PRESS_RECT: D,
          LONG_PRESS_DETECTED: O,
        },
        RESPONDER_ACTIVE_LONG_PRESS_IN: {
          DELAY: O,
          RESPONDER_GRANT: O,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: N,
          LEAVE_PRESS_RECT: b,
          LONG_PRESS_DETECTED: N,
        },
        RESPONDER_ACTIVE_LONG_PRESS_OUT: {
          DELAY: O,
          RESPONDER_GRANT: O,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: N,
          LEAVE_PRESS_RECT: b,
          LONG_PRESS_DETECTED: O,
        },
        error: {
          DELAY: _,
          RESPONDER_GRANT: S,
          RESPONDER_RELEASE: _,
          RESPONDER_TERMINATED: _,
          ENTER_PRESS_RECT: _,
          LEAVE_PRESS_RECT: _,
          LONG_PRESS_DETECTED: _,
        },
      },
      U = {
        componentDidMount: function () {
          (0, r(d[10]).warnOnce)(
            'TouchableMixin',
            'TouchableMixin is deprecated. Please use Pressable.'
          );
          var t = this.getTouchableNode && this.getTouchableNode();
          t &&
            t.addEventListener &&
            ((this._touchableBlurListener = t => {
              this._isTouchableKeyboardActive &&
                (this.state.touchable.touchState &&
                  this.state.touchable.touchState !== _ &&
                  this.touchableHandleResponderTerminate({ nativeEvent: t }),
                (this._isTouchableKeyboardActive = !1));
            }),
            t.addEventListener('blur', this._touchableBlurListener));
        },
        componentWillUnmount: function () {
          var t = this.getTouchableNode && this.getTouchableNode();
          (t && t.addEventListener && t.removeEventListener('blur', this._touchableBlurListener),
            this.touchableDelayTimeout && clearTimeout(this.touchableDelayTimeout),
            this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout),
            this.pressOutDelayTimeout && clearTimeout(this.pressOutDelayTimeout),
            (this.pressInLocation = null),
            (this.state.touchable.responderID = null));
        },
        touchableGetInitialState: function () {
          return { touchable: { touchState: void 0, responderID: null } };
        },
        touchableHandleResponderTerminationRequest: function () {
          return !this.props.rejectResponderTermination;
        },
        touchableHandleStartShouldSetResponder: function () {
          return !this.props.disabled;
        },
        touchableLongPressCancelsPress: function () {
          return !0;
        },
        touchableHandleResponderGrant: function (t) {
          var e = t.currentTarget;
          (t.persist(),
            this.pressOutDelayTimeout && clearTimeout(this.pressOutDelayTimeout),
            (this.pressOutDelayTimeout = null),
            (this.state.touchable.touchState = _),
            (this.state.touchable.responderID = e),
            this._receiveSignal(I, t));
          var o =
            void 0 !== this.touchableGetHighlightDelayMS
              ? Math.max(this.touchableGetHighlightDelayMS(), 0)
              : 130;
          0 !== (o = isNaN(o) ? 130 : o)
            ? (this.touchableDelayTimeout = setTimeout(this._handleDelay.bind(this, t), o))
            : this._handleDelay(t);
          var s =
            void 0 !== this.touchableGetLongPressDelayMS
              ? Math.max(this.touchableGetLongPressDelayMS(), 10)
              : 370;
          ((s = isNaN(s) ? 370 : s),
            (this.longPressDelayTimeout = setTimeout(this._handleLongDelay.bind(this, t), s + o)));
        },
        touchableHandleResponderRelease: function (t) {
          ((this.pressInLocation = null), this._receiveSignal(y, t));
        },
        touchableHandleResponderTerminate: function (t) {
          ((this.pressInLocation = null), this._receiveSignal(C, t));
        },
        touchableHandleResponderMove: function (t) {
          if (this.state.touchable.positionOnActivate) {
            var e = this.state.touchable.positionOnActivate,
              o = this.state.touchable.dimensionsOnActivate,
              s = this.touchableGetPressRectOffset
                ? this.touchableGetPressRectOffset()
                : { left: 20, right: 20, top: 20, bottom: 20 },
              E = s.left,
              n = s.top,
              l = s.right,
              h = s.bottom,
              u = this.touchableGetHitSlop ? this.touchableGetHitSlop() : null;
            u && ((E += u.left || 0), (n += u.top || 0), (l += u.right || 0), (h += u.bottom || 0));
            var R = c(t.nativeEvent),
              _ = R && R.pageX,
              T = R && R.pageY;
            if (this.pressInLocation)
              this._getDistanceBetweenPoints(
                _,
                T,
                this.pressInLocation.pageX,
                this.pressInLocation.pageY
              ) > 10 && this._cancelLongPressDelayTimeout();
            if (
              _ > e.left - E &&
              T > e.top - n &&
              _ < e.left + o.width + l &&
              T < e.top + o.height + h
            ) {
              var P = this.state.touchable.touchState;
              (this._receiveSignal(G, t),
                this.state.touchable.touchState === S &&
                  P !== S &&
                  this._cancelLongPressDelayTimeout());
            } else (this._cancelLongPressDelayTimeout(), this._receiveSignal(H, t));
          }
        },
        touchableHandleFocus: function (t) {
          this.props.onFocus && this.props.onFocus(t);
        },
        touchableHandleBlur: function (t) {
          this.props.onBlur && this.props.onBlur(t);
        },
        _remeasureMetricsOnActivation: function () {
          var t = this.state.touchable.responderID;
          null != t && u.default.measure(t, this._handleQueryLayout);
        },
        _handleQueryLayout: function (t, e, o, s, n, h) {
          (t || e || o || s || n || h) &&
            (this.state.touchable.positionOnActivate &&
              l.default.release(this.state.touchable.positionOnActivate),
            this.state.touchable.dimensionsOnActivate &&
              E.default.release(this.state.touchable.dimensionsOnActivate),
            (this.state.touchable.positionOnActivate = l.default.getPooled(n, h)),
            (this.state.touchable.dimensionsOnActivate = E.default.getPooled(o, s)));
        },
        _handleDelay: function (t) {
          ((this.touchableDelayTimeout = null), this._receiveSignal(L, t));
        },
        _handleLongDelay: function (t) {
          this.longPressDelayTimeout = null;
          var e = this.state.touchable.touchState;
          e !== P && e !== N
            ? console.error(
                'Attempted to transition from state `' +
                  e +
                  '` to `' +
                  N +
                  '`, which is not supported. This is most likely due to `Touchable.longPressDelayTimeout` not being cancelled.'
              )
            : this._receiveSignal(V, t);
        },
        _receiveSignal: function (t, e) {
          var o = this.state.touchable.responderID,
            s = this.state.touchable.touchState,
            E = M[s] && M[s][t];
          if (o || t !== y) {
            if (!E)
              throw new Error(
                'Unrecognized signal `' +
                  t +
                  '` or state `' +
                  s +
                  '` for Touchable responder `' +
                  o +
                  '`'
              );
            if (E === O)
              throw new Error(
                'Touchable cannot transition from `' +
                  s +
                  '` to `' +
                  t +
                  '` for responder `' +
                  o +
                  '`'
              );
            s !== E &&
              (this._performSideEffectsForTransition(s, E, t, e),
              (this.state.touchable.touchState = E));
          }
        },
        _cancelLongPressDelayTimeout: function () {
          (this.longPressDelayTimeout && clearTimeout(this.longPressDelayTimeout),
            (this.longPressDelayTimeout = null));
        },
        _isHighlight: function (t) {
          return t === P || t === N;
        },
        _savePressInLocation: function (t) {
          var e = c(t.nativeEvent),
            o = e && e.pageX,
            s = e && e.pageY,
            E = e && e.locationX,
            n = e && e.locationY;
          this.pressInLocation = { pageX: o, pageY: s, locationX: E, locationY: n };
        },
        _getDistanceBetweenPoints: function (t, e, o, s) {
          var E = t - o,
            n = e - s;
          return Math.sqrt(E * E + n * n);
        },
        _performSideEffectsForTransition: function (t, e, o, s) {
          var E = this._isHighlight(t),
            n = this._isHighlight(e);
          (o === C || o === y) && this._cancelLongPressDelayTimeout();
          var l = t === _ && e === S,
            h = !p[t] && p[e];
          if (
            ((l || h) && this._remeasureMetricsOnActivation(),
            f[t] && o === V && this.touchableHandleLongPress && this.touchableHandleLongPress(s),
            n && !E ? this._startHighlight(s) : !n && E && this._endHighlight(s),
            f[t] && o === y)
          ) {
            var u = !!this.props.onLongPress,
              R = v[t] && (!u || !this.touchableLongPressCancelsPress());
            (!v[t] || R) &&
              this.touchableHandlePress &&
              (n || E || (this._startHighlight(s), this._endHighlight(s)),
              this.touchableHandlePress(s));
          }
          (this.touchableDelayTimeout && clearTimeout(this.touchableDelayTimeout),
            (this.touchableDelayTimeout = null));
        },
        _playTouchSound: function () {
          u.default.playTouchSound();
        },
        _startHighlight: function (t) {
          (this._savePressInLocation(t),
            this.touchableHandleActivePressIn && this.touchableHandleActivePressIn(t));
        },
        _endHighlight: function (t) {
          this.touchableHandleActivePressOut &&
            (this.touchableGetPressOutDelayMS && this.touchableGetPressOutDelayMS()
              ? (this.pressOutDelayTimeout = setTimeout(() => {
                  this.touchableHandleActivePressOut(t);
                }, this.touchableGetPressOutDelayMS()))
              : this.touchableHandleActivePressOut(t));
        },
        touchableHandleKeyEvent: function (t) {
          var e = t.type,
            o = t.key;
          ('Enter' !== o && ' ' !== o) ||
            ('keydown' === e
              ? this._isTouchableKeyboardActive ||
                (this.state.touchable.touchState && this.state.touchable.touchState !== _) ||
                (this.touchableHandleResponderGrant(t), (this._isTouchableKeyboardActive = !0))
              : 'keyup' === e &&
                this._isTouchableKeyboardActive &&
                this.state.touchable.touchState &&
                this.state.touchable.touchState !== _ &&
                (this.touchableHandleResponderRelease(t), (this._isTouchableKeyboardActive = !1)),
            t.stopPropagation(),
            ('Enter' === o && 'link' === s.default.propsToAriaRole(this.props)) ||
              t.preventDefault());
        },
        withoutDefaultFocusAndBlur: {},
      },
      Y =
        (U.touchableHandleFocus,
        U.touchableHandleBlur,
        (0, e.default)(U, ['touchableHandleFocus', 'touchableHandleBlur']));
    U.withoutDefaultFocusAndBlur = Y;
    var B = {
      Mixin: U,
      TOUCH_TARGET_DEBUG: !1,
      renderDebugView: t => {
        var e = t.color,
          s = t.hitSlop;
        if (!B.TOUCH_TARGET_DEBUG) return null;
        var E = {};
        for (var l in (s = s || { top: 0, bottom: 0, left: 0, right: 0 })) E[l] = -s[l];
        var u = (0, n.default)(e);
        if ('number' != typeof u) return null;
        var c = '#' + ('00000000' + u.toString(16)).substr(-8);
        return h.default.createElement(R.default, {
          pointerEvents: 'none',
          style: (0, o.default)(
            {
              position: 'absolute',
              borderColor: c.slice(0, -2) + '55',
              borderWidth: 1,
              borderStyle: 'dashed',
              backgroundColor: c.slice(0, -2) + '0F',
            },
            E
          ),
        });
      },
    };
    _e.default = B;
  },
  1560,
  [1, 4, 9, 21, 1561, 38, 1563, 5, 82, 19, 41]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = t(r(d[1])),
      l = o.default.twoArgumentPooler;
    function n(t, o) {
      ((this.width = t), (this.height = o));
    }
    ((n.prototype.destructor = function () {
      ((this.width = null), (this.height = null));
    }),
      (n.getPooledFromElement = function (t) {
        return n.getPooled(t.offsetWidth, t.offsetHeight);
      }),
      o.default.addPoolingTo(n, l));
    e.default = n;
  },
  1561,
  [1, 1562]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    o(r(d[1]));
    var n = function (o, n) {
        var t = this;
        if (t.instancePool.length) {
          var l = t.instancePool.pop();
          return (t.call(l, o, n), l);
        }
        return new t(o, n);
      },
      t = function (o) {
        var n = this;
        (o.destructor(), n.instancePool.length < n.poolSize && n.instancePool.push(o));
      },
      l = n,
      u = {
        addPoolingTo: function (o, n) {
          var u = o;
          return (
            (u.instancePool = []),
            (u.getPooled = n || l),
            u.poolSize || (u.poolSize = 10),
            (u.release = t),
            u
          );
        },
        twoArgumentPooler: n,
      };
    e.default = u;
  },
  1562,
  [1, 100]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = t(r(d[1])),
      l = o.default.twoArgumentPooler;
    function u(t, o) {
      ((this.left = t), (this.top = o));
    }
    ((u.prototype.destructor = function () {
      ((this.left = null), (this.top = null));
    }),
      o.default.addPoolingTo(u, l));
    e.default = u;
  },
  1563,
  [1, 1562]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var s = (function (e, s) {
        if ('function' == typeof WeakMap)
          var t = new WeakMap(),
            n = new WeakMap();
        return (function (e, s) {
          if (!s && e && e.__esModule) return e;
          var r,
            l,
            o = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return o;
          if ((r = s ? n : t)) {
            if (r.has(e)) return r.get(e);
            r.set(e, o);
          }
          for (const s in e)
            'default' !== s &&
              {}.hasOwnProperty.call(e, s) &&
              ((l = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, s)) &&
              (l.get || l.set)
                ? r(o, s, l)
                : (o[s] = e[s]));
          return o;
        })(e, s);
      })(_r(d[1])),
      t = s,
      n = e(_r(d[2])),
      r = e(_r(d[3])),
      l = e(_r(d[4]));
    var o = {
        accessibilityDisabled: !0,
        accessibilityLabel: !0,
        accessibilityLiveRegion: !0,
        accessibilityRole: !0,
        accessibilityState: !0,
        accessibilityValue: !0,
        children: !0,
        disabled: !0,
        focusable: !0,
        nativeID: !0,
        onBlur: !0,
        onFocus: !0,
        onLayout: !0,
        testID: !0,
      },
      i = e => (0, n.default)(e, o);
    function c(e, n) {
      (0, _r(d[5]).warnOnce)(
        'TouchableWithoutFeedback',
        'TouchableWithoutFeedback is deprecated. Please use Pressable.'
      );
      var o = e.delayPressIn,
        c = e.delayPressOut,
        u = e.delayLongPress,
        f = e.disabled,
        b = e.focusable,
        y = e.onLongPress,
        P = e.onPress,
        p = e.onPressIn,
        h = e.onPressOut,
        v = e.rejectResponderTermination,
        _ = (0, s.useRef)(null),
        O = (0, s.useMemo)(
          () => ({
            cancelable: !v,
            disabled: f,
            delayLongPress: u,
            delayPressStart: o,
            delayPressEnd: c,
            onLongPress: y,
            onPress: P,
            onPressStart: p,
            onPressEnd: h,
          }),
          [f, o, c, u, y, P, p, h, v]
        ),
        L = (0, l.default)(_, O),
        j = t.Children.only(e.children),
        k = [j.props.children],
        w = i(e);
      ((w.accessibilityDisabled = f),
        (w.focusable = !f && !1 !== b),
        (w.ref = (0, r.default)(n, _, j.ref)));
      var M = Object.assign(w, L);
      return t.cloneElement(j, M, ...k);
    }
    var u = t.memo(t.forwardRef(c));
    u.displayName = 'TouchableWithoutFeedback';
    _e.default = u;
  },
  1564,
  [1, 5, 79, 87, 331, 41]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var u = t(r(d[1]));
    e.default = u.default;
  },
  1565,
  [1, 101]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var n = t(r(d[1])),
      u = t(r(d[2]));
    function f(t) {
      return n.default.createElement(u.default, t);
    }
    f.ignoreWarnings = () => {};
    e.default = f;
  },
  1566,
  [1, 5, 296]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var l = { ignoreLogs() {}, ignoreAllLogs() {}, uninstall() {}, install() {} };
    e.default = l;
  },
  1567,
  []
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function () {
        var e = t.useState(r.default.getColorScheme()),
          n = e[0],
          o = e[1];
        return (
          t.useEffect(
            () =>
              r.default.addChangeListener(function (e) {
                o(e.colorScheme);
              }).remove
          ),
          n
        );
      }));
    var t = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            n = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var o,
            f,
            u = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return u;
          if ((o = t ? n : r)) {
            if (o.has(e)) return o.get(e);
            o.set(e, u);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((f = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (f.get || f.set)
                ? o(u, t, f)
                : (u[t] = e[t]));
          return u;
        })(e, t);
      })(_r(d[1])),
      r = e(_r(d[2]));
  },
  1568,
  [1, 5, 1545]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    e.default = r(d[0]).useLocaleContext;
  },
  1569,
  [76]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useLayoutState = function (u) {
        var n = r(d[1]).__read((0, t.useState)(u), 2),
          o = n[0],
          c = n[1],
          l = (0, r(d[2]).useRecyclerViewContext)(),
          f = (0, t.useCallback)(
            function (t, u) {
              (c(function (u) {
                return 'function' == typeof t ? t(u) : t;
              }),
                u || null == l || l.layout());
            },
            [l]
          );
        return [o, f];
      }));
    var t = r(d[0]);
  },
  1570,
  [5, 518, 1571]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.RecyclerViewContextProvider = void 0),
      (e.useRecyclerViewContext = function () {
        return (0, t.useContext)(o);
      }),
      (e.useFlashListContext = function () {
        return (0, t.useContext)(o);
      }));
    var t = r(d[0]),
      o = (0, t.createContext)(void 0);
    e.RecyclerViewContextProvider = o.Provider;
  },
  1571,
  [5]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.useRecyclerViewManager = void 0));
    var n = r(d[0]);
    e.useRecyclerViewManager = function (t) {
      var c = r(d[1]).__read(
          (0, n.useState)(function () {
            return new (r(d[2]).RecyclerViewManager)(t);
          }),
          1
        )[0],
        u = r(d[1]).__read(
          (0, n.useState)(function () {
            return new (r(d[3]).VelocityTracker)();
          }),
          1
        )[0],
        o = t.data;
      return (
        (0, n.useMemo)(
          function () {
            c.updateProps(t);
          },
          [t]
        ),
        (0, n.useMemo)(
          function () {
            c.processDataUpdate();
          },
          [o]
        ),
        (0, n.useEffect)(function () {
          return (
            c.restoreIfNeeded(),
            function () {
              (c.dispose(), u.cleanUp());
            }
          );
        }, []),
        { recyclerViewManager: c, velocityTracker: u }
      );
    };
  },
  1572,
  [5, 518, 1573, 1586]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RecyclerViewManager = void 0));
    var t = r(d[0]).__importDefault(r(d[1])),
      o = (function () {
        function o(o) {
          var n = this;
          ((this.initialDrawBatchSize = 2),
            (this.isFirstLayoutComplete = !1),
            (this.hasRenderedProgressively = !1),
            (this.progressiveRenderCount = 0),
            (this._isDisposed = !1),
            (this._isLayoutManagerDirty = !1),
            (this._animationOptimizationsEnabled = !1),
            (this.firstItemOffset = 0),
            (this.ignoreScrollEvents = !1),
            (this.updateRenderStack = function (t) {
              n.renderStackManager.sync(n.getDataKey, n.getItemType, t, n.getDataLength());
            }),
            (this.getDataKey = this.getDataKey.bind(this)),
            (this.getItemType = this.getItemType.bind(this)),
            (this.overrideItemLayout = this.overrideItemLayout.bind(this)),
            (this.propsRef = o),
            (this.engagedIndicesTracker = new (r(d[2]).RVEngagedIndicesTrackerImpl)()),
            (this.renderStackManager = new (r(d[3]).RenderStackManager)(o.maxItemsInRecyclePool)),
            (this.itemViewabilityManager = new t.default(this)));
        }
        return (
          Object.defineProperty(o.prototype, 'animationOptimizationsEnabled', {
            get: function () {
              return this._animationOptimizationsEnabled;
            },
            set: function (t) {
              ((this._animationOptimizationsEnabled = t),
                (this.renderStackManager.disableRecycling = t));
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(o.prototype, 'isOffsetProjectionEnabled', {
            get: function () {
              return this.engagedIndicesTracker.enableOffsetProjection;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(o.prototype, 'isDisposed', {
            get: function () {
              return this._isDisposed;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(o.prototype, 'numColumns', {
            get: function () {
              var t;
              return null !== (t = this.propsRef.numColumns) && void 0 !== t ? t : 1;
            },
            enumerable: !1,
            configurable: !0,
          }),
          Object.defineProperty(o.prototype, 'props', {
            get: function () {
              return this.propsRef;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (o.prototype.setOffsetProjectionEnabled = function (t) {
            this.engagedIndicesTracker.enableOffsetProjection = t;
          }),
          (o.prototype.updateProps = function (t) {
            var o, n, s;
            ((this.propsRef = t),
              (this.engagedIndicesTracker.drawDistance =
                null !== (o = t.drawDistance) && void 0 !== o
                  ? o
                  : this.engagedIndicesTracker.drawDistance),
              (this.initialDrawBatchSize =
                null !==
                  (s =
                    null === (n = this.propsRef.overrideProps) || void 0 === n
                      ? void 0
                      : n.initialDrawBatchSize) && void 0 !== s
                  ? s
                  : this.initialDrawBatchSize));
          }),
          (o.prototype.updateScrollOffset = function (t, o) {
            if (this.layoutManager && !this._isDisposed) {
              var n = this.engagedIndicesTracker.updateScrollOffset(
                t - this.firstItemOffset,
                o,
                this.layoutManager
              );
              if (n) return (this.updateRenderStack(n), n);
            }
          }),
          (o.prototype.updateAverageRenderTime = function (t) {
            this.engagedIndicesTracker.averageRenderTime = t;
          }),
          (o.prototype.getIsFirstLayoutComplete = function () {
            return this.isFirstLayoutComplete;
          }),
          (o.prototype.getLayout = function (t) {
            if (!this.layoutManager)
              throw new Error(r(d[4]).ErrorMessages.layoutManagerNotInitializedLayoutInfo);
            return this.layoutManager.getLayout(t);
          }),
          (o.prototype.tryGetLayout = function (t) {
            if (this.layoutManager && t >= 0 && t < this.layoutManager.getLayoutCount())
              return this.layoutManager.getLayout(t);
          }),
          (o.prototype.getChildContainerDimensions = function () {
            if (!this.layoutManager)
              throw new Error(r(d[4]).ErrorMessages.layoutManagerNotInitializedChildContainer);
            return this.layoutManager.getLayoutSize();
          }),
          (o.prototype.getRenderStack = function () {
            return this.renderStackManager.getRenderStack();
          }),
          (o.prototype.getWindowSize = function () {
            if (!this.layoutManager)
              throw new Error(r(d[4]).ErrorMessages.layoutManagerNotInitializedWindowSize);
            return this.layoutManager.getWindowsSize();
          }),
          (o.prototype.getLastScrollOffset = function () {
            return this.engagedIndicesTracker.scrollOffset;
          }),
          (o.prototype.getMaxScrollOffset = function () {
            return Math.max(
              0,
              (this.propsRef.horizontal
                ? this.getChildContainerDimensions().width
                : this.getChildContainerDimensions().height) -
                (this.propsRef.horizontal
                  ? this.getWindowSize().width
                  : this.getWindowSize().height) +
                this.firstItemOffset
            );
          }),
          (o.prototype.getAbsoluteLastScrollOffset = function () {
            return this.engagedIndicesTracker.scrollOffset + this.firstItemOffset;
          }),
          (o.prototype.setScrollDirection = function (t) {
            this.engagedIndicesTracker.setScrollDirection(t);
          }),
          (o.prototype.resetVelocityCompute = function () {
            this.engagedIndicesTracker.resetVelocityHistory();
          }),
          (o.prototype.updateLayoutParams = function (t, o) {
            var n, s;
            this.firstItemOffset = o;
            var l = this.getLayoutManagerClass();
            if (
              this.layoutManager &&
              Boolean(
                null === (n = this.layoutManager) || void 0 === n ? void 0 : n.isHorizontal()
              ) !== Boolean(this.propsRef.horizontal)
            )
              throw new Error(r(d[4]).ErrorMessages.horizontalPropCannotBeToggled);
            this._isLayoutManagerDirty &&
              ((this.layoutManager = void 0), (this._isLayoutManagerDirty = !1));
            var u = {
              windowSize: t,
              maxColumns: this.numColumns,
              horizontal: Boolean(this.propsRef.horizontal),
              optimizeItemArrangement:
                null === (s = this.propsRef.optimizeItemArrangement) || void 0 === s || s,
              overrideItemLayout: this.overrideItemLayout,
              getItemType: this.getItemType,
            };
            this.layoutManager instanceof l
              ? this.layoutManager.updateLayoutParams(u)
              : (this.layoutManager = new l(u, this.layoutManager));
          }),
          (o.prototype.hasLayout = function () {
            return void 0 !== this.layoutManager;
          }),
          (o.prototype.computeVisibleIndices = function () {
            if (!this.layoutManager)
              throw new Error(r(d[4]).ErrorMessages.layoutManagerNotInitializedVisibleIndices);
            return this.engagedIndicesTracker.computeVisibleIndices(this.layoutManager);
          }),
          (o.prototype.getEngagedIndices = function () {
            return this.engagedIndicesTracker.getEngagedIndices();
          }),
          (o.prototype.modifyChildrenLayout = function (t, o) {
            var n, s;
            return (
              null === (n = this.layoutManager) || void 0 === n || n.modifyLayout(t, o),
              0 !== o &&
                ((null === (s = this.layoutManager) || void 0 === s ? void 0 : s.requiresRepaint)
                  ? ((this.layoutManager.requiresRepaint = !1), !0)
                  : this.hasRenderedProgressively
                    ? void 0 !== this.recomputeEngagedIndices()
                    : (this.renderProgressively(), !this.hasRenderedProgressively))
            );
          }),
          (o.prototype.computeItemViewability = function () {
            this.itemViewabilityManager.shouldListenToVisibleIndices &&
              this.itemViewabilityManager.updateViewableItems(
                this.propsRef.masonry
                  ? this.engagedIndicesTracker.getEngagedIndices().toArray()
                  : this.computeVisibleIndices().toArray()
              );
          }),
          (o.prototype.recordInteraction = function () {
            this.itemViewabilityManager.recordInteraction();
          }),
          (o.prototype.recomputeViewableItems = function () {
            this.itemViewabilityManager.recomputeViewableItems();
          }),
          (o.prototype.processDataUpdate = function () {
            var t, o;
            this.hasLayout() &&
              (this.modifyChildrenLayout(
                [],
                null !==
                  (o = null === (t = this.propsRef.data) || void 0 === t ? void 0 : t.length) &&
                  void 0 !== o
                  ? o
                  : 0
              ),
              this.hasRenderedProgressively &&
                !this.recomputeEngagedIndices() &&
                this.updateRenderStack(this.engagedIndicesTracker.getEngagedIndices()));
          }),
          (o.prototype.recomputeEngagedIndices = function () {
            return this.updateScrollOffset(this.getAbsoluteLastScrollOffset());
          }),
          (o.prototype.restoreIfNeeded = function () {
            this._isDisposed && (this._isDisposed = !1);
          }),
          (o.prototype.dispose = function () {
            ((this._isDisposed = !0), this.itemViewabilityManager.dispose());
          }),
          (o.prototype.markLayoutManagerDirty = function () {
            this._isLayoutManagerDirty = !0;
          }),
          (o.prototype.getInitialScrollIndex = function () {
            var t, o;
            return null !== (t = this.propsRef.initialScrollIndex) && void 0 !== t
              ? t
              : (
                    null === (o = this.propsRef.maintainVisibleContentPosition) || void 0 === o
                      ? void 0
                      : o.startRenderingFromBottom
                  )
                ? this.getDataLength() - 1
                : void 0;
          }),
          (o.prototype.shouldMaintainVisibleContentPosition = function () {
            var t;
            return (
              !(null === (t = this.propsRef.maintainVisibleContentPosition) || void 0 === t
                ? void 0
                : t.disabled) && !this.propsRef.horizontal
            );
          }),
          (o.prototype.getDataLength = function () {
            var t, o;
            return null !==
              (o = null === (t = this.propsRef.data) || void 0 === t ? void 0 : t.length) &&
              void 0 !== o
              ? o
              : 0;
          }),
          (o.prototype.hasStableDataKeys = function () {
            return Boolean(this.propsRef.keyExtractor);
          }),
          (o.prototype.getDataKey = function (t) {
            var o, n, s;
            return null !==
              (s =
                null === (n = (o = this.propsRef).keyExtractor) || void 0 === n
                  ? void 0
                  : n.call(o, this.propsRef.data[t], t)) && void 0 !== s
              ? s
              : t.toString();
          }),
          (o.prototype.getLayoutManagerClass = function () {
            if (this.propsRef.masonry && this.propsRef.horizontal)
              throw new Error(r(d[4]).ErrorMessages.masonryAndHorizontalIncompatible);
            if (this.numColumns > 1 && this.propsRef.horizontal)
              throw new Error(r(d[4]).ErrorMessages.numColumnsAndHorizontalIncompatible);
            return this.propsRef.masonry
              ? r(d[5]).RVMasonryLayoutManagerImpl
              : this.numColumns > 1 && !this.propsRef.horizontal
                ? r(d[6]).RVGridLayoutManagerImpl
                : r(d[7]).RVLinearLayoutManagerImpl;
          }),
          (o.prototype.applyInitialScrollAdjustment = function () {
            var t;
            if (this.layoutManager && 0 !== this.getDataLength()) {
              var o = this.getInitialScrollIndex(),
                n =
                  null === (t = this.layoutManager) || void 0 === t
                    ? void 0
                    : t.getLayout(null != o ? o : 0),
                s = this.propsRef.horizontal
                  ? null == n
                    ? void 0
                    : n.x
                  : null == n
                    ? void 0
                    : n.y;
              void 0 !== o
                ? (this.layoutManager.recomputeLayouts(0, o),
                  (this.engagedIndicesTracker.scrollOffset =
                    null != s ? s : 0 + this.firstItemOffset))
                : (this.engagedIndicesTracker.scrollOffset =
                    (null != s ? s : 0) - this.firstItemOffset);
            }
          }),
          (o.prototype.renderProgressively = function () {
            this.progressiveRenderCount++;
            var t = this.layoutManager;
            if (t) {
              this.applyInitialScrollAdjustment();
              var o = this.computeVisibleIndices();
              ((this.hasRenderedProgressively = o.every(function (o) {
                return t.getLayout(o).isHeightMeasured && t.getLayout(o).isWidthMeasured;
              })),
                this.hasRenderedProgressively && (this.isFirstLayoutComplete = !0));
              var n =
                this.numColumns *
                Math.pow(this.initialDrawBatchSize, Math.ceil(this.progressiveRenderCount / 5));
              !this.hasRenderedProgressively &&
                this.updateRenderStack(
                  o.slice(0, Math.min(o.length, this.getRenderStack().size + n))
                );
            }
          }),
          (o.prototype.getItemType = function (t) {
            var o, n, s;
            return (
              null !==
                (s =
                  null === (n = (o = this.propsRef).getItemType) || void 0 === n
                    ? void 0
                    : n.call(o, this.propsRef.data[t], t)) && void 0 !== s
                ? s
                : 'default'
            ).toString();
          }),
          (o.prototype.overrideItemLayout = function (t, o) {
            var n, s;
            null ===
              (s = null === (n = this.propsRef) || void 0 === n ? void 0 : n.overrideItemLayout) ||
              void 0 === s ||
              s.call(n, o, this.propsRef.data[t], t, this.numColumns, this.propsRef.extraData);
          }),
          o
        );
      })();
    e.RecyclerViewManager = o;
  },
  1573,
  [518, 1574, 1577, 1579, 1576, 1580, 1584, 1585]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var t = r(d[0]).__importDefault(r(d[1])),
      n = (function () {
        function n(n) {
          var o,
            l = this;
          ((this.viewabilityHelpers = []),
            (this.hasInteracted = !1),
            (this.dispose = function () {
              l.viewabilityHelpers.forEach(function (t) {
                return t.dispose();
              });
            }),
            (this.onVisibleIndicesChanged = function (t) {
              l.updateViewableItems(t);
            }),
            (this.recordInteraction = function () {
              l.hasInteracted ||
                ((l.hasInteracted = !0),
                l.viewabilityHelpers.forEach(function (t) {
                  t.hasInteracted = !0;
                }),
                l.updateViewableItems());
            }),
            (this.updateViewableItems = function (t) {
              var n,
                o = l.rvManager.getWindowSize();
              if (void 0 !== o && l.shouldListenToVisibleIndices) {
                var s =
                  (null !== (n = l.rvManager.getAbsoluteLastScrollOffset()) && void 0 !== n
                    ? n
                    : 0) - l.rvManager.firstItemOffset;
                l.viewabilityHelpers.forEach(function (n) {
                  var u;
                  n.updateViewableItems(
                    null !== (u = l.rvManager.props.horizontal) && void 0 !== u && u,
                    s,
                    o,
                    function (t) {
                      return l.rvManager.getLayout(t);
                    },
                    t
                  );
                });
              }
            }),
            (this.recomputeViewableItems = function () {
              (l.viewabilityHelpers.forEach(function (t) {
                return t.clearLastReportedViewableIndices();
              }),
                l.updateViewableItems());
            }),
            (this.createViewabilityHelper = function (n, o) {
              var s = function (t, n) {
                var o = l.rvManager.props.data[t],
                  s =
                    void 0 === o || void 0 === l.rvManager.props.keyExtractor
                      ? t.toString()
                      : l.rvManager.props.keyExtractor(o, t);
                return { index: t, isViewable: n, item: o, key: s, timestamp: Date.now() };
              };
              return new t.default(n, function (t, n, l) {
                null == o ||
                  o({
                    viewableItems: t.map(function (t) {
                      return s(t, !0);
                    }),
                    changed: r(d[0]).__spreadArray(
                      r(d[0]).__spreadArray(
                        [],
                        r(d[0]).__read(
                          n.map(function (t) {
                            return s(t, !0);
                          })
                        ),
                        !1
                      ),
                      r(d[0]).__read(
                        l.map(function (t) {
                          return s(t, !1);
                        })
                      ),
                      !1
                    ),
                  });
              });
            }),
            (this.rvManager = n),
            null !== n.props.onViewableItemsChanged &&
              void 0 !== n.props.onViewableItemsChanged &&
              this.viewabilityHelpers.push(
                this.createViewabilityHelper(n.props.viewabilityConfig, function (t) {
                  var o, l;
                  null === (l = (o = n.props).onViewableItemsChanged) ||
                    void 0 === l ||
                    l.call(o, t);
                })
              ),
            (null !== (o = n.props.viewabilityConfigCallbackPairs) && void 0 !== o
              ? o
              : []
            ).forEach(function (t, o) {
              l.viewabilityHelpers.push(
                l.createViewabilityHelper(t.viewabilityConfig, function (t) {
                  var l,
                    s,
                    u =
                      null ===
                        (s =
                          null === (l = n.props.viewabilityConfigCallbackPairs) || void 0 === l
                            ? void 0
                            : l[o]) || void 0 === s
                        ? void 0
                        : s.onViewableItemsChanged;
                  null == u || u(t);
                })
              );
            }));
        }
        return (
          Object.defineProperty(n.prototype, 'shouldListenToVisibleIndices', {
            get: function () {
              return this.viewabilityHelpers.length > 0;
            },
            enumerable: !1,
            configurable: !0,
          }),
          n
        );
      })();
    e.default = n;
  },
  1574,
  [518, 1575]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var t = (function () {
      function t(t, n) {
        ((this.possiblyViewableIndices = []),
          (this.hasInteracted = !1),
          (this.viewableIndices = []),
          (this.lastReportedViewableIndices = []),
          (this.timers = new Set()),
          (this.viewabilityConfig = t),
          (this.viewableIndicesChanged = n));
      }
      return (
        (t.prototype.dispose = function () {
          this.timers.forEach(clearTimeout);
        }),
        (t.prototype.updateViewableItems = function (t, n, l, s, o) {
          var h,
            c,
            v,
            u,
            w,
            b,
            f,
            p,
            I = this;
          if (
            (void 0 !== o && (this.possiblyViewableIndices = o),
            null !==
              (null === (h = this.viewabilityConfig) || void 0 === h
                ? void 0
                : h.itemVisiblePercentThreshold) &&
              void 0 !==
                (null === (c = this.viewabilityConfig) || void 0 === c
                  ? void 0
                  : c.itemVisiblePercentThreshold) &&
              null !==
                (null === (v = this.viewabilityConfig) || void 0 === v
                  ? void 0
                  : v.viewAreaCoveragePercentThreshold) &&
              void 0 !==
                (null === (u = this.viewabilityConfig) || void 0 === u
                  ? void 0
                  : u.viewAreaCoveragePercentThreshold))
          )
            throw new Error(r(d[0]).ErrorMessages.multipleViewabilityThresholdTypesNotSupported);
          if (
            null ===
              (b =
                null === (w = this.viewabilityConfig) || void 0 === w
                  ? void 0
                  : w.waitForInteraction) ||
            void 0 === b ||
            !b ||
            this.hasInteracted
          ) {
            var y = this.possiblyViewableIndices.filter(function (o) {
              var h, c;
              return I.isItemViewable(
                o,
                t,
                n,
                l,
                null === (h = I.viewabilityConfig) || void 0 === h
                  ? void 0
                  : h.viewAreaCoveragePercentThreshold,
                null === (c = I.viewabilityConfig) || void 0 === c
                  ? void 0
                  : c.itemVisiblePercentThreshold,
                s
              );
            });
            this.viewableIndices = y;
            var V =
              null !==
                (p =
                  null === (f = this.viewabilityConfig) || void 0 === f
                    ? void 0
                    : f.minimumViewTime) && void 0 !== p
                ? p
                : 250;
            if (V > 0) {
              var C = setTimeout(function () {
                (I.timers.delete(C), I.checkViewableIndicesChanges(y));
              }, V);
              this.timers.add(C);
            } else this.checkViewableIndicesChanges(y);
          }
        }),
        (t.prototype.checkViewableIndicesChanges = function (t) {
          var n = this,
            l = t.filter(function (t) {
              return n.viewableIndices.includes(t);
            }),
            s = l.filter(function (t) {
              return !n.lastReportedViewableIndices.includes(t);
            }),
            o = this.lastReportedViewableIndices.filter(function (t) {
              return !l.includes(t);
            });
          (s.length > 0 || o.length > 0) &&
            ((this.lastReportedViewableIndices = l), this.viewableIndicesChanged(l, s, o));
        }),
        (t.prototype.clearLastReportedViewableIndices = function () {
          this.lastReportedViewableIndices = [];
        }),
        (t.prototype.isItemViewable = function (t, n, l, s, o, h, c) {
          var v = c(t);
          if (void 0 === v) return !1;
          var u = (n ? v.x : v.y) - l,
            w = n ? v.width : v.height,
            b = n ? s.width : s.height,
            f = Math.min(u + w, b) - Math.max(u, 0);
          if (f === w) return !0;
          if (0 === f) return !1;
          var p = null != o;
          return (p ? f / b : f / w) >= (p ? 0.01 * o : 0.01 * (null != h ? h : 0));
        }),
        t
      );
    })();
    e.default = t;
  },
  1575,
  [1576]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ErrorMessages = void 0),
      (e.ErrorMessages = {
        multipleViewabilityThresholdTypesNotSupported:
          'You can set exactly one of itemVisiblePercentThreshold or viewAreaCoveragePercentThreshold. Specifying both is not supported.',
        flashListV2OnlySupportsNewArchitecture:
          'FlashList v2 is only supported on new architecture',
        layoutManagerNotInitializedLayoutInfo:
          'LayoutManager is not initialized, layout info is unavailable',
        layoutManagerNotInitializedChildContainer:
          'LayoutManager is not initialized, child container layout is unavailable',
        layoutManagerNotInitializedWindowSize:
          'LayoutManager is not initialized, window size is unavailable',
        horizontalPropCannotBeToggled:
          'Horizontal prop cannot be toggled, you can use a key on FlashList to recreate it.',
        layoutManagerNotInitializedVisibleIndices:
          'LayoutManager is not initialized, visible indices are not unavailable',
        masonryAndHorizontalIncompatible: 'Masonry and horizontal props are incompatible',
        numColumnsAndHorizontalIncompatible: 'numColumns and horizontal props are incompatible',
        indexOutOfBounds: 'index out of bounds, not enough layouts',
        fpsMonitorAlreadyRunning:
          'This FPS Monitor has already been run, please create a new instance',
        dataEmptyCannotRunBenchmark: 'Data is empty, cannot run benchmark',
        stickyHeadersNotSupportedForHorizontal:
          'Sticky headers are not supported when list is horizontal',
      }));
  },
  1576,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.RVEngagedIndicesTrackerImpl = void 0));
    var t = (function () {
      function t() {
        ((this.scrollOffset = 0),
          (this.drawDistance = r(d[0]).PlatformConfig.defaultDrawDistance),
          (this.enableOffsetProjection = !0),
          (this.averageRenderTime = 16),
          (this.forceDisableOffsetProjection = !1),
          (this.engagedIndices = r(d[1]).ConsecutiveNumbers.EMPTY),
          (this.smallMultiplier = 0.3),
          (this.largeMultiplier = 0.7),
          (this.velocityHistory = [0, 0, 0, -0.1, -0.1]),
          (this.velocityIndex = 0));
      }
      return (
        (t.prototype.updateScrollOffset = function (t, i, o) {
          this.scrollOffset = t;
          var s = o.getWindowsSize(),
            l = o.isHorizontal();
          i && this.updateVelocityHistory(l ? i.x : i.y);
          var n = this.isScrollingBackward(),
            c =
              this.enableOffsetProjection && !this.forceDisableOffsetProjection
                ? this.getProjectedScrollOffset(t, this.averageRenderTime)
                : t,
            h = c + (l ? s.width : s.height),
            y = 2 * this.drawDistance,
            f = n ? this.largeMultiplier : this.smallMultiplier,
            u = n ? this.smallMultiplier : this.largeMultiplier,
            p = Math.ceil(y * f),
            v = Math.ceil(y * u),
            I = Math.max(0, c - p),
            M = h + v + Math.max(0, p - c),
            w = o.getLayoutSize(),
            H = l ? w.width : w.height;
          if (M > H) {
            var S = M - H;
            ((M = H), (I = Math.max(0, I - S)));
          }
          var O = o.getVisibleLayouts(I, M),
            b = this.engagedIndices;
          return ((this.engagedIndices = O), O.equals(b) ? void 0 : O);
        }),
        (t.prototype.updateVelocityHistory = function (t) {
          ((this.velocityHistory[this.velocityIndex] = t),
            (this.velocityIndex = (this.velocityIndex + 1) % this.velocityHistory.length));
        }),
        (t.prototype.isScrollingBackward = function () {
          for (var t = 0, i = 0, o = 0; o < this.velocityHistory.length; o++)
            this.velocityHistory[o] > 0 ? t++ : this.velocityHistory[o] < 0 && i++;
          return t < i;
        }),
        (t.prototype.getMedianVelocity = function () {
          var t = r(d[2])
              .__spreadArray([], r(d[2]).__read(this.velocityHistory), !1)
              .sort(function (t, i) {
                return t - i;
              }),
            i = t.length;
          if (i % 2 == 1) return t[Math.floor(i / 2)];
          var o = i / 2;
          return (t[o - 1] + t[o]) / 2;
        }),
        (t.prototype.getProjectedScrollOffset = function (t, i) {
          return t + this.getMedianVelocity() * i;
        }),
        (t.prototype.computeVisibleIndices = function (t) {
          var i = t.getWindowsSize(),
            o = t.isHorizontal(),
            s = this.scrollOffset,
            l = s + (o ? i.width : i.height);
          return t.getVisibleLayouts(s, l);
        }),
        (t.prototype.getEngagedIndices = function () {
          return this.engagedIndices;
        }),
        (t.prototype.setScrollDirection = function (t) {
          'forward' === t
            ? ((this.velocityHistory = [0, 0, 0, 0.1, 0.1]), (this.velocityIndex = 0))
            : ((this.velocityHistory = [0, 0, 0, -0.1, -0.1]), (this.velocityIndex = 0));
        }),
        (t.prototype.resetVelocityHistory = function () {
          this.isScrollingBackward()
            ? this.setScrollDirection('backward')
            : this.setScrollDirection('forward');
        }),
        t
      );
    })();
    e.RVEngagedIndicesTrackerImpl = t;
  },
  1577,
  [1542, 1578, 518]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.ConsecutiveNumbers = void 0));
    var t = (function () {
      function t(t, n) {
        ((this.startIndex = t), (this.endIndex = n));
      }
      return (
        Object.defineProperty(t.prototype, 'length', {
          get: function () {
            return Math.max(0, this.endIndex - this.startIndex + 1);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.at = function (t) {
          return this.startIndex + t;
        }),
        (t.prototype.equals = function (t) {
          return this.startIndex === t.startIndex && this.endIndex === t.endIndex;
        }),
        (t.prototype.toArray = function () {
          if (0 === this.length) return [];
          for (var t = new Array(this.length), n = 0; n < this.length; n++)
            t[n] = this.startIndex + n;
          return t;
        }),
        (t.prototype.includes = function (t) {
          return t >= this.startIndex && t <= this.endIndex;
        }),
        (t.prototype.indexOf = function (t) {
          return this.includes(t) ? t - this.startIndex : -1;
        }),
        (t.prototype.findValue = function (t) {
          for (var n = 0; n < this.length; n++) {
            var i = this.startIndex + n;
            if (t(i, n, this)) return i;
          }
        }),
        (t.prototype.every = function (t) {
          for (var n = 0; n < this.length; n++) {
            if (!t(this.startIndex + n, n, this)) return !1;
          }
          return !0;
        }),
        (t.prototype.slice = function (n, i) {
          (void 0 === n && (n = 0), void 0 === i && (i = this.length));
          var s = this.startIndex + n,
            o = this.startIndex + Math.min(i, this.length) - 1;
          return new t(s, Math.max(s - 1, o));
        }),
        (t.prototype[Symbol.iterator] = function () {
          var t;
          return r(d[0]).__generator(this, function (n) {
            switch (n.label) {
              case 0:
                ((t = this.startIndex), (n.label = 1));
              case 1:
                return t <= this.endIndex ? [4, t] : [3, 4];
              case 2:
                (n.sent(), (n.label = 3));
              case 3:
                return (t++, [3, 1]);
              case 4:
                return [2];
            }
          });
        }),
        (t.EMPTY = new t(-1, -2)),
        t
      );
    })();
    e.ConsecutiveNumbers = t;
  },
  1578,
  [518]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RenderStackManager = void 0));
    var t = (function () {
      function t(t) {
        (void 0 === t && (t = Number.MAX_SAFE_INTEGER),
          (this.disableRecycling = !1),
          (this.maxItemsInRecyclePool = t),
          (this.recycleKeyPools = new Map()),
          (this.keyMap = new Map()),
          (this.stableIdMap = new Map()),
          (this.keyCounter = 0),
          (this.unProcessedIndices = new Set()));
      }
      return (
        (t.prototype.sync = function (t, l, i, o) {
          var n,
            s,
            y,
            c,
            h,
            u,
            p,
            f,
            v,
            I,
            x = this;
          (this.clearRecyclePool(),
            this.unProcessedIndices.clear(),
            this.keyMap.forEach(function (n, s) {
              var y = n.index,
                c = n.stableId,
                h = n.itemType;
              if (y >= o) x.recycleKey(s);
              else if ((x.disableRecycling || x.unProcessedIndices.add(y), i.includes(y))) {
                var u = t(y),
                  p = l(y);
                (c === u && h === p) || x.recycleKey(s);
              } else x.recycleKey(s);
            }));
          try {
            for (var M = r(d[0], 'tslib').__values(i), P = M.next(); !P.done; P = M.next()) {
              var _ = P.value;
              this.hasOptimizedKey(t(_)) && this.syncItem(_, l(_), t(_));
            }
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              P && !P.done && (s = M.return) && s.call(M);
            } finally {
              if (n) throw n.error;
            }
          }
          try {
            for (var b = r(d[0], 'tslib').__values(i), K = b.next(); !K.done; K = b.next()) {
              _ = K.value;
              this.hasOptimizedKey(t(_)) || this.syncItem(_, l(_), t(_));
            }
          } catch (t) {
            y = { error: t };
          } finally {
            try {
              K && !K.done && (c = b.return) && c.call(b);
            } finally {
              if (y) throw y.error;
            }
          }
          var R = [];
          try {
            for (
              var k = r(d[0], 'tslib').__values(this.keyMap.values()), w = k.next();
              !w.done;
              w = k.next()
            ) {
              (_ = w.value.index) < o && !i.includes(_) && R.push(_);
            }
          } catch (t) {
            h = { error: t };
          } finally {
            try {
              w && !w.done && (u = k.return) && u.call(k);
            } finally {
              if (h) throw h.error;
            }
          }
          try {
            for (var F = r(d[0], 'tslib').__values(R), T = F.next(); !T.done; T = F.next()) {
              _ = T.value;
              this.hasOptimizedKey(t(_)) && this.syncItem(_, l(_), t(_));
            }
          } catch (t) {
            p = { error: t };
          } finally {
            try {
              T && !T.done && (f = F.return) && f.call(F);
            } finally {
              if (p) throw p.error;
            }
          }
          try {
            for (var z = r(d[0], 'tslib').__values(R), S = z.next(); !S.done; S = z.next()) {
              _ = S.value;
              this.hasOptimizedKey(t(_)) || this.syncItem(_, l(_), t(_));
            }
          } catch (t) {
            v = { error: t };
          } finally {
            try {
              S && !S.done && (I = z.return) && I.call(z);
            } finally {
              if (v) throw v.error;
            }
          }
          this.cleanup(t, l, i, o);
        }),
        (t.prototype.hasOptimizedKey = function (t) {
          return this.stableIdMap.has(t);
        }),
        (t.prototype.cleanup = function (t, l, i, o) {
          var n,
            s,
            y,
            c,
            h = new Array();
          try {
            for (
              var u = r(d[0], 'tslib').__values(this.keyMap.entries()), p = u.next();
              !p.done;
              p = u.next()
            ) {
              var f = r(d[0]).__read(p.value, 2),
                v = f[0],
                I = (E = f[1]).index,
                x = E.itemType,
                M = E.stableId,
                P = I >= o,
                _ = !P && t(I) !== M;
              if (P || _) {
                var b = this.unProcessedIndices.values().next().value,
                  K = !0;
                if (void 0 !== b) {
                  var R = l(b),
                    k = t(b);
                  x === R && (this.syncItem(b, R, k), (K = !1));
                }
                K && (this.deleteKeyFromRecyclePool(x, v), this.stableIdMap.delete(M), h.push(v));
              }
            }
          } catch (t) {
            n = { error: t };
          } finally {
            try {
              p && !p.done && (s = u.return) && s.call(u);
            } finally {
              if (n) throw n.error;
            }
          }
          try {
            for (var w = r(d[0]).__values(h), F = w.next(); !F.done; F = w.next()) {
              v = F.value;
              this.keyMap.delete(v);
            }
          } catch (t) {
            y = { error: t };
          } finally {
            try {
              F && !F.done && (c = w.return) && c.call(w);
            } finally {
              if (y) throw y.error;
            }
          }
          var T = this.keyMap.size - i.length;
          if (T > this.maxItemsInRecyclePool)
            for (
              var z = T - this.maxItemsInRecyclePool,
                S = 0,
                O = Array.from(this.keyMap.entries()).reverse(),
                A = 0;
              A < O.length && S < z;
              A++
            ) {
              var E,
                C = r(d[0]).__read(O[A], 2);
              ((v = C[0]), (I = (E = C[1]).index), (x = E.itemType), (M = E.stableId));
              i.includes(I) ||
                (this.deleteKeyFromRecyclePool(x, v),
                this.stableIdMap.delete(M),
                this.keyMap.delete(v),
                S++);
            }
        }),
        (t.prototype.recycleKey = function (t) {
          if (!this.disableRecycling) {
            var l = this.keyMap.get(t);
            if (l) {
              var i = l.itemType;
              this.getRecyclePoolForType(i).add(t);
            }
          }
        }),
        (t.prototype.getRenderStack = function () {
          return this.keyMap;
        }),
        (t.prototype.syncItem = function (t, l, i) {
          var o = this.stableIdMap.get(i) || this.getKeyFromRecyclePool(l) || this.generateKey();
          this.unProcessedIndices.delete(t);
          var n = this.keyMap.get(o);
          return (
            n
              ? (this.deleteKeyFromRecyclePool(l, o),
                this.deleteKeyFromRecyclePool(n.itemType, o),
                this.stableIdMap.delete(n.stableId),
                (n.index = t),
                (n.itemType = l),
                (n.stableId = i))
              : this.keyMap.set(o, { itemType: l, index: t, stableId: i }),
            this.stableIdMap.set(i, o),
            o
          );
        }),
        (t.prototype.clearRecyclePool = function () {
          var t, l;
          try {
            for (
              var i = r(d[0]).__values(this.recycleKeyPools.values()), o = i.next();
              !o.done;
              o = i.next()
            ) {
              o.value.clear();
            }
          } catch (l) {
            t = { error: l };
          } finally {
            try {
              o && !o.done && (l = i.return) && l.call(i);
            } finally {
              if (t) throw t.error;
            }
          }
        }),
        (t.prototype.generateKey = function () {
          return (this.keyCounter++).toString();
        }),
        (t.prototype.deleteKeyFromRecyclePool = function (t, l) {
          var i;
          null === (i = this.recycleKeyPools.get(t)) || void 0 === i || i.delete(l);
        }),
        (t.prototype.getRecyclePoolForType = function (t) {
          var l = this.recycleKeyPools.get(t);
          return (l || ((l = new Set()), this.recycleKeyPools.set(t, l)), l);
        }),
        (t.prototype.getKeyFromRecyclePool = function (t) {
          var l = this.getRecyclePoolForType(t);
          if (l.size > 0) {
            var i = l.values().next().value;
            return (l.delete(i), i);
          }
        }),
        t
      );
    })();
    e.RenderStackManager = t;
  },
  1579,
  [518]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.RVMasonryLayoutManagerImpl = void 0));
    var t = (function (t) {
      function i(i, o) {
        var n,
          s = t.call(this, i, o) || this;
        return (
          (s.currentColumn = 0),
          (s.fullRelayoutRequired = !1),
          (s.boundedSize = i.windowSize.width),
          (s.optimizeItemArrangement = i.optimizeItemArrangement),
          (s.columnHeights =
            null !== (n = s.columnHeights) && void 0 !== n ? n : Array(s.maxColumns).fill(0)),
          s
        );
      }
      return (
        r(d[0]).__extends(i, t),
        (i.prototype.updateLayoutParams = function (i) {
          var o = this.maxColumns,
            n = this.optimizeItemArrangement;
          (t.prototype.updateLayoutParams.call(this, i),
            (this.boundedSize === i.windowSize.width &&
              o === i.maxColumns &&
              n === i.optimizeItemArrangement) ||
              ((this.boundedSize = i.windowSize.width),
              this.layouts.length > 0 &&
                (this.updateAllWidths(),
                this.recomputeLayouts(0, this.layouts.length - 1),
                (this.requiresRepaint = !0))));
        }),
        (i.prototype.processLayoutInfo = function (t, i) {
          var o, n;
          try {
            for (var s = r(d[0]).__values(t), h = s.next(); !h.done; h = s.next()) {
              var u = h.value,
                l = u.index,
                c = u.dimensions,
                p = this.layouts[l];
              ((p.height = c.height),
                (p.isHeightMeasured = !0),
                (p.isWidthMeasured = !0),
                (this.layouts[l] = p));
            }
          } catch (t) {
            o = { error: t };
          } finally {
            try {
              h && !h.done && (n = s.return) && n.call(s);
            } finally {
              if (o) throw o.error;
            }
          }
          if (this.fullRelayoutRequired)
            return (this.updateAllWidths(), (this.fullRelayoutRequired = !1), 0);
        }),
        (i.prototype.estimateLayout = function (t) {
          var i = this.layouts[t];
          ((i.width = this.getWidth(t)),
            (i.height = this.getEstimatedHeight(t)),
            (i.isWidthMeasured = !0),
            (i.enforcedWidth = !0));
        }),
        (i.prototype.handleSpanChange = function (t) {
          this.fullRelayoutRequired = !0;
        }),
        (i.prototype.getLayoutSize = function () {
          if (0 === this.layouts.length) return { width: 0, height: 0 };
          var t = Math.max.apply(
            Math,
            r(d[0]).__spreadArray([], r(d[0]).__read(this.columnHeights), !1)
          );
          return { width: this.boundedSize, height: t };
        }),
        (i.prototype.recomputeLayouts = function (t, i) {
          0 === t
            ? ((this.columnHeights = Array(this.maxColumns).fill(0)), (this.currentColumn = 0))
            : this.updateColumnHeightsToIndex(t);
          for (var o = this.layouts.length, n = t; n < o; n++) {
            var s = this.getLayout(n),
              h = this.getSpan(n, !0);
            this.optimizeItemArrangement
              ? 1 === h
                ? this.placeSingleColumnItem(s)
                : this.placeOptimizedMultiColumnItem(s, h)
              : this.placeItemSequentially(s, h);
          }
        }),
        (i.prototype.getWidth = function (t) {
          return (this.boundedSize / this.maxColumns) * this.getSpan(t);
        }),
        (i.prototype.updateAllWidths = function () {
          for (var t = 0; t < this.layouts.length; t++)
            ((this.layouts[t].width = this.getWidth(t)), (this.layouts[t].minHeight = void 0));
        }),
        (i.prototype.placeItemSequentially = function (t, i) {
          this.currentColumn + i > this.maxColumns && (this.currentColumn = 0);
          for (
            var o = this.columnHeights[this.currentColumn], n = this.currentColumn + 1;
            n < this.currentColumn + i;
            n++
          )
            n < this.maxColumns && (o = Math.max(o, this.columnHeights[n]));
          ((t.x = (this.boundedSize / this.maxColumns) * this.currentColumn), (t.y = o));
          for (n = this.currentColumn; n < this.currentColumn + i; n++)
            n < this.maxColumns && (this.columnHeights[n] = o + t.height);
          ((this.currentColumn += i),
            this.currentColumn >= this.maxColumns && (this.currentColumn = 0));
        }),
        (i.prototype.placeSingleColumnItem = function (t) {
          for (var i = 0, o = this.columnHeights[0], n = 1; n < this.maxColumns; n++)
            this.columnHeights[n] < o && ((o = this.columnHeights[n]), (i = n));
          ((t.x = (this.boundedSize / this.maxColumns) * i),
            (t.y = this.columnHeights[i]),
            (this.columnHeights[i] += t.height));
        }),
        (i.prototype.placeOptimizedMultiColumnItem = function (t, i) {
          for (var o = 0, n = Number.MAX_VALUE, s = 0; s <= this.maxColumns - i; s++) {
            for (var h = this.columnHeights[s], u = s + 1; u < s + i; u++)
              h = Math.max(h, this.columnHeights[u]);
            var l = 0;
            for (u = 0; u < this.maxColumns; u++)
              l += u >= s && u < s + i ? h + t.height : this.columnHeights[u];
            l < n && ((n = l), (o = s));
          }
          var c = Math.max.apply(
            Math,
            r(d[0]).__spreadArray([], r(d[0]).__read(this.columnHeights.slice(o, o + i)), !1)
          );
          ((t.x = (this.boundedSize / this.maxColumns) * o), (t.y = c));
          for (u = o; u < o + i; u++) this.columnHeights[u] = c + t.height;
        }),
        (i.prototype.updateColumnHeightsToIndex = function (t) {
          ((this.columnHeights = Array(this.maxColumns).fill(0)), (this.currentColumn = 0));
          for (var i = 0; i < t; i++) {
            for (
              var o = this.layouts[i],
                n = o.width,
                s = this.boundedSize / this.maxColumns,
                h = Math.round(n / s),
                u = Math.round(o.x / s),
                l = Math.min(u + h, this.maxColumns),
                c = u;
              c < l;
              c++
            )
              this.columnHeights[c] = Math.max(this.columnHeights[c], o.y + o.height);
            this.optimizeItemArrangement || (this.currentColumn = (u + h) % this.maxColumns);
          }
        }),
        i
      );
    })(r(d[1]).RVLayoutManager);
    e.RVMasonryLayoutManagerImpl = t;
  },
  1580,
  [518, 1581]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RVLayoutManager = void 0));
    var t = (function () {
      function t(t, i) {
        var n, o;
        ((this.requiresRepaint = !1),
          (this.maxItemsToProcess = 250),
          (this.spanSizeInfo = {}),
          (this.spanTracker = []),
          (this.currentMaxIndexWithChangedLayout = -1),
          (this.lastSkippedLayoutIndex = Number.MAX_VALUE),
          (this.heightAverageWindow = new (r(d[0]).MultiTypeAverageWindow)(5, 200)),
          (this.widthAverageWindow = new (r(d[0]).MultiTypeAverageWindow)(5, 200)),
          (this.getItemType = t.getItemType),
          (this.overrideItemLayout = t.overrideItemLayout),
          (this.layouts = null !== (n = null == i ? void 0 : i.layouts) && void 0 !== n ? n : []),
          i
            ? this.updateLayoutParams(t)
            : ((this.horizontal = Boolean(t.horizontal)),
              (this.windowSize = t.windowSize),
              (this.maxColumns = null !== (o = t.maxColumns) && void 0 !== o ? o : 1)));
      }
      return (
        (t.prototype.getEstimatedWidth = function (t) {
          return this.widthAverageWindow.getCurrentValue(this.getItemType(t));
        }),
        (t.prototype.getEstimatedHeight = function (t) {
          return this.heightAverageWindow.getCurrentValue(this.getItemType(t));
        }),
        (t.prototype.isHorizontal = function () {
          return this.horizontal;
        }),
        (t.prototype.getWindowsSize = function () {
          return this.windowSize;
        }),
        (t.prototype.getVisibleLayouts = function (t, i) {
          var n = (0, r(d[1]).findFirstVisibleIndex)(this.layouts, t, this.horizontal),
            o = (0, r(d[1]).findLastVisibleIndex)(this.layouts, i, this.horizontal);
          return -1 !== n && -1 !== o
            ? new (r(d[2]).ConsecutiveNumbers)(n, o)
            : r(d[2]).ConsecutiveNumbers.EMPTY;
        }),
        (t.prototype.deleteLayout = function (t) {
          var i, n;
          t.sort(function (t, i) {
            return i - t;
          });
          try {
            for (var o = r(d[3], 'tslib').__values(t), s = o.next(); !s.done; s = o.next()) {
              var h = s.value;
              this.layouts.splice(h, 1);
            }
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              s && !s.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          var u = Math.min.apply(Math, r(d[3]).__spreadArray([], r(d[3]).__read(t), !1));
          this._recomputeLayouts(this.getMinRecomputeIndex(u), this.getMaxRecomputeIndex(u));
        }),
        (t.prototype.modifyLayout = function (t, i) {
          var n;
          this.maxItemsToProcess = Math.max(this.maxItemsToProcess, 10 * t.length);
          var o = Number.MAX_VALUE;
          if (
            (this.layouts.length > i &&
              ((this.layouts.length = i), (this.spanTracker.length = i), (o = i - 1)),
            (o = Math.min(o, this.computeEstimatesAndMinMaxChangedLayout(t))),
            this.layouts.length < i && i > 0)
          ) {
            var s = this.layouts.length;
            ((this.layouts.length = i), (this.spanTracker.length = i));
            for (var h = s; h < i; h++) (this.getLayout(h), this.getSpan(h));
            this.recomputeLayouts(s, i - 1);
          }
          if (
            (o = Math.min(
              o,
              this.lastSkippedLayoutIndex,
              this.computeMinIndexWithChangedSpan(t),
              null !== (n = this.processLayoutInfo(t, i)) && void 0 !== n ? n : o,
              this.computeEstimatesAndMinMaxChangedLayout(t)
            )) >= 0 &&
            o < i
          ) {
            var u = this.getMaxRecomputeIndex(o);
            this._recomputeLayouts(o, u);
          }
          this.currentMaxIndexWithChangedLayout = -1;
        }),
        (t.prototype.getLayout = function (t) {
          if (t >= this.layouts.length) throw new Error(r(d[4]).ErrorMessages.indexOutOfBounds);
          var i = this.layouts[t];
          return (
            i || ((i = { x: 0, y: 0, width: 0, height: 0 }), (this.layouts[t] = i)),
            (i.isWidthMeasured && i.isHeightMeasured) || this.estimateLayout(t),
            i
          );
        }),
        (t.prototype.updateLayoutParams = function (t) {
          var i, n, o;
          ((this.windowSize = t.windowSize),
            (this.horizontal = null !== (i = t.horizontal) && void 0 !== i ? i : this.horizontal),
            (this.maxColumns = null !== (n = t.maxColumns) && void 0 !== n ? n : this.maxColumns),
            (this.optimizeItemArrangement =
              null !== (o = t.optimizeItemArrangement) && void 0 !== o
                ? o
                : this.optimizeItemArrangement));
        }),
        (t.prototype.getLayoutCount = function () {
          return this.layouts.length;
        }),
        (t.prototype.getSpan = function (t, i) {
          var n;
          (void 0 === i && (i = !1),
            (this.spanSizeInfo.span = void 0),
            this.overrideItemLayout(t, this.spanSizeInfo));
          var o = Math.min(
            null !== (n = this.spanSizeInfo.span) && void 0 !== n ? n : 1,
            this.maxColumns
          );
          return (i || (this.spanTracker[t] = o), o);
        }),
        (t.prototype.handleSpanChange = function (t) {}),
        (t.prototype.getMaxRecomputeIndex = function (t) {
          return Math.min(
            Math.max(t, this.currentMaxIndexWithChangedLayout) + this.maxItemsToProcess,
            this.layouts.length - 1
          );
        }),
        (t.prototype.getMinRecomputeIndex = function (t) {
          return t;
        }),
        (t.prototype._recomputeLayouts = function (t, i) {
          if (
            (this.recomputeLayouts(t, i),
            this.lastSkippedLayoutIndex >= t &&
              this.lastSkippedLayoutIndex <= i &&
              (this.lastSkippedLayoutIndex = Number.MAX_VALUE),
            i + 1 < this.layouts.length)
          ) {
            this.lastSkippedLayoutIndex = Math.min(i + 1, this.lastSkippedLayoutIndex);
            var n = this.layouts.length - 1;
            this.layouts[n].y < this.layouts[i].y &&
              (this.recomputeLayouts(this.lastSkippedLayoutIndex, n),
              (this.lastSkippedLayoutIndex = Number.MAX_VALUE));
          }
        }),
        (t.prototype.computeEstimatesAndMinMaxChangedLayout = function (t) {
          var i,
            n,
            o = Number.MAX_VALUE;
          try {
            for (var s = r(d[3]).__values(t), h = s.next(); !h.done; h = s.next()) {
              var u = h.value,
                l = u.index,
                p = u.dimensions,
                y = this.layouts[l];
              ((l >= this.lastSkippedLayoutIndex ||
                !y ||
                !y.isHeightMeasured ||
                !y.isWidthMeasured ||
                (0, r(d[5]).areDimensionsNotEqual)(y.height, p.height) ||
                (0, r(d[5]).areDimensionsNotEqual)(y.width, p.width)) &&
                ((o = Math.min(o, l)),
                (this.currentMaxIndexWithChangedLayout = Math.max(
                  this.currentMaxIndexWithChangedLayout,
                  l
                ))),
                this.heightAverageWindow.addValue(p.height, this.getItemType(l)),
                this.widthAverageWindow.addValue(p.width, this.getItemType(l)));
            }
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              h && !h.done && (n = s.return) && n.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return o;
        }),
        (t.prototype.computeMinIndexWithChangedSpan = function (t) {
          var i,
            n,
            o = Number.MAX_VALUE;
          try {
            for (var s = r(d[3]).__values(t), h = s.next(); !h.done; h = s.next()) {
              var u = h.value.index,
                l = this.getSpan(u, !0);
              l !== this.spanTracker[u] &&
                ((this.spanTracker[u] = l), this.handleSpanChange(u), (o = Math.min(o, u)));
            }
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              h && !h.done && (n = s.return) && n.call(s);
            } finally {
              if (i) throw i.error;
            }
          }
          return o;
        }),
        t
      );
    })();
    e.RVLayoutManager = t;
  },
  1581,
  [1541, 1582, 1578, 518, 1576, 1583]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    function n(n, t, u, f) {
      for (var o = 0, s = n.length - 1, c = -1; o <= s;) {
        var l = Math.floor((o + s) / 2),
          h = n[l],
          _ = u ? h.x : h.y,
          b = u ? h.width : h.height;
        f
          ? _ >= t || _ + b > t
            ? ((c = l), (s = l - 1))
            : (o = l + 1)
          : _ <= t
            ? ((c = l), (o = l + 1))
            : (s = l - 1);
      }
      return c;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.findFirstVisibleIndex = function (t, u, f) {
        return n(t, u, f, !0);
      }),
      (e.findLastVisibleIndex = function (t, u, f) {
        return n(t, u, f, !1);
      }));
  },
  1582,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    function t(t, n) {
      for (var l, h, o = 0, u = 0, c = t; c && c !== n;) {
        var s = c;
        ((o += null !== (l = s.scrollLeft) && void 0 !== l ? l : 0),
          (u += null !== (h = s.scrollTop) && void 0 !== h ? h : 0),
          (c = c.parentElement));
      }
      return { scrollX: o, scrollY: u };
    }
    function n(t, n) {
      return Math.abs(t - n) <= 1;
    }
    function l(t) {
      return t;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.areDimensionsNotEqual = function (t, l) {
        return !n(t, l);
      }),
      (e.areDimensionsEqual = n),
      (e.roundOffPixel = l),
      (e.measureParentSize = function (t) {
        return { x: 0, y: 0, width: t.clientWidth, height: t.clientHeight };
      }),
      (e.measureFirstChildLayout = function (n, l) {
        var h = n.getBoundingClientRect(),
          o = l.getBoundingClientRect(),
          u = t(n, l);
        return {
          x: h.left - o.left + u.scrollX,
          y: h.top - o.top + u.scrollY,
          width: h.width,
          height: h.height,
        };
      }),
      (e.measureItemLayout = function (t, l) {
        var h = { x: 0, y: 0, width: t.clientWidth, height: t.clientHeight };
        l &&
          (n(h.width, l.width) && (h.width = l.width),
          n(h.height, l.height) && (h.height = l.height));
        return h;
      }));
  },
  1583,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RVGridLayoutManagerImpl = void 0));
    var t = (function (t) {
      function i(i, o) {
        var h = t.call(this, i, o) || this;
        return ((h.fullRelayoutRequired = !1), (h.boundedSize = i.windowSize.width), h);
      }
      return (
        r(d[0]).__extends(i, t),
        (i.prototype.updateLayoutParams = function (i) {
          var o = this.maxColumns;
          (t.prototype.updateLayoutParams.call(this, i),
            (this.boundedSize === i.windowSize.width && o === i.maxColumns) ||
              ((this.boundedSize = i.windowSize.width),
              this.layouts.length > 0 &&
                (this.updateAllWidths(),
                this.recomputeLayouts(0, this.layouts.length - 1),
                (this.requiresRepaint = !0))));
        }),
        (i.prototype.processLayoutInfo = function (t, i) {
          var o, h;
          try {
            for (var s = r(d[0]).__values(t), n = s.next(); !n.done; n = s.next()) {
              var u = n.value,
                l = u.index,
                y = u.dimensions,
                p = this.layouts[l];
              ((p.height = y.height), (p.isHeightMeasured = !0), (p.isWidthMeasured = !0));
            }
          } catch (t) {
            o = { error: t };
          } finally {
            try {
              n && !n.done && (h = s.return) && h.call(s);
            } finally {
              if (o) throw o.error;
            }
          }
          if (this.fullRelayoutRequired)
            return (this.updateAllWidths(), (this.fullRelayoutRequired = !1), 0);
        }),
        (i.prototype.estimateLayout = function (t) {
          var i = this.layouts[t];
          ((i.width = this.getWidth(t)),
            (i.height = this.getEstimatedHeight(t)),
            (i.isWidthMeasured = !0),
            (i.enforcedWidth = !0));
        }),
        (i.prototype.handleSpanChange = function (t) {
          this.fullRelayoutRequired = !0;
        }),
        (i.prototype.getLayoutSize = function () {
          if (0 === this.layouts.length) return { width: 0, height: 0 };
          var t = this.computeTotalHeightTillRow(this.layouts.length - 1);
          return { width: this.boundedSize, height: t };
        }),
        (i.prototype.recomputeLayouts = function (t, i) {
          for (
            var o = this.locateFirstIndexInRow(Math.max(0, t - 1)),
              h = this.getLayout(o),
              s = h.x,
              n = h.y,
              u = o;
            u <= i;
            u++
          ) {
            var l = this.getLayout(u);
            if (!this.checkBounds(s, l.width)) {
              var y = this.processAndReturnTallestItemInRow(u - 1);
              ((n = y.y + y.height), (s = 0));
            }
            ((l.x = s), (l.y = n), (s += l.width));
          }
          i === this.layouts.length - 1 && this.processAndReturnTallestItemInRow(i);
        }),
        (i.prototype.getWidth = function (t) {
          return (this.boundedSize / this.maxColumns) * this.getSpan(t);
        }),
        (i.prototype.processAndReturnTallestItemInRow = function (t) {
          for (var i, o, h, s = this.locateFirstIndexInRow(t), n = 0, u = s, l = !1; u <= t;) {
            var y = this.layouts[u];
            if (
              ((l = l || Boolean(y.isHeightMeasured)),
              (n = Math.max(n, y.height)),
              y.height > (null !== (i = y.minHeight) && void 0 !== i ? i : 0) &&
                y.height > (null !== (o = null == h ? void 0 : h.height) && void 0 !== o ? o : 0) &&
                (h = y),
              ++u >= this.layouts.length)
            )
              break;
          }
          if (
            (!h && n > 0 && (n = Number.MAX_SAFE_INTEGER),
            (h = null != h ? h : this.layouts[s]),
            !l)
          )
            return h;
          if (h) {
            var p = h.height;
            for (
              n - h.height > 1 && ((p = 0), (this.requiresRepaint = !0)), u = s;
              u <= t &&
              ((this.layouts[u].minHeight = p),
              p > 0 && (this.layouts[u].height = p),
              !(++u >= this.layouts.length));
            );
            h.minHeight = 0;
          }
          return h;
        }),
        (i.prototype.computeTotalHeightTillRow = function (t) {
          for (
            var i = this.locateFirstIndexInRow(t), o = this.layouts[i].y, h = 0, s = i;
            s <= t && ((h = Math.max(h, this.layouts[s].height)), !(++s >= this.layouts.length));
          );
          return o + h;
        }),
        (i.prototype.updateAllWidths = function () {
          for (var t = 0; t < this.layouts.length; t++) this.layouts[t].width = this.getWidth(t);
        }),
        (i.prototype.checkBounds = function (t, i) {
          return t + i <= this.boundedSize + 0.9;
        }),
        (i.prototype.locateFirstIndexInRow = function (t) {
          if (0 === t) return 0;
          for (var i = t; i >= 0 && 0 !== this.layouts[i].x; i--);
          return Math.max(i, 0);
        }),
        i
      );
    })(r(d[1]).RVLayoutManager);
    e.RVGridLayoutManagerImpl = t;
  },
  1584,
  [518, 1581]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RVLinearLayoutManagerImpl = void 0));
    var t = (function (t) {
      function i(i, h) {
        var o = t.call(this, i, h) || this;
        return (
          (o.hasSize = !1),
          (o.tallestItemHeight = 0),
          (o.boundedSize = o.horizontal ? i.windowSize.height : i.windowSize.width),
          (o.hasSize = o.boundedSize > 0),
          o
        );
      }
      return (
        r(d[0]).__extends(i, t),
        (i.prototype.updateLayoutParams = function (i) {
          var h = this.horizontal;
          t.prototype.updateLayoutParams.call(this, i);
          var o = this.boundedSize;
          ((this.boundedSize = this.horizontal ? i.windowSize.height : i.windowSize.width),
            (o === this.boundedSize && h === this.horizontal) ||
              (this.layouts.length > 0 &&
                (this.recomputeLayouts(0, this.layouts.length - 1), (this.requiresRepaint = !0))));
        }),
        (i.prototype.processLayoutInfo = function (t, i) {
          var h, o;
          try {
            for (var n = r(d[0]).__values(t), s = n.next(); !s.done; s = n.next()) {
              var l = s.value,
                u = l.index,
                y = l.dimensions,
                z = this.layouts[u];
              ((z.width = this.horizontal ? y.width : this.boundedSize),
                (z.isHeightMeasured = !0),
                (z.isWidthMeasured = !0),
                (z.height = y.height));
            }
          } catch (t) {
            h = { error: t };
          } finally {
            try {
              s && !s.done && (o = n.return) && o.call(n);
            } finally {
              if (h) throw h.error;
            }
          }
          this.horizontal && !this.hasSize && this.normalizeLayoutHeights(t);
        }),
        (i.prototype.estimateLayout = function (t) {
          var i = this.layouts[t];
          ((i.width = this.horizontal ? this.getEstimatedWidth(t) : this.boundedSize),
            (i.height = this.getEstimatedHeight(t)),
            (i.isWidthMeasured = !this.horizontal),
            (i.enforcedWidth = !this.horizontal));
        }),
        (i.prototype.getLayoutSize = function () {
          var t, i;
          if (0 === this.layouts.length) return { width: 0, height: 0 };
          var h = this.layouts[this.layouts.length - 1];
          return {
            width: this.horizontal ? h.x + h.width : this.boundedSize,
            height: this.horizontal
              ? null !==
                  (i = null === (t = this.tallestItem) || void 0 === t ? void 0 : t.height) &&
                void 0 !== i
                ? i
                : this.boundedSize
              : h.y + h.height,
          };
        }),
        (i.prototype.normalizeLayoutHeights = function (t) {
          var i, h, o, n, s, l, u;
          try {
            for (var y = r(d[0]).__values(t), z = y.next(); !z.done; z = y.next()) {
              var v = z.value.index;
              (w = this.layouts[v]).height > (null !== (s = w.minHeight) && void 0 !== s ? s : 0) &&
                w.height > (null !== (l = null == u ? void 0 : u.height) && void 0 !== l ? l : 0) &&
                (u = w);
            }
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              z && !z.done && (h = y.return) && h.call(y);
            } finally {
              if (i) throw i.error;
            }
          }
          if (u && u.height !== this.tallestItemHeight) {
            var f = u.height;
            u.height < this.tallestItemHeight && ((this.requiresRepaint = !0), (f = 0));
            try {
              for (var c = r(d[0]).__values(this.layouts), p = c.next(); !p.done; p = c.next()) {
                var w = p.value;
                (f > 0 && (w.height = u.height), (w.minHeight = f));
              }
            } catch (t) {
              o = { error: t };
            } finally {
              try {
                p && !p.done && (n = c.return) && n.call(c);
              } finally {
                if (o) throw o.error;
              }
            }
            ((u.minHeight = 0), (this.tallestItem = u), (this.tallestItemHeight = u.height));
          }
        }),
        (i.prototype.recomputeLayouts = function (t, i) {
          for (var h = t; h <= i; h++) {
            var o = this.getLayout(h);
            if (0 === h) ((o.x = 0), (o.y = 0));
            else {
              var n = this.getLayout(h - 1);
              ((o.x = this.horizontal ? n.x + n.width : 0),
                (o.y = this.horizontal ? 0 : n.y + n.height));
            }
            this.horizontal
              ? this.hasSize && (o.minHeight = this.boundedSize)
              : (o.width = this.boundedSize);
          }
        }),
        i
      );
    })(r(d[1]).RVLayoutManager);
    e.RVLinearLayoutManagerImpl = t;
  },
  1585,
  [518, 1581]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.VelocityTracker = void 0));
    var t = (function () {
      function t() {
        ((this.lastUpdateTime = Date.now()),
          (this.velocity = { x: 0, y: 0 }),
          (this.timeoutId = null));
      }
      return (
        (t.prototype.computeVelocity = function (t, o, l, c) {
          var n = this;
          this.cleanUp();
          var s = Date.now(),
            u = (t - o) / Math.max(1, s - this.lastUpdateTime);
          ((this.lastUpdateTime = s),
            (this.velocity.x = l ? u : 0),
            (this.velocity.y = l ? 0 : u),
            c(this.velocity, !1),
            (this.timeoutId = setTimeout(function () {
              (n.cleanUp(),
                (n.lastUpdateTime = Date.now()),
                (n.velocity.x = 0),
                (n.velocity.y = 0),
                c(n.velocity, !0));
            }, 100)));
        }),
        (t.prototype.cleanUp = function () {
          null !== this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = null));
        }),
        t
      );
    })();
    e.VelocityTracker = t;
  },
  1586,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useRecyclerViewController = function (n, o, s, u) {
        var c = this,
          f = (0, r(d[1]).useUnmountFlag)(),
          l = r(d[2]).__read((0, t.useState)(0), 2),
          v = (l[0], l[1]),
          p = (0, t.useRef)(!1),
          h = (0, t.useRef)(!1),
          I = (0, t.useRef)(n.getDataLength()),
          O = (0, r(d[3]).useUnmountAwareTimeout)().setTimeout,
          y = (0, t.useRef)(void 0),
          b = (0, t.useRef)(void 0),
          S = (0, t.useRef)([]),
          L = (0, t.useCallback)(
            function (t, o) {
              void 0 !== n.updateScrollOffset(t)
                ? (S.current.push(o),
                  v(function (t) {
                    return t + 1;
                  }))
                : o();
            },
            [n]
          ),
          w = (0, t.useCallback)(
            function () {
              if (
                n.getIsFirstLayoutComplete() &&
                n.hasStableDataKeys() &&
                n.getDataLength() > 0 &&
                n.shouldMaintainVisibleContentPosition()
              ) {
                var t = Math.max(0, n.computeVisibleIndices().startIndex);
                void 0 !== t &&
                  t >= 0 &&
                  ((y.current = n.getDataKey(t)),
                  (b.current = r(d[2]).__assign({}, n.getLayout(t))));
              }
            },
            [n]
          ),
          x = (0, t.useCallback)(
            function () {
              var t,
                o,
                c,
                f = n.props,
                l = f.horizontal,
                v = f.data,
                h = S.current;
              ((S.current = []),
                h.forEach(function (t) {
                  return t();
                }));
              var x = n.getDataLength();
              if (
                n.getIsFirstLayoutComplete() &&
                n.hasStableDataKeys() &&
                x > 0 &&
                n.shouldMaintainVisibleContentPosition()
              ) {
                var _ = x !== I.current;
                if (y.current) {
                  var C =
                    null !==
                      (t = n.getEngagedIndices().findValue(function (t) {
                        return n.getDataKey(t) === y.current;
                      })) && void 0 !== t
                      ? t
                      : _
                        ? null == v
                          ? void 0
                          : v.findIndex(function (t, o) {
                              return n.getDataKey(o) === y.current;
                            })
                        : void 0;
                  if (void 0 !== C && C >= 0) {
                    var T = l ? n.getLayout(C).x - b.current.x : n.getLayout(C).y - b.current.y;
                    if (
                      ((b.current = r(d[2]).__assign({}, n.getLayout(C))),
                      0 !== T && !p.current && !n.animationOptimizationsEnabled)
                    ) {
                      if (r(d[4]).PlatformConfig.supportsOffsetCorrection)
                        null === (o = u.current) || void 0 === o || o.scrollBy(T);
                      else {
                        var D = l
                          ? { x: n.getAbsoluteLastScrollOffset() + T, animated: !1 }
                          : { y: n.getAbsoluteLastScrollOffset() + T, animated: !1 };
                        null === (c = s.current) || void 0 === c || c.scrollTo(D);
                      }
                      _ &&
                        (L(n.getAbsoluteLastScrollOffset() + T, function () {}),
                        (n.ignoreScrollEvents = !0),
                        O(function () {
                          n.ignoreScrollEvents = !1;
                        }, 100));
                    }
                  }
                }
                w();
              }
              I.current = n.getDataLength();
            },
            [n, u, s, O, L, w]
          ),
          _ = (0, t.useMemo)(
            function () {
              return {
                get props() {
                  return n.props;
                },
                scrollToOffset: function (t) {
                  var o = t.offset,
                    u = t.animated,
                    c = t.skipFirstItemOffset,
                    f = void 0 === c || c,
                    l = n.props.horizontal;
                  if (s.current) {
                    r(d[5]).I18nManager.isRTL &&
                      l &&
                      (o =
                        (0, r(d[6]).adjustOffsetForRTL)(
                          o,
                          n.getChildContainerDimensions().width,
                          n.getWindowSize().width
                        ) + (f ? n.firstItemOffset : -n.firstItemOffset));
                    var v = o + (f ? 0 : n.firstItemOffset),
                      p = l ? { x: v, y: 0 } : { x: 0, y: v };
                    s.current.scrollTo(r(d[2]).__assign(r(d[2]).__assign({}, p), { animated: u }));
                  }
                },
                clearLayoutCacheOnUpdate: function () {
                  n.markLayoutManagerDirty();
                },
                flashScrollIndicators: function () {
                  s.current.flashScrollIndicators();
                },
                getNativeScrollRef: function () {
                  return s.current;
                },
                getScrollResponder: function () {
                  return s.current.getScrollResponder();
                },
                getScrollableNode: function () {
                  return s.current.getScrollableNode();
                },
                scrollToEnd: function () {
                  for (var t = [], o = 0; o < arguments.length; o++) t[o] = arguments[o];
                  return r(d[2]).__awaiter(
                    c,
                    r(d[2]).__spreadArray([], r(d[2]).__read(t), !1),
                    void 0,
                    function (t) {
                      var o,
                        u,
                        c = (void 0 === t ? {} : t).animated;
                      return r(d[2]).__generator(this, function (t) {
                        switch (t.label) {
                          case 0:
                            return (o = n.props.data) && o.length > 0
                              ? ((u = o.length - 1),
                                n.getEngagedIndices().includes(u)
                                  ? [3, 2]
                                  : [4, _.scrollToIndex({ index: u, animated: c })])
                              : [3, 2];
                          case 1:
                            (t.sent(), (t.label = 2));
                          case 2:
                            return (
                              O(function () {
                                s.current.scrollToEnd({ animated: c });
                              }, 0),
                              [2]
                            );
                        }
                      });
                    }
                  );
                },
                scrollToTop: function (t) {
                  var n = (void 0 === t ? {} : t).animated;
                  _.scrollToOffset({ offset: 0, animated: n });
                },
                scrollToIndex: function (t) {
                  var o = t.index,
                    u = t.animated,
                    c = t.viewPosition,
                    l = t.viewOffset;
                  return new Promise(function (t) {
                    var v = n.props.horizontal;
                    if (s.current && o >= 0 && o < n.getDataLength()) {
                      ((p.current = !0), n.setOffsetProjectionEnabled(!1));
                      var h = function () {
                          var t = n.getLayout(o),
                            s = v ? t.x : t.y,
                            u = s;
                          if (void 0 !== c || void 0 !== l) {
                            var f = v ? n.getWindowSize().width : n.getWindowSize().height,
                              p = v ? t.width : t.height;
                            (void 0 !== c && (u = s - (f - p) * c), void 0 !== l && (u += l));
                          }
                          return u + n.firstItemOffset;
                        },
                        I = n.getAbsoluteLastScrollOffset(),
                        y = 2 * (v ? n.getWindowSize().width : n.getWindowSize().height),
                        b = function () {
                          var t = I,
                            o = h();
                          return (
                            o > t
                              ? ((t = Math.max(o - y, t)), n.setScrollDirection('forward'))
                              : ((t = Math.min(o + y, t)), n.setScrollDirection('backward')),
                            t
                          );
                        },
                        S = h(),
                        w = b(),
                        x = S,
                        C = w,
                        T = function (s) {
                          f.current
                            ? t()
                            : s >= 5
                              ? D()
                              : L(u ? x + (s / 4) * (C - x) : C + (s / 4) * (x - C), function () {
                                  if (o >= n.getDataLength())
                                    return (_.scrollToEnd({ animated: u }), void t());
                                  var c = h();
                                  (c < S && c < w) || (c > S && c > w)
                                    ? ((x = c), (C = b()), (S = c), (w = C), T(0))
                                    : T(s + 1);
                                });
                        },
                        D = function () {
                          x = h();
                          var o = n.getMaxScrollOffset();
                          (x > o && (x = o),
                            u &&
                              _.scrollToOffset({
                                offset: C,
                                animated: !1,
                                skipFirstItemOffset: !0,
                              }),
                            _.scrollToOffset({ offset: x, animated: u, skipFirstItemOffset: !0 }),
                            O(
                              function () {
                                ((p.current = !1), n.setOffsetProjectionEnabled(!0), t());
                              },
                              u ? 300 : 200
                            ));
                        };
                      T(0);
                    } else t();
                  });
                },
                scrollToItem: function (t) {
                  var o = t.item,
                    u = t.animated,
                    c = t.viewPosition,
                    f = t.viewOffset,
                    l = n.props.data;
                  if (s.current && l) {
                    var v = l.findIndex(function (t) {
                      return t === o;
                    });
                    v >= 0 &&
                      _.scrollToIndex({ index: v, animated: u, viewPosition: c, viewOffset: f });
                  }
                },
                getFirstItemOffset: function () {
                  return n.firstItemOffset;
                },
                getWindowSize: function () {
                  return n.getWindowSize();
                },
                getLayout: function (t) {
                  return n.tryGetLayout(t);
                },
                getAbsoluteLastScrollOffset: function () {
                  return n.getAbsoluteLastScrollOffset();
                },
                getChildContainerDimensions: function () {
                  return n.getChildContainerDimensions();
                },
                recordInteraction: function () {
                  n.recordInteraction();
                },
                computeVisibleIndices: function () {
                  return n.computeVisibleIndices();
                },
                getFirstVisibleIndex: function () {
                  return n.computeVisibleIndices().startIndex;
                },
                recomputeViewableItems: function () {
                  n.recomputeViewableItems();
                },
                prepareForLayoutAnimationRender: function () {
                  (n.props.keyExtractor ||
                    console.warn(r(d[7]).WarningMessages.keyExtractorNotDefinedForAnimation),
                    (n.animationOptimizationsEnabled = !0));
                },
              };
            },
            [n, s, O, f, L]
          ),
          C = (0, t.useCallback)(
            function () {
              var t,
                o,
                s = n.props,
                u = s.horizontal,
                c = s.data,
                f = null !== (t = n.getInitialScrollIndex()) && void 0 !== t ? t : -1,
                l = null !== (o = null == c ? void 0 : c.length) && void 0 !== o ? o : 0;
              if (f >= 0 && f < l && !h.current && n.getIsFirstLayoutComplete()) {
                (O(function () {
                  ((h.current = !0), (p.current = !1));
                }, 100),
                  (p.current = !0));
                var v = u ? n.getLayout(f).x : n.getLayout(f).y;
                (_.scrollToOffset({ offset: v, animated: !1, skipFirstItemOffset: !1 }),
                  O(function () {
                    _.scrollToOffset({ offset: v, animated: !1, skipFirstItemOffset: !1 });
                  }, 0));
              }
            },
            [_, n, O]
          );
        return (
          (0, t.useImperativeHandle)(
            o,
            function () {
              var t = r(d[2]).__assign(r(d[2]).__assign({}, s.current), _);
              return (
                Object.defineProperty(t, 'props', {
                  get: function () {
                    return n.props;
                  },
                  enumerable: !0,
                  configurable: !0,
                }),
                t
              );
            },
            [_, s, n]
          ),
          {
            applyOffsetCorrection: x,
            computeFirstVisibleIndexForOffsetCorrection: w,
            applyInitialScrollIndex: C,
            handlerMethods: _,
          }
        );
      }));
    var t = r(d[0]);
  },
  1587,
  [5, 1588, 518, 1589, 1542, 1543, 1590, 1591]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.useUnmountFlag = void 0));
    var u = r(d[0]);
    e.useUnmountFlag = function () {
      var n = (0, u.useRef)(!1);
      return (
        (0, u.useLayoutEffect)(function () {
          return (
            (n.current = !1),
            function () {
              n.current = !0;
            }
          );
        }, []),
        n
      );
    };
  },
  1588,
  [5]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useUnmountAwareTimeout = function () {
        var t = r(d[1]).__read(
          (0, n.useState)(function () {
            return new Set();
          }),
          1
        )[0];
        return (
          (0, n.useEffect)(
            function () {
              return function () {
                (t.forEach(function (n) {
                  return g.clearTimeout(n);
                }),
                  t.clear());
              };
            },
            [t]
          ),
          {
            setTimeout: (0, n.useCallback)(
              function (n, u) {
                var o = g.setTimeout(function () {
                  (t.delete(o), n());
                }, u);
                t.add(o);
              },
              [t]
            ),
          }
        );
      }),
      (e.useUnmountAwareAnimationFrame = function () {
        var t = r(d[1]).__read(
          (0, n.useState)(function () {
            return new Set();
          }),
          1
        )[0];
        return (
          (0, n.useEffect)(
            function () {
              return function () {
                (t.forEach(function (n) {
                  return cancelAnimationFrame(n);
                }),
                  t.clear());
              };
            },
            [t]
          ),
          {
            requestAnimationFrame: (0, n.useCallback)(
              function (n) {
                var u = g.requestAnimationFrame(function (o) {
                  (t.delete(u), n(o));
                });
                t.add(u);
              },
              [t]
            ),
          }
        );
      }));
    var n = r(d[0]);
  },
  1589,
  [5, 518]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.adjustOffsetForRTL = function (t, u, n) {
        return u - t - n;
      }));
  },
  1590,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.WarningMessages = void 0),
      (e.WarningMessages = {
        keyExtractorNotDefinedForAnimation:
          'keyExtractor is not defined. This might cause the animations to not work as expected.',
        exceededMaxRendersWithoutCommit:
          "Exceeded max renders without commit. This might mean that you have duplicate keys in your keyExtractor output or your list is nested in a ScrollView causing a lot of items to render at once. If it's none of those and is causing a real issue or error, consider reporing this on FlashList Github",
      }));
  },
  1591,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useOnLoad = e.useOnListLoad = void 0));
    var n = r(d[0]);
    e.useOnListLoad = function (t, u) {
      var o = (0, n.useRef)(Date.now()),
        s = r(d[1]).__read((0, n.useState)(!1), 2),
        c = s[0],
        f = s[1],
        L = t.getDataLength(),
        l = (0, r(d[2]).useUnmountAwareAnimationFrame)().requestAnimationFrame;
      return (
        (0, n.useMemo)(
          function () {
            o.current = Date.now();
          },
          [L]
        ),
        (0, e.useOnLoad)(t, function () {
          var n = Date.now() - o.current;
          l(function () {
            (null == u || u({ elapsedTimeInMs: n }), f(!0));
          });
        }),
        { isLoaded: c }
      );
    };
    e.useOnLoad = function (t, u) {
      var o = (0, n.useRef)(!1);
      (0, n.useEffect)(function () {
        t.getIsFirstLayoutComplete() && !o.current && ((o.current = !0), u());
      });
    };
  },
  1592,
  [5, 518, 1589]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useBoundDetection = function (n, o) {
        var u = (0, t.useRef)(!1),
          s = (0, t.useRef)(!1),
          l = (0, t.useRef)(!1),
          c = (0, t.useRef)(Date.now()),
          h = n.props.data,
          f = (0, r(d[1]).useUnmountAwareAnimationFrame)().requestAnimationFrame,
          v = n.hasLayout() ? n.getWindowSize().height : 0,
          w = n.hasLayout() ? n.getChildContainerDimensions().height : 0,
          C = n.hasLayout() ? n.getWindowSize().width : 0,
          p = n.hasLayout() ? n.getChildContainerDimensions().width : 0,
          R = (0, t.useCallback)(
            function () {
              var t;
              c.current = Date.now();
              var o = n.props,
                h = o.onEndReached,
                f = o.onStartReached,
                v = o.maintainVisibleContentPosition,
                w = o.horizontal,
                C = o.onEndReachedThreshold,
                p = o.onStartReachedThreshold,
                R =
                  null !== (t = null == v ? void 0 : v.autoscrollToBottomThreshold) && void 0 !== t
                    ? t
                    : -1;
              if ((h || f || !(R < 0)) && n.getIsFirstLayoutComplete()) {
                var D = n.getAbsoluteLastScrollOffset(),
                  S = n.getChildContainerDimensions(),
                  b = n.getWindowSize(),
                  y = !0 === w,
                  L = y ? b.width : b.height,
                  T = (y ? S.width : S.height) + n.firstItemOffset;
                if (h) {
                  var A = (null != C ? C : 0.5) * L,
                    E = Math.ceil(D + L) >= T - A;
                  (E && !u.current && ((u.current = !0), h()), (u.current = E));
                }
                if (f) {
                  var z = D <= (null != p ? p : 0.2) * L;
                  (z && !s.current && ((s.current = !0), f()), (s.current = z));
                }
                if (!y && R >= 0) {
                  var B = R * L,
                    M = Math.ceil(D + L) >= T - B;
                  l.current = !!M;
                }
              }
            },
            [n]
          ),
          D = (0, t.useCallback)(
            function () {
              l.current &&
                ((l.current = !1),
                f(function () {
                  var t,
                    u,
                    s,
                    l =
                      null ===
                        (u =
                          null === (t = n.props.maintainVisibleContentPosition) || void 0 === t
                            ? void 0
                            : t.animateAutoScrollToBottom) ||
                      void 0 === u ||
                      u;
                  null === (s = o.current) || void 0 === s || s.scrollToEnd({ animated: l });
                }));
            },
            [f, o, n]
          );
        return (
          (0, t.useMemo)(
            function () {
              u.current = !1;
            },
            [h]
          ),
          (0, t.useEffect)(
            function () {
              D();
            },
            [h, D, v, C]
          ),
          (0, t.useEffect)(
            function () {
              Date.now() - c.current >= 100 && D();
            },
            [w, p, n.firstItemOffset, D]
          ),
          { checkBounds: R }
        );
      }));
    var t = r(d[0]);
  },
  1593,
  [5, 1589]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useSecondaryProps = function (n) {
        var o = n.ListHeaderComponent,
          l = n.ListHeaderComponentStyle,
          s = n.ListFooterComponent,
          u = n.ListFooterComponentStyle,
          f = n.ListEmptyComponent,
          p = n.renderScrollComponent,
          c = n.refreshing,
          C = n.progressViewOffset,
          y = n.onRefresh,
          _ = n.data,
          V = n.refreshControl,
          h = (0, t.useMemo)(
            function () {
              return (
                V ||
                (y
                  ? t.default.createElement(r(d[2]).RefreshControl, {
                      refreshing: Boolean(c),
                      progressViewOffset: C,
                      onRefresh: y,
                    })
                  : void 0)
              );
            },
            [y, c, C, V]
          ),
          S = (0, t.useMemo)(
            function () {
              return o
                ? t.default.createElement(
                    r(d[3]).CompatView,
                    { style: l },
                    (0, r(d[4]).getValidComponent)(o)
                  )
                : null;
            },
            [o, l]
          ),
          w = (0, t.useMemo)(
            function () {
              return s
                ? t.default.createElement(
                    r(d[3]).CompatView,
                    { style: u },
                    (0, r(d[4]).getValidComponent)(s)
                  )
                : null;
            },
            [s, u]
          ),
          v = (0, t.useMemo)(
            function () {
              return !f || (_ && _.length > 0) ? null : (0, r(d[4]).getValidComponent)(f);
            },
            [f, _]
          ),
          M = (0, t.useMemo)(
            function () {
              var n = r(d[5]).CompatAnimatedScroller;
              if ('function' == typeof p) {
                var o = t.default.forwardRef(function (t, n) {
                  return p(r(d[0]).__assign(r(d[0]).__assign({}, t), { ref: n }));
                });
                ((o.displayName = 'CustomScrollView'), (n = o));
              } else p && (n = p);
              return r(d[2]).Animated.createAnimatedComponent(n);
            },
            [p]
          );
        return {
          refreshControl: h,
          renderHeader: S,
          renderFooter: w,
          renderEmpty: v,
          CompatScrollView: M,
        };
      }));
    var t = r(d[0]).__importStar(r(d[1]));
  },
  1594,
  [518, 5, 1543, 1595, 1596, 1597]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.CompatAnimatedView = e.CompatView = void 0),
      Object.defineProperty(e, 'CompatView', {
        enumerable: !0,
        get: function () {
          return r(d[0]).View;
        },
      }));
    var t = r(d[0]).Animated.View;
    e.CompatAnimatedView = t;
  },
  1595,
  [1543]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.getValidComponent = void 0));
    var t = r(d[0]).__importDefault(r(d[1]));
    e.getValidComponent = function (n) {
      return t.default.isValidElement(n)
        ? n
        : 'function' == typeof n
          ? t.default.createElement(n)
          : null;
    };
  },
  1596,
  [518, 5]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.CompatAnimatedScroller = e.CompatScroller = void 0),
      Object.defineProperty(e, 'CompatScroller', {
        enumerable: !0,
        get: function () {
          return r(d[0]).ScrollView;
        },
      }));
    var t = r(d[0]).Animated.ScrollView;
    e.CompatAnimatedScroller = t;
  },
  1597,
  [1543]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.StickyHeaders = void 0));
    var t = r(d[0]).__importStar(r(d[1]));
    function n(t, n, u) {
      for (var o = 0, l = t.length - 1, c = -1; o <= l;) {
        var s = Math.floor((o + l) / 2);
        u(t[s]) <= n ? ((c = s), (o = s + 1)) : (l = s - 1);
      }
      return c;
    }
    e.StickyHeaders = function (u) {
      var o = u.stickyHeaderIndices,
        l = u.renderItem,
        c = u.stickyHeaderRef,
        s = u.recyclerViewManager,
        f = u.scrollY,
        v = u.data,
        y = u.extraData,
        h = r(d[0]).__read(
          (0, t.useState)({ currentStickyIndex: -1, pushStartsAt: Number.MAX_SAFE_INTEGER }),
          2
        ),
        p = h[0],
        _ = h[1],
        S = p.currentStickyIndex,
        I = p.pushStartsAt,
        E = (0, t.useMemo)(
          function () {
            return r(d[0])
              .__spreadArray([], r(d[0]).__read(o), !1)
              .sort(function (t, n) {
                return t - n;
              });
          },
          [o]
        ),
        x = 0 === E.length || s.getDataLength() <= E[E.length - 1],
        k = (0, t.useCallback)(
          function () {
            var t, u, o, l, c, f;
            if (!x) {
              var v = s.getLastScrollOffset(),
                y = n(E, v, function (t) {
                  return s.getLayout(t).y;
                }),
                h = null !== (t = E[y]) && void 0 !== t ? t : -1,
                p = null !== (u = E[y + 1]) && void 0 !== u ? u : -1;
              p > s.getEngagedIndices().endIndex && (p = -1);
              var k =
                (-1 === p
                  ? Number.MAX_SAFE_INTEGER
                  : (null !==
                      (l = null === (o = s.tryGetLayout(p)) || void 0 === o ? void 0 : o.y) &&
                    void 0 !== l
                      ? l
                      : 0) + s.firstItemOffset) -
                (null !==
                  (f = null === (c = s.tryGetLayout(h)) || void 0 === c ? void 0 : c.height) &&
                void 0 !== f
                  ? f
                  : 0);
              (h === S && k === I) || _({ currentStickyIndex: h, pushStartsAt: k });
            }
          },
          [x, s, E, S, I]
        );
      ((0, t.useEffect)(
        function () {
          k();
        },
        [k]
      ),
        (0, t.useImperativeHandle)(
          c,
          function () {
            return {
              reportScrollEvent: function () {
                k();
              },
            };
          },
          [k]
        ));
      var A = (0, t.useRef)(new Map()).current,
        M = (0, t.useMemo)(
          function () {
            var t,
              n,
              u =
                null !==
                  (n = null === (t = s.tryGetLayout(S)) || void 0 === t ? void 0 : t.height) &&
                void 0 !== n
                  ? n
                  : 0;
            return f.interpolate({
              inputRange: [I, I + u],
              outputRange: [0, -u],
              extrapolate: 'clamp',
            });
          },
          [s, S, f, I]
        );
      return (0, t.useMemo)(
        function () {
          return t.default.createElement(
            r(d[2]).CompatAnimatedView,
            {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                transform: [{ translateY: M }],
              },
            },
            -1 !== S && S < v.length
              ? t.default.createElement(r(d[3]).ViewHolder, {
                  index: S,
                  item: v[S],
                  renderItem: l,
                  layout: { x: 0, y: 0, width: 0, height: 0 },
                  refHolder: A,
                  extraData: y,
                  trailingItem: null,
                  target: 'StickyHeader',
                })
              : null
          );
        },
        [M, S, v, l, A, y]
      );
    };
  },
  1598,
  [518, 5, 1595, 1599]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.ViewHolder = void 0));
    var t = r(d[0]).__importStar(r(d[1]));
    e.ViewHolder = t.default.memo(
      function (n) {
        var o = (0, t.useRef)(null),
          l = n.index,
          h = n.refHolder,
          u = n.layout,
          f = n.onSizeChanged,
          c = n.renderItem,
          x = n.extraData,
          H = n.item,
          v = n.target,
          p = n.CellRendererComponent,
          C = n.ItemSeparatorComponent,
          s = n.trailingItem,
          y = n.horizontal;
        (0, t.useLayoutEffect)(
          function () {
            return (
              h.set(l, o),
              function () {
                h.get(l) === o && h.delete(l);
              }
            );
          },
          [l, h]
        );
        var I = (0, t.useCallback)(
            function (t) {
              null == f || f(l, t.nativeEvent.layout);
            },
            [l, f]
          ),
          W = (0, t.useMemo)(
            function () {
              return C && void 0 !== s
                ? t.default.createElement(C, { leadingItem: H, trailingItem: s })
                : null;
            },
            [C, H, s]
          ),
          w = (0, t.useMemo)(
            function () {
              var t;
              return null !==
                (t = null == c ? void 0 : c({ item: H, index: l, extraData: x, target: v })) &&
                void 0 !== t
                ? t
                : null;
            },
            [H, x, v, c]
          ),
          S = {
            flexDirection: y ? 'row' : 'column',
            position: 'StickyHeader' === v ? 'relative' : 'absolute',
            width: u.enforcedWidth ? u.width : void 0,
            height: u.enforcedHeight ? u.height : void 0,
            minHeight: u.minHeight,
            minWidth: u.minWidth,
            maxHeight: u.maxHeight,
            maxWidth: u.maxWidth,
            left: u.x,
            top: u.y,
          },
          z = null != p ? p : r(d[2]).CompatView;
        return t.default.createElement(z, { ref: o, onLayout: I, style: S, index: l }, w, W);
      },
      function (t, n) {
        return (
          t.index === n.index &&
          ((o = t.layout),
          (l = n.layout),
          o.x === l.x &&
            o.y === l.y &&
            o.width === l.width &&
            o.height === l.height &&
            o.enforcedWidth === l.enforcedWidth &&
            o.enforcedHeight === l.enforcedHeight &&
            o.minWidth === l.minWidth &&
            o.minHeight === l.minHeight &&
            o.maxWidth === l.maxWidth &&
            o.maxHeight === l.maxHeight) &&
          t.refHolder === n.refHolder &&
          t.onSizeChanged === n.onSizeChanged &&
          t.extraData === n.extraData &&
          t.target === n.target &&
          t.item === n.item &&
          t.renderItem === n.renderItem &&
          t.CellRendererComponent === n.CellRendererComponent &&
          t.ItemSeparatorComponent === n.ItemSeparatorComponent &&
          t.trailingItem === n.trailingItem &&
          t.horizontal === n.horizontal
        );
        var o, l;
      }
    );
  },
  1599,
  [518, 5, 1595]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ScrollAnchor = function (n) {
        var o = n.scrollAnchorRef,
          u = n.horizontal,
          l = r(d[0]).__read((0, t.useState)(1e6), 2),
          c = l[0],
          s = l[1];
        return (
          (0, t.useImperativeHandle)(
            o,
            function () {
              return {
                scrollBy: function (t) {
                  s(function (n) {
                    return n + t;
                  });
                },
              };
            },
            []
          ),
          (0, t.useMemo)(
            function () {
              return t.default.createElement(r(d[2]).CompatView, {
                style: { position: 'absolute', height: 0, top: u ? 0 : c, left: u ? c : 0 },
              });
            },
            [c, u]
          )
        );
      }));
    var t = r(d[0]).__importStar(r(d[1]));
  },
  1600,
  [518, 5, 1595]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.ViewHolderCollection = void 0));
    var t = r(d[0]).__importStar(r(d[1]));
    e.ViewHolderCollection = function (n) {
      var o = n.data,
        l = n.renderStack,
        u = n.getLayout,
        f = n.refHolder,
        c = n.onSizeChanged,
        C = n.renderItem,
        v = n.extraData,
        h = n.viewHolderCollectionRef,
        s = n.getChildContainerLayout,
        y = n.onCommitLayoutEffect,
        p = n.CellRendererComponent,
        _ = n.ItemSeparatorComponent,
        w = n.onCommitEffect,
        E = n.horizontal,
        H = n.getAdjustmentMargin,
        L = r(d[0]).__read(t.default.useState(0), 2),
        S = L[0],
        I = L[1],
        x = s(),
        V = E ? (null == x ? void 0 : x.height) : null == x ? void 0 : x.width,
        z = (0, r(d[2]).useRecyclerViewContext)();
      ((0, t.useLayoutEffect)(
        function () {
          S > 0 && (null == z || z.layout());
        },
        [V]
      ),
        (0, t.useLayoutEffect)(
          function () {
            S > 0 && (null == y || y());
          },
          [S]
        ),
        (0, t.useEffect)(
          function () {
            S > 0 && (null == w || w());
          },
          [S]
        ),
        (0, t.useImperativeHandle)(
          h,
          function () {
            return {
              commitLayout: function () {
                I(function (t) {
                  return t + 1;
                });
              },
            };
          },
          [I]
        ));
      var R = o && o.length > 0,
        j = {
          width: E ? (null == x ? void 0 : x.width) : void 0,
          height: null == x ? void 0 : x.height,
          marginTop: E ? void 0 : H(),
          marginLeft: E ? H() : void 0,
          opacity: S > 0 ? 1 : 0,
        };
      return t.default.createElement(
        r(d[3]).CompatView,
        { style: R && j },
        x &&
          R &&
          Array.from(l.entries(), function (n) {
            var l = r(d[0]).__read(n, 2),
              h = l[0],
              s = l[1].index,
              y = o[s],
              w = _ ? o[s + 1] : void 0;
            return t.default.createElement(r(d[4]).ViewHolder, {
              key: h,
              index: s,
              item: y,
              trailingItem: w,
              layout: r(d[0]).__assign({}, u(s)),
              refHolder: f,
              onSizeChanged: c,
              target: 'Cell',
              renderItem: C,
              extraData: v,
              CellRendererComponent: p,
              ItemSeparatorComponent: _,
              horizontal: E,
            });
          })
      );
    };
  },
  1601,
  [518, 5, 1571, 1595, 1599]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.RenderTargetOptions = void 0),
      (e.RenderTargetOptions = {
        Cell: 'Cell',
        StickyHeader: 'StickyHeader',
        Measurement: 'Measurement',
      }));
  },
  1602,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var t = r(d[0]).Animated.createAnimatedComponent(r(d[1]).FlashList);
    e.default = t;
  },
  1603,
  [1543, 1538]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useBenchmark = function (c, s, l) {
        var h = this;
        void 0 === l && (l = {});
        (0, n.useEffect)(function () {
          var n,
            v = new (r(d[1]).Cancellable)(),
            f = [];
          if (
            c.current &&
            !(Number(null === (n = c.current.props.data) || void 0 === n ? void 0 : n.length) > 0)
          )
            throw new Error(r(d[2]).ErrorMessages.dataEmptyCannotRunBenchmark);
          var p = setTimeout(function () {
            return r(d[3]).__awaiter(h, void 0, void 0, function () {
              var n, h, p, S;
              return r(d[3]).__generator(this, function (w) {
                switch (w.label) {
                  case 0:
                    ((n = new (r(d[4]).JSFPSMonitor)()).startTracking(), (h = 0), (w.label = 1));
                  case 1:
                    return h < (l.repeatCount || 1) ? [4, i(c, v, l.speedMultiplier || 1)] : [3, 4];
                  case 2:
                    (w.sent(), (w.label = 3));
                  case 3:
                    return (h++, [3, 1]);
                  case 4:
                    return (
                      (p = n.stopAndGetData()).averageFPS < 35 &&
                        f.push(
                          'Your average JS FPS is low. This can indicate that your components are doing too much work. Try to optimize your components and reduce re-renders if any'
                        ),
                      u(c, f),
                      (S = o(p, f, v)),
                      v.isCancelled() || (S.formattedString = t(S)),
                      s(S),
                      [2]
                    );
                }
              });
            });
          }, l.startDelayInMs || 3e3);
          return function () {
            (clearTimeout(p), v.cancel());
          };
        }, []);
      }),
      (e.getFormattedString = t));
    var n = r(d[0]);
    function t(n) {
      var t, o, i;
      return (
        'Results:\n\n' +
        'JS FPS: Avg: '
          .concat(null === (t = n.js) || void 0 === t ? void 0 : t.averageFPS, ' | Min: ')
          .concat(null === (o = n.js) || void 0 === o ? void 0 : o.minFPS, ' | Max: ')
          .concat(null === (i = n.js) || void 0 === i ? void 0 : i.maxFPS, '\n\n') +
        ''.concat(
          n.suggestions.length > 0
            ? 'Suggestions:\n\n'.concat(
                n.suggestions
                  .map(function (n, t) {
                    return ''.concat(t + 1, '. ').concat(n);
                  })
                  .join('\n')
              )
            : ''
        )
      );
    }
    function o(n, t, o) {
      return { js: n, suggestions: t, interrupted: o.isCancelled() };
    }
    function i(n, t, o) {
      return r(d[3]).__awaiter(this, void 0, void 0, function () {
        var i, u, c, s, l, h, v, f, p;
        return r(d[3]).__generator(this, function (S) {
          switch (S.label) {
            case 0:
              return n.current
                ? ((i = n.current.props.horizontal),
                  (u = n.current)
                    ? ((c = u.getWindowSize()),
                      (s = u.getChildContainerDimensions()),
                      (l = 0),
                      (h = 0),
                      (v = s.width - c.width),
                      (f = s.height - c.height),
                      (p = function (t, o) {
                        var u;
                        null === (u = n.current) ||
                          void 0 === u ||
                          u.scrollToOffset({ offset: i ? t : o, animated: !1 });
                      }),
                      [4, (0, r(d[1]).autoScroll)(p, l, h, v, f, o, t)])
                    : [3, 3])
                : [3, 3];
            case 1:
              return (S.sent(), [4, (0, r(d[1]).autoScroll)(p, v, f, l, h, o, t)]);
            case 2:
              (S.sent(), (S.label = 3));
            case 3:
              return [2];
          }
        });
      });
    }
    function u(n, t) {
      n.current &&
        n.current.props.data.length < 200 &&
        t.push(
          "Data count is low. Try to increase it to a large number (e.g 200) using the 'useDataMultiplier' hook."
        );
    }
  },
  1604,
  [5, 1605, 1576, 518, 1606]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.Cancellable = void 0),
      (e.autoScroll = function (t, o, l, c, u, s, f) {
        void 0 === s && (s = 1);
        void 0 === f && (f = new n());
        return new Promise(function (n) {
          t(o, l, !1);
          var h = 7 * s,
            v = c > o ? 1 : -1,
            C = u > l ? 1 : -1,
            _ = c > o ? Math.min : Math.max,
            p = u > l ? Math.min : Math.max,
            M = Date.now(),
            w = o,
            b = l,
            y = function () {
              requestAnimationFrame(function () {
                if (f.isCancelled()) n(!1);
                else {
                  var o = Date.now(),
                    l = h * (o - M);
                  if (
                    ((b += l * C),
                    t(_(c, (w += l * v)), p(u, b), !1),
                    (M = o),
                    _(c, w) !== c || p(u, b) !== u)
                  )
                    return y();
                  n(!0);
                }
              });
            };
          y();
        });
      }));
    var n = (function () {
      function n() {
        this._isCancelled = !1;
      }
      return (
        (n.prototype.cancel = function () {
          this._isCancelled = !0;
        }),
        (n.prototype.isCancelled = function () {
          return this._isCancelled;
        }),
        n
      );
    })();
    e.Cancellable = n;
  },
  1605,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.JSFPSMonitor = void 0));
    var t = (function () {
      function t() {
        var t = this;
        ((this.startTime = 0),
          (this.frameCount = 0),
          (this.timeWindow = { frameCount: 0, startTime: 0 }),
          (this.minFPS = Number.MAX_SAFE_INTEGER),
          (this.maxFPS = 0),
          (this.averageFPS = 0),
          (this.clearAnimationNumber = 0),
          (this.updateLoopCompute = function () {
            t.frameCount++;
            var o = (Date.now() - t.startTime) / 1e3;
            ((t.averageFPS = o > 0 ? t.frameCount / o : 0), t.timeWindow.frameCount++);
            var n = (Date.now() - t.timeWindow.startTime) / 1e3;
            if (n >= 1) {
              var s = t.timeWindow.frameCount / n;
              ((t.minFPS = Math.min(t.minFPS, s)),
                (t.maxFPS = Math.max(t.maxFPS, s)),
                (t.timeWindow.frameCount = 0),
                (t.timeWindow.startTime = Date.now()));
            }
            t.measureLoop();
          }));
      }
      return (
        (t.prototype.measureLoop = function () {
          this.clearAnimationNumber = requestAnimationFrame(this.updateLoopCompute);
        }),
        (t.prototype.startTracking = function () {
          if (0 !== this.startTime) throw new Error(r(d[0]).ErrorMessages.fpsMonitorAlreadyRunning);
          ((this.startTime = Date.now()),
            (this.timeWindow.startTime = Date.now()),
            this.measureLoop());
        }),
        (t.prototype.stopAndGetData = function () {
          return (
            cancelAnimationFrame(this.clearAnimationNumber),
            this.minFPS === Number.MAX_SAFE_INTEGER &&
              ((this.minFPS = this.averageFPS), (this.maxFPS = this.averageFPS)),
            {
              minFPS: (0, r(d[1]).roundToDecimalPlaces)(this.minFPS, 1),
              maxFPS: (0, r(d[1]).roundToDecimalPlaces)(this.maxFPS, 1),
              averageFPS: (0, r(d[1]).roundToDecimalPlaces)(this.averageFPS, 1),
            }
          );
        }),
        t
      );
    })();
    e.JSFPSMonitor = t;
  },
  1606,
  [1576, 1607]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.roundToDecimalPlaces = function (t, n) {
        var o = Math.pow(10, n);
        return Math.round(t * o) / o;
      }));
  },
  1607,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useDataMultiplier = function (t, n) {
        var u = t.length,
          i = new Array(n),
          o = !1;
        'object' == typeof t[0] && (o = !0);
        for (var s = 0; s < n; s++) i[s] = o ? r(d[0]).__assign({}, t[s % u]) : t[s % u];
        return [i];
      }));
  },
  1608,
  [518]
);
__d(
  function (g, r, _i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useFlatListBenchmark = function (o, u, i) {
        var s = this;
        return (
          (0, t.useEffect)(function () {
            var t,
              c = new (r(d[1]).Cancellable)();
            if (
              o.current &&
              o.current.props &&
              !(Number(null === (t = o.current.props.data) || void 0 === t ? void 0 : t.length) > 0)
            )
              throw new Error(r(d[2]).ErrorMessages.dataEmptyCannotRunBenchmark);
            var l = setTimeout(function () {
              return r(d[3]).__awaiter(s, void 0, void 0, function () {
                var t, s, l, f;
                return r(d[3]).__generator(this, function (v) {
                  switch (v.label) {
                    case 0:
                      ((t = new (r(d[4]).JSFPSMonitor)()).startTracking(), (s = 0), (v.label = 1));
                    case 1:
                      return s < (i.repeatCount || 1)
                        ? [4, n(o, i.targetOffset, c, i.speedMultiplier || 1)]
                        : [3, 4];
                    case 2:
                      (v.sent(), (v.label = 3));
                    case 3:
                      return (s++, [3, 1]);
                    case 4:
                      return (
                        (l = t.stopAndGetData()),
                        (f = { js: l, suggestions: [], interrupted: c.isCancelled() }),
                        c.isCancelled() || (f.formattedString = (0, r(d[5]).getFormattedString)(f)),
                        u(f),
                        [2]
                      );
                  }
                });
              });
            }, i.startDelayInMs || 3e3);
            return function () {
              (clearTimeout(l), c.cancel());
            };
          }, []),
          []
        );
      }));
    var t = r(d[0]);
    function n(t, n, o, u) {
      return r(d[3]).__awaiter(this, void 0, void 0, function () {
        var i, s, c, l, f, v, p;
        return r(d[3]).__generator(this, function (_) {
          switch (_.label) {
            case 0:
              return t.current
                ? ((i = Boolean(
                    null === (p = t.current.props) || void 0 === p ? void 0 : p.horizontal
                  )),
                  (s = 0),
                  (c = 0),
                  (l = i ? n : 0),
                  (f = i ? 0 : n),
                  (v = function (n, o) {
                    var u;
                    null === (u = t.current) ||
                      void 0 === u ||
                      u.scrollToOffset({ offset: i ? n : o, animated: !1 });
                  }),
                  [4, (0, r(d[1]).autoScroll)(v, s, c, l, f, u, o)])
                : [3, 3];
            case 1:
              return (_.sent(), [4, (0, r(d[1]).autoScroll)(v, l, f, s, c, u, o)]);
            case 2:
              (_.sent(), (_.label = 3));
            case 3:
              return [2];
          }
        });
      });
    }
  },
  1609,
  [5, 1605, 1576, 518, 1606, 1604]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useRecyclingState = function (n, u, c) {
        var o = (0, t.useRef)(),
          f = r(d[1]).__read((0, r(d[2]).useLayoutState)(0), 2),
          s = (f[0], f[1]);
        (0, t.useMemo)(function () {
          var t = 'function' == typeof n ? n() : n;
          ((o.current = t), null == c || c());
        }, u);
        var l = (0, t.useCallback)(
          function (t, n) {
            var u = 'function' == typeof t ? t(o.current) : t;
            u !== o.current &&
              ((o.current = u),
              s(function (t) {
                return t + 1;
              }, n));
          },
          [s]
        );
        return [o.current, l];
      }));
    var t = r(d[0]);
  },
  1610,
  [5, 518, 1570]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.useMappingHelper = void 0));
    var n = r(d[0]);
    e.useMappingHelper = function () {
      var t = (0, r(d[1]).useRecyclerViewContext)();
      return {
        getMappingKey: (0, n.useCallback)(
          function (n, u) {
            return t ? u : n;
          },
          [t]
        ),
      };
    };
  },
  1611,
  [5, 1571]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.LayoutCommitObserver = void 0));
    var t = r(d[0]).__importStar(r(d[1]));
    ((e.LayoutCommitObserver = t.default.memo(function (n) {
      var u = n.children,
        l = n.onCommitLayoutEffect,
        o = (0, r(d[2]).useRecyclerViewContext)(),
        f = r(d[0]).__read((0, r(d[3]).useLayoutState)(0), 2),
        c = (f[0], f[1]),
        v = (0, t.useRef)(new Set()).current;
      (0, t.useLayoutEffect)(function () {
        v.size > 0 || null == l || l();
      });
      var s = (0, t.useMemo)(
        function () {
          return {
            layout: function () {
              c(function (t) {
                return t + 1;
              });
            },
            getRef: function () {
              var t;
              return null !== (t = null == o ? void 0 : o.getRef()) && void 0 !== t ? t : null;
            },
            getParentRef: function () {
              var t;
              return null !== (t = null == o ? void 0 : o.getParentRef()) && void 0 !== t
                ? t
                : null;
            },
            getParentScrollViewRef: function () {
              var t;
              return null !== (t = null == o ? void 0 : o.getParentScrollViewRef()) && void 0 !== t
                ? t
                : null;
            },
            getScrollViewRef: function () {
              var t;
              return null !== (t = null == o ? void 0 : o.getScrollViewRef()) && void 0 !== t
                ? t
                : null;
            },
            markChildLayoutAsPending: function (t) {
              (null == o || o.markChildLayoutAsPending(t), v.add(t));
            },
            unmarkChildLayoutAsPending: function (t) {
              (null == o || o.unmarkChildLayoutAsPending(t), v.has(t) && (v.delete(t), s.layout()));
            },
          };
        },
        [o, v, c]
      );
      return t.default.createElement(r(d[2]).RecyclerViewContextProvider, { value: s }, u);
    })),
      (e.LayoutCommitObserver.displayName = 'LayoutCommitObserver'));
  },
  1612,
  [518, 5, 1571, 1570]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var t;
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isNewArch = function () {
        if (void 0 !== t) return t;
        try {
          var n = Boolean(null == g ? void 0 : g.nativeFabricUIManager),
            o = Boolean(null == g ? void 0 : g.__turboModuleProxy);
          t = n || o || 'web' === r(d[0], 'react-native-web/dist/index').Platform.OS;
        } catch (n) {
          t = !0;
        }
        return t;
      }));
  },
  1613,
  [1543]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useUserPreferences = function (s) {
        const [n, c] = (0, t.useState)(r(d[1]).DEFAULT_PREFERENCES),
          [o, p] = (0, t.useState)(!0),
          [u, l] = (0, t.useState)(!1),
          f = (0, t.useCallback)(
            async ({ backgroundSync: t = !0 } = {}) => {
              if (!s) return (c(r(d[1]).DEFAULT_PREFERENCES), void p(!1));
              const n = await (0, r(d[1]).loadUserPreferences)(s);
              if ((c(n), p(!1), !t)) return;
              l(!0);
              const o = await (0, r(d[2]).syncScheduledRidesWithCloud)(s, n);
              l(!1);
              const u = Object.assign({}, n, {
                scheduledRides: o.scheduledRides,
                scheduledRidesUpdatedAt:
                  o.scheduledRidesUpdatedAt ?? n.scheduledRidesUpdatedAt ?? null,
                notifications: o.notifications
                  ? Object.assign({}, n.notifications, o.notifications)
                  : n.notifications,
                notificationsUpdatedAt:
                  o.notificationsUpdatedAt ?? n.notificationsUpdatedAt ?? null,
                appSettings: o.appSettings
                  ? Object.assign({}, n.appSettings, o.appSettings)
                  : n.appSettings,
                appSettingsUpdatedAt: o.appSettingsUpdatedAt ?? n.appSettingsUpdatedAt ?? null,
                language: o.language ?? n.language,
                languageUpdatedAt: o.languageUpdatedAt ?? n.languageUpdatedAt ?? null,
                safetyPreferences: o.safetyPreferences
                  ? Object.assign({}, n.safetyPreferences, o.safetyPreferences)
                  : n.safetyPreferences,
                safetyPreferencesUpdatedAt:
                  o.safetyPreferencesUpdatedAt ?? n.safetyPreferencesUpdatedAt ?? null,
                privacy: o.privacy ? Object.assign({}, n.privacy, o.privacy) : n.privacy,
                privacyUpdatedAt: o.privacyUpdatedAt ?? n.privacyUpdatedAt ?? null,
                emergencyContact: o.emergencyContact ?? n.emergencyContact,
                emergencyContactUpdatedAt:
                  o.emergencyContactUpdatedAt ?? n.emergencyContactUpdatedAt ?? null,
              });
              (o.synced && (await (0, r(d[1]).saveUserPreferences)(s, u)), c(u));
            },
            [s]
          );
        (0, t.useEffect)(() => {
          f();
        }, [f]);
        const y = (0, t.useCallback)(
            async t => {
              if (!s) return { error: new Error('Not signed in') };
              const n = t.scheduledRides
                ? Object.assign({}, t, { scheduledRidesUpdatedAt: new Date().toISOString() })
                : t;
              c(n);
              const o = await (0, r(d[1]).saveUserPreferences)(s, n);
              return (
                n.scheduledRides &&
                  (0, r(d[2]).pushScheduledRidesToCloud)(
                    s,
                    n.scheduledRides,
                    n.scheduledRidesUpdatedAt
                  ).catch(() => {}),
                o
              );
            },
            [s]
          ),
          U = (0, t.useCallback)(
            async t => {
              if (!s) return { error: new Error('Not signed in') };
              const o = Object.assign({}, n, t),
                p = new Date().toISOString();
              (t.scheduledRides && (o.scheduledRidesUpdatedAt = p),
                t.notifications && (o.notificationsUpdatedAt = p),
                t.appSettings && (o.appSettingsUpdatedAt = p),
                void 0 !== t.language && (o.languageUpdatedAt = p),
                t.safetyPreferences && (o.safetyPreferencesUpdatedAt = p),
                t.privacy && (o.privacyUpdatedAt = p),
                t.emergencyContact && (o.emergencyContactUpdatedAt = p),
                c(o));
              const u = await (0, r(d[1]).saveUserPreferences)(s, o);
              return (
                t.scheduledRides &&
                  (0, r(d[2]).pushScheduledRidesToCloud)(
                    s,
                    o.scheduledRides,
                    o.scheduledRidesUpdatedAt
                  ).catch(() => {}),
                t.notifications &&
                  (0, r(d[2]).pushNotificationPrefsToCloud)(s, o.notifications).catch(() => {}),
                t.appSettings &&
                  (0, r(d[2]).pushAppSettingsToCloud)(s, o.appSettings).catch(() => {}),
                void 0 !== t.language &&
                  (0, r(d[2]).pushLanguageToCloud)(s, o.language).catch(() => {}),
                t.safetyPreferences &&
                  (0, r(d[2]).pushSafetyPrefsToCloud)(s, o.safetyPreferences).catch(() => {}),
                t.privacy && (0, r(d[2]).pushPrivacyPrefsToCloud)(s, o.privacy).catch(() => {}),
                t.emergencyContact &&
                  (0, r(d[2]).pushEmergencyContactToCloud)(s, o.emergencyContact).catch(() => {}),
                u
              );
            },
            [s, n]
          ),
          h = (0, t.useCallback)(
            async (t, s) => {
              const c = Object.assign({}, n[t], s);
              return U({ [t]: c });
            },
            [U, n]
          );
        return {
          prefs: n,
          loading: o,
          syncing: u,
          refresh: f,
          save: y,
          patch: U,
          updateSection: h,
        };
      }));
    var t = r(d[0]);
  },
  1614,
  [5, 560, 561]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useDriverLocations = n),
      (e.useTripDriverLocation = u),
      (e.useTripGuardianTracking = function (n) {
        const o = n?.tripId ?? n?.rideId,
          l = n?.driverId,
          { location: s, loading: c, refresh: f } = u(o, l),
          p = s?.latitude ?? n?.latitude ?? null,
          v = s?.longitude ?? n?.longitude ?? null,
          h = (0, t.useMemo)(() => {
            const t = n?.pickupLat ?? n?.destinationLat ?? n?.latitude,
              u = n?.pickupLng ?? n?.destinationLng ?? n?.longitude;
            if (null != s?.latitude && null != t && null != u) {
              const n = (0, r(d[3]).haversineKm)(s.latitude, s.longitude, t, u),
                o = (0, r(d[3]).estimateEtaMinutes)(n, s.speedKmh > 5 ? s.speedKmh : 22);
              if (null != o) return o;
            }
            return n?.etaMin ?? 15;
          }, [s, n]);
        return {
          latitude: p,
          longitude: v,
          etaMin: h,
          driverName: s?.mateName ?? n?.driverName ?? n?.operatorName,
          plateNumber: s?.plateNumber ?? n?.plateNumber,
          isLive: Boolean(s),
          loading: c,
          refresh: f,
        };
      }));
    var t = r(d[0]);
    function n(n = '', u = '', { enabled: o = !0 } = {}) {
      const [l, s] = (0, t.useState)([]),
        [c, f] = (0, t.useState)(o),
        [p, v] = (0, t.useState)(null),
        h = (0, t.useCallback)(async () => {
          if (!o) return;
          f(!0);
          const { data: t, error: n } = await (0, r(d[1]).fetchActiveDriverLocations)();
          (s(t ?? []), v(n?.message ?? null), f(!1));
        }, [o]);
      (0, t.useEffect)(() => {
        if (!o) return void f(!1);
        h();
        let t = () => {};
        try {
          t = (0, r(d[1]).subscribeDriverLocations)(t => {
            (s(t), f(!1));
          });
        } catch (t) {}
        return () => {
          'function' == typeof t && t();
        };
      }, [h, o]);
      return {
        locations:
          n?.trim() && u?.trim()
            ? l.filter(t => (0, r(d[2]).matchesTripRoute)({ route: t.route }, n, u))
            : l,
        allLocations: l,
        loading: c,
        error: p,
        refresh: h,
      };
    }
    function u(u, o) {
      const { locations: l, loading: s, refresh: c } = n();
      return {
        location: (0, t.useMemo)(
          () =>
            u || o ? (l.find(t => (u && t.tripId === u) || (o && t.mateId === o)) ?? null) : null,
          [l, u, o]
        ),
        loading: s,
        refresh: c,
      };
    }
  },
  1615,
  [5, 753, 1616, 1513]
);
__d(
  function (g, r, i, _a, m, e, _d) {
    function t(t) {
      return (t ?? '').trim().toLowerCase();
    }
    function n(n, u) {
      const s = t(n),
        o = t(u);
      return !(!s || !o) && (o.includes(s) || s.includes(o));
    }
    function u(u, s, o) {
      if (!s?.trim() || !o?.trim()) return !1;
      const c = t(s),
        d = t(o);
      if (c === d) return !1;
      const f = u.origin ?? '',
        l = u.destination ?? '',
        a = t(u.route ?? ''),
        h = t(u.corridor ?? ''),
        W = n(s, f) || a.startsWith(c) || h.startsWith(c) || (a.includes(c) && a.includes(d)),
        _ = n(o, l) || a.endsWith(d) || h.endsWith(d) || (a.includes(c) && a.includes(d));
      return f && l ? n(s, f) && n(o, l) : W && _;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.filterTripsByRoute = function (t, n, s) {
        return n?.trim() && s?.trim() ? (t ?? []).filter(t => u(t, n, s)) : [];
      }),
      (e.matchesTripRoute = u));
  },
  1616,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.SkeletonList = function ({ count: t = 3 }) {
        return (0, u.jsx)(l.default, {
          style: h.list,
          children: Array.from({ length: t }).map((t, i) => (0, u.jsx)(f, {}, `sk-${i}`)),
        });
      }),
      (e.TripCardSkeleton = f));
    var i = r(d[1]),
      n = t(r(d[2])),
      o = t(r(d[3])),
      l = t(r(d[4])),
      s = t(r(d[5])),
      u = r(d[6]);
    function c({ style: t }) {
      const o = (0, i.useRef)(new n.default.Value(0.35)).current;
      return (
        (0, i.useEffect)(() => {
          const t = n.default.loop(
            n.default.sequence([
              n.default.timing(o, { toValue: 0.75, duration: 700, useNativeDriver: !0 }),
              n.default.timing(o, { toValue: 0.35, duration: 700, useNativeDriver: !0 }),
            ])
          );
          return (t.start(), () => t.stop());
        }, [o]),
        (0, u.jsx)(n.default.View, { style: [h.bone, t, { opacity: o }] })
      );
    }
    function f() {
      return (0, u.jsxs)(l.default, {
        style: h.card,
        children: [
          (0, u.jsx)(c, { style: h.title }),
          (0, u.jsx)(c, { style: h.line }),
          (0, u.jsx)(c, { style: h.lineShort }),
          (0, u.jsxs)(l.default, {
            style: h.footer,
            children: [(0, u.jsx)(c, { style: h.badge }), (0, u.jsx)(c, { style: h.price })],
          }),
        ],
      });
    }
    const h = o.default.create({
      list: { paddingHorizontal: r(d[7]).spacing.lg, paddingTop: r(d[7]).spacing.md },
      card: {
        backgroundColor: s.default.surfaceElevated,
        borderRadius: r(d[7]).radius.lg,
        borderWidth: 1,
        borderColor: s.default.border,
        padding: r(d[7]).spacing.lg,
        marginBottom: r(d[7]).spacing.md,
      },
      bone: { backgroundColor: s.default.borderStrong, borderRadius: r(d[7]).radius.sm },
      title: { height: 18, width: '70%', marginBottom: r(d[7]).spacing.md },
      line: { height: 12, width: '90%', marginBottom: r(d[7]).spacing.sm },
      lineShort: { height: 12, width: '55%', marginBottom: r(d[7]).spacing.lg },
      footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      badge: { height: 28, width: 80, borderRadius: r(d[7]).radius.pill },
      price: { height: 20, width: 64 },
    });
  },
  1617,
  [1, 5, 7, 26, 19, 379, 183, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var l = r(d[1]),
      o = t(r(d[2])),
      s = t(r(d[3])),
      n = (t(r(d[4])), t(r(d[5]))),
      c = t(r(d[6])),
      u = t(r(d[7])),
      f = t(r(d[8])),
      p = t(r(d[9])),
      y = r(d[10]);
    function x(t, l) {
      return t >= 5
        ? l.seatsPlenty
        : t >= 2
          ? l.seatsFilling
          : 1 === t
            ? l.seatsAlmostFull
            : l.seatsFull;
    }
    e.default = (0, l.memo)(function ({
      trip: t,
      onReserve: n,
      reserveLabel: F = 'Reserve Seat',
      pickupCoords: h,
      driverLocations: j = [],
      myLocation: S,
      originLabel: v,
    }) {
      const { colors: B } = (0, r(d[11]).useTheme)(),
        w = (0, l.useMemo)(() => b(B), [B]),
        z = 0 === (t.availableSeats ?? 0),
        C = (0, l.useMemo)(
          () =>
            (0, r(d[12]).resolvePickupEta)({
              trip: t,
              pickupCoords: h,
              driverLocations: j,
              myLocation: S,
              originLabel: v,
            }),
          [t, h, j, S, v]
        );
      return (0, y.jsxs)(c.default, {
        elevated: !0,
        children: [
          (0, y.jsx)(s.default, { style: w.destination, children: t.destination }),
          (0, y.jsx)(s.default, { style: w.route, children: t.route }),
          (0, y.jsxs)(o.default, {
            style: w.row,
            children: [
              (0, y.jsx)(s.default, { style: w.meta, children: t.mateName }),
              (0, y.jsx)(f.default, { score: t.trustScore, compact: !0 }),
            ],
          }),
          (0, y.jsxs)(o.default, {
            style: w.pillRow,
            children: [
              (0, y.jsx)(o.default, {
                style: w.pill,
                children: (0, y.jsx)(s.default, { style: w.pillText, children: t.plateNumber }),
              }),
              (0, y.jsx)(o.default, {
                style: w.typeBadge,
                children: (0, y.jsx)(s.default, { style: w.typeText, children: t.vehicleType }),
              }),
              (0, y.jsx)(o.default, {
                style: [w.seatBadge, x(t.availableSeats ?? 0, w)],
                children: (0, y.jsx)(s.default, {
                  style: w.seatText,
                  children:
                    ((R = t.availableSeats ?? 0),
                    0 === R ? 'Full' : 1 === R ? '1 seat left' : `${R} seats left`),
                }),
              }),
            ],
          }),
          z
            ? null
            : (0, y.jsx)(p.default, { label: C.label, isLive: C.isLive, precise: C.precise }),
          (0, y.jsxs)(o.default, {
            style: w.footerRow,
            children: [
              (0, y.jsxs)(s.default, {
                style: w.fare,
                children: ['GHS ', Number(t.fare ?? t.farePerSeat ?? 0).toFixed(2)],
              }),
              (0, y.jsx)(s.default, {
                style: w.eta,
                children: z ? 'No departure' : `Departed ${t.departureTime ?? 'soon'}`,
              }),
            ],
          }),
          (0, y.jsx)(u.default, {
            title: z ? 'Full' : F,
            onPress: () => n?.(t),
            disabled: z || !n,
            compact: !0,
          }),
        ],
      });
      var R;
    });
    const b = t =>
      n.default.create({
        destination: {
          fontFamily: r(d[13]).fontFamily.bold,
          fontSize: 20,
          color: t.textPrimary,
          marginBottom: 4,
          letterSpacing: -0.3,
        },
        route: {
          fontFamily: r(d[13]).fontFamily.medium,
          fontSize: 13,
          lineHeight: 18,
          color: t.textSecondary,
          marginBottom: r(d[13]).spacing.md,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[13]).spacing.md,
        },
        meta: { fontFamily: r(d[13]).fontFamily.medium, fontSize: 15, color: t.textPrimary },
        pillRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: r(d[13]).spacing.md },
        pill: {
          backgroundColor: t.surfaceSoft,
          borderRadius: r(d[13]).radius.pill,
          borderWidth: 1,
          borderColor: t.border,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginRight: r(d[13]).spacing.sm,
          marginBottom: r(d[13]).spacing.sm,
        },
        pillText: { fontFamily: r(d[13]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        typeBadge: {
          backgroundColor: t.surface,
          borderRadius: r(d[13]).radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginRight: r(d[13]).spacing.sm,
          marginBottom: r(d[13]).spacing.sm,
        },
        typeText: { fontFamily: r(d[13]).fontFamily.regular, fontSize: 12, color: t.textSecondary },
        seatBadge: {
          borderRadius: r(d[13]).radius.pill,
          paddingHorizontal: 10,
          paddingVertical: 6,
          marginBottom: r(d[13]).spacing.sm,
        },
        seatText: { fontFamily: r(d[13]).fontFamily.semiBold, fontSize: 12, color: t.onPrimary },
        seatsPlenty: { backgroundColor: t.seatsAvailable },
        seatsFilling: { backgroundColor: t.seatsFilling },
        seatsAlmostFull: { backgroundColor: t.seatsAlmostFull },
        seatsFull: { backgroundColor: t.seatsFull },
        footerRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: r(d[13]).spacing.md,
        },
        fare: { fontFamily: r(d[13]).fontFamily.bold, fontSize: 20, color: t.textPrimary },
        eta: {
          fontFamily: r(d[13]).fontFamily.medium,
          fontSize: 13,
          lineHeight: 18,
          color: t.textSecondary,
        },
      });
  },
  1618,
  [1, 5, 19, 161, 326, 26, 684, 672, 1486, 1511, 183, 381, 1512, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      if (!t) return 0;
      if ('number' == typeof t.availableSeats) return t.availableSeats;
      if ('number' == typeof t.seats_available) return t.seats_available;
      const n = t.maxPassengers ?? t.totalSeats,
        u = t.currentPassengers ?? 0;
      return 'number' == typeof n ? Math.max(0, n - u) : 0;
    }
    function n(n) {
      return !!n && (('online_driver' === n.listingType && !n.rideId) || t(n) > 0);
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.LIVE_MATE_GRACE_MS = void 0),
      (e.filterBookableTrips = function (t) {
        return (t ?? []).filter(n);
      }),
      (e.filterLiveMateTrips = function (t, n = []) {
        return (t ?? []).filter(t => l(t, n));
      }),
      (e.getAvailableSeats = t),
      (e.isMateActivelyLive = l),
      (e.isTripBookable = n));
    const u = (e.LIVE_MATE_GRACE_MS = 12e5);
    function s(t) {
      if (!t) return null;
      if ('number' == typeof t.startedAt) return t.startedAt;
      const n = t.createdAt ?? t.created_at ?? t.started_at;
      if (!n) return null;
      const u = new Date(n).getTime();
      return Number.isFinite(u) ? u : null;
    }
    function l(t, n = []) {
      if (!t) return !1;
      const l = t.dbId ?? t.id,
        o = t.mateId ?? t.driverId;
      if ((n ?? []).some(t => (l && t.tripId === l) || (o && (t.mateId === o || t.driverId === o))))
        return !0;
      const f = s(t);
      return null != f && Date.now() - f < u;
    }
  },
  1619,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ fromFallback: t, error: n, onRetry: f, retrying: b = !1 }) {
        const { colors: x } = (0, r(d[7]).useTheme)();
        return t || n
          ? (0, u.jsxs)(l.default, {
              style: [
                y.banner,
                { backgroundColor: x.bannerInfo ?? x.surfaceElevated, borderColor: x.borderStrong },
              ],
              children: [
                (0, u.jsx)(r(d[8]).Ionicons, {
                  name: 'cloud-offline-outline',
                  size: 16,
                  color: x.textSecondary,
                }),
                (0, u.jsx)(o.default, {
                  style: [y.text, { color: x.textSecondary }],
                  children: n
                    ? 'Could not load trips. Check your connection and try again.'
                    : 'No active trips on this route yet.',
                }),
                f
                  ? (0, u.jsx)(s.default, {
                      style: [y.retryBtn, { backgroundColor: x.surfaceSoft }],
                      onPress: f,
                      disabled: b,
                      accessibilityRole: 'button',
                      accessibilityLabel: 'Retry loading trips',
                      children: b
                        ? (0, u.jsx)(c.default, { size: 'small', color: x.textPrimary })
                        : (0, u.jsx)(o.default, {
                            style: [y.retryText, { color: x.textPrimary }],
                            children: 'Retry',
                          }),
                    })
                  : null,
              ],
            })
          : null;
      }));
    var o = t(r(d[1])),
      n = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = r(d[6]);
    const y = n.default.create({
      banner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[9]).spacing.sm,
        marginHorizontal: r(d[9]).layout.screenPadding,
        marginBottom: r(d[9]).spacing.md,
        padding: r(d[9]).spacing.md,
        borderRadius: r(d[9]).radius.md,
        borderWidth: n.default.hairlineWidth,
      },
      text: { flex: 1, fontFamily: r(d[9]).fontFamily.regular, fontSize: 13, lineHeight: 18 },
      retryBtn: {
        paddingHorizontal: r(d[9]).spacing.sm,
        paddingVertical: 6,
        borderRadius: r(d[9]).radius.sm,
      },
      retryText: { fontFamily: r(d[9]).fontFamily.medium, fontSize: 13 },
    });
  },
  1620,
  [1, 161, 26, 19, 326, 373, 183, 381, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'mateTripRowToCard', {
        enumerable: !0,
        get: function () {
          return r(d[0]).mateTripRowToCard;
        },
      }),
      Object.defineProperty(e, 'tripRowToCard', {
        enumerable: !0,
        get: function () {
          return r(d[0]).tripRowToCard;
        },
      }),
      (e.useFilteredLiveTrips = function (t, o) {
        return u();
      }),
      (e.useLiveTrips = u));
    var t = r(d[1]);
    const o = 2500,
      s = 8e3,
      n = { trotroTrips: [], trotroRideTrips: [] };
    function c(t = [], o = []) {
      return {
        trotroTrips: (0, r(d[2]).filterBookableTrips)(t).filter(r(d[3]).isBookableLiveTrip),
        trotroRideTrips: (0, r(d[2]).filterBookableTrips)(o).filter(r(d[3]).isBookableLiveTrip),
      };
    }
    function l(t = !1) {
      return Promise.race([
        (0, r(d[4]).fetchAllLiveTrips)({ force: t }),
        new Promise(t => {
          setTimeout(
            () =>
              t(Object.assign({}, n, { fromFallback: !0, error: new Error('Request timed out') })),
            s
          );
        }),
      ]);
    }
    function u({ enabled: s = !0 } = {}) {
      const [n, u] = (0, t.useState)([]),
        [f, T] = (0, t.useState)([]),
        [p, b] = (0, t.useState)(s),
        [v, R] = (0, t.useState)(!1),
        [k, L] = (0, t.useState)(null),
        w = (0, t.useRef)(!0);
      (0, t.useEffect)(
        () => (
          (w.current = !0),
          () => {
            w.current = !1;
          }
        ),
        []
      );
      const y = (0, t.useCallback)(
        async ({ silent: t = !1, force: o = !1 } = {}) => {
          if (!s) return;
          t || b(!0);
          const n = await l(o);
          w.current &&
            (u(c(n.trotroTrips).trotroTrips),
            T(c([], n.trotroRideTrips).trotroRideTrips),
            R(n.fromFallback ?? !1),
            L(n.error?.message ?? null),
            b(!1));
        },
        [s]
      );
      return (
        (0, t.useEffect)(() => {
          if (!s) return void b(!1);
          const t = (0, r(d[4]).peekLiveTripsCache)();
          if (t) {
            const o = c(t.trotroTrips, t.trotroRideTrips);
            return (
              u(o.trotroTrips),
              T(o.trotroRideTrips),
              R(t.fromFallback ?? !1),
              L(t.error?.message ?? ('string' == typeof t.error ? t.error : null)),
              b(!1),
              void y({ silent: !0, force: !0 })
            );
          }
          y();
        }, [s, y]),
        (0, t.useEffect)(() => {
          if (!s) return;
          let t = () => {},
            n = () => {},
            c = !1;
          const l = (0, r(d[5]).debounce)(() => y({ silent: !0, force: !0 }), 800),
            f = setTimeout(() => {
              c ||
                ((t = (0, r(d[6]).subscribeToActiveTrips)(async t => {
                  const { data: o } = await (0, r(d[7]).fetchActiveDriverLocations)(),
                    s = (0, r(d[2]).filterLiveMateTrips)(
                      (0, r(d[2]).filterBookableTrips)(
                        t
                          .filter(t => (t.available_seats ?? 0) > 0)
                          .map(t => (0, r(d[0]).tripRowToCard)(t))
                      ).filter(r(d[3]).isBookableLiveTrip),
                      o ?? []
                    );
                  (u(s), R(!1), L(null));
                })),
                (n = (0, r(d[4]).subscribeToLegacyLiveTripTables)(l)));
            }, o);
          return () => {
            ((c = !0), clearTimeout(f), l.cancel(), t(), n());
          };
        }, [s, y]),
        { trotroTrips: n, trotroRideTrips: f, loading: p, fromFallback: v, error: k, refresh: y }
      );
    }
  },
  1621,
  [939, 5, 1619, 688, 1622, 690, 687, 753]
);
__d(
  function (g, _r, i, a, m, e, _d) {
    function r() {
      const r = (0, _r(_d[1]).getSupabase)();
      return r
        ? { supabase: r, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.bookTrotroRide = async function ({
        passengerId: t,
        trip: n,
        seats: o = 1,
        paymentMethod: s = 'momo',
        paymentReference: l = null,
      }) {
        const { supabase: c, error: u } = r();
        if (u) return { data: null, error: u };
        const p = d(n.farePerSeat * o, _r(_d[11]).TRIP_TYPES.TROTRORIDE);
        if (!Boolean(n.isLive && n.dbId))
          return { data: null, error: new Error('This ride is not available for live booking.') };
        const { data: f, error: _ } = await c
          .from('trotroride_trips')
          .select('seats_available, current_passengers')
          .eq('id', n.dbId)
          .single();
        if (_) return { data: null, error: _ };
        if ((f?.seats_available ?? 0) < o)
          return { data: null, error: new Error('Not enough seats available.') };
        const { data: v, error: b } = await c
          .from('reservations')
          .insert({
            passenger_id: t,
            trip_type: _r(_d[11]).TRIP_TYPES.TROTRORIDE,
            trotroride_trip_id: n.dbId,
            seats: o,
            status: 'confirmed',
            fare: p.fare,
            platform_fee: p.platformFee,
            total_amount: p.total,
            payment_method: s,
            payment_status: l ? 'paid' : 'pending',
            payment_reference: l,
            pickup_origin: n.origin,
            pickup_destination: n.destination,
            expires_at: p.expiresAt,
          })
          .select()
          .single();
        return b
          ? { data: null, error: b }
          : (await c
              .from('trotroride_trips')
              .update({
                seats_available: f.seats_available - o,
                current_passengers: (f.current_passengers ?? 0) + o,
              })
              .eq('id', n.dbId),
            { data: v, error: null });
      }),
      (e.computeReservationPricing = d),
      (e.fetchAllLiveTrips = async function (r = {}) {
        const { force: t = !1 } = r;
        return (0, _r(_d[0]).fetchWithCache)((0, _r(_d[0]).liveTripsCacheKey)(), c, {
          ttlMs: 3e4,
          persist: !0,
          force: t,
        });
      }),
      (e.fetchLiveTrotroRideTrips = l),
      (e.fetchLiveTrotroTrips = s),
      Object.defineProperty(e, 'invalidateLiveTripsCache', {
        enumerable: !0,
        get: function () {
          return _r(_d[0]).invalidateLiveTripsCache;
        },
      }),
      (e.joinTrotroRide = async function ({
        passengerId: r,
        passengerName: t,
        trip: n,
        pickup: o,
        dropoff: s,
      }) {
        const l = n?.rideId ?? n?.dbId;
        if (!l) return { data: null, error: new Error('Shared ride is no longer available.') };
        const c = o ?? n?.origin ?? 'Tech Junction',
          d = s ?? n?.destination ?? 'Ayeduase',
          { distanceKm: u, timeMin: p } = (0, _r(_d[10]).resolveRouteMetrics)(c, d, n),
          f = (0, _r(_d[8]).buildFareBreakdown)(
            u,
            n?.tripDuration ?? p,
            (n?.currentPassengers ?? 0) + 1
          ),
          _ = [{ pickup: n?.origin, dropoff: n?.destination }];
        return (0, _r(_d[8]).addCoPassenger)(l, {
          passenger_id: r,
          passenger_name: t ?? 'Passenger',
          pickup: c,
          dropoff: d,
          pickup_lat: n?.latitude,
          pickup_lng: n?.longitude,
          dropoff_lat: null,
          dropoff_lng: null,
          distance_km: u,
          time_min: p,
          current_passengers: n?.currentPassengers ?? 0,
          fare_breakdown: f,
          existingStops: _,
        });
      }),
      (e.peekLiveTripsCache = function () {
        return (0, _r(_d[0]).peekQueryCache)((0, _r(_d[0]).liveTripsCacheKey)(), {
          maxAgeMs: _r(_d[0]).QUERY_CACHE_DISK_STALE_MS,
        });
      }),
      (e.requestTrotroRide = async function ({
        passengerId: r,
        passengerName: t,
        trip: n,
        pickup: o,
        dropoff: s,
        fareBoostGhs: l = 0,
      }) {
        const c = o ?? n?.origin ?? 'Tech Junction',
          d = s ?? n?.destination ?? 'Ayeduase',
          u = (0, _r(_d[9]).resolveLocationCoords)(c),
          p = (0, _r(_d[9]).resolveLocationCoords)(d),
          { distanceKm: f, timeMin: _ } = (0, _r(_d[10]).resolveRouteMetrics)(c, d, n);
        return (0, _r(_d[8]).requestRide)(r, {
          pickup: c,
          dropoff: d,
          pickupLat: u?.latitude ?? n?.latitude ?? 6.6738,
          pickupLng: u?.longitude ?? n?.longitude ?? -1.564,
          dropoffLat: p?.latitude ?? 6.682,
          dropoffLng: p?.longitude ?? -1.552,
          distanceKm: f,
          timeMin: n?.tripDuration ?? _,
          passengerName: t ?? 'Passenger',
          preferredDriverId: n?.driverId ?? null,
          fareBoostGhs: l,
        });
      }),
      (e.subscribeToLegacyLiveTripTables = function (t) {
        const { supabase: n } = r();
        if (!n) return () => {};
        const o = `live-trips-legacy-${Date.now()}`;
        let s = null;
        try {
          s = n
            .channel(o)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'mate_trips' }, t)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'trotroride_trips' }, t)
            .subscribe();
        } catch (r) {}
        return () => {
          s && n.removeChannel(s).catch(() => {});
        };
      }));
    const t =
        '\n  *,\n  profiles:mate_id (\n    id, full_name, trust_score, verification_level, phone_number,\n    vehicle_registration, vehicle_type, momo_merchant_code, ghqr_payload\n  )\n',
      n =
        '\n  *,\n  profiles:driver_id (\n    id, full_name, trust_score, verification_level, phone_number,\n    vehicle_registration, vehicle_type, momo_merchant_code\n  )\n';
    function o(r, t) {
      return (0, _r(_d[2]).filterLiveMateTrips)(
        (0, _r(_d[2]).filterBookableTrips)(r ?? []).filter(_r(_d[3]).isBookableLiveTrip),
        t
      );
    }
    async function s() {
      const { data: n } = await (0, _r(_d[4]).fetchActiveDriverLocations)(),
        { data: s, error: l } = await (0, _r(_d[5]).getActiveTrips)();
      if (!l && s?.length) {
        const r = o(
          s.filter(r => (r.available_seats ?? 0) > 0).map(r => (0, _r(_d[6]).tripRowToCard)(r)),
          n ?? []
        );
        if (r.length) return { data: r, error: null, fromFallback: !1 };
      }
      const { supabase: c, error: d } = r();
      if (d) return { data: [], error: d, fromFallback: !1 };
      try {
        const { data: r, error: s } = await c
          .from('mate_trips')
          .select(t)
          .eq('status', 'active')
          .gt('seats_available', 0)
          .order('started_at', { ascending: !1 });
        if (s) return { data: [], error: s, fromFallback: (0, _r(_d[7]).isMissingTableError)(s) };
        const l = (r ?? []).map(r => (0, _r(_d[6]).mateTripRowToCard)(r));
        return { data: o(l, n ?? []), error: null, fromFallback: !1 };
      } catch (r) {
        return { data: [], error: r, fromFallback: !0 };
      }
    }
    async function l() {
      const { data: t } = await (0, _r(_d[4]).fetchActiveDriverLocations)(),
        [s, l] = await Promise.all([
          (0, _r(_d[8]).fetchOpenRides)(),
          (0, _r(_d[8]).fetchOnlineDrivers)(),
        ]),
        c = o(
          [
            ...(s.data ?? []).map(_r(_d[6]).onlineDriverToCard).filter(Boolean),
            ...(l.data ?? [])
              .filter(r => !(s.data ?? []).some(t => t.driver_id === r.driver_id))
              .map(_r(_d[6]).onlineDriverToCard)
              .filter(Boolean),
          ],
          t ?? []
        );
      if (c.length > 0) return { data: c, error: null, fromFallback: !1 };
      const { supabase: d, error: u } = r();
      if (u) return { data: [], error: u, fromFallback: !0 };
      try {
        const { data: r, error: s } = await d
          .from('trotroride_trips')
          .select(n)
          .eq('status', 'active')
          .gt('seats_available', 0)
          .order('started_at', { ascending: !1 });
        if (s) return { data: [], error: s, fromFallback: (0, _r(_d[7]).isMissingTableError)(s) };
        return {
          data: o(
            (r ?? []).map(r => (0, _r(_d[6]).trotrorideRowToCard)(r)),
            t ?? []
          ),
          error: null,
          fromFallback: !1,
        };
      } catch (r) {
        return { data: [], error: r, fromFallback: !0 };
      }
    }
    async function c() {
      const [r, t] = await Promise.all([s(), l()]);
      return {
        trotroTrips: r.data ?? [],
        trotroRideTrips: t.data ?? [],
        fromFallback: r.fromFallback || t.fromFallback,
        error: r.error ?? t.error,
      };
    }
    function d(r, t = _r(_d[11]).TRIP_TYPES.TROTRO) {
      const n =
          r *
          ((t === _r(_d[11]).TRIP_TYPES.TROTRORIDE ? 15 : _r(_d[11]).PLATFORM_FEE_PERCENT) / 100),
        o = new Date(Date.now() + 60 * _r(_d[11]).RESERVATION_HOLD_MINUTES * 1e3).toISOString();
      return {
        fare: r,
        platformFee: Math.round(100 * n) / 100,
        total: Math.round(100 * (r + n)) / 100,
        expiresAt: o,
      };
    }
  },
  1622,
  [755, 502, 1619, 688, 753, 687, 939, 558, 754, 1507, 1509, 508]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = r(d[1]),
      n = t(r(d[2])),
      s = t(r(d[3])),
      l = t(r(d[4])),
      c = t(r(d[5])),
      u = r(d[6]);
    e.default = (0, o.memo)(function ({
      route: t,
      selected: l,
      onPress: h,
      onRemove: p,
      showRemove: y = !1,
    }) {
      const { colors: b } = (0, r(d[7]).useTheme)(),
        x = (0, o.useMemo)(() => f(b), [b]);
      return (0, u.jsxs)(c.default, {
        style: [x.card, l && x.cardSelected],
        children: [
          y && p
            ? (0, u.jsx)(n.default, {
                style: x.removeBtn,
                onPress: p,
                hitSlop: 6,
                accessibilityRole: 'button',
                accessibilityLabel: `Remove ${t.origin} to ${t.destination} from favourites`,
                children: (0, u.jsx)(r(d[8]).Ionicons, {
                  name: 'close-circle',
                  size: 18,
                  color: b.textMuted,
                }),
              })
            : null,
          (0, u.jsxs)(n.default, {
            style: x.content,
            onPress: h,
            children: [
              (0, u.jsxs)(s.default, {
                style: x.route,
                numberOfLines: 2,
                children: [
                  t.origin,
                  (0, u.jsx)(s.default, { style: x.arrow, children: ' \u2192 ' }),
                  t.destination,
                ],
              }),
              (0, u.jsxs)(s.default, { style: x.fare, children: ['GHS ', t.fare] }),
            ],
          }),
          l && !y
            ? (0, u.jsx)(c.default, {
                style: x.check,
                children: (0, u.jsx)(r(d[8]).Ionicons, {
                  name: 'checkmark',
                  size: 11,
                  color: b.onPrimary,
                }),
              })
            : null,
        ],
      });
    });
    const f = t =>
      l.default.create({
        card: {
          width: 160,
          minHeight: 88,
          backgroundColor: t.surfaceElevated,
          borderRadius: r(d[9]).radius.lg,
          borderWidth: l.default.hairlineWidth,
          borderColor: t.borderSoft,
          padding: r(d[9]).spacing.md,
          marginRight: r(d[9]).spacing.sm,
          justifyContent: 'space-between',
        },
        cardSelected: { borderColor: t.primary, backgroundColor: t.primaryAlpha04 },
        content: { flex: 1, justifyContent: 'space-between' },
        route: {
          fontFamily: r(d[9]).fontFamily.medium,
          fontSize: 13,
          lineHeight: 18,
          color: t.textPrimary,
          paddingRight: r(d[9]).spacing.lg,
        },
        arrow: { color: t.textMuted },
        fare: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 15,
          color: t.textPrimary,
          marginTop: r(d[9]).spacing.sm,
        },
        check: {
          position: 'absolute',
          top: r(d[9]).spacing.sm,
          right: r(d[9]).spacing.sm,
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: t.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        removeBtn: {
          position: 'absolute',
          top: r(d[9]).spacing.xs,
          right: r(d[9]).spacing.xs,
          zIndex: 1,
        },
      });
  },
  1623,
  [1, 5, 326, 161, 26, 19, 183, 381, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.KUMASI_QUICK_ROUTES = e.DEFAULT_LIVE_CORRIDOR = void 0),
      (e.mergeQuickRoutes = function (t = []) {
        const o = new Set(),
          s = [];
        return (
          [...t, ...n].forEach(n => {
            const t = `${n.origin}|${n.destination}`;
            o.has(t) || (o.add(t), s.push(n));
          }),
          s
        );
      }));
    const n = (e.KUMASI_QUICK_ROUTES = [
      { id: 'tj-ay', origin: 'Tech Junction', destination: 'Ayeduase', fare: 4 },
      { id: 'tj-knust', origin: 'Tech Junction', destination: 'KNUST Campus', fare: 3 },
      { id: 'ay-tj', origin: 'Ayeduase', destination: 'Tech Junction', fare: 5 },
      { id: 'knust-ay', origin: 'KNUST Campus', destination: 'Ayeduase', fare: 3 },
      { id: 'kej-ay', origin: 'Kejetia', destination: 'Ayeduase', fare: 6 },
    ]);
    e.DEFAULT_LIVE_CORRIDOR = 'Tech Junction to KNUST';
  },
  1624,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.enrichTrotroRideListing = function (t, { origin: n, destination: o } = {}) {
        const s = Number(t?.farePerSeat ?? t?.fare ?? 0),
          l = n ?? t?.origin ?? '',
          c = o ?? t?.destination ?? '',
          u = l && c ? (0, r(d[0]).compareCorridorPricing)(l, c) : null;
        let h = 'Shared ride';
        'online_driver' === t?.listingType && (h = 'Driver available');
        'shared_ride' === t?.listingType && (h = 'Join shared ride');
        return Object.assign({}, t, {
          fare: s,
          fareLabel: `GHS ${s.toFixed(2)}`,
          routeLabel: t?.route ?? (l && c ? `${l} \u2192 ${c}` : (t?.corridor ?? '')),
          listingLabel: h,
          savingsLabel:
            u && u.savingsVsBolt > 0 ? `Save ~GHS ${u.savingsVsBolt.toFixed(0)} vs Bolt` : null,
          seatsLabel: `${t?.currentPassengers ?? 0}/${t?.maxPassengers ?? 3} filled`,
        });
      }),
      (e.estimateDriverNetFromGross = function (t) {
        const n = t * (r(d[1]).TR_COMMISSION_PERCENT / 100);
        return { gross: t, commission: n, net: t - n };
      }),
      (e.formatDriverEarnings = function ({ gross: t = 0, net: n = 0 }) {
        const o = Math.max(0, t - n);
        return {
          gross: t,
          net: n,
          commission: o,
          grossLabel: `GHS ${t.toFixed(2)}`,
          netLabel: `GHS ${n.toFixed(2)}`,
          commissionLabel: `GHS ${o.toFixed(2)}`,
        };
      }),
      (e.formatScheduledRequestWhen = function (t) {
        return t
          ? new Date(t).toLocaleString('en-GH', { dateStyle: 'medium', timeStyle: 'short' })
          : '';
      }),
      (e.getDriverSetupStatus = function (t) {
        const n = Boolean(t?.phone_number?.trim()),
          o = Boolean(t?.vehicle_registration?.trim()),
          s = Boolean(t?.momo_merchant_code?.trim());
        return {
          hasPhone: n,
          hasVehicle: o,
          hasMomo: s,
          readyToGoOnline: n && o,
          completedCount: [n, o, s].filter(Boolean).length,
        };
      }));
  },
  1625,
  [1509, 508]
);
__d(
  function (g, r, _i, _a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildKumasiLocationPool = function (n = []) {
        const a = n.map(t => t.label || t.address).filter(Boolean),
          i = r(d[0]).TROTRO_ROUTES.flatMap(t => [t.origin, t.destination]),
          l = r(d[1]).TROTRORIDE_HOT_ZONES.map(t => t.label),
          s = r(d[2]).KUMASI_QUICK_ROUTES.flatMap(t => [t.origin, t.destination]),
          o = t.map(t => t.label);
        return [...new Set([...a, ...r(d[3]).KUMASI_LOCATIONS, ...o, ...i, ...l, ...s])].sort(
          (t, n) => t.localeCompare(n)
        );
      }),
      (e.getMatchHighlight = function (t, n) {
        const l = a(t),
          s = a(n);
        if (!s) return { before: t, match: '', after: '' };
        const o = l.indexOf(s);
        if (o >= 0)
          return {
            before: t.slice(0, o),
            match: t.slice(o, o + s.length),
            after: t.slice(o + s.length),
          };
        const c = i(n);
        if (c.length > 0) {
          const n = c[0],
            a = l.indexOf(n);
          if (a >= 0)
            return {
              before: t.slice(0, a),
              match: t.slice(a, a + n.length),
              after: t.slice(a + n.length),
            };
        }
        return { before: '', match: '', after: t };
      }),
      (e.hasSimilarMatches = function (t) {
        return t.some(t => 'similar' === t.matchKind);
      }),
      (e.searchLocations = function (t, n, i = 8) {
        const l = n?.trim() ?? '';
        if (!l) {
          const n = [
              'Tech Junction',
              'Ayeduase',
              'KNUST Campus',
              'Kejetia',
              'Bantama',
              'Adum',
            ].filter(n => t.includes(n)),
            a = t.filter(t => !n.includes(t));
          return [...n, ...a].slice(0, i).map(t => ({ label: t, matchKind: 'popular' }));
        }
        const o = t
          .map(t => {
            const { score: n, matchKind: a } = b(t, l);
            return { label: t, score: n, matchKind: a };
          })
          .filter(t => t.score < 1 / 0)
          .sort((t, n) => t.score - n.score || t.label.localeCompare(n.label));
        if (0 === o.length && l.length >= 2)
          return t
            .map(t => ({ label: t, score: s(l, a(t)), matchKind: 'similar' }))
            .sort((t, n) => t.score - n.score)
            .slice(0, i)
            .map(({ label: t, matchKind: n }) => ({ label: t, matchKind: n }));
        return o.slice(0, i).map(({ label: t, matchKind: n }) => ({ label: t, matchKind: n }));
      }));
    const t = [
        {
          label: 'Tech Junction',
          aliases: [
            'tech',
            'tech junc',
            'tech juction',
            'tech junktion',
            'tj',
            'junction',
            'tech j',
            'tek junction',
          ],
        },
        {
          label: 'Ayeduase',
          aliases: ['ayeduas', 'aye duase', 'eduase', 'ayduase', 'ayeduse', 'aye'],
        },
        {
          label: 'KNUST Campus',
          aliases: [
            'knust',
            'k.n.u.s.t',
            'campus',
            'university',
            'kwame nkrumah',
            'knust campus',
            'knust cam',
          ],
        },
        {
          label: 'Kejetia',
          aliases: ['kej', 'kejetia', 'ketia', 'keji', 'market', 'kejetia market', 'keje'],
        },
        { label: 'Bantama', aliases: ['bantma', 'bantama', 'banta', 'bant'] },
        { label: 'Adum', aliases: ['adum', 'addum', 'adom'] },
        { label: 'Suame', aliases: ['suame', 'suam', 'suame magazine'] },
        { label: 'Asafo', aliases: ['asafo', 'asaf', 'asafo interchange'] },
        { label: 'Tafo', aliases: ['tafo', 'taf', 'tafo nhyiaeso'] },
        {
          label: 'Airport Roundabout',
          aliases: ['airport', 'airpot', 'airport round', 'airport roundabout', 'roundabout'],
        },
      ],
      n = t.reduce(
        (t, n) => (
          t.set(
            n.label.toLowerCase(),
            n.aliases.map(t => a(t))
          ),
          t
        ),
        new Map()
      );
    function a(t) {
      return String(t ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    }
    function i(t) {
      return a(t).split(' ').filter(Boolean);
    }
    function l(t, n) {
      if (t === n) return 0;
      if (!t.length) return n.length;
      if (!n.length) return t.length;
      const a = Array.from({ length: t.length + 1 }, () => new Array(n.length + 1).fill(0));
      for (let n = 0; n <= t.length; n += 1) a[n][0] = n;
      for (let t = 0; t <= n.length; t += 1) a[0][t] = t;
      for (let i = 1; i <= t.length; i += 1)
        for (let l = 1; l <= n.length; l += 1) {
          const s = t[i - 1] === n[l - 1] ? 0 : 1;
          a[i][l] = Math.min(a[i - 1][l] + 1, a[i][l - 1] + 1, a[i - 1][l - 1] + s);
        }
      return a[t.length][n.length];
    }
    function s(t, n) {
      return t && n ? l(t, n) / Math.max(t.length, n.length) : 1;
    }
    function o(t) {
      return t.length <= 2 ? 0.5 : t.length <= 4 ? 0.42 : 0.38;
    }
    function c(t, n) {
      if (!n) return 1 / 0;
      let a = 0;
      for (let i = 0; i < t.length && a < n.length; i += 1) t[i] === n[a] && (a += 1);
      return a !== n.length ? 1 / 0 : 6 + 0.05 * (t.length - n.length);
    }
    function u(t, n) {
      const i = a(n).replace(/\s/g, '');
      if (!i) return 1 / 0;
      const l = t.map(t => t[0] ?? '').join('');
      return l.startsWith(i) ? 4 : c(l, i);
    }
    function h(t, n) {
      if (!n) return 1 / 0;
      if (t === n) return 0;
      if (t.startsWith(n)) return 1;
      if (t.includes(n)) return 2;
      const a = s(n, t);
      if (a <= o(n)) return 8 + 10 * a;
      if (n.length >= 2) {
        const a = s(n, t.slice(0, n.length));
        if (a <= o(n)) return 9 + 10 * a;
      }
      return c(t, n);
    }
    function f(t, n) {
      if (n.length <= 1) return 1 / 0;
      let a = 5,
        i = -1;
      return (
        n.forEach(n => {
          let l = 1 / 0,
            s = -1;
          (t.forEach((t, a) => {
            const i = h(t, n);
            i < l && ((l = i), (s = a));
          }),
            l !== 1 / 0 ? (s < i && (a += 1.5), (i = s), (a += l)) : (a = 1 / 0));
        }),
        a
      );
    }
    function p(t, a) {
      const l = n.get(t.toLowerCase()) ?? [],
        u = i(a);
      let h = 1 / 0;
      return (
        l.forEach(t => {
          if (t === a) h = Math.min(h, 0);
          else if (t.startsWith(a)) h = Math.min(h, 1);
          else if (t.includes(a)) h = Math.min(h, 2);
          else if (u.length > 1) {
            const n = t.split(' ');
            h = Math.min(h, f(n, u));
          } else if (a.length >= 2) {
            const n = s(a, t);
            (n <= o(a) && (h = Math.min(h, 8 + 10 * n)), (h = Math.min(h, c(t, a))));
          }
        }),
        h
      );
    }
    function b(t, n) {
      const l = a(t),
        b = a(n),
        K = l.split(' ').filter(Boolean),
        j = i(n);
      if (!b) return { score: 100, matchKind: 'popular' };
      if (l === b) return { score: 0, matchKind: 'exact' };
      if (l.startsWith(b)) return { score: 1, matchKind: 'prefix' };
      if (l.includes(b)) return { score: 2, matchKind: 'contains' };
      if (j.length > 1) {
        const t = f(K, j);
        if (t < 1 / 0) return { score: t, matchKind: 'word' };
      }
      let k = 1 / 0,
        M = 'word';
      if (
        (K.forEach(t => {
          const n = h(t, b);
          n < k && ((k = n), (M = n >= 8 ? 'similar' : 'word'));
        }),
        k < 1 / 0)
      )
        return { score: k, matchKind: M };
      const O = u(K, b);
      if (O < 1 / 0) return { score: O, matchKind: 'word' };
      const T = c(K.join(''), b.replace(/\s/g, ''));
      if (T < 1 / 0) return { score: T, matchKind: 'similar' };
      const y = p(l, b);
      if (y < 1 / 0) return { score: y, matchKind: 'similar' };
      if (b.length >= 2) {
        const t = s(b, l);
        if (t <= o(b)) return { score: 10 + 10 * t, matchKind: 'similar' };
      }
      return { score: 1 / 0, matchKind: 'none' };
    }
  },
  1626,
  [682, 759, 1624, 1514]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        onClose: c,
        mode: j = 'support',
        title: C = 'Voice chat',
      }) {
        const v = (0, r(d[12]).useSafeAreaInsets)(),
          { colors: T } = (0, r(d[13]).useTheme)(),
          S = x(T),
          w = (0, o.useRef)(null),
          [B, F] = (0, o.useState)(''),
          {
            status: z,
            messages: I,
            liveTranscript: k,
            error: E,
            speechEnabled: H,
            setSpeechEnabled: R,
            toggleListening: P,
            sendMessage: A,
            resetConversation: O,
            configured: L,
            recognitionAvailable: W,
          } = (0, r(d[14]).useGeminiVoice)({ mode: j, autoSpeak: !0 });
        ((0, o.useEffect)(() => {
          t || (O(), F(''));
        }, [t, O]),
          (0, o.useEffect)(() => {
            w.current?.scrollToEnd({ animated: !0 });
          }, [I, k]));
        const D = r(d[15]).VOICE_STATUS[z] ?? r(d[15]).VOICE_STATUS.idle,
          V = 'listening' === z,
          _ = 'speaking' === z,
          M = 'thinking' === z;
        return (0, b.jsx)(n.default, {
          visible: t,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: c,
          children: (0, b.jsxs)(y.default, {
            style: S.overlay,
            children: [
              (0, b.jsx)(s.default, { style: S.backdrop, onPress: c }),
              (0, b.jsxs)(y.default, {
                style: [S.sheet, { paddingBottom: v.bottom + r(d[11]).spacing.lg }],
                children: [
                  (0, b.jsxs)(y.default, {
                    style: S.header,
                    children: [
                      (0, b.jsx)(r(d[16]).Ionicons, { name: 'mic', size: 22, color: T.primary }),
                      (0, b.jsx)(p.default, { style: S.title, children: C }),
                      (0, b.jsx)(s.default, {
                        onPress: c,
                        hitSlop: 12,
                        children: (0, b.jsx)(r(d[16]).Ionicons, {
                          name: 'close',
                          size: 24,
                          color: T.textMuted,
                        }),
                      }),
                    ],
                  }),
                  (0, b.jsxs)(p.default, {
                    style: S.subtitle,
                    children: ['Powered by Gemini \xb7 ', h[j] ?? h.support],
                  }),
                  L
                    ? null
                    : (0, b.jsx)(p.default, {
                        style: S.warning,
                        children:
                          'Add GEMINI_API_KEY to .env and restart Expo to enable voice chat.',
                      }),
                  W
                    ? null
                    : (0, b.jsx)(p.default, {
                        style: S.warning,
                        children:
                          'Voice input is unavailable in Expo Go \u2014 type below or use a dev build for the mic.',
                      }),
                  (0, b.jsxs)(l.default, {
                    ref: w,
                    style: S.messages,
                    showsVerticalScrollIndicator: !1,
                    children: [
                      0 === I.length
                        ? (0, b.jsx)(y.default, {
                            style: [S.bubble, S.assistantBubble],
                            children: (0, b.jsx)(p.default, {
                              style: S.assistantText,
                              children: r(d[15]).VOICE_WELCOME[j] ?? r(d[15]).VOICE_WELCOME.support,
                            }),
                          })
                        : null,
                      I.map(t =>
                        (0, b.jsx)(
                          y.default,
                          {
                            style: [S.bubble, 'user' === t.role ? S.userBubble : S.assistantBubble],
                            children: (0, b.jsx)(p.default, {
                              style: 'user' === t.role ? S.userText : S.assistantText,
                              children: t.text,
                            }),
                          },
                          t.id
                        )
                      ),
                    ],
                  }),
                  k
                    ? (0, b.jsxs)(y.default, {
                        style: S.liveBox,
                        children: [
                          (0, b.jsx)(p.default, { style: S.liveLabel, children: 'You said' }),
                          (0, b.jsx)(p.default, { style: S.liveText, children: k }),
                        ],
                      })
                    : null,
                  E ? (0, b.jsx)(p.default, { style: S.error, children: E }) : null,
                  (0, b.jsxs)(y.default, {
                    style: S.statusRow,
                    children: [
                      (0, b.jsx)(y.default, {
                        style: S.micWrap,
                        children: (0, b.jsx)(s.default, {
                          style: [
                            S.micButton,
                            V && S.micListening,
                            _ && S.micSpeaking,
                            (!L || M || !W) && S.micDisabled,
                          ],
                          onPress: P,
                          disabled: !L || M || !W,
                          accessibilityLabel: V ? 'Stop listening' : 'Start voice input',
                          children: (0, b.jsx)(r(d[16]).Ionicons, {
                            name: V ? 'stop' : _ ? 'volume-high' : 'mic',
                            size: 34,
                            color: T.onPrimary ?? '#FFF',
                          }),
                        }),
                      }),
                      (0, b.jsx)(p.default, {
                        style: S.statusText,
                        children: W ? D : 'Type a message below',
                      }),
                    ],
                  }),
                  (0, b.jsxs)(y.default, {
                    style: S.inputRow,
                    children: [
                      (0, b.jsx)(f.default, {
                        style: S.input,
                        placeholder: 'Type your message\u2026',
                        placeholderTextColor: T.textMuted,
                        value: B,
                        onChangeText: F,
                        multiline: !0,
                        editable: L && !M,
                        onSubmitEditing: () => {
                          B.trim() && (A(B), F(''));
                        },
                      }),
                      (0, b.jsx)(s.default, {
                        style: [S.sendBtn, (!B.trim() || !L || M) && S.sendDisabled],
                        onPress: () => {
                          B.trim() && (A(B), F(''));
                        },
                        disabled: !B.trim() || !L || M,
                        children: (0, b.jsx)(r(d[16]).Ionicons, {
                          name: 'send',
                          size: 18,
                          color: T.onPrimary ?? '#FFF',
                        }),
                      }),
                    ],
                  }),
                  (0, b.jsxs)(y.default, {
                    style: S.controls,
                    children: [
                      (0, b.jsxs)(y.default, {
                        style: {
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: r(d[11]).spacing.sm,
                        },
                        children: [
                          (0, b.jsx)(u.default, {
                            value: H,
                            onValueChange: R,
                            trackColor: { false: T.border, true: T.primaryAlpha35 ?? T.primary },
                            thumbColor: T.onPrimary ?? '#FFF',
                          }),
                          (0, b.jsx)(p.default, {
                            style: S.controlLabel,
                            children: 'Speak replies',
                          }),
                        ],
                      }),
                      (0, b.jsx)(y.default, {
                        style: S.controlActions,
                        children: (0, b.jsx)(s.default, {
                          onPress: O,
                          children: (0, b.jsx)(p.default, {
                            style: S.textAction,
                            children: 'Clear',
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }));
    var o = r(d[1]),
      n = t(r(d[2])),
      s = t(r(d[3])),
      l = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      f = t(r(d[8])),
      y = t(r(d[9])),
      b = r(d[10]);
    const h = {
        ride: 'Ride planner',
        trotroride: 'TrotroRide planner',
        driver: 'Driver coach',
        support: 'Support assistant',
      },
      x = t =>
        c.default.create({
          overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: t.overlay },
          backdrop: { flex: 1 },
          sheet: {
            backgroundColor: t.surfaceElevated,
            borderTopLeftRadius: r(d[11]).radius.xl,
            borderTopRightRadius: r(d[11]).radius.xl,
            borderWidth: 1,
            borderColor: t.border,
            borderBottomWidth: 0,
            maxHeight: '92%',
          },
          header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: r(d[11]).spacing.lg,
            paddingTop: r(d[11]).spacing.md,
            paddingBottom: r(d[11]).spacing.sm,
            gap: r(d[11]).spacing.sm,
          },
          title: {
            flex: 1,
            fontFamily: r(d[11]).fontFamily.bold,
            fontSize: 18,
            color: t.textPrimary,
          },
          subtitle: Object.assign({}, r(d[11]).typography.caption, {
            paddingHorizontal: r(d[11]).spacing.lg,
            marginBottom: r(d[11]).spacing.md,
          }),
          messages: {
            paddingHorizontal: r(d[11]).spacing.lg,
            maxHeight: 280,
            marginBottom: r(d[11]).spacing.md,
          },
          bubble: {
            borderRadius: r(d[11]).radius.md,
            padding: r(d[11]).spacing.md,
            marginBottom: r(d[11]).spacing.sm,
            maxWidth: '90%',
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
            fontFamily: r(d[11]).fontFamily.medium,
            fontSize: 14,
            lineHeight: 20,
          },
          assistantText: {
            color: t.textPrimary,
            fontFamily: r(d[11]).fontFamily.regular,
            fontSize: 14,
            lineHeight: 20,
          },
          liveBox: {
            marginHorizontal: r(d[11]).spacing.lg,
            marginBottom: r(d[11]).spacing.md,
            padding: r(d[11]).spacing.md,
            borderRadius: r(d[11]).radius.md,
            borderWidth: 1,
            borderColor: t.primary,
            backgroundColor: t.primaryAlpha06 ?? t.surface,
          },
          liveLabel: {
            fontFamily: r(d[11]).fontFamily.semiBold,
            fontSize: 11,
            color: t.primary,
            textTransform: 'uppercase',
            letterSpacing: 0.4,
            marginBottom: r(d[11]).spacing.xs,
          },
          liveText: {
            fontFamily: r(d[11]).fontFamily.regular,
            fontSize: 15,
            color: t.textPrimary,
            lineHeight: 21,
          },
          statusRow: {
            alignItems: 'center',
            marginBottom: r(d[11]).spacing.md,
            paddingHorizontal: r(d[11]).spacing.lg,
          },
          statusText: Object.assign({}, r(d[11]).typography.caption, {
            textAlign: 'center',
            marginTop: r(d[11]).spacing.sm,
          }),
          micWrap: { alignItems: 'center', marginBottom: r(d[11]).spacing.md },
          micButton: {
            width: 84,
            height: 84,
            borderRadius: 42,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: t.primary,
            shadowColor: t.primary,
            shadowOpacity: 0.35,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          },
          micListening: { backgroundColor: t.destructive, shadowColor: t.destructive },
          micSpeaking: {
            backgroundColor: t.success ?? '#000000',
            shadowColor: t.success ?? '#000000',
          },
          micDisabled: { opacity: 0.45 },
          controls: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: r(d[11]).spacing.lg,
            paddingTop: r(d[11]).spacing.sm,
            borderTopWidth: 1,
            borderTopColor: t.border,
          },
          controlLabel: {
            fontFamily: r(d[11]).fontFamily.medium,
            fontSize: 14,
            color: t.textSecondary,
          },
          controlActions: { flexDirection: 'row', alignItems: 'center', gap: r(d[11]).spacing.md },
          textAction: { fontFamily: r(d[11]).fontFamily.semiBold, fontSize: 13, color: t.primary },
          error: Object.assign({}, r(d[11]).typography.caption, {
            color: t.destructive,
            textAlign: 'center',
            paddingHorizontal: r(d[11]).spacing.lg,
            marginBottom: r(d[11]).spacing.sm,
          }),
          warning: Object.assign({}, r(d[11]).typography.caption, {
            color: t.textMuted,
            paddingHorizontal: r(d[11]).spacing.lg,
            marginBottom: r(d[11]).spacing.sm,
          }),
          inputRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: r(d[11]).spacing.sm,
            paddingHorizontal: r(d[11]).spacing.lg,
            marginBottom: r(d[11]).spacing.sm,
          },
          input: {
            flex: 1,
            minHeight: 44,
            maxHeight: 96,
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: r(d[11]).radius.md,
            paddingHorizontal: r(d[11]).spacing.md,
            paddingVertical: r(d[11]).spacing.sm,
            fontFamily: r(d[11]).fontFamily.regular,
            fontSize: 15,
            color: t.textPrimary,
            backgroundColor: t.surface,
          },
          sendBtn: {
            width: 44,
            height: 44,
            borderRadius: r(d[11]).radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: t.primary,
          },
          sendDisabled: { opacity: 0.45 },
        });
  },
  1627,
  [1, 5, 948, 326, 106, 26, 253, 161, 255, 19, 183, 377, 572, 381, 1628, 1644, 578]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.useGeminiVoice = function ({ mode: n = 'support', autoSpeak: c = !0 } = {}) {
        const { language: u, locale: l } = (0, _r(d[3]).useLanguage)(),
          [p, f] = (0, e.useState)('idle'),
          [h, y] = (0, e.useState)([]),
          [b, v] = (0, e.useState)(''),
          [k, S] = (0, e.useState)(''),
          [E, _] = (0, e.useState)(c),
          [w, C] = (0, e.useState)(o),
          M = (0, e.useRef)(''),
          P = (0, e.useRef)([]),
          R = (0, e.useRef)(!1),
          x = (0, e.useRef)(async () => {});
        ((0, e.useEffect)(() => {
          P.current = h;
        }, [h]),
          (0, e.useEffect)(
            () => (
              C(o()),
              () => {
                t.stop();
                try {
                  i?.abort?.();
                } catch {}
              }
            ),
            []
          ),
          r('start', () => {
            (f('listening'), S(''));
          }),
          r('end', () => {
            if (R.current) return;
            const e = M.current.trim();
            (v(''), e ? x.current(e) : f('idle'));
          }),
          r('result', e => {
            const t = e.results?.[0]?.transcript ?? '';
            t && ((M.current = t), v(t));
          }),
          r('error', e => {
            'aborted' !== e.error &&
              (f('idle'), S(e.message ?? 'Could not recognize speech. Try again.'));
          }));
        const G = (0, e.useCallback)(
            e => {
              const n = s(e);
              n && E
                ? (t.stop(),
                  (R.current = !0),
                  f('speaking'),
                  t.speak(n, {
                    language: l,
                    rate: 0.92,
                    pitch: 1,
                    onDone: () => {
                      ((R.current = !1), f('idle'));
                    },
                    onStopped: () => {
                      ((R.current = !1), f('idle'));
                    },
                    onError: () => {
                      ((R.current = !1), f('idle'));
                    },
                  }))
                : f('idle');
            },
            [E, l]
          ),
          A = (0, e.useCallback)(
            async e => {
              const r = String(e ?? '').trim();
              if (!r || !(0, _r(d[4]).isGeminiConfigured)()) return;
              (t.stop(), (R.current = !1), (M.current = ''));
              const i = { id: `u-${Date.now()}`, role: 'user', text: r };
              (y(e => [...e, i]), f('thinking'), S(''));
              const o = P.current.slice(-8).map(e => ({ role: e.role, text: e.text })),
                s = await (0, _r(d[5]).chatWithGeminiVoice)(r, o, n, u);
              if (s.error) return (S(s.error.message), void f('idle'));
              const c = s.reply ?? 'Sorry, I did not catch that.',
                l = { id: `a-${Date.now()}`, role: 'assistant', text: c };
              (y(e => [...e, l]), G(c));
            },
            [u, n, G]
          );
        (0, e.useEffect)(() => {
          x.current = A;
        }, [A]);
        const O = (0, e.useCallback)(async () => {
            if (!i?.requestPermissionsAsync) return !1;
            try {
              const e = await i.requestPermissionsAsync();
              return Boolean(e.granted);
            } catch {
              return !1;
            }
          }, []),
          j = (0, e.useCallback)(async () => {
            if (!(0, _r(d[4]).isGeminiConfigured)())
              return void S('Add GEMINI_API_KEY to .env and restart Expo.');
            if (!w || !i?.start)
              return (
                S(
                  'Voice input needs a development build with speech recognition. Type your message below instead.'
                ),
                void f('unavailable')
              );
            if ('speaking' === p) return (t.stop(), (R.current = !1), void f('idle'));
            if ('thinking' === p) return;
            if ('listening' === p) {
              try {
                i.stop?.();
              } catch {
                f('idle');
              }
              return;
            }
            if (!(await O()))
              return (
                S('Microphone and speech recognition permissions are required.'),
                void f('permission')
              );
            (t.stop(), (R.current = !1), (M.current = ''), v(''));
            try {
              i.start({
                lang: 'en-GH',
                interimResults: !0,
                continuous: !1,
                addsPunctuation: !0,
                iosVoiceProcessingEnabled: !0,
              });
            } catch (e) {
              (C(!1),
                S(e instanceof Error ? e.message : 'Could not start voice recognition.'),
                f('unavailable'));
            }
          }, [O, w, p]),
          D = (0, e.useCallback)(() => {
            (t.stop(), (R.current = !1), (M.current = ''), v(''), y([]), S(''), f('idle'));
            try {
              i?.abort?.();
            } catch {}
          }, []);
        return {
          status: p,
          messages: h,
          liveTranscript: b,
          error: k,
          speechEnabled: E,
          setSpeechEnabled: _,
          recognitionAvailable: w,
          toggleListening: j,
          sendMessage: A,
          speak: G,
          resetConversation: D,
          configured: (0, _r(d[4]).isGeminiConfigured)(),
        };
      }));
    var e = _r(d[0]),
      t = (function (e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            r = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var i,
            o,
            s = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return s;
          if ((i = t ? r : n)) {
            if (i.has(e)) return i.get(e);
            i.set(e, s);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((o = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (o.get || o.set)
                ? i(s, t, o)
                : (s[t] = e[t]));
          return s;
        })(e, t);
      })(_r(d[1]));
    let n = null;
    try {
      n = _r(d[2], 'expo-speech-recognition');
    } catch {
      n = null;
    }
    const r =
        'function' == typeof n?.useSpeechRecognitionEvent
          ? n.useSpeechRecognitionEvent
          : function () {},
      i = n?.ExpoSpeechRecognitionModule ?? null;
    function o() {
      if (!i) return !1;
      try {
        return !1 !== i.isRecognitionAvailable?.();
      } catch {
        return !1;
      }
    }
    function s(e) {
      return String(e ?? '')
        .replace(/[*_#`]/g, '')
        .replace(/\n+/g, ' ')
        .trim();
    }
  },
  1628,
  [5, 1629, 1632, 1381, 1637, 1638]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'VoiceQuality', {
        enumerable: !0,
        get: function () {
          return r(d[1]).VoiceQuality;
        },
      }),
      (e.getAvailableVoicesAsync = async function () {
        if (!t.default.getVoices) throw new (r(d[3]).UnavailabilityError)('Speech', 'getVoices');
        return t.default.getVoices();
      }),
      (e.isSpeakingAsync = async function () {
        return t.default.isSpeaking();
      }),
      (e.maxSpeechInputLength = void 0),
      (e.pause = async function () {
        if (!t.default.pause) throw new (r(d[3]).UnavailabilityError)('Speech', 'pause');
        return t.default.pause();
      }),
      (e.resume = async function () {
        if (!t.default.resume) throw new (r(d[3]).UnavailabilityError)('Speech', 'resume');
        return t.default.resume();
      }),
      (e.speak = function (n, s = {}) {
        const p = String(u++);
        ((o[p] = s), c(), t.default.speak(String(p), n, s));
      }),
      (e.stop = async function () {
        return t.default.stop();
      }));
    var t = n(r(d[2]));
    const o = {};
    let u = 1,
      s = !1;
    function p() {
      0 === Object.keys(o).length &&
        (f('Exponent.speakingStarted'),
        f('Exponent.speakingWillSayNextString'),
        f('Exponent.speakingDone'),
        f('Exponent.speakingStopped'),
        f('Exponent.speakingError'),
        (s = !1));
    }
    function c() {
      s ||
        ((s = !0),
        l('Exponent.speakingStarted', ({ id: n }) => {
          const t = o[n];
          t && t.onStart && t.onStart();
        }),
        l('Exponent.speakingWillSayNextString', ({ id: n, charIndex: t, charLength: u }) => {
          const s = o[n];
          s && s.onBoundary && s.onBoundary({ charIndex: t, charLength: u });
        }),
        l('Exponent.speakingDone', ({ id: n }) => {
          const t = o[n];
          (t && t.onDone && t.onDone(), delete o[n], p());
        }),
        l('Exponent.speakingStopped', ({ id: n }) => {
          const t = o[n];
          (t && t.onStopped && t.onStopped(), delete o[n], p());
        }),
        l('Exponent.speakingError', ({ id: n, error: t }) => {
          const u = o[n];
          (u && u.onError && u.onError(new Error(t)), delete o[n], p());
        }));
    }
    function l(n, o) {
      (t.default.listenerCount(n) > 0 && t.default.removeAllListeners(n),
        t.default.addListener(n, o));
    }
    function f(n) {
      t.default.removeAllListeners(n);
    }
    e.maxSpeechInputLength = t.default.maxSpeechInputLength || Number.MAX_VALUE;
  },
  1629,
  [1, 1630, 1631, 339]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n;
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.VoiceQuality = void 0),
      (function (n) {
        ((n.Default = 'Default'), (n.Enhanced = 'Enhanced'));
      })(n || (e.VoiceQuality = n = {})));
  },
  1630,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    async function n() {
      return new Promise(n => {
        const t = window.speechSynthesis.getVoices();
        t.length > 0
          ? n(t)
          : (window.speechSynthesis.onvoiceschanged = function () {
              const t = window.speechSynthesis.getVoices();
              n(t);
            });
      });
    }
    class t extends r(d[0]).NativeModule {
      async speak(t, o, s) {
        if (o.length > 32767)
          throw new (r(d[0]).CodedError)(
            'ERR_SPEECH_INPUT_LENGTH',
            'Speech input text is too long! Limit of input length is: 32767'
          );
        const c = new SpeechSynthesisUtterance();
        if (
          ('number' == typeof s.rate && (c.rate = s.rate),
          'number' == typeof s.pitch && (c.pitch = s.pitch),
          'string' == typeof s.language && (c.lang = s.language),
          'number' == typeof s.volume && (c.volume = s.volume),
          '_voiceIndex' in s && null != s._voiceIndex)
        ) {
          const t = await n();
          c.voice = t[Math.min(t.length - 1, Math.max(0, s._voiceIndex))];
        }
        if ('string' == typeof s.voice) {
          const t = await n();
          c.voice =
            t[
              Math.max(
                0,
                t.findIndex(n => n.voiceURI === s.voice)
              )
            ];
        }
        return (
          'function' == typeof s.onResume && (c.onresume = s.onResume),
          'function' == typeof s.onMark && (c.onmark = s.onMark),
          'function' == typeof s.onBoundary && (c.onboundary = s.onBoundary),
          (c.onstart = n => {
            this.emit('Exponent.speakingStarted', { id: t, nativeEvent: n });
          }),
          (c.onend = n => {
            this.emit('Exponent.speakingDone', { id: t, nativeEvent: n });
          }),
          (c.onpause = n => {
            this.emit('Exponent.speakingStopped', { id: t, nativeEvent: n });
          }),
          (c.onerror = n => {
            this.emit('Exponent.speakingError', { id: t, nativeEvent: n });
          }),
          (c.text = o),
          window.speechSynthesis.speak(c),
          c
        );
      }
      async getVoices() {
        return (await n()).map(n => ({
          identifier: n.voiceURI,
          quality: r(d[1]).VoiceQuality.Default,
          isDefault: n.default,
          language: n.lang,
          localService: n.localService,
          name: n.name,
          voiceURI: n.voiceURI,
        }));
      }
      async isSpeaking() {
        return window.speechSynthesis.speaking;
      }
      async stop() {
        return window.speechSynthesis.cancel();
      }
      async pause() {
        return window.speechSynthesis.pause();
      }
      async resume() {
        return window.speechSynthesis.resume();
      }
      maxSpeechInputLength = 32767;
    }
    e.default = (0, r(d[0]).registerWebModule)(t, 'ExpoSpeech');
  },
  1631,
  [339, 1630]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'AVAudioSessionCategory', {
        enumerable: !0,
        get: function () {
          return r(d[0]).AVAudioSessionCategory;
        },
      }),
      Object.defineProperty(e, 'AVAudioSessionCategoryOptions', {
        enumerable: !0,
        get: function () {
          return r(d[0]).AVAudioSessionCategoryOptions;
        },
      }),
      Object.defineProperty(e, 'AVAudioSessionMode', {
        enumerable: !0,
        get: function () {
          return r(d[0]).AVAudioSessionMode;
        },
      }),
      Object.defineProperty(e, 'AudioEncodingAndroid', {
        enumerable: !0,
        get: function () {
          return r(d[0]).AudioEncodingAndroid;
        },
      }),
      Object.defineProperty(e, 'ExpoSpeechRecognitionModule', {
        enumerable: !0,
        get: function () {
          return r(d[1]).ExpoSpeechRecognitionModule;
        },
      }),
      Object.defineProperty(e, 'ExpoWebSpeechGrammar', {
        enumerable: !0,
        get: function () {
          return r(d[2]).ExpoWebSpeechGrammar;
        },
      }),
      Object.defineProperty(e, 'ExpoWebSpeechGrammarList', {
        enumerable: !0,
        get: function () {
          return r(d[2]).ExpoWebSpeechGrammarList;
        },
      }),
      Object.defineProperty(e, 'ExpoWebSpeechRecognition', {
        enumerable: !0,
        get: function () {
          return r(d[2]).ExpoWebSpeechRecognition;
        },
      }),
      Object.defineProperty(e, 'RecognizerIntentEnableLanguageSwitch', {
        enumerable: !0,
        get: function () {
          return r(d[0]).RecognizerIntentEnableLanguageSwitch;
        },
      }),
      Object.defineProperty(e, 'RecognizerIntentExtraLanguageModel', {
        enumerable: !0,
        get: function () {
          return r(d[0]).RecognizerIntentExtraLanguageModel;
        },
      }),
      Object.defineProperty(e, 'SpeechRecognizerErrorAndroid', {
        enumerable: !0,
        get: function () {
          return r(d[0]).SpeechRecognizerErrorAndroid;
        },
      }),
      Object.defineProperty(e, 'TaskHintIOS', {
        enumerable: !0,
        get: function () {
          return r(d[0]).TaskHintIOS;
        },
      }),
      Object.defineProperty(e, 'useSpeechRecognitionEvent', {
        enumerable: !0,
        get: function () {
          return r(d[3]).useSpeechRecognitionEvent;
        },
      }));
  },
  1632,
  [1633, 1634, 1635, 1636]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TaskHintIOS =
        e.SpeechRecognizerErrorAndroid =
        e.RecognizerIntentExtraLanguageModel =
        e.RecognizerIntentEnableLanguageSwitch =
        e.AudioEncodingAndroid =
        e.AVAudioSessionMode =
        e.AVAudioSessionCategoryOptions =
        e.AVAudioSessionCategory =
          void 0));
    ((e.AVAudioSessionCategory = {
      ambient: 'ambient',
      soloAmbient: 'soloAmbient',
      playback: 'playback',
      record: 'record',
      playAndRecord: 'playAndRecord',
      multiRoute: 'multiRoute',
    }),
      (e.AVAudioSessionCategoryOptions = {
        mixWithOthers: 'mixWithOthers',
        duckOthers: 'duckOthers',
        interruptSpokenAudioAndMixWithOthers: 'interruptSpokenAudioAndMixWithOthers',
        allowBluetooth: 'allowBluetooth',
        allowBluetoothA2DP: 'allowBluetoothA2DP',
        allowAirPlay: 'allowAirPlay',
        defaultToSpeaker: 'defaultToSpeaker',
        overrideMutedMicrophoneInterruption: 'overrideMutedMicrophoneInterruption',
      }),
      (e.AVAudioSessionMode = {
        default: 'default',
        gameChat: 'gameChat',
        measurement: 'measurement',
        moviePlayback: 'moviePlayback',
        spokenAudio: 'spokenAudio',
        videoChat: 'videoChat',
        videoRecording: 'videoRecording',
        voiceChat: 'voiceChat',
        voicePrompt: 'voicePrompt',
      }),
      (e.RecognizerIntentExtraLanguageModel = {
        LANGUAGE_MODEL_FREE_FORM: 'free_form',
        LANGUAGE_MODEL_WEB_SEARCH: 'web_search',
      }),
      (e.RecognizerIntentEnableLanguageSwitch = {
        LANGUAGE_SWITCH_BALANCED: 'balanced',
        LANGUAGE_SWITCH_HIGH_PRECISION: 'high_precision',
        LANGUAGE_SWITCH_QUICK_RESPONSE: 'quick_response',
      }),
      (e.AudioEncodingAndroid = {
        ENCODING_MP3: 9,
        ENCODING_MPEGH_BL_L3: 23,
        ENCODING_MPEGH_BL_L4: 24,
        ENCODING_MPEGH_LC_L3: 25,
        ENCODING_MPEGH_LC_L4: 26,
        ENCODING_OPUS: 20,
        ENCODING_PCM_16BIT: 2,
        ENCODING_PCM_24BIT_PACKED: 21,
        ENCODING_PCM_32BIT: 22,
        ENCODING_PCM_8BIT: 3,
        ENCODING_PCM_FLOAT: 4,
      }),
      (e.TaskHintIOS = {
        unspecified: 'unspecified',
        dictation: 'dictation',
        search: 'search',
        confirmation: 'confirmation',
      }),
      (e.SpeechRecognizerErrorAndroid = {
        ERROR_AUDIO: 3,
        ERROR_CANNOT_CHECK_SUPPORT: 14,
        ERROR_CANNOT_LISTEN_TO_DOWNLOAD_EVENTS: 15,
        ERROR_CLIENT: 5,
        ERROR_INSUFFICIENT_PERMISSIONS: 9,
        ERROR_LANGUAGE_NOT_SUPPORTED: 12,
        ERROR_LANGUAGE_UNAVAILABLE: 13,
        ERROR_NETWORK: 2,
        ERROR_NETWORK_TIMEOUT: 1,
        ERROR_NO_MATCH: 7,
        ERROR_RECOGNIZER_BUSY: 8,
        ERROR_SERVER: 4,
        ERROR_SERVER_DISCONNECTED: 11,
        ERROR_SPEECH_TIMEOUT: 6,
        ERROR_TOO_MANY_REQUESTS: 10,
      }));
  },
  1633,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ExpoSpeechRecognitionModule = void 0));
    let n = null;
    class s extends r(d[0]).NativeModule {
      _clientListeners = new Map();
      _nativeListeners = new Map();
      bindEventListener = (n, s) => {
        const o = t[n]?.(s);
        this.emit(n, o);
      };
      addListener(s, o) {
        const i = n => {
          const i = s in t ? t[s] : null,
            c = i?.(n);
          o(c);
        };
        (n?.addEventListener(s, i),
          this._nativeListeners.has(s) || this._nativeListeners.set(s, new Set()),
          this._nativeListeners.get(s)?.add(i),
          this._clientListeners.set(o, i));
        const c = super.addListener(s, o);
        return {
          remove: () => {
            (this._nativeListeners.get(s)?.delete(i), this._clientListeners.delete(o), c.remove());
          },
        };
      }
      removeAllListeners(n) {
        if (this._nativeListeners.has(n)) {
          const s = this._nativeListeners.get(n);
          if (!s) return;
          for (const [t, o] of this._clientListeners) s.has(o) && this.removeListener(n, t);
          for (const t of s) this.removeListener(n, t);
          this._nativeListeners.delete(n);
        }
      }
      start(s) {
        const t =
          'undefined' != typeof webkitSpeechRecognition
            ? webkitSpeechRecognition
            : SpeechRecognition;
        ((n = new t()),
          (n.lang = s.lang ?? 'en-US'),
          (n.interimResults = s.interimResults ?? !1),
          (n.maxAlternatives = s.maxAlternatives ?? 1),
          (n.continuous = s.continuous ?? !1),
          this._nativeListeners.forEach((s, t) => {
            for (const o of s) (n?.removeEventListener(t, o), n?.addEventListener(t, o));
          }),
          n.start());
      }
      getStateAsync() {
        return (
          console.warn("getStateAsync is not supported on web. Returning 'inactive'."),
          Promise.resolve('inactive')
        );
      }
      stop() {
        n?.stop();
      }
      abort() {
        n?.abort();
      }
      requestPermissionsAsync() {
        return (
          console.warn(
            'requestPermissionsAsync is not supported on web. Returning a granted permission response.'
          ),
          Promise.resolve({ granted: !0, canAskAgain: !1, expires: 'never', status: 'granted' })
        );
      }
      getPermissionsAsync() {
        return (
          console.warn(
            'getPermissionsAsync is not supported on web. Returning a granted permission response.'
          ),
          Promise.resolve({ granted: !0, canAskAgain: !1, expires: 'never', status: 'granted' })
        );
      }
      getMicrophonePermissionsAsync() {
        return (
          console.warn(
            'getMicrophonePermissionsAsync is not supported on web. Returning a granted permission response.'
          ),
          Promise.resolve({ granted: !0, canAskAgain: !1, expires: 'never', status: 'granted' })
        );
      }
      requestMicrophonePermissionsAsync() {
        return (
          console.warn(
            'requestMicrophonePermissionsAsync is not supported on web. Returning a granted permission response.'
          ),
          Promise.resolve({ granted: !0, canAskAgain: !1, expires: 'never', status: 'granted' })
        );
      }
      getSpeechRecognizerPermissionsAsync() {
        return (
          console.warn(
            'getSpeechRecognizerPermissionsAsync is not supported on web. Returning a granted permission response.'
          ),
          Promise.resolve({ granted: !0, canAskAgain: !1, expires: 'never', status: 'granted' })
        );
      }
      requestSpeechRecognizerPermissionsAsync() {
        return (
          console.warn(
            'requestSpeechRecognizerPermissionsAsync is not supported on web. Returning a granted permission response.'
          ),
          Promise.resolve({ granted: !0, canAskAgain: !1, expires: 'never', status: 'granted' })
        );
      }
      async getSupportedLocales() {
        return (
          console.warn('getSupportedLocales is not supported on web. Returning an empty array.'),
          { locales: [], installedLocales: [] }
        );
      }
      getSpeechRecognitionServices() {
        return [];
      }
      getDefaultRecognitionService() {
        return { packageName: '' };
      }
      getAssistantService() {
        return { packageName: '' };
      }
      supportsOnDeviceRecognition() {
        return !1;
      }
      supportsRecording() {
        return !1;
      }
      androidTriggerOfflineModelDownload() {
        return (
          console.warn(
            'androidTriggerOfflineModelDownload is not supported on web. Returning false.'
          ),
          Promise.resolve({
            status: 'opened_dialog',
            message: 'Offline model download is not supported on web.',
          })
        );
      }
      setCategoryIOS() {
        console.warn('setCategoryIOS is not supported on web.');
      }
      getAudioSessionCategoryAndOptionsIOS() {
        return (
          console.warn('getAudioSessionCategoryAndOptionsIOS is not supported on web.'),
          {
            category: 'playAndRecord',
            categoryOptions: ['defaultToSpeaker', 'allowBluetooth'],
            mode: 'measurement',
          }
        );
      }
      setAudioSessionActiveIOS() {
        console.warn('setAudioSessionActiveIOS is not supported on web.');
      }
      isRecognitionAvailable() {
        return (
          'undefined' != typeof webkitSpeechRecognition || 'undefined' != typeof SpeechRecognition
        );
      }
    }
    const t = {
      audioend: n => ({ uri: null }),
      audiostart: n => ({ uri: null }),
      end: n => null,
      error: n => ({ error: n.error, message: n.message }),
      nomatch: n => null,
      result: n => {
        const s = Boolean(n.results[n.resultIndex]?.isFinal);
        if (s) {
          const s = [];
          for (let t = 0; t < n.results[n.resultIndex].length; t++) {
            const o = n.results[n.resultIndex][t];
            s.push({ transcript: o.transcript, confidence: o.confidence, segments: [] });
          }
          return { isFinal: !0, results: s };
        }
        let t = '';
        const o = [];
        for (let i = n.resultIndex; i < n.results.length; i++) {
          const c = n.results[i];
          for (let n = 0; n < c.length; n++) {
            const i = c[n];
            i &&
              (o.push({
                confidence: i.confidence,
                segment: i.transcript,
                startTimeMillis: 0,
                endTimeMillis: 0,
              }),
              s || (t += i.transcript));
          }
        }
        return {
          isFinal: !1,
          results: [
            {
              transcript: t,
              confidence: o.reduce((n, s) => n + s.confidence, 0) / o.length,
              segments: o,
            },
          ],
        };
      },
      soundstart: n => null,
      speechend: n => null,
      speechstart: n => null,
      start: n => null,
      soundend: n => null,
    };
    e.ExpoSpeechRecognitionModule = (0, r(d[0]).registerWebModule)(
      s,
      'ExpoSpeechRecognitionModule'
    );
  },
  1634,
  [901]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ExpoWebSpeechRecognitionEvent =
        e.ExpoWebSpeechRecognition =
        e.ExpoWebSpeechGrammarList =
          void 0));
    let n = null,
      o = null,
      t = null;
    'undefined' != typeof webkitSpeechRecognition
      ? ((n = webkitSpeechRecognition),
        (o = 'undefined' != typeof webkitSpeechGrammarList ? webkitSpeechGrammarList : null),
        (t =
          'undefined' != typeof webkitSpeechRecognitionEvent ? webkitSpeechRecognitionEvent : null))
      : 'undefined' != typeof SpeechRecognition &&
        ((n = SpeechRecognition),
        (o = 'undefined' != typeof SpeechGrammarList ? SpeechGrammarList : null),
        (t = 'undefined' != typeof SpeechRecognitionEvent ? SpeechRecognitionEvent : null));
    ((e.ExpoWebSpeechRecognition = n),
      (e.ExpoWebSpeechGrammarList = o),
      (e.ExpoWebSpeechRecognitionEvent = t));
  },
  1635,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useSpeechRecognitionEvent = function (n, o) {
        return (0, r(d[0]).useEventListener)(r(d[1]).ExpoSpeechRecognitionModule, n, o);
      }));
  },
  1636,
  [901, 1634]
);
__d(
  function (g, r, i, a, m, e, d) {
    var I = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.GEMINI_MODEL = e.GEMINI_API_KEY = e.GEMINI_API_BASE = void 0),
      (e.isGeminiConfigured = function () {
        return Boolean(_?.trim());
      }));
    var n = I(r(d[1]));
    const o = n.default.expoConfig?.extra ?? {},
      _ = (e.GEMINI_API_KEY = o.geminiApiKey ?? process.env.GEMINI_API_KEY ?? '');
    ((e.GEMINI_MODEL = o.geminiModel ?? process.env.GEMINI_MODEL ?? 'gemini-3.1-flash-lite'),
      (e.GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta'));
  },
  1637,
  [1, 509]
);
__d(
  function (g, r, i, a, m, e, d) {
    async function t({
      systemPrompt: t,
      userText: n,
      history: o = [],
      modelAck: s = 'Understood.',
      generationConfig: l = {},
    }) {
      if (!(0, r(d[0]).isGeminiConfigured)())
        return {
          data: null,
          error: new Error(
            'Gemini API key is not configured. Add GEMINI_API_KEY to your .env file.'
          ),
        };
      const u = [];
      (t &&
        (u.push({ role: 'user', parts: [{ text: t }] }),
        u.push({ role: 'model', parts: [{ text: s }] })),
        o.forEach(t => {
          t?.text?.trim() &&
            u.push({
              role: 'assistant' === t.role ? 'model' : 'user',
              parts: [{ text: t.text.trim() }],
            });
        }),
        u.push({ role: 'user', parts: [{ text: n }] }));
      const p = `${r(d[0]).GEMINI_API_BASE}/models/${r(d[0]).GEMINI_MODEL}:generateContent`;
      try {
        const t = await fetch(p, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': r(d[0]).GEMINI_API_KEY,
            },
            body: JSON.stringify({
              contents: u,
              generationConfig: {
                temperature: l.temperature ?? 0.4,
                maxOutputTokens: l.maxOutputTokens ?? 512,
              },
            }),
          }),
          n = await t.json().catch(() => ({}));
        if (!t.ok) {
          const o = n?.error?.message ?? `Gemini request failed (${t.status})`;
          return { data: null, error: new Error(o) };
        }
        const o = n?.candidates?.[0]?.content?.parts
          ?.map(t => t.text ?? '')
          .join('')
          .trim();
        return o
          ? { data: { text: o, raw: n }, error: null }
          : { data: null, error: new Error('Gemini returned an empty response.') };
      } catch (t) {
        return {
          data: null,
          error: t instanceof Error ? t : new Error('Could not reach Gemini API.'),
        };
      }
    }
    async function n(n, o = 'en', s = [], l = {}) {
      const u = (0, r(d[3]).buildGeminiSupportSystemPrompt)(o, l),
        { data: p, error: c } = await t({
          systemPrompt: u,
          userText: n,
          history: s.slice(-12),
          modelAck: 'Understood. I will answer any TrotroOS app question helpfully.',
          generationConfig: { temperature: 0.45, maxOutputTokens: 1536 },
        });
      return c ? { answer: null, error: c } : { answer: p.text, error: null };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.askGeminiSupport = n),
      (e.chatWithGeminiVoice = async function (n, o = [], s = 'support', l = 'en') {
        const u = (0, r(d[3]).buildGeminiAppKnowledgeBlock)(),
          p = (0, r(d[4]).getGeminiLanguageHint)(l),
          c =
            'trotroride' === s
              ? `You are TrotroOS voice assistant for TrotroRide shared cars in Kumasi (up to 3 passengers, cheaper than Bolt).\nRespond in short, natural spoken sentences \u2014 one to three sentences. No bullet lists, markdown, or JSON.\nHelp with corridors: Tech Junction, Ayeduase, KNUST, Kejetia, Bantama. Mention fare boosts during peak hours.\nIf asked how the app works, answer briefly from app knowledge.\n${u}\n${p}`
              : 'driver' === s
                ? `You are TrotroOS voice coach for TrotroRide drivers in Kumasi.\nRespond in short, natural spoken sentences \u2014 one to three sentences. No bullet lists, markdown, or JSON.\nAdvise on corridors, filling seats, peak hours, and accepting requests quickly.\nIf asked about app features, answer from app knowledge.\n${u}\n${p}`
                : 'ride' === s
                  ? `You are TrotroOS voice assistant for Kumasi mobility (trotro, TrotroRide, MoMo, Trip Guardian).\nRespond in short, natural spoken sentences \u2014 one to three sentences. No bullet lists, markdown, or JSON.\nHelp plan trips between Tech Junction, Ayeduase, KNUST, Kejetia, Bantama, and nearby areas.\nIf asked how the app works (wallet, scheduled rides, settings), answer from app knowledge.\n${u}\n${p}`
                  : `${(0, r(d[3]).buildGeminiSupportSystemPrompt)(l)}\nRespond in short, natural spoken sentences \u2014 one to three sentences. No bullet lists or markdown.`,
          { data: y, error: h } = await t({
            systemPrompt: c,
            userText: n,
            history: o.slice(-8),
            modelAck: 'Understood. I will respond in brief, spoken-friendly sentences.',
            generationConfig: { temperature: 0.65, maxOutputTokens: 256 },
          });
        return h ? { reply: null, error: h } : { reply: y.text?.trim() ?? '', error: null };
      }),
      (e.coachTrotroRideDriverWithGemini = async function (n, o = {}, s = []) {
        const { data: l, error: u } = await t({
          systemPrompt: (0, r(d[2]).buildGeminiTrotroRideDriverPrompt)(o),
          userText: n,
          history: s,
          modelAck: 'Understood. I will give brief, practical driver coaching.',
          generationConfig: { temperature: 0.55, maxOutputTokens: 320 },
        });
        if (u) return { coach: null, error: u };
        return { coach: (0, r(d[2]).buildDriverCoachReply)(l.text, o), error: null };
      }),
      (e.planRideWithGemini = async function (o, s = []) {
        const { data: l, error: u } = await t({
          systemPrompt: (0, r(d[1]).buildGeminiSystemPrompt)(),
          userText: o,
          history: s,
          modelAck: 'Understood. I will respond with JSON only for ride planning.',
        });
        if (u) return { plan: null, reply: null, error: u };
        const p = (0, r(d[1]).parseGeminiJson)(l.text),
          c = (0, r(d[1]).buildRidePlanFromGemini)(p);
        if (!c?.origin && !c?.destination && l.text) {
          const t = await n(o, 'en', s);
          if (t.answer) return { plan: null, reply: t.answer, rawText: l.text, error: null };
        }
        return { plan: c, reply: c.reply, rawText: l.text, error: null };
      }),
      (e.planTrotroRideWithGemini = async function (o, s = []) {
        const { data: l, error: u } = await t({
          systemPrompt: (0, r(d[2]).buildGeminiTrotroRidePassengerPrompt)(),
          userText: o,
          history: s,
          modelAck: 'Understood. I will respond with JSON only for TrotroRide planning.',
        });
        if (u) return { plan: null, reply: null, error: u };
        const p = (0, r(d[1]).parseGeminiJson)(l.text),
          c = (0, r(d[2]).parseTrotroRidePassengerResponse)(l.text);
        if (!p && l.text && 'none' === c.suggestedAction && !c.origin) {
          const t = l.text.replace(/```[\s\S]*?```/g, '').trim();
          if ((0, r(d[3]).isAppHelpQuestion)(t) || t.length > 80) {
            const t = await n(o, 'en', s, {
              appMode: 'passenger',
              screen: 'Find Ride \xb7 TrotroRide',
            });
            if (t.answer) return { plan: c, reply: t.answer, rawText: l.text, error: null };
          }
          c.reply = t.slice(0, 600);
        }
        p ||
          !l.text ||
          'none' !== c.suggestedAction ||
          c.origin ||
          c.reply ||
          (c.reply = l.text
            .replace(/```[\s\S]*?```/g, '')
            .trim()
            .slice(0, 600));
        return { plan: c, reply: c.reply, rawText: l.text, error: null };
      }));
  },
  1638,
  [1637, 1639, 1640, 1642, 1383]
);
__d(
  function (g, _r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildGeminiSystemPrompt = function () {
        return `You are TrotroOS AI \u2014 a Kumasi, Ghana mobility assistant for trotro (shared minibus) and TrotroRide (shared car) trips.\n\nKnown places: ${n.join(', ')}.\n\nActive corridors:\n${_r(
          d[1]
        )
          .TROTRO_ROUTES.map(
            n =>
              `${n.origin} \u2192 ${n.destination} (~GHS ${n.baseFare}, ${n.distanceKm} km, ${n.avgTimeMin} min)`
          )
          .join(
            '\n'
          )}\n\nTrotroOS advantages vs Bolt/Uber: seat reservation, station queues, MoMo/GhQR/pay-on-board, 50-70% cheaper on corridors, Trip Guardian safety.\n\nWhen the user asks to travel, extract origin and destination using exact place names from the known list when possible. Map misspellings (e.g. "knust" \u2192 "KNUST Campus", "tech" \u2192 "Tech Junction").\n\nAlways respond with ONLY valid JSON (no markdown fences):\n{\n  "origin": "string or null",\n  "destination": "string or null",\n  "transportMode": "trotro" | "trotroride" | "queue" | "all" | null,\n  "preference": "cheapest" | "fastest" | null,\n  "reply": "friendly 1-3 sentence answer for the user",\n  "suggestedAction": "search" | "join_queue" | "none"\n}\n\nRules:\n- If origin or destination is unclear, set null and ask in "reply".\n- Prefer "trotro" or "queue" for cheapest; "trotroride" for faster/direct.\n- Keep "reply" concise, practical, and Ghana-local (MoMo, trotro, mate).`;
      }),
      (e.buildRidePlanFromGemini = function (n) {
        if (!n || 'object' != typeof n)
          return {
            origin: null,
            destination: null,
            transportMode: _r(d[2]).TRANSPORT_MODES.ALL,
            preference: null,
            reply: 'I could not understand that. Try: "Tech Junction to Kejetia, cheapest option".',
            suggestedAction: 'none',
            pricing: null,
          };
        const r = t(n.origin),
          s = t(n.destination),
          u = o(n.transportMode),
          l = r && s ? (0, _r(d[3]).compareCorridorPricing)(r, s) : null;
        let c = String(n.reply ?? '').trim();
        l &&
          'cheapest' === n.preference &&
          (c += ` Trotro seat ~GHS ${l.trotroSeat.toFixed(2)} vs Bolt/Uber ~GHS ${l.rideHailAvg.toFixed(2)}.`);
        return {
          origin: r,
          destination: s,
          transportMode: u,
          preference: n.preference ?? null,
          reply: c || 'Got it \u2014 check the route I filled in below.',
          suggestedAction: n.suggestedAction ?? (r && s ? 'search' : 'none'),
          pricing: l,
        };
      }),
      (e.parseGeminiJson = function (n) {
        const r = String(n ?? '').trim();
        if (!r) return null;
        const t = r.match(/```(?:json)?\s*([\s\S]*?)```/i),
          o = (t?.[1] ?? r).trim();
        try {
          return JSON.parse(o);
        } catch {
          const n = o.indexOf('{'),
            r = o.lastIndexOf('}');
          if (n >= 0 && r > n)
            try {
              return JSON.parse(o.slice(n, r + 1));
            } catch {
              return null;
            }
          return null;
        }
      }));
    const n = [
      'Tech Junction',
      'Ayeduase',
      'KNUST Campus',
      'Kejetia',
      'Bantama',
      'Adum',
      'Suame',
      'Asafo',
      'Tafo',
      'Airport Roundabout',
    ];
    function r(r) {
      const t = String(r ?? '').trim();
      if (!t) return null;
      const o = (0, _r(d[0]).buildKumasiLocationPool)(),
        s = (0, _r(d[0]).searchLocations)(o, t, 1);
      if (s[0]?.label) return s[0].label;
      return n.find(n => n.toLowerCase() === t.toLowerCase()) ?? t;
    }
    function t(n) {
      return r(n);
    }
    function o(n) {
      const r = String(n ?? '').toLowerCase();
      return 'trotro' === r
        ? _r(d[2]).TRANSPORT_MODES.TROTRO
        : 'trotroride' === r || 'trotro_ride' === r
          ? _r(d[2]).TRANSPORT_MODES.TROTRORIDE
          : 'queue' === r
            ? 'queue'
            : _r(d[2]).TRANSPORT_MODES.ALL;
    }
  },
  1639,
  [1626, 682, 940, 1509]
);
__d(
  function (g, r, i, a, m, e, d) {
    function n(n) {
      const o = Math.max(0, Number(n) || 0),
        t = r(d[0]).FARE_BOOST_OPTIONS_GHS;
      return t.includes(o) ? o : t.reduce((n, t) => (Math.abs(t - o) < Math.abs(n - o) ? t : n), 0);
    }
    function o(n) {
      const o = String(n ?? '').toLowerCase();
      return 'request_trotroride' === o || 'request' === o
        ? 'request_trotroride'
        : 'join_shared' === o || 'join' === o
          ? 'join_shared'
          : 'search' === o
            ? 'search'
            : 'join_queue' === o
              ? 'join_queue'
              : 'none';
    }
    function t(t) {
      if (!t || 'object' != typeof t)
        return {
          origin: null,
          destination: null,
          transportMode: r(d[3]).TRANSPORT_MODES.TROTRORIDE,
          fareBoostGhs: 0,
          preference: null,
          reply:
            'Try: "Tech Junction to Ayeduase on TrotroRide" or "Request a shared car to KNUST".',
          suggestedAction: 'none',
          pricing: null,
        };
      const s = (0, r(d[1]).buildRidePlanFromGemini)(
          Object.assign({}, t, { transportMode: t.transportMode ?? 'trotroride' })
        ),
        l =
          s.origin && s.destination
            ? (0, r(d[4]).compareCorridorPricing)(s.origin, s.destination)
            : null;
      let u = String(t.reply ?? s.reply ?? '').trim();
      const c = n(t.fareBoostGhs),
        R = (0, r(d[5]).getPeakDemandContext)();
      return (
        c > 0 && !u.includes('boost')
          ? (u += ` A GHS ${c} fare boost can help during busy hours.`)
          : R.isPeak &&
            0 === c &&
            !u.toLowerCase().includes('peak') &&
            (u += ` ${R.label} \u2014 consider a small fare boost if matches are slow.`),
        l &&
          !u.includes('GHS') &&
          (u += ` TrotroRide ~GHS ${l.trotroRideSeat.toFixed(2)} vs Bolt ~GHS ${l.rideHailAvg.toFixed(2)}.`),
        Object.assign({}, s, {
          transportMode: r(d[3]).TRANSPORT_MODES.TROTRORIDE,
          fareBoostGhs: c,
          suggestedAction: o(t.suggestedAction ?? s.suggestedAction),
          reply: u,
          pricing: l,
        })
      );
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildDriverCoachReply = function (n, o = {}) {
        const t = String(n ?? '').trim(),
          s =
            r(d[2])
              .DRIVER_CORRIDORS.map(n => n.label)
              .find(n => t.includes(n)) ?? null;
        return {
          reply:
            t ||
            'Stay on your corridor during peak hours and accept requests within 15 seconds for faster matches.',
          recommendedCorridor: s && s !== o.selectedCorridor ? s : null,
        };
      }),
      (e.buildGeminiTrotroRideDriverPrompt = function (n = {}) {
        const o = r(d[2])
            .DRIVER_CORRIDORS.map(n => `${n.label} (${n.demand} demand)`)
            .join('; '),
          t = r(d[6])
            .TROTRORIDE_HOT_ZONES.map(n => `${n.label}: ${n.waiting} waiting, ${n.demand} demand`)
            .join('; '),
          s = (0, r(d[5]).getPeakDemandContext)();
        return `You are TrotroOS TrotroRide Driver Coach for Kumasi, Ghana \u2014 a shared-car driver (up to 3 passengers).\n\n${r(d[2]).TROTRORIDE_INTRO}\n\nCorridors: ${o}\nHot zones: ${t}\nPeak hours: morning ${r(d[2]).PEAK_HOURS.morning.label}, evening ${r(d[2]).PEAK_HOURS.evening.label}\nCurrent demand: ${s.label}\n\nDriver efficiency tips:\n${r(
          d[2]
        )
          .TROTRORIDE_EFFICIENCY_TIPS.map(n => `- ${n}`)
          .join(
            '\n'
          )}\n\nDriver context:\n- Online: ${n.isOnline ? 'yes' : 'no'}\n- Selected corridor: ${n.selectedCorridor ?? 'not set'}\n- Today: ${n.todayRides ?? 0} rides, GHS ${Number(n.todayEarned ?? 0).toFixed(2)} earned\n- Scheduled requests waiting: ${n.scheduledCount ?? 0}\n- Vehicle: ${n.vehicle ?? 'unknown'}\n\nRespond in plain text, 2-4 short sentences. Be practical and encouraging.\nIf recommending a corridor, name it exactly from the corridor list.\nMention fill-rate (2-3 seats), peak timing, or accepting within 15 seconds when relevant.\nDo not use markdown or bullet lists.`;
      }),
      (e.buildGeminiTrotroRidePassengerPrompt = function () {
        return `${(0, r(d[1]).buildGeminiSystemPrompt)()}\n\nFocus on TrotroRide (shared car, up to 3 passengers). ${r(d[2]).TROTRORIDE_INTRO}\n\nTrotroRide passenger tips:\n${r(
          d[2]
        )
          .PASSENGER_TROTRORIDE_TIPS.map(n => `- ${n}`)
          .join(
            '\n'
          )}\n\nAllowed fare boosts (GHS): ${r(d[0]).FARE_BOOST_OPTIONS_GHS.join(', ')}. Suggest boost only during peak or when user wants faster pickup.\n\nExtend the JSON schema with these fields:\n{\n  "origin": "string or null",\n  "destination": "string or null",\n  "transportMode": "trotroride",\n  "fareBoostGhs": 0 | 2 | 5 | 8 | 10,\n  "preference": "cheapest" | "fastest" | null,\n  "reply": "friendly 1-3 sentence answer",\n  "suggestedAction": "search" | "request_trotroride" | "join_shared" | "none"\n}\n\nRules:\n- Always set transportMode to "trotroride" unless user explicitly wants trotro.\n- Use "request_trotroride" when no drivers are likely listed or user wants on-demand pickup.\n- Mention savings vs Bolt when pricing is relevant.\n- Keep reply concise and Ghana-local.`;
      }),
      (e.buildTrotroRidePlanFromGemini = t),
      (e.parseTrotroRidePassengerResponse = function (n) {
        return t((0, r(d[1]).parseGeminiJson)(n));
      }));
  },
  1640,
  [676, 1639, 1641, 940, 1509, 758, 759]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TROTRORIDE_INTRO =
        e.TROTRORIDE_EFFICIENCY_TIPS =
        e.TROTRORIDE_COMMISSION_LABEL =
        e.PEAK_HOURS =
        e.PASSENGER_TROTRORIDE_TIPS =
        e.EARNINGS_TIPS =
        e.DRIVER_TIPS =
        e.DRIVER_SETUP_CHECKLIST =
        e.DRIVER_CORRIDORS =
          void 0),
      (e.getCorridorById = function (o) {
        return n.find(n => n.id === o) ?? n[0];
      }));
    ((e.TROTRORIDE_INTRO =
      'Shared car rides for up to 3 passengers. Cheaper than Bolt, with Trip Guardian and trust scores built in.'),
      (e.TROTRORIDE_COMMISSION_LABEL = `${r(d[0]).TR_COMMISSION_PERCENT}% platform commission on completed rides`));
    const n = (e.DRIVER_CORRIDORS = [
      {
        id: 'c1',
        label: 'Tech Junction \u2192 Ayeduase',
        origin: 'Tech Junction',
        destination: 'Ayeduase',
        demand: 'high',
      },
      {
        id: 'c2',
        label: 'Kejetia \u2192 Ayeduase',
        origin: 'Kejetia',
        destination: 'Ayeduase',
        demand: 'high',
      },
      {
        id: 'c3',
        label: 'Tech Junction \u2192 KNUST Campus',
        origin: 'Tech Junction',
        destination: 'KNUST Campus',
        demand: 'medium',
      },
      {
        id: 'c4',
        label: 'Bantama \u2192 Tech Junction',
        origin: 'Bantama',
        destination: 'Tech Junction',
        demand: 'medium',
      },
    ]);
    ((e.DRIVER_SETUP_CHECKLIST = [
      { id: 'phone', icon: 'call-outline', label: 'Phone number on profile' },
      { id: 'vehicle', icon: 'car-outline', label: 'Vehicle registration added' },
      { id: 'momo', icon: 'wallet-outline', label: 'MoMo merchant code (optional)' },
    ]),
      (e.DRIVER_TIPS = [
        'Go online in high-demand zones like Tech Junction and Ayeduase during morning and evening peaks.',
        'Accept scheduled requests early \u2014 passengers plan campus and city commutes ahead.',
        'Shared rides earn more per km when you fill 2\u20133 seats on the same corridor.',
        'Trip Guardian keeps you and passengers safer on every ride.',
      ]),
      (e.PASSENGER_TROTRORIDE_TIPS = [
        'TrotroRide seats are typically 60\u201370% cheaper than private Bolt/Uber on the same corridor.',
        'Join an in-progress shared ride to split the fare, or request a driver when none are listed.',
        'Add a fare boost during busy hours for faster driver acceptance \u2014 like Bolt Kumasi.',
        'Track pickup ETA live and use Trip Guardian to share your trip with family.',
      ]),
      (e.TROTRORIDE_EFFICIENCY_TIPS = [
        'Stay on one corridor during peak hours \u2014 matches arrive 2\xd7 faster when you avoid zigzag routes.',
        'Fill 2\u20133 seats per trip: shared rides earn more per km than solo private hires.',
        'Accept within 20 seconds \u2014 timed-out requests auto-forward to the next nearest driver.',
        'Claim scheduled rides early so passengers know you are coming and you reduce deadhead km.',
      ]),
      (e.PEAK_HOURS = {
        morning: { start: 6, end: 9, label: '6\u20139 AM \xb7 Campus & city morning rush' },
        evening: { start: 16, end: 20, label: '4\u20138 PM \xb7 Evening return traffic' },
      }),
      (e.EARNINGS_TIPS = [
        'Net payout = passenger fares collected minus TrotroOS commission.',
        'MoMo payouts typically arrive within 24 hours to your merchant code.',
        'Fill more seats per trip to maximize hourly earnings on shared corridors.',
      ]));
  },
  1641,
  [508]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      return `\n${r(d[0]).APP_NAME} is a Kumasi (${r(d[0]).DEFAULT_CITY}, Ghana) mobility super-app. You know the ENTIRE product \u2014 answer ANY question about how the app works, where to find features, fees, modes, safety, payments, troubleshooting, and comparisons to Bolt/Uber.\n\nAPP MODES (Profile \u2192 Switch app mode):\n- Passenger: Find Ride, Bid & Ride, Carpool, Market, My Trips, Profile.\n- Mate (trotro operator): Dashboard, Active Trip, Earnings \u2014 start trips, see waiting passengers, send ride requests to queue passengers, accept seat reservations, GPS broadcast.\n- TrotroRide Driver: dashboard, go online, accept incoming requests, claim scheduled rides, proactively offer rides to nearby passengers, earnings, AI driver coach.\n- Courier: delivery jobs, food/parcel runs, earnings.\n- Vendor: Trotro Eats menu, orders, prep times, shop profile.\n- Station Master: station admin dashboard, waiting list, dispatch passengers to mate trips, demand analytics.\n\nPASSENGER TABS:\n- Find Ride: pick origin/destination, transport mode (Trotro / TrotroRide / Delivery / All), search trips, join queue, reserve seats, Ask AI.\n- Bid & Ride: browse live corridor trips, place seat bids above list fare; when a mate accepts, seat is reserved at your bid price.\n- Carpool: find shared rides, book seats, or offer a ride on your corridor.\n- Market (Trotro Market): browse/buy items along your corridor; pay with wallet or cash meetup; sell from My shop tab.\n- My Trips: unified feed \u2014 queue, mate invites, reservations, TrotroRide requests/rides, carpool, market purchases, accepted bids, Trip Guardian.\n- Profile: wallet, scheduled rides, saved places, favourite routes, trust score, notifications, language, help/AI, legal, switch app mode.\n\nKEY PASSENGER FLOWS:\n- Join Queue: when no vehicle matches \u2014 mates see demand; trust tier boosts queue position (Gold/Platinum).\n- Mate ride request: when waiting in queue, a mate can send you a ride request (invite). Open My Trips \u2192 Accept or Decline within ${r(d[0]).MATE_INVITE_EXPIRY_MINUTES} minutes.\n- Reserve trotro seat: ${r(d[0]).RESERVATION_HOLD_MINUTES}-minute hold; pay MoMo, GhQR, wallet, or pay on board; ${r(d[0]).PLATFORM_FEE_PERCENT}% platform fee on seat fee.\n- TrotroRide: shared car, cheaper than Bolt/Uber; fare boost optional; ~${r(d[0]).TR_COMMISSION_PERCENT}% commission vs ~25% ride-hail. Drivers may also proactively offer you a ride when online nearby.\n- Scheduled rides: Profile \u2192 Scheduled rides \u2014 set future trip, reminders, optional send to mates/drivers.\n- Trip Guardian: live GPS share via WhatsApp, SOS 112, emergency contact, unsafe alert to support.\n- Wallet: Profile \u2192 Wallet \u2014 top-up MoMo, pay fees, cash out (mates/drivers).\n- Delivery & Trotro Eats: Find Ride \u2192 Delivery chip; send parcel or order food from vendors.\n\nMATES & DRIVERS OUTREACH:\n- Mates on Active Trip see waiting passengers and tap "Send ride request" \u2014 passenger gets push + My Trips mate invite card.\n- Station admins can dispatch waiting passengers to an active mate trip.\n- TrotroRide drivers can claim scheduled passenger requests or proactively "Offer ride" to nearby pending on-demand requests from the driver dashboard.\n- Couriers receive incoming delivery jobs (passenger-initiated).\n\nPAYMENTS:\n- MoMo and GhQR for reservations and wallet top-up.\n- Platform fee ${r(d[0]).PLATFORM_FEE_PERCENT}% on trotro seat reservations; show seat + fee + total before pay.\n- Market purchases: wallet or cash meetup.\n\nSAFETY:\n- Ghana emergency: 112, 191, 192, 193.\n- Trip Guardian is not a replacement for emergency services.\n\nSUPPORT & ESCALATION:\n- Email: ${r(d[0]).SUPPORT_EMAIL} (account, payments, bugs, privacy, partnerships).\n- Profile \u2192 Report issue for trip/payment/safety tickets.\n- Profile \u2192 Help & FAQ \u2192 Ask TrotroOS AI (text + voice) for any app question.\n\nPILOT SCOPE:\n- Kumasi corridors (Tech Junction, Ayeduase, KNUST, Kejetia, Bantama, Adum, Suame, etc.).\n- Web preview available; native Android/iOS for best GPS and push.\n\nWhen unsure of a policy detail, say what the app is designed to do and recommend ${r(d[0]).SUPPORT_EMAIL} for account-specific issues. Never invent phone numbers or fees not listed here.\n`.trim();
    }
    function n(t = {}) {
      const n = [];
      return (
        t.appMode && n.push(`User app mode: ${t.appMode}.`),
        t.screen && n.push(`Current screen: ${t.screen}.`),
        (t.origin || t.destination) &&
          n.push(`Selected route: ${t.origin ?? '?'} \u2192 ${t.destination ?? '?'}.`),
        t.hasActiveTrip && n.push('User has an active trip or booking.'),
        null != t.isOnline && n.push(`Driver online: ${t.isOnline ? 'yes' : 'no'}.`),
        n.length ? `\nCURRENT SESSION:\n${n.join('\n')}\n` : ''
      );
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildGeminiAppKnowledgeBlock = t),
      (e.buildGeminiContextBlock = n),
      (e.buildGeminiSupportSystemPrompt = function (s = 'en', o = {}) {
        const p = (0, r(d[1]).getFaqPlainText)(),
          u = t(),
          c = (0, r(d[2]).getGeminiLanguageHint)(s),
          l = n(o);
        return `You are ${r(d[0]).APP_NAME} AI support \u2014 expert on the entire app for passengers, mates, drivers, couriers, vendors, and station admins in Kumasi, Ghana.\n\nYOUR JOB:\n- Answer ANY question about ${r(d[0]).APP_NAME}: features, navigation ("where do I\u2026"), bookings, queue, mate invites, driver offers, Bid & Ride, Carpool, Market, payments, MoMo, wallet, Trip Guardian, trust score, scheduled rides, delivery, eats, app modes, settings, language, notifications, and comparisons to Bolt/Uber.\n- Give step-by-step paths using in-app labels (e.g. "Profile \u2192 Scheduled rides", "My Trips \u2192 Accept").\n- Be concise, friendly, and practical for Ghana users.\n- If the user asks to plan a trip, suggest routes and modes but focus on helping them use the app.\n\nAPP KNOWLEDGE:\n${u}\n${l}\nFAQ (use when relevant):\n${p}\n\n${c}\n\nRULES:\n- Do not make up features that are not described above.\n- For account-specific problems (refunds, locked account, missing payment), direct to ${r(d[0]).SUPPORT_EMAIL} with registered email and trip ID.\n- For immediate safety emergencies, prioritize Trip Guardian / 112 over email.\n- Plain text only \u2014 no markdown headers; short paragraphs and numbered steps are fine.`;
      }),
      (e.isAppHelpQuestion = function (t) {
        const n = String(t ?? '')
          .toLowerCase()
          .trim();
        if (!n) return !1;
        if (
          /\b(cheapest|fastest|take me|get me to|plan a trip|plan my trip)\b/.test(n) ||
          (/\b(from|to|\u2192)\b/.test(n) &&
            /\b(tech junction|ayeduase|knust|kejetia|bantama|adum|suame|campus)\b/.test(n))
        )
          return !1;
        if (
          /\b(how|what|where|why|when|can i|could i|explain|help|tell me about|does the app|is there|wallet|bid|carpool|market|mate invite|ride request|queue|reserve|schedule|scheduled|trust score|trip guardian|switch mode|app mode|support|payment|momo|ghqr|delivery|eats|vendor|courier|driver|station|report|privacy|terms|about|sign out|account|favourite|saved place|platform fee|cancel|refund|notification|language|twi|profile|my trips|find ride|earn|payout|top.?up|cash out|invite|offer ride|nearby passenger)\b/.test(
            n
          )
        )
          return !0;
        if (n.length <= 120 && !/\b(go to|travel to|ride to)\b/.test(n))
          return /\?/.test(n) || /^(what|how|where|why|can|is|do|does)\b/.test(n);
        return !1;
      }));
  },
  1642,
  [508, 1643, 1383]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.HELP_SUGGESTED_QUESTIONS = e.HELP_QUICK_LINKS = e.FAQ_ITEMS = e.FAQ_CATEGORIES = void 0),
      (e.filterFaqItems = function (o, n = 'all') {
        const s = String(o ?? '')
          .trim()
          .toLowerCase();
        return t.filter(o => {
          if (!('all' === n || o.category === n)) return !1;
          if (!s) return !0;
          return `${o.q} ${o.a} ${o.category}`.toLowerCase().includes(s);
        });
      }),
      (e.getFaqPlainText = function () {
        return t.map(o => `Q: ${o.q}\nA: ${o.a}`).join('\n\n');
      }),
      (e.groupFaqByCategory = function (t) {
        return o
          .filter(o => 'all' !== o.id)
          .map(o => Object.assign({}, o, { items: t.filter(t => t.category === o.id) }))
          .filter(o => o.items.length > 0);
      }));
    const o = (e.FAQ_CATEGORIES = [
        { id: 'all', label: 'All', icon: 'grid-outline' },
        { id: 'bookings', label: 'Bookings', icon: 'bus-outline' },
        { id: 'payments', label: 'Payments', icon: 'wallet-outline' },
        { id: 'safety', label: 'Safety', icon: 'shield-checkmark-outline' },
        { id: 'account', label: 'Account', icon: 'person-outline' },
        { id: 'compare', label: 'vs Bolt/Uber', icon: 'git-compare-outline' },
      ]),
      t = (e.FAQ_ITEMS = [
        {
          id: 'delivery-send',
          category: 'bookings',
          icon: 'cube-outline',
          q: 'How do I send a parcel or order food?',
          a: 'On Find Ride, choose the Delivery transport chip. Tap Send a parcel for courier drop-offs. Tap Trotro Eats to browse vendor profiles, filter by dietary prefs, reorder a past meal, and pay with wallet, MoMo, or cash on delivery. Food shops accept and prep before a courier picks up. Rate food and delivery after the drop-off. Vendors can switch to Vendor mode to manage menu, stock, and orders.',
        },
        {
          id: 'trotro-eats-vendor',
          category: 'account',
          icon: 'storefront-outline',
          q: 'How do I sell food on Trotro Eats?',
          a: 'Add your phone in Edit Profile, open Switch app mode, and choose Trotro Eats Vendor. Claim an unowned shop, set your story and open hours, manage menu stock, then accept \u2192 prepare \u2192 mark ready for pickup so couriers can deliver.',
        },
        {
          id: 'vs-bolt',
          category: 'compare',
          icon: 'flash-outline',
          q: 'How is TrotroOS different from Bolt or Uber?',
          a: 'Bolt and Uber are private ride-hail \u2014 great for door-to-door, but expensive on Kumasi corridors. TrotroOS lets you reserve trotro seats, join shared TrotroRide cars, send parcels, order food, join station queues digitally, and pay with MoMo, GhQR, wallet, or on board. On routes like Tech Junction \u2192 Ayeduase, you often save 50\u201370% compared to ride-hail estimates.',
        },
        {
          id: 'fare-boost',
          category: 'compare',
          icon: 'trending-up-outline',
          q: 'Can I boost my fare like on Bolt?',
          a: 'Yes. When requesting an online TrotroRide driver, tap the booking modal and choose a fare boost (+GHS 2, 5, 8, or 10). This works like Bolt Kumasi top-ups during peak demand \u2014 but on shared local fares, not private-car pricing.',
        },
        {
          id: 'reserve-trotro',
          category: 'bookings',
          icon: 'ticket-outline',
          q: 'How do I reserve a trotro seat?',
          a: 'Open Find Ride \u2192 pick your origin and destination \u2192 tap Show rides \u2192 choose a Trotro trip \u2192 Reserve. Pick your seat and confirm with MoMo, GhQR, or pay on board. Your hold lasts 30 minutes \u2014 board before it expires or the seat opens to others.',
        },
        {
          id: 'what-trotroride',
          category: 'bookings',
          icon: 'car-outline',
          q: 'What is TrotroRide?',
          a: 'TrotroRide is TrotroOS shared-car mode. You can request a ride from an online driver along your corridor, or join an open shared ride that already has passengers. Fares split across seats, so it stays cheaper than a private Bolt/Uber trip.',
        },
        {
          id: 'join-queue',
          category: 'bookings',
          icon: 'people-outline',
          q: 'What does Join Queue do?',
          a: 'If no vehicle is available on your route, Join Queue adds you to the mate waiting list for that corridor. Mates see demand and can invite you when a seat opens. Gold and Platinum trust scores get priority in the queue.',
        },
        {
          id: 'scheduled-rides',
          category: 'bookings',
          icon: 'calendar-outline',
          q: 'Can I schedule a ride for later?',
          a: 'Yes. Go to Profile \u2192 Scheduled rides to set a future trip. You will get a reminder before your scheduled time. For trotro, mates may still match you closer to departure based on live demand.',
        },
        {
          id: 'change-route',
          category: 'bookings',
          icon: 'swap-horizontal-outline',
          q: 'How do I change my route after searching?',
          a: 'On the results screen, tap Change next to your route label. This returns you to the route picker so you can edit origin, destination, or swap them. Your queue entry is tied to the route you joined.',
        },
        {
          id: 'momo-pay',
          category: 'payments',
          icon: 'phone-portrait-outline',
          q: 'How do MoMo and GhQR payments work?',
          a: 'When reserving a seat, choose MoMo or GhQR and follow the payment sheet. Send the platform fee to the merchant code shown, then enter your transaction reference to confirm. Mates and drivers can also display their MoMo merchant code in profile for direct payment.',
        },
        {
          id: 'pay-on-board',
          category: 'payments',
          icon: 'cash-outline',
          q: 'Can I pay on board instead of MoMo?',
          a: 'Yes. Select Pay on board when reserving if you prefer cash or to pay the mate directly when you enter the vehicle. Your seat hold still applies \u2014 arrive within 30 minutes.',
        },
        {
          id: 'platform-fee',
          category: 'payments',
          icon: 'receipt-outline',
          q: 'What is the platform fee?',
          a: 'Trotro seat reservations include an 8% platform fee. TrotroRide bookings use a 15% commission model \u2014 lower than typical ride-hail (~25%). The fee supports reservations, Trip Guardian, and live tracking.',
        },
        {
          id: 'trip-guardian',
          category: 'safety',
          icon: 'shield-checkmark-outline',
          q: 'How does Trip Guardian work?',
          a: 'During active trips, open Trip Guardian from My Trips or the ride screen. You can share live trip details on WhatsApp, dial SOS (112), contact emergency services, or send a discreet unsafe alert to support without notifying the driver.',
        },
        {
          id: 'trust-score',
          category: 'safety',
          icon: 'star-outline',
          q: 'How is my trust score calculated?',
          a: 'Your score (0\u2013100) reflects verification level, trip completion rate, ratings, on-time behaviour, account age, and confirmed complaints. Platinum (85+) gets queue priority and faster matching; low scores may limit certain actions until your record improves.',
        },
        {
          id: 'emergency-contact',
          category: 'safety',
          icon: 'call-outline',
          q: 'How do I set an emergency contact?',
          a: 'Go to Profile \u2192 Emergency contact and save a name and phone number. Trip Guardian will include this contact alongside national emergency numbers when you need help during a ride.',
        },
        {
          id: 'switch-mode',
          category: 'account',
          icon: 'swap-horizontal-outline',
          q: 'Can I switch between Passenger, Mate, and Driver?',
          a: 'Yes. Profile \u2192 Switch app mode lets you change between Passenger, Mate (trotro operator), and TrotroRide Driver. Your account stays the same \u2014 only the home screens and tools change.',
        },
        {
          id: 'saved-places',
          category: 'account',
          icon: 'bookmark-outline',
          q: 'How do saved places and favourite routes work?',
          a: 'Profile \u2192 Saved places stores locations like home or campus. Favourite routes appear as quick picks on Find Ride so you can search Tech Junction \u2192 Ayeduase (or your usual corridor) in one tap.',
        },
        {
          id: 'ai-assistant',
          category: 'account',
          icon: 'sparkles-outline',
          q: 'What can TrotroOS AI help with?',
          a: 'Ask AI on Find Ride, Help & FAQ, TrotroRide mode, or the driver coach \u2014 it knows the whole app: trip planning, Bid & Ride, Carpool, Market, mate invites, driver offers, MoMo, wallet, scheduled rides, Trip Guardian, trust score, and all app modes. Example: "How do I accept a mate ride request?" or "What is Bid & Ride?" Escalate to support via Contact support if needed.',
        },
        {
          id: 'mate-invite',
          category: 'account',
          icon: 'paper-plane-outline',
          q: 'A mate sent me a ride request \u2014 what do I do?',
          a: `Open My Trips. You'll see a card saying the mate sent you a ride request with Accept and Decline. Accepting reserves your seat (platform fee may apply). You have about ${r(d[0]).MATE_INVITE_EXPIRY_MINUTES} minutes before the invite expires. Tap the push notification to jump straight to My Trips.`,
        },
        {
          id: 'bid-and-ride',
          category: 'account',
          icon: 'ribbon-outline',
          q: 'How does Bid & Ride work?',
          a: 'Passenger tab Bid & Ride shows live corridor trips. Place a bid above the list fare to stand out. When a mate accepts, your seat is reserved at your bid price and appears in My Trips.',
        },
        {
          id: 'carpool-market',
          category: 'account',
          icon: 'car-outline',
          q: 'What are Carpool and Market?',
          a: 'Carpool tab: find shared rides along your corridor or offer spare seats. Market tab (Trotro Market): buy and sell items locally \u2014 pay with wallet or cash meetup; manage listings under My shop.',
        },
        {
          id: 'driver-offer',
          category: 'account',
          icon: 'navigate-outline',
          q: 'Can a TrotroRide driver contact me first?',
          a: "Yes. When you request TrotroRide and drivers are online nearby, a driver may proactively offer your ride from their dashboard. You'll get a notification and see the update in My Trips.",
        },
        {
          id: 'contact-support',
          category: 'account',
          icon: 'mail-outline',
          q: 'How do I contact support?',
          a: `Email ${r(d[0]).SUPPORT_EMAIL} or use Profile \u2192 Contact support. For safety issues during a trip, use Trip Guardian first. Include your registered email and trip details for faster help.`,
        },
        {
          id: 'web-vs-android',
          category: 'account',
          icon: 'globe-outline',
          q: 'Is TrotroOS on Google Play?',
          a: 'Not yet. Use TrotroOS in your browser (web preview) or email support for Android beta access. Full GPS, push alerts, and background tracking work best in the native Android app when it launches on Google Play.',
        },
      ]);
    ((e.HELP_QUICK_LINKS = [
      {
        id: 'contact',
        label: 'Email support',
        subtitle: r(d[0]).SUPPORT_EMAIL,
        icon: 'mail-outline',
        route: r(d[1]).ROUTES.PROFILE_CONTACT_SUPPORT,
      },
      {
        id: 'report',
        label: 'Report issue',
        subtitle: 'Trips, payments, safety',
        icon: 'flag-outline',
        route: r(d[1]).ROUTES.PROFILE_REPORT_ISSUE,
      },
      {
        id: 'emergency',
        label: 'Emergency contact',
        subtitle: 'Saved for Trip Guardian',
        icon: 'call-outline',
        route: r(d[1]).ROUTES.PROFILE_EMERGENCY_CONTACT,
      },
      {
        id: 'app-mode',
        label: 'Switch app mode',
        subtitle: 'Passenger \xb7 Mate \xb7 Driver',
        icon: 'repeat-outline',
        route: r(d[1]).ROUTES.PROFILE_APP_MODE,
      },
    ]),
      (e.HELP_SUGGESTED_QUESTIONS = [
        'How do I reserve a trotro seat?',
        'Where do I schedule a ride for later?',
        'How is TrotroOS different from Bolt?',
        'How does Trip Guardian work?',
        'How do I switch to Mate or Driver mode?',
        'What happens if my MoMo payment fails?',
      ]));
  },
  1643,
  [508, 682]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.VOICE_WELCOME = e.VOICE_STATUS = void 0));
    ((e.VOICE_WELCOME = {
      support:
        "Hi \u2014 I'm your TrotroOS voice assistant. Ask about bookings, MoMo, safety, or how we compare to Bolt.",
      ride: "Tell me where you're going in Kumasi. I'll help you find the cheapest trotro or TrotroRide option.",
      trotroride:
        'Ask about shared TrotroRide \u2014 corridors, price vs Bolt, or say request with a fare boost.',
      driver:
        'Driver coach here. Ask which corridor to pick, peak hours, or how to fill more seats.',
    }),
      (e.VOICE_STATUS = {
        idle: 'Tap the mic and speak',
        listening: 'Listening\u2026 tap mic again when finished',
        thinking: 'Thinking\u2026',
        speaking: 'Speaking\u2026 tap mic to interrupt',
        permission: 'Microphone permission needed for voice chat',
        unavailable: 'Speech recognition is not available on this device',
      }));
  },
  1644,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        title: n,
        message: b,
        confirmLabel: p = 'Confirm',
        cancelLabel: j = 'Cancel',
        destructive: x = !1,
        dismissable: v = !0,
        onConfirm: h,
        onCancel: C,
        loading: P = !1,
      }) {
        const k = (0, r(d[9]).useSafeAreaInsets)(),
          { colors: O } = (0, r(d[10]).useTheme)(),
          _ = y(O);
        return (0, f.jsx)(l.default, {
          visible: t,
          transparent: !0,
          animationType: 'fade',
          onRequestClose: v ? C : void 0,
          children: (0, f.jsxs)(c.default, {
            style: _.overlay,
            children: [
              v ? (0, f.jsx)(o.default, { style: _.backdrop, onPress: C }) : null,
              (0, f.jsxs)(c.default, {
                style: [_.dialog, { marginBottom: k.bottom + r(d[8]).spacing.lg }],
                children: [
                  (0, f.jsx)(s.default, { style: _.title, children: n }),
                  b ? (0, f.jsx)(s.default, { style: _.message, children: b }) : null,
                  (0, f.jsxs)(c.default, {
                    style: _.actions,
                    children: [
                      null != j
                        ? (0, f.jsx)(u.default, {
                            title: j,
                            variant: 'ghost',
                            onPress: C,
                            compact: !0,
                            noMargin: !0,
                          })
                        : null,
                      (0, f.jsx)(u.default, {
                        title: p,
                        variant: x ? 'secondary' : 'primary',
                        onPress: h,
                        loading: P,
                        compact: !0,
                        noMargin: !0,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }));
    var l = t(r(d[1])),
      o = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = r(d[7]);
    const y = t =>
      n.default.create({
        overlay: {
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: r(d[8]).spacing.lg,
          backgroundColor: t.overlay,
        },
        backdrop: Object.assign({}, n.default.absoluteFillObject),
        dialog: {
          backgroundColor: t.surfaceElevated,
          borderRadius: r(d[8]).radius.lg,
          borderWidth: 1,
          borderColor: t.border,
          padding: r(d[8]).spacing.xl,
        },
        title: {
          fontFamily: r(d[8]).fontFamily.bold,
          fontSize: 20,
          color: t.textPrimary,
          marginBottom: r(d[8]).spacing.sm,
        },
        message: Object.assign({}, r(d[8]).typography.body, {
          color: t.textSecondary,
          marginBottom: r(d[8]).spacing.lg,
        }),
        actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: r(d[8]).spacing.sm },
      });
  },
  1645,
  [1, 948, 326, 26, 161, 19, 672, 183, 377, 572, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.fetchFeedbackAnalytics = async function (s = 7) {
        const n = (0, r(d[0]).getSupabase)();
        if (!n) return { data: null, error: new Error('Supabase client is not initialized') };
        const o = new Date(Date.now() - 864e5 * s).toISOString();
        try {
          const { data: s, error: t } = await n.rpc('get_feedback_analytics', { p_since: o });
          return t && (0, r(d[1], './db').isMissingTableError)(t)
            ? {
                data: {
                  npsScore: 0,
                  npsResponsesWeek: 0,
                  npsResponsesToday: 0,
                  quickFeedbackWeek: 0,
                  quickFeedbackToday: 0,
                  avgQuickScoreWeek: 0,
                  avgNpsScoreWeek: 0,
                },
                error: null,
              }
            : t
              ? { data: null, error: t }
              : {
                  data: {
                    npsScore: Number(s?.nps_score ?? 0),
                    npsResponsesWeek: Number(s?.nps_responses_week ?? 0),
                    npsResponsesToday: Number(s?.nps_responses_today ?? 0),
                    quickFeedbackWeek: Number(s?.quick_feedback_week ?? 0),
                    quickFeedbackToday: Number(s?.quick_feedback_today ?? 0),
                    avgQuickScoreWeek: Number(s?.avg_quick_score_week ?? 0),
                    avgNpsScoreWeek: Number(s?.avg_nps_score_week ?? 0),
                  },
                  error: null,
                };
        } catch (s) {
          return {
            data: {
              npsScore: 0,
              npsResponsesWeek: 0,
              npsResponsesToday: 0,
              quickFeedbackWeek: 0,
              quickFeedbackToday: 0,
              avgQuickScoreWeek: 0,
              avgNpsScoreWeek: 0,
            },
            error: s,
          };
        }
      }),
      (e.submitFeedbackSubmission = async function ({
        userId: s,
        kind: n,
        score: o,
        message: t = '',
        screen: c = null,
        tripId: u = null,
        reservationId: l = null,
        route: k = null,
        stationId: b = null,
        role: p = 'passenger',
      }) {
        const _ = (0, r(d[0]).getSupabase)();
        if (!_ || !s) return { data: null, error: new Error('Sign in to submit feedback.') };
        const y = Number(o);
        if (!Number.isFinite(y) || y < 0 || y > 10)
          return { data: null, error: new Error('Invalid score.') };
        try {
          const o = {
              user_id: s,
              kind: n,
              score: Math.round(y),
              message: String(t ?? '').trim() || null,
              screen: c,
              trip_id: u,
              reservation_id: l,
              route: k,
              station_id: b,
              role: p,
            },
            { data: S, error: f } = await _.from('feedback_submissions')
              .insert(o)
              .select('id, created_at')
              .single();
          return f &&
            ((0, r(d[1], './db').isMissingTableError)(f) || (0, r(d[1], './db').isRlsError)(f))
            ? { data: { id: `local-${Date.now()}`, synced: !1 }, error: null }
            : f
              ? { data: null, error: f }
              : { data: { id: S.id, createdAt: S.created_at, synced: !0 }, error: null };
        } catch (s) {
          return { data: null, error: s };
        }
      }));
  },
  1646,
  [502, 558]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      const t = (0, r(d[0]).getSupabase)();
      return t ? { supabase: t, error: null } : { supabase: null, error: new Error('offline') };
    }
    function n() {
      return `local-bid-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
    function o(t) {
      if (!t) return null;
      const n = t.profiles ?? t.bidder ?? null;
      return Object.assign({}, t, {
        bidder_name: n?.full_name ?? t.bidder_name ?? 'Passenger',
        trust_score: n?.trust_score ?? t.trust_score ?? null,
      });
    }
    function l(t) {
      const n = (0, r(d[1]).errorMessage)(t);
      return n.includes('bid_already_pending')
        ? new Error('bid_already_pending')
        : n.includes('trip_not_biddable') || n.includes('seat_unavailable')
          ? new Error('trip_not_biddable')
          : n.includes('invalid_bid_amount')
            ? new Error('invalid_bid_amount')
            : n.includes('not_authenticated')
              ? new Error('not_authenticated')
              : t instanceof Error
                ? t
                : new Error(n);
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.acceptBid = async function (n) {
        const { supabase: s, error: u } = t();
        async function c() {
          const t = await (0, r(d[3]).getLocalBidById)(n);
          if (!t || 'pending' !== t.status)
            return { data: null, error: new Error('bid_not_found') };
          const o = await (0, r(d[3]).updateLocalBid)(n, {
            status: 'accepted',
            accepted_at: new Date().toISOString(),
          });
          return (
            await (0, r(d[5]).saveLocalReservation)({
              passengerId: t.bidder_id,
              passengerName: t.bidder_name ?? 'Passenger',
              pickupPoint: t.pickup_point ?? 'Corridor pickup',
              trip: {
                dbId: t.trip_id,
                id: t.trip_id,
                type: 'trotro',
                fare: t.bid_amount,
                origin: t.pickup_point,
                destination: 'Destination',
              },
              trustScore: null,
              status: 'confirmed',
            }),
            await (0, r(d[6]).invalidatePassengerTripsCache)(t.bidder_id),
            { data: o, error: null, localOnly: !0 }
          );
        }
        if (u) return c();
        try {
          const { data: t, error: u } = await s.rpc('accept_seat_bid', { p_bid_id: n });
          if (u) {
            if ((0, r(d[4]).isMissingTableError)(u)) return c();
            throw l(u);
          }
          const p = o(t);
          return (
            p?.bidder_id && (await (0, r(d[6]).invalidatePassengerTripsCache)(p.bidder_id)),
            { data: p, error: null, localOnly: !1 }
          );
        } catch (t) {
          return { data: null, error: l(t) };
        }
      }),
      (e.cancelAcceptedBidBooking = async function (n, s, u = {}) {
        if (!n || !s) return { data: null, error: new Error('missing_params') };
        async function c(t) {
          t?.reservation_id
            ? await (0, r(d[5]).cancelLocalReservation)(t.reservation_id, s).catch(() => {})
            : u.reservationId &&
              (await (0, r(d[5]).cancelLocalReservation)(u.reservationId, s).catch(() => {}));
          const o = await (0, r(d[3]).updateLocalBid)(n, {
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          });
          return o
            ? (await (0, r(d[6]).invalidatePassengerTripsCache)(s),
              await (0, r(d[6]).invalidateLiveTripsCache)(),
              { data: o, error: null, localOnly: !0 })
            : { data: null, error: new Error('bid_not_found') };
        }
        const { supabase: p, error: _ } = t();
        if (_) {
          const t = await (0, r(d[3]).getLocalBidById)(n);
          return t && t.bidder_id === s ? c(t) : { data: null, error: new Error('bid_not_found') };
        }
        const { data: b, error: f } = await p
          .from('seat_bids')
          .select('*')
          .eq('id', n)
          .maybeSingle();
        if (f) return { data: null, error: f };
        if (!b || b.bidder_id !== s) return { data: null, error: new Error('Not authorized') };
        const w = b.reservation_id ?? u.reservationId ?? null;
        if (w) {
          const { cancelReservationAsPassenger: t } = await r(d[8])(d[7], d.paths),
            { error: n } = await t(w, b.trip_id ?? u.tripId, s);
          if (n) return { data: null, error: n };
        }
        const { data: h, error: y } = await p
          .from('seat_bids')
          .update({ status: 'cancelled', updated_at: new Date().toISOString() })
          .eq('id', n)
          .select('*')
          .maybeSingle();
        if (y && (0, r(d[4]).isMissingTableError)(y)) return c(b);
        return y
          ? { data: null, error: l(y) }
          : (await (0, r(d[6]).invalidatePassengerTripsCache)(s),
            await (0, r(d[6]).invalidateLiveTripsCache)(),
            { data: o(h), error: null });
      }),
      (e.declineBid = async function (n) {
        const { supabase: s, error: u } = t();
        if (u) {
          const t = await (0, r(d[3]).updateLocalBid)(n, { status: 'declined' });
          return { data: t, error: t ? null : new Error('bid_not_found') };
        }
        try {
          const { data: t, error: u } = await s.rpc('decline_seat_bid', { p_bid_id: n });
          if (u) {
            if ((0, r(d[4]).isMissingTableError)(u)) {
              const t = await (0, r(d[3]).updateLocalBid)(n, { status: 'declined' });
              return { data: t, error: t ? null : new Error('bid_not_found') };
            }
            throw l(u);
          }
          return { data: o(t), error: null };
        } catch (t) {
          return { data: null, error: l(t) };
        }
      }),
      (e.getBidsForTrip = c),
      (e.getBidsForTripLegacy = async function (t, n = {}) {
        return c('mate_trip', t);
      }),
      (e.getMyBids = async function (n) {
        if (!n) return { data: [], error: new Error('not_authenticated') };
        const { supabase: u, error: c } = t();
        if (c) {
          return {
            data: (await (0, r(d[3]).getLocalMyBids)(n)).map(o),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: t, error: l } = await u
            .from('seat_bids')
            .select(s)
            .eq('bidder_id', n)
            .order('bid_placed_at', { ascending: !1 })
            .limit(40);
          if (l) {
            if ((0, r(d[4]).isMissingTableError)(l)) {
              return {
                data: (await (0, r(d[3]).getLocalMyBids)(n)).map(o),
                error: null,
                localOnly: !0,
              };
            }
            throw l;
          }
          return { data: (t ?? []).map(o), error: null, localOnly: !1 };
        } catch (t) {
          return { data: [], error: l(t) };
        }
      }),
      (e.placeBid = u),
      (e.placeBidLegacy = async function (t, n, o) {
        return u({ tripKind: 'mate_trip', tripId: t, bidAmount: o, userId: n });
      }),
      (e.subscribeToMyBids = function (n, o) {
        return n
          ? (0, r(d[9]).subscribeWithPollFallback)({
              pollMs: r(d[10]).BID_POLL_MS,
              onRefresh: () => o?.(),
              bindChannel: (o, l) => {
                const { supabase: s } = t();
                if (!s) return null;
                const u = s
                  .channel(`my-seat-bids-${n}`)
                  .on(
                    'postgres_changes',
                    {
                      event: '*',
                      schema: 'public',
                      table: 'seat_bids',
                      filter: `bidder_id=eq.${n}`,
                    },
                    o
                  )
                  .subscribe(l);
                return {
                  remove: () => {
                    s.removeChannel(u).catch(() => {});
                  },
                };
              },
            })
          : () => {};
      }),
      (e.subscribeToTripBids = function (n, o, l) {
        return o
          ? (0, r(d[9]).subscribeWithPollFallback)({
              pollMs: r(d[10]).BID_POLL_MS,
              onRefresh: () => l?.(),
              bindChannel: (l, s) => {
                const { supabase: u } = t();
                if (!u) return null;
                const c = u
                  .channel(`seat-bids-${n}-${o}`)
                  .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'seat_bids', filter: `trip_id=eq.${o}` },
                    l
                  )
                  .subscribe(s);
                return {
                  remove: () => {
                    u.removeChannel(c).catch(() => {});
                  },
                };
              },
            })
          : () => {};
      }),
      (e.suggestedBidAmounts = function (t) {
        const n = Number(t) || 0;
        if (n <= 0) return [{ label: 'GH\u20b5 5', value: 5 }];
        return [
          { label: `GH\u20b5 ${n.toFixed(2)}`, value: n, hint: 'list' },
          {
            label: `GH\u20b5 ${(1.05 * n).toFixed(2)}`,
            value: Math.round(1.05 * n * 100) / 100,
            hint: '+5%',
          },
          {
            label: `GH\u20b5 ${(1.1 * n).toFixed(2)}`,
            value: Math.round(1.1 * n * 100) / 100,
            hint: '+10%',
          },
        ];
      }),
      (e.tripCardToKind = function (t) {
        return t?.tripKind ? t.tripKind : 'trotroride' === t?.type ? 'trotroride_trip' : 'trip';
      }),
      (e.withdrawBid = async function (n, s) {
        const { supabase: u, error: c } = t();
        if (c) {
          const t = await (0, r(d[3]).updateLocalBid)(n, { status: 'withdrawn' });
          return { data: t, error: t ? null : new Error('bid_not_found') };
        }
        try {
          const { data: t, error: s } = await u.rpc('withdraw_seat_bid', { p_bid_id: n });
          if (s) {
            if ((0, r(d[4]).isMissingTableError)(s)) {
              const t = await (0, r(d[3]).updateLocalBid)(n, { status: 'withdrawn' });
              return { data: t, error: t ? null : new Error('bid_not_found') };
            }
            throw l(s);
          }
          return { data: o(t), error: null };
        } catch (t) {
          return { data: null, error: l(t) };
        }
      }));
    const s = '\n  *,\n  profiles:bidder_id ( id, full_name, trust_score )\n';
    async function u({
      tripKind: s,
      tripId: u,
      bidAmount: c,
      pickupPoint: p,
      message: _,
      userId: b,
    }) {
      if (!u || !b) return { data: null, error: new Error('missing_params') };
      const f = Number(c);
      if (!Number.isFinite(f) || f <= 0)
        return { data: null, error: new Error('invalid_bid_amount') };
      const { supabase: w, error: h } = t();
      if (h) {
        if (!(0, r(d[2]).allowLocalStub)()) return { data: null, error: new Error('offline') };
        return {
          data: o(
            await (0, r(d[3]).addLocalBid)({
              id: n(),
              bidder_id: b,
              trip_kind: s,
              trip_id: u,
              bid_amount: f,
              pickup_point: p ?? null,
              message: _ ?? null,
              status: 'pending',
              bid_placed_at: new Date().toISOString(),
              expires_at: new Date(Date.now() + 18e5).toISOString(),
              localOnly: !0,
            })
          ),
          error: null,
          localOnly: !0,
        };
      }
      try {
        const { data: t, error: c } = await w.rpc('place_seat_bid', {
          p_trip_kind: s,
          p_trip_id: u,
          p_bid_amount: f,
          p_pickup_point: p ?? null,
          p_message: _ ?? null,
        });
        if (c) {
          if ((0, r(d[4]).isMissingTableError)(c)) {
            if (!(0, r(d[2]).allowLocalStub)())
              return { data: null, error: new Error('bid_service_unavailable') };
            return {
              data: o(
                await (0, r(d[3]).addLocalBid)({
                  id: n(),
                  bidder_id: b,
                  trip_kind: s,
                  trip_id: u,
                  bid_amount: f,
                  pickup_point: p ?? null,
                  message: _ ?? null,
                  status: 'pending',
                  bid_placed_at: new Date().toISOString(),
                  expires_at: new Date(Date.now() + 18e5).toISOString(),
                  localOnly: !0,
                })
              ),
              error: null,
              localOnly: !0,
            };
          }
          throw l(c);
        }
        return { data: o(t), error: null, localOnly: !1 };
      } catch (t) {
        return { data: null, error: l(t) };
      }
    }
    async function c(n, u) {
      if (!u) return { data: [], error: new Error('missing_trip') };
      const { supabase: c, error: p } = t();
      if (p) {
        return {
          data: (await (0, r(d[3]).getLocalBidsForTrip)(n, u)).map(o),
          error: null,
          localOnly: !0,
        };
      }
      try {
        const { data: t, error: l } = await c
          .from('seat_bids')
          .select(s)
          .eq('trip_kind', n)
          .eq('trip_id', u)
          .eq('status', 'pending')
          .order('bid_amount', { ascending: !1 });
        if (l) {
          if ((0, r(d[4]).isMissingTableError)(l)) {
            return {
              data: (await (0, r(d[3]).getLocalBidsForTrip)(n, u)).map(o),
              error: null,
              localOnly: !0,
            };
          }
          throw l;
        }
        return { data: (t ?? []).map(o), error: null, localOnly: !1 };
      } catch (t) {
        return { data: [], error: l(t) };
      }
    }
  },
  1647,
  {
    0: 502,
    1: 557,
    2: 688,
    3: 1648,
    4: 558,
    5: 935,
    6: 755,
    7: 1523,
    8: 942,
    9: 689,
    10: 938,
    paths: {},
  }
);
__d(
  function (g, r, i, _a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addLocalBid = async function (t) {
        const n = (await c()).filter(
          n =>
            !(
              n.bidder_id === t.bidder_id &&
              n.trip_kind === t.trip_kind &&
              n.trip_id === t.trip_id &&
              'pending' === n.status
            )
        );
        return (n.unshift(t), await s(n), t);
      }),
      (e.clearStaleLocalBids = async function () {
        const t = await c(),
          n = t.filter(
            t => !t.localOnly && l(t.trip_id) && !String(t.id ?? '').startsWith('local-bid-')
          );
        n.length !== t.length && (await s(n));
        return t.length - n.length;
      }),
      (e.getLocalBidById = async function (t) {
        return (await c()).find(n => n.id === t) ?? null;
      }),
      (e.getLocalBidsForMate = async function (t, n = []) {
        const a = await c();
        return n.length
          ? a.filter(t => 'pending' === t.status && n.includes(t.trip_id))
          : a.filter(t => 'pending' === t.status);
      }),
      (e.getLocalBidsForTrip = async function (t, n) {
        return (await c()).filter(
          a => a.trip_kind === t && a.trip_id === n && 'pending' === a.status
        );
      }),
      (e.getLocalMyBids = async function (t) {
        return (await c())
          .filter(n => n.bidder_id === t)
          .sort((t, n) => n.bid_placed_at.localeCompare(t.bid_placed_at));
      }),
      (e.updateLocalBid = async function (t, n) {
        const a = (await c()).map(a =>
          a.id === t ? Object.assign({}, a, n, { updated_at: new Date().toISOString() }) : a
        );
        return (await s(a), a.find(n => n.id === t) ?? null);
      }));
    var n = t(r(d[1]));
    const a = '@trotroos/local_seat_bids';
    async function c() {
      try {
        const t = await n.default.getItem(a);
        return t ? JSON.parse(t) : [];
      } catch {
        return [];
      }
    }
    async function s(t) {
      await n.default.setItem(a, JSON.stringify(t));
    }
    function l(t) {
      const n = String(t ?? '');
      return (
        !(!n || n.startsWith('demo-') || n.startsWith('local-')) &&
        /^[0-9a-f]{8}-[0-9a-f]{4}/i.test(n)
      );
    }
  },
  1648,
  [1, 503]
);
__d(
  function (g, _r, i, _a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.bookCarpoolSeat = async function (r, l, c = 1, u) {
        const { supabase: _, error: p } = t();
        if (p) {
          const a = await (0, _r(d[3]).getLocalRideById)(r);
          if (!a || a.available_seats < c)
            return { data: null, error: new Error('not_enough_seats') };
          const t = Number(a.price_per_seat) * c,
            n = await (0, _r(d[3]).addLocalBooking)({
              id: o('booking'),
              ride_id: r,
              passenger_id: l,
              seats_booked: c,
              pickup_point: u ?? null,
              total_amount: t,
              status: 'confirmed',
              booking_time: new Date().toISOString(),
              localOnly: !0,
              carpool_rides: a,
            });
          return (
            await (0, _r(d[3]).updateLocalRide)(r, {
              available_seats: a.available_seats - c,
              status: a.available_seats - c <= 0 ? 'full' : 'active',
            }),
            await (0, _r(d[5]).invalidatePassengerTripsCache)(l),
            { data: s(n), error: null, localOnly: !0 }
          );
        }
        try {
          const { data: t, error: p } = await _.rpc('book_carpool_seat', {
            p_ride_id: r,
            p_seats: c,
            p_pickup_point: u ?? null,
          });
          if (p) {
            if ((0, _r(d[4]).isMissingTableError)(p)) {
              const a = await (0, _r(d[3]).getLocalRideById)(r);
              if (!a || a.available_seats < c)
                return { data: null, error: new Error('not_enough_seats') };
              const t = Number(a.price_per_seat) * c,
                n = await (0, _r(d[3]).addLocalBooking)({
                  id: o('booking'),
                  ride_id: r,
                  passenger_id: l,
                  seats_booked: c,
                  pickup_point: u ?? null,
                  total_amount: t,
                  status: 'confirmed',
                  booking_time: new Date().toISOString(),
                  localOnly: !0,
                  carpool_rides: a,
                });
              return (
                await (0, _r(d[3]).updateLocalRide)(r, {
                  available_seats: a.available_seats - c,
                  status: a.available_seats - c <= 0 ? 'full' : 'active',
                }),
                await (0, _r(d[5]).invalidatePassengerTripsCache)(l),
                { data: s(n), error: null, localOnly: !0 }
              );
            }
            throw n(p);
          }
          const { data: b } = await _.from('carpool_bookings').select(a).eq('id', t.id).single();
          return (
            await (0, _r(d[5]).invalidatePassengerTripsCache)(l),
            { data: s(b ?? t), error: null, localOnly: !1 }
          );
        } catch (r) {
          return { data: null, error: n(r) };
        }
      }),
      (e.cancelCarpoolBooking = async function (r) {
        const { supabase: a, error: o } = t();
        if (o) {
          const a = await (0, _r(d[3]).updateLocalBooking)(r, {
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
          });
          if (a?.ride_id) {
            const r = await (0, _r(d[3]).getLocalRideById)(a.ride_id);
            r &&
              (await (0, _r(d[3]).updateLocalRide)(r.id, {
                available_seats: Math.min(r.total_seats, r.available_seats + a.seats_booked),
                status: 'active',
              }));
          }
          return { data: a, error: a ? null : new Error('booking_not_found') };
        }
        try {
          const { data: t, error: o } = await a.rpc('cancel_carpool_booking', { p_booking_id: r });
          if (o) {
            if ((0, _r(d[4]).isMissingTableError)(o)) {
              const a = await (0, _r(d[3]).updateLocalBooking)(r, {
                status: 'cancelled',
                cancelled_at: new Date().toISOString(),
              });
              if (a?.ride_id) {
                const r = await (0, _r(d[3]).getLocalRideById)(a.ride_id);
                r &&
                  (await (0, _r(d[3]).updateLocalRide)(r.id, {
                    available_seats: Math.min(r.total_seats, r.available_seats + a.seats_booked),
                    status: 'active',
                  }));
              }
              return { data: a, error: a ? null : new Error('booking_not_found') };
            }
            throw n(o);
          }
          return { data: t, error: null };
        } catch (r) {
          return { data: null, error: n(r) };
        }
      }),
      (e.cancelCarpoolRide = async function (r) {
        const { supabase: a, error: o } = t();
        if (o) {
          const a = await (0, _r(d[3]).updateLocalRide)(r, { status: 'cancelled' });
          return { data: a, error: a ? null : new Error('ride_not_found') };
        }
        try {
          const { data: t, error: o } = await a.rpc('cancel_carpool_ride', { p_ride_id: r });
          if (o) {
            if ((0, _r(d[4]).isMissingTableError)(o)) {
              const a = await (0, _r(d[3]).updateLocalRide)(r, { status: 'cancelled' });
              return { data: a, error: a ? null : new Error('ride_not_found') };
            }
            throw n(o);
          }
          return { data: t, error: null };
        } catch (r) {
          return { data: null, error: n(r) };
        }
      }),
      (e.createCarpoolRide = async function ({
        driverId: a,
        origin: s,
        destination: c,
        departureTime: u,
        totalSeats: _,
        pricePerSeat: p,
        vehicleNote: b,
      }) {
        const { supabase: f, error: w } = t();
        if (w) {
          return {
            data: l(
              await (0, _r(d[3]).addLocalRide)({
                id: o('ride'),
                driver_id: a,
                origin: s.trim(),
                destination: c.trim(),
                route_label: `${s.trim()} \u2192 ${c.trim()}`,
                departure_time: u,
                total_seats: _,
                available_seats: _,
                price_per_seat: p,
                vehicle_note: b ?? null,
                status: 'active',
                created_at: new Date().toISOString(),
                localOnly: !0,
                profiles: { id: a, full_name: 'You', trust_score: 75 },
              })
            ),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: t, error: w } = await f.rpc('create_carpool_ride', {
            p_origin: s,
            p_destination: c,
            p_departure_time: u,
            p_total_seats: _,
            p_price_per_seat: p,
            p_vehicle_note: b ?? null,
          });
          if (w) {
            if ((0, _r(d[4]).isMissingTableError)(w)) {
              return {
                data: l(
                  await (0, _r(d[3]).addLocalRide)({
                    id: o('ride'),
                    driver_id: a,
                    origin: s.trim(),
                    destination: c.trim(),
                    route_label: `${s.trim()} \u2192 ${c.trim()}`,
                    departure_time: u,
                    total_seats: _,
                    available_seats: _,
                    price_per_seat: p,
                    vehicle_note: b ?? null,
                    status: 'active',
                    created_at: new Date().toISOString(),
                    localOnly: !0,
                  })
                ),
                error: null,
                localOnly: !0,
              };
            }
            throw n(w);
          }
          const { data: v } = await f.from('carpool_rides').select(r).eq('id', t.id).single();
          return { data: l(v ?? t), error: null, localOnly: !1 };
        } catch (r) {
          return { data: null, error: n(r) };
        }
      }),
      (e.getMyCarpoolBookings = async function (r) {
        if (!r) return { data: [], error: new Error('not_authenticated') };
        const { supabase: o, error: l } = t();
        if (l) {
          return {
            data: (await (0, _r(d[3]).getLocalMyBookings)(r)).map(s),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: t, error: n } = await o
            .from('carpool_bookings')
            .select(a)
            .eq('passenger_id', r)
            .order('booking_time', { ascending: !1 })
            .limit(40);
          if (n) {
            if ((0, _r(d[4]).isMissingTableError)(n)) {
              return {
                data: (await (0, _r(d[3]).getLocalMyBookings)(r)).map(s),
                error: null,
                localOnly: !0,
              };
            }
            throw n;
          }
          return { data: (t ?? []).map(s), error: null, localOnly: !1 };
        } catch (r) {
          return { data: [], error: n(r) };
        }
      }),
      (e.getMyCarpoolOffers = async function (a) {
        if (!a) return { data: [], error: new Error('not_authenticated') };
        const { supabase: o, error: s } = t();
        if (s) {
          return {
            data: (await (0, _r(d[3]).getLocalMyOffers)(a)).map(l),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: t, error: n } = await o
            .from('carpool_rides')
            .select(r)
            .eq('driver_id', a)
            .in('status', ['active', 'full'])
            .order('departure_time', { ascending: !0 })
            .limit(20);
          if (n) {
            if ((0, _r(d[4]).isMissingTableError)(n)) {
              return {
                data: (await (0, _r(d[3]).getLocalMyOffers)(a)).map(l),
                error: null,
                localOnly: !0,
              };
            }
            throw n;
          }
          return { data: (t ?? []).map(l), error: null, localOnly: !1 };
        } catch (r) {
          return { data: [], error: n(r) };
        }
      }),
      (e.normalizeCarpoolBooking = s),
      (e.normalizeCarpoolRide = l),
      (e.searchCarpoolRides = async function (a, o, l) {
        const { supabase: s, error: u } = t();
        if (u) {
          return {
            data: c(await (0, _r(d[3]).getLocalActiveRides)(), a, o, l),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const t = new Date().toISOString();
          let n = s
            .from('carpool_rides')
            .select(r)
            .eq('status', 'active')
            .gt('departure_time', t)
            .gt('available_seats', 0)
            .order('departure_time', { ascending: !0 })
            .limit(60);
          const { data: u, error: _ } = await n;
          if (_) {
            if ((0, _r(d[4]).isMissingTableError)(_)) {
              return {
                data: c(await (0, _r(d[3]).getLocalActiveRides)(), a, o, l),
                error: null,
                localOnly: !0,
              };
            }
            throw _;
          }
          return { data: c(u, a, o, l), error: null, localOnly: !1 };
        } catch (r) {
          return { data: [], error: n(r), localOnly: !1 };
        }
      }),
      (e.subscribeToCarpoolRides = function (r) {
        const { supabase: a } = t();
        if (!a) return () => {};
        const o = a
          .channel('carpool-rides-live')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'carpool_rides' }, a =>
            r?.(a)
          )
          .subscribe();
        return () => a.removeChannel(o);
      }),
      (e.subscribeToMyCarpoolBookings = function (r, a) {
        const { supabase: o } = t();
        if (!o || !r) return () => {};
        const n = o
          .channel(`carpool-bookings-${r}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'carpool_bookings',
              filter: `passenger_id=eq.${r}`,
            },
            r => a?.(r)
          )
          .subscribe();
        return () => o.removeChannel(n);
      }),
      (e.suggestedCarpoolPrice = function (r, a, t = []) {
        const o = t.find(
          t =>
            t.origin?.toLowerCase().includes(r?.trim()?.toLowerCase()?.slice(0, 4)) &&
            t.destination?.toLowerCase().includes(a?.trim()?.toLowerCase()?.slice(0, 4))
        );
        return o?.fare ?? 5;
      }));
    const r =
        '\n  *,\n  profiles:driver_id (\n    id, full_name, phone_number, trust_score,\n    vehicle_registration, vehicle_type\n  )\n',
      a =
        '\n  *,\n  carpool_rides (\n    id, origin, destination, route_label, departure_time,\n    price_per_seat, driver_id, status, vehicle_note,\n    profiles:driver_id ( id, full_name, phone_number, trust_score, vehicle_registration, vehicle_type )\n  )\n';
    function t() {
      const r = (0, _r(d[0]).getSupabase)();
      return r ? { supabase: r, error: null } : { supabase: null, error: new Error('offline') };
    }
    function o(r) {
      return `local-${r}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
    function n(r) {
      const a = (0, _r(d[1]).errorMessage)(r);
      return a.includes('not_authenticated')
        ? new Error('not_authenticated')
        : a.includes('not_enough_seats')
          ? new Error('not_enough_seats')
          : a.includes('already_booked')
            ? new Error('already_booked')
            : a.includes('cannot_book_own_ride')
              ? new Error('cannot_book_own_ride')
              : a.includes('ride_not_available')
                ? new Error('ride_not_available')
                : a.includes('invalid_departure_time')
                  ? new Error('invalid_departure_time')
                  : r instanceof Error
                    ? r
                    : new Error(a);
    }
    function l(r) {
      if (!r) return null;
      const a = r.profiles ?? {};
      return {
        id: r.id,
        driverId: r.driver_id,
        driverName: a.full_name ?? 'Driver',
        driverPhone: a.phone_number ?? null,
        trustScore: a.trust_score ?? 72,
        vehicleRegistration: a.vehicle_registration ?? null,
        vehicleType: a.vehicle_type ?? null,
        origin: r.origin,
        destination: r.destination,
        routeLabel: r.route_label ?? `${r.origin} \u2192 ${r.destination}`,
        departureTime: r.departure_time,
        availableSeats: r.available_seats,
        totalSeats: r.total_seats,
        pricePerSeat: Number(r.price_per_seat ?? 0),
        vehicleNote: r.vehicle_note ?? null,
        status: r.status,
        localOnly: Boolean(r.localOnly),
      };
    }
    function s(r) {
      if (!r) return null;
      const a = l(r.carpool_rides ?? r.ride);
      return {
        id: r.id,
        rideId: r.ride_id,
        passengerId: r.passenger_id,
        seatsBooked: r.seats_booked,
        pickupPoint: r.pickup_point,
        totalAmount: Number(r.total_amount ?? 0),
        status: r.status,
        bookingTime: r.booking_time,
        ride: a,
        localOnly: Boolean(r.localOnly),
      };
    }
    function c(r, a, t, o) {
      let n = (r ?? [])
        .map(l)
        .filter(Boolean)
        .filter(r => 'active' === r.status && (r.availableSeats ?? 0) > 0);
      if (
        (a?.trim() &&
          t?.trim() &&
          (n = n.filter(r =>
            (0, _r(d[2]).matchesTripRoute)(
              { origin: r.origin, destination: r.destination, route: r.routeLabel },
              a,
              t
            )
          )),
        o)
      ) {
        const r = new Date(`${o}T00:00:00`),
          a = new Date(`${o}T23:59:59`);
        n = n.filter(t => {
          const o = new Date(t.departureTime);
          return o >= r && o <= a;
        });
      }
      return n.sort(
        (r, a) => new Date(r.departureTime).getTime() - new Date(a.departureTime).getTime()
      );
    }
  },
  1649,
  [502, 557, 1616, 1650, 558, 755]
);
__d(
  function (g, _r, i, _a, m, e, d) {
    var t = _r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addLocalBooking = async function (t) {
        const a = await s();
        return (a.unshift(t), await u(a), t);
      }),
      (e.addLocalRide = async function (t) {
        const a = await r();
        return (a.unshift(t), await c(a), t);
      }),
      (e.getLocalActiveRides = async function () {
        return (await r()).filter(
          t => 'active' === t.status && new Date(t.departure_time) > new Date()
        );
      }),
      (e.getLocalMyBookings = async function (t) {
        const a = await s(),
          n = await r();
        return a
          .filter(a => a.passenger_id === t)
          .map(t =>
            Object.assign({}, t, {
              carpool_rides: n.find(a => a.id === t.ride_id) ?? t.carpool_rides,
            })
          )
          .sort((t, a) => a.booking_time.localeCompare(t.booking_time));
      }),
      (e.getLocalMyOffers = async function (t) {
        return (await r())
          .filter(a => a.driver_id === t)
          .sort((t, a) => a.created_at?.localeCompare(t.created_at));
      }),
      (e.getLocalRideById = async function (t) {
        return (await r()).find(a => a.id === t) ?? null;
      }),
      (e.updateLocalBooking = async function (t, a) {
        const n = (await s()).map(n =>
          n.id === t ? Object.assign({}, n, a, { updated_at: new Date().toISOString() }) : n
        );
        return (await u(n), n.find(a => a.id === t) ?? null);
      }),
      (e.updateLocalRide = async function (t, a) {
        const n = (await r()).map(n =>
          n.id === t ? Object.assign({}, n, a, { updated_at: new Date().toISOString() }) : n
        );
        return (await c(n), n.find(a => a.id === t) ?? null);
      }));
    var a = t(_r(d[1]));
    const n = '@trotroos/local_carpool_rides',
      o = '@trotroos/local_carpool_bookings';
    async function r() {
      try {
        const t = await a.default.getItem(n);
        return t ? JSON.parse(t) : [];
      } catch {
        return [];
      }
    }
    async function c(t) {
      await a.default.setItem(n, JSON.stringify(t));
    }
    async function s() {
      try {
        const t = await a.default.getItem(o);
        return t ? JSON.parse(t) : [];
      } catch {
        return [];
      }
    }
    async function u(t) {
      await a.default.setItem(o, JSON.stringify(t));
    }
  },
  1650,
  [1, 503]
);
__d(
  function (g, r, i, _a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.cancelMarketListing = async function (t) {
        const { supabase: a, error: l } = n();
        if (l) {
          const a = await (0, r(d[2]).updateLocalListing)(t, { status: 'cancelled' });
          return { data: a, error: a ? null : new Error('listing_not_found') };
        }
        try {
          const { data: n, error: l } = await a.rpc('cancel_market_listing', { p_listing_id: t });
          if (l) {
            if ((0, r(d[3]).isMissingTableError)(l)) {
              const a = await (0, r(d[2]).updateLocalListing)(t, { status: 'cancelled' });
              return { data: a, error: a ? null : new Error('listing_not_found') };
            }
            throw s(l);
          }
          return { data: o(n), error: null };
        } catch (t) {
          return { data: null, error: s(t) };
        }
      }),
      (e.createMarketListing = async function (a) {
        const { supabase: c, error: u } = n(),
          _ = Number(a.price);
        if (u) {
          return {
            data: o(
              await (0, r(d[2]).addLocalListing)({
                id: l('listing'),
                seller_id: a.sellerId,
                title: a.title.trim(),
                description: a.description?.trim() ?? '',
                category: a.category,
                price: _,
                location: a.location?.trim() ?? null,
                images: a.images ?? [],
                item_condition: a.condition ?? 'good',
                status: 'active',
                view_count: 0,
                created_at: new Date().toISOString(),
                localOnly: !0,
                profiles: { id: a.sellerId, full_name: 'You', trust_score: 75 },
              })
            ),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: n, error: u } = await c.rpc('create_market_listing', {
            p_title: a.title,
            p_description: a.description ?? '',
            p_category: a.category,
            p_price: _,
            p_location: a.location ?? null,
            p_images: a.images ?? [],
            p_item_condition: a.condition ?? 'good',
          });
          if (u) {
            if ((0, r(d[3]).isMissingTableError)(u)) {
              return {
                data: o(
                  await (0, r(d[2]).addLocalListing)({
                    id: l('listing'),
                    seller_id: a.sellerId,
                    title: a.title.trim(),
                    description: a.description?.trim() ?? '',
                    category: a.category,
                    price: _,
                    location: a.location?.trim() ?? null,
                    images: a.images ?? [],
                    item_condition: a.condition ?? 'good',
                    status: 'active',
                    view_count: 0,
                    created_at: new Date().toISOString(),
                    localOnly: !0,
                    profiles: { id: a.sellerId, full_name: 'You', trust_score: 75 },
                  })
                ),
                error: null,
                localOnly: !0,
              };
            }
            throw s(u);
          }
          const { data: p } = await c.from('market_listings').select(t).eq('id', n.id).single();
          return { data: o(p ?? n), error: null, localOnly: !1 };
        } catch (t) {
          return { data: null, error: s(t) };
        }
      }),
      (e.getMarketListings = async function (a = {}) {
        const { supabase: l, error: c } = n();
        if (c) {
          return {
            data: u((await (0, r(d[2]).getLocalActiveListings)()).map(o).filter(Boolean), a),
            error: null,
            localOnly: !0,
          };
        }
        try {
          let n = l.from('market_listings').select(t).eq('status', 'active');
          if (
            (a.category && (n = n.eq('category', a.category)),
            null == a.maxPrice || Number.isNaN(a.maxPrice) || (n = n.lte('price', a.maxPrice)),
            a.location && (n = n.ilike('location', `%${a.location}%`)),
            a.search)
          ) {
            const t = `%${a.search}%`;
            n = n.or(`title.ilike.${t},description.ilike.${t}`);
          }
          const s = a.sort ?? 'newest';
          n =
            'price_asc' === s
              ? n.order('price', { ascending: !0 })
              : 'price_desc' === s
                ? n.order('price', { ascending: !1 })
                : n.order('created_at', { ascending: !1 });
          const { data: c, error: _ } = await n.limit(a.limit ?? 40);
          if (_) {
            if ((0, r(d[3]).isMissingTableError)(_)) {
              return {
                data: u((await (0, r(d[2]).getLocalActiveListings)()).map(o).filter(Boolean), a),
                error: null,
                localOnly: !0,
              };
            }
            throw _;
          }
          let p = (c ?? []).map(o).filter(Boolean);
          return (
            a.search && p.length && (p = u(p, { search: a.search, sort: a.sort })),
            { data: p, error: null, localOnly: !1 }
          );
        } catch (t) {
          return { data: [], error: s(t), localOnly: !1 };
        }
      }),
      (e.getMyMarketListings = async function (a) {
        if (!a) return { data: [], error: new Error('not_authenticated') };
        const { supabase: l, error: c } = n();
        if (c) {
          return {
            data: (await (0, r(d[2]).getLocalMyListings)(a)).map(o),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: n, error: s } = await l
            .from('market_listings')
            .select(t)
            .eq('seller_id', a)
            .neq('status', 'cancelled')
            .order('created_at', { ascending: !1 })
            .limit(40);
          if (s) {
            if ((0, r(d[3]).isMissingTableError)(s)) {
              return {
                data: (await (0, r(d[2]).getLocalMyListings)(a)).map(o),
                error: null,
                localOnly: !0,
              };
            }
            throw s;
          }
          return { data: (n ?? []).map(o), error: null, localOnly: !1 };
        } catch (t) {
          return { data: [], error: s(t) };
        }
      }),
      (e.getUserPurchases = async function (t, l = {}) {
        if (!t) return { data: [], error: new Error('not_authenticated') };
        const { supabase: o, error: u } = n();
        if (u) {
          return {
            data: (await (0, r(d[2]).getLocalMyPurchases)(t)).map(c),
            error: null,
            localOnly: !0,
          };
        }
        try {
          const { data: n, error: s } = await o
            .from('market_purchases')
            .select(a)
            .eq('buyer_id', t)
            .order('purchase_date', { ascending: !1 })
            .limit(l.limit ?? 40);
          if (s) {
            if ((0, r(d[3]).isMissingTableError)(s)) {
              return {
                data: (await (0, r(d[2]).getLocalMyPurchases)(t)).map(c),
                error: null,
                localOnly: !0,
              };
            }
            throw s;
          }
          return { data: (n ?? []).map(c), error: null, localOnly: !1 };
        } catch (t) {
          return { data: [], error: s(t) };
        }
      }),
      (e.normalizeMarketListing = o),
      (e.normalizeMarketPurchase = c),
      (e.purchaseMarketListing = async function (t, o, u = 'wallet') {
        const { supabase: _, error: p } = n();
        if (p) {
          const a = await (0, r(d[2]).getLocalListingById)(t);
          if (!a || 'active' !== a.status)
            return { data: null, error: new Error('listing_unavailable') };
          if (a.seller_id === o) return { data: null, error: new Error('cannot_buy_own_listing') };
          if ('wallet' === u) {
            const t = await (0, r(d[4]).fetchWallet)(),
              n = Number(t.data?.balance_ghs ?? 0);
            if (t.error || n < Number(a.price))
              return { data: null, error: new Error('insufficient_balance') };
          }
          const n = await (0, r(d[2]).addLocalPurchase)({
            id: l('purchase'),
            listing_id: t,
            buyer_id: o,
            seller_id: a.seller_id,
            purchase_price: a.price,
            payment_method: u,
            status: 'cash_meetup' === u ? 'pending' : 'completed',
            purchase_date: new Date().toISOString(),
            localOnly: !0,
            market_listings: a,
          });
          return (
            await (0, r(d[2]).updateLocalListing)(t, {
              status: 'cash_meetup' === u ? 'reserved' : 'sold',
            }),
            await (0, r(d[5]).invalidatePassengerTripsCache)(o),
            { data: c(n), error: null, localOnly: !0 }
          );
        }
        try {
          const { data: n, error: p } = await _.rpc('purchase_market_listing', {
            p_listing_id: t,
            p_payment_method: u,
          });
          if (p) {
            if ((0, r(d[3]).isMissingTableError)(p)) {
              const a = await (0, r(d[2]).getLocalListingById)(t);
              if (!a || 'active' !== a.status)
                return { data: null, error: new Error('listing_unavailable') };
              if (a.seller_id === o)
                return { data: null, error: new Error('cannot_buy_own_listing') };
              if ('wallet' === u) {
                const t = await (0, r(d[4]).fetchWallet)(),
                  n = Number(t.data?.balance_ghs ?? 0);
                if (t.error || n < Number(a.price))
                  return { data: null, error: new Error('insufficient_balance') };
              }
              const n = await (0, r(d[2]).addLocalPurchase)({
                id: l('purchase'),
                listing_id: t,
                buyer_id: o,
                seller_id: a.seller_id,
                purchase_price: a.price,
                payment_method: u,
                status: 'cash_meetup' === u ? 'pending' : 'completed',
                purchase_date: new Date().toISOString(),
                localOnly: !0,
                market_listings: a,
              });
              return (
                await (0, r(d[2]).updateLocalListing)(t, {
                  status: 'cash_meetup' === u ? 'reserved' : 'sold',
                }),
                await (0, r(d[5]).invalidatePassengerTripsCache)(o),
                { data: c(n), error: null, localOnly: !0 }
              );
            }
            throw s(p);
          }
          const { data: f } = await _.from('market_purchases').select(a).eq('id', n.id).single();
          return (
            await (0, r(d[5]).invalidatePassengerTripsCache)(o),
            { data: c(f ?? n), error: null, localOnly: !1 }
          );
        } catch (t) {
          return { data: null, error: s(t) };
        }
      }),
      (e.subscribeToMarketListings = function (t) {
        const { supabase: a } = n();
        if (!a) return () => {};
        const l = a
          .channel('market-listings-live')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'market_listings' }, a =>
            t?.(a)
          )
          .subscribe();
        return () => a.removeChannel(l);
      }),
      (e.subscribeToMyMarketPurchases = function (t, a) {
        const { supabase: l } = n();
        if (!l || !t) return () => {};
        const s = l
          .channel(`market-purchases-${t}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'market_purchases', filter: `buyer_id=eq.${t}` },
            t => a?.(t)
          )
          .subscribe();
        return () => l.removeChannel(s);
      }));
    const t = '\n  *,\n  profiles:seller_id ( id, full_name, phone_number, trust_score )\n',
      a =
        '\n  *,\n  market_listings (\n    id, title, description, category, price, location, images, item_condition, status,\n    profiles:seller_id ( id, full_name, phone_number, trust_score )\n  )\n';
    function n() {
      const t = (0, r(d[0]).getSupabase)();
      return t ? { supabase: t, error: null } : { supabase: null, error: new Error('offline') };
    }
    function l(t) {
      return `local-${t}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    }
    function s(t) {
      const a = (0, r(d[1]).errorMessage)(t);
      return a.includes('insufficient_balance')
        ? new Error('insufficient_balance')
        : a.includes('cannot_buy_own_listing')
          ? new Error('cannot_buy_own_listing')
          : a.includes('listing_unavailable')
            ? new Error('listing_unavailable')
            : a.includes('not_authenticated')
              ? new Error('not_authenticated')
              : t instanceof Error
                ? t
                : new Error(a);
    }
    function o(t) {
      if (!t) return null;
      const a = t.profiles ?? t.seller ?? {},
        n = Array.isArray(t.images) ? t.images : [];
      return {
        id: t.id,
        sellerId: t.seller_id,
        sellerName: a.full_name ?? 'Seller',
        sellerPhone: a.phone_number ?? null,
        trustScore: a.trust_score ?? 72,
        title: t.title,
        description: t.description ?? '',
        category: t.category,
        price: Number(t.price ?? 0),
        location: t.location ?? null,
        images: n,
        condition: t.item_condition ?? t.condition ?? 'good',
        status: t.status,
        viewCount: t.view_count ?? 0,
        createdAt: t.created_at,
        localOnly: Boolean(t.localOnly),
      };
    }
    function c(t) {
      if (!t) return null;
      const a = o(t.market_listings ?? t.listing);
      return {
        id: t.id,
        listingId: t.listing_id,
        buyerId: t.buyer_id,
        sellerId: t.seller_id,
        purchasePrice: Number(t.purchase_price ?? 0),
        paymentMethod: t.payment_method ?? 'wallet',
        status: t.status,
        purchaseDate: t.purchase_date,
        listing: a,
        localOnly: Boolean(t.localOnly),
      };
    }
    function u(t, a = {}) {
      let n = [...t];
      if ((a.category && (n = n.filter(t => t.category === a.category)), a.search)) {
        const t = a.search.toLowerCase();
        n = n.filter(
          a =>
            a.title?.toLowerCase().includes(t) ||
            a.description?.toLowerCase().includes(t) ||
            a.location?.toLowerCase().includes(t)
        );
      }
      if (
        (null == a.maxPrice ||
          Number.isNaN(a.maxPrice) ||
          (n = n.filter(t => Number(t.price) <= a.maxPrice)),
        a.location)
      ) {
        const t = a.location.toLowerCase();
        n = n.filter(a => (a.location ?? '').toLowerCase().includes(t));
      }
      const l = a.sort ?? 'newest';
      'price_asc' === l
        ? n.sort((t, a) => Number(t.price) - Number(a.price))
        : 'price_desc' === l
          ? n.sort((t, a) => Number(a.price) - Number(t.price))
          : n.sort((t, a) => new Date(a.createdAt).getTime() - new Date(t.createdAt).getTime());
      const s = a.limit ?? 40;
      return n.slice(0, s);
    }
  },
  1651,
  [502, 557, 1652, 558, 1491, 755]
);
__d(
  function (g, r, i, _a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addLocalListing = async function (t) {
        const a = await o();
        return (a.unshift(t), await u(a), t);
      }),
      (e.addLocalPurchase = async function (t) {
        const a = await l();
        return (a.unshift(t), await f(a), t);
      }),
      (e.addToMarketCart = async function (t, a) {
        if (!t || !a?.id) return { data: null, error: new Error('missing_params') };
        const n = await y(t);
        if (n.some(t => t.id === a.id)) return { data: n, error: new Error('already_in_cart') };
        const s = [
          {
            id: a.id,
            title: a.title,
            price: a.price,
            sellerId: a.sellerId ?? a.seller_id,
            sellerName: a.sellerName,
            status: a.status ?? 'active',
            category: a.category,
            location: a.location,
            addedAt: new Date().toISOString(),
          },
          ...n,
        ];
        return (await w(t, s), { data: s, error: null });
      }),
      (e.clearMarketCart = async function (t) {
        if (!t) return;
        await a.default.removeItem(c(t));
      }),
      (e.getLocalActiveListings = async function () {
        return (await o()).filter(t => 'active' === t.status);
      }),
      (e.getLocalListingById = async function (t) {
        return (await o()).find(a => a.id === t) ?? null;
      }),
      (e.getLocalMyListings = async function (t) {
        return (await o())
          .filter(a => a.seller_id === t)
          .sort((t, a) => a.created_at.localeCompare(t.created_at));
      }),
      (e.getLocalMyPurchases = async function (t) {
        const a = await l(),
          n = await o();
        return a
          .filter(a => a.buyer_id === t)
          .map(t =>
            Object.assign({}, t, {
              market_listings: n.find(a => a.id === t.listing_id) ?? t.market_listings,
            })
          )
          .sort((t, a) => a.purchase_date.localeCompare(t.purchase_date));
      }),
      (e.getMarketCart = y),
      (e.removeFromMarketCart = async function (t, a) {
        if (!t || !a) return [];
        const n = (await y(t)).filter(t => t.id !== a);
        return (await w(t, n), n);
      }),
      (e.saveMarketCart = w),
      (e.updateLocalListing = async function (t, a) {
        const n = (await o()).map(n =>
          n.id === t ? Object.assign({}, n, a, { updated_at: new Date().toISOString() }) : n
        );
        return (await u(n), n.find(a => a.id === t) ?? null);
      }));
    var a = t(r(d[1]));
    const n = '@trotroos/local_market_listings',
      s = '@trotroos/local_market_purchases';
    function c(t) {
      return `@trotroos/local_market_cart:${t}`;
    }
    async function o() {
      try {
        const t = await a.default.getItem(n);
        return t ? JSON.parse(t) : [];
      } catch {
        return [];
      }
    }
    async function u(t) {
      await a.default.setItem(n, JSON.stringify(t));
    }
    async function l() {
      try {
        const t = await a.default.getItem(s);
        return t ? JSON.parse(t) : [];
      } catch {
        return [];
      }
    }
    async function f(t) {
      await a.default.setItem(s, JSON.stringify(t));
    }
    async function y(t) {
      if (!t) return [];
      try {
        const n = await a.default.getItem(c(t));
        return n ? JSON.parse(n) : [];
      } catch {
        return [];
      }
    }
    async function w(t, n) {
      return t ? (await a.default.setItem(c(t), JSON.stringify(n)), n) : [];
    }
  },
  1652,
  [1, 503]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.TripGuardianShield = function ({ onPress: e, size: r = 44 }) {
        const { colors: i } = (0, _r(d[14]).useTheme)(),
          o = (0, t.useMemo)(() => b(i), [i]);
        return (0, h.jsx)(n.default, {
          style: [o.shieldButton, { width: r, height: r, borderRadius: r / 2 }],
          onPress: e,
          accessibilityLabel: 'Trip Guardian safety',
          accessibilityRole: 'button',
          children: (0, h.jsx)(_r(d[13]).Ionicons, {
            name: 'shield-checkmark',
            size: 22,
            color: i.success,
          }),
        });
      }),
      (_e.default = function ({
        visible: e,
        onClose: c,
        role: x = 'passenger',
        trip: j = {},
        emergencyContact: v,
      }) {
        const { colors: S } = (0, _r(d[14]).useTheme)(),
          C = (0, t.useMemo)(() => b(S), [S]),
          T = (0, _r(d[15]).useSafeAreaInsets)(),
          w = (0, _r(d[16]).useNavigation)(),
          { user: k, profile: P } = (0, _r(d[17]).useAuth)(),
          { prefs: R } = (0, _r(d[18]).useUserPreferences)(k?.id),
          [I, E] = (0, t.useState)(!1),
          F = R.safetyPreferences ?? {},
          O = R.privacy ?? {},
          _ = (0, _r(d[19]).buildRideVerificationPin)(j),
          B = !1 !== F.verifyRidePin,
          M = !1 !== F.rideCheck,
          z = (0, _r(d[20]).canShareTripStatus)(O),
          L = _r(d[21])
            .SAFETY_PREFERENCE_ITEMS.filter(e => !1 !== F[e.key])
            .map(e => e.title),
          A = !1 !== F.nightSafetyReminders && (0, _r(d[19]).isNightTrip)(),
          D = R.emergencyContact?.phone
            ? (0, _r(d[22]).personalContactToService)(R.emergencyContact)
            : P?.emergency_contact_phone
              ? (0, _r(d[22]).personalContactToService)({
                  name: P.emergency_contact_name,
                  phone: P.emergency_contact_phone,
                })
              : null,
          N = [
            ..._r(d[23]).EMERGENCY_SERVICES,
            ...(D ? [D] : []),
            Object.assign({}, _r(d[23]).TROTROOS_SUPPORT, { id: 'support' }),
          ],
          G = 'driver' === x ? 'Passengers' : 'Driver',
          W =
            'driver' === x
              ? (j.passengerNames ?? j.passengerName ?? 'On board')
              : (j.driverName ?? 'Your driver'),
          H = async () => {
            if (z)
              try {
                const e = 'trotroride' === j.tripType ? 'trotroride_rides' : 'trips',
                  { message: t } = await (0,
                  _r(d[25], '../../services/tripGuardian').prepareTripShare)(j, { table: e });
                await l.default.share({
                  message: t || (0, _r(d[25], '../../services/tripGuardian').buildShareMessage)(j),
                  title: 'Share live trip',
                });
              } catch {
                r.default.alert('Could not share', 'Try again in a moment.');
              }
            else
              r.default.alert(
                'Trip sharing off',
                'Turn on \u201cAllow trip status sharing\u201d in Profile \u2192 Privacy to share your live trip.'
              );
          };
        return (0, h.jsx)(o.default, {
          visible: e,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: c,
          children: (0, h.jsxs)(p.default, {
            style: C.overlay,
            children: [
              (0, h.jsx)(n.default, { style: C.backdrop, onPress: c }),
              (0, h.jsxs)(p.default, {
                style: [C.sheet, { paddingBottom: T.bottom + _r(d[26]).spacing.lg }],
                children: [
                  (0, h.jsx)(p.default, { style: C.handle }),
                  (0, h.jsxs)(p.default, {
                    style: C.headerRow,
                    children: [
                      (0, h.jsx)(_r(d[13]).Ionicons, {
                        name: 'shield-checkmark',
                        size: 28,
                        color: S.success,
                      }),
                      (0, h.jsxs)(p.default, {
                        style: C.headerText,
                        children: [
                          (0, h.jsx)(u.default, { style: C.title, children: 'Trip Guardian' }),
                          (0, h.jsx)(u.default, {
                            style: C.subtitle,
                            children: 'Safety tools for your ride',
                          }),
                        ],
                      }),
                      (0, h.jsx)(n.default, {
                        onPress: c,
                        hitSlop: 12,
                        children: (0, h.jsx)(_r(d[13]).Ionicons, {
                          name: 'close',
                          size: 24,
                          color: S.textMuted,
                        }),
                      }),
                    ],
                  }),
                  (0, h.jsxs)(s.default, {
                    showsVerticalScrollIndicator: !1,
                    children: [
                      (0, h.jsxs)(p.default, {
                        style: C.tripCard,
                        children: [
                          (0, h.jsx)(u.default, {
                            style: C.tripRoute,
                            children: j.route ?? 'Active ride',
                          }),
                          (0, h.jsxs)(u.default, { style: C.tripMeta, children: [G, ': ', W] }),
                          j.vehicleModel || j.plateNumber
                            ? (0, h.jsx)(u.default, {
                                style: C.tripMeta,
                                children: [j.vehicleModel, j.plateNumber]
                                  .filter(Boolean)
                                  .join(' \xb7 '),
                              })
                            : null,
                          (0, h.jsx)(u.default, {
                            style: C.tripEta,
                            children:
                              null != j.etaMin
                                ? `Estimated pickup in ~${j.etaMin} min`
                                : 'Pickup estimate unavailable',
                          }),
                        ],
                      }),
                      B
                        ? (0, h.jsxs)(p.default, {
                            style: C.pinCard,
                            children: [
                              (0, h.jsxs)(p.default, {
                                style: C.pinTextCol,
                                children: [
                                  (0, h.jsx)(u.default, {
                                    style: C.pinLabel,
                                    children: 'Verify ride PIN',
                                  }),
                                  (0, h.jsx)(u.default, {
                                    style: C.pinHint,
                                    children:
                                      'Confirm this with your driver or mate before moving.',
                                  }),
                                ],
                              }),
                              (0, h.jsx)(u.default, { style: C.pinCode, children: _ }),
                            ],
                          })
                        : null,
                      A
                        ? (0, h.jsxs)(p.default, {
                            style: C.reminderCard,
                            children: [
                              (0, h.jsx)(_r(d[13]).Ionicons, {
                                name: 'moon',
                                size: 18,
                                color: S.warning,
                              }),
                              (0, h.jsx)(u.default, {
                                style: C.reminderText,
                                children:
                                  'Night trip reminder: confirm vehicle details, share your route, and keep SOS close.',
                              }),
                            ],
                          })
                        : null,
                      L.length
                        ? (0, h.jsxs)(p.default, {
                            style: C.toolsCard,
                            children: [
                              (0, h.jsx)(u.default, {
                                style: C.toolsTitle,
                                children: 'Active safety preferences',
                              }),
                              (0, h.jsx)(u.default, {
                                style: C.toolsText,
                                children: L.join(' \xb7 '),
                              }),
                            ],
                          })
                        : null,
                      (0, h.jsx)(y, {
                        colors: S,
                        styles: C,
                        icon: 'map-outline',
                        label: 'Open live map',
                        subtitle: 'View vehicle position on the route map in TrotroOS',
                        onPress: () => {
                          (c?.(),
                            w.navigate(_r(d[24]).ROUTES.TRACK_TRIP, {
                              tripId: j.tripId ?? j.rideId ?? j.id,
                              lat: j.latitude,
                              lng: j.longitude,
                              token: j.trackShareToken ?? j.track_share_token ?? null,
                            }));
                        },
                      }),
                      (0, h.jsx)(y, {
                        colors: S,
                        styles: C,
                        icon: 'checkmark-circle-outline',
                        label: 'RideCheck \u2014 I\u2019m OK',
                        subtitle: M
                          ? 'Confirm you\u2019re safe mid-trip'
                          : 'Enable RideCheck in Safety preferences',
                        onPress: () => {
                          r.default.alert(
                            'RideCheck',
                            M
                              ? 'You\u2019re checked in as OK. We\u2019ll nudge you again if the trip runs long or it\u2019s late at night.'
                              : 'RideCheck is off in Safety preferences. Enable it to get mid-trip safety check-ins.'
                          );
                        },
                      }),
                      (0, h.jsx)(y, {
                        colors: S,
                        styles: C,
                        icon: 'logo-whatsapp',
                        label: 'Share on WhatsApp',
                        subtitle: z
                          ? 'Send live trip details with GPS link via WhatsApp'
                          : 'Enable trip sharing in Privacy settings',
                        onPress: async () => {
                          if (z) {
                            try {
                              const e = 'trotroride' === j.tripType ? 'trotroride_rides' : 'trips',
                                { message: t } = await (0,
                                _r(d[25], '../../services/tripGuardian').prepareTripShare)(j, {
                                  table: e,
                                }),
                                r = `whatsapp://send?text=${encodeURIComponent(t || (0, _r(d[25], '../../services/tripGuardian').buildShareMessage)(j))}`;
                              if (await i.default.canOpenURL(r))
                                return void (await i.default.openURL(r));
                            } catch {}
                            H();
                          } else
                            r.default.alert(
                              'Trip sharing off',
                              'Turn on \u201cAllow trip status sharing\u201d in Profile \u2192 Privacy to share your live trip.'
                            );
                        },
                      }),
                      (0, h.jsx)(y, {
                        colors: S,
                        styles: C,
                        icon: 'share-social-outline',
                        label: 'Share trip details',
                        subtitle: z
                          ? 'Send a link with live GPS to someone you trust'
                          : 'Enable trip sharing in Privacy settings',
                        onPress: H,
                      }),
                      (0, h.jsxs)(p.default, {
                        style: C.emergencySection,
                        children: [
                          (0, h.jsx)(u.default, {
                            style: C.sectionLabel,
                            children: 'Emergency contacts',
                          }),
                          (0, h.jsxs)(n.default, {
                            style: C.sosButton,
                            onPress: () => {
                              return (
                                (e = _r(d[23]).EMERGENCY_SERVICES[0]),
                                void (0, f.dialNumber)(e?.phone ?? '112', e?.name ?? 'Emergency')
                              );
                              var e;
                            },
                            children: [
                              (0, h.jsx)(_r(d[13]).Ionicons, {
                                name: 'call',
                                size: 28,
                                color: '#FFFFFF',
                              }),
                              (0, h.jsx)(u.default, { style: C.sosText, children: 'SOS \xb7 112' }),
                            ],
                          }),
                          (0, h.jsx)(u.default, {
                            style: C.sosHint,
                            children: 'Tap for national emergency, or choose below',
                          }),
                          (0, h.jsx)(f.default, { services: N, compact: !0 }),
                        ],
                      }),
                      (0, h.jsx)(y, {
                        colors: S,
                        styles: C,
                        icon: 'chatbubble-ellipses-outline',
                        label: 'I feel unsafe',
                        subtitle: 'Discreetly alert support \u2014 no loud alarm',
                        onPress: () => {
                          r.default.alert(
                            'Trip Guardian',
                            'Send a discreet alert to our safety team? Your driver will not be notified.',
                            [
                              { text: 'Cancel', style: 'cancel' },
                              {
                                text: 'Send alert',
                                style: 'destructive',
                                onPress: async () => {
                                  (E(!0),
                                    await (0, _r(d[25]).reportUnsafeTrip)({
                                      rideId: j.rideId,
                                      tripId: j.tripId ?? j.id,
                                      userId: k?.id,
                                      role: x,
                                      latitude: j.latitude,
                                      longitude: j.longitude,
                                      route: j.route,
                                    }),
                                    E(!1),
                                    r.default.alert(
                                      'Alert sent',
                                      'Our safety team has been notified. Stay on the line with us if you need help.'
                                    ),
                                    c?.());
                                },
                              },
                            ]
                          );
                        },
                        destructive: !0,
                      }),
                      I
                        ? (0, h.jsx)(u.default, {
                            style: C.reporting,
                            children: 'Sending alert...',
                          })
                        : null,
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }));
    var t = _r(d[1]),
      r = e(_r(d[2])),
      i = e(_r(d[3])),
      o = e(_r(d[4])),
      n = e(_r(d[5])),
      s = e(_r(d[6])),
      l = e(_r(d[7])),
      c = e(_r(d[8])),
      u = e(_r(d[9])),
      p = e(_r(d[10])),
      f = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            i = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var o,
            n,
            s = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return s;
          if ((o = t ? i : r)) {
            if (o.has(e)) return o.get(e);
            o.set(e, s);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((n = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (n.get || n.set)
                ? o(s, t, n)
                : (s[t] = e[t]));
          return s;
        })(e, t);
      })(_r(d[11])),
      h = _r(d[12]);
    function y({
      icon: e,
      label: t,
      subtitle: r,
      onPress: i,
      destructive: o = !1,
      colors: s,
      styles: l,
    }) {
      return (0, h.jsxs)(n.default, {
        style: [l.row, o && l.rowDestructive],
        onPress: i,
        children: [
          (0, h.jsx)(p.default, {
            style: [l.rowIcon, o && l.rowIconDestructive],
            children: (0, h.jsx)(_r(d[13]).Ionicons, {
              name: e,
              size: 22,
              color: o ? s.destructive : s.primaryLight,
            }),
          }),
          (0, h.jsxs)(p.default, {
            style: l.rowText,
            children: [
              (0, h.jsx)(u.default, {
                style: [l.rowLabel, o && l.rowLabelDestructive],
                children: t,
              }),
              r ? (0, h.jsx)(u.default, { style: l.rowSubtitle, children: r }) : null,
            ],
          }),
          (0, h.jsx)(_r(d[13]).Ionicons, { name: 'chevron-forward', size: 18, color: s.textMuted }),
        ],
      });
    }
    const b = e =>
      c.default.create({
        overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: e.overlay },
        backdrop: { flex: 1 },
        sheet: {
          backgroundColor: e.surfaceElevated,
          borderTopLeftRadius: _r(d[26]).radius.xl,
          borderTopRightRadius: _r(d[26]).radius.xl,
          borderWidth: 1,
          borderColor: e.borderStrong,
          paddingHorizontal: _r(d[26]).spacing.lg,
          paddingTop: _r(d[26]).spacing.md,
          maxHeight: '92%',
        },
        handle: {
          alignSelf: 'center',
          width: 40,
          height: 4,
          borderRadius: 2,
          backgroundColor: e.borderStrong,
          marginBottom: _r(d[26]).spacing.md,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: _r(d[26]).spacing.lg,
        },
        headerText: { flex: 1, marginLeft: _r(d[26]).spacing.md },
        title: { fontFamily: _r(d[26]).fontFamily.bold, fontSize: 20, color: e.textPrimary },
        subtitle: Object.assign({}, _r(d[26]).typography.caption),
        tripCard: {
          backgroundColor: e.surface,
          borderRadius: _r(d[26]).radius.lg,
          padding: _r(d[26]).spacing.md,
          marginBottom: _r(d[26]).spacing.lg,
          borderWidth: 1,
          borderColor: e.border,
        },
        tripRoute: {
          fontFamily: _r(d[26]).fontFamily.semiBold,
          fontSize: 16,
          color: e.textPrimary,
          marginBottom: _r(d[26]).spacing.xs,
        },
        tripMeta: Object.assign({}, _r(d[26]).typography.caption, { marginBottom: 2 }),
        tripEta: {
          fontFamily: _r(d[26]).fontFamily.medium,
          fontSize: 14,
          color: e.primaryLight,
          marginTop: _r(d[26]).spacing.sm,
        },
        pinCard: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: _r(d[26]).spacing.md,
          borderRadius: _r(d[26]).radius.md,
          borderWidth: 1,
          borderColor: e.primaryLight,
          backgroundColor: e.surfaceElevated,
          padding: _r(d[26]).spacing.md,
          marginBottom: _r(d[26]).spacing.sm,
        },
        pinTextCol: { flex: 1 },
        pinLabel: {
          fontFamily: _r(d[26]).fontFamily.bold,
          fontSize: 14,
          color: e.textPrimary,
          marginBottom: 2,
        },
        pinHint: Object.assign({}, _r(d[26]).typography.caption, { lineHeight: 17 }),
        pinCode: {
          fontFamily: _r(d[26]).fontFamily.bold,
          fontSize: 24,
          color: e.primaryLight,
          letterSpacing: 2,
        },
        reminderCard: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: _r(d[26]).spacing.sm,
          borderRadius: _r(d[26]).radius.md,
          backgroundColor: e.surfaceElevated,
          padding: _r(d[26]).spacing.sm,
          marginBottom: _r(d[26]).spacing.sm,
        },
        reminderText: Object.assign({}, _r(d[26]).typography.caption, { flex: 1, lineHeight: 17 }),
        toolsCard: {
          borderRadius: _r(d[26]).radius.md,
          backgroundColor: e.surface,
          borderWidth: 1,
          borderColor: e.border,
          padding: _r(d[26]).spacing.sm,
          marginBottom: _r(d[26]).spacing.sm,
        },
        toolsTitle: {
          fontFamily: _r(d[26]).fontFamily.semiBold,
          fontSize: 12,
          color: e.textPrimary,
          marginBottom: 2,
        },
        toolsText: Object.assign({}, _r(d[26]).typography.caption, { lineHeight: 17 }),
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: e.surface,
          borderRadius: _r(d[26]).radius.md,
          padding: _r(d[26]).spacing.md,
          marginBottom: _r(d[26]).spacing.sm,
          borderWidth: 1,
          borderColor: e.border,
          minHeight: 56,
        },
        rowDestructive: { borderColor: 'rgba(0, 0, 0, 0.25)' },
        rowIcon: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: _r(d[26]).spacing.md,
        },
        rowIconDestructive: { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
        rowText: { flex: 1 },
        rowLabel: { fontFamily: _r(d[26]).fontFamily.semiBold, fontSize: 15, color: e.textPrimary },
        rowLabelDestructive: { color: e.destructive },
        rowSubtitle: Object.assign({}, _r(d[26]).typography.caption, {
          marginTop: 2,
          lineHeight: 16,
        }),
        emergencySection: { marginVertical: _r(d[26]).spacing.lg },
        sectionLabel: Object.assign({}, _r(d[26]).typography.label, {
          alignSelf: 'flex-start',
          marginBottom: _r(d[26]).spacing.md,
        }),
        sosButton: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: e.destructive,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: _r(d[26]).spacing.sm,
          alignSelf: 'center',
        },
        sosText: {
          fontFamily: _r(d[26]).fontFamily.bold,
          fontSize: 14,
          color: '#FFFFFF',
          marginTop: 2,
        },
        sosHint: Object.assign({}, _r(d[26]).typography.caption, {
          marginBottom: _r(d[26]).spacing.md,
          textAlign: 'center',
        }),
        reporting: Object.assign({}, _r(d[26]).typography.caption, {
          textAlign: 'center',
          color: e.textMuted,
          marginTop: _r(d[26]).spacing.sm,
        }),
        shieldButton: {
          backgroundColor: e.surfaceElevated,
          borderWidth: 1,
          borderColor: e.borderStrong,
          alignItems: 'center',
          justifyContent: 'center',
        },
      });
  },
  1653,
  [
    1, 5, 678, 667, 948, 326, 106, 1517, 26, 161, 19, 1654, 183, 578, 381, 572, 382, 501, 1614,
    1655, 1518, 1656, 1657, 1514, 682, 1519, 377,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ services: t, compact: n = !1 }) {
        const { colors: s } = (0, r(d[9]).useTheme)(),
          p = h(s);
        return (0, u.jsx)(c.default, {
          style: p.list,
          children: t.map(t =>
            (0, u.jsxs)(
              o.default,
              {
                style: [p.row, n && p.rowCompact],
                onPress: () => f(t.phone, t.name),
                children: [
                  (0, u.jsx)(c.default, {
                    style: [p.iconWrap, t.destructive && p.iconDestructive],
                    children: (0, u.jsx)(r(d[10]).Ionicons, {
                      name: t.icon ?? 'call-outline',
                      size: 20,
                      color: t.destructive ? s.destructive : s.primary,
                    }),
                  }),
                  (0, u.jsxs)(c.default, {
                    style: p.textWrap,
                    children: [
                      (0, u.jsx)(l.default, { style: p.name, children: t.name }),
                      !n && t.description
                        ? (0, u.jsx)(l.default, { style: p.desc, children: t.description })
                        : null,
                    ],
                  }),
                  (0, u.jsx)(l.default, { style: p.phone, children: t.displayPhone ?? t.phone }),
                ],
              },
              t.id
            )
          ),
        });
      }),
      (e.dialNumber = f));
    var n = t(r(d[1])),
      o = t(r(d[2])),
      l = t(r(d[3])),
      c = t(r(d[4])),
      s = t(r(d[5])),
      p = t(r(d[6])),
      u = r(d[7]);
    function f(t, o) {
      const l = String(t).replace(/\s/g, '');
      l.includes('@')
        ? n.default
            .openURL(`mailto:${l}?subject=${encodeURIComponent('TrotroOS Emergency')}`)
            .catch(() => {
              p.default.alert('Cannot open email', 'Unable to open your mail app.');
            })
        : n.default.openURL(`tel:${l}`).catch(() => {
            p.default.alert('Cannot dial', `Unable to call ${o ?? t}.`);
          });
    }
    const h = t =>
      s.default.create({
        list: { gap: r(d[8]).spacing.sm },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: t.surface,
          borderRadius: r(d[8]).radius.md,
          padding: r(d[8]).spacing.md,
          borderWidth: 1,
          borderColor: t.border,
          minHeight: 56,
        },
        rowCompact: { paddingVertical: r(d[8]).spacing.sm, minHeight: 48 },
        iconWrap: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: t.primaryAlpha12 ?? 'rgba(0, 0, 0, 0.08)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: r(d[8]).spacing.md,
        },
        iconDestructive: { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
        textWrap: { flex: 1, paddingRight: r(d[8]).spacing.sm },
        name: { fontFamily: r(d[8]).fontFamily.semiBold, fontSize: 15, color: t.textPrimary },
        desc: Object.assign({}, r(d[8]).typography.caption, { marginTop: 2, color: t.textMuted }),
        phone: { fontFamily: r(d[8]).fontFamily.medium, fontSize: 14, color: t.primary },
      });
  },
  1654,
  [1, 667, 326, 161, 19, 26, 678, 183, 377, 381, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildRideVerificationPin = function (t = {}) {
        const n = String(t.rideId ?? t.tripId ?? t.id ?? t.route ?? 'trotroos');
        let o = 0;
        for (let t = 0; t < n.length; t += 1) o = (31 * o + n.charCodeAt(t)) % 1e4;
        return String(o).padStart(4, '0');
      }),
      (e.isNightTrip = function (t = new Date()) {
        const n = t.getHours();
        return n >= 21 || n < 5;
      }));
  },
  1655,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.SAFETY_PREFERENCE_ITEMS = e.SAFETY_PREFERENCES_INTRO = void 0),
      (e.countEnabledSafetyPreferences = function (o = {}) {
        return t.reduce((t, n) => (!1 !== o[n.key] ? t + 1 : t), 0);
      }));
    e.SAFETY_PREFERENCES_INTRO =
      'Choose which safety tools TrotroOS should prepare before and during trips. These mirror Uber-style Safety Preferences, tuned for Ghana emergency support and shared trotro routes.';
    const t = (e.SAFETY_PREFERENCE_ITEMS = [
      {
        key: 'rideCheck',
        icon: 'pulse-outline',
        title: 'RideCheck safety prompts',
        subtitle: 'Show check-ins for long stops, unusual route changes, or early trip endings.',
        example: 'RideCheck \xb7 You have been stopped for a while. Is everything OK?',
      },
      {
        key: 'verifyRidePin',
        icon: 'keypad-outline',
        title: 'Verify ride with PIN',
        subtitle: 'Generate a 4-digit PIN you can confirm with your driver or mate before moving.',
        example: 'Your ride PIN is 4821. Confirm it before the trip starts.',
      },
      {
        key: 'autoShareTrip',
        icon: 'share-social-outline',
        title: 'Share trip reminder',
        subtitle: 'Trip Guardian reminds you to share live trip status with a trusted contact.',
        example: 'Share your live route with your emergency contact or WhatsApp.',
      },
      {
        key: 'audioRecordingConsent',
        icon: 'mic-outline',
        title: 'Audio recording consent',
        subtitle: 'Keep a visible consent setting for future encrypted incident recording flows.',
        example: 'Recording is consent-based and only used for safety reports.',
      },
      {
        key: 'nightSafetyReminders',
        icon: 'moon-outline',
        title: 'Night trip reminders',
        subtitle: 'Highlight PIN, sharing, and emergency contact actions after dark.',
        example: 'Night ride \xb7 Confirm vehicle details and share your route.',
      },
    ]);
  },
  1656,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    function n(n) {
      const t = String(n ?? '').replace(/\D/g, '');
      return t
        ? t.startsWith('233') && t.length >= 12
          ? `+${t}`
          : t.startsWith('0') && 10 === t.length
            ? `+233${t.slice(1)}`
            : 9 === t.length
              ? `+233${t}`
              : String(n).trim().startsWith('+') || t.length >= 9
                ? `+${t}`
                : String(n).trim()
        : '';
    }
    function t(t) {
      const o = n(t);
      if (!o.startsWith('+233') || 13 !== o.length) return String(t ?? '').trim();
      const s = `0${o.slice(4)}`;
      return `${s.slice(0, 3)} ${s.slice(3, 6)} ${s.slice(6)}`;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildWhatsAppNotifyUrl = function (t, o = null) {
        const s = (o ? n(o) : '').replace(/\D/g, '');
        if (s) return `whatsapp://send?phone=${s}&text=${encodeURIComponent(t)}`;
        return (0, r(d[0]).buildWhatsAppUrl)(t);
      }),
      (e.formatPhoneDisplay = t),
      (e.isValidGhanaPhone = function (t) {
        const o = n(t);
        return /^\+233[235]\d{8}$/.test(o);
      }),
      (e.normalizeGhanaPhone = n),
      (e.personalContactToService = function (o) {
        if (!o?.phone?.trim()) return null;
        const s = n(o.phone);
        return {
          id: 'personal',
          name: o.name?.trim() || 'Personal contact',
          phone: s,
          displayPhone: t(o.phone),
          icon: 'person-circle-outline',
          description: o.relationship?.trim() || 'Your saved emergency contact',
        };
      }));
  },
  1657,
  [1658]
);
__d(
  function (g, r, i, a, m, e, d) {
    function n(n) {
      const t = encodeURIComponent(n ?? 'TROTRO');
      return `${r(d[0]).PLAY_STORE_LISTED ? r(d[1]).INVITE_BASE_URL : (0, r(d[0]).getInviteBaseUrl)()}?ref=${t}`;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildInviteLink = n),
      (e.buildInviteMessage = function ({
        referralCode: t,
        inviterName: o = null,
        channel: l = 'default',
      }) {
        const u = t ?? 'TROTRO',
          s = n(u),
          p = (0, r(d[1]).buildInviteTagline)(o),
          c = r(d[0]).PLAY_STORE_LISTED
            ? `Get the app: ${(0, r(d[0]).getPlayStoreUrl)()}`
            : 'Sign up on the web app at the link below (Android app coming to Google Play soon).',
          f = [
            p,
            '',
            '\u2713 Reserve trotro seats before the mate arrives',
            '\u2713 Shared TrotroRide \u2014 cheaper than Bolt/Uber',
            '\u2713 MoMo, GhQR, or pay on board',
            '\u2713 Trip Guardian safety on every ride',
            '',
            c,
            `Use my code: ${u}`,
            s,
            '',
            `\u2014 ${r(d[2]).APP_NAME} \xb7 Kumasi`,
          ].join('\n');
        if ('whatsapp' === l) return f;
        if ('sms' === l) return `${p} Code: ${u}. ${s}`;
        return f;
      }),
      (e.buildSmsUrl = function (n) {
        return `sms:?body=${encodeURIComponent(n)}`;
      }),
      (e.buildWhatsAppUrl = function (n) {
        return `whatsapp://send?text=${encodeURIComponent(n)}`;
      }),
      (e.getReferralCode = function (n, t = null) {
        const o = t?.referral_code ?? t?.referralCode;
        if (o && String(o).trim()) return String(o).trim().toUpperCase();
        if (!n) return 'TROTRO';
        return String(n).replace(/-/g, '').toUpperCase().slice(0, 6).padEnd(6, '0');
      }));
  },
  1658,
  [668, 1659, 508]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.INVITE_STEPS = e.INVITE_SHARE_CHANNELS = e.INVITE_PERKS = e.INVITE_BASE_URL = void 0),
      (e.buildInviteTagline = function (o) {
        return `${o?.trim() ? `${o.trim()} invited you` : 'A friend invited you'} to ${r(d[0]).APP_NAME} \u2014 reserve trotro seats & shared rides in Kumasi.`;
      }));
    ((e.INVITE_BASE_URL = 'https://trotroos.app/invite'),
      (e.INVITE_PERKS = [
        {
          id: 'cheaper',
          icon: 'cash-outline',
          title: 'Save together on Kumasi routes',
          detail:
            'Friends get trotro seat reservation and shared TrotroRide \u2014 often 50\u201370% less than Bolt/Uber on the same corridors.',
        },
        {
          id: 'queue',
          icon: 'people-outline',
          title: 'Skip the station guesswork',
          detail:
            'They can join the digital mate queue and get invited when a seat opens \u2014 no more shouting at the roadside.',
        },
        {
          id: 'safety',
          icon: 'shield-checkmark-outline',
          title: 'Trip Guardian for every ride',
          detail:
            "Share live trips on WhatsApp, SOS dial, and trust scores \u2014 safety tools ride-hail apps don't offer on trotro.",
        },
        {
          id: 'momo',
          icon: 'phone-portrait-outline',
          title: 'Pay the Ghana way',
          detail: 'MoMo, GhQR, or pay on board. No card required.',
        },
      ]),
      (e.INVITE_STEPS = [
        {
          step: '1',
          title: 'Share your code or link',
          detail: 'Send via WhatsApp, SMS, or any app your friends use.',
        },
        {
          step: '2',
          title: 'They sign up on TrotroOS',
          detail:
            'Your referral code links their account at registration \u2014 on the web app today, Android on Google Play when we launch.',
        },
        {
          step: '3',
          title: 'Ride smarter together',
          detail: 'Book corridors like Tech Junction \u2192 Ayeduase and compare fares instantly.',
        },
      ]),
      (e.INVITE_SHARE_CHANNELS = [
        { id: 'whatsapp', label: 'WhatsApp', icon: 'logo-whatsapp', color: '#000000' },
        { id: 'share', label: 'More apps', icon: 'share-social-outline', color: null },
        { id: 'copy', label: 'Copy link', icon: 'link-outline', color: null },
        { id: 'code', label: 'Copy code', icon: 'copy-outline', color: null },
      ]));
  },
  1659,
  [508]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        title: l = 'Rate your trip',
        subtitle: n,
        onClose: b,
        onSubmit: x,
      }) {
        const { colors: h } = (0, r(d[9]).useTheme)(),
          j = (0, s.useMemo)(() => p(h), [h]),
          [S, v] = (0, s.useState)(0),
          [C, P] = (0, s.useState)(!1);
        return (0, f.jsxs)(u.default, {
          visible: t,
          title: l,
          subtitle: n,
          onClose: () => {
            C || (v(0), b?.());
          },
          confirmTitle: S > 0 ? (C ? 'Submitting\u2026' : `Submit ${S} stars`) : null,
          confirmLoading: C,
          onConfirm:
            S > 0 && !C
              ? async () => {
                  if (!(S < 1 || C)) {
                    P(!0);
                    try {
                      (await x?.(S), v(0), b?.());
                    } finally {
                      P(!1);
                    }
                  }
                }
              : void 0,
          children: [
            (0, f.jsx)(c.default, {
              style: j.stars,
              children: [1, 2, 3, 4, 5].map(t =>
                (0, f.jsx)(y, { filled: t <= S, onPress: () => !C && v(t), colors: h }, t)
              ),
            }),
            (0, f.jsx)(o.default, {
              style: j.hint,
              children: 0 === S ? 'Tap a star to rate' : `You selected ${S} out of 5`,
            }),
          ],
        });
      }));
    var s = r(d[1]),
      l = t(r(d[2])),
      n = t(r(d[3])),
      o = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = r(d[7]);
    function y({ filled: t, onPress: s, colors: n }) {
      return (0, f.jsx)(l.default, {
        onPress: s,
        hitSlop: 8,
        accessibilityLabel: `Rate ${t ? 'filled' : 'empty'} star`,
        children: (0, f.jsx)(r(d[8]).Ionicons, {
          name: t ? 'star' : 'star-outline',
          size: 36,
          color: t ? n.starFilled : n.starEmpty,
        }),
      });
    }
    const p = t =>
      n.default.create({
        stars: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: r(d[10]).spacing.sm,
          marginVertical: r(d[10]).spacing.lg,
        },
        hint: {
          fontFamily: r(d[10]).fontFamily.medium,
          fontSize: 14,
          color: t.textMuted,
          textAlign: 'center',
          marginBottom: r(d[10]).spacing.md,
        },
      });
  },
  1660,
  [1, 5, 326, 26, 161, 19, 1515, 183, 578, 381, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        trip: t,
        driverLocations: s = [],
        myLocation: b = null,
        height: j = 200,
      }) {
        const { colors: L } = (0, r(d[13]).useTheme)(),
          P = (0, o.useMemo)(() => k(L), [L]),
          w = !(
            'trotroride' !== t?.tripType ||
            ('request' !== t.bookingKind && 'active_ride' !== t.bookingKind) ||
            ('accepted' !== t.status && 'active_ride' !== t.bookingKind)
          ),
          S = (0, o.useMemo)(() => (0, r(d[14]).findDriverLocation)(t, s), [t, s]),
          B = (0, o.useMemo)(
            () =>
              (0, r(d[15]).resolvePassengerPickupCoords)({
                pickupPoint: t?.pickupPoint ?? t?.origin,
                originLabel: t?.origin ?? t?.pickupPoint,
                myLocation: b,
              }),
            [t, b]
          ),
          C = (0, o.useMemo)(() => {
            const o = (0, r(d[15]).resolveLocationCoords)(t?.destination ?? t?.dropoff);
            return (
              o ||
              (null != t?.dropoffLat && null != t?.dropoffLng
                ? { latitude: t.dropoffLat, longitude: t.dropoffLng }
                : null)
            );
          }, [t]),
          _ = (0, o.useMemo)(
            () =>
              (0, r(d[14]).resolvePickupEta)({
                trip: t,
                driverLocations: s,
                myLocation: b,
                pickupPoint: t?.pickupPoint,
                originLabel: t?.origin ?? t?.pickupPoint,
              }),
            [t, s, b]
          ),
          D = (0, o.useMemo)(() => {
            const o = [];
            return (
              null != S?.latitude &&
                o.push({ latitude: S.latitude, longitude: S.longitude, type: 'driver' }),
              B && o.push(Object.assign({}, B, { type: 'pickup' })),
              'in_ride' === t?.passengerStatus &&
                C &&
                o.push(Object.assign({}, C, { type: 'dropoff' })),
              o
            );
          }, [S, B, C, t?.passengerStatus]),
          { coordinates: z } = (0, x.default)(D.length >= 2 ? D : [], { corridor: t?.route });
        if (!w) return null;
        const F = null != S?.latitude,
          T = null != B?.latitude,
          M = 'in_ride' === t?.passengerStatus && C,
          R = M ? C : B,
          H = M ? 'Navigate to destination' : 'Navigate to pickup',
          N =
            'request' === t.bookingKind && 'accepted' === t.status
              ? 'Driver accepted \xb7 heading to pickup'
              : 'pending_pickup' === t.passengerStatus
                ? 'Driver en route to you'
                : 'arrived' === t.passengerStatus
                  ? 'Driver has arrived \xb7 meet at pickup'
                  : 'in_ride' === t.passengerStatus
                    ? 'On the way to your destination'
                    : 'Live tracking';
        return (0, v.jsxs)(c.default, {
          style: P.wrap,
          children: [
            (0, v.jsxs)(c.default, {
              style: P.header,
              children: [
                (0, v.jsxs)(c.default, {
                  style: P.titleRow,
                  children: [
                    (0, v.jsx)(u.default, { style: P.title, children: 'Live ride tracking' }),
                    (0, v.jsx)(h.default, { active: _.isLive || F, variant: 'inline' }),
                  ],
                }),
                (0, v.jsx)(u.default, { style: P.statusHint, children: N }),
                (0, v.jsx)(y.default, {
                  label: _.shortLabel,
                  isLive: _.isLive,
                  precise: _.precise,
                  size: 'default',
                }),
                R
                  ? (0, v.jsxs)(l.default, {
                      style: P.navigateBtn,
                      onPress: () => {
                        const t = (0, r(d[16]).getExternalNavigationUrl)(R?.latitude, R?.longitude);
                        t && n.default.openURL(t);
                      },
                      children: [
                        (0, v.jsx)(r(d[17]).Ionicons, {
                          name: 'navigate',
                          size: 15,
                          color: L.onPrimary,
                        }),
                        (0, v.jsx)(u.default, { style: P.navigateText, children: H }),
                      ],
                    })
                  : null,
              ],
            }),
            (0, v.jsxs)(c.default, {
              style: [P.mapBox, { height: j }],
              children: [
                (0, v.jsxs)(p.default, {
                  style: P.map,
                  followCoordinate: F ? { latitude: S.latitude, longitude: S.longitude } : null,
                  showsUserLocation: Boolean(b),
                  children: [
                    z.length >= 2
                      ? (0, v.jsx)(r(d[18]).Polyline, {
                          coordinates: z,
                          strokeColor: L.primary,
                          strokeWidth: 4,
                        })
                      : null,
                    T
                      ? (0, v.jsx)(f.default, { coordinate: B, type: 'passenger', title: 'Pickup' })
                      : null,
                    M
                      ? (0, v.jsx)(f.default, {
                          coordinate: C,
                          type: 'passenger',
                          title: 'Drop-off',
                        })
                      : null,
                    F
                      ? (0, v.jsx)(f.default, {
                          coordinate: { latitude: S.latitude, longitude: S.longitude },
                          heading: S.heading,
                          type: 'trotroride',
                          title: t.operatorName ?? 'Driver',
                          description: t.plateNumber ?? t.route,
                        })
                      : null,
                  ],
                }),
                F
                  ? null
                  : (0, v.jsx)(c.default, {
                      style: P.waitingPill,
                      children: (0, v.jsx)(u.default, {
                        style: P.waitingText,
                        children: 'Driver location appears when they accept and go online',
                      }),
                    }),
              ],
            }),
          ],
        });
      }));
    var o = r(d[1]),
      n = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      p = t(r(d[7])),
      f = t(r(d[8])),
      y = t(r(d[9])),
      h = t(r(d[10])),
      x = t(r(d[11])),
      v = r(d[12]);
    const k = t =>
      s.default.create({
        wrap: { marginTop: r(d[19]).spacing.md, marginBottom: r(d[19]).spacing.sm },
        header: { marginBottom: r(d[19]).spacing.sm },
        titleRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[19]).spacing.xs,
        },
        title: { fontFamily: r(d[19]).fontFamily.semiBold, fontSize: 14, color: t.textPrimary },
        statusHint: {
          fontFamily: r(d[19]).fontFamily.medium,
          fontSize: 13,
          color: t.textSecondary,
          marginBottom: r(d[19]).spacing.xs,
        },
        navigateBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: r(d[19]).spacing.xs,
          alignSelf: 'flex-start',
          marginTop: r(d[19]).spacing.sm,
          paddingHorizontal: r(d[19]).spacing.md,
          paddingVertical: r(d[19]).spacing.sm,
          borderRadius: r(d[19]).radius.pill,
          backgroundColor: t.primary,
        },
        navigateText: {
          fontFamily: r(d[19]).fontFamily.semiBold,
          fontSize: 13,
          color: t.onPrimary,
        },
        mapBox: {
          borderRadius: r(d[19]).radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: t.borderSoft,
          backgroundColor: t.surfaceInset,
        },
        map: { flex: 1 },
        waitingPill: {
          position: 'absolute',
          bottom: r(d[19]).spacing.sm,
          left: r(d[19]).spacing.sm,
          right: r(d[19]).spacing.sm,
          backgroundColor: t.overlay,
          borderRadius: r(d[19]).radius.md,
          paddingHorizontal: r(d[19]).spacing.sm,
          paddingVertical: r(d[19]).spacing.xs,
        },
        waitingText: {
          fontFamily: r(d[19]).fontFamily.medium,
          fontSize: 12,
          textAlign: 'center',
          color: t.textPrimary,
          lineHeight: 16,
        },
      });
  },
  1661,
  [1, 5, 667, 326, 26, 161, 19, 745, 751, 1511, 752, 1490, 183, 381, 1512, 1507, 749, 578, 747, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        name: t,
        plateNumber: o,
        vehicleModel: p,
        phone: h,
        trustScore: x,
        operatorLabel: y = 'Mate',
        showContact: b = !0,
      }) {
        const { colors: j } = (0, r(d[7]).useTheme)();
        if (!(t || o || p || h)) return null;
        const v = [p, o ? `Plate ${o}` : null].filter(Boolean);
        return (0, u.jsxs)(l.default, {
          style: [f.container, { backgroundColor: j.surfaceSoft, borderColor: j.borderStrong }],
          children: [
            (0, u.jsxs)(l.default, {
              style: f.headerRow,
              children: [
                (0, u.jsx)(n.default, {
                  style: [f.name, { color: j.textPrimary }],
                  children: t ?? y,
                }),
                null != x ? (0, u.jsx)(c.default, { score: x, compact: !0 }) : null,
              ],
            }),
            v.length
              ? (0, u.jsx)(n.default, {
                  style: [f.vehicle, { color: j.textSecondary }],
                  children: v.join(' \xb7 '),
                })
              : null,
            b ? (0, u.jsx)(s.default, { phone: h, operatorName: t ?? y, compact: !0 }) : null,
          ],
        });
      }));
    var o = t(r(d[1])),
      n = t(r(d[2])),
      l = t(r(d[3])),
      c = t(r(d[4])),
      s = t(r(d[5])),
      u = r(d[6]);
    const f = o.default.create({
      container: {
        marginTop: r(d[8]).spacing.sm,
        marginBottom: r(d[8]).spacing.xs,
        padding: r(d[8]).spacing.md,
        borderRadius: 12,
        borderWidth: 1,
      },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: r(d[8]).spacing.sm,
        marginBottom: r(d[8]).spacing.xs,
      },
      name: { flex: 1, fontFamily: r(d[8]).fontFamily.semiBold, fontSize: 16 },
      vehicle: {
        fontFamily: r(d[8]).fontFamily.medium,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: r(d[8]).spacing.xs,
      },
    });
  },
  1662,
  [1, 26, 161, 19, 1486, 1520, 183, 381, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: o,
        title: s = 'Why are you cancelling?',
        subtitle: p = 'Choose a reason so we can improve matching on this route.',
        confirmTitle: b = 'Cancel ride',
        loading: y = !1,
        onClose: h,
        onSubmit: O,
      }) {
        const { colors: A } = (0, r(d[8]).useTheme)(),
          N = (0, t.useMemo)(() => C(A), [A]),
          [S, _] = (0, t.useState)(r(d[9]).CANCEL_REASON_OPTIONS[0].id);
        (0, t.useEffect)(() => {
          o && _(r(d[9]).CANCEL_REASON_OPTIONS[0].id);
        }, [o]);
        const x =
          r(d[9]).CANCEL_REASON_OPTIONS.find(o => o.id === S) ?? r(d[9]).CANCEL_REASON_OPTIONS[0];
        return (0, f.jsx)(u.default, {
          visible: o,
          title: s,
          subtitle: p,
          confirmTitle: b,
          confirmLoading: y,
          onConfirm: () => O?.(x),
          onClose: h,
          children: (0, f.jsx)(c.default, {
            style: N.options,
            children: r(d[9]).CANCEL_REASON_OPTIONS.map(o => {
              const t = o.id === S;
              return (0, f.jsxs)(
                n.default,
                {
                  style: [N.reasonRow, t && N.reasonRowActive],
                  onPress: () => _(o.id),
                  children: [
                    (0, f.jsx)(c.default, {
                      style: [N.radio, t && N.radioActive],
                      children: t
                        ? (0, f.jsx)(r(d[10]).Ionicons, {
                            name: 'checkmark',
                            size: 13,
                            color: A.onPrimary,
                          })
                        : null,
                    }),
                    (0, f.jsxs)(c.default, {
                      style: N.reasonCopy,
                      children: [
                        (0, f.jsx)(l.default, { style: N.reasonLabel, children: o.label }),
                        (0, f.jsx)(l.default, { style: N.reasonDetail, children: o.detail }),
                      ],
                    }),
                  ],
                },
                o.id
              );
            }),
          }),
        });
      }));
    var t = r(d[1]),
      n = o(r(d[2])),
      s = o(r(d[3])),
      l = o(r(d[4])),
      c = o(r(d[5])),
      u = o(r(d[6])),
      f = r(d[7]);
    const C = o =>
      s.default.create({
        options: { gap: r(d[11]).spacing.sm, marginBottom: r(d[11]).spacing.md },
        reasonRow: {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: r(d[11]).spacing.sm,
          padding: r(d[11]).spacing.md,
          borderRadius: r(d[11]).radius.md,
          borderWidth: 1,
          borderColor: o.borderSoft,
          backgroundColor: o.surface,
        },
        reasonRowActive: {
          borderColor: o.primary,
          backgroundColor: o.primaryAlpha08 ?? o.surfaceElevated,
        },
        radio: {
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: 1,
          borderColor: o.borderStrong,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        },
        radioActive: { backgroundColor: o.primary, borderColor: o.primary },
        reasonCopy: { flex: 1, minWidth: 0 },
        reasonLabel: {
          fontFamily: r(d[11]).fontFamily.semiBold,
          fontSize: 14,
          color: o.textPrimary,
        },
        reasonDetail: Object.assign({}, r(d[11]).typography.caption, { marginTop: 2 }),
      });
  },
  1663,
  [1, 5, 326, 26, 161, 19, 1515, 183, 381, 1664, 578, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.CANCEL_REASON_OPTIONS = void 0),
      (e.addCancellationReason = function (n = [], { trip: l, reason: s }) {
        const c = 'string' == typeof s ? t(s) : s;
        return [
          {
            id: `cancel-${Date.now()}`,
            reasonId: c?.id ?? 'other',
            reasonLabel: c?.label ?? 'Other reason',
            tripId: l?.id ?? l?.tripId ?? l?.rideId ?? null,
            bookingKind: l?.bookingKind ?? null,
            tripType: l?.tripType ?? null,
            route: l?.route ?? null,
            createdAt: new Date().toISOString(),
          },
          ...(n ?? []),
        ].slice(0, o);
      }),
      (e.getCancelReasonById = t));
    const n = (e.CANCEL_REASON_OPTIONS = [
        {
          id: 'wait_too_long',
          label: 'Wait is too long',
          detail: 'Driver or mate is taking longer than expected.',
        },
        {
          id: 'wrong_pickup',
          label: 'Wrong pickup point',
          detail: 'Pickup location or route does not look right.',
        },
        { id: 'changed_plans', label: 'Plans changed', detail: 'I no longer need this ride.' },
        {
          id: 'found_other_ride',
          label: 'Found another ride',
          detail: 'I got another vehicle or route.',
        },
        {
          id: 'driver_issue',
          label: 'Driver or vehicle issue',
          detail: 'Driver details, vehicle, or safety concern.',
        },
        { id: 'other', label: 'Other reason', detail: 'Something else happened.' },
      ]),
      o = 20;
    function t(o) {
      return n.find(n => n.id === o) ?? n[n.length - 1];
    }
  },
  1664,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useReservations = function (t) {
        const [o, c] = (0, n.useState)([]),
          [l, u] = (0, n.useState)([]),
          [f, v] = (0, n.useState)(!0),
          [p, w] = (0, n.useState)(null),
          b = (0, n.useCallback)(
            async ({ silent: n = !1, force: s = !1 } = {}) => {
              if (!t) return (c([]), u([]), void v(!1));
              n || v(!0);
              const { data: o, error: l } = await (0, r(d[3]).fetchPassengerTrips)(t, { force: s });
              (c(o?.active ?? []), u(o?.history ?? []), w(l?.message ?? null), v(!1));
            },
            [t]
          );
        ((0, n.useEffect)(() => {
          if (!t) return (c([]), u([]), void v(!1));
          const n = (0, r(d[3]).peekPassengerTripsCache)(t);
          if (n?.data) {
            (c(n.data.active ?? []), u(n.data.history ?? []), v(!1));
            const t = s.default.runAfterInteractions(() => {
              b({ silent: !0, force: !1 });
            });
            return () => t.cancel();
          }
          b();
        }, [t, b]),
          (0, n.useEffect)(() => {
            if (!t) return;
            return (0, r(d[3]).subscribeToPassengerTrips)(t, () => b({ silent: !0, force: !0 }));
          }, [t, b]),
          (0, n.useEffect)(() => {
            if (!t) return;
            return (0, r(d[4]).subscribeToPassengerMateInvites)(t, () =>
              b({ silent: !0, force: !0 })
            );
          }, [t, b]),
          (0, n.useEffect)(() => {
            if (!t) return;
            if (!o.some(t => 'mate_invite' === t?.bookingKind)) return;
            const n = setInterval(() => b({ silent: !0, force: !0 }), r(d[5]).MATE_INVITE_POLL_MS);
            return () => clearInterval(n);
          }, [t, o, b]));
        const I = (0, n.useCallback)(
            async (n, s = {}) => {
              if (!t || !n) return { error: new Error('Missing trip') };
              const o = s.reason ?? null;
              let l;
              if ('request' === n.bookingKind)
                l = await (0, r(d[6]).cancelPassengerRequest)(n.id, t, { reason: o });
              else if ('active_ride' === n.bookingKind)
                l = await (0, r(d[6]).cancelActiveRideAsPassenger)({
                  passengerRowId: n.id,
                  rideId: n.rideId ?? n.tripId,
                  passengerId: t,
                  reason: o,
                });
              else if ('queue' === n.bookingKind) l = await (0, r(d[7]).cancelQueueEntry)(n.id, t);
              else if ('mate_invite' === n.bookingKind)
                l = await (0, r(d[8]).declineMateInvite)(t, n.id);
              else if ('reservation' === n.bookingKind)
                l = await (0, r(d[9]).cancelReservationAsPassenger)(n.id, n.tripId, t, {
                  reason: o,
                });
              else if ('carpool' === n.bookingKind)
                ((l = await (0, r(d[10]).cancelCarpoolBooking)(n.id)),
                  l?.error || (await (0, r(d[3]).invalidatePassengerTripsCache)(t)));
              else {
                if ('bid_accepted' !== n.bookingKind)
                  return { error: new Error('Cannot cancel this trip type') };
                l = await (0, r(d[11]).cancelAcceptedBidBooking)(n.id, t, n);
              }
              return (
                l?.error ||
                  (c(t => t.filter(t => t.id !== n.id)),
                  await (0, r(d[3]).invalidatePassengerTripsCache)(t),
                  await b({ silent: !0, force: !0 })),
                l
              );
            },
            [t, b]
          ),
          k = (0, n.useCallback)(
            async (n, s, o = 'Passenger') => {
              if (!t || !n?.id) return { error: new Error('Missing invite') };
              const c = s
                ? await (0, r(d[8]).acceptMateInvite)(t, n.id, o)
                : await (0, r(d[8]).declineMateInvite)(t, n.id);
              return (
                c.error ||
                  (await (0, r(d[3]).invalidatePassengerTripsCache)(t), await b({ force: !0 })),
                c
              );
            },
            [t, b]
          ),
          P = (0, n.useCallback)(
            async n => {
              if (!t || !n?.id) return { data: null, error: new Error('Missing trip') };
              const s = await (0, r(d[9]).deleteHistoryTrip)(n.id, t);
              return (s.error || u(t => t.filter(t => t.id !== n.id)), s);
            },
            [t]
          );
        return {
          active: o,
          history: l,
          reservations: [...o, ...l],
          loading: f,
          error: p,
          refresh: b,
          cancelTrip: I,
          respondToMateInvite: k,
          deleteHistory: P,
        };
      }));
    var n = r(d[1]),
      s = t(r(d[2]));
  },
  1665,
  [1, 5, 114, 1666, 937, 938, 754, 1503, 935, 1523, 1649, 1647]
);
__d(
  function (g, r, i, a, m, e, d) {
    async function t(t) {
      const [s, n, o, c, u, p, l, f, h, T] = await Promise.all([
          (0, r(d[2]).getMyReservations)(t),
          (0, r(d[1]).fetchPassengerActiveRequest)(t),
          (0, r(d[1]).fetchPassengerActiveRide)(t),
          (0, r(d[1]).fetchPassengerRideHistory)(t),
          (0, r(d[3]).fetchPassengerActiveQueue)(t),
          (0, r(d[4]).getLocalPassengerTrips)(t),
          (0, r(d[5]).fetchPassengerMateInvites)(t),
          (0, r(d[6]).getMyCarpoolBookings)(t),
          (0, r(d[7]).getUserPurchases)(t),
          (0, r(d[8]).getMyBids)(t),
        ]),
        y = s.data?.active ?? [];
      let P = s.data?.history ?? [];
      const v = new Set(y.map(t => t.reservationId ?? t.id).filter(Boolean)),
        M = (c.data ?? []).map(t =>
          t.passenger ? (0, r(d[9]).completedRidePassengerToHistoryTrip)(t) : t
        ),
        A = new Set(P.map(t => t.id));
      M.forEach(t => {
        A.has(t.id) || ((P = [t, ...P]), A.add(t.id));
      });
      const I = [];
      o.data
        ? I.push((0, r(d[9]).ridePassengerToMyTrip)(o.data))
        : n.data && I.push((0, r(d[9]).requestToMyTrip)(n.data));
      const b = [];
      (u.data && b.push(u.data),
        (p.queues ?? []).forEach(t => {
          (t.localOnly || String(t.id).startsWith('queue-')) &&
            (b.some(s => s.id === t.id) || b.push(t));
        }));
      const q = new Set((l.data ?? []).map(t => t.id)),
        C = new Set((l.data ?? []).map(t => t.queueId).filter(Boolean)),
        _ = [
          ...(l.data ?? []),
          ...(p.mateInvites ?? []).filter(t => !q.has(t.id) && (!t.queueId || !C.has(t.queueId))),
        ].filter((t, s, n) => {
          const o = t.queueId ?? t.id;
          return n.findIndex(t => (t.queueId ?? t.id) === o) === s;
        }),
        S = [
          ...(f.data ?? [])
            .filter(t => 'confirmed' === t.status || 'pending' === t.status)
            .map(r(d[9]).carpoolBookingToMyTrip),
          ...(h.data ?? [])
            .filter(t => 'completed' === t.status || 'pending' === t.status)
            .map(r(d[9]).marketPurchaseToMyTrip),
          ...(T.data ?? [])
            .filter(t => 'accepted' === t.status && !v.has(t.reservation_id) && !v.has(t.id))
            .map(r(d[9]).acceptedBidToMyTrip),
        ],
        k = [
          ...(f.data ?? [])
            .filter(t => 'cancelled' === t.status)
            .map(t =>
              Object.assign({}, (0, r(d[9]).carpoolBookingToMyTrip)(t), { status: 'cancelled' })
            ),
          ...(h.data ?? [])
            .filter(t => 'cancelled' === t.status)
            .map(r(d[9]).marketPurchaseToMyTrip),
        ];
      return (0, r(d[9]).mergePassengerTrips)({
        reservationActive: y,
        reservationHistory: P,
        onDemandActive: I,
        queueActive: b,
        mateInviteActive: _,
        featureActive: S,
        featureHistory: k,
        error: s.error ?? n.error ?? o.error ?? u.error ?? l.error ?? f.error ?? h.error ?? T.error,
      });
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.fetchPassengerTrips = async function (s, { force: n = !1 } = {}) {
        if (!s) return { data: { active: [], history: [] }, error: null };
        return (0, r(d[0]).fetchWithCache)((0, r(d[0]).passengerTripsCacheKey)(s), () => t(s), {
          ttlMs: 12e3,
          persist: !0,
          force: n,
        });
      }),
      Object.defineProperty(e, 'invalidatePassengerTripsCache', {
        enumerable: !0,
        get: function () {
          return r(d[0]).invalidatePassengerTripsCache;
        },
      }),
      (e.peekPassengerTripsCache = function (t) {
        return t
          ? (0, r(d[0]).peekQueryCache)((0, r(d[0]).passengerTripsCacheKey)(t), {
              maxAgeMs: r(d[0]).QUERY_CACHE_DISK_STALE_MS,
            })
          : null;
      }),
      Object.defineProperty(e, 'subscribeToPassengerTrips', {
        enumerable: !0,
        get: function () {
          return r(d[1]).subscribeToPassengerTrips;
        },
      }));
  },
  1666,
  [755, 754, 1523, 1503, 935, 937, 1649, 1651, 1647, 939]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ title: t, children: s }) {
        const { colors: p } = (0, r(d[8]).useTheme)(),
          h = f(p),
          y = l.Children.toArray(s).filter(Boolean);
        return (0, u.jsxs)(o.default, {
          style: h.wrap,
          children: [
            t ? (0, u.jsx)(n.default, { style: h.title, children: t }) : null,
            (0, u.jsx)(c.default, {
              elevated: !0,
              padding: 'none',
              style: h.card,
              children: y.map((t, l) =>
                (0, u.jsxs)(
                  o.default,
                  {
                    children: [
                      (0, u.jsx)(o.default, { style: h.rowWrap, children: t }),
                      l < y.length - 1 ? (0, u.jsx)(o.default, { style: h.divider }) : null,
                    ],
                  },
                  l
                )
              ),
            }),
          ],
        });
      }));
    var l = r(d[1]),
      n = t(r(d[2])),
      o = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = r(d[6]);
    const f = t =>
      s.default.create({
        wrap: { marginBottom: r(d[7]).spacing.lg },
        title: Object.assign({}, r(d[7]).typography.label, {
          color: t.textMuted,
          marginBottom: r(d[7]).spacing.sm,
          marginLeft: r(d[7]).spacing.xs,
        }),
        card: { marginBottom: 0 },
        rowWrap: { paddingHorizontal: r(d[7]).spacing.md },
        divider: {
          height: 1,
          backgroundColor: t.borderSoft,
          marginLeft: 56,
          marginRight: r(d[7]).spacing.md,
        },
      });
  },
  1667,
  [1, 5, 161, 19, 26, 684, 183, 377, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ score: t = 72 }) {
        const { colors: s } = (0, r(d[7]).useTheme)(),
          b = (0, o.useMemo)(() => u(s), [s]),
          p = (0, r(d[8]).getTrustTier)(t);
        return (0, f.jsxs)(l.default, {
          style: [b.card, { borderColor: p.color }],
          children: [
            (0, f.jsxs)(l.default, {
              style: b.topRow,
              children: [
                (0, f.jsx)(c.default, { score: t, compact: !0 }),
                (0, f.jsxs)(l.default, {
                  style: b.tierBlock,
                  children: [
                    (0, f.jsx)(n.default, {
                      style: [b.tierName, { color: p.color }],
                      children: p.tier,
                    }),
                    (0, f.jsx)(n.default, { style: b.tierLabel, children: 'Trust tier' }),
                  ],
                }),
              ],
            }),
            (0, f.jsx)(l.default, {
              style: b.benefits,
              children: p.benefits.map(t =>
                (0, f.jsxs)(
                  l.default,
                  {
                    style: b.benefitRow,
                    children: [
                      (0, f.jsx)(l.default, {
                        style: [b.benefitDot, { backgroundColor: p.color }],
                      }),
                      (0, f.jsx)(n.default, { style: b.benefitText, children: t }),
                    ],
                  },
                  t
                )
              ),
            }),
          ],
        });
      }));
    var o = r(d[1]),
      l = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      f = r(d[6]);
    const u = t =>
      s.default.create({
        card: {
          backgroundColor: t.surfaceElevated,
          borderRadius: r(d[9]).radius.lg,
          borderWidth: 2,
          padding: r(d[9]).spacing.md,
          marginTop: r(d[9]).spacing.md,
        },
        topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: r(d[9]).spacing.md },
        tierBlock: { marginLeft: r(d[9]).spacing.md, flex: 1 },
        tierName: { fontFamily: r(d[9]).fontFamily.bold, fontSize: 20 },
        tierLabel: Object.assign({}, r(d[9]).typography.caption, {
          color: t.textSecondary,
          marginTop: 2,
        }),
        benefits: { borderTopWidth: 1, borderTopColor: t.border, paddingTop: r(d[9]).spacing.sm },
        benefitRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: r(d[9]).spacing.xs,
        },
        benefitDot: { width: 6, height: 6, borderRadius: 3, marginRight: r(d[9]).spacing.sm },
        benefitText: { fontFamily: r(d[9]).fontFamily.medium, fontSize: 13, color: t.textPrimary },
      });
  },
  1668,
  [1, 5, 19, 161, 26, 1486, 183, 381, 936, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      return (
        t === r(d[0]).USER_ROLES.MATE ||
        t === r(d[0]).USER_ROLES.TROTRORIDE_DRIVER ||
        t === r(d[0]).USER_ROLES.COURIER ||
        t === r(d[0]).USER_ROLES.VENDOR
      );
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.getWalletModeConfig = function (l, n) {
        const o = t(l),
          s = { role: l, isEarner: o, showTopUp: !o, showCashOut: !0, showEarningsLink: o };
        switch (l) {
          case r(d[0]).USER_ROLES.MATE:
            return Object.assign({}, s, {
              title: n('wallet.modeMateTitle'),
              subtitle: n('wallet.modeMateSubtitle'),
              balanceHint: n('wallet.modeMateBalanceHint'),
              emptyActivity: n('wallet.modeMateEmpty'),
              profileSub: n('wallet.modeMateProfileSub'),
              earningsLink: n('wallet.openEarningsMate'),
              earningsRoute: r(d[1]).ROUTES.MATE_EARNINGS,
            });
          case r(d[0]).USER_ROLES.TROTRORIDE_DRIVER:
            return Object.assign({}, s, {
              title: n('wallet.modeDriverTitle'),
              subtitle: n('wallet.modeDriverSubtitle'),
              balanceHint: n('wallet.modeDriverBalanceHint'),
              emptyActivity: n('wallet.modeDriverEmpty'),
              profileSub: n('wallet.modeDriverProfileSub'),
              earningsLink: n('wallet.openEarningsDriver'),
              earningsRoute: r(d[1]).ROUTES.TR_EARNINGS,
            });
          case r(d[0]).USER_ROLES.COURIER:
            return Object.assign({}, s, {
              title: n('wallet.modeCourierTitle'),
              subtitle: n('wallet.modeCourierSubtitle'),
              balanceHint: n('wallet.modeCourierBalanceHint'),
              emptyActivity: n('wallet.modeCourierEmpty'),
              profileSub: n('wallet.modeCourierProfileSub'),
              earningsLink: n('wallet.openEarningsCourier'),
              earningsRoute: r(d[1]).ROUTES.COURIER_EARNINGS,
            });
          case r(d[0]).USER_ROLES.VENDOR:
            return Object.assign({}, s, {
              title: n('wallet.modeVendorTitle'),
              subtitle: n('wallet.modeVendorSubtitle'),
              balanceHint: n('wallet.modeVendorBalanceHint'),
              emptyActivity: n('wallet.modeVendorEmpty'),
              profileSub: n('wallet.modeVendorProfileSub'),
              earningsLink: n('wallet.openEarningsVendor'),
              earningsRoute: r(d[1]).ROUTES.VENDOR_ORDERS,
            });
          default:
            return Object.assign({}, s, {
              isEarner: !1,
              showTopUp: !0,
              showCashOut: !0,
              showEarningsLink: !1,
              title: n('wallet.title'),
              subtitle: n('wallet.subtitle'),
              balanceHint: n('wallet.balanceHint'),
              emptyActivity: n('wallet.emptyActivity'),
              profileSub: n('profile.walletPaymentsSub'),
              earningsLink: null,
              earningsRoute: null,
            });
        }
      }),
      (e.isWalletEarnerRole = t),
      (e.vendorPayoutFromJob = function (t) {
        const l = t?.fare_breakdown ?? {},
          n = Number(l.vendorPayoutGhs ?? l.vendorEarnings ?? 0);
        if (n > 0) return n;
        const o = (Array.isArray(t?.order_items) ? t.order_items : []).reduce(
          (t, l) => t + Number(l.price_ghs ?? l.price ?? 0) * Number(l.qty ?? 1),
          0
        );
        return o > 0 ? o : 0;
      }));
  },
  1669,
  [508, 682]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        icon: t,
        title: s,
        subtitle: y,
        value: x,
        onPress: h,
        showChevron: p = !0,
        danger: j = !1,
        toggle: b,
        toggleValue: v,
        onToggle: w,
        testID: I,
      }) {
        const { colors: D } = (0, r(d[8]).useTheme)(),
          F = f(D),
          z = (0, u.jsxs)(o.default, {
            style: F.row,
            children: [
              t
                ? (0, u.jsx)(o.default, {
                    style: F.iconWrap,
                    children: (0, u.jsx)(r(d[9]).Ionicons, {
                      name: t,
                      size: 20,
                      color: j ? D.error : D.primary,
                    }),
                  })
                : null,
              (0, u.jsxs)(o.default, {
                style: F.textWrap,
                children: [
                  (0, u.jsx)(n.default, { style: [F.title, j && F.titleDanger], children: s }),
                  y ? (0, u.jsx)(n.default, { style: F.subtitle, children: y }) : null,
                ],
              }),
              b
                ? (0, u.jsx)(c.default, {
                    value: v,
                    onValueChange: w,
                    trackColor: { false: D.border, true: D.primary },
                    thumbColor: D.onPrimary,
                  })
                : (0, u.jsxs)(o.default, {
                    style: F.trailing,
                    children: [
                      x ? (0, u.jsx)(n.default, { style: F.value, children: x }) : null,
                      p && h
                        ? (0, u.jsx)(r(d[9]).Ionicons, {
                            name: 'chevron-forward',
                            size: 17,
                            color: D.textMuted,
                          })
                        : null,
                    ],
                  }),
            ],
          });
        if (h && !b)
          return (0, u.jsx)(l.default, {
            testID: I,
            style: ({ pressed: t }) => [F.pressable, t && F.pressed],
            onPress: h,
            children: z,
          });
        return (0, u.jsx)(o.default, { style: F.pressable, children: z });
      }));
    var l = t(r(d[1])),
      n = t(r(d[2])),
      o = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = r(d[6]);
    const f = t =>
      s.default.create({
        pressable: { minHeight: 56, justifyContent: 'center' },
        pressed: { opacity: 0.85 },
        row: { flexDirection: 'row', alignItems: 'center', paddingVertical: r(d[7]).spacing.sm },
        iconWrap: { width: 36, alignItems: 'center', marginRight: r(d[7]).spacing.md },
        textWrap: { flex: 1, paddingRight: r(d[7]).spacing.sm },
        title: { fontFamily: r(d[7]).fontFamily.semiBold, fontSize: 15, color: t.textPrimary },
        titleDanger: { color: t.error },
        subtitle: {
          fontFamily: r(d[7]).fontFamily.regular,
          fontSize: 13,
          lineHeight: 18,
          color: t.textMuted,
          marginTop: 2,
        },
        trailing: { flexDirection: 'row', alignItems: 'center', gap: 4 },
        value: {
          fontFamily: r(d[7]).fontFamily.medium,
          fontSize: 13,
          color: t.textSecondary,
          maxWidth: 120,
        },
      });
  },
  1670,
  [1, 326, 161, 19, 26, 253, 183, 377, 381, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.COMPACT_BREAKPOINT = void 0),
      (e.useCompactLayout = function (t = c) {
        const { width: n, height: u } = (0, o.default)();
        return { compact: n < t, width: n, height: u };
      }));
    var o = t(r(d[1]));
    const c = (e.COMPACT_BREAKPOINT = 600);
  },
  1671,
  [1, 671]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function (t) {
        let { source: l, style: y, contentFit: f = 'cover', placeholder: p, recyclingKey: b } = t,
          h = (0, c.default)(t, s);
        const j = 'string' == typeof l ? { uri: l } : l;
        if (!j?.uri && !j?.local) return (0, o.jsx)(n.default, { style: [y, u.fallback] });
        return (0, o.jsx)(
          r(d[5]).Image,
          Object.assign(
            {
              source: j,
              style: y,
              contentFit: f,
              cachePolicy: 'memory-disk',
              transition: 200,
              placeholder: p,
              recyclingKey: b ?? j.uri,
            },
            h
          )
        );
      }));
    var c = t(r(d[1])),
      l = t(r(d[2])),
      n = t(r(d[3])),
      o = r(d[4]);
    const s = ['source', 'style', 'contentFit', 'placeholder', 'recyclingKey'];
    const u = l.default.create({ fallback: { backgroundColor: 'transparent' } });
  },
  1672,
  [1, 4, 26, 19, 183, 1673]
);
__d(
  function (g, r, i, a, m, e, d) {
    Object.defineProperty(e, '__esModule', { value: !0 });
    var n = { Image: !0, ImageBackground: !0, useImage: !0 };
    (Object.defineProperty(e, 'Image', {
      enumerable: !0,
      get: function () {
        return r(d[0]).Image;
      },
    }),
      Object.defineProperty(e, 'ImageBackground', {
        enumerable: !0,
        get: function () {
          return r(d[1]).ImageBackground;
        },
      }),
      Object.defineProperty(e, 'useImage', {
        enumerable: !0,
        get: function () {
          return r(d[2]).useImage;
        },
      }),
      Object.keys(r(d[3])).forEach(function (t) {
        'default' !== t &&
          '__esModule' !== t &&
          (Object.prototype.hasOwnProperty.call(n, t) ||
            (t in e && e[t] === r(d[3])[t]) ||
            Object.defineProperty(e, t, {
              enumerable: !0,
              get: function () {
                return r(d[3])[t];
              },
            }));
      }));
  },
  1673,
  [1674, 1697, 1698, 1699]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.Image = void 0));
    var n = t(r(d[1])),
      s = t(r(d[2])),
      c = t(r(d[3])),
      o = t(r(d[4])),
      u = t(r(d[5])),
      l = r(d[6]);
    const h = [
        'style',
        'source',
        'placeholder',
        'contentFit',
        'contentPosition',
        'transition',
        'fadeDuration',
        'resizeMode',
        'defaultSource',
        'loadingIndicatorSource',
      ],
      f = ['resizeMode'];
    let y = !1,
      p = !1;
    class w extends s.default.PureComponent {
      constructor(t) {
        (super(t),
          (this.nativeViewRef = (0, r(d[7]).createSnapshotFriendlyRef)()),
          (this.containerViewRef = (0, r(d[7]).createSnapshotFriendlyRef)()));
      }
      getAnimatableRef = () => this.containerViewRef.current;
      static Image = u.default.Image;
      static async prefetch(t, n) {
        let s,
          c = 'memory-disk';
        switch (typeof n) {
          case 'string':
            c = n;
            break;
          case 'object':
            ((c = n.cachePolicy ?? c), (s = n.headers));
        }
        return u.default.prefetch(Array.isArray(t) ? t : [t], c, s);
      }
      static async clearMemoryCache() {
        return await u.default.clearMemoryCache();
      }
      static async clearDiskCache() {
        return await u.default.clearDiskCache();
      }
      static async getCachePathAsync(t) {
        return await u.default.getCachePathAsync(t);
      }
      static async generateBlurhashAsync(t, n) {
        return u.default.generateBlurhashAsync(t, n);
      }
      static async generateThumbhashAsync(t) {
        return u.default.generateThumbhashAsync(t);
      }
      async startAnimating() {
        await this.nativeViewRef.current?.startAnimating();
      }
      async stopAnimating() {
        await this.nativeViewRef.current?.stopAnimating();
      }
      async lockResourceAsync() {
        await this.nativeViewRef.current?.lockResourceAsync();
      }
      async unlockResourceAsync() {
        await this.nativeViewRef.current?.unlockResourceAsync();
      }
      async reloadAsync() {
        await this.nativeViewRef.current?.reloadAsync();
      }
      static async loadAsync(t, n) {
        const s = (0, r(d[8]).resolveSource)(t);
        return await u.default.loadAsync(s, n);
      }
      render() {
        const t = this.props,
          {
            style: s,
            source: u,
            placeholder: w,
            contentFit: A,
            contentPosition: R,
            transition: v,
            fadeDuration: V,
            resizeMode: S,
            defaultSource: I,
            loadingIndicatorSource: k,
          } = t,
          C = (0, n.default)(t, h),
          P = c.default.flatten(s) || {},
          { resizeMode: b } = P,
          M = (0, n.default)(P, f),
          F = S ?? b;
        return (
          (!I && !k) ||
            y ||
            (console.warn(
              '[expo-image]: `defaultSource` and `loadingIndicatorSource` props are deprecated, use `placeholder` instead'
            ),
            (y = !0)),
          C.children &&
            !p &&
            (console.warn(
              'The <Image> component does not support children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
            ),
            (p = !0)),
          (0, l.jsx)(
            o.default,
            Object.assign({}, C, {
              style: M,
              source: (0, r(d[8]).resolveSources)(u),
              placeholder: (0, r(d[8]).resolveSources)(w ?? I ?? k),
              contentFit: (0, r(d[9]).resolveContentFit)(A, F),
              contentPosition: (0, r(d[9]).resolveContentPosition)(R),
              transition: (0, r(d[9]).resolveTransition)(v, V),
              nativeViewRef: this.nativeViewRef,
              containerViewRef: this.containerViewRef,
            })
          )
        );
      }
    }
    e.Image = w;
  },
  1674,
  [1, 4, 5, 26, 1675, 1695, 183, 339, 1680, 1684]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function (t) {
        let {
            source: s,
            placeholder: x,
            contentFit: v,
            contentPosition: F,
            placeholderContentFit: w,
            cachePolicy: L,
            onLoad: C,
            transition: E,
            onError: R,
            responsivePolicy: $,
            onLoadEnd: O,
            onDisplay: S,
            priority: T,
            blurRadius: V,
            recyclingKey: _,
            style: D,
            nativeViewRef: K,
            accessibilityLabel: M,
            alt: A,
            tintColor: N,
            containerViewRef: H,
          } = t,
          W = (0, o.default)(t, h);
        const k = w || 'scale-down',
          q = { objectFit: w || v },
          z = (0, u.default)(s, $, H, P(E) ? b : null),
          B = x?.[0],
          G = j(B, _),
          I = B?.uri
            ? [
                G,
                ({ onAnimationFinished: t }) =>
                  (o, n) =>
                    (0, f.jsx)(c.default, {
                      ref: K,
                      source: B,
                      style: Object.assign(
                        { objectFit: k },
                        V ? { filter: `blur(${V}px)` } : {},
                        n
                      ),
                      className: o,
                      events: { onTransitionEnd: [t] },
                      contentPosition: { left: '50%', top: '50%' },
                      hashPlaceholderContentPosition: F,
                      hashPlaceholderStyle: q,
                      accessibilityLabel: M ?? A,
                      cachePolicy: L,
                      priority: T,
                      tintColor: N,
                    }),
              ]
            : null,
          J = [
            j(z ?? B, _),
            ({ onAnimationFinished: t, onReady: o, onMount: n, onError: l }) =>
              (s, u) =>
                (0, f.jsx)(c.default, {
                  ref: K,
                  source: z || B,
                  events: {
                    onError: [p(R), O, l],
                    onLoad: [y(C), O, o],
                    onMount: [n],
                    onTransitionEnd: [t],
                    onDisplay: [S],
                  },
                  style: Object.assign(
                    { objectFit: z ? v : k },
                    V ? { filter: `blur(${V}px)` } : {},
                    u
                  ),
                  className: s,
                  cachePolicy: L,
                  priority: T,
                  contentPosition: z ? F : { top: '50%', left: '50%' },
                  hashPlaceholderContentPosition: F,
                  hashPlaceholderStyle: q,
                  accessibilityLabel: M,
                  tintColor: N,
                }),
          ];
        return (0, f.jsx)(
          n.default,
          Object.assign(
            { ref: H, dataSet: { expoimage: !0 }, style: [{ overflow: 'hidden' }, D] },
            W,
            {
              children: (0, f.jsx)(l.default, {
                transition: E,
                recyclingKey: _,
                initial: I,
                children: J,
              }),
            }
          )
        );
      }));
    var o = t(r(d[1])),
      n = (t(r(d[2])), t(r(d[3]))),
      l = t(r(d[4])),
      c = t(r(d[5])),
      s = t(r(d[6])),
      u = t(r(d[7])),
      f = r(d[8]);
    const h = [
      'source',
      'placeholder',
      'contentFit',
      'contentPosition',
      'placeholderContentFit',
      'cachePolicy',
      'onLoad',
      'transition',
      'onError',
      'responsivePolicy',
      'onLoadEnd',
      'onDisplay',
      'priority',
      'blurRadius',
      'recyclingKey',
      'style',
      'nativeViewRef',
      'accessibilityLabel',
      'alt',
      'tintColor',
      'containerViewRef',
    ];
    function y(t) {
      return o => {
        const n = o.target;
        t?.({
          source: {
            url: n.currentSrc,
            width: n.naturalWidth,
            height: n.naturalHeight,
            mediaType: null,
          },
          cacheType: 'none',
        });
      };
    }
    function p(t) {
      return ({ source: o }) => {
        t?.({ error: `Failed to load image from url: ${o?.uri}` });
      };
    }
    function b(t, o) {
      (t?.style.setProperty('--expo-image-width', `${o.width}px`),
        t?.style.setProperty('--expo-image-height', `${o.height}px`));
    }
    function P(t) {
      return (
        'flip-from-bottom' === t?.effect ||
        'flip-from-top' === t?.effect ||
        'flip-from-left' === t?.effect ||
        'flip-from-right' === t?.effect
      );
    }
    function j(t, o) {
      const n = (t && 'uri' in t && t.uri) || '';
      return o ? [o, n].join('-') : n;
    }
    (0, s.default)();
  },
  1675,
  [1, 4, 5, 19, 1676, 1677, 1693, 1694, 183]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ children: n, initial: o, transition: l, recyclingKey: f }) {
        const y = c(l),
          j = u(o, 'active'),
          [p, C] = t.default.useState(j ? [j] : []),
          [O, K] = t.default.useState(f ?? '');
        O !== (f ?? '') && (K(f ?? ''), C(j ? [j] : []));
        const b = n => {
            C(t =>
              t.filter(
                t => (!!n && t.animationKey !== n) || 'in' === t.status || 'active' === t.status
              )
            );
          },
          v = u(n);
        t.default.useEffect(() => {
          C(n => {
            if (!v) return n;
            return n.findIndex(n => n.animationKey === v.animationKey) >= 0
              ? y
                ? n.map(n =>
                    n.animationKey === v.animationKey
                      ? Object.assign({}, v, { status: 'in' })
                      : Object.assign({}, n, { status: 'out' })
                  )
                : [Object.assign({}, v, { status: 'in' })]
              : [...n, v];
          });
        }, [v]);
        const F = {
            transitionDuration: `${y?.duration || 0}ms`,
            transitionTimingFunction: y?.timingFunction || 'linear',
          },
          h = { in: y?.animateInClass, out: y?.animateOutClass, mounted: y?.startingClass };
        return (0, s.jsx)(s.Fragment, {
          children: [...p]
            .filter(n => 'errored' !== n.status)
            .map(t => {
              const u = t.status,
                l = h[u];
              return (0, s.jsx)(
                'div',
                {
                  className: y?.containerClass,
                  children: ((c = t),
                  n[0] === c.animationKey
                    ? n[1]({
                        onReady: () => {
                          C(
                            y
                              ? n =>
                                  n.map(n =>
                                    n === v
                                      ? Object.assign({}, n, { status: 'in' })
                                      : Object.assign({}, n, { status: 'out' })
                                  )
                              : [Object.assign({}, c, { status: 'in' })]
                          );
                        },
                        onAnimationFinished: () => {
                          C([Object.assign({}, c, { status: 'in' })]);
                        },
                        onError: () => {
                          C(n =>
                            n.map(n => (n === c ? Object.assign({}, n, { status: 'errored' }) : n))
                          );
                        },
                      })
                    : o?.[0] === c.animationKey
                      ? o[1]({
                          onAnimationFinished: () => {
                            'out' === c.status && b(c.animationKey);
                          },
                          onError: () => {
                            C(n =>
                              n.map(n =>
                                n === c ? Object.assign({}, n, { status: 'errored' }) : n
                              )
                            );
                          },
                        })
                      : c.persistedElement({
                          onAnimationFinished: () => {
                            b(c.animationKey);
                          },
                        }))(l, F),
                },
                t.animationKey
              );
              var c;
            }),
        });
      }),
      (e.getAnimatorFromTransition = c));
    var t = n(r(d[1])),
      s = r(d[2]);
    const o = [
      'cross-dissolve',
      'flip-from-left',
      'flip-from-right',
      'flip-from-top',
      'flip-from-bottom',
    ];
    function u(n, s) {
      return t.default.useMemo(() => {
        if (!n) return null;
        const [t, o] = n;
        return { animationKey: t, persistedElement: o, status: s || 'mounted' };
      }, [n?.[0]]);
    }
    function l(n, t) {
      return n?.includes('flip') ? (t?.includes('ease') ? 'ease-in-out' : 'linear') : t || null;
    }
    function c(n) {
      if (!n?.duration) return null;
      const t = ((s = n.effect), o.includes(s) ? s : 'cross-dissolve');
      var s;
      if (!t)
        return {
          startingClass: '',
          animateInClass: '',
          animateOutClass: '',
          containerClass: '',
          timingFunction: 'linear',
          animationClass: '',
          duration: 0,
        };
      const u = l(t, n.timing),
        c = `image-timing-${u}`;
      return {
        startingClass: `${t}-start`,
        animateInClass: [t, 'transitioning', `${t}-active`, c].join(' '),
        animateOutClass: [t, `${t}-end`, c].join(' '),
        containerClass: `${t}-container`,
        timingFunction: u,
        animationClass: t,
        duration: n?.duration || 0,
      };
    }
  },
  1676,
  [1, 5, 183]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    var t = e(_r(d[1])),
      o = i(_r(d[2])),
      n = i(_r(d[3])),
      r = _r(d[4]);
    const s = [
      'source',
      'events',
      'contentPosition',
      'hashPlaceholderContentPosition',
      'priority',
      'style',
      'hashPlaceholderStyle',
      'tintColor',
      'className',
      'accessibilityLabel',
      'cachePolicy',
    ];
    function i(e, t) {
      if ('function' == typeof WeakMap)
        var o = new WeakMap(),
          n = new WeakMap();
      return (i = function (e, t) {
        if (!t && e && e.__esModule) return e;
        var r,
          s,
          i = { __proto__: null, default: e };
        if (null === e || ('object' != typeof e && 'function' != typeof e)) return i;
        if ((r = t ? n : o)) {
          if (r.has(e)) return r.get(e);
          r.set(e, i);
        }
        for (const t in e)
          'default' !== t &&
            {}.hasOwnProperty.call(e, t) &&
            ((s = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
            (s.get || s.set)
              ? r(i, t, s)
              : (i[t] = e[t]));
        return i;
      })(e, t);
    }
    function l(e = 'normal') {
      return e && ['low', 'high'].includes(e) ? e : 'auto';
    }
    function c(e) {
      return e && 'srcset' in e ? { srcSet: e.srcset, sizes: e.sizes } : {};
    }
    const u = o.default.forwardRef((e, i) => {
      let {
          source: u,
          events: f,
          contentPosition: h,
          hashPlaceholderContentPosition: y,
          priority: P,
          style: p,
          hashPlaceholderStyle: b,
          tintColor: j,
          className: v,
          accessibilityLabel: _,
          cachePolicy: O,
        } = e,
        C = (0, t.default)(e, s);
      (0, o.useEffect)(() => {
        f?.onMount?.forEach(e => e?.());
      }, []);
      const w = (0, o.useId)().replace(/[\xab\xbb]/g, '_'),
        { resolvedSource: M, isImageHash: S } = (0, _r(d[5]).useImageHashes)(u),
        E = (0, _r(d[6]).getObjectPositionFromContentPositionObject)(S ? y : h),
        H = (0, _r(d[5]).useHeaders)(M, O, f?.onError);
      return H
        ? (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)(n.default, { id: w, tintColor: j }),
              (0, r.jsx)(
                'img',
                Object.assign(
                  {
                    ref: i,
                    alt: _,
                    className: v,
                    src: H?.uri || void 0,
                    style: Object.assign(
                      { objectPosition: E },
                      _r(d[6]).absoluteFilledPosition,
                      (0, n.getTintColorStyle)(w, j),
                      p,
                      S ? b : {}
                    ),
                    fetchPriority: l(P || 'normal'),
                  },
                  (0, _r(d[7]).getImageWrapperEventHandler)(f, H),
                  c(u),
                  C
                ),
                u?.uri
              ),
            ],
          })
        : null;
    });
    _e.default = u;
  },
  1677,
  [1, 4, 5, 1678, 183, 1679, 1691, 1692]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ id: t, tintColor: o }) {
        if (!o) return null;
        return (0, n.jsx)('svg', {
          style: l.svg,
          children: (0, n.jsx)('defs', {
            children: (0, n.jsxs)('filter', {
              id: `expo-image-tint-${t}`,
              children: [
                (0, n.jsx)('feFlood', { floodColor: o }),
                (0, n.jsx)('feComposite', { in2: 'SourceAlpha', operator: 'atop' }),
              ],
            }),
          }),
        });
      }),
      (e.getTintColorStyle = function (t, o) {
        if (!o) return {};
        return { filter: `url(#expo-image-tint-${t})` };
      }));
    t(r(d[1]));
    var o = t(r(d[2])),
      n = r(d[3]);
    const l = o.default.create({ svg: { width: 0, height: 0 } });
  },
  1678,
  [1, 5, 26, 183]
);
__d(
  function (g, r, i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.useHeaders = function (s, t, u) {
        const [o, c] = (0, e.useState)(null);
        if (
          ((0, e.useEffect)(() => {
            (async () => {
              if (s?.headers && s.uri)
                try {
                  const e = await fetch(s.uri, {
                    headers: s.headers,
                    cache: 'none' === t ? 'no-cache' : 'default',
                    redirect: 'follow',
                  });
                  if (!e.ok) throw new Error(`Failed to fetch image: ${e.status} ${e.statusText}`);
                  const u = await e.blob();
                  c(e => (e && URL.revokeObjectURL(e), URL.createObjectURL(u)));
                } catch {
                  u?.forEach(e => e?.({ source: s }));
                }
            })();
          }, [s]),
          !s?.headers)
        )
          return s;
        if (!o) return null;
        return Object.assign({}, s, { uri: o });
      }),
      (_e.useImageHashes = function (t) {
        const [u, o] = s(t),
          [c, n] = (0, r(d[3]).useBlurhash)(t);
        return (0, e.useMemo)(
          () =>
            o || n
              ? c || u
                ? { resolvedSource: c ?? u, isImageHash: !0 }
                : { resolvedSource: null, isImageHash: !0 }
              : { resolvedSource: t, isImageHash: !1 },
          [c, u, o, n, t]
        );
      }),
      (_e.useThumbhash = s));
    var e = r(d[0]);
    function s(s) {
      const t = (0, r(d[1]).isThumbhashString)(s?.uri || ''),
        u = s?.uri?.replace(/thumbhash:\//, '') ?? '';
      return [
        (0, e.useMemo)(
          () => (t ? { uri: (0, r(d[2]).thumbHashStringToDataURL)(u) } : null),
          [u, t]
        ),
        t,
      ];
    }
  },
  1679,
  [5, 1680, 1685, 1686]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isBlurhashString = s),
      (e.isThumbhashString = o),
      (e.resolveSource = l),
      (e.resolveSources = function (t) {
        if (Array.isArray(t)) return t.map(l).filter(Boolean);
        if ((0, r(d[4]).isImageRef)(t)) return t;
        return [l(t)].filter(Boolean);
      }));
    var u = t(r(d[1])),
      h = t(r(d[2]));
    const n = ['blurhash', 'thumbhash'];
    function s(t) {
      return /^(blurhash:\/)+[\w#$%*+,\-.:;=?@[\]^_{}|~]+(\/[\d.]+)*$/.test(t);
    }
    function o(t) {
      return t.startsWith('thumbhash:/');
    }
    function l(t) {
      if ('string' == typeof t)
        return s(t)
          ? (0, r(d[3]).resolveBlurhashString)(t)
          : o(t)
            ? (0, r(d[3]).resolveThumbhashString)(t)
            : { uri: t };
      if ('number' == typeof t) return (0, h.default)(t);
      if ('object' == typeof t && (t?.blurhash || t?.thumbhash)) {
        const { blurhash: h, thumbhash: s } = t,
          o = (0, u.default)(t, n),
          l = s ? (0, r(d[3]).resolveThumbhashString)(s) : (0, r(d[3]).resolveBlurhashString)(h);
        return Object.assign({}, l, o);
      }
      return t ?? null;
    }
  },
  1680,
  [1, 4, 1681, 1683, 1684]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = u),
      (e.pickScale = void 0),
      (e.setCustomSourceTransformer = c));
    var o = t(r(d[1]));
    let n;
    function c(t) {
      n = t;
    }
    function u(t) {
      if ('object' == typeof t) return t;
      const c = (0, r(d[2]).getAssetByID)(t);
      if (!c) return;
      const u = new o.default('https://expo.dev', null, c);
      return n ? n(u) : u.defaultAsset();
    }
    Object.defineProperty(u, 'setCustomSourceTransformer', { get: () => c });
    const { pickScale: s } = o.default;
    e.pickScale = s;
  },
  1681,
  [1, 1682, 154]
);
__d(
  function (g, r, _i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var s = t(r(d[1]));
    function i(t) {
      const i = h.pickScale(t.scales, s.default.get()),
        l = 1 === i ? '' : '@' + i + 'x',
        c = t.type ? `.${t.type}` : '';
      return t.httpServerLocation.replace(/\.\.\//g, '_') + '/' + t.name + l + c;
    }
    class h {
      constructor(t, s, i) {
        ((this.serverUrl = t || 'https://expo.dev'), (this.jsbundleUrl = null), (this.asset = i));
      }
      isLoadedFromServer() {
        return !0;
      }
      isLoadedFromFileSystem() {
        return !1;
      }
      defaultAsset() {
        return this.assetServerURL();
      }
      assetServerURL() {
        const t = new URL(i(this.asset), this.serverUrl);
        return (
          t.searchParams.set('platform', 'web'),
          t.searchParams.set('hash', this.asset.hash),
          this.fromSource(t.toString().replace(t.origin, ''))
        );
      }
      fromSource(t) {
        return {
          __packager_asset: !0,
          width: this.asset.width ?? void 0,
          height: this.asset.height ?? void 0,
          uri: t,
          scale: h.pickScale(this.asset.scales, s.default.get()),
        };
      }
      static pickScale(t, s) {
        for (let i = 0; i < t.length; i++) if (t[i] >= s) return t[i];
        return t[t.length - 1] || 1;
      }
    }
    e.default = h;
  },
  1682,
  [1, 153]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.resolveBlurhashString = function (h) {
        const [t, u, n] = h.replace(/^blurhash:\//, '').split('/');
        return {
          uri: 'blurhash:/' + t,
          width: parseInt(u, 10) || 16,
          height: parseInt(n, 10) || 16,
        };
      }),
      (e.resolveThumbhashString = function (h) {
        return { uri: 'thumbhash:/' + h.replace(/^thumbhash:\//, '') };
      }));
  },
  1683,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isImageRef = function (t) {
        return t instanceof r(d[0]).SharedRef && 'image' === t.nativeRefType;
      }),
      (e.resolveContentFit = function (n, f) {
        if (n) return n;
        if (f)
          switch (
            (t ||
              (console.log(
                '[expo-image]: Prop "resizeMode" is deprecated, use "contentFit" instead'
              ),
              (t = !0)),
            f)
          ) {
            case 'contain':
            case 'cover':
            case 'none':
              return f;
            case 'stretch':
              return 'fill';
            case 'center':
              return 'scale-down';
            case 'repeat':
              return (
                o ||
                  (console.log('[expo-image]: Resize mode "repeat" is no longer supported'),
                  (o = !0)),
                'cover'
              );
            default:
              throw new Error(`Unhandled resizeMode case: ${f}`);
          }
        return 'cover';
      }),
      (e.resolveContentPosition = function (t) {
        if ('string' == typeof t) {
          const o = {
              center: { top: '50%', left: '50%' },
              top: { top: 0, left: '50%' },
              right: { top: '50%', right: 0 },
              bottom: { bottom: 0, left: '50%' },
              left: { top: '50%', left: 0 },
              'top center': { top: 0, left: '50%' },
              'top right': { top: 0, right: 0 },
              'top left': { top: 0, left: 0 },
              'right center': { top: '50%', right: 0 },
              'right top': { top: 0, right: 0 },
              'right bottom': { bottom: 0, right: 0 },
              'bottom center': { bottom: 0, left: '50%' },
              'bottom right': { bottom: 0, right: 0 },
              'bottom left': { bottom: 0, left: 0 },
              'left center': { top: '50%', left: 0 },
              'left top': { top: 0, left: 0 },
              'left bottom': { bottom: 0, left: 0 },
            },
            n = o[t];
          return n || (console.warn(`[expo-image]: Content position "${t}" is invalid`), o.center);
        }
        return t ?? { top: '50%', left: '50%' };
      }),
      (e.resolveTransition = function (t, o) {
        if ('number' == typeof t) return { duration: t };
        if (!t && 'number' == typeof o)
          return (
            n ||
              (console.warn(
                '[expo-image]: Prop "fadeDuration" is deprecated, use "transition" instead'
              ),
              (n = !0)),
            { duration: o }
          );
        return t ?? null;
      }));
    let t = !1,
      o = !1,
      n = !1;
  },
  1684,
  [901]
);
__d(
  function (_g, _r, _i, _a, m, e, d) {
    function t(t) {
      const { PI: r, min: n, max: f, cos: a, round: s } = Math,
        l = t[0] | (t[1] << 8) | (t[2] << 16),
        u = t[3] | (t[4] << 8),
        c = (63 & l) / 63,
        h = ((l >> 6) & 63) / 31.5 - 1,
        i = ((l >> 12) & 63) / 31.5 - 1,
        b = ((l >> 18) & 31) / 31,
        g = l >> 23,
        p = ((u >> 3) & 63) / 63,
        A = ((u >> 9) & 63) / 63,
        T = u >> 15,
        w = f(3, T ? (g ? 5 : 7) : 7 & u),
        x = f(3, T ? 7 & u : g ? 5 : 7),
        H = g ? (15 & t[5]) / 15 : 1,
        R = (t[5] >> 4) / 15,
        U = g ? 6 : 5;
      let y = 0;
      const M = (o, r, n) => {
          const f = [];
          for (let a = 0; a < r; a++)
            for (let s = a ? 0 : 1; s * r < o * (r - a); s++)
              f.push((((t[U + (y >> 1)] >> ((1 & y++) << 2)) & 15) / 7.5 - 1) * n);
          return f;
        },
        _ = M(w, x, b),
        C = M(3, 3, 1.25 * p),
        D = M(3, 3, 1.25 * A),
        L = g ? M(5, 5, R) : null,
        P = o(t),
        v = s(P > 1 ? 32 : 32 * P),
        B = s(P > 1 ? 32 / P : 32),
        G = new Uint8Array(v * B * 4),
        I = [],
        S = [];
      for (let t = 0, o = 0; t < B; t++)
        for (let s = 0; s < v; s++, o += 4) {
          let l = c,
            u = h,
            b = i,
            p = H;
          for (let t = 0, o = f(w, g ? 5 : 3); t < o; t++) I[t] = a((r / v) * (s + 0.5) * t);
          for (let o = 0, n = f(x, g ? 5 : 3); o < n; o++) S[o] = a((r / B) * (t + 0.5) * o);
          for (let t = 0, o = 0; t < x; t++)
            for (let r = t ? 0 : 1, n = 2 * S[t]; r * x < w * (x - t); r++, o++)
              l += _[o] * I[r] * n;
          for (let t = 0, o = 0; t < 3; t++)
            for (let r = t ? 0 : 1, n = 2 * S[t]; r < 3 - t; r++, o++) {
              const t = I[r] * n;
              ((u += C[o] * t), (b += D[o] * t));
            }
          if (g)
            for (let t = 0, o = 0; t < 5; t++)
              for (let r = t ? 0 : 1, n = 2 * S[t]; r < 5 - t; r++, o++) p += L[o] * I[r] * n;
          const A = l - 0.6666666666666666 * u,
            T = (3 * l - A + b) / 2,
            R = T - b;
          ((G[o] = f(0, 255 * n(1, T))),
            (G[o + 1] = f(0, 255 * n(1, R))),
            (G[o + 2] = f(0, 255 * n(1, A))),
            (G[o + 3] = f(0, 255 * n(1, p))));
        }
      return { w: v, h: B, rgba: G };
    }
    function o(t) {
      const o = t[3],
        r = 128 & t[2],
        n = 128 & t[4];
      return (n ? (r ? 5 : 7) : 7 & o) / (n ? 7 & o : r ? 5 : 7);
    }
    function r(t, o, r) {
      const n = 4 * t + 1,
        f = 6 + o * (5 + n),
        a = [
          137,
          80,
          78,
          71,
          13,
          10,
          26,
          10,
          0,
          0,
          0,
          13,
          73,
          72,
          68,
          82,
          0,
          0,
          t >> 8,
          255 & t,
          0,
          0,
          o >> 8,
          255 & o,
          8,
          6,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          f >>> 24,
          (f >> 16) & 255,
          (f >> 8) & 255,
          255 & f,
          73,
          68,
          65,
          84,
          120,
          1,
        ],
        s = [
          0, 498536548, 997073096, 651767980, 1994146192, 1802195444, 1303535960, 1342533948,
          -306674912, -267414716, -690576408, -882789492, -1687895376, -2032938284, -1609899400,
          -1111625188,
        ];
      let l = 1,
        u = 0;
      for (let t = 0, f = 0, s = n - 1; t < o; t++, s += n - 1)
        for (
          a.push(t + 1 < o ? 0 : 1, 255 & n, n >> 8, 255 & ~n, (n >> 8) ^ 255, 0),
            u = (u + l) % 65521;
          f < s;
          f++
        ) {
          const t = 255 & r[f];
          (a.push(t), (l = (l + t) % 65521), (u = (u + l) % 65521));
        }
      a.push(
        u >> 8,
        255 & u,
        l >> 8,
        255 & l,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        73,
        69,
        78,
        68,
        174,
        66,
        96,
        130
      );
      for (let [t, o] of [
        [12, 29],
        [37, 41 + f],
      ]) {
        let r = -1;
        for (let n = t; n < o; n++)
          ((r ^= a[n]), (r = (r >>> 4) ^ s[15 & r]), (r = (r >>> 4) ^ s[15 & r]));
        ((r = ~r),
          (a[o++] = r >>> 24),
          (a[o++] = (r >> 16) & 255),
          (a[o++] = (r >> 8) & 255),
          (a[o++] = 255 & r));
      }
      return 'data:image/png;base64,' + btoa(String.fromCharCode(...a));
    }
    function n(o) {
      const n = t(o);
      return r(n.w, n.h, n.rgba);
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.rgbaToDataURL = r),
      (e.rgbaToThumbHash = function (t, o, r) {
        if (t > 100 || o > 100) throw new Error(`${t}x${o} doesn't fit in 100x100`);
        const { PI: n, round: f, max: a, cos: s, abs: l } = Math;
        let u = 0,
          c = 0,
          h = 0,
          i = 0;
        for (let n = 0, f = 0; n < t * o; n++, f += 4) {
          const t = r[f + 3] / 255;
          ((u += (t / 255) * r[f]),
            (c += (t / 255) * r[f + 1]),
            (h += (t / 255) * r[f + 2]),
            (i += t));
        }
        i && ((u /= i), (c /= i), (h /= i));
        const b = i < t * o,
          g = b ? 5 : 7,
          p = a(1, f((g * t) / a(t, o))),
          A = a(1, f((g * o) / a(t, o))),
          T = [],
          w = [],
          x = [],
          H = [];
        for (let n = 0, f = 0; n < t * o; n++, f += 4) {
          const t = r[f + 3] / 255,
            o = u * (1 - t) + (t / 255) * r[f],
            a = c * (1 - t) + (t / 255) * r[f + 1],
            s = h * (1 - t) + (t / 255) * r[f + 2];
          ((T[n] = (o + a + s) / 3), (w[n] = (o + a) / 2 - s), (x[n] = o - a), (H[n] = t));
        }
        const R = (r, f, u) => {
            let c = 0;
            const h = [];
            let i = 0;
            const b = [];
            for (let g = 0; g < u; g++)
              for (let p = 0; p * u < f * (u - g); p++) {
                let f = 0;
                for (let o = 0; o < t; o++) b[o] = s((n / t) * p * (o + 0.5));
                for (let a = 0; a < o; a++)
                  for (let l = 0, u = s((n / o) * g * (a + 0.5)); l < t; l++)
                    f += r[l + a * t] * b[l] * u;
                ((f /= t * o), p || g ? (h.push(f), (i = a(i, l(f)))) : (c = f));
              }
            if (i) for (let t = 0; t < h.length; t++) h[t] = 0.5 + (0.5 / i) * h[t];
            return [c, h, i];
          },
          [U, y, M] = R(T, a(3, p), a(3, A)),
          [_, C, D] = R(w, 3, 3),
          [L, P, v] = R(x, 3, 3),
          [B, G, I] = b ? R(H, 5, 5) : [],
          S = t > o,
          $ =
            f(63 * U) |
            (f(31.5 + 31.5 * _) << 6) |
            (f(31.5 + 31.5 * L) << 12) |
            (f(31 * M) << 18) |
            ((b ? 1 : 0) << 23),
          j = (S ? A : p) | (f(63 * D) << 3) | (f(63 * v) << 9) | ((S ? 1 : 0) << 15),
          E = [255 & $, ($ >> 8) & 255, $ >> 16, 255 & j, j >> 8],
          O = b ? 6 : 5;
        let k = 0;
        b && E.push(f(15 * B) | (f(15 * I) << 4));
        for (const t of b ? [y, C, P, G] : [y, C, P])
          for (const o of t) E[O + (k >> 1)] |= f(15 * o) << ((1 & k++) << 2);
        return new Uint8Array(E);
      }),
      (e.thumbHashStringToDataURL = function (t) {
        return n(Uint8Array.from(atob(t), t => t.charCodeAt(0)));
      }),
      (e.thumbHashToApproximateAspectRatio = o),
      (e.thumbHashToAverageRGBA = function (t) {
        const { min: o, max: r } = Math,
          n = t[0] | (t[1] << 8) | (t[2] << 16),
          f = (63 & n) / 63,
          a = ((n >> 6) & 63) / 31.5 - 1,
          s = ((n >> 12) & 63) / 31.5 - 1,
          l = n >> 23 ? (15 & t[5]) / 15 : 1,
          u = f - 0.6666666666666666 * a,
          c = (3 * f - u + s) / 2,
          h = c - s;
        return { r: r(0, o(1, c)), g: r(0, o(1, h)), b: r(0, o(1, u)), a: l };
      }),
      (e.thumbHashToDataURL = n),
      (e.thumbHashToRGBA = t));
  },
  1685,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useBlurhash = function (t, c = 1) {
        c = c || 1;
        const [l, s] = (0, h.useState)(null),
          w = (t?.uri && (0, r(d[3]).isBlurhashString)(t.uri)) ?? !1;
        (0, h.useEffect)(() => {
          let h = !1;
          if (!t || !t.uri || !w) return;
          const l = t.uri.replace(/blurhash:\//, ''),
            f = (0, n.default)(l, t.width ?? u.width, t.height ?? u.height, c),
            b = document.createElement('canvas'),
            v = document.createElement('canvas');
          ((b.width = t.width ?? u.width),
            (b.height = t.height ?? u.height),
            (v.width = (t.width ?? u.width) * o),
            (v.height = (t.height ?? u.height) * o));
          const L = b.getContext('2d');
          if (!L) return void console.warn('Failed to decode blurhash');
          const R = L.createImageData(b.width, b.height);
          (R.data.set(f), L.putImageData(R, 0, 0));
          const U = v.getContext('2d');
          if (U)
            return (
              U.scale(o, o),
              U.drawImage(b, 0, 0),
              v.toBlob(t => {
                h || s(h => (h && URL.revokeObjectURL(h), t ? URL.createObjectURL(t) : h));
              }),
              function () {
                ((h = !0), s(t => (t && URL.revokeObjectURL(t), null)));
              }
            );
          console.warn('Failed to decode blurhash');
        }, [t?.uri, t?.height, t?.width, c, w]);
        return [(0, h.useMemo)(() => (l ? { uri: l } : null), [l]), w];
      }));
    var h = r(d[1]),
      n = t(r(d[2]));
    const u = { width: 32, height: 32 },
      o = 10;
  },
  1686,
  [1, 5, 1687, 1680]
);
__d(
  function (_g, _r, _i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.isBlurhashValid = e.default = void 0));
    const t = t => {
      if (!t || t.length < 6)
        throw new (_r(d[0]).ValidationError)('The blurhash string must be at least 6 characters');
      const r = (0, _r(d[1]).decode83)(t[0]),
        o = Math.floor(r / 9) + 1,
        s = (r % 9) + 1;
      if (t.length !== 4 + 2 * s * o)
        throw new (_r(d[0]).ValidationError)(
          `blurhash length mismatch: length is ${t.length} but it should be ${4 + 2 * s * o}`
        );
    };
    e.isBlurhashValid = r => {
      try {
        t(r);
      } catch (t) {
        return { result: !1, errorReason: t.message };
      }
      return { result: !0 };
    };
    const r = t => {
        const r = t >> 16,
          o = (t >> 8) & 255,
          s = 255 & t;
        return [
          (0, _r(d[2]).sRGBToLinear)(r),
          (0, _r(d[2]).sRGBToLinear)(o),
          (0, _r(d[2]).sRGBToLinear)(s),
        ];
      },
      o = (t, r) => {
        const o = Math.floor(t / 361),
          s = Math.floor(t / 19) % 19,
          n = t % 19;
        return [
          (0, _r(d[2]).signPow)((o - 9) / 9, 2) * r,
          (0, _r(d[2]).signPow)((s - 9) / 9, 2) * r,
          (0, _r(d[2]).signPow)((n - 9) / 9, 2) * r,
        ];
      };
    e.default = (s, n, l, i) => {
      (t(s), (i = 1 | (i || 1)));
      const h = (0, _r(d[1]).decode83)(s[0]),
        c = Math.floor(h / 9) + 1,
        u = (h % 9) + 1,
        f = ((0, _r(d[1]).decode83)(s[1]) + 1) / 166,
        g = new Array(u * c);
      for (let t = 0; t < g.length; t++)
        if (0 === t) {
          const o = (0, _r(d[1]).decode83)(s.substring(2, 6));
          g[t] = r(o);
        } else {
          const r = (0, _r(d[1]).decode83)(s.substring(4 + 2 * t, 6 + 2 * t));
          g[t] = o(r, f * i);
        }
      const w = 4 * n,
        M = new Uint8ClampedArray(w * l);
      for (let t = 0; t < l; t++)
        for (let r = 0; r < n; r++) {
          let o = 0,
            s = 0,
            i = 0;
          for (let h = 0; h < c; h++)
            for (let c = 0; c < u; c++) {
              const f = Math.cos((Math.PI * r * c) / n) * Math.cos((Math.PI * t * h) / l),
                w = g[c + h * u];
              ((o += w[0] * f), (s += w[1] * f), (i += w[2] * f));
            }
          const h = (0, _r(d[2]).linearTosRGB)(o),
            f = (0, _r(d[2]).linearTosRGB)(s),
            b = (0, _r(d[2]).linearTosRGB)(i);
          ((M[4 * r + 0 + t * w] = h),
            (M[4 * r + 1 + t * w] = f),
            (M[4 * r + 2 + t * w] = b),
            (M[4 * r + 3 + t * w] = 255));
        }
      return M;
    };
  },
  1687,
  [1688, 1689, 1690]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.ValidationError = void 0));
    class o extends Error {
      constructor(o) {
        (super(o), (this.name = 'ValidationError'), (this.message = o));
      }
    }
    e.ValidationError = o;
  },
  1688,
  []
);
__d(
  function (g, r, _i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.encode83 = e.decode83 = void 0));
    const o = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      '#',
      '$',
      '%',
      '*',
      '+',
      ',',
      '-',
      '.',
      ':',
      ';',
      '=',
      '?',
      '@',
      '[',
      ']',
      '^',
      '_',
      '{',
      '|',
      '}',
      '~',
    ];
    e.decode83 = t => {
      let n = 0;
      for (let c = 0; c < t.length; c++) {
        const l = t[c];
        n = 83 * n + o.indexOf(l);
      }
      return n;
    };
    e.encode83 = (t, n) => {
      let c = '';
      for (let l = 1; l <= n; l++) {
        const f = (Math.floor(t) / Math.pow(83, n - l)) % 83;
        c += o[Math.floor(f)];
      }
      return c;
    };
  },
  1689,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.signPow = e.sign = e.sRGBToLinear = e.linearTosRGB = void 0));
    e.sRGBToLinear = n => {
      const t = n / 255;
      return t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
    };
    e.linearTosRGB = n => {
      const t = Math.max(0, Math.min(1, n));
      return t <= 0.0031308
        ? Math.trunc(12.92 * t * 255 + 0.5)
        : Math.trunc(255 * (1.055 * Math.pow(t, 0.4166666666666667) - 0.055) + 0.5);
    };
    const n = n => (n < 0 ? -1 : 1);
    e.sign = n;
    e.signPow = (t, o) => n(t) * Math.pow(Math.abs(t), o);
  },
  1690,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      const o = String(t).trim();
      return o.endsWith('%') ? o : `${o}px`;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.absoluteFilledPosition = void 0),
      (e.ensureValueIsWebUnits = t),
      (e.getObjectPositionFromContentPositionObject = function (o) {
        const n = Object.assign({}, o);
        if (!n) return '50% 50%';
        null == n.top && null == n.bottom && (n.top = '50%');
        null == n.left && null == n.right && (n.left = '50%');
        return (
          ['top', 'bottom', 'left', 'right']
            .map(o => (o in n ? `${o} ${t(n[o])}` : ''))
            .join(' ') || '50% 50%'
        );
      }));
    e.absoluteFilledPosition = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
    };
  },
  1691,
  []
);
__d(
  function (g, r, i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.getImageWrapperEventHandler = function (n, o) {
        return {
          onLoad: o => {
            (n?.onLoad?.forEach(n => n?.(o)),
              'undefined' != typeof window &&
                window.requestAnimationFrame(() => {
                  n?.onDisplay?.forEach(n => n?.());
                }));
          },
          onTransitionEnd: () => n?.onTransitionEnd?.forEach(n => n?.()),
          onError: () => {
            (o?.uri && (0, r(d[0]).isBlurhashString)(o?.uri)) ||
              n?.onError?.forEach(n => n?.({ source: o || null }));
          },
        };
      }));
  },
  1692,
  [1680]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        if ('undefined' != typeof window) {
          const n = document.createElement('style');
          ((n.innerHTML = t), (n.id = 'expo-image-styles'), document.head.appendChild(n));
        }
      }));
    const t =
      '\n[data-expoimage] .cross-dissolve {\n  transition-property: opacity;\n  animation-fill-mode: forwards;\n}\n[data-expoimage] .cross-dissolve-start:not(.transitioning) {\n  opacity: 0;\n}\n[data-expoimage] .cross-dissolve-active {\n  opacity: 1;\n}\n[data-expoimage] .cross-dissolve-end {\n  opacity: 0;\n}\n[data-expoimage] .flip-from-left {\n  transition-property: transform, opacity;\n  transition-timing-function: var(--expo-image-timing,linear), steps(2, jump-none) !important;\n  transform-origin: center;\n\n}\n[data-expoimage] .flip-from-left-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  perspective: 1000px;\n}\n[data-expoimage] .flip-from-left-start:not(.transitioning) {\n  transform:  translateZ(calc(var(--expo-image-width,1000px) * -1.25)) rotateY(-180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-left-active {\n  transform: translateZ(0px) rotateY(0) ;\n  opacity:1;\n}\n[data-expoimage] .flip-from-left-end {\n  transform:  translateZ(calc(var(--expo-image-width,1000px) * -1.25)) rotateY(180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-right {\n  transition-property: transform, opacity;\n  transition-timing-function: var(--expo-image-timing,linear), steps(2, jump-none) !important;\n  transform-origin: center;\n}\n[data-expoimage] .flip-from-right-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  perspective: 1000px;\n}\n[data-expoimage] .flip-from-right-start:not(.transitioning) {\n  transform:  translateZ(calc(var(--expo-image-width,1000px) * -1.25)) rotateY(180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-right-active {\n  transform: translateZ(0px) rotateY(0) ;\n  opacity:1;\n}\n[data-expoimage] .flip-from-right-end {\n  transform:  translateZ(calc(var(--expo-image-width,1000px) * -1.25)) rotateY(-180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-top {\n  transition-property: transform, opacity;\n  transition-timing-function: var(--expo-image-timing,linear), steps(2, jump-none) !important;\n  transform-origin: center;\n}\n[data-expoimage] .flip-from-top-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  perspective: 1000px;\n}\n[data-expoimage] .flip-from-top-start:not(.transitioning) {\n  transform:  translateZ(calc(var(--expo-image-height,1000px) * -1.5)) rotateX(180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-top-active {\n  transform: translateZ(0px) rotateX(0) ;\n  opacity:1;\n}\n[data-expoimage] .flip-from-top-end {\n  transform:  translateZ(calc(var(--expo-image-height,1000px) * -1.5)) rotateX(-180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-bottom {\n  transition-property: transform, opacity;\n  transition-timing-function: var(--expo-image-timing,linear), steps(2, jump-none) !important;\n  transform-origin: center;\n}\n[data-expoimage] .flip-from-bottom-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  perspective: 1000px;\n}\n[data-expoimage] .flip-from-bottom-start:not(.transitioning) {\n  transform:  translateZ(calc(var(--expo-image-height,1000px) * -1.25)) rotateX(-180deg);\n  opacity: 0;\n}\n[data-expoimage] .flip-from-bottom-active {\n  transform: translateZ(0px) rotateX(0) ;\n  opacity:1;\n}\n[data-expoimage] .flip-from-bottom-end {\n  transform:  translateZ(calc(var(--expo-image-height,1000px) * -1.25)) rotateX(180deg);\n  opacity: 0;\n}\n[data-expoimage] .image-timing-linear {\n  --expo-image-timing: linear;\n}\n[data-expoimage] .image-timing-ease-in {\n  --expo-image-timing: ease-in;\n}\n[data-expoimage] .image-timing-ease-out {\n  --expo-image-timing: ease-out;\n}\n[data-expoimage] .image-timing-ease-in-out {\n  --expo-image-timing: ease-in-out;\n}\n';
  },
  1693,
  []
);
__d(
  function (g, _r, _i, _a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function (t, r = 'static', i, u = null) {
        const o = (Array.isArray(t) ? t.length : 0) > 1,
          [s, c] = (0, e.useState)(i.current?.getBoundingClientRect() ?? null);
        s && i.current && u?.(i.current, s);
        if (
          (e.default.useEffect(() => {
            if ((!o && !u) || !i.current) return () => {};
            if ('live' === r) {
              const e = new ResizeObserver(e => {
                (c(e[0].contentRect), u?.(e[0].target, e[0].contentRect));
              });
              return (
                e.observe(i.current),
                () => {
                  e.disconnect();
                }
              );
            }
            return () => {};
          }, [r, o, i.current, u]),
          (0, _r(d[2]).isImageRef)(t))
        )
          return t;
        return n(t, s, r);
      }));
    var e = (function (e, t) {
      if ('function' == typeof WeakMap)
        var r = new WeakMap(),
          n = new WeakMap();
      return (function (e, t) {
        if (!t && e && e.__esModule) return e;
        var i,
          u,
          o = { __proto__: null, default: e };
        if (null === e || ('object' != typeof e && 'function' != typeof e)) return o;
        if ((i = t ? n : r)) {
          if (i.has(e)) return i.get(e);
          i.set(e, o);
        }
        for (const t in e)
          'default' !== t &&
            {}.hasOwnProperty.call(e, t) &&
            ((u = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
            (u.get || u.set)
              ? i(o, t, u)
              : (o[t] = e[t]));
        return o;
      })(e, t);
    })(_r(d[0]));
    function t(e, t) {
      return 1 === e?.length
        ? e[0]
        : ([...(e || [])]
            ?.map(e => {
              if (!t) return { source: e, penalty: 0, covers: !1 };
              const { width: r, height: n } =
                'object' == typeof e ? e : { width: null, height: null };
              return null == r || null == n
                ? { source: e, penalty: 0, covers: !1 }
                : r < t.width || n < t.height
                  ? { source: e, penalty: Math.max(t.width - r, t.height - n), covers: !1 }
                  : { source: e, penalty: (r - t.width) * (n - t.height), covers: !0 };
            })
            .sort((e, t) => e.penalty - t.penalty)
            .sort((e, t) => Number(t.covers) - Number(e.covers))[0]?.source ?? null);
    }
    function r(e) {
      return `(max-width: ${e.webMaxViewportWidth ?? e.width}px) ${e.width}px`;
    }
    function n(e, n, i) {
      if (null == e || 0 === e.length) return null;
      if (1 === e.length) return e[0];
      if ('static' !== i) return t(e, n);
      const u = e
        .filter(
          e =>
            e.uri &&
            null != e.width &&
            !(0, _r(d[1]).isBlurhashString)(e.uri) &&
            !(0, _r(d[1]).isThumbhashString)(e.uri)
        )
        .sort(
          (e, t) =>
            (e.webMaxViewportWidth ?? e.width ?? 0) - (t.webMaxViewportWidth ?? t.width ?? 0)
        );
      if (0 === u.length)
        return (
          console.warn(
            "You've set the `static` responsivePolicy but none of the sources have the `width` properties set. Make sure you set both `width` and `webMaxViewportWidth` for best results when using static responsiveness. Falling back to the `initial` policy."
          ),
          t(e, n)
        );
      const o = u?.map(e => `${e.uri} ${e.width}w`).join(', ');
      return {
        srcset: o,
        sizes: `${u?.map(r).join(', ')}, ${u[u.length - 1]?.width}px`,
        uri: u[u.length - 1]?.uri ?? '',
        type: 'srcset',
      };
    }
  },
  1694,
  [5, 1680, 1684]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    var o = t(r(d[1]));
    class n extends r(d[2]).NativeModule {
      Image = o.default;
      async prefetch(t, o, n) {
        const s = Array.isArray(t) ? t : [t];
        return new Promise(t => {
          let o = 0;
          s.forEach(n => {
            const c = new Image();
            ((c.src = n),
              (c.onload = () => {
                (o++, o === s.length && t(!0));
              }),
              (c.onerror = () => t(!1)));
          });
        });
      }
      async clearMemoryCache() {
        return !1;
      }
      async clearDiskCache() {
        return !1;
      }
      async loadAsync(t) {
        if (!t.uri) throw new Error('The image source must have the "uri" property defined');
        const n = await fetch(t.uri, { headers: t.headers });
        if (!n.ok) throw new Error(`Image request failed with the status code: ${n.status}`);
        const c = await n.blob(),
          u = URL.createObjectURL(c),
          l = await s(u);
        return o.default.init(u, l.width, l.height, n.headers.get('Content-Type'));
      }
    }
    async function s(t) {
      return new Promise((o, n) => {
        const s = document.createElement('img');
        ((s.onload = () => o(s)),
          (s.onerror = () => n(new Error(`Unable to load the image from '${t}'`))),
          (s.src = t));
      });
    }
    e.default = (0, r(d[2]).registerWebModule)(n, 'ExpoImage');
  },
  1695,
  [1, 1696, 339]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    class t extends r(d[0]).SharedRef {
      nativeRefType = 'image';
      uri = null;
      width = 0;
      height = 0;
      mediaType = null;
      scale = 1;
      isAnimated = !1;
      static init(n, l, s, u) {
        return Object.assign(new t(), {
          uri: n,
          width: l,
          height: s,
          mediaType: u,
          isAnimated: 'image/gif' === u,
        });
      }
    }
    e.default = t;
  },
  1696,
  [901]
);
__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ImageBackground = function (l) {
        let { style: o, imageStyle: y, children: f } = l,
          j = (0, t.default)(l, c);
        return (0, u.jsxs)(n.default, {
          style: o,
          children: [
            (0, u.jsx)(r(d[6]).Image, Object.assign({}, j, { style: [s.default.absoluteFill, y] })),
            f,
          ],
        });
      }));
    var t = l(r(d[1])),
      n = (l(r(d[2])), l(r(d[3]))),
      s = l(r(d[4])),
      u = r(d[5]);
    const c = ['style', 'imageStyle', 'children'];
  },
  1697,
  [1, 4, 5, 19, 26, 183, 1674]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.useImage = function (n, t = {}, u = []) {
        const s = (0, r(d[1]).resolveSource)(n),
          [c, l] = (0, o.useState)(null),
          f = (0, o.useRef)(t);
        return (
          (f.current = t),
          (0, o.useEffect)(() => {
            let o = !0;
            return (
              (function n() {
                r(d[2])
                  .Image.loadAsync(s, t)
                  .then(n => {
                    o && l(n);
                  })
                  .catch(t => {
                    o &&
                      (f.current.onError
                        ? f.current.onError(t, n)
                        : (console.error(
                            `Loading an image from '${s.uri}' failed, use 'onError' option to handle errors and suppress this message`
                          ),
                          console.error(t)));
                  });
              })(),
              () => {
                ((o = !1), c?.release());
              }
            );
          }, [s.uri, ...u]),
          c
        );
      }));
    var o = r(d[0]);
  },
  1698,
  [5, 1680, 1674]
);
__d(function (g, r, i, a, m, e, d) {}, 1699, []);
__d(
  function (g, r, i, a, m, e, d) {
    function t() {
      const t = (0, r(d[0]).getSupabase)();
      return t
        ? { supabase: t, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    async function n(n, s) {
      const { supabase: o, error: l } = t();
      if (l) return { data: null, error: l };
      if (String(n).startsWith('local-') || String(n).startsWith('trip-'))
        return { data: s, error: null };
      const { data: u, error: c } = await o
        .from('mate_trips')
        .update(s)
        .eq('id', n)
        .select()
        .single();
      return { data: u, error: c };
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.completeMateTrip = async function (n, s) {
        const { supabase: o, error: l } = t();
        if (l) return { data: null, error: l };
        if (String(n).startsWith('local-') || String(n).startsWith('trip-'))
          return { data: s, error: null };
        const { data: u, error: c } = await o
          .from('mate_trips')
          .update({
            status: 'completed',
            ended_at: new Date().toISOString(),
            earnings: s.earnings,
            seats_available: s.seatsRemaining,
            boarded_count: s.boarded,
          })
          .eq('id', n)
          .select()
          .single();
        return { data: u, error: c };
      }),
      (e.createMateTrip = async function (n, s, o) {
        const { supabase: l, error: u } = t();
        if (u) return { data: null, error: u };
        const c = {
          mate_id: n,
          station_id: o?.station_id ?? null,
          origin: s.origin,
          destination: s.destination,
          route_label: `${s.origin} \u2192 ${s.destination}`,
          vehicle_type: s.vehicleType,
          plate_number: o?.vehicle_registration ?? s.plateNumber,
          total_seats: s.totalSeats,
          seats_available: s.totalSeats,
          fare_per_seat: s.farePerSeat,
          status: 'active',
          started_at: new Date().toISOString(),
        };
        try {
          const { data: t, error: n } = await l.from('mate_trips').insert(c).select().single();
          return n
            ? (0, r(d[1]).isMissingTableError)(n)
              ? {
                  data: Object.assign({}, c, { id: `local-${Date.now()}`, localOnly: !0 }),
                  error: null,
                }
              : { data: null, error: n }
            : { data: t, error: null };
        } catch (t) {
          return {
            data: Object.assign({}, c, { id: `local-${Date.now()}`, localOnly: !0 }),
            error: null,
          };
        }
      }),
      (e.fetchActiveMateTrip = async function (n) {
        const { supabase: s, error: o } = t();
        if (o) return { data: null, error: o };
        try {
          const { data: t, error: o } = await s
            .from('mate_trips')
            .select('*')
            .eq('mate_id', n)
            .eq('status', 'active')
            .order('started_at', { ascending: !1 })
            .limit(1)
            .maybeSingle();
          return o && (0, r(d[1]).isMissingTableError)(o)
            ? { data: null, error: null }
            : { data: t, error: o };
        } catch {
          return { data: null, error: null };
        }
      }),
      (e.fetchDemandRoutes = async function () {
        const { supabase: n, error: s } = t();
        if (s) return { data: null, error: s };
        try {
          const { data: t, error: s } = await n
            .from('demand_routes')
            .select('*')
            .order('waiting_count', { ascending: !1 });
          return s && (0, r(d[1]).isMissingTableError)(s)
            ? { data: null, error: null }
            : { data: t, error: s };
        } catch {
          return { data: null, error: null };
        }
      }),
      (e.fetchMateEarningsSummary = async function (t) {
        return (0, r(d[2]).fetchMateEarningsSummary)(t);
      }),
      (e.fetchMateTripHistory = async function (t, n = 10) {
        return (0, r(d[2]).fetchMateTripHistory)(t, n);
      }),
      (e.updateMateLocation = async function (t, s, o) {
        return n(t, { latitude: s, longitude: o });
      }),
      (e.updateMateTrip = n));
  },
  1700,
  [502, 558, 687]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      return t?.inviteExpiresAt
        ? t.inviteExpiresAt
        : t?.invitedAt
          ? t.invitedAt + 60 * r(d[0]).MATE_INVITE_EXPIRY_MINUTES * 1e3
          : t?.invited_at
            ? new Date(t.invited_at).getTime() + 60 * r(d[0]).MATE_INVITE_EXPIRY_MINUTES * 1e3
            : null;
    }
    function n(n) {
      const s = t(n);
      return null != s && Date.now() >= s;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.formatWaitMinutes = function (t, n = 0) {
        if ('number' == typeof t) return Math.max(1, t);
        return t
          ? Math.max(1, Math.floor((Date.now() - new Date(t).getTime()) / 6e4))
          : Math.max(1, n);
      }),
      (e.getInviteExpiresAt = t),
      (e.isInviteExpired = n),
      (e.mergeWaitingPassengerLists = function (s = [], v = []) {
        new Set(v.map(t => t.id));
        return v.map(v => {
          const u = s.find(t => t.id === v.id);
          return u && 'invited' === u.status
            ? n(u)
              ? Object.assign({}, v, {
                  status: 'waiting',
                  inviteId: null,
                  inviteMessage: null,
                  invitedAt: null,
                  inviteExpiresAt: null,
                })
              : Object.assign({}, v, {
                  status: 'invited',
                  invitedAt: u.invitedAt ?? v.invitedAt,
                  inviteMessage: u.inviteMessage ?? v.inviteMessage,
                  inviteId: u.inviteId ?? v.inviteId,
                  inviteExpiresAt: t(u) ?? t(v),
                })
            : v;
        });
      }));
  },
  1701,
  [508]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.sendMatePassengerRequest = async function ({
        mateId: t,
        passengerId: n,
        queueId: s,
        trip: l,
        mateProfile: o,
        waitingPassenger: u,
        message: I = '',
      }) {
        if (!t || !s || !l) return { data: null, error: new Error('Missing trip details') };
        if ((l.seatsAvailable ?? 0) <= 0)
          return { data: null, error: new Error('No seats available on this trip.') };
        const c = n ?? u?.passenger_id ?? u?.passengerId ?? null,
          w = new Date(Date.now() + 60 * r(d[0]).MATE_INVITE_EXPIRY_MINUTES * 1e3).toISOString(),
          v = {
            queueId: s,
            mateId: t,
            mateName: o?.full_name ?? 'Mate',
            tripId: l.dbId ?? l.id,
            route: l.route,
            origin: l.origin,
            destination: l.destination,
            farePerSeat: l.farePerSeat,
            plateNumber: o?.vehicle_registration ?? null,
            vehicleType: l.vehicleType ?? o?.vehicle_type ?? 'Trotro',
            pickup: u?.pickup ?? u?.origin ?? l.origin,
            seatsAvailable: l.seatsAvailable,
            totalSeats: l.totalSeats,
            message: I,
            expiresAt: w,
            sentAt: new Date().toISOString(),
          };
        let p = null;
        if (c && !String(s).startsWith('w') && !String(s).startsWith('demo-')) {
          const {
            data: n,
            error: o,
            fallbackLocal: u,
          } = await (0, r(d[1]).createMateInvite)({
            mateId: t,
            passengerId: c,
            queueId: s,
            tripId: l.dbId ?? l.id,
            route: l.route,
            origin: l.origin,
            destination: l.destination,
            pickup: v.pickup,
            farePerSeat: l.farePerSeat,
            plateNumber: v.plateNumber,
            vehicleType: v.vehicleType,
            seatsAvailable: l.seatsAvailable,
            totalSeats: l.totalSeats,
            message: I,
            expiresAt: w,
          });
          if (!o && n) p = n;
          else if (o && !u) return { data: null, error: o };
        }
        let f = null;
        c
          ? ((f = await (0, r(d[2]).saveMateInvite)(
              c,
              Object.assign({}, v, { id: p?.id ?? void 0, localOnly: !p?.id })
            )),
            await (0, r(d[3]).invalidatePassengerTripsCache)(c))
          : (f = await (0, r(d[2]).saveBroadcastMateInvite)(v));
        const { data: h, error: b } = await (0, r(d[4]).invitePassengerFromQueue)(s, t, c);
        if (b)
          return (
            c
              ? (await (0, r(d[2]).withdrawMateInviteByQueue)(c, s),
                await (0, r(d[3]).invalidatePassengerTripsCache)(c))
              : await (0, r(d[2]).withdrawBroadcastMateInvite)(s),
            p?.id && t && (await (0, r(d[1]).withdrawMateInvite)(p.id, t)),
            { data: null, error: b }
          );
        c &&
          (await (0, r(d[2]).markLocalQueueInvited)(c, s, v),
          await (0, r(d[5]).notifyQueueInvite)({
            origin: v.origin ?? l.origin,
            destination: v.destination ?? l.destination,
            mateName: v.mateName,
            userId: c,
            inviteId: p?.id ?? f?.id,
            queueId: s,
          }).catch(() => {}),
          await (0, r(d[3]).invalidatePassengerTripsCache)(c));
        return {
          data: Object.assign({}, h, {
            invite: Object.assign({}, v, { id: p?.id ?? f?.id }),
            inviteId: p?.id ?? f?.id ?? `mate-invite-${s}`,
            remoteInvite: p,
          }),
          error: null,
        };
      }),
      (e.withdrawMatePassengerRequest = async function ({
        mateId: t,
        passengerId: n,
        queueId: s,
        inviteId: l = null,
      }) {
        if (l && t) {
          const { error: n, fallbackLocal: s } = await (0, r(d[1]).withdrawMateInvite)(l, t);
          if (n && !s) return { data: null, error: n };
        } else s && (await (0, r(d[4]).restoreQueueToWaiting)(s));
        n && s
          ? await (0, r(d[2]).withdrawMateInviteByQueue)(n, s)
          : s && (await (0, r(d[2]).withdrawBroadcastMateInvite)(s));
        n && (await (0, r(d[3]).invalidatePassengerTripsCache)(n));
        return { data: { queueId: s, status: 'waiting' }, error: null };
      }));
  },
  1702,
  [508, 937, 935, 755, 1503, 760]
);
__d(
  function (g, _r, i, a, m, e, d) {
    function t(t = []) {
      return t.filter(t => 'confirmed' === t.status).length;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.computeActiveTripMetrics = function (o, r = []) {
        const n = Number(o?.totalSeats ?? 0),
          u = Number(o?.boardedCount ?? 0),
          l = Number(o?.farePerSeat ?? 0),
          s = t(r),
          c = Math.max(0, n - u - s),
          f = Math.max(0, n - u),
          M = Math.round(u * l * 100) / 100,
          h = Math.round(Math.max(0, n - u) * l * 100) / 100,
          b = Math.min(100, Math.round((u / Math.max(n, 1)) * 100));
        return {
          totalSeats: n,
          boardedCount: u,
          farePerSeat: l,
          acceptedReservedCount: s,
          seatsLeftForBooking: c,
          seatsLeftPill: f,
          earnedSoFar: M,
          fullPotential: h,
          fillPercent: b,
          boardingClosed: Boolean(o?.boardingClosed) || 'full' === o?.tripStatus,
        };
      }),
      (e.countAcceptedReservations = t));
  },
  1703,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        vehicleKind: t = 'car',
        title: o = 'Accept deliveries',
        hint: v = 'Receive parcel and food jobs while online.',
      }) {
        const { colors: f } = (0, r(d[9]).useTheme)(),
          p = (0, s.useMemo)(() => u(f), [f]),
          { showToast: h } = (0, r(d[10]).useToast)(),
          {
            isOnline: j,
            goOnline: b,
            goOffline: w,
            loading: x,
            pendingJob: D,
            activeJob: O,
          } = (0, r(d[11]).useDeliveryCourier)();
        return (0, y.jsxs)(n.default, {
          elevated: !0,
          style: { marginBottom: r(d[8]).spacing.md },
          children: [
            (0, y.jsx)(l.default, { style: p.title, children: o }),
            (0, y.jsxs)(l.default, {
              style: p.meta,
              children: [v, D || O ? ' \xb7 ' + (O ? `Active (${O.status})` : 'Incoming job') : ''],
            }),
            (0, y.jsx)(c.default, {
              title: j ? 'Stop accepting deliveries' : 'Accept deliveries',
              variant: j ? 'secondary' : 'primary',
              compact: !0,
              loading: x,
              onPress: async () => {
                if (j) {
                  const { error: t } = await w();
                  return void h(
                    t
                      ? { type: 'error', title: 'Delivery', message: t.message }
                      : {
                          type: 'info',
                          title: 'Deliveries off',
                          message: 'You will only get ride requests.',
                        }
                  );
                }
                const { error: s } = await b({ vehicleKind: t });
                h(
                  s
                    ? { type: 'error', title: 'Delivery', message: s.message }
                    : {
                        type: 'success',
                        title: 'Deliveries on',
                        message: 'Nearby delivery jobs can reach you.',
                      }
                );
              },
            }),
          ],
        });
      }));
    var s = r(d[1]),
      o = t(r(d[2])),
      l = t(r(d[3])),
      n = (t(r(d[4])), t(r(d[5]))),
      c = t(r(d[6])),
      y = r(d[7]);
    const u = t =>
      o.default.create({
        title: {
          fontFamily: r(d[8]).fontFamily.semiBold,
          fontSize: 15,
          color: t.textPrimary,
          marginBottom: 4,
        },
        meta: Object.assign({}, r(d[8]).typography.caption, { marginBottom: r(d[8]).spacing.sm }),
      });
  },
  1704,
  [1, 5, 26, 161, 19, 684, 672, 183, 377, 381, 1386, 1483]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.MATE_POST_DEPART_STEPS =
        e.MATE_PLATFORM_FEE_LABEL =
        e.MATE_PAYOUT_READY_LABEL =
        e.MATE_PAYOUT_HINT =
        e.MATE_EARNINGS_TIPS =
        e.MATE_EARNINGS_INTRO =
          void 0));
    ((e.MATE_EARNINGS_INTRO =
      'Track fare collected on your trotro routes. Cash on board is yours immediately; MoMo/GhQR bookings show here after passengers pay in the app.'),
      (e.MATE_PLATFORM_FEE_LABEL = `${r(d[0]).PLATFORM_FEE_PERCENT}% platform fee applies only to digital (MoMo/GhQR) bookings \u2014 not cash collected on board.`),
      (e.MATE_EARNINGS_TIPS = [
        'Fill every seat before departing \u2014 Ayeduase corridors peak 7\u20139 AM and 5\u20137 PM.',
        'Enable MoMo merchant code in Profile so passengers can pay before boarding.',
        'Board reserved passengers first to avoid no-shows and empty seats.',
        'Repeat high-demand routes (Tech Junction \u2194 Ayeduase) for faster daily totals.',
      ]),
      (e.MATE_PAYOUT_HINT =
        'MoMo payouts settle to your merchant code when passengers pay through the app. Cash fares are collected directly on board.'),
      (e.MATE_PAYOUT_READY_LABEL =
        'Ready for MoMo settlement (after platform fee on digital fares)'),
      (e.MATE_POST_DEPART_STEPS = [
        'Passengers on Find Ride can now see your route and reserve seats.',
        'Tap Invite all to send ride requests to everyone in the queue (up to seats left).',
        'Tap +1 Passenger onboarded as each person pays and boards.',
      ]));
  },
  1705,
  [508]
);
__d(
  function (g, r, i, a, m, e, _d) {
    var t = r(_d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        period: t,
        onPeriodChange: o,
        periodOptions: x = [
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: '30 days' },
        ],
        headlineAmount: j = 0,
        headlineEyebrow: w = 'Earnings',
        metaLine: F = '',
        takeHomeLine: v = null,
        weekDays: k = [],
        selectedDayKey: C = null,
        onSelectDay: T,
        cashOut: O = null,
        breakdown: B = [],
        activity: A = [],
        emptyActivityText: L = 'Complete trips to see activity here.',
        tips: S = [],
        footer: z = null,
      }) {
        const { colors: P } = (0, r(_d[10]).useTheme)(),
          R = p(P),
          H = Math.max(...k.map(t => t.amount), 0.01);
        return (0, u.jsxs)(s.default, {
          children: [
            (0, u.jsx)(s.default, {
              style: R.periodWrap,
              children: (0, u.jsx)(y.default, { options: x, value: t, onChange: o }),
            }),
            (0, u.jsxs)(d.default, {
              elevated: !0,
              style: R.heroCard,
              children: [
                (0, u.jsx)(n.default, { style: R.periodEyebrow, children: w }),
                (0, u.jsx)(n.default, {
                  style: R.heroAmount,
                  children: (0, r(_d[11]).formatGhs)(j),
                }),
                F ? (0, u.jsx)(n.default, { style: R.heroMeta, children: F }) : null,
                v ? (0, u.jsx)(n.default, { style: R.takeHome, children: v }) : null,
              ],
            }),
            k.length > 0 && 'week' === t
              ? (0, u.jsxs)(d.default, {
                  elevated: !0,
                  style: R.chartCard,
                  children: [
                    (0, u.jsx)(n.default, { style: R.chartTitle, children: 'This week' }),
                    (0, u.jsx)(s.default, {
                      style: R.chartRow,
                      children: k.map(t => {
                        const o = C === t.key,
                          d = t.isFuture ? h : Math.max(h, Math.round((t.amount / H) * f));
                        return (0, u.jsxs)(
                          l.default,
                          {
                            style: R.dayCol,
                            disabled: t.isFuture,
                            onPress: () => T?.(o ? null : t.key),
                            accessibilityRole: 'button',
                            accessibilityLabel: `${t.label} ${(0, r(_d[11]).formatGhs)(t.amount)}`,
                            children: [
                              (0, u.jsx)(s.default, {
                                style: R.barTrack,
                                children: (0, u.jsx)(s.default, {
                                  style: [
                                    R.bar,
                                    { height: d },
                                    t.isToday && !o && R.barToday,
                                    o && R.barActive,
                                    t.isFuture && { opacity: 0.25 },
                                  ],
                                }),
                              }),
                              (0, u.jsx)(n.default, {
                                style: [R.dayLabel, o && R.dayLabelActive],
                                children: t.label,
                              }),
                              !t.isFuture && t.amount > 0
                                ? (0, u.jsx)(n.default, {
                                    style: R.dayAmount,
                                    children: t.amount.toFixed(0),
                                  })
                                : (0, u.jsx)(n.default, { style: R.dayAmount, children: ' ' }),
                            ],
                          },
                          t.key
                        );
                      }),
                    }),
                  ],
                })
              : null,
            O
              ? (0, u.jsxs)(d.default, {
                  elevated: !0,
                  style: R.cashOutCard,
                  children: [
                    (0, u.jsxs)(s.default, {
                      style: R.cashOutRow,
                      children: [
                        (0, u.jsx)(r(_d[12]).Ionicons, {
                          name: O.ready ? 'flash' : 'wallet-outline',
                          size: 28,
                          color: P.success,
                        }),
                        (0, u.jsxs)(s.default, {
                          style: { flex: 1 },
                          children: [
                            (0, u.jsx)(n.default, { style: R.cashOutLabel, children: O.label }),
                            (0, u.jsx)(n.default, {
                              style: R.cashOutValue,
                              children: (0, r(_d[11]).formatGhs)(O.available),
                            }),
                            O.hint
                              ? (0, u.jsx)(n.default, { style: R.cashOutHint, children: O.hint })
                              : null,
                          ],
                        }),
                      ],
                    }),
                    O.onCta
                      ? (0, u.jsx)(c.default, {
                          title: O.ctaTitle ?? 'Cash out',
                          onPress: O.onCta,
                          compact: !0,
                        })
                      : null,
                    O.secondaryCta
                      ? (0, u.jsx)(l.default, {
                          onPress: O.secondaryCta.onPress,
                          children: (0, u.jsx)(n.default, {
                            style: R.cashOutLink,
                            children: O.secondaryCta.label,
                          }),
                        })
                      : null,
                  ],
                })
              : null,
            B.length > 0
              ? (0, u.jsxs)(d.default, {
                  elevated: !0,
                  children: [
                    (0, u.jsx)(n.default, { style: R.sectionTitle, children: 'Fare breakdown' }),
                    B.map((t, l) => {
                      const o = l === B.length - 1;
                      return (0, u.jsxs)(
                        s.default,
                        {
                          style: [R.breakdownRow, o && R.breakdownRowLast],
                          children: [
                            (0, u.jsx)(n.default, { style: R.breakdownLabel, children: t.label }),
                            (0, u.jsx)(n.default, { style: b(R, t.tone), children: t.value }),
                          ],
                        },
                        t.label
                      );
                    }),
                  ],
                })
              : null,
            (0, u.jsx)(n.default, { style: R.sectionTitle, children: 'Activity' }),
            0 === A.length
              ? (0, u.jsx)(d.default, {
                  elevated: !0,
                  children: (0, u.jsx)(n.default, { style: R.empty, children: L }),
                })
              : A.map(t =>
                  (0, u.jsxs)(
                    d.default,
                    {
                      elevated: !0,
                      style: R.activityCard,
                      children: [
                        (0, u.jsxs)(s.default, {
                          style: R.activityTop,
                          children: [
                            (0, u.jsx)(n.default, {
                              style: R.activityTitle,
                              numberOfLines: 2,
                              children: t.title,
                            }),
                            (0, u.jsx)(n.default, {
                              style: R.activityAmount,
                              children: t.amountLabel,
                            }),
                          ],
                        }),
                        t.subtitle
                          ? (0, u.jsx)(n.default, { style: R.activityMeta, children: t.subtitle })
                          : null,
                      ],
                    },
                    t.id
                  )
                ),
            z ? (0, u.jsx)(s.default, { style: R.footerGap, children: z }) : null,
            S.length > 0
              ? (0, u.jsx)(d.default, {
                  elevated: !0,
                  children: S.map(t =>
                    (0, u.jsxs)(
                      s.default,
                      {
                        style: R.tipRow,
                        children: [
                          (0, u.jsx)(r(_d[12]).Ionicons, {
                            name: 'bulb-outline',
                            size: 16,
                            color: P.primary,
                          }),
                          (0, u.jsx)(n.default, { style: R.tipText, children: t }),
                        ],
                      },
                      t
                    )
                  ),
                })
              : null,
          ],
        });
      }));
    var l = t(r(_d[1])),
      o = t(r(_d[2])),
      n = t(r(_d[3])),
      s = t(r(_d[4])),
      d = t(r(_d[5])),
      c = t(r(_d[6])),
      y = t(r(_d[7])),
      u = r(_d[8]);
    const f = 88,
      h = 6,
      p = t =>
        o.default.create({
          periodWrap: { marginBottom: r(_d[9]).spacing.lg },
          heroCard: { marginBottom: r(_d[9]).spacing.md },
          periodEyebrow: Object.assign({}, r(_d[9]).typography.label, {
            marginBottom: r(_d[9]).spacing.xs,
            textTransform: 'uppercase',
            letterSpacing: 0.4,
          }),
          heroAmount: {
            fontFamily: r(_d[9]).fontFamily.bold,
            fontSize: 40,
            color: t.textPrimary,
            letterSpacing: -0.5,
          },
          heroMeta: Object.assign({}, r(_d[9]).typography.body, {
            color: t.textSecondary,
            marginTop: r(_d[9]).spacing.xs,
          }),
          takeHome: {
            fontFamily: r(_d[9]).fontFamily.semiBold,
            fontSize: 14,
            color: t.success,
            marginTop: r(_d[9]).spacing.sm,
          },
          chartCard: { marginBottom: r(_d[9]).spacing.md },
          chartTitle: {
            fontFamily: r(_d[9]).fontFamily.semiBold,
            fontSize: 15,
            color: t.textPrimary,
            marginBottom: r(_d[9]).spacing.md,
          },
          chartRow: {
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 4,
            minHeight: 124,
          },
          dayCol: { flex: 1, alignItems: 'center', gap: 6 },
          barTrack: {
            width: '70%',
            maxWidth: 28,
            height: f,
            justifyContent: 'flex-end',
            alignItems: 'center',
          },
          bar: {
            width: '100%',
            borderRadius: r(_d[9]).radius.sm,
            backgroundColor: t.primaryAlpha18 ?? t.border,
            minHeight: h,
          },
          barActive: { backgroundColor: t.primary },
          barToday: { backgroundColor: t.primaryLight ?? t.primary },
          dayLabel: { fontFamily: r(_d[9]).fontFamily.medium, fontSize: 11, color: t.textMuted },
          dayLabelActive: { color: t.primary, fontFamily: r(_d[9]).fontFamily.bold },
          dayAmount: {
            fontFamily: r(_d[9]).fontFamily.medium,
            fontSize: 9,
            color: t.textMuted,
            textAlign: 'center',
          },
          cashOutCard: {
            marginBottom: r(_d[9]).spacing.md,
            borderColor: t.greenAccent ?? t.primaryAlpha18,
            backgroundColor: t.greenAlpha12 ?? t.primaryAlpha06,
          },
          cashOutRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: r(_d[9]).spacing.md,
            marginBottom: r(_d[9]).spacing.md,
          },
          cashOutLabel: {
            fontFamily: r(_d[9]).fontFamily.semiBold,
            fontSize: 14,
            color: t.textPrimary,
            marginBottom: 2,
          },
          cashOutValue: { fontFamily: r(_d[9]).fontFamily.bold, fontSize: 26, color: t.success },
          cashOutHint: Object.assign({}, r(_d[9]).typography.caption, {
            lineHeight: 16,
            marginTop: 2,
          }),
          cashOutLink: {
            fontFamily: r(_d[9]).fontFamily.semiBold,
            color: t.primary,
            marginTop: r(_d[9]).spacing.sm,
          },
          sectionTitle: {
            fontFamily: r(_d[9]).fontFamily.semiBold,
            fontSize: 16,
            color: t.textPrimary,
            marginBottom: r(_d[9]).spacing.sm,
          },
          breakdownRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: r(_d[9]).spacing.sm,
            borderBottomWidth: o.default.hairlineWidth,
            borderBottomColor: t.border,
          },
          breakdownRowLast: { borderBottomWidth: 0, paddingTop: r(_d[9]).spacing.md },
          breakdownLabel: Object.assign({}, r(_d[9]).typography.body),
          breakdownValue: { fontFamily: r(_d[9]).fontFamily.medium, color: t.textPrimary },
          breakdownFee: { fontFamily: r(_d[9]).fontFamily.medium, color: t.destructive ?? t.error },
          breakdownNet: { fontFamily: r(_d[9]).fontFamily.bold, fontSize: 17, color: t.success },
          activityCard: { marginBottom: r(_d[9]).spacing.sm },
          activityTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: r(_d[9]).spacing.sm,
            marginBottom: r(_d[9]).spacing.xs,
          },
          activityTitle: {
            fontFamily: r(_d[9]).fontFamily.semiBold,
            fontSize: 15,
            color: t.textPrimary,
            flex: 1,
          },
          activityAmount: { fontFamily: r(_d[9]).fontFamily.bold, fontSize: 16, color: t.success },
          activityMeta: Object.assign({}, r(_d[9]).typography.caption),
          empty: Object.assign({}, r(_d[9]).typography.body, { lineHeight: 20 }),
          tipRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: r(_d[9]).spacing.sm,
            marginBottom: r(_d[9]).spacing.sm,
          },
          tipText: Object.assign({}, r(_d[9]).typography.caption, { flex: 1, lineHeight: 18 }),
          footerGap: { marginTop: r(_d[9]).spacing.md, marginBottom: r(_d[9]).spacing.md },
        });
    function b(t, l) {
      return 'fee' === l ? t.breakdownFee : 'net' === l ? t.breakdownNet : t.breakdownValue;
    }
  },
  1706,
  [1, 326, 26, 161, 19, 684, 672, 1535, 183, 377, 381, 691, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.LinearGradient = void 0));
    var n = t(r(d[1])),
      o = r(d[2]),
      s = (t(r(d[3])), t(r(d[4])), t(r(d[5]))),
      l = r(d[6]);
    const c = ['colors', 'locations', 'start', 'end', 'dither'];
    class h extends o.Component {
      render() {
        const t = this.props,
          { colors: o, locations: h, start: u, end: y, dither: p } = t,
          v = (0, n.default)(t, c);
        let x = h;
        return (
          h &&
            o.length !== h.length &&
            (console.warn(
              'LinearGradient colors and locations props should be arrays of the same length'
            ),
            (x = h.slice(0, o.length))),
          (0, l.jsx)(
            s.default,
            Object.assign({}, v, {
              colors: o,
              dither: void 0,
              locations: x,
              startPoint: f(u),
              endPoint: f(y),
            })
          )
        );
      }
    }
    function f(t) {
      if (t) {
        if (!Array.isArray(t) || 2 === t.length) return Array.isArray(t) ? t : [t.x, t.y];
        console.warn(
          'start and end props for LinearGradient must be of the format [x,y] or {x, y}'
        );
      }
    }
    e.LinearGradient = h;
  },
  1707,
  [1, 4, 5, 14, 37, 1708, 183]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var t = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function (t) {
        let { colors: l, locations: c, startPoint: s, endPoint: f } = t,
          h = (0, e.default)(t, i);
        const [{ height: y, width: p }, M] = n.useState({ height: 1, width: 1 }),
          _ = n.useMemo(() => u(l, c, s, f, p, y), [l, c, s, f, p, y]);
        return (0, o.jsx)(
          r.default,
          Object.assign({}, h, {
            style: [h.style, { backgroundImage: _ }],
            onLayout: t => {
              const { width: e, height: n } = t.nativeEvent.layout;
              (M(t => (e !== t.width || n !== t.height ? { height: n, width: e } : t)),
                h.onLayout && h.onLayout(t));
            },
          })
        );
      }),
      (_e.getLinearGradientBackgroundImage = u));
    var e = t(_r(d[1])),
      n = (function (t, e) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            r = new WeakMap();
        return (function (t, e) {
          if (!e && t && t.__esModule) return t;
          var o,
            i,
            u = { __proto__: null, default: t };
          if (null === t || ('object' != typeof t && 'function' != typeof t)) return u;
          if ((o = e ? r : n)) {
            if (o.has(t)) return o.get(t);
            o.set(t, u);
          }
          for (const e in t)
            'default' !== e &&
              {}.hasOwnProperty.call(t, e) &&
              ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(t, e)) &&
              (i.get || i.set)
                ? o(u, e, i)
                : (u[e] = t[e]));
          return u;
        })(t, e);
      })(_r(d[2])),
      r = t(_r(d[3])),
      o = _r(d[4]);
    const i = ['colors', 'locations', 'startPoint', 'endPoint'];
    function u(t, e, n, r, o = 1, i = 1) {
      const u = c(t, e);
      return `linear-gradient(${l(o, i, n, r)}deg, ${u.join(', ')})`;
    }
    function l(t, e, n, r) {
      const [o, i] = (() => {
        let t = [0, 0];
        Array.isArray(n) && (t = [null != n[0] ? n[0] : 0, null != n[1] ? n[1] : 0]);
        let e = [0, 1];
        return (
          Array.isArray(r) && (e = [null != r[0] ? r[0] : 0, null != r[1] ? r[1] : 1]),
          [t, e]
        );
      })();
      ((o[0] *= t), (i[0] *= t), (o[1] *= e), (i[1] *= e));
      const u = i[1] - o[1],
        l = i[0] - o[0];
      return 90 + (180 * Math.atan2(u, l)) / Math.PI;
    }
    function c(t, e) {
      return t.map((t, n) => {
        const r = (0, _r(d[5]).normalizeColor)(t);
        if (e && e[n]) {
          return `${r} ${100 * Math.max(0, Math.min(1, e[n]))}%`;
        }
        return r;
      });
    }
  },
  1708,
  [1, 4, 5, 19, 183, 1709]
);
__d(
  function (_g, _r, i, _a, m, e, d) {
    var r = _r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.normalizeColor = function (r, o = 1) {
        if (null == r) return;
        if ('string' == typeof r && t(r)) return r;
        const u = (0, n.default)(r);
        if ('number' == typeof u) {
          return `rgba(${(u >> 16) & 255},${(u >> 8) & 255},${255 & u},${((((u >> 24) & 255) / 255) * o).toFixed(2)})`;
        }
      }));
    var n = r(_r(d[1]));
    const t = r =>
      'currentcolor' === r || 'currentColor' === r || 'inherit' === r || 0 === r.indexOf('var(');
  },
  1709,
  [1, 37]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        title: t,
        subtitle: s,
        children: f,
        headerRight: b,
        refreshControl: x,
      }) {
        const y = (0, r(d[8]).useNavigation)(),
          { colors: j } = (0, r(d[9]).useTheme)(),
          { t: p } = (0, r(d[10]).useLanguage)(),
          k = h(j);
        return (0, u.jsxs)(c.default, {
          title: t,
          subtitle: s,
          scroll: !0,
          headerRight: b,
          refreshControl: x,
          children: [
            (0, u.jsx)(l.default, {
              style: k.backRow,
              onPress: () => y.goBack(),
              hitSlop: 12,
              children: (0, u.jsxs)(o.default, {
                style: { flexDirection: 'row', alignItems: 'center', gap: 4 },
                children: [
                  (0, u.jsx)(r(d[11]).Ionicons, {
                    name: 'chevron-back',
                    size: 20,
                    color: j.primary,
                  }),
                  (0, u.jsx)(n.default, { style: k.backText, children: p('common.back') }),
                ],
              }),
            }),
            (0, u.jsx)(o.default, { style: k.content, children: f }),
          ],
        });
      }));
    var l = t(r(d[1])),
      n = t(r(d[2])),
      o = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = r(d[6]);
    const h = t =>
      s.default.create({
        backRow: { marginBottom: r(d[7]).spacing.md, alignSelf: 'flex-start' },
        backText: Object.assign({}, r(d[7]).typography.subheading, { color: t.primary }),
        content: { flex: 1 },
      });
  },
  1710,
  [1, 326, 161, 19, 26, 1510, 183, 377, 382, 381, 1381, 578]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.buildLandmarkLocation = function (t) {
        const n = (0, _r(d[3]).resolveLocationCoords)(t);
        return n?.latitude && n?.longitude
          ? e({
              latitude: n.latitude,
              longitude: n.longitude,
              label: n.label ?? t,
              accuracy: null,
              source: 'landmark',
            })
          : null;
      }),
      (_e.buildMyLocationRecord = e),
      (_e.captureGpsLocation = async function () {
        const { status: r } = await t.requestForegroundPermissionsAsync();
        if ('granted' !== r) return { data: null, error: new Error('Location permission denied') };
        const o = await t.getCurrentPositionAsync({ accuracy: t.Accuracy.Balanced });
        let u = 'Current location';
        try {
          const [e] = await t.reverseGeocodeAsync({
            latitude: o.coords.latitude,
            longitude: o.coords.longitude,
          });
          e && (u = [e.name, e.street, e.city || e.subregion].filter(Boolean).join(', '));
        } catch {
          const t = n(o.coords.latitude, o.coords.longitude);
          t && (u = `Near ${t.label}`);
        }
        return {
          data: e({
            latitude: o.coords.latitude,
            longitude: o.coords.longitude,
            label: u,
            accuracy: o.coords.accuracy ?? null,
            source: 'gps',
          }),
          error: null,
        };
      }),
      (_e.findNearestLandmark = n),
      (_e.formatCoordinates = function (t, e) {
        return null == t || null == e ? '' : `${t.toFixed(5)}, ${e.toFixed(5)}`;
      }),
      (_e.formatDistanceKm = function (t) {
        return null == t || Number.isNaN(t)
          ? ''
          : t < 1
            ? `${Math.round(1e3 * t)} m away`
            : `${t.toFixed(1)} km away`;
      }),
      (_e.formatLocationUpdated = function (t, e = 'en-GH') {
        if (!t) return '\u2014';
        try {
          return new Date(t).toLocaleString(e, { dateStyle: 'medium', timeStyle: 'short' });
        } catch {
          return String(t);
        }
      }),
      (_e.getLocationPermissionStatus = async function () {
        try {
          const { status: e, canAskAgain: n } = await t.getForegroundPermissionsAsync();
          return { status: e, canAskAgain: n };
        } catch {
          return { status: 'undetermined', canAskAgain: !0 };
        }
      }));
    var t = (function (t, e) {
      if ('function' == typeof WeakMap)
        var n = new WeakMap(),
          r = new WeakMap();
      return (function (t, e) {
        if (!e && t && t.__esModule) return t;
        var o,
          u,
          i = { __proto__: null, default: t };
        if (null === t || ('object' != typeof t && 'function' != typeof t)) return i;
        if ((o = e ? r : n)) {
          if (o.has(t)) return o.get(t);
          o.set(t, i);
        }
        for (const e in t)
          'default' !== e &&
            {}.hasOwnProperty.call(t, e) &&
            ((u = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(t, e)) &&
            (u.get || u.set)
              ? o(i, e, u)
              : (i[e] = t[e]));
        return i;
      })(t, e);
    })(_r(d[0]));
    function e({ latitude: t, longitude: e, label: r, accuracy: o = null, source: u = 'gps' }) {
      const i = n(t, e);
      return {
        latitude: t,
        longitude: e,
        label: r?.trim() || i?.label || 'Current location',
        updatedAt: new Date().toISOString(),
        accuracy: o,
        source: u,
        nearestLandmark: i?.label ?? null,
      };
    }
    function n(t, e) {
      if (null == t || null == e) return null;
      let n = null,
        r = 1 / 0;
      return (
        _r(d[1]).LOCATION_LANDMARKS.forEach(o => {
          const u = (0, _r(d[2]).haversineKm)(t, e, o.latitude, o.longitude);
          null != u && u < r && ((r = u), (n = Object.assign({}, o, { distanceKm: u })));
        }),
        n
      );
    }
  },
  1711,
  [1493, 1712, 1513, 1507]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.PERMISSION_COPY =
        e.MY_LOCATION_USES =
        e.MY_LOCATION_TIPS =
        e.MY_LOCATION_INTRO =
        e.LOCATION_LANDMARKS =
          void 0),
      (e.formatAccuracyMeters = function (o) {
        return null == o || Number.isNaN(o)
          ? null
          : o < 20
            ? 'High accuracy GPS'
            : o < 80
              ? 'Good accuracy'
              : 'Approximate GPS';
      }));
    ((e.MY_LOCATION_INTRO =
      'Your saved location powers pickup ETAs on Find Ride, My Trips, and scheduled departures. Drivers never see it until you book.'),
      (e.LOCATION_LANDMARKS = [
        ...r(d[0]).TROTRORIDE_HOT_ZONES.map(({ label: o, latitude: t, longitude: n }) => ({
          label: o,
          latitude: t,
          longitude: n,
        })),
        { label: 'Bantama', latitude: 6.696, longitude: -1.628 },
        { label: 'Adum', latitude: 6.69, longitude: -1.621 },
        { label: 'Kejetia', latitude: 6.672, longitude: -1.567 },
      ].filter((o, t, n) => n.findIndex(t => t.label === o.label) === t)),
      (e.MY_LOCATION_USES = [
        { icon: 'navigate-outline', text: 'Accurate pickup ETAs when a driver is en route' },
        { icon: 'search-outline', text: 'One-tap \u201cUse saved location\u201d on Find Ride' },
        { icon: 'calendar-outline', text: 'Default origin for scheduled ride reminders' },
        { icon: 'shield-outline', text: 'Never shared publicly \u2014 only for trips you book' },
      ]),
      (e.MY_LOCATION_TIPS = [
        'Update after moving dorms, workplaces, or regular stops in Kumasi.',
        'GPS works best outdoors \u2014 if indoors, pick the nearest landmark below.',
        'You can also save Home and Work under Saved Places for quick route entry.',
        'Turn off location sharing anytime in Privacy settings.',
      ]),
      (e.PERMISSION_COPY = {
        granted: {
          title: 'Location access enabled',
          body: 'TrotroOS can use GPS for pickup ETAs and nearby ride suggestions.',
          icon: 'checkmark-circle',
        },
        denied: {
          title: 'Location access blocked',
          body: 'Enable location in phone settings, or pick a Kumasi landmark manually below.',
          icon: 'alert-circle',
        },
        undetermined: {
          title: 'Allow location access',
          body: 'GPS gives the most accurate pickup ETAs. You can also set a landmark manually.',
          icon: 'location-outline',
        },
      }));
  },
  1712,
  [759]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t = [], n) {
      return t.filter(t => t !== n);
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.addFavoriteRouteIds = function (t = [], n = [], o = 8) {
        const s = [...t];
        return (
          n.forEach(t => {
            s.includes(t) || s.length >= o || s.push(t);
          }),
          s
        );
      }),
      (e.enrichRoute = function (t) {
        const n = (0, r(d[1]).compareCorridorPricing)(t.origin, t.destination);
        return Object.assign({}, t, {
          pricing: n,
          fareLabel: `GHS ${t.baseFare.toFixed(2)}`,
          metaLabel: `~${t.avgTimeMin} min \xb7 ${t.distanceKm} km`,
          savingsLabel:
            n.savingsVsBolt > 0 ? `Save ~GHS ${n.savingsVsBolt.toFixed(0)} vs Bolt` : null,
        });
      }),
      (e.filterRoutes = function (t, n) {
        const o = String(n ?? '')
          .trim()
          .toLowerCase();
        return o
          ? t.filter(
              t =>
                t.origin.toLowerCase().includes(o) ||
                t.destination.toLowerCase().includes(o) ||
                `${t.origin} ${t.destination}`.toLowerCase().includes(o)
            )
          : t;
      }),
      (e.findReverseRoute = function (t) {
        return r(d[0]).TROTRO_ROUTES.find(
          n => n.origin === t.destination && n.destination === t.origin
        );
      }),
      (e.getAvailableRoutes = function (t = []) {
        const n = new Set(t);
        return r(d[0]).TROTRO_ROUTES.filter(t => !n.has(t.id));
      }),
      (e.getFavoriteRoutes = function (t = []) {
        const n = new Set(t);
        return r(d[0]).TROTRO_ROUTES.filter(t => n.has(t.id));
      }),
      (e.removeFavoriteRouteId = t),
      (e.routeToQuickRoute = function (t) {
        return {
          id: t.id,
          origin: t.origin,
          destination: t.destination,
          fare: Math.round(t.baseFare),
        };
      }),
      (e.toggleFavoriteRouteId = function (n = [], o, s = 8) {
        if (n.includes(o)) return t(n, o);
        return n.length >= s ? n : [...n, o];
      }));
  },
  1713,
  [682, 1509]
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        origin: o,
        destination: c,
        onOriginChange: u,
        onDestinationChange: h,
        onSwap: j,
        savedPlaces: C = [],
        myLocationLabel: S = null,
        enableLocationPicker: v = !1,
        showSavedPlaceChips: w = !1,
        requireOriginFirst: B = !0,
      }) {
        const { colors: T } = (0, r(d[13]).useTheme)(),
          F = (0, t.useMemo)(() => b(T), [T]),
          [P, R] = (0, t.useState)(null),
          [L, z] = (0, t.useState)(null),
          W = (0, t.useMemo)(() => (0, r(d[12]).buildKumasiLocationPool)(C), [C]),
          I = Boolean(o?.trim()),
          k = !B || I,
          H = () => z('origin'),
          M = () => z('destination'),
          D = (0, t.useMemo)(
            () => ('origin' === P ? (0, r(d[12]).searchLocations)(W, o) : []),
            [P, W, o]
          ),
          O = (0, t.useMemo)(
            () => ('destination' === P ? (0, r(d[12]).searchLocations)(W, c) : []),
            [P, W, c]
          ),
          A = (o, t) => {
            const n = o.label || o.address;
            n && ('origin' === t ? u(n) : h(n));
          };
        return (0, x.jsxs)(n.default, {
          style: F.wrap,
          children: [
            (0, x.jsx)(s.default, { style: F.sectionLabel, children: 'Route' }),
            (0, x.jsx)(y, {
              label: 'From',
              value: o,
              placeholder: 'Where are you now?',
              focused: 'origin' === P,
              onFocus: () => R('origin'),
              onBlur: () => setTimeout(() => R(o => ('origin' === o ? null : o)), 280),
              onChangeText: u,
              suggestions: D,
              showSimilarHeader: (0, r(d[12]).hasSimilarMatches)(D),
              query: o,
              onSelect: u,
              dotColor: T.success,
              ringColor: T.successSoft,
              onBrowse: v ? H : void 0,
              onChevronPress: v ? H : void 0,
              styles: F,
              colors: T,
            }),
            (0, x.jsx)(n.default, {
              style: F.betweenFields,
              children:
                I && c?.trim() && j
                  ? (0, x.jsx)(l.default, {
                      style: F.swapBtn,
                      onPress: j,
                      hitSlop: 8,
                      children: (0, x.jsx)(r(d[11]).Ionicons, {
                        name: 'swap-vertical',
                        size: 16,
                        color: T.textSecondary,
                      }),
                    })
                  : null,
            }),
            (0, x.jsx)(y, {
              label: 'To',
              value: c,
              placeholder: k ? 'Where are you going?' : 'Pick departure first',
              disabled: !k,
              focused: 'destination' === P,
              onFocus: () => R('destination'),
              onBlur: () => setTimeout(() => R(o => ('destination' === o ? null : o)), 280),
              onChangeText: h,
              suggestions: O,
              showSimilarHeader: (0, r(d[12]).hasSimilarMatches)(O),
              query: c,
              onSelect: h,
              dotColor: T.primary,
              ringColor: T.primaryAlpha12,
              onBrowse: v ? M : void 0,
              onChevronPress: v ? M : void 0,
              styles: F,
              colors: T,
            }),
            w && C.length > 0
              ? (0, x.jsxs)(x.Fragment, {
                  children: [
                    (0, x.jsx)(s.default, { style: F.savedTitle, children: 'Saved places' }),
                    (0, x.jsx)(p.default, {
                      horizontal: !0,
                      showsHorizontalScrollIndicator: !1,
                      contentContainerStyle: F.savedScroll,
                      children: C.map(o =>
                        (0, x.jsxs)(
                          n.default,
                          {
                            style: F.savedChipRow,
                            children: [
                              (0, x.jsx)(l.default, {
                                style: F.savedChip,
                                onPress: () => A(o, 'origin'),
                                children: (0, x.jsxs)(s.default, {
                                  style: F.savedChipText,
                                  numberOfLines: 1,
                                  children: ['From \xb7 ', o.label],
                                }),
                              }),
                              (0, x.jsx)(l.default, {
                                style: F.savedChip,
                                onPress: () => A(o, 'destination'),
                                children: (0, x.jsxs)(s.default, {
                                  style: F.savedChipText,
                                  numberOfLines: 1,
                                  children: ['To \xb7 ', o.label],
                                }),
                              }),
                            ],
                          },
                          o.id
                        )
                      ),
                    }),
                  ],
                })
              : null,
            S
              ? (0, x.jsxs)(l.default, {
                  style: F.myLoc,
                  onPress: () => u(S),
                  children: [
                    (0, x.jsx)(r(d[11]).Ionicons, {
                      name: 'locate-outline',
                      size: 15,
                      color: T.greenAccent,
                    }),
                    (0, x.jsxs)(s.default, {
                      style: F.myLocText,
                      children: ['Use saved location \xb7 ', S],
                    }),
                  ],
                })
              : null,
            (0, x.jsx)(f.default, {
              visible: Boolean(L),
              title: 'destination' === L ? 'Select destination' : 'Select pickup location',
              places: W,
              onSelect: o => {
                ('origin' === L && u(o), 'destination' === L && h(o), z(null));
              },
              onClose: () => z(null),
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
      h = o(r(d[7])),
      p = o(r(d[8])),
      f = o(r(d[9])),
      x = r(d[10]);
    function y({
      label: o,
      value: c,
      placeholder: p,
      disabled: f,
      focused: y,
      onFocus: b,
      onBlur: j,
      onChangeText: C,
      suggestions: S,
      onSelect: v,
      dotColor: w,
      ringColor: B,
      showSimilarHeader: T = !1,
      query: F = '',
      onBrowse: P,
      onChevronPress: R,
      styles: L,
      colors: z,
    }) {
      const W = (0, t.useRef)(null),
        I = () => {
          f || (b?.(), W.current?.focus());
        };
      return (0, x.jsxs)(n.default, {
        style: L.fieldBlock,
        children: [
          (0, x.jsxs)(l.default, {
            style: [L.fieldRow, f && L.fieldDisabled, y && L.fieldFocused],
            onPress: () => {
              I();
            },
            children: [
              (0, x.jsx)(n.default, {
                style: [L.dotRing, { backgroundColor: B }],
                children: (0, x.jsx)(n.default, { style: [L.dot, { backgroundColor: w }] }),
              }),
              (0, x.jsxs)(n.default, {
                style: L.inputWrap,
                children: [
                  (0, x.jsx)(s.default, { style: L.fieldLabelSmall, children: o }),
                  (0, x.jsx)(u.default, {
                    ref: W,
                    style: [L.input, f && L.inputDisabled],
                    value: c,
                    onChangeText: C,
                    placeholder: p,
                    placeholderTextColor: z.textMuted,
                    onFocus: b,
                    onBlur: j,
                    editable: !f,
                    returnKeyType: 'done',
                    autoCorrect: !1,
                    autoCapitalize: 'words',
                    pointerEvents: f ? 'none' : 'auto',
                  }),
                ],
              }),
              P
                ? (0, x.jsx)(l.default, {
                    style: L.browseBtn,
                    onPress: o => {
                      (o.stopPropagation?.(), P());
                    },
                    hitSlop: 8,
                    children: (0, x.jsx)(r(d[11]).Ionicons, {
                      name: 'map-outline',
                      size: 18,
                      color: z.primaryLight,
                    }),
                  })
                : null,
              (0, x.jsx)(l.default, {
                onPress: o => {
                  (o.stopPropagation?.(), R ? R() : I());
                },
                hitSlop: 8,
                style: L.chevronBtn,
                children: (0, x.jsx)(r(d[11]).Ionicons, {
                  name: 'chevron-down',
                  size: 18,
                  color: f ? z.textMuted : z.textSecondary,
                  style: L.chevron,
                }),
              }),
            ],
          }),
          y && !f && S.length > 0
            ? (0, x.jsxs)(n.default, {
                style: L.suggestions,
                children: [
                  F?.trim()
                    ? null
                    : (0, x.jsx)(s.default, {
                        style: L.suggestionsHeader,
                        children: 'Popular places',
                      }),
                  T
                    ? (0, x.jsx)(s.default, {
                        style: L.suggestionsHeader,
                        children: 'Similar places',
                      })
                    : null,
                  S.map((o, t) => {
                    const n = (0, r(d[12]).getMatchHighlight)(o.label, F);
                    return (0, x.jsxs)(
                      l.default,
                      {
                        style: [L.suggestionRow, t === S.length - 1 && L.suggestionRowLast],
                        onPressIn: () => {
                          (v(o.label), h.default.dismiss());
                        },
                        children: [
                          (0, x.jsx)(r(d[11]).Ionicons, {
                            name: 'location-outline',
                            size: 16,
                            color: z.greenAccent,
                          }),
                          (0, x.jsx)(s.default, {
                            style: L.suggestionText,
                            children: n.match
                              ? (0, x.jsxs)(x.Fragment, {
                                  children: [
                                    n.before,
                                    (0, x.jsx)(s.default, {
                                      style: L.suggestionMatch,
                                      children: n.match,
                                    }),
                                    n.after,
                                  ],
                                })
                              : o.label,
                          }),
                        ],
                      },
                      `${o.label}-${t}`
                    );
                  }),
                ],
              })
            : null,
        ],
      });
    }
    const b = o =>
      c.default.create({
        wrap: { marginBottom: r(d[14]).spacing.md },
        sectionLabel: {
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 14,
          color: o.textPrimary,
          marginBottom: r(d[14]).spacing.sm,
        },
        browseBtn: {
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: o.primaryAlpha08,
          marginRight: r(d[14]).spacing.xs,
        },
        chevron: { flexShrink: 0 },
        chevronBtn: { padding: r(d[14]).spacing.xs },
        savedTitle: Object.assign({}, r(d[14]).typography.caption, {
          marginTop: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.xs,
        }),
        savedScroll: { gap: r(d[14]).spacing.sm, paddingBottom: r(d[14]).spacing.xs },
        savedChipRow: {
          flexDirection: 'row',
          gap: r(d[14]).spacing.xs,
          marginRight: r(d[14]).spacing.sm,
        },
        savedChip: {
          maxWidth: 150,
          paddingHorizontal: r(d[14]).spacing.sm,
          paddingVertical: r(d[14]).spacing.xs,
          borderRadius: r(d[14]).radius.pill,
          backgroundColor: o.surfaceSoft,
          borderWidth: c.default.hairlineWidth,
          borderColor: o.borderSoft,
        },
        savedChipText: {
          fontFamily: r(d[14]).fontFamily.medium,
          fontSize: 12,
          color: o.textSecondary,
        },
        fieldBlock: { marginBottom: r(d[14]).spacing.xs, zIndex: 10, position: 'relative' },
        fieldRow: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: 52,
          borderRadius: r(d[14]).radius.md,
          paddingVertical: r(d[14]).spacing.xs,
          borderWidth: c.default.hairlineWidth,
          borderColor: o.borderSoft,
          paddingHorizontal: r(d[14]).spacing.sm,
          backgroundColor: o.surface,
        },
        fieldFocused: { borderColor: o.primaryAlpha18, backgroundColor: o.surfaceSoft },
        fieldDisabled: { opacity: 0.72 },
        dotRing: {
          width: 20,
          height: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: r(d[14]).spacing.md,
          flexShrink: 0,
        },
        dot: { width: 8, height: 8, borderRadius: 4 },
        inputWrap: { flex: 1, minWidth: 0, justifyContent: 'center' },
        fieldLabelSmall: Object.assign({}, r(d[14]).typography.label, {
          marginBottom: 2,
          fontSize: 11,
        }),
        input: {
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 15,
          color: o.textPrimary,
          padding: 0,
          margin: 0,
        },
        inputDisabled: { color: o.textMuted },
        betweenFields: {
          alignItems: 'flex-end',
          minHeight: 28,
          justifyContent: 'center',
          paddingRight: r(d[14]).spacing.sm,
        },
        swapBtn: {
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: o.surfaceSoft,
          borderWidth: c.default.hairlineWidth,
          borderColor: o.borderSoft,
        },
        suggestions: {
          marginTop: r(d[14]).spacing.xs,
          marginLeft: r(d[14]).spacing.sm,
          borderRadius: r(d[14]).radius.md,
          borderWidth: c.default.hairlineWidth,
          borderColor: o.borderSoft,
          backgroundColor: o.surfaceElevated,
          overflow: 'hidden',
          zIndex: 20,
          elevation: 8,
        },
        suggestionsHeader: Object.assign({}, r(d[14]).typography.caption, {
          paddingHorizontal: r(d[14]).spacing.md,
          paddingTop: r(d[14]).spacing.sm,
          paddingBottom: r(d[14]).spacing.xs,
        }),
        suggestionRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.sm,
          paddingHorizontal: r(d[14]).spacing.md,
          paddingVertical: r(d[14]).spacing.sm,
          borderBottomWidth: c.default.hairlineWidth,
          borderBottomColor: o.borderSoft,
        },
        suggestionRowLast: { borderBottomWidth: 0 },
        suggestionText: {
          flex: 1,
          fontFamily: r(d[14]).fontFamily.medium,
          fontSize: 14,
          color: o.textPrimary,
        },
        suggestionMatch: { color: o.primaryLight, fontFamily: r(d[14]).fontFamily.semiBold },
        myLoc: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.xs,
          marginTop: r(d[14]).spacing.sm,
          paddingVertical: r(d[14]).spacing.xs,
        },
        myLocText: Object.assign({}, r(d[14]).typography.caption, { color: o.greenAccent }),
      });
  },
  1714,
  [1, 5, 19, 161, 326, 26, 255, 316, 106, 1715, 183, 578, 1626, 381, 377]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        visible: t,
        title: c = 'Select location',
        places: y = [],
        onSelect: j,
        onClose: C,
      }) {
        const v = (0, r(d[12]).useSafeAreaInsets)(),
          { colors: w } = (0, r(d[13]).useTheme)(),
          F = x(w),
          [T, z] = (0, o.useState)(''),
          B = (0, o.useMemo)(() => (0, r(d[14]).searchLocations)(y, T, 40), [y, T]);
        return (0, b.jsx)(l.default, {
          visible: t,
          transparent: !0,
          animationType: 'slide',
          onRequestClose: C,
          children: (0, b.jsxs)(p.default, {
            style: F.overlay,
            children: [
              (0, b.jsx)(s.default, { style: F.backdrop, onPress: C }),
              (0, b.jsxs)(p.default, {
                style: [F.sheet, { paddingBottom: v.bottom + r(d[11]).spacing.lg }],
                children: [
                  (0, b.jsx)(u.default, { style: F.title, children: c }),
                  (0, b.jsx)(u.default, {
                    style: F.subtitle,
                    children: 'Choose a place or search Kumasi corridors',
                  }),
                  (0, b.jsxs)(p.default, {
                    style: F.searchRow,
                    children: [
                      (0, b.jsx)(r(d[15]).Ionicons, {
                        name: 'search-outline',
                        size: 18,
                        color: w.textMuted,
                      }),
                      (0, b.jsx)(h.default, {
                        style: F.searchInput,
                        value: T,
                        onChangeText: z,
                        placeholder: 'Search places',
                        placeholderTextColor: w.textMuted,
                        autoCorrect: !1,
                        autoCapitalize: 'words',
                      }),
                    ],
                  }),
                  (0, b.jsx)(n.default, {
                    style: F.list,
                    keyboardShouldPersistTaps: 'handled',
                    children: B.map((t, o) => {
                      const l = (0, r(d[14]).getMatchHighlight)(t.label, T);
                      return (0, b.jsxs)(
                        s.default,
                        {
                          style: [F.row, o === B.length - 1 && F.rowLast],
                          onPress: () => {
                            return ((o = t.label), j?.(o), z(''), void C?.());
                            var o;
                          },
                          children: [
                            (0, b.jsx)(r(d[15]).Ionicons, {
                              name: 'location-outline',
                              size: 18,
                              color: w.primary,
                            }),
                            (0, b.jsx)(u.default, {
                              style: F.rowText,
                              children: l.match
                                ? (0, b.jsxs)(b.Fragment, {
                                    children: [
                                      l.before,
                                      (0, b.jsx)(u.default, {
                                        style: F.rowMatch,
                                        children: l.match,
                                      }),
                                      l.after,
                                    ],
                                  })
                                : t.label,
                            }),
                          ],
                        },
                        `${t.label}-${o}`
                      );
                    }),
                  }),
                  (0, b.jsx)(f.default, { title: 'Cancel', variant: 'ghost', onPress: C }),
                ],
              }),
            ],
          }),
        });
      }));
    var o = r(d[1]),
      l = t(r(d[2])),
      s = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      h = t(r(d[7])),
      p = t(r(d[8])),
      f = t(r(d[9])),
      b = r(d[10]);
    const x = t =>
      c.default.create({
        overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: t.overlay },
        backdrop: Object.assign({}, c.default.absoluteFillObject),
        sheet: {
          backgroundColor: t.surfaceElevated,
          borderTopLeftRadius: r(d[11]).radius.lg,
          borderTopRightRadius: r(d[11]).radius.lg,
          borderWidth: 1,
          borderColor: t.border,
          borderBottomWidth: 0,
          paddingHorizontal: r(d[11]).spacing.lg,
          paddingTop: r(d[11]).spacing.lg,
          maxHeight: '82%',
        },
        title: {
          fontFamily: r(d[11]).fontFamily.bold,
          fontSize: 20,
          color: t.textPrimary,
          marginBottom: r(d[11]).spacing.xs,
        },
        subtitle: Object.assign({}, r(d[11]).typography.caption, {
          color: t.textMuted,
          marginBottom: r(d[11]).spacing.md,
        }),
        searchRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[11]).spacing.sm,
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: r(d[11]).radius.md,
          paddingHorizontal: r(d[11]).spacing.md,
          paddingVertical: r(d[11]).spacing.sm,
          marginBottom: r(d[11]).spacing.md,
          backgroundColor: t.surface,
        },
        searchInput: {
          flex: 1,
          fontFamily: r(d[11]).fontFamily.medium,
          fontSize: 15,
          color: t.textPrimary,
          padding: 0,
        },
        list: {
          maxHeight: 360,
          marginBottom: r(d[11]).spacing.sm,
          borderRadius: r(d[11]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[11]).spacing.sm,
          paddingHorizontal: r(d[11]).spacing.md,
          paddingVertical: r(d[11]).spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        },
        rowLast: { borderBottomWidth: 0 },
        rowText: {
          flex: 1,
          fontFamily: r(d[11]).fontFamily.medium,
          fontSize: 15,
          color: t.textPrimary,
        },
        rowMatch: { color: t.primary, fontFamily: r(d[11]).fontFamily.bold },
      });
  },
  1715,
  [1, 5, 948, 326, 106, 26, 161, 255, 19, 672, 183, 377, 572, 381, 1626, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.aggregateTripHistoryStats = function (t = []) {
        const o = t.map(b),
          n = o.filter(t => t.isCompleted),
          l = o.filter(t => t.isCancelled),
          c = o.filter(t => t.isRated),
          s = n.reduce((t, o) => t + o.fare, 0),
          u = n.reduce((t, o) => {
            if (!o.origin || !o.destination) return t;
            const n = (0, r(d[0]).compareCorridorPricing)(o.origin, o.destination);
            return t + (n.savingsVsBolt > 0 ? n.savingsVsBolt : 0);
          }, 0);
        return {
          total: o.length,
          completed: n.length,
          cancelled: l.length,
          rated: c.length,
          unrated: n.filter(t => !t.isRated).length,
          totalSpent: s,
          totalSpentLabel: `GHS ${s.toFixed(2)}`,
          avgFare: n.length ? s / n.length : 0,
          avgFareLabel: n.length ? `GHS ${(s / n.length).toFixed(2)}` : '\u2014',
          totalSavings: u,
          totalSavingsLabel: u > 0 ? `GHS ${u.toFixed(0)}` : '\u2014',
        };
      }),
      (e.enrichTripHistoryItem = b),
      (e.filterTripHistory = function (t = [], { query: o = '', filter: n = 'all' } = {}) {
        const l = String(o ?? '')
          .trim()
          .toLowerCase();
        return t
          .filter(t => {
            const o = b(t);
            if ('completed' === n && !o.isCompleted) return !1;
            if ('cancelled' === n && !o.isCancelled) return !1;
            if ('unrated' === n && (!o.isCompleted || o.isRated)) return !1;
            if ('trotro' === n && 'trotroride' === t.tripType) return !1;
            if ('trotroride' === n && 'trotroride' !== t.tripType) return !1;
            if (!l) return !0;
            return [t.route, t.origin, t.destination, t.operatorName, o.modeMeta.label]
              .filter(Boolean)
              .join(' ')
              .toLowerCase()
              .includes(l);
          })
          .map(b);
      }),
      (e.formatTripDate = n),
      (e.formatTripDateRelative = l),
      (e.getTripFare = f),
      (e.getTripModeMeta = s),
      (e.getTripStatusMeta = c),
      (e.isCancelledTrip = p),
      (e.isCompletedTrip = u));
    const t = new Set(['completed', 'boarded']),
      o = new Set(['cancelled', 'expired', 'no_show']);
    function n(t) {
      return t
        ? new Date(t).toLocaleString('en-GH', { dateStyle: 'medium', timeStyle: 'short' })
        : '';
    }
    function l(t) {
      if (!t) return '';
      const o = new Date(t),
        n = new Date().getTime() - o.getTime(),
        l = Math.floor(n / 864e5);
      return 0 === l
        ? 'Today'
        : 1 === l
          ? 'Yesterday'
          : l < 7
            ? `${l} days ago`
            : l < 30
              ? `${Math.floor(l / 7)} wk ago`
              : o.toLocaleDateString('en-GH', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    function c(t) {
      const o = t.status ?? 'completed';
      return (
        {
          completed: { label: 'Completed', tone: 'success', icon: 'checkmark-circle-outline' },
          boarded: { label: 'Boarded', tone: 'success', icon: 'checkmark-circle-outline' },
          cancelled: { label: 'Cancelled', tone: 'warning', icon: 'close-circle-outline' },
          expired: { label: 'Expired', tone: 'muted', icon: 'time-outline' },
          no_show: { label: 'No show', tone: 'warning', icon: 'alert-circle-outline' },
        }[o] ?? { label: String(o), tone: 'muted', icon: 'ellipse-outline' }
      );
    }
    function s(t) {
      return 'trotroride' === t.tripType
        ? { label: 'TrotroRide', icon: 'car-outline' }
        : { label: 'Trotro', icon: 'bus-outline' };
    }
    function u(o) {
      return t.has(o.status ?? 'completed');
    }
    function p(t) {
      return o.has(t.status ?? '');
    }
    function f(t) {
      return Number(t.total ?? t.fare ?? 0);
    }
    function b(t) {
      const o = c(t),
        b = s(t),
        h = f(t),
        S = t.origin ?? t.pickupPoint ?? '',
        T = t.destination ?? '',
        y = S && T ? (0, r(d[0]).compareCorridorPricing)(S, T) : null;
      return Object.assign({}, t, {
        statusMeta: o,
        modeMeta: b,
        fare: h,
        fareLabel: `GHS ${h.toFixed(2)}`,
        formattedDate: n(t.createdAt),
        relativeDate: l(t.createdAt),
        isCompleted: u(t),
        isCancelled: p(t),
        isRated: Boolean(t.ratingScore),
        savingsLabel:
          y && u(t) && y.savingsVsBolt > 0
            ? `Saved ~GHS ${y.savingsVsBolt.toFixed(0)} vs Bolt`
            : null,
        operatorLabel: t.operatorName ? `${b.label} \xb7 ${t.operatorName}` : b.label,
      });
    }
  },
  1716,
  [1509]
);
__d(
  function (g, r, i, _a, m, e, d) {
    function n() {
      const n = (0, r(d[0]).getSupabase)();
      return n
        ? { supabase: n, error: null }
        : { supabase: null, error: new Error('Supabase client is not initialized') };
    }
    function t(n) {
      return n
        ? (0, r(d[1]).isRpcMissingError)(n) || (0, r(d[1]).isMissingTableError)(n)
          ? new Error('Trotro Eats is not set up yet. Apply migrations 027\u2013031 in Supabase.')
          : new Error((0, r(d[2]).errorMessage)(n) || 'Trotro Eats request failed')
        : null;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.allergenWarnings = function (n = [], t = {}) {
        const a = (n ?? []).map(n => String(n).toLowerCase()),
          o = (t.allergies ?? [])
            .map(n => String(n).toLowerCase())
            .filter(n => a.some(t => t.includes(n) || n.includes(t)));
        t.vegetarian &&
          a.some(n => ['meat', 'chicken', 'fish', 'beef', 'goat'].includes(n)) &&
          o.push('non-vegetarian');
        return o;
      }),
      (e.claimVendor = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('claim_vendor', { p_vendor_id: a });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.createVendorStore = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('create_vendor_store', {
          p_name: a.name,
          p_address: a.address ?? '',
          p_phone: a.phone ?? null,
          p_category: a.category ?? 'food',
          p_latitude: a.latitude ?? null,
          p_longitude: a.longitude ?? null,
          p_story: a.story ?? null,
          p_prep_minutes_default: a.prepMinutesDefault ?? 20,
        });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.fetchEatsMenu = async function (a, { includeUnavailable: o = !1 } = {}) {
        const { supabase: l, error: s } = n();
        if (s) return { data: [], error: s };
        if (!a) return { data: [], error: null };
        let u = l
          .from('delivery_menu_items')
          .select(
            'id, vendor_id, name, description, price_ghs, available, category, stock_qty, sold_out, tags, photo_url, prep_minutes, modifiers'
          )
          .eq('vendor_id', a)
          .order('name');
        o || (u = u.eq('available', !0));
        const { data: c, error: _ } = await u;
        if (_)
          return (0, r(d[1]).isMissingTableError)(_)
            ? { data: [], error: null }
            : { data: [], error: t(_) };
        return { data: c ?? [], error: null };
      }),
      (e.fetchEatsVendors = async function () {
        const { supabase: a, error: o } = n();
        if (o) return { data: [], error: o };
        const { data: l, error: s } = await a
          .from('delivery_vendors')
          .select(
            'id, name, category, address, latitude, longitude, phone, meta, story, hygiene_badge, food_rating_avg, food_rating_count, prep_minutes_default, is_open, owner_id, owner_photo_url'
          )
          .eq('is_active', !0)
          .order('name');
        if (s)
          return (0, r(d[1]).isMissingTableError)(s)
            ? { data: [], error: null }
            : { data: [], error: t(s) };
        return { data: l ?? [], error: null };
      }),
      (e.fetchFoodRatingForJob = async function (a, o) {
        const { supabase: l, error: s } = n();
        if (s) return { data: null, error: s };
        if (!a || !o) return { data: null, error: null };
        const { data: u, error: c } = await l
          .from('delivery_food_ratings')
          .select('*')
          .eq('job_id', a)
          .eq('buyer_id', o)
          .maybeSingle();
        if (c)
          return (0, r(d[1]).isMissingTableError)(c)
            ? { data: null, error: null }
            : { data: null, error: t(c) };
        return { data: u, error: null };
      }),
      (e.fetchLastPaidFoodJob = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        if (!a) return { data: null, error: null };
        const { data: s, error: u } = await o
          .from('delivery_jobs')
          .select('*')
          .eq('sender_id', a)
          .eq('kind', 'food')
          .eq('payment_status', 'paid')
          .order('created_at', { ascending: !1 })
          .limit(1)
          .maybeSingle();
        if (u)
          return (0, r(d[1]).isMissingTableError)(u)
            ? { data: null, error: null }
            : { data: null, error: t(u) };
        return { data: s, error: null };
      }),
      (e.fetchMyOwnedVendors = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: [], error: l };
        if (!a) return { data: [], error: null };
        const { data: s, error: u } = await o
          .from('delivery_vendors')
          .select('*')
          .eq('owner_id', a)
          .eq('is_active', !0)
          .order('name');
        if (u)
          return (0, r(d[1]).isMissingTableError)(u)
            ? { data: [], error: null }
            : { data: [], error: t(u) };
        return { data: s ?? [], error: null };
      }),
      (e.fetchVegetarianVendorIds = async function () {
        const { supabase: a, error: o } = n();
        if (o) return { data: [], error: o };
        const { data: l, error: s } = await a
          .from('delivery_menu_items')
          .select('vendor_id, tags')
          .eq('available', !0)
          .eq('sold_out', !1);
        if (s)
          return (0, r(d[1]).isMissingTableError)(s)
            ? { data: [], error: null }
            : { data: [], error: t(s) };
        const u = new Set();
        return (
          (l ?? []).forEach(n => {
            (n.tags ?? [])
              .map(n => String(n).toLowerCase())
              .some(n => n.includes('vegetarian') || n.includes('veggie') || 'veg' === n) &&
              u.add(n.vendor_id);
          }),
          { data: [...u], error: null }
        );
      }),
      (e.fetchVendorFoodJobHistory = async function (a, { sinceIso: o, limit: l = 200 } = {}) {
        const { supabase: s, error: u } = n();
        if (u) return { data: [], error: u };
        if (!a?.length) return { data: [], error: null };
        let c = s
          .from('delivery_jobs')
          .select('id, status, created_at, updated_at, order_items, fare_breakdown, vendor_id')
          .eq('kind', 'food')
          .in('vendor_id', a)
          .eq('status', 'delivered')
          .order('created_at', { ascending: !1 })
          .limit(l);
        o && (c = c.gte('created_at', o));
        const { data: _, error: p } = await c;
        if (p)
          return (0, r(d[1]).isMissingTableError)(p)
            ? { data: [], error: null }
            : { data: [], error: t(p) };
        return { data: _ ?? [], error: null };
      }),
      (e.fetchVendorFoodJobs = async function (a, { limit: o = 40 } = {}) {
        const { supabase: l, error: s } = n();
        if (s) return { data: [], error: s };
        if (!a?.length) return { data: [], error: null };
        const { data: u, error: c } = await l
          .from('delivery_jobs')
          .select('*')
          .eq('kind', 'food')
          .in('vendor_id', a)
          .in('status', [
            'pending',
            'accepted_by_vendor',
            'preparing',
            'ready_for_pickup',
            'assigned',
            'picked_up',
            'in_transit',
          ])
          .order('created_at', { ascending: !1 })
          .limit(o);
        if (c)
          return (0, r(d[1]).isMissingTableError)(c)
            ? { data: [], error: null }
            : { data: [], error: t(c) };
        return { data: u ?? [], error: null };
      }),
      (e.submitFoodRatings = async function ({
        jobId: a,
        foodScore: o,
        deliveryScore: l,
        comment: s = null,
        photoUrl: u = null,
      }) {
        const { supabase: c, error: _ } = n();
        if (_) return { data: null, error: _ };
        const { data: p, error: f } = await c.rpc('submit_food_ratings', {
          p_job_id: a,
          p_food_score: o,
          p_delivery_score: l,
          p_comment: s,
          p_photo_url: u,
        });
        return f ? { data: null, error: t(f) } : { data: p, error: null };
      }),
      (e.subscribeVendorJobs = function (t, a) {
        const { supabase: o } = n();
        if (!o || !t?.length) return () => {};
        const l = o
          .channel(`eats-vendor-${t.join('-').slice(0, 40)}`)
          .on('postgres_changes', { event: '*', schema: 'public', table: 'delivery_jobs' }, n => {
            const o = n.new ?? n.old;
            o?.vendor_id && t.includes(o.vendor_id) && a?.(n);
          })
          .subscribe();
        return () => {
          o.removeChannel(l);
        };
      }),
      (e.vendorAdvanceFoodJob = async function (a, o) {
        const { supabase: l, error: s } = n();
        if (s) return { data: null, error: s };
        const { data: u, error: c } = await l.rpc('vendor_advance_food_job', {
          p_job_id: a,
          p_to_status: o,
        });
        return c ? { data: null, error: t(c) } : { data: u, error: null };
      }),
      (e.vendorDeleteMenuItem = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('vendor_delete_menu_item', { p_item_id: a });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.vendorDeleteStore = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('vendor_delete_store', { p_vendor_id: a });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.vendorRejectFoodJob = async function (a, o = null) {
        const { supabase: l, error: s } = n();
        if (s) return { data: null, error: s };
        const { data: u, error: c } = await l.rpc('vendor_reject_food_job', {
          p_job_id: a,
          p_reason: o,
        });
        return c ? { data: null, error: t(c) } : { data: u, error: null };
      }),
      (e.vendorSetPrepEta = async function (a, o) {
        const { supabase: l, error: s } = n();
        if (s) return { data: null, error: s };
        const { data: u, error: c } = await l.rpc('vendor_set_prep_eta', {
          p_job_id: a,
          p_minutes: o,
        });
        return c ? { data: null, error: t(c) } : { data: u, error: null };
      }),
      (e.vendorSetStock = async function (a, { stockQty: o = null, soldOut: l = null } = {}) {
        const { supabase: s, error: u } = n();
        if (u) return { data: null, error: u };
        const { data: c, error: _ } = await s.rpc('vendor_set_stock', {
          p_item_id: a,
          p_stock_qty: o,
          p_sold_out: l,
        });
        return _ ? { data: null, error: t(_) } : { data: c, error: null };
      }),
      (e.vendorUpdateProfile = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('vendor_update_profile', {
          p_vendor_id: a.vendorId,
          p_story: a.story ?? null,
          p_is_open: a.isOpen ?? null,
          p_prep_minutes_default: a.prepMinutesDefault ?? null,
          p_owner_photo_url: a.ownerPhotoUrl ?? null,
          p_name: a.name ?? null,
          p_address: a.address ?? null,
          p_phone: a.phone ?? null,
          p_latitude: a.latitude ?? null,
          p_longitude: a.longitude ?? null,
        });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }),
      (e.vendorUpsertMenuItem = async function (a) {
        const { supabase: o, error: l } = n();
        if (l) return { data: null, error: l };
        const { data: s, error: u } = await o.rpc('vendor_upsert_menu_item', {
          p_item_id: a.itemId ?? null,
          p_vendor_id: a.vendorId ?? null,
          p_name: a.name ?? null,
          p_description: a.description ?? null,
          p_price_ghs: a.priceGhs ?? null,
          p_category: a.category ?? null,
          p_stock_qty: a.stockQty ?? null,
          p_sold_out: a.soldOut ?? null,
          p_tags: a.tags ?? null,
          p_photo_url: a.photoUrl ?? null,
          p_prep_minutes: a.prepMinutes ?? null,
          p_available: a.available ?? null,
          p_modifiers: a.modifiers ?? null,
        });
        return u ? { data: null, error: t(u) } : { data: s, error: null };
      }));
  },
  1717,
  [502, 558, 557]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        label: t,
        value: c,
        onChange: h,
        folder: x = 'misc',
        disabled: b = !1,
      }) {
        const { user: j } = (0, r(d[10]).useAuth)(),
          { colors: w } = (0, r(d[11]).useTheme)(),
          { t: F } = (0, r(d[12]).useLanguage)(),
          { showToast: I } = (0, r(d[13]).useToast)(),
          T = (0, s.useMemo)(() => f(w), [w]),
          [C, v] = (0, s.useState)(!1),
          [P, k] = (0, s.useState)(null),
          z = P || c || null,
          B = async t => {
            if (t.canceled) return;
            if (t.error)
              return void I({
                type: 'error',
                title: F('eats.mediaFailed'),
                message: t.error.message,
              });
            if (!t.asset?.uri) return;
            if (!j?.id)
              return void I({
                type: 'info',
                title: F('eats.mediaFailed'),
                message: 'Sign in to upload photos.',
              });
            (k(t.asset.uri), v(!0));
            const { data: s, error: l } = await (0, r(d[14]).uploadEatsMedia)({
              uri: t.asset.uri,
              mimeType: t.asset.mimeType,
              folder: x,
              userId: j.id,
            });
            (v(!1),
              l
                ? I({ type: 'error', title: F('eats.mediaFailed'), message: l.message })
                : (h?.(s.publicUrl), I({ type: 'success', title: F('eats.mediaUploaded') })));
          };
        return (0, y.jsxs)(p.default, {
          style: T.wrap,
          children: [
            t ? (0, y.jsx)(u.default, { style: T.label, children: t }) : null,
            z
              ? (0, y.jsx)(o.default, { source: { uri: z }, style: T.preview, resizeMode: 'cover' })
              : (0, y.jsx)(u.default, { style: T.hint, children: F('eats.mediaHint') }),
            (0, y.jsxs)(p.default, {
              style: T.actions,
              children: [
                (0, y.jsxs)(n.default, {
                  style: T.chip,
                  onPress: async () => {
                    if (b || C) return;
                    v(!0);
                    const t = await (0, r(d[14]).pickImageFromCamera)();
                    (v(!1), await B(t));
                  },
                  disabled: b || C,
                  accessibilityLabel: F('eats.mediaCamera'),
                  testID: 'mediaPickerCameraButton',
                  children: [
                    (0, y.jsx)(r(d[15]).Ionicons, {
                      name: 'camera-outline',
                      size: 18,
                      color: w.primary,
                    }),
                    (0, y.jsx)(u.default, { style: T.chipText, children: F('eats.mediaCamera') }),
                  ],
                }),
                (0, y.jsxs)(n.default, {
                  style: T.chip,
                  onPress: async () => {
                    if (b || C) return;
                    v(!0);
                    const t = await (0, r(d[14]).pickImageFromLibrary)();
                    (v(!1), await B(t));
                  },
                  disabled: b || C,
                  accessibilityLabel: F('eats.mediaGallery'),
                  testID: 'mediaPickerLibraryButton',
                  children: [
                    (0, y.jsx)(r(d[15]).Ionicons, {
                      name: 'images-outline',
                      size: 18,
                      color: w.primary,
                    }),
                    (0, y.jsx)(u.default, { style: T.chipText, children: F('eats.mediaGallery') }),
                  ],
                }),
                (0, y.jsxs)(n.default, {
                  style: T.chip,
                  onPress: async () => {
                    if (b || C) return;
                    v(!0);
                    const t = await (0, r(d[14]).pickImageFile)();
                    (v(!1), await B(t));
                  },
                  disabled: b || C,
                  accessibilityLabel: F('eats.mediaFile'),
                  testID: 'mediaPickerFileButton',
                  children: [
                    (0, y.jsx)(r(d[15]).Ionicons, {
                      name: 'document-attach-outline',
                      size: 18,
                      color: w.primary,
                    }),
                    (0, y.jsx)(u.default, { style: T.chipText, children: F('eats.mediaFile') }),
                  ],
                }),
                C ? (0, y.jsx)(l.default, { color: w.primary }) : null,
              ],
            }),
            z
              ? (0, y.jsx)(n.default, {
                  style: T.clear,
                  onPress: () => {
                    (k(null), h?.(null));
                  },
                  disabled: C,
                  accessibilityLabel: F('eats.mediaClear'),
                  testID: 'mediaPickerClearButton',
                  children: (0, y.jsx)(u.default, {
                    style: T.clearText,
                    children: F('eats.mediaClear'),
                  }),
                })
              : null,
          ],
        });
      }));
    var s = r(d[1]),
      l = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      p = t(r(d[7])),
      y = r(d[8]);
    const f = t =>
      c.default.create({
        wrap: { gap: r(d[9]).spacing.sm },
        label: { fontFamily: r(d[9]).fontFamily.semiBold, color: t.textPrimary, marginBottom: 2 },
        preview: {
          width: '100%',
          height: 160,
          borderRadius: r(d[9]).radius.md,
          backgroundColor: t.surfaceElevated,
        },
        actions: { flexDirection: 'row', flexWrap: 'wrap', gap: r(d[9]).spacing.sm },
        chip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: r(d[9]).spacing.sm,
          paddingVertical: r(d[9]).spacing.sm,
          borderRadius: r(d[9]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        chipText: { fontFamily: r(d[9]).fontFamily.semiBold, fontSize: 13, color: t.primary },
        hint: Object.assign({}, r(d[9]).typography.caption),
        clear: { alignSelf: 'flex-start', marginTop: 2 },
        clearText: { fontFamily: r(d[9]).fontFamily.medium, color: t.textMuted, fontSize: 13 },
      });
  },
  1718,
  [1, 5, 373, 151, 326, 26, 161, 19, 183, 377, 501, 381, 1381, 1386, 1719, 578]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.EATS_MEDIA_BUCKET = void 0),
      (_e.pickImageFile = async function () {
        try {
          const e = await t.getDocumentAsync({
            type: ['image/*'],
            copyToCacheDirectory: !0,
            multiple: !1,
          });
          if (e.canceled || !e.assets?.[0]) return { asset: null, error: null, canceled: !0 };
          const r = e.assets[0],
            n = o(r.name || r.uri, r.mimeType);
          return {
            asset: {
              uri: r.uri,
              mimeType: r.mimeType || s(n),
              fileName: r.name || null,
              width: null,
              height: null,
            },
            error: null,
            canceled: !1,
          };
        } catch (e) {
          return {
            asset: null,
            error: new Error((0, _r(d[4]).errorMessage)(e) || 'File pick failed'),
            canceled: !1,
          };
        }
      }),
      (_e.pickImageFromCamera = async function ({ allowsEditing: e = !0, quality: t = 0.7 } = {}) {
        try {
          if (!(await c()))
            return {
              asset: null,
              error: new Error('Camera permission is required.'),
              canceled: !1,
            };
          return p(
            await r.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: e,
              aspect: [4, 3],
              quality: t,
              exif: !1,
            })
          );
        } catch (e) {
          return {
            asset: null,
            error: new Error((0, _r(d[4]).errorMessage)(e) || 'Camera failed'),
            canceled: !1,
          };
        }
      }),
      (_e.pickImageFromLibrary = async function ({ allowsEditing: e = !0, quality: t = 0.7 } = {}) {
        try {
          if (!(await u()))
            return {
              asset: null,
              error: new Error('Photo library permission is required.'),
              canceled: !1,
            };
          return p(
            await r.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: e,
              aspect: [4, 3],
              quality: t,
              exif: !1,
            })
          );
        } catch (e) {
          return {
            asset: null,
            error: new Error((0, _r(d[4]).errorMessage)(e) || 'Library pick failed'),
            canceled: !1,
          };
        }
      }),
      (_e.uploadEatsMedia = async function ({
        uri: e,
        mimeType: r,
        folder: t = 'misc',
        userId: n,
      } = {}) {
        const l = (0, _r(d[5]).getSupabase)();
        if (!l) return { data: null, error: new Error('Supabase client is not initialized') };
        if (!n) return { data: null, error: new Error('Sign in required to upload') };
        if (!e) return { data: null, error: new Error('No image selected') };
        try {
          const c = o(e, r),
            u = r || s(c),
            p = `${n}/${String(t || 'misc').replace(/[^a-z0-9_-]/gi, '')}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${c}`,
            y = await f(e),
            { error: w } = await l.storage
              .from(i)
              .upload(p, y, { contentType: u, upsert: !1, cacheControl: '3600' });
          if (w)
            return {
              data: null,
              error: new Error(
                (0, _r(d[4]).errorMessage)(w) ||
                  'Upload failed. Apply migration 029_eats_media_storage.sql if storage is missing.'
              ),
            };
          const { data: h } = l.storage.from(i).getPublicUrl(p);
          return { data: { path: p, publicUrl: h?.publicUrl ?? null }, error: null };
        } catch (e) {
          return { data: null, error: new Error((0, _r(d[4]).errorMessage)(e) || 'Upload failed') };
        }
      }));
    e(_r(d[1]));
    var r = n(_r(d[2])),
      t = n(_r(d[3]));
    function n(e, r) {
      if ('function' == typeof WeakMap)
        var t = new WeakMap(),
          i = new WeakMap();
      return (n = function (e, r) {
        if (!r && e && e.__esModule) return e;
        var n,
          l,
          o = { __proto__: null, default: e };
        if (null === e || ('object' != typeof e && 'function' != typeof e)) return o;
        if ((n = r ? i : t)) {
          if (n.has(e)) return n.get(e);
          n.set(e, o);
        }
        for (const r in e)
          'default' !== r &&
            {}.hasOwnProperty.call(e, r) &&
            ((l = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, r)) &&
            (l.get || l.set)
              ? n(o, r, l)
              : (o[r] = e[r]));
        return o;
      })(e, r);
    }
    const i = (_e.EATS_MEDIA_BUCKET = 'eats'),
      l = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        heic: 'image/heic',
        heif: 'image/heif',
      };
    function o(e = '', r = '') {
      const t = String(r).split('/')[1]?.replace('jpeg', 'jpg');
      if (t && l[t.replace('jpeg', 'jpg')]) return 'jpeg' === t ? 'jpg' : t;
      const n = String(e)
        .toLowerCase()
        .match(/\.([a-z0-9]+)(?:\?|$)/);
      return n?.[1] && l[n[1]] ? ('jpeg' === n[1] ? 'jpg' : n[1]) : 'jpg';
    }
    function s(e) {
      return l[e] || 'image/jpeg';
    }
    async function c() {
      if ((await r.getCameraPermissionsAsync()).granted) return !0;
      return (await r.requestCameraPermissionsAsync()).granted;
    }
    async function u() {
      return !0;
    }
    function p(e) {
      if (e.canceled || !e.assets?.[0]) return { asset: null, error: null, canceled: !0 };
      const r = e.assets[0];
      return {
        asset: {
          uri: r.uri,
          mimeType: r.mimeType || s(o(r.uri, r.mimeType)),
          fileName: r.fileName || null,
          width: r.width,
          height: r.height,
        },
        error: null,
        canceled: !1,
      };
    }
    async function f(e) {
      const r = await fetch(e);
      if (!r.ok) throw new Error('Could not read selected file');
      return r.arrayBuffer();
    }
  },
  1719,
  [1, 14, 1720, 1724, 557, 502]
);
__d(
  function (g, r, i, a, m, e, d) {
    var n = r(d[0]);
    Object.defineProperty(e, '__esModule', { value: !0 });
    var s = {
      getCameraPermissionsAsync: !0,
      getMediaLibraryPermissionsAsync: !0,
      requestCameraPermissionsAsync: !0,
      requestMediaLibraryPermissionsAsync: !0,
      useMediaLibraryPermissions: !0,
      useCameraPermissions: !0,
      getPendingResultAsync: !0,
      launchCameraAsync: !0,
      launchImageLibraryAsync: !0,
      PermissionStatus: !0,
    };
    (Object.defineProperty(e, 'PermissionStatus', {
      enumerable: !0,
      get: function () {
        return r(d[1]).PermissionStatus;
      },
    }),
      (e.getCameraPermissionsAsync = u),
      (e.getMediaLibraryPermissionsAsync = c),
      (e.getPendingResultAsync = async function () {
        if (t.default.getPendingResultAsync) return t.default.getPendingResultAsync();
        return null;
      }),
      (e.launchCameraAsync = async function (n = {}) {
        if (!t.default.launchCameraAsync)
          throw new (r(d[4]).UnavailabilityError)('ImagePicker', 'launchCameraAsync');
        const s = (0, r(d[5]).mapDeprecatedOptions)(n);
        return await t.default.launchCameraAsync(o(s));
      }),
      (e.launchImageLibraryAsync = async function (n = {}) {
        const s = (0, r(d[5]).mapDeprecatedOptions)(n);
        if (!t.default.launchImageLibraryAsync)
          throw new (r(d[4]).UnavailabilityError)('ImagePicker', 'launchImageLibraryAsync');
        s?.allowsEditing &&
          s.allowsMultipleSelection &&
          console.warn(
            "[expo-image-picker] `allowsEditing` is not supported when `allowsMultipleSelection` is enabled and will be ignored.Disable either 'allowsEditing' or 'allowsMultipleSelection' in 'launchImageLibraryAsync' to fix this warning."
          );
        return await t.default.launchImageLibraryAsync(s);
      }),
      (e.requestCameraPermissionsAsync = l),
      (e.requestMediaLibraryPermissionsAsync = y),
      (e.useMediaLibraryPermissions = e.useCameraPermissions = void 0));
    var t = n(r(d[2]));
    function o(n) {
      const { aspect: s, quality: t, videoMaxDuration: o } = n;
      if (null != s) {
        const [n, t] = s;
        if (n <= 0 || t <= 0)
          throw new (r(d[4]).CodedError)(
            'ERR_INVALID_ARGUMENT',
            `Invalid aspect ratio values ${n}:${t}. Provide positive numbers.`
          );
      }
      if (t && (t < 0 || t > 1))
        throw new (r(d[4]).CodedError)(
          'ERR_INVALID_ARGUMENT',
          `Invalid 'quality' value ${t}. Provide a value between 0 and 1.`
        );
      if (o && o < 0)
        throw new (r(d[4]).CodedError)(
          'ERR_INVALID_ARGUMENT',
          `Invalid 'videoMaxDuration' value ${o}. Provide a non-negative number.`
        );
      return n;
    }
    async function u() {
      return t.default.getCameraPermissionsAsync();
    }
    async function c(n = !1) {
      return t.default.getMediaLibraryPermissionsAsync(n);
    }
    async function l() {
      return t.default.requestCameraPermissionsAsync();
    }
    async function y(n = !1) {
      return (0, t.default.requestMediaLibraryPermissionsAsync)(n);
    }
    Object.keys(r(d[3])).forEach(function (n) {
      'default' !== n &&
        '__esModule' !== n &&
        (Object.prototype.hasOwnProperty.call(s, n) ||
          (n in e && e[n] === r(d[3])[n]) ||
          Object.defineProperty(e, n, {
            enumerable: !0,
            get: function () {
              return r(d[3])[n];
            },
          }));
    });
    ((e.useMediaLibraryPermissions = (0, r(d[1]).createPermissionHook)({
      getMethod: n => c(n?.writeOnly),
      requestMethod: n => y(n?.writeOnly),
    })),
      (e.useCameraPermissions = (0, r(d[1]).createPermissionHook)({
        getMethod: u,
        requestMethod: l,
      })));
  },
  1720,
  [1, 901, 1721, 1723, 339, 1722]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
    const t = {
      images: 'image/*',
      videos: 'video/mp4,video/quicktime,video/x-m4v,video/*',
      livePhotos: '',
    };
    e.default = {
      launchImageLibraryAsync: async ({
        mediaTypes: t = ['images'],
        allowsMultipleSelection: n = !1,
        base64: o = !1,
      }) =>
        'undefined' == typeof window || 'undefined' == typeof document
          ? { canceled: !0, assets: null }
          : await s({ mediaTypes: t, allowsMultipleSelection: n, base64: o }),
      launchCameraAsync: async ({
        mediaTypes: t = ['images'],
        allowsMultipleSelection: n = !1,
        base64: o = !1,
        cameraType: c,
      }) =>
        'undefined' == typeof window || 'undefined' == typeof document
          ? { canceled: !0, assets: null }
          : await s({ mediaTypes: t, allowsMultipleSelection: n, capture: c ?? !0, base64: o }),
      getCameraPermissionsAsync: async () => n(),
      requestCameraPermissionsAsync: async () => n(),
      getMediaLibraryPermissionsAsync: async t => n(),
      requestMediaLibraryPermissionsAsync: async t => n(),
    };
    function n() {
      return {
        status: r(d[0]).PermissionStatus.GRANTED,
        expires: 'never',
        granted: !0,
        canAskAgain: !0,
      };
    }
    function s({ mediaTypes: t, capture: n = !1, allowsMultipleSelection: s = !1, base64: o }) {
      const c = p((0, r(d[1]).parseMediaTypes)(t)),
        l = document.createElement('input');
      if (
        ((l.style.display = 'none'),
        l.setAttribute('type', 'file'),
        l.setAttribute('accept', c),
        l.setAttribute('id', String(Math.random())),
        l.setAttribute('data-testid', 'file-input'),
        s && l.setAttribute('multiple', 'multiple'),
        n)
      )
        switch (n) {
          case !0:
            l.setAttribute('capture', 'camera');
            break;
          case r(d[2]).CameraType.front:
            l.setAttribute('capture', 'user');
            break;
          case r(d[2]).CameraType.back:
            l.setAttribute('capture', 'environment');
        }
      return (
        document.body.appendChild(l),
        new Promise(t => {
          (l.addEventListener('change', async () => {
            if (l.files?.length) {
              const n = s ? l.files : [l.files[0]];
              try {
                const s = await Promise.all(
                  Array.from(n)
                    .filter(t => null != t)
                    .map(t => u(t, { base64: o }))
                );
                t({ canceled: !1, assets: s });
              } catch (n) {
                t(Promise.reject(n));
              }
            } else t({ canceled: !0, assets: null });
            document.body.removeChild(l);
          }),
            l.addEventListener('cancel', () => {
              l.dispatchEvent(new Event('change'));
            }));
          const n = new MouseEvent('click');
          l.dispatchEvent(n);
        })
      );
    }
    async function o(t) {
      return new Promise(n => {
        const s = new Image();
        ((s.onload = () => {
          n({ width: s.naturalWidth ?? s.width, height: s.naturalHeight ?? s.height });
        }),
          (s.onerror = () => n({ width: 0, height: 0 })),
          (s.src = t));
      });
    }
    async function c(t) {
      return new Promise(n => {
        const s = document.createElement('video');
        ((s.preload = 'metadata'),
          (s.onloadedmetadata = () => {
            n({ width: s.videoWidth, height: s.videoHeight, duration: s.duration });
          }),
          (s.onerror = () => n({ width: 0, height: 0, duration: 0 })),
          (s.src = t));
      });
    }
    async function l(t) {
      return new Promise((n, s) => {
        const o = new FileReader();
        ((o.onerror = () => {
          s(new Error('Failed to read the selected media because the operation failed.'));
        }),
          (o.onload = t => {
            const o = t.target?.result;
            'string' == typeof o
              ? n(o.split(',')?.[1] ?? '')
              : s(new Error('Failed to read file as base64'));
          }),
          o.readAsDataURL(t));
      });
    }
    async function u(t, n) {
      const s = t.type,
        u = URL.createObjectURL(t);
      try {
        let p, h;
        if (s.startsWith('image/')) p = await o(u);
        else {
          if (!s.startsWith('video/'))
            throw new Error(`Unsupported file type: ${s}. Only images and videos are supported.`);
          p = await c(u);
        }
        return (
          n.base64 && (h = await l(t)),
          Object.assign(
            {
              uri: u,
              width: p.width,
              height: p.height,
              type: s.startsWith('image/') ? 'image' : 'video',
              mimeType: s,
              fileName: t.name,
              fileSize: t.size,
              file: t,
            },
            void 0 !== p.duration && { duration: p.duration },
            h && { base64: h }
          )
        );
      } catch (t) {
        throw t;
      }
    }
    function p(n) {
      const s = n.filter(t => 'livePhotos' !== t);
      if (0 === s.length) return 'image/*';
      let o = '';
      for (const n of s) o.includes(t[n]) || (o = o.concat(',', t[n]));
      return o;
    }
  },
  1721,
  [901, 1722, 1723]
);
__d(
  function (g, r, i, a, m, e, d) {
    function s(s) {
      const n = { Images: ['images'], Videos: ['videos'], All: ['images', 'videos'] };
      return s === r(d[0]).MediaTypeOptions.Images ||
        s === r(d[0]).MediaTypeOptions.Videos ||
        s === r(d[0]).MediaTypeOptions.All
        ? (console.warn(
            '[expo-image-picker] `ImagePicker.MediaTypeOptions` have been deprecated. Use `ImagePicker.MediaType` or an array of `ImagePicker.MediaType` instead.'
          ),
          n[s])
        : 'string' == typeof s
          ? [s]
          : s;
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.mapDeprecatedOptions = function (n) {
        if (!n.mediaTypes) return n;
        return Object.assign({}, n, { mediaTypes: s(n.mediaTypes ?? []) });
      }),
      (e.parseMediaTypes = s));
  },
  1722,
  [1723]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.VideoExportPreset =
        e.UIImagePickerPresentationStyle =
        e.UIImagePickerPreferredAssetRepresentationMode =
        e.UIImagePickerControllerQualityType =
        e.MediaTypeOptions =
        e.CameraType =
          void 0));
    ((e.MediaTypeOptions = (function (t) {
      return ((t.All = 'All'), (t.Videos = 'Videos'), (t.Images = 'Images'), t);
    })({})),
      (e.VideoExportPreset = (function (t) {
        return (
          (t[(t.Passthrough = 0)] = 'Passthrough'),
          (t[(t.LowQuality = 1)] = 'LowQuality'),
          (t[(t.MediumQuality = 2)] = 'MediumQuality'),
          (t[(t.HighestQuality = 3)] = 'HighestQuality'),
          (t[(t.H264_640x480 = 4)] = 'H264_640x480'),
          (t[(t.H264_960x540 = 5)] = 'H264_960x540'),
          (t[(t.H264_1280x720 = 6)] = 'H264_1280x720'),
          (t[(t.H264_1920x1080 = 7)] = 'H264_1920x1080'),
          (t[(t.H264_3840x2160 = 8)] = 'H264_3840x2160'),
          (t[(t.HEVC_1920x1080 = 9)] = 'HEVC_1920x1080'),
          (t[(t.HEVC_3840x2160 = 10)] = 'HEVC_3840x2160'),
          t
        );
      })({})),
      (e.UIImagePickerControllerQualityType = (function (t) {
        return (
          (t[(t.High = 0)] = 'High'),
          (t[(t.Medium = 1)] = 'Medium'),
          (t[(t.Low = 2)] = 'Low'),
          (t[(t.VGA640x480 = 3)] = 'VGA640x480'),
          (t[(t.IFrame1280x720 = 4)] = 'IFrame1280x720'),
          (t[(t.IFrame960x540 = 5)] = 'IFrame960x540'),
          t
        );
      })({})),
      (e.UIImagePickerPresentationStyle = (function (t) {
        return (
          (t.FULL_SCREEN = 'fullScreen'),
          (t.PAGE_SHEET = 'pageSheet'),
          (t.FORM_SHEET = 'formSheet'),
          (t.CURRENT_CONTEXT = 'currentContext'),
          (t.OVER_FULL_SCREEN = 'overFullScreen'),
          (t.OVER_CURRENT_CONTEXT = 'overCurrentContext'),
          (t.POPOVER = 'popover'),
          (t.AUTOMATIC = 'automatic'),
          t
        );
      })({})),
      (e.UIImagePickerPreferredAssetRepresentationMode = (function (t) {
        return (
          (t.Automatic = 'automatic'),
          (t.Compatible = 'compatible'),
          (t.Current = 'current'),
          t
        );
      })({})),
      (e.CameraType = (function (t) {
        return ((t.back = 'back'), (t.front = 'front'), t);
      })({})));
  },
  1723,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    Object.defineProperty(e, '__esModule', { value: !0 });
    var c = { getDocumentAsync: !0 };
    e.getDocumentAsync = async function ({
      type: t = '*/*',
      copyToCacheDirectory: c = !0,
      multiple: o = !1,
      base64: u = !0,
    } = {}) {
      'string' == typeof t && (t = [t]);
      return await n.default.getDocumentAsync({
        type: t,
        copyToCacheDirectory: c,
        multiple: o,
        base64: u,
      });
    };
    var n = t(r(d[1]));
    Object.keys(r(d[2])).forEach(function (t) {
      'default' !== t &&
        '__esModule' !== t &&
        (Object.prototype.hasOwnProperty.call(c, t) ||
          (t in e && e[t] === r(d[2])[t]) ||
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: function () {
              return r(d[2])[t];
            },
          }));
    });
  },
  1724,
  [1, 1725, 1726]
);
__d(
  function (g, r, _i, a, m, _e, d) {
    (Object.defineProperty(_e, '__esModule', { value: !0 }), (_e.default = void 0));
    _e.default = {
      async getDocumentAsync({ type: t = '*/*', multiple: i = !1, base64: n = !1 }) {
        if (!r(d[0]).Platform.isDOMAvailable) return { canceled: !0, assets: null };
        const s = document.createElement('input');
        return (
          (s.style.display = 'none'),
          s.setAttribute('type', 'file'),
          s.setAttribute('accept', Array.isArray(t) ? t.join(',') : t),
          s.setAttribute('id', String(Math.random())),
          i && s.setAttribute('multiple', 'multiple'),
          document.body.appendChild(s),
          new Promise((t, i) => {
            (s.addEventListener('change', async () => {
              if (s.files) {
                const l = [];
                for (let t = 0; t < s.files.length; t++) l.push(e(s.files[t], n));
                try {
                  const e = await Promise.all(l);
                  t({ canceled: !1, assets: e, output: s.files });
                } catch (e) {
                  i(e);
                }
              } else t({ canceled: !0, assets: null });
              document.body.removeChild(s);
            }),
              s.addEventListener('cancel', () => {
                t({ canceled: !0, assets: null });
              }));
            const l = new MouseEvent('click');
            s.dispatchEvent(l);
          })
        );
      },
    };
    function e(e, t = !0) {
      return new Promise((i, n) => {
        const s = e.type;
        if (!t)
          return void i({
            uri: URL.createObjectURL(e),
            mimeType: s,
            name: e.name,
            lastModified: e.lastModified,
            size: e.size,
            file: e,
          });
        const l = new FileReader();
        ((l.onerror = () => {
          n(new Error('Failed to read the selected media because the operation failed.'));
        }),
          (l.onload = ({ target: t }) => {
            const n = t.result;
            i({
              uri: URL.createObjectURL(e),
              base64: n,
              mimeType: s,
              name: e.name,
              lastModified: e.lastModified,
              size: e.size,
              file: e,
            });
          }),
          l.readAsDataURL(e));
      });
    }
  },
  1725,
  [339]
);
__d(
  function (g, r, i, a, m, e, d) {
    Object.defineProperty(e, '__esModule', { value: !0 });
  },
  1726,
  []
);
__d(
  function (g, r, i, a, m, e, d) {
    var o = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ options: o, value: c, onChange: f }) {
        const { colors: y } = (0, r(d[9]).useTheme)(),
          v = (0, t.useMemo)(() => b(y), [y]);
        return (0, p.jsxs)(n.default, {
          horizontal: !0,
          showsHorizontalScrollIndicator: !1,
          contentContainerStyle: v.content,
          children: [
            o.map(o => {
              const t = o.value === c;
              return (0, p.jsxs)(
                l.default,
                {
                  style: [v.tab, t && v.tabActive],
                  onPress: () => f(o.value),
                  children: [
                    (0, p.jsx)(s.default, {
                      style: [v.label, t && v.labelActive],
                      children: o.label,
                    }),
                    null != o.count
                      ? (0, p.jsx)(s.default, {
                          style: [v.count, t && v.countActive],
                          children: o.count,
                        })
                      : null,
                  ],
                },
                o.value
              );
            }),
            (0, p.jsx)(u.default, { style: { width: r(d[8]).spacing.xs } }),
          ],
        });
      }));
    var t = r(d[1]),
      l = o(r(d[2])),
      n = o(r(d[3])),
      c = o(r(d[4])),
      s = o(r(d[5])),
      u = o(r(d[6])),
      p = r(d[7]);
    const b = o =>
      c.default.create({
        content: { gap: r(d[8]).spacing.sm, paddingVertical: r(d[8]).spacing.xs },
        tab: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: r(d[8]).spacing.lg,
          paddingVertical: r(d[8]).spacing.sm,
          borderRadius: r(d[8]).radius.pill,
          borderWidth: 1,
          borderColor: o.border,
          backgroundColor: o.surface,
        },
        tabActive: { backgroundColor: o.primary, borderColor: o.primary },
        label: { fontFamily: r(d[8]).fontFamily.semiBold, fontSize: 14, color: o.textSecondary },
        labelActive: { color: o.onPrimary },
        count: {
          minWidth: 20,
          paddingHorizontal: 5,
          paddingVertical: 1,
          borderRadius: r(d[8]).radius.pill,
          textAlign: 'center',
          overflow: 'hidden',
          fontFamily: r(d[8]).fontFamily.bold,
          fontSize: 12,
          color: o.textPrimary,
          backgroundColor: o.primaryAlpha08 ?? o.surfaceSoft,
        },
        countActive: { color: o.primary, backgroundColor: o.onPrimary },
      });
  },
  1727,
  [1, 5, 326, 106, 26, 161, 19, 183, 377, 381]
);
__d(
  function (g, r, i, a, m, e, d) {
    var l = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({
        shopName: l,
        badgeLabel: o,
        ratingLine: f,
        isOpen: b,
        onToggleOpen: y,
        openLabel: h,
        closedLabel: x,
        openHint: j,
        closedHint: F,
        stats: T = [],
      }) {
        const { colors: S, isDark: A } = (0, r(d[8]).useTheme)(),
          L = (0, t.useMemo)(() => u(S), [S]),
          w = A ? ['#141414', '#0A0A0A', '#111111'] : ['#FFFFFF', '#FAFAF8', '#F5F3EE'];
        return (0, p.jsx)(c.default, {
          style: L.shell,
          children: (0, p.jsx)(r(d[9]).LinearGradient, {
            colors: w,
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
            children: (0, p.jsxs)(c.default, {
              style: L.inner,
              children: [
                (0, p.jsxs)(c.default, {
                  style: L.badge,
                  children: [
                    (0, p.jsx)(r(d[10]).Ionicons, {
                      name: 'storefront-outline',
                      size: 12,
                      color: S.goldDeep ?? S.gold,
                    }),
                    (0, p.jsx)(s.default, { style: L.badgeText, children: o }),
                  ],
                }),
                (0, p.jsx)(s.default, { style: L.name, numberOfLines: 2, children: l }),
                f ? (0, p.jsx)(s.default, { style: L.rating, children: f }) : null,
                T.length
                  ? (0, p.jsx)(c.default, {
                      style: L.statsRow,
                      children: T.map(l =>
                        (0, p.jsxs)(
                          c.default,
                          {
                            style: L.stat,
                            children: [
                              (0, p.jsx)(s.default, {
                                style: [L.statValue, l.gold && L.statValueGold],
                                children: l.value,
                              }),
                              (0, p.jsx)(s.default, { style: L.statLabel, children: l.label }),
                            ],
                          },
                          l.label
                        )
                      ),
                    })
                  : null,
                y
                  ? (0, p.jsxs)(c.default, {
                      style: L.toggleRow,
                      children: [
                        (0, p.jsxs)(c.default, {
                          style: { flex: 1 },
                          children: [
                            (0, p.jsx)(s.default, { style: L.toggleLabel, children: b ? h : x }),
                            (0, p.jsx)(s.default, { style: L.toggleHint, children: b ? j : F }),
                          ],
                        }),
                        (0, p.jsx)(n.default, {
                          value: b,
                          onValueChange: y,
                          trackColor: { true: S.success ?? S.greenAccent },
                        }),
                      ],
                    })
                  : null,
              ],
            }),
          }),
        });
      }));
    var t = r(d[1]),
      o = l(r(d[2])),
      n = l(r(d[3])),
      s = l(r(d[4])),
      c = l(r(d[5])),
      p = r(d[6]);
    const u = l =>
      o.default.create({
        shell: {
          borderRadius: r(d[7]).radius.xl,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: l.goldAlpha25 ?? 'rgba(201, 162, 39, 0.28)',
        },
        inner: { padding: r(d[7]).spacing.lg },
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          alignSelf: 'flex-start',
          paddingHorizontal: r(d[7]).spacing.sm,
          paddingVertical: 4,
          borderRadius: r(d[7]).radius.pill,
          backgroundColor: l.goldAlpha12 ?? 'rgba(201, 162, 39, 0.14)',
          marginBottom: r(d[7]).spacing.md,
        },
        badgeText: {
          fontFamily: r(d[7]).fontFamily.semiBold,
          fontSize: 11,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          color: l.goldDeep ?? l.gold,
        },
        name: {
          fontFamily: r(d[7]).fontFamily.bold,
          fontSize: 24,
          lineHeight: 30,
          color: l.textPrimary,
        },
        rating: Object.assign({}, r(d[7]).typography.caption, {
          color: l.textSecondary,
          marginTop: 2,
        }),
        toggleRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: r(d[7]).spacing.md,
          marginTop: r(d[7]).spacing.lg,
          paddingTop: r(d[7]).spacing.md,
          borderTopWidth: o.default.hairlineWidth,
          borderTopColor: l.borderSoft ?? l.border,
        },
        toggleLabel: {
          fontFamily: r(d[7]).fontFamily.semiBold,
          fontSize: 15,
          color: l.textPrimary,
        },
        toggleHint: Object.assign({}, r(d[7]).typography.caption, {
          color: l.textMuted,
          marginTop: 2,
        }),
        statsRow: { flexDirection: 'row', gap: r(d[7]).spacing.sm, marginTop: r(d[7]).spacing.lg },
        stat: {
          flex: 1,
          paddingVertical: r(d[7]).spacing.md,
          paddingHorizontal: r(d[7]).spacing.md,
          borderRadius: r(d[7]).radius.lg,
          backgroundColor: l.primaryAlpha06 ?? l.surface,
          borderWidth: o.default.hairlineWidth,
          borderColor: l.borderSoft ?? l.border,
        },
        statValue: { fontFamily: r(d[7]).fontFamily.bold, fontSize: 20, color: l.textPrimary },
        statValueGold: { color: l.gold ?? '#C9A227' },
        statLabel: Object.assign({}, r(d[7]).typography.caption, {
          fontSize: 12,
          color: l.textSecondary,
          marginTop: 2,
        }),
      });
  },
  1728,
  [1, 5, 26, 253, 161, 19, 183, 377, 381, 1707, 578]
);
