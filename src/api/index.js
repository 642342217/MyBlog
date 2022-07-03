import axios from 'axios';

axios.defaults.baseURL = 'http://43.142.12.243:0815';

export default  {
    //获取所有文章
    getAllArticles() {
        return axios.get('/getAllArticles');
    },
    
    //获取所有目录
    getAllCategories() {
        return axios.get('/getAllcategories');
    },

    //获取目录下所有文章,cate为目录名
    getAllRelArticles(cate) {
        return axios.get('/getRelArticles', {
            params: {
                cate
            }
        })
    }
}