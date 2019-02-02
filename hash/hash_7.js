
class Node{
  constructor(item){
    this.value = item;
    this.next = null;
  }
}

//only used for each value in the array
class LinkedList{
  constructor(item){
    this.head = new Node(item);
  }
  find(item){
    let curr = this.head;
    while(curr != null){
      if(curr.value === item){
        return curr.value;
      }
      curr = curr.next;
    }
  }
  all(){
    let arr = [];
    let curr = this.head;
    while(curr != null){
      arr.push(curr.value);
      curr = curr.next;
    }
    return arr;
  }
  add(item){
    let curr = this.head;
    let count = 0;
    while(curr.next != null){
      curr = curr.next;
      count += 1;
    }
    curr.next = new Node(item);

  }
}

class inventoryMap{
  constructor(){
    this.map = new Array(10);
    this.items = 0;
  }
  addHelper(key, item, m){
        //check if an item is at that location
        // console.log(key);
        // console.log(m.length);
        if(m[key%m.length]){
          //handle collision w/ linked list
          m[key%m.length].add(item);
        }else{
          //insert into that spot
          m[key%m.length] = new LinkedList(item);
        }
  }
  add(item){
    let mapLength = this.map.length;
    //resize array
    if(this.items/this.map.length > 0.75){
      //create new map of exponential size
      let newMap = new Array(this.map.length*this.map.length);

      //get each item of the map and put in new mapLength
      for(let i = 0; i < this.map.length; i++){
        //if it is not an empty spot
        if(this.map[i]){
          //get all items from the LinkedList
          let ll = this.map[i].all();
          for(let j = 0; j < ll.length; j++){
            //get the keys of each item
            let k = this.getHashKey(ll[j].brand, ll[j].category, ll[j].color);

            //TODO: put into newMap
            this.addHelper(k, ll[j], newMap);
          }
        }
      }
      this.map = newMap;
    }

    let key = this.getHashKey(item.brand, item.category, item.color);
    //console.log(key);
    this.addHelper(key, item, this.map);
    //add to items
    this.items += 1;
  }
  find(brand, category, colors){
    //get hashkey
    let mapLength = this.map.length;
    let key = this.getHashKey(brand, category, colors);
    //console.log(key);

    //if items with the key exist
    if(this.map[key%mapLength]){
      //get all items in an array
      let arr = this.map[key%mapLength].all();
      let newArr = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].brand === brand && arr[i].category === category){
          arr[i].color.forEach((c1) => colors.forEach((c2) => {
            if(c1 == c2){
              newArr.push(arr[i]);
            }
          }));
        }
      }
      return newArr;

    }

      return null;
  }

  getHashKey(brand, category, colors) {
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
      for(var j = 0; j < colors.length; j++){
        for (var i = 0; i < colors[j].length; i++) {
            var char = colors[j].charCodeAt(i);
            hash_co = ((hash_co<<5)-hash_co)+char;
            hash_co = hash_co& hash_co; // Convert to 32bit integer
        }
      }

      var hash = hash_b+ hash_c + hash_co;
      if(hash < 0){
        hash *= -1;
      }

      //console.log(hash);
      return hash;
  }

}

class Item{
  constructor(brandId, brand, category, fabric, color, description, quantity){
    this.brandId = brandId;
    this.brand = brand;
    this.category = category;
    this.fabric = fabric;
    this.color = color;
    this.description = description;
    this.quantity = quantity;
  }


  addItems(num){
    this.quantity += num;
  }

  removeItems(num){
    this.quantity -= num;
  }
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
      }
    }catch{
      continue;
    }
  }
  let description = $(".Description")[0].value;
  let quantity = $(".Quantity")[0].value;

  let item = new Item(brandId, brand, category, fabric, colors, description, quantity);
  iMap.add(item);
  $("#doneCreation").html("<b>Success</b>");

  //get all in bucket in Map
  //console.log(inventory.get(id));
  // if(Array.isArray(inventory.get(id))){
  //   let newArr = inventory.get(id);
  //   id = id + '_' + String(newArr.length);
  //   newArr.push(new Item(id, brandId, brand, category, fabric, colors, description, quantity));
  //   inventory.set(getHashKey(brand,category,colors.join()), newArr);
  //
  // }else{
  //   id = id + '_0';
  //   let newItem = new Item(id, brandId, brand, category, fabric, colors, description, quantity);
  //   let arr = new Array(newItem);
  //   inventory.set(getHashKey(brand,category,colors.join()), arr);
  // }

  //console.log(iMap);

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

  //TODO: fix below
  let newArr = iMap.find(brand, category, colors);

  if(newArr){
    //let newArr = inventory.get(id);

    var str = "<table><tr><th>brandId</th> <th>brand</th> <th>category</th> <th>fabric</th> <th>color</th> <th>description</th> <th>quantity</th></tr>";
    for(var i = 0; i < newArr.length; i++){
      str += "<tr>";
      //str += "<td>" + newArr[i].id + "</td>";
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
let iMap = new inventoryMap();
