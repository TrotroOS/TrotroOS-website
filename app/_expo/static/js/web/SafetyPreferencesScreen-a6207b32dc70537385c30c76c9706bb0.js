__d(
  function (g, r, i, a, m, e, d) {
    var t = r(d[0]);
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.default = function () {
        const { user: t } = (0, r(d[12]).useAuth)(),
          { prefs: o, updateSection: f } = (0, r(d[13]).useUserPreferences)(t?.id),
          { showToast: T } = (0, r(d[14]).useToast)(),
          { colors: j } = (0, r(d[15]).useTheme)(),
          E = (0, s.useMemo)(() => x(j), [j]),
          S = o.safetyPreferences ?? {},
          C = (0, r(d[16]).countEnabledSafetyPreferences)(S),
          R = async (t, s) => {
            'autoShareTrip' === t && s && !1 === o.privacy?.shareTripStatus
              ? T({
                  type: 'info',
                  title: 'Trip sharing is off',
                  message:
                    'Turn on trip status sharing in Privacy before enabling auto-share reminders.',
                })
              : (await f('safetyPreferences', { [t]: s }),
                T({
                  type: 'success',
                  title: 'Safety preference updated',
                  message: s
                    ? 'Trip Guardian will include this safety tool.'
                    : 'This safety tool is now optional.',
                }));
          };
        return (0, h.jsxs)(c.default, {
          title: 'Safety preferences',
          subtitle: 'PIN, RideCheck, sharing, and trip protection',
          children: [
            (0, h.jsxs)(l.default, {
              style: E.hero,
              children: [
                (0, h.jsx)(l.default, {
                  style: E.heroIcon,
                  children: (0, h.jsx)(r(d[17]).Ionicons, {
                    name: 'shield-checkmark',
                    size: 24,
                    color: j.primary,
                  }),
                }),
                (0, h.jsxs)(l.default, {
                  style: E.heroText,
                  children: [
                    (0, h.jsx)(n.default, {
                      style: E.heroTitle,
                      children: 'Set it before the trip',
                    }),
                    (0, h.jsx)(n.default, {
                      style: E.heroBody,
                      children: r(d[16]).SAFETY_PREFERENCES_INTRO,
                    }),
                  ],
                }),
              ],
            }),
            (0, h.jsxs)(l.default, {
              style: E.statsRow,
              children: [
                (0, h.jsxs)(l.default, {
                  style: E.statChip,
                  children: [
                    (0, h.jsx)(r(d[17]).Ionicons, {
                      name: 'checkmark-circle',
                      size: 16,
                      color: j.success ?? j.primary,
                    }),
                    (0, h.jsxs)(n.default, {
                      style: E.statText,
                      children: [C, '/', r(d[16]).SAFETY_PREFERENCE_ITEMS.length, ' enabled'],
                    }),
                  ],
                }),
                (0, h.jsxs)(l.default, {
                  style: E.statChip,
                  children: [
                    (0, h.jsx)(r(d[17]).Ionicons, {
                      name: 'keypad-outline',
                      size: 16,
                      color: j.primary,
                    }),
                    (0, h.jsx)(n.default, { style: E.statText, children: 'PIN ready' }),
                  ],
                }),
                (0, h.jsxs)(l.default, {
                  style: E.statChip,
                  children: [
                    (0, h.jsx)(r(d[17]).Ionicons, {
                      name: 'share-social-outline',
                      size: 16,
                      color: j.primary,
                    }),
                    (0, h.jsx)(n.default, { style: E.statText, children: 'Trusted contacts' }),
                  ],
                }),
              ],
            }),
            (0, h.jsx)(u.default, {
              title: 'Trip safety tools',
              children: r(d[16]).SAFETY_PREFERENCE_ITEMS.map(t =>
                (0, h.jsx)(
                  b,
                  { item: t, enabled: !1 !== S[t.key], onToggle: s => R(t.key, s), styles: E },
                  t.key
                )
              ),
            }),
            (0, h.jsx)(p.default, {
              elevated: !0,
              children: (0, h.jsx)(n.default, {
                style: E.note,
                children:
                  'Safety alerts and emergency actions still stay available in Trip Guardian even if you turn off reminders.',
              }),
            }),
            (0, h.jsx)(y.default, {
              title: 'Turn on recommended safety',
              onPress: async () => {
                const t = r(d[16]).SAFETY_PREFERENCE_ITEMS.reduce(
                  (t, s) => Object.assign({}, t, { [s.key]: !0 }),
                  {}
                );
                (await f('safetyPreferences', t),
                  T({
                    type: 'success',
                    title: 'Recommended safety on',
                    message:
                      'RideCheck, PIN, sharing reminders, audio consent, and night prompts are ready.',
                  }));
              },
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
      y = t(r(d[9])),
      h = r(d[10]);
    const x = t =>
      o.default.create({
        hero: {
          flexDirection: 'row',
          gap: r(d[11]).spacing.md,
          padding: r(d[11]).spacing.md,
          borderRadius: r(d[11]).radius.md,
          backgroundColor: t.primaryAlpha06 ?? t.surface,
          borderWidth: 1,
          borderColor: t.border,
          marginBottom: r(d[11]).spacing.lg,
        },
        heroIcon: {
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: t.primaryAlpha12 ?? t.surfaceElevated,
        },
        heroText: { flex: 1 },
        heroTitle: {
          fontFamily: r(d[11]).fontFamily.bold,
          fontSize: 16,
          color: t.textPrimary,
          marginBottom: r(d[11]).spacing.xs,
        },
        heroBody: Object.assign({}, r(d[11]).typography.caption, { lineHeight: 18 }),
        statsRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: r(d[11]).spacing.sm,
          marginBottom: r(d[11]).spacing.lg,
        },
        statChip: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: r(d[11]).spacing.xs,
          paddingHorizontal: r(d[11]).spacing.sm,
          paddingVertical: r(d[11]).spacing.xs,
          borderRadius: r(d[11]).radius.sm,
          backgroundColor: t.surface,
          borderWidth: 1,
          borderColor: t.border,
        },
        statText: { fontFamily: r(d[11]).fontFamily.medium, fontSize: 12, color: t.textSecondary },
        prefBlock: {
          marginBottom: r(d[11]).spacing.sm,
          borderRadius: r(d[11]).radius.md,
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.surface,
          overflow: 'hidden',
        },
        exampleBox: { paddingHorizontal: r(d[11]).spacing.md, paddingBottom: r(d[11]).spacing.md },
        exampleInner: {
          padding: r(d[11]).spacing.sm,
          borderRadius: r(d[11]).radius.sm,
          backgroundColor: t.surfaceElevated,
          borderWidth: 1,
          borderColor: t.border,
        },
        exampleLabel: {
          fontFamily: r(d[11]).fontFamily.semiBold,
          fontSize: 10,
          color: t.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          marginBottom: 4,
        },
        exampleText: {
          fontFamily: r(d[11]).fontFamily.regular,
          fontSize: 13,
          color: t.textPrimary,
          lineHeight: 18,
        },
        note: Object.assign({}, r(d[11]).typography.caption, {
          lineHeight: 18,
          color: t.textMuted,
        }),
      });
    function b({ item: t, enabled: s, onToggle: o, styles: c }) {
      return (0, h.jsxs)(l.default, {
        style: c.prefBlock,
        children: [
          (0, h.jsx)(f.default, {
            icon: t.icon,
            title: t.title,
            subtitle: t.subtitle,
            toggle: !0,
            toggleValue: s,
            onToggle: o,
            showChevron: !1,
          }),
          s && t.example
            ? (0, h.jsx)(l.default, {
                style: c.exampleBox,
                children: (0, h.jsxs)(l.default, {
                  style: c.exampleInner,
                  children: [
                    (0, h.jsx)(n.default, {
                      style: c.exampleLabel,
                      children: 'Trip Guardian preview',
                    }),
                    (0, h.jsx)(n.default, { style: c.exampleText, children: t.example }),
                  ],
                }),
              })
            : null,
        ],
      });
    }
  },
  1461,
  [1, 5, 26, 161, 19, 1710, 1667, 1670, 684, 672, 183, 377, 501, 1614, 1386, 381, 1656, 578]
);
