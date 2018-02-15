import { search } from "./Store";

export const req = data => {
  return `${search}${data}&origin=*`;
};

export const builder = async s => {
  const data = await fetch(req(s));
  const response = await data.json();
  return response;
};
