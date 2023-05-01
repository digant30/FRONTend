import { useState } from "react";
import styles from "../home.module.css";

function App() {
  const [transactionId, settransactionId] = useState("");

  async function QueryTransaction(event) {
    event.preventDefault();

    fetch(
      "http://localhost:4000/channels/mychannel/transactions/" + transactionId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Transaction retreival successful");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Product Name",
          "Address",
          "Contact Number",
          "Mail Id",
          "Consumer Name",
          "Product Id",
          "Seller Id",
          "Seller Name"
        ];
        let tableHead = document.createElement("thead");
        let trTitle = document.createElement("tr");

        titleAttributes.forEach((titleCard) => {
          let th = document.createElement("th");
          th.innerText = titleCard;
          trTitle.appendChild(th);
        });
        tableHead.appendChild(trTitle);
        
        let tableBody = document.createElement("tbody");
        
        data.forEach((item) => {
          let tr = document.createElement("tr");

          let vals = Object.values(item);

          vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
          });
          tableBody.appendChild(tr);
        });
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        container.appendChild(table);
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div>
      <div className={styles.topnav}>
      <a href="authenticate">Authenticate</a>
        <a href="queryassethistory">Query Asset</a>
        <a className={styles.active} href="querytransaction">Query Transaction</a>
        <a href="/">Logout</a>
      </div>
      <h1>Query Transaction</h1>
      <form onSubmit={QueryTransaction}>
        <input
          value={transactionId}
          onChange={(e) => settransactionId(e.target.value)}
          type="text"
          placeholder="Tranasaction ID"
        />
        <br />

        <input type="submit" value="Query Transaction" />
        <container id="container"></container>
      </form>
    </div>
  );
}

export default App;
