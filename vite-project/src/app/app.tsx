import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../shared/api/query-client";
import { TodoList } from "../modules/todo-list/todo-list";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
