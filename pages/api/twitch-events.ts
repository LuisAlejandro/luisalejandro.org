import axios from "axios";
import crypto from "crypto";

const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const githubPersonalAccessToken = process.env.REPO_PERSONAL_ACCESS_TOKEN;

export default async function twitchEvents(req, res) {
  const messageId = req.headers["twitch-eventsub-message-id"];
  const timestamp = req.headers["twitch-eventsub-message-timestamp"];
  const messageSignature = req.headers["twitch-eventsub-message-signature"];
  const messageType = req.headers["twitch-eventsub-message-type"];
  const time = Math.floor(new Date().getTime() / 1000);

  if (Math.abs(time - timestamp) > 600) {
    // needs to be < 10 minutes
    throw new Error(`Verification Failed: timestamp > 10 minutes. Message Id: ${messageId}.`);
  }

  if (!twitchSigningSecret) {
    throw new Error("Twitch signing secret is empty.");
  }

  const buf = JSON.stringify(req.body);
  const computedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", twitchSigningSecret)
      .update(messageId + timestamp + buf)
      .digest("hex");

  if (messageSignature !== computedSignature) {
    throw new Error("Invalid signature.");
  }

  if (messageType === "webhook_callback_verification") {
    return res.status(200).send(req.body.challenge);
  } else if (messageType === "notification") {
    const { subscription } = req.body;
    if (subscription.type === "stream.online") {
      await axios.post(
        "https://api.github.com/repos/LuisAlejandro/frontdesk/dispatches",
        { event_type: "stream-online" },
        {
          headers: {
            Authorization: `Bearer ${githubPersonalAccessToken}`,
            Accept: "application/vnd.github+json",
          },
        }
      );
    }
  }

  return res.status(200).json({});
}
