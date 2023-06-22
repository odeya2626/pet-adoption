import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import MyPets from "./pages/MyPets";
import PetPage from "./pages/PetPage";
import SiteModal from "./components/SiteModal";
import PetsContextProvider from "./contexts/PetsContext";
import UsersContextProvider from "./contexts/UsersContext";
import PrivateRoute, { AdminRoute } from "./components/PrivateRoute";
import AddPetPage from "./pages/AddPetPage";
import PetsPage from "./pages/PetsPage";
import UsersPage from "./pages/UsersPage";
import User from "./pages/User";
import Error from "./pages/Errors";

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  const showModal = (state) => {
    setModalShow(state);
  };

  return (
    <div className="AppContainer d-flex flex-column">
      <UsersContextProvider showModal={showModal}>
        <PetsContextProvider>
          <BrowserRouter>
            <NavBar />
            <SiteModal
              showModal={showModal}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypets"
                element={
                  <PrivateRoute>
                    <MyPets />
                  </PrivateRoute>
                }
              />
              <Route path="/pet" element={<PetPage />} />
              <Route
                path="/users"
                element={
                  <AdminRoute>
                    <UsersPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/user"
                element={
                  <AdminRoute>
                    <User />
                  </AdminRoute>
                }
              />
              <Route
                path="/pets"
                element={
                  <AdminRoute>
                    <PetsPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/addpet"
                element={
                  <AdminRoute>
                    <AddPetPage />
                  </AdminRoute>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </PetsContextProvider>
      </UsersContextProvider>
    </div>
  );
}
