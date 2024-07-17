"use client";

import React from "react";
import LibMuxUploader from "@mux/mux-uploader-react";

export default function MuxUploader({ endpoint, onSuccess }) {
  return <LibMuxUploader endpoint={endpoint}  onSuccess={async() => {
    onSuccess()  
  }} />;
}
