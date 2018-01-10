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

	connection.query("SELECT * FROM products", function(err, res){
		if(err) throw err;

		var values = [];
		for (var i = 0; i < res.length; i++){
			values.push([res[i].item_id, res[i].product_name, res[i].price]);
		}
		console.table(['ID', 'PRODUCT', 'PRICE'], values);
		
		findItem();

	
	});
}

function findItem(){

	function validateNumber(num){
					var reg = /^\d+$/;
					return reg.test(num) || "Enter Numbers only!";
	}

	inquirer.prompt([
			{
				name: "choice",
				type: "input",
				message: "Enter the ID of the item to purchase: ",
				validate: validateNumber
					
			},
			{
				name: "quantity",
				type: "input",
				message: "How many would you like to buy?",
				validate: validateNumber
			}
		]).then(function(answer){
			console.log(answer.choice);
			console.log(answer.quantity);

			connection.query("SELECT * FROM products WHERE ?", { item_id: answer.choice}, function(err,res){
				var customer_item_id = res[0].item_id; 
				var customer_quantity = answer.quantity;
				var total_price = customer_quantity * res[0].price;
				console.log(res[0].product_name);
				console.log(res[0].stock_quantity);

				if(answer.quantity > res[0].stock_quantity){
					console.log("Insufficient quantity! Sorry cannot order product!");
					restart();
				}
				else if(answer.quantity <= res[0].stock_quantity){
					var updated_quantity = res[0].stock_quantity - answer.quantity;
					var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
					connection.query(query, [updated_quantity, customer_item_id], function(err, result){
						console.log(`${result.affectedRows} products updated`);
						console.log("Your order has been placed!");
						console.log(res[0].product_name);
						console.log(total_price);
					});
					

				}
			});
			
		});


}

function restart(){

	inquirer.prompt({
		name: "confirm",
		message: "Would you like to buy another product?",
		type: "confirm",
		default: true
	}).then(function(answer){
		if(answer.confirm === true){
			console.log("Welcome Back!");
			start();
		}
		else{
			console.log("Goodbye!");
			connection.end();
		}
	});
}


