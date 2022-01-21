const questions = require('../schemas/questions')
const MessageEmbed = require ('discord.js')
const Discord = require ('discord.js')
const cron = require('cron')
const { MessageActionRow, MessageButton } = require('discord.js')
module.exports = (client, message) => {

let scheduledMessage = new cron.CronJob('00 00 08 * * *', () => {
    //Buttons
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setStyle('SUCCESS')
    .setLabel('Approve QOTD')
    .setCustomId('a')
    )
    .addComponents(
        new MessageButton()
        .setStyle('DANGER')
        .setLabel('Deny QOTD')
        .setCustomId('b')
    );

    questions.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, question) {

    const user = (questions.userId)
    var approvalChannel = client.channels.cache.get('934185651602071633')
    const approvalEmbed = new Discord.MessageEmbed()
    .setDescription(`**Question of The Day Approval**\n\n **${question.question}**\n Submitted by <@${question.userId}>\n\nPlease react below to approve this question!`)
    .setFooter('QOTD Bot, brought to you by Ruairiw8')
    .setTimestamp()
    .setColor('PURPLE')
    const qotdChannel = client.channels.cache.get('932750280121016371')

    approvalChannel.send({ embeds: [approvalEmbed], components: [row] })

    client.on('interactionCreate', async interaction => {
        const qotdEmbed = new Discord.MessageEmbed()
        .setDescription(`**Question of The Day**\n\n ${question.question}\n Submitted by <@${question.userId}>`)
        .setFooter('QOTD Bot, brought to you by Ruairiw8')
        .setTimestamp()
        .setColor('GREEN')

        if(!interaction.isButton()) return;
        if(interaction.customId === 'a') {
            qotdChannel.send({ embeds: [qotdEmbed] })
            await questions.deleteOne(question);
            message.channel.bulkDelete(1)
        }
        if(interaction.customId === 'b') {
            await questions.deleteOne(question);
            message.channel.bulkDelete(1)
            questions.findOne({}, {}, { sort: { 'created_at' : 1 } }, function(err, newQuestion) {
                message.channel.send({ embeds: [approvalEmbed], components: [row] })
            })
        }
     })

    })
            })
            scheduledMessage.start()
        }