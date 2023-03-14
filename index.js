// require('./mongo.js')

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

// const VoterEgrese = require('./models/VoterEgrese');
// const VoterTeach = require('./models/VoterTeach');
// const VoterAdmin = require('./models/VoterAdmin');
// const { default: mongoose } = require('mongoose');


app.use(cors());
app.use(express.json());

const posiblesVotantes = [
  {
   "identificacion": 51993888,
   "Apellidos": "ACOSTA HERNANDEZ",
   "Nombres": "MARIA ESTHER",
   "Estamento": "Personal Administrativo",
   "codigo": "hh01-p09ww15-prue"
  },
  {
   "identificacion": 51780291,
   "Apellidos": "ALDANA CIFUENTES",
   "Nombres": "MYRIAM",
   "Estamento": "Personal Administrativo",
   "codigo": "hh02-p09ww16-prue"
  },
  {
   "identificacion": 51570769,
   "Apellidos": "ARDILA RAMÍREZ",
   "Nombres": "MARLENE",
   "Estamento": "Personal Administrativo",
   "codigo": "hh03-p09ww17-prue"
  },
  {
   "identificacion": 52531949,
   "Apellidos": "AREVALO",
   "Nombres": "NANCY LILIANA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh04-p09ww18-prue"
  },
  {
   "identificacion": 51865234,
   "Apellidos": "ARIAS RODRIGUEZ",
   "Nombres": "MARIA CONSTANZA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh05-p09ww19-prue"
  },
  {
   "identificacion": 36553572,
   "Apellidos": "ARREGOCES NUNEZ",
   "Nombres": "NULBIA ROSA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh06-p09ww20-prue"
  },
  {
   "identificacion": 52122924,
   "Apellidos": "ARÉVALO MOGOLLÓN",
   "Nombres": "LIDIA NEYFFY",
   "Estamento": "Personal Administrativo",
   "codigo": "hh07-p09ww21-prue"
  },
  {
   "identificacion": 79987418,
   "Apellidos": "BECERRA ANGARITA",
   "Nombres": "RODRIGO",
   "Estamento": "Personal Administrativo",
   "codigo": "hh08-p09ww22-prue"
  },
  {
   "identificacion": 1024494864,
   "Apellidos": "BEJARANO MEDINA",
   "Nombres": "VIVIANA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh09-p09ww23-prue"
  },
  {
   "identificacion": 39701912,
   "Apellidos": "BORRAEZ PUENTES",
   "Nombres": "JEANET",
   "Estamento": "Personal Administrativo",
   "codigo": "hh10-p09ww24-prue"
  },
  {
   "identificacion": 1024460774,
   "Apellidos": "CARDENAS MORALES",
   "Nombres": "YENY MARYTZA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh11-p09ww25-prue"
  },
  {
   "identificacion": 52021474,
   "Apellidos": "CARVAJAL RODRIGUEZ",
   "Nombres": "LUISA FERNANDA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh12-p09ww26-prue"
  },
  {
   "identificacion": 79393764,
   "Apellidos": "CASALLAS AVENDANO",
   "Nombres": "JOSE ALEXANDER",
   "Estamento": "Personal Administrativo",
   "codigo": "hh13-p09ww27-prue"
  },
  {
   "identificacion": 79583549,
   "Apellidos": "CASTIBLANCO FORERO",
   "Nombres": "BLADIMIR",
   "Estamento": "Personal Administrativo",
   "codigo": "hh14-p09ww28-prue"
  },
  {
   "identificacion": 39543822,
   "Apellidos": "CHALA PALACIOS",
   "Nombres": "DORA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh15-p09ww29-prue"
  },
  {
   "identificacion": 51835742,
   "Apellidos": "CHAMORRO RAMÍREZ",
   "Nombres": "ADELSABEL",
   "Estamento": "Personal Administrativo",
   "codigo": "hh16-p09ww30-prue"
  },
  {
   "identificacion": 51871336,
   "Apellidos": "CORENA GUTIERREZ",
   "Nombres": "ALEXA CRISTINA",
   "Estamento": "Personal Administrativo",
   "codigo": "hh17-p09ww31-prue"
  },
  {
   "identificacion": 51930264,
   "Apellidos": "CORENA GUTIERREZ",
   "Nombres": "ANA MERCEDES",
   "Estamento": "Personal Administrativo",
   "codigo": "hh18-p09ww32-prue"
  },
  {
   "identificacion": 79532622,
   "Apellidos": "CORREA MOTTA",
   "Nombres": "ANDRES",
   "Estamento": "Personal Administrativo",
   "codigo": "hh19-p09ww33-prue"
  },
  {
   "identificacion": 52113425,
   "Apellidos": "TAPIAS SANDOVAL",
   "Nombres": "MARISOL DE LA ROSA",
   "Estamento": "Docente",
   "codigo": "hh20-p09ww34-prue"
  },
  {
   "identificacion": 19470890,
   "Apellidos": "TORRES GARAY",
   "Nombres": "ALEJANDRO MARIO",
   "Estamento": "Docente",
   "codigo": "hh21-p09ww35-prue"
  },
  {
   "identificacion": 19407989,
   "Apellidos": "VELASQUEZ CONTRERAS",
   "Nombres": "ANDRES TARCISIO",
   "Estamento": "Docente",
   "codigo": "hh22-p09ww36-prue"
  },
  {
   "identificacion": 79663435,
   "Apellidos": "VERA LEYTON",
   "Nombres": "JOSÉ MARCOS",
   "Estamento": "Docente",
   "codigo": "hh23-p09ww37-prue"
  },
  {
   "identificacion": 79671897,
   "Apellidos": "YANES QUINTERO",
   "Nombres": "ANDRÉS FELIPE",
   "Estamento": "Docente",
   "codigo": "hh24-p09ww38-prue"
  },
  {
   "identificacion": 71608864,
   "Apellidos": "AGUDELO VELÁSQUEZ",
   "Nombres": "LEONARDO",
   "Estamento": "Docente",
   "codigo": "hh25-p09ww39-prue"
  },
  {
   "identificacion": 9521819,
   "Apellidos": "ALAIX AGUILAR",
   "Nombres": "RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "codigo": "hh26-p09ww40-prue"
  },
  {
   "identificacion": 91202085,
   "Apellidos": "ANGULO RICARDO",
   "Nombres": "MILTON",
   "Estamento": "Docente",
   "codigo": "hh27-p09ww41-prue"
  },
  {
   "identificacion": 80426866,
   "Apellidos": "ARIZA BELTRÁN",
   "Nombres": "DARÍO JAVIER",
   "Estamento": "Docente",
   "codigo": "hh28-p09ww42-prue"
  },
  {
   "identificacion": 8315380,
   "Apellidos": "BARRERA GALLÓN",
   "Nombres": "RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "codigo": "hh29-p09ww43-prue"
  },
  {
   "identificacion": 79125878,
   "Apellidos": "BARRETO FARFÁN",
   "Nombres": "JORGE ENRIQUE",
   "Estamento": "Docente",
   "codigo": "hh30-p09ww44-prue"
  },
  {
   "identificacion": 39706201,
   "Apellidos": "BELLO ESPINOSA",
   "Nombres": "MABEL",
   "Estamento": "Docente",
   "codigo": "hh31-p09ww45-prue"
  },
  {
   "identificacion": 19271274,
   "Apellidos": "BERNAL ACERO",
   "Nombres": "LUIS HORACIO",
   "Estamento": "Docente",
   "codigo": "hh32-p09ww46-prue"
  },
  {
   "identificacion": 19439460,
   "Apellidos": "BOLÍVAR MÉNDEZ",
   "Nombres": "ROBERTO ALONSO",
   "Estamento": "Docente",
   "codigo": "hh33-p09ww47-prue"
  },
  {
   "identificacion": 71616423,
   "Apellidos": "BROME SEPÚLVEDA",
   "Nombres": "WASHINGTON DE JESÚS",
   "Estamento": "Docente",
   "codigo": "hh34-p09ww48-prue"
  },
  {
   "identificacion": 80435510,
   "Apellidos": "BUITRAGO VALERO",
   "Nombres": "CARLOS JULIO",
   "Estamento": "Docente",
   "codigo": "hh35-p09ww49-prue"
  },
  {
   "identificacion": 30282756,
   "Apellidos": "BURITICA ARBOLEDA",
   "Nombres": "CLARA INÉS",
   "Estamento": "Docente",
   "codigo": "hh36-p09ww50-prue"
  },
  {
   "identificacion": 12126186,
   "Apellidos": "CABRERA GONZÁLEZ",
   "Nombres": "LUIS MIGUEL",
   "Estamento": "Docente",
   "codigo": "hh37-p09ww51-prue"
  },
  {
   "identificacion": 26861935,
   "Apellidos": "CARDENAS SÁNCHEZ",
   "Nombres": "NINFA STELLA",
   "Estamento": "Docente",
   "codigo": "hh38-p09ww52-prue"
  },
  {
   "identificacion": 19270867,
   "Apellidos": "CASTRO ALARCÓN",
   "Nombres": "HÉCTOR FERNANDO",
   "Estamento": "Docente",
   "codigo": "hh39-p09ww53-prue"
  },
  {
   "identificacion": 19327286,
   "Apellidos": "CASTRO FAJARDO",
   "Nombres": "GERMAN EDUARDO",
   "Estamento": "Docente",
   "codigo": "hh40-p09ww54-prue"
  },
  {
   "identificacion": 14270653,
   "Apellidos": "CONTRERAS CASTRO",
   "Nombres": "MARIO DUSTANO",
   "Estamento": "Docente",
   "codigo": "hh41-p09ww55-prue"
  },
  {
   "identificacion": 19426263,
   "Apellidos": "CONTRERAS SÁNCHEZ",
   "Nombres": "FERNANDO ALIRIO",
   "Estamento": "Docente",
   "codigo": "hh42-p09ww56-prue"
  },
  {
   "identificacion": 19393345,
   "Apellidos": "CORTÉS CASTRO",
   "Nombres": "JUAN PABLO",
   "Estamento": "Docente",
   "codigo": "hh43-p09ww57-prue"
  },
  {
   "identificacion": 92276367,
   "Apellidos": "GARCÍA ARRAZOLA",
   "Nombres": "ENRIQUE JOSÉ",
   "Estamento": "Docente",
   "codigo": "hh44-p09ww58-prue"
  },
  {
   "identificacion": 51590254,
   "Apellidos": "GUERRERO BARÓN",
   "Nombres": "MARTHA HELENA",
   "Estamento": "Docente",
   "codigo": "hh45-p09ww59-prue"
  },
  {
   "identificacion": 79564277,
   "Apellidos": "GUERRERO VARONA",
   "Nombres": "JORGE FERNANDO",
   "Estamento": "Docente",
   "codigo": "hh46-p09ww60-prue"
  },
  {
   "identificacion": 79650876,
   "Apellidos": "HERNANDEZ DIAZ",
   "Nombres": "CARLOS ARTURO",
   "Estamento": "Docente",
   "codigo": "hh47-p09ww61-prue"
  },
  {
   "identificacion": 19427113,
   "Apellidos": "HERRERA MORENO",
   "Nombres": "EFRAIN FERNANDO",
   "Estamento": "Docente",
   "codigo": "hh48-p09ww62-prue"
  },
  {
   "identificacion": 19438171,
   "Apellidos": "HURTADO MÁRQUEZ",
   "Nombres": "ALEJANDRO",
   "Estamento": "Docente",
   "codigo": "hh49-p09ww63-prue"
  },
  {
   "identificacion": 51802561,
   "Apellidos": "JARAMILLO MESA",
   "Nombres": "SANDRA PATRICIA",
   "Estamento": "Docente",
   "codigo": "hh50-p09ww64-prue"
  },
  {
   "identificacion": 19204617,
   "Apellidos": "LADINO PERALTA",
   "Nombres": "RAFAEL EDUARDO",
   "Estamento": "Docente",
   "codigo": "hh51-p09ww65-prue"
  },
  {
   "identificacion": 79109290,
   "Apellidos": "LARA RINCÓN",
   "Nombres": "RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "codigo": "hh52-p09ww66-prue"
  },
  {
   "identificacion": 79331644,
   "Apellidos": "LEON ACOSTA",
   "Nombres": "JUAN CARLOS",
   "Estamento": "Docente",
   "codigo": "hh53-p09ww67-prue"
  },
  {
   "identificacion": 17585342,
   "Apellidos": "LEÓN BENAVIDES",
   "Nombres": "ÉDGAR ARTURO",
   "Estamento": "Docente",
   "codigo": "hh54-p09ww68-prue"
  },
  {
   "identificacion": 19458753,
   "Apellidos": "LOMBANA SOSA",
   "Nombres": "RAFAEL HUMBERTO",
   "Estamento": "Docente",
   "codigo": "hh55-p09ww69-prue"
  },
  {
   "identificacion": 19371596,
   "Apellidos": "LOPEZ DUARTE",
   "Nombres": "JORGE ENRIQUE",
   "Estamento": "Docente",
   "codigo": "hh56-p09ww70-prue"
  },
  {
   "identificacion": 63283651,
   "Apellidos": "LUENGAS APONTE",
   "Nombres": "SANDRA",
   "Estamento": "Docente",
   "codigo": "hh57-p09ww71-prue"
  },
  {
   "identificacion": 17321750,
   "Apellidos": "LÓPEZ HERNÁNDEZ",
   "Nombres": "ALFREDO",
   "Estamento": "Docente",
   "codigo": "hh58-p09ww72-prue"
  },
  {
   "identificacion": 18410891,
   "Apellidos": "LÓPEZ SEPÚLVEDA",
   "Nombres": "JOSÉ HUMBERTO",
   "Estamento": "Docente",
   "codigo": "hh59-p09ww73-prue"
  },
  {
   "identificacion": 19383768,
   "Apellidos": "MALTES TELLO",
   "Nombres": "LUIS FRANCISCO",
   "Estamento": "Docente",
   "codigo": "hh60-p09ww74-prue"
  },
  {
   "identificacion": 8722736,
   "Apellidos": "MARTINEZ FUENTES",
   "Nombres": "RAFAEL SEGUNDO",
   "Estamento": "Docente",
   "codigo": "hh61-p09ww75-prue"
  },
  {
   "identificacion": 79432504,
   "Apellidos": "MARTÍNEZ MESA",
   "Nombres": "ÓSCAR RENÉ",
   "Estamento": "Docente",
   "codigo": "hh62-p09ww76-prue"
  },
  {
   "identificacion": 79486080,
   "Apellidos": "MELO MARTÍNEZ",
   "Nombres": "JULIO CÉSAR",
   "Estamento": "Docente",
   "codigo": "hh63-p09ww77-prue"
  },
  {
   "identificacion": 19065322,
   "Apellidos": "MILLÁN BUITRAGO",
   "Nombres": "LUIS FELIPE",
   "Estamento": "Docente",
   "codigo": "hh64-p09ww78-prue"
  },
  {
   "identificacion": 19271530,
   "Apellidos": "MORA CALVO",
   "Nombres": "JESUS DARIO",
   "Estamento": "Docente",
   "codigo": "hh65-p09ww79-prue"
  },
  {
   "identificacion": 19396518,
   "Apellidos": "MORALES CORTÉS",
   "Nombres": "ÉDGAR",
   "Estamento": "Docente",
   "codigo": "hh66-p09ww80-prue"
  },
  {
   "identificacion": 79485500,
   "Apellidos": "MORANTES SABOGAL",
   "Nombres": "LUIS OSWALDO",
   "Estamento": "Docente",
   "codigo": "hh67-p09ww81-prue"
  },
  {
   "identificacion": 80029461,
   "Nombres": "PRIETO MUÑOZ DIEGO ANDRES",
   "Estamento": "Egresados",
   "Fecha": "2023-03-01"
  },
  {
   "identificacion": 52544613,
   "Nombres": "PUERTO LAYTON CLAUDIA MARCELA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-02"
  },
  {
   "identificacion": 19494048,
   "Nombres": "PUERTO MORENO OSCAR",
   "Estamento": "Egresados",
   "Fecha": "2023-03-03"
  },
  {
   "identificacion": 40029917,
   "Nombres": "PULIDO ECHEVERRIA MARTHA JEANNETH",
   "Estamento": "Egresados",
   "Fecha": "2023-03-04"
  },
  {
   "identificacion": 79873616,
   "Nombres": "PULIDO MAYORQUIN ALEJANDRO",
   "Estamento": "Egresados",
   "Fecha": "2023-03-05"
  },
  {
   "identificacion": 51798876,
   "Nombres": "QUETE OVALLE NUBIA YANIRA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-06"
  },
  {
   "identificacion": 39746074,
   "Nombres": "QUINTANA MAHECHA LUZ MARINA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-07"
  },
  {
   "identificacion": 79844983,
   "Nombres": "QUIÑONES CETINA ABSALON RAUL",
   "Estamento": "Egresados",
   "Fecha": "2023-03-08"
  },
  {
   "identificacion": 28556735,
   "Nombres": "QUIÑONES LARA MARIA CONSTANZA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-09"
  },
  {
   "identificacion": 80093030,
   "Nombres": "RAMIREZ RODRIGUEZ WILSON ALEJANDRO",
   "Estamento": "Egresados",
   "Fecha": "2023-03-10"
  },
  {
   "identificacion": 41704799,
   "Nombres": "RAMOS DELGADO ELVIA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-11"
  },
  {
   "identificacion": 79855135,
   "Nombres": "RAMOS MARTINEZ FERNANDO ALBERTO",
   "Estamento": "Egresados",
   "Fecha": "2023-03-12"
  },
  {
   "identificacion": 41723327,
   "Nombres": "REYES GARCIA AURA EMELINA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-13"
  },
  {
   "identificacion": 1026253187,
   "Nombres": "REYES ROJAS WILMAR LEANDRO",
   "Estamento": "Egresados",
   "Fecha": "2023-03-14"
  },
  {
   "identificacion": 79275612,
   "Nombres": "RINCON CENDALES WILLIAM",
   "Estamento": "Egresados",
   "Fecha": "2023-03-15"
  },
  {
   "identificacion": 80187196,
   "Nombres": "RIOS VELASQUEZ ROBERT MILLER",
   "Estamento": "Egresados",
   "Fecha": "2023-03-16"
  },
  {
   "identificacion": 52154006,
   "Nombres": "ROA PAIPA SANDRA PATRICIA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-17"
  },
  {
   "identificacion": 1071163027,
   "Nombres": "ROA PIÑEROS NURY MARIELA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-18"
  },
  {
   "identificacion": 19459915,
   "Nombres": "ROBELTO ROMERO JOSÉ SAMUEL",
   "Estamento": "Egresados",
   "Fecha": "2023-03-19"
  },
  {
   "identificacion": 52729780,
   "Nombres": "RODRIGUEZ DIAZ MARIEN ANDREA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-20"
  },
  {
   "identificacion": 79846850,
   "Nombres": "RODRIGUEZ GOMEZ MANUEL",
   "Estamento": "Egresados",
   "Fecha": "2023-03-21"
  },
  {
   "identificacion": 3167381,
   "Nombres": "RODRIGUEZ MALPICA MILLER HUMBERTO",
   "Estamento": "Egresados",
   "Fecha": "2023-03-22"
  },
  {
   "identificacion": 24197557,
   "Nombres": "RODRIGUEZ MORENO LUZ MARINA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-23"
  },
  {
   "identificacion": 51662020,
   "Nombres": "RODRIGUEZ ROMERO OLGA OMAIRA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-24"
  },
  {
   "identificacion": 80232556,
   "Nombres": "RODRIGUEZ SOTO WOLFANG ANDRES",
   "Estamento": "Egresados",
   "Fecha": "2023-03-25"
  },
  {
   "identificacion": 52872750,
   "Nombres": "RODRIGUEZ VELASQUEZ DIANA YADIRA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-26"
  },
  {
   "identificacion": 82390336,
   "Nombres": "RODRÍGUEZ MÉNDEZ CÉSAR AUGUSTO",
   "Estamento": "Egresados",
   "Fecha": "2023-03-27"
  },
  {
   "identificacion": 39624714,
   "Nombres": "RODRÍGUEZ MÉNDEZ LAURA FERNANDA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-28"
  },
  {
   "identificacion": 52293481,
   "Nombres": "ROJAS ACERO CARMEN CECILIA",
   "Estamento": "Egresados",
   "Fecha": "2023-03-29"
  },
  {
   "identificacion": 52315675,
   "Nombres": "ROJAS SANCHEZ DIANA MABEL",
   "Estamento": "Egresados",
   "Fecha": "2023-03-30"
  },
  {
   "identificacion": 80118352,
   "Nombres": "RONDON FORERO EDGAR JAVIER",
   "Estamento": "Egresados",
   "Fecha": "2023-03-31"
  },
  {
   "identificacion": 79634001,
   "Nombres": "RUBIO GONZALEZ VICTOR HUGO",
   "Estamento": "Egresados",
   "Fecha": "2023-04-01"
  },
  {
   "identificacion": 52530530,
   "Nombres": "SALAZAR BLANCO MILENA NAYIBE",
   "Estamento": "Egresados",
   "Fecha": "2023-04-02"
  },
  {
   "identificacion": 52384663,
   "Nombres": "SALAZAR HERNANDEZ CONSTANZA MARCELA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-03"
  },
  {
   "identificacion": 79614360,
   "Nombres": "SANCHEZ BARON EVER HERNAN",
   "Estamento": "Egresados",
   "Fecha": "2023-04-04"
  },
  {
   "identificacion": 52109203,
   "Nombres": "SANCHEZ CHIPATECUA DIANA PATRICIA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-05"
  },
  {
   "identificacion": 52960865,
   "Nombres": "SANCHEZ SANCHEZ DIANA MILENA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-06"
  },
  {
   "identificacion": 53048056,
   "Nombres": "SANDOVAL ESPITIA DIANA CAROLINA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-07"
  },
  {
   "identificacion": 53063955,
   "Nombres": "SANTAMARIA ALFONSO LUZ MERY PAULINA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-08"
  },
  {
   "identificacion": 53077564,
   "Nombres": "SANTAMARIA TOLOZA CLAUDIA LORENA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-09"
  },
  {
   "identificacion": 79796080,
   "Nombres": "SARMIENTO BARRERO DANIEL ENRIQUE",
   "Estamento": "Egresados",
   "Fecha": "2023-04-10"
  },
  {
   "identificacion": 52053784,
   "Nombres": "SARMIENTO RODRIGUEZ ADRIANA CECILIA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-11"
  },
  {
   "identificacion": 7216330,
   "Nombres": "SATIVA TORRES SEGUNDO CARLOS MIGUEL",
   "Estamento": "Egresados",
   "Fecha": "2023-04-12"
  },
  {
   "identificacion": 3187321,
   "Nombres": "SIERRA CUERVO GERMAN",
   "Estamento": "Egresados",
   "Fecha": "2023-04-13"
  },
  {
   "identificacion": 80411553,
   "Nombres": "SOLER CONTRERAS MANUEL GUILLERMO",
   "Estamento": "Egresados",
   "Fecha": "2023-04-14"
  },
  {
   "identificacion": 52015576,
   "Nombres": "SUAREZ PARRA SANDRA JANETH",
   "Estamento": "Egresados",
   "Fecha": "2023-04-15"
  },
  {
   "identificacion": 21189679,
   "Nombres": "SUPELANO PEÑARETE MARTHA CONSTANZA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-16"
  },
  {
   "identificacion": 65739185,
   "Nombres": "SÁNCHEZ MEJÍA LILIANA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-17"
  },
  {
   "identificacion": 79838236,
   "Nombres": "TAPIERO JIMENEZ GIOVANNY JAIR",
   "Estamento": "Egresados",
   "Fecha": "2023-04-18"
  },
  {
   "identificacion": 52107021,
   "Nombres": "TIMARÁN MARÍN GLORIA ALEJANDRA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-19"
  },
  {
   "identificacion": 52522186,
   "Nombres": "TOLOSA ALVAREZ DIANA NORELA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-20"
  },
  {
   "identificacion": 51590083,
   "Nombres": "TORRES BELLO NANCY",
   "Estamento": "Egresados",
   "Fecha": "2023-04-21"
  },
  {
   "identificacion": 52714736,
   "Nombres": "TORRES TORRADO JULIETH",
   "Estamento": "Egresados",
   "Fecha": "2023-04-22"
  },
  {
   "identificacion": 52886662,
   "Nombres": "TRIANA BERNAL KELLY XIMENA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-23"
  },
  {
   "identificacion": 79388027,
   "Nombres": "TRIANA GOMEZ MIGUEL ALFONSO",
   "Estamento": "Egresados",
   "Fecha": "2023-04-24"
  },
  {
   "identificacion": 86072692,
   "Nombres": "TRIANA PARRADO ANDRES GUILLERMO",
   "Estamento": "Egresados",
   "Fecha": "2023-04-25"
  },
  {
   "identificacion": 22616165,
   "Nombres": "UCROS JINETE SANDRA MILENA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-26"
  },
  {
   "identificacion": 52718089,
   "Nombres": "ULLOA POVEDA LADY JOHANNA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-27"
  },
  {
   "identificacion": 53892055,
   "Nombres": "UMBA ERAZO ANA CECILIA",
   "Estamento": "Egresados",
   "Fecha": "2023-04-28"
  },
  {
   "identificacion": 51993383,
   "Nombres": "URIBE PARRA MARIA ISABEL",
   "Estamento": "Egresados",
   "Fecha": "2023-04-29"
  },
  {
   "identificacion": 17322428,
   "Nombres": "USECHE GUTIÉRREZ GILBERTO",
   "Estamento": "Egresados",
   "Fecha": "2023-04-30"
  },
  {
   "identificacion": 80544981,
   "Nombres": "VALBUENA GARCIA NELSON EDUARDO",
   "Estamento": "Egresados",
   "Fecha": "2023-05-01"
  }
 ];

let votantesAdmin = [];
let votantesTeach = [];
let votantesEgrese = [];
/**
 * retorta la lista de los posibles votantes
 */
app.get('/api/posiblesVotantes', (req, res) => { 
  res.json(posiblesVotantes);
  // VoterAdmin.find()
  //   .then((datos) => {
  //     res.json(datos);
  //   })
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
  let estadisticas ={}
  
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
app.get('/api/votantesRegistradosteach',(req,res)=>{
  res.json(votantesTeach);
});
app.get('/api/votantesRegistradosEgrese',(req,res)=>{
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
  const identificación = Number(req.params.id);
  console.log(identificación);
  const voter = posiblesVotantes.find(elemt => elemt.identificacion === identificación);
  res.json(voter);
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
  votantesAdmin = [...votantesAdmin, voter];
  res.status(201).json(voter);
})

app.post('/api/crearVotanteTeach', (req, res) => {
  const voter = req.body;
  if (!voter) {
    return res.status(400).json({
      error: 'voter is missing'
    });
  }
  votantesTeach = [...votantesTeach, voter];
  res.status(201).json(voter);
})

app.post('/api/crearVotanteEgrase', (req, res) => {
  const voter = req.body;
  if (!voter) {
    return res.status(400).json({
      error: 'voter is missing'
    });
  }
  votantesEgrese = [...votantesEgrese, voter];
  res.status(201).json(voter);
})

// const voterAdmin = new VoterAdmin({
//     documento: 51993888,
//     estate: 'Personal Administrativo',
//     date: new Date,
//     votoAsamGeneral: 'Voto En Blanco',
// })

// voterAdmin.save()
//     .then((datos)=>{
//         console.log(datos);
//         mongoose.connection.close();
//     })
//     .catch((err)=>{
//         console.log(err);
//         mongoose.connection.close();
//     })

app.use((req, res) => {
  return res.status(404).json({
    error: 'not found h'
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})