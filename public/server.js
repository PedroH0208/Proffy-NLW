const proffys = [
    { name: "Pedro Henrique", 
    avatar:"https://scontent-for1-1.cdninstagram.com/v/t51.2885-19/s150x150/96807569_946958702407963_1413099340519440384_n.jpg?_nc_ht=scontent-for1-1.cdninstagram.com&_nc_ohc=mOiCJFcNsmAAX8FIx3G&oh=21388fd500c693cc74ed7ddbf57e7616&oe=5F5516EB", 
    whatsapp: "98987706505", 
    bio: "Entusiasta das melhores tecnologias de Matemática avançada.<br><br>Apenas ensina Matemática para alunos em seu tempo livre, com mais de 90 alunos que formaram com meu conteúdo", 
    subject:"Matemática", 
    cost:"R$ 30,00", 
    weekday: [0], 
    time_from: [720], 
    time_to: [1220],
    }
]

    const subjects = [

        "Artes",
        "Biologia",
        "Ciências",
        "Educação física",
        "Física",
        "Geografia",
        "História",
        "Matemática",
        "Português",
        "Química",
        "Pai",

    ]

    const weekdays = [

        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ]

    function getSubject(subjectNumber) {
        const position = +subjectNumber - 1
        return subjects[position]
    }

    function pageLanding(_req, res) {
        return res.render("/views/index.html")
    }

    function pageStudy(req, res) {
        const filters = req.query
        return res.render("/views/study.html", {proffys, filters, subjects, weekdays})
    }

    function pageGiveClasses(req, res) {
        const data = req.query


        const isNotEmpty = Object.keys(data).length != 0
       
        if (isNotEmpty) {

            

            data.subject = getSubject(data.subject)

            proffys.push(data)

           return res.redirect("/study")
        }
        // data chegando
        return res.render("/views/give-classes.html", {subjects, weekdays} )
    }

    function pageHomenagem(_req, res) {
        return res.render("homenagem.html")
    }

//servidor
const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})
//arquivos estaticos
server.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.get("/homenagem", pageHomenagem)

.listen(5500)


