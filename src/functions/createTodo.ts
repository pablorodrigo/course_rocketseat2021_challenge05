/**
 * Created by Pablo Silva
 * Date: 2021/08/14
 * Time: 15:09
 */
import { document } from "../../utils/dynamodbClient.routes";

interface ICreateTodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}

export const handle = async (event) => {
  const { id, user_id, title, done, deadline } = JSON.parse(
    event.body
  ) as ICreateTodo;

  await document
    .put({
      TableName: "todos",
      Item: { id, user_id, title, done, deadline },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created!",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};
