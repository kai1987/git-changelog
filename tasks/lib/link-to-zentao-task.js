'use strict';

var format = require('util').format;

function linkToZentaoTask(task) {
  return format(this.links.zentaoTask, task, task);
}

module.exports = linkToZentaoTask;
