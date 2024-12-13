export type TValidationRules = Record<
  string,
  {
    test: (value: string) => boolean
    message: string
  }
>
