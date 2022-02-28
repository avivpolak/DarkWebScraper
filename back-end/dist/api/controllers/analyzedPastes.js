"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastesByQuery = exports.getLabelsStatistics = exports.getCount = exports.deleteAllPastes = exports.getPagesPastes = void 0;
const actions_1 = require("../../prisma/utils/paste/actions");
const getPagesPastes = async (req, res) => {
    try {
        const page = Number(req.sanitize(req.query.page)) || 0;
        const pasetsPerPage = Number(req.sanitize(req.query.pasetsPerPage)) || 10;
        if (pasetsPerPage > 200)
            return res.status(403).send('"Pasets per page" is too large'); //against data thieth
        const pagesPastes = await (0, actions_1.getPagesPastesFromDb)(page, pasetsPerPage);
        if (pagesPastes) {
            return res.status(200).json(pagesPastes);
        }
        else {
            return res.status(204).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getPagesPastes = getPagesPastes;
const deleteAllPastes = async (req, res) => {
    try {
        await (0, actions_1.deleteAllPastesFromDb)();
        return res.status(204).send("deleted");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.deleteAllPastes = deleteAllPastes;
const getCount = async (req, res) => {
    try {
        const count = await (0, actions_1.countAllItems)();
        return res.status(200).json(count);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getCount = getCount;
const getLabelsStatistics = async (req, res) => {
    try {
        const statistics = await (0, actions_1.getLabelsStatisticsFromDb)();
        console.log(statistics);
        if (statistics) {
            return res.status(200).json({ data: statistics });
        }
        else {
            return res.status(204).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getLabelsStatistics = getLabelsStatistics;
const getPastesByQuery = async (req, res) => {
    try {
        const query = req.sanitize(req.params.query);
        const pastes = await (0, actions_1.getPastesByQueryFromDb)(query);
        if (pastes.length > 0) {
            return res.status(200).json({ data: pastes });
        }
        else {
            return res.status(204).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getPastesByQuery = getPastesByQuery;
//# sourceMappingURL=analyzedPastes.js.map