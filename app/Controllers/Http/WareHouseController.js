'use strict'

const Database = use('Database')

const Item = use('App/Models/Item')

class WareHouseController {
    async create({ request, response }) {
        const {
          quantity,
          name,
          type,
          observations,
          mesure_name,
        } = request.only([
          'quantity',
          'name',
          'type',
          'observations',
          'mesure_name',
        ]);
    
        try {
          const [itemId] = await Database.table('item').insert({
            quantity,
            name,
            type,
            observations,
            mesure_name
          });
    
          return response.json({ message: 'Item criado com sucesso', item_id: itemId });
        } catch (error) {
          return response.status(500).json({ message: 'Erro ao criar item: ' + error });
        }
      }
      
      async show({ request }) {
        const { name, client_id, page, perPage } = request.get();
    
        let clientsQuery = Database.table('itens').where('name', 'LIKE', `%${name}%`);
    
        if (client_id) {
          clientsQuery = clientsQuery.where('item_id', client_id);
        }
    
        const totalResults = await clientsQuery.clone().count('* as total');
        const total = totalResults[0].total;
        const totalPages = Math.ceil(total / perPage);
    
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedResults = await clientsQuery.offset(startIndex).limit(perPage);
    
        return {
          data: paginatedResults,
          currentPage: page,
          totalPages,
          totalResults: total,
        };
      }
    
      async update({ params, request, response }) {
        const itemId = params.item_id;
        const {
          quantitys,
          name,
          type,
          title,
          observations,
          mesure_name,
          historic,
          quantity
        } = request.only([
          'quantitys',
          'name',
          'type',
          'title',
          'observations',
          'mesure_name',
          'historic',
          'quantity'
        ]);
    
        try {
          const affectedRows = await Database.table('itens')
            .where('item_id', itemId)
            .update({
              quantitys,
              name,
              type,
              title,
              observations,
              mesure_name,
              historic,
              quantity
            });
    
          if (affectedRows === 0) {
            return response.status(404).json({ message: 'Item não encontrado' });
          }
    
          return response.json({ message: 'Item atualizado com sucesso' });
        } catch (error) {
          return response.status(500).json({ message: 'Erro ao atualizar item: ' + error });
        }
      }
    
      async destroy({ params, response }) {
        const itemId = params.item_id;
    
        try {
          const affectedRows = await Database.table('itens')
            .where('item_id', itemId)
            .delete();
    
          if (affectedRows === 0) {
            return response.status(404).json({ message: 'Item não encontrado' });
          }
    
          return response.json({ message: 'Item excluído com sucesso' });
        } catch (error) {
          return response.status(500).json({ message: 'Erro ao excluir item: ' + error });
        }
      }
}

module.exports = WareHouseController
