require('./mongo.js')

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

const VoterEgrese = require('./models/VoterEgrese');
const VoterTeach = require('./models/VoterTeach');
const VoterAdmin = require('./models/VoterAdmin');
const LikelyVoter = require('./models/LikelyVoter');



app.use(cors());
app.use(express.json());



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
     // VoterAdmin.find()
  //   .then((datos) => {
  //     res.json(datos);
  //   })
})


app.get('/api/estadisticasVotaciones', (req, res) => {
  let estadisticas = {}
  res.json(estadisticas);
  // VoterAdmin.find()
  //   .then((datos) => {
  //     res.json(datos);
  //   })
})



/**
 * retorna las estadisticas para cada uno de los estamentos
 */
app.get('/api/votantesRegistradosteach', (req, res) => {
  VoterTeach.find({})
    .then((list) => {
      const agPlancha2 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 2');
      const csPlancha3 = list.filter(voter => voter.votoConsSuperor === 'plancha No 3');
      const agVotoBlanco = list.filter(voter => voter.votoAsamGeneral === 'Voto En Blanco');
      const csVotoBlanco = list.filter(voter => voter.votoConsSuperor === 'Voto En Blanco');

      res.json({
        conteoTotalDocentes: list.length,
        AsamGenerlPlancha2: agPlancha2.length,
        AsamGenerlVotoBlanco: agVotoBlanco.length,
        ConsejoSuperiorPlancha3: csPlancha3.length,
        ConsejoSuperiorVotoBlanco: csVotoBlanco.length
      });
    })
    .catch(() => {
      console.log(err)
    })
});
app.get('/api/votantesRegistradosEgrese', (req, res) => {
  VoterEgrese.find({})
    .then((list) => {
      const agPlancha3 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 3');
      const agPlancha4 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 4');
      const agPlancha5 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 5');
      const agVotoBlanco = list.filter(voter => voter.votoAsamGeneral === 'Voto En Blanco');


      const csPlancha1 = list.filter(voter => voter.votoConsSuperor === 'plancha No 1');
      const csPlancha3 = list.filter(voter => voter.votoConsSuperor === 'plancha No 3');
      const csVotoBlanco = list.filter(voter => voter.votoConsSuperor === 'Voto En Blanco');

      const caPlancha3 = list.filter(voter => voter.votoConsAcademico === 'plancha No 3');
      const caVotoBlanco = list.filter(voter => voter.votoConsAcademico === 'Voto En Blanco');


      const baPlancha3 = list.filter(voter => voter.votoBienestar === 'plancha No 3');
      const baVotoBlanco = list.filter(voter => voter.votoBienestar === 'Voto En Blanco');
      res.json({
        conteoTotalEgresados: list.length,
        AsamGenerlPlancha3: agPlancha3.length,
        AsamGenerlPlancha4: agPlancha4.length,
        AsamGenerlPlancha5: agPlancha5.length,
        AsamGenerlVotoBlanco: agVotoBlanco.length,

        ConsejoSuperiorPlancha1: csPlancha1.length,
        ConsejoSuperiorPlancha3: csPlancha3.length,
        ConsejoSuperiorcsVotoBlanco: csVotoBlanco.length,

        ConsejoAcademicoPlancha3: caPlancha3.length,
        ConsejoAcademicoVotoBlanco: caVotoBlanco.length,

        BienestarUniverPlancha3: baPlancha3.length,
        BienestarUniverVotoBlanco: baVotoBlanco.length,
      });
    })
    .catch(() => {
      console.log(err)
    })
});

app.get('/api/votantesRegistradosEgreseDerecho', (req, res) => {
  VoterEgrese.find({})
    .then((list) => {

      const fdPlancha3 = list.filter(voter => voter.votoConsFacuDerecho === 'plancha No 3');
      const fdVotoBlanco = list.filter(voter => voter.votoConsFacuDerecho === 'Voto En Blanco');

      res.json({
        conteoTotalEgresadosDerecho: fdPlancha3.length + fdVotoBlanco.length,

        ConsejoFacuDerechoPlancha3: fdPlancha3.length,
        ConsejoFacuDerechoVotoBlanco: fdVotoBlanco.length
      });
    })
    .catch(() => {
      console.log(err)
    })
});

app.get('/api/votantesRegistradosAdmin', (req, res) => {
  VoterAdmin.find({})
    .then((list) => {
      const agPlancha1 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 1');
      const agPlancha2 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 2');
      const agVotoBlanco = list.filter(voter => voter.votoAsamGeneral === 'Voto En Blanco');

      res.json({
        conteoTotalAdministrativos: list.length,
        AsamGenerlPlancha1: agPlancha1.length,
        AsamGenerlPlancha2: agPlancha2.length,
        AsamGenerlVotoBlanco: agVotoBlanco.length
      });
    })
    .catch(() => {
      console.log(err)
    })
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

app.get('/api/actualizarVotantes/:id', (req, res) => {
  const document = Number(req.params.id);
  console.log(document);
  LikelyVoter.updateOne({
      identificacion: document
    }, {
      Estamento: 'Ejercido'
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