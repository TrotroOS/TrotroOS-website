__d(
  function (g, r, i, a, m, _e, d) {
    var e = r(d[0]);
    (Object.defineProperty(_e, '__esModule', { value: !0 }),
      (_e.default = function ({ docKey: e }) {
        const { language: p, t: x } = (0, r(d[10]).useLanguage)(),
          b = (0, t.useMemo)(() => (0, r(d[11]).getLegalDoc)(e, p), [e, p]),
          h = (0, r(d[12]).useNavigation)(),
          j = (0, r(d[13]).useSafeAreaInsets)(),
          { colors: S } = (0, r(d[14]).useTheme)(),
          B = (0, t.useMemo)(() => y(S), [S]),
          w = (0, t.useRef)(null),
          C = (0, t.useRef)({}),
          F = 'about' === e || b.isAbout,
          z = x(F ? 'legalScreen.badgeAbout' : 'legalScreen.badgeLegal'),
          R = b.footerNote ?? x('legalScreen.footerNoteLegal'),
          T = e => {
            const t = C.current[e];
            null != t && w.current && w.current.scrollTo({ y: Math.max(0, t - 16), animated: !0 });
          },
          k = [S.primaryAlpha12 ?? S.surface, S.backgroundAlt ?? S.background, S.background];
        return (0, f.jsxs)(o.default, {
          style: B.root,
          children: [
            (0, f.jsx)(r(d[15]).LinearGradient, {
              colors: k,
              locations: [0, 0.35, 1],
              style: n.default.absoluteFill,
            }),
            (0, f.jsxs)(s.default, {
              ref: w,
              contentContainerStyle: [
                B.scroll,
                {
                  paddingTop: j.top + r(d[9]).spacing.lg,
                  paddingBottom: j.bottom + r(d[9]).spacing.xxxl,
                },
              ],
              showsVerticalScrollIndicator: !1,
              children: [
                (0, f.jsxs)(c.default, {
                  style: B.backRow,
                  onPress: () => h.goBack(),
                  hitSlop: 12,
                  children: [
                    (0, f.jsx)(r(d[16]).Ionicons, {
                      name: 'chevron-back',
                      size: 22,
                      color: S.primary,
                    }),
                    (0, f.jsx)(l.default, { style: B.backText, children: x('legalScreen.back') }),
                  ],
                }),
                (0, f.jsxs)(o.default, {
                  style: B.hero,
                  children: [
                    (0, f.jsxs)(o.default, {
                      style: B.badgeRow,
                      children: [
                        (0, f.jsxs)(o.default, {
                          style: B.badge,
                          children: [
                            (0, f.jsx)(r(d[16]).Ionicons, {
                              name: F ? 'information-circle-outline' : 'document-text-outline',
                              size: 14,
                              color: S.primary,
                            }),
                            (0, f.jsx)(l.default, { style: B.badgeText, children: z }),
                          ],
                        }),
                        (0, f.jsxs)(l.default, { style: B.version, children: ['v', b.version] }),
                      ],
                    }),
                    (0, f.jsx)(l.default, { style: B.title, children: b.title }),
                    b.summary
                      ? (0, f.jsx)(l.default, { style: B.summary, children: b.summary })
                      : null,
                    (0, f.jsxs)(o.default, {
                      style: B.metaRow,
                      children: [
                        (0, f.jsx)(r(d[16]).Ionicons, {
                          name: 'calendar-outline',
                          size: 14,
                          color: S.textMuted,
                        }),
                        (0, f.jsx)(l.default, {
                          style: B.metaText,
                          children: x('legalScreen.effective', { date: b.effectiveDate }),
                        }),
                      ],
                    }),
                  ],
                }),
                b.sections.length > 4
                  ? (0, f.jsxs)(o.default, {
                      style: B.tocCard,
                      children: [
                        (0, f.jsx)(l.default, { style: B.tocTitle, children: 'Contents' }),
                        b.sections.map(e =>
                          (0, f.jsxs)(
                            c.default,
                            {
                              style: B.tocRow,
                              onPress: () => T(e.id),
                              children: [
                                (0, f.jsx)(l.default, { style: B.tocNumber, children: e.number }),
                                (0, f.jsx)(l.default, { style: B.tocLabel, children: e.heading }),
                                (0, f.jsx)(r(d[16]).Ionicons, {
                                  name: 'chevron-down',
                                  size: 14,
                                  color: S.textMuted,
                                }),
                              ],
                            },
                            e.id
                          )
                        ),
                      ],
                    })
                  : null,
                b.sections.map((e, t) =>
                  (0, f.jsxs)(
                    o.default,
                    {
                      style: B.sectionCard,
                      onLayout: t => {
                        C.current[e.id] = t.nativeEvent.layout.y;
                      },
                      children: [
                        (0, f.jsxs)(o.default, {
                          style: B.sectionHeader,
                          children: [
                            (0, f.jsx)(l.default, { style: B.sectionNumber, children: e.number }),
                            (0, f.jsxs)(o.default, {
                              style: B.sectionHeaderText,
                              children: [
                                (0, f.jsx)(l.default, {
                                  style: B.sectionHeading,
                                  children: e.heading,
                                }),
                                t < b.sections.length - 1
                                  ? (0, f.jsx)(o.default, { style: B.sectionRule })
                                  : null,
                              ],
                            }),
                          ],
                        }),
                        (0, f.jsx)(l.default, { style: B.sectionBody, children: e.body }),
                      ],
                    },
                    e.id
                  )
                ),
                b.contact
                  ? (0, f.jsxs)(o.default, {
                      style: B.footerCard,
                      children: [
                        (0, f.jsx)(l.default, { style: B.footerLabel, children: b.contact.label }),
                        (0, f.jsx)(c.default, {
                          onPress: () => u.default.openURL(`mailto:${b.contact.email}`),
                          children: (0, f.jsx)(l.default, {
                            style: B.footerEmail,
                            children: b.contact.email,
                          }),
                        }),
                        (0, f.jsx)(l.default, { style: B.footerNote, children: R }),
                      ],
                    })
                  : null,
              ],
            }),
          ],
        });
      }));
    var t = r(d[1]),
      o = e(r(d[2])),
      l = e(r(d[3])),
      n = e(r(d[4])),
      s = e(r(d[5])),
      c = e(r(d[6])),
      u = e(r(d[7])),
      f = r(d[8]);
    const y = e =>
      n.default.create({
        root: { flex: 1, backgroundColor: e.background },
        scroll: { paddingHorizontal: r(d[9]).spacing.lg },
        backRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: r(d[9]).spacing.lg,
          minHeight: 36,
        },
        backText: {
          fontFamily: r(d[9]).fontFamily.medium,
          fontSize: 15,
          color: e.primary,
          marginLeft: 2,
        },
        hero: { marginBottom: r(d[9]).spacing.xl },
        badgeRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: r(d[9]).spacing.md,
        },
        badge: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: e.primaryAlpha12 ?? e.surface,
          paddingHorizontal: r(d[9]).spacing.md,
          paddingVertical: r(d[9]).spacing.xs,
          borderRadius: r(d[9]).radius.pill,
          borderWidth: 1,
          borderColor: e.border,
        },
        badgeText: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 12,
          color: e.primary,
          letterSpacing: 0.3,
          textTransform: 'uppercase',
        },
        version: Object.assign({}, r(d[9]).typography.caption, { color: e.textMuted }),
        title: {
          fontFamily: r(d[9]).fontFamily.bold,
          fontSize: 32,
          letterSpacing: -0.8,
          lineHeight: 38,
          color: e.textPrimary,
          marginBottom: r(d[9]).spacing.sm,
        },
        summary: Object.assign({}, r(d[9]).typography.body, {
          fontSize: 16,
          lineHeight: 24,
          color: e.textSecondary,
          marginBottom: r(d[9]).spacing.md,
        }),
        metaRow: { flexDirection: 'row', alignItems: 'center', gap: r(d[9]).spacing.xs },
        metaText: Object.assign({}, r(d[9]).typography.caption),
        tocCard: {
          backgroundColor: e.surface,
          borderRadius: r(d[9]).radius.xl,
          borderWidth: 1,
          borderColor: e.border,
          padding: r(d[9]).spacing.lg,
          marginBottom: r(d[9]).spacing.xl,
        },
        tocTitle: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 13,
          color: e.textMuted,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
          marginBottom: r(d[9]).spacing.md,
        },
        tocRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: r(d[9]).spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: e.border,
        },
        tocNumber: {
          fontFamily: r(d[9]).fontFamily.medium,
          fontSize: 12,
          color: e.primary,
          width: 28,
        },
        tocLabel: {
          flex: 1,
          fontFamily: r(d[9]).fontFamily.medium,
          fontSize: 15,
          color: e.textPrimary,
        },
        sectionCard: {
          marginBottom: r(d[9]).spacing.xl,
          paddingBottom: r(d[9]).spacing.lg,
          borderBottomWidth: 1,
          borderBottomColor: e.border,
        },
        sectionHeader: { flexDirection: 'row', marginBottom: r(d[9]).spacing.md },
        sectionNumber: {
          fontFamily: r(d[9]).fontFamily.bold,
          fontSize: 28,
          color: e.primaryAlpha25 ?? e.border,
          width: 48,
          lineHeight: 32,
        },
        sectionHeaderText: { flex: 1, paddingTop: 4 },
        sectionHeading: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 20,
          letterSpacing: -0.3,
          color: e.textPrimary,
          marginBottom: r(d[9]).spacing.sm,
        },
        sectionRule: {
          height: 2,
          width: 40,
          backgroundColor: e.primary,
          borderRadius: 1,
          opacity: 0.5,
        },
        sectionBody: Object.assign({}, r(d[9]).typography.body, {
          fontSize: 15,
          lineHeight: 24,
          color: e.textSecondary,
          marginLeft: 48,
        }),
        footerCard: {
          borderRadius: r(d[9]).radius.xl,
          borderWidth: 1,
          borderColor: e.border,
          padding: r(d[9]).spacing.xl,
          marginTop: r(d[9]).spacing.md,
          backgroundColor: e.surfaceElevated,
        },
        footerLabel: Object.assign({}, r(d[9]).typography.label, {
          marginBottom: r(d[9]).spacing.xs,
        }),
        footerEmail: {
          fontFamily: r(d[9]).fontFamily.semiBold,
          fontSize: 17,
          color: e.primary,
          marginBottom: r(d[9]).spacing.sm,
        },
        footerNote: Object.assign({}, r(d[9]).typography.caption, { lineHeight: 18 }),
      });
  },
  1471,
  [1, 5, 19, 161, 26, 106, 326, 667, 183, 377, 1381, 1809, 382, 572, 381, 1707, 578]
);
__d(
  function (g, r, i, a, m, e, d) {
    (Object.defineProperty(e, '__esModule', { value: !0 }),
      Object.defineProperty(e, 'FAQ_CATEGORIES', {
        enumerable: !0,
        get: function () {
          return r(d[0]).FAQ_CATEGORIES;
        },
      }),
      Object.defineProperty(e, 'FAQ_ITEMS', {
        enumerable: !0,
        get: function () {
          return r(d[0]).FAQ_ITEMS;
        },
      }),
      Object.defineProperty(e, 'HELP_QUICK_LINKS', {
        enumerable: !0,
        get: function () {
          return r(d[0]).HELP_QUICK_LINKS;
        },
      }),
      Object.defineProperty(e, 'HELP_SUGGESTED_QUESTIONS', {
        enumerable: !0,
        get: function () {
          return r(d[0]).HELP_SUGGESTED_QUESTIONS;
        },
      }),
      (e.LEGAL_DOCS = void 0),
      Object.defineProperty(e, 'filterFaqItems', {
        enumerable: !0,
        get: function () {
          return r(d[0]).filterFaqItems;
        },
      }),
      (e.getAboutDoc = n),
      Object.defineProperty(e, 'getFaqPlainText', {
        enumerable: !0,
        get: function () {
          return r(d[0]).getFaqPlainText;
        },
      }),
      (e.getLegalDoc = function (t, s = 'en') {
        if ('about' === t) return n(s);
        return o[t] ?? n(s);
      }),
      Object.defineProperty(e, 'groupFaqByCategory', {
        enumerable: !0,
        get: function () {
          return r(d[0]).groupFaqByCategory;
        },
      }));
    const t = 'July 14, 2026',
      o = (e.LEGAL_DOCS = {
        terms: {
          title: 'Terms of Service',
          effectiveDate: t,
          version: r(d[1]).APP_VERSION,
          summary: `These Terms govern your access to and use of ${r(d[2]).APP_NAME}, including our mobile applications, websites, and related services in Kumasi and across Ghana.`,
          sections: [
            {
              id: 'acceptance',
              number: '01',
              heading: 'Agreement to Terms',
              body: `By creating an account, accessing, or using ${r(d[2]).APP_NAME}, you enter into a binding agreement with TrotroOS ("we," "us," or "our"). If you do not agree to these Terms, you may not use our Services.\n\nYou represent that you are at least 18 years old and have the legal capacity to enter into this agreement. If you use ${r(d[2]).APP_NAME} on behalf of an organization, you represent that you have authority to bind that organization.`,
            },
            {
              id: 'services',
              number: '02',
              heading: 'Our Services',
              body: `${r(d[2]).APP_NAME} is a technology platform that connects passengers with independent transport operators, including trotro mates and TrotroRide drivers. We facilitate ride discovery, seat reservations, shared-ride requests, live tracking, payments, and safety tools such as Trip Guardian.\n\nWe are not a transport carrier, employer of drivers, or insurer. Transport services are provided by independent third parties. We do not guarantee availability, pricing, routes, or arrival times.`,
            },
            {
              id: 'accounts',
              number: '03',
              heading: 'Accounts & Eligibility',
              body: 'You must provide accurate, current, and complete registration information and keep your account credentials secure. You are responsible for all activity under your account.\n\nYou may switch between Passenger, Mate, and TrotroRide Driver modes within the app. Additional verification may be required for certain driver features. We may suspend or terminate accounts that violate these Terms or applicable law.',
            },
            {
              id: 'bookings',
              number: '04',
              heading: 'Bookings, Fares & Payments',
              body: 'Displayed fares, platform fees, and payment methods (including Mobile Money and GhQR) are shown before you confirm a booking. By confirming, you authorize the charge or payment arrangement indicated at checkout.\n\nSeat reservations may expire if you do not board within the stated window. Cancellation, refund, and no-show policies may vary by service type and will be disclosed at the time of booking.\n\nPay-on-board arrangements, where offered, are between you and the operator unless we explicitly state otherwise.',
            },
            {
              id: 'conduct',
              number: '05',
              heading: 'User Conduct',
              body: `You agree not to harass, discriminate against, or endanger other users; provide false information; interfere with the platform; scrape or reverse engineer our systems; or use ${r(d[2]).APP_NAME} for unlawful purposes.\n\nWe may investigate reports, remove content, adjust trust scores, and suspend access for violations. Serious misconduct may be referred to law enforcement.`,
            },
            {
              id: 'safety',
              number: '06',
              heading: 'Safety & Emergency',
              body: 'Trip Guardian, emergency contact features, and in-app safety tools are designed to assist you during trips. They do not replace professional emergency services. In immediate danger, contact Ghana emergency numbers (112, 191, 192, 193) or local authorities.\n\nYou should verify vehicle and driver details before boarding and report safety concerns promptly through the app or to trotroosapp@gmail.com.',
            },
            {
              id: 'ip',
              number: '07',
              heading: 'Intellectual Property',
              body: `${r(d[2]).APP_NAME}, our logos, software, and content are owned by us or our licensors and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes in accordance with these Terms.`,
            },
            {
              id: 'liability',
              number: '08',
              heading: 'Disclaimers & Limitation of Liability',
              body: 'THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.\n\nWe are not liable for indirect, incidental, special, or consequential damages arising from your use of the platform or any trip arranged through it. Our total liability for any claim shall not exceed the greater of (a) amounts you paid to us in the twelve months before the claim or (b) GHS 100, except where prohibited by law.',
            },
            {
              id: 'disputes',
              number: '09',
              heading: 'Disputes & Governing Law',
              body: 'These Terms are governed by the laws of the Republic of Ghana. Disputes should first be raised with our support team at trotroosapp@gmail.com. Where required by law, you may pursue remedies before competent courts in Ghana.',
            },
            {
              id: 'changes',
              number: '10',
              heading: 'Changes to These Terms',
              body: 'We may update these Terms from time to time. Material changes will be communicated through the app or by email where appropriate. Your continued use after the effective date of updated Terms constitutes acceptance.',
            },
          ],
          contact: { label: 'Legal inquiries', email: r(d[2]).SUPPORT_EMAIL },
        },
        privacy: {
          title: 'Privacy Policy',
          effectiveDate: t,
          version: r(d[1]).APP_VERSION,
          summary: `This Privacy Policy explains how ${r(d[2]).APP_NAME} collects, uses, shares, and protects your personal information when you use our mobility platform.`,
          sections: [
            {
              id: 'overview',
              number: '01',
              heading: 'Overview',
              body: `TrotroOS is committed to protecting your privacy. This policy applies to information collected through our mobile app, website, and customer support channels. By using ${r(d[2]).APP_NAME}, you consent to the practices described here.`,
            },
            {
              id: 'collect',
              number: '02',
              heading: 'Information We Collect',
              body: '\u2022 Account information: name, email, phone number, profile photo, role, and verification details.\n\u2022 Trip information: origin, destination, bookings, ratings, and trip history.\n\u2022 Location data: precise location when you search for rides, during active trips, or when drivers broadcast GPS (subject to your device permissions and in-app settings).\n\u2022 Payment data: transaction references, payment method type, and fare amounts (we do not store full mobile money PINs).\n\u2022 Device & usage data: app version, language, crash logs, and interaction analytics to improve reliability.',
            },
            {
              id: 'use',
              number: '03',
              heading: 'How We Use Information',
              body: 'We use your information to:\n\u2022 Match you with available rides and drivers\n\u2022 Process reservations, payments, and receipts\n\u2022 Provide live tracking, Trip Guardian, and safety features\n\u2022 Calculate trust scores and display ratings\n\u2022 Send trip updates, reminders, and service notifications\n\u2022 Detect fraud, enforce policies, and comply with legal obligations\n\u2022 Improve our products and develop new features',
            },
            {
              id: 'share',
              number: '04',
              heading: 'How We Share Information',
              body: 'We share limited information with:\n\u2022 Drivers and co-passengers: name, pickup/drop-off, and trip status needed to complete your ride\n\u2022 Payment processors: to facilitate MoMo, GhQR, and other payment methods\n\u2022 Service providers: cloud hosting, analytics, and support tools under contractual safeguards\n\u2022 Authorities: when required by law or to protect safety\n\nWe do not sell your personal information to third parties for their marketing purposes.',
            },
            {
              id: 'location',
              number: '05',
              heading: 'Location Data',
              body: 'Location is essential for ride matching and safety. You can control location permissions through your device settings and certain in-app privacy controls. Disabling location may limit core features such as live tracking and nearby ride discovery.',
            },
            {
              id: 'retention',
              number: '06',
              heading: 'Data Retention',
              body: 'We retain account and trip records for as long as your account is active and as needed for legal, safety, and dispute-resolution purposes. You may request export or deletion of your data through Profile \u2192 Data & Privacy, subject to exceptions required by law.',
            },
            {
              id: 'security',
              number: '07',
              heading: 'Security',
              body: 'We implement administrative, technical, and organizational measures\u2014including encryption in transit, access controls, and secure cloud infrastructure\u2014to protect your data. No method of transmission or storage is 100% secure; please use a strong password and report suspicious activity.',
            },
            {
              id: 'rights',
              number: '08',
              heading: 'Your Rights & Choices',
              body: 'Depending on applicable law, you may have the right to access, correct, delete, or restrict processing of your personal data, and to withdraw consent where processing is consent-based. Contact us at trotroosapp@gmail.com to exercise these rights.',
            },
            {
              id: 'children',
              number: '09',
              heading: 'Children',
              body: `${r(d[2]).APP_NAME} is not directed to children under 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us data, contact us to request deletion.`,
            },
            {
              id: 'international',
              number: '10',
              heading: 'International Transfers',
              body: 'Your data may be processed on servers located outside Ghana through our cloud providers. We ensure appropriate safeguards are in place consistent with applicable data protection requirements.',
            },
            {
              id: 'updates',
              number: '11',
              heading: 'Policy Updates',
              body: 'We may revise this Privacy Policy periodically. The "Last updated" date at the top reflects the latest version. Material changes will be communicated through the app or email where required.',
            },
          ],
          contact: { label: 'Privacy team', email: r(d[2]).SUPPORT_EMAIL },
        },
      });
    function n(t = 'en') {
      const o = (o, n = {}) => (0, r(d[3]).translate)(t, o, n),
        n = r(d[2]).APP_NAME;
      return {
        title: o('aboutDoc.title', { appName: n }),
        effectiveDate: o('aboutDoc.effectiveDate'),
        version: r(d[2]).APP_VERSION,
        summary: o('aboutDoc.summary'),
        sections: [
          {
            id: 'mission',
            number: '01',
            heading: o('aboutDoc.sections.mission.heading'),
            body: o('aboutDoc.sections.mission.body', { appName: n }),
          },
          {
            id: 'ghana',
            number: '02',
            heading: o('aboutDoc.sections.ghana.heading'),
            body: o('aboutDoc.sections.ghana.body'),
          },
          {
            id: 'company',
            number: '03',
            heading: o('aboutDoc.sections.company.heading'),
            body: o('aboutDoc.sections.company.body', { appName: n }),
          },
          {
            id: 'version',
            number: '04',
            heading: o('aboutDoc.sections.version.heading'),
            body: (0, r(d[2]).getAppVersionLabel)(),
          },
        ],
        contact: { label: o('aboutDoc.contactLabel'), email: r(d[2]).SUPPORT_EMAIL },
        footerNote: o('aboutDoc.footerNote'),
        isAbout: !0,
      };
    }
  },
  1809,
  [1643, 508, 508, 1383]
);
