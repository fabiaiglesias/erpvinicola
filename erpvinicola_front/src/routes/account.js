const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    return res.render('account/index', {
        title: 'Erp Vinicola Cliente 1',
        layout: 'layouts/main'
    })
})

router.get('/new', (req, res) => {
    return res.render('account/new', {
        title: 'Cadastro de usuários',
        layout: 'layouts/main'
    })
})

module.exports = router
