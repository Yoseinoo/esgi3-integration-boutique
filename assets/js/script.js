$(e => {
    fetch('../../products.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const products = data;
        products.forEach(product => {
            let container = null;
            if (product.brand == 'Pokemon') {
                container = $('#pokemon-products');
            } else if (product.brand == "Onepiece") {
                container = $('#onepiece-products');
            } else if (product.brand == "Yugioh") {
                container = $('#yugioh-products');
            }

            if (container != null) {
                const productDiv = $('<div>');
                productDiv.addClass('product-card');

                const img = $('<img>');
                img.attr('src', product.images[0]);
                productDiv.append(img);

                const title = $('<h4>');
                title.html(product.title);
                productDiv.append(title);

                const price = $('<p>');
                price.html(product.price + "€");
                productDiv.append(price);

                container.append(productDiv);
            }
        });     
    })
    .catch((err) => {
        console.error(err);
    });

    //Carousel
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1, 
        arrows: false,
    });
});