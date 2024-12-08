import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { akaveBase } from "@/lib/akave-helper";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucketName = formData.get("bucketName") as string;

    console.log(bucketName);
    
    if (!bucketName) {
      return NextResponse.json(
        { success: false, error: "bucketName is required" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const akaveFormData = new FormData();
    akaveFormData.append("file", file);

    try {
      const response = await akaveBase.post(
        `/buckets/${bucketName}/files`,
        akaveFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      const data = response.data as {
        success: true;
        data: {
          Name: string;
          RootCID: string;
        };
      };
  
      console.log(data);
      
  
      return data;
      
      return NextResponse.json(data);
    } catch (error) {

      console.log(error);
      
      
    }

  } catch (e) {
    const error = e as AxiosError;
    const errorMessage = error.response ? error.response.data : error.message;

    console.error("Upload error:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
