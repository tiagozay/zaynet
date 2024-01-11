import APIResponse from "../Utils/APIResponse";

export abstract class APIService 
{
    private static url: string = process.env.REACT_APP_API_URL as string;
    private static isProduction: boolean = true;

    public static post(rota: string, data: { [key: string]: any }) 
    {
        const formData = new FormData();

        for (const key in data) {
            if(data.hasOwnProperty(key)){
                formData.append(key, data[key]);
            }
        }

        return fetch(
            `${this.url}${rota}`,
            {
                method: 'post',
                body: formData
            }
        )
        // .then( res => res.text() )
        // .then( res => console.log(res) )
        .then( res => res.json() )
        .then( res => {

            const resObj = res as APIResponse;

            if(resObj.success){
                return resObj;
            }else{
                return Promise.reject(resObj);
            }
        });
        // .then( res => res.json() )
        // .then( res => console.log(res) )
        // .catch( res => console.log(res) ) 
    }
}