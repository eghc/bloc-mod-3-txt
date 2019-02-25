
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

class Item{
  constructor(brand, category, fabric, color, description, quantity){
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
  add(brand, category, fabric, color, description, quantity){
    if(typeof brand != "string" || typeof category != "string" || typeof fabric != "string" ||
  typeof color != "object" || typeof description != "string" || typeof quantity != "number"){
    console.log("Data is not of the correct type");
    return null;
  }
    color.sort();
    let item = new Item( brand, category, fabric, color, description, quantity);

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
    console.log("Successful add.");
  }
  find(brand, category, colors){
    if(typeof brand != "string" || typeof category != "string" || typeof colors != "object" ){
      console.log("Data is not of the correct type");
      return null;
    }
    //get hashkey
    let mapLength = this.map.length;
    colors.sort();
    let key = this.getHashKey(brand, category, colors);
    //console.log(key);

    //if items with the key exist
    if(this.map[key%mapLength]){
      //get all items in an array
      let arr = this.map[key%mapLength].all();
      let newArr = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].brand === brand && arr[i].category === category){
          if(arr[i].color.length == colors.length){
              let equal = true;
              for(let k = 0; k<arr[i].color.length; k++){
                if(arr[i].color[k] !== colors[k]){
                  equal = false;
                  break;
                }
              }
              if(equal){
                newArr.push(arr[i]);
              }
          }
        }
      }
      return newArr;

    }

      return null;
  }

  getHashKey(brand, category, colors) {
    //sory colors before key
      //colors.sort();
      for (let i = 0; i < colors.length - 1; i++) {
          if (colors[i] > colors[i+1]) {
              console.log("Colors are not sorted");
              return null;
          }
      }
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

let data = [{
  brand: "Theory",
  category: "Tops",
  fabric: "Cotton",
  color: ["red","orange"],
  description: "bright top for Fall from Theory",
  quantity: 6
},
{
  brand: "Theory",
  category: "Tops",
  fabric: "Cotton",
  color: ["red","orange"],
  description: "bright top for Spring from Theory",
  quantity: 10
},{
  brand: "Jbrand",
  category: "Bottoms",
  fabric: "Denim",
  color: ["blue"],
  description: "great blue jeans from Jbrand",
  quantity: 8
},{
  brand: "Citizens of Humanity",
  category: "Bottoms",
  fabric: "Denim",
  color: ["blue"],
  description: "great blue jeans from Citizens",
  quantity: 10
},{
  brand: "Citizens of Humanity",
  category: "Outerwear",
  fabric: "Denim",
  color: ["black"],
  description: "black jean jacket from Citizens",
  quantity: 6
}
];

let iMap = new inventoryMap();
data.forEach(function(item){
  iMap.add(item.brand, item.category, item.fabric, item.color, item.description, item.quantity);
});

console.log(iMap.find("Citizens of Humanity","Outerwear",["black"] ));
console.log(iMap.find("Theory", "Tops", ["red","orange"]));
