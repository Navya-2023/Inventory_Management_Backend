export class ProductValidationMessages {
    static readonly productTitleNotEmpty = 'Product title cannot be empty.';
    static readonly productDescriptionNotEmpty = 'Product description cannot be empty.';
    static readonly productQuantityNotEmpty = 'Please enter the quantity of the product.';
    static readonly productQuantityIsInt = 'Enter a valid value for quantity.';
    static readonly productQuantityMin = 'Quantity must be greater than or equal to 1.';
    static readonly productPriceNotEmpty = 'Please enter the price of the product.';
    static readonly productPriceIsInt = 'Enter a valid value for price.';
    static readonly productPriceMin = 'Price must be greater than or equal to 0.';
}
