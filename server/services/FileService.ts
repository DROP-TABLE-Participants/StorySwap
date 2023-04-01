import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING || ""
);
const containerName = "images";
const containerClient = blobServiceClient.getContainerClient(containerName);

export default class FileService {
  static async uploadImage(file: Buffer) {
    const id = uuidv4();
    const path = `${id}.png`;
    const blockBlobClient = containerClient.getBlockBlobClient(path);
    // add http headers option for content type
    await blockBlobClient.upload(file, file.length, {
        blobHTTPHeaders: { blobContentType: "image/png" },
    });
    console.log("Uploaded image")
    return { id, path };
  }
}
