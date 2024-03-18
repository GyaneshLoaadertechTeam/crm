const checkRole = (allowedRoles, parsedBody) => {
    const userRole = parsedBody.name;
    return allowedRoles.includes(userRole);
  };
  
  export default checkRole;
  