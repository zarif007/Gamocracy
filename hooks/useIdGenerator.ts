const UseIdGenerator = async (title: string) => {
  if (title === "") return;

  let updatedTitle = "";

  const tt = title.replace(/\s{2,}/g, ' ').trim() ;

  for (let i = 0; i < tt.length; i++) {
    if (tt[i] == " ") {
      updatedTitle = updatedTitle + "-";
    } else if (/\d/.test(tt[i]) || /[a-zA-Z]/.test(tt[i])) {
      updatedTitle = updatedTitle + tt[i];
    }
  }

  return `${updatedTitle.toLowerCase()}-${Date.now()}`
};

export default UseIdGenerator