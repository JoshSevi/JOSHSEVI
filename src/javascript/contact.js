// Your own Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCD6DhbCD6rT5ABq6C0hzyIT9wPW-H84rY",
    authDomain: "josh-sevi.firebaseapp.com",
    databaseURL: "https://josh-sevi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "josh-sevi",
    storageBucket: "josh-sevi.appspot.com",
    messagingSenderId: "565656552983",
    appId: "1:565656552983:web:25d4a6e5b75a9828d6fe52",
    measurementId: "G-8NPSWC4480"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    const menuToggle = document.getElementById('menuToggle');
    const checkbox = menuToggle.querySelector('input[type="checkbox"]');
    const spans = menuToggle.querySelectorAll('span');
    const sections = {
        'main-screen': document.getElementById('main-screen'),
        'about': document.getElementById('about'),
        'project': document.getElementById('project'),
        'contact': document.getElementById('contact')
    };
    const menu = document.getElementById('menu');
    const links = document.querySelectorAll('#menu-nav a, #menu-social a');

    function setMenuColors(isChecked, inMainScreen) {
        const menuColor = inMainScreen ? "var(--white)" : "var(--black)";
        const linkColor = inMainScreen ? "var(--black)" : "var(--white)";
        const spanColor = inMainScreen ? (isChecked ? "var(--black)" : "var(--white)") : (isChecked ? "var(--white)" : "var(--black)");
        const boxShadowColor = inMainScreen ? (isChecked ? "var(--black)" : "var(--white)") : (isChecked ? "var(--white)" : "var(--black)");

        spans.forEach(span => {
            span.style.backgroundColor = spanColor;
            span.style.boxShadow = `0px 2px 8px ${boxShadowColor}`;
        });

        menu.style.backgroundColor = menuColor;

        links.forEach(link => {
            link.style.color = linkColor;
        });
    }

    function handleMenuColors() {
        const mainScreenTop = sections['main-screen'].getBoundingClientRect().top;
        const aboutTop = sections['about'].getBoundingClientRect().top;
        const projectTop = sections['project'].getBoundingClientRect().top;
        const contactTop = sections['contact'].getBoundingClientRect().top;

        if (mainScreenTop <= 0 && aboutTop > 0) {
            setMenuColors(checkbox.checked, false);
        } else if (aboutTop <= 0 && projectTop > 0) {
            setMenuColors(checkbox.checked, true);
        } else if (projectTop <= 0 && contactTop > 0) {
            setMenuColors(checkbox.checked, true);
        } else if (contactTop <= 0) {
            setMenuColors(checkbox.checked, true);
        }
    }

    function handleCheckboxChange() {
        handleMenuColors();
    }

    function handleScroll() {
        handleMenuColors();
    }

    Object.values(sections).forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            onEnter: handleScroll,
            onLeaveBack: handleScroll
        });
    });

    menuToggle.addEventListener('change', handleCheckboxChange);

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('splashscreen').style.display = 'none';
            document.getElementById('menuToggle').style.visibility = 'visible';
            handleMenuColors();
            window.scrollTo(0, 0);
        }, 500);
    });


// Get the modal
    var modal = document.getElementById('contactFormModal');

// Get the button that opens the modal
    var btn = document.getElementById('contactMeButton');

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

// Implement form submission logic here
    document.getElementById('contactForm').onsubmit = function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Check if the form fields are not empty
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all the fields.');
            return; // Stop form submission
        }

        // Disable form submission button while processing
        document.querySelector('#contactForm button[type="submit"]').disabled = true;

        // Add a new document with a generated id.
        db.collection("contacts").add({
            name: name,
            email: email,
            message: message
        })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                // You can add your success message or redirect to another page here
                alert('Your message has been sent.');
                // Clear the form fields
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                // Close the modal after successful submission
                closeModal();
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                // Handle errors here
                alert('An error occurred while sending your message. Please try again later.');
            })
            .finally(function() {
                // Enable form submission button after processing
                document.querySelector('#contactForm button[type="submit"]').disabled = false;
            });
    }

// Function to close the modal
    function closeModal() {
        var modal = document.getElementById('contactFormModal');
        modal.style.display = "none";
    }


});

