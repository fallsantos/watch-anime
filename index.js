require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.get('/', async (req, res) => {

    // const options = {}
    const response = await axios.get(process.env.SITE)

    let $ = cheerio.load(response.data)

    const list = []

    // .lister-list tr
    $('.pagAniListaContainer a').each(function () {
        var anime = {}
        anime.title =  $(this).text().trim()
        anime.link = $(this).attr('href')
        //movie.title = $(this).find('.titleColumn a').text().trim()
        //movie.rating = $(this).find('.ratingColumn strong').text().trim()
        list.push(anime)
    })

    return res.json(list)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})
