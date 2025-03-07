const express = require('express');
const fs = require('fs');
const router = express.Router();
const app = express();
app.use(express.json());


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === "Bearer ZEWAIL") {
    next();
    } else {
    res.status(403).send('Forbidden: Invalid Token');
    }
};

router.use(authMiddleware);



const Read_Book_Store = () => {
    const data = fs.readFileSync('C:/Users/Kimos/OneDrive/Documents/GitHub/RESTful-API-for-BookStore/BookStore.csv','utf8');
    return data.split('\n').map(line => {
        const [ID, Title, Author] = line.split(',');
        return { ID: Number(ID), Title, Author };
    }).filter(book => book.ID); 
};


const Write_Book_Store = (books) => {
    const data = '';
    books.forEach(book => {
        data += book.ID + ',' + book.Title + ',' + book.Author + '\n';
    });
    fs.writeFileSync('C:/Users/Kimos/OneDrive/Documents/GitHub/RESTful-API-for-BookStore/BookStore.csv', data, 'utf8');
};


router.get('/books', (req, res) => {
    const books = Read_Book_Store();
    res.send(books);
});

router.post('/books', (req, res) => {
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

router.put('/books/:ID', (req, res) => {
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

router.delete('/books/:ID', (req, res) => {
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


module.exports = router;







