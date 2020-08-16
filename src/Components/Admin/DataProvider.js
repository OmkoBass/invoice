import axios from "axios";

import DATABASE from "../../Utils";

const DataProvider = {
    getList: (resource, params) => {
        return axios.get(`${DATABASE}/get/admin/${resource}`, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if(res.data) {
                    return { data: res.data.map(one => ({...one, id: one._id })), total: res.data.length }
                }
            })
    },
    getMany: (resource, params) => {
        return axios.get(`${DATABASE}/get/admin/${resource}`, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if(res.data) {
                    return { data: res.data.map(one => ({...one, id: one._id })) }
                }
            });
    },
}

export default DataProvider;
