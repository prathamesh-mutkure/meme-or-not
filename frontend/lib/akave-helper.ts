import axios, { AxiosError } from "axios";
import FormData from "form-data";
import fs from "fs";

// TODO: Figure out fs (backend)
// TODO: Add types and public node address

const akaveBase = axios.create({
  baseURL: "http://localhost:8000",
});

/* Bucket Operations */

export async function createBucket(bucketName: string) {
  try {
    const response = await akaveBase.post("/buckets", { bucketName });
    console.log("createBucket", response.data);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    console.error(error.response ? error.response.data : error.message);
  }
}

export async function listBuckets() {
  try {
    const response = await akaveBase.get("/buckets");
    console.log("listBuckets", response.data);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    console.error(error.response ? error.response.data : error.message);
  }
}

export async function viewBucketDetails(bucketName: string) {
  try {
    const response = await akaveBase.get(`/buckets/${bucketName}`);
    console.log("viewBucketDetails", response.data);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    console.error(error.response ? error.response.data : error.message);
  }
}

/* File Operations */

export async function listFilesInBucket(bucketName: string) {
  try {
    const response = await akaveBase.get(`/buckets/${bucketName}/files`);
    console.log("listFilesInBucket", response.data);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    console.error(error.response ? error.response.data : error.message);
  }
}

export async function getFileMetadata(bucketName: string, filename: string) {
  try {
    const response = await akaveBase.get(
      `/buckets/${bucketName}/files/${filename}`
    );
    console.log("getFileMetadata", response.data);

    return response.data;
  } catch (e) {
    const error = e as AxiosError;

    console.error(error.response ? error.response.data : error.message);
  }
}

export async function uploadFileToBucket(bucketName: string, filePath: string) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  try {
    const response = await akaveBase.post(
      `/buckets/${bucketName}/files`,
      form,
      {
        headers: form.getHeaders(),
      }
    );

    console.log("uploadFileToBucket", response.data);
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.response ? error.response.data : error.message);
  }
}

export async function downloadFileFromBucket(
  bucketName: string,
  fileName: string,
  outputDir: string
) {
  try {
    const response = await akaveBase.get(
      `/buckets/${bucketName}/files/${fileName}/download`,
      {
        responseType: "blob",
      }
    );

    console.log(`downloadFileFromBucket - File downloaded: ${fileName}`);
    fs.writeFileSync(`./${outputDir}/${fileName}`, response.data);

    return `./${outputDir}/${fileName}`;
  } catch (e) {
    const error = e as AxiosError;
    console.error(error.response ? error.response.data : error.message);
  }
}
