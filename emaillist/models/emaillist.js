// model 에서 서비스와 DB의 데이터를 받아오는 역할을 한다.
// 여기선 mysql 사용
const mysql = require("mysql2");
const util = require("util");
const dbconn = require("./dbconn");


module.exports = {
  findAll: async function () {
    const conn = dbconn();
    const query = util.promisify(conn.query).bind(conn);
    try {
      return await query(
        "select first_name as firstName, last_name as lastName, email from emaillist01 order by no desc",
        []
      );
    } catch (e) {
      console.error(e);
    } finally {
      conn.end();
    }
  },
  insert: async function (emaillist) {
    const conn = dbconn();
    const query = util.promisify(conn.query).bind(conn);
    try {
      return await query(
      "insert into emaillist01 values(null, ?, ?, ?)", 
      Object.values(emaillist)
      // [emaillist.fn, emaillist.ln, emaillist.email,]
    );
    } catch (e) {
      console.error(e);
    } finally {
      conn.end();
    }
  },
};

/** 
const query = function (sql, data) {
  return new Promise(function (resolve, reject) {
    conn.query(sql, data, function (error, rows, field) {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
},

const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, data, (error, rows, field) => error ? reject(error):resolve(rows))); 
*/
