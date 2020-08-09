// Dados

const proffys = [
      {
        name: "Pedro Henrique", 
        avatar: "https://instagram.ffor10-1.fna.fbcdn.net/v/t51.2885-19/s150x150/96807569_946958702407963_1413099340519440384_n.jpg?_nc_ht=instagram.ffor10-1.fna.fbcdn.net&_nc_ohc=gPEZ7WdAAAcAX-I_8ht&oh=1118aafbed05d4e1c81bffe043421cce&oe=5F590B6B", 
        whatsapp: "98987706505", 
        bio: "teste um", 
        subject:"Química", 
        cost: "20", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
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

// funcionalidades

function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html") //vai buscar o nome de diretório onde nosso index está
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req,res){
    const data = req.query
    const isNotEmpty = Object.keys(data).length != 0
    
    
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
        //adicionar dados à lista de proffys
        proffys.push(data)
        return res.redirect("/study")
    }
    //caso contrário irá mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

function pageHomenagem(_req, res) {
    return res.render("homenagem.html")
}


// servidor
const express =  require('express')
const server = express()

//configurar nunjucks (template engine)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true,
})

//inicio e config do server
server
.use(express.static("public"))    //isso fará com q o express busque os nossos estilos na pasta public e entregue na nossa estrutura html
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.get("/homenagem", pageHomenagem)
.listen(5500)   //definição de que porta vamos usar, aconselhável ser 5000 ou 5500