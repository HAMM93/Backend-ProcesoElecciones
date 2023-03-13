const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const posiblesVotantes = [{
    "Identificación": 51993888,
    "Apellidos": "ACOSTA HERNANDEZ",
    "Nombres": "MARIA ESTHER",
    "Estamento": "Personal Administrativo",
    "Fecha": "2023-03-01",
    "estado": 0
  },
  {
    "Identificación": 51780291,
    "Apellidos": "ALDANA CIFUENTES",
    "Nombres": "MYRIAM",
    "Estamento": "Personal Administrativo",
    "Fecha": "2023-03-02",
    "estado": 0
  },
  {
    "Identificación": 51570769,
    "Apellidos": "ARDILA RAMÍREZ",
    "Nombres": "MARLENE",
    "Estamento": "Personal Administrativo",
    "Fecha": "2023-03-03",
    "estado": 0
  },
  {
    "Identificación": 52531949,
    "Apellidos": "AREVALO",
    "Nombres": "NANCY LILIANA",
    "Estamento": "Personal Administrativo",
    "Fecha": "2023-03-04",
    "estado": 0
  }
]

let votantes =[]

/**
 * retorta la lista de los posibles votantes
 */
app.get('/api/posiblesVotantes', (req, res) => {
  res.json(posiblesVotantes);
})

/**
 * retorna la lista de los votantes que ya ejercieron su derecho
 */
 app.get('/api/votantesRegistrados',(req,res)=>{
  res.json(votantes);
})

/**
 * consulta un votante por identificacion
 */
app.get('/api/posiblesVotantes/:id', (req, res) => {
  const identificación = Number(req.params.id);
  console.log(identificación);
  const votante = posiblesVotantes.find(elemt => elemt.Identificación === identificación);
  if (votante){
  res.json(votante);

  }else{
  res.status(404).end();
  }
})

/**
 * añade un votante a la lista votantes
 */
app.post('/api/crearVotante',(req, res)=>{
  const voter = req.body;
  if(!voter){
    return res.status(400).json(
      {
        error: 'voter is missing'
      }
    );
  }
  votantes = [...votantes, voter];
  res.status(201).json(voter);
})

app.use((req,res)=>{
  return res.status(404).json({
    error: 'not found'
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


