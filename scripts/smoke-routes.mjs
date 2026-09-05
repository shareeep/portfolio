import { readFile } from "node:fs/promises"
import path from "node:path"

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000"
const projectsIndex = path.join(process.cwd(), ".velite/projects.json")

async function readPublishedProjects() {
  const projects = JSON.parse(await readFile(projectsIndex, "utf8"))
  return projects.filter(({ published }) => published)
}

async function expectResponse(pathname, options = {}) {
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
  })

  if (response.status !== 200) {
    throw new Error(`${pathname} returned ${response.status}`)
  }

  if (options.contentType) {
    const contentType = response.headers.get("content-type") ?? ""
    if (!contentType.startsWith(options.contentType)) {
      throw new Error(
        `${pathname} returned unexpected content type ${contentType}`
      )
    }
  }

  if (options.marker) {
    const body = await response.text()
    if (!body.includes(options.marker)) {
      throw new Error(
        `${pathname} did not include ${JSON.stringify(options.marker)}`
      )
    }
  }

  console.log(`ok ${pathname}`)
  return response
}

const projects = await readPublishedProjects()

await expectResponse("/", { marker: "connect with me!" })
await expectResponse("/capoo", { marker: "Back" })
await expectResponse("/wordle", { marker: "Turn 1 of 6" })

const wordResponse = await expectResponse("/api/wordle/next", {
  contentType: "application/json",
})
const wordPayload = await wordResponse.json()
if (!/^[a-z]{5}$/i.test(wordPayload.word ?? "")) {
  throw new Error("/api/wordle/next returned an invalid word")
}

await expectResponse("/api/og?heading=Smoke%20Test&type=Portfolio&mode=light", {
  contentType: "image/png",
})

for (const project of projects) {
  await expectResponse(`/${project.slugAsParams}`, { marker: "Back to home" })
  if (project.image?.startsWith("/")) {
    await expectResponse(project.image)
  }
}

console.log(`smoke checks passed for ${projects.length} published projects`)
