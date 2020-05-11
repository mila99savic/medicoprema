/* eslint-disable no-unused-vars */
export const destinationUrl = 'http://localhost:3000'

export function getCredentials() {
    return {
        accessToken: localStorage.getItem('accessToken'),
    }
}

export function deleteCredentials() {
    localStorage.removeItem('accessToken')
}

export function setCredentials(accessToken) {
    localStorage.setItem('accessToken', accessToken)
}

// // export function apiFetchFactory() {
// //     return async function apiFetch(method, url, body) {
// //         console.log(method);
// //         console.log(url);
// //         console.log(body);
// //         const formData = new FormData();
// //         for (let key in body) {
// //             formData.append(key,body[key]);
// //         }
// //         console.log(formData);
// //         let result = null;
// //         if (body == null) {
// //             result = await fetch(url, {
// //                 method: method,
// //                 body: JSON.stringify(formData),
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 }
// //             });
// //         } else {
// //             result = await fetch(url, {
// //                 method: method,      
// //                 body: JSON.stringify(formData),
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 }
// //             });
// //         }
// //         return result.json();
// //     }
// // }
export function apiFetchFactory({fetch}){
    return async function apiFetch(method, url, body){
        let res = null;
        if(body != null){
             res = await fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }else{
            res = await fetch(url, {
                   method: method,
                   headers: {
                    'Content-Type': 'application/json'
                    }
            });
        }
        return res.json();
    }
}

export const apiFetch = apiFetchFactory({fetch});

export const REGULAR_USER_TYPE = 0;
export const EMPLOYED_USER_TYPE = 1;
export const ADMIN_USER_TYPE = 2;
export const ANONYMOUS_USER_TYPE = 3;

// export const ALBUM_PASSWORD = "home";

export const UserTypes = ["Korisnik", "Zaposleni", "Uprava", "Anonimni"];