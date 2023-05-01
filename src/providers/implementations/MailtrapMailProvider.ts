import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bbff21f0d00eff",
        pass: "f4b28937214100",
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      from: message.from.email,
      to: message.to.email,
      subject: message.subject,
      html: message.body,
    });
  }
}
