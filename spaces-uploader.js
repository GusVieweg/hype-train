import "dotenv/config";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1", // required but ignored by Spaces
  endpoint: process.env.SPACES_ENDPOINT, // change if different region
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
});

export async function uploadBannerToSpaces(buffer) {
  const key = "banner/latest.png";

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: "image/png",

      // IMPORTANT: makes it publicly readable
      ACL: "public-read",
    }),
  );

  return `https://${process.env.SPACES_BUCKET}.nyc3.digitaloceanspaces.com/${key}`;
}
