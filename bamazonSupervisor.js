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
		choices: ["View Product Sales by Department", "Create New Department", "Finish"]
	}).then(function(answer){
		switch(answer.task){
			case "View Product Sales by Department":
				viewSales(); 
				break;
			case "Create New Department":
				createNew();
				break;
			case "Finish":
				console.log("GoodBye!")
				connection.end();
			}
	});
}

function viewSales(){
	var query = "SELECT department_id, departments.department_name, SUM(over_head_costs) AS Cost, ";
	query += "SUM(product_sales) AS Sales, SUM(product_sales - over_head_costs) AS Profit ";
	query += "FROM departments INNER JOIN products ON departments.department_name=products.department_name ";
	query += "GROUP BY department_id, department_name;"

	connection.query(query, function(err, res){
		if(err) throw err;
		// console.log(res);
		var values = [];
		for(var i = 0; i < res.length; i++){
			values.push([res[i].department_id, res[i].department_name, res[i].Cost, res[i].Sales, res[i].Profit]);
		}
		// console.log('\033[2J');
		console.table(['DEPT ID', 'DEPT', 'COST', 'SALES', 'PROFIT'], values);
		start();
	});
}

function createNew(){

	inquirer.prompt([
	{
		name: "new_dept",
		type: "input",
		message: "Enter name of department to add: "
	},
	{
		name: "new_cost",
		type: "input",
		message: "Enter the over head cost amount: "
	}
	
	]).then(function(answer){
		var query = "INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)";


		connection.query(query,[answer.new_dept, answer.new_cost], function(err, res){
			console.log("New Department Added!");
			start();
		});
	});
}


