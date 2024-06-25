'use strict';

const Database = use('Database');
const Family = use('App/Models/Family');

class FamilyController {
  async create({ request, response }) {
    const { address_id, client_group_id } = request.all(['address_id', 'client_group_id']);

    try {
      const trx = await Database.beginTransaction();

      const family = new Family();
      family.address = address_id;
      family.client_group = client_group_id;

      await trx.insert(family);

      await trx.commit();

      return response.json({ message: 'Família criada com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar família', error });
    }
  }

  async update({ params, request, response }) {
    const { address_id, client_group_id } = request.all(['address_id', 'client_group_id']);

    try {
      const existingFamily = await Family.find(params.id);
      if (!existingFamily) {
        return response.status(404).json({ message: 'Família não encontrada' });
      }

      existingFamily.address = address_id;
      existingFamily.client_group = client_group_id;

      await existingFamily.save();

      return response.json({ message: 'Família atualizada com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar família', error });
    }
  }

  async show({ params, response }) {
    try {
      const family = await Family.find(params.id);
      if (!family) {
        return response.status(404).json({ message: 'Família não encontrada' });
      }

      return response.json({ data: family });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar família', error });
    }
  }

  async destroy({ params, response }) {
    try {
      const existingFamily = await Family.find(params.id);
      if (!existingFamily) {
        return response.status(404).json({ message: 'Família não encontrada' });
      }

      await existingFamily.delete();

      return response.json({ message: 'Família excluída com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir família', error });
    }
  }
}

module.exports = FamilyController;