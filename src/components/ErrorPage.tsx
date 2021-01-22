import React from "react";

interface ErrorPageProps {
  errorCode: number;
}
function ErrorPage(props: ErrorPageProps) {
  const { errorCode } = props;
  return (
    <div>
      <h1 style={{ marginTop: "50px", textAlign: "center" }}>{errorCode}</h1>
      <h4 style={{ color: "red" }}>Something went wrong! Try again</h4>
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Try refreshing the page
      </p>
    </div>
  );
}
export default ErrorPage;
