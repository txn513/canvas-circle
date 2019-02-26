(function(){
	var canvas = document.querySelector('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var c = canvas.getContext('2d');
	var circleNum = 1000; // number of cirlces
	var mouseX; // mouse x
	var mouseY;	// mouse y
	var r = 4; // radius
	var maxR = 50; // max radius
	var minR = r; // min radius
	var colorArr = [
		'#E37B40',
		'#46B29D',
		'#DE5B49',
		'#324D5C',
		'#F0CA4D'
	]
	var cArr = [];

	function Circle (x,y,r,dx,dy,color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.dx = dx;
		this.dy = dy;
		this.color = color;
	}
	Circle.prototype.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,2*Math.PI);
		c.fillStyle = this.color;
		c.strokeStyle = this.color;

		c.stroke()
		c.fill()
	}
	Circle.prototype.update = function(){
		if(this.x+this.r > innerWidth || this.x-this.r<0){
			this.dx = -this.dx
		}
		if(this.y+this.r > innerHeight || this.y-this.r<0){
			this.dy = -this.dy
		}
		
		this.x += this.dx;
		this.y += this.dy

		// console.log((mouseX - this.x) > -50 && (mouseX - this.x) < 50 && (mouseY - this.Y) > -50 && (mouseY - this.Y) < 50)

		if(mouseX - this.x > -50 && mouseX - this.x < 50 && mouseY - this.y > -50 && mouseY - this.y < 50){
			// console.log(1);
			if (this.r < maxR){
				this.r += 1;
			}
		}else if (this.r > minR){
			this.r -= 1;
		}
		

		this.draw()
	}

	for(var i =0; i< circleNum; i++){
		var x = Math.random()*(innerWidth-2*r) + r;
		var y = Math.random()*(innerHeight-2*r) + r;
		var dx = (Math.random()-0.5)*3;
		var dy = (Math.random()-0.5)*3;
		// var color = "rgb("+ Math.floor(Math.random()*256) +","+ Math.floor(Math.random()*256) +","+ Math.floor(Math.random()*256) +")"
		var color = colorArr[Math.floor(Math.random() * colorArr.length)]
		cArr.push(new Circle(x,y,r,dx,dy,color))
	}

	function animate(){
		requestAnimationFrame(animate)
		c.clearRect(0,0,innerWidth,innerHeight)
		for(var i=0; i<cArr.length; i++){
			cArr[i].update();
		}
		
	}
	animate();

	window.addEventListener('mousemove', function(e){
		mouseX = e.x;
		mouseY = e.y;
	}, false)

})()