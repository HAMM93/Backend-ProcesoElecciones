const { Schema, model } = require('mongoose');

const voterTeachSchema = new Schema({
    identificacion: Number,
    Estamento: String,
    dateVoter: String,
    phone: String,
    email: String,
    votoAsamGeneral: String,
    votoConsSuperor: String,
});

voterTeachSchema.set('toJSON',{
    transform: (documento, returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const VoterTeach = model('VoterTeach', voterTeachSchema);

module.exports = VoterTeach;