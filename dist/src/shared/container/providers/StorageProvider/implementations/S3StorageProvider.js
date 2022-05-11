"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const aws_sdk_1 = require("aws-sdk");
const upload_1 = __importDefault(require("../../../../../config/upload"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.S3({
            region: process.env.AWS_BUCKET_REGION
        });
    }
    async save(file, folder) {
        const originalName = (0, path_1.resolve)(upload_1.default.tmpFolder, file);
        const fileContent = await fs_1.default.promises.readFile(originalName);
        const contentType = mime_1.default.getType(originalName);
        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType: contentType
        }).promise();
        await fs_1.default.promises.unlink(originalName);
        return file;
    }
    async delete(file, folder) {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise();
    }
}
exports.S3StorageProvider = S3StorageProvider;
