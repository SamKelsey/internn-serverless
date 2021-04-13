const AWS = require("aws-sdk");
const SES = new AWS.SES();
import response from "./services/response";

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

const sendEmail = async (name, reply_to, message) => {
  const emailParams = {
    Source: "no-reply@internn.co.uk",
    ReplyToAddresses: [reply_to],
    Destination: {
      ToAddresses: ["enquiries@internn.co.uk"],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `${message}\n\nName: ${name}\nEmail: ${reply_to}`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New Enquiry",
      },
    },
  };

  try {
    const res = await SES.sendEmail(emailParams).promise();
    return res;
  } catch (err) {
    return err;
  }
};
