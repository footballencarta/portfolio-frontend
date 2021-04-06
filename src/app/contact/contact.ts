export class Contact {
  constructor(
      public name: string,
      public from: string,
      public subject: string,
      public message: string,
      public recaptcha: string
  ) { }

  static populate(formData: any) {
    return new this(
      formData.name,
      formData.from,
      formData.subject,
      formData.message,
      formData.recaptcha
    );
  }
}
