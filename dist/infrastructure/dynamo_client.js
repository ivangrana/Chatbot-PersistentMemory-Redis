"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const config_1 = require("../config/config");
const dynamoClient = new client_dynamodb_1.DynamoDBClient({ region: config_1.config.aws.region });
exports.default = dynamoClient;
//# sourceMappingURL=dynamo_client.js.map