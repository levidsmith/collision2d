//2021 Levi D. Smith
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CollisionDemo : MonoBehaviour {
    void Start() {
        //rectangleRectangleCollision();
        circlecircleCollision();
        
    }

    void Update() {
        
    }

    private void linePointCollision() {
        Line line = new Line(6, 1, 4, 5);
        Point p = new Point(2, 3);
        p = new Point(5, 3);

        float fSlope = (line.y2 - line.y1) / (line.x2 - line.x1);
        float b = line.y1 - fSlope * line.x1;

        if (p.y == (fSlope * p.x) + b) {
            //collision
        }

        Debug.Log("Line: slope: " + fSlope + " b: " + b);


    }

    private void pointRectangleCollision() {
        Rectangle r1 = new Rectangle(2, 1, 4, 3);
        Point p1 = new Point(5, 3);
        Debug.Log("point " + p1 + " / rectangle " + r1);
        

        if (p1.x >= r1.x &&
            p1.x <= r1.x + r1.w &&
            p1.y >= r1.y &&
            p1.y <= r1.y + r1.h) {
            //collision            
        }

    }

    private void rectangleRectangleCollision() {
        //Rectangle r1 = new Rectangle(1, 2, 1, 1);
        Rectangle r1 = new Rectangle(1, 8, 2, 1);
        Rectangle r2 = new Rectangle(4, 1, 4, 3);

        Debug.Log("r1 " + r1 + " / r2 " + r2);

        if (!(r2.x + r2.w < r1.x) &&
            !(r2.x > r1.x + r1.w) &&
            !(r2.y + r2.h < r1.y) &&
            !(r2.y > r1.y + r1.h)) {
            //collision            
        }


        //Using DeMorgan's Theorem
        if (!(r2.x + r2.w < r1.x ||
            r2.x > r1.x + r1.w ||
            r2.y + r2.h < r1.y ||
            r2.y > r1.y + r1.h)) {
            //collision
        }


    }

    private void circlecircleCollision() {
        Circle c1 = new Circle(2, 3, 2);
        Circle c2 = new Circle(3, 4, 1);

        int a, b;
        float c;

        a = c1.y - c2.y;
        b = c1.x - c2.x;
        c = Mathf.Pow(Mathf.Pow(a, 2) + Mathf.Pow(b, 2), 0.5f);

        if (c < c1.r + c2.r) {
            //collided
        }


    }


    private void pointCollision() {
        Point p1 = new Point(5, 2);
        Point p2 = new Point(1, 4);

        if (p1.x == p2.x &&
            p1.y == p2.y) {
            //collision
        }
    }

}