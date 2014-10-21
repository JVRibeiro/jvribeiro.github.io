
var reference;
var canvas;

var theta;
var phi;
var radius;
var max;

var isRunning;

var dom_elements = new Array();
var properties = new Array();

var elements = new Array();
var results = new Array();

var mouseX = 0;
var mouseY = 0;

var mouseX_dest = 0;
var mouseY_dest = 0;

var view = new Matrix3D();

var camera = new Camera3D();
camera.focus = 400;

var camera2 = new Camera3D();
camera2.z = 800;

var focus = camera.focus;
var focuszoom = camera.focus * camera.zoom;

var windowHalfX = window.innerWidth >> 1;
var windowHalfY = window.innerHeight >> 1;

var gImageSearch;
var query;
var page = 1;

if (location.search != "")
{
	var params = location.search.substr(1).split("&")

	for (var i = 0; i < params.length; i++)
	{
		var param = params[i].split("=");

		if (param[0] == "q")
		{
			document.getElementById('q').value = param[1];
			run();
			break;
		}
	}
}

document.addEventListener('mousemove', onDocumentMouseMove, false);

function init()
{
	JSTweener.init();

	reference = document.getElementById('reference');
	canvas = document.getElementById('canvas');

	document.addEventListener('keypress', onDocumentKeyPress, false);

	// Get elements

	dom_elements = getElementsByClass("3d");

	// This needs to be done in a special loop
	// otherwise we'll break the layout

	for (i = 0; i < dom_elements.length; i++)
	{
		var element = dom_elements[i];
		properties[i] = findPos(element);
		properties[i][2] = element.offsetWidth;
		properties[i][3] = element.offsetHeight;
	}

	elements[0] = new Array();

	max = dom_elements.length;
	radius = 250;

	for (i = 0; i < dom_elements.length; i++)
	{
		var element = elements[0][i] = new Div3D( properties[i][0] - windowHalfX + (properties[i][2] * .5), - properties[i][1] + windowHalfY - (properties[i][3] * .5), 0 );

		// Ok, if you wonder why this doesn't work on firefox3, here it's why...
		// Appending a child that it's already on the dom. Weird, but works :P

		element.content.appendChild( dom_elements[i] );
		element.content.style['position'] = 'absolute';
		element.content.style['left'] = properties[i][0] + 'px';
		element.content.style['top'] = properties[i][1] + 'px';
		element.content.style['width'] = properties[i][2] + 'px';
		//element.content.style['backgroundColor'] = ('#0' +  Math.round(0xffffff * Math.random()).toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');

		canvas.appendChild( element.content );

		if(element.content.children[0].name == "l")
		{
			JSTweener.addTween(element,{time: 2 + Math.random(), x: 0, y: 40, transition: JSTweener.easingFunctions.easeInOutBack});
			continue;
		}

		if(element.content.children[0].name == "q")
		{
			JSTweener.addTween(element,{time: 2 + Math.random(), x: 0, y: -40, transition: JSTweener.easingFunctions.easeInOutBack});
			element.content.onclick = onSearchBoxClick;
			continue;
		}

		phi = Math.acos( -1 + ( 2 * i ) / max );
		theta = Math.sqrt( max * Math.PI ) * phi;

		var dest = new Vector3D( 0, 0, 0 );
		dest.x = radius * Math.cos(theta) * Math.sin(phi);
		dest.y = radius * Math.sin(theta) * Math.sin(phi);
		dest.z = radius * Math.cos(phi);

		JSTweener.addTween(element,{time: 2 + Math.random() * 2, x: dest.x, y: dest.y, z: dest.z, transition: JSTweener.easingFunctions.easeInOutBack});
	}

	reference.style['display'] = 'none';
}

function run()
{
	isRunning = true;

	init();
	setInterval(loop, 20);
}

// .. ACTIONS

function onDocumentMouseMove(e)
{
	if (!isRunning)
		run();

	if (!e) var e = window.event;

	mouseX = (e.clientX - windowHalfX) * .1;
	mouseY = (e.clientY - windowHalfY) * .1;
}

function onDocumentDoubleClick()
{
	removeResults();

	page = 1;
	window.getSelection().collapse();
}

function onDocumentKeyPress(e)
{
	if (e.charCode == 13)
		search();
}

function onSearchBoxClick()
{
	if (camera2.z > 400)
		JSTweener.addTween(camera2, {time: 1.5, z: 400, transition: JSTweener.easingFunctions.easeOutExpo});
}

// API

function onLoad()
{
	gImageSearch = new google.search.ImageSearch();
	gImageSearch.setResultSetSize(google.search.Search.LARGE_RESULTSET);
	gImageSearch.setSearchCompleteCallback(null, onImageSearchResults);

	if (document.getElementById('q').value != '')
		search();
}

function search()
{
	if (camera2.z < 800)
		JSTweener.addTween(camera2, {time: 1.5, z: 800, transition: JSTweener.easingFunctions.easeOutExpo});


	if (query == document.getElementById('q').value)
	{
		gImageSearch.gotoPage(page++);
	}
	else
	{
		query = document.getElementById('q').value;

		gImageSearch.execute(query);

		if (elements.length > 1) removeResults();

		elements[elements.length] = new Array();
		page = 1;
	}

	return false;
}

function onImageSearchResults()
{
	for (var i = 0; i < gImageSearch.results.length; i++)
		addResult(gImageSearch.results[i]);

	max = elements[elements.length - 1].length;
	radius = 400;

	for (var i = 0; i < elements[elements.length - 1].length; i++)
	{
		var element = elements[elements.length - 1][i];

		phi = Math.acos(-1 + (2 * i) / max);
		theta = Math.sqrt(max * Math.PI) * phi;

		var dest = new Vector3D(0, 0, 0);
		dest.x = radius * Math.cos(theta) * Math.sin(phi);
		dest.y = radius * Math.sin(theta) * Math.sin(phi);
		dest.z = radius * Math.cos(phi);

		JSTweener.addTween(element,{time: 4 + Math.random() * 4, x: dest.x, y: dest.y, z: dest.z, transition: JSTweener.easingFunctions.easeOutElastic});
	}
}

function addResult(data)
{
	var element = elements[elements.length-1][elements[elements.length-1].length] = new Div3D( 0, 0, 0 );
	element.content.style['visibility'] = 'hidden';
	element.content.innerHTML = '<a href="' + data.unescapedUrl + '" target="_blank"><img src="' + data.tbUrl + '"></a>';

	canvas.appendChild(element.content);
}

function removeResults()
{
	var j = elements[elements.length-1].length;

	while(--j >= 0)
		JSTweener.addTween(elements[elements.length-1][j],{time: 2 + Math.random() * 2, y: -1000 - 500, transition: JSTweener.easingFunctions.easeInOutBack, onComplete: function() { canvas.removeChild(this.target.content); } });

	JSTweener.addTween({},{time: 4, onComplete: cleanUp});
}

function cleanUp()
{
	elements.splice(1,1);
}

//

function loop()
{
	JSTweener.update();

	windowHalfX = window.innerWidth >> 1;
	windowHalfY = window.innerHeight >> 1;

	mouseX_dest += mouseX * .0015;
	mouseY_dest += (mouseY - mouseY_dest) * .1;

	camera.x = Math.sin(mouseX_dest) * camera2.z;
	camera.y = -mouseY_dest * 10;
	camera.z = Math.cos(mouseX_dest) * camera2.z;

	view.lookAt(camera, camera.target, camera.up);

	var i = elements.length;

	while(--i >= 0)
	{
		var j = elements[i].length;

		while (--j >= 0)
		{
			var element = elements[i][j];

			element.sz = element.x * view.n31 + element.y * view.n32 + element.z * view.n33 + view.n34;

			if (focus + element.sz < 0) {
				element.content.style['visibility'] = 'hidden';
				continue;
			}
			else {
				element.content.style['visibility'] = 'visible';
			}

			var ow = focuszoom / (focus + element.sz);

			element.sx = (element.x * view.n11 + element.y * view.n12 + element.z * view.n13 + view.n14) * ow;
			element.sy = (element.x * view.n21 + element.y * view.n22 + element.z * view.n23 + view.n24) * -ow;

			element.content.style['left'] = (element.sx + windowHalfX - (element.content.offsetWidth >> 1)) + 'px';
			element.content.style['top'] = (element.sy + windowHalfY - (element.content.offsetHeight >> 1)) + 'px';

			// webkit
			element.content.style['-webkit-transform'] = 'scale( ' + ow + ' )';

			// gecko
			element.content.style['MozTransform'] = 'scale( ' + ow + ' )';

			element.content.style.zIndex = 1000 + (-element.sz * 100) >> 0;
		}
	}
}

// .. UTILS

function getElementsByClass( searchClass )
{
	var classElements = new Array();
	var els = document.getElementsByTagName('*');
	var elsLen = els.length
	for (i = 0, j = 0; i < elsLen; i++)
	{
		var classes = els[i].className.split(' ');
		for (k = 0; k < classes.length; k++)
			if ( classes[k] == searchClass )
				classElements[j++] = els[i];
	}
	return classElements;
}

function findPos(obj)
{
	var curleft = curtop = 0;
	if (obj.offsetParent)
	{
		do
		{
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
		while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}
