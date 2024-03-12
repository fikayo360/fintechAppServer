interface user{
  username:string,
  userId:string
}
const createTokenUser = (user:user) => {
  return { username: user.username, userId: user.userId };
};

export default createTokenUser
