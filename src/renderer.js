const { IPROUTE } = process.env;

urls = {
  login: 'login',
  logout: 'logout',
  api: ['blink', 'led_on', 'led_off']
}

const toLinks = ends => {
  let links = {}

  Object.entries(ends)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        links[key] = `<a href="/${value}">${value}</a></br>`
      }
      else {
        links[key] = {}
        value.map(end => links[key][end] = `<a href="/${key}/${end}">${end}</a></br>`)
      }
    })
    
  return links
}

const toEndpoints = ends => {
  let links = {}

  Object.entries(ends)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        links[key] = `/${value}`
      }
      else {
        links[key] = {}
        value.map(end => links[key][end] = `/${key}/${end}`)
      }
    })
    
  return links
}

const links = toLinks(urls)
const ends = toEndpoints(urls)

const home = `<div>
${links.api.blink}
${links.api.led_on}
${links.api.led_off}
${links.logout}
</div>`

const unAuth = `<div>${links.login}</div>`

module.exports = {
  home,
  unAuth,
  ends
}