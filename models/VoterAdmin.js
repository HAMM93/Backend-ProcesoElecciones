const { Schema, model } = require('mongoose');


const voterAdminSchema = new Schema({
    identificacion: Number,
    Estamento: String,
    dateVoter: String,
    phone: String,
    email: String,
    votoAsamGeneral: String,
});

voterAdminSchema.set('toJSON',{
    transform: (documento, returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const VoterAdmin = model('VoterAdmin', voterAdminSchema);

module.exports = VoterAdmin;