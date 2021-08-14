/**
 * Created by Pablo Silva
 * Date: 2021/08/14
 * Time: 15:10
 */

import { document } from "../../utils/dynamodbClient.routes";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid: user_id } = event.pathParameters;

  console.log(user_id);

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
    })
    .promise();

  const userTodos = response.Items[0];

  if (userTodos) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Found all TODOS",
        ToDos: response.Items,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "No data find for this user",
    }),
  };
};
