'use strict';

var debug = require('debug')('changelog:linkToZentaoBug');
var format = require('util').format;

function linkToZentaoBug(bug) {
  return format(this.links.zentaoBug, bug, bug);
}

module.exports = linkToZentaoBug;
