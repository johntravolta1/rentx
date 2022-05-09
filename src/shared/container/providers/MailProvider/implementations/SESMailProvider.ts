import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, {Transporter} from 'nodemailer'
import fs from 'fs'
import handlebars from "handlebars";
import {SES} from 'aws-sdk'


@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
            this.client = nodemailer.createTransport({
                SES: new SES({
                    apiVersion: '2010-12-01',
                    region: process.env.AWS_REGION
                })
            })
        }


    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8')
        const templateParse = handlebars.compile(templateFileContent)
        const templateHTML = templateParse(variables)

        await this.client.sendMail({
            to,
            from: 'Rentx <m3u0v0@gmail.com>',
            subject,
            html: templateHTML
        });
    }

}

export { SESMailProvider}