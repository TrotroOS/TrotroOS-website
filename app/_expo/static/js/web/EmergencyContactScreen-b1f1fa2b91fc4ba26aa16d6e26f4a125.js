__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function () {
        const { user: e, profile: r, updateProfile: v } = (0, _r(d[16]).useAuth)(),
          { prefs: C, patch: P } = (0, _r(d[17]).useUserPreferences)(e?.id),
          { showToast: T } = (0, _r(d[18]).useToast)(),
          { colors: w } = (0, _r(d[19]).useTheme)(),
          F = b(w),
          S = C.emergencyContact ?? {},
          [_, R] = (0, t.useState)(S.name ?? ''),
          [B, O] = (0, t.useState)(S.phone ?? ''),
          [N, I] = (0, t.useState)(S.relationship ?? ''),
          [A, z] = (0, t.useState)(!1),
          [E, M] = (0, t.useState)('');
        (0, t.useEffect)(() => {
          (R(S.name ?? ''), O(S.phone ?? ''), I(S.relationship ?? ''));
        }, [S.name, S.phone, S.relationship]);
        const k = Boolean(S.name?.trim() && S.phone?.trim()),
          D = (0, t.useMemo)(() => (0, _r(d[20]).formatPhoneDisplay)(S.phone || B), [S.phone, B]),
          G = (0, t.useMemo)(
            () => [
              ..._r(d[21]).EMERGENCY_SERVICES,
              Object.assign({}, _r(d[21]).TROTROOS_SUPPORT, { id: 'support' }),
            ],
            []
          ),
          H = e =>
            e.trim()
              ? (0, _r(d[20]).isValidGhanaPhone)(e)
                ? (M(''), !0)
                : (M('Enter a valid Ghana number (e.g. 024 123 4567).'), !1)
              : (M('Phone number is required.'), !1);
        return (0, x.jsxs)(c.default, {
          title: 'Emergency Contact',
          subtitle: 'Official services & someone you trust',
          children: [
            (0, x.jsxs)(o.default, {
              style: F.sosCard,
              onPress: () => (0, u.dialNumber)('112', 'National Emergency'),
              children: [
                (0, x.jsxs)(s.default, {
                  style: F.sosTextCol,
                  children: [
                    (0, x.jsx)(l.default, {
                      style: F.sosTitle,
                      children: 'National emergency \xb7 112',
                    }),
                    (0, x.jsx)(l.default, {
                      style: F.sosSubtitle,
                      children:
                        'Tap to call immediately. Use for police, fire, or ambulance emergencies.',
                    }),
                  ],
                }),
                (0, x.jsx)(s.default, {
                  style: F.sosBtn,
                  children: (0, x.jsx)(_r(d[23]).Ionicons, {
                    name: 'call',
                    size: 26,
                    color: w.onPrimary ?? '#FFF',
                  }),
                }),
              ],
            }),
            (0, x.jsx)(p.default, {
              title: 'Official emergency services',
              children: (0, x.jsx)(u.default, { services: G }),
            }),
            (0, x.jsxs)(f.default, {
              elevated: !0,
              children: [
                (0, x.jsx)(l.default, {
                  style: F.hint,
                  children:
                    'Add someone you trust. They appear in Trip Guardian alongside police, ambulance, and fire when you need help during a trip.',
                }),
                (0, x.jsx)(l.default, {
                  style: F.guardianNote,
                  children: _r(d[22]).TRIP_GUARDIAN_CONTACT_NOTE,
                }),
                k
                  ? (0, x.jsxs)(s.default, {
                      style: F.savedCard,
                      children: [
                        (0, x.jsxs)(s.default, {
                          style: F.savedHeader,
                          children: [
                            (0, x.jsx)(s.default, {
                              style: F.savedAvatar,
                              children: (0, x.jsx)(l.default, {
                                style: F.savedInitials,
                                children: j(S.name),
                              }),
                            }),
                            (0, x.jsxs)(s.default, {
                              style: { flex: 1 },
                              children: [
                                (0, x.jsx)(l.default, { style: F.savedName, children: S.name }),
                                (0, x.jsxs)(l.default, {
                                  style: F.savedMeta,
                                  children: [
                                    S.relationship || 'Personal contact',
                                    ' \xb7 Saved for Trip Guardian',
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, x.jsx)(l.default, {
                          style: F.savedPhone,
                          children: (0, _r(d[20]).formatPhoneDisplay)(S.phone),
                        }),
                        (0, x.jsxs)(s.default, {
                          style: F.actionRow,
                          children: [
                            (0, x.jsxs)(o.default, {
                              style: [F.actionBtn, F.actionBtnPrimary],
                              onPress: () => {
                                const e = (0, _r(d[20]).personalContactToService)(S);
                                e && (0, u.dialNumber)(e.phone, e.name);
                              },
                              children: [
                                (0, x.jsx)(_r(d[23]).Ionicons, {
                                  name: 'call',
                                  size: 16,
                                  color: w.onPrimary,
                                }),
                                (0, x.jsx)(l.default, {
                                  style: [F.actionLabel, F.actionLabelPrimary],
                                  children: 'Call',
                                }),
                              ],
                            }),
                            (0, x.jsxs)(o.default, {
                              style: F.actionBtn,
                              onPress: async () => {
                                const e = (0, _r(d[20]).normalizeGhanaPhone)(S.phone ?? B);
                                if (!e) return;
                                const t = (0, _r(d[22]).buildNotifyContactMessage)(
                                    S.name ?? _,
                                    r?.full_name
                                  ),
                                  o = (0, _r(d[20]).buildWhatsAppNotifyUrl)(t, e);
                                try {
                                  if (await n.default.canOpenURL(o))
                                    return void (await n.default.openURL(o));
                                } catch {}
                                await i.default.share({ message: t });
                              },
                              children: [
                                (0, x.jsx)(_r(d[23]).Ionicons, {
                                  name: 'logo-whatsapp',
                                  size: 16,
                                  color: w.textPrimary,
                                }),
                                (0, x.jsx)(l.default, {
                                  style: F.actionLabel,
                                  children: 'Notify on WhatsApp',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                  : null,
                (0, x.jsx)(y.default, {
                  label: 'Contact name',
                  value: _,
                  onChangeText: R,
                  placeholder: 'Full name',
                }),
                (0, x.jsx)(y.default, {
                  label: 'Phone number',
                  value: B,
                  onChangeText: e => {
                    (O(e), E && H(e));
                  },
                  placeholder: '024 123 4567',
                  keyboardType: 'phone-pad',
                  error: E,
                }),
                D && !E
                  ? (0, x.jsxs)(l.default, {
                      style: F.phoneHint,
                      children: ['Will save as ', (0, _r(d[20]).formatPhoneDisplay)(B) || D],
                    })
                  : null,
                (0, x.jsx)(l.default, {
                  style: [F.hint, { marginBottom: _r(d[15]).spacing.sm, fontSize: 13 }],
                  children: 'Relationship',
                }),
                (0, x.jsx)(s.default, {
                  style: F.chipRow,
                  children: _r(d[22]).RELATIONSHIP_OPTIONS.map(e => {
                    const t = N === e.label;
                    return (0, x.jsx)(
                      o.default,
                      {
                        style: [F.chip, t && F.chipActive],
                        onPress: () => {
                          return ((t = e.label), void I(t));
                          var t;
                        },
                        children: (0, x.jsx)(l.default, {
                          style: [F.chipText, t && F.chipTextActive],
                          children: e.label,
                        }),
                      },
                      e.id
                    );
                  }),
                }),
                (0, x.jsx)(y.default, {
                  label: 'Custom relationship (optional)',
                  value: N,
                  onChangeText: I,
                  placeholder: 'e.g. Roommate, Auntie\u2026',
                }),
                (0, x.jsx)(h.default, {
                  title: 'Save personal contact',
                  onPress: async () => {
                    if (!_.trim())
                      return void T({
                        type: 'error',
                        title: 'Name required',
                        message: "Add your contact's full name.",
                      });
                    if (!H(B)) return;
                    z(!0);
                    const t = (0, _r(d[20]).normalizeGhanaPhone)(B),
                      n = {
                        name: _.trim(),
                        phone: t,
                        relationship: N.trim(),
                        updatedAt: new Date().toISOString(),
                      };
                    (await P({ emergencyContact: n }),
                      e?.id &&
                        (await v(e.id, {
                          emergency_contact_name: n.name,
                          emergency_contact_phone: n.phone,
                        }).catch(() => {})),
                      z(!1),
                      T({
                        type: 'success',
                        title: 'Contact saved',
                        message: `${n.name} will appear in Trip Guardian.`,
                      }));
                  },
                  loading: A,
                }),
                k
                  ? (0, x.jsx)(s.default, {
                      style: F.removeBtn,
                      children: (0, x.jsx)(h.default, {
                        title: 'Remove contact',
                        variant: 'ghost',
                        onPress: async () => {
                          (await P({ emergencyContact: { name: '', phone: '', relationship: '' } }),
                            e?.id &&
                              (await v(e.id, {
                                emergency_contact_name: null,
                                emergency_contact_phone: null,
                              }).catch(() => {})),
                            R(''),
                            O(''),
                            I(''),
                            T({
                              type: 'info',
                              title: 'Contact removed',
                              message: 'Personal emergency contact cleared.',
                            }));
                        },
                      }),
                    })
                  : null,
              ],
            }),
            (0, x.jsxs)(f.default, {
              elevated: !0,
              children: [
                (0, x.jsx)(l.default, {
                  style: [
                    F.hint,
                    { marginBottom: _r(d[15]).spacing.sm, fontFamily: _r(d[15]).fontFamily.bold },
                  ],
                  children: 'Good to know',
                }),
                _r(d[22]).EMERGENCY_CONTACT_TIPS.map(e =>
                  (0, x.jsxs)(
                    s.default,
                    {
                      style: F.tipRow,
                      children: [
                        (0, x.jsx)(_r(d[23]).Ionicons, {
                          name: 'information-circle-outline',
                          size: 16,
                          color: w.primary,
                        }),
                        (0, x.jsx)(l.default, { style: F.tipText, children: e }),
                      ],
                    },
                    e
                  )
                ),
              ],
            }),
          ],
        });
      }));
    var t = _r(d[1]),
      n = e(_r(d[2])),
      o = e(_r(d[3])),
      i = e(_r(d[4])),
      r = e(_r(d[5])),
      l = e(_r(d[6])),
      s = e(_r(d[7])),
      c = e(_r(d[8])),
      p = e(_r(d[9])),
      u = (function (e, t) {
        if ('function' == typeof WeakMap)
          var n = new WeakMap(),
            o = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var i,
            r,
            l = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return l;
          if ((i = t ? o : n)) {
            if (i.has(e)) return i.get(e);
            i.set(e, l);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((r = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (r.get || r.set)
                ? i(l, t, r)
                : (l[t] = e[t]));
          return l;
        })(e, t);
      })(_r(d[10])),
      f = e(_r(d[11])),
      h = e(_r(d[12])),
      y = e(_r(d[13])),
      x = _r(d[14]);
    const b = e =>
      r.default.create({
        sosCard: {
          backgroundColor: e.destructive,
          borderRadius: _r(d[15]).radius.md,
          padding: _r(d[15]).spacing.lg,
          marginBottom: _r(d[15]).spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[15]).spacing.md,
        },
        sosTextCol: { flex: 1 },
        sosTitle: {
          fontFamily: _r(d[15]).fontFamily.bold,
          fontSize: 17,
          color: e.onPrimary ?? '#FFFFFF',
          marginBottom: 4,
        },
        sosSubtitle: {
          fontFamily: _r(d[15]).fontFamily.regular,
          fontSize: 13,
          color: e.onPrimary ?? '#FFFFFF',
          opacity: 0.9,
          lineHeight: 18,
        },
        sosBtn: {
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: 'rgba(255,255,255,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        savedCard: {
          backgroundColor: e.surface,
          borderRadius: _r(d[15]).radius.md,
          borderWidth: 1,
          borderColor: e.border,
          padding: _r(d[15]).spacing.md,
          marginBottom: _r(d[15]).spacing.md,
        },
        savedHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: _r(d[15]).spacing.md,
          marginBottom: _r(d[15]).spacing.sm,
        },
        savedAvatar: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: e.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        savedInitials: { fontFamily: _r(d[15]).fontFamily.bold, fontSize: 18, color: e.onPrimary },
        savedName: { fontFamily: _r(d[15]).fontFamily.bold, fontSize: 16, color: e.textPrimary },
        savedMeta: Object.assign({}, _r(d[15]).typography.caption),
        savedPhone: {
          fontFamily: _r(d[15]).fontFamily.semiBold,
          fontSize: 15,
          color: e.primary,
          marginBottom: _r(d[15]).spacing.sm,
        },
        actionRow: { flexDirection: 'row', gap: _r(d[15]).spacing.sm },
        actionBtn: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: _r(d[15]).spacing.xs,
          paddingVertical: _r(d[15]).spacing.sm,
          borderRadius: _r(d[15]).radius.sm,
          borderWidth: 1,
          borderColor: e.border,
          backgroundColor: e.surfaceElevated,
        },
        actionBtnPrimary: { backgroundColor: e.primary, borderColor: e.primary },
        actionLabel: {
          fontFamily: _r(d[15]).fontFamily.semiBold,
          fontSize: 13,
          color: e.textPrimary,
        },
        actionLabelPrimary: { color: e.onPrimary },
        hint: Object.assign({}, _r(d[15]).typography.body, {
          marginBottom: _r(d[15]).spacing.md,
          lineHeight: 22,
          color: e.textSecondary,
        }),
        chipRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: _r(d[15]).spacing.sm,
          marginBottom: _r(d[15]).spacing.md,
        },
        chip: {
          paddingHorizontal: _r(d[15]).spacing.md,
          paddingVertical: _r(d[15]).spacing.sm,
          borderRadius: _r(d[15]).radius.sm,
          borderWidth: 1,
          borderColor: e.border,
          backgroundColor: e.surface,
        },
        chipActive: { borderColor: e.primary, backgroundColor: e.primary },
        chipText: { fontFamily: _r(d[15]).fontFamily.medium, fontSize: 13, color: e.textSecondary },
        chipTextActive: { color: e.onPrimary },
        phoneHint: Object.assign({}, _r(d[15]).typography.caption, {
          marginTop: -_r(d[15]).spacing.sm,
          marginBottom: _r(d[15]).spacing.md,
          color: e.textMuted,
        }),
        guardianNote: Object.assign({}, _r(d[15]).typography.caption, {
          lineHeight: 18,
          marginBottom: _r(d[15]).spacing.md,
          color: e.textMuted,
        }),
        tipRow: {
          flexDirection: 'row',
          gap: _r(d[15]).spacing.sm,
          marginBottom: _r(d[15]).spacing.sm,
        },
        tipText: Object.assign({}, _r(d[15]).typography.caption, { flex: 1, lineHeight: 18 }),
        removeBtn: { marginTop: _r(d[15]).spacing.sm },
      });
    function j(e) {
      const t = String(e ?? '')
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      return t.length
        ? 1 === t.length
          ? t[0].slice(0, 2).toUpperCase()
          : `${t[0][0]}${t[1][0]}`.toUpperCase()
        : '?';
    }
  },
  1466,
  [
    1, 5, 667, 326, 1517, 26, 161, 19, 1710, 1667, 1654, 684, 672, 679, 183, 377, 501, 1614, 1386,
    381, 1657, 1514, 1804, 578,
  ]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      (e.TRIP_GUARDIAN_CONTACT_NOTE = e.RELATIONSHIP_OPTIONS = e.EMERGENCY_CONTACT_TIPS = void 0),
      (e.buildNotifyContactMessage = function (o, t) {
        return [
          `${t?.trim() || 'I'} added you as an emergency contact on TrotroOS.`,
          '',
          'TrotroOS is a Kumasi mobility app for trotro and shared rides. You may receive live trip details if they share a ride with you via Trip Guardian.',
          '',
          'No action needed \u2014 just keep your phone available if they reach out during a trip.',
        ].join('\n');
      }));
    ((e.RELATIONSHIP_OPTIONS = [
      { id: 'parent', label: 'Parent', icon: 'people-outline' },
      { id: 'spouse', label: 'Spouse / partner', icon: 'heart-outline' },
      { id: 'sibling', label: 'Sibling', icon: 'person-outline' },
      { id: 'friend', label: 'Friend', icon: 'happy-outline' },
      { id: 'colleague', label: 'Colleague', icon: 'briefcase-outline' },
      { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
    ]),
      (e.EMERGENCY_CONTACT_TIPS = [
        'Choose someone who answers quickly \u2014 especially for late-night trotro trips.',
        'Your contact appears in Trip Guardian next to police, ambulance, and fire.',
        'Tell them they may receive live trip details when you share a ride on WhatsApp.',
        'For immediate danger, always call 112 first \u2014 do not wait for your contact.',
      ]),
      (e.TRIP_GUARDIAN_CONTACT_NOTE =
        'During an active trip, open Trip Guardian from My Trips. Your personal contact is listed alongside Ghana emergency numbers \u2014 tap to call instantly.'));
  },
  1804,
  []
);
