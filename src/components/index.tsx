import { html } from "hono/html"
import { FC } from "hono/jsx"

export const Layout = (props: { children: any }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Hono + htmx</title>
    </head>
    <body>
      <div class="p-4 mx-auto max-w-2xl">
        <h1 class="text-4xl underline  decoration-wavy decoration-2 font-bold mb-4"><a href="/">Email submit</a></h1>
        ${props.children}
      </div>
    </body>
  </html>
`

export const Form: FC = () => {
  return (
    <form hx-post="/submit" hx-target="#form" hx-swap="innerHTML" _="on htmx:afterRequest reset() me" class="mb-4 flex flex-col gap-2">
      <div class="flex flex-col mb-2">
        <label for="email" class="text-lg p-1">Email</label>
        <input name="email" placeholder="email address" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5" />
      </div>
      <button class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2 text-center" type="submit">
        Submit
      </button>
    </form>
  )
}

export const Success: FC<{ email: string }> = ({ email }) => (
  <div class="text-2xl text-white text-center bg-green-500 p-2">Success 😍 {email}</div>
)

export const Error: FC<{ error: string }> = ({ error }) => (
  <div class="text-2xl text-white text-center bg-red-500 p-2">{error} 😥</div>
)