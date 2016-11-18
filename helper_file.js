curl -X POST https://localhost:3001/AddEntry -d @Experiments-in-Motivation.json --header "Content-Type: application/json"


curl -X POST -H 'Content-Type:application/json' -H 'Accept: application/json; charset=utf-8' -d @Experiments-in-Motivation.json http://localhost:3001/blog -v -s
curl -X POST -H 'Content-Type:application/json' -H 'Accept: application/json; charset=utf-8' -d @a-mindful-shift-of-focus.json http://localhost:3001/blog -v -s
http://localhost:3001/blog?slug=a-mindful-shift-of-focus
curl -X POST -H 'Content-Type:application/json' -H 'Accept: application/json; charset=utf-8' -d @how-to-develop-an-awesome-sense-of-direction.json http://localhost:3001/blog -v -s
http://localhost:3001/blog?slug=how-to-develop-an-awesome-sense-of-direction
curl -X POST -H 'Content-Type:application/json' -H 'Accept: application/json; charset=utf-8' -d @training-to-be-a-good-writer.json http://localhost:3001/blog -v -s
http://localhost:3001/blog?slug=training-to-be-a-good-writer
curl -X POST -H 'Content-Type:application/json' -H 'Accept: application/json; charset=utf-8' -d @what-productivity-systems-wont-solve.json http://localhost:3001/blog -v -s
http://localhost:3001/blog?slug=what-productivity-systems-wont-solve


