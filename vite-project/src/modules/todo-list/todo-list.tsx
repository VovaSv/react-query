import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "../../shared/api/todo-list/api";

/*
export const getTodos = async () => {
  return new Promise<Todo[]>((resole) => {
    setTimeout(() => {
      resole([
        { id: "1", text: "todo1", done: true },
        { id: "2", text: "todo2", done: false },
      ]);
    }, 1000);
  });
};
*/

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["todos", "list"],
    queryFn: todoListApi.getTodoList,
  });

  if (isPending) return <>Loading...</>;
  if (error) return <>Error</>;
  return (
    <>
      <h1 className="text-3xl font-bold underline">Todo List</h1>
      {data.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </>
  );
}
