//inicializando as dependecias
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const expressEjsLayouts = require('express-ejs-layouts')
//npm install morgan morga body-parser method-override --save


//setar as configurações para rendereizar pagina
module.exports = (app) => {
    app.set('port', 9000)
    app.set('views', path.join(__dirname, './../../../build/views'))
    //gera um get para acessar a pasta referenciada
    //pasta gerada atraves do gulp
    app.set('view engine', 'ejs')
    app.set('layout extractScripts', true)
    app.set('layout extractStyles', true)

    app.use(express.static(path.join(__dirname, './../../../build')))
    app.use(express.static(path.join(__dirname, './../../../bower_components')))


    app.use(expressEjsLayouts) //sempre abaixo das configs
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false}))
    app.use(morgan('dev'))
    //informa ao morgan que esta em estado de desenvolvimento
    app.use(methodOverride('_method'))

}
