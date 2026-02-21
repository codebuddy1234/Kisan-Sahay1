"use client";

import { UploadCloud, FileText, Sparkles } from "lucide-react";
import React, { useState, useRef } from "react";

const AddSchemeAIPage = () => {
  const [schemeText, setSchemeText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setUploaded(false); // reset upload status
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    if (file) formData.append("file", file);
    if (schemeText) formData.append("text", schemeText);

    const res = await fetch("http://localhost:3001/add-scheme", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploaded(true);
    setResponse(data);
    setLoading(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Add Scheme with AI
          </h1>
        </div>

        <p className="text-gray-500 mb-8">
          Upload a scheme document or paste details. AI will automatically
          extract and structure the data.
        </p>

        {/* Upload Card */}
        <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:bg-green-50 transition mb-6">
          <UploadCloud className="mx-auto text-green-600 mb-3" size={40} />

          <p className="font-semibold text-gray-700">Upload Scheme File</p>

          <p className="text-sm text-gray-400 mb-3">PDF, DOC, DOCX, TXT</p>

          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="mx-auto block"
          />

          {file && (
            <p
              className={`mt-2 text-sm font-semibold ${
                uploaded ? "text-blue-600" : "text-green-600"
              }`}
            >
              {uploaded ? `Uploaded: ${file.name} ` : `Selected: ${file.name}`}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-blue-600" />
            <label className="font-semibold text-gray-700">
              Paste Scheme Information
            </label>
          </div>

          <textarea
            rows={6}
            value={schemeText}
            onChange={(e) => setSchemeText(e.target.value)}
            placeholder="Paste scheme details here..."
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full text-white font-semibold py-3 rounded-lg shadow-lg transition
  ${uploaded ? "bg-green-500" : "bg-green-600 hover:bg-green-700"}
`}
        >
          {loading
            ? "Processing..."
            : uploaded
              ? "Uploaded "
              : "Generate with AI"}
        </button>
      </div>
    </div>
  );
};

export default AddSchemeAIPage;
