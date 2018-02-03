echo "Setting up"
curl  -H 'Content-Type: application/json' -X POST -d '{"name": "10 ES6 Features","url": "https://webapplog.com/es6","text": "A quick introduction to ES6"}' localhost:3000/posts
echo ""

curl -H 'Content-Type: application/json' -X POST -d '{"text": "No type optimization at all"}' "http://localhost:3000/posts/0/comments"
echo ""
curl -H 'Content-Type: application/json' -X POST -d '{"text": "Do not undervalue benefits!"}' "http://localhost:3000/posts/0/comments"
echo ""
curl -H 'Content-Type: application/json' -X POST -d '{"text": "Thank you!"}' "http://localhost:3000/posts/0/comments"
echo ""

echo "All posts:"
curl localhost:3000/posts
echo ""
sleep 1

echo "First post:"
curl localhost:3000/posts?id=0
echo ""

echo "New post"
curl  -H 'Content-Type: application/json' -X POST -d '{"name": "Post 1", "url": "blog.dd/1", "text": "blah blah", "trash": "xxx"}' localhost:3000/posts
echo ""

echo "All posts:"
curl localhost:3000/posts
echo ""
sleep 1

echo "Updating post 1:"
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Post 1/a"}' "http://localhost:3000/posts/1"
echo ""
sleep 1

echo "Updating non existing post should fail"
curl -H 'Content-Type: application/json' -X PUT -d '{"name": "Post 1/a"}' "http://localhost:3000/posts/42"
echo ""
sleep 1

echo "Add comment to post 1:"
curl -H 'Content-Type: application/json' -X POST -d '{"text": "A comment"}' "http://localhost:3000/posts/1/comments"
echo ""
curl localhost:3000/posts?id=1
echo ""
sleep 1

echo "Updating comment to post 1:"
curl -H 'Content-Type: application/json' -X PUT -d '{"text": "A comment /a", "xxx": "fake"}' "http://localhost:3000/posts/1/comments/0"
echo ""
curl localhost:3000/posts?id=1
echo ""
sleep 1

echo "Delete comment on post 1"
curl -X DELETE "http://localhost:3000/posts/1/comments/0" 
curl localhost:3000/posts?id=1
echo ""
sleep 1

echo "Delete post 1"
curl -X DELETE "http://localhost:3000/posts/1" 

echo "All posts:"
curl localhost:3000/posts
echo ""

echo "First post comments:"
curl localhost:3000/posts/0/comments

