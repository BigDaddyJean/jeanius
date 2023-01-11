import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const deleteIt = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND}/transactions/${id}`, { method: "DELETE" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/transactions/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (!res) navigate("/");
        setData(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!data._id) return <h1>Loading...</h1>
  return (
    <section className="section">
      <h2>Transaction Details</h2>
      <div>
        <h3>Name</h3>
        <p>{data.item_name}</p>

        <h3>Date</h3>
        <p>{Intl.DateTimeFormat("en-US", {dateStyle: "medium"}).format(new Date(data.date))}</p>

        <h3>Amount</h3>
        <p>{data.amount}</p>

        <h3>From</h3>
        <p>{data.from}</p>

        <h3>Category</h3>
        <p>{data.category}</p>
      </div>
      <div className="btn-group">
        <Link className="btn" to={`/transactions/edit/${id}`}>
          Edit
        </Link>
        <button onClick={deleteIt} className="btn danger">
          Delete
        </button>
      </div>
    </section>
  );
};

export default Detail;
