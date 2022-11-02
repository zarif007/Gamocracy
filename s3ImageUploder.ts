import AWS from "aws-sdk";

// S3 Buckect config
const s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEYID || "",
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEYID || "",
    },
});

const s3ImageUploder = async (imageName: string, image: string) => {

    const params = {
        Bucket: "gc-s3images",
        Key: imageName,
        Body: image,
    };

    try {
        const uploadedDataOns3 = await s3.upload(params).promise();
        return uploadedDataOns3.Location;
    } catch (err) {
        console.log("error", err);
    }

    return '0';
}

export default s3ImageUploder;