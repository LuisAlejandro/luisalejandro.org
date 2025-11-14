import axios from "axios";

import { logError } from "@lib/logger";
import {
  addSpreadsheetRow,
  addUserMailchimp,
  checkUserOnMailchimpList,
  createSESUser,
  sendCompanyEmail,
  sendWelcomeEmail,
} from "./leads";

export async function verifyCaptcha(token: any) {
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
    logError("verify-captcha", error);
    return false;
  }
}

export async function initLeadWorkflow(data: any) {
  let serverErrorMessage = "";
  let isUserOnMailchimpList = false;

  try {
    isUserOnMailchimpList = (await checkUserOnMailchimpList(data)) || false;
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    logError("init-lead-workflow-check-mailchimp", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    await createSESUser(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    logError("init-lead-workflow-create-ses-user", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    if (!isUserOnMailchimpList) {
      await addUserMailchimp(data);
    }
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    logError("init-lead-workflow-add-mailchimp", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    if (!isUserOnMailchimpList) {
      await sendWelcomeEmail(data);
    }
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    logError("init-lead-workflow-send-welcome-email", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    await sendCompanyEmail(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    logError("init-lead-workflow-send-company-email", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    await addSpreadsheetRow(data);
  } catch (error) {
    serverErrorMessage =
      "Error in server operation: external service communication problem.";
    logError("init-lead-workflow-add-spreadsheet-row", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }
}
