/*******************************************************************************************
 * @Purpose   : Get Data of searched value
 * @file      : stateService.js
 * @overview  : Get data according to search value
 * @author    : SINDOOJA GAJAM
 * @since     : 08/07/2020
 *******************************************************************************************/

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
	node: 'http://localhost:9200',
	maxRetries: 5,
	requestTimeout: 60000
});

class SearchService {
	async getSearch(request, callback) {
		client.search(
			{
				index: 'covid19_data',
				body: {
					query: {
						// bool:{
						// 	must: {
								match: {
									// name: {
									// 	fuzziness: 2,
									// 	operator: "or",
										detectedstate:  request.value,
										// detecteddistrict: request.value,
									// }
								},
								// filter: {
								// 	terms: {
								// 	  category: ['detectedstate', 'detecteddistrict']
								// 	}
								// }
						// 	}
						// }
					},
				},
			},
			(error, response) => {
				if (error) {
					return callback(error);
				} else {
					return callback(null, response.body.hits.hits);
				}
			}
		);
	}
}

module.exports = new SearchService();
