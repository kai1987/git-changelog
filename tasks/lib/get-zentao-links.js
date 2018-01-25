'use strict';

var debug = require('debug')('changelog:getZendaoLinks');

function getZentaoLinks() {
    this.links.zentaoBug   = '[Bug#%s](' + this.options.zentao_url + '/index.php?m=bug&f=view&bugID=%s)';
    this.links.zentaoTask  = '[Task#%s](' + this.options.zentao_url + '/index.php?m=task&f=view&taskID=%s)';
    this.links.zentaoStory = '[Story#%s](' + this.options.zentao_url + '/index.php?m=story&f=view&storyID=%s)';
}

module.exports = getZentaoLinks;
