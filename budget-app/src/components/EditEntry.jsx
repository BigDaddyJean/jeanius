import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EntryForm from "./EntryForm";


export default function EditEntry() {
  const { id } = useParams();
  const [state, setState] = useState(null);
  const router = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/transactions/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res) router("/");
        setState(res);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <section className="section">
      <h2>Edit Entry</h2>
      <EntryForm
        prevState={state}
        label="edit"
        id={id}
      />
    </section>
  );
}
