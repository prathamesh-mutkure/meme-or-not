import {
  EAS,
  NO_EXPIRATION,
  SchemaEncoder,
  TransactionProvider,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";

type TMemeTemplate = {
  cid: string;
  isTemplate: boolean;
};

type TMeme = {
  cid: string;
  isTemplate: boolean;
  memetemplate: string;
};

// TODO: Add EAS Contract on Base and Scheme UIDs
const EASContractAddress = "0x";
const memeTemplateSchemeUID = "0x";
const memeSchemeUID = "0x";

const eas = new EAS(EASContractAddress);

const memeTemplateSchemeEncoder = new SchemaEncoder(
  "string cid, bool isTemplate"
);
const memeSchemeEncoder = new SchemaEncoder(
  "string cid, bool isTemplate, memetemplate string"
);

async function attestMemeTemplate({
  signer,
  userId,
  data,
}: {
  signer: TransactionSigner | TransactionProvider;
  userId: string;
  data: TMemeTemplate;
}) {
  eas.connect(signer);

  const encodedData = memeTemplateSchemeEncoder.encodeData([
    {
      name: "cid",
      type: "string",
      value: data.cid,
    },
    {
      name: "isTemplate",
      type: "bool",
      value: data.isTemplate,
    },
  ]);

  const transaction = await eas.attest({
    schema: memeTemplateSchemeUID,
    data: {
      recipient: userId,
      expirationTime: NO_EXPIRATION,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await transaction.wait();

  console.log("New attestation UID:", newAttestationUID);
  console.log("Transaction receipt:", transaction.receipt);

  return newAttestationUID;
}

async function attestMeme({
  signer,
  userId,
  data,
}: {
  signer: TransactionSigner | TransactionProvider;
  userId: string;
  data: TMeme;
}) {
  eas.connect(signer);

  const encodedData = memeSchemeEncoder.encodeData([
    {
      name: "cid",
      type: "string",
      value: data.cid,
    },
    {
      name: "isTemplate",
      type: "bool",
      value: data.isTemplate,
    },
    {
      name: "memetemplate",
      type: "string",
      value: data.memetemplate,
    },
  ]);

  const transaction = await eas.attest({
    schema: memeSchemeUID,
    data: {
      recipient: userId,
      expirationTime: NO_EXPIRATION,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await transaction.wait();

  console.log("New attestation UID:", newAttestationUID);
  console.log("Transaction receipt:", transaction.receipt);

  return newAttestationUID;
}
