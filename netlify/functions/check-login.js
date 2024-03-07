
export const handler = async (event) => {
  const { username, password } = JSON.parse(event.body);
  if (username !== 'admin' || password !== process.env.ADMIN_PASSWORD) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized', isAdmin: false})
    };
  }else {
    return {
      statusCode: 200,
      body: JSON.stringify({ isAdmin: true })
    };
  }
}
  