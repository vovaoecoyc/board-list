const helpers = {
  checkValidateInput: (field, value, fields) => {
    let result = []
    for (let key in field.rules) {
      if (field.rules[key] && key === 'email') {
        value.search(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i) === -1
          ? result.push(false)
          : result.push(true)
      }
      if (key === 'minLength') {
        value.length < field.rules[key] ? result.push(false) : result.push(true)
      }
      if (field.rules[key] && key === 'confirm') {
        let confirmValue = ''
        for (let key in fields) {
          if (fields[key].rules.confirmWith === field.name) {
            confirmValue = fields[key].value
          }
        }
        field.value === confirmValue ? result.push(true) : result.push(false)
      }
    }
    return result.every(value => {
      return value === true
    })
  }
}

export default helpers
