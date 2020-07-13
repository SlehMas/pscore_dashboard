import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { InventoryService } from 'src/app/services/inventory.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  toDelete = -1;
  products: any[] = [];
  error: '';
  constructor(
    private notificationService: NotificationService,
    private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getProducts().subscribe(data => this.products = data.sort((a, b) => b.id_product - a.id_product));
  }

  showModal (selected) {
    this.toDelete = selected;
    document.getElementById('inventoryModal').style.display = 'block';
    document.getElementById('inventoryModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeModal () {
    this.toDelete = -1;
    document.getElementById('inventoryModal').style.display = 'none';
  }
  delete () {
    this.inventoryService.deleteProduct(this.toDelete).subscribe(res => {
      this.products = this.products.filter(a => a.id_product !== this.toDelete);
      this.notificationService.notify('Deleted successfully!');
      this.closeModal();
    }, err => {
      this.error = err;
    });
  }

}
