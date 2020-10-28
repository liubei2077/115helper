const fastify = require("fastify")({
  logger: false,
})

const fs = require("fs")
const path = require("path")

fastify.get("/script", function (request, reply) {
  let content = fs.readFileSync(path.join(__dirname, "../client/index.js"), {
    encode: "utf-8",
  })
  console.log(content)
  reply.headers({
    "content-type": "text/javascript; charset=UTF-8",
  })
  reply.send(content)
})

fastify.listen(3333, function (err, address) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})
