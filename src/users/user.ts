// Exportiert User sowohl als Typ als auch als Klasse
export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string
  ) {}
}
