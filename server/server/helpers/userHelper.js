const db = require('../../models');
const tb_user = db.user;
const tb_item = db.item;

const fileName = 'server/helpers/userHelper.js';

const getUserList = async () => {
    try {
        const users = await tb_user.findAll({
            include: {
                model: tb_item,
                as: 'articleItems'
            }
        });

        return Promise.resolve(users)
    } catch (error) {
        console.log([fileName, 'getUserList', 'ERROR'], { info: `${error}` });
        return Promise.reject([]);    
    }
};

const getUserListByRole = async (role) => {
    try {
        const users = await tb_user.findAll({
            where: {
                role: role
            }
        });

        return Promise.resolve(users)
    } catch (error) {
        console.log([fileName, 'getUserListByRole', 'ERROR'], { info: `${error}` });
        return Promise.reject([]);    }
};

const getUserDetail = async (id) => {
    try {
        const user = await tb_user.findOne({
            where: {
                id: id
            }
        });

        return Promise.resolve(user);
    } catch (error) {
        console.log([fileName, 'getUserDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject([]); 
    }
};

const updateDataUser = async (dataObject) => {
    const { id, email, password, username, address, phone, role } = dataObject;

    try {
        await tb_user.update({
            email: email,
            password: password,
            username: username,
            address: address,
            phone: phone,
            role: role,
        }, {
            where: {
                id: id
            }
        });

        const user = await tb_user.findOne({
            where: {
                id: id
            }
        });

        return Promise.resolve(user);
    } catch (error) {
        console.log([fileName, 'updateDataUser', 'ERROR'], { info: `${error}` });
        return Promise.resolve([]);    
    }
};

const deleteDataUser = async (id) => {
    try {
        await tb_user.destroy({ 
            where: {
                id: id
            }
        });

        const users = await tb_user.findAll();

        return Promise.resolve(users)
    } catch (error) {
        console.log([fileName, 'deleteDataUser', 'ERROR'], { info: `${error}` });
        return Promise.resolve([]);    
    }
};

module.exports = {
    getUserList,
    getUserListByRole,
    getUserDetail,
    updateDataUser,
    deleteDataUser
}