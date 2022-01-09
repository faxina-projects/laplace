class CreateCatchphraseDTO {
  constructor(
    public readonly movieName: string,
    public readonly catchphrase: string,
    public readonly movieContext: string,
  ) {}
}

export { CreateCatchphraseDTO };
