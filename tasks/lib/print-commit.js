
var debug = require('debug')('changelog:printSection');
var format = require('util').format;

function printCommit(commit, printCommitLinks) {
  var prefix = '';
  var result = '';

  if (printCommitLinks) {
    result += format('%s\n  (%s', commit.subject, this.linkToCommit(commit.hash));

    if (commit.closes.length) {
     result += ',\n   ' + commit.closes.map(this.linkToIssue, this).join(', ');
    }
    if (commit.bugs.length) {
     result += ',\n   ' + commit.bugs.map(this.linkToZentaoBug, this).join(', ');
    }
    if (commit.tasks.length) {
     result += ',\n   ' + commit.tasks.map(this.linkToZentaoTask, this).join(', ');
    }
    if (commit.stories.length) {
     result += ',\n   ' + commit.stories.map(this.linkToZentaoStory, this).join(', ');
    }
    result += ')\n';
  } else {
    result += format('%s\n', commit.subject);
  }

  return result;
}

module.exports = printCommit;
