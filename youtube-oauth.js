import { google } from "googleapis";

export function getYoutubeClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  return google.youtube({
    version: "v3",
    auth: oauth2Client,
  });
}
