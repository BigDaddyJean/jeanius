import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./NewEntry.module.css";


const initialState = {
  date: Date.now(),
  item_name: "",
  amount: 0,
  from: "",
  category: "",
};

const EntryForm = ({ id, prevState, label }) => {
  const [status, setStatus] = useState("");
  const [state, setState] = useState({ ...initialState });
  const router = useNavigate();

  useEffect(() => {
    if (prevState)
      setState({...prevState});
  }, [prevState])

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB").split("/").reverse().join("-");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      let url = `${process.env.REACT_APP_BACKEND}/transactions`;
      let method = "POST";
      let redirect = "/";

      if (label === "edit") {
        url += `/${id}`;
        method = "PUT";
        redirect = `/transactions/details/${id}`;
      }
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (response.status == 200) {
        setState({ ...initialState });
        setStatus("success");
        router(redirect);
      }
    } catch (error) {
      console.log(error);
    }
    setStatus("fail");
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          placeholder="date"
          value={formatDate(state.date)}
          onChange={(e) => setState({ ...state, date: e.target.valueAsDate })}
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={state.item_name}
          onChange={(e) => setState({ ...state, item_name: e.target.value })}
        />
        <label>Amount</label>
        <input
          type="number"
          placeholder="Amount"
          value={state.amount}
          onChange={(e) => setState({ ...state, amount: e.target.value })}
        />
        <label>From</label>
        <input
          type="text"
          placeholder="From"
          value={state.from}
          onChange={(e) => setState({ ...state, from: e.target.value })}
        />

        <label>Category</label>
        <input
          type="text"
          placeholder="Category"
          value={state.category}
          onChange={(e) => setState({ ...state, category: e.target.value })}
        />
        <button className="btn">{label} Entry</button>
      </form>
      {status && (
        <p className={status}>
          {status === "fail"
            ? "Something went wrong"
            : "Successfully created a new entry"}
        </p>
      )}
    </>
  );
};

export default EntryForm;
