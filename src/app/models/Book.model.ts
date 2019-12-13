export class Book {
  constructor(
      public id: string,
      public title: string,
      public description: string,
      public price: number,
      public author_id: number,
  ) {}
}
