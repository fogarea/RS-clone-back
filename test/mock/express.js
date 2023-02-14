export const success = {
  result: false,

  drop: function () {
    this.result = false;
  },

  apply: function () {
    this.result = true;
  }
};

export const res = {
  cookies: {},
  headers: {},
  status: function (status) {
    this._status = status;
    return this;
  },
  cookie: function (name, value) {
    this.cookies[name] = value;
    return this;
  },
  header: function (name, value) {
    this.headers[name] = value;
    return this;
  },
  json: function (object) {
    return object;
  }
};

export const next = () => {
  success.apply();
};
