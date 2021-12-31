const Discord = require('discord.js');
const discord = require('discord.js');
const questions = require('../schemas/questions.js');
const mongo = require('../mongo');
const squareRegex = RegExp(/\[[^[]+\]/g);
const mongoose = require('mongoose');
const { MessageEmbed } = require('discord.js');
const qotd = require('../features/qotd')

module.exports ={
    commands: 'qotd',
    expectedArgs: "!qotd <message>",
    category: 'Fun',
    description: 'Submit a QOTD (DM Only)',
    callback: async ({ message, args, text, client, prefix, instance }) => {
        if(message.channel.type == 'DM') {
            const tooShort = new discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`☹️ | Submitted question is too short`);

            const tooLong = new discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`☹️ | Submitted question too long`)

          let userId = message.author.id
          const question = args.join(' ');
          const noQuestion = new MessageEmbed().setColor('GREEN').setDescription(`☹️ | No question specified`);
          if(!question) message.reply(noQuestion)
            if(question.length < 10) {
                message.channel.send({ embeds: [tooShort] })
                return
        }
            if(question.length > 125) {
                message.channel.send({ embeds: [tooLong] })
                return
        }

          const find = await questions.findOne({
            userId: userId
          })

          const addedQOTD = await qotd.addQuestion(userId, question)  

          if(find) {
            const result = await questions.findOneAndUpdate({
                userId
            }, {
                userId,
                question
            }, {
                upsert: true,
                new: true
            })
            console.log(result)
          } else {
            let newQOTD = new questions({
                userId: message.author.id,
                question: question
                })
      
                await newQOTD.save()
                      .catch(err => { console.log( err ) })
          }

          const submitedQOTD = new Discord.MessageEmbed()
            .setDescription(`🎉 | Your question has been submitted!\n Question: ${question}`)
            .setFooter('QOTD Bot, brought to you by Ruairiw8')
            .setTimestamp()
            .setColor('GREEN')

            message.channel.send({ embeds: [submitedQOTD] })
      } else {
        message.reply('This command can only be used in a dm!')
      }
      }
    };
