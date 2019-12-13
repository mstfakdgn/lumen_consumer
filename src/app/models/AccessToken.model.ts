export class AccessToken {
  constructor(
      public grant_type: string,
      public client_secret: string,
      public client_id: number,
      public scope: string,
  ) {}
}
