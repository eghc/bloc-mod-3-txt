class Node{
  constructor(val){
    this.val = val;
    this.right = null;
    this.left = null;
  }
}

class BinaryTree{
  constructor(val){
    this.root = new Node(val);
    this.size = 1;
  }
  addNode(v){
    let n = new Node(v);
    let curr = this.root;

    while(curr){
      if(n.val > curr.val){
        if(curr.right != null){
          curr = curr.right;
        }else{
          curr.right = n;
          this.size +=1;
          return;
        }
      }else if (n.val < curr.val){
        if(curr.left != null){
          curr = curr.left;
        }else{
          curr.left = n;
          this.size +=1;
          return;
        }
      }
    }
  }
  DFShelper(node){
    let self = this;
    if(node){
      self.DFShelper(node.left);
      console.log(node.val);
      self.DFShelper(node.right);
    }
  }
  DFS(){
    let self = this;
    self.DFShelper(this.root);
  }

  findValue(val){
    let curr = this.root;
    while(curr){
      if(val > curr.val){
        if(curr.right != null){
          curr = curr.right;
        }else{
          return false;
        }
      }else if (val < curr.val){
        if(curr.left != null){
          curr = curr.left;
        }else{
          return false;
        }
      }else{
        return true;
      }
    }
  }

  getDistance(v1,v2){
	   //get distance to node 1
    let curr = this.root;
    let distanceV1 = 0;
    while(curr){
      if(v1 > curr.val){
        if(curr.right != null){
          distanceV1 += 1;
          curr = curr.right;
        }else{
          return -1;
        }
      }else if (v1 < curr.val){
        if(curr.left != null){
          distanceV1 += 1;
          curr = curr.left;
        }else{
          return -1;
        }
      }else{
        break;
      }
    }

    curr = this.root;
    let distanceV2 = 0;
    while(curr){
      if(v2 > curr.val){
        if(curr.right != null){
          distanceV2 += 1;
          curr = curr.right;
        }else{
          return -1;
        }
      }else if (v2 < curr.val){
        if(curr.left != null){
          distanceV2 += 1;
          curr = curr.left;
        }else{
          return -1;
        }
      }else{
        break;
      }
    }

    return distanceV1 + distanceV2;
  }
}


let binarytree = new BinaryTree(8);
binarytree.addNode(3);
binarytree.addNode(1);
binarytree.addNode(6);
binarytree.addNode(4);
binarytree.addNode(7);

binarytree.addNode(10);
binarytree.addNode(14);
binarytree.addNode(13);
binarytree.DFS();

console.log(binarytree.findValue(13));
console.log(binarytree.findValue(9));

console.log(binarytree.getDistance(4, 10));
console.log(binarytree.getDistance(4, 13));
