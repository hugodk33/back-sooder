'use strict'

class Audit {

  async handle ({ request, auth }, next) {
    const user = await auth.getUser()
    request.body = Object.assign(request.body, { action_by: user.id })
    await next()
  }
}

module.exports = Audit
