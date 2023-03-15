const { Schema, model } = require('mongoose');


const voterEgreseSchema = new Schema({
    identificacion: Number,
    Estamento: String,
    dateVoter: String,
    phone: String,
    email: String,
    votoAsamGeneral: String,
    votoConsSuperor: String,
    votoConsAcademico: String,
    votoConsFacuDerecho: String,
    votoBienestar: String,
});

voterEgreseSchema.set('toJSON',{
    transform: (documento, returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const VoterEgrese = model('VoterEgrese', voterEgreseSchema);

module.exports = VoterEgrese;