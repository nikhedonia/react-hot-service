'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.reactHotService = reactHotService;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function reactHotService(devConf, assets) {
  var opt = arguments.length <= 2 || arguments[2] === undefined ? { noInfo: true, log: console.log, timeout: 2000, reload: false, overlay: false } : arguments[2];

  var files = _glob2['default'].sync(assets);

  var queryOpt = { timeout: opt.timeout, reload: opt.reload, overlay: opt.overlay };
  var query = Object.keys(queryOpt).map(function (k) {
    return k + '=' + opt[k];
  }).join('&');
  var assetsRoute = function assetsRoute(file) {
    return ['webpack-hot-middleware/client?' + query, file];
  };
  devConf.entry = files.map(function (f) {
    return _defineProperty({}, _path2['default'].basename(f), assetsRoute(_path2['default'].resolve(f)));
  }).reduce(function (a, b) {
    return (0, _extend2['default'])(a, b);
  }, {});

  var compiler = (0, _webpack2['default'])(devConf);
  return function (app) {
    app.use((0, _webpackDevMiddleware2['default'])(compiler, { publicPath: devConf.output.publicPath }));
    app.use((0, _webpackHotMiddleware2['default'])(compiler, opt));
  };
}