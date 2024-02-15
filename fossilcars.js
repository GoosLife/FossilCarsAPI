const express = require('express');
const cors = require('cors'); // Import the cors module

/** SETUP */
const app = express();
const port = 3000;

// Set CORS option to allow localhost
const corsOptions = {
    origin: '*'
};

app.use(cors({origin: '*'})); // Enable CORS for the specified origin
app.use(express.json()); // Enable JSON parsing middleware

/** ROUTES */

// Cars route
app.get('/cars', (req, res) => {
    res.send(eCarsTop25_2022);
});

app.get('/cars/:type', (req, res) => {
    const type = req.params.type;

    if (type != "electric" && type != "fossil") {
        res.status(404);
        res.send(JSON.stringify({
            message: 'Invalid type.'
        }));
        return;
    }

    let cars = eCarsTop25_2022;

    if (!(type == undefined || type == null || type == "")) {
        // Filter cars
        cars = eCarsTop25_2022.filter(c => c.type == type);
        // Sort cars
        cars = sortCarsFromArray(cars);
    }

    res.send(cars);
});

app.post('/car', (req, res) => {
    responseMessage = JSON.stringify({
        message: 'Car couldn\'t be added: Unknown error.'
    });

    try {
        responseMessage = addCar(req.body);
    }
    catch (e) {
        responseMessage = JSON.stringify({
            message: e.message
        });
    }
    res.status(201);
    res.send(JSON.stringify(responseMessage));
});

app.put('/car/:id', (req, res) => {
    const id = req.params.id;
    try {
        let updatedCar = updateCar(id, req.body);
        res.status(200);
        res.send(JSON.stringify(updatedCar));
    }
    catch (e) {
        res.status(404);
        res.send(JSON.stringify({
            message: 'Car not found.'
        }));
    }
});

app.delete('/car/:id', (req, res) => {
    try {
        deleteCar(req.params.id);
        res.status(204);
        res.send(JSON.stringify({
            message: 'Car deleted.'
        }));
    }
    catch (e) {
        res.status(404);
        res.send(JSON.stringify({
            message: 'Car not found.'
        }));
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Users route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);
    
    const user = login(username, password);
    if (user) {
        res.status(200);
        res.send(JSON.stringify({
            isAuthenticated: true,
            role: user.role
        }));
    }
    else {
        res.status(401);
        res.send(JSON.stringify({
            isAuthenticated: false,
            message: 'Invalid credentials.'
        }));
    }
});

/** DATA */
const eCarsTop25_2022 = [
    { id: 1, type: "electric", model: 'Skoda Enyaq', quantity: 1044, changeQuantityPercent: 284 },
    { id: 2, type: "electric", model: 'Tesla Model Y', quantity: 989, changeQuantityPercent: 100 },
    { id: 3, type: "electric", model: 'Polestar 2', quantity: 836, changeQuantityPercent: 1990 },
    { id: 4, type: "electric", model: 'Audi Q4', quantity: 816, changeQuantityPercent: 586 },
    { id: 5, type: "electric", model: 'Ford Mustang Mach-E', quantity: 659, changeQuantityPercent: 1333 },
    { id: 6, type: "electric", model: 'Kia EV6', quantity: 520, changeQuantityPercent: 100 },
    { id: 7, type: "electric", model: 'VW ID.4', quantity: 458, changeQuantityPercent: -61 },
    { id: 8, type: "electric", model: 'Volvo XC40', quantity: 416, changeQuantityPercent: 100 },
    { id: 9, type: "electric", model: 'Hyundai Ioniq 5', quantity: 365, changeQuantityPercent: 100 },
    { id: 10, type: "electric", model: 'Hyundai Kona', quantity: 359, changeQuantityPercent: -24 },
    { id: 11, type: "electric", model: 'Tesla Model 3', quantity: 350, changeQuantityPercent: -68 },
    { id: 12, type: "electric", model: 'Kia Niro', quantity: 346, changeQuantityPercent: -16 },
    { id: 13, type: "electric", model: 'Peugeot 208', quantity: 330, changeQuantityPercent: 131 },
    { id: 14, type: "electric", model: 'VW ID.3', quantity: 329, changeQuantityPercent: -54 },
    { id: 15, type: "electric", model: 'Cupra Born', quantity: 298, changeQuantityPercent: 100 },
    { id: 16, type: "electric", model: 'Mercedes-Benz EQA', quantity: 289, changeQuantityPercent: 51 },
    { id: 17, type: "electric", model: 'VW Up', quantity: 229, changeQuantityPercent: 332 },
    { id: 18, type: "electric", model: 'VW ID.5', quantity: 226, changeQuantityPercent: 100 },
    { id: 19, type: "electric", model: 'Mercedes-Benz EQB', quantity: 224, changeQuantityPercent: 100 },
    { id: 20, type: "electric", model: 'Fiat 500', quantity: 202, changeQuantityPercent: -40 },
    { id: 21, type: "electric", model: 'Renault Zoe', quantity: 185, changeQuantityPercent: -18 },
    { id: 22, type: "electric", model: 'Peugeot 2008', quantity: 169, changeQuantityPercent: 42 },
    { id: 23, type: "electric", model: 'Audi E-tron', quantity: 168, changeQuantityPercent: 25 },
    { id: 24, type: "electric", model: 'Dacia Spring', quantity: 160, changeQuantityPercent: 5233 },
    { id: 25, type: "electric", model: 'BMW i4', quantity: 142, changeQuantityPercent: 100 },
    { id: 26, type: "fossil", model: 'Toyota Camry', quantity: 100, changeQuantityPercent: 0 },
    { id: 27, type: "fossil", model: 'Honda Civic', quantity: 150, changeQuantityPercent: 10 },
    { id: 28, type: "fossil", model: 'Ford Mustang', quantity: 50, changeQuantityPercent: -5 },
    { id: 29, type: "fossil", model: 'Flying carpet', quantity: 25, changeQuantityPercent: 20 },
    { id: 30, type: "fossil", model: 'BMW 3 Series', quantity: 75, changeQuantityPercent: 15 },
    { id: 31, type: "fossil", model: 'Mercedes-Benz C-Class', quantity: 80, changeQuantityPercent: 8 },
    { id: 32, type: "fossil", model: 'Audi A4', quantity: 60, changeQuantityPercent: -10 },
    { id: 33, type: "fossil", model: 'Lexus ES', quantity: 40, changeQuantityPercent: 5 },
    { id: 34, type: "fossil", model: 'Nissan Altima', quantity: 90, changeQuantityPercent: 12 },
    { id: 35, type: "fossil", model: 'Mazda6', quantity: 70, changeQuantityPercent: -3 },
    { id: 36, type: "fossil", model: 'DSB IC4', quantity: 55, changeQuantityPercent: 7 },
    { id: 37, type: "fossil", model: 'Subaru Legacy', quantity: 30, changeQuantityPercent: -15 },
    { id: 38, type: "fossil", model: 'Hyundai Sonata', quantity: 65, changeQuantityPercent: 18 },
    { id: 39, type: "fossil", model: 'Boeing 747', quantity: 45, changeQuantityPercent: 2 },
    { id: 40, type: "fossil", model: 'Toyota Corolla', quantity: 110, changeQuantityPercent: 6 },
    { id: 41, type: "fossil", model: 'Honda Accord', quantity: 95, changeQuantityPercent: -8 },
    { id: 42, type: "fossil", model: 'Ford Fusion', quantity: 85, changeQuantityPercent: 4 },
    { id: 43, type: "fossil", model: 'Chevrolet Malibu', quantity: 35, changeQuantityPercent: -12 },
    { id: 44, type: "fossil", model: 'BMW 5 Series', quantity: 120, changeQuantityPercent: 9 },
    { id: 45, type: "fossil", model: 'Titanic Luxury Cruiser', quantity: 130, changeQuantityPercent: 11 },
    { id: 46, type: "fossil", model: 'Audi A6', quantity: 105, changeQuantityPercent: -6 },
    { id: 47, type: "fossil", model: 'Lexus GS', quantity: 50, changeQuantityPercent: 3 },
    { id: 48, type: "fossil", model: 'Nimbus 2000', quantity: 75, changeQuantityPercent: -2 },
    { id: 49, type: "fossil", model: 'Mazda3', quantity: 65, changeQuantityPercent: 5 },
    { id: 50, type: "fossil", model: 'Volkswagen Jetta', quantity: 55, changeQuantityPercent: -4 },
];

let nextId = 26;

function addCar(car) {
    // Pretend we're logging to a file instead of just console...
    console.log(car);

    // Add the car to the list
    if (validateCar(car)) {
        car.id = nextId;
        eCarsTop25_2022.push(car);
        nextId++;
    }
    else {
        console.log('Invalid car: ' + JSON.stringify(car, null, 2));
        throw new Error('Invalid car');
    }

    sortCars();

    // Pretend we're logging to a log file instead of just console...
    console.log(JSON.stringify(eCarsTop25_2022, null, 2));

    return eCarsTop25_2022.find(c =>
        c.model == car.model &&
        c.quantity == car.quantity &&
        c.changeQuantityPercent == car.changeQuantityPercent
    );
}

function updateCar(id, car) {
    const index = eCarsTop25_2022.findIndex(c => c.id == id);
    if (index != -1) {
        let existingCar = eCarsTop25_2022[index];
        existingCar.model = car.model;
        existingCar.changeQuantityPercent = car.changeQuantityPercent;
        existingCar.quantity = car.quantity;

        // I'm not sure if this is necessary; is existingCar a reference or a copy?
        eCarsTop25_2022[index] = existingCar;

        // Re-sort the cars
        sortCars();

        return existingCar;
    }
    else {
        throw new Error('Car not found');
    }
}

function deleteCar(id) {
    const index = eCarsTop25_2022.findIndex(c => c.id == id);
    if (index != -1) {
        eCarsTop25_2022.splice(index, 1);
        sortCars();
    }
    else {
        throw new Error('Car not found');
    }
}

function sortCars() {
    // Sort eCarsTop25_2022 by quantity and rank them accordingly
    eCarsTop25_2022.sort((a, b) => b.quantity - a.quantity);
    eCarsTop25_2022.forEach((car, index) => car.rank = index + 1);
}

function sortCarsFromArray(carArray) {
    // Sort eCarsTop25_2022 by quantity and rank them accordingly
    carArray.sort((a, b) => b.quantity - a.quantity);
    carArray.forEach((car, index) => car.rank = index + 1);

    return carArray;
}

function validateCar(car) {
    return (
        car.model &&
        car.model.length >= 3 &&
        !isNaN(car.quantity) &&
        !isNaN(car.changeQuantityPercent));
}

const users = [
    { username: 'admin', password: '<PASSWORD>', role: 'admin' },
    { username: 'user', password: '<PASSWORD>', role: 'user' },
]

function login(username, password) {
    return users.find(u => u.username == username && u.password == password);
}

/** INITIALIZE */
sortCars();
