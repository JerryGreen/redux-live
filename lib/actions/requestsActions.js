'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var babelPluginFlowReactPropTypes_proptype_HashType = require('../types').babelPluginFlowReactPropTypes_proptype_HashType || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_OptionsType = require('../reducers/requestsReducer').babelPluginFlowReactPropTypes_proptype_OptionsType || require('react').PropTypes.any;

if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_RequestStartActionType', {
  value: require('react').PropTypes.shape({
    type: require('react').PropTypes.oneOf(['REQUEST_START']).isRequired,
    requestKey: require('react').PropTypes.string.isRequired,
    params: babelPluginFlowReactPropTypes_proptype_HashType
  })
});
var REQUEST_START = exports.REQUEST_START = 'REQUEST_START';
var REQUEST_SUCCESS = exports.REQUEST_SUCCESS = 'REQUEST_SUCCESS';
var REQUEST_ERROR = exports.REQUEST_ERROR = 'REQUEST_ERROR';
var REQUEST_FAILURE = exports.REQUEST_FAILURE = 'REQUEST_FAILURE';
var REQUEST_CLEAR = exports.REQUEST_CLEAR = 'REQUEST_CLEAR';
var REQUEST_SUBSCRIPTION_ACTION = exports.REQUEST_SUBSCRIPTION_ACTION = 'REQUEST_SUBSCRIPTION_ACTION';

var success = exports.success = function success(requestKey, data, options) {
  return {
    type: REQUEST_SUCCESS, requestKey: requestKey, data: data, options: options
  };
};

var error = exports.error = function error(requestKey, data, status) {
  return {
    type: REQUEST_ERROR, requestKey: requestKey, data: data, status: status
  };
};

var failure = exports.failure = function failure(requestKey, error) {
  return {
    type: REQUEST_FAILURE, requestKey: requestKey, error: error
  };
};

var clear = exports.clear = function clear(requestKey) {
  return {
    type: REQUEST_CLEAR, requestKey: requestKey
  };
};

var subscriptionAction = exports.subscriptionAction = function subscriptionAction(requestKey, action, object) {
  return {
    type: REQUEST_SUBSCRIPTION_ACTION, requestKey: requestKey, action: action, object: object
  };
};