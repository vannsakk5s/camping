/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });



    const campsiteCards = document.querySelectorAll('.campsite-card');
    
    // Modal Logic
    const modal = document.getElementById('campsiteModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');
    const closeModal = document.querySelector('.close-modal');

    if (modal && campsiteCards.length > 0) {
        campsiteCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Ignore if clicked on the map link
                if (e.target.closest('.nav-action-btn')) return;

                const imgSrc = card.querySelector('img').src;
                const titleHtml = card.querySelector('h4').innerHTML;
                const description = card.querySelector('p').textContent;
                const mapLink = card.querySelector('.nav-action-btn').href;
                const galleryData = card.getAttribute('data-gallery');
                const thumbnailsContainer = document.getElementById('modalThumbnails');

                modalTitle.innerHTML = titleHtml;
                modalDescription.textContent = description;
                modalLink.href = mapLink;
                
                // Handle Gallery
                if (thumbnailsContainer) {
                    thumbnailsContainer.innerHTML = ''; // clear previous
                    if (galleryData) {
                        const images = galleryData.split(',');
                        if (images.length > 0) {
                            modalImage.src = images[0]; // first image is main
                            
                            images.forEach((img, index) => {
                                const thumb = document.createElement('img');
                                thumb.src = img;
                                thumb.classList.add('modal-thumbnail');
                                if (index === 0) thumb.classList.add('active');
                                
                                thumb.addEventListener('click', () => {
                                    modalImage.src = img;
                                    thumbnailsContainer.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
                                    thumb.classList.add('active');
                                });
                                
                                thumbnailsContainer.appendChild(thumb);
                            });
                            thumbnailsContainer.style.display = images.length > 1 ? 'flex' : 'none';
                        }
                    } else {
                        modalImage.src = imgSrc;
                        thumbnailsContainer.style.display = 'none';
                    }
                } else {
                    modalImage.src = imgSrc;
                }

                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close modal
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
