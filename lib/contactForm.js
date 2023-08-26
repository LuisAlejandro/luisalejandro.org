import axios from "axios";

import {
  addSpreadsheetRow,
  addUserMailchimp,
  addUserSendgrid,
  checkUserOnMailchimpList,
  checkUserOnSendgridList,
  sendCompanyEmail,
  sendWelcomeEmail,
} from "./leads";

export async function verifyCaptcha(token) {
  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_API_SECRET}&response=${token}`
    );
    if (res.data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export async function initLeadWorkflow(data) {
  let serverErrorMessage = "";
  let isUserOnSendgridList = false;
  let isUserOnMailchimpList = false;

  try {
    isUserOnSendgridList = await checkUserOnSendgridList(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[checkUserOnSendgridList] There was an error communicating with Sendgrid API."
    );
    console.error(error);
    throw error;
  }

  try {
    isUserOnMailchimpList = await checkUserOnMailchimpList(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[checkUserOnMailchimpList] There was an error communicating with Mailchimp API."
    );
    throw error;
  }

  try {
    if (!isUserOnSendgridList) {
      await addUserSendgrid(data);
    }
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[addUserSendgrid] There was an error communicating with Sendgrid API."
    );
    console.error(error);
    throw error;
  }

  try {
    if (!isUserOnMailchimpList) {
      await addUserMailchimp(data);
    }
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[addUserMailchimp] There was an error communicating with Mailchimp API."
    );
    console.error(error);
    throw error;
  }

  try {
    if (!isUserOnSendgridList && !isUserOnMailchimpList) {
      await sendWelcomeEmail(data);
    }
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[sendWelcomeEmail] There was an error communicating with Sendgrid API."
    );
    console.error(error);
    throw error;
  }

  try {
    await await sendCompanyEmail(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[sendCompanyEmail] There was an error communicating with Sendgrid API."
    );
    console.error(error);
    throw error;
  }

  try {
    await addSpreadsheetRow(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[addSpreadsheetRow] There was an error communicating with Google Cloud API."
    );
    console.error(error);
    throw error;
  }
}
