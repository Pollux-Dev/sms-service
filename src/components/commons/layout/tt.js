(() => {
  var bi = Object.create;
  var ze = Object.defineProperty;
  var _i = Object.getOwnPropertyDescriptor;
  var Pi = Object.getOwnPropertyNames;
  var wi = Object.getPrototypeOf,
    Ei = Object.prototype.hasOwnProperty;
  var W = (t, e) => () => (t && (e = t((t = 0))), e);
  var Si = (t, e) => () => (
    e || t((e = { exports: {} }).exports, e), e.exports
  );
  var Ai = (t, e, i, r) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let s of Pi(e))
        !Ei.call(t, s) &&
          s !== i &&
          ze(t, s, {
            get: () => e[s],
            enumerable: !(r = _i(e, s)) || r.enumerable,
          });
    return t;
  };
  var Ti = (t, e, i) => (
    (i = t != null ? bi(wi(t)) : {}),
    Ai(
      e || !t || !t.__esModule
        ? ze(i, 'default', {
            value: t,
            enumerable: !0,
          })
        : i,
      t,
    )
  );
  var ee,
    ie,
    fe = W(() => {
      (ee = (t) => t === void 0), (ie = (t) => t.constructor === Array);
    });
  var B,
    et,
    pt,
    H,
    Ut = W(() => {
      fe();
      (B = (t, e = document) => e.querySelector(t)),
        (et = (t, e = document) => [...e.querySelectorAll(t)]),
        (pt = (t) => {
          let {
            top: e,
            right: i,
            bottom: r,
            left: s,
            width: a,
            height: l,
            x: m,
            y: d,
          } = t.getBoundingClientRect();
          return {
            top: e,
            right: i,
            bottom: r,
            left: s,
            width: a,
            height: l,
            x: m,
            y: d,
          };
        }),
        (H = (t) =>
          ee(t)
            ? []
            : t === window || t === document
            ? [t]
            : typeof t == 'string'
            ? et(t)
            : ie(t)
            ? t
            : [t]);
    });
  var pe,
    X,
    je = W(() => {
      Ut();
      (pe = class {
        constructor() {
          this.defaultOpts = { passive: !0, once: !1 };
        }

        add(e, i, r, s) {
          let a = H(e),
            l = s ? { ...this.defaultOpts, ...s } : this.defaultOpts;
          for (let m = a.length - 1; m >= 0; m--)
            a[m].addEventListener(i, r, l);
          return () => {
            this.remove(a, i, r);
          };
        }

        remove(e, i, r) {
          let s = H(e);
          for (let a = s.length - 1; a >= 0; a--)
            s[a].removeEventListener(i, r, !1);
        }
      }),
        (X = new pe());
    });
  var re = W(() => {
    je();
  });
  var ce,
    G,
    me = W(() => {
      (ce = class {
        constructor() {
          (this.uA = navigator.userAgent.toLowerCase()),
            (this.pf = navigator.platform.toLowerCase()),
            (this.safari = /^((?!chrome|android).)*safari/.test(this.uA)),
            (this.safariVersion = +(this.uA.match(
              /version\/[\d\.]+.*safari/,
            ) || ['-1'])[0]
              .replace(/^version\//, '')
              .replace(/ safari$/, '')),
            (this.firefox = this.uA.indexOf('firefox') > -1),
            (this.chrome = /chrome/.test(this.uA)),
            (this.ie = /msie|trident/.test(this.uA)),
            (this.webkit = /webkit/.test(this.uA)),
            (this.edge = /edge\/\d./.test(this.uA)),
            (this.ios = /ip(hone|[ao]d)/.test(this.uA)),
            (this.mac = this.pf.indexOf('mac') > -1),
            (this.windows = this.pf.indexOf('win') > -1),
            (this.android = /android/.test(this.uA)),
            (this.androidMobile = /android.*mobile/.test(this.uA)),
            (this.mobile =
              this.androidMobile ||
              this.ios ||
              (navigator.platform === 'MacIntel' &&
                1 < navigator.maxTouchPoints)),
            (this.touchDevice = 'ontouchstart' in window),
            (this.mutationObserver = 'MutationObserver' in window);
        }
      }),
        (G = new ce());
    });
  var Q,
    de = W(() => {
      Q = (t, e) => {
        for (let i of e) t[i] = t[i].bind(t);
      };
    });
  var Ne,
    ue,
    mt,
    qe = W(() => {
      re();
      me();
      de();
      (Ne = 0),
        (ue = class {
          constructor() {
            (this.train = []),
              (this.instance = {
                lastFrameTime: 0,
                nextFrame: null,
                targetFPS: 60,
              }),
              (this.targetDelta = 1e3 / this.instance.targetFPS),
              (this.delat = this.targetDelta),
              (this.maxDelta = this.targetDelta * 2),
              this.listeners(),
              Q(this, ['run', 'play', 'pause']),
              (this.paused = !0),
              this.play();
          }

          add({ update: e, begin: i, end: r }) {
            Ne++;
            let s = { id: Ne, update: e, begin: i, end: r };
            return this.train.push(s), s;
          }

          remove(e) {
            for (let i = this.train.length - 1; i >= 0; i--)
              if (this.train[i].id === e) {
                this.train.splice(i, 1);
                break;
              }
          }

          run(e = 0) {
            (this.delta = e - (this.instance.lastFrameTime || 0)),
              (this.instance.nextFrame = requestAnimationFrame(this.run)),
              (this.instance.lastFrameTime = e),
              (this.delta = Math.min(this.delta, this.maxDelta));
            for (let i = this.train.length - 1; i >= 0; i--) {
              let r = this.train[i];
              r.update && r.update(this.delta, e);
            }
          }

          pause() {
            this.paused ||
              !this.instance ||
              (cancelAnimationFrame(this.instance.nextFrame),
              (this.instance.nextFrame = null),
              (this.paused = !0));
          }

          play() {
            !this.paused ||
              ((this.paused = !1),
              (this.instance.lastFrameTime = performance.now()),
              (this.instance.nextFrame = requestAnimationFrame(this.run)));
          }

          listeners() {
            X.add(document, 'visibilitychange', () => {
              document.visibilityState === 'hidden'
                ? this.pause()
                : this.play();
            }),
              !G.safari && X.add(window, 'pagehide', this.pause);
          }
        }),
        (mt = new ue());
    });
  var Ot,
    Nt,
    Bt,
    We = W(() => {
      (Ot = (t, e, i) => (1 - i) * t + i * e),
        (Nt = (t, e, i) => Math.min(Math.max(e, t), i)),
        (Bt = (t, e = 1e3) => Math.round(t * e) / e);
    });
  var qt,
    He = W(() => {
      Ut();
      qt = () => ({
        create: (e) => {
          let i = (s, a) => {
              s.forEach((l) => {
                let m = (d) => a.unobserve(d);
                e.callback(l.target, l.isIntersecting, m, l);
              });
            },
            r = new IntersectionObserver(i, {
              root: null,
              rootMargin: `${e.offset || '0px'}`,
              threshold: e.threshold || 0,
            });
          return {
            observe: (s) => {
              H(s).forEach((l) => {
                r.observe(l);
              });
            },
            disconnect: () => r.disconnect(),
          };
        },
      });
    });
  var $t,
    ye = W(() => {
      $t = { images: {}, textures: {} };
    });
  var se,
    Xe = W(() => {
      ye();
      se = ({ arr: t, update: e, complete: i }) => {
        let r = t.length;
        if (r === 0) {
          e && e(null, 0, 100), i && i([]);
          return;
        }
        let s = 0,
          a = new Array(r),
          l = new Array(r);
        t.forEach((m, d) => {
          let g;
          if ($t.images[m])
            return (g = $t.images[m]), e && e(g, d, (++s / r) * 100), g;
          {
            (g = new Image()), ($t.images[m] = g), (g.src = m);
            let x = g
              .decode()
              .catch((b) => {
                console.log(b, m);
              })
              .finally(() => {
                e && e(g, d, (++s / r) * 100), (l[d] = g);
              });
            a[d] = x;
          }
        }),
          Promise.all(a).then(() => {
            i && i(l);
          });
      };
    });
  var Wt,
    Ye = W(() => {
      ye();
      Ut();
      Wt = class {
        constructor(e = '[data-lazy-src]:not(.media-ready)') {
          (this.els = H(e)), this.load();
        }

        async load() {
          await Promise.all(
            this.els.map(async (e) => {
              if (((e.decoding = 'async'), $t[e.dataset.lazySrc]))
                e = $t[e.dataset.lazySrc];
              else {
                e.src = e.dataset.lazySrc;
                try {
                  await e.decode(), ($t.images[e.src] = e);
                } catch {}
              }
              e.classList.add('media-ready');
            }),
          );
        }
      };
    });
  var ae,
    Ke = W(() => {
      ae = ({ delay: t = 200, update: e, onlyAtEnd: i = !1 }) => {
        let r = 0,
          s = 0;
        return () => {
          let a = !0,
            l = performance.now();
          (r && l < r + t) || a
            ? ((a = !1),
              clearTimeout(s),
              (s = setTimeout(() => {
                (r = l), e();
              }, t)))
            : ((r = l), i || ((a = !1), e()));
        };
      };
    });
  var Ue = W(() => {});
  var Ht = W(() => {
    Ut();
    fe();
    We();
    de();
    He();
    Xe();
    Ye();
    me();
    Ke();
    Ue();
  });
  var ge,
    It,
    Ze = W(() => {
      Ht();
      re();
      (ge = class {
        constructor() {
          (this.train = []),
            Q(this, ['update']),
            (this.throttledUpdate = ae({
              update: this.update,
              onlyAtEnd: !0,
            })),
            this.listen();
        }

        add({ update: e }) {
          return (
            this.train.push(e),
            () => {
              this.train.splice(this.train.length, 1);
            }
          );
        }

        listen() {
          let e = G.mobile ? 'orientationchange' : 'resize';
          X.add(window, e, this.throttledUpdate);
        }

        update() {
          let e = { vw: window.innerWidth, vh: window.innerHeight },
            i = this.train.length;
          for (let r = 0; r < i; r++) this.train[r](e);
        }
      }),
        (It = new ge());
    });
  var ve = W(() => {
    qe();
    Ze();
  });
  var ne,
    xe = W(() => {
      ne = {
        linear: (t) => t,
        i1: (t) => -Math.cos(t * (Math.PI / 2)) + 1,
        o1: (t) => Math.sin(t * (Math.PI / 2)),
        io1: (t) => -0.5 * (Math.cos(Math.PI * t) - 1),
        i2: (t) => t * t,
        o2: (t) => t * (2 - t),
        io2: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        i3: (t) => t * t * t,
        o3: (t) => --t * t * t + 1,
        io3: (t) =>
          t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        i4: (t) => t * t * t * t,
        o4: (t) => 1 - --t * t * t * t,
        io4: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
        i5: (t) => t * t * t * t * t,
        o5: (t) => 1 + --t * t * t * t * t,
        io5: (t) =>
          t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
        i6: (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
        o6: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        io6: (t) =>
          t === 0
            ? 0
            : t === 1
            ? 1
            : (t /= 0.5) < 1
            ? 0.5 * Math.pow(2, 10 * (t - 1))
            : 0.5 * (-Math.pow(2, -10 * --t) + 2),
      };
    });
  var dt,
    ke = W(() => {
      ve();
      Ht();
      dt = class {
        constructor({ duration: e, update: i, complete: r, reverse: s = !1 }) {
          (this.config = {
            complete: r,
            update: i,
            duration: e,
            reverse: s,
          }),
            Q(this, ['init', 'run', 'play', 'pause', 'destroy', 'restart']),
            this.init();
        }

        init() {
          (this.completed = !1),
            (this.elapsed = this.config.reverse ? this.config.duration : 0),
            (this.progress = this.config.reverse ? 1 : 0),
            (this.paused = !0),
            this.play();
        }

        run(e = mt.delta) {
          let i = this.config;
          (this.progress >= 1 && !i.reverse) ||
          (this.progress <= 0 && i.reverse)
            ? ((this.completed = !0),
              i.complete && i.complete(),
              this.destroy())
            : ((this.elapsed += i.reverse ? -e : e),
              (this.progress = Nt(this.elapsed / i.duration, 0, 1)),
              i.update &&
                i.update({
                  progress: this.progress,
                  elapsed: this.elapsed,
                }));
        }

        play() {
          if (!this.paused) return;
          this.paused = !1;
          let e = mt.add({ update: this.run });
          this.id = e.id;
        }

        pause() {
          this.paused || ((this.paused = !0), mt.remove(this.id));
        }

        restart() {
          this.destroy(), this.init();
        }

        reverse() {
          this.config.reverse = !this.config.reverse;
        }

        destroy() {
          this.pause();
        }
      };
    });
  var Xt,
    be = W(() => {
      Xt = class {
        constructor({
          x: e = null,
          y: i = null,
          xu: r = 'px',
          yu: s = 'px',
          sx: a = null,
          sy: l = null,
          r: m = null,
        }) {
          (this.props = { x: e, xu: r, y: i, yu: s, sx: a, sy: l, r: m }),
            (this.flags = {
              t: !1,
              s: !1,
              r: !1,
            }),
            this.setFlags(),
            this.setTransform(this.props);
        }

        setFlags() {
          let { x: e, y: i, sx: r, sy: s, r: a } = this.props;
          (e || i || e === 0 || i === 0) &&
            (!e && e !== 0 && (this.props.x = 0),
            !i && i !== 0 && (this.props.y = 0),
            (this.flags.t = !0)),
            (r || s || r === 0 || s === 0) &&
              (!r && r !== 0 && (this.props.sx = 1),
              !s && s !== 0 && (this.props.sy = 1),
              (this.flags.s = !0)),
            a &&
              (!a[0] && a[0] !== 0 && (this.props.r[0] = 0),
              !a[1] && a[1] !== 0 && (this.props.r[1] = 0),
              !a[2] && a[2] !== 0 && (this.props.r[2] = 0),
              !a[3] && a[3] !== 0 && (this.props.r[3] = 0),
              (this.flags.r = !0));
        }

        setTransform(e) {
          if (
            (Object.assign(this.props, e), (this.transform = ''), this.flags.t)
          ) {
            let { x: i, y: r, xu: s, yu: a } = this.props;
            this.transform += `translate3d(${i}${s}, ${r}${a}, 0) `;
          }
          if (
            (this.flags.s &&
              (this.transform += `scale3d(${this.props.sx}, ${this.props.sy}, 1) `),
            this.flags.r)
          ) {
            let { rx: i, ry: r, rz: s, rv: a } = e;
            this.transform += `rotate3d(${i}, ${r}, ${s}, ${a}deg)`;
          }
        }

        convert2d() {
          let { x: e, y: i, sx: r, sy: s, xu: a, yu: l, rv: m } = this.props;
          (this.transform = ''),
            this.flags.t &&
              (e === 0 && i === 0 && !this.flags.s && !this.flags.r
                ? (this.transform = 'none')
                : (this.transform = `translate(${e}${a}, ${i}${l})`)),
            this.flags.s && (this.transform += ` scale(${r}, ${s})`),
            this.flags.r && m !== 0 && (this.transform += ` rotate(${m}deg)`);
        }

        destroy() {
          this.transform = null;
        }
      };
    });
  var Yt,
    oe,
    z,
    Ft,
    lt,
    _e = W(() => {
      Ht();
      xe();
      ke();
      be();
      (Yt = ({
        vals: t,
        duration: e,
        easing: i = 'linear',
        update: r,
        complete: s,
        reverse: a,
      }) => {
        let l = ne[i],
          m = 0,
          d = new Float32Array(t.length);
        return new dt({
          duration: e,
          update: ({ progress: g }) => {
            m = l(g);
            for (let x = t.length - 1; x >= 0; x--) {
              let b = t[x];
              b[0] === b[1] ? (d[x] = b[0]) : (d[x] = Ot(b[0], b[1], m));
            }
            r({ progress: g, cur: d });
          },
          complete: s,
          reverse: a,
        });
      }),
        (oe = ({ val: t, duration: e, easing: i, update: r, complete: s }) =>
          Yt({
            duration: e,
            vals: [t],
            easing: i,
            update: ({ progress: a, cur: l }) => {
              r({ progress: a, cur: l[0] });
            },
            complete: s,
          })),
        (z = class {
          constructor({
            targets: e = null,
            transform: i = null,
            opacity: r = null,
            duration: s = 0,
            delay: a = 0,
            easing: l = 'linear',
            begin: m = null,
            complete: d = null,
            update: g = null,
            autoplay: x = !0,
            reverse: b = !1,
          }) {
            (e = H(e)),
              (this.config = {
                targets: e,
                duration: s,
                easing: l,
                begin: m,
                update: g,
                complete: d,
                transform: i,
                opacity: r,
                delay: a,
                autoplay: x,
                reverse: b,
              }),
              (this.flags = { t: !!i, o: !!r }),
              this.init();
          }

          init() {
            if (
              (Q(this, [
                'run',
                'restart',
                'pause',
                'play',
                'reverse',
                'destroy',
              ]),
              this.flags.t)
            ) {
              let e = this.config.transform,
                i = e.x && e.x[0],
                r = e.y && e.y[0],
                s = e.r && e.r[0];
              this.t3d = new Xt({ ...e, x: i, y: r, r: s, sx: e.sx, sy: e.sy });
            }
            this.flags.o && (this.o = this.config.opacity),
              this.setupProps(),
              this.start();
          }

          setupProps() {
            let e = [],
              i = [],
              r = this.config.transform;
            if (this.flags.t) {
              let s = this.t3d.flags;
              s.t &&
                (r.x && (e.push('x'), i.push(new Float32Array(r.x))),
                r.y && (e.push('y'), i.push(new Float32Array(r.y)))),
                s.s &&
                  (r.sx && (e.push('sx'), i.push(new Float32Array(r.sx))),
                  r.sy && (e.push('sy'), i.push(new Float32Array(r.sy)))),
                s.r &&
                  (e.push('rx'),
                  i.push(new Float32Array([r.r[0][0], r.r[1][0]])),
                  e.push('ry'),
                  i.push(new Float32Array([r.r[0][1], r.r[1][1]])),
                  e.push('rz'),
                  i.push(new Float32Array([r.r[0][2], r.r[1][2]])),
                  e.push('rv'),
                  i.push(new Float32Array([r.r[0][3], r.r[1][3]])));
            }
            this.flags.o &&
              (e.push('o'), i.push(new Float32Array(this.config.opacity))),
              (this.keys = e),
              (this.vals = i),
              (this.props = {}),
              (this.cur = []),
              i.forEach((s, a) => {
                this.cur[a] = s[0];
              });
          }

          start(e = {}) {
            let i = this.config;
            (this.tweens = Yt({
              vals: e.vals || this.vals,
              duration: i.duration,
              easing: i.easing,
              update: this.run,
              complete: () => {
                i.complete && i.complete(), this.destroy();
              },
            })),
              this.tweens.pause(),
              (this.delay = new dt({
                duration: i.delay,
                complete: () => {
                  this.tweens.play(), i.begin && i.begin();
                },
              })),
              i.autoplay || this.delay.pause();
          }

          run(
            { progress: e, cur: i } = {
              progress: this.progress,
              cur: this.cur,
            },
          ) {
            i && (this.cur = i),
              this.keys.forEach((r, s) => {
                this.props[r] = Bt(this.cur[s]);
              }),
              this.flags.t && this.t3d.setTransform(this.props);
            for (let r of this.config.targets) {
              let s = r.style;
              this.flags.t && (s.transform = this.t3d.transform),
                this.flags.o && (s.opacity = this.props.o);
            }
            this.config.update &&
              this.config.update({ progress: e, props: this.props });
          }

          unset3d() {
            if (!!this.flags.t) {
              this.t3d.convert2d();
              for (let e of this.config.targets)
                e.style.transform = this.t3d.transform;
            }
          }

          restart() {
            this.destroy(), this.start();
          }

          pause() {
            this.delay.pause(), this.tweens.pause();
          }

          play() {
            this.delay.play(), this.tweens.play();
          }

          reconfigure(e = {}) {
            Object.assign(this.config, e);
          }

          reverse(e = {}) {
            this.tweens.destroy(), this.reconfigure(e);
            let i = this.config;
            i.reverse = !i.reverse;
            let r = i.reverse ? 0 : 1,
              s = new Array(this.vals.length);
            for (let a = this.vals.length - 1; a >= 0; a--)
              s[a] = [this.cur[a], this.vals[a][r]];
            this.start({ vals: s });
          }

          destroy() {
            this.delay.destroy(),
              this.tweens.destroy(),
              this.unset3d(),
              this.t3d && this.t3d.destroy();
          }
        }),
        (Ft = class {
          constructor(e) {
            this.train = [];
          }

          add(e) {
            return this.train.push(e), e;
          }

          do(e, i) {
            this.train.forEach((r) => r[e](i));
          }
        }),
        (lt = class extends Ft {
          constructor(e) {
            super(), (this.delay = 0), (this.defaults = e || {});
          }

          add(e) {
            e = { ...this.defaults, ...e };
            let i = new z(e);
            return this.train.push(i), i;
          }

          play() {
            this.do('play');
          }

          pause() {
            this.do('pause');
          }
        });
    });
  var Gt,
    Qe = W(() => {
      _e();
      Ht();
      Gt = ({
        targets: t,
        invert: e,
        duration: i,
        easing: r,
        begin: s,
        update: a,
        complete: l,
        reverse: m,
      }) => {
        let d = H(t),
          g = [];
        d.forEach((u) => {
          g.push(...et('path', u));
        }),
          (d = g);
        let x = d.length,
          b = new Float32Array(x),
          y = [];
        for (let u = 0; u < x; u++) {
          let k = d[u],
            f = k.getTotalLength();
          (b[u] = f),
            (k.style.strokeDasharray = f),
            (k.style.strokeDashoffset = f),
            e ? y.push([0, f]) : y.push([-f, 0]);
        }
        return (
          s && s(),
          Yt({
            vals: y,
            duration: i,
            easing: r,
            reverse: m,
            complete: l,
            update: ({ cur: u }) => {
              for (let k = 0; k < x; k++) d[k].style.strokeDashoffset = u[k];
              a && a({ cur: u });
            },
          })
        );
      };
    });
  var Je = W(() => {
    _e();
    Qe();
    xe();
    ke();
    be();
  });
  var rt = W(() => {
    ve();
    re();
    Je();
    Ht();
  });
  var ii = Si((ei, Qt) => {
    rt();
    typeof navigator < 'u' &&
      (function (t, e) {
        typeof define == 'function' && define.amd
          ? define(function () {
              return e(t);
            })
          : typeof Qt == 'object' && Qt.exports
          ? (Qt.exports = e(t))
          : ((t.lottie = e(t)), (t.bodymovin = t.lottie));
      })(window || {}, function (window) {
        'use strict';
        var svgNS = 'http://www.w3.org/2000/svg',
          locationHref = '',
          initialDefaultFrame = -999999,
          subframeEnabled = !0,
          expressionsPlugin,
          isSafari = G.safari,
          cachedColors = {},
          bmRnd,
          bmPow = Math.pow,
          bmSqrt = Math.sqrt,
          bmFloor = Math.floor,
          bmMax = Math.max,
          bmMin = Math.min,
          BMMath = {};
        (function () {
          var t = [
              'abs',
              'acos',
              'acosh',
              'asin',
              'asinh',
              'atan',
              'atanh',
              'atan2',
              'ceil',
              'cbrt',
              'expm1',
              'clz32',
              'cos',
              'cosh',
              'exp',
              'floor',
              'fround',
              'hypot',
              'imul',
              'log',
              'log1p',
              'log2',
              'log10',
              'max',
              'min',
              'pow',
              'random',
              'round',
              'sign',
              'sin',
              'sinh',
              'sqrt',
              'tan',
              'tanh',
              'trunc',
              'E',
              'LN10',
              'LN2',
              'LOG10E',
              'LOG2E',
              'PI',
              'SQRT1_2',
              'SQRT2',
            ],
            e,
            i = t.length;
          for (e = 0; e < i; e += 1) BMMath[t[e]] = Math[t[e]];
        })();

        function ProjectInterface() {
          return {};
        }

        (BMMath.random = Math.random),
          (BMMath.abs = function (t) {
            var e = typeof t;
            if (e === 'object' && t.length) {
              var i = createSizedArray(t.length),
                r,
                s = t.length;
              for (r = 0; r < s; r += 1) i[r] = Math.abs(t[r]);
              return i;
            }
            return Math.abs(t);
          });
        var defaultCurveSegments = 150,
          degToRads = Math.PI / 180,
          roundCorner = 0.5519;

        function roundValues(t) {
          t
            ? (bmRnd = Math.round)
            : (bmRnd = function (e) {
                return e;
              });
        }

        roundValues(!1);

        function styleDiv(t) {
          (t.style.position = 'absolute'),
            (t.style.top = 0),
            (t.style.left = 0),
            (t.style.display = 'block'),
            (t.style.transformOrigin = '0 0'),
            (t.style.webkitTransformOrigin = '0 0'),
            (t.style.backfaceVisibility = 'visible'),
            (t.style.webkitBackfaceVisibility = 'visible'),
            (t.style.transformStyle = 'preserve-3d'),
            (t.style.webkitTransformStyle = 'preserve-3d'),
            (t.style.mozTransformStyle = 'preserve-3d');
        }

        function BMEnterFrameEvent(t, e, i, r) {
          (this.type = t),
            (this.currentTime = e),
            (this.totalTime = i),
            (this.direction = r < 0 ? -1 : 1);
        }

        function BMCompleteEvent(t, e) {
          (this.type = t), (this.direction = e < 0 ? -1 : 1);
        }

        function BMCompleteLoopEvent(t, e, i, r) {
          (this.type = t),
            (this.currentLoop = i),
            (this.totalLoops = e),
            (this.direction = r < 0 ? -1 : 1);
        }

        function BMSegmentStartEvent(t, e, i) {
          (this.type = t), (this.firstFrame = e), (this.totalFrames = i);
        }

        function BMDestroyEvent(t, e) {
          (this.type = t), (this.target = e);
        }

        function BMRenderFrameErrorEvent(t, e) {
          (this.type = 'renderFrameError'),
            (this.nativeError = t),
            (this.currentTime = e);
        }

        function BMConfigErrorEvent(t) {
          (this.type = 'configError'), (this.nativeError = t);
        }

        function BMAnimationConfigErrorEvent(t, e) {
          (this.type = t), (this.nativeError = e);
        }

        var createElementID = (function () {
          var t = 0;
          return function () {
            return (t += 1), '__lottie_element_' + t;
          };
        })();

        function HSVtoRGB(t, e, i) {
          var r, s, a, l, m, d, g, x;
          switch (
            ((l = Math.floor(t * 6)),
            (m = t * 6 - l),
            (d = i * (1 - e)),
            (g = i * (1 - m * e)),
            (x = i * (1 - (1 - m) * e)),
            l % 6)
          ) {
            case 0:
              (r = i), (s = x), (a = d);
              break;
            case 1:
              (r = g), (s = i), (a = d);
              break;
            case 2:
              (r = d), (s = i), (a = x);
              break;
            case 3:
              (r = d), (s = g), (a = i);
              break;
            case 4:
              (r = x), (s = d), (a = i);
              break;
            case 5:
              (r = i), (s = d), (a = g);
              break;
            default:
              break;
          }
          return [r, s, a];
        }

        function RGBtoHSV(t, e, i) {
          var r = Math.max(t, e, i),
            s = Math.min(t, e, i),
            a = r - s,
            l,
            m = r === 0 ? 0 : a / r,
            d = r / 255;
          switch (r) {
            case s:
              l = 0;
              break;
            case t:
              (l = e - i + a * (e < i ? 6 : 0)), (l /= 6 * a);
              break;
            case e:
              (l = i - t + a * 2), (l /= 6 * a);
              break;
            case i:
              (l = t - e + a * 4), (l /= 6 * a);
              break;
            default:
              break;
          }
          return [l, m, d];
        }

        function addSaturationToRGB(t, e) {
          var i = RGBtoHSV(t[0] * 255, t[1] * 255, t[2] * 255);
          return (
            (i[1] += e),
            i[1] > 1 ? (i[1] = 1) : i[1] <= 0 && (i[1] = 0),
            HSVtoRGB(i[0], i[1], i[2])
          );
        }

        function addBrightnessToRGB(t, e) {
          var i = RGBtoHSV(t[0] * 255, t[1] * 255, t[2] * 255);
          return (
            (i[2] += e),
            i[2] > 1 ? (i[2] = 1) : i[2] < 0 && (i[2] = 0),
            HSVtoRGB(i[0], i[1], i[2])
          );
        }

        function addHueToRGB(t, e) {
          var i = RGBtoHSV(t[0] * 255, t[1] * 255, t[2] * 255);
          return (
            (i[0] += e / 360),
            i[0] > 1 ? (i[0] -= 1) : i[0] < 0 && (i[0] += 1),
            HSVtoRGB(i[0], i[1], i[2])
          );
        }

        var rgbToHex = (function () {
          var t = [],
            e,
            i;
          for (e = 0; e < 256; e += 1)
            (i = e.toString(16)), (t[e] = i.length === 1 ? '0' + i : i);
          return function (r, s, a) {
            return (
              r < 0 && (r = 0),
              s < 0 && (s = 0),
              a < 0 && (a = 0),
              '#' + t[r] + t[s] + t[a]
            );
          };
        })();

        function BaseEvent() {}

        BaseEvent.prototype = {
          triggerEvent: function (t, e) {
            if (this._cbs[t])
              for (var i = this._cbs[t].length, r = 0; r < i; r += 1)
                this._cbs[t][r](e);
          },
          addEventListener: function (t, e) {
            return (
              this._cbs[t] || (this._cbs[t] = []),
              this._cbs[t].push(e),
              function () {
                this.removeEventListener(t, e);
              }.bind(this)
            );
          },
          removeEventListener: function (t, e) {
            if (!e) this._cbs[t] = null;
            else if (this._cbs[t]) {
              for (var i = 0, r = this._cbs[t].length; i < r; )
                this._cbs[t][i] === e &&
                  (this._cbs[t].splice(i, 1), (i -= 1), (r -= 1)),
                  (i += 1);
              this._cbs[t].length || (this._cbs[t] = null);
            }
          },
        };
        var createTypedArray = (function () {
          function t(i, r) {
            var s = 0,
              a = [],
              l;
            switch (i) {
              case 'int16':
              case 'uint8c':
                l = 1;
                break;
              default:
                l = 1.1;
                break;
            }
            for (s = 0; s < r; s += 1) a.push(l);
            return a;
          }

          function e(i, r) {
            return i === 'float32'
              ? new Float32Array(r)
              : i === 'int16'
              ? new Int16Array(r)
              : i === 'uint8c'
              ? new Uint8ClampedArray(r)
              : t(i, r);
          }

          return typeof Uint8ClampedArray == 'function' &&
            typeof Float32Array == 'function'
            ? e
            : t;
        })();

        function createSizedArray(t) {
          return Array.apply(null, { length: t });
        }

        function createTag(t) {
          return document.createElement(t);
        }

        function DynamicPropertyContainer() {}

        DynamicPropertyContainer.prototype = {
          addDynamicProperty: function (t) {
            this.dynamicProperties.indexOf(t) === -1 &&
              (this.dynamicProperties.push(t),
              this.container.addDynamicProperty(this),
              (this._isAnimated = !0));
          },
          iterateDynamicProperties: function () {
            this._mdf = !1;
            var t,
              e = this.dynamicProperties.length;
            for (t = 0; t < e; t += 1)
              this.dynamicProperties[t].getValue(),
                this.dynamicProperties[t]._mdf && (this._mdf = !0);
          },
          initDynamicPropertyContainer: function (t) {
            (this.container = t),
              (this.dynamicProperties = []),
              (this._mdf = !1),
              (this._isAnimated = !1);
          },
        };
        var getBlendMode = (function () {
          var t = {
            0: 'source-over',
            1: 'multiply',
            2: 'screen',
            3: 'overlay',
            4: 'darken',
            5: 'lighten',
            6: 'color-dodge',
            7: 'color-burn',
            8: 'hard-light',
            9: 'soft-light',
            10: 'difference',
            11: 'exclusion',
            12: 'hue',
            13: 'saturation',
            14: 'color',
            15: 'luminosity',
          };
          return function (e) {
            return t[e] || '';
          };
        })();
        var Matrix = (function () {
          var t = Math.cos,
            e = Math.sin,
            i = Math.tan,
            r = Math.round;

          function s() {
            return (
              (this.props[0] = 1),
              (this.props[1] = 0),
              (this.props[2] = 0),
              (this.props[3] = 0),
              (this.props[4] = 0),
              (this.props[5] = 1),
              (this.props[6] = 0),
              (this.props[7] = 0),
              (this.props[8] = 0),
              (this.props[9] = 0),
              (this.props[10] = 1),
              (this.props[11] = 0),
              (this.props[12] = 0),
              (this.props[13] = 0),
              (this.props[14] = 0),
              (this.props[15] = 1),
              this
            );
          }

          function a(S) {
            if (S === 0) return this;
            var _ = t(S),
              A = e(S);
            return this._t(_, -A, 0, 0, A, _, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }

          function l(S) {
            if (S === 0) return this;
            var _ = t(S),
              A = e(S);
            return this._t(1, 0, 0, 0, 0, _, -A, 0, 0, A, _, 0, 0, 0, 0, 1);
          }

          function m(S) {
            if (S === 0) return this;
            var _ = t(S),
              A = e(S);
            return this._t(_, 0, A, 0, 0, 1, 0, 0, -A, 0, _, 0, 0, 0, 0, 1);
          }

          function d(S) {
            if (S === 0) return this;
            var _ = t(S),
              A = e(S);
            return this._t(_, -A, 0, 0, A, _, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }

          function g(S, _) {
            return this._t(1, _, S, 1, 0, 0);
          }

          function x(S, _) {
            return this.shear(i(S), i(_));
          }

          function b(S, _) {
            var A = t(_),
              L = e(_);
            return this._t(A, L, 0, 0, -L, A, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
              ._t(1, 0, 0, 0, i(S), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
              ._t(A, -L, 0, 0, L, A, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }

          function y(S, _, A) {
            return (
              !A && A !== 0 && (A = 1),
              S === 1 && _ === 1 && A === 1
                ? this
                : this._t(S, 0, 0, 0, 0, _, 0, 0, 0, 0, A, 0, 0, 0, 0, 1)
            );
          }

          function u(S, _, A, L, T, q, j, N, U, J, st, ht, ct, it, Z, ft) {
            return (
              (this.props[0] = S),
              (this.props[1] = _),
              (this.props[2] = A),
              (this.props[3] = L),
              (this.props[4] = T),
              (this.props[5] = q),
              (this.props[6] = j),
              (this.props[7] = N),
              (this.props[8] = U),
              (this.props[9] = J),
              (this.props[10] = st),
              (this.props[11] = ht),
              (this.props[12] = ct),
              (this.props[13] = it),
              (this.props[14] = Z),
              (this.props[15] = ft),
              this
            );
          }

          function k(S, _, A) {
            return (
              (A = A || 0),
              S !== 0 || _ !== 0 || A !== 0
                ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, S, _, A, 1)
                : this
            );
          }

          function f(S, _, A, L, T, q, j, N, U, J, st, ht, ct, it, Z, ft) {
            var O = this.props;
            if (
              S === 1 &&
              _ === 0 &&
              A === 0 &&
              L === 0 &&
              T === 0 &&
              q === 1 &&
              j === 0 &&
              N === 0 &&
              U === 0 &&
              J === 0 &&
              st === 1 &&
              ht === 0
            )
              return (
                (O[12] = O[12] * S + O[15] * ct),
                (O[13] = O[13] * q + O[15] * it),
                (O[14] = O[14] * st + O[15] * Z),
                (O[15] *= ft),
                (this._identityCalculated = !1),
                this
              );
            var Y = O[0],
              St = O[1],
              Vt = O[2],
              At = O[3],
              wt = O[4],
              Tt = O[5],
              Ct = O[6],
              ot = O[7],
              Lt = O[8],
              Dt = O[9],
              bt = O[10],
              Rt = O[11],
              _t = O[12],
              jt = O[13],
              Jt = O[14],
              te = O[15];
            return (
              (O[0] = Y * S + St * T + Vt * U + At * ct),
              (O[1] = Y * _ + St * q + Vt * J + At * it),
              (O[2] = Y * A + St * j + Vt * st + At * Z),
              (O[3] = Y * L + St * N + Vt * ht + At * ft),
              (O[4] = wt * S + Tt * T + Ct * U + ot * ct),
              (O[5] = wt * _ + Tt * q + Ct * J + ot * it),
              (O[6] = wt * A + Tt * j + Ct * st + ot * Z),
              (O[7] = wt * L + Tt * N + Ct * ht + ot * ft),
              (O[8] = Lt * S + Dt * T + bt * U + Rt * ct),
              (O[9] = Lt * _ + Dt * q + bt * J + Rt * it),
              (O[10] = Lt * A + Dt * j + bt * st + Rt * Z),
              (O[11] = Lt * L + Dt * N + bt * ht + Rt * ft),
              (O[12] = _t * S + jt * T + Jt * U + te * ct),
              (O[13] = _t * _ + jt * q + Jt * J + te * it),
              (O[14] = _t * A + jt * j + Jt * st + te * Z),
              (O[15] = _t * L + jt * N + Jt * ht + te * ft),
              (this._identityCalculated = !1),
              this
            );
          }

          function h() {
            return (
              this._identityCalculated ||
                ((this._identity = !(
                  this.props[0] !== 1 ||
                  this.props[1] !== 0 ||
                  this.props[2] !== 0 ||
                  this.props[3] !== 0 ||
                  this.props[4] !== 0 ||
                  this.props[5] !== 1 ||
                  this.props[6] !== 0 ||
                  this.props[7] !== 0 ||
                  this.props[8] !== 0 ||
                  this.props[9] !== 0 ||
                  this.props[10] !== 1 ||
                  this.props[11] !== 0 ||
                  this.props[12] !== 0 ||
                  this.props[13] !== 0 ||
                  this.props[14] !== 0 ||
                  this.props[15] !== 1
                )),
                (this._identityCalculated = !0)),
              this._identity
            );
          }

          function p(S) {
            for (var _ = 0; _ < 16; ) {
              if (S.props[_] !== this.props[_]) return !1;
              _ += 1;
            }
            return !0;
          }

          function n(S) {
            var _;
            for (_ = 0; _ < 16; _ += 1) S.props[_] = this.props[_];
            return S;
          }

          function o(S) {
            var _;
            for (_ = 0; _ < 16; _ += 1) this.props[_] = S[_];
          }

          function c(S, _, A) {
            return {
              x:
                S * this.props[0] +
                _ * this.props[4] +
                A * this.props[8] +
                this.props[12],
              y:
                S * this.props[1] +
                _ * this.props[5] +
                A * this.props[9] +
                this.props[13],
              z:
                S * this.props[2] +
                _ * this.props[6] +
                A * this.props[10] +
                this.props[14],
            };
          }

          function v(S, _, A) {
            return (
              S * this.props[0] +
              _ * this.props[4] +
              A * this.props[8] +
              this.props[12]
            );
          }

          function w(S, _, A) {
            return (
              S * this.props[1] +
              _ * this.props[5] +
              A * this.props[9] +
              this.props[13]
            );
          }

          function P(S, _, A) {
            return (
              S * this.props[2] +
              _ * this.props[6] +
              A * this.props[10] +
              this.props[14]
            );
          }

          function E() {
            var S =
                this.props[0] * this.props[5] - this.props[1] * this.props[4],
              _ = this.props[5] / S,
              A = -this.props[1] / S,
              L = -this.props[4] / S,
              T = this.props[0] / S,
              q =
                (this.props[4] * this.props[13] -
                  this.props[5] * this.props[12]) /
                S,
              j =
                -(
                  this.props[0] * this.props[13] -
                  this.props[1] * this.props[12]
                ) / S,
              N = new Matrix();
            return (
              (N.props[0] = _),
              (N.props[1] = A),
              (N.props[4] = L),
              (N.props[5] = T),
              (N.props[12] = q),
              (N.props[13] = j),
              N
            );
          }

          function C(S) {
            var _ = this.getInverseMatrix();
            return _.applyToPointArray(S[0], S[1], S[2] || 0);
          }

          function F(S) {
            var _,
              A = S.length,
              L = [];
            for (_ = 0; _ < A; _ += 1) L[_] = C(S[_]);
            return L;
          }

          function V(S, _, A) {
            var L = createTypedArray('float32', 6);
            if (this.isIdentity())
              (L[0] = S[0]),
                (L[1] = S[1]),
                (L[2] = _[0]),
                (L[3] = _[1]),
                (L[4] = A[0]),
                (L[5] = A[1]);
            else {
              var T = this.props[0],
                q = this.props[1],
                j = this.props[4],
                N = this.props[5],
                U = this.props[12],
                J = this.props[13];
              (L[0] = S[0] * T + S[1] * j + U),
                (L[1] = S[0] * q + S[1] * N + J),
                (L[2] = _[0] * T + _[1] * j + U),
                (L[3] = _[0] * q + _[1] * N + J),
                (L[4] = A[0] * T + A[1] * j + U),
                (L[5] = A[0] * q + A[1] * N + J);
            }
            return L;
          }

          function M(S, _, A) {
            var L;
            return (
              this.isIdentity()
                ? (L = [S, _, A])
                : (L = [
                    S * this.props[0] +
                      _ * this.props[4] +
                      A * this.props[8] +
                      this.props[12],
                    S * this.props[1] +
                      _ * this.props[5] +
                      A * this.props[9] +
                      this.props[13],
                    S * this.props[2] +
                      _ * this.props[6] +
                      A * this.props[10] +
                      this.props[14],
                  ]),
              L
            );
          }

          function D(S, _) {
            if (this.isIdentity()) return S + ',' + _;
            var A = this.props;
            return (
              Math.round((S * A[0] + _ * A[4] + A[12]) * 100) / 100 +
              ',' +
              Math.round((S * A[1] + _ * A[5] + A[13]) * 100) / 100
            );
          }

          function R() {
            for (var S = 0, _ = this.props, A = 'matrix3d(', L = 1e4; S < 16; )
              (A += r(_[S] * L) / L), (A += S === 15 ? ')' : ','), (S += 1);
            return A;
          }

          function $(S) {
            var _ = 1e4;
            return (S < 1e-6 && S > 0) || (S > -1e-6 && S < 0)
              ? r(S * _) / _
              : S;
          }

          function I() {
            var S = this.props,
              _ = $(S[0]),
              A = $(S[1]),
              L = $(S[4]),
              T = $(S[5]),
              q = $(S[12]),
              j = $(S[13]);
            return (
              'matrix(' +
              _ +
              ',' +
              A +
              ',' +
              L +
              ',' +
              T +
              ',' +
              q +
              ',' +
              j +
              ')'
            );
          }

          return function () {
            (this.reset = s),
              (this.rotate = a),
              (this.rotateX = l),
              (this.rotateY = m),
              (this.rotateZ = d),
              (this.skew = x),
              (this.skewFromAxis = b),
              (this.shear = g),
              (this.scale = y),
              (this.setTransform = u),
              (this.translate = k),
              (this.transform = f),
              (this.applyToPoint = c),
              (this.applyToX = v),
              (this.applyToY = w),
              (this.applyToZ = P),
              (this.applyToPointArray = M),
              (this.applyToTriplePoints = V),
              (this.applyToPointStringified = D),
              (this.toCSS = R),
              (this.to2dCSS = I),
              (this.clone = n),
              (this.cloneFromProps = o),
              (this.equals = p),
              (this.inversePoints = F),
              (this.inversePoint = C),
              (this.getInverseMatrix = E),
              (this._t = this.transform),
              (this.isIdentity = h),
              (this._identity = !0),
              (this._identityCalculated = !1),
              (this.props = createTypedArray('float32', 16)),
              this.reset();
          };
        })();
        (function (t, e) {
          var i = this,
            r = 256,
            s = 6,
            a = 52,
            l = 'random',
            m = e.pow(r, s),
            d = e.pow(2, a),
            g = d * 2,
            x = r - 1,
            b;

          function y(o, c, v) {
            var w = [];
            c = c === !0 ? { entropy: !0 } : c || {};
            var P = h(f(c.entropy ? [o, n(t)] : o === null ? p() : o, 3), w),
              E = new u(w),
              C = function () {
                for (var F = E.g(s), V = m, M = 0; F < d; )
                  (F = (F + M) * r), (V *= r), (M = E.g(1));
                for (; F >= g; ) (F /= 2), (V /= 2), (M >>>= 1);
                return (F + M) / V;
              };
            return (
              (C.int32 = function () {
                return E.g(4) | 0;
              }),
              (C.quick = function () {
                return E.g(4) / 4294967296;
              }),
              (C.double = C),
              h(n(E.S), t),
              (
                c.pass ||
                v ||
                function (F, V, M, D) {
                  return (
                    D &&
                      (D.S && k(D, E),
                      (F.state = function () {
                        return k(E, {});
                      })),
                    M ? ((e[l] = F), V) : F
                  );
                }
              )(C, P, 'global' in c ? c.global : this == e, c.state)
            );
          }

          e['seed' + l] = y;

          function u(o) {
            var c,
              v = o.length,
              w = this,
              P = 0,
              E = (w.i = w.j = 0),
              C = (w.S = []);
            for (v || (o = [v++]); P < r; ) C[P] = P++;
            for (P = 0; P < r; P++)
              (C[P] = C[(E = x & (E + o[P % v] + (c = C[P])))]), (C[E] = c);
            w.g = function (F) {
              for (var V, M = 0, D = w.i, R = w.j, $ = w.S; F--; )
                (V = $[(D = x & (D + 1))]),
                  (M =
                    M * r +
                    $[x & (($[D] = $[(R = x & (R + V))]) + ($[R] = V))]);
              return (w.i = D), (w.j = R), M;
            };
          }

          function k(o, c) {
            return (c.i = o.i), (c.j = o.j), (c.S = o.S.slice()), c;
          }

          function f(o, c) {
            var v = [],
              w = typeof o,
              P;
            if (c && w == 'object')
              for (P in o)
                try {
                  v.push(f(o[P], c - 1));
                } catch {}
            return v.length ? v : w == 'string' ? o : o + '\0';
          }

          function h(o, c) {
            for (var v = o + '', w, P = 0; P < v.length; )
              c[x & P] = x & ((w ^= c[x & P] * 19) + v.charCodeAt(P++));
            return n(c);
          }

          function p() {
            try {
              if (b) return n(b.randomBytes(r));
              var o = new Uint8Array(r);
              return (i.crypto || i.msCrypto).getRandomValues(o), n(o);
            } catch {
              var c = i.navigator,
                v = c && c.plugins;
              return [+new Date(), i, v, i.screen, n(t)];
            }
          }

          function n(o) {
            return String.fromCharCode.apply(0, o);
          }

          h(e.random(), t);
        })([], BMMath);
        var BezierFactory = (function () {
          var t = {};
          t.getBezierEasing = i;
          var e = {};

          function i(n, o, c, v, w) {
            var P =
              w ||
              ('bez_' + n + '_' + o + '_' + c + '_' + v).replace(/\./g, 'p');
            if (e[P]) return e[P];
            var E = new p([n, o, c, v]);
            return (e[P] = E), E;
          }

          var r = 4,
            s = 0.001,
            a = 1e-7,
            l = 10,
            m = 11,
            d = 1 / (m - 1),
            g = typeof Float32Array == 'function';

          function x(n, o) {
            return 1 - 3 * o + 3 * n;
          }

          function b(n, o) {
            return 3 * o - 6 * n;
          }

          function y(n) {
            return 3 * n;
          }

          function u(n, o, c) {
            return ((x(o, c) * n + b(o, c)) * n + y(o)) * n;
          }

          function k(n, o, c) {
            return 3 * x(o, c) * n * n + 2 * b(o, c) * n + y(o);
          }

          function f(n, o, c, v, w) {
            var P,
              E,
              C = 0;
            do
              (E = o + (c - o) / 2),
                (P = u(E, v, w) - n),
                P > 0 ? (c = E) : (o = E);
            while (Math.abs(P) > a && ++C < l);
            return E;
          }

          function h(n, o, c, v) {
            for (var w = 0; w < r; ++w) {
              var P = k(o, c, v);
              if (P === 0) return o;
              var E = u(o, c, v) - n;
              o -= E / P;
            }
            return o;
          }

          function p(n) {
            (this._p = n),
              (this._mSampleValues = g ? new Float32Array(m) : new Array(m)),
              (this._precomputed = !1),
              (this.get = this.get.bind(this));
          }

          return (
            (p.prototype = {
              get: function (n) {
                var o = this._p[0],
                  c = this._p[1],
                  v = this._p[2],
                  w = this._p[3];
                return (
                  this._precomputed || this._precompute(),
                  o === c && v === w
                    ? n
                    : n === 0
                    ? 0
                    : n === 1
                    ? 1
                    : u(this._getTForX(n), c, w)
                );
              },
              _precompute: function () {
                var n = this._p[0],
                  o = this._p[1],
                  c = this._p[2],
                  v = this._p[3];
                (this._precomputed = !0),
                  (n !== o || c !== v) && this._calcSampleValues();
              },
              _calcSampleValues: function () {
                for (var n = this._p[0], o = this._p[2], c = 0; c < m; ++c)
                  this._mSampleValues[c] = u(c * d, n, o);
              },
              _getTForX: function (n) {
                for (
                  var o = this._p[0],
                    c = this._p[2],
                    v = this._mSampleValues,
                    w = 0,
                    P = 1,
                    E = m - 1;
                  P !== E && v[P] <= n;
                  ++P
                )
                  w += d;
                --P;
                var C = (n - v[P]) / (v[P + 1] - v[P]),
                  F = w + C * d,
                  V = k(F, o, c);
                return V >= s
                  ? h(n, F, o, c)
                  : V === 0
                  ? F
                  : f(n, w, w + d, o, c);
              },
            }),
            t
          );
        })();

        function extendPrototype(t, e) {
          var i,
            r = t.length,
            s;
          for (i = 0; i < r; i += 1) {
            s = t[i].prototype;
            for (var a in s)
              Object.prototype.hasOwnProperty.call(s, a) &&
                (e.prototype[a] = s[a]);
          }
        }

        function getDescriptor(t, e) {
          return Object.getOwnPropertyDescriptor(t, e);
        }

        function createProxyFunction(t) {
          function e() {}

          return (e.prototype = t), e;
        }

        function bezFunction() {
          var t = Math;

          function e(y, u, k, f, h, p) {
            var n = y * f + u * h + k * p - h * f - p * y - k * u;
            return n > -0.001 && n < 0.001;
          }

          function i(y, u, k, f, h, p, n, o, c) {
            if (k === 0 && p === 0 && c === 0) return e(y, u, f, h, n, o);
            var v = t.sqrt(t.pow(f - y, 2) + t.pow(h - u, 2) + t.pow(p - k, 2)),
              w = t.sqrt(t.pow(n - y, 2) + t.pow(o - u, 2) + t.pow(c - k, 2)),
              P = t.sqrt(t.pow(n - f, 2) + t.pow(o - h, 2) + t.pow(c - p, 2)),
              E;
            return (
              v > w
                ? v > P
                  ? (E = v - w - P)
                  : (E = P - w - v)
                : P > w
                ? (E = P - w - v)
                : (E = w - v - P),
              E > -1e-4 && E < 1e-4
            );
          }

          var r = (function () {
            return function (y, u, k, f) {
              var h = defaultCurveSegments,
                p,
                n,
                o,
                c,
                v,
                w = 0,
                P,
                E = [],
                C = [],
                F = bezierLengthPool.newElement();
              for (o = k.length, p = 0; p < h; p += 1) {
                for (v = p / (h - 1), P = 0, n = 0; n < o; n += 1)
                  (c =
                    bmPow(1 - v, 3) * y[n] +
                    3 * bmPow(1 - v, 2) * v * k[n] +
                    3 * (1 - v) * bmPow(v, 2) * f[n] +
                    bmPow(v, 3) * u[n]),
                    (E[n] = c),
                    C[n] !== null && (P += bmPow(E[n] - C[n], 2)),
                    (C[n] = E[n]);
                P && ((P = bmSqrt(P)), (w += P)),
                  (F.percents[p] = v),
                  (F.lengths[p] = w);
              }
              return (F.addedLength = w), F;
            };
          })();

          function s(y) {
            var u = segmentsLengthPool.newElement(),
              k = y.c,
              f = y.v,
              h = y.o,
              p = y.i,
              n,
              o = y._length,
              c = u.lengths,
              v = 0;
            for (n = 0; n < o - 1; n += 1)
              (c[n] = r(f[n], f[n + 1], h[n], p[n + 1])),
                (v += c[n].addedLength);
            return (
              k &&
                o &&
                ((c[n] = r(f[n], f[0], h[n], p[0])), (v += c[n].addedLength)),
              (u.totalLength = v),
              u
            );
          }

          function a(y) {
            (this.segmentLength = 0), (this.points = new Array(y));
          }

          function l(y, u) {
            (this.partialLength = y), (this.point = u);
          }

          var m = (function () {
            var y = {};
            return function (u, k, f, h) {
              var p = (
                u[0] +
                '_' +
                u[1] +
                '_' +
                k[0] +
                '_' +
                k[1] +
                '_' +
                f[0] +
                '_' +
                f[1] +
                '_' +
                h[0] +
                '_' +
                h[1]
              ).replace(/\./g, 'p');
              if (!y[p]) {
                var n = defaultCurveSegments,
                  o,
                  c,
                  v,
                  w,
                  P,
                  E = 0,
                  C,
                  F,
                  V = null;
                u.length === 2 &&
                  (u[0] !== k[0] || u[1] !== k[1]) &&
                  e(u[0], u[1], k[0], k[1], u[0] + f[0], u[1] + f[1]) &&
                  e(u[0], u[1], k[0], k[1], k[0] + h[0], k[1] + h[1]) &&
                  (n = 2);
                var M = new a(n);
                for (v = f.length, o = 0; o < n; o += 1) {
                  for (
                    F = createSizedArray(v), P = o / (n - 1), C = 0, c = 0;
                    c < v;
                    c += 1
                  )
                    (w =
                      bmPow(1 - P, 3) * u[c] +
                      3 * bmPow(1 - P, 2) * P * (u[c] + f[c]) +
                      3 * (1 - P) * bmPow(P, 2) * (k[c] + h[c]) +
                      bmPow(P, 3) * k[c]),
                      (F[c] = w),
                      V !== null && (C += bmPow(F[c] - V[c], 2));
                  (C = bmSqrt(C)),
                    (E += C),
                    (M.points[o] = new l(C, F)),
                    (V = F);
                }
                (M.segmentLength = E), (y[p] = M);
              }
              return y[p];
            };
          })();

          function d(y, u) {
            var k = u.percents,
              f = u.lengths,
              h = k.length,
              p = bmFloor((h - 1) * y),
              n = y * u.addedLength,
              o = 0;
            if (p === h - 1 || p === 0 || n === f[p]) return k[p];
            for (var c = f[p] > n ? -1 : 1, v = !0; v; )
              if (
                (f[p] <= n && f[p + 1] > n
                  ? ((o = (n - f[p]) / (f[p + 1] - f[p])), (v = !1))
                  : (p += c),
                p < 0 || p >= h - 1)
              ) {
                if (p === h - 1) return k[p];
                v = !1;
              }
            return k[p] + (k[p + 1] - k[p]) * o;
          }

          function g(y, u, k, f, h, p) {
            var n = d(h, p),
              o = 1 - n,
              c =
                t.round(
                  (o * o * o * y[0] +
                    (n * o * o + o * n * o + o * o * n) * k[0] +
                    (n * n * o + o * n * n + n * o * n) * f[0] +
                    n * n * n * u[0]) *
                    1e3,
                ) / 1e3,
              v =
                t.round(
                  (o * o * o * y[1] +
                    (n * o * o + o * n * o + o * o * n) * k[1] +
                    (n * n * o + o * n * n + n * o * n) * f[1] +
                    n * n * n * u[1]) *
                    1e3,
                ) / 1e3;
            return [c, v];
          }

          var x = createTypedArray('float32', 8);

          function b(y, u, k, f, h, p, n) {
            h < 0 ? (h = 0) : h > 1 && (h = 1);
            var o = d(h, n);
            p = p > 1 ? 1 : p;
            var c = d(p, n),
              v,
              w = y.length,
              P = 1 - o,
              E = 1 - c,
              C = P * P * P,
              F = o * P * P * 3,
              V = o * o * P * 3,
              M = o * o * o,
              D = P * P * E,
              R = o * P * E + P * o * E + P * P * c,
              $ = o * o * E + P * o * c + o * P * c,
              I = o * o * c,
              S = P * E * E,
              _ = o * E * E + P * c * E + P * E * c,
              A = o * c * E + P * c * c + o * E * c,
              L = o * c * c,
              T = E * E * E,
              q = c * E * E + E * c * E + E * E * c,
              j = c * c * E + E * c * c + c * E * c,
              N = c * c * c;
            for (v = 0; v < w; v += 1)
              (x[v * 4] =
                t.round((C * y[v] + F * k[v] + V * f[v] + M * u[v]) * 1e3) /
                1e3),
                (x[v * 4 + 1] =
                  t.round((D * y[v] + R * k[v] + $ * f[v] + I * u[v]) * 1e3) /
                  1e3),
                (x[v * 4 + 2] =
                  t.round((S * y[v] + _ * k[v] + A * f[v] + L * u[v]) * 1e3) /
                  1e3),
                (x[v * 4 + 3] =
                  t.round((T * y[v] + q * k[v] + j * f[v] + N * u[v]) * 1e3) /
                  1e3);
            return x;
          }

          return {
            getSegmentsLength: s,
            getNewSegment: b,
            getPointInSegment: g,
            buildBezierData: m,
            pointOnLine2D: e,
            pointOnLine3D: i,
          };
        }

        var bez = bezFunction();

        function dataFunctionManager() {
          function t(y, u, k) {
            var f,
              h,
              p = y.length,
              n,
              o,
              c,
              v;
            for (h = 0; h < p; h += 1)
              if (((f = y[h]), 'ks' in f && !f.completed)) {
                if (
                  ((f.completed = !0), f.tt && (y[h - 1].td = f.tt), f.hasMask)
                ) {
                  var w = f.masksProperties;
                  for (o = w.length, n = 0; n < o; n += 1)
                    if (w[n].pt.k.i) r(w[n].pt.k);
                    else
                      for (v = w[n].pt.k.length, c = 0; c < v; c += 1)
                        w[n].pt.k[c].s && r(w[n].pt.k[c].s[0]),
                          w[n].pt.k[c].e && r(w[n].pt.k[c].e[0]);
                }
                f.ty === 0
                  ? ((f.layers = e(f.refId, u)), t(f.layers, u, k))
                  : f.ty === 4
                  ? i(f.shapes)
                  : f.ty === 5 && x(f, k);
              }
          }

          function e(y, u) {
            for (var k = 0, f = u.length; k < f; ) {
              if (u[k].id === y)
                return u[k].layers.__used
                  ? JSON.parse(JSON.stringify(u[k].layers))
                  : ((u[k].layers.__used = !0), u[k].layers);
              k += 1;
            }
            return null;
          }

          function i(y) {
            var u,
              k = y.length,
              f,
              h;
            for (u = k - 1; u >= 0; u -= 1)
              if (y[u].ty === 'sh')
                if (y[u].ks.k.i) r(y[u].ks.k);
                else
                  for (h = y[u].ks.k.length, f = 0; f < h; f += 1)
                    y[u].ks.k[f].s && r(y[u].ks.k[f].s[0]),
                      y[u].ks.k[f].e && r(y[u].ks.k[f].e[0]);
              else y[u].ty === 'gr' && i(y[u].it);
          }

          function r(y) {
            var u,
              k = y.i.length;
            for (u = 0; u < k; u += 1)
              (y.i[u][0] += y.v[u][0]),
                (y.i[u][1] += y.v[u][1]),
                (y.o[u][0] += y.v[u][0]),
                (y.o[u][1] += y.v[u][1]);
          }

          function s(y, u) {
            var k = u ? u.split('.') : [100, 100, 100];
            return y[0] > k[0]
              ? !0
              : k[0] > y[0]
              ? !1
              : y[1] > k[1]
              ? !0
              : k[1] > y[1]
              ? !1
              : y[2] > k[2]
              ? !0
              : k[2] > y[2]
              ? !1
              : null;
          }

          var a = (function () {
              var y = [4, 4, 14];

              function u(f) {
                var h = f.t.d;
                f.t.d = { k: [{ s: h, t: 0 }] };
              }

              function k(f) {
                var h,
                  p = f.length;
                for (h = 0; h < p; h += 1) f[h].ty === 5 && u(f[h]);
              }

              return function (f) {
                if (s(y, f.v) && (k(f.layers), f.assets)) {
                  var h,
                    p = f.assets.length;
                  for (h = 0; h < p; h += 1)
                    f.assets[h].layers && k(f.assets[h].layers);
                }
              };
            })(),
            l = (function () {
              var y = [4, 7, 99];
              return function (u) {
                if (u.chars && !s(y, u.v)) {
                  var k,
                    f = u.chars.length,
                    h,
                    p,
                    n,
                    o;
                  for (k = 0; k < f; k += 1)
                    if (u.chars[k].data && u.chars[k].data.shapes)
                      for (
                        o = u.chars[k].data.shapes[0].it, p = o.length, h = 0;
                        h < p;
                        h += 1
                      )
                        (n = o[h].ks.k),
                          n.__converted || (r(o[h].ks.k), (n.__converted = !0));
                }
              };
            })(),
            m = (function () {
              var y = [4, 1, 9];

              function u(f) {
                var h,
                  p = f.length,
                  n,
                  o;
                for (h = 0; h < p; h += 1)
                  if (f[h].ty === 'gr') u(f[h].it);
                  else if (f[h].ty === 'fl' || f[h].ty === 'st')
                    if (f[h].c.k && f[h].c.k[0].i)
                      for (o = f[h].c.k.length, n = 0; n < o; n += 1)
                        f[h].c.k[n].s &&
                          ((f[h].c.k[n].s[0] /= 255),
                          (f[h].c.k[n].s[1] /= 255),
                          (f[h].c.k[n].s[2] /= 255),
                          (f[h].c.k[n].s[3] /= 255)),
                          f[h].c.k[n].e &&
                            ((f[h].c.k[n].e[0] /= 255),
                            (f[h].c.k[n].e[1] /= 255),
                            (f[h].c.k[n].e[2] /= 255),
                            (f[h].c.k[n].e[3] /= 255));
                    else
                      (f[h].c.k[0] /= 255),
                        (f[h].c.k[1] /= 255),
                        (f[h].c.k[2] /= 255),
                        (f[h].c.k[3] /= 255);
              }

              function k(f) {
                var h,
                  p = f.length;
                for (h = 0; h < p; h += 1) f[h].ty === 4 && u(f[h].shapes);
              }

              return function (f) {
                if (s(y, f.v) && (k(f.layers), f.assets)) {
                  var h,
                    p = f.assets.length;
                  for (h = 0; h < p; h += 1)
                    f.assets[h].layers && k(f.assets[h].layers);
                }
              };
            })(),
            d = (function () {
              var y = [4, 4, 18];

              function u(f) {
                var h,
                  p = f.length,
                  n,
                  o;
                for (h = p - 1; h >= 0; h -= 1)
                  if (f[h].ty === 'sh')
                    if (f[h].ks.k.i) f[h].ks.k.c = f[h].closed;
                    else
                      for (o = f[h].ks.k.length, n = 0; n < o; n += 1)
                        f[h].ks.k[n].s && (f[h].ks.k[n].s[0].c = f[h].closed),
                          f[h].ks.k[n].e && (f[h].ks.k[n].e[0].c = f[h].closed);
                  else f[h].ty === 'gr' && u(f[h].it);
              }

              function k(f) {
                var h,
                  p,
                  n = f.length,
                  o,
                  c,
                  v,
                  w;
                for (p = 0; p < n; p += 1) {
                  if (((h = f[p]), h.hasMask)) {
                    var P = h.masksProperties;
                    for (c = P.length, o = 0; o < c; o += 1)
                      if (P[o].pt.k.i) P[o].pt.k.c = P[o].cl;
                      else
                        for (w = P[o].pt.k.length, v = 0; v < w; v += 1)
                          P[o].pt.k[v].s && (P[o].pt.k[v].s[0].c = P[o].cl),
                            P[o].pt.k[v].e && (P[o].pt.k[v].e[0].c = P[o].cl);
                  }
                  h.ty === 4 && u(h.shapes);
                }
              }

              return function (f) {
                if (s(y, f.v) && (k(f.layers), f.assets)) {
                  var h,
                    p = f.assets.length;
                  for (h = 0; h < p; h += 1)
                    f.assets[h].layers && k(f.assets[h].layers);
                }
              };
            })();

          function g(y, u) {
            y.__complete ||
              (m(y),
              a(y),
              l(y),
              d(y),
              t(y.layers, y.assets, u),
              (y.__complete = !0));
          }

          function x(y) {
            y.t.a.length === 0 && !('m' in y.t.p) && (y.singleShape = !0);
          }

          var b = {};
          return (
            (b.completeData = g),
            (b.checkColors = m),
            (b.checkChars = l),
            (b.checkShapes = d),
            (b.completeLayers = t),
            b
          );
        }

        var dataManager = dataFunctionManager();

        function getFontProperties(t) {
          for (
            var e = t.fStyle ? t.fStyle.split(' ') : [],
              i = 'normal',
              r = 'normal',
              s = e.length,
              a,
              l = 0;
            l < s;
            l += 1
          )
            switch (((a = e[l].toLowerCase()), a)) {
              case 'italic':
                r = 'italic';
                break;
              case 'bold':
                i = '700';
                break;
              case 'black':
                i = '900';
                break;
              case 'medium':
                i = '500';
                break;
              case 'regular':
              case 'normal':
                i = '400';
                break;
              case 'light':
              case 'thin':
                i = '200';
                break;
              default:
                break;
            }
          return { style: r, weight: t.fWeight || i };
        }

        var FontManager = (function () {
            var t = 5e3,
              e = { w: 0, size: 0, shapes: [] },
              i = [];
            i = i.concat([
              2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368,
              2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379,
              2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403,
            ]);

            function r(h) {
              var p = h.split(','),
                n,
                o = p.length,
                c = [];
              for (n = 0; n < o; n += 1)
                p[n] !== 'sans-serif' && p[n] !== 'monospace' && c.push(p[n]);
              return c.join(',');
            }

            function s(h, p) {
              var n = createTag('span');
              n.setAttribute('aria-hidden', !0), (n.style.fontFamily = p);
              var o = createTag('span');
              (o.innerText = 'giItT1WQy@!-/#'),
                (n.style.position = 'absolute'),
                (n.style.left = '-10000px'),
                (n.style.top = '-10000px'),
                (n.style.fontSize = '300px'),
                (n.style.fontVariant = 'normal'),
                (n.style.fontStyle = 'normal'),
                (n.style.fontWeight = 'normal'),
                (n.style.letterSpacing = '0'),
                n.appendChild(o),
                document.body.appendChild(n);
              var c = o.offsetWidth;
              return (
                (o.style.fontFamily = r(h) + ', ' + p),
                { node: o, w: c, parent: n }
              );
            }

            function a() {
              var h,
                p = this.fonts.length,
                n,
                o,
                c = p;
              for (h = 0; h < p; h += 1)
                this.fonts[h].loaded
                  ? (c -= 1)
                  : this.fonts[h].fOrigin === 'n' || this.fonts[h].origin === 0
                  ? (this.fonts[h].loaded = !0)
                  : ((n = this.fonts[h].monoCase.node),
                    (o = this.fonts[h].monoCase.w),
                    n.offsetWidth !== o
                      ? ((c -= 1), (this.fonts[h].loaded = !0))
                      : ((n = this.fonts[h].sansCase.node),
                        (o = this.fonts[h].sansCase.w),
                        n.offsetWidth !== o &&
                          ((c -= 1), (this.fonts[h].loaded = !0))),
                    this.fonts[h].loaded &&
                      (this.fonts[h].sansCase.parent.parentNode.removeChild(
                        this.fonts[h].sansCase.parent,
                      ),
                      this.fonts[h].monoCase.parent.parentNode.removeChild(
                        this.fonts[h].monoCase.parent,
                      )));
              c !== 0 && Date.now() - this.initTime < t
                ? setTimeout(this.checkLoadedFontsBinded, 20)
                : setTimeout(this.setIsLoadedBinded, 10);
            }

            function l(h, p) {
              var n = createNS('text');
              n.style.fontSize = '100px';
              var o = getFontProperties(p);
              n.setAttribute('font-family', p.fFamily),
                n.setAttribute('font-style', o.style),
                n.setAttribute('font-weight', o.weight),
                (n.textContent = '1'),
                p.fClass
                  ? ((n.style.fontFamily = 'inherit'),
                    n.setAttribute('class', p.fClass))
                  : (n.style.fontFamily = p.fFamily),
                h.appendChild(n);
              var c = createTag('canvas').getContext('2d');
              return (
                (c.font = p.fWeight + ' ' + p.fStyle + ' 100px ' + p.fFamily), n
              );
            }

            function m(h, p) {
              if (!h) {
                this.isLoaded = !0;
                return;
              }
              if (this.chars) {
                (this.isLoaded = !0), (this.fonts = h.list);
                return;
              }
              var n = h.list,
                o,
                c = n.length,
                v = c;
              for (o = 0; o < c; o += 1) {
                var w = !0,
                  P,
                  E;
                if (
                  ((n[o].loaded = !1),
                  (n[o].monoCase = s(n[o].fFamily, 'monospace')),
                  (n[o].sansCase = s(n[o].fFamily, 'sans-serif')),
                  !n[o].fPath)
                )
                  (n[o].loaded = !0), (v -= 1);
                else if (n[o].fOrigin === 'p' || n[o].origin === 3) {
                  if (
                    ((P = document.querySelectorAll(
                      'style[f-forigin="p"][f-family="' +
                        n[o].fFamily +
                        '"], style[f-origin="3"][f-family="' +
                        n[o].fFamily +
                        '"]',
                    )),
                    P.length > 0 && (w = !1),
                    w)
                  ) {
                    var C = createTag('style');
                    C.setAttribute('f-forigin', n[o].fOrigin),
                      C.setAttribute('f-origin', n[o].origin),
                      C.setAttribute('f-family', n[o].fFamily),
                      (C.type = 'text/css'),
                      (C.innerText =
                        '@font-face {font-family: ' +
                        n[o].fFamily +
                        "; font-style: normal; src: url('" +
                        n[o].fPath +
                        "');}"),
                      p.appendChild(C);
                  }
                } else if (n[o].fOrigin === 'g' || n[o].origin === 1) {
                  for (
                    P = document.querySelectorAll(
                      'link[f-forigin="g"], link[f-origin="1"]',
                    ),
                      E = 0;
                    E < P.length;
                    E += 1
                  )
                    P[E].href.indexOf(n[o].fPath) !== -1 && (w = !1);
                  if (w) {
                    var F = createTag('link');
                    F.setAttribute('f-forigin', n[o].fOrigin),
                      F.setAttribute('f-origin', n[o].origin),
                      (F.type = 'text/css'),
                      (F.rel = 'stylesheet'),
                      (F.href = n[o].fPath),
                      document.body.appendChild(F);
                  }
                } else if (n[o].fOrigin === 't' || n[o].origin === 2) {
                  for (
                    P = document.querySelectorAll(
                      'script[f-forigin="t"], script[f-origin="2"]',
                    ),
                      E = 0;
                    E < P.length;
                    E += 1
                  )
                    n[o].fPath === P[E].src && (w = !1);
                  if (w) {
                    var V = createTag('link');
                    V.setAttribute('f-forigin', n[o].fOrigin),
                      V.setAttribute('f-origin', n[o].origin),
                      V.setAttribute('rel', 'stylesheet'),
                      V.setAttribute('href', n[o].fPath),
                      p.appendChild(V);
                  }
                }
                (n[o].helper = l(p, n[o])),
                  (n[o].cache = {}),
                  this.fonts.push(n[o]);
              }
              v === 0
                ? (this.isLoaded = !0)
                : setTimeout(this.checkLoadedFonts.bind(this), 100);
            }

            function d(h) {
              if (!!h) {
                this.chars || (this.chars = []);
                var p,
                  n = h.length,
                  o,
                  c = this.chars.length,
                  v;
                for (p = 0; p < n; p += 1) {
                  for (o = 0, v = !1; o < c; )
                    this.chars[o].style === h[p].style &&
                      this.chars[o].fFamily === h[p].fFamily &&
                      this.chars[o].ch === h[p].ch &&
                      (v = !0),
                      (o += 1);
                  v || (this.chars.push(h[p]), (c += 1));
                }
              }
            }

            function g(h, p, n) {
              for (var o = 0, c = this.chars.length; o < c; ) {
                if (
                  this.chars[o].ch === h &&
                  this.chars[o].style === p &&
                  this.chars[o].fFamily === n
                )
                  return this.chars[o];
                o += 1;
              }
              return (
                ((typeof h == 'string' && h.charCodeAt(0) !== 13) || !h) &&
                  console &&
                  console.warn &&
                  !this._warned &&
                  ((this._warned = !0),
                  console.warn(
                    'Missing character from exported characters list: ',
                    h,
                    p,
                    n,
                  )),
                e
              );
            }

            function x(h, p, n) {
              var o = this.getFontByName(p),
                c = h.charCodeAt(0);
              if (!o.cache[c + 1]) {
                var v = o.helper;
                if (h === ' ') {
                  v.textContent = '|' + h + '|';
                  var w = v.getComputedTextLength();
                  v.textContent = '||';
                  var P = v.getComputedTextLength();
                  o.cache[c + 1] = (w - P) / 100;
                } else
                  (v.textContent = h),
                    (o.cache[c + 1] = v.getComputedTextLength() / 100);
              }
              return o.cache[c + 1] * n;
            }

            function b(h) {
              for (var p = 0, n = this.fonts.length; p < n; ) {
                if (this.fonts[p].fName === h) return this.fonts[p];
                p += 1;
              }
              return this.fonts[0];
            }

            function y() {
              return i;
            }

            function u() {
              this.isLoaded = !0;
            }

            var k = function () {
              (this.fonts = []),
                (this.chars = null),
                (this.typekitLoaded = 0),
                (this.isLoaded = !1),
                (this._warned = !1),
                (this.initTime = Date.now()),
                (this.setIsLoadedBinded = this.setIsLoaded.bind(this)),
                (this.checkLoadedFontsBinded =
                  this.checkLoadedFonts.bind(this));
            };
            k.getCombinedCharacterCodes = y;
            var f = {
              addChars: d,
              addFonts: m,
              getCharData: g,
              getFontByName: b,
              measureText: x,
              checkLoadedFonts: a,
              setIsLoaded: u,
            };
            return (k.prototype = f), k;
          })(),
          PropertyFactory = (function () {
            var t = initialDefaultFrame,
              e = Math.abs;

            function i(h, p) {
              var n = this.offsetTime,
                o;
              this.propType === 'multidimensional' &&
                (o = createTypedArray('float32', this.pv.length));
              for (
                var c = p.lastIndex,
                  v = c,
                  w = this.keyframes.length - 1,
                  P = !0,
                  E,
                  C;
                P;

              ) {
                if (
                  ((E = this.keyframes[v]),
                  (C = this.keyframes[v + 1]),
                  v === w - 1 && h >= C.t - n)
                ) {
                  E.h && (E = C), (c = 0);
                  break;
                }
                if (C.t - n > h) {
                  c = v;
                  break;
                }
                v < w - 1 ? (v += 1) : ((c = 0), (P = !1));
              }
              var F,
                V,
                M,
                D,
                R,
                $,
                I = C.t - n,
                S = E.t - n,
                _;
              if (E.to) {
                E.bezierData ||
                  (E.bezierData = bez.buildBezierData(
                    E.s,
                    C.s || E.e,
                    E.to,
                    E.ti,
                  ));
                var A = E.bezierData;
                if (h >= I || h < S) {
                  var L = h >= I ? A.points.length - 1 : 0;
                  for (V = A.points[L].point.length, F = 0; F < V; F += 1)
                    o[F] = A.points[L].point[F];
                } else {
                  E.__fnct
                    ? ($ = E.__fnct)
                    : (($ = BezierFactory.getBezierEasing(
                        E.o.x,
                        E.o.y,
                        E.i.x,
                        E.i.y,
                        E.n,
                      ).get),
                      (E.__fnct = $)),
                    (M = $((h - S) / (I - S)));
                  var T = A.segmentLength * M,
                    q,
                    j =
                      p.lastFrame < h && p._lastKeyframeIndex === v
                        ? p._lastAddedLength
                        : 0;
                  for (
                    R =
                      p.lastFrame < h && p._lastKeyframeIndex === v
                        ? p._lastPoint
                        : 0,
                      P = !0,
                      D = A.points.length;
                    P;

                  ) {
                    if (
                      ((j += A.points[R].partialLength),
                      T === 0 || M === 0 || R === A.points.length - 1)
                    ) {
                      for (V = A.points[R].point.length, F = 0; F < V; F += 1)
                        o[F] = A.points[R].point[F];
                      break;
                    } else if (
                      T >= j &&
                      T < j + A.points[R + 1].partialLength
                    ) {
                      for (
                        q = (T - j) / A.points[R + 1].partialLength,
                          V = A.points[R].point.length,
                          F = 0;
                        F < V;
                        F += 1
                      )
                        o[F] =
                          A.points[R].point[F] +
                          (A.points[R + 1].point[F] - A.points[R].point[F]) * q;
                      break;
                    }
                    R < D - 1 ? (R += 1) : (P = !1);
                  }
                  (p._lastPoint = R),
                    (p._lastAddedLength = j - A.points[R].partialLength),
                    (p._lastKeyframeIndex = v);
                }
              } else {
                var N, U, J, st, ht;
                if (((w = E.s.length), (_ = C.s || E.e), this.sh && E.h !== 1))
                  if (h >= I) (o[0] = _[0]), (o[1] = _[1]), (o[2] = _[2]);
                  else if (h <= S)
                    (o[0] = E.s[0]), (o[1] = E.s[1]), (o[2] = E.s[2]);
                  else {
                    var ct = a(E.s),
                      it = a(_),
                      Z = (h - S) / (I - S);
                    s(o, r(ct, it, Z));
                  }
                else
                  for (v = 0; v < w; v += 1)
                    E.h !== 1 &&
                      (h >= I
                        ? (M = 1)
                        : h < S
                        ? (M = 0)
                        : (E.o.x.constructor === Array
                            ? (E.__fnct || (E.__fnct = []),
                              E.__fnct[v]
                                ? ($ = E.__fnct[v])
                                : ((N =
                                    typeof E.o.x[v] > 'u'
                                      ? E.o.x[0]
                                      : E.o.x[v]),
                                  (U =
                                    typeof E.o.y[v] > 'u'
                                      ? E.o.y[0]
                                      : E.o.y[v]),
                                  (J =
                                    typeof E.i.x[v] > 'u'
                                      ? E.i.x[0]
                                      : E.i.x[v]),
                                  (st =
                                    typeof E.i.y[v] > 'u'
                                      ? E.i.y[0]
                                      : E.i.y[v]),
                                  ($ = BezierFactory.getBezierEasing(
                                    N,
                                    U,
                                    J,
                                    st,
                                  ).get),
                                  (E.__fnct[v] = $)))
                            : E.__fnct
                            ? ($ = E.__fnct)
                            : ((N = E.o.x),
                              (U = E.o.y),
                              (J = E.i.x),
                              (st = E.i.y),
                              ($ = BezierFactory.getBezierEasing(
                                N,
                                U,
                                J,
                                st,
                              ).get),
                              (E.__fnct = $)),
                          (M = $((h - S) / (I - S))))),
                      (_ = C.s || E.e),
                      (ht = E.h === 1 ? E.s[v] : E.s[v] + (_[v] - E.s[v]) * M),
                      this.propType === 'multidimensional'
                        ? (o[v] = ht)
                        : (o = ht);
              }
              return (p.lastIndex = c), o;
            }

            function r(h, p, n) {
              var o = [],
                c = h[0],
                v = h[1],
                w = h[2],
                P = h[3],
                E = p[0],
                C = p[1],
                F = p[2],
                V = p[3],
                M,
                D,
                R,
                $,
                I;
              return (
                (D = c * E + v * C + w * F + P * V),
                D < 0 && ((D = -D), (E = -E), (C = -C), (F = -F), (V = -V)),
                1 - D > 1e-6
                  ? ((M = Math.acos(D)),
                    (R = Math.sin(M)),
                    ($ = Math.sin((1 - n) * M) / R),
                    (I = Math.sin(n * M) / R))
                  : (($ = 1 - n), (I = n)),
                (o[0] = $ * c + I * E),
                (o[1] = $ * v + I * C),
                (o[2] = $ * w + I * F),
                (o[3] = $ * P + I * V),
                o
              );
            }

            function s(h, p) {
              var n = p[0],
                o = p[1],
                c = p[2],
                v = p[3],
                w = Math.atan2(
                  2 * o * v - 2 * n * c,
                  1 - 2 * o * o - 2 * c * c,
                ),
                P = Math.asin(2 * n * o + 2 * c * v),
                E = Math.atan2(
                  2 * n * v - 2 * o * c,
                  1 - 2 * n * n - 2 * c * c,
                );
              (h[0] = w / degToRads),
                (h[1] = P / degToRads),
                (h[2] = E / degToRads);
            }

            function a(h) {
              var p = h[0] * degToRads,
                n = h[1] * degToRads,
                o = h[2] * degToRads,
                c = Math.cos(p / 2),
                v = Math.cos(n / 2),
                w = Math.cos(o / 2),
                P = Math.sin(p / 2),
                E = Math.sin(n / 2),
                C = Math.sin(o / 2),
                F = c * v * w - P * E * C,
                V = P * E * w + c * v * C,
                M = P * v * w + c * E * C,
                D = c * E * w - P * v * C;
              return [V, M, D, F];
            }

            function l() {
              var h = this.comp.renderedFrame - this.offsetTime,
                p = this.keyframes[0].t - this.offsetTime,
                n =
                  this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
              if (
                !(
                  h === this._caching.lastFrame ||
                  (this._caching.lastFrame !== t &&
                    ((this._caching.lastFrame >= n && h >= n) ||
                      (this._caching.lastFrame < p && h < p)))
                )
              ) {
                this._caching.lastFrame >= h &&
                  ((this._caching._lastKeyframeIndex = -1),
                  (this._caching.lastIndex = 0));
                var o = this.interpolateValue(h, this._caching);
                this.pv = o;
              }
              return (this._caching.lastFrame = h), this.pv;
            }

            function m(h) {
              var p;
              if (this.propType === 'unidimensional')
                (p = h * this.mult),
                  e(this.v - p) > 1e-5 && ((this.v = p), (this._mdf = !0));
              else
                for (var n = 0, o = this.v.length; n < o; )
                  (p = h[n] * this.mult),
                    e(this.v[n] - p) > 1e-5 &&
                      ((this.v[n] = p), (this._mdf = !0)),
                    (n += 1);
            }

            function d() {
              if (
                !(
                  this.elem.globalData.frameId === this.frameId ||
                  !this.effectsSequence.length
                )
              ) {
                if (this.lock) {
                  this.setVValue(this.pv);
                  return;
                }
                (this.lock = !0), (this._mdf = this._isFirstFrame);
                var h,
                  p = this.effectsSequence.length,
                  n = this.kf ? this.pv : this.data.k;
                for (h = 0; h < p; h += 1) n = this.effectsSequence[h](n);
                this.setVValue(n),
                  (this._isFirstFrame = !1),
                  (this.lock = !1),
                  (this.frameId = this.elem.globalData.frameId);
              }
            }

            function g(h) {
              this.effectsSequence.push(h),
                this.container.addDynamicProperty(this);
            }

            function x(h, p, n, o) {
              (this.propType = 'unidimensional'),
                (this.mult = n || 1),
                (this.data = p),
                (this.v = n ? p.k * n : p.k),
                (this.pv = p.k),
                (this._mdf = !1),
                (this.elem = h),
                (this.container = o),
                (this.comp = h.comp),
                (this.k = !1),
                (this.kf = !1),
                (this.vel = 0),
                (this.effectsSequence = []),
                (this._isFirstFrame = !0),
                (this.getValue = d),
                (this.setVValue = m),
                (this.addEffect = g);
            }

            function b(h, p, n, o) {
              (this.propType = 'multidimensional'),
                (this.mult = n || 1),
                (this.data = p),
                (this._mdf = !1),
                (this.elem = h),
                (this.container = o),
                (this.comp = h.comp),
                (this.k = !1),
                (this.kf = !1),
                (this.frameId = -1);
              var c,
                v = p.k.length;
              for (
                this.v = createTypedArray('float32', v),
                  this.pv = createTypedArray('float32', v),
                  this.vel = createTypedArray('float32', v),
                  c = 0;
                c < v;
                c += 1
              )
                (this.v[c] = p.k[c] * this.mult), (this.pv[c] = p.k[c]);
              (this._isFirstFrame = !0),
                (this.effectsSequence = []),
                (this.getValue = d),
                (this.setVValue = m),
                (this.addEffect = g);
            }

            function y(h, p, n, o) {
              (this.propType = 'unidimensional'),
                (this.keyframes = p.k),
                (this.offsetTime = h.data.st),
                (this.frameId = -1),
                (this._caching = {
                  lastFrame: t,
                  lastIndex: 0,
                  value: 0,
                  _lastKeyframeIndex: -1,
                }),
                (this.k = !0),
                (this.kf = !0),
                (this.data = p),
                (this.mult = n || 1),
                (this.elem = h),
                (this.container = o),
                (this.comp = h.comp),
                (this.v = t),
                (this.pv = t),
                (this._isFirstFrame = !0),
                (this.getValue = d),
                (this.setVValue = m),
                (this.interpolateValue = i),
                (this.effectsSequence = [l.bind(this)]),
                (this.addEffect = g);
            }

            function u(h, p, n, o) {
              this.propType = 'multidimensional';
              var c,
                v = p.k.length,
                w,
                P,
                E,
                C;
              for (c = 0; c < v - 1; c += 1)
                p.k[c].to &&
                  p.k[c].s &&
                  p.k[c + 1] &&
                  p.k[c + 1].s &&
                  ((w = p.k[c].s),
                  (P = p.k[c + 1].s),
                  (E = p.k[c].to),
                  (C = p.k[c].ti),
                  ((w.length === 2 &&
                    !(w[0] === P[0] && w[1] === P[1]) &&
                    bez.pointOnLine2D(
                      w[0],
                      w[1],
                      P[0],
                      P[1],
                      w[0] + E[0],
                      w[1] + E[1],
                    ) &&
                    bez.pointOnLine2D(
                      w[0],
                      w[1],
                      P[0],
                      P[1],
                      P[0] + C[0],
                      P[1] + C[1],
                    )) ||
                    (w.length === 3 &&
                      !(w[0] === P[0] && w[1] === P[1] && w[2] === P[2]) &&
                      bez.pointOnLine3D(
                        w[0],
                        w[1],
                        w[2],
                        P[0],
                        P[1],
                        P[2],
                        w[0] + E[0],
                        w[1] + E[1],
                        w[2] + E[2],
                      ) &&
                      bez.pointOnLine3D(
                        w[0],
                        w[1],
                        w[2],
                        P[0],
                        P[1],
                        P[2],
                        P[0] + C[0],
                        P[1] + C[1],
                        P[2] + C[2],
                      ))) &&
                    ((p.k[c].to = null), (p.k[c].ti = null)),
                  w[0] === P[0] &&
                    w[1] === P[1] &&
                    E[0] === 0 &&
                    E[1] === 0 &&
                    C[0] === 0 &&
                    C[1] === 0 &&
                    (w.length === 2 ||
                      (w[2] === P[2] && E[2] === 0 && C[2] === 0)) &&
                    ((p.k[c].to = null), (p.k[c].ti = null)));
              (this.effectsSequence = [l.bind(this)]),
                (this.data = p),
                (this.keyframes = p.k),
                (this.offsetTime = h.data.st),
                (this.k = !0),
                (this.kf = !0),
                (this._isFirstFrame = !0),
                (this.mult = n || 1),
                (this.elem = h),
                (this.container = o),
                (this.comp = h.comp),
                (this.getValue = d),
                (this.setVValue = m),
                (this.interpolateValue = i),
                (this.frameId = -1);
              var F = p.k[0].s.length;
              for (
                this.v = createTypedArray('float32', F),
                  this.pv = createTypedArray('float32', F),
                  c = 0;
                c < F;
                c += 1
              )
                (this.v[c] = t), (this.pv[c] = t);
              (this._caching = {
                lastFrame: t,
                lastIndex: 0,
                value: createTypedArray('float32', F),
              }),
                (this.addEffect = g);
            }

            function k(h, p, n, o, c) {
              var v;
              if (!p.k.length) v = new x(h, p, o, c);
              else if (typeof p.k[0] == 'number') v = new b(h, p, o, c);
              else
                switch (n) {
                  case 0:
                    v = new y(h, p, o, c);
                    break;
                  case 1:
                    v = new u(h, p, o, c);
                    break;
                  default:
                    break;
                }
              return v.effectsSequence.length && c.addDynamicProperty(v), v;
            }

            var f = { getProp: k };
            return f;
          })(),
          TransformPropertyFactory = (function () {
            var t = [0, 0];

            function e(d) {
              var g = this._mdf;
              this.iterateDynamicProperties(),
                (this._mdf = this._mdf || g),
                this.a && d.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                this.s && d.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                this.sk && d.skewFromAxis(-this.sk.v, this.sa.v),
                this.r
                  ? d.rotate(-this.r.v)
                  : d
                      .rotateZ(-this.rz.v)
                      .rotateY(this.ry.v)
                      .rotateX(this.rx.v)
                      .rotateZ(-this.or.v[2])
                      .rotateY(this.or.v[1])
                      .rotateX(this.or.v[0]),
                this.data.p.s
                  ? this.data.p.z
                    ? d.translate(this.px.v, this.py.v, -this.pz.v)
                    : d.translate(this.px.v, this.py.v, 0)
                  : d.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            }

            function i(d) {
              if (this.elem.globalData.frameId !== this.frameId) {
                if (
                  (this._isDirty &&
                    (this.precalculateMatrix(), (this._isDirty = !1)),
                  this.iterateDynamicProperties(),
                  this._mdf || d)
                ) {
                  var g;
                  if (
                    (this.v.cloneFromProps(this.pre.props),
                    this.appliedTransformations < 1 &&
                      this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                    this.appliedTransformations < 2 &&
                      this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                    this.sk &&
                      this.appliedTransformations < 3 &&
                      this.v.skewFromAxis(-this.sk.v, this.sa.v),
                    this.r && this.appliedTransformations < 4
                      ? this.v.rotate(-this.r.v)
                      : !this.r &&
                        this.appliedTransformations < 4 &&
                        this.v
                          .rotateZ(-this.rz.v)
                          .rotateY(this.ry.v)
                          .rotateX(this.rx.v)
                          .rotateZ(-this.or.v[2])
                          .rotateY(this.or.v[1])
                          .rotateX(this.or.v[0]),
                    this.autoOriented)
                  ) {
                    var x, b;
                    if (
                      ((g = this.elem.globalData.frameRate),
                      this.p && this.p.keyframes && this.p.getValueAtTime)
                    )
                      this.p._caching.lastFrame + this.p.offsetTime <=
                      this.p.keyframes[0].t
                        ? ((x = this.p.getValueAtTime(
                            (this.p.keyframes[0].t + 0.01) / g,
                            0,
                          )),
                          (b = this.p.getValueAtTime(
                            this.p.keyframes[0].t / g,
                            0,
                          )))
                        : this.p._caching.lastFrame + this.p.offsetTime >=
                          this.p.keyframes[this.p.keyframes.length - 1].t
                        ? ((x = this.p.getValueAtTime(
                            this.p.keyframes[this.p.keyframes.length - 1].t / g,
                            0,
                          )),
                          (b = this.p.getValueAtTime(
                            (this.p.keyframes[this.p.keyframes.length - 1].t -
                              0.05) /
                              g,
                            0,
                          )))
                        : ((x = this.p.pv),
                          (b = this.p.getValueAtTime(
                            (this.p._caching.lastFrame +
                              this.p.offsetTime -
                              0.01) /
                              g,
                            this.p.offsetTime,
                          )));
                    else if (
                      this.px &&
                      this.px.keyframes &&
                      this.py.keyframes &&
                      this.px.getValueAtTime &&
                      this.py.getValueAtTime
                    ) {
                      (x = []), (b = []);
                      var y = this.px,
                        u = this.py;
                      y._caching.lastFrame + y.offsetTime <= y.keyframes[0].t
                        ? ((x[0] = y.getValueAtTime(
                            (y.keyframes[0].t + 0.01) / g,
                            0,
                          )),
                          (x[1] = u.getValueAtTime(
                            (u.keyframes[0].t + 0.01) / g,
                            0,
                          )),
                          (b[0] = y.getValueAtTime(y.keyframes[0].t / g, 0)),
                          (b[1] = u.getValueAtTime(u.keyframes[0].t / g, 0)))
                        : y._caching.lastFrame + y.offsetTime >=
                          y.keyframes[y.keyframes.length - 1].t
                        ? ((x[0] = y.getValueAtTime(
                            y.keyframes[y.keyframes.length - 1].t / g,
                            0,
                          )),
                          (x[1] = u.getValueAtTime(
                            u.keyframes[u.keyframes.length - 1].t / g,
                            0,
                          )),
                          (b[0] = y.getValueAtTime(
                            (y.keyframes[y.keyframes.length - 1].t - 0.01) / g,
                            0,
                          )),
                          (b[1] = u.getValueAtTime(
                            (u.keyframes[u.keyframes.length - 1].t - 0.01) / g,
                            0,
                          )))
                        : ((x = [y.pv, u.pv]),
                          (b[0] = y.getValueAtTime(
                            (y._caching.lastFrame + y.offsetTime - 0.01) / g,
                            y.offsetTime,
                          )),
                          (b[1] = u.getValueAtTime(
                            (u._caching.lastFrame + u.offsetTime - 0.01) / g,
                            u.offsetTime,
                          )));
                    } else (b = t), (x = b);
                    this.v.rotate(-Math.atan2(x[1] - b[1], x[0] - b[0]));
                  }
                  this.data.p && this.data.p.s
                    ? this.data.p.z
                      ? this.v.translate(this.px.v, this.py.v, -this.pz.v)
                      : this.v.translate(this.px.v, this.py.v, 0)
                    : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
                }
                this.frameId = this.elem.globalData.frameId;
              }
            }

            function r() {
              if (!this.a.k)
                this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                  (this.appliedTransformations = 1);
              else return;
              if (!this.s.effectsSequence.length)
                this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                  (this.appliedTransformations = 2);
              else return;
              if (this.sk)
                if (
                  !this.sk.effectsSequence.length &&
                  !this.sa.effectsSequence.length
                )
                  this.pre.skewFromAxis(-this.sk.v, this.sa.v),
                    (this.appliedTransformations = 3);
                else return;
              this.r
                ? this.r.effectsSequence.length ||
                  (this.pre.rotate(-this.r.v),
                  (this.appliedTransformations = 4))
                : !this.rz.effectsSequence.length &&
                  !this.ry.effectsSequence.length &&
                  !this.rx.effectsSequence.length &&
                  !this.or.effectsSequence.length &&
                  (this.pre
                    .rotateZ(-this.rz.v)
                    .rotateY(this.ry.v)
                    .rotateX(this.rx.v)
                    .rotateZ(-this.or.v[2])
                    .rotateY(this.or.v[1])
                    .rotateX(this.or.v[0]),
                  (this.appliedTransformations = 4));
            }

            function s() {}

            function a(d) {
              this._addDynamicProperty(d),
                this.elem.addDynamicProperty(d),
                (this._isDirty = !0);
            }

            function l(d, g, x) {
              if (
                ((this.elem = d),
                (this.frameId = -1),
                (this.propType = 'transform'),
                (this.data = g),
                (this.v = new Matrix()),
                (this.pre = new Matrix()),
                (this.appliedTransformations = 0),
                this.initDynamicPropertyContainer(x || d),
                g.p && g.p.s
                  ? ((this.px = PropertyFactory.getProp(d, g.p.x, 0, 0, this)),
                    (this.py = PropertyFactory.getProp(d, g.p.y, 0, 0, this)),
                    g.p.z &&
                      (this.pz = PropertyFactory.getProp(d, g.p.z, 0, 0, this)))
                  : (this.p = PropertyFactory.getProp(
                      d,
                      g.p || { k: [0, 0, 0] },
                      1,
                      0,
                      this,
                    )),
                g.rx)
              ) {
                if (
                  ((this.rx = PropertyFactory.getProp(
                    d,
                    g.rx,
                    0,
                    degToRads,
                    this,
                  )),
                  (this.ry = PropertyFactory.getProp(
                    d,
                    g.ry,
                    0,
                    degToRads,
                    this,
                  )),
                  (this.rz = PropertyFactory.getProp(
                    d,
                    g.rz,
                    0,
                    degToRads,
                    this,
                  )),
                  g.or.k[0].ti)
                ) {
                  var b,
                    y = g.or.k.length;
                  for (b = 0; b < y; b += 1)
                    (g.or.k[b].to = null), (g.or.k[b].ti = null);
                }
                (this.or = PropertyFactory.getProp(
                  d,
                  g.or,
                  1,
                  degToRads,
                  this,
                )),
                  (this.or.sh = !0);
              } else
                this.r = PropertyFactory.getProp(
                  d,
                  g.r || { k: 0 },
                  0,
                  degToRads,
                  this,
                );
              g.sk &&
                ((this.sk = PropertyFactory.getProp(
                  d,
                  g.sk,
                  0,
                  degToRads,
                  this,
                )),
                (this.sa = PropertyFactory.getProp(
                  d,
                  g.sa,
                  0,
                  degToRads,
                  this,
                ))),
                (this.a = PropertyFactory.getProp(
                  d,
                  g.a || { k: [0, 0, 0] },
                  1,
                  0,
                  this,
                )),
                (this.s = PropertyFactory.getProp(
                  d,
                  g.s || { k: [100, 100, 100] },
                  1,
                  0.01,
                  this,
                )),
                g.o
                  ? (this.o = PropertyFactory.getProp(d, g.o, 0, 0.01, d))
                  : (this.o = {
                      _mdf: !1,
                      v: 1,
                    }),
                (this._isDirty = !0),
                this.dynamicProperties.length || this.getValue(!0);
            }

            (l.prototype = {
              applyToMatrix: e,
              getValue: i,
              precalculateMatrix: r,
              autoOrient: s,
            }),
              extendPrototype([DynamicPropertyContainer], l),
              (l.prototype.addDynamicProperty = a),
              (l.prototype._addDynamicProperty =
                DynamicPropertyContainer.prototype.addDynamicProperty);

            function m(d, g, x) {
              return new l(d, g, x);
            }

            return { getTransformProperty: m };
          })();

        function ShapePath() {
          (this.c = !1),
            (this._length = 0),
            (this._maxLength = 8),
            (this.v = createSizedArray(this._maxLength)),
            (this.o = createSizedArray(this._maxLength)),
            (this.i = createSizedArray(this._maxLength));
        }

        (ShapePath.prototype.setPathData = function (t, e) {
          (this.c = t), this.setLength(e);
          for (var i = 0; i < e; )
            (this.v[i] = pointPool.newElement()),
              (this.o[i] = pointPool.newElement()),
              (this.i[i] = pointPool.newElement()),
              (i += 1);
        }),
          (ShapePath.prototype.setLength = function (t) {
            for (; this._maxLength < t; ) this.doubleArrayLength();
            this._length = t;
          }),
          (ShapePath.prototype.doubleArrayLength = function () {
            (this.v = this.v.concat(createSizedArray(this._maxLength))),
              (this.i = this.i.concat(createSizedArray(this._maxLength))),
              (this.o = this.o.concat(createSizedArray(this._maxLength))),
              (this._maxLength *= 2);
          }),
          (ShapePath.prototype.setXYAt = function (t, e, i, r, s) {
            var a;
            switch (
              ((this._length = Math.max(this._length, r + 1)),
              this._length >= this._maxLength && this.doubleArrayLength(),
              i)
            ) {
              case 'v':
                a = this.v;
                break;
              case 'i':
                a = this.i;
                break;
              case 'o':
                a = this.o;
                break;
              default:
                a = [];
                break;
            }
            (!a[r] || (a[r] && !s)) && (a[r] = pointPool.newElement()),
              (a[r][0] = t),
              (a[r][1] = e);
          }),
          (ShapePath.prototype.setTripleAt = function (t, e, i, r, s, a, l, m) {
            this.setXYAt(t, e, 'v', l, m),
              this.setXYAt(i, r, 'o', l, m),
              this.setXYAt(s, a, 'i', l, m);
          }),
          (ShapePath.prototype.reverse = function () {
            var t = new ShapePath();
            t.setPathData(this.c, this._length);
            var e = this.v,
              i = this.o,
              r = this.i,
              s = 0;
            this.c &&
              (t.setTripleAt(
                e[0][0],
                e[0][1],
                r[0][0],
                r[0][1],
                i[0][0],
                i[0][1],
                0,
                !1,
              ),
              (s = 1));
            var a = this._length - 1,
              l = this._length,
              m;
            for (m = s; m < l; m += 1)
              t.setTripleAt(
                e[a][0],
                e[a][1],
                r[a][0],
                r[a][1],
                i[a][0],
                i[a][1],
                m,
                !1,
              ),
                (a -= 1);
            return t;
          });
        var ShapePropertyFactory = (function () {
            var t = -999999;

            function e(p, n, o) {
              var c = o.lastIndex,
                v,
                w,
                P,
                E,
                C,
                F,
                V,
                M,
                D,
                R = this.keyframes;
              if (p < R[0].t - this.offsetTime)
                (v = R[0].s[0]), (P = !0), (c = 0);
              else if (p >= R[R.length - 1].t - this.offsetTime)
                (v = R[R.length - 1].s
                  ? R[R.length - 1].s[0]
                  : R[R.length - 2].e[0]),
                  (P = !0);
              else {
                for (
                  var $ = c, I = R.length - 1, S = !0, _, A;
                  S &&
                  ((_ = R[$]), (A = R[$ + 1]), !(A.t - this.offsetTime > p));

                )
                  $ < I - 1 ? ($ += 1) : (S = !1);
                if (((P = _.h === 1), (c = $), !P)) {
                  if (p >= A.t - this.offsetTime) M = 1;
                  else if (p < _.t - this.offsetTime) M = 0;
                  else {
                    var L;
                    _.__fnct
                      ? (L = _.__fnct)
                      : ((L = BezierFactory.getBezierEasing(
                          _.o.x,
                          _.o.y,
                          _.i.x,
                          _.i.y,
                        ).get),
                        (_.__fnct = L)),
                      (M = L(
                        (p - (_.t - this.offsetTime)) /
                          (A.t - this.offsetTime - (_.t - this.offsetTime)),
                      ));
                  }
                  w = A.s ? A.s[0] : _.e[0];
                }
                v = _.s[0];
              }
              for (
                F = n._length, V = v.i[0].length, o.lastIndex = c, E = 0;
                E < F;
                E += 1
              )
                for (C = 0; C < V; C += 1)
                  (D = P ? v.i[E][C] : v.i[E][C] + (w.i[E][C] - v.i[E][C]) * M),
                    (n.i[E][C] = D),
                    (D = P
                      ? v.o[E][C]
                      : v.o[E][C] + (w.o[E][C] - v.o[E][C]) * M),
                    (n.o[E][C] = D),
                    (D = P
                      ? v.v[E][C]
                      : v.v[E][C] + (w.v[E][C] - v.v[E][C]) * M),
                    (n.v[E][C] = D);
            }

            function i() {
              var p = this.comp.renderedFrame - this.offsetTime,
                n = this.keyframes[0].t - this.offsetTime,
                o =
                  this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                c = this._caching.lastFrame;
              return (
                (c !== t && ((c < n && p < n) || (c > o && p > o))) ||
                  ((this._caching.lastIndex =
                    c < p ? this._caching.lastIndex : 0),
                  this.interpolateShape(p, this.pv, this._caching)),
                (this._caching.lastFrame = p),
                this.pv
              );
            }

            function r() {
              this.paths = this.localShapeCollection;
            }

            function s(p, n) {
              if (p._length !== n._length || p.c !== n.c) return !1;
              var o,
                c = p._length;
              for (o = 0; o < c; o += 1)
                if (
                  p.v[o][0] !== n.v[o][0] ||
                  p.v[o][1] !== n.v[o][1] ||
                  p.o[o][0] !== n.o[o][0] ||
                  p.o[o][1] !== n.o[o][1] ||
                  p.i[o][0] !== n.i[o][0] ||
                  p.i[o][1] !== n.i[o][1]
                )
                  return !1;
              return !0;
            }

            function a(p) {
              s(this.v, p) ||
                ((this.v = shapePool.clone(p)),
                this.localShapeCollection.releaseShapes(),
                this.localShapeCollection.addShape(this.v),
                (this._mdf = !0),
                (this.paths = this.localShapeCollection));
            }

            function l() {
              if (this.elem.globalData.frameId !== this.frameId) {
                if (!this.effectsSequence.length) {
                  this._mdf = !1;
                  return;
                }
                if (this.lock) {
                  this.setVValue(this.pv);
                  return;
                }
                (this.lock = !0), (this._mdf = !1);
                var p;
                this.kf
                  ? (p = this.pv)
                  : this.data.ks
                  ? (p = this.data.ks.k)
                  : (p = this.data.pt.k);
                var n,
                  o = this.effectsSequence.length;
                for (n = 0; n < o; n += 1) p = this.effectsSequence[n](p);
                this.setVValue(p),
                  (this.lock = !1),
                  (this.frameId = this.elem.globalData.frameId);
              }
            }

            function m(p, n, o) {
              (this.propType = 'shape'),
                (this.comp = p.comp),
                (this.container = p),
                (this.elem = p),
                (this.data = n),
                (this.k = !1),
                (this.kf = !1),
                (this._mdf = !1);
              var c = o === 3 ? n.pt.k : n.ks.k;
              (this.v = shapePool.clone(c)),
                (this.pv = shapePool.clone(this.v)),
                (this.localShapeCollection =
                  shapeCollectionPool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.paths.addShape(this.v),
                (this.reset = r),
                (this.effectsSequence = []);
            }

            function d(p) {
              this.effectsSequence.push(p),
                this.container.addDynamicProperty(this);
            }

            (m.prototype.interpolateShape = e),
              (m.prototype.getValue = l),
              (m.prototype.setVValue = a),
              (m.prototype.addEffect = d);

            function g(p, n, o) {
              (this.propType = 'shape'),
                (this.comp = p.comp),
                (this.elem = p),
                (this.container = p),
                (this.offsetTime = p.data.st),
                (this.keyframes = o === 3 ? n.pt.k : n.ks.k),
                (this.k = !0),
                (this.kf = !0);
              var c = this.keyframes[0].s[0].i.length;
              (this.v = shapePool.newElement()),
                this.v.setPathData(this.keyframes[0].s[0].c, c),
                (this.pv = shapePool.clone(this.v)),
                (this.localShapeCollection =
                  shapeCollectionPool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.paths.addShape(this.v),
                (this.lastFrame = t),
                (this.reset = r),
                (this._caching = {
                  lastFrame: t,
                  lastIndex: 0,
                }),
                (this.effectsSequence = [i.bind(this)]);
            }

            (g.prototype.getValue = l),
              (g.prototype.interpolateShape = e),
              (g.prototype.setVValue = a),
              (g.prototype.addEffect = d);
            var x = (function () {
                var p = roundCorner;

                function n(o, c) {
                  (this.v = shapePool.newElement()),
                    this.v.setPathData(!0, 4),
                    (this.localShapeCollection =
                      shapeCollectionPool.newShapeCollection()),
                    (this.paths = this.localShapeCollection),
                    this.localShapeCollection.addShape(this.v),
                    (this.d = c.d),
                    (this.elem = o),
                    (this.comp = o.comp),
                    (this.frameId = -1),
                    this.initDynamicPropertyContainer(o),
                    (this.p = PropertyFactory.getProp(o, c.p, 1, 0, this)),
                    (this.s = PropertyFactory.getProp(o, c.s, 1, 0, this)),
                    this.dynamicProperties.length
                      ? (this.k = !0)
                      : ((this.k = !1), this.convertEllToPath());
                }

                return (
                  (n.prototype = {
                    reset: r,
                    getValue: function () {
                      this.elem.globalData.frameId !== this.frameId &&
                        ((this.frameId = this.elem.globalData.frameId),
                        this.iterateDynamicProperties(),
                        this._mdf && this.convertEllToPath());
                    },
                    convertEllToPath: function () {
                      var o = this.p.v[0],
                        c = this.p.v[1],
                        v = this.s.v[0] / 2,
                        w = this.s.v[1] / 2,
                        P = this.d !== 3,
                        E = this.v;
                      (E.v[0][0] = o),
                        (E.v[0][1] = c - w),
                        (E.v[1][0] = P ? o + v : o - v),
                        (E.v[1][1] = c),
                        (E.v[2][0] = o),
                        (E.v[2][1] = c + w),
                        (E.v[3][0] = P ? o - v : o + v),
                        (E.v[3][1] = c),
                        (E.i[0][0] = P ? o - v * p : o + v * p),
                        (E.i[0][1] = c - w),
                        (E.i[1][0] = P ? o + v : o - v),
                        (E.i[1][1] = c - w * p),
                        (E.i[2][0] = P ? o + v * p : o - v * p),
                        (E.i[2][1] = c + w),
                        (E.i[3][0] = P ? o - v : o + v),
                        (E.i[3][1] = c + w * p),
                        (E.o[0][0] = P ? o + v * p : o - v * p),
                        (E.o[0][1] = c - w),
                        (E.o[1][0] = P ? o + v : o - v),
                        (E.o[1][1] = c + w * p),
                        (E.o[2][0] = P ? o - v * p : o + v * p),
                        (E.o[2][1] = c + w),
                        (E.o[3][0] = P ? o - v : o + v),
                        (E.o[3][1] = c - w * p);
                    },
                  }),
                  extendPrototype([DynamicPropertyContainer], n),
                  n
                );
              })(),
              b = (function () {
                function p(n, o) {
                  (this.v = shapePool.newElement()),
                    this.v.setPathData(!0, 0),
                    (this.elem = n),
                    (this.comp = n.comp),
                    (this.data = o),
                    (this.frameId = -1),
                    (this.d = o.d),
                    this.initDynamicPropertyContainer(n),
                    o.sy === 1
                      ? ((this.ir = PropertyFactory.getProp(
                          n,
                          o.ir,
                          0,
                          0,
                          this,
                        )),
                        (this.is = PropertyFactory.getProp(
                          n,
                          o.is,
                          0,
                          0.01,
                          this,
                        )),
                        (this.convertToPath = this.convertStarToPath))
                      : (this.convertToPath = this.convertPolygonToPath),
                    (this.pt = PropertyFactory.getProp(n, o.pt, 0, 0, this)),
                    (this.p = PropertyFactory.getProp(n, o.p, 1, 0, this)),
                    (this.r = PropertyFactory.getProp(
                      n,
                      o.r,
                      0,
                      degToRads,
                      this,
                    )),
                    (this.or = PropertyFactory.getProp(n, o.or, 0, 0, this)),
                    (this.os = PropertyFactory.getProp(n, o.os, 0, 0.01, this)),
                    (this.localShapeCollection =
                      shapeCollectionPool.newShapeCollection()),
                    this.localShapeCollection.addShape(this.v),
                    (this.paths = this.localShapeCollection),
                    this.dynamicProperties.length
                      ? (this.k = !0)
                      : ((this.k = !1), this.convertToPath());
                }

                return (
                  (p.prototype = {
                    reset: r,
                    getValue: function () {
                      this.elem.globalData.frameId !== this.frameId &&
                        ((this.frameId = this.elem.globalData.frameId),
                        this.iterateDynamicProperties(),
                        this._mdf && this.convertToPath());
                    },
                    convertStarToPath: function () {
                      var n = Math.floor(this.pt.v) * 2,
                        o = (Math.PI * 2) / n,
                        c = !0,
                        v = this.or.v,
                        w = this.ir.v,
                        P = this.os.v,
                        E = this.is.v,
                        C = (2 * Math.PI * v) / (n * 2),
                        F = (2 * Math.PI * w) / (n * 2),
                        V,
                        M,
                        D,
                        R,
                        $ = -Math.PI / 2;
                      $ += this.r.v;
                      var I = this.data.d === 3 ? -1 : 1;
                      for (this.v._length = 0, V = 0; V < n; V += 1) {
                        (M = c ? v : w), (D = c ? P : E), (R = c ? C : F);
                        var S = M * Math.cos($),
                          _ = M * Math.sin($),
                          A =
                            S === 0 && _ === 0
                              ? 0
                              : _ / Math.sqrt(S * S + _ * _),
                          L =
                            S === 0 && _ === 0
                              ? 0
                              : -S / Math.sqrt(S * S + _ * _);
                        (S += +this.p.v[0]),
                          (_ += +this.p.v[1]),
                          this.v.setTripleAt(
                            S,
                            _,
                            S - A * R * D * I,
                            _ - L * R * D * I,
                            S + A * R * D * I,
                            _ + L * R * D * I,
                            V,
                            !0,
                          ),
                          (c = !c),
                          ($ += o * I);
                      }
                    },
                    convertPolygonToPath: function () {
                      var n = Math.floor(this.pt.v),
                        o = (Math.PI * 2) / n,
                        c = this.or.v,
                        v = this.os.v,
                        w = (2 * Math.PI * c) / (n * 4),
                        P,
                        E = -Math.PI * 0.5,
                        C = this.data.d === 3 ? -1 : 1;
                      for (
                        E += this.r.v, this.v._length = 0, P = 0;
                        P < n;
                        P += 1
                      ) {
                        var F = c * Math.cos(E),
                          V = c * Math.sin(E),
                          M =
                            F === 0 && V === 0
                              ? 0
                              : V / Math.sqrt(F * F + V * V),
                          D =
                            F === 0 && V === 0
                              ? 0
                              : -F / Math.sqrt(F * F + V * V);
                        (F += +this.p.v[0]),
                          (V += +this.p.v[1]),
                          this.v.setTripleAt(
                            F,
                            V,
                            F - M * w * v * C,
                            V - D * w * v * C,
                            F + M * w * v * C,
                            V + D * w * v * C,
                            P,
                            !0,
                          ),
                          (E += o * C);
                      }
                      (this.paths.length = 0), (this.paths[0] = this.v);
                    },
                  }),
                  extendPrototype([DynamicPropertyContainer], p),
                  p
                );
              })(),
              y = (function () {
                function p(n, o) {
                  (this.v = shapePool.newElement()),
                    (this.v.c = !0),
                    (this.localShapeCollection =
                      shapeCollectionPool.newShapeCollection()),
                    this.localShapeCollection.addShape(this.v),
                    (this.paths = this.localShapeCollection),
                    (this.elem = n),
                    (this.comp = n.comp),
                    (this.frameId = -1),
                    (this.d = o.d),
                    this.initDynamicPropertyContainer(n),
                    (this.p = PropertyFactory.getProp(n, o.p, 1, 0, this)),
                    (this.s = PropertyFactory.getProp(n, o.s, 1, 0, this)),
                    (this.r = PropertyFactory.getProp(n, o.r, 0, 0, this)),
                    this.dynamicProperties.length
                      ? (this.k = !0)
                      : ((this.k = !1), this.convertRectToPath());
                }

                return (
                  (p.prototype = {
                    convertRectToPath: function () {
                      var n = this.p.v[0],
                        o = this.p.v[1],
                        c = this.s.v[0] / 2,
                        v = this.s.v[1] / 2,
                        w = bmMin(c, v, this.r.v),
                        P = w * (1 - roundCorner);
                      (this.v._length = 0),
                        this.d === 2 || this.d === 1
                          ? (this.v.setTripleAt(
                              n + c,
                              o - v + w,
                              n + c,
                              o - v + w,
                              n + c,
                              o - v + P,
                              0,
                              !0,
                            ),
                            this.v.setTripleAt(
                              n + c,
                              o + v - w,
                              n + c,
                              o + v - P,
                              n + c,
                              o + v - w,
                              1,
                              !0,
                            ),
                            w !== 0
                              ? (this.v.setTripleAt(
                                  n + c - w,
                                  o + v,
                                  n + c - w,
                                  o + v,
                                  n + c - P,
                                  o + v,
                                  2,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c + w,
                                  o + v,
                                  n - c + P,
                                  o + v,
                                  n - c + w,
                                  o + v,
                                  3,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c,
                                  o + v - w,
                                  n - c,
                                  o + v - w,
                                  n - c,
                                  o + v - P,
                                  4,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c,
                                  o - v + w,
                                  n - c,
                                  o - v + P,
                                  n - c,
                                  o - v + w,
                                  5,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c + w,
                                  o - v,
                                  n - c + w,
                                  o - v,
                                  n - c + P,
                                  o - v,
                                  6,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n + c - w,
                                  o - v,
                                  n + c - P,
                                  o - v,
                                  n + c - w,
                                  o - v,
                                  7,
                                  !0,
                                ))
                              : (this.v.setTripleAt(
                                  n - c,
                                  o + v,
                                  n - c + P,
                                  o + v,
                                  n - c,
                                  o + v,
                                  2,
                                ),
                                this.v.setTripleAt(
                                  n - c,
                                  o - v,
                                  n - c,
                                  o - v + P,
                                  n - c,
                                  o - v,
                                  3,
                                )))
                          : (this.v.setTripleAt(
                              n + c,
                              o - v + w,
                              n + c,
                              o - v + P,
                              n + c,
                              o - v + w,
                              0,
                              !0,
                            ),
                            w !== 0
                              ? (this.v.setTripleAt(
                                  n + c - w,
                                  o - v,
                                  n + c - w,
                                  o - v,
                                  n + c - P,
                                  o - v,
                                  1,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c + w,
                                  o - v,
                                  n - c + P,
                                  o - v,
                                  n - c + w,
                                  o - v,
                                  2,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c,
                                  o - v + w,
                                  n - c,
                                  o - v + w,
                                  n - c,
                                  o - v + P,
                                  3,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c,
                                  o + v - w,
                                  n - c,
                                  o + v - P,
                                  n - c,
                                  o + v - w,
                                  4,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c + w,
                                  o + v,
                                  n - c + w,
                                  o + v,
                                  n - c + P,
                                  o + v,
                                  5,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n + c - w,
                                  o + v,
                                  n + c - P,
                                  o + v,
                                  n + c - w,
                                  o + v,
                                  6,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n + c,
                                  o + v - w,
                                  n + c,
                                  o + v - w,
                                  n + c,
                                  o + v - P,
                                  7,
                                  !0,
                                ))
                              : (this.v.setTripleAt(
                                  n - c,
                                  o - v,
                                  n - c + P,
                                  o - v,
                                  n - c,
                                  o - v,
                                  1,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n - c,
                                  o + v,
                                  n - c,
                                  o + v - P,
                                  n - c,
                                  o + v,
                                  2,
                                  !0,
                                ),
                                this.v.setTripleAt(
                                  n + c,
                                  o + v,
                                  n + c - P,
                                  o + v,
                                  n + c,
                                  o + v,
                                  3,
                                  !0,
                                )));
                    },
                    getValue: function () {
                      this.elem.globalData.frameId !== this.frameId &&
                        ((this.frameId = this.elem.globalData.frameId),
                        this.iterateDynamicProperties(),
                        this._mdf && this.convertRectToPath());
                    },
                    reset: r,
                  }),
                  extendPrototype([DynamicPropertyContainer], p),
                  p
                );
              })();

            function u(p, n, o) {
              var c;
              if (o === 3 || o === 4) {
                var v = o === 3 ? n.pt : n.ks,
                  w = v.k;
                w.length ? (c = new g(p, n, o)) : (c = new m(p, n, o));
              } else
                o === 5
                  ? (c = new y(p, n))
                  : o === 6
                  ? (c = new x(p, n))
                  : o === 7 && (c = new b(p, n));
              return c.k && p.addDynamicProperty(c), c;
            }

            function k() {
              return m;
            }

            function f() {
              return g;
            }

            var h = {};
            return (
              (h.getShapeProp = u),
              (h.getConstructorFunction = k),
              (h.getKeyframedConstructorFunction = f),
              h
            );
          })(),
          ShapeModifiers = (function () {
            var t = {},
              e = {};
            (t.registerModifier = i), (t.getModifier = r);

            function i(s, a) {
              e[s] || (e[s] = a);
            }

            function r(s, a, l) {
              return new e[s](a, l);
            }

            return t;
          })();

        function ShapeModifier() {}

        (ShapeModifier.prototype.initModifierProperties = function () {}),
          (ShapeModifier.prototype.addShapeToModifier = function () {}),
          (ShapeModifier.prototype.addShape = function (t) {
            if (!this.closed) {
              t.sh.container.addDynamicProperty(t.sh);
              var e = {
                shape: t.sh,
                data: t,
                localShapeCollection: shapeCollectionPool.newShapeCollection(),
              };
              this.shapes.push(e),
                this.addShapeToModifier(e),
                this._isAnimated && t.setAsAnimated();
            }
          }),
          (ShapeModifier.prototype.init = function (t, e) {
            (this.shapes = []),
              (this.elem = t),
              this.initDynamicPropertyContainer(t),
              this.initModifierProperties(t, e),
              (this.frameId = initialDefaultFrame),
              (this.closed = !1),
              (this.k = !1),
              this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
          }),
          (ShapeModifier.prototype.processKeys = function () {
            this.elem.globalData.frameId !== this.frameId &&
              ((this.frameId = this.elem.globalData.frameId),
              this.iterateDynamicProperties());
          }),
          extendPrototype([DynamicPropertyContainer], ShapeModifier);

        function TrimModifier() {}

        extendPrototype([ShapeModifier], TrimModifier),
          (TrimModifier.prototype.initModifierProperties = function (t, e) {
            (this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this)),
              (this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this)),
              (this.o = PropertyFactory.getProp(t, e.o, 0, 0, this)),
              (this.sValue = 0),
              (this.eValue = 0),
              (this.getValue = this.processKeys),
              (this.m = e.m),
              (this._isAnimated =
                !!this.s.effectsSequence.length ||
                !!this.e.effectsSequence.length ||
                !!this.o.effectsSequence.length);
          }),
          (TrimModifier.prototype.addShapeToModifier = function (t) {
            t.pathsData = [];
          }),
          (TrimModifier.prototype.calculateShapeEdges = function (
            t,
            e,
            i,
            r,
            s,
          ) {
            var a = [];
            e <= 1
              ? a.push({ s: t, e })
              : t >= 1
              ? a.push({ s: t - 1, e: e - 1 })
              : (a.push({
                  s: t,
                  e: 1,
                }),
                a.push({ s: 0, e: e - 1 }));
            var l = [],
              m,
              d = a.length,
              g;
            for (m = 0; m < d; m += 1)
              if (((g = a[m]), !(g.e * s < r || g.s * s > r + i))) {
                var x, b;
                g.s * s <= r ? (x = 0) : (x = (g.s * s - r) / i),
                  g.e * s >= r + i ? (b = 1) : (b = (g.e * s - r) / i),
                  l.push([x, b]);
              }
            return l.length || l.push([0, 0]), l;
          }),
          (TrimModifier.prototype.releasePathsData = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) segmentsLengthPool.release(t[e]);
            return (t.length = 0), t;
          }),
          (TrimModifier.prototype.processShapes = function (t) {
            var e, i;
            if (this._mdf || t) {
              var r = (this.o.v % 360) / 360;
              if (
                (r < 0 && (r += 1),
                this.s.v > 1
                  ? (e = 1 + r)
                  : this.s.v < 0
                  ? (e = 0 + r)
                  : (e = this.s.v + r),
                this.e.v > 1
                  ? (i = 1 + r)
                  : this.e.v < 0
                  ? (i = 0 + r)
                  : (i = this.e.v + r),
                e > i)
              ) {
                var s = e;
                (e = i), (i = s);
              }
              (e = Math.round(e * 1e4) * 1e-4),
                (i = Math.round(i * 1e4) * 1e-4),
                (this.sValue = e),
                (this.eValue = i);
            } else (e = this.sValue), (i = this.eValue);
            var a,
              l,
              m = this.shapes.length,
              d,
              g,
              x,
              b,
              y,
              u = 0;
            if (i === e)
              for (l = 0; l < m; l += 1)
                this.shapes[l].localShapeCollection.releaseShapes(),
                  (this.shapes[l].shape._mdf = !0),
                  (this.shapes[l].shape.paths =
                    this.shapes[l].localShapeCollection),
                  this._mdf && (this.shapes[l].pathsData.length = 0);
            else if ((i === 1 && e === 0) || (i === 0 && e === 1)) {
              if (this._mdf)
                for (l = 0; l < m; l += 1)
                  (this.shapes[l].pathsData.length = 0),
                    (this.shapes[l].shape._mdf = !0);
            } else {
              var k = [],
                f,
                h;
              for (l = 0; l < m; l += 1)
                if (
                  ((f = this.shapes[l]),
                  !f.shape._mdf && !this._mdf && !t && this.m !== 2)
                )
                  f.shape.paths = f.localShapeCollection;
                else {
                  if (
                    ((a = f.shape.paths),
                    (g = a._length),
                    (y = 0),
                    !f.shape._mdf && f.pathsData.length)
                  )
                    y = f.totalShapeLength;
                  else {
                    for (
                      x = this.releasePathsData(f.pathsData), d = 0;
                      d < g;
                      d += 1
                    )
                      (b = bez.getSegmentsLength(a.shapes[d])),
                        x.push(b),
                        (y += b.totalLength);
                    (f.totalShapeLength = y), (f.pathsData = x);
                  }
                  (u += y), (f.shape._mdf = !0);
                }
              var p = e,
                n = i,
                o = 0,
                c;
              for (l = m - 1; l >= 0; l -= 1)
                if (((f = this.shapes[l]), f.shape._mdf)) {
                  for (
                    h = f.localShapeCollection,
                      h.releaseShapes(),
                      this.m === 2 && m > 1
                        ? ((c = this.calculateShapeEdges(
                            e,
                            i,
                            f.totalShapeLength,
                            o,
                            u,
                          )),
                          (o += f.totalShapeLength))
                        : (c = [[p, n]]),
                      g = c.length,
                      d = 0;
                    d < g;
                    d += 1
                  ) {
                    (p = c[d][0]),
                      (n = c[d][1]),
                      (k.length = 0),
                      n <= 1
                        ? k.push({
                            s: f.totalShapeLength * p,
                            e: f.totalShapeLength * n,
                          })
                        : p >= 1
                        ? k.push({
                            s: f.totalShapeLength * (p - 1),
                            e: f.totalShapeLength * (n - 1),
                          })
                        : (k.push({
                            s: f.totalShapeLength * p,
                            e: f.totalShapeLength,
                          }),
                          k.push({
                            s: 0,
                            e: f.totalShapeLength * (n - 1),
                          }));
                    var v = this.addShapes(f, k[0]);
                    if (k[0].s !== k[0].e) {
                      if (k.length > 1) {
                        var w = f.shape.paths.shapes[f.shape.paths._length - 1];
                        if (w.c) {
                          var P = v.pop();
                          this.addPaths(v, h), (v = this.addShapes(f, k[1], P));
                        } else
                          this.addPaths(v, h), (v = this.addShapes(f, k[1]));
                      }
                      this.addPaths(v, h);
                    }
                  }
                  f.shape.paths = h;
                }
            }
          }),
          (TrimModifier.prototype.addPaths = function (t, e) {
            var i,
              r = t.length;
            for (i = 0; i < r; i += 1) e.addShape(t[i]);
          }),
          (TrimModifier.prototype.addSegment = function (t, e, i, r, s, a, l) {
            s.setXYAt(e[0], e[1], 'o', a),
              s.setXYAt(i[0], i[1], 'i', a + 1),
              l && s.setXYAt(t[0], t[1], 'v', a),
              s.setXYAt(r[0], r[1], 'v', a + 1);
          }),
          (TrimModifier.prototype.addSegmentFromArray = function (t, e, i, r) {
            e.setXYAt(t[1], t[5], 'o', i),
              e.setXYAt(t[2], t[6], 'i', i + 1),
              r && e.setXYAt(t[0], t[4], 'v', i),
              e.setXYAt(t[3], t[7], 'v', i + 1);
          }),
          (TrimModifier.prototype.addShapes = function (t, e, i) {
            var r = t.pathsData,
              s = t.shape.paths.shapes,
              a,
              l = t.shape.paths._length,
              m,
              d,
              g = 0,
              x,
              b,
              y,
              u,
              k = [],
              f,
              h = !0;
            for (
              i
                ? ((b = i._length), (f = i._length))
                : ((i = shapePool.newElement()), (b = 0), (f = 0)),
                k.push(i),
                a = 0;
              a < l;
              a += 1
            ) {
              for (
                y = r[a].lengths,
                  i.c = s[a].c,
                  d = s[a].c ? y.length : y.length + 1,
                  m = 1;
                m < d;
                m += 1
              )
                if (((x = y[m - 1]), g + x.addedLength < e.s))
                  (g += x.addedLength), (i.c = !1);
                else if (g > e.e) {
                  i.c = !1;
                  break;
                } else
                  e.s <= g && e.e >= g + x.addedLength
                    ? (this.addSegment(
                        s[a].v[m - 1],
                        s[a].o[m - 1],
                        s[a].i[m],
                        s[a].v[m],
                        i,
                        b,
                        h,
                      ),
                      (h = !1))
                    : ((u = bez.getNewSegment(
                        s[a].v[m - 1],
                        s[a].v[m],
                        s[a].o[m - 1],
                        s[a].i[m],
                        (e.s - g) / x.addedLength,
                        (e.e - g) / x.addedLength,
                        y[m - 1],
                      )),
                      this.addSegmentFromArray(u, i, b, h),
                      (h = !1),
                      (i.c = !1)),
                    (g += x.addedLength),
                    (b += 1);
              if (s[a].c && y.length) {
                if (((x = y[m - 1]), g <= e.e)) {
                  var p = y[m - 1].addedLength;
                  e.s <= g && e.e >= g + p
                    ? (this.addSegment(
                        s[a].v[m - 1],
                        s[a].o[m - 1],
                        s[a].i[0],
                        s[a].v[0],
                        i,
                        b,
                        h,
                      ),
                      (h = !1))
                    : ((u = bez.getNewSegment(
                        s[a].v[m - 1],
                        s[a].v[0],
                        s[a].o[m - 1],
                        s[a].i[0],
                        (e.s - g) / p,
                        (e.e - g) / p,
                        y[m - 1],
                      )),
                      this.addSegmentFromArray(u, i, b, h),
                      (h = !1),
                      (i.c = !1));
                } else i.c = !1;
                (g += x.addedLength), (b += 1);
              }
              if (
                (i._length &&
                  (i.setXYAt(i.v[f][0], i.v[f][1], 'i', f),
                  i.setXYAt(
                    i.v[i._length - 1][0],
                    i.v[i._length - 1][1],
                    'o',
                    i._length - 1,
                  )),
                g > e.e)
              )
                break;
              a < l - 1 &&
                ((i = shapePool.newElement()), (h = !0), k.push(i), (b = 0));
            }
            return k;
          }),
          ShapeModifiers.registerModifier('tm', TrimModifier);

        function RoundCornersModifier() {}

        extendPrototype([ShapeModifier], RoundCornersModifier),
          (RoundCornersModifier.prototype.initModifierProperties = function (
            t,
            e,
          ) {
            (this.getValue = this.processKeys),
              (this.rd = PropertyFactory.getProp(t, e.r, 0, null, this)),
              (this._isAnimated = !!this.rd.effectsSequence.length);
          }),
          (RoundCornersModifier.prototype.processPath = function (t, e) {
            var i = shapePool.newElement();
            i.c = t.c;
            var r,
              s = t._length,
              a,
              l,
              m,
              d,
              g,
              x,
              b = 0,
              y,
              u,
              k,
              f,
              h,
              p;
            for (r = 0; r < s; r += 1)
              (a = t.v[r]),
                (m = t.o[r]),
                (l = t.i[r]),
                a[0] === m[0] && a[1] === m[1] && a[0] === l[0] && a[1] === l[1]
                  ? (r === 0 || r === s - 1) && !t.c
                    ? (i.setTripleAt(a[0], a[1], m[0], m[1], l[0], l[1], b),
                      (b += 1))
                    : (r === 0 ? (d = t.v[s - 1]) : (d = t.v[r - 1]),
                      (g = Math.sqrt(
                        Math.pow(a[0] - d[0], 2) + Math.pow(a[1] - d[1], 2),
                      )),
                      (x = g ? Math.min(g / 2, e) / g : 0),
                      (h = a[0] + (d[0] - a[0]) * x),
                      (y = h),
                      (p = a[1] - (a[1] - d[1]) * x),
                      (u = p),
                      (k = y - (y - a[0]) * roundCorner),
                      (f = u - (u - a[1]) * roundCorner),
                      i.setTripleAt(y, u, k, f, h, p, b),
                      (b += 1),
                      r === s - 1 ? (d = t.v[0]) : (d = t.v[r + 1]),
                      (g = Math.sqrt(
                        Math.pow(a[0] - d[0], 2) + Math.pow(a[1] - d[1], 2),
                      )),
                      (x = g ? Math.min(g / 2, e) / g : 0),
                      (k = a[0] + (d[0] - a[0]) * x),
                      (y = k),
                      (f = a[1] + (d[1] - a[1]) * x),
                      (u = f),
                      (h = y - (y - a[0]) * roundCorner),
                      (p = u - (u - a[1]) * roundCorner),
                      i.setTripleAt(y, u, k, f, h, p, b),
                      (b += 1))
                  : (i.setTripleAt(
                      t.v[r][0],
                      t.v[r][1],
                      t.o[r][0],
                      t.o[r][1],
                      t.i[r][0],
                      t.i[r][1],
                      b,
                    ),
                    (b += 1));
            return i;
          }),
          (RoundCornersModifier.prototype.processShapes = function (t) {
            var e,
              i,
              r = this.shapes.length,
              s,
              a,
              l = this.rd.v;
            if (l !== 0) {
              var m, d;
              for (i = 0; i < r; i += 1) {
                if (
                  ((m = this.shapes[i]),
                  (d = m.localShapeCollection),
                  !(!m.shape._mdf && !this._mdf && !t))
                )
                  for (
                    d.releaseShapes(),
                      m.shape._mdf = !0,
                      e = m.shape.paths.shapes,
                      a = m.shape.paths._length,
                      s = 0;
                    s < a;
                    s += 1
                  )
                    d.addShape(this.processPath(e[s], l));
                m.shape.paths = m.localShapeCollection;
              }
            }
            this.dynamicProperties.length || (this._mdf = !1);
          }),
          ShapeModifiers.registerModifier('rd', RoundCornersModifier);

        function PuckerAndBloatModifier() {}

        extendPrototype([ShapeModifier], PuckerAndBloatModifier),
          (PuckerAndBloatModifier.prototype.initModifierProperties = function (
            t,
            e,
          ) {
            (this.getValue = this.processKeys),
              (this.amount = PropertyFactory.getProp(t, e.a, 0, null, this)),
              (this._isAnimated = !!this.amount.effectsSequence.length);
          }),
          (PuckerAndBloatModifier.prototype.processPath = function (t, e) {
            var i = e / 100,
              r = [0, 0],
              s = t._length,
              a = 0;
            for (a = 0; a < s; a += 1) (r[0] += t.v[a][0]), (r[1] += t.v[a][1]);
            (r[0] /= s), (r[1] /= s);
            var l = shapePool.newElement();
            l.c = t.c;
            var m, d, g, x, b, y;
            for (a = 0; a < s; a += 1)
              (m = t.v[a][0] + (r[0] - t.v[a][0]) * i),
                (d = t.v[a][1] + (r[1] - t.v[a][1]) * i),
                (g = t.o[a][0] + (r[0] - t.o[a][0]) * -i),
                (x = t.o[a][1] + (r[1] - t.o[a][1]) * -i),
                (b = t.i[a][0] + (r[0] - t.i[a][0]) * -i),
                (y = t.i[a][1] + (r[1] - t.i[a][1]) * -i),
                l.setTripleAt(m, d, g, x, b, y, a);
            return l;
          }),
          (PuckerAndBloatModifier.prototype.processShapes = function (t) {
            var e,
              i,
              r = this.shapes.length,
              s,
              a,
              l = this.amount.v;
            if (l !== 0) {
              var m, d;
              for (i = 0; i < r; i += 1) {
                if (
                  ((m = this.shapes[i]),
                  (d = m.localShapeCollection),
                  !(!m.shape._mdf && !this._mdf && !t))
                )
                  for (
                    d.releaseShapes(),
                      m.shape._mdf = !0,
                      e = m.shape.paths.shapes,
                      a = m.shape.paths._length,
                      s = 0;
                    s < a;
                    s += 1
                  )
                    d.addShape(this.processPath(e[s], l));
                m.shape.paths = m.localShapeCollection;
              }
            }
            this.dynamicProperties.length || (this._mdf = !1);
          }),
          ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier);

        function RepeaterModifier() {}

        extendPrototype([ShapeModifier], RepeaterModifier),
          (RepeaterModifier.prototype.initModifierProperties = function (t, e) {
            (this.getValue = this.processKeys),
              (this.c = PropertyFactory.getProp(t, e.c, 0, null, this)),
              (this.o = PropertyFactory.getProp(t, e.o, 0, null, this)),
              (this.tr = TransformPropertyFactory.getTransformProperty(
                t,
                e.tr,
                this,
              )),
              (this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this)),
              (this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this)),
              (this.data = e),
              this.dynamicProperties.length || this.getValue(!0),
              (this._isAnimated = !!this.dynamicProperties.length),
              (this.pMatrix = new Matrix()),
              (this.rMatrix = new Matrix()),
              (this.sMatrix = new Matrix()),
              (this.tMatrix = new Matrix()),
              (this.matrix = new Matrix());
          }),
          (RepeaterModifier.prototype.applyTransforms = function (
            t,
            e,
            i,
            r,
            s,
            a,
          ) {
            var l = a ? -1 : 1,
              m = r.s.v[0] + (1 - r.s.v[0]) * (1 - s),
              d = r.s.v[1] + (1 - r.s.v[1]) * (1 - s);
            t.translate(r.p.v[0] * l * s, r.p.v[1] * l * s, r.p.v[2]),
              e.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]),
              e.rotate(-r.r.v * l * s),
              e.translate(r.a.v[0], r.a.v[1], r.a.v[2]),
              i.translate(-r.a.v[0], -r.a.v[1], r.a.v[2]),
              i.scale(a ? 1 / m : m, a ? 1 / d : d),
              i.translate(r.a.v[0], r.a.v[1], r.a.v[2]);
          }),
          (RepeaterModifier.prototype.init = function (t, e, i, r) {
            for (
              this.elem = t,
                this.arr = e,
                this.pos = i,
                this.elemsData = r,
                this._currentCopies = 0,
                this._elements = [],
                this._groups = [],
                this.frameId = -1,
                this.initDynamicPropertyContainer(t),
                this.initModifierProperties(t, e[i]);
              i > 0;

            )
              (i -= 1), this._elements.unshift(e[i]);
            this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
          }),
          (RepeaterModifier.prototype.resetElements = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1)
              (t[e]._processed = !1),
                t[e].ty === 'gr' && this.resetElements(t[e].it);
          }),
          (RepeaterModifier.prototype.cloneElements = function (t) {
            var e = JSON.parse(JSON.stringify(t));
            return this.resetElements(e), e;
          }),
          (RepeaterModifier.prototype.changeGroupRender = function (t, e) {
            var i,
              r = t.length;
            for (i = 0; i < r; i += 1)
              (t[i]._render = e),
                t[i].ty === 'gr' && this.changeGroupRender(t[i].it, e);
          }),
          (RepeaterModifier.prototype.processShapes = function (t) {
            var e,
              i,
              r,
              s,
              a,
              l = !1;
            if (this._mdf || t) {
              var m = Math.ceil(this.c.v);
              if (this._groups.length < m) {
                for (; this._groups.length < m; ) {
                  var d = { it: this.cloneElements(this._elements), ty: 'gr' };
                  d.it.push({
                    a: { a: 0, ix: 1, k: [0, 0] },
                    nm: 'Transform',
                    o: { a: 0, ix: 7, k: 100 },
                    p: { a: 0, ix: 2, k: [0, 0] },
                    r: {
                      a: 1,
                      ix: 6,
                      k: [
                        { s: 0, e: 0, t: 0 },
                        { s: 0, e: 0, t: 1 },
                      ],
                    },
                    s: { a: 0, ix: 3, k: [100, 100] },
                    sa: { a: 0, ix: 5, k: 0 },
                    sk: { a: 0, ix: 4, k: 0 },
                    ty: 'tr',
                  }),
                    this.arr.splice(0, 0, d),
                    this._groups.splice(0, 0, d),
                    (this._currentCopies += 1);
                }
                this.elem.reloadShapes(), (l = !0);
              }
              a = 0;
              var g;
              for (r = 0; r <= this._groups.length - 1; r += 1) {
                if (
                  ((g = a < m),
                  (this._groups[r]._render = g),
                  this.changeGroupRender(this._groups[r].it, g),
                  !g)
                ) {
                  var x = this.elemsData[r].it,
                    b = x[x.length - 1];
                  b.transform.op.v !== 0
                    ? ((b.transform.op._mdf = !0), (b.transform.op.v = 0))
                    : (b.transform.op._mdf = !1);
                }
                a += 1;
              }
              this._currentCopies = m;
              var y = this.o.v,
                u = y % 1,
                k = y > 0 ? Math.floor(y) : Math.ceil(y),
                f = this.pMatrix.props,
                h = this.rMatrix.props,
                p = this.sMatrix.props;
              this.pMatrix.reset(),
                this.rMatrix.reset(),
                this.sMatrix.reset(),
                this.tMatrix.reset(),
                this.matrix.reset();
              var n = 0;
              if (y > 0) {
                for (; n < k; )
                  this.applyTransforms(
                    this.pMatrix,
                    this.rMatrix,
                    this.sMatrix,
                    this.tr,
                    1,
                    !1,
                  ),
                    (n += 1);
                u &&
                  (this.applyTransforms(
                    this.pMatrix,
                    this.rMatrix,
                    this.sMatrix,
                    this.tr,
                    u,
                    !1,
                  ),
                  (n += u));
              } else if (y < 0) {
                for (; n > k; )
                  this.applyTransforms(
                    this.pMatrix,
                    this.rMatrix,
                    this.sMatrix,
                    this.tr,
                    1,
                    !0,
                  ),
                    (n -= 1);
                u &&
                  (this.applyTransforms(
                    this.pMatrix,
                    this.rMatrix,
                    this.sMatrix,
                    this.tr,
                    -u,
                    !0,
                  ),
                  (n -= u));
              }
              (r = this.data.m === 1 ? 0 : this._currentCopies - 1),
                (s = this.data.m === 1 ? 1 : -1),
                (a = this._currentCopies);
              for (var o, c; a; ) {
                if (
                  ((e = this.elemsData[r].it),
                  (i = e[e.length - 1].transform.mProps.v.props),
                  (c = i.length),
                  (e[e.length - 1].transform.mProps._mdf = !0),
                  (e[e.length - 1].transform.op._mdf = !0),
                  (e[e.length - 1].transform.op.v =
                    this._currentCopies === 1
                      ? this.so.v
                      : this.so.v +
                        (this.eo.v - this.so.v) *
                          (r / (this._currentCopies - 1))),
                  n !== 0)
                ) {
                  for (
                    ((r !== 0 && s === 1) ||
                      (r !== this._currentCopies - 1 && s === -1)) &&
                      this.applyTransforms(
                        this.pMatrix,
                        this.rMatrix,
                        this.sMatrix,
                        this.tr,
                        1,
                        !1,
                      ),
                      this.matrix.transform(
                        h[0],
                        h[1],
                        h[2],
                        h[3],
                        h[4],
                        h[5],
                        h[6],
                        h[7],
                        h[8],
                        h[9],
                        h[10],
                        h[11],
                        h[12],
                        h[13],
                        h[14],
                        h[15],
                      ),
                      this.matrix.transform(
                        p[0],
                        p[1],
                        p[2],
                        p[3],
                        p[4],
                        p[5],
                        p[6],
                        p[7],
                        p[8],
                        p[9],
                        p[10],
                        p[11],
                        p[12],
                        p[13],
                        p[14],
                        p[15],
                      ),
                      this.matrix.transform(
                        f[0],
                        f[1],
                        f[2],
                        f[3],
                        f[4],
                        f[5],
                        f[6],
                        f[7],
                        f[8],
                        f[9],
                        f[10],
                        f[11],
                        f[12],
                        f[13],
                        f[14],
                        f[15],
                      ),
                      o = 0;
                    o < c;
                    o += 1
                  )
                    i[o] = this.matrix.props[o];
                  this.matrix.reset();
                } else
                  for (this.matrix.reset(), o = 0; o < c; o += 1)
                    i[o] = this.matrix.props[o];
                (n += 1), (a -= 1), (r += s);
              }
            } else
              for (a = this._currentCopies, r = 0, s = 1; a; )
                (e = this.elemsData[r].it),
                  (i = e[e.length - 1].transform.mProps.v.props),
                  (e[e.length - 1].transform.mProps._mdf = !1),
                  (e[e.length - 1].transform.op._mdf = !1),
                  (a -= 1),
                  (r += s);
            return l;
          }),
          (RepeaterModifier.prototype.addShape = function () {}),
          ShapeModifiers.registerModifier('rp', RepeaterModifier);

        function ShapeCollection() {
          (this._length = 0),
            (this._maxLength = 4),
            (this.shapes = createSizedArray(this._maxLength));
        }

        (ShapeCollection.prototype.addShape = function (t) {
          this._length === this._maxLength &&
            ((this.shapes = this.shapes.concat(
              createSizedArray(this._maxLength),
            )),
            (this._maxLength *= 2)),
            (this.shapes[this._length] = t),
            (this._length += 1);
        }),
          (ShapeCollection.prototype.releaseShapes = function () {
            var t;
            for (t = 0; t < this._length; t += 1)
              shapePool.release(this.shapes[t]);
            this._length = 0;
          });

        function DashProperty(t, e, i, r) {
          (this.elem = t),
            (this.frameId = -1),
            (this.dataProps = createSizedArray(e.length)),
            (this.renderer = i),
            (this.k = !1),
            (this.dashStr = ''),
            (this.dashArray = createTypedArray(
              'float32',
              e.length ? e.length - 1 : 0,
            )),
            (this.dashoffset = createTypedArray('float32', 1)),
            this.initDynamicPropertyContainer(r);
          var s,
            a = e.length || 0,
            l;
          for (s = 0; s < a; s += 1)
            (l = PropertyFactory.getProp(t, e[s].v, 0, 0, this)),
              (this.k = l.k || this.k),
              (this.dataProps[s] = {
                n: e[s].n,
                p: l,
              });
          this.k || this.getValue(!0), (this._isAnimated = this.k);
        }

        (DashProperty.prototype.getValue = function (t) {
          if (
            !(this.elem.globalData.frameId === this.frameId && !t) &&
            ((this.frameId = this.elem.globalData.frameId),
            this.iterateDynamicProperties(),
            (this._mdf = this._mdf || t),
            this._mdf)
          ) {
            var e = 0,
              i = this.dataProps.length;
            for (
              this.renderer === 'svg' && (this.dashStr = ''), e = 0;
              e < i;
              e += 1
            )
              this.dataProps[e].n !== 'o'
                ? this.renderer === 'svg'
                  ? (this.dashStr += ' ' + this.dataProps[e].p.v)
                  : (this.dashArray[e] = this.dataProps[e].p.v)
                : (this.dashoffset[0] = this.dataProps[e].p.v);
          }
        }),
          extendPrototype([DynamicPropertyContainer], DashProperty);

        function GradientProperty(t, e, i) {
          (this.data = e), (this.c = createTypedArray('uint8c', e.p * 4));
          var r = e.k.k[0].s
            ? e.k.k[0].s.length - e.p * 4
            : e.k.k.length - e.p * 4;
          (this.o = createTypedArray('float32', r)),
            (this._cmdf = !1),
            (this._omdf = !1),
            (this._collapsable = this.checkCollapsable()),
            (this._hasOpacity = r),
            this.initDynamicPropertyContainer(i),
            (this.prop = PropertyFactory.getProp(t, e.k, 1, null, this)),
            (this.k = this.prop.k),
            this.getValue(!0);
        }

        (GradientProperty.prototype.comparePoints = function (t, e) {
          for (var i = 0, r = this.o.length / 2, s; i < r; ) {
            if (((s = Math.abs(t[i * 4] - t[e * 4 + i * 2])), s > 0.01))
              return !1;
            i += 1;
          }
          return !0;
        }),
          (GradientProperty.prototype.checkCollapsable = function () {
            if (this.o.length / 2 !== this.c.length / 4) return !1;
            if (this.data.k.k[0].s)
              for (var t = 0, e = this.data.k.k.length; t < e; ) {
                if (!this.comparePoints(this.data.k.k[t].s, this.data.p))
                  return !1;
                t += 1;
              }
            else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
            return !0;
          }),
          (GradientProperty.prototype.getValue = function (t) {
            if (
              (this.prop.getValue(),
              (this._mdf = !1),
              (this._cmdf = !1),
              (this._omdf = !1),
              this.prop._mdf || t)
            ) {
              var e,
                i = this.data.p * 4,
                r,
                s;
              for (e = 0; e < i; e += 1)
                (r = e % 4 === 0 ? 100 : 255),
                  (s = Math.round(this.prop.v[e] * r)),
                  this.c[e] !== s && ((this.c[e] = s), (this._cmdf = !t));
              if (this.o.length)
                for (i = this.prop.v.length, e = this.data.p * 4; e < i; e += 1)
                  (r = e % 2 === 0 ? 100 : 1),
                    (s =
                      e % 2 === 0
                        ? Math.round(this.prop.v[e] * 100)
                        : this.prop.v[e]),
                    this.o[e - this.data.p * 4] !== s &&
                      ((this.o[e - this.data.p * 4] = s), (this._omdf = !t));
              this._mdf = !t;
            }
          }),
          extendPrototype([DynamicPropertyContainer], GradientProperty);
        var buildShapeString = function (t, e, i, r) {
          if (e === 0) return '';
          var s = t.o,
            a = t.i,
            l = t.v,
            m,
            d = ' M' + r.applyToPointStringified(l[0][0], l[0][1]);
          for (m = 1; m < e; m += 1)
            d +=
              ' C' +
              r.applyToPointStringified(s[m - 1][0], s[m - 1][1]) +
              ' ' +
              r.applyToPointStringified(a[m][0], a[m][1]) +
              ' ' +
              r.applyToPointStringified(l[m][0], l[m][1]);
          return (
            i &&
              e &&
              ((d +=
                ' C' +
                r.applyToPointStringified(s[m - 1][0], s[m - 1][1]) +
                ' ' +
                r.applyToPointStringified(a[0][0], a[0][1]) +
                ' ' +
                r.applyToPointStringified(l[0][0], l[0][1])),
              (d += 'z')),
            d
          );
        };
        let Howl = !1;
        var audioControllerFactory = (function () {
            function t(e) {
              (this.audios = []),
                (this.audioFactory = e),
                (this._volume = 1),
                (this._isMuted = !1);
            }

            return (
              (t.prototype = {
                addAudio: function (e) {
                  this.audios.push(e);
                },
                pause: function () {
                  var e,
                    i = this.audios.length;
                  for (e = 0; e < i; e += 1) this.audios[e].pause();
                },
                resume: function () {
                  var e,
                    i = this.audios.length;
                  for (e = 0; e < i; e += 1) this.audios[e].resume();
                },
                setRate: function (e) {
                  var i,
                    r = this.audios.length;
                  for (i = 0; i < r; i += 1) this.audios[i].setRate(e);
                },
                createAudio: function (e) {
                  return this.audioFactory
                    ? this.audioFactory(e)
                    : Howl
                    ? new Howl({ src: [e] })
                    : {
                        isPlaying: !1,
                        play: function () {
                          this.isPlaying = !0;
                        },
                        seek: function () {
                          this.isPlaying = !1;
                        },
                        pause: () => {},
                        playing: function () {},
                        rate: function () {},
                        setVolume: function () {},
                      };
                },
                setAudioFactory: function (e) {
                  this.audioFactory = e;
                },
                setVolume: function (e) {
                  (this._volume = e), this._updateVolume();
                },
                mute: function () {
                  (this._isMuted = !0), this._updateVolume();
                },
                unmute: function () {
                  (this._isMuted = !1), this._updateVolume();
                },
                getVolume: function () {
                  return this._volume;
                },
                _updateVolume: function () {
                  var e,
                    i = this.audios.length;
                  for (e = 0; e < i; e += 1)
                    this.audios[e].volume(
                      this._volume * (this._isMuted ? 0 : 1),
                    );
                },
              }),
              function () {
                return new t();
              }
            );
          })(),
          ImagePreloader = (function () {
            var t = (function () {
              var p = createTag('canvas');
              (p.width = 1), (p.height = 1);
              var n = p.getContext('2d');
              return (n.fillStyle = 'rgba(0,0,0,0)'), n.fillRect(0, 0, 1, 1), p;
            })();

            function e() {
              (this.loadedAssets += 1),
                this.loadedAssets === this.totalImages &&
                  this.loadedFootagesCount === this.totalFootages &&
                  this.imagesLoadedCb &&
                  this.imagesLoadedCb(null);
            }

            function i() {
              (this.loadedFootagesCount += 1),
                this.loadedAssets === this.totalImages &&
                  this.loadedFootagesCount === this.totalFootages &&
                  this.imagesLoadedCb &&
                  this.imagesLoadedCb(null);
            }

            function r(p, n, o) {
              var c = '';
              if (p.e) c = p.p;
              else if (n) {
                var v = p.p;
                v.indexOf('images/') !== -1 && (v = v.split('/')[1]),
                  (c = n + v);
              } else (c = o), (c += p.u ? p.u : ''), (c += p.p);
              return c;
            }

            function s(p) {
              var n = 0,
                o = setInterval(
                  function () {
                    var c = p.getBBox();
                    (c.width || n > 500) &&
                      (this._imageLoaded(), clearInterval(o)),
                      (n += 1);
                  }.bind(this),
                  50,
                );
            }

            function a(p) {
              var n = r(p, this.assetsPath, this.path),
                o = new Image();
              isSafari
                ? this.testImageLoaded(o)
                : o.addEventListener('load', this._imageLoaded, !1),
                o.addEventListener(
                  'error',
                  function () {
                    (c.img = t), this._imageLoaded();
                  }.bind(this),
                  !1,
                ),
                o.setAttributeNS('http://www.w3.org/1999/xlink', 'href', n),
                this._elementHelper.append
                  ? this._elementHelper.append(o)
                  : this._elementHelper.appendChild(o);
              var c = { img: o, assetData: p };
              return c;
            }

            function l(p) {
              var n = r(p, this.assetsPath, this.path),
                o = new Image();
              o.addEventListener('load', this._imageLoaded, !1),
                o.addEventListener(
                  'error',
                  function () {
                    (c.img = t), this._imageLoaded();
                  }.bind(this),
                  !1,
                ),
                (o.src = n);
              var c = { img: o, assetData: p };
              return c;
            }

            function m(p) {
              var n = { assetData: p },
                o = r(p, this.assetsPath, this.path);
              return (
                assetLoader.load(
                  o,
                  function (c) {
                    (n.img = c), this._footageLoaded();
                  }.bind(this),
                  function () {
                    (n.img = {}), this._footageLoaded();
                  }.bind(this),
                ),
                n
              );
            }

            function d(p, n) {
              this.imagesLoadedCb = n;
              var o,
                c = p.length;
              for (o = 0; o < c; o += 1)
                p[o].layers ||
                  (p[o].t
                    ? p[o].t === 3 &&
                      ((this.totalFootages += 1),
                      this.images.push(this.createFootageData(p[o])))
                    : ((this.totalImages += 1),
                      this.images.push(this._createImageData(p[o]))));
            }

            function g(p) {
              this.path = p || '';
            }

            function x(p) {
              this.assetsPath = p || '';
            }

            function b(p) {
              for (var n = 0, o = this.images.length; n < o; ) {
                if (this.images[n].assetData === p) return this.images[n].img;
                n += 1;
              }
              return null;
            }

            function y() {
              (this.imagesLoadedCb = null), (this.images.length = 0);
            }

            function u() {
              return this.totalImages === this.loadedAssets;
            }

            function k() {
              return this.totalFootages === this.loadedFootagesCount;
            }

            function f(p, n) {
              p === 'svg'
                ? ((this._elementHelper = n),
                  (this._createImageData = this.createImageData.bind(this)))
                : (this._createImageData = this.createImgData.bind(this));
            }

            function h() {
              (this._imageLoaded = e.bind(this)),
                (this._footageLoaded = i.bind(this)),
                (this.testImageLoaded = s.bind(this)),
                (this.createFootageData = m.bind(this)),
                (this.assetsPath = ''),
                (this.path = ''),
                (this.totalImages = 0),
                (this.totalFootages = 0),
                (this.loadedAssets = 0),
                (this.loadedFootagesCount = 0),
                (this.imagesLoadedCb = null),
                (this.images = []);
            }

            return (
              (h.prototype = {
                loadAssets: d,
                setAssetsPath: x,
                setPath: g,
                loadedImages: u,
                loadedFootages: k,
                destroy: y,
                getAsset: b,
                createImgData: l,
                createImageData: a,
                imageLoaded: e,
                footageLoaded: i,
                setCacheType: f,
              }),
              h
            );
          })(),
          featureSupport = (function () {
            var t = { maskType: !0 };
            return (
              (/MSIE 10/i.test(navigator.userAgent) ||
                /MSIE 9/i.test(navigator.userAgent) ||
                /rv:11.0/i.test(navigator.userAgent) ||
                /Edge\/\d./i.test(navigator.userAgent)) &&
                (t.maskType = !1),
              t
            );
          })(),
          filtersFactory = (function () {
            var t = {};
            (t.createFilter = e), (t.createAlphaToLuminanceFilter = i);

            function e(r, s) {
              var a = createNS('filter');
              return (
                a.setAttribute('id', r),
                s !== !0 &&
                  (a.setAttribute('filterUnits', 'objectBoundingBox'),
                  a.setAttribute('x', '0%'),
                  a.setAttribute('y', '0%'),
                  a.setAttribute('width', '100%'),
                  a.setAttribute('height', '100%')),
                a
              );
            }

            function i() {
              var r = createNS('feColorMatrix');
              return (
                r.setAttribute('type', 'matrix'),
                r.setAttribute('color-interpolation-filters', 'sRGB'),
                r.setAttribute(
                  'values',
                  '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1',
                ),
                r
              );
            }

            return t;
          })(),
          assetLoader = (function () {
            function t(i) {
              return i.response && typeof i.response == 'object'
                ? i.response
                : i.response && typeof i.response == 'string'
                ? JSON.parse(i.response)
                : i.responseText
                ? JSON.parse(i.responseText)
                : null;
            }

            function e(i, r, s) {
              var a,
                l = new XMLHttpRequest();
              try {
                l.responseType = 'json';
              } catch {}
              (l.onreadystatechange = function () {
                if (l.readyState === 4)
                  if (l.status === 200) (a = t(l)), r(a);
                  else
                    try {
                      (a = t(l)), r(a);
                    } catch (m) {
                      s && s(m);
                    }
              }),
                l.open('GET', i, !0),
                l.send();
            }

            return { load: e };
          })();

        function TextAnimatorProperty(t, e, i) {
          (this._isFirstFrame = !0),
            (this._hasMaskedPath = !1),
            (this._frameId = -1),
            (this._textData = t),
            (this._renderType = e),
            (this._elem = i),
            (this._animatorsData = createSizedArray(this._textData.a.length)),
            (this._pathData = {}),
            (this._moreOptions = { alignment: {} }),
            (this.renderedLetters = []),
            (this.lettersChangedFlag = !1),
            this.initDynamicPropertyContainer(i);
        }

        (TextAnimatorProperty.prototype.searchProperties = function () {
          var t,
            e = this._textData.a.length,
            i,
            r = PropertyFactory.getProp;
          for (t = 0; t < e; t += 1)
            (i = this._textData.a[t]),
              (this._animatorsData[t] = new TextAnimatorDataProperty(
                this._elem,
                i,
                this,
              ));
          this._textData.p && 'm' in this._textData.p
            ? ((this._pathData = {
                f: r(this._elem, this._textData.p.f, 0, 0, this),
                l: r(this._elem, this._textData.p.l, 0, 0, this),
                r: this._textData.p.r,
                m: this._elem.maskManager.getMaskProperty(this._textData.p.m),
              }),
              (this._hasMaskedPath = !0))
            : (this._hasMaskedPath = !1),
            (this._moreOptions.alignment = r(
              this._elem,
              this._textData.m.a,
              1,
              0,
              this,
            ));
        }),
          (TextAnimatorProperty.prototype.getMeasures = function (t, e) {
            if (
              ((this.lettersChangedFlag = e),
              !(
                !this._mdf &&
                !this._isFirstFrame &&
                !e &&
                (!this._hasMaskedPath || !this._pathData.m._mdf)
              ))
            ) {
              this._isFirstFrame = !1;
              var i = this._moreOptions.alignment.v,
                r = this._animatorsData,
                s = this._textData,
                a = this.mHelper,
                l = this._renderType,
                m = this.renderedLetters.length,
                d,
                g,
                x,
                b,
                y = t.l,
                u,
                k,
                f,
                h,
                p,
                n,
                o,
                c,
                v,
                w,
                P,
                E,
                C,
                F,
                V;
              if (this._hasMaskedPath) {
                if (
                  ((V = this._pathData.m),
                  !this._pathData.n || this._pathData._mdf)
                ) {
                  var M = V.v;
                  this._pathData.r && (M = M.reverse()),
                    (u = { tLength: 0, segments: [] }),
                    (b = M._length - 1);
                  var D;
                  for (E = 0, x = 0; x < b; x += 1)
                    (D = bez.buildBezierData(
                      M.v[x],
                      M.v[x + 1],
                      [M.o[x][0] - M.v[x][0], M.o[x][1] - M.v[x][1]],
                      [
                        M.i[x + 1][0] - M.v[x + 1][0],
                        M.i[x + 1][1] - M.v[x + 1][1],
                      ],
                    )),
                      (u.tLength += D.segmentLength),
                      u.segments.push(D),
                      (E += D.segmentLength);
                  (x = b),
                    V.v.c &&
                      ((D = bez.buildBezierData(
                        M.v[x],
                        M.v[0],
                        [M.o[x][0] - M.v[x][0], M.o[x][1] - M.v[x][1]],
                        [M.i[0][0] - M.v[0][0], M.i[0][1] - M.v[0][1]],
                      )),
                      (u.tLength += D.segmentLength),
                      u.segments.push(D),
                      (E += D.segmentLength)),
                    (this._pathData.pi = u);
                }
                if (
                  ((u = this._pathData.pi),
                  (k = this._pathData.f.v),
                  (o = 0),
                  (n = 1),
                  (h = 0),
                  (p = !0),
                  (w = u.segments),
                  k < 0 && V.v.c)
                )
                  for (
                    u.tLength < Math.abs(k) && (k = -Math.abs(k) % u.tLength),
                      o = w.length - 1,
                      v = w[o].points,
                      n = v.length - 1;
                    k < 0;

                  )
                    (k += v[n].partialLength),
                      (n -= 1),
                      n < 0 &&
                        ((o -= 1), (v = w[o].points), (n = v.length - 1));
                (v = w[o].points),
                  (c = v[n - 1]),
                  (f = v[n]),
                  (P = f.partialLength);
              }
              (b = y.length), (d = 0), (g = 0);
              var R = t.finalSize * 1.2 * 0.714,
                $ = !0,
                I,
                S,
                _,
                A,
                L;
              A = r.length;
              var T,
                q = -1,
                j,
                N,
                U,
                J = k,
                st = o,
                ht = n,
                ct = -1,
                it,
                Z,
                ft,
                O,
                Y,
                St,
                Vt,
                At,
                wt = '',
                Tt = this.defaultPropsArray,
                Ct;
              if (t.j === 2 || t.j === 1) {
                var ot = 0,
                  Lt = 0,
                  Dt = t.j === 2 ? -0.5 : -1,
                  bt = 0,
                  Rt = !0;
                for (x = 0; x < b; x += 1)
                  if (y[x].n) {
                    for (ot && (ot += Lt); bt < x; )
                      (y[bt].animatorJustifyOffset = ot), (bt += 1);
                    (ot = 0), (Rt = !0);
                  } else {
                    for (_ = 0; _ < A; _ += 1)
                      (I = r[_].a),
                        I.t.propType &&
                          (Rt && t.j === 2 && (Lt += I.t.v * Dt),
                          (S = r[_].s),
                          (T = S.getMult(
                            y[x].anIndexes[_],
                            s.a[_].s.totalChars,
                          )),
                          T.length
                            ? (ot += I.t.v * T[0] * Dt)
                            : (ot += I.t.v * T * Dt));
                    Rt = !1;
                  }
                for (ot && (ot += Lt); bt < x; )
                  (y[bt].animatorJustifyOffset = ot), (bt += 1);
              }
              for (x = 0; x < b; x += 1) {
                if ((a.reset(), (it = 1), y[x].n))
                  (d = 0),
                    (g += t.yOffset),
                    (g += $ ? 1 : 0),
                    (k = J),
                    ($ = !1),
                    this._hasMaskedPath &&
                      ((o = st),
                      (n = ht),
                      (v = w[o].points),
                      (c = v[n - 1]),
                      (f = v[n]),
                      (P = f.partialLength),
                      (h = 0)),
                    (wt = ''),
                    (At = ''),
                    (St = ''),
                    (Ct = ''),
                    (Tt = this.defaultPropsArray);
                else {
                  if (this._hasMaskedPath) {
                    if (ct !== y[x].line) {
                      switch (t.j) {
                        case 1:
                          k += E - t.lineWidths[y[x].line];
                          break;
                        case 2:
                          k += (E - t.lineWidths[y[x].line]) / 2;
                          break;
                        default:
                          break;
                      }
                      ct = y[x].line;
                    }
                    q !== y[x].ind &&
                      (y[q] && (k += y[q].extra),
                      (k += y[x].an / 2),
                      (q = y[x].ind)),
                      (k += i[0] * y[x].an * 0.005);
                    var _t = 0;
                    for (_ = 0; _ < A; _ += 1)
                      (I = r[_].a),
                        I.p.propType &&
                          ((S = r[_].s),
                          (T = S.getMult(
                            y[x].anIndexes[_],
                            s.a[_].s.totalChars,
                          )),
                          T.length
                            ? (_t += I.p.v[0] * T[0])
                            : (_t += I.p.v[0] * T)),
                        I.a.propType &&
                          ((S = r[_].s),
                          (T = S.getMult(
                            y[x].anIndexes[_],
                            s.a[_].s.totalChars,
                          )),
                          T.length
                            ? (_t += I.a.v[0] * T[0])
                            : (_t += I.a.v[0] * T));
                    for (p = !0; p; )
                      h + P >= k + _t || !v
                        ? ((C = (k + _t - h) / f.partialLength),
                          (N = c.point[0] + (f.point[0] - c.point[0]) * C),
                          (U = c.point[1] + (f.point[1] - c.point[1]) * C),
                          a.translate(
                            -i[0] * y[x].an * 0.005,
                            -(i[1] * R) * 0.01,
                          ),
                          (p = !1))
                        : v &&
                          ((h += f.partialLength),
                          (n += 1),
                          n >= v.length &&
                            ((n = 0),
                            (o += 1),
                            w[o]
                              ? (v = w[o].points)
                              : V.v.c
                              ? ((n = 0), (o = 0), (v = w[o].points))
                              : ((h -= f.partialLength), (v = null))),
                          v && ((c = f), (f = v[n]), (P = f.partialLength)));
                    (j = y[x].an / 2 - y[x].add), a.translate(-j, 0, 0);
                  } else
                    (j = y[x].an / 2 - y[x].add),
                      a.translate(-j, 0, 0),
                      a.translate(-i[0] * y[x].an * 0.005, -i[1] * R * 0.01, 0);
                  for (_ = 0; _ < A; _ += 1)
                    (I = r[_].a),
                      I.t.propType &&
                        ((S = r[_].s),
                        (T = S.getMult(y[x].anIndexes[_], s.a[_].s.totalChars)),
                        (d !== 0 || t.j !== 0) &&
                          (this._hasMaskedPath
                            ? T.length
                              ? (k += I.t.v * T[0])
                              : (k += I.t.v * T)
                            : T.length
                            ? (d += I.t.v * T[0])
                            : (d += I.t.v * T)));
                  for (
                    t.strokeWidthAnim && (ft = t.sw || 0),
                      t.strokeColorAnim &&
                        (t.sc
                          ? (Z = [t.sc[0], t.sc[1], t.sc[2]])
                          : (Z = [0, 0, 0])),
                      t.fillColorAnim &&
                        t.fc &&
                        (O = [t.fc[0], t.fc[1], t.fc[2]]),
                      _ = 0;
                    _ < A;
                    _ += 1
                  )
                    (I = r[_].a),
                      I.a.propType &&
                        ((S = r[_].s),
                        (T = S.getMult(y[x].anIndexes[_], s.a[_].s.totalChars)),
                        T.length
                          ? a.translate(
                              -I.a.v[0] * T[0],
                              -I.a.v[1] * T[1],
                              I.a.v[2] * T[2],
                            )
                          : a.translate(
                              -I.a.v[0] * T,
                              -I.a.v[1] * T,
                              I.a.v[2] * T,
                            ));
                  for (_ = 0; _ < A; _ += 1)
                    (I = r[_].a),
                      I.s.propType &&
                        ((S = r[_].s),
                        (T = S.getMult(y[x].anIndexes[_], s.a[_].s.totalChars)),
                        T.length
                          ? a.scale(
                              1 + (I.s.v[0] - 1) * T[0],
                              1 + (I.s.v[1] - 1) * T[1],
                              1,
                            )
                          : a.scale(
                              1 + (I.s.v[0] - 1) * T,
                              1 + (I.s.v[1] - 1) * T,
                              1,
                            ));
                  for (_ = 0; _ < A; _ += 1) {
                    if (
                      ((I = r[_].a),
                      (S = r[_].s),
                      (T = S.getMult(y[x].anIndexes[_], s.a[_].s.totalChars)),
                      I.sk.propType &&
                        (T.length
                          ? a.skewFromAxis(-I.sk.v * T[0], I.sa.v * T[1])
                          : a.skewFromAxis(-I.sk.v * T, I.sa.v * T)),
                      I.r.propType &&
                        (T.length
                          ? a.rotateZ(-I.r.v * T[2])
                          : a.rotateZ(-I.r.v * T)),
                      I.ry.propType &&
                        (T.length
                          ? a.rotateY(I.ry.v * T[1])
                          : a.rotateY(I.ry.v * T)),
                      I.rx.propType &&
                        (T.length
                          ? a.rotateX(I.rx.v * T[0])
                          : a.rotateX(I.rx.v * T)),
                      I.o.propType &&
                        (T.length
                          ? (it += (I.o.v * T[0] - it) * T[0])
                          : (it += (I.o.v * T - it) * T)),
                      t.strokeWidthAnim &&
                        I.sw.propType &&
                        (T.length ? (ft += I.sw.v * T[0]) : (ft += I.sw.v * T)),
                      t.strokeColorAnim && I.sc.propType)
                    )
                      for (Y = 0; Y < 3; Y += 1)
                        T.length
                          ? (Z[Y] += (I.sc.v[Y] - Z[Y]) * T[0])
                          : (Z[Y] += (I.sc.v[Y] - Z[Y]) * T);
                    if (t.fillColorAnim && t.fc) {
                      if (I.fc.propType)
                        for (Y = 0; Y < 3; Y += 1)
                          T.length
                            ? (O[Y] += (I.fc.v[Y] - O[Y]) * T[0])
                            : (O[Y] += (I.fc.v[Y] - O[Y]) * T);
                      I.fh.propType &&
                        (T.length
                          ? (O = addHueToRGB(O, I.fh.v * T[0]))
                          : (O = addHueToRGB(O, I.fh.v * T))),
                        I.fs.propType &&
                          (T.length
                            ? (O = addSaturationToRGB(O, I.fs.v * T[0]))
                            : (O = addSaturationToRGB(O, I.fs.v * T))),
                        I.fb.propType &&
                          (T.length
                            ? (O = addBrightnessToRGB(O, I.fb.v * T[0]))
                            : (O = addBrightnessToRGB(O, I.fb.v * T)));
                    }
                  }
                  for (_ = 0; _ < A; _ += 1)
                    (I = r[_].a),
                      I.p.propType &&
                        ((S = r[_].s),
                        (T = S.getMult(y[x].anIndexes[_], s.a[_].s.totalChars)),
                        this._hasMaskedPath
                          ? T.length
                            ? a.translate(0, I.p.v[1] * T[0], -I.p.v[2] * T[1])
                            : a.translate(0, I.p.v[1] * T, -I.p.v[2] * T)
                          : T.length
                          ? a.translate(
                              I.p.v[0] * T[0],
                              I.p.v[1] * T[1],
                              -I.p.v[2] * T[2],
                            )
                          : a.translate(
                              I.p.v[0] * T,
                              I.p.v[1] * T,
                              -I.p.v[2] * T,
                            ));
                  if (
                    (t.strokeWidthAnim && (St = ft < 0 ? 0 : ft),
                    t.strokeColorAnim &&
                      (Vt =
                        'rgb(' +
                        Math.round(Z[0] * 255) +
                        ',' +
                        Math.round(Z[1] * 255) +
                        ',' +
                        Math.round(Z[2] * 255) +
                        ')'),
                    t.fillColorAnim &&
                      t.fc &&
                      (At =
                        'rgb(' +
                        Math.round(O[0] * 255) +
                        ',' +
                        Math.round(O[1] * 255) +
                        ',' +
                        Math.round(O[2] * 255) +
                        ')'),
                    this._hasMaskedPath)
                  ) {
                    if (
                      (a.translate(0, -t.ls),
                      a.translate(0, i[1] * R * 0.01 + g, 0),
                      s.p.p)
                    ) {
                      F = (f.point[1] - c.point[1]) / (f.point[0] - c.point[0]);
                      var jt = (Math.atan(F) * 180) / Math.PI;
                      f.point[0] < c.point[0] && (jt += 180),
                        a.rotate((-jt * Math.PI) / 180);
                    }
                    a.translate(N, U, 0),
                      (k -= i[0] * y[x].an * 0.005),
                      y[x + 1] &&
                        q !== y[x + 1].ind &&
                        ((k += y[x].an / 2), (k += t.tr * 0.001 * t.finalSize));
                  } else {
                    switch (
                      (a.translate(d, g, 0),
                      t.ps && a.translate(t.ps[0], t.ps[1] + t.ascent, 0),
                      t.j)
                    ) {
                      case 1:
                        a.translate(
                          y[x].animatorJustifyOffset +
                            t.justifyOffset +
                            (t.boxWidth - t.lineWidths[y[x].line]),
                          0,
                          0,
                        );
                        break;
                      case 2:
                        a.translate(
                          y[x].animatorJustifyOffset +
                            t.justifyOffset +
                            (t.boxWidth - t.lineWidths[y[x].line]) / 2,
                          0,
                          0,
                        );
                        break;
                      default:
                        break;
                    }
                    a.translate(0, -t.ls),
                      a.translate(j, 0, 0),
                      a.translate(i[0] * y[x].an * 0.005, i[1] * R * 0.01, 0),
                      (d += y[x].l + t.tr * 0.001 * t.finalSize);
                  }
                  l === 'html'
                    ? (wt = a.toCSS())
                    : l === 'svg'
                    ? (wt = a.to2dCSS())
                    : (Tt = [
                        a.props[0],
                        a.props[1],
                        a.props[2],
                        a.props[3],
                        a.props[4],
                        a.props[5],
                        a.props[6],
                        a.props[7],
                        a.props[8],
                        a.props[9],
                        a.props[10],
                        a.props[11],
                        a.props[12],
                        a.props[13],
                        a.props[14],
                        a.props[15],
                      ]),
                    (Ct = it);
                }
                m <= x
                  ? ((L = new LetterProps(Ct, St, Vt, At, wt, Tt)),
                    this.renderedLetters.push(L),
                    (m += 1),
                    (this.lettersChangedFlag = !0))
                  : ((L = this.renderedLetters[x]),
                    (this.lettersChangedFlag =
                      L.update(Ct, St, Vt, At, wt, Tt) ||
                      this.lettersChangedFlag));
              }
            }
          }),
          (TextAnimatorProperty.prototype.getValue = function () {
            this._elem.globalData.frameId !== this._frameId &&
              ((this._frameId = this._elem.globalData.frameId),
              this.iterateDynamicProperties());
          }),
          (TextAnimatorProperty.prototype.mHelper = new Matrix()),
          (TextAnimatorProperty.prototype.defaultPropsArray = []),
          extendPrototype([DynamicPropertyContainer], TextAnimatorProperty);

        function TextAnimatorDataProperty(t, e, i) {
          var r = { propType: !1 },
            s = PropertyFactory.getProp,
            a = e.a;
          (this.a = {
            r: a.r ? s(t, a.r, 0, degToRads, i) : r,
            rx: a.rx ? s(t, a.rx, 0, degToRads, i) : r,
            ry: a.ry ? s(t, a.ry, 0, degToRads, i) : r,
            sk: a.sk ? s(t, a.sk, 0, degToRads, i) : r,
            sa: a.sa ? s(t, a.sa, 0, degToRads, i) : r,
            s: a.s ? s(t, a.s, 1, 0.01, i) : r,
            a: a.a ? s(t, a.a, 1, 0, i) : r,
            o: a.o ? s(t, a.o, 0, 0.01, i) : r,
            p: a.p ? s(t, a.p, 1, 0, i) : r,
            sw: a.sw ? s(t, a.sw, 0, 0, i) : r,
            sc: a.sc ? s(t, a.sc, 1, 0, i) : r,
            fc: a.fc ? s(t, a.fc, 1, 0, i) : r,
            fh: a.fh ? s(t, a.fh, 0, 0, i) : r,
            fs: a.fs ? s(t, a.fs, 0, 0.01, i) : r,
            fb: a.fb ? s(t, a.fb, 0, 0.01, i) : r,
            t: a.t ? s(t, a.t, 0, 0, i) : r,
          }),
            (this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i)),
            (this.s.t = e.s.t);
        }

        function LetterProps(t, e, i, r, s, a) {
          (this.o = t),
            (this.sw = e),
            (this.sc = i),
            (this.fc = r),
            (this.m = s),
            (this.p = a),
            (this._mdf = {
              o: !0,
              sw: !!e,
              sc: !!i,
              fc: !!r,
              m: !0,
              p: !0,
            });
        }

        LetterProps.prototype.update = function (t, e, i, r, s, a) {
          (this._mdf.o = !1),
            (this._mdf.sw = !1),
            (this._mdf.sc = !1),
            (this._mdf.fc = !1),
            (this._mdf.m = !1),
            (this._mdf.p = !1);
          var l = !1;
          return (
            this.o !== t && ((this.o = t), (this._mdf.o = !0), (l = !0)),
            this.sw !== e && ((this.sw = e), (this._mdf.sw = !0), (l = !0)),
            this.sc !== i && ((this.sc = i), (this._mdf.sc = !0), (l = !0)),
            this.fc !== r && ((this.fc = r), (this._mdf.fc = !0), (l = !0)),
            this.m !== s && ((this.m = s), (this._mdf.m = !0), (l = !0)),
            a.length &&
              (this.p[0] !== a[0] ||
                this.p[1] !== a[1] ||
                this.p[4] !== a[4] ||
                this.p[5] !== a[5] ||
                this.p[12] !== a[12] ||
                this.p[13] !== a[13]) &&
              ((this.p = a), (this._mdf.p = !0), (l = !0)),
            l
          );
        };

        function TextProperty(t, e) {
          (this._frameId = initialDefaultFrame),
            (this.pv = ''),
            (this.v = ''),
            (this.kf = !1),
            (this._isFirstFrame = !0),
            (this._mdf = !1),
            (this.data = e),
            (this.elem = t),
            (this.comp = this.elem.comp),
            (this.keysIndex = 0),
            (this.canResize = !1),
            (this.minimumFontSize = 1),
            (this.effectsSequence = []),
            (this.currentData = {
              ascent: 0,
              boxWidth: this.defaultBoxWidth,
              f: '',
              fStyle: '',
              fWeight: '',
              fc: '',
              j: '',
              justifyOffset: '',
              l: [],
              lh: 0,
              lineWidths: [],
              ls: '',
              of: '',
              s: '',
              sc: '',
              sw: 0,
              t: 0,
              tr: 0,
              sz: 0,
              ps: null,
              fillColorAnim: !1,
              strokeColorAnim: !1,
              strokeWidthAnim: !1,
              yOffset: 0,
              finalSize: 0,
              finalText: [],
              finalLineHeight: 0,
              __complete: !1,
            }),
            this.copyData(this.currentData, this.data.d.k[0].s),
            this.searchProperty() || this.completeTextData(this.currentData);
        }

        (TextProperty.prototype.defaultBoxWidth = [0, 0]),
          (TextProperty.prototype.copyData = function (t, e) {
            for (var i in e)
              Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }),
          (TextProperty.prototype.setCurrentData = function (t) {
            t.__complete || this.completeTextData(t),
              (this.currentData = t),
              (this.currentData.boxWidth =
                this.currentData.boxWidth || this.defaultBoxWidth),
              (this._mdf = !0);
          }),
          (TextProperty.prototype.searchProperty = function () {
            return this.searchKeyframes();
          }),
          (TextProperty.prototype.searchKeyframes = function () {
            return (
              (this.kf = this.data.d.k.length > 1),
              this.kf && this.addEffect(this.getKeyframeValue.bind(this)),
              this.kf
            );
          }),
          (TextProperty.prototype.addEffect = function (t) {
            this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
          }),
          (TextProperty.prototype.getValue = function (t) {
            if (
              !(
                (this.elem.globalData.frameId === this.frameId ||
                  !this.effectsSequence.length) &&
                !t
              )
            ) {
              this.currentData.t = this.data.d.k[this.keysIndex].s.t;
              var e = this.currentData,
                i = this.keysIndex;
              if (this.lock) {
                this.setCurrentData(this.currentData);
                return;
              }
              (this.lock = !0), (this._mdf = !1);
              var r,
                s = this.effectsSequence.length,
                a = t || this.data.d.k[this.keysIndex].s;
              for (r = 0; r < s; r += 1)
                i !== this.keysIndex
                  ? (a = this.effectsSequence[r](a, a.t))
                  : (a = this.effectsSequence[r](this.currentData, a.t));
              e !== a && this.setCurrentData(a),
                (this.v = this.currentData),
                (this.pv = this.v),
                (this.lock = !1),
                (this.frameId = this.elem.globalData.frameId);
            }
          }),
          (TextProperty.prototype.getKeyframeValue = function () {
            for (
              var t = this.data.d.k,
                e = this.elem.comp.renderedFrame,
                i = 0,
                r = t.length;
              i <= r - 1 && !(i === r - 1 || t[i + 1].t > e);

            )
              i += 1;
            return (
              this.keysIndex !== i && (this.keysIndex = i),
              this.data.d.k[this.keysIndex].s
            );
          }),
          (TextProperty.prototype.buildFinalText = function (t) {
            for (
              var e = FontManager.getCombinedCharacterCodes(),
                i = [],
                r = 0,
                s = t.length,
                a;
              r < s;

            )
              (a = t.charCodeAt(r)),
                e.indexOf(a) !== -1
                  ? (i[i.length - 1] += t.charAt(r))
                  : a >= 55296 && a <= 56319
                  ? ((a = t.charCodeAt(r + 1)),
                    a >= 56320 && a <= 57343
                      ? (i.push(t.substr(r, 2)), (r += 1))
                      : i.push(t.charAt(r)))
                  : i.push(t.charAt(r)),
                (r += 1);
            return i;
          }),
          (TextProperty.prototype.completeTextData = function (t) {
            t.__complete = !0;
            var e = this.elem.globalData.fontManager,
              i = this.data,
              r = [],
              s,
              a,
              l,
              m = 0,
              d,
              g = i.m.g,
              x = 0,
              b = 0,
              y = 0,
              u = [],
              k = 0,
              f = 0,
              h,
              p,
              n = e.getFontByName(t.f),
              o,
              c = 0,
              v = getFontProperties(n);
            (t.fWeight = v.weight),
              (t.fStyle = v.style),
              (t.finalSize = t.s),
              (t.finalText = this.buildFinalText(t.t)),
              (a = t.finalText.length),
              (t.finalLineHeight = t.lh);
            var w = (t.tr / 1e3) * t.finalSize,
              P;
            if (t.sz)
              for (var E = !0, C = t.sz[0], F = t.sz[1], V, M; E; ) {
                (M = this.buildFinalText(t.t)),
                  (V = 0),
                  (k = 0),
                  (a = M.length),
                  (w = (t.tr / 1e3) * t.finalSize);
                var D = -1;
                for (s = 0; s < a; s += 1)
                  (P = M[s].charCodeAt(0)),
                    (l = !1),
                    M[s] === ' '
                      ? (D = s)
                      : (P === 13 || P === 3) &&
                        ((k = 0),
                        (l = !0),
                        (V += t.finalLineHeight || t.finalSize * 1.2)),
                    e.chars
                      ? ((o = e.getCharData(M[s], n.fStyle, n.fFamily)),
                        (c = l ? 0 : (o.w * t.finalSize) / 100))
                      : (c = e.measureText(M[s], t.f, t.finalSize)),
                    k + c > C && M[s] !== ' '
                      ? (D === -1 ? (a += 1) : (s = D),
                        (V += t.finalLineHeight || t.finalSize * 1.2),
                        M.splice(s, D === s ? 1 : 0, '\r'),
                        (D = -1),
                        (k = 0))
                      : ((k += c), (k += w));
                (V += (n.ascent * t.finalSize) / 100),
                  this.canResize && t.finalSize > this.minimumFontSize && F < V
                    ? ((t.finalSize -= 1),
                      (t.finalLineHeight = (t.finalSize * t.lh) / t.s))
                    : ((t.finalText = M), (a = t.finalText.length), (E = !1));
              }
            (k = -w), (c = 0);
            var R = 0,
              $;
            for (s = 0; s < a; s += 1)
              if (
                ((l = !1),
                ($ = t.finalText[s]),
                (P = $.charCodeAt(0)),
                P === 13 || P === 3
                  ? ((R = 0),
                    u.push(k),
                    (f = k > f ? k : f),
                    (k = -2 * w),
                    (d = ''),
                    (l = !0),
                    (y += 1))
                  : (d = $),
                e.chars
                  ? ((o = e.getCharData(
                      $,
                      n.fStyle,
                      e.getFontByName(t.f).fFamily,
                    )),
                    (c = l ? 0 : (o.w * t.finalSize) / 100))
                  : (c = e.measureText(d, t.f, t.finalSize)),
                $ === ' ' ? (R += c + w) : ((k += c + w + R), (R = 0)),
                r.push({
                  l: c,
                  an: c,
                  add: x,
                  n: l,
                  anIndexes: [],
                  val: d,
                  line: y,
                  animatorJustifyOffset: 0,
                }),
                g == 2)
              ) {
                if (((x += c), d === '' || d === ' ' || s === a - 1)) {
                  for ((d === '' || d === ' ') && (x -= c); b <= s; )
                    (r[b].an = x), (r[b].ind = m), (r[b].extra = c), (b += 1);
                  (m += 1), (x = 0);
                }
              } else if (g == 3) {
                if (((x += c), d === '' || s === a - 1)) {
                  for (d === '' && (x -= c); b <= s; )
                    (r[b].an = x), (r[b].ind = m), (r[b].extra = c), (b += 1);
                  (x = 0), (m += 1);
                }
              } else (r[m].ind = m), (r[m].extra = 0), (m += 1);
            if (((t.l = r), (f = k > f ? k : f), u.push(k), t.sz))
              (t.boxWidth = t.sz[0]), (t.justifyOffset = 0);
            else
              switch (((t.boxWidth = f), t.j)) {
                case 1:
                  t.justifyOffset = -t.boxWidth;
                  break;
                case 2:
                  t.justifyOffset = -t.boxWidth / 2;
                  break;
                default:
                  t.justifyOffset = 0;
              }
            t.lineWidths = u;
            var I = i.a,
              S,
              _;
            p = I.length;
            var A,
              L,
              T = [];
            for (h = 0; h < p; h += 1) {
              for (
                S = I[h],
                  S.a.sc && (t.strokeColorAnim = !0),
                  S.a.sw && (t.strokeWidthAnim = !0),
                  (S.a.fc || S.a.fh || S.a.fs || S.a.fb) &&
                    (t.fillColorAnim = !0),
                  L = 0,
                  A = S.s.b,
                  s = 0;
                s < a;
                s += 1
              )
                (_ = r[s]),
                  (_.anIndexes[h] = L),
                  ((A == 1 && _.val !== '') ||
                    (A == 2 && _.val !== '' && _.val !== ' ') ||
                    (A == 3 && (_.n || _.val == ' ' || s == a - 1)) ||
                    (A == 4 && (_.n || s == a - 1))) &&
                    (S.s.rn === 1 && T.push(L), (L += 1));
              i.a[h].s.totalChars = L;
              var q = -1,
                j;
              if (S.s.rn === 1)
                for (s = 0; s < a; s += 1)
                  (_ = r[s]),
                    q != _.anIndexes[h] &&
                      ((q = _.anIndexes[h]),
                      (j = T.splice(
                        Math.floor(Math.random() * T.length),
                        1,
                      )[0])),
                    (_.anIndexes[h] = j);
            }
            (t.yOffset = t.finalLineHeight || t.finalSize * 1.2),
              (t.ls = t.ls || 0),
              (t.ascent = (n.ascent * t.finalSize) / 100);
          }),
          (TextProperty.prototype.updateDocumentData = function (t, e) {
            e = e === void 0 ? this.keysIndex : e;
            var i = this.copyData({}, this.data.d.k[e].s);
            (i = this.copyData(i, t)),
              (this.data.d.k[e].s = i),
              this.recalculate(e),
              this.elem.addDynamicProperty(this);
          }),
          (TextProperty.prototype.recalculate = function (t) {
            var e = this.data.d.k[t].s;
            (e.__complete = !1),
              (this.keysIndex = 0),
              (this._isFirstFrame = !0),
              this.getValue(e);
          }),
          (TextProperty.prototype.canResizeFont = function (t) {
            (this.canResize = t),
              this.recalculate(this.keysIndex),
              this.elem.addDynamicProperty(this);
          }),
          (TextProperty.prototype.setMinimumFontSize = function (t) {
            (this.minimumFontSize = Math.floor(t) || 1),
              this.recalculate(this.keysIndex),
              this.elem.addDynamicProperty(this);
          });
        var TextSelectorProp = (function () {
            var t = Math.max,
              e = Math.min,
              i = Math.floor;

            function r(a, l) {
              (this._currentTextLength = -1),
                (this.k = !1),
                (this.data = l),
                (this.elem = a),
                (this.comp = a.comp),
                (this.finalS = 0),
                (this.finalE = 0),
                this.initDynamicPropertyContainer(a),
                (this.s = PropertyFactory.getProp(
                  a,
                  l.s || { k: 0 },
                  0,
                  0,
                  this,
                )),
                'e' in l
                  ? (this.e = PropertyFactory.getProp(a, l.e, 0, 0, this))
                  : (this.e = { v: 100 }),
                (this.o = PropertyFactory.getProp(
                  a,
                  l.o || { k: 0 },
                  0,
                  0,
                  this,
                )),
                (this.xe = PropertyFactory.getProp(
                  a,
                  l.xe || { k: 0 },
                  0,
                  0,
                  this,
                )),
                (this.ne = PropertyFactory.getProp(
                  a,
                  l.ne || { k: 0 },
                  0,
                  0,
                  this,
                )),
                (this.a = PropertyFactory.getProp(a, l.a, 0, 0.01, this)),
                this.dynamicProperties.length || this.getValue();
            }

            (r.prototype = {
              getMult: function (a) {
                this._currentTextLength !==
                  this.elem.textProperty.currentData.l.length &&
                  this.getValue();
                var l = 0,
                  m = 0,
                  d = 1,
                  g = 1;
                this.ne.v > 0 ? (l = this.ne.v / 100) : (m = -this.ne.v / 100),
                  this.xe.v > 0
                    ? (d = 1 - this.xe.v / 100)
                    : (g = 1 + this.xe.v / 100);
                var x = BezierFactory.getBezierEasing(l, m, d, g).get,
                  b = 0,
                  y = this.finalS,
                  u = this.finalE,
                  k = this.data.sh;
                if (k === 2)
                  u === y
                    ? (b = a >= u ? 1 : 0)
                    : (b = t(0, e(0.5 / (u - y) + (a - y) / (u - y), 1))),
                    (b = x(b));
                else if (k === 3)
                  u === y
                    ? (b = a >= u ? 0 : 1)
                    : (b = 1 - t(0, e(0.5 / (u - y) + (a - y) / (u - y), 1))),
                    (b = x(b));
                else if (k === 4)
                  u === y
                    ? (b = 0)
                    : ((b = t(0, e(0.5 / (u - y) + (a - y) / (u - y), 1))),
                      b < 0.5 ? (b *= 2) : (b = 1 - 2 * (b - 0.5))),
                    (b = x(b));
                else if (k === 5) {
                  if (u === y) b = 0;
                  else {
                    var f = u - y;
                    a = e(t(0, a + 0.5 - y), u - y);
                    var h = -f / 2 + a,
                      p = f / 2;
                    b = Math.sqrt(1 - (h * h) / (p * p));
                  }
                  b = x(b);
                } else
                  k === 6
                    ? (u === y
                        ? (b = 0)
                        : ((a = e(t(0, a + 0.5 - y), u - y)),
                          (b =
                            (1 +
                              Math.cos(Math.PI + (Math.PI * 2 * a) / (u - y))) /
                            2)),
                      (b = x(b)))
                    : (a >= i(y) &&
                        (a - y < 0
                          ? (b = t(0, e(e(u, 1) - (y - a), 1)))
                          : (b = t(0, e(u - a, 1)))),
                      (b = x(b)));
                return b * this.a.v;
              },
              getValue: function (a) {
                this.iterateDynamicProperties(),
                  (this._mdf = a || this._mdf),
                  (this._currentTextLength =
                    this.elem.textProperty.currentData.l.length || 0),
                  a &&
                    this.data.r === 2 &&
                    (this.e.v = this._currentTextLength);
                var l = this.data.r === 2 ? 1 : 100 / this.data.totalChars,
                  m = this.o.v / l,
                  d = this.s.v / l + m,
                  g = this.e.v / l + m;
                if (d > g) {
                  var x = d;
                  (d = g), (g = x);
                }
                (this.finalS = d), (this.finalE = g);
              },
            }),
              extendPrototype([DynamicPropertyContainer], r);

            function s(a, l, m) {
              return new r(a, l, m);
            }

            return { getTextSelectorProp: s };
          })(),
          poolFactory = (function () {
            return function (t, e, i) {
              var r = 0,
                s = t,
                a = createSizedArray(s),
                l = { newElement: m, release: d };

              function m() {
                var g;
                return r ? ((r -= 1), (g = a[r])) : (g = e()), g;
              }

              function d(g) {
                r === s && ((a = pooling.double(a)), (s *= 2)),
                  i && i(g),
                  (a[r] = g),
                  (r += 1);
              }

              return l;
            };
          })(),
          pooling = (function () {
            function t(e) {
              return e.concat(createSizedArray(e.length));
            }

            return { double: t };
          })(),
          pointPool = (function () {
            function t() {
              return createTypedArray('float32', 2);
            }

            return poolFactory(8, t);
          })(),
          shapePool = (function () {
            function t() {
              return new ShapePath();
            }

            function e(s) {
              var a = s._length,
                l;
              for (l = 0; l < a; l += 1)
                pointPool.release(s.v[l]),
                  pointPool.release(s.i[l]),
                  pointPool.release(s.o[l]),
                  (s.v[l] = null),
                  (s.i[l] = null),
                  (s.o[l] = null);
              (s._length = 0), (s.c = !1);
            }

            function i(s) {
              var a = r.newElement(),
                l,
                m = s._length === void 0 ? s.v.length : s._length;
              for (a.setLength(m), a.c = s.c, l = 0; l < m; l += 1)
                a.setTripleAt(
                  s.v[l][0],
                  s.v[l][1],
                  s.o[l][0],
                  s.o[l][1],
                  s.i[l][0],
                  s.i[l][1],
                  l,
                );
              return a;
            }

            var r = poolFactory(4, t, e);
            return (r.clone = i), r;
          })(),
          shapeCollectionPool = (function () {
            var t = { newShapeCollection: s, release: a },
              e = 0,
              i = 4,
              r = createSizedArray(i);

            function s() {
              var l;
              return (
                e ? ((e -= 1), (l = r[e])) : (l = new ShapeCollection()), l
              );
            }

            function a(l) {
              var m,
                d = l._length;
              for (m = 0; m < d; m += 1) shapePool.release(l.shapes[m]);
              (l._length = 0),
                e === i && ((r = pooling.double(r)), (i *= 2)),
                (r[e] = l),
                (e += 1);
            }

            return t;
          })(),
          segmentsLengthPool = (function () {
            function t() {
              return { lengths: [], totalLength: 0 };
            }

            function e(i) {
              var r,
                s = i.lengths.length;
              for (r = 0; r < s; r += 1) bezierLengthPool.release(i.lengths[r]);
              i.lengths.length = 0;
            }

            return poolFactory(8, t, e);
          })(),
          bezierLengthPool = (function () {
            function t() {
              return {
                addedLength: 0,
                percents: createTypedArray('float32', defaultCurveSegments),
                lengths: createTypedArray('float32', defaultCurveSegments),
              };
            }

            return poolFactory(8, t);
          })(),
          markerParser = (function () {
            function t(e) {
              for (
                var i = e.split(`\r
`),
                  r = {},
                  s,
                  a = 0,
                  l = 0;
                l < i.length;
                l += 1
              )
                (s = i[l].split(':')),
                  s.length === 2 && ((r[s[0]] = s[1].trim()), (a += 1));
              if (a === 0) throw new Error();
              return r;
            }

            return function (e) {
              for (var i = [], r = 0; r < e.length; r += 1) {
                var s = e[r],
                  a = { time: s.tm, duration: s.dr };
                try {
                  a.payload = JSON.parse(e[r].cm);
                } catch {
                  try {
                    a.payload = t(e[r].cm);
                  } catch {
                    a.payload = { name: e[r] };
                  }
                }
                i.push(a);
              }
              return i;
            };
          })();

        function BaseRenderer() {}

        (BaseRenderer.prototype.checkLayers = function (t) {
          var e,
            i = this.layers.length,
            r;
          for (this.completeLayers = !0, e = i - 1; e >= 0; e -= 1)
            this.elements[e] ||
              ((r = this.layers[e]),
              r.ip - r.st <= t - this.layers[e].st &&
                r.op - r.st > t - this.layers[e].st &&
                this.buildItem(e)),
              (this.completeLayers = this.elements[e]
                ? this.completeLayers
                : !1);
          this.checkPendingElements();
        }),
          (BaseRenderer.prototype.createItem = function (t) {
            switch (t.ty) {
              case 2:
                return this.createImage(t);
              case 0:
                return this.createComp(t);
              case 1:
                return this.createSolid(t);
              case 3:
                return this.createNull(t);
              case 4:
                return this.createShape(t);
              case 5:
                return this.createText(t);
              case 6:
                return this.createAudio(t);
              case 13:
                return this.createCamera(t);
              case 15:
                return this.createFootage(t);
              default:
                return this.createNull(t);
            }
          }),
          (BaseRenderer.prototype.createCamera = function () {
            throw new Error("You're using a 3d camera. Try the html renderer.");
          }),
          (BaseRenderer.prototype.createAudio = function (t) {
            return new AudioElement(t, this.globalData, this);
          }),
          (BaseRenderer.prototype.createFootage = function (t) {
            return new FootageElement(t, this.globalData, this);
          }),
          (BaseRenderer.prototype.buildAllItems = function () {
            var t,
              e = this.layers.length;
            for (t = 0; t < e; t += 1) this.buildItem(t);
            this.checkPendingElements();
          }),
          (BaseRenderer.prototype.includeLayers = function (t) {
            this.completeLayers = !1;
            var e,
              i = t.length,
              r,
              s = this.layers.length;
            for (e = 0; e < i; e += 1)
              for (r = 0; r < s; ) {
                if (this.layers[r].id === t[e].id) {
                  this.layers[r] = t[e];
                  break;
                }
                r += 1;
              }
          }),
          (BaseRenderer.prototype.setProjectInterface = function (t) {
            this.globalData.projectInterface = t;
          }),
          (BaseRenderer.prototype.initItems = function () {
            this.globalData.progressiveLoad || this.buildAllItems();
          }),
          (BaseRenderer.prototype.buildElementParenting = function (t, e, i) {
            for (
              var r = this.elements, s = this.layers, a = 0, l = s.length;
              a < l;

            )
              s[a].ind == e &&
                (!r[a] || r[a] === !0
                  ? (this.buildItem(a), this.addPendingElement(t))
                  : (i.push(r[a]),
                    r[a].setAsParent(),
                    s[a].parent !== void 0
                      ? this.buildElementParenting(t, s[a].parent, i)
                      : t.setHierarchy(i))),
                (a += 1);
          }),
          (BaseRenderer.prototype.addPendingElement = function (t) {
            this.pendingElements.push(t);
          }),
          (BaseRenderer.prototype.searchExtraCompositions = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1)
              if (t[e].xt) {
                var r = this.createComp(t[e]);
                r.initExpressions(),
                  this.globalData.projectInterface.registerComposition(r);
              }
          }),
          (BaseRenderer.prototype.setupGlobalData = function (t, e) {
            (this.globalData.fontManager = new FontManager()),
              this.globalData.fontManager.addChars(t.chars),
              this.globalData.fontManager.addFonts(t.fonts, e),
              (this.globalData.getAssetData =
                this.animationItem.getAssetData.bind(this.animationItem)),
              (this.globalData.getAssetsPath =
                this.animationItem.getAssetsPath.bind(this.animationItem)),
              (this.globalData.imageLoader = this.animationItem.imagePreloader),
              (this.globalData.audioController =
                this.animationItem.audioController),
              (this.globalData.frameId = 0),
              (this.globalData.frameRate = t.fr),
              (this.globalData.nm = t.nm),
              (this.globalData.compSize = {
                w: t.w,
                h: t.h,
              });
          });

        function SVGRenderer(t, e) {
          (this.animationItem = t),
            (this.layers = null),
            (this.renderedFrame = -1),
            (this.svgElement = createNS('svg'));
          var i = '';
          if (e && e.title) {
            var r = createNS('title'),
              s = createElementID();
            r.setAttribute('id', s),
              (r.textContent = e.title),
              this.svgElement.appendChild(r),
              (i += s);
          }
          if (e && e.description) {
            var a = createNS('desc'),
              l = createElementID();
            a.setAttribute('id', l),
              (a.textContent = e.description),
              this.svgElement.appendChild(a),
              (i += ' ' + l);
          }
          i && this.svgElement.setAttribute('aria-labelledby', i);
          var m = createNS('defs');
          this.svgElement.appendChild(m);
          var d = createNS('g');
          this.svgElement.appendChild(d),
            (this.layerElement = d),
            (this.renderConfig = {
              preserveAspectRatio:
                (e && e.preserveAspectRatio) || 'xMidYMid meet',
              imagePreserveAspectRatio:
                (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              progressiveLoad: (e && e.progressiveLoad) || !1,
              hideOnTransparent: !(e && e.hideOnTransparent === !1),
              viewBoxOnly: (e && e.viewBoxOnly) || !1,
              viewBoxSize: (e && e.viewBoxSize) || !1,
              className: (e && e.className) || '',
              id: (e && e.id) || '',
              focusable: e && e.focusable,
              filterSize: {
                width: (e && e.filterSize && e.filterSize.width) || '100%',
                height: (e && e.filterSize && e.filterSize.height) || '100%',
                x: (e && e.filterSize && e.filterSize.x) || '0%',
                y: (e && e.filterSize && e.filterSize.y) || '0%',
              },
            }),
            (this.globalData = {
              _mdf: !1,
              frameNum: -1,
              defs: m,
              renderConfig: this.renderConfig,
            }),
            (this.elements = []),
            (this.pendingElements = []),
            (this.destroyed = !1),
            (this.rendererType = 'svg');
        }

        extendPrototype([BaseRenderer], SVGRenderer),
          (SVGRenderer.prototype.createNull = function (t) {
            return new NullElement(t, this.globalData, this);
          }),
          (SVGRenderer.prototype.createShape = function (t) {
            return new SVGShapeElement(t, this.globalData, this);
          }),
          (SVGRenderer.prototype.createText = function (t) {
            return new SVGTextLottieElement(t, this.globalData, this);
          }),
          (SVGRenderer.prototype.createImage = function (t) {
            return new IImageElement(t, this.globalData, this);
          }),
          (SVGRenderer.prototype.createComp = function (t) {
            return new SVGCompElement(t, this.globalData, this);
          }),
          (SVGRenderer.prototype.createSolid = function (t) {
            return new ISolidElement(t, this.globalData, this);
          }),
          (SVGRenderer.prototype.configAnimation = function (t) {
            this.renderConfig.viewBoxSize
              ? this.svgElement.setAttribute(
                  'viewBox',
                  this.renderConfig.viewBoxSize,
                )
              : this.svgElement.setAttribute(
                  'viewBox',
                  '0 0 ' + t.w + ' ' + t.h,
                ),
              this.renderConfig.viewBoxOnly ||
                (this.svgElement.setAttribute('width', t.w),
                this.svgElement.setAttribute('height', t.h),
                (this.svgElement.style.width = '100%'),
                (this.svgElement.style.height = '100%'),
                (this.svgElement.style.transform = 'translate3d(0,0,0)')),
              this.renderConfig.className &&
                this.svgElement.setAttribute(
                  'class',
                  this.renderConfig.className,
                ),
              this.renderConfig.id &&
                this.svgElement.setAttribute('id', this.renderConfig.id),
              this.renderConfig.focusable !== void 0 &&
                this.svgElement.setAttribute(
                  'focusable',
                  this.renderConfig.focusable,
                ),
              this.svgElement.setAttribute(
                'preserveAspectRatio',
                this.renderConfig.preserveAspectRatio,
              ),
              this.animationItem.wrapper.appendChild(this.svgElement);
            var e = this.globalData.defs;
            this.setupGlobalData(t, e),
              (this.globalData.progressiveLoad =
                this.renderConfig.progressiveLoad),
              (this.data = t);
            var i = createNS('clipPath'),
              r = createNS('rect');
            r.setAttribute('width', t.w),
              r.setAttribute('height', t.h),
              r.setAttribute('x', 0),
              r.setAttribute('y', 0);
            var s = createElementID();
            i.setAttribute('id', s),
              i.appendChild(r),
              this.layerElement.setAttribute(
                'clip-path',
                'url(' + locationHref + '#' + s + ')',
              ),
              e.appendChild(i),
              (this.layers = t.layers),
              (this.elements = createSizedArray(t.layers.length));
          }),
          (SVGRenderer.prototype.destroy = function () {
            this.animationItem.wrapper &&
              (this.animationItem.wrapper.innerText = ''),
              (this.layerElement = null),
              (this.globalData.defs = null);
            var t,
              e = this.layers ? this.layers.length : 0;
            for (t = 0; t < e; t += 1)
              this.elements[t] && this.elements[t].destroy();
            (this.elements.length = 0),
              (this.destroyed = !0),
              (this.animationItem = null);
          }),
          (SVGRenderer.prototype.updateContainerSize = function () {}),
          (SVGRenderer.prototype.buildItem = function (t) {
            var e = this.elements;
            if (!(e[t] || this.layers[t].ty === 99)) {
              e[t] = !0;
              var i = this.createItem(this.layers[t]);
              (e[t] = i),
                expressionsPlugin &&
                  (this.layers[t].ty === 0 &&
                    this.globalData.projectInterface.registerComposition(i),
                  i.initExpressions()),
                this.appendElementInPos(i, t),
                this.layers[t].tt &&
                  (!this.elements[t - 1] || this.elements[t - 1] === !0
                    ? (this.buildItem(t - 1), this.addPendingElement(i))
                    : i.setMatte(e[t - 1].layerId));
            }
          }),
          (SVGRenderer.prototype.checkPendingElements = function () {
            for (; this.pendingElements.length; ) {
              var t = this.pendingElements.pop();
              if ((t.checkParenting(), t.data.tt))
                for (var e = 0, i = this.elements.length; e < i; ) {
                  if (this.elements[e] === t) {
                    t.setMatte(this.elements[e - 1].layerId);
                    break;
                  }
                  e += 1;
                }
            }
          }),
          (SVGRenderer.prototype.renderFrame = function (t) {
            if (!(this.renderedFrame === t || this.destroyed)) {
              t === null ? (t = this.renderedFrame) : (this.renderedFrame = t),
                (this.globalData.frameNum = t),
                (this.globalData.frameId += 1),
                (this.globalData.projectInterface.currentFrame = t),
                (this.globalData._mdf = !1);
              var e,
                i = this.layers.length;
              for (
                this.completeLayers || this.checkLayers(t), e = i - 1;
                e >= 0;
                e -= 1
              )
                (this.completeLayers || this.elements[e]) &&
                  this.elements[e].prepareFrame(t - this.layers[e].st);
              if (this.globalData._mdf)
                for (e = 0; e < i; e += 1)
                  (this.completeLayers || this.elements[e]) &&
                    this.elements[e].renderFrame();
            }
          }),
          (SVGRenderer.prototype.appendElementInPos = function (t, e) {
            var i = t.getBaseElement();
            if (!!i) {
              for (var r = 0, s; r < e; )
                this.elements[r] &&
                  this.elements[r] !== !0 &&
                  this.elements[r].getBaseElement() &&
                  (s = this.elements[r].getBaseElement()),
                  (r += 1);
              s
                ? this.layerElement.insertBefore(i, s)
                : this.layerElement.appendChild(i);
            }
          }),
          (SVGRenderer.prototype.hide = function () {
            this.layerElement.style.display = 'none';
          }),
          (SVGRenderer.prototype.show = function () {
            this.layerElement.style.display = 'block';
          });

        function CanvasRenderer(t, e) {
          (this.animationItem = t),
            (this.renderConfig = {
              clearCanvas: e && e.clearCanvas !== void 0 ? e.clearCanvas : !0,
              context: (e && e.context) || null,
              progressiveLoad: (e && e.progressiveLoad) || !1,
              preserveAspectRatio:
                (e && e.preserveAspectRatio) || 'xMidYMid meet',
              imagePreserveAspectRatio:
                (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              className: (e && e.className) || '',
              id: (e && e.id) || '',
            }),
            (this.renderConfig.dpr = (e && e.dpr) || 1),
            this.animationItem.wrapper &&
              (this.renderConfig.dpr =
                (e && e.dpr) || window.devicePixelRatio || 1),
            (this.renderedFrame = -1),
            (this.globalData = {
              frameNum: -1,
              _mdf: !1,
              renderConfig: this.renderConfig,
              currentGlobalAlpha: -1,
            }),
            (this.contextData = new CVContextData()),
            (this.elements = []),
            (this.pendingElements = []),
            (this.transformMat = new Matrix()),
            (this.completeLayers = !1),
            (this.rendererType = 'canvas');
        }

        extendPrototype([BaseRenderer], CanvasRenderer),
          (CanvasRenderer.prototype.createShape = function (t) {
            return new CVShapeElement(t, this.globalData, this);
          }),
          (CanvasRenderer.prototype.createText = function (t) {
            return new CVTextElement(t, this.globalData, this);
          }),
          (CanvasRenderer.prototype.createImage = function (t) {
            return new CVImageElement(t, this.globalData, this);
          }),
          (CanvasRenderer.prototype.createComp = function (t) {
            return new CVCompElement(t, this.globalData, this);
          }),
          (CanvasRenderer.prototype.createSolid = function (t) {
            return new CVSolidElement(t, this.globalData, this);
          }),
          (CanvasRenderer.prototype.createNull =
            SVGRenderer.prototype.createNull),
          (CanvasRenderer.prototype.ctxTransform = function (t) {
            if (
              !(
                t[0] === 1 &&
                t[1] === 0 &&
                t[4] === 0 &&
                t[5] === 1 &&
                t[12] === 0 &&
                t[13] === 0
              )
            ) {
              if (!this.renderConfig.clearCanvas) {
                this.canvasContext.transform(
                  t[0],
                  t[1],
                  t[4],
                  t[5],
                  t[12],
                  t[13],
                );
                return;
              }
              this.transformMat.cloneFromProps(t);
              var e = this.contextData.cTr.props;
              this.transformMat.transform(
                e[0],
                e[1],
                e[2],
                e[3],
                e[4],
                e[5],
                e[6],
                e[7],
                e[8],
                e[9],
                e[10],
                e[11],
                e[12],
                e[13],
                e[14],
                e[15],
              ),
                this.contextData.cTr.cloneFromProps(this.transformMat.props);
              var i = this.contextData.cTr.props;
              this.canvasContext.setTransform(
                i[0],
                i[1],
                i[4],
                i[5],
                i[12],
                i[13],
              );
            }
          }),
          (CanvasRenderer.prototype.ctxOpacity = function (t) {
            if (!this.renderConfig.clearCanvas) {
              (this.canvasContext.globalAlpha *= t < 0 ? 0 : t),
                (this.globalData.currentGlobalAlpha = this.contextData.cO);
              return;
            }
            (this.contextData.cO *= t < 0 ? 0 : t),
              this.globalData.currentGlobalAlpha !== this.contextData.cO &&
                ((this.canvasContext.globalAlpha = this.contextData.cO),
                (this.globalData.currentGlobalAlpha = this.contextData.cO));
          }),
          (CanvasRenderer.prototype.reset = function () {
            if (!this.renderConfig.clearCanvas) {
              this.canvasContext.restore();
              return;
            }
            this.contextData.reset();
          }),
          (CanvasRenderer.prototype.save = function (t) {
            if (!this.renderConfig.clearCanvas) {
              this.canvasContext.save();
              return;
            }
            t && this.canvasContext.save();
            var e = this.contextData.cTr.props;
            this.contextData._length <= this.contextData.cArrPos &&
              this.contextData.duplicate();
            var i,
              r = this.contextData.saved[this.contextData.cArrPos];
            for (i = 0; i < 16; i += 1) r[i] = e[i];
            (this.contextData.savedOp[this.contextData.cArrPos] =
              this.contextData.cO),
              (this.contextData.cArrPos += 1);
          }),
          (CanvasRenderer.prototype.restore = function (t) {
            if (!this.renderConfig.clearCanvas) {
              this.canvasContext.restore();
              return;
            }
            t &&
              (this.canvasContext.restore(),
              (this.globalData.blendMode = 'source-over')),
              (this.contextData.cArrPos -= 1);
            var e = this.contextData.saved[this.contextData.cArrPos],
              i,
              r = this.contextData.cTr.props;
            for (i = 0; i < 16; i += 1) r[i] = e[i];
            this.canvasContext.setTransform(
              e[0],
              e[1],
              e[4],
              e[5],
              e[12],
              e[13],
            ),
              (e = this.contextData.savedOp[this.contextData.cArrPos]),
              (this.contextData.cO = e),
              this.globalData.currentGlobalAlpha !== e &&
                ((this.canvasContext.globalAlpha = e),
                (this.globalData.currentGlobalAlpha = e));
          }),
          (CanvasRenderer.prototype.configAnimation = function (t) {
            if (this.animationItem.wrapper && !this.renderConfig) {
              this.animationItem.container = createTag('canvas');
              var e = this.animationItem.container.style;
              (e.width = '100%'), (e.height = '100%');
              var i = '0px 0px 0px';
              (e.transformOrigin = i),
                this.animationItem.wrapper.appendChild(
                  this.animationItem.container,
                ),
                (this.canvasContext =
                  this.animationItem.container.getContext('2d')),
                this.renderConfig.className &&
                  this.animationItem.container.setAttribute(
                    'class',
                    this.renderConfig.className,
                  ),
                this.renderConfig.id &&
                  this.animationItem.container.setAttribute(
                    'id',
                    this.renderConfig.id,
                  );
            } else
              (this.canvasContext = this.renderConfig.context),
                (this.animationItem.container = this.animationItem.wrapper);
            (this.data = t),
              (this.layers = t.layers),
              (this.transformCanvas = {
                w: t.w,
                h: t.h,
                sx: 0,
                sy: 0,
                tx: 0,
                ty: 0,
              }),
              this.setupGlobalData(t, document.body),
              (this.globalData.canvasContext = this.canvasContext),
              (this.globalData.renderer = this),
              (this.globalData.isDashed = !1),
              (this.globalData.progressiveLoad =
                this.renderConfig.progressiveLoad),
              (this.globalData.transformCanvas = this.transformCanvas),
              (this.elements = createSizedArray(t.layers.length)),
              this.updateContainerSize();
          }),
          (CanvasRenderer.prototype.updateContainerSize = function () {
            this.reset();
            var t, e;
            this.animationItem.wrapper && this.animationItem.container
              ? ((t = this.animationItem.wrapper.offsetWidth),
                (e = this.animationItem.wrapper.offsetHeight),
                this.animationItem.container.setAttribute(
                  'width',
                  t * this.renderConfig.dpr,
                ),
                this.animationItem.container.setAttribute(
                  'height',
                  e * this.renderConfig.dpr,
                ))
              : ((t = this.canvasContext.canvas.width * this.renderConfig.dpr),
                (e = this.canvasContext.canvas.height * this.renderConfig.dpr));
            var i, r;
            if (
              this.renderConfig.preserveAspectRatio.indexOf('meet') !== -1 ||
              this.renderConfig.preserveAspectRatio.indexOf('slice') !== -1
            ) {
              var s = this.renderConfig.preserveAspectRatio.split(' '),
                a = s[1] || 'meet',
                l = s[0] || 'xMidYMid',
                m = l.substr(0, 4),
                d = l.substr(4);
              (i = t / e),
                (r = this.transformCanvas.w / this.transformCanvas.h),
                (r > i && a === 'meet') || (r < i && a === 'slice')
                  ? ((this.transformCanvas.sx =
                      t / (this.transformCanvas.w / this.renderConfig.dpr)),
                    (this.transformCanvas.sy =
                      t / (this.transformCanvas.w / this.renderConfig.dpr)))
                  : ((this.transformCanvas.sx =
                      e / (this.transformCanvas.h / this.renderConfig.dpr)),
                    (this.transformCanvas.sy =
                      e / (this.transformCanvas.h / this.renderConfig.dpr))),
                m === 'xMid' &&
                ((r < i && a === 'meet') || (r > i && a === 'slice'))
                  ? (this.transformCanvas.tx =
                      ((t -
                        this.transformCanvas.w * (e / this.transformCanvas.h)) /
                        2) *
                      this.renderConfig.dpr)
                  : m === 'xMax' &&
                    ((r < i && a === 'meet') || (r > i && a === 'slice'))
                  ? (this.transformCanvas.tx =
                      (t -
                        this.transformCanvas.w * (e / this.transformCanvas.h)) *
                      this.renderConfig.dpr)
                  : (this.transformCanvas.tx = 0),
                d === 'YMid' &&
                ((r > i && a === 'meet') || (r < i && a === 'slice'))
                  ? (this.transformCanvas.ty =
                      ((e -
                        this.transformCanvas.h * (t / this.transformCanvas.w)) /
                        2) *
                      this.renderConfig.dpr)
                  : d === 'YMax' &&
                    ((r > i && a === 'meet') || (r < i && a === 'slice'))
                  ? (this.transformCanvas.ty =
                      (e -
                        this.transformCanvas.h * (t / this.transformCanvas.w)) *
                      this.renderConfig.dpr)
                  : (this.transformCanvas.ty = 0);
            } else
              this.renderConfig.preserveAspectRatio === 'none'
                ? ((this.transformCanvas.sx =
                    t / (this.transformCanvas.w / this.renderConfig.dpr)),
                  (this.transformCanvas.sy =
                    e / (this.transformCanvas.h / this.renderConfig.dpr)),
                  (this.transformCanvas.tx = 0),
                  (this.transformCanvas.ty = 0))
                : ((this.transformCanvas.sx = this.renderConfig.dpr),
                  (this.transformCanvas.sy = this.renderConfig.dpr),
                  (this.transformCanvas.tx = 0),
                  (this.transformCanvas.ty = 0));
            (this.transformCanvas.props = [
              this.transformCanvas.sx,
              0,
              0,
              0,
              0,
              this.transformCanvas.sy,
              0,
              0,
              0,
              0,
              1,
              0,
              this.transformCanvas.tx,
              this.transformCanvas.ty,
              0,
              1,
            ]),
              this.ctxTransform(this.transformCanvas.props),
              this.canvasContext.beginPath(),
              this.canvasContext.rect(
                0,
                0,
                this.transformCanvas.w,
                this.transformCanvas.h,
              ),
              this.canvasContext.closePath(),
              this.canvasContext.clip(),
              this.renderFrame(this.renderedFrame, !0);
          }),
          (CanvasRenderer.prototype.destroy = function () {
            this.renderConfig.clearCanvas &&
              this.animationItem.wrapper &&
              (this.animationItem.wrapper.innerText = '');
            var t,
              e = this.layers ? this.layers.length : 0;
            for (t = e - 1; t >= 0; t -= 1)
              this.elements[t] && this.elements[t].destroy();
            (this.elements.length = 0),
              (this.globalData.canvasContext = null),
              (this.animationItem.container = null),
              (this.destroyed = !0);
          }),
          (CanvasRenderer.prototype.renderFrame = function (t, e) {
            if (
              !(
                (this.renderedFrame === t &&
                  this.renderConfig.clearCanvas === !0 &&
                  !e) ||
                this.destroyed ||
                t === -1
              )
            ) {
              (this.renderedFrame = t),
                (this.globalData.frameNum =
                  t - this.animationItem._isFirstFrame),
                (this.globalData.frameId += 1),
                (this.globalData._mdf = !this.renderConfig.clearCanvas || e),
                (this.globalData.projectInterface.currentFrame = t);
              var i,
                r = this.layers.length;
              for (
                this.completeLayers || this.checkLayers(t), i = 0;
                i < r;
                i += 1
              )
                (this.completeLayers || this.elements[i]) &&
                  this.elements[i].prepareFrame(t - this.layers[i].st);
              if (this.globalData._mdf) {
                for (
                  this.renderConfig.clearCanvas === !0
                    ? this.canvasContext.clearRect(
                        0,
                        0,
                        this.transformCanvas.w,
                        this.transformCanvas.h,
                      )
                    : this.save(),
                    i = r - 1;
                  i >= 0;
                  i -= 1
                )
                  (this.completeLayers || this.elements[i]) &&
                    this.elements[i].renderFrame();
                this.renderConfig.clearCanvas !== !0 && this.restore();
              }
            }
          }),
          (CanvasRenderer.prototype.buildItem = function (t) {
            var e = this.elements;
            if (!(e[t] || this.layers[t].ty === 99)) {
              var i = this.createItem(this.layers[t], this, this.globalData);
              (e[t] = i), i.initExpressions();
            }
          }),
          (CanvasRenderer.prototype.checkPendingElements = function () {
            for (; this.pendingElements.length; ) {
              var t = this.pendingElements.pop();
              t.checkParenting();
            }
          }),
          (CanvasRenderer.prototype.hide = function () {
            this.animationItem.container.style.display = 'none';
          }),
          (CanvasRenderer.prototype.show = function () {
            this.animationItem.container.style.display = 'block';
          });

        function MaskElement(t, e, i) {
          (this.data = t),
            (this.element = e),
            (this.globalData = i),
            (this.storedData = []),
            (this.masksProperties = this.data.masksProperties || []),
            (this.maskElement = null);
          var r = this.globalData.defs,
            s,
            a = this.masksProperties ? this.masksProperties.length : 0;
          (this.viewData = createSizedArray(a)), (this.solidPath = '');
          var l,
            m = this.masksProperties,
            d = 0,
            g = [],
            x,
            b,
            y = createElementID(),
            u,
            k,
            f,
            h,
            p = 'clipPath',
            n = 'clip-path';
          for (s = 0; s < a; s += 1)
            if (
              (((m[s].mode !== 'a' && m[s].mode !== 'n') ||
                m[s].inv ||
                m[s].o.k !== 100 ||
                m[s].o.x) &&
                ((p = 'mask'), (n = 'mask')),
              (m[s].mode === 's' || m[s].mode === 'i') && d === 0
                ? ((u = createNS('rect')),
                  u.setAttribute('fill', '#ffffff'),
                  u.setAttribute('width', this.element.comp.data.w || 0),
                  u.setAttribute('height', this.element.comp.data.h || 0),
                  g.push(u))
                : (u = null),
              (l = createNS('path')),
              m[s].mode === 'n')
            )
              (this.viewData[s] = {
                op: PropertyFactory.getProp(
                  this.element,
                  m[s].o,
                  0,
                  0.01,
                  this.element,
                ),
                prop: ShapePropertyFactory.getShapeProp(this.element, m[s], 3),
                elem: l,
                lastPath: '',
              }),
                r.appendChild(l);
            else {
              (d += 1),
                l.setAttribute(
                  'fill',
                  m[s].mode === 's' ? '#000000' : '#ffffff',
                ),
                l.setAttribute('clip-rule', 'nonzero');
              var o;
              if (
                (m[s].x.k !== 0
                  ? ((p = 'mask'),
                    (n = 'mask'),
                    (h = PropertyFactory.getProp(
                      this.element,
                      m[s].x,
                      0,
                      null,
                      this.element,
                    )),
                    (o = createElementID()),
                    (k = createNS('filter')),
                    k.setAttribute('id', o),
                    (f = createNS('feMorphology')),
                    f.setAttribute('operator', 'erode'),
                    f.setAttribute('in', 'SourceGraphic'),
                    f.setAttribute('radius', '0'),
                    k.appendChild(f),
                    r.appendChild(k),
                    l.setAttribute(
                      'stroke',
                      m[s].mode === 's' ? '#000000' : '#ffffff',
                    ))
                  : ((f = null), (h = null)),
                (this.storedData[s] = {
                  elem: l,
                  x: h,
                  expan: f,
                  lastPath: '',
                  lastOperator: '',
                  filterId: o,
                  lastRadius: 0,
                }),
                m[s].mode === 'i')
              ) {
                b = g.length;
                var c = createNS('g');
                for (x = 0; x < b; x += 1) c.appendChild(g[x]);
                var v = createNS('mask');
                v.setAttribute('mask-type', 'alpha'),
                  v.setAttribute('id', y + '_' + d),
                  v.appendChild(l),
                  r.appendChild(v),
                  c.setAttribute(
                    'mask',
                    'url(' + locationHref + '#' + y + '_' + d + ')',
                  ),
                  (g.length = 0),
                  g.push(c);
              } else g.push(l);
              m[s].inv &&
                !this.solidPath &&
                (this.solidPath = this.createLayerSolidPath()),
                (this.viewData[s] = {
                  elem: l,
                  lastPath: '',
                  op: PropertyFactory.getProp(
                    this.element,
                    m[s].o,
                    0,
                    0.01,
                    this.element,
                  ),
                  prop: ShapePropertyFactory.getShapeProp(
                    this.element,
                    m[s],
                    3,
                  ),
                  invRect: u,
                }),
                this.viewData[s].prop.k ||
                  this.drawPath(
                    m[s],
                    this.viewData[s].prop.v,
                    this.viewData[s],
                  );
            }
          for (
            this.maskElement = createNS(p), a = g.length, s = 0;
            s < a;
            s += 1
          )
            this.maskElement.appendChild(g[s]);
          d > 0 &&
            (this.maskElement.setAttribute('id', y),
            this.element.maskedElement.setAttribute(
              n,
              'url(' + locationHref + '#' + y + ')',
            ),
            r.appendChild(this.maskElement)),
            this.viewData.length && this.element.addRenderableComponent(this);
        }

        (MaskElement.prototype.getMaskProperty = function (t) {
          return this.viewData[t].prop;
        }),
          (MaskElement.prototype.renderFrame = function (t) {
            var e = this.element.finalTransform.mat,
              i,
              r = this.masksProperties.length;
            for (i = 0; i < r; i += 1)
              if (
                ((this.viewData[i].prop._mdf || t) &&
                  this.drawPath(
                    this.masksProperties[i],
                    this.viewData[i].prop.v,
                    this.viewData[i],
                  ),
                (this.viewData[i].op._mdf || t) &&
                  this.viewData[i].elem.setAttribute(
                    'fill-opacity',
                    this.viewData[i].op.v,
                  ),
                this.masksProperties[i].mode !== 'n' &&
                  (this.viewData[i].invRect &&
                    (this.element.finalTransform.mProp._mdf || t) &&
                    this.viewData[i].invRect.setAttribute(
                      'transform',
                      e.getInverseMatrix().to2dCSS(),
                    ),
                  this.storedData[i].x && (this.storedData[i].x._mdf || t)))
              ) {
                var s = this.storedData[i].expan;
                this.storedData[i].x.v < 0
                  ? (this.storedData[i].lastOperator !== 'erode' &&
                      ((this.storedData[i].lastOperator = 'erode'),
                      this.storedData[i].elem.setAttribute(
                        'filter',
                        'url(' +
                          locationHref +
                          '#' +
                          this.storedData[i].filterId +
                          ')',
                      )),
                    s.setAttribute('radius', -this.storedData[i].x.v))
                  : (this.storedData[i].lastOperator !== 'dilate' &&
                      ((this.storedData[i].lastOperator = 'dilate'),
                      this.storedData[i].elem.setAttribute('filter', null)),
                    this.storedData[i].elem.setAttribute(
                      'stroke-width',
                      this.storedData[i].x.v * 2,
                    ));
              }
          }),
          (MaskElement.prototype.getMaskelement = function () {
            return this.maskElement;
          }),
          (MaskElement.prototype.createLayerSolidPath = function () {
            var t = 'M0,0 ';
            return (
              (t += ' h' + this.globalData.compSize.w),
              (t += ' v' + this.globalData.compSize.h),
              (t += ' h-' + this.globalData.compSize.w),
              (t += ' v-' + this.globalData.compSize.h + ' '),
              t
            );
          }),
          (MaskElement.prototype.drawPath = function (t, e, i) {
            var r = ' M' + e.v[0][0] + ',' + e.v[0][1],
              s,
              a;
            for (a = e._length, s = 1; s < a; s += 1)
              r +=
                ' C' +
                e.o[s - 1][0] +
                ',' +
                e.o[s - 1][1] +
                ' ' +
                e.i[s][0] +
                ',' +
                e.i[s][1] +
                ' ' +
                e.v[s][0] +
                ',' +
                e.v[s][1];
            if (
              (e.c &&
                a > 1 &&
                (r +=
                  ' C' +
                  e.o[s - 1][0] +
                  ',' +
                  e.o[s - 1][1] +
                  ' ' +
                  e.i[0][0] +
                  ',' +
                  e.i[0][1] +
                  ' ' +
                  e.v[0][0] +
                  ',' +
                  e.v[0][1]),
              i.lastPath !== r)
            ) {
              var l = '';
              i.elem &&
                (e.c && (l = t.inv ? this.solidPath + r : r),
                i.elem.setAttribute('d', l)),
                (i.lastPath = r);
            }
          }),
          (MaskElement.prototype.destroy = function () {
            (this.element = null),
              (this.globalData = null),
              (this.maskElement = null),
              (this.data = null),
              (this.masksProperties = null);
          });

        function HierarchyElement() {}

        HierarchyElement.prototype = {
          initHierarchy: function () {
            (this.hierarchy = []), (this._isParent = !1), this.checkParenting();
          },
          setHierarchy: function (t) {
            this.hierarchy = t;
          },
          setAsParent: function () {
            this._isParent = !0;
          },
          checkParenting: function () {
            this.data.parent !== void 0 &&
              this.comp.buildElementParenting(this, this.data.parent, []);
          },
        };

        function FrameElement() {}

        FrameElement.prototype = {
          initFrame: function () {
            (this._isFirstFrame = !1),
              (this.dynamicProperties = []),
              (this._mdf = !1);
          },
          prepareProperties: function (t, e) {
            var i,
              r = this.dynamicProperties.length;
            for (i = 0; i < r; i += 1)
              (e ||
                (this._isParent &&
                  this.dynamicProperties[i].propType === 'transform')) &&
                (this.dynamicProperties[i].getValue(),
                this.dynamicProperties[i]._mdf &&
                  ((this.globalData._mdf = !0), (this._mdf = !0)));
          },
          addDynamicProperty: function (t) {
            this.dynamicProperties.indexOf(t) === -1 &&
              this.dynamicProperties.push(t);
          },
        };

        function TransformElement() {}

        TransformElement.prototype = {
          initTransform: function () {
            (this.finalTransform = {
              mProp: this.data.ks
                ? TransformPropertyFactory.getTransformProperty(
                    this,
                    this.data.ks,
                    this,
                  )
                : { o: 0 },
              _matMdf: !1,
              _opMdf: !1,
              mat: new Matrix(),
            }),
              this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
              this.data.ty;
          },
          renderTransform: function () {
            if (
              ((this.finalTransform._opMdf =
                this.finalTransform.mProp.o._mdf || this._isFirstFrame),
              (this.finalTransform._matMdf =
                this.finalTransform.mProp._mdf || this._isFirstFrame),
              this.hierarchy)
            ) {
              var t,
                e = this.finalTransform.mat,
                i = 0,
                r = this.hierarchy.length;
              if (!this.finalTransform._matMdf)
                for (; i < r; ) {
                  if (this.hierarchy[i].finalTransform.mProp._mdf) {
                    this.finalTransform._matMdf = !0;
                    break;
                  }
                  i += 1;
                }
              if (this.finalTransform._matMdf)
                for (
                  t = this.finalTransform.mProp.v.props,
                    e.cloneFromProps(t),
                    i = 0;
                  i < r;
                  i += 1
                )
                  (t = this.hierarchy[i].finalTransform.mProp.v.props),
                    e.transform(
                      t[0],
                      t[1],
                      t[2],
                      t[3],
                      t[4],
                      t[5],
                      t[6],
                      t[7],
                      t[8],
                      t[9],
                      t[10],
                      t[11],
                      t[12],
                      t[13],
                      t[14],
                      t[15],
                    );
            }
          },
          globalToLocal: function (t) {
            var e = [];
            e.push(this.finalTransform);
            for (var i = !0, r = this.comp; i; )
              r.finalTransform
                ? (r.data.hasMask && e.splice(0, 0, r.finalTransform),
                  (r = r.comp))
                : (i = !1);
            var s,
              a = e.length,
              l;
            for (s = 0; s < a; s += 1)
              (l = e[s].mat.applyToPointArray(0, 0, 0)),
                (t = [t[0] - l[0], t[1] - l[1], 0]);
            return t;
          },
          mHelper: new Matrix(),
        };

        function RenderableElement() {}

        RenderableElement.prototype = {
          initRenderable: function () {
            (this.isInRange = !1),
              (this.hidden = !1),
              (this.isTransparent = !1),
              (this.renderableComponents = []);
          },
          addRenderableComponent: function (t) {
            this.renderableComponents.indexOf(t) === -1 &&
              this.renderableComponents.push(t);
          },
          removeRenderableComponent: function (t) {
            this.renderableComponents.indexOf(t) !== -1 &&
              this.renderableComponents.splice(
                this.renderableComponents.indexOf(t),
                1,
              );
          },
          prepareRenderableFrame: function (t) {
            this.checkLayerLimits(t);
          },
          checkTransparency: function () {
            this.finalTransform.mProp.o.v <= 0
              ? !this.isTransparent &&
                this.globalData.renderConfig.hideOnTransparent &&
                ((this.isTransparent = !0), this.hide())
              : this.isTransparent && ((this.isTransparent = !1), this.show());
          },
          checkLayerLimits: function (t) {
            this.data.ip - this.data.st <= t && this.data.op - this.data.st > t
              ? this.isInRange !== !0 &&
                ((this.globalData._mdf = !0),
                (this._mdf = !0),
                (this.isInRange = !0),
                this.show())
              : this.isInRange !== !1 &&
                ((this.globalData._mdf = !0),
                (this.isInRange = !1),
                this.hide());
          },
          renderRenderable: function () {
            var t,
              e = this.renderableComponents.length;
            for (t = 0; t < e; t += 1)
              this.renderableComponents[t].renderFrame(this._isFirstFrame);
          },
          sourceRectAtTime: function () {
            return { top: 0, left: 0, width: 100, height: 100 };
          },
          getLayerSize: function () {
            return this.data.ty === 5
              ? {
                  w: this.data.textData.width,
                  h: this.data.textData.height,
                }
              : { w: this.data.width, h: this.data.height };
          },
        };

        function RenderableDOMElement() {}

        (function () {
          var t = {
            initElement: function (e, i, r) {
              this.initFrame(),
                this.initBaseData(e, i, r),
                this.initTransform(e, i, r),
                this.initHierarchy(),
                this.initRenderable(),
                this.initRendererElement(),
                this.createContainerElements(),
                this.createRenderableComponents(),
                this.createContent(),
                this.hide();
            },
            hide: function () {
              if (!this.hidden && (!this.isInRange || this.isTransparent)) {
                var e = this.baseElement || this.layerElement;
                (e.style.display = 'none'), (this.hidden = !0);
              }
            },
            show: function () {
              if (this.isInRange && !this.isTransparent) {
                if (!this.data.hd) {
                  var e = this.baseElement || this.layerElement;
                  e.style.display = 'block';
                }
                (this.hidden = !1), (this._isFirstFrame = !0);
              }
            },
            renderFrame: function () {
              this.data.hd ||
                this.hidden ||
                (this.renderTransform(),
                this.renderRenderable(),
                this.renderElement(),
                this.renderInnerContent(),
                this._isFirstFrame && (this._isFirstFrame = !1));
            },
            renderInnerContent: function () {},
            prepareFrame: function (e) {
              (this._mdf = !1),
                this.prepareRenderableFrame(e),
                this.prepareProperties(e, this.isInRange),
                this.checkTransparency();
            },
            destroy: function () {
              (this.innerElem = null), this.destroyBaseElement();
            },
          };
          extendPrototype(
            [RenderableElement, createProxyFunction(t)],
            RenderableDOMElement,
          );
        })();

        function ProcessedElement(t, e) {
          (this.elem = t), (this.pos = e);
        }

        function SVGShapeData(t, e, i) {
          (this.caches = []),
            (this.styles = []),
            (this.transformers = t),
            (this.lStr = ''),
            (this.sh = i),
            (this.lvl = e),
            (this._isAnimated = !!i.k);
          for (var r = 0, s = t.length; r < s; ) {
            if (t[r].mProps.dynamicProperties.length) {
              this._isAnimated = !0;
              break;
            }
            r += 1;
          }
        }

        SVGShapeData.prototype.setAsAnimated = function () {
          this._isAnimated = !0;
        };

        function ShapeGroupData() {
          (this.it = []), (this.prevViewData = []), (this.gr = createNS('g'));
        }

        function ShapeTransformManager() {
          (this.sequences = {}),
            (this.sequenceList = []),
            (this.transform_key_count = 0);
        }

        ShapeTransformManager.prototype = {
          addTransformSequence: function (t) {
            var e,
              i = t.length,
              r = '_';
            for (e = 0; e < i; e += 1) r += t[e].transform.key + '_';
            var s = this.sequences[r];
            return (
              s ||
                ((s = {
                  transforms: [].concat(t),
                  finalTransform: new Matrix(),
                  _mdf: !1,
                }),
                (this.sequences[r] = s),
                this.sequenceList.push(s)),
              s
            );
          },
          processSequence: function (t, e) {
            for (var i = 0, r = t.transforms.length, s = e; i < r && !e; ) {
              if (t.transforms[i].transform.mProps._mdf) {
                s = !0;
                break;
              }
              i += 1;
            }
            if (s) {
              var a;
              for (t.finalTransform.reset(), i = r - 1; i >= 0; i -= 1)
                (a = t.transforms[i].transform.mProps.v.props),
                  t.finalTransform.transform(
                    a[0],
                    a[1],
                    a[2],
                    a[3],
                    a[4],
                    a[5],
                    a[6],
                    a[7],
                    a[8],
                    a[9],
                    a[10],
                    a[11],
                    a[12],
                    a[13],
                    a[14],
                    a[15],
                  );
            }
            t._mdf = s;
          },
          processSequences: function (t) {
            var e,
              i = this.sequenceList.length;
            for (e = 0; e < i; e += 1)
              this.processSequence(this.sequenceList[e], t);
          },
          getNewKey: function () {
            return (
              (this.transform_key_count += 1), '_' + this.transform_key_count
            );
          },
        };

        function CVShapeData(t, e, i, r) {
          (this.styledShapes = []), (this.tr = [0, 0, 0, 0, 0, 0]);
          var s = 4;
          e.ty === 'rc'
            ? (s = 5)
            : e.ty === 'el'
            ? (s = 6)
            : e.ty === 'sr' && (s = 7),
            (this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t));
          var a,
            l = i.length,
            m;
          for (a = 0; a < l; a += 1)
            i[a].closed ||
              ((m = {
                transforms: r.addTransformSequence(i[a].transforms),
                trNodes: [],
              }),
              this.styledShapes.push(m),
              i[a].elements.push(m));
        }

        CVShapeData.prototype.setAsAnimated =
          SVGShapeData.prototype.setAsAnimated;

        function BaseElement() {}

        BaseElement.prototype = {
          checkMasks: function () {
            if (!this.data.hasMask) return !1;
            for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
              if (
                this.data.masksProperties[t].mode !== 'n' &&
                this.data.masksProperties[t].cl !== !1
              )
                return !0;
              t += 1;
            }
            return !1;
          },
          initExpressions: function () {
            (this.layerInterface = LayerExpressionInterface(this)),
              this.data.hasMask &&
                this.maskManager &&
                this.layerInterface.registerMaskInterface(this.maskManager);
            var t = EffectsExpressionInterface.createEffectsInterface(
              this,
              this.layerInterface,
            );
            this.layerInterface.registerEffectsInterface(t),
              this.data.ty === 0 || this.data.xt
                ? (this.compInterface = CompExpressionInterface(this))
                : this.data.ty === 4
                ? ((this.layerInterface.shapeInterface =
                    ShapeExpressionInterface(
                      this.shapesData,
                      this.itemsData,
                      this.layerInterface,
                    )),
                  (this.layerInterface.content =
                    this.layerInterface.shapeInterface))
                : this.data.ty === 5 &&
                  ((this.layerInterface.textInterface =
                    TextExpressionInterface(this)),
                  (this.layerInterface.text =
                    this.layerInterface.textInterface));
          },
          setBlendMode: function () {
            var t = getBlendMode(this.data.bm),
              e = this.baseElement || this.layerElement;
            e.style['mix-blend-mode'] = t;
          },
          initBaseData: function (t, e, i) {
            (this.globalData = e),
              (this.comp = i),
              (this.data = t),
              (this.layerId = createElementID()),
              this.data.sr || (this.data.sr = 1),
              (this.effectsManager = new EffectsManager(
                this.data,
                this,
                this.dynamicProperties,
              ));
          },
          getType: function () {
            return this.type;
          },
          sourceRectAtTime: function () {},
        };

        function NullElement(t, e, i) {
          this.initFrame(),
            this.initBaseData(t, e, i),
            this.initFrame(),
            this.initTransform(t, e, i),
            this.initHierarchy();
        }

        (NullElement.prototype.prepareFrame = function (t) {
          this.prepareProperties(t, !0);
        }),
          (NullElement.prototype.renderFrame = function () {}),
          (NullElement.prototype.getBaseElement = function () {
            return null;
          }),
          (NullElement.prototype.destroy = function () {}),
          (NullElement.prototype.sourceRectAtTime = function () {}),
          (NullElement.prototype.hide = function () {}),
          extendPrototype(
            [BaseElement, TransformElement, HierarchyElement, FrameElement],
            NullElement,
          );

        function SVGBaseElement() {}

        SVGBaseElement.prototype = {
          initRendererElement: function () {
            this.layerElement = createNS('g');
          },
          createContainerElements: function () {
            (this.matteElement = createNS('g')),
              (this.transformedElement = this.layerElement),
              (this.maskedElement = this.layerElement),
              (this._sizeChanged = !1);
            var t = null,
              e,
              i,
              r;
            if (this.data.td) {
              if (this.data.td == 3 || this.data.td == 1) {
                var s = createNS('mask');
                s.setAttribute('id', this.layerId),
                  s.setAttribute(
                    'mask-type',
                    this.data.td == 3 ? 'luminance' : 'alpha',
                  ),
                  s.appendChild(this.layerElement),
                  (t = s),
                  this.globalData.defs.appendChild(s),
                  !featureSupport.maskType &&
                    this.data.td == 1 &&
                    (s.setAttribute('mask-type', 'luminance'),
                    (e = createElementID()),
                    (i = filtersFactory.createFilter(e)),
                    this.globalData.defs.appendChild(i),
                    i.appendChild(
                      filtersFactory.createAlphaToLuminanceFilter(),
                    ),
                    (r = createNS('g')),
                    r.appendChild(this.layerElement),
                    (t = r),
                    s.appendChild(r),
                    r.setAttribute(
                      'filter',
                      'url(' + locationHref + '#' + e + ')',
                    ));
              } else if (this.data.td == 2) {
                var a = createNS('mask');
                a.setAttribute('id', this.layerId),
                  a.setAttribute('mask-type', 'alpha');
                var l = createNS('g');
                a.appendChild(l),
                  (e = createElementID()),
                  (i = filtersFactory.createFilter(e));
                var m = createNS('feComponentTransfer');
                m.setAttribute('in', 'SourceGraphic'), i.appendChild(m);
                var d = createNS('feFuncA');
                d.setAttribute('type', 'table'),
                  d.setAttribute('tableValues', '1.0 0.0'),
                  m.appendChild(d),
                  this.globalData.defs.appendChild(i);
                var g = createNS('rect');
                g.setAttribute('width', this.comp.data.w),
                  g.setAttribute('height', this.comp.data.h),
                  g.setAttribute('x', '0'),
                  g.setAttribute('y', '0'),
                  g.setAttribute('fill', '#ffffff'),
                  g.setAttribute('opacity', '0'),
                  l.setAttribute(
                    'filter',
                    'url(' + locationHref + '#' + e + ')',
                  ),
                  l.appendChild(g),
                  l.appendChild(this.layerElement),
                  (t = l),
                  featureSupport.maskType ||
                    (a.setAttribute('mask-type', 'luminance'),
                    i.appendChild(
                      filtersFactory.createAlphaToLuminanceFilter(),
                    ),
                    (r = createNS('g')),
                    l.appendChild(g),
                    r.appendChild(this.layerElement),
                    (t = r),
                    l.appendChild(r)),
                  this.globalData.defs.appendChild(a);
              }
            } else
              this.data.tt
                ? (this.matteElement.appendChild(this.layerElement),
                  (t = this.matteElement),
                  (this.baseElement = this.matteElement))
                : (this.baseElement = this.layerElement);
            if (
              (this.data.ln &&
                this.layerElement.setAttribute('id', this.data.ln),
              this.data.cl &&
                this.layerElement.setAttribute('class', this.data.cl),
              this.data.ty === 0 && !this.data.hd)
            ) {
              var x = createNS('clipPath'),
                b = createNS('path');
              b.setAttribute(
                'd',
                'M0,0 L' +
                  this.data.w +
                  ',0 L' +
                  this.data.w +
                  ',' +
                  this.data.h +
                  ' L0,' +
                  this.data.h +
                  'z',
              );
              var y = createElementID();
              if (
                (x.setAttribute('id', y),
                x.appendChild(b),
                this.globalData.defs.appendChild(x),
                this.checkMasks())
              ) {
                var u = createNS('g');
                u.setAttribute(
                  'clip-path',
                  'url(' + locationHref + '#' + y + ')',
                ),
                  u.appendChild(this.layerElement),
                  (this.transformedElement = u),
                  t
                    ? t.appendChild(this.transformedElement)
                    : (this.baseElement = this.transformedElement);
              } else
                this.layerElement.setAttribute(
                  'clip-path',
                  'url(' + locationHref + '#' + y + ')',
                );
            }
            this.data.bm !== 0 && this.setBlendMode();
          },
          renderElement: function () {
            this.finalTransform._matMdf &&
              this.transformedElement.setAttribute(
                'transform',
                this.finalTransform.mat.to2dCSS(),
              ),
              this.finalTransform._opMdf &&
                this.transformedElement.setAttribute(
                  'opacity',
                  this.finalTransform.mProp.o.v,
                );
          },
          destroyBaseElement: function () {
            (this.layerElement = null),
              (this.matteElement = null),
              this.maskManager.destroy();
          },
          getBaseElement: function () {
            return this.data.hd ? null : this.baseElement;
          },
          createRenderableComponents: function () {
            (this.maskManager = new MaskElement(
              this.data,
              this,
              this.globalData,
            )),
              (this.renderableEffectsManager = new SVGEffects(this));
          },
          setMatte: function (t) {
            !this.matteElement ||
              this.matteElement.setAttribute(
                'mask',
                'url(' + locationHref + '#' + t + ')',
              );
          },
        };

        function IShapeElement() {}

        IShapeElement.prototype = {
          addShapeToModifiers: function (t) {
            var e,
              i = this.shapeModifiers.length;
            for (e = 0; e < i; e += 1) this.shapeModifiers[e].addShape(t);
          },
          isShapeInAnimatedModifiers: function (t) {
            for (var e = 0, i = this.shapeModifiers.length; e < i; )
              if (this.shapeModifiers[e].isAnimatedWithShape(t)) return !0;
            return !1;
          },
          renderModifiers: function () {
            if (!!this.shapeModifiers.length) {
              var t,
                e = this.shapes.length;
              for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
              e = this.shapeModifiers.length;
              var i;
              for (
                t = e - 1;
                t >= 0 &&
                ((i = this.shapeModifiers[t].processShapes(this._isFirstFrame)),
                !i);
                t -= 1
              );
            }
          },
          lcEnum: { 1: 'butt', 2: 'round', 3: 'square' },
          ljEnum: { 1: 'miter', 2: 'round', 3: 'bevel' },
          searchProcessedElement: function (t) {
            for (var e = this.processedElements, i = 0, r = e.length; i < r; ) {
              if (e[i].elem === t) return e[i].pos;
              i += 1;
            }
            return 0;
          },
          addProcessedElement: function (t, e) {
            for (var i = this.processedElements, r = i.length; r; )
              if (((r -= 1), i[r].elem === t)) {
                i[r].pos = e;
                return;
              }
            i.push(new ProcessedElement(t, e));
          },
          prepareFrame: function (t) {
            this.prepareRenderableFrame(t),
              this.prepareProperties(t, this.isInRange);
          },
        };

        function ITextElement() {}

        (ITextElement.prototype.initElement = function (t, e, i) {
          (this.lettersChangedFlag = !0),
            this.initFrame(),
            this.initBaseData(t, e, i),
            (this.textProperty = new TextProperty(
              this,
              t.t,
              this.dynamicProperties,
            )),
            (this.textAnimator = new TextAnimatorProperty(
              t.t,
              this.renderType,
              this,
            )),
            this.initTransform(t, e, i),
            this.initHierarchy(),
            this.initRenderable(),
            this.initRendererElement(),
            this.createContainerElements(),
            this.createRenderableComponents(),
            this.createContent(),
            this.hide(),
            this.textAnimator.searchProperties(this.dynamicProperties);
        }),
          (ITextElement.prototype.prepareFrame = function (t) {
            (this._mdf = !1),
              this.prepareRenderableFrame(t),
              this.prepareProperties(t, this.isInRange),
              (this.textProperty._mdf || this.textProperty._isFirstFrame) &&
                (this.buildNewText(),
                (this.textProperty._isFirstFrame = !1),
                (this.textProperty._mdf = !1));
          }),
          (ITextElement.prototype.createPathShape = function (t, e) {
            var i,
              r = e.length,
              s,
              a = '';
            for (i = 0; i < r; i += 1)
              (s = e[i].ks.k), (a += buildShapeString(s, s.i.length, !0, t));
            return a;
          }),
          (ITextElement.prototype.updateDocumentData = function (t, e) {
            this.textProperty.updateDocumentData(t, e);
          }),
          (ITextElement.prototype.canResizeFont = function (t) {
            this.textProperty.canResizeFont(t);
          }),
          (ITextElement.prototype.setMinimumFontSize = function (t) {
            this.textProperty.setMinimumFontSize(t);
          }),
          (ITextElement.prototype.applyTextPropertiesToMatrix = function (
            t,
            e,
            i,
            r,
            s,
          ) {
            switch (
              (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0),
              e.translate(0, -t.ls, 0),
              t.j)
            ) {
              case 1:
                e.translate(
                  t.justifyOffset + (t.boxWidth - t.lineWidths[i]),
                  0,
                  0,
                );
                break;
              case 2:
                e.translate(
                  t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2,
                  0,
                  0,
                );
                break;
              default:
                break;
            }
            e.translate(r, s, 0);
          }),
          (ITextElement.prototype.buildColor = function (t) {
            return (
              'rgb(' +
              Math.round(t[0] * 255) +
              ',' +
              Math.round(t[1] * 255) +
              ',' +
              Math.round(t[2] * 255) +
              ')'
            );
          }),
          (ITextElement.prototype.emptyProp = new LetterProps()),
          (ITextElement.prototype.destroy = function () {});

        function ICompElement() {}

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            HierarchyElement,
            FrameElement,
            RenderableDOMElement,
          ],
          ICompElement,
        ),
          (ICompElement.prototype.initElement = function (t, e, i) {
            this.initFrame(),
              this.initBaseData(t, e, i),
              this.initTransform(t, e, i),
              this.initRenderable(),
              this.initHierarchy(),
              this.initRendererElement(),
              this.createContainerElements(),
              this.createRenderableComponents(),
              (this.data.xt || !e.progressiveLoad) && this.buildAllItems(),
              this.hide();
          }),
          (ICompElement.prototype.prepareFrame = function (t) {
            if (
              ((this._mdf = !1),
              this.prepareRenderableFrame(t),
              this.prepareProperties(t, this.isInRange),
              !(!this.isInRange && !this.data.xt))
            ) {
              if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
              else {
                var e = this.tm.v;
                e === this.data.op && (e = this.data.op - 1),
                  (this.renderedFrame = e);
              }
              var i,
                r = this.elements.length;
              for (
                this.completeLayers || this.checkLayers(this.renderedFrame),
                  i = r - 1;
                i >= 0;
                i -= 1
              )
                (this.completeLayers || this.elements[i]) &&
                  (this.elements[i].prepareFrame(
                    this.renderedFrame - this.layers[i].st,
                  ),
                  this.elements[i]._mdf && (this._mdf = !0));
            }
          }),
          (ICompElement.prototype.renderInnerContent = function () {
            var t,
              e = this.layers.length;
            for (t = 0; t < e; t += 1)
              (this.completeLayers || this.elements[t]) &&
                this.elements[t].renderFrame();
          }),
          (ICompElement.prototype.setElements = function (t) {
            this.elements = t;
          }),
          (ICompElement.prototype.getElements = function () {
            return this.elements;
          }),
          (ICompElement.prototype.destroyElements = function () {
            var t,
              e = this.layers.length;
            for (t = 0; t < e; t += 1)
              this.elements[t] && this.elements[t].destroy();
          }),
          (ICompElement.prototype.destroy = function () {
            this.destroyElements(), this.destroyBaseElement();
          });

        function IImageElement(t, e, i) {
          (this.assetData = e.getAssetData(t.refId)),
            this.initElement(t, e, i),
            (this.sourceRect = {
              top: 0,
              left: 0,
              width: this.assetData.w,
              height: this.assetData.h,
            });
        }

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            SVGBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableDOMElement,
          ],
          IImageElement,
        ),
          (IImageElement.prototype.createContent = function () {
            var t = this.globalData.getAssetsPath(this.assetData);
            (this.innerElem = new Image()),
              this.innerElem.setAttribute('width', this.assetData.w + 'px'),
              this.innerElem.setAttribute('height', this.assetData.h + 'px'),
              this.innerElem.setAttribute(
                'preserveAspectRatio',
                this.assetData.pr ||
                  this.globalData.renderConfig.imagePreserveAspectRatio,
              ),
              this.innerElem.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'href',
                t,
              ),
              this.layerElement.appendChild(this.innerElem);
          }),
          (IImageElement.prototype.sourceRectAtTime = function () {
            return this.sourceRect;
          });

        function ISolidElement(t, e, i) {
          this.initElement(t, e, i);
        }

        extendPrototype([IImageElement], ISolidElement),
          (ISolidElement.prototype.createContent = function () {
            var t = createNS('rect');
            t.setAttribute('width', this.data.sw),
              t.setAttribute('height', this.data.sh),
              t.setAttribute('fill', this.data.sc),
              this.layerElement.appendChild(t);
          });

        function AudioElement(t, e, i) {
          this.initFrame(),
            this.initRenderable(),
            (this.assetData = e.getAssetData(t.refId)),
            this.initBaseData(t, e, i),
            (this._isPlaying = !1),
            (this._canPlay = !1);
          var r = this.globalData.getAssetsPath(this.assetData);
          (this.audio = this.globalData.audioController.createAudio(r)),
            (this._currentTime = 0),
            this.globalData.audioController.addAudio(this),
            (this.tm = t.tm
              ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this)
              : { _placeholder: !0 });
        }

        (AudioElement.prototype.prepareFrame = function (t) {
          if (
            (this.prepareRenderableFrame(t, !0),
            this.prepareProperties(t, !0),
            this.tm._placeholder)
          )
            this._currentTime = t / this.data.sr;
          else {
            var e = this.tm.v;
            this._currentTime = e;
          }
        }),
          extendPrototype(
            [RenderableElement, BaseElement, FrameElement],
            AudioElement,
          ),
          (AudioElement.prototype.renderFrame = function () {
            this.isInRange &&
              this._canPlay &&
              (this._isPlaying
                ? (!this.audio.playing() ||
                    Math.abs(
                      this._currentTime / this.globalData.frameRate -
                        this.audio.seek(),
                    ) > 0.1) &&
                  this.audio.seek(this._currentTime / this.globalData.frameRate)
                : (this.audio.play(),
                  this.audio.seek(
                    this._currentTime / this.globalData.frameRate,
                  ),
                  (this._isPlaying = !0)));
          }),
          (AudioElement.prototype.show = function () {}),
          (AudioElement.prototype.hide = function () {
            this.audio.pause(), (this._isPlaying = !1);
          }),
          (AudioElement.prototype.pause = function () {
            this.audio.pause(), (this._isPlaying = !1), (this._canPlay = !1);
          }),
          (AudioElement.prototype.resume = function () {
            this._canPlay = !0;
          }),
          (AudioElement.prototype.setRate = function (t) {
            this.audio.rate(t);
          }),
          (AudioElement.prototype.volume = function (t) {
            this.audio.volume(t);
          }),
          (AudioElement.prototype.getBaseElement = function () {
            return null;
          }),
          (AudioElement.prototype.destroy = function () {}),
          (AudioElement.prototype.sourceRectAtTime = function () {}),
          (AudioElement.prototype.initExpressions = function () {});

        function FootageElement(t, e, i) {
          this.initFrame(),
            this.initRenderable(),
            (this.assetData = e.getAssetData(t.refId)),
            (this.footageData = e.imageLoader.getAsset(this.assetData)),
            this.initBaseData(t, e, i);
        }

        (FootageElement.prototype.prepareFrame = function () {}),
          extendPrototype(
            [RenderableElement, BaseElement, FrameElement],
            FootageElement,
          ),
          (FootageElement.prototype.getBaseElement = function () {
            return null;
          }),
          (FootageElement.prototype.renderFrame = function () {}),
          (FootageElement.prototype.destroy = function () {}),
          (FootageElement.prototype.initExpressions = function () {
            this.layerInterface = FootageInterface(this);
          }),
          (FootageElement.prototype.getFootageData = function () {
            return this.footageData;
          });

        function SVGShapeElement(t, e, i) {
          (this.shapes = []),
            (this.shapesData = t.shapes),
            (this.stylesList = []),
            (this.shapeModifiers = []),
            (this.itemsData = []),
            (this.processedElements = []),
            (this.animatedContents = []),
            this.initElement(t, e, i),
            (this.prevViewData = []);
        }

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            SVGBaseElement,
            IShapeElement,
            HierarchyElement,
            FrameElement,
            RenderableDOMElement,
          ],
          SVGShapeElement,
        ),
          (SVGShapeElement.prototype.initSecondaryElement = function () {}),
          (SVGShapeElement.prototype.identityMatrix = new Matrix()),
          (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
          (SVGShapeElement.prototype.createContent = function () {
            this.searchShapes(
              this.shapesData,
              this.itemsData,
              this.prevViewData,
              this.layerElement,
              0,
              [],
              !0,
            ),
              this.filterUniqueShapes();
          }),
          (SVGShapeElement.prototype.filterUniqueShapes = function () {
            var t,
              e = this.shapes.length,
              i,
              r,
              s = this.stylesList.length,
              a,
              l = [],
              m = !1;
            for (r = 0; r < s; r += 1) {
              for (
                a = this.stylesList[r], m = !1, l.length = 0, t = 0;
                t < e;
                t += 1
              )
                (i = this.shapes[t]),
                  i.styles.indexOf(a) !== -1 &&
                    (l.push(i), (m = i._isAnimated || m));
              l.length > 1 && m && this.setShapesAsAnimated(l);
            }
          }),
          (SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) t[e].setAsAnimated();
          }),
          (SVGShapeElement.prototype.createStyleElement = function (t, e) {
            var i,
              r = new SVGStyleData(t, e),
              s = r.pElem;
            if (t.ty === 'st') i = new SVGStrokeStyleData(this, t, r);
            else if (t.ty === 'fl') i = new SVGFillStyleData(this, t, r);
            else if (t.ty === 'gf' || t.ty === 'gs') {
              var a =
                t.ty === 'gf'
                  ? SVGGradientFillStyleData
                  : SVGGradientStrokeStyleData;
              (i = new a(this, t, r)),
                this.globalData.defs.appendChild(i.gf),
                i.maskId &&
                  (this.globalData.defs.appendChild(i.ms),
                  this.globalData.defs.appendChild(i.of),
                  s.setAttribute(
                    'mask',
                    'url(' + locationHref + '#' + i.maskId + ')',
                  ));
            }
            return (
              (t.ty === 'st' || t.ty === 'gs') &&
                (s.setAttribute('stroke-linecap', this.lcEnum[t.lc] || 'round'),
                s.setAttribute('stroke-linejoin', this.ljEnum[t.lj] || 'round'),
                s.setAttribute('fill-opacity', '0'),
                t.lj === 1 && s.setAttribute('stroke-miterlimit', t.ml)),
              t.r === 2 && s.setAttribute('fill-rule', 'evenodd'),
              t.ln && s.setAttribute('id', t.ln),
              t.cl && s.setAttribute('class', t.cl),
              t.bm && (s.style['mix-blend-mode'] = getBlendMode(t.bm)),
              this.stylesList.push(r),
              this.addToAnimatedContents(t, i),
              i
            );
          }),
          (SVGShapeElement.prototype.createGroupElement = function (t) {
            var e = new ShapeGroupData();
            return (
              t.ln && e.gr.setAttribute('id', t.ln),
              t.cl && e.gr.setAttribute('class', t.cl),
              t.bm && (e.gr.style['mix-blend-mode'] = getBlendMode(t.bm)),
              e
            );
          }),
          (SVGShapeElement.prototype.createTransformElement = function (t, e) {
            var i = TransformPropertyFactory.getTransformProperty(
                this,
                t,
                this,
              ),
              r = new SVGTransformData(i, i.o, e);
            return this.addToAnimatedContents(t, r), r;
          }),
          (SVGShapeElement.prototype.createShapeElement = function (t, e, i) {
            var r = 4;
            t.ty === 'rc'
              ? (r = 5)
              : t.ty === 'el'
              ? (r = 6)
              : t.ty === 'sr' && (r = 7);
            var s = ShapePropertyFactory.getShapeProp(this, t, r, this),
              a = new SVGShapeData(e, i, s);
            return (
              this.shapes.push(a),
              this.addShapeToModifiers(a),
              this.addToAnimatedContents(t, a),
              a
            );
          }),
          (SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
            for (var i = 0, r = this.animatedContents.length; i < r; ) {
              if (this.animatedContents[i].element === e) return;
              i += 1;
            }
            this.animatedContents.push({
              fn: SVGElementsRenderer.createRenderFunction(t),
              element: e,
              data: t,
            });
          }),
          (SVGShapeElement.prototype.setElementStyles = function (t) {
            var e = t.styles,
              i,
              r = this.stylesList.length;
            for (i = 0; i < r; i += 1)
              this.stylesList[i].closed || e.push(this.stylesList[i]);
          }),
          (SVGShapeElement.prototype.reloadShapes = function () {
            this._isFirstFrame = !0;
            var t,
              e = this.itemsData.length;
            for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
            for (
              this.searchShapes(
                this.shapesData,
                this.itemsData,
                this.prevViewData,
                this.layerElement,
                0,
                [],
                !0,
              ),
                this.filterUniqueShapes(),
                e = this.dynamicProperties.length,
                t = 0;
              t < e;
              t += 1
            )
              this.dynamicProperties[t].getValue();
            this.renderModifiers();
          }),
          (SVGShapeElement.prototype.searchShapes = function (
            t,
            e,
            i,
            r,
            s,
            a,
            l,
          ) {
            var m = [].concat(a),
              d,
              g = t.length - 1,
              x,
              b,
              y = [],
              u = [],
              k,
              f,
              h;
            for (d = g; d >= 0; d -= 1) {
              if (
                ((h = this.searchProcessedElement(t[d])),
                h ? (e[d] = i[h - 1]) : (t[d]._render = l),
                t[d].ty === 'fl' ||
                  t[d].ty === 'st' ||
                  t[d].ty === 'gf' ||
                  t[d].ty === 'gs')
              )
                h
                  ? (e[d].style.closed = !1)
                  : (e[d] = this.createStyleElement(t[d], s)),
                  t[d]._render && r.appendChild(e[d].style.pElem),
                  y.push(e[d].style);
              else if (t[d].ty === 'gr') {
                if (!h) e[d] = this.createGroupElement(t[d]);
                else
                  for (b = e[d].it.length, x = 0; x < b; x += 1)
                    e[d].prevViewData[x] = e[d].it[x];
                this.searchShapes(
                  t[d].it,
                  e[d].it,
                  e[d].prevViewData,
                  e[d].gr,
                  s + 1,
                  m,
                  l,
                ),
                  t[d]._render && r.appendChild(e[d].gr);
              } else
                t[d].ty === 'tr'
                  ? (h || (e[d] = this.createTransformElement(t[d], r)),
                    (k = e[d].transform),
                    m.push(k))
                  : t[d].ty === 'sh' ||
                    t[d].ty === 'rc' ||
                    t[d].ty === 'el' ||
                    t[d].ty === 'sr'
                  ? (h || (e[d] = this.createShapeElement(t[d], m, s)),
                    this.setElementStyles(e[d]))
                  : t[d].ty === 'tm' ||
                    t[d].ty === 'rd' ||
                    t[d].ty === 'ms' ||
                    t[d].ty === 'pb'
                  ? (h
                      ? ((f = e[d]), (f.closed = !1))
                      : ((f = ShapeModifiers.getModifier(t[d].ty)),
                        f.init(this, t[d]),
                        (e[d] = f),
                        this.shapeModifiers.push(f)),
                    u.push(f))
                  : t[d].ty === 'rp' &&
                    (h
                      ? ((f = e[d]), (f.closed = !0))
                      : ((f = ShapeModifiers.getModifier(t[d].ty)),
                        (e[d] = f),
                        f.init(this, t, d, e),
                        this.shapeModifiers.push(f),
                        (l = !1)),
                    u.push(f));
              this.addProcessedElement(t[d], d + 1);
            }
            for (g = y.length, d = 0; d < g; d += 1) y[d].closed = !0;
            for (g = u.length, d = 0; d < g; d += 1) u[d].closed = !0;
          }),
          (SVGShapeElement.prototype.renderInnerContent = function () {
            this.renderModifiers();
            var t,
              e = this.stylesList.length;
            for (t = 0; t < e; t += 1) this.stylesList[t].reset();
            for (this.renderShape(), t = 0; t < e; t += 1)
              (this.stylesList[t]._mdf || this._isFirstFrame) &&
                (this.stylesList[t].msElem &&
                  (this.stylesList[t].msElem.setAttribute(
                    'd',
                    this.stylesList[t].d,
                  ),
                  (this.stylesList[t].d = 'M0 0' + this.stylesList[t].d)),
                this.stylesList[t].pElem.setAttribute(
                  'd',
                  this.stylesList[t].d || 'M0 0',
                ));
          }),
          (SVGShapeElement.prototype.renderShape = function () {
            var t,
              e = this.animatedContents.length,
              i;
            for (t = 0; t < e; t += 1)
              (i = this.animatedContents[t]),
                (this._isFirstFrame || i.element._isAnimated) &&
                  i.data !== !0 &&
                  i.fn(i.data, i.element, this._isFirstFrame);
          }),
          (SVGShapeElement.prototype.destroy = function () {
            this.destroyBaseElement(),
              (this.shapesData = null),
              (this.itemsData = null);
          });

        function CVContextData() {
          (this.saved = []),
            (this.cArrPos = 0),
            (this.cTr = new Matrix()),
            (this.cO = 1);
          var t,
            e = 15;
          for (
            this.savedOp = createTypedArray('float32', e), t = 0;
            t < e;
            t += 1
          )
            this.saved[t] = createTypedArray('float32', 16);
          this._length = e;
        }

        (CVContextData.prototype.duplicate = function () {
          var t = this._length * 2,
            e = this.savedOp;
          (this.savedOp = createTypedArray('float32', t)), this.savedOp.set(e);
          var i = 0;
          for (i = this._length; i < t; i += 1)
            this.saved[i] = createTypedArray('float32', 16);
          this._length = t;
        }),
          (CVContextData.prototype.reset = function () {
            (this.cArrPos = 0), this.cTr.reset(), (this.cO = 1);
          });

        function CVBaseElement() {}

        (CVBaseElement.prototype = {
          createElements: function () {},
          initRendererElement: function () {},
          createContainerElements: function () {
            (this.canvasContext = this.globalData.canvasContext),
              (this.renderableEffectsManager = new CVEffects(this));
          },
          createContent: function () {},
          setBlendMode: function () {
            var t = this.globalData;
            if (t.blendMode !== this.data.bm) {
              t.blendMode = this.data.bm;
              var e = getBlendMode(this.data.bm);
              t.canvasContext.globalCompositeOperation = e;
            }
          },
          createRenderableComponents: function () {
            this.maskManager = new CVMaskElement(this.data, this);
          },
          hideElement: function () {
            !this.hidden &&
              (!this.isInRange || this.isTransparent) &&
              (this.hidden = !0);
          },
          showElement: function () {
            this.isInRange &&
              !this.isTransparent &&
              ((this.hidden = !1),
              (this._isFirstFrame = !0),
              (this.maskManager._isFirstFrame = !0));
          },
          renderFrame: function () {
            if (!(this.hidden || this.data.hd)) {
              this.renderTransform(),
                this.renderRenderable(),
                this.setBlendMode();
              var t = this.data.ty === 0;
              this.globalData.renderer.save(t),
                this.globalData.renderer.ctxTransform(
                  this.finalTransform.mat.props,
                ),
                this.globalData.renderer.ctxOpacity(
                  this.finalTransform.mProp.o.v,
                ),
                this.renderInnerContent(),
                this.globalData.renderer.restore(t),
                this.maskManager.hasMasks &&
                  this.globalData.renderer.restore(!0),
                this._isFirstFrame && (this._isFirstFrame = !1);
            }
          },
          destroy: function () {
            (this.canvasContext = null),
              (this.data = null),
              (this.globalData = null),
              this.maskManager.destroy();
          },
          mHelper: new Matrix(),
        }),
          (CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement),
          (CVBaseElement.prototype.show = CVBaseElement.prototype.showElement);

        function CVImageElement(t, e, i) {
          (this.assetData = e.getAssetData(t.refId)),
            (this.img = e.imageLoader.getAsset(this.assetData)),
            this.initElement(t, e, i);
        }

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            CVBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
          ],
          CVImageElement,
        ),
          (CVImageElement.prototype.initElement =
            SVGShapeElement.prototype.initElement),
          (CVImageElement.prototype.prepareFrame =
            IImageElement.prototype.prepareFrame),
          (CVImageElement.prototype.createContent = function () {
            if (
              this.img.width &&
              (this.assetData.w !== this.img.width ||
                this.assetData.h !== this.img.height)
            ) {
              var t = createTag('canvas');
              (t.width = this.assetData.w), (t.height = this.assetData.h);
              var e = t.getContext('2d'),
                i = this.img.width,
                r = this.img.height,
                s = i / r,
                a = this.assetData.w / this.assetData.h,
                l,
                m,
                d =
                  this.assetData.pr ||
                  this.globalData.renderConfig.imagePreserveAspectRatio;
              (s > a && d === 'xMidYMid slice') ||
              (s < a && d !== 'xMidYMid slice')
                ? ((m = r), (l = m * a))
                : ((l = i), (m = l / a)),
                e.drawImage(
                  this.img,
                  (i - l) / 2,
                  (r - m) / 2,
                  l,
                  m,
                  0,
                  0,
                  this.assetData.w,
                  this.assetData.h,
                ),
                (this.img = t);
            }
          }),
          (CVImageElement.prototype.renderInnerContent = function () {
            this.canvasContext.drawImage(this.img, 0, 0);
          }),
          (CVImageElement.prototype.destroy = function () {
            this.img = null;
          });

        function CVCompElement(t, e, i) {
          (this.completeLayers = !1),
            (this.layers = t.layers),
            (this.pendingElements = []),
            (this.elements = createSizedArray(this.layers.length)),
            this.initElement(t, e, i),
            (this.tm = t.tm
              ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this)
              : { _placeholder: !0 });
        }

        extendPrototype(
          [CanvasRenderer, ICompElement, CVBaseElement],
          CVCompElement,
        ),
          (CVCompElement.prototype.renderInnerContent = function () {
            var t = this.canvasContext;
            t.beginPath(),
              t.moveTo(0, 0),
              t.lineTo(this.data.w, 0),
              t.lineTo(this.data.w, this.data.h),
              t.lineTo(0, this.data.h),
              t.lineTo(0, 0),
              t.clip();
            var e,
              i = this.layers.length;
            for (e = i - 1; e >= 0; e -= 1)
              (this.completeLayers || this.elements[e]) &&
                this.elements[e].renderFrame();
          }),
          (CVCompElement.prototype.destroy = function () {
            var t,
              e = this.layers.length;
            for (t = e - 1; t >= 0; t -= 1)
              this.elements[t] && this.elements[t].destroy();
            (this.layers = null), (this.elements = null);
          });

        function CVMaskElement(t, e) {
          (this.data = t),
            (this.element = e),
            (this.masksProperties = this.data.masksProperties || []),
            (this.viewData = createSizedArray(this.masksProperties.length));
          var i,
            r = this.masksProperties.length,
            s = !1;
          for (i = 0; i < r; i += 1)
            this.masksProperties[i].mode !== 'n' && (s = !0),
              (this.viewData[i] = ShapePropertyFactory.getShapeProp(
                this.element,
                this.masksProperties[i],
                3,
              ));
          (this.hasMasks = s), s && this.element.addRenderableComponent(this);
        }

        (CVMaskElement.prototype.renderFrame = function () {
          if (!!this.hasMasks) {
            var t = this.element.finalTransform.mat,
              e = this.element.canvasContext,
              i,
              r = this.masksProperties.length,
              s,
              a,
              l;
            for (e.beginPath(), i = 0; i < r; i += 1)
              if (this.masksProperties[i].mode !== 'n') {
                this.masksProperties[i].inv &&
                  (e.moveTo(0, 0),
                  e.lineTo(this.element.globalData.compSize.w, 0),
                  e.lineTo(
                    this.element.globalData.compSize.w,
                    this.element.globalData.compSize.h,
                  ),
                  e.lineTo(0, this.element.globalData.compSize.h),
                  e.lineTo(0, 0)),
                  (l = this.viewData[i].v),
                  (s = t.applyToPointArray(l.v[0][0], l.v[0][1], 0)),
                  e.moveTo(s[0], s[1]);
                var m,
                  d = l._length;
                for (m = 1; m < d; m += 1)
                  (a = t.applyToTriplePoints(l.o[m - 1], l.i[m], l.v[m])),
                    e.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
                (a = t.applyToTriplePoints(l.o[m - 1], l.i[0], l.v[0])),
                  e.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
              }
            this.element.globalData.renderer.save(!0), e.clip();
          }
        }),
          (CVMaskElement.prototype.getMaskProperty =
            MaskElement.prototype.getMaskProperty),
          (CVMaskElement.prototype.destroy = function () {
            this.element = null;
          });

        function CVShapeElement(t, e, i) {
          (this.shapes = []),
            (this.shapesData = t.shapes),
            (this.stylesList = []),
            (this.itemsData = []),
            (this.prevViewData = []),
            (this.shapeModifiers = []),
            (this.processedElements = []),
            (this.transformsManager = new ShapeTransformManager()),
            this.initElement(t, e, i);
        }

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            CVBaseElement,
            IShapeElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
          ],
          CVShapeElement,
        ),
          (CVShapeElement.prototype.initElement =
            RenderableDOMElement.prototype.initElement),
          (CVShapeElement.prototype.transformHelper = {
            opacity: 1,
            _opMdf: !1,
          }),
          (CVShapeElement.prototype.dashResetter = []),
          (CVShapeElement.prototype.createContent = function () {
            this.searchShapes(
              this.shapesData,
              this.itemsData,
              this.prevViewData,
              !0,
              [],
            );
          }),
          (CVShapeElement.prototype.createStyleElement = function (t, e) {
            var i = {
                data: t,
                type: t.ty,
                preTransforms: this.transformsManager.addTransformSequence(e),
                transforms: [],
                elements: [],
                closed: t.hd === !0,
              },
              r = {};
            if (
              (t.ty === 'fl' || t.ty === 'st'
                ? ((r.c = PropertyFactory.getProp(this, t.c, 1, 255, this)),
                  r.c.k ||
                    (i.co =
                      'rgb(' +
                      bmFloor(r.c.v[0]) +
                      ',' +
                      bmFloor(r.c.v[1]) +
                      ',' +
                      bmFloor(r.c.v[2]) +
                      ')'))
                : (t.ty === 'gf' || t.ty === 'gs') &&
                  ((r.s = PropertyFactory.getProp(this, t.s, 1, null, this)),
                  (r.e = PropertyFactory.getProp(this, t.e, 1, null, this)),
                  (r.h = PropertyFactory.getProp(
                    this,
                    t.h || { k: 0 },
                    0,
                    0.01,
                    this,
                  )),
                  (r.a = PropertyFactory.getProp(
                    this,
                    t.a || { k: 0 },
                    0,
                    degToRads,
                    this,
                  )),
                  (r.g = new GradientProperty(this, t.g, this))),
              (r.o = PropertyFactory.getProp(this, t.o, 0, 0.01, this)),
              t.ty === 'st' || t.ty === 'gs')
            ) {
              if (
                ((i.lc = this.lcEnum[t.lc] || 'round'),
                (i.lj = this.ljEnum[t.lj] || 'round'),
                t.lj == 1 && (i.ml = t.ml),
                (r.w = PropertyFactory.getProp(this, t.w, 0, null, this)),
                r.w.k || (i.wi = r.w.v),
                t.d)
              ) {
                var s = new DashProperty(this, t.d, 'canvas', this);
                (r.d = s),
                  r.d.k || ((i.da = r.d.dashArray), (i.do = r.d.dashoffset[0]));
              }
            } else i.r = t.r === 2 ? 'evenodd' : 'nonzero';
            return this.stylesList.push(i), (r.style = i), r;
          }),
          (CVShapeElement.prototype.createGroupElement = function () {
            var t = { it: [], prevViewData: [] };
            return t;
          }),
          (CVShapeElement.prototype.createTransformElement = function (t) {
            var e = {
              transform: {
                opacity: 1,
                _opMdf: !1,
                key: this.transformsManager.getNewKey(),
                op: PropertyFactory.getProp(this, t.o, 0, 0.01, this),
                mProps: TransformPropertyFactory.getTransformProperty(
                  this,
                  t,
                  this,
                ),
              },
            };
            return e;
          }),
          (CVShapeElement.prototype.createShapeElement = function (t) {
            var e = new CVShapeData(
              this,
              t,
              this.stylesList,
              this.transformsManager,
            );
            return this.shapes.push(e), this.addShapeToModifiers(e), e;
          }),
          (CVShapeElement.prototype.reloadShapes = function () {
            this._isFirstFrame = !0;
            var t,
              e = this.itemsData.length;
            for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
            for (
              this.searchShapes(
                this.shapesData,
                this.itemsData,
                this.prevViewData,
                !0,
                [],
              ),
                e = this.dynamicProperties.length,
                t = 0;
              t < e;
              t += 1
            )
              this.dynamicProperties[t].getValue();
            this.renderModifiers(),
              this.transformsManager.processSequences(this._isFirstFrame);
          }),
          (CVShapeElement.prototype.addTransformToStyleList = function (t) {
            var e,
              i = this.stylesList.length;
            for (e = 0; e < i; e += 1)
              this.stylesList[e].closed ||
                this.stylesList[e].transforms.push(t);
          }),
          (CVShapeElement.prototype.removeTransformFromStyleList = function () {
            var t,
              e = this.stylesList.length;
            for (t = 0; t < e; t += 1)
              this.stylesList[t].closed || this.stylesList[t].transforms.pop();
          }),
          (CVShapeElement.prototype.closeStyles = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) t[e].closed = !0;
          }),
          (CVShapeElement.prototype.searchShapes = function (t, e, i, r, s) {
            var a,
              l = t.length - 1,
              m,
              d,
              g = [],
              x = [],
              b,
              y,
              u,
              k = [].concat(s);
            for (a = l; a >= 0; a -= 1) {
              if (
                ((b = this.searchProcessedElement(t[a])),
                b ? (e[a] = i[b - 1]) : (t[a]._shouldRender = r),
                t[a].ty === 'fl' ||
                  t[a].ty === 'st' ||
                  t[a].ty === 'gf' ||
                  t[a].ty === 'gs')
              )
                b
                  ? (e[a].style.closed = !1)
                  : (e[a] = this.createStyleElement(t[a], k)),
                  g.push(e[a].style);
              else if (t[a].ty === 'gr') {
                if (!b) e[a] = this.createGroupElement(t[a]);
                else
                  for (d = e[a].it.length, m = 0; m < d; m += 1)
                    e[a].prevViewData[m] = e[a].it[m];
                this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, r, k);
              } else
                t[a].ty === 'tr'
                  ? (b || ((u = this.createTransformElement(t[a])), (e[a] = u)),
                    k.push(e[a]),
                    this.addTransformToStyleList(e[a]))
                  : t[a].ty === 'sh' ||
                    t[a].ty === 'rc' ||
                    t[a].ty === 'el' ||
                    t[a].ty === 'sr'
                  ? b || (e[a] = this.createShapeElement(t[a]))
                  : t[a].ty === 'tm' || t[a].ty === 'rd' || t[a].ty === 'pb'
                  ? (b
                      ? ((y = e[a]), (y.closed = !1))
                      : ((y = ShapeModifiers.getModifier(t[a].ty)),
                        y.init(this, t[a]),
                        (e[a] = y),
                        this.shapeModifiers.push(y)),
                    x.push(y))
                  : t[a].ty === 'rp' &&
                    (b
                      ? ((y = e[a]), (y.closed = !0))
                      : ((y = ShapeModifiers.getModifier(t[a].ty)),
                        (e[a] = y),
                        y.init(this, t, a, e),
                        this.shapeModifiers.push(y),
                        (r = !1)),
                    x.push(y));
              this.addProcessedElement(t[a], a + 1);
            }
            for (
              this.removeTransformFromStyleList(),
                this.closeStyles(g),
                l = x.length,
                a = 0;
              a < l;
              a += 1
            )
              x[a].closed = !0;
          }),
          (CVShapeElement.prototype.renderInnerContent = function () {
            (this.transformHelper.opacity = 1),
              (this.transformHelper._opMdf = !1),
              this.renderModifiers(),
              this.transformsManager.processSequences(this._isFirstFrame),
              this.renderShape(
                this.transformHelper,
                this.shapesData,
                this.itemsData,
                !0,
              );
          }),
          (CVShapeElement.prototype.renderShapeTransform = function (t, e) {
            (t._opMdf || e.op._mdf || this._isFirstFrame) &&
              ((e.opacity = t.opacity), (e.opacity *= e.op.v), (e._opMdf = !0));
          }),
          (CVShapeElement.prototype.drawLayer = function () {
            var t,
              e = this.stylesList.length,
              i,
              r,
              s,
              a,
              l,
              m,
              d = this.globalData.renderer,
              g = this.globalData.canvasContext,
              x,
              b;
            for (t = 0; t < e; t += 1)
              if (
                ((b = this.stylesList[t]),
                (x = b.type),
                !(
                  ((x === 'st' || x === 'gs') && b.wi === 0) ||
                  !b.data._shouldRender ||
                  b.coOp === 0 ||
                  this.globalData.currentGlobalAlpha === 0
                ))
              ) {
                for (
                  d.save(),
                    l = b.elements,
                    x === 'st' || x === 'gs'
                      ? ((g.strokeStyle = x === 'st' ? b.co : b.grd),
                        (g.lineWidth = b.wi),
                        (g.lineCap = b.lc),
                        (g.lineJoin = b.lj),
                        (g.miterLimit = b.ml || 0))
                      : (g.fillStyle = x === 'fl' ? b.co : b.grd),
                    d.ctxOpacity(b.coOp),
                    x !== 'st' && x !== 'gs' && g.beginPath(),
                    d.ctxTransform(b.preTransforms.finalTransform.props),
                    r = l.length,
                    i = 0;
                  i < r;
                  i += 1
                ) {
                  for (
                    (x === 'st' || x === 'gs') &&
                      (g.beginPath(),
                      b.da && (g.setLineDash(b.da), (g.lineDashOffset = b.do))),
                      m = l[i].trNodes,
                      a = m.length,
                      s = 0;
                    s < a;
                    s += 1
                  )
                    m[s].t === 'm'
                      ? g.moveTo(m[s].p[0], m[s].p[1])
                      : m[s].t === 'c'
                      ? g.bezierCurveTo(
                          m[s].pts[0],
                          m[s].pts[1],
                          m[s].pts[2],
                          m[s].pts[3],
                          m[s].pts[4],
                          m[s].pts[5],
                        )
                      : g.closePath();
                  (x === 'st' || x === 'gs') &&
                    (g.stroke(), b.da && g.setLineDash(this.dashResetter));
                }
                x !== 'st' && x !== 'gs' && g.fill(b.r), d.restore();
              }
          }),
          (CVShapeElement.prototype.renderShape = function (t, e, i, r) {
            var s,
              a = e.length - 1,
              l;
            for (l = t, s = a; s >= 0; s -= 1)
              e[s].ty === 'tr'
                ? ((l = i[s].transform), this.renderShapeTransform(t, l))
                : e[s].ty === 'sh' ||
                  e[s].ty === 'el' ||
                  e[s].ty === 'rc' ||
                  e[s].ty === 'sr'
                ? this.renderPath(e[s], i[s])
                : e[s].ty === 'fl'
                ? this.renderFill(e[s], i[s], l)
                : e[s].ty === 'st'
                ? this.renderStroke(e[s], i[s], l)
                : e[s].ty === 'gf' || e[s].ty === 'gs'
                ? this.renderGradientFill(e[s], i[s], l)
                : e[s].ty === 'gr'
                ? this.renderShape(l, e[s].it, i[s].it)
                : e[s].ty;
            r && this.drawLayer();
          }),
          (CVShapeElement.prototype.renderStyledShape = function (t, e) {
            if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
              var i = t.trNodes,
                r = e.paths,
                s,
                a,
                l,
                m = r._length;
              i.length = 0;
              var d = t.transforms.finalTransform;
              for (l = 0; l < m; l += 1) {
                var g = r.shapes[l];
                if (g && g.v) {
                  for (a = g._length, s = 1; s < a; s += 1)
                    s === 1 &&
                      i.push({
                        t: 'm',
                        p: d.applyToPointArray(g.v[0][0], g.v[0][1], 0),
                      }),
                      i.push({
                        t: 'c',
                        pts: d.applyToTriplePoints(g.o[s - 1], g.i[s], g.v[s]),
                      });
                  a === 1 &&
                    i.push({
                      t: 'm',
                      p: d.applyToPointArray(g.v[0][0], g.v[0][1], 0),
                    }),
                    g.c &&
                      a &&
                      (i.push({
                        t: 'c',
                        pts: d.applyToTriplePoints(g.o[s - 1], g.i[0], g.v[0]),
                      }),
                      i.push({ t: 'z' }));
                }
              }
              t.trNodes = i;
            }
          }),
          (CVShapeElement.prototype.renderPath = function (t, e) {
            if (t.hd !== !0 && t._shouldRender) {
              var i,
                r = e.styledShapes.length;
              for (i = 0; i < r; i += 1)
                this.renderStyledShape(e.styledShapes[i], e.sh);
            }
          }),
          (CVShapeElement.prototype.renderFill = function (t, e, i) {
            var r = e.style;
            (e.c._mdf || this._isFirstFrame) &&
              (r.co =
                'rgb(' +
                bmFloor(e.c.v[0]) +
                ',' +
                bmFloor(e.c.v[1]) +
                ',' +
                bmFloor(e.c.v[2]) +
                ')'),
              (e.o._mdf || i._opMdf || this._isFirstFrame) &&
                (r.coOp = e.o.v * i.opacity);
          }),
          (CVShapeElement.prototype.renderGradientFill = function (t, e, i) {
            var r = e.style,
              s;
            if (
              !r.grd ||
              e.g._mdf ||
              e.s._mdf ||
              e.e._mdf ||
              (t.t !== 1 && (e.h._mdf || e.a._mdf))
            ) {
              var a = this.globalData.canvasContext,
                l = e.s.v,
                m = e.e.v;
              if (t.t === 1) s = a.createLinearGradient(l[0], l[1], m[0], m[1]);
              else {
                var d = Math.sqrt(
                    Math.pow(l[0] - m[0], 2) + Math.pow(l[1] - m[1], 2),
                  ),
                  g = Math.atan2(m[1] - l[1], m[0] - l[0]),
                  x = e.h.v;
                x >= 1 ? (x = 0.99) : x <= -1 && (x = -0.99);
                var b = d * x,
                  y = Math.cos(g + e.a.v) * b + l[0],
                  u = Math.sin(g + e.a.v) * b + l[1];
                s = a.createRadialGradient(y, u, 0, l[0], l[1], d);
              }
              var k,
                f = t.g.p,
                h = e.g.c,
                p = 1;
              for (k = 0; k < f; k += 1)
                e.g._hasOpacity && e.g._collapsable && (p = e.g.o[k * 2 + 1]),
                  s.addColorStop(
                    h[k * 4] / 100,
                    'rgba(' +
                      h[k * 4 + 1] +
                      ',' +
                      h[k * 4 + 2] +
                      ',' +
                      h[k * 4 + 3] +
                      ',' +
                      p +
                      ')',
                  );
              r.grd = s;
            }
            r.coOp = e.o.v * i.opacity;
          }),
          (CVShapeElement.prototype.renderStroke = function (t, e, i) {
            var r = e.style,
              s = e.d;
            s &&
              (s._mdf || this._isFirstFrame) &&
              ((r.da = s.dashArray), (r.do = s.dashoffset[0])),
              (e.c._mdf || this._isFirstFrame) &&
                (r.co =
                  'rgb(' +
                  bmFloor(e.c.v[0]) +
                  ',' +
                  bmFloor(e.c.v[1]) +
                  ',' +
                  bmFloor(e.c.v[2]) +
                  ')'),
              (e.o._mdf || i._opMdf || this._isFirstFrame) &&
                (r.coOp = e.o.v * i.opacity),
              (e.w._mdf || this._isFirstFrame) && (r.wi = e.w.v);
          }),
          (CVShapeElement.prototype.destroy = function () {
            (this.shapesData = null),
              (this.globalData = null),
              (this.canvasContext = null),
              (this.stylesList.length = 0),
              (this.itemsData.length = 0);
          });

        function CVSolidElement(t, e, i) {
          this.initElement(t, e, i);
        }

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            CVBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
          ],
          CVSolidElement,
        ),
          (CVSolidElement.prototype.initElement =
            SVGShapeElement.prototype.initElement),
          (CVSolidElement.prototype.prepareFrame =
            IImageElement.prototype.prepareFrame),
          (CVSolidElement.prototype.renderInnerContent = function () {
            var t = this.canvasContext;
            (t.fillStyle = this.data.sc),
              t.fillRect(0, 0, this.data.sw, this.data.sh);
          });

        function CVTextElement(t, e, i) {
          (this.textSpans = []),
            (this.yOffset = 0),
            (this.fillColorAnim = !1),
            (this.strokeColorAnim = !1),
            (this.strokeWidthAnim = !1),
            (this.stroke = !1),
            (this.fill = !1),
            (this.justifyOffset = 0),
            (this.currentRender = null),
            (this.renderType = 'canvas'),
            (this.values = {
              fill: 'rgba(0,0,0,0)',
              stroke: 'rgba(0,0,0,0)',
              sWidth: 0,
              fValue: '',
            }),
            this.initElement(t, e, i);
        }

        extendPrototype(
          [
            BaseElement,
            TransformElement,
            CVBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableElement,
            ITextElement,
          ],
          CVTextElement,
        ),
          (CVTextElement.prototype.tHelper =
            createTag('canvas').getContext('2d')),
          (CVTextElement.prototype.buildNewText = function () {
            var t = this.textProperty.currentData;
            this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
            var e = !1;
            t.fc
              ? ((e = !0), (this.values.fill = this.buildColor(t.fc)))
              : (this.values.fill = 'rgba(0,0,0,0)'),
              (this.fill = e);
            var i = !1;
            t.sc &&
              ((i = !0),
              (this.values.stroke = this.buildColor(t.sc)),
              (this.values.sWidth = t.sw));
            var r = this.globalData.fontManager.getFontByName(t.f),
              s,
              a,
              l = t.l,
              m = this.mHelper;
            (this.stroke = i),
              (this.values.fValue =
                t.finalSize +
                'px ' +
                this.globalData.fontManager.getFontByName(t.f).fFamily),
              (a = t.finalText.length);
            var d,
              g,
              x,
              b,
              y,
              u,
              k,
              f,
              h,
              p,
              n = this.data.singleShape,
              o = t.tr * 0.001 * t.finalSize,
              c = 0,
              v = 0,
              w = !0,
              P = 0;
            for (s = 0; s < a; s += 1) {
              for (
                d = this.globalData.fontManager.getCharData(
                  t.finalText[s],
                  r.fStyle,
                  this.globalData.fontManager.getFontByName(t.f).fFamily,
                ),
                  g = (d && d.data) || {},
                  m.reset(),
                  n &&
                    l[s].n &&
                    ((c = -o), (v += t.yOffset), (v += w ? 1 : 0), (w = !1)),
                  y = g.shapes ? g.shapes[0].it : [],
                  k = y.length,
                  m.scale(t.finalSize / 100, t.finalSize / 100),
                  n && this.applyTextPropertiesToMatrix(t, m, l[s].line, c, v),
                  h = createSizedArray(k),
                  u = 0;
                u < k;
                u += 1
              ) {
                for (
                  b = y[u].ks.k.i.length, f = y[u].ks.k, p = [], x = 1;
                  x < b;
                  x += 1
                )
                  x === 1 &&
                    p.push(
                      m.applyToX(f.v[0][0], f.v[0][1], 0),
                      m.applyToY(f.v[0][0], f.v[0][1], 0),
                    ),
                    p.push(
                      m.applyToX(f.o[x - 1][0], f.o[x - 1][1], 0),
                      m.applyToY(f.o[x - 1][0], f.o[x - 1][1], 0),
                      m.applyToX(f.i[x][0], f.i[x][1], 0),
                      m.applyToY(f.i[x][0], f.i[x][1], 0),
                      m.applyToX(f.v[x][0], f.v[x][1], 0),
                      m.applyToY(f.v[x][0], f.v[x][1], 0),
                    );
                p.push(
                  m.applyToX(f.o[x - 1][0], f.o[x - 1][1], 0),
                  m.applyToY(f.o[x - 1][0], f.o[x - 1][1], 0),
                  m.applyToX(f.i[0][0], f.i[0][1], 0),
                  m.applyToY(f.i[0][0], f.i[0][1], 0),
                  m.applyToX(f.v[0][0], f.v[0][1], 0),
                  m.applyToY(f.v[0][0], f.v[0][1], 0),
                ),
                  (h[u] = p);
              }
              n && ((c += l[s].l), (c += o)),
                this.textSpans[P]
                  ? (this.textSpans[P].elem = h)
                  : (this.textSpans[P] = { elem: h }),
                (P += 1);
            }
          }),
          (CVTextElement.prototype.renderInnerContent = function () {
            var t = this.canvasContext;
            (t.font = this.values.fValue),
              (t.lineCap = 'butt'),
              (t.lineJoin = 'miter'),
              (t.miterLimit = 4),
              this.data.singleShape ||
                this.textAnimator.getMeasures(
                  this.textProperty.currentData,
                  this.lettersChangedFlag,
                );
            var e,
              i,
              r,
              s,
              a,
              l,
              m = this.textAnimator.renderedLetters,
              d = this.textProperty.currentData.l;
            i = d.length;
            var g,
              x = null,
              b = null,
              y = null,
              u,
              k;
            for (e = 0; e < i; e += 1)
              if (!d[e].n) {
                if (
                  ((g = m[e]),
                  g &&
                    (this.globalData.renderer.save(),
                    this.globalData.renderer.ctxTransform(g.p),
                    this.globalData.renderer.ctxOpacity(g.o)),
                  this.fill)
                ) {
                  for (
                    g && g.fc
                      ? x !== g.fc && ((x = g.fc), (t.fillStyle = g.fc))
                      : x !== this.values.fill &&
                        ((x = this.values.fill),
                        (t.fillStyle = this.values.fill)),
                      u = this.textSpans[e].elem,
                      s = u.length,
                      this.globalData.canvasContext.beginPath(),
                      r = 0;
                    r < s;
                    r += 1
                  )
                    for (
                      k = u[r],
                        l = k.length,
                        this.globalData.canvasContext.moveTo(k[0], k[1]),
                        a = 2;
                      a < l;
                      a += 6
                    )
                      this.globalData.canvasContext.bezierCurveTo(
                        k[a],
                        k[a + 1],
                        k[a + 2],
                        k[a + 3],
                        k[a + 4],
                        k[a + 5],
                      );
                  this.globalData.canvasContext.closePath(),
                    this.globalData.canvasContext.fill();
                }
                if (this.stroke) {
                  for (
                    g && g.sw
                      ? y !== g.sw && ((y = g.sw), (t.lineWidth = g.sw))
                      : y !== this.values.sWidth &&
                        ((y = this.values.sWidth),
                        (t.lineWidth = this.values.sWidth)),
                      g && g.sc
                        ? b !== g.sc && ((b = g.sc), (t.strokeStyle = g.sc))
                        : b !== this.values.stroke &&
                          ((b = this.values.stroke),
                          (t.strokeStyle = this.values.stroke)),
                      u = this.textSpans[e].elem,
                      s = u.length,
                      this.globalData.canvasContext.beginPath(),
                      r = 0;
                    r < s;
                    r += 1
                  )
                    for (
                      k = u[r],
                        l = k.length,
                        this.globalData.canvasContext.moveTo(k[0], k[1]),
                        a = 2;
                      a < l;
                      a += 6
                    )
                      this.globalData.canvasContext.bezierCurveTo(
                        k[a],
                        k[a + 1],
                        k[a + 2],
                        k[a + 3],
                        k[a + 4],
                        k[a + 5],
                      );
                  this.globalData.canvasContext.closePath(),
                    this.globalData.canvasContext.stroke();
                }
                g && this.globalData.renderer.restore();
              }
          });

        function CVEffects() {}

        CVEffects.prototype.renderFrame = function () {};
        var animationManager = (function () {
            var t = {},
              e = [],
              i = 0,
              r = 0,
              s = 0,
              a = !0,
              l = !1;

            function m(S) {
              for (var _ = 0, A = S.target; _ < r; )
                e[_].animation === A &&
                  (e.splice(_, 1), (_ -= 1), (r -= 1), A.isPaused || b()),
                  (_ += 1);
            }

            function d(S, _) {
              if (!S) return null;
              for (var A = 0; A < r; ) {
                if (e[A].elem === S && e[A].elem !== null)
                  return e[A].animation;
                A += 1;
              }
              var L = new AnimationItem();
              return y(L, S), L.setData(S, _), L;
            }

            function g() {
              var S,
                _ = e.length,
                A = [];
              for (S = 0; S < _; S += 1) A.push(e[S].animation);
              return A;
            }

            function x() {
              (s += 1), V();
            }

            function b() {
              s -= 1;
            }

            function y(S, _) {
              S.addEventListener('destroy', m),
                S.addEventListener('_active', x),
                S.addEventListener('_idle', b),
                e.push({
                  elem: _,
                  animation: S,
                }),
                (r += 1);
            }

            function u(S) {
              var _ = new AnimationItem();
              return y(_, null), _.setParams(S), _;
            }

            function k(S, _) {
              var A;
              for (A = 0; A < r; A += 1) e[A].animation.setSpeed(S, _);
            }

            function f(S, _) {
              var A;
              for (A = 0; A < r; A += 1) e[A].animation.setDirection(S, _);
            }

            function h(S) {
              var _;
              for (_ = 0; _ < r; _ += 1) e[_].animation.play(S);
            }

            let p = !1;

            function n(S, _) {
              var A = _ - i,
                L;
              for (L = 0; L < r; L += 1) e[L].animation.advanceTime(A);
              (i = _), s && !l ? p && mt.remove(p) : (a = !0);
            }

            function o(S) {
              (i = S), p && mt.remove(p), (p = mt.add({ update: n }));
            }

            function c(S) {
              var _;
              for (_ = 0; _ < r; _ += 1) e[_].animation.pause(S);
            }

            function v(S, _, A) {
              var L;
              for (L = 0; L < r; L += 1) e[L].animation.goToAndStop(S, _, A);
            }

            function w(S) {
              var _;
              for (_ = 0; _ < r; _ += 1) e[_].animation.stop(S);
            }

            function P(S) {
              var _;
              for (_ = 0; _ < r; _ += 1) e[_].animation.togglePause(S);
            }

            function E(S) {
              var _;
              for (_ = r - 1; _ >= 0; _ -= 1) e[_].animation.destroy(S);
            }

            function C(S, _, A) {
              var L = [].concat(
                  [].slice.call(document.getElementsByClassName('lottie')),
                  [].slice.call(document.getElementsByClassName('bodymovin')),
                ),
                T,
                q = L.length;
              for (T = 0; T < q; T += 1)
                A && L[T].setAttribute('data-bm-type', A), d(L[T], S);
              if (_ && q === 0) {
                A || (A = 'svg');
                var j = document.getElementsByTagName('body')[0];
                j.innerText = '';
                var N = createTag('div');
                (N.style.width = '100%'),
                  (N.style.height = '100%'),
                  N.setAttribute('data-bm-type', A),
                  j.appendChild(N),
                  d(N, S);
              }
            }

            function F() {
              var S;
              for (S = 0; S < r; S += 1) e[S].animation.resize();
            }

            function V() {
              !l && s && a && (window.requestAnimationFrame(o), (a = !1));
            }

            function M() {
              l = !0;
            }

            function D() {
              (l = !1), V();
            }

            function R(S, _) {
              var A;
              for (A = 0; A < r; A += 1) e[A].animation.setVolume(S, _);
            }

            function $(S) {
              var _;
              for (_ = 0; _ < r; _ += 1) e[_].animation.mute(S);
            }

            function I(S) {
              var _;
              for (_ = 0; _ < r; _ += 1) e[_].animation.unmute(S);
            }

            return (
              (t.registerAnimation = d),
              (t.loadAnimation = u),
              (t.setSpeed = k),
              (t.setDirection = f),
              (t.play = h),
              (t.pause = c),
              (t.stop = w),
              (t.togglePause = P),
              (t.searchAnimations = C),
              (t.resize = F),
              (t.goToAndStop = v),
              (t.destroy = E),
              (t.freeze = M),
              (t.unfreeze = D),
              (t.setVolume = R),
              (t.mute = $),
              (t.unmute = I),
              (t.getRegisteredAnimations = g),
              t
            );
          })(),
          AnimationItem = function () {
            (this._cbs = []),
              (this.name = ''),
              (this.path = ''),
              (this.isLoaded = !1),
              (this.currentFrame = 0),
              (this.currentRawFrame = 0),
              (this.firstFrame = 0),
              (this.totalFrames = 0),
              (this.frameRate = 0),
              (this.frameMult = 0),
              (this.playSpeed = 1),
              (this.playDirection = 1),
              (this.playCount = 0),
              (this.animationData = {}),
              (this.assets = []),
              (this.isPaused = !0),
              (this.autoplay = !1),
              (this.loop = !0),
              (this.renderer = null),
              (this.animationID = createElementID()),
              (this.assetsPath = ''),
              (this.timeCompleted = 0),
              (this.segmentPos = 0),
              (this.isSubframeEnabled = subframeEnabled),
              (this.segments = []),
              (this._idle = !0),
              (this._completedLoop = !1),
              (this.projectInterface = ProjectInterface()),
              (this.imagePreloader = new ImagePreloader()),
              (this.audioController = audioControllerFactory()),
              (this.markers = []);
          };
        extendPrototype([BaseEvent], AnimationItem),
          (AnimationItem.prototype.setParams = function (t) {
            (t.wrapper || t.container) &&
              (this.wrapper = t.wrapper || t.container);
            var e = 'svg';
            switch (
              (t.animType ? (e = t.animType) : t.renderer && (e = t.renderer),
              e)
            ) {
              case 'canvas':
                this.renderer = new CanvasRenderer(this, t.rendererSettings);
                break;
              case 'svg':
                this.renderer = new SVGRenderer(this, t.rendererSettings);
                break;
              default:
                this.renderer = new HybridRenderer(this, t.rendererSettings);
                break;
            }
            this.imagePreloader.setCacheType(e, this.renderer.globalData.defs),
              this.renderer.setProjectInterface(this.projectInterface),
              (this.animType = e),
              t.loop === '' ||
              t.loop === null ||
              t.loop === void 0 ||
              t.loop === !0
                ? (this.loop = !0)
                : t.loop === !1
                ? (this.loop = !1)
                : (this.loop = parseInt(t.loop, 10)),
              (this.autoplay = 'autoplay' in t ? t.autoplay : !0),
              (this.name = t.name ? t.name : ''),
              (this.autoloadSegments = Object.prototype.hasOwnProperty.call(
                t,
                'autoloadSegments',
              )
                ? t.autoloadSegments
                : !0),
              (this.assetsPath = t.assetsPath),
              (this.initialSegment = t.initialSegment),
              t.audioFactory &&
                this.audioController.setAudioFactory(t.audioFactory),
              t.animationData
                ? this.configAnimation(t.animationData)
                : t.path &&
                  (t.path.lastIndexOf('\\') !== -1
                    ? (this.path = t.path.substr(
                        0,
                        t.path.lastIndexOf('\\') + 1,
                      ))
                    : (this.path = t.path.substr(
                        0,
                        t.path.lastIndexOf('/') + 1,
                      )),
                  (this.fileName = t.path.substr(t.path.lastIndexOf('/') + 1)),
                  (this.fileName = this.fileName.substr(
                    0,
                    this.fileName.lastIndexOf('.json'),
                  )),
                  assetLoader.load(
                    t.path,
                    this.configAnimation.bind(this),
                    function () {
                      this.trigger('data_failed');
                    }.bind(this),
                  ));
          }),
          (AnimationItem.prototype.setData = function (t, e) {
            e && typeof e != 'object' && (e = JSON.parse(e));
            var i = { wrapper: t, animationData: e },
              r = t.attributes;
            (i.path = r.getNamedItem('data-animation-path')
              ? r.getNamedItem('data-animation-path').value
              : r.getNamedItem('data-bm-path')
              ? r.getNamedItem('data-bm-path').value
              : r.getNamedItem('bm-path')
              ? r.getNamedItem('bm-path').value
              : ''),
              (i.animType = r.getNamedItem('data-anim-type')
                ? r.getNamedItem('data-anim-type').value
                : r.getNamedItem('data-bm-type')
                ? r.getNamedItem('data-bm-type').value
                : r.getNamedItem('bm-type')
                ? r.getNamedItem('bm-type').value
                : r.getNamedItem('data-bm-renderer')
                ? r.getNamedItem('data-bm-renderer').value
                : r.getNamedItem('bm-renderer')
                ? r.getNamedItem('bm-renderer').value
                : 'canvas');
            var s = r.getNamedItem('data-anim-loop')
              ? r.getNamedItem('data-anim-loop').value
              : r.getNamedItem('data-bm-loop')
              ? r.getNamedItem('data-bm-loop').value
              : r.getNamedItem('bm-loop')
              ? r.getNamedItem('bm-loop').value
              : '';
            s === 'false'
              ? (i.loop = !1)
              : s === 'true'
              ? (i.loop = !0)
              : s !== '' && (i.loop = parseInt(s, 10));
            var a = r.getNamedItem('data-anim-autoplay')
              ? r.getNamedItem('data-anim-autoplay').value
              : r.getNamedItem('data-bm-autoplay')
              ? r.getNamedItem('data-bm-autoplay').value
              : r.getNamedItem('bm-autoplay')
              ? r.getNamedItem('bm-autoplay').value
              : !0;
            (i.autoplay = a !== 'false'),
              (i.name = r.getNamedItem('data-name')
                ? r.getNamedItem('data-name').value
                : r.getNamedItem('data-bm-name')
                ? r.getNamedItem('data-bm-name').value
                : r.getNamedItem('bm-name')
                ? r.getNamedItem('bm-name').value
                : '');
            var l = r.getNamedItem('data-anim-prerender')
              ? r.getNamedItem('data-anim-prerender').value
              : r.getNamedItem('data-bm-prerender')
              ? r.getNamedItem('data-bm-prerender').value
              : r.getNamedItem('bm-prerender')
              ? r.getNamedItem('bm-prerender').value
              : '';
            l === 'false' && (i.prerender = !1), this.setParams(i);
          }),
          (AnimationItem.prototype.includeLayers = function (t) {
            t.op > this.animationData.op &&
              ((this.animationData.op = t.op),
              (this.totalFrames = Math.floor(t.op - this.animationData.ip)));
            var e = this.animationData.layers,
              i,
              r = e.length,
              s = t.layers,
              a,
              l = s.length;
            for (a = 0; a < l; a += 1)
              for (i = 0; i < r; ) {
                if (e[i].id === s[a].id) {
                  e[i] = s[a];
                  break;
                }
                i += 1;
              }
            if (
              ((t.chars || t.fonts) &&
                (this.renderer.globalData.fontManager.addChars(t.chars),
                this.renderer.globalData.fontManager.addFonts(
                  t.fonts,
                  this.renderer.globalData.defs,
                )),
              t.assets)
            )
              for (r = t.assets.length, i = 0; i < r; i += 1)
                this.animationData.assets.push(t.assets[i]);
            (this.animationData.__complete = !1),
              dataManager.completeData(
                this.animationData,
                this.renderer.globalData.fontManager,
              ),
              this.renderer.includeLayers(t.layers),
              expressionsPlugin && expressionsPlugin.initExpressions(this),
              this.loadNextSegment();
          }),
          (AnimationItem.prototype.loadNextSegment = function () {
            var t = this.animationData.segments;
            if (!t || t.length === 0 || !this.autoloadSegments) {
              this.trigger('data_ready'),
                (this.timeCompleted = this.totalFrames);
              return;
            }
            var e = t.shift();
            this.timeCompleted = e.time * this.frameRate;
            var i = this.path + this.fileName + '_' + this.segmentPos + '.json';
            (this.segmentPos += 1),
              assetLoader.load(
                i,
                this.includeLayers.bind(this),
                function () {
                  this.trigger('data_failed');
                }.bind(this),
              );
          }),
          (AnimationItem.prototype.loadSegments = function () {
            var t = this.animationData.segments;
            t || (this.timeCompleted = this.totalFrames),
              this.loadNextSegment();
          }),
          (AnimationItem.prototype.imagesLoaded = function () {
            this.trigger('loaded_images'),
              this.checkLoaded(),
              (this.imgLoadedFlag = !0);
          }),
          (AnimationItem.prototype.preloadImages = function () {
            this.imgLoadedFlag ||
              (this.imagePreloader.setAssetsPath(this.assetsPath),
              this.imagePreloader.setPath(this.path),
              (this.imgLoadedFlag = !1),
              this.imagePreloader.loadAssets(
                this.animationData.assets,
                this.imagesLoaded.bind(this),
              ));
          }),
          (AnimationItem.prototype.configAnimation = function (t) {
            if (!!this.renderer)
              try {
                (this.animationData = t),
                  this.initialSegment
                    ? ((this.totalFrames = Math.floor(
                        this.initialSegment[1] - this.initialSegment[0],
                      )),
                      (this.firstFrame = Math.round(this.initialSegment[0])))
                    : ((this.totalFrames = Math.floor(
                        this.animationData.op - this.animationData.ip,
                      )),
                      (this.firstFrame = Math.round(this.animationData.ip))),
                  this.renderer.configAnimation(t),
                  t.assets || (t.assets = []),
                  (this.assets = this.animationData.assets),
                  (this.frameRate = this.animationData.fr),
                  (this.frameMult = this.animationData.fr / 1e3),
                  this.renderer.searchExtraCompositions(t.assets),
                  (this.markers = markerParser(t.markers || [])),
                  this.trigger('config_ready'),
                  this.preloadImages(),
                  this.loadSegments(),
                  this.updaFrameModifier(),
                  this.waitForFontsLoaded(),
                  this.isPaused && this.audioController.pause();
              } catch (e) {
                this.triggerConfigError(e);
              }
          }),
          (AnimationItem.prototype.waitForFontsLoaded = function () {
            !this.renderer ||
              (this.renderer.globalData.fontManager.isLoaded
                ? this.checkLoaded()
                : setTimeout(this.waitForFontsLoaded.bind(this), 20));
          }),
          (AnimationItem.prototype.checkLoaded = function () {
            !this.isLoaded &&
              this.renderer.globalData.fontManager.isLoaded &&
              (this.imagePreloader.loadedImages() ||
                this.renderer.rendererType !== 'canvas') &&
              this.imagePreloader.loadedFootages() &&
              ((this.isLoaded = !0),
              dataManager.completeData(
                this.animationData,
                this.renderer.globalData.fontManager,
              ),
              expressionsPlugin && expressionsPlugin.initExpressions(this),
              this.renderer.initItems(),
              setTimeout(
                function () {
                  this.trigger('DOMLoaded');
                }.bind(this),
                0,
              ),
              this.gotoFrame(),
              this.autoplay && this.play());
          }),
          (AnimationItem.prototype.resize = function () {
            this.renderer.updateContainerSize();
          }),
          (AnimationItem.prototype.setSubframe = function (t) {
            this.isSubframeEnabled = !!t;
          }),
          (AnimationItem.prototype.gotoFrame = function () {
            (this.currentFrame = this.isSubframeEnabled
              ? this.currentRawFrame
              : ~~this.currentRawFrame),
              this.timeCompleted !== this.totalFrames &&
                this.currentFrame > this.timeCompleted &&
                (this.currentFrame = this.timeCompleted),
              this.trigger('enterFrame'),
              this.renderFrame();
          }),
          (AnimationItem.prototype.renderFrame = function () {
            if (!(this.isLoaded === !1 || !this.renderer))
              try {
                this.renderer.renderFrame(this.currentFrame + this.firstFrame);
              } catch (t) {
                console.warn(t), this.triggerRenderFrameError(t);
              }
          }),
          (AnimationItem.prototype.play = function (t) {
            (t && this.name !== t) ||
              (this.isPaused === !0 &&
                ((this.isPaused = !1),
                this.audioController.resume(),
                this._idle && ((this._idle = !1), this.trigger('_active'))));
          }),
          (AnimationItem.prototype.pause = function (t) {
            (t && this.name !== t) ||
              (this.isPaused === !1 &&
                ((this.isPaused = !0),
                (this._idle = !0),
                this.trigger('_idle'),
                this.audioController.pause()));
          }),
          (AnimationItem.prototype.togglePause = function (t) {
            (t && this.name !== t) ||
              (this.isPaused === !0 ? this.play() : this.pause());
          }),
          (AnimationItem.prototype.stop = function (t) {
            (t && this.name !== t) ||
              (this.pause(),
              (this.playCount = 0),
              (this._completedLoop = !1),
              this.setCurrentRawFrameValue(0));
          }),
          (AnimationItem.prototype.getMarkerData = function (t) {
            for (var e, i = 0; i < this.markers.length; i += 1)
              if (((e = this.markers[i]), e.payload && e.payload.name === t))
                return e;
            return null;
          }),
          (AnimationItem.prototype.goToAndStop = function (t, e, i) {
            if (!(i && this.name !== i)) {
              var r = Number(t);
              if (isNaN(r)) {
                var s = this.getMarkerData(t);
                s && this.goToAndStop(s.time, !0);
              } else
                e
                  ? this.setCurrentRawFrameValue(t)
                  : this.setCurrentRawFrameValue(t * this.frameModifier);
              this.pause();
            }
          }),
          (AnimationItem.prototype.goToAndPlay = function (t, e, i) {
            if (!(i && this.name !== i)) {
              var r = Number(t);
              if (isNaN(r)) {
                var s = this.getMarkerData(t);
                s &&
                  (s.duration
                    ? this.playSegments([s.time, s.time + s.duration], !0)
                    : this.goToAndStop(s.time, !0));
              } else this.goToAndStop(r, e, i);
              this.play();
            }
          }),
          (AnimationItem.prototype.advanceTime = function (t) {
            if (!(this.isPaused === !0 || this.isLoaded === !1)) {
              var e = this.currentRawFrame + t * this.frameModifier,
                i = !1;
              e >= this.totalFrames - 1 && this.frameModifier > 0
                ? !this.loop || this.playCount === this.loop
                  ? this.checkSegments(
                      e > this.totalFrames ? e % this.totalFrames : 0,
                    ) || ((i = !0), (e = this.totalFrames - 1))
                  : e >= this.totalFrames
                  ? ((this.playCount += 1),
                    this.checkSegments(e % this.totalFrames) ||
                      (this.setCurrentRawFrameValue(e % this.totalFrames),
                      (this._completedLoop = !0),
                      this.trigger('loopComplete')))
                  : this.setCurrentRawFrameValue(e)
                : e < 0
                ? this.checkSegments(e % this.totalFrames) ||
                  (this.loop && !(this.playCount-- <= 0 && this.loop !== !0)
                    ? (this.setCurrentRawFrameValue(
                        this.totalFrames + (e % this.totalFrames),
                      ),
                      this._completedLoop
                        ? this.trigger('loopComplete')
                        : (this._completedLoop = !0))
                    : ((i = !0), (e = 0)))
                : this.setCurrentRawFrameValue(e),
                i &&
                  (this.setCurrentRawFrameValue(e),
                  this.pause(),
                  this.trigger('complete'));
            }
          }),
          (AnimationItem.prototype.adjustSegment = function (t, e) {
            (this.playCount = 0),
              t[1] < t[0]
                ? (this.frameModifier > 0 &&
                    (this.playSpeed < 0
                      ? this.setSpeed(-this.playSpeed)
                      : this.setDirection(-1)),
                  (this.totalFrames = t[0] - t[1]),
                  (this.timeCompleted = this.totalFrames),
                  (this.firstFrame = t[1]),
                  this.setCurrentRawFrameValue(this.totalFrames - 0.001 - e))
                : t[1] > t[0] &&
                  (this.frameModifier < 0 &&
                    (this.playSpeed < 0
                      ? this.setSpeed(-this.playSpeed)
                      : this.setDirection(1)),
                  (this.totalFrames = t[1] - t[0]),
                  (this.timeCompleted = this.totalFrames),
                  (this.firstFrame = t[0]),
                  this.setCurrentRawFrameValue(0.001 + e)),
              this.trigger('segmentStart');
          }),
          (AnimationItem.prototype.setSegment = function (t, e) {
            var i = -1;
            this.isPaused &&
              (this.currentRawFrame + this.firstFrame < t
                ? (i = t)
                : this.currentRawFrame + this.firstFrame > e && (i = e - t)),
              (this.firstFrame = t),
              (this.totalFrames = e - t),
              (this.timeCompleted = this.totalFrames),
              i !== -1 && this.goToAndStop(i, !0);
          }),
          (AnimationItem.prototype.playSegments = function (t, e) {
            if ((e && (this.segments.length = 0), typeof t[0] == 'object')) {
              var i,
                r = t.length;
              for (i = 0; i < r; i += 1) this.segments.push(t[i]);
            } else this.segments.push(t);
            this.segments.length &&
              e &&
              this.adjustSegment(this.segments.shift(), 0),
              this.isPaused && this.play();
          }),
          (AnimationItem.prototype.resetSegments = function (t) {
            (this.segments.length = 0),
              this.segments.push([
                this.animationData.ip,
                this.animationData.op,
              ]),
              t && this.checkSegments(0);
          }),
          (AnimationItem.prototype.checkSegments = function (t) {
            return this.segments.length
              ? (this.adjustSegment(this.segments.shift(), t), !0)
              : !1;
          }),
          (AnimationItem.prototype.destroy = function (t) {
            (t && this.name !== t) ||
              !this.renderer ||
              (this.renderer.destroy(),
              this.imagePreloader.destroy(),
              this.trigger('destroy'),
              (this._cbs = null),
              (this.onEnterFrame = null),
              (this.onLoopComplete = null),
              (this.onComplete = null),
              (this.onSegmentStart = null),
              (this.onDestroy = null),
              (this.renderer = null),
              (this.renderer = null),
              (this.imagePreloader = null),
              (this.projectInterface = null));
          }),
          (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
            (this.currentRawFrame = t), this.gotoFrame();
          }),
          (AnimationItem.prototype.setSpeed = function (t) {
            (this.playSpeed = t), this.updaFrameModifier();
          }),
          (AnimationItem.prototype.setDirection = function (t) {
            (this.playDirection = t < 0 ? -1 : 1), this.updaFrameModifier();
          }),
          (AnimationItem.prototype.setVolume = function (t, e) {
            (e && this.name !== e) || this.audioController.setVolume(t);
          }),
          (AnimationItem.prototype.getVolume = function () {
            return this.audioController.getVolume();
          }),
          (AnimationItem.prototype.mute = function (t) {
            (t && this.name !== t) || this.audioController.mute();
          }),
          (AnimationItem.prototype.unmute = function (t) {
            (t && this.name !== t) || this.audioController.unmute();
          }),
          (AnimationItem.prototype.updaFrameModifier = function () {
            (this.frameModifier =
              this.frameMult * this.playSpeed * this.playDirection),
              this.audioController.setRate(this.playSpeed * this.playDirection);
          }),
          (AnimationItem.prototype.getPath = function () {
            return this.path;
          }),
          (AnimationItem.prototype.getAssetsPath = function (t) {
            var e = '';
            if (t.e) e = t.p;
            else if (this.assetsPath) {
              var i = t.p;
              i.indexOf('images/') !== -1 && (i = i.split('/')[1]),
                (e = this.assetsPath + i);
            } else (e = this.path), (e += t.u ? t.u : ''), (e += t.p);
            return e;
          }),
          (AnimationItem.prototype.getAssetData = function (t) {
            for (var e = 0, i = this.assets.length; e < i; ) {
              if (t === this.assets[e].id) return this.assets[e];
              e += 1;
            }
            return null;
          }),
          (AnimationItem.prototype.hide = function () {
            this.renderer.hide();
          }),
          (AnimationItem.prototype.show = function () {
            this.renderer.show();
          }),
          (AnimationItem.prototype.getDuration = function (t) {
            return t ? this.totalFrames : this.totalFrames / this.frameRate;
          }),
          (AnimationItem.prototype.trigger = function (t) {
            if (this._cbs && this._cbs[t])
              switch (t) {
                case 'enterFrame':
                  this.triggerEvent(
                    t,
                    new BMEnterFrameEvent(
                      t,
                      this.currentFrame,
                      this.totalFrames,
                      this.frameModifier,
                    ),
                  );
                  break;
                case 'loopComplete':
                  this.triggerEvent(
                    t,
                    new BMCompleteLoopEvent(
                      t,
                      this.loop,
                      this.playCount,
                      this.frameMult,
                    ),
                  );
                  break;
                case 'complete':
                  this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                  break;
                case 'segmentStart':
                  this.triggerEvent(
                    t,
                    new BMSegmentStartEvent(
                      t,
                      this.firstFrame,
                      this.totalFrames,
                    ),
                  );
                  break;
                case 'destroy':
                  this.triggerEvent(t, new BMDestroyEvent(t, this));
                  break;
                default:
                  this.triggerEvent(t);
              }
            t === 'enterFrame' &&
              this.onEnterFrame &&
              this.onEnterFrame.call(
                this,
                new BMEnterFrameEvent(
                  t,
                  this.currentFrame,
                  this.totalFrames,
                  this.frameMult,
                ),
              ),
              t === 'loopComplete' &&
                this.onLoopComplete &&
                this.onLoopComplete.call(
                  this,
                  new BMCompleteLoopEvent(
                    t,
                    this.loop,
                    this.playCount,
                    this.frameMult,
                  ),
                ),
              t === 'complete' &&
                this.onComplete &&
                this.onComplete.call(
                  this,
                  new BMCompleteEvent(t, this.frameMult),
                ),
              t === 'segmentStart' &&
                this.onSegmentStart &&
                this.onSegmentStart.call(
                  this,
                  new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames),
                ),
              t === 'destroy' &&
                this.onDestroy &&
                this.onDestroy.call(this, new BMDestroyEvent(t, this));
          }),
          (AnimationItem.prototype.triggerRenderFrameError = function (t) {
            var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
            this.triggerEvent('error', e),
              this.onError && this.onError.call(this, e);
          }),
          (AnimationItem.prototype.triggerConfigError = function (t) {
            var e = new BMConfigErrorEvent(t, this.currentFrame);
            this.triggerEvent('error', e),
              this.onError && this.onError.call(this, e);
          });
        var Expressions = (function () {
          var t = {};
          t.initExpressions = e;

          function e(i) {
            var r = 0,
              s = [];

            function a() {
              r += 1;
            }

            function l() {
              (r -= 1), r === 0 && d();
            }

            function m(g) {
              s.indexOf(g) === -1 && s.push(g);
            }

            function d() {
              var g,
                x = s.length;
              for (g = 0; g < x; g += 1) s[g].release();
              s.length = 0;
            }

            (i.renderer.compInterface = CompExpressionInterface(i.renderer)),
              i.renderer.globalData.projectInterface.registerComposition(
                i.renderer,
              ),
              (i.renderer.globalData.pushExpression = a),
              (i.renderer.globalData.popExpression = l),
              (i.renderer.globalData.registerExpressionProperty = m);
          }

          return t;
        })();
        expressionsPlugin = Expressions;
        var ExpressionManager = (function () {
            'use strict';
            var ob = {},
              Math = BMMath,
              window = null,
              document = null;

            function $bm_isInstanceOfArray(t) {
              return t.constructor === Array || t.constructor === Float32Array;
            }

            function isNumerable(t, e) {
              return (
                t === 'number' ||
                t === 'boolean' ||
                t === 'string' ||
                e instanceof Number
              );
            }

            function $bm_neg(t) {
              var e = typeof t;
              if (e === 'number' || e === 'boolean' || t instanceof Number)
                return -t;
              if ($bm_isInstanceOfArray(t)) {
                var i,
                  r = t.length,
                  s = [];
                for (i = 0; i < r; i += 1) s[i] = -t[i];
                return s;
              }
              return t.propType ? t.v : -t;
            }

            var easeInBez = BezierFactory.getBezierEasing(
                0.333,
                0,
                0.833,
                0.833,
                'easeIn',
              ).get,
              easeOutBez = BezierFactory.getBezierEasing(
                0.167,
                0.167,
                0.667,
                1,
                'easeOut',
              ).get,
              easeInOutBez = BezierFactory.getBezierEasing(
                0.33,
                0,
                0.667,
                1,
                'easeInOut',
              ).get;

            function sum(t, e) {
              var i = typeof t,
                r = typeof e;
              if (
                i === 'string' ||
                r === 'string' ||
                (isNumerable(i, t) && isNumerable(r, e))
              )
                return t + e;
              if ($bm_isInstanceOfArray(t) && isNumerable(r, e))
                return (t = t.slice(0)), (t[0] += e), t;
              if (isNumerable(i, t) && $bm_isInstanceOfArray(e))
                return (e = e.slice(0)), (e[0] = t + e[0]), e;
              if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                for (
                  var s = 0, a = t.length, l = e.length, m = [];
                  s < a || s < l;

                )
                  (typeof t[s] == 'number' || t[s] instanceof Number) &&
                  (typeof e[s] == 'number' || e[s] instanceof Number)
                    ? (m[s] = t[s] + e[s])
                    : (m[s] = e[s] === void 0 ? t[s] : t[s] || e[s]),
                    (s += 1);
                return m;
              }
              return 0;
            }

            var add = sum;

            function sub(t, e) {
              var i = typeof t,
                r = typeof e;
              if (isNumerable(i, t) && isNumerable(r, e))
                return (
                  i === 'string' && (t = parseInt(t, 10)),
                  r === 'string' && (e = parseInt(e, 10)),
                  t - e
                );
              if ($bm_isInstanceOfArray(t) && isNumerable(r, e))
                return (t = t.slice(0)), (t[0] -= e), t;
              if (isNumerable(i, t) && $bm_isInstanceOfArray(e))
                return (e = e.slice(0)), (e[0] = t - e[0]), e;
              if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                for (
                  var s = 0, a = t.length, l = e.length, m = [];
                  s < a || s < l;

                )
                  (typeof t[s] == 'number' || t[s] instanceof Number) &&
                  (typeof e[s] == 'number' || e[s] instanceof Number)
                    ? (m[s] = t[s] - e[s])
                    : (m[s] = e[s] === void 0 ? t[s] : t[s] || e[s]),
                    (s += 1);
                return m;
              }
              return 0;
            }

            function mul(t, e) {
              var i = typeof t,
                r = typeof e,
                s;
              if (isNumerable(i, t) && isNumerable(r, e)) return t * e;
              var a, l;
              if ($bm_isInstanceOfArray(t) && isNumerable(r, e)) {
                for (
                  l = t.length, s = createTypedArray('float32', l), a = 0;
                  a < l;
                  a += 1
                )
                  s[a] = t[a] * e;
                return s;
              }
              if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) {
                for (
                  l = e.length, s = createTypedArray('float32', l), a = 0;
                  a < l;
                  a += 1
                )
                  s[a] = t * e[a];
                return s;
              }
              return 0;
            }

            function div(t, e) {
              var i = typeof t,
                r = typeof e,
                s;
              if (isNumerable(i, t) && isNumerable(r, e)) return t / e;
              var a, l;
              if ($bm_isInstanceOfArray(t) && isNumerable(r, e)) {
                for (
                  l = t.length, s = createTypedArray('float32', l), a = 0;
                  a < l;
                  a += 1
                )
                  s[a] = t[a] / e;
                return s;
              }
              if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) {
                for (
                  l = e.length, s = createTypedArray('float32', l), a = 0;
                  a < l;
                  a += 1
                )
                  s[a] = t / e[a];
                return s;
              }
              return 0;
            }

            function mod(t, e) {
              return (
                typeof t == 'string' && (t = parseInt(t, 10)),
                typeof e == 'string' && (e = parseInt(e, 10)),
                t % e
              );
            }

            var $bm_sum = sum,
              $bm_sub = sub,
              $bm_mul = mul,
              $bm_div = div,
              $bm_mod = mod;

            function clamp(t, e, i) {
              if (e > i) {
                var r = i;
                (i = e), (e = r);
              }
              return Math.min(Math.max(t, e), i);
            }

            function radiansToDegrees(t) {
              return t / degToRads;
            }

            var radians_to_degrees = radiansToDegrees;

            function degreesToRadians(t) {
              return t * degToRads;
            }

            var degrees_to_radians = radiansToDegrees,
              helperLengthArray = [0, 0, 0, 0, 0, 0];

            function length(t, e) {
              if (typeof t == 'number' || t instanceof Number)
                return (e = e || 0), Math.abs(t - e);
              e || (e = helperLengthArray);
              var i,
                r = Math.min(t.length, e.length),
                s = 0;
              for (i = 0; i < r; i += 1) s += Math.pow(e[i] - t[i], 2);
              return Math.sqrt(s);
            }

            function normalize(t) {
              return div(t, length(t));
            }

            function rgbToHsl(t) {
              var e = t[0],
                i = t[1],
                r = t[2],
                s = Math.max(e, i, r),
                a = Math.min(e, i, r),
                l,
                m,
                d = (s + a) / 2;
              if (s === a) (l = 0), (m = 0);
              else {
                var g = s - a;
                switch (((m = d > 0.5 ? g / (2 - s - a) : g / (s + a)), s)) {
                  case e:
                    l = (i - r) / g + (i < r ? 6 : 0);
                    break;
                  case i:
                    l = (r - e) / g + 2;
                    break;
                  case r:
                    l = (e - i) / g + 4;
                    break;
                  default:
                    break;
                }
                l /= 6;
              }
              return [l, m, d, t[3]];
            }

            function hue2rgb(t, e, i) {
              return (
                i < 0 && (i += 1),
                i > 1 && (i -= 1),
                i < 1 / 6
                  ? t + (e - t) * 6 * i
                  : i < 1 / 2
                  ? e
                  : i < 2 / 3
                  ? t + (e - t) * (2 / 3 - i) * 6
                  : t
              );
            }

            function hslToRgb(t) {
              var e = t[0],
                i = t[1],
                r = t[2],
                s,
                a,
                l;
              if (i === 0) (s = r), (l = r), (a = r);
              else {
                var m = r < 0.5 ? r * (1 + i) : r + i - r * i,
                  d = 2 * r - m;
                (s = hue2rgb(d, m, e + 1 / 3)),
                  (a = hue2rgb(d, m, e)),
                  (l = hue2rgb(d, m, e - 1 / 3));
              }
              return [s, a, l, t[3]];
            }

            function linear(t, e, i, r, s) {
              if (
                ((r === void 0 || s === void 0) &&
                  ((r = e), (s = i), (e = 0), (i = 1)),
                i < e)
              ) {
                var a = i;
                (i = e), (e = a);
              }
              if (t <= e) return r;
              if (t >= i) return s;
              var l = i === e ? 0 : (t - e) / (i - e);
              if (!r.length) return r + (s - r) * l;
              var m,
                d = r.length,
                g = createTypedArray('float32', d);
              for (m = 0; m < d; m += 1) g[m] = r[m] + (s[m] - r[m]) * l;
              return g;
            }

            function random(t, e) {
              if (
                (e === void 0 &&
                  (t === void 0 ? ((t = 0), (e = 1)) : ((e = t), (t = void 0))),
                e.length)
              ) {
                var i,
                  r = e.length;
                t || (t = createTypedArray('float32', r));
                var s = createTypedArray('float32', r),
                  a = BMMath.random();
                for (i = 0; i < r; i += 1) s[i] = t[i] + a * (e[i] - t[i]);
                return s;
              }
              t === void 0 && (t = 0);
              var l = BMMath.random();
              return t + l * (e - t);
            }

            function createPath(t, e, i, r) {
              var s,
                a = t.length,
                l = shapePool.newElement();
              l.setPathData(!!r, a);
              var m = [0, 0],
                d,
                g;
              for (s = 0; s < a; s += 1)
                (d = e && e[s] ? e[s] : m),
                  (g = i && i[s] ? i[s] : m),
                  l.setTripleAt(
                    t[s][0],
                    t[s][1],
                    g[0] + t[s][0],
                    g[1] + t[s][1],
                    d[0] + t[s][0],
                    d[1] + t[s][1],
                    s,
                    !0,
                  );
              return l;
            }

            function initiateExpression(elem, data, property) {
              var val = data.x,
                needsVelocity = /velocity(?![\w\d])/.test(val),
                _needsRandom = val.indexOf('random') !== -1,
                elemType = elem.data.ty,
                transform,
                $bm_transform,
                content,
                effect,
                thisProperty = property;
              (thisProperty.valueAtTime = thisProperty.getValueAtTime),
                Object.defineProperty(thisProperty, 'value', {
                  get: function () {
                    return thisProperty.v;
                  },
                }),
                (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate),
                (elem.comp.displayStartTime = 0);
              var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                outPoint = elem.data.op / elem.comp.globalData.frameRate,
                width = elem.data.sw ? elem.data.sw : 0,
                height = elem.data.sh ? elem.data.sh : 0,
                name = elem.data.nm,
                loopIn,
                loop_in,
                loopOut,
                loop_out,
                smooth,
                toWorld,
                fromWorld,
                fromComp,
                toComp,
                fromCompToSurface,
                position,
                rotation,
                anchorPoint,
                scale,
                thisLayer,
                thisComp,
                mask,
                valueAtTime,
                velocityAtTime,
                scoped_bm_rt,
                expression_function = eval(
                  '[function _expression_function(){' +
                    val +
                    ';scoped_bm_rt=$bm_rt}]',
                )[0],
                numKeys = property.kf ? data.k.length : 0,
                active = !this.data || this.data.hd !== !0,
                wiggle = function t(e, i) {
                  var r,
                    s,
                    a = this.pv.length ? this.pv.length : 1,
                    l = createTypedArray('float32', a);
                  e = 5;
                  var m = Math.floor(time * e);
                  for (r = 0, s = 0; r < m; ) {
                    for (s = 0; s < a; s += 1)
                      l[s] += -i + i * 2 * BMMath.random();
                    r += 1;
                  }
                  var d = time * e,
                    g = d - Math.floor(d),
                    x = createTypedArray('float32', a);
                  if (a > 1) {
                    for (s = 0; s < a; s += 1)
                      x[s] =
                        this.pv[s] + l[s] + (-i + i * 2 * BMMath.random()) * g;
                    return x;
                  }
                  return this.pv + l[0] + (-i + i * 2 * BMMath.random()) * g;
                }.bind(this);
              thisProperty.loopIn &&
                ((loopIn = thisProperty.loopIn.bind(thisProperty)),
                (loop_in = loopIn)),
                thisProperty.loopOut &&
                  ((loopOut = thisProperty.loopOut.bind(thisProperty)),
                  (loop_out = loopOut)),
                thisProperty.smooth &&
                  (smooth = thisProperty.smooth.bind(thisProperty));

              function loopInDuration(t, e) {
                return loopIn(t, e, !0);
              }

              function loopOutDuration(t, e) {
                return loopOut(t, e, !0);
              }

              this.getValueAtTime &&
                (valueAtTime = this.getValueAtTime.bind(this)),
                this.getVelocityAtTime &&
                  (velocityAtTime = this.getVelocityAtTime.bind(this));
              var comp = elem.comp.globalData.projectInterface.bind(
                elem.comp.globalData.projectInterface,
              );

              function lookAt(t, e) {
                var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                  r =
                    Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) /
                    degToRads,
                  s = -Math.atan2(i[1], i[2]) / degToRads;
                return [s, r, 0];
              }

              function easeOut(t, e, i, r, s) {
                return applyEase(easeOutBez, t, e, i, r, s);
              }

              function easeIn(t, e, i, r, s) {
                return applyEase(easeInBez, t, e, i, r, s);
              }

              function ease(t, e, i, r, s) {
                return applyEase(easeInOutBez, t, e, i, r, s);
              }

              function applyEase(t, e, i, r, s, a) {
                s === void 0 ? ((s = i), (a = r)) : (e = (e - i) / (r - i)),
                  e > 1 ? (e = 1) : e < 0 && (e = 0);
                var l = t(e);
                if ($bm_isInstanceOfArray(s)) {
                  var m,
                    d = s.length,
                    g = createTypedArray('float32', d);
                  for (m = 0; m < d; m += 1) g[m] = (a[m] - s[m]) * l + s[m];
                  return g;
                }
                return (a - s) * l + s;
              }

              function nearestKey(t) {
                var e,
                  i = data.k.length,
                  r,
                  s;
                if (!data.k.length || typeof data.k[0] == 'number')
                  (r = 0), (s = 0);
                else if (
                  ((r = -1),
                  (t *= elem.comp.globalData.frameRate),
                  t < data.k[0].t)
                )
                  (r = 1), (s = data.k[0].t);
                else {
                  for (e = 0; e < i - 1; e += 1)
                    if (t === data.k[e].t) {
                      (r = e + 1), (s = data.k[e].t);
                      break;
                    } else if (t > data.k[e].t && t < data.k[e + 1].t) {
                      t - data.k[e].t > data.k[e + 1].t - t
                        ? ((r = e + 2), (s = data.k[e + 1].t))
                        : ((r = e + 1), (s = data.k[e].t));
                      break;
                    }
                  r === -1 && ((r = e + 1), (s = data.k[e].t));
                }
                var a = {};
                return (
                  (a.index = r),
                  (a.time = s / elem.comp.globalData.frameRate),
                  a
                );
              }

              function key(t) {
                var e, i, r;
                if (!data.k.length || typeof data.k[0] == 'number')
                  throw new Error('The property has no keyframe at index ' + t);
                (t -= 1),
                  (e = {
                    time: data.k[t].t / elem.comp.globalData.frameRate,
                    value: [],
                  });
                var s = Object.prototype.hasOwnProperty.call(data.k[t], 's')
                  ? data.k[t].s
                  : data.k[t - 1].e;
                for (r = s.length, i = 0; i < r; i += 1)
                  (e[i] = s[i]), (e.value[i] = s[i]);
                return e;
              }

              function framesToTime(t, e) {
                return e || (e = elem.comp.globalData.frameRate), t / e;
              }

              function timeToFrames(t, e) {
                return (
                  !t && t !== 0 && (t = time),
                  e || (e = elem.comp.globalData.frameRate),
                  t * e
                );
              }

              function seedRandom(t) {
                BMMath.seedrandom(randSeed + t);
              }

              function sourceRectAtTime() {
                return elem.sourceRectAtTime();
              }

              function substring(t, e) {
                return typeof value == 'string'
                  ? e === void 0
                    ? value.substring(t)
                    : value.substring(t, e)
                  : '';
              }

              function substr(t, e) {
                return typeof value == 'string'
                  ? e === void 0
                    ? value.substr(t)
                    : value.substr(t, e)
                  : '';
              }

              function posterizeTime(t) {
                (time = t === 0 ? 0 : Math.floor(time * t) / t),
                  (value = valueAtTime(time));
              }

              var time,
                velocity,
                value,
                text,
                textIndex,
                textTotal,
                selectorValue,
                index = elem.data.ind,
                hasParent = !!(elem.hierarchy && elem.hierarchy.length),
                parent,
                randSeed = Math.floor(Math.random() * 1e6),
                globalData = elem.globalData;

              function executeExpression(t) {
                return (
                  (value = t),
                  _needsRandom && seedRandom(randSeed),
                  this.frameExpressionId === elem.globalData.frameId &&
                  this.propType !== 'textSelector'
                    ? value
                    : (this.propType === 'textSelector' &&
                        ((textIndex = this.textIndex),
                        (textTotal = this.textTotal),
                        (selectorValue = this.selectorValue)),
                      thisLayer ||
                        ((text = elem.layerInterface.text),
                        (thisLayer = elem.layerInterface),
                        (thisComp = elem.comp.compInterface),
                        (toWorld = thisLayer.toWorld.bind(thisLayer)),
                        (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                        (fromComp = thisLayer.fromComp.bind(thisLayer)),
                        (toComp = thisLayer.toComp.bind(thisLayer)),
                        (mask = thisLayer.mask
                          ? thisLayer.mask.bind(thisLayer)
                          : null),
                        (fromCompToSurface = fromComp)),
                      transform ||
                        ((transform = elem.layerInterface(
                          'ADBE Transform Group',
                        )),
                        ($bm_transform = transform),
                        transform && (anchorPoint = transform.anchorPoint)),
                      elemType === 4 &&
                        !content &&
                        (content = thisLayer('ADBE Root Vectors Group')),
                      effect || (effect = thisLayer(4)),
                      (hasParent = !!(elem.hierarchy && elem.hierarchy.length)),
                      hasParent &&
                        !parent &&
                        (parent = elem.hierarchy[0].layerInterface),
                      (time =
                        this.comp.renderedFrame /
                        this.comp.globalData.frameRate),
                      needsVelocity && (velocity = velocityAtTime(time)),
                      expression_function(),
                      (this.frameExpressionId = elem.globalData.frameId),
                      scoped_bm_rt.propType === 'shape' &&
                        (scoped_bm_rt = scoped_bm_rt.v),
                      scoped_bm_rt)
                );
              }

              return executeExpression;
            }

            return (ob.initiateExpression = initiateExpression), ob;
          })(),
          expressionHelpers = (function () {
            function t(l, m, d) {
              m.x &&
                ((d.k = !0),
                (d.x = !0),
                (d.initiateExpression = ExpressionManager.initiateExpression),
                d.effectsSequence.push(d.initiateExpression(l, m, d).bind(d)));
            }

            function e(l) {
              return (
                (l *= this.elem.globalData.frameRate),
                (l -= this.offsetTime),
                l !== this._cachingAtTime.lastFrame &&
                  ((this._cachingAtTime.lastIndex =
                    this._cachingAtTime.lastFrame < l
                      ? this._cachingAtTime.lastIndex
                      : 0),
                  (this._cachingAtTime.value = this.interpolateValue(
                    l,
                    this._cachingAtTime,
                  )),
                  (this._cachingAtTime.lastFrame = l)),
                this._cachingAtTime.value
              );
            }

            function i(l) {
              var m = -0.01,
                d = this.getValueAtTime(l),
                g = this.getValueAtTime(l + m),
                x = 0;
              if (d.length) {
                var b;
                for (b = 0; b < d.length; b += 1) x += Math.pow(g[b] - d[b], 2);
                x = Math.sqrt(x) * 100;
              } else x = 0;
              return x;
            }

            function r(l) {
              if (this.vel !== void 0) return this.vel;
              var m = -0.001,
                d = this.getValueAtTime(l),
                g = this.getValueAtTime(l + m),
                x;
              if (d.length) {
                x = createTypedArray('float32', d.length);
                var b;
                for (b = 0; b < d.length; b += 1) x[b] = (g[b] - d[b]) / m;
              } else x = (g - d) / m;
              return x;
            }

            function s() {
              return this.pv;
            }

            function a(l) {
              this.propertyGroup = l;
            }

            return {
              searchExpressions: t,
              getSpeedAtTime: i,
              getVelocityAtTime: r,
              getValueAtTime: e,
              getStaticValueAtTime: s,
              setGroupProperty: a,
            };
          })();
        (function t() {
          function e(u, k, f) {
            if (!this.k || !this.keyframes) return this.pv;
            u = u ? u.toLowerCase() : '';
            var h = this.comp.renderedFrame,
              p = this.keyframes,
              n = p[p.length - 1].t;
            if (h <= n) return this.pv;
            var o, c;
            f
              ? (k
                  ? (o = Math.abs(n - this.elem.comp.globalData.frameRate * k))
                  : (o = Math.max(0, n - this.elem.data.ip)),
                (c = n - o))
              : ((!k || k > p.length - 1) && (k = p.length - 1),
                (c = p[p.length - 1 - k].t),
                (o = n - c));
            var v, w, P;
            if (u === 'pingpong') {
              var E = Math.floor((h - c) / o);
              if (E % 2 !== 0)
                return this.getValueAtTime(
                  (o - ((h - c) % o) + c) / this.comp.globalData.frameRate,
                  0,
                );
            } else if (u === 'offset') {
              var C = this.getValueAtTime(
                  c / this.comp.globalData.frameRate,
                  0,
                ),
                F = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
                V = this.getValueAtTime(
                  (((h - c) % o) + c) / this.comp.globalData.frameRate,
                  0,
                ),
                M = Math.floor((h - c) / o);
              if (this.pv.length) {
                for (
                  P = new Array(C.length), w = P.length, v = 0;
                  v < w;
                  v += 1
                )
                  P[v] = (F[v] - C[v]) * M + V[v];
                return P;
              }
              return (F - C) * M + V;
            } else if (u === 'continue') {
              var D = this.getValueAtTime(
                  n / this.comp.globalData.frameRate,
                  0,
                ),
                R = this.getValueAtTime(
                  (n - 0.001) / this.comp.globalData.frameRate,
                  0,
                );
              if (this.pv.length) {
                for (
                  P = new Array(D.length), w = P.length, v = 0;
                  v < w;
                  v += 1
                )
                  P[v] =
                    D[v] +
                    ((D[v] - R[v]) *
                      ((h - n) / this.comp.globalData.frameRate)) /
                      5e-4;
                return P;
              }
              return D + (D - R) * ((h - n) / 0.001);
            }
            return this.getValueAtTime(
              (((h - c) % o) + c) / this.comp.globalData.frameRate,
              0,
            );
          }

          function i(u, k, f) {
            if (!this.k) return this.pv;
            u = u ? u.toLowerCase() : '';
            var h = this.comp.renderedFrame,
              p = this.keyframes,
              n = p[0].t;
            if (h >= n) return this.pv;
            var o, c;
            f
              ? (k
                  ? (o = Math.abs(this.elem.comp.globalData.frameRate * k))
                  : (o = Math.max(0, this.elem.data.op - n)),
                (c = n + o))
              : ((!k || k > p.length - 1) && (k = p.length - 1),
                (c = p[k].t),
                (o = c - n));
            var v, w, P;
            if (u === 'pingpong') {
              var E = Math.floor((n - h) / o);
              if (E % 2 === 0)
                return this.getValueAtTime(
                  (((n - h) % o) + n) / this.comp.globalData.frameRate,
                  0,
                );
            } else if (u === 'offset') {
              var C = this.getValueAtTime(
                  n / this.comp.globalData.frameRate,
                  0,
                ),
                F = this.getValueAtTime(c / this.comp.globalData.frameRate, 0),
                V = this.getValueAtTime(
                  (o - ((n - h) % o) + n) / this.comp.globalData.frameRate,
                  0,
                ),
                M = Math.floor((n - h) / o) + 1;
              if (this.pv.length) {
                for (
                  P = new Array(C.length), w = P.length, v = 0;
                  v < w;
                  v += 1
                )
                  P[v] = V[v] - (F[v] - C[v]) * M;
                return P;
              }
              return V - (F - C) * M;
            } else if (u === 'continue') {
              var D = this.getValueAtTime(
                  n / this.comp.globalData.frameRate,
                  0,
                ),
                R = this.getValueAtTime(
                  (n + 0.001) / this.comp.globalData.frameRate,
                  0,
                );
              if (this.pv.length) {
                for (
                  P = new Array(D.length), w = P.length, v = 0;
                  v < w;
                  v += 1
                )
                  P[v] = D[v] + ((D[v] - R[v]) * (n - h)) / 0.001;
                return P;
              }
              return D + ((D - R) * (n - h)) / 0.001;
            }
            return this.getValueAtTime(
              (o - (((n - h) % o) + n)) / this.comp.globalData.frameRate,
              0,
            );
          }

          function r(u, k) {
            if (!this.k) return this.pv;
            if (((u = (u || 0.4) * 0.5), (k = Math.floor(k || 5)), k <= 1))
              return this.pv;
            var f = this.comp.renderedFrame / this.comp.globalData.frameRate,
              h = f - u,
              p = f + u,
              n = k > 1 ? (p - h) / (k - 1) : 1,
              o = 0,
              c = 0,
              v;
            this.pv.length
              ? (v = createTypedArray('float32', this.pv.length))
              : (v = 0);
            for (var w; o < k; ) {
              if (((w = this.getValueAtTime(h + o * n)), this.pv.length))
                for (c = 0; c < this.pv.length; c += 1) v[c] += w[c];
              else v += w;
              o += 1;
            }
            if (this.pv.length)
              for (c = 0; c < this.pv.length; c += 1) v[c] /= k;
            else v /= k;
            return v;
          }

          function s(u) {
            this._transformCachingAtTime ||
              (this._transformCachingAtTime = { v: new Matrix() });
            var k = this._transformCachingAtTime.v;
            if (
              (k.cloneFromProps(this.pre.props),
              this.appliedTransformations < 1)
            ) {
              var f = this.a.getValueAtTime(u);
              k.translate(
                -f[0] * this.a.mult,
                -f[1] * this.a.mult,
                f[2] * this.a.mult,
              );
            }
            if (this.appliedTransformations < 2) {
              var h = this.s.getValueAtTime(u);
              k.scale(
                h[0] * this.s.mult,
                h[1] * this.s.mult,
                h[2] * this.s.mult,
              );
            }
            if (this.sk && this.appliedTransformations < 3) {
              var p = this.sk.getValueAtTime(u),
                n = this.sa.getValueAtTime(u);
              k.skewFromAxis(-p * this.sk.mult, n * this.sa.mult);
            }
            if (this.r && this.appliedTransformations < 4) {
              var o = this.r.getValueAtTime(u);
              k.rotate(-o * this.r.mult);
            } else if (!this.r && this.appliedTransformations < 4) {
              var c = this.rz.getValueAtTime(u),
                v = this.ry.getValueAtTime(u),
                w = this.rx.getValueAtTime(u),
                P = this.or.getValueAtTime(u);
              k.rotateZ(-c * this.rz.mult)
                .rotateY(v * this.ry.mult)
                .rotateX(w * this.rx.mult)
                .rotateZ(-P[2] * this.or.mult)
                .rotateY(P[1] * this.or.mult)
                .rotateX(P[0] * this.or.mult);
            }
            if (this.data.p && this.data.p.s) {
              var E = this.px.getValueAtTime(u),
                C = this.py.getValueAtTime(u);
              if (this.data.p.z) {
                var F = this.pz.getValueAtTime(u);
                k.translate(
                  E * this.px.mult,
                  C * this.py.mult,
                  -F * this.pz.mult,
                );
              } else k.translate(E * this.px.mult, C * this.py.mult, 0);
            } else {
              var V = this.p.getValueAtTime(u);
              k.translate(
                V[0] * this.p.mult,
                V[1] * this.p.mult,
                -V[2] * this.p.mult,
              );
            }
            return k;
          }

          function a() {
            return this.v.clone(new Matrix());
          }

          var l = TransformPropertyFactory.getTransformProperty;
          TransformPropertyFactory.getTransformProperty = function (u, k, f) {
            var h = l(u, k, f);
            return (
              h.dynamicProperties.length
                ? (h.getValueAtTime = s.bind(h))
                : (h.getValueAtTime = a.bind(h)),
              (h.setGroupProperty = expressionHelpers.setGroupProperty),
              h
            );
          };
          var m = PropertyFactory.getProp;
          PropertyFactory.getProp = function (u, k, f, h, p) {
            var n = m(u, k, f, h, p);
            n.kf
              ? (n.getValueAtTime = expressionHelpers.getValueAtTime.bind(n))
              : (n.getValueAtTime =
                  expressionHelpers.getStaticValueAtTime.bind(n)),
              (n.setGroupProperty = expressionHelpers.setGroupProperty),
              (n.loopOut = e),
              (n.loopIn = i),
              (n.smooth = r),
              (n.getVelocityAtTime =
                expressionHelpers.getVelocityAtTime.bind(n)),
              (n.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(n)),
              (n.numKeys = k.a === 1 ? k.k.length : 0),
              (n.propertyIndex = k.ix);
            var o = 0;
            return (
              f !== 0 &&
                (o = createTypedArray(
                  'float32',
                  k.a === 1 ? k.k[0].s.length : k.k.length,
                )),
              (n._cachingAtTime = {
                lastFrame: initialDefaultFrame,
                lastIndex: 0,
                value: o,
              }),
              expressionHelpers.searchExpressions(u, k, n),
              n.k && p.addDynamicProperty(n),
              n
            );
          };

          function d(u) {
            return (
              this._cachingAtTime ||
                (this._cachingAtTime = {
                  shapeValue: shapePool.clone(this.pv),
                  lastIndex: 0,
                  lastTime: initialDefaultFrame,
                }),
              (u *= this.elem.globalData.frameRate),
              (u -= this.offsetTime),
              u !== this._cachingAtTime.lastTime &&
                ((this._cachingAtTime.lastIndex =
                  this._cachingAtTime.lastTime < u
                    ? this._caching.lastIndex
                    : 0),
                (this._cachingAtTime.lastTime = u),
                this.interpolateShape(
                  u,
                  this._cachingAtTime.shapeValue,
                  this._cachingAtTime,
                )),
              this._cachingAtTime.shapeValue
            );
          }

          var g = ShapePropertyFactory.getConstructorFunction(),
            x = ShapePropertyFactory.getKeyframedConstructorFunction();

          function b() {}

          (b.prototype = {
            vertices: function (u, k) {
              this.k && this.getValue();
              var f = this.v;
              k !== void 0 && (f = this.getValueAtTime(k, 0));
              var h,
                p = f._length,
                n = f[u],
                o = f.v,
                c = createSizedArray(p);
              for (h = 0; h < p; h += 1)
                u === 'i' || u === 'o'
                  ? (c[h] = [n[h][0] - o[h][0], n[h][1] - o[h][1]])
                  : (c[h] = [n[h][0], n[h][1]]);
              return c;
            },
            points: function (u) {
              return this.vertices('v', u);
            },
            inTangents: function (u) {
              return this.vertices('i', u);
            },
            outTangents: function (u) {
              return this.vertices('o', u);
            },
            isClosed: function () {
              return this.v.c;
            },
            pointOnPath: function (u, k) {
              var f = this.v;
              k !== void 0 && (f = this.getValueAtTime(k, 0)),
                this._segmentsLength ||
                  (this._segmentsLength = bez.getSegmentsLength(f));
              for (
                var h = this._segmentsLength,
                  p = h.lengths,
                  n = h.totalLength * u,
                  o = 0,
                  c = p.length,
                  v = 0,
                  w;
                o < c;

              ) {
                if (v + p[o].addedLength > n) {
                  var P = o,
                    E = f.c && o === c - 1 ? 0 : o + 1,
                    C = (n - v) / p[o].addedLength;
                  w = bez.getPointInSegment(
                    f.v[P],
                    f.v[E],
                    f.o[P],
                    f.i[E],
                    C,
                    p[o],
                  );
                  break;
                } else v += p[o].addedLength;
                o += 1;
              }
              return (
                w ||
                  (w = f.c
                    ? [f.v[0][0], f.v[0][1]]
                    : [f.v[f._length - 1][0], f.v[f._length - 1][1]]),
                w
              );
            },
            vectorOnPath: function (u, k, f) {
              u == 1 ? (u = this.v.c) : u == 0 && (u = 0.999);
              var h = this.pointOnPath(u, k),
                p = this.pointOnPath(u + 0.001, k),
                n = p[0] - h[0],
                o = p[1] - h[1],
                c = Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));
              if (c === 0) return [0, 0];
              var v = f === 'tangent' ? [n / c, o / c] : [-o / c, n / c];
              return v;
            },
            tangentOnPath: function (u, k) {
              return this.vectorOnPath(u, k, 'tangent');
            },
            normalOnPath: function (u, k) {
              return this.vectorOnPath(u, k, 'normal');
            },
            setGroupProperty: expressionHelpers.setGroupProperty,
            getValueAtTime: expressionHelpers.getStaticValueAtTime,
          }),
            extendPrototype([b], g),
            extendPrototype([b], x),
            (x.prototype.getValueAtTime = d),
            (x.prototype.initiateExpression =
              ExpressionManager.initiateExpression);
          var y = ShapePropertyFactory.getShapeProp;
          ShapePropertyFactory.getShapeProp = function (u, k, f, h, p) {
            var n = y(u, k, f, h, p);
            return (
              (n.propertyIndex = k.ix),
              (n.lock = !1),
              f === 3
                ? expressionHelpers.searchExpressions(u, k.pt, n)
                : f === 4 && expressionHelpers.searchExpressions(u, k.ks, n),
              n.k && u.addDynamicProperty(n),
              n
            );
          };
        })(),
          (function t() {
            function e() {
              return this.data.d.x
                ? ((this.calculateExpression =
                    ExpressionManager.initiateExpression.bind(this)(
                      this.elem,
                      this.data.d,
                      this,
                    )),
                  this.addEffect(this.getExpressionValue.bind(this)),
                  !0)
                : null;
            }

            (TextProperty.prototype.getExpressionValue = function (i, r) {
              var s = this.calculateExpression(r);
              if (i.t !== s) {
                var a = {};
                return (
                  this.copyData(a, i),
                  (a.t = s.toString()),
                  (a.__complete = !1),
                  a
                );
              }
              return i;
            }),
              (TextProperty.prototype.searchProperty = function () {
                var i = this.searchKeyframes(),
                  r = this.searchExpressions();
                return (this.kf = i || r), this.kf;
              }),
              (TextProperty.prototype.searchExpressions = e);
          })();
        var ShapePathInterface = (function () {
            return function (e, i, r) {
              var s = i.sh;

              function a(m) {
                return m === 'Shape' ||
                  m === 'shape' ||
                  m === 'Path' ||
                  m === 'path' ||
                  m === 'ADBE Vector Shape' ||
                  m === 2
                  ? a.path
                  : null;
              }

              var l = propertyGroupFactory(a, r);
              return (
                s.setGroupProperty(PropertyInterface('Path', l)),
                Object.defineProperties(a, {
                  path: {
                    get: function () {
                      return s.k && s.getValue(), s;
                    },
                  },
                  shape: {
                    get: function () {
                      return s.k && s.getValue(), s;
                    },
                  },
                  _name: { value: e.nm },
                  ix: { value: e.ix },
                  propertyIndex: { value: e.ix },
                  mn: { value: e.mn },
                  propertyGroup: { value: r },
                }),
                a
              );
            };
          })(),
          propertyGroupFactory = (function () {
            return function (t, e) {
              return function (i) {
                return (i = i === void 0 ? 1 : i), i <= 0 ? t : e(i - 1);
              };
            };
          })(),
          PropertyInterface = (function () {
            return function (t, e) {
              var i = { _name: t };

              function r(s) {
                return (s = s === void 0 ? 1 : s), s <= 0 ? i : e(s - 1);
              }

              return r;
            };
          })(),
          ShapeExpressionInterface = (function () {
            function t(y, u, k) {
              var f = [],
                h,
                p = y ? y.length : 0;
              for (h = 0; h < p; h += 1)
                y[h].ty === 'gr'
                  ? f.push(i(y[h], u[h], k))
                  : y[h].ty === 'fl'
                  ? f.push(r(y[h], u[h], k))
                  : y[h].ty === 'st'
                  ? f.push(s(y[h], u[h], k))
                  : y[h].ty === 'tm'
                  ? f.push(a(y[h], u[h], k))
                  : y[h].ty === 'tr' ||
                    (y[h].ty === 'el'
                      ? f.push(m(y[h], u[h], k))
                      : y[h].ty === 'sr'
                      ? f.push(d(y[h], u[h], k))
                      : y[h].ty === 'sh'
                      ? f.push(ShapePathInterface(y[h], u[h], k))
                      : y[h].ty === 'rc'
                      ? f.push(g(y[h], u[h], k))
                      : y[h].ty === 'rd'
                      ? f.push(x(y[h], u[h], k))
                      : y[h].ty === 'rp' && f.push(b(y[h], u[h], k)));
              return f;
            }

            function e(y, u, k) {
              var f,
                h = function (o) {
                  for (var c = 0, v = f.length; c < v; ) {
                    if (
                      f[c]._name === o ||
                      f[c].mn === o ||
                      f[c].propertyIndex === o ||
                      f[c].ix === o ||
                      f[c].ind === o
                    )
                      return f[c];
                    c += 1;
                  }
                  return typeof o == 'number' ? f[o - 1] : null;
                };
              (h.propertyGroup = propertyGroupFactory(h, k)),
                (f = t(y.it, u.it, h.propertyGroup)),
                (h.numProperties = f.length);
              var p = l(
                y.it[y.it.length - 1],
                u.it[u.it.length - 1],
                h.propertyGroup,
              );
              return (
                (h.transform = p),
                (h.propertyIndex = y.cix),
                (h._name = y.nm),
                h
              );
            }

            function i(y, u, k) {
              var f = function (o) {
                switch (o) {
                  case 'ADBE Vectors Group':
                  case 'Contents':
                  case 2:
                    return f.content;
                  default:
                    return f.transform;
                }
              };
              f.propertyGroup = propertyGroupFactory(f, k);
              var h = e(y, u, f.propertyGroup),
                p = l(
                  y.it[y.it.length - 1],
                  u.it[u.it.length - 1],
                  f.propertyGroup,
                );
              return (
                (f.content = h),
                (f.transform = p),
                Object.defineProperty(f, '_name', {
                  get: function () {
                    return y.nm;
                  },
                }),
                (f.numProperties = y.np),
                (f.propertyIndex = y.ix),
                (f.nm = y.nm),
                (f.mn = y.mn),
                f
              );
            }

            function r(y, u, k) {
              function f(h) {
                return h === 'Color' || h === 'color'
                  ? f.color
                  : h === 'Opacity' || h === 'opacity'
                  ? f.opacity
                  : null;
              }

              return (
                Object.defineProperties(f, {
                  color: { get: ExpressionPropertyInterface(u.c) },
                  opacity: { get: ExpressionPropertyInterface(u.o) },
                  _name: { value: y.nm },
                  mn: { value: y.mn },
                }),
                u.c.setGroupProperty(PropertyInterface('Color', k)),
                u.o.setGroupProperty(PropertyInterface('Opacity', k)),
                f
              );
            }

            function s(y, u, k) {
              var f = propertyGroupFactory(v, k),
                h = propertyGroupFactory(c, f);

              function p(w) {
                Object.defineProperty(c, y.d[w].nm, {
                  get: ExpressionPropertyInterface(u.d.dataProps[w].p),
                });
              }

              var n,
                o = y.d ? y.d.length : 0,
                c = {};
              for (n = 0; n < o; n += 1)
                p(n), u.d.dataProps[n].p.setGroupProperty(h);

              function v(w) {
                return w === 'Color' || w === 'color'
                  ? v.color
                  : w === 'Opacity' || w === 'opacity'
                  ? v.opacity
                  : w === 'Stroke Width' || w === 'stroke width'
                  ? v.strokeWidth
                  : null;
              }

              return (
                Object.defineProperties(v, {
                  color: { get: ExpressionPropertyInterface(u.c) },
                  opacity: { get: ExpressionPropertyInterface(u.o) },
                  strokeWidth: { get: ExpressionPropertyInterface(u.w) },
                  dash: {
                    get: function () {
                      return c;
                    },
                  },
                  _name: { value: y.nm },
                  mn: { value: y.mn },
                }),
                u.c.setGroupProperty(PropertyInterface('Color', f)),
                u.o.setGroupProperty(PropertyInterface('Opacity', f)),
                u.w.setGroupProperty(PropertyInterface('Stroke Width', f)),
                v
              );
            }

            function a(y, u, k) {
              function f(p) {
                return p === y.e.ix || p === 'End' || p === 'end'
                  ? f.end
                  : p === y.s.ix
                  ? f.start
                  : p === y.o.ix
                  ? f.offset
                  : null;
              }

              var h = propertyGroupFactory(f, k);
              return (
                (f.propertyIndex = y.ix),
                u.s.setGroupProperty(PropertyInterface('Start', h)),
                u.e.setGroupProperty(PropertyInterface('End', h)),
                u.o.setGroupProperty(PropertyInterface('Offset', h)),
                (f.propertyIndex = y.ix),
                (f.propertyGroup = k),
                Object.defineProperties(f, {
                  start: { get: ExpressionPropertyInterface(u.s) },
                  end: { get: ExpressionPropertyInterface(u.e) },
                  offset: { get: ExpressionPropertyInterface(u.o) },
                  _name: { value: y.nm },
                }),
                (f.mn = y.mn),
                f
              );
            }

            function l(y, u, k) {
              function f(p) {
                return y.a.ix === p || p === 'Anchor Point'
                  ? f.anchorPoint
                  : y.o.ix === p || p === 'Opacity'
                  ? f.opacity
                  : y.p.ix === p || p === 'Position'
                  ? f.position
                  : y.r.ix === p ||
                    p === 'Rotation' ||
                    p === 'ADBE Vector Rotation'
                  ? f.rotation
                  : y.s.ix === p || p === 'Scale'
                  ? f.scale
                  : (y.sk && y.sk.ix === p) || p === 'Skew'
                  ? f.skew
                  : (y.sa && y.sa.ix === p) || p === 'Skew Axis'
                  ? f.skewAxis
                  : null;
              }

              var h = propertyGroupFactory(f, k);
              return (
                u.transform.mProps.o.setGroupProperty(
                  PropertyInterface('Opacity', h),
                ),
                u.transform.mProps.p.setGroupProperty(
                  PropertyInterface('Position', h),
                ),
                u.transform.mProps.a.setGroupProperty(
                  PropertyInterface('Anchor Point', h),
                ),
                u.transform.mProps.s.setGroupProperty(
                  PropertyInterface('Scale', h),
                ),
                u.transform.mProps.r.setGroupProperty(
                  PropertyInterface('Rotation', h),
                ),
                u.transform.mProps.sk &&
                  (u.transform.mProps.sk.setGroupProperty(
                    PropertyInterface('Skew', h),
                  ),
                  u.transform.mProps.sa.setGroupProperty(
                    PropertyInterface('Skew Angle', h),
                  )),
                u.transform.op.setGroupProperty(
                  PropertyInterface('Opacity', h),
                ),
                Object.defineProperties(f, {
                  opacity: {
                    get: ExpressionPropertyInterface(u.transform.mProps.o),
                  },
                  position: {
                    get: ExpressionPropertyInterface(u.transform.mProps.p),
                  },
                  anchorPoint: {
                    get: ExpressionPropertyInterface(u.transform.mProps.a),
                  },
                  scale: {
                    get: ExpressionPropertyInterface(u.transform.mProps.s),
                  },
                  rotation: {
                    get: ExpressionPropertyInterface(u.transform.mProps.r),
                  },
                  skew: {
                    get: ExpressionPropertyInterface(u.transform.mProps.sk),
                  },
                  skewAxis: {
                    get: ExpressionPropertyInterface(u.transform.mProps.sa),
                  },
                  _name: { value: y.nm },
                }),
                (f.ty = 'tr'),
                (f.mn = y.mn),
                (f.propertyGroup = k),
                f
              );
            }

            function m(y, u, k) {
              function f(n) {
                return y.p.ix === n ? f.position : y.s.ix === n ? f.size : null;
              }

              var h = propertyGroupFactory(f, k);
              f.propertyIndex = y.ix;
              var p = u.sh.ty === 'tm' ? u.sh.prop : u.sh;
              return (
                p.s.setGroupProperty(PropertyInterface('Size', h)),
                p.p.setGroupProperty(PropertyInterface('Position', h)),
                Object.defineProperties(f, {
                  size: { get: ExpressionPropertyInterface(p.s) },
                  position: { get: ExpressionPropertyInterface(p.p) },
                  _name: { value: y.nm },
                }),
                (f.mn = y.mn),
                f
              );
            }

            function d(y, u, k) {
              function f(n) {
                return y.p.ix === n
                  ? f.position
                  : y.r.ix === n
                  ? f.rotation
                  : y.pt.ix === n
                  ? f.points
                  : y.or.ix === n || n === 'ADBE Vector Star Outer Radius'
                  ? f.outerRadius
                  : y.os.ix === n
                  ? f.outerRoundness
                  : y.ir &&
                    (y.ir.ix === n || n === 'ADBE Vector Star Inner Radius')
                  ? f.innerRadius
                  : y.is && y.is.ix === n
                  ? f.innerRoundness
                  : null;
              }

              var h = propertyGroupFactory(f, k),
                p = u.sh.ty === 'tm' ? u.sh.prop : u.sh;
              return (
                (f.propertyIndex = y.ix),
                p.or.setGroupProperty(PropertyInterface('Outer Radius', h)),
                p.os.setGroupProperty(PropertyInterface('Outer Roundness', h)),
                p.pt.setGroupProperty(PropertyInterface('Points', h)),
                p.p.setGroupProperty(PropertyInterface('Position', h)),
                p.r.setGroupProperty(PropertyInterface('Rotation', h)),
                y.ir &&
                  (p.ir.setGroupProperty(PropertyInterface('Inner Radius', h)),
                  p.is.setGroupProperty(
                    PropertyInterface('Inner Roundness', h),
                  )),
                Object.defineProperties(f, {
                  position: { get: ExpressionPropertyInterface(p.p) },
                  rotation: { get: ExpressionPropertyInterface(p.r) },
                  points: { get: ExpressionPropertyInterface(p.pt) },
                  outerRadius: { get: ExpressionPropertyInterface(p.or) },
                  outerRoundness: { get: ExpressionPropertyInterface(p.os) },
                  innerRadius: { get: ExpressionPropertyInterface(p.ir) },
                  innerRoundness: { get: ExpressionPropertyInterface(p.is) },
                  _name: { value: y.nm },
                }),
                (f.mn = y.mn),
                f
              );
            }

            function g(y, u, k) {
              function f(n) {
                return y.p.ix === n
                  ? f.position
                  : y.r.ix === n
                  ? f.roundness
                  : y.s.ix === n ||
                    n === 'Size' ||
                    n === 'ADBE Vector Rect Size'
                  ? f.size
                  : null;
              }

              var h = propertyGroupFactory(f, k),
                p = u.sh.ty === 'tm' ? u.sh.prop : u.sh;
              return (
                (f.propertyIndex = y.ix),
                p.p.setGroupProperty(PropertyInterface('Position', h)),
                p.s.setGroupProperty(PropertyInterface('Size', h)),
                p.r.setGroupProperty(PropertyInterface('Rotation', h)),
                Object.defineProperties(f, {
                  position: { get: ExpressionPropertyInterface(p.p) },
                  roundness: { get: ExpressionPropertyInterface(p.r) },
                  size: { get: ExpressionPropertyInterface(p.s) },
                  _name: { value: y.nm },
                }),
                (f.mn = y.mn),
                f
              );
            }

            function x(y, u, k) {
              function f(n) {
                return y.r.ix === n || n === 'Round Corners 1'
                  ? f.radius
                  : null;
              }

              var h = propertyGroupFactory(f, k),
                p = u;
              return (
                (f.propertyIndex = y.ix),
                p.rd.setGroupProperty(PropertyInterface('Radius', h)),
                Object.defineProperties(f, {
                  radius: { get: ExpressionPropertyInterface(p.rd) },
                  _name: { value: y.nm },
                }),
                (f.mn = y.mn),
                f
              );
            }

            function b(y, u, k) {
              function f(n) {
                return y.c.ix === n || n === 'Copies'
                  ? f.copies
                  : y.o.ix === n || n === 'Offset'
                  ? f.offset
                  : null;
              }

              var h = propertyGroupFactory(f, k),
                p = u;
              return (
                (f.propertyIndex = y.ix),
                p.c.setGroupProperty(PropertyInterface('Copies', h)),
                p.o.setGroupProperty(PropertyInterface('Offset', h)),
                Object.defineProperties(f, {
                  copies: { get: ExpressionPropertyInterface(p.c) },
                  offset: { get: ExpressionPropertyInterface(p.o) },
                  _name: { value: y.nm },
                }),
                (f.mn = y.mn),
                f
              );
            }

            return function (y, u, k) {
              var f;

              function h(n) {
                if (typeof n == 'number')
                  return (n = n === void 0 ? 1 : n), n === 0 ? k : f[n - 1];
                for (var o = 0, c = f.length; o < c; ) {
                  if (f[o]._name === n) return f[o];
                  o += 1;
                }
                return null;
              }

              function p() {
                return k;
              }

              return (
                (h.propertyGroup = propertyGroupFactory(h, p)),
                (f = t(y, u, h.propertyGroup)),
                (h.numProperties = f.length),
                (h._name = 'Contents'),
                h
              );
            };
          })(),
          TextExpressionInterface = (function () {
            return function (t) {
              var e, i;

              function r(s) {
                switch (s) {
                  case 'ADBE Text Document':
                    return r.sourceText;
                  default:
                    return null;
                }
              }

              return (
                Object.defineProperty(r, 'sourceText', {
                  get: function () {
                    t.textProperty.getValue();
                    var s = t.textProperty.currentData.t;
                    return (
                      s !== e &&
                        ((t.textProperty.currentData.t = e),
                        (i = new String(s)),
                        (i.value = s || new String(s))),
                      i
                    );
                  },
                }),
                r
              );
            };
          })(),
          LayerExpressionInterface = (function () {
            function t(g) {
              var x = new Matrix();
              if (g !== void 0) {
                var b = this._elem.finalTransform.mProp.getValueAtTime(g);
                b.clone(x);
              } else {
                var y = this._elem.finalTransform.mProp;
                y.applyToMatrix(x);
              }
              return x;
            }

            function e(g, x) {
              var b = this.getMatrix(x);
              return (
                (b.props[12] = 0),
                (b.props[13] = 0),
                (b.props[14] = 0),
                this.applyPoint(b, g)
              );
            }

            function i(g, x) {
              var b = this.getMatrix(x);
              return this.applyPoint(b, g);
            }

            function r(g, x) {
              var b = this.getMatrix(x);
              return (
                (b.props[12] = 0),
                (b.props[13] = 0),
                (b.props[14] = 0),
                this.invertPoint(b, g)
              );
            }

            function s(g, x) {
              var b = this.getMatrix(x);
              return this.invertPoint(b, g);
            }

            function a(g, x) {
              if (this._elem.hierarchy && this._elem.hierarchy.length) {
                var b,
                  y = this._elem.hierarchy.length;
                for (b = 0; b < y; b += 1)
                  this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(g);
              }
              return g.applyToPointArray(x[0], x[1], x[2] || 0);
            }

            function l(g, x) {
              if (this._elem.hierarchy && this._elem.hierarchy.length) {
                var b,
                  y = this._elem.hierarchy.length;
                for (b = 0; b < y; b += 1)
                  this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(g);
              }
              return g.inversePoint(x);
            }

            function m(g) {
              var x = new Matrix();
              if (
                (x.reset(),
                this._elem.finalTransform.mProp.applyToMatrix(x),
                this._elem.hierarchy && this._elem.hierarchy.length)
              ) {
                var b,
                  y = this._elem.hierarchy.length;
                for (b = 0; b < y; b += 1)
                  this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(x);
                return x.inversePoint(g);
              }
              return x.inversePoint(g);
            }

            function d() {
              return [1, 1, 1, 1];
            }

            return function (g) {
              var x;

              function b(f) {
                u.mask = new MaskManagerInterface(f, g);
              }

              function y(f) {
                u.effect = f;
              }

              function u(f) {
                switch (f) {
                  case 'ADBE Root Vectors Group':
                  case 'Contents':
                  case 2:
                    return u.shapeInterface;
                  case 1:
                  case 6:
                  case 'Transform':
                  case 'transform':
                  case 'ADBE Transform Group':
                    return x;
                  case 4:
                  case 'ADBE Effect Parade':
                  case 'effects':
                  case 'Effects':
                    return u.effect;
                  case 'ADBE Text Properties':
                    return u.textInterface;
                  default:
                    return null;
                }
              }

              (u.getMatrix = t),
                (u.invertPoint = l),
                (u.applyPoint = a),
                (u.toWorld = i),
                (u.toWorldVec = e),
                (u.fromWorld = s),
                (u.fromWorldVec = r),
                (u.toComp = i),
                (u.fromComp = m),
                (u.sampleImage = d),
                (u.sourceRectAtTime = g.sourceRectAtTime.bind(g)),
                (u._elem = g),
                (x = TransformExpressionInterface(g.finalTransform.mProp));
              var k = getDescriptor(x, 'anchorPoint');
              return (
                Object.defineProperties(u, {
                  hasParent: {
                    get: function () {
                      return g.hierarchy.length;
                    },
                  },
                  parent: {
                    get: function () {
                      return g.hierarchy[0].layerInterface;
                    },
                  },
                  rotation: getDescriptor(x, 'rotation'),
                  scale: getDescriptor(x, 'scale'),
                  position: getDescriptor(x, 'position'),
                  opacity: getDescriptor(x, 'opacity'),
                  anchorPoint: k,
                  anchor_point: k,
                  transform: {
                    get: function () {
                      return x;
                    },
                  },
                  active: {
                    get: function () {
                      return g.isInRange;
                    },
                  },
                }),
                (u.startTime = g.data.st),
                (u.index = g.data.ind),
                (u.source = g.data.refId),
                (u.height = g.data.ty === 0 ? g.data.h : 100),
                (u.width = g.data.ty === 0 ? g.data.w : 100),
                (u.inPoint = g.data.ip / g.comp.globalData.frameRate),
                (u.outPoint = g.data.op / g.comp.globalData.frameRate),
                (u._name = g.data.nm),
                (u.registerMaskInterface = b),
                (u.registerEffectsInterface = y),
                u
              );
            };
          })(),
          FootageInterface = (function () {
            var t = function (i) {
                var r = '',
                  s = i.getFootageData();

                function a() {
                  return (r = ''), (s = i.getFootageData()), l;
                }

                function l(m) {
                  if (s[m])
                    return (r = m), (s = s[m]), typeof s == 'object' ? l : s;
                  var d = m.indexOf(r);
                  if (d !== -1) {
                    var g = parseInt(m.substr(d + r.length), 10);
                    return (s = s[g]), typeof s == 'object' ? l : s;
                  }
                  return '';
                }

                return a;
              },
              e = function (i) {
                function r(s) {
                  return s === 'Outline' ? r.outlineInterface() : null;
                }

                return (r._name = 'Outline'), (r.outlineInterface = t(i)), r;
              };
            return function (i) {
              function r(s) {
                return s === 'Data' ? r.dataInterface : null;
              }

              return (r._name = 'Data'), (r.dataInterface = e(i)), r;
            };
          })(),
          CompExpressionInterface = (function () {
            return function (t) {
              function e(i) {
                for (var r = 0, s = t.layers.length; r < s; ) {
                  if (t.layers[r].nm === i || t.layers[r].ind === i)
                    return t.elements[r].layerInterface;
                  r += 1;
                }
                return null;
              }

              return (
                Object.defineProperty(e, '_name', { value: t.data.nm }),
                (e.layer = e),
                (e.pixelAspect = 1),
                (e.height = t.data.h || t.globalData.compSize.h),
                (e.width = t.data.w || t.globalData.compSize.w),
                (e.pixelAspect = 1),
                (e.frameDuration = 1 / t.globalData.frameRate),
                (e.displayStartTime = 0),
                (e.numLayers = t.layers.length),
                e
              );
            };
          })(),
          TransformExpressionInterface = (function () {
            return function (t) {
              function e(l) {
                switch (l) {
                  case 'scale':
                  case 'Scale':
                  case 'ADBE Scale':
                  case 6:
                    return e.scale;
                  case 'rotation':
                  case 'Rotation':
                  case 'ADBE Rotation':
                  case 'ADBE Rotate Z':
                  case 10:
                    return e.rotation;
                  case 'ADBE Rotate X':
                    return e.xRotation;
                  case 'ADBE Rotate Y':
                    return e.yRotation;
                  case 'position':
                  case 'Position':
                  case 'ADBE Position':
                  case 2:
                    return e.position;
                  case 'ADBE Position_0':
                    return e.xPosition;
                  case 'ADBE Position_1':
                    return e.yPosition;
                  case 'ADBE Position_2':
                    return e.zPosition;
                  case 'anchorPoint':
                  case 'AnchorPoint':
                  case 'Anchor Point':
                  case 'ADBE AnchorPoint':
                  case 1:
                    return e.anchorPoint;
                  case 'opacity':
                  case 'Opacity':
                  case 11:
                    return e.opacity;
                  default:
                    return null;
                }
              }

              Object.defineProperty(e, 'rotation', {
                get: ExpressionPropertyInterface(t.r || t.rz),
              }),
                Object.defineProperty(e, 'zRotation', {
                  get: ExpressionPropertyInterface(t.rz || t.r),
                }),
                Object.defineProperty(e, 'xRotation', {
                  get: ExpressionPropertyInterface(t.rx),
                }),
                Object.defineProperty(e, 'yRotation', {
                  get: ExpressionPropertyInterface(t.ry),
                }),
                Object.defineProperty(e, 'scale', {
                  get: ExpressionPropertyInterface(t.s),
                });
              var i, r, s, a;
              return (
                t.p
                  ? (a = ExpressionPropertyInterface(t.p))
                  : ((i = ExpressionPropertyInterface(t.px)),
                    (r = ExpressionPropertyInterface(t.py)),
                    t.pz && (s = ExpressionPropertyInterface(t.pz))),
                Object.defineProperty(e, 'position', {
                  get: function () {
                    return t.p ? a() : [i(), r(), s ? s() : 0];
                  },
                }),
                Object.defineProperty(e, 'xPosition', {
                  get: ExpressionPropertyInterface(t.px),
                }),
                Object.defineProperty(e, 'yPosition', {
                  get: ExpressionPropertyInterface(t.py),
                }),
                Object.defineProperty(e, 'zPosition', {
                  get: ExpressionPropertyInterface(t.pz),
                }),
                Object.defineProperty(e, 'anchorPoint', {
                  get: ExpressionPropertyInterface(t.a),
                }),
                Object.defineProperty(e, 'opacity', {
                  get: ExpressionPropertyInterface(t.o),
                }),
                Object.defineProperty(e, 'skew', {
                  get: ExpressionPropertyInterface(t.sk),
                }),
                Object.defineProperty(e, 'skewAxis', {
                  get: ExpressionPropertyInterface(t.sa),
                }),
                Object.defineProperty(e, 'orientation', {
                  get: ExpressionPropertyInterface(t.or),
                }),
                e
              );
            };
          })(),
          ProjectInterface = (function () {
            function t(e) {
              this.compositions.push(e);
            }

            return function () {
              function e(i) {
                for (var r = 0, s = this.compositions.length; r < s; ) {
                  if (
                    this.compositions[r].data &&
                    this.compositions[r].data.nm === i
                  )
                    return (
                      this.compositions[r].prepareFrame &&
                        this.compositions[r].data.xt &&
                        this.compositions[r].prepareFrame(this.currentFrame),
                      this.compositions[r].compInterface
                    );
                  r += 1;
                }
                return null;
              }

              return (
                (e.compositions = []),
                (e.currentFrame = 0),
                (e.registerComposition = t),
                e
              );
            };
          })(),
          EffectsExpressionInterface = (function () {
            var t = { createEffectsInterface: e };

            function e(s, a) {
              if (s.effectsManager) {
                var l = [],
                  m = s.data.ef,
                  d,
                  g = s.effectsManager.effectElements.length;
                for (d = 0; d < g; d += 1)
                  l.push(i(m[d], s.effectsManager.effectElements[d], a, s));
                var x = s.data.ef || [],
                  b = function (y) {
                    for (d = 0, g = x.length; d < g; ) {
                      if (y === x[d].nm || y === x[d].mn || y === x[d].ix)
                        return l[d];
                      d += 1;
                    }
                    return null;
                  };
                return (
                  Object.defineProperty(b, 'numProperties', {
                    get: function () {
                      return x.length;
                    },
                  }),
                  b
                );
              }
              return null;
            }

            function i(s, a, l, m) {
              function d(u) {
                for (var k = s.ef, f = 0, h = k.length; f < h; ) {
                  if (u === k[f].nm || u === k[f].mn || u === k[f].ix)
                    return k[f].ty === 5 ? x[f] : x[f]();
                  f += 1;
                }
                throw new Error();
              }

              var g = propertyGroupFactory(d, l),
                x = [],
                b,
                y = s.ef.length;
              for (b = 0; b < y; b += 1)
                s.ef[b].ty === 5
                  ? x.push(
                      i(
                        s.ef[b],
                        a.effectElements[b],
                        a.effectElements[b].propertyGroup,
                        m,
                      ),
                    )
                  : x.push(r(a.effectElements[b], s.ef[b].ty, m, g));
              return (
                s.mn === 'ADBE Color Control' &&
                  Object.defineProperty(d, 'color', {
                    get: function () {
                      return x[0]();
                    },
                  }),
                Object.defineProperties(d, {
                  numProperties: {
                    get: function () {
                      return s.np;
                    },
                  },
                  _name: { value: s.nm },
                  propertyGroup: { value: g },
                }),
                (d.enabled = s.en !== 0),
                (d.active = d.enabled),
                d
              );
            }

            function r(s, a, l, m) {
              var d = ExpressionPropertyInterface(s.p);

              function g() {
                return a === 10 ? l.comp.compInterface(s.p.v) : d();
              }

              return (
                s.p.setGroupProperty &&
                  s.p.setGroupProperty(PropertyInterface('', m)),
                g
              );
            }

            return t;
          })(),
          MaskManagerInterface = (function () {
            function t(i, r) {
              (this._mask = i), (this._data = r);
            }

            Object.defineProperty(t.prototype, 'maskPath', {
              get: function () {
                return (
                  this._mask.prop.k && this._mask.prop.getValue(),
                  this._mask.prop
                );
              },
            }),
              Object.defineProperty(t.prototype, 'maskOpacity', {
                get: function () {
                  return (
                    this._mask.op.k && this._mask.op.getValue(),
                    this._mask.op.v * 100
                  );
                },
              });
            var e = function (i) {
              var r = createSizedArray(i.viewData.length),
                s,
                a = i.viewData.length;
              for (s = 0; s < a; s += 1)
                r[s] = new t(i.viewData[s], i.masksProperties[s]);
              var l = function (m) {
                for (s = 0; s < a; ) {
                  if (i.masksProperties[s].nm === m) return r[s];
                  s += 1;
                }
                return null;
              };
              return l;
            };
            return e;
          })(),
          ExpressionPropertyInterface = (function () {
            var t = { pv: 0, v: 0, mult: 1 },
              e = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };

            function i(l, m, d) {
              Object.defineProperty(l, 'velocity', {
                get: function () {
                  return m.getVelocityAtTime(m.comp.currentFrame);
                },
              }),
                (l.numKeys = m.keyframes ? m.keyframes.length : 0),
                (l.key = function (g) {
                  if (!l.numKeys) return 0;
                  var x = '';
                  's' in m.keyframes[g - 1]
                    ? (x = m.keyframes[g - 1].s)
                    : 'e' in m.keyframes[g - 2]
                    ? (x = m.keyframes[g - 2].e)
                    : (x = m.keyframes[g - 2].s);
                  var b =
                    d === 'unidimensional'
                      ? new Number(x)
                      : Object.assign({}, x);
                  return (
                    (b.time =
                      m.keyframes[g - 1].t / m.elem.comp.globalData.frameRate),
                    (b.value = d === 'unidimensional' ? x[0] : x),
                    b
                  );
                }),
                (l.valueAtTime = m.getValueAtTime),
                (l.speedAtTime = m.getSpeedAtTime),
                (l.velocityAtTime = m.getVelocityAtTime),
                (l.propertyGroup = m.propertyGroup);
            }

            function r(l) {
              (!l || !('pv' in l)) && (l = t);
              var m = 1 / l.mult,
                d = l.pv * m,
                g = new Number(d);
              return (
                (g.value = d),
                i(g, l, 'unidimensional'),
                function () {
                  return (
                    l.k && l.getValue(),
                    (d = l.v * m),
                    g.value !== d &&
                      ((g = new Number(d)),
                      (g.value = d),
                      i(g, l, 'unidimensional')),
                    g
                  );
                }
              );
            }

            function s(l) {
              (!l || !('pv' in l)) && (l = e);
              var m = 1 / l.mult,
                d = (l.data && l.data.l) || l.pv.length,
                g = createTypedArray('float32', d),
                x = createTypedArray('float32', d);
              return (
                (g.value = x),
                i(g, l, 'multidimensional'),
                function () {
                  l.k && l.getValue();
                  for (var b = 0; b < d; b += 1)
                    (x[b] = l.v[b] * m), (g[b] = x[b]);
                  return g;
                }
              );
            }

            function a() {
              return t;
            }

            return function (l) {
              return l ? (l.propType === 'unidimensional' ? r(l) : s(l)) : a;
            };
          })();
        (function () {
          var t = (function () {
              function i(r, s) {
                return (
                  (this.textIndex = r + 1),
                  (this.textTotal = s),
                  (this.v = this.getValue() * this.mult),
                  this.v
                );
              }

              return function (s, a) {
                (this.pv = 1),
                  (this.comp = s.comp),
                  (this.elem = s),
                  (this.mult = 0.01),
                  (this.propType = 'textSelector'),
                  (this.textTotal = a.totalChars),
                  (this.selectorValue = 100),
                  (this.lastValue = [1, 1, 1]),
                  (this.k = !0),
                  (this.x = !0),
                  (this.getValue = ExpressionManager.initiateExpression.bind(
                    this,
                  )(s, a, this)),
                  (this.getMult = i),
                  (this.getVelocityAtTime =
                    expressionHelpers.getVelocityAtTime),
                  this.kf
                    ? (this.getValueAtTime =
                        expressionHelpers.getValueAtTime.bind(this))
                    : (this.getValueAtTime =
                        expressionHelpers.getStaticValueAtTime.bind(this)),
                  (this.setGroupProperty = expressionHelpers.setGroupProperty);
              };
            })(),
            e = TextSelectorProp.getTextSelectorProp;
          TextSelectorProp.getTextSelectorProp = function (i, r, s) {
            return r.t === 1
              ? new TextExpressionSelectorPropFactory(i, r, s)
              : e(i, r, s);
          };
        })();

        function SliderEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }

        function AngleEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }

        function ColorEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
        }

        function PointEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
        }

        function LayerIndexEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }

        function MaskIndexEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }

        function CheckboxEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }

        function NoValueEffect() {
          this.p = {};
        }

        function EffectsManager(t, e) {
          var i = t.ef || [];
          this.effectElements = [];
          var r,
            s = i.length,
            a;
          for (r = 0; r < s; r += 1)
            (a = new GroupEffect(i[r], e)), this.effectElements.push(a);
        }

        function GroupEffect(t, e) {
          this.init(t, e);
        }

        extendPrototype([DynamicPropertyContainer], GroupEffect),
          (GroupEffect.prototype.getValue =
            GroupEffect.prototype.iterateDynamicProperties),
          (GroupEffect.prototype.init = function (t, e) {
            (this.data = t),
              (this.effectElements = []),
              this.initDynamicPropertyContainer(e);
            var i,
              r = this.data.ef.length,
              s,
              a = this.data.ef;
            for (i = 0; i < r; i += 1) {
              switch (((s = null), a[i].ty)) {
                case 0:
                  s = new SliderEffect(a[i], e, this);
                  break;
                case 1:
                  s = new AngleEffect(a[i], e, this);
                  break;
                case 2:
                  s = new ColorEffect(a[i], e, this);
                  break;
                case 3:
                  s = new PointEffect(a[i], e, this);
                  break;
                case 4:
                case 7:
                  s = new CheckboxEffect(a[i], e, this);
                  break;
                case 10:
                  s = new LayerIndexEffect(a[i], e, this);
                  break;
                case 11:
                  s = new MaskIndexEffect(a[i], e, this);
                  break;
                case 5:
                  s = new EffectsManager(a[i], e, this);
                  break;
                default:
                  s = new NoValueEffect(a[i], e, this);
                  break;
              }
              s && this.effectElements.push(s);
            }
          });
        var lottie = {};

        function setLocationHref(t) {
          locationHref = t;
        }

        function searchAnimations() {
          standalone === !0
            ? animationManager.searchAnimations(
                animationData,
                standalone,
                renderer,
              )
            : animationManager.searchAnimations();
        }

        function setSubframeRendering(t) {
          subframeEnabled = t;
        }

        function loadAnimation(t) {
          return (
            standalone === !0 && (t.animationData = JSON.parse(animationData)),
            animationManager.loadAnimation(t)
          );
        }

        function setQuality(t) {
          if (typeof t == 'string')
            switch (t) {
              case 'high':
                defaultCurveSegments = 200;
                break;
              default:
              case 'medium':
                defaultCurveSegments = 50;
                break;
              case 'low':
                defaultCurveSegments = 10;
                break;
            }
          else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
          defaultCurveSegments >= 50 ? roundValues(!1) : roundValues(!0);
        }

        function inBrowser() {
          return typeof navigator < 'u';
        }

        function installPlugin(t, e) {
          t === 'expressions' && (expressionsPlugin = e);
        }

        function getFactory(t) {
          switch (t) {
            case 'propertyFactory':
              return PropertyFactory;
            case 'shapePropertyFactory':
              return ShapePropertyFactory;
            case 'matrix':
              return Matrix;
            default:
              return null;
          }
        }

        (lottie.play = animationManager.play),
          (lottie.pause = animationManager.pause),
          (lottie.setLocationHref = setLocationHref),
          (lottie.togglePause = animationManager.togglePause),
          (lottie.setSpeed = animationManager.setSpeed),
          (lottie.setDirection = animationManager.setDirection),
          (lottie.stop = animationManager.stop),
          (lottie.searchAnimations = searchAnimations),
          (lottie.registerAnimation = animationManager.registerAnimation),
          (lottie.loadAnimation = loadAnimation),
          (lottie.setSubframeRendering = setSubframeRendering),
          (lottie.resize = animationManager.resize),
          (lottie.goToAndStop = animationManager.goToAndStop),
          (lottie.destroy = animationManager.destroy),
          (lottie.setQuality = setQuality),
          (lottie.inBrowser = inBrowser),
          (lottie.installPlugin = installPlugin),
          (lottie.freeze = animationManager.freeze),
          (lottie.unfreeze = animationManager.unfreeze),
          (lottie.setVolume = animationManager.setVolume),
          (lottie.mute = animationManager.mute),
          (lottie.unmute = animationManager.unmute),
          (lottie.getRegisteredAnimations =
            animationManager.getRegisteredAnimations),
          (lottie.__getFactory = getFactory),
          (lottie.version = '5.7.8');

        function getQueryVariable(t) {
          for (var e = queryString.split('&'), i = 0; i < e.length; i += 1) {
            var r = e[i].split('=');
            if (decodeURIComponent(r[0]) == t) return decodeURIComponent(r[1]);
          }
          return null;
        }

        var standalone = '__[STANDALONE]__',
          animationData = '__[ANIMATIONDATA]__',
          renderer = '',
          queryString;
        if (standalone) {
          var scripts = document.getElementsByTagName('script'),
            index = scripts.length - 1,
            myScript = scripts[index] || { src: '' };
          (queryString = myScript.src.replace(/^[^\?]+\??/, '')),
            (renderer = getQueryVariable('renderer'));
        }
        return searchAnimations(), lottie;
      });
  });
  rt();
  rt();
  rt();
  var Pe = class {
      constructor(e) {
        (this.settings = {
          inertia: 0.1,
          dragSpeed: 2,
          ...e,
        }),
          (this.docEl = document.scrollingElement || document.documentElement),
          (this.bounds = {
            vh: window.innerHeight,
            vw: window.innerWidth,
          }),
          (this.syncTrain = []),
          (this.touch = G.touchDevice),
          Q(this, ['resize', 'update', 'init']),
          this.init(),
          this.listeners(),
          mt.add({ update: this.update }),
          typeof window.ResizeObserver === void 0
            ? It.add({ update: this.resize })
            : ((this.observer = new ResizeObserver(() => {
                this.resize();
              })),
              this.observer.observe(this.docEl, { box: 'border-box' }));
      }

      init() {
        (this.scrollContent = B('[data-scroll-content]', this.docEl)),
          (this.scrollSections = et(
            '[data-scroll-section]',
            this.scrollContent,
          )),
          (this.scrollSections =
            this.scrollSections.length === 0
              ? [this.scrollContent]
              : this.scrollSections),
          (this.instance = {
            cur: this.getScroll,
            target: this.getScroll,
            inertia: this.settings.inertia,
          }),
          (this.drag = {
            isDragging: !1,
            snap: { x: 0, y: 0 },
            cur: { x: 0, y: 0 },
            lastScroll: this.getScroll,
          }),
          this.resize(),
          this.style(),
          this.anchors(),
          this.unlock(),
          (this.shouldAnimate = !0),
          this.update();
      }

      get getScroll() {
        return window.pageYOffset;
      }

      clamp(e) {
        return Nt(e, 0, this.scrollHeight);
      }

      listeners() {
        if (G.mobile) return;
        let e = (d) => {
          this.instance.cur = this.clamp(d);
        };
        (this.firefox = G.firefox),
          X.add(window, 'wheel', (d) => {
            if (this.drag.isDragging || this.locked) return;
            let g = d.deltaY;
            this.firefox && d.deltaMode === 1 && (g *= 60),
              e(this.instance.cur + g),
              (this.shouldAnimate = !0);
          });
        let i = 1,
          r = this.bounds.vh - 40;
        X.add(document, 'keydown', (d) => {
          this.locked ||
            (d.key === 'ArrowDown'
              ? e(this.instance.cur + 100)
              : d.key === 'ArrowUp'
              ? e(this.instance.cur - 100)
              : d.code == 'Space' &&
                d.target.nodeName !== 'INPUT' &&
                d.target.nodeName !== 'TEXTAREA'
              ? ((i = d.shiftKey ? -1 : 1), e(this.instance.cur + r * i))
              : d.key === 'PageDown'
              ? e(this.instance.cur + this.bounds.vh)
              : d.key === 'PageUp' && e(this.instance.cur - this.bounds.vh));
        });
        let s = 'touch',
          a = 'start',
          l = 'end',
          m = !0;
        this.touch ||
          ((s = window.PointerEvent ? 'pointer' : 'mouse'),
          (a = 'down'),
          (l = 'up'),
          (m = !1)),
          X.add(window, `${s}${a}`, (d) => {
            this.locked ||
              ((this.drag.isDragging = !0),
              (this.drag.snap.y = m ? d.changedTouches[0].clientY : d.clientY),
              (this.drag.lastScroll = this.instance.cur));
          }),
          X.add(window, `${s}move`, (d) => {
            if (!this.drag.isDragging || this.locked) return;
            this.drag.cur.y = m ? d.changedTouches[0].clientY : d.clientY;
            let g =
              (this.drag.cur.y - this.drag.snap.y) * this.settings.dragSpeed;
            Math.abs(g) < 15 ||
              (e(this.drag.lastScroll - g), (this.shouldAnimate = !0));
          }),
          X.add(window, `${s}${l}`, (d) => {
            this.locked || !this.drag.isDragging || (this.drag.isDragging = !1);
          });
      }

      scrollTo(e) {
        e = this.clamp(e);
        let i = Nt(Math.floor(Math.abs(window.scrollY - e) / 1e3), 2, 6);
        this.touch
          ? window.scrollTo({
              top: e,
              behavior: 'smooth',
            })
          : oe({
              val: [this.instance.cur, e + this.instance.cur],
              duration: Math.abs(this.instance.cur - e) * i * 0.05,
              easing: 'io' + i,
              update: ({ cur: r }) => {
                this.instance.cur = r;
              },
            });
      }

      anchors() {
        this.anchorListeners &&
          this.anchorListeners.length &&
          this.anchorListeners.forEach((i) => {
            i();
          }),
          (this.anchorListeners = []);
        let e = X.add('[data-scroll-top]', 'click', () => {
          this.scrollTo(0);
        });
        this.anchorListeners.push(e),
          et('[data-scroll-to]').forEach((i) => {
            let r = X.add(i, 'click', () => {
              this.scrollTo(pt(B(i.dataset.scrollTo)).top);
            });
            this.anchorListeners.push(r);
          });
      }

      style() {
        this.touch ||
          ((document.body.style.overscrollBehavior = 'none'),
          (this.scrollContent.style =
            'width: 100vw; min-height: 100vh; position:fixed;'),
          this.scrollSections.forEach((e) => {
            e.dataset.scrollContain === void 0 && (e.style.contain = 'content');
          }),
          G.firefox &&
            X.add(
              'img',
              'dragstart',
              (e) => {
                e.preventDefault();
              },
              { passive: !1 },
            ));
      }

      resize(e = { vw: window.innerWidth, vh: window.innerHeight }) {
        (this.bounds = e),
          (this.scrollHeight =
            Math.max(pt(this.scrollContent).height, this.bounds.vh) -
            this.bounds.vh),
          (this.cache = []);
        let i = 1;
        for (let r of this.scrollSections) {
          let s = r.offsetTop;
          r.dataset.scrollSpeed !== void 0
            ? (i = parseFloat(r.dataset.scrollSpeed))
            : (i = 1),
            this.cache.push({
              visible: !0,
              top: s - this.bounds.vh,
              bottom: s + r.scrollHeight,
              speed: i,
              progress: 0,
              track: r.dataset.scrollTrack,
            });
        }
        (this.instance.cur = this.clamp(this.instance.cur)),
          (this.shouldAnimate = !0),
          this.update();
      }

      update(e = 1e3 / 60) {
        if (
          (!this.shouldAnimate && this.animComplete) ||
          this.locked ||
          this.touch
        )
          return;
        this.instance.target = Ot(
          this.instance.target,
          this.instance.cur,
          this.instance.inertia,
        );
        let i = this.instance.target;
        this.scrollSections.forEach((r, s) => {
          let a = this.cache[s],
            l = r.style,
            m = i * a.speed;
          if (i >= a.top && i < a.bottom) {
            (l.transform = `translate3d(0, ${-m}px, 0)`),
              (a.visible = !0),
              (l.pointerEvents = 'all'),
              (l.opacity = 1);
            let d = a.bottom - a.top;
            a.progress = (i - (a.top - this.bounds.vh)) / (d + this.bounds.vh);
          } else
            a.visible &&
              ((l.pointerEvents = 'none'),
              (l.opacity = 0),
              (l.transform = 'none'),
              (a.visible = !1));
        });
        for (let r of this.syncTrain) r(this.instance.target, this.cache);
        this.shouldAnimate = !1;
      }

      get animComplete() {
        return Bt(this.instance.cur) === Bt(this.instance.target);
      }

      sync(e) {
        return (
          this.syncTrain.push(e),
          () => {
            this.syncTrain.splice(this.syncTrain.length - 1, 1);
          }
        );
      }

      lock() {
        this.locked = !0;
      }

      unlock() {
        this.locked = !1;
      }
    },
    Kt = new Pe({ inertia: G.touchDevice ? 0.125 : 0.075, dragSpeed: 3 });
  var Li = new DOMParser();
  window.requestIdleCallback === void 0 &&
    (window.requestIdleCallback = (t, e = 1e3) =>
      setTimeout(() => {
        requestAnimationFrame(t);
      }, e));
  var Di = (t, e, i) => i.indexOf(t) === e,
    le = class {
      constructor({
        root: e = '[data-hydra-root]',
        content: i = '[data-hydra-content]',
        controllers: r,
        loader: s,
        preload: a,
      }) {
        Object.assign(this, {
          root: B(e),
          content: i,
          controllers: r,
          loader: s,
        }),
          (this.state = {}),
          (this.cache = new Map()),
          (this.isRunning = !1),
          this.init(),
          this.loader(() => {
            requestIdleCallback(() => {
              this.controllers[this.state.name].show({
                done: () => {
                  (this.isRunning = !1),
                    requestIdleCallback(() => {
                      this.preload(a);
                    });
                },
              });
            });
          });
      }

      preload(e = []) {
        e.forEach((i) => {
          this.cache.has(i) || this.network(i);
        });
      }

      init() {
        let e = B(this.content),
          i = document.title,
          r = e.dataset.hydraContent;
        this.cache.set(window.location.href, { title: i, view: e, name: r }),
          Object.assign(this.state, {
            title: i,
            view: e,
            name: r,
          }),
          this.listeners(!0);
      }

      listeners(e = !1) {
        (this.links = et(
          'a:not([target]):not([href|="#"]):not([data-hydra-disabled])',
        )),
          (this.cleanup = X.add(
            this.links,
            'click',
            (r) => {
              if (
                r.ctrlKey ||
                r.altKey ||
                r.shiftKey ||
                r.metaKey ||
                (r.preventDefault(), this.isRunning)
              )
                return;
              let s = r.target;
              for (; s.tagName !== 'A'; ) s = s.parentNode;
              this.fetch({ url: s.href });
            },
            { passive: !1 },
          ));
        let i = this.links.map((r) => {
          let s = r;
          for (; s.tagName !== 'A'; ) s = s.parentNode;
          return s.href;
        });
        requestIdleCallback(() => {
          this.preload(i.filter(Di));
        }),
          e &&
            X.add(window, 'popstate', (r) => {
              r.stopPropagation();
              let s = window.location.href;
              if (this.isRunning) {
                let a = this.cache.get(s),
                  l = a.view,
                  m = a.title,
                  d = a.name;
                (this.kill = !0), this.swap({ name: d, title: m, view: l });
              } else this.fetch({ url: s, fromPop: !0 });
            });
      }

      swap({ name: e, view: i, title: r }) {
        (this.root.innerHTML = i.outerHTML),
          (document.title = r),
          Object.assign(this.state, {
            title: r,
            view: i,
            name: e,
          }),
          this.controllers[e].show({
            done: () => {
              (this.isRunning = !1), this.cleanup(), this.listeners();
            },
          });
        try {
          gtag('set', 'page', data.url), gtag('send', 'pageview');
        } catch {}
      }

      network(e, i = !1) {
        let r;
        fetch(e)
          .then((s) => ((r = s.url), s.text()))
          .then((s) => {
            let a = Li.parseFromString(s, 'text/html'),
              l = B('[data-hydra-content]', a),
              m = a.title,
              d = l.dataset.hydraContent;
            this.cache.set(r, { view: l, title: m, name: d }), i && i(l, m, d);
          })
          .catch((s) => {
            console.warn('[HYRDA]:', s);
          });
      }

      fetch({ url: e, fromPop: i = !1 }) {
        let r = window.location.href;
        if (e === r && !i) return;
        this.isRunning = !0;
        let s = { url: e, fromPop: i },
          a = new Promise((m) => {
            if (this.cache.has(e)) {
              let d = this.cache.get(e);
              Object.assign(s, d), m();
            } else
              this.network(e, (d, g, x) => {
                Object.assign(s, { view: d, title: g, name: x }), m();
              });
          });
        a.then(() => {
          i || history.pushState({ page: e }, '', e);
        });
        let l = new Promise((m) => {
          this.controllers[this.state.name].hide({
            done: m,
            to: new URL(e).pathname.replaceAll('/', ''),
          });
        });
        Promise.all([a, l]).then(() => {
          if (this.kill) {
            this.kill = !1;
            return;
          }
          this.swap(s);
        });
      }
    },
    ut = class {
      constructor({ hide: e, show: i }) {
        (this.hide = ({ done: r, to: s }) => {
          Kt.lock(),
            e({
              done: () => {
                r(),
                  this.cleanup.forEach((a) => {
                    a();
                  });
              },
              to: s,
            });
        }),
          (this.show = ({ done: r }) => {
            window.scrollTo(0, 0),
              new Wt(),
              i({
                done: () => {
                  Kt.init(), r();
                },
              });
          }),
          (this.cleanup = []);
      }

      clean(e) {
        this.cleanup.push(e);
      }
    };
  rt();
  var Zt = { essential: [] },
    ti = [18, 16, 14];
  for (let t = 0; t <= ti.length + 1; t++)
    for (let e = 0; e <= ti[t]; e++)
      Zt.essential.push(
        '/static/lottie/' + (t + 1) + '/images/img_' + e + '.png',
      );
  for (let t = 1; t <= 8; t++) Zt.essential.push('/static/svg/' + t + '.svg');
  ['in', 'ln', 'tw', 'md'].forEach((t) => {
    Zt.essential.push('/static/footer/' + t + '.svg');
  });
  rt();
  rt();
  var K = class {
    constructor({
      targets: e,
      stagger: i = 0,
      delay: r = 0,
      auto: s = !1,
      easing: a = 'o6',
      duration: l = 1750,
      indent: m = 0,
      from: d = 102,
      to: g = 0,
    }) {
      Object.assign(this, {
        targets: H(e),
        stagger: i,
        delay: r,
        auto: s,
        easing: a,
        duration: l,
        indent: m,
        from: d,
        to: g,
      }),
        (this.cache = new Map()),
        this.targets.forEach((x, b) => {
          this.cache.set(b, x.textContent.replace(/\s\s+/g, ' ').trim());
        }),
        (this.triggered = !1),
        Q(this, ['resize', 'play', 'destroy']),
        (this.bounds = {
          vw: window.innerWidth,
          vh: window.innerHeight,
        }),
        It.add({ update: this.resize }),
        this.auto && this.observe(),
        this.getHidden(),
        this.resize({});
    }

    getHidden() {
      (this.hiddenDiv = B('#text-reveal')),
        (this.hiddenStyle = this.hiddenDiv.style);
    }

    resize(e = { vw: window.innerWidth, vh: window.innerHeight }) {
      if (this.bounds.vw === e.vw && this.bounds.vh === e.vh) return;
      (this.bounds = e),
        this.destroy(),
        this.indent &&
          (this.compIndent = this.indent * window.innerWidth * 0.01);
      let i = this.targets.length;
      for (let r = 0; r < i; r++) {
        let s = this.targets[r],
          a = s.offsetWidth,
          l = window.getComputedStyle(s),
          m = this.hiddenStyle;
        (m.fontFamily = l.getPropertyValue('font-family')),
          (m.fontSize = l.getPropertyValue('font-size')),
          (m.fontWeight = l.getPropertyValue('font-weight')),
          (m.letterSpacing = l.getPropertyValue('letter-spacing'));
        let d = [],
          g = [],
          x = this.cache.get(r).split(' '),
          b = x.length;
        for (let k = 0; k < b; k++) {
          let f = x[k];
          if (f === ' ') continue;
          g.push(f), (this.hiddenDiv.textContent = g.join(' '));
          let h = a;
          this.compIndent > 0 && d.length === 0 && (h = a - this.compIndent),
            this.hiddenDiv.offsetWidth >= h &&
              (g.pop(), d.push(g.join(' ')), (g = [f])),
            f === 'XBRX' && (g.pop(), d.push(g.join(' ')), (g = []));
        }
        d.push(g.join(' ')), (s.innerHTML = null);
        let y = document.createDocumentFragment(),
          u = d.length;
        for (let k = 0; k < u; k++) {
          let f = d[k],
            h = document.createElement('span');
          h.classList.add('l-wrapper');
          let p = document.createElement('span');
          p.classList.add('l-line'),
            this.triggered && (p.style.transform = 'none'),
            (p.innerText = f + ' '),
            h.appendChild(p),
            y.appendChild(h);
        }
        s.appendChild(y);
      }
      (this.targetLines = this.getTargets(this.targets)),
        this.compIndent &&
          (this.targetLines[0].style.textIndent = `${this.compIndent}px`),
        this.auto && !this.triggered && this.observeTargets(),
        (this.isResizing = !1);
    }

    getTargets(e) {
      let i = [];
      return (
        (e = H(e)),
        e.forEach((r) => {
          [...r.children].forEach((s) => {
            i.push(s.children[0]);
          });
        }),
        i
      );
    }

    play({
      targets: e = this.targetLines,
      delay: i = this.delay,
      to: r = this.to,
      from: s = this.from,
      duration: a = this.duration,
      easing: l = this.easing,
      stagger: m = this.stagger,
      reverse: d = !1,
    } = {}) {
      if (d && this.tween) this.tween.do('reverse', { targets: e, delay: 0 });
      else {
        this.tween && this.tween.do('destroy'),
          (this.tween = new lt({ duration: a, easing: l }));
        let g = e.length;
        for (let x = 0; x < g; x++) {
          let b = e[x];
          this.tween.add({
            targets: b,
            delay: i + x * m,
            transform: {
              y: [s, r],
              yu: '%',
              r: [
                [1, 0, 0, 45],
                [1, 0, 0, 0],
              ],
            },
          });
        }
      }
    }

    observe() {
      this.observer && this.observer.disconnect(),
        (this.observer = qt().create({
          callback: (e, i, r) => {
            i &&
              (this.play({ nodes: this.getTargets(e), from: this.from }),
              r(e),
              (this.triggered = !0));
          },
          threshold: 0.5,
        }));
    }

    observeTargets() {
      this.observer.observe(this.targets);
    }

    destroy() {
      this.observer && this.observer.disconnect();
    }
  };
  rt();
  var we = Ti(ii());
  rt();
  var Ee = (t) => {
      t.forEach((e, i) => {
        e.data.assets.forEach((r) => {
          r.u = '/static/lottie/' + e.path + '/images/';
        });
      });
    },
    Mt = class {
      constructor({ target: e, data: i, lazy: r = !1, observe: s = !0 }) {
        (this.target = H(e)[0]),
          (this.canvas = B('canvas', this.target)),
          Object.assign(this.canvas.style, {
            width: '100%',
            height: '100%',
            transformOrigin: '0 0 0',
            contain: 'content',
          }),
          (this.ctx = this.canvas.getContext('2d')),
          (this.data = i),
          (this.shouldObserve = s),
          Q(this, ['init', 'observe', 'destroy', 'change']),
          r ? requestIdleCallback(this.init) : this.init();
      }

      init() {
        (this.anim = we.default.loadAnimation({
          wrapper: this.canvas,
          renderer: 'canvas',
          loop: !0,
          autoplay: !1,
          animationData: this.data,
          rendererSettings: {
            context: this.ctx,
            clearCanvas: !0,
            scaleMode: 'noScale',
          },
        })),
          this.shouldObserve && this.observe();
      }

      change(e, i, r) {
        i
          ? this.anim.play()
          : requestIdleCallback(() => {
              this.anim.pause();
            });
      }

      destroy() {
        this.shouldObserve && this.o.disconnect(), this.anim.destroy();
      }

      observe() {
        (this.o = qt().create({ callback: this.change })),
          this.o.observe(this.target);
      }
    };
  rt();
  var Se = class {
      constructor({ speed: e = 4 }) {
        (this.speed = e),
          (this.height = 0),
          Q(this, ['update', 'resize']),
          Kt.sync(this.update),
          It.add({ update: this.resize });
      }

      init({ dom: e, track: i = 'bg', speed: r = 4 }) {
        (this.dom = H(e)[0]), (this.track = i), (this.speed = r), this.resize();
      }

      resize() {
        !this.dom || (this.height = pt(this.dom).height);
      }

      update(e) {
        !this.dom ||
          (this.dom.style.transform = `translate3d(0, ${Ot(
            this.height,
            0,
            e / Kt.scrollHeight,
          )}px, 0)`);
      }
    },
    zt = new Se({ speed: 4 });
  rt();
  var Et = class {
    constructor({ trigger: e = '#mobile-trigger', sail: i = '#nav-sail' }) {
      (this.trigger = H(e)[0]),
        (this.sail = H(i)[0]),
        (this.lines = et('.nav-line', this.sail)),
        (this.bg = et('.nav-el--bg', this.sail)),
        (this.arr = et('svg', this.sail)),
        (this.links = et('a', this.sail)),
        (this.body = document.body),
        (this.visible = !1),
        G.ios && (B('ul', this.sail).style.bottom = '10vw'),
        this.init(),
        this.listen();
    }

    init() {
      (this.opacity = new z({
        targets: this.sail,
        opacity: [0, 1],
        duration: 450,
        easing: 'o4',
      })),
        this.opacity.pause(),
        this.opacity.reverse(),
        (this.tl = new lt()),
        this.lines.forEach((e, i) => {
          this.tl.add({
            targets: e,
            transform: {
              y: [-102, 0],
              yu: '%',
              r: [
                [0, 0, 90, -90],
                [0, 0, 0, 0],
              ],
            },
            delay: 400 + i * 75,
            easing: 'o6',
            duration: 1250,
          });
        }),
        this.bg.forEach((e, i) => {
          this.tl.add({
            targets: e,
            transform: { x: [200, 0], xu: '%' },
            delay: i * 150,
            duration: 1500,
            easing: 'o6',
          });
        }),
        (this.arrTL = new Ft()),
        this.arr.forEach((e, i) => {
          let r = Gt({ targets: e, duration: 1800, easing: 'o6' }),
            s = new dt({
              duration: 250 + 200 * i,
              complete: () => {
                r.restart();
              },
            });
          this.arrTL.add(s),
            this.tl.add({
              targets: e,
              transform: {
                r: [
                  [0, 0, 90, -90],
                  [0, 0, 0, 0],
                ],
                sx: [0, 1],
                sy: [0, 1],
              },
              duration: 1250,
              easing: 'o6',
              delay: 250 + 250 * i,
            });
        }),
        this.arrTL.do('pause'),
        this.tl.pause();
    }

    listen() {
      (this.cleanTrigger = X.add(this.trigger, 'click', () => {
        this.handleChange();
      })),
        (this.cleanLinks = X.add(this.links, 'click', () => {
          this.handleChange();
        }));
    }

    handleChange() {
      (this.visible = !this.visible),
        this.opacity.tweens.completed && this.opacity.restart(),
        this.opacity.reverse(),
        this.visible &&
          (this.tl.do('restart'), this.arrTL.do('restart'), this.revert()),
        this.toggleClasses();
    }

    revert() {
      this.bg.forEach((e) => {
        e.style.transform = 'translateX(200%)';
      }),
        this.lines.forEach((e) => {
          e.style.transform = 'translateY(102%)';
        }),
        this.arr.forEach((e) => {
          e.style.transform = 'scale(0)';
        });
    }

    toggleClasses() {
      let e = this.visible ? 'add' : 'remove';
      this.body.classList[e]('oh'),
        this.trigger.classList[e]('active'),
        this.sail.classList[e]('pea');
    }

    destroy() {
      (this.visible = !1),
        this.cleanTrigger(),
        this.cleanLinks(),
        this.toggleClasses();
    }
  };
  var Ri = '5.7.7',
    Oi = 30,
    Bi = 0,
    $i = 300,
    Gi = 2028,
    zi = 1580,
    ji = '1',
    Ni = 0,
    qi = [
      { id: 'image_0', w: 267, h: 134, u: 'images/', p: 'img_0.png', e: 0 },
      {
        id: 'image_1',
        w: 688,
        h: 864,
        u: 'images/',
        p: 'img_1.png',
        e: 0,
      },
      { id: 'image_2', w: 232, h: 181, u: 'images/', p: 'img_2.png', e: 0 },
      {
        id: 'image_3',
        w: 218,
        h: 283,
        u: 'images/',
        p: 'img_3.png',
        e: 0,
      },
      { id: 'image_4', w: 696, h: 677, u: 'images/', p: 'img_4.png', e: 0 },
      {
        id: 'image_5',
        w: 255,
        h: 193,
        u: 'images/',
        p: 'img_5.png',
        e: 0,
      },
      { id: 'image_6', w: 466, h: 379, u: 'images/', p: 'img_6.png', e: 0 },
      {
        id: 'image_7',
        w: 261,
        h: 169,
        u: 'images/',
        p: 'img_7.png',
        e: 0,
      },
      { id: 'image_8', w: 149, h: 149, u: 'images/', p: 'img_8.png', e: 0 },
      {
        id: 'image_9',
        w: 244,
        h: 302,
        u: 'images/',
        p: 'img_9.png',
        e: 0,
      },
      { id: 'image_10', w: 172, h: 209, u: 'images/', p: 'img_10.png', e: 0 },
      {
        id: 'image_11',
        w: 242,
        h: 348,
        u: 'images/',
        p: 'img_11.png',
        e: 0,
      },
      { id: 'image_12', w: 41, h: 41, u: 'images/', p: 'img_12.png', e: 0 },
      {
        id: 'image_13',
        w: 24,
        h: 24,
        u: 'images/',
        p: 'img_13.png',
        e: 0,
      },
      { id: 'image_14', w: 36, h: 36, u: 'images/', p: 'img_14.png', e: 0 },
      {
        id: 'image_15',
        w: 31,
        h: 31,
        u: 'images/',
        p: 'img_15.png',
        e: 0,
      },
      { id: 'image_16', w: 13, h: 13, u: 'images/', p: 'img_16.png', e: 0 },
      {
        id: 'image_17',
        w: 38,
        h: 38,
        u: 'images/',
        p: 'img_17.png',
        e: 0,
      },
      { id: 'image_18', w: 52, h: 52, u: 'images/', p: 'img_18.png', e: 0 },
    ],
    Wi = [
      {
        ddd: 0,
        ind: 1,
        ty: 2,
        nm: 'arm voor vrouw',
        parent: 2,
        refId: 'image_0',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 32.032,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 76.076,
                s: [8],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 112.112,
                s: [0],
              },
              { t: 150.150390625, s: [0] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: { a: 0, k: [510.255, 133.22, 0], ix: 2, l: 2 },
          a: { a: 0, k: [245.08, 40.45, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 2,
        nm: 'basis vrouw',
        refId: 'image_1',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1633.05, 1072.407, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150.15,
                s: [1659.05, 1132.407, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              { t: 300.30078125, s: [1633.05, 1072.407, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [343.95, 431.527, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 3,
        ty: 2,
        nm: 'arm achter vrouw',
        parent: 2,
        refId: 'image_2',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-3],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 59.059,
                s: [-3],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 104.407,
                s: [6],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 138.138,
                s: [-3],
              },
              { t: 150.150390625, s: [-3] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: { a: 0, k: [502.07, 130.509, 0], ix: 2, l: 2 },
          a: { a: 0, k: [207.945, 135.325, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 4,
        ty: 2,
        nm: 'arm voor man',
        parent: 5,
        refId: 'image_3',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 41,
                s: [12],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 94,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 122,
                s: [5],
              },
              { t: 150, s: [0] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: { a: 0, k: [554.43, 134.903, 0], ix: 2, l: 2 },
          a: { a: 0, k: [51.22, 49.045, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 5,
        ty: 2,
        nm: 'basic man',
        refId: 'image_4',
        sr: 1,
        ks: {
          o: {
            a: 0,
            k: 100,
            ix: 11,
            x: `var $bm_rt;
$bm_rt = transform.opacity;`,
          },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-8],
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.333], y: [0] },
                t: 150,
                s: [3],
              },
              { t: 299, s: [-8] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [362.216, 478.236, 0],
                to: [-16.167, -81.833, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.333, y: 0 },
                t: 150,
                s: [424.216, 392.236, 0],
                to: [0, 0, 0],
                ti: [75.833, 4.167, 0],
              },
              { t: 299, s: [362.216, 478.236, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: {
            a: 0,
            k: [347.516, 338.153, 0],
            ix: 1,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.anchorPoint;`,
          },
          s: {
            a: 0,
            k: [100, 100, 100],
            ix: 6,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.scale;`,
          },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 6,
        ty: 2,
        nm: 'arm achter man',
        parent: 5,
        refId: 'image_5',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 21,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 57,
                s: [13],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 90,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 117,
                s: [13],
              },
              { t: 150, s: [0] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: { a: 0, k: [560.54, 119.308, 0], ix: 2, l: 2 },
          a: { a: 0, k: [35.11, 27.89, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 7,
        ty: 2,
        nm: 'driehoek achter man/1.ai',
        cl: 'ai',
        refId: 'image_6',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 79,
                s: [-15],
              },
              { t: 150, s: [0] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [268, 396, 0],
                to: [45.5, -48.833, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 79,
                s: [268, 292, 0],
                to: [0, 0, 0],
                ti: [-68.5, -41.333, 0],
              },
              { t: 150, s: [268, 396, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [233, 189.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 8,
        ty: 2,
        nm: 'driehoek',
        refId: 'image_7',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-36],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150.15,
                s: [33],
              },
              { t: 300.30078125, s: [-36] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1103.059, 981.316, 0],
                to: [-12.667, -41, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150.15,
                s: [1027.059, 735.316, 0],
                to: [0, 0, 0],
                ti: [-12.667, -41, 0],
              },
              { t: 300.30078125, s: [1103.059, 981.316, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [130.129, 84.396, 0], ix: 1, l: 2 },
          s: { a: 0, k: [113.085, 126.703, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 9,
        ty: 2,
        nm: 'cirkel 7',
        refId: 'image_8',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1346.611, 818.146, 0],
                to: [-30.833, -25.333, 0],
                ti: [35.833, 176.333, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150.15,
                s: [1161.611, 666.146, 0],
                to: [0, 0, 0],
                ti: [-17.833, -195.333, 0],
              },
              { t: 300.30078125, s: [1346.611, 818.146, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [74.204, 74.205, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 10,
        ty: 2,
        nm: 'halve cirkel',
        refId: 'image_9',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-40],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150.15,
                s: [30],
              },
              { t: 300.30078125, s: [-40] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [731.83, 734.595, 0],
                to: [29.833, -26.5, 0],
                ti: [19.167, 154.5, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150.15,
                s: [910.83, 575.595, 0],
                to: [0, 0, 0],
                ti: [29.833, -26.5, 0],
              },
              { t: 300.30078125, s: [731.83, 734.595, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [121.71, 150.725, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 11,
        ty: 2,
        nm: 'driehoek patroon',
        refId: 'image_10',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-63],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150.15,
                s: [-16],
              },
              { t: 300.30078125, s: [-63] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1363.153, 487.866, 0],
                to: [-12.5, 87, 0],
                ti: [34.5, -111, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150.15,
                s: [1198.153, 583.866, 0],
                to: [0, 0, 0],
                ti: [-27.5, 16, 0],
              },
              { t: 300.30078125, s: [1363.153, 487.866, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [85.59, 104.285, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 12,
        ty: 2,
        nm: 'rechthoek',
        refId: 'image_11',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [25],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150.15,
                s: [0],
              },
              { t: 300.30078125, s: [25] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1176.331, 699.929, 0],
                to: [-19.333, -11.5, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150.15,
                s: [1060.331, 630.929, 0],
                to: [0, 0, 0],
                ti: [-19.333, -11.5, 0],
              },
              { t: 300.30078125, s: [1176.331, 699.929, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [120.509, 173.625, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 13,
        ty: 2,
        nm: 'cirkel 6',
        refId: 'image_12',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [640.629, 579.571, 0],
                to: [-11.167, -3.667, 0],
                ti: [12.75, -8.75, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 103.104,
                s: [573.629, 557.571, 0],
                to: [-12.75, 8.75, 0],
                ti: [-11.167, -3.667, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 181.182,
                s: [564.129, 632.071, 0],
                to: [11.167, 3.667, 0],
                ti: [-12.75, 8.75, 0],
              },
              { t: 300.30078125, s: [640.629, 579.571, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [20.204, 20.204, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 14,
        ty: 2,
        nm: 'cirkel5',
        refId: 'image_13',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [782.108, 911.096, 0],
                to: [-5.5, -8.458, 0],
                ti: [12.208, 6.292, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 48.048,
                s: [749.108, 860.346, 0],
                to: [-12.208, -6.292, 0],
                ti: [6.75, -7.667, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 100.101,
                s: [708.858, 873.346, 0],
                to: [-6.75, 7.667, 0],
                ti: [-6.167, -8.667, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 156.156,
                s: [708.608, 906.346, 0],
                to: [6.167, 8.667, 0],
                ti: [-12.25, -0.792, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 216.216,
                s: [745.858, 925.346, 0],
                to: [12.25, 0.792, 0],
                ti: [-6.042, 2.375, 0],
              },
              { t: 300.30078125, s: [782.108, 911.096, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [11.995, 11.995, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 15,
        ty: 2,
        nm: 'cikel 4',
        refId: 'image_14',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [829.995, 891.143, 0],
                to: [-0.667, 9.167, 0],
                ti: [10.75, -9.083, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 59.059,
                s: [825.995, 946.143, 0],
                to: [-10.75, 9.083, 0],
                ti: [26.445, 21.518, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 115.115,
                s: [765.495, 945.643, 0],
                to: [-29.746, -24.204, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 179.179,
                s: [759.245, 884.393, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 248.248,
                s: [787.245, 861.893, 0],
                to: [0, 0, 0],
                ti: [-2.333, -17.667, 0],
              },
              { t: 300.30078125, s: [829.995, 891.143, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [17.981, 17.98, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 16,
        ty: 2,
        nm: 'cirkel 3',
        refId: 'image_15',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [869.151, 950.253, 0],
                to: [-4.583, 87.083, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 162.162,
                s: [763.651, 1015.253, 0],
                to: [0, 0, 0],
                ti: [-89.583, -22.5, 0],
              },
              { t: 300.30078125, s: [869.151, 950.253, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [15.464, 15.464, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 17,
        ty: 2,
        nm: 'paarse dot',
        refId: 'image_16',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [1157.83, 420.266, 0],
                to: [8.5, -19.833, 0],
                ti: [-31.333, 18.833, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 45.045,
                s: [1208.83, 301.266, 0],
                to: [31.333, -18.833, 0],
                ti: [-12.833, -19.833, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 121.121,
                s: [1345.83, 307.266, 0],
                to: [12.833, 19.833, 0],
                ti: [27.167, -16.167, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 169.169,
                s: [1285.83, 420.266, 0],
                to: [-27.167, 16.167, 0],
                ti: [21.333, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 230.23,
                s: [1182.83, 404.266, 0],
                to: [-21.333, 0, 0],
                ti: [4.167, -2.667, 0],
              },
              { t: 300.30078125, s: [1157.83, 420.266, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [6.235, 6.235, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 18,
        ty: 2,
        nm: 'cirkel 1',
        refId: 'image_17',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1112.654, 450.056, 0],
                to: [-9.5, -4.5, 0],
                ti: [15, -0.833, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 81.081,
                s: [1055.654, 423.056, 0],
                to: [-15, 0.833, 0],
                ti: [0.5, -11.5, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 120.12,
                s: [1022.654, 455.056, 0],
                to: [-0.5, 11.5, 0],
                ti: [-14.333, -4, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 167.167,
                s: [1052.654, 492.056, 0],
                to: [14.333, 4, 0],
                ti: [-10, 7, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 210.21,
                s: [1108.654, 479.056, 0],
                to: [10, -7, 0],
                ti: [-0.667, 4.833, 0],
              },
              { t: 300.30078125, s: [1112.654, 450.056, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [18.785, 18.785, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 19,
        ty: 2,
        nm: 'cirkel 2',
        refId: 'image_18',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [1419.368, 665.459, 0],
                to: [5.333, -4.667, 0],
                ti: [-9.333, -1.833, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 43.043,
                s: [1451.368, 637.459, 0],
                to: [9.333, 1.833, 0],
                ti: [4.167, -13, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 135.135,
                s: [1475.368, 676.459, 0],
                to: [-4.167, 13, 0],
                ti: [9.333, 1.833, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 216.216,
                s: [1426.368, 715.459, 0],
                to: [-9.333, -1.833, 0],
                ti: [1.167, 8.333, 0],
              },
              { t: 300.30078125, s: [1419.368, 665.459, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [25.74, 25.74, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
    ],
    Hi = [],
    Ae = {
      v: Ri,
      fr: Oi,
      ip: Bi,
      op: $i,
      w: Gi,
      h: zi,
      nm: ji,
      ddd: Ni,
      assets: qi,
      layers: Wi,
      markers: Hi,
    };
  var Xi = '5.7.7',
    Yi = 30,
    Ki = 0,
    Ui = 300,
    Zi = 893,
    Qi = 1046,
    Ji = '1 mobile',
    tr = 0,
    er = [
      { id: 'image_0', w: 351, h: 225, u: 'images/', p: 'img_0.png', e: 0 },
      {
        id: 'image_1',
        w: 879,
        h: 473,
        u: 'images/',
        p: 'img_1.png',
        e: 0,
      },
      { id: 'image_2', w: 625, h: 846, u: 'images/', p: 'img_2.png', e: 0 },
      {
        id: 'image_3',
        w: 399,
        h: 204,
        u: 'images/',
        p: 'img_3.png',
        e: 0,
      },
      { id: 'image_4', w: 422, h: 427, u: 'images/', p: 'img_4.png', e: 0 },
      {
        id: 'image_5',
        w: 36,
        h: 36,
        u: 'images/',
        p: 'img_5.png',
        e: 0,
      },
      { id: 'image_6', w: 60, h: 60, u: 'images/', p: 'img_6.png', e: 0 },
      {
        id: 'image_7',
        w: 24,
        h: 24,
        u: 'images/',
        p: 'img_7.png',
        e: 0,
      },
      { id: 'image_8', w: 71, h: 71, u: 'images/', p: 'img_8.png', e: 0 },
      {
        id: 'image_9',
        w: 307,
        h: 268,
        u: 'images/',
        p: 'img_9.png',
        e: 0,
      },
      { id: 'image_10', w: 1, h: 1, u: 'images/', p: 'img_10.png', e: 0 },
      {
        id: 'image_11',
        w: 1,
        h: 1,
        u: 'images/',
        p: 'img_11.png',
        e: 0,
      },
      { id: 'image_12', w: 1, h: 1, u: 'images/', p: 'img_12.png', e: 0 },
    ],
    ir = [
      {
        ddd: 0,
        ind: 1,
        ty: 2,
        nm: 'arm voor',
        refId: 'image_0',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 30,
                s: [6],
              },
              { t: 60, s: [0] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: { a: 0, k: [583.658, 439.225, 0], ix: 2, l: 2 },
          a: { a: 0, k: [312.325, 29.264, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 2,
        nm: 'been voor',
        refId: 'image_1',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [448.725, 800.406, 0], ix: 2, l: 2 },
          a: { a: 0, k: [439.425, 236.249, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 3,
        ty: 2,
        nm: 'vrouw',
        refId: 'image_2',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [355.338, 620.133, 0], ix: 2, l: 2 },
          a: { a: 0, k: [312.131, 422.519, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: 'vaas Outlines',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [216.008, 619.861, 0], ix: 2, l: 2 },
          a: { a: 0, k: [109.466, 182.657, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 1,
                  k: [
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 0,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 8,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 15,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 23,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 30,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 38,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 45,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 53,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 59,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 67,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 74,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 82,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 89,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 97,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 104,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 112,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 119,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 127,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 134,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 142,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 149,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 157,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 164,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 172,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 178,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 186,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 193,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 201,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 208,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 216,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 223,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 231,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 238,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 246,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 253,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 261,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 268,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 276,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 284,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 293,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 0.833 },
                      o: { x: 0.167, y: 0.167 },
                      t: 300,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.618, -68.564],
                            [56.088, -172.925],
                            [-56.089, -172.925],
                            [-42.956, -68.363],
                            [-99.762, 46.116],
                            [-0.001, 172.925],
                            [99.762, 46.116],
                          ],
                          c: !0,
                        },
                      ],
                    },
                    {
                      t: 305,
                      s: [
                        {
                          i: [
                            [33.777, 20.317],
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [0, -50.484],
                            [-55.097, 0],
                            [0, 70.034],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [0, 0],
                            [-33.595, 20.405],
                            [0, 70.034],
                            [55.097, 0],
                            [0, -50.653],
                          ],
                          v: [
                            [42.748, -64.064],
                            [56.219, -168.425],
                            [-55.959, -168.425],
                            [-42.826, -63.863],
                            [-99.632, 50.616],
                            [-0.001, 172.925],
                            [99.893, 50.616],
                          ],
                          c: !0,
                        },
                      ],
                    },
                  ],
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: {
                  a: 0,
                  k: [0.308998347264, 0.308998347264, 0.308998347264, 1],
                  ix: 3,
                },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 4, ix: 5 },
                lc: 2,
                lj: 2,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'fl',
                c: {
                  a: 0,
                  k: [0.543123252719, 0.549761962891, 0.928911635455, 1],
                  ix: 4,
                },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [109.762, 182.925], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 6,
        ty: 2,
        nm: 'arm achter',
        refId: 'image_3',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 30,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 60,
                s: [-5],
              },
              { t: 90, s: [0] },
            ],
            ix: 10,
            x: `var $bm_rt;
transform.rotation;
$bm_rt = loopOut();`,
          },
          p: { a: 0, k: [538.548, 419.011, 0], ix: 2, l: 2 },
          a: { a: 0, k: [342.011, 40.58, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 7,
        ty: 2,
        nm: 'been achter',
        refId: 'image_4',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [317.755, 823.533, 0], ix: 2, l: 2 },
          a: { a: 0, k: [210.966, 213.119, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 8,
        ty: 2,
        nm: 'Layer 8',
        refId: 'image_5',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [108.434, 527.247, 0],
                to: [-7.333, -10.5, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 66.139,
                s: [64.434, 464.247, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.167, y: 0 },
                t: 144.678,
                s: [108.434, 527.247, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 220.461,
                s: [64.434, 464.247, 0],
                to: [0, 0, 0],
                ti: [-7.333, -10.5, 0],
              },
              { t: 299, s: [108.434, 527.247, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [17.812, 17.812, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 9,
        ty: 2,
        nm: 'Layer 9',
        refId: 'image_6',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [819.735, 575.467, 0],
                to: [0, 0, 0],
                ti: [45.58, 37.062, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 32.456,
                s: [842.485, 505.217, 0],
                to: [-34.574, -28.113, 0],
                ti: [4.797, -2.935, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 67,
                s: [749.047, 491.065, 0],
                to: [-4.797, 2.935, 0],
                ti: [-18.75, -30.833, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 109.649,
                s: [743.485, 573.217, 0],
                to: [15.25, 7.083, 0],
                ti: [-24, 9.917, 0],
              },
              { t: 150, s: [819.735, 575.467, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
transform.position;
$bm_rt = loopOut();`,
          },
          a: { a: 0, k: [29.531, 29.531, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 10,
        ty: 2,
        nm: 'Layer 10',
        refId: 'image_7',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [330.632, 279.174, 0],
                to: [3.333, -1.5, 0],
                ti: [-5.75, -1.333, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 68.182,
                s: [350.632, 270.174, 0],
                to: [5.75, 1.333, 0],
                ti: [0.833, -6.583, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 136.363,
                s: [365.132, 287.174, 0],
                to: [-0.833, 6.583, 0],
                ti: [5.75, 1.333, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 211.363,
                s: [345.632, 309.674, 0],
                to: [-5.75, -1.333, 0],
                ti: [2.5, 5.083, 0],
              },
              { t: 300, s: [330.632, 279.174, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [11.968, 11.969, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 11,
        ty: 2,
        nm: 'Layer 11',
        refId: 'image_8',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [212.764, 182.589, 0],
                to: [51.333, -17.333, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 156,
                s: [520.764, 78.589, 0],
                to: [0, 0, 0],
                ti: [51.333, -17.333, 0],
              },
              { t: 300, s: [212.764, 182.589, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.position;`,
          },
          a: { a: 0, k: [35.39, 35.391, 0], ix: 1, l: 2 },
          s: {
            a: 0,
            k: [100, 100, 100],
            ix: 6,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.scale;`,
          },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 12,
        ty: 2,
        nm: 'patroon',
        refId: 'image_9',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-59.343],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 149,
                s: [-90.343],
              },
              { t: 299, s: [-59.343] },
            ],
            ix: 10,
            x: `var $bm_rt;
$bm_rt = transform.rotation;`,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [699.404, 339.136, 0],
                to: [11.167, -19.333, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 149,
                s: [766.404, 223.136, 0],
                to: [0, 0, 0],
                ti: [11.167, -19.333, 0],
              },
              { t: 299, s: [699.404, 339.136, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.position;`,
          },
          a: { a: 0, k: [153.176, 133.685, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 13,
        ty: 2,
        nm: 'Layer 15',
        refId: 'image_10',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [0, 1045.51, 0], ix: 2, l: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 14,
        ty: 2,
        nm: 'Laag 13',
        refId: 'image_11',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [0, 1045.51, 0], ix: 2, l: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 15,
        ty: 2,
        nm: 'Layer 16',
        refId: 'image_12',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [0, 1045.51, 0], ix: 2, l: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300.3003003003,
        st: 0,
        bm: 0,
      },
    ],
    rr = [],
    Te = {
      v: Xi,
      fr: Yi,
      ip: Ki,
      op: Ui,
      w: Zi,
      h: Qi,
      nm: Ji,
      ddd: tr,
      assets: er,
      layers: ir,
      markers: rr,
    };
  var sr = '5.7.7',
    ar = 30,
    nr = 0,
    or = 300,
    lr = 1615,
    hr = 1613,
    fr = '2',
    pr = 0,
    cr = [
      { id: 'image_0', w: 138, h: 35, u: 'images/', p: 'img_0.png', e: 0 },
      {
        id: 'image_1',
        w: 94,
        h: 38,
        u: 'images/',
        p: 'img_1.png',
        e: 0,
      },
      { id: 'image_2', w: 147, h: 81, u: 'images/', p: 'img_2.png', e: 0 },
      {
        id: 'image_3',
        w: 42,
        h: 74,
        u: 'images/',
        p: 'img_3.png',
        e: 0,
      },
      { id: 'image_4', w: 47, h: 39, u: 'images/', p: 'img_4.png', e: 0 },
      {
        id: 'image_5',
        w: 90,
        h: 119,
        u: 'images/',
        p: 'img_5.png',
        e: 0,
      },
      { id: 'image_6', w: 78, h: 78, u: 'images/', p: 'img_6.png', e: 0 },
      {
        id: 'image_7',
        w: 43,
        h: 61,
        u: 'images/',
        p: 'img_7.png',
        e: 0,
      },
      { id: 'image_8', w: 364, h: 175, u: 'images/', p: 'img_8.png', e: 0 },
      {
        id: 'image_9',
        w: 272,
        h: 106,
        u: 'images/',
        p: 'img_9.png',
        e: 0,
      },
      { id: 'image_10', w: 357, h: 260, u: 'images/', p: 'img_10.png', e: 0 },
      {
        id: 'image_11',
        w: 314,
        h: 429,
        u: 'images/',
        p: 'img_11.png',
        e: 0,
      },
      { id: 'image_12', w: 328, h: 73, u: 'images/', p: 'img_12.png', e: 0 },
      {
        id: 'image_13',
        w: 256,
        h: 211,
        u: 'images/',
        p: 'img_13.png',
        e: 0,
      },
      { id: 'image_14', w: 366, h: 260, u: 'images/', p: 'img_14.png', e: 0 },
      {
        id: 'image_15',
        w: 1627,
        h: 641,
        u: 'images/',
        p: 'img_15.png',
        e: 0,
      },
      { id: 'image_16', w: 1039, h: 543, u: 'images/', p: 'img_16.png', e: 0 },
    ],
    mr = [
      {
        ddd: 0,
        ind: 1,
        ty: 2,
        nm: 'wenkbrauwen',
        parent: 4,
        refId: 'image_0',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 0,
                s: [23.031, -8.31, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 113,
                s: [23.031, -8.31, 0],
                to: [0, -0.833, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 123,
                s: [23.031, -13.31, 0],
                to: [0, 0, 0],
                ti: [0, -0.833, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 132,
                s: [23.031, -8.31, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 258,
                s: [23.031, -8.31, 0],
                to: [0, -0.833, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 268,
                s: [23.031, -13.31, 0],
                to: [0, 0, 0],
                ti: [0, -0.833, 0],
              },
              { t: 277, s: [23.031, -8.31, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.position;`,
          },
          a: { a: 0, k: [68.534, 17.278, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 2,
        nm: 'ogen',
        parent: 4,
        refId: 'image_1',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 25,
                s: [22.406, 28.821, 0],
                to: [0, 1.333, 0],
                ti: [0, -1.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 29,
                s: [22.406, 36.821, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 65,
                s: [22.406, 36.821, 0],
                to: [0, -1.333, 0],
                ti: [0, 1.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 69,
                s: [22.406, 28.821, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 186,
                s: [22.406, 28.821, 0],
                to: [0, 1.333, 0],
                ti: [0, -1.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 190,
                s: [22.406, 36.821, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 226,
                s: [22.406, 36.821, 0],
                to: [0, -1.333, 0],
                ti: [0, 1.333, 0],
              },
              { t: 230, s: [22.406, 28.821, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.position;`,
          },
          a: { a: 0, k: [46.92, 18.943, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 3,
        ty: 2,
        nm: 'bril',
        parent: 4,
        refId: 'image_2',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [23.343, 31.017, 0], ix: 2, l: 2 },
          a: { a: 0, k: [73.461, 40.097, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 4,
        ty: 2,
        nm: 'neus',
        refId: 'image_3',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 32,
                s: [808.33, 187.494, 0],
                to: [0, 4, 0],
                ti: [0, -4, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 49,
                s: [808.33, 211.494, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 72,
                s: [808.33, 211.494, 0],
                to: [0, -4, 0],
                ti: [0, 4, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 92,
                s: [808.33, 187.494, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 193,
                s: [808.33, 187.494, 0],
                to: [0, 4, 0],
                ti: [0, -4, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 210,
                s: [808.33, 211.494, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 233,
                s: [808.33, 211.494, 0],
                to: [0, -4, 0],
                ti: [0, 4, 0],
              },
              { t: 253, s: [808.33, 187.494, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.position;`,
          },
          a: { a: 0, k: [20.974, 36.814, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 5,
        ty: 2,
        nm: 'mond',
        parent: 4,
        refId: 'image_4',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [39.766, 78.943, 0], ix: 2, l: 2 },
          a: { a: 0, k: [23.279, 19.298, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 6,
        ty: 2,
        nm: 'hand/2.ai',
        cl: 'ai',
        refId: 'image_5',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 11,
                s: [0],
              },
              {
                i: { x: [0.667], y: [0.823] },
                o: { x: [0.333], y: [0] },
                t: 38,
                s: [16],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [2.108] },
                t: 68,
                s: [1.428],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 103,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 123,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 163,
                s: [0],
              },
              {
                i: { x: [0.667], y: [0.823] },
                o: { x: [0.333], y: [0] },
                t: 190,
                s: [16],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [2.108] },
                t: 220,
                s: [1.428],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 255,
                s: [0],
              },
              { t: 275, s: [0] },
            ],
            ix: 10,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 11,
                s: [1073.5, 769.5, 0],
                to: [-28.75, -2.333, 0],
                ti: [28.121, -13.163, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 38,
                s: [901, 755.5, 0],
                to: [-3.917, 1.833, 0],
                ti: [-17.968, -20.962, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 68,
                s: [921, 876.5, 0],
                to: [3, 3.5, 0],
                ti: [-25.417, 17.833, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 103,
                s: [1036, 851.5, 0],
                to: [25.417, -17.833, 0],
                ti: [-6.25, 13.667, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 123,
                s: [1073.5, 769.5, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 163,
                s: [1073.5, 769.5, 0],
                to: [-28.75, -2.333, 0],
                ti: [28.121, -13.163, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 190,
                s: [901, 755.5, 0],
                to: [-3.917, 1.833, 0],
                ti: [-17.968, -20.962, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 220,
                s: [921, 876.5, 0],
                to: [3, 3.5, 0],
                ti: [-25.417, 17.833, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 255,
                s: [1036, 851.5, 0],
                to: [25.417, -17.833, 0],
                ti: [-6.25, 13.667, 0],
              },
              { t: 275, s: [1073.5, 769.5, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [45, 59.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 7,
        ty: 2,
        nm: 'og/2.ai',
        cl: 'ai',
        parent: 6,
        refId: 'image_6',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [3.488, 87.886, 0], ix: 2, l: 2 },
          a: { a: 0, k: [39, 39, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 8,
        ty: 2,
        nm: 'duim/2.ai',
        cl: 'ai',
        parent: 6,
        refId: 'image_7',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [13, 66.5, 0], ix: 2, l: 2 },
          a: { a: 0, k: [21.5, 30.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 9,
        ty: 4,
        nm: 'arm rechts/2 Outlines',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [1281.5, 584.5, 0], ix: 2, l: 2 },
          a: { a: 0, k: [221, 214.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 1,
                  k: [
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 11,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-210.976, 157.753],
                            [-164.879, 198.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 38,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-384.976, 149.753],
                            [-338.879, 190.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 68,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-374.976, 257.753],
                            [-328.879, 298.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 103,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-254.976, 241.753],
                            [-208.879, 282.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.833, y: 1 },
                      o: { x: 0.167, y: 0 },
                      t: 123,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-210.976, 157.753],
                            [-164.879, 198.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 163,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-210.976, 157.753],
                            [-164.879, 198.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 190,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-384.976, 149.753],
                            [-338.879, 190.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 220,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-374.976, 257.753],
                            [-328.879, 298.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 255,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-254.976, 241.753],
                            [-208.879, 282.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      t: 275,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [49.639, -169.642],
                            [-34.276, 5.909],
                            [-57.915, 42.55],
                            [7.091, 37.821],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                            [34.277, -5.91],
                            [57.914, -42.55],
                            [-7.092, -37.822],
                            [0, 0],
                          ],
                          v: [
                            [-12.245, -112.284],
                            [-210.976, 157.753],
                            [-164.879, 198.565],
                            [77.418, 83.917],
                            [203.885, -49.64],
                            [-3.313, -204.474],
                          ],
                          c: !1,
                        },
                      ],
                    },
                  ],
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: {
                  a: 0,
                  k: [0.308998347264, 0.308998347264, 0.308998347264, 1],
                  ix: 3,
                },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 4, ix: 5 },
                lc: 2,
                lj: 2,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'fl',
                c: {
                  a: 0,
                  k: [0.972549019608, 0.945098039216, 0.945098039216, 1],
                  ix: 4,
                },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [220.976, 214.475], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 11,
        ty: 4,
        nm: 'arm links/2 Outlines',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [451.5, 552.5, 0], ix: 2, l: 2 },
          a: { a: 0, k: [351, 201, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 1,
                  k: [
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 43,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-32.56, -6.494],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [88.37, 17.627],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-38.703, 120.64],
                            [226.272, 173.35],
                            [335.799, 163.108],
                            [261.83, 133.952],
                            [297.977, 130.801],
                            [238.092, 112.678],
                            [-103.881, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 65,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-31.188, -11.385],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [77.178, 28.174],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-66.203, 143.64],
                            [196.772, 218.85],
                            [306.299, 208.608],
                            [232.33, 179.452],
                            [268.477, 176.301],
                            [208.592, 158.178],
                            [-103.882, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 84,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-31.188, -11.385],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [77.178, 28.174],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-182.204, 146.64],
                            [80.771, 221.85],
                            [190.299, 211.608],
                            [116.329, 182.452],
                            [152.477, 179.301],
                            [92.593, 161.178],
                            [-103.882, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 111,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [8.556, -43.979],
                            [-31.188, -11.385],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-7.383, 37.951],
                            [77.178, 28.174],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.999, -190.686],
                            [-296.142, 2.364],
                            [-189.203, 77.64],
                            [73.771, 152.85],
                            [183.298, 142.608],
                            [109.329, 113.452],
                            [145.477, 110.301],
                            [85.593, 92.178],
                            [-103.882, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 130,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-32.56, -6.494],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [88.37, 17.627],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-38.703, 120.64],
                            [226.272, 173.35],
                            [335.799, 163.108],
                            [261.83, 133.952],
                            [297.977, 130.801],
                            [238.092, 112.678],
                            [-103.881, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 192,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-32.56, -6.494],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [88.37, 17.627],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-38.703, 120.64],
                            [226.272, 173.35],
                            [335.799, 163.108],
                            [261.83, 133.952],
                            [297.977, 130.801],
                            [238.092, 112.678],
                            [-103.881, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 214,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-31.188, -11.385],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [77.178, 28.174],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-66.203, 143.64],
                            [196.772, 218.85],
                            [306.299, 208.608],
                            [232.33, 179.452],
                            [268.477, 176.301],
                            [208.592, 158.178],
                            [-103.882, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 233,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-31.188, -11.385],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [77.178, 28.174],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-182.204, 146.64],
                            [80.771, 221.85],
                            [190.299, 211.608],
                            [116.329, 182.452],
                            [152.477, 179.301],
                            [92.593, 161.178],
                            [-103.882, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      i: { x: 0.667, y: 1 },
                      o: { x: 0.333, y: 0 },
                      t: 260,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [8.556, -43.979],
                            [-31.188, -11.385],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-7.383, 37.951],
                            [77.178, 28.174],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.999, -190.686],
                            [-296.142, 2.364],
                            [-189.203, 77.64],
                            [73.771, 152.85],
                            [183.298, 142.608],
                            [109.329, 113.452],
                            [145.477, 110.301],
                            [85.593, 92.178],
                            [-103.882, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                    {
                      t: 279,
                      s: [
                        {
                          i: [
                            [0, 0],
                            [25.215, -37.034],
                            [-32.56, -6.494],
                            [-89.357, -13.558],
                            [0.788, 21.274],
                            [0, 0],
                            [4.728, 11.82],
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [-118.981, 83.523],
                            [-44.383, 65.188],
                            [88.37, 17.627],
                            [114.254, 17.335],
                            [-0.788, -21.275],
                            [0, 0],
                            [-4.728, -11.819],
                            [-175.715, -177.29],
                            [0, 0],
                          ],
                          v: [
                            [-69.998, -190.686],
                            [-296.142, 2.364],
                            [-38.703, 120.64],
                            [226.272, 173.35],
                            [335.799, 163.108],
                            [261.83, 133.952],
                            [297.977, 130.801],
                            [238.092, 112.678],
                            [-103.881, -80.371],
                          ],
                          c: !1,
                        },
                      ],
                    },
                  ],
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: {
                  a: 0,
                  k: [0.308998347264, 0.308998347264, 0.308998347264, 1],
                  ix: 3,
                },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 4, ix: 5 },
                lc: 2,
                lj: 2,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'fl',
                c: {
                  a: 0,
                  k: [0.972549019608, 0.945098039216, 0.945098039216, 1],
                  ix: 4,
                },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [350.525, 200.686], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 13,
        ty: 2,
        nm: 'schaduw 2',
        refId: 'image_8',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 43,
                s: [327.458, 660.318, 0],
                to: [5, 3, 0],
                ti: [-2.5, -9.167, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 65,
                s: [357.458, 678.318, 0],
                to: [2.5, 9.167, 0],
                ti: [1.833, 3.333, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 84,
                s: [342.458, 715.318, 0],
                to: [-1.833, -3.333, 0],
                ti: [2.5, 9.167, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 111,
                s: [346.458, 658.318, 0],
                to: [-2.5, -9.167, 0],
                ti: [3.167, -0.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 130,
                s: [327.458, 660.318, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 192,
                s: [327.458, 660.318, 0],
                to: [5, 3, 0],
                ti: [-2.5, -9.167, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 214,
                s: [357.458, 678.318, 0],
                to: [2.5, 9.167, 0],
                ti: [1.833, 3.333, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 233,
                s: [342.458, 715.318, 0],
                to: [-1.833, -3.333, 0],
                ti: [2.5, 9.167, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 260,
                s: [346.458, 658.318, 0],
                to: [-2.5, -9.167, 0],
                ti: [3.167, -0.333, 0],
              },
              { t: 279, s: [327.458, 660.318, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [181.775, 87.45, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 43,
                s: [-151.408, 63.418, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 65,
                s: [-136.554, 99.969, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 84,
                s: [-134.904, 75.982, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 111,
                s: [-126.652, 57.707, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 130,
                s: [-151.408, 63.418, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 192,
                s: [-151.408, 63.418, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 214,
                s: [-136.554, 99.969, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 233,
                s: [-134.904, 75.982, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 260,
                s: [-126.652, 57.707, 100],
              },
              { t: 279, s: [-151.408, 63.418, 100] },
            ],
            ix: 6,
            l: 2,
          },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 14,
        ty: 2,
        nm: 'schaduw',
        refId: 'image_8',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 11,
                s: [1331.458, 674.318, 0],
                to: [-11.667, 2.667, 0],
                ti: [8.667, -11.333, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 38,
                s: [1261.458, 690.318, 0],
                to: [-8.667, 11.333, 0],
                ti: [-11.667, 2.667, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 68,
                s: [1279.458, 742.318, 0],
                to: [11.667, -2.667, 0],
                ti: [-8.667, 11.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 123,
                s: [1331.458, 674.318, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 163,
                s: [1331.458, 674.318, 0],
                to: [-11.667, 2.667, 0],
                ti: [8.667, -11.333, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 190,
                s: [1261.458, 690.318, 0],
                to: [-8.667, 11.333, 0],
                ti: [-11.667, 2.667, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 220,
                s: [1279.458, 742.318, 0],
                to: [11.667, -2.667, 0],
                ti: [-8.667, 11.333, 0],
              },
              { t: 275, s: [1331.458, 674.318, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [181.775, 87.45, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 11,
                s: [100, 100, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 38,
                s: [150.612, 100, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 68,
                s: [129.759, 111.435, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 103,
                s: [126.466, 159.463, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 123,
                s: [100, 100, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 163,
                s: [100, 100, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 190,
                s: [150.612, 100, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 220,
                s: [129.759, 111.435, 100],
              },
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 255,
                s: [126.466, 159.463, 100],
              },
              { t: 275, s: [100, 100, 100] },
            ],
            ix: 6,
            l: 2,
          },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 15,
        ty: 2,
        nm: 'bovenstul/2.ai',
        cl: 'ai',
        parent: 11,
        refId: 'image_9',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 43,
                s: [693, 371, 0],
                to: [-4.167, 7.417, 0],
                ti: [7.157, -2.364, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 65,
                s: [668, 415.5, 0],
                to: [-7.307, 2.414, 0],
                ti: [6.84, 3.088, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 84,
                s: [548, 421, 0],
                to: [-3.401, -1.536, 0],
                ti: [-9.512, 1.259, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 111,
                s: [539.5, 352.5, 0],
                to: [7.923, -1.049, 0],
                ti: [-25.583, -3.083, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 130,
                s: [693, 371, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 192,
                s: [693, 371, 0],
                to: [-4.167, 7.417, 0],
                ti: [7.157, -2.364, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 214,
                s: [668, 415.5, 0],
                to: [-7.307, 2.414, 0],
                ti: [6.84, 3.088, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 233,
                s: [548, 421, 0],
                to: [-3.401, -1.536, 0],
                ti: [-9.512, 1.259, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 260,
                s: [539.5, 352.5, 0],
                to: [7.923, -1.049, 0],
                ti: [-25.583, -3.083, 0],
              },
              { t: 279, s: [693, 371, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [136, 53, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 16,
        ty: 2,
        nm: 'hand links',
        refId: 'image_10',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 9,
                s: [391.176, 1187.621, 0],
                to: [18.333, -7.333, 0],
                ti: [-18.333, 7.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 59,
                s: [501.176, 1143.621, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 76,
                s: [501.176, 1143.621, 0],
                to: [-18.333, 7.333, 0],
                ti: [18.333, -7.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 132,
                s: [391.176, 1187.621, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 163,
                s: [391.176, 1187.621, 0],
                to: [18.333, -7.333, 0],
                ti: [-18.333, 7.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 213,
                s: [501.176, 1143.621, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 230,
                s: [501.176, 1143.621, 0],
                to: [-18.333, 7.333, 0],
                ti: [18.333, -7.333, 0],
              },
              { t: 286, s: [391.176, 1187.621, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
$bm_rt = transform.position;`,
          },
          a: { a: 0, k: [178.373, 129.689, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 17,
        ty: 2,
        nm: 'patroon/2.ai',
        cl: 'ai',
        parent: 16,
        refId: 'image_11',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [342.697, -89.431, 0], ix: 2, l: 2 },
          a: { a: 0, k: [157, 214.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 18,
        ty: 2,
        nm: 'onderste stuk/2.ai',
        cl: 'ai',
        refId: 'image_12',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [768.5, 1184.5, 0], ix: 2, l: 2 },
          a: { a: 0, k: [164, 36.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 19,
        ty: 2,
        nm: 'schaduw hand links/2.ai',
        cl: 'ai',
        parent: 16,
        refId: 'image_13',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [242.697, 140.569, 0], ix: 2, l: 2 },
          a: { a: 0, k: [128, 105.5, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 20,
        ty: 2,
        nm: 'hand rechts',
        refId: 'image_14',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1150.867, 1154.795, 0],
                to: [-6, -23, 0],
                ti: [6, 23, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 44,
                s: [1114.867, 1016.795, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 54,
                s: [1114.867, 1016.795, 0],
                to: [6, 23, 0],
                ti: [-6, -23, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 97,
                s: [1150.867, 1154.795, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150,
                s: [1150.867, 1154.795, 0],
                to: [-6, -23, 0],
                ti: [6, 23, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 194,
                s: [1114.867, 1016.795, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 204,
                s: [1114.867, 1016.795, 0],
                to: [6, 23, 0],
                ti: [-6, -23, 0],
              },
              { t: 247, s: [1150.867, 1154.795, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [182.965, 129.873, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 21,
        ty: 2,
        nm: 'basis',
        refId: 'image_15',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [811.609, 333.505, 0], ix: 2, l: 2 },
          a: { a: 0, k: [813.121, 320.225, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 96.771, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 22,
        ty: 2,
        nm: 'shapes',
        refId: 'image_16',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [792.445, 981.314, 0], ix: 2, l: 2 },
          a: { a: 0, k: [519.277, 271.09, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
    ],
    dr = [],
    Ce = {
      v: sr,
      fr: ar,
      ip: nr,
      op: or,
      w: lr,
      h: hr,
      nm: fr,
      ddd: pr,
      assets: cr,
      layers: mr,
      markers: dr,
    };
  var ur = '5.7.7',
    yr = 30,
    gr = 0,
    vr = 300,
    xr = 2255,
    kr = 1307,
    br = '3',
    _r = 0,
    Pr = [
      { id: 'image_0', w: 653, h: 242, u: 'images/', p: 'img_0.png', e: 0 },
      {
        id: 'image_1',
        w: 297,
        h: 617,
        u: 'images/',
        p: 'img_1.png',
        e: 0,
      },
      { id: 'image_2', w: 427, h: 703, u: 'images/', p: 'img_2.png', e: 0 },
      {
        id: 'image_3',
        w: 591,
        h: 339,
        u: 'images/',
        p: 'img_3.png',
        e: 0,
      },
      { id: 'image_4', w: 599, h: 264, u: 'images/', p: 'img_4.png', e: 0 },
      {
        id: 'image_5',
        w: 720,
        h: 720,
        u: 'images/',
        p: 'img_5.png',
        e: 0,
      },
      { id: 'image_6', w: 835, h: 890, u: 'images/', p: 'img_6.png', e: 0 },
      {
        id: 'image_7',
        w: 196,
        h: 384,
        u: 'images/',
        p: 'img_7.png',
        e: 0,
      },
      { id: 'image_8', w: 32, h: 32, u: 'images/', p: 'img_8.png', e: 0 },
      {
        id: 'image_9',
        w: 36,
        h: 36,
        u: 'images/',
        p: 'img_9.png',
        e: 0,
      },
      { id: 'image_10', w: 60, h: 60, u: 'images/', p: 'img_10.png', e: 0 },
      {
        id: 'image_11',
        w: 24,
        h: 24,
        u: 'images/',
        p: 'img_11.png',
        e: 0,
      },
      { id: 'image_12', w: 71, h: 71, u: 'images/', p: 'img_12.png', e: 0 },
      {
        id: 'image_13',
        w: 417,
        h: 333,
        u: 'images/',
        p: 'img_13.png',
        e: 0,
      },
      { id: 'image_14', w: 688, h: 880, u: 'images/', p: 'img_14.png', e: 0 },
    ],
    wr = [
      {
        ddd: 0,
        ind: 1,
        ty: 2,
        nm: 'arm voor man',
        parent: 2,
        refId: 'image_0',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-4],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 68,
                s: [2],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 148,
                s: [-4],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150,
                s: [-4],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 218,
                s: [2],
              },
              { t: 298, s: [-4] },
            ],
            ix: 10,
          },
          p: { a: 0, k: [172.388, 323.11, 0], ix: 2, l: 2 },
          a: { a: 0, k: [616.171, 46.847, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 2,
        nm: 'man',
        refId: 'image_1',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [1897.898, 674.497, 0],
                to: [0, 7.333, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 68,
                s: [1897.898, 718.497, 0],
                to: [0, 0, 0],
                ti: [0, 7.333, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.333, y: 0.333 },
                t: 148,
                s: [1897.898, 674.497, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150,
                s: [1897.898, 674.497, 0],
                to: [0, 7.333, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 218,
                s: [1897.898, 718.497, 0],
                to: [0, 0, 0],
                ti: [0, 7.333, 0],
              },
              { t: 298, s: [1897.898, 674.497, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [148.457, 308.066, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 3,
        ty: 2,
        nm: 'vrouw',
        refId: 'image_2',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 0,
                s: [802.035, 641.243, 0],
                to: [4.667, -11.667, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 68,
                s: [830.035, 571.243, 0],
                to: [0, 0, 0],
                ti: [4.667, -11.667, 0],
              },
              {
                i: { x: 0.667, y: 0.667 },
                o: { x: 0.167, y: 0.167 },
                t: 148,
                s: [802.035, 641.243, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 150,
                s: [802.035, 641.243, 0],
                to: [4.667, -11.667, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 218,
                s: [830.035, 571.243, 0],
                to: [0, 0, 0],
                ti: [4.667, -11.667, 0],
              },
              { t: 298, s: [802.035, 641.243, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [213.137, 351.356, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 4,
        ty: 2,
        nm: 'arm achter vrouw',
        parent: 3,
        refId: 'image_3',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-7.8],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 68,
                s: [0.2],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 148,
                s: [-7.8],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150,
                s: [-7.8],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 218,
                s: [0.2],
              },
              { t: 298, s: [-7.8] },
            ],
            ix: 10,
          },
          p: { a: 0, k: [281.565, 336.868, 0], ix: 2, l: 2 },
          a: { a: 0, k: [81.038, 71.291, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 5,
        ty: 2,
        nm: 'arm achter man',
        parent: 2,
        refId: 'image_4',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [-7],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 68,
                s: [-2],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 148,
                s: [-7],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 150,
                s: [-7],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 218,
                s: [-2],
              },
              { t: 298, s: [-7] },
            ],
            ix: 10,
          },
          p: { a: 0, k: [106.957, 286.186, 0], ix: 2, l: 2 },
          a: { a: 0, k: [563.286, 65.6, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 6,
        ty: 2,
        nm: 'cirkel achter man',
        parent: 2,
        refId: 'image_5',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [146.394, 256.132, 0], ix: 2, l: 2 },
          a: { a: 0, k: [360, 360, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 7,
        ty: 2,
        nm: 'groen object',
        parent: 3,
        refId: 'image_6',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [199.563, 243.587, 0], ix: 2, l: 2 },
          a: { a: 0, k: [417.456, 444.621, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 8,
        ty: 2,
        nm: 'Layer 13',
        refId: 'image_7',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 73.271,
                s: [18],
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 136.866,
                s: [0],
              },
              {
                i: {
                  x: [0.833],
                  y: [0.833],
                },
                o: { x: [0.167], y: [0.167] },
                t: 208.756,
                s: [-20],
              },
              { t: 300, s: [0] },
            ],
            ix: 10,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [583.152, 222.354, 0],
                to: [6, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 73.271,
                s: [619.152, 222.354, 0],
                to: [0, 0, 0],
                ti: [12.333, -3.667, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 136.866,
                s: [583.152, 222.354, 0],
                to: [-12.333, 3.667, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 208.756,
                s: [545.152, 244.354, 0],
                to: [0, 0, 0],
                ti: [-6.333, 3.667, 0],
              },
              { t: 300, s: [583.152, 222.354, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [97.682, 191.736, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 9,
        ty: 2,
        nm: 'Layer 7',
        refId: 'image_8',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [568.398, 1277.626, 0],
                to: [-9.833, -3.667, 0],
                ti: [-34.611, 29.188, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 90,
                s: [572.398, 1213.626, 0],
                to: [22.349, -18.847, 0],
                ti: [-0.136, -35.244, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 193,
                s: [650.398, 1229.626, 0],
                to: [0.208, 53.664, 0],
                ti: [30.167, 16, 0],
              },
              { t: 299, s: [568.398, 1277.626, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [15.875, 15.875, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 10,
        ty: 2,
        nm: 'Layer 8',
        refId: 'image_9',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [1316.835, 530.751, 0],
                to: [1.167, 7.417, 0],
                ti: [-11.5, -12.917, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 40,
                s: [1323.835, 575.251, 0],
                to: [11.5, 12.917, 0],
                ti: [-9.917, -13.917, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 87,
                s: [1385.835, 608.251, 0],
                to: [9.917, 13.917, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 149,
                s: [1383.335, 658.751, 0],
                to: [0, 0, 0],
                ti: [9.917, 13.917, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 197,
                s: [1385.835, 608.251, 0],
                to: [-9.917, -13.917, 0],
                ti: [11.5, 12.917, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 254,
                s: [1323.835, 575.251, 0],
                to: [-11.5, -12.917, 0],
                ti: [1.167, 7.417, 0],
              },
              { t: 299, s: [1316.835, 530.751, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [17.812, 17.812, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 11,
        ty: 2,
        nm: 'Layer 9',
        refId: 'image_10',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [1431.678, 615.907, 0],
                to: [8.667, -35.333, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 150,
                s: [1483.678, 403.907, 0],
                to: [0, 0, 0],
                ti: [8.667, -35.333, 0],
              },
              { t: 299, s: [1431.678, 615.907, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [29.532, 29.531, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 12,
        ty: 2,
        nm: 'Layer 10',
        refId: 'image_11',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 0,
                s: [256.679, 245.594, 0],
                to: [18.667, -18.333, 0],
                ti: [-94.492, 5.255, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 64,
                s: [368.679, 135.594, 0],
                to: [67.181, -3.736, 0],
                ti: [77.139, -82.315, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 173,
                s: [460.679, 273.594, 0],
                to: [-91.664, 97.814, 0],
                ti: [-24, 54.167, 0],
              },
              { t: 296, s: [256.679, 245.594, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [11.969, 11.969, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 13,
        ty: 2,
        nm: 'Layer 11',
        refId: 'image_12',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 11,
                s: [1355.038, 148.266, 0],
                to: [37.333, 3.333, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 133,
                s: [1579.038, 168.266, 0],
                to: [0, 0, 0],
                ti: [37.333, 3.333, 0],
              },
              { t: 284, s: [1355.038, 148.266, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [35.39, 35.391, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 14,
        ty: 2,
        nm: 'Layer 15',
        refId: 'image_13',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 0,
                s: [0],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 151,
                s: [75],
              },
              { t: 299, s: [0] },
            ],
            ix: 10,
          },
          p: { a: 0, k: [1129.589, 1065.022, 0], ix: 2, l: 2 },
          a: { a: 0, k: [208.301, 166.365, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 15,
        ty: 2,
        nm: 'Layer 16',
        refId: 'image_14',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 1,
                s: [0],
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 72.279,
                s: [-10],
              },
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 140.759,
                s: [-24],
              },
              {
                i: {
                  x: [0.833],
                  y: [0.833],
                },
                o: { x: [0.167], y: [0.167] },
                t: 215.064,
                s: [-10],
              },
              { t: 299, s: [0] },
            ],
            ix: 10,
          },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 1,
                s: [344.015, 864.474, 0],
                to: [3.667, -2.333, 0],
                ti: [-10, 5, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 72.279,
                s: [366.015, 850.474, 0],
                to: [10, -5, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 140.759,
                s: [404.015, 834.474, 0],
                to: [0, 0, 0],
                ti: [10, -5, 0],
              },
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 215.064,
                s: [366.015, 850.474, 0],
                to: [-10, 5, 0],
                ti: [3.667, -2.333, 0],
              },
              { t: 299, s: [344.015, 864.474, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [343.721, 439.734, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        ip: 0,
        op: 300,
        st: 0,
        bm: 0,
      },
    ],
    Er = [],
    Ie = {
      v: ur,
      fr: yr,
      ip: gr,
      op: vr,
      w: xr,
      h: kr,
      nm: br,
      ddd: _r,
      assets: Pr,
      layers: wr,
      markers: Er,
    };
  Ee([
    { data: G.mobile ? Te : Ae, path: G.mobile ? '4' : '1' },
    { data: Ce, path: '2' },
    { data: Ie, path: '3' },
  ]);
  var Fe,
    Me,
    Ve,
    ri,
    si,
    ai,
    ni,
    at,
    he = new ut({
      hide: ({ done: t, to: e }) => {
        if (G.mobile) {
          new z({
            targets: at.sail,
            opacity: [0, 1],
            duration: 400,
            easing: 'o6',
            complete: t,
          }),
            ni.destroy();
          return;
        }
        new z({
          targets: at.sail,
          opacity: [0, 1],
          duration: 400,
          easing: 'o3',
        }),
          Fe.play({ reverse: !0 }),
          Me.play({ reverse: !0 }),
          Ve.play({ reverse: !0 }),
          ri.reverse(),
          Fe.observer.disconnect(),
          Me.observer.disconnect(),
          Ve.observer.disconnect(),
          si.reverse(),
          ai.reverse();
        let i = pt(at.works).width,
          r = window.innerWidth,
          s = (r - i) / i,
          a = (r - 2 * i) / i,
          l = new lt({ easing: 'io6', duration: 850 });
        l.add({ targets: at.about, transform: { sx: [0, a] } }),
          l.add({
            targets: at.about,
            transform: { x: [0, r - 3 * i], sx: [a, 1] },
            delay: 850,
          }),
          l.add({
            targets: at.works,
            transform: { sx: [1, s] },
            delay: 200,
          }),
          e === 'works'
            ? l.add({
                targets: at.works,
                transform: { x: [0, r - 2 * i], sx: [s, 0] },
                delay: 200 + 850,
                complete: t,
              })
            : (l.add({
                targets: at.works,
                transform: { x: [0, r - 3 * i], sx: [s, 1] },
                delay: 200 + 850,
              }),
              l.add({
                targets: at.resources,
                transform: { sx: [1, s] },
                delay: 200 + 200,
              }),
              l.add({
                targets: at.resources,
                transform: { x: [0, r - 2 * i], sx: [s, 0] },
                delay: 200 + 200 + 850,
                complete: t,
              }));
      },
      show: ({ done: t }) => {
        (at = {
          page: B('.page-wrapper'),
          sail: B('#sail-white'),
          nav: B('nav'),
          about: B('#page-about .page-link--bg'),
          resources: B('#page-resources .page-link--bg'),
          works: B('#page-works .page-link--bg'),
        }),
          (B("meta[name='theme-color']").content = '#000000'),
          (at.about.style.transform = 'scaleX(0)'),
          (at.resources.style.transform = 'scaleX(1)'),
          (at.works.style.transform = 'scaleX(1)'),
          new z({
            targets: at.sail,
            opacity: [1, 0],
            duration: G.mobile ? 200 : 450,
          });
        let e = (118 * 100) / 375;
        G.mobile ||
          ((B('#title-care').innerText = 'Care Sector'),
          (e = (99 * 100) / 1440)),
          (Fe = new K({
            targets: '#title-shaping',
            auto: !0,
          })),
          (Me = new K({
            targets: '#title-care',
            auto: !0,
            delay: G.mobile ? 75 : 150,
            stagger: G.mobile ? 75 : 150,
          })),
          (Ve = new K({
            targets: '.title-desc',
            auto: !0,
            delay: G.mobile ? 75 * 4 : 150 * 2,
            stagger: 75,
          })),
          (ri = new z({
            targets: '#title-the svg',
            duration: 1750,
            easing: 'o6',
            transform: { y: [150, 0], yu: '%' },
          }));
        let i = new Mt({ target: '#hero-anim', data: G.mobile ? Te : Ae }),
          r = new Mt({ target: '#about-anim', data: Ce }),
          s = new Mt({ target: '#vision-anim', data: Ie });
        if (
          (he.clean(() => {
            i.destroy(), r.destroy(), s.destroy();
          }),
          G.mobile)
        ) {
          (ni = new Et({})), t();
          return;
        }
        let a = new K({
            targets: '.about .desc',
            stagger: 120,
            auto: !0,
            indent: e,
          }),
          l = new K({ targets: '.vision .quote-text', stagger: 120, auto: !0 });
        he.clean(() => {
          a.destroy(), l.destroy();
        }),
          (si = new z({
            targets: '#page-links .name',
            duration: 1250,
            easing: 'o6',
            transform: {
              x: [110, 0],
              xu: '%',
              r: [
                [0, 0, 1, 180],
                [0, 0, 1, 180],
              ],
            },
          })),
          (ai = new z({
            targets: '#page-links svg',
            duration: 1250,
            easing: 'o6',
            transform: { sx: [0, 1], sy: [0, 1] },
          })),
          zt.init({ dom: '.footer-wrapper' }),
          t();
      },
    });
  rt();
  var Le,
    De,
    oi,
    li,
    hi,
    tt,
    fi = new ut({
      hide: ({ done: t, to: e }) => {
        if (G.mobile) {
          new z({
            targets: tt.sail,
            opacity: [0, 1],
            duration: 400,
            easing: 'o6',
            complete: t,
          }),
            hi.destroy();
          return;
        }
        new z({
          targets: tt.sail,
          opacity: [0, 1],
          duration: 400,
          easing: 'o3',
        }),
          Le.play({ reverse: !0 }),
          De.play({ reverse: !0 }),
          Le.observer.disconnect(),
          De.observer.disconnect(),
          oi.reverse(),
          li.reverse();
        let i = pt(tt.about).width,
          r = window.innerWidth,
          a = (r - 2 * i) / i,
          l = new lt({ easing: 'io6', duration: 850 });
        e === ''
          ? (l.add({ targets: tt.works, transform: { sx: [0, a] } }),
            l.add({
              targets: tt.works,
              transform: { x: [0, -r + 3 * i], sx: [a, 1] },
              delay: 850,
            }),
            l.add({ targets: tt.about, transform: { sx: [1, a] }, delay: 200 }),
            l.add({
              targets: tt.about,
              transform: { x: [0, -r + 2 * i], sx: [a, 0] },
              delay: 200 + 850,
              complete: t,
            }))
          : e === 'resources'
          ? (l.add({
              targets: tt.worksDup,
              transform: { sx: [0, a] },
            }),
            l.add({
              targets: tt.worksDup,
              transform: { x: [0, r - 3 * i], sx: [a, 1] },
              delay: 850,
            }),
            l.add({
              targets: tt.resources,
              transform: { sx: [1, a] },
              delay: 200,
            }),
            l.add({
              targets: tt.resources,
              transform: { x: [0, r - 2 * i], sx: [a, 0] },
              delay: 200 + 850,
              complete: t,
            }))
          : new z({
              targets: tt.about,
              transform: { sx: [1, 0] },
              duration: 400,
              easing: 'o3',
              complete: t,
            });
      },
      show: ({ done: t }) => {
        if (
          ((tt = {
            page: B('.page-wrapper'),
            nav: B('nav'),
            about: B('#page-about .page-link--bg'),
            resources: B('#page-resources .page-link--bg'),
            works: B('#page-works .page-link--bg'),
            worksDup: B('#page-works-dup .page-link--bg'),
            sail: B('#sail-white'),
          }),
          (B("meta[name='theme-color']").content = '#000000'),
          (tt.about.style.transform = 'scaleX(1)'),
          (tt.resources.style.transform = 'scaleX(1)'),
          (tt.works.style.transform = 'scaleX(0)'),
          (tt.worksDup.style.transform = 'scaleX(0)'),
          new z({
            targets: tt.sail,
            opacity: [1, 0],
            duration: G.mobile ? 200 : 400,
          }),
          G.mobile || (B('h1').innerText = 'Our Projects'),
          (Le = new K({
            targets: 'header h1',
            auto: !0,
            stagger: G.mobile ? 75 : 150,
          })),
          (De = new K({
            targets: 'header .desc',
            auto: !0,
            stagger: G.mobile ? 75 : 150,
            delay: G.mobile ? 75 * 3 : 0,
          })),
          G.mobile)
        ) {
          hi = new Et({});
          let e = B('#scroll-hint .m-arrow');
          new z({
            targets: e,
            duration: 1750,
            easing: 'o6',
            transform: {
              sx: [0, 1],
              sy: [0, 1],
              r: [
                [0, 0, 1, -90],
                [0, 0, 1, 0],
              ],
            },
          }),
            Gt({ targets: e, duration: 3e3, easing: 'o6' }),
            t();
          return;
        }
        (oi = new z({
          targets: '#page-links .name',
          duration: 1250,
          easing: 'o6',
          transform: {
            x: [110, 0],
            xu: '%',
            r: [
              [0, 0, 1, 180],
              [0, 0, 1, 180],
            ],
          },
        })),
          (li = new z({
            targets: '#page-links svg',
            duration: 1250,
            easing: 'o6',
            transform: { sx: [0, 1], sy: [0, 1] },
          })),
          zt.init({ dom: '.footer-wrapper' }),
          t();
      },
    });
  rt();
  var Re,
    Oe,
    Be,
    pi,
    ci,
    mi,
    Pt,
    di = new ut({
      hide: ({ done: t, to: e }) => {
        if (G.mobile) {
          new z({
            targets: Pt.sail,
            opacity: [0, 1],
            duration: 400,
            easing: 'o6',
            complete: t,
          }),
            mi.destroy();
          return;
        }
        new z({
          targets: Pt.sail,
          opacity: [0, 1],
          duration: 400,
          easing: 'o3',
          complete: t,
        }),
          e === 'resources' &&
            new z({
              targets: Pt.works,
              transform: { x: [0, -100], xu: '%' },
              duration: 400,
              easing: 'o2',
            }),
          (e.length > 5 && e.startsWith('works')) ||
            (Re.play({ reverse: !0 }),
            Oe.play({ reverse: !0 }),
            Be.play({ reverse: !0 }),
            new z({
              targets: Pt.about,
              transform: { sx: [0, 1] },
              duration: 400,
              easing: 'o2',
            })),
          pi.reverse(),
          ci.reverse(),
          Re.observer.disconnect(),
          Oe.observer.disconnect(),
          Be.observer.disconnect();
      },
      show: ({ done: t }) => {
        if (
          ((Pt = {
            page: B('.page-wrapper'),
            nav: B('nav'),
            works: B('#page-works'),
            about: B('#page-about .page-link--bg'),
            sail: B('#sail-white'),
            link: B('.detail-link'),
          }),
          (B("meta[name='theme-color']").content = '#000000'),
          new z({
            targets: Pt.sail,
            opacity: [1, 0],
            duration: G.mobile ? 200 : 450,
          }),
          G.mobile)
        ) {
          (mi = new Et({})), t();
          return;
        }
        (Pt.works.style.transform = 'scaleX(1)'),
          (Pt.about.style.transform = 'scaleX(0)'),
          (Re = new K({
            targets: '.hero h1',
            auto: !0,
            stagger: G.mobile ? 75 : 150,
          })),
          (Oe = new K({
            targets: '.hero .desc',
            auto: !0,
            stagger: G.mobile ? 75 : 150,
            delay: G.mobile ? 75 * 3 : 300,
          })),
          (Be = new K({
            targets: '.reveal',
            auto: !0,
            stagger: 75,
            delay: 125,
          })),
          Pt.link &&
            ((Pt.link.style.opacity = 0),
            new z({
              targets: Pt.link,
              opacity: [0, 1],
              duration: 1250,
              easing: 'i4',
            })),
          (pi = new z({
            targets: '#page-links .name:not(.disable)',
            duration: 1250,
            easing: 'o6',
            transform: {
              x: [-110, 0],
              xu: '%',
              r: [
                [0, 0, 1, 180],
                [0, 0, 1, 180],
              ],
            },
          })),
          (ci = new z({
            targets: '#page-links svg:not(.disable)',
            duration: 1250,
            easing: 'o6',
            transform: { sx: [0, 1], sy: [0, 1] },
          })),
          zt.init({ dom: '.footer-wrapper', speed: 4 }),
          t();
      },
    });
  rt();
  var $e,
    Ge,
    ui,
    yi,
    gi,
    nt,
    vi = new ut({
      hide: ({ done: t, to: e }) => {
        if (G.mobile) {
          new z({
            targets: nt.sail,
            opacity: [0, 1],
            duration: 400,
            easing: 'o6',
            complete: t,
          }),
            gi.destroy();
          return;
        }
        new z({
          targets: nt.sail,
          opacity: [0, 1],
          duration: 400,
          easing: 'o3',
        }),
          $e.play({ reverse: !0 }),
          Ge.play({ reverse: !0 }),
          $e.observer.disconnect(),
          Ge.observer.disconnect(),
          ui.reverse(),
          yi.reverse();
        let i = pt(nt.about).width,
          r = window.innerWidth,
          a = (r - 2 * i) / i,
          l = new lt({ easing: 'io6', duration: 850 });
        l.add({ targets: nt.resources, transform: { sx: [0, a] } }),
          l.add({
            targets: nt.resources,
            transform: { x: [0, -r + 3 * i], sx: [a, 1] },
            delay: 850,
          }),
          l.add({
            targets: nt.works,
            transform: { sx: [1, a] },
            delay: 200,
          }),
          e === 'works'
            ? l.add({
                targets: nt.works,
                transform: { x: [0, -r + 2 * i], sx: [a, 0] },
                delay: 200 + 850,
                complete: t,
              })
            : (l.add({
                targets: nt.works,
                transform: { x: [0, -r + 3 * i], sx: [a, 1] },
                delay: 200 + 850,
              }),
              l.add({
                targets: nt.about,
                transform: { sx: [1, a] },
                delay: 200 + 200,
              }),
              l.add({
                targets: nt.about,
                transform: { x: [0, -r + 2 * i], sx: [a, 0] },
                delay: 200 + 200 + 850,
                complete: t,
              }));
      },
      show: ({ done: t }) => {
        if (
          ((nt = {
            page: B('.page-wrapper'),
            nav: B('nav'),
            about: B('#page-about'),
            resources: B('#page-resources'),
            works: B('#page-works'),
            sail: B('#sail-white'),
          }),
          (B("meta[name='theme-color']").content = '#000000'),
          (nt.about.style.transform = 'scaleX(1)'),
          (nt.resources.style.transform = 'scaleX(0)'),
          (nt.works.style.transform = 'scaleX(1)'),
          new z({
            targets: nt.sail,
            opacity: [1, 0],
            duration: G.mobile ? 200 : 450,
          }),
          ($e = new K({
            targets: '.hero h1',
            auto: !0,
            stagger: G.mobile ? 75 : 150,
          })),
          (Ge = new K({
            targets: '.hero .desc',
            auto: !0,
            stagger: G.mobile ? 75 : 150,
            delay: G.mobile ? 75 * 3 : 0,
          })),
          G.mobile)
        ) {
          gi = new Et({});
          let e = B('#scroll-hint .m-arrow');
          new z({
            targets: e,
            duration: 1750,
            easing: 'o6',
            transform: {
              sx: [0, 1],
              sy: [0, 1],
              r: [
                [0, 0, 1, -90],
                [0, 0, 1, 0],
              ],
            },
          }),
            Gt({ targets: e, duration: 3e3, easing: 'o6' }),
            t();
          return;
        }
        (ui = new z({
          targets: '#page-links .name',
          duration: 1250,
          easing: 'o6',
          transform: {
            x: [110, 0],
            xu: '%',
            r: [
              [0, 0, 1, 180],
              [0, 0, 1, 180],
            ],
          },
        })),
          (yi = new z({
            targets: '#page-links svg',
            duration: 1250,
            easing: 'o6',
            transform: { sx: [0, 1], sy: [0, 1] },
          })),
          zt.init({ dom: '.footer-wrapper', speed: 2 }),
          t();
      },
    });
  rt();
  var xi = new ut({
    hide: ({ done: t, to: e }) => {
      new z({
        targets: '#sails',
        opacity: [0, 1],
        easing: 'o4',
        duration: 500,
        complete: t,
      });
    },
    show: ({ done: t }) => {
      new z({
        targets: '#sails',
        opacity: [1, 0],
        easing: 'o4',
        duration: 500,
        complete: t,
      });
    },
  });
  var Sr = '5.7.8',
    Ar = 24,
    Tr = 1,
    Cr = 152,
    Ir = 600,
    Fr = 600,
    Mr = 'displayau',
    Vr = 0,
    Lr = [{ id: 'audio_0', u: 'images/', p: 'aud_0.mp3', e: 0, t: 2 }],
    Dr = [
      {
        ddd: 0,
        ind: 1,
        ty: 6,
        nm: '335908__littlerainyseasons__correct.mp3',
        cl: 'mp3',
        refId: 'audio_0',
        sr: 1,
        ip: 60,
        op: 86.496,
        st: 60,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 2,
        ty: 4,
        nm: '100',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 55,
                s: [0],
              },
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 74,
                s: [100],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.957], y: [0] },
                t: 104,
                s: [100],
              },
              { t: 122.999609961524, s: [0] },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0, y: 0 },
                t: 55,
                s: [440, 241.131, 0],
                to: [0, -3.167, 0],
                ti: [0, 3.167, 0],
              },
              {
                i: { x: 0.325, y: 0.325 },
                o: { x: 0.333, y: 0.333 },
                t: 71,
                s: [440, 222.131, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 108,
                s: [440, 222.131, 0],
                to: [0, -2.667, 0],
                ti: [0, 2.667, 0],
              },
              { t: 122.999609961524, s: [440, 206.131, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [7.284, 7.284, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [0.284, -0.284],
                      [-0.284, 0.284],
                    ],
                    c: !1,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 14, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [7.284, 7.284], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
          {
            ty: 'tm',
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667], y: [1] },
                  o: { x: [0.333], y: [0] },
                  t: 55.024,
                  s: [100],
                },
                {
                  t: 71.039649024024,
                  s: [0],
                },
              ],
              ix: 1,
            },
            e: { a: 0, k: 100, ix: 2 },
            o: { a: 0, k: 0, ix: 3 },
            m: 1,
            ix: 2,
            nm: 'Trim Paths 1',
            mn: 'ADBE Vector Filter - Trim',
            hd: !1,
          },
        ],
        ip: 55.024024024024,
        op: 286,
        st: 55.024024024024,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: '75',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 48,
                s: [0],
              },
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 67,
                s: [100],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.957], y: [0] },
                t: 98,
                s: [100],
              },
              { t: 117.000391016016, s: [0] },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0, y: 0 },
                t: 48,
                s: [412.387, 225.91, 0],
                to: [0, -4.167, 0],
                ti: [0, 4.167, 0],
              },
              {
                i: { x: 0.325, y: 0.325 },
                o: { x: 0.73, y: 0.73 },
                t: 64,
                s: [412.387, 200.91, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0.73, y: 0 },
                t: 101,
                s: [412.387, 200.91, 0],
                to: [0, -3.333, 0],
                ti: [0, 3.333, 0],
              },
              { t: 117.000391016016, s: [412.387, 180.91, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [7, 10.468, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [7, 7],
                      [7, 13.936],
                    ],
                    c: !1,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 14, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
          {
            ty: 'tm',
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667], y: [1] },
                  o: { x: [0.333], y: [0] },
                  t: 48.016,
                  s: [100],
                },
                {
                  t: 64.031641016016,
                  s: [0],
                },
              ],
              ix: 1,
            },
            e: { a: 0, k: 100, ix: 2 },
            o: { a: 0, k: 0, ix: 3 },
            m: 1,
            ix: 2,
            nm: 'Trim Paths 1',
            mn: 'ADBE Vector Filter - Trim',
            hd: !1,
          },
        ],
        ip: 48.016016016016,
        op: 287,
        st: 48.016016016016,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: '50',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 41,
                s: [0],
              },
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 60,
                s: [100],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.957], y: [0] },
                t: 91,
                s: [100],
              },
              { t: 110.000195508008, s: [0] },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0, y: 0 },
                t: 41,
                s: [370.509, 225.91, 0],
                to: [0, -4.167, 0],
                ti: [0, 4.167, 0],
              },
              {
                i: { x: 0.325, y: 0.325 },
                o: { x: 0.333, y: 0.333 },
                t: 57,
                s: [370.509, 200.91, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 94,
                s: [370.509, 200.91, 0],
                to: [0, -3.333, 0],
                ti: [0, 3.333, 0],
              },
              { t: 110.000195508008, s: [370.509, 180.91, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [7, 10.468, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [7, 7],
                      [7, 13.936],
                    ],
                    c: !1,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 14, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [0, 0], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
          {
            ty: 'tm',
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667], y: [1] },
                  o: { x: [0.333], y: [0] },
                  t: 41.008,
                  s: [100],
                },
                {
                  t: 57.023633008008,
                  s: [0],
                },
              ],
              ix: 1,
            },
            e: { a: 0, k: 100, ix: 2 },
            o: { a: 0, k: 0, ix: 3 },
            m: 1,
            ix: 2,
            nm: 'Trim Paths 1',
            mn: 'ADBE Vector Filter - Trim',
            hd: !1,
          },
        ],
        ip: 41.008008008008,
        op: 288,
        st: 41.008008008008,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 5,
        ty: 4,
        nm: '25',
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 34,
                s: [0],
              },
              {
                i: { x: [0.043], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 53,
                s: [100],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.957], y: [0] },
                t: 86,
                s: [100],
              },
              { t: 105, s: [0] },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0, y: 0 },
                t: 34,
                s: [331.826, 241.131, 0],
                to: [0, -3.167, 0],
                ti: [0, 3.167, 0],
              },
              {
                i: { x: 0.325, y: 0.325 },
                o: { x: 0.333, y: 0.333 },
                t: 50,
                s: [331.826, 222.131, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.325, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 90,
                s: [331.826, 222.131, 0],
                to: [0, -2.667, 0],
                ti: [0, 2.667, 0],
              },
              { t: 105, s: [331.826, 206.131, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [7.284, 7.284, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [-0.284, -0.284],
                      [0.284, 0.284],
                    ],
                    c: !1,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 14, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [7.284, 7.284], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
          {
            ty: 'tm',
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.667], y: [1] },
                  o: { x: [0.333], y: [0] },
                  t: 34,
                  s: [100],
                },
                { t: 50.015625, s: [10] },
              ],
              ix: 1,
            },
            e: { a: 0, k: 100, ix: 2 },
            o: { a: 0, k: 0, ix: 3 },
            m: 1,
            ix: 2,
            nm: 'Trim Paths 1',
            mn: 'ADBE Vector Filter - Trim',
            hd: !1,
          },
        ],
        ip: 34,
        op: 289,
        st: 34,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 6,
        ty: 4,
        nm: 'Smile',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 4,
                s: [-80],
              },
              {
                i: { x: [0.833], y: [1] },
                o: { x: [0.167], y: [0] },
                t: 12,
                s: [20],
              },
              {
                i: { x: [0.667], y: [1] },
                o: { x: [0.333], y: [0] },
                t: 59,
                s: [20],
              },
              {
                i: { x: [0.509], y: [1.005] },
                o: { x: [0.167], y: [0] },
                t: 63.565,
                s: [0],
              },
              {
                i: { x: [0.281], y: [1] },
                o: { x: [0.154], y: [0] },
                t: 130,
                s: [0.008],
              },
              { t: 153.999903223536, s: [80] },
            ],
            ix: 10,
            x: `var $bm_rt;
var amp, freq, decay, n, n, t, t, v;
try {
    amp = $bm_div(effect('Elastic Controller')(1), 200);
    freq = $bm_div(effect('Elastic Controller')(2), 30);
    decay = $bm_div(effect('Elastic Controller')(3), 10);
    $bm_rt = n = 0;
    if (numKeys > 0) {
        $bm_rt = n = nearestKey(time).index;
        if (key(n).time > time) {
            n--;
        }
    }
    if (n == 0) {
        $bm_rt = t = 0;
    } else {
        $bm_rt = t = $bm_sub(time, key(n).time);
    }
    if (n > 0) {
        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));
        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));
    } else {
        $bm_rt = value;
    }
} catch (e$$4) {
    $bm_rt = value = value;
}`,
          },
          p: { a: 0, k: [305.718, 330.916, 0], ix: 2, l: 2 },
          a: { a: 0, k: [91.812, 14, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0, 0, 0.667], y: [1, 1, 1] },
                o: { x: [0, 0, 0.333], y: [0, 0, 0] },
                t: 4,
                s: [75, 75, 100],
              },
              {
                i: { x: [0.598, 0.598, 0.667], y: [1, 1, 1] },
                o: { x: [0.304, 0.304, 0.333], y: [0, 0, 0] },
                t: 13,
                s: [100, 100, 100],
              },
              {
                i: { x: [0.128, 0.128, 0.667], y: [1, 1, 1] },
                o: { x: [0.102, 0.102, 0.333], y: [0, 0, 0] },
                t: 130,
                s: [100, 100, 100],
              },
              { t: 144.999903223536, s: [75, 75, 100] },
            ],
            ix: 6,
            l: 2,
            x: `var $bm_rt;
var amp, freq, decay, n, n, t, t, v;
try {
    amp = $bm_div(effect('Elastic Controller 2')(1), 200);
    freq = $bm_div(effect('Elastic Controller 2')(2), 30);
    decay = $bm_div(effect('Elastic Controller 2')(3), 10);
    $bm_rt = n = 0;
    if (numKeys > 0) {
        $bm_rt = n = nearestKey(time).index;
        if (key(n).time > time) {
            n--;
        }
    }
    if (n == 0) {
        $bm_rt = t = 0;
    } else {
        $bm_rt = t = $bm_sub(time, key(n).time);
    }
    if (n > 0) {
        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));
        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));
    } else {
        $bm_rt = value;
    }
} catch (e$$4) {
    $bm_rt = value = value;
}`,
          },
        },
        ao: 0,
        ef: [
          {
            ty: 5,
            nm: 'Elastic Controller',
            np: 5,
            mn: 'Pseudo/MDS Elastic Controller',
            ix: 1,
            en: 1,
            ef: [
              {
                ty: 0,
                nm: 'Amplitude',
                mn: 'Pseudo/MDS Elastic Controller-0001',
                ix: 1,
                v: { a: 0, k: 20, ix: 1 },
              },
              {
                ty: 0,
                nm: 'Frequency',
                mn: 'Pseudo/MDS Elastic Controller-0002',
                ix: 2,
                v: { a: 0, k: 40, ix: 2 },
              },
              {
                ty: 0,
                nm: 'Decay',
                mn: 'Pseudo/MDS Elastic Controller-0003',
                ix: 3,
                v: { a: 0, k: 30, ix: 3 },
              },
            ],
          },
        ],
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [-6.714, 76.611],
                    ],
                    o: [
                      [59.605, 53.624],
                      [0, 0],
                    ],
                    v: [
                      [-78.463, 6.96],
                      [77.812, -49.644],
                    ],
                    c: !1,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 14, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [91.812, 63.645], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
          {
            ty: 'tm',
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.833], y: [0.833] },
                  o: { x: [0.167], y: [0.167] },
                  t: 4,
                  s: [100],
                },
                {
                  t: 7.99990322353604,
                  s: [0],
                },
              ],
              ix: 1,
            },
            e: {
              a: 1,
              k: [
                {
                  i: { x: [0.422], y: [1] },
                  o: { x: [0.064], y: [0] },
                  t: 130,
                  s: [100],
                },
                { t: 145.999903223536, s: [0] },
              ],
              ix: 2,
            },
            o: { a: 0, k: 0, ix: 3 },
            m: 1,
            ix: 2,
            nm: 'Trim Paths 1',
            mn: 'ADBE Vector Filter - Trim',
            hd: !1,
          },
        ],
        ip: 0,
        op: 187,
        st: 46.036036036036,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 7,
        ty: 4,
        nm: 'Blink',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [384.445, 263.714, 0], ix: 2, l: 2 },
          a: { a: 0, k: [34.936, 24.468, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 59.601,
                s: [0, 0, 100],
              },
              { t: 64.9676180086336, s: [100, 100, 100] },
            ],
            ix: 6,
            l: 2,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [11.564, 0],
                      [0, -11.562],
                    ],
                    o: [
                      [0, -11.562],
                      [-11.561, 0],
                      [0, 0],
                    ],
                    v: [
                      [20.936, 10.468],
                      [-0.001, -10.468],
                      [-20.936, 10.468],
                    ],
                    c: !1,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'st',
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 14, ix: 5 },
                lc: 2,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: 'Stroke 1',
                mn: 'ADBE Vector Graphic - Stroke',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [34.936, 24.468], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
          {
            ty: 'tm',
            s: {
              a: 1,
              k: [
                {
                  i: { x: [0.545], y: [1] },
                  o: { x: [0], y: [0] },
                  t: 130,
                  s: [0],
                },
                { t: 137.999844571134, s: [100] },
              ],
              ix: 1,
            },
            e: { a: 0, k: 100, ix: 2 },
            o: { a: 0, k: 0, ix: 3 },
            m: 1,
            ix: 2,
            nm: 'Trim Paths 1',
            mn: 'ADBE Vector Filter - Trim',
            hd: !1,
          },
        ],
        ip: 0,
        op: 288,
        st: 43.6336336336336,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 8,
        ty: 3,
        nm: 'Right Eye Null',
        sr: 1,
        ks: {
          o: { a: 0, k: 0, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 20,
                s: [377.402, 356.275, 0],
                to: [10.333, -18.417, 0],
                ti: [6.917, 16.917, 0],
              },
              { t: 26, s: [385.652, 268.525, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
var amp, freq, decay, n, n, t, t, v;
try {
    amp = $bm_div(effect('Elastic Controller')(1), 200);
    freq = $bm_div(effect('Elastic Controller')(2), 30);
    decay = $bm_div(effect('Elastic Controller')(3), 10);
    $bm_rt = n = 0;
    if (numKeys > 0) {
        $bm_rt = n = nearestKey(time).index;
        if (key(n).time > time) {
            n--;
        }
    }
    if (n == 0) {
        $bm_rt = t = 0;
    } else {
        $bm_rt = t = $bm_sub(time, key(n).time);
    }
    if (n > 0) {
        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));
        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));
    } else {
        $bm_rt = value;
    }
} catch (e$$4) {
    $bm_rt = value = value;
}`,
          },
          a: { a: 0, k: [50, 50, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] },
                o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] },
                t: 21,
                s: [23, 23, 100],
              },
              { t: 27, s: [100, 100, 100] },
            ],
            ix: 6,
            l: 2,
            x: `var $bm_rt;
var amp, freq, decay, n, n, t, t, v;
try {
    amp = $bm_div(effect('Elastic Controller')(1), 200);
    freq = $bm_div(effect('Elastic Controller')(2), 30);
    decay = $bm_div(effect('Elastic Controller')(3), 10);
    $bm_rt = n = 0;
    if (numKeys > 0) {
        $bm_rt = n = nearestKey(time).index;
        if (key(n).time > time) {
            n--;
        }
    }
    if (n == 0) {
        $bm_rt = t = 0;
    } else {
        $bm_rt = t = $bm_sub(time, key(n).time);
    }
    if (n > 0) {
        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));
        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));
    } else {
        $bm_rt = value;
    }
} catch (e$$4) {
    $bm_rt = value = value;
}`,
          },
        },
        ao: 0,
        ef: [
          {
            ty: 5,
            nm: 'Elastic Controller',
            np: 5,
            mn: 'Pseudo/MDS Elastic Controller',
            ix: 1,
            en: 1,
            ef: [
              {
                ty: 0,
                nm: 'Amplitude',
                mn: 'Pseudo/MDS Elastic Controller-0001',
                ix: 1,
                v: { a: 0, k: 20, ix: 1 },
              },
              {
                ty: 0,
                nm: 'Frequency',
                mn: 'Pseudo/MDS Elastic Controller-0002',
                ix: 2,
                v: { a: 0, k: 40, ix: 2 },
              },
              {
                ty: 0,
                nm: 'Decay',
                mn: 'Pseudo/MDS Elastic Controller-0003',
                ix: 3,
                v: { a: 0, k: 60, ix: 3 },
              },
            ],
          },
        ],
        ip: 20,
        op: 46.8369140625,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 9,
        ty: 4,
        nm: 'Right Eye',
        parent: 8,
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [50, 50, 0], ix: 2, l: 2 },
          a: { a: 0, k: [21.186, 21.186, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] },
                o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
                t: 59.601,
                s: [100, 100, 100],
              },
              { t: 64.9676180086336, s: [0, 0, 100] },
            ],
            ix: 6,
            l: 2,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [-11.563, 0],
                      [0, -11.563],
                      [11.563, 0],
                      [0, 11.562],
                    ],
                    o: [
                      [11.563, 0],
                      [0, 11.562],
                      [-11.563, 0],
                      [0, -11.563],
                    ],
                    v: [
                      [0, -20.936],
                      [20.936, 0.001],
                      [0, 20.936],
                      [-20.936, 0.001],
                    ],
                    c: !0,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 1, 1, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [21.186, 21.185], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 20,
        op: 63,
        st: 43.6336336336336,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 10,
        ty: 3,
        nm: 'Left Eye Null',
        sr: 1,
        ks: {
          o: { a: 0, k: 0, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.833, y: 0.833 },
                o: { x: 0.167, y: 0.167 },
                t: 14,
                s: [210.152, 322.525, 0],
                to: [4.875, -31.375, 0],
                ti: [4.875, 10.375, 0],
              },
              { t: 20, s: [201.652, 268.525, 0] },
            ],
            ix: 2,
            l: 2,
            x: `var $bm_rt;
var amp, freq, decay, n, n, t, t, v;
try {
    amp = $bm_div(effect('Elastic Controller')(1), 200);
    freq = $bm_div(effect('Elastic Controller')(2), 30);
    decay = $bm_div(effect('Elastic Controller')(3), 10);
    $bm_rt = n = 0;
    if (numKeys > 0) {
        $bm_rt = n = nearestKey(time).index;
        if (key(n).time > time) {
            n--;
        }
    }
    if (n == 0) {
        $bm_rt = t = 0;
    } else {
        $bm_rt = t = $bm_sub(time, key(n).time);
    }
    if (n > 0) {
        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));
        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));
    } else {
        $bm_rt = value;
    }
} catch (e$$4) {
    $bm_rt = value = value;
}`,
          },
          a: { a: 0, k: [50, 50, 0], ix: 1, l: 2 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] },
                o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] },
                t: 15,
                s: [23, 23, 100],
              },
              { t: 21, s: [100, 100, 100] },
            ],
            ix: 6,
            l: 2,
            x: `var $bm_rt;
var amp, freq, decay, n, n, t, t, v;
try {
    amp = $bm_div(effect('Elastic Controller')(1), 200);
    freq = $bm_div(effect('Elastic Controller')(2), 30);
    decay = $bm_div(effect('Elastic Controller')(3), 10);
    $bm_rt = n = 0;
    if (numKeys > 0) {
        $bm_rt = n = nearestKey(time).index;
        if (key(n).time > time) {
            n--;
        }
    }
    if (n == 0) {
        $bm_rt = t = 0;
    } else {
        $bm_rt = t = $bm_sub(time, key(n).time);
    }
    if (n > 0) {
        v = velocityAtTime($bm_sub(key(n).time, $bm_div(thisComp.frameDuration, 10)));
        $bm_rt = $bm_sum(value, $bm_div($bm_mul($bm_mul(v, amp), Math.sin($bm_mul($bm_mul($bm_mul(freq, t), 2), Math.PI))), Math.exp($bm_mul(decay, t))));
    } else {
        $bm_rt = value;
    }
} catch (e$$4) {
    $bm_rt = value = value;
}`,
          },
        },
        ao: 0,
        ef: [
          {
            ty: 5,
            nm: 'Elastic Controller',
            np: 5,
            mn: 'Pseudo/MDS Elastic Controller',
            ix: 1,
            en: 1,
            ef: [
              {
                ty: 0,
                nm: 'Amplitude',
                mn: 'Pseudo/MDS Elastic Controller-0001',
                ix: 1,
                v: { a: 0, k: 20, ix: 1 },
              },
              {
                ty: 0,
                nm: 'Frequency',
                mn: 'Pseudo/MDS Elastic Controller-0002',
                ix: 2,
                v: { a: 0, k: 40, ix: 2 },
              },
              {
                ty: 0,
                nm: 'Decay',
                mn: 'Pseudo/MDS Elastic Controller-0003',
                ix: 3,
                v: { a: 0, k: 60, ix: 3 },
              },
            ],
          },
        ],
        ip: 14,
        op: 288,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 11,
        ty: 4,
        nm: 'Left eye',
        parent: 10,
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.833], y: [0.833] },
                o: { x: [0.167], y: [0.167] },
                t: 130,
                s: [100],
              },
              {
                t: 135.999805469532,
                s: [0],
              },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: {
            a: 1,
            k: [
              {
                i: { x: 0.667, y: 1 },
                o: { x: 0.333, y: 0 },
                t: 58,
                s: [50, 50, 0],
                to: [-2.333, 9.5, 0],
                ti: [2.333, -9.5, 0],
              },
              {
                i: { x: 0.642, y: 0.642 },
                o: { x: 0.167, y: 0.167 },
                t: 63,
                s: [36, 107, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              {
                i: { x: 0.678, y: 1 },
                o: { x: 0.344, y: 0 },
                t: 130,
                s: [36, 107, 0],
                to: [0, 0, 0],
                ti: [0, 0, 0],
              },
              { t: 135.999805469532, s: [63, 59, 0] },
            ],
            ix: 2,
            l: 2,
          },
          a: { a: 0, k: [21.186, 21.186, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [-11.563, 0],
                      [0, -11.563],
                      [11.563, 0],
                      [0, 11.562],
                    ],
                    o: [
                      [11.563, 0],
                      [0, 11.562],
                      [-11.563, 0],
                      [0, -11.563],
                    ],
                    v: [
                      [0, -20.936],
                      [20.936, 0.001],
                      [0, 20.936],
                      [-20.936, 0.001],
                    ],
                    c: !0,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 1, 1, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [21.186, 21.185], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 14,
        op: 288,
        st: 42.032032032032,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 12,
        ty: 4,
        nm: 'Main circle 3',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [300, 300, 0], ix: 2, l: 2 },
          a: { a: 0, k: [239.25, 239.25, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, -131.996],
                      [131.996, 0],
                      [0, 131.996],
                      [-131.996, 0],
                    ],
                    o: [
                      [0, 131.996],
                      [-131.996, 0],
                      [0, -131.996],
                      [131.996, 0],
                    ],
                    v: [
                      [239, 0],
                      [0, 239],
                      [-239, 0],
                      [0, -239],
                    ],
                    c: !0,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 0.4, 0.490196078431, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [239.25, 239.25], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 0,
        op: 288,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 13,
        ty: 4,
        nm: 'Main circle 2',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [300, 300, 0], ix: 2, l: 2 },
          a: { a: 0, k: [239.25, 239.25, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, -131.996],
                      [131.996, 0],
                      [0, 131.996],
                      [-131.996, 0],
                    ],
                    o: [
                      [0, 131.996],
                      [-131.996, 0],
                      [0, -131.996],
                      [131.996, 0],
                    ],
                    v: [
                      [239, 0],
                      [0, 239],
                      [-239, 0],
                      [0, -239],
                    ],
                    c: !0,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'fl',
                c: {
                  a: 0,
                  k: [0.509803921569, 0.513725490196, 0.854901960784, 1],
                  ix: 4,
                },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [239.25, 239.25], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 0,
        op: 288,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 14,
        ty: 4,
        nm: 'Main circle',
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [300, 300, 0], ix: 2, l: 2 },
          a: { a: 0, k: [239.25, 239.25, 0], ix: 1, l: 2 },
          s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
        },
        ao: 0,
        shapes: [
          {
            ty: 'gr',
            it: [
              {
                ind: 0,
                ty: 'sh',
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, -131.996],
                      [131.996, 0],
                      [0, 131.996],
                      [-131.996, 0],
                    ],
                    o: [
                      [0, 131.996],
                      [-131.996, 0],
                      [0, -131.996],
                      [131.996, 0],
                    ],
                    v: [
                      [239, 0],
                      [0, 239],
                      [-239, 0],
                      [0, -239],
                    ],
                    c: !0,
                  },
                  ix: 2,
                },
                nm: 'Path 1',
                mn: 'ADBE Vector Shape - Group',
                hd: !1,
              },
              {
                ty: 'fl',
                c: { a: 0, k: [1, 0.592000026329, 0.463000009574, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: 'Fill 1',
                mn: 'ADBE Vector Graphic - Fill',
                hd: !1,
              },
              {
                ty: 'tr',
                p: { a: 0, k: [239.25, 239.25], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: 'Transform',
              },
            ],
            nm: 'Group 1',
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: 'ADBE Vector Group',
            hd: !1,
          },
        ],
        ip: 0,
        op: 288,
        st: 0,
        bm: 0,
      },
    ],
    Rr = [],
    ki = {
      v: Sr,
      fr: Ar,
      ip: Tr,
      op: Cr,
      w: Ir,
      h: Fr,
      nm: Mr,
      ddd: Vr,
      assets: Lr,
      layers: Dr,
      markers: Rr,
    };
  var Or = { home: he, works: fi, work: di, resources: vi, 404: xi };
  new le({
    loader: (t) => {
      let e = B('#loader'),
        i = B('#loader-percent', e),
        r = B('#spinner', e),
        s = new z({
          targets: r,
          duration: 1200,
          easing: 'o6',
          opacity: [0, 1],
          transform: { sx: [0, 1], sy: [0, 1] },
        }),
        a = new z({
          targets: i,
          duration: 1200,
          easing: 'o6',
          opacity: [0, 1],
        }),
        l = new Mt({ target: r, data: ki, lazy: !1, observe: !1 });
      l.anim.play();
      let m = new Ft();
      if (!G.mobile) {
        let d = et('.page-link--bg.fx');
        d.forEach((g) => {
          g.style.opacity = 0;
        }),
          d.forEach((g, x) => {
            m.add(
              new z({
                targets: g,
                delay: 150 * x,
                duration: 1750,
                easing: 'io6',
                opacity: [1, 1],
                transform: { y: [100, 0], yu: '%' },
              }),
            );
          });
      }
      m.add(
        new dt({
          duration: 400,
          complete: () => {
            s.reverse(), a.reverse(), t();
          },
        }),
      ),
        m.add(
          new z({
            targets: e,
            opacity: [1, 0],
            duration: 200,
            complete: () => {
              l.destroy(), e.remove();
            },
          }),
        ),
        m.do('pause'),
        se({
          arr: Zt.essential,
          update: (d, g, x) => {
            i.innerText = Math.floor(x);
          },
          complete: () => {
            m.do('restart');
          },
        });
    },
    controllers: Or,
    preload: ['/', '/works/', '/resources/'],
  });
  X.add(
    window,
    'load',
    () => {
      console.log('Code by: Siddharth \u2014 https://v2.siddharthsham.com/'),
        console.log('Design by: Abhishek \u2014 https://abhishekjha.me/'),
        'serviceWorker' in navigator &&
          window.location.hostname !== 'localhost' &&
          navigator.serviceWorker.register('/sw.js');
    },
    { once: !0 },
  );
})();
/*!
Transformation Matrix v2.0
(c) Epistemex 2014-2015
www.epistemex.com
By Ken Fyrstenberg
Contributions by leeoniya.
License: MIT, header required.
*/
