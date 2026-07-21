const DB_KEY = "gaule_chulo_database";


function getDatabase(){

let data = localStorage.getItem(DB_KEY);

if(data){
return JSON.parse(data);
}

return {
orders:[],
stock:[]
};

}



function saveDatabase(data){

localStorage.setItem(
DB_KEY,
JSON.stringify(data)
);

}



function saveOrder(order){

let db=getDatabase();

db.orders.push(order);


order.items.forEach(item=>{

reduceStock(item[0],1);

});


saveDatabase(db);

}




function getOrders(){

return getDatabase().orders;

}




function addStock(name,qty){

let db=getDatabase();

let item=db.stock.find(
x=>x.name===name
);


if(item){

item.qty+=qty;

}else{

db.stock.push({
name:name,
qty:qty
});

}


saveDatabase(db);

}





function reduceStock(name,qty){

let db=getDatabase();

let item=db.stock.find(
x=>x.name===name
);


if(item){

item.qty-=qty;

if(item.qty<0){
item.qty=0;
}

}


saveDatabase(db);

}




function getStock(){

return getDatabase().stock;

}