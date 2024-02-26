import { useState } from "react";
import { useSelector } from "react-redux";

const TableComponent = () => {
  const dataList = useSelector((state) => state.dataList);
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
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="text-center">Data-table</h3>
        </div>
        <div className="card-body">
          <div className="mt-4">
            <table className="table table-striped">
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
                    <td>
                      {data.dropdownInput.map((val) => val.value).join(",")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination d-flex justify-content-between align-items-center">
              <div className="d-flex" style={{ flex: 0.7 }}>
                <div style={{ marginRight: "2rem" }}>
                  <span>Records per page:</span>
                </div>
                <div>
                  <select
                    className="form-select form-select-sm form-control"
                    onChange={handleChangeRecordsPerPage}
                    value={recordsPerPage}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ flex: 0.3 }}
              >
                <div>
                  <ul className="pagination d-flex align-items-center">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p>no data available.</p>
  );
};

export default TableComponent;
