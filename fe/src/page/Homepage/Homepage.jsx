import React, { useState } from "react";
import Layout from "../../layouts/layout";
import Button from "../../components/button/button";
import Input from "../../components/input/inputFile/input";
import Hero from "../../components/hero/hero";
import Navbar from "../../components/navbar/navbar";
import LineChart from "../../components/chart/line/line";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState(null);

  const handleFileChange = (event) => {
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
      const response = await fetch("http://127.0.0.1:5000/api/dis_hm", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <Layout>
        <Navbar></Navbar>
      </Layout>
      <Layout>
        <Hero></Hero>
        <Input type="file" onChange={handleFileChange} accept="video/*" />
        <Button
          style={{ display: "flex", justifyContent: "center" }}
          onClick={handleFileUpload}
        >
          Process video
        </Button>

        <div>
          {imageData && <video controls src={imageData} alt="Fetched Video" />}
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;
