export const capitalizeFirstLetter = (name : string) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const getPageNumber = (url: string, pageSize: number, totalCount : number) => {
  const name = 'offset';
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(url);
  let page = results === null ? totalPageCount : Number(decodeURIComponent(results[1].replace(/\+/g, " "))) / 20;
  return page;
}