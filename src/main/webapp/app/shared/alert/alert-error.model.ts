export class AlertError {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  constructor(public message: string, public key?: string, public params?: { [key: string]: unknown }) {}
}
