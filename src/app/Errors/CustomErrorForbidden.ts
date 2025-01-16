export class CustomErrorForbidden extends Error {
  public status: number;
  public statusText: string;
  public data: { message: string };

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.statusText = "Error Forbidden";
    this.data = { message: `${message}` };
  }
}
