import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export function CompareDates(dateProject: string, dateActivity: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[dateProject];
    const matchingControl = formGroup.controls[dateActivity];

    if (!control || !matchingControl) {
      return;
    }

    let value = control.value;
    let Matchvalue = matchingControl.value.split('/').reverse().join('/');
    if (value < Matchvalue) {
      matchingControl.setErrors({ compareDates: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}


export function CompareStartDate(dateProject: string, dateActivity: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[dateProject];
    const matchingControl = formGroup.controls[dateActivity];

    if (!control || !matchingControl) {
      return;
    }

    let value = control.value;
    let Matchvalue = matchingControl.value.split('/').reverse().join('/');
    if (value > Matchvalue) {
      matchingControl.setErrors({ validateDate: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function isDateGreaterThanToday(dateActivity: string) {
  return (formGroup: FormGroup): Validators => {
    const control = formGroup.controls[dateActivity];
    var data = control.value;
    var dia = data.substr(0, 2);
    var mes = data.substr(3, 2);
    var ano = data.substr(6, 4);

    var today = new Date().toLocaleDateString();
    var diaAtual = today.substr(0, 2);
    var mesAtual = today.substr(3, 2);
    var anoAtual = today.substr(6, 4);

    if (dia === diaAtual && mes <= mesAtual && ano < anoAtual)
        return { dataNotValid: true };
    if (dia < diaAtual && mes === mesAtual && ano === anoAtual)
        return { dataNotValid: true };
    if (mes < mesAtual && ano === anoAtual) return { dataNotValid: true };
    if (ano < anoAtual) return { dataNotValid: true };

    return true;
  };
}

export function isValidData(dateActivity: string){
    return (formGroup: FormGroup): Validators => {
    const control = formGroup.controls[dateActivity];
        var data = control.value;
        if (data.length != 10) return { dataNotValid: true };
        if (
            data == '00/00/0000' ||
            data == '11/11/1111' ||
            data == '22/22/2222' ||
            data == '33/33/3333' ||
            data == '44/44/4444' ||
            data == '55/55/5555' ||
            data == '66/66/6666' ||
            data == '77/77/7777' ||
            data == '88/88/8888' ||
            data == '99/99/9999'
        ) {
            return { dataNotValid: true };
        }
        var dia = data.substr(0, 2);
        var barra1 = data.substr(2, 1);
        var mes = data.substr(3, 2);
        var barra2 = data.substr(5, 1);
        var ano = data.substr(6, 4);
        if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return { dataNotValid: true };
        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return { dataNotValid: true };
        if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return { dataNotValid: true };
        if (ano < 1900) return { dataNotValid: true };
        return true;
    }
}

