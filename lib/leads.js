import crypto from "crypto";
import axios from "axios";
import { google } from "googleapis";

export async function checkUserOnSendgridList(data) {
  const { contactEmail: email } = data;

  const apiUrl = process.env.SENDGRID_API_BASE_URL;
  const apiKey = process.env.SENDGRID_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;

  console.log(
    `[checkUserOnSendgridList] Verifying if user ${email} is in list ${listId}`
  );

  try {
    const response = await axios({
      method: "POST",
      url: `${apiUrl}/v3/marketing/contacts/search`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      data: {
        query: `email LIKE \'${email}%\' AND CONTAINS(list_ids, \'${listId}\')`,
      },
    });

    if (response.data.contact_count == 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function checkUserOnMailchimpList(data) {
  const { contactEmail: email } = data;

  const apiUrl = process.env.MAILCHIMP_API_BASE_URL;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;

  console.log(
    `[checkUserOnMailchimpList] Verifying if user ${email} is in list ${listId}`
  );

  try {
    const emailHash = crypto.createHash("md5").update(email).digest("hex");
    const response = await axios({
      method: "GET",
      url: `${apiUrl}/3.0/lists/${listId}/members/${emailHash}`,
      auth: {
        username: "apikey",
        password: apiKey,
      },
    });

    if (
      response.data.email_address == email &&
      response.data.status == "subscribed"
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function addUserSendgrid(data) {
  const { contactEmail: email, contactName: firstName } = data;

  const apiUrl = process.env.SENDGRID_API_BASE_URL;
  const apiKey = process.env.SENDGRID_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;

  console.log(`[addUserSendgrid] Adding user ${email} to list ${listId}`);

  const response = await axios({
    method: "PUT",
    url: `${apiUrl}/v3/marketing/contacts`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      list_ids: [listId],
      contacts: [
        {
          email: email,
          first_name: firstName,
        },
      ],
    },
  });

  if (response.status != 202) {
    throw new Error(`There was an error trying to add your user ${email}.`);
  }
}

export async function addUserMailchimp(data) {
  const { contactEmail: email } = data;

  const apiUrl = process.env.MAILCHIMP_API_BASE_URL;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;

  console.log(`[addUserMailchimp] Adding user ${email} to list ${listId}`);

  const response = await axios({
    method: "POST",
    url: `${apiUrl}/3.0/lists/${listId}/members?skip_merge_validation=true`,
    auth: {
      username: "apikey",
      password: apiKey,
    },
    data: {
      email_address: email,
      status: "subscribed",
    },
  });

  if (response.status != 200) {
    throw new Error(`There was an error trying to add your user ${email}.`);
  }
}

export async function sendWelcomeEmail(data) {
  const { contactEmail: toEmail, contactName: toName } = data;

  const apiUrl = process.env.SENDGRID_API_BASE_URL;
  const apiKey = process.env.SENDGRID_API_KEY;
  const senderEmail = process.env.SENDGRID_COMPANY_SENDER_EMAIL;
  const senderName = process.env.SENDGRID_COMPANY_SENDER_NAME;
  const templateId = process.env.SENDGRID_COMPANY_TEMPLATE_ID;

  console.log(`[sendWelcomeEmail] Sending welcome email to user ${toEmail}`);

  const response = await axios({
    method: "POST",
    url: `${apiUrl}/v3/mail/send`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      from: {
        email: senderEmail,
        name: senderName,
      },
      reply_to: {
        email: senderEmail,
        name: senderName,
      },
      to: [
        {
          email: toEmail,
          name: toName,
        },
      ],
      subject: "Thanks for your interest in luisalejandro.org!",
      personalizations: [
        {
          to: [
            {
              email: toEmail,
              name: toName,
            },
          ],
          subject: "Thanks for your interest in luisalejandro.org!",
          dynamic_template_data: {
            subject: "Thanks for your interest in luisalejandro.org!",
            toEmail: toEmail,
            toName: toName,
          },
        },
      ],
      template_id: templateId,
    },
  });

  if (response.status != 202) {
    throw new Error(
      `There was an error trying send a welcome email to ${toEmail}.`
    );
  }
}

export async function sendCompanyEmail(data) {
  const {
    contactEmail: replyToEmail,
    contactName: replyToName,
    contactMessage: senderMessage,
  } = data;

  const apiUrl = process.env.SENDGRID_API_BASE_URL;
  const apiKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.SENDGRID_COMPANY_LIST_EMAIL;
  const senderEmail = process.env.SENDGRID_COMPANY_SENDER_EMAIL;
  const senderName = process.env.SENDGRID_COMPANY_SENDER_NAME;
  const templateId = process.env.SENDGRID_COMPANY_TEMPLATE_ID;

  console.log(
    `[sendCompanyEmail] Sending message from ${senderEmail} to company list`
  );

  const response = await axios({
    method: "POST",
    url: `${apiUrl}/v3/mail/send`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    data: {
      from: {
        email: senderEmail,
        name: senderName,
      },
      reply_to: {
        email: replyToEmail,
        name: replyToName,
      },
      to: [
        {
          email: toEmail,
          name: "Contact",
        },
      ],
      subject: "New message on luisalejandro.org Contact Form",
      personalizations: [
        {
          to: [
            {
              email: toEmail,
              name: "Contact",
            },
          ],
          subject: "New message on luisalejandro.org Contact Form",
          dynamic_template_data: {
            subject: "New message on luisalejandro.org Contact Form",
            senderEmail: replyToEmail,
            senderName: replyToName,
            senderMessage: senderMessage,
          },
        },
      ],
      template_id: templateId,
    },
  });

  if (response.status != 202) {
    throw new Error(
      `There was an error trying send a company email from ${senderEmail}.`
    );
  }
}

const getGoogleClient = async (clientEmail, privateKey) => {
  try {
    return await google.auth.getClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  } catch (error) {
    throw new Error(error);
  }
};

const authorizeSheets = async (clientEmail, privateKey) => {
  try {
    const client = await getGoogleClient(clientEmail, privateKey);
    return await google.sheets({
      version: "v4",
      auth: client,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addSpreadsheetRow = async (data) => {
  const {
    contactEmail: email,
    contactName: name,
    contactMessage: message,
  } = data;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n");
  const sheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SPREADSHEET_NAME;

  console.log(
    `[addSpreadsheetRow] Logging message from ${email} on google spreadsheets`
  );

  const range = `${sheetName}!A3`;
  const date = new Date();
  const sheets = await authorizeSheets(clientEmail, privateKey);

  return await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[email, name, message, date]],
    },
  });
};
