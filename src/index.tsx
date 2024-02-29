import { Hono } from 'hono'
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { Layout, Form, Success, Error } from './components';

const app = new Hono()

app.get('/', (c) => {
  return c.html(<Layout>
    <Form />
    <div id="form"></div>
  </Layout>)
})

app.post('/submit', zValidator(
  'form',
  z.object({
    email: z.string().email()
  }),
  (result, c) => {
    if (!result.success) {
      return c.html(<Error error="Error handling the submit" />)
    }
  }
),
  async (c) => {
    const { email } = c.req.valid('form')
    console.log("Handling dataaa: ", email)
    // c.env is the environment object -> use it for reading sendgrid key + saving and sending confirmation email
    return c.html(<Success email={email} />)


  })

export default app
