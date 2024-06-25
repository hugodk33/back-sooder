'use strict'

class Client {
  get rules () {
    return {
      user_id: 'required',
      address: 'required'
    }
  }

  get messages () {
    return {
      'user_id.required': 'Informe a propriedade user_id',
      'address.required': 'Informe a propriedade address'
    }
  }
}

module.exports = Client
