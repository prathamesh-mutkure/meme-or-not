import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { downloadBlob } from "@/lib/walrus-helper";
import { downloadAndDisplayFile } from "@/lib/akave-helper";

const LazyBlobImage = ({
  cid,
  type,
  className = "",
}: {
  cid: string;
  type: "akave" | "wolrus";
  className?: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let objectUrl = null;

    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);

        if (type === "wolrus") {
          const blob = await downloadBlob(cid);
          setImageUrl(URL.createObjectURL(blob));
        } else {
          const url = await downloadAndDisplayFile("test", cid);
          setImageUrl(url);
        }

        if (mounted) {
          setImageUrl(objectUrl);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err?.message ?? "An error occurred");
          setLoading(false);
        }
      }
    };

    fetchImage();

    // Cleanup function
    return () => {
      mounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [cid, type]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-24">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-24 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <img
      src={imageUrl!}
      alt={`Content for ${cid}`}
      className={`max-w-full h-auto ${className}`}
    />
  );
};

export default LazyBlobImage;
