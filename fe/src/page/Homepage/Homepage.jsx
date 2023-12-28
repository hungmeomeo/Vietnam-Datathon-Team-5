import React, { useState } from "react";
import Layout from "../../layouts/layout";
import Button from "../../components/button/button";
import Input from "../../components/input/inputFile/input";
import Hero from "../../components/hero/hero";
import Navbar from "../../components/navbar/navbar";
import "./homepage.css";
import axios from "axios";
import JSZip from "jszip";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageTitles = ["Tần suất di chuyển", "Tần suất cúi xuống", "Tần suất với tay lên cao"];

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid video file.");
    }
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/process",
        formData,
        {
          responseType: "arraybuffer",
        }
      );

      const zip = await JSZip.loadAsync(response.data);
      const urls = [];
      await Promise.all(
        Object.keys(zip.files).map(async (fileName) => {
          const file = zip.file(fileName);
          if (file && fileName.toLowerCase().endsWith(".png")) {
            const data = await file.async("base64");
            const url = `data:image/png;base64,${data}`;
            urls.push(url);
          }
        })
      );

      setImageData(urls);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
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
          Xử lý video
        </Button>
      </Layout>
      <Layout>
        <div className="container">
          {imageData.length > 0 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <ul>
                <li className="display-part">
                  <Button onClick={handlePrev}>
                    {String.fromCharCode(8592)}
                  </Button>
                </li>
                <li className="display-image">
                  <div style={{ width: "100%", textAlign: "center"}}><h2>{imageTitles[currentIndex]}</h2></div>
                  <img
                    src={imageData[currentIndex]}
                    alt={`Image ${currentIndex}`}
                    style={{

                      maxWidth: "800px",
                      maxHeight: "800px",
                      padding: "10px",

                    }}
                  />
                </li>
                <li className="display-part">
                  <Button onClick={handleNext}>
                    {String.fromCharCode(8594)}
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;