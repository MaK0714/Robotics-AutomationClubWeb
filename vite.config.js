import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function csvMembersPlugin() {
  const rootCsv = path.resolve(__dirname, 'members.csv')
  const publicCsv = path.resolve(__dirname, 'public/members.csv')
  const distCsv = path.resolve(__dirname, 'dist/members.csv')

  function syncFiles(content) {
    fs.writeFileSync(rootCsv, content, 'utf-8')
    if (fs.existsSync(path.dirname(publicCsv))) {
      fs.writeFileSync(publicCsv, content, 'utf-8')
    }
    if (fs.existsSync(path.dirname(distCsv))) {
      fs.writeFileSync(distCsv, content, 'utf-8')
    }
  }

  function getLatestCsv() {
    if (fs.existsSync(rootCsv)) {
      return fs.readFileSync(rootCsv, 'utf-8')
    }
    if (fs.existsSync(publicCsv)) {
      return fs.readFileSync(publicCsv, 'utf-8')
    }
    return 'Number,Name,Branch\n'
  }

  const handler = (req, res, next) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

    // GET /api/members or GET /members.csv -> always serve freshest CSV directly from disk with no-cache headers
    if (req.method === 'GET' && (parsedUrl.pathname === '/api/members' || parsedUrl.pathname === '/members.csv')) {
      const csvText = getLatestCsv()
      if (fs.existsSync(path.dirname(publicCsv))) {
        try {
          fs.writeFileSync(publicCsv, csvText, 'utf-8')
        } catch (e) {}
      }
      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      res.end(csvText)
      return
    }

    // POST /api/members or POST /members.csv -> append row to members.csv & public/members.csv
    if (req.method === 'POST' && (parsedUrl.pathname === '/api/members' || parsedUrl.pathname === '/members.csv')) {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', () => {
        try {
          const { name, branch } = JSON.parse(body)
          if (!name || !branch) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Name and branch are required' }))
            return
          }

          let rawCsv = getLatestCsv().trim()
          const lines = rawCsv ? rawCsv.split('\n').filter(l => l.trim().length > 0) : ['Number,Name,Branch']

          // Determine next sequential number
          let lastNum = 0
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim()
            if (!line) continue
            const numPart = parseInt(line.split(',')[0], 10)
            if (!isNaN(numPart) && numPart > lastNum) {
              lastNum = numPart
            }
          }
          const nextNum = (lastNum > 0 ? lastNum : lines.length - 1) + 1

          const cleanName = name.trim().includes(',') || name.trim().includes('"')
            ? `"${name.trim().replace(/"/g, '""')}"`
            : name.trim()
          const cleanBranch = branch.trim().includes(',') || branch.trim().includes('"')
            ? `"${branch.trim().replace(/"/g, '""')}"`
            : branch.trim()

          const newLine = `${nextNum},${cleanName},${cleanBranch}`
          const updatedCsv = `${lines.join('\n')}\n${newLine}\n`

          syncFiles(updatedCsv)

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            success: true,
            member: {
              number: nextNum,
              name: name.trim(),
              branch: branch.trim()
            }
          }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
        }
      })
      return
    }

    next()
  }

  return {
    name: 'csv-members-plugin',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), csvMembersPlugin()],
  server: {
    port: 3000,
    open: true
  }
})
