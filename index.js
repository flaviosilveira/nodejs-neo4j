import neo4j from 'neo4j-driver';
import faker from 'faker';
import fs, { link } from 'fs';

// Neo4j start
const driver = neo4j.driver(
	'bolt://neo4j:7687',
	neo4j.auth.basic('neo4j', '12345'),
);

// Crazy Loop 
let previous;
let seq = 1;

async function someFunction() {
  for (let i = 0; i <= 10 ; i++) {
    const session = driver.session({database: 'neo4j',}, );

    let nLen = previous * 3;
    if (i == 0) {
      nLen = 1;
    }

    for (let j = 0; j < nLen; j++) {

      let sponsor = null;
      if (nLen > 1) {
        sponsor = 'a' + Math.round(seq / 3);
      }

      const object = {
        id: 'a' + seq,
        name: faker.name.findName(),
        sponsor: sponsor,
        createdAt: faker.date.between('2021-11-01T00:00:00.000Z', '2022-04-15T00:00:00.000Z'),
        number: faker.datatype.number(),
        float: faker.datatype.float(),
      };

      const json = JSON.stringify(object);  // {"name":"John Smith"}
      const unquoted = json.replace(/"([^"]+)":/g, '$1:');
      
      let createStt = 'CREATE (a' + seq + ':Person ' + unquoted + ')';
      // console.log(createStt)

      await session.run(createStt)

      if (seq > 1) {
        let createLink = 'MATCH ';
        createLink += '(a:Person),';
        createLink += '(b:Person)';
        createLink += ' WHERE a.id = \'' + sponsor + '\' AND b.id = \'a' + seq + '\'';
        createLink += ' CREATE (a)-[r:SPONSOR]->(b)';

        // console.log(createLink)
        await session.run(createLink)
      }

      console.log(seq);
      seq++;
    }

    previous = nLen;
  }
}

someFunction();
