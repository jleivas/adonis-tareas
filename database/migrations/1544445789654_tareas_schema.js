'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TareasSchema extends Schema {
  up () {
    this.create('tareas', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('tareas')
  }
}

module.exports = TareasSchema
