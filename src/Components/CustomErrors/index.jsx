/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function NotFound({ message, status }) {
  return (
    <div>
      <h1>{status} Error</h1>
      <h1>{message}</h1>
      <p>Here is the link to homepage:</p>
      <Link to="/">Home</Link>
    </div>
  );
}
