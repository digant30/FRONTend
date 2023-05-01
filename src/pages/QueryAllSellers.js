import styles from "../home.module.css";
import background from "/home/digant/FYP/api/client/src/images/adidas.png";

function App() {

  async function QueryAllSellers(event) {
    event.preventDefault();

    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["SELLER"]&peer=peer0.org1.example.com&fcn=queryAllSellers',
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
        alert("All Sellers query successful");
        console.log(data);

        let container = document.getElementById("container");

        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Seller Number",
          "Address",
          "Brand",
          "Manager Name",
          "Manager Id",
          "Store Name",
          "Seller Id"
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
        <a href="addproduct">Add Product</a>
        <a href="addseller">Add Seller</a>
        <a href="changeowner">Change Product Owner</a>
        <a href="queryseller">Query Seller</a>
        <a className={styles.active} href="queryallsellers">Query All Sellers</a>
        <a href="queryconsumermanu">Query Consumer</a>
        <a href="queryallconsumersmanu">Query All Consumers</a> 
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`}}>
      <form onSubmit={QueryAllSellers}>

        <input type="submit" value="Query All" />
        <container id="container"></container>
      </form>
      </div>
    </div>
  );
}

export default App;
