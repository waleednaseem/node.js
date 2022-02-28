const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://waleedn:Teamwork!23@waleedcluster.1xtdi.mongodb.net/waleedDB?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
})
    .then(res => console.log('MONGO DB IS CONNECTED'))
    .catch(err => console.log(err))
