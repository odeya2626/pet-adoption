import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import PetsTable from "./PetsTable";

export default function TableContainer({ getAll, title }) {
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [total_count, setTotal_count] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleGet = async (offset) => {
    const res = await getAll(offset);
    setList(res.list);
    setTotal_count(res.total_count);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGet(offset);
  }, [offset]);

  return (
    <div className="container user-select-none d-flex flex-column align-items-center">
      <h3 className="title mb-4">{title}</h3>
      {title === "Pets" ? (
        <PetsTable {...{ list, isLoading }} />
      ) : (
        <UsersTable {...{ list, isLoading }} />
      )}

      {total_count > 10 && (
        <div className="d-flex align-items-center justify-space-around my-3">
          <button
            className="btn me-3"
            onClick={() => setOffset(offset + 10)}
            disabled={total_count - offset < 10}
          >
            Show More
          </button>
          <button
            className="btn ms-3"
            onClick={() => setOffset(offset - 10)}
            disabled={offset <= 9}
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}
