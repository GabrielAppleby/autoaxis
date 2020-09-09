import {Dataset, InstanceCoord} from "./constants";


export interface UrlInfo {
    readonly dataset: Dataset
}

export interface InstanceUrlInfo extends UrlInfo {
    readonly id: number
}

const baseUrl: string = 'http://127.0.0.1:5000/';
const baseUrlGenerator = ({dataset}: UrlInfo): string => {
    return `${baseUrl}${dataset}`;
}

export const imageUrlGenerator = ({dataset, id}: InstanceUrlInfo): string => {
    return baseUrlGenerator({dataset}) + `/image/${id}`;
}

export const coordsUrlGenerator = (dataset: Dataset, controlPoints: InstanceCoord[]): string => {
    const url = new URL(baseUrlGenerator({dataset}) + `/labeled_coords`)
    url.searchParams.append('control_points', JSON.stringify(controlPoints))

    return url.toJSON();
}
