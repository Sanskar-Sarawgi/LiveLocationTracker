import db from '../models/index.js';
import { Op, where } from "sequelize";

const {userAccount, teamManager, teamUser} = db

export const isValidChild = async (child_uuid) => {

    const child_inst = await userAccount.findOne({
        where: {
            uuid: child_uuid,
            qr_code: null
        }
    })

    return child_inst != undefined && child_inst != null
}

export const isValidParent = async (parent_uuid) => {
    const parent_inst = await userAccount.findOne(
        {
            where: {
                uuid: parent_uuid,
                qr_code: {
                    [Op.ne]: null
                }
            }
        })

    return parent_inst != undefined && parent_inst != null
}

export const isValidUser = async (user_account_uuid) => {
    const user_account_inst = await userAccount.findByPk(user_account_uuid)

    return user_account_inst != undefined && user_account_inst != null
}

export const allChild = async (parent_uuid) => {
    const team_managers_inst = await teamManager.findAll(
        {
            where: {
                user_account_uuid: parent_uuid
            },
            attributes: ['team_uuid'],
        })

        
    let team_uuid_list = []
    team_managers_inst.forEach(async team_manager_inst => { team_uuid_list.push(team_manager_inst.team_uuid) })

    const child_uuid = (await teamUser.findAll(
        {
            where: {
                team_uuid: team_uuid_list
            },
            attributes: ['user_account_uuid'],
        })).map((e) => e.user_account_uuid)

    return child_uuid
}

export const isChildMapped = (parent_uuid, child_uuid) => {
    return allChild(parent_uuid).some(e => e == child_uuid)
}