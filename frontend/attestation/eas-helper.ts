import {
  EAS,
  NO_EXPIRATION,
  SchemaEncoder,
  TransactionProvider,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";
import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";

type TMemeTemplate = {
  cid: string;
  isTemplate: boolean;
};

type TMeme = {
  cid: string;
  isTemplate: boolean;
  memetemplate: string;
};

// TODO: Add EAS Contracts on Base and Scheme UIDs
const EASContractAddress = "0x";
const schemaRegistryContractAddress = "0x";
const schemaResolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
const memeTemplateSchemeUID = "0x";
const memeSchemeUID = "0x";

const eas = new EAS(EASContractAddress);

const memeTemplateScheme = "string cid, bool isTemplate";
const memeTemplateSchemeEncoder = new SchemaEncoder(memeTemplateScheme);

const memeScheme = "string cid, bool isTemplate, memetemplate string";
const memeSchemeEncoder = new SchemaEncoder(memeScheme);

export async function registerSchema(
  signer: TransactionSigner | TransactionProvider,
  schema: string
) {
  const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
  schemaRegistry.connect(signer);

  const transaction = await schemaRegistry.register({
    schema,
    resolverAddress: schemaResolverAddress,
    revocable: true,
  });

  const txId = await transaction.wait();

  return txId;
}

export async function attestMemeTemplate({
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

export async function attestMeme({
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
