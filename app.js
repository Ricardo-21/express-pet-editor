const express = require('express')
const app = express()
const methodOverride = require('method-override')
const { urlencoded } = require('express');
const PORT = process.env.PORT || 8000

app.use(urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

let pets = [
  {
    id: 1,
    species: "Dog",
    name: "Fido", 
    age: "5 years",
    notes: "Cute guy",
    likes: 0
  },
  {
    id: 2,
    species: "Cat",
    name: "Fluffy", 
    age: "8 months",
    notes: "Adorable girl",
    likes: 0
  },
  {
    id: 3,
    species: "Bird",
    name: "Polly", 
    age: "3 years",
    notes: "Lovable fellow",
    likes: 0
  },
]

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.render("home.ejs", {pets})
})

app.get('/pets', (req, res) => {
  res.redirect('/')
})

app.put('/pets/:id', (req, res) => {
  pet = pets.find(pet => pet.id == req.params.id);
  
  // debugger;
  pet.species = req.body.species;
  pet.name = req.body.name;
  pet.age = req.body.age;
  pet.notes = req.body.notes;
  pet.likes = 0;

  res.redirect('/')
})

app.get('/pets/:id/edit', (req,res) => {
  pet = pets.find(pet => pet.id == req.params.id);
  if(pet) {
    res.render('editPet.ejs', pet);
  }
  
})

app.patch('/like/:id', (req, res) => {
  pet = pets.find(pet => pet.id == req.params.id);
  
  if(pet) {
    pet.likes += 1;
  }

  res.redirect('/');
}) 

app.get("*", (req, res) => {
  res.render("notfound.ejs", {title: "Not Found"})
})