import path from "node:path";

import { readFile } from "node:fs/promises";

import {
  CreateContactCommand,
  CreateContactListCommand,
  CreateEmailTemplateCommand,
  GetContactCommand,
  GetContactListCommand,
  GetEmailTemplateCommand,
  SendEmailCommand,
  SESv2Client,
} from "@aws-sdk/client-sesv2";
import {
  AWS_REGION,
  CONTACT_FORM_NAME,
  SES_COMPANY_LIST_EMAIL,
  SES_COMPANY_SENDER_EMAIL,
  SES_COMPANY_TEMPLATE_ID,
  SES_WELCOME_SENDER_EMAIL,
  SES_WELCOME_TEMPLATE_ID,
} from "@constants/constants";
import axios from "axios";
import crypto from "crypto";
import { google } from "googleapis";

const sesClient = () => {
  return new SESv2Client({
    region: AWS_REGION,
    apiVersion: "2010-12-01",
    credentials: {
      accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY || "",
    },
  });
};

const createSESContactList = async () => {
  const ses = sesClient();
  console.log(`[createContactList] Creating SES contact list`);
  try {
    const createContactList = new CreateContactListCommand({
      ContactListName: CONTACT_FORM_NAME,
    });
    await ses.send(createContactList);
    return true;
  } catch (error) {
    console.error(
      `[createContactList] There was an error creating the SES contact list.`
    );
    throw error;
  }
};

const checkIfSESListExists = async () => {
  const ses = sesClient();
  console.log(`[checkIfSESListExists] Checking if SES contact list exists`);

  try {
    const response = await ses.send(
      new GetContactListCommand({
        ContactListName: CONTACT_FORM_NAME,
      })
    );

    if (response.ContactListName == CONTACT_FORM_NAME) {
      return true;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const checkIfContactExists = async (email: any) => {
  const ses = sesClient();
  console.log(`[checkIfContactExists] Checking if contact ${email} exists`);

  try {
    const response = await ses.send(
      new GetContactCommand({
        EmailAddress: email,
        ContactListName: CONTACT_FORM_NAME,
      })
    );
    if (response.EmailAddress == email) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export async function createSESUser(data: any) {
  const { contactEmail: email } = data;

  const ses = sesClient();

  console.log(`[createSESUser] Adding user ${email} to SES contact list`);

  try {
    const listExists = await checkIfSESListExists();
    if (!listExists) {
      await createSESContactList();
    }
    const contactExists = await checkIfContactExists(email);
    if (!contactExists) {
      console.log(`[createSESUser] Creating contact ${email}`);
      await ses.send(
        new CreateContactCommand({
          EmailAddress: email,
          ContactListName: CONTACT_FORM_NAME,
        })
      );
    }
  } catch (error) {
    console.error(
      `[createSESUser] There was an error trying to add your user ${email}.`
    );
    throw error;
  }
}

// export async function checkUserOnSendgridList(data) {
//   const { contactEmail: email } = data;

//   const apiUrl = process.env.SENDGRID_API_BASE_URL;
//   const apiKey = process.env.SENDGRID_API_KEY;
//   const listId = process.env.SENDGRID_LIST_ID;

//   console.log(
//     `[checkUserOnSendgridList] Verifying if user ${email} is in list ${listId}`
//   );

//   try {
//     const response = await axios({
//       method: "POST",
//       url: `${apiUrl}/v3/marketing/contacts/search`,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//       },
//       data: {
//         query: `email LIKE \'${email}%\' AND CONTAINS(list_ids, \'${listId}\')`,
//       },
//     });

//     if (response.data.contact_count == 0) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export async function checkUserOnMailchimpList(data: any) {
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
        password: apiKey || "",
      },
    });

    if (
      response.data.email_address == email &&
      response.data.status == "subscribed"
    ) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

// export async function addUserSendgrid(data) {
//   const { contactEmail: email, contactName: firstName } = data;

//   const apiUrl = process.env.SENDGRID_API_BASE_URL;
//   const apiKey = process.env.SENDGRID_API_KEY;
//   const listId = process.env.SENDGRID_LIST_ID;

//   console.log(`[addUserSendgrid] Adding user ${email} to list ${listId}`);

//   const response = await axios({
//     method: "PUT",
//     url: `${apiUrl}/v3/marketing/contacts`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     data: {
//       list_ids: [listId],
//       contacts: [
//         {
//           email: email,
//           first_name: firstName,
//         },
//       ],
//     },
//   });

//   if (response.status != 202) {
//     throw new Error(`There was an error trying to add your user ${email}.`);
//   }
// }

export async function addUserMailchimp(data: any) {
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
      password: apiKey || "",
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

const createSESWelcomeTemplate = async () => {
  const ses = sesClient();
  console.log(`[createSESWelcomeTemplate] Creating SES template`);

  const basedir = process.cwd();
  const templateDir = path.join(basedir, "assets", "templates");
  const templatePath = path.join(templateDir, "welcome-template.html");
  const templateContent = await readFile(templatePath, "utf8");

  try {
    await ses.send(
      new CreateEmailTemplateCommand({
        TemplateName: SES_WELCOME_TEMPLATE_ID,
        TemplateContent: {
          Html: templateContent,
          Subject: "Thanks for your interest in luisalejandro.org!",
        },
      })
    );
    return true;
  } catch (error) {
    console.error(
      `[createSESWelcomeTemplate] There was an error creating the SES template.`
    );
    throw error;
  }
};

const checkIfSESWelcomeTemplateExists = async () => {
  const ses = sesClient();
  console.log(
    `[checkIfSESWelcomeTemplateExists] Checking if SES template exists`
  );

  try {
    const response = await ses.send(
      new GetEmailTemplateCommand({
        TemplateName: SES_WELCOME_TEMPLATE_ID,
      })
    );

    if (response.TemplateName == SES_WELCOME_TEMPLATE_ID) {
      return true;
    }
    return true;
  } catch (error) {
    return false;
  }
};

const createSESCompanyTemplate = async () => {
  const ses = sesClient();
  console.log(`[createSESCompanyTemplate] Creating SES template`);

  const basedir = process.cwd();
  const templateDir = path.join(basedir, "assets", "templates");
  const templatePath = path.join(templateDir, "company-template.html");
  const templateContent = await readFile(templatePath, "utf8");

  try {
    await ses.send(
      new CreateEmailTemplateCommand({
        TemplateName: SES_COMPANY_TEMPLATE_ID,
        TemplateContent: {
          Html: templateContent,
          Subject: "New message from luisalejandro.org",
        },
      })
    );
    return true;
  } catch (error) {
    console.error(
      `[createSESCompanyTemplate] There was an error creating the SES template.`
    );
    throw error;
  }
};

const checkIfSESCompanyTemplateExists = async () => {
  const ses = sesClient();
  console.log(
    `[checkIfSESCompanyTemplateExists] Checking if SES template exists`
  );

  try {
    const response = await ses.send(
      new GetEmailTemplateCommand({
        TemplateName: SES_COMPANY_TEMPLATE_ID,
      })
    );

    if (response.TemplateName == SES_COMPANY_TEMPLATE_ID) {
      return true;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export async function sendWelcomeEmail(data: any) {
  const { contactEmail: toEmail, contactName: toName } = data;

  const ses = sesClient();
  console.log(`[sendWelcomeEmail] Sending welcome email to user ${toEmail}`);

  try {
    const templateExists = await checkIfSESWelcomeTemplateExists();
    if (!templateExists) {
      await createSESWelcomeTemplate();
    }

    const response = await ses.send(
      new SendEmailCommand({
        Content: {
          Template: {
            TemplateName: SES_WELCOME_TEMPLATE_ID,
            TemplateData: JSON.stringify({
              subject: "Thanks for your interest in luisalejandro.org!",
              toEmail,
              toName,
            }),
          },
        },
        Destination: {
          ToAddresses: [toEmail],
        },
        ReplyToAddresses: [SES_WELCOME_SENDER_EMAIL],
        FromEmailAddress: SES_WELCOME_SENDER_EMAIL,
      })
    );

    if (response.MessageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(
      `[sendWelcomeEmail] There was an error trying send a welcome email to ${toEmail}.`
    );
    throw error;
  }
}

export async function sendCompanyEmail(data: any) {
  const {
    contactEmail: replyToEmail,
    contactName: replyToName,
    contactMessage: senderMessage,
  } = data;

  const ses = sesClient();

  console.log(
    `[sendCompanyEmail] Sending message from ${replyToEmail} to company list`
  );

  try {
    const templateExists = await checkIfSESCompanyTemplateExists();
    if (!templateExists) {
      await createSESCompanyTemplate();
    }

    const response = await ses.send(
      new SendEmailCommand({
        Content: {
          Template: {
            TemplateName: SES_COMPANY_TEMPLATE_ID,
            TemplateData: JSON.stringify({
              subject: "New message from luisalejandro.org",
              senderEmail: replyToEmail,
              senderName: replyToName,
              senderMessage,
            }),
          },
        },
        Destination: {
          ToAddresses: [SES_COMPANY_LIST_EMAIL],
        },
        ReplyToAddresses: [replyToEmail],
        FromEmailAddress: SES_COMPANY_SENDER_EMAIL,
      })
    );

    if (response.MessageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(
      `[sendCompanyEmail] There was an error trying send a company email from ${replyToEmail}.`
    );
    throw error;
  }
}

// export async function sendWelcomeEmail(data) {
//   const { contactEmail: toEmail, contactName: toName } = data;

//   const apiUrl = process.env.SENDGRID_API_BASE_URL;
//   const apiKey = process.env.SENDGRID_API_KEY;
//   const senderEmail = process.env.SENDGRID_WELCOME_SENDER_EMAIL;
//   const senderName = process.env.SENDGRID_WELCOME_SENDER_NAME;
//   const templateId = process.env.SENDGRID_WELCOME_TEMPLATE_ID;

//   console.log(`[sendWelcomeEmail] Sending welcome email to user ${toEmail}`);

//   const response = await axios({
//     method: "POST",
//     url: `${apiUrl}/v3/mail/send`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     data: {
//       from: {
//         email: senderEmail,
//         name: senderName,
//       },
//       reply_to: {
//         email: senderEmail,
//         name: senderName,
//       },
//       to: [
//         {
//           email: toEmail,
//           name: toName,
//         },
//       ],
//       subject: "Thanks for your interest in luisalejandro.org!",
//       personalizations: [
//         {
//           to: [
//             {
//               email: toEmail,
//               name: toName,
//             },
//           ],
//           subject: "Thanks for your interest in luisalejandro.org!",
//           dynamic_template_data: {
//             subject: "Thanks for your interest in luisalejandro.org!",
//             toEmail: toEmail,
//             toName: toName,
//           },
//         },
//       ],
//       template_id: templateId,
//     },
//   });

//   if (response.status != 202) {
//     throw new Error(
//       `There was an error trying send a welcome email to ${toEmail}.`
//     );
//   }
// }

// export async function sendCompanyEmail(data) {
//   const {
//     contactEmail: replyToEmail,
//     contactName: replyToName,
//     contactMessage: senderMessage,
//   } = data;

//   const apiUrl = process.env.SENDGRID_API_BASE_URL;
//   const apiKey = process.env.SENDGRID_API_KEY;
//   const toEmail = process.env.SENDGRID_COMPANY_LIST_EMAIL;
//   const senderEmail = process.env.SENDGRID_COMPANY_SENDER_EMAIL;
//   const senderName = process.env.SENDGRID_COMPANY_SENDER_NAME;
//   const templateId = process.env.SENDGRID_COMPANY_TEMPLATE_ID;

//   console.log(
//     `[sendCompanyEmail] Sending message from ${senderEmail} to company list`
//   );

//   const response = await axios({
//     method: "POST",
//     url: `${apiUrl}/v3/mail/send`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     data: {
//       from: {
//         email: senderEmail,
//         name: senderName,
//       },
//       reply_to: {
//         email: replyToEmail,
//         name: replyToName,
//       },
//       to: [
//         {
//           email: toEmail,
//           name: "Contact",
//         },
//       ],
//       subject: "New message on luisalejandro.org Contact Form",
//       personalizations: [
//         {
//           to: [
//             {
//               email: toEmail,
//               name: "Contact",
//             },
//           ],
//           subject: "New message on luisalejandro.org Contact Form",
//           dynamic_template_data: {
//             subject: "New message on luisalejandro.org Contact Form",
//             senderEmail: replyToEmail,
//             senderName: replyToName,
//             senderMessage: senderMessage,
//           },
//         },
//       ],
//       template_id: templateId,
//     },
//   });

//   if (response.status != 202) {
//     throw new Error(
//       `There was an error trying send a company email from ${senderEmail}.`
//     );
//   }
// }

const getGoogleClient = async (clientEmail: any, privateKey: any) => {
  try {
    return await google.auth.getClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

const authorizeSheets = async (clientEmail: any, privateKey: any) => {
  try {
    const client = await getGoogleClient(clientEmail, privateKey);
    return await google.sheets({
      version: "v4",
      auth: client,
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addSpreadsheetRow = async (data: any) => {
  const {
    contactEmail: email,
    contactName: name,
    contactMessage: message,
  } = data;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n");
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
    requestBody: {
      values: [[email, name, message, date]],
    },
  });
};
