'use strict'
const User = use('App/Models/User');
const Token = use('App/Models/Token');
const Database = use('Database');

class SessionController {

  async create({ request, auth }) {
    const { username, password } = request.all();
  
    const token = await auth.withRefreshToken().attempt(username, password);

    const user = await User.query().where('username', username).first();
    if (!user) {
      return response.status(401).send({ message: 'Usuário não encontrado' });
    }
  
    const { id: user_id, name, username: user_username, email } = user;

    const tokenEntry = await Token.query().where('user_id', user_id).last()

    const userToken = await User.query().where('id', user_id).last()
  
    return { token , tokenEntry , userToken };
  }

  async checkToken({ request, auth }) {
    const { token } = request.all();
  
    const Token = use('App/Models/Token');
  
    //const tokenCheck = await auth.checkToken(token)
  
    const tokenEntry = await Token.query().where('token', token).last();
  
    if (!tokenEntry) {
      return 'false';
    }
  
    if (tokenEntry.is_revoked === 1) {
      return 'false';
    } else {
      return 'true';
    }
  }
  
  async refreshToken ({ request, auth }) {
    
    //const { username, password } = request.all();
    const refreshToken = request.input('refresh_token')
    
    //await Token.query()
    //.where('user_id', user_id)
    //.update({ is_revoked: 1 });
    
    return await auth.newRefreshToken().generateForRefreshToken(refreshToken, true)
  } 
}

module.exports = SessionController