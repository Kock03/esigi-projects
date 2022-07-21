import { FormGroup } from '@angular/forms';


export function MustMatch(minValue: string, maxValue: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[minValue];
        const matchingControl = formGroup.controls[maxValue];

        if (!control || !matchingControl)  {
            return;
        }

        let value = Number(control.value);
        let Matchvalue = Number(matchingControl.value);
        if (value > Matchvalue) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}