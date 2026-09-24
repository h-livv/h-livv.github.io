# What are derivatives?

I've always taken derivatives for granted. We were taught that derivatives are the rate of change of a value. It's easy to understand that $dy/dx$ is the rate of change of y with respect to x. 

But, as I thought more about $d^2y/dx^2$, I realized that I didn't know what it actually meant beyond the definition of rate of change of the rate of change. As the order increased, the intuition broke down.

So, I sought a way to understand the meaning of higher derivatives. First, I started with a physical example. Position and time.

 $dy/dt$ is how position changes - velocity, 

 $d^2y/dt^2$ is how velocity changes - acceleration, 

 $d^3y/dt^3$ is how acceleration changes - jerk and so on. 

It's easy to imagine these as they are phenomena we can experience - like a roller coaster.

However, I couldn't rely on this intuition to understand the meaning of derivatives in geometry. The definition is good, but I was looking for something deeper and more fundamental.

I thought about what a derivative actually is. It is essentially a linear local approximation. Zoom in close enough on a smooth function, and it starts behaving like a line: 

$$
f(x+h)≈f(x)+f^′(x)h.
$$

Now where do higher order derivatives fit in? The answer is in an attempt to approximate the function better. We get something like: 

$$
f(x+h)=f(x)+f'(x)h+f''(x)h/2+⋯
$$

This is the Taylor expansion. It is a beautiful way to reconstruct the function using polynomials. But how does it help us understand what a derivative actually is?

To understand what exactly the Taylor series can tell us about derivatives, I worked from the ground up, reconstructing the function from a local point. 

Assume you've been given a task. You've just spawned on the surface of the Earth and must model the Earth's profile/height function as a function of horizontal distance. You don't know anything about its shape or curvature. Initially, according to you, you're just standing at a single point. From your worldview, the Earth is just a point. So, it would be rational to write your function as: 

$$
f(x) = A
$$

Where A is an arbitrary constant. Now, you are at $x = 0$. So, 

$$
f(0) = A
$$

Hence, we get 

$$
f(x) = f(0)
$$

Obviously, this is a terrible approximation. The Earth is not a point.

Now, you've been given the ability to move. The next best approximation you can make is a linear one. That the Earth is flat. Imagine an infinitely long line fixed at your initial point. This is our linear approximation. We add this to our current polynomial: 

$$
f(x) = f(0) + Bx
$$

At this point, there is no calculus. We are simply trying to find the simplest family of functions capable of describing local geometry.

Now, our polynomial has a starting point and a direction. To find $B$, let us differentiate this at $x=0$ (Assume that we know how to differentiate, but not the meaning of it).

$$
f'(0) = B
$$

Hence, we get 

$$
f(x) = f(0) + f'(0)x
$$

To compare this to the Earth's profile, we start walking along the line. Initially, it looks like our approximation works. However, traverse a long enough distance and we notice that our line diverges from the surface. 

Intuitively, we need a term that introduces curvature to better approximate our function. The simplest possible addition we can make is a quadratic term. We don't know what it means yet, just that it introduces curvature.

$$
f(x) = f(0) + f'(0)x + Cx^2
$$

Now, our polynomial has curvature. To find $C$, we double differentiate at $x=0$ to isolate it. 

$$
f''(0) = 2C
$$

or 

$$
C = \frac{f''(0)}{2}
$$

Hence, we get 

$$
f(x) = f(0) + f'(0)x + \frac{f''(0)x^2}{2}
$$

Now we find that our curve fits much better. If however, we find that even this function fails to converge to the Earth's profile, we can conclude that even the quadratic approximation is insufficient, suggesting that the local curvature varies.

Let us constrain ourselves to the second derivative and try to understand what these equations mean geometrically.

Starting with 

$$
f(x) = f(0) + f'(0)x
$$

Let us move a small distance h. We end up with 

$$
f(h) = f(0) + f'(0)h
$$

Notice what this means. The function, in this case the height, scales with the first derivative. This means that as distance changes, the height changes as a factor of the first derivative. Or more formally, taking the infinitesimal limit,

$$
f'(0) = \lim_{h \to 0}\frac{f(h) - f(0)}{h}
$$

So, we have arrived at the meaning of the single derivative through geometrical intuition. 

Coming to the second derivative 

$$
f(x) = f(0) + f'(0)x + \frac{f''(0)x^2}{2}
$$

We differentiate this equation once more 

$$
f'(x) = f'(0) + f''(0)x
$$

Here, $f'(x)$ represents the slope of the profile of the earth. Drawing from previous comparisons, we can see that as $x$ changes, $f'(x)$ or the slope changes as a factor of the second derivative. In simpler terms, the second derivative governs the rate of change of slope!

We can generalize this to higher degree derivatives. Differentiating shifts every coefficient one level, and each governs the change of the previous derivative. 

$$
f_n(x)= \sum_{k=0}^{n}a_kx^k
$$

where 

$$
a_k = f^{(k)}(0)/k!
$$

What's fascinating is that we never began with the definition of derivatives as a rate of change. Instead, we asked how an unknown shape can be reconstructed from purely local information.
Differentiation emerged naturally as the tool that extracts coefficients of progressively better local approximations.
Only afterwards did we start to infer interpretations and definitions.
The "rate of change" definition wasn't the starting point, it was a consequence of Taylor expansion.

I also got to thinking about how we could extend the idea of vectorized linear algebra to functions and infinite vector spaces. That's a topic for another day.