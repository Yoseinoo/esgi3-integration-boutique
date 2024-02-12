$(e => {
    const priceFormatter = new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'EUR'});

    $('#cart-button').on('click', openCart);
    $('#filter-button').on('click', fillPage);

    /**
     * Check for click events on the page, if click is not on the cart (or the cart button) then hide it
     */
    window.addEventListener('click', (event) => {
        let cart = $('#cart-div');
        let cartButton = $('#cart-button');
        if (!$(event.target).hasClass("delete-product") && $(event.target).closest(cart).length === 0 && event.target != cartButton[0]) {
            cart.hide();
        }
    });

    fillPage();

    //Carousel
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1, 
        arrows: false,
    });

    /**
     * Fill the page by creating the products and the filters
     */
    function fillPage() {
        //Empty page first
        $('#pokemon-products').html("");
        $('#onepiece-products').html("");
        $('#yugioh-products').html("");

        //Create empty arrays for categories, subcategories and extensions
        const categories = [];
        const subcategories = [];
        const extensions = [];

        //Get the current selected filters
        let selectedCategory = $('#category-select').val() === '' ? null : $('#category-select').val(); //replace empty string by null
        let selectedSubcategory = $('#subcategory-select').val() === '' ? null : $('#subcategory-select').val();
        let selectedExtension = $('#extension-select').val() === '' ? null : $('#extension-select').val();

        //Get products from json
        fetch('../../products.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const products = data;
            products.forEach(product => {
                //Check if product passes the filter, if not go to the next product without doing anything
                if (selectedCategory != null && product.category != selectedCategory) {
                    return;
                } 
                
                if (selectedSubcategory != null && product.subcategory != selectedSubcategory) {
                    return;
                }
                
                if (selectedExtension != null && product.extension != selectedExtension) {
                    return;
                }

                //Add extension, category or subcategory to arrays
                if (!categories.includes(product.category)) {
                    categories.push(product.category);
                }

                if (!subcategories.includes(product.subcategory)) {
                    subcategories.push(product.subcategory);
                }

                if (!extensions.includes(product.extension)) {
                    extensions.push(product.extension);
                }

                let container = null;
                //Find in which container product should go base on his brand
                if (product.brand == 'Pokemon') {
                    container = $('#pokemon-products');
                } else if (product.brand == "Onepiece") {
                    container = $('#onepiece-products');
                } else if (product.brand == "Yugioh") {
                    container = $('#yugioh-products');
                }

                //If a container is found, create the product card and add it to the container
                if (container != null) {
                    const productDiv = $('<div>');
                    productDiv.addClass('product-card');

                    const figure = $('<figure>');

                    const img = $('<img>');
                    img.addClass("img");
                    img.attr('src', product.images[0]);
                    figure.append(img);

                    const img2 = $('<img>');
                    img2.addClass("img2");
                    img2.attr('src', product.images[1]);
                    figure.append(img2);
                    
                    productDiv.append(figure);

                    const title = $('<h4>');
                    title.addClass('title');
                    title.html(product.title);
                    productDiv.append(title);

                    const priceP = $('<p>');
                    priceP.addClass("price");
                    if (product.discount > 0) {
                        let discountPrice = product.price - product.discount;
                        priceP.html(priceFormatter.format(discountPrice) + "<span class='discount'>" + priceFormatter.format(product.price) + "</span>");
                    } else {
                    priceP.html(product.price + "€"); 
                    }
                    productDiv.append(priceP);

                    const buttonSee = $('<button>');
                    buttonSee.html("Voir le produit");
                    productDiv.append(buttonSee);

                    const buttonAddToCart = $('<button>');
                    buttonAddToCart.html("Ajouter au panier");
                    buttonAddToCart.on('click', function(event) {
                        addToCart(product.id);
                    });
                    productDiv.append(buttonAddToCart);

                    container.append(productDiv);
                }
            });
            
            //Add options to filters selects
            if ($('#category-select').find("option").length === 0) {
                //Add a null option
                $('#category-select').append($('<option>', {
                    value: '',
                    text: "Toutes les catégories"
                }));
                //Add options found
                categories.forEach(element => {
                    $('#category-select').append($('<option>', {
                        value: element,
                        text: element
                    }));
                });
            }

            if ($('#subcategory-select').find("option").length === 0) {
                //Add a null option
                $('#subcategory-select').append($('<option>', {
                    value: '',
                    text: "Toutes les sous-catégories"
                }));
                subcategories.forEach(element => {
                    $('#subcategory-select').append($('<option>', {
                        value: element,
                        text: element
                    }));
                });
            }

            if ($('#extension-select').find("option").length === 0) {
                //Add a null option
                $('#extension-select').append($('<option>', {
                    value: '',
                    text: "Toutes les extensions"
                }));
                extensions.forEach(element => {
                    $('#extension-select').append($('<option>', {
                        value: element,
                        text: element
                    }));
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }

    function getIdsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    function setIdsToLocalStorage(ids) {
        localStorage.setItem("cart", JSON.stringify(ids));
    }

    /**
     * Add the product with the provided id to the cart
     */
    function addToCart(id) {
        console.log("ajouter au panier", id);
        let ids = getIdsFromLocalStorage();
        //If no list of ids create one
        if (ids == null) {
            ids = [];
        }
        //If id is already is cart do nothing
        if (!ids.includes(id)) {
            ids.push(id);
            alert('Produit ajouté au panier');
        } else {
            alert('Produit déjà dans le panier')
        }

        setIdsToLocalStorage(ids);
    }

    /**
     * Remove the provided div from the cart
     */
    function removeFromCart(id) {
        let ids = getIdsFromLocalStorage();
        const index = ids.indexOf(id);
        ids.splice(index, 1);
        setIdsToLocalStorage(ids);
        openCart();
        alert('Produit supprimé du panier');
    }

    /**
     * Open the cart popup
     * Get ids of products in cart from local storage and create the cart on the spot
     * Not the most efficient but it works
     */
    function openCart() {
        //Clear the current cart
        $('#cart-div').html("");

        let ids = getIdsFromLocalStorage();
        //If cart is empty print the empty message
        if (ids == null || ids.length == 0) {
            $('#cart-div').html("<span id='empty-text'>Votre panier est vide</span>");
            $('#cart-div').show();
            return;
        }

        //Get the products from json
        fetch('../../products.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const products = data;
            products.forEach(product => {
                //If the product is the one added, add it to the new div
                if (ids.includes(product.id)) {
                    //Create the new div
                    const div = $('<div>');
                    div.addClass("product");

                    const img = $('<img>');
                    img.attr('src', product.images[0]);
                    div.append(img);

                    const title = $('<h4>');
                    title.addClass('title');
                    title.html(product.title);
                    div.append(title);

                    const priceP = $('<p>');
                    priceP.addClass("price");
                    if (product.discount > 0) {
                        let discountPrice = product.price - product.discount;
                        priceP.html(priceFormatter.format(discountPrice) + "<span class='discount'>" + priceFormatter.format(product.price) + "</span>");
                    } else {
                    priceP.html(product.price + "€"); 
                    }
                    div.append(priceP);

                    const buttonRemove = $('<button>');
                    buttonRemove.html("Supprimer");
                    buttonRemove.addClass("delete-product");
                    buttonRemove.on('click', function(event) {
                        removeFromCart(product.id);
                    });
                    div.append(buttonRemove);

                    //Add the created div to the cart
                    $('#cart-div').append(div);
                }
            });
        })
        .catch((err) => {
            console.error(err);
        });

        $('#cart-div').show();
    }
});