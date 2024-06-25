'use strict'

const Database = use('Database')

const Service = use('App/Models/Service')
const Client = use('App/Models/Client')

const Dispatch = use('App/Models/Dispatch')

class ServiceController {
  async create({ request, response }) {
    const {
      type,
      title,
      observations,
      client,
      user,
      begun,
      end,
      date,
      status,
      order,
      tag
    } = request.all([
      'type',
      'title',
      'observations',
      'client',
      'user',
      'begun',
      'end',
      'date',
      'status',
      'order',
      'tag',
      'tag'
    ]);

    try {
      const trx = await Database.beginTransaction();

      const [serviceId] = await trx.table('services').insert({
        type,
        title,
        observations,
        client,
        user,
        begun,
        end,
        date,
        status,
        order,
        tag
      });

      await trx.commit();

      return response.json({ message: 'Serviço criado com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao criar serviço ' + error });
    }
  }

  async createDispatch(serviceId, trx) {
    const service = await trx.table('services').where('service_id', serviceId).first();

    const dispatchData = {
      dispatch_id: serviceId,
      status: 'pending',
      checkout: '',
      itens_group: null,
      created_at: service.date,
      updated_at: ''
    };

    const dispatch = await Dispatch.create(dispatchData, trx);

    return dispatch;
  }

  async dispatch({ params, request, response }) {

    const serviceId = params.service_id;

    const {
      type,
      dispatch_observations,
      checkout,
      dispatch_type,
      status
    } = request.all([
      'type',
      'dispatch_observations',
      'checkout',
      'dispatch_type',
      'status'
    ]);

    try {

      const service = await Database.table('services').where('service_id', serviceId).first();

      if (!service) {
        return response.status(404).json({ message: 'Serviço não encontrado' });
      }

      await Database.table('services')
        .where('service_id', serviceId)
        .update({
          type,
          dispatch_observations,
          checkout,
          dispatch_type,
          status
        });

      return response.json({ message: 'Serviço atualizado com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar serviço ' + error });
    }
  }

  async update({ params, request, response }) {
    const serviceId = params.service_id;
    const {
      type,
      title,
      observations,
      client,
      user,
      begun,
      end,
      date,
      status,
      order,
      tag
    } = request.all([
      'type',
      'title',
      'observations',
      'client',
      'user',
      'begun',
      'end',
      'date',
      'status',
      'order',
      'tag'
    ]);

    try {

      const service = await Database.table('services').where('service_id', serviceId).first();

      if (!service) {
        return response.status(404).json({ message: 'Serviço não encontrado' });
      }

      await Database.table('services')
        .where('service_id', serviceId)
        .update({
          type,
          title,
          observations,
          client,
          user,
          begun,
          end,
          date,
          status,
          order,
          tag
        });

      return response.json({ message: 'Serviço atualizado com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar serviço ' + error });
    }
  }

  async destroy({ params, response }) {
    const serviceId = params.service_id;

    try {
      const affectedRows = await Database.table('services')
        .where('service_id', serviceId)
        .delete();

      if (affectedRows === 0) {
        return response.status(404).json({ message: 'Serviço não encontrado' });
      }

      return response.json({ message: 'Serviço excluído com sucesso' });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir serviço ' + error });
    }
  }

  async show({ params, request, response }) {
    const { name, client_id, page, perPage } = request.get();
  
    const serviceQuery = Database
      .table('services')
      .select('*')
      .where('service_id', 'LIKE', `%${params.id}%`)
      .first();
  
    const service = await serviceQuery;
  
    if (!service) {
      return response.status(404).json({ error: 'Service not found' });
    }
  
    const clientQuery = Database
      .table('clients')
      .select('*')
      .where('client_id', '=', service.client)
      .first();
  
    const client = await clientQuery;
  
    // if (!client) {
    //   return response.status(404).json({ error: 'Client not found' });
    // }
  
  
    return {
      service,
      client
    };
  }
  

  async index({ request, response }) {
    try {
      const page = request.input('page', 1);
      const perPage = request.input('perPage', 10);
      const id = request.input('id', '');
      const dateBegun = request.input('datebegun', '');
      const dateEnd = request.input('dateend', '');
      const tag = request.input('tag', '');
  
      let query = Service.query()
        .select('services.*', 'clients.name as client_name', 'clients.street as street', 'clients.number as number', 'clients.neighborhood as neighborhood', 'clients.CEP as CEP', 'clients.state as state' , 'clients.city as city'  )
        .leftJoin('clients', 'services.client', 'clients.client_id')
  
      // if (id && id.trim() !== '') {
      //   query = query
      //     .where('services.client', id)
      //     .orWhere('service_id', id)
      //     .orWhere('title', id);
      // }
  
      if (dateBegun && dateEnd) {
        query = query.whereBetween('date', [dateBegun, dateEnd]);
      }
  
      if (tag && tag.trim() !== '') {
        query = query.where('tag', tag);
      }
  
      const services = await query.paginate(page, perPage);
  
      if (services.rows.length === 0) {
        return response.status(404).json({ message: 'Atendimento não encontrado' });
      }
  
      return response.json({ services });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar registro de atendimento', error: error.message });
    }
  }  

  async indexo({ params, request, response }) {
    try {
      const page = request.input('page', 1);
      const perPage = request.input('perPage', 10);
      const id = request.input('id', 10);
  
      let query = Service.query()
        .select('services.*', 'clients.*')
        .innerJoin('clients', 'services.client', 'client_id')
  
      if (id && id.trim() !== '') {
        query = query
          .where('service_id', id)
          .orWhere('title', id);
      }
  
      const services = await query.paginate(page, perPage);
  
      if (services.rows.length === 0) {
        return response.status(404).json({ message: 'Atendimento não encontrado' });
      }
  
      return response.json({ services });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar registro de atendimento', error: error.message });
    }
  }

}

module.exports = ServiceController
