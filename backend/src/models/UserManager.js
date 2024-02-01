const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "utilisateur" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `insert into ${this.table} (pseudo, email, password) values (?, ?, ?)`,
      [user.pseudo, user.email, user.password]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  async read(pseudo) {
    const [result] = await this.database.query(
      `select * from ${this.table} where pseudo=?`,
      [pseudo]
    );
    return result;
  }

  async readId(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id=?`,
      [id]
    );
    return result;
  }

  async playedgame(gameId, user) {
    let result;
    if (user.rating) {
      [result] = await this.database.query(
        `insert into played (gameId, userId, liked, rating) values (?, ?, ?, ?)`,
        [gameId, user.id, user.liked ? 1 : 0, user.rating]
      );
    } else {
      [result] = await this.database.query(
        `insert into played (gameId, userId, liked) values (?, ?, ?)`,
        [gameId, user.id, user.liked ? 1 : 0]
      );
    }

    return result.insertId;
  }

  async getAllGame(pseudo) {
    // Execute the SQL SELECT query to retrieve all unique games from the "played" table
    const [rows] = await this.database.query(
      `SELECT u.pseudo, p.gameId, p.userId, p.liked, p.rating FROM ${this.table} u INNER JOIN played p ON u.id = p.userId WHERE u.pseudo = ?`,
      [pseudo]
    );

    // Return the array of unique games
    return rows;
  }

  async getFavoriteGame(pseudo) {
    // Execute the SQL SELECT query to retrieve all unique games from the "played" table
    const [rows] = await this.database.query(
      `SELECT u.pseudo, p.gameId, p.userId, p.liked, p.rating FROM ${this.table} u INNER JOIN played p ON u.id = p.userId WHERE u.pseudo = ? AND p.liked = 1`,
      [pseudo]
    );

    // Return the array of unique games
    return rows;
  }

  async getGame(userId, gameId) {
    const [result] = await this.database.query(
      `SELECT * FROM played WHERE userId = ? AND gameId = ?`,
      [userId, gameId]
    );
    return result;
  }

  async updateGame(userId, gameId, liked, rating) {
    if (rating) {
      const [result] = await this.database.query(
        `UPDATE played SET liked = ?, rating = ? WHERE userId = ? AND gameId = ?`,
        [liked ? 1 : 0, rating, userId, gameId]
      );
      return result.affectedRows;
    }
    const [result] = await this.database.query(
      `UPDATE played SET liked = ? WHERE userId = ? AND gameId = ?`,
      [liked ? 1 : 0, userId, gameId]
    );
    return result.affectedRows;
  }

  async deleteGame(userId, gameId) {
    const [result] = await this.database.query(
      `DELETE FROM played WHERE userId = ? AND gameId = ?`,
      [userId, gameId]
    );
    return result.affectedRows;
  }
}

module.exports = UserManager;
