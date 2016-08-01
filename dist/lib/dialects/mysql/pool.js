'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(config) {
        _classCallCheck(this, _class);

        this.pool = _mysql2.default.createPool({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            charset: config.charset,
            connectionLimit: config.pool.acquireIncrement
        });
    }

    _createClass(_class, [{
        key: 'getConn',
        value: function getConn() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.pool.getConnection(function (err, connection) {
                    if (!err) {
                        resolve(connection);
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }, {
        key: 'getTransationConn',
        value: function getTransationConn() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.pool.getConnection(function (err, connection) {
                    if (!err) {
                        connection.beginTransaction(function (err) {
                            if (!err) {
                                resolve(connection);
                            } else {
                                reject(err);
                            }
                        });
                    } else {
                        reject(err);
                    }
                });
            });
        }
    }, {
        key: 'commit',
        value: function commit(connection) {
            return new Promise(function (resolve, reject) {
                connection.commit(function (err) {
                    if (!err) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        }
    }, {
        key: 'rollback',
        value: function rollback(connection) {
            return new Promise(function (resolve, reject) {
                connection.rollback(function () {
                    resolve(true);
                });
            });
        }
    }, {
        key: 'release',
        value: function release(connection) {
            connection.release();
        }
    }]);

    return _class;
}();

exports.default = _class;