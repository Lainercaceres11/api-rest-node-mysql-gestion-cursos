import dbConnection from "../database/config.js";

class CursosController {
  constructor() {}

  getCursos(req, res) {
    try {
      dbConnection.query(`SELECT * FROM cursos`, (err, rows) => {
        if (err) {
          res.status(400).json({ msg: err });
        }
        res.status(200).json(rows);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  detailsCurso(req, res) {
    try {
      const { id } = req.params;
      dbConnection.query(
        `SELECT * FROM cursos WHERE id = ?`,
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

  add(req, res) {
    try {
      const { nombre, descripcion, profesor_id } = req.body;
      dbConnection.query(
        `INSERT INTO cursos (id, nombre, descripcion, profesor_id ) VALUES (NULL, ?, ?, ?)`,
        [nombre, descripcion, profesor_id],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error);
          }
          res.status(201).json({ id: rows.insertId });
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, profesor_id } = req.body;
      dbConnection.query(
        `UPDATE cursos SET nombre = ?, descripcion = ?, profesor_id  = ? WHERE id = ?;`,
        [nombre, descripcion, profesor_id, id],
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

  delete(req, res) {
    try {
      const { id } = req.params;
      dbConnection.query(
        `DELETE FROM cursos WHERE id = ?;`,
        [id],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error); // Usar return para evitar que se ejecute el código siguiente en caso de error
          }

          if (rows.affectedRows === 1) {
            res.status(200).json({ msg: "Registro eliminado con exito" });
          }
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  asociarStudiante(req, res) {
    try {
      const { curso_id, estudiante_id } = req.body;
      dbConnection.query(
        `INSERT INTO curso_estudiantes (curso_id , estudiante_id ) VALUES (?, ?)`,
        [curso_id, estudiante_id],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error);
          }
          res.status(201).json({ msg: "Estudiante registrado con exito" });
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

}

export default CursosController;
