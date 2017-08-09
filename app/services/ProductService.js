/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('ProductService', function ($http) {
    this.getProducts = function () {
        return products;
    };

    this.insertProduct= function (Name, Description, Cost, IsKosher, IsVegetarian, IsVegan) {
        var topID = products.length + 1;
        products.push({
            id: topID,
            Name: Name,
            Description: Description,
            Cost: Cost,
            IsKosher: IsKosher,
            IsVegetarian: IsVegetarian,
            IsVegen: IsVegan
        });
    };

    this.deleteProduct = function (id) {
        for (var i = products.length - 1; i >= 0; i--) {
            if (products[i].id === id) {
                products.splice(i, 1);
                break;
            }
        }
    };

    this.getProduct = function (id) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return null;
    };

    this.editProduct = function (Product) {
        for (var i = products.length - 1; i >= 0; i--) {
            if (products[i].id === Product.id) {
                products[i] = Product;
            }
        }
    }

    this.getDollarRate = function () {

    }

    var products = [
        {
            id: 1, Name: 'The First', Description: 'פיצה מאוד מאוד טעימה', Cost: 23, IsKosher: true,
            IsVegetarian: true, IsVegan: false
        },
        {
            id: 2, Name: 'The Second', Description: 'חרא של סוסים', Cost: 123, IsKosher: true,
            IsVegetarian: true, IsVegan: true
        },
        {
            id: 3, Name: 'The Third', Description: 'פיצה מאוד מאוד לא טעימה', Cost: 44, IsKosher: false,
            IsVegetarian: false, IsVegan: false
        }
    ];

});