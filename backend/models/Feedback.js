const db = require('../config/database');

class Feedback {
  static getAll() {
    try {
      const stmt = db.prepare('SELECT * FROM Feedback ORDER BY createdAt DESC');
      return stmt.all();
    } catch (error) {
      throw new Error('Failed to fetch feedback: ' + error.message);
    }
  }

  static create(feedback) {
    try {
      const { studentName, courseCode, comments, rating } = feedback;
      const stmt = db.prepare(`
        INSERT INTO Feedback (studentName, courseCode, comments, rating) 
        VALUES (?, ?, ?, ?)
      `);
      const result = stmt.run(studentName, courseCode, comments, rating);
      return result;
    } catch (error) {
      throw new Error('Failed to create feedback: ' + error.message);
    }
  }

  static delete(id) {
    try {
      const stmt = db.prepare('DELETE FROM Feedback WHERE id = ?');
      const result = stmt.run(id);
      return result;
    } catch (error) {
      throw new Error('Failed to delete feedback: ' + error.message);
    }
  }

  static getStats() {
    try {
      const stmt = db.prepare(`
        SELECT 
          COUNT(*) as totalFeedback,
          AVG(rating) as averageRating,
          COUNT(DISTINCT courseCode) as totalCourses
        FROM Feedback
      `);
      return stmt.get();
    } catch (error) {
      throw new Error('Failed to get stats: ' + error.message);
    }
  }
}

module.exports = Feedback;