/**
 * Copyright (c) 2015 Guyon Roche
 * LICENCE: MIT - please refer to LICENCE file included with this module
 * or https://github.com/guyonroche/exceljs/blob/master/LICENSE
 */

'use strict';

var Sax = require('sax');
var PromishLib = require('../../utils/promish');

var XmlStream = require('../../utils/xml-stream');

// Base class for Xforms
var BaseXform = module.exports = function(model, name) {
};

BaseXform.prototype = {
  // ============================================================
  // Virtual Interface
  prepare:  function(model, options) {
    // optional preparation (mutation) of model so it is ready for write
  },
  render: function(xmlStream, model) {
    // convert model to xml
  },
  parseOpen:  function(node) {
    // Sax Open Node event
  },
  parseText: function(node) {
    // Sax Text event
  },
  parseClose: function(name) {
    // Sax Close Node event
  },
  reconcile: function(model, options) {
    // optional post-parse step (opposite to prepare)
  },
  
  // ============================================================
  reset: function(model) {
    // to make sure parses don't bleed to next iteration
    this.model = model;
  },
  parse: function(parser) {
    var self = this;
    return new PromishLib.Promish(function(resolve, reject) {
      parser.on('opentag', function(node) {
        self.parseOpen(node);
      });
      parser.on('text', function(text) {
        self.parseText(text);
      });
      parser.on('closetag', function(name) {
        if (!self.parseClose(name)) {
          resolve(self.model);
        }
      });
      parser.on('end', function() {
        resolve(self.model);
      });
      parser.on('error', function(error) {
        reject(error);
      });
    });
  },
  parseStream: function(stream) {
    var parser = Sax.createStream(true, {});
    var promise = this.parse(parser);
    stream.pipe(parser);
    return promise;
  },
  
  get xml() {
    // convenience function to get the xml of this.model
    // useful for manager types that are built during the prepare phase
    return this.toXml(this.model);
  },
  
  toXml: function(model) {
    var xmlStream = new XmlStream();
    this.render(xmlStream, model);
    return xmlStream.xml;
  }
};