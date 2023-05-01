import { useState } from "react";
import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/fake.jpg"

function App() {

  const [Item, setItem] = useState("");

  async function QueryAssetHistory(event) {
    event.preventDefault();

    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["' +
        Item +
        '"]&peer=peer0.org1.example.com&fcn=getHistoryForAsset',
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
        alert("Asset history retreived successfully");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Transaction Id",
          "Product Id",
          "Product Name",
          "Brand",
          "Colour",
          "Price",
          "Size",
          "Manufacturer",
          "Seller Id",
          "TimeStamp",
          "IsDelete"
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
            if (typeof elem === "object") {
              let vals1 = Object.values(elem);
              vals1.forEach((child) => {
                let td1 = document.createElement("td");
                td1.innerText = child;
                tr.appendChild(td1);
              });
            } else {
              td.innerText = elem;
              tr.appendChild(td);
            }
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
        <a className={styles.active} href="queryassethistory">Query Asset</a>
        <a href="addreview">Add Review</a>
        <a href="queryreview">Query Review</a>
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`}}>
      <form onSubmit={QueryAssetHistory}>
        <input
          value={Item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          placeholder="Item Number"
        />
        <br />

        <input type="submit" value="Query Asset History" />
        <container id="container"></container>
      </form>
      </div>
    </div>
  );
}

export default App;
