const express = require('express')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    next()
})

function newPage(id) {
    switch (id) {
        case "1":
            return {
                "results": [
                    {
                        "name": "Executor",
                        "cost_in_credits": "1143350000",
                        "max_atmosphering_speed": "n/a",
                        "passengers": "38000",
                        "cargo_capacity": "250000000"
                    },
                    {
                        "name": "Sentinel-class landing craft",
                        "cost_in_credits": "240000",
                        "max_atmosphering_speed": "1000",
                        "passengers": "75",
                        "cargo_capacity": "180000"
                    }
                ],
                'next': 'http://localhost:3000/starships/2'
            }
        case "2":
            return {
                "results": [
                    {
                        "name": "Calamari Cruiser",
                        "cost_in_credits": "104000000",
                        "max_atmosphering_speed": "n/a",
                        "passengers": "1200",
                        "cargo_capacity": "unknown"
                    }
                ],
                'next': 'http://localhost:3000/starships/3'
            }
        case "3":
            return {
                "results": [
                    {
                        "name": "H-type Nubian yacht",
                        "cost_in_credits": "unknown",
                        "max_atmosphering_speed": "8000",
                        "passengers": "unknown",
                        "cargo_capacity": "unknown"
                    }
                ],
                'next': 'http://localhost:3000/starships/4'
            }
        case "4":
            return {
                "results": [
                    {
                        "name": "Naboo star skiff",
                        "cost_in_credits": "unknown",
                        "max_atmosphering_speed": "1050",
                        "passengers": "3",
                        "cargo_capacity": "unknown"
                    }
                ]
            }
        default:
            return {}
    }
}

app.get('/starships/:id', (req, res) => {
    res.send(newPage(req.params.id))
})


app.listen(3000)