module.exports ={
    port: process.env.PORT || 3300,
    db: process.env.MONGODB || 'mongodb://agalvis:admin@ds119446.mlab.com:19446/tradingideas',
    //db: process.env.MONGODB || 'mongodb://localhost:27017/Bitacora',
    SECRET_TOKEN:'G4lv1sr1v3r4',

    RESULT_GAME_POSITIVE: 'Positive',
    RESULT_GAME_NEGATIVE: 'Negative',
    RESULT_GAME_BREAK_EVEN: 'Break Even'


}