const questions = require('../schemas/questions')

module.exports = {
    callback: async ({ message, args, text, client, prefix, instance }) => {
        questions.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, question) {
            console.log( question );
          });
    }
}