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

# Bioluminacent Magic for Ancestor transformation

<iframe width="560" height="315" src="https://www.youtube.com/embed/on-K551_8ac?si=eAMrmodfzgZewpX2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/TZa7V_qyAVA?si=wcuJidfw4aTQbABf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<!-- <video src="https://youtu.be/on-K551_8ac" controls autoplay muted playsinline loop> </video>
<video src="/moana2/tuna_transform.webm" controls autoplay muted playsinline loop> </video> -->

## The task

In the movie when the people pass away, they turn into a sea animal. Moana's ancestor geather around Maui's underwater airbubble and chant a song to bring Moana back to life.
The ancestor's animal is a whale shark. It's huge compare to his human form so we have to figure out a way to cover that.

## Light
![looking up from below](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/US_Navy_110607-N-XD935-191_Navy_Diver_2nd_Class_Ryan_Arnold%2C_assigned_to_Mobile_Diving_and_Salvage_Unit_2%2C_snorkels_on_the_surface_to_monitor_multi.jpg/1920px-US_Navy_110607-N-XD935-191_Navy_Diver_2nd_Class_Ryan_Arnold%2C_assigned_to_Mobile_Diving_and_Salvage_Unit_2%2C_snorkels_on_the_surface_to_monitor_multi.jpg)

It started from whale glow and slowing turn into shadow, at the same time a slow sphere glow from the center. Then circliar light slowly grow to a human shape and a human shadow slowly appears.

### Caustic

![caustic](/moana2/demoreel_screenshot_caustic.png)
<video src="/cmhben.com/moana2/caustic.v0001.webm" controls autoplay muted playsinline loop> </video>
Initial idea was from this entagma tutorial:
https://www.youtube.com/watch?v=GPYlgxMaMQs
What I changed is use a sphere as source and project the points onto a curved surface.
<video src="moana2/caustic.v0002.webm" controls autoplay muted 
playsinline loop> </video>
vex code for the refraction and projection:
```c
vector ray_dir;
vector p2, uvw;
int prim;
// orig_N is the direction pointing from the sphere to the projection plane, N is the normal of the deforming sphere
ray_dir = refract(v@orig_N,v@N,ch("ior"));
ray_dir *=100;
// check intersection and project onto collider
v@ray_dir = ray_dir;
prim = intersect(1,v@P,ray_dir,p2,uvw);
if(prim ==-1){
    removepoint(0,@ptnum);
    v@Cd=0;
}else{
    v@Cd =primuv(1,"Cd",prim,uvw); 
    v@target_N =primuv(1,"N",prim,uvw); 
}
v@P = p2;
```
### Whale fading mask
<img src="moana2/demoreel_screenshot_whalemask.png"/>
Simple mask from the dot of the whaleshark, with glow at the edge and animated with the distance from the glow source

### Ancescor enmerging shadow
<img src="moana2/demoreel_screenshot_shadow.png"></img>
The size of the whale is so much larger than the guy it's transforming to, so we figure out a way to smoothly transform is to have a shadow walk out as the whale turn into light and walk out.

Althought after all the bluring and with all the element added on top, the initial idea was to have a mask looking like the shape of light when you are looking up from underwater
https://en.wikipedia.org/wiki/Snell%27s_window
<video src="moana2/refraction.v0001.webm" controls autoplay muted playsinline loop> </video>
The vex code is very similar to the caustic
```c
//get ray direction towards object
vector dir = getbbox_center(1)-v@P;
dir =v@rest_N;
vector ray_dir = refract(dir,v@N,ch("ior"));

// emit ray from deforming surface and check collision
vector p2,uvw;
int prim;
ray_dir*=-100;
prim = intersect(1,v@P,ray_dir,p2,uvw);
v@ray_dir = ray_dir;
if(prim ==-1){
    v@Cd=0;
}else{
    v@Cd=1;
    v@target_N =primuv(1,"N",prim,uvw); 
}
```
<video src="moana2/refraction.v0002.webm" controls autoplay muted playsinline loop> </video>


## Water surface contact
Interaction with the water surface
Then we tried a couple different ideas
The first logical attept was to have a ripple:
### Ripple solver
There are so many ways to do ripple in Houdini. The ripple solver was obvious choice
<video src="moana2/ripplesolver.v0001.webm" controls autoplay muted playsinline loop> </video>
It was sourced using the distance between surface so the body and apply a ramp on the height offset.
it works well but it's lacking some magical quality and the shape is  not very clean.
### Circle solver
![raindrop](https://images.pexels.com/photos/4396992/pexels-photo-4396992.jpeg)
Rain drops are more gentle
<video src="moana2/circlesolver.v0001.webm" controls autoplay muted playsinline loop> </video>
<video src="moana2/circlesolver.v0002.webm" controls autoplay muted playsinline loop> </video>
Another advantage of not using the circles we can have the outward velocity trailing the actual circle line, compare to ripple solver, which only push the geometry up and downwards.
With 

### Bioluminacent particles
This is referencing the original movie, when the grandma ray swim by,
As a fx artist, my first instinct was of course a splash, like I did for wade breaking out of the pipe in Elemental.
But the direction was different, it was a more somba moment so it has to be more magical effects.


![whale bubble feeding](https://upload.wikimedia.org/wikipedia/commons/3/3a/Humpback_whale_bubble_net_feeding_Christin_Khan_NOAA.jpg)

#### Whatewater shape
<video src="moana2/biolumin.v0001.webm" controls autoplay muted playsinline loop> </video>
There was a solver called chain solver in the studio, I opened the hda and found out the way it was done.

It was using Principle Component Analysis add force to the particle so they form a stringly look like foam patten
1. center the patch 
2. create covariance matrix
3. calculate the eigan vector and value
The perpendicular vector of eigan vector is the direction to make it more string like
I haven't attempt to recreate it but I used the existing PCA nodes in houdini to outline the theory
![PCA](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/GaussianScatterPCA.svg/1024px-GaussianScatterPCA.svg.png)
<video src="moana2/chainsolver.v0002.webm" controls autoplay muted playsinline loop> </video>

#### Sop PCA
Houdini has a sop implementation of Principle Component Analysis, but it's not very practical in this case but you can use this as an example to understand the inner working
https://www.sidefx.com/contentlibrary/pca-dejitter/
<img src="moana2/pca.v0001.png" />
Sop pca node require all dimensions to be anlysis to be store as a point node so we need to find the neighbors of each point and create duplicated points

set_neighbors:
```c
// for each point, store the neighbors and their position into arrays 
//serach radius and max neighbours
float proxrad = ch("proxrad");
int maxneigh = chi("maxneigh");
int pts[]= pcfind(0, "P", @P, proxrad, maxneigh);
vector p_data[];
for(int i=0;i<maxneigh;i++){
    if(i<len(pts)){
        p_data[i] = point(0,"P",pts[i]);
    }else{
        p_data[i] =v@P;
    }   
}
i[]@__neighbors__ = pts; 
v[]@p_data = p_data;
```
duplicate neighbors:
```c
// the number of dimension (number of neighbors)
// this link to the current iteration of the for loop
int iter = chi("iter");
vector new_p = v[]@p_data[iter-1];
new_p-=v@P;
addpoint(0,new_p);
removepoint(0,@ptnum);
```







