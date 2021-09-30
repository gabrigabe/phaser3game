const express = require ('express');
const path = require('path');

const app = express();
const port = 3000;

app.listen(port, () =>{
    console.log("Servidor Rodando na porta 3000")
});

app.get('/img/scithersword.png', (req, res)=> {
    res.sendFile('scithersword.png', {root:path.join(__dirname, 'img')})

})

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})