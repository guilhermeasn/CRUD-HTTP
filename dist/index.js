"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = exports["default"] = void 0;

var _crudHttp = require("./crud-http.js");

var initialize = _crudHttp.CRUD_HTTP;
exports.initialize = initialize;

var _default = (0, _crudHttp.CRUD_HTTP)();

exports["default"] = _default;