'use strict';

var q = require('q');
var _ = require('lodash');

function getRepoSuccess(deferred, url) {
  var module = this;

  this.options.repo_url = url;
  this.message('remote', this.options.repo_url);

  this.getProviderLinks();
  this.getZentaoLinks();
  this.getGitLogCommands();
  deferred.resolve();
}

function getRepoFailure(deferred, err) {
  this.message('not remote');
  deferred.reject(err);
}

function init(params, loadRC) {
  this.log('debug', 'Initializing changelog options');
  var module = this;

  var deferred = q.defer();

  this.initOptions(params);
  var promise = loadRC ? this.loadChangelogRc() : new Promise(function (resolve) { resolve(params); });

  promise
    .then(function(options) {

      module.options = _.defaults(options, module.options);

      module.log('info', '  - The APP name is', module.options.app_name);
      module.log('info', '  - The output file is', module.options.file);
      module.log('info', '  - The template file is', module.options.template);

      module.options.grep_commits = module.options.sections.map(function(section) {
        return section.grep;
      }).join('|');

      module.log('debug', 'Grep commits: ', module.options.grep_commits);

      return module.getRepoUrl();
    })
    .then(getRepoSuccess.bind(this, deferred))
    .catch(getRepoFailure.bind(this, deferred));

  return deferred.promise;
}

module.exports = init;
