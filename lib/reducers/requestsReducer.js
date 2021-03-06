'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bpfrpt_proptype_RequestsReducerStateType = exports.bpfrpt_proptype_RequestResultType = exports.defaultResult = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends6 = require('babel-runtime/helpers/extends');

var _extends7 = _interopRequireDefault(_extends6);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];
  var type = action.type,
      requestKey = action.requestKey;


  switch (type) {
    case _requestsActions.REQUEST_START:
      return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, requestKey, (0, _extends7.default)({}, state[requestKey], {
        loading: true,
        failureError: null
      })));

    case _requestsActions.REQUEST_SUCCESS:
      {
        if (state[requestKey] == null) return state;
        var _ref = action,
            _data = _ref.data,
            _ref$options = _ref.options;
        _ref$options = _ref$options === undefined ? {} : _ref$options;
        var merge = _ref$options.merge,
            comparator = _ref$options.comparator;


        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, requestKey, (0, _extends7.default)({}, state[requestKey], {
          loading: false,
          data: mergeData(state[requestKey].data, _data, merge, comparator),
          dataError: null
        })));
      }

    case _requestsActions.REQUEST_ERROR:
      {
        if (state[requestKey] == null) return state;
        var _data2 = action.data;


        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, requestKey, (0, _extends7.default)({}, state[requestKey], {
          loading: false,
          dataError: _data2
        })));
      }

    case _requestsActions.REQUEST_FAILURE:
      {
        if (state[requestKey] == null) return state;
        var error = action.error;


        return (0, _extends7.default)({}, state, (0, _defineProperty3.default)({}, requestKey, (0, _extends7.default)({}, state[requestKey], {
          loading: false,
          failureError: error
        })));
      }

    case _requestsActions.REQUEST_CLEAR:
      {
        return _ramda2.default.dissoc(requestKey, state);
      }

    case _requestsActions.REQUEST_SUBSCRIPTION_ACTION:
      {
        var _ref2 = action,
            _requestKey = _ref2.requestKey,
            _comparator = _ref2.options.comparator;

        if (state[_requestKey] == null) {
          return state;
        }
        var object = action.object;
        var sAction = action.action;

        var fn = null;

        if (sAction === 'create') fn = function fn(data) {
          return [].concat((0, _toConsumableArray3.default)(data), [object]);
        };
        if (sAction === 'destroy') fn = function fn(data) {
          return data.filter(function (x) {
            return x.id !== object.id;
          });
        };
        if (sAction === 'update') {
          fn = function fn(data) {
            if (data.id) {
              return object;
            }
            var index = _ramda2.default.findIndex(function (x) {
              return x.id === object.id;
            }, data);
            // $FlowIgnore
            if (index === -1) return [].concat((0, _toConsumableArray3.default)(data), [object]);
            return _ramda2.default.update(index, object, data);
          };
        }

        if (fn != null) {
          if (_comparator != null) {
            var fnOld = fn;
            fn = function fn(data) {
              return _ramda2.default.sort(_comparator, fnOld(data));
            };
          }

          return updatePath([_requestKey, 'data'], fn, state);
        }
        console.warn('unrecognized subscribe action \'' + sAction + '\'');
        return state;
      }

    default:
      return state;
  }
};

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _requestsActions = require('../actions/requestsActions');

var _types = require('../types');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bpfrpt_proptype_RequestResultType = {
  data: function data() {
    return (typeof T === 'function' ? _propTypes2.default.instanceOf(T).isRequired : _propTypes2.default.any.isRequired).apply(this, arguments);
  },
  failureError: function failureError(props, propName, componentName) {
    if (!Object.prototype.hasOwnProperty.call(props, propName)) {
      throw new Error('Prop `' + propName + '` has type \'any\' or \'mixed\', but was not provided to `' + componentName + '`. Pass undefined or any other value.');
    }
  },
  dataError: function dataError(props, propName, componentName) {
    if (!Object.prototype.hasOwnProperty.call(props, propName)) {
      throw new Error('Prop `' + propName + '` has type \'any\' or \'mixed\', but was not provided to `' + componentName + '`. Pass undefined or any other value.');
    }
  },
  loading: _propTypes2.default.bool.isRequired
};
var bpfrpt_proptype_RequestsReducerStateType = {};


var defaultState = {};
var defaultResult = exports.defaultResult = {
  data: undefined,
  failureError: null,
  dataError: null,
  loading: false
};

function mergeData(oldData, newData) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'replace';
  var comparator = arguments[3];

  var mergedData = _mergeData(oldData, newData, type);
  return comparator == null ? mergedData : _ramda2.default.sort(comparator, mergedData);
}

function _mergeData(oldData, newData, type) {
  if (type === 'replace') return newData;else if (type === 'append') {
    if (oldData == null) return newData;
    if (newData == null) return oldData;
    if (oldData instanceof Array && newData instanceof Array) return [].concat((0, _toConsumableArray3.default)(oldData), (0, _toConsumableArray3.default)(newData));
    throw new Error('Unacceptable data types: ' + oldData.constructor.name + ' and ' + newData.constructor.name);
  } else {
    throw new Error('Unacceptable merge type: ' + type);
  }
}

var updatePath = _ramda2.default.curry(function (path, fn, object) {
  var value = fn(_ramda2.default.path(path, object));
  return _ramda2.default.assocPath(path, value, object);
});

exports.bpfrpt_proptype_RequestResultType = bpfrpt_proptype_RequestResultType;
exports.bpfrpt_proptype_RequestsReducerStateType = bpfrpt_proptype_RequestsReducerStateType;