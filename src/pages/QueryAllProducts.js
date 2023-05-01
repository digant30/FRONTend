import styles from "../home.module.css";
import background from "../images/product.jpeg"

function App() {
  
  async function QueryAllProducts(event) {
    event.preventDefault();
    console.time();
    fetch(
      'http://localhost:4000/channels/mychannel/chaincodes/smartContract?args=["ITEM"]&peer=peer0.org1.example.com&fcn=queryAllProducts',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then(function (response) {
        console.timeEnd();
        return response.json();
      })
      .then(function (data) {
        alert("All Products query successful");
        console.log(data);

        let container = document.getElementById("container");
        
        let table = document.createElement("table");
        table.setAttribute("class", styles.styledtable);

        const titleAttributes = [
          "Item Number",
          "Brand",
          "Colour",
          "Product Id",
          "Product Name",
          "Manufacturer",
          "Price",
          "Seller Id",
          "Size"
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
        <a href="addconsumer">Add Consumer</a>
        <a href="queryprod">Query Product</a>
        <a className={styles.active} href="queryall">
          Query All Products
        </a>
        <a href="queryownerprod">Query Product Manufacturer</a>
        <a href="queryconsumer">Query Consumer</a>
        <a href="queryallconsumers">Query All Consumers</a>
        <a href="queryconsumercontact">Query Consumer By Contact</a>
        <a href="/">Logout</a>
      </div>
      <div className={styles.forms} style={{backgroundImage: `url(${background})`, backgroundSize: `500px 200px`}}>
      <form onSubmit={QueryAllProducts}>
        
        <input type="submit" value="Query All" />
        <container id="container"></container>
      </form>
      </div>
    </div>
  );
}

export default App;
