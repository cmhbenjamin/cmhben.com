---
title: Moana 2
fmContentType: page
studio: Disney Animation
releaseYear: 2014
visible: true
image: "../../assets/work/moana2.jpg"
description: "Magic"
order: 2
---

# Bioluminescent Magic for Ancestor Transformation

<iframe width="560" height="315" src="https://www.youtube.com/embed/on-K551_8ac?si=eAMrmodfzgZewpX2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/TZa7V_qyAVA?si=wcuJidfw4aTQbABf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!-- Local videos commented out for now:
<video src="https://youtu.be/on-K551_8ac" controls autoplay muted playsinline loop></video>
<video src="/moana2/tuna_transform.webm" controls autoplay muted playsinline loop></video>
-->

## The task

In the film, when people pass away they transform into sea animals. In this sequence, Moana's ancestors gather around Maui's underwater air bubble and chant to bring Moana back to life. The ancestor's animal form is a whale shark, which is much larger than the human form. So we needed a way to cover that change smoothly.

## Light

![Looking up from below](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/US_Navy_110607-N-XD935-191_Navy_Diver_2nd_Class_Ryan_Arnold%2C_assigned_to_Mobile_Diving_and_Salvage_Unit_2%2C_snorkels_on_the_surface_to_monitor_multi.jpg/1920px-US_Navy_110607-N-XD935-191_Navy_Diver_2nd_Class_Ryan_Arnold%2C_assigned_to_Mobile_Diving_and_Salvage_Unit_2%2C_snorkels_on_the_surface_to_monitor_multi.jpg)

The idea starts from the whale's glow that slowly becomes shadow. At the same time a soft spherical glow grows from the center. Circular light expands into a human silhouette while a human shadow gradually appears.

### Caustics

![Caustic](/moana2/demoreel_screenshot_caustic.png)

<video src="/cmhben.com/moana2/caustic.v0001.webm" controls autoplay muted playsinline loop></video>

The initial idea came from an ![Entagma tutorial](https://www.youtube.com/watch?v=GPYlgxMaMQs). I adapted it to use a sphere as the light source and project points onto a curved surface.

<video src="moana2/caustic.v0002.webm" controls autoplay muted playsinline loop></video>

VEX used for refraction and projection:

```c
vector ray_dir;
vector p2, uvw;
int prim;
// orig_N is the direction pointing from the sphere to the projection plane, N is the normal of the deforming sphere
ray_dir = refract(v@orig_N, v@N, ch("ior"));
ray_dir *= 100;
// check intersection and project onto collider
v@ray_dir = ray_dir;
prim = intersect(1, v@P, ray_dir, p2, uvw);
if (prim == -1) {
    removepoint(0, @ptnum);
    v@Cd = 0;
} else {
    v@Cd = primuv(1, "Cd", prim, uvw);
    v@target_N = primuv(1, "N", prim, uvw);
}
v@P = p2;
```

### Whale mask (fading)

<img src="moana2/demoreel_screenshot_whalemask.png" alt="Whale mask"/>

A simple mask generated from the whale shark silhouette, with a glow at the edge and animation driven by the glow source distance.

### Ancestor emerging shadow

<img src="moana2/demoreel_screenshot_shadow.png" alt="Ancestor emerging shadow"/>

The whale is much bigger than the human, so to make the transformation feel smooth we have a shadow "walk out" as the whale turns into light and the human form emerges. After blurring and layering, the mask approximates the light shape you see when looking up from underwater (Snell's window).

<video src="moana2/refraction.v0001.webm" controls autoplay muted playsinline loop></video>

VEX for refraction/projection (similar to caustics):

```c
// get ray direction towards object
vector dir = getbbox_center(1) - v@P;
dir = v@rest_N;
vector ray_dir = refract(dir, v@N, ch("ior"));

// emit ray from deforming surface and check collision
vector p2, uvw;
int prim;
ray_dir *= -100;
prim = intersect(1, v@P, ray_dir, p2, uvw);
v@ray_dir = ray_dir;
if (prim == -1) {
    v@Cd = 0;
} else {
    v@Cd = 1;
    v@target_N = primuv(1, "N", prim, uvw);
}
```

<video src="moana2/refraction.v0002.webm" controls autoplay muted playsinline loop></video>


## Water surface contact
Interaction with the water surface
Then we tried a couple different ideas
The first logical attept was to have a ripple:
### Ripple solver

There are many ways to create ripples in Houdini. The ripple solver is a straightforward choice: source the ripple from the distance between surfaces and apply a ramp to the height offset. It works well but lacks a "magical" quality and the shapes are not very clean.

### Circle solver

![Raindrop](https://images.pexels.com/photos/4396992/pexels-photo-4396992.jpeg)

Rain-drop-like circles are gentler. The circle solver gives outward velocity that trails the circle line, whereas the ripple solver primarily moves geometry up and down.

<video src="moana2/circlesolver.v0001.webm" controls autoplay muted playsinline loop></video>
<video src="moana2/circlesolver.v0002.webm" controls autoplay muted playsinline loop></video>

## Bioluminescent particles

Referencing the original movie where the grandmother ray swims by. As an FX artist my instinct was to go splash-first (as in Elemental), but the sequence needed a more somber, magical feeling.

![Whale bubble feeding](https://upload.wikimedia.org/wikipedia/commons/3/3a/Humpback_whale_bubble_net_feeding_Christin_Khan_NOAA.jpg)

### Whitewater shape

<video src="moana2/biolumin.v0001.webm" controls autoplay muted playsinline loop></video>

A studio chain-solver HDA inspired this approach. It uses PCA to add forces so particles form stringy, foam-like patterns:
1. Center the patch.
2. Create the covariance matrix.
3. Calculate eigenvectors and eigenvalues.

The perpendicular of the principal eigenvector gives the direction that creates a string-like look. I used existing PCA nodes in Houdini to explore the idea.

#### Chain solver

<video src="moana2/chainsolver.v0002.webm" controls autoplay muted playsinline loop></video>

#### SOP PCA

Houdini has a SOP PCA implementation. It requires points to be arranged so each point stores neighbor positions; this can be impractical here but helps illustrate the concept.

![pca](/moana2/pca.v0001.png)
Set neighbours wrangle:
```c
// for each point, store the neighbors and their position into arrays
// search radius and max neighbours
float proxrad = ch("proxrad");
int maxneigh = chi("maxneigh");
int pts[] = pcfind(0, "P", @P, proxrad, maxneigh);
vector p_data[];
for (int i = 0; i < maxneigh; i++) {
    if (i < len(pts)) {
        p_data[i] = point(0, "P", pts[i]);
    } else {
        p_data[i] = v@P;
    }
}
i[]@__neighbors__ = pts;
v[]@p_data = p_data;
```
Duplicate neighbors wrangle:
```c
// the number of dimensions (number of neighbors)
// this links to the current iteration of the for loop
int iter = chi("iter");
vector new_p = v[]@p_data[iter-1];
new_p -= v@P;
addpoint(0, new_p);
removepoint(0, @ptnum);

```

References:
- Entagma tutorial (inspiration): https://www.youtube.com/watch?v=GPYlgxMaMQs
- SideFX PCA dejitter example: https://www.sidefx.com/contentlibrary/pca








