const postgre = require('../database')
const bookController = {
    getAll: async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM books ORDER BY created_at DESC');
            res.json(result.rows);
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send("Book not found");
            } res.json(result.rows[0]);
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },

    getByNotes: async (req, res) => {

        const { id } = req.params;

        try {
            const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
            res.json(result.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    },

    create: async (req, res) => {
        const { title, author, cover_url, rating, notes, isbn, description } = req.body;

        try {

            const result = await db.query('INSERT INTO books (title, author, cover_url, rating, notes, isbn, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, author, cover_url, rating, notes, isbn, description]);
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error', err.message);
            res.status(500).send("Server Error");
        }
    },
    updateById: async (req, res) => {
        const { id } = req.params;
        const { notes } = req.body;

        try {

            const result = await db.query('UPDATE books SET notes = $1 WHERE id = $2 RETURNING *', [notes, id]);
            if (result.rows.length === 0) {
                return res.status(404).send("Book not found");
            } res.json(result.rows[0]);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");

        }
    },
    deleteById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await db.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).send("Book not found");
            }
            res.json({ message: 'Book deleted', book: result.rows[0] });

        } catch (err) {
            console.err(err.message);
            res.status(500).send("Server Error");

        }
    }
}

module.exports = bookController