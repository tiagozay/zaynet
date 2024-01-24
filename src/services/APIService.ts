import APIResponse from "../Utils/APIResponse";
import { LoginService } from "./LoginService";

export abstract class APIService 
{
    private static url: string = process.env.REACT_APP_API_URL as string;
    private static isProduction: boolean = true;

    public static post(rota: string, data: { [key: string]: any }) 
    {
        const formData = new FormData();

        for (const key in data) {
            if(data.hasOwnProperty(key) && data[key]){
                formData.append(key, data[key]);
            }
        }

        const headers = {
            'Authorization': `Bearer ${LoginService.buscaTokenArmazenado()}`
        };

        let resSemConverter: Response | null = null;

        return fetch(
            `${this.url}${rota}`,
            {
                method: 'post',
                body: formData,
                headers: headers
            }
        )
        // .then( res => {

        //     res.text()
        //         .then(res => console.log(res));

        //     return res.ok ? res : Promise.reject(res)
        // })
        .then( res => res.ok ? res : Promise.reject(res))
        .then( res => {
            resSemConverter = res;
            return res.json() 
        })
        .then( res => {

            const resObj = res as APIResponse;

            if(resObj.success){
                return resObj;
            }else{
                return Promise.reject(resSemConverter);
            }
        });
    }


    public static postTeste(rota: string, data: { [key: string]: any }) 
    {
        const formData = new FormData();

        for (const key in data) {
            if(data.hasOwnProperty(key) && data[key]){
                formData.append(key, data[key]);
            }
        }

        const headers = {
            'Authorization': `Bearer ${LoginService.buscaTokenArmazenado()}`
        };

        let resSemConverter: Response | null = null;

        return fetch(
            `${this.url}${rota}`,
            {
                method: 'post',
                body: formData,
                headers: headers
            }
        )
        .then( res => res.text() )
        .then( res => console.log(res) );
        
    }

    public static get(rota: string) 
    {
        const headers = {
            'Authorization': `Bearer ${LoginService.buscaTokenArmazenado()}`
        };

        let resSemConverter: Response | null = null;

        return fetch(
            `${this.url}${rota}`,
            {
                method: 'get',
                headers: headers
            }
        )   
        .then( res => res.ok ? res : Promise.reject(res))
        .then( res => {
            resSemConverter = res;
            return res.json() 
        })
        .then( res => {

            const resObj = res as APIResponse;

            if(resObj.success){
                return resObj;
            }else{
                return Promise.reject(resSemConverter);
            }
        });
    }

    public static getTeste(rota: string) 
    {
        const headers = {
            'Authorization': `Bearer ${LoginService.buscaTokenArmazenado()}`
        };

        return fetch(
            `${this.url}${rota}`,
            {
                method: 'get',
                headers: headers
            }
        )   
        .then( res => res.text())
        .then( res => console.log(res) );

    }

}