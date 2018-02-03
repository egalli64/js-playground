echo "Current profiles:"
curl localhost:3000/profile
echo ""
sleep 1

echo "New profile, missing username rejected"
curl  -H 'Content-Type: application/json' -X POST -d '{"email": "kim@mail.dd", "url": "www.kim.dd"}' localhost:3000/profile
echo ""

echo "New profile, blank username rejected"
curl  -H 'Content-Type: application/json' -X POST -d '{"username": " ", "email": "kim@mail.dd", "url": "www.kim.dd"}' localhost:3000/profile
echo ""

echo "New profile, extra fields ignored"
curl  -H 'Content-Type: application/json' -X POST -d '{"username": "Kim", "email": "kim@mail.dd", "url": "www.kim.dd", "trash": "xxx"}' localhost:3000/profile
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

echo "Reset username in profile"
curl  -H 'Content-Type: application/json' -X PUT -d '{"username": "Tom"}' localhost:3000/profile/0

echo "Profile[0]"
curl localhost:3000/profile?id=0
