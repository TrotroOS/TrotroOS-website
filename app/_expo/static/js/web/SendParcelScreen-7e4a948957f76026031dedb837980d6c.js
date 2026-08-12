__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[14]).useNavigation)(),
          { user: s, profile: T } = (0, r(d[15]).useAuth)(),
          { prefs: b } = (0, r(d[16]).useUserPreferences)(s?.id),
          { showToast: L } = (0, r(d[17]).useToast)(),
          { colors: j } = (0, r(d[18]).useTheme)(),
          { t: x } = (0, r(d[19]).useLanguage)(),
          S = (0, l.useMemo)(() => P(j), [j]),
          O = b.myLocation?.label?.split(',')[0]?.trim() ?? null,
          [C, E] = (0, l.useState)(O || 'Tech Junction'),
          [_, w] = (0, l.useState)('Ayeduase'),
          [D, R] = (0, l.useState)('small'),
          [k, A] = (0, l.useState)(T?.phone_number ?? ''),
          [W, F] = (0, l.useState)(''),
          [N, z] = (0, l.useState)(!1),
          [q, H] = (0, l.useState)(!1),
          [I, B] = (0, l.useState)(null),
          K = (0, l.useMemo)(
            () => [
              { value: 'small', label: x('delivery.sizeSmall') },
              { value: 'medium', label: x('delivery.sizeMedium') },
              { value: 'large', label: x('delivery.sizeLarge') },
            ],
            [x]
          ),
          Y = (0, l.useMemo)(
            () =>
              (0, r(d[20]).resolveLocationCoords)(C, b.myLocation) ?? {
                latitude: 6.6745,
                longitude: -1.5712,
              },
            [C, b.myLocation]
          ),
          G = (0, l.useMemo)(
            () => (0, r(d[20]).resolveLocationCoords)(_) ?? { latitude: 6.67, longitude: -1.555 },
            [_]
          ),
          U = (0, r(d[21]).haversineKm)(Y.latitude, Y.longitude, G.latitude, G.longitude),
          V = (0, r(d[21]).quoteParcel)({ distanceKm: U, size: D }),
          J = l => {
            (0, r(d[22]).navigateToRootScreen)(t, r(d[23]).ROUTES.DELIVERY_TRACKING, {
              jobId: l.id,
            });
          },
          $ = async t => {
            if (!s?.id)
              return (
                L({
                  type: 'info',
                  title: x('delivery.signInRequired'),
                  message: x('delivery.signInParcel'),
                }),
                null
              );
            if (!C.trim() || !_.trim())
              return (
                L({
                  type: 'error',
                  title: x('delivery.missingPlaces'),
                  message: x('delivery.missingPlacesMsg'),
                }),
                null
              );
            z(!0);
            const { data: l, error: n } = await (0, r(d[21]).requestParcel)({
              pickup: C.trim(),
              dropoff: _.trim(),
              pickupLat: Y.latitude,
              pickupLng: Y.longitude,
              dropoffLat: G.latitude,
              dropoffLng: G.longitude,
              size: D,
              notes: W.trim() || null,
              recipientPhone: k.trim() || null,
              paymentMethod: t,
              distanceKm: U,
              fareBreakdown: V,
            });
            return (
              z(!1),
              n
                ? (L({ type: 'error', title: x('delivery.createFailed'), message: n.message }),
                  null)
                : l
            );
          };
        return (0, M.jsxs)(u.default, {
          title: x('delivery.parcelTitle'),
          subtitle: x('delivery.parcelSub'),
          children: [
            (0, M.jsx)(n.default, { style: S.hint, children: x('delivery.parcelHint') }),
            (0, M.jsxs)(y.default, {
              elevated: !0,
              children: [
                (0, M.jsx)(c.default, {
                  origin: C,
                  destination: _,
                  onOriginChange: E,
                  onDestinationChange: w,
                  onSwap: () => {
                    (E(_), w(C));
                  },
                  savedPlaces: b.savedPlaces,
                  myLocationLabel: O,
                  enableLocationPicker: !0,
                  showSavedPlaceChips: !0,
                  requireOriginFirst: !1,
                }),
                (0, M.jsx)(n.default, {
                  style: [S.hint, { marginTop: r(d[13]).spacing.sm }],
                  children: x('delivery.packageSize'),
                }),
                (0, M.jsx)(v.default, { options: K, value: D, onChange: R }),
                (0, M.jsx)(f.default, {
                  label: x('delivery.recipientPhone'),
                  value: k,
                  onChangeText: A,
                  placeholder: x('delivery.recipientPlaceholder'),
                  keyboardType: 'phone-pad',
                }),
                (0, M.jsx)(f.default, {
                  label: x('eats.orderNote'),
                  value: W,
                  onChangeText: F,
                  placeholder: x('delivery.notesPlaceholder'),
                }),
                (0, M.jsx)(n.default, {
                  style: S.fare,
                  children: (0, r(d[26]).formatGhs)(V.total),
                }),
                (0, M.jsx)(n.default, {
                  style: S.fareMeta,
                  children: x('delivery.fareLine', {
                    km: U.toFixed(1),
                    fee: (0, r(d[26]).formatGhs)(V.deliveryFee),
                  }),
                }),
                (0, M.jsxs)(o.default, {
                  style: S.actions,
                  children: [
                    (0, M.jsx)(p.default, {
                      title: x('delivery.payWallet'),
                      loading: N,
                      onPress: async () => {
                        const { data: t } = await (0, r(d[24]).fetchWallet)();
                        if (Number(t?.balance_ghs ?? 0) < V.total)
                          return void L({
                            type: 'info',
                            title: x('delivery.insufficientWallet'),
                            message: x('delivery.insufficientWalletMsg'),
                          });
                        const l = await $(r(d[25]).PAYMENT_METHODS.WALLET);
                        if (!l) return;
                        const { error: s } = await (0, r(d[21]).payDeliveryWithWallet)(l.id);
                        if (s)
                          return (
                            L({
                              type: 'error',
                              title: x('delivery.paymentFailed'),
                              message: s.message,
                            }),
                            void J(l)
                          );
                        (L({
                          type: 'success',
                          title: x('delivery.parcelRequested'),
                          message: x('delivery.paidWallet'),
                        }),
                          J(l));
                      },
                    }),
                    (0, M.jsx)(p.default, {
                      title: x('delivery.payMomo'),
                      variant: 'secondary',
                      loading: N,
                      onPress: async () => {
                        const t = await $(r(d[25]).PAYMENT_METHODS.MOMO);
                        t && (B(t.id), H(!0));
                      },
                    }),
                    (0, M.jsx)(p.default, {
                      title: x('delivery.payCod'),
                      variant: 'ghost',
                      loading: N,
                      onPress: async () => {
                        const t = await $(r(d[25]).PAYMENT_METHODS.COD);
                        t &&
                          (L({
                            type: 'success',
                            title: x('delivery.parcelRequested'),
                            message: x('delivery.payCodMsg'),
                          }),
                          J(t));
                      },
                    }),
                  ],
                }),
              ],
            }),
            (0, M.jsx)(h.default, {
              visible: q,
              amount: V.total,
              merchantCode: r(d[25]).PLATFORM_MOMO_MERCHANT_CODE,
              reference: I ? `DEL-${I.slice(0, 8)}` : void 0,
              onPaid: async ({ reference: t }) => {
                I &&
                  (await (0, r(d[21]).markDeliveryPaidMomo)(I, t),
                  H(!1),
                  L({
                    type: 'success',
                    title: x('delivery.paymentRecorded'),
                    message: x('delivery.courierOnWay'),
                  }),
                  J({ id: I }));
              },
              onPayOnBoard: () => {
                (H(!1), I && J({ id: I }));
              },
              onClose: () => H(!1),
            }),
          ],
        });
      }));
    var l = r(d[1]),
      s = t(r(d[2])),
      n = t(r(d[3])),
      o = t(r(d[4])),
      u = t(r(d[5])),
      c = t(r(d[6])),
      y = t(r(d[7])),
      p = t(r(d[8])),
      f = t(r(d[9])),
      v = t(r(d[10])),
      h = t(r(d[11])),
      M = r(d[12]);
    const P = t =>
      s.default.create({
        hint: Object.assign({}, r(d[13]).typography.caption, {
          marginBottom: r(d[13]).spacing.md,
          lineHeight: 18,
        }),
        fare: {
          fontFamily: r(d[13]).fontFamily.bold,
          fontSize: 28,
          color: t.textPrimary,
          marginVertical: r(d[13]).spacing.sm,
        },
        fareMeta: Object.assign({}, r(d[13]).typography.caption, {
          marginBottom: r(d[13]).spacing.sm,
        }),
        actions: { gap: r(d[13]).spacing.sm, marginTop: r(d[13]).spacing.md },
      });
  },
  1472,
  [
    1, 5, 26, 161, 19, 1710, 1714, 684, 672, 679, 1535, 1525, 183, 377, 382, 501, 1614, 1386, 381,
    1381, 1507, 1492, 1488, 682, 1491, 508, 691,
  ]
);
