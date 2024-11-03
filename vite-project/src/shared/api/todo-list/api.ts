import { TodoDto } from "./dto/TodoDto";

const BASE_URL = "http://localhost:3000";

export const todoListApi = {
  getTodoList: ({ signal }: { signal: AbortSignal }) => {
    return fetch(`${BASE_URL}/todos`, {
      signal,
    }).then((res) => res.json() as Promise<TodoDto[]>);
  },
};
