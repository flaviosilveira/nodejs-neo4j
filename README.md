# Node and Neo4J - Simple Example

## Usage

Up containers
```docker compose up --build```

Execute File
```docker compose exec api node index.js```

Cypher query to Clean up Neo4j
```
match (a) -[r] -> () delete a, r

match (a) delete a
```
