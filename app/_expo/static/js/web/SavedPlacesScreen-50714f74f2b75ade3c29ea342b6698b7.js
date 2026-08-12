__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(d[15]).useNavigation)(),
          { user: n } = (0, r(d[16]).useAuth)(),
          { prefs: T, patch: S } = (0, r(d[17]).useUserPreferences)(n?.id),
          { showToast: v } = (0, r(d[18]).useToast)(),
          { colors: w } = (0, r(d[19]).useTheme)(),
          C = P(w),
          [k, R] = (0, s.useState)(''),
          [I, z] = (0, s.useState)(''),
          [A, B] = (0, s.useState)('home'),
          [D, E] = (0, s.useState)(null),
          [F, H] = (0, s.useState)(!1),
          [W, L] = (0, s.useState)(!1),
          [_, M] = (0, s.useState)(null),
          O = (0, s.useMemo)(
            () => (T.savedPlaces ?? []).map(r(d[20]).enrichSavedPlace),
            [T.savedPlaces]
          ),
          q = (0, s.useMemo)(
            () => (0, r(d[20]).getAddressSuggestions)(I, T.savedPlaces, 5),
            [I, T.savedPlaces]
          ),
          G = t => O.some(s => s.type === t),
          U = () => {
            (R(''), z(''), B('home'), E(null));
          },
          V = async t => {
            const s = (0, r(d[20]).createSavedPlace)({
              label: t.label,
              address: t.address,
              type: t.type,
              source: 'preset',
            });
            (await S({ savedPlaces: (0, r(d[20]).upsertSavedPlace)(T.savedPlaces, s) }),
              v({ type: 'success', title: `${t.label} saved`, message: t.address }));
          },
          N = t => {
            (E(t.id), R(t.label), z(t.address), B(t.type ?? 'other'));
          },
          K = async t => {
            (await S({ savedPlaces: T.savedPlaces.filter(s => s.id !== t) }),
              D === t && U(),
              M(null),
              v({ type: 'info', title: 'Place removed', message: 'Saved place deleted.' }));
          },
          Y = async t => {
            const s = (0, r(d[20]).placeToMyLocation)(t);
            s
              ? (await S({ myLocation: s }),
                v({ type: 'success', title: 'My Location updated', message: t.label }))
              : v({
                  type: 'info',
                  title: 'Could not resolve coordinates',
                  message: 'Try a Kumasi landmark address or capture GPS when adding the place.',
                });
          },
          Q = (s, l) => {
            t.navigate('MainTabs', {
              screen: r(d[21]).ROUTES.PASSENGER_FIND_RIDE,
              params: {
                ['destination' === l ? 'presetDestination' : 'presetOrigin']: s.address || s.label,
              },
            });
          };
        return (0, j.jsxs)(u.default, {
          title: 'Saved Places',
          subtitle: 'Home, work, and frequent stops',
          children: [
            (0, j.jsxs)(p.default, {
              style: C.hero,
              children: [
                (0, j.jsx)(r(d[22]).Ionicons, { name: 'bookmark', size: 28, color: w.primary }),
                (0, j.jsxs)(p.default, {
                  style: C.heroText,
                  children: [
                    (0, j.jsx)(c.default, { style: C.heroTitle, children: 'Your frequent stops' }),
                    (0, j.jsx)(c.default, {
                      style: C.heroBody,
                      children: r(d[23]).SAVED_PLACES_INTRO,
                    }),
                  ],
                }),
              ],
            }),
            (0, j.jsxs)(p.default, {
              style: C.statsRow,
              children: [
                (0, j.jsxs)(p.default, {
                  style: C.statChip,
                  children: [
                    (0, j.jsx)(r(d[22]).Ionicons, {
                      name: 'bookmark-outline',
                      size: 14,
                      color: w.primary,
                    }),
                    (0, j.jsxs)(c.default, { style: C.statText, children: [O.length, ' saved'] }),
                  ],
                }),
                G('home')
                  ? (0, j.jsxs)(p.default, {
                      style: C.statChip,
                      children: [
                        (0, j.jsx)(r(d[22]).Ionicons, {
                          name: 'home-outline',
                          size: 14,
                          color: w.primary,
                        }),
                        (0, j.jsx)(c.default, { style: C.statText, children: 'Home set' }),
                      ],
                    })
                  : null,
                G('work')
                  ? (0, j.jsxs)(p.default, {
                      style: C.statChip,
                      children: [
                        (0, j.jsx)(r(d[22]).Ionicons, {
                          name: 'briefcase-outline',
                          size: 14,
                          color: w.primary,
                        }),
                        (0, j.jsx)(c.default, { style: C.statText, children: 'Work set' }),
                      ],
                    })
                  : null,
              ],
            }),
            (0, j.jsx)(y.default, {
              title: 'Quick add',
              children: (0, j.jsx)(p.default, {
                style: C.quickRow,
                children: r(d[23]).QUICK_ADD_PRESETS.map(t => {
                  const s = G(t.type);
                  return (0, j.jsxs)(
                    l.default,
                    {
                      style: [C.quickCard, s && C.quickCardDisabled],
                      disabled: s,
                      onPress: () => V(t),
                      children: [
                        (0, j.jsx)(r(d[22]).Ionicons, { name: t.icon, size: 20, color: w.primary }),
                        (0, j.jsx)(c.default, { style: C.quickLabel, children: t.label }),
                        (0, j.jsx)(c.default, {
                          style: C.quickMeta,
                          children: s ? 'Already saved' : t.address,
                        }),
                      ],
                    },
                    t.type
                  );
                }),
              }),
            }),
            (0, j.jsx)(y.default, {
              title: (O.length, 'Your places'),
              children:
                0 === O.length
                  ? (0, j.jsxs)(p.default, {
                      style: C.emptyBox,
                      children: [
                        (0, j.jsx)(r(d[22]).Ionicons, {
                          name: 'map-outline',
                          size: 32,
                          color: w.textMuted,
                        }),
                        (0, j.jsx)(c.default, {
                          style: [C.emptyText, { marginTop: r(d[14]).spacing.sm }],
                          children:
                            'No saved places yet. Add Home and Work below, or use a Kumasi landmark.',
                        }),
                      ],
                    })
                  : O.map(t => {
                      const s = (0, r(d[23]).getPlaceTypeMeta)(t.type);
                      return (0, j.jsxs)(
                        p.default,
                        {
                          style: C.placeCard,
                          children: [
                            (0, j.jsxs)(p.default, {
                              style: C.placeHeader,
                              children: [
                                (0, j.jsx)(p.default, {
                                  style: C.placeIcon,
                                  children: (0, j.jsx)(r(d[22]).Ionicons, {
                                    name: s.icon,
                                    size: 22,
                                    color: w.primary,
                                  }),
                                }),
                                (0, j.jsxs)(p.default, {
                                  style: { flex: 1 },
                                  children: [
                                    (0, j.jsx)(c.default, {
                                      style: C.placeTitle,
                                      children: t.label,
                                    }),
                                    (0, j.jsx)(c.default, {
                                      style: C.placeAddress,
                                      children: t.address,
                                    }),
                                  ],
                                }),
                                (0, j.jsx)(l.default, {
                                  onPress: () => M(t),
                                  hitSlop: 8,
                                  children: (0, j.jsx)(r(d[22]).Ionicons, {
                                    name: 'trash-outline',
                                    size: 20,
                                    color: w.destructive,
                                  }),
                                }),
                              ],
                            }),
                            (0, j.jsxs)(p.default, {
                              style: C.badgeRow,
                              children: [
                                (0, j.jsx)(p.default, {
                                  style: C.badge,
                                  children: (0, j.jsx)(c.default, {
                                    style: C.badgeText,
                                    children: s.label,
                                  }),
                                }),
                                t.precise
                                  ? (0, j.jsx)(p.default, {
                                      style: C.badge,
                                      children: (0, j.jsx)(c.default, {
                                        style: C.badgeText,
                                        children: 'Precise location',
                                      }),
                                    })
                                  : null,
                                t.updatedAt || t.createdAt
                                  ? (0, j.jsx)(p.default, {
                                      style: C.badge,
                                      children: (0, j.jsx)(c.default, {
                                        style: C.badgeText,
                                        children: (0, r(d[20]).formatPlaceUpdated)(
                                          t.updatedAt ?? t.createdAt
                                        ),
                                      }),
                                    })
                                  : null,
                              ],
                            }),
                            (0, j.jsxs)(p.default, {
                              style: C.actionRow,
                              children: [
                                (0, j.jsxs)(l.default, {
                                  style: [C.actionBtn, C.actionBtnPrimary],
                                  onPress: () => Q(t, 'origin'),
                                  children: [
                                    (0, j.jsx)(r(d[22]).Ionicons, {
                                      name: 'arrow-forward',
                                      size: 14,
                                      color: w.onPrimary,
                                    }),
                                    (0, j.jsx)(c.default, {
                                      style: [C.actionText, C.actionTextPrimary],
                                      children: 'From here',
                                    }),
                                  ],
                                }),
                                (0, j.jsxs)(l.default, {
                                  style: C.actionBtn,
                                  onPress: () => Q(t, 'destination'),
                                  children: [
                                    (0, j.jsx)(r(d[22]).Ionicons, {
                                      name: 'flag-outline',
                                      size: 14,
                                      color: w.primary,
                                    }),
                                    (0, j.jsx)(c.default, {
                                      style: C.actionText,
                                      children: 'To here',
                                    }),
                                  ],
                                }),
                                (0, j.jsxs)(l.default, {
                                  style: C.actionBtn,
                                  onPress: () => Y(t),
                                  children: [
                                    (0, j.jsx)(r(d[22]).Ionicons, {
                                      name: 'locate-outline',
                                      size: 14,
                                      color: w.primary,
                                    }),
                                    (0, j.jsx)(c.default, {
                                      style: C.actionText,
                                      children: 'My Location',
                                    }),
                                  ],
                                }),
                                (0, j.jsxs)(l.default, {
                                  style: C.actionBtn,
                                  onPress: () => N(t),
                                  children: [
                                    (0, j.jsx)(r(d[22]).Ionicons, {
                                      name: 'create-outline',
                                      size: 14,
                                      color: w.primary,
                                    }),
                                    (0, j.jsx)(c.default, {
                                      style: C.actionText,
                                      children: 'Edit',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        t.id
                      );
                    }),
            }),
            (0, j.jsxs)(x.default, {
              elevated: !0,
              children: [
                (0, j.jsx)(c.default, {
                  style: C.heroTitle,
                  children: D ? 'Edit place' : 'Add a place',
                }),
                (0, j.jsx)(p.default, {
                  style: C.typeRow,
                  children: r(d[23]).PLACE_TYPES.map(t => {
                    const s = A === t.id;
                    return (0, j.jsxs)(
                      l.default,
                      {
                        style: [C.typeChip, s && C.typeChipActive],
                        onPress: () => B(t.id),
                        children: [
                          (0, j.jsx)(r(d[22]).Ionicons, {
                            name: t.icon,
                            size: 14,
                            color: s ? w.onPrimary : w.primary,
                          }),
                          (0, j.jsx)(c.default, {
                            style: [C.typeText, s && C.typeTextActive],
                            children: t.label,
                          }),
                        ],
                      },
                      t.id
                    );
                  }),
                }),
                (0, j.jsx)(h.default, {
                  label: 'Label',
                  value: k,
                  onChangeText: R,
                  placeholder: 'home' === A ? 'Home' : 'work' === A ? 'Work' : 'e.g. Hostel',
                }),
                (0, j.jsx)(h.default, {
                  label: 'Address / landmark',
                  value: I,
                  onChangeText: z,
                  placeholder: 'Tech Junction, Ayeduase, KNUST Campus\u2026',
                }),
                I.trim() && q.length > 0
                  ? (0, j.jsx)(p.default, {
                      style: C.suggestionList,
                      children: q.map(t =>
                        (0, j.jsx)(
                          l.default,
                          {
                            style: C.suggestionItem,
                            onPress: () => z(t.label),
                            children: (0, j.jsx)(c.default, {
                              style: C.suggestionText,
                              children: t.label,
                            }),
                          },
                          t.label
                        )
                      ),
                    })
                  : null,
                (0, j.jsx)(c.default, {
                  style: [C.heroBody, { marginBottom: r(d[14]).spacing.sm }],
                  children: 'Popular landmarks',
                }),
                (0, j.jsx)(o.default, {
                  horizontal: !0,
                  showsHorizontalScrollIndicator: !1,
                  contentContainerStyle: C.suggestRow,
                  children: r(d[23]).SUGGESTED_LANDMARKS.map(t =>
                    (0, j.jsx)(
                      l.default,
                      {
                        style: C.suggestChip,
                        onPress: () => z(t),
                        children: (0, j.jsx)(c.default, { style: C.suggestText, children: t }),
                      },
                      t
                    )
                  ),
                }),
                (0, j.jsx)(f.default, {
                  title: D ? 'Update place' : 'Save place',
                  onPress: async () => {
                    if (!k.trim() || !I.trim())
                      return void v({
                        type: 'error',
                        title: 'Missing details',
                        message: 'Add a label and address or landmark.',
                      });
                    let t;
                    if ((H(!0), D))
                      t = (0, r(d[20]).updateSavedPlace)(T.savedPlaces, D, {
                        label: k.trim(),
                        address: I.trim(),
                        type: A,
                      });
                    else {
                      const s = (0, r(d[20]).createSavedPlace)({ label: k, address: I, type: A });
                      t = (0, r(d[20]).upsertSavedPlace)(T.savedPlaces, s);
                    }
                    (await S({ savedPlaces: t }),
                      H(!1),
                      U(),
                      v({
                        type: 'success',
                        title: D ? 'Place updated' : 'Place saved',
                        message: k.trim(),
                      }));
                  },
                  loading: F,
                }),
                (0, j.jsx)(p.default, {
                  style: { marginTop: r(d[14]).spacing.sm },
                  children: (0, j.jsx)(f.default, {
                    title: W ? 'Capturing GPS\u2026' : 'Save current GPS location',
                    variant: 'secondary',
                    onPress: async () => {
                      L(!0);
                      const t = await (0, r(d[20]).createPlaceFromGps)({
                        label: k.trim() || 'My stop',
                        type: A,
                      });
                      (L(!1),
                        !t.error && t.place
                          ? (await S({
                              savedPlaces: (0, r(d[20]).upsertSavedPlace)(T.savedPlaces, t.place),
                            }),
                            U(),
                            v({
                              type: 'success',
                              title: 'Place saved from GPS',
                              message: t.place.address,
                            }))
                          : v({
                              type: 'error',
                              title: 'GPS failed',
                              message: t.error?.message ?? 'Enable location or pick a landmark.',
                            }));
                    },
                    loading: W,
                    compact: !0,
                  }),
                }),
                D
                  ? (0, j.jsx)(p.default, {
                      style: { marginTop: r(d[14]).spacing.sm },
                      children: (0, j.jsx)(f.default, {
                        title: 'Cancel edit',
                        variant: 'ghost',
                        onPress: U,
                        compact: !0,
                      }),
                    })
                  : null,
              ],
            }),
            (0, j.jsxs)(x.default, {
              elevated: !0,
              children: [
                (0, j.jsx)(c.default, {
                  style: [C.heroTitle, { fontSize: 15, marginBottom: r(d[14]).spacing.sm }],
                  children: 'How saved places help',
                }),
                r(d[23]).SAVED_PLACES_USES.map(t =>
                  (0, j.jsxs)(
                    p.default,
                    {
                      style: C.useRow,
                      children: [
                        (0, j.jsx)(r(d[22]).Ionicons, { name: t.icon, size: 16, color: w.primary }),
                        (0, j.jsx)(c.default, { style: C.useText, children: t.text }),
                      ],
                    },
                    t.text
                  )
                ),
                (0, j.jsxs)(l.default, {
                  style: C.linkRow,
                  onPress: () => t.navigate(r(d[21]).ROUTES.PROFILE_MY_LOCATION),
                  children: [
                    (0, j.jsx)(r(d[22]).Ionicons, {
                      name: 'navigate-outline',
                      size: 16,
                      color: w.primary,
                    }),
                    (0, j.jsx)(c.default, { style: C.linkText, children: 'My Location settings' }),
                  ],
                }),
              ],
            }),
            (0, j.jsx)(x.default, {
              elevated: !0,
              children: r(d[23]).SAVED_PLACES_TIPS.map(t =>
                (0, j.jsxs)(
                  p.default,
                  {
                    style: C.tipRow,
                    children: [
                      (0, j.jsx)(r(d[22]).Ionicons, {
                        name: 'information-circle-outline',
                        size: 16,
                        color: w.primary,
                      }),
                      (0, j.jsx)(c.default, { style: C.tipText, children: t }),
                    ],
                  },
                  t
                )
              ),
            }),
            (0, j.jsx)(b.default, {
              visible: Boolean(_),
              title: `Remove ${_?.label ?? 'place'}?`,
              message: 'This stop will no longer appear on Find Ride quick chips.',
              confirmLabel: 'Remove',
              cancelLabel: 'Cancel',
              onConfirm: () => K(_.id),
              onCancel: () => M(null),
            }),
          ],
        });
      }));
    var s = r(d[1]),
      l = t(r(d[2])),
      o = t(r(d[3])),
      n = t(r(d[4])),
      c = t(r(d[5])),
      p = t(r(d[6])),
      u = t(r(d[7])),
      y = t(r(d[8])),
      x = t(r(d[9])),
      f = t(r(d[10])),
      h = t(r(d[11])),
      b = t(r(d[12])),
      j = r(d[13]);
    const P = t =>
      n.default.create({
        hero: {
          flexDirection: 'row',
          gap: r(d[14]).spacing.md,
          padding: r(d[14]).spacing.md,
          borderRadius: r(d[14]).radius.md,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
          borderWidth: 1,
          borderColor: t.border,
          marginBottom: r(d[14]).spacing.lg,
        },
        heroText: { flex: 1 },
        heroTitle: {
          fontFamily: r(d[14]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: r(d[14]).spacing.xs,
        },
        heroBody: Object.assign({}, r(d[14]).typography.caption, { lineHeight: 18 }),
        statsRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.lg,
        },
        statChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.xs,
          paddingHorizontal: r(d[14]).spacing.sm,
          paddingVertical: r(d[14]).spacing.xs,
          borderRadius: r(d[14]).radius.sm,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
        },
        statText: { fontFamily: r(d[14]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        quickRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.md,
        },
        quickCard: {
          flexGrow: 1,
          minWidth: '30%',
          padding: r(d[14]).spacing.md,
          borderRadius: r(d[14]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        quickCardDisabled: { opacity: 0.45 },
        quickLabel: {
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 14,
          color: t.textPrimary,
          marginTop: r(d[14]).spacing.xs,
        },
        quickMeta: Object.assign({}, r(d[14]).typography.caption, { marginTop: 2 }),
        placeCard: {
          borderRadius: r(d[14]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
          padding: r(d[14]).spacing.md,
          marginBottom: r(d[14]).spacing.sm,
        },
        placeHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.md,
          marginBottom: r(d[14]).spacing.sm,
        },
        placeIcon: {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: t.primaryAlpha12 ?? t.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
        },
        placeTitle: { fontFamily: r(d[14]).fontFamily.bold, fontSize: 16, color: t.textPrimary },
        placeAddress: Object.assign({}, r(d[14]).typography.caption, {
          marginTop: 2,
          lineHeight: 18,
        }),
        badgeRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[14]).spacing.xs,
          marginBottom: r(d[14]).spacing.sm,
        },
        badge: {
          paddingHorizontal: r(d[14]).spacing.sm,
          paddingVertical: 3,
          borderRadius: r(d[14]).radius.sm,
          backgroundColor: t.primaryAlpha12 ?? t.surfaceElevated,
        },
        badgeText: { fontFamily: r(d[14]).fontFamily.semiBold, fontSize: 11, color: t.primary },
        actionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: r(d[14]).spacing.sm },
        actionBtn: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.xs,
          paddingHorizontal: r(d[14]).spacing.sm,
          paddingVertical: r(d[14]).spacing.sm,
          borderRadius: r(d[14]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surfaceElevated,
        },
        actionBtnPrimary: { backgroundColor: t.primary, borderColor: t.primary },
        actionText: {
          fontFamily: r(d[14]).fontFamily.semiBold,
          fontSize: 12,
          color: t.textPrimary,
        },
        actionTextPrimary: { color: t.onPrimary },
        emptyBox: {
          padding: r(d[14]).spacing.lg,
          borderRadius: r(d[14]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          borderStyle: 'dashed',
          marginBottom: r(d[14]).spacing.lg,
          alignItems: 'center',
        },
        emptyText: Object.assign({}, r(d[14]).typography.body, {
          textAlign: 'center',
          color: t.textSecondary,
          lineHeight: 22,
        }),
        typeRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.md,
        },
        typeChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.xs,
          paddingHorizontal: r(d[14]).spacing.md,
          paddingVertical: r(d[14]).spacing.sm,
          borderRadius: r(d[14]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
        },
        typeChipActive: { borderColor: t.primary, backgroundColor: t.primary },
        typeText: { fontFamily: r(d[14]).fontFamily.medium, fontSize: 13, color: t.textSecondary },
        typeTextActive: { color: t.onPrimary },
        suggestRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.md,
        },
        suggestChip: {
          paddingHorizontal: r(d[14]).spacing.sm,
          paddingVertical: r(d[14]).spacing.xs,
          borderRadius: r(d[14]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surfaceElevated,
        },
        suggestText: {
          fontFamily: r(d[14]).fontFamily.medium,
          fontSize: 12,
          color: t.textSecondary,
        },
        suggestionList: {
          marginBottom: r(d[14]).spacing.md,
          borderRadius: r(d[14]).radius.sm,
          borderWidth: 1,
          borderColor: t.border,
          overflow: 'hidden',
        },
        suggestionItem: {
          paddingHorizontal: r(d[14]).spacing.md,
          paddingVertical: r(d[14]).spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        },
        suggestionText: {
          fontFamily: r(d[14]).fontFamily.medium,
          fontSize: 14,
          color: t.textPrimary,
        },
        useRow: {
          flexDirection: 'row',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.sm,
          alignItems: 'flex-start',
        },
        useText: Object.assign({}, r(d[14]).typography.caption, { flex: 1, lineHeight: 18 }),
        tipRow: {
          flexDirection: 'row',
          gap: r(d[14]).spacing.sm,
          marginBottom: r(d[14]).spacing.sm,
        },
        tipText: Object.assign({}, r(d[14]).typography.caption, { flex: 1, lineHeight: 18 }),
        linkRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[14]).spacing.xs,
          marginTop: r(d[14]).spacing.sm,
        },
        linkText: { fontFamily: r(d[14]).fontFamily.semiBold, fontSize: 13, color: t.primary },
      });
  },
  1453,
  [
    1, 5, 326, 106, 26, 161, 19, 1710, 1667, 684, 672, 679, 1645, 183, 377, 382, 501, 1614, 1386,
    381, 1786, 682, 578, 1787,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    function t(t) {
      const l = t.address?.trim() || t.label?.trim(),
        n = (0, r(d[0]).resolveLocationCoords)(l);
      return Object.assign({}, t, {
        latitude: t.latitude ?? n?.latitude ?? null,
        longitude: t.longitude ?? n?.longitude ?? null,
        resolvedLabel: n?.label ?? l,
        precise: Boolean(null != t.latitude || n?.precise),
      });
    }
    function l({
      label: l,
      address: n,
      type: o = 'other',
      latitude: u = null,
      longitude: c = null,
      source: s = 'manual',
    }) {
      const p = String(l ?? '').trim(),
        S = String(n ?? '').trim(),
        b = (0, r(d[0]).resolveLocationCoords)(S || p);
      return t({
        id: `place-${Date.now()}`,
        label: p,
        address: S || p,
        type: o,
        latitude: u ?? b?.latitude ?? null,
        longitude: c ?? b?.longitude ?? null,
        source: s,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.createPlaceFromGps = async function ({ label: t, type: n }) {
        const o = await (0, r(d[2]).captureGpsLocation)();
        if (o.error || !o.data)
          return { place: null, error: o.error ?? new Error('Could not capture GPS') };
        return {
          place: l({
            label: t?.trim() || 'My stop',
            address: o.data.label,
            type: n,
            latitude: o.data.latitude,
            longitude: o.data.longitude,
            source: 'gps',
          }),
          error: null,
        };
      }),
      (e.createSavedPlace = l),
      (e.enrichSavedPlace = t),
      (e.formatPlaceUpdated = function (t, l = 'en-GH') {
        if (!t) return '';
        try {
          return new Date(t).toLocaleDateString(l, { dateStyle: 'medium' });
        } catch {
          return '';
        }
      }),
      (e.getAddressSuggestions = function (t, l = [], n = 6) {
        const o = (0, r(d[1]).buildKumasiLocationPool)(l);
        return (0, r(d[1]).searchLocations)(o, t, n);
      }),
      (e.placeToMyLocation = function (l) {
        const n = t(l);
        return null == n.latitude || null == n.longitude
          ? null
          : {
              latitude: n.latitude,
              longitude: n.longitude,
              label: `${n.label} \xb7 ${n.address}`,
              updatedAt: new Date().toISOString(),
              accuracy: null,
              source: 'saved_place',
              nearestLandmark: n.resolvedLabel,
            };
      }),
      (e.updateSavedPlace = function (l, n, o) {
        return l.map(l => {
          if (l.id !== n) return l;
          return t(Object.assign({}, l, o, { updatedAt: new Date().toISOString() }));
        });
      }),
      (e.upsertSavedPlace = function (t, l) {
        const n = ['home', 'work', 'school'].includes(l.type)
          ? t.filter(t => t.type !== l.type)
          : t;
        return [l, ...n];
      }));
  },
  1786,
  [1507, 1626, 1711]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.SUGGESTED_LANDMARKS =
        e.SAVED_PLACES_USES =
        e.SAVED_PLACES_TIPS =
        e.SAVED_PLACES_INTRO =
        e.QUICK_ADD_PRESETS =
        e.PLACE_TYPES =
          void 0),
      (e.getPlaceTypeMeta = function (n) {
        return o.find(o => o.id === n) ?? o[3];
      }));
    e.SAVED_PLACES_INTRO =
      'Save Home, Work, and frequent Kumasi stops. They appear as quick chips on Find Ride and can power your pickup location.';
    const o = (e.PLACE_TYPES = [
      { id: 'home', label: 'Home', icon: 'home-outline', color: 'primary' },
      { id: 'work', label: 'Work', icon: 'briefcase-outline', color: 'primary' },
      { id: 'school', label: 'School', icon: 'school-outline', color: 'primary' },
      { id: 'other', label: 'Other', icon: 'location-outline', color: 'primary' },
    ]);
    ((e.SUGGESTED_LANDMARKS = r(d[0]).LOCATION_LANDMARKS.map(o => o.label)),
      (e.QUICK_ADD_PRESETS = [
        { type: 'home', label: 'Home', address: 'Ayeduase', icon: 'home-outline' },
        { type: 'work', label: 'Work', address: 'Adum', icon: 'briefcase-outline' },
        { type: 'school', label: 'School', address: 'KNUST Campus', icon: 'school-outline' },
      ]),
      (e.SAVED_PLACES_USES = [
        { icon: 'arrow-forward-outline', text: 'One-tap From / To chips on Find Ride' },
        { icon: 'locate-outline', text: 'Set any saved place as your My Location pickup point' },
        { icon: 'search-outline', text: 'Included in Kumasi location search suggestions' },
        { icon: 'calendar-outline', text: 'Available when scheduling rides ahead' },
      ]),
      (e.SAVED_PLACES_TIPS = [
        'Use Kumasi landmarks like Tech Junction or Ayeduase for best route matching.',
        'Home and Work slots replace the previous entry when you save a new one.',
        'Capture GPS when you are at the stop for the most accurate pickup ETAs.',
        'Saved places stay on this device and sync with your TrotroOS account.',
      ]));
  },
  1787,
  [1712]
);
