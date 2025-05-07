type url=string
type Params={ [key: string]: any}
export default ({url}:{url:url})=>{
    const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
    const params:Params = {};

    paramString.forEach(param=>{
        const paramSplit = param.split('=');
        params[paramSplit[0]] = paramSplit[1];
    })
return params;
}