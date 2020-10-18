import pg from "pg";
import config from "./config";
// todo: db function
class ExtensionDB {
  private pool: pg.Pool;
  constructor() {
    this.pool = new pg.Pool({
      user: config.DB_USER,
      host: config.DB_HOST,
      database: config.DB,
      password: config.DB_PASSWORD,
      port: parseInt(config.DB_PORT!!),
    });
  }

  async getAllExtensions() {
    let rows: string[] = [];
    const client = await this.pool.connect();
    try {
      const result = await client.query("SELECT Extension from extensions");
      rows = result.rows as string[];
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return rows;
    }
  }
  async findExtension(extension: string) {
    let found = false;
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `SELECT Extension FROM extensions WHERE Extension='${extension}'`,
      );
      if (result.rowCount !== 0) {
        found = true;
      }
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return found;
    }
  }
  async insertExtension(extension: string) {
    let complete = false;
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `INSERT INTO extensions (Extension) VALUES ('${extension}')`,
      );
      // if (result.rowCount !== 0) {
      complete = true;
      // }
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return complete;
    }
  }
  async removeExtension(extension: string) {
    let complete = false;
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        `DELETE FROM extensions WHERE Extension='${extension}'`,
      );
      // if (result.rowCount === 0) {
      complete = true;
      //}
    } catch (error) {
      console.log(error);
    } finally {
      client.release();
      return complete;
    }
  }
}

const db = new ExtensionDB();
export default db;
