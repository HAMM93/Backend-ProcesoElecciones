require('./mongo.js')

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

const VoterEgrese = require('./models/VoterEgrese');
const VoterTeach = require('./models/VoterTeach');
const VoterAdmin = require('./models/VoterAdmin');
const LikelyVoter = require('./models/LikelyVoter');

const {
  default: mongoose
} = require('mongoose');


app.use(cors());
app.use(express.json());


let votantesAdmin = [];
let votantesTeach = [];
let votantesEgrese = [];
/**
 * retorta la lista de los posibles votantes
 */
app.get('/api/posiblesVotantes', (req, res) => {
  VoterAdmin.find()
    .then((datos) => {
      res.json(datos);
    })
})

// total de votos registrados
app.get('/api/totalVotantes', (req, res) => {
  const totalVotantes = votantesAdmin.concat(votantesTeach, votantesEgrese);
  res.json(totalVotantes);
  // VoterAdmin.find()
  //   .then((datos) => {
  //     res.json(datos);
  //   })
})


app.get('/api/estadisticasVotaciones', (req, res) => {
  const totalVotantes = votantesAdmin.concat(votantesTeach, votantesEgrese);
  let estadisticas = {}

  estadisticas.TotalVotantes = totalVotantes.length;
  estadisticas.TotalvotantesAdministrativos = votantesAdmin.length;
  estadisticas.TotalvotantesDocentes = votantesTeach.length;
  estadisticas.TotalvotantesEgrese = votantesEgrese.length;


  res.json(estadisticas);
  // VoterAdmin.find()
  //   .then((datos) => {
  //     res.json(datos);
  //   })
})





/**
 * retorna la lista de los votantes que ya ejercieron su derecho
 */
app.get('/api/votantesRegistradosteach', (req, res) => {
  res.json(votantesTeach);
});
app.get('/api/votantesRegistradosEgrese', (req, res) => {
  res.json(votantesEgrese);
});
app.get('/api/votantesRegistradosAdmin', (req, res) => {
  res.json(votantesAdmin);
  // VoterAdmin.find()
  //   .then((datos) => {
  //     res.json(datos);
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
})

/**
 * consulta un votante por identificacion
 */
app.get('/api/posiblesVotantes/:id', (req, res) => {
  const document = Number(req.params.id);
  console.log(document);
  LikelyVoter.find({
      identificacion: document
    })
    .then((voter) => {
      if (voter) {
        return res.json(voter);
      } else {
        res.send({
          error: '400 Bad Reques'
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/api/actualizarVotantes/:id',(req,res)=>{
  const document = Number(req.params.id);
  console.log(document);
  LikelyVoter.updateOne({
      identificacion: document
    },{Estamento:'Ejercido'})
    .then((voter) => {
      if (voter) {
        return res.json(voter);
      } else {
        res.send({
          error: '400 Bad Reques'
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
})

/**
 * añade un votante a la lista votantes
 */
app.post('/api/crearVotanteAdmin', (req, res) => {
  const voter = req.body;
  if (!voter) {
    return res.status(400).json({
      error: 'voter is missing'
    });
  }
  const voterAdmin = new VoterAdmin(req.body);
  voterAdmin.save()
    .then(
      res.json({
        respuesta: 'Votante Registrado'
      })
    )
    .catch((err) => {
      console.log(err);
    })
})

app.post('/api/crearVotanteTeach', (req, res) => {
  const voter = req.body;
  if (!voter) {
    return res.status(400).json({
      error: 'voter is missing'
    });
  }
  const voterTeach = new VoterTeach(req.body);
  voterTeach.save()
    .then(
      res.json({
        respuesta: 'Votante Registrado'
      })
    )
    .catch((err) => {
      console.log(err);
    })
})

app.post('/api/crearVotanteEgrase', (req, res) => {
  const voter = req.body;
  if (!voter) {
    return res.status(400).json({
      error: 'voter is missing'
    });
  }
  const voterEgrese = new VoterEgrese(req.body);
  voterEgrese.save()
    .then(
      res.json({
        respuesta: 'Votante Registrado'
      })
    )
    .catch((err) => {
      console.log(err);
    })
})


app.post('/app/cargarVotantePerdido', (req, res) => {
  const likelyVoter = new LikelyVoter(req.body);
  likelyVoter.save()
    .then(
      res.json({
        respuesta: 'la base de datos se cargo exitosamente'
      })
    )
    .catch((err) => {
      console.log(err);
    })
});





app.use((req, res) => {
  return res.status(404).json({
    error: 'not found h'
  })
})

const listaLIkelyvoter = [];

app.get('/app/cargarDatos', (req, res) => {
  listaLIkelyvoter.map((obj) => {
    const likelyVoter = new LikelyVoter(obj);
    likelyVoter.save()
      .then()
      .catch((err) => {
        console.log(err);
      })
  })
  return res.json({
    respuesta: 'la base de datos se cargo exitosamente'
  });
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})