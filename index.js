document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = document.querySelectorAll("img.lazy-load");

    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.getAttribute("data-src");
                    lazyImage.removeAttribute("data-src");
                    lazyImage.classList.remove("lazy-load");
                    lazyImageObserver.unobserve(lazyImage);

                    lazyImage.onload = function() {
                        lazyImage.classList.add("loaded");
                    };
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {

        lazyImages.forEach(function(lazyImage) {
            lazyImage.src = lazyImage.getAttribute("data-src");
            lazyImage.removeAttribute("data-src");
            lazyImage.classList.add("loaded");
        });
    }
});
