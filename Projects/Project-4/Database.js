const mysql = require("mysql");

class Database {
    getConnection() {
        const connection = mysql.createConnection({
            host: "127.0.0.1",
            database: "toDoTasks",
            user: "root",
            password: "EntJava"
        });
        return connection;
    }

    runSQL(query, params, callback) {
        const connection = this.getConnection();
        connection.query(query, params, (err, data) => {
            if (err) throw err;
            callback(data);
        })
    }

    allTasks(callback) {
        const query = `select * from tasks;`;
        this.runSQL(query, undefined, callback);
    }

    getTaskById(id, callback) {
        const query = `select * from tasks where id = ?;`;
        this.runSQL(query, [id], callback);
    }

    addTask(id, description, callback) {
        const query = `insert into tasks(id, description) values(?, ?);`;
        this.runSQL(query, [id, description], callback);
    }

    deleteTask(id, description, callback) {
        const query = `delete from tasks where id = ?;`;
        this.runSQL(query, [id], callback);
    }
}

module.exports = Database;