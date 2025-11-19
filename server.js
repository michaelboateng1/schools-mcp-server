
const express = require("express");
const router = require("./routes/mcp_servers");
const {PORT} = require('./controllers/mcp_instance');

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {console.log(`Server running on port localhost://${PORT}`)})

