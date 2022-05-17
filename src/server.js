const express = require("express");

const app = require("express")();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
