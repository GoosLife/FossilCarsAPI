const express = require('express');
const cors = require('cors'); // Import the cors module

/** SETUP */
const app = express();
const port = 3000;

const corsOptions = {
    origin: '*', // Allow all localhost ports
};

app.use(cors(corsOptions)); // Enable CORS for the specified origin½
app.use(express.json()); // Enable JSON parsing middleware

/** ROUTES */
app.get('/cars', (req, res) => { 
    res.send(eCarsTop25_2022);
});

app.post('/car', (req, res) => {
    // Add car to the list
    res.send('Car added to the list: ' + JSON.stringify(req.body));
    
    // Sort eCarsTop25_2022 by quantity and rank them accordingly
    addCar(req.body);

    res.status(201);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/** DATA */
const eCarsTop25_2022 = [
    { rank: 1, model: 'Skoda Enyaq', quantity: 1044, changeQuantityPercent: 284 },
    { rank: 2, model: 'Tesla Model Y', quantity: 989, changeQuantityPercent: 100 },
    { rank: 3, model: 'Polestar 2', quantity: 836, changeQuantityPercent: 1990 },
    { rank: 4, model: 'Audi Q4', quantity: 816, changeQuantityPercent: 586 },
    { rank: 5, model: 'Ford Mustang Mach-E', quantity: 659, changeQuantityPercent: 1333 },
    { rank: 6, model: 'Kia EV6', quantity: 520, changeQuantityPercent: 100 },
    { rank: 7, model: 'VW ID.4', quantity: 458, changeQuantityPercent: -61 },
    { rank: 8, model: 'Volvo XC40', quantity: 416, changeQuantityPercent: 100 },
    { rank: 9, model: 'Hyundai Ioniq 5', quantity: 365, changeQuantityPercent: 100 },
    { rank: 10, model: 'Hyundai Kona', quantity: 359, changeQuantityPercent: -24 },
    { rank: 11, model: 'Tesla Model 3', quantity: 350, changeQuantityPercent: -68 },
    { rank: 12, model: 'Kia Niro', quantity: 346, changeQuantityPercent: -16 },
    { rank: 13, model: 'Peugeot 208', quantity: 330, changeQuantityPercent: 131 },
    { rank: 14, model: 'VW ID.3', quantity: 329, changeQuantityPercent: -54 },
    { rank: 15, model: 'Cupra Born', quantity: 298, changeQuantityPercent: 100 },
    { rank: 16, model: 'Mercedes-Benz EQA', quantity: 289, changeQuantityPercent: 51 },
    { rank: 17, model: 'VW Up', quantity: 229, changeQuantityPercent: 332 },
    { rank: 18, model: 'VW ID.5', quantity: 226, changeQuantityPercent: 100 },
    { rank: 19, model: 'Mercedes-Benz EQB', quantity: 224, changeQuantityPercent: 100 },
    { rank: 20, model: 'Fiat 500', quantity: 202, changeQuantityPercent: -40 },
    { rank: 21, model: 'Renault Zoe', quantity: 185, changeQuantityPercent: -18 },
    { rank: 22, model: 'Peugeot 2008', quantity: 169, changeQuantityPercent: 42 },
    { rank: 23, model: 'Audi E-tron', quantity: 168, changeQuantityPercent: 25 },
    { rank: 24, model: 'Dacia Spring', quantity: 160, changeQuantityPercent: 5233 },
    { rank: 25, model: 'BMW i4', quantity: 142, changeQuantityPercent: 100 },
  ];

  function addCar(car) {
    console.log(car);
    eCarsTop25_2022.push(car);
    eCarsTop25_2022.sort((a, b) => b.quantity - a.quantity);
    eCarsTop25_2022.forEach((car, index) => car.rank = index + 1);
    console.log(JSON.stringify(eCarsTop25_2022, null, 2));
  }