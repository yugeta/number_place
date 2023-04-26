!(function(){
	$$={};

	$$.data = {
		game:null,
		key :null
	};
	$$.datas = [];

	$$.targetElm = null;

	$$.__construct = function(){

		// numberplace
		$$.data.game = document.getElementById("game");
		if($$.data.game===null){return}

		var tables = $$.data.game.getElementsByTagName("table");
		if(!tables.length){return}

		var table = tables[0];
		if(table.className !== "numberplace"){return}

		$$.setClassName(table);
		$$.setInputEvent(table);


		// key
		$$.data.key = document.getElementById("key");
		if(key===null){return}

		var keyTables = $$.data.key.getElementsByTagName("table");
		if(!keyTables.length){return}

		$$.setKeyEvent(keyTables[0]);

		// Button
		$$.setButtonLoad();
		$$.setButtonSave();
		$$.setButtonProgramSave();
		$$.setButtonProgramLoad();
		$$.setButtonClear();
		$$.setButtonFinish();

		//load-sample
		$$.loadSample();
		//$$.getCache();
	};

	$$.setClassName = function(table){

		//cells
		var td = table.getElementsByTagName("td");

		// set-array
		for(var i=0; i<td.length; i++){
			td[i].setAttribute("data-num" , i);
			var classes = [];
			var row = parseInt(i/9 , 10);
			classes.push("row-" + row);
			var col = (i%9);
			classes.push("col-" + col);
			var block = Number(parseInt(i/27)*3 ,10) + Number(parseInt(parseInt(i%9 ,10)/3 ,10));
			classes.push("block-" + block);
			td[i].className = classes.join(" ");
			td[i].setAttribute("data-row" , row);
			td[i].setAttribute("data-col" , col);
			td[i].setAttribute("data-block" , block);
		}
	};

	$$.setInputEvent = function(table){
		var td = table.getElementsByTagName("td");
		for(var i=0; i<td.length; i++){
			td[i].onclick = $$.viewKeyElement;
		}
	};

	$$.viewKeyElement = function(event){
		var elm = event.target;
		$$.setCellsColorOn(elm);
		$$.targetElm = elm;

		var key = document.getElementById("key");
		$$.setKeyPosition(key , elm);
	};
	$$.setKeyPosition = function(key , elm){

		var win = $$LIB.getWindowSize();
		var pos = $$LIB.getPos(elm);

		if(pos.x < win.x/2){
			key.style.setProperty("right","0","");
			key.style.setProperty("left","auto","");
		}
		else{
			key.style.setProperty("right","auto","");
			key.style.setProperty("left","16px","");
		}

		key.style.setProperty("display","block","");
	};

	$$.setKeyEvent = function(table){
		var td = table.getElementsByTagName("td");
		for(var i=0; i<td.length; i++){
			td[i].onclick = $$.clickKey;
		}
	};

	$$.clickKey = function(event){

		if($$.targetElm === null){return}

		var elm = event.target;
		var key = document.getElementById("key");
		key.style.setProperty("display","none","");
		$$.targetElm.innerHTML = elm.getAttribute("data-key");
		$$.setCellsColorOff($$.targetElm);
		$$.targetElm = null;
	};

	$$.setCellsColorOn = function(elm){
		if($$.targetElm !== null){
			$$.setCellsColorOff($$.targetElm);
		}

		// cross
		var row = elm.getAttribute("data-row");
		var rows = $$.data.game.getElementsByClassName("row-"+row);
		for(var i=0; i<rows.length; i++){
			rows[i].style.setProperty("background-color","#FEE","");
		}
		var col = elm.getAttribute("data-col");
		var cols = $$.data.game.getElementsByClassName("col-"+col);
		for(var i=0; i<cols.length; i++){
			cols[i].style.setProperty("background-color","#FEE","");
		}

		//target
		elm.style.setProperty("background-color","#FCC","");
	};
	$$.setCellsColorOff = function(elm){

		//cross + target
		var row = elm.getAttribute("data-row");
		var rows = $$.data.game.getElementsByClassName("row-"+row);
		for(var i=0; i<rows.length; i++){
			rows[i].style.setProperty("background-color","#FFF","");
		}
		var col = elm.getAttribute("data-col");
		var cols = $$.data.game.getElementsByClassName("col-"+col);
		for(var i=0; i<cols.length; i++){
			cols[i].style.setProperty("background-color","#FFF","");
		}
	};

	// Button
	$$.setButtonClear = function(){
		var elm = document.getElementById("clear");
		if(elm===null){return}
		elm.onclick = function(){
			$$.clearPazzle();
		};
	};
	$$.setButtonLoad = function(){
		var elm = document.getElementById("load");
		if(elm===null){return}
		elm.onclick = function(){
			//$$.setLoad();
			$$.getCache();
		};
	};
	$$.setButtonSave = function(){
		var elm = document.getElementById("save");
		if(elm===null){return}
		elm.onclick = function(){
			$$.setSave();
		};
	};
	$$.setButtonProgramSave = function(){
		var elm = document.getElementById("programSave");
		if(elm===null){return}
		elm.onclick = function(){
			$$.setProgramSave();
		};
	};
	$$.setButtonProgramLoad = function(){
		var elm = document.getElementById("programLoad");
		if(elm===null){return}
		elm.onclick = function(){
			$$.setProgramLoad();
		};
	};
	$$.setButtonFinish = function(){
		var elm = document.getElementById("finish");
		if(elm===null){return}
		elm.onclick = function(){
			if($$.checkPazzle()){

			}
			else{
				alert("complete");
			}
		};
	};

	$$.clearPazzle = function(){
		var tables = $$.data.game.getElementsByTagName("table");
		var table  = tables[0];
		var td     = table.getElementsByTagName("td");

		for(var i=0; i<td.length; i++){
			td[i].innerHTML = "";
		}
	};

	$$.checkPazzle = function(){
		var tables = $$.data.game.getElementsByTagName("table");
		var table = tables[0];

		//flg
		var flg = 0;

		for(var i=0; i<9; i++){
			//check-row
			var rows = table.getElementsByClassName("row-"+i);
			var arrRow = [];
			for(var j=0; j<rows.length; j++){
				var num = rows[j].innerHTML;
				if(num===""){flg++;continue;}
				if(arrRow.indexOf(num)!==-1){flg++;}
				arrRow.push(num);
			}
			//check-col
			var cols = table.getElementsByClassName("col-"+i);
			var arrCol = [];
			for(var j=0; j<cols.length; j++){
				var num = cols[j].innerHTML;
				if(num===""){flg++;continue;}
				if(arrCol.indexOf(num)!==-1){flg++;}
				arrCol.push(num);
			}
			//check-block
			var blocks = table.getElementsByClassName("block-"+i);
			var arrBlock = [];
			for(var j=0; j<blocks.length; j++){
				var num = blocks[j].innerHTML;
				if(num===""){flg++;continue;}
				if(arrBlock.indexOf(num)!==-1){flg++;}
				arrBlock.push(num);
			}
		}

		return flg;
	};

	$$.setSave = function(){
		var tables = $$.data.game.getElementsByTagName("table");
		var table = tables[0];
		var td = table.getElementsByTagName("td");
		var data = [];
		var emptyFlg = 0;
		for(var i=0; i<td.length; i++){
			var num = td[i].innerHTML;
			if(num === ""){
				data[i] = "-";
			}
			else{
				data[i] = Number(num);
			}
			if(td[i].innerHTML!==""){emptyFlg++;}
		}

		if(emptyFlg > 0){
			var str = $$.getSave_arr2str(data);
			localStorage.setItem("numberplace", str);
		}
		else{
			localStorage.removeItem("numberplace");
		}
	};

	$$.setProgramSave = function(){
		var tables = $$.data.game.getElementsByTagName("table");
		var table = tables[0];
		var td = table.getElementsByTagName("td");
		var data = [];
		var emptyFlg = 0;
		for(var i=0; i<td.length; i++){
			var num = td[i].innerHTML;
			if(num === ""){
				data[i] = "-";
			}
			else{
				data[i] = Number(num);
			}

			if(td[i].innerHTML!==""){emptyFlg++;}
		}

		if(emptyFlg > 0){
			var str = $$.getSave_arr2str(data);
			localStorage.setItem("numberplace_program", str);
		}
		else{
			localStorage.removeItem("numberplace_program");
		}
	};
	$$.setProgramLoad = function(){
		var tables = $$.data.game.getElementsByTagName("table");
		var table = tables[0];
		var td = table.getElementsByTagName("td");
		var ls = localStorage.getItem("numberplace_program");
		if(!ls){return}
		var data = $$.getSave_str2arr(ls);
		for(var i=0; i<td.length; i++){
			//if(!data[i] || !data[i].match(/[1-9]/)){data[i] = ""}
			if(!data[i].toString().match(/[1-9]/)){data[i] = ""}
			td[i].innerHTML = data[i];
		}
	};


	$$.getCache = function(){
		var tables = $$.data.game.getElementsByTagName("table");
		var table = tables[0];
		var td = table.getElementsByTagName("td");
		var ls = localStorage.getItem("numberplace");
		if(!ls){return}
		var data = $$.getSave_str2arr(ls);
		for(var i=0; i<td.length; i++){
			// if(data[i] === 0){data[i] = ""}
			// if(data[i] === "-"){data[i] = ""}
			if(!data[i].toString().match(/[1-9]/)){data[i] = ""}
			td[i].innerHTML = data[i];
		}
	};
	$$.getProgramData = function(){
		var ls = localStorage.getItem("numberplace_program");
		if(!ls){return ""}
		return $$.getSave_str2arr(ls);
	};

	/**
	* LocalStorage-Save Value
	* condition : Numeric (1-digit)
	*/
	$$.getSave_arr2str = function(arr){
		var str="";
		for(var i=0; i<arr.length; i++){
			str += arr[i].toString();
		}
		return str;
	};
	$$.getSave_str2arr = function(str){
		str = str.replace(/\"/g , '');
		var arr=[];
		for(var i=0; i<str.length; i++){
			arr.push(Number(str.charAt(i)));
		}
		return arr;
	};

	$$.loadSample = function(){
		$$LIB.ajax.set({
			url:"./data/sample.json",
			method:"GET",
			async:"true",
			//type:"text/javascript",
			//query:{},
			onSuccess:function(res){
				if(!res){return}
				var json = JSON.parse(res);
				var lists = document.getElementById("lists");
				for(var i=0; i<json.length; i++){
					var li = document.createElement("li");
					li.innerHTML = json[i].name;
					li.setAttribute("data-np" , json[i].data);
					li.onclick = $$.clickDataLists;
					lists.appendChild(li);
				}
			}
		});
	};
	$$.clickDataLists = function(event){
		var elm = event.target;
		var data = elm.getAttribute("data-np");
		if(!data){return}
		$$.setData_list2view(data);
	}
	$$.setData_list2view = function(data_np){
		if(!data_np){return}
		var tables = $$.data.game.getElementsByTagName("table");
		var table = tables[0];
		var td = table.getElementsByTagName("td");
		var data = $$.getSave_str2arr(data_np);
		for(var i=0; i<td.length; i++){
			if(!data[i].toString().match(/[1-9]/)){data[i] = ""}
			td[i].innerHTML = data[i];
		}
		// cache
		localStorage.setItem("numberplace_program" , data_np);
	};

	$$LIB.eventAdd(window , "load" , $$.__construct);
})();