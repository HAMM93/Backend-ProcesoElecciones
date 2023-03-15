const { Schema, model } = require('mongoose');

const likelyVoterSchema = new Schema({
    identificacion : Number,
    Apellidos: String,
    Nombres: String,
    Estamento: String,
    Fecha: String,
    codigo: String,
    Facultad: String,
});

likelyVoterSchema.set('toJSON',{
    transform: (documento, returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const LikelyVoter = model('LikelyVoter', likelyVoterSchema);

module.exports = LikelyVoter;