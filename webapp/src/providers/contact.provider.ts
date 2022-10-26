
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ApiGateway } from 'src/services/api-gateway';

@Injectable({
    providedIn: 'root',
})
export class ContactProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    findByCustomer(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.CUSTOMER_MS + 'contacts/customer/:id', { id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.CUSTOMER_MS + 'contacts        ')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findInactive(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.CUSTOMER_MS + 'contacts/list/inactive')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findActive(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.CUSTOMER_MS + 'contacts/list/active')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findByName(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post(environment.CUSTOMER_MS + 'contacts/find', data)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    shortListCustomers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.CUSTOMER_MS + 'contacts/short/list/customers')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findOne(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.CUSTOMER_MS + 'contacts/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, customer: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put(
                    environment.CUSTOMER_MS + 'contacts/:id',
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
                .post(environment.CUSTOMER_MS + 'contacts', customer)

                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    destroy(customerId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .delete(environment.CUSTOMER_MS + 'contacts/' + customerId)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }
}
