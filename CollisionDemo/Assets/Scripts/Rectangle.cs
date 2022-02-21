//2021 Levi D. Smith
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rectangle {
    public int x, y, w, h;
    public Rectangle(int inX, int inY, int inW, int inH) {
        x = inX;
        y = inY;
        w = inW;
        h = inH;

    }

    public override string ToString() {
        return x + ", " + y + ", " + w + ", " + h;

    }
}