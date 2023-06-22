import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "../css/Search.css";
import Slider from "./Slider";
import StatusCheckbox from "./StatusCheckbox";
import SelectInput from "./SelectInput";
import { usePetsContext } from "../contexts/PetsContext";
import { InputText } from "./Inputs";

export default function SearchForm() {
  const { searchPets } = usePetsContext();
  const [isBasicSearch, setIsBasicSearch] = useState(true);
  const [animalType, setAnimalType] = useState("");
  const [minValueHeight, setMinValueHeight] = useState(0);
  const [maxValueHeight, setMaxValueHeight] = useState(100);
  const [minValueWeight, setMinValueWeight] = useState(0);
  const [maxValueWeight, setMaxValueWeight] = useState(100);
  const [adoptionStatus, setAdoptionStatus] = useState([]);
  const [name, setName] = useState("");

  const handleSelect = (e) => {
    setAnimalType(e.target.value);
  };
  const handleCheckboxes = (e) => {
    let currentStatus = adoptionStatus;
    e.target.checked
      ? currentStatus.push(e.target.value)
      : (currentStatus = currentStatus.filter((element) => {
          return element !== e.target.value;
        }));
    setAdoptionStatus(currentStatus);
  };

  const handleChangeHeight = (min, max) => {
    setMinValueHeight(min);
    setMaxValueHeight(max);
  };
  const handleChangeWeight = (min, max) => {
    setMinValueWeight(min);
    setMaxValueWeight(max);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const basicSearch = { type: animalType };
    const advancedSearch = {
      type: animalType,
      status: adoptionStatus,
      height: [minValueHeight, maxValueHeight],
      weight: [minValueWeight, maxValueWeight],
      name: name,
    };

    isBasicSearch ? searchPets(basicSearch) : searchPets(advancedSearch);
  };

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <h3 className="mb-3 title">Search Your Petsie</h3>
      <Form
        className="container form-container"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <SelectInput
          handleSelect={handleSelect}
          title={"All Types"}
          options={["Dog", "Cat", "Other"]}
        />
        <Accordion>
          <Accordion.Item style={{ border: "none" }} eventKey="0">
            <Accordion.Header
              onClick={() => {
                setIsBasicSearch(!isBasicSearch);
              }}
            >
              Advanced Search
            </Accordion.Header>
            <Accordion.Body>
              <StatusCheckbox handleCheckboxes={handleCheckboxes} />
              <Slider
                minValue={minValueHeight}
                maxValue={maxValueHeight}
                handleChangeSlider={handleChangeHeight}
                title={"Height (cm)"}
              />
              <Slider
                maxValue={maxValueWeight}
                minValue={minValueWeight}
                handleChangeSlider={handleChangeWeight}
                title={"Weight (kg)"}
              />
              <InputText
                name={"name"}
                placeholder={"Pet's Name"}
                handleChange={(e) => {
                  setName(e.target.value);
                }}
                isRequired={false}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="d-flex justify-content-end">
          <button className="button" type="submit">
            search
          </button>
        </div>
      </Form>
    </div>
  );
}
