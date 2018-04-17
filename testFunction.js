//show products
var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  item();
});

function item() {
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message:
        "Which product would you like to purchase?? Please enter an item_id \n\n"
    })
    .then(function(answer, err) {
      if (err) {
        throw err;
        console.log("PLEASE ENTER AN ITEM ID NUMBER......!!!");
        item();
      } else {
        answer.action = parseInt(answer.action);
        var item = answer.action;
        quantity();
      }
    });
}

function quantity() {
  inquirer
    .prompt({
      name: "count",
      type: "input",
      message: "How many would you like to purchase?? Please enter number \n\n"
    })
    .then(function(answer, err) {
      if (err) {
        throw err;
        console.log("PLEASE ENTER A VALID NUMBER......!!!");
        quantity();
      } else {
        answer.count = parseInt(answer.count);
        //check if entry is a number
        if (isNaN(answer.count) === false) {
          var quant = parseInt(answer.count);
          confirmOrder();
        }
      }
    });
}

//verify order details
function confirmOrder () {
  var query = "SELECT product_name, price, stock_quantity FROM products WHERE ?";
  connection.query(query, { item_id: item }, function(err, res) {
      var cost = quant * res[0].price;
      var response = "";
      inq.prompt({
              name: "confirmOrder",
              type: "confirm",
              message: "Please confirm you want to purchase " + quant + " " + res[0].product_name + " for $" + cost
          })
          .then(function(answer) {
              if (answer.confirmOrder === true) {
                  if (quant <= res[0].stock_quantity) {
                      response = "\n\nAwesome! We are processing your order!\n.....\n.....\n.....\n.....\n.....\n";
                      var newQty = res[0].stock_quantity - quant;
                      var prodName = res[0].product_name;
                      bamazon.createOrder(item, prodName, quant, cost, newQty);
                      bamazon.updateDB(item, newQty);
                  } else {
                      response = "\n\nSorry, but you've requested more " + res[0].product_name + " than we have available.\n\n";
                      bamazon.stopDb();
                  }
                  console.log(response);
              } else {
                  console.log("\n\nOkay. See ya later");
                  bamazon.stopDb();
              }
          });
  })
}
