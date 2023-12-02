import axios from "axios";
import crypto from "crypto";

const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const githubPersonalAccessToken = process.env.REPO_PERSONAL_ACCESS_TOKEN;

export default async function twitchEvents(req, res) {
  const messageId = req.header["Twitch-Eventsub-Message-Id"];
  const timestamp = req.header["Twitch-Eventsub-Message-Timestamp"];
  const messageSignature = req.header["Twitch-Eventsub-Message-Signature"];
  const messageType = req.header["Twitch-Eventsub-Message-Type"];
  const time = Math.floor(new Date().getTime() / 1000);

  console.log(`Message ${messageId} Signature: `, messageSignature);

  if (Math.abs(time - timestamp) > 600) {
    // needs to be < 10 minutes
    console.log(
      `Verification Failed: timestamp > 10 minutes. Message Id: ${messageId}.`
    );
    throw new Error("Ignore this request.");
  }

  if (!twitchSigningSecret) {
    console.log(`Twitch signing secret is empty.`);
    throw new Error("Twitch signing secret is empty.");
  }

  const buf = req.rawBody.toString();
  const computedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", twitchSigningSecret)
      .update(messageId + timestamp + buf)
      .digest("hex");

  console.log(`Message ${messageId} Computed Signature: `, computedSignature);

  if (messageSignature !== computedSignature) {
    throw new Error("Invalid signature.");
  } else {
    console.log("Verification successful");
  }

  if (messageType === "webhook_callback_verification") {
    console.log("Verifying Webhook");
    return res.status(200).send(req.body.challenge);
  } else if (messageType === "notification") {
    const { event, subscription } = req.body;
    if (subscription.type === "stream.online") {
      const result = await axios.post(
        "https://api.github.com/repos/LuisAlejandro/frondesk/dispatches",
        { event_type: "stream-online" },
        {
          headers: {
            Authorization: `Bearer ${githubPersonalAccessToken}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
      console.log(result);
    }
  }

  return res.status(200).json({});
}
