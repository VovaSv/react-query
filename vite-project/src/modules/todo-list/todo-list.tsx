import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { todoListApi } from "../../shared/api/todo-list/api";
import { useCallback, useRef, useState } from "react";

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

  /*
    const [page, setPage] = useState<number>(1);
    const {
      data: todoItems,
      error,
      isPending,
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
  
  */
  /**
   * 
   * Use Infinite Query with QueryKey: ["todos", "list"]
   * - The queryKey is an array containing the keys to uniquely identify the query.
   * - fetchNextPage is a function provided by useInfiniteQuery that fetches the next page of data.
   * - The initialPageParam is the initial page number to fetch.
   * - The getNextPageParam function is a function that pass pageParam to queryFn to get the next page.
   * - hasNextPage is a boolean indicating whether there is a next page depened on what getNextPageParam function returns if getNextPageParam return value so hasNextPage value true, if getNextPageParam return value is null or undefined so hasNextPage value false. 
   * - lastPage is actual result from API call and our api returns next page number in response. if your api not return next page number then you should calculate next page number in your own way.
   */

  const { data: todoItems, error, isPending, isFetched, isStale, isFetching, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["todos", "list"],
    queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta), // first call will take from initailPageParam = 1, second and rest of the calls will take from last page.nextgetNextPageParam: (lastPage) => lastPage.next getNextPageParam pass data to queryFn(meta)=> meta.pageParam
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    select: (data) => data.pages.flatMap((page) => page.data),
  })

  const cursorRef = useItersection(() => { fetchNextPage(); });


  if (isPending) return <>Loading...</>;
  if (error) return <>Error</>;
  console.log('isFetched', isFetched);
  console.log('isStale', isStale);
  console.log('isFetching', isFetching);
  console.log('isRefetching', isRefetching);
  return (
    <div className="p-5 mx-auto max-w-[800px]">
      <h1 className="text-3xl font-bold underline max-w-[200px]">Todo List</h1>
      <div className={`flex flex-col gap-4 mt-5`}>
        {/* <div className={`flex flex-col gap-4 mt-5 ${isPlaceholderData ? 'opacity-40' : ''}`}> */}
        {todoItems.map((todo) => (
          <div className="border borer-slate-300 rounded p-3" key={todo.id}>
            {todo.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4" ref={cursorRef}></div>
      {/*
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
              */}

    </div >
  );
}


export function useItersection(clk: () => void) {
  const unsubscribe = useRef(() => { });

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries)
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          clk();
        }
      });
    });
    if (el) {
      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current && unsubscribe.current();
    }
  }, [clk]);
}