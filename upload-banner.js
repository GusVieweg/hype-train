import { getYoutubeClient } from "./youtube-oauth.js";
import fs from "fs";

export async function uploadBanner() {
  const youtube = getYoutubeClient();

  const bannerUpload = await youtube.channelBanners.insert({
    media: {
      mimeType: "image/jpeg",
      body: fs.createReadStream("./banner.jpg"),
    },
  });

  const uploadedBannerUrl = bannerUpload.data.url;
  console.log("Uploaded to YouTube storage.");

  const current = await youtube.channels.list({
    mine: true,
    part: "brandingSettings",
  });

  const brandingSettings = current.data.items[0].brandingSettings;

  brandingSettings.image = {
    bannerExternalUrl: uploadedBannerUrl,
  };

  await youtube.channels.update({
    part: "brandingSettings",
    requestBody: {
      id: process.env.CHANNEL_ID,
      brandingSettings,
    },
  });

  console.log("Banner updated!");
}
