module.exports = (name, gender) => {
  if (!name || !gender) {
    return `AnonymouX`;
  }

  return gender === "Male" ? `Mr. ${name}` : `Mrs. ${name}`;
};
