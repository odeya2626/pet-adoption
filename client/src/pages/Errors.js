import React from "react";
import ErrPageFormat from "../components/ErrPageFormat";
import NotFoundImg from "../img/NotFound.jpeg";

export function Error404() {
  const title = "Page Not Found";
  const img = NotFoundImg;
  const text = "The page you are looking for does not exist.";

  return <ErrPageFormat {...{ img, title, text }} />;
}

export function Error403() {
  const title = "Access Denied";
  const text = "You do not have permission to access this page.";
  const img = NotFoundImg;

  return <ErrPageFormat {...{ img, title, text }} />;
}
export default function Error() {
  const is403 = window.location.pathname.endsWith("access-denied");
  return is403 ? <Error403 /> : <Error404 />;
}
