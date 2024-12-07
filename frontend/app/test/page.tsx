"use client";

import React, { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { storeFile, downloadBlob } from "@/lib/walrus-helper";

// kl6tqamL7XELV39S5KlFpeMV6Fjco-oGIQFU2bWMhj4 (svg)
// PZl200UMRwITypM7hJ2dlcE2ykBHyEvbnrMVaaAzy2E (png)
// 2sVNPKLRhR1eEamPNP6cjCYWtBupN_LIbX4pa6Kh8ng (webp)
// aFmcxLJIrXlEexA-rUleRpLKY8QaaSN5zDSjnxinOU8 (jpg)

const FileUploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [error, setError] = useState("");

  const [url, seturl] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      const response = await storeFile(file);
      const blobId = response.id; // Assuming the response contains the blob ID
      const imageUrl = await downloadBlob(blobId);

      setUploadedImageUrl(imageUrl);
    } catch (err) {
      setError("Failed to upload and retrieve image");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  async function getData() {
    const blob = await downloadBlob(
      "2sVNPKLRhR1eEamPNP6cjCYWtBupN_LIbX4pa6Kh8ng"
    );

    const url = URL.createObjectURL(blob);

    seturl(url);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-8">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <label className="flex flex-col items-center gap-4 cursor-pointer">
            <Upload
              className={`w-12 h-12 ${
                isUploading ? "text-gray-400 animate-pulse" : "text-blue-500"
              }`}
            />
            <span className="text-sm text-gray-600">
              {isUploading ? "Uploading..." : "Click to upload an image"}
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error}</div>
        )}

        {/* Image Preview */}
        {url && (
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Uploaded Image
            </h2>
            <img
              src={url}
              alt="Uploaded preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>

      <button onClick={getData}>Test</button>
    </div>
  );
};

export default FileUploadPage;
