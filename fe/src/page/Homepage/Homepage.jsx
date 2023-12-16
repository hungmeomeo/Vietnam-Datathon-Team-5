import React, { useState } from "react";
import Layout from "../../layouts/layout";
import Button from "../../components/button/button";
import Input from "../../components/input/inputFile/input";
import Hero from "../../components/hero/hero";
import Navbar from "../../components/navbar/navbar";
import LineChart from "../../components/chart/line/line";

import axios from "axios";
import JSZip from 'jszip';

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file is a video file
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid video file.");
      // You may choose to reset the input or handle the error differently
    }
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await axios.post("http://127.0.0.1:5000/api/process", formData, {
        responseType: 'arraybuffer',
      });

      const zip = await JSZip.loadAsync(response.data);
      const urls = [];
      await Promise.all(
        Object.keys(zip.files).map(async (fileName) => {
          const file = zip.file(fileName);
          if (file && fileName.toLowerCase().endsWith('.png')) {
            const data = await file.async('base64');
            const url = `data:image/png;base64,${data}`;
            urls.push(url);
          }
        })
      );

      setImageData(urls);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <Layout>
        <Navbar />
      </Layout>

      <Layout>
        <Hero />
        <Input type="file" onChange={handleFileChange} accept="video/*" />
        <Button
          style={{ display: "flex", justifyContent: "center" }}
          onClick={handleFileUpload}
        >
          Process video
        </Button>

        <div>
          {imageData.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Image ${index}`}
              style={{ maxWidth: '300px', maxHeight: '300px', margin: '10px' }}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;
