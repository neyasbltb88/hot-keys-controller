var c = Object.defineProperty;
var _ = (s, t, e) => t in s ? c(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var a = (s, t, e) => (_(s, typeof t != "symbol" ? t + "" : t, e), e);
class p {
  /**
   * @class
   * @param {string} [eventsPrefix=""] Префикс для имени всех генерируемых событий "eventsPrefix:eventName"
   * @param {boolean} [autoPrefix=false] Добавлять ли автоматически префикс
   * к именам событий при подписке и отписке от них.
   * При генерации события этот префикс всегда добавляется автоматически
   */
  constructor(t = "", e = !1) {
    Object.defineProperty(this, "allEvents", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, "events", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "onceCallbacks", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "eventsPrefix", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "autoPrefix", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.eventsPrefix = t, this.autoPrefix = e;
  }
  /**
   * @description Получить имя события с учетом условий добавления префикса к нему
   * @param {string} type Имя события
   * @param {boolean} usePrefix Добавлять ли к имени события префикс, если он есть
   */
  getEventName(t, e = this.autoPrefix) {
    return this.eventsPrefix && e ? `${this.eventsPrefix}:${t}` : t;
  }
  /**
   * @description Метод подписки на события
   * @param {string} type Имя события
   * @param {Function} callback Функция-обработчик событий с именем {type}
   * @returns {this} Возвращает инстанс
   */
  on(t, e) {
    let i = this.getEventName(t);
    return this.events[i] = this.events[i] || /* @__PURE__ */ new Set(), this.events[i].add(e), this;
  }
  /**
   * @description Метод отписки от события
   * @param {string} type Имя события
   * @param {Function} callback Функция-обработчик событий с именем {type}
   * @returns {this} Возвращает инстанс
   */
  off(t, e) {
    let i = this.getEventName(t);
    return this.events[i] ? (this.events[i].delete(e), this) : this;
  }
  /**
   * @description Метод подписки на события.
   * С помощью этого метода можно установить только один обработчик на одно имя события {type}
   * @param {string} type Имя события
   * @param {Function} callback Функция-обработчик событий с именем {type}
   * @returns {this} Возвращает инстанс
   */
  one(t, e) {
    let i = this.getEventName(t);
    return this.events[i] = /* @__PURE__ */ new Set([e]), this;
  }
  /**
   * @description Метод подписки на события.
   * С помощью этого метода можно установить обработчик, который вызовется только один раз
   * и автоматически отпишется от события после вызова
   * @param {string} type Имя события
   * @param {Function} callback Функция-обработчик событий с именем {type}
   * @returns {this} Возвращает инстанс
   */
  once(t, e) {
    let i = this.getEventName(t);
    return this.events[i] = this.events[i] || /* @__PURE__ */ new Set(), this.events[i].add(e), this.onceCallbacks[i] = this.onceCallbacks[i] || /* @__PURE__ */ new Set(), this.onceCallbacks[i].add(e), this;
  }
  /**
   * @description Метод подписки на все события
   * @param {Function} callback Функция-обработчик всех событий
   * @returns {this} Возвращает инстанс
   */
  onAll(t) {
    return this.allEvents.add(t), this;
  }
  /**
   * @description Метод отписки от всех событий
   * @param {Function} callback Функция-обработчик всех событий
   * @returns {this} Возвращает инстанс
   */
  offAll(t) {
    return this.allEvents.delete(t), this;
  }
  /**
   * @description Метод генерации событий, запускающий оповещение всех функций-обработчиков события с именем {type}
   * @param {string} type Имя события
   * @param {any} [arg] Данные, прикрепляемые к событию.
   * @returns {this} Возвращает инстанс
   */
  emit(t, e) {
    let i = this.getEventName(t, !0);
    return this.allEvents.forEach((n) => n(t, e)), this.events[i] && this.events[i].forEach((n) => {
      var o, r;
      n(e), (r = (o = this.onceCallbacks[i]) == null ? void 0 : o.has) != null && r.call(o, n) && (this.off(t, n), this.onceCallbacks[i].delete(n));
    }), this;
  }
}
const v = (s, t) => Object.assign({}, t, s), m = (s) => typeof s == "string" ? document.querySelector(s) : (s != null && s.$el && typeof s.$el == "object" && (s = s.$el), typeof s == "object" && "addEventListener" in s ? s : null), y = (s) => {
  const t = /Key|Digit/;
  return s.replace(t, "");
}, h = {
  CTRL: "CTRL",
  SHIFT: "SHIFT",
  ALT: "ALT",
  META: "META"
}, E = {
  CTRL: /* @__PURE__ */ new Set(["ControlLeft", "ControlRight"]),
  SHIFT: /* @__PURE__ */ new Set(["ShiftLeft", "ShiftRight"]),
  ALT: /* @__PURE__ */ new Set(["AltLeft", "AltRight"]),
  META: /* @__PURE__ */ new Set(["MetaLeft", "MetaRight"])
}, g = (s) => {
  let t = /* @__PURE__ */ new Set();
  const { ctrlKey: e, altKey: i, shiftKey: n, metaKey: o, code: r } = s;
  o && t.add(h.META), e && t.add(h.CTRL), i && t.add(h.ALT), n && t.add(h.SHIFT);
  const l = y(r);
  let u = !1;
  for (const b of t) {
    const f = E[b];
    if (!f)
      break;
    if (f.has(l)) {
      u = !0;
      break;
    }
  }
  return u || t.add(l), [...t].join("+");
}, d = {
  el: null,
  autoEnable: !0,
  debug: !1,
  tabindex: 0
};
class w extends p {
  constructor(e = {}, i = []) {
    super();
    a(this, "_options");
    a(this, "_actions", []);
    a(this, "_restoreTabindex", null);
    a(this, "_isEnabled", !1);
    a(this, "_onKeyDown", (e) => {
      var n, o;
      const i = g(e);
      if (e.hotKey = i, this._options.debug) {
        const r = { event: e, hotKey: i };
        console.log(r), this.emit("debug", r);
      }
      ((n = this.events[i]) != null && n.size || (o = this.onceCallbacks[i]) != null && o.size) && (this.emit("action", i), e.preventDefault()), this.emit("keydown", e), this.emit(i, e);
    });
    this._options = v(e, d), e.el && this._prepareElement(e.el), i.length && this.setActions(i), this._options.autoEnable && this.enable();
  }
  get isEnabled() {
    return this._isEnabled;
  }
  /** Устанавливает массив экшнов */
  setActions(e) {
    return this._unsubscribeActions(), this._actions = e, this._subscribeActions(), this.emit("setActions", e), this;
  }
  /** Активирует прослушивание клавиатурных событий на элементе el.
   * Если явно в метод не передается el, то он будет взят из объекта options, который передавался в конструктор */
  enable(e) {
    if (this._isEnabled && this.disable(), e && this._prepareElement(e), !(!this._options.el || typeof this._options.el != "object"))
      return this._isEnabled = !0, this._options.el.addEventListener("keydown", this._onKeyDown), this.emit("enable"), this;
  }
  /** Деактивирует прослушивание клавиатурных событий */
  disable() {
    if (!(!this._options.el || typeof this._options.el != "object"))
      return this._isEnabled = !1, this._options.el.removeEventListener("keydown", this._onKeyDown), this.emit("disable"), this;
  }
  /** Обнуляет все опции и экшны, что должно помочь сборщику мусора подчистить данные.
   * Вызывать этот метод в хуках beforeDestroy компонента, где был создан инстанс этого класса. */
  destroy() {
    this.disable(), this._unsubscribeActions(), this._restoreElement(), this._options = d, this._actions = [], this.emit("destroy");
  }
  /** Метод переключения режима отладки, в котором в консоль будут выводиться
   * данные обо всех клавиатурных событиях на элементе,
   * из них можно взять правильное значение hotKey для комбинации */
  toggleDebug(e) {
    return this._options.debug = e, this;
  }
  _subscribeActions() {
    this._actions.forEach(({ hotKey: e, callback: i }) => this.on(e, i));
  }
  _unsubscribeActions() {
    this._actions.forEach(({ hotKey: e, callback: i }) => this.off(e, i));
  }
  _prepareElement(e) {
    e && (this._restoreElement(), this._options.el = m(e), this._options.el && typeof this._options.tabindex == "number" && (this._restoreTabindex = this._options.el.getAttribute("tabindex"), this._options.el.setAttribute("tabindex", String(this._options.tabindex))));
  }
  _restoreElement() {
    !this._options.el || typeof this._options.el != "object" || (this._restoreTabindex ? this._options.el.setAttribute("tabindex", this._restoreTabindex) : this._options.el.removeAttribute("tabindex"));
  }
}
export {
  w as HotKeysController,
  w as default
};
