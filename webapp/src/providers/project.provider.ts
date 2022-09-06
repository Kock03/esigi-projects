import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/services/api-gateway';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root',
})
export class ProjectProvider {
  constructor(private apiGateway: ApiGateway) { }

  ngOnInit(): void { }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.PROJECT_MS + 'projects')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.PROJECT_MS + 'projects/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  find(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.PROJECT_MS + 'projects/find', body)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(id: string | null, project: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.PROJECT_MS + 'projects/:id', { id: id }, project)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(project: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.PROJECT_MS + 'projects', project)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(projectId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.PROJECT_MS + 'projects/' + projectId)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
