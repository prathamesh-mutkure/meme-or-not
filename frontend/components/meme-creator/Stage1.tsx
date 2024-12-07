/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Template } from "./types";
import { uploadFileToBucket } from "@/lib/akave-helper";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ABI, DEPLOYED_CONTRACT } from "@/lib/utils";
// import { TrueApi } from "@truenetworkio/sdk";
// import { uploadImage } from "@/lib/utils";
// import { Abi, Address } from "viem";

interface Stage1Props {
  setCapturedImage: (image: File | null) => void;
  capturedImage: File | null;
  setStage: (stage: number) => void;
  setIsLoading: (loading: boolean) => void;
  setLoadingMessage: (message: string) => void;
  // trueApi?: TrueApi;
  setmemeTemplate: (state: number) => void;
}

const sampleTemplates: [
  string,
  bigint,
  bigint,
  bigint,
  bigint,
  boolean,
  string,
  string
][] = [
  [
    "ipfs://bafybeihz4rqkwkuvpgkhvupfwwxdymvfkrqyjbzaw6n5vxhqgcm4smobky",
    BigInt(1),
    BigInt(50),
    BigInt(20),
    BigInt(1703187600),
    true,
    "Drake Meme",
    "Drake",
  ],
  [
    "ipfs://bafybeicv4pkbjnknuvgkxorfriwxqyv74sxgnio2m2f6ze6bwxutmuxpqa",
    BigInt(2),
    BigInt(30),
    BigInt(15),
    BigInt(1703274000),
    false,
    "Distracted Boyfriend",
    "Relationships",
  ],
  [
    "ipfs://bafybeihdwdcefgh4sl23yk4dv7syycfwxo2g3ydm3hf6vdlxxutm8j9rqb",
    BigInt(3),
    BigInt(45),
    BigInt(25),
    BigInt(1703360400),
    true,
    "Two Buttons",
    "Decision",
  ],
  [
    "ipfs://bafybeif5x3kjhgfdsr23cp4kv8qtycfwxo2g3ydm3hf6vdlxxutm8h7mqc",
    BigInt(4),
    BigInt(60),
    BigInt(30),
    BigInt(1703446800),
    false,
    "Doge",
    "Animals",
  ],
];

const Stage1: React.FC<Stage1Props> = ({
  setCapturedImage,
  capturedImage,
  setStage,
  setIsLoading,
  setLoadingMessage,
  // trueApi,
  setmemeTemplate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [ipfsCid, setIpfsCid] = useState<string | null>(null);
  const [isUploadingToIpfs, setIsUploadingToIpfs] = useState(false);
  const [templates, setTemplates] =
    useState<
      [string, bigint, bigint, bigint, bigint, boolean, string, string][]
    >(sampleTemplates);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: hash,
    writeContract,
    error: WriteContractError,
  } = useWriteContract();
  const { isLoading: isConfirmingMarket, status: MarketCreationStatus } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { data: marketCount } = useReadContract({
    address: DEPLOYED_CONTRACT,
    abi: ABI,
    functionName: "marketCount",
    args: [],
  });

  // const contracts = new Array(Number(marketCount) || 0).fill(0).map(
  //   (_, index) =>
  //     ({
  //       address: DEPLOYED_CONTRACT as Address,
  //       abi: CONTRACT_ABI as Abi,
  //       functionName: "getMarket",
  //       args: [BigInt(index)],
  //     } as const)
  // );

  // const { data: MemeTemplates } = useReadContracts({
  //   contracts: contracts as readonly unknown[],
  // });

  // useEffect(() => {
  //   const populateTemplates = async () => {
  //     const temps = [];
  //     if (!MemeTemplates) return;

  //     for (const temp of MemeTemplates) {
  //       // Type assertion for the result
  //       const result = temp.result as [string, bigint, bigint, bigint, bigint, boolean, string, string];
  //       const data = await fetch(
  //         `https://gateway.lighthouse.storage/ipfs/${result[6]}`
  //       );
  //       const img = await data.text();

  //       result[7] = `data:image/png;base64,${img}`;

  //       temps.push(result);
  //     }

  //     setTemplates(temps);
  //   };

  //   populateTemplates();
  // }, [MemeTemplates]);

  // Monitor transaction hash
  useEffect(() => {
    if (hash) {
      console.log("Transaction hash received:", hash);
      setLoadingMessage("Transaction submitted, waiting for confirmation...");
    }
  }, [hash, setLoadingMessage]);

  // Monitor confirmation status
  useEffect(() => {
    if (isConfirmingMarket) {
      setStage(2);
      setIsLoading(false);
      setLoadingMessage("");
      setSelectedImage(null);
      // setCapturedImage(
      //   base64Image || (ipfsCid ? `https://ipfs.io/ipfs/${ipfsCid}` : null)
      // );
      setLoadingMessage("Transaction is being confirmed...");

      setmemeTemplate(Number(marketCount));
    }
  }, [
    isConfirmingMarket,
    MarketCreationStatus,
    setStage,
    setIsLoading,
    setLoadingMessage,
    setCapturedImage,
    ipfsCid,
    base64Image,
  ]);

  const generateTemplate = async () => {
    console.log("Generate template started");
    setIsLoading(true);
    setLoadingMessage("Preparing transaction...");

    // Wait for IPFS upload if it's still in progress
    if (isUploadingToIpfs) {
      setLoadingMessage("Waiting for IPFS upload to complete...");
      return;
    }

    try {
      writeContract({
        address: DEPLOYED_CONTRACT,
        abi: ABI,
        functionName: "createMarket",
        args: [ipfsCid],
      });

      console.log("Write contract call completed");
    } catch (error) {
      console.error("Error creating market:", error);
      setIsLoading(false);
      setLoadingMessage("Transaction failed. Please try again.");
    }
  };

  // const handleFileUpload = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   setIsLoading(true);
  //   setLoadingMessage("Processing your photo...");

  //   try {
  //     // Convert the file to base64
  //     const reader = new FileReader();
  //     reader.onloadend = async () => {
  //       const base64String = reader.result as string;
  //       setBase64Image(base64String);
  //       setSelectedImage(base64String);
  //       setLoadingMessage("Uploading to IPFS...");
  //       setIsUploadingToIpfs(true);

  //       try {
  //         const res = await uploadImage(
  //           base64String.replace(/^data:image\/\w+;base64,/, "")
  //         );

  //         console.log(res);

  //         // Store the CID
  //         setIpfsCid(res);
  //         setIsUploadingToIpfs(false);
  //       } catch (error) {
  //         console.error("Error uploading to IPFS:", error);
  //         setIsUploadingToIpfs(false);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   } catch (error) {
  //     console.error("Error processing file:", error);
  //     setIsUploadingToIpfs(false);
  //   } finally {
  //     setIsLoading(false);
  //     setLoadingMessage("");
  //   }
  // };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) {
      setFile(selectedFile);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        setSelectedImage(base64String);
      };
      handleUpload(selectedFile);
    }
  };

  const handleUpload = async (selectedFile: File) => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const res = await uploadFileToBucket("test", selectedFile);
      console.log("RESPONSE", res.data.RootCID);

      setFile(null);
      // Reset the file input
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // const handleTemplateSelection = (template: [string, bigint, bigint, bigint, bigint, boolean, string, string], index: number) => {
  //   // For templates, we'll use the template URL directly
  //   setSelectedImage(null);
  //   setBase64Image(null);

  //   setIpfsCid(template[6]);

  //   setStage(2);
  //   setIsLoading(false);
  //   setLoadingMessage("");
  //   setSelectedImage(null);
  //   // Pass both base64 and IPFS URL to the next stage
  //   setCapturedImage(template[7]);

  //   setLoadingMessage("Template is being selected...");

  //   setmemeTemplate(index);
  // };

  // // Monitor contract errors
  useEffect(() => {
    if (error) {
      console.error("Contract error detected:", error);
      setLoadingMessage("Transaction failed. Please try again.");
      setIsLoading(false);
    }
  }, [error, setLoadingMessage, setIsLoading]);

  // // Disable template selection during IPFS upload
  const isDisabled = isUploadingToIpfs;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
        {/* Grid Container */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* Upload Photo Tile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => !isDisabled && fileInputRef.current?.click()}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Upload Photo</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isDisabled}
            />
          </motion.div>

          {/* Existing Templates */}
          {templates &&
            templates.map((template, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                // onClick={() =>
                //   !isDisabled && handleTemplateSelection(template, index)
                // }
              >
                <img
                  src={template[7]}
                  alt={"Meme template"}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-primary/90 px-4 py-2 rounded-full text-sm font-medium text-black">
                    Use Template
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {file && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-4">
            <div className="relative w-full aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img
                src={URL.createObjectURL(file)}
                alt="Selected Template"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setBase64Image(null);
                  setIpfsCid(null);
                }}
                className="px-6 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 
                           transition-colors flex items-center gap-2"
                disabled={isDisabled}
              >
                Cancel
              </button>
              <button
                onClick={generateTemplate}
                className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg
                           transition-colors flex items-center gap-2 text-white"
                disabled={isDisabled}
              >
                {isUploadingToIpfs ? "Uploading..." : "Use Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage1;
