import { WebClient } from "@slack/web-api";

async function sendToSlack(channelName, message) {
  // sends an array to give slack channel in a text friendly manner
  const token = process.env.SLACK_BOT_TOKEN;
  const web = new WebClient(token);
  let response;

  await (async () => {
    // const channel = "C02GV11HNCF";

    response = await web.conversations.list();
    let channelObj = response.channels.find((ch) => ch.name === channelName);

    // send a message!
    response = await web.chat.postMessage({
      text: message,
      channel: channelObj.id,
    });
  })();

  if (response) return response;
  else return "no response";
}

export { sendToSlack };
