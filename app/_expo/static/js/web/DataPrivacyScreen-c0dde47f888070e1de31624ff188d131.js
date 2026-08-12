__d(
  function (g, r, i, a, m, e, _d) {
    var t = r(_d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const t = (0, r(_d[15]).useNavigation)(),
          { user: n, profile: T } = (0, r(_d[16]).useAuth)(),
          { prefs: R, updateSection: I } = (0, r(_d[17]).useUserPreferences)(n?.id),
          { showToast: C } = (0, r(_d[18]).useToast)(),
          { colors: P } = (0, r(_d[19]).useTheme)(),
          w = b(P),
          S = R.dataPrivacy,
          [v, D] = (0, s.useState)(null),
          [B, E] = (0, s.useState)(!0),
          [k, O] = (0, s.useState)(!1),
          [A, _] = (0, s.useState)(!1),
          F = (t, s) => I('dataPrivacy', { [t]: s }),
          z = (0, s.useCallback)(async () => {
            E(!0);
            const t = await (0, r(_d[20]).buildDataInventory)({ user: n, profile: T });
            (D(t), E(!1));
          }, [n, T]);
        (0, s.useEffect)(() => {
          z();
        }, [z]);
        const q = (0, s.useMemo)(() => (S.exportRequests ?? []).slice(0, 5), [S.exportRequests]);
        return (0, j.jsxs)(u.default, {
          title: 'Data & Privacy',
          subtitle: 'Your data, your control',
          children: [
            (0, j.jsxs)(d.default, {
              style: w.hero,
              children: [
                (0, j.jsx)(r(_d[22]).Ionicons, {
                  name: 'shield-checkmark',
                  size: 28,
                  color: P.primary,
                }),
                (0, j.jsxs)(d.default, {
                  style: w.heroText,
                  children: [
                    (0, j.jsx)(c.default, {
                      style: w.heroTitle,
                      children: 'Protected under Ghana law',
                    }),
                    (0, j.jsx)(c.default, {
                      style: w.heroBody,
                      children: r(_d[23]).DATA_PRIVACY_INTRO,
                    }),
                  ],
                }),
              ],
            }),
            B
              ? (0, j.jsx)(d.default, {
                  style: w.loadingWrap,
                  children: (0, j.jsx)(o.default, { color: P.primary }),
                })
              : v
                ? (0, j.jsxs)(d.default, {
                    style: w.statsRow,
                    children: [
                      (0, j.jsxs)(d.default, {
                        style: w.statChip,
                        children: [
                          (0, j.jsx)(r(_d[22]).Ionicons, {
                            name: 'map-outline',
                            size: 14,
                            color: P.primary,
                          }),
                          (0, j.jsxs)(c.default, {
                            style: w.statText,
                            children: [v.tripCount, ' trips'],
                          }),
                        ],
                      }),
                      (0, j.jsxs)(d.default, {
                        style: w.statChip,
                        children: [
                          (0, j.jsx)(r(_d[22]).Ionicons, {
                            name: 'bookmark-outline',
                            size: 14,
                            color: P.primary,
                          }),
                          (0, j.jsxs)(c.default, {
                            style: w.statText,
                            children: [v.savedPlaces, ' saved places'],
                          }),
                        ],
                      }),
                      (0, j.jsxs)(d.default, {
                        style: w.statChip,
                        children: [
                          (0, j.jsx)(r(_d[22]).Ionicons, {
                            name: 'heart-outline',
                            size: 14,
                            color: P.primary,
                          }),
                          (0, j.jsxs)(c.default, {
                            style: w.statText,
                            children: [v.favoriteRoutes, ' routes'],
                          }),
                        ],
                      }),
                      v.issueReports > 0
                        ? (0, j.jsxs)(d.default, {
                            style: w.statChip,
                            children: [
                              (0, j.jsx)(r(_d[22]).Ionicons, {
                                name: 'flag-outline',
                                size: 14,
                                color: P.primary,
                              }),
                              (0, j.jsxs)(c.default, {
                                style: w.statText,
                                children: [v.issueReports, ' reports'],
                              }),
                            ],
                          })
                        : null,
                    ],
                  })
                : null,
            (0, j.jsx)(p.default, {
              title: 'What we store',
              children: r(_d[23]).DATA_CATEGORIES.map(t =>
                (0, j.jsxs)(
                  d.default,
                  {
                    style: w.categoryCard,
                    children: [
                      (0, j.jsx)(d.default, {
                        style: w.categoryIcon,
                        children: (0, j.jsx)(r(_d[22]).Ionicons, {
                          name: t.icon,
                          size: 20,
                          color: P.primary,
                        }),
                      }),
                      (0, j.jsxs)(d.default, {
                        style: w.categoryBody,
                        children: [
                          (0, j.jsx)(c.default, { style: w.categoryTitle, children: t.title }),
                          (0, j.jsx)(c.default, { style: w.categoryDesc, children: t.description }),
                          (0, j.jsxs)(c.default, {
                            style: w.categoryRetained,
                            children: ['Kept: ', t.retained],
                          }),
                        ],
                      }),
                    ],
                  },
                  t.id
                )
              ),
            }),
            (0, j.jsx)(p.default, {
              title: 'Communication',
              children: r(_d[23]).COMMUNICATION_PREFS.map(t =>
                (0, j.jsx)(
                  y.default,
                  {
                    icon: t.icon,
                    title: t.title,
                    subtitle: t.subtitle,
                    toggle: !0,
                    toggleValue: Boolean(S[t.key]),
                    onToggle: s => F(t.key, s),
                    showChevron: !1,
                  },
                  t.key
                )
              ),
            }),
            (0, j.jsxs)(p.default, {
              title: 'Diagnostics',
              children: [
                r(_d[23]).DIAGNOSTIC_PREFS.map(t =>
                  (0, j.jsx)(
                    y.default,
                    {
                      icon: t.icon,
                      title: t.title,
                      subtitle: t.subtitle,
                      toggle: !0,
                      toggleValue: Boolean(S[t.key]),
                      onToggle: s => F(t.key, s),
                      showChevron: !1,
                    },
                    t.key
                  )
                ),
                (0, j.jsx)(y.default, {
                  icon: 'analytics-outline',
                  title: 'Usage analytics',
                  subtitle: v?.analyticsEnabled
                    ? 'Enabled in Privacy settings'
                    : 'Disabled in Privacy settings',
                  onPress: () => t.navigate(r(_d[24]).ROUTES.PROFILE_PRIVACY),
                }),
              ],
            }),
            (0, j.jsx)(p.default, {
              title: 'Your rights',
              children: r(_d[23]).DATA_RIGHTS.map(t =>
                (0, j.jsxs)(
                  d.default,
                  {
                    style: w.rightsCard,
                    children: [
                      (0, j.jsxs)(d.default, {
                        style: {
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: r(_d[14]).spacing.sm,
                          marginBottom: r(_d[14]).spacing.xs,
                        },
                        children: [
                          (0, j.jsx)(r(_d[22]).Ionicons, {
                            name: t.icon,
                            size: 18,
                            color: P.primary,
                          }),
                          (0, j.jsx)(c.default, { style: w.rightsTitle, children: t.title }),
                        ],
                      }),
                      (0, j.jsx)(c.default, { style: w.rightsDesc, children: t.description }),
                    ],
                  },
                  t.id
                )
              ),
            }),
            (0, j.jsxs)(f.default, {
              elevated: !0,
              children: [
                (0, j.jsx)(c.default, { style: w.exportTitle, children: 'Request data export' }),
                (0, j.jsx)(d.default, {
                  style: w.exportBox,
                  children: r(_d[23]).EXPORT_INCLUDES.map(t =>
                    (0, j.jsxs)(
                      d.default,
                      {
                        style: w.exportItem,
                        children: [
                          (0, j.jsx)(r(_d[22]).Ionicons, {
                            name: 'checkmark-circle',
                            size: 14,
                            color: P.success ?? P.primary,
                          }),
                          (0, j.jsx)(c.default, { style: w.exportItemText, children: t }),
                        ],
                      },
                      t
                    )
                  ),
                }),
                (0, j.jsx)(x.default, {
                  title: k ? 'Preparing request\u2026' : 'Request export by email',
                  onPress: async () => {
                    if (k || !n?.id) return;
                    O(!0);
                    const t = [
                      (
                        await (0, r(_d[20]).requestDataExport)({
                          user: n,
                          profile: T,
                          inventory: v,
                          prefs: R,
                        })
                      ).request,
                      ...(S.exportRequests ?? []).slice(0, 4),
                    ];
                    (await I('dataPrivacy', { exportRequests: t }),
                      O(!1),
                      C({
                        type: 'success',
                        title: 'Export requested',
                        message: `We will email ${n.email ?? 'your account'} within 48 hours.`,
                      }));
                  },
                  loading: k,
                  compact: !0,
                }),
                (0, j.jsxs)(l.default, {
                  style: w.linkRow,
                  onPress: () => t.navigate(r(_d[24]).ROUTES.PROFILE_PRIVACY_POLICY),
                  children: [
                    (0, j.jsx)(r(_d[22]).Ionicons, {
                      name: 'document-text-outline',
                      size: 16,
                      color: P.primary,
                    }),
                    (0, j.jsx)(c.default, {
                      style: w.linkText,
                      children: 'Read full Privacy Policy',
                    }),
                  ],
                }),
                q.length > 0
                  ? (0, j.jsxs)(d.default, {
                      style: { marginTop: r(_d[14]).spacing.lg },
                      children: [
                        (0, j.jsx)(c.default, {
                          style: [w.exportTitle, { marginBottom: r(_d[14]).spacing.sm }],
                          children: 'Recent requests',
                        }),
                        q.map(t =>
                          (0, j.jsxs)(
                            d.default,
                            {
                              style: w.historyRow,
                              children: [
                                (0, j.jsxs)(d.default, {
                                  children: [
                                    (0, j.jsx)(c.default, {
                                      style: w.historyMeta,
                                      children: (0, r(_d[20]).formatPrivacyDate)(t.requestedAt),
                                    }),
                                    (0, j.jsxs)(c.default, {
                                      style: w.historyMeta,
                                      children: [t.tripCount ?? 0, ' trips included'],
                                    }),
                                  ],
                                }),
                                (0, j.jsx)(c.default, {
                                  style: w.historyStatus,
                                  children: r(_d[23]).EXPORT_STATUS_LABELS[t.status] ?? t.status,
                                }),
                              ],
                            },
                            t.id
                          )
                        ),
                      ],
                    })
                  : null,
              ],
            }),
            (0, j.jsxs)(f.default, {
              elevated: !0,
              children: [
                (0, j.jsx)(y.default, {
                  icon: 'trash-outline',
                  title: 'Delete account',
                  subtitle: 'Permanent \u2014 contact support to confirm',
                  danger: !0,
                  onPress: () => _(!0),
                  showChevron: !1,
                }),
                (0, j.jsx)(c.default, { style: w.deleteNote, children: r(_d[23]).DELETION_NOTICE }),
                (0, j.jsxs)(l.default, {
                  style: w.linkRow,
                  onPress: () => t.navigate(r(_d[24]).ROUTES.PROFILE_PRIVACY),
                  children: [
                    (0, j.jsx)(r(_d[22]).Ionicons, {
                      name: 'lock-closed-outline',
                      size: 16,
                      color: P.primary,
                    }),
                    (0, j.jsx)(c.default, {
                      style: w.linkText,
                      children: 'Trip & location privacy settings',
                    }),
                  ],
                }),
              ],
            }),
            (0, j.jsx)(f.default, {
              elevated: !0,
              children: r(_d[23]).DATA_PRIVACY_TIPS.map(t =>
                (0, j.jsxs)(
                  d.default,
                  {
                    style: w.tipRow,
                    children: [
                      (0, j.jsx)(r(_d[22]).Ionicons, {
                        name: 'information-circle-outline',
                        size: 16,
                        color: P.primary,
                      }),
                      (0, j.jsx)(c.default, { style: w.tipText, children: t }),
                    ],
                  },
                  t
                )
              ),
            }),
            (0, j.jsx)(h.default, {
              visible: A,
              title: 'Delete your account?',
              message: `This opens an email to ${r(_d[21]).SUPPORT_EMAIL}. Account deletion is permanent and may take up to 14 days.`,
              confirmLabel: 'Continue',
              cancelLabel: 'Cancel',
              onConfirm: async () => {
                _(!1);
                const { opened: t } = await (0, r(_d[20]).openDeletionRequest)({
                  profile: T,
                  user: n,
                });
                C({
                  type: t ? 'info' : 'error',
                  title: t ? 'Deletion request' : 'Could not open email',
                  message: t
                    ? `Send the draft to ${r(_d[21]).SUPPORT_EMAIL} to complete your request.`
                    : `Email ${r(_d[21]).SUPPORT_EMAIL} to request account deletion.`,
                });
              },
              onCancel: () => _(!1),
            }),
          ],
        });
      }));
    var s = r(_d[1]),
      o = t(r(_d[2])),
      l = t(r(_d[3])),
      n = t(r(_d[4])),
      c = t(r(_d[5])),
      d = t(r(_d[6])),
      u = t(r(_d[7])),
      p = t(r(_d[8])),
      y = t(r(_d[9])),
      f = t(r(_d[10])),
      x = t(r(_d[11])),
      h = t(r(_d[12])),
      j = r(_d[13]);
    const b = t =>
      n.default.create({
        hero: {
          flexDirection: 'row',
          gap: r(_d[14]).spacing.md,
          padding: r(_d[14]).spacing.md,
          borderRadius: r(_d[14]).radius.md,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
          borderWidth: 1,
          borderColor: t.border,
          marginBottom: r(_d[14]).spacing.lg,
        },
        heroText: { flex: 1 },
        heroTitle: {
          fontFamily: r(_d[14]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: r(_d[14]).spacing.xs,
        },
        heroBody: Object.assign({}, r(_d[14]).typography.caption, { lineHeight: 18 }),
        statsRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(_d[14]).spacing.sm,
          marginBottom: r(_d[14]).spacing.lg,
        },
        statChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(_d[14]).spacing.xs,
          paddingHorizontal: r(_d[14]).spacing.sm,
          paddingVertical: r(_d[14]).spacing.xs,
          borderRadius: r(_d[14]).radius.sm,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
        },
        statText: { fontFamily: r(_d[14]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        categoryCard: {
          flexDirection: 'row',
          gap: r(_d[14]).spacing.md,
          padding: r(_d[14]).spacing.md,
          borderRadius: r(_d[14]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
          marginBottom: r(_d[14]).spacing.sm,
        },
        categoryIcon: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: t.primaryAlpha12 ?? t.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
        },
        categoryBody: { flex: 1 },
        categoryTitle: {
          fontFamily: r(_d[14]).fontFamily.semiBold,
          fontSize: 15,
          color: t.textPrimary,
          marginBottom: 2,
        },
        categoryDesc: Object.assign({}, r(_d[14]).typography.caption, {
          lineHeight: 17,
          marginBottom: 4,
        }),
        categoryRetained: {
          fontFamily: r(_d[14]).fontFamily.medium,
          fontSize: 11,
          color: t.primary,
        },
        rightsCard: {
          padding: r(_d[14]).spacing.md,
          borderRadius: r(_d[14]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
          marginBottom: r(_d[14]).spacing.sm,
        },
        rightsTitle: {
          fontFamily: r(_d[14]).fontFamily.semiBold,
          fontSize: 14,
          color: t.textPrimary,
          marginBottom: 4,
        },
        rightsDesc: Object.assign({}, r(_d[14]).typography.caption, { lineHeight: 17 }),
        exportBox: {
          padding: r(_d[14]).spacing.md,
          borderRadius: r(_d[14]).radius.md,
          backgroundColor: t.surfaceElevated,
          borderWidth: 1,
          borderColor: t.border,
          marginBottom: r(_d[14]).spacing.md,
        },
        exportTitle: {
          fontFamily: r(_d[14]).fontFamily.bold,
          fontSize: 14,
          color: t.textPrimary,
          marginBottom: r(_d[14]).spacing.sm,
        },
        exportItem: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(_d[14]).spacing.sm,
          marginBottom: r(_d[14]).spacing.xs,
        },
        exportItemText: Object.assign({}, r(_d[14]).typography.caption, { flex: 1 }),
        historyRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: r(_d[14]).spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: t.border,
        },
        historyMeta: Object.assign({}, r(_d[14]).typography.caption),
        historyStatus: {
          fontFamily: r(_d[14]).fontFamily.semiBold,
          fontSize: 12,
          color: t.primary,
        },
        tipRow: {
          flexDirection: 'row',
          gap: r(_d[14]).spacing.sm,
          marginBottom: r(_d[14]).spacing.sm,
        },
        tipText: Object.assign({}, r(_d[14]).typography.caption, { flex: 1, lineHeight: 18 }),
        loadingWrap: { paddingVertical: r(_d[14]).spacing.lg, alignItems: 'center' },
        linkRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(_d[14]).spacing.xs,
          marginTop: r(_d[14]).spacing.sm,
        },
        linkText: { fontFamily: r(_d[14]).fontFamily.semiBold, fontSize: 13, color: t.primary },
        deleteNote: Object.assign({}, r(_d[14]).typography.caption, {
          color: t.textMuted,
          marginTop: r(_d[14]).spacing.sm,
          lineHeight: 18,
        }),
      });
  },
  1463,
  [
    1, 5, 373, 326, 26, 161, 19, 1710, 1667, 1670, 684, 672, 1645, 183, 377, 382, 501, 1614, 1386,
    381, 1801, 508, 578, 1802, 682,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.buildDataInventory = async function ({ user: t, profile: n }) {
        let o = n?.trips_completed ?? 0,
          s = [];
        if (t?.id)
          try {
            const n = await (0, r(d[2], './passengerTrips').fetchPassengerTrips)(t.id),
              u = n?.data?.active ?? [],
              l = n?.data?.history ?? [];
            ((o = [...u, ...l].length || o),
              (s = l
                .slice(0, 3)
                .map(t => ({
                  id: t.id ?? t.tripId,
                  route: t.route ?? `${t.origin ?? ''} \u2192 ${t.destination ?? ''}`.trim(),
                  date: t.ended_at ?? t.scheduledFor ?? t.created_at,
                }))));
          } catch {}
        const u = t?.id ? await (0, r(d[3]).loadUserPreferences)(t.id) : null;
        return {
          tripCount: o,
          recentTrips: s,
          savedPlaces: u?.savedPlaces?.length ?? 0,
          favoriteRoutes: u?.favoriteRouteIds?.length ?? 0,
          hasEmergencyContact: Boolean(u?.emergencyContact?.phone?.trim()),
          issueReports: u?.reportedIssues?.length ?? 0,
          language: u?.language ?? 'en',
          analyticsEnabled: u?.privacy?.analyticsEnabled ?? !0,
        };
      }),
      (e.buildExportSummary = o),
      (e.formatPrivacyDate = function (t) {
        if (!t) return '\u2014';
        try {
          return new Date(t).toLocaleString('en-GH', { dateStyle: 'medium', timeStyle: 'short' });
        } catch {
          return String(t);
        }
      }),
      (e.openDeletionRequest = async function ({ profile: t, user: o }) {
        const s = (0, r(d[5]).buildDeletionMailto)({ profile: t, user: o });
        try {
          if (await n.default.canOpenURL(s)) return (await n.default.openURL(s), { opened: !0 });
        } catch {}
        return { opened: !1 };
      }),
      (e.requestDataExport = async function ({ user: t, profile: u, inventory: l, prefs: c }) {
        const p = {
            id: `exp-${Date.now()}`,
            requestedAt: new Date().toISOString(),
            email: t?.email ?? '',
            status: 'pending',
            tripCount: l?.tripCount ?? 0,
          },
          y = s({ user: t, profile: u, inventory: l });
        try {
          (await n.default.canOpenURL(y)) && (await n.default.openURL(y));
        } catch {}
        return { request: p, summary: o({ user: t, profile: u, inventory: l, prefs: c }) };
      }));
    var n = t(r(d[1]));
    function o({ user: t, profile: n, inventory: o, prefs: s }) {
      return {
        exportedAt: new Date().toISOString(),
        app: r(d[4]).APP_NAME,
        user: {
          id: t?.id ?? null,
          email: t?.email ?? null,
          name: n?.full_name ?? null,
          phone: n?.phone_number ?? null,
          role: n?.role ?? null,
          trustScore: n?.trust_score ?? null,
          tripsCompleted: n?.trips_completed ?? o?.tripCount ?? 0,
        },
        inventory: {
          tripCount: o?.tripCount ?? 0,
          savedPlaces: o?.savedPlaces ?? 0,
          favoriteRoutes: o?.favoriteRoutes ?? 0,
          issueReports: o?.issueReports ?? 0,
          hasEmergencyContact: o?.hasEmergencyContact ?? !1,
        },
        preferences: {
          language: s?.language ?? 'en',
          notifications: s?.notifications ?? {},
          privacy: s?.privacy ?? {},
          dataPrivacy: s?.dataPrivacy ?? {},
          emergencyContact: s?.emergencyContact
            ? {
                name: s.emergencyContact.name,
                relationship: s.emergencyContact.relationship,
                phone: s.emergencyContact.phone ? '[redacted in preview]' : '',
              }
            : null,
        },
        recentTrips: o?.recentTrips ?? [],
      };
    }
    function s({ user: t, profile: n, inventory: o }) {
      const s = encodeURIComponent(`${r(d[4]).APP_NAME} data export request`),
        u = encodeURIComponent(
          [
            'I am requesting a copy of my personal data held by TrotroOS.',
            '',
            `Name: ${n?.full_name ?? 'N/A'}`,
            `Email: ${t?.email ?? 'N/A'}`,
            `User ID: ${t?.id ?? 'N/A'}`,
            '',
            'Estimated data summary:',
            `\u2022 Trips on record: ${o?.tripCount ?? 0}`,
            `\u2022 Saved places: ${o?.savedPlaces ?? 0}`,
            `\u2022 Favourite routes: ${o?.favoriteRoutes ?? 0}`,
            `\u2022 Issue reports: ${o?.issueReports ?? 0}`,
            '',
            'Please send the export to this email within 48 hours.',
            '',
            '\u2014 Sent from TrotroOS app',
          ].join('\n')
        );
      return `mailto:${r(d[4]).SUPPORT_EMAIL}?subject=${s}&body=${u}`;
    }
  },
  1801,
  [1, 667, 1666, 560, 508, 1802]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.EXPORT_STATUS_LABELS =
        e.EXPORT_INCLUDES =
        e.DIAGNOSTIC_PREFS =
        e.DELETION_NOTICE =
        e.DATA_RIGHTS =
        e.DATA_PRIVACY_TIPS =
        e.DATA_PRIVACY_INTRO =
        e.DATA_CATEGORIES =
        e.COMMUNICATION_PREFS =
          void 0),
      (e.buildDeletionMailto = function ({ profile: t, user: o }) {
        const n = encodeURIComponent(`${r(d[0]).APP_NAME} account deletion request`),
          s = encodeURIComponent(
            [
              'I would like to permanently delete my TrotroOS account and associated personal data.',
              '',
              `Name: ${t?.full_name ?? 'N/A'}`,
              `Email: ${o?.email ?? 'N/A'}`,
              `Phone: ${t?.phone_number ?? 'N/A'}`,
              `User ID: ${o?.id ?? 'N/A'}`,
              '',
              'Please confirm once deletion is complete.',
              '',
              '\u2014 Sent from TrotroOS app',
            ].join('\n')
          );
        return `mailto:${r(d[0]).SUPPORT_EMAIL}?subject=${n}&body=${s}`;
      }));
    ((e.DATA_PRIVACY_INTRO =
      'TrotroOS stores only what we need to run bookings, safety tools, and payments. You control marketing, exports, and deletion requests below.'),
      (e.DATA_CATEGORIES = [
        {
          id: 'profile',
          icon: 'person-circle-outline',
          title: 'Profile & account',
          description: 'Name, email, phone, role, trust score, and verification details.',
          retained: 'While your account is active',
        },
        {
          id: 'trips',
          icon: 'map-outline',
          title: 'Trips & bookings',
          description: 'Routes, reservations, TrotroRide requests, ratings, and trip history.',
          retained: 'Up to 24 months after completion',
        },
        {
          id: 'location',
          icon: 'location-outline',
          title: 'Location',
          description: 'Pickup points, live GPS during active trips, and saved places.',
          retained: 'Active trips + your saved places',
        },
        {
          id: 'payments',
          icon: 'wallet-outline',
          title: 'Payments',
          description: 'Fare amounts, MoMo/GhQR references \u2014 never your mobile money PIN.',
          retained: '7 years for tax & dispute records',
        },
        {
          id: 'preferences',
          icon: 'options-outline',
          title: 'App preferences',
          description: 'Language, notifications, privacy toggles, and emergency contact.',
          retained: 'On this device and your account',
        },
        {
          id: 'safety',
          icon: 'shield-checkmark-outline',
          title: 'Safety reports',
          description: 'Issue reports and Trip Guardian alerts shared with our safety team.',
          retained: 'As long as needed for investigations',
        },
      ]),
      (e.COMMUNICATION_PREFS = [
        {
          key: 'marketingEmails',
          icon: 'mail-outline',
          title: 'Marketing emails',
          subtitle: 'Promotions, partner offers, and Kumasi mobility news',
        },
        {
          key: 'personalizedOffers',
          icon: 'pricetag-outline',
          title: 'Personalized offers',
          subtitle: 'Route and fare suggestions based on your trip patterns',
        },
        {
          key: 'productUpdates',
          icon: 'megaphone-outline',
          title: 'Product updates',
          subtitle: 'New features, policy changes, and service announcements',
        },
      ]),
      (e.DIAGNOSTIC_PREFS = [
        {
          key: 'crashReports',
          icon: 'bug-outline',
          title: 'Crash & diagnostics',
          subtitle: 'Anonymous crash logs to fix bugs faster',
        },
      ]),
      (e.DATA_RIGHTS = [
        {
          id: 'access',
          icon: 'eye-outline',
          title: 'Access your data',
          description:
            'See what we store in the export preview below or request a full copy by email.',
        },
        {
          id: 'export',
          icon: 'download-outline',
          title: 'Export your data',
          description:
            'Download a summary of profile, preferences, and trip history within 48 hours.',
        },
        {
          id: 'delete',
          icon: 'trash-outline',
          title: 'Delete your account',
          description:
            'Permanently remove your account and personal data, subject to legal retention limits.',
        },
      ]),
      (e.DATA_PRIVACY_TIPS = [
        'We never sell your personal information to third parties for their marketing.',
        'Trip location is shared with drivers only during active bookings you confirm.',
        `Export and deletion requests are handled by ${r(d[0]).SUPPORT_EMAIL} within 48 hours.`,
        'Ghana Data Protection Act, 2012 (Act 843) rights apply to your personal data.',
      ]),
      (e.EXPORT_INCLUDES = [
        'Profile & account details',
        'Trip and booking history',
        'Saved places & favourite routes',
        'Notification & privacy preferences',
        'Emergency contact (if saved)',
        'Issue reports you submitted',
      ]),
      (e.EXPORT_STATUS_LABELS = {
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
      }),
      (e.DELETION_NOTICE =
        'Account deletion is permanent. Some trip and payment records may be retained where required by Ghana law or for unresolved disputes.'));
  },
  1802,
  [508]
);
