const express = require('express');
const app = express();
const port = 1245 || process.env.PORT;
app.use(express.json());


var bookStore = [
  { ID: 1, Title: "Web development From Zero To Hero", Author: "Karim Ashraf :)"},
  { ID: 2, Title: "How to make your first dollar from programming", Author: "Ashraf Karim :)" },
  { ID: 3, Title: "Tips and Tricks to get A in Web development", Author: "Kareem Ashraf :)" },
  { ID: 4, Title: "How to attend the labs in the time", Author: "Kimo Ashraf :)" },
  { ID: 5, Title: "Zatont El Software Engineering", Author: "Ashraf kimo :)" }
];


app.get('/books',(res)=> {
  res.send(bookStore);
});

app.post('/books',(req,res)=> {
  const newBook = {
    ID: req.body.ID,
    Title: req.body.Title,
    Author: req.body.Author
  };
  bookStore.push(newBook);
  res.send("Book added");
});

app.put('/books/:ID',(req,res)=> {
    const book = bookStore.find(b => b.ID == req.params.ID);

    if (book === null) 
        return res.send("Book not found") ;
    else {
        book.Title = req.body.Title;
        book.Author = req.body.Author;
        res.send("Book updated");
    }
});

app.delete('/books/:ID',(req,res)=> {
    const book_index = bookStore.findIndex(b => b.ID == req.params.ID);

    if (book_index === -1) 
        res.send("Book not found") ;
    else {
        bookStore.splice(book_index, 1);
        res.send("Book deleted");
    }
});


app.listen(port, () => {
  console.log(`Enter the server :) -> http://localhost:${port}/`);
});
