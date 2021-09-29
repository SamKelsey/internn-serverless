const AWS = require("aws-sdk");
const SES = new AWS.SES();

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

export default sendEmail;
