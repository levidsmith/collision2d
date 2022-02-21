//2021 Levi D. Smith
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Point  {
    public int x;
    public int y;

    public Point(int inX, int inY) {
        x = inX;
        y = inY;
    }

    public override string ToString() {
        return x + ", " + y;

    }
}