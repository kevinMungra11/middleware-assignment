import FormComponent from "./Components/Form";
import Header from "./Components/Header";
import TableComponent from "./Components/Table";
import "./index.css";

function App() {
  return (
    <>
      <div className="container">
        <Header></Header>
        <FormComponent></FormComponent>
        <TableComponent></TableComponent>
      </div>
    </>
  );
}

export default App;
