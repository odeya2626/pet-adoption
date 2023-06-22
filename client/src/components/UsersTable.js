import React from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import { useUsersContext } from "../contexts/UsersContext";

export default function UsersTable({ list, isLoading }) {
  const { handleMakeAdmin } = useUsersContext();
  const navigate = useNavigate();
  return (
    <>
      <Table striped hover>
        <thead>
          <tr>
            <th className="first-column">First Name</th>
            <th className="second-column">Last Name</th>
            <th>Email</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {list.length
            ? list.map((user) => (
                <tr
                  key={user.id}
                  className="align-middle pointer"
                  onClick={() => navigate(`/user?id=${user.id}`)}
                >
                  <td className="first-column">{user.firstName}</td>
                  <td className="second-column">{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin === 1 ? (
                      "admin"
                    ) : (
                      <button
                        className="button"
                        onClick={(e) => {
                          handleMakeAdmin(e, user.id);
                        }}
                      >
                        + Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      {isLoading ? (
        <Spinner className="red me-3" hidden={!isLoading} />
      ) : (
        !list.length && <div className="h5">No users available</div>
      )}
    </>
  );
}
