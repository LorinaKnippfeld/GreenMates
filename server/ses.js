const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = (message, subject) => {
    return ses
        .sendEmail({
            Source: "pflanziVz <parallel.ticket@spicedling.email>",
            Destination: {
                ToAddresses: ["parallel.ticket@spicedling.email"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("Sending emails worked"))
        .catch((error) => console.log("Error with sending emails", error));
};
