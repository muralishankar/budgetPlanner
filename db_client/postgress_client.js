
const { Pool } = require("pg");
const { db_config } = require('../config');

class PostgreSqlService {
    constructor() {
        this.pool = new Pool(db_config);
    }
    async readTable(tableName) {
        let results = await this.pool.query(`select * from ${tableName} ORDER BY created_date DESC;`);
        return results.rows;
    }
    async readTableWithCondition(tableName, field, value) {//'SELECT * FROM users WHERE id = $1', [1]
        let results = await this.pool.query(`select * from ${tableName} where data->>'${field}' = '${value}' ORDER BY created_date DESC;`);
        return results.rows;
    }
    async readTableWithId(tableName, value) {//'SELECT * FROM users WHERE id = $1', [1]
        let results = await this.pool.query(`select * from ${tableName} where id= $1 ORDER BY created_date DESC;`, [value]);
        return results.rows;
    }
    async insertItem(tableName, json) {//INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await this.pool.connect();
        let results;
        try {
            await client.query('BEGIN');
            const queryText = `INSERT INTO ${tableName}(data) VALUES ($1);`
            results = await client.query(queryText, [json]);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }

        //.catch(e => console.error(e.stack));
        return results.rowCount > 0 ? "Inserted" : "Failed";
    }
    async updateItem(tableName, data, field, value) {//INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await this.pool.connect()
        let results;
        try {
            await client.query('BEGIN');
            const queryText = `UPDATE ${tableName}
                SET data = data || '${data}' ,
                modified_date = NOW()
                where ${field} = '${value}';`
            results = await client.query(queryText);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
        //.catch(e => console.error(e.stack));
        return results.rowCount > 0 ? "Updated" : "Failed";
    }
    async deleteItemWithId(tableName, value) {//'SELECT * FROM users WHERE id = $1', [1]
        let results = await this.pool.query(`delete from ${tableName} where id= $1;`, [value]);
        return results.rowCount > 0 ? "Deleted" : "Failed";
    }
    async deleteItemWithCondition(tableName, field, value) {//'SELECT * FROM users WHERE id = $1', [1]
        let results = await this.pool.query(`delete from ${tableName} where data->>'${field}' = '${value}';`);
        return results.rowCount > 0 ? "Deleted" : "Failed";
    }
    /**
     * UPDATE settings 
        SET users = users || '{"Email": "new email", "IsActive": "True", "Username": "new username"}'
        WHERE users @> '{"UserId":"49"}';
     */

}

module.exports = PostgreSqlService;