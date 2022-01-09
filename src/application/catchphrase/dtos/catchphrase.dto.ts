class CatchphraseDTO {
  private constructor(
    public readonly id: string,
    public readonly movieName: string,
    public readonly catchphrase: string,
    public readonly movieContext: string,
  ) {}

  static build = ({
    id,
    movieName,
    catchphrase,
    movieContext,
  }: CatchphraseDTO): CatchphraseDTO => {
    return new CatchphraseDTO(id, movieName, catchphrase, movieContext);
  };
}

export { CatchphraseDTO };
