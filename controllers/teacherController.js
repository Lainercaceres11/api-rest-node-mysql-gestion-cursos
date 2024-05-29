import dbConnection from "../database/config.js";

class TeachersController {
  constructor() {}

  getTeachers(req, res) {
    try {
      dbConnection.query(`SELECT * FROM profesores`, (err, rows) => {
        if (err) {
          res.status(400).json({ msg: err });
        }
        res.status(200).json(rows);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  getDetailsTeacher(req, res) {
    try {
      const { id } = req.params;
      dbConnection.query(
        `SELECT * FROM profesores WHERE id = ?`,
        [id],
        (err, rows) => {
          if (err) {
            res.status(400).json({ msg: err });
          }
          res.status(200).json(rows[0]);
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  addTeacher(req, res) {
    try {
      const { dni, nombre, apellido, email, profesion, telefono } = req.body;
      dbConnection.query(
        `INSERT INTO profesores (id, dni, nombre, apellido, email, profesion, telefono) VALUES (NULL, ?, ?, ?, ?, ?, ?)`,
        [dni, nombre, apellido, email, profesion, telefono],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error); // Usar return para evitar que se ejecute el código siguiente en caso de error
          }
          res.status(201).json({ id: rows.insertId });
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  updateTeacher(req, res) {
    try {
      const { id } = req.params;
      const { dni, nombre, apellido, email } = req.body;
      dbConnection.query(
        `UPDATE profesores SET  dni = ?, nombre = ?, apellido = ?, email = ?, profesion = ?, telefono = ? WHERE id = ?;`,
        [dni, nombre, apellido, email, profesion, telefono, id],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error); // Usar return para evitar que se ejecute el código siguiente en caso de error
          }

          if (rows.affectedRows === 1) {
            res.status(200).json({ msg: "Registro actualizado con exito" });
          }
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  deleteTeacher(req, res) {
    try {
      const {id} = req.params
      dbConnection.query(
        `DELETE FROM profesores WHERE id = ?;`,
        [id],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error); // Usar return para evitar que se ejecute el código siguiente en caso de error
          }

          if(rows.affectedRows === 1){
            res.status(200).json({msg: "Registro eliminado con exito"});
          }
          
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default TeachersController;
