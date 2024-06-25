'use strict'

const Database = use('Database')

class HistoricController {
    async show({ params , response , request  }) {
        const clientId = params.historic_id
        const clientIds = request
        const historic = true
    
        try {
          const client = await Database
            .table('clients' , 'client_historics' , '')
            .select('clients.*', 'users.*')
            .leftJoin('users', 'clients.user', 'users.user_id')
            .where('clients.client_id', clientId)
            .first()
          if (!client) {
            return response.status(404).json({ message: 'Cliente não encontrado.' })
          }
          //if (historic) {
            const teste = await Database
            .table('client_historics')
            .where('client', clientId)        
          //}
    
          return {
            client,
            teste
          }
    
        } catch (error) {
          return response.status(500).json({ message: 'Erro ao buscar cliente.' })
        }
      }

      async search({ request  }) {
        const historic_id = request.qs.historic_id
        const page = request.qs.page
        const perPage = request.qs.perPage

        const client = await Database
        .table('clients' )
        .select('clients.*' )
        .where('clients.client_id', historic_id)
        .first()

        let serviceQuery = Database.table('services').where('client', 'LIKE', `%${historic_id}%`)
      
        const totalResults = await serviceQuery.clone().count('* as total')
        const total = totalResults[0].total
        //const totalPages = Math.ceil(total / perPage)
      
        const startIndex = (page - 1) * perPage
      
        const paginatedResults4Services = await serviceQuery.offset(startIndex).limit(perPage)
      
        return {
          client,
          service: paginatedResults4Services,
          total: total
        }
      }  
}

module.exports = HistoricController
