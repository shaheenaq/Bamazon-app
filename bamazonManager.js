
var inquirer = require("inquirer");
var mysql = require("mysql");

require("console.table");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	start();
});

function start(){

	inquirer.prompt({
		message: "What would you like to do?",
		type: "list",
		name: "task",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}).then(function(answer){
		switch(answer.task){
			case "View Products for Sale":
				viewAll(); 
				break;
			case "View Low Inventory":
				viewLow();
				break;
			case "Add to Inventory":
				viewAdd();
				break;
			case "Add New Product":
				addNew();
				break;
			}
	});
}

function viewAll(){
	connection.query("SELECT * FROM products;", function(err, res){
		if(err) throw err;

		var values = [];
		for(var i = 0; i < res.length; i++){
			values.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
		}
		
		console.table(['ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'QUANTITY'], values);
		});
}

function viewLow(){
	connection.query("SELECT * FROM products WHERE stock_quantity < 5;", function(err, res){
		if(err) throw err;

		var values = [];
		for(var i = 0; i < res.length; i++){
			values.push([res[i].item_id, res[i].product_name, res[i].stock_quantity]);
		}
		console.table(['ID', 'PRODUCT', 'QUANTITY'], values);
	});
}

function viewAdd(){

	inquirer.prompt([
	{
		message: "ADD MORE: Enter the ID of the item: ",
		name: "choice",
		type: "input"
	},
	{
		name: "quantity",
		type: "input",
		message: "QUANTITY: How many would you like to add?"
	}

	]).then(function(answer){
		connection.query("SELECT * FROM products WHERE ?",{item_id: answer.choice}, function(err,res){
			var updated_quantity = res[0].stock_quantity + parseInt(answer.quantity);
			var product_id = res[0].item_id;
			var addQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";

			connection.query(addQuery,[updated_quantity, product_id], function(err, result){
				console.log(`${result.affectedRows} products updated`);
				console.log(res[0].product_name + " UPDATED QUANTITY: " + updated_quantity);
			});
		});
	});
}

function addNew(){

	inquirer.prompt([
	{
		name: "new_item",
		type: "input",
		message: "Enter name of item to add: "
	},
	{
		name: "new_price",
		type: "input",
		message: "Enter the price of new item: "
	},
	{
		name: "new_dept",
		type: "input",
		message: "Enter the department name: "
	},
	{
		name: "new_quantity",
		type: "input",
		message: "Enter the quantity of the item: "
	}
	]).then(function(answer){
		var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)";


		connection.query(query,[answer.new_item, answer.new_dept, answer.new_price, answer.new_quantity], function(err, res){
			console.log("New Product Added!");
		});
	});

}


