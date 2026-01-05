
import app from "./app"
import config from "./config"
import "./cornjobs";





app.listen(config.port, ()=>{
    console.log(`app running on ${config.port}`)
})