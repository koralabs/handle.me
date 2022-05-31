import * as AWS from "aws-sdk";

let s3: AWS.S3;
export const getS3 = (): AWS.S3 => {
  if (s3) {
    return s3;
  }

  s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY as string,
    },
  });
  return s3;
}
