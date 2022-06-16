const Boom = require('@hapi/boom')
const { sequelize: db } = require('../db');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Get smoothies by user',
            tags: ['api'],
        },
        handler: async function (request, h) {
            let userId = Number(request.state.userId);
            
            if (!userId) {
                return 'You have no yet created any smoothies!'
            }

            let smoothies = db.models.Smoothie.findAll({ 
                where: { userId }
            })
            
            return smoothies;
        }
    },
    {
        method: 'POST',
        path: '/smoothie',
        options: {
            description: 'Add new smoothie recipe',
            tags: ['api'],
        },
        handler: async function (request, h) {
            //TODO Add Joi validation
            const { name, ingredients } = request.payload;

            let userId = Number(request.state.userId) // Value should be coerced into Number anyway, but casting just in case

            if (!userId) {
                let user;
                try {
                    user = await db.models.User.create() // Add new user to DB
                } catch (e) {
                    return new Boom.Boom(e)
                }
                userId = user.toJSON().id
                h.state('userId', String(userId)) // set cookie
            }

            try {
                await db.models.Smoothie.create({
                    ingredients,
                    name,
                    userId: userId
                })

            } catch (e) {
                if (e.name == 'SequelizeUniqueConstraintError') {
                    return `Smoothie name "${name}" is already taken, please choose another`;
                }
                return new Boom.Boom(e)
            }
            
            return `Successfully create smoothie recipe named ${name}`;
        }
    },
    {
        method: 'PUT',
        path: '/smoothie/{id}',
        options: {
            description: 'Update smoothie recipe',
            tags: ['api'],
        },
        handler: async function (request, h) {
            //TODO Add Joi validation
            const { id: smoothieId } = request.params;
            const { name, ingredients } = request.payload;

            let userId = Number(request.state.userId) 

            if (!userId) {
                return 'You do not have any smoothies to delete!'
            }

            let smoothie
            try {
                smoothie = await db.models.Smoothie.update({
                    ingredients,
                    name,
                    userId: userId
                }, {
                    where: {
                        userId,
                        id: smoothieId
                    },
                    returning: true
                })
            } catch (e) {
                if (e.name == 'SequelizeUniqueConstraintError') {
                    return `Smoothie name "${name}" is already taken, please choose another`;
                }
                return new Boom.Boom(e)
            }
            
            return {
                message: `Successfully updated smoothie recipe named ${name}`,
                body: smoothie
            };
        }
    },
    {
        method: 'DELETE',
        path: '/smoothie',
        options: {
            description: 'Delete a users\'s smoothie',
            tags: ['api'],
        },
        handler: async function (request, h) {
            //TODO Add Joi validation
            //TODO Inform user when attempting to delete a smoothie that doesn't exist.
            const { smoothieId } = request.payload;
            let userId = Number(request.state.userId) // Value should be coerced into Number anyway, but casting just in case

            
            if (!userId) {
                return 'You do not have any smoothies to delete!'
            }
            
            let deletionResult
            try {
                deletionResult = await db.models.Smoothie.destroy({
                    where: {
                        id: smoothieId,
                        userId
                    }
                })
            } catch (e) {
                return new Error(e)
            }


            return `Deleted smoothie ${smoothieId}`;
        }
    },
]

exports.routes = (server) => server.route(routes);