(() => {
  var r = {
      423: (t, e, r) => {
        var n = r(722),
          o = r(392);
        t.exports = function (t) {
          if (n(t)) return t;
          throw TypeError(o(t) + ' is not a function');
        };
      },
      514: (t, e, r) => {
        var n = r(810);
        t.exports = function (t) {
          if (n(t)) return t;
          throw TypeError(String(t) + ' is not an object');
        };
      },
      876: (t, e, r) => {
        r = r(230);
        t.exports = !r(function () {
          return (
            7 !=
            Object.defineProperty({}, 1, {
              get: function () {
                return 7;
              },
            })[1]
          );
        });
      },
      658: (t, e, r) => {
        var n = r(338),
          r = r(810),
          o = n.document,
          a = r(o) && r(o.createElement);
        t.exports = function (t) {
          return a ? o.createElement(t) : {};
        };
      },
      188: (t, e, r) => {
        r = r(13);
        t.exports = r('navigator', 'userAgent') || '';
      },
      552: (t, e, r) => {
        var n,
          o,
          a = r(338),
          i = r(188),
          r = a.process,
          a = a.Deno,
          a = (r && r.versions) || (a && a.version),
          a = a && a.v8;
        a
          ? (o = (n = a.split('.'))[0] < 4 ? 1 : n[0] + n[1])
          : i &&
            (!(n = i.match(/Edge\/(\d+)/)) || 74 <= n[1]) &&
            (n = i.match(/Chrome\/(\d+)/)) &&
            (o = n[1]),
          (t.exports = o && +o);
      },
      230: (t) => {
        t.exports = function (t) {
          try {
            return !!t();
          } catch (t) {
            return !0;
          }
        };
      },
      843: (t, e, r) => {
        var n = r(876),
          o = r(90),
          a = Function.prototype,
          i = n && Object.getOwnPropertyDescriptor,
          r = o(a, 'name'),
          o = r && 'something' === function () {}.name,
          a = r && (!n || i(a, 'name').configurable);
        t.exports = { EXISTS: r, PROPER: o, CONFIGURABLE: a };
      },
      13: (t, e, r) => {
        var n = r(338),
          o = r(722);
        t.exports = function (t, e) {
          return arguments.length < 2 ? ((r = n[t]), o(r) ? r : void 0) : n[t] && n[t][e];
          var r;
        };
      },
      877: (t, e, r) => {
        var n = r(423);
        t.exports = function (t, e) {
          e = t[e];
          return null == e ? void 0 : n(e);
        };
      },
      338: (t, e, r) => {
        function n(t) {
          return t && t.Math == Math && t;
        }
        t.exports =
          n('object' == typeof globalThis && globalThis) ||
          n('object' == typeof window && window) ||
          n('object' == typeof self && self) ||
          n('object' == typeof r.g && r.g) ||
          (function () {
            return this;
          })() ||
          Function('return this')();
      },
      90: (t, e, r) => {
        var n = r(428),
          o = {}.hasOwnProperty;
        t.exports =
          Object.hasOwn ||
          function (t, e) {
            return o.call(n(t), e);
          };
      },
      631: (t, e, r) => {
        var n = r(876),
          o = r(230),
          a = r(658);
        t.exports =
          !n &&
          !o(function () {
            return (
              7 !=
              Object.defineProperty(a('div'), 'a', {
                get: function () {
                  return 7;
                },
              }).a
            );
          });
      },
      722: (t) => {
        t.exports = function (t) {
          return 'function' == typeof t;
        };
      },
      810: (t, e, r) => {
        var n = r(722);
        t.exports = function (t) {
          return 'object' == typeof t ? null !== t : n(t);
        };
      },
      640: (t) => {
        t.exports = !1;
      },
      389: (t, e, r) => {
        var n = r(722),
          o = r(13),
          r = r(521);
        t.exports = r
          ? function (t) {
              return 'symbol' == typeof t;
            }
          : function (t) {
              var e = o('Symbol');
              return n(e) && Object(t) instanceof e;
            };
      },
      564: (t, e, r) => {
        var n = r(552),
          r = r(230);
        t.exports =
          !!Object.getOwnPropertySymbols &&
          !r(function () {
            var t = Symbol();
            return !String(t) || !(Object(t) instanceof Symbol) || (!Symbol.sham && n && n < 41);
          });
      },
      895: (t, e, r) => {
        var n = r(876),
          o = r(631),
          a = r(514),
          i = r(416),
          s = Object.defineProperty;
        e.f = n
          ? s
          : function (t, e, r) {
              if ((a(t), (e = i(e)), a(r), o))
                try {
                  return s(t, e, r);
                } catch (t) {}
              if ('get' in r || 'set' in r) throw TypeError('Accessors not supported');
              return 'value' in r && (t[e] = r.value), t;
            };
      },
      219: (t, e, r) => {
        var o = r(722),
          a = r(810);
        t.exports = function (t, e) {
          var r, n;
          if ('string' === e && o((r = t.toString)) && !a((n = r.call(t)))) return n;
          if (o((r = t.valueOf)) && !a((n = r.call(t)))) return n;
          if ('string' !== e && o((r = t.toString)) && !a((n = r.call(t)))) return n;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      627: (t) => {
        t.exports = function (t) {
          if (null == t) throw TypeError("Can't call method on " + t);
          return t;
        };
      },
      916: (t, e, r) => {
        var n = r(338);
        t.exports = function (e, r) {
          try {
            Object.defineProperty(n, e, { value: r, configurable: !0, writable: !0 });
          } catch (t) {
            n[e] = r;
          }
          return r;
        };
      },
      561: (t, e, r) => {
        var n = r(338),
          o = r(916),
          r = '__core-js_shared__',
          r = n[r] || o(r, {});
        t.exports = r;
      },
      665: (t, e, r) => {
        var n = r(640),
          o = r(561);
        (t.exports = function (t, e) {
          return o[t] || (o[t] = void 0 !== e ? e : {});
        })('versions', []).push({
          version: '3.18.2',
          mode: n ? 'pure' : 'global',
          copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
        });
      },
      428: (t, e, r) => {
        var n = r(627);
        t.exports = function (t) {
          return Object(n(t));
        };
      },
      367: (t, e, r) => {
        var n = r(810),
          o = r(389),
          a = r(877),
          i = r(219),
          s = r(411)('toPrimitive');
        t.exports = function (t, e) {
          if (!n(t) || o(t)) return t;
          var r = a(t, s);
          if (r) {
            if (((r = r.call(t, (e = void 0 === e ? 'default' : e))), !n(r) || o(r))) return r;
            throw TypeError("Can't convert object to primitive value");
          }
          return i(t, (e = void 0 === e ? 'number' : e));
        };
      },
      416: (t, e, r) => {
        var n = r(367),
          o = r(389);
        t.exports = function (t) {
          t = n(t, 'string');
          return o(t) ? t : String(t);
        };
      },
      392: (t) => {
        t.exports = function (t) {
          try {
            return String(t);
          } catch (t) {
            return 'Object';
          }
        };
      },
      113: (t) => {
        var e = 0,
          r = Math.random();
        t.exports = function (t) {
          return 'Symbol(' + String(void 0 === t ? '' : t) + ')_' + (++e + r).toString(36);
        };
      },
      521: (t, e, r) => {
        r = r(564);
        t.exports = r && !Symbol.sham && 'symbol' == typeof Symbol.iterator;
      },
      411: (t, e, r) => {
        var n = r(338),
          o = r(665),
          a = r(90),
          i = r(113),
          s = r(564),
          r = r(521),
          c = o('wks'),
          u = n.Symbol,
          l = r ? u : (u && u.withoutSetter) || i;
        t.exports = function (t) {
          return (
            (a(c, t) && (s || 'string' == typeof c[t])) ||
              (s && a(u, t) ? (c[t] = u[t]) : (c[t] = l('Symbol.' + t))),
            c[t]
          );
        };
      },
      481: (t, e, r) => {
        var n = r(876),
          o = r(843).EXISTS,
          a = r(895).f,
          r = Function.prototype,
          i = r.toString,
          s = /^\s*function ([^ (]*)/;
        n &&
          !o &&
          a(r, 'name', {
            configurable: !0,
            get: function () {
              try {
                return i.call(this).match(s)[1];
              } catch (t) {
                return '';
              }
            },
          });
      },
    },
    n = {};
  function c(t) {
    var e = n[t];
    if (void 0 !== e) return e.exports;
    e = n[t] = { exports: {} };
    return r[t](e, e.exports, c), e.exports;
  }
  (c.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return c.d(e, { a: e }), e;
  }),
    (c.d = (t, e) => {
      for (var r in e)
        c.o(e, r) && !c.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (c.g = (function () {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (t) {
        if ('object' == typeof window) return window;
      }
    })()),
    (c.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e));
  var u = {};
  (() => {
    'use strict';
    c.d(u, { default: () => s }), c(481);
    var t = function () {
      var r = this,
        t = r.$createElement,
        n = r._self._c || t;
      return n(
        'div',
        { staticClass: 'ctsj-buildv-package' },
        [
          n(
            'a-table',
            {
              attrs: { columns: r.columns, 'data-source': r.data },
              scopedSlots: r._u([
                {
                  key: 'name',
                  fn: function (t) {
                    return n('a', {}, [r._v(r._s(t))]);
                  },
                },
                {
                  key: 'tags',
                  fn: function (t) {
                    return n(
                      'span',
                      {},
                      r._l(t, function (t) {
                        return n(
                          'a-tag',
                          {
                            key: t,
                            attrs: {
                              color:
                                'loser' === t ? 'volcano' : 5 < t.length ? 'geekblue' : 'green',
                            },
                          },
                          [r._v(' ' + r._s(t.toUpperCase()) + ' ')],
                        );
                      }),
                      1,
                    );
                  },
                },
                {
                  key: 'action',
                  fn: function (t, e) {
                    return n(
                      'span',
                      {},
                      [
                        n('a', [r._v('Invite 一 ' + r._s(e.name))]),
                        n('a-divider', { attrs: { type: 'vertical' } }),
                        n('a', [r._v('Delete')]),
                        n('a-divider', { attrs: { type: 'vertical' } }),
                        n(
                          'a',
                          { staticClass: 'ant-dropdown-link' },
                          [r._v(' More actions '), n('a-icon', { attrs: { type: 'down' } })],
                          1,
                        ),
                      ],
                      1,
                    );
                  },
                },
              ]),
            },
            [
              n(
                'span',
                { attrs: { slot: 'customTitle' }, slot: 'customTitle' },
                [n('a-icon', { attrs: { type: 'smile-o' } }), r._v(' Name')],
                1,
              ),
            ],
          ),
        ],
        1,
      );
    };
    t._withStripped = !0;
    var e,
      r,
      n,
      o = require('moment'),
      a = c.n(o),
      t =
        ((e = {
          name: 'my-component',
          props: { data: { type: Array, default: [] } },
          data: function () {
            return {
              columns: [
                {
                  dataIndex: 'name',
                  key: 'name',
                  slots: { title: 'customTitle' },
                  scopedSlots: { customRender: 'name' },
                },
                { title: 'Age', dataIndex: 'age', key: 'age' },
                { title: 'Address', dataIndex: 'address', key: 'address' },
                {
                  title: 'Tags',
                  key: 'tags',
                  dataIndex: 'tags',
                  scopedSlots: { customRender: 'tags' },
                },
                { title: 'Action', key: 'action', scopedSlots: { customRender: 'action' } },
              ],
            };
          },
          computed: {
            time: function () {
              return a()().valueOf();
            },
          },
        }),
        (o = t),
        ((t = 'function' == typeof e ? e.options : e).render = o),
        (t.staticRenderFns = []),
        (t._compiled = !0),
        r &&
          (t.functional
            ? ((t._injectStyles = r),
              (n = t.render),
              (t.render = function (t, e) {
                return r.call(e), n(t, e);
              }))
            : ((o = t.beforeCreate), (t.beforeCreate = o ? [].concat(o, r) : [r]))),
        { exports: e, options: t });
    t.options.__file = 'CTSJ-BUILDV-PACKAGE/src/index.vue';
    const i = t.exports;
    i.install = function (t) {
      t.component(i.name, i);
    };
    const s = i;
  })(),
    (module.exports.index = u.default);
})();
//# sourceMappingURL=index.js.map
