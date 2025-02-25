const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 1245;
app.use(express.json());


const Read_Book_Store = () => {
    const data = fs.readFileSync('./BookStore.csv','utf8');
    return data.split('\n').map(line => {
        const [ID, Title, Author] = line.split(',');
        return { ID: Number(ID), Title, Author };
    }).filter(book => book.ID); // the splitting syntax is from the internet "chatgpt :)"
};


const Write_Book_Store = (books) => {
    const data = '';
    books.forEach(book => {
        data += book.ID + ',' + book.Title + ',' + book.Author + '\n';
    });
    fs.writeFileSync('./BookStore.csv', data, 'utf8');
};

// the functions is the same as the previous one but with some changes to read and write from a .csv file "Database" not fixed array :)

app.get('/books', (res) => {
    const books = Read_Book_Store();
    res.send(books);
});

app.post('/books', (req, res) => {
    const books = Read_Book_Store();
    const newBook = {
        ID: req.body.ID,
        Title: req.body.Title,
        Author: req.body.Author
    };
    books.push(newBook);
    Write_Book_Store(books);
    res.send('Book added');
});

app.put('/books/:ID', (req, res) => {
    const books = Read_Book_Store();
    const book = books.find(b => b.ID == req.params.ID);

    if (book === null)  {
        res.send('Book not found');
    }
    else {
        book.Title = req.body.Title;
        book.Author = req.body.Author;
        Write_Book_Store(books);
        res.send('Book updated');
    }
});

app.delete('/books/:ID', (req, res) => {
    const books = Read_Book_Store();
    const book_index = books.findIndex(b => b.ID == req.params.ID);

    if (book_index === -1) {
        res.send('Book not found');
    }
    else {
        books.splice(book_index, 1);
        Write_Book_Store(books);
        res.send("Book deleted");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
