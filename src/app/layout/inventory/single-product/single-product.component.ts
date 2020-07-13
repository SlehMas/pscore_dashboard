import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { NotificationService } from '../../../services/notification.service';
import { InventoryService } from '../../../services/inventory.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  product: any;
  productForm: FormGroup;
  id: any;
  fileData: File = null;
  isSubmitted: Boolean = false;
  previewUrl: any;
  error: any;
  currentUser = this.authenticationSerivce.currentUserValue;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private authenticationSerivce: AuthenticationService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    if (this.id) {
      this.inventoryService.getProduct(this.id).subscribe(data => {
        this.product = data;
        // format image
        if (this.product.image_product) {
          this.product.image_product = environment.imgUrl + this.product.image_product;
          console.log(this.product.image_product);
        }
        this.productForm = new FormGroup({
          title: new FormControl(this.product.title_product || ''),
          price: new FormControl(this.product.price_product || 0),
          description: new FormControl(this.product.description_product || ''),
          image: new FormControl(''),
          inventory: new FormControl(this.product.inventory_product),
          category: new FormControl(this.product.category_product || '')
        });
      });
    } else {
      this.productForm = new FormGroup({
        title: new FormControl(''),
        image: new FormControl(''),
        price: new FormControl(0),
        description: new FormControl(''),
        inventory: new FormControl(0),
        category: new FormControl('')
      });
    }
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  submit() {
    const formData = new FormData();
    formData.append('image', this.fileData);
    const now = new Date().toLocaleDateString();
    console.log(now);
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      this.isSubmitted = false;
      return;
    }

    // update
    if (this.id) {
      this.inventoryService.updateProduct({
        id_product: this.id,
        title_product: this.f.title.value,
        price_product: this.f.price.value,
        description_product: this.f.description.value,
        inventory_product: this.f.inventory.value,
        category_product: this.f.category.value,
      }).subscribe(res => {
        if (this.fileData) {
          formData.append('id', this.id);
          // try image upload
          this.inventoryService.saveImage(formData).subscribe(imgRes => {
            this.notificationService.notify('Added successfully!');
            console.log(imgRes);
            this.router.navigateByUrl('/inventory');
            this.isSubmitted = false;
          });
        } else {
          this.notificationService.notify('Added successfully!');
          this.router.navigateByUrl('/inventory');
          this.isSubmitted = false;
        }
      }, err => {
        this.error = err;
        this.notificationService.notify('An error occured while trying to update, please try again later');
        this.isSubmitted = false;
      });
      return;
    }

    // new product
    this.inventoryService.saveProduct({
      title_product: this.f.title.value,
      price_product: this.f.price.value,
      description_product: this.f.description.value,
      category_product: this.f.category.value,
      inventory_product: this.f.inventory.value
    }).subscribe(res => {
      if (this.fileData) {
        console.log('Add sucesful', res);
        formData.append('id', res.insertId);
        // try image upload
        this.inventoryService.saveImage(formData).subscribe(imgRes => {
          this.notificationService.notify('Added successfully!');
          console.log(imgRes);
          this.router.navigateByUrl('/inventory');
          this.isSubmitted = false;
        });
      } else {
        this.notificationService.notify('Added successfully!');
        this.router.navigateByUrl('/inventory');
        this.isSubmitted = false;
      }
    }, err => {
      this.error = err;
      this.notificationService.notify('An error occured while trying to save, please try again later');
      this.isSubmitted = false;
    });
  }

  ngOnInit(): void {

  }

  get f() {
    return this.productForm.controls;
  }

}
