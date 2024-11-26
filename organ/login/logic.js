import axios from 'axios';


const LoginLogic = async (username, password) => {
    const res = await axios.post('https://pi360.net/site/api/api_login_user.php?institute_id=mietjammu', {
        'username_1': username,
        'password_1': password
    }).then(async response => {

        const ret = await axios.post('https://pi360.net/site/api/api_intellectual_property_list.php?institute_id=mietjammu').then(async res => {
            console.log(res)
        })
        console.log(response)

    })



}
export default LoginLogic