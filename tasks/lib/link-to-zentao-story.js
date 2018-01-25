'use strict';

var format = require('util').format;

function linkToZentaoStory(story) {
  return format(this.links.zentaoStory, story, story);
}

module.exports = linkToZentaoStory;
