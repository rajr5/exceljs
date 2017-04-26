/**
 * Copyright (c) 2015-2017 Guyon Roche
 * LICENCE: MIT - please refer to LICENCE file included with this module
 * or https://github.com/guyonroche/exceljs/blob/master/LICENSE
 */

'use strict';


var utils = require('./utils');

var nop = function() {};

// StringBuf - a way to keep string memory operations to a minimum
// while building the strings for the xml files
var StringBuf = module.exports = function(options) {
  this.reset();
};

StringBuf.prototype = {
  get length() {
    return this._buf.length;
  },
  toString: function() {
    return this._buf.join('');
  },

  reset: function(position) {
    if (position) {
      while (this._buf.length > position) {
        this._buf.pop();
      }
    } else {
      this._buf = [];
    }
  },
  addText: function(text) {
    this._buf.push(text);
  },

  //addText: function() {
  //    for (var i = 0; i < arguments.length; i++) {
  //        this._addText(arguments[i]);
  //    }
  //},

  addStringBuf: function(inBuf) {
    this._buf.push(inBuf.toString());
  }
};
