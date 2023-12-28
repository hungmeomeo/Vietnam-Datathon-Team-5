// Your component file (e.g., Search.jsx)

import React, { useState } from "react";
import Layout from "../../layouts/layout";
import Hero from "../../components/hero/hero";
import Navbar from "../../components/navbar/navbar";
import Select from "../../components/select/select";
import Input from "../../components/input/inputText/input";
import LineChart from "../../components/chart/line/line";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import "./Search.css";
import Button from "../../components/button/button";
import axios from "axios";
import JSZip from 'jszip';

const Search = () => {
  const options = [
    { value: "Camera1", label: "Camera 1", daily: 80, weekly: 90, monthly: 85 },
    { value: "Camera1", label: "Camera 2", daily: 90, weekly: 70, monthly: 85 },
    { value: "Camera1", label: "Camera 3", daily: 90, weekly: 90, monthly: 95 },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const [value, setValue] = useState(new Date());
  const [value1, setValue1] = useState(new Date());
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setInputValue(selectedValue);
    setError("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedOption("");
    setError("");
  };

  const [file, setFile] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageTitles = ["Tần suất di chuyển", "Tần suất cúi xuống", "Tần suất với tay lên cao"];

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

  const handleGetFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
      const response = await axios.get("http://127.0.0.1:5000/api/period",{
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };
  return (
    <>
      <Layout>
        <Navbar></Navbar>
      </Layout>
      <Layout>
        <Hero></Hero>
        <div className="container">
          <form className="form-wrapper" style={{ width: "50%" }}>
            <label className="label" htmlFor="searchId">
              Chọn một camera đã được kết nối
            </label>
            <div className="input-wrapper" style={{ outlineColor: "red" }}>
              <Input
                type="text"
                placeholder="Camera"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Select
                name="year"
                id="year"
                options={options}
                value={selectedOption}
                onChange={handleSelectChange}
              />
            </div>
          </form>
          <label
            className="label"
            style={{ marginTop: "50px", marginBottom: "30px" }}
            htmlFor="searchId"
          >
            Chọn một camera đã được kết nối
          </label>
          <div className="datetime-picker-container">
            <DateTimePicker
              className="datetime-picker"
              onChange={setValue}
              value={value}
            />
            <DateTimePicker
              className="datetime-picker"
              onChange={setValue1}
              value={value1}
            />
          </div>
        </div>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom:"30px",
          }}
          onClick={handleGetFile}
        >
          Xử lý video
        </Button>
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
    </>
  );
};

export default Search;
