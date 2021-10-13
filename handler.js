import response from "./services/response";
import sendEmail from "./services/sendEmail";

const AWS = require("aws-sdk");
const S3 = new AWS.S3();

export const contactMailer = async (event, context) => {
  const { name, reply_to, message } = JSON.parse(event.body);

  console.log(JSON.parse(event.body));
  try {
    await sendEmail(name, reply_to, message);

    const res = response(200, {
      name,
      reply_to,
      message,
    });
    return res;
  } catch (err) {
    const res = response(500, { message: err.message });
    return res;
  }
};

export const getImageData = async (event, context) => {
  try {
    const data = await S3.getObject({
      Bucket: `internn-web-info-${process.env.STAGE}`,
      Key: "image-info.json",
    }).promise();
    return {
      statusCode: 200,
      body: data.Body.toString("utf-8"),
    };
  } catch (err) {
    return response(
      err.statusCode || 500,
      err.message || JSON.stringify(err.message)
    );
  }
};

export const getTeamData = async (event, context) => {
  try {
    const data = await S3.getObject({
      Bucket: `internn-web-info-${process.env.STAGE}`,
      Key: "our-team.json",
    }).promise();
    return {
      statusCode: 200,
      body: data.Body.toString("utf-8"),
    };
  } catch (err) {
    return response(
      err.statusCode || 500,
      err.message || JSON.stringify(err.message)
    );
  }
};
