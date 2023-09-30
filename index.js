const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require('mongodb');
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//parser
app.use(express.urlencoded({
  extended: true
}));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c4kfkmr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});


async function run() {
  try {
    const booksCollection = client.db('book-e-shop').collection('books');
    // const contactsCollection = client.db('ari-techs').collection('contacts');
    // const servicesCollection = client.db('ari-techs').collection('services');

    // Book crud
    app.post('/book', async (req, res) => {
      const book = req.body;
      console.log(book);
      const result = await booksCollection.insertOne(book);
      res.send(result);

    })

    app.get('/books', async (req, res) => {
      const query = {};
      const books = await booksCollection.find(query).toArray();
      res.send(books);
    })

    app.get('/book/:id', async (req, res) => {
      const id = req.params.id;
      // const query = {_id: new ObjectId(id)};
      const result = await booksCollection.findOne({
        _id: ObjectId(id)
      });
      console.log(result);
      res.send(result);
    });

    // app.delete('/book/:id', async (req, res) => {
    //   const id = req.params.id;

    //   const result = await booksCollection.deleteOne({
    //     _id: ObjectId(id)
    //   });
    //   console.log(result);
    //   res.send(result);
    // });

    // app.post('/comment/:id', async (req, res) => {
    //   const bookId = req.params.id;
    //   const comment = req.body.comment;
    //   console.log(bookId);
    //   console.log(comment);

    //   const result = await booksCollection.updateOne({
    //     _id: new ObjectId(bookId)
    //   }, {
    //     $push: {
    //       comments: comment
    //     }
    //   });

    //   if (result.modifiedCount !== 1) {
    //     console.error('Product not found or comment not added');
    //     res.json({
    //       error: 'Product not found or comment not added'
    //     });
    //     return;
    //   }

    //   console.log('Comment added successfully');
    //   res.json({
    //     message: 'Comment added successfully'
    //   });
    // });

    // app.get('/comment/:id', async (req, res) => {
    //   const bookId = req.params.id;

    //   const result = await booksCollection.findOne({
    //     _id: ObjectId(bookId)
    //   }, {
    //     projection: {
    //       _id: 0,
    //       comments: 1
    //     }
    //   });

    //   if (result) {
    //     res.json(result);
    //   } else {
    //     res.status(404).json({
    //       error: 'Product not found'
    //     });
    //   }
    // });

  } finally {

  }
}
run().catch(err => console.error(err));


app.get('/', async (req, res) => {
  res.send('Book catalog portal server is running')
})

app.listen(port, () => console.log(`Book catalog portal running on ${port}`))


// sJBoXBnLpEMfGOlS

// book-e-shop-db