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

function resourcesPlugin() {
  const rootCsv = path.resolve(__dirname, 'resources.csv')
  const publicCsv = path.resolve(__dirname, 'public/resources.csv')
  const distCsv = path.resolve(__dirname, 'dist/resources.csv')

  const srcJson = path.resolve(__dirname, 'src/data/resources.json')
  const publicJson = path.resolve(__dirname, 'public/resources.json')
  const distJson = path.resolve(__dirname, 'dist/resources.json')

  function resourcesToCsv(list) {
    const header = 'ID,Title,Category,Date,Duration,Description,Tags,SlidesUrl,CodeUrl,DocsUrl'
    const rows = list.map(item => {
      const escapeCsv = val => {
        const str = String(val || '').trim()
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }
      const tagsStr = Array.isArray(item.tags) ? item.tags.join(';') : String(item.tags || '')
      return [
        item.id,
        escapeCsv(item.title),
        escapeCsv(item.category),
        escapeCsv(item.date),
        escapeCsv(item.duration),
        escapeCsv(item.description),
        escapeCsv(tagsStr),
        escapeCsv(item.slidesUrl),
        escapeCsv(item.codeUrl),
        escapeCsv(item.docsUrl),
      ].join(',')
    })
    return [header, ...rows].join('\n') + '\n'
  }

  function syncFiles(list) {
    const jsonContent = JSON.stringify(list, null, 2)
    const csvContent = resourcesToCsv(list)

    // Sync JSON files
    if (fs.existsSync(path.dirname(srcJson))) {
      fs.writeFileSync(srcJson, jsonContent, 'utf-8')
    }
    if (fs.existsSync(path.dirname(publicJson))) {
      fs.writeFileSync(publicJson, jsonContent, 'utf-8')
    }
    if (fs.existsSync(path.dirname(distJson))) {
      fs.writeFileSync(distJson, jsonContent, 'utf-8')
    }

    // Sync CSV files
    fs.writeFileSync(rootCsv, csvContent, 'utf-8')
    if (fs.existsSync(path.dirname(publicCsv))) {
      fs.writeFileSync(publicCsv, csvContent, 'utf-8')
    }
    if (fs.existsSync(path.dirname(distCsv))) {
      fs.writeFileSync(distCsv, csvContent, 'utf-8')
    }
  }

  function getLatestResources() {
    if (fs.existsSync(srcJson)) {
      try {
        return JSON.parse(fs.readFileSync(srcJson, 'utf-8'))
      } catch (e) {}
    }
    if (fs.existsSync(publicJson)) {
      try {
        return JSON.parse(fs.readFileSync(publicJson, 'utf-8'))
      } catch (e) {}
    }
    return []
  }

  const handler = (req, res, next) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

    // GET /api/resources or /resources.json -> serve freshest JSON from disk
    if (req.method === 'GET' && (parsedUrl.pathname === '/api/resources' || parsedUrl.pathname === '/resources.json')) {
      const list = getLatestResources()
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      res.end(JSON.stringify(list))
      return
    }

    // GET /resources.csv -> serve CSV file directly
    if (req.method === 'GET' && parsedUrl.pathname === '/resources.csv') {
      const csvContent = fs.existsSync(rootCsv) ? fs.readFileSync(rootCsv, 'utf-8') : 'ID,Title,Category,Date,Duration,Description,Tags,SlidesUrl,CodeUrl,DocsUrl\n'
      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.end(csvContent)
      return
    }

    // POST /api/resources (Upload or Delete with password)
    if (req.method === 'POST' && (parsedUrl.pathname === '/api/resources' || parsedUrl.pathname === '/api/resources/delete')) {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', () => {
        try {
          const payload = JSON.parse(body)
          const { password, action, id } = payload

          // Strict password verification
          if (password !== 'MayureshPassword') {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Incorrect password! Access denied.' }))
            return
          }

          let currentList = getLatestResources()
          if (!Array.isArray(currentList)) currentList = []

          // ACTION: DELETE
          if (action === 'delete' || parsedUrl.pathname === '/api/resources/delete') {
            if (!id) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Resource ID is required for deletion' }))
              return
            }
            const updatedList = currentList.filter(item => String(item.id) !== String(id))
            syncFiles(updatedList)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              success: true,
              message: 'Resource deleted successfully',
              resources: updatedList
            }))
            return
          }

          // ACTION: UPLOAD
          const { title, category, date, duration, description, tags, slidesUrl, codeUrl, docsUrl } = payload
          if (!title || !description) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Title and description are required' }))
            return
          }

          const newResource = {
            id: Date.now(),
            title: title.trim(),
            category: category || 'Workshop',
            date: date ? date.trim() : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            duration: duration ? duration.trim() : 'Session',
            description: description.trim(),
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : ['Workshop']),
            slidesUrl: slidesUrl ? slidesUrl.trim() : '',
            codeUrl: codeUrl ? codeUrl.trim() : '',
            docsUrl: docsUrl ? docsUrl.trim() : '',
            createdAt: new Date().toISOString()
          }

          const updatedList = [newResource, ...currentList]
          syncFiles(updatedList)

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            success: true,
            resource: newResource,
            resources: updatedList
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
    name: 'resources-csv-json-plugin',
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    }
  }
}

function libraryPlugin() {
  const rootCsv = path.resolve(__dirname, 'library.csv')
  const publicCsv = path.resolve(__dirname, 'public/library.csv')
  const distCsv = path.resolve(__dirname, 'dist/library.csv')

  const srcJson = path.resolve(__dirname, 'src/data/library.json')
  const publicJson = path.resolve(__dirname, 'public/library.json')
  const distJson = path.resolve(__dirname, 'dist/library.json')

  function libraryToCsv(list) {
    const header = 'ID,Title,Type,Author,Url,Description,Tags'
    const rows = list.map(item => {
      const escapeCsv = val => {
        const str = String(val || '').trim()
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }
      const tagsStr = Array.isArray(item.tags) ? item.tags.join(';') : String(item.tags || '')
      return [
        item.id,
        escapeCsv(item.title),
        escapeCsv(item.type),
        escapeCsv(item.author),
        escapeCsv(item.url),
        escapeCsv(item.description),
        escapeCsv(tagsStr),
      ].join(',')
    })
    return [header, ...rows].join('\n') + '\n'
  }

  function syncFiles(list) {
    const jsonContent = JSON.stringify(list, null, 2)
    const csvContent = libraryToCsv(list)

    // Sync JSON files
    if (fs.existsSync(path.dirname(srcJson))) {
      fs.writeFileSync(srcJson, jsonContent, 'utf-8')
    }
    if (fs.existsSync(path.dirname(publicJson))) {
      fs.writeFileSync(publicJson, jsonContent, 'utf-8')
    }
    if (fs.existsSync(path.dirname(distJson))) {
      fs.writeFileSync(distJson, jsonContent, 'utf-8')
    }

    // Sync CSV files
    fs.writeFileSync(rootCsv, csvContent, 'utf-8')
    if (fs.existsSync(path.dirname(publicCsv))) {
      fs.writeFileSync(publicCsv, csvContent, 'utf-8')
    }
    if (fs.existsSync(path.dirname(distCsv))) {
      fs.writeFileSync(distCsv, csvContent, 'utf-8')
    }
  }

  function getLatestItems() {
    if (fs.existsSync(srcJson)) {
      try {
        return JSON.parse(fs.readFileSync(srcJson, 'utf-8'))
      } catch (e) {}
    }
    if (fs.existsSync(publicJson)) {
      try {
        return JSON.parse(fs.readFileSync(publicJson, 'utf-8'))
      } catch (e) {}
    }
    return []
  }

  const handler = (req, res, next) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)

    // GET /api/library or /library.json -> serve freshest JSON from disk
    if (req.method === 'GET' && (parsedUrl.pathname === '/api/library' || parsedUrl.pathname === '/library.json')) {
      const list = getLatestItems()
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      res.end(JSON.stringify(list))
      return
    }

    // GET /library.csv -> serve CSV file directly
    if (req.method === 'GET' && parsedUrl.pathname === '/library.csv') {
      const csvContent = fs.existsSync(rootCsv) ? fs.readFileSync(rootCsv, 'utf-8') : 'ID,Title,Type,Author,Url,Description,Tags\n'
      res.setHeader('Content-Type', 'text/csv; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.end(csvContent)
      return
    }

    // POST /api/library (Upload or Delete with password)
    if (req.method === 'POST' && (parsedUrl.pathname === '/api/library' || parsedUrl.pathname === '/api/library/delete')) {
      let body = ''
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', () => {
        try {
          const payload = JSON.parse(body)
          const { password, action, id } = payload

          // Strict password verification
          if (password !== 'MayureshPassword') {
            res.statusCode = 401
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Incorrect password! Access denied.' }))
            return
          }

          let currentList = getLatestItems()
          if (!Array.isArray(currentList)) currentList = []

          // ACTION: DELETE
          if (action === 'delete' || parsedUrl.pathname === '/api/library/delete') {
            if (!id) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Resource ID is required for deletion' }))
              return
            }
            const updatedList = currentList.filter(item => String(item.id) !== String(id))
            syncFiles(updatedList)

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              success: true,
              message: 'Resource deleted successfully',
              items: updatedList
            }))
            return
          }

          // ACTION: UPLOAD
          const { title, type, author, url, description, tags } = payload
          if (!title || !url) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Title and URL are required' }))
            return
          }

          const newItem = {
            id: Date.now(),
            title: title.trim(),
            type: type || 'YouTube Playlist',
            author: author ? author.trim() : '',
            url: url.trim(),
            description: description ? description.trim() : '',
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
            createdAt: new Date().toISOString()
          }

          const updatedList = [newItem, ...currentList]
          syncFiles(updatedList)

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            success: true,
            item: newItem,
            items: updatedList
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
    name: 'digital-library-csv-json-plugin',
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
  plugins: [react(), csvMembersPlugin(), resourcesPlugin(), libraryPlugin()],
  server: {
    port: 3000,
    open: false
  }
})
