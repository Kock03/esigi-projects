import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiGateway } from 'src/services/api-gateway';

@Injectable({
  providedIn: 'root',
})
export class CustomerProvider {
  constructor(private apiGateway: ApiGateway) { }

  ngOnInit(): void { }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.CUSTOMER_MS + 'customers')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findInactive(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.CUSTOMER_MS + 'customers/list/inactive')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findActive(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.CUSTOMER_MS + 'customers/list/active')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByName(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.post(environment.CUSTOMER_MS + 'customers/find', data)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  shortListCustomers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.CUSTOMER_MS + 'customers/short/list/customers')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  // shortListContacts(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.apiGateway
  //       .get(environment.CUSTOMER_MS + 'contacts/short/list/contacts')
  //       .subscribe((response: HttpResponse<any>) => {
  //         resolve(response.body);
  //       }, reject);
  //   });
  // }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.CUSTOMER_MS + 'customers/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(id: string | null, customer: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(
          environment.CUSTOMER_MS + 'customers/:id',
          { id: id },
          customer
        )
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(customer: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.CUSTOMER_MS + 'customers', customer)

        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(customerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.CUSTOMER_MS + 'customers/' + customerId)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
