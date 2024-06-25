'use strict'

const Client = use('App/Models/Client')

const Database = use('Database')
const Kinship = use('App/Models/Kinship')

class ClientController {
  async index() {
    return await Client.all()
  }

  // async show({ params }) {
  //   const client = await Client.findOrFail(params.client_id)
  //   const address = await client.address().fetch()
  //   return address

  // }

  async show({ params, response }) {
    const clientId = params.id
    try {
      const client = await Database
        .table('clients')
        .select('clients.*',  'users.*')
        .leftJoin('users', 'clients.user', 'users.user_id')
        .where('clients.client_id', clientId)
        .first()
      if (!client) {
        return response.status(404).json({ message: 'Cliente não encontrado.' })
      }
      return {
        client
      }
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar cliente.' })
    }
  }

  async store({ request, response }) {
    const {
      name,
      birthday,
      RG,
      CPF,
      maritial_status,
      phone,
      email,
      user,
      mother_name,
      already,
      welfare_state,
      welfare_state_type,
      genre,
      family,
      street,
      number,
      complement,
      CEP,
      reference,
      neighborhood,
      city,
      state
    } = request.all()

    let trx

    try {
      trx = await Database.beginTransaction()

      const clientData = {
        name,
        birthday,
        RG,
        CPF,
        maritial_status,
        phone,
        email,
        user,
        mother_name,
        already,
        welfare_state,
        welfare_state_type,
        genre,
        family,
        street,
        number,
        complement,
        CEP,
        reference,
        neighborhood,
        city,
        state
      }

      const insertedClient = await Client.create(clientData, trx)

      // if (kinships && kinships.length > 0) {
      //   // Associar os parentescos com o cliente recém-criado
      //   await Promise.all(kinships.map(async (kinship) => {
      //     await Kinship.create({
      //       client: insertedClient.client_id,
      //       kinship_type: kinship.kinship_type,
      //       kin: kinship.kin,
      //     }, trx)
      //   }))
      // }

      await trx.commit()

      return response.status(201).json({
        message: 'Cadastro efetuado com sucesso',
      })
    } catch (error) {
      if (trx) {
        await trx.rollback()
      }

      return response.status(500).json({ message: 'Erro ao efetuar o cadastro' })
    }
  }

  async storeds({ request, response }) {
    const {
      name,
      birthday,
      RG,
      CPF,
      maritial_status,
      phone,
      email,
      user,
      mother_name,
      already,
      welfare_state,
      welfare_state_type,
      genre,
      family,
      street,
      number,
      complement,
      CEP,
      reference,
      neighborhood,
      city,
      state
    } = request.all()

    let trx

    try {
      trx = await Database.beginTransaction()

      const clientData = {
        name,
        birthday,
        RG,
        CPF,
        maritial_status,
        phone,
        email,
        user,
        mother_name,
        already,
        welfare_state,
        welfare_state_type,
        genre,
        family,
        street,
        number,
        complement,
        CEP,
        reference,
        neighborhood,
        city,
        state
      }

      const insertedClient = await Client.create(clientData, trx)

      // if (kinships && kinships.length > 0) {
      //   // Associar os parentescos com o cliente recém-criado
      //   await Promise.all(kinships.map(async (kinship) => {
      //     await Kinship.create({
      //       client: insertedClient.client_id,
      //       kinship_type: kinship.kinship_type,
      //       kin: kinship.kin,
      //     }, trx)
      //   }))
      // }

      await insertedClient.save()

      return response.status(201).json({
        id: insertedClient.id,
        message: 'Cadastro efetuado com sucesso',
      })
    } catch (error) {
      if (trx) {
        await trx.rollback()
      }

      return response.status(500).json({ message: 'Erro ao efetuar o cadastro' })
    }
  }

  async update({ params, request, response }) {
    const { client_id } = params
    const {
      name,
      birthday,
      RG,
      CPF,
      maritial_status,
      phone,
      email,
      user,
      mother_name,
      already,
      welfare_state,
      welfare_state_type,
      genre,
      family,
      street,
      number,
      complement,
      CEP,
      reference,
      neighborhood,
      city,
      state
    } = request.only([
      "name",
      "birthday",
      "RG",
      "CPF",
      "maritial_status",
      "phone",
      "email",
      "user",
      "mother_name",
      "already",
      "welfare_state",
      "welfare_state_type",
      "genre",
      "family",
      "street",
      "number",
      "complement",
      "CEP",
      "reference",
      "neighborhood",
      "city",
      "state"
    ])

    try {
      const client = await Client.findByOrFail('client_id', client_id)

      client.name = name
      client.birthday = birthday
      client.maritial_status = maritial_status
      client.RG = RG
      client.CPF = CPF
      client.phone = phone
      client.email = email

      client.name = name
      client.birthday = birthday
      client.RG = RG
      client.CPF = CPF
      client.maritial_status = maritial_status
      client.phone = phone
      client.email = email
      client.user = user
      client.mother_name = mother_name
      client.already = already
      client.welfare_state = welfare_state
      client.welfare_state_type = welfare_state_type
      client.genre = genre
      client.family = family
      client.street = street
      client.number = number
      client.complement = complement
      client.CEP = CEP
      client.reference = reference
      client.neighborhood = neighborhood
      client.city = city
      client.state = state
      await client.save()

      return response.json({ message: 'Beneficiado atualizado com sucesso' })
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao atualizar beneficiado ' + error })
    }
  }

  async searchCPF({ params, request, response }) {
    try {
      const page = request.input('page', 1);
      const perPage = request.input('perPage', 10);
      const id = request.input('id', '');

      if (!id) {
        return response.status(400).json({ message: 'CPF não fornecido' });
      }

      let query = Client.query()
        .select('clients.*')
      query = query.where('clients.CPF', id);

      const client = await query.paginate(page, perPage);

      if (client.rows.length === 0) {
        return response.status(404).json({ message: 'CPF não encontrado' });
      }
      return response.json({ client });
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao buscar registro de atendimento', error: error.message });
    }
  }

  async search({ params, request, response }) {
    try {
      const page = request.input('page', 1);
      const perPage = request.input('perPage', 10);
      const id = request.input('id', 10);

      let query = Client.query()
        .select('clients.*') // Include client's name and address 

      if (id && id.trim() !== '') {
        query = query
          .where('clients.client_id', id)
          .orWhere('client_id', id)
          .orWhere('CPF' , id)
          .orWhere('RG', id)
          .orWhere('name', 'LIKE', `%${id}%`);
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

  async search2({ request }) {
    const { name, client_id, page, perPage } = request.get();

    let clientsQuery = Database.table('clients');

    if (name && name.trim() !== '') {
      clientsQuery = clientsQuery.where('name', 'LIKE', `%${name}%`);
    }

    if (client_id) {
      clientsQuery = clientsQuery.where('client_id', client_id);
    }

    const totalResults = await clientsQuery.clone().count('* as total');
    const total = totalResults[0].total;
    const totalPages = Math.ceil(total / perPage);

    const startIndex = (page - 1) * perPage;

    const paginatedResults = await clientsQuery.offset(startIndex).limit(perPage);

    return {
      data: paginatedResults,
      currentPage: page,
      totalPages,
      totalResults: total,
    };
  }


  async destroy({ params, response }) {
    const { client_id } = params

    try {
      const client = await Client.findByOrFail('client_id', client_id)
      await client.delete()

      return response.json({ message: 'Cliente excluído com sucesso' })
    } catch (error) {
      return response.status(500).json({ message: 'Erro ao excluir cliente ' + error })
    }
  }

}


module.exports = ClientController