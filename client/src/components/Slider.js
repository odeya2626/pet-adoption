import React from "react";
import MultiRangeSlider from "multi-range-slider-react";

function Slider({ maxValue, minValue, handleChangeSlider, title }) {
  return (
    <div className="multi-range-slider-container mb-2">
      <h6 className="mb-2">{title}</h6>
      <MultiRangeSlider
        min={0}
        max={100}
        step={1}
        ruler={false}
        barLeftColor={"white"}
        barRightColor={"white"}
        barInnerColor={"#EFB277"}
        minValue={minValue}
        maxValue={maxValue}
        onChange={(e) => {
          handleChangeSlider(e.minValue, e.maxValue);
        }}
      ></MultiRangeSlider>
      <div className="d-flex label justify-content-center twelve">
        <div className="ms-2">min: {minValue}</div>
        <div className="ms-2">max: {maxValue}</div>
      </div>
    </div>
  );
}
export default Slider;
