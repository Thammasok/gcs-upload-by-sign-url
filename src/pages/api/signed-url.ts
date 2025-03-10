import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'

import { NextApiRequest, NextApiResponse } from 'next'

const PUBLIC_GOOGLE_STORAGE = 'https://storage.googleapis.com'
const MIMETYPE = {
  JPEG: 'image/jpeg',
  MP4: 'video/mp4',
  PNG: 'image/png',
}

const MAXIMUM_FILE_SIZE = 1048576 * 20 // 20MB

const SUPPORTED_CONTENT_TYPES = [MIMETYPE.JPEG, MIMETYPE.PNG, MIMETYPE.MP4]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // get query param
  const contentType = req.query.contentType as string
  if (!contentType || !SUPPORTED_CONTENT_TYPES.includes(contentType)) {
    res.status(400).json({ message: 'contentType is invalid' })
    return
  }

  const storage = new Storage({ keyFilename: 'gs-beta-demo-service-account.json' })
  const extensionHeaders = {
    'x-goog-acl': 'public-read',
    'x-goog-content-length-range': [0, MAXIMUM_FILE_SIZE].join(','),
  }

  const fileName = uuidv4()
  const fileNameWithPath = `some_path/${fileName}.${contentType.split('/')[1]}`
  const bucketName = 'gs-signed-url-upload-example'
  const [url] = await storage
    .bucket(bucketName)
    .file(fileNameWithPath)
    .getSignedUrl({
      action: 'write',
      version: 'v4',
      expires: Date.now() + 10 * 60 * 1000, // link expire in 10 minutes
      contentType: contentType,
      extensionHeaders: extensionHeaders,
    })

  const headers = {
    'Content-Type': contentType,
    ...extensionHeaders,
  }

  const publicUrl = [PUBLIC_GOOGLE_STORAGE, bucketName, fileNameWithPath].join('/')

  res.status(200).json({ signedUrl: url, headers, publicUrl })
}
