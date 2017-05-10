'use strict';

var expect = require('chai').expect;

var utils = require('../../../lib/utils/utils');

describe('utils', function() {
  describe('xmlEncode', function() {
    it('encodes xml text', function() {
      expect(utils.xmlEncode('<')).to.equal('&lt;');
      expect(utils.xmlEncode('>')).to.equal('&gt;');
      expect(utils.xmlEncode('&')).to.equal('&amp;');
      expect(utils.xmlEncode('"')).to.equal('&quot;');
      expect(utils.xmlEncode("'")).to.equal('&apos;');

      expect(utils.xmlEncode('abc\x00\x01\x02\x03\x04\x05\x06\x07\x08\x0b\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20abc\x7f'))
          .to.equal('abc abc');

      expect(utils.xmlEncode('<a href="www.whatever.com">Talk to the H&</a>')).to.equal('&lt;a href=&quot;www.whatever.com&quot;&gt;Talk to the H&amp;&lt;/a&gt;');
    });
  });
  describe('isDateFmt', function() {
    [
      'yyyy-mm-dd',
    ].forEach(fmt => {
      it(`'${fmt}' a date`, () => {
        expect(utils.isDateFmt(fmt)).to.be.true();
      });
    });

    [
      '',
      '[Green]#,##0 ;[Red](#,##0)',
    ].forEach(fmt => {
      it(`'${fmt}' is not a date`, () => {
        expect(utils.isDateFmt(fmt)).to.be.false();
      });
    });
  });
});
