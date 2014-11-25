/* Based on Alex Arnell's inheritance implementation. */
var Class = {
  create: function() {
    var parent = null, properties = $A(arguments);
    if (Object.isFunction(properties[0]))
      parent = properties.shift();

    function klass() {
      this.initialize.apply(this, arguments);
    }

    Object.extend(klass, Class.Methods);
    klass.superclass = parent;
    klass.subclasses = [];

    if (parent) {
      var subclass = function() { };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }

    for (var i = 0; i < properties.length; i++)
      klass.addMethods(properties[i]);

    if (!klass.prototype.initialize)
      klass.prototype.initialize = this.emptyFunction;

    klass.prototype.constructor = klass;

    return klass;
  },
  emptyFunction:function () {},

};

Class.Methods = {
  addMethods: function(source) {
    var ancestor   = this.superclass && this.superclass.prototype;
    var properties = Object.keys(source);

    if (!Object.keys({ toString: true }).length)
      properties.push("toString", "valueOf");

    for (var i = 0, length = properties.length; i < length; i++) {
      var property = properties[i], value = source[property];
      if (ancestor && Object.isFunction(value) &&
          value.argumentNames().first() == "$super") {
        var method = value, value = Object.extend((function(m) {
          return function() { return ancestor[m].apply(this, arguments) };
        })(property).wrap(method), {
          valueOf:  function() { return method },
          toString: function() { return method.toString() }
        });
      }
      this.prototype[property] = value;
    }

    return this;
  }
};

Object.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

Object.extend(Object, {
  inspect: function(object) {
    try {
      if (Object.isUndefined(object)) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : String(object);
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  },

  toJSON: function(object) {
    var type = typeof object;
    switch (type) {
      case 'undefined':
      case 'function':
      case 'unknown': return;
      case 'boolean': return object.toString();
    }

    if (object === null) return 'null';
    if (object.toJSON) return object.toJSON();
    if (Object.isElement(object)) return;

    var results = [];
    for (var property in object) {
      var value = Object.toJSON(object[property]);
      if (!Object.isUndefined(value))
        results.push(property.toJSON() + ': ' + value);
    }

    return '{' + results.join(', ') + '}';
  },

  toQueryString: function(object) {
    return $H(object).toQueryString();
  },

  toHTML: function(object) {
    return object && object.toHTML ? object.toHTML() : String.interpret(object);
  },

  keys: function(object) {
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
  },

  values: function(object) {
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
  },

  clone: function(object) {
    return Object.extend({ }, object);
  },

  isElement: function(object) {
    return object && object.nodeType == 1;
  },

  isArray: function(object) {
    return object != null && typeof object == "object" &&
      'splice' in object && 'join' in object;
  },

  isHash: function(object) {
    return object instanceof Hash;
  },

  isFunction: function(object) {
    return typeof object == "function";
  },

  isString: function(object) {
    return typeof object == "string";
  },

  isNumber: function(object) {
    return typeof object == "number";
  },

  isUndefined: function(object) {
    return typeof object == "undefined";
  }
});

function $A(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) return iterable.toArray();
  var length = iterable.length || 0, results = new Array(length);
  while (length--) results[length] = iterable[length];
  return results;
}

if (WebKit = navigator.userAgent.indexOf('AppleWebKit/') > -1) {
  $A = function(iterable) {
    if (!iterable) return [];
    if (!(Object.isFunction(iterable) && iterable == '[object NodeList]') &&
        iterable.toArray) return iterable.toArray();
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
  };
}





















var Vector3D = Class.create();

Vector3D.prototype = {
	x: null, y: null, z: null,
	sx: null, sy: null, sz: null,
	userData: null,

	dx: null, dy: null, dz: null,
	tx: null, ty: null, tz: null,
	oll: null,

	initialize: function(a, b, c){
		this.x = a;
		this.y = b;
		this.z = c;
	},

	copy: function(v){
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	},

	add: function(v){
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	},

	sub: function(v){
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	},

	cross: function(v){
		this.tx = this.x;
		this.ty = this.y;
		this.tz = this.z;

		this.x = this.ty * v.z - this.tz * v.y;
		this.y = this.tz * v.x - this.tx * v.z;
		this.z = this.tx * v.y - this.ty * v.x;
	},

	multiply: function(s){
		this.x *= s;
		this.y *= s;
		this.z *= s;
	},

	distanceTo: function(v){
		this.dx = this.x - v.x;
		this.dy = this.y - v.y;
		this.dz = this.z - v.z;

		return Math.sqrt(this.dx * this.dx + this.dy * this.dy + this.dz * this.dz);
	},

	distanceToSquared: function(v){
		this.dx = this.x - v.x;
		this.dy = this.y - v.y;
		this.dz = this.z - v.z;

		return this.dx * this.dx + this.dy * this.dy + this.dz * this.dz;
	},

	length: function(){
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	lengthSq: function(){
		return this.x * this.x + this.y * this.y + this.z * this.z;
	},

	negate: function(){
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
	},

	normalize: function(){
		if (this.length() > 0)
			this.ool = 1.0 / this.length();
		else
			this.ool = 0;

		this.x *= this.ool;
		this.y *= this.ool;
		this.z *= this.ool;
		return this;
	},

	dot: function(v){
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	clone: function(){
		return new Vector3D(this.x, this.y, this.z);
	},

	toString: function(){
		return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
	}

}

Vector3D.add = function(a, b)
{
	return new Vector3D( a.x + b.x, a.y + b.y, a.z + b.z );
}

Vector3D.sub = function(a, b)
{
	return new Vector3D( a.x - b.x, a.y - b.y, a.z - b.z );
}

Vector3D.multiply = function(a, s)
{
	return new Vector3D( a.x * s, a.y * s, a.z * s );
}

Vector3D.cross = function(a, b)
{
	return new Vector3D( a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x );
}

Vector3D.dot = function(a, b)
{
	return a.x * b.x + a.y * b.y + a.z * b.z;
}



























var Matrix3D = Class.create();

Matrix3D.prototype = {
    n11: null,
    n12: null,
    n13: null,
    n14: null,
    n21: null,
    n22: null,
    n23: null,
    n24: null,
    n31: null,
    n32: null,
    n33: null,
    n34: null,

    x: new Vector3D(0,0,0),
    y: new Vector3D(0,0,0),
    z: new Vector3D(0,0,0),

    initialize: function(){
		this.identity();
    },

    identity: function(){
        this.n11 = 1;
        this.n12 = 0;
        this.n13 = 0;
        this.n14 = 0;
        this.n21 = 0;
        this.n22 = 1;
        this.n23 = 0;
        this.n24 = 0;
        this.n31 = 0;
        this.n32 = 0;
        this.n33 = 1;
        this.n34 = 0;

        this.x = new Vector3D(0,0,0);
        this.y = new Vector3D(0,0,0);
        this.z = new Vector3D(0,0,0);
    },

    lookAt: function(eye, center, up){

        this.z.copy(center);
        this.z.sub(eye);
        this.z.normalize();

        this.x.copy(this.z);
        this.x.cross(up);
        this.x.normalize();

        this.y.copy(this.x);
        this.y.cross(this.z);
        this.y.normalize();

        this.n11 = this.x.x;
        this.n12 = this.x.y;
        this.n13 = this.x.z;
        this.n14 = -this.x.dot(eye);
        this.n21 = this.y.x;
        this.n22 = this.y.y;
        this.n23 = this.y.z;
        this.n24 = -this.y.dot(eye);
        this.n31 = this.z.x;
        this.n32 = this.z.y;
        this.n33 = this.z.z;
        this.n34 = -this.z.dot(eye);
    },

    transform: function(v){
        var vx = v.x, vy = v.y, vz = v.z;

        v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14;
        v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24;
        v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34;
    },

    transformVector: function(v){
        var vx = v.x, vy = v.y, vz = v.z;

        v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz;
        v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz;
        v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz;
    },

    multiply: function(a, b){
        var a11 = a.n11;
        var b11 = b.n11;
        var a21 = a.n21;
        var b21 = b.n21;
        var a31 = a.n31;
        var b31 = b.n31;
        var a12 = a.n12;
        var b12 = b.n12;
        var a22 = a.n22;
        var b22 = b.n22;
        var a32 = a.n32;
        var b32 = b.n32;
        var a13 = a.n13;
        var b13 = b.n13;
        var a23 = a.n23;
        var b23 = b.n23;
        var a33 = a.n33;
        var b33 = b.n33;
        var a14 = a.n14;
        var b14 = b.n14;
        var a24 = a.n24;
        var b24 = b.n24;
        var a34 = a.n34;
        var b34 = b.n34;

        this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
        this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
        this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;

        this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
        this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
        this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;

        this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
        this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
        this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    },

    toString: function() {
        return "11: " + this.n11 + ", 12: " + this.n12 + ", 13: " + this.n13 + ", 14: " + this.n14 + "\n" + "21: " + this.n21 + ", 22: " + this.n22 + ", 23: " + this.n23 + ", 24: " + this.n24 + "\n"
        + "31: " + this.n31 + ", 32: " + this.n32 + ", 33: " + this.n33 + ", 34: " + this.n34;
    }
  }

Matrix3D.translationMatrix = function(x, y, z) {
    var m = new Matrix3D();

    m.n14 = x;
    m.n24 = y;
    m.n34 = z;

    return m;
}

Matrix3D.scaleMatrix = function(x, y, z){
    var m = new Matrix3D();

    m.n11 = x;
    m.n22 = y;
    m.n33 = z;

    return m;
}

// Apply Rotation about X to Matrix
Matrix3D.rotationXMatrix = function(theta){
    var rot = new Matrix3D();

    rot.n22 = rot.n33 = Math.cos(theta);
    rot.n32 = Math.sin(theta);
    rot.n23 = -rot.n32;

    return rot;
}

// Apply Rotation about Y to Matrix
Matrix3D.rotationYMatrix = function(theta){
    var rot = new Matrix3D();

    rot.n11 = rot.n33 = Math.cos(theta);
    rot.n13 = Math.sin(theta);
    rot.n31 = -rot.n13;

    return rot;
}

// Apply Rotation about Z to Matrix
Matrix3D.rotationZMatrix = function(theta){
    var rot = new Matrix3D();

    rot.n11 = rot.n22 = Math.cos(theta);
    rot.n21 = Math.sin(theta);
    rot.n12 = -rot.n21;

    return rot;
}

Matrix3D.rotationMatrix = function(ry, rx, rz){
    var sx, sy, sz;
    var cx, cy, cz;

    sx = Math.sin(rx);
    sy = Math.sin(ry);
    sz = Math.sin(rz);
    cx = Math.cos(rx);
    cy = Math.cos(ry);
    cz = Math.cos(rz);

    var rot = new Matrix3D();

    rot.n11 = cx * cz - sx * sy * sz;
    rot.n12 = -cy * sz;
    rot.n13 = sx * cz + cx * sy * sz;
    rot.n21 = cx * sz + sx * sy * cz;
    rot.n22 = cy * cz;
    rot.n23 = sx * sz - cx * sy * cz;
    rot.n31 = -sx * cy;
    rot.n32 = sy;
    rot.n33 = cx * cy;

    return rot;
}

























var Camera3D = Class.create();

Object.extend(Camera3D.prototype, Vector3D.prototype);
Object.extend(Camera3D.prototype,
{
	up: null, target: null, zoom: null, focus: null, roll: null,
	initialize: function()
	{
		this.up = new Vector3D(0,1,0);
		this.target = new Vector3D(0,0,0);
		this.zoom = 3;
		this.focus = 500;
		this.roll = 0;
	}
});






















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




























/*
 * READ THIS!
 * This is NOT the official version of JSTweener, it has been modified
 * to gain some performance stripping unneeded features. The use of
 * this version of the class is NOT recommended. -- Mr.doob
 *
 * http://coderepos.org/share/wiki/JSTweener
 *
 * Yuichi Tateno. <hotchpotch@N0!spam@gmail.com>
 * http://rails2u.com/
 *
 * The MIT License
 * --------
 * Copyright (c) 2007 Yuichi Tateno.
 *
 * http://www.opensource.org/licenses/mit-license.php
 */

var JSTweener = {
    objects: [],
    defaultOptions: {
        time: 1,
        transition: 'easeoutexpo',
        delay: 0,
        prefix: {},
        suffix: {},
        onStart: undefined,
        onStartParams: undefined,
        onUpdate: undefined,
        onUpdateParams: undefined,
        onComplete: undefined,
        onCompleteParams: undefined
    },
    easingFunctionsLowerCase: {},
    init: function()
	{
        for (var key in JSTweener.easingFunctions) {
            this.easingFunctionsLowerCase[key.toLowerCase()] = JSTweener.easingFunctions[key];
        }
    },
    toNumber: function(value, prefix, suffix) {
        if (!suffix) suffix = 'px';
        return value.toString().match(/[0-9]/) ? Number(value.toString().replace(
                                                        new RegExp(suffix + '$'), ''
                                                       ).replace(
                                                        new RegExp('^' + (prefix ? prefix : '')), ''
                                                       ))
                                               : 0;
    },
    addTween: function(obj, options) {
        var self = this;

		for (var i = 0; i < self.objects.length; i++)
		{
			if (self.objects[i].target == obj)
				 self.objects.splice(i, 1);
		}

        var o = {};
        o.target = obj;
        o.targetProperties = {};

        for (var key in this.defaultOptions) {
            if (typeof options[key] != 'undefined') {
                o[key] = options[key];
                delete options[key];
            } else {
                o[key] = this.defaultOptions[key];
            }
        }

        if (typeof o.transition == 'function') {
            o.easing = o.transition;
        } else {
            o.easing = this.easingFunctionsLowerCase[o.transition.toLowerCase()];
        }

        for (var key in options) {
            if (!o.prefix[key]) o.prefix[key] = '';
            if (!o.suffix[key]) o.suffix[key] = '';
            var sB = this.toNumber(obj[key], o.prefix[key],  o.suffix[key]);
            o.targetProperties[key] = {
                b: sB,
                c: options[key] - sB
            };
        }

        setTimeout(function()
		{
            o.startTime = (new Date() - 0);
            o.endTime = o.time * 1000 + o.startTime;
            self.objects.push(o);

        }, o.delay * 1000);
    },
    update: function() {
        var now = (new Date() - 0);
        for (var i = 0; i < this.objects.length; i++) {
            var o = this.objects[i];
            var t = now - o.startTime;
            var d = o.endTime - o.startTime;

            if (t >= d) {
                for (var property in o.targetProperties) {
                    var tP = o.targetProperties[property];
                    try {
                        o.target[property] = o.prefix[property] + (tP.b + tP.c) + o.suffix[property];
                    } catch(e) {}
                }
                this.objects.splice(i, 1);

                if (typeof o.onComplete == 'function') {
                    if (o.onCompleteParams) {
                        o.onComplete.apply(o, o.onCompleteParams);
                    } else {
                        o.onComplete();
                    }
                }
            } else {
                for (var property in o.targetProperties) {
                    var tP = o.targetProperties[property];
                    var val = o.easing(t, tP.b, tP.c, d);
                    try {
                        // FIXME:For IE. A Few times IE (style.width||style.height) = value is throw error...
					o.target[property] = o.prefix[property] + val + o.suffix[property];
                    } catch(e) {}
                }
            }
        }
    }
};

/*
 * JSTweener.easingFunctions is
 * Tweener's easing functions (Penner's Easing Equations) porting to JavaScript.
 * http://code.google.com/p/tweener/
 */

JSTweener.easingFunctions = {
    easeNone: function(t, b, c, d) {
        return c*t/d + b;
    },
    easeInQuad: function(t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 *((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function(t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function(t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeOutInCubic: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutCubic(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInCubic((t*2)-d, b+c/2, c/2, d);
    },
    easeInQuart: function(t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function(t, b, c, d) {
        return -c *((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 *((t-=2)*t*t*t - 2) + b;
    },
    easeOutInQuart: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutQuart(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInQuart((t*2)-d, b+c/2, c/2, d);
    },
    easeInQuint: function(t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function(t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function(t, b, c, d) {
        if((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeOutInQuint: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutQuint(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInQuint((t*2)-d, b+c/2, c/2, d);
    },
    easeInSine: function(t, b, c, d) {
        return -c * Math.cos(t/d *(Math.PI/2)) + c + b;
    },
    easeOutSine: function(t, b, c, d) {
        return c * Math.sin(t/d *(Math.PI/2)) + b;
    },
    easeInOutSine: function(t, b, c, d) {
        return -c/2 *(Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeOutInSine: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutSine(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInSine((t*2)-d, b+c/2, c/2, d);
    },
    easeInExpo: function(t, b, c, d) {
        return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001;
    },
    easeOutExpo: function(t, b, c, d) {
        return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function(t, b, c, d) {
        if(t==0) return b;
        if(t==d) return b+c;
        if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 *(t - 1)) + b - c * 0.0005;
        return c/2 * 1.0005 *(-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeOutInExpo: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutExpo(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInExpo((t*2)-d, b+c/2, c/2, d);
    },
    easeInCirc: function(t, b, c, d) {
        return -c *(Math.sqrt(1 -(t/=d)*t) - 1) + b;
    },
    easeOutCirc: function(t, b, c, d) {
        return c * Math.sqrt(1 -(t=t/d-1)*t) + b;
    },
    easeInOutCirc: function(t, b, c, d) {
        if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b;
        return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b;
    },
    easeOutInCirc: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutCirc(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInCirc((t*2)-d, b+c/2, c/2, d);
    },
    easeInElastic: function(t, b, c, d, a, p) {
        var s;
        if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;
        if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function(t, b, c, d, a, p) {
        var s;
        if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3;
        if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a);
        return(a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p ) + c + b);
    },
    easeInOutElastic: function(t, b, c, d, a, p) {
        var s;
        if(t==0) return b;  if((t/=d/2)==2) return b+c;  if(!p) p=d*(.3*1.5);
        if(!a || a < Math.abs(c)) { a=c; s=p/4; }       else s = p/(2*Math.PI) * Math.asin(c/a);
        if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeOutInElastic: function(t, b, c, d, a, p) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutElastic(t*2, b, c/2, d, a, p);
        return JSTweener.easingFunctions.easeInElastic((t*2)-d, b+c/2, c/2, d, a, p);
    },
    easeInBack: function(t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function(t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function(t, b, c, d, s) {
        if(s == undefined) s = 1.70158;
        if((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeOutInBack: function(t, b, c, d, s) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutBack(t*2, b, c/2, d, s);
        return JSTweener.easingFunctions.easeInBack((t*2)-d, b+c/2, c/2, d, s);
    },
    easeInBounce: function(t, b, c, d) {
        return c - JSTweener.easingFunctions.easeOutBounce(d-t, 0, c, d) + b;
    },
    easeOutBounce: function(t, b, c, d) {
        if((t/=d) <(1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if(t <(2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if(t <(2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeInBounce(t*2, 0, c, d) * .5 + b;
        else return JSTweener.easingFunctions.easeOutBounce(t*2-d, 0, c, d) * .5 + c*.5 + b;
    },
    easeOutInBounce: function(t, b, c, d) {
        if(t < d/2) return JSTweener.easingFunctions.easeOutBounce(t*2, b, c/2, d);
        return JSTweener.easingFunctions.easeInBounce((t*2)-d, b+c/2, c/2, d);
    }
};
JSTweener.easingFunctions.linear = JSTweener.easingFunctions.easeNone;



























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

		if (param[0] == "q") {
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

function onDocumentKeyPress(e) {
  if(d.getElementById('q').value !== "" && e.charCode == 13) { algo = d.getElementById('q').value; startFetch(algo, 100, 2000); search(); };
	if (d.getElementById('q').value == "" && e.charCode == 13) { search();  }
}

function onSearchBoxClick()
{
	if (camera2.z > 400)
		JSTweener.addTween(camera2, {time: 1.5, z: 300, transition: JSTweener.easingFunctions.easeOutExpo});
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
	radius = 300;

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
	element.content.innerHTML = '<a onclick=\"window.open(\''+data.unescapedUrl+'\',\'si\',\'width=1300, height=900, top=25, left=0, scrollbars=yes, status=no, toolbar=no, location=no, directories=no, menubar=no, resizable=no, fullscreen=no\').focus()\"><img src=\"' + data.tbUrl + '\" title=\"Ver em tamanho maior\" alt=\"Imagem não carregada\"></a>';
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
