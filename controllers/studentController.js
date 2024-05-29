import dbConnection from "../database/config.js";

class StudentsController {
  constructor() {}

  getStudents(req, res) {
    try {

      dbConnection.query(`SELECT * FROM estudiantes`, (err, rows)=>{
        if(err){
          res.status(400).json({msg: err})
        }
        res.status(200).json(rows)
      })
    } catch (error) {
      res.status(500).send(error)
      
    }
  }

  getDetailsStudent(req, res) {
    try {
      const {id} = req.params
      dbConnection.query(`SELECT * FROM estudiantes WHERE id = ?`, [id], (err, rows)=>{
        if(err){
          res.status(400).json({msg: err})
        }
        res.status(200).json(rows[0])
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  addStudent(req, res) {
    try {
      const { dni, nombre, apellido, email } = req.body;
      dbConnection.query(
        `INSERT INTO estudiantes (id, dni, nombre, apellido, email) VALUES (NULL, ?, ?, ?, ?)`,
        [dni, nombre, apellido, email],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error); // Usar return para evitar que se ejecute el código siguiente en caso de error
          }
          res.status(201).json({id: rows.insertId});
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  updateStudent(req, res) {
    try {
      const {id} = req.params
      const { dni, nombre, apellido, email } = req.body;
      dbConnection.query(
        `UPDATE estudiantes SET  dni = ?, nombre = ?, apellido = ?, email = ? WHERE id = ?;`,
        [dni, nombre, apellido, email, id],
        (error, rows) => {
          if (error) {
            return res.status(400).send(error); // Usar return para evitar que se ejecute el código siguiente en caso de error
          }

          if(rows.affectedRows === 1){
            res.status(200).json({msg: "Registro actualizado con exito"});
          }
          
        }
      );
    } catch (error) {
      res.status(500).send(error);
    }
  }

  deleteStudent(req, res) {
    try {
      const {id} = req.params
      dbConnection.query(
        `DELETE FROM estudiantes WHERE id = ?;`,
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

export default StudentsController;
