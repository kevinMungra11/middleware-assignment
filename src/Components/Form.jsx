import { useState, useEffect } from "react";
import { initialValues } from "../Constant/constant";
import { useDispatch } from "react-redux";
import { ADD_DETAIL } from "../store/action";
import Select from "react-select";

const FormComponent = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];
  const [formValues, setFormValues] = useState(initialValues);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormValues((data) => {
        return { ...data, ...JSON.parse(savedData) };
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formValues));
  }, [formValues]);

  const handleDropDown = (selected) => {
    setFormValues((prev) => ({
      ...prev,
      dropdownInput: [...selected],
    }));
  };

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
    if (
      Object.values(formValues).every((value) => {
        if (typeof value === "string") {
          return value !== "";
        } else if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return value;
        }
      })
    ) {
      dispatch(ADD_DETAIL(formValues));
      localStorage.removeItem("formData");
      setFormValues(initialValues);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <>
      <div className="card my-5">
        <div className="card-header">
          <h3 className="text-center mt-3">Fill the form</h3>
        </div>
        <div className="card-body">
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
                <Select
                  name="dropdownInput"
                  isMulti
                  options={options}
                  value={formValues.dropdownInput}
                  onChange={handleDropDown}
                />
                {/* <select
                  name="dropdownInput"
                  multiple={true}
                  value={formValues.dropdownInput}
                  onChange={handleChange}
                  className="form-select"
                  id="opt"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select> */}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponent;
