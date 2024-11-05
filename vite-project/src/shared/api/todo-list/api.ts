import { TodoDto, PaginatedResult } from "./dto/TodoDto";

const BASE_URL = import.meta.env.VITE_API_URL;
console.log(import.meta);

export const todoListApi = {
  getTodoList: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal }
  ) => {
    return fetch(`${BASE_URL}/todos?_page=${page}`, {
      signal,
    }).then((res) => res.json() as Promise<PaginatedResult<TodoDto>>);
  },
};
