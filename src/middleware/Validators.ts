const { check, param, query } = require('express-validator');
import { ErrorMessage } from '../helper/ErrorMessage';
import { body } from 'express-validator';





export let checkQuery = (id) => {
    return query(id, ErrorMessage.id.required).isLength({ min: 1 })
        .trim()
        .exists()
}


export let checkParam = (id) => {
    return param(id, ErrorMessage.id.required)
        .trim()
        .exists()
}

export let checkRequestBodyParams = (val) => {
    return body(val, ErrorMessage.general.required).isLength({ min: 1 })
        .trim()
        .exists().withMessage(ErrorMessage.general.required)
}
