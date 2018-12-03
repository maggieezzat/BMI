import Axios from '../Axios/Axios';
import axios from 'axios';

let instance = null;
class API {
    constructor() {
        if (instance) {
            instance = this;
        }
        return instance;
    }

    getBMI(weight, height) {

        var headers = {
            'X-Mashape-Key': 'jkXoSu3x8YmshD230kBDwSIebIdIp1oeQLLjsnJfu4jB9MgqNd',
            'Accept': 'application/json'
        }

        return axios.get(`https://gabamnml-health-v1.p.mashape.com/bmi?height=${height}&weight=${weight}`, {headers: headers}).then( 
                 (response) => response
        );

    }

    saveBMI(id, bmi, weight, height) {
        Axios.patch(`/users/save/:${id}`, {bmi, weight, height} ).then( (response) => response);
    }


}

export default API;