import axios from "axios";

const AGGREGATOR = "https://aggregator.walrus-testnet.walrus.space";
const PUBLISHER = "https://publisher.walrus-testnet.walrus.space";

const axiosAggregator = axios.create({
  baseURL: AGGREGATOR,
});

const axiosPublisher = axios.create({
  baseURL: PUBLISHER,
});

export async function storeFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosPublisher.put("/v1/store", file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  return response.data;
}

export async function downloadBlob(blobId: string) {
  const response = await axiosAggregator.get(`/v1/${blobId}`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  return url;
}
