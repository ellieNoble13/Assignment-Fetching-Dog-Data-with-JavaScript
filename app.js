const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

app.get('/get_dogs', async (req, res) => {

    try {
        const response = await fetch('https://dogapi.dog/api/v2/breeds');

        if (!response.ok) {
            throw new Error(`API error! Status: ${response.status}`);
        }

        const result = await response.json();
        res.json(result.data);

    } catch (error) {
        console.error("We bave a error!", error);
        res.status(500).send("Failed to find dogs.");
    }
});

app.get('/api/dog/:id', async (req, res) => {
    try {
        const breedId = req.params.id;
        const response = await fetch(`https://dogapi.dog/api/v2/breeds/${breedId}`);

        if (!response.ok) throw new Error(`Detail API error! Status: ${response.status}`);

        const result = await response.json();
        res.json(result.data.attributes);

    } catch (error) {
        console.error("Detail fetch error:", error);
        res.status(404).json({error: "Could not find that specific dog breed."});
    }
});

app.get('/get_facts', async (req, res) => {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/facts?limit=10');
        const result = await response.json();
        res.json(result.data);
    } catch (error) {
        res.status(500).json({error: "Facts are unavailable."});
    }

});

app.get('/get_groups', async (req, res) => {
    try {
        const response = await fetch('https://dogapi.dog/api/v2/groups');
        const result = await response.json();
        res.json(result.data);
    } catch (error) {
        res.status(500).json({error: "Groups are unavailable."});
    }
});
app.listen(port, () => {
    console.log(`Im listening at http://localhost:${port}`);
});