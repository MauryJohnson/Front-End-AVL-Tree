function Node(data){
	this.data = data;
	this.left = null;
	this.right = null;
	this.height = 1;
}
treeroot = null;
function height(node){
	if( node == null) return 0;
	return node.height;
}
function rotateRight(node){
	 root = node.left;
	 subtree = y.right;
	 root.right = node;
	 node.left = subtree;
	 node.height = max(height(node.left),height(node.right)) + 1;
	 root.height = max (height(root.left),height(root.right)) + 1;
	 return root;
	 
 
}
function rotateLeft(node){
	 root = node.right;
	 subtree = y.left;
	 root.left = node;
	 node.right = subtree;
	 node.height = max(height(node.left),height(node.right)) + 1;
	 root.height = max (height(root.left),height(root.right)) + 1;
	 return root;
}
function getBalanceFactor(node){
	if(node == null) return 0;
	return node.right.height - node.left.height;
}
function insert(rootnode, data){
	if(rootnode == null) return new Node(data);
	if(data < rootnode.data){
		rootnode.left = insert(rootnode.left, data); 
	}else if (data > rootnode.data){
		rootnode.right = insert(rootnode.right,data); 
	}else{
		//duplicated data
		return rootnode;
	}
	//update height
	rootnode.height = max(height(rootnode.left),height(rootnode.right)) + 1;
	bFactor =  getBalanceFactor(rootnode);
	
	//left left case
	if(bFactor < -1 && data < rootnode.left.data){
		return rotateRight(rootnode);
	}
	//left right case
	if(bFactor < -1 && data > rootnode.left.data){
		rootnode.left = rotateLeft(rootnode);
		return rotateRight(rootnode);
	}
	//right right case
	if(bFactor > 1 && data > rootnode.right.data){
		return rotateRight(rootnode);
	}
	//right left case
	if(bFactor > 1 && data < rootnode.right.data){
		rootnode.right = rotateRight(rootnode);
		return rotateLeft(rootnode);
	}	
	
		
	return rootnode;

}
/*
 * 
		 * 4 - Delete 4
*		  /	\           4 is root
* 	     1    5				take furthest right child of left subtree
 * 		/ \								node=root.left
 * 										while(!HasRight(node))
 * 	   0   2								node = node.left
 */

function Delete(Dict){
	
	var Node = Dict["Node"];
	var Root = Dict["Root"];
	var Data = Dict["Data"];
	var Balance = Dict["Balance"];
	var NodesList = Dict["NodesList"];
	
	NodeList.push(Node);
	
	if(Node==null)
		return null;
	
	if(Node==Root){
		//Get Furthest Right subchild of the left subchild
		//If no root left
			//New root is right
		//else 
		
		NodeList.remove(Root);
		
		if(!Root.left){
			Root = Root.right;
		}
		else{
			var NodeLeft = Root.left;
			if(!NodeLeft.right){
				Root=NodeLeft;
			}
			else{
				//Get Furthest Right of NodeLeft
				while(NodeLeft.right){
					NodeLeft=NodeLeft.right;
				}
				Root=NodeLeft;
			}
		}
		
		NodeList.push(Root);
		
		Balance(Root);
	}
	
	if(Data>Node.data){
		if(Node.right){
			if(Node.right.data==Data){
				Node.right=null;
				Balance(Root);
				return Data;
			}
			Delete({"Root":Root,"NodesList":NodesList,"Node":Node.right,"Data":Data,"Balance":Balance});
		}
		else{
			//Data Does not Exist
		}
	}
	else if(Data<Node.data){
		if(Node.left){
			if(Node.left.data==Data){
				Node.left=null;
				Balance(Root);
				return Data;
			}
			Delete({"Root":Root,"NodesList":NodesList,"Node":Node.left,"Data":Data,"Balance":Balance});
		}
		else{
			//Data Does not Exist
		}
	}
	
}

Delete({
	"Node":rootnode,
	"Root":rootnode,
	"Data":1,
	"Balance":function(NodesList){
		//Call function for Balance of Root
		
		for(
				
			var i = NodesList.length-1;
			
			i>=0; 
			
			i-=1){
			
			NodesList[i].height -=1;
			
			
		}
		
		for(
				
				var i = NodesList.length-1;
				
				i>=0; 
				
				i-=1){
				

			var bFactor = getBalanceFactor(NodesList[i]);
			
			var rootnode = NodesList[i];
			
			if(bFactor < -1 ){
				rotateRight(rootnode);
			}
			if(bFactor > 1 ){
				rotateLeft(rootnode);
			}
			
		}

		
	}
	,
	"NodesList":[]
});

/*
3.left = insert(2,1) -> node(2)  -> update height, blance, rotated if needed -> return node(3);
2.left = insert (null, 1) -> 1 after doing height and balance - > return node(2)

       3
      /
     2
    / 
   1  
   */
/* x is rotated node , y is x's child, z is x's grandchild
 * case1 : left left case : 	
 *     		  12 -2
 *    		/  \
 * 	  	   10    14     rotateright(12)       
 *  	  /\       \15
 *       5  11
 *      /  \
 *     4   6
 *    /  
 *   2   
 *
 *          y
 *         / \x
 *        z   /\ 
 *       /\   n2 n1
 *      n3 n4
 * case2 : left right case :
 *  *         x
 *    		/  \
 * 	  	   y    n1     rotateleft(y) -> rotateright(x)      
 *  	  /\
 *       n2 z  
 *      	/\
 *     	 n3   n4
 *
 *
 *
 */

