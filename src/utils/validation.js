export const validateProps = (obj) => {
  const requiredProps = ['username', 'age', 'hobbies'];
  return requiredProps.every((item) => obj[item]);
}