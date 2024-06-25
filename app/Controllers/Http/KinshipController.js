'use strict';

const Database = use('Database');
const Kinship = use('App/Models/Kinship');

class KinshipController {
  async create({ request, response }) {
    const {
      client_id,
      kinship_type,
      kin
    } = request.all(['client_id', 'kinship_type', 'kin']);

    try {
      // Verifica se o cliente e o parente existem antes de criar o parentesco
      const client = await Database.table('clients').where('id', client_id).first();
      const kinExist = await Database.table('clients').where('id', kin).first();

      if (!client || !kinExist) {
        return response.status(404).json({ message: 'Cliente ou parente não encontrado' });
      }

      const [kinshipId] = await Database.table('kinships').insert({
        client_id,
        kinship_type,
        kin
      });

      return response.json({ message: 'Parentesco criado com sucesso', kinshipId });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar parentesco', error });
    }
  }

  async update({ params, request, response }) {
    const {
      client_id,
      kinship_type,
      kin
    } = request.all(['client_id', 'kinship_type', 'kin']);

    try {
      const existingKinship = await Kinship.find(params.id);

      if (!existingKinship) {
        return response.status(404).json({ message: 'Parentesco não encontrado' });
      }

      // Verifica se o cliente e o parente existem antes de atualizar o parentesco
      const client = await Database.table('clients').where('id', client_id).first();
      const kinExist = await Database.table('clients').where('id', kin).first();

      if (!client || !kinExist) {
        return response.status(404).json({ message: 'Cliente ou parente não encontrado' });
      }

      existingKinship.client_id = client_id;
      existingKinship.kinship_type = kinship_type;
      existingKinship.kin = kin;

      await existingKinship.save();

      return response.json({ message: 'Parentesco atualizado com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar parentesco', error });
    }
  }

  async show({ params, response }) {
    try {
      const kinship = await Kinship.query()
        .where('kinship_id', params.id)
        .orWhere('client_id', params.id)
        .orWhere('kinship_type', 'LIKE', `%${params.id}%`)
        .orWhere('kin', params.id)
        .fetch();

      if (kinship.rows.length === 0) {
        return response.status(404).json({ message: 'Parentesco não encontrado' });
      }

      return response.json({ kinship });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar parentesco', error });
    }
  }

  async destroy({ params, response }) {
    try {
      const existingKinship = await Kinship.find(params.id);

      if (!existingKinship) {
        return response.status(404).json({ message: 'Parentesco não encontrado' });
      }

      await existingKinship.delete();

      return response.json({ message: 'Parentesco excluído com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir parentesco', error });
    }
  }
}

module.exports = KinshipController;
