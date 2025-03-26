const venom = require('venom-bot');
const birthdays = require('./birthdays.json');

const today = new Date();
const todayStr = ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);

const matches = birthdays.filter(entry => entry.birthday === todayStr);

if (matches.length === 0) {
  console.log("No birthdays today!");
  process.exit(0);
}

const message = matches.map(entry => `It's  ${entry.name}'s birthday today! Happy birthday!!🥳🥳🎂🎉`).join('\n');

venom
  .create({
    session: 'birthday-bot',
  })
  .then(client => {
    sendBirthdayMessage(client, message);
  })
  .catch(error => {
    console.error(error);
  });

function sendBirthdayMessage(client, message) {
  const groupName = 'MyGroupChat'; // <<< change this to your group name

  client.getAllChats().then(chats => {
    const group = chats.find(chat => chat.name === groupName);
    if (!group) {
      console.error("Group not found!");
      return;
    }

    client.sendText(group.id._serialized, message).then(() => {
      console.log("Birthday message sent!");
    }).catch(err => {
      console.error("Error sending message:", err);
    });
  });
}
