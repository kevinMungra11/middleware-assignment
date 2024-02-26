import { useState } from "react";

const TableComponent = ({ dataList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = dataList?.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(dataList?.length / recordsPerPage);

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChangeRecordsPerPage = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  return dataList && dataList.length > 0 ? (
    <>
      <h3 className="text-center">Data-table</h3>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Text Input</th>
              <th scope="col">Number Input</th>
              <th scope="col">Radio Input</th>
              <th scope="col">Checkbox Input</th>
              <th scope="col">Dropdown Input</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((data, index) => (
              <tr key={index}>
                <td>{data.textInput}</td>
                <td>{data.numberInput}</td>
                <td>{data.radioInput}</td>
                <td>{data.checkboxInput ? "Checked" : ""}</td>
                <td>{data.dropdownInput.join(",")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Records per page:</span>
          <select
            className="form-select form-select-sm"
            onChange={handleChangeRecordsPerPage}
            value={recordsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    className={`page-item ${
                      page === currentPage ? "active" : ""
                    }`}
                    key={page}
                  >
                    <button
                      className="page-link"
                      onClick={() => handleChangePage(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  ) : (
    <p>no data available.</p>
  );
};

export default TableComponent;
