import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "../../shared/api/todo-list/api";
import { useState } from "react";

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
  const [page, setPage] = useState<number>(1);

  const {
    data: paginationData,
    error,
    isPending,
    isPlaceholderData,
    isFetching,
    isStale,
    isFetched,
    isRefetching
  } = useQuery({
    queryKey: ["todos", "list", { page }],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
    placeholderData: keepPreviousData, // Keep the previous data when the query is in a placeholder state
    staleTime: 1000 * 30 * 1, // Cache data for 5 minutes
  });

  if (isPending) return <>Loading...</>;
  if (error) return <>Error</>;
  console.log('isFetched', isFetched);
  console.log('isStale', isStale);
  console.log('isFetching', isFetching);
  console.log('isRefetching', isRefetching);
  return (
    <div className="p-5 mx-auto max-w-[800px]">
      <h1 className="text-3xl font-bold underline max-w-[200px]">Todo List</h1>
      <div className={`flex flex-col gap-4 mt-5 ${isPlaceholderData ? 'opacity-40' : ''}`}>
        {paginationData.data.map((todo) => (
          <div className="border borer-slate-300 rounded p-3" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="p-3 rounded border border-teal-500"
        >
          prev
        </button>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, paginationData.pages))}
          className="p-3 rounded border border-teal-500"
        >
          next
        </button>
      </div>
    </div>
  );
}
