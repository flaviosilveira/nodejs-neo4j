import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
	'bolt://neo4j:7687',
	neo4j.auth.basic('neo4j', '12345'),
);

const session = driver.session({database: 'neo4j',}, );

session.run('MATCH (p:Person {name: $param}) return p.name as name', {
	param: 'Tom Hanks',
}).subscribe({
	onKeys: keys => {
		console.log('On Keys:: ', keys);
	},
	onNext: record => {
		console.log('On Next:: ', record.get('name'));
	},
	onCompleted: () => {
		session.close();
	},
	onError: error => {
		console.log('ERROR:: ', error);
	}
});

driver.close();