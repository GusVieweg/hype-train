require("dotenv").config();

const express = require("express");
const { google } = require("googleapis");
const open = require("open");

const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/oauth2callback";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

// 🔐 IMPORTANT: include force consent to get refresh token
const SCOPES = ["https://www.googleapis.com/auth/youtube.force-ssl"];

app.get("/", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // <-- REQUIRED for refresh token
    prompt: "consent", // <-- forces refresh token every time
    scope: SCOPES,
  });

  res.send(`<a href="${url}">Authorize YouTube Access</a>`);

  console.log("Opening browser...");
  open(url);
});

app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n============================");
    console.log("REFRESH TOKEN (SAVE THIS):");
    console.log(tokens.refresh_token);
    console.log("============================\n");

    res.send("Success! You can close this tab.");

    process.exit(0);
  } catch (err) {
    console.error(err);
    res.send("Error retrieving token");
  }
});

app.listen(3000, () => {
  console.log("Go to http://localhost:3000");
});
