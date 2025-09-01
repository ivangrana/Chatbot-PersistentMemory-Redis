
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { config } from '../config/config';

const dynamoClient = new DynamoDBClient({ region: config.aws.region });

export default dynamoClient;
