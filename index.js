var Q, Rule, SQLContainer, Session, SessionContainer, SessionFactory, mysql;

SQLContainer = require('./lib/sqlContainer');

Rule = require('./lib/rule');

Session = require('./lib/session');

SessionContainer = require('./lib/sessionContainer');

mysql = require('mysql');

Q = require('q');

SessionFactory = (function() {
  function SessionFactory(dir, options) {
    this.sqlContainer = new SQLContainer;
    Rule.build(dir, this.sqlContainer);
    this.pool = mysql.createPool(options);
    this.sessionContainer = new SessionContainer;
  }

  SessionFactory.prototype.getSession = function() {
    var deferred, that;
    that = this;
    deferred = Q.defer();
    this.pool.getConnection(function(err, conn) {
      if (!err) {
        that.sessionContainer.add(conn.threadId, new Session(that.sqlContainer, conn));
        return deferred.resolve(that.sessionContainer.get(conn.threadId));
      } else {
        console.log(err);
        return deferred.resolve(null);
      }
    });
    return deferred.promise;
  };

  return SessionFactory;

})();

exports.SessionFactory = SessionFactory;

