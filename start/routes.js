'use strict'

const Route = use('Route')

Route.get('/', (res) => {
  return { greeting: 'hehe :)' }
})

//users
Route.post('/users', 'UserController.store')
Route.post('/sessions', 'SessionController.create')
Route.put('/sessions', 'SessionController.refreshToken')
Route.post('/sessions/check', 'SessionController.checkToken')

//client

Route.post('/clients', 'ClientController.store').middleware(['auth:jwt'])
Route.get('/clients/search', 'ClientController.search').middleware(['auth:jwt'])
Route.get('/clients/cpf', 'ClientController.searchCPF').middleware(['auth:jwt'])
Route.get('/clients/searchs/:client_id', 'ClientController.show').middleware(['auth:jwt'])
Route.put('/clients/edit/:client_id', 'ClientController.update').middleware(['auth:jwt'])
Route.delete('/clients/delete/:client_id', 'ClientController.destroy').middleware(['auth:jwt'])


//service

Route.get('/services/all', 'ServiceController.index').middleware(['auth:jwt'])
Route.get('/services/search/:id', 'ServiceController.show').middleware(['auth:jwt'])
Route.post('/services', 'ServiceController.create').middleware(['auth:jwt'])
Route.put('/services/dispatch/:service_id', 'ServiceController.dispatch').middleware(['auth:jwt'])
Route.put('/services/edit/:service_id', 'ServiceController.update').middleware(['auth:jwt'])
Route.delete('/services/delete/:service_id', 'ServiceController.destroy').middleware(['auth:jwt'])

Route.get('/historics/search/', 'HistoricController.search').middleware(['auth:jwt'])

// Rotas para FamilyController
// Route.post('/families', 'FamilyController.create');
// Route.put('/families/:family_id', 'FamilyController.update');
// Route.delete('/families/:family_id', 'FamilyController.destroy');
// Route.get('/families/:family_id', 'FamilyController.show');

// Rotas para AddressController
// Route.post('/address', 'AddressController.create');
// Route.put('/address/:address_id', 'AddressController.update');
// Route.delete('/address/:address_id', 'AddressController.destroy');
// Route.get('/address/search', 'AddressController.search');

// Route.post('/kinships', 'KinshipController.create');
// Route.get('/kinships/search/:id', 'KinshipController.show');
// Route.put('/kinships/:id', 'KinshipController.update');
// Route.delete('/kinships/:id', 'KinshipController.destroy');

// .middleware(['auth:jwt', 'is:manager']).validator(new Map([
//   [['users.store'], ['User']], [['users.update'], ['User']]
// ]))

// Route.resource('clients', 'ClientController').apiOnly()

// .middleware(['auth:jwt', 'is:manager']).validator(new Map([
//   [['clients.store'], ['Client']], [['clients.update'], ['Client']]
// ]))

// Route.resource('exercises', 'ExerciseController').apiOnly().middleware(['auth:jwt', 'can:gerenc_exercises', 'audit']).validator(new Map([
//   [['exercises.store'], ['Exercise']], [['exercises.update'], ['Exercise']]
// ]))

// Route.resource('trainings', 'TrainingController').apiOnly().middleware(['auth:jwt', 'can:gerenc_trainings', 'audit']).validator(new Map([
//   [['trainings.store'], ['Training']], [['trainings.update'], ['Training']]
// ]))

// Route.resource('permissions', 'PermissionController').apiOnly().middleware(['auth:jwt', 'is:manager']).validator(new Map([
//   [['permissions.store'], ['NameSlug']], [['permissions.update'], ['NameSlug']]
// ]))

// Route.resource('roles', 'RoleController').apiOnly().middleware(['auth:jwt', 'is:manager']).validator(new Map([
//   [['roles.store'], ['NameSlug']], [['roles.update'], ['NameSlug']]
// ]))

// Route.resource('products', 'ProductController').apiOnly().middleware(['auth:jwt', 'is:manager']).validator(new Map([
//   [['products.store'], ['Product']], [['products.update'], ['Product']]
// ]))
