const useShortenTitle = () => {
  const shortTitle = (title, limit = 17, defaultTitle) => {
    if (title) {
      if (title.length >= limit) {
        const newTitle = [];
        title.split(" ").reduce((acc, cur) => {
          if (acc + cur.length <= limit) {
            newTitle.push(cur);
          }
          return acc + cur.length;
        }, 0);
        return `${newTitle.join(" ")} ...`;
      }

      return title;
    }
    return defaultTitle;
  };
  return { shortTitle };
};

export default useShortenTitle;
