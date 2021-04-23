import { AbstractControl, ValidatorFn } from "@angular/forms"

export function numberValidator(): ValidatorFn {
    return (
      control: AbstractControl
    ): { [key: string]: boolean } | null => {
      let accountRgEx: RegExp = /^[АВЕКМНОРСТУХ]{2}\d{4}(?<!000)[АВЕКМНОРСТУХ]{2}$/
      let valid =
        !control.value || accountRgEx.test(control.value)
      return valid ? null : { account: true }
    }
  }