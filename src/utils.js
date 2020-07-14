import { adjectives, nouns } from "./words";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

export const sendSecretMail = (address, secret) => {
    const data = {
        from: "wooheet@signal.io",
        to: address,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };

    const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });

    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
};
