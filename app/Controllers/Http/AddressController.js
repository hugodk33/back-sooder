'use strict'
const Database = use('Database');

const Address = use('App/Models/Address')

class AddressController {
  async create({ request, response }) {
    const {
      address_id,
      CEP,
      street,
      number,
      complement
    } = request.all(['address_id', 'CEP', 'street', 'number', 'complement']);

    try {
      const [addressId] = await Database.table('addresses').insert({
        address_id,
        CEP,
        street,
        number,
        complement
      });

      return response.json({ message: 'Endereço criado com sucesso', addressId });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar endereço', error });
    }
  }

  async update({ params, request, response }) {
    const {
      address_id,
      CEP,
      street,
      number,
      complement
    } = request.all(['address_id', 'CEP', 'street', 'number', 'complement']);

    try {
      const existingAddress = await Database.table('addresses').where('address_id', params.id).first();
      if (!existingAddress) {
        return response.status(404).json({ message: 'Endereço não encontrado' });
      }

      await Database.table('addresses').where('address_id', params.id).update({
        address_id,
        CEP,
        street,
        number,
        complement
      });

      return response.json({ message: 'Endereço atualizado com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar endereço', error });
    }
  }

  async show({ request, response }) {
    try {
      const addresses = await Address.query()
        .where('address_id', request.qs.name)
        .orWhere('number', request.qs.name)
        .orWhere('complement', 'LIKE', `%${request.qs.name}%`)
        .orWhere('street', 'LIKE', `%${request.qs.name}%`)
        .orWhere('CEP', request.qs.name)
        .fetch();
    
      if (addresses.rows.length === 0) {
        return response.status(404).json({ message: 'Endereço não encontrado' });
      }
    
      return response.json({ addresses });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar endereço', error });
    }
  }

  async search({ params, request, response }) {
    try {
      const page = request.input('page', 1);
      const perPage = request.input('perPage', 10);
      const id = request._all.id
  
      let query = Address.query()
  
      if (id && id.trim() !== '') {
        query = query
          .where('addresses.address_id', id)
          .orWhere('number', id)
          .orWhere('complement', 'LIKE', `%${id}%`)
          .orWhere('street', 'LIKE', `%${id}%`)
          .orWhere('CEP', id)
      }
  
      const client = await query.paginate(page, perPage);
  
      if (client.rows.length === 0) {
        return response.status(404).json({ message: 'Atendimento não encontrado' });
      }
  
      return response.json({ client });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar registro de atendimento', error: error.message });
    }
  }
  
  async destroy({ params, response }) {
    try {
      const existingAddress = await Database.table('addresses').where('address_id', params.id).first();
      if (!existingAddress) {
        return response.status(404).json({ message: 'Endereço não encontrado' });
      }

      await Database.table('addresses').where('address_id', params.id).delete();

      return response.json({ message: 'Endereço excluído com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir endereço', error });
    }
  }
}

module.exports = AddressController;
