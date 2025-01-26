import axios from "axios";

import {
  addSpreadsheetRow,
  addUserMailchimp,
  createSESUser,
  checkUserOnMailchimpList,
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
  let isUserOnMailchimpList = false;

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
    await createSESUser(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[createSESUser] There was an error communicating with AWS API."
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
    if (!isUserOnMailchimpList) {
      await sendWelcomeEmail(data);
    }
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[sendWelcomeEmail] There was an error communicating with AWS API."
    );
    console.error(error);
    throw error;
  }

  try {
    await sendCompanyEmail(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    console.error(serverErrorMessage);
    console.error(
      "[sendCompanyEmail] There was an error communicating with AWS API."
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
