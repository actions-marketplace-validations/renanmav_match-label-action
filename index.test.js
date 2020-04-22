const cp = require('child_process')
const path = require('path')
const test = require('ava')

test('action run if label is present', t => {
  process.env.INPUT_ALLOWED = 'blogpost'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  const ip = path.join(__dirname, 'index.js')
  const output = cp.execSync(`node ${ip}`, {env: process.env, encoding: 'utf8'})
  t.is(output, '::set-output name=match::blogpost\n')
})

test('action doesn’t run if label isn’t present', t => {
  process.env.INPUT_ALLOWED = 'notpresentlabel'
  process.env.GITHUB_EVENT_PATH = path.join(__dirname, '.tests/context.json')
  const ip = path.join(__dirname, 'index.js')
  try {
    cp.execSync(`node ${ip}`, {
      env: process.env,
      encoding: 'utf8'
    })
  } catch (error) {
    t.is(
      error.stdout,
      `::error::Could not find exactly one of the appropriate labels on the issue.\n`
    )
  }
})
