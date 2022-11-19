import { Request, Response } from "express";
import { json } from "sequelize";
import { TutorModel } from "../models/tutor.model";

export const getTutores = async (req: Request, res: Response) => {
    try {
        const tutores = await TutorModel.findAll();
        res.json(tutores);
    } catch (error) {
        return res.status(500).json({ message: "error" });
    }
};

export const getTutor = async (req: Request, res: Response) => {
 try {
    const {idTutor}=req.params
   const tutor = await TutorModel.findOne({
    where:{
        idTutor,
    },
   })
   res.json(tutor)

 } catch (error) {
    return res.status(500).json({ message: "error" });
 }

}



export const createTutores = async (req: Request, res: Response) => {
    const { nombre, email, username, password } = req.body

    try {
        const newTutor = await TutorModel.create({
            nombre,
            email,
            username,
            password
        })
        res.json(newTutor)

    } catch (error) {
        return res.status(500).json({ message: "error.message" });
    }
};


export const updateTutores = async (req: Request, res: Response) => {
    try {
        const {idTutor} = req.params;
    const {nombre,email,username,password} = req.body;
    const entity = await TutorModel.findByPk(idTutor);
    entity?.update({nombre,email,username,password});

    res.json(entity);
    } catch (error) {
        return res.status(500), json({ message: "error al actualizar" })
    }
};



export const deleteTutores = async (req: Request, res: Response) => {
    try {
        const { idTutor } = req.params;
        await TutorModel.destroy({
            where: {
                idTutor
            },
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500), json({ message: "error al eliminar" })
    }
};






