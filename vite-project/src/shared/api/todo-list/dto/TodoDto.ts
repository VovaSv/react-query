//Widley use when we wnat mentione that Dto data type that came from Server.
export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  first: number;
  itmes: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};
