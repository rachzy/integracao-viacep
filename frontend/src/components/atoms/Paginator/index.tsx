import { Dispatch, SetStateAction } from "react";

interface IProps {
  totalAmount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  amountPerPage: number;
}

export default function Paginator({
  totalAmount,
  currentPage,
  setCurrentPage,
  amountPerPage,
}: IProps) {
  function mapPages() {
    const elements = [];
    for (let i = 0; i <= (totalAmount - 1); i += amountPerPage) {
      elements.push(i);
    }

    return elements.map((element, index) => {
      return (
        <li
          className={`paginate_button page-item ${
            currentPage === index && "active"
          }`}
          key={element}
        >
          <a
            href="#"
            aria-controls="example2"
            onClick={() => setCurrentPage(index)}
            className="page-link"
          >
            {index + 1}
          </a>
        </li>
      );
    });
  }

  return (
    <div className="row d-inline" style={{ width: "100%" }}>
      <div className="col-sm-12 col-md-12">
        <div
          className="dataTables_info"
          id="example2_info"
          role="status"
          aria-live="polite"
        >
          Mostrando de {(currentPage + 1) * amountPerPage - amountPerPage + 1} a{" "}
          {Math.min(amountPerPage * (currentPage + 1), totalAmount)} de {totalAmount} resultados
        </div>
      </div>
      <div className="col-sm-12 col-md-12">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="example2_paginate"
        >
          <ul className="pagination">
            <li
              className={`paginate_button page-item previous ${
                currentPage === 0 && "disabled"
              }`}
              id="example2_previous"
            >
              <a
                href="#"
                aria-controls="example2"
                className="page-link"
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              >
                Previous
              </a>
            </li>
            {mapPages()}
            <li
              className={`paginate_button page-item next ${
                currentPage === Math.round(totalAmount / amountPerPage) &&
                "disabled"
              }`}
              id="example2_next"
            >
              <a
                href="#"
                aria-controls="example2"
                className="page-link"
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      Math.round(totalAmount / amountPerPage),
                      currentPage + 1
                    )
                  )
                }
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
