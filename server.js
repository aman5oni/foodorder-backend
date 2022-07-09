import app from "./app"
import {PORT} from "./config/appConfig"

app.listen(PORT,()=>{
    console.log(`Listening to port:${PORT}`)
})