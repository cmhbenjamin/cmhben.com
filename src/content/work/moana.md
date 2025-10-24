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

# Bioluminacent Magic
<video src="https://youtu.be/on-K551_8ac" controls autoplay muted playsinline loop> </video>
<iframe width="560" height="315" src="https://www.youtube.com/embed/on-K551_8ac?si=eAMrmodfzgZewpX2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<video src="/moana2/tuna_transform.webm" controls autoplay muted playsinline loop> </video>
## The task
It's a bioluminacent magic using particles
cover up the whale transformation into ancestor


In the movie when the people pass away, they turn into a sea animal. Moana's ancestor geather around Maui's underwater airbubble and chant a song to bring Moana back to life.
The ancestor's animal is a whale shark. It's huge compare to his human form so we have to figure out a way to cover that.
The water bubbles and fx on it was done by another fx artist, so I got the geometry surface from him.



## Contacting with water surface
Interaction with the water surface
Then we tried a couple different ideas
The first logical attept was to have a ripple:
### Ripple solver
There are so many ways to do ripple in Houdini. The ripple solver was obvious choice
<video src="/moana2/ripplesolver.v0001.webm" controls autoplay muted playsinline loop> </video>
It was sourced using the distance between surface so the body and apply a ramp on the height offset.
it works well but it's lacking some magical quality and the shape is  not very clean.
### Circle solver
![raindrop](https://images.pexels.com/photos/4396992/pexels-photo-4396992.jpeg)
Rain drops are more gentle
<video src="/moana2/circlesolver.v0001.webm" controls autoplay muted playsinline loop> </video>
<video src="/moana2/circlesolver.v0002.webm" controls autoplay muted playsinline loop> </video>
Another advantage of not using the circles we can have the outward velocity trailing the actual circle line, compare to ripple solver, which only push the geometry up and downwards.
With 

## Bioluminacent particles
This is referencing the original movie, when the grandma ray swim by,
As a fx artist, my first instinct was of course a splash, like I did for wade breaking out of the pipe in Elemental.
But the direction was different, it was a more somba moment so it has to be more magical effects.
In water sim, usually the most visible element is not the water itself, but the whitewater. The details are in the white water particles so I tried some of it
white wate solver scene
One problem it's the ripple solver doesn't have a velocity attribute output, since the water just rising up and down. We can 
Custom ripples with circles and get the velocity from the circles
![whale bubble feeding](https://upload.wikimedia.org/wikipedia/commons/3/3a/Humpback_whale_bubble_net_feeding_Christin_Khan_NOAA.jpg)

<video src="/moana2/biolumin.v0001.webm" controls autoplay muted playsinline loop> </video>

There was a solver called chain solver in the studio, I opened the hda and found out the way it was done.
It was using Principle Component Analysis add force to the particle so they form a stringly look like foam patten
1. center the patch 
2. create covariance matrix
3. calculate the eigan vector and value
The perpendicular vector of eigan vector is the direction to make it more string like
I haven't attempt to recreate it but I used the existing PCA nodes in houdini to outline the theory
https://www.sidefx.com/contentlibrary/pca-dejitter/

##Particle advection

## Light mask

![looking up from below](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/US_Navy_110607-N-XD935-191_Navy_Diver_2nd_Class_Ryan_Arnold%2C_assigned_to_Mobile_Diving_and_Salvage_Unit_2%2C_snorkels_on_the_surface_to_monitor_multi.jpg/1920px-US_Navy_110607-N-XD935-191_Navy_Diver_2nd_Class_Ryan_Arnold%2C_assigned_to_Mobile_Diving_and_Salvage_Unit_2%2C_snorkels_on_the_surface_to_monitor_multi.jpg)

The light
It started from whale glow and slowing turn into shadow, at the same time a slow sphere glow from the center. Then circliar light slowly grow to a human shape and a human shadow slowly appears.

Human shape light
caustic light 
radian light

https://en.wikipedia.org/wiki/Snell%27s_window

<video src="/moana2/refraction.v0001.webm" controls autoplay muted playsinline loop> </video>

<video src="/moana2/refraction.v0002.webm" controls autoplay muted playsinline loop> </video>


![water](https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg)

## Caustic


# Compositing

- fading out mask with the body and another level with body pattern






