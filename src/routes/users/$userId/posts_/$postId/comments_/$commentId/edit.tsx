import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  fetchComment,
  updateComment,
} from "../../../../../../../lib/api/comments";
import { IComment } from "../../../../../../../lib/types/comment";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const commentQueryOptions = (commentId: string) =>
  queryOptions<IComment>({
    queryKey: ["comment", commentId],
    queryFn: () => fetchComment(commentId),
  });

export const Route = createFileRoute(
  "/users/$userId/posts/$postId/comments/$commentId/edit",
)({
  loader: ({ context: { queryClient }, params: { commentId } }) =>
    queryClient.ensureQueryData(commentQueryOptions(commentId)),
  component: Edit,
});

function Edit() {
  const { commentId } = Route.useParams();
  const { data } = useQuery(commentQueryOptions(commentId));
  const form = useForm({
    defaultValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
      body: data?.body ?? "",
    },
    onSubmit: async ({ value }) => {
      const res = await updateComment(commentId, value);
      console.log(res);
    },
    validatorAdapter: zodValidator(),
  });
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 sm:text-3xl dark:text-white">
            Update Comment
          </h2>
        </div>
        <div className="relative z-10 mt-5 rounded-xl border bg-white p-4 sm:mt-10 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="mb-4 sm:mb-8">
              <form.Field
                name="name"
                validators={{
                  onChange: z.coerce
                    .string()
                    .min(3, "Username must be at least 3 characters!!!"),
                }}
                children={(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                    {field.state.meta.errors && (
                      <div className="mt-1 text-sm text-red-500">
                        {field.state.meta.errors}
                      </div>
                    )}
                  </div>
                )}
              />
              <form.Field
                name="email"
                validators={{
                  onChange: z.coerce.string().email().min(5),
                }}
                children={(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                    {field.state.meta.errors && (
                      <div className="mt-1 text-sm text-red-500">
                        {field.state.meta.errors}
                      </div>
                    )}
                  </div>
                )}
              />
              <form.Field
                name="body"
                validators={{
                  onChange: z.coerce.string().min(10),
                }}
                children={(field) => (
                  <div>
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium dark:text-white"
                    >
                      Comment
                    </label>
                    <div className="mt-1">
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        rows={3}
                        className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      ></textarea>
                      {field.state.meta.errors && (
                        <div className="mt-1 text-sm text-red-500">
                          {field.state.meta.errors}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="mt-6 grid">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
