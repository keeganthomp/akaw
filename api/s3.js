import { RNS3 } from 'react-native-s3-upload'

import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY } from 'react-native-dotenv'

const BUCKET_NAME = 'surfing-it-profile-pictures'
const AWS_REGION = 'us-west-1'

export const uploadImageOnS3 = ({
  uri,
  bucketName = null,
  username,
  imageName = 'image'
}) => {
  const file = {
    uri,
    name: imageName || 'image.jpg',
    type: 'image/png'
  }
  const options = {
    keyPrefix: `${username}/`,
    bucket: bucketName || BUCKET_NAME,
    region: AWS_REGION,
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_ACCESS_KEY,
    successActionStatus: 201
  }
  return RNS3.put(file, options)
}
