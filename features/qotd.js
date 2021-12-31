const mongo = require('../mongo');
const questionSchema = require('../schemas/questions');

module.exports = (client) => {}

module.exports.addQuestion = async (userId, question) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOneAndUpdate()');

            const result = await questionSchema.findOneAndUpdate(
                {
                    userId,
                },
                {
                    userId,
                    question,
                },
                {
                    upsert: true,
                    new: true,
                }
            )
            console.log('RESULT:', result)
} finally {
    mongoose.connection.close
}})}

module.exports.drawQuestion = async (client, message) => {
    questionSchema.findOne({}, {}, { sort: { 'created_at' : 1 } }, async function(err, question) {
        var qotdChannel = client.channels.cache.get('908084455518908466')
        const user = (question.userId)
        console.log(user)
        qotdChannel.send(new Discord.MessageEmbed().setDescription(`**Question of The Day**\n\n ${question.question}\n Submitted by <@${user}>`).setFooter('QOTD Bot, brought to you by Ruairiw8').setTimestamp().setColor('GREEN'));
        await questions.deleteOne(question);
}
    )
    }