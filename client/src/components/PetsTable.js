import React from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";

export default function UsersTable({ list, isLoading }) {
  const navigate = useNavigate();
  return (
    <>
      <Table striped hover className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="first-column">Type</th>
            <th className="second-column">Breed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.length
            ? list.map((pet) => (
                <tr
                  key={pet.id}
                  className="align-middle pointer"
                  onClick={() => navigate(`/pet?id=${pet.id}`)}
                >
                  <td className="col-1">
                    <img
                      className="avatar pointer me-2"
                      alt="pet"
                      src={pet.img}
                    />
                    <span>{pet.name}</span>
                  </td>
                  <td className="col-1 first-column">{pet.type}</td>
                  <td className="col-1 second-column">{pet.breed}</td>
                  <td className="col-1">{pet.status}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      {isLoading ? (
        <Spinner className="red me-3" hidden={!isLoading} />
      ) : (
        !list.length && <div className="h5">No pets available</div>
      )}
    </>
  );
}
