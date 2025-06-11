import axios from "axios";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const twitchSigningSecret = process.env.TWITCH_SIGNING_SECRET;
const githubPersonalAccessToken = process.env.REPO_PERSONAL_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const messageId = request.headers.get("twitch-eventsub-message-id");
    const timestamp = request.headers.get("twitch-eventsub-message-timestamp");
    const messageSignature = request.headers.get(
      "twitch-eventsub-message-signature"
    );
    const messageType = request.headers.get("twitch-eventsub-message-type");
    const time = Math.floor(new Date().getTime() / 1000);

    if (!messageId || !timestamp || !messageSignature || !messageType) {
      throw new Error("Missing required Twitch headers.");
    }

    if (Math.abs(time - parseInt(timestamp)) > 600) {
      // needs to be < 10 minutes
      throw new Error(
        `Verification Failed: timestamp > 10 minutes. Message Id: ${messageId}.`
      );
    }

    if (!twitchSigningSecret) {
      throw new Error("Twitch signing secret is empty.");
    }

    const body = await request.text();
    const computedSignature =
      "sha256=" +
      crypto
        .createHmac("sha256", twitchSigningSecret)
        .update(messageId + timestamp + body)
        .digest("hex");

    if (messageSignature !== computedSignature) {
      throw new Error("Invalid signature.");
    }

    const parsedBody = JSON.parse(body);

    if (messageType === "webhook_callback_verification") {
      return new NextResponse(parsedBody.challenge, { status: 200 });
    } else if (messageType === "notification") {
      const { subscription } = parsedBody;
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

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Twitch webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
