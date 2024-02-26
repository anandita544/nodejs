const express = require('express');
let users = require('./MOCKdata.json');
const server = new express();
const fs = require('fs');
const port = 8000;
server.use(express.urlencoded({ extended: false }));
server.use(express.json());


server.get('/users', (req, res) => {
    return res.json(users);
})
server.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})

// server.post('/users', (req, res) => {
//     fs.readFile('./MOCKdata.json', 'utf8', (err, data) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             users = JSON.parse(data);
//             const body = req.body;
//             users.push({ id: users.length + 1, ...body });
//             fs.writeFile('./MOCKdata.json', JSON.stringify(users), (err) => {
//                 return res.json({ status: "success", id: users.length })
//             })

//         }
//     })
// })
server.post('/users', (req, res) => {
    fs.readFile('./MOCKdata.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        try {
            let users = JSON.parse(data);
            const body = req.body;
            users.push({ id: users.length + 1, ...body });

            fs.writeFile('./MOCKdata.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.json({ status: "success", id: users.length });
            });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ message: 'Error parsing JSON data' });
        }
    });
});
// PUT operation
server.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedUserData = req.body;

    fs.readFile('./MOCKdata.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex !== -1) {

            users[userIndex] = { ...users[userIndex], ...updatedUserData };


            fs.writeFile('./MOCKdata.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.json(users[userIndex]);
            });
        }
    });
});



server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    const index = users.findIndex((user) => user.id == id)
    if (index != -1) {
        users.splice(index, 1);
        res.json(users);
    }
    else {
        res.json("user not found");
    }


})
server.listen(port, () => {
    console.log(`listening at post no ${port}`);
})