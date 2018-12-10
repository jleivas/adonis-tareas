'use strict'

// Hacemos referencia al modelo Tarea
const Tarea = use('App/Models/Tarea')
const { validate } = use('Validator')

class TareaController {

    async index ({ view }) {
        const tasks = await Tarea.all()
      
        return view.render('tareas.index', { tareas: tasks.toJSON() })
    }

    async store ({ request, response, session }) {
        // validacion para input
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255'
        })

        // muestra mensaje de error cuando la validacion falla
        if (validation.fails()) {
            session.withErrors(validation.messages())
                    .flashAll()

            return response.redirect('back')
        }

        // persistir en la base de datos
        const tarea = new Tarea()
        tarea.title = request.input('title')
        await tarea.save()

        // Mensaje de exito a la sesion
        session.flash({ notification: 'Tarea añadida!' })

        return response.redirect('back')
    }

    async destroy ({ params, session, response }) {
        const tarea = await Tarea.find(params.id)
        await tarea.delete()
      
        // Fash success message to session
        session.flash({ notification: 'Tarea borrada!' })
      
        return response.redirect('back')
    }
}

module.exports = TareaController
