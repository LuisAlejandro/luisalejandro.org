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
  let isUserOnMailchimpList = false;

  try {
    console.log(
      `[initLeadWorkflow] Checking user on Mailchimp list ${data?.contactEmail}`
    );
    isUserOnMailchimpList = (await checkUserOnMailchimpList(data)) || false;
  } catch (error) {
    logError("init-lead-workflow-check-mailchimp", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    console.log(`[initLeadWorkflow] Creating SES user ${data?.contactEmail}`);
    await createSESUser(data);
  } catch (error) {
    logError("init-lead-workflow-create-ses-user", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    if (!isUserOnMailchimpList) {
      console.log(
        `[initLeadWorkflow] Adding user to Mailchimp list ${data?.contactEmail}`
      );
      await addUserMailchimp(data);
    }
  } catch (error) {
    logError("init-lead-workflow-add-mailchimp", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    if (!isUserOnMailchimpList) {
      console.log(
        `[initLeadWorkflow] Sending welcome email to ${data?.contactEmail}`
      );
      await sendWelcomeEmail(data);
    }
  } catch (error) {
    logError("init-lead-workflow-send-welcome-email", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    console.log(
      `[initLeadWorkflow] Sending company email to ${data?.contactEmail}`
    );
    await sendCompanyEmail(data);
  } catch (error) {
    logError("init-lead-workflow-send-company-email", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }

  try {
    console.log(
      `[initLeadWorkflow] Adding spreadsheet row to ${data?.contactEmail}`
    );
    await addSpreadsheetRow(data);
  } catch (error) {
    logError("init-lead-workflow-add-spreadsheet-row", error, {
      userEmail: data?.contactEmail,
    });
    throw error;
  }
}
