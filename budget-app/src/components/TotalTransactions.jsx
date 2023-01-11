import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./TotalTransactions.module.css";

export default function TotalTransactions() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/transactions`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  const total = data?.reduce((accu, curr) => accu + curr.amount, 0);
  let color = "";
  if (total > 1000) color = "green";
  else if (total < 0) color = "red";

  return (
    <section className="section">
      <h2>
        Total Transactions: <span className={color}>{total}</span>
      </h2>
      {!data && <p>Loading....</p>}
      {!data?.length && <p>No item was found</p>}
      <ul className={style.list}>
        {data?.map((item, i) => (
          <Link to={`/transactions/details/${item._id}`} key={i}>
            <li>
              <span>
                {Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                  new Date(item.date)
                )}
              </span>
              <span>{item.item_name}</span>
              <span>{item.amount}</span>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
