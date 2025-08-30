export type pessoaModel = {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  vivo: boolean;
  urlFoto: string;
  ultimaOcorrencia: {
    dtDesaparecimento: string;
    dataLocalizacao: string | null;
    encontradoVivo: boolean;
    localDesaparecimentoConcat: string;
    ocorrenciaEntrevDesapDTO: {
      informacao: string;
      vestimentasDesaparecido: string;
    };
    listaCartaz: {
      urlCartaz: string;
      tipoCartaz: string;
    }[];
    ocoId: number;
  };
};

export type pessoasPaginatedSearch = {
  content: pessoaModel[];
  totalElements: number;
  totalPages: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  empty: boolean;
};
