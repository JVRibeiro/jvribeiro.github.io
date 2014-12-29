﻿// Script por (by) Mr. Doob
// http://mrdoob.com/

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

function addResult(data) {

  var element = elements[elements.length-1][elements[elements.length-1].length] = new Div3D( 0, 0, 0 );
  element.content.style['visibility'] = 'hidden';
  element.content.innerHTML = '<a onclick=\"w.open(\'' +data.unescapedUrl+ '\',\'imgs\',\'width=1400, height=740, top=0, left=0\').focus();\"><img id=\'imglink\' src=\'' +data.tbUrl+ '\' title=\'Ver em tamanho maior\' alt=\'Imagem não carregada\'></a>';
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











































// API.JS

if(!window['googleLT_']){window['googleLT_']=(new Date()).getTime();}if (!window['google']) {
window['google'] = {};
}
if (!window['google']['loader']) {
window['google']['loader'] = {};
google.loader.ServiceBase = 'https://www.google.com/uds';
google.loader.GoogleApisBase = 'https://ajax.googleapis.com/ajax';
google.loader.ApiKey = 'notsupplied';
google.loader.KeyVerified = true;
google.loader.LoadFailure = false;
google.loader.Secure = false;
google.loader.GoogleLocale = 'www.google.com';
google.loader.ClientLocation = null;
google.loader.AdditionalParams = '';
(function() {var d=encodeURIComponent,g=window,h=document;function l(a,b){return a.load=b}var m="replace",n="charAt",q="getTime",r="setTimeout",t="push",u="indexOf",v="ServiceBase",w="name",x="length",y="prototype",z="loader",A="substring",B="join",C="toLowerCase";function D(a){return a in E?E[a]:E[a]=-1!=navigator.userAgent[C]()[u](a)}var E={};function F(a,b){var c=function(){};c.prototype=b[y];a.U=b[y];a.prototype=new c}
function G(a,b,c){var e=Array[y].slice.call(arguments,2)||[];return function(){return a.apply(b,e.concat(Array[y].slice.call(arguments)))}}function H(a){a=Error(a);a.toString=function(){return this.message};return a}function I(a,b){for(var c=a.split(/\./),e=g,f=0;f<c[x]-1;f++)e[c[f]]||(e[c[f]]={}),e=e[c[f]];e[c[c[x]-1]]=b}function J(a,b,c){a[b]=c}if(!K)var K=I;if(!L)var L=J;google[z].v={};K("google.loader.callbacks",google[z].v);var M={},N={};google[z].eval={};K("google.loader.eval",google[z].eval);
l(google,function(a,b,c){function e(a){var b=a.split(".");if(2<b[x])throw H("Module: '"+a+"' not found!");"undefined"!=typeof b[1]&&(f=b[0],c.packages=c.packages||[],c.packages[t](b[1]))}var f=a;c=c||{};if(a instanceof Array||a&&"object"==typeof a&&"function"==typeof a[B]&&"function"==typeof a.reverse)for(var k=0;k<a[x];k++)e(a[k]);else e(a);if(a=M[":"+f]){c&&!c.language&&c.locale&&(c.language=c.locale);c&&"string"==typeof c.callback&&(k=c.callback,k.match(/^[[\]A-Za-z0-9._]+$/)&&(k=g.eval(k),c.callback=
k));if((k=c&&null!=c.callback)&&!a.s(b))throw H("Module: '"+f+"' must be loaded before DOM onLoad!");k?a.m(b,c)?g[r](c.callback,0):a.load(b,c):a.m(b,c)||a.load(b,c)}else throw H("Module: '"+f+"' not found!");});K("google.load",google.load);
google.T=function(a,b){b?(0==O[x]&&(P(g,"load",Q),!D("msie")&&!D("safari")&&!D("konqueror")&&D("mozilla")||g.opera?g.addEventListener("DOMContentLoaded",Q,!1):D("msie")?h.write("<script defer onreadystatechange='google.loader.domReady()' src=//:>\x3c/script>"):(D("safari")||D("konqueror"))&&g[r](S,10)),O[t](a)):P(g,"load",a)};K("google.setOnLoadCallback",google.T);
function P(a,b,c){if(a.addEventListener)a.addEventListener(b,c,!1);else if(a.attachEvent)a.attachEvent("on"+b,c);else{var e=a["on"+b];a["on"+b]=null!=e?aa([c,e]):c}}function aa(a){return function(){for(var b=0;b<a[x];b++)a[b]()}}var O=[];google[z].P=function(){var a=g.event.srcElement;"complete"==a.readyState&&(a.onreadystatechange=null,a.parentNode.removeChild(a),Q())};K("google.loader.domReady",google[z].P);var ba={loaded:!0,complete:!0};function S(){ba[h.readyState]?Q():0<O[x]&&g[r](S,10)}
function Q(){for(var a=0;a<O[x];a++)O[a]();O.length=0}google[z].d=function(a,b,c){if(c){var e;"script"==a?(e=h.createElement("script"),e.type="text/javascript",e.src=b):"css"==a&&(e=h.createElement("link"),e.type="text/css",e.href=b,e.rel="stylesheet");(a=h.getElementsByTagName("head")[0])||(a=h.body.parentNode.appendChild(h.createElement("head")));a.appendChild(e)}else"script"==a?h.write('<script src="'+b+'" type="text/javascript">\x3c/script>'):"css"==a&&h.write('<link href="'+b+'" type="text/css" rel="stylesheet"></link>')};
K("google.loader.writeLoadTag",google[z].d);google[z].Q=function(a){N=a};K("google.loader.rfm",google[z].Q);google[z].S=function(a){for(var b in a)"string"==typeof b&&b&&":"==b[n](0)&&!M[b]&&(M[b]=new T(b[A](1),a[b]))};K("google.loader.rpl",google[z].S);google[z].R=function(a){if((a=a.specs)&&a[x])for(var b=0;b<a[x];++b){var c=a[b];"string"==typeof c?M[":"+c]=new U(c):(c=new V(c[w],c.baseSpec,c.customSpecs),M[":"+c[w]]=c)}};K("google.loader.rm",google[z].R);google[z].loaded=function(a){M[":"+a.module].l(a)};
K("google.loader.loaded",google[z].loaded);google[z].O=function(){return"qid="+((new Date)[q]().toString(16)+Math.floor(1E7*Math.random()).toString(16))};K("google.loader.createGuidArg_",google[z].O);I("google_exportSymbol",I);I("google_exportProperty",J);google[z].a={};K("google.loader.themes",google[z].a);google[z].a.I="//www.google.com/cse/style/look/bubblegum.css";L(google[z].a,"BUBBLEGUM",google[z].a.I);google[z].a.K="//www.google.com/cse/style/look/greensky.css";L(google[z].a,"GREENSKY",google[z].a.K);
google[z].a.J="//www.google.com/cse/style/look/espresso.css";L(google[z].a,"ESPRESSO",google[z].a.J);google[z].a.M="//www.google.com/cse/style/look/shiny.css";L(google[z].a,"SHINY",google[z].a.M);google[z].a.L="//www.google.com/cse/style/look/minimalist.css";L(google[z].a,"MINIMALIST",google[z].a.L);google[z].a.N="//www.google.com/cse/style/look/v2/default.css";L(google[z].a,"V2_DEFAULT",google[z].a.N);function U(a){this.b=a;this.o=[];this.n={};this.e={};this.f={};this.j=!0;this.c=-1}
U[y].g=function(a,b){var c="";void 0!=b&&(void 0!=b.language&&(c+="&hl="+d(b.language)),void 0!=b.nocss&&(c+="&output="+d("nocss="+b.nocss)),void 0!=b.nooldnames&&(c+="&nooldnames="+d(b.nooldnames)),void 0!=b.packages&&(c+="&packages="+d(b.packages)),null!=b.callback&&(c+="&async=2"),void 0!=b.style&&(c+="&style="+d(b.style)),void 0!=b.noexp&&(c+="&noexp=true"),void 0!=b.other_params&&(c+="&"+b.other_params));if(!this.j){google[this.b]&&google[this.b].JSHash&&(c+="&sig="+d(google[this.b].JSHash));
var e=[],f;for(f in this.n)":"==f[n](0)&&e[t](f[A](1));for(f in this.e)":"==f[n](0)&&this.e[f]&&e[t](f[A](1));c+="&have="+d(e[B](","))}return google[z][v]+"/?file="+this.b+"&v="+a+google[z].AdditionalParams+c};U[y].t=function(a){var b=null;a&&(b=a.packages);var c=null;if(b)if("string"==typeof b)c=[a.packages];else if(b[x])for(c=[],a=0;a<b[x];a++)"string"==typeof b[a]&&c[t](b[a][m](/^\s*|\s*$/,"")[C]());c||(c=["default"]);b=[];for(a=0;a<c[x];a++)this.n[":"+c[a]]||b[t](c[a]);return b};
l(U[y],function(a,b){var c=this.t(b),e=b&&null!=b.callback;if(e)var f=new W(b.callback);for(var k=[],p=c[x]-1;0<=p;p--){var s=c[p];e&&f.B(s);if(this.e[":"+s])c.splice(p,1),e&&this.f[":"+s][t](f);else k[t](s)}if(c[x]){b&&b.packages&&(b.packages=c.sort()[B](","));for(p=0;p<k[x];p++)s=k[p],this.f[":"+s]=[],e&&this.f[":"+s][t](f);if(b||null==N[":"+this.b]||null==N[":"+this.b].versions[":"+a]||google[z].AdditionalParams||!this.j)b&&b.autoloaded||google[z].d("script",this.g(a,b),e);else{c=N[":"+this.b];
google[this.b]=google[this.b]||{};for(var R in c.properties)R&&":"==R[n](0)&&(google[this.b][R[A](1)]=c.properties[R]);google[z].d("script",google[z][v]+c.path+c.js,e);c.css&&google[z].d("css",google[z][v]+c.path+c.css,e)}this.j&&(this.j=!1,this.c=(new Date)[q](),1!=this.c%100&&(this.c=-1));for(p=0;p<k[x];p++)s=k[p],this.e[":"+s]=!0}});
U[y].l=function(a){-1!=this.c&&(X("al_"+this.b,"jl."+((new Date)[q]()-this.c),!0),this.c=-1);this.o=this.o.concat(a.components);google[z][this.b]||(google[z][this.b]={});google[z][this.b].packages=this.o.slice(0);for(var b=0;b<a.components[x];b++){this.n[":"+a.components[b]]=!0;this.e[":"+a.components[b]]=!1;var c=this.f[":"+a.components[b]];if(c){for(var e=0;e<c[x];e++)c[e].C(a.components[b]);delete this.f[":"+a.components[b]]}}};U[y].m=function(a,b){return 0==this.t(b)[x]};U[y].s=function(){return!0};
function W(a){this.F=a;this.q={};this.r=0}W[y].B=function(a){this.r++;this.q[":"+a]=!0};W[y].C=function(a){this.q[":"+a]&&(this.q[":"+a]=!1,this.r--,0==this.r&&g[r](this.F,0))};function V(a,b,c){this.name=a;this.D=b;this.p=c;this.u=this.h=!1;this.k=[];google[z].v[this[w]]=G(this.l,this)}F(V,U);l(V[y],function(a,b){var c=b&&null!=b.callback;c?(this.k[t](b.callback),b.callback="google.loader.callbacks."+this[w]):this.h=!0;b&&b.autoloaded||google[z].d("script",this.g(a,b),c)});V[y].m=function(a,b){return b&&null!=b.callback?this.u:this.h};V[y].l=function(){this.u=!0;for(var a=0;a<this.k[x];a++)g[r](this.k[a],0);this.k=[]};
var Y=function(a,b){return a.string?d(a.string)+"="+d(b):a.regex?b[m](/(^.*$)/,a.regex):""};V[y].g=function(a,b){return this.G(this.w(a),a,b)};
V[y].G=function(a,b,c){var e="";a.key&&(e+="&"+Y(a.key,google[z].ApiKey));a.version&&(e+="&"+Y(a.version,b));b=google[z].Secure&&a.ssl?a.ssl:a.uri;if(null!=c)for(var f in c)a.params[f]?e+="&"+Y(a.params[f],c[f]):"other_params"==f?e+="&"+c[f]:"base_domain"==f&&(b="https://"+c[f]+a.uri[A](a.uri[u]("/",7)));google[this[w]]={};-1==b[u]("?")&&e&&(e="?"+e[A](1));return b+e};V[y].s=function(a){return this.w(a).deferred};V[y].w=function(a){if(this.p)for(var b=0;b<this.p[x];++b){var c=this.p[b];if((new RegExp(c.pattern)).test(a))return c}return this.D};function T(a,b){this.b=a;this.i=b;this.h=!1}F(T,U);l(T[y],function(a,b){this.h=!0;google[z].d("script",this.g(a,b),!1)});T[y].m=function(){return this.h};T[y].l=function(){};T[y].g=function(a,b){if(!this.i.versions[":"+a]){if(this.i.aliases){var c=this.i.aliases[":"+a];c&&(a=c)}if(!this.i.versions[":"+a])throw H("Module: '"+this.b+"' with version '"+a+"' not found!");}return google[z].GoogleApisBase+"/libs/"+this.b+"/"+a+"/"+this.i.versions[":"+a][b&&b.uncompressed?"uncompressed":"compressed"]};
T[y].s=function(){return!1};var ca=!1,Z=[],da=(new Date)[q](),fa=function(){ca||(P(g,"unload",ea),ca=!0)},ga=function(a,b){fa();if(!(google[z].Secure||google[z].Options&&!1!==google[z].Options.csi)){for(var c=0;c<a[x];c++)a[c]=d(a[c][C]()[m](/[^a-z0-9_.]+/g,"_"));for(c=0;c<b[x];c++)b[c]=d(b[c][C]()[m](/[^a-z0-9_.]+/g,"_"));g[r](G($,null,"//gg.google.com/csi?s=uds&v=2&action="+a[B](",")+"&it="+b[B](",")),1E4)}},X=function(a,b,c){c?ga([a],[b]):(fa(),Z[t]("r"+Z[x]+"="+d(a+(b?"|"+b:""))),g[r](ea,5<Z[x]?0:15E3))},ea=function(){if(Z[x]){var a=
google[z][v];0==a[u]("http:")&&(a=a[m](/^http:/,"https:"));$(a+"/stats?"+Z[B]("&")+"&nc="+(new Date)[q]()+"_"+((new Date)[q]()-da));Z.length=0}},$=function(a){var b=new Image,c=$.H++;$.A[c]=b;b.onload=b.onerror=function(){delete $.A[c]};b.src=a;b=null};$.A={};$.H=0;I("google.loader.recordCsiStat",ga);I("google.loader.recordStat",X);I("google.loader.createImageForLogging",$);

}) ();google.loader.rm({"specs":[{"name":"books","baseSpec":{"uri":"http://books.google.com/books/api.js","ssl":"https://encrypted.google.com/books/api.js","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}}}},"feeds",{"name":"friendconnect","baseSpec":{"uri":"http://www.google.com/friendconnect/script/friendconnect.js","ssl":"https://www.google.com/friendconnect/script/friendconnect.js","key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{}}},"spreadsheets","identitytoolkit","gdata","ima","visualization",{"name":"sharing","baseSpec":{"uri":"http://www.google.com/s2/sharing/js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":false,"params":{"language":{"string":"hl"}}}},{"name":"maps","baseSpec":{"uri":"http://maps.google.com/maps?file\u003dgoogleapi","ssl":"https://maps-api-ssl.google.com/maps?file\u003dgoogleapi","key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"regex":"callback\u003d$1\u0026async\u003d2"},"language":{"string":"hl"}}},"customSpecs":[{"uri":"http://maps.googleapis.com/maps/api/js","ssl":"https://maps.googleapis.com/maps/api/js","version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"}},"pattern":"^(3|3..*)$"}]},"search","annotations_v2","payments","wave","orkut",{"name":"annotations","baseSpec":{"uri":"http://www.google.com/reviews/scripts/annotations_bootstrap.js","ssl":null,"key":{"string":"key"},"version":{"string":"v"},"deferred":true,"params":{"callback":{"string":"callback"},"language":{"string":"hl"},"country":{"string":"gl"}}}},"language","earth","picker","ads","elements"]});
google.loader.rfm({":search":{"versions":{":1":"1",":1.0":"1"},"path":"/","js":"default+pt_BR.I.js","css":"default+pt_BR.css","properties":{":JSHash":"28ae2b20598e87432c64a154583c2fc6",":NoOldNames":false,":Version":"1.0"}},":language":{"versions":{":1":"1",":1.0":"1"},"path":"/","js":"default+pt_BR.I.js","properties":{":JSHash":"7b15944f20c0d2d7b2d2d87406a8916b",":Version":"1.0"}},":feeds":{"versions":{":1":"1",":1.0":"1"},"path":"/","js":"default+pt_BR.I.js","css":"default+pt_BR.css","properties":{":JSHash":"482f2817cdf8982edf2e5669f9e3a627",":Version":"1.0"}},":spreadsheets":{"versions":{":0":"1",":0.4":"1"},"path":"/api/spreadsheets/0.4/87ff7219e9f8a8164006cbf28d5e911a/","js":"default.I.js","properties":{":JSHash":"87ff7219e9f8a8164006cbf28d5e911a",":Version":"0.4"}},":ima":{"versions":{":3":"1",":3.0":"1"},"path":"/api/ima/3.0/28a914332232c9a8ac0ae8da68b1006e/","js":"default.I.js","properties":{":JSHash":"28a914332232c9a8ac0ae8da68b1006e",":Version":"3.0"}},":wave":{"versions":{":1":"1",":1.0":"1"},"path":"/api/wave/1.0/3b6f7573ff78da6602dda5e09c9025bf/","js":"default.I.js","properties":{":JSHash":"3b6f7573ff78da6602dda5e09c9025bf",":Version":"1.0"}},":earth":{"versions":{":1":"1",":1.0":"1"},"path":"/api/earth/1.0/db22e5693e0a8de1f62f3536f5a8d7d3/","js":"default.I.js","properties":{":JSHash":"db22e5693e0a8de1f62f3536f5a8d7d3",":Version":"1.0"}},":annotations":{"versions":{":1":"1",":1.0":"1"},"path":"/","js":"default+pt_BR.I.js","properties":{":JSHash":"ee29f1a32c343fea662c6e1b58ec6d0d",":Version":"1.0"}},":picker":{"versions":{":1":"1",":1.0":"1"},"path":"/api/picker/1.0/1c635e91b9d0c082c660a42091913907/","js":"default.I.js","css":"default.css","properties":{":JSHash":"1c635e91b9d0c082c660a42091913907",":Version":"1.0"}}});
google.loader.rpl({":scriptaculous":{"versions":{":1.8.3":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.9.0":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.2":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"},":1.8.1":{"uncompressed":"scriptaculous.js","compressed":"scriptaculous.js"}},"aliases":{":1.8":"1.8.3",":1":"1.9.0",":1.9":"1.9.0"}},":yui":{"versions":{":2.6.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.9.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.7.0":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.0r4":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.2r1":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":2.8.1":{"uncompressed":"build/yuiloader/yuiloader.js","compressed":"build/yuiloader/yuiloader-min.js"},":3.3.0":{"uncompressed":"build/yui/yui.js","compressed":"build/yui/yui-min.js"}},"aliases":{":3":"3.3.0",":2":"2.9.0",":2.7":"2.7.0",":2.8.2":"2.8.2r1",":2.6":"2.6.0",":2.9":"2.9.0",":2.8":"2.8.2r1",":2.8.0":"2.8.0r4",":3.3":"3.3.0"}},":swfobject":{"versions":{":2.1":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"},":2.2":{"uncompressed":"swfobject_src.js","compressed":"swfobject.js"}},"aliases":{":2":"2.2"}},":ext-core":{"versions":{":3.1.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"},":3.0.0":{"uncompressed":"ext-core-debug.js","compressed":"ext-core.js"}},"aliases":{":3":"3.1.0",":3.0":"3.0.0",":3.1":"3.1.0"}},":webfont":{"versions":{":1.0.28":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.27":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.29":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.12":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.13":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.14":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.15":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.10":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.11":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.2":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.1":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.0":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.6":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.19":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.5":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.18":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.4":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.17":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.16":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.3":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.9":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.21":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.22":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.25":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.26":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.23":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"},":1.0.24":{"uncompressed":"webfont_debug.js","compressed":"webfont.js"}},"aliases":{":1":"1.0.29",":1.0":"1.0.29"}},":mootools":{"versions":{":1.3.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.1.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.3.0":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.3.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.1.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.3":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.4":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.2.5":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.0":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.1":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"},":1.4.2":{"uncompressed":"mootools.js","compressed":"mootools-yui-compressed.js"}},"aliases":{":1":"1.1.2",":1.11":"1.1.1",":1.4":"1.4.2",":1.3":"1.3.2",":1.2":"1.2.5",":1.1":"1.1.2"}},":jqueryui":{"versions":{":1.6.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.9":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.15":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.14":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.7":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.13":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.8":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.12":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.5":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.11":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.10":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.6":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.0":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.7.1":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.4":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.3":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.5.2":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.17":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"},":1.8.16":{"uncompressed":"jquery-ui.js","compressed":"jquery-ui.min.js"}},"aliases":{":1.8":"1.8.17",":1.7":"1.7.3",":1.6":"1.6.0",":1":"1.8.17",":1.5":"1.5.3",":1.8.3":"1.8.4"}},":chrome-frame":{"versions":{":1.0.2":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"},":1.0.1":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"},":1.0.0":{"uncompressed":"CFInstall.js","compressed":"CFInstall.min.js"}},"aliases":{":1":"1.0.2",":1.0":"1.0.2"}},":dojo":{"versions":{":1.3.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.6.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.1.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.3.2":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.6.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.2.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.7.2":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.7.0":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.7.1":{"uncompressed":"dojo/dojo.js.uncompressed.js","compressed":"dojo/dojo.js"},":1.4.3":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.5.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.5.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.2.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.0":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"},":1.4.1":{"uncompressed":"dojo/dojo.xd.js.uncompressed.js","compressed":"dojo/dojo.xd.js"}},"aliases":{":1.7":"1.7.2",":1":"1.6.1",":1.6":"1.6.1",":1.5":"1.5.1",":1.4":"1.4.3",":1.3":"1.3.2",":1.2":"1.2.3",":1.1":"1.1.1"}},":prototype":{"versions":{":1.7.0.0":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.2":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.1.0":{"uncompressed":"prototype.js","compressed":"prototype.js"},":1.6.0.3":{"uncompressed":"prototype.js","compressed":"prototype.js"}},"aliases":{":1.7":"1.7.0.0",":1.6.1":"1.6.1.0",":1":"1.7.0.0",":1.6":"1.6.1.0",":1.7.0":"1.7.0.0",":1.6.0":"1.6.0.3"}},":jquery":{"versions":{":1.6.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.4":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.3.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.6.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.7.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.7.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.2.6":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.3":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.4":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.0":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.5.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.1":{"uncompressed":"jquery.js","compressed":"jquery.min.js"},":1.4.2":{"uncompressed":"jquery.js","compressed":"jquery.min.js"}},"aliases":{":1.7":"1.7.1",":1.6":"1.6.4",":1":"1.7.1",":1.5":"1.5.2",":1.4":"1.4.4",":1.3":"1.3.2",":1.2":"1.2.6"}}});
}
if (window['google'] != undefined && window['google']['loader'] != undefined) {
if (!window['google']['search']) {
window['google']['search'] = {};
google.search.Version = '1.0';
google.search.NoOldNames = false;
google.search.JSHash = '28ae2b20598e87432c64a154583c2fc6';
google.search.LoadArgs = 'file\75uds.js\46v\0750.1';
google.loader.ApiKey = 'notsupplied';
google.loader.KeyVerified = true;
google.loader.LoadFailure = false;
}

}










































// default+pt


(function() {
var _UDS_CONST_LOCALE = 'pt_BR';
var _UDS_CONST_SHORT_DATE_PATTERN = 'DMY';
var _UDS_MSG_SEARCHER_IMAGE = ('Imagem');
var _UDS_MSG_SEARCHER_WEB = ('Web');
var _UDS_MSG_SEARCHER_BLOG = ('Blog');
var _UDS_MSG_SEARCHER_VIDEO = ('V\u00eddeo');
var _UDS_MSG_SEARCHER_LOCAL = ('Local');
var _UDS_MSG_SEARCHCONTROL_SAVE = ('salvar');
var _UDS_MSG_SEARCHCONTROL_KEEP = ('guardar');
var _UDS_MSG_SEARCHCONTROL_INCLUDE = ('incluir');
var _UDS_MSG_SEARCHCONTROL_COPY = ('copiar');
var _UDS_MSG_SEARCHCONTROL_CLOSE = ('fechar');
var _UDS_MSG_SEARCHCONTROL_SPONSORED_LINKS = ('Links patrocinados');
var _UDS_MSG_SEARCHCONTROL_SEE_MORE = ('veja mais...');
var _UDS_MSG_SEARCHCONTROL_WATERMARK = ('recortado do Google');
var _UDS_MSG_SEARCHER_CONFIG_SET_LOCATION = ('Local da pesquisa');
var _UDS_MSG_SEARCHER_CONFIG_DISABLE_ADDRESS_LOOKUP = ('Desativar consulta de endere\u00e7o');
var _UDS_MSG_SEARCHER_NEWS = ('Not\u00edcias');
function _UDS_MSG_MINUTES_AGO(AGE_MINUTES_AGO) {return ('' + AGE_MINUTES_AGO + ' minutos atr\u00e1s');}
var _UDS_MSG_ONE_HOUR_AGO = ('1 hora atr\u00e1s');
function _UDS_MSG_HOURS_AGO(AGE_HOURS_AGO) {return ('' + AGE_HOURS_AGO + ' horas atr\u00e1s');}
function _UDS_MSG_NEWS_ALL_N_RELATED(NUMBER) {return ('todos os ' + NUMBER + ' relacionados');}
var _UDS_MSG_NEWS_RELATED = ('Artigos relacionados');
var _UDS_MSG_BRANDING_STRING = ('powered by Google');
var _UDS_MSG_SORT_BY_DATE = ('Classificar por data');
var _UDS_MSG_MONTH_ABBR_JAN = ('Jan');
var _UDS_MSG_MONTH_ABBR_FEB = ('Fev');
var _UDS_MSG_MONTH_ABBR_MAR = ('Mar');
var _UDS_MSG_MONTH_ABBR_APR = ('Abr');
var _UDS_MSG_MONTH_ABBR_MAY = ('Mai');
var _UDS_MSG_MONTH_ABBR_JUN = ('Jun');
var _UDS_MSG_MONTH_ABBR_JUL = ('Jul');
var _UDS_MSG_MONTH_ABBR_AUG = ('Ago');
var _UDS_MSG_MONTH_ABBR_SEP = ('Set');
var _UDS_MSG_MONTH_ABBR_OCT = ('Out');
var _UDS_MSG_MONTH_ABBR_NOV = ('Nov');
var _UDS_MSG_MONTH_ABBR_DEC = ('Dez');
var _UDS_MSG_DIRECTIONS = ('como chegar');
var _UDS_MSG_CLEAR_RESULTS = ('limpar resultados');
var _UDS_MSG_SHOW_ONE_RESULT = ('mostrar um resultado');
var _UDS_MSG_SHOW_MORE_RESULTS = ('mostrar mais resultados');
var _UDS_MSG_SHOW_ALL_RESULTS = ('mostrar todos os resultados');
var _UDS_MSG_SETTINGS = ('configura\u00e7\u00f5es');
var _UDS_MSG_SEARCH = ('pesquisar');
var _UDS_MSG_SEARCH_UC = ('Pesquisar');
var _UDS_MSG_POWERED_BY = ('tecnologia');
function _UDS_MSG_LOCAL_ATTRIBUTION(LOCAL_RESULTS_PROVIDER) {return ('Banco de empresas fornecido pela ' + LOCAL_RESULTS_PROVIDER);}
var _UDS_MSG_SEARCHER_BOOK = ('Livro');
function _UDS_MSG_FOUND_ON_PAGE(FOUND_ON_PAGE) {return ('P\u00e1gina ' + FOUND_ON_PAGE);}
function _UDS_MSG_TOTAL_PAGE_COUNT(PAGE_COUNT) {return ('' + PAGE_COUNT + ' p\u00e1ginas');}
var _UDS_MSG_SEARCHER_BY = ('por');
var _UDS_MSG_SEARCHER_CODE = ('C\u00f3digo');
var _UDS_MSG_UNKNOWN_LICENSE = ('Licen\u00e7a desconhecida');
var _UDS_MSG_SEARCHER_GSA = ('Search Appliance');
var _UDS_MSG_SEARCHCONTROL_MORERESULTS = ('Mais resultados');
var _UDS_MSG_SEARCHCONTROL_PREVIOUS = ('Anteriores');
var _UDS_MSG_SEARCHCONTROL_NEXT = ('Pr\u00f3ximos');
var _UDS_MSG_GET_DIRECTIONS = ('Rota');
var _UDS_MSG_GET_DIRECTIONS_TO_HERE = ('Para c\u00e1');
var _UDS_MSG_GET_DIRECTIONS_FROM_HERE = ('Daqui');
var _UDS_MSG_CLEAR_RESULTS_UC = ('Limpar resultados');
var _UDS_MSG_SEARCH_THE_MAP = ('pesquisar o mapa');
var _UDS_MSG_SCROLL_THROUGH_RESULTS = ('percorrer os resultados');
var _UDS_MSG_EDIT_TAGS = ('editar tags');
var _UDS_MSG_TAG_THIS_SEARCH = ('marcar esta pesquisa');
var _UDS_MSG_SEARCH_STRING = ('string de pesquisa');
var _UDS_MSG_OPTIONAL_LABEL = ('marcador opcional');
var _UDS_MSG_DELETE = ('excluir');
var _UDS_MSG_DELETED = ('exclu\u00eddo');
var _UDS_MSG_CANCEL = ('cancelar');
var _UDS_MSG_UPLOAD_YOUR_VIDEOS = ('fa\u00e7a upload do seu v\u00eddeo');
var _UDS_MSG_IM_DONE_WATCHING = ('acabei de assistir');
var _UDS_MSG_CLOSE_VIDEO_PLAYER = ('fechar reprodutor de v\u00eddeo');
var _UDS_MSG_NO_RESULTS = ('Nenhum resultado');
var _UDS_MSG_LINKEDCSE_ERROR_RESULTS = ('Este Mecanismo de pesquisa personalizado est\u00e1 carregando. Tente novamente em alguns segundos.');
var _UDS_MSG_COUPONS = ('Cupons');
var _UDS_MSG_BACK = ('voltar');
var _UDS_MSG_SUBSCRIBE = ('Inscrever-se');
var _UDS_MSG_SEARCHER_PATENT = ('Patente');
var _UDS_MSG_USPAT = ('Pat. EUA');
var _UDS_MSG_USPAT_APP = ('Solicit. de Pat. EUA');
var _UDS_MSG_PATENT_FILED = ('Arquivado');
var _UDS_MSG_ADS_BY_GOOGLE = ('An\u00fancios Google');
var _UDS_MSG_SET_DEFAULT_LOCATION = ('Definir local padr\u00e3o');
var _UDS_MSG_NEWSCAT_TOPSTORIES = ('\u00daltimas not\u00edcias');
var _UDS_MSG_NEWSCAT_WORLD = ('Mundo');
var _UDS_MSG_NEWSCAT_NATION = ('Pa\u00eds');
var _UDS_MSG_NEWSCAT_BUSINESS = ('Neg\u00f3cios');
var _UDS_MSG_NEWSCAT_SCITECH = ('Ci\u00eancia/Tecnologia');
var _UDS_MSG_NEWSCAT_ENTERTAINMENT = ('Entretenimento');
var _UDS_MSG_NEWSCAT_HEALTH = ('Sa\u00fade');
var _UDS_MSG_NEWSCAT_SPORTS = ('Esportes');
var _UDS_MSG_NEWSCAT_POLITICS = ('Pol\u00edtica');
var _UDS_MSG_SEARCH_RESULTS = ('Resultados da pesquisa');
var _UDS_MSG_DID_YOU_MEAN = ('Voc\u00ea quis dizer:');
var _UDS_MSG_CUSTOM_SEARCH = ('Pesquisa personalizada do Google');
var _UDS_MSG_LABELED = ('Marcado');
var _UDS_MSG_LOADING = ('Carregando...');
var _UDS_MSG_ALL_RESULTS_SHORT = ('Todos');
var _UDS_MSG_ALL_RESULTS_LONG = ('Todos os resultados');
var _UDS_MSG_REFINE_RESULTS = ('Refinar resultados:');
function _UDS_MSG_REVIEWS(REVIEW_COUNT) {return ('' + REVIEW_COUNT + ' resenhas');}
function _UDS_MSG_CALORIES(CALORIES) {return ('' + CALORIES + ' kcal');}
function _UDS_MSG_PRICE_RANGE(RANGE) {return ('Faixa de pre\u00e7o: ' + RANGE + '.');}
function _UDS_MSG_PRICE(PRICE) {return ('Pre\u00e7o: ' + PRICE + '.');}
function _UDS_MSG_AVAILABILITY(AVAILABILITY) {return ('Disponibilidade: ' + AVAILABILITY + '.');}
function _UDS_MSG_TELEPHONE(TELEPHONE) {return ('Tel: ' + TELEPHONE);}
function _UDS_MSG_RESULT_INFO(NUMBER_OF_RESULTS, SEARCH_TIME) {return ('Aproximadamente ' + NUMBER_OF_RESULTS + ' resultados (' + SEARCH_TIME + ' segundos)');}
var _UDS_MSG_FILE_FORMAT = ('Formato do arquivo:');
var _UDS_MSG_SHOWING_RESULTS_FOR = ('Exibindo resultados para');
var _UDS_MSG_SEARCH_INSTEAD_FOR = ('Em vez disso, pesquisar por');
function _UDS_MSG_FILTERED_RESULTS(NUM) {return ('Para mostrar os resultados mais relevantes, omitimos algumas entradas bastante semelhantes a ' + NUM + ' das entradas exibidas. Se quiser, voc\u00ea pode ' + '<a>repetir a pesquisa, incluindo os resultados omitidos' + '</a>.');}
var _UDS_MSG_ORDER_BY = ('Classificar por:');
var _UDS_MSG_ORDER_BY_RELEVANCE = ('Relev\u00e2ncia');
var _UDS_MSG_ORDER_BY_DATE = ('Data');
var _UDS_MSG_ORDER_BY_GET_LINK = ('Compartilhar esta p\u00e1gina:');

var c=encodeURIComponent,ba=google_exportSymbol,da=_UDS_CONST_SHORT_DATE_PATTERN,ga=Object,h=document,ha=isNaN,oa=Math,pa=Array,qa=navigator,ra=Error,ta=parseInt,ua=parseFloat,va=String,wa=_UDS_CONST_LOCALE,xa=decodeURIComponent;function za(a,b){return a.onload=b}function Aa(a,b){return a.width=b}function Ba(a,b){return a.padding=b}function Ca(a,b){return a.cancelBubble=b}function Da(a,b){return a.toString=b}function Fa(a,b){return a.checked=b}function Ga(a,b){return a.clone=b}
function Ka(a,b){return a.total=b}function Na(a,b){return a.enabled=b}function Oa(a,b){return a.href=b}function Pa(a,b){return a.display=b}function Qa(a,b){return a.height=b}function Sa(a,b){return a.root=b}function Ta(a,b){return a.onreadystatechange=b}function Ua(a,b){return a.input=b}function Xa(a,b){return a.innerHTML=b}function Ya(a,b){return a.value=b}function $a(a,b){return a.left=b}function ab(a,b){return a.type=b}function cb(a,b){return a.name=b}function db(a,b){return a.zIndex=b}
function gb(a,b){return a.visibility=b}function ib(a,b){return a.textContent=b}function jb(a,b){return a.title=b}function lb(a,b){return a.prototype=b}function m(a,b){return a.className=b}function mb(a,b){return a.disabled=b}function nb(a,b){return a.target=b}function ob(a,b){return a.onclick=b}
var p="appendChild",tb="getBoundingClientRect",ub="shift",vb="pushState",wb="exec",yb="clearTimeout",zb="width",r="replace",Ab="floor",Cb="content",Db="offsetWidth",Eb="concat",Fb="charAt",Gb="createTextNode",Hb="insertBefore",Ib="match",Jb="focus",t="createElement",Kb="keyCode",Lb="firstChild",Mb="select",Nb="setAttribute",Ob="cloneNode",Rb="clear",Sb="childNodes",Tb="refresh",Ub="attachEvent",Vb="nextSibling",Wb="getTime",Xb="register",ac="getElementsByTagName",bc="host",cc="substr",dc="propertyIsEnumerable",
ec="cursor",fc="checked",gc="setTimeout",hc="split",ic="constructor",jc="stopPropagation",kc="userAgent",lc="buffer",mc="location",nc="count",oc="hasOwnProperty",pc="getComputedStyle",u="style",qc="hostname",rc="close",sc="hasChildNodes",tc="clone",v="search",uc="state",vc="isEnabled",wc="random",xc="protocol",yc="enabled",A="addRule",zc="href",Ac="console",Bc="apply",Cc="tagName",Dc="reset",Ec="removeAttribute",Fc="label",Gc="display",Hc="height",Ic="root",Nc="offsetHeight",B="push",Oc="page",Pc=
"open",Qc="test",Rc="replaceChild",Sc="input",Tc="styleSheet",Uc="submit",Vc="text",Wc="round",Xc="slice",Yc="nodeType",Zc="getElementById",$c="innerHTML",ad="srcElement",bd="RENDERER",cd="value",dd="indexOf",D="History",ed="insertRow",fd="getElementsByClassName",gd="setRequestHeader",hd="readyState",id="addEventListener",jd="type",kd="defaultView",ld="ServiceBase",md="name",nd="insertCell",od="parse",G="length",pd="title",qd="google",H="prototype",rd="className",sd="clientWidth",td="Version",ud=
"document",vd="body",wd="history",xd="removeChild",yd="target",zd="call",Ad="anchor",Bd="getAttribute",Cd="charCodeAt",Dd="sort",Ed="loader",Fd="currentStyle",Gd="substring",Hd="themes",Id="shiftKey",I="element",Jd="parentNode",Kd="CurrentLocale",Ld="toUpperCase",Md="splice",Nd="join",Od="toLowerCase",Pd="event",M;var Qd=this,Rd=function(a,b,d){a=a[hc](".");d=d||Qd;a[0]in d||!d.execScript||d.execScript("var "+a[0]);for(var e;a[G]&&(e=a[ub]());)a[G]||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b},Sd=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof pa)return"array";if(a instanceof ga)return b;var d=ga[H].toString[zd](a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a[G]&&"undefined"!=typeof a[Md]&&"undefined"!=typeof a[dc]&&!a[dc]("splice"))return"array";if("[object Function]"==
d||"undefined"!=typeof a[zd]&&"undefined"!=typeof a[dc]&&!a[dc]("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a[zd])return"object";return b},Td=function(a,b){function d(){}lb(d,b[H]);a.CA=b[H];lb(a,new d);a[H].constructor=a;a.BA=function(a,d,f){return b[H][d][Bc](a,pa[H][Xc][zd](arguments,2))}};var Ud=function(a){if(ra.captureStackTrace)ra.captureStackTrace(this,Ud);else{var b=ra().stack;b&&(this.stack=b)}a&&(this.message=va(a))};Td(Ud,ra);cb(Ud[H],"CustomError");var Vd=function(a,b){for(var d=a[hc]("%s"),e="",g=pa[H][Xc][zd](arguments,1);g[G]&&1<d[G];)e+=d[ub]()+g[ub]();return e+d[Nd]("%s")},ce=function(a,b){if(b)a=a[r](Wd,"&amp;")[r](Xd,"&lt;")[r](Yd,"&gt;")[r](Zd,"&quot;")[r]($d,"&#39;")[r](ae,"&#0;");else{if(!be[Qc](a))return a;-1!=a[dd]("&")&&(a=a[r](Wd,"&amp;"));-1!=a[dd]("<")&&(a=a[r](Xd,"&lt;"));-1!=a[dd](">")&&(a=a[r](Yd,"&gt;"));-1!=a[dd]('"')&&(a=a[r](Zd,"&quot;"));-1!=a[dd]("'")&&(a=a[r]($d,"&#39;"));-1!=a[dd]("\x00")&&(a=a[r](ae,"&#0;"))}return a},
Wd=/&/g,Xd=/</g,Yd=/>/g,Zd=/"/g,$d=/'/g,ae=/\x00/g,be=/[\x00&<>"']/;var de=function(a,b){b.unshift(a);Ud[zd](this,Vd[Bc](null,b));b[ub]()};Td(de,Ud);cb(de[H],"AssertionError");var ee=function(a,b,d){if(!a){var e="Assertion failed";if(b)var e=e+(": "+b),g=pa[H][Xc][zd](arguments,2);throw new de(""+e,g||[]);}return a},fe=function(a,b){throw new de("Failure"+(a?": "+a:""),pa[H][Xc][zd](arguments,1));};var ge=pa[H],he=ge.forEach?function(a,b,d){ee(null!=a[G]);ge.forEach[zd](a,b,d)}:function(a,b,d){for(var e=a[G],g="string"==typeof a?a[hc](""):a,f=0;f<e;f++)f in g&&b[zd](d,g[f],f,a)},ie=function(a,b,d){ee(null!=a[G]);return 2>=arguments[G]?ge[Xc][zd](a,b):ge[Xc][zd](a,b,d)};var je=function(a){var b=arguments[G];if(1==b&&"array"==Sd(arguments[0]))return je[Bc](null,arguments[0]);for(var d={},e=0;e<b;e++)d[arguments[e]]=!0;return d};var ke=je("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));var le=/<[^>]*>|&[^;]+;/g,me=function(a,b){return b?a[r](le,""):a},ne=RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"),oe=RegExp("^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]"),pe=/^https:\/\/.*/,se=RegExp("[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff][^\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc]*$"),
te=RegExp("[\u0591-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc][^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*$"),ue=/\s+/,ve=/\d/;var xe=function(){this.wm="";this.$x=we};xe[H].Fj=!0;xe[H].Ej=function(){return this.wm};Da(xe[H],function(){return"Const{"+this.wm+"}"});var ye=function(a){if(a instanceof xe&&a[ic]===xe&&a.$x===we)return a.wm;fe("expected object of type Const, got '"+a+"'");return"type_error:Const"},we={};var Ae=function(){this.Aj="";this.Bx=ze};Ae[H].Fj=!0;var ze={};Ae[H].Ej=function(){return this.Aj};Da(Ae[H],function(){return"SafeStyle{"+this.Aj+"}"});var Be=function(a){var b=new Ae;b.Aj=a;return b},Ce=Be(""),De=/^[-.%_!# a-zA-Z0-9]+$/;var Fe=function(){this.Od="";this.Cx=Ee};M=Fe[H];M.Fj=!0;M.Ej=function(){return this.Od};M.jr=!0;M.zj=function(){return 1};Da(M,function(){return"SafeUrl{"+this.Od+"}"});var Ee={};var He=function(){this.Od="";this.Tx=Ge;this.tm=null};M=He[H];M.jr=!0;M.zj=function(){return this.tm};M.Fj=!0;M.Ej=function(){return this.Od};Da(M,function(){return"SafeHtml{"+this.Od+"}"});
var Ie=function(a){if(a instanceof He&&a[ic]===He&&a.Tx===Ge)return a.Od;fe("expected object of type SafeHtml, got '"+a+"'");return"type_error:SafeHtml"},Ke=function(a){if(a instanceof He)return a;var b=null;a.jr&&(b=a.zj());return Je(ce(a.Fj?a.Ej():va(a)),b)},Le=/^[a-zA-Z0-9-]+$/,Me=je("action","cite","data","formaction","href","manifest","poster","src"),Ne=je("link","script","style"),Oe=function(a){var b=0,d="",e=function(a){"array"==Sd(a)?he(a,e):(a=Ke(a),d+=Ie(a),a=a.zj(),0==b?b=a:0!=a&&b!=a&&
(b=null))};he(arguments,e);return Je(d,b)},Pe=function(a,b){var d=Oe(ie(arguments,1));d.tm=a;return d},Ge={},Je=function(a,b){var d=new He;d.Od=a;d.tm=b;return d};Je("",0);var Qe=function(a,b){this.Pd="number"==typeof a?0<a?1:0>a?-1:null:null==a?null:a?-1:1;this.Dx=!!b};M=Qe[H];M.um=function(a,b){for(var d=0,e=0,g=!1,f=me(a,b)[hc](ue),k=0;k<f[G];k++){var l=f[k];oe[Qc](me(l,void 0))?(d++,e++):pe[Qc](l)?g=!0:ne[Qc](me(l,void 0))?e++:ve[Qc](l)&&(g=!0)}return 0==e?g?1:0:.4<d/e?-1:1};M.Wx=function(a,b){return 0>a*b};M.dr=function(a,b,d,e){return e&&(this.Wx(b,this.Pd)||1==this.Pd&&te[Qc](me(a,d))||-1==this.Pd&&se[Qc](me(a,d)))?1==this.Pd?"\u200e":"\u200f":""};
M.Tq=function(a,b){return this.qr(this.um(a,b))};M.qr=function(a){return-1==(0==a?this.Pd:a)?"rtl":"ltr"};M.Yq=function(a,b,d){return this.Xy(null,a,b,d)};M.Wy=function(a,b,d){null==a&&(a=this.um(Ie(b),!0));return this.dy(a,b,d)};M.Xy=function(a,b,d,e){b=d?Je(b,null):Ke(b);return Ie(this.Wy(a,b,e))};
M.dy=function(a,b,d){d=d||void 0==d;var e;e=0!=a&&a!=this.Pd;if(this.Dx||e){var g;e&&(g=-1==a?"rtl":"ltr");g={dir:g};if(!Le[Qc]("span"))throw ra("Invalid tag name <span>.");if("span"in Ne)throw ra("Tag name <span> is not allowed for SafeHtml.");var f=null;e="<span";if(g)for(var k in g){if(!Le[Qc](k))throw ra('Invalid attribute name "'+k+'".');var l=g[k];if(null!=l){if(l instanceof xe)l=ye(l);else if("style"==k[Od]()){var n=typeof l;if(("object"!=n||null==l)&&"function"!=n)throw ra('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+
typeof l+" given: "+l);if(!(l instanceof Ae)){var n="",q=void 0;for(q in l){if(!/^[-_a-zA-Z0-9]+$/[Qc](q))throw ra("Name allows only [-_a-zA-Z0-9], got: "+q);var s=l[q];null!=s&&(s instanceof xe?(s=ye(s),ee(!/[{;}]/[Qc](s),"Value does not allow [{;}].")):De[Qc](s)||(fe("String value allows only [-.%_!# a-zA-Z0-9], got: "+s),s="zClosurez"),n+=q+":"+s+";")}n?(ee(!/[<>]/[Qc](n),"Forbidden characters in style string: "+n),l=Be(n)):l=Ce}n=void 0;l instanceof Ae&&l[ic]===Ae&&l.Bx===ze?n=l.Aj:(fe("expected object of type SafeStyle, got '"+
l+"'"),n="type_error:SafeStyle");l=n}else{if(/^on/i[Qc](k))throw ra('Attribute "'+k+'" requires goog.string.Const value, "'+l+'" given.');if(l instanceof Fe)l instanceof Fe&&l[ic]===Fe&&l.Cx===Ee?l=l.Od:(fe("expected object of type SafeUrl, got '"+l+"'"),l="type_error:SafeUrl");else if(k[Od]()in Me)throw ra('Attribute "'+k+'" requires goog.string.Const or goog.html.SafeUrl value, "'+l+'" given.');}ee("string"==typeof l||"number"==typeof l,"String or number value expected, got "+typeof l+" with value: "+
l);e+=" "+k+'="'+ce(va(l))+'"'}}k=b;void 0!==k?"array"==Sd(k)||(k=[k]):k=[];!0===ke.span?(ee(!k[G],"Void tag <span> does not allow content."),e+=">"):(f=Oe(k),e+=">"+Ie(f)+"</span>",f=f.zj());(g=g&&g.dir)&&(f=/^(ltr|rtl|auto)$/i[Qc](g)?0:null);e=Je(e,f)}else e=b;b=Ie(b);return e=Pe(0,e,this.dr(b,a,!0,d))};M.Xq=function(a,b){return this.Gy(null,a,b)};M.Gy=function(a,b,d){null==a&&(a=this.um(b,d));return this.dr(b,a,d,!0)};M.Yy=function(){return-1==this.Pd?"right":"left"};
M.xy=function(){return-1==this.Pd?"left":"right"};var Re,Se,Te,Ue,Ve,We,Xe,Ye,Ze,$e,af,bf,cf,df,ef,ff,gf,hf,jf,kf,lf,mf,nf,of,pf,qf,rf,sf,tf,uf,vf,wf,zf,Af,Bf,Cf,Df,Ef,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf,Of,Pf,Qf,Rf,Sf,Tf,Uf,Yf,Zf,$f,ag,bg,cg,dg,eg,fg,gg,hg,ig,jg,kg,lg,mg,ng=/^[6-9]$/,og={mw:0,Yp:1,lw:2,mj:3},pg={EMPTY:0,Jt:1,zo:2},qg={At:1,Bt:2,wB:3,zt:4,Ct:5,NB:6,dB:7,eg:8},rg={DONT_CARE:1,yt:2,to:3},sg={Xp:0,nw:1,mj:2},tg=[23,24],O={Pu:0,OA:114,yd:115,Wg:116,rb:117,Vg:494,Ta:118,Ge:119,xd:374,Bd:120,ud:121,vi:122,gc:123,Re:124,xi:125,Xu:230,EB:553,Cc:126,
$e:127,Nb:128,Eo:343,Zf:129,NA:231,ze:130,Ku:131,RA:237,aB:570,zB:132,Mu:134,Du:189,Eu:246,BB:264,AB:256,Ci:133,Kt:184,Og:419,OB:503,PB:578,QB:579,RB:505,UB:516,SB:509,TB:512,Ke:173,pB:568,qB:569,On:135,Bk:136,Ck:137,Sn:138,Of:139,Lu:140,Pn:141,Qn:142,Rn:240,Nu:143,Ou:144,Mi:347,Il:191,ej:150,Rf:145,yq:146,Qg:147,VB:148,LB:245,$o:155,fh:149,ei:154,si:311,fe:153,RENDERER:152,Wc:156,Ye:151,yl:158,Do:294,ll:157,Pe:160,sB:328,WB:580,Fd:159},ug={bp:161,cp:162};var vg=function(a){return{sj:function(){return a.sj()},Jb:function(){return a.Jb()},Eb:function(){return a.Eb()}}};(function(){function a(a){for(var b=[],g=0,f;f=a[g++];)b[B](f.api||{a:f.lh,b:f.pb,c:f.ge,d:f.L,e:f.nf,f:f.tq,g:f.sq,i:f.ii,j:f.Aa,k:f.Oi,l:f.rq});return b}function b(a){for(var b=[],g=0,f;f=a[g++];)f=f.api||f,b[B]({api:f,lh:f.a,pb:f.b,ge:f.c,L:f.d,nf:f.e,tq:f.f,sq:f.g,ii:f.i,Aa:f.j,Oi:f.k,rq:f.l});return b}Re=function(a){var b={};if(a)for(var g=0;g<a[G];++g)b[a[g]]=!0;return b};Se=function(b){var e=a(b.Eb());return b.api||{a:b.Jb,b:function(){return e},c:b.sj}};Te=function(a){a=a.api||a;var e=b(a.b());
return{api:a,Jb:a.a,Eb:function(){return e},sj:a.c}};Ue=function(a){return a?(a=a[Od](),"zh-tw"==a||"zh-cn"==a||"ja"==a||"ko"==a):!1};Ve=function(){return(new Date)[Wb]()};We=function(a){return"string"==typeof a};Xe=function(a){return"number"==typeof a}})();var wg=function(){return{Tf:function(){return{rk:"hp",sk:"hp",Lo:"google.com",Cu:"",Fe:"en",wn:"",Xs:"",Ls:"",Zo:0,qt:"",tk:"",Oo:!1,Bu:"",tl:"",sl:0,Zz:null,Po:!1,Sz:!1,oi:!1,Xf:Re([19,5,0]),Dz:!1,Us:!0,Cz:10,pt:!0,Wn:!0,Az:!1,Vs:!1,Yu:!1,bn:!1,Jz:!1,lu:!1,vz:!0,Vz:"en",Oj:!0,Mr:!1,Xr:500,Wj:!1,Ki:!0,Ao:!0,Js:!1,Zn:"",Kz:"//www.google.com/textinputassistant",Lz:"",Nz:7,Ez:!1,Fz:!1,Wr:!1,Ns:!0,Os:!1,cn:!1,Qr:!1,Pr:!1,Zh:1,Or:!0,Rj:!1,ek:!1,us:!1,zs:10,Gk:!1,yz:0,Gz:!1,As:!0,Nr:!1,Yg:h[vd],Ks:!0,$n:null,
Je:{},Bz:{},Oz:0,vs:!1,Ws:!0,ce:!1,Uz:null,Is:!1,Gu:null,yo:null,Gt:!1,Ps:!0,ts:!1,Yz:1,wz:1,spellcheck:!1,ys:!1,Rs:"Search",Dk:"I'm  Feeling Lucky",Ss:"",Qs:"Learn more",Rz:"Remove",Pz:"This search was removed from your Web History",Hz:"",zz:"Did you mean:",Mz:"",Tz:"",Wz:"Search by voice",mn:!1,ws:null,kn:0,xs:0,ik:"",eo:"",Iz:!1,Sg:"absolute",Ms:!1,Ft:!1,on:null,nn:!0,Xz:0,df:[0,0,0],Vn:null,dn:null,Et:[0],co:0,Qz:1,Xj:"",vn:"",un:"",dl:null,fl:"",el:"",xz:1,lk:{},Bs:!0}}}};var xg=/<\/?(?:b|em)>/gi,yg={ou:8,eg:9,Mo:13,Qi:27,MB:32,mu:37,Co:38,nu:39,Bo:40,pu:46,yB:190};var zg=function(){function a(a,b,d){f[a]=d;n[a]=[b]}function b(a,b,e){var f=l[a];f?f!=d&&(l[a]=d):l[a]=e;(f=n[a])?f[B](b):n[a]=[b];k[b]=e}var d=Ye,e=0,g={},f={},k={},l={},n={},q=1E4;return{yA:function(){return e++},xA:function(){return q++},kr:a,zA:function(b,d){var e=q++;a(b,e,d);return e},register:b,AA:function(a,d){var e=q++;b(a,e,d);return e},Fu:function(){return n},Tf:function(a,b){var e=g[a];return e?e:(e=f[a])?g[a]=e():b?(e=k[b])?e():null:(e=l[a])&&e!=d?e():null}}}();var Ag=function(a,b,d,e,g,f){function k(){if(C){for(var a=0,b;b=L[a++];)b.Bb&&b.Bb();C=!1}}function l(a){for(var b in a){var d=b,e=a[d];if(e!=x.bp)if(y[d]){for(var f=z[d]||[],g=0,k=void 0;g<e[G];++g)(k=n(d,e[g]))&&f[B](k);z[d]=f}else(e=n(d,e))&&(N[d]=e)}}function n(a,b){var d;if(b&&b instanceof ga)d=b;else if(d=E.Tf(a,b),!d)return null;if(d.bg){var e=d.bg();if(e)for(var f=0,g,k,l;g=e[f++];){l=!1;k=g.L();if(y[k]){if(l=J[k]){l[B](g);continue}l=!0}J[k]=l?[g]:g}}K[B]([d,a]);L[B](d);return d}function q(a){for(var b=
O.Pu,d=0,e;e=K[d++];)e[0]==a&&(b=e[1]);return b}function s(a,b){var d=Ze(a.L(),w),e=Ze(b.L(),w);return 0>d?1:0>e?-1:d-e}var x=ug,y=Re([O.Fd,O.$o,O.fh,O.fe,O.ei,O.si,O[bd],O.Wc,O.vi,O.Ye,O.yl,O.Do,O.Pe]),F=[O.Rf,O.rb,O.Ta,O.Ge,O.xd,O.Cc,O.yd,O.Wg,O.Bd,O.Qg,O.ud,O.Ci,O.gc,O.Re,O.xi,O.$e,O.Nb,O.Eo,O.Zf],w=[O.$e,O.fh,O.Mu,O.gc,O.ud,O.Cc,O.Ta,O.yd,O.Nb,O.Pe,O.Ke,O.Ge,O.Wg,O[bd],O.fe,O.Zf,O.Bd,O.xd,O.Re,O.yl,O.$o,O.Ku,O.ze,O.Qg,O.Pn,O.Qn,O.Ck,O.Rn,O.Nu,O.Sn,O.Ou,O.Of,O.Lu,O.On,O.Bk],N={},z={},J={},K=[],
L=[],C=!1,E=zg,Z={da:function(a){k();for(var b=0,d;d=L[b++];)d.da&&d.da(a);C=!0},Bb:k,tn:function(){return C},get:function(a,b){var d=N[a];if(d)return d.V?d.V(q(b)):{}},Ab:function(a,b){var d=z[a];if(d){for(var e=[],f=q(b),g=0,k;k=d[g++];)e[B](k.V?k.V(f):{});return e}return[]},ye:function(){return a},Sh:function(){return g},No:function(a,b){var d=z[O.Fd];if(d)for(var e=0,f;f=d[e++];)if(f.W()==a)return f.V?f.V(q(b)):{};return null}};(function(){if(f.Bs){var g=E.Fu(),k,q,w,z;for(z in g){var K=z;k=g[K];
q=y[K];if(w=b[K]){if(w!=x.bp&&q&&w[G]){q=K;w=w[Xc](0);for(var K=[],ca={},sa=0,na=void 0,Ha=void 0;Ha=w[sa++];)Ha instanceof ga&&(na=Ha.W(),ca[na]||(K[B](Ha),ca[na]=1),w[Md](--sa,1));sa=Re(w);sa[x.cp]&&(sa=Re(w[Eb](k)),delete sa[x.cp]);for(na in sa)ca[na]||K[B](ta(na,10));b[q]=K}}else b[K]=q?k:k[0]}}l(b);for(g=0;z=F[g++];)b[z]||(q=n(z,void 0))&&(N[z]=q);l(J);L[Dd](s);for(g=0;z=L[g++];)z.hb&&z.hb(d,e);a.rl(e,d.Xh());e.Qu();for(g=0;z=L[g++];)z.ha&&z.ha(Z);for(g=0;z=L[g++];)z.sb&&z.sb(f);for(g=0;z=L[g++];)z.da&&
z.da(f);C=!0})();return Z};var Bg=function(a,b,d){function e(){return a}function g(){return w}function f(){return N}function k(){return b}function l(){return d||""}function n(a,b){y(a,b)}function q(a,b){y(a,b,!0)}function s(){C||(E=Z=!0)}function x(){U=!0}function y(a,b,d){C||(E=!0,z[a]=b,d&&(J[a]=b))}var F=bf(),w,N,z={},J={},K,L,C=!1,E=!1,Z=!1,ea=!1,U=!1,la={ub:function(){return F},So:function(){var a=ta(F,36);return ha(a)?-1:a},Jb:e,pp:g,ke:f,Mf:k,Aa:function(){return z},rp:function(){return K},fj:l,wl:function(){return L},
en:function(){return{Jb:e,pp:g,ke:f,Mf:k,fj:l,setParameter:n,Ui:q,$w:s,Zw:x}},setParameter:n,Ui:q,$w:s,Zw:x,wu:function(){return Z},vu:function(){E=ea=!0},Ts:function(e,f,g){return!E&&a==e&&b.Hw(f)&&d==g},Vo:function(){return ea},sp:function(){return U},uu:function(){C||(L=Ve(),"cp"in J||q("cp",b.ci()),y("gs_id",F),K=$e(J)+":"+a,E=C=!0)}};w=a[Od]();N=af(w);return la};var Dg=function(a,b,d,e,g,f){function k(){return!!b&&!!b[0]}var l,n=!0,q,s={fd:function(){return a},Jb:function(){return a.Jb()},Pj:function(){return k()?b[0]:null},Eb:function(){return b},td:k,Aa:function(){return d},ol:function(){return e},bj:function(){return g},Mv:function(){return f},L:function(){return n},Jo:function(){q||(q=vg(s));return q},sj:function(){return l}};b?b[G]&&33==b[0].L()&&(g=n=!1):b=[];d?l=d.Ow("t"):d=Cg;return s};var Eg=function(a,b,d,e,g,f){function k(a){if(g)for(var b=0,d;d=a[b++];)if(-1!=Ze(d,g))return!0;return!1}var l=!1,n={lh:function(){return a},pb:function(){return b},ge:function(){return d},L:function(){return e},Oi:function(){return f.ob("za")},rq:function(){return f.ob("zb")},nf:function(){return g||[]},tq:function(a){return!!g&&k([a])},sq:k,Aa:function(){return f},ii:function(){return l}};switch(e){case 0:case 32:case 38:case 39:case 400:case 407:case 35:case 33:case 41:case 34:case 44:case 45:case 40:case 46:case 56:case 30:l=
!0}f||(f=Cg);return n};(function(){var a=/\s/g,b=/\u3000/g,d=/^\s/,e=/\s+/,g=/\s+/g,f=/^\s+|\s+$/g,k=/^\s+$/,l=/<[^>]*>/g,n=/&nbsp;/g,q=/&#x3000;/g,s=[/&/g,/&amp;/g,/</g,/&lt;/g,/>/g,/&gt;/g,/"/g,/&quot;/g,/'/g,/&#39;/g,/{/g,/&#123;/g],x=h[ac]("head")[0],y=0;df=function(a,b){void 0===b&&(b=a);var d=function(){return b};return{ci:d,oo:function(){return a},Sw:d,uA:function(){return a<b},Hw:function(d){return d&&a==d.oo()&&b==d.Sw()}}};cf=function(a,b,d,e){if(null==b||""===b){if(!e)return;b=""}d[B](a+"="+c(va(b)))};$e=function(a){var b=
[],d;for(d in a)cf(d,a[d],b);return b[Nd]("&")};ef=function(a){return!!a&&!k[Qc](a)};ff=function(a){for(var b=s[G],d=0;d<b;d+=2)a=a[r](s[d],s[d+1].source);return a};gf=function(a){for(var b=s[G],d=0;d<b;d+=2)a=a[r](s[d+1],s[d].source);a=a[r](n," ");return a[r](q,"\u3000")};hf=function(a){return a[r](xg,"")};jf=function(a){return a[r](l,"")};kf=function(d){return d&&(-1<d[dd](" ")||e[Qc](d))?(d=d[r](b,"&#x3000;"),d[r](a,"&nbsp;")):d};af=function(a,b){return a&&(-1<a[dd](" ")||e[Qc](a))?(a=a[r](g," "),
a[r](b?f:d,"")):a};lf=function(a,b,d){d&&(a=a[Od](),b=b[Od]());return b[G]<=a[G]&&a[Gd](0,b[G])==b};mf=function(a,b){return a||b?!!a&&!!b&&a[Od]()==b[Od]():!0};nf=function(a){window[yb](a)};Ye=function(){};of=function(){return x};bf=function(){return(y++).toString(36)};pf=function(a){return ng[Qc](a)};qf=function(a,b){return Eg(a.lh(),a.pb(),b,a.L(),a.nf(),a.Aa())};Ze=function(a,b){if(b[dd])return b[dd](a);for(var d=0,e=b[G];d<e;++d)if(b[d]===a)return d;return-1};rf=function(a,b){return a.kb()-b.kb()};
sf=function(a,b){return b.kb()-a.kb()};tf=function(a){var b={},d;for(d in a)b[d]=a[d];return b};uf=function(a,b,d){b in a||(a[b]=[162]);a[b][B](d)}})();var Fg=function(a){return{contains:function(b){return b in a},ow:function(b){return!!a[b]},Fo:function(b){return a[b]||0},ob:function(b){return a[b]||""},Ow:function(b){return a[b]||null}}},Cg=Fg({});(function(){function a(a,b,d){a=h[t](a);b&&m(a,b);d&&(a.id=d);return a}function b(b){return a("div",b)}function d(a,b){var d=a[ac]("input");if(d)for(var e=0,f;f=d[e++];)if(f[md]==b&&"submit"!=f[jd][Od]())return f;return null}function e(a){a&&(a.preventDefault&&a.preventDefault(),a.returnValue=!1);return!1}function g(a){return a?a.ownerDocument||a[ud]:window[ud]}function f(a){return a?(a=g(a),a[kd]||a.parentWindow):window}var k=void 0!=h.documentElement[u].opacity,l={rtl:"right",ltr:"left"};Cf=function(a,
b){try{if(a.setSelectionRange)a.setSelectionRange(b,b);else if(a.createTextRange){var d=a.createTextRange();d.collapse(!0);d.moveStart("character",b);d[Mb]()}}catch(e){}};Df=function(a){try{var b,d;if("selectionStart"in a)b=a.selectionStart,d=a.selectionEnd;else{var e=a.createTextRange(),f=g(a).selection.createRange();e.inRange(f)&&(e.setEndPoint("EndToStart",f),b=e[Vc][G],e.setEndPoint("EndToEnd",f),d=e[Vc][G])}if(void 0!==b)return df(b,d)}catch(k){}return null};Ef=function(a,b){for(var d=0,e=0;a&&
(!b||a!=b);){d+=a.offsetTop;e+=a.offsetLeft;try{a=a.offsetParent}catch(f){a=null}}return{Kl:d,ne:e}};Ff=function(a){try{return g(a).activeElement==a}catch(b){}return!1};Gf=function(a){return 38==a||40==a};zf=a;Hf=function(){var b=a("table");b.cellPadding=b.cellSpacing=0;Aa(b[u],"100%");return b};If=b;Jf=function(a,d){var e=b(a),f=e[u];f.background="transparent";f.color="#000";Ba(f,0);f.position="absolute";d&&db(f,d);f.whiteSpace="pre";return e};Kf=function(a,b){a[$c]!=b&&(b&&(vf?b=kf(b):wf&&(b='<pre style="font:inherit;margin:0">'+
b+"</pre>")),Xa(a,b))};Lf=function(a,b,d){var e=a[u];"INPUT"!=a.nodeName&&(d+=1);$a(e,e.right="");e[b]=d+"px"};Mf=function(a){return"rtl"==a?"right":"left"};Nf=function(a,b){a.dir!=b&&(a.dir=b,a[u].textAlign=l[b])};Of=function(b,e,f){if(d(b,e))return null;var g=a("input");ab(g,"hidden");cb(g,e);f&&Ya(g,f);return b[p](g)};Pf=d;Qf=function(a){var b=h.createEvent("KeyboardEvent");b.initKeyEvent&&(b.initKeyEvent("keypress",!0,!0,null,!1,!1,!0,!1,27,0),a.dispatchEvent(b))};Rf=e;Sf=function(a){if(a=a||
window[Pd])a[jc]&&a[jc](),Ca(a,a.cancel=!0);return e(a)};Tf=function(a,b){b[Jd][Hb](a,b[Vb])};Uf=function(a){a=a[nd](-1);var b=zf("a");Oa(b,"#ifl");m(b,"gssb_j gss_ifl");a[p](b);return b};Yf=function(a,b){var d=f(a);return(d=d[pc]?d[pc](a,""):a[Fd])?d[b]:null};Zf=function(a){var b=a||window;a=b[ud];var d=b.innerWidth,b=b.innerHeight;if(!d){var e=a.documentElement;e&&(d=e[sd],b=e.clientHeight);d||(d=a[vd][sd],b=a[vd].clientHeight)}return{Xo:d,To:b}};$f=function(a){return(a||window)[ud].documentElement[sd]};
ag=function(a){a=a[u];a.border="none";Ba(a,Af||Bf?"0 1px":"0");a.margin="0";Qa(a,"auto");Aa(a,"100%")};bg=function(a){return(k?"opacity":"filter")+":"+(k?a+"":(vf?"progid:DXImageTransform.Microsoft.Alpha(":"alpha(")+"opacity="+oa[Ab](100*a)+")")+";"};cg=function(a){var b={};if(a)for(var d=0,e;e=a[d++];)b[e.mh()]=e;return b};dg=g;eg=f;fg=function(a){Af&&(a.tabIndex=0)}})();zg.kr(O.Il,192,function(){function a(a){We(a)&&(a=e(a));var b="";if(a){for(var d=a[G],f=0,g=0,k=0;d--;)for(g<<=8,g|=a[k++],f+=8;6<=f;)var l=g>>f-6&63,b=b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[Fb](l),f=f-6;f&&(l=g<<8>>f+8-6&63,b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[Fb](l))}return b}function b(a){var b=[];if(a)for(var d=0,e=0,f=0;f<a[G];++f){var g=a[Cd](f);if(32>g||127<g||!n[g-32])return[];d<<=6;d|=n[g-32]-1;e+=6;8<=e&&(b[B](d>>e-8&255),e-=
8)}return b}function d(a,b){var d={};d.qb=pa(4);d.buffer=pa(4);d.Nw=pa(4);Ba(d,pa(64));d.padding[0]=128;for(var q=1;64>q;++q)d.padding[q]=0;g(d);var q=pa(64),n;64<b[G]?(g(d),k(d,b),n=l(d)):n=b;for(var s=0;s<n[G];++s)q[s]=n[s]^92;for(s=n[G];64>s;++s)q[s]=92;g(d);for(s=0;64>s;++s)d[lc][s]=q[s]^106;f(d,d[lc]);Ka(d,64);k(d,e(a));n=l(d);g(d);f(d,q);Ka(d,64);k(d,n);return l(d)}function e(a){for(var b=[],d=0,e=0;e<a[G];++e){var f=a[Cd](e);128>f?b[d++]=f:(2048>f?b[d++]=f>>6|192:(b[d++]=f>>12|224,b[d++]=f>>
6&63|128),b[d++]=f&63|128)}return b}function g(a){a.qb[0]=1732584193;a.qb[1]=4023233417;a.qb[2]=2562383102;a.qb[3]=271733878;a.tj=Ka(a,0)}function f(a,b){for(var d=a.Nw,e=0;64>e;e+=4)d[e/4]=b[e]|b[e+1]<<8|b[e+2]<<16|b[e+3]<<24;for(var f=a.qb[0],e=a.qb[1],g=a.qb[2],k=a.qb[3],l,n,C,E=0;64>E;++E)16>E?(l=k^e&(g^k),n=E):32>E?(l=g^k&(e^g),n=5*E+1&15):48>E?(l=e^g^k,n=3*E+5&15):(l=g^(e|~k),n=7*E&15),C=k,k=g,g=e,f=f+l+s[E]+d[n]&4294967295,l=q[E],e=e+((f<<l|f>>>32-l)&4294967295)&4294967295,f=C;a.qb[0]=a.qb[0]+
f&4294967295;a.qb[1]=a.qb[1]+e&4294967295;a.qb[2]=a.qb[2]+g&4294967295;a.qb[3]=a.qb[3]+k&4294967295}function k(a,b,d){d||(d=b[G]);Ka(a,a.total+d);for(var e=0;e<d;++e)a[lc][a.tj++]=b[e],64==a.tj&&(f(a,a[lc]),a.tj=0)}function l(a){var b=pa(16),d=8*a.total,e=a.tj;k(a,a.padding,56>e?56-e:64-(e-56));for(var g=56;64>g;++g)a[lc][g]=d&255,d>>>=8;f(a,a[lc]);for(g=e=0;4>g;++g)for(d=0;32>d;d+=8)b[e++]=a.qb[g]>>d&255;return b}var n=[0,0,0,0,0,0,0,0,0,0,0,0,0,63,0,0,53,54,55,56,57,58,59,60,61,62,0,0,0,0,0,0,0,
1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,0,0,0,0,64,0,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,0,0,0,0,0],q=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],s=[3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,
2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,
3174756917,718787259,3951481745];return{L:function(){return O.Il},W:function(){return 192},V:function(){return{jv:a,iv:b,kv:d}}}});zg.kr(O.ej,95,function(){function a(a,d){d=ff(hf(d));a=ff(af(a,!0));if(lf(d,a))return a+"<b>"+d[cc](a[G])+"</b>";for(var e="",g=[],f=d[G]-1,k=0,l=-1,n;n=d[Fb](k);++k)" "==n||"\t"==n?e[G]&&(g[B]({xq:e,Fh:l,Eh:k+1}),e="",l=-1):(e+=n,-1==l?l=k:k==f&&g[B]({xq:e,Fh:l,Eh:k+1}));e=a[hc](/\s+/);k={};for(f=0;l=e[f++];)k[l]=1;n=-1;for(var e=[],q=g[G]-1,f=0;l=g[f];++f)k[l.xq]?(l=-1==n,f==q?e[B]({Fh:l?f:n,Eh:f}):l&&(n=f)):-1<n&&(e[B]({Fh:n,Eh:f-1}),n=-1);if(!e[G])return"<b>"+d+"</b>";f="";for(k=l=0;n=e[k];++k)(q=
g[n.Fh].Fh)&&(f+="<b>"+d[Gd](l,q-1)+"</b> "),l=g[n.Eh].Eh,f+=d[Gd](q,l);l<d[G]&&(f+="<b>"+d[Gd](l)+"</b> ");return f}return{L:function(){return O.ej},W:function(){return 95},V:function(){return{bold:a}}}});zg[Xb](O.yq,12,function(){function a(a){a=b(a,x,d);a=b(a,y,e);return b(a,w,g)}function b(a,b,d){for(var e,f="",g=0;null!=(e=b[wb](a));)g<e.index&&(f+=a[Gd](g,e.index)),f+=d(e[0]),g=b.lastIndex;if(!f)return a;g<a[G]&&(f+=a[Gd](g));return f}function d(a){return va.fromCharCode(a[Cd](0)-65248)}function e(a){var b=a[Cd](0);return 1==a[G]?k[Fb](b-65377):65438==a[Cd](1)?l[Fb](b-65395):n[Fb](b-65418)}function g(a){var b=a[Cd](0);return 12443==a[Cd](1)?q[Fb](b-12454):s[Fb](b-12495)}function f(a){return eval('"\\u30'+
a[hc](",")[Nd]("\\u30")+'"')}var k=f("02,0C,0D,01,FB,F2,A1,A3,A5,A7,A9,E3,E5,E7,C3,FC,A2,A4,A6,A8,AA,AB,AD,AF,B1,B3,B5,B7,B9,BB,BD,BF,C1,C4,C6,C8,CA,CB,CC,CD,CE,CF,D2,D5,D8,DB,DE,DF,E0,E1,E2,E4,E6,E8,E9,EA,EB,EC,ED,EF,F3,9B,9C"),l=f("F4__,AC,AE,B0,B2,B4,B6,B8,BA,BC,BE,C0,C2,C5,C7,C9_____,D0,D3,D6,D9,DC"),n=f("D1,D4,D7,DA,DD"),q=f("F4____,AC_,AE_,B0_,B2_,B4_,B6_,B8_,BA_,BC_,BE_,C0_,C2__,C5_,C7_,C9______,D0__,D3__,D6__,D9__,DC"),s=f("D1__,D4__,D7__,DA__,DD"),x=/[\uFF01-\uFF5E]/g,y=RegExp("([\uff73\uff76-\uff84\uff8a-\uff8e]\uff9e)|([\uff8a-\uff8e]\uff9f)|([\uff61-\uff9f])",
"g"),F="(["+f("A6,AB,AD,AF,B1,B3,B5,B7,B9,BB,BD,BF,C1,C4,C6,C8,CF,D2,D5,D8,DB")+"]\u309b)|(["+f("CF,D2,D5,D8,DB")+"]\u309c)",w=new RegExp(F,"g");return{L:function(){return O.yq},W:function(){return 12},V:function(){return{tA:a}}}});var Gg=function(a,b,d,e,g){var f=gg?"-moz-":Bf?"-ms-":Af?"-o-":hg?"-webkit-":"",k=".gstl_"+e,l=new RegExp("(\\.("+g[Nd]("|")+")\\b)"),n=[];return{addRule:function(a,e){if(b){if(d){for(var f=a[hc](","),g=[],F=0,w;w=f[F++];)w=l[Qc](w)?w[r](l,k+"$1"):k+" "+w,g[B](w);a=g[Nd](",")}n[B](a,"{",e,"}")}},Qu:function(){if(b&&n[G]){b=!1;var d=zf("style");d[Nb]("type","text/css");(a||of())[p](d);var e=n[Nd]("");n=null;d[Tc]?d[Tc].cssText=e:d[p](h[Gb](e))}},prefix:function(a,b){var d=a+(b||"");f&&(d+=b?a+f+b:
f+a);return d}}};zg[Xb](O.Qg,10,function(){function a(a){var b=0;a&&(k||d(),e(),a in l?b=l[a]:(Kf(k,ff(a)),l[a]=b=k[Db],Kf(k,"")));return b}function b(){k||d();e();n||(Kf(k,"|"),n=k[Nc]);return n}function d(){k=Jf(g.ik);gb(k[u],"hidden");f[p](k)}function e(){var a=Ve();if(!s||s+3E3<a)s=a,a=Yf(k,"fontSize"),q&&a==q||(l={},n=null,q=a)}var g,f,k,l,n,q,s;return{hb:function(a){f=a.so()||h[vd]},sb:function(a){g=a},L:function(){return O.Qg},W:function(){return 10},V:function(){return{Ee:a,zd:b}}}});var Hg=function(a){var b;(function(){var d=function(){};a||(a={});var e=function(b){return a[b]||d};b={nl:e("a"),search:e("b"),pf:e("c"),$i:e("d"),Zi:e("e"),Ji:e("f"),Sk:e("g"),Tk:e("h"),Ok:e("i"),Jl:e("j"),Li:e("k"),ul:e("l"),Rk:e("m"),Cq:e("n"),Wk:e("o"),Xk:e("p"),Yi:e("q"),rl:e("r"),Aq:e("s"),Bq:e("t"),Qk:e("u"),Yk:e("w"),Lk:e("x"),Pk:e("y"),Nk:e("z"),Mk:e("aa"),Uk:e("ab"),zl:e("ac")}})();return{nl:function(){return b.nl()},search:function(a,e){b[v](a,e)},pf:function(a){b.pf(a)},$i:function(a){b.$i(a)},
Zi:function(a){return b.Zi(a)},Ji:function(a){b.Ji(a)},Sk:function(a){b.Sk(a)},Tk:function(a){b.Tk(a)},Ok:function(a){b.Ok(a)},Jl:function(a,e){b.Jl(a,e)},Li:function(a,e){b.Li(a,e)},ul:function(){b.ul()},Rk:function(a){b.Rk(a)},Cq:function(a){b.Cq(a)},Wk:function(){b.Wk()},Xk:function(){b.Xk()},Yi:function(a){b.Yi(a)},rl:function(a,e){b.rl(a,e)},Aq:function(a){b.Aq(a)},Bq:function(){b.Bq()},Qk:function(){b.Qk()},Pk:function(){b.Pk()},Yk:function(a){b.Yk(a)},Lk:function(){b.Lk()},Nk:function(){b.Nk()},
Mk:function(){b.Mk()},Uk:function(){b.Uk()},zl:function(a,e){return b.zl(a,e)}}};zg[Xb](O.fh,6,function(){function a(a,b,d,e){var f=a.ub(),k=a.Jb();N.Oo||g();b=s+x+y+"?"+(F?F+"&":"")+(b?b+"&":"");var n=cf;a=[];n("q",k,a,!0);N.Po||n("callback","google.sbox.p"+q,a);if(w){for(var k="",K=4+oa[Ab](32*oa[wc]()),ja=0,W;ja<K;++ja)W=.3>oa[wc]()?48+oa[Ab](10*oa[wc]()):(.5<oa[wc]()?65:97)+oa[Ab](26*oa[wc]()),k+=va.fromCharCode(W);n("gs_gbg",k,a)}n=zf("script");n.src=b+a[Nd]("&");n.charset="utf-8";z[f]=n;J=N.Oo?e:d;l[p](n);return!0}function b(){return 0}function d(){return 0}function e(a){var b=
z[a];b&&(l[xd](b),delete z[a])}function g(){for(var a in z)l[xd](z[a]);z={};J=null}function f(a){J&&J(a)}function k(a){a||(a=Ye);var b=window[qd];N.Po?b.ac.h=a:b.sbox["p"+q]=a}var l=of(),n,q,s,x,y,F,w,N,z={},J,K={ha:function(a){n=a.get(O.$e,K);q=a.Sh().ub()},da:function(a){N=a;0==a.sl&&(a=n.Nv(),s=a[xc],x=a[bc],y=a.tl,F=a.Ov,w="https:"==h[mc][xc],k(f),(new Image).src=s+x+"/generate_204")},L:function(){return O.fh},W:function(){return 6},V:function(){return{Au:a,zu:e,ki:Ye,Ep:b,Yo:d}},Bb:function(){k(null);
g()}};return K});zg[Xb](O.Rf,1,function(){function a(a){if(!l)return!0;for(var b=!1,d=!1,f=0,k;f<a[G];++f)if(k=a[Fb](f),!e[Qc](k)&&(g[Qc](k)?d=!0:b=!0,d&&b))return!0;return!1}function b(a,b,d){if(!l)return!0;var g=f[Qc](d),n=k[Qc](b);return"ltr"==a?g||n||e[Qc](d)||e[Qc](b):!g||!n}function d(a){var b=n;l&&(g[Qc](a)?b="ltr":e[Qc](a)||(b="rtl"));return b}var e=RegExp("^[\x00- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff]*$"),g=RegExp("^[\x00- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff]*(?:\\d[\x00- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff]*$|[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff])"),
f=RegExp("^[\x00- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff]*(?:\\d|[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff])"),k=RegExp("(?:\\d|[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufdfe-\ufe6f\ufefd-\uffff])[\x00- !-@[-`{-\u00bf\u00d7\u00f7\u02b9-\u02ff\u2000-\u2bff]*$"),l=g[Qc]("x"),n;return{hb:function(a){n=a.Ie()},L:function(){return O.Rf},W:function(){return 1},V:function(){return{Ht:a,
st:b,dk:d}}}});zg[Xb](O.rb,2,function(){function a(a,b,d,e,f){var g=s(a);g||(g={},w[B]({element:a,rw:g}));var k=g[b];k||(k=g[b]=[],g=a.pw?window:eg(a),g=q(b,g,k),We(b)?a[id]?a[id](b,g,!1):a["on"+b]=g:a[b]=g);k[B]({tw:!!f,Tl:!1,Zp:e||0,kf:d});k[Dd](y);d.qw=b}function b(a,b){var d=s(a);if(d&&(d=d[b.qw]))for(var e=0,f;f=d[e++];)if(f.kf==b){f.Tl=!0;break}}function d(b,d,e,f){a(N,b,d,e,f)}function e(a){b(N,a)}function g(a,b){var d=b||{},e=N[a];e&&e(d,d.dg)}function f(a,b,d){a[id]?a[id](b,d,!1):a[Ub]("on"+b,d)}function k(a,
b,d){a.removeEventListener?a.removeEventListener(b,d,!1):a.detachEvent("on"+b,d)}function l(a){if(F)z||(z=[],f(window,"message",n)),z[B](a),a=window[mc][zc],window.postMessage("sbox.df",/HTTPS?:\/\//i[Qc](a)?a:"*");else window[gc](a,0)}function n(a){z&&a&&a.source==window&&"sbox.df"==a.data&&z[G]&&(z[ub]()(),z&&z[G]&&window.postMessage("sbox.df",window[mc][zc]))}function q(a,b,d){return function(e,f){if(d[G]){var g;if(!(g=e)){g={};var k=b[Pd];k&&(k[Kb]&&(g.keyCode=k[Kb]),g.sw=!0)}g.dg=f||a;for(var k=
g,l,n,q=0,s;s=d[q++];)s.Tl?n=!0:l||(s.tw?x(s,k):l=s.kf(k));if(n)for(q=0;s=d[q];)s.Tl?d[Md](q,1):++q;if(g.Si)return delete g.Si,g.sw&&(g=b[Pd]||g),Sf(g),g.returnValue=!1}}}function s(a){for(var b=0,d;b<w[G];++b)if(d=w[b],d[I]==a)return d.rw;return null}function x(a,b){l(function(){a.kf(b)})}function y(a,b){return b.Zp-a.Zp}var F=window.postMessage&&!(Bf||ig||Af),w=[],N={pw:1},z;return{L:function(){return O.rb},W:function(){return 2},V:function(){return{xb:a,ql:b,Sb:d,dA:e,vb:g,cg:f,cA:k,defer:l}},
Bb:function(){z=null}}});zg[Xb](O.Vg,495,function(){function a(a){k[a.ub()]=!0}function b(a){var b=a.fd();a=b.ub();a in k&&(b=b.wl(),b=Ve()-b,n+=b,++l,delete k[a])}function d(){var a=0,b;for(b in k)a++;return a}function e(){return l}function g(){return n}function f(){k={};n=l=0}var k,l,n;return{da:function(){f()},L:function(){return O.Vg},W:function(){return 495},V:function(){return{Ju:a,tv:b,cv:d,dv:e,ev:g,reset:f}}}});zg[Xb](O.xd,375,function(){function a(a){g[a]=!0;f=a}function b(){var a=[],b;for(b in g)a[B](ta(b,10));return a}function d(){return f}function e(){g={};f=null}var g,f;return{da:function(){e()},L:function(){return O.xd},W:function(){return 375},V:function(){return{add:a,nv:b,gu:d,reset:e}}}});zg[Xb](O.Bd,9,function(){function a(a){var b=s.Dc(),d;d=[];d[27]=25;d[0]=e(z.rk);d[28]=e(z.sk);d[1]=void 0==a?"":a+"";d[26]=x.nv()[Nd]("j");a="";F.kl()?a="o":w.De()&&(a=w.bt()+"");d[2]=a;a="";var k=w.Eb();if(k){for(var C,Y=0,ja=0,W;W=k[ja++];){var ca=W;W=ca.L()+"";ca=ca.nf();ca[G]&&(W+="i"+ca[Nd]("i"));W!=C&&(1<Y&&(a+="l"+Y),a+=(C?"j":"")+W,Y=0,C=W);++Y}1<Y&&(a+="l"+Y)}d[3]=a;d[4]=g(s.ps());d[5]=g(s.qs());d[6]=J;d[7]=Ve()-K;d[18]=g(s.rs());d[8]=q.Rt();if(C=q.Lt())d[25]=C.Ut?"1"+(z.pt?"a":"")+(z.Wn?
"c":""):"",d[10]=C.Tt;d[11]=q.cl();d[12]=q.Ot();if(C=q.Nt())d[9]=C.Wt,d[22]=C.Vt,d[17]=C.Xt;d[13]=q.Qt();d[14]=q.Pt();d[15]=q.St();d[16]=q.Mt();d[30]=y.cv();d[31]=y.dv();d[32]=y.ev();d[19]=e(z.tk);C=(C=F.sd())?C.Aa().ob("e")?"1":"":"";d[20]=C;for(C=0;a=N[C++];)k=a.ge(),l[k]&&(d[k]=void 0==d[k]?e(a.lv()):"");d=d[Nd](".")[r](f,"");n&&L?(C=b+d,a=n.iv(L),C=n.kv(C,a),C=C[Xc](0,8),C=n.jv(C)):C="";return{oq:b,gs_l:d+"."+C}}function b(){K=Ve();++J;s.Ad();x[Dc]();q.Ad();for(var a=0,b;b=N[a++];)b[Dc]()}function d(a){L=
a}function e(a){return a?a[r](k,"-"):""}function g(a){return oa.max(a-K,0)}var f=/\.+$/,k=/\./g,l=Re(tg),n,q,s,x,y,F,w,N,z,J=-1,K,L,C={ha:function(a){n=a.get(O.Il,C);q=a.get(O.gc,C);s=a.get(O.Ta,C);x=a.get(O.xd,C);y=a.get(O.Vg,C);F=a.get(O.Cc,C);w=a.get(O.Nb,C);N=a.Ab(O.si,C);cg(a.Ab(O[bd],C))},sb:function(a){L=a.qt},da:function(a){z=a;b()},L:function(){return O.Bd},W:function(){return 9},V:function(){return{Aa:a,reset:b,Yt:d}}};return C});zg[Xb](O.ud,11,function(){function a(a,b){if(F){for(var d=!1,e=0,g;g=F[e++];)2==g.Sf(a,b)&&(d=!0);if(d)return}if(ef(a)||C.ce||n&&n.ce())pf(b)?L&&!K&&(K=Of(L,"btnI","1")):K&&(L[xd](K),K=null),k(b),J[v](a,b),f(),q.vb(14,{$h:a})}function b(a){k();J.pf(a);f()}function d(a){k();J.$i(a);f()}function e(a){k(1);J.Yi(a);f()}function g(a){return J.Zi(a)}function f(){s.Qj();s.fu();y[Dc]();N?N[Rb]():w[Rb]();x.Dc()!=x.cb()&&x.$s();z&&z[Rb]()}function k(a){l&&C.Gt&&l.mi(a)}var l,n,q,s,x,y,F,w,N,z,J,K,L,C,E={hb:function(a){L=
a.so()},ha:function(a){l=a.get(O.Mi,E);n=a.get(O.ze,E);q=a.get(O.rb,E);s=a.get(O.gc,E);x=a.get(O.Ta,E);y=a.get(O.Bd,E);w=a.get(O.Nb,E);N=a.get(O.Eo,E);z=a.get(O.Of,E);J=a.ye();F=a.Ab(O.Do,E)},da:function(a){C=a},L:function(){return O.ud},W:function(){return 11},V:function(){return{search:a,pf:b,$i:d,Yi:e,Zi:g}}};return E});zg[Xb](O.Re,14,function(){function a(a){return(a[g.mj]||{}).j}function b(a){return a[g.Xp]}function d(a,b){var d=a[g.Xp],s=a[g.nw];b||(b=Bg(d,df(d[G])));var N={},z=a[g.mj];if(z)for(var J in z){var K=z[J];J in q&&(K=q[J][od](K));N[J]=K}var z=b,L=!1,C=!1;J=!1;for(var K=0,E;E=s[K++];)if(33==(E[f.Yp]||0)?C=!0:L=!0,C&&L){J=!0;break}L=0;C=[];for(K=0;E=s[K++];){var Z=E[f.Yp]||0;if(k[Z]&&(!J||33!=Z)){var ea;ea=E[f.mw];n&&(ea=l.bold(d[Od](),jf(gf(ea))));C[B](Eg(ea,jf(gf(ea)),L++,Z,E[f.lw]||[],e(E)))}}return Dg(z,
C,Fg(N),!1,!0,!1)}function e(a){return(a=a[f.mj])?Fg(a):Cg}var g=sg,f=og,k,l,n,q={},s={ha:function(a){l=a.get(O.ej,s);if(a=a.Ab(O.yl,s))for(var b=0,d;d=a[b++];)q[d.aA()]=d},da:function(a){k=a.Xf;n=a.Gk},L:function(){return O.Re},W:function(){return 14},V:function(){return{yu:a,bA:b,Ak:d}}};return s});zg[Xb](O.xi,15,function(){function a(a){var d=b(a);if(d){if(k)for(var g=0,s;s=k[g++];)a=s.uv(a);l.vv(a);g=a;s=g.fd().Jb();var N=g.Eb();if(n[vc]())if(N[G]){var z=0==g.L();n.Yj(s,N,z)&&f.tv(g)}else n[Rb]();e.vb(3,{input:s,Zs:N})}q.Jl(a,d);return d}function b(a){var b=g.cb(),d=l.sd(),b=b[Od](),e=a.Jb()[Od]();b==e?d=!0:(b=af(b),a=(e=a.fd())?e.ke():af(a.Jb()[Od]()),d=d?d.fd().ke():"",d=0==b[dd](a)?0==b[dd](d)?a[G]>=d[G]:!0:!1);return d}function d(a,b){return a.kb()-b.kb()}var e,g,f,k,l,n,q,s={ha:function(a){e=
a.get(O.rb,s);g=a.get(O.Ta,s);f=a.get(O.Vg,s);k=a.Ab(O.vi,s);l=a.get(O.Cc,s);n=a.get(O.Nb,s);q=a.ye();k[Dd](d)},L:function(){return O.xi},W:function(){return 15},V:function(){return{kf:a,li:b}}};return s});zg[Xb](O.gc,13,function(){function a(a,b){if(!(!La||Ra||ja&&ja.nz())){a.Ui("ds",eb.wn);a.Ui("pq",pb);a.uu();var d=!0,e=a.So();e>fa&&(fa=e);++P;na.Ju(a);var e=Ve(),f;for(f in bb){var g=bb[f].wl();2500<e-g&&E(f)}Ia&&(f=Y.get(a))&&((d=ia||a.wu())&&eb.Ws&&a.vu(),ya.kf(f),f.ol()&&++ma,aa=null);d&&(aa=a,S&&!b||C())}}function b(){return 10<=qb||3<=W.Yo()?!0:!1}function d(){Ma=fa}function e(){return fa<=Ma}function g(){aa=null}function f(){return P}function k(){return{Ut:Ia,Tt:Ia?Y.su():0}}function l(){return Ia?
Y.cl():0}function n(){return ma}function q(){return{Wt:rb,Vt:fb,Xt:Bb}}function s(){return Yb}function x(){return sb}function y(a){a=Ha.Ak(a);return ya.li(a)}function F(){return hb}function w(){for(var a=[],b=0,d,e=0;e<=U;++e)d=kb[e],0==d?b++:(b=1==b?"0j":1<b?e+"-":"",a[B](b+d),b=0);return a[Nd]("j")}function N(){Ia&&Y.qu()}function z(a){Ia&&Y.ru(a)}function J(){Ia&&Y.Ad();hb=sb=Yb=Bb=fb=rb=ma=qb=P=0;kb=[];for(var a=0;a<=U;++a)kb[a]=0}function K(a){pb=a}function L(a){return function(b){Z(b,a)}}function C(){null!=
S&&(nf(S),S=null);if(!(2<W.Yo())&&aa){var a=[],b=aa.Aa();if(b)for(var d in b)cf(d,b[d],a);T.ul();a=W.Au(aa,a[Nd]("&"),L(aa),Z);aa.Vo()||(++rb,a?(a=aa,bb[a.ub()]=a,++qb):++fb);aa=null;a=100;b=(qb-2)/2;for(d=1;d++<=b;)a*=2;a<Ja&&(a=Ja);S=window[gc](C,a)}}function E(a){W.zu(a);delete bb[a];qb&&--qb}function Z(a,b){if(La){if(!b){var d=Ha.yu(a);b=bb[d];if(!b)return}if(!b.Vo()){d=Ha.Ak(a,b);if(Va)var e=ca.cb(),d=Va.pz(d,e);Ia&&Y.put(d);b.So()<=Ma||(++Bb,ya.kf(d)||++Yb,e=b,Ja=d.Aa().Fo("d"),e&&(E(e.ub()),
e=e.wl(),e=Ve()-e,hb+=e,sb=oa.max(e,sb),++kb[e>la?U:ea[oa[Ab](e/100)]]));d&&(d=d.Aa().ob("q"))&&sa.Yt(d)}}}var ea=[0,1,2,3,4,5,5,6,6,6,7,7,7,7,7,8,8,8,8,8],U=ea[ea[G]-1]+1,la=100*ea[G]-1,Y,ja,W,ca,sa,na,Ha,ya,Va,Ea,T,La=!1,aa,fa=-1,bb,P,qb,ma,rb,fb,Bb,Yb,sb,hb,kb,Ja,S,ia,Ra,Ma,Ia,eb,pb,Wa={ha:function(a){Y=a.get(O.Ci,Wa);ja=a.get(O.ze,Wa);a.get(O.rb,Wa);ca=a.get(O.Ta,Wa);sa=a.get(O.Bd,Wa);na=a.get(O.Vg,Wa);Ha=a.get(O.Re,Wa);ya=a.get(O.xi,Wa);Va=a.get(O.Xu,Wa);a.get(O.Cc,Wa);Ea=a.get(O.$e,Wa);a.get(O.Nb,
Wa);T=a.ye()},da:function(a){W=Ea.tu();eb=a;La=!0;bb={};Ja=0;ia=a.Vs;Ra=a.oi;Ma=-1;Ia=eb.Us&&!!Y;pb=a.Xs},L:function(){return O.gc},W:function(){return 13},V:function(){return{$m:a,kl:b,Qj:d,An:e,fu:g,Rt:f,Lt:k,cl:l,Ot:n,Nt:q,Qt:s,Pt:x,li:y,St:F,Mt:w,ki:N,oz:z,Ad:J,Bn:K}},Bb:function(){La=!1;null!=S&&(nf(S),S=null);bb=aa=null;d()}};return Wa});zg[Xb](O.Cc,5,function(){function a(){return g.kl()}function b(a){f=a}function d(){return f}function e(){f=null}var g,f,k={ha:function(a){g=a.get(O.gc,k)},da:function(){f=null},L:function(){return O.Cc},W:function(){return 5},V:function(){return{kl:a,vv:b,sd:d,sA:e}}};return k});zg[Xb](O.$e,16,function(){function a(){return g}function b(){return f}function d(){g&&g.ki()}var e={},g,f,k={ha:function(a){a=a.Ab(O.fh,k);for(var b=0,d;d=a[b++];)e[d.Ep()]=d},da:function(a){var b="https:"==h[mc][xc],d=cf,k=[];d("client",a.rk,k);d("hl",a.Fe,k);d("gl",a.Cu,k);d("sugexp",a.tk,k);d("gs_rn",25,k);d("gs_ri",a.sk,k);a.Zo&&d("authuser",a.Zo,k);f={protocol:"https"+(b?"s":"")+"://",host:a.Bu||"clients1."+a.Lo,tl:a.tl||"/complete/search",Ov:k[G]?k[Nd]("&"):""};g&&g.Ep()==a.sl||(g=e[a.sl])},
L:function(){return O.$e},W:function(){return 16},V:function(e){return{tu:e==O.gc?a:Ye,Nv:b,$z:d}}};return k});zg[Xb](O.yd,7,function(){function a(a){n.ri(a)}function b(){return q}function d(a){if(a in s){if(x){if(a==x.Ek())return;f();x.Un()}x=s[a];n.qi(x)}}function e(){return q?n.zd():0}function g(){q||(n.show(k()),q=!0)}function f(){q&&(n.Pg(),q=!1)}function k(){var a=tf(l);x.Tn(a);return a}var l={mv:!1,uk:"left",Qo:!0,Oe:null,marginWidth:0},n,q,s={},x,y={ha:function(a){n=a.get(O.Wg,y);if(a=a.Ab(O.ei,y))for(var b=0,d;d=a[b++];)s[d.Ek()]=d},da:function(){q=!1},L:function(){return O.yd},W:function(){return 7},
V:function(){return{Jf:b,qi:d,zd:e,show:g,Pg:f,ri:a}},Bb:function(){f()}};return y});zg[Xb](O.Ta,3,function(){function a(){var a={};Ia.vb(13,a);!a.cancel&&Zb.Oj&&Ia.defer(ka.Sj);$b.Pk()}function b(){Ia.vb(12);$b.Qk()}function d(){fb("rtl")}function e(){fb("ltr")}function g(){ka.Tr()}function f(a){ka.td()?ka.Sr():ka.Ph(a)}function k(){if(0==Zb.Zh)return!1;if(4==Zb.Zh)return $b.Uk(),!1;var a=Bb();if(a)switch(Zb.Zh){case 1:if(Yb(a,!0))return pb.add(S.eg),!0;break;case 3:return ka.Lf(a)}return!1}function l(){Zb.Qr?bb(5):(ka.Jf()?ka.Sj():N(),Z())}function n(a){Za&&a.oo()==Za[G]&&(Jc&&
Jc[Rb](),Zb.Pr&&bb(2),$b.Ok(Za))}function q(a){Ra&&0==a.ci()&&Ra.Dt()}function s(a,b,d,e){Zb.Nr&&!a&&ka.Wm(!0);Zb.Mr&&!ka.Jf()&&"mousedown"==d&&ka.Ph(b);var f;re&&re.Ts(a,b,d)?f=re:re=f=Bg(a,b,d);var g=b=!1;if(a!=Za||"onremovechip"==d)lf(d,"key")?pb.add(S.At):"paste"==d&&pb.add(S.Bt),b=!0,kb(a),Ia.vb(1,{dg:d,Oe:Lc}),$b.Ji(a),g=Ve(),xf||(xf=g),Vf=g,ef(a)&&(e=!0),g=!0;a=Ja.DONT_CARE;var k=f.en(),l=xb.sd();if(Pb)for(var n=0,q;q=Pb[n++];)q=q.Sf(k,l),q>a&&(a=q);switch(a){case Ja.yt:e=!0;break;case Ja.to:e=
!1}e?(b&&ka.Ur(),yf&&f.setParameter("gs_is",1),$b.Rk(yf),eb.$m(f),re=null):g&&(ka[Rb](),eb.Qj());Ia.vb(2,{dg:d})}function x(a){(yf=a)&&pb.add(S.zt)}function y(a){Wf!=a&&((Wf=a)?$b.Nk():$b.Mk())}function F(a){sb(a)}function w(){ia[Jb]()}function N(){ia.blur()}function z(){return ia.Rh()}function J(a,b,d){lf(a,Za,!0)&&(a=Za+a[cc](Za[G]));d=d||df(a[G]);s(a,d,"",b);sb(a,!0)}function K(a){J(a,!0);Xf=Ve();pb.add(S.Ct)}function L(){s(Za,W(),"onremovechip")}function C(a){kb(a);ia[Tb]();Ia.vb(4,{Oe:Lc,input:a})}
function E(){ia[Mb]()}function Z(){Za!=Mc&&kb(Mc);Ia.vb(5,{input:Mc,Zs:ka.Eb(),Oe:Lc});ia[Tb]();$b.Tk(Mc)}function ea(){Mc=Za}function U(){return ia.pn()}function la(){return Mc}function Y(){return Za}function ja(){return Lc}function W(){return ia.Mf()}function ca(){return ia.ck()}function sa(){return ia.zd()}function na(){return ia.Ee()}function Ha(){return ia.qn()}function ya(){return xf}function Va(){return Vf}function Ea(){return Xf}function T(){return 0!=fh}function La(){if(qe){if(Zb.Wj)return!0;
for(var a=0,b;b=Kc[a++];)if(b[vc]())return!0}return!1}function aa(a){if(a==Za)return!0;var b=Za[G];return a[cc](0,b)==Za?Ma.st(Lc,Za,a[cc](b)):!1}function fa(){ia.Zj()}function bb(a){Wa[v](Za,a)}function P(a){Za&&(kb(""),ia[Rb](),Ia.vb(1),ka[Rb](),$b.Ji(Za));a&&$b.Lk()}function qb(){Xf=Vf=xf=0}function ma(a){ia.ni(a)}function rb(){var a=Bb();a&&Yb(a)}function fb(a){var b=W().ci();Lc==a?ka.td()&&b==Za[G]&&(ka.De()?Zb.Rj&&(a=ka.Ce(),Wa[v](a.pb(),6)):Zb.Or&&k()):Ra&&0==b&&Ra.Dt()}function Bb(){if(ka.td()){var a=
ka.De()?ka.Ce():ka.Pj();if(a.ii())return a}return null}function Yb(a,b){var d=a.pb();return mf(Mc,d)?!1:(ea(),b?J(d,!0):C(d),!0)}function sb(a,b){Za=a||"";hb();ia[Tb]();b||(Ia.vb(4,{Oe:Lc,input:Za}),$b.Sk(Za))}function hb(){var a=Ma.dk(Za);a!=Lc&&(ia.$j(a),Lc=a)}function kb(a){Za=Mc=a||"";hb()}var Ja=rg,S=qg,ia,Ra,Ma,Ia,eb,pb,Wa,Pb,xb,ka,Jc,qe,Kc,$b,Mc,Za,Lc,fh,xf,Vf,Xf,yf,Wf,re,Zb,Qb={ha:function(a){ia=a.get(O.Ge,Qb);Ra=a.get(O.ze,Qb);Ma=a.get(O.Rf,Qb);Ia=a.get(O.rb,Qb);eb=a.get(O.gc,Qb);pb=a.get(O.xd,
Qb);Wa=a.get(O.ud,Qb);Pb=a.Ab(O.Wc,Qb);xb=a.get(O.Cc,Qb);ka=a.get(O.Nb,Qb);Jc=a.get(O.Of,Qb);qe=a.get(O.Ke,Qb);Kc=a.Ab(O.Pe,Qb);$b=a.ye();fh=a.Sh().Vj()},sb:function(a){Zb=a;Pb[Dd](rf);Za=Mc=ia.Yr()||""},da:function(a){Zb=a;Wf=yf=!1;hb()},L:function(){return O.Ta},W:function(){return 3},V:function(){return{rn:a,ds:b,fs:d,gs:e,hs:g,bs:f,Lf:k,cs:l,$r:n,Zr:q,es:s,ks:x,sn:y,Yh:F,ls:w,pk:N,bo:z,hn:J,$y:K,bz:L,Sc:C,gn:E,Rr:Z,$s:ea,pn:U,Dc:la,cb:Y,dk:ja,Mf:W,ck:ca,zd:sa,Ee:na,qn:Ha,ps:ya,qs:Va,rs:Ea,js:T,
ok:La,cz:aa,Zj:fa,search:bb,clear:P,Ad:qb,ni:ma,fn:rb}}};return Qb});zg[Xb](O.Nb,17,function(){function a(a){a.Oe=Pb;a.marginWidth=Wa;var b=xb.dn;b||(b="rtl"==Pb?"right":"left");a.uk=b}function b(a,b,e){var f=!1;a=sb&&sb.hz(b);Z();(Ja=b)&&b[G]&&(f=b[0].pb(),bb.Ht(f)&&(f=ma.Dc()),Pb=bb.dk(f),e?(Ra=aa.Jt,f=fa.Es(b,Pb),b=b[0].Aa().ob("a"),b=gf(b),Wa=rb.Ee(b)):(Ra=aa.zo,f=fa.ka(ya(),Pb),Wa=0),a&&(ia=sb.gz(),d(sb.ez())),f?C():Z());return f}function d(a){La();if(S!=a){var b=S;S=a;T(b)}}function e(){if(J())if(Ma){var a=S;S==Ja[G]-1?ia=S=null:null==S?S=0:++S;ia=S;Ea(a,e)}else C()}
function g(){if(J())if(Ma){var a=S;Ja&&0!=S?null==S?S=Ja[G]-1:--S:ia=S=null;ia=S;Ea(a,g)}else C()}function f(a){var b=a?4:3;if(K())a=N(),fa.bi(a)||ma[v](b),b=ma.Dc(),kb.Li(b,a);else ma[v](b)}function k(a){return fa.Lf(a)}function l(a){ia=S=a;a=Ja[a];var b=ma.Dc();kb.Li(b,a)}function n(){return Ma}function q(){return Ia}function s(a){Ia&&!a&&Z();Ia=a}function x(){return Ra}function y(){return Ja}function F(){return J()?Ja[0]:null}function w(){return S}function N(){return K()?Ja[ia]:null}function z(){return ia}
function J(){return!(!Ja||!Ja[G])}function K(){return null!=ia}function L(){Ma&&!eb&&(eb=window[gc](Z,xb.Xr))}function C(){Ma||(P.qi(17),P.show(),Ma=!0,kb.Wk())}function E(){Ma&&(eb&&(nf(eb),eb=null),P.Pg(),Ma=!1,kb.Xk())}function Z(){E();Ja=null;Ra=aa.EMPTY;null!=S&&fa.zi(S);ia=S=null;fa[Rb]()}function ea(){qb.Qj();E()}function U(){null!=S&&fa.zi(S);ia=S=null}function la(){La();pb=window[gc](U,0)}function Y(){La()}function ja(a){if(J())C();else{var b=ma.Dc();if(b){a=a||ma.Mf();b=Bg(b,a);if(Bb){a=
b.en();for(var d=Yb.sd(),e=0,f;f=Bb[e++];)f.Sf(a,d)}qb.$m(b)}}}function W(){return fa.Pa()}function ca(){return fa.fi()}function sa(){Ma=!1}function na(){fa.$f()}function Ha(){return 17}function ya(){if(J()&&Ra==aa.zo){for(var a=[],b=[],d=0,e;(e=fb[d++])&&!e.xo(ma.Dc(),Ja,b););(d=b?b[G]:0)&&(d-=Va(b,a,0));for(e=0;e<Ja[G];++e)a[B](Ja[e]);d&&(d-=Va(b,a,1));xb.Wr&&a[B](1);d&&Va(b,a,2);xb.cn&&a[B](2);hb&&hb.It(a);return a}return null}function Va(a,b,d){for(var e=0,f=0,g;f<a[G];++f)(g=a[f])&&g.position==
d&&(b[B](g),++e);return e}function Ea(a,b){if(null==S||fa.cf(S))if(T(a),null==S)ma.Rr();else{var d=fa.yi(Ja[S]);ma.Yh(d);kb.Yk(d)}else fa.zi(a),b()}function T(a){La();null!=a&&fa.zi(a);null!=S&&fa.Ds(S)}function La(){pb&&(nf(pb),pb=null)}var aa=pg,fa,bb,P,qb,ma,rb,fb,Bb,Yb,sb,hb,kb,Ja,S,ia,Ra,Ma,Ia,eb,pb,Wa,Pb,xb,ka={ha:function(a){fa=a.get(O.Zf,ka);bb=a.get(O.Rf,ka);P=a.get(O.yd,ka);qb=a.get(O.gc,ka);ma=a.get(O.Ta,ka);rb=a.get(O.Qg,ka);fb=a.Ab(O.fe,ka);Bb=a.Ab(O.Wc,ka);Yb=a.get(O.Cc,ka);sb=a.get(O.Kt,
ka);hb=a.get(O.ll,ka);kb=a.ye()},sb:function(){Bb[Dd](rf);fb[Dd](sf)},da:function(a){xb=a;ia=S=null;Ra=aa.EMPTY;Ma=!1;Ia=!0;Pb="";Wa=0},L:function(){return O.Nb},W:function(){return 17},V:function(){return{Yj:b,Hs:d,Sr:e,Tr:g,bi:f,Lf:k,Cs:l,Jf:n,isEnabled:q,Wm:s,Vr:x,Eb:y,Pj:F,fz:w,Ce:N,bt:z,td:J,De:K,Ur:L,show:C,Pg:E,clear:Z,Sj:ea,Fs:U,Gs:la,dz:Y,Ph:ja}},bg:function(){var b={Tn:a,Pa:W,fi:ca,Un:sa,$f:na,Ek:Ha};return[{hb:Ye,ha:Ye,sb:Ye,da:Ye,L:function(){return O.ei},W:function(){return 17},V:function(){return b},
bg:Ye,Bb:Ye}]},Bb:function(){eb&&(nf(eb),eb=null);Ja=null;E()}};return ka});zg[Xb](O.Wg,8,function(){function a(a){a!=E&&(E=a,a=a.Pa(),Z?a!=Z&&L[Rc](a,Z):L[p](a),Z=a)}function b(){C||(C=L?oa.max(L[Nc],0):0);return C}function d(a){m(L,a.mv?"gssb_e gsdd_a":"gssb_e");var b=a.Oe||ja;N!=b&&(N=b,Nf(w,b));b=a.marginWidth;if(K!=b){var d=J[u];b?(z[sc]()||z[p](J),Aa(d,b+"px"),gg&&(d.paddingLeft="1px")):(z[sc]()&&z[xd](J),d.paddingLeft="");K=b}ca=a.Qo;sa=a.uk;n(ea,!0);n(Y,!0);x.vb(16);g()}function e(){C=0;n(ea,!1);n(Y,!1);var a=ja;N!=a&&(N=a,Nf(w,a));x.vb(11)}function g(){C=0;k();if(Y){var a=
y.Et[0],d=Y[u];"relative"!=y.Sg&&(d.top=w[u].top,$a(d,w.offsetLeft+z[Db]+"px"));a=b()+a;Qa(Y[u],oa.max(a,0)+"px");l(Y,L[Db])}E&&E.$f()}function f(a){if(U)la!=a&&U[Rc](a,la);else{var b=w[ed](-1);Qa(b[u],"0");b[nd](-1);U=b[nd](-1);q.Jf()||(n(L,!1),n(w,!0),g());ea=L;U[p](a)}la=a}function k(){var a,b,d;a=(b=E&&E.fi())?b[Db]:s.Ee();(d=W)?We(d)&&(d=null):K||!ca?(Aa(L[u],""),Aa(w[u],"")):(Aa(L[u],"100%"),d=a+y.df[2],l(w,d));if("relative"!=y.Sg){var e=s.ck();b&&(e.ne=Ef(b).ne);b=y.df;var f=b[1];b=b[0];b=
e.Kl+s.zd()+b;"right"==sa?(d=eg(w),a=$f(d)-(e.ne-f+a),d=void 0):(e=e.ne+f,"center"==sa&&d&&(e+=(a-d)/2),d=e,a=void 0);f={ne:0,Kl:0};"absolute"==y.Sg&&y.Yg&&y.Yg!=h[vd]&&(f=Ef(y.Yg));e=w[u];e.top=b-f.Kl+"px";$a(e,e.right="");void 0!=d?$a(e,d-f.ne+"px"):e.right=a+f.ne+"px"}vf&&(e.zoom="normal",e.zoom=1)}function l(a,b){Xe(b)?0<b&&Aa(a[u],b+"px"):Aa(a[u],b)}function n(a,b){a&&Pa(a[u],b?"":"none")}var q,s,x,y,F,w,N,z,J,K,L,C,E,Z,ea,U,la,Y,ja,W,ca=!0,sa,na={hb:function(a,b){ja=a.Ie();b[A](".gssb_c","border:0;position:absolute;z-index:989");
b[A](".gssb_e","border:1px solid #ccc;border-top-color:#d9d9d9;"+b.prefix("box-shadow:0 2px 4px rgba(0,0,0,0.2);")+"cursor:default");b[A](".gssb_f","visibility:hidden;white-space:nowrap");b[A](".gssb_k","border:0;display:block;position:absolute;top:0;z-index:988");b[A](".gsdd_a","border:none!important")},ha:function(a){q=a.get(O.yd,na);s=a.get(O.Ta,na);x=a.get(O.rb,na);F=a.Sh().ub()},sb:function(a){y=a;w=Hf();m(w,"gstl_"+F+" gssb_c");n(w,!1);ea=w;var b=w[ed](-1);z=b[nd](-1);m(z,"gssb_f");J=If();L=
b[nd](-1);m(L,"gssb_e");Aa(L[u],"100%");y.Ft&&(Y=zf("iframe","gstl_"+F+" gssb_k"),n(Y,!1),(y.Yg||h[vd])[p](Y));if(W=y.Vn)Xe(W)&&(W+=y.df[2]),l(w,W);k();(a.Yg||h[vd])[p](w);x.Sb(8,g)},da:function(a){y=a;w[u].position=a.Sg},L:function(){return O.Wg},W:function(){return 8},V:function(){return{qi:a,zd:b,ri:f,show:d,Pg:e,$f:g}}};return na});zg[Xb](O.Ge,4,function(){function a(a,b){Bb&&(Bb=!1,aa.ql(P,Y),aa.ql(P,ja));b||(b=a);P[Jd][Rc](a,P);b[p](P);fb&&rb.As&&(Bf||gg?aa.defer(function(){P[Jb]();Cf(P,hb.ci())}):P[Jb]());W()}function b(){return Ra}function d(a){var b="rtl"==a==("rtl"==Pb);P.dir=a;if(Ma){fa.$j(a);var d=S[Jd];d[xd](Ma);b?Tf(Ma,S):d[Hb](Ma,S)}Ra&&(Ra.dir=a,d=Ra[Jd],d[xd](Ra),b?d[Hb](Ra,S):Tf(Ra,S));0!=qb&&(a=Mf(a),Lf(P,a,0))}function e(){return hb}function g(){return Ef(ia)}function f(){var a=ia?ia[Nc]:0;ka>a&&(a=ka);return a}
function k(){return Jc?Jc:ia?ia[Db]:0}function l(){var a=P[Db];rb.bn&&(a-=P[Nc]);return a}function n(){return P[cd]}function q(a){(rb.mn?P:S||qe||P)[u].background=a||"transparent"}function s(){Ja=!0}function x(){P[Mb]();ya()}function y(){jg&&Ya(P,"");Ya(P,T.cb());jg&&Ya(P,P[cd]);K()}function F(){if(!fb)try{P[Jb](),fb=!0,K()}catch(a){}}function w(){fb&&(P.blur(),fb=!1)}function N(){return fb}function z(){Ya(P,"")}function J(){var b=xb.get("gs_id");if(b)Ra=xb.get("gs_ttc"),S=xb.get("gs_tti"),T.ok()&&
fa&&(Ia=fa.Pa(),Ma=Ia[Jd]);else{b=Hf();b.id=xb.ub("gs_id");m(b,"gstl_"+ma+" "+(rb.Xj||P[rd]));var d=b[ed](-1),e=b[u],f=P[u];Aa(e,Jc?Jc+"px":f[zb]);Qa(e,ka?ka+"px":f[Hc]);Ba(e,"0");ag(P);m(P,rb.ik);Wa&&(Ra=d[nd](-1),Ra.id=xb.ub("gs_ttc"),Ra[u].whiteSpace="nowrap");S=d[nd](-1);S.id=xb.ub("gs_tti");m(S,"gsib_a");T.ok()&&fa&&(Ia=fa.Pa(),Ma=d[nd](-1),m(Ma,"gsib_b"),Ma[p](Ia));a(b,S)}kg&&hg&&(Qa(P[u],"1.25em"),P[u].marginTop="-0.0625em");L(b);ia=b}function K(){if(fb){var a=P[cd][G];hb=df(a);Cf(P,a)}}function L(a){aa.xb(a,
"mouseup",function(){P[Jb]()})}function C(){aa.xb(P,"keydown",Z);(Af||rb.ts)&&aa.xb(P,"keypress",U);aa.xb(P,"select",ya,10);var a=!1,b=function(b){aa.xb(P,b,la,10,a)};b("mousedown");b("keyup");b("keypress");a=!0;b("mouseup");b("keydown");b("focus");b("blur");b("cut");b("paste");b("input");aa.xb(P,"compositionstart",E);aa.xb(P,"compositionend",E)}function E(a){a=a[jd];"compositionstart"==a?T.sn(!0):"compositionend"==a&&T.sn(!1)}function Z(a){var b=a[Kb];kb=b;var d=(hg||gg)&&Gf(b)&&La.td(),e=b==Ea.Mo,
f=b==Ea.Qi;eb=!1;b==Ea.eg&&(eb=T.Lf());e&&((b=La.Ce())&&ea(b)?La.bi(a[Id]):aa.defer(function(){La.bi(a[Id])}));if(d||e||f||eb)a.Si=!0}function ea(a){return(a=bb[a.L()].iz)&&a()}function U(a){var b=a[Kb],d=b==Ea.Qi,e=b==Ea.eg&&eb;if(b==Ea.Mo||d||e)a.Si=!0}function la(a){if(!pb){var b=a.dg;if(!(b[dd]("key")||a.ctrlKey||a.altKey||a[Id]||a.metaKey))t:if(a=a[Kb],"keypress"!=b){var d=Gf(a),e;if("keydown"==b){if(T.ks(229==a),d)break t}else if(e=a!=kb,kb=-1,!d||e)break t;switch(a){case Ea.Qi:T.cs();break;
case Ea.mu:T.fs();break;case Ea.nu:T.gs();break;case Ea.Co:T.hs();break;case Ea.Bo:T.bs(hb);break;case Ea.pu:T.$r(hb);break;case Ea.ou:T.Zr(hb)}}ya();T.es(P[cd],hb,b)}}function Y(){fb=!0;T.ds()}function ja(){fb=!1;T.rn()}function W(){Bb||(Bb=!0,aa.xb(P,"focus",Y,99),aa.xb(P,"blur",ja,99))}function ca(){sb||(sb=window.setInterval(na,rb.zs||50))}function sa(){sb&&(nf(sb),sb=null)}function na(){la({dg:"polling"})}function Ha(){gg&&Qf(P)}function ya(){if(fb){var a=Df(P);a&&(hb=a)}}function Va(){var a;
aa.cg(window,"pagehide",function(){pb=!0;a=P[cd]});aa.cg(window,"pageshow",function(b){pb=!1;b.persisted&&T.Sc(a)})}var Ea=yg,T,La,aa,fa,bb,P,qb,ma,rb,fb,Bb=!1,Yb,sb,hb=df(0),kb=-1,Ja=!1,S,ia,Ra,Ma,Ia,eb,pb,Wa,Pb,xb,ka,Jc,qe,Kc={hb:function(a,b){xb=a;P=a.jk();Pb=a.Ie();a.Xh()||(b[A](".gsib_a","width:100%;padding:4px 6px 0"),b[A](".gsib_a,.gsib_b","vertical-align:top"))},ha:function(a){T=a.get(O.Ta,Kc);aa=a.get(O.rb,Kc);La=a.get(O.Nb,Kc);fa=a.get(O.Ke,Kc);bb=cg(a.Ab(O[bd],Kc));a=a.Sh();qb=a.Vj();ma=
a.ub()},sb:function(a){rb=a;ka=a.kn;Jc=a.xs;fb=Ff(P);ya();Bf&&aa.xb(P,"beforedeactivate",function(a){Ja&&(Ja=!1,a.Si=!0)},10);gg&&Va();ia=P;Wa=!!a.Je[O.ze];(T.js()||T.ok()||Wa||a.vs)&&J();a.us&&(aa.xb(P,"blur",sa,10),aa.xb(P,"focus",ca,10),Yb=!0);aa.Sb(8,Ha);C();W()},da:function(a){rb=a;var b=a.ws;b&&(qe=xb.Th(b));P[Nb]("autocomplete","off");P[Nb]("spellcheck",a.spellcheck);P[u].outline=a.ys?"":"none";Yb&&ca()},L:function(){return O.Ge},W:function(){return 4},V:function(){return{jz:a,pn:b,$j:d,Mf:e,
ck:g,zd:f,Ee:k,qn:l,Yr:n,ni:q,Zj:s,select:x,refresh:y,focus:F,blur:w,Rh:N,clear:z}},Bb:function(){Yb&&sa();rb.Oj&&aa.ql(P,T.rn)}};return Kc});zg[Xb](O.Zf,18,function(){function a(a,b){if(!ya)return!1;na=b;J();for(var d=!1,e=0,f;f=a[e++];)y(f)&&(d=!0);return d}function b(a){var b=E[a.L()];return b&&b.Hu?b.Hu(a):!1}function d(a){return E[a.L()].hh(null,a,Z)}function e(a){var b=E[a.L()];if(b&&b.yi){var d=C.Dc();return b.yi(a,d)}return a.pb()}function g(a,b){if(!ya)return!1;na=b;J();for(var d=!1,e=0,f;f=a[e++];)if(1==f)if(Ea)Va[p](Ea);else{f=w();var g=f[u];g.textAlign="center";g.whiteSpace="nowrap";f.dir=Ha;g=If();g[u].position="relative";
T=If();m(T,"gssb_g");U.cn&&(T[u].paddingBottom="1px");F(U.Rs,T,13);U.Ns?F(U.Dk,T,8):U.Os&&F(U.Ss,T,14);g[p](T);f[p](g);Ea=f[Jd]}else if(2==f)if(La)Va[p](La);else f=w(),g=f[u],Ba(g,"1px 4px 2px 0"),g.fontSize="11px",g.textAlign="right",g=zf("a"),g.id="gssb_b",Oa(g,"https://www.google.com/support/websearch/bin/answer.py?hl="+U.Fe+"&answer=106230"),Xa(g,U.Qs),f[p](g),La=f[Jd];else if(3==f)if(f=W.pop())Va[p](f);else f=ya[ed](-1),f.Iu=!0,f=f[nd](-1),g=zf("div","gssb_l"),f[p](g);else y(f)&&(d=!0);return d}
function f(a){N(a,aa);var b=K.Eb();b&&L.vb(9,{index:a,lz:b[a],mz:ca[a]})}function k(a){N(a,"");L.vb(10)}function l(){for(var a,b,d;d=Y.pop();)a=d.L(),(b=la[a])||(b=la[a]=[]),b[B](d),a=d.Pa(),a[Jd][xd](a);for(;a=Va[Lb];)a=Va[xd](a),a.Iu?W[B](a):a!=Ea&&a!=La&&ja[B](a);ca=[]}function n(a){return(a=ca[a])?a.cf():!1}function q(){J()}function s(){return ya}function x(){return U.nn||Ha==na?sa:null}function y(a){var b=a.L(),d=E[b];if(!d)return!1;var e=(b=la[b])&&b.pop();e||(e=d.gh(Z));d.ka(a,e);Y[B](e);var f=
e.Pa(),b=w();m(b,"gssb_a "+U.eo);b[p](f);if(void 0!==a.ge){ca[B](e);var e=na,g=a.ge();U.Ps&&(f.onmouseover=function(){K.Hs(g)},f.onmouseout=function(){K.Gs()});ob(f,function(b){C.pk();a.ii()&&C.Yh(a.pb());K.Fs();K.Cs(g);b=b||eg(f)[Pd];d.Gd(b,a,Z)})}else e=Ha;Nf(b,e);return!0}function F(a,b,d){var e=zf("input");ab(e,"button");Ya(e,gf(a));ob(e,function(){Z[v](C.cb(),d)});var f;if(U.Ms){a="lsb";f=zf("span");var g=zf("span");m(f,"ds");m(g,"lsbb");f[p](g);g[p](e)}else a="gssb_h",f=e;m(e,a);b[p](f)}function w(){var a=
ja.pop();if(a)return Va[p](a),a[Lb];a=ya[ed](-1);a=a[nd](-1);m(a,U.eo);a.onmousedown=z;return a}function N(a,b){var d=ca[a];d&&d.cf()&&m(d.Pa()[Jd][Jd],b)}function z(a){a=a||eg(ya)[Pd];a[jc]?a[jc]():Af||Bf&&C.Zj();return!1}function J(){if(T){var a=U.co?U.co:C.Ee()-3;0<a&&Aa(T[u],a+"px")}}var K,L,C,E,Z,ea,U,la={},Y=[],ja=[],W=[],ca=[],sa,na,Ha,ya,Va,Ea,T,La,aa,fa={hb:function(a,b){ea=a;Ha=a.Ie();b[A](".gssb_a","padding:0 7px");b[A](".gssb_a,.gssb_a td","white-space:nowrap;overflow:hidden;line-height:22px");
b[A]("#gssb_b","font-size:11px;color:#36c;text-decoration:none");b[A]("#gssb_b:hover","font-size:11px;color:#36c;text-decoration:underline");b[A](".gssb_g","text-align:center;padding:8px 0 7px;position:relative");b[A](".gssb_h","font-size:15px;height:28px;margin:0.2em"+(hg?";-webkit-appearance:button":""));b[A](".gssb_i","background:#eee");b[A](".gss_ifl","visibility:hidden;padding-left:5px");b[A](".gssb_i .gss_ifl","visibility:visible");b[A]("a.gssb_j","font-size:13px;color:#36c;text-decoration:none;line-height:100%");
b[A]("a.gssb_j:hover","text-decoration:underline");b[A](".gssb_l","height:1px;background-color:#e5e5e5");b[A](".gssb_m","color:#000;background:#fff")},ha:function(a){K=a.get(O.Nb,fa);L=a.get(O.rb,fa);C=a.get(O.Ta,fa);Z=a.get(O.ud,fa);E=cg(a.Ab(O[bd],fa))},sb:function(a){U=a;ya=Hf();a=zf("tbody");ya[p](a);Va=ya[ac]("tbody")[0]},da:function(a){U=a;var b=a.on;b&&(sa=ea.Th(b));m(ya,a.vn||"gssb_m");aa=a.un||"gssb_i"},L:function(){return O.Zf},W:function(){return 18},V:function(){return{Es:a,yi:e,bi:d,
Lf:b,ka:g,Ds:f,zi:k,clear:l,cf:n,$f:q,Pa:s,fi:x}}};return fa});zg[Xb](O.Mi,346,function(){function a(a){a=d.Aa(a);for(var f in k)f in a||(a[f]=k[f]);b(e+$e(a))}function b(a){var b=new Image,d=f;b.onerror=za(b,b.onabort=function(){try{delete g[d]}catch(a){}});g[f]=b;b.src=a;f++}var d,e,g=[],f=0,k,l={ha:function(a){d=a.get(O.Bd,l)},da:function(a){e="//"+(a.Gu||"www."+a.Lo)+"/gen_204?";k=a.yo||{}},L:function(){return O.Mi},W:function(){return 346},V:function(){return{mi:a}}};return l});zg[Xb](O.Ci,21,function(){function a(a){l(a);var b=a.fd();if((!b||!b.sp())&&x)for(b=0;b<x[G];++b)x[b].update(a)}function b(a){var b=s[a.rp()]||null;if(b)++y;else if(x&&!a.sp())for(var d=0;d<x[G];++d)if(b=x[d].get(a)){l(b);++F;break}return b?Dg(a,b.Eb(),b.Aa(),b.ol(),b.bj(),b.Mv()):null}function d(){return y}function e(){return F}function g(){F=y=0}function f(a){var b,d,e,f;for(f in s)for(b=s[f],b=b.Eb(),e=0;d=b[e++];)if(d.L()==a){delete s[f];break}n()}function k(){s={};n()}function l(a){a&&a.bj()&&
(s[a.fd().rp()]=a)}function n(){if(x)for(var a=0;a<x[G];++a)x[a][Dc]()}function q(a,b){return b.kb()-a.kb()}var s={},x,y,F,w={ha:function(a){x=a.Ab(O.Ye,w);x[Dd](q)},da:function(){g()},L:function(){return O.Ci},W:function(){return 21},V:function(){return{put:a,get:b,su:d,cl:e,Ad:g,ru:f,qu:k}}};return w});zg[Xb](O.Fd,190,function(){function a(){s&&n.Pl(l)}function b(){s&&n.jj(l)}function d(){s&&q.Pl(l)}function e(){s&&q.jj(l)}var g,f,k,l,n,q,s=!1,x={hb:function(a,b){k=a;var d=function(a){return"box-shadow:"+a+"-moz-box-shadow:"+a+"-webkit-box-shadow:"+a};b[A](".gsfe_a","border:1px solid #b9b9b9;border-top-color:#a0a0a0;"+d("inset 0px 1px 2px rgba(0,0,0,0.1);"));b[A](".gsfe_b","border:1px solid #4d90fe;outline:none;"+d("inset 0px 1px 2px rgba(0,0,0,0.3);"))},ha:function(a){g=a.get(O.rb,x);f=a.get(O.Ta,
x)},sb:function(f){var s=f.dl;if(l=s?k.Th(s):null)g.Sb(12,d),g.Sb(13,e),g.xb(l,"mouseover",a),g.xb(l,"mouseout",b),n=Ig(f.fl||"gsfe_a"),q=Ig(f.el||"gsfe_b")},da:function(){s=!0;l&&f.bo()&&q.Pl(l)},L:function(){return O.Fd},W:function(){return 190},Bb:function(){s=!1;l&&(n.jj(l),q.jj(l))}};return x});var Ig=function(a){var b=new RegExp("(?:^|\\s+)"+a+"(?:$|\\s+)");return{Pl:function(d){d&&!b[Qc](d[rd])&&m(d,d[rd]+(" "+a))},jj:function(a){a&&m(a,a[rd][r](b," "))}}};var Jg=function(){function a(a){if("keyup"==a.fj()){var b=Ve();if(n){var d=b-n;e+=d;g+=d*d}a=a.Jb()[G];a<l&&++f;++k;l=a;n=b}}function b(){return[e,g,k,f]}function d(){n=l=k=f=g=e=0}var e,g,f,k,l,n;return{L:function(){return O.Fd},W:function(){return 325},V:function(){return{yw:a,vl:b,Ad:d}}}};var Kg=function(){function a(){return 23}function b(){return f.vl()[Nd]("j")[r](e,"j")[r](g,"")}function d(){f.Ad()}var e=/j0/g,g=/j+$/,f,k={ha:function(a){f=a.No(325,k)},L:function(){return O.si},W:function(){return 337},V:function(){return{ge:a,lv:b,reset:d}}};return k};var Lg=function(){function a(a){d.yw(a);return 1}function b(){return 17}var d,e={ha:function(a){d=a.No(325,e)},L:function(){return O.Wc},W:function(){return 331},V:function(){return{Sf:a,kb:b}}};return e};var Mg=function(){function a(a){return F&&y==a.Jb()?Dg(a,F,Cg,!0,!1,!1):null}function b(a){return!!a&&0<=a[dd]("**")}function d(){return J}function e(){J=""}function g(){var a=!w||!q.cb();a!=N&&(N?z[Ec]("x-webkit-speech"):z[Nb]("x-webkit-speech",""),N=a)}function f(a,b){b=ff(b);a=ff(af(a,!0));for(var d=a[hc](" "),e=b[hc](" "),f,g=0;g<e[G];++g)f=e[g],0>d[dd](f)&&(e[g]=f.bold());return e[Nd](" ")[r](l," ")}function k(a){a=a&&a.Sv?a.Sv:[];var d=oa.min(a[G],3);y=a[0].Tv;s.add(6);if(b(y)){F=[];for(var e=
0;e<d;++e){var g=a[e].Tv;b(g)||F[B](Eg(f(y,g),g,e,40,null))}}else F=null,J=y,x[v](y,15)}var l=/<\/b> <b>/gi,n,q,s,x,y,F,w,N,z,J="",K={hb:function(a){z=a.jk()},ha:function(a){n=a.get(O.rb,K);q=a.get(O.Ta,K);s=a.get(O.xd,K);x=a.get(O.ud,K)},sb:function(a){w=a.lu;g();z[Nb]("x-webkit-grammar","builtin:search");""!=a.Fe&&z[Nb]("lang",a.Fe);n.cg(z,"webkitspeechchange",k);w&&(n.Sb(4,g),n.Sb(5,g),n.Sb(1,g))},L:function(){return O.Og},W:function(){return 90},V:function(){return{Kv:e,Lv:d,Pv:a,ho:b}}};return K};var Og=function(){function a(a){return Ng(g,a)}function b(a,b){b.ka(a.lh(),a.pb(),f)}function d(a,b,d){d[v](b.pb(),1)}function e(){return 40}var g,f,k={hb:function(a,b){b[A](".gsq_a","padding:0")},ha:function(a){g=a.get(O.Ta,k)},da:function(a){f=a.ek?a.Dk:""},L:function(){return O[bd]},W:function(){return 30},V:function(){return{gh:a,ka:b,Gd:d,hh:Ye,mh:e}}};return k};var Ng=function(a,b){var d,e,g,f,k;(function(){d=If();m(d,"gsq_a");var a=Hf();d[p](a);e=a[ed](-1);a=e[nd](-1);Aa(a[u],"100%");g=zf("span");a[p](g)})();return{Pa:function(){return d},L:function(){return 40},cf:function(){return!0},ka:function(d,n,q){Xa(g,d);k=n;q&&!f&&(f=Uf(e),ob(f,function(d){a.pk();a.Yh(k);b[v](k,9);return Sf(d)}));q?(Xa(f,q+" &raquo;"),Pa(f[u],"")):f&&Pa(f[u],"none")}}};var Pg=function(){function a(a){var b=a.fj();return d&&"input"==b&&d.Lv()==a.Jb()?(d.Kv(),3):1}function b(){return 22}var d,e={ha:function(a){d=a.get(O.Og,e)},L:function(){return O.Wc},W:function(){return 465},V:function(){return{Sf:a,kb:b}}};return e};var Qg=function(){function a(){return 1}function b(a){var b=null;d&&(b=d.Pv(a));return b}var d,e={L:function(){return O.Ye},ha:function(a){d=a.get(O.Og,e)},W:function(){return 100},V:function(){return{kb:a,update:Ye,get:b,reset:Ye}}};return e};var Rg=function(a){function b(){g.bo()||g.cb()?d():a&&!f&&(g.ni(a),f=!0)}function d(){if(f||void 0==f)g.ni("#fff"),f=!1}var e,g,f,k,l={hb:function(a){k=a.jk()},ha:function(a){e=a.get(O.rb,l);g=a.get(O.Ta,l)},sb:function(){e.xb(k,"focus",d);e.xb(k,"blur",b);e.Sb(4,b);e.Sb(5,b)},da:function(){b()},L:function(){return O.Fd},W:function(){return 166},Bb:function(){d()}};return l};var Sg=function(a){function b(b){var d=e.DONT_CARE;if(g){var l=b.fj();"focus"==l||"blur"==l||"mousedown"==l?d=e.to:(b.Ui("partnerid",a),b.setParameter("types","t"))}return d}function d(){return 10}var e=rg,g;return{da:function(a){g=!!a.Je[66]},L:function(){return O.Wc},W:function(){return 66},V:function(){return{Sf:b,kb:d}}}};var Ug=function(a){function b(){return Tg(a,g)}function d(a,b){b.ka(a)}function e(){return 505}var g;return{hb:function(a){g=a.Ie()},L:function(){return O[bd]},W:function(){return 182},V:function(){return{gh:b,ka:d,Gd:Ye,hh:Ye,mh:e}}}},Tg=function(a,b){var d,e={L:function(){return 505},Pa:function(){return d},ka:Ye};(function(){d=If();var e=d[u];e.backgroundImage="url("+a+")";e.backgroundRepeat="no-repeat";Qa(e,"18px");e.marginBottom="2px";e.backgroundPosition="bottom "+("ltr"==b?"right":"left")})();
return e};zg[Xb](O.fe,181,function(){function a(){return 5}function b(a,b,g){g[B]({L:function(){return 505},position:1})}return{L:function(){return O.fe},W:function(){return 181},V:function(){return{kb:a,xo:b}}}});var Wg=function(a,b){function d(){F=null;s&&Xa(s.Pa(),"")}function e(a,b){var d=J[G];switch(a[Kb]){case L.Bo:var e=k(b);if(0>e)break;Rf(a);J[(e+1)%d][Jb]();break;case L.Co:e=k(b);if(0>e)break;Rf(a);J[(e-1+d)%d][Jb]();break;case L.Qi:z=!1;q[Jb]();break;case L.eg:if(Rf(a),z=!1,a[Id])q[Jb]();else q.Ml(),K&&K[Jb]()}}function g(){window[gc](function(){z&&0>k(h.activeElement)&&(z=!1,q.Rh()||q.Ml())},10)}function f(){var a=s.Pa();if(a[fd])return a[fd]("cse-sayt-accessibility");for(var a=a[ac]("a"),b=/\bcse-sayt-accessibility\b/,
d=[],e=0;e<a[G];e++)b[Qc](a[e][rd])&&d[B](a[e]);return d}function k(a){for(var b=0;b<J[G];b++)if(J[b]==a)return b;return-1}function l(a,b,d,e){b=null;a&&(b=a[0],w.put(e?d+e:d,b));d!=x||e&&e!=y||(F=b,n())}function n(){s&&F?Xa(s.Pa(),F):d();b&&b()}var q,s,x,y,F,w,N,z=!1,J,K,L=yg,C={ha:function(a){q=a},Qv:function(a){s=a;n()},tp:function(){var b;t:{if(q){b=null;if(q.De())b=q.Ce();else if(q.td()){var e=q.sd();e&&(b=Te(e).Eb()[0])}if(b){b=b.pb();break t}}b=null}e=N&&N.restrictBy?N.restrictBy:"";if(x!=
b||e!=y)if(x=b,y=e,b){var f=w.get(e?b+e:b);f?b!=x||e&&e!=y||(F=f,n()):(d(),a(b,l,C))}else d()},ml:d,Av:function(){var a=f();J=[];for(var b=0;b<a[G];b++){var d=a[b];d[id]?(J[B](d),d[id]("keydown",function(a){e(a,a[ad]?a[ad]:this)},!0),d[id]("blur",function(){g()},!0)):d[Ub]&&(J[B](d),d[Ub]("onkeydown",function(a){e(a,a[ad]?a[ad]:this)}),d[Ub]("onblur",function(){g()}))}J[G]&&(z=!0,window[gc](function(){K=h.activeElement;J[0][Jb]()},10))},yv:function(){window[gc](function(){z||q.Ml()},20)},zv:function(a){N=
a}};w=Vg(36E5);return C};var Yg=function(a){function b(){return Xg(g)}function d(b,d){a.Qv(d)}function e(){return 503}var g,f={ha:function(a){g=a.get(O.Nb,f)},L:function(){return O[bd]},W:function(){return 68},V:function(){return{gh:b,ka:d,Gd:Ye,hh:Ye,mh:e}}};return f},Xg=function(){var a,b={L:function(){return 503},Pa:function(){return a},ka:Ye};a=If("cse-sayt-container");return b};
zg[Xb](O.fe,67,function(){function a(){return 4}function b(a,b,g){g[B]({L:function(){return 503},position:1})}return{L:function(){return O.fe},W:function(){return 67},V:function(){return{kb:a,xo:b}}}});var Zg=function(a,b){function d(){return 2}function e(d){for(var e=[],k=[],l=d.Eb(),n=!1,q=0,s;s=l[q++];)34==s.L()?k[G]<b&&(k[B](s),s.Aa().ob("c")&&(n=!0)):e[G]<a&&e[B](qf(s,e[G]));for(q=0;l=k[q++];){s=l.Aa();var x={};x.a=s.ob("a");x.b=s.ob("b");x.c=s.ob("c");x.d=s.ob("d");x.e=n;e[B](Eg("","",e[G],l.L(),l.nf(),Fg(x)))}return Dg(d.fd(),e,d.Aa(),d.ol(),d.bj(),!0)}return{L:function(){return O.vi},W:function(){return 171},V:function(){return{kb:d,uv:e}}}};zg[Xb](O.Ye,98,function(){function a(){return 3}function b(a){if(g){var b=a.fd(),d=a.Eb();if(d[G]){var e=b.ke();t:for(var b=Number.MAX_VALUE,l,n=0;l=d[n++];){if(!f[l.L()]){b=-1;break t}l=l.pb();b=oa.min(l[G],b)}if(-1!=b){var q=d[0].pb();if(lf(q,e,!0))for(n=e[G]+1;n<=b;){e=null;for(l=0;q=d[l++];){q=q.pb();if(n>q[G])return;q=q[cc](0,n);if(!e)e=q;else if(e!=q)return}k[e]=a;++n}}}}}function d(a){if(g){var b=k[a.ke()];if(b){var d=a.pp(),e=a.ke();b.fd().ke();for(var f=b.Aa(),q=n||!f.Fo("k"),z=[],J,K,L=
b.Eb(),C=0,E;E=L[C++];)K=E.pb(),J=q?l.bold(d,K):ff(K),z[B](Eg(J,K,E.ge(),E.L(),E.nf(),E.Aa()));delete k[e];return Dg(a,z,f,!0,b.bj(),!1)}}return null}function e(){k={}}var g=!0,f,k={},l,n,q={ha:function(a){l=a.get(O.ej,q)},sb:function(){f=Re([0])},da:function(a){n=a.Gk;g=a.Wn},L:function(){return O.Ye},W:function(){return 98},V:function(){return{kb:a,update:b,get:d,reset:e}},Bb:function(){g=!1}};return q});zg[Xb](O[bd],169,function(){function a(){return $g()}function b(a,b){var d=a.Aa();b.ka(d.ob("a"),d.ob("c"),d.ob("d"),d.ow("e"))}function d(a,b){return b}function e(a,b,d){a=b.Aa().ob("b");(lf(a,"https://")||lf(a,"https://"))&&d.pf(a)}function g(a,b,d){a=b.Aa().ob("b");(lf(a,"https://")||lf(a,"https://"))&&d.pf(a);return!0}function f(){return 34}return{hb:function(a,b){b[A](".gscsep_a","display:none")},L:function(){return O[bd]},W:function(){return 169},V:function(){return{gh:a,ka:b,yi:d,Gd:e,hh:g,mh:f}}}});var $g=function(){var a,b,d,e,g;(function(){a=If();var f=Hf();m(f,"gsc-completion-promotion-table");a[p](f);var k=f[ed](-1),f=function(){var a=k[nd](-1);a[Nb]("valign","top");return a};d=f();e=zf("img");m(e,"gsc-completion-icon");b=If();m(b,"gsc-completion-title");g=If();m(g,"gsc-completion-snippet");f=f();f[p](b);f[p](g)})();return{Pa:function(){return a},L:function(){return 34},cf:function(){return!0},ka:function(a,k,l,n){k&&(lf(k,"https://")||lf(k,"https://")||lf(k,"//"))?(e.src=k,d[sc]()||d[p](e)):
d[sc]()&&d[xd](e);m(d,n?"gsc-completion-icon-cell":"gscsep_a");Xa(b,a);Xa(g,l)}}};zg[Xb](O[bd],20,function(){function a(a){return ah(g,a)}function b(a,b){b.ka(a.lh(),a.pb(),f)}function d(a,b,d){d[v](b.pb(),1)}function e(){return 0}var g,f,k={hb:function(a,b){b[A](".gsq_a","padding:0")},ha:function(a){g=a.get(O.Ta,k)},da:function(a){f=a.ek?a.Dk:""},L:function(){return O[bd]},W:function(){return 20},V:function(){return{gh:a,ka:b,Gd:d,hh:Ye,mh:e}}};return k});var ah=function(a,b){var d,e,g,f,k;(function(){d=If();m(d,"gsq_a");var a=Hf();d[p](a);e=a[ed](-1);a=e[nd](-1);Aa(a[u],"100%");g=zf("span");a[p](g)})();return{Pa:function(){return d},L:function(){return 0},cf:function(){return!0},ka:function(d,n,q){Xa(g,d);k=n;q&&!f&&(f=Uf(e),ob(f,function(d){a.pk();a.Yh(k);b[v](k,9);return Sf(d)}));q?(Xa(f,q+" &raquo;"),Pa(f[u],"")):f&&Pa(f[u],"none")}}};zg[Xb](O.Pe,77,function(){function a(){return s}function b(){return 77}function d(){return 5}function e(){return F}function g(){return{$u:!x}}function f(){l[Rb](!0)}function k(){y&&((x=!!l.cb())&&s?q.bv(77):q.Zu(77))}var l,n,q,s,x,y,F,w,N={hb:function(a,b){w=a;a.Xh()||(b[A](".gscb_a","display:inline-block;font:27px/13px arial,sans-serif"),b[A](".gsst_a .gscb_a","color:#a1b9ed;cursor:pointer"),b[A](".gsst_a:hover .gscb_a,.gsst_a:focus .gscb_a","color:#36c"))},ha:function(a){l=a.get(O.Ta,N);n=a.get(O.rb,
N);q=a.get(O.Ke,N)},sb:function(a){s=!!a.Ki;y=a.Ao;x=!y||!!l.cb();F=w.get("gs_cb");F||(F=zf("span","gscb_a"),F.id=w.ub("gs_cb"),Xa(F,"&times;"));n.Sb(4,k);n.Sb(5,k);n.Sb(1,k)},da:function(a){a.Wj&&(s=!!a.Ki);y=a.Ao;x=!y||!!l.cb()},L:function(){return O.Pe},W:function(){return 77},V:function(){return{isEnabled:a,ep:b,kb:d,Pa:e,dp:g,Gd:f}}};return N});zg[Xb](O.Ke,174,function(){function a(){return 174}function b(a){ya!=a&&(la.dir=ya=a,f())}function d(){return la}function e(a){(a=ja[a])&&a[u]&&Pa(a[u],"")}function g(a){(a=ja[a])&&a[u]&&Pa(a[u],"none")}function f(){W&&(m(ja[W],"gsst_a"),L.Pg(),W=null)}function k(a,b){W=a;var d=ja[a];m(d,"gsst_a gsst_g");var e=ca.lastChild;e!=b&&(e==sa?ca[p](b):ca[Rc](b,e));L.qi(174);L.show();d=d[sd];Aa(sa[u],d+"px");$a(sa[u],"rtl"==ya?"0":ca[sd]-d+"px")}function l(a,b){W==a?f():k(a,b)}function n(a){a.uk="rtl"==ya?
"left":"right";a.Qo=!1}function q(){return ca}function s(){return U.nn||Ha==ya?Va:null}function x(){f()}function y(){return 174}function F(a,b){return b.kb()-a.kb()}function w(){na!=W&&f()}function N(){for(var a,b=0,d;d=Z[b++];)if(d[vc]()){a=!0;var e=zf("a","gsst_a");K(e,d);e[p](d.Pa());la[p](e)}Pa(la[u],a?"":"none")}function z(){na=null}function J(){ja={};for(var a=0,b;b=Z[a++];)if(b[vc]()){var d=b.ep(),e=b.Pa()[Jd];ob(e,b.Gd);e.onmouseover=function(){na=d};e.onmouseout=z;ja[d]=e;b.dp&&(b=b.dp(),
b.$u&&g(d),(b=b.uz)&&!ea.zl(e,b)&&jb(e,b))}}function K(a,b){Oa(a,"javascript:void(0)");fg(a);a.onkeydown=function(a){a=a||window[Pd];var d=a[Kb];if(13==d||32==d)b.Gd(a),E.ls(),Sf(a)}}var L,C,E,Z,ea,U,la,Y,ja={},W,ca,sa,na,Ha,ya,Va,Ea,T={hb:function(a,b){Y=a;Ha=a.Ie();a.Xh()||(b[A](".gsst_a","display:inline-block"),b[A](".gsst_a","cursor:pointer;padding:0 4px"),b[A](".gsst_a:hover","text-decoration:none!important"),b[A](".gsst_b","font-size:16px;padding:0 2px;position:relative;"+b.prefix("user-select:none;")+
"white-space:nowrap"),b[A](".gsst_e",bg(.55)),b[A](".gsst_a:hover .gsst_e,.gsst_a:focus .gsst_e",bg(.72)),b[A](".gsst_a:active .gsst_e",bg(1)),b[A](".gsst_f","background:white;text-align:left"),b[A](".gsst_g","background-color:white;border:1px solid #ccc;border-top-color:#d9d9d9;"+b.prefix("box-shadow:0 2px 4px rgba(0,0,0,0.2);")+"margin:-1px -3px;padding:0 6px"),b[A](".gsst_h","background-color:white;height:1px;margin-bottom:-1px;position:relative;top:-1px"))},ha:function(a){L=a.get(O.yd,T);C=a.get(O.rb,
T);E=a.get(O.Ta,T);Z=a.Ab(O.Pe,T);ea=a.ye()},sb:function(a){Ea=a.Wj;Z[Dd](F);la=Y.get("gs_st");if(!la){la=If("gsst_b");la.id=Y.ub("gs_st");if(a=a.kn)la[u].lineHeight=a+"px";N()}J()},da:function(a){U=a;(a=a.on)&&(Va=Y.Th(a));if(Ea){a=0;for(var b;b=Z[a++];){var d=!!ja[b.ep()];if(b[vc]()!=d){for(;la[sc]();)la[xd](la.lastChild);N();J();break}}}sa=If("gsst_h");ca=If("gsst_f");ca.dir="ltr";ca[p](sa);C.Sb(13,w)},L:function(){return O.Ke},W:a,V:function(){return{$j:b,Pa:d,bv:e,Zu:g,qz:f,rz:k,sz:l}},bg:function(){var b=
{Tn:n,Pa:q,fi:s,Un:x,$f:Ye,Ek:y};return[{hb:Ye,ha:Ye,sb:Ye,da:Ye,L:function(){return O.ei},W:a,V:function(){return b},bg:Ye,Bb:Ye}]}};return T});lg=function(){var a=window.navigator[kc],b=function(b){return 0<=a[dd](b)},d={};window.opera?d[2]=!0:b("MSIE")||b("Trident")?d[0]=!0:b("WebKit")?(d[5]=!0,b("Chrome")?d[3]=!0:b("Android")?d[7]=!0:b("Safari")&&(d[4]=!0),b("iPad")&&(d[6]=!0)):b("Gecko")&&(d[1]=!0);return d};var Vg=function(a){function b(a){delete e[a];delete g[a]}function d(d){if(a){var e=Ve(),l=g[d];l&&l<e&&b(d)}}var e={},g={};return{put:function(b,d){e[b]=d;if(null!=a){var l=Ve()+a;g[b]=l}},get:function(a){d(a);return e[a]||null},contains:function(a){d(a);return a in e},remove:b,reset:function(){e={};g={}}}};var bh=function(){function a(a){return{api:a,jl:a.a,da:a.b,Bb:a.c,hA:a.d,ov:a.e,Dc:a.f,cb:a.g,td:a.h,De:a.i,vl:a.j,qv:a.k,rv:a.l,lA:a.m,pv:a.n,ki:a.o,Ml:a.p,hn:a.q,gA:a.r,eA:a.s,li:a.t,gn:a.u,focus:a.v,blur:a.w,An:a.x,sd:a.y,Sc:a.z,mA:a.aa,Ad:a.ab,search:a.ad,nA:a.ae,qA:a.af,Ph:a.ag,Ce:a.ah,rA:a.ai,fn:a.al,tn:a.am,ju:a.an,ce:a.ao,hu:a.ap,iA:a.aq,Vj:a.ar,ub:a.as,fA:a.at,Yj:a.au,pA:a.av,Rh:a.aw,Bn:a.ax,ri:a.ay,iu:a.az,Oi:a.ba,oA:a.bb,kA:a.bc,mi:a.bd,jA:a.be,ho:a.bf}}return{Tf:function(b,d,e,g){try{var f=
window[qd].sbox(b,d,e,g);return a(f)}catch(k){return null}},translate:function(b){return a(b.api||b)}}};zg[Xb](O.ll,170,function(){function a(a){if(1<a[G]&&34!=a[0].L())for(var d=1,e;e=a[d];++d)if(34==e.L()){a[Md](d,0,3);break}}return{L:function(){return O.ll},W:function(){return 170},V:function(){return{It:a}}}});window[qd]||(window.google={});
window[qd].sbox=function(a,b,d,e){function g(){E.Bb()}function f(a){ja.Sc(a||"")}function k(){return bb}function l(){return fa}function n(){return ja.cb()}function q(){return T.Ce()}function s(){la.vb(8)}function x(a){return sa.Aa(a)}function y(){return qb||!!ea&&ea.ce()}function F(){return ca.gu()}function w(a){a=a.$n||of();a=eg(a);void 0==a.nextSearchboxId&&(a.nextSearchboxId=50);return a.nextSearchboxId++}function N(){if(a)for(var b=a;b=b[Jd];){var d=b.dir;if(d)return d}return"ltr"}function z(a){a=
tf(a);a.Xf[35]||(a.Ls="");var b=a.Zn;b?a.Zn=b[Od]():a.Js=!1;a.Rj&&!a.ek&&(a.Rj=!1);mg||(a.bn=!1);return a}function J(a,b){var d=b[wb](a);return d&&d[1]?ta(d[1],10)||0:0}function K(){var b=eg(a),d=Zf(b);la.cg(b,"resize",function(){var a=Zf(b);if(a.Xo!=d.Xo||a.To!=d.To)d=a,s()})}function L(a){var b=a.Je,d=b[O.On],e=b[O.Ck],f=b[O.Rn],g=b[O.Sn],k=b[O.Of],f=e||g||f;b[O.Bk]||k||d||f?(a.Je[O.Bk]=!0,a.Je[O.Pn]=!0,f?(a=Ue(a.Fe),!e||gg&&(kg||a)||Bf&&a?(bb=3,b[O.Ck]=!1,b[O.Qn]=!1):bb=2):bb=1):bb=0}var C,E,Z,
ea,U,la,Y,ja,W,ca,sa,na,Ha,ya,Va,Ea,T,La,aa,fa,bb,P=!1,qb,ma={a:function(d){if(!P){d=z(d);fa=null==e?w(d):e;var f=dg(a),g=N(),k=!!f[Zc]("gs_id"+fa),l=["gssb_c","gssb_k"];d.Xj&&l[B](d.Xj);l=Gg(d.$n,d.Ks,d.Is,fa,l);L(d);qb=d.ce;E=Ag(C,d.lk||{},{Xh:function(){return k},get:function(a){return f[Zc](a+fa)},Th:function(a){return f[Zc](a)},so:function(){return b},Ie:function(){return g},ub:function(a){return a+fa},jk:function(){return a}},l,ma,d);Z=E.get(O.Mi,ma);ea=E.get(O.ze,ma);U=E.get(O.yd,ma);la=E.get(O.rb,
ma);Y=E.get(O.gc,ma);ja=E.get(O.Ta,ma);W=E.get(O.Ge,ma);ca=E.get(O.xd,ma);sa=E.get(O.Bd,ma);na=E.get(O.Du,ma);Ha=E.get(O.Eu,ma);ya=E.get(O.Re,ma);Va=E.get(O.Og,ma);Ea=E.get(O.Cc,ma);T=E.get(O.Nb,ma);La=E.get(O.Of,ma);aa=E.get(O.ud,ma);K();P=!0}},b:function(a){g();a=z(a);L(a);qb=a.ce;E.da(a)},c:g,d:function(){return b},e:function(a,b){return Of(a,b)},f:function(){return ja.Dc()},g:n,h:function(){return T.td()},i:function(){return T.De()},j:x,k:function(a,b){a||(a=sa.Aa(b));return $e(a)},l:function(){return T.Jf()},
m:function(){return T.Vr()},n:function(a,b){la.cg(a,"click",function(a){aa[v](n(),b);return Rf(a)})},o:function(){Y.ki()},p:function(){T.Sj()},q:function(a){ja.hn(a||"")},r:function(){return U.zd()},s:function(){ja[Rb]()},t:function(a){return Y.li(a)},u:function(){ja.gn()},v:function(){W[Jb]()},w:function(){W.blur()},x:function(){return Y.An()},y:function(){var a=Ea.sd();return a?Se(a.Jo()):null},z:f,aa:function(a){a=ya.Ak(a);return Se(a.Jo())},ab:function(){sa[Dc]()},ad:function(a,b){aa[v](a,b)},
ae:function(){La&&La[Tb]()},af:function(a){T.Wm(a)},ag:function(){T.Ph()},ah:q,ai:s,al:function(){ja.fn()},am:function(){return E&&E.tn()},an:function(a){ea&&ea.ju(a)},ao:y,ap:function(){return y()&&ea?ea.hu():""},aq:function(a,b){return Pf(a,b)},ar:k,as:l,at:function(){La&&La[Rb]()},au:function(a,b){f(a);T[vc]()&&T.Yj(a,b,!1)},av:function(a){la.vb(15,{$h:a})},aw:function(){return W.Rh()},ax:function(a){Y.Bn(a)},ay:function(a){U.ri(a)},az:function(a){return!!Ha&&Ha.iu(a)},ba:function(){var a,b=Ea.sd();
if(b){var d=b.Pj();d&&((a=d.Oi())||(a=b.Aa().ob("o")))}return a||""},bb:function(a,b){return na?(na.kz(a,b),!0):!1},bc:function(a,b){switch(a){case "oq":case "gs_l":return x(b)[a]||null;case "gs_ssp":var d;t:{if((d=q())&&46==d.L()&&(d=d.Aa().ob("g")))break t;d=null}return d;default:return null}},bd:function(a){Z&&Z.mi(a)},be:F,bf:function(a){return 6==F()&&!!Va&&Va.ho(a)},ub:l,Vj:k};C=Hg(d);(function(a){var b=C.nl(),d=J(a,/Version\/(\d+)/);d||(d=J(a,/(?:Android|Chrome|Firefox|Opera|MSIE)[\s\/](\d+)/));
d||(d=J(a,/Trident[^)]*rv:(\d+)/));a=d;wf=(Bf=b[0])&&8>=a;vf=Bf&&7>=a;gg=b[1];Af=b[2];hg=b[5];ig=b[4];mg=b[3];jg=b[7]})(window.navigator[kc]);kg=/Mac/[Qc](qa&&(qa.platform||qa.appVersion)||"");return ma};var ch=function(){function a(a){var b=!0;void 0!=a&&(b=a==y.oi,y.oi=a);s?b||s.da(y):(s=bh().Tf(z,w,ya),s.jl(y),L&&L.ha(s))}function b(a){s.Sc(a)}function d(a){return a+(0<=a[dd]("?")?"&":"?")+s.qv()}function e(){ca&&ca()}function g(b,d,e,g){w=b;z=d;sa=e;var n=g.onRenderCallback;n&&(ca=function(){try{n()}catch(a){}});y=f();l(y,g);k(e,y);a();g.searchButton&&s.pv(g.searchButton,12)}function f(){var a=x.Tf();a.rk="partner";a.sk="partner";a.wn="cse";a.Yu=!0;a.yo={partnerid:sa};a.mn=!0;a.ik="gsc-input";
a.vn="gsc-completion-container";a.un="gsc-completion-selected";U&&(a.dl=z.id,a.fl="gsc-input-hover",a.el="gsc-input-focus");a.df=[-1,0,0];a.Gk=!0;a.ce=!0;a.Ki=!1;a.spellcheck=!1;a.Xf=Re([0,34]);a.Je[66]=!0;return a}function k(a,b){var d={},e=d[O.Fd]=[162];if(K||C)d[O[bd]]=[K?Yg(L):Ug(C),162];uf(d,O.Wc,Sg(a));uf(d,O.Fd,Jg());uf(d,O.Wc,Lg());uf(d,O.si,Kg());E&&e[B](Rg(E));uf(d,O.vi,Zg(Z,ea));b.lk=d;Y&&(d=b.lk,d[O.Og]=Mg(),uf(d,O.Wc,Pg()),uf(d,O.Ye,Qg()),uf(d,O[bd],Og()))}function l(a,b){if(la=!!b.useKennedyLookAndFeel)U&&
(a.dl=z[Jd].id,a.fl="gsc-input-box-hover",a.el="gsc-input-box-focus"),a.df=[3,-1,2],a.Ki=!0;b.interfaceLanguage&&(a.Fe=b.interfaceLanguage);b.disableAutoCompletions&&(a.oi=!0);Z=ta(b.maxSuggestions,10);var d=b.saytSubmit;d&&(L=Wg(d,ca),b.saytExtraParameters&&L.zv(b.saytExtraParameters),a.Xf[503]=!0,a.Xf[34]=!1,b.saytKeyboardNavigationEnabled&&(a.Zh=4,a.Oj=!1,Ha=!0),K=!0);0<=Z||(Z=d?5:10);ea=ta(b.maxPromotions,10);0<=ea||(ea=3);a.tk="gsnos,n="+(Z+3);(C=b.brandingImageUrl)&&(E=b.brandingImageStyle+
" url("+C+")");if(d=b.styleOptions){var e=d.xOffset||0,f=d.yOffset||0,g=d.widthOffset||0,k=d.fixedWidth;ja=!!d.allowWordWrapping;var l=a.df;l[0]+=f;l[1]+=e;l[2]+=g;a.Vn=k;a.dn=d.xAlign;d.positionFixed&&(a.Sg="fixed")}Y=!!b.enableSpeech}function n(){s.mi(W)}var q={Yv:"oq",Zv:"gs_l"},s,x,y,F,w,N,z,J,K=!1,L,C,E,Z,ea,U,la,Y,ja=!1,W,ca,sa,na=!1,Ha=!1,ya={da:a,jl:function(a,b,d,e){g(a,b,d,e);if(e.isLoggingWithHiddenFormFields){J={};for(var f in q)a=q[f],J[a]=s.ov(w,a)}else na=!0,w&&(w[id]?w[id]("submit",
n,!1):w[Ub]&&w[Ub]("onsubmit",n))},Kr:function(a,b,d,e){U=d;g(a,b,U.ij()||"",e);e.enableAsynchronousLogging&&(na=!0)},Ru:function(a,b,d,e){g(null,b,d,e);na=!0;N=a},Sc:b,cb:function(){return s.cb()},a:function(){return F},b:function(a,d){a!=z[cd]&&(U&&window[Ac]&&window[Ac].log&&window[Ac].log("Programmatically setting input.value? Please consider using prefillQuery() or execute() from google.search.SearchControl instead."),a=z[cd],b(a));if(ef(a)){W=d;na&&(U||N)&&n();var e=s.vl(W);if(J){var f=q.Yv;
J[f]&&Ya(J[f],e[f]);f=q.Zv;J[f]&&Ya(J[f],e[f])}U?(a!=s.cb()&&s.Sc(a),na?U[Uc]():U.$v(e)):N?N(e):w&&(w.fireEvent&&h.createEventObject?(e=h.createEventObject(),w.fireEvent("onsubmit",e)&&w[Uc]()):w.dispatchEvent&&h.createEvent?(e=h.createEvent("HTMLEvents"),e.initEvent("submit",!0,!0),w.dispatchEvent(e)&&w[Uc]()):w.onsubmit&&0==w.onsubmit()||w[Uc]());W=null}},c:function(a){window.location=a},d:function(a){window.location=d(a)},e:d,j:function(){L&&L.tp()},o:e,p:e,r:function(a){if(U)if(la)a[A](".gssb_a",
"padding:0 9px"),a[A](".gsib_a","padding-right:8px;padding-left:8px"),a[A](".gsst_a","padding-top:3px");else a[A](".gssb_a","padding:0 7px");else a[A](".gssb_a","padding:0 2px");a[A](".gssb_e","border:0");a[A](".gssb_l","margin:5px 0");a[A](".gssb_c .gsc-completion-container","position:static");a[A](".gssb_c","z-index:5000");a[A](".gsc-completion-container table","background:transparent;font-size:inherit;font-family:inherit");a[A](".gssb_c > tbody > tr,.gssb_c > tbody > tr > td,.gssb_d,.gssb_d > tbody > tr,.gssb_d > tbody > tr > td,.gssb_e,.gssb_e > tbody > tr,.gssb_e > tbody > tr > td",
"padding:0;margin:0;border:0");a[A](".gssb_a table,.gssb_a table tr,.gssb_a table tr td","padding:0;margin:0;border:0");K&&a[A](".cse-sayt div","white-space:normal");ja&&a[A](".gssb_a,.gssb_a td","white-space:normal")},w:function(){L&&L.tp()},x:function(){U&&U.Yc()},y:function(){L&&Ha&&L.yv()},ab:function(){L&&Ha&&s.rv()&&L.Av()}};F=lg();x=wg();return ya};google[v].U={};google[v].U.iy="ar"==wa||"iw"==wa||"fa"==wa;google[v].U.sr=google[v].U.iy?-1:1;google[v].U.od=new Qe(google[v].U.sr);google[v].U.Ei=google[v].U.od.qr(google[v].U.sr);google[v].U.Rq=google[v].U.od.Yy();google[v].U.$A=google[v].U.od.xy();google[v].U.Vd=function(a,b){return google[v].U.od.Yq(a,!1,b)};google[v].U.Af=function(a,b){return google[v].U.od.Yq(a,!0,b)};google[v].U.Ww=function(a){return a?google[v].U.od.Tq(a,!1):google[v].U.Ei};
google[v].U.ph=function(a){return a?google[v].U.od.Tq(a,!0):google[v].U.Ei};google[v].U.Yw=function(a){return a?google[v].U.od.Xq(a,!1):""};google[v].U.Xw=function(a){return a?google[v].U.od.Xq(a,!0):""};google[v].NoOldNames||(ba("UDS_ServiceBase",google[Ed][ld]),ba("UDS_ApiKey",google[Ed].ApiKey),ba("UDS_KeyVerified",google[Ed].KeyVerified),ba("UDS_LoadFailure",google[Ed].LoadFailure),ba("UDS_CurrentLocale",wa),ba("UDS_ShortDatePattern",da),ba("UDS_Version",google[v][td]),ba("UDS_JSHash",google[v].JSHash));var Q={blank:"&nbsp;"};Q.image=_UDS_MSG_SEARCHER_IMAGE;Q.web=_UDS_MSG_SEARCHER_WEB;Q.blog=_UDS_MSG_SEARCHER_BLOG;Q.video=_UDS_MSG_SEARCHER_VIDEO;Q.local=_UDS_MSG_SEARCHER_LOCAL;Q.news=_UDS_MSG_SEARCHER_NEWS;Q.book=_UDS_MSG_SEARCHER_BOOK;Q.patent=_UDS_MSG_SEARCHER_PATENT;Q["ads-by-google"]=_UDS_MSG_ADS_BY_GOOGLE;Q.save=_UDS_MSG_SEARCHCONTROL_SAVE;Q.keep=_UDS_MSG_SEARCHCONTROL_KEEP;Q.include=_UDS_MSG_SEARCHCONTROL_INCLUDE;Q.copy=_UDS_MSG_SEARCHCONTROL_COPY;Q.close=_UDS_MSG_SEARCHCONTROL_CLOSE;
Q["sponsored-links"]=_UDS_MSG_SEARCHCONTROL_SPONSORED_LINKS;Q["see-more"]=_UDS_MSG_SEARCHCONTROL_SEE_MORE;Q.watermark=_UDS_MSG_SEARCHCONTROL_WATERMARK;Q["search-location"]=_UDS_MSG_SEARCHER_CONFIG_SET_LOCATION;Q["disable-address-lookup"]=_UDS_MSG_SEARCHER_CONFIG_DISABLE_ADDRESS_LOOKUP;Q["sort-by-date"]=_UDS_MSG_SORT_BY_DATE;Q.pbg=_UDS_MSG_BRANDING_STRING;Q["n-minutes-ago"]=_UDS_MSG_MINUTES_AGO;Q["n-hours-ago"]=_UDS_MSG_HOURS_AGO;Q["one-hour-ago"]=_UDS_MSG_ONE_HOUR_AGO;Q["all-n-related"]=_UDS_MSG_NEWS_ALL_N_RELATED;
Q["related-articles"]=_UDS_MSG_NEWS_RELATED;Q["page-count"]=_UDS_MSG_TOTAL_PAGE_COUNT;var dh=[];dh[0]=_UDS_MSG_MONTH_ABBR_JAN;dh[1]=_UDS_MSG_MONTH_ABBR_FEB;dh[2]=_UDS_MSG_MONTH_ABBR_MAR;dh[3]=_UDS_MSG_MONTH_ABBR_APR;dh[4]=_UDS_MSG_MONTH_ABBR_MAY;dh[5]=_UDS_MSG_MONTH_ABBR_JUN;dh[6]=_UDS_MSG_MONTH_ABBR_JUL;dh[7]=_UDS_MSG_MONTH_ABBR_AUG;dh[8]=_UDS_MSG_MONTH_ABBR_SEP;dh[9]=_UDS_MSG_MONTH_ABBR_OCT;dh[10]=_UDS_MSG_MONTH_ABBR_NOV;dh[11]=_UDS_MSG_MONTH_ABBR_DEC;Q["month-abbr"]=dh;Q.directions=_UDS_MSG_DIRECTIONS;
Q["clear-results"]=_UDS_MSG_CLEAR_RESULTS;Q["show-one-result"]=_UDS_MSG_SHOW_ONE_RESULT;Q["show-more-results"]=_UDS_MSG_SHOW_MORE_RESULTS;Q["show-all-results"]=_UDS_MSG_SHOW_ALL_RESULTS;Q.settings=_UDS_MSG_SETTINGS;Q.search=_UDS_MSG_SEARCH;Q["search-uc"]=_UDS_MSG_SEARCH_UC;Q["powered-by"]=_UDS_MSG_POWERED_BY;Q.sa=_UDS_MSG_SEARCHER_GSA;Q.by=_UDS_MSG_SEARCHER_BY;Q.code=_UDS_MSG_SEARCHER_CODE;Q["unknown-license"]=_UDS_MSG_UNKNOWN_LICENSE;Q["more-results"]=_UDS_MSG_SEARCHCONTROL_MORERESULTS;
Q.previous=_UDS_MSG_SEARCHCONTROL_PREVIOUS;Q.next=_UDS_MSG_SEARCHCONTROL_NEXT;Q["get-directions"]=_UDS_MSG_GET_DIRECTIONS;Q["to-here"]=_UDS_MSG_GET_DIRECTIONS_TO_HERE;Q["from-here"]=_UDS_MSG_GET_DIRECTIONS_FROM_HERE;Q["clear-results-uc"]=_UDS_MSG_CLEAR_RESULTS_UC;Q["search-the-map"]=_UDS_MSG_SEARCH_THE_MAP;Q["scroll-results"]=_UDS_MSG_SCROLL_THROUGH_RESULTS;Q["edit-tags"]=_UDS_MSG_EDIT_TAGS;Q["tag-search"]=_UDS_MSG_TAG_THIS_SEARCH;Q["search-string"]=_UDS_MSG_SEARCH_STRING;Q["optional-label"]=_UDS_MSG_OPTIONAL_LABEL;
Q["delete"]=_UDS_MSG_DELETE;Q.deleted=_UDS_MSG_DELETED;Q.cancel=_UDS_MSG_CANCEL;Q["upload-video"]=_UDS_MSG_UPLOAD_YOUR_VIDEOS;Q["im-done"]=_UDS_MSG_IM_DONE_WATCHING;Q["close-player"]=_UDS_MSG_CLOSE_VIDEO_PLAYER;Q["no-results"]=_UDS_MSG_NO_RESULTS;Q["linked-cse-error-results"]=_UDS_MSG_LINKEDCSE_ERROR_RESULTS;Q.back=_UDS_MSG_BACK;Q.subscribe=_UDS_MSG_SUBSCRIBE;Q["us-pat"]=_UDS_MSG_USPAT;Q["us-pat-app"]=_UDS_MSG_USPAT_APP;Q["us-pat-filed"]=_UDS_MSG_PATENT_FILED;Q.dym=_UDS_MSG_DID_YOU_MEAN;
Q["showing-results-for"]=_UDS_MSG_SHOWING_RESULTS_FOR;Q["search-instead-for"]=_UDS_MSG_SEARCH_INSTEAD_FOR;Q["custom-search"]=_UDS_MSG_CUSTOM_SEARCH;Q.labeled=_UDS_MSG_LABELED;Q.loading=_UDS_MSG_LOADING;Q["all-results-short"]=_UDS_MSG_ALL_RESULTS_SHORT;Q["all-results-long"]=_UDS_MSG_ALL_RESULTS_LONG;Q["refine-results"]=_UDS_MSG_REFINE_RESULTS;Q["result-info"]=_UDS_MSG_RESULT_INFO;Q["file-format"]=_UDS_MSG_FILE_FORMAT;Q["order-results-by"]=_UDS_MSG_ORDER_BY;Q["order-by-relevance"]=_UDS_MSG_ORDER_BY_RELEVANCE;
Q["order-by-date"]=_UDS_MSG_ORDER_BY_DATE;Q["get-link"]=_UDS_MSG_ORDER_BY_GET_LINK;Q["add-label"]="Add Label";Q["no-refinement"]="Refinements should be present before adding label";Q["label-page"]="This particular page";Q["label-site"]="Entire site";Q["label-prefix"]="Specific page prefix";Q["invalid-url-prefix"]="Invalid url prefix";Q["error-adding-label"]="Error adding label.";Q.saving="Saving...";Q.Save="Save";Q.Cancel="Cancel";Q["structured-data"]="Structured data";function eh(a,b){var d=function(){};lb(d,b[H]);lb(a,new d);a[H].iC=function(b,d,f,k){var l=pa[H][Md][Bc](arguments,[1,arguments[G]]);return b[Bc](a,l)}}var _json_cache_defeater_=(new Date)[Wb](),_json_request_require_prep=!0;function gh(a,b){var d;if(d=hh("msie"))d="msie 6.0"in ih?ih["msie 6.0"]:ih["msie 6.0"]=-1!=qa.appVersion[Od]()[dd]("msie 6.0");d?window[gc](jh(this,kh,[a,b]),0):kh(a,b)}function lh(a){_json_request_require_prep=!1;gh(a,null);_json_request_require_prep=!0}
function kh(a,b){var d=h[ac]("head")[0];d||(d=h[vd][Jd][p](h[t]("head")));var e=h[t]("script");ab(e,"text/javascript");e.charset="utf-8";var g=_json_request_require_prep?a+"&key="+google[Ed].ApiKey+"&v="+b:a;if(mh()||hh("safari")||hh("konqueror"))g=g+"&nocache="+_json_cache_defeater_++;e.src=g;var f=function(){za(e,null);e[Jd][xd](e)},g=function(a){a=a?a:window[Pd];a=a[yd]?a[yd]:a[ad];if("loaded"==a[hd]||"complete"==a[hd])Ta(a,null),f()};"Gecko"==qa.product?za(e,f):Ta(e,g);d[p](e)}
function nh(a,b){return function(){return b[Bc](a,arguments)}}function jh(a,b,d){return function(){return b[Bc](a,d||[])}}function oh(a){for(;a[Lb];)a[xd](a[Lb])}function ph(a,b){if(a)try{oh(a),a[p](b)}catch(d){}return b}function R(a,b){try{a[p](b)}catch(d){}return b}function qh(a,b){void 0!=a.textContent?ib(a,b):a.innerText=b}function rh(a){return h[Gb](a?a:"")}function V(a,b){var d=h[t]("div");a&&Xa(d,a);b&&m(d,b);return d}function sh(a,b){var d=h[t]("div");a&&R(d,rh(a));b&&m(d,b);return d}
function X(a){var b=h[t]("div");a&&m(b,a);return b}function th(a,b){var d=h[t]("span");a&&R(d,rh(a));b&&m(d,b);return d}function uh(a,b,d){var e=h[t]("table");e[Nb]("cellSpacing",a?a:0);e[Nb]("cellPadding",b?b:0);d&&m(e,d);return e}function vh(a,b,d){(a=a[ed](-1))||alert(a);for(var e=0;e<b;e++)wh(a,d);return a}function wh(a,b){var d=a[nd](-1);b&&m(d,b);return d}function xh(a,b,d,e){var g=h[t]("img");g.src=a;b&&Aa(g,b);d&&Qa(g,d);e&&m(g,e);return g}
function yh(a,b,d,e,g){var f=h[t]("a");Oa(f,a);b&&(e?R(f,th(b,e)):R(f,rh(b)));d&&nb(f,d);g&&jb(f,g);return f}function zh(a,b,d,e,g,f){var k=V(null,e),l=h[t]("a");Oa(l,a);Xa(l,b);e&&m(l,e);d&&nb(l,d);g&&jb(l,g);if(f)for(var n in f)l[Nb](n,f[n]);k[p](l);return k}function Ah(a,b){var d=h[t]("label");b&&m(d,b);a&&ib(d,a);return d}function Bh(a){var b=h[t]("form");a&&m(b,a);return b}function Ch(a,b){var d=h[t]("input");ab(d,"submit");Ya(d,a);b&&m(d,b);return d}
function Dh(a,b,d){var e=h[t]("input");ab(e,"button");Ya(e,a);b&&m(e,b);d&&ob(e,d);return e}function Eh(a,b,d){var e=h[t]("input");e[Nb]("autoComplete","off");ab(e,"text");-1==a?$(e,"util-css-expand"):e.size=0<a?a:10;b&&$(e,b);d&&Ya(e,d);return e}function Fh(a,b,d,e){var g=h[t]("input");ab(g,"checkbox");cb(g,a);Ya(g,b);e&&m(g,e);d&&Fa(g,d);return g}function Gh(a,b,d,e){var g=h[t]("input");ab(g,"radio");a&&cb(g,a);b&&Ya(g,b);e&&m(g,e);d&&Fa(g,d);return g}
function Hh(a,b){b?(a.tabIndex=0,ob(a,b),a.onkeypress=function(d){d=d||window[Pd];d[Kb]&&13==d[Kb]&&b[zd](a,d)}):(a.tabIndex=-1,a[Ec]("tabIndex"),ob(a,null),a.onkeypress=null)}function Ih(){var a=window[mc][qc];return"/cse/labelurl"==window[mc].pathname&&-1!==a[dd]("google.com",a[G]-10)?!0:!1}function Jh(a,b){if(null==a||null==a[rd])return!1;for(var d=a[rd][hc](" "),e=0;e<d[G];e++)if(d[e]==b)return!0;return!1}function $(a,b){Jh(a,b)||m(a,a[rd]+(" "+b))}
function Kh(a,b){if(null!=a[rd]){for(var d=a[rd][hc](" "),e=[],g=!1,f=0;f<d[G];f++)d[f]!=b?d[f]&&e[B](d[f]):g=!0;g&&m(a,e[Nd](" "))}}var Lh="",Mh={qy:{qC:1,sC:1,AC:1,id:1,BC:1,"in":1,CC:1,EC:1,FC:1,GC:1,HC:1,QC:1,aD:1,eD:1,fD:1,iD:1,jD:1,lD:1},rC:{jC:1,lC:1,mC:1,nC:1,oC:1,pC:1,qy:1,tC:1,"do":1,uC:1,vC:1,wC:1,xC:1,yC:1,zC:1,DC:1,IC:1,JC:1,KC:1,LC:1,MC:1,NC:1,OC:1,PC:1,SC:1,TC:1,UC:1,VC:1,WC:1,XC:1,YC:1,ZC:1,$C:1,bD:1,cD:1,dD:1,gD:1,hD:1,kD:1},RC:{kC:1}};
function hh(a){return a in Nh?Nh[a]:Nh[a]=-1!=qa[kc][Od]()[dd](a)}var Nh={},ih={};function mh(){return hh("msie")}var Oh,Ph;window.ActiveXObject&&(Oh=!0,window.XMLHttpRequest&&(Ph=!0));function Qh(a){this.sm=a+"branding";this.Dj=a+"branding-vertical";this.fr=a+"branding-img-noclear";this.Px=a+"branding-clickable";this.text=a+"branding-text";this.Qx=a+"branding-text-name"}
function Rh(a,b,d,e,g){var f=new Qh(a);a=X(f.sm);var k=uh(null,null,f.sm);R(a,k);var l=!d;l||($(a,f.Dj),$(k,f.Dj));var n=vh(k,0),q;l?q=n:(q=n,n=vh(k,0));var s="/css/small-logo.png",x=51,y=15;e&&"string"==typeof e&&e[Ib](/^https:\/\/www\.youtube\.com/)&&(s="/css/youtube-logo-55x24.png",x=55,y=24,$(a,f.sm+"-youtube"),l||($(a,f.Dj+"-youtube"),$(k,f.Dj+"-youtube")));q=wh(q,f[Vc]);var l=wh(n,f.fr),F=V(Q["powered-by"],f[Vc]),s=google[Ed][ld]+s,w=f.fr;Oh&&!Ph?(w=X(w),w[u].filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+
s+'")',Aa(w[u],x+"px"),Qa(w[u],y+"px")):w=xh(s,null,null,w);y=w;R(q,F);e?(q="https://www.google.com","string"==typeof e&&(e[Ib](/^https:\/\/[a-z]*\.google\.com/)||e[Ib](/^https:\/\/www\.youtube\.com/))&&(q=e),e=yh(q,null,"_BLANK"),m(e,f.Px),R(e,y),R(l,e)):R(l,y);g&&(e=n,d&&(e=vh(k,0)),d=f[Vc]+" "+f.Qx,f=wh(e,d),R(f,sh(g,d)));b&&(b="string"==typeof b?h[Zc](b):b,oh(b),R(b,a));return a}
var Sh=function(a,b,d){b=b&&"*"!=b?b[Ld]():"";if(d&&a[fd]){a=a[fd](d);if(b){for(var e={},g=0,f=0,k;k=a[f];f++)b==k.nodeName&&(e[g++]=k);e.length=g;return e}return a}a=a[ac](b||"*");if(d){e={};for(f=g=0;k=a[f];f++)Jh(k,d)&&(e[g++]=k);e.length=g;return e}return a};function Th(a){return a[r](/\s+$/,"")[r](/^\s+/,"")}function Uh(a){var b=[];if(a)for(var d in a)null!=a[d]&&b[B](c(d)+"="+c(a[d]));return b[Nd]("&")}
function Vh(a,b){for(var d=a[hc]("?"),e=d[1][hc]("&"),g=b+"=",f=e[G];0<f--;)-1!=e[f].lastIndexOf(g,0)&&e[Md](f,1);return 0<e[G]?d[0]+"?"+e[Nd]("&"):d[0]}function Wh(a){for(var b=window[mc][v][Gd](1)[hc]("&"),d=0;d<b[G];d++){var e=b[d][hc]("=");if(e[0]==a)return xa(e[1])}}function Xh(a,b){b||(b=h[ac]("body")[0]);for(var d=0;a!=b;)d+=a.offsetLeft,a=a.offsetParent;return d}function Yh(a,b){b||(b=h[vd]);for(var d=0;a!=b;)d+=a.offsetTop,a=a.offsetParent;return d}
function Zh(a){try{return a instanceof HTMLFormElement}catch(b){return!!a&&"object"===typeof a&&1===a[Yc]&&"object"===typeof a[u]&&"object"===typeof a.ownerDocument&&"form"===a[Cc][Od]()}}function $h(a){"string"==typeof a&&(a=h[Zc](a));return a}function ai(a){if(a){var b=h[t]("div"),d=h[t]("a");Oa(d,a);b[p](d);Xa(b,b[$c]);return b[Lb][zc]}return null}function bi(a){var b=h[t]("a");Oa(b,a);return b[bc]}function ci(a){return!!a&&/https?:\/\/([^/.:]+\.)*google(\.[^/.:]+)*(\:[0-9]+)?\/cse/[Qc](a)}
function di(a,b){for(;b&&b!=a;)b=b[Jd];return b==a}function ei(a){window[Ac]&&window[Ac].warn(a)};google[v].Na={};google[v].Na.Jx=function(a,b,d){var e=new XMLHttpRequest;Ta(e,function(){e[hd]==XMLHttpRequest.DONE&&d(e.responseText)});e[Pc]("POST",a,!0);e[gd]("Content-type","application/json");e[gd]("Accept","application/json");e.send(b)};google[v].Na.nx=function(a,b){var d=new XMLHttpRequest;Ta(d,function(){d[hd]==XMLHttpRequest.DONE&&b(d.responseText)});d[Pc]("GET",a,!0);d[gd]("Content-type","application/json");d[gd]("Accept","application/json");d.send()};
google[v].Na.Nx=function(a){var b=new XMLHttpRequest;b[Pc]("GET",a,!1);b[gd]("Content-type","application/json");b[gd]("Accept","application/json");b.send();return b.responseText};google[v].Na.Oq=function(){var a=Wh("cx")[hc](":");return window[mc][xc]+"//"+window[mc][bc]+"/cse/api/"+a[0]+"/annotations/"+a[1]+"?xsrf="+google[v].Na.er()};google[v].Na.er=function(){return h[Zc]("xsrf")[$c]};
google[v].Na.Mx=function(){var a=Wh("cx")[hc](":");return window[mc][xc]+"//"+window[mc][bc]+"/cse/api/"+a[0]+"/cse/"+a[1]+"?xsrf="+google[v].Na.er()};google[v].Na.rx=function(){var a=JSON[od](google[v].Na.Nx(google[v].Na.Mx()));if(!a.Context||!a.Context.Facet)return null;for(var b=[],d=0;d<a.Context.Facet[G];d++)for(var e=a.Context.Facet[d].FacetItem,g=0;e&&g<e[G];g++)b[B](e[g]);return b};
google[v].Na.Hx=function(a,b){var d=JSON[od](b);if(d.Annotation)for(var e=0;e<d.Annotation[G];e++)if(d.Annotation[e].AdditionalData[0][cd]==a)return d.Annotation[e][zc]};google[v].Na.Ix=function(a,b,d){a={Add:{Annotations:{Annotation:[{about:a,label:[{name:"_cse_"+Wh("cx")[hc](":")[1]}]}]}}};for(var e=a.Add.Annotations.Annotation[0][Fc],g=0;g<b[G];g++)e[B]({name:b[g]});d&&(a.Remove={Annotations:{Annotation:[{href:d}]}});return JSON.stringify(a)};
google[v].Na.xx=function(a){var b=JSON[od](a);a=[];if(!(b.Add&&b.Add.Annotations&&b.Add.Annotations.Annotation&&b.Add.Annotations.Annotation[0].Label))return a;for(var b=b.Add.Annotations.Annotation[0].Label,d=1;d<b[G];d++)a[B](b[d][md]);return a};google[v].History=function(a,b){this.hm=google[v][D].Vq();this.im=google[v][D].Wq();this.om=this.hm||this.im;var d=window[mc][zc];this.jx=0<=d[dd]("#")?d[Gd](0,d[dd]("#")):d;this.lm=!1;this.qx=b;d=google[v][D].jm(google[v][D].km());this.fm=d.Qq;this.we=d[uc];if(this.om){d=nh(this,google[v][D][H].sx);this.hm&&window[id]?(window[id]("popstate",d,!1),window[id]("hashchange",d,!1)):this.im&&(window[id]?window[id]("hashchange",d,!1):window[Ub]&&window[Ub]("onhashchange",d));var d=!1,e;for(e in this.we){d=
!0;break}d?this.Sq():this.Uq(a,!0)}};google[v][D].Jh="gsc.";google[v][D].Xg=google[v][D].Jh+"q";google[v][D].rj=google[v][D].Jh+"tab";google[v][D].qj=google[v][D].Jh+"ref";google[v][D].Zc=google[v][D].Jh+"page";google[v][D].Vi=google[v][D].Jh+"sort";var fi={};fi[google[v][D].Xg]=!0;fi[google[v][D].rj]=!0;fi[google[v][D].Zc]=!0;fi[google[v][D].qj]=!0;fi[google[v][D].Vi]=!0;google[v][D].fy=fi;var gi={};gi[google[v][D].rj]=!0;gi[google[v][D].Zc]=!0;google[v][D].Xx=gi;
google[v][D].Vq=function(){return!(!window[wd]||!window[wd][vb])};google[v][D].Wq=function(){return"onhashchange"in window&&(!mh()||8<=h.documentMode)};google[v][D].isSupported=function(){return google[v][D].Vq()||google[v][D].Wq()};google[v][D].Vv=function(){var a=google[v][D].jm(google[v][D].km())[uc],b;for(b in a)return!0;return!1};M=google[v][D][H];M.isEnabled=function(){return this.om};M.pushState=function(a){this.om&&!this.lm&&this.Uq(a,!1)};
M.Uq=function(a,b){a=google[v][D].Kx(a);if(!google[v][D].$q(this.we,a)){this.we=a;var d=google[v][D].Lx(a);this.fm&&(d=this.fm+"&"+d);if(this.hm){var e=h[pd]||"",d="#"+d;b?window[wd].replaceState(null,e,d):window[wd][vb](null,e,d)}else this.im&&(d=this.jx+"#"+d,b?window[mc][r](d):Oa(window[mc],d))}};M.Rg=function(){var a={},b;for(b in this.we)a[b]=this.we[b];return a};M.sx=function(){var a=google[v][D].jm(google[v][D].km());this.fm=a.Qq;google[v][D].$q(this.we,a[uc])||(this.we=a[uc],this.Sq())};
M.Sq=function(){this.lm=!0;this.qx(this.Rg());this.lm=!1};google[v][D].km=function(){var a=window[mc][zc],b=a[dd]("#");return 0>b?"":a[Gd](b+1)};google[v][D].vm=function(a){return!!google[v][D].fy[a]};google[v][D].$q=function(a,b){for(var d in a)if(a[d]!==b[d])return!1;for(d in b)if(!a[oc](d))return!1;return!0};google[v][D].Kx=function(a){var b={},d;for(d in a)google[v][D].vm(d)&&(b[d]=a[d]);return b};
google[v][D].Lx=function(a){var b=[],d;for(d in a)null!=a[d]&&google[v][D].vm(d)&&b[B](c(d)+"="+c(a[d]));return b[Nd]("&")};google[v][D].jm=function(a){var b={};a=a[hc]("&");for(var d=[],e=0;e<a[G];e++){var g=a[e],f=g[dd]("="),k=!1;if(-1!=f){var l=xa(g[cc](0,f));google[v][D].vm(l)&&(f=xa(g[cc](f+1)),google[v][D].Xx[l]?(f=ta(f,10),ha(f)||(b[l]=f)):b[l]=f,k=!0)}k||d[B](g)}return{state:b,Qq:d[Nd]("&")}};google[v].Ih=function(a,b){this.size=b||google[v].Ih.Zx;this[Dc]()};google[v].Ih.Zx=20;google[v].Ih[H].reset=function(){this.Cj=null;for(var a=0;a<this.size;a++)this.Sx(new google[v].mr);this.hr={};this.ir=null};google[v].Ih[H].Sx=function(a){a.next=this.Cj;a.or=null;null==this.Cj||(this.Cj.or=a);this.Cj=a};google[v].Ih[H].put=function(a,b){var d;a in this.hr&&(d=this.hr[a],d.set(a,b),this.ir==d&&(this.ir=null))};google[v].mr=function(){this.or=this.next=null};google[v].mr[H].set=function(){};google[v].A=function(){this.rt=google[v].A.Dl;google[v].A.Dl+=1;this.Fc=null;this.Ti=!0;this.va={width:100,height:75};this.Uc=google[v].A.Kf;this.Hj=1;this.Da(google[v].A.Zb);this.ml();this.gwsUrl=this.ta=this.Ma=this.oa=this.Ff=this.Xb=this.Bl=this.Ni=this.Cl=this.je=null;this.ed=[];this.eh={};this.Kd=this.Ze="";var a;if("object"===typeof window&&window[mc]&&window[mc][qc]&&""!=window[mc][qc]){if(""==Lh){var b=window[mc][qc][Od]()[hc](".");2>b[G]&&(Lh=".com");a=b.pop();b=b.pop();Lh=2==a[G]?Mh[b]&&
1==Mh[b][a]?"."+b+"."+a:"."+a:".com"}a=Lh}else a=".com";this.Ko=a;this.Rd=this.rd=null;this.N=!1};Rd("google.search.Search",google[v].A,void 0);google[v].A.Dl=0;google[v].A.qp=google[Ed][ld];google[v].A.BASE=google[v].A.qp;google[v].A.bw=/style=([^&]*)/;google[v].A.tc="large";google[v].A.LARGE_RESULTSET=google[v].A.tc;google[v].A.Zb="small";google[v].A.SMALL_RESULTSET=google[v].A.Zb;google[v].A.Hc="filtered_cse";google[v].A.FILTERED_CSE_RESULTSET=google[v].A.Hc;google[v].A.Gp=8;
google[v].A.LARGE_RESULTS=google[v].A.Gp;google[v].A.Nl=4;google[v].A.SMALL_RESULTS=google[v].A.Nl;google[v].A.Fp=10;google[v].A.FILTERED_CSE_RESULTS=google[v].A.Fp;google[v].A.ky="_top";google[v].A.LINK_TARGET_TOP=google[v].A.ky;google[v].A.En="_self";google[v].A.LINK_TARGET_SELF=google[v].A.En;google[v].A.jy="_parent";google[v].A.LINK_TARGET_PARENT=google[v].A.jy;google[v].A.Kf="_blank";google[v].A.LINK_TARGET_BLANK=google[v].A.Kf;google[v].A.oh="order-by-relevance";
google[v].A.ORDER_BY_RELEVANCE=google[v].A.oh;google[v].A.kd="order-by-date";google[v].A.ORDER_BY_DATE=google[v].A.kd;google[v].A.Qp="order-by-ascending-date";google[v].A.ORDER_BY_ASCENDING_DATE=google[v].A.Qp;google[v].A.aj="restrict-type";google[v].A.RESTRICT_TYPE=google[v].A.aj;google[v].A.Xa="restrict-safesearch";google[v].A.RESTRICT_SAFESEARCH=google[v].A.Xa;google[v].A.Vf="active";google[v].A.SAFESEARCH_STRICT=google[v].A.Vf;google[v].A.Uf="off";google[v].A.SAFESEARCH_OFF=google[v].A.Uf;
google[v].A.Fl="moderate";google[v].A.SAFESEARCH_MODERATE=google[v].A.Fl;google[v].A.Ja="restrict-extended";google[v].A.RESTRICT_EXTENDED_ARGS=google[v].A.Ja;google[v].A.sv=5E3;google[v].A.wv=google[Ed].ApiaryBase?google[Ed].ApiaryBase:"https://www.googleapis.com/customsearch/v1element";google[v].A.xv="AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY";google[v].A.lp=!1;google[v].A.Zy=Q;google[v].A.strings=google[v].A.Zy;google[v].A[H].Hh=function(){};
google[v].A.Jk=function(){if(google[v].LoadArgs){var a=xa(google[v].LoadArgs)[Ib](google[v].A.bw);if(a&&a[1])return a[1]}return null};google[v].A.wt=function(a){a=!!a||/\/v2\/default\.css$/[Qc](google[v].A.Jk()||"");return{rf:a,Wi:a,Wf:a,Sm:a,Mp:a}};google[v].A[H].Pi=function(a){a.Ma=this.Ma;a.jf=this.jf;a.Uc=this.Uc;a.Ka=this.Ka;a.Xb=this.Xb;a.Ti=this.Ti;this.va&&(a.va={},Aa(a.va,this.va[zb]),Qa(a.va,this.va[Hc]));a.Nh=this.Nh;a.eb=this.eb};
google[v].A[H].Cv=function(){var a=this.sc+"?hl="+google[v][Kd]+"&source=uds",a=this.ta?a+this.ta:a+"&q=";return this.gd&&""!=this.gd?this.gd:a};google[v].A[H].Fb=function(a){this.Ma=null==a||""==a?null:a};google[v].A[H].setQueryAddition=google[v].A[H].Fb;
google[v].A[H].Pc=function(a,b){var d=google[v].A.qp+this.Gc+"?callback="+a+"&rsz="+this.Ka+"&hl="+google[v][Kd];this.eb&&this.N&&(d=google[v].A.wv+"?key="+google[v].A.xv+"&rsz="+this.Ka+"&num="+this.jd()+"&hl="+google[v][Kd]+"&prettyPrint=false");this.jf&&(d+="&source="+c(this.jf));this.Ko&&(d+="&gss="+this.Ko);google[v].JSHash&&(d+="&sig="+google[v].JSHash);b&&(d+="&start="+b);return d};google[v].A[H].Sy=function(a){this.jf=a};google[v].A[H].setSearcherSrc=google[v].A[H].Sy;
google[v].A[H].Oa=function(a){this.Uc=a};google[v].A[H].setLinkTarget=google[v].A[H].Oa;google[v].A[H].ya=function(){return this.Uc&&""!=this.Uc?this.Uc:null};google[v].A[H].$d=function(){null==this.je&&(this.je="gsc-"+this.oa+"Result");return this.je};google[v].A[H].Ld=function(){null==this.Cl&&(this.Cl="gs-"+this.oa+"Result");return this.Cl};google[v].A[H].Hl=function(){null==this.Ni&&(this.Ni=Q[this.oa]);return this.Xb?this.Xb:this.Ni};google[v].A[H].getTabLabel=google[v].A[H].Hl;
google[v].A[H].hv=function(){null==this.Bl&&(this.Bl=Q[this.oa]);return this.Xb?this.Xb:this.Bl};google[v].A[H].Dy=function(){return this.Ka};google[v].A[H].getResultSetSize=google[v].A[H].Dy;google[v].A[H].Da=function(a){ha(ta(a,10))||(a=ta(a,10));if(0<a&&8>=a)this.Ka=a;else switch(a){case google[v].A.tc:this.Ka=google[v].A.tc;break;default:case google[v].A.Zb:this.Ka=google[v].A.Zb}};google[v].A[H].setResultSetSize=google[v].A[H].Da;
google[v].A[H].qa=function(a,b,d){var e=void 0;if(d&&0<d)if(this[ec]&&this[ec].pages&&this[ec].pages[d-1]&&this[ec].pages[d-1].start)e=this[ec].pages[d-1].start;else{var g=this.jd();g&&(e=g*(d-1))}d=this.dc(a,void 0,e);(b=Uh(b))&&(d+="&"+b);window._googleudsextrastuff&&(d+=window._googleudsextrastuff);b=this.eh[oc](d);if(d==this.Kd&&!b)return this.ip(),!1;e=(new Date)[Wb]();if(b&&e-this.eh[d]<google[v].A.sv)return!1;b&&(e=-1);this.eh[d]=e;this.cursor=null;this.Ze=a;this.Kd=d;this.Yd=this.op?this.op():
null;this.eb&&this.N?lh(google[v].A.mp(this,d)):gh(this.np(a,d),google[v][td]);if(this.ed&&0<this.ed[G])for(b=0;b<this.ed[G];b++)this.ed[b].qa(a);return!0};google[v].A[H].execute=google[v].A[H].qa;google[v].A.mp=function(a,b){var d="apiary"+oa[Ab](2E4*oa[wc]());google[v].A[d]=function(e){var g=200,f=null;e.error&&(g=e.error.code,f=e.error.message);a.nb(e,g,f,g,b);delete google[v].A[d]};return b+"&callback=google.search.Search."+d};
google[v].A[H].np=function(a,b){var d;d=b+(this.Yd?"&"+this.Yd:"");var e=this.Ac(a,b);return d+="&context="+e};google[v].A[H].vp=function(a){this[ec]&&a<this[ec].pages[G]&&(a=this.dc(this.Ze,void 0,this[ec].pages[a].start),this.cursor=null,this.Kd=a,this.eb&&this.N?lh(google[v].A.mp(this,a)):gh(this.np(this.Ze,a),google[v][td]))};google[v].A[H].gotoPage=google[v].A[H].vp;google[v].A[H].lj=function(){return this[ec]&&null!=this[ec].currentPageIndex?this[ec].currentPageIndex+1:null};
google[v].A[H].jd=function(){return ha(ta(this.Ka,10))?this.Ka==google[v].A.Zb?google[v].A.Nl:this.Ka==google[v].A.tc?google[v].A.Gp:this.Ka==google[v].A.Hc?google[v].A.Fp:google[v].A.Nl:this.Ka};google[v].A[H].getNumResultsPerPage=google[v].A[H].jd;google[v].A[H].ny=function(a){this.ed&&this.ed[B](a)};google[v].A[H].addRelatedSearcher=google[v].A[H].ny;google[v].A[H].zy=function(a,b,d){b=this.dc(a,b);if(null==d||void 0==d)d=this.Ac(a,b);return b+("&context="+d)+"&key="+google[Ed].ApiKey+"&v="+google[v][td]};
google[v].A[H].getExecuteUrl=google[v].A[H].zy;google[v].A[H].Mc=function(a){var b=zh("https://code.google.com/apis/ajaxsearch/faq.html",Q.watermark+" - "+this.ry(),"_blank","gs-watermark");R(a,b)};google[v].A[H].ry=function(){var a=new Date;return a.getMonth()+1+"/"+a.getFullYear()};
google[v].A[H].vf=function(a){var b;b=a.getFullYear();var d=a.getMonth(),e=Q["month-abbr"][d];a=a.getDate();10>a&&(a="0"+a);switch(google[v].ShortDatePattern){case "MDY":b=e+" "+a+", "+b;break;case "YMD":"zh-CN"==google[v][Kd]||"zh-TW"==google[v][Kd]||"ja"==google[v][Kd]||"ko"==google[v][Kd]?(e=hi[google[v][Kd]],b=b+e.year+(d+1)+e.month+a+e.day):b=b+" "+e+" "+a;break;default:case "DMY":b=a+" "+e+" "+b}return b};google[v].A[H].formatToShortDate=google[v].A[H].vf;
var hi={"zh-CN":{month:" \u6708 ",year:" \u5e74 ",day:" \u65e5 "},"zh-TW":{month:" \u6708 ",year:" \u5e74 ",day:" \u65e5 "},ja:{month:"\u6708",year:"\u5e74",day:"\u65e5"},ko:{month:" \uc6d4 ",year:" \ub144 ",day:" \uc77c "}};google[v].A.Tp=36E5;google[v].A.Xv=6E4;google[v].A.Wv=864E5;
google[v].A[H].cm=function(a){var b=(new Date)[Wb](),d=a[Wb]();if(b<d)return Q["n-minutes-ago"](2);b-=d;return b<google[v].A.Tp?(a=oa[Ab](b/google[v].A.Xv),Q["n-minutes-ago"](1>=a?2:a)):b<google[v].A.Wv?(a=oa[Ab](b/google[v].A.Tp),1>=a?Q["one-hour-ago"]:Q["n-hours-ago"](a)):this.vf(a)};google[v].A[H].formatToRelativeDate=google[v].A[H].cm;google[v].A[H].ml=function(){this.gwsUrl=null;this.results=[]};google[v].A[H].clearResults=google[v].A[H].ml;google[v].A[H].ip=function(){this.ur&&this.ur()};
google[v].A[H].Dv=function(a,b){if(a&&0<=a){var d=(new Date)[Wb](),e=d-a,g=b-a,f=[];if(1==d%100)if(this.N)f[B]("asa_"+this.oa+"_cse"),this.eb&&(google[v].A.lp?f[B]("asa_"+this.oa+"_cse_apiary_sub"):f[B]("asa_"+this.oa+"_cse_apiary_first"));else f[B]("asa_"+this.oa);0<f[G]&&google[Ed].recordCsiStat(f,["req."+e,"req2."+g])}};
google[v].A[H].nb=function(a,b,d,e,g){d=(new Date)[Wb]();var f;g&&(f=this.eh[g],delete this.eh[g]);if(!g||!this.Kd||g==this.Kd){this.gwsUrl=null;if(this.results&&0<this.results[G])for(g=0;g<this.results[G];g++)this.results[g].html&&ii(this.results[g].html);a&&a.results&&0<a.results[G]?(this.results=a.results,a[ec]&&a[ec].moreResultsUrl?this.gwsUrl=this.gd&&""!=this.gd?this.gd:a[ec].moreResultsUrl:this.ta&&this.sc&&(this.gwsUrl=this.Cv())):this.results=[];this.completionStatus=b;this.hashStatus=e;
this.zp=a&&a.resultAttribution&&null!=a.resultAttribution&&""!=a.resultAttribution?a.resultAttribution:null;a&&a[ec]&&a[ec].pages&&0<a[ec].pages[G]?this.cursor=a[ec]:"undefined"!=typeof this[ec]&&delete this[ec];if(a&&a.context){this.context=a.context;b=[];if(a.context.facets&&0<ta(a.context.total_results,10)){for(g=0;g<a.context.facets[G];g++)if(a.context.facets[g].facet_search_label){e=a.context.facets[g];var k=ta(e[nc],10);0<k&&(e.count=k,Aa(e,oa.ceil(100*k/ta(a.context.total_results,10))),b[B](e))}0<
b[G]&&b[Dd](function(a,b){return b[nc]-a[nc]})}this.context.display_facets=b}else"undefined"!=typeof this.context&&delete this.context;a&&a.promotions?this.promotions=a.promotions:"undefined"!=typeof this.promotions&&delete this.promotions;a&&a.omittedResults?this.omittedResults=a.omittedResults:"undefined"!=typeof this.omittedResults&&delete this.omittedResults;a&&a.spelling?this.spelling=a.spelling:"undefined"!=typeof this.spelling&&delete this.spelling;this.Ti&&this.Bv();this.ip();this.Dv(f,d);
this.eb&&(google[v].A.lp=!0)}};google[v].A[H].onSearchComplete=google[v].A[H].nb;google[v].A[H].Ym=function(){var a=null;this.zp&&(a=V(this.zp,"gs-results-attribution"));return a};google[v].A[H].getAttribution=google[v].A[H].Ym;google[v].A[H].zq=function(a){this.Nh=a};google[v].A[H].Bv=function(){var a,b;for(a=0;a<this.results[G];a++)b=this.results[a],this.Qa(b);(a=this.context)&&this.Hh(a)};google[v].A[H].bh=function(a,b,d){d||(d=[null]);this.ur=jh(a,b,d)};
google[v].A[H].setSearchCompleteCallback=google[v].A[H].bh;google[v].A[H].Wu=function(a,b){this.op=jh(a,b)};google[v].A.Kc=function(a,b,d){return 3==a[b][G]?new google[v].tr(a[b][1]||d&&d.prefetchQuery,a[b][2],a[b][0],d):new google[v].tr("","",a[b],d)};google[v].A.Rb=function(a,b){var d;if(a[G])for(var e=0;e<a[G];e++)if(null==a[e]){a[e]=b;d=e;break}d||(d=a[G],a[B](b));return d};google[v].A.AllocateCompletionMapContext=google[v].A.Rb;google[v].A[H].hc=function(a){this.Xb=a};
google[v].A[H].setUserDefinedLabel=google[v].A[H].hc;google[v].A[H].Uy=function(a){this.Ff=a};google[v].A[H].setUserDefinedClassSuffix=google[v].A[H].Uy;google[v].A[H].Ny=function(){this.Ti=!1};google[v].A[H].setNoHtmlGeneration=google[v].A[H].Ny;google[v].A.Yb=function(a,b,d,e,g){var f=oa.min(d[zb]/a,d[Hc]/b),f=oa.min(f,1),k={};Aa(k,oa[Wc](a*f));Qa(k,oa[Wc](b*f));e&&(Aa(e,k[zb]),Qa(e,k[Hc]),g&&$a(e[u],(d[zb]-k[zb])/2+"px"));return k};google[v].A.scaleImage=google[v].A.Yb;google[v].A.Vp=1;
google[v].A.VERTICAL_BRANDING=google[v].A.Vp;google[v].A.hy=2;google[v].A.HORIZONTAL_BRANDING=google[v].A.hy;google[v].A.yy=function(a,b,d){return Rh("gsc-",a,b&&b==google[v].A.Vp,d)};google[v].A.getBranding=google[v].A.yy;google[v].A.setOnLoadCallback=function(a,b){google.setOnLoadCallback(a,b)};google[v].A.setOnLoadCallback=google[v].A.setOnLoadCallback;var ji;function ii(a){ji||(ji=h[t]("DIV"));ji[p](a);Xa(ji,"")}
google[v].A[H].Dr=function(a){var b=this.rd;a&&(b=a);a={};var d=X(this.Ld());$(d,"gs-result");$(d,"gs-error-result");b=V(b,"gs-snippet");R(d,b);a.html=d;return a};google[v].A[H].Er=function(a){var b=this.Rd;a&&(b=a);a={};var d=X(this.Ld());$(d,"gs-result");$(d,"gs-no-results-result");b=V(b,"gs-snippet");R(d,b);a.html=d;return a};google[v].A[H].Hp=function(a){this.va=a};google[v].A[H].By=function(){return this.Kd};google[v].A[H].getLastQueryUrl=google[v].A[H].By;
google[v].tr=function(a,b,d){this.$h=a;this.Ic=b;this.Jc=d};ba("google.search.CurrentLocale",wa);ba("google.search.ShortDatePattern",da);google[v].za=function(){google[v].A[zd](this);this.oa="blog";this.Gc="/GblogSearch";this.sc="https://blogsearch.google.com/blogsearch";this.Kb=null;this.Lb=!1;this.of=!0;this.Fc=nh(this,google[v].za[H].hd);this.Se="gsc-blogConfig";this.ma=null};Rd("google.search.BlogSearch",google[v].za,void 0);eh(google[v].za,google[v].A);google[v].za.Va="GblogSearch";google[v].za.RESULT_CLASS=google[v].za.Va;google[v].za.Z=[];
google[v].za.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].za.Z,f,b);google[v].za.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].za.RawCompletion=google[v].za.Sa;google[v].za[H].Ac=function(a,b){return google[v].A.Rb(google[v].za.Z,[this,a,b])};google[v].za[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.BlogSearch.RawCompletion":b,d);this.Ma&&(a=a+" "+this.Ma);this.Kb&&(a=a+" blogurl:"+this.Kb);a="&q="+c(a);this.Lb&&(a+="&scoring=d");this.ta=a;return b+a};
google[v].za[H].Qa=function(a){a.html&&delete a.html;var b=X(this.Ld());$(b,"gs-result");var d;d=zh(a.postUrl,a[pd],this.ya(),"gs-title");R(b,d);d=new Date(a.publishedDate);d=V(this.vf(d),"gs-publishedDate");R(b,d);d=new Date(a.publishedDate);d=V(this.cm(d),"gs-relativePublishedDate");R(b,d);d=V(a[Cb],"gs-snippet");R(b,d);d=zh(a.blogUrl,a.blogUrl,this.ya(),"gs-visibleUrl");R(b,d);a.html=b;this.Mc(a.html)};google[v].za[H].createResultHtml=google[v].za[H].Qa;
google[v].za[H].Ub=function(a){this.Kb=null==a||""==a?null:a};google[v].za[H].setSiteRestriction=google[v].za[H].Ub;google[v].za[H].Gb=function(a){this.Lb=a==google[v].A.kd?!0:!1};google[v].za[H].setResultOrder=google[v].za[H].Gb;
google[v].za[H].hd=function(a,b){if(b){if(null==this.ma){var d=X("gsc-configSetting");this.ma=Fh(null,"0",this.Lb,"gsc-configSettingCheckbox");R(d,this.ma);R(d,V(Q["sort-by-date"],"gsc-configSettingCheckboxLabel"));var e=X("gsc-configSettingSubmit");R(e,Ch(Q[rc],"gsc-configSettingSubmit"));R(d,e);R(a,d)}else Fa(this.ma,this.Lb);this.ma[Jb]()}else this.ma&&(this.ma[fc]?this.Gb(google[v].A.kd):this.Gb(google[v].A.oh))};google[v].ia=function(){google[v].A[zd](this);this.oa="book";this.Gc="/GbookSearch";this.sc="https://books.google.com/books";this.cj=!1;this.dj=null};Rd("google.search.BookSearch",google[v].ia,void 0);eh(google[v].ia,google[v].A);google[v].ia.Va="GbookSearch";google[v].ia.RESULT_CLASS=google[v].ia.Va;google[v].ia.Dp="user-list";google[v].ia.USER_LIST=google[v].ia.Dp;google[v].ia.Bp=1;google[v].ia.TYPE_ALL_BOOKS=google[v].ia.Bp;google[v].ia.Cp=2;google[v].ia.TYPE_FULL_VIEW_BOOKS=google[v].ia.Cp;
google[v].ia.Z=[];google[v].ia.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].ia.Z,f,b);google[v].ia.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].ia.RawCompletion=google[v].ia.Sa;google[v].ia[H].Ac=function(a,b){return google[v].A.Rb(google[v].ia.Z,[this,a,b])};
google[v].ia[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.BookSearch.RawCompletion":b,d);this.Ma&&(a=a+" "+this.Ma);a="&q="+c(a);this.cj&&(a+="&as_brr=1");this.dj&&(a=a+"&as_list="+this.dj);this.ta=a;return b+a};
google[v].ia[H].Qa=function(a){a.html&&delete a.html;a.thumbnailHtml=this.rm(a);var b=X(this.Ld());$(b,"gs-result");var d=X("gs-text-box"),e=uh(),g=vh(e,0),f=wh(g,"gs-image-box"),g=wh(g,"gs-text-box");R(f,a.thumbnailHtml[Ob](!0));R(g,d);R(b,e);e=zh(a.unescapedUrl,a[pd],this.ya(),"gs-title");R(d,e);e=V(Q.by+"&nbsp;"+a.authors,"gs-author");R(d,e);e=X("gs-spacer");R(d,e);a.publishedYear&&(e=V(a.publishedYear,"gs-publishedDate"),R(d,e));0<ta(a.pageCount,10)&&(e=V("-&nbsp;"+Q["page-count"](a.pageCount),
"gs-pageCount"),R(d,e));e=zh("https://books.google.com","books.google.com",this.ya(),"gs-visibleUrl");R(d,e);a.html=b;this.Mc(a.html)};google[v].ia[H].createResultHtml=google[v].ia[H].Qa;
google[v].ia[H].rm=function(a){var b=X("gs-image-box gs-book-image-box"),d=X("gs-row-1"),e=xh("https://books.google.com/googlebooks/pages-trans.gif",null,null,"gs-pages");R(d,e);e=xh("https://books.google.com/googlebooks/p_edge-trans.gif",null,null,"gs-page-edge");R(d,e);R(b,d);d=X("gs-row-2");e=google[v].A.Yb(a.tbWidth,a.tbHeight,this.va);e=xh(a.tbUrl,e[zb],e[Hc],"gs-image");a=yh(a.unescapedUrl,null,this.ya(),"gs-image");m(a,"gs-image");R(a,e);R(d,a);R(b,d);return b};
google[v].ia[H].Ra=function(a,b){a==google[v].A.aj?b?b==google[v].ia.Bp?this.cj=!1:b==google[v].ia.Cp?this.cj=!0:this.Ra(a,null):this.cj=!1:a==google[v].ia.Dp&&(b&&b[Ib](/^[a-zA-Z0-9\-_]*$/)?this.dj=b:this.dj=null)};google[v].ia[H].setRestriction=google[v].ia[H].Ra;google[v].D=function(){google[v].A[zd](this);this.Hj=2;this.oa="image";this.Gc="/GimageSearch";this.sc="https://images.google.com/images";this.Ia=null;this.fa={};this.rc=this.mc=this.qc=this.oc=this.nc=this.pc=null;this.Qb=google[v].D.cd;this.P=new google[v].uc;this.va={width:112,height:84}};Rd("google.search.ImageSearch",google[v].D,void 0);eh(google[v].D,google[v].A);google[v].D.Va="GimageSearch";google[v].D.RESULT_CLASS=google[v].D.Va;google[v].D.Gg="restrict-imagesize";
google[v].D.RESTRICT_IMAGESIZE=google[v].D.Gg;google[v].D.Am=["icon"];google[v].D.IMAGESIZE_SMALL=google[v].D.Am;google[v].D.zm=["small","medium","large","xlarge"];google[v].D.IMAGESIZE_MEDIUM=google[v].D.zm;google[v].D.ym=["xxlarge"];google[v].D.IMAGESIZE_LARGE=google[v].D.ym;google[v].D.xm=["huge"];google[v].D.IMAGESIZE_EXTRA_LARGE=google[v].D.xm;google[v].D.Eg="restrict-coloration";google[v].D.RESTRICT_COLORIZATION=google[v].D.Eg;google[v].D.fg="mono";google[v].D.COLORIZATION_BLACK_AND_WHITE=google[v].D.fg;
google[v].D.hg="gray";google[v].D.COLORIZATION_GRAYSCALE=google[v].D.hg;google[v].D.gg="color";google[v].D.COLORIZATION_COLOR=google[v].D.gg;google[v].D.Dg="restrict-colorfilter";google[v].D.RESTRICT_COLORFILTER=google[v].D.Dg;google[v].D.qg="red";google[v].D.COLOR_RED=google[v].D.qg;google[v].D.ng="orange";google[v].D.COLOR_ORANGE=google[v].D.ng;google[v].D.tg="yellow";google[v].D.COLOR_YELLOW=google[v].D.tg;google[v].D.mg="green";google[v].D.COLOR_GREEN=google[v].D.mg;google[v].D.rg="teal";
google[v].D.COLOR_TEAL=google[v].D.rg;google[v].D.jg="blue";google[v].D.COLOR_BLUE=google[v].D.jg;google[v].D.pg="purple";google[v].D.COLOR_PURPLE=google[v].D.pg;google[v].D.og="pink";google[v].D.COLOR_PINK=google[v].D.og;google[v].D.sg="white";google[v].D.COLOR_WHITE=google[v].D.sg;google[v].D.lg="gray";google[v].D.COLOR_GRAY=google[v].D.lg;google[v].D.ig="black";google[v].D.COLOR_BLACK=google[v].D.ig;google[v].D.kg="brown";google[v].D.COLOR_BROWN=google[v].D.kg;google[v].D.Fg="restrict-filetype";
google[v].D.RESTRICT_FILETYPE=google[v].D.Fg;google[v].D.wg="jpg";google[v].D.FILETYPE_JPG=google[v].D.wg;google[v].D.xg="png";google[v].D.FILETYPE_PNG=google[v].D.xg;google[v].D.vg="gif";google[v].D.FILETYPE_GIF=google[v].D.vg;google[v].D.ug="bmp";google[v].D.FILETYPE_BMP=google[v].D.ug;google[v].D.Hg="restrict-imagetype";google[v].D.RESTRICT_IMAGETYPE=google[v].D.Hg;google[v].D.zg="face";google[v].D.IMAGETYPE_FACES=google[v].D.zg;google[v].D.yg="clipart";google[v].D.IMAGETYPE_CLIPART=google[v].D.yg;
google[v].D.Ag="lineart";google[v].D.IMAGETYPE_LINEART=google[v].D.Ag;google[v].D.Bg="news";google[v].D.IMAGETYPE_NEWS=google[v].D.Bg;google[v].D.Cg="photo";google[v].D.IMAGETYPE_PHOTO=google[v].D.Cg;google[v].D.Ig="restrict-rights";google[v].D.RESTRICT_RIGHTS=google[v].D.Ig;google[v].D.Mg="(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived)";google[v].D.RIGHTS_REUSE=google[v].D.Mg;google[v].D.Kg="(cc_publicdomain|cc_attribute|cc_sharealike|cc_nonderived).-(cc_noncommercial)";
google[v].D.RIGHTS_COMMERCIAL_REUSE=google[v].D.Kg;google[v].D.Lg="(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial).-(cc_nonderived)";google[v].D.RIGHTS_MODIFICATION=google[v].D.Lg;google[v].D.Jg="(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)";google[v].D.RIGHTS_COMMERCIAL_MODIFICATION=google[v].D.Jg;google[v].D.$g=20;google[v].D.CSE_LARGE_RESULTSET=google[v].D.$g;google[v].D.Hd="popup";google[v].D.LAYOUT_POPUP=google[v].D.Hd;google[v].D.oe="column";
google[v].D.LAYOUT_COLUMN=google[v].D.oe;google[v].D.cd="classic";google[v].D.LAYOUT_CLASSIC=google[v].D.cd;google[v].D.Z=[];google[v].D.de={as_dt:!0,as_epq:!0,as_eq:!0,as_lq:!0,as_nlo:!0,as_nhi:!0,as_oq:!0,as_q:!0,as_qdr:!0,as_rq:!0,as_sitesearch:!0,cr:!0,c2coff:!0,filter:!0,gl:!0,hq:!0,lr:!0,query:!0,sort:!0};M=google[v].D[H];
M.oj=function(){var a=new google[v].D;this.Pi(a);a.Ia=this.Ia;a.fa=this.fa;a.pc=this.pc;a.nc=this.nc;a.oc=this.oc;a.qc=this.qc;a.mc=this.mc;a.rc=this.rc;a.Te(this.Qb);a.P=this.P[tc]();a.N=this.N;return a};M.nd=function(a){a=Th(a);return a[r](/\s+/g,"_")[Od]()};M.Xd=function(a){return this.N?this.P.Ga==this.nd(a):!1};M.zc=function(a){return this.N&&this.P.Ga?a[r](new RegExp(" more:"+this.P.Ga+"$"),""):a};M.$d=function(){return this.je=["gsc-"+this.oa+"Result","gsc-"+this.oa+"Result-"+this.Qb][Nd](" ")};
google[v].D.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].D.Z,f,b);google[v].D.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].D.RawCompletion=google[v].D.Sa;google[v].D[H].Ac=function(a,b){return google[v].A.Rb(google[v].D.Z,[this,a,b])};
google[v].D[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.ImageSearch.RawCompletion":b,d);this.eb&&this.N&&(b+="&searchtype=image");a=[a];this.Ma&&a[B](this.Ma);a=a[Eb](this.P.qe())[Nd](" ");var e=this.P.pe(),g=[],f;for(f in e)g[B](f+"="+e[f]);f="&"+g[Nd]("&");f=f+"&q="+c(a);this.Ia&&(f=f+"&safe="+this.Ia);this.pc&&(f=f+"&imgsz="+c(this.pc));this.nc&&(f=f+"&imgc="+c(this.nc));this.oc&&(f=f+"&imgcolor="+c(this.oc));this.qc&&(f=f+"&imgtype="+c(this.qc));this.mc&&(f=f+"&as_filetype="+c(this.mc));
this.rc&&(f=f+"&as_rights="+c(this.rc));this.Kb&&(f=f+"&as_sitesearch="+c(this.Kb));this.fa&&(a=Uh(this.fa))&&(f+="&"+a);b+=f;this.ta=f;d&&0!=d&&(this.ta=this.ta+"&start="+d);window[qd][Ed].GoogleLocale&&this.eb&&this.N&&(b+="&googlehost="+c(window[qd][Ed].GoogleLocale));return b};
google[v].D[H].Qa=function(a){a.html&&delete a.html;nb(a,this.ya()||void 0);a.html=google[v].ga.ka("imageResult_"+this.Qb,a);for(var b=google[v].D.Yb(a.tbWidth,a.tbHeight,this.va),d=a.html[Lb];d;d=d[Vb])if(1==d[Yc]){for(var e=d[ac]("img"),g=[],f=0,k=e[0];k=e[f];++f)g[f]=k;"IMG"==d[Cc][Ld]()&&g[B](d);for(e=0;k=g[e];++e)Jh(k,"gs-image-scalable")&&(Aa(k[u],b[zb]+"px"),Qa(k[u],b[Hc]+"px"))}this.Mc(a.html)};google[v].D[H].createResultHtml=google[v].D[H].Qa;google[v].D[H].Dm=function(){return this.Qb};
google[v].D[H].getLayout=google[v].D[H].Dm;google[v].D[H].Te=function(a){if(a==google[v].D.cd||a==google[v].D.oe||a==google[v].D.Hd){var b=this.results;if(this.Qb!=a&&b)for(var d=0;d<b[G];d++){var e=b[d];e.html&&delete e.html}this.Qb=a;a==google[v].D.cd?this.va={width:112,height:84}:a==google[v].D.oe?this.va={width:112,height:168}:a==google[v].D.Hd&&(this.va={width:224,height:84})}};google[v].D[H].setLayout=google[v].D[H].Te;
google[v].D[H].Ub=function(a,b){this.P=google[v].yc.hj(a,b);this.P instanceof google[v].Rc&&(this.N=!0,this.P[jd]()==google[v].K.Qc&&(this.rd=Q["linked-cse-error-results"]))};google[v].D[H].setSiteRestriction=google[v].D[H].Ub;M=google[v].D[H];M.th=function(){return this.N?this.P[jd]():null};M.uh=function(){return this.N?this.P.yf:null};M.lc=function(){return this.N?this.P.Ga:null};M.pj=function(a){this.N&&a&&this.P.wj(a)};
M.Da=function(a){ha(ta(a,10))||(a=ta(a,10));this.N&&(0<a&&a<=google[v].D.$g||google[v].A.Hc==a)?this.Ka=a:google[v].A[H].Da[zd](this,a)};google[v].D[H].setResultSetSize=google[v].D[H].Da;google[v].D[H].jd=function(){var a=google[v].A[H].jd[zd](this);return this.N&&a&&"number"!=typeof this.Ka?2*a:a};google[v].D[H].getNumResultsPerPage=google[v].D[H].jd;
google[v].D[H].Ra=function(a,b){a==google[v].A.Xa?this.Ia=b?b==google[v].A.Vf||b==google[v].A.Uf?b:null:null:a==google[v].D.Gg?this.pc=b?b[Nd]("|"):null:a==google[v].D.Eg?this.nc=b?b==google[v].D.fg||b==google[v].D.hg||b==google[v].D.gg?b:null:null:a==google[v].D.Dg?this.oc=b?b==google[v].D.qg||b==google[v].D.ng||b==google[v].D.tg||b==google[v].D.mg||b==google[v].D.rg||b==google[v].D.jg||b==google[v].D.pg||b==google[v].D.og||b==google[v].D.sg||b==google[v].D.lg||b==google[v].D.ig||b==google[v].D.kg?
b:null:null:a==google[v].D.Fg?this.mc=b?b==google[v].D.wg||b==google[v].D.xg||b==google[v].D.vg||b==google[v].D.ug?b:null:null:a==google[v].D.Hg?this.qc=b?b==google[v].D.zg||b==google[v].D.yg||b==google[v].D.Ag||b==google[v].D.Bg||b==google[v].D.Cg?b:null:null:a==google[v].D.Ig&&(this.rc=b?b==google[v].D.Mg||b==google[v].D.Kg||b==google[v].D.Lg||b==google[v].D.Jg?b:null:null);if(a==google[v].A.Ja)if(b)for(var d in b){var e=b[d];google[v].D.de[d]&&(this.fa[d]=e)}else this.fa={}};
google[v].D[H].setRestriction=google[v].D[H].Ra;google[v].D.Yb=function(a,b,d,e,g){var f=oa.min(d[zb]/a,d[Hc]/b),k={};Aa(k,oa[Wc](a*f));Qa(k,oa[Wc](b*f));e&&(Aa(e,k[zb]),Qa(e,k[Hc]),g&&$a(e[u],(d[zb]-k[zb])/2+"px"));return k};google[v].D.scaleImage=google[v].D.Yb;
google[v].D.Hm=function(a){var b=a[Sb][0],d=a[Sb][1];if("block"==d[u][Gc])return!1;Pa(d[u],"block");db(a[u],4E3);var e=d[Sb][0],g=d[Sb][1],f=b[ac]("img")[0],k=d[ac]("img")[0],l={width:k[Db],height:k[Nc]};k[Db]<f[Db]?l={width:f[Db],height:2*f[Nc]}:k[Nc]<f[Nc]&&(l={width:f[Db],height:f[Nc]});google[v].D.Yb(k[Db],k[Nc],l,k);Aa(d[u],d[Db]>2*b[Db]?2*b[Db]+"px":oa.max(e[Db],g[Db]));b=Xh(f,a)+f[Db]/2;a=Yh(f,a)+f[Nc]/2;f=Xh(k,d)+k[Db]/2;k=Yh(k,d)+k[Nc]/2;0===qa.appName[dd]("Microsoft")?($a(d[tb](),b-f+"px"),
d[tb]().top=a-k+"px"):(d.offsetLeft=b-f+"px",d.offsetTop=a-k+"px");return!1};google[v].D.showPopup=google[v].D.Hm;google[v].D.Em=function(a){a=a[Sb][1];if("none"==a[u][Gc])return!1;Pa(a[u],"none");db(a[Jd][u],0);return!1};google[v].D.hidePopup=google[v].D.Em;google[v].D[H].Oa=function(a){google[v].A[H].Oa[zd](this,a)};google[v].D[H].setLinkTarget=google[v].D[H].Oa;google[v].D[H].Fb=function(a){google[v].A[H].Fb[zd](this,a)};google[v].D[H].setQueryAddition=google[v].D[H].Fb;google[v].C=function(){google[v].A[zd](this);this.Hj=2;this.oa="image";this.Gc="/GcustomimageSearch";this.sc="https://images.google.com/images";this.Ia=null;this.fa={};this.rc=this.mc=this.qc=this.oc=this.nc=this.pc=null;this.Qb=google[v].C.cd;this.P=new google[v].uc;this.va={width:112,height:84}};Rd("google.search.CustomImageSearch",google[v].C,void 0);eh(google[v].C,google[v].A);google[v].C.Va="GcustomimageSearch";google[v].C.RESULT_CLASS=google[v].C.Va;google[v].C.Gg="restrict-imagesize";
google[v].C.RESTRICT_IMAGESIZE=google[v].C.Gg;google[v].C.Am=["icon"];google[v].C.IMAGESIZE_SMALL=google[v].C.Am;google[v].C.zm=["small","medium","large","xlarge"];google[v].C.IMAGESIZE_MEDIUM=google[v].C.zm;google[v].C.ym=["xxlarge"];google[v].C.IMAGESIZE_LARGE=google[v].C.ym;google[v].C.xm=["huge"];google[v].C.IMAGESIZE_EXTRA_LARGE=google[v].C.xm;google[v].C.Eg="restrict-coloration";google[v].C.RESTRICT_COLORIZATION=google[v].C.Eg;google[v].C.fg="mono";google[v].C.COLORIZATION_BLACK_AND_WHITE=google[v].C.fg;
google[v].C.hg="gray";google[v].C.COLORIZATION_GRAYSCALE=google[v].C.hg;google[v].C.gg="color";google[v].C.COLORIZATION_COLOR=google[v].C.gg;google[v].C.Dg="restrict-colorfilter";google[v].C.RESTRICT_COLORFILTER=google[v].C.Dg;google[v].C.qg="red";google[v].C.COLOR_RED=google[v].C.qg;google[v].C.ng="orange";google[v].C.COLOR_ORANGE=google[v].C.ng;google[v].C.tg="yellow";google[v].C.COLOR_YELLOW=google[v].C.tg;google[v].C.mg="green";google[v].C.COLOR_GREEN=google[v].C.mg;google[v].C.rg="teal";
google[v].C.COLOR_TEAL=google[v].C.rg;google[v].C.jg="blue";google[v].C.COLOR_BLUE=google[v].C.jg;google[v].C.pg="purple";google[v].C.COLOR_PURPLE=google[v].C.pg;google[v].C.og="pink";google[v].C.COLOR_PINK=google[v].C.og;google[v].C.sg="white";google[v].C.COLOR_WHITE=google[v].C.sg;google[v].C.lg="gray";google[v].C.COLOR_GRAY=google[v].C.lg;google[v].C.ig="black";google[v].C.COLOR_BLACK=google[v].C.ig;google[v].C.kg="brown";google[v].C.COLOR_BROWN=google[v].C.kg;google[v].C.Fg="restrict-filetype";
google[v].C.RESTRICT_FILETYPE=google[v].C.Fg;google[v].C.wg="jpg";google[v].C.FILETYPE_JPG=google[v].C.wg;google[v].C.xg="png";google[v].C.FILETYPE_PNG=google[v].C.xg;google[v].C.vg="gif";google[v].C.FILETYPE_GIF=google[v].C.vg;google[v].C.ug="bmp";google[v].C.FILETYPE_BMP=google[v].C.ug;google[v].C.Hg="restrict-imagetype";google[v].C.RESTRICT_IMAGETYPE=google[v].C.Hg;google[v].C.zg="face";google[v].C.IMAGETYPE_FACES=google[v].C.zg;google[v].C.yg="clipart";google[v].C.IMAGETYPE_CLIPART=google[v].C.yg;
google[v].C.Ag="lineart";google[v].C.IMAGETYPE_LINEART=google[v].C.Ag;google[v].C.Bg="news";google[v].C.IMAGETYPE_NEWS=google[v].C.Bg;google[v].C.Cg="photo";google[v].C.IMAGETYPE_PHOTO=google[v].C.Cg;google[v].C.Ig="restrict-rights";google[v].C.RESTRICT_RIGHTS=google[v].C.Ig;google[v].C.Mg="(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial|cc_nonderived)";google[v].C.RIGHTS_REUSE=google[v].C.Mg;google[v].C.Kg="(cc_publicdomain|cc_attribute|cc_sharealike|cc_nonderived).-(cc_noncommercial)";
google[v].C.RIGHTS_COMMERCIAL_REUSE=google[v].C.Kg;google[v].C.Lg="(cc_publicdomain|cc_attribute|cc_sharealike|cc_noncommercial).-(cc_nonderived)";google[v].C.RIGHTS_MODIFICATION=google[v].C.Lg;google[v].C.Jg="(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)";google[v].C.RIGHTS_COMMERCIAL_MODIFICATION=google[v].C.Jg;google[v].C.$g=20;google[v].C.CSE_LARGE_RESULTSET=google[v].C.$g;google[v].C.Hd="popup";google[v].C.LAYOUT_POPUP=google[v].C.Hd;google[v].C.oe="column";
google[v].C.LAYOUT_COLUMN=google[v].C.oe;google[v].C.cd="classic";google[v].C.LAYOUT_CLASSIC=google[v].C.cd;google[v].C.Z=[];google[v].C.de={as_dt:!0,as_epq:!0,as_eq:!0,as_lq:!0,as_nlo:!0,as_nhi:!0,as_oq:!0,as_q:!0,as_qdr:!0,as_rq:!0,as_sitesearch:!0,cr:!0,c2coff:!0,filter:!0,gl:!0,hq:!0,lr:!0,query:!0,sort:!0};M=google[v].C[H];
M.oj=function(){var a=new google[v].C;this.Pi(a);a.Ia=this.Ia;a.fa=this.fa;a.pc=this.pc;a.nc=this.nc;a.oc=this.oc;a.qc=this.qc;a.mc=this.mc;a.rc=this.rc;a.Te(this.Qb);a.P=this.P[tc]();a.N=this.N;return a};M.nd=function(a){a=Th(a);return a[r](/\s+/g,"_")[Od]()};M.Xd=function(a){return this.N?this.P.Ga==this.nd(a):!1};M.zc=function(a){return this.N&&this.P.Ga?a[r](new RegExp(" more:"+this.P.Ga+"$"),""):a};M.$d=function(){return this.je=["gsc-"+this.oa+"Result","gsc-"+this.oa+"Result-"+this.Qb][Nd](" ")};
google[v].C.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].C.Z,f,b);google[v].C.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].C.RawCompletion=google[v].C.Sa;google[v].C[H].Ac=function(a,b){return google[v].A.Rb(google[v].C.Z,[this,a,b])};
google[v].C[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.CustomImageSearch.RawCompletion":b,d);this.eb&&this.N&&(b+="&searchtype=image");a=[a];this.Ma&&a[B](this.Ma);a=a[Eb](this.P.qe())[Nd](" ");var e=this.P.pe(),g=[],f;for(f in e)g[B](f+"="+e[f]);f="&"+g[Nd]("&");f=f+"&q="+c(a);this.Ia&&(f=f+"&safe="+this.Ia);this.pc&&(f=f+"&imgsz="+c(this.pc));this.nc&&(f=f+"&imgc="+c(this.nc));this.oc&&(f=f+"&imgcolor="+c(this.oc));this.qc&&(f=f+"&imgtype="+c(this.qc));this.mc&&(f=f+"&as_filetype="+
c(this.mc));this.rc&&(f=f+"&as_rights="+c(this.rc));this.Kb&&(f=f+"&as_sitesearch="+c(this.Kb));this.fa&&(a=Uh(this.fa))&&(f+="&"+a);b+=f;this.ta=f;d&&0!=d&&(this.ta=this.ta+"&start="+d);window[qd][Ed].GoogleLocale&&this.eb&&this.N&&(b+="&googlehost="+c(window[qd][Ed].GoogleLocale));return b};
google[v].C[H].Qa=function(a){a.html&&delete a.html;nb(a,this.ya()||void 0);a.html=google[v].ga.ka("imageResult_"+this.Qb,a);for(var b=google[v].C.Yb(a.tbWidth,a.tbHeight,this.va),d=a.html[Lb];d;d=d[Vb])if(1==d[Yc]){for(var e=d[ac]("img"),g=[],f=0,k=e[0];k=e[f];++f)g[f]=k;"IMG"==d[Cc][Ld]()&&g[B](d);for(e=0;k=g[e];++e)Jh(k,"gs-image-scalable")&&(Aa(k[u],b[zb]+"px"),Qa(k[u],b[Hc]+"px"))}this.Mc(a.html)};google[v].C[H].createResultHtml=google[v].C[H].Qa;google[v].C[H].Dm=function(){return this.Qb};
google[v].C[H].getLayout=google[v].C[H].Dm;google[v].C[H].Te=function(a){if(a==google[v].C.cd||a==google[v].C.oe||a==google[v].C.Hd){var b=this.results;if(this.Qb!=a&&b)for(var d=0;d<b[G];d++){var e=b[d];e.html&&delete e.html}this.Qb=a;a==google[v].C.cd?this.va={width:112,height:84}:a==google[v].C.oe?this.va={width:112,height:168}:a==google[v].C.Hd&&(this.va={width:224,height:84})}};google[v].C[H].setLayout=google[v].C[H].Te;
google[v].C[H].Ub=function(a,b){this.P=google[v].yc.hj(a,b);this.P instanceof google[v].Rc&&(this.N=!0,this.P[jd]()==google[v].G.Qc&&(this.rd=Q["linked-cse-error-results"]))};google[v].C[H].setSiteRestriction=google[v].C[H].Ub;M=google[v].C[H];M.th=function(){return this.N?this.P[jd]():null};M.uh=function(){return this.N?this.P.yf:null};M.lc=function(){return this.N?this.P.Ga:null};M.pj=function(a){this.N&&a&&this.P.wj(a)};
M.Da=function(a){ha(ta(a,10))||(a=ta(a,10));this.N&&(0<a&&a<=google[v].C.$g||google[v].A.Hc==a)?this.Ka=a:google[v].A[H].Da[zd](this,a)};google[v].C[H].setResultSetSize=google[v].C[H].Da;google[v].C[H].jd=function(){var a=google[v].A[H].jd[zd](this);return this.N&&a&&"number"!=typeof this.Ka?2*a:a};google[v].C[H].getNumResultsPerPage=google[v].C[H].jd;
google[v].C[H].Ra=function(a,b){a==google[v].A.Xa?this.Ia=b?b==google[v].A.Vf||b==google[v].A.Uf?b:null:null:a==google[v].C.Gg?this.pc=b?b[Nd]("|"):null:a==google[v].C.Eg?this.nc=b?b==google[v].C.fg||b==google[v].C.hg||b==google[v].C.gg?b:null:null:a==google[v].C.Dg?this.oc=b?b==google[v].C.qg||b==google[v].C.ng||b==google[v].C.tg||b==google[v].C.mg||b==google[v].C.rg||b==google[v].C.jg||b==google[v].C.pg||b==google[v].C.og||b==google[v].C.sg||b==google[v].C.lg||b==google[v].C.ig||b==google[v].C.kg?
b:null:null:a==google[v].C.Fg?this.mc=b?b==google[v].C.wg||b==google[v].C.xg||b==google[v].C.vg||b==google[v].C.ug?b:null:null:a==google[v].C.Hg?this.qc=b?b==google[v].C.zg||b==google[v].C.yg||b==google[v].C.Ag||b==google[v].C.Bg||b==google[v].C.Cg?b:null:null:a==google[v].C.Ig&&(this.rc=b?b==google[v].C.Mg||b==google[v].C.Kg||b==google[v].C.Lg||b==google[v].C.Jg?b:null:null);if(a==google[v].A.Ja)if(b)for(var d in b){var e=b[d];google[v].C.de[d]&&(this.fa[d]=e)}else this.fa={}};
google[v].C[H].setRestriction=google[v].C[H].Ra;google[v].C.Yb=function(a,b,d,e,g){var f=oa.min(d[zb]/a,d[Hc]/b),k={};Aa(k,oa[Wc](a*f));Qa(k,oa[Wc](b*f));e&&(Aa(e,k[zb]),Qa(e,k[Hc]),g&&$a(e[u],(d[zb]-k[zb])/2+"px"));return k};google[v].C.scaleImage=google[v].C.Yb;
google[v].C.Hm=function(a){var b=a[Sb][0],d=a[Sb][1];if("block"==d[u][Gc])return!1;Pa(d[u],"block");db(a[u],4E3);var e=d[Sb][0],g=d[Sb][1],f=b[ac]("img")[0],k=d[ac]("img")[0],l={width:k[Db],height:k[Nc]};k[Db]<f[Db]?l={width:f[Db],height:2*f[Nc]}:k[Nc]<f[Nc]&&(l={width:f[Db],height:f[Nc]});google[v].C.Yb(k[Db],k[Nc],l,k);Aa(d[u],d[Db]>2*b[Db]?2*b[Db]+"px":oa.max(e[Db],g[Db]));b=Xh(f,a)+f[Db]/2;a=Yh(f,a)+f[Nc]/2;f=Xh(k,d)+k[Db]/2;k=Yh(k,d)+k[Nc]/2;0===qa.appName[dd]("Microsoft")?($a(d[tb](),b-f+"px"),
d[tb]().top=a-k+"px"):(d.offsetLeft=b-f+"px",d.offsetTop=a-k+"px");return!1};google[v].C.showPopup=google[v].C.Hm;google[v].C.Em=function(a){a=a[Sb][1];if("none"==a[u][Gc])return!1;Pa(a[u],"none");db(a[Jd][u],0);return!1};google[v].C.hidePopup=google[v].C.Em;google[v].C[H].Oa=function(a){google[v].A[H].Oa[zd](this,a)};google[v].C[H].setLinkTarget=google[v].C[H].Oa;google[v].C[H].Fb=function(a){google[v].A[H].Fb[zd](this,a)};google[v].C[H].setQueryAddition=google[v].C[H].Fb;google[v].H=function(){google[v].A[zd](this);this.xc=null;this.wc="San Francisco, CA";this.Oc={y:37.77916,x:-122.42009};this.qf=null;this.ih=!0;this.jh=!1;this.sf=null;this.of=!0;this.Fc=nh(this,this.hd);this.Se="gsc-locationConfig";this.oa="local";this.Gc="/GlocalSearch";this.sc="https://www.google.com/local";this.uf=this.yb=null};Rd("google.search.LocalSearch",google[v].H,void 0);eh(google[v].H,google[v].A);google[v].H.Va="GlocalSearch";google[v].H.RESULT_CLASS=google[v].H.Va;google[v].H.wp="blended";
google[v].H.TYPE_BLENDED_RESULTS=google[v].H.wp;google[v].H.xp="kmlonly";google[v].H.TYPE_KMLONLY_RESULTS=google[v].H.xp;google[v].H.yp="localonly";google[v].H.TYPE_LOCALONLY_RESULTS=google[v].H.yp;google[v].H.Hq="disabled";google[v].H.ADDRESS_LOOKUP_DISABLED=google[v].H.Hq;google[v].H.Iq="enabled";google[v].H.ADDRESS_LOOKUP_ENABLED=google[v].H.Iq;google[v].H.Nq=0;google[v].H.STATIC_MAP_ZOOM_FARTHEST=google[v].H.Nq;google[v].H.ly=13;google[v].H.STATIC_MAP_ZOOM_DEFAULT=google[v].H.ly;
google[v].H.Mq=21;google[v].H.STATIC_MAP_ZOOM_CLOSEST=google[v].H.Mq;google[v].H.dm=8;google[v].H.STATIC_MAP_MAX_POINTS=google[v].H.dm;google[v].H.fx=3.141592653589;google[v].H.ex=6367E3;google[v].H.gx=16093;google[v].H.Z=[];google[v].H.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].H.Z,f,b);google[v].H.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].H.RawCompletion=google[v].H.Sa;
google[v].H[H].nb=function(a,b,d,e,g){g&&this.Kd&&g!=this.Kd||(this.resultViewport=a&&a.viewport?a.viewport:null,google[v].A[H].nb[zd](this,a,b,d,e,g))};google[v].H[H].Ac=function(a,b){return google[v].A.Rb(google[v].H.Z,[this,a,b])};google[v].H[H].qa=function(a,b,d){window[Ac]&&window[Ac].log&&window[Ac].log("The Google Local Search API is deprecated. Please migrate to the Google Places API (https://developers.google.com/places)");return google[v].A[H].qa[zd](this,a,b,d)};
google[v].H[H].execute=google[v].H[H].qa;
google[v].H[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.LocalSearch.RawCompletion":b,d);d="";d="&q="+c(a);b+=d;this.viewport=null;if(this.xc){var e,g;this.ih?(e=this.xc.getCenterLatLng(),g=this.xc.getSpanLatLng(),a="&sll="+e.y+","+e.x,a+="&sspn="+g[Hc]+","+g[zb]):(e=this.xc.getCenter(),g=this.xc.getBounds().toSpan().toUrlValue(),a="&sll="+e.y+","+e.x,a+="&sspn="+g);a+=google[v].H.Zl(e.y,e.x);b+=a;d+=a}else this.Oc?(a="&sll="+this.Oc.y+","+this.Oc.x,this.qf&&(a=a+"&sspn="+this.qf.lat+","+
this.qf.lng),a+=google[v].H.Zl(this.Oc.y,this.Oc.x),b+=a,d+=a):this.wc&&(a="&near="+c(this.wc),b+=a,d+=a);this.jh&&(b+="&nogeocode=t",d+="&nogeocode=t");this.sf&&(b+="&mrt="+c(this.sf),d+="&mrt="+c(this.sf));d&&(this.ta=d);return b};google[v].H.Zl=function(a,b){var d=google[v].H.gx/google[v].H.ex*4*google[v].H.fx;return"&gll="+oa[Ab](1E6*(a-d))+","+oa[Ab](1E6*(b-d))+","+oa[Ab](1E6*(a+d))+","+oa[Ab](1E6*(b+d))+"&llsep=500,500"};google[v].H.centerToGll=google[v].H.Zl;
google[v].H[H].Qa=function(a){a.html&&delete a.html;var b=X(this.Ld());$(b,"gs-result");var d;d=zh(a.url,a[pd],this.ya(),"gs-title");R(b,d);"kml"==a.listingType&&a[Cb]&&""!=a[Cb]&&(d=V(a[Cb],"gs-snippet"),R(b,d));var e=X("gs-address");if(a.addressLines&&0<a.addressLines[G])for(var g=0;g<a.addressLines[G];g++){d=a.addressLines[g];var f="gs-addressLine";0==g?f="gs-street gs-addressLine":1==g&&(f="gs-city gs-addressLine");d=V(d,f);R(e,d)}else d=V(a.streetAddress,"gs-street"),R(e,d),g="",""!=a.city&&
(g=a.city,""!=a.region&&(g+=", ")),d=V(g,"gs-city"),R(e,d),d=V(a.region,"gs-region"),R(e,d);d=V(a.country,"gs-country");R(e,d);R(b,e);if(a.phoneNumbers&&a.phoneNumbers[G]){g=e=null;d=a.phoneNumbers[0];for(var k=0;k<a.phoneNumbers[G];k++){f=a.phoneNumbers[k];if("main"==f[jd]){e=f;break}if(""==f[jd]||"mobile"==f[jd]&&null==g)g=f}d=V((e?e:g?g:d).number,"gs-phone");R(b,d)}a.ddUrl&&""!=a.ddUrl&&(d=zh(a.ddUrl,Q.directions,this.ya(),"gs-directions"),R(b,d));a.ddUrlToHere&&""!=a.ddUrlToHere&&a.ddUrlFromHere&&
""!=a.ddUrlFromHere&&(d=X("gs-directions-to-from"),e=V(Q["get-directions"]+":","gs-label"),d[p](e),e=zh(a.ddUrlToHere,Q["to-here"],this.ya(),"gs-secondary-link"),d[p](e),e=V("-","gs-spacer"),d[p](e),e=zh(a.ddUrlFromHere,Q["from-here"],this.ya(),"gs-secondary-link"),d[p](e),R(b,d));a.html=b;this.Mc(a.html)};google[v].H[H].createResultHtml=google[v].H[H].Qa;
google[v].H[H].Zq=function(a){if(a.centerAndZoom)this.ih=!0,this.xc=a,this.Oc=null,this.wc="",this.yb&&(this.yb=null);else if(a.setCenter)this.ih=!1,this.xc=a,this.qf=this.Oc=null,this.wc="",this.yb&&(this.yb=null);else if(a.x&&a.y)this.ih=!0,this.Oc=a,this.xc=this.qf=null,this.wc="",this.yb&&(this.yb=null);else if(null!=a&&""!=a){this.ih=!0;this.xc=null;this.wc=a;this.Oc=null;this.yb&&(this.yb=null);var b=new google[v].H;b.bh(this,this.Rw,[b,a]);b.qa(a)}};google[v].H[H].setCenterPoint=google[v].H[H].Zq;
google[v].H[H].Rw=function(a,b){if(a.results&&a.results[G]){var d={};d.y=ua(a.results[0].lat);d.x=ua(a.results[0].lng);this.Oc=d;this.wc=b;this.of=!0;this.xc=null;a.resultViewport&&(d={},d.vA=ua(a.resultViewport.span.lat)/2,d.wA=ua(a.resultViewport.span.lng)/2,this.qf=d)}};
google[v].H[H].hd=function(a,b){if(b){if(null==this.yb){var d=null;if(null==this.xc){var e=X("gsc-configSetting");this.yb=Eh(null,"gsc-configSettingInput",""==this.wc?null:this.wc);R(e,V(Q["search-location"],"gsc-configSettingInputLabel"));R(e,this.yb);R(a,e);d=this.yb}e=X("gsc-configSetting");this.uf=Fh(null,"0",this.jh,"gsc-configSettingCheckbox");R(e,this.uf);R(e,V(Q["disable-address-lookup"],"gsc-configSettingCheckboxLabel"));null==d&&(d=this.uf);var g=V(null,"gsc-configSettingSubmit");R(g,Ch(Q[rc],
"gsc-configSettingSubmit"));R(e,g);R(a,e);d[Jb]()}}else this.yb&&(this.yb[cd]&&(this.wc=this.yb[cd],this.Zq(this.wc)),this.yb=null),this.uf&&(this.jh=this.uf[fc],this.uf=null),oh(a)};google[v].H[H].Iy=function(a){a==google[v].H.Hq?this.jh=!0:a==google[v].H.Iq&&(this.jh=!1)};google[v].H[H].setAddressLookupMode=google[v].H[H].Iy;
google[v].H.Lq=function(a,b,d,e){var g=a.staticMapUrl,g=g[r](/&size=\d*x\d*/,"&size="+d+"x"+b);e&&e<=google[v].H.Mq&&e>=google[v].H.Nq&&(g=g[r](/&zoom=\d*/,"&zoom="+e));return a.staticMapUrl=g};google[v].H.resizeStaticMapUrl=google[v].H.Lq;
google[v].H.sy=function(a,b,d,e){var g="",f={staticMapUrl:"https://maps.google.com/maps/api/staticmap?maptype=roadmap&size=150x100&zoom=13&format=gif&sensor=false"};b=google[v].H.Lq(f,b,d,e);null==e&&(b=b[r](/&zoom=\d*/,""));e=a[G];e>google[v].H.dm&&(e=google[v].H.dm);for(d=0;d<e;d++){var k;k=a[d];if(k.lat&&k.lng)"string"==typeof k.lat?(f=ua(k.lat),k=ua(k.lng)):(f=k.lat,k=k.lng);else if(k.x&&k.y)f=k.y,k=k.x;else return null;f="&markers=__ICONID____LAT__,__LNG__"[r](/__LAT__/,f);f=f[r](/__LNG__/,k);
k=65+d;f=1<e?f[r](/__ICONID__/,"label:"+va.fromCharCode(k)+"|"):f[r](/__ICONID__/,"");g+=f}return b+g};google[v].H.computeStaticMapUrl=google[v].H.sy;google[v].H[H].Ra=function(a,b){a==google[v].A.aj&&(b?(this.sf=null,this.sf=b==google[v].H.wp||b==google[v].H.xp||b==google[v].H.yp?b:null):this.sf=null)};google[v].H[H].setRestriction=google[v].H[H].Ra;google[v].la=function(){google[v].A[zd](this);this.oa="news";this.Gc="/GnewsSearch";this.sc="https://news.google.com/nwshp";this.tf="site:";this.Lb=!1;this.of=!0;this.Fc=nh(this,this.hd);this.Se="gsc-newsConfig";this.fa=this.ma=null};Rd("google.search.NewsSearch",google[v].la,void 0);eh(google[v].la,google[v].A);google[v].la.Va="GnewsSearch";google[v].la.RESULT_CLASS=google[v].la.Va;google[v].la.Jq="GnewsSearch.quote";google[v].la.QUOTE_RESULT_CLASS=google[v].la.Jq;google[v].la.Z=[];
google[v].la.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].la.Z,f,b);google[v].la.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].la.RawCompletion=google[v].la.Sa;google[v].la[H].Ac=function(a,b){return google[v].A.Rb(google[v].la.Z,[this,a,b])};
google[v].la[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.NewsSearch.RawCompletion":b,d);var e=null;a&&(e=a);this.Ma&&(e=null==e?this.Ma:e+" "+this.Ma);this.Kb&&(e=null==e?this.tf+this.Kb:e+" "+this.tf+this.Kb);a=e?"&q="+c(e):"";this.Lb&&(a+="&scoring=d");if(this.fa){var e="",g;for(g in this.fa)":"==g[Fb](0)&&(e+="&"+this.fa[g]);a+=e}this.Kb&&"source:"==this.tf&&(b=b[r](/&hl=.*&/,"&hl=en&"));this.ta=a;d&&0!=d&&(this.ta=this.ta+"&start="+d);return b+a};
google[v].la[H].Qa=function(a){a.html&&delete a.html;if(a.GsearchResultClass!=google[v].la.Jq){var b=X(this.Ld());$(b,"gs-result");var d;d=zh(a.unescapedUrl,a[pd],this.ya(),"gs-title");R(b,d);d=V(a.publisher,"gs-publisher");R(b,d);d=a[mc][hc](",");1<d[G]&&(d=V(", "+d[d[G]-1],"gs-location"),R(b,d));d=new Date(a.publishedDate);d=V(" - "+this.vf(d),"gs-publishedDate");R(b,d);d=new Date(a.publishedDate);d=V(" - "+this.cm(d),"gs-relativePublishedDate");R(b,d);d=V(a[Cb],"gs-snippet");R(b,d);a.clusterUrl&&
""!=a.clusterUrl&&(d=zh(a.clusterUrl,Q["related-articles"]+"&nbsp;&raquo;",this.ya(),"gs-clusterUrl"),R(b,d));a.html=b;this.Mc(a.html)}};google[v].la[H].createResultHtml=google[v].la[H].Qa;google[v].la[H].Ub=function(a){null==a||""==a?(this.Kb=null,this.tf="site:"):a[Ib]("[./:]")?(this.tf="site:",this.Kb=a):(this.tf="source:",this.Kb=a[r](/\s/g,"_"))};google[v].la[H].setSiteRestriction=google[v].la[H].Ub;google[v].la[H].Gb=function(a){this.Lb=a==google[v].A.kd?!0:!1};
google[v].la[H].setResultOrder=google[v].la[H].Gb;google[v].la[H].hd=function(a,b){if(b){if(null==this.ma){var d=X("gsc-configSetting");this.ma=Fh(null,"0",this.Lb,"gsc-configSettingCheckbox");R(d,this.ma);R(d,V(Q["sort-by-date"],"gsc-configSettingCheckboxLabel"));var e=X("gsc-configSettingSubmit");R(e,Ch(Q[rc],"gsc-configSettingSubmit"));R(d,e);R(a,d)}else Fa(this.ma,this.Lb);this.ma[Jb]()}else this.ma&&(this.ma[fc]?this.Gb(google[v].A.kd):this.Gb(google[v].A.oh))};
google[v].la[H].Rv={geo:!0,qsid:!0,quotesearch:!0,topic:!0,ned:!0,scoring:!0,as_mind:!0,as_minm:!0,as_miny:!0,as_maxd:!0,as_maxm:!0,as_maxy:!0};google[v].la[H].Ra=function(a,b){if(a==google[v].A.Ja)if(b)for(var d in b){var e=b[d];"undefined"!=typeof this.Rv[d]&&(this.fa=this.fa||{},this.fa[":"+d]=d+"="+c(e))}else this.fa=null};google[v].la[H].setRestriction=google[v].la[H].Ra;google[v].ca=function(){google[v].A[zd](this);this.oa="patent";this.Gc="/GpatentSearch";this.sc="https://www.google.com/patents";this.kp="";this.kh=null;this.of=!0;this.Fc=nh(this,this.hd);this.Se="gsc-patentConfig";this.ma=null};Rd("google.search.PatentSearch",google[v].ca,void 0);eh(google[v].ca,google[v].A);google[v].ca.Va="GpatentSearch";google[v].ca.RESULT_CLASS=google[v].ca.Va;google[v].ca.Ip=1;google[v].ca.TYPE_ANY_STATUS=google[v].ca.Ip;google[v].ca.Kp=2;google[v].ca.TYPE_ISSUED_PATENTS=google[v].ca.Kp;
google[v].ca.Jp=3;google[v].ca.TYPE_APPLICATIONS=google[v].ca.Jp;google[v].ca.Z=[];google[v].ca.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].ca.Z,f,b);google[v].ca.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].ca.RawCompletion=google[v].ca.Sa;google[v].ca[H].Ac=function(a,b){return google[v].A.Rb(google[v].ca.Z,[this,a,b])};
google[v].ca[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.PatentSearch.RawCompletion":b,d);this.Ma&&(a=a+" "+this.Ma);a="&q="+c(a)+this.kp;this.kh&&(a+=this.kh);this.ta=a;return b+a};
google[v].ca[H].Qa=function(a){a.html&&delete a.html;a.thumbnailHtml=this.rm(a);var b=X(this.Ld());$(b,"gs-result");var d=X("gs-text-box"),e=uh(),g=vh(e,0),f=wh(g,"gs-image-box"),g=wh(g,"gs-text-box");R(f,a.thumbnailHtml[Ob](!0));R(g,d);R(b,e);f=zh(a.unescapedUrl,a[pd],this.ya(),"gs-title");R(d,f);e=X("gs-patent-info gs-metadata");R(d,e);f=null;f=a.patentNumber?"issued"==a.patentStatus?Q["us-pat"]+"&nbsp;"+a.patentNumber:Q["us-pat-app"]+"&nbsp;"+a.patentNumber:Q["us-pat-app"]+"&nbsp; N/A";f=V(f,"gs-patent-number");
R(e,f);a.applicationDate&&(f=V(" - "+this.vf(new Date(a.applicationDate)),"gs-publishedDate"),R(e,f));a.assignee&&(f=V(" - "+a.assignee,"gs-author"),R(e,f));f=V(a[Cb],"gs-snippet");R(d,f);R(d,f);a.html=b;this.Mc(a.html)};google[v].ca[H].createResultHtml=google[v].ca[H].Qa;google[v].ca[H].rm=function(a){var b=X("gs-patent-image"),d=xh(a.tbUrl,75,100,"gs-image");a=yh(a.unescapedUrl,null,this.ya(),"gs-image");m(a,"gs-image");R(a,d);R(b,a);return b};
google[v].ca[H].Gb=function(a){this.kh=a==google[v].A.kd?"&scoring=d":a==google[v].A.Qp?"&scoring=ad":null};google[v].ca[H].setResultOrder=google[v].ca[H].Gb;google[v].ca[H].Ra=function(a,b){a==google[v].A.aj&&(this.kp=b?b==google[v].ca.Ip?"":b==google[v].ca.Kp?"&as_psrg=1":b==google[v].ca.Jp?"&as_psra=1":"":"")};google[v].ca[H].setRestriction=google[v].ca[H].Ra;
google[v].ca[H].hd=function(a,b){if(b){var d=!1;this.kh&&"&scoring=d"==this.kh&&(d=!0);if(null==this.ma){var e=X("gsc-configSetting");this.ma=Fh(null,"0",d,"gsc-configSettingCheckbox");R(e,this.ma);R(e,V(Q["sort-by-date"],"gsc-configSettingCheckboxLabel"));d=X("gsc-configSettingSubmit");R(d,Ch(Q[rc],"gsc-configSettingSubmit"));R(e,d);R(a,e)}else Fa(this.ma,d);this.ma[Jb]()}else this.ma&&(this.ma[fc]?this.Gb(google[v].A.kd):this.Gb(google[v].A.oh))};google[v].$a=function(){this.Rm=this.jc=google[v].B.Wd;Sa(this,null);this.va={width:112,height:84};this.Qh={width:100,height:75};this.Rd=null};Rd("google.search.SearcherOptions",google[v].$a,void 0);google[v].$a[H].jp=function(a){switch(a){case google[v].B.dq:case google[v].B.Be:case google[v].B.Wd:this.jc=a;break;default:this.jc=google[v].B.Wd}this.Rm=this.jc};google[v].$a[H].setExpandMode=google[v].$a[H].jp;google[v].$a[H].Qy=function(a){oh(a);Sa(this,a)};google[v].$a[H].setRoot=google[v].$a[H].Qy;
google[v].$a[H].Ne=function(a){this.Rd=a};google[v].$a[H].setNoResultsString=google[v].$a[H].Ne;google[v].$a[H].Ky=function(a){100<a&&(a=100);Qa(this.va,a);Aa(this.va,oa[Wc](1.33*a))};google[v].$a[H].setImageResultsTbHeight=google[v].$a[H].Ky;google[v].$a[H].Vy=function(a){100<a&&(a=100);Qa(this.Qh,a);Aa(this.Qh,oa[Wc](1.33*a))};google[v].$a[H].setVideoResultsTbHeight=google[v].$a[H].Vy;
google[v].pa=function(){Ua(this,null);this.fo=null;this.gb=google[v].B.Ec;this.Fi=!1;this.La=null;this.ec=google[v].B.qk;this.Gi=!1;this.xe=-1};Rd("google.search.DrawOptions",google[v].pa,void 0);google[v].pa[H].Ly=function(a){Ua(this,a)};google[v].pa[H].setInput=google[v].pa[H].Ly;google[v].pa[H].Kn=function(a){this.fo=$h(a)};google[v].pa[H].setSearchFormRoot=google[v].pa[H].Kn;google[v].pa[H].Wo=function(a){this.gb=a==google[v].B.Ec||a==google[v].B.fc?a:google[v].B.Ec};
google[v].pa[H].setDrawMode=google[v].pa[H].Wo;google[v].pa[H].Jn=function(a){this.Fi=a};google[v].pa[H].setAutoComplete=google[v].pa[H].Jn;google[v].pa[H].Ln=function(a){this.Gi=a};google[v].pa[H].setSpeech=google[v].pa[H].Ln;google[v].pa[H].Mn=function(a){this.xe=a};google[v].pa[H].setTopRefinementsWanted=google[v].pa[H].Mn;google[v].pa[H].Hn=function(a,b,d,e){this.ec=google[v].B.Qf;this.La={};this.La.Hk=a;this.La.ww=b||"q";this.La.uw=d||!1;this.La.vw=e||"?"};
google[v].pa[H].enableSearchboxOnly=google[v].pa[H].Hn;google[v].pa[H].Gn=function(){this.ec=google[v].B.Ef};google[v].pa[H].enableSearchResultsOnly=google[v].pa[H].Gn;
google[v].fb=function(a,b,d){this.mb=d;this.xl=this.Al=!1;this.J=a;this.wa=null;this.bu=jh(b,google[v].B[H].Vu,[this]);this.eu=jh(b,google[v].B[H].El,[this,google[v].fb.xk]);this.du=jh(b,google[v].B[H].El,[this,google[v].fb.wk]);this.cu=jh(b,google[v].B[H].El,[this,google[v].fb.Cn]);this.$t=jh(b,google[v].B[H].Uu,[this]);this.Zt=jh(b,google[v].B[H].Tu,[this]);this.J.bh(b,b.nb,[this]);this.J.Wu(b,google[v].B[H].Su);this.J.Da(b.Me);this.J.Oa(b.Uc);Sa(this,null);this.ib=this.lf=this.Jd=this.kk=this.Hf=
this.Ri=null;this.il=!0;this.Ya=[];this.dh=this.Zg=this.Lc=this.Ha=null;this.Ob=0;this.Ae=!1};google[v].fb.Mj=0;google[v].fb.xk=1;google[v].fb.wk=2;google[v].fb.Cn=3;
google[v].fb[H].Kj=function(a){var b="gsc-results-selector ",b=a==google[v].fb.Mj?this.mb.jc==google[v].B.Wd?b+"gsc-one-result-active":this.J.Ka==google[v].A.Zb?b+"gsc-more-results-active":b+"gsc-all-results-active":a==google[v].fb.xk?b+"gsc-one-result-active":a==google[v].fb.wk?b+"gsc-more-results-active":b+"gsc-all-results-active";m(this.kk,b)};
google[v].B=function(a){if(!google[Ed].KeyVerified)if(google[v].B.Dn())google[Ed].KeyVerified=!0;else return;this.fk=this.Me=google[v].A.Zb;this.gb=google[v].B.Ec;Sa(this,null);Ua(this,null);this.He=null;this.pi=google[v].B.ui;this.xr=jh(this,google[v].B[H].ns,[null]);this.yr=jh(this,google[v].B[H].os,[null]);this.Gf=this.gk=this.hk=this.Lh=null;this.We=0;this.Df=!1;this.Uc=google[v].A.Kf;this.ec=google[v].B.qk;this.Jj=Q.copy;this.Td=this.jb=null;this.Tm=0;this.pd={};this.Ib=this.Ed=this.ti=this.Wb=
this.Cf=null;this.Jm=!1;this.Tc=null;this.Qd=this.Sd=0;this.Um=!1;this.qd=null;this.Bf=!1;this.na=this.Xc=null;this.zn=!1;this.Ua={};this.Ua[google[v].Ea.ic]={enabled:!0,className:"gsc-adBlock",$b:"",ji:{lines:2}};this.Ua[google[v].Ea.Pb]={enabled:!1,className:"gsc-adBlockVertical",$b:"gsc-thinWrapper",ji:{}};this.Ua[google[v].Ea.Cb]={enabled:!1,className:"gsc-adBlockBottom",$b:"",ji:{}};this.Y=[];var b;if(a)for(var d=0;d<a[G];d++)b=new google[v].fb(a[d],this,!1),this.Y[B](b);this.Kh(google[v].B.vk);
this.jn={};this.If=!1;this.Ud=!0;this.Hb=null};Rd("google.search.SearchControl",google[v].B,void 0);google[v].B[H].Vk=!1;google[v].Ea={ic:"top",Pb:"right",Cb:"bottom"};google[v].B.Ro=Q["no-results"];google[v].B.NO_RESULTS_DEFAULT_STRING=google[v].B.Ro;google[v].B.mq=350;google[v].B.TIMEOUT_SHORT=google[v].B.mq;google[v].B.ui=500;google[v].B.TIMEOUT_MEDIUM=google[v].B.ui;google[v].B.lq=700;google[v].B.TIMEOUT_LONG=google[v].B.lq;google[v].B.dq=1;google[v].B.EXPAND_MODE_CLOSED=google[v].B.dq;
google[v].B.Be=2;google[v].B.EXPAND_MODE_OPEN=google[v].B.Be;google[v].B.Wd=3;google[v].B.EXPAND_MODE_PARTIAL=google[v].B.Wd;google[v].B.Ec=1;google[v].B.DRAW_MODE_LINEAR=google[v].B.Ec;google[v].B.fc=2;google[v].B.DRAW_MODE_TABBED=google[v].B.fc;google[v].B.jq="save";google[v].B.KEEP_LABEL_SAVE=google[v].B.jq;google[v].B.iq="keep";google[v].B.KEEP_LABEL_KEEP=google[v].B.iq;google[v].B.gq="include";google[v].B.KEEP_LABEL_INCLUDE=google[v].B.gq;google[v].B.fq="copy";google[v].B.KEEP_LABEL_COPY=google[v].B.fq;
google[v].B.eq="blank";google[v].B.KEEP_LABEL_BLANK=google[v].B.eq;google[v].B.vk="tab";google[v].B.REFINEMENT_AS_TAB=google[v].B.vk;google[v].B.Fk="link";google[v].B.REFINEMENT_AS_LINK=google[v].B.Fk;google[v].B.qk="standard";google[v].B.MODE_STANDARD=google[v].B.qk;google[v].B.Qf="searchbox-only";google[v].B.MODE_SEARCHBOX_ONLY=google[v].B.Qf;google[v].B.Ef="searchresults-only";google[v].B.MODE_RESULTS_ONLY=google[v].B.Ef;
var ki=google[Ed][Hd].BUBBLEGUM,li=google[Ed][Hd].GREENSKY,mi=google[Ed][Hd].ESPRESSO,ni=google[Ed][Hd].SHINY,oi=google[Ed][Hd].MINIMALIST,pi=google[Ed][Hd].V2_DEFAULT;google[v].B.Id={};google[v].B.Id[ki]={colorBackground:"#FDE5FF",colorTitleLink:"#0568CD",colorText:"#000",colorDomainLink:"#CC7A9F",fontFamily:"Arial"};google[v].B.Id[li]={colorBackground:"#EEFFE5",colorBorder:"#A9DA92",colorTitleLink:"#06C",colorText:"#454545",colorDomainLink:"#8D5FA7",fontFamily:"Trebuchet MS",fontSizeDescription:"14"};
google[v].B.Id[mi]={colorBackground:"#F2F0E6",colorTitleLink:"#950000",colorText:"#333",colorDomainLink:"#A25B08",fontFamily:"Georgia",fontSizeDescription:"14",fontSizeDomainLink:"12"};google[v].B.Id[ni]={colorBackground:"#F0F0F6",colorBorder:"#CCC",colorTitleLink:"#06C",colorDomainLink:"#008000",fontFamily:"Verdana"};google[v].B.Id[oi]={colorBackground:"#EEE",colorBorder:"#CCC",colorTitleLink:"#000",colorText:"#444",colorDomainLink:"#333",fontSizeDescription:"14",fontFamily:"Arial"};
google[v].B.Id[pi]={colorBackground:"#fff",colorBorder:"#ddd",colorTitleLink:"#1155CC",colorText:"#222",colorDomainLink:"#093",fontSizeDescription:"13",fontFamily:"Arial, sans-serif"};google[v].B.qo="13";google[v].B.kt="16";try{google[v].B.appPath=window[mc][zc]}catch(qi){google[v].B.appPath=null}
google[v].B.Dn=function(){var a;a=window[mc][bc][Od]()[hc](".");if(2>a[G])a=!1;else{var b=a.pop(),d=a.pop();"igoogle"!=d&&"gmodules"!=d&&"googlesyndication"!=d||"com"!=b?(2==b[G]&&0<a[G]&&Mh[d]&&1==Mh[d][b]&&(d=a.pop()),a="google"==d):a=!0}if(a)return!0;google[Ed].KeyVerified=!0;google[Ed].LoadFailure=!1;return!0};google[v].B.keyCheck=google[v].B.Dn;google[v].B[H].Vw=function(){var a=this;return function(){a.Vk&&(a.po(),a.Vk=!1)}};
google[v].B[H].Tg=function(a,b){this.wd=!0;this.Dd=a;if(b){var d=this.Ua[google[v].Ea.ic],e=this.Ua[google[v].Ea.Pb],g=this.Ua[google[v].Ea.Cb];void 0!=b.includeVerticalAds&&Na(e,b.includeVerticalAds);void 0!=b.includeSideAds&&Na(e,b.includeSideAds);void 0!=b._includeBottomAds_&&Na(g,b._includeBottomAds_);void 0!=b.iframes&&(this.no=b.iframes);b.channel&&(this.Hi=b.channel);b.clientIP&&(this.lo=b.clientIP);b.safe&&(this.Kk=b.safe);b[kc]&&(this.mo=b[kc]);b.adStyle&&(this.jo=b.adStyle);b.cseGoogleHosting&&
(this.Ii=b.cseGoogleHosting);if(g=b.adtest||b.debug)this.nk=g;void 0!=b.numTopAds&&(d.dd=oa.max(0,oa.min(4,b.numTopAds)),Na(d,d.dd?!0:!1));void 0!=b.numSideAds&&(e.dd=oa.max(0,oa.min(8,b.numSideAds)),Na(e,e.dd?!0:!1));"noTop"==b.layout&&(Na(d,!1),Na(e,!0));this.Io=b.enableSearchCompleteCallback?!0:!1}(function(a,b,d,e){a[e]=a[e]||function(){(a[e].q=a[e].q||[])[B](arguments)};a[e].t=1*new Date;var g=b[t](d);b=b[ac](d)[0];g.async=1;g.src="//www.google.com/adsense/search/async-ads.js";b[Jd][Hb](g,b)})(window,
h,"script","_googCsa");window._googCsa("jsLoadedCallback",this.Vw())};google[v].B[H].enableAds=google[v].B[H].Tg;google[v].B[H].Zd=function(a,b,d){b||(b=new google[v].$a);b&&b.va&&a.Hp(b.va);a.ed=null;b=new google[v].fb(a,this,b);d?(d.Ya[B](b),b.dh=d,b.Ob=d.Ob+1):(this.Y[B](b),b.Ob=0);this.Yf(a)&&(this.ms=!0);a.jf="gsc"};google[v].B[H].addSearcher=google[v].B[H].Zd;
google[v].B[H].ln=function(a){a.mb[Ic]?(a.il=!1,Sa(a,a.mb[Ic]),$(a[Ic],"gsc-resultsRoot"),Kh(a[Ic],"gsc-resultsbox-visible"),$(a[Ic],"gsc-resultsbox-invisible")):Sa(a,X("gsc-resultsRoot"));a.J.Ff&&$(a[Ic],"gsc-resultsRoot-"+a.J.Ff);this.gb==google[v].B.fc&&(a.Ha.Db=a[Ic]);var b=uh(null,null,"gsc-resultsHeader"),d=vh(b,0);a.le=wh(d,"gsc-twiddleRegionCell");d=wh(d,"gsc-configLabelCell");a.Ri=V("","gsc-twiddle");R(a.le,a.Ri);var e=sh(a.J.hv(),"gsc-title");R(a.Ri,e);a.Hf=V("","gsc-stats");R(a.le,a.Hf);
var e=V(),g=V(Q.blank,"gsc-result-selector gsc-one-result"),f=V(Q.blank,"gsc-result-selector gsc-more-results"),k=V(Q.blank,"gsc-result-selector gsc-all-results");jb(g,Q["show-one-result"]);jb(f,Q["show-more-results"]);jb(k,Q["show-all-results"]);R(e,g);R(e,f);R(e,k);ob(g,a.eu);ob(f,a.du);ob(k,a.cu);a.kk=e;a.Kj(google[v].fb.Mj);R(a.le,a.kk);ob(a.Ri,a.bu);a.J.Fc&&(a.Vb=th("","gsc-configLabel"),Xa(a.Vb,Q.blank),$(a.Vb,"gsc-twiddle-closed"),R(d,a.Vb),ob(a.Vb,a.$t),jb(a.Vb,Q.settings),a.Jd=X("gsc-config"),
$(a.Jd,a.J.Se),a.lf=Bh("gsc-config"),$(a.lf,a.J.Se),a.lf.onsubmit=a.Zt,R(a.Jd,a.lf),Pa(a.Jd[u],"none"));a.ib=X();this.zb&&(a.ib.onmousedown=nh(this,google[v].B[H].gv),ob(a.ib,nh(this,google[v].B[H].fv)));a.wa=X("gsc-expansionArea");R(a.ib,a.wa);a.il&&R(this.Cd,a[Ic]);R(a[Ic],b);a.Jd&&R(a[Ic],a.Jd);R(a[Ic],a.ib)};google[v].B.gw=/^https?:\/\/www\.google\.com\/url\?/;M=google[v].B[H];M.gv=function(a){this.If&&this.Eq(this.Dq(a));return!0};
M.fv=function(a){var b=this.Dq(a);this.If||this.Eq(b);b&&window[gc](function(){var a=b[Bd](google[v].G.se);a&&Oa(b,a)},0);return!0};M.Dq=function(a){a=a||window[Pd];for(a=a[yd]||a[ad];a&&!(a[zc]&&a[Bd](google[v].G.me)&&a[Bd](google[v].G.se));)a=a[Jd];return a};M.Eq=function(a){if(a){var b=a[Bd](google[v].G.me);b&&google[v].B.gw[Qc](b)&&Oa(a,b)}};M.Om=function(a){var b=sh();$(b,"gsc-refinementBlockInvisible");R(this.Nc,b);a.Lc=b;this.Ox(a)};M.dx=function(a){return this.pd.Mp?th(a):rh(a)};
M.Vm=function(a){if(this.pd.Mp){var b=h.createDocumentFragment();b[p](th());Xa(b[Lb],a);return b}var b=h.createDocumentFragment(),d=h[t]("div");for(Xa(d,a);d[Lb];)b[p](d[Lb]);return b};M.Ox=function(a){var b=a.Ha,d=this.bk(a,a);d.Ob+=1;"tab"==this.Pp?ph(d.ra,rh(Q["all-results-short"])):ph(d.ra,this.dx(Q["all-results-long"]));a.Ha=b;a.Zg=d;a.Zg.Db=a.Ha.Db};
M.Kh=function(a){a==google[v].B.Fk?(this.hp="gsc-refinementHeader",this.Xi="gsc-refinementhInactive",this.Sl="gsc-refinementhActive",this.Pp=a,this.yk="gsc-refinementsAreaInvisible",this.Op="gsc-refinementsArea"):a==google[v].B.vk&&(this.hp="gsc-tabHeader",this.Xi="gsc-tabhInactive",this.Sl="gsc-tabhActive",this.Pp=a,this.yk="gsc-tabsAreaInvisible",this.Op="gsc-tabsArea")};google[v].B[H].setRefinementStyle=google[v].B[H].Kh;M=google[v].B[H];
M.bk=function(a,b){var d={},e=a.J.Hl();a.Ha=d;d.Ob=a.Ob;d.ra=V(google[v].U.Vd(e));d.Db=null;d.lb=a.J;d.oa=a.J.oa;Hh(d.ra,jh(this,this.mf,[d]));d.Hb=a;var g="gs-spacer";hh("opera")&&(g+=" gs-spacer-opera");b?(e=b.Lc,$(d.ra,this.hp),$(d.ra,this.Xi)):(e=this.Bc,$(d.ra,"gsc-tabHeader"),$(d.ra,"gsc-tabhInactive"));$(d.ra,"gsc-inline-block");R(e,d.ra);g=th(" ",g);R(e,g);a.mb.jp(google[v].B.Be);return d};
M.Zm=function(a){if(1!=a.Ya[G]){var b=a.Ya[ub]();if(b){a.Ya[B](b);a=b.Ha.ra;var d=a[Vb];R(a[Jd],a);R(a[Jd],d);b=b.Ha.Db;R(b[Jd],b)}}};M.ak=function(a){for(var b=0;b<this.Tc[G];++b)if(this.Tc[b].key==a)return b;return null};M.Bw=function(a){m(this.Ib,"gsc-option-menu-invisible");this.Sd!=a&&(this.zk(a),this.di(a,this.X.lb),this.qa())};
M.Cw=function(a){a=a||window[Pd];m(this.Ib,"gsc-option-menu");this.Ib[u].top=Yh(this.Ib,this.Ed)+Yh(this.ti,this.Ed)-Yh(Sh(this.Ib,"div","gsc-option-menu-item-highlighted")[0],this.Ed)+"px";Ca(a,!0);a[jc]&&a[jc]()};M.zw=function(a){a=a||window[Pd];this.Ib&&!di(this.Ib,a[yd]||a[ad])&&m(this.Ib,"gsc-option-menu-invisible")};google[v].B.Aw=function(a){a=a||window[Pd];Ca(a,!0);a[jc]&&a[jc]()};M=google[v].B[H];
M.gt=function(){var a=X("gsc-orderby-invisible"),b=sh(Q["order-results-by"],"gsc-orderby-label");$(b,"gsc-inline-block");R(a,b);this.Ed=X("gsc-option-menu-container");$(this.Ed,"gsc-inline-block");R(a,this.Ed);b=X("gsc-selected-option-container");$(b,"gsc-inline-block");this.ti=X("gsc-selected-option");var d=X("gsc-option-selector");R(b,this.ti);R(b,d);ob(b,nh(this,this.Cw));R(this.Ed,b);this.Ib=X("gsc-option-menu-invisible");for(b=0;b<this.Tc[G];++b){var e=this.Tc[b][Fc],d=X("gsc-option-menu-item"),
e=sh(e,"gsc-option");R(d,e);R(this.Ib,d);ob(e,jh(this,google[v].B[H].Bw,[b]))}R(this.Ed,this.Ib);ob(this.Ib,google[v].B.Aw);b=nh(this,this.zw);this[Ic][Ub]?(this[Ic][Ub]("onmousedown",b),h[Ub]("onmousedown",b)):h[id]&&h[id]("mousedown",b,!0);return a};M.Vx=function(a){a=a||window[Pd];this.qd&&!di(this.qd,a[yd]||a[ad])&&m(this.Xc,"gsc-getlink-text-invisible")};
M.Ux=function(a){a=a||window[Pd];this.Xc&&di(this.Xc,a[yd]||a[ad])||(m(this.Xc,Jh(this.Xc,"gsc-getlink-text-visible")?"gsc-getlink-text-invisible":"gsc-getlink-text-visible"),Ca(a,!0),a[jc]&&a[jc]())};M.ht=function(){var a=X("gsc-richsnippet-popup-box");$(a,"gsc-richsnippet-popup-box-invisible");return a};
M.Ex=function(){var a=Bh(),b=Gh("label","page",!0),d=Ah(Q["label-page"],"gsc-label-result-form-label");R(a,b);R(a,d);Hh(b,nh(this,this.rr));b=Gh("label","site");d=Ah(Q["label-site"],"gsc-label-result-form-label");R(a,b);R(a,d);Hh(b,nh(this,this.rr));b=Gh("label","prefix");d=Ah(Q["label-prefix"],"gsc-label-result-form-label");R(a,b);R(a,d);Hh(b,nh(this,this.ey));return a};
M.tx=function(a){var b=h[t]("a"),d="more:"+a;m(b,"gs-label");ib(b,a);b[Nb]("data-refinementlabel",a);b[Nb]("label-with-op",d);b[Nb]("dir","ltr");Hh(b,jh(this,this.Tj,[this.Vc(this.Hb),d]));return b};
M.ft=function(){this.Nd=X("gsc-modal-background-image");Hh(this.Nd,jh(this,this.zf));R(this.Cd,this.Nd);var a=X("gsc-label-result-main-box-invisible"),b=X("gsc-label-result-saving-popup");$(b,"gsc-label-result-saving-popup-invisible");qh(b,Q.saving);R(a,b);b=X("gsc-results-close-btn");$(b,"gsc-label-results-close-btn-visible");R(a,b);Hh(b,jh(this,this.zf));var b=Q["add-label"],d=h[t]("h");m(d,"gsc-label-result-heading");b&&ib(d,b);R(a,d);b=X("gsc-labels-label-div-visible");R(a,b);this.Gq=b;this.xj=
X("gsc-labels-no-label-div-invisible");qh(this.xj,Q["no-refinement"]);R(a,this.xj);d=X("gsc-label-result-url-heading");R(b,d);d=h[t]("a");nb(d,"_blank");m(d,"gsc-label-result-url-title");R(b,d);d=X("gsc-label-result-url");R(b,d);d=X("gsc-label-result-form-div");R(b,d);R(d,this.Ex());d=Eh(null,"gsc-label-result-label-prefix-invisible");$(d,"gsc-label-result-label-prefix-visible");R(b,d);d=X("gsc-label-result-label-prefix-error");qh(d,Q["invalid-url-prefix"]);$(d,"gsc-label-result-label-prefix-error-invisible");
R(b,d);d=X("gsc-labels-box");R(b,d);d=X("gsc-add-label-error");$(d,"gsc-add-label-error-invisible");qh(d,Q["error-adding-label"]);R(b,d);d=X("gsc-label-result-buttons");R(b,d);b=Dh(Q.Save,"gsc-result-label-button");$(b,"gsc-result-label-save-button");R(d,b);Hh(b,nh(this,this.Fx));b=Dh(Q.Cancel,"gsc-result-label-button");R(d,b);Hh(b,nh(this,this.zf));return a};
M.et=function(){var a=X("gsc-getlink-invisible"),b=X("gsc-getlink-box");$(b,"gsc-inline-block");var d=xh(google[Ed][ld]+"/css/link.png",null,null,"gsc-getlink-image");this.Xc=X("gsc-getlink-text-invisible");var e=X("gsc-getlink-textbox"),g=V(Q["get-link"],"gsc-getlink-label"),f=Eh(null,"gsc-getlink-inputbox");f.readOnly=!0;ob(f,f[Mb]);R(b,d);R(a,b);R(a,this.Xc);R(this.Xc,e);R(e,g);R(e,f);Hh(a,nh(this,this.Ux));b=nh(this,this.Vx);this[Ic][Ub]?(this[Ic][Ub]("onclick",b),h[Ub]("onclick",b)):h[id]&&h[id]("click",
b,!0);return a};
M.Pf=function(a,b){var d=null,e=null;b?b.gb?(this.gb=b.gb,d=b[Sc],e=b.fo,this.ec=b.ec,this.Fi=b.Fi,this.Gi=b.Gi,this.xe=b.xe,this.ec==google[v].B.Qf&&(this.La=b.La)):this.gb=google[v].B.Ec:this.gb=google[v].B.Ec;Sa(this,X(this.La?"gsc-control-searchbox-only":"gsc-control"));this[Ic].dir=google[v].U.Ei;(a=$h(a))&&ph(a,this[Ic]);this.zb&&this.jt();if(null!=d)Ua(this,d),this[Sc].onkeyup=this.xr,this[Sc].onpaste=this.yr,this.Ud=!1;else{this.Ud=!0;null==e?e=this[Ic]:e.dir=google[v].U.Ei;this.He=new google[v].Ca(!0,
e,{Di:!0,Ys:this.If,Wf:this.pd.Wf});this.He.io(this,this.Yc);Ua(this,this.He[Sc]);var e=this.He.Bi,g=this.He.Ai,f={interfaceLanguage:google[v][Kd]};this.If&&(f.brandingImageUrl=google[v].Ca.Ik,f.brandingImageStyle=google[v].Ca.dt);this.Fi?this.Oh&&(f.maxSuggestions=this.Oh.maxCompletions,f.maxPromotions=this.Oh.maxPromotions):f.disableAutoCompletions=!0;this.La&&(f.enableAsynchronousLogging=!ci(ai(this.La.Hk)));f.useKennedyLookAndFeel=this.pd.Wf;f.searchButton=e;f.enableSpeech=b?b.Gi:!1;this.Td=ch();
this.Td.Kr(g,this[Sc],this,f);f.useKennedyLookAndFeel&&$(g,"gsc-search-box-tools")}d||this.ec!=google[v].B.Ef||(Pa(this.He.Ai[u],"none"),gb(this[Ic][u],"hidden"));if(!this.La){this.Cd=X("gsc-resultsbox-invisible");this.Im&&(this.hf=this.ht(),R(this.Cd,this.hf));Ih()&&(this.na=this.ft(),R(this.Cd,this.na));this.tb=this.Qm?X("gsc-results-wrapper-overlay"):X("gsc-results-wrapper-nooverlay");R(this[Ic],this.tb);this.Qm&&(this.ef=X("gsc-modal-background-image"),R(this[Ic],this.ef),Hh(this.ef,jh(this,google[v].B[H].Yc)),
this.ff=X("gsc-results-close-btn"),R(this.tb,this.ff),Hh(this.ff,jh(this,google[v].B[H].Yc)));if(this.gb==google[v].B.fc)for(this.Bc=X("gsc-tabsAreaInvisible"),R(this.tb,this.Bc),this.zb&&(1<this.Y[G]&&this.Kh(google[v].B.Fk),this.Nc=X(this.yk),R(this.tb,this.Nc)),d=0;d<this.Y[G];d++)this.bk(this.Y[d]);this.Cf=X("gsc-above-wrapper-area-invisible");R(this.tb,this.Cf);d=uh(0,0,"gsc-above-wrapper-area-container");R(this.Cf,d);d=vh(d,0);e=wh(d,"gsc-result-info-container");this.gf=X("gsc-result-info-invisible");
R(e,this.gf);this.zb&&this.Jm&&this.gb==google[v].B.fc&&(e=wh(d,"gsc-orderby-container"),this.Wb=this.gt(),R(e,this.Wb),m(this.Wb,"gsc-orderby-invisible"));this.Bf&&(d=wh(d,"gsc-getlink-container"),this.qd=this.et(),R(d,this.qd),m(this.qd,"gsc-getlink-invisible"));this.kc=this.tb;this.wd&&(this.kc=X("gsc-wrapper"),this.vd(function(a,b){b.ua=X("gsc-adBlockInvisible");a==google[v].Ea.ic?R(this.kc,b.ua):a==google[v].Ea.Pb&&R(this.tb,b.ua)}),R(this.tb,this.kc));R(this.kc,this.Cd);for(d=0;d<this.Y[G];d++)this.ln(this.Y[d]),
this.gb==google[v].B.fc&&($(this.Y[d].Ha.Db,"gsc-tabData"),$(this.Y[d].Ha.Db,"gsc-tabdInactive"));this.gb==google[v].B.fc&&0<this.Y[G]&&(this.X=this.Y[0].Ha,this.Ue(this.X),Kh(this.Y[0].Ha.Db,"gsc-tabdInactive"),$(this.Y[0].Ha.Db,"gsc-tabdActive"),this.Wb&&(this.zk(this.Qd),this.di(this.Qd,this.X.lb)))}a&&(d=this.it())&&300>d&&$(this[Ic],"gsc-narrow")};google[v].B[H].draw=google[v].B[H].Pf;
google[v].B[H].zk=function(a){if(this.Wb){var b=Sh(this.Ib,"div","gsc-option-menu-item-highlighted")[0];b&&Kh(b,"gsc-option-menu-item-highlighted");this.Sd=a;$(Sh(this.Ib,"div","gsc-option")[this.Sd][Jd],"gsc-option-menu-item-highlighted");qh(this.ti,this.Tc[this.Sd][Fc])}};google[v].B[H].di=function(a,b){b instanceof google[v].G&&b.Ra(google[v].A.Ja,{sort:this.Tc[a].key})};
google[v].B[H].bl=function(a){var b=Sh(Sh(this.Xc,"div","gsc-getlink-textbox")[0],"input",null)[0],d={},e=window[mc][zc];var g=e[hc]("#");if(1!=g[G]){for(var e=g[1][hc]("&"),f=e[G];0<f--;)-1!=e[f].lastIndexOf("gsc.",0)&&e[Md](f,1);e=0<e[G]?g[0]+"#"+e[Nd]("&"):g[0]}if(-1!=e[dd]("?gcse-bookmark=")||-1!=e[dd]("&gcse-bookmark="))g=e[hc]("#"),e=1==g[G]?Vh(g[0],"gcse-bookmark"):Vh(g[0],"gcse-bookmark")+"#"+g[1];d.query=this.Qe;this.X.lb.Xb!=Q.web&&this.X.lb.Xb!=Q.image&&(d.refine=this.X.lb.Xb);this.X.lb instanceof
google[v].C&&(d.image="1");this.Wb&&this.X.lb instanceof google[v].G&&(d.sortBy=this.Tc[this.Sd].key);a&&(d.page=a);a=e;g=[];if(d)for(var k in d)null!=d[k]&&g[B]("gcse-bookmark="+c(k+":"+d[k]));d=g[Nd]("&");k=-1!==a[dd]("?")?"&":"?";g="";-1!==a[dd]("#")&&(g=a[r](/.*#/,"#"),a=a[r](/#.*/,""));e=a+k+d+g;Ya(b,e);qh(b,e)};google[v].B[H].Ty=function(a){switch(a){case google[v].B.mq:case google[v].B.ui:case google[v].B.lq:this.pi=a;break;default:this.pi=google[v].B.ui}};
google[v].B[H].setTimeoutInterval=google[v].B[H].Ty;google[v].B[H].Oy=function(a,b,d){if(d)switch(d){case google[v].B.jq:case google[v].B.iq:case google[v].B.gq:case google[v].B.fq:case google[v].B.eq:this.Jj=Q[d];break;default:this.Jj=d}this.Lh=nh(a,b)};google[v].B[H].setOnKeepCallback=google[v].B[H].Oy;M=google[v].B[H];M.Yf=function(a){var b=a.oa;return this.zb?"web"==b&&a.N?!1:!0:"blog"==b||"image"==b?!0:!1};
M.Ue=function(a){1==a.Ob?a.ra.onclick?(Hh(a.ra,null),Kh(a.ra,this.Xi),$(a.ra,this.Sl)):(Hh(a.ra,jh(this,this.mf,[a])),Kh(a.ra,this.Sl),$(a.ra,this.Xi)):a.ra.onclick?(Hh(a.ra,null),Kh(a.ra,"gsc-tabhInactive"),$(a.ra,"gsc-tabhActive")):(Hh(a.ra,jh(this,this.mf,[a])),Kh(a.ra,"gsc-tabhActive"),$(a.ra,"gsc-tabhInactive"))};
M.mf=function(a,b){if(this.X!=a){this.Lj(!0);Kh(this.X.Db,"gsc-tabdActive");$(this.X.Db,"gsc-tabdInactive");this.Ue(this.X);var d=this.Vc(this.X.Hb),e=this.Vc(a.Hb);1==this.X.Ob&&d!=e&&($(d.Lc,"gsc-refinementBlockInvisible"),this.Ue(d.Ha));this.X=a;d=this.X.lb;this.Ue(this.X);this.Wb&&this.di(this.Sd,this.X.lb);this.Bf&&this.bl();1==this.X.Ob&&e.Ha.ra.onclick&&this.Ue(e.Ha);this.Go();e=null;!b&&this.jb&&this.jb[vc]()&&(e=this.jb.Rg(),this.fp(a,e));$(this.X.Db,"gsc-tabdActive");Kh(this.X.Db,"gsc-tabdInactive");
var g=b?b.$h:this.Qe,f=g&&g==d.Ze;b&&(f=f&&b[Oc]==d.lj());this.qd&&this.Mm();if(f){e&&(e[google[v][D].Zc]=d.lj(),this.jb[vb](e));if(!this.Ho(d.Ze,d.lj())||hh("opera")&&b)this.Yd=d.Yd,this.$k(d.Ze,d.lj());this.X.Hb.Np||(this.Lm(this.X.Hb),this.Km(d),this.Wb&&this.Nm())}else g&&this.Lp(g,b&&b[Oc],null,e)}};M.Ho=function(a,b){var d=this.Ua[google[v].Ea.Cb];return!!this.Fa&&this.Fa.query==a&&(this.Fa.adPage||1)==(b||1)&&!(d[yc]&&this.X&&this.X.Hb.wa!=d.ua[Jd])};
M.Km=function(a){var b=a.results,d=a[ec];this.gb!=google[v].B.Ec&&(this.gf.id="resInfo-"+a.rt);this.gb!=google[v].B.Ec&&0<b[G]&&d&&d.resultCount&&d.searchResultTime?(a=rh(Q["result-info"](d.resultCount,d.searchResultTime)),ph(this.gf,a),m(this.gf,"gsc-result-info")):(m(this.gf,"gsc-result-info-invisible"),oh(this.gf))};
M.Cr=function(){if(this.na&&!this.zn){var a=google[v].Na.rx();this.zn=!0;if(a&&a[G])for(var b=Sh(this.na,null,"gsc-labels-box")[0],d=0;d<a[G];d++){var e=Fh(a[d].Title,a[d].Label[md],null,"gsc-label-checkbox"),g=th(a[d].Title,"gsc-label-result-labels"),f=X("gsc-label-box");R(f,e);R(f,g);R(b,f)}else Kh(this.xj,"gsc-labels-no-label-div-invisible"),$(this.xj,"gsc-labels-no-label-div-visible"),Kh(this.Gq,"gsc-labels-label-div-visible"),$(this.Gq,"gsc-labels-label-div-invisible")}};
M.cq=function(a,b){if(a.J.N)for(var d=0;d<a.Ya[G];d++){var e=a.Ya[d];if(e.J.Xd(b))return e.Ha}return null};M.Tj=function(a,b){var d=this.cq(a,b),e=!0;d||(d=a.Ha,e=!1);this.mf(d);return e};
M.Jr=function(a,b){Xa(this.hf,"");var d=X("gsc-richsnippet-popup-close-button");Hh(d,jh(this,function(){$(this.hf,"gsc-richsnippet-popup-box-invisible")}));var e=rh(Q["structured-data"]+" : "),g=X("gsc-richsnippet-popup-box-title-text");R(g,e);var f=rh(xa(a)),e=X("gsc-richsnippet-popup-box-title-url");R(e,f);f=X("gsc-richsnippet-popup-box-title");R(f,g);R(f,e);R(f,d);R(this.hf,f);var d=X("gsc-richsnippet-popup-box-contents"),k;for(k in b)this.Yx(k,b[k],d);R(this.hf,d);Kh(this.hf,"gsc-richsnippet-popup-box-invisible")};
M.Yx=function(a,b,d){var e=X("gsc-richsnippet-individual-snippet-box"),g=X("gsc-richsnippet-individual-snippet-key");a=a[Fb](0)[Ld]()+a[Xc](1);R(g,rh(a));a=X("gsc-richsnippet-individual-snippet-data");for(var f in b)this.vr(f,b[f],a);R(e,g);R(e,a);R(d,e)};
M.vr=function(a,b,d){var e=rh(a+"  :  ");a=X("gsc-richsnippet-individual-snippet-valueelem");if("string"==typeof b){var g=X("gsc-richsnippet-individual-snippet-keyelem");R(g,e);R(a,rh(b))}if("object"==typeof b)for(var f in b)this.vr(f,b[f],a);b=X("gsc-richsnippet-individual-snippet-keyvalue");R(b,g);R(b,a);R(d,b)};
M.Ir=function(a,b,d){var e=Sh(this.na,"input","gsc-label-checkbox");d=Sh(d,"a","gs-label");for(var g=0;g<e[G];g++){Fa(e[g],!1);mb(e[g],!1);for(var f=1;d&&f<d[G];f++)e[g][cd]==d[f][Bd]("data-refinementlabel")&&(Fa(e[g],!0),mb(e[g],!0))}(e=Sh(this.na,null,"gsc-label-result-form-div")[0])&&(e=Sh(e,"input",null)[0])&&e.click();$(this.Nd,"gsc-modal-background-image-visible");Kh(this.na,"gsc-label-result-main-box-invisible");m(this.na,"gsc-label-result-main-box-visible");qh(Sh(this.na,null,"gsc-label-result-url")[0],
unescape(a));e=Sh(this.na,null,"gsc-label-result-url-title")[0];Oa(e,a);qh(e,b);Ya(Sh(this.na,null,"gsc-label-result-label-prefix-visible")[0],unescape(a))};M.zf=function(){Kh(this.na,"gsc-label-result-main-box-visible");m(this.na,"gsc-label-result-main-box-invisible");Kh(this.Nd,"gsc-modal-background-image-visible");this.em();this.vx()};M.vx=function(){$(Sh(this.na,null,"gsc-add-label-error")[0],"gsc-add-label-error-invisible")};M.zx=function(){Kh(Sh(this.na,null,"gsc-add-label-error")[0],"gsc-add-label-error-invisible")};
M.yx=function(){$(Sh(this.na,null,"gsc-label-result-saving-popup")[0],"gsc-label-result-saving-popup-invisible")};M.px=function(){Kh(Sh(this.na,null,"gsc-label-result-saving-popup")[0],"gsc-label-result-saving-popup-invisible")};M.em=function(){$(Sh(this.na,null,"gsc-label-result-label-prefix-error")[0],"gsc-label-result-label-prefix-error-invisible")};M.ox=function(){Kh(Sh(this.na,null,"gsc-label-result-label-prefix-error")[0],"gsc-label-result-label-prefix-error-invisible")};
M.ey=function(){var a=Sh(this.na,null,"gsc-label-result-label-prefix-invisible")[0];a&&Kh(a,"gsc-label-result-label-prefix-invisible")};M.rr=function(){this.em();var a=Sh(this.na,null,"gsc-label-result-label-prefix-visible")[0];a&&$(a,"gsc-label-result-label-prefix-invisible")};M.Ax=function(a,b){for(var d=Sh(this.X.Hb[Ic],null,"gs-per-result-labels"),e=null,g=0;g<d[G];g++)if(d[g][Bd]("url")==a){e=d[g];break}if(e){for(;1<e[Sb][G];)e[xd](e[Sb][1]);for(g=0;g<b[G];g++)e[p](this.tx(b[g]))}};
M.Fx=function(){for(var a=Sh(this.na,null,"gsc-label-checkbox"),b=[],d=!1,e=0;e<a[G];e++)a[e][fc]&&b[B](a[e][cd]),a[e][fc]&&!a[e].disabled&&(d=!0);if(d){var g=Sh(this.na,null,"gsc-label-result-url")[0].innerText,f=this.mx(g);if(f){this.em();this.kx();this.px();var k=this;google[v].Na.nx(google[v].Na.Oq()+"&num=5000",function(a){k.lx(g,f,b,a)})}else this.ox()}};M.kx=function(){var a=Sh(this.na,null,"gsc-label-results-close-btn-visible")[0];a&&Hh(a,null);this.Nd&&Hh(this.Nd,null);this.br(!0)};
M.wx=function(){var a=Sh(this.na,null,"gsc-label-results-close-btn-visible")[0];a&&Hh(a,jh(this,this.zf));this.Nd&&Hh(this.Nd,jh(this,this.zf));this.br(!1)};M.br=function(a){for(var b=Sh(this.na,null,"gsc-result-label-button"),d=0;b&&d<b[G];d++)mb(b[d],a);if(d=Sh(this.na,null,"gsc-label-result-form-div")[0])for(b=Sh(d,"input",null),d=0;b&&d<b[G];d++)mb(b[d],a)};
M.lx=function(a,b,d,e){e=google[v].Na.Hx(b,e);b=google[v].Na.Ix(b,d,e);var g=this;google[v].Na.Jx(google[v].Na.Oq(),b,function(b){g.Gx(a,b)})};M.Gx=function(a,b){var d=google[v].Na.xx(b);this.yx();this.wx();d&&d[G]?(this.Ax(a,d),this.zf()):this.zx()};M.mx=function(a){var b="",d=bi(a),e=Sh(Sh(this.na,"div","gsc-label-result-form-div")[0],"input");e[0][fc]?b=a:e[1][fc]?b=d:e[2][fc]&&(e=Sh(this.na,"input","gsc-label-result-label-prefix-visible")[0][cd],d==bi(e)&&0==a[dd](e)&&(b=e));return b};
M.Mh=function(a,b){b?($(this[Ic],"gsc-loading-fade"),a.Np=!0,$(a.ib,"gsc-loading-resultsRoot"),0==a.Ob&&this.Nc&&$(this.Nc,"gsc-loading-refinementsArea")):(Kh(this[Ic],"gsc-loading-fade"),a.Np=!1,Kh(a.ib,"gsc-loading-resultsRoot"),this.Nc&&Kh(this.Nc,"gsc-loading-refinementsArea"))};M.Go=function(){this.wd&&(this.Yf(this.X.lb)?this.Ng():this.bm())};M.Qw=function(a){var b=this.Ua[google[v].Ea.Cb];if(b.ua[Jd]!=a.wa){var d=Sh(a.wa,"div","gsc-cursor-box")[0];d&&d[Jd]==a.wa?a.wa[Hb](b.ua,d):R(a.wa,b.ua)}};
M.Ng=function(){this.wd&&this.vd(function(a,b){m(b.ua,"gsc-adBlockInvisible");b[yc]&&b.$b&&Kh(this.kc,b.$b)})};M.bm=function(){this.wd&&this.vd(function(a,b){0<b.ie?(m(b.ua,b[rd]),b.$b&&$(this.kc,b.$b)):(m(b.ua,"gsc-adBlockInvisible"),b.$b&&Kh(this.kc,b.$b))})};M.submit=function(){return this.wr(null)};google[v].B[H].submit=google[v].B[H][Uc];M=google[v].B[H];M.wr=function(a,b){this[Sc][cd][G]?this.La?this.up(b):this.qa(void 0,void 0,b):this.Yc();return!1};M.$v=function(a){return this.wr(null,a)};
M.up=function(a){var b=this.La.vw,b=this.La.Hk+(0<=this.La.Hk[dd](b)?"&":b)+c(this.La.ww)+"="+c(this[Sc][cd]);(a=Uh(a))&&(b+="&"+a);this.La.uw?window[Pc](b):window.location=b};M.Nj=function(){this.Bc&&!this.ku&&(!this.zb||1<this.Y[G])&&m(this.Bc,"gsc-tabsArea");!this.Nc||1==this.Y[G]&&0==this.Y[0].Ya[G]||m(this.Nc,this.Op)};
M.Pw=function(a){var b=this;return function(d,e){if(e){b.Ua[a].ie=1;var g=0,f=0;b.vd(function(a,b){b[yc]&&b.qq&&(g++,b.ie&&f++)});g==f?(window[yb](b.ux),b.bm()):1==f&&(b.ux=window[gc](function(){b.bm()},200))}}};M.ij=function(){return null};google[v].B[H].getPartnerId=google[v].B[H].ij;
google[v].B[H].jt=function(){var a=sh("","gsc-input"),b=Eh(null,"gsc-input",null);Pa(b[u],"none");b[u].background=google[v].Ca.Uw();R(a,b);R(this[Ic],a);var d="";h[kd]&&h[kd][pc]?(b=h[kd][pc](b,null))&&(d=b.backgroundImage||""):b[Fd]&&(d=b[Fd].backgroundImage||"");-1!=d[v](google[v].I.Tw)&&(this.If=!0,this.Wa&&this.Wa.zq(Rh("gcsc-",void 0,!1,"https://www.google.com/cse/?hl="+google[v][Kd],Q["custom-search"])),this.Za&&this.Za.zq(Rh("gcsc-",void 0,!1,"https://www.google.com/cse/?hl="+google[v][Kd],Q["custom-search"])));
this[Ic][xd](a)};google[v].B[H].gj=function(a){if(this.Ud)this.Td.Sc(a);else if(Ya(this[Sc],a),this[Sc].onfocus)this[Sc].onfocus(null)};google[v].B[H].prefillQuery=google[v].B[H].gj;google[v].B[H].cy=function(a){a?this.gj(a):a=this.Ud?this.Td.cb():this[Sc][cd];return a};google[v].B[H].Fq=function(){return this.Ud?this.Td.cb():this[Sc][cd]};google[v].B[H].getInputQuery=google[v].B[H].Fq;google[v].B[H].qa=function(a,b,d){if(!this.La){var e=this.uq(this.mk,this.Ij);e&&this.mf(e)}this.Lp(a,b,d)};
google[v].B[H].execute=google[v].B[H].qa;M=google[v].B[H];M.Lp=function(a,b,d,e,g){a=this.cy(a);this.Ll(a,b,d,e,g)};
M.Ll=function(a,b,d,e,g){if(a[G]){this.Df=!1;this.Qe=a;this.Ug=b||1;this.Bf&&this.bl();this.jb&&this.jb[vc]()&&(e=e||this.jb.Rg(),e[google[v][D].Xg]=a,null==b?delete e[google[v][D].Zc]:e[google[v][D].Zc]=b,this.Wb&&this.X.lb instanceof google[v].G&&(e[google[v][D].Vi]=this.Tc[this.Sd].key),this.jb[vb](e));this.Yd=google[Ed].createGuidArg_();e=!1;if(this.gb==google[v].B.fc)e=this.gp(this.X.Hb,this.X.Db,a,g,b,d)||e;else for(var f=0;f<this.Y[G];f++)e=this.gp(this.Y[f],this.Y[f][Ic],a,g,b,d)||e;g=this.Ho(a,
b);e||!g?(g="",d&&d.gs_l&&23<d.gs_l[hc](".")[G]&&(g=d.gs_l[hc](".")[23]),this.$k(a,b,g)):this.Go()}};M.Su=function(){return this.Yd};
M.$k=function(a,b,d){var e=this.wd;e&&(this.ms&&this.gb==google[v].B.Ec||this.gb==google[v].B.fc&&this.Yf(this.X.lb))&&(e=!1);var g=this.mt(),f=this.lt();void 0!=g||this.Dd||this.no||(e=!1);this.gb!=google[v].B.fc&&Na(this.Ua[google[v].Ea.Cb],!1);if(e)if(this.ot(),this.no){this.Ng();this.vd(function(a,b){Xa(b.ua,"")});this.Fa={};this.Fa.pubId=this.Dd||"google-coop";this.Fa.gcsc=!0;g?this.Fa.cx=g:f&&(this.Fa.cref=f);this.Fa.hl=google[v][Kd]?c(google[v][Kd]):null;this.Fa.adtest=this.nk?"on":null;this.Fa.channel=
this.Hi?this.Hi:null;this.Fa.adsafe=this.Kk||null;this.Fa.query=a;this.Fa.adstyle=this.jo?this.jo:null;b&&(this.Fa.adPage=b);this.Fa.containerWidth=this.Tm||this.tb[Db];this.zb&&(this.Fa.cseGoogleHosting="full"==this.Ii||"iframe"==this.Ii||"partner"==this.Ii?this.Ii:"partner",this.Fa.fontSizeDescription=google[v].B.qo,this.Fa.fontSizeDomainLink=google[v].B.qo,this.Fa.fontSizeTitle=google[v].B.kt);window.___bg_&&h[Zc]("bgresponse")&&window.___bg_[wb]&&(window.___bg_[wb](function(a){Ya(h[Zc]("bgresponse"),
a)}),this.Fa.bgresponse=h[Zc]("bgresponse")[cd],d&&(this.Fa.sbsignals=d),window.___gcse_nc_&&(this.Fa.gcse_nc=window.___gcse_nc_));if((b=google[v].A.Jk())&&b in google[v].B.Id){b=google[v].B.Id[b];for(var k in b)this.Fa[k]=b[k]}google&&google.ads&&google.ads[v]&&google.ads[v].Ads?this.po():this.Vk=!0}else{k="";this.Ua[google[v].Ea.ic][yc]&&(k=k+"w"+this.Ua[google[v].Ea.ic].dd);this.Ua[google[v].Ea.Pb][yc]&&(k=k+"n"+this.Ua[google[v].Ea.Pb].dd);k="https://www.google.com/"+(g?"cse":"search")+"?output=js&num=0&ie=utf8&oe=utf8&q="+
c(a)+"&hl="+c(google[v][Kd])+"&ad="+c(k)+"&js=uds&"+this.Yd;g&&(k+="&cx="+g);this.Dd&&(k+="&client="+c(this.Dd));this.Hi&&(k+="&channel="+c(this.Hi));this.nk&&(k+="&adtest=on");this.lo&&(k+="&ip="+c(this.lo));this.Kk&&(k+="&adsafe="+c(this.Kk));this.mo&&(k+="&useragent="+c(this.mo));b&&(k+="&adpage="+c(b+""));var l=this;window.google_afs_request_done=function(a){l.nt(a)};lh(k)}};M.vd=function(a){for(var b in google[v].Ea)if(google[v].Ea[oc](b)){var d=google[v].Ea[b];a[zd](this,d,this.Ua[d])}};
M.po=function(){var a=[];this.vd(function(b,d){d.ie=0;if(d[yc]&&0<d.dd){d.qq=!0;d.Yl={container:d.ua,number:d.dd,callback:this.Pw(b),position:b};for(var e in d.ji)null!=d.Yl[e]&&(d.Yl[e]=d.ji);a[B](d.Yl)}else d.qq=!1;b==google[v].Ea.Cb&&this.Qw(this.X.Hb);m(d.ua,"gsc-adBlockNoHeight");Qa(d.ua[u],"0px")});0<a[G]&&new google.ads[v].Ads(this.Fa,a)};
M.gp=function(a,b,d,e,g,f){b=a.J;this.hk&&this.hk(this,b,d);this.gk&&this.gk(this,b,d);b.ed&&(b.ed=null);var k=!1;if(e)b.uj(e);else{e={};if(f)for(var l in f)e[l]=f[l];for(l in this.jn)e[l]||(e[l]=this.jn[l]);this.zb&&this.Dd&&(e.cseclient=this.Dd);k=b.qa(d,e,g)}this.Mh(a,k);return k};M.mt=function(){for(var a=0;a<this.Y[G];a++){var b=this.Y[a].J;if("web"==b.oa&&b.N&&b.th()==google[v].G.xf)return b.uh()}return null};
M.lt=function(){for(var a=0;a<this.Y[G];a++){var b=this.Y[a].J;if("web"==b.oa&&b.N&&b.th()==google[v].G.Qc)return b.uh()}return null};
M.nt=function(a){window.google_afs_request_done=null;var b=this.Ua[google[v].Ea.ic],d=this.Ua[google[v].Ea.Pb];if(b.ua)if(Xa(b.ua,""),Xa(d.ua,""),b.ie=d.ie=0,!a||1>a[G])this.Ng();else{if(!this.Bc)for(var e=0;e<this.Y[G];e++){var g=this.Y[e].J;if(this.Yf(g)){this.Ng();return}}m(b.ua,b[rd]);var g=!1,f=h[t]("h2"),e="";this.nk&&(e="*DEBUG* ");e+=Q["ads-by-google"];Xa(f,e);R(b.ua,f);for(var k=a[G],e=0;e<k;e++){var l=a[e];if("text/wide"==l[jd]){b.ie++;var n=X("gsc-ad"),q=zh(l.url,l.line1,google[v].A.Kf);
R(n,q);q=h[t]("cite");Xa(q,l.visible_url);R(n,q);q=th();Xa(q,l.line2);R(n,q);R(b.ua,n)}else d[yc]&&(d.ie++,g||(g=!0,$(this.kc,d.$b),R(d.ua,f[Ob](!0)),m(d.ua,d[rd])),n=X("gsc-ad"),q=zh(l.url,l.line1,google[v].A.Kf),R(n,q),q=th(),Xa(q,l.line2+"<br/>"+l.line3),R(n,q),q=h[t]("cite"),Xa(q,l.visible_url),R(n,q),R(d.ua,n))}d[yc]&&!g&&Kh(this.kc,d.$b);this.Bc&&(g=this.X.lb,this.Yf(g)&&this.Ng());this.Gf&&this.Io&&this.Gf(this,"ads")}};
M.ns=function(){var a=this[Sc][cd];a&&""!=a&&(this.We&&window[yb](this.We),this.We=window[gc](jh(this,google[v].B[H].qa,[null]),this.pi))};M.os=function(){this.We&&window[yb](this.We);this.We=window[gc](jh(this,google[v].B[H].qa,[null]),this.pi)};
M.ot=function(){var a=google[v].Ea,b={};if(this.Ua[a.ic][yc])switch(this.fk){case google[v].A.Hc:b[a.ic]=3;b[a.Pb]=5;b[a.Cb]=3;break;case google[v].A.tc:b[a.ic]=2;b[a.Pb]=4;b[a.Cb]=2;break;default:b[a.ic]=1,b[a.Pb]=2,b[a.Cb]=1}else switch(b[a.ic]=0,this.fk){case google[v].A.Hc:b[a.Pb]=8;b[a.Cb]=3;break;case google[v].A.tc:b[a.Pb]=6;b[a.Cb]=2;break;case google[v].A.Zb:b[a.Pb]=3;b[a.Cb]=1;break;default:b[a.Pb]=6,b[a.Cb]=2}this.vd(function(a,e){void 0==e.dd&&(e.dd=b[a])})};
M.Da=function(a){if(0<a&&8>=a)this.Me=a;else switch(a){case google[v].A.tc:this.Me=google[v].A.tc;break;case google[v].A.Hc:this.Me=google[v].A.Hc;break;default:case google[v].A.Zb:this.Me=google[v].A.Zb}for(var b=0;b<this.Y[G];b++)this.Y[b].J.Da(a);this.fk=a};google[v].B[H].setResultSetSize=google[v].B[H].Da;google[v].B[H].Oa=function(a){this.Uc=a;for(var b=0;b<this.Y[G];b++)this.Y[b].J.Oa(a)};google[v].B[H].setLinkTarget=google[v].B[H].Oa;google[v].B[H].Ne=function(a){for(var b=0;b<this.Y[G];b++)this.Y[b].mb.Ne(a)};
google[v].B[H].setNoResultsString=google[v].B[H].Ne;M=google[v].B[H];M.Vu=function(a){a.Al?this.Le(a,!1):this.Le(a,!0)};M.Le=function(a,b,d){b?(Kh(a.le,"gsc-twiddle-closed"),$(a.le,"gsc-twiddle-opened"),a.Al=!0,Pa(a.ib[u],"block")):(Kh(a.le,"gsc-twiddle-opened"),$(a.le,"gsc-twiddle-closed"),a.Al=!1,Pa(a.ib[u],"none"),ph(a.Hf,d?rh("(0)"):rh("("+a.J.results[G]+")")))};M.Tu=function(a){this.Uh(a,!1,!0);return!1};M.Uu=function(a){a.J.of&&(a.xl?this.Uh(a,!1,!0):this.Uh(a,!0,!0))};
M.Uh=function(a,b,d){b?a.Vb&&a.J.Fc&&($(a.Vb,"gsc-twiddle-opened"),Kh(a.Vb,"gsc-twiddle-closed"),Xa(a.Vb,Q[rc]),a.xl=!0,Pa(a.Jd[u],"block"),a.J.Fc(a.lf,!0)):a.Vb&&a.J.Fc&&(Kh(a.Vb,"gsc-twiddle-opened"),$(a.Vb,"gsc-twiddle-closed"),Xa(a.Vb,Q.blank),a.xl=!1,a.J.Fc(a.lf,!1),Pa(a.Jd[u],"none"),d&&this.qa())};M.Gr=function(a){this.Lh&&this.Lh(a)};M.py=function(){this.Df=!0};google[v].B[H].cancelSearch=google[v].B[H].py;
google[v].B[H].Lj=function(a){if(a){if(m(this.Cd,"gsc-resultsbox-visible"),$(this.tb,"gsc-results-wrapper-visible"),this.ff&&$(this.ff,"gsc-results-close-btn-visible"),this.ef){$(this.ef,"gsc-modal-background-image-visible");var b=h[ac]("body")[0];$(b,"gsc-overflow-hidden")}}else m(this.Cd,"gsc-resultsbox-invisible"),Kh(this.tb,"gsc-results-wrapper-visible"),this.ff&&Kh(this.ff,"gsc-results-close-btn-visible"),this.ef&&(Kh(this.ef,"gsc-modal-background-image-visible"),b=h[ac]("body")[0],Kh(b,"gsc-overflow-hidden"));
for(b=0;b<this.Y[G];b++)this.Y[b].il||(a?(Kh(this.Y[b][Ic],"gsc-resultsbox-invisible"),$(this.Y[b][Ic],"gsc-resultsbox-visible")):(Kh(this.Y[b][Ic],"gsc-resultsbox-visible"),$(this.Y[b][Ic],"gsc-resultsbox-invisible")))};
google[v].B[H].Yc=function(){this.Ud?this.Td.Sc(""):Ya(this[Sc],"");this.Ug=this.Qe=null;if(this.ec!=google[v].B.Qf&&(this.ec==google[v].B.Ef&&gb(this[Ic][u],"hidden"),this.Lj(!1),this.Bc&&m(this.Bc,"gsc-tabsAreaInvisible"),this.Nc&&m(this.Nc,this.yk),this.vd(function(a,d){d.ua&&(m(d.ua,"gsc-adBlockInvisible"),d.$b&&Kh(this.kc,d.$b))}),m(this.Cf,"gsc-above-wrapper-area-invisible"),this.jb&&this.jb[vc]())){var a=this.jb.Rg();delete a[google[v][D].Zc];delete a[google[v][D].Xg];this.jb[vb](a)}};
google[v].B[H].clearAllResults=google[v].B[H].Yc;google[v].B[H].wy=function(){var a=google[v].F[I].pl(window[mc][v])||{};if(!a.query)return!1;a.refine&&(this.Ij=a.refine);a.image&&(this.mk=1==a.image?google[v].I.xn:google[v].I.yn);a.sortBy&&(this.Qd=this.ak(a.sortBy)||0);return this.Um=!0};google[v].B[H].enableBookmark=google[v].B[H].wy;M=google[v].B[H];M.Uj=function(a,b,d,e,g){a=a.zc?a.zc(b):b;e?(b={},b[e]=g,e=jh(this,this.qa,[a,void 0,b])):e=jh(this,this.qa,[a]);Hh(d,e)};
M.Nm=function(){m(this.Wb,this.zb&&this.X.Hb.J instanceof google[v].G?"gsc-orderby":"gsc-orderby-invisible")};M.Mm=function(){m(this.qd,this.zb?"gsc-getlink":"gsc-getlink-invisible")};M.Xm=function(a){var b=function(a,b){for(var g=a[Lb];g;){var f=g[Vb];g!=b&&a[xd](g);g=f}};b(a.wa,this.Ua[google[v].Ea.Cb].ua);b(a.ib,a.wa)};
M.nb=function(a){this.ec==google[v].B.Ef&&gb(this[Ic][u],"visible");this.Mh(a,!1);this.Lj(!0);var b,d,e=!1,g;if(!this.Df){this.Xm(a);var f=["gsc-results",a.J.$d()][Nd](" ");m(a.ib,f);this.Le(a,!1,!0);this.Uh(a,!1,!1);a.Kj(google[v].fb.Mj);this.pd.Sm&&(d=a.J.Nh)&&a.ib[Hb](d[Ob](!0),a.wa);if(f=a.J.spelling)if(!f.html&&a.J.Nf&&a.J.Nf(f),f.html){var k=f.html[Ob](!0),l=k[ac]("a");f[jd]&&"SPELL_CORRECTED_RESULTS"==f[jd]?l&&1<l[G]&&(this.Uj(a.J,f.correctedQuery,l[0],f.correctedParamName,f.correctedParamValue),
this.Uj(a.J,f.originalQuery,l[1],f.originalParamName,f.originalParamValue)):l&&0<l[G]&&this.Uj(a.J,f.correctedQuery,l[0]);g=X(a.J.$d());$(g,"gsc-result");R(g,k);a.ib[Hb](g,a.wa)}f=a.J.context||{};l=this.Bc&&f;this.zb&&!this.zr&&l&&(d=f[pd],g=this.Vc(a),d&&!g.J.Xb&&ph(g.Ha.ra,this.Vm(google[v].U.Vd(d))),this.zr=!0);var n=a.J.promotions;if(n&&0<n[G])for(d=0;d<n[G];d++)b=n[d],b.html||a.J.Wh(b,this.pd),b.html&&(g=X(a.J.$d()),$(g,"gsc-result"),$(g,"gsc-promotion"),k=b.html[Ob](!0),R(g,k),a.ib[Hb](g,a.wa));
n=a.J.results;a.J.rd&&400<=a.J.completionStatus?(n=[],n[B](a.J.Dr())):0==n[G]&&a.mb.Rd&&200==a.J.completionStatus&&(n=[],n[B](a.J.Er(a.mb.Rd)));m(this.Cf,"gsc-above-wrapper-area");this.Km(a.J);this.na&&this.Cr();this.Wb&&this.Nm();this.qd&&this.Mm();d=this.X&&this.X.lb&&"Web"==this.X.lb.Xb&&0<a.J.results[G]&&0===a.J[ec].currentPageIndex;if(f.html&&d){g=X(a.J.$d());$(g,"gsc-result");k=f.html[Ob](!0);R(g,k);d=Sh(g,"div","gsc-facet-label");for(var q=0;q<d[G];q++)if(b=d[q]){var s=b[ac]("a"),k=this.Vc(a);
b=0;for(var x;x=s[b];b++){var y=x[Bd]("data-refinementLabel");if(y!=a.J.lc()){var F=x[Bd]("label-with-op");F||(F=y);Hh(x,jh(this,this.Tj,[k,F]))}else $(x,"gs-labelActive")}}a.ib[Hb](g,a.wa)}Ih()&&(this.Hb=a);for(d=0;d<n[G];d++)if(b=n[d],b.html||a.J.Qa(b),b.html){e=!0;g=X(a.J.$d());$(g,"gsc-result");a.J.Ff&&$(g,"gsc-result-"+a.J.Ff);k=b.html[Ob](!0);if(b.GsearchResultClass==google[v].xa.Va&&a.mb.Qh)for(q=k[ac]("img"),s=0;s<q[G];s++)google[v].A.Yb(b.tbWidth,b.tbHeight,a.mb.Qh,q[s]);R(g,k);this.Im&&
(k=Sh(g,"div","gs-richsnippet-box")[0])&&(Pa(k[u],"block"),q=th(Q["structured-data"],"gsc-richsnippet-showsnippet-label"),R(k,q),Hh(q,jh(this,this.Jr,[b.url,b.richSnippet])));(k=Sh(g,"div","gs-per-result-labels")[0])&&(q=Sh(k,null,"gs-add-label")[0])&&Hh(q,jh(this,this.Ir,[b.url,b.titleNoFormatting,k]));if(b.perResultLabels&&this.zb&&(k=Sh(g,"div","gs-per-result-labels")[0]))for(s=k[ac]("a"),k=this.Vc(a),q=Ih()?1:0;x=s[q];q++)y=x[Bd]("data-refinementLabel"),y!=a.J.lc()?((F=x[Bd]("label-with-op"))||
(F=y),Hh(x,jh(this,this.Tj,[k,F]))):$(x,"gs-labelActive");this.Lh&&(k=this.Jj,q=V("","gsc-keeper"),Xa(q,k),R(g,q),ob(q,jh(this,google[v].B[H].Gr,[b,a])));if(d>=a.J.Hj)0==d&&a.mb.jc==google[v].B.Wd&&Pa(a.wa[u],"none"),(b=this.Ua[google[v].Ea.Cb].ua)&&b[Jd]==a.wa?a.wa[Hb](g,b):R(a.wa,g);else a.ib[Hb](g,a.wa)}a.J.ta&&a.J.gwsUrl&&a.J[ec]&&(d=X("gsc-cursor-box gs-bidi-start-align"),d.dir="ltr",g=this.Br(a),d[p](g),R(a.wa,d));e?(ph(a.Hf,rh("("+a.J.results[G]+")")),a.mb.jc==google[v].B.Wd||a.mb.jc==google[v].B.Be?
this.Le(a,!0):this.Le(a,!1),(e=a.J.Ym())&&R(a.ib,e)):(ph(a.Hf,rh("(0)")),this.Xm(a),this.Le(a,!1));a.mb.jc=a.mb.Rm;this.pd.Sm||(d=a.J.Nh)&&R(a.ib,d[Ob](!0));if(this.zb&&l&&(0==a.Ob||a.Ae)){k=this.Vc(a);e=0==a.Ob&&this.Fr(a);l=a.Ae&&1==k.Ya[G];if(e||l){if(e&&this.Ar(a),f.facets&&0<f.facets[G]){e&&this.Om(a);g=!1;n=f.facets;if(n[G]>this.xe&&0<f.display_facets[G]&&-1!==this.xe)for(n[Dd](function(a,b){return b[nc]-a[nc]}),d=n[G];d>this.xe;d--)n.pop();for(d=0;d<n[G];d++){f=n[d];b=f.label_with_op;if(!b||
this.Ij)b=f[Fc];e||l&&!a.J.Xd(b)?this.Pm(k,b,f[Ad]):(a.J.hc(f[Ad]),this.Zm(k),g=!0)}l&&!g&&this.Zm(k)}}else if(a.Ae&&f.facets&&0<f.facets[G])for(n=f.facets,d=0;d<n[G];d++)f=n[d],a.J.Xd(f[Fc])&&a.J.hc(f[Ad]);a.Ae&&(a.Ae=!1)}this.zb&&this.Bc&&this.X&&a==this.X.Hb&&this.Lm(a);this.zb&&this.Hr(a);this.Nj();this.Gf&&this.Gf(this,a.J)}};google[v].B[H].onSearchComplete=google[v].B[H].nb;M=google[v].B[H];
M.Pm=function(a,b,d){var e=a.J,g=e.oj();g.pj(b);g.hc(d);b=new google[v].$a;b.Rd=a.mb.Rd;this.Zd(g,b,a);g.Da(e.Ka);e.va&&g.Hp(e.va);e=a.Ya[a.Ya[G]-1];this.bk(e,a);this.ln(e);$(e.Ha.Db,"gsc-tabData");$(e.Ha.Db,"gsc-tabdInactive");return e};M.Hr=function(a){var b=this[Sc][cd];a=this.Vc(a);if(a.Ya)for(var d=0;d<a.Ya[G];d++){var e=a.Ya[d];ph(e.Ha.ra,this.Vm(google[v].U.Vd(e.J.Hl()[r](/\$q/g,b))))}};M.Vc=function(a){return a.dh||a};
M.Lm=function(a){a.Lc?(Kh(a.Lc,"gsc-refinementBlockInvisible"),this.X!=a.Zg&&(this.X=a.Zg,this.Ue(this.X))):a.dh&&a.dh.Lc&&Kh(a.dh.Lc,"gsc-refinementBlockInvisible")};M.Fr=function(a){var b=a.J.context?a.J.context.facets:null;if(!b)return 0<a.Ya[G];if(b[G]!=a.Ya[G])return!0;for(var d=0;d<b[G];d++){var e=b[d].label_with_op;e||(e=b[d][Fc]);if(!a.Ya[d].J.Xd(e))return!0}return!1};M.Ar=function(a){if(0!=a.Ya[G]){var b=a.Lc;oh(b);b[Jd][xd](b);for(a.Lc=null;0<a.Ya[G];)b=a.Ya.pop(),oh(b[Ic]),this.Cd[xd](b[Ic])}};
M.Br=function(a){for(var b=X("gsc-cursor"),d=a.J[ec],e=0;e<d.pages[G];e++){var g="gsc-cursor-page";e==d.currentPageIndex&&(g+=" gsc-cursor-current-page");g=V(d.pages[e][Fc],g);Hh(g,jh(this,google[v].B[H].hw,[a,e]));b[p](g)}return b};
google[v].B.nq={border:"border",borderColor:"border-color",borderStyle:"border-style",borderWidth:"border-width",borderTop:"border-top",borderTopColor:"border-top-color",borderTopStyle:"border-top-style",borderTopWidth:"border-top-width",borderRight:"border-right",borderRightColor:"border-right-color",borderRightStyle:"border-right-style",borderRightWidth:"border-right-width",borderBottom:"border-bottom",borderBottomColor:"border-bottom-color",borderBottomStyle:"border-bottom-style",borderBottomWidth:"border-bottom-width",
borderLeft:"border-left",borderLeftColor:"border-left-color",borderLeftStyle:"border-left-style",borderLeftWidth:"border-left-width",color:"color",cssFloat:"float",styleFloat:"float",clear:"clear",cursor:"cursor",display:"display",font:"font",fontFamily:"font-family",fontSize:"font-size",fontStyle:"font-style",fontWeight:"font-weight",height:"height",margin:"margin",marginTop:"margin-top",marginRight:"margin-right",marginBottom:"margin-bottom",marginLeft:"margin-left",overflow:"overflow",padding:"padding",
paddingTop:"padding-top",paddingRight:"padding-right",paddingBottom:"padding-bottom",paddingLeft:"padding-left",textAlign:"text-align",textDecoration:"text-decoration",textTransform:"text-transform",verticalAlign:"vertical-align",visibility:"visibility",width:"width"};
google[v].B.pq=function(a,b){if(hh("safari")||hh("konqueror"))alert("google.search.SearchControl.inlineCurrentStyle is not supported on Safari");else{var d=!0;b&&(d=b);if(d)for(d=0;d<a[Sb][G];d++)google[v].B.pq(a[Sb][d],!0);if(1==a[Yc]){var e,g,f=!1,d=!1;window[pc]?(e=window[pc](a,null),f=g=!0):a[Fd]&&(e=a[Fd],g=!1,f=!0);if(f){for(var k in e)if(google[v].B.nq[k]){var f=google[v].B.nq[k],l=e[k];"display"==k&&"none"==l&&(Xa(a,""),d=!0);""!=e[k]&&(g?a[u].setProperty(f,l):a[u][Nb](f,l))}d&&!g&&(a.outerHTML=
'<div style="display:none"/>')}}}};google[v].B.inlineCurrentStyle=google[v].B.pq;google[v].B[H].it=function(a){a=a?a:this[Ic];var b=null;window[pc]?b=window[pc](a,null):a[Fd]?b=a[Fd]:h[kd][pc]&&(b=h[kd][pc](a,null));return b?ta(b[zb],10):300};google[v].B[H].bh=function(a,b){this.Gf=nh(a,b)};google[v].B[H].setSearchCompleteCallback=google[v].B[H].bh;google[v].B[H].Ry=function(a,b){this.gk=nh(a,b)};google[v].B[H].setSearchStartingCallback=google[v].B[H].Ry;
google[v].B[H].wo=function(a,b){this.hk=nh(a,b)};google[v].B[H].setTrackingCallback=google[v].B[H].wo;
google[v].B[H].El=function(a,b){a.Kj(b);var d=!1;switch(b){default:case google[v].fb.xk:a.wa&&Pa(a.wa[u],"none");break;case google[v].fb.wk:a.wa&&Pa(a.wa[u],"block");a.J.Ka!=google[v].A.Zb&&(d=!0);a.J.Da(google[v].A.Zb);break;case google[v].fb.Cn:a.wa&&Pa(a.wa[u],"block"),a.J.Ka!=google[v].A.tc&&(d=!0),a.J.Da(google[v].A.tc)}d&&(d=this[Sc][cd],d[G]&&(this.Df=!1,this.Nj(),a.mb.jc=google[v].B.Be,this.Mh(a,!0),a.J.qa(d)))};
google[v].B[H].hw=function(a,b){this.Df=!1;this.Nj();this.Mh(a,!0);a.mb.jc=google[v].B.Be;this.Ug=b+1;if(this.jb&&this.jb[vc]()){var d=this.jb.Rg();d[google[v][D].Zc]=b+1;this.jb[vb](d)}this.$k(this.Qe,b+1);a.J.vp(b);this.Bf&&this.bl(this.Ug);this.tb.scrollIntoView()};
google[v].B[H].Nn=function(a){!a||google[v][D].isSupported()&&google[v][D].Vv()||a(this);a={};this.La||this.fp(this.X,a);this.Qe&&(a[google[v][D].Xg]=this.Qe);this.Ug&&(a[google[v][D].Zc]=this.Ug);this.jb=new google[v][D](a,nh(this,google[v].B[H].Uv));return this.jb[vc]()};google[v].B[H].startHistoryManagement=google[v].B[H].Nn;
google[v].B[H].uq=function(a,b){var d=null;if(null==a||0>a||a>=this.Y[G])d=this.X;else{var e=this.Y[a];if(e.J.N&&b){var g=b;e.J.nd&&(g=e.J.nd(b));d=this.cq(e,g);d||(e.Lc||this.Om(e),d=this.Pm(e,g,b),d.Ae=!0,d=d.Ha)}else d=e.Zg||e.Ha}return d};
google[v].B[H].Uv=function(a){var b=this.uq(a[google[v][D].rj],a[google[v][D].qj]);if(b){if(this.Wb){var d;null!=a[google[v][D].Vi]&&(d=this.ak(a[google[v][D].Vi]));null==d&&(d=this.Qd);this.zk(d);this.di(d,b.lb)}d=a[google[v][D].Xg]||"";a=a[google[v][D].Zc];if(null==a||0>=a)a=1;this.X==b?d?this.qa(d,a):this.Yc():(this.mf(b,{$h:d,page:a}),d||this.Yc())}};
google[v].B[H].fp=function(a,b){for(var d=this.Vc(a.Hb),e=0;e<this.Y[G];e++)if(this.Y[e]==d){b[google[v][D].rj]=e;break}d=a.lb;d.lc&&null!=d.lc()?b[google[v][D].qj]=d.lc():delete b[google[v][D].qj]};
google[v].Ca=function(a,b,d){google[v].Ca.qm++;var e=Bh("gsc-search-box");e.acceptCharset="utf-8";var g=null,f=Q["search-uc"],k=Q[v];d&&d.Di&&d.Wf&&(f="");d&&(d.buttonText&&(k=f=d.buttonText),d.clickableBrandingUrl&&(g="https://www.google.com","string"==typeof d.clickableBrandingUrl&&d.clickableBrandingUrl[Ib](/^https:\/\/[a-z]*\.google\.com/)&&(g=d.clickableBrandingUrl),g=yh(g,null,"_BLANK"),m(g,"gsc-branding-clickable")));if(d&&d.Di)if(""==f){var f=google[Ed][ld]+"/css/v2/search_box_icon.png",l=h[t]("input");
ab(l,"image");l.src=f;m(l,"gsc-search-button gsc-search-button-v2");f=l}else f=Dh(f,"gsc-search-button");else f=Ch(f,"gsc-search-button");this.Bi=f;jb(this.Bi,k);Ua(this,Eh(null,"gsc-input",null));cb(this[Sc],"search");jb(this[Sc],k);f=this[Sc];d&&d.Di&&d.Wf&&(m(this[Sc],""),Aa(this[Sc][u],"100%"),Ba(this[Sc][u],"0 2px 0 0"),this.pm=X("gsc-input-box"),this.pm.id="gsc-iw-id"+google[v].Ca.qm,R(this.pm,this[Sc]),f=this.pm);d&&d.Di&&(this[Sc].id="gsc-i-id"+google[v].Ca.qm);l=h[t]("input");ab(l,"hidden");
cb(l,"bgresponse");l.id="bgresponse";k=uh(null,null,"gsc-search-box");R(e,k);k=vh(k,0);this.mm=wh(k,"gsc-input");var n=wh(k,"gsc-search-button");R(this.mm,f);R(this.mm,l);R(n,this.Bi);f=uh(null,null,"gsc-branding");R(e,f);l="gsc-branding-img-noclear";n=vh(f,0);this.userDefinedCell=wh(n,"gsc-branding-user-defined");var q=wh(n,"gsc-branding-text"),f=wh(n,l),s=V(Q["powered-by"],"gsc-branding-text"),x;x=google[Ed][ld]+"/css/small-logo.png";mh()?(l=X(l),l[u].filter='progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+
x+'")',Aa(l[u],"51px"),Qa(l[u],"15px")):l=xh(x,null,null,l);x=l;R(q,s);g?(R(g,x),R(f,g)):R(f,x);d&&d.Ys||Pa(n[u],"none");this.Ai=e;oh(b);R(b,this.Ai);a&&(l="gsc-branding-img",this.nm=V(Q.blank,"gsc-clear-button"),jb(this.nm,Q["clear-results"]),a=wh(k,"gsc-clear-button"),R(a,this.nm),m(f,l),m(x,l))};Rd("google.search.SearchForm",google[v].Ca,void 0);google[v].Ca.Ik=("https:"==h[mc][xc]?"https:":"https:")+"//www.google.com/cse/intl/"+google[v][Kd]+"/images/google_custom_search_watermark.gif";
google[v].Ca.dt="#FFFFFF "+google[v].U.Rq+" no-repeat";google[v].Ca.Uw=function(){return"#FFFFFF url("+google[v].Ca.Ik+") "+google[v].U.Rq+" no-repeat"};google[v].Ca.qm=0;google[v].Ca[H].Py=function(a,b){this.gr=jh(this,this.Rx,[this]);this.Bj=jh(a,b,[this]);this.Ai.onsubmit=this.gr;ob(this.Bi,this.gr)};google[v].Ca[H].setOnSubmitCallback=google[v].Ca[H].Py;google[v].Ca[H].io=function(a,b){ob(this.nm,jh(a,b,[this]))};google[v].Ca[H].setOnClearCallback=google[v].Ca[H].io;
google[v].Ca[H].Rx=function(){var a=this.mm[Db],b=this[Sc][cd];this.Bj&&this.Bj();if(mh()){var d=this,e;e=8*b[G]>=a?a-6:"99%";window[gc](function(){Aa(d[Sc][u],e)},1)}return!1};google[v].Ca[H].qa=function(a){a&&Ya(this[Sc],a);this.Bj&&this.Bj()};google[v].Ca[H].execute=google[v].Ca[H].qa;google[v].I=function(a,b){this.Xn=(new Date)[Wb]();google[v].B[zd](this);b=b||{};this.pd=google[v].A.wt(b.forceV2LookAndFeel);this.zb=!0;this.eb=null!=b._enableApiary_?!!b._enableApiary_:!0;this.Da(b.resultSetSize||google[v].A.tc);var d={};if(b.adoptions)for(var e in b.adoptions)b.adoptions[oc](e)&&(d[e]=b.adoptions[e]);d.iframes=!0;d.adtest=b.adtest||null;d.channel=b.adchannel||null;b.enableMobileLayout&&(d.includeSideAds=!1,d.numTopAds=2);window.innerWidth<google[v].I.tt&&(d.includeSideAds=!1,d.numTopAds=
2);this.Tg(b.adclient||"",d);this.Oh=b.autoCompleteOptions;this.vo=google[v].I.ro(a,this.Oh);this.Vh=a;this.Vh||(this.Vh={crefUrl:"https://www.google.com/coop/tools/autocse?referer="+window[mc]},this.Lr=!0);this.mk=google[v].I.yn;this.Ij=b.defaultToRefinement;this.Bf=(this.uo=b.bookmarkOptions)?this.uo.showBookmarkLink||!1:!1;this.Wa=null;if(!b.disableWebSearch||!b.enableImageSearch){var g={};b[google[v].A.Ja]&&(g[google[v].A.Ja]=b[google[v].A.Ja]);b[google[v].A.Xa]&&(g[google[v].A.Xa]=b[google[v].A.Xa]);
if(b.webSearchOptions)for(e in b.webSearchOptions)g[e]=b.webSearchOptions[e];this.vt(g)}this.Za=null;if(b.enableImageSearch){d={};b[google[v].A.Xa]&&(d[google[v].A.Xa]=b[google[v].A.Xa]);if(b.imageSearchOptions)for(e in b.imageSearchOptions)d[e]=b.imageSearchOptions[e];this.ut(d);b.defaultToImageSearch&&this.Wa&&(this.mk=google[v].I.xn)}this.Wa&&this.Za&&this.hc({web:Q.web,image:Q.image});b.googleAnalyticsOptions&&b.googleAnalyticsOptions.queryParameter&&(this.Zk=b.googleAnalyticsOptions,this.wo(null,
google[v].I.xt));b.enableOrderBy&&(this.Jm=!0,this.Tc=b.orderByOptions&&b.orderByOptions.keys&&0<b.orderByOptions.keys[G]?b.orderByOptions.keys:[{key:"",label:Q["order-by-relevance"]},{key:"date",label:Q["order-by-date"]}],void 0!==g&&b.orderByOptions&&g["restrict-extended"]&&void 0!==g["restrict-extended"][Dd]&&(this.Qd=this.ak(g["restrict-extended"][Dd])||0),void 0==this.Qd&&(this.Qd=0));this.Qm=b.overlayResults?!0:!1;this.Im=b.enableRichSnippets?!0:!1;this.Yn=!0};
Rd("google.search.CustomSearchControl",google[v].I,void 0);eh(google[v].I,google[v].B);google[v].I.Ul=(new Date)[Wb]();google[v].I.ve=null;google[v].I.Kq=!1;google[v].I.Uo=function(){var a=google[v].I;a.Kq||(a.ve=new Image,za(a.ve,a.ve.onerror=a.ve.onabort=a.ve.ontimeout=function(){a.ve=null}),a.ve.src="https://www.googleapis.com/generate_204",a.Kq=!0)};google[v].A.Jk()&&google[v].I.Uo();
google[v].I[H].vt=function(a){this.Wa||(this.Wa=new google[v].G,this.Wa.Ub(this.Vh),this.Wa.Ni=Q["custom-search"],this.Wa.eb=this.eb,this.Zd(this.Wa),a&&(a.resultSetSize&&this.Wa.Da(a.resultSetSize),a[google[v].A.Ja]&&this.Wa.Ra(google[v].A.Ja,a[google[v].A.Ja]),a[google[v].A.Xa]&&this.Wa.Ra(google[v].A.Xa,a[google[v].A.Xa]),a.linkTarget&&this.Wa.Oa(a.linkTarget),a.queryAddition&&this.Wa.Fb(a.queryAddition)))};
google[v].I[H].ut=function(a){this.Za||(this.Za=new google[v].C,this.Za.Ub(this.Vh),this.Za.eb=this.eb,this.Zd(this.Za),a&&(a.resultSetSize&&this.Za.Da(a.resultSetSize),this.Za.Te(a.layout||google[v].D.Hd),a[google[v].A.Xa]&&this.Za.Ra(google[v].A.Xa,a[google[v].A.Xa]),a[google[v].A.Ja]&&this.Za.Ra(google[v].A.Ja,a[google[v].A.Ja]),a.linkTarget&&this.Za.Oa(a.linkTarget),a.queryAddition&&this.Za.Fb(a.queryAddition)))};google[v].I[H].Jy=function(a){this.vo="string"==typeof a?a:null};
google[v].I[H].setAutoCompletionId=google[v].I[H].Jy;google[v].I.ro=function(a,b){var d="string"==typeof a?a:null;if(b){var e={prefix:0,ordered:3,any:1},g=b.matchType;g&&e[g]&&(d=d+"+qptype:"+e[g]);if(e=b.validLanguages)for(e=e[hc](","),g=0;g<e[G];++g)e[g]&&(d=d+"+lang:"+e[g])}return d};google[v].I[H].ij=function(){return this.vo};google[v].I[H].getPartnerId=google[v].I[H].ij;google[v].I.oy=function(a,b,d,e,g,f,k,l){return google[v].I.Pq(a,b,d,{saytActor:e,callback:g,maxCompletions:f,styleOptions:l})};
google[v].I.attachAutoCompletion=google[v].I.oy;
google[v].I.Pq=function(a,b,d,e){if(d instanceof google[v].B&&window[Ac])return window[Ac].log("We no longer support attachAutoCompletionWithOptions for SearchControl object"),{};a=google[v].I.ro(a,e);e=e||{};var g="string"==typeof d?$h(d):d;b=$h(b);if(!g)for(var f=b;f;)f=f[Jd],Zh(f)&&(g=f);var f=ch(),k={interfaceLanguage:google[v][Kd],saytSubmit:e.saytActor,maxSuggestions:e.maxCompletions,maxPromotions:e.maxPromotions,styleOptions:e.styleOptions,isLoggingWithHiddenFormFields:e.isLoggingWithHiddenFormFields,saytKeyboardNavigationEnabled:e.saytKeyboardNavigationEnabled,
saytExtraParameters:e.saytExtraParameters};(e=e.searchButton?$h(e.searchButton):null)&&("submit"!=e[jd]?k.searchButton=e:window[Ac]&&window[Ac].warn("Cannot associate searchButton with a button of type submit."));if(k.isLoggingWithHiddenFormFields&&!k.searchButton)return window[Ac]&&window[Ac].warn('The "searchButton" option is required when "isLoggingWithHiddenFormFields" is true.'),{};e=d&&(d.execute||d[Uc]);Zh(g)?(k.isLoggingWithHiddenFormFields=k.isLoggingWithHiddenFormFields||ci(ai(g.action)),
f.jl(g,b,a,k)):f.Ru(e?nh(d,e):function(){},b,a,k);return{getInputQuery:f.cb,prefillQuery:f.Sc}};google[v].I.attachAutoCompletionWithOptions=google[v].I.Pq;google[v].I[H].vy=function(a){if(this.Ud){if(a)throw"Please use constructor of CustomSearchControl to pass in additional options.";this.Td.da(!1)}};google[v].I[H].enableAutoCompletion=google[v].I[H].vy;
google[v].I[H].xu=function(){var a=(new Date)[Wb]();if(window.googleLT_&&1==window.googleLT_%100){var b=google[v].I.Ul-window.googleLT_,d=this.Xn-window.googleLT_,a=a-window.googleLT_;0<b&&0<d&&0<a&&google[Ed].recordCsiStat(["asa_cse"],["cl."+b,"cc."+d,"cd."+a])}};
google[v].I[H].Pf=function(a,b){var d=b;d||(d=new google[v].pa);d.Wo(google[v].B.fc);this.Lr&&1==this.Y[G]&&(this.ku=!0);this.Ne(google[v].B.Ro);d.ec!=google[v].B.Qf&&this.eb&&google[v].I.Uo();google[v].B[H].Pf[zd](this,a,d);var d=this.La?"gsc-control-searchbox-only":"gsc-control-cse",e=this[Ic];this.La||(e=X(),this[Ic][Jd]&&this[Ic][Jd][Hb](e,this[Ic]),R(e,this[Ic]),m(this[Ic],"gsc-control-wrapper-cse"));m(e,d);$(e,d+"-"+google[v][Kd]);this.xu();if(this.Um){d=google[v].F[I].pl(window[mc][v])||{};
e=ta(d[Oc],10);if(ha(e)||0>=e)e=1;this.qa(d.query,e,{bm_req:"1"})}};google[v].I[H].draw=google[v].I[H].Pf;
google[v].I[H].Ll=function(a,b,d,e,g){if(this.La)this.up();else{var f=this.tb[Db];Kh(this.kc,"gsc-thinWrapper");this.Yn&&(f=this.Jv(),this.Yn=!1);this.Tm=f;f<google[v].I.Fv?this.wd=!1:f<google[v].I.Hv?this.Tg(this.Dd,{includeVerticalAds:!1}):(f={includeVerticalAds:f>=google[v].I.Gv},this.Ap&&(f.numTopAds=google[v].I.Iv),this.Tg(this.Dd,f));if((new Date)[Wb]()-this.Xn<google[v].I.Ev&&this.wd)try{var k=xa(window[mc][zc])[r](/\+/g," "),l=xa(a)[r](/\+/g," ");this.wd=-1!=k[dd](l)}catch(n){}google[v].B[H].Ll[zd](this,
a,b,d,e,g)}};google[v].I[H].Jv=function(){var a=sh(google[v].I.bx());a[u].fontFamily="arial";a[u].fontSize="16px";gb(a[u],"hidden");R(this.tb,a);var b=this.tb[Db];this.tb[xd](a);return b};google[v].I.bx=function(){for(var a="",a="a a a a a ",b=5;80>b;b*=2)a+=a;return a};google[v].I[H].hc=function(a){"string"==typeof a?this.Wa?this.Wa.hc(a):this.Za&&this.Za.hc(a):(a.web&&this.Wa&&this.Wa.hc(a.web),a.image&&this.Za&&this.Za.hc(a.image))};google[v].I[H].setUserDefinedLabel=google[v].I[H].hc;
google[v].I[H].Zd=function(a,b,d){google[v].B[H].Zd[zd](this,a,b,d);a.jf="gcsc"};google[v].I[H].addSearcher=google[v].I[H].Zd;google[v].I[H].uy=function(){this.Tg("",{numTopAds:0,numSideAds:0,_includeBottomAds_:!1});this.Io=!1};google[v].I[H].disableAds=google[v].I[H].uy;google[v].I[H].My=function(){this.Ap=!0};google[v].I[H].setMoreAds=google[v].I[H].My;google[v].I[H].Ay=function(){return this.Za};google[v].I[H].getImageSearcher=google[v].I[H].Ay;google[v].I[H].Ey=function(){return this.Wa};
google[v].I[H].getWebSearcher=google[v].I[H].Ey;google[v].I[H].pr=function(a){var b=a.oa;"web"==b&&(b="");a.N&&a.lc()&&(b=b?b+":"+a.lc():a.lc());return b};google[v].I[H].getTrackingCategory=google[v].I[H].pr;
google[v].I.xt=function(a,b,d){var e=h[mc];d=[e.pathname,e[v],e[v]?"&":"?",c(a.Zk.queryParameter),"=",c(d)];a.Zk.categoryParameter&&(b=a.pr(b))&&d[B]("&",c(a.Zk.categoryParameter),"=",c(b));window._gaq&&"function"==typeof window._gaq[B]?window._gaq[B](["_trackPageview",d[Nd]("")]):window[Ac]&&window[Ac].log("Google Analytics tracking was not correctly setup.")};google[v].I.gy="";google[v].I.AUTO_PUBID=google[v].I.gy;google[v].I.yn=0;google[v].I.xn=1;google[v].I.Fv=250;google[v].I.Hv=500;
google[v].I.Gv=795;google[v].I.Ev=500;google[v].I.tt=480;google[v].I[H].Ap=!1;google[v].I.Iv=4;google[v].I.Tw=new RegExp('^url\\("?'+google[v].Ca.Ik+'"?\\)$');google[v].xa=function(){google[v].A[zd](this);this.oa="video";this.Gc="/GvideoSearch";this.sc="https://video.google.com/videosearch";this.Lb=!1;this.of=!0;this.Fc=nh(this,this.hd);this.Se="gsc-videoConfig";this.ma=null};Rd("google.search.VideoSearch",google[v].xa,void 0);eh(google[v].xa,google[v].A);google[v].xa.Va="GvideoSearch";google[v].xa.RESULT_CLASS=google[v].xa.Va;google[v].xa.Z=[];
google[v].xa.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].xa.Z,f,b);google[v].xa.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};google[v].xa.RawCompletion=google[v].xa.Sa;google[v].xa[H].Ac=function(a,b){return google[v].A.Rb(google[v].xa.Z,[this,a,b])};google[v].xa[H].dc=function(a,b,d){b=this.Pc(null==b?"google.search.VideoSearch.RawCompletion":b,d);this.Ma&&(a=a+" "+this.Ma);a="&q="+c(a);this.Lb&&(a+="&scoring=d");this.ta=a;d&&0!=d&&(this.ta=this.ta+"&start="+d);return b+a};
google[v].xa[H].Qa=function(a){a.html&&delete a.html;var b=X(this.Ld());$(b,"gs-result");var d=X("gs-image-box"),e=X("gs-text-box"),g=uh(),f=vh(g,0),k=wh(f,"gs-image-box"),f=wh(f,"gs-text-box");R(k,d);R(f,e);R(b,g);g=google[v].A.Yb(a.tbWidth,a.tbHeight,this.va);g=xh(a.tbUrl,g[zb],g[Hc],"gs-image");k=yh(a.url,null,this.ya(),"gs-image");m(k,"gs-image");R(k,g);R(d,k);d=zh(a.url,a[pd],this.ya(),"gs-title");R(e,d);d=V(a[Cb],"gs-snippet");mh()&&Qa(d[u],"2.6em");R(e,d);d=V(this.vf(new Date(a.published)),
"gs-publishedDate");R(e,d);d=zh("https://"+a.publisher,a.publisher,this.ya(),"gs-publisher");R(e,d);a.html=b;this.Mc(a.html)};google[v].xa[H].createResultHtml=google[v].xa[H].Qa;
google[v].xa.ty=function(a,b){var d=null;if(a.playUrl&&""!=a.playUrl){var d=a.playUrl,e="gsc-video-player";b&&(e=b);if(hh("opera")){var g=h[t]("object");m(g,e);g[Nb]("type","application/x-shockwave-flash");g[Nb]("data",d)}else g=h[t]("embed"),m(g,e),g[Nb]("type","application/x-shockwave-flash"),g[Nb]("src",d),a.videoType?"Google"==a.videoType?g[Nb]("bgcolor","#000000"):g[Nb]("wmode","transparent"):g[Nb]("bgcolor","#000000");d=X(b);d[p](g)}return d};google[v].xa.createPlayer=google[v].xa.ty;
google[v].xa[H].Gb=function(a){this.Lb=a==google[v].A.kd?!0:!1};google[v].xa[H].setResultOrder=google[v].xa[H].Gb;
google[v].xa[H].hd=function(a,b){if(b){if(null==this.ma){var d=X("gsc-configSetting");this.ma=Fh(null,"0",this.Lb,"gsc-configSettingCheckbox");R(d,this.ma);R(d,V(Q["sort-by-date"],"gsc-configSettingCheckboxLabel"));var e=X("gsc-configSettingSubmit");R(e,Ch(Q[rc],"gsc-configSettingSubmit"));R(d,e);R(a,d)}else Fa(this.ma,this.Lb);this.ma[Jb]()}else this.ma&&(this.ma[fc]?this.Gb(google[v].A.kd):this.Gb(google[v].A.oh))};google[v].K=function(){google[v].A[zd](this);this.oa="web";this.Gc="/GwebSearch";this.sc="https://www.google.com/search";this.Ia=this.gd=this.he=null;this.fa={};this.P=new google[v].uc};Rd("google.search.WebSearch",google[v].K,void 0);eh(google[v].K,google[v].A);google[v].K.Va="GwebSearch";google[v].K.RESULT_CLASS=google[v].K.Va;google[v].K.xf="cx";google[v].K.cxRestriction_CX=google[v].K.xf;google[v].K.Qc="cref";google[v].K.cxRestriction_CREF=google[v].K.Qc;google[v].K.Cm="none";
google[v].K.cxRestriction_NONE=google[v].K.Cm;google[v].K.Z=[];google[v].K.de={as_dt:!0,as_epq:!0,as_eq:!0,as_lq:!0,as_nlo:!0,as_nhi:!0,as_oq:!0,as_q:!0,as_qdr:!0,as_rq:!0,as_sitesearch:!0,cr:!0,c2coff:!0,filter:!0,gl:!0,hq:!0,lr:!0,query:!0,richsnippet:!0,sort:!0,usg:!0};google[v].K.Gl=20;google[v].K.me="data-cturl";google[v].K.se="data-ctorig";google[v].K.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].K.Z,f,b);google[v].K.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};
google[v].K.RawCompletion=google[v].K.Sa;google[v].K[H].oj=function(){var a=new google[v].K;this.Pi(a);a.Ia=this.Ia;a.fa=this.fa;a.P=this.P[tc]();a.N=this.N;return a};google[v].K[H].uj=function(a){var b=google[v].A.Rb(google[v].K.Z,[this,null,null]);google[v].K.Sa(b,a,200,void 0,200)};google[v].K[H].renderJson=google[v].K[H].uj;M=google[v].K[H];M.nd=function(a){a=Th(a);return a[r](/\s+/g,"_")[Od]()};M.Xd=function(a){return this.N?this.P.Ga==this.nd(a):!1};
M.zc=function(a){return this.N&&this.P.Ga?a[r](new RegExp(" more:"+this.P.Ga+"$"),""):a};M.Ac=function(a,b){return google[v].A.Rb(google[v].K.Z,[this,a,b])};
M.qa=function(a,b,d){window[Ac]&&window[Ac].log&&window[Ac].log("The Google Web Search API has been officially deprecated. For more information on its deprecation, see https://developers.google.com/web-search/. We suggest you migrate to the Google Custom Search API. (see https://developers.google.com/custom-search/)");return google[v].A[H].qa[zd](this,a,b,d)};google[v].K[H].execute=google[v].K[H].qa;
google[v].K[H].dc=function(a,b,d){b=null==b?"google.search.WebSearch.RawCompletion":b;a=[a];this.Ma&&a[B](this.Ma);a=a[Eb](this.P.qe())[Nd](" ");if(this.N&&this.he){var e=this.he,e=e[r](/__HL__/,google[v][Kd]);this.gd=e=e[r](/__QUERY__/,c(a))}var e=this.P.pe(),g=[],f;for(f in e)g[B](f+"="+e[f]);f="&"+g[Nd]("&");f+="&q="+c(a);this.Ia&&(f+="&safe="+this.Ia);this.fa&&(a=Uh(this.fa))&&(f+="&"+a);b=this.Pc(b,d);b+=f;this.ta=f;d&&0!=d&&(this.ta=this.ta+"&start="+d);window[qd][Ed].GoogleLocale&&(b=this.eb&&
this.N?b+("&googlehost="+c(window[qd][Ed].GoogleLocale)):b+("&gl="+c(window[qd][Ed].GoogleLocale)));return b};
google[v].K[H].Nf=function(a){a.html&&delete a.html;var b;if(a[jd]&&"SPELL_CORRECTED_RESULTS"==a[jd]){b=X("gs-result");var d=sh(Q["showing-results-for"]+" ","gs-spelling"),e=h[t]("a");Xa(e,google[v].U.Af(this.zc(a.correctedAnchor)));d[p](e);b[p](d);d=sh(Q["search-instead-for"]+" ","gs-spelling");$(d,"gs-spelling-original");e=h[t]("a");Xa(e,google[v].U.Af(this.zc(a.originalAnchor)));d[p](e)}else b=sh(Q.dym+" ","gs-spelling"),$(b,"gs-result"),d=h[t]("a"),Xa(d,google[v].U.Af(this.zc(a[Ad])));b[p](d);
a.html=b};google[v].K[H].createSpellingHtml=google[v].K[H].Nf;google[v].K[H].yh=function(a,b){var d=V(google[v].U.Vd(a.visibleUrl),"gs-visibleUrl");R(b,d);$(d,"gs-visibleUrl-short");d=V(google[v].U.Vd(a.url),"gs-visibleUrl");R(b,d);$(d,"gs-visibleUrl-long")};google[v].K[H].xh=function(a,b){var d=wh(a,"gs-promotion-image-cell"),e=X("gs-promotion-image-box");R(e,b);R(d,e)};
google[v].K[H].Wh=function(a,b){a.html&&delete a.html;var d=X("gs-promotion");$(d,"gs-result");var e=uh(0,1,"gs-promotion-table"),g=vh(e,0),f;R(d,e);var k;a.image&&(e=a.image.url[r]("resize_w=40","resize_w=60"),e=e[r]("resize_h=40","resize_h=60"),e=xh(e,null,null,"gs-promotion-image"),a.url&&(f=yh(a.url,"",this.ya()),a.clicktrackUrl&&google[v].K.md(f,a.clicktrackUrl,a.url),R(f,e),e=f),k=e,b.rf||google[v].K[H].xh(g,k));e=null;a.clicktrackUrl&&(e={},e[google[v].K.me]=a.clicktrackUrl,e[google[v].K.se]=
a.url);e=zh(a.url,a[pd],this.ya(),"gs-title",void 0,e);a.titleRight&&(f=th("","gs-promotion-title-right"),Xa(f," "+a.titleRight),R(e,f));e.dir=google[v].U.ph(e[$c]);$(e,"gs-bidi-start-align");f=wh(g,b.rf&&a.image?"":"gs-promotion-text-cell");R(f,e);b.Wi&&google[v].K[H].yh(a,f);var l;b.rf&&a.image?(e=uh(0,0,"gs-promotion-table-snippet-with-image"),g=vh(e,0),R(f,e),google[v].K[H].xh(g,k),l=wh(g,"gs-promotion-text-cell-with-image")):a.bodyLines&&(l=X(),R(f,l));if(a.bodyLines){g=a.bodyLines;k="right"==
a.bodyLinkAlignment;for(var n=0;n<g[G];n++){var q=g[n],s=q[pd],x=q.url,y=q.visibleUrl,e=X("gs-snippet"),F;s&&(F=th(""),Xa(F,s));var w;x&&y&&(w=yh(x,"",this.ya()),q.clicktrackUrl&&google[v].K.md(w,q.clicktrackUrl,x),q=th("","gs-title"),Xa(q,y),R(w,q));F&&k&&(R(e,F),w&&R(e,rh(" ")));w&&R(e,w);F&&!k&&(w&&R(e,rh(" ")),R(e,F));e.dir=google[v].U.ph(e[$c]);$(e,"gs-bidi-start-align");R(l,e)}}b.Wi||google[v].K[H].yh(a,f);a.html=d};google[v].K[H].createPromotionHtml=google[v].K[H].Wh;
google[v].K[H].Hh=function(a){delete a.html;0<a.display_facets[G]&&(a.html=google[v].ga.ka("facets",a))};google[v].K[H].createFacetResultHtml=google[v].K[H].Hh;
google[v].K[H].Qa=function(a){a.html&&delete a.html;nb(a,this.ya()||void 0);jb(a,a[pd]||a.visibleUrl);a.html=google[v].ga.ka("webResult",a,{isLabelUrl:Ih()});if(a.clicktrackUrl)for(var b=a.html[Lb];b;b=b[Vb])if(1==b[Yc]){"a"==b[Cc][Od]()&&b[zc]==a.unescapedUrl&&google[v].K.md(b,a.clicktrackUrl,a.unescapedUrl);for(var d=b[ac]("a"),e=0,g;g=d[e];e++)g[zc]==a.unescapedUrl&&google[v].K.md(g,a.clicktrackUrl,a.unescapedUrl)}this.Mc(a.html)};google[v].K[H].createResultHtml=google[v].K[H].Qa;
google[v].K.md=function(a,b,d){a[Nb](google[v].K.me,b);a[Nb](google[v].K.se,d)};google[v].K[H].Ub=function(a,b,d){this.rd=null;this.P=google[v].yc.hj(a,b);this.P instanceof google[v].Rc&&(this.N=!0,this.P[jd]()==google[v].K.Qc&&(this.rd=Q["linked-cse-error-results"]),d&&d[Ib](/__HL__/)&&d[Ib](/__QUERY__/)&&(this.he=d))};google[v].K[H].setSiteRestriction=google[v].K[H].Ub;M=google[v].K[H];M.th=function(){return this.N?this.P[jd]():null};M.uh=function(){return this.N?this.P.yf:null};
M.lc=function(){return this.N?this.P.Ga:null};M.pj=function(a){this.N&&a&&this.P.wj(a)};M.Ra=function(a,b){a==google[v].A.Xa&&(this.Ia=b?b==google[v].A.Vf||b==google[v].A.Uf||b==google[v].A.Fl?b:null:null);if(a==google[v].A.Ja)if(b)for(var d in b){var e=b[d];google[v].K.de[d]&&(this.fa[d]=e)}else this.fa={}};google[v].K[H].setRestriction=google[v].K[H].Ra;
google[v].K[H].Da=function(a){ha(ta(a,10))||(a=ta(a,10));this.N&&(0<a&&a<=google[v].K.Gl||google[v].A.Hc==a)?this.Ka=a:google[v].A[H].Da[zd](this,a)};google[v].K[H].setResultSetSize=google[v].K[H].Da;google[v].K[H].Oa=function(a){google[v].A[H].Oa[zd](this,a)};google[v].K[H].setLinkTarget=google[v].K[H].Oa;google[v].K[H].Fb=function(a){google[v].A[H].Fb[zd](this,a)};google[v].K[H].setQueryAddition=google[v].K[H].Fb;google[v].G=function(){google[v].A[zd](this);this.oa="web";this.Gc="/GcustomwebSearch";this.sc="https://www.google.com/search";this.Ia=this.gd=this.he=null;this.fa={};this.P=new google[v].uc};Rd("google.search.CustomWebSearch",google[v].G,void 0);eh(google[v].G,google[v].A);google[v].G.Va="GcustomwebSearch";google[v].G.RESULT_CLASS=google[v].G.Va;google[v].G.xf="cx";google[v].G.cxRestriction_CX=google[v].G.xf;google[v].G.Qc="cref";google[v].G.cxRestriction_CREF=google[v].G.Qc;google[v].G.Cm="none";
google[v].G.cxRestriction_NONE=google[v].G.Cm;google[v].G.Z=[];google[v].G.de={as_dt:!0,as_epq:!0,as_eq:!0,as_lq:!0,as_nlo:!0,as_nhi:!0,as_oq:!0,as_q:!0,as_qdr:!0,as_rq:!0,as_sitesearch:!0,cr:!0,c2coff:!0,filter:!0,gl:!0,hq:!0,lr:!0,query:!0,richsnippet:!0,sort:!0,usg:!0};google[v].G.Gl=20;google[v].G.me="data-cturl";google[v].G.se="data-ctorig";google[v].G.Sa=function(a,b,d,e,g){var f=0;a&&(f=ta(a,10));a=google[v].A.Kc(google[v].G.Z,f,b);google[v].G.Z[f]=null;a.Jc.nb(b,d,e,g,a.Ic)};
google[v].G.RawCompletion=google[v].G.Sa;google[v].G[H].oj=function(){var a=new google[v].G;this.Pi(a);a.Ia=this.Ia;a.fa=this.fa;a.P=this.P[tc]();a.N=this.N;return a};google[v].G[H].uj=function(a){var b=google[v].A.Rb(google[v].G.Z,[this,null,null]);google[v].G.Sa(b,a,200,void 0,200)};google[v].G[H].renderJson=google[v].G[H].uj;M=google[v].G[H];M.nd=function(a){a=Th(a);return a[r](/\s+/g,"_")[Od]()};M.Xd=function(a){return this.N?this.P.Ga==this.nd(a):!1};
M.zc=function(a){return this.N&&this.P.Ga?a[r](new RegExp(" more:"+this.P.Ga+"$"),""):a};M.Ac=function(a,b){return google[v].A.Rb(google[v].G.Z,[this,a,b])};
M.dc=function(a,b,d){b=null==b?"google.search.CustomWebSearch.RawCompletion":b;a=[a];this.Ma&&a[B](this.Ma);a=a[Eb](this.P.qe())[Nd](" ");if(this.N&&this.he){var e=this.he,e=e[r](/__HL__/,google[v][Kd]);this.gd=e=e[r](/__QUERY__/,c(a))}var e=this.P.pe(),g=[],f;for(f in e)g[B](f+"="+e[f]);f="&"+g[Nd]("&");f+="&q="+c(a);this.Ia&&(f+="&safe="+this.Ia);this.fa&&(a=Uh(this.fa))&&(f+="&"+a);b=this.Pc(b,d);b+=f;this.ta=f;d&&0!=d&&(this.ta=this.ta+"&start="+d);window[qd][Ed].GoogleLocale&&(b=this.eb&&this.N?
b+("&googlehost="+c(window[qd][Ed].GoogleLocale)):b+("&gl="+c(window[qd][Ed].GoogleLocale)));return b};
M.Nf=function(a){a.html&&delete a.html;var b;if(a[jd]&&"SPELL_CORRECTED_RESULTS"==a[jd]){b=X("gs-result");var d=sh(Q["showing-results-for"]+" ","gs-spelling"),e=h[t]("a");Xa(e,google[v].U.Af(this.zc(a.correctedAnchor)));d[p](e);b[p](d);d=sh(Q["search-instead-for"]+" ","gs-spelling");$(d,"gs-spelling-original");e=h[t]("a");Xa(e,google[v].U.Af(this.zc(a.originalAnchor)));d[p](e)}else b=sh(Q.dym+" ","gs-spelling"),$(b,"gs-result"),d=h[t]("a"),Xa(d,google[v].U.Af(this.zc(a[Ad])));b[p](d);a.html=b};
google[v].G[H].createSpellingHtml=google[v].G[H].Nf;google[v].G[H].yh=function(a,b){var d=V(google[v].U.Vd(a.visibleUrl),"gs-visibleUrl");R(b,d);$(d,"gs-visibleUrl-short");d=V(google[v].U.Vd(a.url),"gs-visibleUrl");R(b,d);$(d,"gs-visibleUrl-long")};google[v].G[H].xh=function(a,b){var d=wh(a,"gs-promotion-image-cell"),e=X("gs-promotion-image-box");R(e,b);R(d,e)};
google[v].G[H].Wh=function(a,b){a.html&&delete a.html;var d=X("gs-promotion");$(d,"gs-result");var e=uh(0,1,"gs-promotion-table"),g=vh(e,0),f;R(d,e);var k;a.image&&(e=a.image.url[r]("resize_w=40","resize_w=60"),e=e[r]("resize_h=40","resize_h=60"),e=xh(e,null,null,"gs-promotion-image"),a.url&&(f=yh(a.url,"",this.ya()),a.clicktrackUrl&&google[v].G.md(f,a.clicktrackUrl,a.url),R(f,e),e=f),k=e,b.rf||google[v].G[H].xh(g,k));e=null;a.clicktrackUrl&&(e={},e[google[v].G.me]=a.clicktrackUrl,e[google[v].G.se]=
a.url);e=zh(a.url,a[pd],this.ya(),"gs-title",void 0,e);a.titleRight&&(f=th("","gs-promotion-title-right"),Xa(f," "+a.titleRight),R(e,f));e.dir=google[v].U.ph(e[$c]);$(e,"gs-bidi-start-align");f=wh(g,b.rf&&a.image?"":"gs-promotion-text-cell");R(f,e);b.Wi&&google[v].G[H].yh(a,f);var l;b.rf&&a.image?(e=uh(0,0,"gs-promotion-table-snippet-with-image"),g=vh(e,0),R(f,e),google[v].G[H].xh(g,k),l=wh(g,"gs-promotion-text-cell-with-image")):a.bodyLines&&(l=X(),R(f,l));if(a.bodyLines){g=a.bodyLines;k="right"==
a.bodyLinkAlignment;for(var n=0;n<g[G];n++){var q=g[n],s=q[pd],x=q.url,y=q.visibleUrl,e=X("gs-snippet"),F;s&&(F=th(""),Xa(F,s));var w;x&&y&&(w=yh(x,"",this.ya()),q.clicktrackUrl&&google[v].G.md(w,q.clicktrackUrl,x),q=th("","gs-title"),Xa(q,y),R(w,q));F&&k&&(R(e,F),w&&R(e,rh(" ")));w&&R(e,w);F&&!k&&(w&&R(e,rh(" ")),R(e,F));e.dir=google[v].U.ph(e[$c]);$(e,"gs-bidi-start-align");R(l,e)}}b.Wi||google[v].G[H].yh(a,f);a.html=d};google[v].G[H].createPromotionHtml=google[v].G[H].Wh;
google[v].G[H].Hh=function(a){delete a.html;0<a.display_facets[G]&&(a.html=google[v].ga.ka("facets",a))};google[v].G[H].createFacetResultHtml=google[v].G[H].Hh;
google[v].G[H].Qa=function(a){a.html&&delete a.html;nb(a,this.ya()||void 0);jb(a,a[pd]||a.visibleUrl);a.html=google[v].ga.ka("webResult",a,{isLabelUrl:Ih()});if(a.clicktrackUrl)for(var b=a.html[Lb];b;b=b[Vb])if(1==b[Yc]){"a"==b[Cc][Od]()&&b[zc]==a.unescapedUrl&&google[v].G.md(b,a.clicktrackUrl,a.unescapedUrl);for(var d=b[ac]("a"),e=0,g;g=d[e];e++)g[zc]==a.unescapedUrl&&google[v].G.md(g,a.clicktrackUrl,a.unescapedUrl)}this.Mc(a.html)};google[v].G[H].createResultHtml=google[v].G[H].Qa;
google[v].G.md=function(a,b,d){a[Nb](google[v].G.me,b);a[Nb](google[v].G.se,d)};google[v].G[H].Ub=function(a,b,d){this.rd=null;this.P=google[v].yc.hj(a,b);this.P instanceof google[v].Rc&&(this.N=!0,this.P[jd]()==google[v].G.Qc&&(this.rd=Q["linked-cse-error-results"]),d&&d[Ib](/__HL__/)&&d[Ib](/__QUERY__/)&&(this.he=d))};google[v].G[H].setSiteRestriction=google[v].G[H].Ub;M=google[v].G[H];M.th=function(){return this.N?this.P[jd]():null};M.uh=function(){return this.N?this.P.yf:null};
M.lc=function(){return this.N?this.P.Ga:null};M.pj=function(a){this.N&&a&&this.P.wj(a)};M.Ra=function(a,b){a==google[v].A.Xa&&(this.Ia=b?b==google[v].A.Vf||b==google[v].A.Uf||b==google[v].A.Fl?b:null:null);if(a==google[v].A.Ja)if(b)for(var d in b){var e=b[d];google[v].G.de[d]&&(this.fa[d]=e)}else this.fa={}};google[v].G[H].setRestriction=google[v].G[H].Ra;
google[v].G[H].Da=function(a){ha(ta(a,10))||(a=ta(a,10));this.N&&(0<a&&a<=google[v].G.Gl||google[v].A.Hc==a)?this.Ka=a:google[v].A[H].Da[zd](this,a)};google[v].G[H].setResultSetSize=google[v].G[H].Da;google[v].G[H].Oa=function(a){google[v].A[H].Oa[zd](this,a)};google[v].G[H].setLinkTarget=google[v].G[H].Oa;google[v].G[H].Fb=function(a){google[v].A[H].Fb[zd](this,a)};google[v].G[H].setQueryAddition=google[v].G[H].Fb;google[v].yc=function(){};google[v].yc[H].qe=function(){};google[v].yc[H].pe=function(){};Ga(google[v].yc[H],function(){});google[v].yc.hj=function(a,b){var d;null==a||"string"==typeof a&&""==a?d=new google[v].uc:"string"==typeof a?d=a[Ib](/(^partner-pub-\d*:.*)|(^\d{21}:.*)/)?new google[v].Rc(google[v].G.xf,a,b):new google[v].ue(a):a.siteUrl?d=new google[v].ue(a.siteUrl):a.cseId?d=new google[v].Rc(google[v].G.xf,a.cseId,b):a.crefUrl&&(d=new google[v].Rc(google[v].G.Qc,a.crefUrl,b));return d||new google[v].uc};
google[v].uc=function(){};eh(google[v].uc,google[v].yc);google[v].uc[H].qe=function(){return[]};google[v].uc[H].pe=function(){return{}};Ga(google[v].uc[H],function(){return new google[v].uc});google[v].Rc=function(a,b,d){this.vj=a;this.yf=b;this.Ga=null;d&&(this.Ga=d)};eh(google[v].Rc,google[v].yc);M=google[v].Rc[H];ab(M,function(){return this.vj});M.wj=function(a){this.Ga=a};M.qe=function(){var a=[];this.Ga&&(0==this.Ga[dd]("more:")||0==this.Ga[dd]("less:")?a[B](this.Ga):a[B]("more:"+this.Ga));return a};
M.pe=function(){var a=this.yf;this.vj==google[v].G.Qc&&(a=c(a));var b={};b[this.vj]=a;return b};Ga(M,function(){return new google[v].Rc(this.vj,this.yf,this.Ga)});google[v].ue=function(a){this.nr=a};eh(google[v].ue,google[v].yc);google[v].ue[H].qe=function(){var a=[];a[B]("site:"+this.nr);return a};google[v].ue[H].pe=function(){return{}};Ga(google[v].ue[H],function(){return new google[v].ue(this.nr)});google[v].NoOldNames||(ba("GwebSearch",google[v].K),ba("GcustomwebSearch",google[v].G),ba("GbookSearch",google[v].ia),ba("GblogSearch",google[v].za),ba("GvideoSearch",google[v].xa),ba("GnewsSearch",google[v].la),ba("GlocalSearch",google[v].H),ba("GimageSearch",google[v].D),ba("GcustomimageSearch",google[v].C),ba("GpatentSearch",google[v].ca),ba("GSearch",google[v].A),ba("GSearchControl",google[v].B),ba("GSearchForm",google[v].Ca),ba("GsearcherOptions",google[v].$a),ba("GdrawOptions",google[v].pa));google[v].ga={};google[v].ga.Fn=function(a){google[v].ga.yj.unshift(a);return google[v].ga.yj};Rd("google.search.Csedr.addOverride",google[v].ga.Fn,void 0);google[v].ga.yj=["base_",""];
google[v].ga.hx=function(a,b){google[v].ga.$l[a]||(google[v].ga.$l[a]=eval("[function(Vars,render,html,bidiTextDir,bidiHtmlDir,bidiTextMarkAfter,bidiHtmlMarkAfter, localizedMessages){with(Vars)return("+a+")}][0]"));return google[v].ga.$l[a](b,google[v].ga.ka,google[v].ga.Gh,google[v].U.Ww,google[v].U.ph,google[v].U.Yw,google[v].U.Xw,Q)};google[v].ga.$l={};google[v].ga.Gh=function(a){var b=h.createDocumentFragment(),d=h[t]("div");for(Xa(d,a);d[Lb];)b[p](d[Lb]);return b};
google[v].ga.ka=function(a,b){google[v].ga.gm&&(h[vd][p](google[v].ga.Gh(google[v].ga.gm)),google[v].ga.gm=0);for(var d=0;!a[p];){if(d>=google[v].ga.yj[G])return google[v].ga.Gh(a+" not found");a=h[Zc](google[v].ga.yj[d++]+a)||a}for(var e={},g=1;g<arguments[G];g++)for(d in arguments[g])e[d]=arguments[g][d];try{for(var f=google[v].ga.Gh(""),k,l,n=0,q,s,x=function(a){a="data-"+a;s=(q=y[Bd](a))?google[v].ga.hx(q,e):"";k[Ec]&&k[Ec](a);return q},y=a[Lb];y;y=l?y:y[Vb])if(k=y[Ob](!1),1!=y[Yc])(3!=y[Yc]||
y.nodeValue[Ib](/\S/))&&f[p](k);else{x("foreach");!l&&q&&(e.Foreach=s&&"function"==typeof s[Nd]?s:[s],d=0,l=1);if(l)if(d<e.Foreach[G])e.Cur=e.Foreach[e.Index=d++];else{l=0;continue}x("if")&&(n=0);if(q||x("elif"))if(n||!s)continue;else n=1;if(!x("attr")||s){if(f[p](k),q)for(var F in s)void 0!=s[F]&&("class"==F?m(k,s[F]):"style"==F&&mh()?k[u].cssText=s[F]:k[Nb](F,s[F]))}else k=f;if(x("facetgroup"))for(g=0;g<e.display_facets[G];g++){var w={index:""};1==e.display_facets[G]?w={index:"sizeone"}:0==g?w=
{index:"first"}:g==e.display_facets[G]-1&&(w={index:"last"});k[p](google[v].ga.ka("facetGroupEntry",e.display_facets[g],w))}var N=x("body")?s&&s[p]?s:h[Gb](s):google[v].ga.ka(y,e,x("vars")?s:{});try{N&&k[p](N)}catch(z){}}return f}catch(J){return google[v].ga.Gh(J.toString()+": "+q)}};Rd("google.search.Csedr.render",google[v].ga.ka,void 0);google[v].Gj={};google[v].Gj.Hy=function(a){if(!(a&&a instanceof pa))return a;for(var b={},d=0;d<a[G];d++)for(var e in a[d])b[e]=a[d][e];return b};Rd("google.search.richsnippets.merge",google[v].Gj.Hy,void 0);google[v].Gj.Fy=function(a){if(!(a instanceof pa))return!(!a.description&&!a.summary);for(var b=0;b<a[G];b++)if(a[b].description||a[b].summary)return!0;return!1};Rd("google.search.richsnippets.hreviewNonEmpty",google[v].Gj.Fy,void 0);google[v].F={};google[v].F.element={};google[v].F[I].Ba={hi:"searchbox+results",wb:"searchbox",Tb:"results"};google[v].F[I].$c={Bm:"standard",Xe:"two-column",Ve:"searchbox-only",wi:"searchresults-only"};google[v].F[I].Mb=function(a){return"string"==typeof a?""!=a&&"0"!=a&&"false"!=a[Od]():!!a};google[v].F[I].Fm=function(a){a=ta(a,10);return ha(a)?void 0:a};google[v].F[I].$=function(a){return function(b){for(var d=0;d<a[G];d++)if(typeof b==a[d])return b}};
google[v].F[I].my=function(a){if("string"==typeof a&&(a=ai(a))&&(0==a[dd]("https://")||0==a[dd]("https://")))return a};google[v].F[I].Lw=function(a){var b={};if(1<a[G]){a=a[cc](1)[hc]("&");for(var d=0;d<a[G];d++){var e=a[d][hc]("=");try{var g=xa(e[0])}catch(f){continue}if(g){try{var k=e[1]?xa(e[1][r](/\+/g," ")):e[1]}catch(l){}b[g]=k}}}return b};
google[v].F[I].pl=function(a){var b={};if(1<a[G]){a=a[cc](1)[hc]("&");for(var d=0;d<a[G];d++){var e=a[d][hc]("=");try{var g=xa(e[0])}catch(f){continue}if("gcse-bookmark"===g)try{var k=xa(e[1]);b[k[hc](":")[0]]=k[Gd](k[dd](":")+1)}catch(l){}}}return b};google[v].F[I].Sp=function(a,b){for(var d={},e=0;e<b[G];e++)a[oc](b[e])&&(d[b[e]]=a[b[e]]);return d};google[v].F[I].T={};google[v].F[I].T.Ch="gcse";google[v].F[I].T.cw="data-";google[v].F[I].T.Rl="div";google[v].F[I].T.dw="gname";
google[v].F[I].T.ew=google[v].F[I].T.Ch+":";google[v].F[I].T.Ql=google[v].F[I].T.Ch+"-";google[v].F[I].T.kj={REPLACE:0,Up:1};google[v].F[I].T.Dw=function(){var a=0,b="___"+google[v].F[I].T.Ch+"_";return function(){return b+a++}}();google[v].F[I].T.Cy=function(a){var b=0;return function(d){return a==google[v].F[I].$c.Xe?d||a:d||a+b++}};var ri=google[v].F[I].T,si=google[v].F[I].$c,ti=google[v].F[I].Ba,ui=google[v].F[I].T.Cy,vi={};vi[si.Bm]={vh:[ti.hi],getName:ui(si.Bm)};
vi[si.Xe]={vh:[ti.wb,ti.Tb],getName:ui(si.Xe)};vi[si.Ve]={vh:[ti.wb],getName:ui(si.Ve)};vi[si.wi]={vh:[ti.Tb],getName:ui(si.wi)};ri.Ol=vi;google[v].F[I].T.rh={search:{Md:google[v].F[I].$c.Bm,sh:google[v].F[I].Ba.hi},searchbox:{Md:google[v].F[I].$c.Xe,sh:google[v].F[I].Ba.wb},searchresults:{Md:google[v].F[I].$c.Xe,sh:google[v].F[I].Ba.Tb},"searchbox-only":{Md:google[v].F[I].$c.Ve,sh:google[v].F[I].Ba.wb},"searchresults-only":{Md:google[v].F[I].$c.wi,sh:google[v].F[I].Ba.Tb}};
var wi=google[v].F[I].T,xi=[],yi=google[v].F[I].T.Ch+"\\:",zi;for(zi in google[v].F[I].T.rh)xi[B](yi+zi),xi[B](google[v].F[I].T.Rl+"."+google[v].F[I].T.Ql+zi);wi.Ew=xi[Nd](", ");google[v].F[I].T.Gw=function(a){var b=[],d=google[v].F[I].T.Ch+":",e;for(e in google[v].F[I].T.rh){for(var g=a[ac](d+e),f=0;f<g[G];f++)b[B](g[f]);g=Sh(a,google[v].F[I].T.Rl,google[v].F[I].T.Ql+e);for(f=0;f<g[G];f++)b[B](g[f])}return b};
google[v].F[I].T.Option={GB:{name:"resultsUrl",Q:google[v].F[I].my,defaultValue:void 0,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.wb},tB:{name:"newWindow",Q:google[v].F[I].Mb,defaultValue:!1,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.wb},CB:{name:"queryParameterName",Q:google[v].F[I].$(["string"]),defaultValue:"q",S:!0,O:void 0,M:void 0,R:void 0},MA:{name:"autoSearchOnLoad",Q:google[v].F[I].Mb,defaultValue:!0,S:!0,O:void 0,M:void 0,R:void 0},QA:{name:"defaultToRefinement",Q:google[v].F[I].$(["string"]),
defaultValue:void 0,S:!0,O:"defaultToRefinement",M:void 0,R:void 0},XA:{name:"enableOrderBy",Q:google[v].F[I].Mb,defaultValue:void 0,S:!0,O:"enableOrderBy",M:void 0,R:void 0},xB:{name:"orderByOptions",Q:google[v].F[I].$(["object"]),defaultValue:void 0,S:!1,O:"keys",M:"orderByOptions",R:void 0},HB:{name:"resultSetSize",Q:google[v].F[I].$(["string","number"]),defaultValue:void 0,S:!0,O:"resultSetSize",M:void 0,R:void 0},FB:{name:"extendedRestricts",Q:google[v].F[I].$(["object"]),defaultValue:void 0,
S:!1,O:google[v].A.Ja,M:void 0,R:void 0},IB:{name:"safeSearch",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:google[v].A.Xa,M:void 0,R:void 0},DB:{name:"refinementStyle",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.Tb},UA:{name:"enableHistory",Q:google[v].F[I].Mb,defaultValue:!1,S:!0,O:void 0,M:void 0,R:void 0},rB:{name:"linkTarget",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.Tb},ZA:{name:"enableSpeech",
Q:google[v].F[I].Mb,defaultValue:!1,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.wb},TA:{name:"enableAutoComplete",Q:google[v].F[I].Mb,defaultValue:void 0,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.wb},IA:{name:"autoCompleteMatchType",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"matchType",M:"autoCompleteOptions",R:google[v].F[I].Ba.wb},LA:{name:"autoCompleteValidLanguages",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"validLanguages",M:"autoCompleteOptions",R:google[v].F[I].Ba.wb},
JA:{name:"autoCompleteMaxCompletions",Q:google[v].F[I].Fm,defaultValue:void 0,S:!0,O:"maxCompletions",M:"autoCompleteOptions",R:google[v].F[I].Ba.wb},KA:{name:"autoCompleteMaxPromotions",Q:google[v].F[I].Fm,defaultValue:void 0,S:!0,O:"maxPromotions",M:"autoCompleteOptions",R:google[v].F[I].Ba.wb},uB:{name:"noResultsString",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:void 0,M:void 0,R:google[v].F[I].Ba.Tb},FA:{name:"addOverride",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,
O:void 0,M:void 0,R:void 0},vB:{name:"numTopRefinements",Q:google[v].F[I].Fm,defaultValue:void 0,S:!1,O:void 0,M:void 0,R:void 0},fC:{name:"webSearchResultSetSize",Q:google[v].F[I].$(["number","string"]),defaultValue:void 0,S:!0,O:"resultSetSize",M:"webSearchOptions",R:void 0},eC:{name:"webSearchExtendedRestricts",Q:google[v].F[I].$(["object"]),defaultValue:void 0,S:!1,O:google[v].A.Ja,M:"webSearchOptions",R:void 0},cC:{name:"lr",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"lr",M:"webSearchExtendedRestricts",
R:void 0},ZB:{name:"cr",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"cr",M:"webSearchExtendedRestricts",R:void 0},aC:{name:"gl",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"gl",M:"webSearchExtendedRestricts",R:void 0},$B:{name:"filter",Q:google[v].F[I].$(["number"]),defaultValue:void 0,S:!0,O:"filter",M:"webSearchExtendedRestricts",R:void 0},YB:{name:"as_sitesearch",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"as_sitesearch",M:"webSearchExtendedRestricts",
R:void 0},XB:{name:"as_oq",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"as_oq",M:"webSearchExtendedRestricts",R:void 0},hC:{name:"sort_by",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"sort_by",M:"webSearchExtendedRestricts",R:void 0},gC:{name:"webSearchSafesearch",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:google[v].A.Xa,M:"webSearchOptions",R:void 0},bC:{name:"webSearchLinkTarget",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"linkTarget",M:"webSearchOptions",
R:google[v].F[I].Ba.Tb},dC:{name:"webSearchQueryAddition",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"queryAddition",M:"webSearchOptions",R:void 0},VA:{name:"enableImageSearch",Q:google[v].F[I].Mb,defaultValue:void 0,S:!0,O:"enableImageSearch",M:void 0,R:google[v].F[I].Ba.Tb},SA:{name:"disableWebSearch",Q:google[v].F[I].Mb,defaultValue:void 0,S:!0,O:"disableWebSearch",M:void 0,R:void 0},PA:{name:"defaultToImageSearch",Q:google[v].F[I].Mb,defaultValue:void 0,S:!0,O:"defaultToImageSearch",
M:void 0,R:void 0},jB:{name:"imageSearchLayout",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"layout",M:"imageSearchOptions",R:google[v].F[I].Ba.Tb},lB:{name:"imageSearchExtendedRestricts",Q:google[v].F[I].$(["object"]),defaultValue:void 0,S:!1,O:google[v].A.Ja,M:"imageSearchOptions",R:void 0},kB:{name:"image_lr",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"lr",M:"imageSearchExtendedRestricts",R:void 0},gB:{name:"image_cr",Q:google[v].F[I].$(["string"]),defaultValue:void 0,
S:!0,O:"cr",M:"imageSearchExtendedRestricts",R:void 0},iB:{name:"image_gl",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"gl",M:"imageSearchExtendedRestricts",R:void 0},hB:{name:"image_filter",Q:google[v].F[I].$(["number"]),defaultValue:void 0,S:!0,O:"filter",M:"imageSearchExtendedRestricts",R:void 0},fB:{name:"image_as_sitesearch",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"as_sitesearch",M:"imageSearchExtendedRestricts",R:void 0},eB:{name:"image_as_oq",Q:google[v].F[I].$(["string"]),
defaultValue:void 0,S:!0,O:"as_oq",M:"imageSearchExtendedRestricts",R:void 0},nB:{name:"image_sort_by",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"sort_by",M:"imageSearchExtendedRestricts",R:void 0},mB:{name:"imageSearchResultSetSize",Q:google[v].F[I].$(["number","string"]),defaultValue:void 0,S:!0,O:"resultSetSize",M:"imageSearchOptions",R:void 0},cB:{name:"gaQueryParameter",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"queryParameter",M:"googleAnalyticsOptions",R:google[v].F[I].Ba.wb},
bB:{name:"gaCategoryParameter",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"categoryParameter",M:"googleAnalyticsOptions",R:google[v].F[I].Ba.wb},DA:{name:"adchannel",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"adchannel",M:void 0,R:void 0},EA:{name:"adclient",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"adclient",M:void 0,R:void 0},HA:{name:"adtest",Q:google[v].F[I].$(["string"]),defaultValue:void 0,S:!0,O:"adtest",M:void 0,R:void 0},GA:{name:"adoptions",
Q:google[v].F[I].$(["object"]),defaultValue:void 0,S:!1,O:"adoptions",M:void 0,R:void 0},KB:{name:"overlayResults",Q:google[v].F[I].Mb,defaultValue:!1,S:!0,O:"overlayResults",M:void 0,R:void 0},JB:{name:"showBookmarkLink",Q:google[v].F[I].Mb,defaultValue:!1,S:!1,O:"showBookmarkLink",M:"bookmarkOptions",R:void 0},oB:{name:"isSitesearch",Q:google[v].F[I].Mb,defaultValue:!1,S:!1,O:"isSiteSearch",M:"bookmarkOptions",R:void 0},WA:{name:"enableMobileLayout",Q:google[v].F[I].Mb,defaultValue:!1,S:!1,O:"enableMobileLayout",
M:void 0,R:void 0},YA:{name:"enableRichSnippets",Q:google[v].F[I].Mb,defaultValue:!1,S:!1,O:void 0,M:void 0,R:google[v].F[I].Ba.Tb}};google[v].F[I].T.gi=function(a,b){var d=google[v].F[I].T.Option,e;for(e in d)d[oc](e)&&a[zd](b,d[e])};google[v].F[I].T.Rp=["oq","gs_204"];google[v].F[I].qh=function(a,b){this.re=a;this.Wp=b?google[v].F[I].T.kj.Up:google[v].F[I].T.kj.REPLACE;var d,e;if(b)d=b.tag||"search",e=b.attributes||{};else{d=a.nodeName[Od]();var g="";d==google[v].F[I].T.Rl?(g=google[v].F[I].T.cw,d=(a[rd]||a[Bd]("class"))[cc](google[v].F[I].T.Ql[G])):d=d[cc](google[v].F[I].T.ew[G]);e=google[v].F[I].qh.fw(a,g)}this.attributes=e;this.Md=google[v].F[I].T.rh[d].Md;ab(this,google[v].F[I].T.rh[d].sh);g=b?b.gname:a[Bd](g+google[v].F[I].T.dw);this.cc=google[v].F[I].T.Ol[this.Md].getName(g)};
google[v].F[I].qh.fw=function(a,b){var d={};google[v].F[I].T.gi(function(e){var g=a[Bd](b+e[md]);null!=g&&(d[e[md]]=g)},this);return d};google[v].F[I].qh[H].iw=function(){var a=this.re,b;if(this.Wp==google[v].F[I].T.kj.REPLACE){b=h[t]("div");var d=a[Jd];d[Hb](b,a);d[xd](a);b.id=a.id;this.re=b}else this.Wp==google[v].F[I].T.kj.Up&&(b=h[t]("div"),a[p](b),this.re=b);this.re.id&&0!==this.re.id[G]||(this.re.id=google[v].F[I].T.Dw())};google[v].F[I].Element=function(a,b,d,e,g,f){this.ee=a;this.cc=b;ab(this,d);this.wf={};this.ea=this.ix(e);this.nh=g;this.vc=f};M=google[v].F[I].Element[H];M.wh=0;M.ld=null;M.ss=!1;
M.Iw=function(a){if(a.cc!=this.cc)return ei("Name of the component, "+a.cc+", should match name of the element, "+this.cc+"."),this.wh;var b=!1;this.wf[a[jd]]&&(ei("Multiple components of the same type "+a[jd]+" for Element named "+this.cc+" are detected. Only the last is used."),b=!0);for(var d=google[v].F[I].T.Ol[this[jd]].vh,e=0;e<d[G];e++)if(d[e]==a[jd])return this.wf[a[jd]]=a,b||this.wh++,this.wh;ei("Component of type "+a[jd]+" is not allowed for Element named "+this.cc+" of type "+this[jd]+
".");return this.wh};M.ka=function(){var a=google[v].F[I].T.Ol[this[jd]].vh;if(a[G]!=this.wh)for(var b=0;b<a[G];b++)if(!this.wf[a[b]])return ei("Component of type "+a[b]+" is missing for Element named "+this.cc+"."),!1;var a={},d;for(d in this.wf)this.wf[oc](d)&&(b=this.wf[d],b.iw(),a[d]=b.re,this.kw(b.attributes,d));this.ld=this.jw(a);return!0};M.ix=function(a){var b={},d;for(d in a)a[oc](d)&&(b[d]=a[d]);return b};
M.kw=function(a,b){var d=google[v].F[I].Ba;google[v].F[I].T.gi(function(e){if(a[oc](e[md])&&e.S&&(b==d.hi||void 0==e.R||e.R==b)){var g=e.Q(a[e[md]]);null!=g&&("webSearchExtendedRestricts"===e.M?(this.ea.webSearchExtendedRestricts||(this.ea.webSearchExtendedRestricts={}),this.ea.webSearchExtendedRestricts[e[md]]=g):"imageSearchExtendedRestricts"===e.M?(this.ea.imageSearchExtendedRestricts||(this.ea.imageSearchExtendedRestricts={}),this.ea.imageSearchExtendedRestricts[e.O]=g):this.ea[e[md]]=g)}},this)};
M.jw=function(a){var b={imageSearchOptions:{},webSearchOptions:{},autoCompleteOptions:{},googleAnalyticsOptions:{},orderByOptions:{},bookmarkOptions:{}};google[v].F[I].T.gi(function(a){if(a.O&&void 0!=this.ea[a[md]]){var d=b;a.M&&(d=b[a.M]);d[a.O]=this.ea[a[md]]}},this);this.ea.isSitesearch&&void 0!==this.vc.sortBy&&(b.webSearchOptions||(b.webSearchOptions={}),b.webSearchOptions[google[v].A.Ja]||(b.webSearchOptions[google[v].A.Ja]={}),b.webSearchOptions[google[v].A.Ja].sort=this.vc.sortBy);this.ea.isSitesearch&&
this.vc.refine&&(b.defaultToRefinement=this.vc.refine);this.ea.isSitesearch&&this.vc.image&&(b.defaultToImageSearch="0"!=this.vc.image?!0:!1);this.ea.enableRichSnippets&&(b.enableRichSnippets=!0);var d=new google[v].I(this.ee,b);void 0!=this.ea.refinementStyle&&d.Kh(this.ea.refinementStyle);void 0!=this.ea.addOverride&&google[v].ga.Fn(this.ea.addOverride);void 0!=this.ea.linkTarget&&d.Oa(this.ea.linkTarget);var e=new google[v].pa;void 0!=this.ea.enableAutoComplete&&e.Jn(this.ea.enableAutoComplete);
void 0!=this.ea.enableSpeech&&e.Ln(this.ea.enableSpeech);void 0!=this.ea.numTopRefinements&&e.Mn(this.ea.numTopRefinements);var g=null,f=google[v].F[I].$c,g=google[v].F[I].Ba;this[jd]==f.Ve?(f=this.ea.resultsUrl,!f&&this.ee?f="https://www.google.com/cse?"+("string"==typeof this.ee?"cx="+c(this.ee):"cref="+c(this.ee.crefUrl)):void 0==f&&(f=window[mc][zc]),e.Hn(f,this.ea.queryParameterName,this.ea.newWindow),g=a[g.wb]):this[jd]==f.wi?(e.Gn(),g=a[g.Tb]):this[jd]==f.Xe?(e.Kn(a[g.wb]),g=a[g.Tb]):g=a[g.hi];
this.ss&&this.cc===this[jd]+"0"&&(a=h[t]("script"),ab(a,"text/javascript"),a.src="//www.google.com/cse/btguard.js?gcse_nc="+window.___gcse_nc_,h.head[p](a));d.Pf(g,e);this.ea.noResultsString&&(e=this.ea.noResultsString,e=ce(e),d.Ne(e));this.ea.enableHistory?d.Nn(nh(this,this.In))&&void 0==this.ea.linkTarget&&d.Oa(google[v].A.En):this.In(d);return d};
M.In=function(a){var b=google[v].F[I].$c,d=this.nh[this.ea.queryParameterName];if(this.ea.isSitesearch&&this.vc.query&&this[jd]!=b.Ve){d=this.vc.query;b=ta(this.vc[Oc],10);ha(b)&&(b=1);var e=google[v].F[I].Sp(this.nh,google[v].F[I].T.Rp);a.qa(d,b,e)}else d&&this.ea.autoSearchOnLoad&&(this[jd]==b.Ve?a.gj(d):(e=google[v].F[I].Sp(this.nh,google[v].F[I].T.Rp),a.qa(d,void 0,e)))};google[v].F[I].vq=function(a){a=a||{};this.ee=a.cx||(a.cref?{crefUrl:a.cref}:null);this.xw=this.Kw(a.uiOptions);this.te={};this.zh={};this.nh=google[v].F[I].Lw(window[mc][v]);this.vc=google[v].F[I].pl(window[mc][v]);this.Vl=a.rawCss;this.Jw()};M=google[v].F[I].vq[H];M.Kw=function(a){a=a||{};var b={};google[v].F[I].T.gi(function(d){var e=d[md],g=null;a[oc](e)&&(g=d.Q(a[e]));null!=g?b[e]=g:void 0!=d.defaultValue&&(b[e]=d.defaultValue)},this);return b};
M.Fw=function(){if("boolean"==typeof this.Gm)return this.Gm;var a=h[t]("div"),b=h[t]("G:TEST");a[p](b);return this.Gm=!!(a.querySelectorAll&&0<a.querySelectorAll("G\\:TEST")[G])};M.go=function(a){a=(a?$h(a):null)||h[vd];a=this.Fw()?a.querySelectorAll(google[v].F[I].T.Ew):google[v].F[I].T.Gw(a);window||(window={});window.___gcse_nc_=a[G]||0;for(var b=0;b<a[G];++b)this.bq(new google[v].F[I].qh(a[b]));this.$p()};
M.ka=function(a,b){if(b&&"searchbox"!=a.tag&&"searchresults"!=b.tag)return ei('First and second components must be of tag "searchbox"  and "searchresults" separately.'),null;if(b&&a.gname!=b.gname)return ei("First and second components must be of the same gname."),null;var d=[a];b&&d[B](b);for(var e,g=[],f=0;f<d[G];f++){if(!d[f].div)return ei("div required for component."),null;d[f].tag||(d[f].tag="search");if(!google[v].F[I].T.rh[d[f].tag])return ei("tag named "+d[f].tag+" is not recognized"),null;
var k=$h(d[f].div);k&&1===k[Yc]&&(k=new google[v].F[I].qh(k,d[f]),e=k.cc,g[B](k))}for(f=0;f<g[G];f++)this.bq(g[f]);this.$p();return e?this.nj(e):null};M.nj=function(a){return this.zh[a]?new google[v].F[I].Xl(this.zh[a]):null};M.Wl=function(){var a={},b;for(b in this.zh)a[b]=new google[v].F[I].Xl(this.zh[b]);return a};M.bq=function(a){var b=a.cc;this.te[b]||(this.te[b]=new google[v].F[I].Element(this.ee,b,a.Md,this.xw,this.nh,this.vc));this.te[b].Iw(a)};
M.Jw=function(){if(this.Vl){var a=h[ac]("head")[0];a||(a=h[vd][Jd][p](h[t]("head")));var b=h[t]("style");ab(b,"text/css");b[Tc]?b[Tc].cssText=this.Vl:b[p](h[Gb](this.Vl));a[p](b)}};M.$p=function(){for(var a in this.te)if(this.te[oc](a)){var b=this.te[a];b.ka()&&(this.zh[a]=b);delete this.te[a]}};
google[v].F[I].Xl=function(a){this.gname=a.cc;ab(this,a[jd]);this.uiOptions=a.ea;this.execute=nh(a.ld,a.ld.qa);this.prefillQuery=nh(a.ld,a.ld.gj);this.getInputQuery=nh(a.ld,a.ld.Fq);this.clearAllResults=nh(a.ld,a.ld.Yc)};Rd("google.search.cse.element.ElementInterface",google[v].F[I].Xl,void 0);google[v].F[I].Bh=function(){return(new Date)[Wb]()};google[v].F[I].Ul=google[v].F[I].Bh();
google[v].F[I].kq=function(a,b){if(!google[v].F[I].wq&&(google[v].F[I].wq=google[v].F[I].Bh(),window.googleLT_&&1==window.googleLT_%100)){var d="e",e=window.googleLT_;window.__gcse&&window.__gcse.ct&&(e=window.__gcse.ct,d="c");var g=window.googleLT_-e,f=google[v].F[I].Ul-e,k=google[v].F[I].Mw-e,l=b-e,e=google[v].F[I].wq-e;if(0<f&&0<k&&0<l){var n="ex";"c"==d&&"explicit"!=window.__gcse.parsetags&&(n="ol");var q="render"==a?"r":"g",s=[];"c"==d&&s[B]("gl."+g);s=s[Eb](["el."+f,"mc."+k,q+"s."+l,q+"e."+
e]);google[Ed].recordCsiStat(["element_"+(d+n)],s)}}};google[v].F[I].Dh=function(a){return google[v].F[I].Ah?!1:(google[v].F[I].Ah=new google[v].F[I].vq(a),google[v].F[I].Mw=google[v].F[I].Bh(),!0)};Rd("google.search.cse.element.init",google[v].F[I].Dh,void 0);google[v].F[I].go=function(a){google[v].F[I].Dh();var b=google[v].F[I].Bh();google[v].F[I].Ah.go(a);google[v].F[I].kq("go",b)};Rd("google.search.cse.element.go",google[v].F[I].go,void 0);
google[v].F[I].ka=function(a,b){google[v].F[I].Dh();var d=google[v].F[I].Bh(),e=google[v].F[I].Ah.ka(a,b);google[v].F[I].kq("render",d);return e};Rd("google.search.cse.element.render",google[v].F[I].ka,void 0);google[v].F[I].nj=function(a){google[v].F[I].Dh();return google[v].F[I].Ah.nj(a)};Rd("google.search.cse.element.getElement",google[v].F[I].nj,void 0);google[v].F[I].Wl=function(){google[v].F[I].Dh();return google[v].F[I].Ah.Wl()};
Rd("google.search.cse.element.getAllElements",google[v].F[I].Wl,void 0);google[v].ga.gm=' <div style="display:none"> <span id="private_ratings"> <span class="gsc-snippet-metadata"> <span data-if="Vars.ratingstars"> <span class="gsc-rating-bar"> <span data-attr="{style:\'width:\' + (Vars.ratingstars * 20) + \'%\'}"></span> </span> <span data-if="Vars.ratingcount"> <span data-body="\' \' + Vars.ratingcount"></span> <span> reviews</span> </span> </span> <span data-if="Vars.totaltime"> <span data-if="Vars.ratingstars && Vars.ratingcount"> - </span> <span data-body="Vars.totaltime"></span> </span> <span data-if="Vars.calories"> <span data-if="Vars.ratingstars && Vars.ratingcount || Vars.totaltime"> - </span> <span data-body="Vars.calories"></span> <span> cal</span> </span> <span data-if="Vars.pricerange"> <span data-if="Vars.ratingstars && Vars.ratingcount || Vars.totaltime || Vars.calories"> - </span> <span> Price range: </span> <span data-body="Vars.pricerange"></span> </span> <span data-if="Vars.reviewer" class="gsc-reviewer"> <span data-body="\' \' + Vars.reviewer"></span> </span> </span> </span> <span id="private_hproduct"> <span class="gsc-snippet-metadata"> <span data-if="Vars.availability">Availability: <span data-body="Vars.availability"></span>.</span> <span data-if="Vars.availability && Vars.price">&nbsp;</span> <span data-if="Vars.price"> Price: <span data-body="Vars.price"></span>.</span> </span> </span> <span id="private_hreview_icon"> <span data-if="google.search.richsnippets.hreviewNonEmpty(Vars.hreview)"> <span class="gsc-zippy"></span> </span> </span> <span id="private_hreview_content"> <span data-if="google.search.richsnippets.hreviewNonEmpty(Vars.hreview)" class="gsc-preview-reviews"> <ul> <span data-foreach="Vars.hreview" data-attr="0"> <li data-if="(Cur.description || Cur.summary) && Index == 0" class = "gsc-review-agregate-first-line"> <span data-if="Cur.description" data-body="Cur.description"></span> <span data-elif="Cur.summary" data-body="Cur.summary"></span> </li> <li data-elif="(Cur.description || Cur.summary) && Index < 10" data-attr="{\'class\': Index % 2 == 0 ? \'gsc-review-agregate-even-lines\' : \'gsc-review-agregate-odd-lines\'}"> <span data-if="Cur.description" data-body="Cur.description"></span> <span data-elif="Cur.summary" data-body="Cur.summary"></span> </li> </span> </ul> </span> </span> <span id="private_hrecipe"> <span data-if="Vars.author" class="gsc-author"> <span data-body="\' \' + Vars.author"></span> </span> </span> <span id="private_recipe"> <span data-attr="0" data-body="render(\'private_ratings\',google.search.richsnippets.merge(richSnippet.recipe))"> </span> <span data-if="Vars.richSnippet.hrecipe && Vars.richSnippet.hrecipe.author && !Vars.richSnippet.recipe.reviewer" data-attr="0" data-body="render(\'private_hrecipe\',richSnippet.hrecipe)"> </span> </span> <span id="private_person"> <span data-vars="{vcard:google.search.richsnippets.merge(Vars.richSnippet.vcard)}"> <span data-if="Vars.richSnippet.vcard && vcard.adr"> <span data-if="vcard.adr" class="gs-location"> <span data-body="\' \' + vcard.adr"> </span> </span> </span> <span data-elif="Vars.richSnippet.person"> <span data-if="person.role" class="gsc-role"> <span data-attr="0" data-body="\' \' + person.role"> </span> </span> <span data-if="person.org" class="gsc-org"> <span data-body="\' @\' + person.org"> </span> </span> <span data-if="person.location" class="gsc-location"> <span data-if="person.org || person.role || Vars.richSnippet.review"> - </span> <span data-body="\' \' + person.location"> </span> </span> </span> <span data-if="Vars.richSnippet.vcard && vcard.tel" class="gsc-tel"> <span data-if="(person && (person.org || person.role || Vars.richSnippet.review || person.location)) || (Vars.richSnippet.vcard && vcard.adr) "> - </span> <span data-body="\' Tel: \' + vcard.tel"> </span> </span> </span> </span> <span id="private_metadata" class="gsc-snippet-metadata"> <span data-vars="{person:google.search.richsnippets.merge(Vars.richSnippet.person), product:google.search.richsnippets.merge(Vars.richSnippet.hproduct)}"> <span data-if="Vars.richSnippet.recipe" data-attr="0" data-body="render(\'private_recipe\', Vars)"> </span> <span data-elif="Vars.richSnippet.review" data-attr="0" data-body="render(\'private_ratings\',google.search.richsnippets.merge(richSnippet.review))"> </span> <span data-if="Vars.richSnippet.hproduct && (product.availability || product.price)" data-attr="0" data-body="render(\'private_hproduct\', product)"> </span> <span data-elif="Vars.richSnippet.person || Vars.richSnippet.vcard" data-attr="0" data-body="render(\'private_person\', Vars)"> </span> </span> </span> <div id="base_facets"> <div class="gsc-context-box" data-facetgroup=\'title\'> </div> </div> <div id="base_facetGroupEntry"> <div> <div class="gsc-facet-label gsc-col" style="display:inline-block;"> <a data-attr="{\'data-refinementLabel\': label, \'label-with-op\': label_with_op}" data-body="html(anchor)"></a> </div> <div class="gsc-facet-result gsc-col" data-body="html(width + \'%\')" style="display:inline-block;"> </div> <div data-attr="{\'class\': index == \'first\' ? \'gsc-chart gsc-top gsc-col\' : index == \'last\' ? \'gsc-chart gsc-bottom gsc-col\' : index == \'sizeone\' ? \'gsc-chart gsc-bottom gsc-col gsc-top\' : \'gsc-chart gsc-col\'}" style="display:inline-block;"> <div class="" data-attr="{style:\'width:\' + width + \'%\'}"></div> </div> </div> </div> <div id="base_webResult"> <div class="gs-webResult gs-result" data-vars="{longUrl:function() { var i = unescapedUrl.indexOf(visibleUrl); return i < 1 ? visibleUrl : unescapedUrl.substring(i);}}"> <div class="gsc-thumbnail-inside"> <div class="gs-title"> <a class="gs-title" data-attr="{href:unescapedUrl,target:target,dir:bidiHtmlDir(title)}" data-body="html(title)"> </a> </div> </div> <div class="gsc-url-top"> <div class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-short" data-body="visibleUrl" data-attr="{dir:bidiTextDir(visibleUrl)}"> </div> <div class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long" data-body="Vars.formattedUrl ? html(Vars.formattedUrl) : longUrl()" data-attr="{dir: Vars.formattedUrl ? bidiHtmlDir(Vars.formattedUrl) : bidiTextDir(longUrl()), style:\'word-break:break-all;\'}"> </div> </div> <table class="gsc-table-result"> <tbody> <tr> <td class="gsc-table-cell-thumbnail gsc-thumbnail" style="display:none"> <div data-if="Vars.richSnippet" data-attr="0" data-body="render(\'thumbnail\',richSnippet,{url:unescapedUrl,target:target})"> </div> </td> <td data-attr="{\'class\': \'gsc-table-cell-snippet-close\' + ((google.search.CurrentLocale == \'en\' && Vars.richSnippet && Vars.richSnippet.hreview && google.search.richsnippets.hreviewNonEmpty(Vars.richSnippet.hreview)) ? \' gsc-collapsable\' : \'\')}" onclick="if (this.className == \'gsc-table-cell-snippet-close gsc-collapsable\') { this.className = \'gsc-table-cell-snippet-open gsc-collapsable\'; } else if (this.className == \'gsc-table-cell-snippet-open gsc-collapsable\') { this.className = \'gsc-table-cell-snippet-close gsc-collapsable\'; };"> <span data-if="google.search.CurrentLocale == \'en\' && Vars.richSnippet && Vars.richSnippet.hreview" data-attr="0" data-body="render(\'private_hreview_icon\',richSnippet)"> </span> <div class="gs-title gsc-table-cell-thumbnail gsc-thumbnail-left"> <a class="gs-title" data-attr="{href:unescapedUrl,target:target,dir:bidiHtmlDir(title)}" data-body="html(title)"> </a> </div> <div class="gs-fileFormat" data-if="Vars.fileFormat"> <span class="gs-fileFormat" data-body="localizedMessages[\'file-format\'] + \' \'"></span> <span class="gs-fileFormatType" data-body="Vars.fileFormat"></span> </div> <div data-if="google.search.CurrentLocale == \'en\' && Vars.richSnippet"> <span data-attr="0" data-body="render(\'private_metadata\', Vars)"> </span> </div> <div class="gs-bidi-start-align gs-snippet" data-body="html(content)" data-attr="{dir:bidiHtmlDir(content)}"> </div> <div class="gsc-url-bottom"> <div class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-short" data-body="visibleUrl" data-attr="{dir:bidiTextDir(visibleUrl)}"> </div> <div class="gs-bidi-start-align gs-visibleUrl gs-visibleUrl-long" data-body="Vars.formattedUrl ? html(Vars.formattedUrl) : longUrl()" data-attr="{dir: Vars.formattedUrl ? bidiHtmlDir(Vars.formattedUrl) : bidiTextDir(longUrl()), style:\'word-break:break-all;\'}"> </div> </div> <div class="gs-richsnippet-box" style="display: none;"> </div> <span data-if="google.search.CurrentLocale == \'en\' && Vars.richSnippet && Vars.richSnippet.hreview" data-attr="0" data-body="render(\'private_hreview_content\',richSnippet)"> </span> <div class="gs-per-result-labels" data-attr="{url:unescapedUrl}"> <span data-body="localizedMessages[\'labeled\']" data-if="!Vars.isLabelUrl && Vars.perResultLabels"></span> <a class=\'gs-label gs-add-label\' data-if="Vars.isLabelUrl" data-body="localizedMessages[\'add-label\']"></a> <div data-foreach="Vars.perResultLabels" data-attr="0" data-if="Vars.perResultLabels"> <a class="gs-label" data-attr="{\'data-refinementLabel\': Cur[\'label\'], \'label-with-op\': Cur[\'label_with_op\'], \'dir\' : bidiTextDir(Cur.anchor)}" data-body="Cur.anchor"></a> <span data-body="bidiTextMarkAfter(Cur.anchor)"></span> </div> </div> </td> </tr> </tbody> </table> </div> </div> <div id="base_imageResult_image" ><a data-attr="{ \'href\':originalContextUrl, \'target\':target, \'class\':imageClass }" ><img data-attr="{ \'src\':tbUrl, \'title\':titleNoFormatting, \'class\':imageClass }"/ ></a ></div> <div id="base_imageResult_text" ><div class="gs-title gs-ellipsis" ><a class="gs-title" data-attr="{ href:originalContextUrl, target:target, dir:bidiHtmlDir(title) }" data-body="html(title)"></a ></div ><div class="gs-visibleUrl gs-bidi-start-align gs-ellipsis gsc-url-top" data-attr="{title:visibleUrl, dir:bidiTextDir(visibleUrl)}" data-body="visibleUrl" ></div ><div class="gs-snippet gs-bidi-start-align gs-ellipsis" data-attr="{title:contentNoFormatting, dir:bidiHtmlDir(content)}" data-body="html(content)" ></div ><div class="gs-size gs-ellipsis" data-body="width + \' \u00d7 \' + height" ></div ><div class="gs-visibleUrl gs-bidi-start-align gs-ellipsis gsc-url-bottom" data-attr="{title:visibleUrl, dir:bidiTextDir(visibleUrl)}" data-body="visibleUrl" ></div ></div> <div id="base_imageResult_content" ><div data-body="render(\'base_imageResult_image\', Vars)" class="gs-image-box" ></div ><div data-body="render(\'base_imageResult_text\', Vars)" class="gs-text-box" ></div ></div> <div id="base_imageResult_classic" ><div class="gs-result gs-imageResult gs-imageResult-classic" data-body="render(\'base_imageResult_content\', Vars, { imageClass: \'gs-image gs-image-scalable\' })" ></div ></div> <div id="base_imageResult_column" ><div class="gs-result gs-imageResult gs-imageResult-column" data-body="render(\'base_imageResult_content\', Vars, { imageClass: \'gs-image gs-image-scalable\' })" ></div ></div> <div id="base_imageResult_popup" ><div class="gs-result gs-imageResult gs-imageResult-popup" onmouseover="google.search.ImageSearch.showPopup(this)" onmouseout="google.search.ImageSearch.hidePopup(this)" ><div class="gs-image-thumbnail-box" ><div data-body="render(\'base_imageResult_image\', Vars, { imageClass: \'gs-image gs-image-scalable\' })" class="gs-image-box" ></div ></div ><div data-body="render(\'base_imageResult_content\', Vars, { imageClass: \'gs-image\' })" class="gs-image-popup-box" ></div ></div ></div> <div id="base_thumbnail"> <div data-attr="0" data-vars="{tn:(Vars.cseThumbnail && cseThumbnail.src) ? cseThumbnail : ( (Vars.thumbnail && thumbnail.src) ? thumbnail : {src:Vars.document && document.thumbnailUrl})}"> <div data-if="tn.src"> <a class="gs-image" data-attr="{href:url,target:target}"> <img data-if="!tn.width || !tn.height || tn.width >= tn.height * 7 / 5" class="gs-image" data-attr="{src:tn.src}" onload="if (this.parentNode && this.parentNode.parentNode && this.parentNode.parentNode.parentNode) { this.parentNode.parentNode.parentNode.style.display = \'\'; this.parentNode.parentNode.className = \'gs-image-box gs-web-image-box gs-web-image-box-landscape\'; } "/> <img data-elif="true" class="gs-image" data-attr="{src:tn.src}" onload="if (this.parentNode && this.parentNode.parentNode && this.parentNode.parentNode.parentNode) { this.parentNode.parentNode.parentNode.style.display = \'\'; this.parentNode.parentNode.className = \'gs-image-box gs-web-image-box gs-web-image-box-portrait\'; } "/> </a> </div> </div> </div> <div id="base_action"> <div data-foreach="Vars.action" data-attr="0"> <div data-attr="{\'class\': \'gs-action \' + Cur[\'class\']}" data-if="Cur.url && Cur.label"> <a class="gs-action" data-attr="{href:Cur.url,target:target,dir:bidiTextDir(Cur.label)}" data-body="Cur.label"></a> </div> </div> </div> </div> ';
google.loader.loaded({"module":"search","version":"1.0","components":["default"]}); 
google.loader.eval.search = function() {eval(arguments[0]);};if (google.loader.eval.scripts && google.loader.eval.scripts['search']) {(function() {var scripts = google.loader.eval.scripts['search'];for (var i = 0; i < scripts.length; i++) {google.loader.eval.search(scripts[i]);}})();google.loader.eval.scripts['search'] = null;}})();
