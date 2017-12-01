curl -H 'Content-Type: application/json' -X PUT -d '{"balance": 200, "name": "savings"}'  http://localhost:3000/accounts/{5a21628b9b725b2cbc0761b0} 
echo ""

curl http://localhost:3000/accounts
echo ""

curl -X DELETE http://localhost:3000/accounts/{5a21628b9b725b2cbc0761b0}
echo ""

curl http://localhost:3000/accounts
