import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const REGION = process.env.AWS_REGION || 'ap-south-2';
const BUCKET = process.env.AWS_S3_BUCKET || 'aitacademy';

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

export const getPublicS3Url = (key) => {
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
};

export async function uploadBufferToS3({ buffer, originalName, mimeType, folder = 'vride-media' }) {
  const safeName = (originalName || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `${folder}/${Date.now()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentType: mimeType || 'application/octet-stream'
  });

  await s3Client.send(command);

  return {
    bucket: BUCKET,
    region: REGION,
    key,
    url: getPublicS3Url(key),
    mimeType,
    size: buffer.length
  };
}

export async function listS3Media(prefix = '') {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: prefix || undefined,
    MaxKeys: 200
  });

  const response = await s3Client.send(command);
  const items = (response.Contents || []).map((obj) => ({
    key: obj.Key,
    url: getPublicS3Url(obj.Key),
    size: obj.Size,
    lastModified: obj.LastModified
  }));

  return {
    bucket: BUCKET,
    region: REGION,
    count: items.length,
    items
  };
}

export async function deleteS3Object(key) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key
  });
  await s3Client.send(command);
  return { deleted: true, key };
}

export async function createPresignedPutUrl(key, contentType = 'image/jpeg') {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType
  });
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  return {
    uploadUrl,
    key,
    publicUrl: getPublicS3Url(key)
  };
}
