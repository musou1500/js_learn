export const rangeInConsole = (start, end) => {
  if (start > end) {
    console.error("endにはstartより大きい値を指定してください");
    return;
  }

  for (let i = start; i < end; i++) {
    console.log(i);
  }
};

export const rangeInConsoleWithLimit = (start, end) =>
  rangeInConsole(start, Math.min(end, start + 5));

export const addAge = p => {
  p.age++;
  return p;
};

export const getAuthorName = obj => {
  if (obj && obj.author && obj.author.name) {
    return obj.author.name;
  } else {
    return "no name";
  }
};

