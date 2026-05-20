import fetch from "node-fetch";

const YOUTUBE_KEY = process.env.YOUTUBE_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

export async function getSubscriberCount() {
  const url =
    `https://www.googleapis.com/youtube/v3/channels` +
    `?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_KEY}`;

  console.log(url);

  const res = await fetch(url);
  const data = await res.json();

  const subs = data?.items?.[0]?.statistics?.subscriberCount;

  console.log(`Subscriber count pulled: ${subs}`);

  return Number(subs);
}
