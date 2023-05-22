const { Schema, model } = require('mongoose');


const voterStudentSchema = new Schema({
    identificacion: Number,
    Estamento: String,
    dateVoter: String,
    Nombres: String,
    phone: String,
    email: String,
    votoAsamGeneral: String,
});

voterStudentSchema.set('toJSON',{
    transform: (documento, returnedObject)=>{
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const VoterStudent = model('voterStudent', voterStudentSchema);

module.exports = VoterStudent;