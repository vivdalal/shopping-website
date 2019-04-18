import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {

  @ViewChild('formElement') formElement: ElementRef;

  private formGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    description: new FormControl('', []),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jp(e?)g|gif|png|bmp)/g)
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/-?\d+(?:\.\d+)?\b/)
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ])
  });

  @Output() createProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Clears the form
   */
  clearForm() {
    this.formGroup.reset();
    (this.formElement.nativeElement as HTMLFormElement).reset();
  }

  /**
   * Emits an event to add the product
   */
  addProduct() {
    if (this.formGroup.invalid) {
      return;
    }
    const product: Product = {
      name: this.name.value,
      description: this.description.value,
      imageUrl: this.url.value,
      category: this.category.value,
      price: Number.parseFloat(this.price.value),
      quantity: Number.parseInt(this.quantity.value, 10)
    };
    this.createProduct.emit(product);
  }

  get name() { return this.formGroup.get('name'); }
  get description() { return this.formGroup.get('description'); }
  get url() { return this.formGroup.get('url'); }
  get category() { return this.formGroup.get('category'); }
  get price() { return this.formGroup.get('price'); }
  get quantity() { return this.formGroup.get('quantity'); }
}
