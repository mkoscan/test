const puppeteer = require('puppeteer')

module.exports.PuppeteerLogin = async function PuppeteerLogin(options = {}) {
  validateOptions(options)

  const browser = await puppeteer.launch({ headless: !!options.headless, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  await page.goto(options.loginUrl)

  await selectProvider({ page })
  await typeUsername({ page, options })
  await usernameNext({ page })
  await typePassword({ page, options })
  await submit({ page })

  const cookies = await getCookies({ page, options })

  await finalizeSession({ page, browser, options })

  return {
    cookies
  }
}

function validateOptions(options) {
  if (!options.username || !options.password) {
    throw new Error('Username or Password missing for social login')
  }
}


async function selectProvider({ page } = {}) {
  await page.waitForSelector('#idp-google', { visible: true });
  await page.click('#idp-google')
}

async function typeUsername({ page, options } = {}) {
  await page.waitForSelector('input[type="email"]', { visible: true });
  await page.type('input[type="email"]', options.username, { delay: 100 });
}

async function usernameNext({ page } = {}) {
  await page.waitForSelector('#identifierNext', { visible: true });
  await page.click('#identifierNext')
}

async function typePassword({ page, options } = {}) {
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', options.password, { delay: 100 });
  //await page.waitForXPath(`//input[@id='password' and contains(., ${options.password})]`);
  await page.waitFor(1000);
}

async function submit({ page } = {}) {
  await page.waitForSelector('#passwordNext', { visible: true })
  await page.click('#passwordNext')
}

async function getCookies({ page, options } = {}) {
  await page.waitForSelector(options.postLoginSelector, { visible: true })

  const cookies = options.getAllBrowserCookies
    ? await getCookiesForAllDomains(page)
    : await page.cookies(options.loginUrl)

  if (options.logs) {
    console.log(cookies)
  }

  return cookies
}

async function getCookiesForAllDomains(page) {
  const cookies = await page._client.send('Network.getAllCookies', {})
  return cookies.cookies
}

async function finalizeSession({ page, browser, options } = {}) {
  await browser.close()
}