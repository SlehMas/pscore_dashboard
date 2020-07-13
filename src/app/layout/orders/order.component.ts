import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  toUpdate = -1;
  status = '';
  orders: any[] = [];
  error: '';
  constructor(private orderService: OrderService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => this.orders = data.sort((a, b) => b.id_order - a.id_order));
  }

  showModal (selected, status) {
    this.toUpdate = selected;
    this.status = status;
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('orderModal').style.backgroundColor = 'rgba(0,0,0,0.56)';
  }
  closeModal () {
    this.toUpdate = -1;
    this.status = '';
    document.getElementById('orderModal').style.display = 'none';
  }

  update () {
    // find the updated item
    const foundIndex = this.orders.findIndex(o => o.id_order === this.toUpdate);
    this.orderService.changeOrderStatus(this.toUpdate, this.status).subscribe(res => {
      this.orders[foundIndex].status_order = this.status;
      this.notificationService.notify('Order status changed!');
      this.closeModal();
    }, err => {
      this.notificationService.notify('Unable to change order status, please try again later!');
      this.closeModal();
    });
  }

}
