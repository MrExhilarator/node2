const { v4: uuidv4 } = require('uuid');

const { authSchema, updateSchema } = require('../helpers/validationSchema');

let users = [
    {
        'id': '1',
        'login': 'xxx',
        'password': 'xxx',
        'age': 10,
        'isDeleted': false
    }
];

const getUsers = (request, response) => {
    users = users.filter((user) => user.isDeleted === false);
    response.send(users);
};

const createUser = async (request, response) => {
    try {
        const result = await authSchema.validateAsync(request.body);

        users.push({ id: uuidv4(), ...result, isDeleted: false });

        response.send(`user with login name ${result.login} added!`);
    } catch (error) {
        response.status(400);
        response.send(`Bad Request error: ${error.message}`);
    }
};

const getUserById = (request, response) => {
    const { id } = request.params;

    users = users.filter((user) => user.isDeleted === false);
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
        response.send(foundUser);
    } else {
        response.send(`User with Id : ${id} not found`);
    }
};

const deleteUser = (request, response) => {
    const { id } = request.params;

    users = users.filter((user) => user.isDeleted === false);
    const userToBeDeleted = users.find((user) => user.id === id);
    if (userToBeDeleted) {
        userToBeDeleted.isDeleted = true;
        response.send(`User with Id : ${id} is deleted`);
    } else {
        response.send(`User with Id : ${id} not found`);
    }
};

const updateUser = async (request, response) => {
    const { id } = request.params;

    const user = users.find((user) => user.id === id);
    if (user) {
        try {
            const result = await updateSchema.validateAsync(request.body);
            if (result.login) {
                user.login = result.login;
            }
            if (result.password) {
                user.password = result.password;
            }
            if (result.age) {
                user.age = result.age;
            }
            response.send(`User with id : ${id} has been updated`);
        } catch (error) {
            response.status(400);
            response.send(`Bad Request error:${error.status} - ${error.message}`);
        }
    } else {
        response.send(`Id : ${id} not found`);
    }
};

const getAutoSuggestUsers = (request, response) => {
    const { loginSubString, limit } = request.params;

    const suggestedUsers = users.filter((user) => user.login.includes(loginSubString)).slice(0, limit);

    if (suggestedUsers.length === 0) {
        response.send('Cannot find users with applied filters');
    } else {
        response.send(suggestedUsers);
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    getAutoSuggestUsers
};
