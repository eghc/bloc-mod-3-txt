
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
    while(curr.next != null){
      curr = curr.next;
    }
    curr.next = new Node(item);

  }
}

class customerMap{
  constructor(){
    this.map = new Array(10);
    this.items = 0;
  }
  addHelper(key, item, m){
        //check if an item is at that location
        //console.log(key);
        ///console.log(m.length);
        if(m[key%m.length]){
          //handle collision w/ linked list
          m[key%m.length].add(item);
        }else{
          //insert into that spot
          m[key%m.length] = new LinkedList(item);
        }
  }
  add(number, name, address1, address2){
    if(typeof address1 != "string" || typeof address2 != "string" || typeof number != "number" || typeof name != "string"){
      console.log("Data is not of the correct type");
      return null;
    }

    let newCustomer = new Customer(name);

    if(number< 1000000000){
      console.log("Not a valid phone number");
      return null;
    }
    else{
      newCustomer.phone  = number;
      newCustomer.address = address1 + " " + address2;
    }
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
            let k = this.getHashKey(ll[j].phone);

            //TODO: put into newMap
            this.addHelper(k, ll[j], newMap);
          }
        }
      }
      this.map = newMap;

    }

    let key = this.getHashKey(newCustomer.phone);
    //console.log(key);
    this.addHelper(key, newCustomer, this.map);
    //add to items
    this.items += 1;
    console.log("Successful add");
  }
  find(phone){
    //get hashkey
    let mapLength = this.map.length;
    let key = this.getHashKey(phone);
    //console.log(key);

    //if items with the key exist
    if(this.map[key%mapLength]){
      //get all customers with the phone number in an array
      let arr = this.map[key%mapLength].all();
      let newArr = [];
      for(let i = 0; i < arr.length; i++){
        if(arr[i].phone === phone){
          newArr.push(arr[i]);
        }
      }
      return newArr;

    }

      return null;
  }
  getHashKey(num) {
      var hash = 0;
      num = num.toString();
      if (num.length == 0) {
          return hash;
      }
      for (var i = 0; i < num.length; i++) {
          var char = num.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
      }
      //console.log(hash);
      return hash;
  }
}

class Customer{
  constructor(name){
    this.name = name;
    this.phone = -1;
    this.address = "";
  }
}
let data = [{
  number: 8558885555,
  name: "Jane Doe",
  address1: "123 Purple St.",
  address2: "Los Angeles, CA 90066"
},
{
  number: 8558886666,
  name: "John Doe",
  address1: "124 Purple St.",
  address2: "Los Angeles, CA 90066"

},{
  number: 9995559999,
  name: "Mikey Mouse",
  address1: "111 Disney St.",
  address2: "Toon Town, CA 90066"
},{
  number: 9995559999,
  name: "Minney Mouse",
  address1: "111 Disney St.",
  address2: "Toon Town, CA 90066"
}];

let cMap = new customerMap();
data.forEach(function(item){
  cMap.add(item.number, item.name, item.address1, item.address2);
});

console.log(cMap.find(9995559999));
console.log(cMap.find(9999999999));
