echo "Current profile:"
curl localhost:3000/profile
echo ""
sleep 1

echo "Posting new profile:"
curl  -H 'Content-Type: application/json' -X POST -d '{"username": "Tom", "email": "tom@mail.dd", "url": "www.tom.dd"}' localhost:3000/profile
echo ""

echo "Current profile:"
curl localhost:3000/profile
echo ""
sleep 1

echo "Putting new value in profile"
curl  -H 'Content-Type: application/json' -X PUT -d '{"username": "Thomas"}' localhost:3000/profile

echo "Current profile:"
curl localhost:3000/profile
echo ""
sleep 1

echo "Dropping profile"
curl -X DELETE localhost:3000/profile

echo "Current profile:"
curl localhost:3000/profile
