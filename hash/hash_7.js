let inventory = new Map();

class Item{
  constructor(id, brandId, brand, category, fabric, color, description, quantity){
    this.id = id;
    this.brandId = brandId;
    this.brand = brand;
    this.category = category;
    this.fabric = fabric;
    this.color = color;
    this.description = description;
    this.quantity = quantity;
  }

  getDetails(){
    return {id: this.id,
      brandId: this.brandId,
      brand: this.brand,
      category: this.category,
      fabric: this.fabric,
      color: this.color,
      description: this.description,
      quantity: this.quantity
    };
  }

  addItems(num){
    this.quantity += num;
  }

  removeItems(num){
    this.quantity -= num;
  }
}


function getHashKey(brand, category, colors) {
    //complete hash for brand
    var hash_b = 0;
    if (brand.length == 0) {
        return hash_b;
    }
    for (var i = 0; i < brand.length; i++) {
        var char = brand.charCodeAt(i);
        hash_b = ((hash_b<<5)-hash_b)+char;
        hash_b = hash_b & hash_b; // Convert to 32bit integer
    }

    //complete hash for category
    var hash_c = 0;
    if (category.length == 0) {
        return hash_c;
    }
    for (var i = 0; i < category.length; i++) {
        var char = category.charCodeAt(i);
        hash_c = ((hash_c<<5)-hash_c)+char;
        hash_c = hash_c & hash_c; // Convert to 32bit integer
    }

    //complete hash for colors
    var hash_co = 0;
    if (brand.length == 0) {
        return hash_co;
    }
    for(var j = 0; j < colors.length;j++){
      for (var i = 0; i < colors[j].length; i++) {
          var char = colors[j].charCodeAt(i);
          hash_co = ((hash_co<<5)-hash_co)+char;
          hash_co = hash_co& hash_co; // Convert to 32bit integer
      }
    }

    var hash = String(hash_b) + "_" + String(hash_c) + "_" + String(hash_co);

    //console.log(hash);
    return hash;
}

function createItem(){
  let brandId = $(".BrandId")[0].value;
  let brand = $(".Brand")[0].value;
  let category = $(".Category")[0].value;
  let arr = $(".Fabric")[0].childNodes;
  let fabric;
  for(let i = 0; i < arr.length; i++){

    try{
      if(arr[i].type == 'radio' && arr[i].checked){
        fabric = arr[i].value;
      }
    }catch{
      continue;
    }
  }
  arr = $(".Color")[0].childNodes;
//console.log(arr);
  let colors = [];
  for(let i = 0; i < arr.length; i++){

    try{
      if(arr[i].type == 'checkbox' && arr[i].checked){
        colors.push(arr[i].value);
        console.log(arr[i].value);
      }
    }catch{
      continue;
    }
  }
  let description = $(".Description")[0].value;
  let quantity = $(".Quantity")[0].value;

  //getHashKey
  let id = getHashKey(brand,category,colors.join());

  //get all in bucket in Map
  //console.log(inventory.get(id));
  if(Array.isArray(inventory.get(id))){
    let newArr = inventory.get(id);
    id = id + '_' + String(newArr.length);
    newArr.push(new Item(id, brandId, brand, category, fabric, colors, description, quantity));
    inventory.set(getHashKey(brand,category,colors.join()), newArr);

  }else{
    id = id + '_0';
    let newItem = new Item(id, brandId, brand, category, fabric, colors, description, quantity);
    let arr = new Array(newItem);
    inventory.set(getHashKey(brand,category,colors.join()), arr);
  }

  console.log(inventory);

}
function findItem(){
  let brand = $(".findBrand")[0].value;
  let category = $(".findCategory")[0].value;
  let arr = $(".findColor")[0].childNodes;
  let colors = [];
  for(let i = 0; i < arr.length; i++){

    try{
      if(arr[i].type == 'checkbox' && arr[i].checked){
        colors.push(arr[i].value);
        //console.log(arr[i].value);
      }
    }catch{
      continue;
    }
  }

  let id = getHashKey(brand,category,colors.join());

  if(Array.isArray(inventory.get(id))){
    let newArr = inventory.get(id);

    var str = "<table><tr><th>id</th> <th>brandId</th> <th>brand</th> <th>category</th> <th>fabric</th> <th>color</th> <th>description</th> <th>quantity</th></tr>";
    for(var i = 0; i < newArr.length; i++){
      str += "<tr>";
      str += "<td>" + newArr[i].id + "</td>";
      str += "<td>" + newArr[i].brandId + "</td>";
      str += "<td>" + newArr[i].brand + "</td>";
      str += "<td>" + newArr[i].fabric + "</td>";
      str += "<td>" + newArr[i].category + "</td>";
      str += "<td>" + newArr[i].color + "</td>";
      str += "<td>" + newArr[i].description + "</td>";
      str += "<td>" + newArr[i].quantity + "</td>";
      str += "</tr>";
    }
    str += "</table>";
    console.log(str);
    $("#results").html(str);


  }else{
    $("#results").html("<b>Could not find any items that match your query.</b>");
  }

}
