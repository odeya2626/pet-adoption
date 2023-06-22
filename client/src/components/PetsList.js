import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { EmptyListMessage } from "../utils/Messages";
import PetCard from "./PetCard";

export default function PetsList(props) {
  const { petsList } = props;
  const page = window.location.pathname;

  return (
    <Container className="m-3">
      <Row className="d-flex align-items-center justify-content-center">
        {petsList && petsList[0] === "notFound" ? (
          <div className="h5 my-4 text-center">
            {page === "/Search"
              ? EmptyListMessage.search
              : props.isSavedPets
              ? EmptyListMessage.savedPets
              : EmptyListMessage.userPets}
          </div>
        ) : (
          petsList.map((pet) => (
            <Col
              key={pet.id}
              md={3}
              className="d-flex justify-content-center align-items-center my-3 me-3"
            >
              <PetCard pet={pet} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
