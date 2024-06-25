'use strict'

class NameSlug {
  get rules () {
    return {
      name: 'required',
      slug: 'required'
    }
  }

  get messages () {
    return {
      'name.required': 'Informe a propriedade name',
      'slug.required': 'Informe a propriedade slug'
    }
  }
}

module.exports = NameSlug
