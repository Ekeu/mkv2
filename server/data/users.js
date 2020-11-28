const bcrypt = require('bcryptjs')
const users = [
    {
        name: 'Marcelle Kouam',
        email: 'adminmk@gmail.com',
        password: bcrypt.hashSync('marcellekouamxxx', 10),
        isAdmin: true
    },
    {
        name: 'Kevin Aymard',
        email: 'kevinaymard@gmail.com',
        password: bcrypt.hashSync('xxxkevinaymard', 10),
    },
    {
        name: 'Distel Fogue',
        email: 'disfogue@gmail.com',
        password: bcrypt.hashSync('distelxxxfogue', 10),
    }
]

module.exports = users