// MIT License
// Copyright (c) 2020 Luis Espino
// Modify by: Marco Ortiz 2022

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function dirty() {
	var num = 0;
	var v_dirty=0;

    num = Math.floor((Math.random() * 1000)) % 4;
    if (num == 0)
        v_dirty='DIRTY A';
    else if (num == 1)
            v_dirty= 'DIRTY B';
    else if (num == 2)
            v_dirty='NONE'; //'DIRTY A & B';
         else
            v_dirty='NONE';
        
    return v_dirty;
}

function test(states,iterations){
	    var msg="";
      	var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
		var str_state = states[0][0]+states[1][0]+states[2][0]
      	var action_result = reflex_agent(location, state);
		msg="<br>Iteration: ".concat(iterations).concat(" | Location: ").concat(location).concat(" | Action: ").concat(action_result);
		msg+=" | State: ".concat(str_state).concat("  | States_Distinct: ").concat(states_distincts);
      	document.getElementById("log").innerHTML+=msg;
      	if (action_result == "CLEAN"){
        	if (location == "A") states[1] = "CLEAN";
         	else if (location == "B") states[2] = "CLEAN";
      	}
      	else if (action_result == "RIGHT") states[0] = "B";
      	else if (action_result == "LEFT") states[0] = "A";
		
		//dirty
		  var v_dirty = dirty();
		  if (v_dirty == 'DIRTY A')
			  states[1]="DIRTY";
		  else if (v_dirty =='DIRTY B')
			  states[2]="DIRTY";
		  else if (v_dirty == 'DIRTY A & B')
			  states[1]=states[2]="DIRTY";
	
		msg="<br>Dirty: ".concat(v_dirty);		
		document.getElementById("log").innerHTML+=msg;

		//Check for new states
        if (!(states_distincts.includes(states[0][0]+states[1][0]+states[2][0]))) {
            states_distincts += "-"+states[0][0]+states[1][0]+states[2][0]
            str_state = states[0][0]+states[1][0]+states[2][0]
			msg="<br>Iteration: ".concat(iterations).concat(" | Location: ").concat(location).concat(" | Action: ").concat(action_result);
			msg+=" | State: ".concat(str_state).concat("  | States_Distinct: ").concat(states_distincts);
            document.getElementById("log").innerHTML+=msg;            
		}
        if (states_distincts.split("-").length >= 8) {
			msg="<br>State: {".concat(str_state).concat("} => States reached: {").concat(states_distincts).concat("}");
			document.getElementById("log").innerHTML+=msg;
            return 0
		}
	iterations+=1;
	if (iterations <= 60) setTimeout(function(){ test(states,iterations); }, 2000);
	return 0;
}

var states_distincts="";
var states = ["A","DIRTY","DIRTY"];
var states_distincts = states[0][0]+states[1][0]+states[2][0]
test(states,0);
