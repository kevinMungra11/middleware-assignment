import { useState, useEffect } from "react";
import TableComponent from "./Table";
import { initialValues } from "../Constant/constant";

const FormComponent = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const datalist = JSON.parse(localStorage.getItem("dataList"));
    setDataList(datalist);
    const savedData = localStorage.getItem("formData");
    console.log(savedData);
    if (savedData) {
      setFormValues((data) => {
        return { ...data, ...JSON.parse(savedData) };
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formValues));
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;
    const val =
      type === "checkbox"
        ? checked
        : type === "select-multiple"
        ? Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value)
        : value;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formValues).every((value) => value !== "")) {
      const dataList = JSON.parse(localStorage.getItem("dataList"));
      if (!dataList)
        localStorage.setItem("dataList", JSON.stringify([formValues]));
      else {
        dataList.push(formValues);
        localStorage.setItem("dataList", JSON.stringify(dataList));
      }
      localStorage.removeItem("formData");
      setFormValues(initialValues);
      setDataList(() => JSON.parse(localStorage.getItem("dataList")));
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <>
      <h3 className="text-center mt-3">Fill the form</h3>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Text Input:</label>
            <input
              type="text"
              name="textInput"
              value={formValues.textInput}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Number Input:</label>
            <input
              type="number"
              name="numberInput"
              value={formValues.numberInput}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Radio Input:</label>
            <div>
              <div className="form-check">
                <input
                  type="radio"
                  name="radioInput"
                  value="option1"
                  checked={formValues.radioInput === "option1"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">Option 1</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="radioInput"
                  value="option2"
                  checked={formValues.radioInput === "option2"}
                  onChange={handleChange}
                  className="form-check-input"
                />
                <label className="form-check-label">Option 2</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                type="checkbox"
                name="checkboxInput"
                checked={formValues.checkboxInput}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Checkbox Input</label>
            </div>
          </div>
          <div className="form-group">
            <label>Dropdown Input:</label>
            <select
              name="dropdownInput"
              multiple
              value={formValues.dropdownInput}
              onChange={handleChange}
              className="form-select"
              id="opt"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <TableComponent dataList={dataList}></TableComponent>
      </div>
    </>
  );
};

export default FormComponent;
