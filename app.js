const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let items = [];

//Set up EJS with layouts
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static("public"));

app.get ('/items', (req, res) => res.json(items));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});


app.post('/add', (req, res) => {
    console.log('Request Body:', req.body);
    const { item } = req.body;

    if(!item) {
        return res.status(400).json({error: 'Item is required'});
    }

    items.push(item);

    res.json({ item });
});

app.delete('/delete/:item', (req, res) =>{
    const { item } = req.params;
    const index = items.indexOf(item);
    if (index > -1) {
        items.splice(index, 1);
        res.json({ success: true, deletedItem: item});
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

//server configurations
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    console.error('Error: ', err.stack || err.message || err);
    res.status(500).send('Something broke!');
});
