import {Dataset} from "./constants";


export interface UrlInfo {
    readonly dataset: Dataset
}

export interface InstanceUrlInfo extends UrlInfo {
    readonly id: number
}

const baseUrl: string = 'https://vast-everglades-16944.herokuapp.com/';
const baseUrlGenerator = ({dataset}: UrlInfo): string => {
    return `${baseUrl}${dataset}/raw`;
}

export const imageUrlGenerator = ({dataset, id}: InstanceUrlInfo): string => {
    return baseUrlGenerator({dataset}) + `/image/${id}`;
}
