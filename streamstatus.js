<div id="FANG"></div>
<script type="text/javascript">
//things to edit
var widgetContainerId="text-3" //container which will be set to display=none or display=block
//ANFANG editierbare Funktionen

function regexGameFilter(data){
	var patt = new Array(
		new RegExp("street fighter", "i"),
		new RegExp("guilty gear","i"),
		new RegExp("killer instinct","i"),
		new RegExp("king of fighters","i"),
		new RegExp("mortal kombat","i"),
		new RegExp("blazblue","i"),
		new RegExp("tekken","i"),
		new RegExp("capcom","i"),
		new RegExp("dead or alive","i"),
		new RegExp("soul calibur","i"),
		new RegExp("aquapazza","i"),
		new RegExp("arcana heart","i"),
		new RegExp("nitro plus","i"),
		new RegExp("melty blood","i"),
		new RegExp("under night","i"),
		new RegExp("dengeki","i"),
		new RegExp("virtua fighter","i"),
		new RegExp("blade arcus","i"),
		new RegExp("chaos code","i"),
		new RegExp("skullgirls","i"),
		new RegExp("windjammers","i"),
		new RegExp("vampire","i"),
		new RegExp("darkstalker","i"),
		new RegExp("arcsys","i"),
		new RegExp("capcom","i"),
		new RegExp("SNK","i"),
		new RegExp("dragon","i")
		// catchall
		// new RegExp(".*","i")
	);

	var obj=new Array();
	var countData=data.length;
	var countPatt=patt.length;
	var j=0;
	for(var i=0;i<countData;i++){
		for (var k=0;k<countPatt;k++){
			if(patt[k].test(data[i].game)){
				obj[j]=data[i];	
				j++;
				break;
			}
		}
	}
	return obj;
}

function username(){
	var user=new Array(
		"insertgame"
		,"fight_club_nrw"
		,"brawlonestream"
		,"sumpfauge"
		,"virtualdojovienna"
		,"m1kr0s"
		,"thomsonrult"
		,"schlossfgc"
		,"draculasan89"
		,"chargiii" 
		,"dicktraitor" 
		,"mdz_jimmy" 
		,"atthegates213"
		,"neekogaming"
		,"vlafaris"
		,"mr_biscuits"
		,"colddog113"
		,"mrbroken030"
		,"fightersbw"
		,"popisweden"
		,"grimmzo"
		,"saltminetv_sfv"
		,"c0ldmt"
		,"arcadedreamsmunich"
		,"nthgenmedia"
		,"taketv"
	);
	return user;
}

//ENDE editierbare Funktionen

function createSrc(user){
	var url='https://api.twitch.tv/kraken/streams?client_id=7cp2u79ikajp77uqe3pa0m7mofisedl&channel=';
	var callback="jsonp";
	var list='';
	for(i=0;i<user.length-1;i++){
		list+=user[i]+",";
	}
	list+=user[user.length-1];
	var src=url+list+"&callback="+callback;
	return src;
}

function createLinkToStream(className,href){
	var a=document.createElement("a");
		a.className=className;
		a.href=href;
		a.target = '_blank';
	return a;
}

function createSpanEntryRow(key,value,rowClass,keyClass,valueClass){
	var spanRow=document.createElement("span");
		spanRow.className=rowClass;
	var spanKey=document.createElement("span");
		spanKey.className=keyClass;
		spanKey.innerHTML=key;
	var spanValue=document.createElement("span");
		spanValue.className=valueClass;
		spanValue.innerHTML=value;
	spanRow.appendChild(spanKey);
	spanRow.appendChild(spanValue);
	return spanRow;
}


function ordne(data){
	var collect=new Array();
	var streams =data.streams;
	var count=streams.length;
	for(i=0;i<count;i++){
		collect[i]=new Object();
		collect[i]['viewers']=streams[i].viewers;
		collect[i]['name']=streams[i].channel.name;
		collect[i]['game']=streams[i].channel.game;
		collect[i]['status']=streams[i].channel.status;
		collect[i]['logo']=streams[i].channel.logo;
		collect[i]['url']=streams[i].channel.url;
		collect[i]['provider']="twitch";
	}

	return collect;
}

function divCreate(elem,data){
	if(elem==null){
	console.log("Can't find FANG div");
		return;
	}
	console.log("div found: " & elem);
	console.log("data: " & data);

	var id_container="streamContainer";
	var class_streamEntry="streamEntry";
	var class_streamEntryImage="streamEntryImage";
	var class_streamEntryBody="streamEntryBody";
	/*
	var class_streamEntryRow="streamEntryRow";
	var class_streamEntryRowKey="streamEntryRowKey";
	var class_streamEntryRowValue="streamEntryRowValue";
	*/

	var class_streamEntryRow="row";
	var class_streamEntryRowKey="key";
	var class_streamEntryRowValue="value";

	var containerDiv=document.getElementById(id_container);

	if(containerDiv!=null){
		containerDiv.parentNode.removeChild(containerDiv);
	}
	containerDiv = document.createElement("div");
	containerDiv.id=id_container;

	for (var i = 0; i <data.length; i++) {
		var backGroundImage="url('"+data[i].logo+"')";
		console.log(backGroundImage);
		var a_entry=createLinkToStream(class_streamEntry,data[i].url);
		var span_entryBody=document.createElement("span");
			span_entryBody.className=class_streamEntryBody;
		var span_entryImage=document.createElement("span");
			span_entryImage.className=class_streamEntryImage;	
			span_entryImage.style.backgroundImage = backGroundImage;

		var span_entryBodyRow=createSpanEntryRow("Name: ",data[i].name,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		var span_entryBodyRow=createSpanEntryRow("Game: ",data[i].game,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		var span_entryBodyRow=createSpanEntryRow("Status: ",data[i].status,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		var span_entryBodyRow=createSpanEntryRow("Viewers: ",data[i].viewers,class_streamEntryRow,class_streamEntryRowKey,class_streamEntryRowValue);
		span_entryBody.appendChild(span_entryBodyRow);
		a_entry.appendChild(span_entryImage);
		a_entry.appendChild(span_entryBody);
		containerDiv.appendChild(a_entry);
	}
	elem.appendChild(containerDiv);
}

//main func wo das zeug passiert
function jsonp(data){
		var widgetContainer=document.getElementById("text-3"); //container which will be hidden if there is no Streams
    // hier passiert das meiste
    var allStreams=ordne(data);
    //sortieren nach viewer
    allStreams.sort(function(a, b) {
        return parseInt(b.viewers) - parseInt(a.viewers) ;
    });
    //die streams werden nochmal gefiltert
    var filteredStreams=regexGameFilter(allStreams);
		//debug Begin
		// debug End
    console.log(allStreams);
    console.log(filteredStreams.length);

    var element=document.getElementById("FANG");
    console.log("jsonp invoked");

    // create Streams only when existing filteredStreams and hide "community streams" if there is nothing to display
		if(filteredStreams.length){
    	divCreate(element,filteredStreams);
			widgetContainer.style.display="block"
		}else{
			widgetContainer.style.display="none"
		}
}

function stream_invokeJsonp(){
	console.log("stream_invokeJsonp");
	var script = document.getElementById("streamJsonp");
	if(script!=null){
  	script.parentNode.removeChild(script);
	}
	var script = document.createElement('script');
	var user=username();
	var src=createSrc(user);
	script.src=src;
	script.id="streamJsonp";
	document.getElementsByTagName('head')[0].appendChild(script);
}

	console.log("run");
	stream_invokeJsonp();
	var fn=window.setInterval(stream_invokeJsonp,30000);
</script>
