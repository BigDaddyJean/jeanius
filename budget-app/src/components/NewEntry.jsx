import React from "react";
import EntryForm from "./EntryForm";


export default function AddEntry() {

  return (
    <section className="section">
      <h2>Add A New Item</h2>
      <EntryForm
        label="add"
      />
    </section>
  );
}
