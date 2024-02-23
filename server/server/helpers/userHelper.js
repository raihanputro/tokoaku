const Boom = require('boom');
const _ = require('lodash');

const db = require('../../models');
const GeneralHelper = require('../helpers/generalHelper');

const fileName = 'server/helpers/userHelper.js';

const getUserList = async () => {
    try {
        const users = await db.user.findAll({
            include: {
                model: db.item,
                as: 'item'
            }
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
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const changePassword = async ( dataObject, res ) => {
    const { email, new_password, confirm_password } = dataObject;

    try {
        const checkPassword = comparePass(new_password, confirm_password);

        if (!_.isEmpty(checkPassword)) {
            return Promise.reject(Boom.badRequest('Wrong confirm password!'));
        };


        const hashedPass = hashPass(new_password);

        await tb_user.update({
            password: hashedPass
        }, {    
            where: {
                email: email
            }
        });

        const updatedUser = await tb_user.findOne({
            where: {
                email: email
            }
        });

        return Promise.resolve(updatedUser);    
    } catch (error) {
        console.log([fileName, 'changePassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    };
};

const getOtpForgotPassword = async (dataObject) => {
    const { email } = dataObject;

    try {
        const checkUser = await tb_user.findOne({
            where: {
                email: email
            },
        });

        if (_.isEmpty(checkUser)) {
            return Promise.reject(Boom.notFound('This email not registered!'));
        };

        const codeOtp = generateOtpCode()
        console.log(codeOtp)

        await tb_codeOtp.create({
            email: email,
            code: codeOtp
        }, {    
            where: {
                email: email
            }
        });

        const updatedOtp = await tb_codeOtp.findOne({
            where: {
                email: email
            }
        });

        return Promise.resolve(updatedOtp);    
    } catch (error) {
        console.log([fileName, 'getOtpForgotPassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
};

const resetPassword = async (dataObject) => {
    const { email, code_otp, new_password, confirm_password } = dataObject;

    try {
        const checkCodeOtp = await tb_codeOtp.findOne({
            where: {
                email: email,
                code: code_otp
            },
        });

        if (_.isEmpty(checkCodeOtp)) {
            return Promise.reject(Boom.notFound('Code otp not found!'));
        };

        const checkPassword = comparePass(new_password, confirm_password);

        if (new_password !== confirm_password) {
            return Promise.reject(Boom.badRequest('Wrong confirm password!'));
        };

        const hashedPassword = hashPass(new_password);

        await tb_user.update({
            password: hashedPassword
        }, {
            where: {
                email: email
            }
        });

        await tb_codeOtp.destroy({
            where: {
                code: code_otp
            }
        });

        return Promise.resolve(true);    
    } catch (error) {
        console.log([fileName, 'resetPassword', 'ERROR'], { info: `${error}` });
        return Promise.reject(GeneralHelper.errorResponse(error));
    }
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
    updateDataUser,
    deleteDataUser
}