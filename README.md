# Waterfall CSS Grid

A minimalist fractional Responsive CSS Grid: [https://f1lt3r.github.io/waterfall](https://f1lt3r.github.io/waterfall)

## About

There are 4 screen sizes:

1. Giant
1. Large
1. Medium
1. Small

Each screen size is represented by a letter:

- `g` = Giant
- `l` = Large
- `m` = Medium
- `l` = Small

Each letter is followed by a number that corresponds to the fraction of the parent container that the element should fill.

```html
<div class="container">
  <div class="g2"> Fill 50% of container. </div>
  <div class="g4"> Fill 25% of container. </div>
  <div class="g4"> Fill remaining 25% of container. </div>
</div>

```




## Example

**This code block:**

```html
<div class="s1 m3 l2 g4">A</div>
<div class="s2 m6 l4 g4">B</div>
<div class="s2 m3 l8 g4">C</div>
<div class="s1 m6 l8 g4">D</div>
```

**Produces:**

Giant

![Giant Grid Layout](http://imgur.com/JHRwyPU.png)

Large

![Large Grid Layout](http://i.imgur.com/iQ8opoP.png)

Medium

![Medium Grid Layout](http://imgur.com/HYtla89.png)

Small

![Small Grid Layout](http://imgur.com/X5g5Ipn.png)


See more examples here:  [https://f1lt3r.github.io/waterfall](https://f1lt3r.github.io/waterfall)

