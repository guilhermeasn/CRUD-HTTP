"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CRUD_HTTP = CRUD_HTTP;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/**
 * CRUD-HTTP
 * 
 * @see https://github.com/guilhermeasn/CRUD-HTTP#readme
 * @author Guilherme Neves <guilhermeasn@yahoo.com.br>
 */
function CRUD_HTTP(root_config) {
  var root_callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (result, action) {};
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(action) {
      var path,
          input,
          config,
          callback,
          http,
          location,
          params,
          result,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              path = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
              input = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
              config = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
              callback = _args.length > 4 && _args[4] !== undefined ? _args[4] : function (result) {};
              http = _axios["default"].create(typeof root_config === 'function' ? root_config() : root_config);
              location = path.join('/');

              params = function params(input) {
                return input ? '?' + new URLSearchParams(input).toString() : '';
              };

              result = {
                response: {},
                success: null,
                message: '',
                error: '',
                dataset: [],
                data: {},
                errors: {}
              };
              _context.prev = 8;
              _context.t0 = action;
              _context.next = _context.t0 === 'CREATE' ? 12 : _context.t0 === 'post' ? 12 : _context.t0 === 'READ' ? 16 : _context.t0 === 'get' ? 16 : _context.t0 === 'UPDATE' ? 20 : _context.t0 === 'put' ? 20 : _context.t0 === 'DELETE' ? 24 : _context.t0 === 'delete' ? 24 : _context.t0 === 'path' ? 28 : _context.t0 === 'head' ? 32 : _context.t0 === 'options' ? 36 : 40;
              break;

            case 12:
              _context.next = 14;
              return http.post(location, input, config);

            case 14:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 16:
              _context.next = 18;
              return http.get(location + params(input), config);

            case 18:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 20:
              _context.next = 22;
              return http.put(location, input, config);

            case 22:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 24:
              _context.next = 26;
              return http["delete"](location, _objectSpread(_objectSpread({}, config), {}, {
                data: input
              }));

            case 26:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 28:
              _context.next = 30;
              return http.patch(location, input, config);

            case 30:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 32:
              _context.next = 34;
              return http.head(location + params(input), config);

            case 34:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 36:
              _context.next = 38;
              return http.options(location + params(input), config);

            case 38:
              result.response = _context.sent;
              return _context.abrupt("break", 42);

            case 40:
              console.error('The CRUD function only accepts actions: CREATE, READ, UPDATE, DELETE, post, get, put, path, delete, head or options');
              throw new Error('An unexpected error occurred');

            case 42:
              result.success = true;
              _context.next = 48;
              break;

            case 45:
              _context.prev = 45;
              _context.t1 = _context["catch"](8);
              if (typeof _context.t1.response !== 'undefined') result.response = _context.t1.response;else {
                if (typeof _context.t1 === 'string') result.error = _context.t1;
                result.response = _context.t1;
              }

            case 48:
              if (typeof result.response.status !== 'undefined' && /^4\d\d$/.test(result.response.status)) {
                result.success = false;
              }

              if (typeof result.response.data !== 'undefined') {
                if (Array.isArray(result.response.data)) result.dataset = result.response.data;else if (typeof result.response.data === 'string') result.message = result.response.data;else if ((0, _typeof2["default"])(result.response.data) === 'object') {
                  if (typeof result.response.data.message === 'string') result.message = result.response.data.message;
                  if (typeof result.response.data.error === 'string') result.error = result.response.data.error;
                  if ((0, _typeof2["default"])(result.response.data.errors) === 'object') result.errors = result.response.data.errors;
                  if (Array.isArray(result.response.data.dataset)) result.dataset = result.response.data.dataset;
                  Object.keys(result.response.data).map(function (key) {
                    if ((key !== 'dataset' || !Array.isArray(result.response.data[key])) && (key !== 'message' || typeof result.response.data[key] !== 'string') && (key !== 'error' || typeof result.response.data[key] !== 'string') && (key !== 'errors' || (0, _typeof2["default"])(result.response.data[key]) !== 'object')) {
                      result.data = _objectSpread(_objectSpread({}, result.data), {}, (0, _defineProperty2["default"])({}, key, result.response.data[key]));
                    }
                  });
                } else result.data = {
                  'result': result.response.data
                };
              }

              if (typeof root_callback === 'function') root_callback(result, action);
              if (typeof callback === 'function') callback(result);
              return _context.abrupt("return", result);

            case 53:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 45]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}