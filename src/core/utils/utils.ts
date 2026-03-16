//https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(-87.0186,32.4055)/-87.0186,32.4055,14/500x300?access_token=pk.eyJ1IjoianVhbmZyOTciLCJhIjoiY2x4cnhqZGZpMWUzdTJrb2Qxd2k5Z3huYSJ9.Kp99lB1snn3xzzi26jKy4w

import { envs } from "src/config/envs";

export const generateMapboxImage = (lat:number,lon:number) : string =>{
    const accessToken = envs.MAPBOX_TOKEN;
    const zoom = 11;
    const width = 800;
    const height = 400;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}

