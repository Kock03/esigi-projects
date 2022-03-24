import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class ResourceProvider {
    constructor(private apiGateway: ApiGateway) {}
  
    ngOnInit(): void {}
  
    findAll(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.apiGateway
          .get(environment.PROJECT_MS + 'resources')
          .subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
          }, reject);
      });
    }
  
    findOne(id: string): Promise<any> {
      return new Promise((resolve, reject) => {
        this.apiGateway
          .get(environment.PROJECT_MS + 'resources/:id', { id: id })
          .subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
          }, reject);
      });
    }
  
    update(resource: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.apiGateway
          .put(environment.PROJECT_MS + 'resources', resource)
          .subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
          }, reject);
      });
    }
  
    store(resource: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.apiGateway
          .post(environment.PROJECT_MS + 'resources', resource)
          .subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
          }, reject);
      });
    }
  
    destroy(resource: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.apiGateway
          .delete(environment.PROJECT_MS + 'resources', resource)
          .subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
          }, reject);
      });
    }
  }
  
