import { useEffect, useMemo, useState } from "react";
import { useTable, ColumnInstance, Row } from "react-table";
import { CustomHeaderColumn } from "./columns/CustomHeaderColumn";
import { CustomRow } from "./columns/CustomRow";
import {
  useQueryResponseData,
  useQueryResponseLoading,
} from "../core/QueryResponseProvider";
import { usersColumns } from "./columns/_columns";
import { User } from "../core/_models";
import { UsersListLoading } from "../components/loading/UsersListLoading";
import { ProjectListPagination } from "../components/pagination/UsersListPagination";
import { KTCardBody } from "../../../../../../_metronic/helpers";
import { getTaskList } from "../core/_requests";

const UsersTable = () => {
  const [taskList, setTaskList]: any[] = useState([]);
  const isLoading = useQueryResponseLoading();
  const data: any[] = useMemo(() => taskList, [taskList]);
  const columns = useMemo(() => usersColumns, []);
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const handleGetTask = () => {
    const query = {
      page: 1,
      quantity: 15,
      word: "",
    };
    getTaskList(query).then((response) => {
      console.log("data", response);

      setTaskList(response.data.list);
    });
  };

  useEffect(() => {
    handleGetTask();
  }, []);

  return (
    <KTCardBody className="py-4">
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          {...getTableProps()}>
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {headers.map((column: ColumnInstance<any>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold" {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<any>, i) => {
                prepareRow(row);
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />;
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="d-flex text-center w-100 align-content-center justify-content-center">
                    Kayıt Bulunamadı
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ul className="pagination">
        <li className="page-item previous disabled">
          <a href="#" className="page-link">
            <i className="previous"></i>
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            1
          </a>
        </li>
        <li className="page-item active">
          <a href="#" className="page-link">
            2
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            3
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            4
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            5
          </a>
        </li>
        <li className="page-item">
          <a href="#" className="page-link">
            6
          </a>
        </li>
        <li className="page-item next">
          <a href="#" className="page-link">
            <i className="next"></i>
          </a>
        </li>
      </ul>
      {/* <ProjectListPagination pagination={{
        page:1,
        items_per_page:15,
        links
      }}  /> */}
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  );
};

export { UsersTable };
