/* Evidence layer.
 *
 * Replaces the shared "rounded boxes and arrows" diagram with one exhibit per
 * section, each built to prove the specific thing that section claims:
 *   fragment     two toolchains that cannot produce a comparable number
 *   platform     what was standardised, and who owns it
 *   cost-result  the four-step improvement loop, per applied case
 *   risks        one fixed launch date against two versions of readiness
 *   scope        parallel workstreams that must clear one launch decision
 *   result       operating continuity, and the budget-exposure index
 *   decks        cost decomposition, volume seasonality, spec gaps
 *
 * All figures reuse the copy already in stories.js. Anything without a
 * published figure is shown as an index or a qualitative comparison.
 */
(() => {
  'use strict';

  const prior = EXHIBITS.render;
  const priorMount = EXHIBITS.mount;

  const esc = s => String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const T = (l, ko, en, ja) => l === 'ko' ? ko : l === 'ja' ? ja : en;

  const caption = l => T(l,
    '설명용 재구성 · 실제 거래·일정·설비 정보 아님. 비공개 금액은 지수로 표시.',
    'Illustrative reconstruction · not actual transactions, schedules or facility data. Unpublished amounts are shown as an index.',
    '説明用の再構成 · 実取引・日程・設備情報ではなく、非公開の金額は指数で表示。');

  const fig = (kind, body, l) =>
    `<figure class="technical-exhibit ev" data-exhibit="${kind}">${body}` +
    `<figcaption>${esc(caption(l))}</figcaption></figure>`;

  const head = (title, sub) =>
    `<p class="ev-h">${esc(title)}</p>` + (sub ? `<p class="ev-sub">${esc(sub)}</p>` : '');

  /* Scale, described in words instead of a number: "hundreds of millions
     of yen" carries the order of magnitude without publishing a range.
     Digit count is fixed per case (language-independent); callers pass it
     directly rather than this trying to parse translated copy. */
  const orderOfMagnitude = (n, l) => {
    const bands = {
      7: T(l, '수백만 엔대', 'millions of yen', '数百万円台'),
      8: T(l, '수천만 엔대', 'tens of millions of yen', '数千万円台'),
      9: T(l, '수억 엔대', 'hundreds of millions of yen', '数億円台'),
      10: T(l, '수십억 엔대', 'billions of yen', '数十億円台')
    };
    return bands[n] || T(l, '비공개 범위', 'an undisclosed range', '非公開の範囲');
  };

  /* Enterprise 3D icon set (provided asset, adapted) — one isometric
     composition per outcome, at native 200x200 viewBox. */
  const BADGE_ICON = {
    recovery: `<defs><linearGradient id="gradTopFace-recovery" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"></stop><stop offset="100%" stop-color="#EAF0F8"></stop></linearGradient><linearGradient id="gradFrontFace-recovery" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F2F5FA"></stop><stop offset="100%" stop-color="#D5DCE8"></stop></linearGradient><linearGradient id="gradSideFace-recovery" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#C8D1DF"></stop><stop offset="100%" stop-color="#A9B4C7"></stop></linearGradient><linearGradient id="gradAccentBlueTop-recovery" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A7DD8"></stop><stop offset="100%" stop-color="#2B5FBA"></stop></linearGradient><linearGradient id="gradAccentBlue-recovery" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#3B6FC9"></stop><stop offset="100%" stop-color="#1E4A94"></stop></linearGradient><linearGradient id="gradAccentBlueSide-recovery" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2B5FBA"></stop><stop offset="100%" stop-color="#15396F"></stop></linearGradient><linearGradient id="gradAccentTeal-recovery" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4FC4BE"></stop><stop offset="100%" stop-color="#2BA8A1"></stop></linearGradient><filter id="softShadow-recovery" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2"></feGaussianBlur><feOffset dx="0" dy="2.5" result="off"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.22"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><ellipse cx="100" cy="172" rx="68" ry="6" fill="#15396F" opacity="0.09"></ellipse><g><path d="M 138 128 Q 170 108 160 78 Q 150 56 118 58 Q 92 60 80 82" fill="none" stroke="#2B5FBA" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="4 4" class="gst-arrow-dash" opacity="0.85"></path><polygon points="76,82 86,78 84,88" fill="#2B5FBA" opacity="0.9"></polygon></g><g class="idle-drift"><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="100,70 110,64.5 110,142.5 100,148" fill="url(#gradSideFace-recovery)"></polygon><polygon points="42,70 100,70 100,148 42,148" fill="url(#gradFrontFace-recovery)"></polygon><polygon points="42,70 100,70 110,64.5 52,64.5" fill="url(#gradTopFace-recovery)"></polygon></g><g opacity="0.55"><rect x="50" y="82" width="36" height="3" rx="1.5" fill="#A9B4C7"></rect><rect x="50" y="90" width="28" height="3" rx="1.5" fill="#A9B4C7"></rect><rect x="50" y="100" width="40" height="2" rx="1" fill="#CDD5E2"></rect><rect x="50" y="106" width="34" height="2" rx="1" fill="#CDD5E2"></rect><rect x="50" y="112" width="38" height="2" rx="1" fill="#CDD5E2"></rect></g><g><circle cx="80" cy="132" r="9" fill="url(#gradAccentBlue-recovery)" stroke="#1E4A94" stroke-width="0.5"></circle><text x="80" y="136" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">¥</text></g></g><g><g transform="translate(0 0)"><path d="M 116 144 A 18 6 0 0 0 152 144 L 152 148 A 18 6 0 0 1 116 148 Z" fill="url(#gradAccentBlueSide-recovery)" stroke="#1E4A94" stroke-width="0.4" stroke-opacity="0.6"></path><ellipse cx="134" cy="144" rx="18" ry="6" fill="url(#gradAccentBlueTop-recovery)" stroke="#1E4A94" stroke-width="0.4" stroke-opacity="0.6"></ellipse><ellipse cx="134" cy="144" rx="13" ry="4.3" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="0.6"></ellipse></g><g transform="translate(0 -6)"><path d="M 116 144 A 18 6 0 0 0 152 144 L 152 148 A 18 6 0 0 1 116 148 Z" fill="url(#gradAccentBlueSide-recovery)" stroke="#1E4A94" stroke-width="0.4" stroke-opacity="0.6"></path><ellipse cx="134" cy="144" rx="18" ry="6" fill="url(#gradAccentBlueTop-recovery)" stroke="#1E4A94" stroke-width="0.4" stroke-opacity="0.6"></ellipse><ellipse cx="134" cy="144" rx="13" ry="4.3" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="0.6"></ellipse></g><g transform="translate(0 -12)"><path d="M 116 144 A 18 6 0 0 0 152 144 L 152 148 A 18 6 0 0 1 116 148 Z" fill="url(#gradAccentBlueSide-recovery)" stroke="#1E4A94" stroke-width="0.4" stroke-opacity="0.6"></path><ellipse cx="134" cy="144" rx="18" ry="6" fill="url(#gradAccentBlueTop-recovery)" stroke="#1E4A94" stroke-width="0.4" stroke-opacity="0.6"></ellipse><ellipse cx="134" cy="144" rx="13" ry="4.3" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="0.6"></ellipse></g></g><g transform="translate(108 92)"><g class="gst-coin-orbit"><ellipse cx="0" cy="2" rx="9" ry="3" fill="#1E4A94" opacity="0.25"></ellipse><path d="M -9 0 A 9 3 0 0 0 9 0 L 9 3 A 9 3 0 0 1 -9 3 Z" fill="url(#gradAccentBlueSide-recovery)"></path><ellipse cx="0" cy="0" rx="9" ry="3" fill="url(#gradAccentBlueTop-recovery)"></ellipse><text x="0" y="1.5" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="6" font-weight="700" fill="#FFFFFF">¥</text></g></g>`,
    value: `<defs><linearGradient id="gradTopFace-value" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"></stop><stop offset="100%" stop-color="#EAF0F8"></stop></linearGradient><linearGradient id="gradFrontFace-value" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F2F5FA"></stop><stop offset="100%" stop-color="#D5DCE8"></stop></linearGradient><linearGradient id="gradSideFace-value" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#C8D1DF"></stop><stop offset="100%" stop-color="#A9B4C7"></stop></linearGradient><linearGradient id="gradAccentBlueTop-value" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A7DD8"></stop><stop offset="100%" stop-color="#2B5FBA"></stop></linearGradient><linearGradient id="gradAccentBlue-value" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#3B6FC9"></stop><stop offset="100%" stop-color="#1E4A94"></stop></linearGradient><linearGradient id="gradAccentBlueSide-value" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2B5FBA"></stop><stop offset="100%" stop-color="#15396F"></stop></linearGradient><linearGradient id="gradAccentTeal-value" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4FC4BE"></stop><stop offset="100%" stop-color="#2BA8A1"></stop></linearGradient><filter id="softShadow-value" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2"></feGaussianBlur><feOffset dx="0" dy="2.5" result="off"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.22"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><ellipse cx="100" cy="172" rx="68" ry="6" fill="#15396F" opacity="0.09"></ellipse><g class="idle-drift"><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="96,80 110,72.3 110,140.3 96,148" fill="url(#gradSideFace-value)"></polygon><polygon points="34,80 96,80 96,148 34,148" fill="url(#gradFrontFace-value)"></polygon><polygon points="34,80 96,80 110,72.3 48,72.3" fill="url(#gradTopFace-value)"></polygon></g><line x1="65" y1="80" x2="65" y2="148" stroke="#A9B4C7" stroke-width="0.8" stroke-opacity="0.6"></line><rect x="42" y="100" width="46" height="22" rx="1.5" fill="#FFFFFF" opacity="0.85" stroke="#A9B4C7" stroke-width="0.5" stroke-opacity="0.5"></rect><rect x="46" y="105" width="26" height="2.5" rx="1" fill="#2B5FBA" opacity="0.8"></rect><rect x="46" y="111" width="38" height="2" rx="1" fill="#A9B4C7" opacity="0.8"></rect><rect x="46" y="116" width="30" height="2" rx="1" fill="#A9B4C7" opacity="0.8"></rect></g><g transform="translate(78 108)"><g class="tariff-cost-down"><rect x="0" y="0" width="22" height="28" rx="3" fill="url(#gradAccentTeal-value)" stroke="#2BA8A1" stroke-width="0.5" stroke-opacity="0.6"></rect><polyline points="6,10 11,16 16,10" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></polyline><line x1="11" y1="5" x2="11" y2="16" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"></line><line x1="5" y1="22" x2="17" y2="22" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" opacity="0.85"></line></g></g><g><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="162,68 172,62.5 172,132.5 162,138" fill="url(#gradSideFace-value)"></polygon><polygon points="108,68 162,68 162,138 108,138" fill="url(#gradFrontFace-value)"></polygon><polygon points="108,68 162,68 172,62.5 118,62.5" fill="url(#gradTopFace-value)"></polygon></g><rect x="114" y="78" width="42" height="6" rx="1.5" fill="url(#gradAccentBlue-value)"></rect><rect x="114" y="90" width="36" height="2.2" rx="1" fill="#A9B4C7" opacity="0.7"></rect><rect x="114" y="96" width="30" height="2.2" rx="1" fill="#A9B4C7" opacity="0.7"></rect><rect x="114" y="102" width="40" height="2.2" rx="1" fill="#A9B4C7" opacity="0.7"></rect><rect x="114" y="108" width="24" height="2.2" rx="1" fill="#A9B4C7" opacity="0.7"></rect></g><g transform="translate(150 132)"><g class="tariff-badge-pulse"><polygon points="-9,6 -14,22 -4,18 0,24 0,6" fill="#1E4A94"></polygon><polygon points="9,6 14,22 4,18 0,24 0,6" fill="#1E4A94"></polygon><circle r="13" fill="url(#gradAccentBlue-value)" stroke="#1E4A94" stroke-width="0.5"></circle><circle r="9" fill="none" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="0.8"></circle><polyline points="-4,0 -1,3 5,-3" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline></g></g>`,
    origin: `<defs><linearGradient id="gradTopFace-origin" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"></stop><stop offset="100%" stop-color="#EAF0F8"></stop></linearGradient><linearGradient id="gradFrontFace-origin" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F2F5FA"></stop><stop offset="100%" stop-color="#D5DCE8"></stop></linearGradient><linearGradient id="gradSideFace-origin" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#C8D1DF"></stop><stop offset="100%" stop-color="#A9B4C7"></stop></linearGradient><linearGradient id="gradAccentBlueTop-origin" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A7DD8"></stop><stop offset="100%" stop-color="#2B5FBA"></stop></linearGradient><linearGradient id="gradAccentBlue-origin" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#3B6FC9"></stop><stop offset="100%" stop-color="#1E4A94"></stop></linearGradient><linearGradient id="gradAccentBlueSide-origin" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2B5FBA"></stop><stop offset="100%" stop-color="#15396F"></stop></linearGradient><linearGradient id="gradAccentTeal-origin" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4FC4BE"></stop><stop offset="100%" stop-color="#2BA8A1"></stop></linearGradient><filter id="softShadow-origin" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2"></feGaussianBlur><feOffset dx="0" dy="2.5" result="off"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.22"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><ellipse cx="100" cy="172" rx="72" ry="6" fill="#15396F" opacity="0.09"></ellipse><path d="M 52 140 Q 100 100 148 140" fill="none" stroke="#2B5FBA" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="4 3" class="origin-route-dash" opacity="0.7"></path><g><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="68,130 76,125.6 76,145.6 68,150" fill="url(#gradSideFace-origin)"></polygon><polygon points="28,130 68,130 68,150 28,150" fill="url(#gradFrontFace-origin)"></polygon><polygon points="28,130 68,130 76,125.6 36,125.6" fill="url(#gradTopFace-origin)"></polygon></g><g stroke="#1E4A94" stroke-opacity="0.4" stroke-width="0.6" stroke-linejoin="round"><polygon points="60,104 66,100.7 66,126.7 60,130" fill="url(#gradAccentBlueSide-origin)"></polygon><polygon points="36,104 60,104 60,130 36,130" fill="url(#gradAccentBlue-origin)"></polygon><polygon points="36,104 60,104 66,100.7 42,100.7" fill="url(#gradAccentBlueTop-origin)"></polygon></g><rect x="50" y="92" width="6" height="14" fill="#1E4A94"></rect><circle cx="53" cy="88" r="2" fill="#CDD5E2" opacity="0.8"></circle><circle cx="56" cy="82" r="1.6" fill="#CDD5E2" opacity="0.6"></circle><g transform="translate(48 72)"><path d="M 0 0 C -5 0 -8 4 -8 8 C -8 14 0 22 0 22 C 0 22 8 14 8 8 C 8 4 5 0 0 0 Z" fill="url(#gradAccentTeal-origin)" stroke="#2BA8A1" stroke-width="0.5" stroke-opacity="0.6"></path><circle cx="0" cy="8" r="2.5" fill="#FFFFFF"></circle></g></g><g><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="172,130 180,125.6 180,145.6 172,150" fill="url(#gradSideFace-origin)"></polygon><polygon points="132,130 172,130 172,150 132,150" fill="url(#gradFrontFace-origin)"></polygon><polygon points="132,130 172,130 180,125.6 140,125.6" fill="url(#gradTopFace-origin)"></polygon></g><g stroke="#1E4A94" stroke-opacity="0.4" stroke-width="0.6" stroke-linejoin="round"><polygon points="164,104 170,100.7 170,126.7 164,130" fill="url(#gradAccentBlueSide-origin)"></polygon><polygon points="140,104 164,104 164,130 140,130" fill="url(#gradAccentBlue-origin)"></polygon><polygon points="140,104 164,104 170,100.7 146,100.7" fill="url(#gradAccentBlueTop-origin)"></polygon></g><rect x="154" y="92" width="6" height="14" fill="#1E4A94"></rect><g transform="translate(152 72)"><path d="M 0 0 C -5 0 -8 4 -8 8 C -8 14 0 22 0 22 C 0 22 8 14 8 8 C 8 4 5 0 0 0 Z" fill="url(#gradAccentTeal-origin)" stroke="#2BA8A1" stroke-width="0.5" stroke-opacity="0.6"></path><circle cx="0" cy="8" r="2.5" fill="#FFFFFF"></circle></g></g><g class="origin-package-slide"><g transform="translate(100 128)"><ellipse cx="0" cy="14" rx="14" ry="2.5" fill="#1E4A94" opacity="0.15"></ellipse><g transform="translate(-14 -14)"><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="28,0 34,-3.3000000000000003 34,20.7 28,24" fill="url(#gradSideFace-origin)"></polygon><polygon points="0,0 28,0 28,24 0,24" fill="url(#gradFrontFace-origin)"></polygon><polygon points="0,0 28,0 34,-3.3000000000000003 6,-3.3000000000000003" fill="url(#gradTopFace-origin)"></polygon></g><rect x="12" y="0" width="4" height="24" fill="#2B5FBA" opacity="0.55"></rect><rect x="4" y="6" width="8" height="5" rx="1" fill="#2BA8A1" opacity="0.85"></rect></g></g></g><polygon points="146,140 138,135 138,145" fill="#2B5FBA" opacity="0.75"></polygon>`,
    control: `<defs><linearGradient id="gradTopFace-control" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFFFF"></stop><stop offset="100%" stop-color="#EAF0F8"></stop></linearGradient><linearGradient id="gradFrontFace-control" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F2F5FA"></stop><stop offset="100%" stop-color="#D5DCE8"></stop></linearGradient><linearGradient id="gradSideFace-control" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#C8D1DF"></stop><stop offset="100%" stop-color="#A9B4C7"></stop></linearGradient><linearGradient id="gradAccentBlueTop-control" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4A7DD8"></stop><stop offset="100%" stop-color="#2B5FBA"></stop></linearGradient><linearGradient id="gradAccentBlue-control" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#3B6FC9"></stop><stop offset="100%" stop-color="#1E4A94"></stop></linearGradient><linearGradient id="gradAccentBlueSide-control" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#2B5FBA"></stop><stop offset="100%" stop-color="#15396F"></stop></linearGradient><linearGradient id="gradAccentTeal-control" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4FC4BE"></stop><stop offset="100%" stop-color="#2BA8A1"></stop></linearGradient><filter id="softShadow-control" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2"></feGaussianBlur><feOffset dx="0" dy="2.5" result="off"></feOffset><feComponentTransfer><feFuncA type="linear" slope="0.22"></feFuncA></feComponentTransfer><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><ellipse cx="100" cy="172" rx="70" ry="6" fill="#15396F" opacity="0.09"></ellipse><g class="idle-drift"><g stroke="#8995AB" stroke-opacity="0.35" stroke-width="0.6" stroke-linejoin="round"><polygon points="162,60 174,53.4 174,149.4 162,156" fill="url(#gradSideFace-control)"></polygon><polygon points="32,60 162,60 162,156 32,156" fill="url(#gradFrontFace-control)"></polygon><polygon points="32,60 162,60 174,53.4 44,53.4" fill="url(#gradTopFace-control)"></polygon></g><rect x="42" y="70" width="110" height="8" rx="1.5" fill="url(#gradAccentBlue-control)" opacity="0.9"></rect><circle cx="48" cy="74" r="1.5" fill="#FFFFFF" opacity="0.8"></circle><circle cx="54" cy="74" r="1.5" fill="#FFFFFF" opacity="0.8"></circle><circle cx="60" cy="74" r="1.5" fill="#FFFFFF" opacity="0.8"></circle><rect x="42" y="84" width="110" height="4" rx="1" fill="#CDD5E2" opacity="0.6"></rect><g><rect x="46" y="92" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="47.5" y="94" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="59" y="92" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="60.5" y="94" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="72" y="92" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="73.5" y="94" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="85" y="92" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="86.5" y="94" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="98" y="92" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="99.5" y="94" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="46" y="102" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="47.5" y="104" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="59" y="102" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="60.5" y="104" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="72" y="102" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="73.5" y="104" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="85" y="102" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="86.5" y="104" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="98" y="102" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="99.5" y="104" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="46" y="112" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="47.5" y="114" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="59" y="112" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="60.5" y="114" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="72" y="112" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="73.5" y="114" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="85" y="112" width="11" height="8" rx="1.2" fill="none" opacity="1"></rect></g><g><rect x="98" y="112" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="99.5" y="114" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="46" y="122" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="47.5" y="124" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="59" y="122" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="60.5" y="124" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="72" y="122" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="73.5" y="124" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="85" y="122" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="86.5" y="124" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g><rect x="98" y="122" width="11" height="8" rx="1.2" fill="#CDD5E2" opacity="0.75"></rect><rect x="99.5" y="124" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.6"></rect></g><g class="anomaly-outlier-glow"><rect x="83" y="110" width="15" height="12" rx="2" fill="#2BA8A1" opacity="0.25"></rect><rect x="85" y="112" width="11" height="8" rx="1.2" fill="#2BA8A1" stroke="#2BA8A1" stroke-width="0.6"></rect><rect x="86.5" y="114" width="8" height="2" rx="0.5" fill="#FFFFFF" opacity="0.9"></rect></g><g transform="translate(42 140)"><rect x="0" y="6" width="7" height="10" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="10" y="0" width="7" height="16" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="20" y="8" width="7" height="8" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="30" y="-4" width="7" height="20" rx="1" fill="#2BA8A1" opacity="0.9"></rect><rect x="40" y="4" width="7" height="12" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="50" y="2" width="7" height="14" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="60" y="-2" width="7" height="18" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="70" y="5" width="7" height="11" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="80" y="1" width="7" height="15" rx="1" fill="#2B5FBA" opacity="0.55"></rect><rect x="90" y="7" width="7" height="9" rx="1" fill="#2B5FBA" opacity="0.55"></rect></g></g><g class="anomaly-scan-sweep" style="transform-box: fill-box;"><rect x="98" y="60" width="4" height="96" fill="url(#gradAccentBlue-control)" opacity="0.15"></rect><line x1="100" y1="60" x2="100" y2="156" stroke="#2B5FBA" stroke-width="1.2" opacity="0.9"></line></g><g transform="translate(150 58)"><circle r="14" fill="#FFFFFF" fill-opacity="0.55" stroke="url(#gradAccentBlue-control)" stroke-width="3"></circle><circle r="14" fill="none" stroke="#1E4A94" stroke-width="0.5" opacity="0.5"></circle><line x1="10" y1="10" x2="22" y2="22" stroke="url(#gradAccentBlue-control)" stroke-width="4.5" stroke-linecap="round"></line><line x1="10" y1="10" x2="22" y2="22" stroke="#1E4A94" stroke-width="1" stroke-linecap="round" opacity="0.5"></line><circle cx="-4" cy="-4" r="3" fill="#FFFFFF" opacity="0.55"></circle></g><g transform="translate(42 52)"><g class="anomaly-check-draw"><path d="M 0 0 L 10 -3 L 20 0 L 20 8 C 20 14 10 20 10 20 C 10 20 0 14 0 8 Z" fill="url(#gradAccentTeal-control)" stroke="#2BA8A1" stroke-width="0.5" stroke-opacity="0.6"></path><polyline points="5,8 9,12 15,5" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline></g></g>`
  };
  const badgeSvg = kind =>
    `<svg viewBox="0 0 200 200" fill="none" aria-hidden="true">${BADGE_ICON[kind]}</svg>`;

  /* The four-step improvement loop, named once so the hero animation and
     the Result section's own loop can never drift apart. */
  const loopSteps = l => [
    [T(l, '가설 설정', 'Set hypothesis', '仮説設定'),
      T(l, '비용 발생 원인 · 개선 기회', 'Cost driver · improvement opportunity', '費用要因・改善機会')],
    [T(l, 'BI 검증', 'Verify in BI', 'BIで検証'),
      T(l, '동일 집계 기준 · 비교 결과', 'Same aggregation basis · comparison', '同一集計基準・比較結果')],
    [T(l, '운영 변경', 'Change operations', '運用変更'),
      T(l, '요건 · 담당자 · 시스템 또는 업무 변경', 'Requirements · owner · system or process change', '要件・担当・システムまたは業務の変更')],
    [T(l, '결과 확인', 'Verify results', '結果確認'),
      T(l, '목표 대비 효과 · 예외 · 후속 조치', 'Effect vs target · exceptions · follow-up', '目標比の効果・例外・後続対応')]
  ];

  /* a labelled track row inside an .ev-scale grid */
  const scaleRow = (label, bars, i) =>
    `<span data-ev style="--i:${i}">${esc(label)}</span>` +
    `<div class="ev-track" data-ev style="--i:${i}">${bars}</div>`;

  const bar = (from, to, cls = '', label = '') =>
    `<div class="ev-bar ${cls}" data-grow style="left:${from}%;width:${Math.max(to - from, 1)}%">` +
    (label ? `<b>${esc(label)}</b>` : '') + '</div>';

  const fixedLine = (at, label) =>
    `<div class="ev-fixed-wrap"><div class="ev-fixed" style="left:${at}%">` +
    `<span>${esc(label)}</span></div></div>`;

  /* ------------------------------------------------------------------ *
   * Trade · Situation — every project rebuilt the numbers
   * ------------------------------------------------------------------ */
  function fragment(d, l) {
    const lanes = [
      {
        team: T(l, 'A부서', 'Team A', 'A部門'),
        steps: [
          T(l, '사내 BI에서 수작업 쿼리', 'Manual query in the BI tool', '社内BIで手動クエリ'),
          T(l, '추출 결과를 엑셀로 이동', 'Copy the extract into Excel', '抽出結果をExcelへ'),
          T(l, '엑셀 함수로 비용 정리', 'Assemble costs with Excel formulas', 'Excel式で費用を集計'),
          T(l, '기간·배분 기준 A', 'Period and allocation basis A', '期間・配賦基準 A')
        ]
      },
      {
        team: T(l, 'B부서', 'Team B', 'B部門'),
        steps: [
          T(l, '부서 데이터베이스에서 쿼리', 'Query the team database', '部門DBでクエリ'),
          T(l, '데이터베이스 안에서 비용 계산', 'Calculate cost inside the database', 'DB内で費用計算'),
          T(l, '결과를 엑셀로 출력', 'Export the result to Excel', '結果をExcelへ出力'),
          T(l, '기간·배분 기준 B', 'Period and allocation basis B', '期間・配賦基準 B')
        ]
      }
    ];

    const diff = [
      [T(l, '기간 범위', 'Period range', '期間範囲'),
        T(l, '수입 통관일 기준', 'By customs clearance date', '通関日基準'),
        T(l, '회계 계상월 기준', 'By accounting month', '計上月基準'), true],
      [T(l, '포함 비용', 'Included costs', '対象費用'),
        T(l, '운임 · 관세', 'Freight · duty', '運賃・関税'),
        T(l, '운임 · 관세 · 취급수수료', 'Freight · duty · handling', '運賃・関税・取扱手数料'), true],
      [T(l, '배분 기준', 'Allocation basis', '配賦基準'),
        T(l, '금액 비중', 'By value share', '金額比率'),
        T(l, '수량 비중', 'By quantity share', '数量比率'), true],
      [T(l, '품목 단위 비용 (지수)', 'Cost per item (index)', '品目別費用（指数）'),
        '100', '112', true]
    ];

    return fig('fragment',
      head(
        T(l, '같은 거래, 두 가지 계산 경로', 'One transaction, two calculation paths', '同じ取引・二つの算定経路'),
        T(l, '도구의 차이가 아니라, 비교 가능한 공통 숫자의 부재.',
          'The problem was not different tools. There was no comparable number.',
          '問題は道具の違いではなく、比較可能な共通の数値がなかったこと。')
      ) +
      `<div class="ev-lanes">${lanes.map((lane, i) => `
        <div class="ev-lane" data-ev style="--i:${i * 2}">
          <h4>${esc(lane.team)}</h4>
          <ol>${lane.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
        </div>`).join('')}</div>` +
      `<div class="ev-block">
        <p class="ev-h" data-ev style="--i:4">${esc(T(l,
          '동일한 가상 거래를 계산한 결과', 'The same illustrative transaction, calculated twice',
          '同一の架空取引を計算した結果'))}</p>
        <div class="ev-tbl-wrap" data-ev style="--i:5"><table class="ev-tbl">
          <thead><tr>
            <th scope="col">${esc(T(l, '계산 정의', 'Definition', '算定定義'))}</th>
            <th scope="col">${esc(lanes[0].team)}</th>
            <th scope="col">${esc(lanes[1].team)}</th>
          </tr></thead>
          <tbody>${diff.map(r => `<tr>
            <th scope="row">${esc(r[0])}</th>
            <td class="${r[3] ? 'is-diff' : ''}">${esc(r[1])}</td>
            <td class="${r[3] ? 'is-diff' : ''}">${esc(r[2])}</td>
          </tr>`).join('')}</tbody>
        </table></div>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Trade · Task — one foundation, with named ownership
   * ------------------------------------------------------------------ */
  function platform(d, l) {
    const v = d.visual.platform;
    const layers = [
      {
        title: T(l, '부서별 요구와 데이터', 'Departmental needs and data', '部門ごとの要求とデータ'),
        body: T(l, 'A부서 BI · B부서 데이터베이스 · 그 밖의 부서 수요',
          'Team A BI · Team B database · other departmental needs',
          'A部門BI・B部門DB・その他部門の要望')
      },
      {
        core: true,
        title: T(l, '공통 계산 로직 · 데이터 검증 · KPI 정의',
          'Common calculation logic · validation · KPI definitions',
          '共通算定ロジック・データ検証・KPI定義'),
        body: [v[1], v[2], v[4]].join(' · ')
      },
      {
        title: T(l, 'Power BI 분석 · 과제 실행 · 결과 측정',
          'Power BI analysis · initiative delivery · measured results',
          'Power BI分析・施策実行・効果測定'),
        body: T(l, '같은 정의 위에서 기회 발굴, 운영 변경, 효과 확인까지.',
          'Find opportunities, change operations and verify effects on one definition.',
          '同じ定義の上での機会発見・運用変更・効果確認。')
      }
    ];

    const owners = [
      [T(l, 'BI 관리자', 'BI owner', 'BI管理者'),
        T(l, '모델 · 변경 관리', 'Model and change control', 'モデル・変更管理')],
      [T(l, '업무 담당자', 'Business owner', '業務担当'),
        T(l, 'KPI · 목표 · 실행 과제 정의', 'KPI, target and action definitions', 'KPI・目標・施策の定義')],
      [T(l, '관련 전문 부서', 'Specialist functions', '専門部門'),
        T(l, '규제 · 세무 조건 검토', 'Regulatory and tax condition review', '規制・税務条件の検証')]
    ];

    return fig('platform',
      head(
        T(l, '분산된 계산을 하나의 기반으로', 'From scattered calculations to one foundation', '分散した算定を一つの基盤へ'),
        T(l, '표준화 대상은 도구가 아니라 계산 정의와 그 관리 책임.',
          'What was standardised is the definition and its ownership, not the tool.',
          '標準化したのは道具ではなく、算定定義とその管理責任。')
      ) +
      `<div class="ev-stack">${layers.map((x, i) => (i ? '<div class="ev-down" data-ev style="--i:' + i + '">↓</div>' : '') +
        `<div class="ev-layer ${x.core ? 'is-core' : ''}" data-ev style="--i:${i}">
          <h4>${esc(x.title)}</h4><p>${esc(x.body)}</p>
        </div>`).join('')}</div>` +
      `<div class="ev-owners">
        <p class="ev-h" data-ev style="--i:4">${esc(T(l, '운영 책임', 'Operating ownership', '運用責任'))}</p>
        ${owners.map((o, i) => `<div data-ev style="--i:${5 + i}">
          <strong>${esc(o[0])}</strong><span>${esc(o[1])}</span></div>`).join('')}
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Trade · Result — the improvement loop, and what each case produced
   * ------------------------------------------------------------------ */
  function costResult(d, l) {
    const v = d.visual['cost-result'];
    const c = d.visual.controls;

    const steps = loopSteps(l);

    /* each applied case, paired with the published outcome for that case */
    const cases = [
      [T(l, '관세·부가세 환급', 'Duty / VAT Recovery', '関税・付加価値税還付'), v[0], v[1]],
      [T(l, '상품 가치 재산정', 'Product Value Allocation', '商品価値の再評価'), v[2], v[3]],
      [T(l, '조달 원산지', 'Sourcing Origin', '調達原産地'), v[4], v[5]],
      [T(l, '이상치·준수 관리', 'Anomaly / Compliance Control', '異常値・遵守管理'), c[4], c[5]]
    ];
    /* digit count of each published figure (language-independent); the last
       case is a qualitative outcome, not an amount, so it stays unmasked */
    const digitsByCase = [9, 8, 8, null];
    const iconByCase = ['recovery', 'value', 'origin', 'control'];
    const figureFor = i => digitsByCase[i]
      ? `<strong>${esc(orderOfMagnitude(digitsByCase[i], l))}</strong>`
      : `<strong>${esc(cases[i][1])}</strong>`;

    return fig('cost-result',
      head(
        T(l, '한 번의 분석이 아니라 반복되는 개선 구조', 'Not one analysis — a repeatable improvement loop', '単発の分析ではなく反復する改善構造'),
        T(l, '적용 분야를 선택하면 해당 사례의 네 단계와 공개 가능한 결과를 표시.',
          'Select an applied case to see the four steps it ran through and its published outcome.',
          '適用分野を選ぶと、その事例の4段階と公開可能な結果を表示。')
      ) +
      `<div class="ev-chips" data-ev style="--i:0" role="group">${cases.map((x, i) =>
        `<button type="button" data-ev-case="${i}" aria-pressed="${i === 0}">${esc(x[0])}</button>`).join('')}</div>` +
      `<div class="ev-block">
        <div class="ev-steps is-flow">${steps.map((s, i) => `
          <div class="ev-step ${i === 3 ? 'is-last' : ''}" data-ev style="--i:${i + 1}">
            <i>0${i + 1}</i><strong>${esc(s[0])}</strong><span>${esc(s[1])}</span>
          </div>`).join('')}</div>
        <p class="ev-return" data-ev style="--i:5">↺ ${esc(T(l,
          '결과를 다음 가설의 기준으로 갱신.', 'Results update the baseline for the next hypothesis.',
          '結果による次の仮説の基準更新。'))}</p>
      </div>` +
      `<div class="ev-block">
        <p class="ev-h" data-ev style="--i:6">${esc(T(l,
          '공개 가능한 결과 · 성격이 다르므로 합산하지 않음',
          'Published outcomes · different in kind, so not summed',
          '公開可能な結果 · 性質が異なるため合算しない'))}</p>
        <div class="ev-outcome-grid">
          <div class="ev-badges" data-ev style="--i:7">${cases.map((x, i) => `
            <div class="ev-badge" data-ev-badge="${i}" ${i ? 'hidden' : ''}>
              ${badgeSvg(iconByCase[i])}
              ${figureFor(i)}
              <span>${esc(x[2])}</span>
            </div>`).join('')}</div>
          <div class="ev-kv">${cases.map((x, i) => `
            <div data-ev style="--i:${8 + i}" data-ev-outcome="${i}">
              <span>${esc(x[2])}</span>${figureFor(i)}
            </div>`).join('')}</div>
        </div>
        <p class="ev-sub" data-ev style="--i:12;margin-top:12px">${esc(v[6] + ' · ' + v[7])}</p>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Situation — one fixed date, two versions of readiness
   * ------------------------------------------------------------------ */
  function risks(d, l) {
    const planned = [
      [T(l, '계약 · 예산', 'Contract / budget', '契約・予算'), 2, 26],
      [T(l, '현장 준비', 'Site readiness', '現場準備'), 20, 48],
      [T(l, '협력사 확정', 'Partners confirmed', '協力会社確定'), 40, 64],
      [T(l, '테스트 · 전환', 'Test / cutover', 'テスト・切替'), 60, 84]
    ];
    const actual = [
      [T(l, '계약 · 예산', 'Contract / budget', '契約・予算'), 2, 78, 'open',
        T(l, '기준 미확정 상태에서 집행 진행', 'Unresolved while spending continued', '未確定のまま支出が進行')],
      [T(l, '현장 준비', 'Site readiness', '現場準備'), 20, 80, 'open',
        T(l, '전원 · 배선 · 환기 요건 미충족', 'Power, cabling and ventilation gaps', '電源・配線・換気が未充足')],
      [T(l, '협력사 확정', 'Partners confirmed', '協力会社確定'), 40, 74, 'open',
        T(l, '단가 · 물량 이견', 'Rate and volume disputes', '単価・物量の相違')],
      [T(l, '테스트 · 전환', 'Test / cutover', 'テスト・切替'), 78, 84, 'risk',
        T(l, '작업 정의 · 의존 관계 미정', 'Work and dependencies undefined', '作業定義・依存関係が未定')]
    ];
    const launch = T(l, '고정 가동일', 'Fixed launch', '固定稼働日');

    return fig('risks',
      head(
        T(l, '움직일 수 없는 가동일 위의 두 가지 준비 상태',
          'Two versions of readiness against a date that could not move',
          '動かせない稼働日に対する二つの準備状態'),
        T(l, '같은 시간축에서 드러나는 문제의 본질 — 남은 여유가 아니라 확정되지 않은 구간.',
          'On one time axis the problem is visible: not the remaining margin, but the unresolved span.',
          '同じ時間軸で見えてくる問題の本質 — 残余の余裕ではなく未確定の区間。')
      ) +
      `<div class="ev-block">
        <p class="ev-h" data-ev>${esc(T(l, '준비가 선행되는 정상 순서', 'Preparation sequence as planned', '準備が先行する正常な順序'))}</p>
        <div class="ev-scale">${fixedLine(84, launch) +
          planned.map((r, i) => scaleRow(r[0], bar(r[1], r[2], 'is-strong'), i)).join('')}</div>
      </div>` +
      `<div class="ev-block">
        <p class="ev-h" data-ev style="--i:4">${esc(T(l, '인수 시점에 드러난 상태', 'Readiness found at handover', '引継ぎ時点で判明した状態'))}</p>
        <div class="ev-scale">${fixedLine(84, launch) +
          actual.map((r, i) => scaleRow(r[0], bar(r[1], r[2], r[3] === 'open' ? 'is-open' : 'is-risk'), i + 4)).join('')}</div>
        <div class="ev-kv" style="margin-top:14px">${actual.map((r, i) => `
          <div data-ev style="--i:${8 + i}"><span>${esc(r[0])}</span><strong>${esc(r[4])}</strong></div>`).join('')}</div>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Task — parallel work, one launch decision
   * ------------------------------------------------------------------ */
  function scope(d, l) {
    const v = d.visual.scope;
    const lanes = [
      T(l, '운영 준비', 'Operational readiness', '運用準備'),
      T(l, 'ERP · 설비 통합', 'ERP / equipment integration', 'ERP・設備統合'),
      T(l, '준수 요건', 'Compliance requirements', '遵守要件')
    ];
    const axes = [
      [T(l, '범위', 'Scope', '範囲'),
        T(l, '가동 필수 / 후속 개선', 'Launch-critical / follow-on', '稼働必須／後続改善')],
      [T(l, '예산', 'Budget', '予算'),
        T(l, '확정 / 추가 요청 / 조정 여지', 'Committed / additional request / offset room', '確定／追加要求／調整余地')],
      [T(l, '결정', 'Decision', '決定'),
        T(l, '실무 확인 / 전문가 검증 / 승인권자 판단', 'Team check / specialist validation / approver', '実務確認／専門家検証／承認者判断')]
    ];

    return fig('scope',
      head(
        T(l, '병행하는 세 갈래와, 그 모두가 통과해야 하는 하나의 판단',
          'Three parallel workstreams, one decision they all have to clear',
          '並行する三つの流れと、全てが通過すべき一つの判断'),
        T(l, '통합한 것은 작업 목록이 아니라, 가동 여부를 판단하기 위한 완료 조건·예산 영향·승인 경로.',
          'What was integrated was not a task list, but the completion conditions, budget impact and approval path behind the launch decision.',
          '統合したのは作業一覧ではなく、稼働可否を判断するための完了条件・予算影響・承認経路。')
      ) +
      `<div class="ev-gate">
        <div class="ev-gate-lanes">${lanes.map((x, i) =>
        `<div data-ev style="--i:${i}">${esc(x)}</div>`).join('')}</div>
        <div class="ev-gate-mark" data-ev style="--i:3">${esc(T(l, '가동 판단', 'Launch decision', '稼働判断'))}</div>
        <div class="ev-after" data-ev style="--i:4">
          <strong>${esc(v[4])}</strong>${esc(v[6])}
        </div>
      </div>` +
      `<div class="ev-owners">
        <p class="ev-h" data-ev style="--i:5">${esc(T(l, '판단을 위한 세 가지 관리 축', 'Three axes behind the decision', '判断のための三つの管理軸'))}</p>
        ${axes.map((o, i) => `<div data-ev style="--i:${6 + i}">
          <strong>${esc(o[0])}</strong><span>${esc(o[1])}</span></div>`).join('')}
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Result — continuity, then the exposure index
   * ------------------------------------------------------------------ */
  function result(d, l) {
    const v = d.visual.result;
    const stages = [
      T(l, '이전 전', 'Before the move', '移行前'),
      T(l, '컷오버', 'Cutover', '切替'),
      T(l, '안정화', 'Stabilised', '安定化')
    ];
    const judgements = [
      T(l, '가동 필수 범위 보호', 'Protected the launch-critical scope', '稼働必須範囲を保護'),
      T(l, '계약·사양의 계산 기준 정렬', 'Aligned the calculation basis in contracts and specifications', '契約・仕様の算定基準を整合'),
      T(l, '지연·추가 요구의 조기 결정', 'Decided on delays and additional requests early', '遅延・追加要求を早期に決定')
    ];

    const line = `<svg viewBox="0 0 620 96" role="img" aria-label="${esc(T(l,
      '이전 전부터 안정화까지 끊기지 않는 출하 연속성을 나타낸 개념 선',
      'Conceptual line showing uninterrupted shipping from before the move through stabilisation',
      '移行前から安定化まで途切れない出荷継続を示す概念線'))}">
      <path d="M14 58H606" stroke="var(--ok)" stroke-width="2.5" fill="none"/>
      ${[14, 310, 606].map((x, i) => `<circle cx="${x}" cy="58" r="5" fill="var(--ok)"/>
        <text x="${x === 14 ? x : x === 606 ? x : x}" y="84" text-anchor="${i === 0 ? 'start' : i === 2 ? 'end' : 'middle'}">${esc(stages[i])}</text>`).join('')}
      <text x="14" y="26" class="is-key">${esc(v[0] + ' · ' + v[1])}</text>
    </svg>`;

    return fig('result',
      head(
        T(l, '성격이 다른 두 가지 결과, 서로 다른 방식으로 표시',
          'Two results of different kinds, shown differently',
          '性質の異なる二つの結果、異なる形での表示'),
        T(l, '출하 연속성은 일별 실적이 아니라 중단 여부를 설명하는 개념선이고, 예산 결과는 지수 비교.',
          'Continuity is a concept line about interruption, not daily volume. The budget result is an index comparison.',
          '出荷継続は日次実績ではなく中断有無を示す概念線、予算結果は指数比較。')
      ) +
      `<div class="ev-block" data-ev>
        <p class="ev-h">${esc(T(l, '운영 결과 · 연속성', 'Operating result · continuity', '運用結果・継続性'))}</p>
        <div class="ev-continuity">${line}</div>
      </div>` +
      `<div class="ev-block">
        <p class="ev-h" data-ev style="--i:2">${esc(T(l, '예산 결과 · 추가 예산 리스크 지수', 'Budget result · additional exposure index', '予算結果・追加予算リスク指数'))}</p>
        <div class="ev-scale">
          ${scaleRow(T(l, '초기 리스크 (지수)', 'Initial exposure (index)', '当初リスク（指数）'), bar(0, 100, 'is-ghost', '100'), 2)}
          ${scaleRow(T(l, '검토 후 (지수)', 'After review (index)', '検証後（指数）'), bar(0, 60, 'is-strong', '60'), 3)}
        </div>
        <div class="ev-figure" data-ev style="--i:4">
          <strong>−${esc(String(v[2]).replace(/[%％]/g, ''))}</strong><em>%</em>
        </div>
        <span class="ev-type" data-ev style="--i:4">${esc(v[3])}</span>
      </div>` +
      `<div class="ev-block">
        <p class="ev-h" data-ev style="--i:5">${esc(T(l, '결과를 만든 판단', 'The decisions behind the result', '結果を生んだ判断'))}</p>
        <div class="ev-kv">${judgements.map((j, i) => `
          <div data-ev style="--i:${6 + i}"><span>0${i + 1}</span><strong>${esc(j)}</strong></div>`).join('')}</div>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Action, card 1 — integrated schedule and the review cycle
   * ------------------------------------------------------------------ */
  const GANTT = [
    ['site', 2, 20], ['commercial', 6, 28], ['power', 20, 44], ['equipment', 30, 56],
    ['interface', 38, 64], ['test', 60, 78], ['cutover', 78, 84], ['followon', 86, 100]
  ];
  const GANTT_LABEL = (l, k) => T(l,
    { site: '현장 요건', commercial: '계약 정렬', power: '전원 · 네트워크', equipment: '설비 작업', interface: '인터페이스 매핑', test: '통합 테스트', cutover: '전환', followon: '후속 개선' }[k],
    { site: 'Site requirements', commercial: 'Commercial alignment', power: 'Network & power', equipment: 'Equipment work', interface: 'Interface mapping', test: 'Integration test', cutover: 'Cutover', followon: 'Follow-on' }[k],
    { site: '現場要件', commercial: '契約整合', power: '電源・回線', equipment: '設備作業', interface: 'IF マッピング', test: '統合テスト', cutover: '切替', followon: '後続改善' }[k]);

  /* scenario -> per-task shift, applied to the task and everything after it */
  const SCENARIOS = {
    base: {},
    infra: { power: 12, equipment: 10, interface: 10, test: 9, cutover: 9 },
    validation: { test: 8, cutover: 8 }
  };

  function ganttRows(l, key) {
    const shift = SCENARIOS[key] || {};
    const launch = 84;
    return GANTT.map((t, i) => {
      const dx = shift[t[0]] || 0;
      const from = t[1] + dx, to = t[2] + dx;
      const late = to > launch && t[0] !== 'followon';
      return scaleRow(GANTT_LABEL(l, t[0]), bar(from, Math.min(to, 108), late ? 'is-risk' : 'is-strong'), i);
    }).join('');
  }

  function deliveryPlan(d, l) {
    const cad = d.visual.cadence;
    return `<div class="ev ev-inline">
      ${head(T(l, '의존 관계를 가진 통합 일정', 'One integrated schedule with dependencies', '依存関係を含む統合日程'),
      T(l, '상황 선택에 따라 후속 작업이 이동하고, 가동일을 넘는 작업은 적색으로 표시되는 가상 시뮬레이션.',
        'Pick a situation: downstream work moves, and anything crossing the launch date turns red. This is an illustrative simulation.',
        '状況の選択に応じて後続作業が移動し、稼働日を超える作業は赤で表示される架空のシミュレーション。'))}
      <div class="ev-scale" data-ev-gantt>${fixedLine(84, T(l, '고정 가동일', 'Fixed launch', '固定稼働日')) + ganttRows(l, 'base')}</div>
      <div class="ev-scenarios">
        <button type="button" data-ev-scenario="infra" aria-pressed="false">${esc(T(l, '인프라 작업 지연', 'Infrastructure delay', 'インフラ遅延'))}</button>
        <button type="button" data-ev-scenario="validation" aria-pressed="false">${esc(T(l, '추가 검증 작업 발생', 'Additional validation', '追加検証の発生'))}</button>
        <button type="button" data-ev-scenario="base" aria-pressed="true">${esc(T(l, '기준 계획으로 복원', 'Reset to baseline', '基準計画へ復元'))}</button>
      </div>
      <div class="ev-impact"><dl data-ev-impact>
        <div><dt>${esc(T(l, '영향 받는 작업', 'Work affected', '影響を受ける作業'))}</dt><dd data-k="tasks">—</dd></div>
        <div><dt>${esc(T(l, '결정이 필요한 범위', 'Decision needed on', '決定が必要な範囲'))}</dt><dd data-k="decision">—</dd></div>
        <div><dt>${esc(T(l, '대응 선택지', 'Options', '対応選択肢'))}</dt><dd data-k="options">—</dd></div>
      </dl></div>
      <p class="ev-cadence">${esc(cad[0] + ' · ' + cad[1] + ' / ' + cad[2] + ' · ' + cad[3] + ' / ' + cad[4] + ' · ' + cad[5])}</p>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Action, card 2 — two negotiations, two kinds of evidence
   * ------------------------------------------------------------------ */
  function commercial(d, l) {
    const cost = [
      [T(l, '인원', 'Staffing', '人員'),
        T(l, '상시 인원 기준', 'Standing headcount', '常時人員基準'),
        T(l, '범위 · 투입 기준 정렬', 'Aligned scope and deployment basis', '範囲・投入基準を整合'), true],
      [T(l, '작업량', 'Workload', '作業量'),
        T(l, '피크 기준 추정', 'Estimated at peak', 'ピーク基準の推定'),
        T(l, '계산 대상 · 단위 정렬', 'Aligned unit and covered scope', '対象・単位を整合'), true],
      [T(l, '작업 단가', 'Rate', '単価'),
        T(l, '단일 단가 적용', 'One flat rate', '単一単価'),
        T(l, '적용 조건 정렬', 'Aligned application conditions', '適用条件を整合'), true],
      [T(l, '불확정 부분', 'Uncertain items', '不確定部分'),
        T(l, '사전 확정 요구', 'Fix in advance', '事前確定を要求'),
        T(l, '가동 후 실제 비용으로 재검토', 'Reviewed against actual cost after launch', '稼働後の実績で再検討'), false]
    ];

    const months = [62, 58, 70, 84, 92, 76, 54, 48, 57, 73, 88, 95];
    const commit = 70;
    const pts = months.map((v, i) => `${20 + i * 52},${118 - v * 0.82}`).join(' ');

    const volume = `<svg viewBox="0 0 620 150" role="img" aria-label="${esc(T(l,
      '월별 물량이 계절성에 따라 변동하며 일부 달은 약정 수준을 밑도는 가상 곡선',
      'Illustrative curve of monthly volume varying with seasonality, below the commitment level in some months',
      '月次物量が季節性により変動し、一部の月が約定水準を下回る架空の曲線'))}">
      <line x1="20" y1="${118 - commit * 0.82}" x2="600" y2="${118 - commit * 0.82}"
        stroke="var(--risk)" stroke-dasharray="5 4" stroke-width="1.5"/>
      <text x="600" y="${118 - commit * 0.82 - 7}" text-anchor="end" fill="var(--risk)">${esc(T(l, '약정 수준', 'Commitment level', '約定水準'))}</text>
      <polyline points="${pts}" fill="none" stroke="var(--data)" stroke-width="2.5"/>
      ${months.map((v, i) => `<circle cx="${20 + i * 52}" cy="${118 - v * 0.82}" r="3" fill="${v < commit ? 'var(--risk)' : 'var(--data)'}"/>`).join('')}
      <text x="20" y="140">01</text><text x="600" y="140" text-anchor="end">12</text>
    </svg>`;

    return `<div class="ev ev-inline">
      ${head(T(l, '창고 운영업체 · 단가 구조', 'Warehouse operator · cost structure', '倉庫運営業者・単価構造'),
      T(l, '단가 협상이 아니라 계산 전제를 맞추는 작업.',
        'Not a discount negotiation — aligning calculation premises.',
        '値下げ交渉ではなく、算定前提を揃える作業。'))}
      <div class="ev-tbl-wrap ev-tbl-tight" data-ev><table class="ev-tbl">
        <thead><tr>
          <th scope="col">${esc(T(l, '비용 요소', 'Cost element', '費用要素'))}</th>
          <th scope="col">${esc(T(l, '업체의 계산 전제', "Supplier's premise", '業者の算定前提'))}</th>
          <th scope="col">${esc(T(l, '조정한 정의', 'Agreed definition', '調整後の定義'))}</th>
        </tr></thead>
        <tbody>${cost.map(r => `<tr>
          <th scope="row">${esc(r[0])}</th>
          <td class="${r[3] ? 'is-diff' : ''}">${esc(r[1])}</td>
          <td>${esc(r[2])}</td>
        </tr>`).join('')}</tbody>
      </table></div>
      <div class="ev-block">
        ${head(T(l, '별도 운영업체 · 물량 판단', 'Operations partner · volume', '別の委託先・物量判断'),
      T(l, '계절성과 향후 유입을 함께 본 저물량 판단.',
        'A low month, seen against seasonality and future inflow.',
        '季節性と今後の流入から見た低物量判断。'))}
        <div data-ev>${volume}</div>
        <div class="ev-tbl-wrap ev-tbl-tight ev-tbl-compact" data-ev style="margin-top:10px"><table class="ev-tbl">
          <tbody>
            <tr><th scope="row">${esc(T(l, '분리한 것', 'Separated', '分離した点'))}</th><td>${esc(T(l, '계절성 ↔ 연간 수요', 'Seasonality ↔ annual demand', '季節性 ↔ 年間需要'))}</td></tr>
            <tr><th scope="row">${esc(T(l, '제시한 것', 'Presented', '提示した点'))}</th><td>${esc(T(l, '향후 업무별 규모 · 시기 · 가치', 'Future work by volume, timing and value', '今後の業務別の規模・時期・価値'))}</td></tr>
            <tr><th scope="row">${esc(T(l, '연결한 결정', 'Decision reached', '接続した決定'))}</th><td>${esc(T(l, 'CFO 협의 · 협력 지속', 'CFO alignment · support continued', 'CFO協議・協力継続'))}</td></tr>
          </tbody>
        </table></div>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Action, card 3 — three specification gaps, one investment case
   * ------------------------------------------------------------------ */
  function infrastructure(d, l) {
    const proofs = [
      [T(l, '전원', 'Power', '電源'),
        T(l, '축약 평면에 표시해 전문가 확인을 받은 필요 지점과 수량.',
          'Required outlet positions and counts mapped on a reduced floor plan, validated by a specialist.',
          '必要な位置と数量を簡略平面に示し、専門家が確認。'),
        T(l, '요구 지점', 'Required points', '要求地点'), 100, 62],
      [T(l, '네트워크', 'Network', 'ネットワーク'),
        T(l, '구형이어서가 아니라, 가용 용량이 운영 요건에 미달해 교체.',
          'Not replaced for being old — the available capacity did not meet the operating requirement.',
          '旧型だからではなく、可用容量が運用要件を満たさないための交換。'),
        T(l, '가용 용량 대비 요구', 'Capacity vs requirement', '容量と要件'), 100, 58],
      [T(l, '환기', 'Ventilation', '換気'),
        T(l, '점검 지적사항과 실측 결과를 연결해 대응 필요성을 입증.',
          'Inspection findings connected to measured performance to substantiate the remedy.',
          '点検指摘と実測を結び、対応の必要性を立証。'),
        T(l, '요구 조건 대비 실측', 'Measured vs required', '要求と実測'), 100, 71]
    ];

    const budget = [
      T(l, '필수 대응 비용 증가', 'Required remedy raises cost', '必須対応で費用増'),
      T(l, '협상 · 다른 범위 조정', 'Negotiation and offsets elsewhere', '交渉・他範囲の調整'),
      T(l, '전체 투자 타당성 재검토', 'Overall investment case re-tested', '全体の投資妥当性を再検証')
    ];

    return `<div class="ev ev-inline">
      ${head(T(l, '세 가지 사양 격차와 하나의 투자 판단', 'Three specification gaps, one investment decision', '三つの仕様ギャップと一つの投資判断'),
      T(l, '요구 조건과 실제 가용 수준의 차이로 각 항목을 입증. 값은 지수.',
        'Each item is evidenced as the gap between requirement and available level. Values are indexed.',
        '各項目は要件と実際の可用水準の差で立証。値は指数。'))}
      <div class="ev-grid3">${proofs.map((p, i) => `
        <div class="ev-panel" data-ev style="--i:${i}">
          <p class="ev-h">${esc(p[0])}</p>
          <div class="ev-scale" style="grid-template-columns:minmax(52px,40%) 1fr">
            <span>${esc(T(l, '요구', 'Required', '要件'))}</span><div class="ev-track">${bar(0, p[3], 'is-strong')}</div>
            <span>${esc(T(l, '가용', 'Available', '可用'))}</span><div class="ev-track">${bar(0, p[4], 'is-risk')}</div>
          </div>
          <p class="ev-sub" style="margin:10px 0 0">${esc(p[1])}</p>
        </div>`).join('')}</div>
      <div class="ev-block">
        <div class="ev-steps is-flow">${budget.map((b, i) => `
          <div class="ev-step" data-ev style="--i:${3 + i}"><i>0${i + 1}</i><strong>${esc(b)}</strong></div>`).join('')}</div>
        <p class="ev-sub" style="margin-top:12px">${esc(T(l,
      'ROI 변동 약 10% 이내는 검토·관리 기준으로, 달성한 절감률과는 별개.',
      'Keeping ROI variation within roughly 10% was a review criterion, not an achieved saving.',
      'ROI変動およそ10%以内は検証・管理の基準であり、達成した削減率とは別物。'))}</p>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Trade · Action cards
   * ------------------------------------------------------------------ */
  function gstCard(d, l) {
    const g = d.visual.gst;
    const cols = [
      [T(l, '중단 원인', 'Why it stopped', '中断の原因'), g[0] + ' · ' + g[1],
        T(l, '과거 감사 경험에서 비롯된, 신청 보류로 이어진 신중론.',
          'Caution from past audit experience had put the filing on hold.',
          '過去の監査経験に由来する、申請保留につながった慎重論。')],
      [T(l, '검증한 조건', 'What was verified', '検証した条件'), g[2] + ' · ' + g[3],
        T(l, '현지 자문·유사 사례·복수 전문가 의견으로 실행 요건을 구체화.',
          'Local advice, comparable cases and multiple expert opinions turned it into concrete conditions.',
          '現地助言・類似事例・複数の専門家意見で実行要件を具体化。')],
      [T(l, '변경한 운영', 'What changed', '変更した運用'), g[4] + ' · ' + g[5],
        T(l, '주 단위 신청과 ERP 기록 보존을 프로세스로 고정.',
          'Weekly filing and ERP record retention were fixed into the process.',
          '週次申請とERP記録保持をプロセスとして固定。')]
    ];
    return `<div class="ev ev-inline">
      ${head(T(l, '멈춘 이유를 조건으로 바꾸기', 'Turning the reason it stopped into conditions', '止まった理由を条件に変える'),
      T(l, '위험 경험과 현재 신청 가능 조건을 구분한 것이 출발점.',
        'Separating the past risk experience from today’s filing conditions was the starting point.',
        '過去のリスク経験と現在の申請可能条件を区別することが出発点。'))}
      <div class="ev-grid3">${cols.map((c, i) => `
        <div class="ev-panel" data-ev style="--i:${i}">
          <p class="ev-h">${esc(c[0])}</p>
          <p class="ev-sub" style="color:var(--data);margin:0 0 8px">${esc(c[1])}</p>
          <p class="ev-sub" style="margin:0">${esc(c[2])}</p>
        </div>`).join('')}</div>
      <div class="ev-block">
        <div class="ev-steps is-flow">${[
        T(l, '주 단위 신청', 'Weekly filing', '週次申請'),
        T(l, 'ERP 기록 보존', 'ERP record retention', 'ERP記録保持'),
        T(l, '반복 환급', 'Recurring recovery', '継続的な還付')
      ].map((s, i) => `<div class="ev-step ${i === 2 ? 'is-last' : ''}" data-ev style="--i:${3 + i}">
          <i>0${i + 1}</i><strong>${esc(s)}</strong></div>`).join('')}</div>
      </div>
    </div>`;
  }

  function leverCard(d, l) {
    const v = d.visual.levers;
    return `<div class="ev ev-inline">
      ${head(T(l, '가치 배분과 조달 원산지', 'Value allocation and sourcing origin', '価値配分と調達原産地'),
      T(l, '가치의 삭제가 아니라, 문서와 본체 사이의 귀속을 실제 기능에 맞춘 조정. 값은 지수.',
        'Value was not removed; its attribution between document and unit was matched to where the function actually sits. Values are indexed.',
        '価値の削除ではなく、文書と本体の帰属を実際の機能に合わせた調整。値は指数。'))}
      <p class="ev-h" data-ev>${esc(T(l, '소프트웨어 요소 ↔ 하드웨어 요소 가치 귀속 (지수)', 'Software ↔ hardware value attribution (index)', 'ソフトウェア↔ハードウェアの価値帰属（指数）'))}</p>
      <div class="ev-scale">
        ${scaleRow(T(l, '이전', 'Before', '以前'), bar(0, 38, 'is-risk', T(l, '문서', 'Document', '文書')) + bar(38, 100, 'is-ghost', T(l, '본체', 'Unit', '本体')), 0)}
        ${scaleRow(T(l, '이후', 'After', '以後'), bar(0, 12, 'is-risk', '') + bar(12, 100, 'is-strong', T(l, '본체', 'Unit', '本体')), 1)}
      </div>
      <div class="ev-kv" style="margin-top:16px">
        <div data-ev style="--i:2"><span>${esc(v[1])}</span><strong>${esc(orderOfMagnitude(8, l))}</strong></div>
        <div data-ev style="--i:3"><span>${esc(v[3])}</span><strong>${esc(orderOfMagnitude(8, l))}</strong></div>
      </div>
      <p class="ev-sub" data-ev style="--i:4;margin-top:14px">${esc(T(l,
      '조달 원산지는 가격 인하가 아니라, 대안 원산지의 관세 부담과 실행 가능성을 비교해 내린 선택.',
      'Sourcing origin was chosen by comparing tariff exposure and feasibility across alternatives, not by asking for a lower price.',
      '調達原産地は値下げではなく、代替原産地の関税リスクと実行可能性を比較して選択。'))}</p>
    </div>`;
  }

  function controlCard(d, l) {
    const c = d.visual.controls;
    return `<div class="ev ev-inline">
      ${head(T(l, '효과 측정과 예외 점검', 'Measuring relief, reviewing exceptions', '効果測定と例外点検'),
      T(l, '기준 세율과 실제 관세의 차이를 효과로 정의하고, 정의가 흔들리지 않도록 변경 권한을 제한.',
        'The benefit is defined as baseline duty minus actual duty, with change rights restricted so the definition holds.',
        '基準関税と実関税の差を効果と定義し、定義が揺れないよう変更権限を制限。'))}
      <p class="ev-h" data-ev>${esc(c[3])}</p>
      <div class="ev-scale">
        ${scaleRow(T(l, '기준 세율 관세 (지수)', 'Baseline duty (index)', '基準関税（指数）'), bar(0, 100, 'is-ghost', '100'), 0)}
        ${scaleRow(T(l, '협정 적용 후 (지수)', 'After agreement (index)', '協定適用後（指数）'), bar(0, 74, 'is-strong', '74'), 1)}
        ${scaleRow(T(l, '측정된 효과', 'Measured benefit', '測定された効果'), bar(74, 100, 'is-ok', ''), 2)}
      </div>
      <div class="ev-kv" style="margin-top:16px">
        <div data-ev style="--i:3"><span>${esc(c[0])}</span><strong>${esc(c[1])}</strong></div>
        <div data-ev style="--i:4"><span>${esc(c[4])}</span><strong>${esc(c[5])}</strong></div>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Compliance · Situation — a backlog stacking up on two fronts
   * ------------------------------------------------------------------ */
  function queueBacklog(l) {
    const periods = [30, 38, 46, 40, 48, 56, 64, 57, 65, 73, 82, 91];
    const hires = [3, 7];
    const cap = 45;
    const pts = periods.map((v, i) => `${20 + i * 52},${118 - v * 0.9}`).join(' ');
    const hireLabel = T(l, '인원 충원', 'Headcount added', '増員');
    const markers = hires.map(i => {
      const x = 20 + i * 52, y = 118 - periods[i] * 0.9;
      return `<line x1="${x}" y1="14" x2="${x}" y2="${y - 6}" stroke="var(--data-soft)" stroke-dasharray="2 3"/>
        <text x="${x}" y="11" text-anchor="middle" fill="var(--data)" font-size="10">${esc(hireLabel)}</text>`;
    }).join('');
    const chart = `<svg viewBox="0 0 620 150" role="img" aria-label="${esc(T(l,
      '분기별 확인 대기 건수가 지난 3년간 인원 충원에도 처리 가능한 수준을 반복해서 넘어서며 계속 늘어난 가상 곡선',
      'Illustrative curve of the quarterly confirmation backlog repeatedly breaking past a sustainable level over 3 years, despite added headcount',
      '四半期ごとの確認待ち件数が、過去3年間の増員にもかかわらず処理可能な水準を繰り返し超えて増え続けた架空の曲線'))}">
      <line x1="20" y1="${118 - cap * 0.9}" x2="600" y2="${118 - cap * 0.9}"
        stroke="var(--risk)" stroke-dasharray="5 4" stroke-width="1.5"/>
      <text x="600" y="${118 - cap * 0.9 - 7}" text-anchor="end" fill="var(--risk)">${esc(T(l, '처리 가능 수준', 'Sustainable level', '処理可能な水準'))}</text>
      <polyline points="${pts}" fill="none" stroke="var(--data)" stroke-width="2.5"/>
      ${periods.map((v, i) => `<circle cx="${20 + i * 52}" cy="${118 - v * 0.9}" r="3" fill="${v > cap ? 'var(--risk)' : 'var(--data)'}"/>`).join('')}
      ${markers}
      <text x="20" y="140">${esc(T(l, '약 3년 전', '~3 years ago', '約3年前'))}</text><text x="600" y="140" text-anchor="end">${esc(T(l, '현재', 'Now', '現在'))}</text>
    </svg>`;

    return fig('backlog',
      head(
        T(l, '두 갈래로 쌓이는 확인 대기열', 'A backlog stacking up on two fronts', '二方向に積み上がる確認待ちキュー'),
        T(l, '수년간 인력을 여러 차례 보강했지만 본사 회신 대기 큐와 고객 응대 큐가 함께 늘어나, 처리보다 관리 자체가 더 큰 부담으로 작용.',
          'Reinforced with more headcount several times over the years, but the HQ follow-up queue and the customer queue kept growing together, until managing them became the real burden.',
          '数年にわたり人員を何度も補強しても、本社回答待ちキューと顧客対応キューが共に膨らみ、処理より管理そのものが重荷に。')
      ) +
      `<div data-ev>${chart}</div>` +
      `<div class="ev-kv" style="margin-top:16px">
        <div data-ev style="--i:1"><span>${esc(T(l, '인력 보강', 'Headcount reinforcement', '人員補強'))}</span><strong>${esc(T(l, '3년간 2회', 'Twice in 3 years', '3年間で2回'))}</strong></div>
        <div data-ev style="--i:2"><span>${esc(T(l, '월간 관리 부담', 'Monthly management load', '月間の管理負荷'))}</span><strong>${esc(T(l, '약 100시간', '~100 hours', '約100時間'))}</strong></div>
        <div data-ev style="--i:3"><span>${esc(T(l, '고객 영향', 'Customer impact', '顧客への影響'))}</span><strong>${esc(T(l, '계약 갱신 시 요청', 'Raised in contract renewals', '契約更新時に要請'))}</strong></div>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Compliance · Task — a four-person pilot that moved without approval
   * ------------------------------------------------------------------ */
  function pocScope(l) {
    const team = [
      [T(l, '오퍼레이션 매니저 · 기초 설계', 'Ops manager · base design', 'オペレーションマネージャー・基本設計'),
        T(l, '분류 체계 · 심각도 · 전체 구조', 'Taxonomy, severity and overall structure', '分類体系・重大度・全体構造')],
      [T(l, '본사 IT 1명', 'HQ IT (1)', '本社IT 1名'),
        T(l, '환경 프로비저닝 · 권한', 'Environment provisioning and access', '環境プロビジョニング・権限付与')],
      [T(l, '현지 운영 담당자 1명', 'Local operations lead (1)', '現地オペレーション担当 1名'),
        T(l, '실제 문의 유형 조사', 'Survey of actual query types', '実際の照会類型の調査')],
      [T(l, '현지 규제 담당 1명', 'Local regulatory reviewer (1)', '現地規制担当 1名'),
        T(l, '심각도 기준 감수', 'Review of severity criteria', '重大度基準のレビュー')]
    ];
    return fig('poc-scope',
      head(
        T(l, '본사 승인 없이 움직인 4인 파일럿', 'A four-person pilot that moved without HQ approval', '本社承認なしで動いた4名パイロット'),
        T(l, '결재 라인을 늘리는 대신, 작게 시작해 실체부터 확인하는 방식.',
          'Rather than lengthening the approval chain, the approach was to start small and verify the real shape of the problem first.',
          '決裁ラインを増やす代わりに、小さく始めて実態から確認する方式。')
      ) +
      `<div class="ev-owners">
        <p class="ev-h" data-ev>${esc(T(l, '4인 구성', 'Team of four', '4名体制'))}</p>
        ${team.map((o, i) => `<div data-ev style="--i:${1 + i}">
          <strong>${esc(o[0])}</strong><span>${esc(o[1])}</span></div>`).join('')}
      </div>` +
      `<div class="ev-kv" style="margin-top:16px">
        <div data-ev style="--i:5"><span>${esc(T(l, '환경 구성', 'Environment setup', '環境構築'))}</span><strong>${esc(T(l, 'IT 프로비저닝 2주', '2 weeks for IT to provision', 'ITによる環境構築に2週間'))}</strong></div>
        <div data-ev style="--i:6"><span>${esc(T(l, '제공된 환경', 'Platform provided', '提供された環境'))}</span><strong>${esc(T(l, '클라우드 LLM 서비스 · 사내 문서 포털', 'Managed cloud LLM · internal document portal', 'クラウドLLMサービス・社内文書ポータル'))}</strong></div>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Compliance · Action cards
   * ------------------------------------------------------------------ */
  const REGULATION_EXAMPLES = l => [
    T(l, '탄소국경조정(CBAM)', 'Carbon border adjustment (CBAM)', '炭素国境調整(CBAM)'),
    T(l, '삼림파괴 관련 규제(EUDR)', 'Deforestation regulation (EUDR)', '森林破壊関連規制(EUDR)'),
    T(l, '특정 화학물질 포함 여부', 'Restricted-substance content', '特定化学物質の含有有無'),
    T(l, '부품 원산지 확인서', 'Component country-of-origin', '部品原産地確認書')
  ];

  function taxonomyCard(l) {
    const kv = (k, v) => `<span class="k">${k}</span>: <span class="v">${v}</span>\n`;
    const yaml =
      `<span class="c"># ${esc(T(l, '같은 규제, 대응 방법별로 나눈 두 청크', 'Same regulation, two chunks split by response method', '同一規制・対応方法別の二チャンク'))}</span>\n` +
      kv('regulation', 'CBAM') + kv('response_type', 'declaration_request') +
      kv('jurisdiction', 'EU') + kv('product_scope', 'steel_iron') +
      kv('severity', '2') + kv('precedent', 'partial') +
      kv('customer_pressure', 'low') + kv('escalation', 'supervisor') +
      kv('owner', 'local_ops') + kv('token_budget', '380') +
      `<span class="sep">---</span>\n` +
      kv('regulation', 'CBAM') + kv('response_type', 'scope_faq') +
      kv('jurisdiction', 'EU') + kv('product_scope', 'steel_iron') +
      kv('severity', '1') + kv('precedent', 'mapped') +
      kv('customer_pressure', 'low') + kv('escalation', 'none') +
      kv('owner', 'local_ops') + kv('token_budget', '210');

    return `<div class="ev ev-inline">
      ${head(T(l, '청킹 위에 얹은 메타데이터', 'Metadata layered on top of chunking', 'チャンキングに重ねたメタデータ'),
      T(l, '추측이 아니라 티켓 로그에서 추출한 규제명을 기준으로, 대응 방법별로 청크를 분할.',
        'Built from regulation names pulled out of ticket logs, then split into chunks by response method.',
        '推測ではなく、チケットログから抽出した規制名を基準に、対応方法別にチャンクを分割。'))}
      <div class="ev-yaml" data-ev>
        <div class="ev-yaml-head"><i></i><i></i><i></i><em>regulation_chunks.yaml</em></div>
        <pre><code>${yaml}</code></pre>
      </div>
    </div>`;
  }

  function severityCard(l) {
    const tiers = [
      [T(l, '1단계', 'Tier 1', '第1段階'), T(l, '매핑 존재 · 대응 확정', 'Mapped · response settled', 'マッピングあり・対応確定'),
        T(l, '즉시 답변 · 에스컬레이션 없음', 'Instant answer · no escalation', '即時回答・エスカレーションなし'), true],
      [T(l, '2단계', 'Tier 2', '第2段階'), T(l, '매핑 없음 · 선례로 조합 · 요구 강도 낮음', 'No mapping · composed from precedent · low pressure', 'マッピングなし・前例で構成・圧力低'),
        T(l, '담당자 에스컬레이션', 'Supervisor escalation', '担当者へエスカレーション'), false],
      [T(l, '3단계', 'Tier 3', '第3段階'), T(l, '고객 요구 강도 높음', 'High customer pressure', '顧客からの圧力大'),
        T(l, '법무팀 에스컬레이션', 'Legal / HQ escalation', '法務・本社へエスカレーション'), false],
      [T(l, '4단계', 'Tier 4', '第4段階'), T(l, '처음 보는 사례', 'Never seen before', '前例のない事案'),
        T(l, '법무팀 에스컬레이션', 'Legal / HQ escalation', '法務・本社へエスカレーション'), false]
    ];
    return `<div class="ev ev-inline">
      ${head(T(l, '선례와 요구 강도, 두 축으로 나눈 4단계', 'Four tiers on two axes: precedent and pressure', '前例と圧力、二軸で分けた4段階'),
      T(l, '난이도 순서가 아니라 매핑 여부와 고객 요구 강도의 조합. 모든 단계에서 사람의 최종 확인.',
        'Not a difficulty ladder — a combination of mapping status and customer pressure. Every tier ends with human confirmation.',
        '難易度の序列ではなく、マッピングの有無と顧客圧力の組み合わせ。全段階で人による最終確認。'))}
      <div class="ev-tbl-wrap ev-tbl-tight" data-ev><table class="ev-tbl">
        <thead><tr>
          <th scope="col">${esc(T(l, '단계', 'Tier', '段階'))}</th>
          <th scope="col">${esc(T(l, '판단 조건', 'Trigger condition', '判断条件'))}</th>
          <th scope="col">${esc(T(l, '라우팅', 'Routing', 'ルーティング'))}</th>
        </tr></thead>
        <tbody>${tiers.map(r => `<tr>
          <th scope="row">${esc(r[0])}</th>
          <td>${esc(r[1])}</td>
          <td class="${r[3] ? 'is-ok' : ''}">${esc(r[2])}</td>
        </tr>`).join('')}</tbody>
      </table></div>
      <div class="ev-figure" data-ev style="--i:5"><strong>~60</strong><em>%</em></div>
      <span class="ev-type" data-ev style="--i:5">${esc(T(l, '1단계에서 즉시 해소된 비율', 'Share resolved instantly at Tier 1', '第1段階で即時解消された割合'))}</span>
      <p class="ev-h" data-ev style="--i:6;margin-top:18px">${esc(T(l, '분류 대상이 된 실제 규제 유형 (예시)', 'Regulation types this classifies (examples)', 'この分類対象となった実際の規制類型（例）'))}</p>
      <div class="ev-kv">${REGULATION_EXAMPLES(l).map((x, i) => `<div data-ev style="--i:${7 + i}"><span>0${i + 1}</span><strong>${esc(x)}</strong></div>`).join('')}</div>
    </div>`;
  }

  function qualityLoopCard(l) {
    const loop = [
      [T(l, '사용 로그 → BI', 'Usage logs → BI', '利用ログ→BI'),
        T(l, '챗봇 문의 전체를 Power BI로 집계', 'All chatbot queries aggregated in Power BI', 'チャットボット問い合わせ全体をPower BIに集計')],
      [T(l, '답변 로그 → 티켓 태그', 'Answers → ticket tags', '回答→チケットタグ'),
        T(l, '실제 규제 답변은 분류 태그로 추출해 검토', 'Actual regulatory answers pulled by classification tag for review', '実際の規制回答は分類タグで抽出しレビュー')],
      [T(l, '현장 반응 → 원인 분석', 'Field flags → root cause', '現場フラグ→原因分析'),
        T(l, '숙련 담당자의 이상 답변 반응을 분석해 공백 확인', "Experienced staff's flags on off answers were root-caused", '経験者による違和感フラグを分析し欠落を確認')],
      [T(l, '개선 → 메타데이터 보강', 'Fix → metadata reinforced', '改善→メタデータ補強'),
        T(l, '분류 공백을 메타데이터 항목으로 메움', 'Classification gaps closed by adding metadata fields', '分類の欠落をメタデータ項目で補強')]
    ];
    return `<div class="ev ev-inline">
      ${head(T(l, '로그와 현장 반응으로 닫은 루프', 'A loop closed with logs and field reactions', 'ログと現場反応で閉じたループ'),
      T(l, '정확도를 한 번 확인하고 끝내지 않고, 놓친 사례를 찾아 메타데이터를 지속 보강.',
        'Accuracy was not checked once and left — missed cases were found and metadata kept being reinforced.',
        '精度を一度の確認で終わらせず、見逃した事例を見つけてメタデータを継続的に補強。'))}
      <div class="ev-steps is-flow">${loop.map((s, i) => `
        <div class="ev-step ${i === 3 ? 'is-last' : ''}" data-ev style="--i:${i}">
          <i>0${i + 1}</i><strong>${esc(s[0])}</strong><span>${esc(s[1])}</span>
        </div>`).join('')}</div>
      <p class="ev-h" data-ev style="--i:4;margin-top:18px">${esc(T(l, '피드백으로 찾은 원인과 수정 (예시)', 'Root causes found through feedback, and fixed (examples)', 'フィードバックで見つけた原因と修正（例）'))}</p>
      <div class="ev-tbl-wrap ev-tbl-tight" data-ev style="--i:5"><table class="ev-tbl">
        <thead><tr>
          <th scope="col">${esc(T(l, '놓친 사례', 'Missed case', '見逃した事例'))}</th>
          <th scope="col">${esc(T(l, '보강한 것', 'What was added', '補強した内容'))}</th>
        </tr></thead>
        <tbody>
          <tr><th scope="row">${esc(T(l, '한 질문에 규제 두 개가 섞임', 'One question spanning two regulations', '一つの質問に規制が二つ絡む'))}</th><td>${esc(T(l, '다중 규제 태그 추가', 'Added a multi-regulation tag', '複数規制タグを追加'))}</td></tr>
          <tr><th scope="row">${esc(T(l, '국가별 명칭 차이', 'Country-specific naming variant', '国別の呼称の違い'))}</th><td>${esc(T(l, '지역별 별칭 목록 추가', 'Added a regional alias list', '地域別エイリアスリストを追加'))}</td></tr>
          <tr><th scope="row">${esc(T(l, '원문 번역 표현 차이', 'Translation variance in source documents', '原文の翻訳表現の差異'))}</th><td>${esc(T(l, '원문 문서에 수정 플래그 표시', 'Flagged the source document for correction', '原文書に修正フラグを表示'))}</td></tr>
        </tbody>
      </table></div>
      <div class="ev-kv" data-ev style="--i:6;margin-top:16px">
        <div data-ev style="--i:6"><span>${esc(T(l, 'HITL 준수', 'HITL adherence', 'HITL遵守'))}</span><strong>${esc(T(l, '정해진 단계 밖 임의 답변 없음 확인', 'Checked for any answer given outside the tiered flow', '定められた段階外の任意回答がないか点検'))}</strong></div>
        <div data-ev style="--i:7"><span>${esc(T(l, '메타데이터 보강', 'Metadata reinforcement', 'メタデータ補強'))}</span><strong>${esc(T(l, '공백 발견 즉시 반영', 'Applied as soon as a gap was found', '欠落発見次第すぐ反映'))}</strong></div>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Compliance · Result — pilot-stage numbers, not a rollout report
   * ------------------------------------------------------------------ */
  function triageResult(l) {
    return fig('triage-result',
      head(
        T(l, '파일럿에서 검증한 숫자', 'Numbers validated in the pilot', 'パイロットで検証した数字'),
        T(l, '확대 적용 이전 단계의 결과로, 회사 정식 도입 수치와는 별개.',
          'A pilot-stage result, not a figure from formal company-wide rollout.',
          '本格展開前段階の結果であり、正式導入後の数値とは別物。')
      ) +
      `<div class="ev-block" data-ev>
        <p class="ev-h">${esc(T(l, '월간 문의 · 1단계 즉시 해소 비율 (지수)', 'Monthly queries · Tier-1 instant-resolution rate (index)', '月間問い合わせ・第1段階即時解消率（指数）'))}</p>
        <div class="ev-scale">
          ${scaleRow(T(l, '전체 월간 문의', 'Total monthly queries', '月間問い合わせ全体'), bar(0, 100, 'is-ghost', '100'), 0)}
          ${scaleRow(T(l, '1단계 · 즉시 해소', 'Tier 1 · instant', '第1段階・即時'), bar(0, 60, 'is-ok', '60'), 1)}
        </div>
        <div class="ev-figure" data-ev style="--i:2"><strong>~60</strong><em>%</em></div>
        <span class="ev-type" data-ev style="--i:2">${esc(T(l, '문의의 1단계 즉시 해소 비율', 'Share of queries resolved instantly at Tier 1', '問い合わせの第1段階即時解消率'))}</span>
      </div>` +
      `<div class="ev-block">
        <p class="ev-h" data-ev style="--i:3">${esc(T(l, '관리 부담의 변화', 'Change in management load', '管理負荷の変化'))}</p>
        <div class="ev-kv">
          <div data-ev style="--i:4"><span>${esc(T(l, '파일럿 이전', 'Before the pilot', 'パイロット以前'))}</span><strong>${esc(T(l, '월 약 100시간', '~100 hours / month', '月間約100時間'))}</strong></div>
          <div data-ev style="--i:5"><span>${esc(T(l, '확대 적용 시 전망', 'Projected at full scale', '本格展開時の見込み'))}</span><strong>${esc(T(l, '연간 수백 시간 절감', 'Hundreds of hours saved annually', '年間数百時間の削減'))}</strong></div>
        </div>
      </div>`, l);
  }

  /* ------------------------------------------------------------------ *
   * Compliance · Hero — one query, fanning into a routing decision
   * ------------------------------------------------------------------ */
  function triageHero(l) {
    const scanIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="3.5" width="11" height="14" rx="1.5" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M7 8h5M7 11h5M7 14h3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".85"/><circle cx="17" cy="16" r="4" fill="none" stroke="#fff" stroke-width="1.6"/><line x1="20" y1="19" x2="22.5" y2="21.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>';
    const answerIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" fill="var(--ok-pale)" stroke="var(--ok)" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 9.5l2.3 2.3L15.5 7.3" stroke="var(--ok)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const supervisorIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="var(--data-pale)" stroke="var(--data)" stroke-width="1.6"/><path d="M5.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" fill="none" stroke="var(--data)" stroke-width="1.6" stroke-linecap="round"/></svg>';
    const legalIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9.5 12 5l8 4.5" fill="none" stroke="var(--data)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="10" width="14" height="8.5" rx="1" fill="var(--data-pale)" stroke="var(--data)" stroke-width="1.6"/><path d="M8 13v4M12 13v4M16 13v4" stroke="var(--data)" stroke-width="1.6" stroke-linecap="round"/></svg>';
    const docIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="3.5" width="15" height="17" rx="1.8" fill="none" stroke="var(--data)" stroke-width="1.6"/><path d="M8 9h8M8 12.5h8M8 16h5" stroke="var(--data)" stroke-width="1.5" stroke-linecap="round" opacity=".65"/></svg>';

    return `<div class="gov-hero" role="img" aria-label="${esc(T(l,
        'EU 규제 문의가 4단계 심각도로 분류되어 즉시 답변 · 담당자 에스컬레이션 · 법무팀 에스컬레이션 중 하나로 갈라지는 애니메이션 다이어그램',
        'Animated diagram of an EU regulatory query classified into four severity tiers and routed to an instant answer, a supervisor escalation or a legal escalation',
        'EU規制の問い合わせが4段階の重大度に分類され、即時回答・担当者エスカレーション・法務エスカレーションのいずれかに分岐するアニメーション図'))}">
      <p class="gov-loop-label" style="margin-bottom:8px">${esc(T(l, '실제 청크 메타데이터', 'An actual chunk’s metadata', '実際のチャンクメタデータ'))}</p>
      <div class="ev-yaml is-compact" aria-hidden="true">
        <div class="ev-yaml-head"><i></i><i></i><i></i><em>chunk.yaml</em></div>
        <pre><code><span class="k">regulation</span>: <span class="v">CBAM</span>
<span class="k">response_type</span>: <span class="v">declaration_request</span>
<span class="k">severity</span>: <span class="v">2</span>
<span class="k">escalation</span>: <span class="v">supervisor</span></code></pre>
      </div>
      <svg class="gov-merge" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
        <path class="gov-line" d="M150 2 L150 28"/>
      </svg>
      <div class="gov-inputs" style="max-width:210px">
        <span class="gov-input is-doc" style="--i:0">${docIcon}${esc(T(l, 'EU 규제 문의', 'EU regulatory query', 'EU規制の問い合わせ'))}</span>
      </div>
      <svg class="gov-merge" viewBox="0 0 300 46" preserveAspectRatio="none" aria-hidden="true">
        <path class="gov-line" d="M150 2 L150 44"/>
      </svg>
      <div class="gov-core">${scanIcon}<span>${esc(T(l, '4단계 심각도 분류', '4-tier severity classifier', '4段階重大度分類'))}</span></div>
      <div class="gov-drop" aria-hidden="true"></div>
      <p class="gov-loop-label">${esc(T(l, '선례 · 고객 요구 강도 기준', 'By precedent and customer pressure', '前例・顧客圧力を基準'))}</p>
      <div class="gov-routes">
        <div class="gov-route is-primary">${answerIcon}<i>${esc(T(l, '1단계', 'Tier 1', '第1段階'))}</i><strong>${esc(T(l, '즉시 답변', 'Instant answer', '即時回答'))}</strong></div>
        <div class="gov-route">${supervisorIcon}<i>${esc(T(l, '2단계', 'Tier 2', '第2段階'))}</i><strong>${esc(T(l, '담당자 에스컬레이션', 'Supervisor', '担当者へ'))}</strong></div>
        <div class="gov-route">${legalIcon}<i>${esc(T(l, '고강도 요구·신규 사례', 'High pressure / novel', '高圧力・新規事案'))}</i><strong>${esc(T(l, '법무팀 에스컬레이션', 'Legal / HQ', '法務へ'))}</strong></div>
      </div>
      <div class="gov-figure">
        <strong>~60%</strong>
        <small>${esc(T(l, '1단계에서 즉시 해소', 'Resolved instantly at Tier 1', '第1段階で即時解消'))}</small>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Warehouse · Action, card 4 — the cutover run as a live migration
   * ------------------------------------------------------------------ */
  function cutoverCard(l) {
    const practices = [
      [T(l, '단계적 전환', 'Phased rollout', '段階的な切替'),
        T(l, '하루 대량 전환 대신 제품군별로 분할 이전', 'Split by product group instead of one big-bang date', '品目群別に分割移行し一括移行を回避')],
      [T(l, '병행 운영 (블루-그린)', 'Parallel run (blue-green)', '並行運用（ブルーグリーン）'),
        T(l, '임시 공유 ERP로 신구 창고 동시 출하 유지', 'A temporary shared ERP kept both warehouses shipping', '一時共有ERPで新旧倉庫の同時出荷を維持')],
      [T(l, '테스트 커버리지', 'Test coverage', 'テストカバレッジ'),
        T(l, '예상 외 케이스 포함 약 200개 시나리오 검증', '~200 positive, negative and edge-case scenarios verified', '想定外を含む約200シナリオを検証')],
      [T(l, '롤백 대비', 'Rollback readiness', 'ロールバック対応'),
        T(l, '전환 구간 내내 백업 서버 가동', 'A backup server stayed live through the cutover window', '切替期間中バックアップサーバーを稼働')]
    ];
    return `<div class="ev ev-inline">
      ${head(T(l, '라이브 마이그레이션처럼 다룬 물리적 이전', 'A physical relocation, handled like a live migration', 'ライブマイグレーションの規律で扱った物理的な移転'),
      T(l, '한 번에 끊지 않고, 단계적 롤아웃·병행 운영·광범위한 테스트·롤백 경로를 갖춘 전환.',
        'Not a single cutover — a transition built on phased rollout, parallel running, broad test coverage and a rollback path.',
        '一度きりの切替ではなく、段階的ロールアウト・並行運用・広範なテスト・ロールバック経路を備えた移行。'))}
      <div class="ev-tbl-wrap ev-tbl-tight" data-ev><table class="ev-tbl">
        <thead><tr>
          <th scope="col">${esc(T(l, '마이그레이션 원칙', 'Migration practice', 'マイグレーション原則'))}</th>
          <th scope="col">${esc(T(l, '실제 적용', 'What was done', '実際の適用'))}</th>
        </tr></thead>
        <tbody>${practices.map(r => `<tr>
          <th scope="row">${esc(r[0])}</th>
          <td>${esc(r[1])}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Deck assembly — keeps the existing tab/panel contract
   * ------------------------------------------------------------------ */
  function deck(kind, d, l) {
    const trade = kind === 'trade-cards';
    const compliance = kind === 'compliance-cards';
    const rows = d[trade ? 'tradeCards' : compliance ? 'complianceCards' : 'logisticsCards'];
    const tabs = trade
      ? [T(l, '환급 재개', 'Recovery', '還付再開'), T(l, '가치·조달', 'Value & Source', '価値・調達'), T(l, '효과·통제', 'Controls', '効果・統制')]
      : compliance
      ? [T(l, '청킹·분류 체계', 'Chunking & Taxonomy', 'チャンキング・分類体系'), T(l, '심각도·라우팅', 'Severity & Routing', '重大度・ルーティング'), T(l, '품질 점검 주기', 'Quality Cadence', '品質レビュー周期')]
      : [T(l, '통합 계획', 'Delivery Plan', '統合計画'), T(l, '계약·물량', 'Commercial', '契約・物量'), T(l, '인프라·투자', 'Infrastructure', 'インフラ'), T(l, '전환 전략', 'Cutover Strategy', '切替戦略')];
    const evidence = trade
      ? [gstCard(d, l), leverCard(d, l), controlCard(d, l)]
      : compliance
      ? [taxonomyCard(l), severityCard(l), qualityLoopCard(l)]
      : [deliveryPlan(d, l), commercial(d, l), infrastructure(d, l), cutoverCard(l)];

    return `<div class="case-deck editorial-deck" data-deck>
      <div class="deck-tabs">${tabs.map((x, i) =>
      `<button data-card-select="${i}" aria-pressed="${i === 0}"><small>0${i + 1}</small> ${esc(x)}</button>`).join('')}</div>
      ${rows.map((r, i) => `<article class="deck-panel" data-card-panel="${i}" ${i ? 'hidden' : ''}>
        <div class="action-narrative">
          <h3>${esc(r[0])}</h3><p>${esc(r[1])}</p><p>${esc(r[2])}</p>
        </div>
        <div class="action-evidence">${evidence[i]}</div>
      </article>`).join('')}
      <div class="deck-pagination">
        <button type="button" data-card-step="-1">← ${esc(T(l, '이전', 'Previous', '前へ'))}</button>
        <span data-card-count>1 / ${rows.length}</span>
        <button type="button" data-card-step="1">${esc(T(l, '다음', 'Next', '次へ'))} →</button>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Trade · Hero — the governance story itself, not a tool screenshot.
   * Three functions that decided in isolation, merged into one governed
   * loop. The loop cycles continuously (a CSS highlight sweep, not SVG
   * physics) so the cover reads as a live operating system, not a still.
   * ------------------------------------------------------------------ */
  function governanceHero(d, l) {
    const inputs = [
      T(l, '세무', 'Tax', '税務'),
      T(l, '관세', 'Customs', '関税'),
      T(l, '물류', 'Logistics', '物流')
    ];
    const steps = loopSteps(l);
    const v = d.visual['cost-result'];

    return `<div class="gov-hero" role="img" aria-label="${esc(T(l,
        '세무·관세·물류 세 부서가 하나의 거버넌스 루프로 합류하는 애니메이션 다이어그램',
        'Animated diagram of tax, customs and logistics converging into one governance loop',
        '税務・関税・物流の3部門が一つのガバナンスループへ合流するアニメーション図'))}">
      <div class="gov-inputs">
        ${inputs.map((x, i) => `<span class="gov-input" style="--i:${i}">${esc(x)}</span>`).join('')}
      </div>
      <svg class="gov-merge" viewBox="0 0 300 46" preserveAspectRatio="none" aria-hidden="true">
        <path class="gov-line" d="M38 2 L150 44"/>
        <path class="gov-line" d="M150 2 L150 44" style="--d:.25s"/>
        <path class="gov-line" d="M262 2 L150 44" style="--d:.5s"/>
      </svg>
      <div class="gov-core">${esc(T(l, '공유 거버넌스', 'Shared governance', '共有ガバナンス'))}</div>
      <div class="gov-drop" aria-hidden="true"></div>
      <p class="gov-loop-label">${esc(T(l, '반복 개선 루프', 'Repeatable improvement loop', '反復改善ループ'))}</p>
      <div class="gov-loop">
        ${steps.map((s, i) => `<div class="gov-step" style="--i:${i}"><i>0${i + 1}</i><span>${esc(s[0])}</span></div>`).join('')}
      </div>
      <p class="ev-return gov-return-text">↺ ${esc(T(l, '다음 가설로 순환', 'Cycles to the next hypothesis', '次の仮説へ循環'))}</p>
      <div class="gov-figure">
        <strong>${esc(orderOfMagnitude(9, l))}</strong>
        <small>${esc(T(l, '연간 반복 효과', 'Recurring annual effect', '年間反復効果'))}</small>
      </div>
    </div>`;
  }

  /* ------------------------------------------------------------------ *
   * Dispatch
   * ------------------------------------------------------------------ */
  EXHIBITS.render = (kind, d, l) => {
    if (kind === 'report-hero') return governanceHero(d, l);
    if (kind === 'triage-hero') return triageHero(l);
    if (kind === 'fragment') return fragment(d, l);
    if (kind === 'platform') return platform(d, l);
    if (kind === 'cost-result') return costResult(d, l);
    if (kind === 'risks') return risks(d, l);
    if (kind === 'scope') return scope(d, l);
    if (kind === 'result') return result(d, l);
    if (kind === 'backlog') return queueBacklog(l);
    if (kind === 'poc-scope') return pocScope(l);
    if (kind === 'triage-result') return triageResult(l);
    if (kind.endsWith('-cards')) return fig(kind, deck(kind, d, l), l);
    return prior(kind, d, l);
  };

  /* ------------------------------------------------------------------ *
   * Interaction
   * ------------------------------------------------------------------ */
  EXHIBITS.mount = l => {
    priorMount(l);

    /* schedule scenarios */
    document.querySelectorAll('[data-ev-scenario]').forEach(btn => {
      btn.onclick = () => {
        const root = btn.closest('.ev-inline');
        const key = btn.dataset.evScenario;
        const scale = root.querySelector('[data-ev-gantt]');
        scale.innerHTML = fixedLine(84, T(l, '고정 가동일', 'Fixed launch', '固定稼働日')) + ganttRows(l, key);
        root.querySelectorAll('[data-ev-scenario]').forEach(b =>
          b.setAttribute('aria-pressed', String(b === btn)));

        const impact = root.querySelector('[data-ev-impact]');
        const copy = {
          base: [T(l, '없음 · 기준 계획', 'None · baseline plan', 'なし・基準計画'),
            T(l, '유지', 'Unchanged', '維持'),
            T(l, '계획대로 진행', 'Proceed as planned', '計画どおり進行')],
          infra: [T(l, '설비 작업 · 인터페이스 · 통합 테스트 · 전환', 'Equipment · interface · integration test · cutover', '設備・IF・統合テスト・切替'),
            T(l, '가동 필수 범위와 후속 개선의 경계', 'The line between launch-critical and follow-on', '稼働必須と後続改善の境界'),
            T(l, '범위 축소 · 인원 추가 · 후속 단계화', 'Reduce scope · add resource · phase it after launch', '範囲縮小・人員追加・稼働後に段階化')],
          validation: [T(l, '통합 테스트 · 전환', 'Integration test · cutover', '統合テスト・切替'),
            T(l, '검증 범위와 승인 경로', 'Validation scope and approval path', '検証範囲と承認経路'),
            T(l, '검증 병행 · 전환 창 조정', 'Run validation in parallel · adjust the cutover window', '検証を並行・切替枠を調整')]
        }[key];
        if (impact && copy) {
          impact.querySelector('[data-k="tasks"]').textContent = copy[0];
          impact.querySelector('[data-k="decision"]').textContent = copy[1];
          impact.querySelector('[data-k="options"]').textContent = copy[2];
        }
      };
    });

    /* applied-case selector on the trade result */
    document.querySelectorAll('[data-ev-case]').forEach(btn => {
      btn.onclick = () => {
        const root = btn.closest('.ev');
        const i = btn.dataset.evCase;
        root.querySelectorAll('[data-ev-case]').forEach(b =>
          b.setAttribute('aria-pressed', String(b === btn)));
        root.querySelectorAll('[data-ev-outcome]').forEach(row =>
          row.classList.toggle('is-active', row.dataset.evOutcome === i));
        root.querySelectorAll('[data-ev-badge]').forEach(badge =>
          badge.hidden = badge.dataset.evBadge !== i);
      };
    });
    document.querySelectorAll('[data-ev-outcome="0"]').forEach(r => r.classList.add('is-active'));
  };
})();
