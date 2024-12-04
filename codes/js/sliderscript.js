

// Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBy1GnNAIpiTbF8bcE960GROx9JVyyn3Ro",
    authDomain: "testapp-6bd8a.firebaseapp.com",
    databaseURL: "https://testapp-6bd8a-default-rtdb.firebaseio.com",
    projectId: "testapp-6bd8a",
    storageBucket: "testapp-6bd8a.appspot.com",
    messagingSenderId: "1083835564982",
    appId: "1:1083835564982:web:7ef2ecfe620f7f81d43717",
    measurementId: "G-5Z2LQD7XW0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

let currentSlide = 0;
let images = [];

// Initialize the slider with images (this will be updated later with Firebase)
function loadSlider() {
    const sliderContainer = document.querySelector('.slider');
    
    // Create image elements for each image URL in the images array
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        sliderContainer.appendChild(img);
    });
    
    updateSlider();
}

// Show the current image based on the index
function updateSlider() {
    const slides = document.querySelectorAll('.slider img');
    slides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? 'block' : 'none';
    });
}

// Move the slider forward or backward
function moveSlide(direction) {
    const slides = document.querySelectorAll('.slider img');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
}

// Fetch images from Firebase Storage
function fetchImagesFromFirebase() {
    const storageRef = storage.ref('images/');
    
    storageRef.listAll().then((result) => {
        result.items.forEach((imageRef) => {
            imageRef.getDownloadURL().then((url) => {
                images.push(url);
                if (images.length === result.items.length) {
                    loadSlider();
                }
            });
        });
    }).catch((error) => {
        console.log("Error fetching images from Firebase:", error);
    });
}

// Call the function to fetch images on page load
fetchImagesFromFirebase();
