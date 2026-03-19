"use client";

import { pinata } from "@/lib/pinata";
import { useState } from "react";
import { Button } from "./ui/button";
import { Upload, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";

interface DropzoneImageProps {
  setUrl: (value: string) => void;
  url: string;
}

export default function DropzoneImage({ setUrl, url }: DropzoneImageProps) {
  const [file, setFile] = useState<File>();
  // const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState("");

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // ✅ 2 MB limit

  const uploadFile = async (selectedFile?: File) => {
    const fileToUpload = selectedFile || file;

    if (!fileToUpload) {
      alert("No file selected");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const urlRequest = await fetch("/api/url");
      const urlResponse = await urlRequest.json();

      const upload = await pinata.upload.public
        .file(fileToUpload)
        .url(urlResponse.url);
      const fileUrl = await pinata.gateways.public.convert(upload.cid);

      setUrl(fileUrl);
      setUploaded(true);
      setMessage("✅ Upload successful!");
    } catch (e) {
      console.error(e);
      setMessage("❌ Trouble uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target?.files?.[0];
    if (selected) {
      // ✅ Check file size first
      if (selected.size > MAX_FILE_SIZE) {
        setMessage("⚠️ File too large. Maximum allowed size is 2 MB.");
        setFile(undefined);
        e.target.value = "";
        return;
      }

      setFile(selected);
      setMessage("");
      uploadFile(selected); // ✅ Auto upload immediately
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center space-y-4">
      {/* Hide form once upload is done */}
      {!uploaded && (
        <>
          <label
            htmlFor="cv-upload"
            className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition ${
              uploading
                ? "border-teal-400 bg-teal-50"
                : "border-gray-300 hover:border-teal-400"
            }`}
          >
            {uploading ? (
              <>
                <Loader2
                  className="text-teal-500 animate-spin mb-2"
                  size={36}
                />
                <p className="text-sm text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="text-teal-500 mb-2" size={36} />
                <p className="text-sm text-gray-500">
                  Click here to upload image (max 2 MB).
                </p>
              </>
            )}
            <input
              id="cv-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              disabled={uploading}
            />
          </label>

          {/* ⚠️ Warning message */}
          {message.startsWith("⚠️") && (
            <div className="flex items-center text-amber-600 text-sm mt-1 gap-1">
              <AlertTriangle size={16} />
              <span>{message}</span>
            </div>
          )}
        </>
      )}

      {/* ✅ Success message */}
      {uploaded && (
        <div className="flex flex-col items-center space-y-3">
          {url && (
            <Image
              src={url}
              alt="logo"
              width={120}
              height={120}
              className="text-teal-600 underline text-sm rounded-md"
            />
          )}

          <div className="flex items-center text-green-600 font-medium gap-2">
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
