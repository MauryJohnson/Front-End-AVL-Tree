function TNode(data){
	this.data = data;
	this.left = null;
	this.right = null;
	this.height = 0;
}

Root = null;

function GetAllChildren(Dict){
	
	var Node = Dict["Node"];
	
	var List = Dict.List;
	
	if(Node.left){
		List.push(Node.left);
		GetAllChildren({"Node":Node.left,"List":List});
	}
	if(Node.right){
		List.push(Node.right);
		GetAllChildren({"Node":Node.right,"List":List});
	}
	
}

function GetParent(Dict){
	
	var List = Dict["List"];
	var Node = Dict["Node"];
	var data = Dict["Data"];
	
	List.push(Node);
	
	//console.log("Data:"+data+" Node:"+Node.data)
	
	if(Node == null){
		return null;
	}
	if(data < Node.data){
		if(Node.left.data===data){
		    console.log("found data 1:"+data);
			
			console.log(document.getElementById(Node.data+""))
			
			List.push(Node.left);
			
			return {"Div":document.getElementById(Node.data+""),"Type":"Left","Node":Node};
		}
		return GetParent({"Node":Node.left,"Data":data,"List":List}); 
	}else if (data > Node.data){
		if(Node.right){
			if(Node.right.data===data){
				console.log("found data 2:"+data);
				
				//console.log(document.getElementById(Node.data+""))
				
				List.push(Node.right);
				
				return {"Div":document.getElementById(Node.data+""),"Type":"Right","Node":Node};
			}
		}
		return GetParent({"Node":Node.right,"Data":data,"List":List}); 
	}else{
		//duplicated data
		console.log("found data 3:"+data);
		
		console.log(document.getElementById(Node.data+""))
		
		return {"Div":document.getElementById(Node.data+""),"Type":"NONE"};
	}
	
	//var bFactor =  getBalanceFactor(Node);
	
	//return Node;
}

function GetMaxWidth(L){
	var M = -1;
	var ML = -1;
	var Node;
	
	for(var i in L){
		if(L[i].length>M){
			M=L[i].length;
			ML = i;
			console.log("Level::"+i);
			Node = L[i].Node;
		}
	}
	return {"MaxWidth":M,"MaxWidthLevel":ML};
}

function DeepestChild(Dict){
	
	var Ptr = Dict["Ptr"];
	
	var List = Dict["List"];
	
	if(Ptr==null){
		console.log("\nNO POINTER\n");
		return 0;
	}
	
	List.push(Ptr);
	
	if(Ptr.right!=null && Ptr.left!=null){

		List.push(Ptr.right);

		List.push(Ptr.left);
		
		return 1+(Depth({"Ptr":(Ptr.right),"List":List})>Depth({"Ptr":(Ptr.left),"List":List}) 
				? Depth({"Ptr":(Ptr.right),"List":List}):Depth({"Ptr":(Ptr.left),"List":List}));
	}
	else if(Ptr.right==null && Ptr.left!=null){

		List.push(Ptr.left);
		return 1+Depth({"Ptr":(Ptr.left),"List":List});
	}
	else if(Ptr.right!=null && Ptr.left==null){

		List.push(Ptr.right);

		return 1+Depth({"Ptr":(Ptr.right),"List":List});
	}
	
	return 0;

}

//Function to Shift Node and All Parents Except ROOt X direction
//Must shift by difference
function Shift(Nodes,X){
	
	var Dupe = {};
	
	//Remove Root....
	Nodes.splice(0,1)
	
	console.log("Shift Nodes:");
	for(var i in Nodes){
		
		if(!Dupe[Nodes[i].data]){
			Dupe[Nodes[i].data] = Nodes[i].data;
		}
		else{
			Nodes.splice(i,1);
		}
		
		if(Nodes[i])
		console.log(Nodes[i].data);
		
	}
	console.log("By:"+X);
	
	for(var i in Nodes){
		
		var E = document.getElementById(Nodes[i].data+"");
		
		var X2 = parseInt(E.style.left);
		
		console.log("Old Left:"+X2);
		
		E.style.left =  (X2+X)+ "px";
	
		console.log("New Left:"+E.style.left);
		
	}
	
	
}

//Clear Up the spacing
function CleanUpSpacing(LevelDict){

	var SpacingClean = true;
	
	var Iterations = 1;
	
	//do{
	
		SpacingClean=true;
		
		//Use this to detect collision
		//x+","+y : ObjectNode
		var PositionDict = {
				
				
		}
		
		//Check for collisions, then shift
		for(var i in LevelDict){
			
			for(var j in LevelDict[i]){
				
				var Data = LevelDict[i][j];
				
				var Element = document.getElementById(Data.Node.data+"");
				
				var X = parseInt(Element.style.left);
				
				var Y = parseInt(Element.style.top);
				
				if(!PositionDict[X+","+Y]){
					PositionDict[X+","+Y] = {"Element":Element,"Node":Data.Node};
				}
				else{
					
					SpacingClean=false;
					
					var Element2 = PositionDict[X+","+Y]["Element"];
					
					var Node2 = PositionDict[X+","+Y]["Node"];
					
					//Collision
					
					console.log(Element.id+" Collides with: "+Element2.id);
					
					//Shift left by 5 and shift right by 5
					//Shift(GetParentNodes())
					
					var List = [];
					
					var P = GetParent({"Node":Root,"Data":Data["Node"].data,"List":List});
					
					var Type1 = P["Type"];
					
					GetAllChildren({"Node":P.Node,"List":List});
					
					var List2 = [];
					
					var P2 = GetParent({"Node":Root,"Data":Node2.data,"List":List2});
					
					var Type2 = P2["Type"];
					
					GetAllChildren({"Node":P2["Node"],"List":List2});
					
					var XDifference = Math.abs(
					parseInt(Element2.style.left) - parseInt(Element.style.left));
					
					//Also need to add the distance from here to deepest child node for each
					//each collided
					var DCL1 = [];
					var DeepestChild1 = DeepestChild({"Ptr":Data["Node"],"List":DCL1});
					console.log("Deepest Child 1:"+(DCL1[DCL1.length-1].data));
					
					if(DCL1[DCL1.length-1].data == Data["Node"].data){
						
						//DCL1 = [];
						
						XDifference+=10;
						
						//DeepestChild1 = DeepestChild({"Ptr":Root,"List":DCL1});
						
					}
						//
					
					var DCL2 = [];
					var DeepestChild2 = DeepestChild({"Ptr":Node2,"List":DCL2});
					console.log("Deepest Child 2:"+(DCL2[DCL2.length-1].data));
					
					//if(DCL2[DCL2.length-1].data == Node2.data)
						//XDifference+=10;
					
					var EDC1 = document.getElementById(DCL2[DCL2.length-1].data+"");
					var EDC2 = document.getElementById(DCL1[DCL1.length-1].data+"");
					
					XDifference+=Math.abs(parseInt(EDC1.style.left) - parseInt(EDC2.style.left));
					
					console.log("Type1:"+Type2);
					
					console.log("Type2L"+Type2);
					
					console.log("XDiff:"+XDifference);
					
					var XDifference2 = 0;
					
					var XDifference3 = 0;
					
					if(Type1==Type2){
						
						XDifference2 = Math.abs(
								parseInt(document.getElementById(Node2.data+"").style.left) - 
								parseInt(Element2.style.left));
						
						XDifference3 = Math.abs(parseInt(Element.style.left) - 
								parseInt(document.getElementById(Data["Node"].data+"").style.left));
						
						if(Node2.data>Data["Node"].data){
							
							Shift(List,-XDifference + XDifference3);
							
							Shift(List2,XDifference  + XDifference2);
						}
						else{
							Shift(List2,-XDifference  + XDifference2);
							
							Shift(List,XDifference  + XDifference3);
						}
						
					}
					else{
						
						Shift(List,(Type1=="Left"?XDifference:-XDifference));
						
						Shift(List2,(Type2=="Right"?-XDifference:XDifference));
					}
				}
				
			}
			
		}
		
		//Iterations+=1;
	
	//}while(!SpacingClean && Iterations<10);
	
}

function Render(){
	
	var AB = document.getElementById("AddButton");
	
	var List = [];

	//Everything you need
	BFS({"Queue":[Root],"List":List,"Height":0,"X":0});
	
	var Y = AB.getBoundingClientRect().y + 40;
	
	//All Nodes sorted by level
	var LevelDict = {};
	
	for(var i in List){
		if(!LevelDict[List[i].Height]){
			LevelDict[List[i].Height] = [];
		}
		
		LevelDict[List[i].Height].push(List[i]);
	}
	
	var Div = document.getElementById("AVLTree");
	
	Div.innerHTML = "";
	
	var MWL = GetMaxWidth(LevelDict);
	
	var MaxWidth = MWL["MaxWidth"] * 10;
	
	var MaxWidthLevel = MWL["MaxWidthLevel"] / 10;
	
	console.log("Max Width:"+MaxWidth);
	console.log("Max Width Level:"+MaxWidthLevel);
	
	//Iterate each children List by MaxWidth / childrenList.length
	//Also Iterate each child by X1
	
	console.log("All Levels Sorted:\n");
	
	//This just places all of the inserted nodes on the document
	for(var i in LevelDict){
		console.log(LevelDict[i]);
		
		var X;
		
		X = Div.getBoundingClientRect().right/2
			
		for(var j in LevelDict[i]){
			
			console.log(X);
			
			var Data = LevelDict[i][j];
			
			var Div2 = document.createElement("div");
			
			Div2.id = Data["Node"].data+""
			
			Div2.style.fontSize="20px";
			
			Div2.innerHTML = Data["Node"].data;
			
			Div2.style.position="absolute";
			
			var D = GetParent({"Node":Root,"Data":Data["Node"].data,"List":[]});
			
			var Div3 = D["Div"];
			
			console.log(Div3);
			
			if(Div3){
				
				console.log(Div3);
				
				var Children = JSON.parse(Div3.getAttribute("Children"));
				
				if(!Children){
					Children = [];
				}
				
				if(D["Type"]==="Left"){
					X = Div3.getBoundingClientRect().x -10 
					- MaxWidth //- Math.pow(2,Depth(D.Node)) //+ 10*(i/10)
					- 10*Depth(Root);
					//SOLUTION 1
					//// (j+1)
				}
				else if(D["Type"]==="Right"){
					X = Div3.getBoundingClientRect().x + 10 
					+ MaxWidth //+ Math.pow(2,Depth(D.Node)); //- 10*(i/10)
					+ 10*Depth(Root);
					//SOLUTION 1
					/// (j+1)
				}
				
				Children.push({"Data":Data["Node"].data,"X":X});
				
				Div3.setAttribute("Children",JSON.stringify(Children));
			}
			
			Div2.style.left = X+"px";
			
			Div2.style.top = Y+"px";
			
			Div.appendChild(Div2);
			
			//X+=10;
		}	
		
		
		Y+=10;
		
	}
	
	//Then have to order by each parent
	CleanUpSpacing(LevelDict);
}

function RenderAll(LevelDict){
	
}

function height(node){
	if( node == null) return 0;
	return node.height;
}

function Depth(Ptr){
	
		if(Ptr==null){
			console.log("\nNO POINTER\n");
			return 0;
		}
		if(Ptr.right!=null && Ptr.left!=null){
			return 1+(Depth((Ptr.right))>Depth((Ptr.left)) ? Depth((Ptr.right)):Depth((Ptr.left)));
		}
		else if(Ptr.right==null && Ptr.left!=null){
			return 1+Depth((Ptr.left));
		}
		else if(Ptr.right!=null && Ptr.left==null){
			return 1+Depth((Ptr.right));
		}
		
		return 0;
	
}

function SetHeights(Node){
	if(!Node){
		return;
	}
	
	Node.height = Depth(Node);
	
	SetHeights(Node.left);
	SetHeights(Node.right);
	
}

//Leftmost or right most
function DepthMost(node,type){
	switch(type.toLowerCase()){
		case "left":
			if(node.left){
				DepthMost(node.left,type);
			}
			break;
		case "right":
			if(node.right){
				DepthMost(node.right,type);
			}
			break;
	}
	return node;
}

function rotateRight(Dict){

	 var Context = Dict["Context"];
	
	 console.log("Context Root:"+Context.Root);
	 
	 var node = Dict["Node"];
	
	 var root = node.left;
	
	 console.log("Node Right:"+root.data);
	 
	// root.right = new TNode(root.right.data);
	 
	 var subtree = node.right;
	 
	 if(root){
		 //Subtree2 because right could have left 
		 //root left if exists, otherwise keep as root
		 var subtree2 = root.right? DepthMost(root.right,"left"):root;
		 
		 console.log("Subtree 2:"+subtree2.data);
		 
		 console.log("New Node:"+node.data);
		 
		 subtree2.right = new TNode(node.data);
		 
		 subtree2.right.right = node.right;
		 
		 root.height = Depth(root);
		 
		 SetHeights(subtree2);
		 
	 }
   
	 return root;
}

//Queue pushes and pops first node found
function BFS(Dict){
	var List = Dict["List"];
	var Queue = Dict["Queue"];
	var Height = Dict["Height"];
	var X = Dict["X"];
	
	if(X==null || Height==null || !Queue || ! List){
		console.error(List+","+Queue+","+Height+","+X+" Missing???");
		return;
	}
	
	var Queue2 = [];
	
	while(Queue.length>0){
		var Node = Queue.shift();
		
		List.push({"Node":Node,"Height":Height,"X":X});
		
		console.log(Node.data);
		
		if(!Node.left && !Node.right){
			
			//BFS({"List":List,"Queue":Queue,"Height":Height,"X":X,"Node":Node});
			
			//return {"List":List,"Queue":Queue,"Height":Height,"X":X,"Node":Node};
		}
		
		if(Node.left)
			Queue2.push(Node.left);
		
		if(Node.right)
			Queue2.push(Node.right);
		
		X+=5;
		
	}
	
	X=0;
	
	Height+=10;
	
	if(Queue2.length>0)
		BFS({"List":List,"Queue":Queue2,"Height":Height,"X":X,"Node":Node});
	
}

function rotateLeft(Dict){
	
	 var Context = Dict["Context"];
	
	 console.log("Context Root:"+Context.Root);
	 
	 var node = Dict["Node"];
	
	 //console.log("Node:"+node.data);
	 
	 var root = node.right;
	
	 //console.log("Node Right:"+root.data);
	 
	// root.right = new TNode(root.right.data);
	 
	 var subtree = node.left;
	 
	 if(root){
		 //Subtree2 because right could have left 
		 //root left if exists, otherwise keep as root
		 var subtree2 = root.left? DepthMost(root.left,"left"):root;
		 
		 console.log("Subtree 2:"+subtree2.data);
		 
		 console.log("New Node:"+node.data);
		 
		 subtree2.left = new TNode(node.data);
		 
		 subtree2.left.left = node.left;

		 root.height = Depth(root);

		 SetHeights(subtree2);
		 
	 }
	 
	 return root;
}

//Performs balance checks on node and all children
function Balance(Dict){

	var Context = Dict["Context"];
	
	var Node = Dict["Node"];
	
	if(!Node){
		return;
	}
	
	Node.height = Depth(Node);
	
	
	//console.log("BALANCE FACTOR:"+bFactor);
	
	//do{
	
		var bFactor =  getBalanceFactor(Node);
		
		console.log(bFactor);
		
		if(bFactor < -1){
			var Res = rotateRight({"Node":Node,"Context":Context});
			if(Res){
				Node.data = Res.data;
				Node.height = Res.height;
				Node.left=Res.left;
				Node.right=Res.right;
			}
		}
		else if(bFactor > 1){
			console.log("RotateLeft")
			var Res = rotateLeft({"Node":Node,"Context":Context});
			if(Res){
				Node.data = Res.data;
				Node.height = Res.height;
				Node.left=Res.left;
				Node.right=Res.right;
			}
		}
		else{
			//return Node;
		}
	
	//}while(bFactor<-1 || bFactor>1);
	
	Balance({"Context":Context,"Node":Node.left});
	
	Balance({"Context":Context,"Node":Node.right});
	
}

function getBalanceFactor(node){
	if(node == null) return 0;
	
	var H;
	
	//console.log(node.data);
	
	if(node.left !=null && node.right!=null)
		
		return Depth(node.right) - Depth(node.left);
	
	else
		return Depth(node);
}

function insert(Dict){
	var Context = Dict["Context"];
	
	var Node = Dict.Node;
	
	var data = Dict.data;
	
	if(Root == null) {
		Root = new TNode(data);
		return;
	}
	if(data < Node.data){
		if(!Node.left){
			Node.left = new TNode(data);
			Balance({"Context":this,"Node":Root});

			BFSPrint();

			Render();
		}
		else
			insert({"Node":Node.left, "data":data}); 
	}else if (data > Node.data){
		if(!Node.right){
			Node.right = new TNode(data);
			Balance({"Context":this,"Node":Root});

			BFSPrint();

			Render();
		}
		else
			insert({"Node":Node.right,"data":data}); 
	}else{
		//duplicated data
		console.error("duplicated data:"+data);

		throw("Duplicated Data:"+data);
	}

	if(Node){
		
		//update height
		Node.height = Depth(Node);
		
		//Balance({"Context":this,"Node":Node});
	}
	
	//var bFactor =  getBalanceFactor(Node);
	
	//return Node;
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

/*
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
*/
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

function BFSPrint(){

	var List = [];

	BFS({"Queue":[Root],"List":List,"Height":0,"X":0});

	console.log("BFS:\n"+List);

	for(var i in List){
		console.log(
				"Data:"+List[i]["Node"].data+", X:"
				+List[i]["X"]+
				", Y:"+List[i]["Height"]+","
				+"Max Depth:"+List[i]["Node"].height);
	}

	}

//Root = new TNode(0);

insert({"Context":this,"Node":Root,"data":0});

insert({"Context":this,"Node":Root,"data":5});

insert({"Context":this,"Node":Root,"data":7});

//Balance(Root);

insert({"Context":this,"Node":Root,"data":8});

insert({"Context":this,"Node":Root,"data":6});


insert({"Context":this,"Node":Root,"data":-1});

insert({"Context":this,"Node":Root,"data":9});

BFSPrint();


//Balance({"Context":this,"Node":Root});

insert({"Context":this,"Node":Root,"data":1});

insert({"Context":this,"Node":Root,"data":2});

/*
insert({"Context":this,"Node":Root,"data":11});

insert({"Context":this,"Node":Root,"data":-8});

insert({"Context":this,"Node":Root,"data":-12});

insert({"Context":this,"Node":Root,"data":-7});
*/


