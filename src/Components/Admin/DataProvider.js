import axios from "axios";

import DATABASE from "../../Utils";

const DataProvider = {
    getList: (resource, params) => {
        return axios.get(`${ DATABASE }/get/admin/${ resource }`, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if (res.data) {
                    return { data: res.data.map(one => ({ ...one, id: one._id })), total: res.data.length }
                }
            })
    },
    getMany: (resource, params) => {
        return axios.get(`${ DATABASE }/get/admin/${ resource }`, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if (res.data) {
                    return { data: res.data.map(one => ({ ...one, id: one._id })) }
                }
            });
    },
    getOne: (resource, params) => {
        return axios.get(`${ DATABASE }/get/admin/${ resource }/${ params.id }`, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if (res.data) {
                    return { data: { ...res.data, id: res.data._id } }
                }
            })
    },
    updateMany: (resource, params) => {

    },
    update: (resource, params) => {
        console.log(params);
        return axios.put(`${ DATABASE }/put/admin/${ resource }/${ params.id }`, {
            user: params.data
        }, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if (res.data) {
                    return { data: { ...res.data, id: res.data._id } }
                }
            });
    },
    delete: (resource, params) => {
        return axios.delete(`${ DATABASE }/put/admin/${ resource }/${ params.id }`, {
            headers: {
                token: localStorage.getItem('username')
            }
        })
            .then(res => {
                if (res.data)
                    return { data: { ...res.data, id: res.data._id } }
            })
    },
    deleteMany: (resource, params) => {

    },
    create: (resource, params) => {
        return axios.post(`${DATABASE}/post/admin/create/user`, {
            user: params.data
        }, {
            headers: {
                token: localStorage.getItem('username')
            }
        }).then(res => {
            if (res.data) {
                return { data: { ...res.data, id: res.data._id } }
            }
        })
    }
}

export default DataProvider;
