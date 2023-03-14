const { Schema, model } = require('mongoose');

const voterTeachSchema = new Schema({
    documento: Number,
    estate: String,
    date: String,
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

const VoterTeach = model('VoterAdmin', voterTeachSchema);

module.exports = VoterTeach;