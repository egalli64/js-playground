echo "Current profiles:"
curl localhost:3000/profile
echo ""
sleep 1

echo "Posting a new profile"
curl  -H 'Content-Type: application/json' -X POST -d '{"username": "Kim", "email": "kim@mail.dd", "url": "www.kim.dd"}' localhost:3000/profile
echo ""

echo "Current profiles:"
curl localhost:3000/profile
echo ""
sleep 1

echo "Putting new value in profile[0]"
curl  -H 'Content-Type: application/json' -X PUT -d '{"username": "Thomas"}' localhost:3000/profile/0

echo "Current profiles:"
curl localhost:3000/profile
echo ""
sleep 1

echo "Dropping profile[1]"
curl -X DELETE localhost:3000/profile/1

echo "Current profiles:"
curl localhost:3000/profile
echo ""
sleep 1

echo "The first profile:"
curl localhost:3000/profile?id=0
