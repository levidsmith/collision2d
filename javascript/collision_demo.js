//collision_demo.js
//2022 Levi D. Smith

SCREEN_WIDTH = 640;
SCREEN_HEIGHT = 480;
PIXEL_SCALE = 32;
X_MAX_UNITS = 15;
Y_MAX_UNITS = 10;

X_OFFSET = 32;
Y_OFFSET = 32;


c_black = '#000000';
c_red = '#FF0000';
c_green = '#00FF00';
c_blue = '#0000FF';
c_white = '#FFFFFF';

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    } 
    
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Circle {
   constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
   } 
}

function start() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    
    drawAxes();




}


function draw() {
    inputData1 = document.getElementById("inputData1");
    obj1 = parseData(inputData1.value);

    inputData2 = document.getElementById("inputData2");
    obj2 = parseData(inputData2.value);

    drawAxes();

/*
    ctx.fillStyle = c_white;
    ctx.font = "24px Arial";
    ctx.fillText("hello", 50, 50);
    ctx.fillText(inputData.value, 50, 80);

//rectangle
    ctx.strokeStyle = c_red;
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 100, 200, 50);

//line
    ctx.strokeStyle = c_blue;
    ctx.beginPath();
    ctx.moveTo(400, 100);
    ctx.lineTo(450, 150);
    ctx.stroke();

//Circle
    ctx.strokeStyle = c_green;
    
    ctx.beginPath();
    ctx.arc(50, 200, 50, 0, 2 * Math.PI, false);
    ctx.stroke();
*/

    if (obj1 instanceof Point) {
        ctx.strokeStyle = c_red;
        drawPoint(obj1);
    } else if (obj1 instanceof Line) {
        ctx.strokeStyle = c_red;
        drawLine(obj1);
    } else if (obj1 instanceof Rectangle) {
        ctx.strokeStyle = c_red;
        drawRectangle(obj1);
    } else if (obj1 instanceof Circle) {
        ctx.strokeStyle = c_red;
        drawCircle(obj1);
    }

    if (obj2 instanceof Point) {
        ctx.strokeStyle = c_blue;
        drawPoint(obj2);
    } else if (obj2 instanceof Line) {
        ctx.strokeStyle = c_blue;
        drawLine(obj2);
    } else if (obj2 instanceof Rectangle) {
        ctx.strokeStyle = c_blue;
        drawRectangle(obj2);
    } else if (obj2 instanceof Circle) {
        ctx.strokeStyle = c_blue;
        drawCircle(obj2);
    
    }

    if (obj1 instanceof Point && obj2 instanceof Point) {
        collisionPointPoint(obj1, obj2);
    }

    if (obj1 instanceof Point && obj2 instanceof Line) {
        collisionPointLine(obj1, obj2);
    } else if (obj1 instanceof Line && obj2 instanceof Point) {
        collisionPointLine(obj2, obj1);
    }

    if (obj1 instanceof Line && obj2 instanceof Line) {
        collisionLineLine(obj1, obj2);
    }


    if (obj1 instanceof Point && obj2 instanceof Rectangle) {
        collisionPointRectangle(obj1, obj2);
    } else if (obj1 instanceof Rectangle && obj2 instanceof Point) {
        collisionPointRectangle(obj2, obj1);

    }

    if (obj1 instanceof Rectangle && obj2 instanceof Rectangle) {
        collisionRectangleRectangle(obj1, obj2);
    }

    if (obj1 instanceof Circle && obj2 instanceof Circle) {
        collisionCircleCircle(obj1, obj2);
    }

    if (obj1 instanceof Point && obj2 instanceof Circle) {
        collisionPointCircle(obj1, obj2); 
    } else if (obj1 instanceof Circle && obj2 instanceof Point) {
        collisionPointCircle(obj2, obj1); 
    }



}

function drawPoint(obj) {
    ctx.beginPath();
    ctx.arc(X_OFFSET + (obj.x * PIXEL_SCALE), Y_OFFSET + (obj.y * PIXEL_SCALE), 2, 0, 2 * Math.PI, false);
    ctx.stroke();

}

function drawLine(obj) {
    ctx.beginPath();
    ctx.moveTo(X_OFFSET + (obj.x1 * PIXEL_SCALE), Y_OFFSET + (obj.y1 * PIXEL_SCALE));
    ctx.lineTo(X_OFFSET + (obj.x2 * PIXEL_SCALE), Y_OFFSET + (obj.y2 * PIXEL_SCALE));
    ctx.stroke();

}

function drawRectangle(obj) {
    ctx.beginPath();
    ctx.strokeRect(X_OFFSET + (obj.x * PIXEL_SCALE), Y_OFFSET + (obj.y * PIXEL_SCALE), obj.w * PIXEL_SCALE, obj.h * PIXEL_SCALE);
    ctx.stroke();

}


function drawCircle(obj) {
    ctx.beginPath();
    ctx.arc(X_OFFSET + (obj.x * PIXEL_SCALE), Y_OFFSET + (obj.y * PIXEL_SCALE), obj.r * PIXEL_SCALE, 0, 2 * Math.PI, false);
    ctx.stroke();

}

function collisionPointPoint(p1, p2) {
    isCollision = false;

    if (p1.x == p2.x && 
        p1.y == p2.y) {
            isCollision = true;
    }

    displayCollided(isCollision);

    return isCollision;
}

function collisionPointLine(p1, l1) {
    isCollision = false;

    m = (l1.y2 - l1.y1) / (l1.x2 - l1.x1);
    b = l1.y1 - (m * l1.x1);

    if (p1.y == (m * p1.x) + b) {
        isCollision = true;
    }


    displayCollided(isCollision);
    return isCollision;
}


function collisionLineLine(l1, l2) {
    
    isCollision = false;

    m1 = (l1.y2 - l1.y1) / (l1.x2 - l1.x1);
    b1 = l1.y1 - (m1 * l1.x1);

    m2 = (l2.y2 - l2.y1) / (l2.x2 - l2.x1);
    b2 = l2.y1 - (m2 * l2.x1);

    x = (-b1 + b2)/(m1 - m2);
    if ( (x >= Math.min(l1.x1, l1.x2)) &&
         (x <= Math.max(l1.x1, l1.x2)) &&
         (x >= Math.min(l2.x1, l2.x2)) &&
         (x <= Math.max(l2.x1, l2.x2))
      ) {
          isCollision = true;
      }

//    if (p1.y == (slope * p1.x) + b) {
//        isCollision = true;
//    }


    displayCollided(isCollision);
    return isCollision;
}


function collisionPointRectangle(p1, r1) {
    isCollision = false;

    if ((p1.x >= r1.x) &&
        (p1.x <= r1.x + r1.w) &&
        (p1.y >= r1.y) &&
        (p1.y <= r1.y + r1.h)) {
            isCollision = true;
    }


    displayCollided(isCollision);
    return isCollision;
}

function collisionRectangleRectangle(r1, r2) {
    isCollision = false;


    if ( (!(r2.x + r2.w < r1.x)) &&
         (!(r2.x > r1.x + r1.w)) &&
         (!(r2.y + r2.h < r1.y)) &&
         (!(r2.y > r1.y + r1.h))
         ) {
            isCollision = true;
    }

    displayCollided(isCollision);
    return isCollision;
}

function collisionCircleCircle(c1, c2) {
    isCollision = false;

    a = c1.y - c2.y;
    b = c1.x - c2.x;
    c = Math.pow(Math.pow(a, 2) + Math.pow(b,2), 0.5)

    if (c <= c1.r + c2.r) {
        isCollision = true;
    }

    displayCollided(isCollision);

    return isCollision;
}


function collisionPointCircle(p1, c1) {
    isCollision = false;

    a = c1.y - p1.y;
    b = c1.x - p1.x;
    c = Math.pow(Math.pow(a, 2) + Math.pow(b,2), 0.5)

    if (c <= c1.r) {
        isCollision = true;
    }

    displayCollided(isCollision);

    return isCollision;
}


function displayCollided(isCollided) {
    ctx.fillStyle = c_white;
    if (isCollided) {
        ctx.fillText("collided", 100, 400);
    } else {
        ctx.fillText("not collided", 100, 400);
    }

}



function parseData(strInput) {
    objResult = undefined;

    //point
    regexPoint = /p\(\s*(\d+)\s*,\s*(\d+)\s*\)/i;
    result = strInput.match(regexPoint);

    if (result) {
        objResult = new Point(parseInt(result[1]), parseInt(result[2]));
    }

    //line
    regexLine = /l\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
    result = strInput.match(regexLine);

    if (result) {
        objResult = new Line(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
    }

    //rectangle
    regexRectangle = /r\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
    result = strInput.match(regexRectangle);

    if (result) {
        objResult = new Rectangle(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseInt(result[4]));
    }
  

    //circle
    regexCircle = /c\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
    result = strInput.match(regexCircle);

    if (result) {
        objResult = new Circle(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]));
    }




    return objResult;


}

function drawAxes() {
    ctx.fillStyle = c_black;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    ctx.lineWidth = 3;
    ctx.font = "24px Arial";

    ctx.strokeStyle = c_red;
    ctx.fillStyle = c_red;
    ctx.beginPath();
    ctx.moveTo(X_OFFSET, Y_OFFSET);
    ctx.lineTo(X_OFFSET + (X_MAX_UNITS * PIXEL_SCALE), Y_OFFSET);
    ctx.stroke();

    for (i = 1; i <= X_MAX_UNITS; i++) {
        ctx.beginPath();
        ctx.moveTo(X_OFFSET + (i * PIXEL_SCALE), Y_OFFSET);
        ctx.lineTo(X_OFFSET + (i * PIXEL_SCALE), Y_OFFSET - 8);
        ctx.stroke();
    }

    ctx.fillText("x", X_OFFSET + (X_MAX_UNITS * PIXEL_SCALE), Y_OFFSET - 8);


    ctx.strokeStyle = c_green;
    ctx.fillStyle = c_green;
    ctx.beginPath();
    ctx.moveTo(X_OFFSET, Y_OFFSET);
    ctx.lineTo(X_OFFSET, Y_OFFSET + (Y_MAX_UNITS * PIXEL_SCALE));
    ctx.stroke();

    for (i = 1; i <= Y_MAX_UNITS; i++) {
        ctx.beginPath();
        ctx.moveTo(X_OFFSET, Y_OFFSET + (i * PIXEL_SCALE));
        ctx.lineTo(X_OFFSET - 8, Y_OFFSET + (i * PIXEL_SCALE));
        ctx.stroke();
    }


    ctx.fillText("y", X_OFFSET - 20, Y_OFFSET + (Y_MAX_UNITS * PIXEL_SCALE));

}
