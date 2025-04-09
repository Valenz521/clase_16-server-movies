// const { where } = require("sequelize");
const User = require("../models/user.model");
const { Op } = require("sequelize");


const index = async (req, res) => {
    try {
    const users = await User.findAll();
    if (users.length === 0) {
    return res.status(404).json({
    status: false,
    msg: 'No hay usuarios registrados en la base de datos.',
    users: []
    });
    }
    return res.status(200).json({
    status: true,
    msg: 'Listado de usuarios obtenido correctamente.',
    users: users
    });
    } catch (error) {
    return res.status(500).json({
    status: false,
    msg: `Error al obtener los usuarios. ${error.message}`,
    users: null
    });
    }
    };
    

const create = async (req, res) => {
        try {
        console.log(req.body);
        //const user = await User.create(req.body);
const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body,
    });
    if (!created) {
    return res.status(409).json({
    status: false,
    msg: "Email ya existe en otro usuario. No se puede crear.",
    data: null,
    });
    }
    return res.status(201).json({
    status: true,
    msg: "Usuario creado de forma correcta",
    data: user,
    });
    } catch (error) {
    return res.status(500).json({
    status: false,
    msg: `Error al crear un usuario: ${error.message}`,
    data: null,
    });
    }
    };


const destroy = async(req, res) => {
        try {
        const idUser = req.params.id;
        const user = await User.findByPk(idUser);
        if (!user) {
        return res.status(404).json({
        status: false,
        msg: `Usuario a eliminar con el id: ${idUser}, no encontrado en base de
        datos.`,
        data: null,
        });
        }
        await user.destroy();
        return res.status(200).json({
        status: true,
        msg: `Usuario con el id: ${idUser}, eliminado de forma correcta`,
        });
        } catch (error) {
        return res.status(500).json({
        status: false,
        msg: `Error al eliminar un usuario: ${error.message}`,
    });
}
};


const update = async (req, res) => {
    try {
    /** Captura el ID desde la URL */
    const idUser = req.params.id;
    const user = await User.findByPk(idUser);
    if (!user) {
    return res.status(404).json({
    status: false,
    msg: `Usuario a actualizar con el id: ${idUser}, no encontrado en base de
    datos.`,
    data: null,
    });
    }
    /** validar que el correo no exista en otro usuario */
    const emailExist = await User.findOne({
    where: { email: req.body.email, id: { [Op.ne]: idUser } },
    });
    if (emailExist) {
    return res.status(409).json({
    status: false,
    msg: "Email ya existe en otro usuario. No se puede crear.",
    data: null,
    });
    }
    /** De lo contrario almacenar el usuario */
    const userUpdate = await User.update(req.body, {
    where: { id: idUser },
});
const userUpdated = await User.findByPk(idUser);
    return res.status(200).json({
    status: true,
    msg: `Usuario con el id: ${idUser}, actualizado de forma correcta`,
    data: userUpdated,
});
    } catch (error) {
    return res.status(500).json({
    status: false,
    msg: `Error al actualizar un usuario: ${error.message}`,
    data: null,
    });
    }
};


const show = async (req, res) => {
    try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
    return res.status(404).json({
    status: false,
    msg: `Usuario con el id: ${id}, no encontrado en base de datos.`,
    data: null,
    });
    }
    return res.status(200).json({
    status: true,
    msg: "Usuario encontrado de forma correcta",
    data: user,
    });
    } catch (error) {
    return res.status(500).json({
    status: false,
    msg: `Error al consultar un usuario: ${error.message}`,
    data: null,
    });
    }
};


module.exports = {
    index,
    create,
    destroy,
    update,
    show,
};