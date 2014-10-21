
var Div3D = Class.create();

Object.extend(Div3D.prototype, Vector3D.prototype);
Object.extend(Div3D.prototype,
{
	content: null, scale: null,

	initialize: function(a, b, c){
		this.x = a;
		this.y = b;
		this.z = c;
		this.content = document.createElement("div");
		this.content.style['position'] = 'absolute';
	},
	setVisible: function()
	{
		content.style['visibility'] = 'visible';
	},
	setHidden: function()
	{
		content.style['visibility'] = 'hidden';
	}
});
