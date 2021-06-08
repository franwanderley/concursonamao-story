import axios from 'axios';

export interface People{
   id: number;
   name: string;
   avatar: string;
   idStory: number;
   image: string;
   createdIn: string;
   qtdStory: number;
   text: string;
}

export const api = axios.create({
   // https://statuserver.herokuapp.com
   baseURL: 'https://statuserver.herokuapp.com'
}); 