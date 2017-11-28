echo "All posts:"
curl localhost:3000/posts
echo ""
sleep 1

echo "First post:"
curl localhost:3000/posts?id=0

echo "New post"
curl  -H 'Content-Type: application/json' -X POST -d '{"name": "Post 1", "url": "blog.dd/1", "text": "blah blah", "trash": "xxx"}' localhost:3000/posts
echo ""

echo "All posts:"
curl localhost:3000/posts
echo ""
sleep 1
