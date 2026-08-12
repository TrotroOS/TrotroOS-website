__d(
  function (g, r, i, a, _m, e, d) {
    var n = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const { activeRole: n, ready: o } = (0, r(d[67]).useAppMode)(),
          s = Boolean(
            o &&
            (n === r(d[68]).USER_ROLES.MATE ||
              n === r(d[68]).USER_ROLES.TROTRORIDE_DRIVER ||
              n === r(d[68]).USER_ROLES.COURIER)
          );
        return (0, S.jsx)(t.Suspense, {
          fallback: (0, S.jsx)(Ee, {}),
          children: (0, S.jsx)(ie, {
            enabled: s,
            vehicleKind: Ue(n),
            children: (0, S.jsxs)(le.Navigator, {
              screenOptions: { headerShown: !1 },
              children: [
                (0, S.jsx)(le.Screen, { name: 'MainTabs', component: de }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.STATION_MASTER, component: Oe(P) }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.TRACK_TRIP, component: Oe(f) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.TR_PASSENGER_RIDE,
                  component: Oe(U),
                }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.SEND_PARCEL, component: Oe(X) }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.FOOD_VENDORS, component: Oe(Z) }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.EATS_MENU, component: Oe($) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.DELIVERY_TRACKING,
                  component: Oe(ee),
                }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.DELIVERY_ACTIVE, component: Oe(te) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_MY_LOCATION,
                  component: Oe(L),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_SAVED_PLACES,
                  component: Oe(z),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_FAVORITE_ROUTES,
                  component: Oe(N),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_SCHEDULED_RIDES,
                  component: Oe(B),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_TRIP_HISTORY,
                  component: Oe(D),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_MY_RATING,
                  component: Oe(F),
                }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.PROFILE_EDIT, component: Oe(v) }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.PROFILE_WALLET, component: Oe(C) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_NOTIFICATIONS,
                  component: Oe(M),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_SAFETY_PREFERENCES,
                  component: Oe(V),
                }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.PROFILE_PRIVACY, component: Oe(G) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_DATA_PRIVACY,
                  component: Oe(k),
                }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.PROFILE_LANGUAGE, component: Oe(Y) }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.PROFILE_APP_MODE, component: Oe(H) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_EMERGENCY_CONTACT,
                  component: Oe(K),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_REPORT_ISSUE,
                  component: Oe(w),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_INVITE_FRIENDS,
                  component: Oe(W),
                }),
                (0, S.jsx)(le.Screen, { name: r(d[65]).ROUTES.PROFILE_HELP_FAQ, component: Oe(Q) }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_CONTACT_SUPPORT,
                  component: Oe(q),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_TERMS,
                  children: () =>
                    (0, S.jsx)(t.Suspense, {
                      fallback: (0, S.jsx)(Ee, {}),
                      children: (0, S.jsx)(J, { docKey: 'terms' }),
                    }),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_PRIVACY_POLICY,
                  children: () =>
                    (0, S.jsx)(t.Suspense, {
                      fallback: (0, S.jsx)(Ee, {}),
                      children: (0, S.jsx)(J, { docKey: 'privacy' }),
                    }),
                }),
                (0, S.jsx)(le.Screen, {
                  name: r(d[65]).ROUTES.PROFILE_ABOUT,
                  children: () =>
                    (0, S.jsx)(t.Suspense, {
                      fallback: (0, S.jsx)(Ee, {}),
                      children: (0, S.jsx)(J, { docKey: 'about' }),
                    }),
                }),
              ],
            }),
          }),
        });
      }));
    var t = r(d[1]),
      o = (n(r(d[2])), n(r(d[3]))),
      s = n(r(d[4])),
      c = n(r(d[5])),
      R = n(r(d[6])),
      l = n(r(d[7])),
      E = n(r(d[8])),
      S = r(d[9]);
    const p = (0, t.lazy)(() => r(d[11])(d[10], d.paths)),
      O = (0, t.lazy)(() => r(d[11])(d[12], d.paths)),
      m = (0, t.lazy)(() => r(d[11])(d[13], d.paths)),
      u = (0, t.lazy)(() => r(d[11])(d[14], d.paths)),
      T = (0, t.lazy)(() => r(d[11])(d[15], d.paths)),
      j = (0, t.lazy)(() => r(d[11])(d[16], d.paths)),
      x = (0, t.lazy)(() => r(d[11])(d[17], d.paths)),
      I = (0, t.lazy)(() => r(d[11])(d[18], d.paths)),
      h = (0, t.lazy)(() => r(d[11])(d[19], d.paths)),
      b = (0, t.lazy)(() => r(d[11])(d[20], d.paths)),
      _ = (0, t.lazy)(() => r(d[11])(d[21], d.paths)),
      U = (0, t.lazy)(() => r(d[11])(d[22], d.paths)),
      y = (0, t.lazy)(() => r(d[11])(d[23], d.paths)),
      A = (0, t.lazy)(() =>
        r(d[11])(d[24], d.paths).then(n => ({ default: n.TRDriverRideProvider }))
      ),
      P = (0, t.lazy)(() => r(d[11])(d[25], d.paths)),
      f = (0, t.lazy)(() => r(d[11])(d[26], d.paths)),
      L = (0, t.lazy)(() => r(d[11])(d[27], d.paths)),
      z = (0, t.lazy)(() => r(d[11])(d[28], d.paths)),
      N = (0, t.lazy)(() => r(d[11])(d[29], d.paths)),
      B = (0, t.lazy)(() => r(d[11])(d[30], d.paths)),
      D = (0, t.lazy)(() => r(d[11])(d[31], d.paths)),
      F = (0, t.lazy)(() => r(d[11])(d[32], d.paths)),
      v = (0, t.lazy)(() => r(d[11])(d[33], d.paths)),
      C = (0, t.lazy)(() => r(d[11])(d[34], d.paths)),
      M = (0, t.lazy)(() => r(d[11])(d[35], d.paths)),
      V = (0, t.lazy)(() => r(d[11])(d[36], d.paths)),
      G = (0, t.lazy)(() => r(d[11])(d[37], d.paths)),
      k = (0, t.lazy)(() => r(d[11])(d[38], d.paths)),
      Y = (0, t.lazy)(() => r(d[11])(d[39], d.paths)),
      H = (0, t.lazy)(() => r(d[11])(d[40], d.paths)),
      K = (0, t.lazy)(() => r(d[11])(d[41], d.paths)),
      w = (0, t.lazy)(() => r(d[11])(d[42], d.paths)),
      W = (0, t.lazy)(() => r(d[11])(d[43], d.paths)),
      Q = (0, t.lazy)(() => r(d[11])(d[44], d.paths)),
      q = (0, t.lazy)(() => r(d[11])(d[45], d.paths)),
      J = (0, t.lazy)(() => r(d[11])(d[46], d.paths)),
      X = (0, t.lazy)(() => r(d[11])(d[47], d.paths)),
      Z = (0, t.lazy)(() => r(d[11])(d[48], d.paths)),
      $ = (0, t.lazy)(() => r(d[11])(d[49], d.paths)),
      ee = (0, t.lazy)(() => r(d[11])(d[50], d.paths)),
      ne = (0, t.lazy)(() => r(d[11])(d[51], d.paths)),
      te = (0, t.lazy)(() => r(d[11])(d[52], d.paths)),
      ae = (0, t.lazy)(() => r(d[11])(d[53], d.paths)),
      oe = (0, t.lazy)(() => r(d[11])(d[54], d.paths)),
      se = (0, t.lazy)(() => r(d[11])(d[55], d.paths)),
      re = (0, t.lazy)(() => r(d[11])(d[56], d.paths)),
      ce = (0, t.lazy)(() => r(d[11])(d[57], d.paths).then(n => ({ default: n.MateTripProvider }))),
      ie = (0, t.lazy)(() =>
        r(d[11])(d[58], d.paths).then(n => ({ default: n.DeliveryCourierProvider }))
      ),
      Re = (0, r(d[59]).createBottomTabNavigator)(),
      le = (0, r(d[60]).createNativeStackNavigator)();
    function Ee() {
      return (0, S.jsx)(c.default, { message: 'Loading screen' });
    }
    function Se() {
      const { colors: n } = (0, r(d[61]).useTheme)();
      return (0, S.jsx)(s.default, {
        style: [o.default.absoluteFill, { backgroundColor: n.tabBar }],
      });
    }
    function pe() {
      const { colors: n } = (0, r(d[61]).useTheme)();
      return (0, t.useMemo)(
        () => ({
          headerShown: !1,
          lazy: !0,
          tabBarActiveTintColor: n.primaryLight,
          tabBarInactiveTintColor: n.tabInactive,
          tabBarLabelStyle: {
            fontFamily: r(d[62]).fontFamily.semiBold,
            fontSize: r(d[62]).tabBar.labelSize,
            marginBottom: 2,
            letterSpacing: 0.2,
          },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: n.tabBar,
            borderTopColor: n.border,
            borderTopWidth: 1,
            minHeight: r(d[62]).tabBar.height,
            paddingTop: 6,
            paddingBottom: 10,
            elevation: 0,
          },
          tabBarBackground: Se,
          tabBarButton: n => (0, S.jsx)(R.default, Object.assign({}, n)),
        }),
        [n]
      );
    }
    function Oe(n) {
      return function (o) {
        return (0, S.jsx)(t.Suspense, {
          fallback: (0, S.jsx)(Ee, {}),
          children: (0, S.jsx)(n, Object.assign({}, o)),
        });
      };
    }
    function me(n, t) {
      return ({ focused: o, color: s, size: c }) =>
        (0, S.jsx)(r(d[63]).Ionicons, { name: o ? t : n, size: o ? c + 1 : c, color: s });
    }
    function ue() {
      const n = pe(),
        { t: t } = (0, r(d[64]).useLanguage)();
      return (0, S.jsxs)(Re.Navigator, {
        screenOptions: n,
        children: [
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.PASSENGER_FIND_RIDE,
            component: Oe(p),
            options: { title: t('tabs.findRide'), tabBarIcon: me('search-outline', 'search') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.BID_AND_RIDE,
            component: Oe(u),
            options: { title: t('tabs.bidAndRide'), tabBarIcon: me('ribbon-outline', 'ribbon') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.CARPOOL_MATCHER,
            component: Oe(T),
            options: { title: t('tabs.carpool'), tabBarIcon: me('car-outline', 'car') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.TROTRO_MARKET,
            component: Oe(j),
            options: {
              title: t('tabs.market'),
              tabBarIcon: me('storefront-outline', 'storefront'),
            },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.PASSENGER_MY_TRIPS,
            component: Oe(O),
            options: { title: t('tabs.myTrips'), tabBarIcon: me('time-outline', 'time') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.PASSENGER_PROFILE,
            component: Oe(m),
            options: { title: t('tabs.profile'), tabBarIcon: me('person-outline', 'person') },
          }),
        ],
      });
    }
    function Te() {
      const n = pe(),
        { t: t } = (0, r(d[64]).useLanguage)();
      return (0, S.jsxs)(Re.Navigator, {
        screenOptions: n,
        children: [
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.MATE_DASHBOARD,
            component: Oe(x),
            options: { title: t('tabs.dashboard'), tabBarIcon: me('grid-outline', 'grid') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.MATE_ACTIVE_TRIP,
            component: Oe(I),
            options: { title: t('tabs.activeTrip'), tabBarIcon: me('bus-outline', 'bus') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.MATE_EARNINGS,
            component: Oe(h),
            options: { title: t('tabs.earnings'), tabBarIcon: me('cash-outline', 'cash') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.PASSENGER_PROFILE,
            component: Oe(m),
            options: { title: t('tabs.profile'), tabBarIcon: me('person-outline', 'person') },
          }),
        ],
      });
    }
    function je() {
      return (0, S.jsx)(t.Suspense, {
        fallback: (0, S.jsx)(Ee, {}),
        children: (0, S.jsxs)(ce, { children: [(0, S.jsx)(Te, {}), (0, S.jsx)(E.default, {})] }),
      });
    }
    function xe() {
      const n = pe(),
        { t: t } = (0, r(d[64]).useLanguage)();
      return (0, S.jsxs)(S.Fragment, {
        children: [
          (0, S.jsxs)(Re.Navigator, {
            screenOptions: n,
            children: [
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.TR_DRIVER_DASHBOARD,
                component: Oe(b),
                options: { title: t('tabs.dashboard'), tabBarIcon: me('grid-outline', 'grid') },
              }),
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.TR_RIDE,
                component: Oe(_),
                options: { title: t('tabs.activeRide'), tabBarIcon: me('car-outline', 'car') },
              }),
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.TR_EARNINGS,
                component: Oe(y),
                options: { title: t('tabs.earnings'), tabBarIcon: me('cash-outline', 'cash') },
              }),
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.PASSENGER_PROFILE,
                component: Oe(m),
                options: { title: t('tabs.profile'), tabBarIcon: me('person-outline', 'person') },
              }),
            ],
          }),
          (0, S.jsx)(l.default, {}),
          (0, S.jsx)(E.default, {}),
        ],
      });
    }
    function Ie() {
      return (0, S.jsx)(t.Suspense, {
        fallback: (0, S.jsx)(Ee, {}),
        children: (0, S.jsx)(A, { children: (0, S.jsx)(xe, {}) }),
      });
    }
    function he() {
      const n = pe(),
        { t: t } = (0, r(d[64]).useLanguage)();
      return (0, S.jsxs)(S.Fragment, {
        children: [
          (0, S.jsxs)(Re.Navigator, {
            screenOptions: n,
            children: [
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.COURIER_DASHBOARD,
                component: Oe(ne),
                options: { title: t('tabs.dashboard'), tabBarIcon: me('cube-outline', 'cube') },
              }),
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.COURIER_ACTIVE,
                component: Oe(te),
                options: {
                  title: t('tabs.activeDelivery'),
                  tabBarIcon: me('navigate-outline', 'navigate'),
                },
              }),
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.COURIER_EARNINGS,
                component: Oe(ae),
                options: { title: t('tabs.earnings'), tabBarIcon: me('cash-outline', 'cash') },
              }),
              (0, S.jsx)(Re.Screen, {
                name: r(d[65]).ROUTES.PASSENGER_PROFILE,
                component: Oe(m),
                options: { title: t('tabs.profile'), tabBarIcon: me('person-outline', 'person') },
              }),
            ],
          }),
          (0, S.jsx)(E.default, {}),
        ],
      });
    }
    function be() {
      return (0, S.jsx)(t.Suspense, { fallback: (0, S.jsx)(Ee, {}), children: (0, S.jsx)(he, {}) });
    }
    function _e() {
      const n = pe(),
        { t: t } = (0, r(d[64]).useLanguage)();
      return (0, S.jsxs)(Re.Navigator, {
        screenOptions: n,
        children: [
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.VENDOR_ORDERS,
            component: Oe(oe),
            options: { title: t('tabs.orders'), tabBarIcon: me('receipt-outline', 'receipt') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.VENDOR_MENU,
            component: Oe(se),
            options: { title: t('tabs.menu'), tabBarIcon: me('restaurant-outline', 'restaurant') },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.VENDOR_PROFILE,
            component: Oe(re),
            options: {
              title: t('tabs.vendorProfile'),
              tabBarIcon: me('storefront-outline', 'storefront'),
            },
          }),
          (0, S.jsx)(Re.Screen, {
            name: r(d[65]).ROUTES.PASSENGER_PROFILE,
            component: Oe(m),
            options: { title: t('tabs.profile'), tabBarIcon: me('person-outline', 'person') },
          }),
        ],
      });
    }
    function de() {
      const n = (0, r(d[66]).useNavigation)(),
        { activeRole: o, ready: s } = (0, r(d[67]).useAppMode)(),
        c = (0, t.useRef)(null);
      return (
        (0, t.useEffect)(() => {
          s &&
            (null != c.current &&
              c.current !== o &&
              n.dispatch(
                r(d[66]).CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' }] })
              ),
            (c.current = o));
        }, [o, s, n]),
        s
          ? o === r(d[68]).USER_ROLES.MATE
            ? (0, S.jsx)(je, {}, 'mate')
            : o === r(d[68]).USER_ROLES.TROTRORIDE_DRIVER
              ? (0, S.jsx)(Ie, {}, 'driver')
              : o === r(d[68]).USER_ROLES.COURIER
                ? (0, S.jsx)(be, {}, 'courier')
                : o === r(d[68]).USER_ROLES.VENDOR
                  ? (0, S.jsx)(_e, {}, 'vendor')
                  : (0, S.jsx)(ue, {}, 'passenger')
          : (0, S.jsx)(Ee, {})
      );
    }
    function Ue(n) {
      return n === r(d[68]).USER_ROLES.MATE
        ? 'trotro'
        : n === r(d[68]).USER_ROLES.TROTRORIDE_DRIVER
          ? 'car'
          : 'bike';
    }
  },
  1418,
  {
    0: 1,
    1: 5,
    2: 14,
    3: 26,
    4: 19,
    5: 372,
    6: 1419,
    7: 1420,
    8: 1421,
    9: 183,
    10: 1437,
    11: 942,
    12: 1438,
    13: 1439,
    14: 1440,
    15: 1441,
    16: 1442,
    17: 1443,
    18: 1444,
    19: 1445,
    20: 1446,
    21: 1447,
    22: 1448,
    23: 1449,
    24: 1450,
    25: 1451,
    26: 744,
    27: 1452,
    28: 1453,
    29: 1454,
    30: 1455,
    31: 1456,
    32: 1457,
    33: 1458,
    34: 1459,
    35: 1460,
    36: 1461,
    37: 1462,
    38: 1463,
    39: 1464,
    40: 1465,
    41: 1466,
    42: 1467,
    43: 1468,
    44: 1469,
    45: 1470,
    46: 1471,
    47: 1472,
    48: 1473,
    49: 1474,
    50: 1475,
    51: 1476,
    52: 1477,
    53: 1478,
    54: 1479,
    55: 1480,
    56: 1481,
    57: 1482,
    58: 1483,
    59: 1422,
    60: 693,
    61: 381,
    62: 377,
    63: 578,
    64: 1381,
    65: 682,
    66: 382,
    67: 1484,
    68: 508,
    paths: {
      1437: '/app/_expo/static/js/web/FindRideScreen-e3ba070a86f99021a44111735b527b93.js',
      1438: '/app/_expo/static/js/web/MyTripsScreen-8d5b3f70e3821230fe0077e8c5a5ff99.js',
      1439: '/app/_expo/static/js/web/PassengerProfileScreen-98166ddaceeb35eab3a9a732f97111c1.js',
      1440: '/app/_expo/static/js/web/BidAndRideScreen-8e5542eba7f29ed226a642110da887ae.js',
      1441: '/app/_expo/static/js/web/CarpoolMatcherScreen-c5af501a69cb035cf8ebf967bd3d663b.js',
      1442: '/app/_expo/static/js/web/TrotroMarketScreen-ceb3aca8eb88f8e543ef363c03541639.js',
      1443: '/app/_expo/static/js/web/MateDashboard-d786ce68192e55aa75cedf1f6c3f6cc7.js',
      1444: '/app/_expo/static/js/web/MateActiveTrip-c9c40ca8e0a941d0cc2ae2741a812282.js',
      1445: '/app/_expo/static/js/web/MateEarnings-267e4fc8fb29bca3c34478a281c9da17.js',
      1446: '/app/_expo/static/js/web/TRDriverDashboard-d58b2dfe0aab33495f7cce8f45131491.js',
      1447: '/app/_expo/static/js/web/TRRideScreen-bf45996198b5b7b428f212fcadedcde2.js',
      1448: '/app/_expo/static/js/web/TRPassengerRideScreen-0cba3bbc88b245a7c323d49b9cce353b.js',
      1449: '/app/_expo/static/js/web/TREarnings-c05a5973a303a27b831d5eefb7e6b851.js',
      1451: '/app/_expo/static/js/web/StationMasterScreen-26d1ea6d209085fbdd9bf3a7699c087e.js',
      1452: '/app/_expo/static/js/web/MyLocationScreen-74c89d34e27e198f16dc2c215cccb0c9.js',
      1453: '/app/_expo/static/js/web/SavedPlacesScreen-50714f74f2b75ade3c29ea342b6698b7.js',
      1454: '/app/_expo/static/js/web/FavoriteRoutesScreen-dcfb8cb1edf4072da81f5b27273f132c.js',
      1455: '/app/_expo/static/js/web/ScheduledRidesScreen-232bbcd7ac3813ae23c46da8e4f96b01.js',
      1456: '/app/_expo/static/js/web/TripHistoryScreen-f8fa2ac7e8d4e7364820aee849afaa18.js',
      1457: '/app/_expo/static/js/web/MyRatingScreen-0e6a7e3806d66c7bc81f89e3f9406a79.js',
      1458: '/app/_expo/static/js/web/EditProfileScreen-61fcdbb7eb5f6aa6f1daa6225f60d728.js',
      1459: '/app/_expo/static/js/web/WalletScreen-7de2a06f3bec8feb864956af5ac82b18.js',
      1460: '/app/_expo/static/js/web/NotificationsScreen-6a756b3c473f51163671f920c689d5fc.js',
      1461: '/app/_expo/static/js/web/SafetyPreferencesScreen-a6207b32dc70537385c30c76c9706bb0.js',
      1462: '/app/_expo/static/js/web/PrivacyScreen-db60283951c7f5f0955b0762e4850337.js',
      1463: '/app/_expo/static/js/web/DataPrivacyScreen-c0dde47f888070e1de31624ff188d131.js',
      1464: '/app/_expo/static/js/web/LanguageScreen-43bb15a6003300b1d864622f684f600c.js',
      1465: '/app/_expo/static/js/web/AppModeScreen-b52706c518b12162581621f5bb89f98a.js',
      1466: '/app/_expo/static/js/web/EmergencyContactScreen-b1f1fa2b91fc4ba26aa16d6e26f4a125.js',
      1467: '/app/_expo/static/js/web/ReportIssueScreen-1b7469b06404499a3fbbc1f3c9baa8b8.js',
      1468: '/app/_expo/static/js/web/InviteFriendsScreen-db1bb213be7cef0322716910295c533b.js',
      1469: '/app/_expo/static/js/web/HelpFaqScreen-b21c8e5b23ebc32b41c51ab420dfe6e9.js',
      1470: '/app/_expo/static/js/web/ContactSupportScreen-50059fc8506a8ab75f0a0bacb1d11b46.js',
      1471: '/app/_expo/static/js/web/LegalScreen-16a41d1133b7427dd9b33875b43710b8.js',
      1472: '/app/_expo/static/js/web/SendParcelScreen-7e4a948957f76026031dedb837980d6c.js',
      1473: '/app/_expo/static/js/web/FoodVendorsScreen-4ad32761ba86e42e8807ea66485785bc.js',
      1474: '/app/_expo/static/js/web/EatsMenuScreen-823ef809dd033156a7c1cb1bd4899bd6.js',
      1475: '/app/_expo/static/js/web/DeliveryTrackingScreen-f34c849722a3d321a23fa62e7422455d.js',
      1476: '/app/_expo/static/js/web/CourierDashboardScreen-53da6556611130f2ffe77e6c5bc642d7.js',
      1477: '/app/_expo/static/js/web/CourierActiveDeliveryScreen-a6462fb1243f061cc09b01de0e1dd180.js',
      1478: '/app/_expo/static/js/web/CourierEarningsScreen-d9cd098d0bc58336b25f326370b6a06f.js',
      1479: '/app/_expo/static/js/web/VendorOrdersScreen-b88bef6108df040b18b8aae9812bc0a8.js',
      1480: '/app/_expo/static/js/web/VendorMenuScreen-f90f43a8e9d6a633029b0472c593adac.js',
      1481: '/app/_expo/static/js/web/VendorProfileEditScreen-a9ce016b3f0b975f151159988548b664.js',
    },
  }
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function ({ accessibilityState: t, children: s, onPress: u, style: f }) {
        return (0, c.jsx)(n.default, {
          onPress: u,
          style: [o.wrapper, f],
          children: (0, c.jsx)(l.default, { style: o.inner, children: s }),
        });
      }));
    var n = t(r(d[1])),
      l = t(r(d[2])),
      s = t(r(d[3])),
      c = (t(r(d[4])), r(d[5]));
    const o = s.default.create({
      wrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
      inner: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 2,
        minWidth: 72,
      },
    });
  },
  1419,
  [1, 326, 19, 26, 14, 183]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[11]).useNavigation)(),
          s = (0, r(d[12]).useSafeAreaInsets)(),
          { colors: h } = (0, r(d[13]).useTheme)(),
          {
            user: b,
            pendingRequest: j,
            requestCountdown: S,
            loading: T,
            driverLocation: R,
            selectedCorridor: k,
            acceptRequest: w,
            declineRequest: z,
          } = (0, r(d[14]).useTRDriverRide)(),
          v = (0, n.useRef)(null);
        if (
          ((0, n.useEffect)(() => {
            j?.id &&
              b?.id &&
              v.current !== j.id &&
              ((v.current = j.id),
              f.default.vibrate([0, 400, 120, 400]),
              (0, r(d[15]).notifyTrotroRideDriverIncomingRequest)(b.id, {
                passengerName: j.passenger_name,
                pickup: j.pickup,
                earnings: j.fare?.driverEarnings ?? j.fare_breakdown?.driverEarnings,
              }).catch(() => {}));
          }, [j?.id, b?.id, j]),
          (0, n.useEffect)(() => {
            j || (v.current = null);
          }, [j]),
          !j)
        )
          return null;
        const B = j.fare ?? j.fare_breakdown ?? {},
          I = j.seatsFilled ?? 0,
          C = Number(j.distance_km ?? B.distanceKm ?? 0),
          _ = Number(j.time_min ?? B.timeMin ?? 0),
          H = (0, r(d[16]).buildRequestPreviewWaypoints)(j, R),
          N = H.find(t => 'pickup' === t.type) ?? {
            type: 'pickup',
            label: j.pickup,
            latitude: j.pickup_lat ?? 6.6738,
            longitude: j.pickup_lng ?? -1.5647,
            passengerName: j.passenger_name,
          };
        return (0, x.jsx)(o.default, {
          visible: !0,
          animationType: 'slide',
          presentationStyle: 'fullScreen',
          children: (0, x.jsxs)(u.default, {
            style: [F.container, { backgroundColor: h.background, paddingTop: s.top }],
            children: [
              (0, x.jsxs)(u.default, {
                style: [F.alertBar, { backgroundColor: h.incoming ?? '#FF5500' }],
                children: [
                  (0, x.jsx)(u.default, {
                    style: [F.alertDot, { backgroundColor: h.onIncoming ?? '#FFF' }],
                  }),
                  (0, x.jsx)(c.default, {
                    style: [F.alertText, { color: h.onIncoming ?? '#FFF' }],
                    children: 'Incoming ride request',
                  }),
                  (0, x.jsx)(u.default, {
                    style: [F.timerPill, { backgroundColor: 'rgba(255,255,255,0.22)' }],
                    children: (0, x.jsxs)(c.default, {
                      style: [F.timerText, { color: h.onIncoming ?? '#FFF' }],
                      children: [S, 's'],
                    }),
                  }),
                ],
              }),
              (0, x.jsxs)(c.default, {
                style: [F.subTimer, { color: h.textSecondary }],
                children: ['Accept within ', S, 's or the request goes to the next driver'],
              }),
              (0, x.jsxs)(u.default, {
                style: F.passengerBlock,
                children: [
                  (0, x.jsx)(c.default, {
                    style: [F.passengerName, { color: h.textPrimary }],
                    children: j.passenger_name,
                  }),
                  (0, x.jsxs)(u.default, {
                    style: F.passengerMeta,
                    children: [
                      (0, x.jsx)(y.default, {
                        score: Math.round(20 * (j.passenger_rating ?? 4.7)),
                        compact: !0,
                        variant: 'success',
                      }),
                      (0, x.jsxs)(c.default, {
                        style: [F.rating, { color: h.textSecondary }],
                        children: [(j.passenger_rating ?? 4.7).toFixed(1), ' \u2605'],
                      }),
                    ],
                  }),
                ],
              }),
              (0, x.jsx)(p.default, {
                waypoints: H,
                corridor: k ?? j.corridor ?? 'Tech Junction \u2192 Ayeduase',
                driverCoord: R,
                nextStop: N,
                fitRoute: !0,
                showCorridor: !1,
                showNavBanner: !0,
                style: F.map,
              }),
              (0, x.jsxs)(u.default, {
                style: F.locationBlock,
                children: [
                  (0, x.jsxs)(u.default, {
                    style: F.locationRow,
                    children: [
                      (0, x.jsx)(r(d[19]).Ionicons, {
                        name: 'navigate',
                        size: 16,
                        color: h.greenAccent,
                      }),
                      (0, x.jsx)(c.default, {
                        style: [F.locationText, { color: h.textPrimary }],
                        numberOfLines: 2,
                        children: j.pickup,
                      }),
                    ],
                  }),
                  (0, x.jsxs)(u.default, {
                    style: F.locationRow,
                    children: [
                      (0, x.jsx)(r(d[19]).Ionicons, { name: 'flag', size: 16, color: h.warning }),
                      (0, x.jsx)(c.default, {
                        style: [F.locationText, { color: h.textPrimary }],
                        numberOfLines: 2,
                        children: j.dropoff,
                      }),
                    ],
                  }),
                ],
              }),
              (0, x.jsxs)(u.default, {
                style: [F.fareCard, { backgroundColor: h.surfaceElevated, borderColor: h.border }],
                children: [
                  (0, x.jsxs)(u.default, {
                    style: F.fareRow,
                    children: [
                      (0, x.jsx)(c.default, {
                        style: [F.fareLabel, { color: h.textSecondary }],
                        children: 'Your earnings',
                      }),
                      (0, x.jsxs)(c.default, {
                        style: [F.fareValue, { color: h.textPrimary }],
                        children: ['GHS ', Number(B.driverEarnings ?? 0).toFixed(2)],
                      }),
                    ],
                  }),
                  C > 0 || _ > 0
                    ? (0, x.jsxs)(u.default, {
                        style: F.fareRow,
                        children: [
                          (0, x.jsx)(c.default, {
                            style: [F.fareLabel, { color: h.textSecondary }],
                            children: 'Trip estimate',
                          }),
                          (0, x.jsx)(c.default, {
                            style: [F.fareMuted, { color: h.textSecondary }],
                            children: [
                              _ > 0 ? `${Math.round(_)} min` : null,
                              C > 0 ? `${C.toFixed(1)} km` : null,
                            ]
                              .filter(Boolean)
                              .join(' \xb7 '),
                          }),
                        ],
                      })
                    : null,
                  (0, x.jsxs)(u.default, {
                    style: F.fareRow,
                    children: [
                      (0, x.jsxs)(c.default, {
                        style: [F.fareLabel, { color: h.textSecondary }],
                        children: ['Platform fee (', r(d[20]).TR_COMMISSION_PERCENT, '%)'],
                      }),
                      (0, x.jsxs)(c.default, {
                        style: [F.fareMuted, { color: h.textSecondary }],
                        children: ['GHS ', Number(B.platformFee ?? 0).toFixed(2)],
                      }),
                    ],
                  }),
                  (0, x.jsxs)(c.default, {
                    style: [F.seats, { color: h.textSecondary }],
                    children: [
                      I,
                      '/3 seats filled',
                      j.coPassengerNote ? ` \xb7 ${j.coPassengerNote}` : '',
                    ],
                  }),
                ],
              }),
              (0, x.jsxs)(u.default, {
                style: [F.actions, { paddingBottom: s.bottom + r(d[21]).spacing.md }],
                children: [
                  (0, x.jsxs)(l.default, {
                    style: [
                      F.acceptBtn,
                      { backgroundColor: h.success ?? h.greenAccent ?? '#00A86B' },
                      T && F.disabled,
                    ],
                    onPress: async () => {
                      const { data: n, error: o } = await w();
                      !o && n && (0, r(d[17]).navigateToMainTab)(t, r(d[18]).ROUTES.TR_RIDE);
                    },
                    disabled: T,
                    testID: 'tr-incoming-accept',
                    children: [
                      (0, x.jsx)(r(d[19]).Ionicons, {
                        name: 'checkmark-circle',
                        size: 24,
                        color: '#FFFFFF',
                      }),
                      (0, x.jsx)(c.default, {
                        style: [F.acceptText, { color: '#FFFFFF' }],
                        children: 'Accept ride',
                      }),
                    ],
                  }),
                  (0, x.jsx)(l.default, {
                    style: F.declineBtn,
                    onPress: z,
                    disabled: T,
                    children: (0, x.jsx)(c.default, {
                      style: [F.declineText, { color: h.error ?? '#E11D48' }],
                      children: 'Decline / cancel request',
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }));
    var n = r(d[1]),
      o = t(r(d[2])),
      l = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      f = t(r(d[6])),
      u = t(r(d[7])),
      p = t(r(d[8])),
      y = t(r(d[9])),
      x = r(d[10]);
    const F = s.default.create({
      container: { flex: 1 },
      alertBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[21]).spacing.sm,
        paddingHorizontal: r(d[21]).spacing.lg,
        paddingVertical: r(d[21]).spacing.md,
      },
      alertDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' },
      alertText: { flex: 1, fontFamily: r(d[21]).fontFamily.bold, fontSize: 16 },
      timerPill: {
        paddingHorizontal: r(d[21]).spacing.sm,
        paddingVertical: 4,
        borderRadius: r(d[21]).radius.pill,
      },
      timerText: { fontFamily: r(d[21]).fontFamily.bold, fontSize: 15 },
      subTimer: {
        fontFamily: r(d[21]).fontFamily.medium,
        fontSize: 13,
        paddingHorizontal: r(d[21]).spacing.lg,
        paddingBottom: r(d[21]).spacing.sm,
        lineHeight: 18,
      },
      passengerBlock: {
        paddingHorizontal: r(d[21]).spacing.lg,
        paddingBottom: r(d[21]).spacing.sm,
      },
      passengerName: { fontFamily: r(d[21]).fontFamily.bold, fontSize: 22 },
      passengerMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: r(d[21]).spacing.sm,
        marginTop: r(d[21]).spacing.xs,
      },
      rating: { fontFamily: r(d[21]).fontFamily.medium, fontSize: 14 },
      map: {
        flex: 1,
        marginHorizontal: r(d[21]).spacing.md,
        marginBottom: r(d[21]).spacing.sm,
        borderRadius: r(d[21]).radius.lg,
        overflow: 'hidden',
        minHeight: 200,
      },
      locationBlock: {
        paddingHorizontal: r(d[21]).spacing.lg,
        gap: r(d[21]).spacing.xs,
        marginBottom: r(d[21]).spacing.sm,
      },
      locationRow: { flexDirection: 'row', alignItems: 'flex-start', gap: r(d[21]).spacing.sm },
      locationText: {
        flex: 1,
        fontFamily: r(d[21]).fontFamily.medium,
        fontSize: 14,
        lineHeight: 20,
      },
      fareCard: {
        marginHorizontal: r(d[21]).spacing.lg,
        padding: r(d[21]).spacing.md,
        borderRadius: r(d[21]).radius.lg,
        borderWidth: 1,
        gap: r(d[21]).spacing.xs,
        marginBottom: r(d[21]).spacing.sm,
      },
      fareRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      fareLabel: { fontFamily: r(d[21]).fontFamily.medium, fontSize: 14 },
      fareValue: { fontFamily: r(d[21]).fontFamily.bold, fontSize: 18 },
      fareMuted: { fontFamily: r(d[21]).fontFamily.medium, fontSize: 14 },
      seats: {
        fontFamily: r(d[21]).fontFamily.regular,
        fontSize: 13,
        marginTop: r(d[21]).spacing.xs,
      },
      actions: { paddingHorizontal: r(d[21]).spacing.lg, gap: r(d[21]).spacing.sm },
      acceptBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: r(d[21]).spacing.sm,
        minHeight: 56,
        borderRadius: r(d[21]).radius.md,
      },
      acceptText: { fontFamily: r(d[21]).fontFamily.bold, fontSize: 17 },
      declineBtn: { alignItems: 'center', paddingVertical: r(d[21]).spacing.md },
      declineText: { fontFamily: r(d[21]).fontFamily.semiBold, fontSize: 16 },
      disabled: { opacity: 0.55 },
    });
  },
  1420,
  [
    1, 5, 948, 326, 26, 161, 675, 19, 1485, 1486, 183, 382, 572, 381, 1450, 760, 1487, 1488, 682,
    578, 508, 377,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[10]).useNavigation)(),
          s = (0, r(d[11]).useSafeAreaInsets)(),
          { colors: x } = (0, r(d[12]).useTheme)(),
          { t: h } = (0, r(d[13]).useLanguage)(),
          F = (0, l.useMemo)(() => b(x), [x]),
          { showToast: j } = (0, r(d[14]).useToast)(),
          {
            pendingJob: v,
            activeJob: k,
            acceptJob: S,
            declineJob: w,
            loading: T,
            jobCountdown: z,
          } = (0, r(d[15]).useDeliveryCourier)(),
          _ = (0, l.useRef)(null),
          B = !v || (k && 'assigned' !== k.status) ? null : v,
          C = Boolean(B),
          R = 'parcel' === B?.kind && 'pending' === B?.status && !B?.assigned_courier_id,
          E = Number(B?.fare_breakdown?.tipGhs ?? B?.tip_ghs ?? 0),
          H = Number(B?.fare_breakdown?.courierEarnings ?? B?.fare_breakdown?.deliveryFee ?? 0),
          I = Number(B?.fare_breakdown?.total ?? B?.fare_breakdown?.deliveryFee ?? 0);
        ((0, l.useEffect)(() => {
          B?.id &&
            _.current !== B.id &&
            ((_.current = B.id), u.default.vibrate([0, 350, 100, 350]));
        }, [B?.id]),
          (0, l.useEffect)(() => {
            B || (_.current = null);
          }, [B]));
        if (!C || !B) return null;
        const L = h(
            R
              ? 'delivery.openParcelWaiting'
              : 'ready_for_pickup' === B?.status
                ? 'delivery.foodReady'
                : 'delivery.newJobNearby'
          ),
          P = 'food' === B.kind ? h('delivery.courierFoodOrder') : h('delivery.parcelLabel');
        return (0, p.jsx)(o.default, {
          visible: !0,
          animationType: 'slide',
          presentationStyle: 'fullScreen',
          children: (0, p.jsxs)(f.default, {
            style: [F.container, { backgroundColor: x.background, paddingTop: s.top }],
            children: [
              (0, p.jsxs)(f.default, {
                style: [F.alertBar, { backgroundColor: x.incoming ?? '#FF5500' }],
                children: [
                  (0, p.jsx)(f.default, {
                    style: [F.alertDot, { backgroundColor: x.onIncoming ?? '#FFF' }],
                  }),
                  (0, p.jsx)(c.default, {
                    style: [F.alertText, { color: x.onIncoming ?? '#FFF' }],
                    children:
                      'food' === B.kind ? h('delivery.eatsPickup') : h('delivery.parcelRequest'),
                  }),
                  (0, p.jsx)(f.default, {
                    style: [F.timerPill, { backgroundColor: 'rgba(255,255,255,0.22)' }],
                    children: (0, p.jsxs)(c.default, {
                      style: [F.timerText, { color: x.onIncoming ?? '#FFF' }],
                      children: [z, 's'],
                    }),
                  }),
                ],
              }),
              (0, p.jsx)(c.default, {
                style: [F.subTimer, { color: x.textSecondary }],
                children: h('delivery.incomingCountdown', { seconds: z }),
              }),
              (0, p.jsxs)(f.default, {
                style: F.heroBlock,
                children: [
                  (0, p.jsx)(c.default, {
                    style: [F.subtitle, { color: x.textSecondary }],
                    children: L,
                  }),
                  (0, p.jsx)(c.default, {
                    style: [F.earnHero, { color: x.gold ?? '#C9A227' }],
                    children: (0, r(d[18]).formatGhs)(Math.max(H, I)),
                  }),
                  (0, p.jsx)(c.default, {
                    style: [F.earnSub, { color: x.textMuted }],
                    children: h('delivery.yourEarnings'),
                  }),
                ],
              }),
              (0, p.jsx)(f.default, {
                style: F.cardWrap,
                children: (0, p.jsx)(y.default, {
                  pickup: B.pickup,
                  dropoff: B.dropoff,
                  pickupLabel: h('delivery.pickup'),
                  dropoffLabel: h('delivery.dropoff'),
                  kind: B.kind,
                  kindLabel: P,
                }),
              }),
              (0, p.jsxs)(f.default, {
                style: [F.metaCard, { backgroundColor: x.surfaceElevated, borderColor: x.border }],
                children: [
                  B.size
                    ? (0, p.jsxs)(f.default, {
                        style: F.metaRow,
                        children: [
                          (0, p.jsx)(c.default, {
                            style: [F.metaLabel, { color: x.textSecondary }],
                            children: h('delivery.size'),
                          }),
                          (0, p.jsx)(c.default, {
                            style: [F.metaValue, { color: x.textPrimary }],
                            children: B.size,
                          }),
                        ],
                      })
                    : null,
                  'food' === B.kind
                    ? (0, p.jsxs)(f.default, {
                        style: F.metaRow,
                        children: [
                          (0, p.jsx)(c.default, {
                            style: [F.metaLabel, { color: x.textSecondary }],
                            children: h('eats.prepEta'),
                          }),
                          (0, p.jsx)(c.default, {
                            style: [F.metaValue, { color: x.textPrimary }],
                            children: B.ready_at
                              ? h('delivery.readyNow')
                              : h('delivery.prepAtVendor', {
                                  minutes:
                                    B.prep_eta_minutes ?? B.fare_breakdown?.prepMinutes ?? 20,
                                }),
                          }),
                        ],
                      })
                    : null,
                  E > 0
                    ? (0, p.jsxs)(f.default, {
                        style: F.metaRow,
                        children: [
                          (0, p.jsx)(c.default, {
                            style: [F.metaLabel, { color: x.textSecondary }],
                            children: h('eats.tip'),
                          }),
                          (0, p.jsx)(c.default, {
                            style: [F.metaValue, { color: x.gold ?? x.success }],
                            children: (0, r(d[18]).formatGhs)(E),
                          }),
                        ],
                      })
                    : null,
                  (0, p.jsxs)(f.default, {
                    style: F.metaRow,
                    children: [
                      (0, p.jsx)(c.default, {
                        style: [F.metaLabel, { color: x.textSecondary }],
                        children: h('delivery.yourEarnings'),
                      }),
                      (0, p.jsx)(c.default, {
                        style: [F.metaValue, { color: x.textPrimary }],
                        children: (0, r(d[18]).formatGhs)(H),
                      }),
                    ],
                  }),
                ],
              }),
              (0, p.jsxs)(f.default, {
                style: [
                  F.actions,
                  { paddingBottom: s.bottom + r(d[19]).spacing.md, marginTop: 'auto' },
                ],
                children: [
                  (0, p.jsxs)(n.default, {
                    style: [
                      F.acceptBtn,
                      { backgroundColor: x.success ?? x.greenAccent ?? '#00A86B' },
                      T && F.disabled,
                    ],
                    onPress: async () => {
                      const { error: l } = await S(B.id);
                      l
                        ? j({
                            type: 'error',
                            title: h('delivery.acceptFailed'),
                            message: l.message,
                          })
                        : (j({
                            type: 'success',
                            title: h('delivery.accepted'),
                            message: h('delivery.headToPickup'),
                          }),
                          (0, r(d[16]).navigateToRootScreen)(t, r(d[17]).ROUTES.DELIVERY_ACTIVE));
                    },
                    disabled: T,
                    children: [
                      (0, p.jsx)(r(d[20]).Ionicons, {
                        name: 'checkmark-circle',
                        size: 24,
                        color: '#FFFFFF',
                      }),
                      (0, p.jsx)(c.default, {
                        style: F.acceptText,
                        children: h('delivery.accept'),
                      }),
                    ],
                  }),
                  (0, p.jsx)(n.default, {
                    style: F.declineBtn,
                    onPress: () => w(B.id),
                    disabled: T,
                    children: (0, p.jsx)(c.default, {
                      style: [F.declineText, { color: x.error ?? '#E11D48' }],
                      children: h('delivery.decline'),
                    }),
                  }),
                ],
              }),
            ],
          }),
        });
      }));
    var l = r(d[1]),
      o = t(r(d[2])),
      n = t(r(d[3])),
      s = t(r(d[4])),
      c = t(r(d[5])),
      u = t(r(d[6])),
      f = t(r(d[7])),
      y = t(r(d[8])),
      p = r(d[9]);
    const b = t =>
      s.default.create({
        container: { flex: 1 },
        alertBar: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[19]).spacing.sm,
          paddingHorizontal: r(d[19]).spacing.lg,
          paddingVertical: r(d[19]).spacing.md,
        },
        alertDot: { width: 8, height: 8, borderRadius: 4 },
        alertText: { flex: 1, fontFamily: r(d[19]).fontFamily.bold, fontSize: 16 },
        timerPill: {
          paddingHorizontal: r(d[19]).spacing.sm,
          paddingVertical: 4,
          borderRadius: r(d[19]).radius.pill,
        },
        timerText: { fontFamily: r(d[19]).fontFamily.bold, fontSize: 15 },
        subTimer: {
          fontFamily: r(d[19]).fontFamily.medium,
          fontSize: 13,
          paddingHorizontal: r(d[19]).spacing.lg,
          paddingBottom: r(d[19]).spacing.sm,
          lineHeight: 18,
        },
        heroBlock: { paddingHorizontal: r(d[19]).spacing.lg, paddingBottom: r(d[19]).spacing.md },
        subtitle: {
          fontFamily: r(d[19]).fontFamily.medium,
          fontSize: 14,
          marginBottom: r(d[19]).spacing.xs,
        },
        earnHero: { fontFamily: r(d[19]).fontFamily.bold, fontSize: 42, lineHeight: 48 },
        earnSub: {
          fontFamily: r(d[19]).fontFamily.medium,
          fontSize: 13,
          marginTop: 2,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        },
        cardWrap: { paddingHorizontal: r(d[19]).spacing.lg, marginBottom: r(d[19]).spacing.md },
        metaCard: {
          marginHorizontal: r(d[19]).spacing.lg,
          padding: r(d[19]).spacing.lg,
          borderRadius: r(d[19]).radius.lg,
          borderWidth: 1,
          gap: r(d[19]).spacing.sm,
        },
        metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        metaLabel: { fontFamily: r(d[19]).fontFamily.medium, fontSize: 14 },
        metaValue: { fontFamily: r(d[19]).fontFamily.semiBold, fontSize: 15 },
        actions: { paddingHorizontal: r(d[19]).spacing.lg, gap: r(d[19]).spacing.sm },
        acceptBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: r(d[19]).spacing.sm,
          minHeight: 56,
          borderRadius: r(d[19]).radius.lg,
        },
        acceptText: { fontFamily: r(d[19]).fontFamily.bold, fontSize: 17, color: '#FFFFFF' },
        declineBtn: { alignItems: 'center', paddingVertical: r(d[19]).spacing.md },
        declineText: { fontFamily: r(d[19]).fontFamily.semiBold, fontSize: 15 },
        disabled: { opacity: 0.6 },
      });
  },
  1421,
  [
    1, 5, 948, 326, 26, 161, 675, 19, 1489, 183, 382, 572, 381, 1381, 1386, 1483, 1488, 682, 691,
    377, 578,
  ]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      Object.defineProperty(_e, 'BottomTabBar', {
        enumerable: !0,
        get: function () {
          return _r(d[0]).BottomTabBar;
        },
      }),
      Object.defineProperty(_e, 'BottomTabBarHeightCallbackContext', {
        enumerable: !0,
        get: function () {
          return _r(d[1]).BottomTabBarHeightCallbackContext;
        },
      }),
      Object.defineProperty(_e, 'BottomTabBarHeightContext', {
        enumerable: !0,
        get: function () {
          return _r(d[2]).BottomTabBarHeightContext;
        },
      }),
      Object.defineProperty(_e, 'BottomTabView', {
        enumerable: !0,
        get: function () {
          return _r(d[3]).BottomTabView;
        },
      }),
      (_e.TransitionSpecs = _e.TransitionPresets = _e.SceneStyleInterpolators = void 0),
      Object.defineProperty(_e, 'createBottomTabNavigator', {
        enumerable: !0,
        get: function () {
          return _r(d[4]).createBottomTabNavigator;
        },
      }),
      Object.defineProperty(_e, 'createBottomTabScreen', {
        enumerable: !0,
        get: function () {
          return _r(d[4]).createBottomTabScreen;
        },
      }),
      Object.defineProperty(_e, 'useBottomTabBarHeight', {
        enumerable: !0,
        get: function () {
          return _r(d[5]).useBottomTabBarHeight;
        },
      }));
    var e = n(_r(d[6]));
    _e.SceneStyleInterpolators = e;
    var t = n(_r(d[7]));
    _e.TransitionPresets = t;
    var r = n(_r(d[8]));
    function n(e, t) {
      if ('function' == typeof WeakMap)
        var r = new WeakMap(),
          o = new WeakMap();
      return (n = function (e, t) {
        if (!t && e && e.__esModule) return e;
        var n,
          i,
          u = { __proto__: null, default: e };
        if (null === e || ('object' != typeof e && 'function' != typeof e)) return u;
        if ((n = t ? o : r)) {
          if (n.has(e)) return n.get(e);
          n.set(e, u);
        }
        for (const t in e)
          'default' !== t &&
            {}.hasOwnProperty.call(e, t) &&
            ((i = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
            (i.get || i.set)
              ? n(u, t, i)
              : (u[t] = e[t]));
        return u;
      })(e, t);
    }
    _e.TransitionSpecs = r;
  },
  1422,
  [1423, 1425, 1428, 1429, 1435, 1436, 1432, 1430, 1431]
);
__d(
  function (g, r, i, a, m, _e, d) {
    'use strict';
    var t = r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.BottomTabBar = function ({
        state: t,
        navigation: y,
        descriptors: v,
        insets: w,
        style: k,
      }) {
        const { colors: S } = (0, r(d[7]).useTheme)(),
          { direction: x } = (0, r(d[7]).useLocale)(),
          { buildHref: C } = (0, r(d[7]).useLinkBuilder)(),
          L = t.routes[t.index],
          T = v[L.key].options,
          {
            tabBarPosition: P = 'bottom',
            tabBarShowLabel: I,
            tabBarLabelVisibilityMode: W,
            tabBarLabelPosition: j,
            tabBarHideOnKeyboard: V = !1,
            tabBarVisibilityAnimationConfig: z,
            tabBarVariant: A = 'uikit',
            tabBarStyle: D,
            tabBarBackground: E,
            tabBarActiveTintColor: F,
            tabBarInactiveTintColor: H,
            tabBarActiveBackgroundColor: M,
            tabBarInactiveBackgroundColor: O,
          } = T;
        if ('material' === A && 'left' !== P && 'right' !== P)
          throw new Error(
            "The 'material' variant for tab bar is only supported when 'tabBarPosition' is set to 'left' or 'right'."
          );
        if ('below-icon' === j && 'uikit' === A && ('left' === P || 'right' === P))
          throw new Error(
            "The 'below-icon' label position for tab bar is only supported when 'tabBarPosition' is set to 'top' or 'bottom' when using the 'uikit' variant."
          );
        const R = (0, r(d[8]).useIsKeyboardShown)(),
          _ = e.default.useContext(r(d[9]).BottomTabBarHeightCallbackContext),
          N = !(V && R),
          K = e.default.useRef(z);
        e.default.useEffect(() => {
          K.current = z;
        });
        const [Y, q] = e.default.useState(!N),
          [G] = e.default.useState(() => new o.default.Value(N ? 1 : 0));
        e.default.useEffect(() => {
          const t = K.current;
          if (N) {
            ('spring' === t?.show?.animation ? o.default.spring : o.default.timing)(
              G,
              Object.assign({ toValue: 1, useNativeDriver: c, duration: 250 }, t?.show?.config)
            ).start(({ finished: t }) => {
              t && q(!1);
            });
          } else {
            q(!0);
            ('spring' === t?.hide?.animation ? o.default.spring : o.default.timing)(
              G,
              Object.assign({ toValue: 0, useNativeDriver: c, duration: 200 }, t?.hide?.config)
            ).start();
          }
          return () => G.stopAnimation();
        }, [G, N]);
        const [J, Q] = e.default.useState({ height: 0 }),
          { routes: U } = t,
          X = (0, r(d[10]).useFrameSize)(e =>
            p({ state: t, descriptors: v, insets: w, dimensions: e, style: [D, k] })
          ),
          Z = (0, r(d[10]).useFrameSize)(e => h({ state: t, descriptors: v, dimensions: e })),
          $ = (0, r(d[10]).useFrameSize)(e => f({ state: t, descriptors: v, dimensions: e })),
          tt = 'left' === P || 'right' === P,
          et = 'material' === A ? u : b,
          it = (0, r(d[10]).useFrameSize)(t =>
            tt && Z ? (0, r(d[10]).getDefaultSidebarWidth)(t) : 0
          ),
          at = E?.();
        return (0, l.jsxs)(o.default.View, {
          style: [
            'left' === P ? B.start : 'right' === P ? B.end : B.bottom,
            'right' === P
              ? { borderLeftWidth: n.default.hairlineWidth }
              : 'left' === P
                ? { borderRightWidth: n.default.hairlineWidth }
                : 'top' === P
                  ? { borderBottomWidth: n.default.hairlineWidth }
                  : { borderTopWidth: n.default.hairlineWidth },
            { backgroundColor: null != at ? 'transparent' : S.card, borderColor: S.border },
            tt
              ? {
                  paddingTop: (Z ? et : et / 2) + w.top,
                  paddingBottom: (Z ? et : et / 2) + w.bottom,
                  paddingStart: et + ('left' === P ? w.left : 0),
                  paddingEnd: et + ('right' === P ? w.right : 0),
                  minWidth: it,
                }
              : [
                  {
                    transform: [
                      {
                        translateY: G.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            J.height + w['top' === P ? 'top' : 'bottom'] + n.default.hairlineWidth,
                            0,
                          ],
                        }),
                      },
                    ],
                    position: Y ? 'absolute' : void 0,
                  },
                  {
                    height: X,
                    paddingBottom: 'bottom' === P ? w.bottom : 0,
                    paddingTop: 'top' === P ? w.top : 0,
                    paddingHorizontal: Math.max(w.left, w.right),
                  },
                ],
            D,
          ],
          pointerEvents: Y ? 'none' : 'auto',
          onLayout: tt
            ? void 0
            : t => {
                const { height: e } = t.nativeEvent.layout;
                (_?.(e), Q(t => (e === t.height ? t : { height: e })));
              },
          children: [
            (0, l.jsx)(s.default, {
              pointerEvents: 'none',
              style: n.default.absoluteFill,
              children: at,
            }),
            (0, l.jsx)(s.default, {
              role: 'tablist',
              style: tt ? B.sideContent : B.bottomContent,
              children: U.map((e, o) => {
                const n = o === t.index,
                  { options: s } = v[e.key],
                  b =
                    'function' == typeof s.tabBarLabel
                      ? s.tabBarLabel
                      : (0, r(d[10]).getLabel)({ label: s.tabBarLabel, title: s.title }, e.name),
                  u = void 0 !== s.tabBarAccessibilityLabel ? s.tabBarAccessibilityLabel : void 0;
                return (0, l.jsx)(
                  r(d[7]).NavigationProvider,
                  {
                    route: e,
                    navigation: v[e.key].navigation,
                    children: (0, l.jsx)(r(d[11]).BottomTabItem, {
                      href: C(e.name, e.params),
                      route: e,
                      descriptor: v[e.key],
                      focused: n,
                      horizontal: Z,
                      compact: $,
                      sidebar: tt,
                      variant: A,
                      onPress: () => {
                        const o = y.emit({
                          type: 'tabPress',
                          target: e.key,
                          canPreventDefault: !0,
                        });
                        n ||
                          o.defaultPrevented ||
                          y.dispatch(
                            Object.assign({}, r(d[7]).CommonActions.navigate(e.name, e.params), {
                              target: t.key,
                            })
                          );
                      },
                      onLongPress: () => {
                        y.emit({ type: 'tabLongPress', target: e.key });
                      },
                      accessibilityLabel: u,
                      testID: s.tabBarButtonTestID,
                      allowFontScaling: s.tabBarAllowFontScaling,
                      activeTintColor: F,
                      inactiveTintColor: H,
                      activeBackgroundColor: M,
                      inactiveBackgroundColor: O,
                      button: s.tabBarButton,
                      icon:
                        s.tabBarIcon ??
                        (({ color: t, size: e }) =>
                          (0, l.jsx)(r(d[10]).MissingIcon, { color: t, size: e })),
                      badge: s.tabBarBadge,
                      badgeStyle: s.tabBarBadgeStyle,
                      label: b,
                      showLabel: I,
                      labelVisibilityMode: W,
                      labelStyle: s.tabBarLabelStyle,
                      iconStyle: s.tabBarIconStyle,
                      style: [
                        tt
                          ? { marginVertical: Z ? ('material' === A ? 0 : 1) : et / 2 }
                          : B.bottomItem,
                        s.tabBarItemStyle,
                      ],
                    }),
                  },
                  e.key
                );
              }),
            }),
          ],
        });
      }),
      (_e.getTabBarHeight = void 0));
    var e = t(r(d[1])),
      o = t(r(d[2])),
      n = (t(r(d[3])), t(r(d[4]))),
      s = t(r(d[5])),
      l = r(d[6]);
    const b = 15,
      u = 12,
      c = !1,
      h = ({ state: t, descriptors: e, dimensions: o }) => {
        const { tabBarLabelPosition: s } = e[t.routes[t.index].key].options;
        if (s)
          switch (s) {
            case 'beside-icon':
              return !0;
            case 'below-icon':
              return !1;
          }
        if (o.width >= 768) {
          return (
            t.routes.reduce((t, o) => {
              const { tabBarItemStyle: s } = e[o.key].options,
                l = n.default.flatten(s);
              if (l) {
                if ('number' == typeof l.width) return t + l.width;
                if ('number' == typeof l.maxWidth) return t + l.maxWidth;
              }
              return t + 125;
            }, 0) <= o.width
          );
        }
        return o.width > o.height;
      },
      f = ({ state: t, descriptors: e, dimensions: o }) => {
        const { tabBarPosition: n, tabBarVariant: s } = e[t.routes[t.index].key].options;
        if ('left' === n || 'right' === n || 'material' === s) return !1;
        (o.width, o.height, h({ state: t, descriptors: e, dimensions: o }));
        return !1;
      },
      p = ({ state: t, descriptors: e, dimensions: o, insets: s, style: l }) => {
        const { tabBarPosition: b } = e[t.routes[t.index].key].options,
          u = n.default.flatten(l),
          c = u && 'height' in u ? u.height : void 0;
        if ('number' == typeof c) return c;
        const h = s['top' === b ? 'top' : 'bottom'];
        return f({ state: t, descriptors: e, dimensions: o }) ? 32 + h : 49 + h;
      };
    _e.getTabBarHeight = p;
    const B = n.default.create({
      start: { top: 0, bottom: 0, start: 0 },
      end: { top: 0, bottom: 0, end: 0 },
      bottom: { start: 0, end: 0, bottom: 0, elevation: 8 },
      bottomContent: { flex: 1, flexDirection: 'row' },
      sideContent: { flex: 1, flexDirection: 'column' },
      bottomItem: { flex: 1 },
    });
  },
  1423,
  [1, 5, 7, 14, 26, 19, 183, 382, 1424, 1425, 695, 1426]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.useIsKeyboardShown = function () {
        const [e, n] = t.useState(!1);
        return (
          t.useEffect(() => {
            const e = () => n(!0),
              t = () => n(!1);
            let o;
            return (
              (o = [
                r.default.addListener('keyboardDidShow', e),
                r.default.addListener('keyboardDidHide', t),
              ]),
              () => {
                o.forEach(e => e.remove());
              }
            );
          }, []),
          e
        );
      }));
    var t = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            n = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var o,
            u,
            f = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return f;
          if ((o = t ? n : r)) {
            if (o.has(e)) return o.get(e);
            o.set(e, f);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((u = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (u.get || u.set)
                ? o(f, t, u)
                : (f[t] = e[t]));
          return f;
        })(e, t);
      })(_r(d[1])),
      r = e(_r(d[2]));
    e(_r(d[3]));
  },
  1424,
  [1, 5, 316, 14]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.BottomTabBarHeightCallbackContext = void 0));
    var e = (function (e, t) {
      if ('function' == typeof WeakMap)
        var o = new WeakMap(),
          r = new WeakMap();
      return (function (e, t) {
        if (!t && e && e.__esModule) return e;
        var n,
          i,
          f = { __proto__: null, default: e };
        if (null === e || ('object' != typeof e && 'function' != typeof e)) return f;
        if ((n = t ? r : o)) {
          if (n.has(e)) return n.get(e);
          n.set(e, f);
        }
        for (const t in e)
          'default' !== t &&
            {}.hasOwnProperty.call(e, t) &&
            ((i = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
            (i.get || i.set)
              ? n(f, t, i)
              : (f[t] = e[t]));
        return f;
      })(e, t);
    })(_r(d[0]));
    _e.BottomTabBarHeightCallbackContext = e.createContext(void 0);
  },
  1425,
  [5]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.BottomTabItem = function ({
        route: t,
        href: f,
        focused: p,
        descriptor: y,
        label: S,
        icon: v,
        badge: h,
        badgeStyle: x,
        button: B = b,
        accessibilityLabel: C,
        testID: U,
        onPress: k,
        onLongPress: w,
        horizontal: j,
        compact: L,
        sidebar: V,
        variant: z,
        activeTintColor: I,
        inactiveTintColor: K,
        activeBackgroundColor: M,
        inactiveBackgroundColor: T = 'transparent',
        showLabel: D = !0,
        labelVisibilityMode: P,
        allowFontScaling: O,
        labelStyle: _,
        iconStyle: F,
        style: H,
      }) {
        const { colors: E, fonts: R } = (0, r(d[8]).useTheme)(),
          q =
            I ??
            ('uikit' === z && V && j
              ? (0, l.default)(E.primary).isDark()
                ? 'white'
                : (0, l.default)(E.primary).darken(0.71).string()
              : E.primary),
          A =
            void 0 === K
              ? 'material' === z
                ? (0, l.default)(E.text).alpha(0.68).rgb().string()
                : (0, l.default)(E.text)
                    .mix((0, l.default)(E.card), 0.5)
                    .hex()
              : K,
          G =
            M ??
            ('material' === z
              ? (0, l.default)(q).alpha(0.12).rgb().string()
              : V && j
                ? E.primary
                : 'transparent'),
          { options: J } = y,
          N = (0, r(d[7]).getLabel)(
            { label: 'string' == typeof J.tabBarLabel ? J.tabBarLabel : void 0, title: J.title },
            t.name
          );
        let Q = A,
          W = A;
        'uikit' === z && V && j && void 0 === K && ((W = E.primary), (Q = E.text));
        const X = { route: t, focused: p },
          Y = p ? G : T,
          { flex: Z } = o.default.flatten(H || {}),
          $ = 'material' === z ? (j ? 56 : 16) : V && j ? 10 : 0;
        return (0, c.jsx)(s.default, {
          style: [{ borderRadius: $, overflow: 'material' === z ? 'hidden' : 'visible' }, H],
          children: B({
            href: f,
            onPress: k,
            onLongPress: w,
            testID: U,
            'aria-label': C,
            accessibilityLargeContentTitle: N,
            accessibilityShowsLargeContentViewer: !0,
            role: 'tab',
            'aria-selected': p,
            android_ripple: { borderless: !0 },
            hoverEffect: 'material' === z || (V && j) ? { color: E.text } : void 0,
            pressOpacity: 1,
            style: [
              u.tab,
              { flex: Z, backgroundColor: Y, borderRadius: $ },
              V
                ? 'material' === z
                  ? j
                    ? u.tabBarSidebarMaterial
                    : u.tabVerticalMaterial
                  : j
                    ? u.tabBarSidebarUiKit
                    : u.tabVerticalUiKit
                : 'material' === z
                  ? u.tabVerticalMaterial
                  : j
                    ? u.tabHorizontalUiKit
                    : u.tabVerticalUiKit,
            ],
            children: (0, c.jsxs)(n.default.Fragment, {
              children: [
                (({ focused: l }) => {
                  if (void 0 === v) return null;
                  const n = l ? 1 : 0,
                    o = l ? 0 : 1;
                  return (0, c.jsx)(r(d[9]).TabBarIcon, {
                    route: t,
                    variant: z,
                    size: L ? 'compact' : 'regular',
                    badge: h,
                    badgeStyle: x,
                    activeOpacity: n,
                    allowFontScaling: O,
                    inactiveOpacity: o,
                    activeTintColor: q,
                    inactiveTintColor: W,
                    renderIcon: v,
                    style: F,
                  });
                })(X),
                (({ focused: t }) => {
                  if ('unlabeled' === P || (void 0 === P && !1 === D)) return null;
                  const l = t ? q : Q;
                  return 'string' != typeof S
                    ? S({
                        focused: t,
                        color: l,
                        position: j ? 'beside-icon' : 'below-icon',
                        children: N,
                      })
                    : (0, c.jsx)(r(d[7]).Label, {
                        style: [
                          j
                            ? [
                                u.labelBeside,
                                'material' === z
                                  ? u.labelSidebarMaterial
                                  : V
                                    ? u.labelSidebarUiKit
                                    : L
                                      ? u.labelBesideUikitCompact
                                      : u.labelBesideUikit,
                                null == v && { marginStart: 0 },
                              ]
                            : u.labelBeneath,
                          L || ('uikit' === z && V && j) ? R.regular : R.medium,
                          _,
                        ],
                        allowFontScaling: O,
                        tintColor: l,
                        children: S,
                      });
                })(X),
              ],
            }),
          }),
        });
      }));
    var l = t(r(d[1])),
      n = t(r(d[2])),
      o = (t(r(d[3])), t(r(d[4]))),
      s = t(r(d[5])),
      c = r(d[6]);
    const b = t => (0, c.jsx)(r(d[7]).PlatformPressable, Object.assign({}, t));
    const u = o.default.create({
      tab: { alignItems: 'center', borderRadius: 10, borderCurve: 'continuous' },
      tabVerticalUiKit: { justifyContent: 'flex-start', flexDirection: 'column', padding: 5 },
      tabVerticalMaterial: { padding: 10 },
      tabHorizontalUiKit: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
      },
      tabBarSidebarUiKit: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 7,
        paddingHorizontal: 5,
      },
      tabBarSidebarMaterial: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingStart: 16,
        paddingEnd: 24,
      },
      labelSidebarMaterial: { marginStart: 12 },
      labelSidebarUiKit: { fontSize: 17, marginStart: 10 },
      labelBeneath: { fontSize: 10 },
      labelBeside: { marginEnd: 12, lineHeight: 24 },
      labelBesideUikit: { fontSize: 13, marginStart: 5 },
      labelBesideUikitCompact: { fontSize: 12, marginStart: 5 },
    });
  },
  1426,
  [1, 698, 5, 14, 26, 19, 183, 695, 382, 1427]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TabBarIcon = function ({
        route: t,
        variant: o,
        size: u,
        badge: w,
        badgeStyle: y,
        activeOpacity: f,
        inactiveOpacity: b,
        activeTintColor: v,
        inactiveTintColor: j,
        renderIcon: C,
        allowFontScaling: k,
        style: x,
      }) {
        const z = 'material' === o ? p : 'compact' === u ? s : l;
        return (0, n.jsxs)(c.default, {
          style: [
            'material' === o
              ? h.wrapperMaterial
              : 'compact' === u
                ? h.wrapperUikitCompact
                : h.wrapperUikit,
            x,
          ],
          children: [
            (0, n.jsx)(c.default, {
              style: [h.icon, { opacity: f, minWidth: z }],
              children: C({ focused: !0, size: z, color: v }),
            }),
            (0, n.jsx)(c.default, {
              style: [h.icon, { opacity: b }],
              children: C({ focused: !1, size: z, color: j }),
            }),
            (0, n.jsx)(r(d[5]).Badge, {
              visible: null != w,
              size: 0.75 * z,
              allowFontScaling: k,
              style: [h.badge, y],
              children: w,
            }),
          ],
        });
      }));
    t(r(d[1]));
    var o = t(r(d[2])),
      c = t(r(d[3])),
      n = r(d[4]);
    const l = 25,
      s = 18,
      p = 24;
    const h = o.default.create({
      icon: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      },
      wrapperUikit: { width: 31, height: 28 },
      wrapperUikitCompact: { width: 23, height: 20 },
      wrapperMaterial: { width: p, height: p },
      badge: { position: 'absolute', end: -3, top: -3 },
    });
  },
  1427,
  [1, 5, 26, 19, 183, 695]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.BottomTabBarHeightContext = void 0));
    var e = (function (e, t) {
      if ('function' == typeof WeakMap)
        var o = new WeakMap(),
          r = new WeakMap();
      return (function (e, t) {
        if (!t && e && e.__esModule) return e;
        var n,
          i,
          f = { __proto__: null, default: e };
        if (null === e || ('object' != typeof e && 'function' != typeof e)) return f;
        if ((n = t ? r : o)) {
          if (n.has(e)) return n.get(e);
          n.set(e, f);
        }
        for (const t in e)
          'default' !== t &&
            {}.hasOwnProperty.call(e, t) &&
            ((i = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
            (i.get || i.set)
              ? n(f, t, i)
              : (f[t] = e[t]));
        return f;
      })(e, t);
    })(_r(d[0]));
    _e.BottomTabBarHeightContext = e.createContext(void 0);
  },
  1428,
  [5]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.BottomTabView = function (e) {
        const {
            tabBar: h = f,
            state: b,
            navigation: S,
            descriptors: v,
            safeAreaInsets: k,
            detachInactiveScreens: x = !0,
          } = e,
          j = b.routes[b.index].key,
          [B, T] = t.useState([j]);
        B.includes(j) || T([...B, j]);
        const O = t.useRef(j),
          w = (0, _r(d[8]).useAnimatedHashMap)(b),
          [M, P] = t.useState({ current: j, animating: !1 });
        M.current !== j && P({ current: j, previous: M.current, animating: !0 });
        t.useEffect(() => {
          const e = O.current;
          let t, o;
          if (e !== j && v[e]?.options.popToTopOnBlur) {
            const n = b.routes.find(t => t.key === e);
            'stack' === n?.state?.type &&
              n.state.key &&
              (t = Object.assign({}, _r(d[9]).StackActions.popToTop(), { target: n.state.key }));
          }
          return (
            (() => {
              e !== j && S.emit({ type: 'transitionStart', target: j });
              const r = b.routes.map((t, o) => {
                const { options: r } = v[t.key],
                  { animation: i = 'none', transitionSpec: s = l[i].transitionSpec } = r;
                let c = s;
                (t.key !== e && t.key !== j && (c = l.none.transitionSpec),
                  (c = c ?? l.none.transitionSpec));
                const p = o === b.index ? 0 : o >= b.index ? 1 : -1;
                return n.default[c.animation](
                  w[t.key],
                  Object.assign({}, c.config, { toValue: p, useNativeDriver: u })
                );
              });
              n.default.parallel(r).start(({ finished: n }) => {
                (t && S.dispatch(t),
                  e !== j && S.emit({ type: 'transitionEnd', target: j }),
                  n &&
                    (o = setTimeout(() => {
                      P(e => (e.animating ? Object.assign({}, e, { animating: !1 }) : e));
                    }, 32)));
              });
            })(),
            (O.current = j),
            () => {
              void 0 !== o && clearTimeout(o);
            }
          );
        }, [v, j, S, b.index, b.routes, w]);
        const _ = _r(d[10]).SafeAreaProviderCompat.initialMetrics.frame,
          [C, A] = t.useState(() =>
            (0, _r(d[7]).getTabBarHeight)({
              state: b,
              descriptors: v,
              dimensions: _,
              insets: Object.assign(
                {},
                _r(d[10]).SafeAreaProviderCompat.initialMetrics.insets,
                e.safeAreaInsets
              ),
              style: v[b.routes[b.index].key].options.tabBarStyle,
            })
          ),
          { routes: H } = b,
          I = !H.some(e => p(v[e.key].options)),
          { tabBarPosition: z = 'bottom' } = v[j].options,
          D = (0, r.jsx)(
            _r(d[12]).BottomTabBarHeightCallbackContext.Provider,
            {
              value: A,
              children: (0, r.jsx)(_r(d[11]).SafeAreaInsetsContext.Consumer, {
                children: e =>
                  h({
                    state: b,
                    descriptors: v,
                    navigation: S,
                    insets: {
                      top: k?.top ?? e?.top ?? 0,
                      right: k?.right ?? e?.right ?? 0,
                      bottom: k?.bottom ?? e?.bottom ?? 0,
                      left: k?.left ?? e?.left ?? 0,
                    },
                  }),
              }),
            },
            'tabbar'
          );
        return (0, r.jsxs)(_r(d[10]).SafeAreaProviderCompat, {
          style: { flexDirection: 'left' === z || 'right' === z ? 'row' : 'column' },
          children: [
            'top' === z || 'left' === z ? D : null,
            (0, r.jsx)(
              _r(d[13]).MaybeScreenContainer,
              {
                enabled: x,
                hasTwoStates: I,
                style: y.screens,
                children: H.map((e, t) => {
                  const n = v[e.key],
                    {
                      lazy: u = !0,
                      animation: f = 'none',
                      sceneStyleInterpolator: y = l[f].sceneStyleInterpolator,
                    } = n.options,
                    h = b.index === t,
                    S = b.preloadedRouteKeys.includes(e.key);
                  if (u && !B.includes(e.key) && !h && !S) return null;
                  const {
                      freezeOnBlur: k,
                      header: j = ({ layout: t, options: n }) =>
                        (0, r.jsx)(
                          _r(d[10]).Header,
                          Object.assign({}, n, {
                            layout: t,
                            title: (0, _r(d[10]).getHeaderTitle)(n, e.name),
                          })
                        ),
                      headerShown: T,
                      headerStatusBarHeight: O,
                      headerTransparent: P,
                      sceneStyle: A,
                    } = n.options,
                    { sceneStyle: H } = y?.({ current: { progress: w[e.key] } }) ?? {},
                    I = p(n.options),
                    D = M.animating && (M.previous === e.key || M.current === e.key),
                    E = h ? c : I && D ? s : i;
                  return (0, r.jsx)(
                    _r(d[13]).MaybeScreen,
                    {
                      style: [o.default.absoluteFill, { zIndex: h ? 0 : -1 }],
                      active: E,
                      enabled: x,
                      freezeOnBlur: k,
                      shouldFreeze: E === i && !S,
                      pointerEvents: h ? 'box-none' : 'none',
                      children: (0, r.jsx)(_r(d[14]).BottomTabBarHeightContext.Provider, {
                        value: 'bottom' === z ? C : 0,
                        children: (0, r.jsx)(_r(d[10]).Screen, {
                          focused: h,
                          route: n.route,
                          navigation: n.navigation,
                          headerShown: T,
                          headerStatusBarHeight: O,
                          headerTransparent: P,
                          header: j({
                            layout: _,
                            route: n.route,
                            navigation: n.navigation,
                            options: n.options,
                          }),
                          style: [A, I && H],
                          children: n.render(),
                        }),
                      }),
                    },
                    e.key
                  );
                }),
              },
              'screens'
            ),
            'bottom' === z || 'right' === z ? D : null,
          ],
        });
      }));
    var t = (function (e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            o = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var r,
            i,
            s = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return s;
          if ((r = t ? o : n)) {
            if (r.has(e)) return r.get(e);
            r.set(e, s);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((i = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (i.get || i.set)
                ? r(s, t, i)
                : (s[t] = e[t]));
          return s;
        })(e, t);
      })(_r(d[1])),
      n = e(_r(d[2])),
      o = (e(_r(d[3])), e(_r(d[4]))),
      r = _r(d[5]);
    const i = 0,
      s = 1,
      c = 2,
      l = {
        fade: _r(d[6]).FadeTransition,
        shift: _r(d[6]).ShiftTransition,
        none: {
          sceneStyleInterpolator: void 0,
          transitionSpec: { animation: 'timing', config: { duration: 0 } },
        },
      },
      u = !1,
      p = e => {
        const { animation: t, transitionSpec: n } = e;
        return t ? 'none' !== t : Boolean(n);
      },
      f = e => (0, r.jsx)(_r(d[7]).BottomTabBar, Object.assign({}, e));
    const y = o.default.create({ screens: { flex: 1, overflow: 'hidden' } });
  },
  1429,
  [1, 5, 7, 14, 26, 183, 1430, 1423, 1433, 382, 695, 572, 1425, 1434, 1428]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.ShiftTransition = e.FadeTransition = void 0));
    ((e.FadeTransition = {
      transitionSpec: r(d[0]).FadeSpec,
      sceneStyleInterpolator: r(d[1]).forFade,
    }),
      (e.ShiftTransition = {
        transitionSpec: r(d[0]).ShiftSpec,
        sceneStyleInterpolator: r(d[1]).forShift,
      }));
  },
  1430,
  [1431, 1432]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var n = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }), (e.ShiftSpec = e.FadeSpec = void 0));
    var t = n(r(d[1]));
    ((e.FadeSpec = {
      animation: 'timing',
      config: { duration: 150, easing: t.default.in(t.default.linear) },
    }),
      (e.ShiftSpec = {
        animation: 'timing',
        config: { duration: 150, easing: t.default.inOut(t.default.ease) },
      }));
  },
  1431,
  [1, 179]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.forFade = function ({ current: t }) {
        return {
          sceneStyle: {
            opacity: t.progress.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 1, 0] }),
          },
        };
      }),
      (e.forShift = function ({ current: t }) {
        return {
          sceneStyle: {
            opacity: t.progress.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 1, 0] }),
            transform: [
              {
                translateX: t.progress.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [-50, 0, 50],
                }),
              },
            ],
          },
        };
      }));
  },
  1432,
  []
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.useAnimatedHashMap = function ({ routes: e, index: n }) {
        const u = t.useRef({}),
          o = u.current,
          f = Object.keys(o);
        if (e.length === f.length && e.every(e => f.includes(e.key))) return o;
        return (
          (u.current = {}),
          e.forEach(({ key: e }, t) => {
            u.current[e] = o[e] ?? new r.default.Value(t === n ? 0 : t >= n ? 1 : -1);
          }),
          u.current
        );
      }));
    var t = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            n = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var u,
            o,
            f = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return f;
          if ((u = t ? n : r)) {
            if (u.has(e)) return u.get(e);
            u.set(e, f);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((o = (u = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (o.get || o.set)
                ? u(f, t, o)
                : (f[t] = e[t]));
          return f;
        })(e, t);
      })(_r(d[1])),
      r = e(_r(d[2]));
  },
  1433,
  [1, 5, 7]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.MaybeScreen = function (e) {
        let { enabled: c, active: l } = e,
          o = (0, t.default)(e, i);
        if (s?.screensEnabled?.())
          return (0, r.jsx)(s.Screen, Object.assign({ enabled: c, activityState: l }, o));
        return (0, r.jsx)(n.default, Object.assign({}, o));
      }),
      (_e.MaybeScreenContainer = void 0));
    var t = e(_r(d[1])),
      n =
        ((function (e, t) {
          if ('function' == typeof WeakMap)
            var n = new WeakMap(),
              r = new WeakMap();
          (function (e, t) {
            if (!t && e && e.__esModule) return e;
            var c,
              i,
              s = { __proto__: null, default: e };
            if (null === e || ('object' != typeof e && 'function' != typeof e)) return s;
            if ((c = t ? r : n)) {
              if (c.has(e)) return c.get(e);
              c.set(e, s);
            }
            for (const t in e)
              'default' !== t &&
                {}.hasOwnProperty.call(e, t) &&
                ((i = (c = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
                (i.get || i.set)
                  ? c(s, t, i)
                  : (s[t] = e[t]));
          })(e, t);
        })(_r(d[2])),
        e(_r(d[3]))),
      r = _r(d[4]);
    const c = ['enabled'],
      i = ['enabled', 'active'];
    let s;
    try {
      s = _r(d[5], 'react-native-screens');
    } catch (e) {}
    _e.MaybeScreenContainer = e => {
      let { enabled: i } = e,
        l = (0, t.default)(e, c);
      return s?.screensEnabled?.()
        ? (0, r.jsx)(s.ScreenContainer, Object.assign({ enabled: i }, l))
        : (0, r.jsx)(n.default, Object.assign({}, l));
    };
  },
  1434,
  [1, 4, 5, 19, 183, 1387]
);
__d(
  function (g, r, i, a, m, e, d) {
    'use strict';
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.createBottomTabNavigator = function (t) {
        return (0, r(d[3]).createNavigatorFactory)(c)(t);
      }),
      (e.createBottomTabScreen = void 0));
    var o = t(r(d[1])),
      n = r(d[2]);
    const s = [
      'id',
      'initialRouteName',
      'backBehavior',
      'UNSTABLE_routeNamesChangeBehavior',
      'children',
      'layout',
      'screenListeners',
      'screenOptions',
      'screenLayout',
      'UNSTABLE_router',
    ];
    function c(t) {
      let {
          id: c,
          initialRouteName: u,
          backBehavior: B,
          UNSTABLE_routeNamesChangeBehavior: v,
          children: N,
          layout: l,
          screenListeners: h,
          screenOptions: L,
          screenLayout: T,
          UNSTABLE_router: b,
        } = t,
        _ = (0, o.default)(t, s);
      const {
        state: y,
        descriptors: S,
        navigation: p,
        NavigationContent: A,
      } = (0, r(d[3]).useNavigationBuilder)(r(d[3]).TabRouter, {
        id: c,
        initialRouteName: u,
        backBehavior: B,
        UNSTABLE_routeNamesChangeBehavior: v,
        children: N,
        layout: l,
        screenListeners: h,
        screenOptions: L,
        screenLayout: T,
        UNSTABLE_router: b,
      });
      return (0, n.jsx)(A, {
        children: (0, n.jsx)(
          r(d[4]).BottomTabView,
          Object.assign({}, _, { state: y, navigation: p, descriptors: S })
        ),
      });
    }
    e.createBottomTabScreen = (0, r(d[3]).createScreenFactory)();
  },
  1435,
  [1, 4, 183, 382, 1429]
);
__d(
  function (g, _r, _i, a, m, _e, d) {
    'use strict';
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.useBottomTabBarHeight = function () {
        const e = t.useContext(_r(d[1]).BottomTabBarHeightContext);
        if (void 0 === e)
          throw new Error(
            "Couldn't find the bottom tab bar height. Are you inside a screen in Bottom Tab Navigator?"
          );
        return e;
      }));
    var t = (function (t, e) {
      if ('function' == typeof WeakMap)
        var o = new WeakMap(),
          r = new WeakMap();
      return (function (t, e) {
        if (!e && t && t.__esModule) return t;
        var n,
          i,
          u = { __proto__: null, default: t };
        if (null === t || ('object' != typeof t && 'function' != typeof t)) return u;
        if ((n = e ? r : o)) {
          if (n.has(t)) return n.get(t);
          n.set(t, u);
        }
        for (const e in t)
          'default' !== e &&
            {}.hasOwnProperty.call(t, e) &&
            ((i = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(t, e)) &&
            (i.get || i.set)
              ? n(u, e, i)
              : (u[e] = t[e]));
        return u;
      })(t, e);
    })(_r(d[0]));
  },
  1436,
  [5, 1428]
);
