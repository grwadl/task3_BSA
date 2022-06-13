const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    signUp(user){
        const users = UserRepository.getAll();
        const isUsed = users.find(item=>item.phoneNumber===user.phoneNumber||item.email===user.email)
        if(!isUsed) {
            UserRepository.create(user);
            return false;
        }
        else
            return true;
    }
    changeInfo(id,user){
        UserRepository.update(id,user)
    }

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();