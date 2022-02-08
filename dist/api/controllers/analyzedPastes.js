"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastesByQuery = exports.deleteAllPastes = exports.getAllPastes = void 0;
const actions_1 = require("../../prisma/utils/actions");
const getAllPastes = async (req, res) => {
    try {
        const allPastes = await (0, actions_1.getAllPastesFromDb)();
        if (allPastes) {
            return res.status(200).send(allPastes);
        }
        else {
            return res.status(404).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getAllPastes = getAllPastes;
const deleteAllPastes = async (req, res) => {
    try {
        await (0, actions_1.deleteAllPastesFromDb)();
        return res.status(404).send("deleted");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.deleteAllPastes = deleteAllPastes;
const getPastesByQuery = async (req, res) => {
    try {
        const { query } = req.params;
        const pastes = await (0, actions_1.getPastesByQueryFromDb)(query);
        if (pastes.length > 0) {
            return res.status(200).send(pastes);
        }
        else {
            return res.status(404).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getPastesByQuery = getPastesByQuery;
