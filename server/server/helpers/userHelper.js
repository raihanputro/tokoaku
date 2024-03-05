const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');
const bcryptPass = require('../utils/bcryptPass');

const fileName = 'server/helpers/userHelper.js';

const getUserList = async () => {
    try {
        const users = await db.user.findAll({
            attributes: ['id', 'email', 'username', 'fullName', 'role', 'photo']
        });

        if(_.isEmpty(users)) {
            return Promise.resolve({ 
                statusCode: 404,
                message: "User lists is empty!",
            });   
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get users list successfully!",
            data: users 
        });
    } catch (error) {
        console.log([fileName, 'getUserList', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getUserDetail = async (id) => {
    try {
        const userDetail = await db.user.findOne({
            where: {
                id: id
            }
        });

        if(_.isEmpty(userDetail)) {
            return Promise.reject(Boom.notFound(`Cannot find user detail with id ${id}!`));
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "Get user detail successfully!",
            data: userDetail 
        });
    } catch (error) {
        console.log([fileName, 'getUserDetail', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const getProfileUser = async (id) => {
    try {
         const user = await db.user.findOne({
             where: {
                 id: id
             }
         });

        if (_.isEmpty(user)) {
            return Promise.reject(Boom.notFound(`Cannot find profile user by this id!`));
        }
 
        return Promise.resolve({ 
            statusCode: 200,
            message: "Get profile successfully!",
            data: user 
        });   
    } catch (error) {
     console.log([fileName, 'profileUser', 'ERROR'], { info: `${error}` });
     return Promise.reject(GeneralHelper.errorResponse(error));
    }
 };

const updateProfileUser = async (dataObject) => {
    const { id, username, fullName, address, province_id, city_id, phone, photo } = dataObject;

    try {
        const checkUser= await db.user.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.notFound(`Cannot find user with id ${id}!`));
        } else {
            await db.user.update({
                username: username || checkUser.dataValues.username,
                fullName: fullName || checkUser.dataValues.fullName,
                address: address || checkUser.dataValues.address,
                province_id: province_id || checkUser.dataValues.province_id,
                city_id: city_id || checkUser.dataValues.city_id,
                phone: phone || checkUser.dataValues.phone,
                photo: photo || checkUser.dataValues.photo
            }, {
                where: {
                    id: id
                }   
            });
    
            const user = await db.user.findOne({
                where: {
                    id: id
                }
            });
    
            return Promise.resolve({ 
                statusCode: 200,
                message: "Get update data user successfully!",
                data: user 
            });     
        };
    } catch (error) {
        console.log([fileName, 'updateDataUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const changePassword = async ( dataObject ) => {
    const { user_id, oldPassword, newPassword } = dataObject;

    try {
        const checkUser = await db.user.findOne({
            where: {
                id: user_id
            }
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.unauthorized('You are unauthorized!'));
        };

        const isPassMatch = bcryptPass.comparePass(oldPassword, checkUser.password);

        if (!isPassMatch) {
            return Promise.reject(Boom.badRequest('Wrong Old Password'))
        };

        const hashedPass = bcryptPass.hashPass(newPassword);

        await db.user.update({
            password: hashedPass
        }, {    
            where: {
                id: user_id
            }
        });

        return Promise.resolve({ 
            statusCode: 200,
            message: "Change password successfully!",
        });       
    } catch (error) {
        console.log([fileName, 'changePassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    };
};

const deleteDataUser = async (id) => {
    try {
        const checkUser = await db.user.findOne({
            where: {
                id: id
            }
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.notFound(`Cannot find user with id ${id}!`));
        } else {
            await db.user.destroy({
                where: {
                    id: id
                }
            });
        };

        return Promise.resolve({ 
            statusCode: 200,
            message: "delete user successfully!",
        });
    } catch (error) {
        console.log([fileName, 'deleteDataUser', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

module.exports = {
    getUserList,
    getUserDetail,
    getProfileUser,
    updateProfileUser,
    changePassword,
    deleteDataUser
}