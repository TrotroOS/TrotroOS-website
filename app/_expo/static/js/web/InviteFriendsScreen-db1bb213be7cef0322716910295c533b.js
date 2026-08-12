__d(
  function (g, _r, _i, a, m, _e, d) {
    var e = _r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function () {
        const { user: e, profile: s } = (0, _r(d[15]).useAuth)(),
          { prefs: n, patch: b } = (0, _r(d[16]).useUserPreferences)(e?.id),
          { showToast: j } = (0, _r(d[17]).useToast)(),
          { colors: w } = (0, _r(d[18]).useTheme)(),
          S = h(w),
          v = (0, t.useMemo)(() => (0, _r(d[19]).getReferralCode)(e?.id, s), [e?.id, s]),
          T = (0, t.useMemo)(() => (0, _r(d[19]).buildInviteLink)(v), [v]),
          C = s?.full_name ?? e?.email?.split('@')[0] ?? null,
          I = n?.inviteStats?.sharesSent ?? 0,
          P = async () => {
            e?.id &&
              (await b({
                inviteStats: Object.assign({}, n.inviteStats ?? {}, {
                  sharesSent: I + 1,
                  lastSharedAt: new Date().toISOString(),
                }),
              }));
          },
          k = async () => {
            (await c.setStringAsync(v), j({ type: 'success', title: 'Code copied', message: v }));
          },
          B = async () => {
            (await c.setStringAsync(T),
              j({ type: 'success', title: 'Link copied', message: 'Invite link ready to paste.' }),
              await P());
          },
          R = async () => {
            const e = (0, _r(d[19]).buildInviteMessage)({ referralCode: v, inviterName: C });
            try {
              (await i.default.share({ message: e, title: `Join ${v} on TrotroOS` }), await P());
            } catch {
              j({
                type: 'error',
                title: 'Share cancelled',
                message: 'Could not open share sheet.',
              });
            }
          },
          _ = async () => {
            const e = (0, _r(d[19]).buildInviteMessage)({
                referralCode: v,
                inviterName: C,
                channel: 'whatsapp',
              }),
              t = (0, _r(d[19]).buildWhatsAppUrl)(e);
            try {
              if (await r.default.canOpenURL(t))
                return (await r.default.openURL(t), void (await P()));
            } catch {}
            await R();
          },
          L = async () => {
            const e = (0, _r(d[19]).buildInviteMessage)({
              referralCode: v,
              inviterName: C,
              channel: 'sms',
            });
            try {
              (await r.default.openURL((0, _r(d[19]).buildSmsUrl)(e)), await P());
            } catch {
              await R();
            }
          },
          [N, F] = (0, t.useState)(!1),
          O = async e => {
            if (!N) {
              F(!0);
              try {
                await e();
              } catch {
                j({
                  type: 'error',
                  title: 'Could not share',
                  message: 'Try copy link or another app.',
                });
              } finally {
                F(!1);
              }
            }
          },
          E = e => {
            'whatsapp' === e
              ? O(_)
              : 'share' === e
                ? O(R)
                : 'copy' === e
                  ? O(B)
                  : 'code' === e && O(k);
          },
          A = _r(d[20]).INVITE_SHARE_CHANNELS.find(e => 'whatsapp' === e.id),
          H = _r(d[20]).INVITE_SHARE_CHANNELS.find(e => 'share' === e.id),
          V = _r(d[20]).INVITE_SHARE_CHANNELS.find(e => 'copy' === e.id),
          D = _r(d[20]).INVITE_SHARE_CHANNELS.find(e => 'code' === e.id);
        return (0, f.jsxs)(p.default, {
          title: 'Invite Friends',
          subtitle: 'Share TrotroOS \u2014 smarter trotro & TrotroRide in Kumasi',
          children: [
            (0, f.jsxs)(y.default, {
              elevated: !0,
              style: S.hero,
              children: [
                (0, f.jsx)(l.default, {
                  style: S.heroTitle,
                  children: 'Give friends a smarter ride',
                }),
                (0, f.jsx)(l.default, {
                  style: S.heroSubtitle,
                  children:
                    'Your personal code links friends to you when they sign up. They get seat reservation, shared rides, and Trip Guardian \u2014 you help them skip Bolt prices on local routes.',
                }),
                (0, f.jsxs)(o.default, {
                  style: S.codeBox,
                  children: [
                    (0, f.jsx)(l.default, { style: S.codeLabel, children: 'Your referral code' }),
                    (0, f.jsx)(l.default, { style: S.codeValue, selectable: !0, children: v }),
                    (0, f.jsx)(l.default, {
                      style: S.linkPreview,
                      selectable: !0,
                      numberOfLines: 2,
                      children: T,
                    }),
                  ],
                }),
                (0, f.jsxs)(o.default, {
                  style: S.channelRow,
                  children: [
                    (0, f.jsx)(x, {
                      channel: A,
                      onPress: () => E('whatsapp'),
                      styles: S,
                      colors: w,
                      primary: !0,
                    }),
                    (0, f.jsx)(x, { channel: H, onPress: () => E('share'), styles: S, colors: w }),
                    (0, f.jsx)(x, { channel: V, onPress: () => E('copy'), styles: S, colors: w }),
                    (0, f.jsx)(x, { channel: D, onPress: () => E('code'), styles: S, colors: w }),
                  ],
                }),
                (0, f.jsx)(u.default, {
                  title: 'Send via SMS',
                  variant: 'secondary',
                  onPress: () => O(L),
                  disabled: N,
                }),
              ],
            }),
            I > 0
              ? (0, f.jsxs)(o.default, {
                  style: S.statsRow,
                  children: [
                    (0, f.jsxs)(o.default, {
                      style: S.statCard,
                      children: [
                        (0, f.jsx)(l.default, { style: S.statValue, children: I }),
                        (0, f.jsx)(l.default, { style: S.statLabel, children: 'Invites shared' }),
                      ],
                    }),
                    (0, f.jsxs)(o.default, {
                      style: S.statCard,
                      children: [
                        (0, f.jsx)(l.default, { style: S.statValue, children: 'Soon' }),
                        (0, f.jsx)(l.default, {
                          style: S.statLabel,
                          children: 'Cash rewards \u2014 tracking invites now',
                        }),
                      ],
                    }),
                  ],
                })
              : null,
            (0, f.jsxs)(y.default, {
              elevated: !0,
              children: [
                (0, f.jsx)(l.default, { style: S.sectionTitle, children: "Why they'll love it" }),
                _r(d[20]).INVITE_PERKS.map(e =>
                  (0, f.jsxs)(
                    o.default,
                    {
                      style: S.perkRow,
                      children: [
                        (0, f.jsx)(o.default, {
                          style: S.perkIcon,
                          children: (0, f.jsx)(_r(d[14]).Ionicons, {
                            name: e.icon,
                            size: 20,
                            color: w.onPrimary,
                          }),
                        }),
                        (0, f.jsxs)(o.default, {
                          style: { flex: 1 },
                          children: [
                            (0, f.jsx)(l.default, { style: S.perkTitle, children: e.title }),
                            (0, f.jsx)(l.default, { style: S.perkDetail, children: e.detail }),
                          ],
                        }),
                      ],
                    },
                    e.id
                  )
                ),
              ],
            }),
            (0, f.jsxs)(y.default, {
              elevated: !0,
              children: [
                (0, f.jsx)(l.default, { style: S.sectionTitle, children: 'How it works' }),
                _r(d[20]).INVITE_STEPS.map(e =>
                  (0, f.jsxs)(
                    o.default,
                    {
                      style: S.stepRow,
                      children: [
                        (0, f.jsx)(o.default, {
                          style: S.stepBadge,
                          children: (0, f.jsx)(l.default, { style: S.stepNum, children: e.step }),
                        }),
                        (0, f.jsxs)(o.default, {
                          style: S.stepText,
                          children: [
                            (0, f.jsx)(l.default, { style: S.stepTitle, children: e.title }),
                            (0, f.jsx)(l.default, { style: S.stepDetail, children: e.detail }),
                          ],
                        }),
                      ],
                    },
                    e.step
                  )
                ),
              ],
            }),
          ],
        });
      }));
    var t = _r(d[1]),
      r = e(_r(d[2])),
      s = e(_r(d[3])),
      i = e(_r(d[4])),
      n = e(_r(d[5])),
      l = e(_r(d[6])),
      o = e(_r(d[7])),
      c = (function (e, t) {
        if ('function' == typeof WeakMap)
          var r = new WeakMap(),
            s = new WeakMap();
        return (function (e, t) {
          if (!t && e && e.__esModule) return e;
          var i,
            n,
            l = { __proto__: null, default: e };
          if (null === e || ('object' != typeof e && 'function' != typeof e)) return l;
          if ((i = t ? s : r)) {
            if (i.has(e)) return i.get(e);
            i.set(e, l);
          }
          for (const t in e)
            'default' !== t &&
              {}.hasOwnProperty.call(e, t) &&
              ((n = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) &&
              (n.get || n.set)
                ? i(l, t, n)
                : (l[t] = e[t]));
          return l;
        })(e, t);
      })(_r(d[8])),
      p = e(_r(d[9])),
      y = e(_r(d[10])),
      u = e(_r(d[11])),
      f = _r(d[12]);
    const h = e =>
      n.default.create({
        hero: { marginBottom: _r(d[13]).spacing.lg },
        heroTitle: {
          fontFamily: _r(d[13]).fontFamily.bold,
          fontSize: 20,
          color: e.textPrimary,
          marginBottom: _r(d[13]).spacing.xs,
        },
        heroSubtitle: Object.assign({}, _r(d[13]).typography.body, {
          color: e.textSecondary,
          marginBottom: _r(d[13]).spacing.lg,
          lineHeight: 22,
        }),
        codeBox: {
          backgroundColor: e.surface,
          borderRadius: _r(d[13]).radius.md,
          borderWidth: 1,
          borderColor: e.border,
          padding: _r(d[13]).spacing.lg,
          alignItems: 'center',
          marginBottom: _r(d[13]).spacing.md,
        },
        codeLabel: Object.assign({}, _r(d[13]).typography.caption, {
          marginBottom: _r(d[13]).spacing.xs,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }),
        codeValue: {
          fontFamily: _r(d[13]).fontFamily.bold,
          fontSize: 28,
          letterSpacing: 4,
          color: e.primary,
        },
        linkPreview: Object.assign({}, _r(d[13]).typography.caption, {
          textAlign: 'center',
          marginTop: _r(d[13]).spacing.sm,
        }),
        channelRow: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: _r(d[13]).spacing.sm,
          marginBottom: _r(d[13]).spacing.lg,
        },
        channelBtn: {
          flex: 1,
          minWidth: '47%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: _r(d[13]).spacing.sm,
          paddingVertical: _r(d[13]).spacing.md,
          borderRadius: _r(d[13]).radius.md,
          borderWidth: 1,
          borderColor: e.border,
          backgroundColor: e.surface,
        },
        channelBtnPrimary: { backgroundColor: e.primary, borderColor: e.primary },
        channelLabel: {
          fontFamily: _r(d[13]).fontFamily.semiBold,
          fontSize: 14,
          color: e.textPrimary,
        },
        channelLabelPrimary: { color: e.onPrimary },
        statsRow: {
          flexDirection: 'row',
          gap: _r(d[13]).spacing.md,
          marginBottom: _r(d[13]).spacing.lg,
        },
        statCard: {
          flex: 1,
          backgroundColor: e.surface,
          borderRadius: _r(d[13]).radius.md,
          borderWidth: 1,
          borderColor: e.border,
          padding: _r(d[13]).spacing.md,
          alignItems: 'center',
        },
        statValue: { fontFamily: _r(d[13]).fontFamily.bold, fontSize: 22, color: e.primary },
        statLabel: Object.assign({}, _r(d[13]).typography.caption, {
          marginTop: 2,
          textAlign: 'center',
        }),
        sectionTitle: {
          fontFamily: _r(d[13]).fontFamily.bold,
          fontSize: 16,
          color: e.textPrimary,
          marginBottom: _r(d[13]).spacing.md,
        },
        perkRow: {
          flexDirection: 'row',
          gap: _r(d[13]).spacing.md,
          marginBottom: _r(d[13]).spacing.md,
        },
        perkIcon: {
          width: 40,
          height: 40,
          borderRadius: _r(d[13]).radius.sm,
          backgroundColor: e.primary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        perkTitle: {
          fontFamily: _r(d[13]).fontFamily.semiBold,
          fontSize: 14,
          color: e.textPrimary,
          marginBottom: 2,
        },
        perkDetail: Object.assign({}, _r(d[13]).typography.caption, { lineHeight: 18, flex: 1 }),
        stepRow: {
          flexDirection: 'row',
          gap: _r(d[13]).spacing.md,
          marginBottom: _r(d[13]).spacing.md,
        },
        stepBadge: {
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: e.surface,
          borderWidth: 1,
          borderColor: e.border,
          alignItems: 'center',
          justifyContent: 'center',
        },
        stepNum: { fontFamily: _r(d[13]).fontFamily.bold, fontSize: 13, color: e.primary },
        stepTitle: {
          fontFamily: _r(d[13]).fontFamily.semiBold,
          fontSize: 14,
          color: e.textPrimary,
        },
        stepDetail: Object.assign({}, _r(d[13]).typography.caption, { lineHeight: 18 }),
        stepText: { flex: 1 },
      });
    function x({ channel: e, onPress: t, styles: r, colors: i, primary: n = !1 }) {
      const o = n ? i.onPrimary : (e.color ?? i.primary);
      return (0, f.jsxs)(s.default, {
        style: [r.channelBtn, n && r.channelBtnPrimary],
        onPress: t,
        children: [
          (0, f.jsx)(_r(d[14]).Ionicons, { name: e.icon, size: 20, color: o }),
          (0, f.jsx)(l.default, {
            style: [r.channelLabel, n && r.channelLabelPrimary],
            children: e.label,
          }),
        ],
      });
    }
  },
  1468,
  [
    1, 5, 667, 326, 1517, 26, 161, 19, 1526, 1710, 684, 672, 183, 377, 578, 501, 1614, 1386, 381,
    1658, 1659,
  ]
);
