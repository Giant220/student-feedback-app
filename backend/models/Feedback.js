const db = require('../config/database');

class Feedback {
  static getAll(callback) {
    const sql = `SELECT * FROM Feedback ORDER BY createdAt DESC`;
    db.all(sql, [], callback);
  }

  static create(feedback, callback) {
    const { studentName, courseCode, comments, rating } = feedback;
    const sql = `INSERT INTO Feedback (studentName, courseCode, comments, rating) 
                 VALUES (?, ?, ?, ?)`;
    db.run(sql, [studentName, courseCode, comments, rating], callback);
  }

  static delete(id, callback) {
    const sql = `DELETE FROM Feedback WHERE id = ?`;
    db.run(sql, [id], callback);
  }

  static getStats(callback) {
    const sql = `
      SELECT 
        COUNT(*) as totalFeedback,
        AVG(rating) as averageRating,
        COUNT(DISTINCT courseCode) as totalCourses
      FROM Feedback
    `;
    db.get(sql, [], callback);
  }
}

module.exports = Feedback;