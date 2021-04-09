const AWS = require("aws-sdk");
const SES = new AWS.SES();

export const contactMailer = async (event, context, callback) => {
  const formData = JSON.parse(event.body);

  sendEmail(formData, (err, data) => {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: err ? err.message : data,
      }),
    };

    callback(null, response);
  });
};

const sendEmail = (formData, callback) => {
  const emailParams = {
    Source: "no-reply@internn.co.uk",
    ReplyToAddresses: [formData.reply_to],
    Destination: {
      ToAddresses: ["enquiries@internn.co.uk"],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.reply_to}`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "New Enquiry",
      },
    },
  };

  SES.sendEmail(emailParams, callback);
};
