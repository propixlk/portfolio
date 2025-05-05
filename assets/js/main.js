/**
* Template Name: OnePage
* Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  // --- Rotating Typewriter Function ---
  /**
   * Rotating Typewriter effect for hero subtitle
   */
  function initRotatingTypewriter() {
    const typedOutputElement = document.getElementById('typed-output');
    if (!typedOutputElement) return; // Exit if the element doesn't exist

    const phrasesToType = [
      "Social Media Posts",
      "Tute Cover Pages",
      "Book Marks",
      "Product Labels",
      "Thumbnails",
      "Flex & Banners",
      "Flyers & Brochures",
      "Posters",
      "Invitations",
      "Business Cards",
      "Logos"
      // ඔබට අවශ්‍ය තවත් Design නාමයන් මෙහි Add කරන්න
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; // අකුරු Type වන වේගය (මිලි තත්පර)
    const deletingSpeed = 50; // අකුරු Erase වන වේගය (මිලි තත්පර)
    const delayBeforeDeleting = 1500; // Type කර අවසන් වී Erase කිරීමට පෙර ඇති ප්‍රමාදය (මිලි තත්පර)
    const delayBeforeTyping = 500; // Erase කර අවසන් වී ඊළඟ එක Type කිරීමට පෙර ඇති ප්‍රමාදය (මිලි තත්පර)

    // Typewriter Cursor එක සඳහා Span එකක් සාදා Heading එකට එකතු කිරීම
    const cursorElement = document.createElement('span');
    cursorElement.classList.add('typed-cursor');
    cursorElement.textContent = '|'; // Cursor අකුර
    typedOutputElement.parentNode.appendChild(cursorElement); // typed-output span එකට පසුව cursor එක එකතු කිරීම


    function type() {
      if (charIndex < phrasesToType[phraseIndex].length) {
        typedOutputElement.textContent += phrasesToType[phraseIndex].charAt(charIndex);
        charIndex++;
        // Cursor එක typed text එකට පසුවම තිබෙන බව තහවුරු කිරීම
        if (typedOutputElement.nextSibling !== cursorElement) {
             typedOutputElement.parentNode.appendChild(cursorElement);
        }
        setTimeout(type, typingSpeed);
      } else {
        // Type කර අවසන් වූ පසු, Cursor එක පෙන්වා Erase කිරීමට පෙර රැඳී සිටීම
        cursorElement.style.visibility = 'visible'; // Cursor එක පෙන්වීම
        setTimeout(erase, delayBeforeDeleting);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedOutputElement.textContent = phrasesToType[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
         // Cursor එක typed text එකට පසුවම තිබෙන බව තහවුරු කිරීම
        if (typedOutputElement.nextSibling !== cursorElement) {
             typedOutputElement.parentNode.appendChild(cursorElement);
        }
        setTimeout(erase, deletingSpeed);
      } else {
        // Erase කර අවසන් වූ පසු, Cursor එක තාවකාලිකව සඟවා ඊළඟ Design නාමය වෙත යාම
        cursorElement.style.visibility = 'hidden'; // Cursor එක සැඟවීම
        phraseIndex++;
        if (phraseIndex >= phrasesToType.length) {
          phraseIndex = 0; // අන්තිම නමෙන් පසු නැවත මුලට යාම
        }
        // ඊළඟ එක Type කිරීමට පෙර typed text එක සම්පූර්ණයෙන්ම හිස් කිරීම
        typedOutputElement.textContent = '';
        charIndex = 0; // Character index එක නැවත 0 කිරීම

        // ඊළඟ Design නාමය Type කිරීම ආරම්භ කිරීම ප්‍රමාදයකින් පසුව
        setTimeout(() => {
             cursorElement.style.visibility = 'visible'; // Type කිරීමට පෙර Cursor එක පෙන්වීම
             type();
        }, delayBeforeTyping);
      }
    }

    // Typewriter Animation Loop එක ආරම්භ කිරීම
    type(); // පළමු Design නාමය Type කිරීමෙන් ආරම්භ කිරීම
  }
  // --- End Rotating Typewriter Function ---


  /**
   * Combined window load listener
   */
  window.addEventListener('load', () => {
    toggleScrolled();
    if (preloader) {
        preloader.remove();
    }
    toggleScrollTop();
    aosInit();
    // Assuming PureCounter is always needed and its constructor is available globally
    if (typeof PureCounter !== 'undefined') {
        new PureCounter();
    }
    initSwiper();
    navmenuScrollspy();
    initRotatingTypewriter(); // නව Typewriter Function එක Call කිරීම
  });

  /**
   * Ad Banner Image Rotation (for the section below header)
   */
  const adBannerImage = document.getElementById('ad-banner-image');
  const adBannerLink = document.getElementById('ad-banner-link'); // Get the link element

  if (adBannerImage) { // Check if the ad banner image element exists

    // List of ad images and their corresponding links
    const ads = [
      { src: 'assets/img/ads/x.png', link: 'https://www.your-ad-link-1.com' },
      { src: 'assets/img/ads/x2.png', link: 'https://www.google.com' },
      
      // ඔබට අවශ්‍ය තවත් ad images සහ links මෙහි එකතු කරන්න
      // Format: { src: 'path/to/your/image.jpg', link: 'https://link.for.this.ad.com' }
    ];

    let currentAdIndex = 0;
    const intervalTime = 5000; // Change image every 5 seconds (5000 milliseconds)

    // Function to change the ad image and link
    function changeAd() {
      currentAdIndex++;
      if (currentAdIndex >= ads.length) {
        currentAdIndex = 0; // Go back to the first ad if at the end of the list
      }

      // Update the image source
      adBannerImage.src = ads[currentAdIndex].src;

      // Update the link if the link element exists
      if (adBannerLink) {
        adBannerLink.href = ads[currentAdIndex].link;
      }
    }

    // Start the ad rotation after an initial delay equal to the interval time
    // This ensures the first image is shown for the full interval before changing
    setTimeout(() => {
       setInterval(changeAd, intervalTime);
    }, intervalTime);

    // Set the initial link when the page loads if there are ads
     if (adBannerLink && ads.length > 0) {
        adBannerLink.href = ads[currentAdIndex].link;
     }
  }


})();