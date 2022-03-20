import { Component } from "@angular/core";

@Component({
    selector: 'projects-resources-dialog',
    templateUrl: 'projects-resources-dialog.html',
  })

export class ProjectResourceDialog{

  constructor(){}

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
} 