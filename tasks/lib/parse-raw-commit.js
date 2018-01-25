'use strict';

var debug = require('debug')('changelog:parseRawCommit');

function parseTag(line,tag){
    var i, ids, index, j, len, match, re;
    re = new RegExp('(?:' + tag + ')(?:\\s)?#([\\d|,]+)');
    match = line.match(re);
    if (match) {
      ids = match[1].split(',');
      for (index = j = 0, len = ids.length; j < len; index = ++j) {
        i = ids[index];
        ids[index] = parseInt(i, 10);
      }
      return ids;
    }
    return [];
}

function parseLine(msg, line) {
  var match = line.match(/(?:Closes|Fixes)\s#(\d+)/);
  if (match) {
    msg.closes.push(parseInt(match[1], 10));
  }

  msg.bugs    = msg.bugs.concat(parseTag(line,"Fix"));
  msg.tasks   = msg.tasks.concat(parseTag(line,"Task"));
  msg.stories = msg.stories.concat(parseTag(line,"Story"));
}

function parseRawCommit(raw) {
  debug('parsing raw commit');
  if (!raw) {
    return null;
  }

  var lines = raw.split('\n');
  var msg = {}, match;

  msg.closes = [];
  msg.breaks = [];

  msg.bugs      = [];
  msg.tasks     = [];
  msg.stories   = [];

  lines.forEach(parseLine.bind(null, msg));

  msg.hash = lines.shift();
  msg.subject = lines.shift();

  match = raw.match(/BREAKING CHANGE:([\s\S]*)/);
  if (match) {
    msg.breaking = match[1];
  }

  msg.body = lines.join('\n');
  match = msg.subject.match(/^(.*)\((.*)\)\:\s(.*)$/);
  //@TODO: match merges and pull request messages
  if (!match) {
    match = msg.subject.match(/^(.*)\:\s(.*)$/);

    if (!match) {
      //console.log(msg.subject, '------------');
      this.log('warn', 'Incorrect message:', msg.hash, msg.subject);
      //return null;
    }
    msg.type = match ? match[1] : null;
    msg.subject = match ? match[2] : msg.subject;

    return msg;
  }
  msg.type = match[1];
  msg.component = match[2];
  msg.subject = match[3];

  return msg;
}

module.exports = parseRawCommit;
