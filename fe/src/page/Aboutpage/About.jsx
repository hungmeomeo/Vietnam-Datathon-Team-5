import React, { useState } from "react";
import Layout from "../../layouts/layout";
import Hero from "../../components/hero/hero";
import Navbar from "../../components/navbar/navbar";
import Select from "../../components/select/select";
import Input from "../../components/input/inputText/input";
import "./About.css";
import LineChart from "../../components/chart/line/line";

const About = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const options = [
    { value: "option1", label: "Option 1", daily: 80, weekly: 90, monthly: 85 },
    { value: "option2", label: "Option 2", daily: 90, weekly: 70, monthly: 85 },
    { value: "option3", label: "Option 3", daily: 90, weekly: 90, monthly: 95 },
  ];

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setInputValue(selectedValue); // Set the input value to the selected option
    setError(""); // Clear any existing error
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedOption(""); // Clear the selected option when input changes
    setError(""); // Clear any existing error
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
        </div>
        <div className="container"></div>
      </Layout>
      <Layout>
        <LineChart></LineChart>
      </Layout>
    </>
  );
};

export default About;
