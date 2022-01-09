interface ICatchphraseDeleterService {
  delete: (id: string) => Promise<void>;
}

export { ICatchphraseDeleterService };
