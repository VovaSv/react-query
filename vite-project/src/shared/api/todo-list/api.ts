import { TodoDto, PaginatedResult } from "./dto/TodoDto";

const BASE_URL = "http://localhost:3000";

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
