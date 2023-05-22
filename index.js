require('./mongo.js')

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

const VoterEgrese = require('./models/VoterEgrese');
const VoterTeach = require('./models/VoterTeach');
const VoterAdmin = require('./models/VoterAdmin');
const LikelyVoter = require('./models/LikelyVoter');
const VoterStudent = require('./models/VoterStudent');



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
app.get('/api/votantesRegistradosTeach', (req, res) => {
  VoterTeach.find({})
    .then((list) => {
      const agPlancha2 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 2');
      const csPlancha1 = list.filter(voter => voter.votoConsSuperor === 'plancha No 1');
      const agVotoBlanco = list.filter(voter => voter.votoAsamGeneral === 'Voto En Blanco');
      const csVotoBlanco = list.filter(voter => voter.votoConsSuperor === 'Voto En Blanco');

      res.json({
        conteoTotalDocentes: list.length,
        AsamGenerlPlancha2: agPlancha2.length,
        AsamGenerlVotoBlanco: agVotoBlanco.length,
        ConsejoSuperiorPlancha1: csPlancha1.length,
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

app.get('/api/votantesRegistradosStudent', (req, res) => {
  VoterStudent.find({})
    .then((list) => {
      const agPlancha2 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 2');
      const agPlancha3 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 3');
      const agPlancha5 = list.filter(voter => voter.votoAsamGeneral === 'plancha No 5');
      const agVotoBlanco = list.filter(voter => voter.votoAsamGeneral === 'Voto En Blanco');

      res.json({
        conteoTotalEstudiantes: list.length,
        AsamGenerlPlancha2: agPlancha2.length,
        AsamGenerlPlancha3: agPlancha3.length,
        AsamGenerlPlancha5: agPlancha5.length,
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
 * añade un votante a las listas de sufragios
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

app.post('/api/crearVotanteStudent', (req, res) => {
  const voter = req.body;
  if (!voter) {
    return res.status(400).json({
      error: 'voter is missing'
    });
  }
  const voterStudent = new VoterStudent(req.body);
  voterStudent.save()
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

app.get('/api/desconectar', (req, res) => {
  client.close();
  console.log('Desconectado de la base de datos');
  res.send('Base de datos desconectada');
})

app.use((req, res) => {
  return res.status(404).json({
    error: 'not found h'
  })
})


const listaLIkelyvoter = [
  {
   "identificacion": 1110465523,
   "Nombres": "ARENAS VELASQUEZ LEIDY FACNORY ",
   "Estamento": "Estudiante",
   "Correo": "leidy.arenas@fuac.edu.co",
   "codigo": "YUI-1128-RDJ-9872"
  },
  {
   "identificacion": 52495742,
   "Nombres": "CASTELLANOS MOLINA YANIRE  ",
   "Estamento": "Estudiante",
   "Correo": "yanire.castellanos@fuac.edu.co",
   "codigo": "PIO-1129-WGZ-9871"
  },
  {
   "identificacion": 1019093788,
   "Nombres": "CASTRO DUARTE JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "jcastro.duarte@fuac.edu.co",
   "codigo": "WYR-1130-ABA-9870"
  },
  {
   "identificacion": 1098680718,
   "Nombres": "CONTRERAS SUAREZ NESTOR YESID ",
   "Estamento": "Estudiante",
   "Correo": "nestor.contreras@fuac.edu.co",
   "codigo": "YUI-1131-RDJ-9869"
  },
  {
   "identificacion": 1015995629,
   "Nombres": "GALINDO GOMEZ FREDY ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "fredy.galindo@fuac.edu.co",
   "codigo": "PIO-1132-WGZ-9868"
  },
  {
   "identificacion": 11446206,
   "Nombres": "GARCÍA GOMEZ CARLOS ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "carlosa.garcia@fuac.edu.co",
   "codigo": "WYR-1133-ABA-9867"
  },
  {
   "identificacion": 79555128,
   "Nombres": "GARZON BENALCAZAR HEINER HERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "heiner.garzon@fuac.edu.co",
   "codigo": "YUI-1134-RDJ-9866"
  },
  {
   "identificacion": 1013585817,
   "Nombres": "GUERRERO BAHAMON DIANA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "dianac.guerrero@fuac.edu.co",
   "codigo": "PIO-1135-WGZ-9865"
  },
  {
   "identificacion": 1010179854,
   "Nombres": "HERNANDEZ CAMELO INDIRA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "indira.hernandez@fuac.edu.co",
   "codigo": "WYR-1136-ABA-9864"
  },
  {
   "identificacion": 52229302,
   "Nombres": "HURTADO VELASQUEZ EMILSE REGINA ",
   "Estamento": "Estudiante",
   "Correo": "emilse.hurtado@fuac.edu.co",
   "codigo": "YUI-1137-RDJ-9863"
  },
  {
   "identificacion": 1070918131,
   "Nombres": "LEIVA CONTRERAS EDGAR ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "edgar.leiva@fuac.edu.co",
   "codigo": "PIO-1138-WGZ-9862"
  },
  {
   "identificacion": 1058274657,
   "Nombres": "LOZANO SUELTA YESID FERNEY ",
   "Estamento": "Estudiante",
   "Correo": "ylozano.suelta@fuac.edu.co",
   "codigo": "WYR-1139-ABA-9861"
  },
  {
   "identificacion": 1031133991,
   "Nombres": "MENDEZ PARRA CINDY JOHANA ",
   "Estamento": "Estudiante",
   "Correo": "mendez.cindy@fuac.edu.co",
   "codigo": "YUI-1140-RDJ-9860"
  },
  {
   "identificacion": 93020731,
   "Nombres": "MOICA BORJA WILLER FERNEY ",
   "Estamento": "Estudiante",
   "Correo": "willer.moica@fuac.edu.co",
   "codigo": "PIO-1141-WGZ-9859"
  },
  {
   "identificacion": 1032436523,
   "Nombres": "MORENO BELLO ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "andresf.moreno@fuac.edu.co",
   "codigo": "WYR-1142-ABA-9858"
  },
  {
   "identificacion": 80163060,
   "Nombres": "OCHOA LUGO JOHN FREDY ",
   "Estamento": "Estudiante",
   "Correo": "john.ochoa@fuac.edu.co",
   "codigo": "YUI-1143-RDJ-9857"
  },
  {
   "identificacion": 80059399,
   "Nombres": "ORDOÑEZ CEPEDA JUAN FRANCISCO ",
   "Estamento": "Estudiante",
   "Correo": "jordonez.cepeda@fuac.edu.co",
   "codigo": "PIO-1144-WGZ-9856"
  },
  {
   "identificacion": 1096202392,
   "Nombres": "SALAZAR CASALLAS SAMIR ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "samir.salazar@fuac.edu.co",
   "codigo": "WYR-1145-ABA-9855"
  },
  {
   "identificacion": 1030613084,
   "Nombres": "SUAREZ PORRAS DANIEL  ",
   "Estamento": "Estudiante",
   "Correo": "daniel.porras@fuac.edu.co",
   "codigo": "YUI-1146-RDJ-9854"
  },
  {
   "identificacion": 9971070,
   "Nombres": "TABARES SERNA ALEXANDER  ",
   "Estamento": "Estudiante",
   "Correo": "Alexander.tabares@fuac.edu.co",
   "codigo": "PIO-1147-WGZ-9853"
  },
  {
   "identificacion": 63526569,
   "Nombres": "VILLAMIZAR VILLAMIZAR CARMEN SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "villamizar.carmen@fuac.edu.co",
   "codigo": "WYR-1148-ABA-9852"
  },
  {
   "identificacion": 79594558,
   "Nombres": "ZABALA SOLANO JUAN CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "carlos.zabala@fuac.edu.co",
   "codigo": "YUI-1149-RDJ-9851"
  },
  {
   "identificacion": 52794548,
   "Nombres": "ZULUAGA RODRIGUEZ ADRIANA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "adriana.zuluaga@fuac.edu.co",
   "codigo": "PIO-1150-WGZ-9850"
  },
  {
   "identificacion": 1013576901,
   "Nombres": "ALVAREZ PRIETO VLADIMIR  ",
   "Estamento": "Estudiante",
   "Correo": "vladimir.alvarez@fuac.edu.co",
   "codigo": "WYR-1151-ABA-9849"
  },
  {
   "identificacion": 20887946,
   "Nombres": "GAITAN ACOSTA EDNA HASLEIDY ",
   "Estamento": "Estudiante",
   "Correo": "edna.gaitan@fuac.edu.co",
   "codigo": "YUI-1152-RDJ-9848"
  },
  {
   "identificacion": 79957151,
   "Nombres": "MARTINEZ CARO EDWIN ARMANDO ",
   "Estamento": "Estudiante",
   "Correo": "martinezc.edwin@fuac.edu.co",
   "codigo": "PIO-1153-WGZ-9847"
  },
  {
   "identificacion": 19420444,
   "Nombres": "PATARROYO FONSECA NELSON  ",
   "Estamento": "Estudiante",
   "Correo": "patarroyo.nelson@fuac.edu.co",
   "codigo": "WYR-1154-ABA-9846"
  },
  {
   "identificacion": 1016712264,
   "Nombres": "AYALA RODRIGUEZ JORGE CESAR ",
   "Estamento": "Estudiante",
   "Correo": "jayala.rodriguez@fuac.edu.co",
   "codigo": "YUI-1155-RDJ-9845"
  },
  {
   "identificacion": 69008419,
   "Nombres": "CORDOBA ZAMBRANO NUBIA YENITH ",
   "Estamento": "Estudiante",
   "Correo": "nubiay.cordoba@fuac.edu.co",
   "codigo": "PIO-1156-WGZ-9844"
  },
  {
   "identificacion": 63526192,
   "Nombres": "CORZO AGUDELO LEDY PIEDAD ",
   "Estamento": "Estudiante",
   "Correo": "ledyp.corzo@fuac.edu.co",
   "codigo": "WYR-1157-ABA-9843"
  },
  {
   "identificacion": 1221977399,
   "Nombres": "ESCOBAR AREVALO MALORY LICETH ",
   "Estamento": "Estudiante",
   "Correo": "malory.escobar@fuac.edu.co",
   "codigo": "YUI-1158-RDJ-9842"
  },
  {
   "identificacion": 18126067,
   "Nombres": "MURILLO APRAEZ GERMAN ERLEY ",
   "Estamento": "Estudiante",
   "Correo": "german.murillo@fuac.edu.co",
   "codigo": "PIO-1159-WGZ-9841"
  },
  {
   "identificacion": 53094890,
   "Nombres": "PATIÑO  SADY MILDREY ",
   "Estamento": "Estudiante",
   "Correo": "sadym.patino@fuac.edu.co",
   "codigo": "WYR-1160-ABA-9840"
  },
  {
   "identificacion": 74085297,
   "Nombres": "PATIÑO RIAÑO MANUEL JOSE ",
   "Estamento": "Estudiante",
   "Correo": "manuel.patino@fuac.edu.co",
   "codigo": "YUI-1161-RDJ-9839"
  },
  {
   "identificacion": 52836914,
   "Nombres": "PORRAS GUTIERREZ AURA CATALINA ",
   "Estamento": "Estudiante",
   "Correo": "aurac.porras@fuac.edu.co",
   "codigo": "PIO-1162-WGZ-9838"
  },
  {
   "identificacion": 17421644,
   "Nombres": "CASTRO ROBLES LUIS ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "alejandro.castro@fuac.edu.co",
   "codigo": "WYR-1163-ABA-9837"
  },
  {
   "identificacion": 79909297,
   "Nombres": "DIAZ LOPEZ ROMER ENRIQUE ",
   "Estamento": "Estudiante",
   "Correo": "romer.diaz@fuac.edu.co",
   "codigo": "YUI-1164-RDJ-9836"
  },
  {
   "identificacion": 51897052,
   "Nombres": "MALAVER CASTRO NANCY GLADYS ",
   "Estamento": "Estudiante",
   "Correo": "nancy.malaver@fuac.edu.co",
   "codigo": "PIO-1165-WGZ-9835"
  },
  {
   "identificacion": 80052999,
   "Nombres": "PULIDO CORTES IGNACIO ANTONIO ",
   "Estamento": "Estudiante",
   "Correo": "ignacio.pulido@fuac.edu.co",
   "codigo": "WYR-1166-ABA-9834"
  },
  {
   "identificacion": 53092026,
   "Nombres": "PULIDO CORTES MARIA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "mpulido.cortes@fuac.edu.co",
   "codigo": "YUI-1167-RDJ-9833"
  },
  {
   "identificacion": 19306978,
   "Nombres": "RODRÍGUEZ OCHOA JUAN MANUEL ",
   "Estamento": "Estudiante",
   "Correo": "juan.rodriguez@fuac.edu.co",
   "codigo": "PIO-1168-WGZ-9832"
  },
  {
   "identificacion": 10492690,
   "Nombres": "ZAPATA MONTERO ALEJANDRO  ",
   "Estamento": "Estudiante",
   "Correo": "alejandro.zapata@fuac.edu.co",
   "codigo": "WYR-1169-ABA-9831"
  },
  {
   "identificacion": 93337867,
   "Nombres": "ACOSTA MARIN JOSE RAUL ",
   "Estamento": "Estudiante",
   "Correo": "jraul.acosta@fuac.edu.co",
   "codigo": "YUI-1170-RDJ-9830"
  },
  {
   "identificacion": 38210839,
   "Nombres": "BARRETO TRIANA HEIDI MILENA ",
   "Estamento": "Estudiante",
   "Correo": "heidi.barreto@fuac.edu.co",
   "codigo": "PIO-1171-WGZ-9829"
  },
  {
   "identificacion": 26427171,
   "Nombres": "BUITRAGO GARCIA ANA JOHANNA ",
   "Estamento": "Estudiante",
   "Correo": "abuitrago.garcia@fuac.edu.co",
   "codigo": "WYR-1172-ABA-9828"
  },
  {
   "identificacion": 1024579086,
   "Nombres": "CALDERON CANTILLO DANIEL EDUARDO ",
   "Estamento": "Estudiante",
   "Correo": "daniele.calderon@fuac.edu.co",
   "codigo": "YUI-1173-RDJ-9827"
  },
  {
   "identificacion": 1020780355,
   "Nombres": "CEPEDA CARDENAS JUANITA MARIA ",
   "Estamento": "Estudiante",
   "Correo": "juanita.cepeda@fuac.edu.co",
   "codigo": "PIO-1174-WGZ-9826"
  },
  {
   "identificacion": 1069474674,
   "Nombres": "MERCADO SUAREZ ENRIQUE CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "enrique.mercado@fuac.edu.co",
   "codigo": "WYR-1175-ABA-9825"
  },
  {
   "identificacion": 1112483128,
   "Nombres": "ALARCON TORRES CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "camilo.alarcon@fuac.edu.co",
   "codigo": "YUI-1176-RDJ-9824"
  },
  {
   "identificacion": 52501883,
   "Nombres": "BLANCO SANCHEZ MERY ESNEDA ",
   "Estamento": "Estudiante",
   "Correo": "mery.blanco@fuac.edu.co",
   "codigo": "PIO-1177-WGZ-9823"
  },
  {
   "identificacion": 1022342245,
   "Nombres": "BUITRAGO BARRERA ADRIANA DEL PILAR ",
   "Estamento": "Estudiante",
   "Correo": "buitrago.adriana@fuac.edu.co",
   "codigo": "WYR-1178-ABA-9822"
  },
  {
   "identificacion": 52991547,
   "Nombres": "BUSTOS NIÑO EMILSEN  ",
   "Estamento": "Estudiante",
   "Correo": "emilsen.bustos@fuac.edu.co",
   "codigo": "YUI-1179-RDJ-9821"
  },
  {
   "identificacion": 27801706,
   "Nombres": "CALDERON BARRERA ELCY MARIA ",
   "Estamento": "Estudiante",
   "Correo": "elcy.calderon@fuac.edu.co",
   "codigo": "PIO-1180-WGZ-9820"
  },
  {
   "identificacion": 1063290869,
   "Nombres": "CALLE AGUAS ANDRES DAVID ",
   "Estamento": "Estudiante",
   "Correo": "andresd.calle@fuac.edu.co",
   "codigo": "WYR-1181-ABA-9819"
  },
  {
   "identificacion": 1110503454,
   "Nombres": "CUPITRE CUBILLOS WILSON FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "wilson.cupitre@fuac.edu.co",
   "codigo": "YUI-1182-RDJ-9818"
  },
  {
   "identificacion": 1072494923,
   "Nombres": "DUQUE BALLEN LINA MARYORY ",
   "Estamento": "Estudiante",
   "Correo": "linama.duque@fuac.edu.co",
   "codigo": "PIO-1183-WGZ-9817"
  },
  {
   "identificacion": 1065815790,
   "Nombres": "ELLES MAESTRE WILSON DANIEL ",
   "Estamento": "Estudiante",
   "Correo": "wilson.elles@fuac.edu.co",
   "codigo": "WYR-1184-ABA-9816"
  },
  {
   "identificacion": 1101177767,
   "Nombres": "FORERO NIÑO FARID ALFREDO ",
   "Estamento": "Estudiante",
   "Correo": "farid.forero@fuac.edu.co",
   "codigo": "YUI-1185-RDJ-9815"
  },
  {
   "identificacion": 1063294365,
   "Nombres": "GUZMAN OVIEDO LEONARDO  ",
   "Estamento": "Estudiante",
   "Correo": "leonardo.guzman@fuac.edu.co",
   "codigo": "PIO-1186-WGZ-9814"
  },
  {
   "identificacion": 24652586,
   "Nombres": "MORENO ORTIZ BLANCA NEIDY ",
   "Estamento": "Estudiante",
   "Correo": "blanca.moreno@fuac.edu.co",
   "codigo": "WYR-1187-ABA-9813"
  },
  {
   "identificacion": 52489016,
   "Nombres": "OSORIO GOMEZ JHANNY ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "jhanny.osorio@fuac.edu.co",
   "codigo": "YUI-1188-RDJ-9812"
  },
  {
   "identificacion": 53124146,
   "Nombres": "PARADA CALDAS EDITH HERMENCIA ",
   "Estamento": "Estudiante",
   "Correo": "edith.parada@fuac.edu.co",
   "codigo": "PIO-1189-WGZ-9811"
  },
  {
   "identificacion": 1067949420,
   "Nombres": "POLO OROZCO PAOLA ALEXANDRA ",
   "Estamento": "Estudiante",
   "Correo": "paola.polo@fuac.edu.co",
   "codigo": "WYR-1190-ABA-9810"
  },
  {
   "identificacion": 1012381442,
   "Nombres": "QUINTERO ANTIVAR NICOLAS ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.quintero@fuac.edu.co",
   "codigo": "YUI-1191-RDJ-9809"
  },
  {
   "identificacion": 52888267,
   "Nombres": "SOCHA RODRIGUEZ MONICA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "monica.socha@fuac.edu.co",
   "codigo": "PIO-1192-WGZ-9808"
  },
  {
   "identificacion": 1111814316,
   "Nombres": "VALENCIA TORRES HAROLD  ",
   "Estamento": "Estudiante",
   "Correo": "harold.valencia@fuac.edu.co",
   "codigo": "WYR-1193-ABA-9807"
  },
  {
   "identificacion": 1053782760,
   "Nombres": "ZULUAGA RODRIGUEZ LINA MARIA ",
   "Estamento": "Estudiante",
   "Correo": "lina.zuluaga@fuac.edu.co",
   "codigo": "YUI-1194-RDJ-9806"
  },
  {
   "identificacion": 1088276500,
   "Nombres": "ARIAS GARCIA VANNESSA  ",
   "Estamento": "Estudiante",
   "Correo": "vannessa.arias@fuac.edu.co",
   "codigo": "PIO-1195-WGZ-9805"
  },
  {
   "identificacion": 53118092,
   "Nombres": "DAZA FLORIAN XIOMARA  ",
   "Estamento": "Estudiante",
   "Correo": "xiomara.daza@fuac.edu.co",
   "codigo": "WYR-1196-ABA-9804"
  },
  {
   "identificacion": 19274458,
   "Nombres": "GOMEZ FIGUEREDO JAIME HERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "jaimeh.gomez@fuac.edu.co",
   "codigo": "YUI-1197-RDJ-9803"
  },
  {
   "identificacion": 80763186,
   "Nombres": "GUTIERREZ GUTIERREZ WILLIAM ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "gutierrez.william@fuac.edu.co",
   "codigo": "PIO-1198-WGZ-9802"
  },
  {
   "identificacion": 79304877,
   "Nombres": "LATORRE OVALLE GERMAN GUILLERMO ",
   "Estamento": "Estudiante",
   "Correo": "german.latorre@fuac.edu.co",
   "codigo": "WYR-1199-ABA-9801"
  },
  {
   "identificacion": 51987157,
   "Nombres": "ORTEGA BOLANO SANDRA LEONOR ",
   "Estamento": "Estudiante",
   "Correo": "sandrao.bolano@fuac.edu.co",
   "codigo": "YUI-1200-RDJ-9800"
  },
  {
   "identificacion": 79474149,
   "Nombres": "OVALLE LEAL GABRIEL ALONSO ",
   "Estamento": "Estudiante",
   "Correo": "gabriel.ovalle@fuac.edu.co",
   "codigo": "PIO-1201-WGZ-9799"
  },
  {
   "identificacion": 52762093,
   "Nombres": "PEÑA LOPEZ SONIA PATRICIA ",
   "Estamento": "Estudiante",
   "Correo": "soniap.lopez@fuac.edu.co",
   "codigo": "WYR-1202-ABA-9798"
  },
  {
   "identificacion": 1018487820,
   "Nombres": "RODRIGUEZ ESPINOSA DARLIN STEFANY ",
   "Estamento": "Estudiante",
   "Correo": "darlin.rodriguez@fuac.edu.co",
   "codigo": "YUI-1203-RDJ-9797"
  },
  {
   "identificacion": 1022398534,
   "Nombres": "SARMIENTO SUAREZ SAILEN ENITH ",
   "Estamento": "Estudiante",
   "Correo": "sailen.sarmiento@fuac.edu.co",
   "codigo": "PIO-1204-WGZ-9796"
  },
  {
   "identificacion": 1003690560,
   "Nombres": "TORRES CORTES MARIA XIMENA ",
   "Estamento": "Estudiante",
   "Correo": "mximena.torres@fuac.edu.co",
   "codigo": "WYR-1205-ABA-9795"
  },
  {
   "identificacion": 53082003,
   "Nombres": "TOVAR TRIANA LAURA VIVIANA ",
   "Estamento": "Estudiante",
   "Correo": "tovar.laura@fuac.edu.co",
   "codigo": "YUI-1206-RDJ-9794"
  },
  {
   "identificacion": 1058846225,
   "Nombres": "GIRALDO RAMIREZ ANA MARIA ",
   "Estamento": "Estudiante",
   "Correo": "agiraldo.ramirez@fuac.edu.co",
   "codigo": "PIO-1207-WGZ-9793"
  },
  {
   "identificacion": 1024546055,
   "Nombres": "SANCHEZ DIAZ DIANA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "dianac.sanchez@fuac.edu.co",
   "codigo": "WYR-1208-ABA-9792"
  },
  {
   "identificacion": 1016039485,
   "Nombres": "SANCHEZ MORENO MONICA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "sanchez.monica@fuac.edu.co",
   "codigo": "YUI-1209-RDJ-9791"
  },
  {
   "identificacion": 1010246035,
   "Nombres": "TIBAQUIRA ORJUELA HENRY SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "henry.tibaquira@fuac.edu.co",
   "codigo": "PIO-1210-WGZ-9790"
  },
  {
   "identificacion": 79489655,
   "Nombres": "DELGADO HERRERA ALIRIO SERAFIN ",
   "Estamento": "Estudiante",
   "Correo": "alirio.delgado@fuac.edu.co",
   "codigo": "WYR-1211-ABA-9789"
  },
  {
   "identificacion": 1032446109,
   "Nombres": "PULIDO VELARDE LEIDY TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "lpulido.velarde@fuac.edu.co",
   "codigo": "YUI-1212-RDJ-9788"
  },
  {
   "identificacion": 52269794,
   "Nombres": "AMAYA MEDINA GRASE ADRIANA ",
   "Estamento": "Estudiante",
   "Correo": "grase.amaya@fuac.edu.co",
   "codigo": "PIO-1213-WGZ-9787"
  },
  {
   "identificacion": 52842545,
   "Nombres": "BELLO GALVIS SANDRA NOELIA ",
   "Estamento": "Estudiante",
   "Correo": "noelia.bello@fuac.edu.co",
   "codigo": "WYR-1214-ABA-9786"
  },
  {
   "identificacion": 1062811689,
   "Nombres": "GUERRA SANCHEZ MARCELA  ",
   "Estamento": "Estudiante",
   "Correo": "marcela.guerra@fuac.edu.co",
   "codigo": "YUI-1215-RDJ-9785"
  },
  {
   "identificacion": 80880427,
   "Nombres": "LLANOS GIL NICOLAS  ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.llanos@fuac.edu.co",
   "codigo": "PIO-1216-WGZ-9784"
  },
  {
   "identificacion": 86000097,
   "Nombres": "SILVA AGUDELO MILTON  ",
   "Estamento": "Estudiante",
   "Correo": "milton.silva@fuac.edu.co",
   "codigo": "WYR-1217-ABA-9783"
  },
  {
   "identificacion": 36183372,
   "Nombres": "CORREDOR QUINTERO MARIA IRMA ",
   "Estamento": "Estudiante",
   "Correo": "mariai.corredor@fuac.edu.co",
   "codigo": "YUI-1218-RDJ-9782"
  },
  {
   "identificacion": 1030574395,
   "Nombres": "DUQUE VARGAS LUZ MYRIAM ",
   "Estamento": "Estudiante",
   "Correo": "luzm.duque@fuac.edu.co",
   "codigo": "PIO-1219-WGZ-9781"
  },
  {
   "identificacion": 1031178326,
   "Nombres": "ESCOBAR VENEGAS SANTIAGO  ",
   "Estamento": "Estudiante",
   "Correo": "santiago.escobar@fuac.edu.co",
   "codigo": "WYR-1220-ABA-9780"
  },
  {
   "identificacion": 1152214500,
   "Nombres": "VELEZ MARTINEZ NATALIA  ",
   "Estamento": "Estudiante",
   "Correo": "natalia.velez@fuac.edu.co",
   "codigo": "YUI-1221-RDJ-9779"
  },
  {
   "identificacion": 1077455031,
   "Nombres": "ACHITO LANA GEZRA ANDRÉS ",
   "Estamento": "Estudiante",
   "Correo": "achito.gezra@fuac.edu.co",
   "codigo": "PIO-1222-WGZ-9778"
  },
  {
   "identificacion": 1015428927,
   "Nombres": "AGUDELO RODRIGUEZ JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "agudelo.juan@fuac.edu.co",
   "codigo": "WYR-1223-ABA-9777"
  },
  {
   "identificacion": 1001277678,
   "Nombres": "AGUJA FAJARDO ANGIE PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "angie.aguja@fuac.edu.co",
   "codigo": "YUI-1224-RDJ-9776"
  },
  {
   "identificacion": 80028021,
   "Nombres": "ALBARRACIN GOMEZ GONZALO  ",
   "Estamento": "Estudiante",
   "Correo": "gonzalo.albarracin@fuac.edu.co",
   "codigo": "PIO-1225-WGZ-9775"
  },
  {
   "identificacion": 46370284,
   "Nombres": "ALVARADO AFRICANO ALEXANDRA  ",
   "Estamento": "Estudiante",
   "Correo": "alexandra.alvarado@fuac.edu.co",
   "codigo": "WYR-1226-ABA-9774"
  },
  {
   "identificacion": 1013652258,
   "Nombres": "ALVARADO ROA ANGIE LICETH ",
   "Estamento": "Estudiante",
   "Correo": "angie.alvarado@fuac.edu.co",
   "codigo": "YUI-1227-RDJ-9773"
  },
  {
   "identificacion": 1001348296,
   "Nombres": "AMAYA PÉREZ MARIA JOSE ",
   "Estamento": "Estudiante",
   "Correo": "mariajose.amaya@fuac.edu.co",
   "codigo": "PIO-1228-WGZ-9772"
  },
  {
   "identificacion": 1001053937,
   "Nombres": "ARDILA CASTRO MICHAEL GERARDO ",
   "Estamento": "Estudiante",
   "Correo": "michael.ardila@fuac.edu.co",
   "codigo": "WYR-1229-ABA-9771"
  },
  {
   "identificacion": 1023863532,
   "Nombres": "AREVALO MORENO GERMAN ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "german.arevalo@fuac.edu.co",
   "codigo": "YUI-1230-RDJ-9770"
  },
  {
   "identificacion": 1136881517,
   "Nombres": "ARIAS AGUILAR CRISTIAN GERARDO ",
   "Estamento": "Estudiante",
   "Correo": "carias.aguilar@fuac.edu.co",
   "codigo": "PIO-1231-WGZ-9769"
  },
  {
   "identificacion": 79909861,
   "Nombres": "ARIAS CASTRO ADRIAN ROBERTO ",
   "Estamento": "Estudiante",
   "Correo": "adrian.arias@fuac.edu.co",
   "codigo": "WYR-1232-ABA-9768"
  },
  {
   "identificacion": 1012399047,
   "Nombres": "ARIZA MARZOLA RICHARD EUCARDO ",
   "Estamento": "Estudiante",
   "Correo": "richard.ariza@fuac.edu.co",
   "codigo": "YUI-1233-RDJ-9767"
  },
  {
   "identificacion": 1026300184,
   "Nombres": "ARTEAGA OSMA VANESSA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "vanessa.arteaga@fuac.edu.co",
   "codigo": "PIO-1234-WGZ-9766"
  },
  {
   "identificacion": 52065744,
   "Nombres": "ATUESTA BERNATE MARISOL  ",
   "Estamento": "Estudiante",
   "Correo": "marisol.atuesta@fuac.edu.co",
   "codigo": "WYR-1235-ABA-9765"
  },
  {
   "identificacion": 1000596084,
   "Nombres": "AVELLA FONSECA CESAR MAURICIO ",
   "Estamento": "Estudiante",
   "Correo": "cesar.avella@fuac.edu.co",
   "codigo": "YUI-1236-RDJ-9764"
  },
  {
   "identificacion": 1030612738,
   "Nombres": "AVILA GONZALEZ KATHERINE  ",
   "Estamento": "Estudiante",
   "Correo": "avila.katherine@fuac.edu.co",
   "codigo": "PIO-1237-WGZ-9763"
  },
  {
   "identificacion": 1000460484,
   "Nombres": "AYA ROJAS CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "camilo.aya@fuac.edu.co",
   "codigo": "WYR-1238-ABA-9762"
  },
  {
   "identificacion": 1015470835,
   "Nombres": "BALLEN ACOSTA RAUL STEVENN ",
   "Estamento": "Estudiante",
   "Correo": "ballen.raul@fuac.edu.co",
   "codigo": "YUI-1239-RDJ-9761"
  },
  {
   "identificacion": 1019142558,
   "Nombres": "BARON BERNAL LAURA NATHALIA ",
   "Estamento": "Estudiante",
   "Correo": "baron.laura@fuac.edu.co",
   "codigo": "PIO-1240-WGZ-9760"
  },
  {
   "identificacion": 1013617530,
   "Nombres": "BARRETO PABON SIXTO DUVAN ",
   "Estamento": "Estudiante",
   "Correo": "sixto.barreto@fuac.edu.co",
   "codigo": "WYR-1241-ABA-9759"
  },
  {
   "identificacion": 1090468712,
   "Nombres": "BAUTISTA CARDENAS JOHAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "bautista.johan@fuac.edu.co",
   "codigo": "YUI-1242-RDJ-9758"
  },
  {
   "identificacion": 52501352,
   "Nombres": "BECERRA ACEROS SANDRA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "sbecerrra.aceros@fuac.edu.co",
   "codigo": "PIO-1243-WGZ-9757"
  },
  {
   "identificacion": 1032429229,
   "Nombres": "BECERRA RODRIGUEZ CARLOS ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "becerra.carlos@fuac.edu.co",
   "codigo": "WYR-1244-ABA-9756"
  },
  {
   "identificacion": 1000063636,
   "Nombres": "BELTRAN HALDANE DAVID MATEO ",
   "Estamento": "Estudiante",
   "Correo": "beltran.david@fuac.edu.co",
   "codigo": "YUI-1245-RDJ-9755"
  },
  {
   "identificacion": 1010236835,
   "Nombres": "BERNAL ALVAREZ NICOLAS CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.bernal@fuac.edu.co",
   "codigo": "PIO-1246-WGZ-9754"
  },
  {
   "identificacion": 1016103627,
   "Nombres": "BOCANEGRA CHAVEZ NICOLAS  ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.bocanegra@fuac.edu.co",
   "codigo": "WYR-1247-ABA-9753"
  },
  {
   "identificacion": 80202612,
   "Nombres": "BOHORQUEZ MARTINEZ JIMMY  ",
   "Estamento": "Estudiante",
   "Correo": "jimmy.bohorquez@fuac.edu.co",
   "codigo": "YUI-1248-RDJ-9752"
  },
  {
   "identificacion": 1072197238,
   "Nombres": "BUITRAGO GUTIERREZ NIKOL DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "nikol.buitrago@fuac.edu.co",
   "codigo": "PIO-1249-WGZ-9751"
  },
  {
   "identificacion": 87433928,
   "Nombres": "CABEZAS BASTIDAS JAVIER ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "javier.cabezas@fuac.edu.co",
   "codigo": "WYR-1250-ABA-9750"
  },
  {
   "identificacion": 79736653,
   "Nombres": "CAICEDO ESCOBAR JAIME EULISES ",
   "Estamento": "Estudiante",
   "Correo": "jaime.caicedo@fuac.edu.co",
   "codigo": "YUI-1251-RDJ-9749"
  },
  {
   "identificacion": 1033809524,
   "Nombres": "CAMELO GARCIA DAVID EDUARDO ",
   "Estamento": "Estudiante",
   "Correo": "david.camelo@fuac.edu.co",
   "codigo": "PIO-1252-WGZ-9748"
  },
  {
   "identificacion": 1000337273,
   "Nombres": "CAMPOS RODRIGUEZ JUANITA  ",
   "Estamento": "Estudiante",
   "Correo": "juanita.campos@fuac.edu.co",
   "codigo": "WYR-1253-ABA-9747"
  },
  {
   "identificacion": 1007568841,
   "Nombres": "CANO PAPAMIJA JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "jcano.papamija@fuac.edu.co",
   "codigo": "YUI-1254-RDJ-9746"
  },
  {
   "identificacion": 1007765338,
   "Nombres": "CARDENAS HEREDIA NATALIA DEL PILAR ",
   "Estamento": "Estudiante",
   "Correo": "cardenas.natalia@fuac.edu.co",
   "codigo": "PIO-1255-WGZ-9745"
  },
  {
   "identificacion": 1057587570,
   "Nombres": "CASTAÑEDA DONATO ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "castaneda.andres@fuac.edu.co",
   "codigo": "WYR-1256-ABA-9744"
  },
  {
   "identificacion": 1010008412,
   "Nombres": "CASTRO MARULANDA JORGE LUIS ",
   "Estamento": "Estudiante",
   "Correo": "castro.jorge@fuac.edu.co",
   "codigo": "YUI-1257-RDJ-9743"
  },
  {
   "identificacion": 1010222027,
   "Nombres": "CASTRO NEIRA LUIS FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "lcastro.neira@fuac.edu.co",
   "codigo": "PIO-1258-WGZ-9742"
  },
  {
   "identificacion": 52955615,
   "Nombres": "CAÑON ROMERO CAROL TATIANA DEL CARMEN ",
   "Estamento": "Estudiante",
   "Correo": "carol.canon@fuac.edu.co",
   "codigo": "WYR-1259-ABA-9741"
  },
  {
   "identificacion": 1075682952,
   "Nombres": "CELIS ACUÑA JUAN JOSE ",
   "Estamento": "Estudiante",
   "Correo": "celis.juan@fuac.edu.co",
   "codigo": "YUI-1260-RDJ-9740"
  },
  {
   "identificacion": 1014308781,
   "Nombres": "CHAPARRO ROMERO PAULA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "paula.chaparro@fuac.edu.co",
   "codigo": "PIO-1261-WGZ-9739"
  },
  {
   "identificacion": 1010113938,
   "Nombres": "CHARRY ACOSTA LORENA  ",
   "Estamento": "Estudiante",
   "Correo": "lorena.charry@fuac.edu.co",
   "codigo": "WYR-1262-ABA-9738"
  },
  {
   "identificacion": 1031178468,
   "Nombres": "CIFUENTES MARTIN SANDRA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "cifuentes.sandra@fuac.edu.co",
   "codigo": "YUI-1263-RDJ-9737"
  },
  {
   "identificacion": 1007589387,
   "Nombres": "CLAVIJO CARVAJAL PAULA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "paula.clavijo@fuac.edu.co",
   "codigo": "PIO-1264-WGZ-9736"
  },
  {
   "identificacion": 1007920860,
   "Nombres": "COLONA OSPINO ANDREA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "andrea.colona@fuac.edu.co",
   "codigo": "WYR-1265-ABA-9735"
  },
  {
   "identificacion": 1000460769,
   "Nombres": "CONTO ROJAS DANIEL FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "daniel.conto@fuac.edu.co",
   "codigo": "YUI-1266-RDJ-9734"
  },
  {
   "identificacion": 53893893,
   "Nombres": "CORREA SALINAS JENNIFFER PATRICIA ",
   "Estamento": "Estudiante",
   "Correo": "jenniffer.correa@fuac.edu.co",
   "codigo": "PIO-1267-WGZ-9733"
  },
  {
   "identificacion": 1022415247,
   "Nombres": "CRISTANCHO GUEVARA ALEJANDRA  ",
   "Estamento": "Estudiante",
   "Correo": "alejandra.cristancho@fuac.edu.co",
   "codigo": "WYR-1268-ABA-9732"
  },
  {
   "identificacion": 1028661419,
   "Nombres": "CRUZ CARVAJAL VALENTINA  ",
   "Estamento": "Estudiante",
   "Correo": "valentina.cruz@fuac.edu.co",
   "codigo": "YUI-1269-RDJ-9731"
  },
  {
   "identificacion": 1122137849,
   "Nombres": "CRUZ CULMAN PAULA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "pcruz.culman@fuac.edu.co",
   "codigo": "PIO-1270-WGZ-9730"
  },
  {
   "identificacion": 1010246790,
   "Nombres": "CUBILLOS ARIZA KAREN YIZETH ",
   "Estamento": "Estudiante",
   "Correo": "karen.cubillos@fuac.edu.co",
   "codigo": "WYR-1271-ABA-9729"
  },
  {
   "identificacion": 1032469243,
   "Nombres": "CUBILLOS CASTRO MAYOLI  ",
   "Estamento": "Estudiante",
   "Correo": "mayoli.cubillos@fuac.edu.co",
   "codigo": "YUI-1272-RDJ-9728"
  },
  {
   "identificacion": 79955853,
   "Nombres": "CUBILLOS LOZANO SERGIO ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "sergio.cubillos@fuac.edu.co",
   "codigo": "PIO-1273-WGZ-9727"
  },
  {
   "identificacion": 1000325939,
   "Nombres": "CUBILLOS RODRIGUEZ YUVISSA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "yuvissa.cubillos@fuac.edu.co",
   "codigo": "WYR-1274-ABA-9726"
  },
  {
   "identificacion": 1233891907,
   "Nombres": "CUESTA GRIMALDOS JUAN PABLO ",
   "Estamento": "Estudiante",
   "Correo": "juan.cuesta@fuac.edu.co",
   "codigo": "YUI-1275-RDJ-9725"
  },
  {
   "identificacion": 1014239588,
   "Nombres": "DIAZ ARANGUREN JUAN PABLO ",
   "Estamento": "Estudiante",
   "Correo": "jdiaz.aranguren@fuac.edu.co",
   "codigo": "PIO-1276-WGZ-9724"
  },
  {
   "identificacion": 1000573126,
   "Nombres": "DIAZ DELGADO NICOLAS  ",
   "Estamento": "Estudiante",
   "Correo": "diaz.nicolas@fuac.edu.co",
   "codigo": "WYR-1277-ABA-9723"
  },
  {
   "identificacion": 1079604258,
   "Nombres": "DIAZ ORDOÑEZ YURI MARCELA ",
   "Estamento": "Estudiante",
   "Correo": "yuri.diaz@fuac.edu.co",
   "codigo": "YUI-1278-RDJ-9722"
  },
  {
   "identificacion": 1144153334,
   "Nombres": "DUARTE LONDOÑO JAVIER SANTIAGO ",
   "Estamento": "Estudiante",
   "Correo": "javier.duarte@fuac.edu.co",
   "codigo": "PIO-1279-WGZ-9721"
  },
  {
   "identificacion": 1001282683,
   "Nombres": "DUARTE PAEZ ANGIE NICOLE ",
   "Estamento": "Estudiante",
   "Correo": "angie.duarte@fuac.edu.co",
   "codigo": "WYR-1280-ABA-9720"
  },
  {
   "identificacion": 1140877337,
   "Nombres": "ESCOBAR CESPEDES NATALIA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "natalia.escobar@fuac.edu.co",
   "codigo": "YUI-1281-RDJ-9719"
  },
  {
   "identificacion": 1016047591,
   "Nombres": "ESCOBEDO MORENO DIEGO MICHAEL ",
   "Estamento": "Estudiante",
   "Correo": "diego.escobedo@fuac.edu.co",
   "codigo": "PIO-1282-WGZ-9718"
  },
  {
   "identificacion": 80880601,
   "Nombres": "ESGUERRA CACERES ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "andres.esguerra@fuac.edu.co",
   "codigo": "WYR-1283-ABA-9717"
  },
  {
   "identificacion": 1000580776,
   "Nombres": "ESTACIO QUINTERO GISSEL TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "gisell.estacio@fuac.edu.co",
   "codigo": "YUI-1284-RDJ-9716"
  },
  {
   "identificacion": 1030587925,
   "Nombres": "FANDIÑO RAYO YENNIFER CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "yennifer.fandino@fuac.edu.co",
   "codigo": "PIO-1285-WGZ-9715"
  },
  {
   "identificacion": 1010195890,
   "Nombres": "FEREZ SOLORZANO SALIM HASSID ",
   "Estamento": "Estudiante",
   "Correo": "salim.ferez@fuac.edu.co",
   "codigo": "WYR-1286-ABA-9714"
  },
  {
   "identificacion": 1007569409,
   "Nombres": "FIERRO POVEDA MARIANA CAMILA ",
   "Estamento": "Estudiante",
   "Correo": "mariana.fierro@fuac.edu.co",
   "codigo": "YUI-1287-RDJ-9713"
  },
  {
   "identificacion": 1032462663,
   "Nombres": "FIGUEROA CAMPO DANIEL CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "figueroa.daniel@fuac.edu.co",
   "codigo": "PIO-1288-WGZ-9712"
  },
  {
   "identificacion": 1019044956,
   "Nombres": "FLOREZ CARVAJAL FRANCISCO JAVIER ",
   "Estamento": "Estudiante",
   "Correo": "florez.francisco@fuac.edu.co",
   "codigo": "WYR-1289-ABA-9711"
  },
  {
   "identificacion": 1000857840,
   "Nombres": "FONSECA ANGARITA CAROLINA  ",
   "Estamento": "Estudiante",
   "Correo": "carolina.fonseca@fuac.edu.co",
   "codigo": "YUI-1290-RDJ-9710"
  },
  {
   "identificacion": 1010037024,
   "Nombres": "FORERO RUIZ GABRIELA  ",
   "Estamento": "Estudiante",
   "Correo": "gabriela.forero@fuac.edu.co",
   "codigo": "PIO-1291-WGZ-9709"
  },
  {
   "identificacion": 1001047610,
   "Nombres": "FRANCO GONZALEZ JULIANA  ",
   "Estamento": "Estudiante",
   "Correo": "juliana.franco@fuac.edu.co",
   "codigo": "WYR-1292-ABA-9708"
  },
  {
   "identificacion": 1001047611,
   "Nombres": "FUENTES SALDAÑA VALERIA  ",
   "Estamento": "Estudiante",
   "Correo": "valeria.fuentes@fuac.edu.co",
   "codigo": "YUI-1293-RDJ-9707"
  },
  {
   "identificacion": 1000617043,
   "Nombres": "FUYA CIFUENTES NICOL VIVIANA ",
   "Estamento": "Estudiante",
   "Correo": "nicol.fuya@fuac.edu.co",
   "codigo": "PIO-1294-WGZ-9706"
  },
  {
   "identificacion": 1032096883,
   "Nombres": "GALEANO CONTRERAS XIMENA  ",
   "Estamento": "Estudiante",
   "Correo": "ximena.galeano@fuac.edu.co",
   "codigo": "WYR-1295-ABA-9705"
  },
  {
   "identificacion": 1123325461,
   "Nombres": "GALEANO VELEZ LUIS CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "luis.galeano@fuac.edu.co",
   "codigo": "YUI-1296-RDJ-9704"
  },
  {
   "identificacion": 1016942868,
   "Nombres": "GARAY MANOSALVA JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "juanda.garay@fuac.edu.co",
   "codigo": "PIO-1297-WGZ-9703"
  },
  {
   "identificacion": 1077647159,
   "Nombres": "GARCES CAMPAZ SOLANDY  ",
   "Estamento": "Estudiante",
   "Correo": "solandy.garces@fuac.edu.co",
   "codigo": "WYR-1298-ABA-9702"
  },
  {
   "identificacion": 1023953328,
   "Nombres": "GARCIA ARIZA ERIC DAVID ",
   "Estamento": "Estudiante",
   "Correo": "eric.garcia@fuac.edu.co",
   "codigo": "YUI-1299-RDJ-9701"
  },
  {
   "identificacion": 1002524707,
   "Nombres": "GARCIA CASAS DAVID ESTIVEN ",
   "Estamento": "Estudiante",
   "Correo": "David.sti.1106@gmail.com",
   "codigo": "PIO-1300-WGZ-9700"
  },
  {
   "identificacion": 79712722,
   "Nombres": "GARCIA CEPEDA LUIS ALDEMAR ",
   "Estamento": "Estudiante",
   "Correo": "lgarcia.cepeda@fuac.edu.co",
   "codigo": "WYR-1301-ABA-9699"
  },
  {
   "identificacion": 7384952,
   "Nombres": "GARCIA CUADRADO DANIEL RICARDO ",
   "Estamento": "Estudiante",
   "Correo": "garcia.daniel@fuac.edu.co",
   "codigo": "YUI-1302-RDJ-9698"
  },
  {
   "identificacion": 1001345483,
   "Nombres": "GARCIA FLOREZ JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "jgarcia.florez@fuac.edu.co",
   "codigo": "PIO-1303-WGZ-9697"
  },
  {
   "identificacion": 1012360246,
   "Nombres": "GARZÓN COTACIO LILIANA  ",
   "Estamento": "Estudiante",
   "Correo": "lilianag.cotacio@fuac.edu.co",
   "codigo": "WYR-1304-ABA-9696"
  },
  {
   "identificacion": 1000791205,
   "Nombres": "GARZÓN QUESADA IVONNE SARAHY ",
   "Estamento": "Estudiante",
   "Correo": "ivonne.garzon@fuac.edu.co",
   "codigo": "YUI-1305-RDJ-9695"
  },
  {
   "identificacion": 1023971003,
   "Nombres": "GIRALDO RAMIREZ PABLO FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "pablo.giraldo@fuac.edu.co",
   "codigo": "PIO-1306-WGZ-9694"
  },
  {
   "identificacion": 1026297416,
   "Nombres": "GIRON CHILITO ANDREA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "andrea.giron@fuac.edu.co",
   "codigo": "WYR-1307-ABA-9693"
  },
  {
   "identificacion": 1000686046,
   "Nombres": "GOMEZ LOPEZ DAVID ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "dgomez.lopez@fuac.edu.co",
   "codigo": "YUI-1308-RDJ-9692"
  },
  {
   "identificacion": 1192715160,
   "Nombres": "GONZALEZ CENTENO NELLYS PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "nellys.gonzalez@fuac.edu.co",
   "codigo": "PIO-1309-WGZ-9691"
  },
  {
   "identificacion": 1007701793,
   "Nombres": "GONZALEZ MEDINA SERGIO ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "sgonzalez.medina@fuac.edu.co",
   "codigo": "WYR-1310-ABA-9690"
  },
  {
   "identificacion": 1013581405,
   "Nombres": "GONZALEZ RODRIGUEZ LEIDY JOHANA ",
   "Estamento": "Estudiante",
   "Correo": "lgonzalez.johana@fuac.edu.co",
   "codigo": "YUI-1311-RDJ-9689"
  },
  {
   "identificacion": 1023886211,
   "Nombres": "GONZALEZ ZARATE YURY TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "yury.gonzalez@fuac.edu.co",
   "codigo": "PIO-1312-WGZ-9688"
  },
  {
   "identificacion": 1011085780,
   "Nombres": "GONZÁLEZ VILLALOBOS ERIKA JHOSIANY ",
   "Estamento": "Estudiante",
   "Correo": "jhosiany.gonzalez@fuac.edu.co",
   "codigo": "WYR-1313-ABA-9687"
  },
  {
   "identificacion": 1000255238,
   "Nombres": "GUERRERO CEPEDA XIOMARA  ",
   "Estamento": "Estudiante",
   "Correo": "xiomara.guerrero@fuac.edu.co",
   "codigo": "YUI-1314-RDJ-9686"
  },
  {
   "identificacion": 1032505814,
   "Nombres": "GUERRERO HOLGUIN JEYSON NORBEY ",
   "Estamento": "Estudiante",
   "Correo": "jeyson.guerrero@fuac.edu.co",
   "codigo": "PIO-1315-WGZ-9685"
  },
  {
   "identificacion": 1010117996,
   "Nombres": "GUERRERO TRUJILLO SUSHAN DAYANA ",
   "Estamento": "Estudiante",
   "Correo": "sushan.guerrero@fuac.edu.co",
   "codigo": "WYR-1316-ABA-9684"
  },
  {
   "identificacion": 1006615180,
   "Nombres": "GUEVARA FONTALVO JORGE ELIAS ",
   "Estamento": "Estudiante",
   "Correo": "guevara.jorge@fuac.edu.co",
   "codigo": "YUI-1317-RDJ-9683"
  },
  {
   "identificacion": 79871284,
   "Nombres": "GUTIERREZ CASTAÑEDA NESTOR ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "ngutierrez.castaneda@fuac.edu.co",
   "codigo": "PIO-1318-WGZ-9682"
  },
  {
   "identificacion": 1029641478,
   "Nombres": "HEREDIA TUAY DEIBY ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "alejandro.heredia@fuac.edu.co",
   "codigo": "WYR-1319-ABA-9681"
  },
  {
   "identificacion": 80094620,
   "Nombres": "HERNANDEZ GALINDO LUIS ALFONSO ",
   "Estamento": "Estudiante",
   "Correo": "lhernandez.galindo@fuac.edu.co",
   "codigo": "YUI-1320-RDJ-9680"
  },
  {
   "identificacion": 1000988265,
   "Nombres": "HERRERA GALINDO IVON LIYITH ",
   "Estamento": "Estudiante",
   "Correo": "ivon.herrera@fuac.edu.co",
   "codigo": "PIO-1321-WGZ-9679"
  },
  {
   "identificacion": 1099214639,
   "Nombres": "HERREÑO PEREZ PAULA LORENA ",
   "Estamento": "Estudiante",
   "Correo": "paula.herreno@fuac.edu.co",
   "codigo": "WYR-1322-ABA-9678"
  },
  {
   "identificacion": 1030689159,
   "Nombres": "HURTADO NIETO SANTIAGO  ",
   "Estamento": "Estudiante",
   "Correo": "santiago.hurtado@fuac.edu.co",
   "codigo": "YUI-1323-RDJ-9677"
  },
  {
   "identificacion": 1019141111,
   "Nombres": "JAIMES ROMERO CAMILA  ",
   "Estamento": "Estudiante",
   "Correo": "camila.jaimes@fuac.edu.co",
   "codigo": "PIO-1324-WGZ-9676"
  },
  {
   "identificacion": 1233510064,
   "Nombres": "LEIVA TACHA KEVIN DARIEN ",
   "Estamento": "Estudiante",
   "Correo": "leiva.kevin@fuac.edu.co",
   "codigo": "WYR-1325-ABA-9675"
  },
  {
   "identificacion": 1003950772,
   "Nombres": "LLANOS SANCHEZ BRENDA MELISSA ",
   "Estamento": "Estudiante",
   "Correo": "brenda.llanos@fuac.edu.co",
   "codigo": "YUI-1326-RDJ-9674"
  },
  {
   "identificacion": 1030647662,
   "Nombres": "LOPEZ FIERRO ALFONSO  ",
   "Estamento": "Estudiante",
   "Correo": "lopez.alfonso@fuac.edu.co",
   "codigo": "PIO-1327-WGZ-9673"
  },
  {
   "identificacion": 1000224802,
   "Nombres": "LOPEZ RINCON FREDERIC JEANPOOL ",
   "Estamento": "Estudiante",
   "Correo": "frederic.lopez@fuac.edu.co",
   "codigo": "WYR-1328-ABA-9672"
  },
  {
   "identificacion": 1010182752,
   "Nombres": "LOPEZ VELASQUEZ LUIS ALFONSO ",
   "Estamento": "Estudiante",
   "Correo": "llopez.velasquez@fuac.edu.co",
   "codigo": "YUI-1329-RDJ-9671"
  },
  {
   "identificacion": 1007396356,
   "Nombres": "LOZANO TAPIERO CLAUDIA HELENA ",
   "Estamento": "Estudiante",
   "Correo": "claudia.lozano@fuac.edu.co",
   "codigo": "PIO-1330-WGZ-9670"
  },
  {
   "identificacion": 1001342945,
   "Nombres": "LUNA CEPEDA LAURA SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "laura.luna@fuac.edu.co",
   "codigo": "WYR-1331-ABA-9669"
  },
  {
   "identificacion": 1015409541,
   "Nombres": "LUQUE BARRERA LORENA JOHANNA ",
   "Estamento": "Estudiante",
   "Correo": "lorena.luque@fuac.edu.co",
   "codigo": "YUI-1332-RDJ-9668"
  },
  {
   "identificacion": 1000136436,
   "Nombres": "MARIN BOJACA DARY ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "dary.marin@fuac.edu.co",
   "codigo": "PIO-1333-WGZ-9667"
  },
  {
   "identificacion": 79502230,
   "Nombres": "MEDINA GOMEZ WILLIAM ARTURO ",
   "Estamento": "Estudiante",
   "Correo": "wmedina.gomez@fuac.edu.co",
   "codigo": "WYR-1334-ABA-9666"
  },
  {
   "identificacion": 1109301722,
   "Nombres": "MEDINA ZAMORA JUAN DIEGO ",
   "Estamento": "Estudiante",
   "Correo": "jmedina.zamora@fuac.edu.co",
   "codigo": "YUI-1335-RDJ-9665"
  },
  {
   "identificacion": 1003765927,
   "Nombres": "MEJIA GIL YAMILE  ",
   "Estamento": "Estudiante",
   "Correo": "yamile.mejia@fuac.edu.co",
   "codigo": "PIO-1336-WGZ-9664"
  },
  {
   "identificacion": 80904661,
   "Nombres": "MENDOZA SÁNCHEZ MARIO ANDRÉS ",
   "Estamento": "Estudiante",
   "Correo": "mario.mendoza@fuac.edu.co",
   "codigo": "WYR-1337-ABA-9663"
  },
  {
   "identificacion": 1022985341,
   "Nombres": "MENESES PARADA ANDERZON STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "anderzon.meneses@fuac.edu.co",
   "codigo": "YUI-1338-RDJ-9662"
  },
  {
   "identificacion": 1033691570,
   "Nombres": "MILLAN FORERO KAROL DAYANA ",
   "Estamento": "Estudiante",
   "Correo": "karol.millan@fuac.edu.co",
   "codigo": "PIO-1339-WGZ-9661"
  },
  {
   "identificacion": 1007289007,
   "Nombres": "MOLINA MARTINEZ LEIDY DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "leidy.molina@fuac.edu.co",
   "codigo": "WYR-1340-ABA-9660"
  },
  {
   "identificacion": 80094489,
   "Nombres": "MONTAGUT BROCHERO LEONIDAS JOSE ",
   "Estamento": "Estudiante",
   "Correo": "leonidas.montagut@fuac.edu.co",
   "codigo": "YUI-1341-RDJ-9659"
  },
  {
   "identificacion": 1082131027,
   "Nombres": "MONTENEGRO PEREZ ANDREA VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "andrea.montenegro@fuac.edu.co",
   "codigo": "PIO-1342-WGZ-9658"
  },
  {
   "identificacion": 1032474714,
   "Nombres": "MONTOYA TORRES DANIELA  ",
   "Estamento": "Estudiante",
   "Correo": "daniela.montoya@fuac.edu.co",
   "codigo": "WYR-1343-ABA-9657"
  },
  {
   "identificacion": 1022437139,
   "Nombres": "MORA HOYOS JAVIER FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "mora.javier@fuac.edu.co",
   "codigo": "YUI-1344-RDJ-9656"
  },
  {
   "identificacion": 1018470545,
   "Nombres": "MORALES GARZON DIEGO ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "dmorales.garzon@fuac.edu.co",
   "codigo": "PIO-1345-WGZ-9655"
  },
  {
   "identificacion": 1019148605,
   "Nombres": "MORENO GUIOS FRANCISCO JAVIER ",
   "Estamento": "Estudiante",
   "Correo": "francisco.moreno@fuac.edu.co",
   "codigo": "WYR-1346-ABA-9654"
  },
  {
   "identificacion": 1013619382,
   "Nombres": "MORENO HURTADO LINA JOHANA ",
   "Estamento": "Estudiante",
   "Correo": "lmoreno.hurtado@fuac.edu.co",
   "codigo": "YUI-1347-RDJ-9653"
  },
  {
   "identificacion": 1007782526,
   "Nombres": "MORENO JIMENEZ EDNA JULLIETH ",
   "Estamento": "Estudiante",
   "Correo": "edna.moreno@fuac.edu.co",
   "codigo": "PIO-1348-WGZ-9652"
  },
  {
   "identificacion": 1054121353,
   "Nombres": "MORENO MERCHAN OSCAR DANILO ",
   "Estamento": "Estudiante",
   "Correo": "omoreno.merchan@fuac.edu.co",
   "codigo": "WYR-1349-ABA-9651"
  },
  {
   "identificacion": 1030643653,
   "Nombres": "MORENO MOLANO FREDY ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "fredy.moreno@fuac.edu.co",
   "codigo": "YUI-1350-RDJ-9650"
  },
  {
   "identificacion": 1013640152,
   "Nombres": "MURILLO AYALA VLADIMIR  ",
   "Estamento": "Estudiante",
   "Correo": "vladimir.murillo@fuac.edu.co",
   "codigo": "PIO-1351-WGZ-9649"
  },
  {
   "identificacion": 1019125130,
   "Nombres": "MUÑOZ CUADROS CRISTIAN ALVEIRO ",
   "Estamento": "Estudiante",
   "Correo": "munoz.cristian@fuac.edu.co",
   "codigo": "WYR-1352-ABA-9648"
  },
  {
   "identificacion": 1123890497,
   "Nombres": "MYLES LAWRI SHORLEY ELIZABETH ",
   "Estamento": "Estudiante",
   "Correo": "shorley.myles@fuac.edu.co",
   "codigo": "YUI-1353-RDJ-9647"
  },
  {
   "identificacion": 1018492321,
   "Nombres": "NAVAJAS CUESTA ESTEBAN CARMELO ",
   "Estamento": "Estudiante",
   "Correo": "esteban.navajas@fuac.edu.co",
   "codigo": "PIO-1354-WGZ-9646"
  },
  {
   "identificacion": 1000781928,
   "Nombres": "NIÑO MIRELES ANGELY PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "angely.nino@fuac.edu.co",
   "codigo": "WYR-1355-ABA-9645"
  },
  {
   "identificacion": 1024553544,
   "Nombres": "OCHOA ORTIZ MILTON ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "milton.ochoa@fuac.edu.co",
   "codigo": "YUI-1356-RDJ-9644"
  },
  {
   "identificacion": 1013642207,
   "Nombres": "ORTIZ MOLINA ERICK SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "ortiz.erik@fuac.edu.co",
   "codigo": "PIO-1357-WGZ-9643"
  },
  {
   "identificacion": 1109299372,
   "Nombres": "OSPINA CARDOZO JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "ospina.juan@fuac.edu.co",
   "codigo": "WYR-1358-ABA-9642"
  },
  {
   "identificacion": 52442591,
   "Nombres": "OSPINA CUBILLOS ADRIANA PATRICIA ",
   "Estamento": "Estudiante",
   "Correo": "ospina.adriana@fuac.edu.co",
   "codigo": "YUI-1359-RDJ-9641"
  },
  {
   "identificacion": 1000473814,
   "Nombres": "PACHECO BARRERA DANIELA  ",
   "Estamento": "Estudiante",
   "Correo": "daniela.pacheco@fuac.edu.co",
   "codigo": "PIO-1360-WGZ-9640"
  },
  {
   "identificacion": 1016067596,
   "Nombres": "PAIPILLA CASTRO JORGE LEONARDO ",
   "Estamento": "Estudiante",
   "Correo": "jorge.paipilla@fuac.edu.co",
   "codigo": "WYR-1361-ABA-9639"
  },
  {
   "identificacion": 1033756784,
   "Nombres": "PALACIO FLORIAN PAULA ELIZABETH ",
   "Estamento": "Estudiante",
   "Correo": "paula.palacio@fuac.edu.co",
   "codigo": "YUI-1362-RDJ-9638"
  },
  {
   "identificacion": 17168556,
   "Nombres": "PALACIOS CASAS JOSE MAXIMINO ",
   "Estamento": "Estudiante",
   "Correo": "jpalacios.casas@fuac.edu.co",
   "codigo": "PIO-1363-WGZ-9637"
  },
  {
   "identificacion": 1000591221,
   "Nombres": "PALACIOS GOMEZ DIEGO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "palacios.diego@fuac.edu.co",
   "codigo": "WYR-1364-ABA-9636"
  },
  {
   "identificacion": 1016105880,
   "Nombres": "PARDO ALDANA ALISON DAYANA ",
   "Estamento": "Estudiante",
   "Correo": "alison.pardo@fuac.edu.co",
   "codigo": "YUI-1365-RDJ-9635"
  },
  {
   "identificacion": 1073327823,
   "Nombres": "PERALTA FRANCO KATERINE  ",
   "Estamento": "Estudiante",
   "Correo": "katerine.peralta@fuac.edu.co",
   "codigo": "PIO-1366-WGZ-9634"
  },
  {
   "identificacion": 1032412351,
   "Nombres": "PESCADOR BARROTE DAVID SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "david.pescador@fuac.edu.co",
   "codigo": "WYR-1367-ABA-9633"
  },
  {
   "identificacion": 1000381823,
   "Nombres": "PEÑA PINZÓN PAULA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "paula.pena@fuac.edu.co",
   "codigo": "YUI-1368-RDJ-9632"
  },
  {
   "identificacion": 1019065825,
   "Nombres": "PIÑEROS SANTA CARLOS ARMANDO ",
   "Estamento": "Estudiante",
   "Correo": "pineros.carlos@fuac.edu.co",
   "codigo": "PIO-1369-WGZ-9631"
  },
  {
   "identificacion": 1233506925,
   "Nombres": "QUESADA MURILLO NICOLAS ANDREY ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.quesada@fuac.edu.co",
   "codigo": "WYR-1370-ABA-9630"
  },
  {
   "identificacion": 1000576878,
   "Nombres": "QUINTANA ARCINIEGAS ZUE VALERIA ",
   "Estamento": "Estudiante",
   "Correo": "zue.quintana@fuac.edu.co",
   "codigo": "YUI-1371-RDJ-9629"
  },
  {
   "identificacion": 1031140123,
   "Nombres": "QUINTERO SIERRA YESSICA ALEXANDRA ",
   "Estamento": "Estudiante",
   "Correo": "yessica.quintero@fuac.edu.co",
   "codigo": "PIO-1372-WGZ-9628"
  },
  {
   "identificacion": 1032490372,
   "Nombres": "RAMIREZ MAHECHA ANGIE PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "aramirez.mahecha@fuac.edu.co",
   "codigo": "WYR-1373-ABA-9627"
  },
  {
   "identificacion": 1073169758,
   "Nombres": "RAMOS ESPINOSA HARBEY ALEXIS ",
   "Estamento": "Estudiante",
   "Correo": "harbey.ramos@fuac.edu.co",
   "codigo": "YUI-1374-RDJ-9626"
  },
  {
   "identificacion": 1000223847,
   "Nombres": "RIAÑO CORREA NATALIA  ",
   "Estamento": "Estudiante",
   "Correo": "natalia.riano@fuac.edu.co",
   "codigo": "PIO-1375-WGZ-9625"
  },
  {
   "identificacion": 1012381377,
   "Nombres": "RINCON GUZMAN HECTOR GUSTAVO ",
   "Estamento": "Estudiante",
   "Correo": "hector.rincon@fuac.edu.co",
   "codigo": "WYR-1376-ABA-9624"
  },
  {
   "identificacion": 79522899,
   "Nombres": "RIOS ESCAMILLA EDILBERTO  ",
   "Estamento": "Estudiante",
   "Correo": "edilberto.rios@fuac.edu.co",
   "codigo": "YUI-1377-RDJ-9623"
  },
  {
   "identificacion": 1026274543,
   "Nombres": "ROA SALINAS RAUL SANTIAGO ",
   "Estamento": "Estudiante",
   "Correo": "raul.roa@fuac.edu.co",
   "codigo": "PIO-1378-WGZ-9622"
  },
  {
   "identificacion": 1073502090,
   "Nombres": "RODRIGUEZ JIMENEZ DEICY YAMILE ",
   "Estamento": "Estudiante",
   "Correo": "deicy.rodriguez@fuac.edu.co",
   "codigo": "WYR-1379-ABA-9621"
  },
  {
   "identificacion": 80820754,
   "Nombres": "RODRIGUEZ MORALES JUAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "rodriguez.juan@fuac.edu.co",
   "codigo": "YUI-1380-RDJ-9620"
  },
  {
   "identificacion": 1000857870,
   "Nombres": "RODRIGUEZ VILLALBA JIMMY ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "jimmy.rodriguez@fuac.edu.co",
   "codigo": "PIO-1381-WGZ-9619"
  },
  {
   "identificacion": 1001349542,
   "Nombres": "ROJAS LOPEZ DAVID SANTIAGO ",
   "Estamento": "Estudiante",
   "Correo": "drojas.lopez@fuac.edu.co",
   "codigo": "WYR-1382-ABA-9618"
  },
  {
   "identificacion": 80083823,
   "Nombres": "ROJAS NAVARRO EDWIN  ",
   "Estamento": "Estudiante",
   "Correo": "erojas.navarro@fuac.edu.co",
   "codigo": "YUI-1383-RDJ-9617"
  },
  {
   "identificacion": 1069078901,
   "Nombres": "ROLDAN LEON CRISTIAN DANILO ",
   "Estamento": "Estudiante",
   "Correo": "roldan.cristian@fuac.edu.co",
   "codigo": "PIO-1384-WGZ-9616"
  },
  {
   "identificacion": 65759789,
   "Nombres": "RUBIO MOLINA MARLI ROCIO ",
   "Estamento": "Estudiante",
   "Correo": "marli.rubio@fuac.edu.co",
   "codigo": "WYR-1385-ABA-9615"
  },
  {
   "identificacion": 1001044052,
   "Nombres": "RUEDA PAEZ ISABELA  ",
   "Estamento": "Estudiante",
   "Correo": "isabela.rueda@fuac.edu.co",
   "codigo": "YUI-1386-RDJ-9614"
  },
  {
   "identificacion": 52897894,
   "Nombres": "RUIZ  YURY MILENA ",
   "Estamento": "Estudiante",
   "Correo": "yury.ruiz@fuac.edu.co",
   "codigo": "PIO-1387-WGZ-9613"
  },
  {
   "identificacion": 1073711810,
   "Nombres": "RUIZ GARZON CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "cruiz.garzon@fuac.edu.co",
   "codigo": "WYR-1388-ABA-9612"
  },
  {
   "identificacion": 1012439647,
   "Nombres": "SALAMANCA VELASCO JEYDY LORENA ",
   "Estamento": "Estudiante",
   "Correo": "jeydy.salamanca@fuac.edu.co",
   "codigo": "YUI-1389-RDJ-9611"
  },
  {
   "identificacion": 1000620398,
   "Nombres": "SALAMANCA ZARATE KAREN DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "salamanca.karen@fuac.edu.co",
   "codigo": "PIO-1390-WGZ-9610"
  },
  {
   "identificacion": 1014308154,
   "Nombres": "SALGADO RODRIGUEZ JONATHAN JULIAN ",
   "Estamento": "Estudiante",
   "Correo": "jonathan.salgado@fuac.edu.co",
   "codigo": "WYR-1391-ABA-9609"
  },
  {
   "identificacion": 1030697031,
   "Nombres": "SANCHEZ AVELLANEDA YARLEY STIVEN ",
   "Estamento": "Estudiante",
   "Correo": "yarley.sanchez@fuac.edu.co",
   "codigo": "YUI-1392-RDJ-9608"
  },
  {
   "identificacion": 1003752558,
   "Nombres": "SANCHEZ MOYANO LINA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "lsanchez.moyano@fuac.edu.co",
   "codigo": "PIO-1393-WGZ-9607"
  },
  {
   "identificacion": 1000062597,
   "Nombres": "SANCHEZ ORTIZ DIEGO ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "dsanchez.ortiz@fuac.edu.co",
   "codigo": "WYR-1394-ABA-9606"
  },
  {
   "identificacion": 1022407848,
   "Nombres": "SANJUANEZ VIQUE JHENY KATHERINE ",
   "Estamento": "Estudiante",
   "Correo": "jheny.sanjuanez@fuac.edu.co",
   "codigo": "YUI-1395-RDJ-9605"
  },
  {
   "identificacion": 80190388,
   "Nombres": "SARMIENTO ROJAS CHRISTIAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "christian.sarmiento@fuac.edu.co",
   "codigo": "PIO-1396-WGZ-9604"
  },
  {
   "identificacion": 1002878771,
   "Nombres": "SERNA ARANGO LEYDI JOHANA ",
   "Estamento": "Estudiante",
   "Correo": "leydi.serna@fuac.edu.co",
   "codigo": "WYR-1397-ABA-9603"
  },
  {
   "identificacion": 1070604696,
   "Nombres": "SIERRA HERNANDEZ MARCELA PATRICIA ",
   "Estamento": "Estudiante",
   "Correo": "sierra.marcela@fuac.edu.co",
   "codigo": "YUI-1398-RDJ-9602"
  },
  {
   "identificacion": 1015479518,
   "Nombres": "SOLANO LOPEZ DIANA GABRIELA ",
   "Estamento": "Estudiante",
   "Correo": "solano.diana@fuac.edu.co",
   "codigo": "PIO-1399-WGZ-9601"
  },
  {
   "identificacion": 19367532,
   "Nombres": "TINJACA TOVAR GERMAN AURELIO ",
   "Estamento": "Estudiante",
   "Correo": "german.tinjaca@fuac.edu.co",
   "codigo": "WYR-1400-ABA-9600"
  },
  {
   "identificacion": 1032497401,
   "Nombres": "TORRES DIAZ ANDRES SANTIAGO ",
   "Estamento": "Estudiante",
   "Correo": "atorres.diaz@fuac.edu.co",
   "codigo": "YUI-1401-RDJ-9599"
  },
  {
   "identificacion": 1015456633,
   "Nombres": "TORRES DIAZ CLAUDIA XIMENA ",
   "Estamento": "Estudiante",
   "Correo": "torres.claudia@fuac.edu.co",
   "codigo": "PIO-1402-WGZ-9598"
  },
  {
   "identificacion": 1025460802,
   "Nombres": "TORRES DIAZ LAURA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "lalejandra.torres@fuac.edu.co",
   "codigo": "WYR-1403-ABA-9597"
  },
  {
   "identificacion": 1033818998,
   "Nombres": "TORRES FERNANDEZ SUSSAN MITCHELL ",
   "Estamento": "Estudiante",
   "Correo": "sussan.torres@fuac.edu.co",
   "codigo": "YUI-1404-RDJ-9596"
  },
  {
   "identificacion": 11445180,
   "Nombres": "TORRES HERNANDEZ HENRY ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "henry.torres@fuac.edu.co",
   "codigo": "PIO-1405-WGZ-9595"
  },
  {
   "identificacion": 1110235033,
   "Nombres": "URREGO MAYOR YUDI JIMENA ",
   "Estamento": "Estudiante",
   "Correo": "yudi.urrego@fuac.edu.co",
   "codigo": "WYR-1406-ABA-9594"
  },
  {
   "identificacion": 1007497287,
   "Nombres": "USAQUEN FLOREZ DUVAN ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "duvan.usaquen@fuac.edu.co",
   "codigo": "YUI-1407-RDJ-9593"
  },
  {
   "identificacion": 1000269109,
   "Nombres": "VALENCIA HERNÁNDEZ ANGIE LIZETH ",
   "Estamento": "Estudiante",
   "Correo": "avalencia.hernandez@fuac.edu.co",
   "codigo": "PIO-1408-WGZ-9592"
  },
  {
   "identificacion": 1075875960,
   "Nombres": "VANEGAS CAMARGO CINDY LORENA ",
   "Estamento": "Estudiante",
   "Correo": "cindy.vanegas@fuac.edu.co",
   "codigo": "WYR-1409-ABA-9591"
  },
  {
   "identificacion": 1012325903,
   "Nombres": "VARELA HERNANDEZ NIKOL STEPHANIE ",
   "Estamento": "Estudiante",
   "Correo": "nikol.varela@fuac.edu.co",
   "codigo": "YUI-1410-RDJ-9590"
  },
  {
   "identificacion": 1024567673,
   "Nombres": "VASQUEZ CASTRILLO JHONANDERSON  ",
   "Estamento": "Estudiante",
   "Correo": "jhonanderson.vasquez@fuac.edu.co",
   "codigo": "PIO-1411-WGZ-9589"
  },
  {
   "identificacion": 1013664600,
   "Nombres": "VEGA RODRIGUEZ MANUEL ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "manuel.vega@fuac.edu.co",
   "codigo": "WYR-1412-ABA-9588"
  },
  {
   "identificacion": 1016109627,
   "Nombres": "VELANDIA GONZALEZ SANTIAGO  ",
   "Estamento": "Estudiante",
   "Correo": "santiago.velandia@fuac.edu.co",
   "codigo": "YUI-1413-RDJ-9587"
  },
  {
   "identificacion": 1022971177,
   "Nombres": "VELASQUEZ BENITEZ EDISON STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "edison.velasquez@fuac.edu.co",
   "codigo": "PIO-1414-WGZ-9586"
  },
  {
   "identificacion": 1022423629,
   "Nombres": "VELOZA CASTRO KEVIN DANILO ",
   "Estamento": "Estudiante",
   "Correo": "kevin.veloza@fuac.edu.co",
   "codigo": "WYR-1415-ABA-9585"
  },
  {
   "identificacion": 1073239378,
   "Nombres": "VERA RODRIGUEZ JENNY MARICELA ",
   "Estamento": "Estudiante",
   "Correo": "vera.jenny@fuac.edu.co",
   "codigo": "YUI-1416-RDJ-9584"
  },
  {
   "identificacion": 1001346883,
   "Nombres": "VERGARA QUINTERO CAMILA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "camila.vergara@fuac.edu.co",
   "codigo": "PIO-1417-WGZ-9583"
  },
  {
   "identificacion": 79634748,
   "Nombres": "VILLA ROZO LUIS FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "luis.villa@fuac.edu.co",
   "codigo": "WYR-1418-ABA-9582"
  },
  {
   "identificacion": 1014301475,
   "Nombres": "VILLAMIL VARGAS SAMUEL FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "samuel.villamil@fuac.edu.co",
   "codigo": "YUI-1419-RDJ-9581"
  },
  {
   "identificacion": 1022352112,
   "Nombres": "VILLARRAGA PERDOMO ANGELA VANESSA ",
   "Estamento": "Estudiante",
   "Correo": "angela.villarraga@fuac.edu.co",
   "codigo": "PIO-1420-WGZ-9580"
  },
  {
   "identificacion": 1192804116,
   "Nombres": "VILLEGAS ESPEJO JUAN JOSE ",
   "Estamento": "Estudiante",
   "Correo": "juan.villegas@fuac.edu.co",
   "codigo": "WYR-1421-ABA-9579"
  },
  {
   "identificacion": 53041097,
   "Nombres": "VIVAS VARGAS PAOLA ALEXANDRA ",
   "Estamento": "Estudiante",
   "Correo": "paola.vivas@fuac.edu.co",
   "codigo": "YUI-1422-RDJ-9578"
  },
  {
   "identificacion": 1023373074,
   "Nombres": "WALTERO CAMACHO KAREN JULIETH ",
   "Estamento": "Estudiante",
   "Correo": "karen.waltero@fuac.edu.co",
   "codigo": "PIO-1423-WGZ-9577"
  },
  {
   "identificacion": 52360470,
   "Nombres": "ZAMUDIO VARGAS FLOR NIDIA ",
   "Estamento": "Estudiante",
   "Correo": "flor.zamudio@fuac.edu.co",
   "codigo": "WYR-1424-ABA-9576"
  },
  {
   "identificacion": 1030590005,
   "Nombres": "ZAPATA PEREZ DAVID MANUEL ",
   "Estamento": "Estudiante",
   "Correo": "david.zapata@fuac.edu.co",
   "codigo": "YUI-1425-RDJ-9575"
  },
  {
   "identificacion": 79467044,
   "Nombres": "ZULUAGA QUIROGA JOSE GERMAN ",
   "Estamento": "Estudiante",
   "Correo": "jose.zuluaga@fuac.edu.co",
   "codigo": "PIO-1426-WGZ-9574"
  },
  {
   "identificacion": 1022415742,
   "Nombres": "AGUDELO MURCIA FREDY ESTEBAN BLADIMIR ",
   "Estamento": "Estudiante",
   "Correo": "agudelo.fredy@fuac.edu.co",
   "codigo": "WYR-1427-ABA-9573"
  },
  {
   "identificacion": 1048847004,
   "Nombres": "ALFONSO  RUTH LEIDY ",
   "Estamento": "Estudiante",
   "Correo": "ruth.alfonso@fuac.edu.co",
   "codigo": "YUI-1428-RDJ-9572"
  },
  {
   "identificacion": 1026306423,
   "Nombres": "CALDAS GARCIA MANUELA VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "manuela.caldas@fuac.edu.co",
   "codigo": "PIO-1429-WGZ-9571"
  },
  {
   "identificacion": 1015454520,
   "Nombres": "CASTILLO GONZALEZ YESSICA LORENA ",
   "Estamento": "Estudiante",
   "Correo": "yessica.castillo@fuac.edu.co",
   "codigo": "WYR-1430-ABA-9570"
  },
  {
   "identificacion": 1010228048,
   "Nombres": "CUELLAR TABACO LUIS CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "luis.cuellar@fuac.edu.co",
   "codigo": "YUI-1431-RDJ-9569"
  },
  {
   "identificacion": 1033795996,
   "Nombres": "LEAL CETINA SEBASTIAN  ",
   "Estamento": "Estudiante",
   "Correo": "leal.sebastian@fuac.edu.co",
   "codigo": "PIO-1432-WGZ-9568"
  },
  {
   "identificacion": 80769079,
   "Nombres": "LOPEZ OLAYA CESAR MAURICIO ",
   "Estamento": "Estudiante",
   "Correo": "cesar.lopez@fuac.edu.co",
   "codigo": "WYR-1433-ABA-9567"
  },
  {
   "identificacion": 1032503686,
   "Nombres": "MARTINEZ OSORIO ESNEYDER  ",
   "Estamento": "Estudiante",
   "Correo": "esneyder.martinez@fuac.edu.co",
   "codigo": "YUI-1434-RDJ-9566"
  },
  {
   "identificacion": 1018493185,
   "Nombres": "MELO  PAULA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "melo.paula@fuac.edu.co",
   "codigo": "PIO-1435-WGZ-9565"
  },
  {
   "identificacion": 1006887063,
   "Nombres": "PAREDES VERGEL YALEL MAURICIO ",
   "Estamento": "Estudiante",
   "Correo": "yalel.paredes@fuac.edu.co",
   "codigo": "WYR-1436-ABA-9564"
  },
  {
   "identificacion": 1011091367,
   "Nombres": "PATIÑO RODRÍGUEZ JESÚS ANDRÉS ",
   "Estamento": "Estudiante",
   "Correo": "jesusp.rodriguez@fuac.edu.co",
   "codigo": "YUI-1437-RDJ-9563"
  },
  {
   "identificacion": 1193107650,
   "Nombres": "PERALTA TRIGOS RONALD DAVID ",
   "Estamento": "Estudiante",
   "Correo": "ronald.peralta@fuac.edu.co",
   "codigo": "PIO-1438-WGZ-9562"
  },
  {
   "identificacion": 1030579120,
   "Nombres": "PEÑA PINEDA LAURA VIVIANA ",
   "Estamento": "Estudiante",
   "Correo": "lpena.pineda@fuac.edu.co",
   "codigo": "WYR-1439-ABA-9561"
  },
  {
   "identificacion": 1015470992,
   "Nombres": "PINILLA MEDINA LAURA DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "laura.pinilla@fuac.edu.co",
   "codigo": "YUI-1440-RDJ-9560"
  },
  {
   "identificacion": 1018412558,
   "Nombres": "PINZON GONZALEZ DIEGO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "dpinzon.gonzalez@fuac.edu.co",
   "codigo": "PIO-1441-WGZ-9559"
  },
  {
   "identificacion": 1014303973,
   "Nombres": "REVELO DUITAMA LICETH DAYANNA ",
   "Estamento": "Estudiante",
   "Correo": "liceth.revelo@fuac.edu.co",
   "codigo": "WYR-1442-ABA-9558"
  },
  {
   "identificacion": 1001279426,
   "Nombres": "ROBAYO ALDANA HARI GOPAL ",
   "Estamento": "Estudiante",
   "Correo": "hari.robayo@fuac.edu.co",
   "codigo": "YUI-1443-RDJ-9557"
  },
  {
   "identificacion": 1001174271,
   "Nombres": "SANCHEZ AVILA ERICK GIOVANY ",
   "Estamento": "Estudiante",
   "Correo": "erick.sanchez@fuac.edu.co",
   "codigo": "PIO-1444-WGZ-9556"
  },
  {
   "identificacion": 1034657934,
   "Nombres": "SANCHEZ FONTECHA PAULA CAMILA ",
   "Estamento": "Estudiante",
   "Correo": "paulac.sanchez@fuac.edu.co",
   "codigo": "WYR-1445-ABA-9555"
  },
  {
   "identificacion": 1013688852,
   "Nombres": "SICACHÁ ASCANIO ANDRÉS FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "andres.sicacha@fuac.edu.co",
   "codigo": "YUI-1446-RDJ-9554"
  },
  {
   "identificacion": 1014289066,
   "Nombres": "SOLER PAEZ NILSON ARLEY ",
   "Estamento": "Estudiante",
   "Correo": "arley.soler@fuac.edu.co",
   "codigo": "PIO-1447-WGZ-9553"
  },
  {
   "identificacion": 1010234475,
   "Nombres": "AHUMADA DUARTE YARDEL SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "yardel.ahumada@fuac.edu.co",
   "codigo": "WYR-1448-ABA-9552"
  },
  {
   "identificacion": 1030558484,
   "Nombres": "BARRETO SOSA ALEXANDER  ",
   "Estamento": "Estudiante",
   "Correo": "alexander.barreto@fuac.edu.co",
   "codigo": "YUI-1449-RDJ-9551"
  },
  {
   "identificacion": 1018504938,
   "Nombres": "CAMACHO RENGIFO JUAN PABLO ",
   "Estamento": "Estudiante",
   "Correo": "juan.camacho@fuac.edu.co",
   "codigo": "PIO-1450-WGZ-9550"
  },
  {
   "identificacion": 1010213730,
   "Nombres": "CARDENAL MORALES LILIANA PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "liliana.cardenal@fuac.edu.co",
   "codigo": "WYR-1451-ABA-9549"
  },
  {
   "identificacion": 1024555974,
   "Nombres": "CARDENAS LOAIZA LINA JIMENA ",
   "Estamento": "Estudiante",
   "Correo": "cardenas.lina@fuac.edu.co",
   "codigo": "YUI-1452-RDJ-9548"
  },
  {
   "identificacion": 1024471222,
   "Nombres": "CELY ACOSTA MIGUEL ANGEL ",
   "Estamento": "Estudiante",
   "Correo": "miguel.cely@fuac.edu.co",
   "codigo": "PIO-1453-WGZ-9547"
  },
  {
   "identificacion": 79465140,
   "Nombres": "CHAVES CASTIBLANCO EDUARDO ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "eduardo.chaves@fuac.edu.co",
   "codigo": "WYR-1454-ABA-9546"
  },
  {
   "identificacion": 1056482604,
   "Nombres": "CORREDOR RUBIO JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "corredor.juan@fuac.edu.co",
   "codigo": "YUI-1455-RDJ-9545"
  },
  {
   "identificacion": 1022434789,
   "Nombres": "DELGADILLO SARMIENTO DAVID ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "david.delgadillo@fuac.edu.co",
   "codigo": "PIO-1456-WGZ-9544"
  },
  {
   "identificacion": 1073511881,
   "Nombres": "DIAZ GARCIA LINA YOJANA ",
   "Estamento": "Estudiante",
   "Correo": "lina.diaz@fuac.edu.co",
   "codigo": "WYR-1457-ABA-9543"
  },
  {
   "identificacion": 1022386458,
   "Nombres": "DURAN FERNANDEZ JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "juan.duran@fuac.edu.co",
   "codigo": "YUI-1458-RDJ-9542"
  },
  {
   "identificacion": 1010119953,
   "Nombres": "GALVAN TORRES LAURA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "laura.galvan@fuac.edu.co",
   "codigo": "PIO-1459-WGZ-9541"
  },
  {
   "identificacion": 1016051786,
   "Nombres": "GARCIA YEPES DANA LISETH ",
   "Estamento": "Estudiante",
   "Correo": "dana.garcia@fuac.edu.co",
   "codigo": "WYR-1460-ABA-9540"
  },
  {
   "identificacion": 1020735549,
   "Nombres": "GOMEZ POLANIA DIEGO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "dgomez.polania@fuac.edu.co",
   "codigo": "YUI-1461-RDJ-9539"
  },
  {
   "identificacion": 1013687319,
   "Nombres": "GOMEZ ROJAS VICTOR SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "gomez.victor@fuac.edu.co",
   "codigo": "PIO-1462-WGZ-9538"
  },
  {
   "identificacion": 1023943198,
   "Nombres": "GONZALEZ YEPES ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "agonzalez.yepes@fuac.edu.co",
   "codigo": "WYR-1463-ABA-9537"
  },
  {
   "identificacion": 1000971089,
   "Nombres": "GUTIERREZ CASTRO JUAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "jgutierrez.castro@fuac.edu.co",
   "codigo": "YUI-1464-RDJ-9536"
  },
  {
   "identificacion": 1013613731,
   "Nombres": "HERRERA CONTRERAS LEONARDO  ",
   "Estamento": "Estudiante",
   "Correo": "leonardo.herrera@fuac.edu.co",
   "codigo": "PIO-1465-WGZ-9535"
  },
  {
   "identificacion": 1152697428,
   "Nombres": "LEMOS SANTOS LEIDY  ",
   "Estamento": "Estudiante",
   "Correo": "leidy.lemos@fuac.edu.co",
   "codigo": "WYR-1466-ABA-9534"
  },
  {
   "identificacion": 1010246868,
   "Nombres": "LOPEZ GARCIA SEBASTIAN FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "slopez.garcia@fuac.edu.co",
   "codigo": "YUI-1467-RDJ-9533"
  },
  {
   "identificacion": 1023908819,
   "Nombres": "MARTINEZ BERNAL WILMER YESID ",
   "Estamento": "Estudiante",
   "Correo": "wilmer.martinez@fuac.edu.co",
   "codigo": "PIO-1468-WGZ-9532"
  },
  {
   "identificacion": 1070959368,
   "Nombres": "MARTINEZ OSORIO YERAR ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "yerar.martinez@fuac.edu.co",
   "codigo": "WYR-1469-ABA-9531"
  },
  {
   "identificacion": 1110512110,
   "Nombres": "MONROY AFANADOR NESTOR FABIAN ",
   "Estamento": "Estudiante",
   "Correo": "nestor.monroy@fuac.edu.co",
   "codigo": "YUI-1470-RDJ-9530"
  },
  {
   "identificacion": 1012351551,
   "Nombres": "MORA RUBIANO PIERRE ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "pierre.mora@fuac.edu.co",
   "codigo": "PIO-1471-WGZ-9529"
  },
  {
   "identificacion": 1000729481,
   "Nombres": "NARANJO GARZON BRIGITH DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "brigith.naranjo@fuac.edu.co",
   "codigo": "WYR-1472-ABA-9528"
  },
  {
   "identificacion": 1026287346,
   "Nombres": "PINILLA FUELANTALA JAESON STEVENS ",
   "Estamento": "Estudiante",
   "Correo": "jaeson.pinilla@fuac.edu.co",
   "codigo": "YUI-1473-RDJ-9527"
  },
  {
   "identificacion": 1026303332,
   "Nombres": "RAMIREZ PINTO CRISTIAN FABIAN ",
   "Estamento": "Estudiante",
   "Correo": "cramirez.pinto@fuac.edu.co",
   "codigo": "PIO-1474-WGZ-9526"
  },
  {
   "identificacion": 1023005200,
   "Nombres": "RINCON RAMIREZ JHON FAVI ",
   "Estamento": "Estudiante",
   "Correo": "jrincon.ramirez@fuac.edu.co",
   "codigo": "WYR-1475-ABA-9525"
  },
  {
   "identificacion": 1010238179,
   "Nombres": "RODRIGUEZ FLOREZ LAURA CECILIA ",
   "Estamento": "Estudiante",
   "Correo": "laura.rodriguez@fuac.edu.co",
   "codigo": "YUI-1476-RDJ-9524"
  },
  {
   "identificacion": 1001331811,
   "Nombres": "RODRIGUEZ GUARNIZO JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "jrodriguez.guarnizo@fuac.edu.co",
   "codigo": "PIO-1477-WGZ-9523"
  },
  {
   "identificacion": 1026586339,
   "Nombres": "RODRIGUEZ LOPEZ JONATHAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "crodriguez.jonathan@fuac.edu.co",
   "codigo": "WYR-1478-ABA-9522"
  },
  {
   "identificacion": 1016081348,
   "Nombres": "ROJAS BUITRAGO YINNA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "yinna.rojas@fuac.edu.co",
   "codigo": "YUI-1479-RDJ-9521"
  },
  {
   "identificacion": 1019125999,
   "Nombres": "ROJAS ROJAS LEIDY TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "lrojas.rojas@fuac.edu.co",
   "codigo": "PIO-1480-WGZ-9520"
  },
  {
   "identificacion": 53045655,
   "Nombres": "SANABRIA COSTO LUISA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "luisa.sanabria@fuac.edu.co",
   "codigo": "WYR-1481-ABA-9519"
  },
  {
   "identificacion": 1026303088,
   "Nombres": "VEGA LOPEZ BRAYAN STIVEN ",
   "Estamento": "Estudiante",
   "Correo": "brayan.vega@fuac.edu.co",
   "codigo": "YUI-1482-RDJ-9518"
  },
  {
   "identificacion": 79912641,
   "Nombres": "VIASUS VALERO HENRY  ",
   "Estamento": "Estudiante",
   "Correo": "henry.viasus@fuac.edu.co",
   "codigo": "PIO-1483-WGZ-9517"
  },
  {
   "identificacion": 1032433729,
   "Nombres": "ZAMORA DURAN JENNY PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "jenny.zamora@fuac.edu.co",
   "codigo": "WYR-1484-ABA-9516"
  },
  {
   "identificacion": 1023014617,
   "Nombres": "ACUÑA SABOGAL MICHAEL STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "acuna.michael@fuac.edu.co",
   "codigo": "YUI-1485-RDJ-9515"
  },
  {
   "identificacion": 1010228596,
   "Nombres": "AHUMADA DUARTE ANTHONY JORDAN ",
   "Estamento": "Estudiante",
   "Correo": "anthony.ahumada@fuac.edu.co",
   "codigo": "PIO-1486-WGZ-9514"
  },
  {
   "identificacion": 1022367485,
   "Nombres": "ALVINO SANABRIA RUBEN DARIO ",
   "Estamento": "Estudiante",
   "Correo": "ruben.alvino@fuac.edu.co",
   "codigo": "WYR-1487-ABA-9513"
  },
  {
   "identificacion": 1043129185,
   "Nombres": "ARROYO RAMOS MIGUEL ANGEL ",
   "Estamento": "Estudiante",
   "Correo": "miguel.arroyo@fuac.edu.co",
   "codigo": "YUI-1488-RDJ-9512"
  },
  {
   "identificacion": 1026293270,
   "Nombres": "CABALLERO NAVARRO JESUS GUILLERMO ",
   "Estamento": "Estudiante",
   "Correo": "jesus.caballero@fuac.edu.co",
   "codigo": "PIO-1489-WGZ-9511"
  },
  {
   "identificacion": 1000596546,
   "Nombres": "DUARTE CHAVES SERGIO ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "Duarte.sergio@fuac.edu.co",
   "codigo": "WYR-1490-ABA-9510"
  },
  {
   "identificacion": 1026293667,
   "Nombres": "ENRIQUEZ LONDOÑO JOSE DAVID ",
   "Estamento": "Estudiante",
   "Correo": "jose.enriquez@fuac.edu.co",
   "codigo": "YUI-1491-RDJ-9509"
  },
  {
   "identificacion": 1012336968,
   "Nombres": "GALINDO MARTINEZ JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "juanse.galindo@fuac.edu.co",
   "codigo": "PIO-1492-WGZ-9508"
  },
  {
   "identificacion": 1010046127,
   "Nombres": "GOMEZ FONSECA NUBIA PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "gomez.nubia@fuac.edu.co",
   "codigo": "WYR-1493-ABA-9507"
  },
  {
   "identificacion": 1026591019,
   "Nombres": "HERRERA PITA FRANKY DAVID ",
   "Estamento": "Estudiante",
   "Correo": "franky.herrera@fuac.edu.co",
   "codigo": "YUI-1494-RDJ-9506"
  },
  {
   "identificacion": 80730802,
   "Nombres": "JIMENEZ MORENO JEFFERSSON ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "jeffersson.jimenez@fuac.edu.co",
   "codigo": "PIO-1495-WGZ-9505"
  },
  {
   "identificacion": 1022437285,
   "Nombres": "MARTINEZ CLEVES PAULA ANDREA  ",
   "Estamento": "Estudiante",
   "Correo": "pmartinez.cleves@fuac.edu.co",
   "codigo": "WYR-1496-ABA-9504"
  },
  {
   "identificacion": 1010214099,
   "Nombres": "MOLINA RENGIFO NILSON ALDAIR ",
   "Estamento": "Estudiante",
   "Correo": "nilson.molina@fuac.edu.co",
   "codigo": "YUI-1497-RDJ-9503"
  },
  {
   "identificacion": 1012406119,
   "Nombres": "MONTENEGRO CABRERA CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "montenegro.camilo@fuac.edu.co",
   "codigo": "PIO-1498-WGZ-9502"
  },
  {
   "identificacion": 1033812599,
   "Nombres": "ORTIZ LAITON KEVIN ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "ortiz.kevin@fuac.edu.co",
   "codigo": "WYR-1499-ABA-9501"
  },
  {
   "identificacion": 1014273066,
   "Nombres": "PORRAS PEREZ MICHAEL STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "michael.porras@fuac.edu.co",
   "codigo": "YUI-1500-RDJ-9500"
  },
  {
   "identificacion": 1016075886,
   "Nombres": "PUENTES MURILLO JHON FREDY ",
   "Estamento": "Estudiante",
   "Correo": "jhon.puentes@fuac.edu.co",
   "codigo": "PIO-1501-WGZ-9499"
  },
  {
   "identificacion": 80912899,
   "Nombres": "RAMIREZ SARMIENTO CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "camilo.ramirez@fuac.edu.co",
   "codigo": "WYR-1502-ABA-9498"
  },
  {
   "identificacion": 1030666020,
   "Nombres": "REYES CRUZ JUAN DANIEL ",
   "Estamento": "Estudiante",
   "Correo": "jreyes.cruz@fuac.edu.co",
   "codigo": "YUI-1503-RDJ-9497"
  },
  {
   "identificacion": 1022356835,
   "Nombres": "RIPPE CANTOR LUIS ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "luis.rippe@fuac.edu.co",
   "codigo": "PIO-1504-WGZ-9496"
  },
  {
   "identificacion": 1026282968,
   "Nombres": "SOTELO RODRIGUEZ JOHN JAIRO ",
   "Estamento": "Estudiante",
   "Correo": "john.sotelo@fuac.edu.co",
   "codigo": "WYR-1505-ABA-9495"
  },
  {
   "identificacion": 1073513670,
   "Nombres": "TABORDA GOMEZ WILSON ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "wilson.taborda@fuac.edu.co",
   "codigo": "YUI-1506-RDJ-9494"
  },
  {
   "identificacion": 1030612726,
   "Nombres": "TELLEZ GAONA BRAYAN SMITH ",
   "Estamento": "Estudiante",
   "Correo": "brayan.tellez@fuac.edu.co",
   "codigo": "PIO-1507-WGZ-9493"
  },
  {
   "identificacion": 1010111131,
   "Nombres": "TOVAR ROJAS MARLON ESNEIDER ",
   "Estamento": "Estudiante",
   "Correo": "sneider.tovar@fuac.edu.co",
   "codigo": "WYR-1508-ABA-9492"
  },
  {
   "identificacion": 1014291667,
   "Nombres": "VARGAS CASTILLO BRAYAN ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "brayan.vargas@fuac.edu.co",
   "codigo": "YUI-1509-RDJ-9491"
  },
  {
   "identificacion": 1033809627,
   "Nombres": "DAZA AYALA WILLIAM RICARDO ",
   "Estamento": "Estudiante",
   "Correo": "wdaza.ayala@fuac.edu.co",
   "codigo": "PIO-1510-WGZ-9490"
  },
  {
   "identificacion": 1023366550,
   "Nombres": "DELGADO GUZMAN KAREN SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "kdelgado.guzman@fuac.edu.co",
   "codigo": "WYR-1511-ABA-9489"
  },
  {
   "identificacion": 1022376348,
   "Nombres": "AGUIRRE MALAGON  YULI ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "yuli.aguirremalagon@fuac.edu.co",
   "codigo": "YUI-1512-RDJ-9488"
  },
  {
   "identificacion": 1193220085,
   "Nombres": "ALVAREZ LANCHEROS ANDREA KATERINE ",
   "Estamento": "Estudiante",
   "Correo": "alvarez.andrea@fuac.edu.co",
   "codigo": "PIO-1513-WGZ-9487"
  },
  {
   "identificacion": 1030560730,
   "Nombres": "BECERRA CUCAITA YEHIMY PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "yehimy.becerra@fuac.edu.co",
   "codigo": "WYR-1514-ABA-9486"
  },
  {
   "identificacion": 1030701735,
   "Nombres": "CAITA RODRIGUEZ ANGELA DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "angela.caita@fuac.edu.co",
   "codigo": "YUI-1515-RDJ-9485"
  },
  {
   "identificacion": 1010238577,
   "Nombres": "CALDERON GIRALDO NURY MILEIDY ",
   "Estamento": "Estudiante",
   "Correo": "nury.calderon@fuac.edu.co",
   "codigo": "PIO-1516-WGZ-9484"
  },
  {
   "identificacion": 63551284,
   "Nombres": "DELGADO TOLOZA ISMENY LUPERLE ",
   "Estamento": "Estudiante",
   "Correo": "ismeny.delgado@fuac.edu.co",
   "codigo": "WYR-1517-ABA-9483"
  },
  {
   "identificacion": 1010245310,
   "Nombres": "ESGUERRA GOMEZ LEIDY STEFANY ",
   "Estamento": "Estudiante",
   "Correo": "leidy.esguerra@fuac.edu.co",
   "codigo": "YUI-1518-RDJ-9482"
  },
  {
   "identificacion": 1022447424,
   "Nombres": "FONTECHA MORALES ANGIE TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "angie.fontecha@fuac.edu.co",
   "codigo": "PIO-1519-WGZ-9481"
  },
  {
   "identificacion": 1024599514,
   "Nombres": "GONZALEZ MONTERO KAREN VIVIANA ",
   "Estamento": "Estudiante",
   "Correo": "kgonzalez.montero@fuac.edu.co",
   "codigo": "WYR-1520-ABA-9480"
  },
  {
   "identificacion": 1033801398,
   "Nombres": "MENDEZ NIÑO MARIA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "mendez.maria@fuac.edu.co",
   "codigo": "YUI-1521-RDJ-9479"
  },
  {
   "identificacion": 1001187510,
   "Nombres": "ORDOÑEZ CAMACHO PAULA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "paula.ordonez@fuac.edu.co",
   "codigo": "PIO-1522-WGZ-9478"
  },
  {
   "identificacion": 1023974128,
   "Nombres": "ORJUELA MALAGON AUDREY  ",
   "Estamento": "Estudiante",
   "Correo": "audrey.orjuela@fuac.edu.co",
   "codigo": "WYR-1523-ABA-9477"
  },
  {
   "identificacion": 1000065661,
   "Nombres": "OSPINA PARRA LAURA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "laura.ospina@fuac.edu.co",
   "codigo": "YUI-1524-RDJ-9476"
  },
  {
   "identificacion": 1010242308,
   "Nombres": "PAEZ FAGUA DIEGO ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "dpaez.fagua@fuac.edu.co",
   "codigo": "PIO-1525-WGZ-9475"
  },
  {
   "identificacion": 1032369281,
   "Nombres": "PLAZA ARDILA DIEGO RAMON ",
   "Estamento": "Estudiante",
   "Correo": "diego.plaza@fuac.edu.co",
   "codigo": "WYR-1526-ABA-9474"
  },
  {
   "identificacion": 1000458591,
   "Nombres": "PULIDO QUITIAN DANILO  ",
   "Estamento": "Estudiante",
   "Correo": "danilo.pulido@fuac.edu.co",
   "codigo": "YUI-1527-RDJ-9473"
  },
  {
   "identificacion": 1013670287,
   "Nombres": "RIOS CARDONA ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "andres.rios@fuac.edu.co",
   "codigo": "PIO-1528-WGZ-9472"
  },
  {
   "identificacion": 1000717990,
   "Nombres": "ROA QUEVEDO JULIAN STEWEN ",
   "Estamento": "Estudiante",
   "Correo": "roa.julian@fuac.edu.co",
   "codigo": "WYR-1529-ABA-9471"
  },
  {
   "identificacion": 1014257889,
   "Nombres": "RODRIGUEZ CAMPUSANO JORGE ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "jrodriguez.campusano@fuac.edu.co",
   "codigo": "YUI-1530-RDJ-9470"
  },
  {
   "identificacion": 1023022774,
   "Nombres": "ROZO GOMEZ DANNA JOHANA ",
   "Estamento": "Estudiante",
   "Correo": "danna.rozo@fuac.edu.co",
   "codigo": "PIO-1531-WGZ-9469"
  },
  {
   "identificacion": 1022431231,
   "Nombres": "SANABRIA FLOREZ KATHERINE  ",
   "Estamento": "Estudiante",
   "Correo": "sanabria.katherine@fuac.edu.co",
   "codigo": "WYR-1532-ABA-9468"
  },
  {
   "identificacion": 1000364110,
   "Nombres": "SANTOS MANRIQUE LAURA VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "laura.santos@fuac.edu.co",
   "codigo": "YUI-1533-RDJ-9467"
  },
  {
   "identificacion": 1013690027,
   "Nombres": "TERRIOS TENJO PAULA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "paula.terrios@fuac.edu.co",
   "codigo": "PIO-1534-WGZ-9466"
  },
  {
   "identificacion": 1007273747,
   "Nombres": "TOVAR GARZON CLAUDIA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "tovar.claudia@fuac.edu.co",
   "codigo": "WYR-1535-ABA-9465"
  },
  {
   "identificacion": 1016106038,
   "Nombres": "VARGAS BUITRAGO ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "avargas.buitrago@fuac.edu.co",
   "codigo": "YUI-1536-RDJ-9464"
  },
  {
   "identificacion": 1022405308,
   "Nombres": "VELANDIA GERMAN NIKO GIOVANNY ",
   "Estamento": "Estudiante",
   "Correo": "niko.velandia@fuac.edu.co",
   "codigo": "PIO-1537-WGZ-9463"
  },
  {
   "identificacion": 80234070,
   "Nombres": "YAIMA WALTEROS DAVID FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "david.yaima@fuac.edu.co",
   "codigo": "WYR-1538-ABA-9462"
  },
  {
   "identificacion": 1013691478,
   "Nombres": "ZAPATA ESCAMILLA NICOLAS ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.zapata@fuac.edu.co",
   "codigo": "YUI-1539-RDJ-9461"
  },
  {
   "identificacion": 1033706697,
   "Nombres": "ALONSO ALVARADO DIANA ELIZABETH ",
   "Estamento": "Estudiante",
   "Correo": "alonso.diana@fuac.edu.co",
   "codigo": "PIO-1540-WGZ-9460"
  },
  {
   "identificacion": 1003496469,
   "Nombres": "ARIAS ARIAS YERIS  ",
   "Estamento": "Estudiante",
   "Correo": "yeris.arias@fuac.edu.co",
   "codigo": "WYR-1541-ABA-9459"
  },
  {
   "identificacion": 1022398565,
   "Nombres": "BALLEN MEJIA DERLY GIOVANNA ",
   "Estamento": "Estudiante",
   "Correo": "derly.ballen@fuac.edu.co",
   "codigo": "YUI-1542-RDJ-9458"
  },
  {
   "identificacion": 1013643339,
   "Nombres": "CASTELLANOS PINILLA JESUS DAVID ",
   "Estamento": "Estudiante",
   "Correo": "jesus.castellanos@fuac.edu.co",
   "codigo": "PIO-1543-WGZ-9457"
  },
  {
   "identificacion": 1022975519,
   "Nombres": "CASTILLO MENDEZ MARTHA CRISTINA ",
   "Estamento": "Estudiante",
   "Correo": "mcastillo.mendez@fuac.edu.co",
   "codigo": "WYR-1544-ABA-9456"
  },
  {
   "identificacion": 1022393685,
   "Nombres": "CUBILLOS LEON JOSE FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "jcubillos.leon@fuac.edu.co",
   "codigo": "YUI-1545-RDJ-9455"
  },
  {
   "identificacion": 1023944814,
   "Nombres": "CUELLAR ALVARADO JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "cuellar.juan@fuac.edu.co",
   "codigo": "PIO-1546-WGZ-9454"
  },
  {
   "identificacion": 1018481730,
   "Nombres": "ESCOBAR MELO DIANA KATHERINE ",
   "Estamento": "Estudiante",
   "Correo": "diana.escobar@fuac.edu.co",
   "codigo": "WYR-1547-ABA-9453"
  },
  {
   "identificacion": 1023964027,
   "Nombres": "GARRIDO MEDINA EGNITH ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "egnith.garrido@fuac.edu.co",
   "codigo": "YUI-1548-RDJ-9452"
  },
  {
   "identificacion": 1024600532,
   "Nombres": "GOMEZ LEON LIZETH DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "lgomez.leon@fuac.edu.co",
   "codigo": "PIO-1549-WGZ-9451"
  },
  {
   "identificacion": 1016095681,
   "Nombres": "GONZALEZ QUINTERO DANIELA  ",
   "Estamento": "Estudiante",
   "Correo": "dgonzalez.quintero@fuac.edu.co",
   "codigo": "WYR-1550-ABA-9450"
  },
  {
   "identificacion": 1022365723,
   "Nombres": "HILARION HERNANDEZ BLANCA ELIDA ",
   "Estamento": "Estudiante",
   "Correo": "blanca.hilarion@fuac.edu.co",
   "codigo": "YUI-1551-RDJ-9449"
  },
  {
   "identificacion": 1030610944,
   "Nombres": "MARIN SANTOFIMIO JOHN HENRY ",
   "Estamento": "Estudiante",
   "Correo": "marin.john@fuac.edu.co",
   "codigo": "PIO-1552-WGZ-9448"
  },
  {
   "identificacion": 1030698714,
   "Nombres": "MATEUS SANABRIA KAREN DAYANA ",
   "Estamento": "Estudiante",
   "Correo": "karen.mateus@fuac.edu.co",
   "codigo": "WYR-1553-ABA-9447"
  },
  {
   "identificacion": 1007142827,
   "Nombres": "PARRA TOVAR DIANA MARIA ",
   "Estamento": "Estudiante",
   "Correo": "dparra.tovar@fuac.edu.co",
   "codigo": "YUI-1554-RDJ-9446"
  },
  {
   "identificacion": 52703318,
   "Nombres": "PINZON BUITRAGO ANA ROSA ",
   "Estamento": "Estudiante",
   "Correo": "apinzon.buitrago@fuac.edu.co",
   "codigo": "PIO-1555-WGZ-9445"
  },
  {
   "identificacion": 1000971899,
   "Nombres": "POLO THERAN KAREN VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "karen.polo@fuac.edu.co",
   "codigo": "WYR-1556-ABA-9444"
  },
  {
   "identificacion": 1126448722,
   "Nombres": "QUETA CRIOLLO DORA NORELIA ",
   "Estamento": "Estudiante",
   "Correo": "dora.queta@fuac.edu.co",
   "codigo": "YUI-1557-RDJ-9443"
  },
  {
   "identificacion": 1010232750,
   "Nombres": "RESTREPO PAVA ANGELA VIVIANA ",
   "Estamento": "Estudiante",
   "Correo": "restrepo.angela@fuac.edu.co",
   "codigo": "PIO-1558-WGZ-9442"
  },
  {
   "identificacion": 1022351608,
   "Nombres": "RIVEROS PORRAS LEIDY DAYAHAN ",
   "Estamento": "Estudiante",
   "Correo": "leidy.riveros@fuac.edu.co",
   "codigo": "WYR-1559-ABA-9441"
  },
  {
   "identificacion": 1000032457,
   "Nombres": "ROMERO MONDRAGON JULIANA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "juliana.romero@fuac.edu.co",
   "codigo": "YUI-1560-RDJ-9440"
  },
  {
   "identificacion": 1001287600,
   "Nombres": "SARMIENTO VILLALOBOS DEISY NATALIA ",
   "Estamento": "Estudiante",
   "Correo": "deisy.sarmiento@fuac.edu.co",
   "codigo": "PIO-1561-WGZ-9439"
  },
  {
   "identificacion": 1010232358,
   "Nombres": "VEGA CASTAÑEDA DANNA JULIETH ",
   "Estamento": "Estudiante",
   "Correo": "danna.vega@fuac.edu.co",
   "codigo": "WYR-1562-ABA-9438"
  },
  {
   "identificacion": 1013637438,
   "Nombres": "ACUÑA TELLEZ FREDDY  ",
   "Estamento": "Estudiante",
   "Correo": "freddy.acuna@fuac.edu.co",
   "codigo": "YUI-1563-RDJ-9437"
  },
  {
   "identificacion": 1073704028,
   "Nombres": "ALARCON NARANJO ERIKA LISBETH ",
   "Estamento": "Estudiante",
   "Correo": "erika.alarcon@fuac.edu.co",
   "codigo": "PIO-1564-WGZ-9436"
  },
  {
   "identificacion": 1004678730,
   "Nombres": "ALFONSO AVILA GELIMAR  ",
   "Estamento": "Estudiante",
   "Correo": "gelimar.alfonso@fuac.edu.co",
   "codigo": "WYR-1565-ABA-9435"
  },
  {
   "identificacion": 1065849836,
   "Nombres": "ALGARRA GUTIERREZ ANDERSON DAVID ",
   "Estamento": "Estudiante",
   "Correo": "algarraanderson@gmail.com",
   "codigo": "YUI-1566-RDJ-9434"
  },
  {
   "identificacion": 1193581767,
   "Nombres": "ALTAMIRANDA MAESTRE ILIAN MARIETH ",
   "Estamento": "Estudiante",
   "Correo": "ilian.altamiranda@fuac.edu.co",
   "codigo": "PIO-1567-WGZ-9433"
  },
  {
   "identificacion": 1065562873,
   "Nombres": "ANDRADE OSPINO YULIANA  ",
   "Estamento": "Estudiante",
   "Correo": "yuliana.andrade@fuac.edu.co",
   "codigo": "WYR-1568-ABA-9432"
  },
  {
   "identificacion": 1065645120,
   "Nombres": "ANGARITA QUINTERO JESUS ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "angarita.jesus@fuac.edu.co",
   "codigo": "YUI-1569-RDJ-9431"
  },
  {
   "identificacion": 1065849832,
   "Nombres": "AREVALO MELENDEZ ANDREA CAMILA ",
   "Estamento": "Estudiante",
   "Correo": "andreac.arevalo@fuac.edu.co",
   "codigo": "PIO-1570-WGZ-9430"
  },
  {
   "identificacion": 1000123020,
   "Nombres": "ASPRILLA BALLESTEROS ANGIE DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "angie.asprilla@fuac.edu.co",
   "codigo": "WYR-1571-ABA-9429"
  },
  {
   "identificacion": 1007574164,
   "Nombres": "AVENDAÑO PEREZ LAURIS YULIANIS ",
   "Estamento": "Estudiante",
   "Correo": "lauris.avendano@fuac.edu.co",
   "codigo": "YUI-1572-RDJ-9428"
  },
  {
   "identificacion": 49786670,
   "Nombres": "BANDERA TABORDA BIVIANA PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "bivibandera@gmail.com",
   "codigo": "PIO-1573-WGZ-9427"
  },
  {
   "identificacion": 1003086983,
   "Nombres": "BASTIDAS YEPEZ YURIS JOSE ",
   "Estamento": "Estudiante",
   "Correo": "yuris.bastidas@fuac.edu.co",
   "codigo": "WYR-1574-ABA-9426"
  },
  {
   "identificacion": 1067730700,
   "Nombres": "BENAVIDES RAMIREZ LISETH  ",
   "Estamento": "Estudiante",
   "Correo": "lisethbenavidesra@uparsistem.edu.co",
   "codigo": "YUI-1575-RDJ-9425"
  },
  {
   "identificacion": 1028481243,
   "Nombres": "BERNAL BOTERO KAREN  ",
   "Estamento": "Estudiante",
   "Correo": "karenb.botero@fuac.edu.co",
   "codigo": "PIO-1576-WGZ-9424"
  },
  {
   "identificacion": 1065608758,
   "Nombres": "BUENDIA PEREZ SILVIA YINETH ",
   "Estamento": "Estudiante",
   "Correo": "silvia.buendia@fuac.edu.co",
   "codigo": "WYR-1577-ABA-9423"
  },
  {
   "identificacion": 52530497,
   "Nombres": "BUITRAGO  DIANA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "dbuitrago.milena@fuac.edu.co",
   "codigo": "YUI-1578-RDJ-9422"
  },
  {
   "identificacion": 1004306257,
   "Nombres": "CABALLERO MARTINEZ JUAN EDGARDO ",
   "Estamento": "Estudiante",
   "Correo": "juane.caballero@fuac.edu.co",
   "codigo": "PIO-1579-WGZ-9421"
  },
  {
   "identificacion": 1066864105,
   "Nombres": "CABALLERO ZAPATA JESUS DAVID ",
   "Estamento": "Estudiante",
   "Correo": "jesusd.caballero@fuac.edu.co",
   "codigo": "WYR-1580-ABA-9420"
  },
  {
   "identificacion": 1121338252,
   "Nombres": "CAMPO VERDECIA ANA KARINA ",
   "Estamento": "Estudiante",
   "Correo": "anak.campo@fuac.edu.co",
   "codigo": "YUI-1581-RDJ-9419"
  },
  {
   "identificacion": 1014738820,
   "Nombres": "CANO GÓMEZ VALENTINA  ",
   "Estamento": "Estudiante",
   "Correo": "cano.valentina@fuac.edu.co",
   "codigo": "PIO-1582-WGZ-9418"
  },
  {
   "identificacion": 1192752315,
   "Nombres": "CANTILLO VILLAZON MELISSA L. ",
   "Estamento": "Estudiante",
   "Correo": "melissa.cantillo@fuac.edu.co",
   "codigo": "WYR-1583-ABA-9417"
  },
  {
   "identificacion": 1003115021,
   "Nombres": "CARO MEJIA YACELIS  ",
   "Estamento": "Estudiante",
   "Correo": "yacelis.caro@fuac.edu.co",
   "codigo": "YUI-1584-RDJ-9416"
  },
  {
   "identificacion": 1098686235,
   "Nombres": "CASTELLANOS ORDOÑEZ MINELVA LIZETH ",
   "Estamento": "Estudiante",
   "Correo": "minelva.castellanos@fuac.edu.co",
   "codigo": "PIO-1585-WGZ-9415"
  },
  {
   "identificacion": 79974163,
   "Nombres": "CASTILLO GARZON ALEXANDER  ",
   "Estamento": "Estudiante",
   "Correo": "acastillo.garzon@fuac.edu.co",
   "codigo": "WYR-1586-ABA-9414"
  },
  {
   "identificacion": 1004354166,
   "Nombres": "CERVANTES PALLARES ELIYIRETH  ",
   "Estamento": "Estudiante",
   "Correo": "eliyireth.cervantes@fuac.edu.co",
   "codigo": "YUI-1587-RDJ-9413"
  },
  {
   "identificacion": 1003232006,
   "Nombres": "CESPEDES CASTAÑEDA MARIANGEL PAULINA ",
   "Estamento": "Estudiante",
   "Correo": "mariangel.cespedes@fuac.edu.co",
   "codigo": "PIO-1588-WGZ-9412"
  },
  {
   "identificacion": 1003428169,
   "Nombres": "CONTRERAS PIÑEREZ SANDY  ",
   "Estamento": "Estudiante",
   "Correo": "sandy.contreras@fuac.edu.co",
   "codigo": "WYR-1589-ABA-9411"
  },
  {
   "identificacion": 1065841685,
   "Nombres": "CORONADO RODRIGUEZ YESICA ESTHER ",
   "Estamento": "Estudiante",
   "Correo": "yesica.coronado@fuac.edu.co",
   "codigo": "YUI-1590-RDJ-9410"
  },
  {
   "identificacion": 1007496251,
   "Nombres": "COTES VARGAS CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "camiloa.cotes@fuac.edu.co",
   "codigo": "PIO-1591-WGZ-9409"
  },
  {
   "identificacion": 1023955123,
   "Nombres": "CUELLAR ALVARADO NICOLAS DUVAN ",
   "Estamento": "Estudiante",
   "Correo": "cuellar.nicolas@fuac.edu.co",
   "codigo": "WYR-1592-ABA-9408"
  },
  {
   "identificacion": 1065837001,
   "Nombres": "DELGADO LARA VICTOR DAVID ",
   "Estamento": "Estudiante",
   "Correo": "victord.delgado@fuac.edu.co",
   "codigo": "YUI-1593-RDJ-9407"
  },
  {
   "identificacion": 1193283433,
   "Nombres": "DIAZ BARRETO NEILA SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "neila.diaz@fuac.edu.co",
   "codigo": "PIO-1594-WGZ-9406"
  },
  {
   "identificacion": 1065589396,
   "Nombres": "DIAZ BATISTA YULIANA PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "yuliana.diaz@fuac.edu.co",
   "codigo": "WYR-1595-ABA-9405"
  },
  {
   "identificacion": 1235339536,
   "Nombres": "DIAZ CADENA KATLYN YULIETH ",
   "Estamento": "Estudiante",
   "Correo": "katlyn.diaz@fuac.edu.co",
   "codigo": "YUI-1596-RDJ-9404"
  },
  {
   "identificacion": 1065837715,
   "Nombres": "DIAZ MONTERO YISBELY ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "yisbely.diaz@fuac.edu.co",
   "codigo": "PIO-1597-WGZ-9403"
  },
  {
   "identificacion": 1066864553,
   "Nombres": "DUARTE ORTIZ NOREIDIS HIBETH ",
   "Estamento": "Estudiante",
   "Correo": "noreidis.duarte@fuac.edu.co",
   "codigo": "WYR-1598-ABA-9402"
  },
  {
   "identificacion": 1013668252,
   "Nombres": "ESTRADA TOLOSA ALICE ADRIANA ",
   "Estamento": "Estudiante",
   "Correo": "alice.estrada@fuac.edu.co",
   "codigo": "YUI-1599-RDJ-9401"
  },
  {
   "identificacion": 1022429971,
   "Nombres": "FERNÁNDEZ DURANGO ANGIE KATHERINE ",
   "Estamento": "Estudiante",
   "Correo": "angie.fernandez@fuac.edu.co",
   "codigo": "PIO-1600-WGZ-9400"
  },
  {
   "identificacion": 18901320,
   "Nombres": "FIGUEREDO RANGEL JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "juand.figueredo@fuac.edu.co",
   "codigo": "WYR-1601-ABA-9399"
  },
  {
   "identificacion": 1003242445,
   "Nombres": "FLORIAN RODRIGUEZ MAIRETH  ",
   "Estamento": "Estudiante",
   "Correo": "maireth.florian@fuac.edu.co",
   "codigo": "YUI-1602-RDJ-9398"
  },
  {
   "identificacion": 1003236160,
   "Nombres": "GAMEZ VARGAS NAYELIS KARINA ",
   "Estamento": "Estudiante",
   "Correo": "nayelis.gamez@fuac.edu.co",
   "codigo": "PIO-1603-WGZ-9397"
  },
  {
   "identificacion": 1065807559,
   "Nombres": "GOMEZ LEAL MARIA ZULEIMA ",
   "Estamento": "Estudiante",
   "Correo": "zuleima.gomez@fuac.edu.co",
   "codigo": "WYR-1604-ABA-9396"
  },
  {
   "identificacion": 1065825499,
   "Nombres": "GONZALEZ MONTAÑO MARIA DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "mariad.gonzalez@fuac.edu.co",
   "codigo": "YUI-1605-RDJ-9395"
  },
  {
   "identificacion": 1193562555,
   "Nombres": "GONZALEZ REALES GICETH MAIRETH ",
   "Estamento": "Estudiante",
   "Correo": "giceth.gonzalez@fuac.edu.co",
   "codigo": "PIO-1606-WGZ-9394"
  },
  {
   "identificacion": 1216969815,
   "Nombres": "HERNANDEZ ORTIZ LINA PATRICIA ",
   "Estamento": "Estudiante",
   "Correo": "linap.hernandez@fuac.edu.co",
   "codigo": "WYR-1607-ABA-9393"
  },
  {
   "identificacion": 1065654850,
   "Nombres": "LLANES RIVERA LILLETH JOHANNA ",
   "Estamento": "Estudiante",
   "Correo": "lilleth.llanes@fuac.edu.co",
   "codigo": "YUI-1608-RDJ-9392"
  },
  {
   "identificacion": 75105532,
   "Nombres": "LOPEZ MARIN WILMAR  ",
   "Estamento": "Estudiante",
   "Correo": "wilmarl.marin@fuac.edu.co",
   "codigo": "PIO-1609-WGZ-9391"
  },
  {
   "identificacion": 1026584754,
   "Nombres": "LOPEZ PALTA ASTRID CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "lopez.astrid@fuac.edu.co",
   "codigo": "WYR-1610-ABA-9390"
  },
  {
   "identificacion": 1003313523,
   "Nombres": "LOZANO ESTRADA YURAINIS YANETH ",
   "Estamento": "Estudiante",
   "Correo": "yurainis.lozano@fuac.edu.co",
   "codigo": "YUI-1611-RDJ-9389"
  },
  {
   "identificacion": 1065825172,
   "Nombres": "MAESTRE MURGAS ANUAR ALFONSO ",
   "Estamento": "Estudiante",
   "Correo": "anuar.maestre@fuac.edu.co",
   "codigo": "PIO-1612-WGZ-9388"
  },
  {
   "identificacion": 1003316349,
   "Nombres": "MANJARREZ AREVALO DAYERIS MARIA ",
   "Estamento": "Estudiante",
   "Correo": "dayeris.manjarrez@fuac.edu.co",
   "codigo": "WYR-1613-ABA-9387"
  },
  {
   "identificacion": 1065813113,
   "Nombres": "MARTINEZ MACHADO LUZ ESTHER ",
   "Estamento": "Estudiante",
   "Correo": "luze.martinez@fuac.edu.co",
   "codigo": "YUI-1614-RDJ-9386"
  },
  {
   "identificacion": 1007246564,
   "Nombres": "MATUTE ARIZA MARIA JOSE ",
   "Estamento": "Estudiante",
   "Correo": "mariaj.matute@fuac.edu.co",
   "codigo": "PIO-1615-WGZ-9385"
  },
  {
   "identificacion": 1065842319,
   "Nombres": "MEDINA JIMENEZ MAYRA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "medina.mayra@fuac.edu.co",
   "codigo": "WYR-1616-ABA-9384"
  },
  {
   "identificacion": 80913039,
   "Nombres": "MEJIA APARICIO ORLANDO  ",
   "Estamento": "Estudiante",
   "Correo": "orlando.mejia@fuac.edu.co",
   "codigo": "YUI-1617-RDJ-9383"
  },
  {
   "identificacion": 1122814459,
   "Nombres": "MEJIA PINTO DIANELA  ",
   "Estamento": "Estudiante",
   "Correo": "dianela.mejia@fuac.edu.co",
   "codigo": "PIO-1618-WGZ-9382"
  },
  {
   "identificacion": 1067727823,
   "Nombres": "MEJIA SANCHEZ ANGIE PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "apaola.mejia@fuac.edu.co",
   "codigo": "WYR-1619-ABA-9381"
  },
  {
   "identificacion": 1003082486,
   "Nombres": "MEJIA SARATE LENYS  ",
   "Estamento": "Estudiante",
   "Correo": "lenys.mejia@fuac.edu.co",
   "codigo": "YUI-1620-RDJ-9380"
  },
  {
   "identificacion": 1065656205,
   "Nombres": "MOLINARES GOMEZ LAURA PATRICIA ",
   "Estamento": "Estudiante",
   "Correo": "laurap.molinares@fuac.edu.co",
   "codigo": "PIO-1621-WGZ-9379"
  },
  {
   "identificacion": 1193109829,
   "Nombres": "MONTAÑEZ BRITO MIGUEL ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "miguel.montanez@fuac.edu.co",
   "codigo": "WYR-1622-ABA-9378"
  },
  {
   "identificacion": 1065811210,
   "Nombres": "MONTAÑO GUEVARA GISELL VANESSA ",
   "Estamento": "Estudiante",
   "Correo": "gisell.montano@fuac.edu.co",
   "codigo": "YUI-1623-RDJ-9377"
  },
  {
   "identificacion": 1058845319,
   "Nombres": "NIETO GIRALDO JULIETH JOHANA ",
   "Estamento": "Estudiante",
   "Correo": "julieth.nieto@fuac.edu.co",
   "codigo": "PIO-1624-WGZ-9376"
  },
  {
   "identificacion": 1019100764,
   "Nombres": "NIÑO LOPEZ PAULA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "paula.nino@fuac.edu.co",
   "codigo": "WYR-1625-ABA-9375"
  },
  {
   "identificacion": 1065830941,
   "Nombres": "NUÑEZ GUERRA BETTY LILIANA ",
   "Estamento": "Estudiante",
   "Correo": "betty.nunez@fuac.edu.co",
   "codigo": "YUI-1626-RDJ-9374"
  },
  {
   "identificacion": 1065593495,
   "Nombres": "OCHOA RIVERO LAURA VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "laurav.ochoa@fuac.edu.co",
   "codigo": "PIO-1627-WGZ-9373"
  },
  {
   "identificacion": 1065823163,
   "Nombres": "ORTIZ VASQUEZ DIANYS MARGARITA ",
   "Estamento": "Estudiante",
   "Correo": "dianys.ortiz@fuac.edu.co",
   "codigo": "WYR-1628-ABA-9372"
  },
  {
   "identificacion": 1067595462,
   "Nombres": "OSPINO LOPEZ JUAN JOSE ",
   "Estamento": "Estudiante",
   "Correo": "juanjo.ospino@fuac.edu.co",
   "codigo": "YUI-1629-RDJ-9371"
  },
  {
   "identificacion": 1065822398,
   "Nombres": "OÑATE RODRIGUEZ NARYIS YESENIA ",
   "Estamento": "Estudiante",
   "Correo": "naryis.onate@fuac.edu.co",
   "codigo": "PIO-1630-WGZ-9370"
  },
  {
   "identificacion": 1065827241,
   "Nombres": "PACHECO ASCANIO JOSE GABRIEL ",
   "Estamento": "Estudiante",
   "Correo": "joseg.pacheco@fuac.edu.co",
   "codigo": "WYR-1631-ABA-9369"
  },
  {
   "identificacion": 1064839612,
   "Nombres": "PACHECO AVENDAÑO EDINSON FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "pachecoedinson@hotmail.com",
   "codigo": "YUI-1632-RDJ-9368"
  },
  {
   "identificacion": 1065652685,
   "Nombres": "PALMA BASTIDAS ENEIDA SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "eneida.palma@fuac.edu.co",
   "codigo": "PIO-1633-WGZ-9367"
  },
  {
   "identificacion": 1064725994,
   "Nombres": "PALOMINO ROMERO CRHISTOPHER  ",
   "Estamento": "Estudiante",
   "Correo": "crhistopher.palomino@fuac.edu.co",
   "codigo": "WYR-1634-ABA-9366"
  },
  {
   "identificacion": 1003234847,
   "Nombres": "PANA PEREZ LAURA VANESSA ",
   "Estamento": "Estudiante",
   "Correo": "laura.pana@fuac.edu.co",
   "codigo": "YUI-1635-RDJ-9365"
  },
  {
   "identificacion": 1065852219,
   "Nombres": "PAREJO CANTILLO GINA MARCELA ",
   "Estamento": "Estudiante",
   "Correo": "gina.parejo@fuac.edu.co",
   "codigo": "PIO-1636-WGZ-9364"
  },
  {
   "identificacion": 1019118029,
   "Nombres": "PARRA MARTINEZ MARBYS MELISSA ",
   "Estamento": "Estudiante",
   "Correo": "marbys.parra@fuac.edu.co",
   "codigo": "WYR-1637-ABA-9363"
  },
  {
   "identificacion": 1065810694,
   "Nombres": "PASO NAVARRO JOSETH ANGEL ",
   "Estamento": "Estudiante",
   "Correo": "joseth.paso@fuac.edu.co",
   "codigo": "YUI-1638-RDJ-9362"
  },
  {
   "identificacion": 1003236164,
   "Nombres": "PATIÑO VECINO DIANA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "dianac.patino@fuac.edu.co",
   "codigo": "PIO-1639-WGZ-9361"
  },
  {
   "identificacion": 1070964784,
   "Nombres": "PERDOMO LIZCANO YENNY PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "yenny.perdomo@fuac.edu.co",
   "codigo": "WYR-1640-ABA-9360"
  },
  {
   "identificacion": 1103117105,
   "Nombres": "PEÑA BERCINGER JUAN CARLOS FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "jpena.bercinger@fuac.edu.co",
   "codigo": "YUI-1641-RDJ-9359"
  },
  {
   "identificacion": 1065651997,
   "Nombres": "PEÑA SEQUEDA BREINER MICHELL ",
   "Estamento": "Estudiante",
   "Correo": "breinerp.sequeda@fuac.edu.co",
   "codigo": "PIO-1642-WGZ-9358"
  },
  {
   "identificacion": 1003378789,
   "Nombres": "PEÑALOZA JIMENEZ JOSE CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "josec.penaloza@fuac.edu.co",
   "codigo": "WYR-1643-ABA-9357"
  },
  {
   "identificacion": 1022425323,
   "Nombres": "PEÑUELA MARTINEZ DAVID  ",
   "Estamento": "Estudiante",
   "Correo": "david.penuela@fuac.edu.co",
   "codigo": "YUI-1644-RDJ-9356"
  },
  {
   "identificacion": 1015393590,
   "Nombres": "PINTOR PUENTES YESID ALFONSO ",
   "Estamento": "Estudiante",
   "Correo": "yesid.pintor@fuac.edu.co",
   "codigo": "PIO-1645-WGZ-9355"
  },
  {
   "identificacion": 1065850309,
   "Nombres": "PRADO BARRAZA CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "camiloprado0@hotmail.com",
   "codigo": "WYR-1646-ABA-9354"
  },
  {
   "identificacion": 1007151446,
   "Nombres": "QUINGUANAS BANGUERO CONNI VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "connyquiguanas@gmail.com",
   "codigo": "YUI-1647-RDJ-9353"
  },
  {
   "identificacion": 49761054,
   "Nombres": "QUINTERO FELIZZOLA ROSALIA SILENA ",
   "Estamento": "Estudiante",
   "Correo": "jorkiro@hotmail.com",
   "codigo": "PIO-1648-WGZ-9352"
  },
  {
   "identificacion": 1065578593,
   "Nombres": "QUINTERO GONZALEZ MARIA PAULA ",
   "Estamento": "Estudiante",
   "Correo": "quinterogonzalez33@gmail.com",
   "codigo": "WYR-1649-ABA-9351"
  },
  {
   "identificacion": 1065628149,
   "Nombres": "QUINTERO PRADO JULIETH PAHOLA ",
   "Estamento": "Estudiante",
   "Correo": "yuliethquintero1990@gmail.com",
   "codigo": "YUI-1650-RDJ-9350"
  },
  {
   "identificacion": 1003381617,
   "Nombres": "QUINTERO RODRIGUEZ CAROL JULIANA ",
   "Estamento": "Estudiante",
   "Correo": "carolyulianaquintero@gmail.com",
   "codigo": "PIO-1651-WGZ-9349"
  },
  {
   "identificacion": 43609556,
   "Nombres": "QUIROZ PASTRANA IRIS HELENA ",
   "Estamento": "Estudiante",
   "Correo": "ihqp76@hotmail.com",
   "codigo": "WYR-1652-ABA-9348"
  },
  {
   "identificacion": 1066866253,
   "Nombres": "RADABAN HERRERA LUISA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "rabadanluisa219@gmail.com",
   "codigo": "YUI-1653-RDJ-9347"
  },
  {
   "identificacion": 1136886119,
   "Nombres": "RAMIREZ BERNAL NICK RENE ",
   "Estamento": "Estudiante",
   "Correo": "nick.ramirez@fuac.edu.co",
   "codigo": "PIO-1654-WGZ-9346"
  },
  {
   "identificacion": 1003313327,
   "Nombres": "RAMIREZ MOJICA VICTOR ENRIQUE ",
   "Estamento": "Estudiante",
   "Correo": "victorramirezm@uparsistem.edu.co",
   "codigo": "WYR-1655-ABA-9345"
  },
  {
   "identificacion": 1016061653,
   "Nombres": "RAMIREZ VELASQUEZ GABRIEL STEVENS ",
   "Estamento": "Estudiante",
   "Correo": "gabriel.ramirez@fuac.edu.co",
   "codigo": "YUI-1656-RDJ-9344"
  },
  {
   "identificacion": 1013637964,
   "Nombres": "RINCON PIÑEROS BRAYAN GUILLERMO ",
   "Estamento": "Estudiante",
   "Correo": "brayan.rincon@fuac.edu.co",
   "codigo": "PIO-1657-WGZ-9343"
  },
  {
   "identificacion": 77173925,
   "Nombres": "RIVERA CANTILLO DARWIN JOSE ",
   "Estamento": "Estudiante",
   "Correo": "darwin0828@hotmail.com",
   "codigo": "WYR-1658-ABA-9342"
  },
  {
   "identificacion": 1000579371,
   "Nombres": "ROBERTO HERNANDEZ JUAN ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "juan.roberto@fuac.edu.co",
   "codigo": "YUI-1659-RDJ-9341"
  },
  {
   "identificacion": 1065588533,
   "Nombres": "RODRIGUEZ BERMUDEZ OLIVIA ROSA ",
   "Estamento": "Estudiante",
   "Correo": "oliviarodriguezb@uparsistem.edu.co",
   "codigo": "PIO-1660-WGZ-9340"
  },
  {
   "identificacion": 1032413680,
   "Nombres": "RODRIGUEZ CRUZ HARVEY JOHAN ",
   "Estamento": "Estudiante",
   "Correo": "harvey.rodriguez@fuac.edu.co",
   "codigo": "WYR-1661-ABA-9339"
  },
  {
   "identificacion": 1014279436,
   "Nombres": "RODRIGUEZ GARCÍA JULIETH KATHERINE ",
   "Estamento": "Estudiante",
   "Correo": "jrodriguez.garcia@fuac.edu.co",
   "codigo": "YUI-1662-RDJ-9338"
  },
  {
   "identificacion": 1073249291,
   "Nombres": "RODRIGUEZ OVALLE CRISTHIAN FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "crodriguez.ovalle@fuac.edu.co",
   "codigo": "PIO-1663-WGZ-9337"
  },
  {
   "identificacion": 1119817524,
   "Nombres": "ROJAS GOMEZ JOSE CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "jocarogo2@gmail.com",
   "codigo": "WYR-1664-ABA-9336"
  },
  {
   "identificacion": 80255237,
   "Nombres": "ROJAS ORTIZ ALEXANDER ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "alexander.rojas@fuac.edu.co",
   "codigo": "YUI-1665-RDJ-9335"
  },
  {
   "identificacion": 1031144279,
   "Nombres": "RUDAS LOPEZ ROLANDO ROBERTO ",
   "Estamento": "Estudiante",
   "Correo": "rolando.rudas@fuac.edu.co",
   "codigo": "PIO-1666-WGZ-9334"
  },
  {
   "identificacion": 1006886974,
   "Nombres": "RUIZ FLOREZ KADIA MICHEL ",
   "Estamento": "Estudiante",
   "Correo": "kadiaruiz@uparsistem.edu.co",
   "codigo": "WYR-1667-ABA-9333"
  },
  {
   "identificacion": 1192758569,
   "Nombres": "SANABRIA GUERRA GEOVANY DE DIOS ",
   "Estamento": "Estudiante",
   "Correo": "g.55sague@gmail.com",
   "codigo": "YUI-1668-RDJ-9332"
  },
  {
   "identificacion": 1067601922,
   "Nombres": "SIERRA MARQUEZ MARIA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "mariafernandasierra05@gmail.com",
   "codigo": "PIO-1669-WGZ-9331"
  },
  {
   "identificacion": 1010122337,
   "Nombres": "SOLANO VASQUEZ TANNIA MARCELA ",
   "Estamento": "Estudiante",
   "Correo": "tanniasolano@uparsistem.edu.co",
   "codigo": "WYR-1670-ABA-9330"
  },
  {
   "identificacion": 1065125918,
   "Nombres": "TORRES VILLALBA BRENDA YAIRE ",
   "Estamento": "Estudiante",
   "Correo": "brendayaire2002@gmail.com",
   "codigo": "YUI-1671-RDJ-9329"
  },
  {
   "identificacion": 1015468871,
   "Nombres": "VARGAS HERRERA JEISSON ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "jvargas.herrera@fuac.edu.co",
   "codigo": "PIO-1672-WGZ-9328"
  },
  {
   "identificacion": 1024496768,
   "Nombres": "VARGAS LACHE JENNY PAOLA ",
   "Estamento": "Estudiante",
   "Correo": "jenny.vargas@fuac.edu.co",
   "codigo": "WYR-1673-ABA-9327"
  },
  {
   "identificacion": 52479209,
   "Nombres": "VILLAMIL ACEVEDO NIDIA MARINA ",
   "Estamento": "Estudiante",
   "Correo": "nidia.villamil@fuac.edu.co",
   "codigo": "YUI-1674-RDJ-9326"
  },
  {
   "identificacion": 15174798,
   "Nombres": "ZABALETA SUAREZ RONALD  ",
   "Estamento": "Estudiante",
   "Correo": "ronaldzabaletasuarez@gmail.com",
   "codigo": "PIO-1675-WGZ-9325"
  },
  {
   "identificacion": 1022410951,
   "Nombres": "ZAMUDIO RIOS NICOLAS DAVID EDUARDO ",
   "Estamento": "Estudiante",
   "Correo": "nicolasdavid.zamudio@fuac.edu.co",
   "codigo": "WYR-1676-ABA-9324"
  },
  {
   "identificacion": 1108456305,
   "Nombres": "AGUIRRE MARTINEZ JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "juan.aguirre@fuac.edu.co",
   "codigo": "YUI-1677-RDJ-9323"
  },
  {
   "identificacion": 1012442450,
   "Nombres": "CAMARGO REYES KAREN SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "camargo.karen@fuac.edu.co",
   "codigo": "PIO-1678-WGZ-9322"
  },
  {
   "identificacion": 1012426238,
   "Nombres": "CARDOSO VIDES CARLOS JULIO ",
   "Estamento": "Estudiante",
   "Correo": "carlos.cardoso@fuac.edu.co",
   "codigo": "WYR-1679-ABA-9321"
  },
  {
   "identificacion": 1073712466,
   "Nombres": "CORTES LEIVA NICOLAS  ",
   "Estamento": "Estudiante",
   "Correo": "nicolas.cortes@fuac.edu.co",
   "codigo": "YUI-1680-RDJ-9320"
  },
  {
   "identificacion": 1010235071,
   "Nombres": "DIAZ PEREZ SEBASTIAN ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "sebastian.diaz@fuac.edu.co",
   "codigo": "PIO-1681-WGZ-9319"
  },
  {
   "identificacion": 1030668817,
   "Nombres": "OCHOA SOLORZA LAURA MARCELA ",
   "Estamento": "Estudiante",
   "Correo": "laura.ochoa@fuac.edu.co",
   "codigo": "WYR-1682-ABA-9318"
  },
  {
   "identificacion": 1023969000,
   "Nombres": "RINCON GUALTEROS LAURA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "lrincon.gualteros@fuac.edu.co",
   "codigo": "YUI-1683-RDJ-9317"
  },
  {
   "identificacion": 1049798657,
   "Nombres": "RUIZ PEREZ ALLESON MICHELLE ",
   "Estamento": "Estudiante",
   "Correo": "alleson.ruiz@fuac.edu.co",
   "codigo": "PIO-1684-WGZ-9316"
  },
  {
   "identificacion": 1001061018,
   "Nombres": "SANTOS RIOS CARLOS GABRIEL ",
   "Estamento": "Estudiante",
   "Correo": "santos.carlos@fuac.edu.co",
   "codigo": "WYR-1685-ABA-9315"
  },
  {
   "identificacion": 1032479311,
   "Nombres": "VARGAS RODRIGUEZ KAROOL DAYANNA ",
   "Estamento": "Estudiante",
   "Correo": "karool.vargas@fuac.edu.co",
   "codigo": "YUI-1686-RDJ-9314"
  },
  {
   "identificacion": 1000504934,
   "Nombres": "ALBA TINJACA JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "juand.alba@fuac.edu.co",
   "codigo": "PIO-1687-WGZ-9313"
  },
  {
   "identificacion": 1007741687,
   "Nombres": "ALFEREZ PARADO YOIMAR LEONARDO ",
   "Estamento": "Estudiante",
   "Correo": "yoimar.alferez@fuac.edu.co",
   "codigo": "WYR-1688-ABA-9312"
  },
  {
   "identificacion": 1006837005,
   "Nombres": "AMAYA ROJAS HECTOR ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "hector.amaya@fuac.edu.co",
   "codigo": "YUI-1689-RDJ-9311"
  },
  {
   "identificacion": 1049794600,
   "Nombres": "ANDRADE DIAZ DAVID ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "Davidalberto.diaz@fuac.edu.co",
   "codigo": "PIO-1690-WGZ-9310"
  },
  {
   "identificacion": 1003625033,
   "Nombres": "BELLO HERRERA JUAN CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "juanc.bello@fuac.edu.co",
   "codigo": "WYR-1691-ABA-9309"
  },
  {
   "identificacion": 1120864804,
   "Nombres": "BELTRAN OSPINA JOHN JAIRO ",
   "Estamento": "Estudiante",
   "Correo": "johnjairobeltran10@gmail.com",
   "codigo": "YUI-1692-RDJ-9308"
  },
  {
   "identificacion": 1006837373,
   "Nombres": "BELTRAN SALGAR JOHAN ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "johane.beltran@fuac.edu.co",
   "codigo": "PIO-1693-WGZ-9307"
  },
  {
   "identificacion": 1121840494,
   "Nombres": "BENITO BENITO EDGAR ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "alexander.benito@fuac.edu.co",
   "codigo": "WYR-1694-ABA-9306"
  },
  {
   "identificacion": 1023009589,
   "Nombres": "BERBESI ORTEGA ERICK DUBANN ",
   "Estamento": "Estudiante",
   "Correo": "erick.berbesi@fuac.edu.co",
   "codigo": "YUI-1695-RDJ-9305"
  },
  {
   "identificacion": 80018333,
   "Nombres": "BERNAL SEGURA JUAN JOSE ",
   "Estamento": "Estudiante",
   "Correo": "jbernal.segura@fuac.edu.co",
   "codigo": "PIO-1696-WGZ-9304"
  },
  {
   "identificacion": 1022403983,
   "Nombres": "BOCANEGRA ORTIZ ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "andres.bocanegra@fuac.edu.co",
   "codigo": "WYR-1697-ABA-9303"
  },
  {
   "identificacion": 1073520620,
   "Nombres": "CAJAMARCA HERNANDEZ CRISTHIAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "cristhian.cajamarca@fuac.edu.co",
   "codigo": "YUI-1698-RDJ-9302"
  },
  {
   "identificacion": 1032474167,
   "Nombres": "CANCHALA BEJARANO DIEGO ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "diego.canchala@fuac.edu.co",
   "codigo": "PIO-1699-WGZ-9301"
  },
  {
   "identificacion": 1033789725,
   "Nombres": "CARDOZO CATALAN BRAYAN STIV ",
   "Estamento": "Estudiante",
   "Correo": "bcardozo.catalan@fuac.edu.co",
   "codigo": "WYR-1700-ABA-9300"
  },
  {
   "identificacion": 17334330,
   "Nombres": "CASTRO MENDEZ JOSE GABRIEL ",
   "Estamento": "Estudiante",
   "Correo": "jgabriel.castro@fuac.edu.co",
   "codigo": "WYR-1701-ABA-9301"
  },
  {
   "identificacion": 1010217046,
   "Nombres": "CAVIATIVA LOPEZ PEDRO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "pedro.caviativa@fuac.edu.co",
   "codigo": "WYR-1702-ABA-9302"
  },
  {
   "identificacion": 1001328663,
   "Nombres": "CAÑON ESPINOSA JULIÁN ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "julian.canon@fuac.edu.co",
   "codigo": "WYR-1703-ABA-9303"
  },
  {
   "identificacion": 1030544506,
   "Nombres": "CHAVEZ AREVALO HEINERTH STEVE ",
   "Estamento": "Estudiante",
   "Correo": "heinerth.chavez@fuac.edu.co",
   "codigo": "WYR-1704-ABA-9304"
  },
  {
   "identificacion": 1076622095,
   "Nombres": "CORONEL CARREÑO OMAR ALEXIS ",
   "Estamento": "Estudiante",
   "Correo": "omar.coronel@fuac.edu.co",
   "codigo": "WYR-1705-ABA-9305"
  },
  {
   "identificacion": 86085180,
   "Nombres": "CORTES BELTRAN DIEGO FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "dfernando.cortes@fuac.edu.co",
   "codigo": "WYR-1706-ABA-9306"
  },
  {
   "identificacion": 1016095750,
   "Nombres": "COTRINO QUIROGA DIEGO ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "diego.cotrino@fuac.edu.co",
   "codigo": "WYR-1707-ABA-9307"
  },
  {
   "identificacion": 1118166429,
   "Nombres": "CUBIDES PEÑA JULIAN ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "julian.cubides@fuac.edu.co",
   "codigo": "WYR-1708-ABA-9308"
  },
  {
   "identificacion": 1001112078,
   "Nombres": "DELGADO CASTELLANOS GERALDINE DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "geraldine.delgado@fuac.edu.co",
   "codigo": "WYR-1709-ABA-9309"
  },
  {
   "identificacion": 1002733055,
   "Nombres": "DUEÑAS CUBIDES MICHAEL JEAN PIERRE ",
   "Estamento": "Estudiante",
   "Correo": "michael.duenas@fuac.edu.co",
   "codigo": "WYR-1710-ABA-9310"
  },
  {
   "identificacion": 1006552921,
   "Nombres": "ENCINOSA PICO CRISTIAN EDUARDO ",
   "Estamento": "Estudiante",
   "Correo": "cristian.encinosa@fuac.edu.co",
   "codigo": "WYR-1711-ABA-9311"
  },
  {
   "identificacion": 1121870190,
   "Nombres": "FALLA DIAZ FREDY JOSE ",
   "Estamento": "Estudiante",
   "Correo": "fredy.falla@fuac.edu.co",
   "codigo": "WYR-1712-ABA-9312"
  },
  {
   "identificacion": 1006719981,
   "Nombres": "FIGUEROA MADRIGAL CARLOS ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "carlos.figueroa@fuac.edu.co",
   "codigo": "WYR-1713-ABA-9313"
  },
  {
   "identificacion": 1014278156,
   "Nombres": "FONSECA ORTIZ JUAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "jfonseca.ortiz@fuac.edu.co",
   "codigo": "WYR-1714-ABA-9314"
  },
  {
   "identificacion": 1122116561,
   "Nombres": "GALEANO CHAPARRO JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "jsebastian.galeano@fuac.edu.co",
   "codigo": "WYR-1715-ABA-9315"
  },
  {
   "identificacion": 80050951,
   "Nombres": "GARCIA ARIAS EDWIN  ",
   "Estamento": "Estudiante",
   "Correo": "egarcia.arias@fuac.edu.co",
   "codigo": "WYR-1716-ABA-9316"
  },
  {
   "identificacion": 1022421462,
   "Nombres": "GARCIA CICUA JUAN ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "jgarcia.cicua@fuac.edu.co",
   "codigo": "WYR-1717-ABA-9317"
  },
  {
   "identificacion": 1110232055,
   "Nombres": "GARZON VALENCIA JEFFERSON HIPOLITO ",
   "Estamento": "Estudiante",
   "Correo": "hipolito.garzon@fuac.edu.co",
   "codigo": "WYR-1718-ABA-9318"
  },
  {
   "identificacion": 1122128910,
   "Nombres": "GONZALEZ BERMUDEZ EDWIN HAROLD ",
   "Estamento": "Estudiante",
   "Correo": "harold.bermudez@fuac.edu.co",
   "codigo": "WYR-1719-ABA-9319"
  },
  {
   "identificacion": 1033768444,
   "Nombres": "GONZALEZ SALAZAR ANDERSON  ",
   "Estamento": "Estudiante",
   "Correo": "anderson.gonzalez@fuac.edu.co",
   "codigo": "WYR-1720-ABA-9320"
  },
  {
   "identificacion": 1121819696,
   "Nombres": "GUTIERREZ DELGADO EDWARD FERNEY ",
   "Estamento": "Estudiante",
   "Correo": "edward.delgado@fuac.edu.co",
   "codigo": "WYR-1721-ABA-9321"
  },
  {
   "identificacion": 17356089,
   "Nombres": "HERNANDEZ MELO KENNER JOANNY ",
   "Estamento": "Estudiante",
   "Correo": "kenner.hernandez@fuac.edu.co",
   "codigo": "WYR-1722-ABA-9322"
  },
  {
   "identificacion": 1121880220,
   "Nombres": "HERNANDEZ PIÑEROS ADRIAN ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "ahernandez.pineros@fuac.edu.co",
   "codigo": "WYR-1723-ABA-9323"
  },
  {
   "identificacion": 86079759,
   "Nombres": "HERNANDEZ SANTAMARIA EDWIN JAVIER ",
   "Estamento": "Estudiante",
   "Correo": "javier.santamaria@fuac.edu.co",
   "codigo": "WYR-1724-ABA-9324"
  },
  {
   "identificacion": 86082507,
   "Nombres": "HERRERA VARGAS JAIDER ENRIQUE ",
   "Estamento": "Estudiante",
   "Correo": "jaider.vargas@fuac.edu.co",
   "codigo": "WYR-1725-ABA-9325"
  },
  {
   "identificacion": 1000617808,
   "Nombres": "HERRERA ZAMUDIO MIGUEL ANGEL ",
   "Estamento": "Estudiante",
   "Correo": "mangel.herrera@fuac.edu.co",
   "codigo": "WYR-1726-ABA-9326"
  },
  {
   "identificacion": 1006821166,
   "Nombres": "JARA ACOSTA JORGE IVAN ",
   "Estamento": "Estudiante",
   "Correo": "ivan.jara@fuac.edu.co",
   "codigo": "WYR-1727-ABA-9327"
  },
  {
   "identificacion": 1117509586,
   "Nombres": "LAVAO CARDENAS JOHN FREDY ",
   "Estamento": "Estudiante",
   "Correo": "fredy.lavao@fuac.edu.co",
   "codigo": "WYR-1728-ABA-9328"
  },
  {
   "identificacion": 1120874696,
   "Nombres": "LEON BERNAL YEFERSON CIPRIAN ",
   "Estamento": "Estudiante",
   "Correo": "ciprian.bernal@fuac.edu.co",
   "codigo": "WYR-1729-ABA-9329"
  },
  {
   "identificacion": 1010234382,
   "Nombres": "LOPEZ CARDENAS EDISON YESID ",
   "Estamento": "Estudiante",
   "Correo": "yesid.cardenaz@fuac.edu.co",
   "codigo": "WYR-1730-ABA-9330"
  },
  {
   "identificacion": 1014284287,
   "Nombres": "LOPEZ MORENO NELSON STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "lopez.nelson@fuac.edu.co",
   "codigo": "WYR-1731-ABA-9331"
  },
  {
   "identificacion": 1000256300,
   "Nombres": "LOSADA DURAN CARLOS ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "carlos.losada@fuac.edu.co",
   "codigo": "WYR-1732-ABA-9332"
  },
  {
   "identificacion": 1123512808,
   "Nombres": "MARTINEZ CARDENAS DIEGO ARMANDO ",
   "Estamento": "Estudiante",
   "Correo": "armando.cardenaz@fuac.edu.co",
   "codigo": "WYR-1733-ABA-9333"
  },
  {
   "identificacion": 1006874736,
   "Nombres": "MARTINEZ RAMOS CRISTIAN ESTIVEN ",
   "Estamento": "Estudiante",
   "Correo": "estiven.ramos@fuac.edu.co",
   "codigo": "WYR-1734-ABA-9334"
  },
  {
   "identificacion": 1122118193,
   "Nombres": "MENESES MORENO  LUIS ARTURO ",
   "Estamento": "Estudiante",
   "Correo": "luis.meneses@fuac.edu.co",
   "codigo": "WYR-1735-ABA-9335"
  },
  {
   "identificacion": 1007464466,
   "Nombres": "MOGOLLON PATIÑO DANIEL FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "daniel.mogollon@fuac.edu.co",
   "codigo": "WYR-1736-ABA-9336"
  },
  {
   "identificacion": 1118571744,
   "Nombres": "MOJICA PEREZ WILLIAM ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "william.mojica@fuac.edu.co",
   "codigo": "WYR-1737-ABA-9337"
  },
  {
   "identificacion": 77170175,
   "Nombres": "MONTERO DE LA HOZ JESUS ANTONIO ",
   "Estamento": "Estudiante",
   "Correo": "antonio.montero@fuac.edu.co",
   "codigo": "WYR-1738-ABA-9338"
  },
  {
   "identificacion": 1048850422,
   "Nombres": "MORALES DIAZ ROBINSON JAIR ",
   "Estamento": "Estudiante",
   "Correo": "robinson.morales@fuac.edu.co",
   "codigo": "WYR-1739-ABA-9339"
  },
  {
   "identificacion": 80755387,
   "Nombres": "NAVARRETE MOLINA HUGO ROBERTO ",
   "Estamento": "Estudiante",
   "Correo": "hugo.navarrete@fuac.edu.co",
   "codigo": "WYR-1740-ABA-9340"
  },
  {
   "identificacion": 1006863162,
   "Nombres": "NIÑO RODRIGUEZ SNEIDER ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "esneiderandres16@gmail.com",
   "codigo": "WYR-1741-ABA-9341"
  },
  {
   "identificacion": 1010118367,
   "Nombres": "NUÑEZ MATIAS CARLOS ALBERTO ",
   "Estamento": "Estudiante",
   "Correo": "carlosn.matias@fuac.edu.co",
   "codigo": "WYR-1742-ABA-9342"
  },
  {
   "identificacion": 1122649741,
   "Nombres": "PARRADO BELTRAN FEYER MARIN ",
   "Estamento": "Estudiante",
   "Correo": "feyer.parrado@fuac.edu.co",
   "codigo": "WYR-1743-ABA-9343"
  },
  {
   "identificacion": 1046396831,
   "Nombres": "PEREZ ORTEGA YOHELIS  ",
   "Estamento": "Estudiante",
   "Correo": "yohelis.perez@fuac.edu.co",
   "codigo": "WYR-1744-ABA-9344"
  },
  {
   "identificacion": 1118545683,
   "Nombres": "PEREZ PELAYO ANDRES JHOHAN ",
   "Estamento": "Estudiante",
   "Correo": "ajhohan.perez@fuac.edu.co",
   "codigo": "WYR-1745-ABA-9345"
  },
  {
   "identificacion": 1010235899,
   "Nombres": "PINEDA CONEJO CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "pineda.camilo@fuac.edu.co",
   "codigo": "WYR-1746-ABA-9346"
  },
  {
   "identificacion": 1006824398,
   "Nombres": "PINZON VANEGAS MIGUEL ANGEL ",
   "Estamento": "Estudiante",
   "Correo": "miguel.pinzon@fuac.edu.co",
   "codigo": "WYR-1747-ABA-9347"
  },
  {
   "identificacion": 1010076980,
   "Nombres": "PUENTES MURCIA LUIS FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "luisf.puentes@fuac.edu.co",
   "codigo": "WYR-1748-ABA-9348"
  },
  {
   "identificacion": 1024587727,
   "Nombres": "QUEZADA DOMINGUEZ JHON ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "jhone.quezada@fuac.edu.co",
   "codigo": "WYR-1749-ABA-9349"
  },
  {
   "identificacion": 1053351226,
   "Nombres": "REGALADO ORTIZ JOSE MANUEL ",
   "Estamento": "Estudiante",
   "Correo": "jose.regalado@fuac.edu.co",
   "codigo": "WYR-1750-ABA-9350"
  },
  {
   "identificacion": 1006823195,
   "Nombres": "RODRIGUEZ GUEVARA JOSE VICENTE ",
   "Estamento": "Estudiante",
   "Correo": "jvicente.rodriguez@fuac.edu.co",
   "codigo": "WYR-1751-ABA-9351"
  },
  {
   "identificacion": 1122141771,
   "Nombres": "RODRIGUEZ MENDOZA JOAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "joan.mendoza@fuac.edu.co",
   "codigo": "WYR-1752-ABA-9352"
  },
  {
   "identificacion": 74770116,
   "Nombres": "RODRIGUEZ ORDUZ RIGOBERTO  ",
   "Estamento": "Estudiante",
   "Correo": "rigoberto.rodriguez@fuac.edu.co",
   "codigo": "WYR-1753-ABA-9353"
  },
  {
   "identificacion": 1000121168,
   "Nombres": "RODRIGUEZ VAQUIRO JHON EMERSON ",
   "Estamento": "Estudiante",
   "Correo": "jhonr.vaquiro@fuac.edu.co",
   "codigo": "WYR-1754-ABA-9354"
  },
  {
   "identificacion": 1022337315,
   "Nombres": "ROJAS MOSQUERA JUAN MANUEL ",
   "Estamento": "Estudiante",
   "Correo": "juanm.rojas@fuac.edu.co",
   "codigo": "WYR-1755-ABA-9355"
  },
  {
   "identificacion": 80404214,
   "Nombres": "ROJAS REYES EDINSON  ",
   "Estamento": "Estudiante",
   "Correo": "edinson.rojas@fuac.edu.co",
   "codigo": "WYR-1756-ABA-9356"
  },
  {
   "identificacion": 1121938838,
   "Nombres": "ROJAS RUEDA DARIENT STHUAR ",
   "Estamento": "Estudiante",
   "Correo": "daniel.soto@fuac.edu.co",
   "codigo": "WYR-1757-ABA-9357"
  },
  {
   "identificacion": 86065221,
   "Nombres": "ROMERO LEON JHONNY ENRIQUE ",
   "Estamento": "Estudiante",
   "Correo": "enrique.leon@fuac.edu.co",
   "codigo": "WYR-1758-ABA-9358"
  },
  {
   "identificacion": 86054521,
   "Nombres": "ROMERO ROMERO URIAS  ",
   "Estamento": "Estudiante",
   "Correo": "rectoria@unies.edu.co",
   "codigo": "WYR-1759-ABA-9359"
  },
  {
   "identificacion": 1123514001,
   "Nombres": "ROMERO VILLALBA OSCAR DAVID ",
   "Estamento": "Estudiante",
   "Correo": "oscard.romero@fuac.edu.co",
   "codigo": "WYR-1760-ABA-9360"
  },
  {
   "identificacion": 1005826323,
   "Nombres": "RONDON PENAGOS JUAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "juan.rondon@fuac.edu.co",
   "codigo": "WYR-1761-ABA-9361"
  },
  {
   "identificacion": 1068954349,
   "Nombres": "RUBIANO POVEDA JUAN ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "jrubiano.poveda@fuac.edu.co",
   "codigo": "WYR-1762-ABA-9362"
  },
  {
   "identificacion": 1123088449,
   "Nombres": "RUIZ CORTES BRAYAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "brayan.ruiz@fuac.edu.co",
   "codigo": "WYR-1763-ABA-9363"
  },
  {
   "identificacion": 1123088213,
   "Nombres": "RUIZ NIÑO NAHIDALY ISABEL ",
   "Estamento": "Estudiante",
   "Correo": "nahidaly.ruiz@fuac.edu.co",
   "codigo": "WYR-1764-ABA-9364"
  },
  {
   "identificacion": 1033789515,
   "Nombres": "SAENZ FORERO JOAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "joan.saenz@fuac.edu.co",
   "codigo": "WYR-1765-ABA-9365"
  },
  {
   "identificacion": 1023864547,
   "Nombres": "SANCHEZ PRECIADO FREDY ALEXANDER ",
   "Estamento": "Estudiante",
   "Correo": "fsanchez.preciado@fuac.edu.co",
   "codigo": "WYR-1766-ABA-9366"
  },
  {
   "identificacion": 1120871339,
   "Nombres": "SANTANA ARIAS RUBEN DARIO ",
   "Estamento": "Estudiante",
   "Correo": "ruben.santana@fuac.edu.co",
   "codigo": "WYR-1767-ABA-9367"
  },
  {
   "identificacion": 1123510836,
   "Nombres": "SANTANA MOLANO GUSTAVO ADOLFO ",
   "Estamento": "Estudiante",
   "Correo": "gustavo.santana@fuac.edu.co",
   "codigo": "WYR-1768-ABA-9368"
  },
  {
   "identificacion": 1006873930,
   "Nombres": "SERRATO SIERRA JONATHAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "jonathan.serrato@fuac.edu.co",
   "codigo": "WYR-1769-ABA-9369"
  },
  {
   "identificacion": 1123088754,
   "Nombres": "SILVA PACHECO SAITH KAVIER ",
   "Estamento": "Estudiante",
   "Correo": "SAITHKAVIER@GMAIL.COM",
   "codigo": "WYR-1770-ABA-9370"
  },
  {
   "identificacion": 1006776413,
   "Nombres": "SOTO CONTRERAS DANIEL EDUARDO ",
   "Estamento": "Estudiante",
   "Correo": "Eduardo.soto@fuac.edu.co",
   "codigo": "WYR-1771-ABA-9371"
  },
  {
   "identificacion": 1121889980,
   "Nombres": "SUAREZ VALENCIA OLGA LUCIA ",
   "Estamento": "Estudiante",
   "Correo": "olucia.suarez@fuac.edu.co",
   "codigo": "WYR-1772-ABA-9372"
  },
  {
   "identificacion": 1006862959,
   "Nombres": "TIRADO MORALES ANDRE SANTIAGO ",
   "Estamento": "Estudiante",
   "Correo": "andre.tirado@fuac.edu.co",
   "codigo": "WYR-1773-ABA-9373"
  },
  {
   "identificacion": 1121858785,
   "Nombres": "TORO VILLAMIL OLGA MAIYURI ",
   "Estamento": "Estudiante",
   "Correo": "maiyuri.toro@fuac.edu.co",
   "codigo": "WYR-1774-ABA-9374"
  },
  {
   "identificacion": 1123512356,
   "Nombres": "VANEGAS ROJAS EDISON FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "edison.vanegas@fuac.edu.co",
   "codigo": "WYR-1775-ABA-9375"
  },
  {
   "identificacion": 1031178607,
   "Nombres": "VARGAS BELTRAN CRISTIAN JOSE ",
   "Estamento": "Estudiante",
   "Correo": "cristianjose.vargas@fuac.edu.co",
   "codigo": "WYR-1776-ABA-9376"
  },
  {
   "identificacion": 1010157627,
   "Nombres": "YARA PASTRANA ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "andres.yara@fuac.edu.co",
   "codigo": "WYR-1777-ABA-9377"
  },
  {
   "identificacion": 1010012301,
   "Nombres": "BARRERA BUITRAGO JUAN FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "jbarrera.buitrago@fuac.edu.co",
   "codigo": "WYR-1778-ABA-9378"
  },
  {
   "identificacion": 1023365256,
   "Nombres": "BOYACA PUENTES SOFIA CAROLINA ",
   "Estamento": "Estudiante",
   "Correo": "sofia.boyaca@fuac.edu.co",
   "codigo": "WYR-1779-ABA-9379"
  },
  {
   "identificacion": 1000621620,
   "Nombres": "CAMARGO ROMERO FRANGEL JUNIOR ",
   "Estamento": "Estudiante",
   "Correo": "frangel.camargo@fuac.edu.co",
   "codigo": "WYR-1780-ABA-9380"
  },
  {
   "identificacion": 1056798896,
   "Nombres": "CARDENAS CASTIBLANCO JUAN PABLO ",
   "Estamento": "Estudiante",
   "Correo": "jpablo.cardenas@fuac.edu.co",
   "codigo": "WYR-1781-ABA-9381"
  },
  {
   "identificacion": 1031165036,
   "Nombres": "CARO GALVIS KIMBERLY STEPHANIE ",
   "Estamento": "Estudiante",
   "Correo": "kimberly.caro@fuac.edu.co",
   "codigo": "WYR-1782-ABA-9382"
  },
  {
   "identificacion": 1030681449,
   "Nombres": "CASILIMAS BELTRAN JEISON STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "jeison.casilimas@fuac.edu.co",
   "codigo": "WYR-1783-ABA-9383"
  },
  {
   "identificacion": 1000603487,
   "Nombres": "CASTRO CASTRO GLORIA STEFANY ",
   "Estamento": "Estudiante",
   "Correo": "castro.gloria@fuac.edu.co",
   "codigo": "WYR-1784-ABA-9384"
  },
  {
   "identificacion": 1030624685,
   "Nombres": "CASTRO MORENO GERMAN NICOLAS ",
   "Estamento": "Estudiante",
   "Correo": "castro.german@fuac.edu.co",
   "codigo": "WYR-1785-ABA-9385"
  },
  {
   "identificacion": 1001115300,
   "Nombres": "CASTRO RUIZ MIGUEL ANGEL ",
   "Estamento": "Estudiante",
   "Correo": "castro.miguel@fuac.edu.co",
   "codigo": "WYR-1786-ABA-9386"
  },
  {
   "identificacion": 1030701429,
   "Nombres": "CELY MEDINA CAMILO ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "ccely.medina@fuac.edu.co",
   "codigo": "WYR-1787-ABA-9387"
  },
  {
   "identificacion": 1193588367,
   "Nombres": "CHAPARRO RODRIGUEZ JESICA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "jesica.chaparro@fuac.edu.co",
   "codigo": "WYR-1788-ABA-9388"
  },
  {
   "identificacion": 1014296061,
   "Nombres": "CHAUTA URREA KAROL STEPHANIE ",
   "Estamento": "Estudiante",
   "Correo": "karol.chauta@fuac.edu.co",
   "codigo": "WYR-1789-ABA-9389"
  },
  {
   "identificacion": 1000518166,
   "Nombres": "CIPRIAN ACOSTA SANTIAGO  ",
   "Estamento": "Estudiante",
   "Correo": "santiago.ciprian@fuac.edu.co",
   "codigo": "WYR-1790-ABA-9390"
  },
  {
   "identificacion": 1011085536,
   "Nombres": "CORREDOR ROJAS WAIRA MILENA ",
   "Estamento": "Estudiante",
   "Correo": "waira.corredor@fuac.edu.co",
   "codigo": "WYR-1791-ABA-9391"
  },
  {
   "identificacion": 1007420509,
   "Nombres": "CRISTANCHO ESPINEL JUAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "juan.cristancho@fuac.edu.co",
   "codigo": "WYR-1792-ABA-9392"
  },
  {
   "identificacion": 1026583056,
   "Nombres": "CUELLAR BAQUERO ANDRES MAURICIO ",
   "Estamento": "Estudiante",
   "Correo": "amauriciocuellar@fuac.edu.co",
   "codigo": "WYR-1793-ABA-9393"
  },
  {
   "identificacion": 1033809441,
   "Nombres": "DUARTE ROA JONATAN ELIECER ",
   "Estamento": "Estudiante",
   "Correo": "jonatan.duarte@fuac.edu.co",
   "codigo": "WYR-1794-ABA-9394"
  },
  {
   "identificacion": 1018513504,
   "Nombres": "GALEANO RODRIGUEZ KAROL ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "karol.galeano@fuac.edu.co",
   "codigo": "WYR-1795-ABA-9395"
  },
  {
   "identificacion": 1022446785,
   "Nombres": "GALINDO MARQUEZ DANIELA ANDREA ",
   "Estamento": "Estudiante",
   "Correo": "daniela.galindo@fuac.edu.co",
   "codigo": "WYR-1796-ABA-9396"
  },
  {
   "identificacion": 1000594015,
   "Nombres": "GARCIA CAUCHA RICHARD STEVEN ",
   "Estamento": "Estudiante",
   "Correo": "garcia.richard@fuac.edu.co",
   "codigo": "WYR-1797-ABA-9397"
  },
  {
   "identificacion": 1015456041,
   "Nombres": "GONZALEZ MONTENEGRO SEBASTIAN  ",
   "Estamento": "Estudiante",
   "Correo": "sgonzalez.montenegro@fuac.edu.co",
   "codigo": "WYR-1798-ABA-9398"
  },
  {
   "identificacion": 1193075078,
   "Nombres": "HEREDIA ALBORNOZ MARIA JOSE ",
   "Estamento": "Estudiante",
   "Correo": "maria.heredia@fuac.edu.co",
   "codigo": "WYR-1799-ABA-9399"
  },
  {
   "identificacion": 1143851451,
   "Nombres": "HERNANDEZ JIMENEZ IVAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "ihernandez.jimenez@fuac.edu.co",
   "codigo": "WYR-1800-ABA-9400"
  },
  {
   "identificacion": 1000063159,
   "Nombres": "HERRERA RODRIGUEZ MARIA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "mherrera.rodriguez@fuac.edu.co",
   "codigo": "WYR-1801-ABA-9401"
  },
  {
   "identificacion": 1073177056,
   "Nombres": "LARA HERNANDEZ DANIELA FERNANDA ",
   "Estamento": "Estudiante",
   "Correo": "daniela.lara@fuac.edu.co",
   "codigo": "WYR-1802-ABA-9402"
  },
  {
   "identificacion": 1030699935,
   "Nombres": "LEMUS MORENO DANIELA  ",
   "Estamento": "Estudiante",
   "Correo": "daniela.lemus@fuac.edu.co",
   "codigo": "WYR-1803-ABA-9403"
  },
  {
   "identificacion": 1013647784,
   "Nombres": "MENDOZA SOLANO JOSE FERNANDO ",
   "Estamento": "Estudiante",
   "Correo": "jose.mendoza@fuac.edu.co",
   "codigo": "WYR-1804-ABA-9404"
  },
  {
   "identificacion": 1023954070,
   "Nombres": "NIÑO CAGUA BRAYAN  ",
   "Estamento": "Estudiante",
   "Correo": "brayan.nino@fuac.edu.co",
   "codigo": "WYR-1805-ABA-9405"
  },
  {
   "identificacion": 1030673995,
   "Nombres": "ORDOÑEZ GARCIA ANGIE TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "ordonez.angie@fuac.edu.co",
   "codigo": "WYR-1806-ABA-9406"
  },
  {
   "identificacion": 1010036200,
   "Nombres": "ORTIZ MARTINEZ GERALDINE  ",
   "Estamento": "Estudiante",
   "Correo": "geraldine.ortiz@fuac.edu.co",
   "codigo": "WYR-1807-ABA-9407"
  },
  {
   "identificacion": 1016063263,
   "Nombres": "PEÑALOZA RODRIGUEZ JULIAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "julian.penaloza@fuac.edu.co",
   "codigo": "WYR-1808-ABA-9408"
  },
  {
   "identificacion": 1022428002,
   "Nombres": "RAMIREZ VARGAS DUVAN FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "duvan.ramirez@fuac.edu.co",
   "codigo": "WYR-1809-ABA-9409"
  },
  {
   "identificacion": 1010246188,
   "Nombres": "RINCON BUITRAGO CRISTIAN JULIAN ",
   "Estamento": "Estudiante",
   "Correo": "rincon.cristian@fuac.edu.co",
   "codigo": "WYR-1810-ABA-9410"
  },
  {
   "identificacion": 1013680229,
   "Nombres": "RINCON CASTRO CAROLINE TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "caroline.rincon@fuac.edu.co",
   "codigo": "WYR-1811-ABA-9411"
  },
  {
   "identificacion": 1022389523,
   "Nombres": "RUBIO RIVERA ERIK FABIAN ",
   "Estamento": "Estudiante",
   "Correo": "erik.rubio@fuac.edu.co",
   "codigo": "WYR-1812-ABA-9412"
  },
  {
   "identificacion": 1010245710,
   "Nombres": "SALAZAR PEÑA ZAYRA TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "zayra.salazar@fuac.edu.co",
   "codigo": "WYR-1813-ABA-9413"
  },
  {
   "identificacion": 1115945907,
   "Nombres": "SERNA FLOREZ JAIRO DE JESUS ",
   "Estamento": "Estudiante",
   "Correo": "jairo.serna@fuac.edu.co",
   "codigo": "WYR-1814-ABA-9414"
  },
  {
   "identificacion": 1022417730,
   "Nombres": "SUAREZ AMARIS GISELLA KATHERINE ",
   "Estamento": "Estudiante",
   "Correo": "gisella.suarez@fuac.edu.co",
   "codigo": "WYR-1815-ABA-9415"
  },
  {
   "identificacion": 1015477238,
   "Nombres": "SUAREZ RODRIGUEZ CRISTIAN  ",
   "Estamento": "Estudiante",
   "Correo": "suarez.cristian@fuac.edu.co",
   "codigo": "WYR-1816-ABA-9416"
  },
  {
   "identificacion": 1023959950,
   "Nombres": "TIQUE ESPITIA CRISITIAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "crisitian.tique@fuac.edu.co",
   "codigo": "WYR-1817-ABA-9417"
  },
  {
   "identificacion": 1000155910,
   "Nombres": "TORO HERNANDEZ JULIAN DAVID ",
   "Estamento": "Estudiante",
   "Correo": "julian.toro@fuac.edu.co",
   "codigo": "WYR-1818-ABA-9418"
  },
  {
   "identificacion": 1000269232,
   "Nombres": "TRIVIÑO DIAZ ISABELLA MARIA ",
   "Estamento": "Estudiante",
   "Correo": "isabella.trivino@fuac.edu.co",
   "codigo": "WYR-1819-ABA-9419"
  },
  {
   "identificacion": 1010074092,
   "Nombres": "VASQUEZ SALINAS BRAYHAN NICOLAS ",
   "Estamento": "Estudiante",
   "Correo": "brayhan.vasquez@fuac.edu.co",
   "codigo": "WYR-1820-ABA-9420"
  },
  {
   "identificacion": 1000988124,
   "Nombres": "AGUDELO GONZALEZ ANDRES FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "aagudelo.gonzalez@fuac.edu.co",
   "codigo": "WYR-1821-ABA-9421"
  },
  {
   "identificacion": 1000251823,
   "Nombres": "BAYONA CASTRO SANTIAGO  ",
   "Estamento": "Estudiante",
   "Correo": "santiago.bayona@fuac.edu.co",
   "codigo": "WYR-1822-ABA-9422"
  },
  {
   "identificacion": 1000379083,
   "Nombres": "BERMUDEZ CASTELLANOS SEBASTIAN  ",
   "Estamento": "Estudiante",
   "Correo": "sebastian.bermudez@fuac.edu.co",
   "codigo": "WYR-1823-ABA-9423"
  },
  {
   "identificacion": 1012446242,
   "Nombres": "DIAZ LOAIZA LINA MARIANA ",
   "Estamento": "Estudiante",
   "Correo": "ldiaz.loaiza@fuac.edu.co",
   "codigo": "WYR-1824-ABA-9424"
  },
  {
   "identificacion": 1000287920,
   "Nombres": "DOMINGUEZ GUZMAN DIEGO ALEJANDRO ",
   "Estamento": "Estudiante",
   "Correo": "diego.dominguez@fuac.edu.co",
   "codigo": "WYR-1825-ABA-9425"
  },
  {
   "identificacion": 1010133477,
   "Nombres": "DUEÑAS PABON SHELSY CATHERINE ",
   "Estamento": "Estudiante",
   "Correo": "Shelsy.duenas@fuac.edu.co",
   "codigo": "WYR-1826-ABA-9426"
  },
  {
   "identificacion": 1015449866,
   "Nombres": "FARFAN MORENO PABLO AGUSTIN ",
   "Estamento": "Estudiante",
   "Correo": "pablo.farfan@fuac.edu.co",
   "codigo": "WYR-1827-ABA-9427"
  },
  {
   "identificacion": 1000835045,
   "Nombres": "FUQUEN PIRANEQUE LAURA SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "laura.fuquen@fuac.edu.co",
   "codigo": "WYR-1828-ABA-9428"
  },
  {
   "identificacion": 1013616035,
   "Nombres": "GOMEZ BORJA JONATHAN ELIUD ",
   "Estamento": "Estudiante",
   "Correo": "gomez.jonathan@fuac.edu.co",
   "codigo": "WYR-1829-ABA-9429"
  },
  {
   "identificacion": 1030604928,
   "Nombres": "JAIMES RAMIREZ EDUARDO  ",
   "Estamento": "Estudiante",
   "Correo": "jaimes.eduardo@fuac.edu.co",
   "codigo": "WYR-1830-ABA-9430"
  },
  {
   "identificacion": 1001096238,
   "Nombres": "LADINO CHAPARRO JHON SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "jhon.ladino@fuac.edu.co",
   "codigo": "WYR-1831-ABA-9431"
  },
  {
   "identificacion": 1001343064,
   "Nombres": "MARTINEZ BARBOSA JOHAN SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "martinez.johan@fuac.edu.co",
   "codigo": "WYR-1832-ABA-9432"
  },
  {
   "identificacion": 1000859002,
   "Nombres": "MORA LOZANO ANGIE VALERIA ",
   "Estamento": "Estudiante",
   "Correo": "amora.lozano@fuac.edu.co",
   "codigo": "WYR-1833-ABA-9433"
  },
  {
   "identificacion": 1020817551,
   "Nombres": "MORAN CEPEDA DAVID FELIPE ",
   "Estamento": "Estudiante",
   "Correo": "david.moran@fuac.edu.co",
   "codigo": "WYR-1834-ABA-9434"
  },
  {
   "identificacion": 1026297750,
   "Nombres": "OSORIO GARCIA JULIETH ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "julieth.osorio@fuac.edu.co",
   "codigo": "WYR-1835-ABA-9435"
  },
  {
   "identificacion": 1025520246,
   "Nombres": "PARAMO VARON DANIEL SEBASTIAN ",
   "Estamento": "Estudiante",
   "Correo": "daniel.paramo@fuac.edu.co",
   "codigo": "WYR-1836-ABA-9436"
  },
  {
   "identificacion": 1026551935,
   "Nombres": "PARRA FUENTES NICOLAS  ",
   "Estamento": "Estudiante",
   "Correo": "nicolasp.fuentes@fuac.edu.co",
   "codigo": "WYR-1837-ABA-9437"
  },
  {
   "identificacion": 1023012963,
   "Nombres": "PEREZ DIMATE KAREN YAMILE ",
   "Estamento": "Estudiante",
   "Correo": "perez.karen@fuac.edu.co",
   "codigo": "WYR-1838-ABA-9438"
  },
  {
   "identificacion": 1001062074,
   "Nombres": "ROA RUBIANO ANDRES CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "andresc.roa@fuac.edu.co",
   "codigo": "WYR-1839-ABA-9439"
  },
  {
   "identificacion": 1010004632,
   "Nombres": "SALINAS CAMACHO MANUELA  ",
   "Estamento": "Estudiante",
   "Correo": "manuela.salinas@fuac.edu.co",
   "codigo": "WYR-1840-ABA-9440"
  },
  {
   "identificacion": 1029220296,
   "Nombres": "SANDOVAL MONTAÑO JOHAN ESTEBAN ",
   "Estamento": "Estudiante",
   "Correo": "johan.sandoval@fuac.edu.co",
   "codigo": "WYR-1841-ABA-9441"
  },
  {
   "identificacion": 1015418815,
   "Nombres": "SUAREZ REYES CHRISTIAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "christian.suarez@fuac.edu.co",
   "codigo": "WYR-1842-ABA-9442"
  },
  {
   "identificacion": 1120380900,
   "Nombres": "TORO VALDERRAMA WEINER ORLEY ",
   "Estamento": "Estudiante",
   "Correo": "weiner.toro@fuac.edu.co",
   "codigo": "WYR-1843-ABA-9443"
  },
  {
   "identificacion": 1001064840,
   "Nombres": "VELASCO PEÑA JUAN CARLOS ",
   "Estamento": "Estudiante",
   "Correo": "velasco.juan@fuac.edu.co",
   "codigo": "WYR-1844-ABA-9444"
  },
  {
   "identificacion": 80145730,
   "Nombres": "ZELMAN NUÑEZ YOSEF DAVID ",
   "Estamento": "Estudiante",
   "Correo": "jose.nunez@fuac.edu.co",
   "codigo": "WYR-1845-ABA-9445"
  },
  {
   "identificacion": 1013680092,
   "Nombres": "CADENA SALINAS LEIDY LISBEY ",
   "Estamento": "Estudiante",
   "Correo": "leidy.cadena@fuac.edu.co",
   "codigo": "WYR-1846-ABA-9446"
  },
  {
   "identificacion": 1023024704,
   "Nombres": "GALEANO CABALLERO ANGIE YURLEY ",
   "Estamento": "Estudiante",
   "Correo": "angie.galeano@fuac.edu.co",
   "codigo": "WYR-1847-ABA-9447"
  },
  {
   "identificacion": 1031176145,
   "Nombres": "GARCIA GIRALDO VALENTINA  ",
   "Estamento": "Estudiante",
   "Correo": "valentina.garcia@fuac.edu.co",
   "codigo": "WYR-1848-ABA-9448"
  },
  {
   "identificacion": 1000339148,
   "Nombres": "LANCHEROS ALVAREZ NICOLE TATIANA ",
   "Estamento": "Estudiante",
   "Correo": "nicole.lancheros@fuac.edu.co",
   "codigo": "WYR-1849-ABA-9449"
  },
  {
   "identificacion": 1013102605,
   "Nombres": "LOPEZ CASTILLO NICOLAS ANDRES ",
   "Estamento": "Estudiante",
   "Correo": "nlopez.castillo@fuac.edu.co",
   "codigo": "WYR-1850-ABA-9450"
  },
  {
   "identificacion": 1001217033,
   "Nombres": "MOJICA PERALTA MARIA CONSUELO ",
   "Estamento": "Estudiante",
   "Correo": "mmojica.peralta@fuac.edu.co",
   "codigo": "WYR-1851-ABA-9451"
  },
  {
   "identificacion": 1126604706,
   "Nombres": "MORA MEDINA PAULA ALEJANDRA ",
   "Estamento": "Estudiante",
   "Correo": "paula.mora@fuac.edu.co",
   "codigo": "WYR-1852-ABA-9452"
  },
  {
   "identificacion": 1010074441,
   "Nombres": "NARANJO ARANGO LAURA VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "laura.naranjo@fuac.edu.co",
   "codigo": "WYR-1853-ABA-9453"
  },
  {
   "identificacion": 1003520155,
   "Nombres": "NIETO DIAZ RUTH NAHOMI ",
   "Estamento": "Estudiante",
   "Correo": "ruth.nieto@fuac.edu.co",
   "codigo": "WYR-1854-ABA-9454"
  },
  {
   "identificacion": 1070385616,
   "Nombres": "PENAGOS HERNANDEZ KEILLY DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "keilly.penagos@fuac.edu.co",
   "codigo": "WYR-1855-ABA-9455"
  },
  {
   "identificacion": 1001050588,
   "Nombres": "PEÑA PRECIADO EMILY SOFIA ",
   "Estamento": "Estudiante",
   "Correo": "emily.preciado@fuac.edu.co",
   "codigo": "WYR-1856-ABA-9456"
  },
  {
   "identificacion": 1031421356,
   "Nombres": "PULIDO GUTIERREZ BRIGGITE BIBIANA ",
   "Estamento": "Estudiante",
   "Correo": "briggite.pulido@fuac.edu.co",
   "codigo": "WYR-1857-ABA-9457"
  },
  {
   "identificacion": 1018415467,
   "Nombres": "QUEZADA LEGUIZAMO LORENA  ",
   "Estamento": "Estudiante",
   "Correo": "lorena.quezada@fuac.edu.co",
   "codigo": "WYR-1858-ABA-9458"
  },
  {
   "identificacion": 1019118336,
   "Nombres": "QUINTERO SALAZAR CARLOS GERMAN ",
   "Estamento": "Estudiante",
   "Correo": "cquintero.german@fuac.edu.co",
   "codigo": "WYR-1859-ABA-9459"
  },
  {
   "identificacion": 1073713161,
   "Nombres": "RAMIREZ RAMIREZ ANGIE DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "aramirez.ramirez@fuac.edu.co",
   "codigo": "WYR-1860-ABA-9460"
  },
  {
   "identificacion": 1014308485,
   "Nombres": "ROJAS PARRA DAVID  ",
   "Estamento": "Estudiante",
   "Correo": "drojas.parra@fuac.edu.co",
   "codigo": "WYR-1861-ABA-9461"
  },
  {
   "identificacion": 1043665024,
   "Nombres": "TAPIA RODRIGUEZ EMILY CELESTE ",
   "Estamento": "Estudiante",
   "Correo": "emily.tapia@fuac.edu.co",
   "codigo": "WYR-1862-ABA-9462"
  },
  {
   "identificacion": 1000972310,
   "Nombres": "TORRES ARCHILA JIMENA  ",
   "Estamento": "Estudiante",
   "Correo": "jimena.torres@fuac.edu.co",
   "codigo": "WYR-1863-ABA-9463"
  },
  {
   "identificacion": 1023946420,
   "Nombres": "VILLANUEVA GOMEZ YURY DANIELA ",
   "Estamento": "Estudiante",
   "Correo": "yury.villanueva@fuac.edu.co",
   "codigo": "WYR-1864-ABA-9464"
  },
  {
   "identificacion": 1032507711,
   "Nombres": "RUIZ VASQUEZ JUAN CAMILO ",
   "Estamento": "Estudiante",
   "Correo": "jruiz.vasquez@fuac.edu.co",
   "codigo": "WYR-1865-ABA-9465"
  },
  {
   "identificacion": 1010245351,
   "Nombres": "TORRES SANCHEZ DANNA VALENTINA ",
   "Estamento": "Estudiante",
   "Correo": "danna.torres@fuac.edu.co",
   "codigo": "WYR-1866-ABA-9466"
  },
  {
   "identificacion": 1032487088,
   "Nombres": "CASTAÑEDA RODRIGUEZ RODRIGO  ",
   "Estamento": "Estudiante",
   "Correo": "rcastaneda.rodriguez@fuac.edu.co",
   "codigo": "WYR-1867-ABA-9467"
  },
  {
   "identificacion": 1024548302,
   "Nombres": "PEÑA MALAGON JONATHAN  ",
   "Estamento": "Estudiante",
   "Correo": "jonathan.pena@fuac.edu.co",
   "codigo": "WYR-1868-ABA-9468"
  },
  {
   "identificacion": 1013666867,
   "Nombres": "RUIZ NIÑO JAVIER NICOLAS ",
   "Estamento": "Estudiante",
   "Correo": "jruiz.nino@fuac.edu.co",
   "codigo": "WYR-1869-ABA-9469"
  },
  {
   "identificacion": 1014188777,
   "Nombres": "HUERTAS RIVERA JONATHAN HUMBERTO ",
   "Estamento": "Estudiante",
   "Correo": "jonathan.huertas@fuac.edu.co",
   "codigo": "WYR-1870-ABA-9470"
  },
  {
   "identificacion": 1018449841,
   "Nombres": "HIDALGO LOPEZ JHON KRISTIAN ",
   "Estamento": "Estudiante",
   "Correo": "jhon.hidalgo@fuac.edu.co",
   "codigo": "WYR-1871-ABA-9471"
  },
  {
   "identificacion": 71608864,
   "Nombres": "AGUDELO VELÁSQUEZ LEONARDO",
   "Estamento": "Docente",
   "Correo": "leonardo.agudelo@fuac.edu.co",
   "codigo": "WYR-1001-ABA-9999"
  },
  {
   "identificacion": 91202085,
   "Nombres": "ANGULO RICARDO MILTON",
   "Estamento": "Docente",
   "Correo": "milton.angulo@fuac.edu.co",
   "codigo": "YUI-1002-RDJ-9998"
  },
  {
   "identificacion": 80426866,
   "Nombres": "ARIZA BELTRÁN DARÍO JAVIER",
   "Estamento": "Docente",
   "Correo": "dario.ariza@fuac.edu.co",
   "codigo": "PIO-1003-WGZ-9997"
  },
  {
   "identificacion": 8315380,
   "Nombres": "BARRERA GALLÓN RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "Correo": "rafael.barrera@fuac.edu.co",
   "codigo": "WYR-1004-ABA-9996"
  },
  {
   "identificacion": 79125878,
   "Nombres": "BARRETO FARFÁN JORGE ENRIQUE",
   "Estamento": "Docente",
   "Correo": "jorge.barreto@fuac.edu.co",
   "codigo": "YUI-1005-RDJ-9995"
  },
  {
   "identificacion": 39706201,
   "Nombres": "BELLO ESPINOSA MABEL",
   "Estamento": "Docente",
   "Correo": "mabel.bello@fuac.edu.co",
   "codigo": "PIO-1006-WGZ-9994"
  },
  {
   "identificacion": 19271274,
   "Nombres": "BERNAL ACERO LUIS HORACIO",
   "Estamento": "Docente",
   "Correo": "luis.bernal@fuac.edu.co",
   "codigo": "WYR-1007-ABA-9993"
  },
  {
   "identificacion": 71616423,
   "Nombres": "BROME SEPÚLVEDA WASHINGTON DE JESÚS",
   "Estamento": "Docente",
   "Correo": "brome.washington@fuac.edu.co",
   "codigo": "YUI-1008-RDJ-9992"
  },
  {
   "identificacion": 80435510,
   "Nombres": "BUITRAGO VALERO CARLOS JULIO",
   "Estamento": "Docente",
   "Correo": "carlos.buitrago@fuac.edu.co",
   "codigo": "PIO-1009-WGZ-9991"
  },
  {
   "identificacion": 30282756,
   "Nombres": "BURITICA ARBOLEDA CLARA INÉS",
   "Estamento": "Docente",
   "Correo": "clara.buritica@fuac.edu.co",
   "codigo": "WYR-1010-ABA-9990"
  },
  {
   "identificacion": 12126186,
   "Nombres": "CABRERA GONZÁLEZ LUIS MIGUEL",
   "Estamento": "Docente",
   "Correo": "luis.cabrera@fuac.edu.co",
   "codigo": "YUI-1011-RDJ-9989"
  },
  {
   "identificacion": 19270867,
   "Nombres": "CASTRO ALARCÓN HÉCTOR FERNANDO",
   "Estamento": "Docente",
   "Correo": "hector.castro@fuac.edu.co",
   "codigo": "PIO-1012-WGZ-9988"
  },
  {
   "identificacion": 19327286,
   "Nombres": "CASTRO FAJARDO GERMAN EDUARDO",
   "Estamento": "Docente",
   "Correo": "german.castro@fuac.edu.co",
   "codigo": "WYR-1013-ABA-9987"
  },
  {
   "identificacion": 14270653,
   "Nombres": "CONTRERAS CASTRO MARIO DUSTANO",
   "Estamento": "Docente",
   "Correo": "mario.contreras@fuac.edu.co",
   "codigo": "YUI-1014-RDJ-9986"
  },
  {
   "identificacion": 19426263,
   "Nombres": "CONTRERAS SÁNCHEZ FERNANDO ALIRIO",
   "Estamento": "Docente",
   "Correo": "fernando.contreras@fuac.edu.co",
   "codigo": "PIO-1015-WGZ-9985"
  },
  {
   "identificacion": 19393345,
   "Nombres": "CORTÉS CASTRO JUAN PABLO",
   "Estamento": "Docente",
   "Correo": "juan.cortes@fuac.edu.co",
   "codigo": "WYR-1016-ABA-9984"
  },
  {
   "identificacion": 1019040382,
   "Nombres": "ESPITIA GONZALEZ LINA MARGARITA",
   "Estamento": "Docente",
   "Correo": "lina.espitia@fuac.edu.co",
   "codigo": "YUI-1017-RDJ-9983"
  },
  {
   "identificacion": 92276367,
   "Nombres": "GARCÍA ARRAZOLA ENRIQUE JOSÉ",
   "Estamento": "Docente",
   "Correo": "enrique.garcia@fuac.edu.co",
   "codigo": "PIO-1018-WGZ-9982"
  },
  {
   "identificacion": 51590254,
   "Nombres": "GUERRERO BARÓN MARTHA HELENA",
   "Estamento": "Docente",
   "Correo": "marthhel@gmail.com",
   "codigo": "WYR-1019-ABA-9981"
  },
  {
   "identificacion": 79564277,
   "Nombres": "GUERRERO VARONA JORGE FERNANDO",
   "Estamento": "Docente",
   "Correo": "jorge.guerrero@fuac.edu.co",
   "codigo": "YUI-1020-RDJ-9980"
  },
  {
   "identificacion": 79650876,
   "Nombres": "HERNANDEZ DIAZ CARLOS ARTURO",
   "Estamento": "Docente",
   "Correo": "carlos.hernandez@fuac.edu.co",
   "codigo": "PIO-1021-WGZ-9979"
  },
  {
   "identificacion": 51802561,
   "Nombres": "JARAMILLO MESA SANDRA PATRICIA",
   "Estamento": "Docente",
   "Correo": "jaramillo.sandra@fuac.edu.co",
   "codigo": "WYR-1022-ABA-9978"
  },
  {
   "identificacion": 19204617,
   "Nombres": "LADINO PERALTA RAFAEL EDUARDO",
   "Estamento": "Docente",
   "Correo": "rafael.ladino@fuac.edu.co",
   "codigo": "YUI-1023-RDJ-9977"
  },
  {
   "identificacion": 79109290,
   "Nombres": "LARA RINCÓN RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "Correo": "rafael.lara@fuac.edu.co",
   "codigo": "PIO-1024-WGZ-9976"
  },
  {
   "identificacion": 79331644,
   "Nombres": "LEON ACOSTA JUAN CARLOS",
   "Estamento": "Docente",
   "Correo": "jleon.acosta@fuac.edu.co",
   "codigo": "WYR-1025-ABA-9975"
  },
  {
   "identificacion": 17585342,
   "Nombres": "LEÓN BENAVIDES ÉDGAR ARTURO",
   "Estamento": "Docente",
   "Correo": "edgar.leon@fuac.edu.co",
   "codigo": "YUI-1026-RDJ-9974"
  },
  {
   "identificacion": 19458753,
   "Nombres": "LOMBANA SOSA RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "Correo": "rafael.lombana@fuac.edu.co",
   "codigo": "PIO-1027-WGZ-9973"
  },
  {
   "identificacion": 63283651,
   "Nombres": "LUENGAS APONTE SANDRA",
   "Estamento": "Docente",
   "Correo": "sandra.luengas@fuac.edu.co",
   "codigo": "WYR-1028-ABA-9972"
  },
  {
   "identificacion": 17321750,
   "Nombres": "LÓPEZ HERNÁNDEZ ALFREDO",
   "Estamento": "Docente",
   "Correo": "alfredo.lopez@fuac.edu.co",
   "codigo": "YUI-1029-RDJ-9971"
  },
  {
   "identificacion": 18410891,
   "Nombres": "LÓPEZ SEPÚLVEDA JOSÉ HUMBERTO",
   "Estamento": "Docente",
   "Correo": "jose.lopez@fuac.edu.co",
   "codigo": "PIO-1030-WGZ-9970"
  },
  {
   "identificacion": 19383768,
   "Nombres": "MALTES TELLO LUIS FRANCISCO",
   "Estamento": "Docente",
   "Correo": "luis.maltes@fuac.edu.co",
   "codigo": "WYR-1031-ABA-9969"
  },
  {
   "identificacion": 52366455,
   "Nombres": "MARTINEZ ARIAS AMANDA MARINA",
   "Estamento": "Docente",
   "Correo": "amanda.martinez.arias@gmail.com",
   "codigo": "YUI-1032-RDJ-9968"
  },
  {
   "identificacion": 8722736,
   "Nombres": "MARTINEZ FUENTES RAFAEL SEGUNDO",
   "Estamento": "Docente",
   "Correo": "rafael.martinez@fuac.edu.co",
   "codigo": "PIO-1033-WGZ-9967"
  },
  {
   "identificacion": 79432504,
   "Nombres": "MARTÍNEZ MESA ÓSCAR RENÉ",
   "Estamento": "Docente",
   "Correo": "martinez.oscarrene@gmail.com",
   "codigo": "WYR-1034-ABA-9966"
  },
  {
   "identificacion": 79486080,
   "Nombres": "MELO MARTÍNEZ JULIO CÉSAR",
   "Estamento": "Docente",
   "Correo": "julio.melo@fuac.edu.co",
   "codigo": "YUI-1035-RDJ-9965"
  },
  {
   "identificacion": 19065322,
   "Nombres": "MILLÁN BUITRAGO LUIS FELIPE",
   "Estamento": "Docente",
   "Correo": "luis.millan@fuac.edu.co",
   "codigo": "PIO-1036-WGZ-9964"
  },
  {
   "identificacion": 19271530,
   "Nombres": "MORA CALVO JESUS DARIO",
   "Estamento": "Docente",
   "Correo": "jesus.mora@fuac.edu.co",
   "codigo": "WYR-1037-ABA-9963"
  },
  {
   "identificacion": 19396518,
   "Nombres": "MORALES CORTÉS ÉDGAR",
   "Estamento": "Docente",
   "Correo": "edgar.morales@fuac.edu.co",
   "codigo": "YUI-1038-RDJ-9962"
  },
  {
   "identificacion": 79485500,
   "Nombres": "MORANTES SABOGAL LUIS OSWALDO",
   "Estamento": "Docente",
   "Correo": "luis.morantes@fuac.edu.co",
   "codigo": "PIO-1039-WGZ-9961"
  },
  {
   "identificacion": 4021999,
   "Nombres": "MORENO ROMERO FERNEL ENRIQUE",
   "Estamento": "Docente",
   "Correo": "fernel.moreno@fuac.edu.co",
   "codigo": "WYR-1040-ABA-9960"
  },
  {
   "identificacion": 36277570,
   "Nombres": "MOTTA CASTAÑO DEISSY",
   "Estamento": "Docente",
   "Correo": "deissy.motta@fuac.edu.co",
   "codigo": "YUI-1041-RDJ-9959"
  },
  {
   "identificacion": 19322644,
   "Nombres": "MOYA CONTRERAS LUIS HENRY",
   "Estamento": "Docente",
   "Correo": "luis.moya@fuac.edu.co",
   "codigo": "PIO-1042-WGZ-9958"
  },
  {
   "identificacion": 79140739,
   "Nombres": "MUÑOZ JURADO HOLBY JOSÉ",
   "Estamento": "Docente",
   "Correo": "holby.munoz@fuac.edu.co",
   "codigo": "WYR-1043-ABA-9957"
  },
  {
   "identificacion": 32674871,
   "Nombres": "NIETO USECHE SANDRA",
   "Estamento": "Docente",
   "Correo": "sandra.nieto@fuac.edu.co",
   "codigo": "YUI-1044-RDJ-9956"
  },
  {
   "identificacion": 19436646,
   "Nombres": "NOVOA VELÁSQUEZ NÉSTOR ARMANDO",
   "Estamento": "Docente",
   "Correo": "nestor.novoa@fuac.edu.co",
   "codigo": "PIO-1045-WGZ-9955"
  },
  {
   "identificacion": 15041611,
   "Nombres": "OSORIO RUIZ JOSE JOAQUIN",
   "Estamento": "Docente",
   "Correo": "jose.osorio@fuac.edu.co",
   "codigo": "WYR-1046-ABA-9954"
  },
  {
   "identificacion": 52376389,
   "Nombres": "PAEZ SARAZA CRISTY SOLEDAD",
   "Estamento": "Docente",
   "Correo": "cristysoledad@hotmail.com",
   "codigo": "YUI-1047-RDJ-9953"
  },
  {
   "identificacion": 8662437,
   "Nombres": "PALENCIA FERNANDEZ RAFAEL AUGUSTO",
   "Estamento": "Docente",
   "Correo": "rafael.palencia@fuac.edu.co",
   "codigo": "PIO-1048-WGZ-9952"
  },
  {
   "identificacion": 7217078,
   "Nombres": "PARRA PÉREZ MARIO ANTONIO",
   "Estamento": "Docente",
   "Correo": "mario.parra@fuac.edu.co",
   "codigo": "WYR-1049-ABA-9951"
  },
  {
   "identificacion": 39774771,
   "Nombres": "PARRA VOROBIOVA REGUINA",
   "Estamento": "Docente",
   "Correo": "reguina.parra@fuac.edu.co",
   "codigo": "YUI-1050-RDJ-9950"
  },
  {
   "identificacion": 19070893,
   "Nombres": "PERDOMO BARRIOS JORGE ELIECER",
   "Estamento": "Docente",
   "Correo": "jorge.perdomo@fuac.edu.co",
   "codigo": "PIO-1051-WGZ-9949"
  },
  {
   "identificacion": 1013642070,
   "Nombres": "PINILLOS GALAN DIANA PATRICIA",
   "Estamento": "Docente",
   "Correo": "dpinillos13@gmail.com",
   "codigo": "WYR-1052-ABA-9948"
  },
  {
   "identificacion": 36171151,
   "Nombres": "POLANÍA RAMÍREZ NELLY",
   "Estamento": "Docente",
   "Correo": "nelly.polania@fuac.edu.co",
   "codigo": "YUI-1053-RDJ-9947"
  },
  {
   "identificacion": 3081088,
   "Nombres": "PULGARIN ARIAS SABINO",
   "Estamento": "Docente",
   "Correo": "sabino.pulgarin@fuac.edu.co",
   "codigo": "PIO-1054-WGZ-9946"
  },
  {
   "identificacion": 19446951,
   "Nombres": "QUINTERO DUQUE JUAN CARLOS",
   "Estamento": "Docente",
   "Correo": "juan.quintero@fuac.edu.co",
   "codigo": "WYR-1055-ABA-9945"
  },
  {
   "identificacion": 13457689,
   "Nombres": "RAMIREZ CALDERON JESUS ALBERTO",
   "Estamento": "Docente",
   "Correo": "j_ramirez640@hotmail.com",
   "codigo": "YUI-1056-RDJ-9944"
  },
  {
   "identificacion": 79215589,
   "Nombres": "RAMIREZ ZARATE OSCAR GIOVANNI",
   "Estamento": "Docente",
   "Correo": "oscar.ramirez@fuac.edu.co",
   "codigo": "PIO-1057-WGZ-9943"
  },
  {
   "identificacion": 3024427,
   "Nombres": "RICO SIERRA RAFAEL",
   "Estamento": "Docente",
   "Correo": "rafael.rico@fuac.edu.co",
   "codigo": "WYR-1058-ABA-9942"
  },
  {
   "identificacion": 79533978,
   "Nombres": "RIVADENEIRA VELASQUEZ RICARDO GUILLERMO",
   "Estamento": "Docente",
   "Correo": "rgrivadeneirav@gmail.com",
   "codigo": "YUI-1059-RDJ-9941"
  },
  {
   "identificacion": 79363938,
   "Nombres": "RODRÍGUEZ ALONSO TADEO DEMOSTENES",
   "Estamento": "Docente",
   "Correo": "trodriguez.alonso@fuac.edu.co",
   "codigo": "PIO-1060-WGZ-9940"
  },
  {
   "identificacion": 79270547,
   "Nombres": "RODRÍGUEZ CENTENO FERNANDO",
   "Estamento": "Docente",
   "Correo": "fernando.rodriguez@fuac.edu.co",
   "codigo": "WYR-1061-ABA-9939"
  },
  {
   "identificacion": 27982778,
   "Nombres": "RODRÍGUEZ HERNÁNDEZ DORIS NAYIVI",
   "Estamento": "Docente",
   "Correo": "fridanarohe@gmail.com",
   "codigo": "YUI-1062-RDJ-9938"
  },
  {
   "identificacion": 79261058,
   "Nombres": "RODRÍGUEZ MAYORGA ANDRÉS",
   "Estamento": "Docente",
   "Correo": "andres.rodriguez@fuac.edu.co",
   "codigo": "PIO-1063-WGZ-9937"
  },
  {
   "identificacion": 19306978,
   "Nombres": "RODRÍGUEZ OCHOA JUAN MANUEL",
   "Estamento": "Docente",
   "Correo": "juan.rodriguez@fuac.edu.co",
   "codigo": "WYR-1064-ABA-9936"
  },
  {
   "identificacion": 19441298,
   "Nombres": "RODRÍGUEZ PINILLA OMAR",
   "Estamento": "Docente",
   "Correo": "omar.rodriguez@fuac.edu.co",
   "codigo": "YUI-1065-RDJ-9935"
  },
  {
   "identificacion": 19454473,
   "Nombres": "RODRÍGUEZ PINZÓN ÉDGAR FERNANDO",
   "Estamento": "Docente",
   "Correo": "edgar.rodriguez@fuac.edu.co",
   "codigo": "PIO-1066-WGZ-9934"
  },
  {
   "identificacion": 17327066,
   "Nombres": "ROJAS HERNÁNDEZ RICARDO",
   "Estamento": "Docente",
   "Correo": "ricardo.rojas@fuac.edu.co",
   "codigo": "WYR-1067-ABA-9933"
  },
  {
   "identificacion": 80260806,
   "Nombres": "RUIZ HERNÁNDEZ LUIS IGNACIO",
   "Estamento": "Docente",
   "Correo": "luis.ruiz@fuac.edu.co",
   "codigo": "YUI-1068-RDJ-9932"
  },
  {
   "identificacion": 7253811,
   "Nombres": "SEGURA PENAGOS ALBINO",
   "Estamento": "Docente",
   "Correo": "albino.segurapenagos@gmail.com",
   "codigo": "PIO-1069-WGZ-9931"
  },
  {
   "identificacion": 19421157,
   "Nombres": "SILVA TORRES LUIS ALFREDO",
   "Estamento": "Docente",
   "Correo": "luis.silva@fuac.edu.co",
   "codigo": "WYR-1070-ABA-9930"
  },
  {
   "identificacion": 19307414,
   "Nombres": "SUÁREZ ORJUELA RAFAEL ERNESTO",
   "Estamento": "Docente",
   "Correo": "rafael.suarez@fuac.edu.co",
   "codigo": "YUI-1071-RDJ-9929"
  },
  {
   "identificacion": 19341675,
   "Nombres": "SÁNCHEZ HERNÁNDEZ MILTON HARVEY",
   "Estamento": "Docente",
   "Correo": "milton.sanchez@fuac.edu.co",
   "codigo": "PIO-1072-WGZ-9928"
  },
  {
   "identificacion": 51871352,
   "Nombres": "TAPIAS SANDOVAL CARMEN CECILIA",
   "Estamento": "Docente",
   "Correo": "carmen.tapias@fuac.edu.co",
   "codigo": "WYR-1073-ABA-9927"
  },
  {
   "identificacion": 19412752,
   "Nombres": "TORO LUCENA ÓSCAR AUGUSTO",
   "Estamento": "Docente",
   "Correo": "oscar.toro@fuac.edu.co",
   "codigo": "YUI-1074-RDJ-9926"
  },
  {
   "identificacion": 9524845,
   "Nombres": "TORRES SÁENZ CRISTIAN GABRIEL",
   "Estamento": "Docente",
   "Correo": "cristian.torres@fuac.edu.co",
   "codigo": "PIO-1075-WGZ-9925"
  },
  {
   "identificacion": 11377750,
   "Nombres": "VARGAS HEREDIA TITO ERNESTO",
   "Estamento": "Docente",
   "Correo": "tito.vargas@fuac.edu.co",
   "codigo": "WYR-1076-ABA-9924"
  },
  {
   "identificacion": 53089303,
   "Nombres": "VELÁSQUEZ CARDONA LUISA FERNANDA",
   "Estamento": "Docente",
   "Correo": "luisa.velasquez@fuac.edu.co",
   "codigo": "YUI-1077-RDJ-9923"
  },
  {
   "identificacion": 19453084,
   "Nombres": "VELÁSQUEZ PARRA ROBERTO",
   "Estamento": "Docente",
   "Correo": "roberto.velasquez@fuac.edu.co",
   "codigo": "PIO-1078-WGZ-9922"
  },
  {
   "identificacion": 14227107,
   "Nombres": "VÉLEZ CARDONA CÉSAR AUGUSTO",
   "Estamento": "Docente",
   "Correo": "cesar.velez@fuac.edu.co",
   "codigo": "WYR-1079-ABA-9921"
  },
  {
   "identificacion": 79135178,
   "Nombres": "ÁVILA BELTRÁN ÓSCAR",
   "Estamento": "Docente",
   "Correo": "oscar.avila@fuac.edu.co",
   "codigo": "YUI-1080-RDJ-9920"
  },
  {
   "identificacion": 10178313,
   "Nombres": "ARIAS BARRAGÁN LUÍS ALEJANDRO",
   "Estamento": "Docente",
   "Correo": "lincarias@yahoo.com",
   "codigo": "PIO-1081-WGZ-9919"
  },
  {
   "identificacion": 79715645,
   "Nombres": "ARÉVALO PEÑA JAVIER ENRIQUE",
   "Estamento": "Docente",
   "Correo": "javier.arevalo@fuac.edu.co",
   "codigo": "WYR-1082-ABA-9918"
  },
  {
   "identificacion": 52145378,
   "Nombres": "BARBOSA GUERRERO INÉS XIMENA",
   "Estamento": "Docente",
   "Correo": "ines.barbosa@fuac.edu.co",
   "codigo": "YUI-1083-RDJ-9917"
  },
  {
   "identificacion": 79937803,
   "Nombres": "BARRETO ALBERTO ANDY",
   "Estamento": "Docente",
   "Correo": "alberto.barreto@fuac.edu.co",
   "codigo": "PIO-1084-WGZ-9916"
  },
  {
   "identificacion": 87066930,
   "Nombres": "BENAVIDES ERAZO CHRISTIAN ORLANDO",
   "Estamento": "Docente",
   "Correo": "christian.benavides@fuac.edu.co",
   "codigo": "WYR-1085-ABA-9915"
  },
  {
   "identificacion": 23925793,
   "Nombres": "BERNAL BARRERA CLAUDIA PATRICIA",
   "Estamento": "Docente",
   "Correo": "claudia.bernal@fuac.edu.co",
   "codigo": "YUI-1086-RDJ-9914"
  },
  {
   "identificacion": 1031155640,
   "Nombres": "CANGREJO VALENCIA KAREN TATIANA",
   "Estamento": "Docente",
   "Correo": "karen.cangrejo@fuac.edu.co",
   "codigo": "PIO-1087-WGZ-9913"
  },
  {
   "identificacion": 11251679,
   "Nombres": "CASTILLO GARCÍA HERNANDO",
   "Estamento": "Docente",
   "Correo": "hernando.castillo@fuac.edu.co",
   "codigo": "WYR-1088-ABA-9912"
  },
  {
   "identificacion": 19405093,
   "Nombres": "CORTÉS CAMARGO GUILLERMO",
   "Estamento": "Docente",
   "Correo": "guillermo.cortes@fuac.edu.co",
   "codigo": "YUI-1089-RDJ-9911"
  },
  {
   "identificacion": 51868835,
   "Nombres": "CUELLAR PINEDA MÓNICA ALEXANDRA",
   "Estamento": "Docente",
   "Correo": "monica.cuellar@fuac.edu.co",
   "codigo": "PIO-1090-WGZ-9910"
  },
  {
   "identificacion": 19438407,
   "Nombres": "DUARTE CUADROS RUBÉN ALBERTO",
   "Estamento": "Docente",
   "Correo": "rcuadros14@hotmail.com",
   "codigo": "WYR-1091-ABA-9909"
  },
  {
   "identificacion": 52103054,
   "Nombres": "DÍAZ CAMACHO LUZ MERY",
   "Estamento": "Docente",
   "Correo": "dicamelu73@yahoo.es",
   "codigo": "YUI-1092-RDJ-9908"
  },
  {
   "identificacion": 79397626,
   "Nombres": "ECHAVARRIA SALAMANCA OSCAR OSWALDO",
   "Estamento": "Docente",
   "Correo": "oscar.echavarria@fuac.edu.co",
   "codigo": "PIO-1093-WGZ-9907"
  },
  {
   "identificacion": 19280348,
   "Nombres": "GARZON TORRES NESTOR MANUEL",
   "Estamento": "Docente",
   "Correo": "nestor.garzon@fuac.edu.co",
   "codigo": "WYR-1094-ABA-9906"
  },
  {
   "identificacion": 79333839,
   "Nombres": "GONZALEZ BUSTAMANTE RICARDO ALIRIO",
   "Estamento": "Docente",
   "Correo": "gonzalez.ricardo@fuac.edu.co",
   "codigo": "YUI-1095-RDJ-9905"
  },
  {
   "identificacion": 79310258,
   "Nombres": "GONZALEZ LOPEZ CARLOS FEDERICO",
   "Estamento": "Docente",
   "Correo": "cgonzalez.federico@fuac.edu.co",
   "codigo": "PIO-1096-WGZ-9904"
  },
  {
   "identificacion": 316929,
   "Nombres": "GONZALEZ RODRIGUEZ ARIEL",
   "Estamento": "Docente",
   "Correo": "ariel.gonzalez@fuac.edu.co",
   "codigo": "WYR-1097-ABA-9903"
  },
  {
   "identificacion": 79619514,
   "Nombres": "GUTIERREZ RODRIGUEZ RAMON EDUARDO",
   "Estamento": "Docente",
   "Correo": "ramon.gutierrez@fuac.edu.co",
   "codigo": "YUI-1098-RDJ-9902"
  },
  {
   "identificacion": 12990833,
   "Nombres": "GÓMEZ ZÚÑIGA CARLOS EDUARDO",
   "Estamento": "Docente",
   "Correo": "gomez.carlos@fuac.edu.co",
   "codigo": "PIO-1099-WGZ-9901"
  },
  {
   "identificacion": 79799911,
   "Nombres": "HERNÁNDEZ URIBE JHON ALEXANDER",
   "Estamento": "Docente",
   "Correo": "jhernandez.uribe@fuac.edu.co",
   "codigo": "WYR-1100-ABA-9900"
  },
  {
   "identificacion": 39781099,
   "Nombres": "MALAGON ROBAYO CAROLINA",
   "Estamento": "Docente",
   "Correo": "carolina.malagon@fuac.edu.co",
   "codigo": "YUI-1101-RDJ-9899"
  },
  {
   "identificacion": 80212027,
   "Nombres": "MARTINEZ GARCIA JOSE JOAQUIN",
   "Estamento": "Docente",
   "Correo": "joaquin.martinez@fuac.edu.co",
   "codigo": "PIO-1102-WGZ-9898"
  },
  {
   "identificacion": 73130887,
   "Nombres": "MARTÍNEZ SALINAS ESTEBAN SEGUNDO",
   "Estamento": "Docente",
   "Correo": "esteban.martinez@fuac.edu.co",
   "codigo": "WYR-1103-ABA-9897"
  },
  {
   "identificacion": 79124771,
   "Nombres": "MEDINA RODRIGUEZ LUIS CARLOS",
   "Estamento": "Docente",
   "Correo": "luis.medina@fuac.edu.co",
   "codigo": "YUI-1104-RDJ-9896"
  },
  {
   "identificacion": 79893175,
   "Nombres": "MUÑOZ MORENO JONHLY ALEXANDER",
   "Estamento": "Docente",
   "Correo": "jonhly.m@hotmail.com",
   "codigo": "PIO-1105-WGZ-9895"
  },
  {
   "identificacion": 79961347,
   "Nombres": "OCAMPO FERRER EDUARDO",
   "Estamento": "Docente",
   "Correo": "eduardo.ocampo@fuac.edu.co",
   "codigo": "WYR-1106-ABA-9894"
  },
  {
   "identificacion": 53010291,
   "Nombres": "OCHOA JOHANA DEL PILAR",
   "Estamento": "Docente",
   "Correo": "johana.ochoa@fuac.edu.co",
   "codigo": "YUI-1107-RDJ-9893"
  },
  {
   "identificacion": 19405966,
   "Nombres": "OJEDA GONZALEZ PEDRO JOSE",
   "Estamento": "Docente",
   "Correo": "pedro.ojeda@fuac.edu.co",
   "codigo": "PIO-1108-WGZ-9892"
  },
  {
   "identificacion": 93289123,
   "Nombres": "PELAEZ HERNANDEZ RAMON ANTONIO",
   "Estamento": "Docente",
   "Correo": "ramon.pelaez@fuac.edu.co",
   "codigo": "WYR-1109-ABA-9891"
  },
  {
   "identificacion": 11378743,
   "Nombres": "PÉREZ GÓMEZ GONZALO CARLOS JOSÉ",
   "Estamento": "Docente",
   "Correo": "perez.gonzalo@fuac.edu.co",
   "codigo": "YUI-1110-RDJ-9890"
  },
  {
   "identificacion": 92515346,
   "Nombres": "QUINTERO BERTEL QUELBIS ROMÁN",
   "Estamento": "Docente",
   "Correo": "quelbis.quintero@gmail.com",
   "codigo": "PIO-1111-WGZ-9889"
  },
  {
   "identificacion": 6873735,
   "Nombres": "RESTREPO NAVARRO ANTONIO JOSE",
   "Estamento": "Docente",
   "Correo": "antonio.restrepo@fuac.edu.co",
   "codigo": "WYR-1112-ABA-9888"
  },
  {
   "identificacion": 19315280,
   "Nombres": "RINCON ROJAS EDGAR JACINTO",
   "Estamento": "Docente",
   "Correo": "edgar.rincon@fuac.edu.co",
   "codigo": "YUI-1113-RDJ-9887"
  },
  {
   "identificacion": 19452365,
   "Nombres": "RIVERA SÁNCHEZ GUSTAVO ARMANDO",
   "Estamento": "Docente",
   "Correo": "gustavorivera11@hotmail.com",
   "codigo": "PIO-1114-WGZ-9886"
  },
  {
   "identificacion": 51665703,
   "Nombres": "RODRIGUEZ CASTILLO DIANA JEANNETH DEL PILAR",
   "Estamento": "Docente",
   "Correo": "drodriguez.castillo@fuac.edu.co",
   "codigo": "WYR-1115-ABA-9885"
  },
  {
   "identificacion": 11295336,
   "Nombres": "SABOGAL TAMAYO CARLOS IGNACIO",
   "Estamento": "Docente",
   "Correo": "carlos.sabogal@fuac.edu.co",
   "codigo": "YUI-1116-RDJ-9884"
  },
  {
   "identificacion": 79358436,
   "Nombres": "SARMIENTO BARRERA HEBER",
   "Estamento": "Docente",
   "Correo": "heber.sarmiento@fuac.edu.co",
   "codigo": "PIO-1117-WGZ-9883"
  },
  {
   "identificacion": 79364875,
   "Nombres": "SIERRA MERCHAN JORGE ELIECER",
   "Estamento": "Docente",
   "Correo": "jorge.sierra@fuac.edu.co",
   "codigo": "WYR-1118-ABA-9882"
  },
  {
   "identificacion": 79516670,
   "Nombres": "SUÁREZ ÓSCAR JARDEY",
   "Estamento": "Docente",
   "Correo": "oscar.suarez@fuac.edu.co",
   "codigo": "YUI-1119-RDJ-9881"
  },
  {
   "identificacion": 11435445,
   "Nombres": "SUÁREZ GAITÁN PEDRO WILMAR",
   "Estamento": "Docente",
   "Correo": "wilmar.suarez@fuac.edu.co",
   "codigo": "PIO-1120-WGZ-9880"
  },
  {
   "identificacion": 19481982,
   "Nombres": "SÁNCHEZ SÁNCHEZ FERNANDO",
   "Estamento": "Docente",
   "Correo": "fernando.sanchez@fuac.edu.co",
   "codigo": "WYR-1121-ABA-9879"
  },
  {
   "identificacion": 52113425,
   "Nombres": "TAPIAS SANDOVAL MARISOL DE LA ROSA",
   "Estamento": "Docente",
   "Correo": "marisol.tapias@fuac.edu.co",
   "codigo": "YUI-1122-RDJ-9878"
  },
  {
   "identificacion": 19470890,
   "Nombres": "TORRES GARAY ALEJANDRO MARIO",
   "Estamento": "Docente",
   "Correo": "alejandro.torres@fuac.edu.co",
   "codigo": "PIO-1123-WGZ-9877"
  },
  {
   "identificacion": 79663435,
   "Nombres": "VERA LEYTON JOSÉ MARCOS",
   "Estamento": "Docente",
   "Correo": "marrcosveraleyton@gmail.com",
   "codigo": "WYR-1124-ABA-9876"
  },
  {
   "identificacion": 80150503,
   "Nombres": "VERA VARGAS JUAN CARLOS",
   "Estamento": "Docente",
   "Correo": "juan.vera@fuac.edu.co",
   "codigo": "YUI-1125-RDJ-9875"
  },
  {
   "identificacion": 79671897,
   "Nombres": "YANES QUINTERO ANDRÉS FELIPE",
   "Estamento": "Docente",
   "Correo": "andres.yanes@fuac.edu.co",
   "codigo": "PIO-1126-WGZ-9874"
  }
 ];

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

