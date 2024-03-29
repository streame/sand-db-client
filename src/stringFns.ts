export const stringToCamelCase = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

export const stringToClass = (str: string) => {
  const camelCase = stringToCamelCase(str);

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
