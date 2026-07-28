    /*
    Name: Megan McMullin
    File: main.js
    Date: July 28, 2026
    INFT 1206: Lab 4 Part 2: Image Gallary
    */
const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// Create a data object 

const images = [
  {filename:"pic1.jpg", alt: "Closeup of a human eye"},
  {filename:"pic2.jpg", alt: "Rock that looks like a wave"},
  {filename:"pic3.jpg", alt: "Purple and white pansies"},
  {filename:"pic4.jpg", alt: "Section of wall from a pharaoh's tomb"},
  {filename:"pic5.jpg", alt: "Large moth on a leaf"}
];

// Add the images to the thumbnail bar

// baseURl constant containing the images
const baseURL = "./images/";
