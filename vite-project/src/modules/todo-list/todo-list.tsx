import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

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

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["todos", "list"],
    queryFn: getTodos,
  });

  if (isPending) return <>Loading...</>;
  if (error) return <>Error</>;
  return (
    <>
      TodoList
      {data.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </>
  );
}
