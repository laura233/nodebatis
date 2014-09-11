var factory, session;

factory = require('./sessionFactory').sessionFactory;

process.on('uncaughtException', function(err) {
  return console.log(err);
});

session = null;

factory.getSession().then(function(sess) {
  session = sess;
  return session.beginTransaction();
}).then(function(err) {
  return session.update('a.update', {
    start: 0,
    limit: 10,
    name: "update"
  });
}).then(function(result) {
  return session.commit();
}).then(function(err) {
  return console.log('====', err);
}).done();

