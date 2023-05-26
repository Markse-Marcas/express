import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import { createClient } from "@supabase/supabase-js"
import 'dotenv/config'

const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const supabaseUrl = process.env.VITE_SUPABASE_URL as string
const supabase_service_role = process.env.SUPABASE_SERVICE_ROLE as string
const supabaseAdmin = createClient(supabaseUrl, supabase_service_role)

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    try {
        const user = JSON.parse(event.body!)
        console.log(user)
        const { data, error } = await supabaseAdmin
            .auth
            .admin
            .createUser({
                email: user.email,
                password: user.password,
                email_confirm: user.email_confirm,
                user_metadata: {
                    last_name: user.last_name,
                    name: user.name,
                    phone: user.phone,
                    username: user.username
                }
            })
        if (error)
            throw (error)
        if (data)
            console.log(data)

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "User created!"
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
};

export { handler };
